// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright Configuration for GPZH Demo Theme Testing
 * 
 * This configuration sets up E2E testing for the Adesso CMS theme
 * with focus on Swiss compliance and municipal form functionality
 */

module.exports = defineConfig({
  testDir: './tests/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'github' : 'html',
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL for DDEV environment */
    baseURL: process.env.DDEV_PRIMARY_URL || 'https://bruchtal.zh-demo.ddev.site',
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Take screenshot only on failure */
    screenshot: 'only-on-failure',
    
    /* Record video only on failure */
    video: 'retain-on-failure',
    
    /* Ignore SSL certificate issues in development */
    ignoreHTTPSErrors: true,
    
    /* Set viewport for Swiss municipal portal testing */
    viewport: { width: 1280, height: 720 },
    
    /* Swiss locale for testing */
    locale: 'de-CH',
    timezoneId: 'Europe/Zurich',
    
    /* Configure for accessibility testing */
    colorScheme: 'light', // Test light mode by default
  },

  /* Configure projects for major browsers */
  projects: [
    // Desktop browsers for municipal employee testing
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Swiss government often uses Chrome
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        // Alternative browser testing
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        // Safari testing for completeness
      },
    },
    
    // Mobile devices for citizen access
    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],
        // Mobile citizen access testing
      },
    },
    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 12'],
        // iOS citizen access testing
      },
    },
    
    // Accessibility testing with specific configuration
    {
      name: 'accessibility',
      use: {
        ...devices['Desktop Chrome'],
        // Force reduced motion for accessibility testing
        reducedMotion: 'reduce',
        // High contrast for vision accessibility
        colorScheme: 'dark',
      },
      testMatch: '**/*accessibility*.spec.js',
    },
    
    // Performance testing project
    {
      name: 'performance',
      use: {
        ...devices['Desktop Chrome'],
        // Slow connection simulation for rural areas
        launchOptions: {
          args: ['--disable-web-security', '--disable-features=VizDisplayCompositor'],
        },
      },
      testMatch: '**/*performance*.spec.js',
    },
  ],

  /* Global setup and teardown */
  globalSetup: require.resolve('./tests/global-setup.js'),
  globalTeardown: require.resolve('./tests/global-teardown.js'),

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'echo "Using existing DDEV server for theme testing"',
    url: process.env.DDEV_PRIMARY_URL || 'https://bruchtal.zh-demo.ddev.site',
    reuseExistingServer: !process.env.CI,
    ignoreHTTPSErrors: true,
  },
  
  /* Test timeout settings */
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  
  /* Output directory for test artifacts */
  outputDir: './tests/results/',
  
  /* Configure test metadata for reporting */
  metadata: {
    'Test Environment': 'GPZH Demo System',
    'Theme': 'Adesso CMS Theme',
    'Drupal Version': '11.2.2',
    'Swiss Compliance': 'eCH-0059, CH-DSG',
    'Target Municipality': 'Bruchtal',
  },
});