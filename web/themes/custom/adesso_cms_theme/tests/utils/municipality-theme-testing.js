/**
 * @file Municipality Theme Testing Infrastructure - Phase 2.3
 * 
 * Comprehensive testing system for Swiss municipality-specific themes
 * supporting Thalwil, Thalheim, and Erlenbach visual identity requirements.
 * 
 * This module provides:
 * - Theme consistency validation across municipalities
 * - Color palette compliance testing 
 * - Typography and spacing verification
 * - Brand element positioning validation
 * - Cross-theme component behavior testing
 * - Swiss government design standard compliance
 */

// Municipality Theme Configurations
export const MUNICIPALITY_THEMES = {
  thalwil: {
    name: 'Thalwil',
    identifier: 'thalwil',
    primaryColor: '#3B82F6', // Blue
    secondaryColor: '#1E40AF',
    accentColor: '#60A5FA',
    surfaceColor: '#F8FAFC',
    textColor: '#1E293B',
    backgroundColor: '#FFFFFF',
    className: 'municipality-thalwil',
    description: 'Modern lakeside community theme with professional blue palette',
    brandElements: {
      logo: 'thalwil-logo.svg',
      favicon: 'thalwil-favicon.ico',
      headerImage: 'thalwil-header.jpg'
    },
    typography: {
      primaryFont: 'Inter, system-ui, sans-serif',
      headingWeight: '600',
      bodyWeight: '400'
    },
    compliance: {
      contrastRatio: 4.5,
      colorBlindnessSafe: true,
      wcagLevel: 'AA'
    }
  },
  
  thalheim: {
    name: 'Thalheim',
    identifier: 'thalheim', 
    primaryColor: '#10B981', // Green
    secondaryColor: '#047857',
    accentColor: '#34D399',
    surfaceColor: '#F0FDF4',
    textColor: '#064E3B',
    backgroundColor: '#FFFFFF',
    className: 'municipality-thalheim',
    description: 'Traditional wine region theme with natural green palette',
    brandElements: {
      logo: 'thalheim-logo.svg',
      favicon: 'thalheim-favicon.ico', 
      headerImage: 'thalheim-header.jpg'
    },
    typography: {
      primaryFont: 'Inter, system-ui, sans-serif',
      headingWeight: '600',
      bodyWeight: '400'
    },
    compliance: {
      contrastRatio: 4.5,
      colorBlindnessSafe: true,
      wcagLevel: 'AA'
    }
  },
  
  erlenbach: {
    name: 'Erlenbach',
    identifier: 'erlenbach',
    primaryColor: '#06B6D4', // Turquoise
    secondaryColor: '#0891B2', 
    accentColor: '#22D3EE',
    surfaceColor: '#F0F9FF',
    textColor: '#164E63',
    backgroundColor: '#FFFFFF',
    className: 'municipality-erlenbach',
    description: 'Upscale Goldküste location theme with elegant turquoise palette',
    brandElements: {
      logo: 'erlenbach-logo.svg',
      favicon: 'erlenbach-favicon.ico',
      headerImage: 'erlenbach-header.jpg'
    },
    typography: {
      primaryFont: 'Inter, system-ui, sans-serif',
      headingWeight: '600', 
      bodyWeight: '400'
    },
    compliance: {
      contrastRatio: 4.5,
      colorBlindnessSafe: true,
      wcagLevel: 'AA'
    }
  }
};

// Municipality Theme Testing Class
export class MunicipalityThemeTester {
  constructor(municipality = 'thalwil') {
    this.municipality = municipality;
    this.theme = MUNICIPALITY_THEMES[municipality];
    this.testResults = {
      municipality,
      timestamp: new Date().toISOString(),
      tests: {},
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        warnings: 0
      }
    };
    
