/**
 * Browser-Specific Setup for Cross-Browser Testing
 * 
 * Handles authentication, state preparation, and browser-specific configurations
 * for each browser project in the cross-browser testing suite
 */

import { test as setup } from '@playwright/test';
import fs from 'fs/promises';

const STORAGE_STATE_PATH = './test-results/auth-state.json';

// Setup authentication and browser state
setup('prepare browser state', async ({ page, browser, browserName }) => {
  console.log(`🔧 Setting up browser state for ${browserName}`);
  
  // Navigate to Storybook
  await page.goto('http://localhost:6006', { waitUntil: 'networkidle' });
  
  // Wait for Storybook to fully load
  await page.waitForSelector('[data-testid="sidebar-container"], .sb-container', { timeout: 30000 });
  
  // Verify Storybook is ready
  const storybookReady = await page.evaluate(() => {
    return window.__STORYBOOK_STORY_STORE__ || 
           document.querySelector('[data-testid="sidebar-container"]') ||
           document.title.includes('Storybook');
  });
  
  if (!storybookReady) {
    throw new Error('Storybook not ready after setup');
  }
  
  // Set up browser-specific configurations
  await configureBrowserSpecifics(page, browserName);
  
  // Save storage state for reuse
  await page.context().storageState({ path: STORAGE_STATE_PATH });
  
  console.log(`✅ Browser state prepared for ${browserName}`);
});

/**
 * Configure browser-specific settings and preferences
 */
async function configureBrowserSpecifics(page, browserName) {
  const browserConfigs = {
    chromium: {
      // Chromium-specific optimizations
      preferences: {
        'disable-background-timer-throttling': true,
        'disable-renderer-backgrounding': true,
        'disable-backgrounding-occluded-windows': true
      }
    },
    firefox: {
      // Firefox-specific settings
      preferences: {
        'media.navigator.streams.fake': true,
        'media.navigator.permission.disabled': true,
        'dom.webnotifications.enabled': false
      }
    },
    webkit: {
      // WebKit/Safari-specific settings
      preferences: {
        'experimental-web-platform-features': true
      }
    }
  };
  
  const config = browserConfigs[browserName] || {};
  
  if (config.preferences) {
    console.log(`⚙️  Applying ${browserName} specific preferences`);
    
    // Apply browser-specific JavaScript configurations
    await page.addInitScript((prefs) => {
      // Configure browser-specific features
      if (typeof window !== 'undefined') {
        window.browserTestPreferences = prefs;
      }
    }, config.preferences);
  }
  
  // Set consistent font loading for visual testing
  await page.addStyleTag({
    content: `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      
      * {
        font-display: block !important;
      }
      
      body {
        font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
        font-feature-settings: "cv02", "cv03", "cv04", "cv11" !important;
        font-variant-numeric: oldstyle-nums !important;
      }
    `
  });
  
  // Wait for fonts to load
  await page.waitForFunction(() => document.fonts.ready);
  
  // Set up performance monitoring
  await setupPerformanceMonitoring(page, browserName);
  
  // Configure accessibility testing helpers
  await setupAccessibilityHelpers(page);
}

/**
 * Setup performance monitoring for browser-specific metrics
 */
async function setupPerformanceMonitoring(page, browserName) {
  await page.addInitScript((browser) => {
    // Set up performance observer for Core Web Vitals
    if (typeof PerformanceObserver !== 'undefined') {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'paint' || 
              entry.entryType === 'largest-contentful-paint' ||
              entry.entryType === 'first-input' ||
              entry.entryType === 'layout-shift') {
            
            // Store performance metrics for later retrieval
            if (!window.browserTestMetrics) {
              window.browserTestMetrics = {};
            }
            
            window.browserTestMetrics[entry.name || entry.entryType] = {
              value: entry.startTime || entry.value,
              browser: browser,
              timestamp: Date.now()
            };
          }
        });
      });
      
      observer.observe({ 
        entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift']
      });
    }
    
    // Set up navigation timing monitoring
    window.addEventListener('load', () => {
      if (performance.getEntriesByType && performance.getEntriesByType('navigation').length > 0) {
        const nav = performance.getEntriesByType('navigation')[0];
        
        if (!window.browserTestMetrics) {
          window.browserTestMetrics = {};
        }
        
        window.browserTestMetrics.navigation = {
          domContentLoaded: nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart,
          loadComplete: nav.loadEventEnd - nav.loadEventStart,
          totalTime: nav.loadEventEnd - nav.fetchStart,
          browser: browser
        };
      }
    });
  }, browserName);
}

/**
 * Setup accessibility testing helpers
 */
async function setupAccessibilityHelpers(page) {
  await page.addInitScript(() => {
    // Helper function to detect accessibility issues
    window.getAccessibilityInfo = function() {
      const info = {
        focusableElements: 0,
        headingStructure: [],
        landmarkRegions: 0,
        altTextMissing: 0,
        colorContrastIssues: []
      };
      
      // Count focusable elements
      const focusable = document.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      info.focusableElements = focusable.length;
      
      // Analyze heading structure
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        info.headingStructure.push({
          level: parseInt(heading.tagName.slice(1)),
          text: heading.textContent.trim().substring(0, 50),
          hasId: !!heading.id
        });
      });
      
      // Count landmark regions
      const landmarks = document.querySelectorAll('[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"], [role="complementary"], [role="search"], main, nav, header, footer, aside');
      info.landmarkRegions = landmarks.length;
      
      // Check for images without alt text
      const images = document.querySelectorAll('img:not([alt]), img[alt=""]');
      info.altTextMissing = images.length;
      
      return info;
    };
    
    // Helper to check current focus state
    window.getFocusInfo = function() {
      const activeElement = document.activeElement;
      return {
        tagName: activeElement.tagName,
        id: activeElement.id,
        className: activeElement.className,
        hasVisibleFocus: window.getComputedStyle(activeElement, ':focus').outline !== 'none',
        textContent: activeElement.textContent?.trim().substring(0, 50)
      };
    };
    
    // Helper to simulate keyboard navigation
    window.testKeyboardNavigation = function() {
      const focusable = Array.from(document.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ));
      
      return focusable.map((element, index) => ({
        index,
        tagName: element.tagName,
        id: element.id,
        accessible: element.getAttribute('aria-label') || element.textContent?.trim() || element.getAttribute('title'),
        tabIndex: element.tabIndex
      }));
    };
  });
}

// Cleanup after browser tests
setup.afterAll(async () => {
  console.log('🧹 Cleaning up browser test state...');
  
  try {
    // Clean up temporary files
    const tempFiles = [
      './test-results/auth-state.json'
    ];
    
    for (const file of tempFiles) {
      try {
        await fs.unlink(file);
      } catch (error) {
        // File doesn't exist, that's fine
      }
    }
    
    console.log('✅ Browser cleanup completed');
  } catch (error) {
    console.warn('⚠️  Cleanup warning:', error.message);
  }
});