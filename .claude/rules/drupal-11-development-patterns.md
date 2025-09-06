---
description: Comprehensive development patterns and best practices for Drupal 11 with DDEV, modern PHP 8.3, and component-driven architecture
author: Drupal Development Team
version: 1.0
globs: ["web/modules/custom/**/*", "web/themes/custom/**/*", "web/profiles/**/*", "*.info.yml", "composer.json", ".ddev/**/*"]
tags: ["drupal-11", "php-8.3", "ddev", "development-patterns", "modern-architecture", "component-driven"]
---

# Drupal 11 Development Patterns

**Objective:** Establish comprehensive development patterns for modern Drupal 11 applications using PHP 8.3, DDEV containerization, and component-driven architecture principles.

## Core Technology Stack

### Required Drupal 11 Features
- **PHP 8.3+** with modern syntax (readonly classes, enums, typed properties)
- **Drupal 11 Core APIs** including new Event system and Dependency Injection
- **Modern Symfony Components** (6.4 LTS) for service architecture
- **Component-driven theming** with Single Directory Components (SDC)
- **Twig 3.x** templates with strict mode enabled
- **Configuration Management 2.0** for environment parity

### Development Environment Standards
- **DDEV** as the primary local development container solution
- **Composer 2.x** for dependency management with optimized autoloader
- **Node.js 20 LTS** for modern frontend tooling
- **Vite** for development server and asset building
- **Storybook 7.x** for component documentation and testing

## Module Development Patterns

### Modern Module Architecture
```php
// web/modules/custom/zh_demo/src/Controller/ModernController.php
<?php

declare(strict_types=1);

namespace Drupal\zh_demo\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

final readonly class ModernController extends ControllerBase implements ContainerInjectionInterface {

  public function __construct(
    private ExampleServiceInterface $exampleService,
  ) {}

  public static function create(ContainerInterface $container): self {
    return new self(
      $container->get('zh_demo.example_service'),
    );
  }

  public function modernAction(): JsonResponse {
    return new JsonResponse([
      'status' => 'success',
      'data' => $this->exampleService->processData(),
    ]);
  }
}
```

### Service Definition Best Practices
```yaml
# web/modules/custom/zh_demo/zh_demo.services.yml
services:
  zh_demo.example_service:
    class: Drupal\zh_demo\Service\ExampleService
    arguments: ['@entity_type.manager', '@logger.factory']
    tags:
      - { name: 'backend_overridable' }

  zh_demo.event_subscriber:
    class: Drupal\zh_demo\EventSubscriber\ZhDemoEventSubscriber
    arguments: ['@zh_demo.example_service']
    tags:
      - { name: 'event_subscriber' }
```

### Configuration Schema Requirements
```yaml
# web/modules/custom/zh_demo/config/schema/zh_demo.schema.yml
zh_demo.settings:
  type: config_object
  label: 'ZH Demo Settings'
  mapping:
    api_endpoint:
      type: uri
      label: 'API Endpoint'
    cache_lifetime:
      type: integer
      label: 'Cache Lifetime (seconds)'
    feature_flags:
      type: sequence
      label: 'Feature Flags'
      sequence:
        type: string
```

## Theme Development Patterns

### Single Directory Components (SDC)
```yaml
# web/themes/custom/adesso_cms_theme/components/card/card.component.yml
$schema: https://git.drupalcode.org/project/drupal/-/raw/10.1.x/core/modules/sdc/src/metadata.schema.json
name: 'Card Component'
description: 'Reusable card component with modern styling'
props:
  type: object
  properties:
    title:
      type: string
      title: 'Card Title'
    content:
      type: string
      title: 'Card Content'
    variant:
      type: string
      enum: ['primary', 'secondary', 'outline']
      default: 'primary'
  required: ['title', 'content']
libraryDependencies:
  - 'adesso_cms_theme/card'
```

