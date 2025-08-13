# Dark Theme Implementation Guide

## Overview

This theme now supports comprehensive dark theme styling using modern Tailwind v4 data-attribute selectors. The implementation provides automatic dark theme support for all paragraph types when the `data-theme="dark"` attribute is set on the paragraph wrapper.

## How It Works

Each paragraph wrapper automatically gets a `data-theme` attribute based on the `field_theme` field value:

```html
<!-- Light theme (default) -->
<div class="w-full paragraph-wrapper" data-theme="light">
  <!-- content -->
</div>

<!-- Dark theme -->
<div class="w-full paragraph-wrapper" data-theme="dark">
  <!-- content -->
</div>
```

## CSS Custom Properties

The system uses CSS custom properties for flexible theming:

### Light Theme Variables
```css
--paragraph-bg: theme('colors.white');
--paragraph-text: theme('colors.gray.900');
--paragraph-heading: theme('colors.gray.900');
--paragraph-link: theme('colors.primary.600');
--paragraph-link-hover: theme('colors.primary.700');
--paragraph-border: theme('colors.gray.200');
--paragraph-muted: theme('colors.gray.600');
--paragraph-accent: theme('colors.primary.50');
```

### Dark Theme Variables
```css
--paragraph-bg: theme('colors.gray.900');
--paragraph-text: theme('colors.gray.100');
--paragraph-heading: theme('colors.white');
--paragraph-link: theme('colors.primary.400');
--paragraph-link-hover: theme('colors.primary.300');
--paragraph-border: theme('colors.gray.700');
--paragraph-muted: theme('colors.gray.400');
--paragraph-accent: theme('colors.gray.800');
```

## Utility Classes

### Theme-Aware Utilities

Use these classes to apply theme-aware styling that automatically adapts to dark/light themes:

```html
<!-- Background utilities -->
<div class="bg-theme-primary">Primary background</div>
<div class="bg-theme-accent">Accent background</div>

<!-- Text utilities -->
<p class="text-theme-primary">Primary text color</p>
<h2 class="text-theme-heading">Heading color</h2>
<span class="text-theme-muted">Muted text</span>
<a class="text-theme-link hover:text-theme-link">Theme-aware link</a>

<!-- Border utilities -->
<div class="border border-theme-default">Themed border</div>
```

### Auto-Applied Classes

These classes work automatically when used inside a `[data-theme="dark"]` container:

```html
<!-- These adapt automatically in dark theme -->
<div class="card-theme">Card with theme styling</div>
<input class="input-theme" type="text" placeholder="Themed input">
<button class="btn-theme-primary">Primary button</button>
<button class="btn-theme-secondary">Secondary button</button>
<a class="link-theme">Themed link</a>
<nav class="nav-theme">Navigation with theme</nav>
<code class="code-theme">Code block</code>
```

### Shadow Utilities

Dark theme-aware shadow utilities:

```html
<div class="shadow-theme">Standard theme shadow</div>
<div class="shadow-theme-sm">Small theme shadow</div>
<div class="shadow-theme-lg">Large theme shadow</div>
```

## Component Examples

### Text Component with Dark Theme

```twig
{# In your paragraph template #}
<div class="w-full paragraph-wrapper" data-theme="{{ theme_value ? 'dark' : 'light' }}">
  <div class="py-8 px-4 mx-auto container lg:py-16">
    {# Content automatically inherits dark theme styling #}
    <h2 class="text-theme-heading text-3xl font-bold">{{ title }}</h2>
    <div class="text-theme-primary mt-4">
      {{ body|render }}
    </div>
    <a href="#" class="link-theme">Read more</a>
  </div>
</div>
```

### Card Component with Dark Theme

```twig
<div class="paragraph-wrapper" data-theme="{{ is_dark ? 'dark' : 'light' }}">
  <div class="card-theme p-6 rounded-lg shadow-theme">
    <h3 class="text-theme-heading text-xl font-semibold">Card Title</h3>
    <p class="text-theme-primary mt-2">Card content text</p>
    <button class="btn-theme-primary mt-4 px-4 py-2 rounded">Action</button>
  </div>
</div>
```

### Form Elements with Dark Theme

```twig
<div class="paragraph-wrapper" data-theme="dark">
  <form class="space-y-4">
    <input 
      type="text" 
      class="input-theme w-full px-3 py-2 rounded focus:border-theme-link focus:ring-theme-link"
      placeholder="Your name"
    >
    <textarea 
      class="input-theme w-full px-3 py-2 rounded focus:border-theme-link focus:ring-theme-link"
      placeholder="Your message"
    ></textarea>
    <button type="submit" class="btn-theme-primary px-6 py-3 rounded">
      Submit
    </button>
  </form>
</div>
```

## Automatic Element Styling

The following elements are automatically styled when inside a `data-theme="dark"` container:

- **Headings** (h1-h6): Use `--paragraph-heading` color
- **Paragraphs** (p): Use `--paragraph-text` color  
- **Links** (a): Use `--paragraph-link` with hover states
- **Code blocks**: Dark background with light text
- **Tables**: Dark styling for headers and borders
- **Form elements**: Dark backgrounds and themed borders
- **Blockquotes**: Themed borders and muted text

## Integration with Existing Components

### Updating Component Templates

To make existing components theme-aware, wrap them in the paragraph wrapper pattern:

```twig
{# Before #}
<div class="my-component bg-white text-gray-900">
  <h2 class="text-gray-900">Title</h2>
  <p class="text-gray-600">Content</p>
</div>

{# After - Theme-aware #}
<div class="paragraph-wrapper" data-theme="{{ is_dark ? 'dark' : 'light' }}">
  <div class="my-component bg-theme-primary text-theme-primary">
    <h2 class="text-theme-heading">Title</h2>
    <p class="text-theme-muted">Content</p>
  </div>
</div>
```

### Component Props

Pass the `is_dark` prop to your components:

```twig
{% include 'adesso_cms_theme:my-component' with {
  title: title,
  content: content,
  is_dark: theme_value ? true : false,
} only %}
```

## Best Practices

1. **Always use theme utilities** instead of hardcoded colors when possible
2. **Test both themes** during development
3. **Use CSS custom properties** for consistent theming across components  
4. **Leverage data-attribute selectors** for automatic theme adaptation
5. **Maintain good contrast ratios** in both light and dark themes

## Migration from Hardcoded Colors

### Before (Hardcoded)
```html
<div class="bg-white text-gray-900 border-gray-200">
  <h2 class="text-gray-900">Title</h2>
  <p class="text-gray-600">Muted text</p>
  <a class="text-blue-600 hover:text-blue-700">Link</a>
</div>
```

### After (Theme-Aware)
```html
<div class="bg-theme-primary text-theme-primary border-theme-default">
  <h2 class="text-theme-heading">Title</h2>
  <p class="text-theme-muted">Muted text</p>
  <a class="text-theme-link hover:text-theme-link">Link</a>
</div>
```

## Browser Support

This implementation uses modern CSS features:
- CSS Custom Properties (CSS Variables)
- Attribute Selectors
- CSS `color-mix()` function for primary color variations

All modern browsers support these features. For legacy browser support, the light theme serves as the fallback.