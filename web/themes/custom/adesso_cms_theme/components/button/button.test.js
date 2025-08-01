/**
 * @file Button component tests
 * Tests for button component functionality, accessibility, and variants
 */

import { describe, it, expect, beforeEach } from 'vitest';

// Mock Twig template rendering - in a real setup, this would use a Twig renderer
function renderButton(props = {}) {
  const {
    text = 'Button',
    variant = 'default',
    size = 'default',
    url = '',
    icon = '',
    icon_position = 'left'
  } = props;

  const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline'
  };

  const sizeClasses = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md px-3 text-xs',
    lg: 'h-12 rounded-lg px-6 text-lg',
    icon: 'h-9 w-9'
  };

  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size] || sizeClasses.default}`;

  if (url) {
    return `<a href="${url}" class="${classes}">${text}</a>`;
  } else {
    return `<button type="button" class="${classes}">${text}</button>`;
  }
}

describe('Button Component', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  describe('Rendering', () => {
    it('should render with correct text', () => {
      const buttonHtml = renderButton({ text: 'Test Button' });
      container.innerHTML = buttonHtml;
      
      const button = container.querySelector('button, a');
      expect(button).toBeInTheDocument();
      expect(button.textContent).toContain('Test Button');
    });

    it('should render as link when URL is provided', () => {
      const buttonHtml = renderButton({ text: 'Link Button', url: 'https://example.com' });
      container.innerHTML = buttonHtml;
      
      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link.getAttribute('href')).toBe('https://example.com');
    });

    it('should render as button when no URL is provided', () => {
      const buttonHtml = renderButton({ text: 'Button', url: '' });
      container.innerHTML = buttonHtml;
      
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button.tagName.toLowerCase()).toBe('button');
    });
  });

  describe('Variants', () => {
    it('should apply correct variant classes', () => {
      // Test primary variant
      const primaryHtml = renderButton({ variant: 'default' });
      expect(primaryHtml).toContain('bg-primary');
      expect(primaryHtml).toContain('text-primary-foreground');

      // Test destructive variant
      const destructiveHtml = renderButton({ variant: 'destructive' });
      expect(destructiveHtml).toContain('bg-destructive');
      expect(destructiveHtml).toContain('text-destructive-foreground');

      // Test outline variant
      const outlineHtml = renderButton({ variant: 'outline' });
      expect(outlineHtml).toContain('border');
      expect(outlineHtml).toContain('bg-background');
    });
  });

  describe('Sizes', () => {
    it('should apply correct size classes', () => {
      // Test small size
      const smallHtml = renderButton({ size: 'sm' });
      expect(smallHtml).toContain('h-8');
      expect(smallHtml).toContain('px-3');
      expect(smallHtml).toContain('text-xs');

      // Test large size
      const largeHtml = renderButton({ size: 'lg' });
      expect(largeHtml).toContain('h-12');
      expect(largeHtml).toContain('px-6');
      expect(largeHtml).toContain('text-lg');

      // Test icon size
      const iconHtml = renderButton({ size: 'icon' });
      expect(iconHtml).toContain('h-9');
      expect(iconHtml).toContain('w-9');
    });
  });

  describe('CSS Classes', () => {
    it('should have base button classes', () => {
      const buttonHtml = renderButton();
      
      expect(buttonHtml).toContain('inline-flex');
      expect(buttonHtml).toContain('rounded-lg');
      expect(buttonHtml).toContain('items-center');
      expect(buttonHtml).toContain('justify-center');
      expect(buttonHtml).toContain('whitespace-nowrap');
      expect(buttonHtml).toContain('font-medium');
      expect(buttonHtml).toContain('transition-colors');
    });
  });

  describe('Accessibility', () => {
    it('should have proper button semantics', () => {
      const buttonHtml = renderButton({ text: 'Test' });
      container.innerHTML = buttonHtml;
      
      const button = container.querySelector('button, a');
      
      if (button.tagName.toLowerCase() === 'button') {
        expect(button.type).toBe('button');
      }
      
      // Should have text content
      expect(button.textContent.trim().length).toBeGreaterThan(0);
    });

    it('should be focusable', () => {
      const buttonHtml = renderButton();
      container.innerHTML = buttonHtml;
      
      const button = container.querySelector('button, a');
      
      // Should be focusable
      expect(button.tabIndex).not.toBe(-1);
      
      // Should accept focus
      button.focus();
      expect(document.activeElement).toBe(button);
    });
  });
});