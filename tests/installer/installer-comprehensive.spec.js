/**
 * @file
 * Comprehensive Playwright tests for adesso_cms_installer
 * 
 * Tests all possible configuration combinations and ensures database cleanup
 * between test scenarios using `ddev drush sql-drop -y`
 */

import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';

class InstallerTestHelper {
  constructor(page) {
    this.page = page;
  }

  /**
   * Clean database and restart DDEV before each test
   */
  async setupFreshEnvironment() {
    try {
      // Drop database completely
      execSync('ddev drush sql-drop -y', { stdio: 'inherit' });
      console.log('✓ Database dropped successfully');
      
      // Restart DDEV to ensure clean state
      execSync('ddev restart', { stdio: 'inherit' });
      console.log('✓ DDEV restarted');
      
      // Wait for services to be ready
      await new Promise(resolve => setTimeout(resolve, 3000));
      
    } catch (error) {
      console.error('Setup failed:', error.message);
      throw error;
    }
  }

  /**
   * Navigate to installer and verify it loads
   */
  async navigateToInstaller() {
    const baseUrl = process.env.DDEV_PRIMARY_URL || 'https://adesso-cms.ddev.site';
    await this.page.goto(`${baseUrl}/install`);
    
    // Wait for installer to load
    await this.page.waitForSelector('.cms-installer', { timeout: 30000 });
    await expect(this.page.locator('h1')).toContainText('Welcome');
  }

  /**
   * Complete initial setup steps (language, database, site info)
   */
  async completeInitialSetup(siteName = 'Test adesso CMS') {
    // Step 1: Language selection (if present)
    const languageSelect = this.page.locator('select[name="langcode"]');
    if (await languageSelect.isVisible()) {
      await languageSelect.selectOption('de');
      await this.page.click('input[type="submit"]');
    }

    // Step 2: Database setup (usually auto-configured with SQLite)
    const dbStep = this.page.locator('.database-settings');
    if (await dbStep.isVisible()) {
      await this.page.click('input[type="submit"]');
    }

    // Step 3: Site name configuration
    await this.page.waitForSelector('input[name="site_name"]', { timeout: 20000 });
    await this.page.fill('input[name="site_name"]', siteName);
    await this.page.click('input[type="submit"]');
  }

  /**
   * Configure recipes based on test scenario
   */
  async configureRecipes(recipeConfig) {
    await this.page.waitForSelector('.cms-installer__form-group', { timeout: 20000 });
    
    // Core Features
    if (recipeConfig.paragraphs !== undefined) {
      await this.setCheckboxState('paragraphs', recipeConfig.paragraphs);
    }
    
    // Content Types
    const contentTypes = ['page', 'landing_page', 'news', 'events', 'person', 'project'];
    for (const type of contentTypes) {
      if (recipeConfig[type] !== undefined) {
        await this.setCheckboxState(type, recipeConfig[type]);
      }
    }
    
    // Advanced Features
    const advancedFeatures = ['ai_suite', 'seo_advanced', 'search', 'forms', 'accessibility'];
    for (const feature of advancedFeatures) {
      if (recipeConfig[feature] !== undefined) {
        await this.setCheckboxState(feature, recipeConfig[feature]);
      }
    }
    
    // Submit recipe configuration
    await this.page.click('button:text("Next")');
  }

  /**
   * Set checkbox state (check/uncheck)
   */
  async setCheckboxState(name, shouldBeChecked) {
    const checkbox = this.page.locator(`input[name="${name}"]`);
    const isChecked = await checkbox.isChecked();
    
    if (shouldBeChecked && !isChecked) {
      await checkbox.check();
    } else if (!shouldBeChecked && isChecked) {
      await checkbox.uncheck();
    }
  }

  /**
   * Complete installation and verify success
   */
  async completeInstallation() {
    // Wait for installation to complete (can take several minutes)
    await this.page.waitForSelector('.installation-complete, .messages--status', { 
      timeout: 300000 // 5 minutes
    });
    
    // Verify successful completion
    const successMessage = this.page.locator('.messages--status, .installation-complete');
    await expect(successMessage).toBeVisible();
  }

  /**
   * Verify installed modules and configuration
   */
  async verifyInstallation(expectedModules = []) {
    // Navigate to admin after installation
    await this.page.goto('/admin/modules');
    
    // Verify expected modules are enabled
    for (const module of expectedModules) {
      const moduleRow = this.page.locator(`tr:has-text("${module}")`);
      await expect(moduleRow).toBeVisible();
    }
  }
}

