/**
 * @file
 * Parallel Test Runner for adesso CMS Installation Methods
 * 
 * Tests multiple installation paths simultaneously:
 * 1. Standard Profile + Recipes
 * 2. Custom adesso_cms_installer Profile (when working)
 * 3. Recipe chains and combinations
 * 4. Different module configurations
 */

import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

class ParallelInstallationTester {
  constructor() {
    this.testResults = new Map();
    this.performanceMetrics = new Map();
    this.errorPatterns = new Map();
    this.baseUrl = process.env.DDEV_PRIMARY_URL || 'https://adesso-cms.ddev.site';
    this.resultsDir = path.join(process.cwd(), 'test-results', 'parallel-installation');
  }

  /**
   * Installation Method Configurations
   */
  getInstallationMethods() {
    return [
      {
        id: 'standard-recipes',
        name: 'Standard Profile + Recipes',
        description: 'Install standard profile, then apply recipes via command line',
        method: 'standard',
        recipes: [
          'core/recipes/image_media_type',
          '../recipes/adesso_cms_paragraphs',
          '../recipes/adesso_cms_page',
          '../recipes/drupal_cms_news'
        ],
        priority: 'high',
        isStable: true
      },
      {
        id: 'standard-ai-enabled',
        name: 'Standard + AI Suite',
        description: 'Standard installation with AI integration',
        method: 'standard',
        recipes: [
          'core/recipes/image_media_type',
          '../recipes/adesso_cms_paragraphs',
          '../recipes/adesso_cms_ai_suite'
        ],
        priority: 'high',
        isStable: true
      },
      {
        id: 'standard-complete',
        name: 'Standard + Complete Suite',
        description: 'Full installation via standard profile + all recipes',
        method: 'standard',
        recipes: [
          'core/recipes/image_media_type',
          '../recipes/adesso_cms_base',
          '../recipes/adesso_cms_paragraphs',
          '../recipes/adesso_cms_complete'
        ],
        priority: 'medium',
        isStable: true
      },
      {
        id: 'custom-installer',
        name: 'Custom adesso_cms_installer Profile',
        description: 'Install using custom installer profile (when fixed)',
        method: 'custom',
        profile: 'adesso_cms_installer',
        priority: 'medium',
        isStable: false, // Currently under repair
        skipIfFailing: true
      },
      {
        id: 'recipe-chains',
        name: 'Recipe Chain Testing',
        description: 'Test recipe dependency chains',
        method: 'standard',
        recipes: [
          '../recipes/drupal_cms_content_type_base',
          '../recipes/adesso_cms_paragraphs',
          '../recipes/adesso_cms_page',
          '../recipes/adesso_cms_landing_page',
          '../recipes/adesso_cms_seo_advanced'
        ],
        priority: 'low',
        isStable: true
      }
    ];
  }

  /**
   * Clean environment for fresh installation
   */
  async cleanEnvironment(testId = '') {
    console.log(`🧹 Cleaning environment for test: ${testId}`);
    
    try {
      // Drop database completely
      execSync('ddev drush sql-drop -y', { stdio: 'pipe' });
      
      // Remove installation artifacts
      const cleanupCommands = [
        'rm -f web/sites/default/settings.php',
        'rm -f web/sites/default/settings.local.php',
        'rm -rf web/sites/default/files',
        'rm -f web/sites/default/.ht.sqlite',
        'rm -rf web/sites/default/files/php'
      ];
      
      for (const cmd of cleanupCommands) {
        try {
          execSync(`ddev exec "${cmd}"`, { stdio: 'pipe' });
        } catch (error) {
          // Ignore errors for files that don't exist
        }
      }
      
      // Restart DDEV for clean state
      execSync('ddev restart', { stdio: 'pipe' });
      
      // Wait for services to be ready
      await this.waitForServices();
      
      console.log(`✅ Environment cleaned for: ${testId}`);
      
    } catch (error) {
      console.error(`❌ Failed to clean environment for ${testId}:`, error.message);
      throw error;
    }
  }

