/**
 * @file
 * Accordion interactive behavior with Flowbite integration.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Initialize accordion functionality
   * @param {Element} accordionElement - The accordion container element
   * @return {void}
   */
  function initializeAccordion(accordionElement) {
    const accordionItems = accordionElement.querySelectorAll('[data-accordion-target]');
    
    if (accordionItems.length === 0) {
      console.warn('[adesso-accordion] No accordion items found');
      return;
    }

    // Enhanced keyboard navigation for accordion
    accordionItems.forEach(function(trigger) {
      // ARIA improvements
      const targetId = trigger.getAttribute('data-accordion-target');
      const targetPanel = document.querySelector(targetId);
      
      if (targetPanel) {
        // Ensure proper ARIA relationships
        trigger.setAttribute('aria-controls', targetId.replace('#', ''));
        targetPanel.setAttribute('role', 'region');
        
        // Add focus management
        trigger.addEventListener('keydown', function(e) {
          const currentIndex = Array.from(accordionItems).indexOf(trigger);
          let nextIndex;
          
          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              nextIndex = (currentIndex + 1) % accordionItems.length;
              accordionItems[nextIndex].focus();
              break;
              
            case 'ArrowUp':
              e.preventDefault();
              nextIndex = currentIndex === 0 ? accordionItems.length - 1 : currentIndex - 1;
              accordionItems[nextIndex].focus();
              break;
              
            case 'Home':
              e.preventDefault();
              accordionItems[0].focus();
              break;
              
            case 'End':
              e.preventDefault();
              accordionItems[accordionItems.length - 1].focus();
              break;
              
            case 'Enter':
            case ' ':
              e.preventDefault();
              trigger.click();
              break;
          }
        });

        // Enhanced click handling with animation support
        trigger.addEventListener('click', function(e) {
          e.preventDefault();
          
          const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
          const activeClasses = accordionElement.getAttribute('data-active-classes') || '';
          const inactiveClasses = accordionElement.getAttribute('data-inactive-classes') || '';
          
          // Toggle ARIA state
          trigger.setAttribute('aria-expanded', !isExpanded);
          
          // Toggle panel visibility with smooth animation
          if (isExpanded) {
            // Collapse
            targetPanel.style.maxHeight = targetPanel.scrollHeight + 'px';
            requestAnimationFrame(function() {
              targetPanel.style.maxHeight = '0px';
              targetPanel.style.opacity = '0';
            });
            
            // Update classes
            if (activeClasses) {
              trigger.classList.remove(...activeClasses.split(' '));
            }
            if (inactiveClasses) {
              trigger.classList.add(...inactiveClasses.split(' '));
            }
          } else {
            // Expand
            targetPanel.style.maxHeight = targetPanel.scrollHeight + 'px';
            targetPanel.style.opacity = '1';
            
            // Update classes
            if (inactiveClasses) {
              trigger.classList.remove(...inactiveClasses.split(' '));
            }
            if (activeClasses) {
              trigger.classList.add(...activeClasses.split(' '));
            }
          }
          
          // Clean up maxHeight after animation
          setTimeout(function() {
            if (!isExpanded) {
              targetPanel.style.maxHeight = 'none';
            }
          }, 300);
        });
      }
    });

    // Set up proper initial state
    accordionItems.forEach(function(trigger, index) {
      const targetId = trigger.getAttribute('data-accordion-target');
      const targetPanel = document.querySelector(targetId);
      const isInitiallyExpanded = trigger.getAttribute('aria-expanded') === 'true';
      
      if (targetPanel) {
        if (isInitiallyExpanded) {
          targetPanel.style.maxHeight = 'none';
          targetPanel.style.opacity = '1';
        } else {
          targetPanel.style.maxHeight = '0px';
          targetPanel.style.opacity = '0';
          targetPanel.style.overflow = 'hidden';
        }
        
        // Add smooth transitions
        targetPanel.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
      }
    });

    console.log('[adesso-accordion] Initialized accordion with', accordionItems.length, 'items');
  }

  // Main Drupal behavior
  Drupal.behaviors.adessoAccordion = {
    attach: function (context) {
      // Find accordion containers
      const accordionElements = once('adesso-accordion', '[data-accordion="collapse"]', context);
      
      if (accordionElements.length === 0) {
        return;
      }

      console.log('[adesso-accordion] Found', accordionElements.length, 'accordion(s)');

      accordionElements.forEach(function(accordionElement) {
        initializeAccordion(accordionElement);
      });
    },

    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        // Clean up event listeners and styles
        const accordions = context.querySelectorAll('[data-accordion="collapse"]');
        
        accordions.forEach(function(accordion) {
          const items = accordion.querySelectorAll('[data-accordion-target]');
          items.forEach(function(item) {
            // Reset inline styles
            const targetId = item.getAttribute('data-accordion-target');
            const targetPanel = document.querySelector(targetId);
            if (targetPanel) {
              targetPanel.style.maxHeight = '';
              targetPanel.style.opacity = '';
              targetPanel.style.transition = '';
              targetPanel.style.overflow = '';
            }
          });
        });
      }
    }
  };

})(Drupal, once);