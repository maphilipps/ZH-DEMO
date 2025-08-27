/**
 * @file
 * Newsletter form interactive behavior with validation and AJAX submission.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Initialize newsletter form functionality
   * @param {Element} formElement - The newsletter form element
   * @return {void}
   */
  function initializeNewsletterForm(formElement) {
    const emailInput = formElement.querySelector('input[type="email"], [data-email-input]');
    const submitButton = formElement.querySelector('button[type="submit"], [data-submit]');
    const messageContainer = formElement.querySelector('.form-message, [data-message]');
    const privacyCheckbox = formElement.querySelector('input[type="checkbox"], [data-privacy]');
    
    if (!emailInput || !submitButton) {
      console.warn('[adesso-newsletter-form] Required form elements not found');
      return;
    }

    // Initialize real-time validation
    initializeValidation(emailInput, formElement);

    // Initialize form submission
    initializeFormSubmission(formElement, emailInput, submitButton, messageContainer);

    // Initialize privacy checkbox if present
    if (privacyCheckbox) {
      initializePrivacyCheckbox(privacyCheckbox, submitButton);
    }

    // Initialize accessibility enhancements
    initializeAccessibilityFeatures(formElement, emailInput, submitButton);

    console.log('[adesso-newsletter-form] Newsletter form initialized');
  }

  /**
   * Initialize email validation
   * @param {Element} emailInput - Email input element
   * @param {Element} formElement - Form container
   * @return {void}
   */
  function initializeValidation(emailInput, formElement) {
    let validationTimeout;
    
    // Create validation message container
    let validationMessage = formElement.querySelector('.validation-message');
    if (!validationMessage) {
      validationMessage = document.createElement('div');
      validationMessage.className = 'validation-message text-sm mt-1 hidden';
      validationMessage.setAttribute('role', 'alert');
      validationMessage.setAttribute('aria-live', 'polite');
      emailInput.parentNode.appendChild(validationMessage);
    }

    // Real-time validation on input
    emailInput.addEventListener('input', function (e) {
      clearTimeout(validationTimeout);
      
      // Debounce validation for better UX
      validationTimeout = setTimeout(function () {
        validateEmail(emailInput, validationMessage);
      }, 500);
    });

    // Immediate validation on blur
    emailInput.addEventListener('blur', function (e) {
      clearTimeout(validationTimeout);
      validateEmail(emailInput, validationMessage);
    });

    // Clear validation on focus
    emailInput.addEventListener('focus', function (e) {
      clearValidationState(emailInput, validationMessage);
    });
  }

  /**
   * Validate email input
   * @param {Element} emailInput - Email input element
   * @param {Element} validationMessage - Validation message container
   * @return {boolean} Validation result
   */
  function validateEmail(emailInput, validationMessage) {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Clear previous state
    clearValidationState(emailInput, validationMessage);
    
    if (!email) {
      showValidationError(emailInput, validationMessage, 'Email address is required.');
      return false;
    }
    
    if (!emailRegex.test(email)) {
      showValidationError(emailInput, validationMessage, 'Please enter a valid email address.');
      return false;
    }
    
    // Check for common typos
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const emailDomain = email.split('@')[1];
    const suggestion = suggestDomain(emailDomain, commonDomains);
    
    if (suggestion && suggestion !== emailDomain) {
      showValidationWarning(emailInput, validationMessage, 
        `Did you mean ${email.replace(emailDomain, suggestion)}?`);
    }
    
    showValidationSuccess(emailInput, validationMessage);
    return true;
  }

  /**
   * Initialize form submission handling
   * @param {Element} formElement - Form element
   * @param {Element} emailInput - Email input
   * @param {Element} submitButton - Submit button
   * @param {Element} messageContainer - Message container
   * @return {void}
   */
  function initializeFormSubmission(formElement, emailInput, submitButton, messageContainer) {
    formElement.addEventListener('submit', function (e) {
      e.preventDefault();
      
      // Validate before submission
      const validationMessage = formElement.querySelector('.validation-message');
      if (!validateEmail(emailInput, validationMessage)) {
        emailInput.focus();
        return;
      }

      // Check privacy consent if checkbox exists
      const privacyCheckbox = formElement.querySelector('input[type="checkbox"]');
      if (privacyCheckbox && !privacyCheckbox.checked) {
        showFormMessage(messageContainer, 'Please accept the privacy policy to continue.', 'error');
        privacyCheckbox.focus();
        return;
      }

      // Submit form
      submitNewsletterForm(formElement, emailInput, submitButton, messageContainer);
    });
  }

  /**
   * Submit newsletter form via AJAX
   * @param {Element} formElement - Form element
   * @param {Element} emailInput - Email input
   * @param {Element} submitButton - Submit button
   * @param {Element} messageContainer - Message container
   * @return {void}
   */
  function submitNewsletterForm(formElement, emailInput, submitButton, messageContainer) {
    const formData = new FormData(formElement);
    const submitUrl = formElement.action || '/newsletter/subscribe';
    
    // Show loading state
    setSubmissionState(submitButton, 'loading');
    clearFormMessage(messageContainer);

    // Track form submission attempt
    trackNewsletterEvent('submission_started', {
      email: emailInput.value,
      formId: formElement.id || 'newsletter-form'
    });

    // Submit via fetch API
    fetch(submitUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(function (response) {
        return response.json().then(function (data) {
          return { status: response.status, data: data };
        });
      })
      .then(function (result) {
        if (result.status >= 200 && result.status < 300) {
        // Success
          handleSubmissionSuccess(formElement, emailInput, submitButton, messageContainer, result.data);
        } else {
        // Server error
          handleSubmissionError(formElement, submitButton, messageContainer, result.data);
        }
      })
      .catch(function (error) {
        console.error('[adesso-newsletter-form] Submission error:', error);
        handleSubmissionError(formElement, submitButton, messageContainer, {
          message: 'Network error. Please try again later.'
        });
      });
  }

  /**
   * Handle successful form submission
   * @param {Element} formElement - Form element
   * @param {Element} emailInput - Email input
   * @param {Element} submitButton - Submit button
   * @param {Element} messageContainer - Message container
   * @param {Object} responseData - Server response data
   * @return {void}
   */
  function handleSubmissionSuccess(formElement, emailInput, submitButton, messageContainer, responseData) {
    setSubmissionState(submitButton, 'success');
    
    const message = responseData.message || 'Thank you! Please check your email to confirm your subscription.';
    showFormMessage(messageContainer, message, 'success');
    
    // Clear form
    formElement.reset();
    clearValidationState(emailInput, formElement.querySelector('.validation-message'));
    
    // Track success
    trackNewsletterEvent('subscription_success', {
      email: emailInput.value,
      formId: formElement.id || 'newsletter-form'
    });
    
    // Reset button state after delay
    setTimeout(function () {
      setSubmissionState(submitButton, 'default');
    }, 3000);
  }

  /**
   * Handle form submission error
   * @param {Element} formElement - Form element
   * @param {Element} submitButton - Submit button
   * @param {Element} messageContainer - Message container
   * @param {Object} errorData - Error data
   * @return {void}
   */
  function handleSubmissionError(formElement, submitButton, messageContainer, errorData) {
    setSubmissionState(submitButton, 'error');
    
    const message = errorData.message || 'An error occurred. Please try again.';
    showFormMessage(messageContainer, message, 'error');
    
    // Track error
    trackNewsletterEvent('subscription_error', {
      error: message,
      formId: formElement.id || 'newsletter-form'
    });
    
    // Reset button state after delay
    setTimeout(function () {
      setSubmissionState(submitButton, 'default');
    }, 3000);
  }

  /**
   * Initialize privacy checkbox functionality
   * @param {Element} privacyCheckbox - Privacy checkbox element
   * @param {Element} submitButton - Submit button
   * @return {void}
   */
  function initializePrivacyCheckbox(privacyCheckbox, submitButton) {
    function updateSubmitButton() {
      submitButton.disabled = !privacyCheckbox.checked;
      submitButton.setAttribute('aria-disabled', !privacyCheckbox.checked);
    }
    
    privacyCheckbox.addEventListener('change', updateSubmitButton);
    
    // Initial state
    updateSubmitButton();
  }

  /**
   * Initialize accessibility features
   * @param {Element} formElement - Form element
   * @param {Element} emailInput - Email input
   * @param {Element} submitButton - Submit button
   * @return {void}
   */
  function initializeAccessibilityFeatures(formElement, emailInput, submitButton) {
    // Add form labels if missing
    if (!emailInput.labels || emailInput.labels.length === 0) {
      const label = document.createElement('label');
      label.textContent = 'Email Address';
      label.className = 'sr-only';
      label.setAttribute('for', emailInput.id || 'newsletter-email');
      emailInput.parentNode.insertBefore(label, emailInput);
      
      if (!emailInput.id) {
        emailInput.id = 'newsletter-email';
      }
    }
    
    // Add submit button label if needed
    if (!submitButton.textContent.trim() && !submitButton.getAttribute('aria-label')) {
      submitButton.setAttribute('aria-label', 'Subscribe to newsletter');
    }
    
    // Add form description
    if (!formElement.getAttribute('aria-describedby')) {
      const description = document.createElement('div');
      description.id = 'newsletter-description';
      description.className = 'sr-only';
      description.textContent = 'Subscribe to our newsletter to receive updates and news.';
      formElement.appendChild(description);
      formElement.setAttribute('aria-describedby', 'newsletter-description');
    }
  }

  // Utility functions
  
  /**
   * Set form submission state
   * @param {Element} submitButton - Submit button
   * @param {string} state - State (loading, success, error, default)
   * @return {void}
   */
  function setSubmissionState(submitButton, state) {
    // Remove all state classes
    submitButton.classList.remove('loading', 'success', 'error');
    
    switch (state) {
    case 'loading':
      submitButton.classList.add('loading');
      submitButton.disabled = true;
      submitButton.setAttribute('aria-busy', 'true');
      submitButton.textContent = 'Subscribing...';
      break;
        
    case 'success':
      submitButton.classList.add('success');
      submitButton.textContent = 'Subscribed!';
      break;
        
    case 'error':
      submitButton.classList.add('error');
      submitButton.textContent = 'Try Again';
      submitButton.disabled = false;
      submitButton.setAttribute('aria-busy', 'false');
      break;
        
    default:
      submitButton.disabled = false;
      submitButton.setAttribute('aria-busy', 'false');
      submitButton.textContent = 'Subscribe';
      break;
    }
  }

  /**
   * Show validation error
   * @param {Element} input - Input element
   * @param {Element} message - Message container
   * @param {string} text - Error message
   * @return {void}
   */
  function showValidationError(input, message, text) {
    input.classList.add('error', 'border-red-500');
    input.setAttribute('aria-invalid', 'true');
    message.textContent = text;
    message.className = 'validation-message text-sm mt-1 text-red-600';
    message.classList.remove('hidden');
  }

  /**
   * Show validation warning
   * @param {Element} input - Input element
   * @param {Element} message - Message container
   * @param {string} text - Warning message
   * @return {void}
   */
  function showValidationWarning(input, message, text) {
    input.classList.add('warning', 'border-yellow-500');
    message.textContent = text;
    message.className = 'validation-message text-sm mt-1 text-yellow-600';
    message.classList.remove('hidden');
  }

  /**
   * Show validation success
   * @param {Element} input - Input element
   * @param {Element} message - Message container
   * @return {void}
   */
  function showValidationSuccess(input, message) {
    input.classList.add('valid', 'border-green-500');
    input.setAttribute('aria-invalid', 'false');
    message.textContent = '';
    message.classList.add('hidden');
  }

  /**
   * Clear validation state
   * @param {Element} input - Input element
   * @param {Element} message - Message container
   * @return {void}
   */
  function clearValidationState(input, message) {
    input.classList.remove('error', 'warning', 'valid', 'border-red-500', 'border-yellow-500', 'border-green-500');
    input.removeAttribute('aria-invalid');
    if (message) {
      message.textContent = '';
      message.classList.add('hidden');
    }
  }

  /**
   * Show form message
   * @param {Element} container - Message container
   * @param {string} text - Message text
   * @param {string} type - Message type (success, error, info)
   * @return {void}
   */
  function showFormMessage(container, text, type) {
    if (!container) return;
    
    container.textContent = text;
    container.className = `form-message text-sm mt-2 p-2 rounded ${type === 'success' ? 'bg-green-100 text-green-700' : type === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`;
    container.classList.remove('hidden');
    container.setAttribute('role', 'alert');
  }

  /**
   * Clear form message
   * @param {Element} container - Message container
   * @return {void}
   */
  function clearFormMessage(container) {
    if (!container) return;
    
    container.textContent = '';
    container.classList.add('hidden');
    container.removeAttribute('role');
  }

  /**
   * Suggest domain correction
   * @param {string} domain - Input domain
   * @param {Array} commonDomains - List of common domains
   * @return {string|null} Suggested domain
   */
  function suggestDomain(domain, commonDomains) {
    const threshold = 2; // Maximum edit distance
    
    for (let i = 0; i < commonDomains.length; i++) {
      const distance = levenshteinDistance(domain, commonDomains[i]);
      if (distance > 0 && distance <= threshold) {
        return commonDomains[i];
      }
    }
    
    return null;
  }

  /**
   * Calculate Levenshtein distance between two strings
   * @param {string} a - First string
   * @param {string} b - Second string
   * @return {number} Edit distance
   */
  function levenshteinDistance(a, b) {
    const matrix = [];
    
    for (let i = 0; i <= a.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= b.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        if (a.charAt(i - 1) === b.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[a.length][b.length];
  }

  /**
   * Track newsletter events for analytics
   * @param {string} event - Event name
   * @param {Object} data - Event data
   * @return {void}
   */
  function trackNewsletterEvent(event, data) {
    const trackingData = {
      type: 'newsletter_' + event,
      ...data,
      timestamp: new Date().toISOString()
    };

    // Send to analytics service if available
    if (typeof window.analytics !== 'undefined' && window.analytics.track) {
      window.analytics.track('Newsletter ' + event.replace('_', ' '), trackingData);
    }

    // Fallback to console for debugging
    console.log('[adesso-newsletter-form] Event tracked:', trackingData);
  }

  // Main Drupal behavior
  Drupal.behaviors.adessoNewsletterForm = {
    attach: function (context) {
      // Find newsletter form elements
      const formElements = once('adesso-newsletter-form', 
        '.newsletter-form, [data-newsletter-form], form[action*="newsletter"]', 
        context
      );
      
      if (formElements.length === 0) {
        return;
      }

      console.log('[adesso-newsletter-form] Found', formElements.length, 'newsletter form(s)');

      formElements.forEach(function (formElement) {
        initializeNewsletterForm(formElement);
      });
    },

    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        // Clean up and reset form states
        const forms = context.querySelectorAll('.newsletter-form, [data-newsletter-form], form[action*="newsletter"]');
        
        forms.forEach(function (form) {
          const submitButton = form.querySelector('button[type="submit"], [data-submit]');
          const emailInput = form.querySelector('input[type="email"]');
          const messageContainer = form.querySelector('.form-message');
          
          // Reset button state
          if (submitButton) {
            setSubmissionState(submitButton, 'default');
          }
          
          // Clear validation
          if (emailInput) {
            const validationMessage = form.querySelector('.validation-message');
            clearValidationState(emailInput, validationMessage);
          }
          
          // Clear messages
          clearFormMessage(messageContainer);
        });
      }
    }
  };

})(Drupal, once);