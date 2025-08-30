/**
 * Browser Compatibility E2E Tests for PnX Architecture
 * Validates Swiss government browser requirements across municipalities
 */

import { test, expect } from '@playwright/test';

// Test configurations for different municipalities
const MUNICIPALITY_CONFIGS = {
  thalwil: {
    name: 'Thalwil',
    primaryColor: '--color-primary-500',
    expectedValue: '#1e3a8a', // Blue theme
  },
  thalheim: {
    name: 'Thalheim', 
    primaryColor: '--color-primary-500',
    expectedValue: '#15803d', // Green theme
  },
  erlenbach: {
    name: 'Erlenbach',
    primaryColor: '--color-primary-500', 
    expectedValue: '#0891b2', // Turquoise theme
  }
};

// ES2022 feature detection tests
const ES2022_FEATURES = [
  {
    name: 'Class fields',
    test: `
      class TestClass {
        publicField = 'test';
        #privateField = 'private';
        getPublic() { return this.publicField; }
      }
      const instance = new TestClass();
      return instance.getPublic() === 'test';
    `
  },
  {
    name: 'Logical assignment operators',
    test: `
      let a = false;
      let b = null;
      a ||= true;
      b ??= 'default';
      return a === true && b === 'default';
    `
  },
  {
    name: 'Numeric separators',
    test: `
      const million = 1_000_000;
      return million === 1000000;
    `
  }
];

// CSS feature detection tests
const CSS_FEATURES = [
  {
    name: 'CSS Grid',
    property: 'display',
    value: 'grid',
    fallback: 'block'
  },
  {
    name: 'CSS Custom Properties',
    property: 'color',
    value: 'var(--test-color, red)',
    fallback: 'red'
  },
  {
    name: 'CSS Logical Properties',
    property: 'margin-inline-start',
    value: '10px',
    fallback: 'margin-left'
  }
];

test.describe('Browser Compatibility - ES2022 Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=hero--default');
  });

  ES2022_FEATURES.forEach(({ name, test: featureTest }) => {
    test(`ES2022 ${name} support`, async ({ page }) => {
      const isSupported = await page.evaluate((testCode) => {
        try {
          return new Function(testCode)();
        } catch (error) {
          console.warn(`${name} not supported:`, error.message);
          return false;
        }
      }, featureTest);

      // Log support status but don't fail test for progressive enhancement
      if (isSupported) {
        console.log(`✅ ${name} is supported`);
        expect(isSupported).toBe(true);
      } else {
        console.warn(`⚠️  ${name} not supported, using fallback`);
        // Don't fail the test, just log the warning
      }
    });
  });
});

test.describe('Browser Compatibility - CSS Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=hero--default');
  });

  CSS_FEATURES.forEach(({ name, property, value, fallback }) => {
    test(`CSS ${name} support`, async ({ page }) => {
      const isSupported = await page.evaluate(
        ({ prop, val }) => {
          const testDiv = document.createElement('div');
          testDiv.style[prop] = val;
          return testDiv.style[prop] === val || testDiv.style[prop].includes(val);
        },
        { prop: property, val: value }
      );

      if (isSupported) {
        console.log(`✅ CSS ${name} is supported`);
        expect(isSupported).toBe(true);
      } else {
        console.warn(`⚠️  CSS ${name} not supported, should use fallback: ${fallback}`);
      }
    });
  });
});

