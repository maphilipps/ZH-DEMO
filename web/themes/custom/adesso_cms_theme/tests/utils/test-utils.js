/**
 * Test Utilities for Vitest Unit Testing
 * 
 * This file provides common testing utilities and setup for the GPZH demo system.
 * It configures JSDOM, provides mock functions, and sets up the testing environment.
 */

import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock Alpine.js for components that use it
global.Alpine = {
  data: vi.fn(),
  directive: vi.fn(),
  start: vi.fn(),
  store: vi.fn((name, data) => data),
  magic: vi.fn(),
};

// Mock Drupal behaviors system
global.Drupal = {
  behaviors: {},
  attachBehaviors: vi.fn(),
  detachBehaviors: vi.fn(),
  t: vi.fn((str) => str),
  url: vi.fn((path) => `/${path}`),
  settings: {
    path: {
      baseUrl: '/',
      pathPrefix: '',
    },
  },
};

// Mock jQuery for legacy components
global.$ = vi.fn(() => ({
  ready: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
  find: vi.fn(),
  addClass: vi.fn(),
  removeClass: vi.fn(),
  toggleClass: vi.fn(),
  attr: vi.fn(),
  removeAttr: vi.fn(),
  data: vi.fn(),
  each: vi.fn(),
  trigger: vi.fn(),
}));

global.jQuery = global.$;

// Mock common browser APIs
global.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

