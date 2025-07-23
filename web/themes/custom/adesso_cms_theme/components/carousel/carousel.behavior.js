/**
 * @file
 * Carousel behavior using Swiper.js.
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.carouselBehavior = {
    attach: function (context, settings) {
      // Initialize all carousel instances using once for proper initialization
      once('carousel-swiper', '[data-carousel="slide"]', context).forEach(function (carousel) {
        // Skip if Swiper is not available
        if (typeof Swiper === 'undefined') {
          console.warn('Swiper.js library not loaded. Carousel initialization skipped.');
          return;
        }

        // Get carousel configuration from data attributes
        const autoplay = carousel.getAttribute('data-carousel-autoplay') !== 'false';
        const interval = parseInt(carousel.getAttribute('data-carousel-interval')) || 5000;
        const pauseOnHover = carousel.getAttribute('data-carousel-pause-on-hover') !== 'false';
        
        // Initialize Swiper with carousel-appropriate configuration
        const swiper = new Swiper(carousel, {
          // Basic navigation
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          
          // Pagination with clickable dots
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            bulletActiveClass: 'swiper-pagination-bullet-active',
            bulletClass: 'swiper-pagination-bullet',
          },
          
          // Loop configuration
          loop: true,
          slidesPerView: 1,
          spaceBetween: 0,
          
          // Autoplay configuration
          autoplay: autoplay ? {
            delay: interval,
            disableOnInteraction: false,
            pauseOnMouseEnter: pauseOnHover,
          } : false,
          
          // Accessibility settings
          a11y: {
            enabled: true,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            paginationBulletMessage: 'Go to slide {{index}}',
          },
          
          // Keyboard navigation
          keyboard: {
            enabled: true,
            onlyInViewport: true,
          },
          
          // Animation settings
          speed: 600,
          effect: 'slide',
          
          // Breakpoints for responsive behavior
          breakpoints: {
            480: {
              navigation: {
                enabled: false,
              },
            },
            768: {
              navigation: {
                enabled: true,
              },
            },
          },
          
          // Event callbacks
          on: {
            init: function () {
              // Add custom ARIA live region for announcements
              const liveRegion = document.createElement('div');
              liveRegion.setAttribute('aria-live', 'polite');
              liveRegion.setAttribute('aria-atomic', 'true');
              liveRegion.setAttribute('class', 'sr-only');
              liveRegion.id = 'swiper-live-region-' + Math.random().toString(36).substr(2, 9);
              carousel.appendChild(liveRegion);
              
              // Store reference to live region
              this.liveRegion = liveRegion;
              
              // Update initial announcement
              const totalSlides = this.slides.length;
              liveRegion.textContent = `Slide 1 of ${totalSlides}`;
              
              // Add initialization marker for testing/debugging
              carousel.setAttribute('data-carousel-initialized', 'swiper');
            },
            
            slideChange: function () {
              const currentIndex = this.realIndex + 1;
              const totalSlides = this.slides.length;
              
              // Update ARIA live region
              if (this.liveRegion) {
                this.liveRegion.textContent = `Slide ${currentIndex} of ${totalSlides}`;
                
                // Update slide titles for screen readers if available
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                  const slideTitle = activeSlide.querySelector('h1, h2, h3, h4, h5, h6');
                  if (slideTitle) {
                    this.liveRegion.textContent += `: ${slideTitle.textContent}`;
                  }
                }
              }
            },
            
            autoplayStart: function () {
              // Handle autoplay state for accessibility
              if (this.navigation && this.navigation.$nextEl) {
                this.navigation.$nextEl[0].setAttribute('aria-label', 'Next slide (autoplay active)');
              }
              if (this.navigation && this.navigation.$prevEl) {
                this.navigation.$prevEl[0].setAttribute('aria-label', 'Previous slide (autoplay active)');
              }
            },
            
            autoplayStop: function () {
              // Handle autoplay state for accessibility
              if (this.navigation && this.navigation.$nextEl) {
                this.navigation.$nextEl[0].setAttribute('aria-label', 'Next slide');
              }
              if (this.navigation && this.navigation.$prevEl) {
                this.navigation.$prevEl[0].setAttribute('aria-label', 'Previous slide');
              }
            },
          },
        });

        // Enhanced keyboard navigation
        carousel.addEventListener('keydown', function (e) {
          switch (e.key) {
            case 'Home':
              e.preventDefault();
              swiper.slideTo(0);
              break;
            case 'End':
              e.preventDefault();
              swiper.slideTo(swiper.slides.length - 1);
              break;
          }
        });

        // Handle autoplay pause/resume on focus for accessibility
        const focusableElements = carousel.querySelectorAll('a, button, [tabindex="0"], [tabindex="-1"]');
        
        focusableElements.forEach(function (element) {
          element.addEventListener('focus', function () {
            if (autoplay && swiper.autoplay) {
              swiper.autoplay.stop();
            }
          });
          
          element.addEventListener('blur', function () {
            if (autoplay && swiper.autoplay && !carousel.matches(':hover')) {
              swiper.autoplay.start();
            }
          });
        });

        // Error handling
        try {
          // Store reference for potential external access
          carousel.swiperInstance = swiper;
          
        } catch (error) {
          console.error('Failed to initialize carousel:', error);
        }
      });
    },

    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        // Clean up Swiper instances
        const carousels = context.querySelectorAll('[data-carousel-initialized="swiper"]');
        carousels.forEach(function (carousel) {
          if (carousel.swiperInstance) {
            carousel.swiperInstance.destroy(true, true);
            delete carousel.swiperInstance;
            carousel.removeAttribute('data-carousel-initialized');
          }
        });
      }
    }
  };

})(Drupal, once);