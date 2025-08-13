# Adesso CMS Theme Development Guide

## 🎯 Core Principle
**Think carefully and only action the specific task given with the most concise and elegant solution that changes as little code as possible.**

## 📂 Theme Structure

```
adesso_cms_theme/
├── components/           # SDC components
│   ├── accordion/
│   ├── card-group/
│   ├── carousel/
│   ├── hero/
│   └── ...
├── templates/           # Twig templates
│   ├── content/
│   ├── layout/
│   ├── paragraph/
│   └── views/
├── src/                # Source files
│   ├── css/
│   ├── js/
│   └── assets/
├── dist/               # Compiled assets
├── storybook/          # Storybook configuration
└── tests/              # Frontend tests
```

## 🔄 Theme Development Workflow

### 1. Component Development Process

#### Planning Phase (OPUS Agent)
```yaml
drupal-ux-designer:
  - Design component in Figma/Sketch
  - Define component variants
  - Create accessibility requirements
  - Plan responsive behavior
  
drupal-solution-architect:
  - Define component props schema
  - Plan data flow
  - Design performance strategy
```

#### Implementation Phase (SONNET Agents)
```yaml
storybook-sdc-maintainer:
  - Create SDC structure
  - Implement component.yml
  - Build Twig template
  - Add Storybook stories

drupal-frontend-theming-specialist:
  - Implement Tailwind CSS styling
  - Add responsive design
  - Integrate with Drupal

alpine-js-frontend-developer:
  - Add Alpine.js interactivity
  - Implement state management
  - Add animations/transitions
```

### 2. Quality Gates for Theme Development

```bash
# Before starting development
ddev snapshot

# During development
ddev npm run dev          # Watch mode
ddev npm run lint         # ESLint
ddev npm run test         # Vitest

# Before committing
ddev backstop reference   # Create visual baseline
ddev backstop test       # Test for regressions
ddev npm run build       # Production build
```

## 🎨 Styling Guidelines

### Tailwind CSS v4 Configuration

```javascript
// tailwind.config.js
export default {
  content: [
    './components/**/*.twig',
    './templates/**/*.twig',
    './src/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'adesso-blue': '#003d7a',
        'adesso-light-blue': '#0066cc',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
```

### CSS Architecture

```css
/* src/css/adesso.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Component-specific styles */
@import './components/hero.css';
@import './components/card.css';

/* Drupal-specific overrides */
@import './drupal-core.css';
```

## 🧩 SDC Component Standards

### Component Template

```twig
{# components/[name]/[name].twig #}
{%- set attributes = attributes|default(create_attribute()) -%}
{%- set theme_class = field_theme ? 'theme-' ~ field_theme : 'theme-default' -%}
{%- set classes = [
  'c-' ~ component_name,
  theme_class,
  variant ? 'c-' ~ component_name ~ '--' ~ variant,
] -%}

<div{{ attributes.addClass(classes) }}
     x-data="componentName()"
     x-init="init()">
  {{ content }}
</div>
```

### Component Configuration

```yaml
# components/[name]/[name].component.yml
name: Component Name
status: stable
props:
  type: object
  properties:
    title:
      type: string
      title: Title
    variant:
      type: string
      enum: [default, card, hero]
    field_theme:
      type: string
      title: Theme Variant
      enum: [default, highlighted, dark]
slots:
  content:
    title: Content
    required: false
```

## ⚡ Alpine.js Integration

### Component JavaScript

```javascript
// components/[name]/[name].js
Alpine.data('componentName', () => ({
  isOpen: false,
  
  init() {
    // Initialization logic
    this.$watch('isOpen', value => {
      // React to changes
    });
  },
  
  toggle() {
    this.isOpen = !this.isOpen;
  },
}));
```

### Alpine.js Best Practices

1. Use `x-cloak` to prevent FOUC
2. Leverage `$refs` for DOM access
3. Use `Alpine.store()` for global state
4. Implement `x-intersect` for lazy loading
5. Use `x-transition` for animations

## 🧪 Testing Strategy

