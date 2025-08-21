<?php

namespace Drupal\event_review\Service;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\node\NodeInterface;

/**
 * Swiss Event Compliance Service implementing eCH-0039 standards.
 * 
 * Ensures all event data meets Swiss federal and cantonal requirements
 * for municipal event management and government data interoperability.
 */
class SwissEventComplianceService {

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
   * Constructs a SwissEventComplianceService object.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The config factory.
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $logger_factory
   *   The logger factory.
   */
  public function __construct(ConfigFactoryInterface $config_factory, LoggerChannelFactoryInterface $logger_factory) {
    $this->configFactory = $config_factory;
    $this->loggerFactory = $logger_factory;
  }

  /**
   * Validate event data against eCH-0039 Event Standards.
   *
   * @param \Drupal\node\NodeInterface $event
   *   The event node to validate.
   *
   * @return array
   *   Validation result with compliance status and detailed feedback.
   */
  public function validateEch0039Compliance(NodeInterface $event): array {
    $validation = [
      'compliant' => TRUE,
      'warnings' => [],
      'errors' => [],
      'standards_version' => 'eCH-0039 v2.0',
      'validation_date' => date('Y-m-d H:i:s')
    ];

    // Core mandatory fields per eCH-0039
    $this->validateMandatoryFields($event, $validation);
    
    // Swiss date/time format compliance
    $this->validateSwissDateTimeFormat($event, $validation);
    
    // Swiss address format compliance (eCH-0010)
    $this->validateSwissAddressFormat($event, $validation);
    
    // Contact information compliance
    $this->validateContactInformation($event, $validation);
    
    // Event categorization compliance
    $this->validateEventCategorization($event, $validation);
    
    // Data quality standards
    $this->validateDataQuality($event, $validation);

    // Set overall compliance status
    if (!empty($validation['errors'])) {
      $validation['compliant'] = FALSE;
    }

    // Log compliance check for audit trail
    $this->loggerFactory->get('swiss_compliance')->info('eCH-0039 compliance check for event @title: @status', [
      '@title' => $event->getTitle(),
      '@status' => $validation['compliant'] ? 'COMPLIANT' : 'NON-COMPLIANT'
    ]);

    return $validation;
  }

  /**
   * Validate mandatory fields according to eCH-0039.
   *
   * @param \Drupal\node\NodeInterface $event
   *   The event node.
   * @param array &$validation
   *   The validation result array to modify.
   */
  protected function validateMandatoryFields(NodeInterface $event, array &$validation): void {
    $mandatory_fields = [
      'title' => 'Veranstaltungstitel',
      'field_event_date' => 'Veranstaltungsdatum',
      'body' => 'Veranstaltungsbeschreibung'
    ];

    foreach ($mandatory_fields as $field_name => $field_label) {
      if (!$event->hasField($field_name) || $event->get($field_name)->isEmpty()) {
        $validation['errors'][] = "Pflichtfeld fehlt: {$field_label} ({$field_name})";
      }
    }

    // Check title length (eCH-0039 recommends 3-100 characters)
    if ($event->hasField('title') && !$event->get('title')->isEmpty()) {
      $title_length = strlen($event->getTitle());
      if ($title_length < 3) {
        $validation['errors'][] = 'Veranstaltungstitel zu kurz (mindestens 3 Zeichen erforderlich)';
      }
      if ($title_length > 100) {
        $validation['warnings'][] = 'Veranstaltungstitel sehr lang (über 100 Zeichen)';
      }
    }
  }

  /**
   * Validate Swiss date/time format compliance.
   *
   * @param \Drupal\node\NodeInterface $event
   *   The event node.
   * @param array &$validation
   *   The validation result array to modify.
   */
  protected function validateSwissDateTimeFormat(NodeInterface $event, array &$validation): void {
    if ($event->hasField('field_event_date') && !$event->get('field_event_date')->isEmpty()) {
      $event_date = $event->get('field_event_date')->value;
      
      // Validate date is in future
      if (strtotime($event_date) <= time()) {
        $validation['errors'][] = 'Veranstaltungsdatum muss in der Zukunft liegen';
      }
      
      // Check for Swiss date format compliance in display
      $formatted_date = \Drupal::service('date.formatter')->format(strtotime($event_date), 'custom', 'd.m.Y H:i');
      if ($formatted_date !== date('d.m.Y H:i', strtotime($event_date))) {
        $validation['warnings'][] = 'Datumsformat entspricht nicht Swiss Standards (DD.MM.YYYY HH:MM)';
      }
      
      // Validate reasonable timeframe (not more than 2 years in future)
      $two_years_future = strtotime('+2 years');
      if (strtotime($event_date) > $two_years_future) {
        $validation['warnings'][] = 'Veranstaltungsdatum liegt sehr weit in der Zukunft (über 2 Jahre)';
      }
    }
  }

