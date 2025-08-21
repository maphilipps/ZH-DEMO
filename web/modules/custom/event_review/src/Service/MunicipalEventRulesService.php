<?php

namespace Drupal\event_review\Service;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\node\NodeInterface;

/**
 * Municipal Event Approval Rules Service for Gemeinde Bruchtal.
 * 
 * Implements Swiss municipal standards and local Bruchtal regulations
 * for automated event approval and municipal business process compliance.
 */
class MunicipalEventRulesService {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The config factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * The logger factory.
   *
   * @var \Drupal\Core\Logger\LoggerChannelFactoryInterface
   */
  protected $loggerFactory;

  /**
   * Constructs a MunicipalEventRulesService object.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The config factory.
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $logger_factory
   *   The logger factory.
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager, ConfigFactoryInterface $config_factory, LoggerChannelFactoryInterface $logger_factory) {
    $this->entityTypeManager = $entity_type_manager;
    $this->configFactory = $config_factory;
    $this->loggerFactory = $logger_factory;
  }

  /**
   * Evaluate if an event can be automatically approved based on municipal rules.
   *
   * @param \Drupal\node\NodeInterface $event
   *   The event node to evaluate.
   *
   * @return array
   *   Array with 'auto_approve' boolean and 'reasons' array explaining the decision.
   */
  public function evaluateAutoApproval(NodeInterface $event): array {
    $evaluation = [
      'auto_approve' => FALSE,
      'reasons' => [],
      'requires_manual_review' => FALSE,
      'municipal_category' => 'unknown'
    ];

    // Get event type for municipal categorization
    $event_type = $this->getEventMunicipalCategory($event);
    $evaluation['municipal_category'] = $event_type;

    switch ($event_type) {
      case 'private_social':
        // Private social events (birthdays, family gatherings) - auto approve
        if ($this->isPrivateSmallEvent($event)) {
          $evaluation['auto_approve'] = TRUE;
          $evaluation['reasons'][] = 'Private Veranstaltung unter 50 Personen - automatische Genehmigung';
        }
        break;

      case 'community_cultural':
        // Community cultural events (Verein activities) - conditional auto approve
        if ($this->isFromRegisteredAssociation($event) && $this->isStandardVenueTime($event)) {
          $evaluation['auto_approve'] = TRUE;
          $evaluation['reasons'][] = 'Vereinsveranstaltung zu Standardzeiten - automatische Genehmigung';
        } else {
          $evaluation['requires_manual_review'] = TRUE;
          $evaluation['reasons'][] = 'Vereinsveranstaltung benötigt manuelle Prüfung der Zeiten/Örtlichkeit';
        }
        break;

      case 'public_event':
        // Public events always require manual review
        $evaluation['requires_manual_review'] = TRUE;
        $evaluation['reasons'][] = 'Öffentliche Veranstaltung - manuelle Prüfung durch Gemeinde erforderlich';
        break;

      case 'commercial':
        // Commercial events require special permits
        $evaluation['requires_manual_review'] = TRUE;
        $evaluation['reasons'][] = 'Kommerzielle Veranstaltung - Sonderbewilligung erforderlich';
        break;

      default:
        $evaluation['requires_manual_review'] = TRUE;
        $evaluation['reasons'][] = 'Veranstaltungstyp nicht erkannt - manuelle Prüfung erforderlich';
    }

    // Swiss municipal compliance checks
    if (!$this->checkSwissComplianceRequirements($event)) {
      $evaluation['auto_approve'] = FALSE;
      $evaluation['requires_manual_review'] = TRUE;
      $evaluation['reasons'][] = 'Schweizer Gemeinde-Vorschriften nicht erfüllt';
    }

    // Log municipal decision for audit trail
    $this->loggerFactory->get('event_review')->info('Municipal approval evaluation for event @title: @decision', [
      '@title' => $event->getTitle(),
      '@decision' => $evaluation['auto_approve'] ? 'Auto-approved' : 'Manual review required'
    ]);

    return $evaluation;
  }

