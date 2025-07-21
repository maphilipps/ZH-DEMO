# Component Integration Patterns for adesso CMS

*Lullabot-inspired "glue code" patterns for SDC and Drupal integration*

## Core Integration Philosophy

### 1. Thin Glue Code Principle
- **Minimal Custom Code**: Use contrib modules for 80% of functionality
- **Strategic Integration**: Custom code only where systems need to connect
- **Service-Based Architecture**: Dependency injection for all integrations
- **Event-Driven Updates**: Loose coupling through event dispatchers

### 2. Integration Layer Architecture

```markdown
## adesso CMS Integration Stack

### Presentation Layer (SDC Components)
- Twig templates with component schemas
- JavaScript behaviors for interactions
- CSS/SCSS styling with design tokens
- Storybook documentation and testing

### Integration Layer (Glue Code)
- Component data providers
- Entity-to-component transformers  
- Cache management services
- Event subscribers and dispatchers

### Data Layer (Drupal Entities)
- Content entities (Nodes, Paragraphs, Media)
- Configuration entities (Content types, Fields)
- User-generated content and taxonomy
- External API integrations
```

## Service-Based Component Data Providers

### 1. Component Data Provider Pattern

**Base Provider Interface**:
```php
<?php

declare(strict_types=1);

namespace Drupal\adesso_cms_theme\Service;

/**
 * Interface for component data providers.
 */
interface ComponentDataProviderInterface {

  /**
   * Provides data for a specific component.
   *
   * @param array $context
   *   Additional context for data preparation.
   *
   * @return array
   *   Component-ready data array.
   */
  public function getData(array $context = []): array;

  /**
   * Gets the component name this provider serves.
   *
   * @return string
   *   The component machine name.
   */
  public function getComponentName(): string;

}
```

**Navigation Data Provider Implementation**:
```php
<?php

declare(strict_types=1);

namespace Drupal\adesso_cms_theme\Service;

use Drupal\Core\Menu\MenuTreeInterface;
use Drupal\Core\Menu\MenuTreeParameters;
use Drupal\Core\Url;

/**
 * Provides navigation data for SDC components.
 */
class NavigationDataProvider implements ComponentDataProviderInterface {

  public function __construct(
    private readonly MenuTreeInterface $menuTree,
    private readonly RequestStackInterface $requestStack,
  ) {}

  /**
   * {@inheritdoc}
   */
  public function getData(array $context = []): array {
    $menu_name = $context['menu_name'] ?? 'main';
    $max_depth = $context['max_depth'] ?? 3;

    $parameters = new MenuTreeParameters();
    $parameters->setMaxDepth($max_depth);
    $parameters->onlyEnabledLinks();

    $tree = $this->menuTree->load($menu_name, $parameters);
    $manipulators = [
      ['callable' => 'menu.default_tree_manipulators:checkAccess'],
      ['callable' => 'menu.default_tree_manipulators:generateIndexAndSort'],
    ];
    $tree = $this->menuTree->transform($tree, $manipulators);

    return [
      'items' => $this->transformMenuTree($tree),
      'menu_name' => $menu_name,
      'current_path' => $this->getCurrentPath(),
      'theme' => $context['theme'] ?? 'light',
      'orientation' => $context['orientation'] ?? 'horizontal',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getComponentName(): string {
    return 'main-menu';
  }

  /**
   * Transforms menu tree to component-compatible format.
   */
  private function transformMenuTree(array $tree): array {
    $items = [];
    
    foreach ($tree as $element) {
      $link = $element->link;
      $url = $link->getUrlObject();
      
      $item = [
        'title' => $link->getTitle(),
        'url' => $url->toString(),
        'is_external' => $url->isExternal(),
        'is_new_window' => $this->shouldOpenInNewWindow($url),
        'in_active_trail' => $element->inActiveTrail,
        'below' => [],
        'attributes' => '',
        'link_attributes' => $this->buildLinkAttributes($url, $element),
      ];

      // Recursively handle submenu items
      if ($element->subtree) {
        $item['below'] = $this->transformMenuTree($element->subtree);
        $item['is_expanded'] = !empty($item['below']);
      }

      $items[] = $item;
    }

    return $items;
  }

  /**
   * Determines if link should open in new window.
   */
  private function shouldOpenInNewWindow(Url $url): bool {
    // External links open in new window
    if ($url->isExternal()) {
      return TRUE;
    }

    // Check for specific routes that should open in new window
    $new_window_routes = ['contact.site_page', 'user.login'];
    return in_array($url->getRouteName(), $new_window_routes);
  }

  /**
   * Builds link attributes for accessibility and UX.
   */
  private function buildLinkAttributes(Url $url, $element): string {
    $attributes = [];

    if ($url->isExternal()) {
      $attributes['target'] = '_blank';
      $attributes['rel'] = 'noopener noreferrer';
      $attributes['aria-label'] = $element->link->getTitle() . ' (opens in new window)';
    }

    if ($element->inActiveTrail && !$element->subtree) {
      $attributes['aria-current'] = 'page';
    }

    return $this->attributesToString($attributes);
  }

  /**
   * Converts attributes array to HTML string.
   */
  private function attributesToString(array $attributes): string {
    $strings = [];
    foreach ($attributes as $name => $value) {
      $strings[] = sprintf('%s="%s"', $name, htmlspecialchars($value));
    }
    return implode(' ', $strings);
  }

  /**
   * Gets current request path for active state detection.
   */
  private function getCurrentPath(): string {
    $request = $this->requestStack->getCurrentRequest();
    return $request ? $request->getPathInfo() : '';
  }

}
```

