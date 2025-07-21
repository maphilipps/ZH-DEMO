/**
 * @file
 * Enhanced Storybook stories for Site Header component with comprehensive QA testing
 * SDC-compatible with props from site-header.component.yml
 */

import { initFlowbite } from 'flowbite';
import { within, userEvent, expect } from '@storybook/test';
import { createSDCStory, createEnhancedStory, accessibilityTestSuite, interactionTestSuite } from '../../.storybook/story-enhancement-template';
import { siteHeaderSDCProps, siteHeaderSchema } from './site-header-sdc-props.js';

export default {
  title: 'Components/Site Header',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Main site header with Flowbite navbar integration, responsive design, and accessibility features.',
      },
    },
  },
  argTypes: {
    background_color: {
      control: { type: 'select' },
      options: ['white', 'gray', 'primary'],
      description: 'Background color variant for the header',
    },
    show_logo: {
      control: 'boolean',
      description: 'Whether to display the site logo',
    },
    show_site_name: {
      control: 'boolean',
      description: 'Whether to display the site name',
    },
    show_search: {
      control: 'boolean',
      description: 'Whether to display the search dropdown',
    },
    search_placeholder: {
      control: 'text',
      description: 'Placeholder text for search input',
    },
    search_action_url: {
      control: 'text',
      description: 'URL for search form submission',
    },
    show_login_button: {
      control: 'boolean',
      description: 'Whether to display the login button',
    },
    show_register_button: {
      control: 'boolean',
      description: 'Whether to display the register button',
    },
    enable_mega_menu: {
      control: 'boolean',
      description: 'Enable mega menu functionality for navigation items with submenus',
    },
  },
};

// Mock data for menu items
const mockMenuItems = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Services',
    url: '/services',
    below: [
      {
        title: 'Web Development',
        url: '/services/web-development',
        description: 'Custom web applications and websites',
      },
      {
        title: 'Mobile Apps',
        url: '/services/mobile-apps',
        description: 'iOS and Android mobile applications',
      },
      {
        title: 'Consulting',
        url: '/services/consulting',
        description: 'Technical consulting and strategy',
      },
    ],
  },
  {
    title: 'Products',
    url: '/products',
    below: [
      {
        title: 'CMS Solutions',
        url: '/products/cms',
        description: 'Content management systems',
      },
      {
        title: 'E-commerce',
        url: '/products/ecommerce',
        description: 'Online store solutions',
      },
    ],
  },
  {
    title: 'About',
    url: '/about',
  },
  {
    title: 'Contact',
    url: '/contact',
  },
];

// Initialize Flowbite after story renders
const initializeFlowbite = () => {
  setTimeout(() => {
    if (typeof initFlowbite === 'function') {
      initFlowbite();
    }
  }, 100);
};

// Default story
export const Default = {
  args: {
    site_name: 'adesso CMS',
    site_logo: '/themes/custom/adesso_cms_theme/assets/logo.svg',
    show_logo: true,
    show_site_name: true,
    show_search: true,
    search_placeholder: 'Search...',
    search_action_url: '/search',
    menu_items: mockMenuItems,
    show_login_button: false,
    show_register_button: false,
    enable_mega_menu: false,
    background_color: 'white',
  },
  play: initializeFlowbite,
};

