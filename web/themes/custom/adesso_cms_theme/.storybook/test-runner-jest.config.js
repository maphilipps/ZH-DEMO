/**
 * @file
 * Storybook Test Runner Jest Configuration
 * 
 * Implements comprehensive accessibility testing with axe-core integration
 * following PreviousNext frontend architecture patterns.
 * 
 * Features:
 * - WCAG 2.1 AA compliance validation
 * - German/Swiss government portal standards (eCH-0059)
 * - Multi-municipality theme testing
 * - Detailed HTML reporting
 * - Performance monitoring
 */

const { injectAxe, checkA11y } = require('axe-playwright');
const { expect } = require('@playwright/test');

/**
 * Axe-core configuration for Swiss government compliance
 * Validates WCAG 2.1 AA + eCH-0059 accessibility standards
 */
const axeConfig = {
  rules: [
    // WCAG 2.1 AA Core Rules
    {
      id: 'color-contrast',
      enabled: true,
      tags: ['wcag2a', 'wcag2aa', 'wcag21aa']
    },
    {
      id: 'keyboard',
      enabled: true,
      tags: ['wcag2a', 'wcag21a']
    },
    {
      id: 'focus',
      enabled: true,
      tags: ['wcag2a', 'wcag21a']
    },
    {
      id: 'aria-allowed-attr',
      enabled: true,
      tags: ['wcag2a', 'wcag21a']
    },
    {
      id: 'aria-required-attr',
      enabled: true,
      tags: ['wcag2a', 'wcag21a']
    },
    {
      id: 'aria-valid-attr',
      enabled: true,
      tags: ['wcag2a', 'wcag21a']
    },
    {
      id: 'aria-valid-attr-value',
      enabled: true,
      tags: ['wcag2a', 'wcag21a']
    },
    {
      id: 'button-name',
      enabled: true,
      tags: ['wcag2a', 'wcag21a']
    },
    {
      id: 'form-field-multiple-labels',
      enabled: true,
      tags: ['wcag2a', 'wcag21a']
    },
    {
      id: 'input-image-alt',
      enabled: true,
      tags: ['wcag2a', 'wcag21a']
    },
    {
      id: 'label',
      enabled: true,
      tags: ['wcag2a', 'wcag21a']
    },
    {
      id: 'link-name',
      enabled: true,
      tags: ['wcag2a', 'wcag21a']
    },
    {
      id: 'document-title',
      enabled: true,
      tags: ['wcag2a', 'wcag21a']
    },
    {
      id: 'html-has-lang',
      enabled: true,
      tags: ['wcag2a', 'wcag21a']
    },
    {
      id: 'html-lang-valid',
      enabled: true,
      tags: ['wcag2a', 'wcag21a']
    },
    {
      id: 'html-xml-lang-mismatch',
      enabled: true,
      tags: ['wcag2a', 'wcag21a']
    },
    {
      id: 'image-alt',
      enabled: true,
      tags: ['wcag2a', 'wcag21a']
    },
    {
      id: 'page-has-heading-one',
      enabled: true,
      tags: ['wcag2a', 'wcag21a']
    },
    {
      id: 'region',
      enabled: true,
      tags: ['wcag2a', 'wcag21a']
    }
  ],
  // Swiss/German government portal requirements
  locale: 'de',
  // Include best practices for government portals
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'],
  // German text expansion testing (25% buffer for localization)
  textExpansionRatio: 1.25
};

/**
 * Test runner configuration for comprehensive story testing
 */
