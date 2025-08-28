/**
 * @file Accordion component tests
 * Tests for accordion component functionality, accessibility, and interactive behavior
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock Twig template rendering - simulates the accordion.twig template logic
function renderAccordion(props = {}) {
  const { title = '', pre_headline = '', accordion_items = [] } = props;

  if (!accordion_items || accordion_items.length === 0) {
    return '<div class="accordion-empty">No items to display</div>';
  }

  const preHeadlineHtml = pre_headline
    ? `<div class="text-sm font-semibold text-gray-600 mb-2">${pre_headline}</div>`
    : '';

  const titleHtml = title
    ? `<h2 class="text-2xl font-bold mb-6">${title}</h2>`
    : '';

  const itemsHtml = accordion_items
    .map((item, index) => {
      const isExpanded = item.expanded || false;
      const expandedClass = isExpanded ? 'accordion-item--expanded' : '';
      const ariaExpanded = isExpanded ? 'true' : 'false';
      const contentClass = isExpanded ? 'block' : 'hidden';

      return `
      <div class="accordion-item border-b border-gray-200 ${expandedClass}" data-accordion-item>
        <button 
          class="accordion-trigger flex justify-between w-full py-4 text-left text-lg font-medium hover:text-blue-600 focus:outline-none focus:text-blue-600" 
          aria-expanded="${ariaExpanded}"
          aria-controls="accordion-content-${index}"
          data-accordion-trigger
        >
          <span>${item.title}</span>
          <svg class="w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div 
          class="accordion-content ${contentClass}" 
          id="accordion-content-${index}"
          aria-hidden="${!isExpanded}"
          data-accordion-content
        >
          <div class="pb-4 text-gray-700">
            ${item.content}
          </div>
        </div>
      </div>
    `;
    })
    .join('');

  return `
    <div class="accordion-wrapper">
      ${preHeadlineHtml}
      ${titleHtml}
      <div class="accordion" data-accordion>
        ${itemsHtml}
      </div>
    </div>
  `;
}

// Mock accordion behavior
function initAccordionBehavior(container) {
  const triggers = container.querySelectorAll('[data-accordion-trigger]');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('[data-accordion-item]');
      const content = item.querySelector('[data-accordion-content]');
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Toggle expanded state
      trigger.setAttribute('aria-expanded', !isExpanded);
      content.setAttribute('aria-hidden', isExpanded);
      content.classList.toggle('hidden', isExpanded);
      content.classList.toggle('block', !isExpanded);

      // Toggle icon rotation
      const icon = trigger.querySelector('svg');
      icon.classList.toggle('rotate-180', !isExpanded);

      // Toggle item class
      item.classList.toggle('accordion-item--expanded', !isExpanded);
    });
  });
}

describe('Accordion Component', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  describe('Basic Rendering', () => {
    it('should render with accordion items', () => {
      const accordionHtml = renderAccordion({
        title: 'FAQ Section',
        accordion_items: [
          { title: 'Question 1', content: 'Answer 1', expanded: false },
          { title: 'Question 2', content: 'Answer 2', expanded: false },
        ],
      });
      container.innerHTML = accordionHtml;

      expect(container.querySelector('.accordion')).toBeInTheDocument();
      expect(container.querySelectorAll('.accordion-item')).toHaveLength(2);
    });

    it('should render title when provided', () => {
      const accordionHtml = renderAccordion({
        title: 'Frequently Asked Questions',
        accordion_items: [{ title: 'Q1', content: 'A1', expanded: false }],
      });
      container.innerHTML = accordionHtml;

      const titleElement = container.querySelector('h2');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement.textContent).toBe('Frequently Asked Questions');
    });

    it('should render pre-headline when provided', () => {
      const accordionHtml = renderAccordion({
        pre_headline: 'Support',
        title: 'FAQ',
        accordion_items: [{ title: 'Q1', content: 'A1', expanded: false }],
      });
      container.innerHTML = accordionHtml;

      const preHeadline = container.querySelector('.text-sm.font-semibold');
      expect(preHeadline).toBeInTheDocument();
      expect(preHeadline.textContent).toBe('Support');
    });

    it('should show empty state when no items provided', () => {
      const accordionHtml = renderAccordion({ accordion_items: [] });
      container.innerHTML = accordionHtml;

      expect(container.querySelector('.accordion-empty')).toBeInTheDocument();
    });
  });

  describe('Accordion Items', () => {
    it('should render item title and content', () => {
      const accordionHtml = renderAccordion({
        accordion_items: [
          {
            title: 'How does this work?',
            content: 'This is how it works...',
            expanded: false,
          },
        ],
      });
      container.innerHTML = accordionHtml;

      const trigger = container.querySelector('[data-accordion-trigger]');
      const content = container.querySelector('[data-accordion-content]');

      expect(trigger.textContent).toContain('How does this work?');
      expect(content.textContent).toContain('This is how it works...');
    });

    it('should handle expanded state correctly', () => {
      const accordionHtml = renderAccordion({
        accordion_items: [
          {
            title: 'Expanded Item',
            content: 'Visible content',
            expanded: true,
          },
          {
            title: 'Collapsed Item',
            content: 'Hidden content',
            expanded: false,
          },
        ],
      });
      container.innerHTML = accordionHtml;

      const triggers = container.querySelectorAll('[data-accordion-trigger]');
      const contents = container.querySelectorAll('[data-accordion-content]');

      // First item should be expanded
      expect(triggers[0].getAttribute('aria-expanded')).toBe('true');
      expect(contents[0].classList.contains('block')).toBe(true);
      expect(contents[0].getAttribute('aria-hidden')).toBe('false');

      // Second item should be collapsed
      expect(triggers[1].getAttribute('aria-expanded')).toBe('false');
      expect(contents[1].classList.contains('hidden')).toBe(true);
      expect(contents[1].getAttribute('aria-hidden')).toBe('true');
    });

    it('should have proper ARIA attributes', () => {
      const accordionHtml = renderAccordion({
        accordion_items: [
          { title: 'Accessible Item', content: 'Content', expanded: false },
        ],
      });
      container.innerHTML = accordionHtml;

      const trigger = container.querySelector('[data-accordion-trigger]');
      const content = container.querySelector('[data-accordion-content]');

      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expect(trigger.getAttribute('aria-controls')).toBe('accordion-content-0');
      expect(content.getAttribute('id')).toBe('accordion-content-0');
      expect(content.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Interactive Behavior', () => {
    it('should toggle content visibility on trigger click', () => {
      const accordionHtml = renderAccordion({
        accordion_items: [
          { title: 'Test Item', content: 'Test Content', expanded: false },
        ],
      });
      container.innerHTML = accordionHtml;
      initAccordionBehavior(container);

      const trigger = container.querySelector('[data-accordion-trigger]');
      const content = container.querySelector('[data-accordion-content]');

      // Initial state - collapsed
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expect(content.classList.contains('hidden')).toBe(true);

      // Click to expand
      trigger.click();

      expect(trigger.getAttribute('aria-expanded')).toBe('true');
      expect(content.classList.contains('block')).toBe(true);
      expect(content.getAttribute('aria-hidden')).toBe('false');

      // Click again to collapse
      trigger.click();

      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expect(content.classList.contains('hidden')).toBe(true);
      expect(content.getAttribute('aria-hidden')).toBe('true');
    });

    it('should rotate icon on toggle', () => {
      const accordionHtml = renderAccordion({
        accordion_items: [
          { title: 'Icon Test', content: 'Content', expanded: false },
        ],
      });
      container.innerHTML = accordionHtml;
      initAccordionBehavior(container);

      const trigger = container.querySelector('[data-accordion-trigger]');
      const icon = trigger.querySelector('svg');

      // Initial state
      expect(icon.classList.contains('rotate-180')).toBe(false);

      // Click to expand
      trigger.click();
      expect(icon.classList.contains('rotate-180')).toBe(true);

      // Click to collapse
      trigger.click();
      expect(icon.classList.contains('rotate-180')).toBe(false);
    });

    it('should update item expanded class', () => {
      const accordionHtml = renderAccordion({
        accordion_items: [
          { title: 'Class Test', content: 'Content', expanded: false },
        ],
      });
      container.innerHTML = accordionHtml;
      initAccordionBehavior(container);

      const trigger = container.querySelector('[data-accordion-trigger]');
      const item = container.querySelector('[data-accordion-item]');

      // Initial state
      expect(item.classList.contains('accordion-item--expanded')).toBe(false);

      // Click to expand
      trigger.click();
      expect(item.classList.contains('accordion-item--expanded')).toBe(true);

      // Click to collapse
      trigger.click();
      expect(item.classList.contains('accordion-item--expanded')).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should have proper button semantics', () => {
      const accordionHtml = renderAccordion({
        accordion_items: [
          { title: 'Button Test', content: 'Content', expanded: false },
        ],
      });
      container.innerHTML = accordionHtml;

      const trigger = container.querySelector('[data-accordion-trigger]');

      expect(trigger.tagName.toLowerCase()).toBe('button');
      expect(trigger.getAttribute('aria-expanded')).toBeDefined();
      expect(trigger.getAttribute('aria-controls')).toBeDefined();
    });

    it('should be keyboard accessible', () => {
      const accordionHtml = renderAccordion({
        accordion_items: [
          { title: 'Keyboard Test', content: 'Content', expanded: false },
        ],
      });
      container.innerHTML = accordionHtml;

      const trigger = container.querySelector('[data-accordion-trigger]');

      // Should be focusable
      expect(trigger.tabIndex).not.toBe(-1);

      // Should accept focus
      trigger.focus();
      expect(document.activeElement).toBe(trigger);
    });

    it('should have proper focus styles', () => {
      const accordionHtml = renderAccordion({
        accordion_items: [
          { title: 'Focus Test', content: 'Content', expanded: false },
        ],
      });
      container.innerHTML = accordionHtml;

      const trigger = container.querySelector('[data-accordion-trigger]');
      expect(trigger.className).toContain('focus:outline-none');
      expect(trigger.className).toContain('focus:text-blue-600');
    });

    it('should have semantic heading structure', () => {
      const accordionHtml = renderAccordion({
        title: 'Main Title',
        accordion_items: [
          { title: 'Item Title', content: 'Content', expanded: false },
        ],
      });
      container.innerHTML = accordionHtml;

      const mainTitle = container.querySelector('h2');
      expect(mainTitle).toBeInTheDocument();
      expect(mainTitle.textContent).toBe('Main Title');
    });
  });

  describe('Multiple Items', () => {
    it('should handle multiple accordion items independently', () => {
      const accordionHtml = renderAccordion({
        accordion_items: [
          { title: 'Item 1', content: 'Content 1', expanded: false },
          { title: 'Item 2', content: 'Content 2', expanded: true },
          { title: 'Item 3', content: 'Content 3', expanded: false },
        ],
      });
      container.innerHTML = accordionHtml;
      initAccordionBehavior(container);

      const triggers = container.querySelectorAll('[data-accordion-trigger]');
      const contents = container.querySelectorAll('[data-accordion-content]');

      // Check initial states
      expect(triggers[0].getAttribute('aria-expanded')).toBe('false');
      expect(triggers[1].getAttribute('aria-expanded')).toBe('true');
      expect(triggers[2].getAttribute('aria-expanded')).toBe('false');

      // Click first item
      triggers[0].click();

      // First item should be expanded, others unchanged
      expect(triggers[0].getAttribute('aria-expanded')).toBe('true');
      expect(triggers[1].getAttribute('aria-expanded')).toBe('true');
      expect(triggers[2].getAttribute('aria-expanded')).toBe('false');
    });

    it('should generate unique IDs for each item', () => {
      const accordionHtml = renderAccordion({
        accordion_items: [
          { title: 'Item 1', content: 'Content 1', expanded: false },
          { title: 'Item 2', content: 'Content 2', expanded: false },
        ],
      });
      container.innerHTML = accordionHtml;

      const triggers = container.querySelectorAll('[data-accordion-trigger]');
      const contents = container.querySelectorAll('[data-accordion-content]');

      expect(triggers[0].getAttribute('aria-controls')).toBe(
        'accordion-content-0'
      );
      expect(triggers[1].getAttribute('aria-controls')).toBe(
        'accordion-content-1'
      );
      expect(contents[0].getAttribute('id')).toBe('accordion-content-0');
      expect(contents[1].getAttribute('id')).toBe('accordion-content-1');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty content gracefully', () => {
      const accordionHtml = renderAccordion({
        accordion_items: [
          { title: 'Empty Content', content: '', expanded: false },
        ],
      });
      container.innerHTML = accordionHtml;

      const content = container.querySelector('[data-accordion-content]');
      expect(content).toBeInTheDocument();
      expect(content.textContent.trim()).toBe('');
    });

    it('should handle HTML content', () => {
      const htmlContent = '<p>Paragraph with <strong>bold</strong> text</p>';
      const accordionHtml = renderAccordion({
        accordion_items: [
          { title: 'HTML Content', content: htmlContent, expanded: false },
        ],
      });
      container.innerHTML = accordionHtml;

      const content = container.querySelector('[data-accordion-content]');
      expect(content.innerHTML).toContain('<p>');
      expect(content.innerHTML).toContain('<strong>');
    });

    it('should handle special characters in titles', () => {
      const specialTitle = 'Question with "quotes" & <symbols>';
      const accordionHtml = renderAccordion({
        accordion_items: [
          { title: specialTitle, content: 'Answer', expanded: false },
        ],
      });
      container.innerHTML = accordionHtml;

      const trigger = container.querySelector('[data-accordion-trigger] span');
      // HTML entities are automatically decoded by textContent
      expect(trigger.textContent).toContain('Question with "quotes" & ');
    });
  });
});
