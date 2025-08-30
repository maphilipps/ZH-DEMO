/**
 * @file Component-Specific Accessibility Test Modules - Phase 2.3
 * 
 * Specialized accessibility testing modules for different SDC component types
 * following WCAG 2.1 AA and eCH-0059 Swiss government standards.
 * 
 * This module provides targeted testing for:
 * - Form components (inputs, selects, textareas)
 * - Navigation components (menus, breadcrumbs, pagination)
 * - Interactive components (buttons, links, tabs)
 * - Media components (images, videos, carousels)
 * - Layout components (headers, footers, sections)
 */

import { testAccessibility, testSwissCompliance } from './test-utils.js';

// Form Components Accessibility Testing Module
export const accessibilityTestForms = {
  /**
   * Test form component accessibility compliance
   * @param {HTMLElement} formElement - The form element to test
   * @param {Object} options - Testing options
   * @returns {Object} Accessibility test results
   */
  async testFormAccessibility(formElement, options = {}) {
    const results = {
      componentType: 'form',
      isAccessible: true,
      violations: [],
      warnings: [],
      testResults: {}
    };

    // Test 1: Form labels and associations
    const labelTest = await this.testFormLabels(formElement);
    results.testResults.labels = labelTest;
    if (!labelTest.isValid) {
      results.isAccessible = false;
      results.violations.push(...labelTest.violations);
    }

    // Test 2: Required field indicators
    const requiredTest = await this.testRequiredFields(formElement);
    results.testResults.requiredFields = requiredTest;
    if (!requiredTest.isValid) {
      results.warnings.push(...requiredTest.warnings);
    }

    // Test 3: Error message associations
    const errorTest = await this.testErrorMessages(formElement);
    results.testResults.errorMessages = errorTest;
    if (!errorTest.isValid) {
      results.isAccessible = false;
      results.violations.push(...errorTest.violations);
    }

    // Test 4: Keyboard navigation
    const keyboardTest = await this.testFormKeyboardNavigation(formElement);
    results.testResults.keyboardNavigation = keyboardTest;
    if (!keyboardTest.isValid) {
      results.isAccessible = false;
      results.violations.push(...keyboardTest.violations);
    }

    // Test 5: Swiss government form compliance (eCH-0058)
    const swissTest = await testSwissCompliance.validateECH0059(formElement);
    results.testResults.swissCompliance = swissTest;
    if (!swissTest.isCompliant) {
      results.isAccessible = false;
      results.violations.push(...swissTest.violations);
    }

    return results;
  },

  async testFormLabels(formElement) {
    const inputs = formElement.querySelectorAll('input, select, textarea');
    const results = {
      isValid: true,
      violations: [],
      testedElements: inputs.length
    };

    inputs.forEach((input, index) => {
      const id = input.getAttribute('id');
      const label = formElement.querySelector(`label[for="${id}"]`);
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledby = input.getAttribute('aria-labelledby');
      const ariaDescribedby = input.getAttribute('aria-describedby');

      // Check for accessible name
      if (!label && !ariaLabel && !ariaLabelledby) {
        results.isValid = false;
        results.violations.push(`Input ${index} (${input.type}) missing accessible label`);
      }

      // Check for proper label association
      if (label && !id) {
        results.isValid = false;
        results.violations.push(`Input ${index} has label but missing id attribute`);
      }

      // Check for descriptions on complex inputs
      if (['password', 'email', 'date'].includes(input.type) && !ariaDescribedby) {
        results.violations.push(`Input ${index} (${input.type}) should have description for format requirements`);
      }
    });

    return results;
  },

  async testRequiredFields(formElement) {
    const requiredInputs = formElement.querySelectorAll('[required]');
    const results = {
      isValid: true,
      warnings: [],
      requiredCount: requiredInputs.length
    };

    requiredInputs.forEach((input, index) => {
      // Check for visual required indicator
      const label = formElement.querySelector(`label[for="${input.id}"]`);
      if (label) {
        const hasRequiredIndicator = label.textContent.includes('*') || 
                                   label.querySelector('.required') ||
                                   label.getAttribute('aria-required') === 'true';

        if (!hasRequiredIndicator && !input.getAttribute('aria-required')) {
          results.warnings.push(`Required field ${index} missing visual indicator`);
        }
      }

      // Check for aria-required
      if (!input.getAttribute('aria-required')) {
        input.setAttribute('aria-required', 'true');
      }
    });

    return results;
  },

  async testErrorMessages(formElement) {
    const inputs = formElement.querySelectorAll('input, select, textarea');
    const results = {
      isValid: true,
      violations: [],
      testedElements: inputs.length
    };

    inputs.forEach((input, index) => {
      const errorContainer = formElement.querySelector(`[data-error-for="${input.id}"], [aria-describedby*="${input.id}-error"]`);
      const ariaDescribedby = input.getAttribute('aria-describedby');

      // Required fields should have error message containers
      if (input.hasAttribute('required') && !errorContainer) {
        results.violations.push(`Required input ${index} missing error message container`);
      }

      // If error container exists, check aria association
      if (errorContainer && !ariaDescribedby?.includes(errorContainer.id)) {
        results.violations.push(`Input ${index} error container not properly associated with aria-describedby`);
      }
    });

    return results;
  },

  async testFormKeyboardNavigation(formElement) {
    const focusableElements = formElement.querySelectorAll(
      'input, select, textarea, button, [tabindex]:not([tabindex="-1"])'
    );

    const results = {
      isValid: true,
      violations: [],
      focusableCount: focusableElements.length
    };

    // Test tab order
    let tabIndex = 0;
    focusableElements.forEach((element, index) => {
      const explicitTabIndex = element.getAttribute('tabindex');
      
      if (explicitTabIndex && parseInt(explicitTabIndex) > 0) {
        results.violations.push(`Element ${index} uses positive tabindex (${explicitTabIndex}), which can disrupt tab order`);
      }

      // Check for keyboard event handlers on non-standard interactive elements
      if (element.onclick && !['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A'].includes(element.tagName)) {
        const hasKeyHandler = element.onkeydown || element.onkeypress || element.onkeyup;
        if (!hasKeyHandler) {
          results.violations.push(`Element ${index} has click handler but missing keyboard event handler`);
        }
      }
    });

    return results;
  }
};