### Visual Regression Testing

```json
// backstop.json
{
  "scenarios": [
    {
      "label": "Hero Component - Default",
      "url": "http://adesso-cms.ddev.site/storybook/iframe.html?id=hero--default",
      "selectors": [".c-hero"],
      "viewports": [
        {"label": "mobile", "width": 375, "height": 667},
        {"label": "tablet", "width": 768, "height": 1024},
        {"label": "desktop", "width": 1920, "height": 1080}
      ]
    }
  ]
}
```

### Component Testing

```javascript
// tests/components/hero.test.js
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('Hero Component', () => {
  it('renders with correct theme class', () => {
    // Test implementation
  });
  
  it('handles Alpine.js interactions', () => {
    // Test implementation
  });
});
```

## 📱 Responsive Design

### Breakpoint Strategy

```scss
// Mobile First Approach
// Default: Mobile (< 768px)
// md: Tablet (≥ 768px)
// lg: Desktop (≥ 1024px)
// xl: Large Desktop (≥ 1280px)
// 2xl: Extra Large (≥ 1536px)
```

### Responsive Component Example

```twig
<div class="
  px-4 md:px-6 lg:px-8
  text-base md:text-lg lg:text-xl
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
  {{ content }}
</div>
```

## ♿ Accessibility Requirements

### WCAG 2.1 AA Compliance

```twig
{# Always include proper ARIA labels #}
<button 
  aria-label="{{ 'Toggle menu'|t }}"
  aria-expanded="{{ is_open ? 'true' : 'false' }}"
  aria-controls="menu-{{ unique_id }}"
>

{# Skip links #}
<a href="#main-content" class="sr-only focus:not-sr-only">
  {{ 'Skip to main content'|t }}
</a>

{# Proper heading hierarchy #}
<h2>{{ title }}</h2>
  <h3>{{ subtitle }}</h3>
```

## 🚀 Performance Optimization

### Asset Loading Strategy

```javascript
// Lazy load images
<img 
  data-src="{{ image_url }}" 
  loading="lazy"
  class="lazyload"
/>

// Critical CSS
<style>
  /* Inline critical CSS */
</style>

// Defer non-critical JavaScript
<script src="app.js" defer></script>
```

### Build Optimization

```bash
# Production build with optimization
ddev npm run build:prod

# Analyze bundle size
ddev npm run analyze

# Purge unused CSS
ddev npm run purge-css
```

## 🔍 Theme Debugging

### Enable Twig Debug

```yaml
# services.yml
parameters:
  twig.config:
    debug: true
    auto_reload: true
    cache: false
```

### Theme Development Commands

```bash
# Clear theme cache
ddev drush cc css-js
ddev drush cc render

# Rebuild theme
ddev drush theme:rebuild

# Watch for changes
ddev npm run watch

# Generate component
ddev drush generate:component
```

## 📋 Theme Checklist

### Before Development
- [ ] Create snapshot: `ddev snapshot`
- [ ] Pull latest changes: `git pull`
- [ ] Clear caches: `ddev drush cr`

### During Development
- [ ] Run linting: `ddev npm run lint`
- [ ] Test components: `ddev npm test`
- [ ] Check accessibility: `ddev npm run a11y`
- [ ] Visual regression: `ddev backstop test`

### Before Commit
- [ ] Build production: `ddev npm run build:prod`
- [ ] Run all tests: `ddev npm run test:all`
- [ ] Update documentation
- [ ] Create visual snapshots

## 🚨 Common Issues & Solutions

### Issue: Tailwind classes not applying
```bash
# Solution: Rebuild and clear cache
ddev npm run build
ddev drush cc css-js
ddev drush cr
```

### Issue: Alpine.js not initializing
```javascript
// Solution: Ensure proper initialization
document.addEventListener('alpine:init', () => {
  Alpine.data('componentName', () => ({...}));
});
```

### Issue: Visual regression failures
```bash
# Solution: Update reference images
ddev backstop approve
ddev backstop reference
```

---

*Version: 1.0.0 | Theme Development Guide*