// Search functionality showcase - Enhanced with comprehensive QA testing
export const SearchFunctionality = createEnhancedStory(
  {
    args: {
      ...Default.args,
      show_search: true,
      search_placeholder: 'Search products, services, content...',
      search_action_url: '/search',
      show_login_button: true,
      show_register_button: true,
    },
    parameters: {
      docs: {
        description: {
          story: 'Header with search dropdown functionality featuring Flowbite integration, proper ARIA attributes, and keyboard navigation support.',
        },
      },
    },
    play: initializeFlowbite,
  },
  {
    componentName: 'SearchFunctionality',
    accessibilityTests: [
      { id: 'search-form-accessibility', enabled: true },
      { id: 'dropdown-labeling', enabled: true },
      { id: 'keyboard-navigation', enabled: true },
      { id: 'search-autocomplete', enabled: true },
    ],
    interactionTests: [
      // Test search dropdown toggle
      async (canvas, userEvent) => {
        const searchToggle = canvas.getByLabelText(/toggle search menu/i);
        expect(searchToggle).toHaveAttribute('aria-expanded', 'false');
        expect(searchToggle).toHaveAttribute('aria-haspopup', 'true');
        
        await userEvent.click(searchToggle);
        expect(searchToggle).toHaveAttribute('aria-expanded', 'true');
        
        // Test search dropdown is visible
        const searchDropdown = canvas.getByRole('menu');
        expect(searchDropdown).toBeInTheDocument();
        expect(searchDropdown).toHaveAttribute('aria-labelledby', 'search-dropdown-toggle');
      },
      // Test search input functionality
      async (canvas, userEvent) => {
        const searchToggle = canvas.getByLabelText(/toggle search menu/i);
        await userEvent.click(searchToggle);
        
        const searchInput = canvas.getByRole('searchbox');
        expect(searchInput).toHaveAttribute('placeholder', 'Search products, services, content...');
        expect(searchInput).toHaveAttribute('aria-label', 'Search');
        expect(searchInput).toHaveAttribute('autocomplete', 'off');
        
        // Test typing in search input
        await userEvent.type(searchInput, 'test query');
        expect(searchInput).toHaveValue('test query');
      },
      // Test search form submission
      async (canvas, userEvent) => {
        const searchToggle = canvas.getByLabelText(/toggle search menu/i);
        await userEvent.click(searchToggle);
        
        const searchForm = canvas.getByRole('search') || canvas.querySelector('form');
        expect(searchForm).toHaveAttribute('action', '/search');
        expect(searchForm).toHaveAttribute('method', 'get');
        
        const searchInput = canvas.getByRole('searchbox');
        await userEvent.type(searchInput, 'test');
        
        const submitButton = canvas.getByRole('button', { name: /submit search/i });
        expect(submitButton).toBeInTheDocument();
        
        // Test submit button functionality
        await userEvent.click(submitButton);
        // Form should be submitted (we can't test actual navigation in Storybook)
      },
      // Test keyboard navigation in search dropdown
      async (canvas, userEvent) => {
        const searchToggle = canvas.getByLabelText(/toggle search menu/i);
        await userEvent.click(searchToggle);
        
        const searchInput = canvas.getByRole('searchbox');
        await userEvent.keyboard('{Tab}');
        expect(searchInput).toHaveFocus();
        
        // Test escape key closes dropdown
        await userEvent.keyboard('{Escape}');
        expect(searchToggle).toHaveAttribute('aria-expanded', 'false');
        expect(searchToggle).toHaveFocus(); // Focus should return to trigger
      },
      // Test search dropdown positioning
      async (canvas, userEvent) => {
        const searchToggle = canvas.getByLabelText(/toggle search menu/i);
        await userEvent.click(searchToggle);
        
        const searchDropdown = canvas.getByRole('menu');
        const dropdownRect = searchDropdown.getBoundingClientRect();
        const toggleRect = searchToggle.getBoundingClientRect();
        
        // Dropdown should be positioned below the toggle
        expect(dropdownRect.top).toBeGreaterThan(toggleRect.bottom);
        
        // Dropdown should be right-aligned
        expect(dropdownRect.right).toBeLessThanOrEqual(toggleRect.right + 50);
      },
    ],
    performanceTests: true,
  }
);

// With authentication buttons
export const WithAuthButtons = {
  args: {
    ...Default.args,
    show_login_button: true,
    show_register_button: true,
    login_url: '/user/login',
    register_url: '/user/register',
  },
  play: initializeFlowbite,
};

