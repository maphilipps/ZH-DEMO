/**
 * @file
 * Playwright configuration for adesso CMS installer tests
 */

import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  // Test directory
  testDir: './tests/installer',
  
  // Timeout settings
  timeout: 300000, // 5 minutes per test
  expect: {
    timeout: 30000 // 30 seconds for assertions
  },
  
  // Test execution settings
  fullyParallel: false, // Run tests sequentially to avoid database conflicts
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1, // Single worker to ensure proper database cleanup
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'test-results/installer-report' }],
    ['json', { outputFile: 'test-results/installer-results.json' }],
    ['list']
  ],
  
  // Output settings
  use: {
    // Base URL for tests
    baseURL: process.env.DDEV_PRIMARY_URL || 'https://adesso-cms.ddev.site',
    
    // Browser settings
    headless: process.env.CI ? true : false,
    viewport: { width: 1280, height: 720 },
    
    // Screenshots and videos
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    
    // Timeouts
    actionTimeout: 15000,
    navigationTimeout: 30000,
    
    // Ignore HTTPS errors in development
    ignoreHTTPSErrors: true,
    
    // Accept downloads
    acceptDownloads: true,
  },

  // Output directories
  outputDir: 'test-results/installer-artifacts',
  
  // Global setup and teardown
  globalSetup: path.resolve('./global-setup.js'),
  globalTeardown: path.resolve('./global-teardown.js'),

  // Projects configuration
  projects: [
    {
      name: 'installer-chrome',
      use: { 
        ...devices['Desktop Chrome'],
        // Extra Chrome args for DDEV environment
        launchOptions: {
          args: [
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',
            '--ignore-certificate-errors'
          ]
        }
      },
    },
    
    {
      name: 'installer-firefox',
      use: { 
        ...devices['Desktop Firefox'],
        // Firefox specific settings
        launchOptions: {
          firefoxUserPrefs: {
            'security.tls.insecure_fallback_hosts': 'adesso-cms.ddev.site',
            'network.stricttransportsecurity.preloadlist': false
          }
        }
      },
    },
    
    {
      name: 'installer-safari',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile testing
    {
      name: 'installer-mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    
    {
      name: 'installer-mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Test categories with different configurations
  projects: [
    // Quick smoke tests
    {
      name: 'smoke-tests',
      testMatch: '**/smoke.spec.js',
      use: { 
        ...devices['Desktop Chrome'],
        headless: true 
      },
      timeout: 60000, // Shorter timeout for smoke tests
    },
    
    // Comprehensive installation tests
    {
      name: 'comprehensive-tests',
      testMatch: '**/installer-comprehensive.spec.js',
      use: { 
        ...devices['Desktop Chrome'],
        headless: process.env.CI ? true : false
      },
      timeout: 600000, // 10 minutes for full installations
      retries: 1,
    },
    
    // Performance tests
    {
      name: 'performance-tests',
      testMatch: '**/performance.spec.js',
      use: { 
        ...devices['Desktop Chrome'],
        headless: true
      },
      timeout: 900000, // 15 minutes for performance tests
    },
    
    // Accessibility tests
    {
      name: 'accessibility-tests',
      testMatch: '**/accessibility.spec.js',
      use: { 
        ...devices['Desktop Chrome'],
        headless: true
      },
    },
    
    // Visual regression tests
    {
      name: 'visual-tests',
      testMatch: '**/visual.spec.js',
      use: { 
        ...devices['Desktop Chrome'],
        headless: true,
        viewport: { width: 1920, height: 1080 }, // Fixed viewport for consistency
      },
    },
  ],

  // Development server (if needed)
  webServer: process.env.CI ? undefined : {
    command: 'ddev start',
    port: 443,
    reuseExistingServer: true,
    timeout: 120000,
  },
});

// Note: Environment-specific overrides would go here in a separate config file if needed