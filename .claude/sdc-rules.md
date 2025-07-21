# SDC Best Practices Rules

## 📋 SDC BEST PRACTICES REQUIREMENT

**ALWAYS FOLLOW CIVICTHEME-SDC-BEST-PRACTICES.MD**

- ALL Drupal Single Directory Component (SDC) work MUST follow patterns from `CIVICTHEME-SDC-BEST-PRACTICES.md`
- IF best practices are not followed, IMMEDIATELY reference this guide and apply the patterns

## Pre-Development Checklist

**BEFORE making any SDC changes, ALWAYS check this guide for:**
- Schema validation patterns
- Defensive Twig programming with `|default()` filters
- Proper NULL handling
- ARIA accessibility implementation
- Component include patterns

## Post-Development Validation

**AFTER any SDC changes, ALWAYS verify no validation errors exist**
- Run schema validation
- Test with NULL/empty data
- Verify accessibility compliance
- Check component rendering

## Critical Patterns

This guide contains production-ready patterns that prevent common SDC failures:
- Use defensive programming techniques
- Implement proper fallbacks
- Validate all inputs
- Ensure accessibility standards