  /**
   * Validate Swiss address format compliance (eCH-0010).
   *
   * @param \Drupal\node\NodeInterface $event
   *   The event node.
   * @param array &$validation
   *   The validation result array to modify.
   */
  protected function validateSwissAddressFormat(NodeInterface $event, array &$validation): void {
    // Check venue/location field
    if ($event->hasField('field_venue') && !$event->get('field_venue')->isEmpty()) {
      $venue = $event->get('field_venue')->value;
      
      // Swiss postal code pattern (4 digits)
      if (!preg_match('/\b\d{4}\b/', $venue)) {
        $validation['warnings'][] = 'Veranstaltungsort enthält keine schweizer Postleitzahl (4-stellig)';
      }
      
      // Check for common Swiss place names or municipalities
      $swiss_indicators = ['CH-', 'Schweiz', 'Switzerland', 'Suisse', 'Svizzera'];
      $has_swiss_indicator = FALSE;
      foreach ($swiss_indicators as $indicator) {
        if (stripos($venue, $indicator) !== FALSE) {
          $has_swiss_indicator = TRUE;
          break;
        }
      }
      
      if (!$has_swiss_indicator && !preg_match('/\b\d{4}\b/', $venue)) {
        $validation['warnings'][] = 'Veranstaltungsort sollte eindeutig als Schweizer Standort erkennbar sein';
      }
    } else {
      $validation['errors'][] = 'Veranstaltungsort (field_venue) ist erforderlich für eCH-0039 Compliance';
    }
  }

  /**
   * Validate contact information compliance.
   *
   * @param \Drupal\node\NodeInterface $event
   *   The event node.
   * @param array &$validation
   *   The validation result array to modify.
   */
  protected function validateContactInformation(NodeInterface $event, array &$validation): void {
    $submitter = $event->getOwner();
    
    // Email validation (Swiss standards prefer professional format)
    if (!$submitter->getEmail()) {
      $validation['errors'][] = 'Kontakt-Email des Veranstalters fehlt';
    } else {
      $email = $submitter->getEmail();
      
      // Check for professional email domains
      $professional_domains = ['.ch', '.gov.ch', '.admin.ch', '.org', '.com'];
      $has_professional_domain = FALSE;
      foreach ($professional_domains as $domain) {
        if (strpos($email, $domain) !== FALSE) {
          $has_professional_domain = TRUE;
          break;
        }
      }
      
      if (!$has_professional_domain) {
        $validation['warnings'][] = 'Email-Domain entspricht nicht üblichen professionellen Standards';
      }
    }
    
    // Check for contact phone (recommended but not mandatory)
    if ($event->hasField('field_contact_phone') && $event->get('field_contact_phone')->isEmpty()) {
      $validation['warnings'][] = 'Kontakt-Telefonnummer empfohlen für vollständige Compliance';
    } else if ($event->hasField('field_contact_phone') && !$event->get('field_contact_phone')->isEmpty()) {
      $phone = $event->get('field_contact_phone')->value;
      
      // Swiss phone number pattern
      if (!preg_match('/^\+41|^0[1-9]/', $phone)) {
        $validation['warnings'][] = 'Telefonnummer entspricht nicht schweizer Format (+41 oder 0...)';
      }
    }
  }

  /**
   * Validate event categorization compliance.
   *
   * @param \Drupal\node\NodeInterface $event
   *   The event node.
   * @param array &$validation
   *   The validation result array to modify.
   */
  protected function validateEventCategorization(NodeInterface $event, array &$validation): void {
    // Check event type classification
    if ($event->hasField('field_event_type') && !$event->get('field_event_type')->isEmpty()) {
      $event_type = $event->get('field_event_type')->entity;
      if ($event_type) {
        $type_name = $event_type->getName();
        
        // Swiss municipal event categories
        $valid_categories = [
          'Private Veranstaltung',
          'Vereinsveranstaltung', 
          'Öffentliche Veranstaltung',
          'Kommerzielle Veranstaltung',
          'Gemeindeveranstaltung',
          'Kulturelle Veranstaltung',
          'Sportveranstaltung'
        ];
        
        if (!in_array($type_name, $valid_categories)) {
          $validation['warnings'][] = "Veranstaltungstyp '{$type_name}' entspricht nicht Standard-Kategorien";
        }
      }
    } else {
      $validation['warnings'][] = 'Veranstaltungstyp (field_event_type) empfohlen für bessere Kategorisierung';
    }
    
    // Check target audience specification
    if ($event->hasField('field_target_audience') && $event->get('field_target_audience')->isEmpty()) {
      $validation['warnings'][] = 'Zielgruppe (field_target_audience) empfohlen für vollständige eCH-0039 Compliance';
    }
  }

