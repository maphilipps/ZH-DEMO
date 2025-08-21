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

// Swiss compliance testing helpers for GPZH
export const testAccessibility = {
  checkMinimumFontSize: (element) => {
    const computedStyle = window.getComputedStyle(element);
    const fontSize = parseFloat(computedStyle.fontSize);
    return fontSize >= 16; // eCH-0059 minimum 16px
  },
  
  checkColorContrast: (element) => {
    // Mock implementation - in real tests this would use axe-core
    return true;
  },
  
  checkTouchTargets: (element) => {
    const rect = element.getBoundingClientRect();
    return rect.width >= 44 && rect.height >= 44; // 44px minimum
  },
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

// Municipal form testing helpers for GPZH demo
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
  
  validateSwissAddressFormat: (address) => {
    // Mock Swiss address validation for eCH-0010 standard
    return {
      isValid: true,
      street: address.street,
      houseNumber: address.houseNumber,
      postalCode: address.postalCode,
      city: address.city,
    };
  },
};

console.log('Test utilities loaded for GPZH demo system');