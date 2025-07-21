# Drupal Single Directory Components (SDC) Best Practices

*Based on analysis of CivicTheme - Production-ready Drupal theme*

## 🎯 Critical Rules

### 1. **Schema Validation is MANDATORY**
```yaml
$schema: https://git.drupalcode.org/project/drupal/-/raw/HEAD/core/assets/schemas/v1/metadata.schema.json
name: Component Name
status: stable
description: Clear component description
```

### 2. **Always Handle NULL Values**
**❌ Wrong:** Schema expects string but gets NULL
```yaml
current_path:
  type: string  # Will fail with NULL
```

**✅ Correct:** Allow NULL or provide defaults
```yaml
current_path:
  type: [string, "null"]
  default: null
```

**✅ Better:** Use Twig defaults
```twig
{{ current_path|default('') }}
{{ item.description|default('') }}
```

### 3. **Array vs Object Typing**
**❌ Wrong:** 
```yaml
menu_items:
  type: object  # But passing array!
```

**✅ Correct:**
```yaml
menu_items:
  type: array
  items:
    type: object
    properties:
      title:
        type: string
      url: 
        type: string
```

## 📋 Schema Patterns

### Standard Props Every Component Should Have
```yaml
props:
  type: object
  properties:
    theme:
      type: string
      title: Theme
      description: Theme variation (light or dark)
      enum: [light, dark]
      default: light
    attributes:
      type: string
      title: Attributes  
      description: Additional HTML attributes
      default: ""
    modifier_class:
      type: string
      title: Modifier classes
      description: Additional CSS classes
      default: ""
```

### Menu/Navigation Schema Pattern
```yaml
items:
  type: array
  title: Menu Items
  description: Navigation menu items
  items:
    type: object
    properties:
      title:
        type: string
        description: Menu item title
      url:
        type: string  
        description: Menu item URL
      in_active_trail:
        type: boolean
        description: Whether item is in active trail
        default: false
      is_expanded:
        type: boolean
        description: Whether item is expanded
        default: false
      is_external:
        type: boolean
        description: Whether link is external
        default: false
      is_new_window:
        type: boolean
        description: Open in new window
        default: false
      attributes:
        type: string
        description: Additional HTML attributes
        default: ""
      link_attributes:
        type: string
        description: Additional link attributes  
        default: ""
      below:
        type: array
        description: Submenu items
        items:
          type: object
          description: Submenu item with same structure
```

### Boolean Props Pattern
```yaml
show_logo:
  type: boolean
  title: Show Logo
  description: Whether to display the logo
  default: true
enable_mega_menu:
  type: boolean  
  title: Enable Mega Menu
  description: Enable mega menu functionality
  default: false
```

### String with Enums Pattern
```yaml
background_color:
  type: string
  title: Background Color
  description: Background color variant
  enum: [white, gray, primary]
  default: white
orientation:
  type: string
  title: Orientation
  description: Menu orientation
  enum: [horizontal, vertical]
  default: horizontal
```

## 🎨 Twig Template Patterns

### Defensive Programming with Defaults
```twig
{# Always use defaults for optional values #}
{% set theme_class = 'ct-theme-%s'|format(theme|default('light')) %}
{% set modifier_class = '%s %s'|format(theme_class, modifier_class|default('')) %}

{# Handle nullable arrays #}
{% if items %}
  {% for item in items %}
    {# Safe access with defaults #}
    {% set item_classes = [
      'menu__item',
      item.below ? 'menu__item--has-children' : '',
      item.in_active_trail ? 'menu__item--active-trail' : '',
      item.modifier_class|default(''),
    ] %}
  {% endfor %}
{% endif %}
```

### Active State Handling
```twig
{# Proper active state detection #}
{% if item.in_active_trail and not has_active_children %}
  {% set aria_current = 'aria-current="page"' %}
{% else %}
  {% set aria_current = '' %}
{% endif %}

{# Use in attributes #}
<a href="{{ item.url }}" {{ aria_current|raw }}>{{ item.title }}</a>
```

