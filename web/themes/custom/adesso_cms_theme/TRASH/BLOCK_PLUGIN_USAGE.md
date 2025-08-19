# Page Header Block Plugin Usage Guide

## Block Plugin Overview

The `PageHeaderBlock` provides a configurable alternative to hardcoded page headers in templates. It integrates seamlessly with existing SDC components and the `PageHeaderContextService`.

## Block Configuration

### Admin Interface

The block can be configured at `/admin/structure/block` with the following options:

#### Header Variant
- **Auto-detect**: Automatically chooses variant based on content type
- **Standard**: Standard page header for regular content
- **Landing**: Large landing page header with hero styling
- **Hero**: Full-screen hero header with enhanced visuals

#### Content Sources
- **Title Source**: Auto (field hierarchy), Page Title, or Custom
- **Description Source**: Auto (field hierarchy), Custom, or None
- **Background Image**: Auto (field hierarchy), Custom URL, or None

#### Navigation Integration
- **Include Navigation**: Render navigation within header (for landing pages)
- **Navigation Style**: Standard or Transparent overlay

#### Advanced Options
- **Custom CSS Classes**: Additional wrapper classes
- **Admin Toolbar Override**: Custom margin handling

## Usage Examples

### 1. Standard Page Header (Auto Configuration)

```yaml
# Block placement configuration
block.block.page_header:
  id: adesso_cms_page_header
  weight: -10
  region: header
  visibility:
    node_type:
      id: node_type
      negate: false
      bundles:
        page: page
        news: news
        event: event
```

**Result**: Automatically extracts title, description, and background from node fields using the service hierarchy.

### 2. Landing Page with Custom Configuration

```yaml
# Block configuration in config/block.block.landing_page_header.yml
settings:
  header_variant: 'landing'
  title_source: 'custom'
  title_custom: 'Welcome to Our Platform'
  description_source: 'custom' 
  description_custom: 'Discover amazing features and capabilities'
  background_image_source: 'custom'
  background_image_custom: 'https://images.example.com/hero-bg.jpg'
  include_navigation: true
  navigation_variant: 'transparent'
```

### 3. Hero Header for Special Pages

```yaml
settings:
  header_variant: 'hero'
  title_source: 'auto'
  description_source: 'auto'
  background_image_source: 'auto'
  custom_css_classes: 'hero-special'
```

## Template Integration

### Using Block in Templates

```twig
{# In page.html.twig or node templates #}
{% if page.header_block %}
  {{ page.header_block }}
{% endif %}
```

### Custom Block Placement

```twig
{# Render block programmatically #}
{{ drupal_block('adesso_cms_page_header', {
  'header_variant': 'hero',
  'title_custom': 'Dynamic Title',
  'description_custom': 'Dynamic description'
}) }}
```

## Component Integration

### SDC Component Props

The block passes the following props to `adesso_cms_theme:page-header`:

```php
[
  'variant' => 'default|landing|hero',
  'title' => 'Page title',
  'description' => 'Page description', 
  'background_image' => 'https://...',
  'alt_text' => 'Alt text',
  'includes_navigation' => false,
  'modifier' => 'custom-classes',
  'has_admin_toolbar' => true,
  // Navigation props (when includes_navigation = true)
  'site_name' => 'Site Name',
  'logo' => '/themes/custom/adesso_cms_theme/logo.svg',
  'front_page' => '/',
  'main_menu' => [...],
]
```

### Component Rendering

The existing `page-header.twig` component handles all variants seamlessly:

- **default**: Standard page header with moderate spacing
- **landing**: Large landing page header with hero styling  
- **hero**: Full-screen header with enhanced visuals

## Performance & Caching

### Cache Configuration

The block implements smart caching:

```php
'#cache' => [
  'contexts' => ['route', 'user.permissions'],
  'tags' => ['config:adesso_cms_theme.settings', 'node:{type}'],
  'max-age' => 3600, // 1 hour
]
```

### Cache Invalidation

- Cache is invalidated when:
  - Route changes (different pages)
  - User permissions change (affects admin toolbar detection)
  - Theme configuration changes
  - Node content is updated

## Migration Strategy

### Phase 1: Parallel Installation
```php
// Theme template (backward compatible)
{% if theme.settings.use_block_headers %}
  {# Block-based header - placed via block layout #}
  {{ page.header_block }}
{% else %}
  {# Existing template logic - preserved #}
  {% if page_title and not has_video_hero %}
    {% include 'adesso_cms_theme:page-header' with header_data %}
  {% endif %}
{% endif %}
```

### Phase 2: Block Layout Configuration

1. **Place Block**: Add Page Header block to Header region
2. **Configure Visibility**: Set content type conditions
3. **Test Functionality**: Verify all variants work correctly
4. **Enable Toggle**: Set `theme.settings.use_block_headers = true`

### Phase 3: Template Cleanup

Once block system is validated:
- Remove template header logic
- Clean up preprocessing functions
- Update theme documentation

## Troubleshooting

### Block Not Visible
- Check block visibility conditions
- Verify block is placed in correct region
- Confirm content type matches visibility settings

### Missing Content
- Review field hierarchy in PageHeaderContextService
- Check node has required fields (field_lead, field_header_image, etc.)
- Verify auto-detection logic in block configuration

### Styling Issues
- Ensure SDC component CSS is loading
- Check custom CSS classes configuration
- Verify variant-specific styling in page-header.twig

### Performance Issues
- Review cache configuration
- Check for cache tag invalidation
- Monitor database queries in header data extraction

## Development Tools

### Debugging Header Data

```php
// In template or preprocessing
$header_service = \Drupal::service('adesso_cms_theme.page_header_context');
$header_data = $header_service->extractHeaderData(\Drupal::routeMatch());
dump($header_data);
```

### Testing Block Configuration

```php
// Programmatic block creation for testing
$block_manager = \Drupal::service('plugin.manager.block');
$block = $block_manager->createInstance('adesso_cms_page_header', $config);
$render_array = $block->build();
```

This block plugin provides the foundation for flexible, configurable page headers while maintaining full backward compatibility with existing templates.