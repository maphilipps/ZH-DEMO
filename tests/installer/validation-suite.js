/**
 * @file
 * Comprehensive Validation Test Suite for adesso CMS Installations
 * 
 * Validates post-installation functionality across all installation methods:
 * - Configuration integrity
 * - Module functionality 
 * - Content types and fields
 * - AI integration features
 * - Performance benchmarks
 * - Security compliance
 * - Accessibility standards
 */

import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';

class ValidationTestSuite {
  constructor(page, baseUrl) {
    this.page = page;
    this.baseUrl = baseUrl || process.env.DDEV_PRIMARY_URL || 'https://adesso-cms.ddev.site';
    this.validationResults = new Map();
  }

  /**
   * Configuration Integrity Tests
   */
  async validateConfiguration() {
    console.log('🔧 Validating configuration integrity...');
    
    const results = {
      configExport: false,
      moduleStatus: {},
      fieldConfig: {},
      errors: []
    };

    try {
      // Test configuration export
      const configExportResult = execSync('ddev drush config-export --diff', { 
        encoding: 'utf8', 
        timeout: 30000 
      });
      
      results.configExport = !configExportResult.includes('error') && 
                           !configExportResult.includes('Exception');
      
      if (results.configExport) {
        console.log('  ✅ Configuration export working');
      } else {
        console.log('  ❌ Configuration export has issues');
        results.errors.push('Configuration export failed');
      }

      // Check module status
      const moduleStatus = execSync('ddev drush pm-list --status=enabled --format=json', { 
        encoding: 'utf8' 
      });
      
      const modules = JSON.parse(moduleStatus);
      results.moduleStatus = {
        total: Object.keys(modules).length,
        core: Object.values(modules).filter(m => m.package === 'Core').length,
        contrib: Object.values(modules).filter(m => m.package !== 'Core' && m.package !== 'Custom').length,
        custom: Object.values(modules).filter(m => m.package === 'Custom').length
      };

      console.log(`  📦 Modules enabled: ${results.moduleStatus.total} (${results.moduleStatus.core} core, ${results.moduleStatus.contrib} contrib, ${results.moduleStatus.custom} custom)`);

      // Test field configuration
      try {
        const fieldStatus = execSync('ddev drush field-info --format=json', { 
          encoding: 'utf8', 
          timeout: 15000 
        });
        
        const fields = JSON.parse(fieldStatus);
        results.fieldConfig = {
          total: Object.keys(fields).length,
          configured: Object.values(fields).filter(f => f.required !== undefined).length
        };
        
        console.log(`  🏗️ Fields configured: ${results.fieldConfig.configured}/${results.fieldConfig.total}`);
        
      } catch (error) {
        results.errors.push(`Field configuration check failed: ${error.message}`);
      }

    } catch (error) {
      results.errors.push(`Configuration validation failed: ${error.message}`);
      console.log(`  ❌ Configuration validation error: ${error.message}`);
    }

    return results;
  }

  /**
   * Content Type Validation
   */
  async validateContentTypes() {
    console.log('📝 Validating content types...');
    
    const results = {
      contentTypes: {},
      fieldsWorking: {},
      errors: []
    };

    const expectedContentTypes = [
      { type: 'page', name: 'Basic page' },
      { type: 'landing_page', name: 'Landing page' },
      { type: 'news', name: 'News' },
      { type: 'event', name: 'Event' },
      { type: 'person', name: 'Person' },
      { type: 'project', name: 'Project' }
    ];

    try {
      await this.page.goto(`${this.baseUrl}/user/login`);
      await this.page.fill('input[name="name"]', 'admin');
      await this.page.fill('input[name="pass"]', 'admin');
      await this.page.click('input[type="submit"]');
      await this.page.waitForLoadState('networkidle');

      for (const contentType of expectedContentTypes) {
        try {
          // Try to access the content creation form
          await this.page.goto(`${this.baseUrl}/node/add/${contentType.type}`);
          
          const formExists = await this.page.locator('form.node-form, .node-form').isVisible();
          const titleField = await this.page.locator('input[name="title[0][value]"]').isVisible();
          
          results.contentTypes[contentType.type] = {
            accessible: formExists,
            titleFieldPresent: titleField,
            status: formExists && titleField ? 'working' : 'issues'
          };

          if (formExists && titleField) {
            console.log(`  ✅ Content type '${contentType.type}' is working`);
            
            // Test paragraph field if present
            const paragraphField = await this.page.locator('input[data-drupal-selector*="field-paragraphs"], .field--name-field-paragraphs').isVisible();
            if (paragraphField) {
              results.fieldsWorking[contentType.type] = { paragraphs: true };
              console.log(`    📦 Paragraphs field available`);
            }
            
          } else {
            console.log(`  ❌ Content type '${contentType.type}' has issues`);
            results.errors.push(`Content type ${contentType.type} form not accessible`);
          }

        } catch (error) {
          results.contentTypes[contentType.type] = {
            accessible: false,
            error: error.message,
            status: 'error'
          };
          
          // Don't log error for content types that might not be installed
          console.log(`  ℹ️ Content type '${contentType.type}' not available (may not be installed)`);
        }
      }

    } catch (error) {
      results.errors.push(`Content type validation failed: ${error.message}`);
      console.log(`  ❌ Content type validation error: ${error.message}`);
    }

    return results;
  }

