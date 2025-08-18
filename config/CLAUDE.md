# GPZH Configuration Management Guidelines

## ⚙️ Drupal Configuration Management for Multi-Site GPZH System

This guide covers configuration management best practices for the GPZH (Gemeindeportale Zürich) multi-site Drupal system, ensuring consistency across Thalwil, Thalheim, and Erlenbach while maintaining municipality-specific customizations.

## 📁 Configuration Structure

### **Configuration Directories**
```
config/
├── sync/                   # Main configuration sync directory
├── municipality/          # Municipality-specific overrides
│   ├── thalwil/           # Thalwil-specific configs
│   ├── thalheim/          # Thalheim-specific configs
│   └── erlenbach/         # Erlenbach-specific configs
├── ai/                    # AI provider configurations
├── compliance/           # Swiss compliance configurations
└── development/          # Development-specific configs
```

### **Configuration Types**
- **Core**: Basic Drupal system configuration
- **Content Types**: News, Events, Pages, Person profiles
- **AI Integration**: AI providers, content suggestions, alt-text
- **Compliance**: DSGVO, CH-DSG, eCH-0059 settings
- **Performance**: Caching, optimization settings
- **Multi-Site**: Municipality-specific overrides

## 🎯 Jira Integration for Configuration Changes

### **Configuration Change Workflow**
```
Jira Ticket → Configuration Export → Testing → PR with @claude Review → Import
```

### **Jira Task Types for Configuration**
- **GPZH-XXX**: New content type or field configuration
- **GPZH-XXX**: AI provider setup and configuration
- **GPZH-XXX**: Multi-site configuration changes
- **GPZH-XXX**: Performance optimization configurations
- **GPZH-XXX**: Compliance and security configurations

### **Branch Naming for Config Changes**
```bash
config/GPZH-123-new-event-content-type
config/GPZH-456-ai-provider-anthropic-setup
config/GPZH-789-municipality-theme-config
```

## 🏗️ Configuration Management Commands

### **Jira-Integrated Configuration Commands**
```bash
# Export configuration with Jira reference
@config-export GPZH-XXX        # Export config for Jira ticket
@config-import GPZH-XXX        # Import config for Jira ticket
@config-diff GPZH-XXX          # Show config differences
@config-validate GPZH-XXX      # Validate config across all municipalities

# Multi-site configuration
@config-sync-all               # Sync config across all municipalities
@municipality-config [site]    # Export municipality-specific config
@config-override [site]        # Apply municipality overrides
```

### **DDEV Configuration Commands**
```bash
# Standard configuration management
ddev drush cex                 # Export configuration
ddev drush cim                 # Import configuration  
ddev drush cim --preview=diff  # Preview configuration changes
ddev drush cr                  # Clear cache after config changes

# Multi-site specific
ddev drush cex --uri=thalwil.gpzh.local
ddev drush cex --uri=thalheim.gpzh.local
ddev drush cex --uri=erlenbach.gpzh.local
```

## 🏛️ Municipality-Specific Configuration

### **Thalwil Configuration Example**
```yaml
# config/municipality/thalwil/system.site.yml
name: 'Gemeinde Thalwil'
slogan: 'Leben am Zürichsee'
mail: 'webmaster@thalwil.ch'
theme:
  default: 'adesso_cms_theme'
  admin: 'gin'
theme_settings:
  color_scheme: 'lake_blue'
  municipality: 'thalwil'
  logo_path: '/themes/custom/adesso_cms_theme/assets/logos/thalwil.svg'
```

### **Thalheim Configuration Example**
```yaml
# config/municipality/thalheim/system.site.yml
name: 'Gemeinde Thalheim'
slogan: 'Im Weinland Zürich'
mail: 'info@thalheim.ch'
theme_settings:
  color_scheme: 'wine_green'
  municipality: 'thalheim'
  logo_path: '/themes/custom/adesso_cms_theme/assets/logos/thalheim.svg'
```

