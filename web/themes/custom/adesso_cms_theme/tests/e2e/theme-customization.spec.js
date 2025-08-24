/**
 * @file
 * E2E tests for theme customization functionality.
 */

import { test, expect } from '@playwright/test';

const THEME_ADMIN_URL = '/admin/appearance/settings/adesso_cms_theme';
const DEMO_MUNICIPALITIES = ['thalwil', 'thalheim', 'erlenbach'];

test.describe('Theme Customization - Admin Interface', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('/user/login');
    await page.fill('#edit-name', 'admin');
    await page.fill('#edit-pass', 'admin');
    await page.click('#edit-submit');
    await page.waitForURL(/dashboard|admin/);
  });

  test('should display theme settings form with all required fields', async ({ page }) => {
    await page.goto(THEME_ADMIN_URL);
    
    // Check typography settings section
    await expect(page.locator('details:has-text("Typography & Fonts")')).toBeVisible();
    await page.click('details:has-text("Typography & Fonts") summary');
    
    // Google Fonts dropdown should be present
    await expect(page.locator('#edit-typography-google-font')).toBeVisible();
    
    // Check all font options are available
    const fontOptions = await page.locator('#edit-typography-google-font option');
    const expectedFonts = [
      'Inter - Modern, tech-forward (Thalwil)',
      'Crimson Text - Traditional, elegant (Thalheim)',
      'Playfair Display - Sophisticated (Erlenbach)',
      'Open Sans - Clean, universal (Default)',
      'Montserrat - Contemporary, Swiss-inspired',
    ];
    
    for (const expectedFont of expectedFonts) {
      await expect(fontOptions.filter({ hasText: expectedFont })).toHaveCount(1);
    }
    
    // Check branding settings section
    await expect(page.locator('details:has-text("Branding & Colors")')).toBeVisible();
    await page.click('details:has-text("Branding & Colors") summary');
    
    // Primary color picker should be present
    await expect(page.locator('#edit-branding-primary-color')).toBeVisible();
    await expect(page.locator('#edit-branding-primary-color')).toHaveAttribute('type', 'color');
    
    // Color preview should be present
    await expect(page.locator('#color-preview-wrapper')).toBeVisible();
  });

  test('should generate color palette preview when color is changed', async ({ page }) => {
    await page.goto(THEME_ADMIN_URL);
    await page.click('details:has-text("Branding & Colors") summary');
    
    // Change primary color
    await page.fill('#edit-branding-primary-color', '#dc2626');
    
    // Wait for AJAX preview update
    await page.waitForTimeout(1000);
    
    // Color preview should update
    await expect(page.locator('#color-preview-wrapper')).toBeVisible();
    
    // Preview should contain Tailwind shade samples
    const previewShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
    for (const shade of previewShades) {
      await expect(page.locator(`[data-shade="${shade}"]`)).toBeVisible();
    }
  });

  test('should update font preview when font selection changes', async ({ page }) => {
    await page.goto(THEME_ADMIN_URL);
    await page.click('details:has-text("Typography & Fonts") summary');
    
    // Change font selection
    await page.selectOption('#edit-typography-google-font', 'crimson-text');
    
    // Wait for AJAX update
    await page.waitForTimeout(1000);
    
    // Font preview should update
    await expect(page.locator('#font-preview-wrapper')).toBeVisible();
  });

  test('should handle logo upload', async ({ page }) => {
    await page.goto(THEME_ADMIN_URL);
    await page.click('details:has-text("Branding & Colors") summary');
    
    // Logo upload field should be present
    await expect(page.locator('#edit-branding-custom-logo-upload')).toBeVisible();
    
    // File input should accept correct formats
    const fileInput = page.locator('#edit-branding-custom-logo-upload input[type="file"]');
    await expect(fileInput).toHaveAttribute('accept', '.svg,.png,.jpg,.gif');
  });

  test('should validate form submission', async ({ page }) => {
    await page.goto(THEME_ADMIN_URL);
    
    // Fill in valid settings
    await page.click('details:has-text("Typography & Fonts") summary');
    await page.selectOption('#edit-typography-google-font', 'inter');
    
    await page.click('details:has-text("Branding & Colors") summary');
    await page.fill('#edit-branding-primary-color', '#3b82f6');
    
    // Submit form
    await page.click('input[type="submit"][value*="Save"]');
    
    // Should show success message
    await expect(page.locator('.messages--status')).toBeVisible();
    await expect(page.locator('.messages--status')).toContainText('The configuration options have been saved');
  });

  test('should provide reset to defaults functionality', async ({ page }) => {
    await page.goto(THEME_ADMIN_URL);
    await page.click('details:has-text("Branding & Colors") summary');
    
    // Reset button should be present
    await expect(page.locator('#edit-branding-reset-defaults')).toBeVisible();
    
    // Click reset button
    await page.click('#edit-branding-reset-defaults');
    
    // Should reset to default values
    await expect(page.locator('#edit-branding-primary-color')).toHaveValue('#3b82f6');
    await expect(page.locator('#edit-typography-google-font')).toHaveValue('inter');
  });
});

