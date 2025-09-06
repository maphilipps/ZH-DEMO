/**
 * @file
 * Accessible Media Component JavaScript Behaviors
 * 
 * Implements interactive features while maintaining WCAG 2.1 AA accessibility compliance.
 * Handles lightbox functionality, external content loading, keyboard navigation,
 * and screen reader announcements for Swiss municipal portal standards.
 */

import { once } from 'once';

/**
 * Media component behavior with accessibility enhancements
 */
export default function mediaBehavior(element) {
  // Initialize accessibility features
  initializeAccessibility(element);
  
  // Handle lightbox functionality
  initializeLightbox(element);
  
  // Handle external content loading with privacy controls
  initializeExternalContent(element);
  
  // Handle media loading states
  initializeLoadingStates(element);
  
  // Handle keyboard navigation
  initializeKeyboardNavigation(element);
  
  // Handle screen reader announcements
  initializeScreenReader(element);
  
  // Handle responsive image loading
  initializeResponsiveImages(element);
}

/**
 * Initialize accessibility features and ARIA support
 */
function initializeAccessibility(element) {
  // Ensure proper focus management for interactive media
  const interactiveMedia = element.querySelectorAll('[data-lightbox="true"], video, audio');
  
  interactiveMedia.forEach(media => {
    // Add tabindex if not already present
    if (!media.hasAttribute('tabindex')) {
      media.setAttribute('tabindex', '0');
    }
    
    // Ensure proper ARIA labels for screen readers
    if (media.tagName === 'VIDEO' && !media.hasAttribute('aria-label')) {
      media.setAttribute('aria-label', media.closest('.adesso-media').dataset.altText || 'Video content');
    }
    
    if (media.tagName === 'AUDIO' && !media.hasAttribute('aria-label')) {
      media.setAttribute('aria-label', media.closest('.adesso-media').dataset.altText || 'Audio content');
    }
  });
  
  // Handle privacy warnings with screen reader announcements
  const privacyWarnings = element.querySelectorAll('.adesso-media__privacy-warning');
  privacyWarnings.forEach(warning => {
    // Announce privacy warnings to screen readers
    warning.setAttribute('role', 'alert');
    warning.setAttribute('aria-live', 'polite');
  });
}

/**
 * Initialize lightbox functionality with accessibility
 */
function initializeLightbox(element) {
  const lightboxElements = element.querySelectorAll('[data-lightbox="true"]');
  
  lightboxElements.forEach(lightboxElement => {
    lightboxElement.addEventListener('click', handleLightboxOpen);
    lightboxElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleLightboxOpen.call(lightboxElement, e);
      }
    });
  });
}

/**
 * Handle lightbox opening with accessibility considerations
 */
function handleLightboxOpen(event) {
  event.preventDefault();
  
  const src = this.dataset.lightboxSrc || this.src;
  const alt = this.alt || 'Image';
  const mediaContainer = this.closest('.adesso-media');
  const caption = mediaContainer.querySelector('.adesso-media__caption')?.textContent || '';
  
  // Create accessible lightbox modal
  const lightboxModal = createLightboxModal(src, alt, caption);
  document.body.appendChild(lightboxModal);
  
  // Focus trap and accessibility management
  trapFocus(lightboxModal);
  
  // Announce to screen readers
  announceToScreenReader(`Opened lightbox for ${alt}`);
  
  // Close on Escape key
  const closeHandler = (e) => {
    if (e.key === 'Escape') {
      closeLightbox(lightboxModal, closeHandler);
    }
  };
  
  document.addEventListener('keydown', closeHandler);
  
  // Close on backdrop click
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox(lightboxModal, closeHandler);
    }
  });
}

/**
 * Create accessible lightbox modal
 */
function createLightboxModal(src, alt, caption) {
  const modal = document.createElement('div');
  modal.className = 'lightbox-modal fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', `Lightbox view of ${alt}`);
  
  modal.innerHTML = `
    <div class="lightbox-content max-w-4xl max-h-full p-4 relative">
      <button 
        type="button" 
        class="lightbox-close absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white z-10"
        aria-label="Close lightbox"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <img 
        src="${src}" 
        alt="${alt}"
        class="max-w-full max-h-full object-contain"
        tabindex="0"
      />
      ${caption ? `<p class="text-white text-center mt-4 text-sm">${caption}</p>` : ''}
    </div>
  `;
  
  // Handle close button
  const closeButton = modal.querySelector('.lightbox-close');
  closeButton.addEventListener('click', () => {
    closeLightbox(modal);
  });
  
  return modal;
}

/**
 * Close lightbox and restore focus
 */
