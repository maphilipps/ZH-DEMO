/**
 * @file
 * Hero interactive behavior with CTA tracking and parallax effects.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Initialize hero functionality
   * @param {Element} heroElement - The hero container element
   * @return {void}
   */
  function initializeHero(heroElement) {
    const ctaButtons = heroElement.querySelectorAll('.cta-button, [data-cta], .hero-button');
    const backgroundImage = heroElement.querySelector('.hero-background, .hero-image');
    const heroContent = heroElement.querySelector('.hero-content');
    const enableParallax = heroElement.getAttribute('data-parallax') === 'true';
    
    // Initialize CTA button tracking
    if (ctaButtons.length > 0) {
      initializeCTAButtons(ctaButtons, heroElement);
    }

    // Initialize parallax effect if enabled
    if (enableParallax && backgroundImage) {
      initializeParallaxEffect(heroElement, backgroundImage);
    }

    // Initialize scroll-triggered animations
    initializeScrollAnimations(heroElement, heroContent);

    // Initialize video backgrounds if present
    const heroVideo = heroElement.querySelector('.hero-video');
    if (heroVideo) {
      initializeVideoBackground(heroVideo);
    }

    console.log('[adesso-hero] Hero initialized with CTA buttons:', ctaButtons.length);
  }

  /**
   * Initialize CTA button functionality
   * @param {NodeList} ctaButtons - CTA button elements
   * @param {Element} heroElement - Hero container
   * @return {void}
   */
  function initializeCTAButtons(ctaButtons, heroElement) {
    ctaButtons.forEach(function (button, index) {
      // Enhanced click tracking
      button.addEventListener('click', function (e) {
        const ctaData = {
          position: index + 1,
          text: button.textContent.trim(),
          url: button.href || button.getAttribute('data-url'),
          heroId: heroElement.id || 'hero-' + Math.random().toString(36).substr(2, 9)
        };

        // Track CTA interaction
        trackCTAClick(ctaData);

        // Add visual feedback
        button.classList.add('animate-pulse');
        setTimeout(function () {
          button.classList.remove('animate-pulse');
        }, 200);

        // Handle modal CTAs
        if (button.getAttribute('data-modal')) {
          e.preventDefault();
          openModal(button.getAttribute('data-modal'));
        }

        // Handle smooth scroll CTAs
        if (button.getAttribute('data-scroll-to')) {
          e.preventDefault();
          smoothScrollTo(button.getAttribute('data-scroll-to'));
        }
      });

      // Enhanced keyboard interaction
      button.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }
      });

      // Add focus management
      button.addEventListener('focus', function () {
        button.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
      });

      button.addEventListener('blur', function () {
        button.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
      });
    });
  }

  /**
   * Initialize parallax scrolling effect
   * @param {Element} heroElement - Hero container
   * @param {Element} backgroundImage - Background image element
   * @return {void}
   */
  function initializeParallaxEffect(heroElement, backgroundImage) {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      console.log('[adesso-hero] Parallax disabled due to reduced motion preference');
      return;
    }

    let ticking = false;

    function updateParallax() {
      const scrollTop = window.pageYOffset;
      const heroRect = heroElement.getBoundingClientRect();
      const heroTop = scrollTop + heroRect.top;
      const heroHeight = heroRect.height;
      
      // Only apply parallax when hero is in viewport
      if (scrollTop < heroTop + heroHeight && scrollTop + window.innerHeight > heroTop) {
        const parallaxSpeed = 0.5;
        const yPos = -(scrollTop - heroTop) * parallaxSpeed;
        
        backgroundImage.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
      
      ticking = false;
    }

    function requestParallaxUpdate() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    // Use passive listeners for better performance
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    window.addEventListener('resize', requestParallaxUpdate, { passive: true });

    // Store cleanup function
    heroElement.parallaxCleanup = function () {
      window.removeEventListener('scroll', requestParallaxUpdate);
      window.removeEventListener('resize', requestParallaxUpdate);
    };
  }

  /**
   * Initialize scroll-triggered animations
   * @param {Element} heroElement - Hero container
   * @param {Element} heroContent - Hero content element
   * @return {void}
   */
  function initializeScrollAnimations(heroElement, heroContent) {
    if (!heroContent) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Hero is visible - trigger entry animations
          heroContent.classList.add('animate-fade-in-up');
          
          // Stagger animation for child elements
          const animatableElements = heroContent.querySelectorAll('h1, h2, p, .cta-button');
          animatableElements.forEach(function (element, index) {
            setTimeout(function () {
              element.classList.add('animate-fade-in');
            }, index * 100);
          });
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(heroElement);
    
    // Store cleanup function
    heroElement.intersectionObserver = observer;
  }

  /**
   * Initialize video background functionality
   * @param {Element} videoElement - Video element
   * @return {void}
   */
  function initializeVideoBackground(videoElement) {
    // Ensure video is muted for autoplay
    videoElement.muted = true;
    videoElement.setAttribute('muted', '');
    
    // Add play/pause controls for accessibility
    const playPauseButton = document.createElement('button');
    playPauseButton.className = 'video-control absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded';
    playPauseButton.innerHTML = '⏸️';
    playPauseButton.setAttribute('aria-label', 'Pause background video');
    
    playPauseButton.addEventListener('click', function () {
      if (videoElement.paused) {
        videoElement.play();
        playPauseButton.innerHTML = '⏸️';
        playPauseButton.setAttribute('aria-label', 'Pause background video');
      } else {
        videoElement.pause();
        playPauseButton.innerHTML = '▶️';
        playPauseButton.setAttribute('aria-label', 'Play background video');
      }
    });
    
    // Add control button to hero
    videoElement.parentNode.appendChild(playPauseButton);
    
    // Handle video load errors gracefully
    videoElement.addEventListener('error', function () {
      console.warn('[adesso-hero] Video background failed to load');
      videoElement.style.display = 'none';
    });
  }

  /**
   * Open modal dialog
   * @param {string} modalId - Modal ID to open
   * @return {void}
   */
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      // Trigger modal open (assuming modal system is available)
      if (typeof window.openModal === 'function') {
        window.openModal(modalId);
      } else {
        modal.style.display = 'block';
        modal.classList.add('show');
      }
    }
  }

  /**
   * Smooth scroll to target element
   * @param {string} targetId - Target element ID
   * @return {void}
   */
  function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId) || document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  /**
   * Track CTA click for analytics
   * @param {Object} ctaData - CTA interaction data
   * @return {void}
   */
  function trackCTAClick(ctaData) {
    const trackingData = {
      type: 'hero_cta_click',
      ...ctaData,
      timestamp: new Date().toISOString()
    };

    // Send to analytics service if available
    if (typeof window.analytics !== 'undefined' && window.analytics.track) {
      window.analytics.track('Hero CTA Clicked', trackingData);
    }

    // Fallback to console for debugging
    console.log('[adesso-hero] CTA interaction tracked:', trackingData);
  }

  // Main Drupal behavior
  Drupal.behaviors.adessoHero = {
    attach: function (context) {
      // Find hero elements
      const heroElements = once('adesso-hero', 
        '.hero, [data-hero], .hero-section, .hero-banner', 
        context
      );
      
      if (heroElements.length === 0) {
        return;
      }

      console.log('[adesso-hero] Found', heroElements.length, 'hero section(s)');

      heroElements.forEach(function (heroElement) {
        initializeHero(heroElement);
      });
    },

    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        // Clean up observers and event listeners
        const heroes = context.querySelectorAll('.hero, [data-hero], .hero-section, .hero-banner');
        
        heroes.forEach(function (hero) {
          // Clean up parallax
          if (hero.parallaxCleanup) {
            hero.parallaxCleanup();
            delete hero.parallaxCleanup;
          }
          
          // Clean up intersection observer
          if (hero.intersectionObserver) {
            hero.intersectionObserver.disconnect();
            delete hero.intersectionObserver;
          }
          
          // Reset transforms
          const backgroundImage = hero.querySelector('.hero-background, .hero-image');
          if (backgroundImage) {
            backgroundImage.style.transform = '';
          }
          
          // Remove video controls
          const videoControls = hero.querySelectorAll('.video-control');
          videoControls.forEach(function (control) {
            control.remove();
          });
        });
      }
    }
  };

})(Drupal, once);