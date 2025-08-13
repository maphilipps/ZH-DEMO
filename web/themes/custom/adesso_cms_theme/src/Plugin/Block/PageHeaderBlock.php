<?php

namespace Drupal\adesso_cms_theme\Plugin\Block;

use Drupal\adesso_cms_theme\Service\PageHeaderContextService;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a unified page header block.
 *
 * This block replaces hardcoded page header templates with a flexible,
 * configurable block system that uses existing SDC components.
 *
 * @Block(
 *   id = "adesso_cms_page_header",
 *   admin_label = @Translation("Page Header"),
 *   category = @Translation("Site Layout")
 * )
 */
class PageHeaderBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * The page header context service.
   *
   * @var \Drupal\adesso_cms_theme\Service\PageHeaderContextService
   */
  protected $headerContext;

  /**
   * The current route match.
   *
   * @var \Drupal\Core\Routing\RouteMatchInterface
   */
  protected $routeMatch;

  /**
   * The config factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * Constructs a new PageHeaderBlock instance.
   *
   * @param array $configuration
   *   The plugin configuration.
   * @param string $plugin_id
   *   The plugin ID.
   * @param mixed $plugin_definition
   *   The plugin definition.
   * @param \Drupal\adesso_cms_theme\Service\PageHeaderContextService $header_context
   *   The page header context service.
   * @param \Drupal\Core\Routing\RouteMatchInterface $route_match
   *   The current route match.
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The config factory.
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    PageHeaderContextService $header_context,
    RouteMatchInterface $route_match,
    ConfigFactoryInterface $config_factory
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->headerContext = $header_context;
    $this->routeMatch = $route_match;
    $this->configFactory = $config_factory;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('adesso_cms_theme.page_header_context'),
      $container->get('current_route_match'),
      $container->get('config.factory')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'header_variant' => 'auto',
      'title_source' => 'auto',
      'title_custom' => '',
      'description_source' => 'auto',
      'description_custom' => '',
      'background_image_source' => 'auto',
      'background_image_custom' => '',
      'background_image_alt' => '',
      'include_navigation' => FALSE,
      'navigation_variant' => 'standard',
      'custom_css_classes' => '',
      'override_admin_toolbar_margins' => FALSE,
    ] + parent::defaultConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);
    $config = $this->getConfiguration();

    // Header variant selection
    $form['header_variant'] = [
      '#type' => 'select',
      '#title' => $this->t('Header Variant'),
      '#description' => $this->t('Choose the header layout and styling variant.'),
      '#options' => [
        'auto' => $this->t('Auto-detect (based on content type)'),
        'default' => $this->t('Standard Page Header'),
        'landing' => $this->t('Landing Page Header'),
        'hero' => $this->t('Hero Header'),
      ],
      '#default_value' => $config['header_variant'],
    ];

    // Content source configuration
    $form['content_sources'] = [
      '#type' => 'details',
      '#title' => $this->t('Content Sources'),
      '#description' => $this->t('Configure how header content is determined.'),
      '#open' => FALSE,
    ];

    $form['content_sources']['title_source'] = [
      '#type' => 'select',
      '#title' => $this->t('Title Source'),
      '#options' => [
        'auto' => $this->t('Auto (use service field hierarchy)'),
        'page_title' => $this->t('Page Title'),
        'custom' => $this->t('Custom Title'),
      ],
      '#default_value' => $config['title_source'],
    ];

    $form['content_sources']['title_custom'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Custom Title'),
      '#default_value' => $config['title_custom'],
      '#states' => [
        'visible' => [
          ':input[name="settings[content_sources][title_source]"]' => ['value' => 'custom'],
        ],
      ],
    ];

    $form['content_sources']['description_source'] = [
      '#type' => 'select',
      '#title' => $this->t('Description Source'),
      '#options' => [
        'auto' => $this->t('Auto (field_lead → field_summary → field_description)'),
        'custom' => $this->t('Custom Description'),
        'none' => $this->t('No Description'),
      ],
      '#default_value' => $config['description_source'],
    ];

    $form['content_sources']['description_custom'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Custom Description'),
      '#default_value' => $config['description_custom'],
      '#rows' => 3,
      '#states' => [
        'visible' => [
          ':input[name="settings[content_sources][description_source]"]' => ['value' => 'custom'],
        ],
      ],
    ];

    // Background image configuration
    $form['background'] = [
      '#type' => 'details',
      '#title' => $this->t('Background Image'),
      '#open' => FALSE,
    ];

    $form['background']['background_image_source'] = [
      '#type' => 'select',
      '#title' => $this->t('Background Image Source'),
      '#options' => [
        'auto' => $this->t('Auto (field_header_image → field_featured_image → field_media)'),
        'custom' => $this->t('Custom Image URL'),
        'none' => $this->t('No Background Image'),
      ],
      '#default_value' => $config['background_image_source'],
    ];

    $form['background']['background_image_custom'] = [
      '#type' => 'url',
      '#title' => $this->t('Custom Background Image URL'),
      '#default_value' => $config['background_image_custom'],
      '#states' => [
        'visible' => [
          ':input[name="settings[background][background_image_source]"]' => ['value' => 'custom'],
        ],
      ],
    ];

    $form['background']['background_image_alt'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Background Image Alt Text'),
      '#default_value' => $config['background_image_alt'],
      '#states' => [
        'visible' => [
          ':input[name="settings[background][background_image_source]"]' => ['value' => 'custom'],
        ],
      ],
    ];

    // Navigation integration
    $form['navigation'] = [
      '#type' => 'details',
      '#title' => $this->t('Navigation Integration'),
      '#description' => $this->t('Configure integrated navigation for landing pages.'),
      '#open' => FALSE,
    ];

    $form['navigation']['include_navigation'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Include Navigation'),
      '#description' => $this->t('Render navigation within the header (mainly for landing pages).'),
      '#default_value' => $config['include_navigation'],
    ];

    $form['navigation']['navigation_variant'] = [
      '#type' => 'select',
      '#title' => $this->t('Navigation Style'),
      '#options' => [
        'standard' => $this->t('Standard Navigation'),
        'transparent' => $this->t('Transparent Overlay Navigation'),
      ],
      '#default_value' => $config['navigation_variant'],
      '#states' => [
        'visible' => [
          ':input[name="settings[navigation][include_navigation]"]' => ['checked' => TRUE],
        ],
      ],
    ];

    // Advanced options
    $form['advanced'] = [
      '#type' => 'details',
      '#title' => $this->t('Advanced Options'),
      '#open' => FALSE,
    ];

    $form['advanced']['custom_css_classes'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Custom CSS Classes'),
      '#description' => $this->t('Additional CSS classes to add to the header wrapper.'),
      '#default_value' => $config['custom_css_classes'],
    ];

    $form['advanced']['override_admin_toolbar_margins'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Override Admin Toolbar Margins'),
      '#description' => $this->t('Force custom margin handling instead of automatic admin toolbar detection.'),
      '#default_value' => $config['override_admin_toolbar_margins'],
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    parent::blockSubmit($form, $form_state);
    $values = $form_state->getValues();

    // Flatten nested form structure
    $this->configuration['header_variant'] = $values['header_variant'];
    $this->configuration['title_source'] = $values['content_sources']['title_source'];
    $this->configuration['title_custom'] = $values['content_sources']['title_custom'];
    $this->configuration['description_source'] = $values['content_sources']['description_source'];
    $this->configuration['description_custom'] = $values['content_sources']['description_custom'];
    $this->configuration['background_image_source'] = $values['background']['background_image_source'];
    $this->configuration['background_image_custom'] = $values['background']['background_image_custom'];
    $this->configuration['background_image_alt'] = $values['background']['background_image_alt'];
    $this->configuration['include_navigation'] = $values['navigation']['include_navigation'];
    $this->configuration['navigation_variant'] = $values['navigation']['navigation_variant'];
    $this->configuration['custom_css_classes'] = $values['advanced']['custom_css_classes'];
    $this->configuration['override_admin_toolbar_margins'] = $values['advanced']['override_admin_toolbar_margins'];
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $config = $this->getConfiguration();

    // Check if headers should be excluded
    if ($this->headerContext->shouldExcludeHeader($this->routeMatch)) {
      return [
        '#cache' => [
          'contexts' => ['route'],
          'max-age' => 0,
        ],
      ];
    }

    // Get automatic header data
    $header_data = $this->headerContext->extractHeaderData($this->routeMatch);

    // Apply configuration overrides
    $component_props = $this->buildComponentProps($header_data, $config);

    // Determine which component to use
    $component_name = $this->getComponentName($component_props);

    // Build the SDC component render array
    return [
      '#type' => 'component',
      '#component' => $component_name,
      '#props' => $component_props,
      '#cache' => [
        'contexts' => ['route', 'user.permissions'],
        'tags' => $this->getCacheTags($header_data),
        'max-age' => 3600, // Cache for 1 hour
      ],
    ];
  }

  /**
   * Builds component props from header data and configuration.
   *
   * @param array $header_data
   *   Header data from PageHeaderContextService.
   * @param array $config
   *   Block configuration.
   *
   * @return array
   *   Props array for the SDC component.
   */
  protected function buildComponentProps(array $header_data, array $config) {
    // Determine variant
    $variant = $this->determineVariant($config['header_variant'], $header_data);

    // Build props array
    $props = [
      'variant' => $variant,
      'includes_navigation' => (bool) $config['include_navigation'],
    ];

    // Add title
    $props['title'] = $this->getTitle($config, $header_data);

    // Add description
    $props['description'] = $this->getDescription($config, $header_data);

    // Add background image
    $background_data = $this->getBackgroundImage($config, $header_data);
    $props['background_image'] = $background_data['url'];
    $props['alt_text'] = $background_data['alt'];

    // Add modifier classes
    if (!empty($config['custom_css_classes'])) {
      $props['modifier'] = $config['custom_css_classes'];
    }

    // Add navigation-related props if enabled
    if ($config['include_navigation']) {
      $props = array_merge($props, $this->getNavigationProps($config));
    }

    // Admin toolbar detection
    $props['has_admin_toolbar'] = $this->hasAdminToolbar();

    return $props;
  }

  /**
   * Determines the header variant to use.
   *
   * @param string $configured_variant
   *   Configured variant from block settings.
   * @param array $header_data
   *   Header data from service.
   *
   * @return string
   *   The variant to use.
   */
  protected function determineVariant($configured_variant, array $header_data) {
    if ($configured_variant !== 'auto') {
      return $configured_variant;
    }

    // Auto-detect based on content type
    if ($header_data['is_landing_page']) {
      return 'landing';
    }

    return 'default';
  }

  /**
   * Gets the title based on configuration.
   *
   * @param array $config
   *   Block configuration.
   * @param array $header_data
   *   Header data from service.
   *
   * @return string
   *   The title to use.
   */
  protected function getTitle(array $config, array $header_data) {
    switch ($config['title_source']) {
      case 'custom':
        return $config['title_custom'];

      case 'page_title':
        $request = \Drupal::request();
        $route = $this->routeMatch->getRouteObject();
        $title_resolver = \Drupal::service('title_resolver');
        return $title_resolver->getTitle($request, $route);

      case 'auto':
      default:
        return $header_data['title'];
    }
  }

  /**
   * Gets the description based on configuration.
   *
   * @param array $config
   *   Block configuration.
   * @param array $header_data
   *   Header data from service.
   *
   * @return string
   *   The description to use.
   */
  protected function getDescription(array $config, array $header_data) {
    switch ($config['description_source']) {
      case 'custom':
        return $config['description_custom'];

      case 'none':
        return '';

      case 'auto':
      default:
        return $header_data['description'];
    }
  }

  /**
   * Gets the background image based on configuration.
   *
   * @param array $config
   *   Block configuration.
   * @param array $header_data
   *   Header data from service.
   *
   * @return array
   *   Array with 'url' and 'alt' keys.
   */
  protected function getBackgroundImage(array $config, array $header_data) {
    switch ($config['background_image_source']) {
      case 'custom':
        return [
          'url' => $config['background_image_custom'],
          'alt' => $config['background_image_alt'],
        ];

      case 'none':
        return [
          'url' => '',
          'alt' => '',
        ];

      case 'auto':
      default:
        return [
          'url' => $header_data['background_image'],
          'alt' => $header_data['background_alt'],
        ];
    }
  }

  /**
   * Gets navigation-related props.
   *
   * @param array $config
   *   Block configuration.
   *
   * @return array
   *   Navigation props.
   */
  protected function getNavigationProps(array $config) {
    $site_config = $this->configFactory->get('system.site');
    $theme_config = $this->configFactory->get('adesso_cms_theme.settings');

    return [
      'site_name' => $site_config->get('name'),
      'logo' => theme_get_setting('logo.url'),
      'front_page' => '/',
      'main_menu' => [], // This would need to be populated from actual menu
      // Add regions for Drupal integration
      'header_left' => '', // Could be populated from regions
      'header_right' => '', // Could be populated from regions
    ];
  }

  /**
   * Checks if admin toolbar is present.
   *
   * @return bool
   *   TRUE if admin toolbar is present.
   */
  protected function hasAdminToolbar() {
    $config = $this->getConfiguration();
    if (!$config['override_admin_toolbar_margins']) {
      // Auto-detect admin toolbar
      $user = \Drupal::currentUser();
      return $user->hasPermission('access toolbar');
    }
    return FALSE;
  }

  /**
   * Determines which SDC component to use.
   *
   * @param array $component_props
   *   Component props array.
   *
   * @return string
   *   Component name (e.g., 'adesso_cms_theme:page-header').
   */
  protected function getComponentName(array $component_props) {
    // Use landing-page-header component when:
    // 1. Variant is 'landing' AND includes_navigation is TRUE
    // 2. This provides the specialized landing page with integrated navigation
    if ($component_props['variant'] === 'landing' && $component_props['includes_navigation']) {
      return 'adesso_cms_theme:landing-page-header';
    }

    // Use unified page-header component for all other cases:
    // - default variant
    // - hero variant  
    // - landing variant without navigation
    return 'adesso_cms_theme:page-header';
  }

  /**
   * Gets cache tags for the block.
   *
   * @param array $header_data
   *   Header data from service.
   *
   * @return array
   *   Cache tags.
   */
  protected function getCacheTags(array $header_data) {
    $tags = ['config:adesso_cms_theme.settings'];

    if (!empty($header_data['content_type'])) {
      $tags[] = 'node:' . $header_data['content_type'];
    }

    return $tags;
  }

}