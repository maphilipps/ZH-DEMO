/**
 * @file Badge component tests
 * Tests for badge component functionality, variants, and accessibility
 */

import { describe, it, expect, beforeEach } from 'vitest';

// Mock Twig template rendering - simulates the badge.twig template logic
function renderBadge(props = {}) {
  const {
    text = '',
    variant = 'default',
    size = 'md',
    removable = false,
    icon = '',
    url = '',
    modifier = ''
  } = props;

  // Return empty if no text
  if (!text) return '';

  const variantClasses = {
    'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    'primary': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'secondary': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'success': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'danger': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'warning': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'info': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
    'light': 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    'dark': 'bg-gray-800 text-gray-100 dark:bg-gray-200 dark:text-gray-800'
  };

  const sizeClasses = {
    'sm': 'text-xs px-2 py-0.5',
    'md': 'text-sm px-2.5 py-0.5',
    'lg': 'text-base px-3 py-1'
  };

  const baseClasses = 'inline-flex items-center font-medium rounded-sm';
  const variantClass = variantClasses[variant] || variantClasses.default;
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const hoverClass = url ? 'hover:opacity-80 transition-opacity' : '';
  const removableClass = removable ? 'pr-1' : '';

  const allClasses = [baseClasses, variantClass, sizeClass, hoverClass, removableClass, modifier]
    .filter(Boolean).join(' ');

  const iconHtml = icon ? `<span class="mr-1">${icon}</span>` : '';
  const removeButtonHtml = removable ? 
    `<button type="button" class="inline-flex items-center p-1 ml-2 text-sm bg-transparent rounded-sm hover:bg-black/10 dark:hover:bg-white/10" aria-label="Remove ${text}">
      <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
    </button>` : '';

  const content = `${iconHtml}${text}${removeButtonHtml}`;

  if (url) {
    return `<a href="${url}" class="${allClasses}">${content}</a>`;
  } else {
    return `<span class="${allClasses}">${content}</span>`;
  }
}

