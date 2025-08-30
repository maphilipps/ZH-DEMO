/**
 * @file Site Header component tests - Phase 2.3 Implementation
 * Tests for site header navigation, accessibility, and Swiss municipality branding
 * 
 * Features tested:
 * - Header structure and semantic landmarks
 * - Navigation accessibility and keyboard support
 * - Municipality branding integration
 * - Mobile responsive behavior
 * - Skip links and bypass mechanisms
 * - Search functionality accessibility
 * - Language switcher compliance
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  testAccessibility, 
  testSwissCompliance, 
  testComponent,
  testPerformance
} from '../../tests/utils/test-utils.js';
import { 
  accessibilityTestNavigation,
  accessibilityTestInteractive 
} from '../../tests/utils/accessibility-test-modules.js';
import { 
  MunicipalityThemeTester,
  testComponentAcrossAllMunicipalities 
} from '../../tests/utils/municipality-theme-testing.js';

// Mock site header component rendering
function renderSiteHeader(props = {}) {
  const {
    site_name = 'Gemeinde Portal',
    logo_url = '/logo.svg',
    logo_alt = 'Gemeinde Logo',
    main_menu = [],
    has_search = true,
    search_placeholder = 'Suchen...',
    has_language_switcher = true,
    current_language = 'de',
    available_languages = [
      { code: 'de', name: 'Deutsch', url: '/de' },
      { code: 'fr', name: 'Français', url: '/fr' },
      { code: 'it', name: 'Italiano', url: '/it' }
    ],
    has_user_menu = true,
    user_menu_items = [
      { title: 'Profil', url: '/profil' },
      { title: 'Einstellungen', url: '/einstellungen' },
      { title: 'Abmelden', url: '/abmelden' }
    ],
    municipality = 'thalwil',
    modifier = ''
  } = props;

  const headerId = 'site-header-' + Math.random().toString(36).substr(2, 9);
  const searchId = 'search-' + Math.random().toString(36).substr(2, 9);
  const containerClasses = ['c-site-header', modifier].filter(Boolean).join(' ');
  const municipalityClass = `municipality-${municipality}`;

  // Generate skip links
  const skipLinksHtml = `
    <div class="skip-links sr-only">
      <a href="#main-content" class="skip-link focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded">
        Zum Hauptinhalt springen
      </a>
      <a href="#main-navigation" class="skip-link focus:not-sr-only focus:absolute focus:top-4 focus:left-20 bg-primary text-white px-4 py-2 rounded">
        Zur Navigation springen
      </a>
    </div>
  `;

  // Generate logo/branding
  const brandingHtml = `
    <div class="site-branding flex items-center">
      <a href="/" class="brand-link flex items-center text-decoration-none" aria-label="Startseite">
        <img 
          src="${logo_url}" 
          alt="${logo_alt}" 
          class="site-logo h-12 w-auto mr-3"
          width="120"
          height="48"
        />
        <span class="site-name text-xl font-semibold text-gray-900 hidden sm:block">
          ${site_name}
        </span>
      </a>
    </div>
  `;

  // Generate main menu
  const mainMenuHtml = main_menu.length > 0 ? `
    <nav id="main-navigation" class="main-navigation" role="navigation" aria-label="Hauptmenü">
      <ul class="main-menu flex space-x-6">
        ${main_menu.map((item, index) => `
          <li class="menu-item">
            <a 
              href="${item.url}" 
              class="menu-link text-gray-700 hover:text-primary font-medium transition-colors"
              ${item.current ? 'aria-current="page"' : ''}
            >
              ${item.title}
            </a>
            ${item.submenu ? `
              <button 
                class="submenu-toggle ml-1 p-1 text-gray-500 hover:text-primary" 
                aria-expanded="false" 
                aria-controls="submenu-${index}"
                aria-label="${item.title} Untermenü öffnen"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <ul 
                id="submenu-${index}" 
                class="submenu absolute hidden bg-white shadow-lg border rounded-lg mt-2 py-2 min-w-48"
                role="menu"
              >
                ${item.submenu.map(subitem => `
                  <li role="none">
                    <a 
                      href="${subitem.url}" 
                      class="submenu-link block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary"
                      role="menuitem"
                    >
                      ${subitem.title}
                    </a>
                  </li>
                `).join('')}
              </ul>
            ` : ''}
          </li>
        `).join('')}
      </ul>
    </nav>
  ` : '';

  // Generate search form
  const searchHtml = has_search ? `
    <div class="header-search">
      <form class="search-form flex" role="search" aria-label="Website durchsuchen">
        <label for="${searchId}" class="sr-only">Suchen</label>
        <input 
          type="search"
          id="${searchId}"
          name="search"
          placeholder="${search_placeholder}"
          class="search-input px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          aria-describedby="${searchId}-help"
        />
        <button 
          type="submit" 
          class="search-submit bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
          aria-label="Suche starten"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
        <div id="${searchId}-help" class="sr-only">
          Drücken Sie Enter oder klicken Sie auf die Schaltfläche, um zu suchen
        </div>
      </form>
    </div>
  ` : '';

  // Generate language switcher
  const languageSwitcherHtml = has_language_switcher ? `
    <div class="language-switcher" data-language-switcher>
      <div class="language-selector relative">
        <button 
          class="language-toggle flex items-center text-gray-700 hover:text-primary font-medium"
          aria-expanded="false"
          aria-controls="language-menu"
          aria-label="Sprache wählen"
        >
          ${available_languages.find(lang => lang.code === current_language)?.name || 'Deutsch'}
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <ul 
          id="language-menu" 
          class="language-menu absolute hidden bg-white shadow-lg border rounded-lg mt-2 py-2 min-w-32 right-0"
          role="menu"
        >
          ${available_languages.map(lang => `
            <li role="none">
              <a 
                href="${lang.url}" 
                class="language-link block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary ${lang.code === current_language ? 'font-semibold' : ''}"
                role="menuitem"
                hreflang="${lang.code}"
                ${lang.code === current_language ? 'aria-current="page"' : ''}
              >
                ${lang.name}
              </a>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  ` : '';

  // Generate user menu
  const userMenuHtml = has_user_menu ? `
    <div class="user-menu">
      <div class="user-menu-toggle relative">
        <button 
          class="user-toggle flex items-center text-gray-700 hover:text-primary font-medium"
          aria-expanded="false"
          aria-controls="user-menu-dropdown"
          aria-label="Benutzermenü"
        >
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          Konto
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <ul 
          id="user-menu-dropdown" 
          class="user-menu-list absolute hidden bg-white shadow-lg border rounded-lg mt-2 py-2 min-w-40 right-0"
          role="menu"
        >
          ${user_menu_items.map(item => `
            <li role="none">
              <a 
                href="${item.url}" 
                class="user-menu-link block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary"
                role="menuitem"
              >
                ${item.title}
              </a>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  ` : '';

  // Mobile menu toggle
  const mobileToggleHtml = `
    <div class="mobile-menu-toggle md:hidden">
      <button 
        class="mobile-nav-toggle p-2 text-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
        aria-expanded="false"
        aria-controls="mobile-navigation"
        aria-label="Mobilmenü öffnen"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>
  `;

  return `
    ${skipLinksHtml}
    <header id="${headerId}" class="${containerClasses} ${municipalityClass} bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50" data-component="site-header">
      <div class="header-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="header-content flex items-center justify-between h-16">
          
          <!-- Left Section: Branding -->
          <div class="header-left flex items-center flex-shrink-0">
            ${brandingHtml}
          </div>
          
          <!-- Center Section: Main Navigation (Desktop) -->
          <div class="header-center hidden md:flex flex-1 justify-center">
            ${mainMenuHtml}
          </div>
          
          <!-- Right Section: Search, Language, User Menu -->
          <div class="header-right flex items-center space-x-4 flex-shrink-0">
            ${searchHtml}
            ${languageSwitcherHtml}
            ${userMenuHtml}
            ${mobileToggleHtml}
          </div>
          
        </div>
        
        <!-- Mobile Navigation -->
        <div id="mobile-navigation" class="mobile-nav md:hidden hidden border-t border-gray-200 py-4">
          <nav class="mobile-menu" role="navigation" aria-label="Mobilmenü">
            <ul class="mobile-menu-list space-y-2">
              ${main_menu.map(item => `
                <li class="mobile-menu-item">
                  <a 
                    href="${item.url}" 
                    class="mobile-menu-link block py-2 px-4 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    ${item.current ? 'aria-current="page"' : ''}
                  >
                    ${item.title}
                  </a>
                </li>
              `).join('')}
            </ul>
          </nav>
        </div>
        
      </div>
    </header>
  `;
}

describe('Site Header Component - Phase 2.3 Comprehensive Testing', () => {
  let container;
  let headerElement;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  describe('Basic Structure and Semantic Markup', () => {
    it('should render with proper header landmark', () => {
      const headerHtml = renderSiteHeader({
        site_name: 'Test Municipality',
        main_menu: [
          { title: 'Home', url: '/', current: true },
          { title: 'Services', url: '/services' }
        ]
      });
      container.innerHTML = headerHtml;
      
      const header = container.querySelector('header');
      const navigation = container.querySelector('[role="navigation"]');
      
      expect(header).toBeInTheDocument();
      expect(header.getAttribute('data-component')).toBe('site-header');
      expect(navigation).toBeInTheDocument();
    });

    it('should include skip links for accessibility', () => {
      const headerHtml = renderSiteHeader();
      container.innerHTML = headerHtml;
      
      const skipLinks = container.querySelectorAll('.skip-link');
      
      expect(skipLinks).toHaveLength(2);
      expect(skipLinks[0].getAttribute('href')).toBe('#main-content');
      expect(skipLinks[1].getAttribute('href')).toBe('#main-navigation');
      expect(skipLinks[0].textContent.trim()).toBe('Zum Hauptinhalt springen');
    });

    it('should apply municipality theme classes', () => {
      const headerHtml = renderSiteHeader({ municipality: 'erlenbach' });
      container.innerHTML = headerHtml;
      
      const header = container.querySelector('.c-site-header');
      expect(header.className).toContain('municipality-erlenbach');
    });

    it('should be a sticky header with proper z-index', () => {
      const headerHtml = renderSiteHeader();
      container.innerHTML = headerHtml;
      
      const header = container.querySelector('header');
      expect(header.className).toContain('sticky');
      expect(header.className).toContain('top-0');
      expect(header.className).toContain('z-50');
    });
  });

  describe('Branding and Logo Accessibility', () => {
    it('should render logo with proper accessibility attributes', () => {
      const headerHtml = renderSiteHeader({
        site_name: 'Gemeinde Thalwil',
        logo_url: '/assets/thalwil-logo.svg',
        logo_alt: 'Gemeinde Thalwil Logo'
      });
      container.innerHTML = headerHtml;
      
      const logo = container.querySelector('.site-logo');
      const brandLink = container.querySelector('.brand-link');
      const siteName = container.querySelector('.site-name');
      
      expect(logo).toBeInTheDocument();
      expect(logo.getAttribute('src')).toBe('/assets/thalwil-logo.svg');
      expect(logo.getAttribute('alt')).toBe('Gemeinde Thalwil Logo');
      expect(logo.getAttribute('width')).toBe('120');
      expect(logo.getAttribute('height')).toBe('48');
      expect(brandLink.getAttribute('aria-label')).toBe('Startseite');
      expect(siteName.textContent.trim()).toBe('Gemeinde Thalwil');
    });

    it('should hide site name on small screens but keep logo accessible', () => {
      const headerHtml = renderSiteHeader({ site_name: 'Test Site' });
      container.innerHTML = headerHtml;
      
      const siteName = container.querySelector('.site-name');
      expect(siteName.className).toContain('hidden');
      expect(siteName.className).toContain('sm:block');
    });
  });

  describe('Navigation Accessibility and Structure', () => {
    beforeEach(() => {
      const headerHtml = renderSiteHeader({
        main_menu: [
          { 
            title: 'Home', 
            url: '/', 
            current: true 
          },
          { 
            title: 'Services', 
            url: '/services',
            submenu: [
              { title: 'Online Services', url: '/services/online' },
              { title: 'Forms', url: '/services/forms' }
            ]
          },
          { 
            title: 'News', 
            url: '/news' 
          }
        ]
      });
      container.innerHTML = headerHtml;
      headerElement = container.querySelector('.c-site-header');
    });

    it('should pass comprehensive navigation accessibility tests', async () => {
      const navigation = container.querySelector('[role="navigation"]');
      const navResults = await accessibilityTestNavigation.testNavigationAccessibility(navigation);
      
      expect(navResults.isAccessible).toBe(true);
      expect(navResults.testResults.landmarks.isValid).toBe(true);
      expect(navResults.violations).toHaveLength(0);
    });

    it('should have proper ARIA attributes for current page', () => {
      const currentLink = container.querySelector('[aria-current="page"]');
      
      expect(currentLink).toBeInTheDocument();
      expect(currentLink.textContent.trim()).toBe('Home');
    });

    it('should handle submenus with proper ARIA controls', () => {
      const submenuToggle = container.querySelector('.submenu-toggle');
      const submenu = container.querySelector('.submenu');
      
      expect(submenuToggle).toBeInTheDocument();
      expect(submenuToggle.getAttribute('aria-expanded')).toBe('false');
      expect(submenuToggle.getAttribute('aria-controls')).toBeTruthy();
      expect(submenu.getAttribute('role')).toBe('menu');
      
      const submenuLinks = submenu.querySelectorAll('[role="menuitem"]');
      expect(submenuLinks).toHaveLength(2);
    });

    it('should have accessible submenu toggle labels', () => {
      const submenuToggle = container.querySelector('.submenu-toggle');
      
      expect(submenuToggle.getAttribute('aria-label')).toContain('Untermenü öffnen');
    });
  });

  describe('Search Functionality Accessibility', () => {
    beforeEach(() => {
      const headerHtml = renderSiteHeader({
        has_search: true,
        search_placeholder: 'Website durchsuchen...'
      });
      container.innerHTML = headerHtml;
    });

    it('should have proper search form structure', () => {
      const searchForm = container.querySelector('.search-form');
      const searchInput = container.querySelector('.search-input');
      const searchSubmit = container.querySelector('.search-submit');
      
      expect(searchForm.getAttribute('role')).toBe('search');
      expect(searchForm.getAttribute('aria-label')).toBe('Website durchsuchen');
      expect(searchInput.getAttribute('type')).toBe('search');
      expect(searchSubmit.getAttribute('aria-label')).toBe('Suche starten');
    });

    it('should have proper labeling and help text', () => {
      const searchInput = container.querySelector('.search-input');
      const label = container.querySelector(`label[for="${searchInput.id}"]`);
      const helpText = container.querySelector(`#${searchInput.id}-help`);
      
      expect(label).toBeInTheDocument();
      expect(label.className).toContain('sr-only');
      expect(helpText).toBeInTheDocument();
      expect(searchInput.getAttribute('aria-describedby')).toContain(helpText.id);
    });

    it('should have accessible search button with icon', () => {
      const searchButton = container.querySelector('.search-submit');
      const searchIcon = searchButton.querySelector('svg');
      
      expect(searchButton.getAttribute('type')).toBe('submit');
      expect(searchIcon).toBeInTheDocument();
      expect(searchButton.getAttribute('aria-label')).toBeTruthy();
    });
  });

  describe('Language Switcher Swiss Compliance', () => {
    beforeEach(() => {
      const headerHtml = renderSiteHeader({
        has_language_switcher: true,
        current_language: 'de',
        available_languages: [
          { code: 'de', name: 'Deutsch', url: '/de' },
          { code: 'fr', name: 'Français', url: '/fr' },
          { code: 'it', name: 'Italiano', url: '/it' }
        ]
      });
      container.innerHTML = headerHtml;
    });

    it('should render all Swiss official languages', () => {
      const languageLinks = container.querySelectorAll('.language-link');
      
      expect(languageLinks).toHaveLength(3);
      
      const languages = Array.from(languageLinks).map(link => link.getAttribute('hreflang'));
      expect(languages).toContain('de');
      expect(languages).toContain('fr');
      expect(languages).toContain('it');
    });

    it('should have proper ARIA attributes for language menu', () => {
      const languageToggle = container.querySelector('.language-toggle');
      const languageMenu = container.querySelector('.language-menu');
      
      expect(languageToggle.getAttribute('aria-expanded')).toBe('false');
      expect(languageToggle.getAttribute('aria-controls')).toBe('language-menu');
      expect(languageMenu.getAttribute('role')).toBe('menu');
    });

    it('should indicate current language properly', () => {
      const currentLanguageLink = container.querySelector('[aria-current="page"]');
      const currentLanguageToggle = container.querySelector('.language-toggle');
      
      expect(currentLanguageLink).toBeInTheDocument();
      expect(currentLanguageLink.className).toContain('font-semibold');
      expect(currentLanguageToggle.textContent.trim()).toContain('Deutsch');
    });

    it('should have proper hreflang attributes', () => {
      const languageLinks = container.querySelectorAll('.language-link');
      
      languageLinks.forEach(link => {
        const hreflang = link.getAttribute('hreflang');
        expect(['de', 'fr', 'it']).toContain(hreflang);
      });
    });
  });

  describe('Mobile Responsive Design', () => {
    beforeEach(() => {
      const headerHtml = renderSiteHeader({
        main_menu: [
          { title: 'Home', url: '/' },
          { title: 'Services', url: '/services' },
          { title: 'News', url: '/news' }
        ]
      });
      container.innerHTML = headerHtml;
      headerElement = container.querySelector('.c-site-header');
    });

    it('should have mobile menu toggle with proper attributes', () => {
      const mobileToggle = container.querySelector('.mobile-nav-toggle');
      const mobileNav = container.querySelector('#mobile-navigation');
      
      expect(mobileToggle).toBeInTheDocument();
      expect(mobileToggle.getAttribute('aria-expanded')).toBe('false');
      expect(mobileToggle.getAttribute('aria-controls')).toBe('mobile-navigation');
      expect(mobileToggle.getAttribute('aria-label')).toBe('Mobilmenü öffnen');
      expect(mobileNav).toBeInTheDocument();
    });

    it('should hide desktop navigation on mobile', () => {
      const desktopNav = container.querySelector('.header-center');
      const mobileToggle = container.querySelector('.mobile-menu-toggle');
      
      expect(desktopNav.className).toContain('hidden');
      expect(desktopNav.className).toContain('md:flex');
      expect(mobileToggle.className).toContain('md:hidden');
    });

    it('should have accessible mobile navigation', () => {
      const mobileNav = container.querySelector('.mobile-nav');
      const mobileNavMenu = mobileNav.querySelector('[role="navigation"]');
      
      expect(mobileNavMenu.getAttribute('aria-label')).toBe('Mobilmenü');
      expect(mobileNav.className).toContain('md:hidden');
    });

    it('should be responsive across different viewport sizes', async () => {
      const responsiveResults = await testComponent.testResponsiveComponent(headerElement);
      
      expect(responsiveResults.mobile.isVisible).toBe(true);
      expect(responsiveResults.tablet.isVisible).toBe(true);
      expect(responsiveResults.desktop.isVisible).toBe(true);
      expect(responsiveResults.mobile.hasOverflow).toBe(false);
    });
  });

  describe('Interactive Elements and Focus Management', () => {
    beforeEach(() => {
      const headerHtml = renderSiteHeader({
        main_menu: [{ title: 'Home', url: '/' }],
        has_search: true,
        has_language_switcher: true,
        has_user_menu: true
      });
      container.innerHTML = headerHtml;
    });

    it('should have accessible interactive elements', async () => {
      const buttons = container.querySelectorAll('button');
      const links = container.querySelectorAll('a');
      const searchInput = container.querySelector('input[type="search"]');
      
      // Test all buttons
      for (const button of buttons) {
        const buttonResults = await accessibilityTestInteractive.testButtonAccessibility(button);
        expect(buttonResults.isValid).toBe(true);
      }
      
      // Test all links
      for (const link of links) {
        const linkResults = await accessibilityTestInteractive.testLinkAccessibility(link);
        expect(linkResults.isValid).toBe(true);
      }
      
      // Test search input focus
      const focusResults = await accessibilityTestInteractive.testFocusManagement(searchInput);
      expect(focusResults.isValid).toBe(true);
    });

    it('should meet touch target size requirements', async () => {
      const interactiveElements = container.querySelectorAll('button, a, input');
      
      for (const element of interactiveElements) {
        const touchResults = await accessibilityTestInteractive.testTouchTargets(element);
        expect(touchResults.isValid).toBe(true);
      }
    });

    it('should handle keyboard navigation properly', async () => {
      const keyboardTest = await testAccessibility.checkKeyboardAccessibility(headerElement);
      
      expect(keyboardTest.isAccessible).toBe(true);
      expect(keyboardTest.focusableCount).toBeGreaterThan(5);
      expect(keyboardTest.issues).toHaveLength(0);
    });
  });

  describe('Swiss Government Compliance', () => {
    beforeEach(() => {
      const headerHtml = renderSiteHeader({
        site_name: 'Gemeinde Portal',
        main_menu: [
          { title: 'Startseite', url: '/', current: true },
          { title: 'Dienstleistungen', url: '/dienstleistungen' },
          { title: 'Aktuelles', url: '/aktuelles' }
        ]
      });
      container.innerHTML = headerHtml;
      headerElement = container.querySelector('.c-site-header');
    });

    it('should comply with eCH-0059 accessibility standards', async () => {
      const swissCompliance = await testSwissCompliance.validateECH0059(headerElement);
      
      expect(swissCompliance.isCompliant).toBe(true);
      expect(swissCompliance.violations).toHaveLength(0);
    });

    it('should support multilingual content properly', async () => {
      const multilingualCompliance = await testSwissCompliance.validateMultilingualCompliance(headerElement);
      
      expect(multilingualCompliance.isCompliant).toBe(true);
      expect(multilingualCompliance.textExpansionReady).toBe(true);
    });

    it('should have proper semantic structure', async () => {
      const structureTest = await testAccessibility.checkSemanticStructure(headerElement);
      
      expect(structureTest.isStructurallyValid).toBe(true);
      expect(structureTest.landmarkCount).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Municipality Theme Integration', () => {
    it('should integrate with all municipality themes', async () => {
      const municipalities = ['thalwil', 'thalheim', 'erlenbach'];
      
      for (const municipality of municipalities) {
        const headerHtml = renderSiteHeader({ municipality });
        container.innerHTML = headerHtml;
        const header = container.querySelector('.c-site-header');
        
        const themeTester = new MunicipalityThemeTester(municipality);
        const themeResults = await themeTester.testThemeClassApplication(header);
        
        expect(themeResults.passed).toBe(true);
        expect(themeResults.details.hasThemeClass).toBe(true);
      }
    });

    it('should maintain cross-theme consistency', async () => {
      const headerHtml = renderSiteHeader();
      container.innerHTML = headerHtml;
      const header = container.querySelector('.c-site-header');
      
      const crossThemeResults = await testComponentAcrossAllMunicipalities(header);
      
      expect(crossThemeResults.summary.overallStatus).toBe('PASSED');
      expect(crossThemeResults.summary.passRate).toBeGreaterThan(85);
    });
  });

  describe('Performance and Optimization', () => {
    beforeEach(() => {
      const headerHtml = renderSiteHeader();
      container.innerHTML = headerHtml;
      headerElement = container.querySelector('.c-site-header');
    });

    it('should meet performance rendering requirements', async () => {
      const performanceResults = await testPerformance.measureRenderTime(async () => {
        const headerHtml = renderSiteHeader({
          main_menu: [
            { title: 'Home', url: '/' },
            { title: 'Services', url: '/services' },
            { title: 'News', url: '/news' }
          ]
        });
        container.innerHTML = headerHtml;
      });
      
      expect(performanceResults.isAcceptable).toBe(true);
      expect(performanceResults.renderTime).toBeLessThan(100);
    });

    it('should optimize logo image properly', () => {
      const logo = container.querySelector('.site-logo');
      const imageOptimization = testPerformance.checkImageOptimization(logo);
      
      expect(imageOptimization.hasAlt).toBe(true);
      // Note: Static logos might not need lazy loading in header
    });

    it('should simulate good Core Web Vitals', async () => {
      const coreVitalsResults = await testPerformance.simulateCoreWebVitals(headerElement);
      
      expect(coreVitalsResults.overall.isGood()).toBe(true);
      expect(coreVitalsResults.cls.isGood).toBe(true);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty menu gracefully', () => {
      const headerHtml = renderSiteHeader({ main_menu: [] });
      container.innerHTML = headerHtml;
      
      const navigation = container.querySelector('.main-navigation');
      expect(navigation).not.toBeInTheDocument();
    });

    it('should handle disabled search functionality', () => {
      const headerHtml = renderSiteHeader({ has_search: false });
      container.innerHTML = headerHtml;
      
      expect(container.querySelector('.header-search')).not.toBeInTheDocument();
    });

    it('should handle disabled language switcher', () => {
      const headerHtml = renderSiteHeader({ has_language_switcher: false });
      container.innerHTML = headerHtml;
      
      expect(container.querySelector('.language-switcher')).not.toBeInTheDocument();
    });

    it('should handle missing logo gracefully', () => {
      const headerHtml = renderSiteHeader({ 
        logo_url: '',
        logo_alt: '' 
      });
      container.innerHTML = headerHtml;
      
      const logo = container.querySelector('.site-logo');
      expect(logo.getAttribute('src')).toBe('');
      expect(logo.getAttribute('alt')).toBe('');
    });
  });
});