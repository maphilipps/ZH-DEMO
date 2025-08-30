/**
 * Cross-Browser Visual Regression Testing
 * 
 * Comprehensive visual testing across browsers and viewports
 * for Swiss municipality portal visual consistency
 */

import { test, expect, devices } from '@playwright/test';

// Visual testing configuration
const VISUAL_TEST_CONFIG = {
  // Browsers to test
  browsers: ['chromium', 'firefox', 'webkit'],
  
  // Viewports for responsive testing
  viewports: [
    { name: 'mobile', width: 375, height: 667, type: 'mobile' },
    { name: 'tablet', width: 768, height: 1024, type: 'tablet' },
    { name: 'desktop', width: 1366, height: 768, type: 'desktop' },
    { name: 'wide', width: 1920, height: 1080, type: 'desktop' }
  ],
  
  // Components for visual testing
  components: [
    // Critical UI components
    { id: 'hero--default', name: 'hero-default', critical: true },
    { id: 'hero--thalwil', name: 'hero-thalwil', critical: true },
    { id: 'hero--thalheim', name: 'hero-thalheim', critical: true },
    { id: 'hero--erlenbach', name: 'hero-erlenbach', critical: true },
    { id: 'site-header--default', name: 'site-header', critical: true },
    { id: 'site-footer--default', name: 'site-footer', critical: true },
    { id: 'main-menu--default', name: 'main-menu', critical: true },
    
    // Interactive components
    { id: 'button--primary', name: 'button-primary', critical: true },
    { id: 'button--secondary', name: 'button-secondary', critical: false },
    { id: 'card--default', name: 'card-default', critical: true },
    { id: 'accordion--default', name: 'accordion', critical: false },
    
    // Form components
    { id: 'newsletter-form--default', name: 'newsletter-form', critical: true },
    { id: 'file-upload-preview--default', name: 'file-upload', critical: true },
    
    // Swiss-specific components
    { id: 'damage-report-card--default', name: 'damage-report-card', critical: true },
    { id: 'quick-action-buttons--default', name: 'quick-actions', critical: true }
  ],
  
  // Visual comparison settings
  comparison: {
    threshold: 0.2,
    maxDiffPixels: 1000,
    animations: 'disabled',
    caret: 'hide'
  }
};