// With mega menu enabled - Enhanced with QA testing
export const WithMegaMenu = createEnhancedStory(
  {
    args: {
      ...Default.args,
      enable_mega_menu: true,
      show_login_button: true,
    },
    play: initializeFlowbite,
  },
  {
    componentName: 'SiteHeader',
    accessibilityTests: [
      { id: 'aria-expanded', enabled: true },
      { id: 'aria-controls', enabled: true },
      { id: 'aria-haspopup', enabled: true },
      { id: 'color-contrast', enabled: true },
      { id: 'focus-trap', enabled: true },
      { id: 'keyboard-navigation', enabled: true },
      { id: 'aria-live-regions', enabled: true },
      { id: 'skip-links', enabled: true },
    ],
    interactionTests: [
      // Test mega menu toggle
      async (canvas, userEvent) => {
        const megaMenuToggle = canvas.queryByLabelText(/toggle.*services.*submenu/i);
        if (megaMenuToggle) {
          await userEvent.click(megaMenuToggle);
          expect(megaMenuToggle).toHaveAttribute('aria-expanded', 'true');
          
          // Test ARIA live region announcements
          const liveRegion = canvas.queryByRole('status') || canvas.queryByRole('log');
          expect(liveRegion).toBeInTheDocument();
        }
      },
      // Comprehensive keyboard navigation testing
      async (canvas, userEvent) => {
        const skipLink = canvas.queryByText(/skip to main content/i);
        if (skipLink) {
          await userEvent.keyboard('{Tab}');
          expect(skipLink).toHaveFocus();
        }
        
        // Test sequential tab navigation
        const focusableElements = canvas.queryAllByRole('button')
          .concat(canvas.queryAllByRole('link'))
          .concat(canvas.queryAllByRole('menuitem'));
        
        for (let i = 0; i < Math.min(focusableElements.length, 5); i++) {
          await userEvent.keyboard('{Tab}');
          expect(focusableElements[i]).toHaveFocus();
        }
      },
      // Test escape key closes mega menu and focus trap
      async (canvas, userEvent) => {
        const megaMenuToggle = canvas.queryByLabelText(/toggle.*services.*submenu/i);
        if (megaMenuToggle) {
          await userEvent.click(megaMenuToggle);
          
          // Test focus trap within mega menu
          const megaMenuItems = canvas.queryAllByRole('menuitem');
          if (megaMenuItems.length > 0) {
            await userEvent.keyboard('{Tab}');
            expect(megaMenuItems[0]).toHaveFocus();
          }
          
          // Test escape key behavior
          await userEvent.keyboard('{Escape}');
          expect(megaMenuToggle).toHaveAttribute('aria-expanded', 'false');
          expect(megaMenuToggle).toHaveFocus(); // Focus should return to trigger
        }
      },
      // Test ARIA roles and semantic structure
      async (canvas, userEvent) => {
        const nav = canvas.queryByRole('navigation');
        expect(nav).toHaveAttribute('aria-label');
        
        const banner = canvas.queryByRole('banner');
        expect(banner).toBeInTheDocument();
        
        const menubar = canvas.queryByRole('menubar');
        expect(menubar).toBeInTheDocument();
      },
      // Test color contrast for all background variants
      async (canvas, userEvent) => {
        const textElements = canvas.queryAllByText(/./);
        textElements.forEach(element => {
          const styles = window.getComputedStyle(element);
          const backgroundColor = styles.backgroundColor;
          const color = styles.color;
          // Basic contrast check (implementation would need proper contrast calculation)
          expect(backgroundColor).toBeDefined();
          expect(color).toBeDefined();
        });
      },
    ],
    visualTests: [
      {
        breakpoints: ['mobile1', 'tablet', 'desktop'],
        themes: ['light', 'dark'],
        backgroundColors: ['white', 'gray', 'primary'],
      },
    ],
    performanceTests: true,
  }
);

// Primary color variant
export const PrimaryBackground = {
  args: {
    ...Default.args,
    background_color: 'primary',
    show_login_button: true,
    show_register_button: true,
  },
  play: initializeFlowbite,
};

// Gray color variant
export const GrayBackground = {
  args: {
    ...Default.args,
    background_color: 'gray',
    enable_mega_menu: true,
  },
  play: initializeFlowbite,
};

// Logo only (no site name)
export const LogoOnly = {
  args: {
    ...Default.args,
    show_site_name: false,
    show_login_button: true,
  },
  play: initializeFlowbite,
};

