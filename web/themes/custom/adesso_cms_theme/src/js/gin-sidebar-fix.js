/**
 * @file gin-sidebar-fix.js
 * 
 * Fix for Gin theme sidebar.js querySelector errors during Frontend Editing
 * Prevents null reference errors when Gin sidebar elements don't exist in frontend editing mode
 */

(function (Drupal, once) {
  'use strict';

  // Frontend Editing Gin Sidebar Error Fix
  Drupal.behaviors.ginSidebarErrorFix = {
    attach: function (context, settings) {
      
      // Patch Gin sidebar functions before they get called
      this.patchGinSidebarFunctions();
      
      // Add global error handler for sidebar errors
      this.addErrorHandling();
    },
    
    patchGinSidebarFunctions: function() {
      // Wait for Gin sidebar to be available and patch its functions
      const patchSidebar = () => {
        if (typeof window.Drupal?.ginSidebar !== 'undefined') {
          const originalCollapseSidebar = window.Drupal.ginSidebar.collapseSidebar;
          const originalShowSidebar = window.Drupal.ginSidebar.showSidebar;
          
          // Patch collapseSidebar to handle missing elements
          window.Drupal.ginSidebar.collapseSidebar = () => {
            try {
              const sidebarTrigger = document.querySelector('.meta-sidebar__trigger');
              if (!sidebarTrigger) {
                console.debug('Gin sidebar trigger not found, skipping collapse');
                return;
              }
              
              const spanElement = sidebarTrigger.querySelector('span');
              if (!spanElement) {
                console.debug('Gin sidebar trigger span not found, skipping collapse');
                return;
              }
              
              return originalCollapseSidebar();
            } catch (error) {
              console.debug('Gin sidebar collapseSidebar error caught:', error.message);
            }
          };
          
          // Patch showSidebar to handle missing elements
          window.Drupal.ginSidebar.showSidebar = () => {
            try {
              const sidebarTrigger = document.querySelector('.meta-sidebar__trigger');
              if (!sidebarTrigger) {
                console.debug('Gin sidebar trigger not found, skipping show');
                return;
              }
              
              const spanElement = sidebarTrigger.querySelector('span');
              if (!spanElement) {
                console.debug('Gin sidebar trigger span not found, skipping show');
                return;
              }
              
              return originalShowSidebar();
            } catch (error) {
              console.debug('Gin sidebar showSidebar error caught:', error.message);
            }
          };
          
          console.debug('Gin sidebar functions patched successfully');
        } else {
          // Retry if Gin sidebar not available yet
          setTimeout(patchSidebar, 100);
        }
      };
      
      // Start patching process
      patchSidebar();
    },
    
    addErrorHandling: function() {
      // Global error handler for uncaught sidebar errors
      window.addEventListener('error', function(event) {
        const message = event.message || '';
        
        // Catch querySelector errors related to sidebar
        if (message.includes('Cannot read properties of null') && 
            (message.includes('querySelector') || message.includes('span'))) {
          console.debug('Gin sidebar querySelector error suppressed:', message);
          event.preventDefault();
          return false;
        }
        
        // Catch specific sidebar trigger errors
        if (message.includes('meta-sidebar__trigger')) {
          console.debug('Gin sidebar trigger error suppressed:', message);
          event.preventDefault();
          return false;
        }
      }, true);
      
      // Handle ResizeObserver errors specifically
      if (typeof ResizeObserver !== 'undefined') {
        const originalObserve = ResizeObserver.prototype.observe;
        
        ResizeObserver.prototype.observe = function(target) {
          try {
            return originalObserve.call(this, target);
          } catch (error) {
            if (error.message.includes('sidebar') || error.message.includes('trigger')) {
              console.debug('ResizeObserver sidebar error caught:', error.message);
              return;
            }
            throw error;
          }
        };
      }
    }
  };

})(Drupal, once);