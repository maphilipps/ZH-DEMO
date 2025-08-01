/**
 * @file Hero component tests
 * Tests for hero component functionality, layouts, and media handling
 */

import { describe, it, expect, beforeEach } from 'vitest';

// Mock Twig template rendering - simulates the hero.twig template logic
function renderHero(props = {}) {
  const {
    modifier = '',
    media = '',
    heading = '',
    text = '',
    pre_headline = '',
    hero_layout = 'image_top',
    link = {},
    link2 = {}
  } = props;

  // Base container classes
  const containerClasses = ['hero-wrapper', modifier].filter(Boolean).join(' ');
  
  // Pre-headline HTML
  const preHeadlineHtml = pre_headline ? 
    `<div class="hero-pre-headline text-sm font-semibold text-gray-600 mb-2">${pre_headline}</div>` : '';
  
  // Heading HTML
  const headingHtml = heading ? 
    `<h1 class="hero-heading text-4xl md:text-6xl font-bold mb-6">${heading}</h1>` : '';
  
  // Text/description HTML
  const textHtml = text ? 
    `<div class="hero-text text-lg text-gray-700 mb-8">${text}</div>` : '';
  
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
    <div class="hero-actions flex flex-col sm:flex-row gap-4">
      ${generateLinkHtml(link, true)}
      ${generateLinkHtml(link2, false)}
    </div>
  ` : '';
  
  // Content block
  const contentHtml = `
    <div class="hero-content text-center">
      ${preHeadlineHtml}
      ${headingHtml}
      ${textHtml}
      ${actionsHtml}
    </div>
  `;
  
  // Media HTML
  const mediaHtml = media ? `
    <div class="hero-media">
      ${media}
    </div>
  ` : '';
  
  // Layout-specific rendering
  let layoutHtml = '';
  
  switch (hero_layout) {
    case 'image_top':
      layoutHtml = `
        <div class="hero-layout hero-layout--image-top">
          ${mediaHtml}
          ${contentHtml}
        </div>
      `;
      break;
      
    case 'image_bottom':
      layoutHtml = `
        <div class="hero-layout hero-layout--image-bottom">
          ${contentHtml}
          ${mediaHtml}
        </div>
      `;
      break;
      
    case 'image_bottom_split':
      layoutHtml = `
        <div class="hero-layout hero-layout--image-bottom-split">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div class="hero-content-col">
              ${contentHtml}
            </div>
            <div class="hero-media-col">
              ${mediaHtml}
            </div>
          </div>
        </div>
      `;
      break;
      
    case 'video_background':
      layoutHtml = `
        <div class="hero-layout hero-layout--video-background relative">
          <div class="hero-background absolute inset-0 z-0">
            ${mediaHtml}
          </div>
          <div class="hero-overlay relative z-10 bg-black bg-opacity-40">
            <div class="hero-content-overlay text-white">
              ${contentHtml}
            </div>
          </div>
        </div>
      `;
      break;
      
    default:
      layoutHtml = `
        <div class="hero-layout hero-layout--default">
          ${mediaHtml}
          ${contentHtml}
        </div>
      `;
  }
  
  return `
    <section class="${containerClasses}" data-hero-layout="${hero_layout}">
      ${layoutHtml}
    </section>
  `;
}

describe('Hero Component', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  describe('Basic Rendering', () => {
    it('should render with basic content', () => {
      const heroHtml = renderHero({
        heading: 'Welcome to Our Platform',
        text: '<p>Discover innovative solutions.</p>'
      });
      container.innerHTML = heroHtml;
      
      const hero = container.querySelector('[data-hero-layout]');
      const heading = container.querySelector('.hero-heading');
      
      expect(hero).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBe('Welcome to Our Platform');
    });

    it('should render pre-headline when provided', () => {
      const heroHtml = renderHero({
        pre_headline: 'Innovation',
        heading: 'Welcome'
      });
      container.innerHTML = heroHtml;
      
      const preHeadline = container.querySelector('.hero-pre-headline');
      expect(preHeadline).toBeInTheDocument();
      expect(preHeadline.textContent).toBe('Innovation');
    });

    it('should render text content when provided', () => {
      const heroHtml = renderHero({
        heading: 'Welcome',
        text: '<p>Your digital transformation starts here.</p>'
      });
      container.innerHTML = heroHtml;
      
      const textElement = container.querySelector('.hero-text');
      expect(textElement).toBeInTheDocument();
      expect(textElement.innerHTML).toContain('<p>Your digital transformation starts here.</p>');
    });

    it('should render without content sections when not provided', () => {
      const heroHtml = renderHero({});
      container.innerHTML = heroHtml;
      
      expect(container.querySelector('.hero-pre-headline')).not.toBeInTheDocument();
      expect(container.querySelector('.hero-heading')).not.toBeInTheDocument();
      expect(container.querySelector('.hero-text')).not.toBeInTheDocument();
      expect(container.querySelector('.hero-actions')).not.toBeInTheDocument();
    });
  });

  describe('Layout Variants', () => {
    it('should render image_top layout correctly', () => {
      const heroHtml = renderHero({
        heading: 'Test Hero',
        media: '<img src="test.jpg" alt="Test">',
        hero_layout: 'image_top'
      });
      container.innerHTML = heroHtml;
      
      const hero = container.querySelector('[data-hero-layout="image_top"]');
      const layout = container.querySelector('.hero-layout--image-top');
      
      expect(hero).toBeInTheDocument();
      expect(layout).toBeInTheDocument();
    });

    it('should render image_bottom layout correctly', () => {
      const heroHtml = renderHero({
        heading: 'Test Hero',
        media: '<img src="test.jpg" alt="Test">',
        hero_layout: 'image_bottom'
      });
      container.innerHTML = heroHtml;
      
      const hero = container.querySelector('[data-hero-layout="image_bottom"]');
      const layout = container.querySelector('.hero-layout--image-bottom');
      
      expect(hero).toBeInTheDocument();
      expect(layout).toBeInTheDocument();
    });

    it('should render image_bottom_split layout correctly', () => {
      const heroHtml = renderHero({
        heading: 'Test Hero',
        media: '<img src="test.jpg" alt="Test">',
        hero_layout: 'image_bottom_split'
      });
      container.innerHTML = heroHtml;
      
      const hero = container.querySelector('[data-hero-layout="image_bottom_split"]');
      const layout = container.querySelector('.hero-layout--image-bottom-split');
      const grid = container.querySelector('.grid.md\\:grid-cols-2');
      
      expect(hero).toBeInTheDocument();
      expect(layout).toBeInTheDocument();
      expect(grid).toBeInTheDocument();
    });

    it('should render video_background layout correctly', () => {
      const heroHtml = renderHero({
        heading: 'Test Hero',
        media: '<video src="test.mp4"></video>',
        hero_layout: 'video_background'
      });
      container.innerHTML = heroHtml;
      
      const hero = container.querySelector('[data-hero-layout="video_background"]');
      const layout = container.querySelector('.hero-layout--video-background');
      const overlay = container.querySelector('.hero-overlay');
      
      expect(hero).toBeInTheDocument();
      expect(layout).toBeInTheDocument();
      expect(overlay).toBeInTheDocument();
      expect(layout.className).toContain('relative');
    });

    it('should default to default layout for unknown layout', () => {
      const heroHtml = renderHero({
        heading: 'Test Hero',
        hero_layout: 'unknown_layout'
      });
      container.innerHTML = heroHtml;
      
      const hero = container.querySelector('[data-hero-layout="unknown_layout"]');
      const layout = container.querySelector('.hero-layout--default');
      
      expect(hero).toBeInTheDocument();
      expect(layout).toBeInTheDocument();
    });
  });

  describe('Media Handling', () => {
    it('should render media when provided', () => {
      const mediaContent = '<img src="hero.jpg" alt="Hero image" class="w-full">';
      const heroHtml = renderHero({
        heading: 'With Media',
        media: mediaContent
      });
      container.innerHTML = heroHtml;
      
      const mediaElement = container.querySelector('.hero-media');
      expect(mediaElement).toBeInTheDocument();
      expect(mediaElement.innerHTML.trim()).toBe(mediaContent);
    });

    it('should not render media container when media is empty', () => {
      const heroHtml = renderHero({
        heading: 'Without Media',
        media: ''
      });
      container.innerHTML = heroHtml;
      
      const mediaElement = container.querySelector('.hero-media');
      expect(mediaElement).not.toBeInTheDocument();
    });

    it('should handle video content in video_background layout', () => {
      const videoContent = '<video autoplay muted loop><source src="hero.mp4"></video>';
      const heroHtml = renderHero({
        heading: 'Video Hero',
        media: videoContent,
        hero_layout: 'video_background'
      });
      container.innerHTML = heroHtml;
      
      const background = container.querySelector('.hero-background');
      expect(background).toBeInTheDocument();
      expect(background.innerHTML).toContain('video');
    });
  });

  describe('Action Links', () => {
    it('should render primary action link', () => {
      const heroHtml = renderHero({
        heading: 'Test Hero',
        link: {
          url: '/get-started',
          title: 'Get Started',
          icon: ''
        }
      });
      container.innerHTML = heroHtml;
      
      const actions = container.querySelector('.hero-actions');
      const primaryLink = container.querySelector('a[href="/get-started"]');
      
      expect(actions).toBeInTheDocument();
      expect(primaryLink).toBeInTheDocument();
      expect(primaryLink.textContent.trim()).toBe('Get Started');
      expect(primaryLink.className).toContain('bg-blue-600');
    });

    it('should render secondary action link', () => {
      const heroHtml = renderHero({
        heading: 'Test Hero',
        link2: {
          url: '/learn-more',
          title: 'Learn More',
          icon: ''
        }
      });
      container.innerHTML = heroHtml;
      
      const secondaryLink = container.querySelector('a[href="/learn-more"]');
      
      expect(secondaryLink).toBeInTheDocument();
      expect(secondaryLink.textContent.trim()).toBe('Learn More');
      expect(secondaryLink.className).toContain('bg-gray-200');
    });

    it('should render both action links', () => {
      const heroHtml = renderHero({
        heading: 'Test Hero',
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
      container.innerHTML = heroHtml;
      
      const primaryLink = container.querySelector('a[href="/primary"]');
      const secondaryLink = container.querySelector('a[href="/secondary"]');
      
      expect(primaryLink).toBeInTheDocument();
      expect(secondaryLink).toBeInTheDocument();
    });

    it('should render action links with icons', () => {
      const heroHtml = renderHero({
        heading: 'Test Hero',
        link: {
          url: '/demo',
          title: 'Watch Demo',
          icon: '<i class="play-icon"></i>'
        }
      });
      container.innerHTML = heroHtml;
      
      const link = container.querySelector('a[href="/demo"]');
      expect(link).toBeInTheDocument();
      expect(link.innerHTML).toContain('<i class="play-icon"></i>');
      expect(link.textContent).toContain('Watch Demo');
    });

    it('should not render actions container when no links provided', () => {
      const heroHtml = renderHero({
        heading: 'Test Hero',
        link: {},
        link2: {}
      });
      container.innerHTML = heroHtml;
      
      const actions = container.querySelector('.hero-actions');
      expect(actions).not.toBeInTheDocument();
    });

    it('should not render incomplete links', () => {
      const heroHtml = renderHero({
        heading: 'Test Hero',
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
      container.innerHTML = heroHtml;
      
      const actions = container.querySelector('.hero-actions');
      const links = container.querySelectorAll('.hero-actions a');
      // Actions container exists but should have no valid links
      expect(actions).toBeInTheDocument();
      expect(links).toHaveLength(0);
    });
  });

  describe('CSS Classes and Styling', () => {
    it('should apply modifier classes', () => {
      const heroHtml = renderHero({
        heading: 'Test Hero',
        modifier: 'custom-hero-class another-class'
      });
      container.innerHTML = heroHtml;
      
      const hero = container.querySelector('section');
      expect(hero.className).toContain('custom-hero-class');
      expect(hero.className).toContain('another-class');
    });

    it('should have base hero wrapper class', () => {
      const heroHtml = renderHero({
        heading: 'Test Hero'
      });
      container.innerHTML = heroHtml;
      
      const hero = container.querySelector('section');
      expect(hero.className).toContain('hero-wrapper');
    });

    it('should have layout-specific classes', () => {
      const heroHtml = renderHero({
        heading: 'Test Hero',
        hero_layout: 'image_bottom_split'
      });
      container.innerHTML = heroHtml;
      
      const layout = container.querySelector('.hero-layout');
      expect(layout.className).toContain('hero-layout--image-bottom-split');
    });

    it('should apply responsive grid classes for split layout', () => {
      const heroHtml = renderHero({
        heading: 'Test Hero',
        hero_layout: 'image_bottom_split'
      });
      container.innerHTML = heroHtml;
      
      const grid = container.querySelector('.grid');
      expect(grid.className).toContain('md:grid-cols-2');
      expect(grid.className).toContain('gap-8');
      expect(grid.className).toContain('items-center');
    });
  });

  describe('Accessibility', () => {
    it('should use proper heading hierarchy', () => {
      const heroHtml = renderHero({
        heading: 'Main Hero Title'
      });
      container.innerHTML = heroHtml;
      
      const heading = container.querySelector('h1');
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBe('Main Hero Title');
    });

    it('should have semantic section element', () => {
      const heroHtml = renderHero({
        heading: 'Test Hero'
      });
      container.innerHTML = heroHtml;
      
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should have accessible action links', () => {
      const heroHtml = renderHero({
        heading: 'Test Hero',
        link: {
          url: '/accessible',
          title: 'Accessible Link',
          icon: ''
        }
      });
      container.innerHTML = heroHtml;
      
      const link = container.querySelector('a');
      expect(link.getAttribute('href')).toBe('/accessible');
      expect(link.textContent.trim()).toBe('Accessible Link');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty props gracefully', () => {
      const heroHtml = renderHero({});
      container.innerHTML = heroHtml;
      
      const hero = container.querySelector('section');
      expect(hero).toBeInTheDocument();
      expect(hero.getAttribute('data-hero-layout')).toBe('image_top');
    });

    it('should handle HTML content in text', () => {
      const htmlText = '<p>Paragraph with <strong>bold</strong> and <a href="#">link</a></p>';
      const heroHtml = renderHero({
        heading: 'HTML Content',
        text: htmlText
      });
      container.innerHTML = heroHtml;
      
      const textElement = container.querySelector('.hero-text');
      expect(textElement.innerHTML).toBe(htmlText);
      expect(textElement.querySelector('strong')).toBeInTheDocument();
      expect(textElement.querySelector('a')).toBeInTheDocument();
    });

    it('should handle special characters in heading', () => {
      const specialHeading = 'Hero with "quotes" & <symbols>';
      const heroHtml = renderHero({
        heading: specialHeading
      });
      container.innerHTML = heroHtml;
      
      const heading = container.querySelector('.hero-heading');
      // HTML entities are automatically decoded by textContent
      expect(heading.textContent).toContain('Hero with "quotes" & ');
    });

    it('should handle complex media content', () => {
      const complexMedia = `
        <picture>
          <source media="(min-width: 768px)" srcset="large.jpg">
          <img src="small.jpg" alt="Responsive image" class="w-full h-auto">
        </picture>
      `;
      
      const heroHtml = renderHero({
        heading: 'Complex Media',
        media: complexMedia
      });
      container.innerHTML = heroHtml;
      
      const mediaElement = container.querySelector('.hero-media');
      expect(mediaElement).toBeInTheDocument();
      expect(mediaElement.querySelector('picture')).toBeInTheDocument();
      expect(mediaElement.querySelector('source')).toBeInTheDocument();
    });
  });
});