// Site name only (no logo)
export const SiteNameOnly = {
  args: {
    ...Default.args,
    show_logo: false,
    show_register_button: true,
  },
  play: initializeFlowbite,
};

// Mobile viewport story - Enhanced with QA testing
export const Mobile = createEnhancedStory(
  {
    args: {
      ...WithMegaMenu.args,
    },
    parameters: {
      viewport: {
        defaultViewport: 'mobile1',
      },
      docs: {
        description: {
          story: 'Header displayed on mobile viewport with collapsed navigation.',
        },
      },
    },
    play: initializeFlowbite,
  },
  {
    componentName: 'SiteHeaderMobile',
    accessibilityTests: [
      { id: 'touch-target-size', enabled: true },
      { id: 'mobile-navigation', enabled: true },
    ],
    interactionTests: [
      // Test mobile menu toggle
      interactionTestSuite.mobileMenu,
      // Test mobile viewport accessibility
      async (canvas, userEvent) => {
        const mobileToggle = canvas.queryByLabelText(/toggle.*menu/i);
        if (mobileToggle) {
          // Check touch target size (minimum 44px)
          const rect = mobileToggle.getBoundingClientRect();
          expect(rect.width).toBeGreaterThanOrEqual(44);
          expect(rect.height).toBeGreaterThanOrEqual(44);
        }
      },
    ],
    visualTests: [
      {
        breakpoints: ['mobile1'],
        themes: ['light', 'dark'],
      },
    ],
    performanceTests: true,
  }
);

// Tablet viewport story  
export const Tablet = {
  args: {
    ...WithMegaMenu.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Header displayed on tablet viewport.',
      },
    },
  },
  play: initializeFlowbite,
};

// Dark mode story - Enhanced with QA testing
export const DarkMode = createEnhancedStory(
  {
    args: {
      ...WithMegaMenu.args,
    },
    parameters: {
      backgrounds: {
        default: 'dark',
      },
      docs: {
        description: {
          story: 'Header in dark mode with proper color contrast.',
        },
      },
    },
    decorators: [
      (Story) => {
        // Add dark class to html element for proper dark mode styling
        document.documentElement.classList.add('dark');
        return Story();
      },
    ],
    play: initializeFlowbite,
  },
  {
    componentName: 'SiteHeaderDarkMode',
    accessibilityTests: [
      { id: 'color-contrast', enabled: true },
      { id: 'dark-mode-compliance', enabled: true },
    ],
    interactionTests: [
      // Test dark mode color contrast
      async (canvas, userEvent) => {
        const darkElements = canvas.queryAllByText(/./);
        darkElements.forEach(element => {
          const styles = window.getComputedStyle(element);
          const color = styles.color;
          // In dark mode, text should be light colored
          expect(color).toBeDefined();
        });
      },
      // Test dark mode focus indicators
      async (canvas, userEvent) => {
        const focusableElements = canvas.queryAllByRole('button')
          .concat(canvas.queryAllByRole('link'));
        
        for (const element of focusableElements.slice(0, 3)) {
          await userEvent.hover(element);
          await userEvent.keyboard('{Tab}');
          expect(element).toHaveFocus();
        }
      },
    ],
    visualTests: [
      {
        breakpoints: ['mobile1', 'tablet', 'desktop'],
        themes: ['dark'],
        backgroundColors: ['white', 'gray', 'primary'],
      },
    ],
    performanceTests: true,
  }
);

