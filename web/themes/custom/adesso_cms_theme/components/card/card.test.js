/**
 * @file Card component tests - Phase 2.3 Implementation
 * Tests for card component functionality, layouts, and Swiss municipality theming
 * 
 * Features tested:
 * - Card structure and semantic markup
 * - Various card layouts and configurations
 * - Image handling and accessibility
 * - Link and button accessibility
 * - Municipality theme integration
 * - Responsive design validation
 * - Performance optimization
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  testAccessibility, 
  testSwissCompliance, 
  testComponent,
  testPerformance
} from '../../tests/utils/test-utils.js';
import { 
  accessibilityTestInteractive,
  accessibilityTestMedia 
} from '../../tests/utils/accessibility-test-modules.js';
import { 
  MunicipalityThemeTester,
  testComponentAcrossAllMunicipalities 
} from '../../tests/utils/municipality-theme-testing.js';

// Mock card component rendering
function renderCard(props = {}) {
  const {
    title = '',
    summary = '',
    image = '',
    image_alt = '',
    link = {},
    date = '',
    tags = [],
    card_layout = 'vertical',
    show_excerpt = true,
    show_date = true,
    show_tags = true,
    modifier = '',
    municipality = 'thalwil'
  } = props;

  const cardId = 'card-' + Math.random().toString(36).substr(2, 9);
  const containerClasses = ['c-card', modifier, `card-layout-${card_layout}`].filter(Boolean).join(' ');
  const municipalityClass = `municipality-${municipality}`;

  // Generate image HTML
  const imageHtml = image ? `
    <div class="card-image">
      <img 
        src="${image}" 
        alt="${image_alt}" 
        class="w-full h-48 object-cover rounded-t-lg" 
        loading="lazy"
        decoding="async"
      />
    </div>
  ` : '';

  // Generate date HTML
  const dateHtml = (date && show_date) ? `
    <time class="card-date text-sm text-gray-500 mb-2" datetime="${date}">
      ${new Date(date).toLocaleDateString('de-CH')}
    </time>
  ` : '';

  // Generate tags HTML
  const tagsHtml = (tags.length > 0 && show_tags) ? `
    <div class="card-tags mb-3">
      <ul class="flex flex-wrap gap-2">
        ${tags.map(tag => `
          <li>
            <span class="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              ${tag}
            </span>
          </li>
        `).join('')}
      </ul>
    </div>
  ` : '';

  // Generate excerpt HTML
  const excerptHtml = (summary && show_excerpt) ? `
    <div class="card-excerpt text-gray-600 mb-4">
      ${summary}
    </div>
  ` : '';

  // Generate link HTML
  const linkHtml = (link.url && link.title) ? `
    <div class="card-actions mt-4">
      <a 
        href="${link.url}" 
        class="inline-flex items-center text-primary hover:text-primary-dark font-medium"
        ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
        ${link.external ? 'aria-label="' + link.title + ' (öffnet in neuem Fenster)"' : ''}
      >
        ${link.title}
        ${link.external ? '<span aria-hidden="true" class="ml-1">↗</span>' : ''}
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </a>
    </div>
  ` : '';

  // Layout-specific rendering
  let layoutHtml = '';
  
  switch (card_layout) {
    case 'horizontal':
      layoutHtml = `
        <article id="${cardId}" class="${containerClasses} ${municipalityClass} flex flex-col md:flex-row bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" data-component="card">
          <div class="md:w-1/3 flex-shrink-0">
            ${imageHtml}
          </div>
          <div class="flex-1 p-6">
            <div class="card-content">
              ${dateHtml}
              ${title ? `<h3 class="card-title text-xl font-semibold text-gray-900 mb-3">${title}</h3>` : ''}
              ${excerptHtml}
              ${tagsHtml}
              ${linkHtml}
            </div>
          </div>
        </article>
      `;
      break;
      
    case 'minimal':
      layoutHtml = `
        <article id="${cardId}" class="${containerClasses} ${municipalityClass} bg-white p-4 rounded-lg" data-component="card">
          <div class="card-content">
            ${dateHtml}
            ${title ? `<h3 class="card-title text-lg font-medium text-gray-900 mb-2">${title}</h3>` : ''}
            ${excerptHtml}
            ${linkHtml}
          </div>
        </article>
      `;
      break;
      
    case 'featured':
      layoutHtml = `
        <article id="${cardId}" class="${containerClasses} ${municipalityClass} bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden" data-component="card">
          ${imageHtml}
          <div class="p-8">
            <div class="card-content">
              ${dateHtml}
              ${tagsHtml}
              ${title ? `<h2 class="card-title text-2xl font-bold text-gray-900 mb-4">${title}</h2>` : ''}
              ${excerptHtml}
              ${linkHtml}
            </div>
          </div>
        </article>
      `;
      break;
      
    default: // vertical
      layoutHtml = `
        <article id="${cardId}" class="${containerClasses} ${municipalityClass} bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" data-component="card">
          ${imageHtml}
          <div class="p-6">
            <div class="card-content">
              ${dateHtml}
              ${title ? `<h3 class="card-title text-lg font-semibold text-gray-900 mb-3">${title}</h3>` : ''}
              ${excerptHtml}
              ${tagsHtml}
              ${linkHtml}
            </div>
          </div>
        </article>
      `;
  }
  
  return layoutHtml;
}

describe('Card Component - Phase 2.3 Comprehensive Testing', () => {
  let container;
  let cardElement;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  describe('Basic Rendering and Structure', () => {
    it('should render with minimal required content', () => {
      const cardHtml = renderCard({
        title: 'Test Card Title',
        summary: 'Test card summary content'
      });
      container.innerHTML = cardHtml;
      
      const card = container.querySelector('.c-card');
      const title = container.querySelector('.card-title');
      const excerpt = container.querySelector('.card-excerpt');

      expect(card).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(title.textContent).toBe('Test Card Title');
      expect(excerpt).toBeInTheDocument();
      expect(excerpt.textContent.trim()).toBe('Test card summary content');
    });

    it('should render as semantic article element', () => {
      const cardHtml = renderCard({ title: 'Test' });
      container.innerHTML = cardHtml;
      
      const article = container.querySelector('article');
      expect(article).toBeInTheDocument();
      expect(article.getAttribute('data-component')).toBe('card');
    });

    it('should apply municipality theme classes', () => {
      const cardHtml = renderCard({ 
        title: 'Test',
        municipality: 'erlenbach' 
      });
      container.innerHTML = cardHtml;
      
      const card = container.querySelector('.c-card');
      expect(card.className).toContain('municipality-erlenbach');
    });

    it('should render without optional content when not provided', () => {
      const cardHtml = renderCard({
        title: 'Test Card',
        show_date: false,
        show_tags: false,
        show_excerpt: false
      });
      container.innerHTML = cardHtml;
      
      expect(container.querySelector('.card-date')).not.toBeInTheDocument();
      expect(container.querySelector('.card-tags')).not.toBeInTheDocument();
      expect(container.querySelector('.card-excerpt')).not.toBeInTheDocument();
    });
  });

  describe('Card Layout Variants', () => {
    it('should render vertical layout correctly', () => {
      const cardHtml = renderCard({
        title: 'Vertical Card',
        card_layout: 'vertical',
        image: 'test-image.jpg',
        image_alt: 'Test image'
      });
      container.innerHTML = cardHtml;
      
      const card = container.querySelector('.c-card');
      const image = container.querySelector('.card-image img');
      
      expect(card.className).toContain('card-layout-vertical');
      expect(image).toBeInTheDocument();
    });

    it('should render horizontal layout correctly', () => {
      const cardHtml = renderCard({
        title: 'Horizontal Card',
        card_layout: 'horizontal',
        image: 'test-image.jpg',
        image_alt: 'Test image'
      });
      container.innerHTML = cardHtml;
      
      const card = container.querySelector('.c-card');
      
      expect(card.className).toContain('card-layout-horizontal');
      expect(card.className).toContain('flex');
      expect(card.className).toContain('md:flex-row');
    });

    it('should render minimal layout correctly', () => {
      const cardHtml = renderCard({
        title: 'Minimal Card',
        card_layout: 'minimal'
      });
      container.innerHTML = cardHtml;
      
      const card = container.querySelector('.c-card');
      
      expect(card.className).toContain('card-layout-minimal');
      expect(container.querySelector('.card-image')).not.toBeInTheDocument();
    });

    it('should render featured layout correctly', () => {
      const cardHtml = renderCard({
        title: 'Featured Card',
        card_layout: 'featured',
        image: 'featured-image.jpg',
        image_alt: 'Featured image'
      });
      container.innerHTML = cardHtml;
      
      const card = container.querySelector('.c-card');
      const title = container.querySelector('.card-title');
      
      expect(card.className).toContain('card-layout-featured');
      expect(card.className).toContain('shadow-lg');
      expect(title.tagName.toLowerCase()).toBe('h2');
      expect(title.className).toContain('text-2xl');
    });
  });

  describe('Image Handling and Accessibility', () => {
    it('should render images with proper accessibility attributes', () => {
      const cardHtml = renderCard({
        title: 'Card with Image',
        image: 'test-image.jpg',
        image_alt: 'A beautiful Swiss landscape'
      });
      container.innerHTML = cardHtml;
      
      const image = container.querySelector('.card-image img');
      
      expect(image).toBeInTheDocument();
      expect(image.getAttribute('src')).toBe('test-image.jpg');
      expect(image.getAttribute('alt')).toBe('A beautiful Swiss landscape');
      expect(image.getAttribute('loading')).toBe('lazy');
      expect(image.getAttribute('decoding')).toBe('async');
    });

    it('should not render image container when no image provided', () => {
      const cardHtml = renderCard({
        title: 'Card without Image'
      });
      container.innerHTML = cardHtml;
      
      expect(container.querySelector('.card-image')).not.toBeInTheDocument();
    });

    it('should pass image accessibility tests', async () => {
      const cardHtml = renderCard({
        title: 'Card',
        image: 'test.jpg',
        image_alt: 'Descriptive alternative text'
      });
      container.innerHTML = cardHtml;
      cardElement = container.querySelector('.c-card');
      
      const mediaResults = await accessibilityTestMedia.testMediaAccessibility(cardElement);
      
      expect(mediaResults.testResults.images.isValid).toBe(true);
      expect(mediaResults.violations).toHaveLength(0);
    });

    it('should optimize images according to performance standards', async () => {
      const cardHtml = renderCard({
        title: 'Card',
        image: 'test.jpg',
        image_alt: 'Test image'
      });
      container.innerHTML = cardHtml;
      
      const image = container.querySelector('img');
      const imageOptimization = testPerformance.checkImageOptimization(image);
      
      expect(imageOptimization.isOptimized).toBe(true);
      expect(imageOptimization.hasAlt).toBe(true);
      expect(imageOptimization.isLazy).toBe(true);
    });
  });

  describe('Date and Time Handling', () => {
    it('should render date with proper semantic markup', () => {
      const testDate = '2024-03-15';
      const cardHtml = renderCard({
        title: 'Card with Date',
        date: testDate,
        show_date: true
      });
      container.innerHTML = cardHtml;
      
      const timeElement = container.querySelector('.card-date');
      
      expect(timeElement).toBeInTheDocument();
      expect(timeElement.tagName.toLowerCase()).toBe('time');
      expect(timeElement.getAttribute('datetime')).toBe(testDate);
    });

    it('should format date according to Swiss locale', () => {
      const testDate = '2024-03-15';
      const cardHtml = renderCard({
        title: 'Card',
        date: testDate
      });
      container.innerHTML = cardHtml;
      
      const timeElement = container.querySelector('.card-date');
      const formattedDate = timeElement.textContent.trim();
      
      // Swiss date format (DD.MM.YYYY)
      expect(formattedDate).toMatch(/\d{1,2}\.\d{1,2}\.\d{4}/);
    });

    it('should not render date when show_date is false', () => {
      const cardHtml = renderCard({
        title: 'Card',
        date: '2024-03-15',
        show_date: false
      });
      container.innerHTML = cardHtml;
      
      expect(container.querySelector('.card-date')).not.toBeInTheDocument();
    });
  });

  describe('Tags and Categorization', () => {
    it('should render tags as accessible list', () => {
      const testTags = ['Gemeinde', 'Nachrichten', 'Wichtig'];
      const cardHtml = renderCard({
        title: 'Card with Tags',
        tags: testTags,
        show_tags: true
      });
      container.innerHTML = cardHtml;
      
      const tagsList = container.querySelector('.card-tags ul');
      const tagItems = container.querySelectorAll('.card-tags li');
      
      expect(tagsList).toBeInTheDocument();
      expect(tagItems).toHaveLength(testTags.length);
      
      tagItems.forEach((item, index) => {
        expect(item.textContent.trim()).toBe(testTags[index]);
      });
    });

    it('should not render tags when show_tags is false', () => {
      const cardHtml = renderCard({
        title: 'Card',
        tags: ['Test'],
        show_tags: false
      });
      container.innerHTML = cardHtml;
      
      expect(container.querySelector('.card-tags')).not.toBeInTheDocument();
    });

    it('should not render tags container when no tags provided', () => {
      const cardHtml = renderCard({
        title: 'Card',
        tags: []
      });
      container.innerHTML = cardHtml;
      
      expect(container.querySelector('.card-tags')).not.toBeInTheDocument();
    });
  });

  describe('Link and Action Accessibility', () => {
    it('should render action links with proper accessibility', async () => {
      const cardHtml = renderCard({
        title: 'Card with Link',
        link: {
          url: '/article/test',
          title: 'Weiterlesen'
        }
      });
      container.innerHTML = cardHtml;
      
      const actionLink = container.querySelector('.card-actions a');
      
      expect(actionLink).toBeInTheDocument();
      expect(actionLink.getAttribute('href')).toBe('/article/test');
      expect(actionLink.textContent).toContain('Weiterlesen');
      
      const linkResults = await accessibilityTestInteractive.testLinkAccessibility(actionLink);
      expect(linkResults.isValid).toBe(true);
    });

    it('should handle external links properly', () => {
      const cardHtml = renderCard({
        title: 'Card with External Link',
        link: {
          url: 'https://external-site.com',
          title: 'Externe Quelle',
          external: true
        }
      });
      container.innerHTML = cardHtml;
      
      const externalLink = container.querySelector('.card-actions a');
      
      expect(externalLink.getAttribute('target')).toBe('_blank');
      expect(externalLink.getAttribute('rel')).toBe('noopener noreferrer');
      expect(externalLink.getAttribute('aria-label')).toContain('öffnet in neuem Fenster');
      expect(externalLink.innerHTML).toContain('↗');
    });

    it('should include action icon with proper ARIA handling', () => {
      const cardHtml = renderCard({
        title: 'Card',
        link: {
          url: '/test',
          title: 'Link'
        }
      });
      container.innerHTML = cardHtml;
      
      const actionLink = container.querySelector('.card-actions a');
      const icon = actionLink.querySelector('svg');
      
      expect(icon).toBeInTheDocument();
    });

    it('should not render action section when no link provided', () => {
      const cardHtml = renderCard({
        title: 'Card without Link'
      });
      container.innerHTML = cardHtml;
      
      expect(container.querySelector('.card-actions')).not.toBeInTheDocument();
    });
  });

  describe('Swiss Government Accessibility Compliance', () => {
    beforeEach(() => {
      const cardHtml = renderCard({
        title: 'Accessibility Test Card',
        summary: 'This is a test card for accessibility validation',
        image: 'test.jpg',
        image_alt: 'Test image description',
        date: '2024-03-15',
        tags: ['Accessibility', 'Testing'],
        link: {
          url: '/test-article',
          title: 'Artikel lesen'
        }
      });
      container.innerHTML = cardHtml;
      cardElement = container.querySelector('.c-card');
    });

    it('should comply with eCH-0059 web accessibility standards', async () => {
      const swissCompliance = await testSwissCompliance.validateECH0059(cardElement);
      
      expect(swissCompliance.isCompliant).toBe(true);
      expect(swissCompliance.violations).toHaveLength(0);
    });

    it('should have proper semantic structure', async () => {
      const semanticStructure = await testAccessibility.checkSemanticStructure(cardElement);
      
      expect(semanticStructure.isStructurallyValid).toBe(true);
      expect(semanticStructure.issues).toHaveLength(0);
    });

    it('should support multilingual content properly', async () => {
      const multilingualCompliance = await testSwissCompliance.validateMultilingualCompliance(cardElement);
      
      expect(multilingualCompliance.isCompliant).toBe(true);
      expect(multilingualCompliance.textExpansionReady).toBe(true);
    });

    it('should meet keyboard accessibility requirements', async () => {
      const keyboardTest = await testAccessibility.checkKeyboardAccessibility(cardElement);
      
      expect(keyboardTest.isAccessible).toBe(true);
      expect(keyboardTest.focusableCount).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Municipality Theme Integration', () => {
    it('should integrate with Thalwil theme', async () => {
      const cardHtml = renderCard({
        title: 'Thalwil Card',
        municipality: 'thalwil'
      });
      container.innerHTML = cardHtml;
      cardElement = container.querySelector('.c-card');

      const themeTester = new MunicipalityThemeTester('thalwil');
      const themeResults = await themeTester.testThemeClassApplication(cardElement);

      expect(themeResults.passed).toBe(true);
      expect(themeResults.details.hasThemeClass).toBe(true);
    });

    it('should integrate with Thalheim theme', async () => {
      const cardHtml = renderCard({
        title: 'Thalheim Card', 
        municipality: 'thalheim'
      });
      container.innerHTML = cardHtml;
      cardElement = container.querySelector('.c-card');

      const themeTester = new MunicipalityThemeTester('thalheim');
      const themeResults = await themeTester.testThemeClassApplication(cardElement);

      expect(themeResults.passed).toBe(true);
      expect(themeResults.details.hasThemeClass).toBe(true);
    });

    it('should integrate with Erlenbach theme', async () => {
      const cardHtml = renderCard({
        title: 'Erlenbach Card',
        municipality: 'erlenbach'
      });
      container.innerHTML = cardHtml;
      cardElement = container.querySelector('.c-card');

      const themeTester = new MunicipalityThemeTester('erlenbach');
      const themeResults = await themeTester.testThemeClassApplication(cardElement);

      expect(themeResults.passed).toBe(true);
      expect(themeResults.details.hasThemeClass).toBe(true);
    });

    it('should maintain consistency across all municipalities', async () => {
      const cardHtml = renderCard({
        title: 'Cross-Municipality Test Card'
      });
      container.innerHTML = cardHtml;
      cardElement = container.querySelector('.c-card');

      const crossThemeResults = await testComponentAcrossAllMunicipalities(cardElement);

      expect(crossThemeResults.summary.overallStatus).toBe('PASSED');
      expect(crossThemeResults.summary.passRate).toBeGreaterThan(85);
    });
  });

  describe('Responsive Design and Performance', () => {
    beforeEach(() => {
      const cardHtml = renderCard({
        title: 'Responsive Card Test',
        summary: 'Testing responsive behavior',
        image: 'test.jpg',
        image_alt: 'Test image'
      });
      container.innerHTML = cardHtml;
      cardElement = container.querySelector('.c-card');
    });

    it('should be responsive across different viewport sizes', async () => {
      const responsiveResults = await testComponent.testResponsiveComponent(cardElement);

      expect(responsiveResults.mobile.isVisible).toBe(true);
      expect(responsiveResults.tablet.isVisible).toBe(true);
      expect(responsiveResults.desktop.isVisible).toBe(true);
      expect(responsiveResults.mobile.hasOverflow).toBe(false);
    });

    it('should meet performance rendering requirements', async () => {
      const performanceResults = await testPerformance.measureRenderTime(async () => {
        const cardHtml = renderCard({
          title: 'Performance Test Card',
          image: 'large-image.jpg',
          image_alt: 'Large test image'
        });
        container.innerHTML = cardHtml;
      });

      expect(performanceResults.isAcceptable).toBe(true);
      expect(performanceResults.renderTime).toBeLessThan(100);
    });

    it('should simulate good Core Web Vitals', async () => {
      const coreVitalsResults = await testPerformance.simulateCoreWebVitals(cardElement);

      expect(coreVitalsResults.overall.isGood()).toBe(true);
      expect(coreVitalsResults.lcp.isGood).toBe(true);
      expect(coreVitalsResults.cls.isGood).toBe(true);
    });

    it('should have reasonable component size budget', () => {
      const sizeAnalysis = testPerformance.analyzeComponentSize('card');

      expect(sizeAnalysis.isBudgetCompliant).toBe(true);
      expect(sizeAnalysis.total).toBeLessThan(10);
    });
  });

  describe('Content Flexibility and Edge Cases', () => {
    it('should handle very long titles gracefully', () => {
      const longTitle = 'Dies ist ein sehr langer Titel für eine Karte, der zeigen soll, wie die Komponente mit umfangreichen Inhalten umgeht und dabei die Lesbarkeit und das Layout beibehält';
      
      const cardHtml = renderCard({
        title: longTitle
      });
      container.innerHTML = cardHtml;
      
      const titleElement = container.querySelector('.card-title');
      expect(titleElement.textContent).toBe(longTitle);
    });

    it('should handle HTML content in summary', () => {
      const htmlSummary = 'Dies ist eine <strong>wichtige</strong> Nachricht mit <a href="/link">einem Link</a>.';
      
      const cardHtml = renderCard({
        title: 'HTML Content Test',
        summary: htmlSummary
      });
      container.innerHTML = cardHtml;
      
      const excerpt = container.querySelector('.card-excerpt');
      expect(excerpt.innerHTML.trim()).toBe(htmlSummary);
      expect(excerpt.querySelector('strong')).toBeInTheDocument();
      expect(excerpt.querySelector('a')).toBeInTheDocument();
    });

    it('should handle missing or empty content gracefully', () => {
      const cardHtml = renderCard({
        title: '',
        summary: '',
        image: '',
        tags: []
      });
      container.innerHTML = cardHtml;
      
      const card = container.querySelector('.c-card');
      expect(card).toBeInTheDocument();
      
      expect(container.querySelector('.card-title')).not.toBeInTheDocument();
      expect(container.querySelector('.card-excerpt')).not.toBeInTheDocument();
      expect(container.querySelector('.card-image')).not.toBeInTheDocument();
      expect(container.querySelector('.card-tags')).not.toBeInTheDocument();
    });

    it('should handle special characters and Swiss formatting', () => {
      const swissContent = {
        title: 'Zürich Gemeinde-Nachrichten',
        summary: 'Änderungen der Öffnungszeiten während der Fußball-EM 2024',
        tags: ['Gemeinde', 'Öffnungszeiten', 'Fußball-EM']
      };
      
      const cardHtml = renderCard(swissContent);
      container.innerHTML = cardHtml;
      
      const title = container.querySelector('.card-title');
      const excerpt = container.querySelector('.card-excerpt');
      
      expect(title.textContent).toBe(swissContent.title);
      expect(excerpt.textContent.trim()).toBe(swissContent.summary);
    });
  });
});