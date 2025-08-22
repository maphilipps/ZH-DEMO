<?php

namespace Drupal\zh_demo_editorial_workflow\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Controller for content review functionality.
 */
class ContentReviewController extends ControllerBase {

  /**
   * The database connection.
   */
  protected $database;

  /**
   * The entity type manager.
   */
  protected $entityTypeManager;

  /**
   * Constructs a new ContentReviewController object.
   */
  public function __construct(Connection $database, EntityTypeManagerInterface $entity_type_manager) {
    $this->database = $database;
    $this->entityTypeManager = $entity_type_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('database'),
      $container->get('entity_type.manager')
    );
  }

  /**
   * Overview page for content review.
   */
  public function overview() {
    $build = [];

    // Get content in review state
    $query = $this->entityTypeManager->getStorage('node')
      ->getQuery()
      ->condition('moderation_state', 'review')
      ->sort('changed', 'DESC')
      ->accessCheck(TRUE)
      ->range(0, 20);

    $nids = $query->execute();

    if (empty($nids)) {
      $build['empty'] = [
        '#markup' => '<p>' . $this->t('Keine Inhalte zur Prüfung vorhanden.') . '</p>',
      ];
      return $build;
    }

    $nodes = $this->entityTypeManager->getStorage('node')->loadMultiple($nids);

    $build['intro'] = [
      '#markup' => '<h2>' . $this->t('Inhalte zur Prüfung (@count)', ['@count' => count($nodes)]) . '</h2>',
    ];

    $build['table'] = [
      '#type' => 'table',
      '#header' => [
        $this->t('Titel'),
        $this->t('Typ'),
        $this->t('Autor'),
        $this->t('Eingereicht'),
        $this->t('Aktionen'),
      ],
      '#rows' => [],
    ];

    foreach ($nodes as $node) {
      $build['table']['#rows'][] = [
        [
          'data' => [
            '#type' => 'link',
            '#title' => $node->getTitle(),
            '#url' => $node->toUrl('canonical'),
          ],
        ],
        $node->type->entity->label(),
        $node->getOwner()->getDisplayName(),
        \Drupal::service('date.formatter')->format($node->getChangedTime(), 'short'),
        [
          'data' => [
            '#type' => 'operations',
            '#links' => [
              'edit' => [
                'title' => $this->t('Bearbeiten'),
                'url' => $node->toUrl('edit-form'),
              ],
              'view' => [
                'title' => $this->t('Vorschau'),
                'url' => $node->toUrl('canonical'),
              ],
            ],
          ],
        ],
      ];
    }

    return $build;
  }

}