### 2. Entity-to-Component Transformer

**Base Transformer Interface**:
```php
<?php

declare(strict_types=1);

namespace Drupal\adesso_cms_theme\Service;

use Drupal\Core\Entity\EntityInterface;

/**
 * Interface for entity-to-component transformers.
 */
interface EntityTransformerInterface {

  /**
   * Transforms entity data to component props.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   The entity to transform.
   * @param array $context
   *   Additional transformation context.
   *
   * @return array
   *   Component-compatible props array.
   */
  public function transform(EntityInterface $entity, array $context = []): array;

  /**
   * Gets supported entity types and bundles.
   *
   * @return array
   *   Array of supported entity_type => [bundles].
   */
  public function getSupportedEntityTypes(): array;

}
```

**Card Component Transformer**:
```php
<?php

declare(strict_types=1);

namespace Drupal\adesso_cms_theme\Service;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Render\RendererInterface;
use Drupal\image\Entity\ImageStyle;

/**
 * Transforms entities to card component props.
 */
class CardComponentTransformer implements EntityTransformerInterface {

  public function __construct(
    private readonly RendererInterface $renderer,
    private readonly EntityDisplayRepositoryInterface $displayRepository,
  ) {}

  /**
   * {@inheritdoc}
   */
  public function transform(EntityInterface $entity, array $context = []): array {
    $view_mode = $context['view_mode'] ?? 'card';
    
    return [
      'title' => $this->getEntityTitle($entity),
      'description' => $this->getEntitySummary($entity, $view_mode),
      'image' => $this->getEntityImage($entity, $view_mode),
      'url' => $entity->toUrl()->toString(),
      'date' => $this->getEntityDate($entity),
      'categories' => $this->getEntityCategories($entity),
      'theme' => $context['theme'] ?? 'light',
      'orientation' => $context['orientation'] ?? 'vertical',
      'show_author' => $context['show_author'] ?? FALSE,
      'author' => $this->getEntityAuthor($entity),
      'attributes' => $this->buildEntityAttributes($entity),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getSupportedEntityTypes(): array {
    return [
      'node' => ['article', 'drupal_cms_page', 'event'],
      'paragraph' => ['card'],
    ];
  }

  /**
   * Gets entity title with fallback.
   */
  private function getEntityTitle(EntityInterface $entity): string {
    if ($entity->hasField('title')) {
      return $entity->get('title')->value ?: 'Untitled';
    }
    
    if ($entity->hasField('field_title')) {
      return $entity->get('field_title')->value ?: 'Untitled';
    }
    
    return $entity->label() ?: 'Untitled';
  }

  /**
   * Gets entity summary/description field.
   */
  private function getEntitySummary(EntityInterface $entity, string $view_mode): string {
    // Try summary field first
    if ($entity->hasField('field_summary') && !$entity->get('field_summary')->isEmpty()) {
      return $entity->get('field_summary')->value;
    }

    // Try body summary
    if ($entity->hasField('body') && !$entity->get('body')->isEmpty()) {
      $body = $entity->get('body')->first();
      return $body ? $body->summary ?: text_summary($body->value, 'basic_html', 160) : '';
    }

    // Try description field
    if ($entity->hasField('field_description') && !$entity->get('field_description')->isEmpty()) {
      return $entity->get('field_description')->value;
    }

    return '';
  }

  /**
   * Gets entity featured image with responsive variants.
   */
  private function getEntityImage(EntityInterface $entity, string $view_mode): array {
    $image_data = [
      'src' => '',
      'alt' => '',
      'responsive' => [],
    ];

    if (!$entity->hasField('field_featured_image') || $entity->get('field_featured_image')->isEmpty()) {
      return $image_data;
    }

    $media_entity = $entity->get('field_featured_image')->entity;
    if (!$media_entity || !$media_entity->hasField('field_media_image')) {
      return $image_data;
    }

    $image_field = $media_entity->get('field_media_image');
    if ($image_field->isEmpty()) {
      return $image_data;
    }

    $image = $image_field->first();
    $file = $image->entity;
    
    if (!$file) {
      return $image_data;
    }

    $image_data['alt'] = $image->alt ?: '';
    
    // Generate responsive image variants
    $styles = ['card_small', 'card_medium', 'card_large'];
    foreach ($styles as $style_name) {
      $style = ImageStyle::load($style_name);
      if ($style) {
        $image_data['responsive'][$style_name] = $style->buildUrl($file->getFileUri());
      }
    }

    // Default src is the largest variant
    $image_data['src'] = $image_data['responsive']['card_large'] ?? file_create_url($file->getFileUri());

    return $image_data;
  }

  /**
   * Gets entity publication date.
   */
  private function getEntityDate(EntityInterface $entity): array {
    $date_data = [
      'timestamp' => NULL,
      'formatted' => '',
      'relative' => '',
    ];

    // Try created date
    if ($entity->hasField('created')) {
      $timestamp = $entity->get('created')->value;
      $date_data['timestamp'] = $timestamp;
      $date_data['formatted'] = \Drupal::service('date.formatter')->format($timestamp, 'custom', 'F j, Y');
      $date_data['relative'] = \Drupal::service('date.formatter')->formatTimeDiffSince($timestamp);
    }

    // Override with custom date field if available
    if ($entity->hasField('field_date') && !$entity->get('field_date')->isEmpty()) {
      $date_value = $entity->get('field_date')->first()->value;
      if ($date_value) {
        $timestamp = strtotime($date_value);
        $date_data['timestamp'] = $timestamp;
        $date_data['formatted'] = \Drupal::service('date.formatter')->format($timestamp, 'custom', 'F j, Y');
        $date_data['relative'] = \Drupal::service('date.formatter')->formatTimeDiffSince($timestamp);
      }
    }

    return $date_data;
  }

  /**
   * Gets entity categories/tags.
   */
  private function getEntityCategories(EntityInterface $entity): array {
    $categories = [];

    if ($entity->hasField('field_categories') && !$entity->get('field_categories')->isEmpty()) {
      foreach ($entity->get('field_categories')->referencedEntities() as $term) {
        $categories[] = [
          'name' => $term->getName(),
          'url' => $term->toUrl()->toString(),
          'id' => $term->id(),
        ];
      }
    }

    return $categories;
  }

  /**
   * Gets entity author information.
   */
  private function getEntityAuthor(EntityInterface $entity): array {
    $author_data = [
      'name' => '',
      'url' => '',
      'image' => '',
    ];

    if ($entity->hasField('uid') && !$entity->get('uid')->isEmpty()) {
      $author = $entity->get('uid')->entity;
      if ($author) {
        $author_data['name'] = $author->getDisplayName();
        $author_data['url'] = $author->toUrl()->toString();
        
        // Get user profile image if available
        if ($author->hasField('user_picture') && !$author->get('user_picture')->isEmpty()) {
          $image = $author->get('user_picture')->entity;
          if ($image) {
            $author_data['image'] = file_create_url($image->getFileUri());
          }
        }
      }
    }

    return $author_data;
  }

  /**
   * Builds entity attributes for component rendering.
   */
  private function buildEntityAttributes(EntityInterface $entity): string {
    $attributes = [
      'data-entity-id' => $entity->id(),
      'data-entity-type' => $entity->getEntityTypeId(),
    ];

    if ($entity->hasField('field_css_classes') && !$entity->get('field_css_classes')->isEmpty()) {
      $attributes['class'] = $entity->get('field_css_classes')->value;
    }

    return $this->attributesToString($attributes);
  }

  /**
   * Converts attributes array to HTML string.
   */
  private function attributesToString(array $attributes): string {
    $strings = [];
    foreach ($attributes as $name => $value) {
      $strings[] = sprintf('%s="%s"', $name, htmlspecialchars($value));
    }
    return implode(' ', $strings);
  }

}
```

