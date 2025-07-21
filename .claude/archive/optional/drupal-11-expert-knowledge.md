# Drupal 11 Expert Knowledge Base (2025)

## Advanced Drupal 11 Features & Performance Optimization

### Drupal Recipes Module (New in D11)

#### Recipe-Based Configuration Management
```yaml
# recipes/accessible-component/recipe.yml
name: 'Accessible Component Foundation'
description: 'Sets up accessibility-first component development'
type: 'Recipe'
core_version_requirement: '^11'

install:
  - components
  - sdc
  - ui_patterns
  - a11y_checker

config:
  install:
    - components.settings
    - sdc.settings
    
  actions:
    sdc.settings:
      simple_config_update:
        auto_discovery: true
        validate_schemas: true
        accessibility_checks: true
        
dependencies:
  - drupal:core (>=11.0.0)
```

#### Recipe Integration with Agent Workflows
```php
<?php
// web/modules/custom/adesso_cms_recipes/src/RecipeManager.php

declare(strict_types=1);

namespace Drupal\adesso_cms_recipes;

use Drupal\Core\Recipe\RecipeRunner;
use Drupal\Core\Recipe\Recipe;

/**
 * Manages recipe deployment in multi-agent workflows.
 */
class AgentRecipeManager {

  public function __construct(
    private readonly RecipeRunner $recipeRunner,
  ) {}

  /**
   * Deploy recipe with agent validation.
   */
  public function deployWithAgentValidation(string $recipeName, string $agentType): bool {
    // Pre-deployment validation by agent type
    if (!$this->validateRecipeForAgent($recipeName, $agentType)) {
      throw new \InvalidArgumentException("Recipe $recipeName not validated for agent $agentType");
    }

    // Load recipe with accessibility and security checks
    $recipe = Recipe::createFromDirectory("recipes/$recipeName");
    
    // Agent-specific pre-deployment hooks
    $this->executeAgentPreDeploymentHooks($recipe, $agentType);
    
    // Deploy recipe
    $result = $this->recipeRunner->processRecipe($recipe);
    
    // Post-deployment validation
    $this->validateDeploymentResult($result, $agentType);
    
    return $result->isSuccessful();
  }

  private function validateRecipeForAgent(string $recipeName, string $agentType): bool {
    $validationRules = [
      'planner' => ['has_documentation', 'accessibility_requirements'],
      'developer' => ['code_standards', 'security_compliance'],
      'qa' => ['test_coverage', 'accessibility_tests'],
      'integrator' => ['deployment_readiness', 'rollback_plan']
    ];

    return $this->runValidationChecks($recipeName, $validationRules[$agentType] ?? []);
  }

}
```

### Performance Optimization (2025 Standards)

#### Advanced Caching Configuration
```php
<?php
// settings.php - Performance optimizations for Drupal 11

// Redis configuration for high-performance caching
$settings['redis.connection']['interface'] = 'PhpRedis';
$settings['redis.connection']['host'] = 'redis';
$settings['redis.connection']['port'] = 6379;

// Cache backends optimization
$settings['cache']['default'] = 'cache.backend.redis';
$settings['cache']['bins']['render'] = 'cache.backend.redis';
$settings['cache']['bins']['data'] = 'cache.backend.redis';
$settings['cache']['bins']['discovery'] = 'cache.backend.redis';

// Disable caching during development (DDEV)
if (defined('DDEV_HOSTNAME')) {
  $settings['cache']['bins']['render'] = 'cache.backend.null';
  $settings['cache']['bins']['page'] = 'cache.backend.null';
  $settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
}

// Database performance optimization
$databases['default']['default']['init_commands'] = [
  'isolation_level' => 'SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED',
  'sql_mode' => "SET sql_mode = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'",
];

// PHP 8+ optimizations
$settings['php_storage']['twig']['class'] = 'Drupal\Component\PhpStorage\FileStorage';
$settings['php_storage']['twig']['secret'] = hash('sha256', serialize($databases));

// Asset optimization
$config['system.performance']['css']['preprocess'] = TRUE;
$config['system.performance']['css']['gzip'] = TRUE;
$config['system.performance']['js']['preprocess'] = TRUE;
$config['system.performance']['js']['gzip'] = TRUE;
```

#### Advanced CSS/JS Aggregation (AdvAgg)
```php
<?php
// AdvAgg configuration for optimal performance

// web/modules/custom/adesso_cms_performance/adesso_cms_performance.services.yml
services:
  adesso_cms.performance_optimizer:
    class: Drupal\adesso_cms_performance\PerformanceOptimizer
    arguments: ['@advagg.optimizer', '@renderer']

/**
 * Performance optimizer for adesso CMS.
 */
class PerformanceOptimizer {

  public function optimizeAssetsForAccessibility(): void {
    // Ensure critical accessibility CSS loads first
    $this->prioritizeCriticalAccessibilityAssets();
    
    // Optimize font loading for screen readers
    $this->optimizeFontLoadingStrategy();
    
    // Minimize render-blocking resources
    $this->deferNonCriticalAssets();
  }

  private function prioritizeCriticalAccessibilityAssets(): void {
    // Load accessibility-critical CSS inline
    $criticalCss = [
      'focus-management.css',
      'screen-reader-only.css',
      'high-contrast-support.css'
    ];
    
    foreach ($criticalCss as $cssFile) {
      drupal_add_css($cssFile, ['group' => CSS_SYSTEM, 'weight' => -100]);
    }
  }

}
```

