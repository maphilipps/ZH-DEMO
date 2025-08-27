/**
 * @file
 * Download item interactive behavior with progress tracking.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Initialize download item functionality
   * @param {Element} downloadElement - The download item element
   * @return {void}
   */
  function initializeDownloadItem(downloadElement) {
    const downloadLink = downloadElement.querySelector('a[download], a[href*="download"], .download-link');
    const progressBar = downloadElement.querySelector('.download-progress');
    const statusText = downloadElement.querySelector('.download-status');
    const fileSize = downloadElement.getAttribute('data-file-size');
    const fileName = downloadElement.getAttribute('data-file-name');
    
    if (!downloadLink) {
      console.warn('[adesso-download-item] No download link found');
      return;
    }

    // Add enhanced download tracking
    downloadLink.addEventListener('click', function (e) {
      const url = downloadLink.href;
      const isExternalDownload = !url.startsWith(window.location.origin);
      
      // Track download initiation
      trackDownload('initiated', {
        url: url,
        fileName: fileName || downloadLink.textContent.trim(),
        fileSize: fileSize,
        isExternal: isExternalDownload
      });

      // Show download progress for internal files
      if (!isExternalDownload && progressBar) {
        showDownloadProgress(downloadElement, url);
      }

      // Add security attributes for external downloads
      if (isExternalDownload) {
        downloadLink.setAttribute('rel', 'noopener noreferrer');
      }

      // Update download count if available
      updateDownloadCount(downloadElement);
    });

    // Enhanced keyboard interaction
    downloadLink.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        downloadLink.click();
      }
    });

    // Add file type icon if not present
    addFileTypeIcon(downloadElement, downloadLink);

    // Add file size display if available
    if (fileSize && !downloadElement.querySelector('.file-size')) {
      addFileSizeDisplay(downloadElement, fileSize);
    }

    console.log('[adesso-download-item] Download item initialized:', fileName || downloadLink.href);
  }

  /**
   * Show download progress for internal downloads
   * @param {Element} downloadElement - Download container
   * @param {string} url - Download URL
   * @return {void}
   */
  function showDownloadProgress(downloadElement, url) {
    const progressBar = downloadElement.querySelector('.download-progress');
    const statusText = downloadElement.querySelector('.download-status');
    
    if (!progressBar) return;

    // Show progress bar
    progressBar.style.display = 'block';
    progressBar.style.width = '0%';
    
    if (statusText) {
      statusText.textContent = 'Preparing download...';
    }

    // Simulate progress for demonstration (in real app, use actual progress)
    let progress = 0;
    const progressInterval = setInterval(function () {
      progress += Math.random() * 15;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        
        // Complete download
        progressBar.style.width = '100%';
        if (statusText) {
          statusText.textContent = 'Download complete!';
        }
        
        // Hide progress after delay
        setTimeout(function () {
          progressBar.style.display = 'none';
          if (statusText) {
            statusText.textContent = '';
          }
        }, 2000);
        
        // Track completion
        trackDownload('completed', { url: url });
      } else {
        progressBar.style.width = progress + '%';
        if (statusText) {
          statusText.textContent = `Downloading... ${Math.round(progress)}%`;
        }
      }
    }, 200);
  }

  /**
   * Add file type icon based on file extension
   * @param {Element} downloadElement - Download container
   * @param {Element} downloadLink - Download link
   * @return {void}
   */
  function addFileTypeIcon(downloadElement, downloadLink) {
    if (downloadElement.querySelector('.file-type-icon')) {
      return; // Icon already exists
    }

    const url = downloadLink.href;
    const extension = url.split('.').pop().toLowerCase();
    let iconClass = 'file-icon';
    let iconText = '📄';

    // Map file extensions to icons
    const iconMap = {
      'pdf': '📄',
      'doc': '📝',
      'docx': '📝',
      'xls': '📊',
      'xlsx': '📊',
      'ppt': '📈',
      'pptx': '📈',
      'txt': '📃',
      'rtf': '📃',
      'zip': '🗜️',
      'rar': '🗜️',
      '7z': '🗜️',
      'jpg': '🖼️',
      'jpeg': '🖼️',
      'png': '🖼️',
      'gif': '🖼️',
      'svg': '🖼️',
      'mp4': '🎥',
      'avi': '🎥',
      'mov': '🎥',
      'mp3': '🎵',
      'wav': '🎵',
      'ogg': '🎵'
    };

    if (iconMap[extension]) {
      iconText = iconMap[extension];
      iconClass += ' file-' + extension;
    }

    const iconElement = document.createElement('span');
    iconElement.className = 'file-type-icon ' + iconClass;
    iconElement.textContent = iconText;
    iconElement.setAttribute('aria-hidden', 'true');
    
    // Insert icon at the beginning of the link
    downloadLink.insertBefore(iconElement, downloadLink.firstChild);
  }

  /**
   * Add file size display
   * @param {Element} downloadElement - Download container
   * @param {string} fileSize - File size string
   * @return {void}
   */
  function addFileSizeDisplay(downloadElement, fileSize) {
    const sizeElement = document.createElement('span');
    sizeElement.className = 'file-size text-sm text-gray-500 ml-2';
    sizeElement.textContent = `(${formatFileSize(fileSize)})`;
    
    const downloadLink = downloadElement.querySelector('a');
    if (downloadLink) {
      downloadLink.appendChild(sizeElement);
    }
  }

  /**
   * Format file size for display
   * @param {string|number} bytes - File size in bytes
   * @return {string} Formatted file size
   */
  function formatFileSize(bytes) {
    if (typeof bytes === 'string' && bytes.includes(' ')) {
      return bytes; // Already formatted
    }
    
    const size = parseInt(bytes);
    if (isNaN(size)) return bytes;
    
    const units = ['B', 'KB', 'MB', 'GB'];
    let unitIndex = 0;
    let fileSize = size;
    
    while (fileSize >= 1024 && unitIndex < units.length - 1) {
      fileSize /= 1024;
      unitIndex++;
    }
    
    return Math.round(fileSize * 10) / 10 + ' ' + units[unitIndex];
  }

  /**
   * Update download count display
   * @param {Element} downloadElement - Download container
   * @return {void}
   */
  function updateDownloadCount(downloadElement) {
    const countElement = downloadElement.querySelector('.download-count');
    if (countElement) {
      const currentCount = parseInt(countElement.textContent) || 0;
      countElement.textContent = currentCount + 1;
      
      // Add visual feedback
      countElement.classList.add('animate-pulse');
      setTimeout(function () {
        countElement.classList.remove('animate-pulse');
      }, 1000);
    }
  }

  /**
   * Track download events for analytics
   * @param {string} action - Download action (initiated, completed, failed)
   * @param {Object} data - Additional tracking data
   * @return {void}
   */
  function trackDownload(action, data) {
    const trackingData = {
      type: 'download_' + action,
      fileName: data.fileName,
      fileSize: data.fileSize,
      url: data.url,
      isExternal: data.isExternal || false,
      timestamp: new Date().toISOString()
    };

    // Send to analytics service if available
    if (typeof window.analytics !== 'undefined' && window.analytics.track) {
      window.analytics.track('Download ' + action, trackingData);
    }

    // Fallback to console for debugging
    console.log('[adesso-download-item] Download tracked:', trackingData);
  }

  // Main Drupal behavior
  Drupal.behaviors.adessoDownloadItem = {
    attach: function (context) {
      // Find download item elements
      const downloadElements = once('adesso-download-item', 
        '.download-item, [data-download-item], .file-download', 
        context
      );
      
      if (downloadElements.length === 0) {
        return;
      }

      console.log('[adesso-download-item] Found', downloadElements.length, 'download item(s)');

      downloadElements.forEach(function (downloadElement) {
        initializeDownloadItem(downloadElement);
      });
    },

    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        // Clean up progress bars and reset states
        const downloadItems = context.querySelectorAll('.download-item, [data-download-item], .file-download');
        
        downloadItems.forEach(function (item) {
          const progressBar = item.querySelector('.download-progress');
          const statusText = item.querySelector('.download-status');
          
          if (progressBar) {
            progressBar.style.display = 'none';
            progressBar.style.width = '0%';
          }
          
          if (statusText) {
            statusText.textContent = '';
          }
        });
      }
    }
  };

})(Drupal, once);