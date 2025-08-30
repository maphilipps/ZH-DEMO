/**
 * Cross-Browser Playwright Configuration for PnX Architecture
 * Validates compatibility across Chrome, Firefox, Safari for Swiss government standards
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/cross-browser-results.json' }],
    ['junit', { outputFile: 'test-results/cross-browser-results.xml' }]
  ],
  
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // Desktop browsers - Primary support for Swiss government
    {
      name: 'chromium-desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'firefox-desktop',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'webkit-desktop',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    // Tablet viewports - Important for accessibility
    {
      name: 'tablet-portrait',
      use: { 
        ...devices['iPad Pro'],
      },
    },
    {
      name: 'tablet-landscape',
      use: { 
        ...devices['iPad Pro landscape'],
      },
    },

    // Mobile viewports - Required for responsive compliance
    {
      name: 'mobile-chrome',
      use: { 
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'mobile-safari',
      use: { 
        ...devices['iPhone 12'],
      },
    },

    // German government specific resolutions
    {
      name: 'gov-standard-1366',
      use: {
        browserName: 'chromium',
        viewport: { width: 1366, height: 768 },
      },
    },
    {
      name: 'gov-wide-1920',
      use: {
        browserName: 'chromium', 
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],

  webServer: {
    command: 'npm run dev-storybook -- --ci',
    port: 6006,
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});