function closeLightbox(modal, keydownHandler = null) {
  const originalTrigger = document.querySelector('[data-lightbox="true"]:focus, [data-lightbox="true"][tabindex="0"]');
  
  modal.remove();
  
  if (keydownHandler) {
    document.removeEventListener('keydown', keydownHandler);
  }
  
  // Restore focus to original trigger
  if (originalTrigger) {
    originalTrigger.focus();
  }
  
  announceToScreenReader('Lightbox closed');
}

/**
 * Initialize external content loading with privacy controls
 */
function initializeExternalContent(element) {
  const externalButtons = element.querySelectorAll('[data-load-external-media]');
  
  externalButtons.forEach(button => {
    button.addEventListener('click', handleExternalContentLoad);
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleExternalContentLoad.call(button, e);
      }
    });
  });
}

/**
 * Handle external content loading
 */
function handleExternalContentLoad(event) {
  const button = event.currentTarget;
  const mediaUrl = button.dataset.loadExternalMedia;
  const container = button.closest('.adesso-media__external-consent');
  
  // Show loading state
  button.disabled = true;
  button.textContent = button.dataset.loadingText || 'Loading...';
  
  // Announce loading to screen readers
  announceToScreenReader('Loading external content');
  
  // Create iframe or embedded content
  const embeddedContent = createEmbeddedContent(mediaUrl);
  
  // Replace consent UI with embedded content
  container.innerHTML = '';
  container.appendChild(embeddedContent);
  
  // Announce completion
  announceToScreenReader('External content loaded');
}

/**
 * Create embedded content for external media
 */
function createEmbeddedContent(url) {
  const container = document.createElement('div');
  container.className = 'embedded-content';
  
  // Simple iframe implementation - in production, this would be more sophisticated
  // with proper aspect ratio handling and security considerations
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.className = 'w-full aspect-video';
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('title', 'External video content');
  
  container.appendChild(iframe);
  return container;
}

/**
 * Initialize loading states for media elements
 */
function initializeLoadingStates(element) {
  const images = element.querySelectorAll('img[loading="lazy"]');
  
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.classList.add('loaded');
      img.classList.remove('loading');
    });
    
    img.addEventListener('error', () => {
      handleMediaError(img);
    });
  });
  
  const videos = element.querySelectorAll('video');
  videos.forEach(video => {
    video.addEventListener('loadeddata', () => {
      video.classList.add('loaded');
    });
    
    video.addEventListener('error', () => {
      handleMediaError(video);
    });
  });
}

/**
 * Handle media loading errors
 */
function handleMediaError(mediaElement) {
  const mediaContainer = mediaElement.closest('.adesso-media');
  const fallbackContent = mediaContainer.querySelector('.adesso-media__fallback');
  
  if (fallbackContent) {
    fallbackContent.classList.remove('sr-only');
    fallbackContent.setAttribute('role', 'alert');
    fallbackContent.setAttribute('aria-live', 'polite');
  }
  
  mediaContainer.classList.add('error');
  announceToScreenReader('Media failed to load. Fallback content available.');
}

/**
 * Initialize keyboard navigation support
 */
function initializeKeyboardNavigation(element) {
  const interactiveElements = element.querySelectorAll('[tabindex="0"], button, a, video, audio');
  
  interactiveElements.forEach(el => {
    el.addEventListener('keydown', (e) => {
      // Handle Enter key for custom interactive elements
      if (e.key === 'Enter' && el.dataset.lightbox) {
        e.preventDefault();
        el.click();
      }
      
      // Handle Arrow keys for media gallery navigation (if applicable)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        handleGalleryNavigation(e, el);
      }
    });
  });
}

/**
 * Handle gallery navigation with arrow keys
 */
function handleGalleryNavigation(event, currentElement) {
  const gallery = currentElement.closest('.adesso-media--gallery');
  if (!gallery) return;
  
  const allGalleryItems = document.querySelectorAll('.adesso-media--gallery [tabindex="0"]');
  const currentIndex = Array.from(allGalleryItems).indexOf(currentElement);
  
  let nextIndex;
  if (event.key === 'ArrowLeft') {
    nextIndex = currentIndex > 0 ? currentIndex - 1 : allGalleryItems.length - 1;
  } else {
    nextIndex = currentIndex < allGalleryItems.length - 1 ? currentIndex + 1 : 0;
  }
  
  allGalleryItems[nextIndex].focus();
  event.preventDefault();
}

/**
 * Initialize screen reader support and announcements
 */
