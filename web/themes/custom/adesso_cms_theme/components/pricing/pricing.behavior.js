/**
 * @file
 * Pricing interactive behavior with plan comparison and animations.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Initialize pricing functionality
   * @param {Element} pricingElement - The pricing container element
   * @return {void}
   */
  function initializePricing(pricingElement) {
    const pricingCards = pricingElement.querySelectorAll(
      '.pricing-card, [data-pricing-card]'
    );
    const toggleButtons = pricingElement.querySelectorAll(
      '.pricing-toggle, [data-pricing-toggle]'
    );
    const compareButton = pricingElement.querySelector(
      '.compare-plans, [data-compare-plans]'
    );
    const comparisonTable = pricingElement.querySelector(
      '.pricing-comparison, [data-comparison-table]'
    );

    if (pricingCards.length === 0) {
      console.warn('[adesso-pricing] No pricing cards found');
      return;
    }

    // Initialize pricing card interactions
    initializePricingCards(pricingCards, pricingElement);

    // Initialize billing toggle (monthly/yearly)
    if (toggleButtons.length > 0) {
      initializeBillingToggle(toggleButtons, pricingCards, pricingElement);
    }

    // Initialize plan comparison
    if (compareButton && comparisonTable) {
      initializePlanComparison(compareButton, comparisonTable, pricingCards);
    }

    // Initialize pricing animations
    initializePricingAnimations(pricingElement, pricingCards);

    console.log(
      '[adesso-pricing] Pricing initialized with',
      pricingCards.length,
      'plans'
    );
  }

  /**
   * Initialize pricing card interactions
   * @param {NodeList} pricingCards - Pricing card elements
   * @param {Element} pricingElement - Pricing container
   * @return {void}
   */
  function initializePricingCards(pricingCards, pricingElement) {
    pricingCards.forEach(function (card, index) {
      const selectButton = card.querySelector(
        '.select-plan, [data-select-plan]'
      );
      const featuresToggle = card.querySelector(
        '.features-toggle, [data-features-toggle]'
      );
      const featuresContent = card.querySelector(
        '.features-content, [data-features-content]'
      );

      // Initialize plan selection
      if (selectButton) {
        initializePlanSelection(selectButton, card, index);
      }

      // Initialize features toggle
      if (featuresToggle && featuresContent) {
        initializeFeaturesToggle(featuresToggle, featuresContent, card);
      }

      // Add hover effects for desktop
      initializeCardHoverEffects(card);

      // Add keyboard navigation
      initializeCardKeyboardNavigation(card, index, pricingCards);
    });
  }

  /**
   * Initialize plan selection functionality
   * @param {Element} selectButton - Select plan button
   * @param {Element} card - Pricing card
   * @param {number} index - Card index
   * @return {void}
   */
  function initializePlanSelection(selectButton, card, index) {
    const planName =
      card.getAttribute('data-plan-name') ||
      card
        .querySelector('.plan-name, [data-plan-title]')
        ?.textContent?.trim() ||
      `Plan ${index + 1}`;
    const planPrice =
      card.getAttribute('data-plan-price') ||
      card.querySelector('.plan-price, [data-price]')?.textContent?.trim();
    const planBilling = card.getAttribute('data-billing-period') || 'monthly';

    selectButton.addEventListener('click', function (e) {
      // Prevent default if it's a form button
      if (selectButton.type === 'button') {
        e.preventDefault();
      }

      // Add visual feedback
      selectButton.classList.add('animate-pulse');
      setTimeout(function () {
        selectButton.classList.remove('animate-pulse');
      }, 200);

      // Track plan selection
      trackPricingEvent('plan_selected', {
        planName: planName,
        planPrice: planPrice,
        billingPeriod: planBilling,
        cardIndex: index
      });

      // Handle different selection types
      const selectionAction = selectButton.getAttribute('data-action');
      switch (selectionAction) {
      case 'modal':
        openPlanModal(planName, card);
        break;
      case 'checkout':
        redirectToCheckout(planName, planPrice, planBilling);
        break;
      case 'contact':
        openContactForm(planName);
        break;
      default:
        // Default behavior (form submission or link navigation)
        break;
      }
    });

    // Enhanced accessibility
    selectButton.setAttribute('aria-describedby', `plan-${index}-description`);

    // Add plan description for screen readers
    let description = card.querySelector('.plan-description');
    if (!description) {
      description = document.createElement('div');
      description.id = `plan-${index}-description`;
      description.className = 'sr-only';
      description.textContent = `${planName} plan for ${planPrice} per ${planBilling}`;
      card.appendChild(description);
    }
  }

  /**
   * Initialize features toggle functionality
   * @param {Element} toggle - Features toggle button
   * @param {Element} content - Features content
   * @param {Element} card - Pricing card
   * @return {void}
   */
  function initializeFeaturesToggle(toggle, content, card) {
    // Set up ARIA attributes
    const contentId =
      content.id || 'features-' + Math.random().toString(36).substr(2, 9);
    content.id = contentId;
    toggle.setAttribute('aria-controls', contentId);
    toggle.setAttribute('aria-expanded', 'false');
    content.setAttribute('aria-hidden', 'true');

    // Initial state
    content.style.maxHeight = '0px';
    content.style.overflow = 'hidden';
    content.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
    content.style.opacity = '0';

    toggle.addEventListener('click', function (e) {
      e.preventDefault();

      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        // Collapse
        toggle.setAttribute('aria-expanded', 'false');
        content.setAttribute('aria-hidden', 'true');

        content.style.maxHeight = '0px';
        content.style.opacity = '0';

        // Update toggle text
        toggle.textContent =
          toggle.getAttribute('data-show-text') || 'Show Features';
      } else {
        // Expand
        toggle.setAttribute('aria-expanded', 'true');
        content.setAttribute('aria-hidden', 'false');

        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';

        // Update toggle text
        toggle.textContent =
          toggle.getAttribute('data-hide-text') || 'Hide Features';

        // Clean up maxHeight after animation
        setTimeout(function () {
          content.style.maxHeight = 'none';
        }, 300);
      }
    });
  }

  /**
   * Initialize billing toggle (monthly/yearly)
   * @param {NodeList} toggleButtons - Toggle button elements
   * @param {NodeList} pricingCards - Pricing card elements
   * @param {Element} pricingElement - Pricing container
   * @return {void}
   */
  function initializeBillingToggle(
    toggleButtons,
    pricingCards,
    pricingElement
  ) {
    toggleButtons.forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        const isYearly =
          toggle.getAttribute('data-billing') === 'yearly' ||
          toggle.classList.contains('billing-yearly');

        // Update toggle states
        updateToggleStates(toggleButtons, toggle);

        // Update pricing display
        updatePricingDisplay(pricingCards, isYearly);

        // Track billing change
        trackPricingEvent('billing_changed', {
          billingPeriod: isYearly ? 'yearly' : 'monthly'
        });

        // Add visual feedback
        pricingElement.classList.add('prices-updating');
        setTimeout(function () {
          pricingElement.classList.remove('prices-updating');
        }, 500);
      });
    });
  }

  /**
   * Initialize plan comparison functionality
   * @param {Element} compareButton - Compare plans button
   * @param {Element} comparisonTable - Comparison table
   * @param {NodeList} pricingCards - Pricing cards
   * @return {void}
   */
  function initializePlanComparison(
    compareButton,
    comparisonTable,
    pricingCards
  ) {
    let selectedPlans = [];

    // Add selection checkboxes to cards
    pricingCards.forEach(function (card, index) {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'plan-compare-checkbox absolute top-4 right-4';
      checkbox.setAttribute('aria-label', 'Compare this plan');
      checkbox.addEventListener('change', function () {
        updateSelectedPlans(checkbox, card, index);
      });

      card.style.position = 'relative';
      card.appendChild(checkbox);
    });

    function updateSelectedPlans(checkbox, card, index) {
      if (checkbox.checked) {
        selectedPlans.push({ index: index, card: card });
        card.classList.add('selected-for-comparison');
      } else {
        selectedPlans = selectedPlans.filter(plan => plan.index !== index);
        card.classList.remove('selected-for-comparison');
      }

      // Update compare button state
      compareButton.disabled = selectedPlans.length < 2;
      compareButton.textContent =
        selectedPlans.length === 0
          ? 'Select Plans to Compare'
          : selectedPlans.length === 1
            ? 'Select Another Plan'
            : `Compare ${selectedPlans.length} Plans`;
    }

    compareButton.addEventListener('click', function (e) {
      e.preventDefault();

      if (selectedPlans.length < 2) {
        showComparisonMessage('Please select at least 2 plans to compare.');
        return;
      }

      showPlanComparison(comparisonTable, selectedPlans);

      // Track comparison
      trackPricingEvent('plans_compared', {
        planCount: selectedPlans.length,
        planIndexes: selectedPlans.map(plan => plan.index)
      });
    });
  }

  /**
   * Initialize pricing animations
   * @param {Element} pricingElement - Pricing container
   * @param {NodeList} pricingCards - Pricing cards
   * @return {void}
   */
  function initializePricingAnimations(pricingElement, pricingCards) {
    // Intersection observer for scroll animations
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Stagger card animations
            const cards = entry.target.querySelectorAll(
              '.pricing-card, [data-pricing-card]'
            );
            cards.forEach(function (card, index) {
              setTimeout(function () {
                card.classList.add('animate-fade-in-up');
              }, index * 100);
            });

            // Animate prices with counter effect
            animatePriceCounters(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(pricingElement);

    // Store cleanup function
    pricingElement.pricingObserver = observer;
  }

  /**
   * Initialize card hover effects
   * @param {Element} card - Pricing card
   * @return {void}
   */
  function initializeCardHoverEffects(card) {
    // Only apply hover effects on non-touch devices
    if (!('ontouchstart' in window)) {
      card.addEventListener('mouseenter', function () {
        card.classList.add('transform', 'scale-105', 'shadow-xl');

        // Highlight the card
        const selectButton = card.querySelector(
          '.select-plan, [data-select-plan]'
        );
        if (selectButton) {
          selectButton.classList.add('pulse-effect');
        }
      });

      card.addEventListener('mouseleave', function () {
        card.classList.remove('transform', 'scale-105', 'shadow-xl');

        const selectButton = card.querySelector(
          '.select-plan, [data-select-plan]'
        );
        if (selectButton) {
          selectButton.classList.remove('pulse-effect');
        }
      });
    }
  }

  /**
   * Initialize card keyboard navigation
   * @param {Element} card - Pricing card
   * @param {number} index - Card index
   * @param {NodeList} allCards - All pricing cards
   * @return {void}
   */
  function initializeCardKeyboardNavigation(card, index, allCards) {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');

    card.addEventListener('keydown', function (e) {
      switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = index === 0 ? allCards.length - 1 : index - 1;
        allCards[prevIndex].focus();
        break;

      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = (index + 1) % allCards.length;
        allCards[nextIndex].focus();
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        const selectButton = card.querySelector(
          '.select-plan, [data-select-plan]'
        );
        if (selectButton) {
          selectButton.click();
        }
        break;
      }
    });
  }

  // Utility functions

  /**
   * Update toggle button states
   * @param {NodeList} toggleButtons - Toggle buttons
   * @param {Element} activeToggle - Currently active toggle
   * @return {void}
   */
  function updateToggleStates(toggleButtons, activeToggle) {
    toggleButtons.forEach(function (toggle) {
      toggle.classList.remove('active');
      toggle.setAttribute('aria-pressed', 'false');
    });

    activeToggle.classList.add('active');
    activeToggle.setAttribute('aria-pressed', 'true');
  }

  /**
   * Update pricing display based on billing period
   * @param {NodeList} pricingCards - Pricing cards
   * @param {boolean} isYearly - Whether yearly billing is selected
   * @return {void}
   */
  function updatePricingDisplay(pricingCards, isYearly) {
    pricingCards.forEach(function (card) {
      const monthlyPrice = card.querySelector(
        '.monthly-price, [data-monthly-price]'
      );
      const yearlyPrice = card.querySelector(
        '.yearly-price, [data-yearly-price]'
      );
      const billingPeriod = card.querySelector(
        '.billing-period, [data-billing-period]'
      );
      const savings = card.querySelector('.savings, [data-savings]');

      if (monthlyPrice && yearlyPrice) {
        if (isYearly) {
          monthlyPrice.style.display = 'none';
          yearlyPrice.style.display = '';
          if (billingPeriod) billingPeriod.textContent = 'per year';
          if (savings) savings.style.display = '';
        } else {
          monthlyPrice.style.display = '';
          yearlyPrice.style.display = 'none';
          if (billingPeriod) billingPeriod.textContent = 'per month';
          if (savings) savings.style.display = 'none';
        }
      }

      // Update card billing attribute
      card.setAttribute('data-billing-period', isYearly ? 'yearly' : 'monthly');
    });
  }

  /**
   * Animate price counters
   * @param {Element} pricingElement - Pricing container
   * @return {void}
   */
  function animatePriceCounters(pricingElement) {
    const priceElements = pricingElement.querySelectorAll(
      '.price-amount, [data-price-amount]'
    );

    priceElements.forEach(function (priceElement) {
      const finalPrice = parseInt(
        priceElement.textContent.replace(/[^\d]/g, '')
      );
      if (isNaN(finalPrice)) return;

      const duration = 1000;
      const startTime = Date.now();

      function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out animation
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentPrice = Math.floor(finalPrice * easeProgress);

        priceElement.textContent = priceElement.textContent.replace(
          /\d+/,
          currentPrice
        );

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  /**
   * Show plan comparison table
   * @param {Element} comparisonTable - Comparison table
   * @param {Array} selectedPlans - Selected plans for comparison
   * @return {void}
   */
  function showPlanComparison(comparisonTable, selectedPlans) {
    // Show comparison table with animation
    comparisonTable.style.display = 'block';
    comparisonTable.classList.add('animate-fade-in');

    // Scroll to comparison table
    comparisonTable.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Populate comparison data (simplified example)
    const tableBody = comparisonTable.querySelector('tbody');
    if (tableBody) {
      // Clear existing rows
      tableBody.innerHTML = '';

      // Add plan headers
      const headerRow = document.createElement('tr');
      headerRow.innerHTML =
        '<th>Feature</th>' +
        selectedPlans
          .map(plan => {
            const planName =
              plan.card.querySelector('.plan-name')?.textContent ||
              `Plan ${plan.index + 1}`;
            return `<th>${planName}</th>`;
          })
          .join('');
      tableBody.appendChild(headerRow);
    }
  }

  /**
   * Show comparison message
   * @param {string} message - Message to display
   * @return {void}
   */
  function showComparisonMessage(message) {
    // Create or update message element
    let messageElement = document.querySelector('.comparison-message');
    if (!messageElement) {
      messageElement = document.createElement('div');
      messageElement.className =
        'comparison-message text-sm text-yellow-600 mt-2 p-2 bg-yellow-50 rounded';
      messageElement.setAttribute('role', 'alert');
      document
        .querySelector('.compare-plans')
        .parentNode.appendChild(messageElement);
    }

    messageElement.textContent = message;

    // Auto-hide after 5 seconds
    setTimeout(function () {
      if (messageElement.parentNode) {
        messageElement.remove();
      }
    }, 5000);
  }

  /**
   * Open plan modal
   * @param {string} planName - Plan name
   * @param {Element} card - Pricing card
   * @return {void}
   */
  function openPlanModal(planName, card) {
    console.log('[adesso-pricing] Opening modal for plan:', planName);
    // Implementation would depend on modal system
  }

  /**
   * Redirect to checkout
   * @param {string} planName - Plan name
   * @param {string} planPrice - Plan price
   * @param {string} billingPeriod - Billing period
   * @return {void}
   */
  function redirectToCheckout(planName, planPrice, billingPeriod) {
    const checkoutUrl = `/checkout?plan=${encodeURIComponent(planName)}&billing=${billingPeriod}`;
    window.location.href = checkoutUrl;
  }

  /**
   * Open contact form
   * @param {string} planName - Plan name
   * @return {void}
   */
  function openContactForm(planName) {
    const contactUrl = `/contact?plan=${encodeURIComponent(planName)}`;
    window.location.href = contactUrl;
  }

  /**
   * Track pricing events for analytics
   * @param {string} event - Event name
   * @param {Object} data - Event data
   * @return {void}
   */
  function trackPricingEvent(event, data) {
    const trackingData = {
      type: 'pricing_' + event,
      ...data,
      timestamp: new Date().toISOString()
    };

    // Send to analytics service if available
    if (typeof window.analytics !== 'undefined' && window.analytics.track) {
      window.analytics.track(
        'Pricing ' + event.replace('_', ' '),
        trackingData
      );
    }

    // Fallback to console for debugging
    console.log('[adesso-pricing] Event tracked:', trackingData);
  }

  // Main Drupal behavior
  Drupal.behaviors.adessoPricing = {
    attach: function (context) {
      // Find pricing elements
      const pricingElements = once(
        'adesso-pricing',
        '.pricing, [data-pricing], .pricing-section, .pricing-table',
        context
      );

      if (pricingElements.length === 0) {
        return;
      }

      console.log(
        '[adesso-pricing] Found',
        pricingElements.length,
        'pricing section(s)'
      );

      pricingElements.forEach(function (pricingElement) {
        initializePricing(pricingElement);
      });
    },

    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        // Clean up observers and reset states
        const pricingSections = context.querySelectorAll(
          '.pricing, [data-pricing], .pricing-section, .pricing-table'
        );

        pricingSections.forEach(function (section) {
          // Clean up intersection observer
          if (section.pricingObserver) {
            section.pricingObserver.disconnect();
            delete section.pricingObserver;
          }

          // Reset card states
          const cards = section.querySelectorAll(
            '.pricing-card, [data-pricing-card]'
          );
          cards.forEach(function (card) {
            card.classList.remove(
              'transform',
              'scale-105',
              'shadow-xl',
              'animate-fade-in-up',
              'selected-for-comparison'
            );

            // Remove comparison checkboxes
            const checkbox = card.querySelector('.plan-compare-checkbox');
            if (checkbox) {
              checkbox.remove();
            }
          });

          // Hide comparison table
          const comparisonTable = section.querySelector(
            '.pricing-comparison, [data-comparison-table]'
          );
          if (comparisonTable) {
            comparisonTable.style.display = 'none';
          }

          // Remove messages
          const message = section.querySelector('.comparison-message');
          if (message) {
            message.remove();
          }
        });
      }
    }
  };
})(Drupal, once);
