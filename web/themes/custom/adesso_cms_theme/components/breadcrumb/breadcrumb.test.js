/**
 * @file Breadcrumb component tests
 * Tests for breadcrumb component functionality, accessibility, and municipal portal integration
 */

import { describe, it, expect, beforeEach } from 'vitest';

// Mock Twig template rendering for breadcrumb component
function renderBreadcrumb(props = {}) {
  const {
    items = [
      { title: 'Startseite', url: '/' },
      { title: 'Dienstleistungen', url: '/services' },
      { title: 'Baubewilligung', url: null, is_current: true }
    ],
    separator = '/',
    show_home = true,
    home_title = 'Startseite',
    home_url = '/',
    aria_label = 'Breadcrumb',
    enable_structured_data = true,
    mobile_responsive = true,
    max_mobile_items = 3,
    show_current_page = true,
    link_current_page = false,
    wrapper_classes = '',
    skip_link = false,
    skip_link_text = 'Skip breadcrumb navigation'
  } = props;

  let breadcrumbItems = [];
  
  // Add home item if enabled
  if (show_home && items.length > 0 && items[0].title !== home_title) {
    breadcrumbItems.push({ title: home_title, url: home_url, is_current: false });
  }
  
  // Add provided items
  breadcrumbItems = [...breadcrumbItems, ...items];

  // Generate structured data
  let structuredData = null;
  if (enable_structured_data) {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbItems.map((item, index) => {
        const listItem = {
          '@type': 'ListItem',
          'position': index + 1,
          'name': item.title
        };
        if (item.url && !item.is_current) {
          listItem.item = item.url;
        }
        return listItem;
      })
    };
  }

  // Handle mobile responsiveness  
  let displayItems = breadcrumbItems;
  if (mobile_responsive && breadcrumbItems.length > max_mobile_items) {
    const firstItem = breadcrumbItems[0];
    const lastItems = breadcrumbItems.slice(-2); // Current and one parent
    displayItems = [
      firstItem,
      { title: '...', url: null, is_ellipsis: true },
      ...lastItems
    ];
  }

  // Generate HTML
  let html = '';
  
  if (skip_link) {
    html += `<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50">${skip_link_text}</a>`;
  }

  if (enable_structured_data && structuredData) {
    html += `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`;
  }

  const navClasses = `breadcrumb ${mobile_responsive ? 'mobile-responsive' : ''} ${wrapper_classes}`.trim();
  
  html += `<div class="${navClasses}">`;
  html += `  <nav class="breadcrumb-nav" aria-label="${aria_label}" role="navigation">`;
  html += '    <ol class="breadcrumb-list flex flex-wrap items-center gap-x-1 gap-y-1 text-sm leading-6">';
  
  displayItems.forEach((item, index) => {
    const isLast = index === displayItems.length - 1;
    
    if (item.is_ellipsis) {
      html += '      <li class="breadcrumb-item flex items-center">';
      html += '        <span class="breadcrumb-ellipsis text-muted-foreground px-1" aria-hidden="true">...</span>';
      if (!isLast) {
        html += `        <span class="breadcrumb-separator text-muted-foreground px-1" aria-hidden="true">${separator}</span>`;
      }
      html += '      </li>';
    } else {
      html += '      <li class="breadcrumb-item flex items-center">';
      
      if (item.url && (!item.is_current || link_current_page)) {
        html += `        <a href="${item.url}" class="breadcrumb-link"${item.is_current ? ' aria-current="page"' : ''}>${item.title}</a>`;
      } else {
        html += `        <span class="breadcrumb-current"${item.is_current ? ' aria-current="page"' : ''}>${item.title}</span>`;
      }
      
      if (!isLast) {
        html += `        <span class="breadcrumb-separator text-muted-foreground px-1" aria-hidden="true">${separator}</span>`;
      }
      
      html += '      </li>';
    }
  });
  
  html += '    </ol>';
  html += '  </nav>';
  html += '</div>';

  return html;
}

