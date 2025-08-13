# SDC Components - Claude Agent Guide

## Component Library Overview

This directory contains 25+ Single Directory Components (SDC) that form the foundation of the Adesso CMS design system. Each component follows Drupal 11's SDC architecture with Storybook integration for documentation and testing.

### **Component Architecture**
- **SDC Standard**: Drupal 11 native component system
- **Documentation**: Storybook 8.6.7 with interactive examples
- **Styling**: Tailwind CSS v4 with custom utilities
- **Interactivity**: Alpine.js patterns for reactive behavior
- **Testing**: Vitest for unit tests, BackstopJS for visual regression

### **Component Categories**

#### **Layout Components**
```
hero/                    # Hero banners with multiple layouts
page-header/            # Page headers with breadcrumbs
site-header/            # Main navigation and branding
site-footer/            # Footer with social links and menus
landing-page-header/    # Specialized landing page headers
```

#### **Content Display Components**
```
text/                   # Rich text content with layouts
media/                  # Media display with captions
gallery/                # Image galleries with lightbox
accordion/              # Expandable content sections
sidebyside/             # Two-column content layouts
```

#### **Interactive Components**
```
main-menu/              # Responsive navigation menu
newsletter-form/        # Email subscription forms
button/                 # Styled action buttons
carousel/               # Image/content carousels
slider/                 # Content sliders with controls
```

#### **Structural Components**
```
card-group/             # Card collections with layouts
pricing/                # Pricing tables and comparison cards
bento-grid/             # Flexible grid layouts
section-header/         # Section headings and introductions
paragraph-wrapper/      # Container for paragraph components
```

#### **Utility Components**
```
badge/                  # Status and category badges
logo/                   # Brand logo with variants
stat-card/              # Statistics and metrics display
download-item/          # File download components
embed/                  # Third-party content embedding
```

## Development Workflows

### **Preferred Agent Routing**

#### Component Development
- **New SDC Components** → `sdc-component-specialist` → `storybook-sdc-maintainer`
- **Interactive Features** → `alpine-js-frontend-developer` → `sdc-component-specialist`
- **Responsive Styling** → `tailwind-v4-expert` → `drupal-frontend-theming-specialist`

#### Component Enhancement
- **Accessibility Improvements** → `drupal-frontend-theming-specialist` → `qa-testing-specialist`
- **Performance Optimization** → `performance-optimizer` → `sdc-component-specialist`
- **Complex Interactions** → `alpine-js-frontend-developer` → `performance-optimizer`

#### Documentation & Testing
- **Storybook Stories** → `storybook-sdc-maintainer` → `drupal-frontend-theming-specialist`
- **Visual Testing** → `qa-testing-specialist` → `storybook-sdc-maintainer`
- **Component API Documentation** → `documentation-specialist` → `sdc-component-specialist`

### **Component Development Process**

#### 1. Component Planning
```bash
# Research existing patterns
ddev theme storybook    # Review existing components
# Plan component schema and variants
# Define responsive behavior
# Plan accessibility requirements
```

#### 2. SDC Implementation
```bash
# Create component directory
mkdir components/component-name/

# Create component schema
touch component-name.component.yml

# Create Twig template
touch component-name.twig

# Add Storybook story
touch component-name.stories.js
```

#### 3. Development & Testing
```bash
# Start development environment
ddev theme dev          # Vite HMR development
ddev theme storybook    # Component documentation

# Run tests during development
ddev npm run test       # Vitest unit tests
ddev npm run lint       # ESLint and Stylelint
```

#### 4. Visual Testing
```bash
# Create visual baselines
ddev backstop reference

# Test for regressions
ddev backstop test

# Approve changes if intentional
ddev backstop approve
```

## Component Standards

### **Component Schema Template**
```yaml
# component-name.component.yml
name: Component Name
status: stable
props:
  type: object
  properties:
    title:
      type: string
      title: Component Title
    variant:
      type: string
      enum: [default, highlighted, card]
      title: Display Variant
    field_theme:
      type: string
      enum: [default, dark, light]
      title: Theme Variant
slots:
  content:
    title: Main Content
    required: false
  actions:
    title: Action Buttons
    required: false
```