### Modern Twig Templates
```twig
{# web/themes/custom/adesso_cms_theme/components/card/card.twig #}
{% set card_classes = [
  'card',
  'card--' ~ (variant ?? 'primary'),
  'shadow-lg',
  'rounded-lg',
  'overflow-hidden'
] %}

<article{{ attributes.addClass(card_classes) }}>
  <header class="card__header p-4 border-b">
    <h3 class="card__title text-lg font-semibold">{{ title }}</h3>
  </header>
  <div class="card__content p-4">
    {{ content|raw }}
  </div>
</article>
```

### Tailwind CSS Integration
```javascript
// web/themes/custom/adesso_cms_theme/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './templates/**/*.twig',
    './components/**/*.twig',
    './src/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
```

## Configuration Management Patterns

### Environment-Specific Configuration
```php
// web/sites/default/settings.ddev.php
<?php

declare(strict_types=1);

// Environment indicator
$config['environment_indicator.indicator']['name'] = 'DDEV Local';
$config['environment_indicator.indicator']['bg_color'] = '#006600';
$config['environment_indicator.indicator']['fg_color'] = '#ffffff';

// Development-specific settings
$config['system.logging']['error_level'] = 'verbose';
$config['system.performance']['cache']['page']['max_age'] = 0;
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;

// Vite development server configuration
$settings['vite']['devServerUrl'] = 'https://zh-demo.ddev.site:5173';
$settings['vite']['devMode'] = TRUE;
```

### Configuration Split Patterns
```yaml
# config/sync/config_split.config_split.local.yml
uuid: 12345678-1234-1234-1234-123456789012
langcode: en
status: true
dependencies: {  }
id: local
label: 'Local Development'
folder: '../config/local'
module:
  devel: 0
  kint: 0
  webprofiler: 0
theme: {  }
blacklist: {  }
graylist: {  }
graylist_dependents: true
graylist_skip_equal: true
weight: 0
```

## Testing Patterns

### PHPUnit Integration Tests
```php
// web/modules/custom/zh_demo/tests/src/Kernel/ZhDemoServiceTest.php
<?php

declare(strict_types=1);

namespace Drupal\Tests\zh_demo\Kernel;

use Drupal\KernelTests\KernelTestBase;
use Drupal\zh_demo\Service\ExampleService;

/**
 * Tests for ZH Demo service functionality.
 *
 * @group zh_demo
 * @coversDefaultClass \Drupal\zh_demo\Service\ExampleService
 */
final class ZhDemoServiceTest extends KernelTestBase {

  /**
   * {@inheritdoc}
   */
  protected static $modules = ['zh_demo', 'system'];

  private ExampleService $exampleService;

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();
    $this->installConfig(['system']);
    $this->exampleService = $this->container->get('zh_demo.example_service');
  }

  /**
   * @covers ::processData
   */
  public function testProcessDataReturnsExpectedResult(): void {
    $result = $this->exampleService->processData();
    $this->assertIsArray($result);
    $this->assertArrayHasKey('processed', $result);
  }
}
```

### Functional JavaScript Tests
```php
// web/modules/custom/zh_demo/tests/src/FunctionalJavascript/ComponentInteractionTest.php
<?php

declare(strict_types=1);

namespace Drupal\Tests\zh_demo\FunctionalJavascript;

use Drupal\FunctionalJavascriptTests\WebDriverTestBase;

/**
 * Tests JavaScript interactions for ZH Demo components.
 *
 * @group zh_demo
 */
final class ComponentInteractionTest extends WebDriverTestBase {

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'adesso_cms_theme';

  /**
   * {@inheritdoc}
   */
  protected static $modules = ['zh_demo', 'node'];

  /**
   * Tests interactive component behavior.
   */
  public function testComponentInteraction(): void {
    $this->drupalGet('/zh-demo/interactive');
    
    $page = $this->getSession()->getPage();
    $button = $page->find('css', '[data-testid="interactive-button"]');
    
    $this->assertNotNull($button);
    $button->click();
    
    $this->waitForElement('css', '[data-testid="result"]');
    $result = $page->find('css', '[data-testid="result"]');
    $this->assertEquals('Success!', $result->getText());
  }
}
```

## Security and Performance Patterns