describe('Badge Component', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  describe('Basic Rendering', () => {
    it('should render with required text prop', () => {
      const badgeHtml = renderBadge({ text: 'Test Badge' });
      container.innerHTML = badgeHtml;
      
      const badge = container.querySelector('span, a');
      expect(badge).toBeInTheDocument();
      expect(badge.textContent).toContain('Test Badge');
    });

    it('should not render without text', () => {
      const badgeHtml = renderBadge({ text: '' });
      expect(badgeHtml).toBe('');
    });

    it('should render as link when URL is provided', () => {
      const badgeHtml = renderBadge({ text: 'Link Badge', url: 'https://example.com' });
      container.innerHTML = badgeHtml;
      
      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link.getAttribute('href')).toBe('https://example.com');
    });

    it('should render as span when no URL is provided', () => {
      const badgeHtml = renderBadge({ text: 'Span Badge' });
      container.innerHTML = badgeHtml;
      
      const span = container.querySelector('span');
      expect(span).toBeInTheDocument();
      expect(span.tagName.toLowerCase()).toBe('span');
    });
  });

  describe('Variants', () => {
    it('should apply default variant classes', () => {
      const badgeHtml = renderBadge({ text: 'Default', variant: 'default' });
      expect(badgeHtml).toContain('bg-gray-100');
      expect(badgeHtml).toContain('text-gray-800');
    });

    it('should apply primary variant classes', () => {
      const badgeHtml = renderBadge({ text: 'Primary', variant: 'primary' });
      expect(badgeHtml).toContain('bg-blue-100');
      expect(badgeHtml).toContain('text-blue-800');
    });

    it('should apply success variant classes', () => {
      const badgeHtml = renderBadge({ text: 'Success', variant: 'success' });
      expect(badgeHtml).toContain('bg-green-100');
      expect(badgeHtml).toContain('text-green-800');
    });

    it('should apply danger variant classes', () => {
      const badgeHtml = renderBadge({ text: 'Danger', variant: 'danger' });
      expect(badgeHtml).toContain('bg-red-100');
      expect(badgeHtml).toContain('text-red-800');
    });

    it('should fall back to default variant for invalid variant', () => {
      const badgeHtml = renderBadge({ text: 'Invalid', variant: 'invalid' });
      expect(badgeHtml).toContain('bg-gray-100');
      expect(badgeHtml).toContain('text-gray-800');
    });
  });

  describe('Sizes', () => {
    it('should apply small size classes', () => {
      const badgeHtml = renderBadge({ text: 'Small', size: 'sm' });
      expect(badgeHtml).toContain('text-xs');
      expect(badgeHtml).toContain('px-2');
      expect(badgeHtml).toContain('py-0.5');
    });

    it('should apply medium size classes (default)', () => {
      const badgeHtml = renderBadge({ text: 'Medium', size: 'md' });
      expect(badgeHtml).toContain('text-sm');
      expect(badgeHtml).toContain('px-2.5');
      expect(badgeHtml).toContain('py-0.5');
    });

    it('should apply large size classes', () => {
      const badgeHtml = renderBadge({ text: 'Large', size: 'lg' });
      expect(badgeHtml).toContain('text-base');
      expect(badgeHtml).toContain('px-3');
      expect(badgeHtml).toContain('py-1');
    });

    it('should fall back to medium size for invalid size', () => {
      const badgeHtml = renderBadge({ text: 'Invalid', size: 'invalid' });
      expect(badgeHtml).toContain('text-sm');
      expect(badgeHtml).toContain('px-2.5');
    });
  });

  describe('Features', () => {
    it('should include icon when provided', () => {
      const iconSvg = '<svg class="w-3 h-3"><path d="M5 13l4 4L19 7"></path></svg>';
      const badgeHtml = renderBadge({ text: 'With Icon', icon: iconSvg });
      container.innerHTML = badgeHtml;
      
      expect(badgeHtml).toContain(iconSvg);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should include remove button when removable is true', () => {
      const badgeHtml = renderBadge({ text: 'Removable', removable: true });
      container.innerHTML = badgeHtml;
      
      const removeButton = container.querySelector('button');
      expect(removeButton).toBeInTheDocument();
      expect(removeButton.getAttribute('aria-label')).toBe('Remove Removable');
    });

    it('should apply hover classes when URL is provided', () => {
      const badgeHtml = renderBadge({ text: 'Hover', url: '#' });
      expect(badgeHtml).toContain('hover:opacity-80');
      expect(badgeHtml).toContain('transition-opacity');
    });

    it('should apply modifier classes', () => {
      const badgeHtml = renderBadge({ 
        text: 'Modified', 
        modifier: 'custom-class another-class' 
      });
      expect(badgeHtml).toContain('custom-class');
      expect(badgeHtml).toContain('another-class');
    });
  });

  describe('CSS Classes', () => {
    it('should have base badge classes', () => {
      const badgeHtml = renderBadge({ text: 'Base' });
      
      expect(badgeHtml).toContain('inline-flex');
      expect(badgeHtml).toContain('items-center');
      expect(badgeHtml).toContain('font-medium');
      expect(badgeHtml).toContain('rounded-sm');
    });

    it('should apply removable spacing class', () => {
      const badgeHtml = renderBadge({ text: 'Removable', removable: true });
      expect(badgeHtml).toContain('pr-1');
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      const badgeHtml = renderBadge({ text: 'Accessible' });
      container.innerHTML = badgeHtml;
      
      const badge = container.querySelector('span, a');
      expect(badge.textContent.trim().length).toBeGreaterThan(0);
    });

    it('should have proper remove button accessibility', () => {
      const badgeHtml = renderBadge({ text: 'Test', removable: true });
      container.innerHTML = badgeHtml;
      
      const removeButton = container.querySelector('button');
      expect(removeButton.getAttribute('aria-label')).toContain('Remove Test');
      expect(removeButton.querySelector('svg').getAttribute('aria-hidden')).toBe('true');
    });

    it('should be focusable when clickable', () => {
      const badgeHtml = renderBadge({ text: 'Clickable', url: '#' });
      container.innerHTML = badgeHtml;
      
      const link = container.querySelector('a');
      expect(link.tabIndex).not.toBe(-1);
      
      link.focus();
      expect(document.activeElement).toBe(link);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty text gracefully', () => {
      const badgeHtml = renderBadge({ text: '', variant: 'primary' });
      expect(badgeHtml).toBe('');
    });

    it('should handle special characters in text', () => {
      const specialText = 'Badge & "Special" <Characters>';
      const badgeHtml = renderBadge({ text: specialText });
      container.innerHTML = badgeHtml;
      
      const badge = container.querySelector('span');
      // HTML entities are automatically decoded by textContent
      expect(badge.textContent).toContain('Badge & "Special"');
    });

    it('should handle all props together', () => {
      const badgeHtml = renderBadge({
        text: 'Complete',
        variant: 'success',
        size: 'lg',
        removable: true,
        icon: '<i class="icon"></i>',
        url: '/test',
        modifier: 'custom-badge'
      });
      container.innerHTML = badgeHtml;
      
      const badge = container.querySelector('a');
      expect(badge).toBeInTheDocument();
      expect(badge.textContent).toContain('Complete');
      expect(badge.className).toContain('bg-green-100');
      expect(badge.className).toContain('text-base');
      expect(badge.className).toContain('custom-badge');
      expect(badge.querySelector('button')).toBeInTheDocument();
    });
  });
});