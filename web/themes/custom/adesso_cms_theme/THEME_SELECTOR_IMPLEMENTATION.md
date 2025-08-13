# Theme Selector Implementation

## Overview

This document outlines the frontend implementation for the standardized theme selector that appears directly under the Title field in all paragraph forms.

## Backend Integration

The theme selector leverages the standardized `field_theme` field with:
- **Field type**: `list_string`
- **Options**: light, highlighted, dark  
- **Widget**: `options_select`
- **Label**: "Content Element Theme"
- **Weight**: 1 (positioned directly under title at weight 0)

## Frontend Implementation

### 1. Enhanced CSS Styling (`drupal-core.css`)

#### Theme Selector Form Styling
- **Visual prominence**: Blue-tinted background with border
- **Icon integration**: Paint palette emoji (🎨) in label
- **Enhanced focus states**: Blue ring on focus-within
- **Responsive design**: Adjusted padding and typography for mobile

#### Form Field Hierarchy
- **Title field**: order-1 
- **Theme selector**: order-2
- **Other fields**: order-3
- **Visual separation**: Border-top separator after theme field

#### CSS Selectors Used
```css
.form-item-field-content-element-theme
.js-form-item-field-content-element-theme-0-value
[data-drupal-selector*="field-content-element-theme"]
```

### 2. Custom Form Templates

#### Form Element Template
**File**: `templates/form/form-element--field-content-element-theme.html.twig`

**Features**:
- Blue-themed styling with icon
- Interactive theme preview cards
- Keyboard accessibility support
- Detailed descriptions of each theme option
- JavaScript integration for visual feedback

#### Select Element Template  
**File**: `templates/form/select--field-content-element-theme.html.twig`

**Features**:
- Enhanced option labels with icons and descriptions:
  - 🌟 Light - Standard white background
  - 🎯 Highlighted - Light gray background for emphasis  
  - 🌙 Dark - Dark background with light text
- JavaScript preview functionality
- Accessibility improvements

### 3. Interactive Features

#### Theme Preview Cards
- **Visual representation**: Shows actual theme colors
- **Click interaction**: Selecting preview updates form field
- **Keyboard support**: Enter/Space key support
- **Focus management**: Proper ring indicators
- **Hover effects**: Scale and shadow transitions

#### JavaScript Functionality
```javascript
function selectTheme(themeValue)    // Updates select field from preview
function updateThemePreview(theme)  // Updates visual feedback
```

### 4. Accessibility Features

- **ARIA labels**: Descriptive labels for screen readers
- **Keyboard navigation**: Full keyboard support for previews
- **Focus management**: Clear focus indicators
- **Color contrast**: WCAG compliant color combinations
- **Screen reader**: Semantic HTML structure

### 5. Responsive Design

#### Mobile Optimizations (< 768px)
- **Reduced padding**: p-3 instead of p-4
- **Smaller text**: Adjusted typography scale
- **Flexible layout**: Stack elements vertically
- **Touch-friendly**: Adequate tap targets

#### Desktop Experience
- **Visual hierarchy**: Clear field grouping
- **Enhanced interactions**: Hover effects and transitions
- **Optimal spacing**: Generous padding and margins

## Theme Usage in Templates

All paragraph templates use the standardized pattern:

```twig
{% set theme_value = paragraph.field_theme.value|default('light') %}

<div class="w-full paragraph-wrapper" data-theme="{{ theme_value }}">
  <!-- Content -->
</div>
```

## CSS Theme System

The theme system uses CSS custom properties with data attributes:

```css
.paragraph-wrapper[data-theme="light"] {
  --paragraph-bg: theme('colors.white');
  --paragraph-text: theme('colors.gray.900');
}

.paragraph-wrapper[data-theme="highlighted"] {
  --paragraph-bg: theme('colors.gray.100');
  --paragraph-text: theme('colors.gray.800');  
}

.paragraph-wrapper[data-theme="dark"] {
  --paragraph-bg: theme('colors.gray.900');
  --paragraph-text: theme('colors.gray.100');
}
```

## File Structure

```
web/themes/custom/adesso_cms_theme/
├── src/css/drupal-core.css                                     # Enhanced admin styling
├── templates/form/
│   ├── form-element--field-content-element-theme.html.twig    # Custom form element
│   └── select--field-content-element-theme.html.twig          # Enhanced select dropdown
└── THEME_SELECTOR_IMPLEMENTATION.md                           # This documentation
```

## Browser Support

- **Modern browsers**: Full feature support
- **JavaScript disabled**: Graceful degradation to standard select
- **Mobile browsers**: Touch-optimized interactions
- **Screen readers**: Full accessibility support

## Maintenance Notes

### Adding New Themes
1. Update backend field options
2. Add CSS variables in `adesso.css`
3. Add preview card in form template
4. Update select option descriptions
5. Test across all paragraph types

### Troubleshooting
- **Theme not applying**: Check `data-theme` attribute in paragraph wrapper
- **Select not visible**: Verify field name matches CSS selectors
- **Preview not working**: Check JavaScript console for errors
- **Mobile issues**: Test responsive breakpoints

## Performance Considerations

- **CSS minification**: Build process optimizes styles
- **JavaScript inlining**: Small scripts inlined for performance
- **Asset loading**: No additional HTTP requests
- **Memory usage**: Minimal JavaScript footprint

## Testing Checklist

- [ ] Theme selector appears in all 25+ paragraph types
- [ ] Visual hierarchy: Title → Theme → Other fields
- [ ] Mobile responsiveness tested
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Theme preview cards functional
- [ ] JavaScript graceful degradation
- [ ] Cross-browser compatibility

## Future Enhancements

- **Live preview**: Real-time content preview with selected theme
- **Custom themes**: Support for user-defined color schemes
- **Animation**: Smooth transitions between theme changes
- **Bulk operations**: Apply theme to multiple paragraphs
- **Theme suggestions**: AI-powered theme recommendations