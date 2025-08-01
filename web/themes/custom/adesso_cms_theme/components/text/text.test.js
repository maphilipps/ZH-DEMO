/**
 * @file Text component tests
 * Tests for text component functionality, layouts, and content handling
 */

import { describe, it, expect, beforeEach } from 'vitest';

// Mock Twig template rendering - simulates the text.twig template logic
function renderText(props = {}) {
  const {
    eyebrow = '',
    pre_headline = '',
    title = '',
    heading = {},
    body = '',
    link = {},
    link2 = {},
    text_layout = 'left',
    className = ''
  } = props;

  // Container classes based on layout and custom classes
  const containerClasses = ['text-block', className, `text-layout--${text_layout}`]
    .filter(Boolean).join(' ');

  // Legacy eyebrow support (fallback to pre_headline)
  const effectivePreHeadline = pre_headline || eyebrow;
  
  // Pre-headline HTML
  const preHeadlineHtml = effectivePreHeadline ? 
    `<div class="text-pre-headline text-sm font-semibold text-gray-600 mb-2">${effectivePreHeadline}</div>` : '';
  
  // Title/Heading HTML - heading object takes precedence over title string
  let headingHtml = '';
  if (heading && heading.title) {
    const headingIcon = heading.icon ? `<span class="mr-2">${heading.icon}</span>` : '';
    if (heading.url) {
      headingHtml = `
        <h2 class="text-heading mb-4">
          <a href="${heading.url}" class="text-gray-900 hover:text-blue-600 transition-colors">
            ${headingIcon}${heading.title}
          </a>
        </h2>
      `;
    } else {
      headingHtml = `
        <h2 class="text-heading mb-4">
          ${headingIcon}${heading.title}
        </h2>
      `;
    }
  } else if (title) {
    headingHtml = `<h2 class="text-heading text-2xl font-bold mb-4">${title}</h2>`;
  }
  
  // Body content HTML
  const bodyHtml = body ? 
    `<div class="text-body text-gray-700 mb-6">${body}</div>` : '';
  
  // Action links HTML
  const generateLinkHtml = (linkData, isPrimary = true) => {
    if (!linkData.url || !linkData.title) return '';
    
    const buttonClass = isPrimary ? 
      'bg-blue-600 text-white hover:bg-blue-700' : 
      'bg-gray-200 text-gray-800 hover:bg-gray-300';
    
    const iconHtml = linkData.icon ? `<span class="mr-2">${linkData.icon}</span>` : '';
    
    return `
      <a href="${linkData.url}" class="inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${buttonClass}">
        ${iconHtml}${linkData.title}
      </a>
    `;
  };
  
  const actionsHtml = (link.url || link2.url) ? `
    <div class="text-actions flex flex-col sm:flex-row gap-4">
      ${generateLinkHtml(link, true)}
      ${generateLinkHtml(link2, false)}
    </div>
  ` : '';

  // Layout-specific rendering
  let layoutClass = 'text-center';
  let actionsClass = '';
  
  switch (text_layout) {
    case 'left':
      layoutClass = 'text-left';
      actionsClass = '';
      break;
    case 'centered':
      layoutClass = 'text-center';
      actionsClass = 'justify-center';
      break;
    case 'buttons-right':
      layoutClass = 'text-left';
      actionsClass = 'justify-end';
      break;
    default:
      layoutClass = 'text-left';
  }

  return `
    <section class="${containerClasses} ${layoutClass}" data-text-layout="${text_layout}">
      <div class="text-content">
        ${preHeadlineHtml}
        ${headingHtml}
        ${bodyHtml}
        ${actionsHtml ? `<div class="text-actions-wrapper ${actionsClass}">${actionsHtml}</div>` : ''}
      </div>
    </section>
  `;
}

