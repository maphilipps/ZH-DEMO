# Drupal Configuration Export - Claude Agent Guide

## Configuration Overview

This directory contains the complete exported configuration for the Adesso CMS Drupal 11 project. Configuration management is critical for maintaining consistency across development, staging, and production environments.

### **Configuration Architecture**
- **Drupal Core**: 11.2.2 configuration schemas
- **AI Integration**: Multiple AI providers and services
- **Content Management**: Advanced content types, fields, and workflows
- **Media Management**: Comprehensive media handling with responsive images
- **Performance**: Caching, aggregation, and optimization settings

### **Key Configuration Areas**

#### **AI & Content Enhancement**
```
ai*.yml                      # Core AI framework configuration
ai_content_suggestions*      # AI-powered content recommendations
ai_image_alt_text*          # Automatic alt text generation
ai_provider_*               # OpenAI, Anthropic, Groq provider configs
ai_translate*               # AI-assisted translation services
```

#### **Content Types & Fields**
```
core.entity_form_display*   # Content editing forms
core.entity_view_display*   # Content display modes
field.field.*               # Field configurations
field.storage.*             # Field storage schemas
```

#### **Media & Image Management**
```
image.style.*               # 50+ responsive image styles
media.*                     # Media type configurations
crop.*                      # Image cropping and focal point
```

#### **User Experience & Frontend**
```
block.*                     # Block layout configurations
core.entity_view_mode*      # Display modes (card, teaser, full)
easy_breadcrumb*            # Navigation breadcrumbs
frontend_editing*           # In-place content editing
```

## Configuration Management Workflows

### **Preferred Agent Routing**

#### Configuration Analysis & Updates
- **Configuration Changes** → `drupal-configuration-expert` → `drupal-11-lead-developer`
- **Complex Config Issues** → `drupal-solution-architect` → `drupal-configuration-expert`
- **Performance Config** → `drupal-performance-specialist` → `drupal-configuration-expert`

#### Content Type Development
- **New Content Types** → `drupal-cms-content-types` → `drupal-configuration-expert`
- **Field Configuration** → `drupal-11-lead-developer` → `drupal-configuration-expert`
- **Media Configuration** → `drupal-media-expert` → `drupal-configuration-expert`

#### AI Configuration Management
- **AI Provider Setup** → `drupal-ai-integration-specialist` → `drupal-configuration-expert`
- **AI Security Settings** → `drupal-cms-security-privacy` → `drupal-ai-integration-specialist`

### **Configuration Export Commands**
```bash
# Export all configuration
ddev drush cex

# Export specific configuration
ddev drush cex --destination=/path/to/export

# Import configuration
ddev drush cim

# Compare configurations
ddev drush config:status
```

## Critical Configuration Files

### **Core Content Management**
- `core.entity_form_display.node.*.yml` - Content editing interfaces
- `core.entity_view_display.node.*.yml` - Content display configurations
- `field.field.node.*.yml` - Content type field definitions
- `paragraphs.paragraphs_type.*.yml` - Paragraph component definitions

### **AI Integration Settings**
- `ai.settings.yml` - Core AI framework configuration
- `ai_provider_openai.settings.yml` - OpenAI integration (GPT-4o, DALL-E-3)
- `ai_provider_anthropic.settings.yml` - Anthropic integration (Claude)
- `ai_content_suggestions.settings.yml` - Content enhancement settings

### **Media & Performance**
- `image.style.*.yml` - 50+ responsive image styles for all aspect ratios
- `crop.settings.yml` - Image cropping and focal point configuration
- `system.performance.yml` - CSS/JS aggregation and caching

### **User Experience**
- `block.block.*.yml` - Block placement and visibility rules
- `core.entity_view_mode.*.yml` - Custom display modes (card, hero, gallery)
- `easy_breadcrumb.settings.yml` - Breadcrumb navigation configuration

## Configuration Development Patterns

### **Creating New Content Types**
1. **Plan Structure** with `drupal-cms-content-types` agent
2. **Implement Fields** using Drupal admin or config files
3. **Export Configuration** with `ddev drush cex`
4. **Test Import/Export** cycle for consistency
5. **Document Changes** in commit messages

### **AI Feature Configuration**
1. **Provider Setup** through admin interface
2. **Security Review** with appropriate agents
3. **Test Integration** with content creation workflows
4. **Export Settings** to maintain across environments
5. **Monitor Performance** impact

### **Media Workflow Configuration**
1. **Define Image Styles** for all required aspect ratios
2. **Configure Media Types** for different content needs
3. **Set Up Focal Point** for responsive image cropping
4. **Test Responsive Behavior** across all breakpoints
5. **Optimize Performance** with WebP and lazy loading

## Environment-Specific Considerations

### **Development Environment**
- `development.services.yml` - Development-specific service overrides
- Debug mode enabled for Twig and configuration
- Cache disabled for rapid development iteration

### **Production Environment**
- CSS/JS aggregation enabled
- Render caching optimized
- Security settings enforced
- Performance monitoring active

### **Configuration Synchronization**
- All environments use identical configuration base
- Environment-specific overrides handled via settings files
- Configuration imports tested before deployment
- Rollback procedures documented and tested

## Security Considerations

### **AI Provider Security**
- API keys stored in Key module, not configuration files
- Provider access restrictions configured
- Content moderation workflows enabled
- Audit logging for AI operations

### **Content Security**
- Input format restrictions configured
- User permission schemes defined
- Content moderation workflows active
- CSRF protection enabled

### **System Security**
- Update notifications configured
- Security review processes defined
- Backup strategies implemented
- Access logging enabled

## Troubleshooting Configuration Issues

### **Common Configuration Problems**

#### Missing Dependencies
```bash
# Check for missing modules
ddev drush pm:list --type=module --status=not\ installed

# Enable required modules
ddev drush en module_name
```

#### Configuration Import Failures
```bash
# Check configuration status
ddev drush config:status

# Force import specific configuration
ddev drush cim --partial --source=/path/to/config

# Delete problematic configuration
ddev drush cdel config.name
```

#### Performance Issues
```bash
# Clear all caches
ddev drush cr

# Rebuild cache bins
ddev drush cc css-js
ddev drush cc render
```

### **AI Configuration Debugging**
- Verify API key configuration in Key module
- Check provider service status and quotas
- Review content suggestion logs
- Test AI features with sample content

## Configuration Documentation Standards

### **Commit Message Format**
```
config: Add new image styles for hero components

- Added 16:9 responsive image styles
- Configured WebP conversion for performance
- Updated media view modes for hero display

Refs: ADE-123
```

### **Configuration Change Documentation**
- Document purpose of each major configuration change
- Include testing steps for verification
- Note any environment-specific considerations
- Reference related Linear tasks or issues

### **Configuration Review Process**
1. **Technical Review** by `drupal-configuration-expert`
2. **Security Review** by `drupal-cms-security-privacy`
3. **Performance Impact** assessed by `drupal-performance-specialist`
4. **Testing Verification** by `qa-testing-specialist`

This configuration management approach ensures consistency, security, and maintainability across all environments while supporting the advanced AI and content management features of the Adesso CMS project.