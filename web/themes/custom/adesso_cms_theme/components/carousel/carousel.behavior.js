/**
 * @file
 * Carousel behavior using Swiper.js.
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.carouselBehavior = {
    attach: function (context) {
      // Initialize all carousel instances using once for proper initialization
      once('carousel-swiper', '[data-swiper-carousel="true"]', context).forEach(
        function (carousel) {
          // Skip if Swiper is not available
          if (typeof Swiper === 'undefined') {
            console.warn(
              'Swiper.js library not loaded. Carousel initialization skipped.'
            );
            return;
          }

          // Get carousel configuration from data attributes
          const carouselId = carousel.getAttribute('data-swiper-id');
          const autoplay =
            carousel.getAttribute('data-swiper-autoplay') === 'true';
          const interval =
            parseInt(carousel.getAttribute('data-swiper-interval')) || 5000;
          const pauseOnHover =
            carousel.getAttribute('data-swiper-pause-on-hover') !== 'false';
          const cardsPerView =
            parseInt(carousel.getAttribute('data-swiper-cards-per-view')) || 3;

          // Validate carousel structure
          const slidesWrapper = carousel.querySelector('.swiper-wrapper');
          const slides = carousel.querySelectorAll('.swiper-slide');
          if (!slidesWrapper) {
            console.error('[carousel] Missing .swiper-wrapper element');
            return;
          }
          if (slides.length === 0) {
            console.warn('[carousel] No slides found in carousel');
            return;
          }

          // Dynamic navigation selectors based on carousel ID
          const nextButton = document.querySelector(
            `.swiper-next-${carouselId}`
          );
          const prevButton = document.querySelector(
            `.swiper-prev-${carouselId}`
          );
          // Initialize Swiper with carousel-appropriate configuration
          const swiperConfig = {
            // Basic navigation with dynamic selectors
            navigation: {
              nextEl: nextButton,
              prevEl: prevButton
            },

            // Pagination with clickable dots
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
              bulletActiveClass: 'swiper-pagination-bullet-active',
              bulletClass: 'swiper-pagination-bullet'
            },

            // Loop configuration
            loop: false,
            slidesPerView: cardsPerView,
            spaceBetween: 20,
            // Responsive breakpoints for cards layout
            breakpoints: {
              320: {
                slidesPerView: 1,
                spaceBetween: 16
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 16,
                navigation: {
                  enabled: false
                }
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
                navigation: {
                  enabled: true
                }
              },
              1024: {
                slidesPerView: cardsPerView,
                spaceBetween: 24,
                navigation: {
                  enabled: true
                }
              }
            },
            // Autoplay configuration
            autoplay: autoplay
              ? {
                delay: interval,
                disableOnInteraction: false,
                pauseOnMouseEnter: pauseOnHover
              }
              : false,

            // Accessibility settings
            a11y: {
              enabled: true,
              prevSlideMessage: 'Previous slide',
              nextSlideMessage: 'Next slide',
              paginationBulletMessage: 'Go to slide {{index}}'
            },

            // Keyboard navigation
            keyboard: {
              enabled: true,
              onlyInViewport: true
            },

            // Animation settings
            speed: 600,
            effect: 'slide',

            // Event callbacks
            on: {
              init: function () {
                // Add custom ARIA live region for announcements
                const liveRegion = document.createElement('div');
                liveRegion.setAttribute('aria-live', 'polite');
                liveRegion.setAttribute('aria-atomic', 'true');
                liveRegion.setAttribute('class', 'sr-only');
                liveRegion.id =
                  'swiper-live-region-' +
                  Math.random().toString(36).substr(2, 9);
                carousel.appendChild(liveRegion);

                // Store reference to live region
                this.liveRegion = liveRegion;

                // Update initial announcement
                const totalSlides = this.slides.length;
                liveRegion.textContent = `Slide 1 of ${totalSlides}`;

                // Add initialization marker for testing/debugging
                carousel.setAttribute('data-swiper-initialized', 'swiper');
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
                    const slideTitle = activeSlide.querySelector(
                      'h1, h2, h3, h4, h5, h6'
                    );
                    if (slideTitle) {
                      this.liveRegion.textContent += `: ${slideTitle.textContent}`;
                    }
                  }
                }
              },

              autoplayStart: function () {
                // Handle autoplay state for accessibility
                if (this.navigation && this.navigation.$nextEl) {
                  this.navigation.$nextEl[0].setAttribute(
                    'aria-label',
                    'Next slide (autoplay active)'
                  );
                }
                if (this.navigation && this.navigation.$prevEl) {
                  this.navigation.$prevEl[0].setAttribute(
                    'aria-label',
                    'Previous slide (autoplay active)'
                  );
                }
              },

              autoplayStop: function () {
                // Handle autoplay state for accessibility
                if (this.navigation && this.navigation.$nextEl) {
                  this.navigation.$nextEl[0].setAttribute(
                    'aria-label',
                    'Next slide'
                  );
                }
                if (this.navigation && this.navigation.$prevEl) {
                  this.navigation.$prevEl[0].setAttribute(
                    'aria-label',
                    'Previous slide'
                  );
                }
              }
            }
          };

          // Initialize Swiper instance
          console.log(
            '[carousel] Initializing Swiper with config:',
            swiperConfig
          );
          const swiper = new Swiper(carousel, swiperConfig);
          if (!swiper) {
            console.error('[carousel] Failed to initialize Swiper');
            return;
          }

          // Enhanced keyboard navigation
          carousel.addEventListener('keydown', function (e) {
            switch (e.key) {
            case 'Home':
              e.preventDefault();
              if (!swiper || !swiper.slides) {
                return;
              }
              swiper.slideTo(0);
              break;
            case 'End':
              e.preventDefault();
              if (!swiper || !swiper.slides) {
                return;
              }
              swiper.slideTo(swiper.slides.length - 1);
              break;
            }
          });

          // Handle autoplay pause/resume on focus for accessibility
          const focusableElements = carousel.querySelectorAll(
            'a, button, [tabindex="0"], [tabindex="-1"]'
          );

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
            carousel.setAttribute('data-swiper-error', 'true');
          }
        }
      );
    },

    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        // Clean up Swiper instances
        const carousels = context.querySelectorAll(
          '[data-swiper-initialized="swiper"]'
        );
        carousels.forEach(function (carousel) {
          if (carousel.swiperInstance) {
            carousel.swiperInstance.destroy(true, true);
            delete carousel.swiperInstance;
            carousel.removeAttribute('data-swiper-initialized');
          }
        });
      }
    }
  };
})(Drupal, once);
