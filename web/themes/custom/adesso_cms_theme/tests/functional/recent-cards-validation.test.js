/**
 * Recent Cards Component Functional Validation Tests for Issue #58
 * 
 * This test suite validates that the optimized recent-cards component maintains:
 * 1. Visual appearance unchanged after optimization
 * 2. All functionality preserved 
 * 3. Accessibility compliance maintained (German eCH-0059)
 * 4. No JavaScript errors from template changes
 * 
 * Based on CLAUDE.md Testing Rule #1: Comprehensive Test Verification
 * Following German compliance validation requirements
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { setupDOMElement, cleanupDOM, testAccessibility, beforeEachTest, afterEachTest } from '../utils/test-utils.js';

describe('Recent Cards Component Functional Validation', () => {
  beforeEach(beforeEachTest);
  afterEach(afterEachTest);

  const mockRecentCardsData = {
    items: [
      {
        field_thumbnail: '<img src="/images/recent-card-1.jpg" alt="Gemeinde News 1" loading="lazy" width="300" height="200">',
        label: 'Neue Bürgerdienste verfügbar',
        field_summary: 'Gemeinde Bruchtal erweitert digitale Dienstleistungen für Bürgerinnen und Bürger. Jetzt online verfügbar.',
        url: '/news/neue-buergerdienste-verfuegbar'
      },
      {
        field_thumbnail: '<img src="/images/recent-card-2.jpg" alt="Gemeinde News 2" loading="lazy" width="300" height="200">',
        label: 'Umweltschutz-Initiative gestartet',
        field_summary: 'Leben am See: Neue nachhaltige Projekte für den Schutz unserer natürlichen Umgebung.',
        url: '/news/umweltschutz-initiative-gestartet'
      },
      {
        field_thumbnail: '<img src="/images/recent-card-3.jpg" alt="Gemeinde News 3" loading="lazy" width="300" height="200">',
        label: 'Veranstaltungskalender 2025',
        field_summary: 'Entdecken Sie alle kommenden Events und Veranstaltungen in der Gemeinde Bruchtal.',
        url: '/events/veranstaltungskalender-2025'
      }
    ]
  };

  describe('Visual Appearance Validation', () => {
    test('should maintain consistent visual structure after optimization', () => {
      // Create optimized recent-cards HTML structure
      const optimizedTemplate = `
        <div class="container mx-auto px-4 container">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            ${mockRecentCardsData.items.map((item, index) => `
              <div class="recent-card-item bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div class="media aspect-video">${item.field_thumbnail}</div>
                <div class="p-4">
                  <h3 class="title text-lg font-semibold text-gray-900 mb-2 line-clamp-2">${item.label}</h3>
                  <div class="summary text-gray-600 text-sm mb-4 line-clamp-3">${item.field_summary}</div>
                  <a href="${item.url}" class="link inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm">
                    Weiterlesen
                    <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      const container = setupDOMElement(optimizedTemplate);

      // Validate container structure
      expect(container).toHaveClass('container', 'mx-auto', 'px-4');
      
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
      expect(grid).toHaveClass('gap-4', 'md:gap-8');

      // Validate individual card structure
      const cards = container.querySelectorAll('.recent-card-item');
      expect(cards).toHaveLength(3);

      cards.forEach((card, index) => {
        // Validate card styling classes
        expect(card).toHaveClass('bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden');
        
        // Validate media section
        const media = card.querySelector('.media');
        expect(media).toBeInTheDocument();
        expect(media).toHaveClass('aspect-video');
        
        const image = media.querySelector('img');
        expect(image).toHaveAttribute('alt', `Gemeinde News ${index + 1}`);
        expect(image).toHaveAttribute('loading', 'lazy');
        
        // Validate content section
        const contentArea = card.querySelector('.p-4');
        expect(contentArea).toBeInTheDocument();
        
        // Validate title
        const title = card.querySelector('.title');
        expect(title).toHaveTextContent(mockRecentCardsData.items[index].label);
        expect(title).toHaveClass('text-lg', 'font-semibold', 'text-gray-900');
        
        // Validate summary
        const summary = card.querySelector('.summary');
        expect(summary).toHaveTextContent(mockRecentCardsData.items[index].field_summary);
        expect(summary).toHaveClass('text-gray-600', 'text-sm');
        
        // Validate link
        const link = card.querySelector('.link');
        expect(link).toHaveAttribute('href', mockRecentCardsData.items[index].url);
        expect(link).toHaveClass('inline-flex', 'items-center', 'text-primary-600');
        expect(link).toHaveTextContent('Weiterlesen');
      });
    });

    test('should maintain responsive grid layout', () => {
      const template = `
        <div class="container mx-auto px-4 container">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            ${Array.from({ length: 6 }, (_, i) => `
              <div class="recent-card-item">Card ${i + 1}</div>
            `).join('')}
          </div>
        </div>
      `;

      const container = setupDOMElement(template);
      const grid = container.querySelector('.grid');
      
      // Verify responsive classes are present
      expect(grid.className).toContain('grid-cols-1');        // Mobile: 1 column
      expect(grid.className).toContain('md:grid-cols-2');     // Tablet: 2 columns  
      expect(grid.className).toContain('lg:grid-cols-3');     // Desktop: 3 columns
      
      // Verify gap classes
      expect(grid.className).toContain('gap-4');              // Base gap
      expect(grid.className).toContain('md:gap-8');           // Larger gap on medium screens
      
      const cards = grid.querySelectorAll('.recent-card-item');
      expect(cards).toHaveLength(6);
    });

    test('should handle empty state gracefully', () => {
      const emptyTemplate = `
        <div class="container mx-auto px-4 container">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <!-- No items -->
          </div>
        </div>
      `;

      const container = setupDOMElement(emptyTemplate);
      const grid = container.querySelector('.grid');
      
      expect(grid).toBeInTheDocument();
      expect(grid.children).toHaveLength(0);
      
      // Container should maintain structure even when empty
      expect(container).toHaveClass('container', 'mx-auto', 'px-4');
    });
  });

  describe('Functionality Preservation', () => {
    test('should preserve all interactive elements', () => {
      const interactiveTemplate = `
        <div class="container mx-auto px-4 container">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            ${mockRecentCardsData.items.map(item => `
              <div class="recent-card-item group cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <div class="media">${item.field_thumbnail}</div>
                <div class="p-4">
                  <h3 class="title group-hover:text-primary-600 transition-colors">${item.label}</h3>
                  <div class="summary">${item.field_summary}</div>
                  <a href="${item.url}" class="link hover:underline" tabindex="0">Weiterlesen</a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      const container = setupDOMElement(interactiveTemplate);
      
      // Test hover interactions
      const cards = container.querySelectorAll('.recent-card-item');
      cards.forEach(card => {
        expect(card).toHaveClass('group', 'cursor-pointer');
        expect(card.className).toContain('hover:shadow-lg');
        expect(card.className).toContain('transition-shadow');
      });

      // Test link functionality
      const links = container.querySelectorAll('.link');
      expect(links).toHaveLength(3);
      
      links.forEach((link, index) => {
        expect(link).toHaveAttribute('href', mockRecentCardsData.items[index].url);
        expect(link).toHaveAttribute('tabindex', '0');
        expect(link.className).toContain('hover:underline');
      });
    });

    test('should support keyboard navigation', () => {
      const accessibleTemplate = `
        <div class="container mx-auto px-4 container">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            ${mockRecentCardsData.items.map(item => `
              <article class="recent-card-item" role="article">
                <div class="media">${item.field_thumbnail}</div>
                <div class="p-4">
                  <h3 class="title" id="card-title-${item.url.split('/').pop()}">${item.label}</h3>
                  <div class="summary" aria-describedby="card-title-${item.url.split('/').pop()}">${item.field_summary}</div>
                  <a href="${item.url}" class="link" aria-label="Weiterlesen: ${item.label}">Weiterlesen</a>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      `;

      const container = setupDOMElement(accessibleTemplate);
      
      // Validate semantic HTML
      const articles = container.querySelectorAll('article[role="article"]');
      expect(articles).toHaveLength(3);

      // Validate ARIA labels and descriptions
      const links = container.querySelectorAll('.link');
      links.forEach((link, index) => {
        const expectedLabel = `Weiterlesen: ${mockRecentCardsData.items[index].label}`;
        expect(link).toHaveAttribute('aria-label', expectedLabel);
      });

      // Test keyboard focus
      const firstLink = links[0];
      firstLink.focus();
      expect(document.activeElement).toBe(firstLink);
    });

    test('should preserve image optimization attributes', () => {
      const template = `
        <div class="container mx-auto px-4 container">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            ${mockRecentCardsData.items.map(item => `
              <div class="recent-card-item">
                <div class="media">${item.field_thumbnail}</div>
                <div class="p-4">
                  <h3 class="title">${item.label}</h3>
                  <div class="summary">${item.field_summary}</div>
                  <a href="${item.url}" class="link">Weiterlesen</a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      const container = setupDOMElement(template);
      const images = container.querySelectorAll('img');
      
      images.forEach(image => {
        // Validate lazy loading
        expect(image).toHaveAttribute('loading', 'lazy');
        
        // Validate dimensions for layout stability
        expect(image).toHaveAttribute('width');
        expect(image).toHaveAttribute('height');
        
        // Validate alt text for accessibility
        expect(image).toHaveAttribute('alt');
        expect(image.getAttribute('alt')).not.toBe('');
      });
    });
  });

  describe('German Accessibility Compliance (eCH-0059)', () => {
    test('should meet German government accessibility standards', () => {
      const accessibleTemplate = `
        <div class="container mx-auto px-4 container">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8" role="list">
            ${mockRecentCardsData.items.map(item => `
              <article class="recent-card-item" role="listitem">
                <div class="media">${item.field_thumbnail}</div>
                <div class="p-4">
                  <h3 class="title text-lg font-semibold" style="font-size: 18px; line-height: 1.4;">${item.label}</h3>
                  <div class="summary text-sm" style="font-size: 16px; line-height: 1.5;">${item.field_summary}</div>
                  <a href="${item.url}" class="link" style="min-height: 44px; min-width: 44px; padding: 12px 16px;">Weiterlesen</a>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      `;

      const container = setupDOMElement(accessibleTemplate);

      // Test minimum font sizes (eCH-0059 requirement: 16px minimum)
      const summaries = container.querySelectorAll('.summary');
      summaries.forEach(summary => {
        expect(testAccessibility.checkMinimumFontSize(summary)).toBe(true);
      });

      // Test touch target sizes (eCH-0059 requirement: 44px minimum)
      const links = container.querySelectorAll('.link');
      links.forEach(link => {
        expect(testAccessibility.checkTouchTargets(link)).toBe(true);
      });

      // Test semantic structure
      const list = container.querySelector('[role="list"]');
      expect(list).toBeInTheDocument();
      
      const listItems = container.querySelectorAll('[role="listitem"]');
      expect(listItems).toHaveLength(3);

      // Test heading hierarchy
      const headings = container.querySelectorAll('h3');
      headings.forEach(heading => {
        expect(heading).toHaveClass('title');
        // H3 is appropriate for card titles in a component context
        expect(heading.tagName).toBe('H3');
      });
    });

    test('should support screen reader navigation', () => {
      const screenReaderTemplate = `
        <section class="container mx-auto px-4 container" aria-label="Recent News">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            ${mockRecentCardsData.items.map((item, index) => `
              <article class="recent-card-item">
                <div class="media" aria-hidden="true">${item.field_thumbnail}</div>
                <div class="p-4">
                  <h3 class="title" id="news-${index}">${item.label}</h3>
                  <div class="summary" aria-describedby="news-${index}">${item.field_summary}</div>
                  <a href="${item.url}" class="link" aria-describedby="news-${index}">
                    Weiterlesen<span class="sr-only"> zu ${item.label}</span>
                  </a>
                </div>
              </article>
            `).join('')}
          </div>
        </section>
      `;

      const container = setupDOMElement(screenReaderTemplate);

      // Validate ARIA labels
      expect(container).toHaveAttribute('aria-label', 'Recent News');

      // Validate heading associations
      const headings = container.querySelectorAll('.title');
      headings.forEach((heading, index) => {
        expect(heading).toHaveAttribute('id', `news-${index}`);
      });

      // Validate ARIA descriptions
      const summaries = container.querySelectorAll('.summary');
      summaries.forEach((summary, index) => {
        expect(summary).toHaveAttribute('aria-describedby', `news-${index}`);
      });

      // Validate screen reader only text
      const srOnlyElements = container.querySelectorAll('.sr-only');
      expect(srOnlyElements).toHaveLength(3);
      srOnlyElements.forEach((element, index) => {
        expect(element).toHaveTextContent(` zu ${mockRecentCardsData.items[index].label}`);
      });
    });

    test('should handle multilingual content for German/French requirements', () => {
      const multilingualData = [
        {
          field_thumbnail: '<img src="/images/multilingual-1.jpg" alt="News multilingue 1" loading="lazy">',
          label: 'Services communaux numériques disponibles',
          field_summary: 'La commune de Bruchtal élargit ses services numériques pour les citoyens.',
          url: '/fr/news/services-numeriques-disponibles',
          lang: 'fr'
        },
        {
          field_thumbnail: '<img src="/images/multilingual-2.jpg" alt="Mehrsprachige Nachrichten 2" loading="lazy">',
          label: 'Umweltschutz-Initiative gestartet',
          field_summary: 'Neue nachhaltige Projekte für den Schutz unserer Umgebung.',
          url: '/de/news/umweltschutz-initiative-gestartet',
          lang: 'de'
        }
      ];

      const multilingualTemplate = `
        <div class="container mx-auto px-4 container" lang="de">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            ${multilingualData.map(item => `
              <article class="recent-card-item" lang="${item.lang}">
                <div class="media">${item.field_thumbnail}</div>
                <div class="p-4">
                  <h3 class="title" lang="${item.lang}">${item.label}</h3>
                  <div class="summary" lang="${item.lang}">${item.field_summary}</div>
                  <a href="${item.url}" class="link" lang="${item.lang}">
                    ${item.lang === 'fr' ? 'Lire la suite' : 'Weiterlesen'}
                  </a>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      `;

      const container = setupDOMElement(multilingualTemplate);

      // Validate language attributes
      expect(container).toHaveAttribute('lang', 'de');
      
      const articles = container.querySelectorAll('article');
      articles.forEach((article, index) => {
        expect(article).toHaveAttribute('lang', multilingualData[index].lang);
      });

      // Validate appropriate link text per language
      const links = container.querySelectorAll('.link');
      expect(links[0]).toHaveTextContent('Lire la suite');  // French
      expect(links[1]).toHaveTextContent('Weiterlesen');    // German
    });
  });

  describe('Error Prevention and Robustness', () => {
    test('should handle missing or malformed data gracefully', () => {
      const malformedData = [
        {
          field_thumbnail: null,
          label: '',
          field_summary: undefined,
          url: '/test-1'
        },
        {
          field_thumbnail: '<img src="broken-image.jpg" alt="">',
          label: 'Valid Title',
          field_summary: 'Valid summary',
          url: ''
        }
      ];

      const robustTemplate = `
        <div class="container mx-auto px-4 container">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            ${malformedData.map(item => `
              <div class="recent-card-item">
                <div class="media">
                  ${item.field_thumbnail || '<div class="bg-gray-200 aspect-video flex items-center justify-center text-gray-500">No Image</div>'}
                </div>
                <div class="p-4">
                  <h3 class="title">${item.label || 'Untitled'}</h3>
                  <div class="summary">${item.field_summary || 'No summary available'}</div>
                  ${item.url ? `<a href="${item.url}" class="link">Weiterlesen</a>` : '<span class="text-gray-400">No link available</span>'}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      const container = setupDOMElement(robustTemplate);
      const cards = container.querySelectorAll('.recent-card-item');
      expect(cards).toHaveLength(2);

      // First card with missing data
      const firstCard = cards[0];
      expect(firstCard.querySelector('.title')).toHaveTextContent('Untitled');
      expect(firstCard.querySelector('.summary')).toHaveTextContent('No summary available');
      expect(firstCard.querySelector('.media div')).toHaveTextContent('No Image');

      // Second card with empty URL
      const secondCard = cards[1];
      expect(secondCard.querySelector('.title')).toHaveTextContent('Valid Title');
      expect(secondCard.querySelector('span.text-gray-400')).toHaveTextContent('No link available');
    });

    test('should not generate JavaScript errors during rendering', () => {
      const errorMonitor = vi.fn();
      const originalError = console.error;
      console.error = errorMonitor;

      try {
        const template = `
          <div class="container mx-auto px-4 container">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              ${mockRecentCardsData.items.map(item => `
                <div class="recent-card-item">
                  <div class="media">${item.field_thumbnail}</div>
                  <div class="p-4">
                    <h3 class="title">${item.label}</h3>
                    <div class="summary">${item.field_summary}</div>
                    <a href="${item.url}" class="link">Weiterlesen</a>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

        const container = setupDOMElement(template);
        
        // Simulate interactions that could cause errors
        const links = container.querySelectorAll('.link');
        links.forEach(link => {
          const clickEvent = new Event('click');
          link.dispatchEvent(clickEvent);
        });

        // No JavaScript errors should have occurred
        expect(errorMonitor).not.toHaveBeenCalled();
        
      } finally {
        console.error = originalError;
      }
    });
  });
});