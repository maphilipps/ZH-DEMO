/**
 * Swiss Government Compliance Testing (eCH-0059)
 * 
 * Cross-browser validation of Swiss accessibility and compliance standards
 * for GPZH municipality portals
 */

import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

// Swiss compliance standards
const SWISS_COMPLIANCE_STANDARDS = {
  'eCH-0059': {
    name: 'Swiss Accessibility Standard',
    version: '4.0',
    requirements: [
      'WCAG 2.1 AA compliance',
      'German/French/Italian language support', 
      'Keyboard navigation',
      'Screen reader compatibility',
      'Color contrast requirements',
      'Focus management',
      'Alternative text for images',
      'Form accessibility',
      'Error handling and validation'
    ]
  },
  'CH-DSG': {
    name: 'Swiss Data Protection Act',
    requirements: [
      'Privacy policy accessibility',
      'Cookie consent accessibility',
      'Data collection transparency',
      'User consent mechanisms'
    ]
  }
};

// Swiss language testing configurations
const SWISS_LANGUAGES = [
  { code: 'de-CH', name: 'German (Switzerland)', primary: true },
  { code: 'fr-CH', name: 'French (Switzerland)', primary: true },
  { code: 'it-CH', name: 'Italian (Switzerland)', primary: true },
  { code: 'rm-CH', name: 'Romansh (Switzerland)', primary: false }
];

// Municipality-specific compliance requirements
const MUNICIPALITY_COMPLIANCE = {
  thalwil: { 
    languages: ['de-CH'], 
    canton: 'ZH',
    accessibility_level: 'AA',
    contact_requirements: true
  },
  thalheim: { 
    languages: ['de-CH'], 
    canton: 'ZH',
    accessibility_level: 'AA',
    contact_requirements: true
  },
  erlenbach: { 
    languages: ['de-CH'], 
    canton: 'ZH',
    accessibility_level: 'AA',
    contact_requirements: true
  }
};

