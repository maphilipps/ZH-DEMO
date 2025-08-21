/**
 * @file
 * File Upload Preview behavior for Alpine.js integration.
 */

(function (Drupal, Alpine) {
  'use strict';

  /**
   * File Upload Preview behavior.
   *
   * Provides enhanced file upload functionality with drag & drop,
   * image previews, and progress tracking for Infrastructure Damage Reports.
   */
  Drupal.behaviors.fileUploadPreview = {
    attach: function (context, settings) {
      // Initialize Alpine.js components when DOM is ready
      if (typeof Alpine !== 'undefined') {
        // Ensure Alpine.js has access to our file upload components
        const uploadComponents = context.querySelectorAll('.file-upload-preview');
        
        uploadComponents.forEach(component => {
          if (!component.hasAttribute('data-alpine-initialized')) {
            // Mark as initialized to prevent double initialization
            component.setAttribute('data-alpine-initialized', 'true');
            
            // Add drag and drop event listeners
            this.initializeDragAndDrop(component);
          }
        });
      }
    },

    /**
     * Initialize drag and drop functionality.
     *
     * @param {Element} component - The file upload component element.
     */
    initializeDragAndDrop: function (component) {
      const uploadArea = component.querySelector('.border-dashed');
      
      if (uploadArea) {
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
          uploadArea.addEventListener(eventName, this.preventDefaults, false);
          document.body.addEventListener(eventName, this.preventDefaults, false);
        });

        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
          uploadArea.addEventListener(eventName, this.highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
          uploadArea.addEventListener(eventName, this.unhighlight, false);
        });

        // Handle dropped files
        uploadArea.addEventListener('drop', this.handleDrop, false);
      }
    },

    /**
     * Prevent default drag behaviors.
     *
     * @param {Event} e - The drag event.
     */
    preventDefaults: function (e) {
      e.preventDefault();
      e.stopPropagation();
    },

    /**
     * Highlight drop area.
     *
     * @param {Event} e - The drag event.
     */
    highlight: function (e) {
      e.currentTarget.classList.add('border-blue-400', 'bg-blue-50');
    },

    /**
     * Remove highlight from drop area.
     *
     * @param {Event} e - The drag event.
     */
    unhighlight: function (e) {
      e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
    },

    /**
     * Handle dropped files.
     *
     * @param {Event} e - The drop event.
     */
    handleDrop: function (e) {
      const dt = e.dataTransfer;
      const files = dt.files;

      // Trigger Alpine.js file processing
      const fileInput = e.currentTarget.querySelector('input[type="file"]');
      if (fileInput) {
        // Create a new FileList object and assign it to the input
        const dataTransfer = new DataTransfer();
        Array.from(files).forEach(file => dataTransfer.items.add(file));
        fileInput.files = dataTransfer.files;

        // Trigger the change event to process files through Alpine.js
        const changeEvent = new Event('change', { bubbles: true });
        fileInput.dispatchEvent(changeEvent);
      }
    }
  };

})(Drupal, window.Alpine);