## Event-Driven Component Updates

### 1. Component Cache Manager

**Cache Management Service**:
```php
<?php

declare(strict_types=1);

namespace Drupal\adesso_cms_theme\Service;

use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Entity\EntityInterface;

/**
 * Manages component data caching.
 */
class ComponentCacheManager {

  public function __construct(
    private readonly CacheBackendInterface $cache,
    private readonly array $componentProviders,
  ) {}

  /**
   * Gets cached component data.
   */
  public function getCachedData(string $component_name, array $context = []): ?array {
    $cache_key = $this->buildCacheKey($component_name, $context);
    $cached = $this->cache->get($cache_key);
    
    return $cached ? $cached->data : NULL;
  }

  /**
   * Sets component data cache.
   */
  public function setCachedData(string $component_name, array $data, array $context = [], array $cache_tags = []): void {
    $cache_key = $this->buildCacheKey($component_name, $context);
    
    // Set cache with default 1 hour expiration
    $this->cache->set(
      $cache_key,
      $data,
      time() + 3600, // 1 hour
      array_merge(['component:' . $component_name], $cache_tags)
    );
  }

  /**
   * Invalidates component cache by entity.
   */
  public function invalidateByEntity(EntityInterface $entity): void {
    $entity_type = $entity->getEntityTypeId();
    $bundle = $entity->bundle();
    
    // Invalidate related component caches
    $cache_tags = [
      'entity:' . $entity_type,
      'entity:' . $entity_type . ':' . $bundle,
      'entity:' . $entity_type . ':' . $entity->id(),
    ];

    $this->cache->invalidateMultiple($cache_tags);
  }

  /**
   * Builds cache key from component name and context.
   */
  private function buildCacheKey(string $component_name, array $context): string {
    ksort($context); // Ensure consistent key ordering
    return 'component:' . $component_name . ':' . md5(serialize($context));
  }

  /**
   * Clears all component caches.
   */
  public function clearAll(): void {
    $this->cache->deleteMultiple(['component']);
  }

}
```