function initializeScreenReader(element) {
  // Create screen reader announcement region if it doesn't exist
  let announceRegion = document.getElementById('sr-announce-region');
  if (!announceRegion) {
    announceRegion = document.createElement('div');
    announceRegion.id = 'sr-announce-region';
    announceRegion.className = 'sr-only';
    announceRegion.setAttribute('aria-live', 'polite');
    announceRegion.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announceRegion);
  }
}

/**
 * Announce messages to screen readers
 */
function announceToScreenReader(message) {
  const announceRegion = document.getElementById('sr-announce-region');
  if (announceRegion) {
    announceRegion.textContent = message;
    
    // Clear after a short delay to allow for repeated announcements
    setTimeout(() => {
      announceRegion.textContent = '';
    }, 1000);
  }
}

/**
 * Initialize advanced responsive image loading with performance optimization
 */
function initializeResponsiveImages(element) {
  // Performance monitoring setup
  const performanceMetrics = {
    imagesLoaded: 0,
    totalImages: 0,
    loadTimes: [],
    errors: 0
  };
  
  // Detect connection quality for adaptive loading
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  
  // Advanced intersection observer with intelligent preloading
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadImageWithOptimization(entry.target, observer, performanceMetrics, slowConnection);
      }
    });
  }, {
    // Aggressive preloading for better LCP
    rootMargin: slowConnection ? '25px 0px' : '100px 0px',
    threshold: [0.01, 0.25, 0.5]
  });
  
  // Preloading observer for images just outside viewport
  const preloadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        preloadImage(entry.target, slowConnection);
      }
    });
  }, {
    rootMargin: '200px 0px',
    threshold: 0.01
  });
  
  // Initialize all media elements
  const lazyImages = element.querySelectorAll('img[loading="lazy"], video[loading="lazy"]');
  performanceMetrics.totalImages = lazyImages.length;
  
  lazyImages.forEach(media => {
    // Add loading state
    media.classList.add('loading');
    
    // Observe for loading
    imageObserver.observe(media);
    
    // Observe for preloading (non-critical images)
    if (!media.closest('.adesso-media--hero')) {
      preloadObserver.observe(media);
    }
    
    // Add error handling with retry mechanism
    addErrorHandling(media, performanceMetrics);
  });
  
  // Monitor Core Web Vitals
  monitorCoreWebVitals(element, performanceMetrics);
}

/**
 * Load image with format optimization and performance tracking
 */
function loadImageWithOptimization(mediaElement, observer, metrics, slowConnection) {
  const startTime = performance.now();
  
  if (mediaElement.tagName === 'IMG') {
    // Detect and serve optimal image format
    const optimizedSrc = getOptimalImageFormat(mediaElement, slowConnection);
    
    // Create new image for preloading
    const tempImg = new Image();
    tempImg.onload = () => {
      // Update actual image
      if (mediaElement.dataset.src && !mediaElement.src) {
        mediaElement.src = optimizedSrc.src;
      }
      
      if (mediaElement.dataset.srcset && !mediaElement.srcset) {
        mediaElement.srcset = optimizedSrc.srcset;
      }
      
      // Update loading state
      mediaElement.classList.remove('loading');
      mediaElement.classList.add('loaded');
      
      // Track performance
      const loadTime = performance.now() - startTime;
      metrics.imagesLoaded++;
      metrics.loadTimes.push(loadTime);
      
      // Announce to screen reader for critical images
      if (mediaElement.closest('.adesso-media--hero')) {
        announceToScreenReader('Hero image loaded');
      }
      
      // Measure LCP for hero images
      if (mediaElement.closest('.adesso-media--hero')) {
        measureLCP(mediaElement, loadTime);
      }
      
      observer.unobserve(mediaElement);
    };
    
    tempImg.onerror = () => {
      handleImageError(mediaElement, observer, metrics);
    };
    
    tempImg.src = optimizedSrc.src;
  } else if (mediaElement.tagName === 'VIDEO') {
    loadVideoWithOptimization(mediaElement, observer, metrics, slowConnection);
  }
}

/**
 * Get optimal image format based on browser support and connection
 */
function getOptimalImageFormat(img, slowConnection) {
  const originalSrc = img.dataset.src || img.src;
  const originalSrcset = img.dataset.srcset || img.srcset;
  
  // Check format support (AVIF > WebP > JPEG)
  const supportsAVIF = checkFormatSupport('avif');
  const supportsWebP = checkFormatSupport('webp');
  
  let optimalSrc = originalSrc;
  let optimalSrcset = originalSrcset;
  
  // Replace formats if supported and not slow connection
  if (!slowConnection) {
    if (supportsAVIF && originalSrc && !originalSrc.includes('.avif')) {
      optimalSrc = originalSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '.avif');
    } else if (supportsWebP && originalSrc && !originalSrc.includes('.webp')) {
      optimalSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    
    if (supportsAVIF && originalSrcset) {
      optimalSrcset = originalSrcset.replace(/\.(jpg|jpeg|png|webp)/gi, '.avif');
    } else if (supportsWebP && originalSrcset) {
      optimalSrcset = originalSrcset.replace(/\.(jpg|jpeg|png)/gi, '.webp');
    }
  }
  
  return { src: optimalSrc, srcset: optimalSrcset };
}

