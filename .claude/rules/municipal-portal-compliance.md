---
description: Comprehensive compliance patterns for Swiss municipal portals with GPZH standards, accessibility requirements, and multilingual content management
author: Municipal Compliance Team
version: 1.0
globs: ["web/modules/custom/**/*", "config/sync/**/*", "web/themes/custom/**/*"]
tags: ["municipal-portal", "gpzh-compliance", "swiss-standards", "accessibility", "multilingual", "government-portal"]
---

# Municipal Portal Compliance

**Objective:** Establish comprehensive compliance patterns for Swiss municipal portals, specifically targeting GPZH (Geschäftsstelle für Digitales Zürich) standards, Swiss accessibility requirements, and multilingual government content management.

## Legal and Regulatory Framework

### Swiss Federal Accessibility Requirements

**MUST** comply with Swiss Federal Accessibility Standards (BehiG):
- **WCAG 2.1 Level AA** compliance for all public interfaces
- **PDF/UA compliance** for all downloadable documents
- **Sign language accessibility** for video content
- **Easy language (Leichte Sprache)** versions for complex content

### Data Protection (DSG/FADP)

**MUST** implement Swiss data protection requirements:
- **Explicit consent management** for all data collection
- **Privacy by design** in all system architectures
- **Right to be forgotten** implementation
- **Data minimization** principles in all forms and processes
- **Cross-border data transfer** compliance

### Government Standards Compliance

**MUST** follow Swiss e-Government standards:
- **eCH-0070** for accessibility in e-Government
- **eCH-0059** for multilingual content management
- **eCH-0147** for document standards
- **CH-LOGIN** integration requirements for citizen authentication

## Multilingual Content Architecture

### Language Configuration
```yaml
# config/sync/language.negotiation.yml - Required for Swiss portals
url:
  source: path_prefix
  prefixes:
    de: 'de'        # German (primary)
    fr: 'fr'        # French
    it: 'it'        # Italian  
    rm: 'rm'        # Romansh
    en: 'en'        # English (for international visitors)
  domains: {}

session:
  parameter: language

selected_langcode: de  # German as default for GPZH

# Content translation must be enabled for all entity types
content_translation_status:
  node: true
  taxonomy_term: true
  menu_link_content: true
  block_content: true
```

### Content Translation Requirements
```php
// web/modules/custom/gpzh_portal/src/Service/TranslationManager.php
<?php

declare(strict_types=1);

namespace Drupal\gpzh_portal\Service;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Language\LanguageManagerInterface;

final readonly class TranslationManager {

  public function __construct(
    private LanguageManagerInterface $languageManager,
  ) {}

  /**
   * Validates all required translations exist for government content.
   */
  public function validateGovernmentContentTranslations(ContentEntityInterface $entity): array {
    $missing_translations = [];
    $required_languages = $this->getRequiredLanguages($entity);

    foreach ($required_languages as $langcode) {
      if (!$entity->hasTranslation($langcode)) {
        $missing_translations[] = $langcode;
      }
    }

    return $missing_translations;
  }

  /**
   * Get required languages based on content type and importance.
   */
  private function getRequiredLanguages(ContentEntityInterface $entity): array {
    $bundle = $entity->bundle();
    
    // Critical government content requires all official languages
    $critical_bundles = [
      'legal_notice',
      'official_announcement', 
      'public_service_info',
      'emergency_notice'
    ];

    if (in_array($bundle, $critical_bundles, true)) {
      return ['de', 'fr', 'it', 'rm']; // All Swiss official languages
    }

    // General content requires German and French minimum
    return ['de', 'fr'];
  }
}
```

## Accessibility Implementation Patterns