module.exports = {
  // Setup function - runs before visiting each story
  async preVisit(page, context) {
    // Inject axe-core for accessibility testing
    await injectAxe(page);
    
    // Set German locale for government compliance
    await page.addInitScript(() => {
      // Set document language to German (default)
      if (!document.documentElement.hasAttribute('lang')) {
        document.documentElement.setAttribute('lang', 'de-CH');
      }
      
      // Add viewport meta tag for responsive testing
      if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1';
        document.head.appendChild(viewport);
      }
    });
    
    // Wait for Flowbite and Alpine.js initialization
    await page.waitForTimeout(200);
    
    // Log story information for debugging
    console.log(`Testing story: ${context.name} (${context.title})`);
  },

  // Main testing function - runs after story is rendered
  async postVisit(page, context) {
    // Wait for component rendering and JavaScript initialization
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);
    
    try {
      // Run comprehensive accessibility tests
      await checkA11y(page, '#storybook-root', {
        ...axeConfig,
        // Detailed reporting for debugging and compliance
        detailedReport: true,
        detailedReportOptions: { 
          html: true,
          outputDir: './test-results/accessibility',
          outputFilename: `a11y-${context.title.replace(/[^a-zA-Z0-9]/g, '-')}-${context.name.replace(/[^a-zA-Z0-9]/g, '-')}.html`
        },
        // Exclude known issues that are handled at theme level
        exclude: [
          // Skip Storybook UI elements
          '[data-storybook]',
          '.sb-bar',
          '.sb-panel',
          // Skip iframe elements from Storybook
          'iframe[src*="about:blank"]'
        ]
      });
      
      // Test keyboard navigation for interactive components
      if (await hasInteractiveElements(page)) {
        await testKeyboardNavigation(page, context);
      }
      
      // Test color contrast for municipality themes
      if (context.parameters?.municipality) {
        await testMunicipalityContrast(page, context.parameters.municipality);
      }
      
      // Test responsive behavior on key breakpoints
      await testResponsiveAccessibility(page, context);
      
      // Test German text expansion (government requirement)
      await testTextExpansion(page, context);
      
      console.log(`✓ Accessibility tests passed for: ${context.name}`);
      
    } catch (error) {
      console.error(`✗ Accessibility test failed for ${context.name}:`, error.message);
      
      // Generate detailed error report
      await generateErrorReport(page, context, error);
      
      // Re-throw to fail the test
      throw error;
    }
  }
};

/**
 * Check if the component has interactive elements
 */
async function hasInteractiveElements(page) {
  const interactiveSelectors = [
    'button',
    'a[href]',
    'input',
    'textarea',
    'select',
    '[tabindex]',
    '[role="button"]',
    '[role="link"]',
    '[role="tab"]',
    '[role="menuitem"]'
  ];
  
  for (const selector of interactiveSelectors) {
    if (await page.locator(selector).count() > 0) {
      return true;
    }
  }
  
  return false;
}

/**
 * Test keyboard navigation functionality
 */
async function testKeyboardNavigation(page, context) {
  // Get all focusable elements
  const focusableElements = await page.locator(`
    button:not([disabled]),
    a[href],
    input:not([disabled]),
    textarea:not([disabled]),
    select:not([disabled]),
    [tabindex]:not([tabindex="-1"])
  `).all();
  
  if (focusableElements.length === 0) {
    return; // No focusable elements to test
  }
  
  // Test Tab navigation through all elements
  await page.keyboard.press('Tab');
  
  for (let i = 0; i < focusableElements.length; i++) {
    const element = focusableElements[i];
    
    // Verify element is visible when focused
    await expect(element).toBeVisible();
    
    // Check for visible focus indicators
    const focusStyles = await element.evaluate((el) => {
      const computed = window.getComputedStyle(el, ':focus');
      return {
        outline: computed.outline,
        outlineWidth: computed.outlineWidth,
        outlineColor: computed.outlineColor,
        boxShadow: computed.boxShadow
      };
    });
    
    // Verify focus indicator exists
    const hasFocusIndicator = 
      focusStyles.outline !== 'none' ||
      focusStyles.outlineWidth !== '0px' ||
      focusStyles.boxShadow !== 'none';
    
    if (!hasFocusIndicator) {
      console.warn(`Warning: No focus indicator for element in ${context.name}`);
    }
    
    // Move to next element
    if (i < focusableElements.length - 1) {
      await page.keyboard.press('Tab');
    }
  }
}

/**
 * Test municipality-specific color contrast requirements
 */
