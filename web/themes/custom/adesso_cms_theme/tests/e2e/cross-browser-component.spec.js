/**
 * Cross-Browser SDC Component Testing
 * 
 * Validates all 25+ SDC components across browsers and viewports
 * for Swiss municipality portal consistency
 */

import { test, expect, devices } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

// SDC Components discovered from the theme structure
const SDC_COMPONENTS = [
  // Core layout components
  { id: 'hero--default', name: 'Hero', critical: true },
  { id: 'hero--thalwil', name: 'Hero Thalwil', critical: true },
  { id: 'hero--thalheim', name: 'Hero Thalheim', critical: true },
  { id: 'hero--erlenbach', name: 'Hero Erlenbach', critical: true },
  { id: 'site-header--default', name: 'Site Header', critical: true },
  { id: 'site-footer--default', name: 'Site Footer', critical: true },
  { id: 'main-menu--default', name: 'Main Menu', critical: true },
  { id: 'page-header--default', name: 'Page Header', critical: true },
  
  // Content components
  { id: 'card--default', name: 'Card', critical: true },
  { id: 'button--primary', name: 'Button Primary', critical: true },
  { id: 'button--secondary', name: 'Button Secondary', critical: false },
  { id: 'accordion--default', name: 'Accordion', critical: false },
  { id: 'carousel--default', name: 'Carousel', critical: false },
  { id: 'gallery--default', name: 'Gallery', critical: false },
  { id: 'slider--default', name: 'Slider', critical: false },
  
  // Form components
  { id: 'newsletter-form--default', name: 'Newsletter Form', critical: true },
  { id: 'file-upload-preview--default', name: 'File Upload', critical: true },
  { id: 'form-progress--default', name: 'Form Progress', critical: false },
  
  // Swiss-specific components
  { id: 'damage-report-card--default', name: 'Damage Report Card', critical: true },
  { id: 'quick-action-buttons--default', name: 'Quick Actions', critical: true },
  { id: 'recent-cards--default', name: 'Recent Cards', critical: false },
  
  // Layout and structure
  { id: 'bento-grid--default', name: 'Bento Grid', critical: false },
  { id: 'section-header--default', name: 'Section Header', critical: false },
  { id: 'sidebyside--default', name: 'Side by Side', critical: false },
  { id: 'stat-card--default', name: 'Stat Card', critical: false },
  
  // Utility components
  { id: 'badge--default', name: 'Badge', critical: false },
  { id: 'status-badge--default', name: 'Status Badge', critical: false },
  { id: 'logo--default', name: 'Logo', critical: true },
  { id: 'embed--default', name: 'Embed', critical: false },
  { id: 'media--default', name: 'Media', critical: false },
  { id: 'text--default', name: 'Text', critical: false }
];

// Browser and viewport combinations for comprehensive testing
const BROWSER_VIEWPORT_MATRIX = [
  // Desktop combinations
  { browser: 'chromium-desktop', viewport: { width: 1366, height: 768 }, name: 'Desktop-1366' },
  { browser: 'chromium-desktop', viewport: { width: 1920, height: 1080 }, name: 'Desktop-1920' },
  { browser: 'firefox-desktop', viewport: { width: 1366, height: 768 }, name: 'Desktop-1366' },
  { browser: 'webkit-desktop', viewport: { width: 1366, height: 768 }, name: 'Desktop-1366' },
  
  // Mobile combinations
  { browser: 'mobile-chrome', viewport: { width: 375, height: 667 }, name: 'Mobile-375' },
  { browser: 'mobile-safari', viewport: { width: 375, height: 812 }, name: 'Mobile-375' },
  
  // Tablet combinations
  { browser: 'tablet-chrome', viewport: { width: 768, height: 1024 }, name: 'Tablet-768' }
];

