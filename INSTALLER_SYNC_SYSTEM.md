# adesso CMS Installer Synchronization System

## Overview

The adesso CMS Installer Synchronization System provides a comprehensive solution for maintaining a single, unified recipe that captures the complete state of the current working site. This eliminates the complexity of multiple fragmented recipes and ensures consistent, conflict-free installations.

## System Architecture

### Single Recipe Strategy
- **Master Recipe**: `adesso_cms_complete` - One comprehensive recipe containing all site configurations
- **Complete State Capture**: All modules, configurations, content types, and dependencies
- **No Conflicts**: Single source of truth eliminates module dependency conflicts
- **Easy Maintenance**: One recipe to update and maintain

### Key Components

1. **Master Recipe** (`/recipes/adesso_cms_complete/`)
   - Complete site configuration in single recipe.yml
   - All module dependencies and installation order
   - Configuration imports and actions
   - Comprehensive composer.json with all dependencies

2. **Sync Command** (`ddev sync-to-installer`)
   - Analyzes current live site state
   - Exports all configurations automatically
   - Updates master recipe with current module list
   - Copies critical configuration files
   - Generates validation and documentation

3. **Validation System**
   - Installation validation script
   - Recipe structure testing
   - Dependency verification
   - Content type validation

4. **Cleanup System** (`ddev cleanup-recipes`)
   - Removes old fragmented recipes
   - Preserves external dependencies
   - Creates migration documentation
   - Backup functionality

## Commands Reference

### Main Commands

#### `ddev sync-to-installer [options]`
Synchronizes current site state into the master recipe.

**Options:**
- `--dry-run` - Preview changes without modifying files
- `--no-config` - Skip configuration export
- `--no-modules` - Skip module dependency analysis

**Example:**
```bash
# Full sync with current site state
ddev sync-to-installer

# Preview what would be changed
ddev sync-to-installer --dry-run
```

#### `ddev cleanup-recipes [options]`
Cleans up old fragmented recipes and replaces with unified approach.

**Options:**
- `--dry-run` - Preview cleanup without making changes
- `--backup` - Create backup of old recipes before cleanup
- `--force` - Skip confirmation prompts

**Example:**
```bash
# Clean up with backup
ddev cleanup-recipes --backup

# Preview cleanup
ddev cleanup-recipes --dry-run
```

### Recipe Testing Commands

#### `recipes/adesso_cms_complete/test-recipe.sh [options]`
Tests recipe structure and validates installation readiness.

**Options:**
- `--quick` - Run quick structure validation only
- `--no-cleanup` - Preserve test directory for manual inspection

**Example:**
```bash
# Quick validation test
ddev exec /var/www/html/recipes/adesso_cms_complete/test-recipe.sh --quick

# Full test with manual cleanup
ddev exec /var/www/html/recipes/adesso_cms_complete/test-recipe.sh --no-cleanup
```

#### `recipes/adesso_cms_complete/validate-installation.sh`
Validates that installation meets all requirements.

**Example:**
```bash
# Validate current installation
ddev exec /var/www/html/recipes/adesso_cms_complete/validate-installation.sh
```

## Recipe Structure

### Master Recipe (`/recipes/adesso_cms_complete/`)

```
adesso_cms_complete/
├── recipe.yml              # Main recipe definition
├── composer.json           # Dependency management
├── README.md               # Installation documentation
├── validate-installation.sh # Post-install validation
├── test-recipe.sh          # Recipe testing script
└── config/                 # Configuration files
    ├── core.extension.yml
    ├── ai*.yml            # AI provider configurations
    ├── field.*.yml        # Field definitions
    ├── paragraphs.*.yml   # Paragraph type definitions
    ├── image.style.*.yml  # Image style definitions
    └── ...                # All critical configurations
```

## Installation Workflow

### New Installation
```bash
# 1. Create Drupal project
composer create-project drupal/recommended-project:^11.0 my-adesso-cms
cd my-adesso-cms

# 2. Apply adesso CMS recipe
php core/scripts/drupal recipe recipes/adesso_cms_complete

# 3. Configure environment
# - Set up database connection
# - Configure AI API keys
# - Set file permissions

# 4. Validate installation
./recipes/adesso_cms_complete/validate-installation.sh
```

### Updating Recipe from Live Site
```bash
# 1. Export current site state
ddev sync-to-installer

# 2. Test updated recipe
ddev exec /var/www/html/recipes/adesso_cms_complete/test-recipe.sh --quick

# 3. Validate recipe completeness
ddev exec /var/www/html/recipes/adesso_cms_complete/validate-installation.sh

# 4. Commit to version control
git add recipes/adesso_cms_complete/
git commit -m "Update master recipe with current site state"
```

## Features Included

### AI Integration Suite
- **Anthropic Claude**: Content suggestions, image alt text
- **OpenAI GPT**: Alternative AI provider support
- **AI Tools**: Bulk alt text generation, content moderation
- **Secure Configuration**: API key management through environment variables

### Content Management System
- **Content Types**: Page, News, Event, Person, Project
- **Paragraph System**: 20+ paragraph types for flexible content creation
  - Text, Hero, Gallery, Accordion, Card Groups
  - Carousel, Pricing, Download, Newsletter
  - Side-by-side, Media, Logo Collection, etc.