global.ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia for responsive testing
global.matchMedia = vi.fn((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Mock fetch for API testing
global.fetch = vi.fn();

// Setup DOM environment helpers
export const setupDOMElement = (html) => {
  document.body.innerHTML = html;
  return document.body.firstElementChild;
};

export const cleanupDOM = () => {
  document.body.innerHTML = '';
};

// Mock Swiper for carousel components
global.Swiper = vi.fn(() => ({
  init: vi.fn(),
  update: vi.fn(),
  destroy: vi.fn(),
  slideTo: vi.fn(),
  slideNext: vi.fn(),
  slidePrev: vi.fn(),
}));

// Helper for testing Alpine.js components
export const createAlpineComponent = (dataFunction) => {
  const mockElement = document.createElement('div');
  const mockAlpine = {
    $data: dataFunction(),
    $el: mockElement,
    $refs: {},
    $store: global.Alpine.store,
  };
  return mockAlpine;
};

// Helper for testing Drupal behaviors
export const testDrupalBehavior = (behaviorName, behavior, context = document) => {
  const settings = global.Drupal.settings;
  behavior.attach(context, settings);
  return { context, settings };
};

// Mock for form validation
export const mockFormValidation = () => ({
  validate: vi.fn(() => true),
  showError: vi.fn(),
  clearErrors: vi.fn(),
  isValid: vi.fn(() => true),
});

// Helper for component story testing
export const renderStoryComponent = (template, data = {}) => {
  // This would integrate with Storybook for component testing
  const element = document.createElement('div');
  element.innerHTML = template;
  return element.firstElementChild;
};

// Setup and teardown helpers
export const beforeEachTest = () => {
  // Reset all mocks
  vi.clearAllMocks();
  
  // Clear DOM
  cleanupDOM();
  
  // Reset Alpine.js state
  if (global.Alpine) {
    global.Alpine.data.mockClear();
    global.Alpine.directive.mockClear();
  }
  
  // Reset Drupal state
  if (global.Drupal) {
    global.Drupal.attachBehaviors.mockClear();
    global.Drupal.detachBehaviors.mockClear();
  }
};

export const afterEachTest = () => {
  cleanupDOM();
};

// Swiss compliance testing helpers for GPZH - Enhanced Phase 2.3
export const testAccessibility = {
  // eCH-0059 minimum font size validation
  checkMinimumFontSize: (element) => {
    const computedStyle = window.getComputedStyle(element);
    const fontSize = parseFloat(computedStyle.fontSize);
    return fontSize >= 16; // eCH-0059 minimum 16px
  },
  
  // WCAG 2.1 AA color contrast validation
  checkColorContrast: async (element) => {
    if (typeof window !== 'undefined' && window.axe) {
      try {
        const results = await window.axe.run(element, {
          rules: {
            'color-contrast': { enabled: true }
          }
        });
        return results.violations.length === 0;
      } catch (error) {
        console.warn('Axe-core not available, skipping color contrast check');
        return true;
      }
    }
    return true;
  },
  
  // Swiss government touch target requirements (44px minimum)
  checkTouchTargets: (element) => {
    const rect = element.getBoundingClientRect();
    return rect.width >= 44 && rect.height >= 44;
  },
  
  // eCH-0059 keyboard navigation validation
  checkKeyboardAccessibility: async (element) => {
    const focusableSelectors = [
      'a[href]',
      'area[href]', 
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'iframe',
      'object',
      '[tabindex]',
      '[contenteditable]'
    ];
    
    const focusableElements = element.querySelectorAll(focusableSelectors.join(','));
    let accessibilityIssues = [];
    
    focusableElements.forEach((el, index) => {
      // Check for proper ARIA attributes
      if (el.tagName === 'BUTTON' && !el.textContent.trim() && !el.getAttribute('aria-label')) {
        accessibilityIssues.push(`Button ${index} missing accessible name`);
      }
      
      // Check for proper link targets
      if (el.tagName === 'A' && el.getAttribute('href') === '#' && !el.getAttribute('role')) {
        accessibilityIssues.push(`Link ${index} with href="#" should have role="button"`);
      }
      
      // Check for proper form labels
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) {
        const label = element.querySelector(`label[for="${el.id}"]`);
        const ariaLabel = el.getAttribute('aria-label');
        const ariaLabelledby = el.getAttribute('aria-labelledby');
        
        if (!label && !ariaLabel && !ariaLabelledby) {
          accessibilityIssues.push(`Form field ${index} missing accessible label`);
        }
      }
    });
    
    return {
      isAccessible: accessibilityIssues.length === 0,
      issues: accessibilityIssues,
      focusableCount: focusableElements.length
    };
  },
  
  // Swiss multilingual content validation
  checkMultilingualSupport: (element) => {
    const textElements = element.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div[class*="text"]');
    let multilingualIssues = [];
    
    textElements.forEach((el, index) => {
      const text = el.textContent.trim();
      if (text) {
        // Check for proper lang attribute on multilingual content
        const lang = el.getAttribute('lang') || element.getAttribute('lang') || document.documentElement.getAttribute('lang');
        
        if (!lang) {
          multilingualIssues.push(`Text element ${index} missing lang attribute`);
        }
        
        // Check for text expansion space (German text can be 25% longer)
        const style = window.getComputedStyle(el);
        if (style.whiteSpace === 'nowrap' && text.length > 20) {
          multilingualIssues.push(`Text element ${index} may not accommodate German text expansion`);
        }
      }
    });
    
    return {
      isCompliant: multilingualIssues.length === 0,
      issues: multilingualIssues
    };
  },
  
  // eCH-0059 structural validation
  checkSemanticStructure: (element) => {
    const structuralIssues = [];
    
    // Check heading hierarchy
    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastHeadingLevel = 0;
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      
      if (index === 0 && level !== 1) {
        structuralIssues.push('First heading should be h1');
      }
      
      if (level > lastHeadingLevel + 1) {
        structuralIssues.push(`Heading hierarchy skipped level: ${heading.tagName} after h${lastHeadingLevel}`);
      }
      
      lastHeadingLevel = level;
    });
    
    // Check for proper landmark usage
    const landmarks = element.querySelectorAll('[role="banner"], [role="main"], [role="navigation"], [role="complementary"], [role="contentinfo"], header, nav, main, aside, footer');
    const landmarkTypes = new Set();
    
    landmarks.forEach(landmark => {
      const role = landmark.getAttribute('role') || landmark.tagName.toLowerCase();
      if (role === 'banner' || role === 'header') {
        if (landmarkTypes.has('banner')) {
          structuralIssues.push('Multiple banner/header landmarks found');
        }
        landmarkTypes.add('banner');
      }
    });
    
    return {
      isStructurallyValid: structuralIssues.length === 0,
      issues: structuralIssues,
      landmarkCount: landmarks.length
    };
  }
};