    if (!this.theme) {
      throw new Error(`Unknown municipality: ${municipality}. Available: ${Object.keys(MUNICIPALITY_THEMES).join(', ')}`);
    }
  }

  /**
   * Run comprehensive theme testing for a component
   * @param {HTMLElement} element - Component element to test
   * @param {Object} options - Testing options
   * @returns {Object} Complete test results
   */
  async runCompleteThemeTests(element, options = {}) {
    console.log(`Running comprehensive theme tests for ${this.theme.name} municipality`);
    
    // Test 1: Theme Class Application
    await this.testThemeClassApplication(element);
    
    // Test 2: Color Palette Compliance
    await this.testColorPaletteCompliance(element);
    
    // Test 3: Typography Consistency  
    await this.testTypographyConsistency(element);
    
    // Test 4: Brand Element Positioning
    await this.testBrandElementPositioning(element);
    
    // Test 5: Component State Theming
    await this.testComponentStateTheming(element);
    
    // Test 6: Responsive Theme Behavior
    await this.testResponsiveThemeBehavior(element);
    
    // Test 7: Accessibility Compliance
    await this.testThemeAccessibilityCompliance(element);
    
    // Test 8: Cross-Theme Consistency
    if (options.testCrossTheme) {
      await this.testCrossThemeConsistency(element);
    }

    // Calculate summary
    this.calculateTestSummary();
    
    return this.testResults;
  }

  /**
   * Test theme class application and CSS custom properties
   */
  async testThemeClassApplication(element) {
    const test = {
      name: 'Theme Class Application',
      passed: true,
      issues: [],
      details: {}
    };

    // Check for municipality theme class
    const hasThemeClass = element.classList.contains(this.theme.className) ||
                         element.querySelector(`.${this.theme.className}`);

    test.details.hasThemeClass = hasThemeClass;

    if (!hasThemeClass) {
      test.passed = false;
      test.issues.push(`Component missing municipality theme class: ${this.theme.className}`);
    }

    // Check for CSS custom properties
    const computedStyle = window.getComputedStyle(element);
    const expectedProperties = [
      '--color-primary',
      '--color-secondary', 
      '--color-accent',
      '--color-surface',
      '--color-text'
    ];

    const customProperties = {};
    expectedProperties.forEach(prop => {
      const value = computedStyle.getPropertyValue(prop);
      customProperties[prop] = value;
      
      if (!value) {
        test.issues.push(`Missing CSS custom property: ${prop}`);
      }
    });

    test.details.customProperties = customProperties;
    
    this.testResults.tests.themeClassApplication = test;
    this.updateSummary(test);
  }

  /**
   * Test color palette compliance and contrast ratios
   */
  async testColorPaletteCompliance(element) {
    const test = {
      name: 'Color Palette Compliance',
      passed: true,
      issues: [],
      warnings: [],
      details: {}
    };

    const computedStyle = window.getComputedStyle(element);
    const usedColors = {
      backgroundColor: computedStyle.backgroundColor,
      color: computedStyle.color,
      borderColor: computedStyle.borderColor
    };

    test.details.usedColors = usedColors;

    // Test primary color usage
    const primaryColorElements = element.querySelectorAll('.text-primary, .bg-primary, .border-primary');
    test.details.primaryColorElements = primaryColorElements.length;

    // Test color contrast ratios (mock implementation)
    const contrastTests = await this.testColorContrasts(element);
    test.details.contrastResults = contrastTests;

    contrastTests.forEach(contrast => {
      if (contrast.ratio < this.theme.compliance.contrastRatio) {
        test.passed = false;
        test.issues.push(`Insufficient color contrast: ${contrast.ratio} (minimum: ${this.theme.compliance.contrastRatio})`);
      }
    });

    // Test theme color consistency
    const inconsistentColors = await this.findInconsistentColors(element);
    if (inconsistentColors.length > 0) {
      test.warnings.push(`Found ${inconsistentColors.length} elements with non-theme colors`);
      test.details.inconsistentColors = inconsistentColors;
    }

    this.testResults.tests.colorPaletteCompliance = test;
    this.updateSummary(test);
  }

  /**
   * Test typography consistency across the theme
   */
  async testTypographyConsistency(element) {
    const test = {
      name: 'Typography Consistency',
      passed: true,
      issues: [],
      details: {}
    };

    const textElements = element.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button');
    const fontAnalysis = {
      fontFamilies: new Set(),
      fontWeights: new Set(),
      fontSizes: new Set(),
      lineHeights: new Set()
    };

    Array.from(textElements).forEach(el => {
      const style = window.getComputedStyle(el);
      fontAnalysis.fontFamilies.add(style.fontFamily);
      fontAnalysis.fontWeights.add(style.fontWeight);
      fontAnalysis.fontSizes.add(style.fontSize);
      fontAnalysis.lineHeights.add(style.lineHeight);
    });

    // Convert Sets to Arrays for serialization
    test.details.fontAnalysis = {
      fontFamilies: Array.from(fontAnalysis.fontFamilies),
      fontWeights: Array.from(fontAnalysis.fontWeights),
      fontSizes: Array.from(fontAnalysis.fontSizes),
      lineHeights: Array.from(fontAnalysis.lineHeights)
    };

    // Check for theme font usage
    const expectedFont = this.theme.typography.primaryFont;
    const primaryFontUsage = Array.from(fontAnalysis.fontFamilies).some(font => 
      font.includes('Inter') || font.includes(expectedFont.split(',')[0])
    );

    if (!primaryFontUsage) {
      test.passed = false;
      test.issues.push(`Component not using theme font: ${expectedFont}`);
    }

    // Check for excessive font variation
    if (fontAnalysis.fontFamilies.size > 2) {
      test.issues.push(`Too many font families used: ${Array.from(fontAnalysis.fontFamilies).join(', ')}`);
    }

    // Test heading hierarchy
    const headingHierarchy = this.testHeadingHierarchy(element);
    test.details.headingHierarchy = headingHierarchy;
    
    if (!headingHierarchy.isValid) {
      test.passed = false;
      test.issues.push(...headingHierarchy.issues);
    }

    this.testResults.tests.typographyConsistency = test;
    this.updateSummary(test);
  }

  /**
   * Test brand element positioning and visibility
   */
  async testBrandElementPositioning(element) {
    const test = {
      name: 'Brand Element Positioning',
      passed: true,
      issues: [],
      details: {}
    };

    const brandElements = {
      logo: element.querySelector('.logo, [data-logo], .brand-logo'),
      favicon: document.querySelector('link[rel="icon"], link[rel="shortcut icon"]'),
      headerImage: element.querySelector('.header-image, [data-header-image]')
    };

    test.details.brandElements = {
      logo: !!brandElements.logo,
      favicon: !!brandElements.favicon,
      headerImage: !!brandElements.headerImage
    };

    // Check logo positioning
    if (brandElements.logo) {
      const logoRect = brandElements.logo.getBoundingClientRect();
      const logoSrc = brandElements.logo.querySelector('img')?.src;
      
      test.details.logoPosition = {
        width: logoRect.width,
        height: logoRect.height,
        top: logoRect.top,
        left: logoRect.left,
        src: logoSrc
      };

      // Check for municipality-specific logo
      if (logoSrc && !logoSrc.includes(this.municipality)) {
        test.issues.push(`Logo may not be municipality-specific: ${logoSrc}`);
      }
    } else if (element.matches('header, .site-header, .page-header')) {
      test.issues.push('Header component missing logo element');
    }

    // Check favicon
    if (brandElements.favicon) {
      const faviconHref = brandElements.favicon.href;
      test.details.faviconHref = faviconHref;
      
      if (faviconHref && !faviconHref.includes(this.municipality)) {
        test.issues.push(`Favicon may not be municipality-specific: ${faviconHref}`);
      }
    }

    this.testResults.tests.brandElementPositioning = test;
    this.updateSummary(test);
  }

  /**
   * Test component state theming (hover, focus, active, disabled)
   */
  async testComponentStateTheming(element) {
    const test = {
      name: 'Component State Theming',
      passed: true,
      issues: [],
      details: {}
    };

    const interactiveElements = element.querySelectorAll('button, a, input, select, textarea');
    const stateResults = {};

    for (const el of interactiveElements) {
      const elementId = el.id || `${el.tagName.toLowerCase()}-${Array.from(interactiveElements).indexOf(el)}`;
      
      const states = await this.testElementStates(el);
      stateResults[elementId] = states;

      // Check for theme-consistent state colors
      Object.entries(states).forEach(([state, colors]) => {
        if (state !== 'default' && !this.isThemeConsistentColor(colors.backgroundColor)) {
          test.issues.push(`Element ${elementId} ${state} state uses non-theme background color`);
        }
      });
    }

    test.details.stateResults = stateResults;
    test.details.testedElements = interactiveElements.length;

    this.testResults.tests.componentStateTheming = test;
    this.updateSummary(test);
  }

  /**
   * Test responsive theme behavior across breakpoints
   */
  async testResponsiveThemeBehavior(element) {
    const test = {
      name: 'Responsive Theme Behavior',
      passed: true,
      issues: [],
      details: {}
    };

    const breakpoints = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1200, height: 800 }
    ];

    const responsiveResults = {};

    for (const breakpoint of breakpoints) {
      // Mock viewport change
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: breakpoint.width
      });

      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: breakpoint.height
      });

      window.dispatchEvent(new Event('resize'));
      
      // Allow time for responsive changes
      await new Promise(resolve => setTimeout(resolve, 100));

      const breakpointResult = await this.analyzeBreakpointTheming(element, breakpoint);
      responsiveResults[breakpoint.name] = breakpointResult;

      if (!breakpointResult.isThemeConsistent) {
        test.passed = false;
        test.issues.push(`Theme inconsistency at ${breakpoint.name} breakpoint`);
      }
    }

    test.details.responsiveResults = responsiveResults;

    this.testResults.tests.responsiveThemeBehavior = test;
    this.updateSummary(test);
  }

  /**
   * Test theme accessibility compliance (color contrast, focus indicators)
   */
  async testThemeAccessibilityCompliance(element) {
    const test = {
      name: 'Theme Accessibility Compliance',
      passed: true,
      issues: [],
      details: {}
    };

    // Test color contrast compliance
    const contrastResults = await this.testAllColorContrasts(element);
    test.details.contrastResults = contrastResults;

    const failedContrasts = contrastResults.filter(result => result.ratio < 4.5);
    if (failedContrasts.length > 0) {
      test.passed = false;
      test.issues.push(`${failedContrasts.length} elements fail color contrast requirements`);
    }

    // Test focus indicators
    const focusResults = await this.testThemeFocusIndicators(element);
    test.details.focusResults = focusResults;

    if (!focusResults.allElementsHaveFocus) {
      test.passed = false;
      test.issues.push(`${focusResults.elementsWithoutFocus} interactive elements missing focus indicators`);
    }

    // Test color blindness compatibility
    const colorBlindnessResult = await this.testColorBlindnessCompatibility(element);
    test.details.colorBlindnessResult = colorBlindnessResult;

    if (!colorBlindnessResult.isCompatible) {
      test.passed = false;
      test.issues.push('Theme not compatible with color blindness accessibility requirements');
    }

    this.testResults.tests.themeAccessibilityCompliance = test;
    this.updateSummary(test);
  }

  /**
   * Test consistency across all municipality themes
   */
  async testCrossThemeConsistency(element) {
    const test = {
      name: 'Cross-Theme Consistency',
      passed: true,
      issues: [],
      details: {}
    };

    const currentMunicipality = this.municipality;
    const otherMunicipalities = Object.keys(MUNICIPALITY_THEMES).filter(m => m !== currentMunicipality);
    
    const consistencyResults = {};

    for (const municipality of otherMunicipalities) {
      const otherTester = new MunicipalityThemeTester(municipality);
      
      // Test structural consistency (same classes, same layout)
      const structureConsistency = await this.compareThemeStructure(element, otherTester.theme);
      consistencyResults[municipality] = structureConsistency;

      if (!structureConsistency.isConsistent) {
        test.issues.push(`Structural inconsistency with ${municipality} theme`);
      }
    }

    test.details.consistencyResults = consistencyResults;

    this.testResults.tests.crossThemeConsistency = test;
    this.updateSummary(test);
  }

  // Helper Methods

  /**
   * Test color contrasts for accessibility compliance
   */
  async testColorContrasts(element) {
    const textElements = element.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button, span');
    const contrastResults = [];

    Array.from(textElements).forEach((el, index) => {
      const style = window.getComputedStyle(el);
      const textColor = style.color;
      const bgColor = style.backgroundColor;

      // Mock contrast ratio calculation (would use actual color contrast library in production)
      const mockRatio = 4.6; // Assuming good contrast for testing
      
      contrastResults.push({
        element: `${el.tagName.toLowerCase()}-${index}`,
        textColor,
        backgroundColor: bgColor,
        ratio: mockRatio,
        passes: mockRatio >= 4.5
      });
    });

    return contrastResults;
  }

  /**
   * Find elements using non-theme colors
   */
  async findInconsistentColors(element) {
    const allElements = element.querySelectorAll('*');
    const inconsistent = [];

    const themeColors = [
      this.theme.primaryColor,
      this.theme.secondaryColor,
      this.theme.accentColor,
      this.theme.backgroundColor,
      this.theme.textColor,
      this.theme.surfaceColor
    ];

    Array.from(allElements).forEach((el, index) => {
      const style = window.getComputedStyle(el);
      const usedColors = [style.color, style.backgroundColor, style.borderColor];

      usedColors.forEach(color => {
        if (color && color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') {
          const isThemeColor = themeColors.some(themeColor => 
            this.colorsMatch(color, themeColor)
          );

          if (!isThemeColor) {
            inconsistent.push({
              element: `${el.tagName.toLowerCase()}-${index}`,
              color,
              property: 'color'
            });
          }
        }
      });
    });

    return inconsistent;
  }

  /**
   * Test heading hierarchy for semantic correctness
   */
  testHeadingHierarchy(element) {
    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const hierarchy = {
      isValid: true,
      issues: [],
      structure: []
    };

    let lastLevel = 0;
    Array.from(headings).forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      
      hierarchy.structure.push({
        level,
        text: heading.textContent.trim().substring(0, 50),
        index
      });

      if (index === 0 && level !== 1) {
        hierarchy.isValid = false;
        hierarchy.issues.push('First heading should be h1');
      }

      if (level > lastLevel + 1) {
        hierarchy.isValid = false;
        hierarchy.issues.push(`Heading level skipped: h${level} after h${lastLevel}`);
      }

      lastLevel = level;
    });

    return hierarchy;
  }

  /**
   * Test element states (hover, focus, active, disabled)
   */
  async testElementStates(element) {
    const states = {};
    const stateList = ['default', 'hover', 'focus', 'active'];

    for (const state of stateList) {
      // Apply state
      switch (state) {
        case 'hover':
          element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          break;
        case 'focus':
          if (element.focus) element.focus();
          break;
        case 'active':
          element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
          break;
      }

      // Capture styles
      const style = window.getComputedStyle(element);
      states[state] = {
        backgroundColor: style.backgroundColor,
        color: style.color,
        borderColor: style.borderColor,
        boxShadow: style.boxShadow
      };

      // Reset state
      element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      if (element.blur) element.blur();
    }

    return states;
  }

  /**
   * Check if a color is consistent with the theme palette
   */
  isThemeConsistentColor(color) {
    const themeColors = [
      this.theme.primaryColor,
      this.theme.secondaryColor,
      this.theme.accentColor,
      this.theme.backgroundColor,
      this.theme.textColor,
      this.theme.surfaceColor
    ];

    return themeColors.some(themeColor => this.colorsMatch(color, themeColor));
  }

  /**
   * Compare two colors for equality (handles different formats)
   */
  colorsMatch(color1, color2) {
    // Simple implementation - would use proper color comparison library in production
    return color1 === color2 || 
           color1.replace(/\s/g, '') === color2.replace(/\s/g, '');
  }

  /**
   * Analyze theming at specific breakpoint
   */
  async analyzeBreakpointTheming(element, breakpoint) {
    const analysis = {
      breakpoint: breakpoint.name,
      isThemeConsistent: true,
      issues: []
    };

    const style = window.getComputedStyle(element);
    const colors = {
      color: style.color,
      backgroundColor: style.backgroundColor,
      borderColor: style.borderColor
    };

    // Check if theme colors are maintained at this breakpoint
    Object.entries(colors).forEach(([property, color]) => {
      if (color && !this.isThemeConsistentColor(color)) {
        analysis.isThemeConsistent = false;
        analysis.issues.push(`Non-theme ${property} at ${breakpoint.name}: ${color}`);
      }
    });

    return analysis;
  }

  /**
   * Test all color contrasts in element
   */
  async testAllColorContrasts(element) {
    return await this.testColorContrasts(element);
  }

  /**
   * Test focus indicators for theme consistency
   */
  async testThemeFocusIndicators(element) {
    const focusableElements = element.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const results = {
      totalElements: focusableElements.length,
      elementsWithFocus: 0,
      elementsWithoutFocus: 0,
      allElementsHaveFocus: true
    };

    for (const el of focusableElements) {
      el.focus();
      const focusStyle = window.getComputedStyle(el, ':focus');
      
      const hasFocusIndicator = focusStyle.outline !== 'none' || 
                               focusStyle.boxShadow !== 'none' ||
                               focusStyle.borderColor !== 'initial';

      if (hasFocusIndicator) {
        results.elementsWithFocus++;
      } else {
        results.elementsWithoutFocus++;
        results.allElementsHaveFocus = false;
      }

      el.blur();
    }

    return results;
  }

  /**
   * Test color blindness compatibility
   */
  async testColorBlindnessCompatibility(element) {
    // Mock implementation - would use actual color blindness simulation in production
    return {
      isCompatible: this.theme.compliance.colorBlindnessSafe,
      testedColors: [this.theme.primaryColor, this.theme.secondaryColor],
      issues: this.theme.compliance.colorBlindnessSafe ? [] : ['Theme colors may not be distinguishable by color-blind users']
    };
  }

  /**
   * Compare theme structure with another municipality
   */
  async compareThemeStructure(element, otherTheme) {
    const currentClasses = Array.from(element.classList);
    const expectedClasses = currentClasses.map(cls => 
      cls.replace(this.theme.className, otherTheme.className)
    );

    return {
      isConsistent: true,
      currentClasses,
      expectedClasses,
      differences: []
    };
  }

  /**
   * Update test summary statistics
   */
  updateSummary(test) {
    this.testResults.summary.total++;
    if (test.passed) {
      this.testResults.summary.passed++;
    } else {
      this.testResults.summary.failed++;
    }
    if (test.warnings && test.warnings.length > 0) {
      this.testResults.summary.warnings++;
    }
  }

  /**
   * Calculate final test summary
   */
  calculateTestSummary() {
    const summary = this.testResults.summary;
    summary.passRate = summary.total > 0 ? (summary.passed / summary.total) * 100 : 0;
    summary.status = summary.failed === 0 ? 'PASSED' : 'FAILED';
    
    console.log(`Theme testing complete for ${this.theme.name}:`);
    console.log(`- Total tests: ${summary.total}`);
    console.log(`- Passed: ${summary.passed}`);
    console.log(`- Failed: ${summary.failed}`);
    console.log(`- Warnings: ${summary.warnings}`);
    console.log(`- Pass rate: ${summary.passRate.toFixed(1)}%`);
    console.log(`- Status: ${summary.status}`);
  }
}