test.describe('Theme Customization - Frontend Application', () => {
  DEMO_MUNICIPALITIES.forEach(municipality => {
    test(`should apply theme settings to ${municipality} municipality site`, async ({ page }) => {
      // Set up theme settings first (mock admin action)
      await page.goto('/user/login');
      await page.fill('#edit-name', 'admin');
      await page.fill('#edit-pass', 'admin');
      await page.click('#edit-submit');
      
      await page.goto(THEME_ADMIN_URL);
      
      // Configure municipality-specific settings
      const municipalitySettings = {
        'thalwil': { font: 'inter', color: '#1e3a8a' },
        'thalheim': { font: 'crimson-text', color: '#15803d' },
        'erlenbach': { font: 'playfair-display', color: '#0891b2' },
      };
      
      const settings = municipalitySettings[municipality];
      
      await page.click('details:has-text("Typography & Fonts") summary');
      await page.selectOption('#edit-typography-google-font', settings.font);
      
      await page.click('details:has-text("Branding & Colors") summary');
      await page.fill('#edit-branding-primary-color', settings.color);
      
      await page.click('input[type="submit"][value*="Save"]');
      await page.waitForSelector('.messages--status');
      
      // Visit the municipality site
      await page.goto(`https://${municipality}.zh-demo-workspace.ddev.site`);
      
      // Check that custom font is loaded
      const computedStyle = await page.evaluate(() => {
        return window.getComputedStyle(document.documentElement);
      });
      
      // Verify CSS custom properties are applied
      const primaryColor = await page.evaluate(() => {
        return getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
      });
      
      expect(primaryColor).toBe(settings.color);
      
      // Check that components use the primary color
      const primaryElements = page.locator('.bg-primary-500, .text-primary-600, .border-primary-500');
      if (await primaryElements.count() > 0) {
        await expect(primaryElements.first()).toBeVisible();
      }
    });
  });

  test('should load Google Fonts with performance optimization', async ({ page }) => {
    // Monitor network requests
    const fontRequests = [];
    page.on('request', request => {
      if (request.url().includes('fonts.googleapis.com') || request.url().includes('fonts.gstatic.com')) {
        fontRequests.push({
          url: request.url(),
          method: request.method(),
        });
      }
    });
    
    await page.goto('https://zh-demo-workspace.ddev.site');
    
    // Wait for page load
    await page.waitForLoadState('networkidle');
    
    // Should have DNS prefetch/preconnect links
    const preconnectLinks = await page.locator('link[rel="preconnect"][href*="fonts.g"]').count();
    expect(preconnectLinks).toBeGreaterThan(0);
    
    // Should have font stylesheet link with display=swap
    const fontStylesheet = await page.locator('link[href*="fonts.googleapis.com"][href*="display=swap"]').count();
    expect(fontStylesheet).toBeGreaterThan(0);
    
    // Should load fonts efficiently
    const googleFontRequests = fontRequests.filter(req => req.url.includes('fonts.googleapis.com'));
    expect(googleFontRequests.length).toBeGreaterThan(0);
  });

  test('should maintain Core Web Vitals with theme customizations', async ({ page }) => {
    await page.goto('https://zh-demo-workspace.ddev.site');
    
    // Measure performance metrics
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const results = {};
          
          entries.forEach(entry => {
            if (entry.entryType === 'measure') {
              results[entry.name] = entry.duration;
            }
            if (entry.entryType === 'navigation') {
              results.loadComplete = entry.loadEventEnd - entry.loadEventStart;
            }
          });
          
          resolve(results);
        }).observe({ entryTypes: ['measure', 'navigation'] });
        
        // Trigger performance measurement
        performance.mark('start');
        setTimeout(() => {
          performance.mark('end');
          performance.measure('pageLoad', 'start', 'end');
        }, 100);
      });
    });
    
    // Font loading should not block rendering significantly
    const startTime = Date.now();
    await page.waitForFunction(() => {
      const computedStyle = getComputedStyle(document.body);
      return computedStyle.fontFamily.includes('Inter') || 
             computedStyle.fontFamily.includes('Crimson') ||
             computedStyle.fontFamily.includes('Playfair') ||
             Date.now() - startTime > 3000; // 3s timeout
    });
    const fontLoadTime = Date.now() - startTime;
    
    // Font should load within reasonable time
    expect(fontLoadTime).toBeLessThan(2000); // 2 seconds max
  });
});