### WCAG 2.1 AA Compliance
```php
// web/modules/custom/gpzh_accessibility/src/Plugin/Field/FieldWidget/AccessibleFileWidget.php
<?php

declare(strict_types=1);

namespace Drupal\gpzh_accessibility\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\file\Plugin\Field\FieldWidget\FileWidget;

/**
 * Accessible file upload widget with mandatory alt text and descriptions.
 *
 * @FieldWidget(
 *   id = "gpzh_accessible_file",
 *   label = @Translation("GPZH Accessible File"),
 *   field_types = {
 *     "file",
 *     "image"
 *   }
 * )
 */
class AccessibleFileWidget extends FileWidget {

  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $element = parent::formElement($items, $delta, $element, $form, $form_state);

    // Mandatory accessibility fields for government content
    $element['alt_text'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Alternative Text (required for accessibility)'),
      '#required' => TRUE,
      '#maxlength' => 255,
      '#description' => $this->t('Describe the content and function of this file. This is read by screen readers.'),
    ];

    $element['long_description'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Long Description'),
      '#description' => $this->t('Provide a detailed description if the file contains complex information.'),
      '#states' => [
        'visible' => [
          ':input[name*="[alt_text]"]' => ['filled' => TRUE],
        ],
      ],
    ];

    $element['document_language'] = [
      '#type' => 'select',
      '#title' => $this->t('Document Language'),
      '#required' => TRUE,
      '#options' => [
        'de' => $this->t('German'),
        'fr' => $this->t('French'), 
        'it' => $this->t('Italian'),
        'rm' => $this->t('Romansh'),
        'en' => $this->t('English'),
      ],
      '#default_value' => 'de',
    ];

    return $element;
  }
}
```

### Keyboard Navigation Requirements
```javascript
// web/themes/custom/gpzh_theme/src/js/accessibility.js

class GPZHAccessibilityManager {
  constructor() {
    this.initKeyboardNavigation();
    this.initFocusManagement();
    this.initSkipLinks();
  }

  initKeyboardNavigation() {
    // Ensure all interactive elements are keyboard accessible
    document.addEventListener('keydown', (event) => {
      // Handle Escape key for modal dialogs
      if (event.key === 'Escape') {
        this.closeModals();
      }

      // Handle Enter/Space for custom interactive elements
      if (event.key === 'Enter' || event.key === ' ') {
        const target = event.target;
        if (target.hasAttribute('role') && 
            ['button', 'tab', 'menuitem'].includes(target.getAttribute('role'))) {
          target.click();
          event.preventDefault();
        }
      }
    });
  }

  initFocusManagement() {
    // Focus management for dynamic content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          const newContent = Array.from(mutation.addedNodes)
            .find(node => node.nodeType === 1 && node.hasAttribute('data-focus-on-load'));
          
          if (newContent) {
            const focusTarget = newContent.querySelector('[tabindex="-1"], input, button') || newContent;
            focusTarget.focus();
          }
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  initSkipLinks() {
    // Enhanced skip links for government portals
    const skipLinks = [
      { href: '#main-content', text: 'Zum Hauptinhalt springen' },
      { href: '#main-navigation', text: 'Zur Hauptnavigation springen' },
      { href: '#search', text: 'Zur Suche springen' },
      { href: '#footer', text: 'Zum Footer springen' }
    ];

    const skipContainer = document.createElement('div');
    skipContainer.className = 'skip-links sr-only-focusable';
    skipContainer.innerHTML = skipLinks
      .map(link => `<a href="${link.href}" class="skip-link">${link.text}</a>`)
      .join('');

    document.body.insertBefore(skipContainer, document.body.firstChild);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new GPZHAccessibilityManager();
});
```

## Government Content Types

### Official Announcement Content Type
```yaml
# config/sync/node.type.official_announcement.yml
type: official_announcement
name: 'Amtliche Bekanntmachung / Annonce officielle'
description: 'Official government announcements requiring multilingual publication and accessibility compliance'
help: 'Use this content type for official government communications that must be published in multiple languages'
new_revision: true
preview_mode: 1
display_submitted: false

# Required fields configuration
field_definitions:
  field_announcement_type:
    type: list_string
    required: true
    options:
      - 'public_notice'
      - 'legal_announcement'
      - 'emergency_notice'
      - 'service_update'

  field_validity_period:
    type: daterange
    required: true
    description: 'Period during which this announcement is valid'

  field_authority:
    type: entity_reference
    target_type: taxonomy_term
    target_bundle: government_authorities
    required: true

  field_legal_basis:
    type: text_long
    required: false
    description: 'Legal basis for this announcement'

  field_contact_info:
    type: entity_reference
    target_type: node
    target_bundle: contact_information
    required: true
```

