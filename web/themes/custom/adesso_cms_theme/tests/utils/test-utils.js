// Test utilities - Following PnX Vorbild minimal approach
import '@testing-library/jest-dom/vitest';

// Simple DOM setup for component testing
export function setupDOMElement(html = '<div></div>') {
  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);
  return container;
}

// Simple cleanup
export function cleanupDOM() {
  document.body.innerHTML = '';
}

// Legacy exports for existing overly complex tests (to be simplified)
export function beforeEachTest() {
  cleanupDOM();
}

export function afterEachTest() {
  cleanupDOM();
}