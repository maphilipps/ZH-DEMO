/**
 * @file
 * Bento Grid component behaviors.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Bento Grid behavior.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches bento grid functionality to relevant elements.
   */
  Drupal.behaviors.bentoGrid = {
    attach: function (context, settings) {
      const bentoGrids = once(
        'bento-grid-processed',
        '[data-bento-grid]',
        context
      );

      bentoGrids.forEach(function (grid) {
        // Initialize any interactive features
        initializeGrid(grid);
      });
    }
  };

  /**
   * Initialize bento grid functionality.
   *
   * @param {HTMLElement} grid - The bento grid container element.
   */
  function initializeGrid(grid) {
    // Add hover effects for grid items
    const gridItems = grid.querySelectorAll('[data-grid-item]');

    gridItems.forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        item.classList.add('hovered');
      });

      item.addEventListener('mouseleave', function () {
        item.classList.remove('hovered');
      });
    });

    // Handle responsive behavior if needed
    handleResponsiveLayout(grid);

    // Initialize code syntax highlighting if present
    initializeCodeHighlighting(grid);
  }

  /**
   * Handle responsive layout adjustments.
   *
   * @param {HTMLElement} grid - The bento grid container element.
   */
  function handleResponsiveLayout(grid) {
    const observer = new ResizeObserver(function (entries) {
      entries.forEach(function (entry) {
        const width = entry.contentRect.width;

        // Add size-based classes for additional styling control
        if (width < 768) {
          grid.classList.add('grid-mobile');
          grid.classList.remove('grid-tablet', 'grid-desktop');
        } else if (width < 1024) {
          grid.classList.add('grid-tablet');
          grid.classList.remove('grid-mobile', 'grid-desktop');
        } else {
          grid.classList.add('grid-desktop');
          grid.classList.remove('grid-mobile', 'grid-tablet');
        }
      });
    });

    observer.observe(grid);
  }

  /**
   * Initialize code syntax highlighting.
   *
   * @param {HTMLElement} grid - The bento grid container element.
   */
  function initializeCodeHighlighting(grid) {
    const codeBlocks = grid.querySelectorAll('pre code');

    codeBlocks.forEach(function (block) {
      // Add basic syntax highlighting classes if a library like Prism.js is available
      if (typeof Prism !== 'undefined') {
        Prism.highlightElement(block);
      }

      // Add copy-to-clipboard functionality
      addCopyButton(block);
    });
  }

  /**
   * Add copy button to code blocks.
   *
   * @param {HTMLElement} codeBlock - The code block element.
   */
  function addCopyButton(codeBlock) {
    const button = document.createElement('button');
    button.className =
      'code-copy-btn absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');

    button.addEventListener('click', function () {
      navigator.clipboard
        .writeText(codeBlock.textContent)
        .then(function () {
          button.textContent = 'Copied!';
          setTimeout(function () {
            button.textContent = 'Copy';
          }, 2000);
        })
        .catch(function () {
          // Fallback for older browsers
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(codeBlock);
          selection.removeAllRanges();
          selection.addRange(range);
          document.execCommand('copy');
          selection.removeAllRanges();

          button.textContent = 'Copied!';
          setTimeout(function () {
            button.textContent = 'Copy';
          }, 2000);
        });
    });

    // Add button to code block container
    const container = codeBlock.closest('.relative');
    if (container) {
      container.classList.add('group');
      container.appendChild(button);
    }
  }
})(Drupal, once);
