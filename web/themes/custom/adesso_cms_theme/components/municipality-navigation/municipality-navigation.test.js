/**
 * @file
 * Municipality Navigation Component Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';

// Mock Alpine.js
global.Alpine = {
  initTree: vi.fn(),
  data: vi.fn(),
};

// Mock Drupal
global.Drupal = {
  behaviors: {},
};

// Mock once
global.once = vi.fn((id, selector, context) => {
  return context.querySelectorAll(selector);
});

// Import the behavior
import './municipality-navigation.behavior.js';

describe('Municipality Navigation Component', () => {
  let container;
  
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    document.body.removeChild(container);
    vi.clearAllMocks();
  });
  
  describe('Component Initialization', () => {
    it('should initialize Alpine component', () => {
      const nav = document.createElement('nav');
      nav.classList.add('municipality-navigation');
      nav.dataset.municipality = 'thalwil';
      container.appendChild(nav);
      
      // Attach Drupal behavior
      Drupal.behaviors.municipalityNavigation.attach(container, {});
      
      expect(document.body.classList.contains('municipality-thalwil')).toBe(true);
    });
    
    it('should detect municipality from body class', () => {
      document.body.classList.add('municipality-erlenbach');
      
      const component = window.municipalityNavigation();
      component.init.call({ 
        $el: container,
        $watch: vi.fn()
      });
      
      expect(component.detectMunicipality()).toBe('erlenbach');
      
      document.body.classList.remove('municipality-erlenbach');
    });
    
    it('should detect municipality from URL path', () => {
      // Mock window.location
      delete window.location;
      window.location = { pathname: '/thalheim/services' };
      
      const component = window.municipalityNavigation();
      expect(component.detectMunicipality()).toBe('thalheim');
    });
    
    it('should default to thalwil if no municipality detected', () => {
      const component = window.municipalityNavigation();
      expect(component.detectMunicipality()).toBe('thalwil');
    });
  });
  
  describe('Mobile Menu Functionality', () => {
    it('should toggle mobile menu state', () => {
      const component = window.municipalityNavigation();
      component.mobileMenuOpen = false;
      
      const button = document.createElement('button');
      button.setAttribute('aria-label', 'Hauptmenü öffnen');
      container.appendChild(button);
      
      component.$el = container;
      component.toggleMobileMenu();
      
      expect(component.mobileMenuOpen).toBe(true);
      expect(button.getAttribute('aria-expanded')).toBe('true');
    });
    
    it('should close mobile menu on escape key', () => {
      const component = window.municipalityNavigation();
      component.mobileMenuOpen = true;
      component.searchOpen = true;
      
      component.init.call({
        $el: container,
        $watch: vi.fn()
      });
      
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      
      expect(component.mobileMenuOpen).toBe(false);
      expect(component.searchOpen).toBe(false);
    });
    
    it('should close mobile menu on window resize to desktop', () => {
      const component = window.municipalityNavigation();
      component.mobileMenuOpen = true;
      
      component.init.call({
        $el: container,
        $watch: vi.fn()
      });
      
      // Mock window width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024
      });
      
      window.dispatchEvent(new Event('resize'));
      
      expect(component.mobileMenuOpen).toBe(false);
    });
  });
  
  describe('Search Functionality', () => {
    it('should dispatch search event with municipality context', (done) => {
      const component = window.municipalityNavigation();
      component.currentMunicipality = 'thalwil';
      
      document.addEventListener('municipality-search-open', (event) => {
        expect(event.detail.municipality).toBe('thalwil');
        done();
      });
      
      component.openSearch();
    });
  });
  
  describe('Dropdown Keyboard Navigation', () => {
    it('should handle Enter key on dropdown', () => {
      const component = window.municipalityNavigation();
      
      const event = {
        key: 'Enter',
        preventDefault: vi.fn(),
        currentTarget: {
          parentElement: document.createElement('div')
        }
      };
      
      const result = component.handleDropdownKeyboard(event, false);
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(result).toBe(true);
    });
    
    it('should handle Escape key on dropdown', () => {
      const component = window.municipalityNavigation();
      
      const event = {
        key: 'Escape',
        preventDefault: vi.fn(),
        currentTarget: {
          parentElement: document.createElement('div')
        }
      };
      
      const result = component.handleDropdownKeyboard(event, true);
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(result).toBe(false);
    });
    
    it('should handle ArrowDown key on open dropdown', () => {
      const component = window.municipalityNavigation();
      
      const dropdown = document.createElement('div');
      const link = document.createElement('a');
      link.classList.add('absolute');
      dropdown.appendChild(link);
      
      const event = {
        key: 'ArrowDown',
        preventDefault: vi.fn(),
        currentTarget: {
          parentElement: dropdown
        }
      };
      
      link.focus = vi.fn();
      
      const result = component.handleDropdownKeyboard(event, true);
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });
  
  describe('Focus Management', () => {
    it('should trap focus when mobile menu opens', () => {
      const component = window.municipalityNavigation();
      component.$el = container;
      
      // Add focusable elements
      const link1 = document.createElement('a');
      link1.href = '#';
      const link2 = document.createElement('a');
      link2.href = '#';
      container.appendChild(link1);
      container.appendChild(link2);
      
      component.trapFocus();
      
      // Simulate tab key at last element
      const tabEvent = new KeyboardEvent('keydown', { 
        key: 'Tab',
        shiftKey: false
      });
      
      Object.defineProperty(document, 'activeElement', {
        writable: true,
        value: link2
      });
      
      link1.focus = vi.fn();
      component.handleTabKey(tabEvent);
      
      expect(link1.focus).toHaveBeenCalled();
    });
    
    it('should release focus trap when mobile menu closes', () => {
      const component = window.municipalityNavigation();
      
      const mockHandler = vi.fn();
      component.handleTabKey = mockHandler;
      
      component.releaseFocus();
      
      expect(document.removeEventListener).toHaveBeenCalled();
    });
  });
  
  describe('Asset Preloading', () => {
    it('should preload municipality logo', () => {
      const nav = document.createElement('nav');
      nav.classList.add('municipality-navigation');
      nav.dataset.municipality = 'erlenbach';
      container.appendChild(nav);
      
      Drupal.behaviors.municipalityNavigation.attach(container, {});
      
      const preloadLink = document.head.querySelector('link[rel="preload"][as="image"]');
      expect(preloadLink).toBeTruthy();
      expect(preloadLink.href).toContain('erlenbach-logo.svg');
    });
  });
  
  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const component = window.municipalityNavigation();
      component.mobileMenuOpen = false;
      
      const button = document.createElement('button');
      button.setAttribute('aria-label', 'Hauptmenü öffnen');
      button.setAttribute('aria-expanded', 'false');
      container.appendChild(button);
      
      component.$el = container;
      component.toggleMobileMenu();
      
      expect(button.getAttribute('aria-expanded')).toBe('true');
    });
    
    it('should support keyboard navigation', () => {
      const component = window.municipalityNavigation();
      
      const dropdown = document.createElement('div');
      const link = document.createElement('a');
      dropdown.appendChild(link);
      
      const spaceEvent = {
        key: ' ',
        preventDefault: vi.fn(),
        currentTarget: {
          parentElement: dropdown
        }
      };
      
      const result = component.handleDropdownKeyboard(spaceEvent, false);
      
      expect(spaceEvent.preventDefault).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });
});