# Page Header Context Service Usage Examples

## Service Usage in Templates

The `PageHeaderContextService` can now be used in templates via the Twig extension:

```twig
{# Get complete header context data #}
{% set header_data = page_header_context() %}

{# Usage example #}
{% if header_data.title and not page_header_should_exclude() %}
  {% include 'adesso_cms_theme:page-header' with {
    variant: header_data.is_landing_page ? 'landing' : 'default',
    title: header_data.title,
    description: header_data.description,
    background_image: header_data.background_image,
    alt_text: header_data.background_alt
  } %}
{% endif %}
```

## Service Usage in Block Plugins

The service can be injected into custom block plugins:

```php
// In block plugin constructor
public function __construct(
  array $configuration,
  $plugin_id,
  $plugin_definition,
  PageHeaderContextService $header_context,
  RouteMatchInterface $route_match
) {
  parent::__construct($configuration, $plugin_id, $plugin_definition);
  $this->headerContext = $header_context;
  $this->routeMatch = $route_match;
}

// In build() method
public function build() {
  $header_data = $this->headerContext->extractHeaderData($this->routeMatch);
  
  if ($this->headerContext->shouldExcludeHeader($this->routeMatch)) {
    return ['#cache' => ['max-age' => 0]];
  }
  
  return [
    '#theme' => 'page_header_block',
    '#data' => $header_data,
    '#cache' => [
      'contexts' => ['url.path', 'user.permissions'],
      'tags' => ['node:' . $header_data['content_type']],
    ],
  ];
}
```

## Field Hierarchy Implementation

The service implements the exact same field hierarchy as the current templates:

### Description Fields (in priority order)
1. `field_lead` - Primary description field
2. `field_summary` - Secondary description field  
3. `field_description` - Fallback description field

### Background Image Fields (in priority order)
1. `field_header_image` - Direct file reference
2. `field_featured_image` - Media entity reference
3. `field_media` - Media entity reference (image bundle only)

## Template Migration Path

Templates can gradually migrate to use the service:

### Before (Template Logic)
```twig
{# Complex field extraction in template #}
{% if node.hasField('field_lead') and node.field_lead.value %}
  {% set page_description = node.field_lead.value %}
{% elseif node.hasField('field_summary') and node.field_summary.value %}
  {% set page_description = node.field_summary.value %}
{% elseif node.hasField('field_description') and node.field_description.value %}
  {% set page_description = node.field_description.value %}
{% endif %}
```

### After (Service Usage)
```twig
{# Simple service call #}
{% set header_data = page_header_context() %}
{% set page_description = header_data.description %}
```

## Performance Benefits

- **Caching**: Service results can be cached at multiple levels
- **Reusability**: No duplication of field extraction logic
- **Maintainability**: Single source of truth for field hierarchy
- **Testing**: Service logic can be unit tested independently