/**
 * @file
 * Simple PagedOne Swiper.js initialization
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Wait for Swiper to be available
   */
  function waitForSwiper(callback, maxAttempts = 50) {
    let attempts = 0;
    
    function checkSwiper() {
      attempts++;
      
      if (typeof window.Swiper !== 'undefined') {
        callback(window.Swiper);
        return;
      }
      
      if (attempts >= maxAttempts) {
        console.error('[adesso-slider] Swiper.js failed to load');
        return;
      }
      
      setTimeout(checkSwiper, 100);
    }
    
    checkSwiper();
  }

  /**
   * Initialize simple Swiper slider
   */
  function initializeSlider(sliderElement) {
    const slides = sliderElement.querySelectorAll('.swiper-slide');
    
    if (slides.length === 0) {
      console.warn('[adesso-slider] No slides found');
      return null;
    }

    // Get configuration from data attributes
    const autoSlide = sliderElement.getAttribute('data-slider') === 'slide';
    const interval = parseInt(sliderElement.getAttribute('data-interval'), 10) || 5000;
    const speed = parseInt(sliderElement.getAttribute('data-speed'), 10) || 800;
    
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldAutoplay = autoSlide && !prefersReducedMotion;

    // Basic Swiper configuration - PagedOne pattern
    const config = {
      // Core settings
      loop: slides.length > 1,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: prefersReducedMotion ? 0 : speed,
      
      // Autoplay
      autoplay: shouldAutoplay ? {
        delay: interval,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      } : false,
      
      // Navigation
      navigation: slides.length > 1 ? {
        nextEl: sliderElement.querySelector('.swiper-button-next'),
        prevEl: sliderElement.querySelector('.swiper-button-prev')
      } : false,
      
      // Pagination
      pagination: slides.length > 1 ? {
        el: sliderElement.querySelector('.swiper-pagination'),
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '" aria-label="Go to slide ' + (index + 1) + '"></span>';
        }
      } : false,
      
      // Keyboard navigation
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      
      // Basic accessibility
      a11y: {
        enabled: true,
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
        paginationBulletMessage: 'Go to slide {{index}}'
      }
    };

    try {
      const swiperInstance = new window.Swiper(sliderElement, config);
      
      // Store instance for cleanup
      sliderElement.swiperInstance = swiperInstance;
      
      console.log('[adesso-slider] Slider initialized successfully');
      return swiperInstance;
      
    } catch (error) {
      console.error('[adesso-slider] Failed to initialize:', error);
      return null;
    }
  }

  // Main Drupal behavior
  Drupal.behaviors.adessoSlider = {
    attach: function (context, settings) {
      // Find slider elements
      const sliderElements = once('adesso-slider', '.adesso-slider.swiper', context);
      
      if (sliderElements.length === 0) {
        return;
      }
      
      console.log('[adesso-slider] Found', sliderElements.length, 'slider(s)');
      
      // Wait for Swiper to load, then initialize
      waitForSwiper(function(SwiperClass) {
        sliderElements.forEach(function(sliderElement) {
          initializeSlider(sliderElement);
        });
      });
    },

    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        // Cleanup Swiper instances
        const sliders = context.querySelectorAll('.adesso-slider.swiper');
        
        sliders.forEach(function(slider) {
          if (slider.swiperInstance) {
            try {
              slider.swiperInstance.destroy();
              delete slider.swiperInstance;
            } catch (error) {
              console.error('[adesso-slider] Failed to destroy instance:', error);
            }
          }
        });
      }
    }
  };

})(Drupal, once);