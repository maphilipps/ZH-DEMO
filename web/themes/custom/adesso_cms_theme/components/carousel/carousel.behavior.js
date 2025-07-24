/**
 * @file
 * Carousel behavior for skagenhotel.com-inspired cards layout using traditional Swiper.
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.carouselBehavior = {
    attach: function (context, settings) {
      // Initialize all carousel instances using traditional Swiper approach
      once('carousel-swiper', '[data-swiper-carousel="true"]', context).forEach(function (carousel) {
        // Skip if Swiper is not available
        if (typeof Swiper === 'undefined') {
          console.warn('[carousel] Swiper.js library not loaded. Carousel initialization skipped.');
          return;
        }
        
        // Enhanced debugging for carousel element validation
        console.log('[carousel] Initializing carousel:', carousel);
        
        // Validate carousel element
        if (!carousel) {
          console.error('[carousel] Carousel element is null or undefined');
          return;
        }

        // Get carousel configuration from data attributes with defensive programming
        const carouselId = carousel.getAttribute('data-swiper-id');
        if (!carouselId) {
          console.error('[carousel] Missing carousel ID attribute');
          return;
        }
        
        const autoplay = carousel.getAttribute('data-swiper-autoplay') === 'true';
        const interval = parseInt(carousel.getAttribute('data-swiper-interval')) || 5000;
        const pauseOnHover = carousel.getAttribute('data-swiper-pause-on-hover') !== 'false';
        const cardsPerView = parseInt(carousel.getAttribute('data-swiper-cards-per-view')) || 3;
        
        console.log('[carousel] Configuration:', { carouselId, autoplay, interval, pauseOnHover });
        
        // Validate slides exist before initialization
        const slidesWrapper = carousel.querySelector('.swiper-wrapper');
        const slides = carousel.querySelectorAll('.swiper-slide');
        
        if (!slidesWrapper) {
          console.error('[carousel] Missing .swiper-wrapper element');
          return;
        }
        
        if (slides.length === 0) {
          console.warn('[carousel] No slides found in carousel, skipping initialization');
          return;
        }
        
        console.log('[carousel] Found', slides.length, 'slides');
        
        // Find navigation buttons by ID with validation
        const nextButton = document.querySelector(`.swiper-next-${carouselId}`);
        const prevButton = document.querySelector(`.swiper-prev-${carouselId}`);
        
        if (!nextButton || !prevButton) {
          console.warn('[carousel] Navigation buttons not found:', { nextButton: !!nextButton, prevButton: !!prevButton });
        } else {
          console.log('[carousel] Navigation buttons found successfully');
        }
        
        // skagenhotel.com inspired configuration - horizontal card layout
        const swiperConfig = {
          // Core settings for cards layout
          slidesPerView: 'auto',
          spaceBetween: 20,
          grabCursor: true,
          
          // Navigation - only configure if buttons exist
          navigation: (nextButton && prevButton) ? {
            nextEl: nextButton,
            prevEl: prevButton,
          } : false,
          
          // No pagination for this layout (matches skagenhotel.com)
          pagination: false,
          
          // No looping to match the original
          loop: false,
          
          // Autoplay configuration
          autoplay: autoplay ? {
            delay: interval,
            disableOnInteraction: false,
            pauseOnMouseEnter: pauseOnHover,
          } : false,
          
          // Accessibility
          a11y: {
            enabled: true,
            prevSlideMessage: 'Previous cards',
            nextSlideMessage: 'Next cards',
          },
          
          // Keyboard navigation
          keyboard: {
            enabled: true,
            onlyInViewport: true,
          },
          
          // Smooth transitions
          speed: 600,
          effect: 'slide',
          
          // Free mode for natural scrolling like skagenhotel.com
          freeMode: {
            enabled: true,
            sticky: false,
          },
          
          // Event callbacks
          on: {
            init: function () {
              try {
                // Add custom ARIA live region for announcements
                const liveRegion = document.createElement('div');
                liveRegion.setAttribute('aria-live', 'polite');
                liveRegion.setAttribute('aria-atomic', 'true');
                liveRegion.setAttribute('class', 'sr-only');
                liveRegion.id = 'swiper-live-region-' + Math.random().toString(36).substr(2, 9);
                carousel.appendChild(liveRegion);
                
                // Store reference to live region
                this.liveRegion = liveRegion;
                
                // Defensive check for slides before counting
                const totalSlides = this.slides ? this.slides.length : 0;
                if (totalSlides > 0) {
                  liveRegion.textContent = `Carousel loaded with ${totalSlides} items`;
                  console.log('[carousel] Successfully initialized with', totalSlides, 'slides');
                } else {
                  liveRegion.textContent = 'Carousel loaded but no items found';
                  console.warn('[carousel] Initialized but no slides detected');
                }
                
                // Add initialization marker
                carousel.setAttribute('data-swiper-initialized', 'swiper');
                
                // Update navigation button states
                if (nextButton && prevButton) {
                  const isBeginning = this.isBeginning;
                  const isEnd = this.isEnd;
                  
                  prevButton.disabled = isBeginning;
                  nextButton.disabled = isEnd;
                  
                  prevButton.setAttribute('aria-disabled', isBeginning.toString());
                  nextButton.setAttribute('aria-disabled', isEnd.toString());
                }
                
              } catch (error) {
                console.error('[carousel] Error during initialization:', error);
              }
            },
            
            slideChange: function () {
              try {
                // Update announcement for accessibility with defensive checks
                const totalSlides = this.slides ? this.slides.length : 0;
                const activeIndex = typeof this.activeIndex !== 'undefined' ? this.activeIndex : 0;
                
                if (this.liveRegion && totalSlides > 0) {
                  this.liveRegion.textContent = `Showing slide ${activeIndex + 1} of ${totalSlides}`;
                }
                
                // Update navigation states directly
                if (nextButton && prevButton) {
                  const isBeginning = this.isBeginning;
                  const isEnd = this.isEnd;
                  
                  // Update disabled states
                  prevButton.disabled = isBeginning;
                  nextButton.disabled = isEnd;
                  
                  // Update ARIA states
                  prevButton.setAttribute('aria-disabled', isBeginning.toString());
                  nextButton.setAttribute('aria-disabled', isEnd.toString());
                }
                
              } catch (error) {
                console.error('[carousel] Error during slide change:', error);
              }
            },
            
            autoplayStart: function () {
              try {
                // Handle autoplay state for accessibility
                if (nextButton) {
                  nextButton.setAttribute('aria-label', 'Next slide (autoplay active)');
                }
                if (prevButton) {
                  prevButton.setAttribute('aria-label', 'Previous slide (autoplay active)');
                }
                console.log('[carousel] Autoplay started');
              } catch (error) {
                console.error('[carousel] Error handling autoplay start:', error);
              }
            },
            
            autoplayStop: function () {
              try {
                // Handle autoplay state for accessibility
                if (nextButton) {
                  nextButton.setAttribute('aria-label', 'Next slide');
                }
                if (prevButton) {
                  prevButton.setAttribute('aria-label', 'Previous slide');
                }
                console.log('[carousel] Autoplay stopped');
              } catch (error) {
                console.error('[carousel] Error handling autoplay stop:', error);
              }
            },
            
            error: function (swiper, error) {
              console.error('[carousel] Swiper error:', error);
            },
          },
        };

        // Initialize Swiper with the skagenhotel.com configuration
        try {
          console.log('[carousel] Initializing Swiper with config:', swiperConfig);
          const swiper = new Swiper(carousel, swiperConfig);
          
          if (!swiper) {
            throw new Error('Swiper initialization returned null or undefined');
          }

          // Enhanced keyboard navigation with defensive checks
          carousel.addEventListener('keydown', function (e) {
            try {
              if (!swiper || !swiper.slides) {
                console.warn('[carousel] Swiper not available for keyboard navigation');
                return;
              }
              
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
            } catch (error) {
              console.error('[carousel] Error in keyboard navigation:', error);
            }
          });

          // Handle autoplay pause/resume on focus for accessibility
          const focusableElements = carousel.querySelectorAll('a, button, [tabindex="0"], [tabindex="-1"]');
          console.log('[carousel] Found', focusableElements.length, 'focusable elements');
          
          focusableElements.forEach(function (element) {
            element.addEventListener('focus', function () {
              try {
                if (autoplay && swiper && swiper.autoplay) {
                  swiper.autoplay.stop();
                }
              } catch (error) {
                console.error('[carousel] Error stopping autoplay on focus:', error);
              }
            });
            
            element.addEventListener('blur', function () {
              try {
                if (autoplay && swiper && swiper.autoplay && !carousel.matches(':hover')) {
                  swiper.autoplay.start();
                }
              } catch (error) {
                console.error('[carousel] Error starting autoplay on blur:', error);
              }
            });
          });

          // Store reference for potential external access
          carousel.swiperInstance = swiper;
          
          console.log('[carousel] Carousel initialized successfully for ID:', carouselId);
          
        } catch (error) {
          console.error('[carousel] Failed to initialize carousel:', error);
          console.error('[carousel] Error details:', {
            carouselId: carouselId,
            slides: slides ? slides.length : 'N/A',
            hasWrapper: !!slidesWrapper,
            hasButtons: !!(nextButton && prevButton)
          });
          
          // Mark as failed initialization to prevent further attempts
          carousel.setAttribute('data-swiper-error', 'true');
        }
      });
    },

    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        try {
          // Clean up Swiper instances
          const carousels = context.querySelectorAll('[data-swiper-initialized="swiper"]');
          console.log('[carousel] Cleaning up', carousels.length, 'carousel instances');
          
          carousels.forEach(function (carousel) {
            if (carousel.swiperInstance) {
              try {
                carousel.swiperInstance.destroy(true, true);
                delete carousel.swiperInstance;
                carousel.removeAttribute('data-swiper-initialized');
                console.log('[carousel] Successfully cleaned up carousel');
              } catch (error) {
                console.error('[carousel] Error destroying carousel instance:', error);
              }
            }
          });
        } catch (error) {
          console.error('[carousel] Error during detach cleanup:', error);
        }
      }
    }
  };

})(Drupal, once);