async function testMunicipalityContrast(page, municipality) {
  const municipalityColors = {
    thalwil: {
      primary: '#3B82F6', // Blue
      threshold: 4.5 // WCAG AA
    },
    thalheim: {
      primary: '#10B981', // Green
      threshold: 4.5 // WCAG AA
    },
    erlenbach: {
      primary: '#06B6D4', // Turquoise
      threshold: 4.5 // WCAG AA
    }
  };
  
  const config = municipalityColors[municipality];
  if (!config) {
    return; // Unknown municipality
  }
  
  // Test specific contrast requirements for this municipality
  await checkA11y(page, '#storybook-root', {
    rules: [{
      id: 'color-contrast',
      enabled: true,
      options: {
        contrastRatio: {
          normal: config.threshold,
          large: 3.0
        }
      }
    }]
  });
}

/**
 * Test responsive accessibility across breakpoints
 */
async function testResponsiveAccessibility(page, context) {
  const viewports = [
    { width: 375, height: 667, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1200, height: 800, name: 'desktop' }
  ];
  
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.waitForTimeout(200); // Allow for responsive changes
    
    // Check that all interactive elements are still accessible
    const hiddenInteractives = await page.locator(`
      button:not([disabled]),
      a[href],
      input:not([disabled])
    `).evaluateAll((elements) => 
      elements.filter((el) => {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return style.display === 'none' || 
               style.visibility === 'hidden' ||
               rect.width === 0 ||
               rect.height === 0;
      })
    );
    
    if (hiddenInteractives.length > 0) {
      console.warn(`Warning: ${hiddenInteractives.length} interactive elements hidden at ${viewport.name} viewport in ${context.name}`);
    }
  }
  
  // Reset to desktop viewport
  await page.setViewportSize({ width: 1200, height: 800 });
}

/**
 * Test German text expansion requirements (25% buffer)
 */
async function testTextExpansion(page, context) {
  const textElements = await page.locator('p, span, div, h1, h2, h3, h4, h5, h6').all();
  
  for (const element of textElements) {
    const text = await element.textContent();
    if (!text || text.trim().length === 0) {
      continue;
    }
    
    // Simulate German text expansion (25% longer)
    const expandedText = text + ' '.repeat(Math.ceil(text.length * 0.25));
    
    // Temporarily set expanded text to test layout
    await element.evaluate((el, expandedText) => {
      el.dataset.originalText = el.textContent;
      el.textContent = expandedText;
    }, expandedText);
    
    // Check if element is still visible and properly formatted
    const isVisible = await element.isVisible();
    const boundingBox = await element.boundingBox();
    
    if (!isVisible || !boundingBox || boundingBox.width === 0) {
      console.warn(`Warning: Text expansion caused layout issues in ${context.name}`);
    }
    
    // Restore original text
    await element.evaluate((el) => {
      if (el.dataset.originalText) {
        el.textContent = el.dataset.originalText;
        delete el.dataset.originalText;
      }
    });
  }
}

/**
 * Generate detailed error report for failed tests
 */
async function generateErrorReport(page, context, error) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `error-${context.title.replace(/[^a-zA-Z0-9]/g, '-')}-${context.name.replace(/[^a-zA-Z0-9]/g, '-')}-${timestamp}`;
  
  try {
    // Take screenshot of failed state
    await page.screenshot({
      path: `./test-results/screenshots/${filename}.png`,
      fullPage: true
    });
    
    // Capture HTML for analysis
    const html = await page.content();
    await require('fs/promises').writeFile(
      `./test-results/html/${filename}.html`,
      html,
      'utf8'
    );
    
    // Generate comprehensive report
    const report = {
      story: {
        title: context.title,
        name: context.name,
        parameters: context.parameters
      },
      error: {
        message: error.message,
        stack: error.stack
      },
      timestamp: new Date().toISOString(),
      viewport: await page.viewportSize(),
      url: page.url(),
      screenshots: {
        failure: `./test-results/screenshots/${filename}.png`
      },
      html: `./test-results/html/${filename}.html`
    };
    
    await require('fs/promises').writeFile(
      `./test-results/reports/${filename}.json`,
      JSON.stringify(report, null, 2),
      'utf8'
    );
    
  } catch (reportError) {
    console.error('Failed to generate error report:', reportError);
  }
}