/**
 * Check browser support for image format
 */
function checkFormatSupport(format) {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  const formats = {
    avif: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=',
    webp: 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  };
  
  if (format in formats) {
    const testImg = new Image();
    testImg.src = formats[format];
    return testImg.complete && testImg.width > 0;
  }
  
  return false;
}

/**
 * Preload image with low priority
 */
function preloadImage(img, slowConnection) {
  if (slowConnection) return; // Skip preloading on slow connections
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = img.dataset.src || img.src;
  
  // Set low priority to avoid blocking critical resources
  if ('fetchPriority' in link) {
    link.fetchPriority = 'low';
  }
  
  document.head.appendChild(link);
}

/**
 * Load video with optimization
 */
function loadVideoWithOptimization(video, observer, metrics, slowConnection) {
  if (slowConnection) {
    // On slow connections, only load poster frame
    video.preload = 'none';
  }
  
  video.addEventListener('loadeddata', () => {
    video.classList.remove('loading');
    video.classList.add('loaded');
    metrics.imagesLoaded++;
    observer.unobserve(video);
  });
  
  video.addEventListener('error', () => {
    handleVideoError(video, metrics);
  });
  
  // Auto-optimize video quality based on connection
  if (slowConnection && video.src) {
    // Switch to lower quality version if available
    const lowQualityUrl = video.src.replace(/_(hd|1080p|720p)/, '_480p');
    if (lowQualityUrl !== video.src) {
      video.src = lowQualityUrl;
    }
  }
}

/**
 * Enhanced error handling with retry mechanism
 */
function addErrorHandling(media, metrics) {
  let retryCount = 0;
  const maxRetries = 2;
  
  const handleError = () => {
    if (retryCount < maxRetries) {
      retryCount++;
      setTimeout(() => {
        // Retry with original format
        if (media.tagName === 'IMG') {
          media.src = media.dataset.src || media.src;
        }
      }, 1000 * retryCount);
    } else {
      metrics.errors++;
      handleMediaError(media);
      
      // Log performance issue for debugging
      console.warn('Media loading failed after retries:', {
        src: media.src || media.dataset.src,
        element: media,
        retries: retryCount
      });
    }
  };
  
  media.addEventListener('error', handleError);
}

/**
 * Monitor Core Web Vitals for performance optimization
 */
function monitorCoreWebVitals(element, metrics) {
  // Largest Contentful Paint (LCP)
  let lcpValue = 0;
  
  if ('web-vitals' in window) {
    // Use web-vitals library if available
    window.webVitals.getLCP((metric) => {
      lcpValue = metric.value;
    });
  } else {
    // Fallback LCP measurement
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      lcpValue = lastEntry.startTime;
    });
    
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  }
  
  // Cumulative Layout Shift (CLS) monitoring
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    }
  });
  
  clsObserver.observe({ type: 'layout-shift', buffered: true });
  
  // Report metrics after load
  setTimeout(() => {
    reportPerformanceMetrics(element, {
      ...metrics,
      lcp: lcpValue,
      cls: clsValue
    });
  }, 5000);
}

/**
 * Measure LCP for hero images
 */
function measureLCP(img, loadTime) {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lcpEntry = entries[entries.length - 1];
      
      if (lcpEntry.element === img) {
        console.log('LCP for hero image:', lcpEntry.startTime, 'ms');
        
        // Alert if LCP exceeds target
        if (lcpEntry.startTime > 2000) {
          console.warn('LCP exceeds 2s target:', lcpEntry.startTime);
        }
      }
    });
    
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  }
}

/**
 * Handle image loading errors with fallback strategies
 */
function handleImageError(img, observer, metrics) {
  metrics.errors++;
  
  // Try fallback formats
  const fallbackFormats = ['.jpg', '.png', '.gif'];
  const currentSrc = img.src || img.dataset.src;
  
  for (const format of fallbackFormats) {
    if (!currentSrc.includes(format)) {
      const fallbackSrc = currentSrc.replace(/\.[^.]+$/, format);
      
      const testImg = new Image();
      testImg.onload = () => {
        img.src = fallbackSrc;
        img.classList.remove('loading');
        img.classList.add('loaded');
        observer.unobserve(img);
      };
      testImg.src = fallbackSrc;
      break;
    }
  }
}