- **Media Management**: Advanced image handling with WebP, focal point
- **Responsive Images**: 50+ image styles and responsive configurations

### SEO & Marketing Tools
- **Meta Tags**: Comprehensive meta tag management
- **Sitemaps**: Automated XML sitemap generation
- **SEO Analysis**: Real-time SEO analysis with Yoast
- **Social Media**: Open Graph and Twitter Cards integration

### Security & Performance
- **Spam Prevention**: Multiple layers (CAPTCHA, Honeypot, Friendly CAPTCHA)
- **Performance**: CDN integration, image optimization, caching
- **Security**: Input validation, CSRF protection, secure authentication

### User Experience
- **Admin Theme**: Gin admin theme with adesso branding
- **Frontend Theme**: Custom adesso_cms_theme
- **Accessibility**: WCAG 2.1 AA compliance tools
- **Frontend Editing**: Live editing capabilities

## Configuration Management

### Environment-Specific Settings
The recipe uses environment variables and settings.php overrides for:
- API keys (AI providers, third-party services)
- Database connections
- Performance settings
- Debug configurations

### Example Configuration
```php
// settings.php additions
$config['ai_provider_anthropic.settings']['api_key'] = getenv('ANTHROPIC_API_KEY');
$config['ai_provider_openai.settings']['api_key'] = getenv('OPENAI_API_KEY');

// Performance settings
$config['system.performance']['css']['preprocess'] = TRUE;
$config['system.performance']['js']['preprocess'] = TRUE;
```

## Migration from Old Recipes

### Automated Migration
```bash
# 1. Create backup and clean up old recipes
ddev cleanup-recipes --backup

# 2. Update deployment scripts to use new recipe
# Change from: multiple recipe applications
# To: single adesso_cms_complete recipe

# 3. Update documentation references
# Point all installation guides to adesso_cms_complete
```

### Manual Migration Steps
1. **Review Current State**: Use `ddev sync-to-installer --dry-run` to preview
2. **Backup Critical Data**: Always backup database and files
3. **Test Installation**: Use test script to validate recipe
4. **Update Deployment**: Change CI/CD to use unified recipe
5. **Document Changes**: Update team documentation

## Troubleshooting

### Common Issues

#### Missing Modules Error
```bash
# Symptom: "Module X is not available"
# Solution: Re-sync with current site
ddev sync-to-installer
```

#### Configuration Import Failures
```bash
# Symptom: Configuration import errors
# Solution: Check configuration consistency
drush config:export --diff
ddev sync-to-installer
```

#### Recipe Validation Failures
```bash
# Symptom: Recipe test fails
# Solution: Run validation with details
ddev exec /var/www/html/recipes/adesso_cms_complete/validate-installation.sh
ddev exec /var/www/html/recipes/adesso_cms_complete/test-recipe.sh --no-cleanup
```

### Debug Commands
```bash
# Check enabled modules
drush pm:list --status=enabled

# Verify configuration export
drush config:export --diff

# Test recipe structure
ddev exec /var/www/html/recipes/adesso_cms_complete/test-recipe.sh --quick

# Validate dependencies
composer validate recipes/adesso_cms_complete/composer.json
```

## Maintenance

### Regular Tasks
1. **Weekly**: Sync recipe with any site changes
2. **Before Releases**: Full recipe testing
3. **Monthly**: Clean up and optimize configurations
4. **Quarterly**: Review and update documentation

### Update Workflow
```bash
# 1. Make site changes
# 2. Test changes locally
# 3. Update recipe
ddev sync-to-installer

# 4. Test recipe
ddev exec /var/www/html/recipes/adesso_cms_complete/test-recipe.sh

# 5. Commit and deploy
git add recipes/adesso_cms_complete/
git commit -m "feat: Update recipe with [description]"
```

## Benefits

### For Developers
- **Single Source of Truth**: No confusion about which recipes to use
- **Faster Setup**: One recipe installs everything
- **Better Testing**: Comprehensive validation system
- **Easy Maintenance**: One recipe to update and maintain

### For Operations
- **Predictable Deployments**: Consistent installation process
- **Reduced Errors**: Eliminates module conflict issues
- **Better Documentation**: Clear installation and maintenance guides
- **Automated Validation**: Built-in testing and validation

### For Project Management
- **Faster Onboarding**: New developers get complete environment quickly
- **Consistent Environments**: All installations are identical
- **Reduced Support**: Fewer installation and configuration issues
- **Clear Documentation**: Comprehensive guides and procedures

## Support

### Documentation
- **Installation Guide**: `/recipes/adesso_cms_complete/README.md`
- **Migration Guide**: `/recipes/MIGRATION_GUIDE.md`
- **This System Guide**: `/INSTALLER_SYNC_SYSTEM.md`

### Commands Help
```bash
# Get help for any command
ddev sync-to-installer --help
ddev cleanup-recipes --help
```

### Contact
For technical support or questions about this system:
- Development Team: Internal adesso development team
- Documentation: Check README files in recipe directories
- Issues: Report through project management system

---

**Generated**: 2025-01-13  
**Version**: 1.0.0  
**Repository**: adesso-cms  
**Recipe**: adesso_cms_complete