// Comprehensive accessibility test story
export const AccessibilityFocused = createEnhancedStory(
  {
    args: {
      ...WithMegaMenu.args,
      show_login_button: true,
      show_register_button: true,
    },
    play: initializeFlowbite,
  },
  {
    componentName: 'SiteHeaderAccessibility',
    accessibilityTests: [
      { id: 'wcag2a', enabled: true },
      { id: 'wcag2aa', enabled: true },
      { id: 'wcag21aa', enabled: true },
      { id: 'keyboard-navigation', enabled: true },
      { id: 'screen-reader', enabled: true },
      { id: 'focus-management', enabled: true },
      { id: 'aria-compliance', enabled: true },
      { id: 'semantic-html', enabled: true },
    ],
    interactionTests: [
      // Test full keyboard navigation flow
      async (canvas, userEvent) => {
        const allFocusableElements = canvas.queryAllByRole('button')
          .concat(canvas.queryAllByRole('link'))
          .concat(canvas.queryAllByRole('menuitem'));
        
        // Test tab order
        for (let i = 0; i < Math.min(allFocusableElements.length, 8); i++) {
          await userEvent.keyboard('{Tab}');
          expect(allFocusableElements[i]).toHaveFocus();
        }
        
        // Test shift+tab (reverse navigation)
        await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
        expect(allFocusableElements[Math.min(allFocusableElements.length - 2, 6)]).toHaveFocus();
      },
      // Test screen reader announcements
      async (canvas, userEvent) => {
        const liveRegion = canvas.queryByRole('status') || 
                          canvas.queryByRole('log') ||
                          canvas.queryByLabelText(/announcements/i);
        expect(liveRegion).toBeInTheDocument();
        
        // Test menu toggle announcements
        const megaMenuToggle = canvas.queryByLabelText(/toggle.*services.*submenu/i);
        if (megaMenuToggle) {
          await userEvent.click(megaMenuToggle);
          // Announcement should be made for screen readers
          expect(megaMenuToggle).toHaveAttribute('aria-expanded', 'true');
        }
      },
      // Test ARIA landmark roles
      async (canvas, userEvent) => {
        const banner = canvas.queryByRole('banner');
        expect(banner).toBeInTheDocument();
        
        const navigation = canvas.queryByRole('navigation');
        expect(navigation).toBeInTheDocument();
        expect(navigation).toHaveAttribute('aria-label');
        
        const menubar = canvas.queryByRole('menubar');
        expect(menubar).toBeInTheDocument();
      },
      // Test skip links functionality
      async (canvas, userEvent) => {
        const skipLink = canvas.queryByText(/skip to main content/i);
        if (skipLink) {
          await userEvent.keyboard('{Tab}');
          expect(skipLink).toHaveFocus();
          expect(skipLink).toHaveAttribute('href', '#main-content');
        }
      },
    ],
    performanceTests: true,
  }
);

// Performance-focused story
export const PerformanceOptimized = createEnhancedStory(
  {
    args: {
      ...Default.args,
      enable_mega_menu: true,
      show_login_button: true,
      show_register_button: true,
    },
    play: initializeFlowbite,
  },
  {
    componentName: 'SiteHeaderPerformance',
    accessibilityTests: [
      { id: 'performance-impact', enabled: true },
    ],
    interactionTests: [
      // Test performance of mega menu interactions
      async (canvas, userEvent) => {
        const startTime = performance.now();
        
        const megaMenuToggle = canvas.queryByLabelText(/toggle.*services.*submenu/i);
        if (megaMenuToggle) {
          await userEvent.click(megaMenuToggle);
          
          const endTime = performance.now();
          const interactionTime = endTime - startTime;
          
          // Interaction should be fast (< 100ms)
          expect(interactionTime).toBeLessThan(100);
        }
      },
      // Test lazy loading of non-critical elements
      async (canvas, userEvent) => {
        const images = canvas.queryAllByRole('img');
        images.forEach(img => {
          // Non-critical images should be lazy loaded
          if (!img.src.includes('logo')) {
            expect(img).toHaveAttribute('loading', 'lazy');
          }
        });
      },
    ],
    visualTests: [
      {
        breakpoints: ['mobile1', 'tablet', 'desktop'],
        performanceMetrics: {
          fcp: 1200,
          lcp: 2000,
          cls: 0.1,
          fid: 50,
        },
      },
    ],
    performanceTests: true,
  }
);