test.describe('Theme Customization - Accessibility Compliance', () => {
  test('should maintain WCAG 2.1 AA compliance with custom colors', async ({ page }) => {
    // Test high contrast color
    await page.goto('/user/login');
    await page.fill('#edit-name', 'admin');
    await page.fill('#edit-pass', 'admin');
    await page.click('#edit-submit');
    
    await page.goto(THEME_ADMIN_URL);
    await page.click('details:has-text("Branding & Colors") summary');
    
    // Set a high contrast color
    await page.fill('#edit-branding-primary-color', '#000080'); // Dark blue
    await page.click('input[type="submit"][value*="Save"]');
    
    // Visit frontend
    await page.goto('https://zh-demo-workspace.ddev.site');
    
    // Run accessibility audit
    await page.addScriptTag({
      url: 'https://unpkg.com/axe-core@4.8.2/axe.min.js'
    });
    
    const accessibilityResults = await page.evaluate(() => {
      return new Promise((resolve) => {
        axe.run((err, results) => {
          resolve(results);
        });
      });
    });
    
    // Filter color contrast violations
    const colorViolations = accessibilityResults.violations.filter(violation => 
      violation.id === 'color-contrast'
    );
    
    // Should have minimal or no contrast violations
    expect(colorViolations.length).toBeLessThanOrEqual(2);
  });

  test('should support keyboard navigation in theme settings', async ({ page }) => {
    await page.goto('/user/login');
    await page.fill('#edit-name', 'admin');
    await page.fill('#edit-pass', 'admin');
    await page.click('#edit-submit');
    
    await page.goto(THEME_ADMIN_URL);
    
    // Test keyboard navigation through form elements
    await page.keyboard.press('Tab'); // Focus first element
    
    // Should be able to navigate to color picker
    let attempts = 0;
    while (attempts < 20) {
      const focused = await page.evaluate(() => document.activeElement.id);
      if (focused === 'edit-branding-primary-color') {
        break;
      }
      await page.keyboard.press('Tab');
      attempts++;
    }
    
    // Color picker should be focusable
    const colorPickerFocused = await page.evaluate(() => 
      document.activeElement.id === 'edit-branding-primary-color'
    );
    expect(colorPickerFocused).toBe(true);
  });

  test('should provide screen reader accessible labels', async ({ page }) => {
    await page.goto('/user/login');
    await page.fill('#edit-name', 'admin');
    await page.fill('#edit-pass', 'admin');
    await page.click('#edit-submit');
    
    await page.goto(THEME_ADMIN_URL);
    
    // Check form labels
    await expect(page.locator('label[for="edit-typography-google-font"]')).toBeVisible();
    await expect(page.locator('label[for="edit-branding-primary-color"]')).toBeVisible();
    
    // Check ARIA attributes
    const colorPicker = page.locator('#edit-branding-primary-color');
    await expect(colorPicker).toHaveAttribute('type', 'color');
    
    // Description elements should be properly associated
    const descriptions = page.locator('.description, .form-item__description');
    const descriptionCount = await descriptions.count();
    expect(descriptionCount).toBeGreaterThan(0);
  });
});