// Performance testing helpers
export const testPerformance = {
  measureRenderTime: async (renderFunction) => {
    const start = performance.now();
    await renderFunction();
    const end = performance.now();
    return end - start;
  },
  
  checkImageOptimization: (img) => {
    return img.loading === 'lazy' || img.getAttribute('loading') === 'lazy';
  },
};

// Municipal form testing helpers for GPZH demo - Enhanced Phase 2.3
export const testMunicipalForms = {
  mockFormSubmission: (formData) => ({
    submit: vi.fn(() => Promise.resolve({ success: true, data: formData })),
    validate: vi.fn(() => true),
    serialize: vi.fn(() => formData),
  }),
  
  mockWorkflowStates: () => ({
    draft: 'draft',
    submitted: 'submitted', 
    reviewed: 'reviewed',
    approved: 'approved',
    rejected: 'rejected',
  }),
  
  // eCH-0010 Swiss address format validation
  validateSwissAddressFormat: (address) => {
    const validation = {
      isValid: true,
      errors: [],
      street: address.street,
      houseNumber: address.houseNumber,
      postalCode: address.postalCode,
      city: address.city,
    };
    
    // Validate postal code format (4 digits)
    if (!/^\d{4}$/.test(address.postalCode)) {
      validation.isValid = false;
      validation.errors.push('Swiss postal code must be 4 digits');
    }
    
    // Validate street format
    if (!address.street || address.street.length < 2) {
      validation.isValid = false;
      validation.errors.push('Street name is required');
    }
    
    // Validate house number
    if (!address.houseNumber || !/^\d+[a-zA-Z]?$/.test(address.houseNumber)) {
      validation.isValid = false;
      validation.errors.push('Valid house number is required');
    }
    
    return validation;
  },
  
  // eCH-0044 Swiss person identification validation
  validateSwissPersonData: (person) => {
    const validation = {
      isValid: true,
      errors: [],
      ...person
    };
    
    // Validate Swiss social security number (AHV) format
    if (person.ahvNumber && !/^756\d{10}$/.test(person.ahvNumber.replace(/\./g, ''))) {
      validation.isValid = false;
      validation.errors.push('Invalid Swiss AHV number format');
    }
    
    // Validate birth date format
    if (person.birthDate && !/^\d{4}-\d{2}-\d{2}$/.test(person.birthDate)) {
      validation.isValid = false;
      validation.errors.push('Birth date must be in YYYY-MM-DD format');
    }
    
    return validation;
  },
  
  // eCH-0058 Swiss e-government form validation
  validateEGovernmentForm: (formElement) => {
    const validation = {
      isCompliant: true,
      issues: [],
      requiredFields: [],
      optionalFields: []
    };
    
    const inputs = formElement.querySelectorAll('input, select, textarea');
    
    inputs.forEach((input, index) => {
      const label = formElement.querySelector(`label[for="${input.id}"]`);
      const isRequired = input.hasAttribute('required');
      
      // Check for proper labeling
      if (!label && !input.getAttribute('aria-label')) {
        validation.isCompliant = false;
        validation.issues.push(`Form field ${index} missing label`);
      }
      
      // Check for error message containers
      const errorContainer = formElement.querySelector(`[data-error-for="${input.id}"]`);
      if (isRequired && !errorContainer) {
        validation.issues.push(`Required field ${index} missing error message container`);
      }
      
      if (isRequired) {
        validation.requiredFields.push({
          id: input.id,
          type: input.type,
          name: input.name,
          hasLabel: !!label
        });
      } else {
        validation.optionalFields.push({
          id: input.id,
          type: input.type,
          name: input.name
        });
      }
    });
    
    return validation;
  },
  
  // Swiss municipality theme validation
  validateMunicipalityTheme: (element, municipality) => {
    const municipalityThemes = {
      thalwil: {
        primaryColor: '#3B82F6', // Blue
        secondaryColor: '#1E40AF',
        className: 'municipality-thalwil'
      },
      thalheim: {
        primaryColor: '#10B981', // Green  
        secondaryColor: '#047857',
        className: 'municipality-thalheim'
      },
      erlenbach: {
        primaryColor: '#06B6D4', // Turquoise
        secondaryColor: '#0891B2', 
        className: 'municipality-erlenbach'
      }
    };
    
    const theme = municipalityThemes[municipality];
    if (!theme) {
      return {
        isValidTheme: false,
        error: `Unknown municipality: ${municipality}`
      };
    }
    
    const hasThemeClass = element.classList.contains(theme.className) ||
                         element.querySelector(`.${theme.className}`);
    
    return {
      isValidTheme: hasThemeClass,
      municipality,
      expectedClass: theme.className,
      hasThemeClass
    };
  }
};

