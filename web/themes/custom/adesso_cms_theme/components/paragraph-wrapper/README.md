# Paragraph Wrapper Component

A reusable SDC (Single Directory Component) wrapper for paragraph content with theme support and semantic HTML structure.

## Overview

The Paragraph Wrapper Component provides a consistent, flexible container for paragraph content with built-in theming capabilities, spacing controls, and semantic HTML options. It follows Drupal SDC architecture and integrates seamlessly with the adesso CMS theme.

## Features

- **Theme Support**: Built-in data-theme attribute support for light/dark/custom themes
- **Semantic HTML**: Configurable HTML tags (div, section, article, aside, main, header, footer)
- **Flexible Spacing**: Predefined spacing options (none, small, medium, large, xlarge)
- **Width Control**: Content width constraints (full, contained, narrow, wide)
- **Accessibility**: ARIA attributes and semantic markup support
- **Tailwind CSS Integration**: Works seamlessly with Tailwind CSS classes
- **Extensible**: Custom classes and attributes support

## Usage

### Basic Usage

```twig
{% include 'adesso_cms_theme:paragraph-wrapper' with {
  content: '<p>Your paragraph content here</p>'
} %}
```

### With Theme

```twig
{% include 'adesso_cms_theme:paragraph-wrapper' with {
  content: content.field_body,
  theme: 'dark',
  spacing: 'large',
  width: 'contained'
} %}
```

### Semantic HTML

```twig
{% include 'adesso_cms_theme:paragraph-wrapper' with {
  content: content,
  tag: 'section',
  theme: 'primary',
  id: 'content-section',
  attributes: {
    'role': 'region',
    'aria-label': 'Main content area'
  }
} %}
```

### In Drupal Paragraph Templates

```twig
{# paragraph--your-type.html.twig #}
{% set theme_value = paragraph.field_theme.value|default('light') %}

{% include 'adesso_cms_theme:paragraph-wrapper' with {
  content: content,
  theme: theme_value,
  spacing: paragraph.field_spacing.value|default('medium'),
  width: paragraph.field_width.value|default('contained'),
  tag: 'section',
  className: 'paragraph-' ~ paragraph.bundle(),
  attributes: attributes
} only %}
```

## Component Properties

### Required Properties

- **content** (string): The main content to be wrapped

### Optional Properties

- **theme** (string): Theme variant
  - Options: `light`, `dark`, `primary`, `secondary`, `accent`
  - Adds `data-theme` attribute for CSS styling

- **className** (string): Additional CSS classes

- **id** (string): Unique identifier for the wrapper element

- **tag** (string): HTML tag for the wrapper
  - Options: `div`, `section`, `article`, `aside`, `main`, `header`, `footer`
  - Default: `div`

- **spacing** (string): Predefined spacing configuration
  - Options: `none`, `small`, `medium`, `large`, `xlarge`
  - Default: `medium`

- **width** (string): Width constraint for content
  - Options: `full`, `contained`, `narrow`, `wide`
  - Default: `contained`

- **attributes** (object): Additional HTML attributes
  - Supports accessibility attributes like `role`, `aria-label`, etc.

## CSS Classes Generated

The component automatically generates CSS classes following BEM methodology:

- `.paragraph-wrapper` - Base wrapper class
- `.paragraph-wrapper--theme-{theme}` - Theme modifier class
- `.paragraph-wrapper--spacing-{spacing}` - Spacing modifier class
- `.paragraph-wrapper--width-{width}` - Width modifier class
- `.paragraph-wrapper__content` - Content container class

## Styling with Tailwind CSS

The component is designed to work with Tailwind CSS. You can style the generated classes:

