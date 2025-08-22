<?php

namespace Drupal\zh_demo_login_redirect\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Controller for My Content page.
 */
class MyContentController extends ControllerBase {

  /**
   * Shows user's own content.
   */
  public function myContent() {
    $current_user = $this->currentUser();
    
    if ($current_user->isAnonymous()) {
      return new RedirectResponse(Url::fromRoute('user.login')->toString());
    }

    // Build render array with user's content
    $build = [
      '#attached' => [
        'library' => ['zh_demo_login_redirect/my_content_dashboard'],
      ],
      '#cache' => [
        'contexts' => ['user'],
        'tags' => ['node_list:' . $current_user->id()],
      ],
    ];

    // Add links to create new content
    $build['actions'] = [
      '#type' => 'actions',
      'add_news' => [
        '#type' => 'link',
        '#title' => $this->t('Neue Nachricht erstellen'),
        '#url' => Url::fromRoute('node.add', ['node_type' => 'news']),
        '#attributes' => ['class' => ['button', 'button--primary']],
      ],
      'add_event' => [
        '#type' => 'link', 
        '#title' => $this->t('Neuen Event erstellen'),
        '#url' => Url::fromRoute('node.add', ['node_type' => 'event']),
        '#attributes' => ['class' => ['button']],
      ],
      'add_page' => [
        '#type' => 'link',
        '#title' => $this->t('Neue Seite erstellen'), 
        '#url' => Url::fromRoute('node.add', ['node_type' => 'page']),
        '#attributes' => ['class' => ['button']],
      ],
    ];

    // Get user's content
    $query = \Drupal::entityQuery('node')
      ->condition('uid', $current_user->id())
      ->sort('created', 'DESC')
      ->accessCheck(TRUE)
      ->range(0, 20);
    
    $nids = $query->execute();
    
    if ($nids) {
      $nodes = \Drupal::entityTypeManager()->getStorage('node')->loadMultiple($nids);
      $view_builder = \Drupal::entityTypeManager()->getViewBuilder('node');
      
      $build['content_list'] = [
        '#type' => 'container',
        '#attributes' => ['class' => ['my-content-list']],
      ];
      
      foreach ($nodes as $node) {
        $build['content_list'][$node->id()] = [
          '#type' => 'container',
          '#attributes' => ['class' => ['content-item']],
          'title' => [
            '#type' => 'link',
            '#title' => $node->getTitle(),
            '#url' => $node->toUrl('edit-form'),
            '#attributes' => ['class' => ['content-title']],
          ],
          'status' => [
            '#markup' => '<span class="content-status">' . 
              ($node->isPublished() ? $this->t('Veröffentlicht') : $this->t('Entwurf')) . 
              '</span>',
          ],
          'created' => [
            '#markup' => '<span class="content-date">' . 
              \Drupal::service('date.formatter')->format($node->getCreatedTime(), 'short') . 
              '</span>',
          ],
        ];
      }
    } else {
      $build['empty'] = [
        '#markup' => '<p>' . $this->t('Sie haben noch keine Inhalte erstellt.') . '</p>',
      ];
    }

    return $build;
  }

}