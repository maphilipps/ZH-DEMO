# Twig Error Prevention and Best Practices

## Overview
This document outlines critical best practices for preventing common Twig syntax errors in Drupal theme development, based on real issues encountered during development.

## Critical Error Patterns to Avoid

### 1. drupal_config() Function Usage

**❌ INCORRECT:**
```twig
{% set theme_config = drupal_config('adesso_cms_theme.settings') %}
```

**✅ CORRECT:**
```twig
{# Option 1: Access specific config key #}
{% set search_enabled = drupal_config('adesso_cms_theme.settings', 'features.search') %}

{# Option 2: Get full config and validate #}
{% set theme_config = drupal_config('adesso_cms_theme.settings') %}
{% if theme_config and theme_config.features %}
  {# Safe to access config properties #}
{% endif %}
```

**Key Points:**
- `drupal_config()` requires either a specific key parameter or proper null checking
- Always validate config exists before accessing nested properties
- Use the 'key' parameter for specific config values

### 2. Configuration Validation Patterns

**❌ AVOID:**
```twig
{% if theme_config.features.search %}
```

**✅ PREFERRED:**
```twig
{% if theme_config and theme_config.features and theme_config.features.search %}
```

**✅ ALTERNATIVE:**
```twig
{% if theme_config.features.search ?? false %}
```

### 3. Safe Config Access with Defaults

```twig
{# Pattern for safe config access with fallback #}
{% set config_value = drupal_config('theme.settings', 'feature.enabled') ?? true %}

{# Pattern for nested config with validation #}
{% set theme_config = drupal_config('adesso_cms_theme.settings') %}
{% set search_enabled = theme_config and theme_config.features ? theme_config.features.search ?? true : true %}
```

## Mandatory Validation Checklist

Before using any Drupal-specific Twig functions:

1. **Always validate config exists** before accessing properties
2. **Use null coalescing operator** (`??`) for safe defaults
3. **Test with cache rebuild** after template changes
4. **Check site loads** without errors after every change
5. **Use specific config keys** when possible instead of accessing objects

## Common Drupal Twig Functions - Safe Usage

### drupal_config()
```twig
{# Safe patterns #}
{% set site_name = drupal_config('system.site', 'name') %}
{% set theme_setting = drupal_config('mytheme.settings', 'feature') ?? 'default' %}
```

### drupal_block()
```twig
{# Always check if block exists #}
{% set block_content = drupal_block('system_branding_block') %}
{% if block_content %}
  {{ block_content }}
{% endif %}
```

### drupal_region()
```twig
{# Safe region rendering #}
{% set region_content = drupal_region('header') %}
{% if region_content %}
  {{ region_content }}
{% endif %}
```

## Error Prevention Workflow

1. **Before deployment:**
   - Clear cache: `ddev exec drush cache:rebuild`
   - Test site loads: `ddev launch`
   - Check browser console for JS errors
   - Verify all dropdowns/interactions work

2. **Template modification checklist:**
   - Validate all `drupal_config()` calls have proper parameters
   - Add null checks for all config property access
   - Test with empty/missing config scenarios
   - Use fallback values for critical functionality

3. **Code review patterns:**
   - Search for `drupal_config(` without key parameter
   - Look for direct property access without validation
   - Verify all conditional checks include existence validation

## Reference Resources

- [Twig Tweak Functions](https://www.specbee.com/blogs/twig-tweak-in-drupal-10-functions-and-filters)
- [Drupal Twig Functions Documentation](https://www.drupal.org/docs/theming-drupal/twig-in-drupal)

## Development Commands for Error Prevention

```bash
# Always clear cache after template changes
ddev exec drush cache:rebuild

# Test site immediately after changes
ddev launch

# Check for Twig syntax errors in logs
ddev logs | grep -i "twig"
ddev logs | grep -i "syntax"
```

## Summary

**REMEMBER:** Every config access in Twig templates must be validated. Never assume configuration exists or has expected structure. Always provide fallback values and test thoroughly after changes.