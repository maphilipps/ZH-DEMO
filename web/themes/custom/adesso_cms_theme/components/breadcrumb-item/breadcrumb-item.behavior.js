/**
 * @file
 * Breadcrumb item component behaviors for enhanced accessibility.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Breadcrumb item component behavior.
   */
  Drupal.behaviors.breadcrumbItem = {
    attach: function (context, settings) {
      // Initialize breadcrumb item components
      once('breadcrumb-item-init', '.breadcrumb-item', context).forEach(function (element) {
        initBreadcrumbItem(element);
      });
    }
  };

  /**
   * Initialize breadcrumb item functionality.
   *
   * @param {HTMLElement} itemElement - The breadcrumb item element.
   */
  function initBreadcrumbItem(itemElement) {
    // Setup link behaviors
    setupLinkBehaviors(itemElement);
    
    // Setup accessibility features
    setupAccessibility(itemElement);
    
    // Handle tooltip functionality if title attribute is present
    setupTooltips(itemElement);
  }

  /**
   * Setup link behaviors for breadcrumb item.
   *
   * @param {HTMLElement} element - The breadcrumb item element.
   */
  function setupLinkBehaviors(element) {
    const link = element.querySelector('.breadcrumb-link');
    
    if (!link) return;

    // Add enhanced focus management
    link.addEventListener('focus', function () {
      // Add visual focus indicator
      element.classList.add('breadcrumb-item--focused');
    });

    link.addEventListener('blur', function () {
      // Remove visual focus indicator
      element.classList.remove('breadcrumb-item--focused');
    });

    // Handle external link indicators
    if (link.getAttribute('target') === '_blank') {
      // Add screen reader text for external links
      const srText = document.createElement('span');
      srText.className = 'sr-only';
      srText.textContent = ' (opens in new window)';
      link.appendChild(srText);

      // Add visual indicator
      link.classList.add('breadcrumb-link--external');
    }
  }

  /**
   * Setup accessibility features.
   *
   * @param {HTMLElement} element - The breadcrumb item element.
   */
  function setupAccessibility(element) {
    const link = element.querySelector('.breadcrumb-link');
    const currentSpan = element.querySelector('.breadcrumb-current');

    // Ensure current page has proper ARIA attributes
    if (currentSpan && !currentSpan.hasAttribute('aria-current')) {
      currentSpan.setAttribute('aria-current', 'page');
    }

    // Add describedby for items with tooltips
    if (link && link.hasAttribute('title')) {
      const tooltipId = 'breadcrumb-tooltip-' + Math.random().toString(36).substr(2, 9);
      link.setAttribute('aria-describedby', tooltipId);
    }

    // Handle abbreviated text expansion
    const abbr = element.querySelector('abbr');
    if (abbr) {
      setupAbbreviation(abbr);
    }
  }

  /**
   * Setup tooltip functionality.
   *
   * @param {HTMLElement} element - The breadcrumb item element.
   */
  function setupTooltips(element) {
    const link = element.querySelector('.breadcrumb-link[title]');
    
    if (!link) return;

    const tooltipText = link.getAttribute('title');
    const tooltipId = link.getAttribute('aria-describedby');
    
    if (!tooltipText || !tooltipId) return;

    // Create hidden tooltip element
    const tooltip = document.createElement('div');
    tooltip.id = tooltipId;
    tooltip.className = 'breadcrumb-tooltip sr-only';
    tooltip.textContent = tooltipText;
    
    element.appendChild(tooltip);

    // Show/hide tooltip on focus and hover
    link.addEventListener('mouseenter', function () {
      showTooltip(tooltip, link);
    });

    link.addEventListener('mouseleave', function () {
      hideTooltip(tooltip);
    });

    link.addEventListener('focus', function () {
      showTooltip(tooltip, link);
    });

    link.addEventListener('blur', function () {
      hideTooltip(tooltip);
    });
  }

  /**
   * Show tooltip.
   *
   * @param {HTMLElement} tooltip - The tooltip element.
   * @param {HTMLElement} trigger - The trigger element.
   */
  function showTooltip(tooltip, trigger) {
    tooltip.classList.remove('sr-only');
    tooltip.classList.add('breadcrumb-tooltip--visible');
    
    // Position tooltip
    positionTooltip(tooltip, trigger);
  }

  /**
   * Hide tooltip.
   *
   * @param {HTMLElement} tooltip - The tooltip element.
   */
  function hideTooltip(tooltip) {
    tooltip.classList.add('sr-only');
    tooltip.classList.remove('breadcrumb-tooltip--visible');
  }

  /**
   * Position tooltip relative to trigger.
   *
   * @param {HTMLElement} tooltip - The tooltip element.
   * @param {HTMLElement} trigger - The trigger element.
   */
  function positionTooltip(tooltip, trigger) {
    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    // Position above the trigger element
    tooltip.style.position = 'absolute';
    tooltip.style.top = (triggerRect.top - tooltipRect.height - 8) + 'px';
    tooltip.style.left = (triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2)) + 'px';
    tooltip.style.zIndex = '1000';
  }

  /**
   * Setup abbreviation expansion.
   *
   * @param {HTMLElement} abbr - The abbreviation element.
   */
  function setupAbbreviation(abbr) {
    if (!abbr.hasAttribute('title')) return;

    // Add button to expand abbreviation
    const expandButton = document.createElement('button');
    expandButton.className = 'breadcrumb-abbr-expand sr-only focus:not-sr-only';
    expandButton.textContent = '(expand)';
    expandButton.setAttribute('aria-label', 'Expand abbreviation: ' + abbr.getAttribute('title'));
    
    abbr.insertAdjacentElement('afterend', expandButton);

    expandButton.addEventListener('click', function () {
      // Replace abbreviation with full text
      const fullText = abbr.getAttribute('title');
      const textNode = document.createTextNode(fullText);
      abbr.parentNode.replaceChild(textNode, abbr);
      expandButton.remove();
    });
  }

  /**
   * Handle dynamic content updates.
   *
   * @param {HTMLElement} element - The breadcrumb item element.
   * @param {Object} newData - New data for the item.
   */
  function updateBreadcrumbItem(element, newData) {
    const link = element.querySelector('.breadcrumb-link');
    const currentSpan = element.querySelector('.breadcrumb-current');
    
    // Update link
    if (link && newData.url) {
      link.href = newData.url;
      if (newData.title) {
        link.textContent = newData.title;
      }
    }
    
    // Update current item
    if (currentSpan && newData.title) {
      currentSpan.textContent = newData.title;
    }
    
    // Re-initialize the item
    initBreadcrumbItem(element);
  }

  // Make utility functions available globally
  Drupal.breadcrumbItem = {
    updateBreadcrumbItem: updateBreadcrumbItem
  };

})(Drupal, once);