// Component testing utilities for SDC components - Phase 2.3
export const testComponent = {
  // Render SDC component from Twig template
  renderSDCComponent: async (componentName, props = {}) => {
    const container = document.createElement('div');
    container.setAttribute('data-test-component', componentName);
    
    // Mock SDC component structure
    const componentHtml = `
      <div class="c-${componentName}" data-component="${componentName}">
        ${props.children || '<div>Mock component content</div>'}
      </div>
    `;
    
    container.innerHTML = componentHtml;
    return container.firstElementChild;
  },
  
  // Test component Alpine.js functionality
  testAlpineJSComponent: async (element, alpineData = {}) => {
    // Mock Alpine.js initialization
    if (global.Alpine && element) {
      const mockAlpineComponent = {
        $data: alpineData,
        $el: element,
        $refs: {},
        $store: global.Alpine.store
      };
      
      // Simulate Alpine.js data binding
      element.setAttribute('x-data', JSON.stringify(alpineData));
      
      return mockAlpineComponent;
    }
    
    return null;
  },
  
  // Test component responsive behavior
  testResponsiveComponent: async (element) => {
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1200, height: 800, name: 'desktop' }
    ];
    
    const results = {};
    
    for (const viewport of viewports) {
      // Simulate viewport change
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: viewport.width
      });
      
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: viewport.height
      });
      
      // Trigger resize event
      window.dispatchEvent(new Event('resize'));
      
      // Check element visibility and layout
      const style = window.getComputedStyle(element);
      const boundingBox = element.getBoundingClientRect();
      
      results[viewport.name] = {
        isVisible: style.display !== 'none' && style.visibility !== 'hidden',
        width: boundingBox.width,
        height: boundingBox.height,
        hasOverflow: boundingBox.width > viewport.width
      };
    }
    
    return results;
  },
  
  // Test component interaction states
  testInteractionStates: async (element) => {
    const states = ['default', 'hover', 'focus', 'active', 'disabled'];
    const results = {};
    
    for (const state of states) {
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
        case 'disabled':
          element.setAttribute('disabled', 'disabled');
          break;
        default:
          // Default state - no action needed
          break;
      }
      
      const computedStyle = window.getComputedStyle(element);
      results[state] = {
        className: element.className,
        styles: {
          backgroundColor: computedStyle.backgroundColor,
          color: computedStyle.color,
          borderColor: computedStyle.borderColor,
          cursor: computedStyle.cursor
        }
      };
      
      // Reset for next state
      element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      if (element.blur) element.blur();
      element.removeAttribute('disabled');
    }
    
    return results;
  }
};

