# Drupal 11 Coding Standards for adesso CMS

## Official Drupal Standards Compliance

**Source**: Drupal.org official coding standards (2025) - Version-independent, always-current standards

### PHP Coding Standards

#### File Structure and Basics
```php
<?php

/**
 * @file
 * Brief description of file purpose.
 *
 * Detailed description of the file's functionality.
 * This follows Doxygen conventions.
 */

declare(strict_types=1);

namespace Drupal\adesso_cms_theme\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
// Note: No closing ?> tag at end of file
```

#### Naming Conventions
```php
// Functions: Lowercase with underscores, module-prefixed
function adesso_cms_theme_preprocess_page(&$variables) {
  // Implementation
}

// Variables: Consistent within file (prefer snake_case)
$user_name = 'example';
$current_timestamp = time();

// Classes: UpperCamelCase
class AccessibleNavigationBlock extends BlockBase implements ContainerFactoryPluginInterface {

// Interfaces: End with "Interface"
interface AccessibilityValidatorInterface {

// Test classes: End with "Test"
class AccessibleNavigationTest extends UnitTestCase {
```

#### Formatting Rules
```php
// 2 spaces indentation (NO TABS)
class ExampleClass {

  /**
   * Visibility required for all methods and properties.
   */
  private string $privateMember;

  public function exampleMethod(string $parameter): array {
    // Always use curly braces for control structures
    if ($parameter !== '') {
      $result = [];
      
      // Spaces around binary operators
      $calculated_value = $base_value + $additional_value;
      
      // Maximum 80 characters per line
      $very_long_variable_name = $this->calculateSomethingVeryComplex(
        $parameter,
        $another_parameter
      );
      
      return $result;
    }
    
    return [];
  }

}
```

#### Documentation Standards
```php
/**
 * Calculates accessibility score for component.
 *
 * This method evaluates WCAG 2.1 AA compliance and returns
 * a score between 0 and 1 indicating accessibility level.
 *
 * @param array $component_data
 *   The component data to analyze containing:
 *   - 'aria_attributes': Array of ARIA attributes
 *   - 'semantic_markup': Boolean indicating semantic HTML usage
 *   - 'keyboard_navigation': Boolean for keyboard accessibility
 *
 * @return float
 *   Accessibility score between 0.0 and 1.0, where 1.0 is fully compliant.
 *
 * @throws \InvalidArgumentException
 *   When component_data is missing required keys.
 *
 * @see https://www.w3.org/WAI/WCAG21/quickref/
 */
public function calculateAccessibilityScore(array $component_data): float {
  // Implementation with type hints and strict typing
}
```

#### Drupal-Specific Practices
```php
// Prefer interfaces over concrete classes
interface ComponentRendererInterface {
  public function render(array $build): array;
}

// Use dependency injection, not global functions
class AccessibleComponentRenderer implements ComponentRendererInterface {

  public function __construct(
    private readonly AccessibilityValidatorInterface $validator,
    private readonly RendererInterface $renderer,
  ) {}

  // Factory methods instead of direct instantiation
  public static function create(ContainerInterface $container): static {
    return new static(
      $container->get('accessibility.validator'),
      $container->get('renderer')
    );
  }

}

// Prefer single quotes, except for variable interpolation
$simple_string = 'This uses single quotes';
$interpolated = "User name: {$user_name}";
```

### CSS Coding Standards (Updated 2025)

#### File Structure and Comments
```css
/**
 * @file
 * Accessible navigation component styles.
 *
 * Provides styling for the main navigation component with
 * WCAG 2.1 AA compliance and mobile-first responsive design.
 */

/* ==========================================================================
   Navigation Component
   ========================================================================== */

/**
 * Main navigation container.
 *
 * Uses semantic HTML5 nav element with proper ARIA landmarks.
 * Supports keyboard navigation and screen reader accessibility.
 */
```