### Security Best Practices
```php
// web/modules/custom/zh_demo/src/Form/SecureForm.php
<?php

declare(strict_types=1);

namespace Drupal\zh_demo\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Component\Utility\Html;
use Drupal\Component\Utility\EmailValidator;

final class SecureForm extends FormBase {

  public function buildForm(array $form, FormStateInterface $form_state): array {
    $form['email'] = [
      '#type' => 'email',
      '#title' => $this->t('Email Address'),
      '#required' => TRUE,
      '#maxlength' => 254,
    ];

    $form['message'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Message'),
      '#required' => TRUE,
      '#maxlength' => 1000,
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Send Message'),
    ];

    return $form;
  }

  public function validateForm(array &$form, FormStateInterface $form_state): void {
    $email = $form_state->getValue('email');
    if (!EmailValidator::isValid($email)) {
      $form_state->setErrorByName('email', $this->t('Please enter a valid email address.'));
    }

    $message = Html::escape($form_state->getValue('message'));
    if (strlen($message) < 10) {
      $form_state->setErrorByName('message', $this->t('Message must be at least 10 characters long.'));
    }
  }

  public function submitForm(array &$form, FormStateInterface $form_state): void {
    // Process sanitized form data
    $sanitized_data = [
      'email' => Html::escape($form_state->getValue('email')),
      'message' => Html::escape($form_state->getValue('message')),
    ];
    
    // Process with proper validation and sanitization
    $this->processSecureData($sanitized_data);
  }
}
```

### Performance Optimization
```php
// web/modules/custom/zh_demo/src/Service/CachedDataService.php
<?php

declare(strict_types=1);

namespace Drupal\zh_demo\Service;

use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Cache\CacheTagsInvalidatorInterface;

final readonly class CachedDataService {

  public function __construct(
    private CacheBackendInterface $cache,
    private CacheTagsInvalidatorInterface $cacheTagsInvalidator,
  ) {}

  public function getProcessedData(string $id): array {
    $cid = "zh_demo:processed_data:$id";
    $cache_tags = ["zh_demo:data:$id"];
    
    if ($cached = $this->cache->get($cid)) {
      return $cached->data;
    }

    $data = $this->expensiveDataProcessing($id);
    
    $this->cache->set(
      $cid,
      $data,
      CacheBackendInterface::CACHE_PERMANENT,
      $cache_tags
    );

    return $data;
  }

  public function invalidateDataCache(string $id): void {
    $this->cacheTagsInvalidator->invalidateTags(["zh_demo:data:$id"]);
  }
}
```

## Agent Integration Points

### When to Use Specific Agents

**MUST** use `drupal-module-developer` for:
- Custom module scaffolding and architecture
- Service definition and dependency injection
- Event subscriber and hook implementations
- Entity and field API integrations

**MUST** use `drupal-theme-specialist` for:
- SDC component development
- Twig template optimization
- Theme library and asset management
- Tailwind CSS integration

**MUST** use `drupal-code-quality-inspector` for:
- PHP 8.3 syntax validation
- Drupal coding standards compliance
- Static analysis with PHPStan/Psalm
- Security vulnerability scanning

**MUST** use `drupal-test-automator` for:
- Comprehensive test coverage strategy
- Kernel and functional test implementation
- JavaScript testing with WebDriver
- CI/CD pipeline integration

## Quality Gates

### Pre-commit Requirements
- [ ] PHP 8.3 syntax validation
- [ ] Drupal coding standards (PHPCS with Drupal rules)
- [ ] Static analysis passes (PHPStan level 8+)
- [ ] All tests pass (PHPUnit + functional)
- [ ] Configuration schema validation
- [ ] Security scan passes

### Deployment Readiness
- [ ] Production configuration split applied
- [ ] Cache optimization configured
- [ ] Security headers implemented
- [ ] Performance profiling completed
- [ ] Accessibility audit passes (WCAG 2.1 AA)
- [ ] SEO meta-data configured

This rule establishes the foundation for modern Drupal 11 development with compound engineering principles, ensuring each improvement builds exponentially on previous work.