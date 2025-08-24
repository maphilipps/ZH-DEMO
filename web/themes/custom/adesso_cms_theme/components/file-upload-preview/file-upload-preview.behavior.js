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
      // Initialize Alpine.js component data
      this.initializeAlpineComponent();
      
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
     * Initialize Alpine.js component data for file upload preview.
     */
    initializeAlpineComponent: function() {
      if (typeof Alpine !== 'undefined' && typeof document !== 'undefined') {
        document.addEventListener('alpine:init', () => {
          Alpine.data('fileUploadPreview', () => ({
            files: [],
            maxFiles: 3,
            maxFileSize: '5 MB',
            allowedTypes: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
            uploadUrl: '/upload',
            validationError: '',

            init() {
              // Safely parse data attributes from the DOM element
              const element = this.$el;
              
              try {
                // Parse files from data attribute
                const filesData = element.getAttribute('data-files');
                if (filesData) {
                  this.files = JSON.parse(filesData);
                }
              } catch (e) {
                console.warn('Failed to parse files data:', e);
                this.files = [];
              }
              
              // Parse other data attributes safely
              const maxFiles = element.getAttribute('data-max-files');
              if (maxFiles && !isNaN(parseInt(maxFiles))) {
                this.maxFiles = parseInt(maxFiles);
              }
              
              const maxFileSize = element.getAttribute('data-max-file-size');
              if (maxFileSize) {
                this.maxFileSize = maxFileSize;
              }
              
              try {
                const allowedTypesData = element.getAttribute('data-allowed-types');
                if (allowedTypesData) {
                  this.allowedTypes = JSON.parse(allowedTypesData);
                }
              } catch (e) {
                console.warn('Failed to parse allowed types data:', e);
              }
              
              const uploadUrl = element.getAttribute('data-upload-url');
              if (uploadUrl) {
                this.uploadUrl = uploadUrl;
              }
            },

            handleFileSelect(event) {
              const selectedFiles = Array.from(event.target.files);
              
              // Validate file count
              if (this.files.length + selectedFiles.length > this.maxFiles) {
                this.validationError = `Maximal ${this.maxFiles} Dateien erlaubt. Sie haben bereits ${this.files.length} Datei(en) hochgeladen.`;
                return;
              }

              selectedFiles.forEach(file => this.processFile(file));
              event.target.value = ''; // Reset input
            },

            processFile(file) {
              // Validate file type (extension + MIME type)
              const extension = file.name.split('.').pop().toLowerCase();
              if (!this.allowedTypes.includes(extension)) {
                this.validationError = `Dateityp .${extension} ist nicht erlaubt. Erlaubte Typen: ${this.allowedTypes.join(', ')}`;
                return;
              }

              // Validate MIME type for security
              const allowedMimeTypes = {
                'jpg': ['image/jpeg'],
                'jpeg': ['image/jpeg'],
                'png': ['image/png'],
                'pdf': ['application/pdf'],
                'doc': ['application/msword'],
                'docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document']
              };

              if (allowedMimeTypes[extension] && !allowedMimeTypes[extension].includes(file.type)) {
                this.validationError = `Dateityp stimmt nicht überein. Erwarteter MIME-Type für .${extension}: ${allowedMimeTypes[extension].join(', ')}, erhalten: ${file.type}`;
                return;
              }

              // Validate file size (client-side check, server-side validation required)
              const maxSize = this.parseFileSize(this.maxFileSize);
              if (file.size > maxSize) {
                this.validationError = `Datei ist zu groß (${this.formatFileSize(file.size)}). Maximal erlaubt: ${this.maxFileSize}`;
                return;
              }

              // Sanitize filename to prevent path traversal
              const sanitizedName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');

              // Create file object
              const fileObj = {
                id: Date.now() + Math.random(),
                name: sanitizedName,
                originalName: file.name,
                size: this.formatFileSize(file.size),
                type: file.type,
                preview_url: '',
                upload_progress: 0,
                status: 'uploading',
                error_message: ''
              };

              // Generate preview for images
              if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  fileObj.preview_url = e.target.result;
                  this.$nextTick(() => this.$forceUpdate());
                };
                reader.readAsDataURL(file);
              }

              this.files.push(fileObj);
              this.validationError = '';

              // Simulate upload process
              this.simulateUpload(fileObj);
            },

            simulateUpload(fileObj) {
              let progress = 0;
              const interval = setInterval(() => {
                progress += Math.random() * 30;
                if (progress >= 100) {
                  progress = 100;
                  fileObj.upload_progress = progress;
                  fileObj.status = 'completed';
                  clearInterval(interval);
                } else {
                  fileObj.upload_progress = Math.floor(progress);
                }
              }, 200);
            },

            removeFile(fileId) {
              this.files = this.files.filter(file => file.id != fileId);
              this.validationError = '';
            },

            cancelUpload(fileId) {
              this.removeFile(fileId);
            },

            formatFileSize(bytes) {
              if (bytes === 0) return '0 Bytes';
              const k = 1024;
              const sizes = ['Bytes', 'KB', 'MB', 'GB'];
              const i = Math.floor(Math.log(bytes) / Math.log(k));
              return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
            },

            parseFileSize(sizeString) {
              const units = {
                'B': 1,
                'KB': 1024,
                'MB': 1024 * 1024,
                'GB': 1024 * 1024 * 1024
              };
              const match = sizeString.match(/^(\d+(?:\.\d+)?)\s*(B|KB|MB|GB)$/i);
              if (match) {
                return parseFloat(match[1]) * units[match[2].toUpperCase()];
              }
              return 0;
            }
          }));
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