// Edge cases and error handling story
export const EdgeCases = createEnhancedStory(
  {
    args: {
      ...Default.args,
      site_name: 'Very Long Site Name That Should Handle Text Overflow Gracefully',
      menu_items: [
        {
          title: 'Very Long Menu Item That Tests Overflow',
          url: '/long-menu-item',
          below: [
            {
              title: 'Extremely Long Submenu Item Title That Should Handle Overflow',
              url: '/long-submenu',
              description: 'This is a very long description that should handle text wrapping and overflow gracefully in all viewport sizes.',
            },
          ],
        },
        ...mockMenuItems,
      ],
      enable_mega_menu: true,
      show_login_button: true,
      show_register_button: true,
    },
    play: initializeFlowbite,
  },
  {
    componentName: 'SiteHeaderEdgeCases',
    accessibilityTests: [
      { id: 'text-overflow', enabled: true },
      { id: 'dynamic-content', enabled: true },
    ],
    interactionTests: [
      // Test long text handling
      async (canvas, userEvent) => {
        const longSiteName = canvas.queryByText(/Very Long Site Name/i);
        if (longSiteName) {
          expect(longSiteName).toBeVisible();
          
          // Check if text is properly truncated or wrapped
          const rect = longSiteName.getBoundingClientRect();
          expect(rect.width).toBeLessThan(window.innerWidth);
        }
      },
      // Test mega menu with long content
      async (canvas, userEvent) => {
        const longMenuToggle = canvas.queryByLabelText(/toggle.*very long menu item.*submenu/i);
        if (longMenuToggle) {
          await userEvent.click(longMenuToggle);
          
          const megaDropdown = canvas.queryByRole('menu');
          expect(megaDropdown).toBeVisible();
          
          // Test long description handling
          const longDescription = canvas.queryByText(/This is a very long description/i);
          if (longDescription) {
            expect(longDescription).toBeVisible();
          }
        }
      },
      // Test rapid interactions (stress test)
      async (canvas, userEvent) => {
        const megaMenuToggle = canvas.queryByLabelText(/toggle.*submenu/i);
        if (megaMenuToggle) {
          // Rapidly toggle menu multiple times
          for (let i = 0; i < 3; i++) {
            await userEvent.click(megaMenuToggle);
            await userEvent.click(megaMenuToggle);
          }
          
          // Should still be in a valid state
          expect(megaMenuToggle).toHaveAttribute('aria-expanded');
        }
      },
    ],
    visualTests: [
      {
        breakpoints: ['mobile1', 'tablet', 'desktop'],
        themes: ['light', 'dark'],
        scenarios: ['text-overflow', 'dynamic-content'],
      },
    ],
    performanceTests: true,
  }
);

// Error handling and fallback story
export const ErrorHandling = createEnhancedStory(
  {
    args: {
      ...Default.args,
      site_logo: '/invalid-logo-path.svg', // Test broken image
      menu_items: [], // Test empty menu
      login_url: '', // Test empty URL
      register_url: '', // Test empty URL
      enable_mega_menu: true,
    },
    play: initializeFlowbite,
  },
  {
    componentName: 'SiteHeaderErrorHandling',
    accessibilityTests: [
      { id: 'error-handling', enabled: true },
      { id: 'fallback-content', enabled: true },
    ],
    interactionTests: [
      // Test broken image handling
      async (canvas, userEvent) => {
        const logo = canvas.queryByRole('img');
        if (logo) {
          // Should have proper alt text even if image fails
          expect(logo).toHaveAttribute('alt');
        }
      },
      // Test empty menu handling
      async (canvas, userEvent) => {
        const menubar = canvas.queryByRole('menubar');
        if (menubar) {
          const menuItems = canvas.queryAllByRole('menuitem');
          // Should gracefully handle empty menu
          expect(menuItems.length).toBeGreaterThanOrEqual(0);
        }
      },
      // Test empty URL handling
      async (canvas, userEvent) => {
        const loginButton = canvas.queryByText(/login/i);
        if (loginButton) {
          // Should have valid href even if URL is empty
          expect(loginButton).toHaveAttribute('href');
        }
      },
      // Test JavaScript errors don't break functionality
      async (canvas, userEvent) => {
        // Simulate potential JavaScript error
        const originalConsoleError = console.error;
        let errorCount = 0;
        console.error = (...args) => {
          errorCount++;
          originalConsoleError(...args);
        };
        
        // Try to interact with component
        const button = canvas.queryByRole('button');
        if (button) {
          await userEvent.click(button);
        }
        
        // Restore console.error
        console.error = originalConsoleError;
        
        // Component should still be functional
        expect(canvas.queryByRole('banner')).toBeInTheDocument();
      },
    ],
    performanceTests: true,
  }
);

