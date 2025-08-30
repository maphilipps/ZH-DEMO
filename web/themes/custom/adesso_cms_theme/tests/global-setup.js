/**
 * Global Setup for Cross-Browser Playwright Testing
 * 
 * Prepares environment for comprehensive cross-browser testing
 * of Swiss municipality portal components
 */

const { chromium } = require('@playwright/test');
const fs = require('fs').promises;
const path = require('path');

async function globalSetup(config) {
  console.log('🚀 Starting Cross-Browser Test Environment Setup...');
  
  // Create test results directories
  await ensureDirectories();
  
  // Setup Storybook server validation
  await validateStorybookServer();
  
  // Prepare test data and state
  await prepareTestEnvironment();
  
  // Generate test metadata
  await generateTestMetadata();
  
  console.log('✅ Cross-Browser Test Environment Ready');
}

/**
 * Ensure all necessary directories exist
 */
async function ensureDirectories() {
  const directories = [
    './test-results',
    './test-results/playwright', 
    './test-results/html-report',
    './test-results/screenshots',
    './test-results/visual-regression',
    './test-results/accessibility',
    './test-results/performance',
    './test-results/coverage'
  ];
  
  for (const dir of directories) {
    try {
      await fs.mkdir(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    } catch (error) {
      if (error.code !== 'EEXIST') {
        console.error(`❌ Error creating directory ${dir}:`, error.message);
      }
    }
  }
}

/**
 * Validate Storybook server is available
 */
async function validateStorybookServer() {
  const storybookUrl = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:6006';
  const maxRetries = 30;
  const retryDelay = 2000;
  
  console.log(`🔍 Validating Storybook server at ${storybookUrl}...`);
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const browser = await chromium.launch();
      const context = await browser.newContext({
        ignoreHTTPSErrors: true
      });
      const page = await context.newPage();
      
      // Try to load Storybook main page
      await page.goto(storybookUrl, { 
        waitUntil: 'networkidle',
        timeout: 10000 
      });
      
      // Check if Storybook is properly loaded
      const storybookReady = await page.evaluate(() => {
        return window.__STORYBOOK_STORY_STORE__ || 
               document.querySelector('[data-testid="sidebar-container"]') ||
               document.title.includes('Storybook');
      });
      
      await browser.close();
      
      if (storybookReady) {
        console.log('✅ Storybook server validated successfully');
        return;
      } else {
        throw new Error('Storybook not fully loaded');
      }
      
    } catch (error) {
      console.log(`⏳ Storybook validation attempt ${attempt}/${maxRetries} failed: ${error.message}`);
      
      if (attempt === maxRetries) {
        console.error('❌ Storybook server validation failed after maximum attempts');
        throw new Error(`Storybook server not available at ${storybookUrl} after ${maxRetries} attempts`);
      }
      
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
}

/**
 * Prepare test environment and state
 */
async function prepareTestEnvironment() {
  console.log('🔧 Preparing test environment...');
  
  // Create authentication state if needed (for authenticated tests)
  await prepareAuthState();
  
  // Setup visual regression baselines
  await prepareVisualBaselines();
  
  // Initialize performance monitoring
  await preparePerformanceMonitoring();
  
  // Setup accessibility testing configuration
  await prepareAccessibilityTesting();
  
  console.log('✅ Test environment prepared');
}

/**
 * Prepare authentication state for tests
 */
async function prepareAuthState() {
  // For now, just create placeholder auth state
  // In a real scenario, this would log into the admin interface
  const authState = {
    cookies: [],
    origins: [],
    localStorage: [],
    sessionStorage: []
  };
  
  try {
    await fs.writeFile('./test-results/auth-state.json', JSON.stringify(authState, null, 2));
    console.log('📝 Authentication state prepared');
  } catch (error) {
    console.warn('⚠️  Could not write auth state:', error.message);
  }
}

/**
 * Prepare visual regression testing baselines
 */
async function prepareVisualBaselines() {
  const baselineDir = './test-results/visual-regression/baselines';
  
  try {
    await fs.mkdir(baselineDir, { recursive: true });
    
    // Create baseline configuration
    const baselineConfig = {
      threshold: 0.2,
      maxDiffPixels: 1000,
      browsers: ['chromium', 'firefox', 'webkit'],
      viewports: [
        { name: 'mobile', width: 375, height: 667 },
        { name: 'tablet', width: 768, height: 1024 },
        { name: 'desktop', width: 1366, height: 768 },
        { name: 'wide', width: 1920, height: 1080 }
      ],
      components: [
        'hero--default',
        'hero--thalwil', 
        'hero--thalheim',
        'hero--erlenbach',
        'site-header--default',
        'main-menu--default',
        'button--primary',
        'card--default',
        'newsletter-form--default'
      ]
    };
    
    await fs.writeFile(
      path.join(baselineDir, 'config.json'), 
      JSON.stringify(baselineConfig, null, 2)
    );
    
    console.log('📸 Visual regression baselines prepared');
  } catch (error) {
    console.warn('⚠️  Could not prepare visual baselines:', error.message);
  }
}

/**
 * Prepare performance monitoring
 */
async function preparePerformanceMonitoring() {
  const perfConfig = {
    metrics: [
      'first-contentful-paint',
      'largest-contentful-paint', 
      'cumulative-layout-shift',
      'first-input-delay',
      'time-to-interactive'
    ],
    budgets: {
      'first-contentful-paint': 1500,
      'largest-contentful-paint': 2500,
      'time-to-interactive': 3000
    },
    browsers: ['chromium', 'firefox', 'webkit'],
    components: [
      'hero--default',
      'site-header--default',
      'main-menu--default'
    ]
  };
  
  try {
    await fs.writeFile(
      './test-results/performance/config.json',
      JSON.stringify(perfConfig, null, 2)
    );
    
    console.log('📊 Performance monitoring prepared');
  } catch (error) {
    console.warn('⚠️  Could not prepare performance monitoring:', error.message);
  }
}

/**
 * Setup accessibility testing configuration
 */
async function prepareAccessibilityTesting() {
  const a11yConfig = {
    standards: ['wcag2a', 'wcag2aa', 'wcag21aa'],
    swiss_compliance: 'eCH-0059',
    languages: ['de-CH', 'fr-CH', 'it-CH'],
    rules: {
      'color-contrast': { enabled: true, level: 'AA' },
      'keyboard': { enabled: true },
      'focus-order-semantics': { enabled: true },
      'landmark-one-main': { enabled: true },
      'page-has-heading-one': { enabled: true },
      'region': { enabled: true },
      'skip-link': { enabled: true },
      'aria-allowed-attr': { enabled: true },
      'aria-required-attr': { enabled: true },
      'button-name': { enabled: true },
      'form-field-multiple-labels': { enabled: true },
      'image-alt': { enabled: true },
      'label': { enabled: true },
      'link-name': { enabled: true }
    },
    municipalities: {
      thalwil: { theme: 'blue', accessibility_level: 'AA' },
      thalheim: { theme: 'green', accessibility_level: 'AA' },
      erlenbach: { theme: 'turquoise', accessibility_level: 'AA' }
    }
  };
  
  try {
    await fs.writeFile(
      './test-results/accessibility/config.json',
      JSON.stringify(a11yConfig, null, 2)
    );
    
    console.log('♿ Accessibility testing prepared');
  } catch (error) {
    console.warn('⚠️  Could not prepare accessibility testing:', error.message);
  }
}

/**
 * Generate test metadata and environment info
 */
async function generateTestMetadata() {
  const metadata = {
    timestamp: new Date().toISOString(),
    environment: {
      node_version: process.version,
      platform: process.platform,
      arch: process.arch,
      ci: !!process.env.CI,
      github_actions: !!process.env.GITHUB_ACTIONS
    },
    test_configuration: {
      base_url: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:6006',
      browsers: ['chromium', 'firefox', 'webkit'],
      projects: [
        'chromium-desktop',
        'firefox-desktop', 
        'webkit-desktop',
        'mobile-chrome',
        'mobile-safari',
        'tablet-chrome',
        'visual-regression',
        'accessibility-chromium',
        'performance-multi-browser',
        'swiss-compliance',
        'municipality-themes'
      ],
      viewports: [
        { name: 'mobile', width: 375, height: 667 },
        { name: 'tablet', width: 768, height: 1024 },
        { name: 'desktop', width: 1366, height: 768 },
        { name: 'wide', width: 1920, height: 1080 }
      ]
    },
    swiss_compliance: {
      standard: 'eCH-0059 v4.0',
      wcag_level: 'AA',
      languages: ['de-CH', 'fr-CH', 'it-CH'],
      municipalities: ['thalwil', 'thalheim', 'erlenbach']
    },
    components_tested: [
      'hero (4 variants)',
      'site-header',
      'site-footer', 
      'main-menu',
      'page-header',
      'card',
      'buttons (primary, secondary)',
      'accordion',
      'carousel',
      'gallery',
      'slider',
      'newsletter-form',
      'file-upload-preview',
      'form-progress',
      'damage-report-card',
      'quick-action-buttons',
      'recent-cards',
      'bento-grid',
      'section-header',
      'sidebyside',
      'stat-card',
      'badges',
      'status-badge',
      'logo',
      'embed',
      'media',
      'text'
    ]
  };
  
  try {
    await fs.writeFile(
      './test-results/test-metadata.json',
      JSON.stringify(metadata, null, 2)
    );
    
    console.log('📋 Test metadata generated');
    console.log('🎯 Testing configuration:');
    console.log(`   - Base URL: ${metadata.test_configuration.base_url}`);
    console.log(`   - Browsers: ${metadata.test_configuration.browsers.join(', ')}`);
    console.log(`   - Projects: ${metadata.test_configuration.projects.length}`);
    console.log(`   - Components: ${metadata.components_tested.length}+ SDC components`);
    console.log(`   - Swiss Standard: ${metadata.swiss_compliance.standard}`);
  } catch (error) {
    console.warn('⚠️  Could not generate test metadata:', error.message);
  }
}

module.exports = globalSetup;