### 2. Entity Update Event Subscriber

**Component Update Subscriber**:
```php
<?php

declare(strict_types=1);

namespace Drupal\adesso_cms_theme\EventSubscriber;

use Drupal\Core\Entity\EntityInterface;
use Drupal\hook_event_dispatcher\HookEventDispatcherInterface;
use Drupal\node\NodeInterface;
use Drupal\adesso_cms_theme\Service\ComponentCacheManager;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Responds to entity changes for component cache management.
 */
class ComponentUpdateSubscriber implements EventSubscriberInterface {

  public function __construct(
    private readonly ComponentCacheManager $cacheManager,
  ) {}

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    return [
      HookEventDispatcherInterface::ENTITY_INSERT => 'onEntityUpdate',
      HookEventDispatcherInterface::ENTITY_UPDATE => 'onEntityUpdate',
      HookEventDispatcherInterface::ENTITY_DELETE => 'onEntityUpdate',
    ];
  }

  /**
   * Handles entity update events.
   */
  public function onEntityUpdate($event): void {
    $entity = $event->getEntity();
    
    // Only process entities that affect component rendering
    if (!$this->shouldProcessEntity($entity)) {
      return;
    }

    // Invalidate component caches
    $this->cacheManager->invalidateByEntity($entity);

    // Handle specific entity types
    $this->handleSpecificEntityUpdates($entity);
  }

  /**
   * Determines if entity should trigger component updates.
   */
  private function shouldProcessEntity(EntityInterface $entity): bool {
    $processable_types = [
      'node',
      'paragraph', 
      'media',
      'taxonomy_term',
      'menu_link_content',
    ];

    return in_array($entity->getEntityTypeId(), $processable_types);
  }

  /**
   * Handles entity-specific update logic.
   */
  private function handleSpecificEntityUpdates(EntityInterface $entity): void {
    switch ($entity->getEntityTypeId()) {
      case 'menu_link_content':
        // Menu changes affect navigation components
        $this->cacheManager->clearAll(); // Clear all navigation caches
        break;

      case 'node':
        if ($entity instanceof NodeInterface) {
          $this->handleNodeUpdate($entity);
        }
        break;

      case 'media':
        // Media changes affect any components using images
        $this->handleMediaUpdate($entity);
        break;
    }
  }

  /**
   * Handles node-specific updates.
   */
  private function handleNodeUpdate(NodeInterface $node): void {
    // If node has related content, invalidate those too
    if ($node->hasField('field_related_content') && !$node->get('field_related_content')->isEmpty()) {
      foreach ($node->get('field_related_content')->referencedEntities() as $related_entity) {
        $this->cacheManager->invalidateByEntity($related_entity);
      }
    }

    // Handle featured content updates
    if ($node->hasField('field_featured') && $node->get('field_featured')->value) {
      // Clear featured content component caches
      $this->cacheManager->clearAll();
    }
  }

  /**
   * Handles media entity updates.
   */
  private function handleMediaUpdate(EntityInterface $media): void {
    // Find all content that references this media
    $usage = \Drupal::service('entity_usage.usage');
    $targets = $usage->listTargets($media);
    
    foreach ($targets as $target_type => $entities) {
      foreach ($entities as $entity_id => $data) {
        $entity = \Drupal::entityTypeManager()->getStorage($target_type)->load($entity_id);
        if ($entity) {
          $this->cacheManager->invalidateByEntity($entity);
        }
      }
    }
  }

}
```

