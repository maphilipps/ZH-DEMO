/**
 * Test setup for Storybook Test Runner
 * Custom matchers and utilities for Swiss government compliance testing
 */

// Extend Jest matchers for accessibility testing
expect.extend({
  toPassA11yAudit(received, expected) {
    const pass = received.violations.length === 0;
    
    if (pass) {
      return {
        message: () => `Expected story to fail accessibility audit, but it passed`,
        pass: true,
      };
    } else {
      const violations = received.violations.map(violation => ({
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        nodes: violation.nodes.length,
        helpUrl: violation.helpUrl,
      }));
      
      return {
        message: () => 
          `Expected story to pass accessibility audit, but found ${violations.length} violations:\n` +
          violations.map(v => `  - ${v.id} (${v.impact}): ${v.description}`).join('\n'),
        pass: false,
      };
    }
  },

  toHaveMunicipalityTheme(received, municipality) {
    const hasTheme = received.includes(`municipality-${municipality}`) || 
                    received.includes(`data-municipality="${municipality}"`);
    
    if (hasTheme) {
      return {
        message: () => `Expected element not to have ${municipality} theme, but it does`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected element to have ${municipality} theme, but it doesn't`,
        pass: false,
      };
    }
  },

  toMeetPerformanceBudget(received, budget) {
    const meetsSize = received.size <= budget.maxSize;
    const meetsRequests = received.requests <= budget.maxRequests;
    
    if (meetsSize && meetsRequests) {
      return {
        message: () => `Expected component to exceed performance budget`,
        pass: true,
      };
    } else {
      const issues = [];
      if (!meetsSize) issues.push(`Size: ${received.size}b > ${budget.maxSize}b`);
      if (!meetsRequests) issues.push(`Requests: ${received.requests} > ${budget.maxRequests}`);
      
      return {
        message: () => `Component exceeds performance budget: ${issues.join(', ')}`,
        pass: false,
      };
    }
  }
});

// Global test utilities
global.testUtils = {
  // Municipality theme validation
  validateMunicipalityTheme: (html, municipality) => {
    const hasClass = html.includes(`municipality-${municipality}`);
    const hasDataAttr = html.includes(`data-municipality="${municipality}"`);
    return hasClass || hasDataAttr;
  },

  // Swiss government color compliance
  validateSwissColors: (element) => {
    const computedStyle = window.getComputedStyle(element);
    const backgroundColor = computedStyle.backgroundColor;
    const color = computedStyle.color;
    
    // Add Swiss government color validation logic
    return {
      backgroundColor,
      color,
      isCompliant: true // Implement actual validation
    };
  },

  // Responsive breakpoint testing
  testBreakpoints: async (page, breakpoints = [320, 768, 1366, 1920]) => {
    const results = [];
    
    for (const width of breakpoints) {
      await page.setViewportSize({ width, height: 1000 });
      await page.waitForTimeout(200);
      
      const hasOverflow = await page.evaluate(() => {
        return document.body.scrollWidth > document.body.clientWidth;
      });
      
      results.push({
        width,
        hasOverflow,
        status: hasOverflow ? 'FAIL' : 'PASS'
      });
    }
    
    return results;
  },

  // Performance budget validation
  validatePerformanceBudget: (resources) => {
    const budget = {
      totalSize: 500000, // 500KB
      scriptSize: 250000, // 250KB
      styleSize: 100000,  // 100KB
      imageSize: 400000,  // 400KB
      maxRequests: 20
    };

    const actual = resources.reduce((acc, resource) => {
      acc.totalSize += resource.size;
      acc.requests += 1;
      
      switch(resource.type) {
        case 'script':
          acc.scriptSize += resource.size;
          break;
        case 'stylesheet':
          acc.styleSize += resource.size;
          break;
        case 'image':
          acc.imageSize += resource.size;
          break;
      }
      
      return acc;
    }, {
      totalSize: 0,
      scriptSize: 0,
      styleSize: 0,
      imageSize: 0,
      requests: 0
    });

    return {
      budget,
      actual,
      within: {
        totalSize: actual.totalSize <= budget.totalSize,
        scriptSize: actual.scriptSize <= budget.scriptSize,
        styleSize: actual.styleSize <= budget.styleSize,
        imageSize: actual.imageSize <= budget.imageSize,
        requests: actual.requests <= budget.maxRequests
      }
    };
  }
};

// Error handling for async tests
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Cleanup function for test resources
afterEach(() => {
  // Clean up any test artifacts
  global.gc && global.gc();
});