describe('Text Component', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  describe('Basic Rendering', () => {
    it('should render with title', () => {
      const textHtml = renderText({
        title: 'Transform Your Business Today'
      });
      container.innerHTML = textHtml;
      
      const textBlock = container.querySelector('.text-block');
      const heading = container.querySelector('.text-heading');
      
      expect(textBlock).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBe('Transform Your Business Today');
    });

    it('should render with body content', () => {
      const bodyContent = '<p>Discover how our platform can revolutionize your workflow.</p>';
      const textHtml = renderText({
        title: 'Test Title',
        body: bodyContent
      });
      container.innerHTML = textHtml;
      
      const bodyElement = container.querySelector('.text-body');
      expect(bodyElement).toBeInTheDocument();
      expect(bodyElement.innerHTML).toBe(bodyContent);
    });

    it('should render with pre-headline', () => {
      const textHtml = renderText({
        pre_headline: 'New Release',
        title: 'Advanced Analytics'
      });
      container.innerHTML = textHtml;
      
      const preHeadline = container.querySelector('.text-pre-headline');
      expect(preHeadline).toBeInTheDocument();
      expect(preHeadline.textContent).toBe('New Release');
    });

    it('should render without content when nothing is provided', () => {
      const textHtml = renderText({});
      container.innerHTML = textHtml;
      
      const textBlock = container.querySelector('.text-block');
      expect(textBlock).toBeInTheDocument();
      expect(container.querySelector('.text-heading')).not.toBeInTheDocument();
      expect(container.querySelector('.text-body')).not.toBeInTheDocument();
      expect(container.querySelector('.text-pre-headline')).not.toBeInTheDocument();
    });
  });

  describe('Heading Variants', () => {
    it('should render heading object with title', () => {
      const textHtml = renderText({
        heading: {
          title: 'Customer Success Stories',
          url: '',
          icon: ''
        }
      });
      container.innerHTML = textHtml;
      
      const heading = container.querySelector('.text-heading');
      expect(heading).toBeInTheDocument();
      expect(heading.textContent.trim()).toBe('Customer Success Stories');
    });

    it('should render heading object as link when URL provided', () => {
      const textHtml = renderText({
        heading: {
          title: 'View Case Studies',
          url: '/case-studies',
          icon: ''
        }
      });
      container.innerHTML = textHtml;
      
      const headingLink = container.querySelector('.text-heading a');
      expect(headingLink).toBeInTheDocument();
      expect(headingLink.getAttribute('href')).toBe('/case-studies');
      expect(headingLink.textContent.trim()).toBe('View Case Studies');
    });

    it('should render heading object with icon', () => {
      const textHtml = renderText({
        heading: {
          title: 'Featured Content',
          url: '',
          icon: '<i class="star-icon"></i>'
        }
      });
      container.innerHTML = textHtml;
      
      const heading = container.querySelector('.text-heading');
      expect(heading).toBeInTheDocument();
      expect(heading.innerHTML).toContain('<i class="star-icon"></i>');
      expect(heading.textContent).toContain('Featured Content');
    });

    it('should prefer heading object over title string', () => {
      const textHtml = renderText({
        title: 'String Title',
        heading: {
          title: 'Object Title',
          url: '',
          icon: ''
        }
      });
      container.innerHTML = textHtml;
      
      const heading = container.querySelector('.text-heading');
      expect(heading.textContent.trim()).toBe('Object Title');
    });
  });

  describe('Legacy Support', () => {
    it('should support legacy eyebrow prop', () => {
      const textHtml = renderText({
        eyebrow: 'Coming Soon',
        title: 'New Features'
      });
      container.innerHTML = textHtml;
      
      const preHeadline = container.querySelector('.text-pre-headline');
      expect(preHeadline).toBeInTheDocument();
      expect(preHeadline.textContent).toBe('Coming Soon');
    });

    it('should prefer pre_headline over eyebrow', () => {
      const textHtml = renderText({
        eyebrow: 'Eyebrow Text',
        pre_headline: 'Pre-headline Text',
        title: 'Title'
      });
      container.innerHTML = textHtml;
      
      const preHeadline = container.querySelector('.text-pre-headline');
      expect(preHeadline.textContent).toBe('Pre-headline Text');
    });
  });

  describe('Layout Options', () => {
    it('should render left layout correctly', () => {
      const textHtml = renderText({
        title: 'Left Aligned',
        text_layout: 'left'
      });
      container.innerHTML = textHtml;
      
      const textBlock = container.querySelector('[data-text-layout="left"]');
      expect(textBlock).toBeInTheDocument();
      expect(textBlock.className).toContain('text-left');
      expect(textBlock.className).toContain('text-layout--left');
    });

    it('should render centered layout correctly', () => {
      const textHtml = renderText({
        title: 'Centered',
        text_layout: 'centered'
      });
      container.innerHTML = textHtml;
      
      const textBlock = container.querySelector('[data-text-layout="centered"]');
      expect(textBlock).toBeInTheDocument();
      expect(textBlock.className).toContain('text-center');
      expect(textBlock.className).toContain('text-layout--centered');
    });

    it('should render buttons-right layout correctly', () => {
      const textHtml = renderText({
        title: 'Buttons Right',
        text_layout: 'buttons-right',
        link: { url: '/test', title: 'Test Button' }
      });
      container.innerHTML = textHtml;
      
      const textBlock = container.querySelector('[data-text-layout="buttons-right"]');
      const actionsWrapper = container.querySelector('.text-actions-wrapper');
      
      expect(textBlock).toBeInTheDocument();
      expect(textBlock.className).toContain('text-left');
      expect(actionsWrapper.className).toContain('justify-end');
    });

    it('should default to left layout for invalid layout', () => {
      const textHtml = renderText({
        title: 'Invalid Layout',
        text_layout: 'invalid-layout'
      });
      container.innerHTML = textHtml;
      
      const textBlock = container.querySelector('[data-text-layout="invalid-layout"]');
      expect(textBlock).toBeInTheDocument();
      expect(textBlock.className).toContain('text-left');
    });
  });

  describe('Action Links', () => {
    it('should render primary action link', () => {
      const textHtml = renderText({
        title: 'Test Title',
        link: {
          url: '/get-started',
          title: 'Get Started',
          icon: ''
        }
      });
      container.innerHTML = textHtml;
      
      const actions = container.querySelector('.text-actions');
      const primaryLink = container.querySelector('a[href="/get-started"]');
      
      expect(actions).toBeInTheDocument();
      expect(primaryLink).toBeInTheDocument();
      expect(primaryLink.textContent.trim()).toBe('Get Started');
      expect(primaryLink.className).toContain('bg-blue-600');
    });

    it('should render secondary action link', () => {
      const textHtml = renderText({
        title: 'Test Title',
        link2: {
          url: '/learn-more',
          title: 'Learn More',
          icon: ''
        }
      });
      container.innerHTML = textHtml;
      
      const secondaryLink = container.querySelector('a[href="/learn-more"]');
      
      expect(secondaryLink).toBeInTheDocument();
      expect(secondaryLink.textContent.trim()).toBe('Learn More');
      expect(secondaryLink.className).toContain('bg-gray-200');
    });

    it('should render both action links', () => {
      const textHtml = renderText({
        title: 'Test Title',
        link: {
          url: '/primary',
          title: 'Primary Action',
          icon: ''
        },
        link2: {
          url: '/secondary',
          title: 'Secondary Action',
          icon: ''
        }
      });
      container.innerHTML = textHtml;
      
      const primaryLink = container.querySelector('a[href="/primary"]');
      const secondaryLink = container.querySelector('a[href="/secondary"]');
      
      expect(primaryLink).toBeInTheDocument();
      expect(secondaryLink).toBeInTheDocument();
    });

    it('should render action links with icons', () => {
      const textHtml = renderText({
        title: 'Test Title',
        link: {
          url: '/download',
          title: 'Download',
          icon: '<i class="download-icon"></i>'
        }
      });
      container.innerHTML = textHtml;
      
      const link = container.querySelector('a[href="/download"]');
      expect(link).toBeInTheDocument();
      expect(link.innerHTML).toContain('<i class="download-icon"></i>');
      expect(link.textContent).toContain('Download');
    });

    it('should not render actions when no valid links provided', () => {
      const textHtml = renderText({
        title: 'Test Title',
        link: {},
        link2: {}
      });
      container.innerHTML = textHtml;
      
      const actions = container.querySelector('.text-actions');
      expect(actions).not.toBeInTheDocument();
    });

    it('should not render incomplete links', () => {
      const textHtml = renderText({
        title: 'Test Title',
        link: {
          url: '/test',
          title: '', // Empty title
          icon: ''
        },
        link2: {
          url: '', // Empty URL
          title: 'Test',
          icon: ''
        }
      });
      container.innerHTML = textHtml;
      
      const actions = container.querySelector('.text-actions');
      const links = container.querySelectorAll('.text-actions a');
      // Actions container exists but should have no valid links
      expect(actions).toBeInTheDocument();
      expect(links).toHaveLength(0);
    });
  });

  describe('CSS Classes', () => {
    it('should apply custom className', () => {
      const textHtml = renderText({
        title: 'Test Title',
        className: 'custom-class another-class'
      });
      container.innerHTML = textHtml;
      
      const textBlock = container.querySelector('.text-block');
      expect(textBlock.className).toContain('custom-class');
      expect(textBlock.className).toContain('another-class');
    });

    it('should have base text-block class', () => {
      const textHtml = renderText({
        title: 'Test Title'
      });
      container.innerHTML = textHtml;
      
      const textBlock = container.querySelector('.text-block');
      expect(textBlock.className).toContain('text-block');
    });

    it('should apply layout-specific classes', () => {
      const textHtml = renderText({
        title: 'Test Title',
        text_layout: 'centered'
      });
      container.innerHTML = textHtml;
      
      const textBlock = container.querySelector('.text-block');
      expect(textBlock.className).toContain('text-layout--centered');
    });

    it('should apply centered actions class for centered layout', () => {
      const textHtml = renderText({
        title: 'Test Title',
        text_layout: 'centered',
        link: { url: '/test', title: 'Test' }
      });
      container.innerHTML = textHtml;
      
      const actionsWrapper = container.querySelector('.text-actions-wrapper');
      expect(actionsWrapper.className).toContain('justify-center');
    });
  });

  describe('Accessibility', () => {
    it('should use proper heading hierarchy', () => {
      const textHtml = renderText({
        title: 'Accessible Title'
      });
      container.innerHTML = textHtml;
      
      const heading = container.querySelector('h2');
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBe('Accessible Title');
    });

    it('should have semantic section element', () => {
      const textHtml = renderText({
        title: 'Test Title'
      });
      container.innerHTML = textHtml;
      
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should have accessible action links', () => {
      const textHtml = renderText({
        title: 'Test Title',
        link: {
          url: '/accessible',
          title: 'Accessible Link',
          icon: ''
        }
      });
      container.innerHTML = textHtml;
      
      const link = container.querySelector('a');
      expect(link.getAttribute('href')).toBe('/accessible');
      expect(link.textContent.trim()).toBe('Accessible Link');
    });

    it('should have proper link states for heading links', () => {
      const textHtml = renderText({
        heading: {
          title: 'Linked Heading',
          url: '/link',
          icon: ''
        }
      });
      container.innerHTML = textHtml;
      
      const headingLink = container.querySelector('.text-heading a');
      expect(headingLink.className).toContain('hover:text-blue-600');
      expect(headingLink.className).toContain('transition-colors');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty props gracefully', () => {
      const textHtml = renderText({});
      container.innerHTML = textHtml;
      
      const textBlock = container.querySelector('.text-block');
      expect(textBlock).toBeInTheDocument();
      expect(textBlock.getAttribute('data-text-layout')).toBe('left');
    });

    it('should handle HTML content in body', () => {
      const htmlBody = '<p>Paragraph with <strong>bold</strong> and <a href="#">link</a></p><ul><li>List item</li></ul>';
      const textHtml = renderText({
        title: 'HTML Content',
        body: htmlBody
      });
      container.innerHTML = textHtml;
      
      const bodyElement = container.querySelector('.text-body');
      expect(bodyElement.innerHTML).toBe(htmlBody);
      expect(bodyElement.querySelector('strong')).toBeInTheDocument();
      expect(bodyElement.querySelector('a')).toBeInTheDocument();
      expect(bodyElement.querySelector('ul')).toBeInTheDocument();
    });

    it('should handle special characters in title', () => {
      const specialTitle = 'Title with "quotes" & <symbols>';
      const textHtml = renderText({
        title: specialTitle
      });
      container.innerHTML = textHtml;
      
      const heading = container.querySelector('.text-heading');
      // HTML entities are automatically decoded by textContent
      expect(heading.textContent).toContain('Title with "quotes" & ');
    });

    it('should handle complex heading object with all properties', () => {
      const textHtml = renderText({
        heading: {
          title: 'Complex Heading',
          url: '/complex',
          icon: '<svg class="w-4 h-4"><path d="M5 13l4 4L19 7"></path></svg>'
        }
      });
      container.innerHTML = textHtml;
      
      const headingLink = container.querySelector('.text-heading a');
      expect(headingLink).toBeInTheDocument();
      expect(headingLink.getAttribute('href')).toBe('/complex');
      expect(headingLink.innerHTML).toContain('<svg');
      expect(headingLink.textContent).toContain('Complex Heading');
    });

    it('should handle all props together', () => {
      const textHtml = renderText({
        eyebrow: 'Legacy',
        pre_headline: 'Modern',
        title: 'String Title',
        heading: {
          title: 'Object Title',
          url: '/heading',
          icon: '<i class="icon"></i>'
        },
        body: '<p>Rich <strong>HTML</strong> content</p>',
        link: {
          url: '/primary',
          title: 'Primary',
          icon: '<i class="primary"></i>'
        },
        link2: {
          url: '/secondary',
          title: 'Secondary',
          icon: '<i class="secondary"></i>'
        },
        text_layout: 'buttons-right',
        className: 'custom-text-block'
      });
      container.innerHTML = textHtml;
      
      const textBlock = container.querySelector('.text-block');
      expect(textBlock).toBeInTheDocument();
      expect(textBlock.className).toContain('custom-text-block');
      expect(textBlock.className).toContain('text-layout--buttons-right');
      
      // Should prefer pre_headline over eyebrow
      const preHeadline = container.querySelector('.text-pre-headline');
      expect(preHeadline.textContent).toBe('Modern');
      
      // Should prefer heading object over title string
      const heading = container.querySelector('.text-heading a');
      expect(heading.textContent).toContain('Object Title');
      
      // Should have both action links
      expect(container.querySelector('a[href="/primary"]')).toBeInTheDocument();
      expect(container.querySelector('a[href="/secondary"]')).toBeInTheDocument();
    });
  });
});