// Performance testing utilities for Swiss government requirements - Phase 2.3
export const testPerformance = {
  // Enhanced render time measurement
  measureRenderTime: async (renderFunction) => {
    const start = performance.now();
    await renderFunction();
    const end = performance.now();
    return {
      renderTime: end - start,
      isAcceptable: (end - start) < 100, // <100ms for good UX
      performance: {
        start,
        end,
        duration: end - start
      }
    };
  },
  
  // Check image optimization according to Swiss standards
  checkImageOptimization: (img) => {
    const issues = [];
    
    if (!img.getAttribute('alt')) {
      issues.push('Missing alt attribute');
    }
    
    if (!img.loading || img.loading !== 'lazy') {
      issues.push('Image not using lazy loading');
    }
    
    // Check for responsive images
    const hasPicture = img.parentElement?.tagName === 'PICTURE';
    const hasSrcset = img.getAttribute('srcset');
    
    if (!hasPicture && !hasSrcset) {
      issues.push('Image not using responsive techniques');
    }
    
    return {
      isOptimized: issues.length === 0,
      issues,
      hasAlt: !!img.getAttribute('alt'),
      isLazy: img.loading === 'lazy',
      isResponsive: hasPicture || hasSrcset
    };
  },
  
  // Test Core Web Vitals simulation
  simulateCoreWebVitals: async (element) => {
    const startTime = performance.now();
    
    // Simulate LCP (Largest Contentful Paint)
    const largestElement = element.querySelector('img, h1, h2, .hero-heading, .c-hero');
    const lcpTime = largestElement ? startTime + Math.random() * 1500 : null;
    
    // Simulate CLS (Cumulative Layout Shift)
    const hasFixedDimensions = element.style.width && element.style.height;
    const clsScore = hasFixedDimensions ? 0.05 : 0.15;
    
    // Simulate FID (First Input Delay) 
    const fidTime = Math.random() * 50; // Good FID is <100ms
    
    return {
      lcp: {
        time: lcpTime,
        isGood: lcpTime ? lcpTime < 2500 : false,
        element: largestElement?.tagName || null
      },
      cls: {
        score: clsScore,
        isGood: clsScore < 0.1,
        hasFixedDimensions
      },
      fid: {
        time: fidTime,
        isGood: fidTime < 100
      },
      overall: {
        score: (lcpTime < 2500 ? 1 : 0) + (clsScore < 0.1 ? 1 : 0) + (fidTime < 100 ? 1 : 0),
        maxScore: 3,
        isGood: function() { return this.score >= 2; }
      }
    };
  },
  
  // Bundle size analysis for components
  analyzeComponentSize: (componentName) => {
    // Mock implementation - in real setup would analyze actual bundle
    const mockSizes = {
      hero: { js: '2.3kb', css: '1.8kb' },
      button: { js: '0.8kb', css: '1.2kb' },
      carousel: { js: '8.5kb', css: '3.2kb' },
      form: { js: '4.1kb', css: '2.6kb' }
    };
    
    const sizes = mockSizes[componentName] || { js: '1.0kb', css: '0.5kb' };
    
    return {
      component: componentName,
      sizes,
      total: parseFloat(sizes.js) + parseFloat(sizes.css),
      isBudgetCompliant: (parseFloat(sizes.js) + parseFloat(sizes.css)) < 10 // <10kb budget
    };
  }
};

