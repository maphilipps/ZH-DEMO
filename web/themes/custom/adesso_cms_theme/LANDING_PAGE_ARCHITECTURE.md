# Landing Page Architecture Documentation

## Problem Statement

Previously, Landing Pages were displaying double headers:
1. One header from `page.html.twig` using the `landing-page-header` component (blue background, large text)
2. Second header from `node--landing-page.html.twig` (duplicate title in content area)

This created visual duplication and inconsistent styling.

## Architectural Solution

### Template Responsibility Matrix

| Template | Responsibility | What it Renders |
|----------|---------------|-----------------|
| `page.html.twig` | **Page Layout & Headers** | Site navigation, page headers (regular + landing), footer |
| `node--landing-page.html.twig` | **Content Only** | Body text, paragraph components, custom fields |
| `landing-page-header` component | **Hero Header** | Large typography, background image, description |
| `page-header` component | **Standard Header** | Regular page title and description |

### Header Decision Logic

```twig
{# In page.html.twig #}
{% if page_title and not has_video_hero %}
  {% if is_landing_page %}
    {# Landing Page: Tall hero header with large typography #}
    {% include 'adesso_cms_theme:landing-page-header' with {
      title: page_title,
      description: page_description,
      background_image: header_background_image,
      alt_text: header_background_alt,
      navbar_transparent: true
    } %}
  {% else %}
    {# Regular Page: Standard header #}
    {% include 'adesso_cms_theme:page-header' with {
      title: page_title,
      description: page_description,
      background_image: header_background_image,
      alt_text: header_background_alt
    } %}
  {% endif %}
{% endif %}
```

### Data Flow Architecture

```
Landing Page Request
├── page.html.twig
│   ├── Detects node.bundle == 'landing_page'
│   ├── Sets is_landing_page = true
│   ├── Renders landing-page-header component
│   │   ├── Uses node.label for title
│   │   ├── Uses field_lead/field_summary for description
│   │   └── Uses field_header_image/field_featured_image for background
│   └── Renders page.content (the node template)
└── node--landing-page.html.twig
    ├── Receives preprocessed variables
    ├── is_landing_page_content = true
    ├── page_title_handled = true
    ├── Renders ONLY content body and components
    └── Excludes header-related fields
```

## Field Usage Strategy

### Header Fields (Used by page.html.twig)
- `field_lead` - Primary description source
- `field_summary` - Secondary description source  
- `field_description` - Tertiary description source
- `field_header_image` - Primary background image
- `field_featured_image` - Secondary background image
- `field_media` - Tertiary background image (if image bundle)

### Content Fields (Used by node--landing-page.html.twig)
- `body` - Main content text
- `field_paragraphs` - Component/paragraph fields
- All other custom fields (excluding those used in header)

## Component Specifications

### landing-page-header Component
```twig
{# Tall hero header for landing pages #}
- Height: py-32 sm:py-48 md:py-56 lg:py-64
- Typography: text-6xl sm:text-8xl lg:text-9xl font-bold
- Background: Blue primary color or background image
- Position: Content positioned with pt-24 sm:pt-32 md:pt-40 lg:pt-48
- Navbar: Transparent and absolute positioned (navbar_transparent: true)
```

### page-header Component  
```twig
{# Standard header for regular pages #}
- Height: py-24 sm:py-32
- Typography: text-5xl sm:text-7xl font-semibold
- Background: Blue primary color or background image
- Position: Standard content positioning
- Navbar: Normal styling (opaque background)
```

## Implementation Details

### 1. Page Template Logic
```twig
{# page.html.twig lines 28-33 #}
{% if node and node.bundle == 'landing_page' %}
  {% set is_landing_page = true %}
{% else %}
  {% set is_landing_page = false %}
{% endif %}
```

### 2. Header Component Selection
```twig
{# page.html.twig lines 124-142 #}
{% if is_landing_page %}
  {# Use landing-page-header for hero effect #}
{% else %}
  {# Use page-header for standard pages #}
{% endif %}
```

### 3. Content Template Exclusions
```twig
{# node--landing-page.html.twig line 54 #}
{{ content|without('field_featured_image', 'field_header_image', 'field_media', 'field_paragraphs', 'body', 'field_lead', 'field_summary', 'field_description', 'links') }}
```

### 4. Preprocessing Function
```php
// adesso_cms_theme.theme
function adesso_cms_theme_preprocess_node_landing_page(array &$variables) {
  $variables['is_landing_page_content'] = TRUE;
  $variables['page_title_handled'] = TRUE;
  $variables['attributes']['class'][] = 'landing-page-content';
  $variables['attributes']['class'][] = 'has-page-header';
}
```

## Best Practices

### ✅ DO
- Use `page.html.twig` for ALL page headers (landing and regular)
- Use component system for header rendering
- Exclude header fields from node templates using `|without()`
- Document template responsibilities clearly
- Use preprocessing to mark architectural decisions

### ❌ DON'T  
- Render titles in node templates for landing pages
- Duplicate header logic across templates
- Mix layout and content concerns
- Render header fields in content templates

## Testing Checklist

- [ ] Landing pages show single hero header (tall, large typography)
- [ ] Regular pages show standard header (normal height)
- [ ] No duplicate titles on landing pages
- [ ] Background images render correctly in headers
- [ ] Navbar transparency works on landing pages
- [ ] Content padding accounts for header height
- [ ] All header fields excluded from node content
- [ ] Page descriptions pulled from correct field hierarchy

## Troubleshooting

### Issue: Double Headers Still Appearing
**Solution**: Check that `node--landing-page.html.twig` uses `|without()` filter and doesn't render `{{ content.title }}` or `{{ label }}`

### Issue: Missing Page Titles
**Solution**: Verify `page.html.twig` header logic and field data extraction (lines 71-110)

### Issue: Wrong Header Style
**Solution**: Check `is_landing_page` variable setting in `page.html.twig` (lines 28-33)

### Issue: Navbar Styling Problems  
**Solution**: Verify `navbar_transparent: true` parameter passed to `landing-page-header` component

## Performance Considerations

- Header field data is extracted once in `page.html.twig`
- Node template processing is minimal (content only)
- Component system enables efficient caching
- Preprocessing optimizes template variables

## Version History

- **v1.0** - Initial implementation with double header issue
- **v2.0** - Architectural separation implemented (this documentation)

---

**Maintainer**: Drupal Solution Architect  
**Last Updated**: 2025-01-30  
**Review Cycle**: Quarterly