/**
 * Handle video loading errors
 */
function handleVideoError(video, metrics) {
  metrics.errors++;
  console.warn('Video loading error:', video.src);
  
  // Show fallback content or poster
  const fallback = video.closest('.adesso-media').querySelector('.adesso-media__fallback');
  if (fallback) {
    fallback.classList.remove('sr-only');
    fallback.setAttribute('role', 'alert');
  }
}

/**
 * Report performance metrics for debugging
 */
function reportPerformanceMetrics(element, metrics) {
  const report = {
    component: 'media',
    timestamp: Date.now(),
    ...metrics,
    averageLoadTime: metrics.loadTimes.length > 0 
      ? metrics.loadTimes.reduce((a, b) => a + b, 0) / metrics.loadTimes.length 
      : 0,
    successRate: metrics.totalImages > 0 
      ? ((metrics.imagesLoaded - metrics.errors) / metrics.totalImages) * 100 
      : 0
  };
  
  // Send to console for debugging
  console.log('Media Component Performance Report:', report);
  
  // Send to analytics if available
  if (window.gtag) {
    window.gtag('event', 'media_performance', {
      custom_map: { metric1: 'lcp', metric2: 'cls', metric3: 'success_rate' },
      metric1: metrics.lcp,
      metric2: metrics.cls,
      metric3: report.successRate
    });
  }
  
  // Store in memory for debugging tools
  if (!window.mediaPerformanceData) {
    window.mediaPerformanceData = [];
  }
  window.mediaPerformanceData.push(report);
}

/**
 * Trap focus within a modal element
 */
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  // Focus first element
  if (firstElement) {
    firstElement.focus();
  }
  
  // Handle Tab key cycling
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
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
    }
  });
}

/**
 * Performance debugging utilities for Swiss municipal portals
 */
