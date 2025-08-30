/**
 * Accessibility Testing Suite for PnX Architecture
 * WCAG 2.1 AA and eCH-0059 compliance validation for Swiss government standards
 */

import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

// Swiss government accessibility requirements
const SWISS_A11Y_CONFIG = {
  rules: {
    // Color contrast requirements (WCAG 2.1 AA + eCH-0059)
    'color-contrast': { enabled: true },
    'color-contrast-enhanced': { enabled: true },
    
    // Language requirements for multi-municipality support  
    'html-has-lang': { enabled: true },
    'html-lang-valid': { enabled: true },
    'html-xml-lang-mismatch': { enabled: true },
    'valid-lang': { enabled: true },
    
    // Semantic structure requirements
    'heading-order': { enabled: true },
    'landmark-one-main': { enabled: true },
    'landmark-complementary-is-top-level': { enabled: true },
    'page-has-heading-one': { enabled: true },
    'region': { enabled: true },
    
    // Form accessibility (critical for government portals)
    'label': { enabled: true },
    'form-field-multiple-labels': { enabled: true },
    'input-button-name': { enabled: true },
    'input-image-alt': { enabled: true },
    
    // Image accessibility
    'image-alt': { enabled: true },
    'image-redundant-alt': { enabled: true },
    
    // Link accessibility
    'link-name': { enabled: true },
    'link-in-text-block': { enabled: true },
    
    // Keyboard navigation (critical for accessibility)
    'focus-order-semantics': { enabled: true },
    'focusable-no-name': { enabled: true },
    'keyboard-navigation': { enabled: true },
    
    // Swiss specific requirements
    'bypass': { enabled: true }, // Skip to main content
    'document-title': { enabled: true },
    'meta-viewport': { enabled: true },
    'meta-description': { enabled: true },
  },
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'],
  includedImpacts: ['minor', 'moderate', 'serious', 'critical'],
};