  /**
   * Get the municipal category of an event based on Swiss standards.
   *
   * @param \Drupal\node\NodeInterface $event
   *   The event node.
   *
   * @return string
   *   The municipal category.
   */
  protected function getEventMunicipalCategory(NodeInterface $event): string {
    // Check field_event_type if available
    if ($event->hasField('field_event_type') && !$event->get('field_event_type')->isEmpty()) {
      $event_type = $event->get('field_event_type')->entity;
      if ($event_type) {
        $type_name = strtolower($event_type->getName());
        
        // Map to municipal categories based on Swiss municipal law
        if (strpos($type_name, 'privat') !== FALSE || strpos($type_name, 'familie') !== FALSE) {
          return 'private_social';
        }
        if (strpos($type_name, 'verein') !== FALSE || strpos($type_name, 'kultur') !== FALSE) {
          return 'community_cultural';
        }
        if (strpos($type_name, 'öffentlich') !== FALSE || strpos($type_name, 'gemeinde') !== FALSE) {
          return 'public_event';
        }
        if (strpos($type_name, 'kommerziell') !== FALSE || strpos($type_name, 'geschäft') !== FALSE) {
          return 'commercial';
        }
      }
    }

    return 'unknown';
  }

  /**
   * Check if event is a private small event (< 50 people).
   *
   * @param \Drupal\node\NodeInterface $event
   *   The event node.
   *
   * @return bool
   *   TRUE if private and small.
   */
  protected function isPrivateSmallEvent(NodeInterface $event): bool {
    // Check attendance field if available
    if ($event->hasField('field_expected_attendance') && !$event->get('field_expected_attendance')->isEmpty()) {
      $attendance = (int) $event->get('field_expected_attendance')->value;
      return $attendance < 50;
    }
    
    // Default to small event if no attendance specified for private events
    return TRUE;
  }

  /**
   * Check if event is from a registered association (Verein).
   *
   * @param \Drupal\node\NodeInterface $event
   *   The event node.
   *
   * @return bool
   *   TRUE if from registered association.
   */
  protected function isFromRegisteredAssociation(NodeInterface $event): bool {
    $submitter = $event->getOwner();
    
    // Check if submitter has role indicating association membership
    $roles = $submitter->getRoles();
    if (in_array('association_member', $roles) || in_array('verein_member', $roles)) {
      return TRUE;
    }

    // Check if organization field contains known associations
    if ($event->hasField('field_organization') && !$event->get('field_organization')->isEmpty()) {
      $organization = strtolower($event->get('field_organization')->value);
      $known_associations = ['fc bruchtal', 'turnverein', 'musikverein', 'reitverein', 'theoden reitclub'];
      
      foreach ($known_associations as $association) {
        if (strpos($organization, $association) !== FALSE) {
          return TRUE;
        }
      }
    }

    return FALSE;
  }

  /**
   * Check if event is at standard venue and time.
   *
   * @param \Drupal\node\NodeInterface $event
   *   The event node.
   *
   * @return bool
   *   TRUE if standard venue and time.
   */
  protected function isStandardVenueTime(NodeInterface $event): bool {
    // Check venue
    if ($event->hasField('field_venue') && !$event->get('field_venue')->isEmpty()) {
      $venue = strtolower($event->get('field_venue')->value);
      $standard_venues = ['gemeindehalle', 'vereinsheim', 'sportplatz', 'mehrzweckhalle'];
      
      $venue_ok = FALSE;
      foreach ($standard_venues as $standard_venue) {
        if (strpos($venue, $standard_venue) !== FALSE) {
          $venue_ok = TRUE;
          break;
        }
      }
      
      if (!$venue_ok) {
        return FALSE;
      }
    }

    // Check time (between 08:00 and 22:00)
    if ($event->hasField('field_event_date') && !$event->get('field_event_date')->isEmpty()) {
      $event_date = $event->get('field_event_date')->value;
      $hour = (int) date('H', strtotime($event_date));
      
      if ($hour < 8 || $hour > 22) {
        return FALSE;
      }
    }

    return TRUE;
  }