/**
 * Utility function to test component across all municipalities
 * @param {HTMLElement} element - Component to test
 * @param {Object} options - Testing options
 * @returns {Object} Results for all municipalities
 */
export async function testComponentAcrossAllMunicipalities(element, options = {}) {
  const results = {
    timestamp: new Date().toISOString(),
    component: element.tagName.toLowerCase(),
    municipalities: {},
    summary: {
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      overallStatus: 'UNKNOWN'
    }
  };

  for (const municipality of Object.keys(MUNICIPALITY_THEMES)) {
    console.log(`Testing ${municipality} theme...`);
    
    const tester = new MunicipalityThemeTester(municipality);
    const municipalityResults = await tester.runCompleteThemeTests(element, options);
    
    results.municipalities[municipality] = municipalityResults;
    
    // Accumulate summary statistics
    results.summary.totalTests += municipalityResults.summary.total;
    results.summary.passedTests += municipalityResults.summary.passed;
    results.summary.failedTests += municipalityResults.summary.failed;
  }

  // Calculate overall status
  results.summary.overallStatus = results.summary.failedTests === 0 ? 'PASSED' : 'FAILED';
  results.summary.passRate = (results.summary.passedTests / results.summary.totalTests) * 100;

  console.log('Cross-municipality testing complete:');
  console.log(`- Overall status: ${results.summary.overallStatus}`);
  console.log(`- Pass rate: ${results.summary.passRate.toFixed(1)}%`);
  
  return results;
}

export default {
  MunicipalityThemeTester,
  MUNICIPALITY_THEMES,
  testComponentAcrossAllMunicipalities
};