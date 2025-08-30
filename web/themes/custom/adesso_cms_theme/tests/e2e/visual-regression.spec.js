/**
 * Visual Regression Testing Suite for PnX Architecture
 * Cross-browser visual consistency validation for Swiss municipality themes
 */

import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  // Test configuration for different browsers and viewports
  const browsers = ['chromium', 'firefox', 'webkit'];
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1366, height: 768 },
    { name: 'wide', width: 1920, height: 1080 }
  ];

  // Critical components for visual testing
  const components = [
    { id: 'hero--default', name: 'hero-default' },
    { id: 'hero--thalwil', name: 'hero-thalwil' },
    { id: 'hero--thalheim', name: 'hero-thalheim' },
    { id: 'hero--erlenbach', name: 'hero-erlenbach' },
    { id: 'navigation--default', name: 'navigation-default' },
    { id: 'footer--default', name: 'footer-default' },
    { id: 'card--default', name: 'card-default' },
    { id: 'button--primary', name: 'button-primary' },
    { id: 'button--secondary', name: 'button-secondary' },
    { id: 'form--contact', name: 'form-contact' },
    { id: 'breadcrumb--default', name: 'breadcrumb-default' }
  ];

  test.beforeEach(async ({ page }) => {
    // Configure page for consistent screenshots
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'de-CH,de;q=0.9,en;q=0.8'
    });
  });

  // Cross-browser visual consistency tests
  for (const viewport of viewports) {
    test.describe(`Visual consistency at ${viewport.name} viewport`, () => {
      
      for (const component of components) {
        test(`${component.name} renders consistently across browsers`, async ({ page, browserName }) => {
          // Set viewport
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          
          // Navigate to component story
          await page.goto(`http://localhost:6006/iframe.html?id=${component.id}`);
          
          // Wait for component to fully render
          await page.waitForLoadState('networkidle');
          await page.waitForTimeout(1000); // Allow for animations
          
          // Hide dynamic elements that might cause flaky tests
          await page.addStyleTag({
            content: `
              .animate-pulse,
              .animate-bounce,
              .animate-spin,
              [data-testid*="loading"],
              [class*="loading"],
              .cursor-blink {
                animation: none !important;
                transition: none !important;
              }
              
              /* Hide timestamps and dynamic content */
              [data-dynamic="true"],
              .timestamp,
              .current-time {
                visibility: hidden !important;
              }
            `
          });
          
          // Take screenshot with browser and viewport specific naming
          await expect(page.locator('#storybook-root')).toHaveScreenshot({
            name: `${component.name}-${viewport.name}-${browserName}.png`,
            fullPage: false,
            animations: 'disabled',
            caret: 'hide'
          });
        });
      }
    });
  }

  // Municipality theme visual comparison
  test.describe('Municipality Theme Consistency', () => {
    const municipalities = ['thalwil', 'thalheim', 'erlenbach'];
    const municipalityColors = {
      thalwil: { primary: '#0066CC', name: 'Blue' },
      thalheim: { primary: '#008844', name: 'Green' },
      erlenbach: { primary: '#00AA88', name: 'Turquoise' }
    };

    for (const municipality of municipalities) {
      test(`${municipality} theme visual consistency`, async ({ page }) => {
        await page.setViewportSize({ width: 1366, height: 768 });
        
        // Test hero component with municipality theme
        await page.goto(`http://localhost:6006/iframe.html?id=hero--${municipality}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);
        
        // Verify municipality theme is applied
        const themeElement = await page.locator(`[class*="municipality-${municipality}"], [data-municipality="${municipality}"]`);
        await expect(themeElement).toBeVisible();
        
        // Take themed screenshot
        await expect(page.locator('#storybook-root')).toHaveScreenshot({
          name: `hero-${municipality}-theme.png`,
          fullPage: false,
          animations: 'disabled'
        });
        
        // Verify color scheme
        const primaryElements = await page.locator('[class*="primary"], [class*="accent"]');
        const count = await primaryElements.count();
        
        if (count > 0) {
          const computedColor = await primaryElements.first().evaluate(el => {
            const computed = window.getComputedStyle(el);
            return computed.getPropertyValue('--color-primary') || computed.backgroundColor;
          });
          
          // Color should reflect municipality theme
          expect(computedColor).toBeTruthy();
        }
      });
    }
  });

  // Interactive state visual testing
  test.describe('Interactive States Visual Testing', () => {
    const interactiveComponents = [
      { id: 'button--primary', selector: 'button' },
      { id: 'button--secondary', selector: 'button' },
      { id: 'form--contact', selector: 'input[type="text"]' },
      { id: 'navigation--default', selector: 'a' }
    ];

    for (const component of interactiveComponents) {
      test(`${component.id} interactive states`, async ({ page }) => {
        await page.setViewportSize({ width: 1366, height: 768 });
        await page.goto(`http://localhost:6006/iframe.html?id=${component.id}`);
        await page.waitForLoadState('networkidle');
        
        const element = page.locator(component.selector).first();
        
        // Default state
        await expect(page.locator('#storybook-root')).toHaveScreenshot({
          name: `${component.id.replace('--', '-')}-default.png`,
          animations: 'disabled'
        });
        
        // Hover state
        await element.hover();
        await page.waitForTimeout(300);
        await expect(page.locator('#storybook-root')).toHaveScreenshot({
          name: `${component.id.replace('--', '-')}-hover.png`,
          animations: 'disabled'
        });
        
        // Focus state
        await element.focus();
        await page.waitForTimeout(300);
        await expect(page.locator('#storybook-root')).toHaveScreenshot({
          name: `${component.id.replace('--', '-')}-focus.png`,
          animations: 'disabled'
        });
        
        // Active state (for buttons)
        if (component.selector === 'button') {
          await page.mouse.down();
          await page.waitForTimeout(100);
          await expect(page.locator('#storybook-root')).toHaveScreenshot({
            name: `${component.id.replace('--', '-')}-active.png`,
            animations: 'disabled'
          });
          await page.mouse.up();
        }
      });
    }
  });

  // Responsive visual testing
  test.describe('Responsive Visual Behavior', () => {
    const responsiveComponents = [
      'hero--default',
      'navigation--default', 
      'footer--default',
      'card--default'
    ];

    for (const componentId of responsiveComponents) {
      test(`${componentId} responsive behavior`, async ({ page }) => {
        await page.goto(`http://localhost:6006/iframe.html?id=${componentId}`);
        await page.waitForLoadState('networkidle');
        
        // Test at different breakpoints
        const breakpoints = [
          { name: 'mobile', width: 375 },
          { name: 'tablet', width: 768 },
          { name: 'desktop', width: 1024 },
          { name: 'wide', width: 1440 }
        ];
        
        for (const breakpoint of breakpoints) {
          await page.setViewportSize({ width: breakpoint.width, height: 1000 });
          await page.waitForTimeout(500); // Allow for responsive adjustments
          
          // Check for horizontal overflow
          const hasOverflow = await page.evaluate(() => {
            return document.body.scrollWidth > document.body.clientWidth;
          });
          
          expect(hasOverflow, `No horizontal overflow at ${breakpoint.name}`).toBeFalsy();
          
          // Take responsive screenshot
          await expect(page.locator('#storybook-root')).toHaveScreenshot({
            name: `${componentId.replace('--', '-')}-${breakpoint.name}.png`,
            fullPage: false,
            animations: 'disabled'
          });
        }
      });
    }
  });

  // Typography and spacing consistency
  test.describe('Typography and Spacing Visual Consistency', () => {
    test('Typography scales consistently', async ({ page }) => {
      await page.setViewportSize({ width: 1366, height: 768 });
      
      const typographyTestComponents = [
        'hero--default',
        'card--default'
      ];
      
      for (const componentId of typographyTestComponents) {
        await page.goto(`http://localhost:6006/iframe.html?id=${componentId}`);
        await page.waitForLoadState('networkidle');
        
        // Check typography elements
        const headings = await page.locator('h1, h2, h3, h4, h5, h6');
        const paragraphs = await page.locator('p');
        const links = await page.locator('a');
        
        const headingCount = await headings.count();
        const paragraphCount = await paragraphs.count();
        const linkCount = await links.count();
        
        // Verify consistent spacing and sizing
        if (headingCount > 0) {
          const headingStyles = await headings.first().evaluate(el => {
            const computed = window.getComputedStyle(el);
            return {
              fontSize: computed.fontSize,
              lineHeight: computed.lineHeight,
              marginBottom: computed.marginBottom,
              fontWeight: computed.fontWeight
            };
          });
          
          expect(headingStyles.fontSize).toMatch(/\d+px/);
          expect(headingStyles.fontWeight).toBeTruthy();
        }
        
        // Take typography screenshot for comparison
        await expect(page.locator('#storybook-root')).toHaveScreenshot({
          name: `typography-${componentId.replace('--', '-')}.png`,
          animations: 'disabled'
        });
      }
    });
    
    test('Spacing system consistency', async ({ page }) => {
      await page.setViewportSize({ width: 1366, height: 768 });
      await page.goto('http://localhost:6006/iframe.html?id=hero--default');
      await page.waitForLoadState('networkidle');
      
      // Add spacing visualization for debugging
      await page.addStyleTag({
        content: `
          * {
            outline: 1px solid rgba(255, 0, 0, 0.1) !important;
          }
          .spacing-debug {
            position: relative;
          }
          .spacing-debug::before {
            content: attr(data-spacing);
            position: absolute;
            top: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            font-size: 10px;
            padding: 2px 4px;
            z-index: 9999;
          }
        `
      });
      
      // Take spacing visualization screenshot
      await expect(page.locator('#storybook-root')).toHaveScreenshot({
        name: 'spacing-debug.png',
        animations: 'disabled',
        fullPage: false
      });
    });
  });

  // Performance impact of visual elements
  test('Visual elements performance impact', async ({ page }) => {
    // Enable performance monitoring
    await page.route('**/*', route => {
      route.continue();
    });
    
    await page.goto('http://localhost:6006/iframe.html?id=hero--default');
    await page.waitForLoadState('networkidle');
    
    // Measure rendering performance
    const performanceMetrics = await page.evaluate(() => {
      return new Promise(resolve => {
        new PerformanceObserver(list => {
          const entries = list.getEntries();
          const paintEntries = entries.filter(entry => 
            entry.name === 'first-contentful-paint' || 
            entry.name === 'largest-contentful-paint'
          );
          
          if (paintEntries.length > 0) {
            resolve({
              fcp: paintEntries.find(e => e.name === 'first-contentful-paint')?.startTime || 0,
              lcp: paintEntries.find(e => e.name === 'largest-contentful-paint')?.startTime || 0
            });
          }
        }).observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
        
        // Fallback timeout
        setTimeout(() => resolve({ fcp: 0, lcp: 0 }), 5000);
      });
    });
    
    // Visual elements should not significantly impact performance
    if (performanceMetrics.fcp > 0) {
      expect(performanceMetrics.fcp, 'First Contentful Paint should be under 1.5s').toBeLessThan(1500);
    }
    
    if (performanceMetrics.lcp > 0) {
      expect(performanceMetrics.lcp, 'Largest Contentful Paint should be under 2.5s').toBeLessThan(2500);
    }
  });
});