### **Erlenbach Configuration Example**
```yaml
# config/municipality/erlenbach/system.site.yml
name: 'Gemeinde Erlenbach'
slogan: 'Perle am Zürichsee'
mail: 'gemeinde@erlenbach.ch'
theme_settings:
  color_scheme: 'lake_turquoise'
  municipality: 'erlenbach'
  logo_path: '/themes/custom/adesso_cms_theme/assets/logos/erlenbach.svg'
```

## 🤖 AI Integration Configuration

### **AI Provider Configuration**
```yaml
# config/ai/ai_provider_anthropic.settings.yml
provider_id: 'anthropic'
api_key_reference: 'anthropic_api_key'
model_configurations:
  claude_3_5_sonnet:
    model_id: 'claude-3-5-sonnet-20241022'
    max_tokens: 4000
    temperature: 0.7
    use_cases:
      - 'content_suggestions'
      - 'alt_text_generation'
      - 'swiss_administrative_text'

# config/ai/ai_content_suggestions.settings.yml  
enabled_content_types:
  - 'news'
  - 'page'
  - 'event'
municipality_prompts:
  thalwil: 'Erstelle Inhalte für die Gemeinde Thalwil am Zürichsee'
  thalheim: 'Erstelle Inhalte für die Gemeinde Thalheim im Weinland'
  erlenbach: 'Erstelle Inhalte für die Gemeinde Erlenbach am Zürichsee'
```

### **AI Alt-Text Configuration**
```yaml
# config/ai/ai_image_alt_text.settings.yml
provider: 'anthropic'
enabled: true
auto_generate: true
languages:
  - 'de'
  - 'fr'  
  - 'it'
context_prompts:
  municipality: 'Dies ist ein Bild aus einer Schweizer Gemeinde-Website'
  accessibility: 'Beschreibe das Bild für sehbehinderte Nutzer'
```

## 🇨🇭 Swiss Compliance Configuration

### **DSGVO/CH-DSG Configuration**
```yaml
# config/compliance/privacy.settings.yml
data_protection:
  enabled: true
  law: 'CH-DSG'
  contact:
    name: 'Gemeinde Datenschutzbeauftragte'
    email: 'datenschutz@gemeinde.ch'
  retention_periods:
    form_submissions: '2_years'
    user_data: '5_years'
    logs: '1_year'
  cookies:
    essential_only: false
    analytics_consent_required: true
    marketing_consent_required: true
```

### **eCH-0059 Accessibility Configuration**
```yaml
# config/compliance/accessibility.settings.yml
accessibility:
  standard: 'eCH-0059'
  wcag_level: 'AA'
  language_default: 'de'
  languages_supported:
    - 'de'
    - 'fr'
    - 'it'
  automated_testing:
    enabled: true
    tools:
      - 'editoria11y'
      - 'lighthouse'
  manual_testing:
    schedule: 'quarterly'
    responsible: 'accessibility_officer'
```

## 📊 Performance Configuration

### **Caching Configuration**
```yaml
# config/performance/cache.settings.yml
cache:
  page:
    max_age: 3600
    contexts:
      - 'url'
      - 'url.query_args'
      - 'municipality'
  dynamic_page_cache:
    enabled: true
    contexts:
      - 'municipality'
      - 'user.roles'
  ai_content:
    max_age: 86400  # 24 hours
    tags:
      - 'ai_generated_content'
      - 'municipality'
```

### **Image Optimization Configuration**
```yaml
# config/performance/image.settings.yml
image_styles:
  municipality_hero:
    effects:
      - id: 'image_scale_and_crop'
        data:
          width: 1920
          height: 800
      - id: 'webp_convert'
        data:
          quality: 85
  municipality_card:
    effects:
      - id: 'image_scale_and_crop'
        data:
          width: 600
          height: 400
      - id: 'webp_convert'
        data:
          quality: 80
```

