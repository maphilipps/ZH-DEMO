# GPZH Custom Modules Development Guidelines

## 🧩 Custom Module Development for GPZH Multi-Site System

This guide covers development guidelines for custom Drupal modules in the GPZH (Gemeindeportale Zürich) project, focusing on multi-site municipality portals with AI integration and Swiss compliance standards.

## 📁 Module Structure

### **Current Custom Modules**
- **zh_demo**: Core GPZH functionality and multi-site configuration
- **gpzh_content**: Municipality-specific content types and fields
- **gpzh_ai**: AI integration for content generation and alt-text
- **gpzh_compliance**: Swiss compliance features (DSGVO, eCH-0059)

### **Module Organization**
```
web/modules/custom/
├── zh_demo/                 # Core GPZH module
├── gpzh_content/           # Content types & fields
├── gpzh_ai/               # AI integration features  
├── gpzh_compliance/       # Swiss compliance tools
└── [future_modules]/      # Feature-specific modules
```

## 🎯 Jira Integration for Module Development

### **Module Development Workflow**
```
Jira Ticket → Feature Branch → Module Development → Testing → PR with @claude Review
```

### **Jira Task Types for Modules**
- **GPZH-XXX**: New module development
- **GPZH-XXX**: Module feature enhancement
- **GPZH-XXX**: Module bug fixes
- **GPZH-XXX**: API integration improvements

### **Branch Naming Convention**
```bash
feature/GPZH-123-zh-demo-municipality-switcher
feature/GPZH-456-ai-content-suggestions
fix/GPZH-789-compliance-form-validation
```

## 🏗️ Development Standards

### **Module Requirements**
1. **Multi-Site Compatibility**: All modules must work across Thalwil, Thalheim, Erlenbach
2. **AI Integration**: Support for GPT-4o, Claude, and Groq providers
3. **Swiss Compliance**: DSGVO, CH-DSG, and eCH-0059 compliance
4. **Performance**: <2s page load times across all municipalities
5. **Accessibility**: WCAG 2.1 AA compliance

### **Code Standards**
```php
<?php

/**
 * @file
 * GPZH [Module Name] - [Brief Description]
 * 
 * Jira Ticket: GPZH-XXX
 * Multi-site compatible for Thalwil, Thalheim, Erlenbach
 */

namespace Drupal\gpzh_module_name;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\multisite\MultisiteManagerInterface;
use Drupal\ai\AiProviderInterface;

/**
 * GPZH-specific service implementation.
 */
class GpzhModuleService implements GpzhModuleServiceInterface {
  
  /**
   * Multi-site configuration support.
   */
  public function getMunicipalityConfig(string $municipality): array {
    // Implementation for Thalwil, Thalheim, Erlenbach specific configs
  }
  
  /**
   * AI integration support.
   */
  public function generateAiContent(string $prompt, string $municipality): string {
    // AI content generation with municipality context
  }
}
```

### **Configuration Management**
```yaml
# modules/custom/gpzh_example/config/install/gpzh_example.settings.yml
municipalities:
  thalwil:
    name: 'Gemeinde Thalwil'
    theme: 'modern_blue'
    ai_personality: 'professional'
  thalheim:
    name: 'Gemeinde Thalheim'
    theme: 'wine_green'
    ai_personality: 'friendly'
  erlenbach:
    name: 'Gemeinde Erlenbach'
    theme: 'lake_turquoise'
    ai_personality: 'informative'
```

## 🤖 AI Integration in Custom Modules

### **AI Provider Integration**
```php
/**
 * AI integration service for GPZH modules.
 */
class GpzhAiService {
  
  /**
   * Generate municipality-specific content.
   */
  public function generateMunicipalityContent(string $content_type, string $municipality): string {
    $prompt = $this->buildMunicipalityPrompt($content_type, $municipality);
    return $this->aiProvider->generate($prompt);
  }
  
  /**
   * Generate Swiss German administrative text.
   */
  public function generateSwissAdminText(string $topic, array $context = []): string {
    $prompt = "Erstelle einen offiziellen Text für eine Schweizer Gemeinde zum Thema: {$topic}";
    return $this->aiProvider->generate($prompt, $context);
  }
}
```