## Integration with Existing Modules

### 1. Paragraphs Module Integration

**Paragraph Component Renderer**:
```php
<?php

declare(strict_types=1);

namespace Drupal\adesso_cms_theme\Service;

use Drupal\paragraphs\Entity\Paragraph;
use Drupal\Core\Render\RendererInterface;

/**
 * Renders Paragraph entities as SDC components.
 */
class ParagraphComponentRenderer {

  public function __construct(
    private readonly RendererInterface $renderer,
    private readonly array $transformers,
  ) {}

  /**
   * Renders paragraph as component.
   */
  public function renderParagraph(Paragraph $paragraph, array $context = []): array {
    $bundle = $paragraph->bundle();
    
    // Map paragraph bundles to components
    $component_map = [
      'hero' => 'hero',
      'text' => 'rich-text',
      'card_group' => 'card-group',
      'accordion' => 'accordion',
      'gallery' => 'gallery',
      'carousel' => 'carousel',
    ];

    $component_name = $component_map[$bundle] ?? 'rich-text';
    
    // Transform paragraph data to component props
    $transformer = $this->getTransformerForBundle($bundle);
    $props = $transformer ? $transformer->transform($paragraph, $context) : [];

    // Build component render array
    return [
      '#type' => 'component',
      '#component' => $component_name,
      '#props' => $props,
      '#cache' => [
        'tags' => $paragraph->getCacheTags(),
        'contexts' => ['user.permissions'],
        'max-age' => 3600,
      ],
    ];
  }

  /**
   * Gets appropriate transformer for paragraph bundle.
   */
  private function getTransformerForBundle(string $bundle): ?EntityTransformerInterface {
    return $this->transformers[$bundle] ?? NULL;
  }

}
```