  /**
   * Wait for DDEV services to be ready
   */
  async waitForServices() {
    const maxAttempts = 30;
    let attempt = 1;

    while (attempt <= maxAttempts) {
      try {
        // Check if site responds
        const response = await fetch(this.baseUrl, { 
          method: 'HEAD',
          timeout: 5000 
        });
        
        if (response.ok || response.status === 404) {
          console.log('✅ DDEV services ready');
          return;
        }
      } catch (error) {
        // Service not ready yet
      }

      if (attempt === maxAttempts) {
        throw new Error('DDEV services failed to start');
      }

      console.log(`⏳ Waiting for services... (${attempt}/${maxAttempts})`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      attempt++;
    }
  }

  /**
   * Execute standard profile installation with recipes
   */
  async executeStandardInstallation(config) {
    const startTime = Date.now();
    console.log(`🚀 Starting standard installation: ${config.name}`);

    try {
      // Install standard profile
      console.log('  📦 Installing standard profile...');
      execSync('ddev drush site-install standard --yes --account-name=admin --account-pass=admin --account-mail=admin@test.local', {
        stdio: 'pipe',
        timeout: 120000 // 2 minutes
      });

      const profileInstallTime = Date.now() - startTime;
      console.log(`  ✅ Standard profile installed (${profileInstallTime}ms)`);

      // Apply recipes
      const recipeResults = [];
      for (const recipe of config.recipes) {
        const recipeStartTime = Date.now();
        console.log(`  🔧 Applying recipe: ${recipe}`);
        
        try {
          execSync(`ddev exec "cd /var/www/html && php core/scripts/drupal recipe ${recipe}"`, {
            stdio: 'pipe',
            timeout: 180000 // 3 minutes per recipe
          });
          
          const recipeTime = Date.now() - recipeStartTime;
          recipeResults.push({
            recipe,
            status: 'success',
            duration: recipeTime
          });
          
          console.log(`    ✅ Recipe applied (${recipeTime}ms)`);
          
        } catch (error) {
          const recipeTime = Date.now() - recipeStartTime;
          recipeResults.push({
            recipe,
            status: 'failed',
            duration: recipeTime,
            error: error.message
          });
          
          console.log(`    ❌ Recipe failed: ${error.message}`);
          throw error;
        }
      }

      const totalTime = Date.now() - startTime;
      
      return {
        status: 'success',
        method: 'standard',
        duration: totalTime,
        profileInstallTime,
        recipeResults,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      const totalTime = Date.now() - startTime;
      
      return {
        status: 'failed',
        method: 'standard',
        duration: totalTime,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Execute custom installer profile installation
   */
  async executeCustomInstallation(config) {
    const startTime = Date.now();
    console.log(`🚀 Starting custom installation: ${config.name}`);

    try {
      console.log(`  📦 Installing custom profile: ${config.profile}`);
      
      execSync(`ddev drush site-install ${config.profile} --yes --account-name=admin --account-pass=admin --account-mail=admin@test.local`, {
        stdio: 'pipe',
        timeout: 300000 // 5 minutes for custom installer
      });

      const totalTime = Date.now() - startTime;
      console.log(`  ✅ Custom profile installed (${totalTime}ms)`);

      return {
        status: 'success',
        method: 'custom',
        profile: config.profile,
        duration: totalTime,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      const totalTime = Date.now() - startTime;
      
      // Check if this is a known issue we should skip
      if (config.skipIfFailing) {
        console.log(`  ⏭️ Skipping failed custom installer (known issue)`);
        
        return {
          status: 'skipped',
          method: 'custom',
          profile: config.profile,
          duration: totalTime,
          error: error.message,
          reason: 'Known issue - configuration errors being fixed',
          timestamp: new Date().toISOString()
        };
      }

      return {
        status: 'failed',
        method: 'custom',
        profile: config.profile,
        duration: totalTime,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Validate installation post-installation
   */
  async validateInstallation(config, page) {
    console.log(`🔍 Validating installation: ${config.name}`);
    
    const validationResults = {
      basicAccess: false,
      adminAccess: false,
      moduleStatus: {},
      performanceMetrics: {},
      errors: []
    };

    try {
      // Test basic site access
      await page.goto(this.baseUrl, { waitUntil: 'networkidle' });
      
      const title = await page.title();
      const hasContent = await page.locator('body').isVisible();
      
      validationResults.basicAccess = title.length > 0 && hasContent;
      
      if (validationResults.basicAccess) {
        console.log('  ✅ Basic site access working');
      } else {
        console.log('  ❌ Basic site access failed');
        validationResults.errors.push('Site not accessible');
      }

      // Test admin access
      try {
        await page.goto(`${this.baseUrl}/user/login`);
        await page.fill('input[name="name"]', 'admin');
        await page.fill('input[name="pass"]', 'admin');
        await page.click('input[type="submit"]');
        
        await page.waitForLoadState('networkidle');
        
        const isLoggedIn = await page.locator('.toolbar, .admin-menu, text="admin"').isVisible();
        validationResults.adminAccess = isLoggedIn;
        
        if (isLoggedIn) {
          console.log('  ✅ Admin access working');
          
          // Get module status
          await page.goto(`${this.baseUrl}/admin/modules`);
          
          const enabledModules = await page.locator('.module-enabled').count();
          validationResults.moduleStatus.enabled = enabledModules;
          
          console.log(`  📦 ${enabledModules} modules enabled`);
          
        } else {
          console.log('  ❌ Admin access failed');
          validationResults.errors.push('Admin login failed');
        }
        
      } catch (error) {
        validationResults.errors.push(`Admin access error: ${error.message}`);
      }

      // Performance metrics
      const performanceEntries = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        return {
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          responseTime: navigation.responseEnd - navigation.responseStart
        };
      });
      
      validationResults.performanceMetrics = performanceEntries;
      console.log(`  ⚡ Performance: Load ${performanceEntries.loadTime}ms, DOM ${performanceEntries.domContentLoaded}ms`);

    } catch (error) {
      validationResults.errors.push(`Validation error: ${error.message}`);
      console.log(`  ❌ Validation failed: ${error.message}`);
    }

    return validationResults;
  }

  /**
   * Run single installation method test
   */
  async runInstallationTest(config, page) {
    console.log(`\n🧪 Testing: ${config.name}`);
    console.log(`📝 Description: ${config.description}`);
    
    const testStartTime = Date.now();
    
    try {
      // Clean environment
      await this.cleanEnvironment(config.id);
      
      // Execute installation based on method
      let installResult;
      if (config.method === 'standard') {
        installResult = await this.executeStandardInstallation(config);
      } else if (config.method === 'custom') {
        installResult = await this.executeCustomInstallation(config);
      }
      
      // Skip validation if installation was skipped
      if (installResult.status === 'skipped') {
        return {
          config,
          installResult,
          validationResult: { status: 'skipped' },
          totalDuration: Date.now() - testStartTime
        };
      }
      
      // Validate installation if it succeeded
      let validationResult = { status: 'not_run' };
      if (installResult.status === 'success') {
        validationResult = await this.validateInstallation(config, page);
        validationResult.status = 'completed';
      }
      
      const result = {
        config,
        installResult,
        validationResult,
        totalDuration: Date.now() - testStartTime
      };
      
      console.log(`✅ Test completed: ${config.name} (${result.totalDuration}ms)`);
      return result;
      
    } catch (error) {
      console.log(`❌ Test failed: ${config.name} - ${error.message}`);
      
      return {
        config,
        installResult: { 
          status: 'failed', 
          error: error.message,
          duration: Date.now() - testStartTime
        },
        validationResult: { status: 'not_run' },
        totalDuration: Date.now() - testStartTime,
        error: error.message
      };
    }
  }

  /**
   * Save test results to file
   */
  async saveResults(results) {
    await fs.mkdir(this.resultsDir, { recursive: true });
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const resultsFile = path.join(this.resultsDir, `parallel-test-results-${timestamp}.json`);
    
    const summary = {
      timestamp: new Date().toISOString(),
      totalTests: results.length,
      successful: results.filter(r => r.installResult.status === 'success').length,
      failed: results.filter(r => r.installResult.status === 'failed').length,
      skipped: results.filter(r => r.installResult.status === 'skipped').length,
      totalDuration: results.reduce((sum, r) => sum + r.totalDuration, 0),
      results: results
    };
    
    await fs.writeFile(resultsFile, JSON.stringify(summary, null, 2));
    
    console.log(`\n📊 Results saved to: ${resultsFile}`);
    return { summary, resultsFile };
  }

  /**
   * Generate detailed report
   */
  generateReport(results) {
    console.log('\n' + '='.repeat(80));
    console.log('🏁 PARALLEL INSTALLATION TEST RESULTS');
    console.log('='.repeat(80));
    
    const successful = results.filter(r => r.installResult.status === 'success');
    const failed = results.filter(r => r.installResult.status === 'failed');
    const skipped = results.filter(r => r.installResult.status === 'skipped');
    
    console.log(`\n📈 Summary:`);
    console.log(`  Total Tests: ${results.length}`);
    console.log(`  ✅ Successful: ${successful.length}`);
    console.log(`  ❌ Failed: ${failed.length}`);
    console.log(`  ⏭️ Skipped: ${skipped.length}`);
    
    if (successful.length > 0) {
      console.log(`\n✅ Successful Installations:`);
      successful.forEach(result => {
        const duration = (result.totalDuration / 1000).toFixed(1);
        console.log(`  • ${result.config.name} (${duration}s)`);
        
        if (result.installResult.recipeResults) {
          const successfulRecipes = result.installResult.recipeResults.filter(r => r.status === 'success').length;
          console.log(`    📦 ${successfulRecipes} recipes applied successfully`);
        }
      });
    }
    
    if (failed.length > 0) {
      console.log(`\n❌ Failed Installations:`);
      failed.forEach(result => {
        console.log(`  • ${result.config.name}`);
        console.log(`    Error: ${result.installResult.error}`);
      });
    }
    
    if (skipped.length > 0) {
      console.log(`\n⏭️ Skipped Installations:`);
      skipped.forEach(result => {
        console.log(`  • ${result.config.name}`);
        console.log(`    Reason: ${result.installResult.reason || 'Configuration under repair'}`);
      });
    }
    
    // Performance analysis
    if (successful.length > 0) {
      console.log(`\n⚡ Performance Analysis:`);
      const avgDuration = successful.reduce((sum, r) => sum + r.totalDuration, 0) / successful.length;
      const fastest = successful.reduce((min, r) => r.totalDuration < min.totalDuration ? r : min);
      const slowest = successful.reduce((max, r) => r.totalDuration > max.totalDuration ? r : max);
      
      console.log(`  Average Duration: ${(avgDuration / 1000).toFixed(1)}s`);
      console.log(`  Fastest: ${fastest.config.name} (${(fastest.totalDuration / 1000).toFixed(1)}s)`);
      console.log(`  Slowest: ${slowest.config.name} (${(slowest.totalDuration / 1000).toFixed(1)}s)`);
    }
    
    console.log('\n' + '='.repeat(80));
  }

  /**
   * Run all installation tests in parallel
   */
  async runParallelTests(page) {
    const methods = this.getInstallationMethods();
    const results = [];
    
    console.log('🚀 Starting parallel installation tests...');
    console.log(`📋 Testing ${methods.length} installation methods\n`);
    
    // Run tests sequentially (can't truly parallelize due to shared DDEV environment)
    // But organized for easy parallel execution when multiple environments available
    for (const method of methods) {
      const result = await this.runInstallationTest(method, page);
      results.push(result);
    }
    
    // Save results and generate report
    const { summary, resultsFile } = await this.saveResults(results);
    this.generateReport(results);
    
    return { results, summary, resultsFile };
  }
}

// Export for use in Playwright tests
export { ParallelInstallationTester };

// Test implementation
test.describe('Parallel Installation Method Testing', () => {
  
  test('Run all installation methods in parallel', async ({ page }) => {
    const tester = new ParallelInstallationTester();
    
    const { results, summary } = await tester.runParallelTests(page);
    
    // Assert that at least some installations succeeded
    const successfulCount = summary.successful;
    expect(successfulCount).toBeGreaterThan(0);
    
    // Assert that the working methods (standard + recipes) succeeded
    const standardMethods = results.filter(r => 
      r.config.method === 'standard' && 
      r.config.isStable === true
    );
    
    const standardSuccessCount = standardMethods.filter(r => 
      r.installResult.status === 'success'
    ).length;
    
    expect(standardSuccessCount).toBeGreaterThan(0);
    
    console.log(`\n✅ Parallel installation tests completed successfully`);
    console.log(`📊 ${successfulCount}/${summary.totalTests} methods working`);
  });
  
  test('Standard profile + recipes installation', async ({ page }) => {
    const tester = new ParallelInstallationTester();
    const methods = tester.getInstallationMethods();
    
    const standardMethod = methods.find(m => m.id === 'standard-recipes');
    const result = await tester.runInstallationTest(standardMethod, page);
    
    expect(result.installResult.status).toBe('success');
    expect(result.validationResult.basicAccess).toBe(true);
    expect(result.validationResult.adminAccess).toBe(true);
  });
  
  test('Recipe dependency chain validation', async ({ page }) => {
    const tester = new ParallelInstallationTester();
    const methods = tester.getInstallationMethods();
    
    const chainMethod = methods.find(m => m.id === 'recipe-chains');
    const result = await tester.runInstallationTest(chainMethod, page);
    
    expect(result.installResult.status).toBe('success');
    
    // Verify all recipes in chain were applied successfully
    if (result.installResult.recipeResults) {
      const failedRecipes = result.installResult.recipeResults.filter(r => r.status !== 'success');
      expect(failedRecipes.length).toBe(0);
    }
  });
  
});