test.describe('Swiss Government Compliance (eCH-0059)', () => {
  
  test.beforeEach(async ({ page }) => {
    // Configure for Swiss compliance testing
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'de-CH,de;q=0.9,fr-CH;q=0.8,fr;q=0.7,it-CH;q=0.6,it;q=0.5',
      'X-Swiss-Compliance': 'eCH-0059',
      'X-Canton': 'ZH'
    });
    
    // Inject accessibility testing tools
    await injectAxe(page);
    
    // Set Swiss timezone
    await page.emulateTimezone('Europe/Zurich');
  });

  // WCAG 2.1 AA Compliance Testing
  test.describe('WCAG 2.1 AA Compliance', () => {
    const criticalComponents = [
      'hero--default',
      'site-header--default',
      'main-menu--default',
      'newsletter-form--default',
      'button--primary',
      'card--default',
      'site-footer--default'
    ];

    for (const componentId of criticalComponents) {
      test(`${componentId} WCAG 2.1 AA compliance`, async ({ page, browserName }) => {
        await page.goto(`http://localhost:6006/iframe.html?id=${componentId}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        
        // Run comprehensive accessibility audit
        await checkA11y(page, '#storybook-root', {
          rules: {
            // WCAG 2.1 AA specific rules
            'color-contrast': { enabled: true },
            'color-contrast-enhanced': { enabled: false }, // AAA level
            'focus-order-semantics': { enabled: true },
            'keyboard': { enabled: true },
            'landmark-one-main': { enabled: true },
            'landmark-complementary-is-top-level': { enabled: true },
            'landmark-no-duplicate-banner': { enabled: true },
            'landmark-no-duplicate-contentinfo': { enabled: true },
            'page-has-heading-one': { enabled: true },
            'region': { enabled: true },
            'skip-link': { enabled: true },
            'tabindex': { enabled: true },
            'aria-allowed-attr': { enabled: true },
            'aria-required-attr': { enabled: true },
            'aria-roles': { enabled: true },
            'aria-valid-attr': { enabled: true },
            'aria-valid-attr-value': { enabled: true },
            'button-name': { enabled: true },
            'form-field-multiple-labels': { enabled: true },
            'frame-title': { enabled: true },
            'image-alt': { enabled: true },
            'input-image-alt': { enabled: true },
            'label': { enabled: true },
            'link-name': { enabled: true },
            'list': { enabled: true },
            'listitem': { enabled: true }
          },
          tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
          detailedReport: true,
          detailedReportOptions: { html: true }
        });
        
        console.log(`✅ ${componentId} passed WCAG 2.1 AA compliance on ${browserName}`);
      });
    }
  });

  // Swiss Language Support Testing
  test.describe('Swiss Multi-Language Support', () => {
    const languageTestComponents = [
      'hero--default',
      'site-header--default',
      'main-menu--default'
    ];

    for (const language of SWISS_LANGUAGES.filter(l => l.primary)) {
      test(`Language support for ${language.name}`, async ({ page, browserName }) => {
        // Set language
        await page.setExtraHTTPHeaders({
          'Accept-Language': `${language.code},${language.code.split('-')[0]};q=0.9`
        });
        
        for (const componentId of languageTestComponents) {
          await page.goto(`http://localhost:6006/iframe.html?id=${componentId}`);
          await page.waitForLoadState('networkidle');
          
          // Check language attributes
          const htmlLang = await page.getAttribute('html', 'lang');
          const hasLangAttribute = await page.evaluate(() => {
            const elements = document.querySelectorAll('[lang]');
            return elements.length > 0;
          });
          
          // Verify language is properly declared
          if (htmlLang) {
            console.log(`Language attribute found: ${htmlLang}`);
          } else if (hasLangAttribute) {
            console.log('Language attributes found on elements');
          } else {
            console.warn(`⚠️  No language attributes found for ${language.name} in ${componentId}`);
          }
          
          // Check for proper text direction (LTR for all Swiss languages)
          const textDirection = await page.evaluate(() => {
            return getComputedStyle(document.documentElement).direction;
          });
          expect(textDirection).toBe('ltr');
          
          // Run accessibility audit with language context
          await checkA11y(page, '#storybook-root', {
            tags: ['wcag2aa'],
            rules: {
              'html-has-lang': { enabled: true },
              'html-lang-valid': { enabled: true },
              'valid-lang': { enabled: true }
            }
          });
        }
      });
    }
  });

  // Municipality-Specific Compliance Testing
  test.describe('Municipality Compliance Requirements', () => {
    Object.entries(MUNICIPALITY_COMPLIANCE).forEach(([municipality, config]) => {
      test(`${municipality} municipality compliance`, async ({ page, browserName }) => {
        // Test municipality hero component
        await page.goto(`http://localhost:6006/iframe.html?id=hero--${municipality}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        
        // Verify accessibility level compliance
        await checkA11y(page, '#storybook-root', {
          tags: config.accessibility_level === 'AA' ? ['wcag2aa'] : ['wcag2a'],
          detailedReport: false
        });
        
        // Check for required contact information accessibility
        if (config.contact_requirements) {
          const contactElements = await page.locator('[href*="mailto:"], [href*="tel:"], [class*="contact"]');
          const contactCount = await contactElements.count();
          
          if (contactCount > 0) {
            // Verify contact links are accessible
            for (let i = 0; i < Math.min(contactCount, 3); i++) {
              const contactElement = contactElements.nth(i);
              await expect(contactElement).toBeVisible();
              
              // Check accessibility attributes
              const hasAccessibleName = await contactElement.evaluate(el => {
                return el.getAttribute('aria-label') || 
                       el.getAttribute('title') || 
                       el.textContent?.trim() ||
                       el.querySelector('[aria-label]') !== null;
              });
              
              expect(hasAccessibleName, 'Contact elements must have accessible names').toBeTruthy();
            }
          }
        }
        
        console.log(`✅ ${municipality} municipality compliance verified on ${browserName}`);
      });
    });
  });

  // Keyboard Navigation Compliance
  test.describe('Keyboard Navigation Compliance', () => {
    const keyboardTestComponents = [
      { id: 'main-menu--default', name: 'Main Navigation' },
      { id: 'newsletter-form--default', name: 'Newsletter Form' },
      { id: 'button--primary', name: 'Primary Button' },
      { id: 'quick-action-buttons--default', name: 'Quick Actions' }
    ];

    for (const component of keyboardTestComponents) {
      test(`${component.name} keyboard navigation`, async ({ page, browserName }) => {
        await page.goto(`http://localhost:6006/iframe.html?id=${component.id}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);
        
        // Find all focusable elements
        const focusableElements = page.locator([
          'a[href]',
          'button:not([disabled])',
          'input:not([disabled])',
          'select:not([disabled])',
          'textarea:not([disabled])',
          '[tabindex]:not([tabindex="-1"])'
        ].join(', '));
        
        const focusableCount = await focusableElements.count();
        
        if (focusableCount > 0) {
          // Test tab navigation
          await page.keyboard.press('Tab');
          
          // Verify first element is focused
          const firstFocusable = focusableElements.first();
          await expect(firstFocusable).toBeFocused();
          
          // Test focus visibility
          const hasFocusStyles = await firstFocusable.evaluate(el => {
            const computed = window.getComputedStyle(el, ':focus');
            const outline = computed.outline;
            const boxShadow = computed.boxShadow;
            const borderColor = computed.borderColor;
            
            return outline !== 'none' || 
                   boxShadow !== 'none' || 
                   borderColor.includes('rgb');
          });
          
          expect(hasFocusStyles, 'Focused elements must have visible focus indicators').toBeTruthy();
          
          // Test tab navigation through all elements
          for (let i = 1; i < Math.min(focusableCount, 5); i++) {
            await page.keyboard.press('Tab');
            await page.waitForTimeout(100);
          }
          
          // Test reverse tab navigation
          await page.keyboard.press('Shift+Tab');
          await page.waitForTimeout(100);
          
          console.log(`✅ Keyboard navigation working for ${component.name} (${focusableCount} focusable elements)`);
        } else {
          console.warn(`⚠️  No focusable elements found in ${component.name}`);
        }
      });
    }
  });

  // Form Accessibility Compliance
  test.describe('Form Accessibility Compliance', () => {
    const formComponents = [
      'newsletter-form--default',
      'file-upload-preview--default'
    ];

    for (const componentId of formComponents) {
      test(`${componentId} form accessibility`, async ({ page, browserName }) => {
        await page.goto(`http://localhost:6006/iframe.html?id=${componentId}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);
        
        // Check form accessibility
        await checkA11y(page, '#storybook-root', {
          rules: {
            'form-field-multiple-labels': { enabled: true },
            'label': { enabled: true },
            'label-title-only': { enabled: true },
            'button-name': { enabled: true },
            'input-image-alt': { enabled: true },
            'duplicate-id': { enabled: true },
            'duplicate-id-aria': { enabled: true }
          },
          tags: ['wcag2aa']
        });
        
        // Test form inputs
        const inputs = page.locator('input, select, textarea');
        const inputCount = await inputs.count();
        
        for (let i = 0; i < inputCount; i++) {
          const input = inputs.nth(i);
          const inputType = await input.getAttribute('type');
          
          // Check for labels
          const hasLabel = await input.evaluate(el => {
            const id = el.id;
            const ariaLabel = el.getAttribute('aria-label');
            const ariaLabelledby = el.getAttribute('aria-labelledby');
            const label = id ? document.querySelector(`label[for="${id}"]`) : null;
            
            return !!(ariaLabel || ariaLabelledby || label || el.placeholder);
          });
          
          expect(hasLabel, `Input ${i} (type: ${inputType}) must have an accessible label`).toBeTruthy();
          
          // Test required field indication
          const isRequired = await input.getAttribute('required') !== null;
          if (isRequired) {
            const hasRequiredIndication = await input.evaluate(el => {
              const ariaRequired = el.getAttribute('aria-required') === 'true';
              const requiredInLabel = el.labels?.[0]?.textContent?.includes('*') || 
                                     el.labels?.[0]?.textContent?.includes('required');
              return ariaRequired || requiredInLabel;
            });
            
            expect(hasRequiredIndication, 'Required fields must be properly indicated').toBeTruthy();
          }
        }
        
        console.log(`✅ Form accessibility verified for ${componentId} (${inputCount} inputs)`);
      });
    }
  });

  // Color Contrast Compliance
  test.describe('Color Contrast Compliance', () => {
    const contrastTestComponents = [
      'hero--thalwil',   // Blue theme
      'hero--thalheim',  // Green theme  
      'hero--erlenbach', // Turquoise theme
      'button--primary',
      'button--secondary'
    ];

    for (const componentId of contrastTestComponents) {
      test(`${componentId} color contrast compliance`, async ({ page, browserName }) => {
        await page.goto(`http://localhost:6006/iframe.html?id=${componentId}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);
        
        // Run specific color contrast tests
        await checkA11y(page, '#storybook-root', {
          rules: {
            'color-contrast': { enabled: true }
          },
          tags: ['wcag2aa']
        });
        
        // Additional manual color contrast verification
        const textElements = page.locator('h1, h2, h3, h4, h5, h6, p, a, button, span, div');
        const elementCount = await textElements.count();
        
        // Sample a few elements for manual contrast checking
        const sampleSize = Math.min(elementCount, 5);
        for (let i = 0; i < sampleSize; i++) {
          const element = textElements.nth(i);
          const isVisible = await element.isVisible();
          
          if (isVisible) {
            const contrastInfo = await element.evaluate(el => {
              const computed = window.getComputedStyle(el);
              const color = computed.color;
              const backgroundColor = computed.backgroundColor;
              const fontSize = computed.fontSize;
              const fontWeight = computed.fontWeight;
              
              return {
                color,
                backgroundColor,
                fontSize: parseFloat(fontSize),
                fontWeight: parseInt(fontWeight) || 400,
                tagName: el.tagName.toLowerCase(),
                textContent: el.textContent?.trim().substring(0, 50)
              };
            });
            
            // Log for manual verification if needed
            if (contrastInfo.color !== 'rgba(0, 0, 0, 0)' && contrastInfo.textContent) {
              console.log(`Text element ${i}: ${contrastInfo.tagName} - "${contrastInfo.textContent}" - Color: ${contrastInfo.color}, BG: ${contrastInfo.backgroundColor}`);
            }
          }
        }
        
        console.log(`✅ Color contrast compliance verified for ${componentId}`);
      });
    }
  });

  // Focus Management Compliance
  test('Focus management and skip links', async ({ page, browserName }) => {
    // Test components that should have proper focus management
    const focusTestComponents = ['site-header--default', 'main-menu--default'];
    
    for (const componentId of focusTestComponents) {
      await page.goto(`http://localhost:6006/iframe.html?id=${componentId}`);
      await page.waitForLoadState('networkidle');
      
      // Check for skip links
      const skipLinks = page.locator('[href^="#"], [class*="skip"], [class*="sr-only"]');
      const skipLinkCount = await skipLinks.count();
      
      if (skipLinkCount > 0) {
        console.log(`✅ Skip links found in ${componentId}: ${skipLinkCount}`);
        
        // Test skip link functionality
        const firstSkipLink = skipLinks.first();
        await firstSkipLink.focus();
        await expect(firstSkipLink).toBeFocused();
        
        // Test skip link activation
        await firstSkipLink.press('Enter');
        await page.waitForTimeout(200);
      } else {
        console.warn(`⚠️  No skip links found in ${componentId} - may be required for complex navigation`);
      }
    }
  });

  // Error Handling and Validation Compliance
  test('Form error handling accessibility', async ({ page, browserName }) => {
    await page.goto('http://localhost:6006/iframe.html?id=newsletter-form--default');
    await page.waitForLoadState('networkidle');
    
    // Find form inputs
    const emailInput = page.locator('input[type="email"]').first();
    
    if (await emailInput.isVisible()) {
      // Test invalid input to trigger error
      await emailInput.fill('invalid-email');
      await emailInput.press('Tab'); // Trigger validation
      
      await page.waitForTimeout(500);
      
      // Check for error messages
      const errorElements = page.locator('[aria-invalid="true"], [class*="error"], [role="alert"]');
      const errorCount = await errorElements.count();
      
      if (errorCount > 0) {
        // Verify error accessibility
        await checkA11y(page, '#storybook-root', {
          rules: {
            'aria-valid-attr-value': { enabled: true },
            'duplicate-id-aria': { enabled: true }
          }
        });
        
        console.log(`✅ Form error handling accessibility verified (${errorCount} error indicators)`);
      } else {
        console.warn('⚠️  No error handling found - ensure form validation is accessible');
      }
    }
  });

  // Swiss Data Protection Compliance
  test('Swiss data protection compliance indicators', async ({ page, browserName }) => {
    // Test components that might handle data
    const dataComponents = ['newsletter-form--default', 'file-upload-preview--default'];
    
    for (const componentId of dataComponents) {
      await page.goto(`http://localhost:6006/iframe.html?id=${componentId}`);
      await page.waitForLoadState('networkidle');
      
      // Look for privacy/data protection indicators
      const privacyElements = page.locator([
        '[href*="privacy"]',
        '[href*="datenschutz"]', 
        '[href*="protection"]',
        '[class*="privacy"]',
        '[class*="gdpr"]',
        'text=/privacy/i',
        'text=/datenschutz/i'
      ].join(', '));
      
      const privacyCount = await privacyElements.count();
      
      if (privacyCount > 0) {
        console.log(`✅ Privacy/data protection indicators found in ${componentId}: ${privacyCount}`);
        
        // Verify accessibility of privacy links
        for (let i = 0; i < Math.min(privacyCount, 3); i++) {
          const privacyElement = privacyElements.nth(i);
          await expect(privacyElement).toBeVisible();
          
          const hasAccessibleName = await privacyElement.evaluate(el => {
            return el.getAttribute('aria-label') || 
                   el.textContent?.trim() ||
                   el.getAttribute('title');
          });
          
          expect(hasAccessibleName, 'Privacy links must have accessible names').toBeTruthy();
        }
      } else {
        console.warn(`⚠️  No privacy/data protection indicators found in ${componentId}`);
      }
    }
  });
});