### 2. Views Integration

**Component Views Plugin**:
```php
<?php

declare(strict_types=1);

namespace Drupal\adesso_cms_theme\Plugin\views\style;

use Drupal\views\Plugin\views\style\StylePluginBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Style plugin for rendering Views as components.
 *
 * @ViewsStyle(
 *   id = "component_style",
 *   title = @Translation("Component"),
 *   help = @Translation("Renders view results as SDC components."),
 *   theme = "views_view_component",
 *   display_types = {"normal"}
 * )
 */
class ComponentStyle extends StylePluginBase {

  protected $usesRowPlugin = TRUE;
  protected $usesGrouping = FALSE;

  /**
   * {@inheritdoc}
   */
  protected function defineOptions(): array {
    $options = parent::defineOptions();
    
    $options['component_name'] = ['default' => 'card-group'];
    $options['component_theme'] = ['default' => 'light'];
    $options['items_per_row'] = ['default' => 3];
    $options['show_pager'] = ['default' => TRUE];
    
    return $options;
  }

  /**
   * {@inheritdoc}
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state): void {
    parent::buildOptionsForm($form, $form_state);

    $form['component_name'] = [
      '#type' => 'select',
      '#title' => $this->t('Component'),
      '#options' => $this->getAvailableComponents(),
      '#default_value' => $this->options['component_name'],
      '#description' => $this->t('Select the component to use for rendering.'),
    ];

    $form['component_theme'] = [
      '#type' => 'select',
      '#title' => $this->t('Theme'),
      '#options' => [
        'light' => $this->t('Light'),
        'dark' => $this->t('Dark'),
      ],
      '#default_value' => $this->options['component_theme'],
    ];

    $form['items_per_row'] = [
      '#type' => 'select',
      '#title' => $this->t('Items per row'),
      '#options' => array_combine(range(1, 6), range(1, 6)),
      '#default_value' => $this->options['items_per_row'],
    ];

    $form['show_pager'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Show pager'),
      '#default_value' => $this->options['show_pager'],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function render(): array {
    $rows = [];
    
    foreach ($this->view->result as $index => $row) {
      $this->view->row_index = $index;
      $rows[] = $this->view->rowPlugin->render($row);
    }

    $build = [
      '#type' => 'component',
      '#component' => $this->options['component_name'],
      '#props' => [
        'items' => $rows,
        'theme' => $this->options['component_theme'],
        'items_per_row' => (int) $this->options['items_per_row'],
        'attributes' => 'class="view-' . $this->view->id() . '"',
      ],
      '#cache' => [
        'tags' => $this->view->getCacheTags(),
        'contexts' => $this->view->getCacheContexts(),
        'max-age' => $this->view->getCacheMaxAge(),
      ],
    ];

    if ($this->options['show_pager']) {
      $build['#attached']['library'][] = 'adesso_cms_theme/pager';
    }

    unset($this->view->row_index);
    return $build;
  }

  /**
   * Gets available component options.
   */
  private function getAvailableComponents(): array {
    return [
      'card-group' => $this->t('Card Group'),
      'recent-cards' => $this->t('Recent Cards'),
      'gallery' => $this->t('Gallery'),
      'logo-collection' => $this->t('Logo Collection'),
    ];
  }

}
```

## Hook Integration Patterns

### 1. Preprocess Hook Integration

