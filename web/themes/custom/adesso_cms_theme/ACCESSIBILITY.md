# Accessibility Implementation - adesso CMS Theme

## Overview

This document outlines the comprehensive ARIA implementation and accessibility compliance features integrated into the adesso CMS theme components.

## ARIA Implementation Status

### ✅ Site Header Component (`components/site-header/`)

**Features Implemented:**
- Skip link for keyboard navigation
- Semantic HTML structure with `role="banner"` and `role="navigation"`
- Complete ARIA labeling for navigation elements
- Mega menu with full ARIA support
- Mobile menu with proper state management
- Live region for navigation announcements

**ARIA Attributes:**
- `aria-label` for navigation and homepage link
- `aria-controls` and `aria-expanded` for dropdown toggles
- `aria-haspopup="menu"` for dropdown triggers
- `aria-labelledby` for mega menu dropdowns
- `aria-hidden` for decorative icons and hidden menus
- `aria-current="page"` for active navigation items
- `role="menubar"`, `role="menuitem"`, `role="none"` for semantic structure

**Keyboard Support:**
- Tab navigation through all interactive elements
- Escape key closes dropdowns
- Arrow key navigation (implemented in JavaScript)
- Focus management for mobile menu

### ✅ Modal Component (`components/modal/`)

**Features Implemented:**
- Full dialog ARIA support
- Focus management and trapping
- Keyboard navigation (Tab and Escape)
- Screen reader announcements

**ARIA Attributes:**
- `role="dialog"` with `aria-modal="true"`
- `aria-labelledby` linking to dialog title
- `aria-describedby` linking to dialog content (when present)
- `aria-haspopup="dialog"` for trigger buttons
- `aria-controls` linking trigger to modal
- Descriptive `aria-label` attributes for all interactive elements

**Keyboard Support:**
- Tab cycling within modal (focus trap)
- Escape key closes modal
- Focus returns to trigger element on close

### ✅ JavaScript Error Handling (`src/js/error-handler.js`)

**Accessibility Features:**
- Graceful degradation when JavaScript fails
- Error announcements don't disrupt screen readers
- Safe element verification prevents ARIA attribute errors
- Debounced/throttled events prevent overwhelming assistive technology

## Accessibility Standards Compliance

### WCAG 2.1 AA Compliance

**Level A Requirements:**
- ✅ Semantic HTML structure
- ✅ Keyboard accessibility
- ✅ Alternative text for images
- ✅ Form labels and instructions

**Level AA Requirements:**
- ✅ Color contrast ratios (handled by Tailwind classes)
- ✅ Resize text up to 200% (responsive design)
- ✅ Focus visible indicators
- ✅ Consistent navigation

### Additional Accessibility Features

**Focus Management:**
- Skip links for main content
- Focus trapping in modals
- Visible focus indicators
- Logical tab order

**Screen Reader Support:**
- ARIA landmarks (`banner`, `navigation`, `main`)
- Live regions for dynamic content
- Hidden content properly marked with `aria-hidden`
- Descriptive labels for all interactive elements

**Color and Contrast:**
- Uses Tailwind's contrast-compliant color system
- Dark mode support with appropriate contrast
- No reliance on color alone for information

## Component-Specific Guidelines

### Navigation Components

```twig
{# Always include skip link #}
<a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>

{# Use semantic navigation structure #}
<nav aria-label="Main navigation" role="navigation">
  <ul role="menubar">
    <li role="none">
      <a href="/page" role="menuitem" aria-current="page">Link</a>
    </li>
  </ul>
</nav>
```

### Interactive Components

```twig
{# Modal trigger #}
<button 
  aria-haspopup="dialog" 
  aria-controls="modal-id"
  aria-label="Open dialog title">
  Button Text
</button>

{# Modal container #}
<div 
  role="dialog" 
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-body">
  <!-- Modal content -->
</div>
```

### Form Components

```twig
{# Form fields with proper labeling #}
<label for="field-id">Field Label</label>
<input 
  id="field-id" 
  aria-describedby="field-help"
  aria-required="true">
<div id="field-help">Help text</div>
```

## Testing Guidelines

### Automated Testing

1. **aXe-core Integration:**
   ```bash
   # Run accessibility tests
   npm run test:a11y
   ```

2. **Pa11y Testing:**
   ```bash
   # Test specific URLs
   pa11y https://example.com
   ```

### Manual Testing

**Keyboard Navigation:**
- Tab through all interactive elements
- Test skip links functionality
- Verify focus indicators are visible
- Test escape key functionality

**Screen Reader Testing:**
- Test with NVDA (Windows) or VoiceOver (macOS)
- Verify all content is announced properly
- Test navigation and landmark usage
- Verify live regions work correctly

**Visual Testing:**
- Test with 200% zoom
- Verify color contrast ratios
- Test dark mode accessibility
- Check focus indicators

## Known Issues and Limitations

### Current Limitations

1. **Carousel Component:**
   - Needs enhanced ARIA support for slide navigation
   - Missing slide announcements

2. **Form Validation:**
   - Error messages need `aria-live` regions
   - Field validation needs `aria-invalid` attributes

3. **Dynamic Content:**
   - Some AJAX-loaded content needs better announcement
   - Loading states need ARIA support

### Planned Improvements

1. **Enhanced Keyboard Navigation:**
   - Arrow key navigation in menus
   - Home/End key support in carousels

2. **Better Error Handling:**
   - ARIA error announcements
   - Form validation improvements

3. **Advanced Features:**
   - High contrast mode support
   - Reduced motion preferences
   - Voice navigation support

## Development Guidelines

### Best Practices

1. **Always Test with Keyboard:**
   - Ensure all functionality works without mouse
   - Test tab order is logical
   - Verify focus is always visible

2. **Use Semantic HTML:**
   - Choose appropriate HTML elements
   - Add ARIA only when necessary
   - Don't override native semantics unnecessarily

3. **Provide Context:**
   - Use descriptive labels
   - Include instructions for complex interactions
   - Announce state changes

### Common Patterns

**Error Handling:**
```javascript
// Use error handler utilities
const { safeQuerySelector, verifyElement } = Drupal.adessoCMS.errorHandler;

// Safe element access
const element = safeQuerySelector('#my-element');
if (!verifyElement(element, 'operation')) return;
```

**ARIA State Management:**
```javascript
// Update ARIA attributes safely
function toggleMenu(button, menu) {
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', !isExpanded);
  menu.setAttribute('aria-hidden', isExpanded);
}
```

## Resources

### External Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

### Internal Documentation

- [Component Development Guide](../README.md)
- [JavaScript Error Handling](./src/js/behavior-template.js)
- [Storybook Accessibility Tests](./storybook-static/accessibility-tests.html)

## Changelog

### Version 2.0.0 (Current)
- ✅ Complete ARIA implementation for navigation
- ✅ Modal accessibility compliance
- ✅ JavaScript error handling with accessibility considerations
- ✅ Skip link implementation
- ✅ Focus management improvements

### Planned for Version 2.1.0
- ⏳ Carousel ARIA enhancements
- ⏳ Form validation improvements
- ⏳ Enhanced keyboard navigation
- ⏳ High contrast mode support