describe('Breadcrumb Component', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  describe('Rendering', () => {
    it('should render breadcrumb navigation with items', () => {
      const breadcrumbHtml = renderBreadcrumb();
      container.innerHTML = breadcrumbHtml;
      
      const nav = container.querySelector('nav[aria-label="Breadcrumb"]');
      expect(nav).toBeInTheDocument();
      expect(nav.getAttribute('role')).toBe('navigation');
      
      const list = nav.querySelector('ol.breadcrumb-list');
      expect(list).toBeInTheDocument();
      
      const items = list.querySelectorAll('li.breadcrumb-item');
      expect(items.length).toBeGreaterThan(0);
    });

    it('should render with custom separator', () => {
      const breadcrumbHtml = renderBreadcrumb({ separator: '>' });
      container.innerHTML = breadcrumbHtml;
      
      const separators = container.querySelectorAll('.breadcrumb-separator');
      separators.forEach(separator => {
        expect(separator.textContent).toBe('>');
      });
    });

    it('should render home link when enabled', () => {
      const breadcrumbHtml = renderBreadcrumb({ 
        show_home: true,
        home_title: 'Home',
        items: [
          { title: 'Services', url: '/services' },
          { title: 'Current Page', url: null, is_current: true }
        ]
      });
      container.innerHTML = breadcrumbHtml;
      
      const homeLink = container.querySelector('a[href="/"]');
      expect(homeLink).toBeInTheDocument();
      expect(homeLink.textContent).toBe('Home');
    });

    it('should not duplicate home link if already in items', () => {
      const breadcrumbHtml = renderBreadcrumb({
        show_home: true,
        home_title: 'Startseite',
        items: [
          { title: 'Startseite', url: '/' },
          { title: 'Services', url: '/services' },
          { title: 'Current', url: null, is_current: true }
        ]
      });
      container.innerHTML = breadcrumbHtml;
      
      const homeLinks = container.querySelectorAll('a[href="/"]');
      expect(homeLinks.length).toBe(1);
    });
  });

  describe('Municipal Portal Features', () => {
    it('should render Canton Zürich service navigation', () => {
      const zurichItems = [
        { title: 'Verwaltung', url: '/administration' },
        { title: 'Dienstleistungen', url: '/administration/services' },
        { title: 'Bewilligungen', url: '/administration/services/permits' },
        { title: 'Baubewilligung', url: null, is_current: true }
      ];
      
      const breadcrumbHtml = renderBreadcrumb({ 
        items: zurichItems,
        separator: '›',
        home_title: 'Kanton Zürich'
      });
      container.innerHTML = breadcrumbHtml;
      
      const currentPage = container.querySelector('[aria-current="page"]');
      expect(currentPage).toBeInTheDocument();
      expect(currentPage.textContent).toBe('Baubewilligung');
      
      const separators = container.querySelectorAll('.breadcrumb-separator');
      separators.forEach(sep => expect(sep.textContent).toBe('›'));
    });

    it('should render French municipal navigation', () => {
      const frenchItems = [
        { title: 'Administration', url: '/administration' },
        { title: 'Services publics', url: '/services' },
        { title: 'État civil', url: null, is_current: true }
      ];
      
      const breadcrumbHtml = renderBreadcrumb({
        items: frenchItems,
        home_title: 'Accueil',
        aria_label: 'Fil d\'Ariane'
      });
      container.innerHTML = breadcrumbHtml;
      
      const nav = container.querySelector('nav');
      expect(nav.getAttribute('aria-label')).toBe('Fil d\'Ariane');
      
      const homeLink = container.querySelector('a[href="/"]');
      expect(homeLink.textContent).toBe('Accueil');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const breadcrumbHtml = renderBreadcrumb();
      container.innerHTML = breadcrumbHtml;
      
      const nav = container.querySelector('nav');
      expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
      expect(nav.getAttribute('role')).toBe('navigation');
      
      const currentPage = container.querySelector('[aria-current="page"]');
      expect(currentPage).toBeInTheDocument();
    });

    it('should render skip link when enabled', () => {
      const breadcrumbHtml = renderBreadcrumb({ 
        skip_link: true,
        skip_link_text: 'Navigation überspringen'
      });
      container.innerHTML = breadcrumbHtml;
      
      const skipLink = container.querySelector('a[href="#main-content"]');
      expect(skipLink).toBeInTheDocument();
      expect(skipLink.textContent).toBe('Navigation überspringen');
      expect(skipLink.classList.contains('sr-only')).toBe(true);
    });

    it('should mark separators as aria-hidden', () => {
      const breadcrumbHtml = renderBreadcrumb();
      container.innerHTML = breadcrumbHtml;
      
      const separators = container.querySelectorAll('.breadcrumb-separator');
      separators.forEach(separator => {
        expect(separator.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('should have focusable links', () => {
      const breadcrumbHtml = renderBreadcrumb();
      container.innerHTML = breadcrumbHtml;
      
      const links = container.querySelectorAll('.breadcrumb-link');
      links.forEach(link => {
        link.focus();
        expect(document.activeElement).toBe(link);
      });
    });
  });

  describe('Mobile Responsiveness', () => {
    it('should truncate long paths on mobile', () => {
      const longPath = [
        { title: 'Level 1', url: '/level1' },
        { title: 'Level 2', url: '/level2' },
        { title: 'Level 3', url: '/level3' },
        { title: 'Level 4', url: '/level4' },
        { title: 'Level 5', url: '/level5' },
        { title: 'Current', url: null, is_current: true }
      ];
      
      const breadcrumbHtml = renderBreadcrumb({
        items: longPath,
        mobile_responsive: true,
        max_mobile_items: 3,
        show_home: false
      });
      container.innerHTML = breadcrumbHtml;
      
      const ellipsis = container.querySelector('.breadcrumb-ellipsis');
      expect(ellipsis).toBeInTheDocument();
      expect(ellipsis.textContent).toBe('...');
      expect(ellipsis.getAttribute('aria-hidden')).toBe('true');
      
      const items = container.querySelectorAll('.breadcrumb-item');
      expect(items.length).toBeLessThanOrEqual(4); // First + ellipsis + last 2
    });

    it('should apply mobile-responsive class when enabled', () => {
      const breadcrumbHtml = renderBreadcrumb({ mobile_responsive: true });
      container.innerHTML = breadcrumbHtml;
      
      const breadcrumb = container.querySelector('.breadcrumb');
      expect(breadcrumb.classList.contains('mobile-responsive')).toBe(true);
    });
  });

  describe('Structured Data', () => {
    it('should generate JSON-LD structured data when enabled', () => {
      const breadcrumbHtml = renderBreadcrumb({ enable_structured_data: true });
      container.innerHTML = breadcrumbHtml;
      
      const script = container.querySelector('script[type="application/ld+json"]');
      expect(script).toBeInTheDocument();
      
      const structuredData = JSON.parse(script.textContent);
      expect(structuredData['@context']).toBe('https://schema.org');
      expect(structuredData['@type']).toBe('BreadcrumbList');
      expect(structuredData.itemListElement).toBeDefined();
      expect(Array.isArray(structuredData.itemListElement)).toBe(true);
    });

    it('should include proper position and item data in structured data', () => {
      const items = [
        { title: 'Home', url: '/' },
        { title: 'Services', url: '/services' },
        { title: 'Current', url: null, is_current: true }
      ];
      
      const breadcrumbHtml = renderBreadcrumb({
        items,
        show_home: false,
        enable_structured_data: true
      });
      container.innerHTML = breadcrumbHtml;
      
      const script = container.querySelector('script[type="application/ld+json"]');
      const data = JSON.parse(script.textContent);
      
      expect(data.itemListElement[0].position).toBe(1);
      expect(data.itemListElement[0].name).toBe('Home');
      expect(data.itemListElement[0].item).toBe('/');
      
      // Current page should not have item URL
      const currentItem = data.itemListElement.find(item => item.name === 'Current');
      expect(currentItem.item).toBeUndefined();
    });

    it('should not generate structured data when disabled', () => {
      const breadcrumbHtml = renderBreadcrumb({ enable_structured_data: false });
      container.innerHTML = breadcrumbHtml;
      
      const script = container.querySelector('script[type="application/ld+json"]');
      expect(script).toBeNull();
    });
  });

  describe('Current Page Handling', () => {
    it('should render current page as span by default', () => {
      const breadcrumbHtml = renderBreadcrumb({
        items: [
          { title: 'Home', url: '/' },
          { title: 'Current Page', url: '/current', is_current: true }
        ],
        show_home: false
      });
      container.innerHTML = breadcrumbHtml;
      
      const current = container.querySelector('[aria-current="page"]');
      expect(current).toBeInTheDocument();
      expect(current.tagName.toLowerCase()).toBe('span');
      expect(current.classList.contains('breadcrumb-current')).toBe(true);
    });

    it('should render current page as link when link_current_page is true', () => {
      const breadcrumbHtml = renderBreadcrumb({
        items: [
          { title: 'Home', url: '/' },
          { title: 'Current Page', url: '/current', is_current: true }
        ],
        show_home: false,
        link_current_page: true
      });
      container.innerHTML = breadcrumbHtml;
      
      const current = container.querySelector('[aria-current="page"]');
      expect(current).toBeInTheDocument();
      expect(current.tagName.toLowerCase()).toBe('a');
      expect(current.getAttribute('href')).toBe('/current');
    });
  });

  describe('CSS Classes', () => {
    it('should apply wrapper classes', () => {
      const breadcrumbHtml = renderBreadcrumb({ 
        wrapper_classes: 'municipal-breadcrumb custom-class' 
      });
      container.innerHTML = breadcrumbHtml;
      
      const breadcrumb = container.querySelector('.breadcrumb');
      expect(breadcrumb.classList.contains('municipal-breadcrumb')).toBe(true);
      expect(breadcrumb.classList.contains('custom-class')).toBe(true);
    });

    it('should have base CSS classes', () => {
      const breadcrumbHtml = renderBreadcrumb();
      container.innerHTML = breadcrumbHtml;
      
      const list = container.querySelector('.breadcrumb-list');
      expect(list.classList.contains('flex')).toBe(true);
      expect(list.classList.contains('flex-wrap')).toBe(true);
      expect(list.classList.contains('items-center')).toBe(true);
      
      const items = container.querySelectorAll('.breadcrumb-item');
      items.forEach(item => {
        expect(item.classList.contains('flex')).toBe(true);
        expect(item.classList.contains('items-center')).toBe(true);
      });
    });
  });

  describe('Integration with Easy Breadcrumb', () => {
    it('should handle Easy Breadcrumb data structure', () => {
      // Simulate data from Easy Breadcrumb module
      const easyBreadcrumbData = [
        { text: 'Startseite', url: '/' },
        { text: 'Verwaltung', url: '/administration' },
        { text: 'Dienstleistungen', url: '/administration/services' },
        { text: 'Aktuelle Seite', url: null } // No URL means current page
      ];
      
      // Convert to SDC format (as done in the template)
      const sdcItems = easyBreadcrumbData.map(item => ({
        title: item.text,
        url: item.url,
        is_current: !item.url
      }));
      
      const breadcrumbHtml = renderBreadcrumb({
        items: sdcItems,
        show_home: false // Easy Breadcrumb already includes home
      });
      container.innerHTML = breadcrumbHtml;
      
      const items = container.querySelectorAll('.breadcrumb-item');
      expect(items.length).toBe(4);
      
      const currentPage = container.querySelector('[aria-current="page"]');
      expect(currentPage.textContent).toBe('Aktuelle Seite');
    });
  });
});