  /**
   * AI Integration Validation
   */
  async validateAIIntegration() {
    console.log('🤖 Validating AI integration...');
    
    const results = {
      aiModulesEnabled: false,
      providerConfiguration: {},
      functionalityWorking: {},
      errors: []
    };

    try {
      // Check if AI modules are enabled
      const aiModules = [
        'ai',
        'ai_content_suggestions', 
        'ai_image_alt_text',
        'ai_provider_anthropic',
        'ai_provider_openai',
        'ai_provider_groq'
      ];

      let enabledAiModules = 0;
      for (const module of aiModules) {
        try {
          const moduleStatus = execSync(`ddev drush pm-list --status=enabled --filter="${module}"`, { 
            encoding: 'utf8' 
          });
          
          if (moduleStatus.includes(module)) {
            enabledAiModules++;
          }
        } catch (error) {
          // Module not enabled or doesn't exist
        }
      }

      results.aiModulesEnabled = enabledAiModules > 0;
      console.log(`  📦 AI modules enabled: ${enabledAiModules}/${aiModules.length}`);

      if (results.aiModulesEnabled) {
        // Test AI configuration pages
        await this.page.goto(`${this.baseUrl}/admin/config/ai`);
        
        const aiConfigExists = await this.page.locator('h1:has-text("AI"), .ai-configuration').isVisible();
        if (aiConfigExists) {
          console.log('  ✅ AI configuration accessible');
          
          // Check for provider configuration
          const providerLinks = await this.page.locator('a[href*="provider"]').count();
          results.providerConfiguration.availableProviders = providerLinks;
          
          console.log(`    🔧 ${providerLinks} AI providers configured`);
        } else {
          results.errors.push('AI configuration not accessible');
        }

        // Test AI image alt text functionality
        try {
          await this.page.goto(`${this.baseUrl}/admin/config/ai/ai_image_alt_text`);
          const altTextConfig = await this.page.locator('.form-item').isVisible();
          
          results.functionalityWorking.imageAltText = altTextConfig;
          if (altTextConfig) {
            console.log('    ✅ AI image alt text configuration available');
          }
        } catch (error) {
          // Feature not available
        }

        // Test content suggestions
        try {
          await this.page.goto(`${this.baseUrl}/admin/config/ai/ai_content_suggestions`);
          const contentSuggestionsConfig = await this.page.locator('.form-item').isVisible();
          
          results.functionalityWorking.contentSuggestions = contentSuggestionsConfig;
          if (contentSuggestionsConfig) {
            console.log('    ✅ AI content suggestions configuration available');
          }
        } catch (error) {
          // Feature not available
        }

      } else {
        console.log('  ℹ️ AI integration not enabled (may not be installed)');
      }

    } catch (error) {
      results.errors.push(`AI validation failed: ${error.message}`);
      console.log(`  ❌ AI validation error: ${error.message}`);
    }

    return results;
  }

  /**
   * Performance Benchmarks
   */
  async validatePerformance() {
    console.log('⚡ Running performance benchmarks...');
    
    const results = {
      pageLoadTimes: {},
      cacheStatus: {},
      databaseQueries: {},
      errors: []
    };

    try {
      // Test homepage performance
      const homepageStart = Date.now();
      await this.page.goto(this.baseUrl, { waitUntil: 'networkidle' });
      const homepageTime = Date.now() - homepageStart;
      
      results.pageLoadTimes.homepage = homepageTime;
      console.log(`  🏠 Homepage load time: ${homepageTime}ms`);

      // Test admin page performance
      const adminStart = Date.now();
      await this.page.goto(`${this.baseUrl}/admin`, { waitUntil: 'networkidle' });
      const adminTime = Date.now() - adminStart;
      
      results.pageLoadTimes.admin = adminTime;
      console.log(`  🔧 Admin page load time: ${adminTime}ms`);

      // Get performance metrics from browser
      const performanceMetrics = await this.page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        return {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          responseTime: navigation.responseEnd - navigation.responseStart,
          renderTime: navigation.domComplete - navigation.responseEnd
        };
      });