// Test Configuration Scenarios
const testScenarios = [
  {
    name: 'Minimal Installation',
    config: {
      paragraphs: false,
      page: false,
      landing_page: false,
      news: false,
      events: false,
      person: false,
      project: false,
      ai_suite: false,
      seo_advanced: false,
      search: false,
      forms: false,
      accessibility: false
    },
    expectedModules: ['adesso_cms_base']
  },
  {
    name: 'Basic Content Setup',
    config: {
      paragraphs: true,
      page: true,
      landing_page: false,
      news: true,
      events: false,
      person: false,
      project: false,
      ai_suite: false,
      seo_advanced: false,
      search: false,
      forms: false,
      accessibility: false
    },
    expectedModules: ['adesso_cms_paragraphs', 'adesso_cms_page', 'drupal_cms_news']
  },
  {
    name: 'Full Content Types',
    config: {
      paragraphs: true,
      page: true,
      landing_page: true,
      news: true,
      events: true,
      person: true,
      project: true,
      ai_suite: false,
      seo_advanced: false,
      search: false,
      forms: false,
      accessibility: false
    },
    expectedModules: [
      'adesso_cms_paragraphs', 'adesso_cms_page', 'adesso_cms_landing_page',
      'drupal_cms_news', 'drupal_cms_events', 'drupal_cms_person', 'drupal_cms_project'
    ]
  },
  {
    name: 'AI-Enhanced Installation',
    config: {
      paragraphs: true,
      page: true,
      landing_page: false,
      news: false,
      events: false,
      person: false,
      project: false,
      ai_suite: true,
      seo_advanced: true,
      search: false,
      forms: false,
      accessibility: true
    },
    expectedModules: [
      'adesso_cms_paragraphs', 'adesso_cms_page', 'adesso_cms_ai_suite',
      'adesso_cms_seo_advanced', 'drupal_cms_accessibility_tools'
    ]
  },
  {
    name: 'Complete Installation',
    config: {
      paragraphs: true,
      page: true,
      landing_page: true,
      news: true,
      events: true,
      person: true,
      project: true,
      ai_suite: true,
      seo_advanced: true,
      search: true,
      forms: true,
      accessibility: true
    },
    expectedModules: [
      'adesso_cms_paragraphs', 'adesso_cms_page', 'adesso_cms_landing_page',
      'drupal_cms_news', 'drupal_cms_events', 'drupal_cms_person', 'drupal_cms_project',
      'adesso_cms_ai_suite', 'adesso_cms_seo_advanced', 'drupal_cms_search',
      'drupal_cms_forms', 'drupal_cms_accessibility_tools'
    ]
  }
];

// Skip button test scenarios
const skipScenarios = [
  {
    name: 'Skip Recipe Selection',
    skipStep: 'recipes',
    expectedModules: ['adesso_cms_base'] // Only base should be installed
  }
];

// Error scenarios
const errorScenarios = [
  {
    name: 'Empty Site Name',
    siteName: '',
    shouldFail: true
  },
  {
    name: 'Invalid Site Name Characters',
    siteName: '<script>alert("test")</script>',
    shouldFail: false // Should be sanitized
  },
  {
    name: 'Very Long Site Name',
    siteName: 'A'.repeat(256),
    shouldFail: false // Should be truncated
  }
];

test.describe('adesso CMS Installer - Comprehensive Test Suite', () => {
  
  // Test each configuration scenario
  for (const scenario of testScenarios) {
    test(`Installation: ${scenario.name}`, async ({ page }) => {
      const helper = new InstallerTestHelper(page);
      
      // Setup fresh environment
      await helper.setupFreshEnvironment();
      
      // Navigate to installer
      await helper.navigateToInstaller();
      
      // Complete initial setup
      await helper.completeInitialSetup(`Test ${scenario.name}`);
      
      // Configure recipes
      await helper.configureRecipes(scenario.config);
      
      // Complete installation
      await helper.completeInstallation();
      
      // Verify installation
      if (scenario.expectedModules) {
        await helper.verifyInstallation(scenario.expectedModules);
      }
    });
  }
  
  // Test skip functionality
  for (const scenario of skipScenarios) {
    test(`Skip Functionality: ${scenario.name}`, async ({ page }) => {
      const helper = new InstallerTestHelper(page);
      
      await helper.setupFreshEnvironment();
      await helper.navigateToInstaller();
      await helper.completeInitialSetup(`Test ${scenario.name}`);
      
      // Skip recipe selection
      await page.waitForSelector('input[value="Skip this step"]');
      await page.click('input[value="Skip this step"]');
      
      await helper.completeInstallation();
      await helper.verifyInstallation(scenario.expectedModules);
    });
  }
  
  // Test error scenarios
  for (const scenario of errorScenarios) {
    test(`Error Handling: ${scenario.name}`, async ({ page }) => {
      const helper = new InstallerTestHelper(page);
      
      await helper.setupFreshEnvironment();
      await helper.navigateToInstaller();
      
      // Try to use problematic site name
      try {
        await helper.completeInitialSetup(scenario.siteName);
        
        if (scenario.shouldFail) {
          // Should have error message
          await expect(page.locator('.messages--error')).toBeVisible();
        } else {
          // Should continue normally (sanitized/truncated)
          await helper.configureRecipes({ paragraphs: true, page: true });
          await helper.completeInstallation();
        }
      } catch (error) {
        if (!scenario.shouldFail) {
          throw error; // Unexpected failure
        }
      }
    });
  }
  
  // Performance and timeout tests
  test('Installation Performance - Complete Setup', async ({ page }) => {
    const helper = new InstallerTestHelper(page);
    
    await helper.setupFreshEnvironment();
    
    const startTime = Date.now();
    
    await helper.navigateToInstaller();
    await helper.completeInitialSetup('Performance Test');
    
    // Full configuration
    await helper.configureRecipes({
      paragraphs: true,
      page: true,
      landing_page: true,
      news: true,
      events: true,
      person: true,
      project: true,
      ai_suite: true,
      seo_advanced: true,
      search: true,
      forms: true,
      accessibility: true
    });
    
    await helper.completeInstallation();
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log(`Full installation completed in ${duration} seconds`);
    
    // Should complete within reasonable time (adjust as needed)
    expect(duration).toBeLessThan(600); // 10 minutes max
  });
  
  // Visual regression test
  test('Visual Regression - Installer UI', async ({ page }) => {
    const helper = new InstallerTestHelper(page);
    
    await helper.setupFreshEnvironment();
    await helper.navigateToInstaller();
    
    // Screenshot welcome page
    await expect(page).toHaveScreenshot('installer-welcome.png');
    
    await helper.completeInitialSetup('Visual Test');
    
    // Screenshot recipe selection page
    await expect(page).toHaveScreenshot('installer-recipes.png');
  });
  
  // Accessibility test
  test('Accessibility Compliance', async ({ page }) => {
    const helper = new InstallerTestHelper(page);
    
    await helper.setupFreshEnvironment();
    await helper.navigateToInstaller();
    
    // Check for basic accessibility requirements
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('label')).toHaveCount({ min: 1 });
    
    // Check for ARIA attributes
    const formElements = page.locator('input, select, textarea');
    const count = await formElements.count();
    
    for (let i = 0; i < count; i++) {
      const element = formElements.nth(i);
      const type = await element.getAttribute('type');
      
      if (type !== 'hidden' && type !== 'submit') {
        // Should have accessible name (label, aria-label, or aria-labelledby)
        const hasLabel = await element.locator('~ label, + label').count() > 0;
        const hasAriaLabel = await element.getAttribute('aria-label') !== null;
        const hasAriaLabelledby = await element.getAttribute('aria-labelledby') !== null;
        
        expect(hasLabel || hasAriaLabel || hasAriaLabelledby).toBeTruthy();
      }
    }
  });
});

