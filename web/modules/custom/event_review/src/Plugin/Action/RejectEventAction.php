<?php

namespace Drupal\event_review\Plugin\Action;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Action\ConfigurableActionBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Mail\MailManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\node\NodeInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Rejects an event by changing its moderation state to rejected.
 *
 * @Action(
 *   id = "event_reject_action",
 *   label = @Translation("Ablehnen"),
 *   type = "node",
 *   category = @Translation("Event Review"),
 *   confirm_form_route_name = "event_review.reject_confirm"
 * )
 */
class RejectEventAction extends ConfigurableActionBase implements ContainerFactoryPluginInterface {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The mail manager service.
   *
   * @var \Drupal\Core\Mail\MailManagerInterface
   */
  protected $mailManager;

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity_type_manager, MailManagerInterface $mail_manager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityTypeManager = $entity_type_manager;
    $this->mailManager = $mail_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('entity_type.manager'),
      $container->get('plugin.manager.mail')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function access($object, AccountInterface $account = NULL, $return_as_object = FALSE) {
    /** @var \Drupal\node\NodeInterface $object */
    $access = $object->access('update', $account, TRUE)
      ->andIf($object->moderation_state->access('edit', $account, TRUE));

    // Only allow if the event is in draft state.
    if ($object->bundle() === 'event' && $object->moderation_state->value !== 'draft') {
      $access = $access->andIf(AccessResult::forbidden('Event is not in draft state.'));
    }

    return $return_as_object ? $access : $access->isAllowed();
  }

  /**
   * {@inheritdoc}
   */
  public function execute($entity = NULL) {
    /** @var \Drupal\node\NodeInterface $entity */
    if ($entity instanceof NodeInterface && $entity->bundle() === 'event') {
      $entity->set('moderation_state', 'rejected');
      
      // Add rejection reason if provided in configuration.
      if (!empty($this->configuration['rejection_reason'])) {
        $entity->set('field_rejection_reason', $this->configuration['rejection_reason']);
      }
      
      $entity->save();
      
      // Send rejection notification email to submitter
      $this->sendRejectionEmail($entity);
    }
  }

  /**
   * Send rejection notification email in Swiss German.
   *
   * @param \Drupal\node\NodeInterface $event
   *   The rejected event entity.
   */
  protected function sendRejectionEmail(NodeInterface $event) {
    $submitter = $event->getOwner();
    if (!$submitter->getEmail()) {
      return;
    }

    $site_config = \Drupal::config('system.site');
    $municipality_name = 'Gemeinde Bruchtal'; // Municipal branding
    
    $params = [
      'event' => $event,
      'submitter' => $submitter,
      'municipality' => $municipality_name,
      'rejection_reason' => $this->configuration['rejection_reason'] ?? '',
      'context' => 'rejection'
    ];

    $this->mailManager->mail(
      'event_review',
      'event_status_notification',
      $submitter->getEmail(),
      'de', // Swiss German
      $params,
      $site_config->get('mail') ?: 'noreply@bruchtal.ch'
    );
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'rejection_reason' => '',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form['rejection_reason'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Ablehnungsgrund'),
      '#description' => $this->t('Geben Sie den Grund für die Ablehnung der Veranstaltung an.'),
      '#default_value' => $this->configuration['rejection_reason'],
      '#required' => TRUE,
      '#rows' => 3,
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    $this->configuration['rejection_reason'] = $form_state->getValue('rejection_reason');
  }

}