// Navigation Components Accessibility Testing Module
export const accessibilityTestNavigation = {
  /**
   * Test navigation component accessibility compliance
   * @param {HTMLElement} navElement - The navigation element to test
   * @param {Object} options - Testing options
   * @returns {Object} Accessibility test results
   */
  async testNavigationAccessibility(navElement, options = {}) {
    const results = {
      componentType: 'navigation',
      isAccessible: true,
      violations: [],
      warnings: [],
      testResults: {}
    };

    // Test 1: Navigation landmarks
    const landmarkTest = await this.testNavigationLandmarks(navElement);
    results.testResults.landmarks = landmarkTest;
    if (!landmarkTest.isValid) {
      results.violations.push(...landmarkTest.violations);
    }

    // Test 2: Menu structure and ARIA
    const menuTest = await this.testMenuStructure(navElement);
    results.testResults.menuStructure = menuTest;
    if (!menuTest.isValid) {
      results.isAccessible = false;
      results.violations.push(...menuTest.violations);
    }

    // Test 3: Keyboard navigation
    const keyboardTest = await this.testNavigationKeyboard(navElement);
    results.testResults.keyboardNavigation = keyboardTest;
    if (!keyboardTest.isValid) {
      results.isAccessible = false;
      results.violations.push(...keyboardTest.violations);
    }

    // Test 4: Skip links and bypass mechanisms
    const skipTest = await this.testSkipLinks(navElement);
    results.testResults.skipLinks = skipTest;
    if (!skipTest.isValid) {
      results.warnings.push(...skipTest.warnings);
    }

    return results;
  },

  async testNavigationLandmarks(navElement) {
    const results = {
      isValid: true,
      violations: [],
      landmarkCount: 0
    };

    // Check for nav element or navigation role
    const isNavElement = navElement.tagName === 'NAV';
    const hasNavRole = navElement.getAttribute('role') === 'navigation';
    
    if (!isNavElement && !hasNavRole) {
      results.isValid = false;
      results.violations.push('Navigation container missing nav element or navigation role');
    }

    // Check for accessible name on navigation
    const ariaLabel = navElement.getAttribute('aria-label');
    const ariaLabelledby = navElement.getAttribute('aria-labelledby');
    
    if (!ariaLabel && !ariaLabelledby) {
      results.violations.push('Navigation missing accessible name (aria-label or aria-labelledby)');
    }

    // Count nested navigation landmarks
    const nestedNavs = navElement.querySelectorAll('nav, [role="navigation"]');
    results.landmarkCount = nestedNavs.length + 1;

    return results;
  },

  async testMenuStructure(navElement) {
    const results = {
      isValid: true,
      violations: [],
      menuItems: 0
    };

    // Check for proper menu structure (ul/ol with li)
    const lists = navElement.querySelectorAll('ul, ol');
    const menuItems = navElement.querySelectorAll('li');
    results.menuItems = menuItems.length;

    if (lists.length === 0 && menuItems.length > 0) {
      results.violations.push('Menu items found but not contained in proper list structure');
    }

    // Check for dropdown/submenu accessibility
    const submenus = navElement.querySelectorAll('[aria-haspopup]');
    submenus.forEach((submenu, index) => {
      const expanded = submenu.getAttribute('aria-expanded');
      const controls = submenu.getAttribute('aria-controls');

      if (!expanded) {
        results.violations.push(`Submenu trigger ${index} missing aria-expanded attribute`);
      }

      if (!controls) {
        results.violations.push(`Submenu trigger ${index} missing aria-controls attribute`);
      }

      // Check if controlled element exists
      if (controls) {
        const controlledElement = document.getElementById(controls);
        if (!controlledElement) {
          results.violations.push(`Submenu trigger ${index} aria-controls references non-existent element ${controls}`);
        }
      }
    });

    return results;
  },

  async testNavigationKeyboard(navElement) {
    const results = {
      isValid: true,
      violations: [],
      interactiveElements: 0
    };

    const links = navElement.querySelectorAll('a');
    const buttons = navElement.querySelectorAll('button');
    results.interactiveElements = links.length + buttons.length;

    // Test link accessibility
    links.forEach((link, index) => {
      if (!link.getAttribute('href') && !link.getAttribute('role')) {
        results.violations.push(`Link ${index} missing href attribute or alternative role`);
      }

      const linkText = link.textContent.trim() || link.getAttribute('aria-label');
      if (!linkText) {
        results.violations.push(`Link ${index} missing accessible text`);
      }

      // Check for generic link text
      const genericTexts = ['click here', 'read more', 'more', 'link'];
      if (genericTexts.includes(linkText.toLowerCase())) {
        results.violations.push(`Link ${index} uses generic text "${linkText}" - should be more descriptive`);
      }
    });

    // Test button accessibility
    buttons.forEach((button, index) => {
      const buttonText = button.textContent.trim() || button.getAttribute('aria-label');
      if (!buttonText) {
        results.violations.push(`Button ${index} missing accessible text`);
      }
    });

    return results;
  },

  async testSkipLinks(navElement) {
    const results = {
      isValid: true,
      warnings: [],
      skipLinksFound: 0
    };

    // Look for skip links (usually at the beginning of navigation)
    const skipLinks = navElement.querySelectorAll('a[href^="#"]');
    const skipToMain = Array.from(skipLinks).find(link => 
      link.textContent.toLowerCase().includes('skip') &&
      (link.textContent.toLowerCase().includes('main') || 
       link.textContent.toLowerCase().includes('content'))
    );

    if (!skipToMain && navElement.closest('header, .site-header')) {
      results.warnings.push('Main navigation missing skip to main content link');
    }

    results.skipLinksFound = skipLinks.length;
    return results;
  }
};