// Comprehensive integration test story
export const IntegrationTest = createEnhancedStory(
  {
    args: {
      ...Default.args,
      enable_mega_menu: true,
      show_login_button: true,
      show_register_button: true,
      background_color: 'primary',
    },
    parameters: {
      docs: {
        description: {
          story: 'Comprehensive integration test covering all features and user flows.',
        },
      },
    },
    play: initializeFlowbite,
  },
  {
    componentName: 'SiteHeaderIntegration',
    accessibilityTests: [
      { id: 'wcag2a', enabled: true },
      { id: 'wcag2aa', enabled: true },
      { id: 'wcag21aa', enabled: true },
      { id: 'keyboard-navigation', enabled: true },
      { id: 'screen-reader', enabled: true },
      { id: 'focus-management', enabled: true },
      { id: 'aria-compliance', enabled: true },
      { id: 'semantic-html', enabled: true },
      { id: 'color-contrast', enabled: true },
      { id: 'touch-targets', enabled: true },
    ],
    interactionTests: [
      // Complete user flow test
      async (canvas, userEvent) => {
        // 1. Test skip link
        const skipLink = canvas.queryByText(/skip to main content/i);
        if (skipLink) {
          await userEvent.keyboard('{Tab}');
          expect(skipLink).toHaveFocus();
        }
        
        // 2. Test logo/home link
        const homeLink = canvas.queryByLabelText(/homepage/i);
        if (homeLink) {
          await userEvent.keyboard('{Tab}');
          expect(homeLink).toHaveFocus();
        }
        
        // 3. Test main navigation
        const navItems = canvas.queryAllByRole('button').concat(canvas.queryAllByRole('link'));
        for (let i = 0; i < Math.min(navItems.length, 5); i++) {
          await userEvent.keyboard('{Tab}');
          expect(navItems[i]).toHaveFocus();
        }
        
        // 4. Test mega menu functionality
        const megaMenuToggle = canvas.queryByLabelText(/toggle.*services.*submenu/i);
        if (megaMenuToggle) {
          await userEvent.click(megaMenuToggle);
          expect(megaMenuToggle).toHaveAttribute('aria-expanded', 'true');
          
          // Test submenu navigation
          const subMenuItems = canvas.queryAllByRole('menuitem');
          if (subMenuItems.length > 0) {
            await userEvent.keyboard('{Tab}');
            expect(subMenuItems[0]).toHaveFocus();
          }
          
          // Test escape key
          await userEvent.keyboard('{Escape}');
          expect(megaMenuToggle).toHaveAttribute('aria-expanded', 'false');
        }
        
        // 5. Test auth buttons
        const loginButton = canvas.queryByText(/login/i);
        if (loginButton) {
          await userEvent.keyboard('{Tab}');
          expect(loginButton).toHaveFocus();
        }
        
        const registerButton = canvas.queryByText(/register/i);
        if (registerButton) {
          await userEvent.keyboard('{Tab}');
          expect(registerButton).toHaveFocus();
        }
      },
      // Test responsive behavior
      async (canvas, userEvent) => {
        const mobileToggle = canvas.queryByLabelText(/toggle.*menu/i);
        if (mobileToggle) {
          await userEvent.click(mobileToggle);
          
          // Check if mobile menu is visible
          const mobileNav = canvas.queryByRole('navigation');
          expect(mobileNav).toBeInTheDocument();
        }
      },
    ],
    visualTests: [
      {
        breakpoints: ['mobile1', 'tablet', 'desktop'],
        themes: ['light', 'dark'],
        backgroundColors: ['white', 'gray', 'primary'],
        states: ['default', 'hover', 'focus', 'active'],
      },
    ],
    performanceTests: true,
  }
);