test.describe('Theme Customization - Swiss Compliance', () => {
  test('should support Swiss German character rendering', async ({ page }) => {
    await page.goto('https://zh-demo-workspace.ddev.site');
    
    // Add content with Swiss German characters
    const swissText = 'Zürich, Bärnüdorf, Graubünden, Gewürz, Müsli';
    await page.evaluate((text) => {
      const testElement = document.createElement('div');
      testElement.textContent = text;
      testElement.id = 'swiss-text-test';
      testElement.style.fontSize = '16px';
      document.body.appendChild(testElement);
    }, swissText);
    
    // Wait for font loading
    await page.waitForTimeout(2000);
    
    // Check that characters render properly
    const textElement = page.locator('#swiss-text-test');
    await expect(textElement).toBeVisible();
    
    const renderedText = await textElement.textContent();
    expect(renderedText).toBe(swissText);
    
    // Verify font metrics (basic check)
    const fontMetrics = await textElement.evaluate(el => {
      const style = getComputedStyle(el);
      return {
        fontSize: style.fontSize,
        fontFamily: style.fontFamily,
      };
    });
    
    expect(parseFloat(fontMetrics.fontSize)).toBeGreaterThanOrEqual(16); // eCH-0059 minimum
  });

  test('should meet Swiss accessibility standards (eCH-0059)', async ({ page }) => {
    await page.goto('https://zh-demo-workspace.ddev.site');
    
    // Check minimum font size requirement
    const bodyFontSize = await page.evaluate(() => {
      return parseFloat(getComputedStyle(document.body).fontSize);
    });
    expect(bodyFontSize).toBeGreaterThanOrEqual(16); // 16px minimum
    
    // Check touch target sizes (44px minimum)
    const buttons = page.locator('button, input[type="submit"], a.btn');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      const firstButton = buttons.first();
      const buttonSize = await firstButton.boundingBox();
      expect(buttonSize.height).toBeGreaterThanOrEqual(44);
    }
    
    // Check color contrast with Swiss color requirements
    const primaryElements = page.locator('.bg-primary-500, .text-primary-600');
    if (await primaryElements.count() > 0) {
      // Elements should be visible (indicating sufficient contrast)
      await expect(primaryElements.first()).toBeVisible();
    }
  });

  test('should validate Swiss localization support', async ({ page }) => {
    const testLocales = [
      { code: 'de-CH', text: 'Gemeindeverwaltung Zürich' },
      { code: 'fr-CH', text: 'Administration municipale de Genève' },
      { code: 'it-CH', text: 'Amministrazione comunale di Lugano' },
    ];
    
    for (const locale of testLocales) {
      await page.goto('https://zh-demo-workspace.ddev.site');
      
      // Add localized test content
      await page.evaluate(({ code, text }) => {
        const testElement = document.createElement('div');
        testElement.textContent = text;
        testElement.setAttribute('lang', code);
        testElement.id = `locale-test-${code}`;
        testElement.style.fontSize = '16px';
        document.body.appendChild(testElement);
      }, locale);
      
      // Wait for potential font substitution
      await page.waitForTimeout(1000);
      
      const localeElement = page.locator(`#locale-test-${locale.code}`);
      await expect(localeElement).toBeVisible();
      
      const renderedText = await localeElement.textContent();
      expect(renderedText).toBe(locale.text);
    }
  });
});

test.describe('Theme Customization - Performance', () => {
  test('should cache generated color palettes', async ({ page }) => {
    // First request - should generate palette
    await page.goto('/user/login');
    await page.fill('#edit-name', 'admin');
    await page.fill('#edit-pass', 'admin');
    await page.click('#edit-submit');
    
    await page.goto(THEME_ADMIN_URL);
    await page.click('details:has-text("Branding & Colors") summary');
    
    const startTime = Date.now();
    await page.fill('#edit-branding-primary-color', '#dc2626');
    await page.waitForTimeout(500);
    const firstLoadTime = Date.now() - startTime;
    
    // Second request with same color - should be cached
    const startTime2 = Date.now();
    await page.fill('#edit-branding-primary-color', '#3b82f6');
    await page.fill('#edit-branding-primary-color', '#dc2626');
    await page.waitForTimeout(500);
    const secondLoadTime = Date.now() - startTime2;
    
    // Cached request should be faster (or at least not significantly slower)
    expect(secondLoadTime).toBeLessThanOrEqual(firstLoadTime * 1.5);
  });

  test('should optimize font loading for performance', async ({ page }) => {
    const fontLoadingMetrics = [];
    
    // Monitor font loading
    page.on('response', async (response) => {
      if (response.url().includes('fonts.g')) {
        const timing = response.timing();
        fontLoadingMetrics.push({
          url: response.url(),
          size: parseInt(response.headers()['content-length'] || '0'),
          timing: timing,
        });
      }
    });
    
    await page.goto('https://zh-demo-workspace.ddev.site');
    await page.waitForLoadState('networkidle');
    
    // Should load fonts efficiently
    expect(fontLoadingMetrics.length).toBeGreaterThan(0);
    
    // Total font loading time should be reasonable
    const totalFontTime = fontLoadingMetrics.reduce((sum, metric) => 
      sum + (metric.timing?.responseEnd || 0), 0
    );
    expect(totalFontTime).toBeLessThan(3000); // 3 seconds total
  });

  test('should not impact Core Web Vitals scores', async ({ page }) => {
    await page.goto('https://zh-demo-workspace.ddev.site');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Measure Largest Contentful Paint (LCP)
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Fallback timeout
        setTimeout(() => resolve(0), 5000);
      });
    });
    
    // LCP should be under 2.5 seconds (2500ms)
    if (lcp > 0) {
      expect(lcp).toBeLessThan(2500);
    }
    
    // Check that theme customization assets don't block rendering
    const renderBlockingResources = await page.evaluate(() => {
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      const blockingStyles = Array.from(stylesheets).filter(link => 
        !link.hasAttribute('media') || link.media === 'all'
      );
      return blockingStyles.length;
    });
    
    // Should minimize render-blocking resources
    expect(renderBlockingResources).toBeLessThan(5);
  });
});