```css
.paragraph-wrapper {
  @apply relative;
}

.paragraph-wrapper--theme-dark {
  @apply bg-gray-900 text-white;
}

.paragraph-wrapper--theme-light {
  @apply bg-white text-gray-900;
}

.paragraph-wrapper--spacing-small {
  @apply py-4;
}

.paragraph-wrapper--spacing-medium {
  @apply py-8;
}

.paragraph-wrapper--spacing-large {
  @apply py-12;
}

.paragraph-wrapper--width-contained {
  @apply mx-auto container px-4;
}

.paragraph-wrapper--width-narrow {
  @apply mx-auto max-w-2xl px-4;
}

.paragraph-wrapper--width-wide {
  @apply mx-auto max-w-screen-2xl px-4;
}

.paragraph-wrapper--width-full {
  @apply w-full;
}

.paragraph-wrapper__content {
  @apply w-full;
}
```

## Integration with Drupal

### 1. Field Mapping

Map paragraph fields to component properties:

```yaml
# In your paragraph type configuration
field_theme:
  type: list_string
  settings:
    allowed_values:
      light: Light
      dark: Dark
      primary: Primary
      secondary: Secondary
      accent: Accent

field_spacing:
  type: list_string
  settings:
    allowed_values:
      none: None
      small: Small
      medium: Medium
      large: Large
      xlarge: Extra Large

field_width:
  type: list_string
  settings:
    allowed_values:
      full: Full Width
      contained: Contained
      narrow: Narrow
      wide: Wide
```

### 2. Template Integration

Create paragraph templates that use the component:

```twig
{# paragraph--text-block.html.twig #}
{% set theme_value = paragraph.field_theme.value|default('light') %}

{% include 'adesso_cms_theme:paragraph-wrapper' with {
  content: content,
  theme: theme_value,
  spacing: paragraph.field_spacing.value|default('medium'),
  width: paragraph.field_width.value|default('contained'),
  tag: 'section',
  className: 'text-block-paragraph',
  attributes: {
    'data-paragraph-id': paragraph.id()
  }
} only %}
```

## Accessibility Considerations

- Use semantic HTML tags when appropriate (`section`, `article`, `main`, etc.)
- Include ARIA attributes for complex content
- Ensure proper heading hierarchy within content
- Test with screen readers

## Examples

### Hero Section

```twig
{% include 'adesso_cms_theme:paragraph-wrapper' with {
  content: hero_content,
  tag: 'section',
  theme: 'dark',
  spacing: 'xlarge',
  width: 'full',
  className: 'hero-section',
  attributes: {
    'role': 'banner',
    'aria-label': 'Hero section'
  }
} %}
```

### Sidebar Content

```twig
{% include 'adesso_cms_theme:paragraph-wrapper' with {
  content: sidebar_content,
  tag: 'aside',
  spacing: 'small',
  width: 'narrow',
  className: 'sidebar-content'
} %}
```

### Article Content

```twig
{% include 'adesso_cms_theme:paragraph-wrapper' with {
  content: article_content,
  tag: 'article',
  theme: 'light',
  spacing: 'medium',
  width: 'contained',
  attributes: {
    'role': 'article',
    'aria-labelledby': 'article-title'
  }
} %}
```

## Best Practices

1. **Use Semantic HTML**: Choose appropriate HTML tags for your content type
2. **Theme Consistency**: Use consistent theme values across your site
3. **Content Structure**: Ensure content has proper heading hierarchy
4. **Accessibility**: Include appropriate ARIA attributes
5. **Performance**: Use `only` keyword when including the component to prevent variable leakage
6. **Maintainability**: Use the component consistently instead of custom wrapper markup

## Storybook Documentation

The component includes comprehensive Storybook stories demonstrating all features and use cases. Run Storybook to view interactive examples:

```bash
cd web/themes/custom/adesso_cms_theme
npm run storybook
```

## File Structure

```
components/paragraph-wrapper/
├── README.md                           # This documentation
├── paragraph-wrapper.component.yml     # Component schema
├── paragraph-wrapper.twig             # Component template
├── paragraph-wrapper.stories.js       # Storybook stories
└── templates/                         # Drupal integration templates
    └── (custom paragraph templates)
```