test.describe('Cross-Browser Visual Regression', () => {
  
  test.beforeEach(async ({ page }) => {
    // Configure consistent visual testing environment
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'de-CH,de;q=0.9',
      'X-Visual-Test': 'true'
    });
    
    // Disable animations and dynamic content
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-delay: -0.01ms !important;
          transition-duration: 0.01ms !important;
          transition-delay: -0.01ms !important;
          scroll-behavior: auto !important;
        }
        
        /* Hide dynamic elements */
        [data-dynamic="true"],
        .timestamp,
        .current-time,
        .animate-pulse,
        .animate-bounce,
        .animate-spin,
        [class*="animate-"] {
          visibility: hidden !important;
        }
        
        /* Stabilize fonts */
        * {
          font-display: block !important;
        }
      `
    });
    
    // Wait for fonts to load
    await page.waitForFunction(() => document.fonts.ready);
  });

  // Critical component visual testing across all browsers and viewports
  for (const component of VISUAL_TEST_CONFIG.components.filter(c => c.critical)) {
    test.describe(`${component.name} Visual Consistency`, () => {
      
      for (const viewport of VISUAL_TEST_CONFIG.viewports) {
        test(`${component.name} visual consistency at ${viewport.name}`, async ({ page, browserName }) => {
          // Set viewport
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          
          // Navigate to component
          const storyUrl = `http://localhost:6006/iframe.html?id=${component.id}`;
          await page.goto(storyUrl, { waitUntil: 'networkidle' });
          
          // Wait for component to stabilize
          await page.waitForSelector('#storybook-root > *', { timeout: 10000 });
          await page.waitForTimeout(1000); // Allow for final renders
          
          // Take screenshot with browser and viewport specific naming
          await expect(page.locator('#storybook-root')).toHaveScreenshot({
            name: `${component.name}-${viewport.name}-${browserName}.png`,
            fullPage: false,
            ...VISUAL_TEST_CONFIG.comparison
          });
        });
      }
    });
  }

  // Municipality theme visual consistency
  test.describe('Municipality Theme Visual Consistency', () => {
    const municipalities = [
      { key: 'thalwil', name: 'Thalwil', color: 'blue' },
      { key: 'thalheim', name: 'Thalheim', color: 'green' },
      { key: 'erlenbach', name: 'Erlenbach', color: 'turquoise' }
    ];

    for (const municipality of municipalities) {
      test(`${municipality.name} theme visual consistency across browsers`, async ({ page, browserName }) => {
        await page.setViewportSize({ width: 1366, height: 768 });
        
        // Test hero with municipality theme
        await page.goto(`http://localhost:6006/iframe.html?id=hero--${municipality.key}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1500);
        
        // Verify theme application
        const hasThemeClass = await page.evaluate((munKey) => {
          const elements = document.querySelectorAll(`[class*="${munKey}"], [data-municipality="${munKey}"]`);
          return elements.length > 0;
        }, municipality.key);
        
        if (!hasThemeClass) {
          console.warn(`⚠️  Municipality theme class not found for ${municipality.name}`);
        }
        
        // Take themed screenshot
        await expect(page.locator('#storybook-root')).toHaveScreenshot({
          name: `municipality-${municipality.key}-${browserName}.png`,
          fullPage: false,
          ...VISUAL_TEST_CONFIG.comparison
        });
      });
    }
  });

  // Interactive state visual testing
  test.describe('Interactive States Visual Testing', () => {
    const interactiveComponents = [
      { id: 'button--primary', selector: 'button', states: ['default', 'hover', 'focus', 'active'] },
      { id: 'button--secondary', selector: 'button', states: ['default', 'hover', 'focus'] },
      { id: 'newsletter-form--default', selector: 'input[type="email"]', states: ['default', 'focus', 'filled'] },
      { id: 'main-menu--default', selector: 'a', states: ['default', 'hover', 'focus'] }
    ];

    for (const component of interactiveComponents) {
      test.describe(`${component.id} Interactive States`, () => {
        
        for (const state of component.states) {
          test(`${component.id} ${state} state visual`, async ({ page, browserName }) => {
            await page.setViewportSize({ width: 1366, height: 768 });
            await page.goto(`http://localhost:6006/iframe.html?id=${component.id}`);
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(500);
            
            const element = page.locator(component.selector).first();
            await expect(element).toBeVisible();
            
            // Apply the specific state
            switch (state) {
              case 'hover':
                await element.hover();
                await page.waitForTimeout(200);
                break;
                
              case 'focus':
                await element.focus();
                await page.waitForTimeout(200);
                break;
                
              case 'active':
                await element.focus();
                await page.mouse.down();
                await page.waitForTimeout(100);
                break;
                
              case 'filled':
                if (component.selector.includes('input')) {
                  await element.fill('test@municipality.ch');
                  await page.waitForTimeout(200);
                }
                break;
                
              default: // default state
                break;
            }
            
            // Take state-specific screenshot
            await expect(page.locator('#storybook-root')).toHaveScreenshot({
              name: `${component.id.replace('--', '-')}-${state}-${browserName}.png`,
              fullPage: false,
              ...VISUAL_TEST_CONFIG.comparison
            });
            
            // Clean up active state
            if (state === 'active') {
              await page.mouse.up();
            }
          });
        }
      });
    }
  });

  // Responsive visual behavior validation
  test.describe('Responsive Visual Behavior', () => {
    const responsiveComponents = [
      'hero--default',
      'site-header--default',
      'main-menu--default',
      'card--default',
      'site-footer--default'
    ];

    for (const componentId of responsiveComponents) {
      test(`${componentId} responsive visual behavior`, async ({ page, browserName }) => {
        await page.goto(`http://localhost:6006/iframe.html?id=${componentId}`);
        await page.waitForLoadState('networkidle');
        
        // Test across different breakpoints
        const breakpoints = [
          { name: 'xs', width: 320, height: 568 }, // Small mobile
          { name: 'sm', width: 640, height: 1136 }, // Mobile
          { name: 'md', width: 768, height: 1024 }, // Tablet
          { name: 'lg', width: 1024, height: 768 }, // Small desktop
          { name: 'xl', width: 1280, height: 800 }, // Desktop
          { name: '2xl', width: 1536, height: 864 } // Large desktop
        ];
        
        for (const breakpoint of breakpoints) {
          await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
          await page.waitForTimeout(300); // Allow for responsive adjustments
          
          // Check for horizontal overflow
          const hasOverflow = await page.evaluate(() => {
            return document.body.scrollWidth > document.body.clientWidth;
          });
          
          expect(hasOverflow, `No horizontal overflow at ${breakpoint.name} (${breakpoint.width}px)`).toBeFalsy();
          
          // Take responsive screenshot
          await expect(page.locator('#storybook-root')).toHaveScreenshot({
            name: `${componentId.replace('--', '-')}-${breakpoint.name}-${browserName}.png`,
            fullPage: false,
            ...VISUAL_TEST_CONFIG.comparison
          });
        }
      });
    }
  });

  // Typography and spacing visual consistency
  test.describe('Typography and Spacing Visual Consistency', () => {
    const typographyComponents = [
      'hero--default',
      'card--default',
      'site-header--default'
    ];

    test('Typography consistency across browsers', async ({ page, browserName }) => {
      await page.setViewportSize({ width: 1366, height: 768 });
      
      for (const componentId of typographyComponents) {
        await page.goto(`http://localhost:6006/iframe.html?id=${componentId}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);
        
        // Add typography debugging visualization
        await page.addStyleTag({
          content: `
            h1, h2, h3, h4, h5, h6 {
              position: relative;
            }
            h1::after, h2::after, h3::after, h4::after, h5::after, h6::after {
              content: attr(data-font-size) ' / ' attr(data-line-height);
              position: absolute;
              top: -20px;
              right: 0;
              font-size: 10px;
              background: rgba(0, 0, 0, 0.7);
              color: white;
              padding: 2px 4px;
              border-radius: 2px;
              z-index: 1000;
            }
          `
        });
        
        // Add font metrics data attributes
        await page.evaluate(() => {
          const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
          headings.forEach(heading => {
            const computed = window.getComputedStyle(heading);
            heading.setAttribute('data-font-size', computed.fontSize);
            heading.setAttribute('data-line-height', computed.lineHeight);
          });
        });
        
        // Take typography screenshot
        await expect(page.locator('#storybook-root')).toHaveScreenshot({
          name: `typography-${componentId.replace('--', '-')}-${browserName}.png`,
          fullPage: false,
          ...VISUAL_TEST_CONFIG.comparison
        });
      }
    });

    test('Spacing consistency visualization', async ({ page, browserName }) => {
      await page.setViewportSize({ width: 1366, height: 768 });
      await page.goto('http://localhost:6006/iframe.html?id=hero--default');
      await page.waitForLoadState('networkidle');
      
      // Add spacing visualization
      await page.addStyleTag({
        content: `
          * {
            outline: 1px solid rgba(255, 0, 0, 0.1) !important;
          }
          .p-2, .p-4, .p-6, .p-8, .m-2, .m-4, .m-6, .m-8,
          [class*="p-"], [class*="m-"], [class*="space-"],
          [class*="gap-"], [class*="px-"], [class*="py-"],
          [class*="pt-"], [class*="pb-"], [class*="pl-"], [class*="pr-"],
          [class*="mt-"], [class*="mb-"], [class*="ml-"], [class*="mr-"] {
            position: relative;
          }
          .spacing-debug {
            background: rgba(0, 255, 0, 0.1) !important;
          }
          .spacing-debug::before {
            content: 'SPACING';
            position: absolute;
            top: -15px;
            left: 0;
            font-size: 9px;
            background: rgba(0, 255, 0, 0.8);
            color: white;
            padding: 1px 3px;
            border-radius: 2px;
            z-index: 1001;
          }
        `
      });
      
      // Mark elements with spacing classes
      await page.evaluate(() => {
        const spacingElements = document.querySelectorAll('[class*="p-"], [class*="m-"], [class*="space-"], [class*="gap-"]');
        spacingElements.forEach(el => el.classList.add('spacing-debug'));
      });
      
      await expect(page.locator('#storybook-root')).toHaveScreenshot({
        name: `spacing-debug-${browserName}.png`,
        fullPage: false,
        ...VISUAL_TEST_CONFIG.comparison
      });
    });
  });

  // Dark mode and color scheme visual testing
  test.describe('Color Scheme Visual Testing', () => {
    const colorSchemes = ['light', 'dark'];
    const colorSchemeComponents = [
      'hero--default',
      'site-header--default', 
      'card--default',
      'button--primary'
    ];

    for (const scheme of colorSchemes) {
      test(`Components in ${scheme} mode visual consistency`, async ({ page, browserName }) => {
        // Set color scheme
        await page.emulateMedia({ colorScheme: scheme });
        await page.setViewportSize({ width: 1366, height: 768 });
        
        for (const componentId of colorSchemeComponents) {
          await page.goto(`http://localhost:6006/iframe.html?id=${componentId}`);
          await page.waitForLoadState('networkidle');
          await page.waitForTimeout(500);
          
          // Take color scheme screenshot
          await expect(page.locator('#storybook-root')).toHaveScreenshot({
            name: `${componentId.replace('--', '-')}-${scheme}-${browserName}.png`,
            fullPage: false,
            ...VISUAL_TEST_CONFIG.comparison
          });
        }
      });
    }
  });

  // Cross-browser rendering consistency validation
  test('Cross-browser rendering consistency check', async ({ page, browserName }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    
    // Test a representative component
    await page.goto('http://localhost:6006/iframe.html?id=hero--default');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Check CSS feature support that affects rendering
    const renderingFeatures = await page.evaluate(() => {
      const features = {
        cssGrid: CSS.supports('display', 'grid'),
        cssFlexbox: CSS.supports('display', 'flex'),
        cssCustomProperties: CSS.supports('color', 'var(--test)'),
        cssClamp: CSS.supports('width', 'clamp(1rem, 5vw, 2rem)'),
        cssLogicalProperties: CSS.supports('margin-inline-start', '1rem'),
        webpSupport: false, // Will be tested separately
        avifSupport: false
      };
      
      // Test image format support
      const canvas = document.createElement('canvas');
      if (canvas.getContext && canvas.getContext('2d')) {
        features.webpSupport = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      }
      
      return features;
    });
    
    // Log rendering capabilities for analysis
    console.log(`Rendering features on ${browserName}:`, renderingFeatures);
    
    // Take baseline screenshot for visual comparison
    await expect(page.locator('#storybook-root')).toHaveScreenshot({
      name: `baseline-rendering-${browserName}.png`,
      fullPage: false,
      ...VISUAL_TEST_CONFIG.comparison
    });
    
    // Critical features should be supported for consistent rendering
    expect(renderingFeatures.cssGrid, 'CSS Grid support required for layout').toBe(true);
    expect(renderingFeatures.cssFlexbox, 'CSS Flexbox support required for layout').toBe(true);
    expect(renderingFeatures.cssCustomProperties, 'CSS Custom Properties required for theming').toBe(true);
  });
});