#### Formatting Guidelines
```css
/* 2 spaces indentation, consistent with PHP/JS */
.navigation {
  display: flex;
  flex-direction: column;
  /* Property order: positioning, box model, other */
  position: relative;
  width: 100%;
  margin: 0;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  /* Prefer rem units */
  font-size: 1rem;
  line-height: 1.5;
}

/* One selector per line for multiple selectors */
.navigation__item,
.navigation__link,
.navigation__button {
  /* One declaration per line */
  display: block;
  /* Use lowercase function names */
  color: hsl(220deg 10% 20%);
  text-decoration: none;
  /* No units for zero values */
  margin: 0;
  /* Double quotes for quoted values */
  font-family: "Inter", sans-serif;
}

/* Separate rulesets with blank lines (PostCSS) */
.navigation__link:hover,
.navigation__link:focus {
  color: hsl(220deg 50% 40%);
  text-decoration: underline;
}

/* Direction-specific properties with LTR comment */
.navigation__icon {
  margin-right: 0.5rem; /* LTR */
}

/* Media queries with proper indentation */
@media (min-width: 768px) {
  .navigation {
    flex-direction: row;
    padding: 0.5rem 1rem;
  }
  
  .navigation__item {
    margin-right: 1rem; /* LTR */
  }
}
```

#### PostCSS-Specific Guidelines
```css
/* Nesting allowed with PostCSS */
.navigation {
  display: flex;
  
  &__item {
    display: block;
    
    &:hover {
      background-color: #f5f5f5;
    }
  }
  
  /* Functional pseudo-classes */
  &:has(.navigation__submenu) {
    position: relative;
  }
}

/* Automatic unit conversion (px to rem) */
.navigation {
  padding: 16px; /* Converts to 1rem */
  font-size: 14px; /* Converts to 0.875rem */
}
```

### JavaScript/TypeScript Standards

#### File Structure
```javascript
/**
 * @file
 * Accessible navigation component behavior.
 *
 * Provides keyboard navigation, focus management, and ARIA state updates
 * for the main navigation component. Follows WCAG 2.1 AA guidelines.
 */

(function (Drupal, drupalSettings, once) {
  'use strict';

  /**
   * Accessible navigation behavior.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches accessible navigation functionality.
   */
  Drupal.behaviors.accessibleNavigation = {
    attach: function (context, settings) {
      // Implementation
    }
  };

})(Drupal, drupalSettings, once);
```

#### Formatting and Best Practices
```javascript
// Use const/let, never var
const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ARROW_DOWN: 'ArrowDown',
  ARROW_UP: 'ArrowUp',
  ESCAPE: 'Escape'
};

// Function declarations with proper spacing
function initializeAccessibleNavigation(element) {
  // 2 spaces indentation
  const navigationItems = element.querySelectorAll('.navigation__item');
  const submenuToggles = element.querySelectorAll('[aria-expanded]');
  
  // Event delegation for better performance
  element.addEventListener('keydown', (event) => {
    handleKeyboardNavigation(event, navigationItems);
  });
  
  // Initialize ARIA states
  submenuToggles.forEach((toggle) => {
    toggle.setAttribute('aria-expanded', 'false');
  });
}

// Arrow functions for callbacks
const handleKeyboardNavigation = (event, items) => {
  const { key, target } = event;
  const currentIndex = Array.from(items).indexOf(target.closest('.navigation__item'));
  
  switch (key) {
    case KEYBOARD_KEYS.ARROW_DOWN:
      event.preventDefault();
      focusNextItem(items, currentIndex);
      break;
      
    case KEYBOARD_KEYS.ARROW_UP:
      event.preventDefault();
      focusPreviousItem(items, currentIndex);
      break;
      
    case KEYBOARD_KEYS.ESCAPE:
      closeAllSubmenus(items);
      break;
  }
};
```

### Twig Template Standards

#### File Structure and Comments
```twig
{#
/**
 * @file
 * Template for accessible navigation component.
 *
 * Available variables:
 * - items: Array of navigation items
 * - attributes: HTML attributes for the nav element
 * - aria_label: Accessible label for the navigation
 *
 * @see template_preprocess_navigation()
 */
#}

{# Set default values with defensive programming #}
{% set nav_attributes = attributes|default(create_attribute()) %}
{% set nav_items = items|default([]) %}
{% set accessible_label = aria_label|default('Main navigation'|t) %}
```