**Theme Preprocess for Component Integration**:
```php
<?php

/**
 * @file
 * Theme preprocess functions for component integration.
 */

use Drupal\Core\Render\Element;

/**
 * Implements hook_preprocess_node().
 */
function adesso_cms_theme_preprocess_node(&$variables): void {
  $node = $variables['node'];
  $view_mode = $variables['view_mode'];

  // Add component data to node templates
  if ($view_mode === 'card') {
    $transformer = \Drupal::service('adesso_cms_theme.card_transformer');
    $variables['component_data'] = $transformer->transform($node, [
      'view_mode' => $view_mode,
      'theme' => $variables['theme'] ?? 'light',
    ]);
  }

  // Add component-specific CSS classes
  $variables['attributes']['class'][] = 'component-node';
  $variables['attributes']['class'][] = 'component-node--' . str_replace('_', '-', $node->bundle());
  $variables['attributes']['class'][] = 'component-node--view-mode-' . str_replace('_', '-', $view_mode);
}

/**
 * Implements hook_preprocess_paragraph().
 */
function adesso_cms_theme_preprocess_paragraph(&$variables): void {
  $paragraph = $variables['paragraph'];
  $bundle = $paragraph->bundle();

  // Map paragraph to component data
  $component_renderer = \Drupal::service('adesso_cms_theme.paragraph_renderer');
  $component_data = $component_renderer->renderParagraph($paragraph, [
    'theme' => $variables['theme'] ?? 'light',
  ]);

  $variables['component_data'] = $component_data['#props'] ?? [];
  $variables['component_name'] = $component_data['#component'] ?? $bundle;

  // Add component wrapper classes
  $variables['attributes']['class'][] = 'component-paragraph';
  $variables['attributes']['class'][] = 'component-paragraph--' . str_replace('_', '-', $bundle);
}

/**
 * Implements hook_preprocess_block().
 */
function adesso_cms_theme_preprocess_block(&$variables): void {
  $block = $variables['elements']['#block'];
  $plugin_id = $block->getPluginId();

  // Handle system blocks with component data
  switch ($plugin_id) {
    case 'system_menu_block:main':
      $menu_provider = \Drupal::service('adesso_cms_theme.navigation_provider');
      $variables['component_data'] = $menu_provider->getData([
        'menu_name' => 'main',
        'theme' => $variables['theme'] ?? 'light',
      ]);
      break;

    case 'system_branding_block':
      $variables['component_data'] = [
        'site_name' => \Drupal::config('system.site')->get('name'),
        'site_slogan' => \Drupal::config('system.site')->get('slogan'),
        'logo_url' => theme_get_setting('logo.url'),
        'front_page_url' => \Drupal::url('<front>'),
      ];
      break;
  }

  // Add block-specific component classes
  $variables['attributes']['class'][] = 'component-block';
  $variables['attributes']['class'][] = 'component-block--' . str_replace('_', '-', $plugin_id);
}
```

### 2. Form Integration

**Component Form Elements**:
```php
<?php

/**
 * Implements hook_theme().
 */
function adesso_cms_theme_theme($existing, $type, $theme, $path): array {
  return [
    'form_element_component' => [
      'render element' => 'element',
      'base hook' => 'form_element',
    ],
    'input_component' => [
      'render element' => 'element',
      'base hook' => 'input',
    ],
  ];
}

/**
 * Implements hook_preprocess_form_element().
 */
function adesso_cms_theme_preprocess_form_element(&$variables): void {
  $element = $variables['element'];
  
  // Add component data for form elements
  $variables['component_data'] = [
    'label' => $variables['label']['#title'] ?? '',
    'description' => $element['#description'] ?? '',
    'required' => !empty($element['#required']),
    'errors' => $variables['errors'] ?? '',
    'type' => $element['#type'] ?? 'textfield',
    'theme' => 'light',
  ];

  // Add component classes
  $variables['attributes']['class'][] = 'component-form-element';
  $variables['attributes']['class'][] = 'component-form-element--' . ($element['#type'] ?? 'unknown');
}

/**
 * Implements hook_preprocess_input().
 */
function adesso_cms_theme_preprocess_input(&$variables): void {
  $element = $variables['element'];
  
  $variables['component_data'] = [
    'type' => $element['#type'] ?? 'text',
    'placeholder' => $element['#placeholder'] ?? '',
    'required' => !empty($element['#required']),
    'disabled' => !empty($element['#disabled']),
    'theme' => 'light',
  ];

  // Add component classes
  $variables['attributes']['class'][] = 'component-input';
  $variables['attributes']['class'][] = 'component-input--' . ($element['#type'] ?? 'text');
}
```

