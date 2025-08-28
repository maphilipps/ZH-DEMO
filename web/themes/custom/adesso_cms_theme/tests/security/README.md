# Security Testing for Field Rendering Validation

This directory contains security validation tests that address critical testing gaps identified in PR #77 reviews.

## Overview

The `field-rendering-validation.test.js` file provides comprehensive security testing for slot-based field rendering patterns, ensuring XSS prevention and architectural compliance.

## Testing Coverage

### 1. XSS Security Testing
- **Purpose**: Validates that slot-based rendering prevents XSS vulnerabilities
- **Components Tested**: hero, text, sidebyside, pricing-card
- **Validation**: Ensures malicious script tags are sanitized by Drupal field templates

### 2. Slot Architecture Validation
- **Purpose**: Ensures components use slot-based architecture instead of manual field extraction
- **Anti-Pattern Detection**: Identifies and prevents `|render|striptags` and manual field access patterns
- **Regression Prevention**: Tests prevent old anti-patterns from returning

### 3. Field Template Integration
- **Purpose**: Validates proper Drupal field template integration in slots
- **Field Structure**: Ensures field wrapper markup and classes are preserved
- **Content Safety**: Prevents double-escaping while maintaining security

### 4. Component Security Architecture
- **Purpose**: Validates all target components use secure slot-based patterns
- **Coverage**: Tests hero, text, sidebyside, and pricing-card components
- **Architecture Verification**: Ensures `data-architecture="slot-based"` attribute

## Key Security Validations

### XSS Prevention Patterns
```javascript
// SECURE: Slot-based rendering with field templates
{% block primary_action %}
  {{ content.field_link }}  // Uses Drupal field template
{% endblock %}

// INSECURE: Manual field extraction (PREVENTED)
<a href="{{ field_link.url }}">{{ field_link.title }}</a>
```

### Anti-Pattern Detection
```javascript
// ANTI-PATTERN: Manual field rendering (FORBIDDEN)
{{ field_body|render|striptags }}

// CORRECT PATTERN: Slot-based field templates
{% block content %}
  {{ content.field_body }}  // Preserves field structure and security
{% endblock %}
```

## Test Execution

Run security tests with:
```bash
ddev npm test -- tests/security/field-rendering-validation.test.js
```

Or include in full test suite:
```bash
ddev npm test
```

## Mock Field Data

Tests use `mockDrupalFieldRender()` to simulate realistic Drupal field output:
- `field_title`: Proper heading markup with field classes
- `field_link`: Complete link field with wrapper markup
- `field_body`: Rich text with proper paragraph structure
- `field_user_input`: Malicious content for XSS testing

## Architecture Validation

Each component is tested for:
1. **Slot-based Architecture**: `data-architecture="slot-based"`
2. **Proper Slot Usage**: Required slots present and functional
3. **Field Template Integration**: Field structure preserved
4. **XSS Prevention**: Malicious content sanitized

## Regression Prevention

Tests prevent the return of:
- `|render|striptags` filters
- Manual field property access (`field_title.0.value`)
- Props-based field rendering
- Manual field extraction patterns

## German Compliance Integration

Security tests integrate with existing German compliance validation to ensure:
- eCH-0059 accessibility standards maintained
- WCAG 2.1 AA compliance with secure rendering
- Municipal portal security requirements met

## Critical Testing Rule #1 Compliance

These tests follow CLAUDE.md Testing Rule #1:
- **Never claim tests pass when failures exist**
- **Analyze complete test output** for hidden failures
- **Fix failing tests immediately** before proceeding
- **Document every fix** for learning patterns

## Security Learning Documentation

Each security test failure generates documented learnings in CLAUDE.md following the security rule patterns established in the codebase.

## Integration with CI/CD

Security tests must pass before:
- Pull request approval
- Deployment to staging/production
- Component library updates
- Field template modifications

## Related Documentation

- [Component Slot Standards](/COMPONENT_SLOT_STANDARDS.md)
- [Field Title Migration Guide](/FIELD_TITLE_MIGRATION_GUIDE.md)
- [Template Pattern Standards](/TEMPLATE_PATTERN_STANDARDS.md)
- [Main Test README](../README.md)