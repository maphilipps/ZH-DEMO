/**
 * @file
 * Main menu interactive behavior with dropdown navigation and keyboard support.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Initialize main menu functionality
   * @param {Element} menuElement - The main menu container element
   * @return {void}
   */
  function initializeMainMenu(menuElement) {
    const menuItems = menuElement.querySelectorAll(
      '.menu-item, [data-menu-item]'
    );
    const dropdownToggles = menuElement.querySelectorAll(
      '.dropdown-toggle, [data-dropdown-toggle]'
    );
    const menuToggles = menuElement.querySelectorAll(
      '.menu-toggle, [data-menu-toggle]'
    );

    // Initialize dropdown functionality
    if (dropdownToggles.length > 0) {
      initializeDropdowns(dropdownToggles, menuElement);
    }

    // Initialize mobile menu toggle
    if (menuToggles.length > 0) {
      initializeMobileMenu(menuToggles, menuElement);
    }

    // Initialize keyboard navigation
    initializeKeyboardNavigation(menuItems, menuElement);

    // Initialize responsive behavior
    initializeResponsiveBehavior(menuElement);

    console.log(
      '[adesso-main-menu] Main menu initialized with',
      menuItems.length,
      'items'
    );
  }

  /**
   * Initialize dropdown menu functionality
   * @param {NodeList} dropdownToggles - Dropdown toggle elements
   * @param {Element} menuElement - Menu container
   * @return {void}
   */
  function initializeDropdowns(dropdownToggles, menuElement) {
    dropdownToggles.forEach(function (toggle) {
      const dropdownId =
        toggle.getAttribute('data-dropdown-toggle') ||
        toggle.getAttribute('aria-controls');
      const dropdown = dropdownId
        ? document.getElementById(dropdownId)
        : toggle.nextElementSibling;

      if (!dropdown) {
        console.warn('[adesso-main-menu] Dropdown not found for toggle');
        return;
      }

      // Set up ARIA attributes
      toggle.setAttribute('aria-haspopup', 'menu');
      toggle.setAttribute('aria-expanded', 'false');
      dropdown.setAttribute('role', 'menu');
      dropdown.setAttribute('aria-hidden', 'true');

      // Click handler for dropdown toggle
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const isOpen = toggle.getAttribute('aria-expanded') === 'true';

        // Close all other dropdowns first
        closeAllDropdowns(menuElement, toggle);

        if (!isOpen) {
          openDropdown(toggle, dropdown);
        }
      });

      // Hover behavior for desktop
      const parentItem = toggle.closest('.menu-item, [data-menu-item]');
      if (parentItem) {
        let hoverTimeout;

        parentItem.addEventListener('mouseenter', function () {
          clearTimeout(hoverTimeout);

          // Only open on hover for desktop
          if (window.innerWidth >= 768) {
            openDropdown(toggle, dropdown);
          }
        });

        parentItem.addEventListener('mouseleave', function () {
          clearTimeout(hoverTimeout);
          hoverTimeout = setTimeout(function () {
            if (window.innerWidth >= 768) {
              closeDropdown(toggle, dropdown);
            }
          }, 300);
        });
      }

      // Handle clicks on dropdown items
      const dropdownItems = dropdown.querySelectorAll('a, button');
      dropdownItems.forEach(function (item, index) {
        item.setAttribute('role', 'menuitem');
        item.setAttribute('tabindex', '-1');

        item.addEventListener('click', function () {
          // Close dropdown after selection
          closeDropdown(toggle, dropdown);

          // Return focus to toggle
          toggle.focus();
        });
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function (e) {
      if (!menuElement.contains(e.target)) {
        closeAllDropdowns(menuElement);
      }
    });
  }

  /**
   * Initialize mobile menu functionality
   * @param {NodeList} menuToggles - Mobile menu toggle elements
   * @param {Element} menuElement - Menu container
   * @return {void}
   */
  function initializeMobileMenu(menuToggles, menuElement) {
    menuToggles.forEach(function (toggle) {
      const targetId =
        toggle.getAttribute('data-menu-toggle') ||
        toggle.getAttribute('aria-controls');
      const mobileMenu = targetId
        ? document.getElementById(targetId)
        : menuElement;

      // Set up ARIA attributes
      toggle.setAttribute('aria-expanded', 'false');
      if (targetId) {
        toggle.setAttribute('aria-controls', targetId);
      }

      toggle.addEventListener('click', function (e) {
        e.preventDefault();

        const isOpen = toggle.getAttribute('aria-expanded') === 'true';

        if (isOpen) {
          closeMobileMenu(toggle, mobileMenu);
        } else {
          openMobileMenu(toggle, mobileMenu);
        }
      });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        menuToggles.forEach(function (toggle) {
          const targetId =
            toggle.getAttribute('data-menu-toggle') ||
            toggle.getAttribute('aria-controls');
          const mobileMenu = targetId
            ? document.getElementById(targetId)
            : menuElement;
          closeMobileMenu(toggle, mobileMenu);
        });
      }
    });
  }

  /**
   * Initialize keyboard navigation
   * @param {NodeList} menuItems - Menu item elements
   * @param {Element} menuElement - Menu container
   * @return {void}
   */
  function initializeKeyboardNavigation(menuItems, menuElement) {
    const focusableItems = menuElement.querySelectorAll(
      'a, button, [tabindex="0"]'
    );

    focusableItems.forEach(function (item, index) {
      item.addEventListener('keydown', function (e) {
        let targetIndex;

        switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          targetIndex = (index + 1) % focusableItems.length;
          focusableItems[targetIndex].focus();
          break;

        case 'ArrowLeft':
          e.preventDefault();
          targetIndex = index === 0 ? focusableItems.length - 1 : index - 1;
          focusableItems[targetIndex].focus();
          break;

        case 'ArrowDown':
          e.preventDefault();
          // Handle dropdown navigation
          const dropdown = item.getAttribute('aria-controls');
          if (dropdown) {
            const dropdownElement = document.getElementById(dropdown);
            if (
              dropdownElement &&
                item.getAttribute('aria-expanded') === 'true'
            ) {
              const firstDropdownItem =
                  dropdownElement.querySelector('a, button');
              if (firstDropdownItem) {
                firstDropdownItem.focus();
              }
            }
          }
          break;

        case 'ArrowUp':
          e.preventDefault();
          // Navigate up in dropdown or close dropdown
          const parentDropdown = item.closest('[role="menu"]');
          if (parentDropdown) {
            const toggle = menuElement.querySelector(
              `[aria-controls="${parentDropdown.id}"]`
            );
            if (toggle) {
              toggle.focus();
              closeDropdown(toggle, parentDropdown);
            }
          }
          break;

        case 'Escape':
          e.preventDefault();
          // Close any open dropdowns and return focus
          const openDropdown = item.closest('[role="menu"]');
          if (openDropdown) {
            const toggle = menuElement.querySelector(
              `[aria-controls="${openDropdown.id}"]`
            );
            if (toggle) {
              closeDropdown(toggle, openDropdown);
              toggle.focus();
            }
          } else {
            // Close mobile menu if open
            const mobileMenuToggle =
                menuElement.querySelector('[data-menu-toggle]');
            if (
              mobileMenuToggle &&
                mobileMenuToggle.getAttribute('aria-expanded') === 'true'
            ) {
              closeMobileMenu(mobileMenuToggle, menuElement);
            }
          }
          break;

        case 'Home':
          e.preventDefault();
          focusableItems[0].focus();
          break;

        case 'End':
          e.preventDefault();
          focusableItems[focusableItems.length - 1].focus();
          break;
        }
      });
    });
  }

  /**
   * Initialize responsive behavior
   * @param {Element} menuElement - Menu container
   * @return {void}
   */
  function initializeResponsiveBehavior(menuElement) {
    let resizeTimeout;

    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        // Close all dropdowns on resize
        closeAllDropdowns(menuElement);

        // Close mobile menu on desktop
        if (window.innerWidth >= 768) {
          const mobileMenuToggle =
            menuElement.querySelector('[data-menu-toggle]');
          if (mobileMenuToggle) {
            closeMobileMenu(mobileMenuToggle, menuElement);
          }
        }
      }, 250);
    }

    window.addEventListener('resize', handleResize);

    // Store cleanup function
    menuElement.resizeCleanup = function () {
      window.removeEventListener('resize', handleResize);
    };
  }

  /**
   * Open dropdown menu
   * @param {Element} toggle - Dropdown toggle element
   * @param {Element} dropdown - Dropdown menu element
   * @return {void}
   */
  function openDropdown(toggle, dropdown) {
    toggle.setAttribute('aria-expanded', 'true');
    dropdown.setAttribute('aria-hidden', 'false');
    dropdown.classList.add('show', 'opacity-100', 'visible');
    dropdown.classList.remove('opacity-0', 'invisible');

    // Set focus to first item
    const firstItem = dropdown.querySelector('a, button');
    if (firstItem) {
      firstItem.setAttribute('tabindex', '0');
    }
  }

  /**
   * Close dropdown menu
   * @param {Element} toggle - Dropdown toggle element
   * @param {Element} dropdown - Dropdown menu element
   * @return {void}
   */
  function closeDropdown(toggle, dropdown) {
    toggle.setAttribute('aria-expanded', 'false');
    dropdown.setAttribute('aria-hidden', 'true');
    dropdown.classList.remove('show', 'opacity-100', 'visible');
    dropdown.classList.add('opacity-0', 'invisible');

    // Reset tabindex for dropdown items
    const items = dropdown.querySelectorAll('a, button');
    items.forEach(function (item) {
      item.setAttribute('tabindex', '-1');
    });
  }

  /**
   * Close all dropdown menus
   * @param {Element} menuElement - Menu container
   * @param {Element} exceptToggle - Toggle to exclude from closing
   * @return {void}
   */
  function closeAllDropdowns(menuElement, exceptToggle) {
    const dropdownToggles = menuElement.querySelectorAll(
      '[aria-expanded="true"]'
    );

    dropdownToggles.forEach(function (toggle) {
      if (toggle !== exceptToggle) {
        const dropdownId = toggle.getAttribute('aria-controls');
        const dropdown = dropdownId
          ? document.getElementById(dropdownId)
          : toggle.nextElementSibling;
        if (dropdown) {
          closeDropdown(toggle, dropdown);
        }
      }
    });
  }

  /**
   * Open mobile menu
   * @param {Element} toggle - Mobile menu toggle
   * @param {Element} menu - Menu element
   * @return {void}
   */
  function openMobileMenu(toggle, menu) {
    toggle.setAttribute('aria-expanded', 'true');
    menu.classList.add('mobile-menu-open');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Update toggle icon
    const icon = toggle.querySelector('.menu-icon');
    if (icon) {
      icon.textContent = '✕';
    }
  }

  /**
   * Close mobile menu
   * @param {Element} toggle - Mobile menu toggle
   * @param {Element} menu - Menu element
   * @return {void}
   */
  function closeMobileMenu(toggle, menu) {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('mobile-menu-open');

    // Restore body scroll
    document.body.style.overflow = '';

    // Update toggle icon
    const icon = toggle.querySelector('.menu-icon');
    if (icon) {
      icon.textContent = '☰';
    }
  }

  // Main Drupal behavior
  Drupal.behaviors.adessoMainMenu = {
    attach: function (context) {
      // Find main menu elements
      const menuElements = once(
        'adesso-main-menu',
        '.main-menu, [data-main-menu], .primary-menu, .navbar',
        context
      );

      if (menuElements.length === 0) {
        return;
      }

      console.log(
        '[adesso-main-menu] Found',
        menuElements.length,
        'main menu(s)'
      );

      menuElements.forEach(function (menuElement) {
        initializeMainMenu(menuElement);
      });
    },

    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        // Clean up event listeners and reset states
        const menus = context.querySelectorAll(
          '.main-menu, [data-main-menu], .primary-menu, .navbar'
        );

        menus.forEach(function (menu) {
          // Clean up resize listener
          if (menu.resizeCleanup) {
            menu.resizeCleanup();
            delete menu.resizeCleanup;
          }

          // Close all dropdowns
          closeAllDropdowns(menu);

          // Close mobile menu
          const mobileToggle = menu.querySelector('[data-menu-toggle]');
          if (mobileToggle) {
            closeMobileMenu(mobileToggle, menu);
          }

          // Restore body scroll
          document.body.style.overflow = '';
        });
      }
    }
  };
})(Drupal, once);
