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
 * Approves an event by changing its moderation state to published.
 *
 * @Action(
 *   id = "event_approve_action",
 *   label = @Translation("Genehmigen"),
 *   type = "node",
 *   category = @Translation("Event Review"),
 *   confirm_form_route_name = "event_review.approve_confirm"
 * )
 */
class ApproveEventAction extends ConfigurableActionBase implements ContainerFactoryPluginInterface {

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
      $entity->set('moderation_state', 'published');
      $entity->save();
      
      // Send notification email to submitter
      $this->sendApprovalEmail($entity);
    }
  }

  /**
   * Send approval notification email in Swiss German.
   *
   * @param \Drupal\node\NodeInterface $event
   *   The approved event entity.
   */
  protected function sendApprovalEmail(NodeInterface $event) {
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
      'context' => 'approval'
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
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    // Nothing to submit.
  }

}