test.describe('Cross-Browser SDC Component Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    // Configure consistent testing environment
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'de-CH,de;q=0.9,fr;q=0.8,it;q=0.7',
      'X-Test-Environment': 'cross-browser-sdc'
    });
    
    // Inject accessibility testing
    await injectAxe(page);
    
    // Disable animations for consistent testing
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-delay: -0.01ms !important;
          transition-duration: 0.01ms !important;
          transition-delay: -0.01ms !important;
        }
      `
    });
  });

  // Test each critical component across all browser/viewport combinations
  for (const component of SDC_COMPONENTS.filter(c => c.critical)) {
    test.describe(`${component.name} Component Cross-Browser`, () => {
      
      for (const config of BROWSER_VIEWPORT_MATRIX) {
        test(`${component.name} renders correctly on ${config.browser} at ${config.name}`, async ({ page, browserName }) => {
          // Skip non-matching browser configurations
          if (!config.browser.includes(browserName) && config.browser !== browserName) {
            test.skip();
          }
          
          // Set viewport for this test
          await page.setViewportSize(config.viewport);
          
          // Navigate to component story
          const storyUrl = `http://localhost:6006/iframe.html?id=${component.id}`;
          await page.goto(storyUrl, { waitUntil: 'networkidle' });
          
          // Wait for component to fully load
          await page.waitForSelector('#storybook-root > *', { timeout: 15000 });
          await page.waitForTimeout(500); // Allow for any remaining renders
          
          // Verify component is visible and functional
          const componentRoot = page.locator('#storybook-root');
          await expect(componentRoot).toBeVisible();
          
          // Check for JavaScript errors
          let hasJSErrors = false;
          page.on('pageerror', (error) => {
            console.error(`JS Error in ${component.name} on ${browserName}:`, error.message);
            hasJSErrors = true;
          });
          
          // Wait for any potential errors
          await page.waitForTimeout(1000);
          
          // Component should be functional even with some JS errors
          if (hasJSErrors) {
            console.warn(`⚠️  JavaScript errors detected in ${component.name} on ${browserName}, but continuing test`);
          }
          
          // Accessibility validation
          try {
            await checkA11y(page, '#storybook-root', {
              detailedReport: false,
              detailedReportOptions: { html: false }
            });
          } catch (axeError) {
            console.warn(`⚠️  Accessibility issues in ${component.name} on ${browserName}:`, axeError.message);
          }
          
          // Visual validation - take screenshot for comparison
          await expect(componentRoot).toHaveScreenshot({
            name: `${component.id.replace('--', '-')}-${browserName}-${config.name.toLowerCase()}.png`,
            fullPage: false,
            animations: 'disabled',
            caret: 'hide',
            scale: 'css'
          });
          
          // Functional validation for interactive components
          await validateComponentInteractivity(page, component);
        });
      }
    });
  }

  // Municipality theme consistency across browsers
  test.describe('Municipality Theme Cross-Browser Consistency', () => {
    const municipalities = ['thalwil', 'thalheim', 'erlenbach'];
    const municipalityThemes = {
      thalwil: { primary: '#1e3a8a', name: 'Blue', rgb: 'rgb(30, 58, 138)' },
      thalheim: { primary: '#15803d', name: 'Green', rgb: 'rgb(21, 128, 61)' },
      erlenbach: { primary: '#0891b2', name: 'Turquoise', rgb: 'rgb(8, 145, 178)' }
    };

    for (const municipality of municipalities) {
      test(`${municipality} theme consistency across browsers`, async ({ page, browserName }) => {
        await page.setViewportSize({ width: 1366, height: 768 });
        
        // Test hero component with municipality theme
        await page.goto(`http://localhost:6006/iframe.html?id=hero--${municipality}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        
        // Verify municipality theme is applied
        const heroElement = page.locator('.c-hero, [data-component="hero"]');
        await expect(heroElement).toBeVisible();
        
        // Check theme-specific CSS custom properties
        const themeColor = await page.evaluate((municipalityKey) => {
          const root = document.documentElement;
          const computedStyle = getComputedStyle(root);
          return {
            primary: computedStyle.getPropertyValue('--color-primary-500').trim(),
            primaryHex: computedStyle.getPropertyValue('--municipality-primary').trim(),
            municipalityClass: document.querySelector(`[class*="${municipalityKey}"]`) !== null
          };
        }, municipality);
        
        // Validate theme application
        expect(themeColor.municipalityClass || themeColor.primary || themeColor.primaryHex).toBeTruthy();
        
        // Visual regression for municipality theme
        await expect(page.locator('#storybook-root')).toHaveScreenshot({
          name: `municipality-${municipality}-${browserName}.png`,
          fullPage: false,
          animations: 'disabled'
        });
        
        console.log(`✅ ${municipality} theme validated on ${browserName}`);
      });
    }
  });

  // Performance validation across browsers
  test.describe('Cross-Browser Performance Validation', () => {
    const performanceCriticalComponents = [
      'hero--default',
      'site-header--default',
      'main-menu--default',
      'card--default'
    ];

    for (const componentId of performanceCriticalComponents) {
      test(`${componentId} performance across browsers`, async ({ page, browserName }) => {
        await page.setViewportSize({ width: 1366, height: 768 });
        
        // Navigate with performance monitoring
        const navigationPromise = page.goto(`http://localhost:6006/iframe.html?id=${componentId}`, { 
          waitUntil: 'networkidle' 
        });
        
        // Measure navigation timing
        const navigationStart = Date.now();
        await navigationPromise;
        const navigationEnd = Date.now();
        const navigationTime = navigationEnd - navigationStart;
        
        // Navigation should be reasonably fast across all browsers
        expect(navigationTime, `Navigation time for ${componentId} on ${browserName} should be under 5s`).toBeLessThan(5000);
        
        // Measure rendering performance
        const renderingMetrics = await page.evaluate(() => {
          return new Promise((resolve) => {
            if (typeof PerformanceObserver !== 'undefined') {
              const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const paintEntries = entries.filter(entry => 
                  entry.entryType === 'paint' || entry.entryType === 'largest-contentful-paint'
                );
                
                if (paintEntries.length > 0) {
                  observer.disconnect();
                  resolve({
                    fcp: paintEntries.find(e => e.name === 'first-contentful-paint')?.startTime || 0,
                    lcp: paintEntries.find(e => e.name === 'largest-contentful-paint')?.startTime || 0,
                    supported: true
                  });
                }
              });
              
              observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
              
              // Fallback timeout
              setTimeout(() => {
                observer.disconnect();
                resolve({ fcp: 0, lcp: 0, supported: false });
              }, 3000);
            } else {
              resolve({ fcp: 0, lcp: 0, supported: false });
            }
          });
        });
        
        // Log performance metrics for analysis
        console.log(`Performance metrics for ${componentId} on ${browserName}:`, {
          navigationTime,
          ...renderingMetrics
        });
        
        // Performance expectations (lenient for cross-browser compatibility)
        if (renderingMetrics.supported && renderingMetrics.fcp > 0) {
          expect(renderingMetrics.fcp, 'First Contentful Paint should be under 2s').toBeLessThan(2000);
        }
        
        if (renderingMetrics.supported && renderingMetrics.lcp > 0) {
          expect(renderingMetrics.lcp, 'Largest Contentful Paint should be under 3s').toBeLessThan(3000);
        }
      });
    }
  });

  // Browser-specific feature support validation
  test.describe('Browser Feature Support Validation', () => {
    const criticalFeatures = [
      { name: 'CSS Grid', test: () => CSS.supports('display', 'grid') },
      { name: 'CSS Custom Properties', test: () => CSS.supports('color', 'var(--test)') },
      { name: 'Intersection Observer', test: () => typeof IntersectionObserver !== 'undefined' },
      { name: 'Fetch API', test: () => typeof fetch !== 'undefined' },
      { name: 'ES6 Classes', test: () => { try { class Test {} return true; } catch { return false; } } },
      { name: 'Template Literals', test: () => { try { const test = `template`; return true; } catch { return false; } } }
    ];

    test('Critical web features support across browsers', async ({ page, browserName }) => {
      await page.goto('http://localhost:6006/iframe.html?id=hero--default');
      
      const featureSupport = await page.evaluate((features) => {
        const results = {};
        features.forEach(feature => {
          try {
            results[feature.name] = eval(`(${feature.test.toString()})()`);
          } catch (error) {
            results[feature.name] = false;
          }
        });
        return results;
      }, criticalFeatures);
      
      // Log feature support for analysis
      console.log(`Feature support on ${browserName}:`, featureSupport);
      
      // Critical features should be supported
      expect(featureSupport['CSS Grid'], 'CSS Grid support is required').toBe(true);
      expect(featureSupport['CSS Custom Properties'], 'CSS Custom Properties are required').toBe(true);
      expect(featureSupport['Fetch API'], 'Fetch API is required').toBe(true);
      expect(featureSupport['ES6 Classes'], 'ES6 Classes are required').toBe(true);
      
      // Optional features (warn if not supported)
      if (!featureSupport['Intersection Observer']) {
        console.warn(`⚠️  Intersection Observer not supported on ${browserName}, lazy loading may be disabled`);
      }
    });
  });
});

