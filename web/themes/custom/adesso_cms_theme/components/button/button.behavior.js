/**
 * @file
 * Button interactive behavior with loading states and analytics.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Initialize button functionality
   * @param {Element} buttonElement - The button element
   * @return {void}
   */
  function initializeButton(buttonElement) {
    const originalText = buttonElement.textContent.trim();
    const loadingText = buttonElement.getAttribute('data-loading-text') || 'Loading...';
    const variant = buttonElement.getAttribute('data-variant') || 'default';
    
    // Add enhanced interaction feedback
    buttonElement.addEventListener('click', function(e) {
      // Prevent double clicks during loading
      if (buttonElement.classList.contains('loading')) {
        e.preventDefault();
        return;
      }

      // Add click animation
      buttonElement.classList.add('animate-pulse');
      setTimeout(function() {
        buttonElement.classList.remove('animate-pulse');
      }, 150);

      // Handle external links
      if (buttonElement.getAttribute('target') === '_blank') {
        // Add security attributes for external links
        buttonElement.setAttribute('rel', 'noopener noreferrer');
        
        // Track external link clicks
        console.log('[adesso-button] External link clicked:', buttonElement.href);
      }

      // Handle form submissions with loading state
      const form = buttonElement.closest('form');
      if (form && buttonElement.type === 'submit') {
        setLoadingState(buttonElement, true, loadingText);
        
        // Reset loading state on form error or completion
        form.addEventListener('submit', function() {
          setTimeout(function() {
            setLoadingState(buttonElement, false, originalText);
          }, 2000);
        });
      }

      // Track button interactions for analytics
      trackButtonClick(buttonElement, variant);
    });

    // Enhanced keyboard interaction
    buttonElement.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        buttonElement.click();
      }
    });

    // Focus management for accessibility
    buttonElement.addEventListener('focus', function() {
      buttonElement.classList.add('focus-visible:ring-2', 'focus-visible:ring-blue-500');
    });

    buttonElement.addEventListener('blur', function() {
      buttonElement.classList.remove('focus-visible:ring-2', 'focus-visible:ring-blue-500');
    });

    // Handle disabled state changes
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'disabled') {
          updateDisabledState(buttonElement);
        }
      });
    });
    
    observer.observe(buttonElement, { attributes: true });
    buttonElement.buttonObserver = observer;

    console.log('[adesso-button] Button initialized with variant:', variant);
  }

  /**
   * Set loading state for button
   * @param {Element} button - Button element
   * @param {boolean} isLoading - Loading state
   * @param {string} text - Text to display
   * @return {void}
   */
  function setLoadingState(button, isLoading, text) {
    if (isLoading) {
      button.classList.add('loading', 'opacity-75', 'cursor-not-allowed');
      button.setAttribute('aria-busy', 'true');
      button.disabled = true;
      
      // Add loading spinner if not present
      if (!button.querySelector('.loading-spinner')) {
        const spinner = document.createElement('span');
        spinner.className = 'loading-spinner animate-spin inline-block w-4 h-4 mr-2';
        spinner.innerHTML = '⟳';
        button.insertBefore(spinner, button.firstChild);
      }
      
      // Update text content after spinner
      const textNode = Array.from(button.childNodes).find(node => node.nodeType === 3);
      if (textNode) {
        textNode.textContent = text;
      }
    } else {
      button.classList.remove('loading', 'opacity-75', 'cursor-not-allowed');
      button.setAttribute('aria-busy', 'false');
      button.disabled = false;
      
      // Remove loading spinner
      const spinner = button.querySelector('.loading-spinner');
      if (spinner) {
        spinner.remove();
      }
      
      // Restore original text
      const textNode = Array.from(button.childNodes).find(node => node.nodeType === 3);
      if (textNode) {
        textNode.textContent = text;
      }
    }
  }

  /**
   * Update disabled state styling
   * @param {Element} button - Button element
   * @return {void}
   */
  function updateDisabledState(button) {
    if (button.disabled) {
      button.classList.add('opacity-50', 'cursor-not-allowed');
      button.setAttribute('aria-disabled', 'true');
    } else {
      button.classList.remove('opacity-50', 'cursor-not-allowed');
      button.setAttribute('aria-disabled', 'false');
    }
  }

  /**
   * Track button click for analytics
   * @param {Element} button - Button element
   * @param {string} variant - Button variant
   * @return {void}
   */
  function trackButtonClick(button, variant) {
    const clickData = {
      type: 'button_click',
      variant: variant,
      text: button.textContent.trim(),
      url: button.href || null,
      timestamp: new Date().toISOString()
    };

    // Send to analytics service if available
    if (typeof window.analytics !== 'undefined' && window.analytics.track) {
      window.analytics.track('Button Clicked', clickData);
    }

    // Fallback to console for debugging
    console.log('[adesso-button] Button interaction tracked:', clickData);
  }

  // Main Drupal behavior
  Drupal.behaviors.adessoButton = {
    attach: function (context) {
      // Find button elements (both <button> and <a> with button classes)
      const buttonElements = once('adesso-button', 
        'button:not([data-no-behavior]), a.btn:not([data-no-behavior]), .button:not([data-no-behavior])', 
        context
      );
      
      if (buttonElements.length === 0) {
        return;
      }

      console.log('[adesso-button] Found', buttonElements.length, 'button(s)');

      buttonElements.forEach(function(buttonElement) {
        initializeButton(buttonElement);
      });
    },

    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        // Clean up observers and reset states
        const buttons = context.querySelectorAll('button, a.btn, .button');
        
        buttons.forEach(function(button) {
          // Clean up mutation observer
          if (button.buttonObserver) {
            button.buttonObserver.disconnect();
            delete button.buttonObserver;
          }
          
          // Reset loading state
          button.classList.remove('loading', 'opacity-75', 'cursor-not-allowed');
          button.setAttribute('aria-busy', 'false');
          
          // Remove loading spinner
          const spinner = button.querySelector('.loading-spinner');
          if (spinner) {
            spinner.remove();
          }
        });
      }
    }
  };

})(Drupal, once);