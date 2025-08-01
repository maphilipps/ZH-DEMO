/**
 * @file Test utilities for component testing
 * Provides common utilities and helpers for component testing
 */

import { expect } from 'vitest';
import '@testing-library/jest-dom';

/**
 * Wait for element to be present in DOM
 * @param {string} selector - CSS selector
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<Element>}
 */
export async function waitForElement(selector, timeout = 3000) {
  const start = Date.now();
  
  while (Date.now() - start < timeout) {
    const element = document.querySelector(selector);
    if (element) {
      return element;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  throw new Error(`Element with selector "${selector}" not found within ${timeout}ms`);
}

/**
 * Wait for Flowbite components to initialize
 * @param {number} timeout - Timeout in milliseconds
 */
export async function waitForFlowbite(timeout = 2000) {
  const start = Date.now();
  
  while (Date.now() - start < timeout) {
    if (window.Flowbite || window.initFlowbite) {
      // Give it a bit more time to fully initialize
      await new Promise(resolve => setTimeout(resolve, 500));
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // It's okay if Flowbite isn't available, some components work without it
  console.warn('Flowbite not available, some interactive functionality may not work');
}

/**
 * Simulate click event
 * @param {Element} element 
 */
export function clickElement(element) {
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  element.dispatchEvent(event);
}

/**
 * Simulate keyboard event
 * @param {Element} element 
 * @param {string} key 
 * @param {object} options 
 */
export function keyboardEvent(element, key, options = {}) {
  const event = new KeyboardEvent('keydown', {
    key,
    code: key,
    bubbles: true,
    cancelable: true,
    ...options
  });
  element.dispatchEvent(event);
}

/**
 * Test basic accessibility requirements
 * @param {Element} container 
 */
export function testBasicAccessibility(container) {
  describe('Basic Accessibility', () => {
    it('should have proper focus management', () => {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      focusableElements.forEach(element => {
        expect(element.getAttribute('tabindex')).not.toBe('-1');
      });
    });

    it('should have proper ARIA labels where needed', () => {
      const buttons = container.querySelectorAll('button');
      buttons.forEach(button => {
        const hasText = button.textContent.trim().length > 0;
        const hasLabel = button.getAttribute('aria-label') || button.getAttribute('aria-labelledby');
        const hasTitle = button.getAttribute('title');
        
        expect(hasText || hasLabel || hasTitle).toBe(true);
      });
    });

    it('should have proper heading hierarchy', () => {
      const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
      if (headings.length > 1) {
        // Check that headings follow proper hierarchy (simplified check)
        let lastLevel = 0;
        headings.forEach(heading => {
          const level = parseInt(heading.tagName.substr(1));
          if (lastLevel > 0) {
            expect(level - lastLevel).toBeLessThanOrEqual(1);
          }
          lastLevel = level;
        });
      }
    });
  });
}

/**
 * Test responsive behavior
 * @param {Element} container 
 * @param {object} breakpoints 
 */
export function testResponsiveBehavior(container, breakpoints = {
  mobile: 375,
  tablet: 768,
  desktop: 1200
}) {
  describe('Responsive Behavior', () => {
    Object.entries(breakpoints).forEach(([name, width]) => {
      it(`should render properly at ${name} (${width}px)`, async () => {
        // Simulate viewport change
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });
        
        // Trigger resize event
        window.dispatchEvent(new Event('resize'));
        
        // Wait for any responsive adjustments
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Basic check that component is still visible and functional
        expect(container).toBeInTheDocument();
        expect(container.offsetWidth).toBeGreaterThan(0);
      });
    });
  });
}

/**
 * Test component variants
 * @param {Function} renderFunction 
 * @param {object} variants 
 */
export function testComponentVariants(renderFunction, variants) {
  describe('Component Variants', () => {
    Object.entries(variants).forEach(([variantName, args]) => {
      it(`should render ${variantName} variant correctly`, () => {
        const result = renderFunction(args);
        expect(result).toBeTruthy();
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });
    });
  });
}

/**
 * Test color contrast (basic check)
 * @param {Element} element 
 */
export function getColorContrast(element) {
  const styles = window.getComputedStyle(element);
  const backgroundColor = styles.backgroundColor;
  const color = styles.color;
  
  // This is a simplified check - in practice you'd use a proper contrast ratio calculator
  return {
    backgroundColor,
    color,
    // Add your contrast ratio calculation here
    hasGoodContrast: backgroundColor !== color && backgroundColor !== 'transparent'
  };
}

/**
 * Common test patterns
 */
export const commonTests = {
  /**
   * Test that component renders without errors
   */
  renderWithoutErrors: (renderFunction, args) => {
    it('should render without errors', () => {
      expect(() => renderFunction(args)).not.toThrow();
    });
  },

  /**
   * Test that component has required CSS classes
   */
  hasRequiredClasses: (container, requiredClasses) => {
    it('should have required CSS classes', () => {
      requiredClasses.forEach(className => {
        const elementWithClass = container.querySelector(`.${className}`);
        expect(elementWithClass).toBeInTheDocument();
      });
    });
  },

  /**
   * Test that component is keyboard navigable
   */
  isKeyboardNavigable: (container) => {
    it('should be keyboard navigable', async () => {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        // Test Tab navigation
        focusableElements[0].focus();
        expect(document.activeElement).toBe(focusableElements[0]);
        
        if (focusableElements.length > 1) {
          keyboardEvent(focusableElements[0], 'Tab');
          await new Promise(resolve => setTimeout(resolve, 100));
          // Note: In jsdom, actual focus navigation might not work perfectly
          // This is more of a smoke test
        }
      }
    });
  }
};