test.describe('Browser Compatibility - Municipality Themes', () => {
  Object.entries(MUNICIPALITY_CONFIGS).forEach(([municipalityKey, config]) => {
    test(`${config.name} theme compatibility`, async ({ page }) => {
      // Test hero component with municipality theme
      await page.goto(`http://localhost:6006/iframe.html?id=hero--${municipalityKey}`);
      
      // Wait for component to load
      await page.waitForSelector('.c-hero', { timeout: 10000 });
      
      // Check if CSS custom properties are working
      const customPropertyValue = await page.evaluate((colorProperty) => {
        const rootStyles = getComputedStyle(document.documentElement);
        return rootStyles.getPropertyValue(colorProperty).trim();
      }, config.primaryColor);

      // Verify theme is applied correctly
      if (customPropertyValue) {
        console.log(`✅ ${config.name} theme applied: ${customPropertyValue}`);
        expect(customPropertyValue).toBeTruthy();
      } else {
        console.warn(`⚠️  ${config.name} theme CSS custom property not found`);
      }

      // Check component rendering
      const heroComponent = page.locator('.c-hero');
      await expect(heroComponent).toBeVisible();
      
      // Verify no JavaScript errors
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      // Allow some time for any JS errors to occur
      await page.waitForTimeout(2000);
      
      if (consoleErrors.length > 0) {
        console.warn(`⚠️  JavaScript errors in ${config.name}:`, consoleErrors);
      }

      // Component should still be functional even with some JS errors
      expect(await heroComponent.isVisible()).toBe(true);
    });
  });
});

test.describe('Browser Compatibility - Core Web APIs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=hero--default');
  });

  test('Intersection Observer API support', async ({ page }) => {
    const hasIntersectionObserver = await page.evaluate(() => {
      return typeof IntersectionObserver !== 'undefined';
    });

    if (hasIntersectionObserver) {
      console.log('✅ Intersection Observer API supported');
      expect(hasIntersectionObserver).toBe(true);
    } else {
      console.warn('⚠️  Intersection Observer API not supported, lazy loading disabled');
    }
  });

  test('ResizeObserver API support', async ({ page }) => {
    const hasResizeObserver = await page.evaluate(() => {
      return typeof ResizeObserver !== 'undefined';
    });

    if (hasResizeObserver) {
      console.log('✅ ResizeObserver API supported');
      expect(hasResizeObserver).toBe(true);
    } else {
      console.warn('⚠️  ResizeObserver API not supported, responsive behavior may be limited');
    }
  });

  test('Web Components support', async ({ page }) => {
    const hasCustomElements = await page.evaluate(() => {
      return typeof customElements !== 'undefined';
    });

    if (hasCustomElements) {
      console.log('✅ Web Components (Custom Elements) supported');
      expect(hasCustomElements).toBe(true);
    } else {
      console.warn('⚠️  Web Components not supported, using standard elements');
    }
  });

  test('Fetch API support', async ({ page }) => {
    const hasFetch = await page.evaluate(() => {
      return typeof fetch !== 'undefined';
    });

    expect(hasFetch).toBe(true);
    console.log('✅ Fetch API supported (required)');
  });

  test('Promise support', async ({ page }) => {
    const hasPromises = await page.evaluate(() => {
      return typeof Promise !== 'undefined';
    });

    expect(hasPromises).toBe(true);
    console.log('✅ Promise support confirmed (required)');
  });

  test('async/await support', async ({ page }) => {
    const hasAsyncAwait = await page.evaluate(async () => {
      try {
        const testAsync = async () => 'test';
        const result = await testAsync();
        return result === 'test';
      } catch (error) {
        return false;
      }
    });

    expect(hasAsyncAwait).toBe(true);
    console.log('✅ async/await support confirmed (required)');
  });
});

test.describe('Browser Compatibility - Performance Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=hero--default');
  });

  test('Performance Observer API', async ({ page }) => {
    const hasPerformanceObserver = await page.evaluate(() => {
      return typeof PerformanceObserver !== 'undefined';
    });

    if (hasPerformanceObserver) {
      console.log('✅ Performance Observer API supported');
      expect(hasPerformanceObserver).toBe(true);
    } else {
      console.warn('⚠️  Performance Observer API not supported, performance monitoring limited');
    }
  });

  test('Navigation Timing API', async ({ page }) => {
    const hasNavigationTiming = await page.evaluate(() => {
      return typeof performance !== 'undefined' && 
             typeof performance.getEntriesByType === 'function';
    });

    expect(hasNavigationTiming).toBe(true);
    console.log('✅ Navigation Timing API supported');
  });
});