### Database Performance Optimization

#### Query Optimization Strategies
```php
<?php
// web/modules/custom/adesso_cms_performance/src/QueryOptimizer.php

declare(strict_types=1);

namespace Drupal\adesso_cms_performance;

use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\EntityTypeManagerInterface;

/**
 * Advanced query optimization for Drupal 11.
 */
class QueryOptimizer {

  public function __construct(
    private readonly Connection $database,
    private readonly EntityTypeManagerInterface $entityTypeManager,
  ) {}

  /**
   * Optimize component queries for accessibility data.
   */
  public function optimizeAccessibilityQueries(): void {
    // Create optimized indexes for accessibility fields
    $this->createAccessibilityIndexes();
    
    // Implement query caching for accessibility checks
    $this->cacheAccessibilityQueries();
    
    // Optimize ARIA attribute queries
    $this->optimizeAriaAttributeQueries();
  }

  private function createAccessibilityIndexes(): void {
    $schema = $this->database->schema();
    
    // Index for ARIA attributes in SDC components
    if (!$schema->indexExists('sdc_component_data', 'idx_aria_attributes')) {
      $schema->addIndex('sdc_component_data', 
        ['entity_id', 'delta'], 
        'idx_aria_attributes'
      );
    }
    
    // Index for accessibility compliance status
    if (!$schema->indexExists('component_accessibility', 'idx_wcag_compliance')) {
      $schema->addIndex('component_accessibility',
        ['compliance_level', 'last_checked'],
        'idx_wcag_compliance'
      );
    }
  }

  /**
   * Implement database sharding for high-traffic accessibility checks.
   */
  public function implementAccessibilitySharding(): void {
    // Separate accessibility audit data to dedicated database
    $databases['accessibility_audit']['default'] = [
      'driver' => 'mysql',
      'database' => 'adesso_cms_accessibility',
      'username' => getenv('DB_USER'),
      'password' => getenv('DB_PASS'),
      'host' => getenv('DB_HOST_ACCESSIBILITY'),
      'port' => 3306,
    ];
  }

}
```

### CDN Integration with Accessibility Considerations

#### Accessibility-Aware CDN Configuration
```javascript
// web/themes/custom/adesso_cms_theme/js/accessibility-cdn.js

/**
 * CDN integration that maintains accessibility.
 */
class AccessibilityAwareCDN {
  constructor() {
    this.cdnConfig = {
      imageOptimization: true,
      fontOptimization: true,
      accessibilityPreservation: true
    };
  }

  /**
   * Load images with accessibility metadata preserved.
   */
  loadAccessibleImage(imageElement) {
    const originalAlt = imageElement.getAttribute('alt');
    const ariaLabel = imageElement.getAttribute('aria-label');
    const longDesc = imageElement.getAttribute('longdesc');
    
    // Use CDN for optimization but preserve accessibility attributes
    const cdnUrl = this.buildCDNUrl(imageElement.src);
    
    imageElement.addEventListener('load', () => {
      // Ensure accessibility attributes are maintained
      if (originalAlt) imageElement.setAttribute('alt', originalAlt);
      if (ariaLabel) imageElement.setAttribute('aria-label', ariaLabel);
      if (longDesc) imageElement.setAttribute('longdesc', longDesc);
    });
    
    imageElement.src = cdnUrl;
  }

  /**
   * Optimize font loading for screen readers.
   */
  optimizeFontLoadingForA11y() {
    // Use font-display: swap for better accessibility
    const fontFaces = document.querySelectorAll('link[rel="preload"][as="font"]');
    
    fontFaces.forEach(fontFace => {
      fontFace.addEventListener('load', () => {
        // Announce font load completion to screen readers
        this.announceToScreenReader('Custom fonts loaded');
      });
    });
  }

  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

// Initialize accessibility-aware CDN
document.addEventListener('DOMContentLoaded', () => {
  const accessibilityAwareCDN = new AccessibilityAwareCDN();
  
  // Apply to all images
  document.querySelectorAll('img').forEach(img => {
    accessibilityAwareCDN.loadAccessibleImage(img);
  });
  
  // Optimize font loading
  accessibilityAwareCDN.optimizeFontLoadingForA11y();
});
```

### Advanced Module Management for Performance

