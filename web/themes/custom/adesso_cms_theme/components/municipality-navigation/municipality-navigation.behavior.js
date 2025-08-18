/**
 * @file
 * Municipality Navigation Component Behavior
 * 
 * Provides interactive functionality for the municipality navigation
 * including mobile menu, dropdowns, and search integration.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Alpine.js component for municipality navigation
   */
  window.municipalityNavigation = function() {
    return {
      mobileMenuOpen: false,
      searchOpen: false,
      currentMunicipality: '',
      
      /**
       * Initialize the navigation component
       */
      init() {
        // Get current municipality from body class or data attribute
        this.currentMunicipality = this.detectMunicipality();
        
        // Listen for search events
        this.$watch('searchOpen', value => {
          if (value) {
            this.openSearch();
          }
        });
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            this.mobileMenuOpen = false;
            this.searchOpen = false;
          }
        });
        
        // Handle resize events
        window.addEventListener('resize', () => {
          if (window.innerWidth >= 1024) { // lg breakpoint
            this.mobileMenuOpen = false;
          }
        });
      },
      
      /**
       * Detect current municipality from context
       */
      detectMunicipality() {
        const bodyClasses = document.body.classList;
        const municipalities = ['thalwil', 'thalheim', 'erlenbach'];
        
        for (let municipality of municipalities) {
          if (bodyClasses.contains(`municipality-${municipality}`)) {
            return municipality;
          }
        }
        
        // Check URL path
        const path = window.location.pathname;
        for (let municipality of municipalities) {
          if (path.includes(municipality)) {
            return municipality;
          }
        }
        
        return 'thalwil'; // Default
      },
      
      /**
       * Open AI-enhanced search modal
       */
      openSearch() {
        // Dispatch custom event for search modal
        const event = new CustomEvent('municipality-search-open', {
          detail: {
            municipality: this.currentMunicipality
          }
        });
        document.dispatchEvent(event);
      },
      
      /**
       * Toggle mobile menu with accessibility
       */
      toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        
        // Update ARIA attributes
        const button = this.$el.querySelector('[aria-label="Hauptmenü öffnen"]');
        if (button) {
          button.setAttribute('aria-expanded', this.mobileMenuOpen);
        }
        
        // Trap focus when mobile menu is open
        if (this.mobileMenuOpen) {
          this.trapFocus();
        } else {
          this.releaseFocus();
        }
      },
      
      /**
       * Trap focus within mobile menu
       */
      trapFocus() {
        const focusableElements = this.$el.querySelectorAll(
          'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        this.handleTabKey = (e) => {
          if (e.key !== 'Tab') return;
          
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        };
        
        document.addEventListener('keydown', this.handleTabKey);
      },
      
      /**
       * Release focus trap
       */
      releaseFocus() {
        if (this.handleTabKey) {
          document.removeEventListener('keydown', this.handleTabKey);
        }
      },
      
      /**
       * Handle dropdown keyboard navigation
       */
      handleDropdownKeyboard(event, isOpen) {
        const key = event.key;
        const dropdown = event.currentTarget.parentElement;
        
        switch(key) {
          case 'Enter':
          case ' ':
            event.preventDefault();
            return !isOpen;
            
          case 'Escape':
            event.preventDefault();
            return false;
            
          case 'ArrowDown':
            if (isOpen) {
              event.preventDefault();
              const firstLink = dropdown.querySelector('.absolute a');
              if (firstLink) firstLink.focus();
            }
            return isOpen;
            
          default:
            return isOpen;
        }
      }
    };
  };

  /**
   * Attach behavior to municipality navigation
   */
  Drupal.behaviors.municipalityNavigation = {
    attach: function (context, settings) {
      once('municipality-navigation', '.municipality-navigation', context).forEach(function (element) {
        // Initialize Alpine component if not already initialized
        if (!element._x_dataStack) {
          Alpine.initTree(element);
        }
        
        // Add municipality-specific theming
        const municipality = element.dataset.municipality || 'thalwil';
        document.body.classList.add(`municipality-${municipality}`);
        
        // Performance: Preload municipality assets
        const logoUrl = `/themes/custom/adesso_cms_theme/assets/logos/${municipality}-logo.svg`;
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = logoUrl;
        document.head.appendChild(link);
      });
    }
  };

})(Drupal, once);