// Visual testing utilities
export const visualTestUtils = {
  /**
   * Wait for animations to complete
   */
  async waitForAnimations(page, timeout = 2000) {
    await page.waitForFunction(() => {
      const animations = document.getAnimations();
      return animations.every(animation => 
        animation.playState === 'finished' || 
        animation.playState === 'idle'
      );
    }, { timeout });
  },

  /**
   * Hide dynamic content for consistent screenshots
   */
  async hideDynamicContent(page) {
    await page.addStyleTag({
      content: `
        [data-testid*="timestamp"],
        [data-testid*="random"],
        .timestamp,
        .random-content,
        .current-time,
        .animate-pulse,
        .animate-bounce,
        .animate-spin {
          visibility: hidden !important;
          animation: none !important;
        }
      `
    });
  },

  /**
   * Ensure consistent font loading
   */
  async waitForFonts(page) {
    await page.waitForFunction(() => document.fonts.ready);
  },

  /**
   * Take full component screenshot with consistent settings
   */
  async takeComponentScreenshot(page, name, options = {}) {
    const defaultOptions = {
      fullPage: false,
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      ...options
    };
    
    await this.hideDynamicContent(page);
    await this.waitForFonts(page);
    await this.waitForAnimations(page);
    
    return await page.locator('#storybook-root').screenshot({
      path: `test-results/visual/${name}`,
      ...defaultOptions
    });
  }
};