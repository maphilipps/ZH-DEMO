# adesso CMS Accessibility Standards

## WCAG 2.1 AA Compliance Requirements

### Component Accessibility Checklist
- **ARIA attributes:** Required for all interactive components
- **Keyboard navigation:** All functionality accessible via keyboard
- **Screen reader compatibility:** Proper semantic markup
- **Color contrast:** Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus management:** Visible focus indicators
- **Alternative text:** Required for all images and media

### Drupal SDC Accessibility Integration
- Use semantic HTML5 elements in component templates
- Implement ARIA roles, properties, and states correctly
- Provide accessible form labels and error messages
- Ensure logical heading hierarchy (h1-h6)
- Include skip links for main content areas

### Testing Requirements
- **Automated testing:** Use axe-core in Storybook
- **Manual testing:** Keyboard-only navigation verification
- **Screen reader testing:** Test with NVDA/JAWS/VoiceOver
- **Color contrast validation:** Use WebAIM contrast checker
- **Browser testing:** Test across different browsers and assistive technologies

### Twig Template Accessibility Patterns
```twig
{# Proper button with ARIA #}
<button 
  type="button" 
  aria-expanded="{{ expanded|default(false) ? 'true' : 'false' }}"
  aria-controls="{{ target_id|default('') }}"
  {{ attributes|default() }}>
  {{ button_text|default('Click me') }}
</button>

{# Accessible form field #}
<div class="form-field">
  <label for="{{ field_id }}">{{ label_text }}</label>
  <input 
    type="{{ input_type|default('text') }}" 
    id="{{ field_id }}"
    aria-describedby="{{ field_id }}-help"
    {{ required ? 'required' : '' }}
    {{ attributes|default() }}>
  <div id="{{ field_id }}-help" class="help-text">{{ help_text|default('') }}</div>
</div>
```

### Critical Accessibility Points for adesso CMS
- All components MUST pass WCAG 2.1 AA standards
- Use `editoria11y` module for content accessibility checks
- Implement proper focus management in JavaScript interactions
- Ensure all custom Tailwind CSS maintains accessibility standards
- Regular accessibility audits required before deployment