// Interactive Components Accessibility Testing Module
export const accessibilityTestInteractive = {
  /**
   * Test interactive component accessibility compliance
   * @param {HTMLElement} element - The interactive element to test
   * @param {Object} options - Testing options
   * @returns {Object} Accessibility test results
   */
  async testInteractiveAccessibility(element, options = {}) {
    const results = {
      componentType: 'interactive',
      isAccessible: true,
      violations: [],
      warnings: [],
      testResults: {}
    };

    // Test 1: Button accessibility
    if (element.matches('button, [role="button"]')) {
      const buttonTest = await this.testButtonAccessibility(element);
      results.testResults.button = buttonTest;
      if (!buttonTest.isValid) {
        results.isAccessible = false;
        results.violations.push(...buttonTest.violations);
      }
    }

    // Test 2: Link accessibility
    if (element.matches('a, [role="link"]')) {
      const linkTest = await this.testLinkAccessibility(element);
      results.testResults.link = linkTest;
      if (!linkTest.isValid) {
        results.isAccessible = false;
        results.violations.push(...linkTest.violations);
      }
    }

    // Test 3: Tab interface accessibility
    if (element.matches('[role="tab"], [role="tablist"], [role="tabpanel"]')) {
      const tabTest = await this.testTabAccessibility(element);
      results.testResults.tabs = tabTest;
      if (!tabTest.isValid) {
        results.isAccessible = false;
        results.violations.push(...tabTest.violations);
      }
    }

    // Test 4: Touch target size (Swiss requirement: 44px minimum)
    const touchTest = await this.testTouchTargets(element);
    results.testResults.touchTargets = touchTest;
    if (!touchTest.isValid) {
      results.warnings.push(...touchTest.warnings);
    }

    // Test 5: Focus management
    const focusTest = await this.testFocusManagement(element);
    results.testResults.focusManagement = focusTest;
    if (!focusTest.isValid) {
      results.isAccessible = false;
      results.violations.push(...focusTest.violations);
    }

    return results;
  },

  async testButtonAccessibility(button) {
    const results = {
      isValid: true,
      violations: [],
      buttonType: button.tagName.toLowerCase()
    };

    // Check for accessible name
    const accessibleName = button.textContent.trim() || 
                          button.getAttribute('aria-label') ||
                          button.getAttribute('aria-labelledby');

    if (!accessibleName) {
      results.isValid = false;
      results.violations.push('Button missing accessible name');
    }

    // Check button type
    if (button.tagName === 'BUTTON' && !button.getAttribute('type')) {
      button.setAttribute('type', 'button'); // Default to button to prevent form submission
    }

    // Check for proper role on non-button elements
    if (button.tagName !== 'BUTTON' && button.getAttribute('role') !== 'button') {
      results.violations.push('Non-button element with button behavior missing role="button"');
    }

    // Check for keyboard event handlers on non-button elements
    if (button.tagName !== 'BUTTON') {
      const hasKeyHandler = button.onkeydown || button.onkeypress || button.getAttribute('onkeydown');
      if (!hasKeyHandler) {
        results.violations.push('Non-button element missing keyboard event handlers');
      }
    }

    return results;
  },

  async testLinkAccessibility(link) {
    const results = {
      isValid: true,
      violations: [],
      linkType: link.getAttribute('href') ? 'external' : 'internal'
    };

    // Check for href or proper button role
    const href = link.getAttribute('href');
    const role = link.getAttribute('role');

    if (!href && role !== 'button') {
      results.violations.push('Link missing href attribute or button role');
    }

    // Check for accessible name
    const accessibleName = link.textContent.trim() || 
                          link.getAttribute('aria-label') ||
                          link.getAttribute('aria-labelledby');

    if (!accessibleName) {
      results.isValid = false;
      results.violations.push('Link missing accessible name');
    }

    // Check for context in link text
    if (accessibleName) {
      const genericTexts = ['click here', 'read more', 'more', 'link', 'here'];
      if (genericTexts.includes(accessibleName.toLowerCase())) {
        results.violations.push(`Link text "${accessibleName}" is not descriptive`);
      }
    }

    // Check for external link indicators
    if (href && (href.startsWith('http') && !href.includes(window.location.hostname))) {
      const hasExternalIndicator = link.querySelector('[aria-hidden="true"]') ||
                                  link.getAttribute('aria-label')?.includes('external') ||
                                  link.getAttribute('title')?.includes('external');
      
      if (!hasExternalIndicator) {
        results.violations.push('External link missing indicator for screen readers');
      }
    }

    return results;
  },

  async testTabAccessibility(element) {
    const results = {
      isValid: true,
      violations: [],
      elementRole: element.getAttribute('role')
    };

    const role = element.getAttribute('role');

    if (role === 'tablist') {
      // Test tablist
      const tabs = element.querySelectorAll('[role="tab"]');
      if (tabs.length === 0) {
        results.violations.push('Tablist contains no tab elements');
      }

      tabs.forEach((tab, index) => {
        const controls = tab.getAttribute('aria-controls');
        const selected = tab.getAttribute('aria-selected');

        if (!controls) {
          results.violations.push(`Tab ${index} missing aria-controls attribute`);
        }

        if (!selected) {
          results.violations.push(`Tab ${index} missing aria-selected attribute`);
        }

        if (controls) {
          const panel = document.getElementById(controls);
          if (!panel) {
            results.violations.push(`Tab ${index} aria-controls references non-existent panel ${controls}`);
          }
        }
      });
    } else if (role === 'tab') {
      // Test individual tab
      const controls = element.getAttribute('aria-controls');
      const selected = element.getAttribute('aria-selected');

      if (!controls) {
        results.violations.push('Tab missing aria-controls attribute');
      }

      if (!selected) {
        results.violations.push('Tab missing aria-selected attribute');
      }
    } else if (role === 'tabpanel') {
      // Test tab panel
      const labelledby = element.getAttribute('aria-labelledby');
      
      if (!labelledby) {
        results.violations.push('Tab panel missing aria-labelledby attribute');
      }
    }

    return results;
  },

  async testTouchTargets(element) {
    const results = {
      isValid: true,
      warnings: [],
      measurements: {}
    };

    const rect = element.getBoundingClientRect();
    const minTouchTarget = 44; // Swiss/WCAG requirement: 44px minimum

    results.measurements = {
      width: rect.width,
      height: rect.height,
      area: rect.width * rect.height
    };

    if (rect.width < minTouchTarget || rect.height < minTouchTarget) {
      results.isValid = false;
      results.warnings.push(`Touch target too small: ${rect.width}x${rect.height}px (minimum: ${minTouchTarget}x${minTouchTarget}px)`);
    }

    // Check spacing between touch targets
    const siblings = Array.from(element.parentElement?.children || []);
    const interactiveSiblings = siblings.filter(el => 
      el !== element && 
      (el.matches('a, button, input, [tabindex], [role="button"], [role="link"]'))
    );

    interactiveSiblings.forEach(sibling => {
      const siblingRect = sibling.getBoundingClientRect();
      const distance = Math.min(
        Math.abs(rect.right - siblingRect.left),
        Math.abs(rect.left - siblingRect.right),
        Math.abs(rect.bottom - siblingRect.top),
        Math.abs(rect.top - siblingRect.bottom)
      );

      if (distance < 8) { // Minimum 8px spacing
        results.warnings.push(`Touch targets too close together: ${distance}px spacing`);
      }
    });

    return results;
  },

  async testFocusManagement(element) {
    const results = {
      isValid: true,
      violations: [],
      focusable: false
    };

    // Check if element is focusable
    const tabIndex = element.getAttribute('tabindex');
    const isFocusableElement = element.matches('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    results.focusable = isFocusableElement || (tabIndex && tabIndex !== '-1');

    if (results.focusable) {
      // Check for visible focus indicator
      try {
        element.focus();
        const focusedStyle = window.getComputedStyle(element, ':focus');
        
        const hasOutline = focusedStyle.outline !== 'none' && focusedStyle.outlineWidth !== '0px';
        const hasBoxShadow = focusedStyle.boxShadow !== 'none';
        const hasBorder = focusedStyle.borderColor !== 'initial';

        if (!hasOutline && !hasBoxShadow && !hasBorder) {
          results.violations.push('Focusable element missing visible focus indicator');
        }

        element.blur(); // Clean up
      } catch (error) {
        results.violations.push('Element cannot receive focus programmatically');
      }
    }

    // Check for positive tabindex (anti-pattern)
    if (tabIndex && parseInt(tabIndex) > 0) {
      results.violations.push(`Element uses positive tabindex (${tabIndex}) which can disrupt tab order`);
    }

    return results;
  }
};

// Media Components Accessibility Testing Module  
export const accessibilityTestMedia = {
  /**
   * Test media component accessibility compliance
   * @param {HTMLElement} mediaElement - The media element to test
   * @param {Object} options - Testing options
   * @returns {Object} Accessibility test results
   */
  async testMediaAccessibility(mediaElement, options = {}) {
    const results = {
      componentType: 'media',
      isAccessible: true,
      violations: [],
      warnings: [],
      testResults: {}
    };

    // Test images
    const images = mediaElement.querySelectorAll('img');
    if (images.length > 0) {
      const imageTest = await this.testImageAccessibility(images);
      results.testResults.images = imageTest;
      if (!imageTest.isValid) {
        results.isAccessible = false;
        results.violations.push(...imageTest.violations);
      }
    }

    // Test videos
    const videos = mediaElement.querySelectorAll('video');
    if (videos.length > 0) {
      const videoTest = await this.testVideoAccessibility(videos);
      results.testResults.videos = videoTest;
      if (!videoTest.isValid) {
        results.isAccessible = false;
        results.violations.push(...videoTest.violations);
      }
    }

    // Test carousels/sliders
    if (mediaElement.matches('[data-carousel], .carousel, .slider, .swiper')) {
      const carouselTest = await this.testCarouselAccessibility(mediaElement);
      results.testResults.carousel = carouselTest;
      if (!carouselTest.isValid) {
        results.isAccessible = false;
        results.violations.push(...carouselTest.violations);
      }
    }

    return results;
  },

  async testImageAccessibility(images) {
    const results = {
      isValid: true,
      violations: [],
      testedImages: images.length
    };

    Array.from(images).forEach((img, index) => {
      const alt = img.getAttribute('alt');
      const role = img.getAttribute('role');
      const ariaHidden = img.getAttribute('aria-hidden');

      // Decorative images
      if (role === 'presentation' || ariaHidden === 'true') {
        if (alt !== null && alt !== '') {
          results.violations.push(`Decorative image ${index} should have empty alt attribute`);
        }
        return;
      }

      // Content images must have alt text
      if (alt === null) {
        results.isValid = false;
        results.violations.push(`Image ${index} missing alt attribute`);
      } else if (alt === '') {
        // Empty alt might be acceptable for decorative images
        results.violations.push(`Image ${index} has empty alt - confirm if decorative`);
      }

      // Check for redundant alt text
      if (alt && (alt.toLowerCase().includes('image') || alt.toLowerCase().includes('picture'))) {
        results.violations.push(`Image ${index} alt text contains redundant words: "${alt}"`);
      }

      // Check for complex images
      const longDesc = img.getAttribute('longdesc') || img.getAttribute('aria-describedby');
      const isComplex = img.closest('figure') || img.parentElement.querySelector('figcaption');
      
      if (isComplex && !longDesc && alt && alt.length > 100) {
        results.violations.push(`Complex image ${index} should use longdesc or aria-describedby for detailed description`);
      }
    });

    return results;
  },

  async testVideoAccessibility(videos) {
    const results = {
      isValid: true,
      violations: [],
      testedVideos: videos.length
    };

    Array.from(videos).forEach((video, index) => {
      // Check for captions
      const captions = video.querySelectorAll('track[kind="captions"], track[kind="subtitles"]');
      if (captions.length === 0) {
        results.violations.push(`Video ${index} missing captions/subtitles`);
      }

      // Check for audio description
      const audioDesc = video.querySelectorAll('track[kind="descriptions"]');
      const hasVisualContent = !video.getAttribute('data-audio-only');
      
      if (hasVisualContent && audioDesc.length === 0) {
        results.violations.push(`Video ${index} with visual content missing audio descriptions`);
      }

      // Check for keyboard controls
      const controls = video.getAttribute('controls');
      if (!controls) {
        results.violations.push(`Video ${index} missing keyboard-accessible controls`);
      }

      // Check for autoplay (accessibility issue)
      const autoplay = video.getAttribute('autoplay');
      if (autoplay) {
        results.violations.push(`Video ${index} uses autoplay which can cause accessibility issues`);
      }

      // Check for title/accessible name
      const title = video.getAttribute('title') || video.getAttribute('aria-label');
      if (!title) {
        results.violations.push(`Video ${index} missing descriptive title or aria-label`);
      }
    });

    return results;
  },

  async testCarouselAccessibility(carousel) {
    const results = {
      isValid: true,
      violations: [],
      itemCount: 0
    };

    // Check for proper carousel structure
    const items = carousel.querySelectorAll('.carousel-item, .slide, .swiper-slide');
    results.itemCount = items.length;

    if (items.length === 0) {
      results.violations.push('Carousel container has no identifiable items');
      return results;
    }

    // Check for ARIA live region
    const liveRegion = carousel.querySelector('[aria-live]') || carousel.getAttribute('aria-live');
    if (!liveRegion) {
      results.violations.push('Carousel missing aria-live region for screen reader announcements');
    }

    // Check for navigation controls
    const prevButton = carousel.querySelector('[data-prev], .prev, .carousel-prev');
    const nextButton = carousel.querySelector('[data-next], .next, .carousel-next');
    
    if (!prevButton || !nextButton) {
      results.violations.push('Carousel missing previous/next navigation buttons');
    } else {
      // Check button accessibility
      [prevButton, nextButton].forEach((button, index) => {
        const buttonName = button.textContent.trim() || button.getAttribute('aria-label');
        if (!buttonName) {
          results.violations.push(`Carousel navigation button ${index} missing accessible name`);
        }
      });
    }

    // Check for indicators/pagination
    const indicators = carousel.querySelectorAll('.carousel-indicators button, .pagination button');
    if (indicators.length > 0) {
      indicators.forEach((indicator, index) => {
        const ariaLabel = indicator.getAttribute('aria-label');
        if (!ariaLabel) {
          results.violations.push(`Carousel indicator ${index} missing aria-label`);
        }
      });
    }

    // Check for play/pause controls if auto-playing
    const autoplay = carousel.getAttribute('data-autoplay') || carousel.classList.contains('autoplay');
    if (autoplay) {
      const playPause = carousel.querySelector('[data-play-pause], .play-pause');
      if (!playPause) {
        results.violations.push('Auto-playing carousel missing play/pause control');
      }
    }

    // Check keyboard navigation
    const tabIndex = carousel.getAttribute('tabindex');
    if (tabIndex === null) {
      carousel.setAttribute('tabindex', '0');
    }

    return results;
  }
};

export default {
  accessibilityTestForms,
  accessibilityTestNavigation, 
  accessibilityTestInteractive,
  accessibilityTestMedia
};