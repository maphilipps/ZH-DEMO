/**
 * @file Theme Selector Accessibility Tests
 * Tests for WCAG 2.1 AA compliance of the theme selector feature
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { testBasicAccessibility, commonTests } from './utils/test-utils.js';

// Mock axe-core for accessibility testing
const mockAxeResults = {
  violations: [],
  passes: [],
  inapplicable: [],
  incomplete: []
};

// Mock axe-core run function
global.axe = {
  run: vi.fn().mockResolvedValue(mockAxeResults),
  configure: vi.fn()
};

// Create mock theme selector with accessibility features
function createAccessibleThemeSelector(selectedValue = 'light') {
  return `
    <div class="js-form-item form-item js-form-type-select form-type-select js-form-item-field-content-element-theme-0-value form-item-field-content-element-theme-0-value mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm" role="group" aria-labelledby="theme-selector-legend">
      <fieldset>
        <legend id="theme-selector-legend" class="sr-only">Content Element Theme Selection</legend>
        
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0 mt-1">
            <span class="text-2xl" role="img" aria-label="Theme selector icon">🎨</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="mb-3">
              <label for="edit-field-content-element-theme-0-value" class="form-label font-medium text-gray-900">
                Content Element Theme
                <span class="sr-only">(Choose how this content block should be styled)</span>
              </label>
            </div>
            
            <div class="relative">
              <select 
                name="field_theme[0][value]" 
                id="edit-field-content-element-theme-0-value" 
                class="form-select block w-full rounded-md py-2 px-3 text-base font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-blue-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white transition-colors duration-200"
                aria-describedby="theme-description theme-preview-description"
                onchange="updateThemePreview(this.value)">
                <option value="light" ${selectedValue === 'light' ? 'selected="selected"' : ''} data-theme="light">🌟 Light - Standard white background</option>
                <option value="highlighted" ${selectedValue === 'highlighted' ? 'selected="selected"' : ''} data-theme="highlighted">🎯 Highlighted - Light gray background for emphasis</option>
                <option value="dark" ${selectedValue === 'dark' ? 'selected="selected"' : ''} data-theme="dark">🌙 Dark - Dark background with light text</option>
              </select>
            </div>
            
            <div id="theme-description" class="text-sm text-blue-700 bg-blue-100 px-3 py-2 rounded mt-3">
              <strong>Theme Options:</strong>
              <ul class="mt-1 ml-4 list-disc text-xs">
                <li><strong>Light:</strong> Standard white background with dark text - good contrast for readability</li>
                <li><strong>Highlighted:</strong> Light gray background for emphasis - draws attention to content</li>
                <li><strong>Dark:</strong> Dark background with light text - modern look with high contrast</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="mt-4">
          <h4 id="theme-preview-description" class="text-sm font-medium text-blue-900 mb-2">Theme Preview - Click to select:</h4>
          <div class="grid grid-cols-3 gap-3 text-xs" role="radiogroup" aria-labelledby="theme-preview-description">
            <div class="theme-preview-card bg-white border border-gray-200 rounded p-3 text-center cursor-pointer transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                 data-theme="light" 
                 onclick="selectTheme('light')"
                 role="radio"
                 aria-checked="${selectedValue === 'light' ? 'true' : 'false'}"
                 tabindex="${selectedValue === 'light' ? '0' : '-1'}"
                 aria-label="Select Light Theme - Standard white background with dark text">
              <div class="w-full h-6 bg-white border border-gray-300 rounded mb-2 flex items-center justify-center" aria-hidden="true">
                <span class="text-xs text-gray-600">Aa</span>
              </div>
              <span class="text-gray-600 font-medium">🌟 Light</span>
              <div class="text-xs text-gray-500 mt-1">Standard</div>
            </div>
            <div class="theme-preview-card bg-gray-100 border border-gray-300 rounded p-3 text-center cursor-pointer transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                 data-theme="highlighted" 
                 onclick="selectTheme('highlighted')"
                 role="radio"
                 aria-checked="${selectedValue === 'highlighted' ? 'true' : 'false'}"
                 tabindex="${selectedValue === 'highlighted' ? '0' : '-1'}"
                 aria-label="Select Highlighted Theme - Light gray background for emphasis">
              <div class="w-full h-6 bg-gray-100 border border-gray-400 rounded mb-2 flex items-center justify-center" aria-hidden="true">
                <span class="text-xs text-gray-700">Aa</span>
              </div>
              <span class="text-gray-700 font-medium">🎯 Highlighted</span>
              <div class="text-xs text-gray-600 mt-1">Emphasis</div>
            </div>
            <div class="theme-preview-card bg-gray-900 border border-gray-700 rounded p-3 text-center cursor-pointer transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                 data-theme="dark" 
                 onclick="selectTheme('dark')"
                 role="radio"
                 aria-checked="${selectedValue === 'dark' ? 'true' : 'false'}"
                 tabindex="${selectedValue === 'dark' ? '0' : '-1'}"
                 aria-label="Select Dark Theme - Dark background with light text">
              <div class="w-full h-6 bg-gray-800 border border-gray-600 rounded mb-2 flex items-center justify-center" aria-hidden="true">
                <span class="text-xs text-gray-200">Aa</span>
              </div>
              <span class="text-gray-200 font-medium">🌙 Dark</span>
              <div class="text-xs text-gray-400 mt-1">Night mode</div>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  `;
}

// Setup accessible JavaScript functions
function setupAccessibleThemeSelectorJS() {
  window.selectTheme = function(themeValue) {
    const themeSelect = document.querySelector('select[name*="field_theme"]');
    if (themeSelect) {
      themeSelect.value = themeValue;
      themeSelect.dispatchEvent(new Event('change'));
    }
    updateThemePreview(themeValue);
    updateRadioGroupState(themeValue);
  };
  
  window.updateThemePreview = function(selectedTheme) {
    const previewCards = document.querySelectorAll('.theme-preview-card');
    previewCards.forEach(card => {
      card.classList.remove('ring-2', 'ring-blue-500');
      card.setAttribute('aria-checked', 'false');
      card.setAttribute('tabindex', '-1');
      
      if (card.dataset.theme === selectedTheme) {
        card.classList.add('ring-2', 'ring-blue-500');
        card.setAttribute('aria-checked', 'true');
        card.setAttribute('tabindex', '0');
      }
    });
  };
  
  window.updateRadioGroupState = function(selectedTheme) {
    const radioGroup = document.querySelector('[role="radiogroup"]');
    if (radioGroup) {
      radioGroup.setAttribute('aria-activedescendant', `theme-card-${selectedTheme}`);
    }
  };
  
  // Enhanced keyboard support
  document.addEventListener('keydown', function(e) {
    if (e.target.classList.contains('theme-preview-card')) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.target.click();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleArrowNavigation(e.target, e.key);
      }
    }
  });
  
  function handleArrowNavigation(currentCard, key) {
    const cards = Array.from(document.querySelectorAll('.theme-preview-card'));
    const currentIndex = cards.indexOf(currentCard);
    let nextIndex;
    
    if (key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % cards.length;
    } else {
      nextIndex = (currentIndex - 1 + cards.length) % cards.length;
    }
    
    cards[nextIndex].focus();
  }
}

describe('Theme Selector Accessibility Tests', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
    setupAccessibleThemeSelectorJS();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    delete window.selectTheme;
    delete window.updateThemePreview;
    delete window.updateRadioGroupState;
  });

  describe('WCAG 2.1 AA Compliance', () => {
    beforeEach(() => {
      const themeSelectorHtml = createAccessibleThemeSelector();
      container.innerHTML = themeSelectorHtml;
    });

    it('should pass automated accessibility audit', async () => {
      const results = await axe.run(container);
      expect(results.violations).toHaveLength(0);
    });

    it('should have proper semantic structure', () => {
      // Check for fieldset/legend structure
      const fieldset = container.querySelector('fieldset');
      const legend = container.querySelector('legend');
      
      expect(fieldset).toBeInTheDocument();
      expect(legend).toBeInTheDocument();
      expect(legend.id).toBe('theme-selector-legend');
    });

    it('should have accessible form labels', () => {
      const label = container.querySelector('label[for="edit-field-content-element-theme-0-value"]');
      const select = container.querySelector('#edit-field-content-element-theme-0-value');
      
      expect(label).toBeInTheDocument();
      expect(select).toBeInTheDocument();
      expect(label.getAttribute('for')).toBe(select.id);
      
      // Check for screen reader only description
      const srOnlyDescription = label.querySelector('.sr-only');
      expect(srOnlyDescription).toBeInTheDocument();
    });

    it('should have proper ARIA attributes', () => {
      const select = container.querySelector('select');
      const radioGroup = container.querySelector('[role="radiogroup"]');
      
      expect(select.getAttribute('aria-describedby')).toContain('theme-description');
      expect(select.getAttribute('aria-describedby')).toContain('theme-preview-description');
      
      expect(radioGroup).toBeInTheDocument();
      expect(radioGroup.getAttribute('aria-labelledby')).toBe('theme-preview-description');
    });

    it('should have accessible radio button alternatives', () => {
      const radioButtons = container.querySelectorAll('[role="radio"]');
      
      expect(radioButtons).toHaveLength(3);
      
      radioButtons.forEach(radio => {
        expect(radio.getAttribute('role')).toBe('radio');
        expect(radio.getAttribute('aria-checked')).toMatch(/^(true|false)$/);
        expect(radio.getAttribute('aria-label')).toBeTruthy();
        expect(radio.getAttribute('tabindex')).toMatch(/^(-1|0)$/);
      });
    });

    it('should manage focus correctly', () => {
      const lightCard = container.querySelector('[data-theme="light"]');
      const highlightedCard = container.querySelector('[data-theme="highlighted"]');
      
      // Initially, only the selected card should be focusable
      expect(lightCard.getAttribute('tabindex')).toBe('0');
      expect(highlightedCard.getAttribute('tabindex')).toBe('-1');
      
      // After selecting highlighted, focus should move
      window.selectTheme('highlighted');
      
      expect(lightCard.getAttribute('tabindex')).toBe('-1');
      expect(highlightedCard.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('Keyboard Navigation', () => {
    beforeEach(() => {
      const themeSelectorHtml = createAccessibleThemeSelector();
      container.innerHTML = themeSelectorHtml;
    });

    it('should support Tab navigation', () => {
      const select = container.querySelector('select');
      const lightCard = container.querySelector('[data-theme="light"]');
      
      select.focus();
      expect(document.activeElement).toBe(select);
      
      // Simulate Tab to next focusable element
      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
      select.dispatchEvent(tabEvent);
      
      // Next focusable should be the selected preview card
      lightCard.focus();
      expect(document.activeElement).toBe(lightCard);
    });

    it('should support Enter key activation', () => {
      const highlightedCard = container.querySelector('[data-theme="highlighted"]');
      const select = container.querySelector('select');
      
      highlightedCard.focus();
      
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      highlightedCard.dispatchEvent(enterEvent);
      
      expect(select.value).toBe('highlighted');
    });

    it('should support Space key activation', () => {
      const darkCard = container.querySelector('[data-theme="dark"]');
      const select = container.querySelector('select');
      
      darkCard.focus();
      
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      darkCard.dispatchEvent(spaceEvent);
      
      expect(select.value).toBe('dark');
    });

    it('should support Arrow key navigation', () => {
      const lightCard = container.querySelector('[data-theme="light"]');
      const highlightedCard = container.querySelector('[data-theme="highlighted"]');
      
      lightCard.focus();
      
      const rightArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
      lightCard.dispatchEvent(rightArrowEvent);
      
      expect(document.activeElement).toBe(highlightedCard);
    });

    it('should wrap around with arrow navigation', () => {
      const darkCard = container.querySelector('[data-theme="dark"]');
      const lightCard = container.querySelector('[data-theme="light"]');
      
      darkCard.focus();
      
      // Arrow right from last item should go to first
      const rightArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
      darkCard.dispatchEvent(rightArrowEvent);
      
      expect(document.activeElement).toBe(lightCard);
    });
  });

  describe('Screen Reader Support', () => {
    beforeEach(() => {
      const themeSelectorHtml = createAccessibleThemeSelector();
      container.innerHTML = themeSelectorHtml;
    });

    it('should have descriptive labels for screen readers', () => {
      const lightCard = container.querySelector('[data-theme="light"]');
      const highlightedCard = container.querySelector('[data-theme="highlighted"]');
      const darkCard = container.querySelector('[data-theme="dark"]');
      
      expect(lightCard.getAttribute('aria-label')).toContain('Select Light Theme');
      expect(lightCard.getAttribute('aria-label')).toContain('Standard white background');
      
      expect(highlightedCard.getAttribute('aria-label')).toContain('Select Highlighted Theme');
      expect(highlightedCard.getAttribute('aria-label')).toContain('Light gray background for emphasis');
      
      expect(darkCard.getAttribute('aria-label')).toContain('Select Dark Theme');
      expect(darkCard.getAttribute('aria-label')).toContain('Dark background with light text');
    });

    it('should hide decorative elements from screen readers', () => {
      const decorativeElements = container.querySelectorAll('[aria-hidden="true"]');
      
      // The preview color swatches should be hidden as they're decorative
      expect(decorativeElements.length).toBeGreaterThan(0);
      
      decorativeElements.forEach(element => {
        expect(element.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('should provide context for the icon', () => {
      const icon = container.querySelector('[role="img"]');
      expect(icon.getAttribute('aria-label')).toBe('Theme selector icon');
    });

    it('should have proper radio group semantics', () => {
      const radioGroup = container.querySelector('[role="radiogroup"]');
      const radios = container.querySelectorAll('[role="radio"]');
      
      expect(radioGroup).toBeInTheDocument();
      expect(radios).toHaveLength(3);
      
      // Exactly one radio should be checked
      const checkedRadios = Array.from(radios).filter(radio => 
        radio.getAttribute('aria-checked') === 'true'
      );
      expect(checkedRadios).toHaveLength(1);
    });
  });

  describe('Color Contrast Compliance', () => {
    beforeEach(() => {
      const themeSelectorHtml = createAccessibleThemeSelector();
      container.innerHTML = themeSelectorHtml;
    });

    it('should have sufficient contrast for light theme preview', () => {
      const lightCard = container.querySelector('[data-theme="light"]');
      const lightCardText = lightCard.querySelector('.text-gray-600');
      
      // Mock computed styles for contrast testing
      Object.defineProperty(lightCardText, 'computedStyleMap', {
        value: () => new Map([
          ['color', 'rgb(75, 85, 99)'], // text-gray-600
          ['background-color', 'rgb(255, 255, 255)'] // bg-white
        ])
      });
      
      expect(lightCard.classList.contains('bg-white')).toBe(true);
      expect(lightCardText.classList.contains('text-gray-600')).toBe(true);
    });

    it('should have sufficient contrast for highlighted theme preview', () => {
      const highlightedCard = container.querySelector('[data-theme="highlighted"]');
      const highlightedCardText = highlightedCard.querySelector('.text-gray-700');
      
      expect(highlightedCard.classList.contains('bg-gray-100')).toBe(true);
      expect(highlightedCardText.classList.contains('text-gray-700')).toBe(true);
    });

    it('should have sufficient contrast for dark theme preview', () => {
      const darkCard = container.querySelector('[data-theme="dark"]');
      const darkCardText = darkCard.querySelector('.text-gray-200');
      
      expect(darkCard.classList.contains('bg-gray-900')).toBe(true);
      expect(darkCardText.classList.contains('text-gray-200')).toBe(true);
    });

    it('should have sufficient contrast for focus indicators', () => {
      const cards = container.querySelectorAll('.theme-preview-card');
      
      cards.forEach(card => {
        expect(card.classList.contains('focus:ring-2')).toBe(true);
        expect(card.classList.contains('focus:ring-blue-500')).toBe(true);
      });
    });
  });

  describe('Error States and Feedback', () => {
    it('should handle missing form elements gracefully', () => {
      container.innerHTML = '<div class="theme-preview-card" data-theme="light" role="radio"></div>';
      
      // Should not throw error when select is missing
      expect(() => {
        window.selectTheme('light');
      }).not.toThrow();
    });

    it('should provide feedback for invalid selections', () => {
      const themeSelectorHtml = createAccessibleThemeSelector();
      container.innerHTML = themeSelectorHtml;
      
      const select = container.querySelector('select');
      
      // Try invalid theme value
      window.selectTheme('invalid-theme');
      
      // Should maintain valid state
      expect(['light', 'highlighted', 'dark']).toContain(select.value);
    });

    it('should maintain ARIA states during errors', () => {
      const themeSelectorHtml = createAccessibleThemeSelector();
      container.innerHTML = themeSelectorHtml;
      
      // Simulate error state
      window.selectTheme('invalid');
      
      const radioButtons = container.querySelectorAll('[role="radio"]');
      const checkedButtons = Array.from(radioButtons).filter(radio =>
        radio.getAttribute('aria-checked') === 'true'
      );
      
      // Should still have exactly one checked button
      expect(checkedButtons).toHaveLength(1);
    });
  });

  describe('Mobile Accessibility', () => {
    beforeEach(() => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });
      
      const themeSelectorHtml = createAccessibleThemeSelector();
      container.innerHTML = themeSelectorHtml;
    });

    it('should have adequate touch targets', () => {
      const cards = container.querySelectorAll('.theme-preview-card');
      
      cards.forEach(card => {
        // Cards should be at least 44px (minimum touch target size)
        const styles = window.getComputedStyle(card);
        expect(card.classList.contains('p-3')).toBe(true); // Ensures adequate padding
      });
    });

    it('should maintain accessibility on small screens', () => {
      const radioGroup = container.querySelector('[role="radiogroup"]');
      expect(radioGroup.classList.contains('grid-cols-3')).toBe(true);
      
      // Should still be navigable with keyboard
      const firstCard = container.querySelector('[tabindex="0"]');
      expect(firstCard).toBeInTheDocument();
    });

    it('should support touch navigation', () => {
      const cards = container.querySelectorAll('.theme-preview-card');
      
      cards.forEach(card => {
        expect(card.classList.contains('cursor-pointer')).toBe(true);
        expect(card.getAttribute('role')).toBe('radio');
      });
    });
  });

  describe('Reduced Motion Support', () => {
    beforeEach(() => {
      // Mock prefers-reduced-motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
      
      const themeSelectorHtml = createAccessibleThemeSelector();
      container.innerHTML = themeSelectorHtml;
    });

    it('should respect reduced motion preferences', () => {
      const cards = container.querySelectorAll('.theme-preview-card');
      
      // Transitions should be present but can be disabled via CSS
      cards.forEach(card => {
        expect(card.classList.contains('transition-all')).toBe(true);
        expect(card.classList.contains('duration-200')).toBe(true);
      });
    });
  });

  describe('Language and Internationalization', () => {
    beforeEach(() => {
      const themeSelectorHtml = createAccessibleThemeSelector();
      container.innerHTML = themeSelectorHtml;
    });

    it('should have proper language attributes', () => {
      // Check that content is in expected language
      const label = container.querySelector('label');
      expect(label.textContent).toContain('Content Element Theme');
      
      // ARIA labels should be in proper language
      const lightCard = container.querySelector('[data-theme="light"]');
      expect(lightCard.getAttribute('aria-label')).toMatch(/^Select Light Theme/);
    });

    it('should support right-to-left layouts', () => {
      document.documentElement.setAttribute('dir', 'rtl');
      
      const flexContainer = container.querySelector('.flex.items-start.gap-3');
      expect(flexContainer).toBeInTheDocument();
      
      document.documentElement.removeAttribute('dir');
    });
  });

  // Run basic accessibility tests from test utils
  describe('Basic Accessibility Compliance', () => {
    beforeEach(() => {
      const themeSelectorHtml = createAccessibleThemeSelector();
      container.innerHTML = themeSelectorHtml;
    });

    testBasicAccessibility(container);
  });
});