      results.browserMetrics = performanceMetrics;
      console.log(`  📊 DOM Content Loaded: ${performanceMetrics.domContentLoaded}ms`);
      console.log(`  📊 Full Load: ${performanceMetrics.loadComplete}ms`);

      // Check cache status
      try {
        const cacheInfo = execSync('ddev drush cache-get system.performance', { 
          encoding: 'utf8' 
        });
        
        results.cacheStatus.configured = !cacheInfo.includes('not found');
        console.log(`  🗄️ Cache configuration: ${results.cacheStatus.configured ? 'Found' : 'Not found'}`);
      } catch (error) {
        results.cacheStatus.error = error.message;
      }

      // Performance thresholds
      const thresholds = {
        homepage: 3000,
        admin: 5000,
        domContentLoaded: 1000
      };

      results.performanceScore = {
        homepageGood: homepageTime <= thresholds.homepage,
        adminGood: adminTime <= thresholds.admin,
        domGood: performanceMetrics.domContentLoaded <= thresholds.domContentLoaded
      };

      const passedChecks = Object.values(results.performanceScore).filter(Boolean).length;
      console.log(`  📈 Performance score: ${passedChecks}/3 checks passed`);

    } catch (error) {
      results.errors.push(`Performance validation failed: ${error.message}`);
      console.log(`  ❌ Performance validation error: ${error.message}`);
    }

    return results;
  }

  /**
   * Security Compliance Check
   */
  async validateSecurity() {
    console.log('🔒 Validating security compliance...');
    
    const results = {
      securityModules: {},
      permissions: {},
      filePermissions: {},
      errors: []
    };

    try {
      // Check security-related modules
      const securityModules = [
        'honeypot',
        'captcha',
        'security_review'
      ];

      for (const module of securityModules) {
        try {
          const moduleStatus = execSync(`ddev drush pm-list --status=enabled --filter="${module}"`, { 
            encoding: 'utf8' 
          });
          
          results.securityModules[module] = moduleStatus.includes(module);
        } catch (error) {
          results.securityModules[module] = false;
        }
      }

      const enabledSecurityModules = Object.values(results.securityModules).filter(Boolean).length;
      console.log(`  🛡️ Security modules enabled: ${enabledSecurityModules}/${securityModules.length}`);

      // Check file permissions
      try {
        const settingsPermissions = execSync('ddev exec "stat -c %a web/sites/default/settings.php"', { 
          encoding: 'utf8' 
        }).trim();
        
        results.filePermissions.settingsFile = settingsPermissions;
        results.filePermissions.settingsSecure = settingsPermissions === '444' || settingsPermissions === '400';
        
        console.log(`  📁 Settings file permissions: ${settingsPermissions} ${results.filePermissions.settingsSecure ? '✅' : '⚠️'}`);
        
      } catch (error) {
        results.errors.push(`File permissions check failed: ${error.message}`);
      }

      // Test admin access protection
      await this.page.goto(`${this.baseUrl}/admin`);
      const needsAuth = await this.page.locator('input[name="name"], .user-login-form').isVisible();
      
      results.permissions.adminProtected = needsAuth;
      console.log(`  🔐 Admin pages protected: ${needsAuth ? '✅' : '❌'}`);

    } catch (error) {
      results.errors.push(`Security validation failed: ${error.message}`);
      console.log(`  ❌ Security validation error: ${error.message}`);
    }

    return results;
  }

  /**
   * Accessibility Standards Check
   */
  async validateAccessibility() {
    console.log('♿ Validating accessibility standards...');
    
    const results = {
      basicChecks: {},
      ariaCompliance: {},
      keyboardNavigation: {},
      errors: []
    };

    try {
      await this.page.goto(this.baseUrl);
      
      // Basic accessibility checks
      const headings = await this.page.locator('h1, h2, h3, h4, h5, h6').count();
      const images = await this.page.locator('img').count();
      const imagesWithAlt = await this.page.locator('img[alt]').count();
      
      results.basicChecks = {
        hasHeadings: headings > 0,
        headingCount: headings,
        imagesWithAlt: images > 0 ? imagesWithAlt / images : 1,
        imageCount: images
      };

      console.log(`  📝 Headings found: ${headings}`);
      console.log(`  🖼️ Images with alt text: ${imagesWithAlt}/${images} (${((imagesWithAlt/images)*100).toFixed(1)}%)`);

      // ARIA compliance
      const ariaLabels = await this.page.locator('[aria-label]').count();
      const ariaLabelledby = await this.page.locator('[aria-labelledby]').count();
      const landmarks = await this.page.locator('[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"], main, nav, header, footer').count();
      
      results.ariaCompliance = {
        ariaLabels,
        ariaLabelledby,
        landmarks,
        hasLandmarks: landmarks > 0
      };

      console.log(`  🏷️ ARIA labels: ${ariaLabels}`);
      console.log(`  🗺️ Landmarks: ${landmarks}`);

      // Keyboard navigation test
      try {
        const focusableElements = await this.page.locator('a, button, input, select, textarea, [tabindex]').count();
        results.keyboardNavigation.focusableElements = focusableElements;
        
        // Test tab navigation on a few elements
        await this.page.keyboard.press('Tab');
        const firstFocused = await this.page.locator(':focus').count();
        
        results.keyboardNavigation.tabWorking = firstFocused > 0;
        console.log(`  ⌨️ Keyboard navigation: ${firstFocused > 0 ? '✅' : '❌'}`);
        
      } catch (error) {
        results.errors.push(`Keyboard navigation test failed: ${error.message}`);
      }

      // Color contrast check (basic)
      const colorElements = await this.page.locator('a, button, .button').evaluateAll(elements => {
        return elements.map(el => {
          const styles = window.getComputedStyle(el);
          return {
            color: styles.color,
            backgroundColor: styles.backgroundColor,
            element: el.tagName
          };
        });
      });

      results.basicChecks.colorContrast = {
        elementsChecked: colorElements.length,
        // Note: Actual contrast calculation would require additional libraries
        hasColorInfo: colorElements.filter(el => el.color && el.backgroundColor).length
      };

      console.log(`  🎨 Elements with color info: ${results.basicChecks.colorContrast.hasColorInfo}/${colorElements.length}`);

      // Overall accessibility score
      const checks = [
        results.basicChecks.hasHeadings,
        results.basicChecks.imagesWithAlt > 0.8,
        results.ariaCompliance.hasLandmarks,
        results.keyboardNavigation.tabWorking
      ];
      
      const passedChecks = checks.filter(Boolean).length;
      results.accessibilityScore = passedChecks / checks.length;
      
      console.log(`  📊 Accessibility score: ${passedChecks}/${checks.length} (${(results.accessibilityScore * 100).toFixed(1)}%)`);

    } catch (error) {
      results.errors.push(`Accessibility validation failed: ${error.message}`);
      console.log(`  ❌ Accessibility validation error: ${error.message}`);
    }

    return results;
  }

  /**
   * Run complete validation suite
   */
  async runCompleteValidation() {
    console.log('\n🔍 Running complete validation suite...\n');
    
    const startTime = Date.now();
    
    const validationResults = {
      timestamp: new Date().toISOString(),
      configuration: await this.validateConfiguration(),
      contentTypes: await this.validateContentTypes(),
      aiIntegration: await this.validateAIIntegration(),
      performance: await this.validatePerformance(),
      security: await this.validateSecurity(),
      accessibility: await this.validateAccessibility(),
      duration: 0,
      overallStatus: 'pending'
    };

    validationResults.duration = Date.now() - startTime;

    // Calculate overall status
    const allErrors = [
      ...validationResults.configuration.errors,
      ...validationResults.contentTypes.errors,
      ...validationResults.aiIntegration.errors,
      ...validationResults.performance.errors,
      ...validationResults.security.errors,
      ...validationResults.accessibility.errors
    ];

    validationResults.overallStatus = allErrors.length === 0 ? 'passed' : 
                                    allErrors.length < 5 ? 'warning' : 'failed';

    // Generate summary
    this.generateValidationSummary(validationResults);

    return validationResults;
  }

  /**
   * Generate validation summary report
   */
  generateValidationSummary(results) {
    console.log('\n' + '='.repeat(80));
    console.log('📋 VALIDATION SUITE RESULTS');
    console.log('='.repeat(80));

    console.log(`\n⏱️ Duration: ${(results.duration / 1000).toFixed(1)}s`);
    console.log(`📊 Overall Status: ${results.overallStatus.toUpperCase()}`);

    // Configuration summary
    console.log(`\n🔧 Configuration:`);
    console.log(`  Config Export: ${results.configuration.configExport ? '✅' : '❌'}`);
    console.log(`  Modules Enabled: ${results.configuration.moduleStatus.total || 0}`);
    console.log(`  Fields Configured: ${results.configuration.fieldConfig.configured || 0}`);

    // Content types summary
    console.log(`\n📝 Content Types:`);
    const workingContentTypes = Object.values(results.contentTypes.contentTypes).filter(ct => ct.status === 'working').length;
    const totalContentTypes = Object.keys(results.contentTypes.contentTypes).length;
    console.log(`  Working: ${workingContentTypes}/${totalContentTypes}`);

    // AI integration summary
    console.log(`\n🤖 AI Integration:`);
    console.log(`  Enabled: ${results.aiIntegration.aiModulesEnabled ? '✅' : '❌'}`);
    if (results.aiIntegration.providerConfiguration.availableProviders) {
      console.log(`  Providers: ${results.aiIntegration.providerConfiguration.availableProviders}`);
    }

    // Performance summary
    console.log(`\n⚡ Performance:`);
    if (results.performance.pageLoadTimes.homepage) {
      console.log(`  Homepage: ${results.performance.pageLoadTimes.homepage}ms`);
    }
    if (results.performance.performanceScore) {
      const score = Object.values(results.performance.performanceScore).filter(Boolean).length;
      console.log(`  Score: ${score}/3 checks passed`);
    }

    // Security summary
    console.log(`\n🔒 Security:`);
    const securityModules = Object.values(results.security.securityModules).filter(Boolean).length;
    console.log(`  Security modules: ${securityModules}`);
    console.log(`  Admin protected: ${results.security.permissions.adminProtected ? '✅' : '❌'}`);

    // Accessibility summary
    console.log(`\n♿ Accessibility:`);
    if (results.accessibility.accessibilityScore !== undefined) {
      console.log(`  Score: ${(results.accessibility.accessibilityScore * 100).toFixed(1)}%`);
    }
    if (results.accessibility.basicChecks.imagesWithAlt !== undefined) {
      console.log(`  Images with alt: ${(results.accessibility.basicChecks.imagesWithAlt * 100).toFixed(1)}%`);
    }

    // Error summary
    const totalErrors = [
      ...results.configuration.errors,
      ...results.contentTypes.errors,
      ...results.aiIntegration.errors,
      ...results.performance.errors,
      ...results.security.errors,
      ...results.accessibility.errors
    ].length;

    if (totalErrors > 0) {
      console.log(`\n❌ Total Issues Found: ${totalErrors}`);
    } else {
      console.log(`\n✅ No critical issues found`);
    }

    console.log('\n' + '='.repeat(80));
  }
}

