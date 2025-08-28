/**
 * @file
 * Card group interactive behavior with filtering and sorting.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Initialize card group functionality
   * @param {Element} cardGroupElement - The card group container element
   * @return {void}
   */
  function initializeCardGroup(cardGroupElement) {
    const cards = cardGroupElement.querySelectorAll('.card-item, [data-card]');
    const filterButtons = cardGroupElement.querySelectorAll('[data-filter]');
    const sortButtons = cardGroupElement.querySelectorAll('[data-sort]');
    const searchInput = cardGroupElement.querySelector('[data-search]');

    if (cards.length === 0) {
      console.warn('[adesso-card-group] No cards found');
      return;
    }

    let currentFilter = 'all';
    let currentSort = 'default';
    let searchTerm = '';

    // Initialize filter functionality
    if (filterButtons.length > 0) {
      filterButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
          e.preventDefault();

          const filterValue = button.getAttribute('data-filter');

          // Update active filter button
          filterButtons.forEach(function (btn) {
            btn.classList.remove('active', 'bg-blue-600', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-700');
            btn.setAttribute('aria-pressed', 'false');
          });

          button.classList.add('active', 'bg-blue-600', 'text-white');
          button.classList.remove('bg-gray-200', 'text-gray-700');
          button.setAttribute('aria-pressed', 'true');

          currentFilter = filterValue;
          applyFiltersAndSort();

          // Announce filter change to screen readers
          announceFilterChange(filterValue, getVisibleCardCount());
        });
      });
    }

    // Initialize sort functionality
    if (sortButtons.length > 0) {
      sortButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
          e.preventDefault();

          const sortValue = button.getAttribute('data-sort');

          // Update active sort button
          sortButtons.forEach(function (btn) {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
          });

          button.classList.add('active');
          button.setAttribute('aria-pressed', 'true');

          currentSort = sortValue;
          applyFiltersAndSort();

          // Announce sort change to screen readers
          announceSortChange(sortValue);
        });
      });
    }

    // Initialize search functionality
    if (searchInput) {
      let searchTimeout;

      searchInput.addEventListener('input', function (e) {
        clearTimeout(searchTimeout);

        // Debounce search for better performance
        searchTimeout = setTimeout(function () {
          searchTerm = e.target.value.toLowerCase().trim();
          applyFiltersAndSort();

          // Announce search results
          announceSearchResults(searchTerm, getVisibleCardCount());
        }, 300);
      });

      // Clear search on Escape key
      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          searchInput.value = '';
          searchTerm = '';
          applyFiltersAndSort();
        }
      });
    }

    /**
     * Apply current filters and sorting
     * @return {void}
     */
    function applyFiltersAndSort() {
      const filteredCards = Array.from(cards).filter(function (card) {
        // Apply category filter
        if (currentFilter !== 'all') {
          const cardCategories = (
            card.getAttribute('data-category') || ''
          ).split(' ');
          if (!cardCategories.includes(currentFilter)) {
            return false;
          }
        }

        // Apply search filter
        if (searchTerm) {
          const cardText = (
            card.textContent ||
            card.getAttribute('data-title') ||
            card.getAttribute('data-description') ||
            ''
          ).toLowerCase();

          if (!cardText.includes(searchTerm)) {
            return false;
          }
        }

        return true;
      });

      // Sort filtered cards
      if (currentSort !== 'default') {
        filteredCards.sort(function (a, b) {
          switch (currentSort) {
          case 'title':
            const titleA = (
              a.getAttribute('data-title') ||
                a.textContent ||
                ''
            ).toLowerCase();
            const titleB = (
              b.getAttribute('data-title') ||
                b.textContent ||
                ''
            ).toLowerCase();
            return titleA.localeCompare(titleB);

          case 'date':
            const dateA = new Date(
              a.getAttribute('data-date') || '1970-01-01'
            );
            const dateB = new Date(
              b.getAttribute('data-date') || '1970-01-01'
            );
            return dateB - dateA; // Newest first

          case 'popularity':
            const popA = parseInt(a.getAttribute('data-popularity') || '0');
            const popB = parseInt(b.getAttribute('data-popularity') || '0');
            return popB - popA; // Highest first

          default:
            return 0;
          }
        });
      }

      // Apply visibility with animation
      cards.forEach(function (card, index) {
        const shouldShow = filteredCards.includes(card);

        if (shouldShow) {
          card.style.display = '';
          card.classList.remove('hidden');

          // Stagger animation for better UX
          setTimeout(function () {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';

          setTimeout(function () {
            card.style.display = 'none';
            card.classList.add('hidden');
          }, 300);
        }
      });

      // Update the DOM order for sorted results
      if (currentSort !== 'default' && filteredCards.length > 0) {
        const container = filteredCards[0].parentNode;
        filteredCards.forEach(function (card) {
          container.appendChild(card);
        });
      }
    }

    /**
     * Get count of currently visible cards
     * @return {number} Number of visible cards
     */
    function getVisibleCardCount() {
      return Array.from(cards).filter(function (card) {
        return (
          card.style.display !== 'none' && !card.classList.contains('hidden')
        );
      }).length;
    }

    /**
     * Announce filter change to screen readers
     * @param {string} filter - Current filter
     * @param {number} count - Number of visible cards
     * @return {void}
     */
    function announceFilterChange(filter, count) {
      const message = `Filtered by ${filter}. Showing ${count} card${count !== 1 ? 's' : ''}.`;
      announceToScreenReader(message);
    }

    /**
     * Announce sort change to screen readers
     * @param {string} sort - Current sort method
     * @return {void}
     */
    function announceSortChange(sort) {
      const message = `Cards sorted by ${sort}.`;
      announceToScreenReader(message);
    }

    /**
     * Announce search results to screen readers
     * @param {string} term - Search term
     * @param {number} count - Number of results
     * @return {void}
     */
    function announceSearchResults(term, count) {
      const message = term
        ? `Search for "${term}" found ${count} result${count !== 1 ? 's' : ''}.`
        : 'Search cleared. Showing all cards.';
      announceToScreenReader(message);
    }

    /**
     * Announce message to screen readers
     * @param {string} message - Message to announce
     * @return {void}
     */
    function announceToScreenReader(message) {
      let liveRegion = cardGroupElement.querySelector('.sr-announcements');
      if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.className = 'sr-only sr-announcements';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        cardGroupElement.appendChild(liveRegion);
      }

      liveRegion.textContent = message;
    }

    // Add CSS transitions for smooth animations
    cards.forEach(function (card) {
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    console.log(
      '[adesso-card-group] Card group initialized with',
      cards.length,
      'cards'
    );
  }

  // Main Drupal behavior
  Drupal.behaviors.adessoCardGroup = {
    attach: function (context) {
      // Find card group containers
      const cardGroupElements = once(
        'adesso-card-group',
        '.card-group, [data-card-group], .cards-container',
        context
      );

      if (cardGroupElements.length === 0) {
        return;
      }

      console.log(
        '[adesso-card-group] Found',
        cardGroupElements.length,
        'card group(s)'
      );

      cardGroupElements.forEach(function (cardGroupElement) {
        initializeCardGroup(cardGroupElement);
      });
    },

    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        // Clean up and reset states
        const cardGroups = context.querySelectorAll(
          '.card-group, [data-card-group], .cards-container'
        );

        cardGroups.forEach(function (cardGroup) {
          const cards = cardGroup.querySelectorAll('.card-item, [data-card]');

          cards.forEach(function (card) {
            // Reset inline styles
            card.style.display = '';
            card.style.opacity = '';
            card.style.transform = '';
            card.style.transition = '';
            card.classList.remove('hidden');
          });

          // Remove live region
          const liveRegion = cardGroup.querySelector('.sr-announcements');
          if (liveRegion) {
            liveRegion.remove();
          }
        });
      }
    }
  };
})(Drupal, once);