#### Performance Module Configuration
```yaml
# Performance modules for adesso CMS (2025)
performance_modules:
  core_modules:
    - big_pipe          # Improves perceived performance
    - dynamic_page_cache # Page caching for authenticated users
    - internal_page_cache # Page caching for anonymous users
    
  contributed_modules:
    - redis             # High-performance caching backend
    - memcache          # Alternative caching backend
    - advagg            # Advanced CSS/JS aggregation
    - lazy              # Lazy loading for images and content
    - blazy             # Lazy loading with accessibility support
    - imageapi_optimize # Image compression and optimization
    - webp              # WebP image format support
    - fast_404          # Fast 404 page responses
    
  accessibility_performance:
    - a11y_checker      # Accessibility validation
    - editoria11y       # Content accessibility checker
    - accessibility_audit # Performance impact monitoring
```

#### Automated Performance Monitoring
```php
<?php
// web/modules/custom/adesso_cms_performance/src/PerformanceMonitor.php

declare(strict_types=1);

namespace Drupal\adesso_cms_performance;

/**
 * Monitors performance with accessibility considerations.
 */
class PerformanceMonitor {

  /**
   * Monitor Core Web Vitals with accessibility metrics.
   */
  public function monitorCoreWebVitalsWithA11y(): array {
    return [
      'lcp' => $this->measureLargestContentfulPaint(),
      'fid' => $this->measureFirstInputDelay(),
      'cls' => $this->measureCumulativeLayoutShift(),
      'accessibility_score' => $this->measureAccessibilityPerformance(),
      'screen_reader_performance' => $this->measureScreenReaderPerformance(),
    ];
  }

  private function measureAccessibilityPerformance(): float {
    // Measure time for accessibility features to load
    $accessibilityLoadTime = microtime(true);
    
    // Check critical accessibility features
    $criticalA11yFeatures = [
      'skip_links_loaded',
      'aria_live_regions_ready',
      'focus_management_active',
      'screen_reader_announcements_ready'
    ];
    
    foreach ($criticalA11yFeatures as $feature) {
      if (!$this->isFeatureReady($feature)) {
        return 0.0; // Accessibility not ready
      }
    }
    
    $loadTime = microtime(true) - $accessibilityLoadTime;
    
    // Score based on load time (target: < 100ms)
    return max(0, min(1, (200 - $loadTime * 1000) / 200));
  }

  /**
   * Performance alerts for accessibility regressions.
   */
  public function checkAccessibilityPerformanceRegression(): void {
    $currentMetrics = $this->monitorCoreWebVitalsWithA11y();
    $baseline = $this->getPerformanceBaseline();
    
    if ($currentMetrics['accessibility_score'] < $baseline['accessibility_score'] * 0.9) {
      $this->alertAccessibilityRegression($currentMetrics, $baseline);
    }
  }

}
```

### Expert Development Workflow Integration

#### Agent-Optimized Performance Testing
```bash
#!/bin/bash
# scripts/performance-testing-by-agent.sh

# Performance testing optimized for different agent types

test_planner_performance() {
  echo "🎯 Testing planning phase performance..."
  # Test requirement analysis speed
  time ddev drush sdc:list --format=json > /dev/null
  # Test accessibility requirement extraction
  time npm run test:a11y:requirements-analysis
}

test_developer_performance() {
  echo "⚡ Testing development phase performance..."
  # Test build performance
  time ddev theme build
  # Test component compilation speed
  time ddev drush sdc:compile
  # Test accessibility validation speed
  time npm run test:a11y:component-validation
}

test_qa_performance() {
  echo "🔍 Testing QA phase performance..."
  # Test comprehensive accessibility suite
  time npm run test:a11y:comprehensive
  # Test cross-browser performance
  time npm run test:performance:cross-browser
  # Test load testing
  time npm run test:load:accessibility-scenarios
}

test_integrator_performance() {
  echo "🚀 Testing integration phase performance..."
  # Test deployment speed
  time ./scripts/deploy-staging.sh
  # Test rollback speed
  time ./scripts/rollback-test.sh
  # Test monitoring initialization
  time ./scripts/initialize-monitoring.sh
}

# Run performance tests based on current agent context
CURRENT_AGENT=$(git branch --show-current | cut -d'/' -f2)

case $CURRENT_AGENT in
  "planner") test_planner_performance ;;
  "developer") test_developer_performance ;;
  "qa") test_qa_performance ;;
  "integrator") test_integrator_performance ;;
  *) 
    echo "Running comprehensive performance test suite..."
    test_planner_performance
    test_developer_performance  
    test_qa_performance
    test_integrator_performance
    ;;
esac
```

Dieses Expert Knowledge System integriert die neuesten Drupal 11 Features und Performance-Optimierungen (2025) nahtlos in unser Multi-Agent Claude Code Workflow und stellt sicher, dass jeder Agent mit dem aktuellsten Drupal-Expertise arbeitet.