### **Twig Template Standards**
```twig
{# component-name.twig #}
{%- set attributes = attributes|default(create_attribute()) -%}
{%- set theme_class = field_theme ? 'theme-' ~ field_theme : 'theme-default' -%}
{%- set classes = [
  'c-component-name',
  theme_class,
  variant ? 'c-component-name--' ~ variant : 'c-component-name--default',
] -%}

<div{{ attributes.addClass(classes) }}
     {% if interactive %}x-data="componentName()"{% endif %}>
  {% if title %}
    <h2 class="c-component-name__title">{{ title }}</h2>
  {% endif %}
  
  <div class="c-component-name__content">
    {{ content }}
  </div>
  
  {% if actions %}
    <div class="c-component-name__actions">
      {{ actions }}
    </div>
  {% endif %}
</div>
```

### **Storybook Story Template**
```javascript
// component-name.stories.js
export default {
  title: 'Components/Component Name',
  parameters: {
    docs: {
      description: {
        component: 'A brief description of the component and its usage.'
      }
    }
  }
};

export const Default = {
  args: {
    title: 'Default Component',
    variant: 'default',
    field_theme: 'default',
    content: 'Sample content for the component.'
  }
};

export const Highlighted = {
  args: {
    ...Default.args,
    variant: 'highlighted',
    title: 'Highlighted Variant'
  }
};

export const Dark = {
  args: {
    ...Default.args,
    field_theme: 'dark',
    title: 'Dark Theme Variant'
  }
};
```

### **Alpine.js Integration Pattern**
```javascript
// component-name.behavior.js
Alpine.data('componentName', () => ({
  isOpen: false,
  isLoading: false,
  
  init() {
    // Component initialization
    this.$watch('isOpen', value => {
      this.handleToggle(value);
    });
  },
  
  toggle() {
    this.isOpen = !this.isOpen;
  },
  
  handleToggle(isOpen) {
    // Handle state changes
    if (isOpen) {
      this.$dispatch('component:opened');
    } else {
      this.$dispatch('component:closed');
    }
  }
}));
```

## Component Quality Standards

### **Accessibility Requirements (WCAG 2.1 AA)**
- Semantic HTML structure with proper headings
- Keyboard navigation support for interactive elements
- ARIA labels and roles for screen readers
- Color contrast ratios meet accessibility standards
- Focus management for complex interactions

### **Performance Standards**
- Lazy loading for images and heavy content
- Efficient CSS with minimal specificity
- JavaScript only when necessary for functionality
- Optimized assets with WebP images
- Core Web Vitals optimization

### **Responsive Design**
- Mobile-first approach with progressive enhancement
- Breakpoint consistency across all components
- Touch-friendly interactive areas (44px minimum)
- Flexible layouts that adapt to content
- Performance optimization for mobile devices

### **Testing Requirements**
- Unit tests for complex component logic
- Visual regression tests for all variants
- Cross-browser compatibility verification
- Accessibility testing with automated tools
- Performance testing for heavy components

## Component Library Maintenance

### **Regular Maintenance Tasks**
```bash
# Update component dependencies
ddev npm update

# Audit component accessibility
ddev npm run a11y

# Check for performance regressions
ddev npm run lighthouse

# Update visual regression baselines
ddev backstop reference

# Review and update documentation
ddev theme storybook
```

### **Component Deprecation Process**
1. **Mark as deprecated** in component schema
2. **Add deprecation notice** to Storybook documentation
3. **Create migration guide** for replacement component
4. **Update dependent templates** to use new component
5. **Remove after migration period** (minimum 3 months)

### **Version Management**
- Components follow semantic versioning
- Breaking changes require major version bump
- New features increment minor version
- Bug fixes increment patch version
- All changes documented in component stories

## Common Component Patterns

### **Theme Integration**
All components support theme variants through the `field_theme` property:
- `default` - Standard theme appearance
- `dark` - Dark theme variant
- `light` - Light theme variant
- `highlighted` - Emphasized appearance

### **Responsive Behavior**
Components use Tailwind's responsive utilities:
```css
/* Mobile-first responsive design */
.component-class {
  @apply px-4 md:px-6 lg:px-8;
  @apply text-sm md:text-base lg:text-lg;
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
}
```

### **State Management**
Interactive components use Alpine.js for state:
```javascript
// Global state for complex interactions
Alpine.store('componentState', {
  activeComponent: null,
  isModalOpen: false
});
```

### **Performance Optimization**
```javascript
// Lazy loading for heavy components
x-intersect="$el.setAttribute('data-loaded', 'true')"

// Debounced interactions
x-on:input.debounce.500ms="handleInput($event.target.value)"
```

This component library provides a comprehensive, scalable foundation for building consistent, accessible, and performant user interfaces in the Adesso CMS project.