## 🧪 Configuration Testing

### **Configuration Validation Script**
```bash
#!/bin/bash
# scripts/validate-config.sh

echo "🧪 Validating GPZH Configuration..."

# Test configuration export/import
echo "Testing configuration export..."
ddev drush cex --yes

echo "Testing configuration import preview..."
ddev drush cim --preview=diff

# Validate across all municipalities
municipalities=("thalwil" "thalheim" "erlenbach")

for municipality in "${municipalities[@]}"; do
    echo "🏛️ Validating $municipality configuration..."
    ddev drush --uri=$municipality.gpzh.local cr
    ddev drush --uri=$municipality.gpzh.local config:status
done

echo "✅ Configuration validation complete!"
```

### **Multi-Site Configuration Test**
```php
<?php
// tests/ConfigurationTest.php

/**
 * Test configuration consistency across municipalities.
 */
class GpzhConfigurationTest extends DrupalTestBase {
  
  /**
   * Test municipality-specific configurations.
   */
  public function testMunicipalityConfigurations(): void {
    $municipalities = ['thalwil', 'thalheim', 'erlenbach'];
    
    foreach ($municipalities as $municipality) {
      $config = $this->config("municipality.{$municipality}.settings");
      $this->assertNotEmpty($config->get('name'));
      $this->assertNotEmpty($config->get('slogan'));
      $this->assertStringContainsString($municipality, $config->get('logo_path'));
    }
  }
  
  /**
   * Test AI configuration consistency.
   */
  public function testAiConfiguration(): void {
    $ai_config = $this->config('ai_provider_anthropic.settings');
    $this->assertTrue($ai_config->get('enabled'));
    $this->assertNotEmpty($ai_config->get('api_key_reference'));
  }
}
```

## 🔄 PR Process for Configuration Changes

### **Configuration PR Template**
```markdown
## Jira Ticket: GPZH-XXX - Configuration Changes
🔗 [Jira Link](https://adesso.atlassian.net/browse/GPZH-XXX)

## Configuration Changes
- **Type**: [Content Type/AI/Performance/Compliance]
- **Scope**: [Single Municipality/All Sites/AI Features]
- **Files Modified**: 
  - `config/sync/[files]`
  - `config/municipality/[files]`

## Impact Analysis
- [ ] Tested on Thalwil
- [ ] Tested on Thalheim  
- [ ] Tested on Erlenbach
- [ ] AI functionality verified
- [ ] Performance impact assessed
- [ ] Compliance maintained

## Configuration Export
```bash
# Commands used to export configuration
ddev drush cex
ddev drush config:status
```

## Deployment Steps
1. Import configuration: `ddev drush cim`
2. Clear cache: `ddev drush cr`
3. Validate across municipalities
4. Run performance tests

## Review Request
@claude bitte prüfe die Konfigurations-Änderungen für GPZH-XXX und validiere Multi-Site Kompatibilität.
```

## 📚 Configuration Management Resources

### **Documentation References**
- [Drupal Configuration Management](https://www.drupal.org/docs/configuration-management)
- [Multi-Site Configuration Best Practices](https://www.drupal.org/docs/multisite)
- [AI Module Configuration](/web/modules/contrib/ai/README.md)
- [Swiss Compliance Configuration Guidelines](/config/compliance/README.md)

### **Configuration Tools**
- **Drush**: Command-line configuration management
- **Configuration Inspector**: GUI for configuration management
- **Features**: Packaging configurations for deployment
- **Config Sync**: Multi-site configuration synchronization

### **Monitoring and Validation**
- **Configuration Status**: Real-time configuration drift detection
- **Performance Monitoring**: Configuration impact on site performance
- **Compliance Audit**: Regular validation of compliance configurations
- **Multi-Site Consistency**: Automated checks across municipalities

---

*Last updated: Optimized for GPZH multi-site system with Jira integration and Swiss compliance requirements.*