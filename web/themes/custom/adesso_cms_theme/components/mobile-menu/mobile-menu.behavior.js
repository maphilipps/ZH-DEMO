/**
 * @file
 * Mobile Menu Toggle Behavior
 * Handles the mobile menu toggle functionality for the hamburger menu
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Mobile Menu Toggle behavior - Flowbite handles this automatically
   * This behavior is kept for any additional custom functionality
   */
  Drupal.behaviors.mobileMenuToggle = {
    attach: function (context, settings) {
      // Flowbite handles data-collapse-toggle automatically
      // This is just for any additional custom functionality
      const toggleButtons = once('mobile-menu-toggle', '[data-collapse-toggle]', context);

      toggleButtons.forEach(function (button) {
        const targetId = button.getAttribute('data-collapse-toggle');
        const targetMenu = document.getElementById(targetId);

        if (targetMenu) {
          // Add custom analytics or other enhancements here
          button.addEventListener('click', function (e) {
            // Announce to screen readers
            const announcement = document.getElementById('nav-announcements');
            if (announcement) {
              setTimeout(() => {
                const isExpanded = !targetMenu.classList.contains('hidden');
                announcement.textContent = isExpanded ?
                  Drupal.t('Menu expanded') :
                  Drupal.t('Menu collapsed');
              }, 100);
            }
          });
        }
      });
    }
  };

  /**
   * Search Dropdown Toggle behavior
   */
  Drupal.behaviors.searchDropdownToggle = {
    attach: function (context, settings) {
      // Find all search dropdown toggle buttons
      const searchButtons = once('search-dropdown-toggle', '[data-dropdown-toggle="search-dropdown"]', context);

      searchButtons.forEach(function (button) {
        const dropdown = document.getElementById('search-dropdown');

        if (dropdown) {
          button.addEventListener('click', function (e) {
            e.preventDefault();

            // Toggle the hidden class
            dropdown.classList.toggle('hidden');

            // Update aria-expanded attribute
            const isExpanded = !dropdown.classList.contains('hidden');
            button.setAttribute('aria-expanded', isExpanded.toString());

            // Focus the search input when opened
            if (isExpanded) {
              const searchInput = dropdown.querySelector('#search-input');
              if (searchInput) {
                setTimeout(() => searchInput.focus(), 100);
              }
            }
          });

          // Close dropdown when clicking outside
          document.addEventListener('click', function (e) {
            if (!button.contains(e.target) && !dropdown.contains(e.target)) {
              dropdown.classList.add('hidden');
              button.setAttribute('aria-expanded', 'false');
            }
          });

          // Close dropdown on escape key
          document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !dropdown.classList.contains('hidden')) {
              dropdown.classList.add('hidden');
              button.setAttribute('aria-expanded', 'false');
              button.focus();
            }
          });
        }
      });
    }
  };

})(Drupal, once);
