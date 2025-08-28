/**
 * @file Carousel component tests
 * Tests for carousel component functionality, Swiper integration, and responsive behavior
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock Twig template rendering - simulates the carousel.twig template logic
function renderCarousel(props = {}) {
  const {
    items = [],
    cards_per_view = '3',
    autoplay = false,
    interval = '5000',
    pause_on_hover = true,
    class: customClass = '',
    item_class = '',
  } = props;

  if (!items || items.length === 0) {
    return '<div class="carousel-empty">No carousel items to display</div>';
  }

  // Container classes
  const containerClasses = ['carousel-wrapper', customClass]
    .filter(Boolean)
    .join(' ');

  // Generate carousel items HTML
  const itemsHtml = items
    .map((item, index) => {
      const { media = '', title = '', summary = '', link = {} } = item;

      const itemClasses = ['carousel-item', 'swiper-slide', item_class]
        .filter(Boolean)
        .join(' ');

      const linkHtml =
        link.url && link.title
          ? `<a href="${link.url}" class="carousel-item-link inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mt-4">
        ${link.title}
        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </a>`
          : '';

      return `
      <div class="${itemClasses}" data-carousel-item data-item-index="${index}">
        <div class="carousel-card bg-white rounded-lg shadow-lg overflow-hidden h-full">
          ${media ? `<div class="carousel-media aspect-video overflow-hidden">${media}</div>` : ''}
          <div class="carousel-content p-6">
            ${title ? `<h3 class="carousel-title text-xl font-bold mb-3">${title}</h3>` : ''}
            ${summary ? `<div class="carousel-summary text-gray-600 mb-4">${summary}</div>` : ''}
            ${linkHtml}
          </div>
        </div>
      </div>
    `;
    })
    .join('');

  // Swiper configuration attributes
  const swiperConfig = {
    'data-cards-per-view': cards_per_view,
    'data-autoplay': autoplay ? 'true' : 'false',
    'data-interval': interval,
    'data-pause-on-hover': pause_on_hover ? 'true' : 'false',
  };

  const swiperAttributes = Object.entries(swiperConfig)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  return `
    <section class="${containerClasses}" data-carousel ${swiperAttributes}>
      <div class="carousel-container">
        <div class="swiper" data-swiper-carousel>
          <div class="swiper-wrapper">
            ${itemsHtml}
          </div>
          
          <!-- Navigation -->
          <div class="carousel-navigation">
            <button class="swiper-button-prev carousel-prev" data-carousel-prev aria-label="Previous slide">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button class="swiper-button-next carousel-next" data-carousel-next aria-label="Next slide">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
          
          <!-- Pagination -->
          <div class="swiper-pagination carousel-pagination" data-carousel-pagination></div>
        </div>
      </div>
    </section>
  `;
}

// Mock Swiper behavior
function initCarouselBehavior(container) {
  const carousel = container.querySelector('[data-swiper-carousel]');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.swiper-slide');
  const prevButton = container.querySelector('[data-carousel-prev]');
  const nextButton = container.querySelector('[data-carousel-next]');
  const pagination = container.querySelector('[data-carousel-pagination]');

  const cardsPerView = parseInt(
    container
      .querySelector('[data-carousel]')
      .getAttribute('data-cards-per-view') || '3'
  );
  const isAutoplay =
    container.querySelector('[data-carousel]').getAttribute('data-autoplay') ===
    'true';
  const interval = parseInt(
    container.querySelector('[data-carousel]').getAttribute('data-interval') ||
      '5000'
  );

  let currentIndex = 0;
  let autoplayTimer = null;
  let maxIndex = Math.max(0, slides.length - cardsPerView);

  // Update slide positions
  function updateSlides() {
    slides.forEach((slide, index) => {
      const isVisible =
        index >= currentIndex && index < currentIndex + cardsPerView;
      slide.style.display = isVisible ? 'block' : 'none';
      slide.classList.toggle('swiper-slide-active', index === currentIndex);
    });

    // Update navigation buttons
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= maxIndex;

    // Update pagination
    updatePagination();
  }

  // Update pagination dots
  function updatePagination() {
    if (!pagination) return;

    const totalPages = Math.ceil(slides.length / cardsPerView);
    const currentPage = Math.floor(currentIndex / cardsPerView);

    const dots = Array.from(
      { length: totalPages },
      (_, i) =>
        `<button class="pagination-dot ${i === currentPage ? 'active' : ''}" data-slide-to="${i * cardsPerView}"></button>`
    ).join('');

    pagination.innerHTML = dots;

    // Add click handlers to dots
    pagination.querySelectorAll('.pagination-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const slideToIndex = parseInt(dot.getAttribute('data-slide-to'));
        goToSlide(slideToIndex);
      });
    });
  }

  // Go to specific slide
  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    updateSlides();

    // Trigger custom event
    carousel.dispatchEvent(
      new CustomEvent('slideChange', {
        detail: { currentIndex, totalSlides: slides.length },
      })
    );
  }

  // Navigation handlers
  prevButton?.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });

  nextButton?.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });

  // Autoplay functionality
  function startAutoplay() {
    if (!isAutoplay) return;

    autoplayTimer = setInterval(() => {
      if (currentIndex >= maxIndex) {
        goToSlide(0); // Loop back to start
      } else {
        goToSlide(currentIndex + 1);
      }
    }, interval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Pause on hover
  const pauseOnHover =
    container
      .querySelector('[data-carousel]')
      .getAttribute('data-pause-on-hover') === 'true';
  if (isAutoplay && pauseOnHover) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
  }

  // Keyboard navigation
  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToSlide(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToSlide(currentIndex + 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(maxIndex);
    }
  });

  // Initialize
  updateSlides();
  if (isAutoplay) {
    startAutoplay();
  }

  // Return control object for testing
  return {
    goToSlide,
    startAutoplay,
    stopAutoplay,
    getCurrentIndex: () => currentIndex,
    getTotalSlides: () => slides.length,
  };
}

describe('Carousel Component', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  describe('Basic Rendering', () => {
    it('should render with carousel items', () => {
      const items = [
        {
          media:
            '<img src="slide1.jpg" alt="Slide 1" class="w-full h-full object-cover">',
          title: 'First Slide',
          summary: 'Description of first slide',
          link: { url: '/slide1', title: 'Learn More' },
        },
        {
          media:
            '<img src="slide2.jpg" alt="Slide 2" class="w-full h-full object-cover">',
          title: 'Second Slide',
          summary: 'Description of second slide',
          link: { url: '/slide2', title: 'Read More' },
        },
      ];

      const carouselHtml = renderCarousel({ items });
      container.innerHTML = carouselHtml;

      const carousel = container.querySelector('[data-carousel]');
      const slides = container.querySelectorAll('[data-carousel-item]');

      expect(carousel).toBeInTheDocument();
      expect(slides).toHaveLength(2);
    });

    it('should show empty state when no items provided', () => {
      const carouselHtml = renderCarousel({ items: [] });
      container.innerHTML = carouselHtml;

      const emptyState = container.querySelector('.carousel-empty');
      expect(emptyState).toBeInTheDocument();
      expect(emptyState.textContent).toBe('No carousel items to display');
    });

    it('should apply custom container classes', () => {
      const items = [{ title: 'Test Slide' }];
      const carouselHtml = renderCarousel({
        items,
        class: 'custom-carousel hero-carousel',
      });
      container.innerHTML = carouselHtml;

      const carousel = container.querySelector('.carousel-wrapper');
      expect(carousel.className).toContain('custom-carousel');
      expect(carousel.className).toContain('hero-carousel');
    });

    it('should apply custom item classes', () => {
      const items = [{ title: 'Test Slide' }];
      const carouselHtml = renderCarousel({
        items,
        item_class: 'custom-item testimonial-card',
      });
      container.innerHTML = carouselHtml;

      const slide = container.querySelector('[data-carousel-item]');
      expect(slide.className).toContain('custom-item');
      expect(slide.className).toContain('testimonial-card');
    });
  });

  describe('Carousel Items', () => {
    it('should render item with all content elements', () => {
      const items = [
        {
          media:
            '<img src="test.jpg" alt="Test image" class="w-full h-full object-cover">',
          title: 'Test Title',
          summary: 'Test summary content',
          link: { url: '/test', title: 'Test Link' },
        },
      ];

      const carouselHtml = renderCarousel({ items });
      container.innerHTML = carouselHtml;

      const slide = container.querySelector('[data-carousel-item]');
      const media = container.querySelector('.carousel-media');
      const title = container.querySelector('.carousel-title');
      const summary = container.querySelector('.carousel-summary');
      const link = container.querySelector('.carousel-item-link');

      expect(slide).toBeInTheDocument();
      expect(media).toBeInTheDocument();
      expect(media.innerHTML).toContain('<img src="test.jpg"');
      expect(title).toBeInTheDocument();
      expect(title.textContent).toBe('Test Title');
      expect(summary).toBeInTheDocument();
      expect(summary.textContent).toBe('Test summary content');
      expect(link).toBeInTheDocument();
      expect(link.getAttribute('href')).toBe('/test');
      expect(link.textContent).toContain('Test Link');
    });

    it('should render item without optional elements', () => {
      const items = [{ title: 'Minimal Slide' }];

      const carouselHtml = renderCarousel({ items });
      container.innerHTML = carouselHtml;

      const slide = container.querySelector('[data-carousel-item]');
      const title = container.querySelector('.carousel-title');

      expect(slide).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(
        container.querySelector('.carousel-media')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.carousel-summary')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.carousel-item-link')
      ).not.toBeInTheDocument();
    });

    it('should not render link when incomplete', () => {
      const items = [
        { title: 'No Link', link: {} },
        { title: 'No URL', link: { title: 'Button' } },
        { title: 'No Title', link: { url: '/test' } },
      ];

      const carouselHtml = renderCarousel({ items });
      container.innerHTML = carouselHtml;

      const links = container.querySelectorAll('.carousel-item-link');
      expect(links).toHaveLength(0);
    });

    it('should have proper slide indices', () => {
      const items = [
        { title: 'First' },
        { title: 'Second' },
        { title: 'Third' },
      ];

      const carouselHtml = renderCarousel({ items });
      container.innerHTML = carouselHtml;

      const slides = container.querySelectorAll('[data-carousel-item]');

      slides.forEach((slide, index) => {
        expect(slide.getAttribute('data-item-index')).toBe(index.toString());
      });
    });
  });

  describe('Configuration', () => {
    it('should set cards per view configuration', () => {
      const items = [{ title: 'Test' }];
      const carouselHtml = renderCarousel({ items, cards_per_view: '4' });
      container.innerHTML = carouselHtml;

      const carousel = container.querySelector('[data-carousel]');
      expect(carousel.getAttribute('data-cards-per-view')).toBe('4');
    });

    it('should set autoplay configuration', () => {
      const items = [{ title: 'Test' }];
      const carouselHtml = renderCarousel({ items, autoplay: true });
      container.innerHTML = carouselHtml;

      const carousel = container.querySelector('[data-carousel]');
      expect(carousel.getAttribute('data-autoplay')).toBe('true');
    });

    it('should set interval configuration', () => {
      const items = [{ title: 'Test' }];
      const carouselHtml = renderCarousel({ items, interval: '3000' });
      container.innerHTML = carouselHtml;

      const carousel = container.querySelector('[data-carousel]');
      expect(carousel.getAttribute('data-interval')).toBe('3000');
    });

    it('should set pause on hover configuration', () => {
      const items = [{ title: 'Test' }];
      const carouselHtml = renderCarousel({ items, pause_on_hover: false });
      container.innerHTML = carouselHtml;

      const carousel = container.querySelector('[data-carousel]');
      expect(carousel.getAttribute('data-pause-on-hover')).toBe('false');
    });
  });

  describe('Navigation', () => {
    it('should render navigation buttons', () => {
      const items = [{ title: 'Test 1' }, { title: 'Test 2' }];
      const carouselHtml = renderCarousel({ items });
      container.innerHTML = carouselHtml;

      const prevButton = container.querySelector('[data-carousel-prev]');
      const nextButton = container.querySelector('[data-carousel-next]');

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
      expect(prevButton.getAttribute('aria-label')).toBe('Previous slide');
      expect(nextButton.getAttribute('aria-label')).toBe('Next slide');
    });

    it('should navigate slides with buttons', () => {
      const items = [
        { title: 'Slide 1' },
        { title: 'Slide 2' },
        { title: 'Slide 3' },
        { title: 'Slide 4' },
      ];
      const carouselHtml = renderCarousel({ items, cards_per_view: '2' });
      container.innerHTML = carouselHtml;

      const controller = initCarouselBehavior(container);
      const nextButton = container.querySelector('[data-carousel-next]');
      const prevButton = container.querySelector('[data-carousel-prev]');

      // Initially at slide 0
      expect(controller.getCurrentIndex()).toBe(0);
      expect(prevButton.disabled).toBe(true);

      // Navigate forward
      nextButton.click();
      expect(controller.getCurrentIndex()).toBe(1);
      expect(prevButton.disabled).toBe(false);

      // Navigate backward
      prevButton.click();
      expect(controller.getCurrentIndex()).toBe(0);
      expect(prevButton.disabled).toBe(true);
    });

    it('should render pagination dots', () => {
      const items = [
        { title: 'Slide 1' },
        { title: 'Slide 2' },
        { title: 'Slide 3' },
        { title: 'Slide 4' },
      ];
      const carouselHtml = renderCarousel({ items, cards_per_view: '2' });
      container.innerHTML = carouselHtml;

      initCarouselBehavior(container);

      const pagination = container.querySelector('[data-carousel-pagination]');
      const dots = container.querySelectorAll('.pagination-dot');

      expect(pagination).toBeInTheDocument();
      expect(dots).toHaveLength(2); // 4 slides / 2 per view = 2 pages
    });

    it('should navigate with pagination dots', () => {
      const items = [
        { title: 'Slide 1' },
        { title: 'Slide 2' },
        { title: 'Slide 3' },
        { title: 'Slide 4' },
      ];
      const carouselHtml = renderCarousel({ items, cards_per_view: '2' });
      container.innerHTML = carouselHtml;

      const controller = initCarouselBehavior(container);

      const dots = container.querySelectorAll('.pagination-dot');

      // Click second dot
      dots[1].click();
      expect(controller.getCurrentIndex()).toBe(2);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate with arrow keys', () => {
      const items = [
        { title: 'Slide 1' },
        { title: 'Slide 2' },
        { title: 'Slide 3' },
      ];
      const carouselHtml = renderCarousel({ items, cards_per_view: '1' });
      container.innerHTML = carouselHtml;

      const controller = initCarouselBehavior(container);
      const carousel = container.querySelector('[data-swiper-carousel]');

      // Navigate right
      carousel.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight' })
      );
      expect(controller.getCurrentIndex()).toBe(1);

      // Navigate left
      carousel.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft' })
      );
      expect(controller.getCurrentIndex()).toBe(0);
    });

    it('should navigate with Home and End keys', () => {
      const items = [
        { title: 'Slide 1' },
        { title: 'Slide 2' },
        { title: 'Slide 3' },
      ];
      const carouselHtml = renderCarousel({ items, cards_per_view: '1' });
      container.innerHTML = carouselHtml;

      const controller = initCarouselBehavior(container);
      const carousel = container.querySelector('[data-swiper-carousel]');

      // Go to end
      carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
      expect(controller.getCurrentIndex()).toBe(2);

      // Go to beginning
      carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
      expect(controller.getCurrentIndex()).toBe(0);
    });
  });

  describe('Autoplay Functionality', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should auto-advance slides when autoplay is enabled', () => {
      const items = [
        { title: 'Slide 1' },
        { title: 'Slide 2' },
        { title: 'Slide 3' },
      ];
      const carouselHtml = renderCarousel({
        items,
        cards_per_view: '1',
        autoplay: true,
        interval: '1000',
      });
      container.innerHTML = carouselHtml;

      const controller = initCarouselBehavior(container);

      // Initially at slide 0
      expect(controller.getCurrentIndex()).toBe(0);

      // Advance time by interval
      vi.advanceTimersByTime(1000);
      expect(controller.getCurrentIndex()).toBe(1);

      // Advance again
      vi.advanceTimersByTime(1000);
      expect(controller.getCurrentIndex()).toBe(2);

      // Should loop back to start
      vi.advanceTimersByTime(1000);
      expect(controller.getCurrentIndex()).toBe(0);
    });

    it('should pause autoplay on hover when pause_on_hover is true', () => {
      const items = [{ title: 'Slide 1' }, { title: 'Slide 2' }];
      const carouselHtml = renderCarousel({
        items,
        cards_per_view: '1',
        autoplay: true,
        interval: '1000',
        pause_on_hover: true,
      });
      container.innerHTML = carouselHtml;

      const controller = initCarouselBehavior(container);
      const carousel = container.querySelector('[data-swiper-carousel]');

      // Initially at slide 0
      expect(controller.getCurrentIndex()).toBe(0);

      // Hover to pause
      carousel.dispatchEvent(new Event('mouseenter'));

      // Advance time - should not change slide
      vi.advanceTimersByTime(1000);
      expect(controller.getCurrentIndex()).toBe(0);

      // Leave hover to resume
      carousel.dispatchEvent(new Event('mouseleave'));

      // Advance time - should now change slide
      vi.advanceTimersByTime(1000);
      expect(controller.getCurrentIndex()).toBe(1);
    });

    it('should not autoplay when autoplay is disabled', () => {
      const items = [{ title: 'Slide 1' }, { title: 'Slide 2' }];
      const carouselHtml = renderCarousel({
        items,
        cards_per_view: '1',
        autoplay: false,
      });
      container.innerHTML = carouselHtml;

      const controller = initCarouselBehavior(container);

      // Initially at slide 0
      expect(controller.getCurrentIndex()).toBe(0);

      // Advance time - should not change slide
      vi.advanceTimersByTime(5000);
      expect(controller.getCurrentIndex()).toBe(0);
    });
  });

  describe('Responsive Behavior', () => {
    it('should handle different cards per view settings', () => {
      const items = [
        { title: 'Slide 1' },
        { title: 'Slide 2' },
        { title: 'Slide 3' },
        { title: 'Slide 4' },
      ];

      // Test with 1 card per view
      const carouselHtml1 = renderCarousel({ items, cards_per_view: '1' });
      container.innerHTML = carouselHtml1;

      let controller = initCarouselBehavior(container);
      expect(controller.getTotalSlides()).toBe(4);

      // Test with 2 cards per view
      const carouselHtml2 = renderCarousel({ items, cards_per_view: '2' });
      container.innerHTML = carouselHtml2;

      controller = initCarouselBehavior(container);
      expect(controller.getTotalSlides()).toBe(4);
    });

    it('should apply Swiper wrapper and slide classes', () => {
      const items = [{ title: 'Test Slide' }];
      const carouselHtml = renderCarousel({ items });
      container.innerHTML = carouselHtml;

      const wrapper = container.querySelector('.swiper-wrapper');
      const slide = container.querySelector('.swiper-slide');

      expect(wrapper).toBeInTheDocument();
      expect(slide).toBeInTheDocument();
      expect(slide.className).toContain('carousel-item');
    });
  });

  describe('Events', () => {
    it('should dispatch slide change events', () => {
      const items = [{ title: 'Slide 1' }, { title: 'Slide 2' }];
      const carouselHtml = renderCarousel({ items, cards_per_view: '1' });
      container.innerHTML = carouselHtml;

      const controller = initCarouselBehavior(container);
      const carousel = container.querySelector('[data-swiper-carousel]');

      let eventFired = false;
      let eventDetail = null;

      carousel.addEventListener('slideChange', e => {
        eventFired = true;
        eventDetail = e.detail;
      });

      // Navigate to next slide
      controller.goToSlide(1);

      expect(eventFired).toBe(true);
      expect(eventDetail.currentIndex).toBe(1);
      expect(eventDetail.totalSlides).toBe(2);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels on navigation buttons', () => {
      const items = [{ title: 'Test' }];
      const carouselHtml = renderCarousel({ items });
      container.innerHTML = carouselHtml;

      const prevButton = container.querySelector('[data-carousel-prev]');
      const nextButton = container.querySelector('[data-carousel-next]');

      expect(prevButton.getAttribute('aria-label')).toBe('Previous slide');
      expect(nextButton.getAttribute('aria-label')).toBe('Next slide');
    });

    it('should manage button disabled states properly', () => {
      const items = [{ title: 'Slide 1' }, { title: 'Slide 2' }];
      const carouselHtml = renderCarousel({ items, cards_per_view: '1' });
      container.innerHTML = carouselHtml;

      const controller = initCarouselBehavior(container);
      const prevButton = container.querySelector('[data-carousel-prev]');
      const nextButton = container.querySelector('[data-carousel-next]');

      // At start - prev should be disabled
      expect(prevButton.disabled).toBe(true);
      expect(nextButton.disabled).toBe(false);

      // Navigate to end
      controller.goToSlide(1);
      expect(prevButton.disabled).toBe(false);
      expect(nextButton.disabled).toBe(true);
    });

    it('should have semantic structure', () => {
      const items = [{ title: 'Accessible Slide' }];
      const carouselHtml = renderCarousel({ items });
      container.innerHTML = carouselHtml;

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section.className).toContain('carousel-wrapper');
    });
  });

  describe('Edge Cases', () => {
    it('should handle single item carousel', () => {
      const items = [{ title: 'Only Slide' }];
      const carouselHtml = renderCarousel({ items, cards_per_view: '1' });
      container.innerHTML = carouselHtml;

      const controller = initCarouselBehavior(container);
      const prevButton = container.querySelector('[data-carousel-prev]');
      const nextButton = container.querySelector('[data-carousel-next]');

      expect(controller.getTotalSlides()).toBe(1);
      expect(prevButton.disabled).toBe(true);
      expect(nextButton.disabled).toBe(true);
    });

    it('should handle HTML content in carousel items', () => {
      const items = [
        {
          media:
            '<video controls><source src="video.mp4" type="video/mp4"></video>',
          title: 'Video Slide',
          summary:
            'Slide with <strong>HTML</strong> content and <a href="#">links</a>',
          link: { url: '/video', title: 'Watch Video' },
        },
      ];

      const carouselHtml = renderCarousel({ items });
      container.innerHTML = carouselHtml;

      const media = container.querySelector('.carousel-media');
      const summary = container.querySelector('.carousel-summary');

      expect(media.innerHTML).toContain('<video');
      expect(summary.innerHTML).toContain('<strong>HTML</strong>');
      expect(summary.innerHTML).toContain('<a href="#">links</a>');
    });

    it('should handle special characters in content', () => {
      const items = [
        {
          title: 'Title with "quotes" & <symbols>',
          summary: 'Summary with "quotes" & <symbols>',
        },
      ];

      const carouselHtml = renderCarousel({ items });
      container.innerHTML = carouselHtml;

      const title = container.querySelector('.carousel-title');
      const summary = container.querySelector('.carousel-summary');

      // HTML entities are automatically decoded by textContent
      expect(title.textContent).toContain('Title with "quotes" & ');
      expect(summary.textContent).toContain('Summary with "quotes" & ');
    });

    it('should handle zero cards per view gracefully', () => {
      const items = [{ title: 'Test' }];
      const carouselHtml = renderCarousel({ items, cards_per_view: '0' });
      container.innerHTML = carouselHtml;

      const carousel = container.querySelector('[data-carousel]');
      expect(carousel.getAttribute('data-cards-per-view')).toBe('0');

      // Should still render the carousel structure
      expect(container.querySelector('.swiper')).toBeInTheDocument();
    });
  });
});