## Testing Integration Patterns

### 1. Component Integration Testing

**Integration Test Base Class**:
```php
<?php

declare(strict_types=1);

namespace Drupal\Tests\adesso_cms_theme\Kernel;

use Drupal\KernelTests\KernelTestBase;
use Drupal\node\Entity\Node;
use Drupal\node\Entity\NodeType;

/**
 * Base class for component integration tests.
 */
abstract class ComponentIntegrationTestBase extends KernelTestBase {

  /**
   * {@inheritdoc}
   */
  protected static $modules = [
    'system',
    'user',
    'node',
    'field',
    'text',
    'components',
    'adesso_cms_theme',
  ];

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();

    $this->installEntitySchema('user');
    $this->installEntitySchema('node');
    $this->installConfig(['system', 'node', 'adesso_cms_theme']);

    // Create test content type
    NodeType::create([
      'type' => 'test_content',
      'name' => 'Test Content',
    ])->save();
  }

  /**
   * Creates a test node for component testing.
   */
  protected function createTestNode(array $values = []): Node {
    $default_values = [
      'type' => 'test_content',
      'title' => 'Test Node',
      'status' => 1,
    ];

    return Node::create(array_merge($default_values, $values));
  }

  /**
   * Asserts component data structure.
   */
  protected function assertComponentData(array $data, array $required_keys): void {
    foreach ($required_keys as $key) {
      $this->assertArrayHasKey($key, $data, "Component data missing required key: {$key}");
    }
  }

}
```

### 2. Component Provider Testing

**Data Provider Test**:
```php
<?php

declare(strict_types=1);

namespace Drupal\Tests\adesso_cms_theme\Kernel;

/**
 * Tests navigation data provider.
 *
 * @group adesso_cms_theme
 */
class NavigationDataProviderTest extends ComponentIntegrationTestBase {

  /**
   * {@inheritdoc}
   */
  protected static $modules = [
    'system',
    'user', 
    'node',
    'menu_link_content',
    'link',
    'adesso_cms_theme',
  ];

  /**
   * Tests navigation data provider.
   */
  public function testNavigationDataProvider(): void {
    $provider = $this->container->get('adesso_cms_theme.navigation_provider');
    
    $this->assertEquals('main-menu', $provider->getComponentName());
    
    $data = $provider->getData(['menu_name' => 'main']);
    
    $required_keys = ['items', 'menu_name', 'current_path', 'theme', 'orientation'];
    $this->assertComponentData($data, $required_keys);
    
    $this->assertEquals('main', $data['menu_name']);
    $this->assertEquals('light', $data['theme']);
    $this->assertEquals('horizontal', $data['orientation']);
    $this->assertIsArray($data['items']);
  }

  /**
   * Tests navigation item structure.
   */
  public function testNavigationItemStructure(): void {
    // Create test menu link
    $menu_link = MenuLinkContent::create([
      'title' => 'Test Link',
      'link' => ['uri' => 'internal:/node/1'],
      'menu_name' => 'main',
    ]);
    $menu_link->save();

    $provider = $this->container->get('adesso_cms_theme.navigation_provider');
    $data = $provider->getData(['menu_name' => 'main']);

    $this->assertNotEmpty($data['items']);
    
    $item = $data['items'][0];
    $required_item_keys = [
      'title', 'url', 'is_external', 'is_new_window', 
      'in_active_trail', 'below', 'attributes', 'link_attributes'
    ];
    
    $this->assertComponentData($item, $required_item_keys);
    $this->assertEquals('Test Link', $item['title']);
    $this->assertFalse($item['is_external']);
  }

}
```

This component integration pattern provides a robust foundation for connecting Drupal's entity system with our SDC components while maintaining performance, cacheability, and testability standards inspired by Lullabot's architecture principles.