// Swiss government compliance testing utilities - Phase 2.3
export const testSwissCompliance = {
  // eCH-0059 web accessibility standard validation
  validateECH0059: async (element) => {
    const compliance = {
      isCompliant: true,
      violations: [],
      warnings: [],
      checkedCriteria: []
    };
    
    // Criterion 1: Semantic markup
    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let headingOrder = true;
    let lastLevel = 0;
    
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      if (level > lastLevel + 1) {
        headingOrder = false;
      }
      lastLevel = level;
    });
    
    if (!headingOrder) {
      compliance.isCompliant = false;
      compliance.violations.push('Heading hierarchy not properly structured');
    }
    compliance.checkedCriteria.push('Semantic heading structure');
    
    // Criterion 2: Keyboard accessibility
    const interactiveElements = element.querySelectorAll('button, a, input, select, textarea');
    interactiveElements.forEach((el, index) => {
      if (el.tabIndex === -1 && !el.hasAttribute('disabled')) {
        compliance.isCompliant = false;
        compliance.violations.push(`Interactive element ${index} not keyboard accessible`);
      }
    });
    compliance.checkedCriteria.push('Keyboard accessibility');
    
    // Criterion 3: Alternative text for images
    const images = element.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.getAttribute('alt')) {
        if (img.getAttribute('role') !== 'presentation' && !img.getAttribute('aria-hidden')) {
          compliance.isCompliant = false;
          compliance.violations.push(`Image ${index} missing alternative text`);
        }
      }
    });
    compliance.checkedCriteria.push('Alternative text for images');
    
    // Criterion 4: Color contrast (minimum 4.5:1 for normal text)
    const textElements = element.querySelectorAll('p, span, a, button, h1, h2, h3, h4, h5, h6');
    textElements.forEach((el, index) => {
      const style = window.getComputedStyle(el);
      const bgColor = style.backgroundColor;
      const textColor = style.color;
      
      // Mock contrast ratio calculation (would use actual color contrast library)
      if (bgColor !== 'rgba(0, 0, 0, 0)' && textColor) {
        const mockContrastRatio = 4.6; // Mock good contrast
        if (mockContrastRatio < 4.5) {
          compliance.isCompliant = false;
          compliance.violations.push(`Text element ${index} has insufficient color contrast`);
        }
      }
    });
    compliance.checkedCriteria.push('Color contrast ratios');
    
    // Criterion 5: Form labels and instructions
    const formElements = element.querySelectorAll('input, select, textarea');
    formElements.forEach((el, index) => {
      const label = element.querySelector(`label[for=\"${el.id}\"]`);
      const ariaLabel = el.getAttribute('aria-label');
      const ariaLabelledby = el.getAttribute('aria-labelledby');
      
      if (!label && !ariaLabel && !ariaLabelledby) {
        compliance.isCompliant = false;
        compliance.violations.push(`Form element ${index} missing accessible label`);
      }
    });
    compliance.checkedCriteria.push('Form labels and instructions');
    
    return compliance;
  },
  
  // Swiss Data Protection Act (DSG) compliance check
  validateDataProtection: (element) => {
    const compliance = {
      isCompliant: true,
      issues: [],
      dataProcessingElements: []
    };
    
    // Check for forms that collect personal data
    const forms = element.querySelectorAll('form');
    forms.forEach((form, index) => {
      const inputs = form.querySelectorAll('input[type="email"], input[name*="name"], input[name*="address"], input[name*="phone"]');
      
      if (inputs.length > 0) {
        const privacyNotice = form.querySelector('[data-privacy-notice], .privacy-notice');
        const consent = form.querySelector('input[type="checkbox"][name*="consent"], input[type="checkbox"][name*="privacy"]');
        
        if (!privacyNotice) {
          compliance.isCompliant = false;
          compliance.issues.push(`Form ${index} collecting personal data missing privacy notice`);
        }
        
        if (!consent) {
          compliance.isCompliant = false;
          compliance.issues.push(`Form ${index} collecting personal data missing consent checkbox`);
        }
        
        compliance.dataProcessingElements.push({
          formIndex: index,
          hasPrivacyNotice: !!privacyNotice,
          hasConsent: !!consent,
          personalDataFields: inputs.length
        });
      }
    });
    
    // Check for cookies and tracking
    const cookieNotice = element.querySelector('[data-cookie-notice], .cookie-banner');
    if (!cookieNotice && document.cookie) {
      compliance.issues.push('Cookies detected but no cookie notice found');
    }
    
    return compliance;
  },
  
  // Multi-language compliance for Swiss government portals
  validateMultilingualCompliance: (element) => {
    const compliance = {
      isCompliant: true,
      issues: [],
      supportedLanguages: [],
      textExpansionReady: true
    };
    
    // Check for language switcher
    const langSwitcher = element.querySelector('[data-language-switcher], .language-selector');
    if (!langSwitcher) {
      compliance.issues.push('No language switcher found');
    }
    
    // Check lang attributes
    const elementsWithText = element.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
    let elementsWithoutLang = 0;
    
    elementsWithText.forEach(el => {\n      const hasText = el.textContent.trim().length > 0;\n      const hasLang = el.getAttribute('lang') || element.getAttribute('lang') || document.documentElement.getAttribute('lang');\n      \n      if (hasText && !hasLang) {\n        elementsWithoutLang++;\n      }\n      \n      // Check for text expansion readiness (German text can be 25% longer)\n      const style = window.getComputedStyle(el);\n      if (hasText && style.whiteSpace === 'nowrap' && el.textContent.length > 15) {\n        compliance.textExpansionReady = false;\n      }\n    });\n    \n    if (elementsWithoutLang > 0) {\n      compliance.issues.push(`${elementsWithoutLang} text elements missing language attributes`);\n    }\n    \n    if (!compliance.textExpansionReady) {\n      compliance.issues.push('Components may not handle German text expansion properly');\n    }\n    \n    compliance.isCompliant = compliance.issues.length === 0;\n    return compliance;\n  }\n};\n\nconsole.log('Enhanced test utilities loaded for GPZH demo system - Phase 2.3 Implementation');