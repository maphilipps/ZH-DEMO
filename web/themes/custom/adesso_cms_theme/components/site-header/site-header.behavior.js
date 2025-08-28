/**
 * @file
 * Site Header Behavior - Flowbite Integration
 *
 * Provides enhanced functionality for the site header component including:
 * - Dropdown menu initialization
 * - Search functionality
 * - Mobile menu toggle
 * - Keyboard navigation
 * - Accessibility features
 */

(function (Drupal) {
  'use strict';

  /**
   * Announce message to screen readers
   * @param {string} message - The message to announce
   * @returns {void}
   */
  function announceToScreenReader(message) {
    const liveRegion = document.querySelector('#nav-announcements');
    if (liveRegion) {
      liveRegion.textContent = message;
      // Clear the message after a short delay
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }

  /**
   * Close dropdown menu
   * @param {HTMLElement} trigger - The dropdown trigger element
   * @param {HTMLElement} dropdown - The dropdown element
   * @returns {void}
   */
  function closeDropdown(trigger, dropdown) {
    dropdown.classList.add('hidden');
    dropdown.setAttribute('aria-hidden', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    announceToScreenReader('Submenu closed');
  }

  /**
   * Open dropdown menu
   * @param {HTMLElement} trigger - The dropdown trigger element
   * @param {HTMLElement} dropdown - The dropdown element
   * @returns {void}
   */
  function openDropdown(trigger, dropdown) {
    // Close other open dropdowns
    const otherTriggers = document.querySelectorAll(
      '[data-dropdown-toggle][aria-expanded="true"]'
    );
    otherTriggers.forEach(otherTrigger => {
      if (otherTrigger !== trigger) {
        const otherId = otherTrigger.getAttribute('data-dropdown-toggle');
        const otherDropdown = document.querySelector(`#${otherId}`);
        if (otherDropdown) {
          closeDropdown(otherTrigger, otherDropdown);
        }
      }
    });

    // Open this dropdown
    dropdown.classList.remove('hidden');
    dropdown.setAttribute('aria-hidden', 'false');
    trigger.setAttribute('aria-expanded', 'true');

    // Focus first focusable element in dropdown
    const firstFocusable = dropdown.querySelector(
      'a[href], button:not([disabled]), input:not([disabled]), ' +
        '[tabindex]:not([tabindex="-1"])'
    );
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 100);
    }

    announceToScreenReader('Submenu opened');
  }

  /**
   * Toggle dropdown menu
   * @param {HTMLElement} trigger - The dropdown trigger element
   * @param {HTMLElement} dropdown - The dropdown element
   * @returns {void}
   */
  function toggleDropdown(trigger, dropdown) {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      closeDropdown(trigger, dropdown);
    } else {
      openDropdown(trigger, dropdown);
    }
  }

  /**
   * Initialize mobile menu with specific elements
   * @param {HTMLElement} mobileToggle - The mobile toggle button
   * @param {HTMLElement} mobileMenu - The mobile menu element
   * @returns {void}
   */
  function initializeMobileMenuWithElements(mobileToggle, mobileMenu) {
    mobileToggle.addEventListener('click', function () {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        // Close mobile menu
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
        announceToScreenReader('Mobile menu closed');
      } else {
        // Open mobile menu
        mobileMenu.classList.remove('hidden');
        mobileToggle.setAttribute('aria-expanded', 'true');
        announceToScreenReader('Mobile menu opened');
      }
    });

    // Handle keyboard navigation in mobile menu
    mobileMenu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
        announceToScreenReader('Mobile menu closed');
      }
    });
  }

  /**
   * Initialize accessibility features
   * @param {HTMLElement} header - The header element
   * @returns {void}
   */
  function initializeAccessibility(header) {
    // Ensure proper ARIA attributes
    const menuItems = header.querySelectorAll('[role="menuitem"]');
    menuItems.forEach(item => {
      if (!item.getAttribute('tabindex')) {
        item.setAttribute('tabindex', '0');
      }
    });

    // Handle focus management for dropdowns
    const dropdownTriggers = header.querySelectorAll('[data-dropdown-toggle]');
    dropdownTriggers.forEach(trigger => {
      trigger.addEventListener('focus', function () {
        // Announce available actions to screen readers
        const hasSubmenu = trigger.getAttribute('aria-haspopup') === 'true';
        if (hasSubmenu) {
          announceToScreenReader(
            'Menu item with submenu. Press Enter or Space to open.'
          );
        }
      });
    });

    // Initialize live region for announcements
    let liveRegion = header.querySelector('#nav-announcements');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'nav-announcements';
      liveRegion.className = 'sr-only';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      header.appendChild(liveRegion);
    }
  }

  /**
   * Initialize keyboard navigation
   * @param {HTMLElement} header - The header element
   * @returns {void}
   */
  function initializeKeyboardNavigation(header) {
    const focusableElements = header.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), ' +
        'select:not([disabled]), textarea:not([disabled]), ' +
        '[tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
      element.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
          // Handle tab navigation within dropdowns
          const openDropdown = header.querySelector(
            '[data-dropdown-toggle][aria-expanded="true"]'
          );
          if (openDropdown) {
            const dropdownId = openDropdown.getAttribute(
              'data-dropdown-toggle'
            );
            const dropdown = header.querySelector(`#${dropdownId}`);
            if (dropdown && !dropdown.classList.contains('hidden')) {
              const dropdownFocusable = dropdown.querySelectorAll(
                'a[href], button:not([disabled]), input:not([disabled]), ' +
                  '[tabindex]:not([tabindex="-1"])'
              );

              if (dropdownFocusable.length > 0) {
                // Trap focus within dropdown
                if (e.shiftKey) {
                  // Shift + Tab
                  if (document.activeElement === dropdownFocusable[0]) {
                    e.preventDefault();
                    dropdownFocusable[dropdownFocusable.length - 1].focus();
                  }
                } else {
                  // Tab
                  const lastElement =
                    dropdownFocusable[dropdownFocusable.length - 1];
                  if (document.activeElement === lastElement) {
                    e.preventDefault();
                    dropdownFocusable[0].focus();
                  }
                }
              }
            }
          }
        }
      });
    });
  }

  /**
   * Initialize mobile menu functionality
   * @param {HTMLElement} header - The header element
   * @returns {void}
   */
  function initializeMobileMenu(header) {
    const mobileToggle = header.querySelector(
      '[data-collapse-toggle="navbar-main"]'
    );
    const mobileMenu = header.querySelector('#navbar-main');

    // Also try alternative selectors if the primary ones don't exist
    if (!mobileToggle || !mobileMenu) {
      const altMobileToggle = header.querySelector('[data-collapse-toggle]');
      const altMobileMenu = header.querySelector('.lg\\:hidden .w-full');
      if (altMobileToggle && altMobileMenu) {
        return initializeMobileMenuWithElements(altMobileToggle, altMobileMenu);
      }
    }

    if (!mobileToggle || !mobileMenu) {
      return;
    }

    mobileToggle.addEventListener('click', function () {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        // Close mobile menu
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
        announceToScreenReader('Mobile menu closed');
      } else {
        // Open mobile menu
        mobileMenu.classList.remove('hidden');
        mobileToggle.setAttribute('aria-expanded', 'true');
        announceToScreenReader('Mobile menu opened');
      }
    });

    // Handle keyboard navigation in mobile menu
    mobileMenu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
        announceToScreenReader('Mobile menu closed');
      }
    });
  }

  /**
   * Initialize search functionality
   * @param {HTMLElement} header - The header element
   * @returns {void}
   */
  function initializeSearch(header) {
    const searchToggle = header.querySelector('#search-dropdown-toggle');
    const searchDropdown = header.querySelector('#search-dropdown');
    const searchInput = header.querySelector('#search-input');

    if (!searchToggle || !searchDropdown || !searchInput) {
      return;
    }

    // Focus search input when dropdown opens
    searchToggle.addEventListener('click', function () {
      setTimeout(() => {
        if (!searchDropdown.classList.contains('hidden')) {
          searchInput.focus();
        }
      }, 100);
    });

    // Handle search input keyboard events
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeDropdown(searchToggle, searchDropdown);
        searchToggle.focus();
      }
    });

    // Handle search form submission
    const searchForm = searchDropdown.querySelector('form');
    if (searchForm) {
      searchForm.addEventListener('submit', function (e) {
        const query = searchInput.value.trim();
        if (!query) {
          e.preventDefault();
          searchInput.focus();
          return;
        }

        // Allow form to submit normally
        announceToScreenReader('Search submitted for: ' + query);
      });
    }
  }

  /**
   * Initialize dropdown menus
   * @param {HTMLElement} header - The header element
   * @returns {void}
   */
  function initializeDropdowns(header) {
    const dropdownTriggers = header.querySelectorAll('[data-dropdown-toggle]');

    dropdownTriggers.forEach(trigger => {
      const dropdownId = trigger.getAttribute('data-dropdown-toggle');
      const dropdown = header.querySelector(`#${dropdownId}`);

      if (!dropdown) {
        return;
      }

      // Handle click events
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        toggleDropdown(trigger, dropdown);
      });

      // Handle keyboard events
      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleDropdown(trigger, dropdown);
        } else if (e.key === 'Escape') {
          closeDropdown(trigger, dropdown);
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', function (e) {
        if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
          closeDropdown(trigger, dropdown);
        }
      });
    });
  }

  /**
   * Site Header behavior for Flowbite integration
   */
  Drupal.behaviors.siteHeader = {
    attach: function (context) {
      // Initialize only once per page load
      const headers = context.querySelectorAll('header[role="banner"]');

      headers.forEach(header => {
        if (header.dataset.siteHeaderInitialized) {
          return;
        }
        header.dataset.siteHeaderInitialized = 'true';

        // Initialize Flowbite components if available
        if (typeof window.initFlowbite === 'function') {
          window.initFlowbite();
        }

        // Ensure Flowbite dropdowns are initialized
        setTimeout(() => {
          if (typeof window.Flowbite !== 'undefined') {
            const { Dropdown } = window.Flowbite;
            if (Dropdown) {
              // Initialize all dropdowns with Flowbite
              const dropdownElements = header.querySelectorAll(
                '[data-dropdown-toggle]'
              );
              dropdownElements.forEach(triggerEl => {
                const targetId = triggerEl.getAttribute('data-dropdown-toggle');
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                  // Create new Dropdown instance
                  try {
                    new Dropdown(targetEl, triggerEl, {
                      placement:
                        triggerEl.getAttribute('data-dropdown-placement') ||
                        'bottom-start',
                      triggerType: 'click',
                      offsetSkidding: 0,
                      offsetDistance: 4,
                      delay: 0
                    });
                  } catch (e) {
                    console.warn('Failed to initialize Flowbite dropdown:', e);
                  }
                }
              });
            }
          }
        }, 100);

        // Initialize dropdown menus
        initializeDropdowns(header);

        // Initialize search functionality
        initializeSearch(header);

        // Initialize mobile menu
        initializeMobileMenu(header);

        // Initialize keyboard navigation
        initializeKeyboardNavigation(header);

        // Initialize accessibility features
        initializeAccessibility(header);
      });
    }
  };
})(Drupal);
