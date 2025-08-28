/**
 * @file
 * Pager interactive behavior with AJAX loading and history management.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Initialize pager functionality
   * @param {Element} pagerElement - The pager container element
   * @return {void}
   */
  function initializePager(pagerElement) {
    const pagerLinks = pagerElement.querySelectorAll('a[href], [data-page]');
    const contentContainer =
      document.querySelector(
        pagerElement.getAttribute('data-content-target')
      ) ||
      pagerElement
        .closest('.content-with-pager')
        ?.querySelector('.pager-content') ||
      document.querySelector('.content-container');

    const enableAjax = pagerElement.getAttribute('data-ajax') === 'true';
    const updateHistory = pagerElement.getAttribute('data-history') !== 'false';

    if (pagerLinks.length === 0) {
      console.warn('[adesso-pager] No pager links found');
      return;
    }

    // Initialize pager link functionality
    initializePagerLinks(
      pagerLinks,
      pagerElement,
      contentContainer,
      enableAjax,
      updateHistory
    );

    // Initialize keyboard navigation
    initializeKeyboardNavigation(pagerLinks, pagerElement);

    // Initialize infinite scroll if enabled
    const infiniteScroll =
      pagerElement.getAttribute('data-infinite-scroll') === 'true';
    if (infiniteScroll) {
      initializeInfiniteScroll(pagerElement, contentContainer);
    }

    // Initialize history management
    if (updateHistory) {
      initializeHistoryManagement(pagerElement);
    }

    console.log(
      '[adesso-pager] Pager initialized with',
      pagerLinks.length,
      'links'
    );
  }

  /**
   * Initialize pager link functionality
   * @param {NodeList} pagerLinks - Pager link elements
   * @param {Element} pagerElement - Pager container
   * @param {Element} contentContainer - Content container
   * @param {boolean} enableAjax - Whether to enable AJAX loading
   * @param {boolean} updateHistory - Whether to update browser history
   * @return {void}
   */
  function initializePagerLinks(
    pagerLinks,
    pagerElement,
    contentContainer,
    enableAjax,
    updateHistory
  ) {
    pagerLinks.forEach(function (link) {
      // Skip if link is disabled or current page
      if (
        link.classList.contains('disabled') ||
        link.classList.contains('current')
      ) {
        link.setAttribute('aria-disabled', 'true');
        if (link.classList.contains('current')) {
          link.setAttribute('aria-current', 'page');
        }
        return;
      }

      link.addEventListener('click', function (e) {
        if (enableAjax && contentContainer) {
          e.preventDefault();
          loadPageContent(link, pagerElement, contentContainer, updateHistory);
        } else {
          // Track standard page navigation
          trackPagerNavigation(link, 'standard');
        }
      });

      // Enhanced accessibility
      const pageNumber =
        link.getAttribute('data-page') || extractPageFromUrl(link.href);
      if (pageNumber) {
        link.setAttribute('aria-label', `Go to page ${pageNumber}`);
      }
    });
  }

  /**
   * Load page content via AJAX
   * @param {Element} link - Clicked pager link
   * @param {Element} pagerElement - Pager container
   * @param {Element} contentContainer - Content container
   * @param {boolean} updateHistory - Whether to update browser history
   * @return {void}
   */
  function loadPageContent(
    link,
    pagerElement,
    contentContainer,
    updateHistory
  ) {
    const url = link.href;
    const pageNumber =
      link.getAttribute('data-page') || extractPageFromUrl(url);

    // Show loading state
    setLoadingState(pagerElement, contentContainer, true);

    // Track AJAX navigation start
    trackPagerNavigation(link, 'ajax_started', { pageNumber: pageNumber });

    // Fetch content
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.text();
      })
      .then(function (html) {
        // Parse response
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extract new content and pager
        const newContent = doc.querySelector(
          contentContainer.className
            ? `.${contentContainer.className}`
            : contentContainer.tagName
        );
        const newPager = doc.querySelector(
          pagerElement.className
            ? `.${pagerElement.className}`
            : pagerElement.tagName
        );

        if (newContent) {
          // Update content with fade transition
          updateContentWithTransition(contentContainer, newContent.innerHTML);
        }

        if (newPager) {
          // Update pager
          updatePagerWithTransition(pagerElement, newPager.innerHTML);
        }

        // Update browser history
        if (updateHistory) {
          updateBrowserHistory(url, pageNumber);
        }

        // Scroll to content top
        scrollToContent(contentContainer);

        // Track successful navigation
        trackPagerNavigation(link, 'ajax_success', {
          pageNumber: pageNumber,
          url: url
        });

        // Re-initialize pager behaviors on new content
        Drupal.behaviors.adessoPager.attach(document);
      })
      .catch(function (error) {
        console.error('[adesso-pager] AJAX loading failed:', error);

        // Track error
        trackPagerNavigation(link, 'ajax_error', {
          error: error.message,
          pageNumber: pageNumber
        });

        // Fallback to standard navigation
        showErrorMessage(
          pagerElement,
          'Failed to load content. Redirecting...'
        );
        setTimeout(function () {
          window.location.href = url;
        }, 1500);
      })
      .finally(function () {
        setLoadingState(pagerElement, contentContainer, false);
      });
  }

  /**
   * Initialize keyboard navigation
   * @param {NodeList} pagerLinks - Pager link elements
   * @param {Element} pagerElement - Pager container
   * @return {void}
   */
  function initializeKeyboardNavigation(pagerLinks, pagerElement) {
    const activeLinks = Array.from(pagerLinks).filter(
      link =>
        !link.classList.contains('disabled') &&
        !link.classList.contains('current')
    );

    pagerElement.addEventListener('keydown', function (e) {
      const currentIndex = activeLinks.indexOf(document.activeElement);
      let targetIndex;

      switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        if (currentIndex > 0) {
          activeLinks[currentIndex - 1].focus();
        } else {
          activeLinks[activeLinks.length - 1].focus();
        }
        break;

      case 'ArrowRight':
        e.preventDefault();
        if (currentIndex < activeLinks.length - 1) {
          activeLinks[currentIndex + 1].focus();
        } else {
          activeLinks[0].focus();
        }
        break;

      case 'Home':
        e.preventDefault();
        activeLinks[0].focus();
        break;

      case 'End':
        e.preventDefault();
        activeLinks[activeLinks.length - 1].focus();
        break;

      case 'Enter':
      case ' ':
        if (activeLinks.includes(document.activeElement)) {
          e.preventDefault();
          document.activeElement.click();
        }
        break;
      }
    });
  }

  /**
   * Initialize infinite scroll functionality
   * @param {Element} pagerElement - Pager container
   * @param {Element} contentContainer - Content container
   * @return {void}
   */
  function initializeInfiniteScroll(pagerElement, contentContainer) {
    if (!contentContainer) {
      console.warn(
        '[adesso-pager] Content container not found for infinite scroll'
      );
      return;
    }

    const nextLink = pagerElement.querySelector(
      '.pager-next, [data-page-next]'
    );
    if (!nextLink || nextLink.classList.contains('disabled')) {
      return;
    }

    // Create intersection observer for infinite scroll
    const loadingTrigger = document.createElement('div');
    loadingTrigger.className = 'infinite-scroll-trigger';
    loadingTrigger.style.height = '10px';
    contentContainer.appendChild(loadingTrigger);

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (
            entry.isIntersecting &&
            !pagerElement.classList.contains('loading')
          ) {
            const currentNextLink = pagerElement.querySelector(
              '.pager-next, [data-page-next]'
            );
            if (
              currentNextLink &&
              !currentNextLink.classList.contains('disabled')
            ) {
              loadNextPageInfinite(
                currentNextLink,
                pagerElement,
                contentContainer
              );
            }
          }
        });
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1
      }
    );

    observer.observe(loadingTrigger);

    // Store cleanup function
    pagerElement.infiniteScrollCleanup = function () {
      observer.disconnect();
      if (loadingTrigger.parentNode) {
        loadingTrigger.remove();
      }
    };
  }

  /**
   * Load next page for infinite scroll
   * @param {Element} nextLink - Next page link
   * @param {Element} pagerElement - Pager container
   * @param {Element} contentContainer - Content container
   * @return {void}
   */
  function loadNextPageInfinite(nextLink, pagerElement, contentContainer) {
    const url = nextLink.href;

    setLoadingState(pagerElement, contentContainer, true);

    fetch(url, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extract new content items
        const newContentItems = doc.querySelectorAll(
          contentContainer.children[0]?.tagName || '.content-item'
        );
        const newPager = doc.querySelector(
          pagerElement.className
            ? `.${pagerElement.className}`
            : pagerElement.tagName
        );

        // Append new content items
        newContentItems.forEach(function (item, index) {
          setTimeout(function () {
            contentContainer.appendChild(item.cloneNode(true));
          }, index * 100); // Stagger for better UX
        });

        // Update pager
        if (newPager) {
          pagerElement.innerHTML = newPager.innerHTML;

          // Re-initialize infinite scroll for new pager
          const newInfiniteScroll =
            pagerElement.getAttribute('data-infinite-scroll') === 'true';
          if (newInfiniteScroll) {
            setTimeout(function () {
              initializeInfiniteScroll(pagerElement, contentContainer);
            }, 500);
          }
        }

        // Track infinite scroll load
        trackPagerNavigation(nextLink, 'infinite_scroll', {
          itemsLoaded: newContentItems.length
        });
      })
      .catch(function (error) {
        console.error('[adesso-pager] Infinite scroll failed:', error);
        showErrorMessage(pagerElement, 'Failed to load more content.');
      })
      .finally(function () {
        setLoadingState(pagerElement, contentContainer, false);
      });
  }

  /**
   * Initialize browser history management
   * @param {Element} pagerElement - Pager container
   * @return {void}
   */
  function initializeHistoryManagement(pagerElement) {
    window.addEventListener('popstate', function (e) {
      if (e.state && e.state.page) {
        // Handle browser back/forward navigation
        const currentPage = e.state.page;
        const pageLink = pagerElement.querySelector(
          `[data-page="${currentPage}"], [href*="page=${currentPage}"]`
        );

        if (pageLink) {
          pageLink.click();
        } else {
          // Fallback to page reload
          window.location.reload();
        }
      }
    });
  }

  // Utility functions

  /**
   * Set loading state
   * @param {Element} pagerElement - Pager container
   * @param {Element} contentContainer - Content container
   * @param {boolean} isLoading - Loading state
   * @return {void}
   */
  function setLoadingState(pagerElement, contentContainer, isLoading) {
    if (isLoading) {
      pagerElement.classList.add('loading');
      contentContainer.classList.add('loading');

      // Add loading spinner
      if (!pagerElement.querySelector('.loading-spinner')) {
        const spinner = document.createElement('div');
        spinner.className =
          'loading-spinner animate-spin inline-block w-4 h-4 mr-2';
        spinner.innerHTML = '⟳';
        spinner.setAttribute('aria-hidden', 'true');
        pagerElement.appendChild(spinner);
      }

      // Add loading overlay to content
      if (!contentContainer.querySelector('.loading-overlay')) {
        const overlay = document.createElement('div');
        overlay.className =
          'loading-overlay absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center';
        overlay.innerHTML = '<div class="animate-spin text-2xl">⟳</div>';
        overlay.style.position = 'absolute';
        overlay.style.zIndex = '10';
        contentContainer.style.position = 'relative';
        contentContainer.appendChild(overlay);
      }
    } else {
      pagerElement.classList.remove('loading');
      contentContainer.classList.remove('loading');

      // Remove loading elements
      const spinner = pagerElement.querySelector('.loading-spinner');
      if (spinner) {
        spinner.remove();
      }

      const overlay = contentContainer.querySelector('.loading-overlay');
      if (overlay) {
        overlay.remove();
      }
    }
  }

  /**
   * Update content with fade transition
   * @param {Element} container - Content container
   * @param {string} newContent - New content HTML
   * @return {void}
   */
  function updateContentWithTransition(container, newContent) {
    container.style.opacity = '0';
    container.style.transition = 'opacity 0.3s ease';

    setTimeout(function () {
      container.innerHTML = newContent;
      container.style.opacity = '1';

      // Clean up transition after animation
      setTimeout(function () {
        container.style.transition = '';
      }, 300);
    }, 150);
  }

  /**
   * Update pager with transition
   * @param {Element} pagerElement - Pager container
   * @param {string} newPagerHTML - New pager HTML
   * @return {void}
   */
  function updatePagerWithTransition(pagerElement, newPagerHTML) {
    pagerElement.style.opacity = '0.5';
    pagerElement.style.transition = 'opacity 0.2s ease';

    setTimeout(function () {
      pagerElement.innerHTML = newPagerHTML;
      pagerElement.style.opacity = '1';

      setTimeout(function () {
        pagerElement.style.transition = '';
      }, 200);
    }, 100);
  }

  /**
   * Update browser history
   * @param {string} url - New URL
   * @param {string} pageNumber - Page number
   * @return {void}
   */
  function updateBrowserHistory(url, pageNumber) {
    const state = {
      page: pageNumber,
      url: url
    };

    const title = `Page ${pageNumber}`;
    window.history.pushState(state, title, url);
  }

  /**
   * Scroll to content container
   * @param {Element} contentContainer - Content container
   * @return {void}
   */
  function scrollToContent(contentContainer) {
    const offset = 20; // Small offset from top
    const targetPosition =
      contentContainer.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  /**
   * Show error message
   * @param {Element} pagerElement - Pager container
   * @param {string} message - Error message
   * @return {void}
   */
  function showErrorMessage(pagerElement, message) {
    let errorDiv = pagerElement.querySelector('.pager-error');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className =
        'pager-error text-red-600 text-sm mt-2 p-2 bg-red-50 rounded';
      errorDiv.setAttribute('role', 'alert');
      pagerElement.appendChild(errorDiv);
    }

    errorDiv.textContent = message;

    // Auto-hide after 5 seconds
    setTimeout(function () {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  }

  /**
   * Extract page number from URL
   * @param {string} url - URL to parse
   * @return {string|null} Page number
   */
  function extractPageFromUrl(url) {
    const match = url.match(/[?&]page=(\d+)/);
    return match ? match[1] : null;
  }

  /**
   * Track pager navigation events
   * @param {Element} link - Pager link
   * @param {string} action - Action type
   * @param {Object} data - Additional data
   * @return {void}
   */
  function trackPagerNavigation(link, action, data = {}) {
    const trackingData = {
      type: 'pager_' + action,
      linkText: link.textContent.trim(),
      url: link.href,
      ...data,
      timestamp: new Date().toISOString()
    };

    // Send to analytics service if available
    if (typeof window.analytics !== 'undefined' && window.analytics.track) {
      window.analytics.track('Pager ' + action.replace('_', ' '), trackingData);
    }

    // Fallback to console for debugging
    console.log('[adesso-pager] Navigation tracked:', trackingData);
  }

  // Main Drupal behavior
  Drupal.behaviors.adessoPager = {
    attach: function (context) {
      // Find pager elements
      const pagerElements = once(
        'adesso-pager',
        '.pager, [data-pager], .pagination',
        context
      );

      if (pagerElements.length === 0) {
        return;
      }

      console.log('[adesso-pager] Found', pagerElements.length, 'pager(s)');

      pagerElements.forEach(function (pagerElement) {
        initializePager(pagerElement);
      });
    },

    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        // Clean up and reset states
        const pagers = context.querySelectorAll(
          '.pager, [data-pager], .pagination'
        );

        pagers.forEach(function (pager) {
          // Clean up infinite scroll
          if (pager.infiniteScrollCleanup) {
            pager.infiniteScrollCleanup();
            delete pager.infiniteScrollCleanup;
          }

          // Remove loading states
          pager.classList.remove('loading');

          const spinner = pager.querySelector('.loading-spinner');
          if (spinner) {
            spinner.remove();
          }

          const errorMessage = pager.querySelector('.pager-error');
          if (errorMessage) {
            errorMessage.remove();
          }
        });
      }
    }
  };
})(Drupal, once);