### Public Service Information
```php
// web/modules/custom/gpzh_services/src/Entity/PublicService.php
<?php

declare(strict_types=1);

namespace Drupal\gpzh_services\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;

/**
 * Defines the Public Service entity for GPZH portal.
 *
 * @ContentEntityType(
 *   id = "public_service",
 *   label = @Translation("Public Service"),
 *   base_table = "public_service",
 *   translatable = TRUE,
 *   admin_permission = "administer public services",
 *   entity_keys = {
 *     "id" = "id",
 *     "uuid" = "uuid",
 *     "label" = "title",
 *     "langcode" = "langcode",
 *   },
 * )
 */
final class PublicService extends ContentEntityBase {

  public static function baseFieldDefinitions(EntityTypeInterface $entity_type): array {
    $fields = parent::baseFieldDefinitions($entity_type);

    $fields['title'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Service Title'))
      ->setRequired(TRUE)
      ->setTranslatable(TRUE)
      ->setSettings(['max_length' => 255])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -10,
      ]);

    $fields['service_category'] = BaseFieldDefinition::create('entity_reference')
      ->setLabel(t('Service Category'))
      ->setRequired(TRUE)
      ->setSetting('target_type', 'taxonomy_term')
      ->setSetting('handler_settings', ['target_bundles' => ['service_categories']])
      ->setTranslatable(FALSE);

    $fields['digital_availability'] = BaseFieldDefinition::create('boolean')
      ->setLabel(t('Available Online'))
      ->setDefaultValue(FALSE)
      ->setDisplayOptions('form', [
        'type' => 'boolean_checkbox',
        'weight' => 0,
      ]);

    $fields['accessibility_compliance'] = BaseFieldDefinition::create('list_string')
      ->setLabel(t('Accessibility Compliance Level'))
      ->setRequired(TRUE)
      ->setSettings([
        'allowed_values' => [
          'aa' => 'WCAG 2.1 AA Compliant',
          'partial' => 'Partially Compliant',
          'non_compliant' => 'Not Compliant',
        ],
      ])
      ->setDefaultValue('aa');

    return $fields;
  }
}
```

## Privacy and Data Protection

### Cookie Consent Management
```php
// web/modules/custom/gpzh_privacy/src/Service/ConsentManager.php
<?php

declare(strict_types=1);

namespace Drupal\gpzh_privacy\Service;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Manages cookie consent according to Swiss data protection law.
 */
final readonly class ConsentManager {

  public function __construct(
    private ConfigFactoryInterface $configFactory,
    private AccountProxyInterface $currentUser,
    private RequestStack $requestStack,
  ) {}

  /**
   * Check if user has provided consent for specific cookie categories.
   */
  public function hasConsent(string $category): bool {
    $request = $this->requestStack->getCurrentRequest();
    $consent_cookie = $request->cookies->get('gpzh_consent');

    if (!$consent_cookie) {
      return false;
    }

    $consent_data = json_decode(base64_decode($consent_cookie), true);
    
    // Essential cookies don't require consent under Swiss law
    if ($category === 'essential') {
      return true;
    }

    return $consent_data[$category] ?? false;
  }

  /**
   * Get required consent categories for Swiss municipal portals.
   */
  public function getConsentCategories(): array {
    return [
      'essential' => [
        'label' => 'Technisch notwendige Cookies',
        'description' => 'Für die Grundfunktionen der Website erforderlich',
        'required' => true,
        'legal_basis' => 'DSG Art. 6 (berechtigtes Interesse)',
      ],
      'analytics' => [
        'label' => 'Analyse-Cookies',
        'description' => 'Helfen uns, die Website zu verbessern',
        'required' => false,
        'legal_basis' => 'DSG Art. 6 (Einwilligung)',
      ],
      'marketing' => [
        'label' => 'Marketing-Cookies', 
        'description' => 'Für personalisierte Inhalte und Werbung',
        'required' => false,
        'legal_basis' => 'DSG Art. 6 (Einwilligung)',
      ],
    ];
  }

  /**
   * Validate consent cookie structure for legal compliance.
   */
  public function validateConsentCookie(string $consent_cookie): bool {
    $data = json_decode(base64_decode($consent_cookie), true);
    
    if (!$data) {
      return false;
    }

    $required_fields = ['timestamp', 'version', 'categories', 'ip_hash'];
    foreach ($required_fields as $field) {
      if (!isset($data[$field])) {
        return false;
      }
    }

    // Consent must be renewed every 12 months under Swiss law
    $consent_age = time() - $data['timestamp'];
    if ($consent_age > 31536000) { // 365 days
      return false;
    }

    return true;
  }
}
```

