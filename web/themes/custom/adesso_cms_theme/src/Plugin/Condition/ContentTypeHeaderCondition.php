<?php

namespace Drupal\adesso_cms_theme\Plugin\Condition;

use Drupal\Core\Condition\ConditionPluginBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\node\NodeInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a content type condition for page header visibility.
 *
 * This condition determines when page headers should be displayed based on:
 * - Content type (page, news, events, landing_page, etc.)
 * - Admin routes (headers should be hidden)
 * - Node edit forms (headers should be hidden)
 *
 * @Condition(
 *   id = "content_type_header",
 *   label = @Translation("Content Type Header Visibility"),
 *   context_definitions = {
 *     "node" = @ContextDefinition("entity:node", required = FALSE, label = @Translation("Node"))
 *   }
 * )
 */
class ContentTypeHeaderCondition extends ConditionPluginBase implements ContainerFactoryPluginInterface {

  /**
   * The route match service.
   *
   * @var \Drupal\Core\Routing\RouteMatchInterface
   */
  protected $routeMatch;

  /**
   * Constructs a new ContentTypeHeaderCondition.
   *
   * @param array $configuration
   *   The plugin configuration.
   * @param string $plugin_id
   *   The plugin ID.
   * @param mixed $plugin_definition
   *   The plugin definition.
   * @param \Drupal\Core\Routing\RouteMatchInterface $route_match
   *   The route match service.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, RouteMatchInterface $route_match) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->routeMatch = $route_match;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('current_route_match')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'bundles' => [],
      'include_admin_routes' => FALSE,
    ] + parent::defaultConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildConfigurationForm($form, $form_state);

    // Get available node bundles
    $node_bundles = \Drupal::service('entity_type.bundle.info')->getBundleInfo('node');
    $bundle_options = [];
    foreach ($node_bundles as $bundle => $info) {
      $bundle_options[$bundle] = $info['label'];
    }

    $form['bundles'] = [
      '#type' => 'checkboxes',
      '#title' => $this->t('Content Types'),
      '#description' => $this->t('Show header for the selected content types. If none selected, header will show for all content types.'),
      '#options' => $bundle_options,
      '#default_value' => $this->configuration['bundles'],
    ];

    $form['include_admin_routes'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Include admin routes'),
      '#description' => $this->t('Show headers on admin routes (node edit forms, etc.). Usually disabled.'),
      '#default_value' => $this->configuration['include_admin_routes'],
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    $this->configuration['bundles'] = array_filter($form_state->getValue('bundles'));
    $this->configuration['include_admin_routes'] = $form_state->getValue('include_admin_routes');
    parent::submitConfigurationForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function summary() {
    $bundles = $this->configuration['bundles'];
    $admin_routes = $this->configuration['include_admin_routes'];

    if (empty($bundles)) {
      $bundle_text = $this->t('all content types');
    }
    else {
      $bundle_text = $this->formatPlural(
        count($bundles),
        'content type @bundles',
        'content types @bundles',
        ['@bundles' => implode(', ', $bundles)]
      );
    }

    $admin_text = $admin_routes ? $this->t('including admin routes') : $this->t('excluding admin routes');

    return $this->t('Show header for @bundles, @admin', [
      '@bundles' => $bundle_text,
      '@admin' => $admin_text,
    ]);
  }

  /**
   * {@inheritdoc}
   */
  public function evaluate() {
    // Check admin routes first
    if (!$this->configuration['include_admin_routes'] && $this->isAdminRoute()) {
      return FALSE;
    }

    // Get node from context or route
    $node = $this->getContextValue('node');
    if (!$node) {
      $node = $this->routeMatch->getParameter('node');
    }

    // If no node, check if we should show headers on non-node pages
    if (!$node instanceof NodeInterface) {
      return $this->evaluateNonNodePage();
    }

    // If no bundles configured, show for all content types
    if (empty($this->configuration['bundles'])) {
      return TRUE;
    }

    // Check if node bundle is in allowed bundles
    return isset($this->configuration['bundles'][$node->bundle()]);
  }

  /**
   * Checks if current route is an admin route.
   *
   * @return bool
   *   TRUE if current route is admin route.
   */
  protected function isAdminRoute(): bool {
    $route = $this->routeMatch->getRouteObject();
    if (!$route) {
      return FALSE;
    }

    // Check for admin route option
    if ($route->getOption('_admin_route')) {
      return TRUE;
    }

    // Check common admin paths
    $route_name = $this->routeMatch->getRouteName();
    $admin_patterns = [
      'entity.node.edit_form',
      'entity.node.delete_form',
      'node.add',
      'system.admin',
    ];

    foreach ($admin_patterns as $pattern) {
      if (strpos($route_name, $pattern) === 0) {
        return TRUE;
      }
    }

    return FALSE;
  }

  /**
   * Evaluates condition for non-node pages.
   *
   * @return bool
   *   TRUE if headers should be shown on non-node pages.
   */
  protected function evaluateNonNodePage(): bool {
    // For Views pages, taxonomy pages, etc., show headers if not admin route
    return !$this->isAdminRoute();
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheContexts() {
    $contexts = parent::getCacheContexts();
    $contexts[] = 'route';
    $contexts[] = 'user.permissions';
    return $contexts;
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheTags() {
    $tags = parent::getCacheTags();
    
    // Add node type config cache tags
    $node_bundles = \Drupal::service('entity_type.bundle.info')->getBundleInfo('node');
    foreach ($node_bundles as $bundle => $info) {
      $tags[] = "config:node.type.$bundle";
    }
    
    return $tags;
  }
}