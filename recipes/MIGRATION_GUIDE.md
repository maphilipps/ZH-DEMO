# adesso CMS Recipe Migration Guide

## Overview

The adesso CMS recipes have been consolidated into a single, comprehensive recipe called `adesso_cms_complete`. This guide explains how to migrate from the old fragmented recipes to the new unified approach.

## What Changed

### Removed Recipes
The following recipes have been consolidated:
- `adesso_cms_starter`
- `adesso_cms_paragraphs`
- `adesso_cms_ai_integration`
- `adesso_cms_enhancements`
- `adesso_cms_page_header`

### New Unified Recipe
- `adesso_cms_complete` - Complete adesso CMS installation with all features

## Migration Steps

### For New Installations
Simply use the new unified recipe:
```bash
php core/scripts/drupal recipe recipes/adesso_cms_complete
```

### For Existing Installations
Your existing installation is not affected. The old recipes have been removed from new installations but your current site continues to work normally.

### For Development/Testing
1. Use `ddev sync-to-installer` to update the master recipe with current site state
2. Test installations using `recipes/adesso_cms_complete/test-recipe.sh`
3. Validate installations using `recipes/adesso_cms_complete/validate-installation.sh`

## Benefits of Unified Recipe

1. **No Conflicts**: Single recipe eliminates dependency conflicts
2. **Complete State**: Captures entire site configuration in one place  
3. **Easy Maintenance**: One recipe to update and maintain
4. **Faster Installation**: No need to apply multiple recipes sequentially
5. **Better Testing**: Single point of validation and testing

## Backup Information

Old recipes backed up to: /var/www/html/recipes-backup-20250813_154348

## Support

If you need to recreate any of the old recipe functionality:
1. Check the current site configuration in `config-export/`
2. Use `ddev sync-to-installer` to capture current state
3. Manually create specific recipes if needed for modular deployment

## Commands Reference

- `ddev sync-to-installer` - Sync current site to master recipe
- `ddev cleanup-recipes --backup` - This cleanup command
- `recipes/adesso_cms_complete/test-recipe.sh` - Test recipe
- `recipes/adesso_cms_complete/validate-installation.sh` - Validate installation

Generated: Wed Aug 13 15:44:02 CEST 2025
