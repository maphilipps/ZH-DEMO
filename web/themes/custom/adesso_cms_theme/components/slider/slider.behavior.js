/**
 * @file
 * Slider/Carousel behavior using Flowbite carousel functionality.
 */

(function (Drupal) {
  'use strict';

  Drupal.behaviors.adessoSlider = {
    attach: function (context, settings) {
      // Don't use Flowbite's carousel, use our custom implementation
      // if (typeof window.initCarousels === 'function') {
      //   window.initCarousels();
      // } else {
      // Custom implementation with our timing
      const carousels = context.querySelectorAll('[data-carousel]');

      carousels.forEach(carousel => {
        // Force re-initialization with our timing
        carousel.removeAttribute('data-carousel-initialized');

        if (carousel.hasAttribute('data-adesso-slider-initialized')) {
          return;
        }

        const items = carousel.querySelectorAll('[data-carousel-item]');
        const prevButton = carousel.querySelector('[data-carousel-prev]');
        const nextButton = carousel.querySelector('[data-carousel-next]');
        const indicators = carousel.querySelectorAll('[data-carousel-slide-to]');

        let activeIndex = 0;

        // Find initially active item
        items.forEach((item, index) => {
          if (item.hasAttribute('data-carousel-active')) {
            activeIndex = index;
          }
        });

        // Function to show specific slide
        const showSlide = (index, direction = 'next') => {
          const currentItem = items[activeIndex];
          const nextItem = items[index];

          if (!nextItem || currentItem === nextItem) {
            return;
          }

          // Set initial positions
          currentItem.style.zIndex = '10';
          nextItem.style.zIndex = '20';

          // Remove hidden and set initial transform
          nextItem.classList.remove('hidden');

          if (direction === 'next') {
            // Next item starts from right (off-screen)
            nextItem.style.transform = 'translateX(100%)';
          }
          else {
            // Next item starts from left (off-screen)
            nextItem.style.transform = 'translateX(-100%)';
          }

          // Force reflow
          void nextItem.offsetWidth;

          // Start animation
          requestAnimationFrame(() => {
            // Add transition class (2.5 seconds for slower animation)
            currentItem.style.transition = 'transform 2500ms ease-in-out';
            nextItem.style.transition = 'transform 2500ms ease-in-out';

            if (direction === 'next') {
              // Current slides left, next slides in from right
              currentItem.style.transform = 'translateX(-100%)';
              nextItem.style.transform = 'translateX(0)';
            }
            else {
              // Current slides right, next slides in from left
              currentItem.style.transform = 'translateX(100%)';
              nextItem.style.transform = 'translateX(0)';
            }
          });

          // Clean up after animation (match the 2500ms duration)
          setTimeout(() => {
            currentItem.classList.add('hidden');
            currentItem.style.transform = '';
            currentItem.style.transition = '';
            currentItem.style.zIndex = '';
            currentItem.removeAttribute('data-carousel-active');

            nextItem.style.transition = '';
            nextItem.style.zIndex = '';
            nextItem.setAttribute('data-carousel-active', '');
          }, 2500);

          // Update indicators immediately
          indicators.forEach((indicator, i) => {
            if (i === index) {
              indicator.setAttribute('aria-current', 'true');
              indicator.classList.add('bg-white');
              indicator.classList.remove('bg-white/30');
            }
            else {
              indicator.setAttribute('aria-current', 'false');
              indicator.classList.remove('bg-white');
              indicator.classList.add('bg-white/30');
            }
          });

          activeIndex = index;
        };

        // Previous button handler
        if (prevButton) {
          prevButton.addEventListener('click', () => {
            const newIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
            showSlide(newIndex, 'prev');
          });
        }

        // Next button handler
        if (nextButton) {
          nextButton.addEventListener('click', () => {
            const newIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
            showSlide(newIndex, 'next');
          });
        }

        // Indicator click handlers
        indicators.forEach((indicator, index) => {
          indicator.addEventListener('click', () => {
            const direction = index > activeIndex ? 'next' : 'prev';
            showSlide(index, direction);
          });
        });

        // Auto-slide if configured
        if (carousel.getAttribute('data-carousel') === 'slide') {
          setInterval(() => {
            const newIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
            showSlide(newIndex, 'next');
          }, 12000); // Change slide every 12 seconds
        }

        // Mark as initialized with our custom attribute
        carousel.setAttribute('data-adesso-slider-initialized', 'true');

        // Initialize display
        showSlide(activeIndex);
      });
      // }
    }
  };

})(Drupal);
