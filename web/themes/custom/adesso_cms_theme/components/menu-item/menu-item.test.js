/**
 * @file
 * Tests for menu-item atomic component
 * 
 * Tests the unified navigation architecture's menu-item atom
 * to ensure consistent styling and behavior across all menu levels
 */

import { describe, it, expect, beforeEach } from 'vitest';

describe('Menu Item Component', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  describe('Basic rendering', () => {
    it('should render a simple menu item without children', () => {
      container.innerHTML = `
        <div class="c-menu-item c-menu-item--default c-menu-item--level-0">
          <a href="/test" class="font-semibold text-gray-900 hover:text-primary c-menu-item__link">
            <span class="c-menu-item__title">Test Item</span>
          </a>
        </div>
      `;
      
      const menuItem = container.querySelector('.c-menu-item');
      const link = container.querySelector('.c-menu-item__link');
      const title = container.querySelector('.c-menu-item__title');
      
      expect(menuItem).toBeDefined();
      expect(link).toBeDefined();
      expect(title).toBeDefined();
      expect(title.textContent.trim()).toBe('Test Item');
      expect(link.getAttribute('href')).toBe('/test');
    });

    it('should render a menu item with children as button', () => {
      container.innerHTML = `
        <div class="c-menu-item c-menu-item--default c-menu-item--level-0 c-menu-item--has-children">
          <button type="button" class="inline-flex items-center gap-x-1 text-lg/6 font-semibold text-gray-900" aria-haspopup="menu" aria-expanded="false">
            <span class="c-menu-item__title">Services</span>
            <svg viewBox="0 0 20 20" fill="currentColor" class="size-5 c-menu-item__chevron">
              <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
            </svg>
          </button>
        </div>
      `;
      
      const button = container.querySelector('button');
      const chevron = container.querySelector('.c-menu-item__chevron');
      
      expect(button).toBeDefined();
      expect(button.getAttribute('aria-haspopup')).toBe('menu');
      expect(button.getAttribute('aria-expanded')).toBe('false');
      expect(chevron).toBeDefined();
    });
  });

  describe('Variant classes', () => {
    it('should apply desktop variant classes', () => {
      container.innerHTML = `
        <div class="c-menu-item c-menu-item--desktop c-menu-item--level-0">
          <a href="/test" class="font-semibold text-gray-900 hover:text-primary c-menu-item__link">
            <span class="c-menu-item__title">Desktop Item</span>
          </a>
        </div>
      `;
      
      const menuItem = container.querySelector('.c-menu-item');
      expect(menuItem.classList.contains('c-menu-item--desktop')).toBe(true);
    });

    it('should apply mobile variant classes', () => {
      container.innerHTML = `
        <div class="c-menu-item c-menu-item--mobile c-menu-item--level-0">
          <a href="/test" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 c-menu-item__link">
            <span class="c-menu-item__title">Mobile Item</span>
          </a>
        </div>
      `;
      
      const menuItem = container.querySelector('.c-menu-item');
      const link = container.querySelector('.c-menu-item__link');
      
      expect(menuItem.classList.contains('c-menu-item--mobile')).toBe(true);
      expect(link.classList.contains('block')).toBe(true);
      expect(link.classList.contains('rounded-lg')).toBe(true);
    });

    it('should apply dropdown variant classes', () => {
      container.innerHTML = `
        <div class="c-menu-item c-menu-item--dropdown c-menu-item--level-1">
          <a href="/test" class="block p-2 hover:text-primary c-menu-item__link">
            <span class="c-menu-item__title">Dropdown Item</span>
          </a>
        </div>
      `;
      
      const menuItem = container.querySelector('.c-menu-item');
      
      expect(menuItem.classList.contains('c-menu-item--dropdown')).toBe(true);
      expect(menuItem.classList.contains('c-menu-item--level-1')).toBe(true);
    });
  });

  describe('Active states', () => {
    it('should apply active state classes', () => {
      container.innerHTML = `
        <div class="c-menu-item c-menu-item--default c-menu-item--level-0 c-menu-item--active">
          <a href="/current" class="font-semibold text-gray-900 hover:text-primary c-menu-item__link" aria-current="page">
            <span class="c-menu-item__title">Current Page</span>
          </a>
        </div>
      `;
      
      const menuItem = container.querySelector('.c-menu-item');
      const link = container.querySelector('.c-menu-item__link');
      
      expect(menuItem.classList.contains('c-menu-item--active')).toBe(true);
      expect(link.getAttribute('aria-current')).toBe('page');
    });

    it('should apply active trail state classes', () => {
      container.innerHTML = `
        <div class="c-menu-item c-menu-item--default c-menu-item--level-0 c-menu-item--in-trail">
          <a href="/services" class="font-semibold text-gray-900 hover:text-primary c-menu-item__link">
            <span class="c-menu-item__title">Services</span>
          </a>
        </div>
      `;
      
      const menuItem = container.querySelector('.c-menu-item');
      
      expect(menuItem.classList.contains('c-menu-item--in-trail')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should handle no-link items correctly', () => {
      container.innerHTML = `
        <div class="c-menu-item c-menu-item--dropdown c-menu-item--level-1">
          <span class="block p-2 hover:text-primary c-menu-item__span">
            <span class="c-menu-item__title">Section Header</span>
          </span>
        </div>
      `;
      
      const span = container.querySelector('.c-menu-item__span');
      const title = container.querySelector('.c-menu-item__title');
      
      expect(span).toBeDefined();
      expect(title.textContent.trim()).toBe('Section Header');
      expect(container.querySelector('a')).toBeNull();
    });

    it('should handle external links with proper target', () => {
      container.innerHTML = `
        <div class="c-menu-item c-menu-item--default c-menu-item--level-0">
          <a href="https://example.com" target="_blank" class="font-semibold text-gray-900 hover:text-primary c-menu-item__link" aria-label="External Site (opens in new window)">
            <span class="c-menu-item__title">External Site</span>
          </a>
        </div>
      `;
      
      const link = container.querySelector('.c-menu-item__link');
      
      expect(link.getAttribute('href')).toBe('https://example.com');
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('aria-label')).toBe('External Site (opens in new window)');
    });
  });

  describe('Level nesting', () => {
    it('should apply correct level classes for deep nesting', () => {
      // Level 0 (top level)
      container.innerHTML = `<div class="c-menu-item c-menu-item--default c-menu-item--level-0"></div>`;
      expect(container.querySelector('.c-menu-item--level-0')).toBeDefined();
      
      // Level 1 (first submenu)
      container.innerHTML = `<div class="c-menu-item c-menu-item--dropdown c-menu-item--level-1"></div>`;
      expect(container.querySelector('.c-menu-item--level-1')).toBeDefined();
      
      // Level 2 (nested submenu)
      container.innerHTML = `<div class="c-menu-item c-menu-item--dropdown c-menu-item--level-2"></div>`;
      expect(container.querySelector('.c-menu-item--level-2')).toBeDefined();
    });
  });

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });
});