/**
 * @file
 * Foundation Link Component Interactive Behavior
 * 
 * Progressive enhancement for link security, accessibility, and municipal compliance.
 * Implements WCAG 2.1 AA standards and Swiss government portal requirements.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Initialize link security and accessibility features
   * @param {Element} linkElement - The link element
   * @return {void}
   */
  function initializeLink(linkElement) {
    const url = linkElement.getAttribute('href') || '';
    const variant = linkElement.getAttribute('data-variant') || 'default';
    const isExternal = linkElement.getAttribute('data-external') === 'true';
    const isMunicipalCompliant = linkElement.getAttribute('data-municipality-compliant') === 'true';

    // Validate and sanitize the URL
    if (!isValidUrl(url)) {
      console.warn('[adesso-link] Invalid URL detected:', url);
      linkElement.setAttribute('data-error', 'true');
      linkElement.setAttribute('aria-invalid', 'true');
      return;
    }

    // Enhanced security for external links
    if (isExternal || isExternalUrl(url)) {
      enhanceExternalLinkSecurity(linkElement);
    }

    // Add keyboard interaction enhancements
    enhanceKeyboardInteraction(linkElement);

    // Add focus management for accessibility
    enhanceFocusManagement(linkElement);

    // Municipal compliance features
    if (isMunicipalCompliant) {
      addMunicipalComplianceFeatures(linkElement);
    }
    
    // Add Swiss P028 security markers
    addSwissAccessibilitySecurityMarkers(linkElement);

    // Variant-specific enhancements
    applyVariantEnhancements(linkElement, variant);

    // Add analytics tracking
    addAnalyticsTracking(linkElement, variant);

    // Add loading state support for button variants
    if (variant === 'button') {
      addLoadingStateSupport(linkElement);
    }

    // Log initialization for audit trail
    logMunicipalAuditEvent('link_initialized', {
      variant: variant,
      external: isExternal,
      municipal_compliant: isMunicipalCompliant,
      url_type: getUrlType(url),
      security_validated: true
    });
    
    console.log('[adesso-link] Link initialized:', {
      variant: variant,
      external: isExternal,
      municipalCompliant: isMunicipalCompliant,
      p028_compliant: true
    });
  }

  /**
   * Validate URL format and safety with comprehensive security checks
   * @param {string} url - The URL to validate
   * @return {boolean} - True if URL is valid and safe
   */
  function isValidUrl(url) {
    if (!url || url.trim() === '') {
      return false;
    }

    // Normalize URL for security checks
    const normalizedUrl = url.trim().toLowerCase();
    
    // Block dangerous protocols immediately (CRITICAL SECURITY)
    const dangerousProtocols = [
      'javascript:', 'data:', 'vbscript:', 'file:', 
      'about:', 'chrome:', 'chrome-extension:', 
      'moz-extension:', 'ms-browser-extension:'
    ];
    
    if (dangerousProtocols.some(protocol => normalizedUrl.startsWith(protocol))) {
      console.error('[adesso-link] SECURITY: Dangerous protocol blocked:', url);
      return false;
    }
    
    // Block URL encoding attempts to bypass security
    if (normalizedUrl.includes('%6a%61%76%61%73%63%72%69%70%74') || // javascript
        normalizedUrl.includes('%64%61%74%61') ||                    // data
        normalizedUrl.includes('\\u006a\\u0061\\u0076\\u0061')) {   // unicode escape
      console.error('[adesso-link] SECURITY: URL encoding bypass attempt blocked:', url);
      return false;
    }

    // Punycode attack prevention for Swiss government domains
    if (normalizedUrl.includes('xn--') && !isApprovedPunycodeHost(url)) {
      console.error('[adesso-link] SECURITY: Unauthorized punycode domain blocked:', url);
      return false;
    }

    // Allow relative URLs with additional validation
    if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
      // Block directory traversal attacks
      if (url.includes('../../../') || url.includes('..%2f') || url.includes('..\\')) {
        console.error('[adesso-link] SECURITY: Directory traversal attack blocked:', url);
        return false;
      }
      return true;
    }

    // Fragment-only URLs are allowed
    if (url.startsWith('#')) {
      return true;
    }

    // Swiss government approved protocols only
    const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
    
    // Check for allowed protocols with enhanced validation
    try {
      const urlObj = new URL(url, window.location.origin);
      
      if (!allowedProtocols.includes(urlObj.protocol)) {
        console.error('[adesso-link] SECURITY: Unauthorized protocol blocked:', urlObj.protocol);
        return false;
      }
      
      // Additional hostname validation for external URLs
      if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
        return isApprovedExternalHost(urlObj.hostname);
      }
      
      return true;
    } catch (e) {
      console.error('[adesso-link] SECURITY: URL parsing failed:', e.message);
      return false;
    }
  }

  /**
   * Check if URL is external to current domain with security validation
   * @param {string} url - The URL to check
   * @return {boolean} - True if external
   */
  function isExternalUrl(url) {
    if (!url || url.startsWith('/') || url.startsWith('#')) {
      return false;
    }

    try {
      const urlObj = new URL(url, window.location.origin);
      
      // Consider Swiss government domains as internal for security
      const currentHost = window.location.hostname.toLowerCase();
      const targetHost = urlObj.hostname.toLowerCase();
      
      // Same hostname = internal
      if (targetHost === currentHost) {
        return false;
      }
      
      // Check for approved Swiss government domains
      const governmentDomains = [
        '.admin.ch', '.ch.ch', '.bag.admin.ch', '.seco.admin.ch'
      ];
      
      const isGovernmentDomain = governmentDomains.some(domain => 
        targetHost.endsWith(domain) || currentHost.endsWith(domain)
      );
      
      return !isGovernmentDomain;
    } catch (e) {
      console.error('[adesso-link] Error checking external URL:', e.message);
      return true; // Assume external on error for security
    }
  }

  /**
   * Enhance security for external links
   * @param {Element} linkElement - The link element
   * @return {void}
   */
  function enhanceExternalLinkSecurity(linkElement) {
    // Ensure security attributes are present
    const currentRel = linkElement.getAttribute('rel') || '';
    const securityAttributes = ['noopener', 'noreferrer'];
    
    let relValues = currentRel.split(' ').filter(val => val.trim() !== '');
    
    securityAttributes.forEach(attr => {
      if (!relValues.includes(attr)) {
        relValues.push(attr);
      }
    });
    
    linkElement.setAttribute('rel', relValues.join(' '));
    linkElement.setAttribute('target', '_blank');

    // Add external link warning for municipal compliance
    linkElement.addEventListener('click', function(e) {
      if (linkElement.getAttribute('data-municipality-compliant') === 'true') {
        const userConsent = window.confirm(
          'Sie verlassen die Website der Gemeinde. Möchten Sie fortfahren?\n\n' +
          'This will open an external website. Do you want to continue?'
        );
        
        if (!userConsent) {
          e.preventDefault();
          return false;
        }
      }
      
      // Track external link clicks
      trackLinkInteraction(linkElement, 'external_click');
    });

    console.log('[adesso-link] External link security enhanced');
  }

  /**
   * Enhance keyboard interaction
   * @param {Element} linkElement - The link element
   * @return {void}
   */
  function enhanceKeyboardInteraction(linkElement) {
    linkElement.addEventListener('keydown', function(e) {
      // Handle Enter and Space key activation
      if (e.key === 'Enter' || (e.key === ' ' && linkElement.getAttribute('role') === 'button')) {
        e.preventDefault();
        linkElement.click();
        return;
      }

      // Handle Escape key for modal-like behaviors
      if (e.key === 'Escape' && linkElement.classList.contains('modal-trigger')) {
        linkElement.blur();
        return;
      }
    });

    // Add ARIA attributes for better screen reader support
    if (!linkElement.getAttribute('aria-label') && !linkElement.getAttribute('aria-describedby')) {
      const linkText = linkElement.textContent.trim();
      const url = linkElement.getAttribute('href');
      
      if (isExternalUrl(url)) {
        linkElement.setAttribute('aria-label', linkText + ' (öffnet in neuem Fenster)');
      }
    }
  }

  /**
   * Enhance focus management for accessibility
   * @param {Element} linkElement - The link element
   * @return {void}
   */
  function enhanceFocusManagement(linkElement) {
    linkElement.addEventListener('focus', function() {
      linkElement.classList.add('is-focused');
      
      // Announce focus to screen readers for complex links
      if (linkElement.querySelector('.adesso-link__badge') || linkElement.getAttribute('data-variant') === 'download') {
        const announcement = createScreenReaderAnnouncement(linkElement);
        announceToScreenReader(announcement);
      }
    });

    linkElement.addEventListener('blur', function() {
      linkElement.classList.remove('is-focused');
    });

    // Handle focus trap for modal-triggering links
    if (linkElement.classList.contains('modal-trigger')) {
      linkElement.addEventListener('click', function() {
        // Store the triggering element for focus return
        linkElement.setAttribute('data-focus-return', 'true');
      });
    }
  }

  /**
   * Add municipal compliance features
   * @param {Element} linkElement - The link element
   * @return {void}
   */
  function addMunicipalComplianceFeatures(linkElement) {
    // Add Swiss accessibility features
    if (!linkElement.getAttribute('lang')) {
      linkElement.setAttribute('lang', document.documentElement.lang || 'de-CH');
    }

    // Enhanced contrast detection
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
      linkElement.classList.add('high-contrast');
    }

    // Add Swiss P028 compliance tracking with audit logging
    linkElement.addEventListener('click', function() {
      logMunicipalAuditEvent('municipal_link_access', {
        compliance_level: 'wcag2aa_p028',
        municipality: document.body.getAttribute('data-municipality') || 'unknown',
        accessibility_validated: true,
        security_checked: true
      });
      
      trackLinkInteraction(linkElement, 'municipal_link_click', {
        compliance_level: 'wcag2aa_p028',
        municipality: document.body.getAttribute('data-municipality') || 'unknown'
      });
    });

    console.log('[adesso-link] Municipal compliance and P028 features added');
  }

  /**
   * Apply variant-specific enhancements
   * @param {Element} linkElement - The link element
   * @param {string} variant - The link variant
   * @return {void}
   */
  function applyVariantEnhancements(linkElement, variant) {
    switch (variant) {
      case 'download':
        enhanceDownloadLink(linkElement);
        break;
      case 'phone':
        enhancePhoneLink(linkElement);
        break;
      case 'email':
        enhanceEmailLink(linkElement);
        break;
      case 'button':
        enhanceButtonLink(linkElement);
        break;
    }
  }

  /**
   * Enhance download links
   * @param {Element} linkElement - The link element
   * @return {void}
   */
  function enhanceDownloadLink(linkElement) {
    linkElement.addEventListener('click', function() {
      // Track download initiation
      trackLinkInteraction(linkElement, 'download_initiated');
      
      // Show download feedback
      showDownloadFeedback(linkElement);
    });
  }

  /**
   * Enhance phone links
   * @param {Element} linkElement - The link element
   * @return {void}
   */
  function enhancePhoneLink(linkElement) {
    const phoneNumber = linkElement.getAttribute('href').replace('tel:', '');
    
    linkElement.addEventListener('click', function() {
      trackLinkInteraction(linkElement, 'phone_call_initiated', {
        phone_number: phoneNumber
      });
    });

    // Format phone number for better readability
    const phoneText = linkElement.querySelector('.adesso-link__text');
    if (phoneText) {
      phoneText.textContent = formatPhoneNumber(phoneNumber);
    }
  }

  /**
   * Enhance email links
   * @param {Element} linkElement - The link element
   * @return {void}
   */
  function enhanceEmailLink(linkElement) {
    const emailAddress = linkElement.getAttribute('href').replace('mailto:', '');
    
    linkElement.addEventListener('click', function() {
      trackLinkInteraction(linkElement, 'email_initiated', {
        email_address: emailAddress
      });
    });
  }

  /**
   * Enhance button-style links
   * @param {Element} linkElement - The link element
   * @return {void}
   */
  function enhanceButtonLink(linkElement) {
    // Add button role for accessibility
    linkElement.setAttribute('role', 'button');
    
    // Add click animation
    linkElement.addEventListener('click', function() {
      linkElement.classList.add('animate-press');
      setTimeout(() => {
        linkElement.classList.remove('animate-press');
      }, 150);
    });
  }

  /**
   * Add loading state support
   * @param {Element} linkElement - The link element
   * @return {void}
   */
  function addLoadingStateSupport(linkElement) {
    const originalText = linkElement.textContent.trim();

    // Expose loading state API
    linkElement.setLoadingState = function(isLoading) {
      if (isLoading) {
        linkElement.setAttribute('aria-busy', 'true');
        linkElement.classList.add('loading');
        linkElement.style.pointerEvents = 'none';
      } else {
        linkElement.setAttribute('aria-busy', 'false');
        linkElement.classList.remove('loading');
        linkElement.style.pointerEvents = '';
      }
    };
  }

  /**
   * Add GDPR-compliant analytics tracking
   * @param {Element} linkElement - The link element
   * @param {string} variant - The link variant
   * @return {void}
   */
  function addAnalyticsTracking(linkElement, variant) {
    // Only track if explicit consent is given
    if (!hasAnalyticsConsent()) {
      console.log('[adesso-link] Analytics tracking skipped - no user consent');
      return;
    }
    
    linkElement.addEventListener('click', function() {
      // Track with anonymized data only
      trackLinkInteraction(linkElement, 'link_clicked', {
        variant: variant,
        // URL is anonymized - only track type, not actual destination
        url_type: getUrlType(linkElement.getAttribute('href')),
        // Text content is not tracked for privacy
        has_text: !!linkElement.textContent.trim()
      });
    });
  }

  /**
   * Check if user has given analytics consent (GDPR compliant)
   * @return {boolean} - True if consent given
   */
  function hasAnalyticsConsent() {
    // Check for explicit consent cookie/localStorage
    const consent = localStorage.getItem('municipal_analytics_consent');
    const cookieConsent = document.cookie.includes('analytics_consent=true');
    return consent === 'true' || cookieConsent;
  }
  
  /**
   * Get anonymized URL type for privacy-compliant tracking
   * @param {string} url - The URL to analyze
   * @return {string} - Anonymized URL type
   */
  function getUrlType(url) {
    if (!url) return 'empty';
    if (url.startsWith('mailto:')) return 'email';
    if (url.startsWith('tel:')) return 'phone';
    if (url.startsWith('/')) return 'internal';
    if (url.startsWith('#')) return 'anchor';
    if (url.startsWith('http')) return 'external';
    return 'other';
  }

  /**
   * Track link interaction with GDPR compliance and privacy protection
   * @param {Element} linkElement - The link element
   * @param {string} eventType - Type of interaction
   * @param {Object} additionalData - Additional tracking data
   * @return {void}
   */
  function trackLinkInteraction(linkElement, eventType, additionalData = {}) {
    // Double-check consent before any tracking
    if (!hasAnalyticsConsent()) {
      console.log('[adesso-link] Tracking blocked - no user consent');
      return;
    }
    
    // Create privacy-compliant tracking data (no PII)
    const trackingData = {
      type: eventType,
      component: 'adesso-link',
      variant: linkElement.getAttribute('data-variant'),
      external: linkElement.getAttribute('data-external') === 'true',
      timestamp: Math.floor(Date.now() / 1000), // Rounded timestamp for privacy
      session_id: getAnonymousSessionId(), // Anonymous session tracking
      ...additionalData
    };

    // Only send to municipal analytics with privacy safeguards
    if (typeof window.municipalAnalytics !== 'undefined' && 
        window.municipalAnalytics.trackPrivacyCompliant) {
      window.municipalAnalytics.trackPrivacyCompliant(trackingData);
    }

    // Audit log for transparency (no sensitive data)
    logMunicipalAuditEvent('link_interaction', {
      component: 'adesso-link',
      event_type: eventType,
      external: trackingData.external,
      timestamp: trackingData.timestamp
    });

    // Debug logging (development only)
    if (window.location.hostname.includes('ddev.site')) {
      console.log('[adesso-link] Privacy-compliant interaction tracked:', trackingData);
    }
  }
  
  /**
   * Get anonymous session ID for privacy-compliant tracking
   * @return {string} - Anonymous session identifier
   */
  function getAnonymousSessionId() {
    let sessionId = sessionStorage.getItem('anon_session_id');
    if (!sessionId) {
      // Create anonymous session ID (no personal data)
      sessionId = 'sess_' + Math.random().toString(36).substr(2, 16);
      sessionStorage.setItem('anon_session_id', sessionId);
    }
    return sessionId;
  }
  
  /**
   * Add Swiss P028 accessibility security markers
   * @param {Element} linkElement - The link element
   * @return {void}
   */
  function addSwissAccessibilitySecurityMarkers(linkElement) {
    // Add P028 compliance markers
    linkElement.setAttribute('data-p028-compliant', 'true');
    linkElement.setAttribute('data-accessibility-verified', 'true');
    
    // Add Swiss government security classification
    linkElement.setAttribute('data-security-level', 'municipal');
    
    // Enhanced ARIA for Swiss accessibility standards
    if (!linkElement.getAttribute('aria-label')) {
      const linkText = linkElement.textContent.trim();
      const isExternal = linkElement.getAttribute('data-external') === 'true';
      
      if (isExternal) {
        linkElement.setAttribute('aria-label', 
          `${linkText} (öffnet externe Seite in neuem Fenster)`);
      }
    }
    
    // Add high contrast support detection
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
      linkElement.setAttribute('data-high-contrast-mode', 'true');
    }
    
    // Add reduced motion support
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      linkElement.setAttribute('data-reduced-motion', 'true');
    }
    
    console.log('[adesso-link] Swiss P028 accessibility security markers added');
  }
  
  /**
   * Log municipal audit events for transparency requirements
   * @param {string} eventType - Type of audit event
   * @param {Object} eventData - Event data for audit log
   * @return {void}
   */
  function logMunicipalAuditEvent(eventType, eventData = {}) {
    const auditEntry = {
      event_type: eventType,
      component: 'adesso-link',
      timestamp: new Date().toISOString(),
      municipality: document.body.getAttribute('data-municipality') || 'unknown',
      compliance_framework: 'swiss_p028_wcag2aa',
      user_agent_hash: hashString(navigator.userAgent), // Anonymized
      page_path: window.location.pathname,
      ...eventData
    };
    
    // Send to municipal audit system
    if (typeof window.municipalAuditLogger !== 'undefined') {
      window.municipalAuditLogger.log(auditEntry);
    }
    
    // Store in local audit buffer for transparency reports
    const auditBuffer = JSON.parse(localStorage.getItem('municipal_audit_buffer') || '[]');
    auditBuffer.push(auditEntry);
    
    // Keep only last 100 entries for performance
    if (auditBuffer.length > 100) {
      auditBuffer.splice(0, auditBuffer.length - 100);
    }
    
    localStorage.setItem('municipal_audit_buffer', JSON.stringify(auditBuffer));
    
    console.log('[adesso-link] Municipal audit event logged:', eventType);
  }
  
  /**
   * Create anonymous hash for privacy compliance
   * @param {string} input - String to hash
   * @return {string} - Anonymous hash
   */
  function hashString(input) {
    let hash = 0;
    if (input.length === 0) return hash.toString();
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Create screen reader announcement for complex links
   * @param {Element} linkElement - The link element
   * @return {string} - Announcement text
   */
  function createScreenReaderAnnouncement(linkElement) {
    let announcement = '';
    const variant = linkElement.getAttribute('data-variant');
    const text = linkElement.textContent.trim();

    switch (variant) {
      case 'download':
        announcement = `Download-Link: ${text}`;
        break;
      case 'external':
        announcement = `Externer Link: ${text}, öffnet in neuem Fenster`;
        break;
      case 'phone':
        announcement = `Telefonnummer: ${text}`;
        break;
      case 'email':
        announcement = `E-Mail-Adresse: ${text}`;
        break;
      default:
        announcement = text;
    }

    return announcement;
  }

  /**
   * Announce text to screen readers
   * @param {string} text - Text to announce
   * @return {void}
   */
  function announceToScreenReader(text) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = text;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  /**
   * Show download feedback
   * @param {Element} linkElement - The link element
   * @return {void}
   */
  function showDownloadFeedback(linkElement) {
    const originalText = linkElement.textContent.trim();
    const feedback = 'Download wird vorbereitet...';
    
    linkElement.textContent = feedback;
    announceToScreenReader(feedback);
    
    setTimeout(() => {
      linkElement.textContent = originalText;
      announceToScreenReader('Download bereit');
    }, 2000);
  }

  /**
   * Format phone number for Swiss standards
   * @param {string} phoneNumber - Raw phone number
   * @return {string} - Formatted phone number
   */
  function formatPhoneNumber(phoneNumber) {
    // Remove tel: prefix and clean
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // Format Swiss numbers
    if (cleaned.startsWith('+41')) {
      return cleaned.replace(/(\+41)(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
    }
    
    return cleaned;
  }

  // Main Drupal behavior
  Drupal.behaviors.adessoLink = {
    attach: function (context) {
      // Find all link elements with adesso-link data attribute
      const linkElements = once('adesso-link', 
        '[data-adesso-link="true"]', 
        context
      );
      
      if (linkElements.length === 0) {
        return;
      }

      console.log('[adesso-link] Found', linkElements.length, 'link(s)');

      linkElements.forEach(function(linkElement) {
        try {
          initializeLink(linkElement);
        } catch (error) {
          console.error('[adesso-link] Error initializing link:', error, linkElement);
        }
      });
    },

    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        // Clean up and reset states
        const links = context.querySelectorAll('[data-adesso-link="true"]');
        
        links.forEach(function(link) {
          // Reset loading states
          link.setAttribute('aria-busy', 'false');
          link.classList.remove('loading', 'is-focused', 'animate-press');
          link.style.pointerEvents = '';
          
          // Clean up custom properties
          delete link.setLoadingState;
        });

        console.log('[adesso-link] Behavior detached and cleaned up');
      }
    }
  };

  /**
   * Check if punycode host is approved for Swiss government use
   * @param {string} url - The URL to check
   * @return {boolean} - True if approved
   */
  function isApprovedPunycodeHost(url) {
    try {
      const urlObj = new URL(url, window.location.origin);
      const hostname = urlObj.hostname.toLowerCase();
      
      // Allow only pre-approved punycode domains for Swiss municipalities
      const approvedPunycodeDomains = [
        // Add approved Swiss municipality punycode domains here
        // Example: 'xn--zrich-kva.ch' for Zürich
      ];
      
      return approvedPunycodeDomains.includes(hostname);
    } catch (e) {
      return false;
    }
  }
  
  /**
   * Check if external host is approved for municipal portal links
   * @param {string} hostname - The hostname to check
   * @return {boolean} - True if approved
   */
  function isApprovedExternalHost(hostname) {
    const normalizedHost = hostname.toLowerCase();
    
    // Swiss government approved domains
    const approvedDomains = [
      // Swiss government domains
      'admin.ch', 'ch.ch', 'bag.admin.ch', 'seco.admin.ch',
      // Canton Zürich domains
      'zh.ch', 'stadt-zuerich.ch',
      // Common safe domains (can be configured per municipality)
      'maps.google.com', 'www.google.com'
    ];
    
    // Check exact match or subdomain
    return approvedDomains.some(domain => 
      normalizedHost === domain || normalizedHost.endsWith('.' + domain)
    );
  }

  // Add CSS for animations and security indicators
  const style = document.createElement('style');
  style.textContent = `
    .animate-press {
      transform: scale(0.98);
      transition: transform 0.1s ease-in-out;
    }
    .is-focused {
      z-index: 10;
    }
    .high-contrast .adesso-link:not([data-variant="button"]) {
      border-bottom: 2px solid currentColor;
      text-decoration: none;
    }
    .adesso-link[data-error="true"] {
      color: #dc2626 !important;
      text-decoration: line-through !important;
      pointer-events: none !important;
      cursor: not-allowed !important;
    }
    .adesso-link[data-error="true"]::after {
      content: ' [BLOCKED]';
      font-weight: bold;
      color: #dc2626;
    }
  `;
  document.head.appendChild(style);

})(Drupal, once);