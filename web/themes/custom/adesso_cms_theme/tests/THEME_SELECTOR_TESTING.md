# Theme Selector Testing Suite

## Overview

This document outlines the comprehensive testing strategy for the standardized theme selector feature that appears directly under the Title field in all paragraph forms.

## Implementation Context

### Backend Features Tested
- Theme field weight standardized to 1 across 25+ paragraph types
- Field type: `list_string` with options: light, highlighted, dark
- Widget: `options_select` with label "Content Element Theme"
- Complete elimination of "Dark Theme" legacy references

### Frontend Features Tested
- Enhanced admin form styling with blue theme and visual prominence
- Interactive theme preview system with clickable cards
- Enhanced dropdown with icons and descriptions
- Mobile-responsive design
- Accessibility features (keyboard nav, ARIA labels)

## Test Categories

### 1. Configuration Tests (PHPUnit)

#### Field Configuration Validation
- **File**: `tests/src/Unit/ThemeSelectorConfigurationTest.php`
- **Purpose**: Verify all paragraph types have correct field positioning
- **Coverage**: 
  - Field weight is 1 for all 25+ paragraph types
  - Field type is `list_string`
  - Widget is `options_select`
  - Options are exactly: light, highlighted, dark
  - Label is "Content Element Theme"

#### Legacy Migration Tests
- **File**: `tests/src/Unit/ThemeSelectorMigrationTest.php`
- **Purpose**: Ensure old "Dark Theme" references are completely removed
- **Coverage**:
  - No field configurations contain "Dark Theme" references
  - No templates contain legacy dark theme logic
  - Configuration export is clean of old field names

### 2. Form Display Tests (Vitest)

#### Theme Selector Form Functionality
- **File**: `tests/theme-selector-form.test.js`
- **Purpose**: Test interactive form functionality
- **Coverage**:
  - Theme selector appears in all paragraph forms
  - Visual hierarchy: Title (weight 0) → Theme (weight 1) → Other fields
  - Preview cards are clickable and update select field
  - JavaScript preview functionality works correctly
  - Form submission saves selected theme value

#### Template Rendering Tests
- **File**: `tests/theme-selector-templates.test.js`
- **Purpose**: Verify custom form templates render correctly
- **Coverage**:
  - `form-element--field-content-element-theme.html.twig` renders properly
  - `select--field-content-element-theme.html.twig` renders with icons
  - Theme descriptions are accurate and helpful
  - Error states display correctly

### 3. Visual Regression Tests (BackstopJS)

#### Admin Form Visual Tests
- **File**: `tests/backstop/theme-selector-admin.json`
- **Purpose**: Ensure consistent admin UI appearance
- **Coverage**:
  - Theme selector field styling (blue background, icon, etc.)
  - Preview cards appearance and hover states
  - Mobile responsive behavior
  - Field positioning consistency across paragraph types

#### Frontend Theme Application Tests
- **File**: `tests/backstop/theme-selector-frontend.json`
- **Purpose**: Verify themes render correctly on frontend
- **Coverage**:
  - Light theme application on paragraphs
  - Highlighted theme application on paragraphs
  - Dark theme application on paragraphs
  - Theme consistency across different paragraph types

### 4. Accessibility Tests (Vitest + Axe)

#### WCAG Compliance Tests
- **File**: `tests/theme-selector-accessibility.test.js`
- **Purpose**: Ensure full accessibility compliance
- **Coverage**:
  - Keyboard navigation works for preview cards
  - ARIA labels are present and descriptive
  - Color contrast meets WCAG 2.1 AA standards
  - Screen reader compatibility
  - Focus management and indicators

### 5. Integration Tests (Vitest + PHPUnit)

#### Cross-Paragraph Consistency Tests
- **File**: `tests/theme-selector-integration.test.js`
- **Purpose**: Verify theme selector works consistently across all paragraph types
- **Coverage**:
  - All 25+ paragraph types have theme selector
  - Theme values save and load correctly for each type
  - Template rendering includes correct `data-theme` attributes
  - CSS variables are applied correctly for each theme

#### Component Integration Tests
- **File**: `tests/theme-selector-components.test.js`
- **Purpose**: Test integration with SDC components
- **Coverage**:
  - Theme selector works with Storybook stories
  - SDC component variants respect theme settings
  - Component CSS responds to theme data attributes

### 6. CSS Theme System Tests (Vitest)