window.MediaPerformanceDebugger = {
  /**
   * Get current performance status
   */
  getStatus() {
    if (!window.mediaPerformanceData || window.mediaPerformanceData.length === 0) {
      return { status: 'no_data', message: 'No performance data available yet' };
    }
    
    const latestReport = window.mediaPerformanceData[window.mediaPerformanceData.length - 1];
    const status = {
      timestamp: new Date(latestReport.timestamp).toISOString(),
      images: {
        total: latestReport.totalImages,
        loaded: latestReport.imagesLoaded,
        errors: latestReport.errors,
        successRate: latestReport.successRate.toFixed(1) + '%',
        avgLoadTime: latestReport.averageLoadTime.toFixed(2) + 'ms'
      },
      coreWebVitals: {
        lcp: latestReport.lcp ? latestReport.lcp.toFixed(2) + 'ms' : 'measuring...',
        cls: latestReport.cls ? latestReport.cls.toFixed(3) : 'measuring...'
      },
      performance: this.getPerformanceGrade(latestReport),
      recommendations: this.getRecommendations(latestReport)
    };
    
    return status;
  },
  
  /**
   * Get performance grade based on Swiss municipal standards
   */
  getPerformanceGrade(report) {
    let score = 100;
    
    // LCP scoring (target < 2000ms)
    if (report.lcp > 2000) score -= 30;
    else if (report.lcp > 1500) score -= 15;
    
    // CLS scoring (target < 0.1)
    if (report.cls > 0.1) score -= 25;
    else if (report.cls > 0.05) score -= 10;
    
    // Success rate scoring
    if (report.successRate < 95) score -= 20;
    else if (report.successRate < 98) score -= 10;
    
    // Load time scoring
    if (report.averageLoadTime > 1000) score -= 15;
    else if (report.averageLoadTime > 500) score -= 5;
    
    if (score >= 90) return { grade: 'A', color: 'green', status: 'Excellent' };
    if (score >= 80) return { grade: 'B', color: 'yellow', status: 'Good' };
    if (score >= 70) return { grade: 'C', color: 'orange', status: 'Fair' };
    return { grade: 'D', color: 'red', status: 'Needs Improvement' };
  },
  
  /**
   * Get performance recommendations
   */
  getRecommendations(report) {
    const recommendations = [];
    
    if (report.lcp > 2000) {
      recommendations.push({
        priority: 'high',
        issue: 'LCP exceeds 2s target',
        solution: 'Optimize hero images, enable AVIF/WebP, use image CDN'
      });
    }
    
    if (report.cls > 0.1) {
      recommendations.push({
        priority: 'high',
        issue: 'High layout shift detected',
        solution: 'Set explicit image dimensions, reserve space for content'
      });
    }
    
    if (report.successRate < 95) {
      recommendations.push({
        priority: 'medium',
        issue: 'Low image loading success rate',
        solution: 'Check image URLs, implement better fallback strategies'
      });
    }
    
    if (report.averageLoadTime > 1000) {
      recommendations.push({
        priority: 'medium',
        issue: 'Slow average load times',
        solution: 'Optimize image sizes, use responsive images, enable lazy loading'
      });
    }
    
    return recommendations;
  },
  
  /**
   * Create visual debug overlay
   */
  showDebugOverlay() {
    const status = this.getStatus();
    
    if (status.status === 'no_data') {
      console.log('Media Performance Debugger: No data available yet');
      return;
    }
    
    // Remove existing overlay
    const existingOverlay = document.getElementById('media-debug-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'media-debug-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 350px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 20px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 12px;
      z-index: 9999;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    `;
    
    overlay.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <strong style="color: #4CAF50;">Media Performance Debug</strong>
        <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">&times;</button>
      </div>
      
      <div style="margin-bottom: 10px;">
        <strong>Performance Grade: <span style="color: ${status.performance.color}; font-size: 16px;">${status.performance.grade}</span></strong>
        <br><span style="color: #888; font-size: 10px;">${status.performance.status}</span>
      </div>
      
      <div style="margin-bottom: 10px;">
        <strong>Images:</strong><br>
        Loaded: ${status.images.loaded}/${status.images.total} (${status.images.successRate})<br>
        Errors: ${status.images.errors}<br>
        Avg Load: ${status.images.avgLoadTime}
      </div>
      
      <div style="margin-bottom: 10px;">
        <strong>Core Web Vitals:</strong><br>
        LCP: ${status.coreWebVitals.lcp}<br>
        CLS: ${status.coreWebVitals.cls}
      </div>
      
      <div style="margin-bottom: 10px;">
        <strong>Recommendations:</strong><br>
        ${status.recommendations.map(rec => `
          <div style="color: ${rec.priority === 'high' ? '#ff6b6b' : '#ffd93d'}; font-size: 10px; margin: 5px 0;">
            <strong>${rec.issue}</strong><br>
            ${rec.solution}
          </div>
        `).join('')}
      </div>
      
      <div style="font-size: 10px; color: #888; border-top: 1px solid #444; padding-top: 10px; margin-top: 10px;">
        Updated: ${new Date().toLocaleTimeString()}<br>
        <button onclick="MediaPerformanceDebugger.exportReport()" style="background: #4CAF50; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-top: 5px;">
          Export Report
        </button>
      </div>
    `;
    
    document.body.appendChild(overlay);
  },
  
  /**
   * Export performance report for municipal IT teams
   */
  exportReport() {
    if (!window.mediaPerformanceData || window.mediaPerformanceData.length === 0) {
      alert('No performance data to export');
      return;
    }
    
    const report = {
      title: 'Media Component Performance Report',
      municipality: document.title || 'Municipal Portal',
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      connection: this.getConnectionInfo(),
      data: window.mediaPerformanceData,
      summary: this.getStatus(),
      technicalDetails: {
        supportsAVIF: checkFormatSupport('avif'),
        supportsWebP: checkFormatSupport('webp'),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    };
    
    // Download as JSON
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `media-performance-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
  
  /**
   * Get connection information
   */
  getConnectionInfo() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };
    }
    return { status: 'unknown' };
  },
  
  /**
   * Monitor media loading in real-time
   */
  startRealTimeMonitoring() {
    console.log('Starting real-time media monitoring...');
    
    setInterval(() => {
      const status = this.getStatus();
      if (status.status !== 'no_data') {
        console.groupCollapsed(`Media Performance Update - Grade: ${status.performance.grade}`);
        console.log('Images:', status.images);
        console.log('Core Web Vitals:', status.coreWebVitals);
        console.log('Recommendations:', status.recommendations);
        console.groupEnd();
      }
    }, 10000); // Update every 10 seconds
  },
  
  /**
   * Test media loading performance
   */
  async runPerformanceTest() {
    console.log('Running media performance test...');
    
    const testImages = [
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A==', // 1x1 JPEG
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA', // 1x1 WebP
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==' // 1x1 PNG
    ];
    
    const results = [];
    
    for (const [index, src] of testImages.entries()) {
      const startTime = performance.now();
      
      try {
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
        
        const loadTime = performance.now() - startTime;
        results.push({
          format: ['JPEG', 'WebP', 'PNG'][index],
          loadTime: loadTime.toFixed(2) + 'ms',
          status: 'success'
        });
      } catch (error) {
        results.push({
          format: ['JPEG', 'WebP', 'PNG'][index],
          loadTime: 'failed',
          status: 'error'
        });
      }
    }
    
    console.table(results);
    return results;
  }
};

// Add console shortcuts for municipal IT teams
console.log('%cMedia Performance Debugger loaded! 🚀', 'color: #4CAF50; font-weight: bold;');
console.log('Usage:');
console.log('• MediaPerformanceDebugger.getStatus() - Get current status');
console.log('• MediaPerformanceDebugger.showDebugOverlay() - Show debug overlay');
console.log('• MediaPerformanceDebugger.exportReport() - Export performance report');
console.log('• MediaPerformanceDebugger.startRealTimeMonitoring() - Start monitoring');

/**
 * Initialize format optimization for modern image formats
 */
function initializeFormatOptimization(element) {
  // Detect browser support for modern formats
  const formatSupport = {
    avif: false,
    webp: false
  };
  
  // Test AVIF support
  const avifCanvas = document.createElement('canvas');
  avifCanvas.width = 1;
  avifCanvas.height = 1;
  formatSupport.avif = avifCanvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  
  // Test WebP support
  const webpCanvas = document.createElement('canvas');
  webpCanvas.width = 1;
  webpCanvas.height = 1;
  formatSupport.webp = webpCanvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  
  // Add format support classes to document
  document.documentElement.classList.toggle('avif-support', formatSupport.avif);
  document.documentElement.classList.toggle('webp-support', formatSupport.webp);
  
  // Track format usage for analytics
  if (window.gtag) {
    gtag('event', 'image_format_support', {
      avif: formatSupport.avif,
      webp: formatSupport.webp
    });
  }
}

/**
 * Enhanced audio player functionality
 */
function initializeEnhancedAudio(element) {
  const audioContainers = element.querySelectorAll('.adesso-media__audio-container');
  
  audioContainers.forEach(container => {
    const audio = container.querySelector('audio');
    const playButton = container.querySelector('[data-audio-control="play-pause"]');
    const muteButton = container.querySelector('[data-audio-control="mute"]');
    const progressBar = container.querySelector('[data-audio-progress]');
    const currentTimeDisplay = container.querySelector('[data-audio-current-time]');
    const totalTimeDisplay = container.querySelector('[data-audio-total-time]');
    const visualBars = container.querySelectorAll('[data-audio-bar]');
    
    if (!audio) return;
    
    // Play/pause functionality
    if (playButton) {
      playButton.addEventListener('click', () => {
        if (audio.paused) {
          audio.play();
          announceToScreenReader('Audio playing');
        } else {
          audio.pause();
          announceToScreenReader('Audio paused');
        }
      });
    }
    
    // Mute/unmute functionality
    if (muteButton) {
      muteButton.addEventListener('click', () => {
        audio.muted = !audio.muted;
        announceToScreenReader(audio.muted ? 'Audio muted' : 'Audio unmuted');
        updateMuteButton(muteButton, audio.muted);
      });
    }
    
    // Audio event listeners
    audio.addEventListener('loadedmetadata', () => {
      if (totalTimeDisplay) {
        totalTimeDisplay.textContent = formatTime(audio.duration);
      }
    });
    
    audio.addEventListener('timeupdate', () => {
      if (currentTimeDisplay) {
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
      }
      
      if (progressBar) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;
      }
      
      // Animate audio bars
      animateAudioVisualization(visualBars, audio);
    });
    
    audio.addEventListener('play', () => {
      updatePlayButton(playButton, true);
    });
    
    audio.addEventListener('pause', () => {
      updatePlayButton(playButton, false);
    });
  });
}

/**
 * Enhanced video player functionality
 */
function initializeEnhancedVideo(element) {
  const videoContainers = element.querySelectorAll('.adesso-media__video-container');
  
  videoContainers.forEach(container => {
    const video = container.querySelector('video');
    const playButton = container.querySelector('[data-video-play-button]');
    
    if (!video || !playButton) return;
    
    // Custom play button overlay
    playButton.addEventListener('click', () => {
      video.play();
      playButton.style.display = 'none';
      announceToScreenReader('Video started');
    });
    
    // Show play button when video ends
    video.addEventListener('ended', () => {
      playButton.style.display = 'flex';
    });
    
    // Hide play button when video starts
    video.addEventListener('play', () => {
      playButton.style.display = 'none';
    });
    
    // Show play button when video is paused
    video.addEventListener('pause', () => {
      if (!video.ended) {
        playButton.style.display = 'flex';
      }
    });
  });
}

/**
 * Enhanced external content management with GDPR compliance
 */
function initializeEnhancedExternalContent(element) {
  const consentButtons = element.querySelectorAll('[data-load-external-media]');
  
  consentButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      handleExternalContentWithTracking(event);
    });
  });
}

/**
 * Handle external content loading with privacy tracking
 */
function handleExternalContentWithTracking(event) {
  const button = event.currentTarget;
  const mediaUrl = button.dataset.loadExternalMedia;
  const container = button.closest('.adesso-media__external-consent');
  const mediaContainer = button.closest('.adesso-media');
  
  // Track consent for privacy compliance
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'external_media_consent',
      media_url: mediaUrl,
      privacy_level: mediaContainer.dataset.privacyLevel || 'public'
    });
  }
  
  // Show enhanced loading state
  showEnhancedLoadingState(button, container);
  
  // Create enhanced embedded content
  createEnhancedEmbeddedContent(mediaUrl, container);
  
  // Announce to accessibility tools
  announceToScreenReader('External content loaded with user consent');
}

/**
 * Enhanced document sharing functionality
 */
function initializeDocumentSharing(element) {
  const shareButtons = element.querySelectorAll('[data-document-share]');
  
  shareButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      
      const mediaContainer = button.closest('.adesso-media');
      const documentLink = mediaContainer.querySelector('.adesso-media__document-link');
      const documentUrl = documentLink?.href;
      const documentTitle = button.getAttribute('aria-label') || 'Document';
      
      if (navigator.share && documentUrl) {
        try {
          await navigator.share({
            title: documentTitle,
            url: documentUrl
          });
          announceToScreenReader('Document shared successfully');
        } catch (err) {
          if (err.name !== 'AbortError') {
            fallbackShare(documentUrl, documentTitle);
          }
        }
      } else {
        fallbackShare(documentUrl, documentTitle);
      }
    });
  });
}

/**
 * Utility functions
 */
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updatePlayButton(button, isPlaying) {
  if (!button) return;
  
  const playIcon = button.querySelector('[data-play-icon]');
  const pauseIcon = button.querySelector('[data-pause-icon]');
  
  if (playIcon && pauseIcon) {
    if (isPlaying) {
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
    } else {
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
    }
  }
}

function updateMuteButton(button, isMuted) {
  if (!button) return;
  
  const volumeIcon = button.querySelector('[data-volume-icon]');
  const muteIcon = button.querySelector('[data-mute-icon]');
  
  if (volumeIcon && muteIcon) {
    if (isMuted) {
      volumeIcon.classList.add('hidden');
      muteIcon.classList.remove('hidden');
    } else {
      volumeIcon.classList.remove('hidden');
      muteIcon.classList.add('hidden');
    }
  }
}

function animateAudioVisualization(bars, audio) {
  if (!audio.paused && bars.length > 0) {
    bars.forEach((bar, index) => {
      const height = Math.random() * 20 + 8;
      bar.style.height = `${height}px`;
      bar.style.animationDelay = `${index * 0.1}s`;
    });
  }
}

function showEnhancedLoadingState(button, container) {
  button.disabled = true;
  button.innerHTML = `
    <svg class="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h5M20 20v-5h-5M4 20L20 4m0 16L4 4"/>
    </svg>
    Loading external content...
  `;
}

function createEnhancedEmbeddedContent(url, container) {
  // Enhanced iframe creation with security considerations
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.className = 'w-full aspect-video rounded';
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'encrypted-media');
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation');
  iframe.setAttribute('loading', 'lazy');
  iframe.setAttribute('title', 'External video content');
  
  // Replace consent interface with iframe
  container.innerHTML = '';
  container.appendChild(iframe);
  
  // Track successful load
  iframe.addEventListener('load', () => {
    announceToScreenReader('External video content loaded successfully');
  });
}

function fallbackShare(url, title) {
  // Fallback share functionality using clipboard API
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      announceToScreenReader('Document link copied to clipboard');
      showTemporaryMessage('Link copied to clipboard!');
    });
  } else {
    // Further fallback - create temporary input
    const tempInput = document.createElement('input');
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    announceToScreenReader('Document link copied');
    showTemporaryMessage('Link copied!');
  }
}

function showTemporaryMessage(message) {
  const messageEl = document.createElement('div');
  messageEl.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity';
  messageEl.textContent = message;
  document.body.appendChild(messageEl);
  
  setTimeout(() => {
    messageEl.style.opacity = '0';
    setTimeout(() => messageEl.remove(), 300);
  }, 2000);
}

// Enhanced auto-initialization with modern features
once('adesso-media', '[data-behavior~="media"]', (element) => {
  mediaBehavior(element);
  initializeEnhancedAudio(element);
  initializeEnhancedVideo(element);
  initializeEnhancedExternalContent(element);
  initializeDocumentSharing(element);
});