## Government Portal Theming

### Swiss Federal Corporate Design
```scss
// web/themes/custom/gpzh_theme/src/scss/government-standards.scss

// Swiss Federal CI Colors (required for government portals)
:root {
  --swiss-red: #dc143c;
  --swiss-white: #ffffff;
  --swiss-black: #000000;
  --gpzh-blue: #0052cc;
  --gpzh-blue-light: #4285f4;
  --accessible-contrast-ratio: 4.5; // WCAG AA minimum
}

// Government portal header requirements
.government-header {
  background-color: var(--swiss-red);
  color: var(--swiss-white);
  min-height: 60px;
  display: flex;
  align-items: center;
  
  .government-logo {
    height: 40px;
    width: auto;
    margin-right: 2rem;
  }
  
  .portal-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--swiss-white);
    text-decoration: none;
    
    &:hover, &:focus {
      text-decoration: underline;
      outline: 2px solid var(--swiss-white);
      outline-offset: 2px;
    }
  }
}

// Accessibility-first navigation
.main-navigation {
  background-color: var(--gpzh-blue);
  
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
  }
  
  li {
    position: relative;
  }
  
  a {
    display: block;
    padding: 1rem 1.5rem;
    color: var(--swiss-white);
    text-decoration: none;
    transition: background-color 0.2s ease;
    
    &:hover, &:focus {
      background-color: rgba(255, 255, 255, 0.1);
      outline: 2px solid var(--swiss-white);
      outline-offset: -2px;
    }
    
    // High contrast mode support
    @media (prefers-contrast: high) {
      border: 1px solid var(--swiss-white);
      margin: 1px;
    }
  }
  
  // Mobile-first responsive design
  @media (max-width: 768px) {
    ul {
      flex-direction: column;
    }
    
    a {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
}

// Government content styling with accessibility focus
.government-content {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: #333333;
  
  // Ensure sufficient color contrast
  h1, h2, h3, h4, h5, h6 {
    color: var(--gpzh-blue);
    margin-top: 2rem;
    margin-bottom: 1rem;
    
    // Focus indicators for accessibility
    &:target {
      outline: 3px solid var(--gpzh-blue-light);
      outline-offset: 2px;
      background-color: rgba(66, 133, 244, 0.1);
    }
  }
  
  // Government document styling
  .official-document {
    border-left: 4px solid var(--swiss-red);
    padding-left: 1.5rem;
    margin: 2rem 0;
    background-color: #f9f9f9;
    
    .document-meta {
      font-size: 0.875rem;
      color: #666666;
      margin-bottom: 1rem;
      
      .document-date,
      .document-authority {
        display: block;
        margin-bottom: 0.5rem;
      }
    }
  }
}
```

## Agent Integration Points

### When to Use Specialized Government Agents

**MUST** use `municipality-portal-specialist` for:
- Government content type creation and configuration
- Swiss accessibility compliance validation
- Multilingual content workflow setup
- Official document template creation

**MUST** use `swiss-compliance-specialist` for:
- Data protection implementation (DSG/FADP)
- Cookie consent management configuration
- Swiss federal design standard implementation
- Legal compliance validation

**SHOULD** combine with other agents:
- `drupal-accessibility-auditor` for WCAG 2.1 AA validation
- `drupal-multilingual-expert` for complex translation workflows
- `drupal-security-guardian` for government-grade security measures

## Compliance Validation Checklist

### Pre-deployment Government Portal Validation
- [ ] All official languages configured (DE, FR, IT, RM)
- [ ] WCAG 2.1 AA compliance verified via automated testing
- [ ] Cookie consent management implemented per Swiss DSG
- [ ] Government content types include required metadata
- [ ] Official document templates follow Swiss standards
- [ ] Accessibility statement published and current
- [ ] Privacy policy complies with Swiss federal requirements
- [ ] Error pages provide multilingual alternatives
- [ ] Skip links implemented for keyboard navigation
- [ ] Color contrast ratios exceed 4.5:1 minimum
- [ ] Font sizes support browser zoom to 200% minimum
- [ ] Form validation includes clear error messaging
- [ ] PDF documents are PDF/UA compliant

This rule ensures Swiss municipal portals meet all legal, accessibility, and usability requirements while maintaining compound engineering principles for continuous improvement.