#### Accessibility-First Templating
```twig
{# Semantic HTML5 navigation with proper ARIA #}
<nav{{ nav_attributes.addClass('navigation').setAttribute('aria-label', accessible_label) }}>
  
  {# Skip navigation link for keyboard users #}
  <a href="#main-content" class="navigation__skip-link visually-hidden focusable">
    {{ 'Skip to main content'|t }}
  </a>
  
  {% if nav_items %}
    <ul class="navigation__list" role="list">
      {% for item in nav_items %}
        <li class="navigation__item"{{ item.attributes|default(create_attribute()) }}>
          
          {# Defensive programming with default values #}
          {% set link_text = item.title|default('Untitled'|t) %}
          {% set link_url = item.url|default('#') %}
          {% set has_submenu = item.below|default(false) %}
          
          {# Conditional ARIA attributes for submenu items #}
          {% if has_submenu %}
            <button 
              class="navigation__toggle"
              aria-expanded="false"
              aria-controls="submenu-{{ loop.index }}"
              aria-haspopup="true">
              {{ link_text }}
              <span class="navigation__toggle-icon" aria-hidden="true">▼</span>
            </button>
            
            <ul 
              id="submenu-{{ loop.index }}"
              class="navigation__submenu"
              hidden>
              {% for subitem in item.below %}
                <li class="navigation__subitem">
                  <a href="{{ subitem.url|default('#') }}" class="navigation__sublink">
                    {{ subitem.title|default('Untitled'|t) }}
                  </a>
                </li>
              {% endfor %}
            </ul>
          {% else %}
            <a href="{{ link_url }}" class="navigation__link">
              {{ link_text }}
            </a>
          {% endif %}
          
        </li>
      {% endfor %}
    </ul>
  {% else %}
    {# Fallback content with accessibility consideration #}
    <p class="navigation__empty" role="status" aria-live="polite">
      {{ 'No navigation items available'|t }}
    </p>
  {% endif %}
  
</nav>
```

#### Twig Best Practices
```twig
{# Use defensive programming with |default() filters #}
{% set component_classes = [
  'component',
  'component--' ~ (variant|default('default')),
  theme|default(false) ? 'component--theme-' ~ theme,
  modifier_classes|default([])
] %}

{# Proper NULL handling #}
{% if content and content is not empty %}
  <div class="component__content">
    {{ content }}
  </div>
{% endif %}

{# Accessibility helpers #}
{% set unique_id = 'component-' ~ random() %}
{% set aria_described_by = description ? unique_id ~ '-description' : false %}

<div{{ attributes.addClass(component_classes) }}
     {% if aria_described_by %}aria-describedby="{{ aria_described_by }}"{% endif %}>
  
  {{ content }}
  
  {% if description %}
    <div id="{{ unique_id }}-description" class="visually-hidden">
      {{ description }}
    </div>
  {% endif %}
  
</div>
```

### Automated Code Quality Integration

#### DDEV Commands for Code Standards
```bash
# PHP CodeSniffer with Drupal standards
ddev exec "vendor/bin/phpcs --standard=Drupal,DrupalPractice web/themes/custom/"

# PHP Code Beautifier and Fixer
ddev exec "vendor/bin/phpcbf --standard=Drupal web/themes/custom/"

# ESLint for JavaScript
ddev exec "cd web/themes/custom/adesso_cms_theme && npm run lint:js"

# Stylelint for CSS
ddev exec "cd web/themes/custom/adesso_cms_theme && npm run lint:css"

# Accessibility testing
ddev exec "cd web/themes/custom/adesso_cms_theme && npm run test:a11y"
```

#### Pre-commit Hooks Integration
```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running Drupal coding standards checks..."

# PHP CodeSniffer
ddev exec "vendor/bin/phpcs --standard=Drupal,DrupalPractice --extensions=php,module,inc,install,test,profile,theme,css,js web/themes/custom/" || exit 1

# JavaScript linting
ddev exec "cd web/themes/custom/adesso_cms_theme && npm run lint:js" || exit 1

# CSS linting
ddev exec "cd web/themes/custom/adesso_cms_theme && npm run lint:css" || exit 1

# Accessibility tests
ddev exec "cd web/themes/custom/adesso_cms_theme && npm run test:a11y" || exit 1

echo "All coding standards checks passed!"
```

These standards ensure consistent, accessible, and maintainable code across the entire adesso CMS project, following official Drupal 11 guidelines updated for 2025.