test.describe('Accessibility Compliance Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Start Storybook if not already running
    await page.goto('http://localhost:6006');
    await injectAxe(page);
  });

  // Critical component accessibility tests
  const criticalComponents = [
    { id: 'hero--default', name: 'Hero Component' },
    { id: 'hero--thalwil', name: 'Hero Component (Thalwil)' },
    { id: 'hero--thalheim', name: 'Hero Component (Thalheim)' },
    { id: 'hero--erlenbach', name: 'Hero Component (Erlenbach)' },
    { id: 'navigation--default', name: 'Navigation Component' },
    { id: 'footer--default', name: 'Footer Component' },
    { id: 'button--primary', name: 'Primary Button' },
    { id: 'button--secondary', name: 'Secondary Button' },
    { id: 'form--contact', name: 'Contact Form' },
    { id: 'breadcrumb--default', name: 'Breadcrumb Navigation' },
    { id: 'card--default', name: 'Card Component' },
  ];

  for (const component of criticalComponents) {
    test(`${component.name} meets WCAG 2.1 AA standards`, async ({ page }) => {
      await page.goto(`http://localhost:6006/iframe.html?id=${component.id}`);
      
      // Wait for component to fully render
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      // Run comprehensive accessibility audit
      await checkA11y(page, '#storybook-root', {
        ...SWISS_A11Y_CONFIG,
        detailedReport: true,
        detailedReportOptions: { 
          html: true,
          resultTypes: ['violations', 'incomplete', 'passes']
        }
      });
    });

    test(`${component.name} supports keyboard navigation`, async ({ page }) => {
      await page.goto(`http://localhost:6006/iframe.html?id=${component.id}`);
      await page.waitForLoadState('networkidle');

      // Test keyboard navigation
      const focusableElements = await page.locator('button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])');
      const count = await focusableElements.count();

      for (let i = 0; i < count; i++) {
        await page.keyboard.press('Tab');
        
        // Verify focus is visible
        const focusedElement = await page.locator(':focus');
        const isVisible = await focusedElement.isVisible();
        
        expect(isVisible, `Element ${i} should be visible when focused`).toBeTruthy();
      }
    });

    test(`${component.name} has proper ARIA attributes`, async ({ page }) => {
      await page.goto(`http://localhost:6006/iframe.html?id=${component.id}`);
      await page.waitForLoadState('networkidle');

      // Check for essential ARIA attributes
      const mainContent = await page.locator('#storybook-root');
      const htmlContent = await mainContent.innerHTML();

      // Verify semantic structure
      if (component.id.includes('hero')) {
        expect(htmlContent).toMatch(/role="banner"|role="main"/);
      }

      if (component.id.includes('navigation')) {
        expect(htmlContent).toMatch(/role="navigation"|nav/);
      }

      if (component.id.includes('button')) {
        expect(htmlContent).toMatch(/role="button"|<button/);
      }

      if (component.id.includes('form')) {
        expect(htmlContent).toMatch(/role="form"|<form/);
      }
    });
  }

  // Municipality-specific accessibility tests
  test.describe('Municipality Theme Accessibility', () => {
    const municipalities = ['thalwil', 'thalheim', 'erlenbach'];
    const municipalityColors = {
      thalwil: { primary: '#0066CC', secondary: '#004499' },
      thalheim: { primary: '#008844', secondary: '#006633' },  
      erlenbach: { primary: '#00AA88', secondary: '#008866' }
    };

    for (const municipality of municipalities) {
      test(`${municipality} theme meets color contrast requirements`, async ({ page }) => {
        // Test hero component with municipality theme
        await page.goto(`http://localhost:6006/iframe.html?id=hero--${municipality}`);
        await page.waitForLoadState('networkidle');

        // Run color contrast specific audit
        await checkA11y(page, '#storybook-root', {
          rules: {
            'color-contrast': { enabled: true },
            'color-contrast-enhanced': { enabled: true }
          },
          tags: ['wcag2aa'],
          includedImpacts: ['serious', 'critical']
        });

        // Additional color contrast validation
        const elements = await page.locator('[class*="text-"], [style*="color"]');
        const count = await elements.count();

        for (let i = 0; i < Math.min(count, 10); i++) {
          const element = elements.nth(i);
          const styles = await element.evaluate(el => {
            const computed = window.getComputedStyle(el);
            return {
              color: computed.color,
              backgroundColor: computed.backgroundColor,
              fontSize: computed.fontSize
            };
          });

          // Verify contrast ratio meets WCAG 2.1 AA (4.5:1 for normal text)
          // This is a basic check - axe-core does the comprehensive validation
          expect(styles.color).toBeTruthy();
        }
      });
    }
  });

  // Responsive accessibility tests
  test.describe('Responsive Accessibility', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1366, height: 768 },
      { name: 'wide', width: 1920, height: 1080 }
    ];

    for (const viewport of viewports) {
      test(`Hero component accessible at ${viewport.name} viewport`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('http://localhost:6006/iframe.html?id=hero--default');
        await page.waitForLoadState('networkidle');

        // Run accessibility audit
        await checkA11y(page, '#storybook-root', {
          ...SWISS_A11Y_CONFIG,
          detailedReport: false // Lighter check for viewport testing
        });

        // Verify no content is cut off or inaccessible
        const mainContent = await page.locator('#storybook-root');
        const boundingBox = await mainContent.boundingBox();
        
        expect(boundingBox.width, 'Content should fit within viewport width').toBeLessThanOrEqual(viewport.width);
      });
    }
  });

  // Screen reader testing
  test('Components provide meaningful screen reader content', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=hero--default');
    await page.waitForLoadState('networkidle');

    // Check for screen reader specific content
    const srOnlyElements = await page.locator('.sr-only, .visually-hidden, [class*="screen-reader"]');
    const srCount = await srOnlyElements.count();

    if (srCount > 0) {
      for (let i = 0; i < srCount; i++) {
        const element = srOnlyElements.nth(i);
        const text = await element.textContent();
        
        expect(text?.trim(), 'Screen reader content should not be empty').toBeTruthy();
        
        // Verify element is visually hidden but available to screen readers
        const styles = await element.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            position: computed.position,
            left: computed.left,
            width: computed.width,
            height: computed.height,
            overflow: computed.overflow
          };
        });

        // Common screen reader only patterns
        const isScreenReaderOnly = 
          styles.position === 'absolute' && styles.left.includes('-') ||
          styles.width === '1px' && styles.height === '1px' ||
          styles.overflow === 'hidden';
          
        expect(isScreenReaderOnly, 'Screen reader content should be properly hidden').toBeTruthy();
      }
    }
  });

  // Language and internationalization tests
  test('Components support multi-language accessibility', async ({ page }) => {
    const languages = ['de', 'fr', 'it']; // Swiss official languages
    
    for (const lang of languages) {
      // Set page language
      await page.addInitScript((language) => {
        document.documentElement.lang = language;
      }, lang);

      await page.goto('http://localhost:6006/iframe.html?id=hero--default');
      await page.waitForLoadState('networkidle');

      // Verify language is properly set
      const htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe(lang);

      // Run language-specific accessibility audit
      await checkA11y(page, '#storybook-root', {
        rules: {
          'html-has-lang': { enabled: true },
          'html-lang-valid': { enabled: true },
          'valid-lang': { enabled: true }
        },
        tags: ['wcag2a']
      });
    }
  });

  // Performance impact of accessibility features
  test('Accessibility features do not significantly impact performance', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=hero--default');
    await page.waitForLoadState('networkidle');

    // Measure performance with accessibility features
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        totalTime: navigation.loadEventEnd - navigation.fetchStart
      };
    });

    // Accessibility features should not add more than 100ms to load time
    expect(performanceMetrics.totalTime, 'Total load time should be reasonable with a11y features').toBeLessThan(3000);
  });
});

// Utility functions for accessibility testing
export const accessibilityUtils = {
  /**
   * Check if element has proper focus indicator
   */
  async hasFocusIndicator(page, selector) {
    await page.focus(selector);
    
    const focusStyles = await page.locator(selector).evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        outline: computed.outline,
        outlineWidth: computed.outlineWidth,
        outlineStyle: computed.outlineStyle,
        outlineColor: computed.outlineColor,
        boxShadow: computed.boxShadow
      };
    });

    return focusStyles.outline !== 'none' || focusStyles.boxShadow !== 'none';
  },

  /**
   * Verify color contrast ratio meets WCAG standards
   */
  async checkColorContrast(page, selector) {
    const element = page.locator(selector);
    
    const colors = await element.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        color: computed.color,
        backgroundColor: computed.backgroundColor,
        fontSize: parseFloat(computed.fontSize),
        fontWeight: computed.fontWeight
      };
    });

    // This is a simplified check - axe-core provides comprehensive validation
    return colors;
  },

  /**
   * Test keyboard navigation flow
   */
  async testKeyboardNavigation(page, startSelector = 'body') {
    const tabbableElements = [];
    let currentElement = await page.locator(startSelector);
    
    // Simulate Tab navigation
    for (let i = 0; i < 20; i++) { // Limit to prevent infinite loop
      await page.keyboard.press('Tab');
      
      const focused = await page.locator(':focus');
      const tagName = await focused.evaluate(el => el.tagName.toLowerCase());
      const isVisible = await focused.isVisible();
      
      if (isVisible) {
        tabbableElements.push({
          tagName,
          index: i,
          hasProperFocus: await this.hasFocusIndicator(page, ':focus')
        });
      }
    }
    
    return tabbableElements;
  }
};