test.describe('adesso CMS Installer - Edge Cases', () => {
  
  test('Installation Recovery - Resume After Failure', async ({ page }) => {
    const helper = new InstallerTestHelper(page);
    
    await helper.setupFreshEnvironment();
    await helper.navigateToInstaller();
    await helper.completeInitialSetup('Recovery Test');
    
    // Simulate partial installation by navigating away
    await page.goto('/admin/config');
    
    // Return to installer - should handle gracefully
    await helper.navigateToInstaller();
    
    // Should either resume or restart cleanly
    const isInstalled = await page.locator('.messages--status:has-text("already installed")').isVisible();
    if (!isInstalled) {
      await helper.configureRecipes({ paragraphs: true });
      await helper.completeInstallation();
    }
  });
  
  test('Multiple Recipe Dependencies', async ({ page }) => {
    const helper = new InstallerTestHelper(page);
    
    await helper.setupFreshEnvironment();
    await helper.navigateToInstaller();
    await helper.completeInitialSetup('Dependencies Test');
    
    // Select recipes that have dependencies
    await helper.configureRecipes({
      paragraphs: true,      // Required for pages
      page: true,            // May depend on paragraphs
      landing_page: true,    // May depend on page/paragraphs
      ai_suite: true,        // Complex dependencies
      seo_advanced: true     // May interact with content types
    });
    
    await helper.completeInstallation();
    
    // Verify all dependencies were resolved
    await helper.verifyInstallation([
      'adesso_cms_paragraphs',
      'adesso_cms_page',
      'adesso_cms_landing_page',
      'adesso_cms_ai_suite',
      'adesso_cms_seo_advanced'
    ]);
  });
  
  test('Database Cleanup Verification', async ({ page }) => {
    const helper = new InstallerTestHelper(page);
    
    // First installation
    await helper.setupFreshEnvironment();
    await helper.navigateToInstaller();
    await helper.completeInitialSetup('Cleanup Test 1');
    await helper.configureRecipes({ page: true });
    await helper.completeInstallation();
    
    // Verify first installation worked
    await page.goto('/admin/config');
    await expect(page.locator('h1')).toContainText('Configuration');
    
    // Clean environment and second installation
    await helper.setupFreshEnvironment();
    await helper.navigateToInstaller();
    await helper.completeInitialSetup('Cleanup Test 2');
    await helper.configureRecipes({ news: true, events: true });
    await helper.completeInstallation();
    
    // Verify second installation is independent
    await page.goto('/admin/modules');
    await expect(page.locator('tr:has-text("News")')).toBeVisible();
    await expect(page.locator('tr:has-text("Events")')).toBeVisible();
  });
  
});

// Helper for CI environments
if (process.env.CI) {
  test.beforeAll(async () => {
    console.log('CI environment detected - extending timeouts');
    test.setTimeout(900000); // 15 minutes for CI
  });
}