#### Theme Variable Application Tests
- **File**: `tests/theme-selector-css.test.js`
- **Purpose**: Verify CSS custom properties work correctly
- **Coverage**:
  - Light theme CSS variables are applied
  - Highlighted theme CSS variables are applied  
  - Dark theme CSS variables are applied
  - Theme transitions work smoothly
  - Responsive behavior is maintained across themes

### 7. Template Rendering Tests (PHPUnit)

#### Data Attribute Tests
- **File**: `tests/src/Functional/ThemeSelectorRenderTest.php`
- **Purpose**: Verify `data-theme` attributes render correctly
- **Coverage**:
  - All paragraph templates include `data-theme` attribute
  - Attribute values match selected theme
  - Default theme is applied when no selection made
  - Theme values are properly escaped in HTML

### 8. JavaScript Functionality Tests (Vitest)

#### Interactive Features Tests
- **File**: `tests/theme-selector-javascript.test.js`
- **Purpose**: Test all JavaScript functionality
- **Coverage**:
  - `selectTheme()` function updates form field correctly
  - `updateThemePreview()` function shows visual feedback
  - Keyboard event handlers work properly
  - DOM ready initialization functions correctly
  - Error handling for missing elements

### 9. Performance Tests (Vitest)

#### Load Time and Efficiency Tests
- **File**: `tests/theme-selector-performance.test.js`
- **Purpose**: Ensure theme selector doesn't impact performance
- **Coverage**:
  - Form rendering time with theme selector
  - JavaScript execution time for theme switching
  - CSS rendering performance for theme variables
  - Memory usage of theme selector JavaScript

### 10. Edge Case Tests (Vitest + PHPUnit)

#### Error Handling and Edge Cases
- **File**: `tests/theme-selector-edge-cases.test.js`
- **Purpose**: Test unusual scenarios and error conditions
- **Coverage**:
  - Invalid theme values are rejected
  - Missing theme field gracefully handled
  - JavaScript disabled graceful degradation
  - Corrupted configuration recovery
  - Concurrent form submissions

## Test Infrastructure

### Test File Structure
```
tests/
├── src/
│   ├── Unit/
│   │   ├── ThemeSelectorConfigurationTest.php
│   │   └── ThemeSelectorMigrationTest.php
│   └── Functional/
│       └── ThemeSelectorRenderTest.php
├── backstop/
│   ├── theme-selector-admin.json
│   └── theme-selector-frontend.json
├── theme-selector-form.test.js
├── theme-selector-templates.test.js
├── theme-selector-accessibility.test.js
├── theme-selector-integration.test.js
├── theme-selector-components.test.js
├── theme-selector-css.test.js
├── theme-selector-javascript.test.js
├── theme-selector-performance.test.js
├── theme-selector-edge-cases.test.js
└── fixtures/
    ├── theme-selector-test-data.js
    └── paragraph-configurations.yml
```

### Test Configuration Updates

#### Vitest Configuration (`vitest.config.js`)
```javascript
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/utils/test-utils.js'],
    include: [
      'components/**/*.test.js', 
      'tests/**/*.test.js',
      'tests/theme-selector-*.test.js'  // New theme selector tests
    ],
    exclude: ['node_modules', 'dist', 'storybook-static'],
    coverage: {
      include: [
        'templates/form/form-element--field-content-element-theme.html.twig',
        'templates/form/select--field-content-element-theme.html.twig',
        'src/css/drupal-core.css'
      ]
    }
  }
});
```

#### BackstopJS Configuration Updates
```json
{
  "scenarios": [
    {
      "label": "Theme Selector - Text Paragraph Form",
      "url": "http://host.docker.internal/admin/structure/paragraphs_type/text/form-display",
      "selectors": [".form-item-field-content-element-theme"],
      "viewports": [
        {"name": "mobile", "width": 375, "height": 812},
        {"name": "desktop", "width": 1200, "height": 800}
      ]
    }
  ]
}
```

## Test Execution

### Run All Theme Selector Tests
```bash
# Frontend tests
ddev theme test:theme-selector

# Drupal tests  
ddev drush test-run --group theme_selector

# Visual regression tests
ddev backstop test --config=tests/backstop/theme-selector-admin.json

# Accessibility tests
ddev theme test:accessibility:theme-selector

# Full test suite
ddev theme test:theme-selector:all
```

### Continuous Integration