### Conditional Attributes
```twig
{# Safe attribute handling #}
{% set item_attributes = item.attributes|default('') %}
{% if item.below and is_collapsible %}
  {% set aria_expanded = item.is_expanded ? 'aria-expanded="true"' : 'aria-expanded="false"' %}
  {% set item_attributes = [item_attributes, aria_expanded]|join(' ') %}
{% endif %}

<li class="menu__item" {{ item_attributes|raw }}>
```

### Component Includes with Defaults
```twig
{# Safe component inclusion #}
{% include 'theme:link' with {
  theme: theme,
  text: item.title,
  url: item.url,
  attributes: item.link_attributes|default(''),
  is_new_window: item.is_new_window is defined ? item.is_new_window : false,
  is_external: item.is_external is defined ? item.is_external : false,
} only %}
```

## 🏗️ Component Structure

### Required Files
```
component-name/
├── component-name.component.yml  # Schema (REQUIRED)
├── component-name.twig          # Template (REQUIRED)  
├── component-name.stories.js    # Storybook (RECOMMENDED)
├── component-name.scss          # Styles (RECOMMENDED)
├── component-name.js            # Behavior (OPTIONAL)
└── templates/                   # Drupal overrides (OPTIONAL)
    └── block--component-name.html.twig
```

### Naming Conventions
- **Files:** `kebab-case` (e.g., `main-menu.component.yml`)
- **Component Names:** `PascalCase` in schema (e.g., `Main Menu`)
- **CSS Classes:** `BEM methodology` (e.g., `ct-menu__item--active`)
- **Props:** `snake_case` (e.g., `enable_mega_menu`)

## 🚨 Common Errors to Avoid

### Schema Validation Errors
```yaml
# ❌ WRONG: Will cause validation errors
menu_items:
  type: object  # But passing array!
  
current_path:
  type: string  # Will fail with NULL

description:
  type: string  # Will fail if empty

# ✅ CORRECT: Handles all cases
menu_items:
  type: array
  items:
    type: object
    
current_path:
  type: [string, "null"]
  default: null
  
description:
  type: string
  default: ""
```

### Twig Template Errors
```twig
{# ❌ WRONG: Will break with NULL/undefined #}
<div class="{{ modifier_class }}">
{{ item.title }}
{% if current_path == item.url %}

{# ✅ CORRECT: Defensive with defaults #}
<div class="{{ modifier_class|default('') }}">
{{ item.title|default('') }}
{% if current_path|default('') == item.url|default('') %}
```

## 🎯 Testing & Validation

### Schema Validation Checklist
- [ ] All props have proper `type` declarations
- [ ] Arrays use `items` with object structure
- [ ] Nullable values handled with defaults or `[string, "null"]`
- [ ] Enums used for controlled values
- [ ] Required vs optional props clearly defined

### Twig Safety Checklist  
- [ ] All variables use `|default()` filters
- [ ] Conditional logic handles empty/null cases
- [ ] Component includes use `only` keyword
- [ ] ARIA attributes properly set
- [ ] HTML attributes safely rendered with `|raw`

### Error Detection Commands
```bash
# Clear cache and check for errors
ddev drush cache:rebuild

# Check recent errors
ddev logs | grep -i "error\|exception\|warning" | tail -20

# Test component rendering
ddev launch
```

## 📚 Reference Implementation

**See CivicTheme components for production examples:**
- Menu: `components/00-base/menu/`
- Navigation: `components/03-organisms/navigation/`  
- Header: `components/03-organisms/header/`
- Button: `components/01-atoms/button/`

**Follow their patterns for:**
- ✅ Comprehensive schema definitions
- ✅ Defensive Twig programming  
- ✅ Proper NULL handling
- ✅ Consistent naming conventions
- ✅ Atomic design organization