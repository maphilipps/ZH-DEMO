// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Cross-Browser Playwright Configuration for PnX Architecture
 * 
 * Comprehensive E2E testing configuration for Swiss municipality portals
 * with cross-browser compatibility, visual regression, and accessibility testing
 * 
 * Phase 2.2: Cross-Browser Playwright Configuration Implementation
 * - Multi-browser testing (Chromium, Firefox, WebKit)
 * - Visual regression testing across all 25+ SDC components
 * - Swiss government compliance validation (eCH-0059)
 * - Municipality theme testing (Thalwil, Thalheim, Erlenbach)
 * - Performance and accessibility cross-browser validation
 */

module.exports = defineConfig({
  testDir: './tests/e2e',
  
  /* Cross-browser parallel execution */
  fullyParallel: true,
  
  /* Prevent accidental test.only in CI */
  forbidOnly: !!process.env.CI,
  
  /* Retry strategy for flaky tests */
  retries: process.env.CI ? 3 : 1,
  
  /* Worker configuration for optimal performance */
  workers: process.env.CI ? 4 : '75%',
  
  /* Multi-format reporting for different environments */
  reporter: [
    ['html', { 
      outputFolder: 'test-results/html-report',
      open: process.env.CI ? 'never' : 'on-failure'
    }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['json', { outputFile: 'test-results/results.json' }],
    process.env.CI ? ['github'] : ['list']
  ],
  
  /* Global test timeout */
  globalTimeout: process.env.CI ? 600000 : 300000,
  
  /* Shared settings for all projects */
  use: {
    /* Multi-environment base URL support */
    baseURL: process.env.PLAYWRIGHT_BASE_URL || process.env.DDEV_PRIMARY_URL || 'http://localhost:6006',
    
    /* Enhanced tracing and debugging */
    trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',
    
    /* Comprehensive artifact collection */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    /* SSL and security settings */
    ignoreHTTPSErrors: true,
    
    /* Swiss locale and timezone */
    locale: 'de-CH',
    timezoneId: 'Europe/Zurich',
    
    /* Accessibility and visual testing defaults */
    colorScheme: 'light',
    reducedMotion: 'reduce', // For consistent visual testing
    
    /* Request headers for Swiss compliance */
    extraHTTPHeaders: {
      'Accept-Language': 'de-CH,de;q=0.9,fr;q=0.8,it;q=0.7,en;q=0.6',
      'User-Agent': 'Mozilla/5.0 (compatible; GPZH-Demo-Test/1.0; Swiss-Municipality-Portal)'
    },
    
    /* Performance and timeout settings */
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  
  /* Cross-browser test timeout configuration */
  timeout: 60000,
  expect: {
    timeout: 15000,
    // Visual comparison settings
    toHaveScreenshot: {
      threshold: 0.2,
      maxDiffPixels: 500,
      animations: 'disabled',
      caret: 'hide'
    },
    toMatchSnapshot: {
      threshold: 0.2,
      maxDiffPixels: 500
    }
  },

  /* Cross-browser projects configuration */
  projects: [
    // Setup project for authentication and data preparation
    {
      name: 'setup',
      testMatch: /.*\.setup\.(js|ts)/,
      teardown: 'cleanup'
    },
    
    // Cleanup project
    {
      name: 'cleanup', 
      testMatch: /.*\.teardown\.(js|ts)/
    },

    // === DESKTOP BROWSERS - Swiss Government Standard ===
    
    // Chromium - Primary Swiss government browser
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 },
        // Swiss government Chrome settings
        launchOptions: {
          args: [
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',
            '--force-color-profile=srgb',
            '--disable-backgrounding-occluded-windows'
          ]
        }
      },
      dependencies: ['setup']
    },
    
    // Firefox - Secondary Swiss government browser
    {
      name: 'firefox-desktop',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1366, height: 768 },
        // Firefox-specific settings for Swiss compliance
        launchOptions: {
          firefoxUserPrefs: {
            'media.navigator.streams.fake': true,
            'media.navigator.permission.disabled': true,
            'browser.safebrowsing.enabled': false
          }
        }
      },
      dependencies: ['setup']
    },
    
    // WebKit/Safari - Cross-platform compatibility
    {
      name: 'webkit-desktop',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1366, height: 768 }
      },
      dependencies: ['setup']
    },

    // === MOBILE BROWSERS - Citizen Access ===
    
    // Mobile Chrome - Android citizens
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5'],
        // Swiss mobile optimization
        deviceScaleFactor: 1,
        isMobile: true,
        hasTouch: true
      },
      dependencies: ['setup']
    },
    
    // Mobile Safari - iOS citizens  
    {
      name: 'mobile-safari',
      use: {
        ...devices['iPhone 12'],
        // iOS-specific settings
        deviceScaleFactor: 1,
        isMobile: true,
        hasTouch: true
      },
      dependencies: ['setup']
    },
    
    // Tablet - Municipal employee mobile access
    {
      name: 'tablet-chrome',
      use: {
        ...devices['iPad Pro'],
        // Tablet-specific viewport
        viewport: { width: 1024, height: 768 },
        isMobile: true,
        hasTouch: true
      },
      dependencies: ['setup']
    },

    // === SPECIALIZED TESTING PROJECTS ===
    
    // Visual regression testing
    {
      name: 'visual-regression',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 },
        // Visual testing optimization
        launchOptions: {
          args: [
            '--force-color-profile=srgb',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-ipc-flooding-protection'
          ]
        },
        // Consistent visual testing settings
        reducedMotion: 'reduce',
        colorScheme: 'light'
      },
      testMatch: '**/*visual*.spec.js',
      dependencies: ['setup']
    },
    
    // Accessibility compliance testing
    {
      name: 'accessibility-chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 },
        // Accessibility testing settings
        reducedMotion: 'reduce',
        colorScheme: 'light',
        // High contrast simulation
        forcedColors: 'none'
      },
      testMatch: '**/*accessibility*.spec.js',
      dependencies: ['setup']
    },
    
    // Performance testing across browsers
    {
      name: 'performance-multi-browser',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 },
        // Performance testing optimization
        launchOptions: {
          args: [
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',
            '--enable-gpu-benchmarking',
            '--enable-thread-instruction-count'
          ]
        }
      },
      testMatch: '**/*performance*.spec.js',
      dependencies: ['setup']
    },
    
    // Swiss compliance testing (eCH-0059)
    {
      name: 'swiss-compliance',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 },
        locale: 'de-CH',
        timezoneId: 'Europe/Zurich',
        // Swiss government compliance headers
        extraHTTPHeaders: {
          'Accept-Language': 'de-CH,de;q=0.9,fr-CH;q=0.8,fr;q=0.7,it-CH;q=0.6,it;q=0.5',
          'X-Swiss-Municipality': 'gpzh-demo',
          'X-Compliance-Standard': 'eCH-0059'
        }
      },
      testMatch: '**/*compliance*.spec.js',
      dependencies: ['setup']
    },
    
    // Municipality theme testing
    {
      name: 'municipality-themes',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 },
        // Municipality-specific settings
        extraHTTPHeaders: {
          'X-Municipality-Test': 'true'
        }
      },
      testMatch: '**/*municipality*.spec.js',
      dependencies: ['setup']
    }
  ],

  /* Global setup and teardown for cross-browser testing */
  globalSetup: require.resolve('./tests/global-setup.js'),
  globalTeardown: require.resolve('./tests/global-teardown.js'),

  /* Web server configuration for different environments */
  webServer: process.env.CI ? undefined : {
    command: 'npm run dev-storybook',
    url: 'http://localhost:6006',
    port: 6006,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    ignoreHTTPSErrors: true,
    env: {
      NODE_ENV: 'test',
      STORYBOOK_DISABLE_TELEMETRY: '1'
    }
  },
  
  /* Output directory structure for cross-browser artifacts */
  outputDir: './test-results/playwright',
  
  /* Enhanced metadata for cross-browser reporting */
  metadata: {
    'Test Environment': 'GPZH Multi-Municipality Portal System',
    'Architecture': 'PreviousNext Frontend Build Tools',
    'Theme': 'Adesso CMS Theme v1.3.0',
    'Drupal Version': '11.2.2',
    'Node Version': process.version,
    'Swiss Compliance': 'eCH-0059, WCAG 2.1 AA, CH-DSG',
    'Municipalities': 'Thalwil, Thalheim, Erlenbach',
    'Testing Framework': 'Playwright + Storybook + BackstopJS',
    'Cross-Browser Support': 'Chromium, Firefox, WebKit',
    'Mobile Support': 'iOS Safari, Android Chrome, Tablet',
    'Performance Standard': '>90 Lighthouse Score',
    'Visual Regression': 'Enabled for 25+ SDC Components'
  },
});