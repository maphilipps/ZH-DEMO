/**
 * Municipal Search Results Enhancement
 * GPZH Gemeinde Bruchtal - Enhanced UX behaviors for search results
 *
 * Features:
 * - Progressive enhancement for search result interactions
 * - Accessibility improvements
 * - Performance optimizations
 * - Analytics tracking preparation
 */

(function (Drupal, drupalSettings, once) {
  'use strict';

  /**
   * Search Results Behavior
   */
  Drupal.behaviors.municipalSearchResults = {
    attach: function (context, settings) {
      // Initialize search results enhancements
      const searchResults = once(
        'municipal-search-results',
        '.search-results',
        context
      );
      searchResults.forEach(function (resultsContainer) {
        new MunicipalSearchResults(resultsContainer);
      });
    },
  };

  /**
   * Municipal Search Results Class
   */
  class MunicipalSearchResults {
    constructor(container) {
      this.container = container;
      this.resultCards = container.querySelectorAll('.search-result-card');
      this.isVisible = true;

      this.init();
    }

    init() {
      this.setupResultCardEnhancements();
      this.setupAccessibilityEnhancements();
      this.setupPerformanceOptimizations();
      this.setupAnalyticsTracking();
      this.announceResults();
    }

    /**
     * Enhanced result card interactions
     */
    setupResultCardEnhancements() {
      this.resultCards.forEach((card, index) => {
        // Add progressive enhancement for relevance score visualization
        const scoreElement = card.querySelector('.relevance-score');
        if (scoreElement) {
          this.enhanceRelevanceScore(scoreElement);
        }

        // Add card interaction tracking
        card.addEventListener('mouseenter', () => {
          this.trackCardInteraction('hover', card, index);
        });

        // Enhanced click handling for analytics
        const resultLink = card.querySelector('.result-link');
        if (resultLink) {
          resultLink.addEventListener('click', e => {
            this.trackResultClick(e, card, index);
          });
        }

        // Tag interaction enhancement
        const tags = card.querySelectorAll('.tag[href]');
        tags.forEach(tag => {
          tag.addEventListener('click', e => {
            this.trackTagClick(e, tag);
          });
        });
      });
    }

    /**
     * Enhanced relevance score with visual progress bar
     */
    enhanceRelevanceScore(scoreElement) {
      const scoreValue = scoreElement.querySelector('.score-value');
      if (scoreValue) {
        const score = parseFloat(scoreValue.textContent) || 0;
        const percentage = Math.min(100, Math.max(0, score * 100));

        // Set CSS custom property for progress bar
        scoreElement.style.setProperty('--score-percentage', `${percentage}%`);

        // Add ARIA attributes for screen readers
        scoreElement.setAttribute(
          'aria-label',
          `Relevance score: ${score.toFixed(2)} out of 1.0`
        );
        scoreElement.setAttribute('role', 'progressbar');
        scoreElement.setAttribute('aria-valuenow', score);
        scoreElement.setAttribute('aria-valuemin', '0');
        scoreElement.setAttribute('aria-valuemax', '1');
      }
    }

    /**
     * Accessibility enhancements
     */
    setupAccessibilityEnhancements() {
      // Announce total results count for screen readers
      const resultsCount = this.container.querySelectorAll(
        '.search-result-card'
      ).length;
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only search-status-live';
      liveRegion.textContent = `${resultsCount} search results found`;
      this.container.insertBefore(liveRegion, this.container.firstChild);

      // Enhanced keyboard navigation
      this.setupKeyboardNavigation();

      // Add skip links for long result lists
      if (resultsCount > 10) {
        this.addSkipLinks();
      }
    }

    /**
     * Keyboard navigation enhancements
     */
    setupKeyboardNavigation() {
      this.resultCards.forEach((card, index) => {
        const resultLink = card.querySelector('.result-link');
        if (resultLink) {
          resultLink.addEventListener('keydown', e => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
              e.preventDefault();
              const nextIndex = e.key === 'ArrowDown' ? index + 1 : index - 1;
              const nextCard = this.resultCards[nextIndex];
              if (nextCard) {
                const nextLink = nextCard.querySelector('.result-link');
                if (nextLink) {
                  nextLink.focus();
                }
              }
            }
          });
        }
      });
    }

    /**
     * Add skip links for better navigation
     */
    addSkipLinks() {
      const skipLink = document.createElement('a');
      skipLink.href = '#search-results-end';
      skipLink.className = 'skip-to-results';
      skipLink.textContent = 'Skip to end of search results';
      this.container.insertBefore(skipLink, this.container.firstChild);

      const endMarker = document.createElement('div');
      endMarker.id = 'search-results-end';
      endMarker.className = 'sr-only';
      endMarker.textContent = 'End of search results';
      this.container.appendChild(endMarker);
    }

    /**
     * Performance optimizations
     */
    setupPerformanceOptimizations() {
      // Lazy load images in result cards if present
      const images = this.container.querySelectorAll('img[data-src]');
      if (images.length > 0 && 'IntersectionObserver' in window) {
        this.setupLazyLoading(images);
      }

      // Optimize scroll performance for long result lists
      this.setupVirtualScrolling();
    }

    /**
     * Lazy loading for images
     */
    setupLazyLoading(images) {
      const imageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              img.classList.add('fade-in');
              observer.unobserve(img);
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.1,
        }
      );

      images.forEach(img => imageObserver.observe(img));
    }

    /**
     * Virtual scrolling for large result sets
     */
    setupVirtualScrolling() {
      if (this.resultCards.length <= 50) return; // Only for large sets

      // Implement basic virtual scrolling to improve performance
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            const card = entry.target;
            if (entry.isIntersecting) {
              card.style.visibility = 'visible';
            } else if (
              entry.boundingClientRect.bottom < 0 ||
              entry.boundingClientRect.top > window.innerHeight + 100
            ) {
              // Hide cards that are far from viewport to improve performance
              card.style.visibility = 'hidden';
            }
          });
        },
        {
          rootMargin: '200px 0px',
          threshold: 0,
        }
      );

      this.resultCards.forEach(card => observer.observe(card));
    }

    /**
     * Analytics tracking setup
     */
    setupAnalyticsTracking() {
      // Track search results view
      this.trackEvent('search_results_viewed', {
        results_count: this.resultCards.length,
        search_query: this.getSearchQuery(),
      });
    }

    /**
     * Track card interactions
     */
    trackCardInteraction(action, card, index) {
      const title = card.querySelector('.result-title')?.textContent?.trim();
      const contentType = card
        .querySelector('.content-type-badge')
        ?.textContent?.trim();

      this.trackEvent('search_result_interaction', {
        action: action,
        position: index + 1,
        title: title,
        content_type: contentType,
      });
    }

    /**
     * Track result clicks
     */
    trackResultClick(event, card, index) {
      const title = card.querySelector('.result-title')?.textContent?.trim();
      const url = event.target.href;
      const contentType = card
        .querySelector('.content-type-badge')
        ?.textContent?.trim();

      this.trackEvent('search_result_clicked', {
        position: index + 1,
        title: title,
        url: url,
        content_type: contentType,
      });
    }

    /**
     * Track tag clicks
     */
    trackTagClick(event, tag) {
      const tagText = tag.textContent?.trim();
      const tagType = tag.classList.contains('tag--category')
        ? 'category'
        : tag.classList.contains('tag--target-group')
          ? 'target-group'
          : 'other';

      this.trackEvent('search_tag_clicked', {
        tag_text: tagText,
        tag_type: tagType,
        tag_url: event.target.href,
      });
    }

    /**
     * Generic event tracking
     */
    trackEvent(eventName, properties = {}) {
      // Prepare for Google Analytics, Matomo, or other analytics systems
      if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
      }

      // Also support custom Drupal analytics
      if (
        Drupal.behaviors.analytics &&
        typeof Drupal.behaviors.analytics.track === 'function'
      ) {
        Drupal.behaviors.analytics.track(eventName, properties);
      }

      // Console log for development
      if (drupalSettings.municipalSearch?.debug) {
        console.log('Municipal Search Event:', eventName, properties);
      }
    }

    /**
     * Announce results for screen readers
     */
    announceResults() {
      const count = this.resultCards.length;
      const liveRegion = this.container.querySelector('.search-status-live');

      if (liveRegion) {
        // Delay announcement to ensure proper screen reader handling
        setTimeout(() => {
          liveRegion.textContent =
            count === 0
              ? 'No search results found'
              : `${count} search result${count !== 1 ? 's' : ''} found`;
        }, 100);
      }
    }

    /**
     * Get current search query from URL or form
     */
    getSearchQuery() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('search') || urlParams.get('keys') || '';
    }

    /**
     * Update results dynamically (for AJAX search)
     */
    updateResults(newResults) {
      // Clear existing results
      this.resultCards.forEach(card => card.remove());

      // Add new results
      if (newResults && newResults.length > 0) {
        newResults.forEach(result => {
          this.container.appendChild(result);
        });

        // Reinitialize with new cards
        this.resultCards = this.container.querySelectorAll(
          '.search-result-card'
        );
        this.init();
      } else {
        this.showEmptyState();
      }

      // Announce update
      this.announceResults();
    }

    /**
     * Show empty state
     */
    showEmptyState() {
      const emptyState = document.createElement('div');
      emptyState.className = 'search-results-empty';
      emptyState.innerHTML = `
        <h3>Keine Ergebnisse gefunden</h3>
        <p>Ihre Suche hat keine Ergebnisse ergeben. Versuchen Sie es mit anderen Suchbegriffen.</p>
        <button type="button" class="btn btn--municipal" onclick="history.back()">
          Zurück zur Suche
        </button>
      `;
      this.container.appendChild(emptyState);
    }

    /**
     * Show loading state
     */
    showLoading() {
      this.container.classList.add('is-loading');
    }

    /**
     * Hide loading state
     */
    hideLoading() {
      this.container.classList.remove('is-loading');
    }
  }

  // Expose class for external use
  window.MunicipalSearchResults = MunicipalSearchResults;

  /**
   * Utility functions for search results
   */
  Drupal.municipalSearch = {
    /**
     * Highlight search terms in results
     */
    highlightTerms: function (content, terms) {
      if (!terms || terms.length === 0) return content;

      let highlightedContent = content;
      terms.forEach(term => {
        const regex = new RegExp(`(${term})`, 'gi');
        highlightedContent = highlightedContent.replace(
          regex,
          '<mark>$1</mark>'
        );
      });

      return highlightedContent;
    },

    /**
     * Format relevance score
     */
    formatRelevanceScore: function (score) {
      return (parseFloat(score) || 0).toFixed(2);
    },

    /**
     * Get readable content type label
     */
    getContentTypeLabel: function (contentType) {
      const labels = {
        club: 'Verein',
        business: 'Firma',
        restaurant: 'Gastgewerbe',
        event: 'Veranstaltung',
        news: 'Nachrichten',
        service: 'Dienstleistung',
        infrastructure: 'Infrastruktur',
      };

      return labels[contentType] || contentType;
    },
  };
})(Drupal, drupalSettings, once);
