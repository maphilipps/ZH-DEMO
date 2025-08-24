<?php

namespace Drupal\zh_demo_editorial_workflow\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Controller for editor dashboard.
 */
class EditorDashboardController extends ControllerBase {

  /**
   * The database connection.
   */
  protected $database;

  /**
   * The entity type manager.
   */
  protected $entityTypeManager;

  /**
   * Constructs a new EditorDashboardController object.
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
   * Build the editor dashboard.
   */
  public function build() {
    $build = [];

    $build['title'] = [
      '#markup' => '<h1>' . $this->t('Redakteur Dashboard') . '</h1>',
    ];

    // Content statistics
    $stats = $this->getContentStatistics();
    
    $build['statistics'] = [
      '#type' => 'container',
      '#attributes' => ['class' => ['editor-dashboard-stats']],
    ];

    $build['statistics']['review'] = [
      '#type' => 'container',
      '#attributes' => ['class' => ['stat-box', 'review-count']],
      'title' => [
        '#markup' => '<h3>' . $this->t('Zur Prüfung') . '</h3>',
      ],
      'count' => [
        '#markup' => '<div class="stat-number">' . $stats['review'] . '</div>',
      ],
      'link' => [
        '#type' => 'link',
        '#title' => $this->t('Alle anzeigen'),
        '#url' => \Drupal\Core\Url::fromRoute('zh_demo_editorial_workflow.content_review'),
        '#attributes' => ['class' => ['button']],
      ],
    ];

    $build['statistics']['draft'] = [
      '#type' => 'container',
      '#attributes' => ['class' => ['stat-box', 'draft-count']],
      'title' => [
        '#markup' => '<h3>' . $this->t('Entwürfe') . '</h3>',
      ],
      'count' => [
        '#markup' => '<div class="stat-number">' . $stats['draft'] . '</div>',
      ],
    ];

    $build['statistics']['published'] = [
      '#type' => 'container',
      '#attributes' => ['class' => ['stat-box', 'published-count']],
      'title' => [
        '#markup' => '<h3>' . $this->t('Veröffentlicht heute') . '</h3>',
      ],
      'count' => [
        '#markup' => '<div class="stat-number">' . $stats['published_today'] . '</div>',
      ],
    ];

    // Recent content for review
    $build['recent_review'] = [
      '#markup' => '<h2>' . $this->t('Neueste Inhalte zur Prüfung') . '</h2>',
    ];

    $recent_nodes = $this->getRecentContentForReview();
    if (!empty($recent_nodes)) {
      $build['recent_table'] = [
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

      foreach ($recent_nodes as $node) {
        $build['recent_table']['#rows'][] = [
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
              ],
            ],
          ],
        ];
      }
    }
    else {
      $build['no_content'] = [
        '#markup' => '<p>' . $this->t('Keine Inhalte zur Prüfung vorhanden.') . '</p>',
      ];
    }

    // Add CSS
    $build['#attached']['library'][] = 'zh_demo_editorial_workflow/dashboard';

    return $build;
  }

  /**
   * Get content statistics for dashboard.
   */
  protected function getContentStatistics() {
    $stats = [];

    // Count content in review
    $query = $this->entityTypeManager->getStorage('node')
      ->getQuery()
      ->condition('moderation_state', 'review')
      ->accessCheck(TRUE);
    $stats['review'] = $query->count()->execute();

    // Count drafts
    $query = $this->entityTypeManager->getStorage('node')
      ->getQuery()
      ->condition('moderation_state', 'draft')
      ->accessCheck(TRUE);
    $stats['draft'] = $query->count()->execute();

    // Count published today
    $today_start = strtotime('today');
    $query = $this->entityTypeManager->getStorage('node')
      ->getQuery()
      ->condition('moderation_state', 'published')
      ->condition('changed', $today_start, '>=')
      ->accessCheck(TRUE);
    $stats['published_today'] = $query->count()->execute();

    return $stats;
  }

  /**
   * Get recent content submitted for review.
   */
  protected function getRecentContentForReview() {
    $query = $this->entityTypeManager->getStorage('node')
      ->getQuery()
      ->condition('moderation_state', 'review')
      ->sort('changed', 'DESC')
      ->range(0, 5)
      ->accessCheck(TRUE);

    $nids = $query->execute();
    return $nids ? $this->entityTypeManager->getStorage('node')->loadMultiple($nids) : [];
  }

}