  /**
   * Check Swiss municipal compliance requirements.
   *
   * @param \Drupal\node\NodeInterface $event
   *   The event node.
   *
   * @return bool
   *   TRUE if compliant.
   */
  protected function checkSwissComplianceRequirements(NodeInterface $event): bool {
    // Check required fields for Swiss municipal standards
    $required_fields = ['title', 'field_event_date'];
    
    foreach ($required_fields as $field_name) {
      if (!$event->hasField($field_name) || $event->get($field_name)->isEmpty()) {
        return FALSE;
      }
    }

    // Check date is in future (Swiss municipal law requirement)
    if ($event->hasField('field_event_date') && !$event->get('field_event_date')->isEmpty()) {
      $event_date = strtotime($event->get('field_event_date')->value);
      if ($event_date <= time()) {
        return FALSE;
      }
    }

    return TRUE;
  }

  /**
   * Get pre-defined municipal rejection reasons in Swiss German.
   *
   * @return array
   *   Array of rejection reasons commonly used by municipal offices.
   */
  public function getMunicipalRejectionReasons(): array {
    return [
      'incomplete_information' => 'Unvollständige Angaben zur Veranstaltung',
      'venue_not_available' => 'Gewünschte Örtlichkeit ist nicht verfügbar',
      'conflicting_event' => 'Terminkonflikt mit anderen Gemeindeveranstaltungen',
      'permit_required' => 'Zusätzliche Bewilligungen erforderlich (Lärm, Verkehr, etc.)',
      'safety_concerns' => 'Sicherheitsbedenken bezüglich der geplanten Veranstaltung',
      'insurance_missing' => 'Nachweis der Haftpflichtversicherung fehlt',
      'time_restrictions' => 'Veranstaltungszeit verstösst gegen gemeindliche Ruhezeiten',
      'capacity_exceeded' => 'Erwartete Teilnehmerzahl überschreitet Kapazität der Örtlichkeit',
      'commercial_permit' => 'Kommerzielle Tätigkeit benötigt Gewerbebewilligung',
      'environmental_concerns' => 'Umweltschutzbestimmungen nicht berücksichtigt'
    ];
  }

  /**
   * Generate municipal approval summary for reporting.
   *
   * @param array $date_range
   *   Array with 'start' and 'end' timestamps.
   *
   * @return array
   *   Summary statistics for municipal reporting.
   */
  public function generateApprovalSummary(array $date_range): array {
    $node_storage = $this->entityTypeManager->getStorage('node');
    
    $query = $node_storage->getQuery()
      ->condition('type', 'event')
      ->condition('created', $date_range['start'], '>=')
      ->condition('created', $date_range['end'], '<=')
      ->accessCheck(FALSE);
    
    $event_ids = $query->execute();
    $events = $node_storage->loadMultiple($event_ids);
    
    $summary = [
      'total_events' => count($events),
      'auto_approved' => 0,
      'manual_approved' => 0,
      'rejected' => 0,
      'pending' => 0,
      'categories' => [
        'private_social' => 0,
        'community_cultural' => 0,
        'public_event' => 0,
        'commercial' => 0
      ]
    ];
    
    foreach ($events as $event) {
      $state = $event->get('moderation_state')->value;
      $category = $this->getEventMunicipalCategory($event);
      
      $summary['categories'][$category]++;
      
      switch ($state) {
        case 'published':
          $evaluation = $this->evaluateAutoApproval($event);
          if ($evaluation['auto_approve']) {
            $summary['auto_approved']++;
          } else {
            $summary['manual_approved']++;
          }
          break;
        case 'rejected':
          $summary['rejected']++;
          break;
        case 'draft':
          $summary['pending']++;
          break;
      }
    }
    
    return $summary;
  }
}