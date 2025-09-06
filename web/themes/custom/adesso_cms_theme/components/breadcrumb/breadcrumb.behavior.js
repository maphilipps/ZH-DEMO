/**
 * @file
 * Breadcrumb component behaviors for enhanced accessibility and municipal portal features.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Breadcrumb component behavior.
   */
  Drupal.behaviors.breadcrumb = {
    attach: function (context, settings) {
      // Initialize breadcrumb components
      once('breadcrumb-init', '.breadcrumb', context).forEach(function (element) {
        initBreadcrumb(element);
      });
    }
  };

  /**
   * Initialize breadcrumb component functionality.
   *
   * @param {HTMLElement} breadcrumbElement - The breadcrumb container element.
   */
  function initBreadcrumb(breadcrumbElement) {
    // Handle keyboard navigation
    setupKeyboardNavigation(breadcrumbElement);
    
    // Setup mobile responsive behavior
    setupMobileResponsive(breadcrumbElement);
    
    // Initialize structured data if needed
    initializeStructuredData(breadcrumbElement);
    
    // Setup accessibility announcements
    setupA11yAnnouncements(breadcrumbElement);
  }

  /**
   * Setup keyboard navigation for breadcrumb.
   *
   * @param {HTMLElement} element - The breadcrumb element.
   */
  function setupKeyboardNavigation(element) {
    const links = element.querySelectorAll('a.breadcrumb-link');
    
    links.forEach(function (link, index) {
      link.addEventListener('keydown', function (event) {
        switch (event.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            event.preventDefault();
            focusNextLink(links, index);
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            event.preventDefault();
            focusPreviousLink(links, index);
            break;
          case 'Home':
            event.preventDefault();
            focusFirstLink(links);
            break;
          case 'End':
            event.preventDefault();
            focusLastLink(links);
            break;
        }
      });
    });
  }

  /**
   * Focus next link in breadcrumb.
   *
   * @param {NodeList} links - All breadcrumb links.
   * @param {number} currentIndex - Current link index.
   */
  function focusNextLink(links, currentIndex) {
    const nextIndex = currentIndex + 1;
    if (nextIndex < links.length) {
      links[nextIndex].focus();
    }
  }

  /**
   * Focus previous link in breadcrumb.
   *
   * @param {NodeList} links - All breadcrumb links.
   * @param {number} currentIndex - Current link index.
   */
  function focusPreviousLink(links, currentIndex) {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      links[prevIndex].focus();
    }
  }

  /**
   * Focus first link in breadcrumb.
   *
   * @param {NodeList} links - All breadcrumb links.
   */
  function focusFirstLink(links) {
    if (links.length > 0) {
      links[0].focus();
    }
  }

  /**
   * Focus last link in breadcrumb.
   *
   * @param {NodeList} links - All breadcrumb links.
   */
  function focusLastLink(links) {
    if (links.length > 0) {
      links[links.length - 1].focus();
    }
  }

  /**
   * Setup mobile responsive behavior.
   *
   * @param {HTMLElement} element - The breadcrumb element.
   */
  function setupMobileResponsive(element) {
    if (!element.classList.contains('mobile-responsive')) {
      return;
    }

    // Handle responsive behavior on resize
    const resizeObserver = new ResizeObserver(function (entries) {
      entries.forEach(function (entry) {
        handleResponsiveLayout(entry.target);
      });
    });

    resizeObserver.observe(element);

    // Initial layout check
    handleResponsiveLayout(element);
  }

  /**
   * Handle responsive layout adjustments.
   *
   * @param {HTMLElement} element - The breadcrumb element.
   */
  function handleResponsiveLayout(element) {
    const container = element.querySelector('.breadcrumb-list');
    if (!container) return;

    const items = container.querySelectorAll('.breadcrumb-item');
    const containerWidth = container.offsetWidth;
    let totalWidth = 0;

    // Calculate if items fit in container
    items.forEach(function (item) {
      totalWidth += item.offsetWidth;
    });

    // Add responsive classes if needed
    if (totalWidth > containerWidth && window.innerWidth < 768) {
      element.classList.add('breadcrumb--mobile-truncated');
    } else {
      element.classList.remove('breadcrumb--mobile-truncated');
    }
  }

  /**
   * Initialize structured data functionality.
   *
   * @param {HTMLElement} element - The breadcrumb element.
   */
  function initializeStructuredData(element) {
    // Check if structured data script exists
    const structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    
    if (structuredDataScript) {
      try {
        const data = JSON.parse(structuredDataScript.textContent);
        
        // Validate structured data
        if (data['@type'] === 'BreadcrumbList' && data.itemListElement) {
          console.log('Breadcrumb structured data loaded successfully');
        }
      } catch (error) {
        console.warn('Failed to parse breadcrumb structured data:', error);
      }
    }
  }

  /**
   * Setup accessibility announcements.
   *
   * @param {HTMLElement} element - The breadcrumb element.
   */
  function setupA11yAnnouncements(element) {
    // Create live region for dynamic announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'breadcrumb-announcements';
    
    element.appendChild(liveRegion);

    // Announce current page when breadcrumb is loaded
    const currentItem = element.querySelector('[aria-current="page"]');
    if (currentItem) {
      setTimeout(function () {
        liveRegion.textContent = 'Current page: ' + currentItem.textContent.trim();
      }, 100);
    }
  }

  /**
   * Utility function to announce text to screen readers.
   *
   * @param {string} text - Text to announce.
   */
  function announceToScreenReader(text) {
    const liveRegion = document.getElementById('breadcrumb-announcements');
    if (liveRegion) {
      liveRegion.textContent = text;
      
      // Clear after announcement
      setTimeout(function () {
        liveRegion.textContent = '';
      }, 1000);
    }
  }

  // Make utility functions available globally if needed
  Drupal.breadcrumb = {
    announceToScreenReader: announceToScreenReader
  };

})(Drupal, once);