  /**
   * Validate data quality standards.
   *
   * @param \Drupal\node\NodeInterface $event
   *   The event node.
   * @param array &$validation
   *   The validation result array to modify.
   */
  protected function validateDataQuality(NodeInterface $event, array &$validation): void {
    // Check description quality
    if ($event->hasField('body') && !$event->get('body')->isEmpty()) {
      $description = strip_tags($event->get('body')->value);
      $description_length = strlen($description);
      
      if ($description_length < 20) {
        $validation['warnings'][] = 'Veranstaltungsbeschreibung sehr kurz (unter 20 Zeichen)';
      }
      
      if ($description_length > 2000) {
        $validation['warnings'][] = 'Veranstaltungsbeschreibung sehr lang (über 2000 Zeichen)';
      }
      
      // Check for Swiss German compliance (no ß character)
      if (strpos($description, 'ß') !== FALSE) {
        $validation['warnings'][] = 'Text enthält ß-Zeichen (nicht Swiss German konform, verwenden Sie ss)';
      }
    }
    
    // Check for accessibility information
    if ($event->hasField('field_accessibility_info') && $event->get('field_accessibility_info')->isEmpty()) {
      $validation['warnings'][] = 'Barrierefreiheit-Informationen empfohlen (WCAG 2.1 AA Compliance)';
    }
    
    // Check for cost information clarity
    if ($event->hasField('field_cost') && $event->get('field_cost')->isEmpty()) {
      $validation['warnings'][] = 'Kosteninformationen empfohlen (auch wenn kostenlos)';
    }
  }

  /**
   * Generate eCH-0039 compliance report.
   *
   * @param \Drupal\node\NodeInterface $event
   *   The event node.
   *
   * @return array
   *   Detailed compliance report for documentation.
   */
  public function generateComplianceReport(NodeInterface $event): array {
    $validation = $this->validateEch0039Compliance($event);
    
    $report = [
      'event_id' => $event->id(),
      'event_title' => $event->getTitle(),
      'validation_timestamp' => $validation['validation_date'],
      'compliance_status' => $validation['compliant'] ? 'COMPLIANT' : 'NON-COMPLIANT',
      'standards_version' => $validation['standards_version'],
      'municipality' => 'Gemeinde Bruchtal',
      'canton' => 'Zürich',
      'country' => 'Switzerland',
      'errors_count' => count($validation['errors']),
      'warnings_count' => count($validation['warnings']),
      'detailed_results' => $validation
    ];
    
    // Add event metadata for reporting
    if ($event->hasField('field_event_date') && !$event->get('field_event_date')->isEmpty()) {
      $report['event_date'] = $event->get('field_event_date')->value;
    }
    
    if ($event->hasField('field_event_type') && !$event->get('field_event_type')->isEmpty()) {
      $report['event_category'] = $event->get('field_event_type')->entity->getName();
    }
    
    $report['submitter_email'] = $event->getOwner()->getEmail();
    $report['created_date'] = date('Y-m-d H:i:s', $event->getCreatedTime());
    
    return $report;
  }

  /**
   * Get Swiss municipal compliance checklist.
   *
   * @return array
   *   Compliance checklist for municipal staff.
   */
  public function getComplianceChecklist(): array {
    return [
      'mandatory_fields' => [
        'title' => 'Veranstaltungstitel (3-100 Zeichen)',
        'field_event_date' => 'Datum und Uhrzeit (DD.MM.YYYY HH:MM)',
        'body' => 'Beschreibung (20-2000 Zeichen)',
        'field_venue' => 'Veranstaltungsort mit PLZ'
      ],
      'recommended_fields' => [
        'field_event_type' => 'Veranstaltungstyp aus Standard-Kategorien',
        'field_contact_phone' => 'Schweizer Telefonnummer (+41 oder 0...)',
        'field_target_audience' => 'Zielgruppe specification',
        'field_accessibility_info' => 'Barrierefreiheit-Informationen',
        'field_cost' => 'Kosteninformationen (auch wenn kostenlos)'
      ],
      'data_quality' => [
        'swiss_german' => 'Keine ß-Zeichen verwenden (ss stattdessen)',
        'professional_email' => 'Professionelle Email-Domain (.ch, .org, .com)',
        'future_date' => 'Veranstaltungsdatum in der Zukunft',
        'reasonable_timeframe' => 'Datum nicht mehr als 2 Jahre in Zukunft'
      ],
      'address_standards' => [
        'swiss_postal_code' => '4-stellige schweizer Postleitzahl',
        'clear_location' => 'Eindeutig als Schweizer Standort erkennbar',
        'complete_address' => 'Vollständige Adresse nach eCH-0010'
      ]
    ];
  }
}