// Export for use in other tests
export { ValidationTestSuite };

// Playwright tests
test.describe('Installation Validation Suite', () => {
  
  test('Complete validation suite', async ({ page }) => {
    const validator = new ValidationTestSuite(page);
    const results = await validator.runCompleteValidation();
    
    // Assert overall success
    expect(results.overallStatus).not.toBe('failed');
    
    // Assert critical components
    expect(results.configuration.configExport).toBe(true);
    expect(results.performance.pageLoadTimes.homepage).toBeLessThan(10000); // 10s max
    expect(results.accessibility.accessibilityScore).toBeGreaterThan(0.5); // 50% min
  });

  test('Configuration integrity validation', async ({ page }) => {
    const validator = new ValidationTestSuite(page);
    const results = await validator.validateConfiguration();
    
    expect(results.configExport).toBe(true);
    expect(results.moduleStatus.total).toBeGreaterThan(0);
    expect(results.errors.length).toBeLessThan(3); // Allow minor issues
  });

  test('Content type functionality validation', async ({ page }) => {
    const validator = new ValidationTestSuite(page);
    const results = await validator.validateContentTypes();
    
    // At least basic page should be working
    const workingTypes = Object.values(results.contentTypes).filter(ct => ct.status === 'working');
    expect(workingTypes.length).toBeGreaterThan(0);
  });

  test('Performance benchmarks validation', async ({ page }) => {
    const validator = new ValidationTestSuite(page);
    const results = await validator.validatePerformance();
    
    expect(results.pageLoadTimes.homepage).toBeLessThan(5000); // 5s max
    expect(results.browserMetrics.domContentLoaded).toBeLessThan(2000); // 2s max
  });

  test('Accessibility standards validation', async ({ page }) => {
    const validator = new ValidationTestSuite(page);
    const results = await validator.validateAccessibility();
    
    expect(results.basicChecks.hasHeadings).toBe(true);
    expect(results.keyboardNavigation.tabWorking).toBe(true);
    expect(results.accessibilityScore).toBeGreaterThan(0.6); // 60% min
  });

});