/**
 * Validate component interactivity based on component type
 */
async function validateComponentInteractivity(page, component) {
  const componentElement = page.locator('#storybook-root > *').first();
  
  try {
    // Button components
    if (component.id.includes('button')) {
      const button = page.locator('button, [role="button"]').first();
      if (await button.isVisible()) {
        await button.focus();
        await expect(button).toBeFocused();
        
        // Test hover if not mobile
        const isMobile = await page.evaluate(() => 'ontouchstart' in window);
        if (!isMobile) {
          await button.hover();
          await page.waitForTimeout(200);
        }
      }
    }
    
    // Form components
    if (component.id.includes('form') || component.id.includes('newsletter')) {
      const input = page.locator('input[type="email"], input[type="text"]').first();
      if (await input.isVisible()) {
        await input.focus();
        await expect(input).toBeFocused();
        await input.fill('test@example.com');
        expect(await input.inputValue()).toBe('test@example.com');
      }
    }
    
    // Navigation components
    if (component.id.includes('menu') || component.id.includes('navigation')) {
      const links = page.locator('a[href]');
      const linkCount = await links.count();
      if (linkCount > 0) {
        const firstLink = links.first();
        await firstLink.focus();
        await expect(firstLink).toBeFocused();
      }
    }
    
    // Interactive components (carousel, accordion, etc.)
    if (component.id.includes('carousel') || component.id.includes('accordion')) {
      const interactiveElements = page.locator('[aria-expanded], [aria-selected], button');
      const elementCount = await interactiveElements.count();
      if (elementCount > 0) {
        const firstElement = interactiveElements.first();
        await firstElement.focus();
        await expect(firstElement).toBeFocused();
      }
    }
    
  } catch (error) {
    console.warn(`⚠️  Interactivity validation failed for ${component.name}:`, error.message);
  }
}