#### GitLab CI Pipeline Addition
```yaml
theme_selector_tests:
  stage: test
  script:
    - ddev theme test:theme-selector:all
    - ddev drush test-run --group theme_selector
    - ddev backstop test --config=tests/backstop/theme-selector-admin.json
  artifacts:
    reports:
      junit: tests/results/theme-selector-*.xml
    paths:
      - tests/backstop/reports/
  only:
    changes:
      - web/themes/custom/adesso_cms_theme/templates/form/form-element--field-content-element-theme.html.twig
      - web/themes/custom/adesso_cms_theme/templates/form/select--field-content-element-theme.html.twig
      - web/themes/custom/adesso_cms_theme/src/css/drupal-core.css
```

## Quality Metrics

### Coverage Requirements
- **Frontend JavaScript**: 90%+ code coverage
- **Form Templates**: 100% template rendering coverage  
- **Configuration Tests**: 100% paragraph type coverage
- **Accessibility**: 100% WCAG 2.1 AA compliance
- **Visual Regression**: Zero visual differences

### Performance Benchmarks
- **Form Load Time**: < 500ms with theme selector
- **Theme Switch Time**: < 100ms JavaScript execution
- **CSS Rendering**: < 50ms theme variable application
- **Memory Usage**: < 2MB additional JavaScript memory

## Test Data and Fixtures

### Test Paragraph Types
```javascript
// tests/fixtures/theme-selector-test-data.js
export const paragraphTypes = [
  'accordion', 'accordion_item', 'block_reference', 'card', 'card_group',
  'carousel', 'carousel_item', 'download', 'download_item', 'embed',
  'gallery', 'hero', 'logo_collection', 'media', 'newsletter',
  'pricing', 'pricing_card', 'sidebyside', 'slider', 'slider_item',
  'stats_item', 'text', 'views'
];

export const themeOptions = [
  { value: 'light', label: 'Light', description: 'Standard white background' },
  { value: 'highlighted', label: 'Highlighted', description: 'Light gray background for emphasis' },
  { value: 'dark', label: 'Dark', description: 'Dark background with light text' }
];
```

### Mock Form Data
```javascript
// tests/fixtures/mock-form-data.js
export const mockFormElement = {
  attributes: { class: ['form-item'] },
  name: 'field_theme[0][value]',
  type: 'select',
  label: 'Content Element Theme',
  children: '<select>...</select>',
  errors: null,
  required: false
};
```

## Maintenance and Updates

### Adding New Theme Options
1. Update test data fixtures with new theme values
2. Add new theme CSS tests for variables
3. Update visual regression baseline images
4. Add accessibility tests for new theme
5. Update documentation and test descriptions

### Adding New Paragraph Types
1. Add paragraph type to test fixtures
2. Run configuration validation tests
3. Update integration tests to include new type
4. Generate visual regression baselines
5. Verify theme selector appears and functions

### Updating Form Templates
1. Update template rendering tests
2. Regenerate visual regression baselines
3. Run accessibility audit on changes
4. Update performance benchmarks
5. Test JavaScript functionality still works

## Troubleshooting Test Issues

### Common Test Failures

#### Configuration Tests Failing
```bash
# Check paragraph type configurations
ddev drush config:export --destination=/tmp/config-export
grep -r "field_theme" /tmp/config-export/

# Verify field weights
ddev drush cget core.entity_form_display.paragraph.text.default display.field_theme.weight
```

#### Visual Regression Failures
```bash
# Update baselines after confirmed changes
ddev backstop approve --config=tests/backstop/theme-selector-admin.json

# Debug specific scenarios
ddev backstop test --config=tests/backstop/theme-selector-admin.json --filter="Theme Selector"
```

#### JavaScript Tests Failing
```bash
# Run tests in watch mode for debugging
ddev theme test:theme-selector --watch

# Check browser console for errors
ddev theme test:theme-selector --reporter=verbose
```

#### Accessibility Test Failures
```bash
# Generate detailed accessibility report
ddev theme test:accessibility:theme-selector --reporter=json > accessibility-report.json

# Test specific WCAG criteria
ddev theme test:accessibility:theme-selector --tags="wcag2aa"
```

## Documentation Updates

### Test Documentation Maintenance
- Update test descriptions when functionality changes
- Maintain test data fixtures with current paragraph types
- Document new test patterns and utilities
- Keep performance benchmarks current
- Update troubleshooting guides based on common issues

### Integration with Development Workflow
- Run theme selector tests before commits
- Include test results in merge request descriptions
- Update tests when adding new paragraph types
- Validate test coverage meets quality gates
- Review and approve visual regression changes

---

**Last Updated**: 2025-01-05  
**Test Suite Version**: 1.0.0  
**Coverage Target**: 95%+  
**Maintainer**: QA Testing Specialist