### **AI Features to Implement**
- **Content Suggestions**: AI-powered content recommendations
- **Auto Alt-Text**: Automatic image descriptions in German
- **Form Auto-Complete**: Smart form field suggestions
- **Translation Assistance**: DE→FR→IT content translation
- **Search Enhancement**: Natural language search queries

## 🇨🇭 Swiss Compliance Integration

### **DSGVO/CH-DSG Implementation**
```php
/**
 * Swiss data protection compliance service.
 */
class GpzhComplianceService {
  
  /**
   * Validate data processing consent.
   */
  public function validateConsent(array $personal_data): bool {
    // Implement CH-DSG compliance checks
  }
  
  /**
   * Generate privacy policy content.
   */
  public function generatePrivacyPolicy(string $municipality): string {
    // Municipality-specific privacy policy
  }
}
```

### **Accessibility Implementation**
```php
/**
 * eCH-0059 accessibility compliance.
 */
class GpzhAccessibilityService {
  
  /**
   * Validate WCAG 2.1 AA compliance.
   */
  public function validateAccessibility(string $content): array {
    // Return accessibility violations and suggestions
  }
  
  /**
   * Generate accessible alt-text.
   */
  public function generateAltText(string $image_path, string $context = ''): string {
    // AI-powered alt-text generation
  }
}
```

## 🧪 Testing Guidelines

### **Multi-Site Testing**
```php
/**
 * Test module across all municipalities.
 */
class GpzhModuleTest extends DrupalTestBase {
  
  /**
   * Test functionality across Thalwil, Thalheim, Erlenbach.
   */
  public function testMultiSiteFunctionality(): void {
    $municipalities = ['thalwil', 'thalheim', 'erlenbach'];
    
    foreach ($municipalities as $municipality) {
      $this->switchToMunicipality($municipality);
      $this->assertModuleFunctionality();
    }
  }
  
  /**
   * Test AI integration features.
   */
  public function testAiIntegration(): void {
    $content = $this->gpzhAiService->generateContent('news', 'thalwil');
    $this->assertNotEmpty($content);
    $this->assertStringContainsString('Thalwil', $content);
  }
}
```

## 📦 Module Deployment

### **Configuration Export**
```bash
# Export module configuration
ddev drush cex

# Test configuration import
ddev drush cim --preview=diff

# Validate across municipalities
@gemeinde-switch thalwil && ddev drush cr
@gemeinde-switch thalheim && ddev drush cr  
@gemeinde-switch erlenbach && ddev drush cr
```

### **Performance Validation**
```bash
# Run performance tests
@gpzh-qa-full --performance-audit

# Test AI features
@gpzh-ai-test --municipality=all

# Accessibility compliance
ddev drush accessibility-audit
```

## 🔄 PR Process for Module Changes

### **PR Template for Custom Modules**
```markdown
## Jira Ticket: GPZH-XXX - [Module Name] Enhancement
🔗 [Jira Link](https://adesso.atlassian.net/browse/GPZH-XXX)

## Module Changes
- **Module**: `web/modules/custom/[module_name]`
- **Feature**: [Description of new functionality]
- **AI Integration**: [AI features added/modified]
- **Multi-Site Impact**: [Changes affecting municipalities]

## Acceptance Criteria
- [ ] Module works in Thalwil
- [ ] Module works in Thalheim  
- [ ] Module works in Erlenbach
- [ ] AI features functional
- [ ] Swiss compliance maintained
- [ ] Performance <2s load time

## Testing Evidence
- [ ] Unit tests passing
- [ ] Integration tests across all municipalities
- [ ] AI functionality validated
- [ ] Accessibility compliance verified

## Review Request
@claude bitte prüfe die Module-Änderungen für GPZH-XXX und validiere Multi-Site Kompatibilität und Swiss Compliance.
```

## 📚 Resources

### **Development References**
- [Drupal 11 API Documentation](https://api.drupal.org/api/drupal/11)
- [Multi-Site Development Best Practices](/web/sites/README.md)
- [AI Integration Documentation](/web/modules/contrib/ai/README.md)
- [Swiss Compliance Guidelines](/config/compliance/README.md)

### **Testing Tools**
- **PHPUnit**: Unit and integration testing
- **Nightwatch**: End-to-end testing across municipalities
- **Lighthouse**: Performance and accessibility auditing
- **AI Testing Suite**: Custom AI functionality validation

---

*Last updated: Based on GPZH project requirements for multi-site municipality portals with AI integration and Swiss compliance.*