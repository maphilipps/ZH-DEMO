/**
 * @file
 * Enhanced Carousel stories with comprehensive QA testing
 * Focus on accessibility, keyboard navigation, and slide transitions
 * Updated to use Swiper.js instead of Splide
 */

import CarouselTemplate from './carousel.twig';
import { within, userEvent, expect } from '@storybook/test';
import { createEnhancedStory, accessibilityTestSuite, interactionTestSuite } from '../../.storybook/story-enhancement-template';

// Define mock media as separate constants
const mockMediaFirst = "<img src='./images/card.webp' class='d-block w-full' alt='First slide image' />";
const mockMediaSecond = "<img src='./images/card.webp' class='d-block w-full' alt='Second slide image' />";
const mockMediaThird = "<img src='./images/card.webp' class='d-block w-full' alt='Third slide image' />";

// Define mock items as rendered carousel items (similar to how slider works)
const mockItems = [
  '<div class="carousel-card"><div class="carousel-image-container"><img src="./images/card.webp" class="w-full h-full object-cover" alt="First slide"></div><div class="carousel-content"><h4 class="mb-1 text-lg md:text-xl font-semibold text-gray-900">First Slide</h4><div class="carousel-summary">This is the first slide</div></div></div>',
  '<div class="carousel-card"><div class="carousel-image-container"><img src="./images/card.webp" class="w-full h-full object-cover" alt="Second slide"></div><div class="carousel-content"><h4 class="mb-1 text-lg md:text-xl font-semibold text-gray-900">Second Slide</h4><div class="carousel-summary">This is the second slide</div></div></div>',
  '<div class="carousel-card"><div class="carousel-image-container"><img src="./images/card.webp" class="w-full h-full object-cover" alt="Third slide"></div><div class="carousel-content"><h4 class="mb-1 text-lg md:text-xl font-semibold text-gray-900">Third Slide</h4><div class="carousel-summary">This is the third slide</div></div></div>',
];

// Sample data for cards layout - rendered carousel items
const sampleCardsItems = [
  '<div class="carousel-card"><div class="carousel-image-container"><img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=528&h=310&q=80" alt="Modern hotel room" class="w-full h-full object-cover"></div><div class="carousel-content"><h4 class="mb-1 text-lg md:text-xl font-semibold text-gray-900">Deluxe Ocean View Suite</h4><div class="carousel-summary">Experience luxury with panoramic ocean views, premium amenities, and spacious living areas designed for ultimate comfort.</div><div class="carousel-actions"><a href="#" class="carousel-link"><span>Read more</span></a></div></div></div>',
  '<div class="carousel-card"><div class="carousel-image-container"><img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=528&h=310&q=80" alt="Hotel lobby" class="w-full h-full object-cover"></div><div class="carousel-content"><h4 class="mb-1 text-lg md:text-xl font-semibold text-gray-900">Executive Business Suite</h4><div class="carousel-summary">Perfect for business travelers with dedicated workspace, high-speed internet, and convenient city center location.</div><div class="carousel-actions"><a href="#" class="carousel-link"><span>Read more</span></a></div></div></div>',
  '<div class="carousel-card"><div class="carousel-image-container"><img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=528&h=310&q=80" alt="Family room" class="w-full h-full object-cover"></div><div class="carousel-content"><h4 class="mb-1 text-lg md:text-xl font-semibold text-gray-900">Family-Friendly Room</h4><div class="carousel-summary">Spacious accommodations perfect for families with connecting rooms, kid-friendly amenities, and entertainment options.</div><div class="carousel-actions"><a href="#" class="carousel-link"><span>Read more</span></a></div></div></div>',
  '<div class="carousel-card"><div class="carousel-image-container"><img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=528&h=310&q=80" alt="Spa suite" class="w-full h-full object-cover"></div><div class="carousel-content"><h4 class="mb-1 text-lg md:text-xl font-semibold text-gray-900">Spa & Wellness Suite</h4><div class="carousel-summary">Rejuvenate in our wellness-focused rooms featuring spa amenities, meditation spaces, and healthy lifestyle options.</div><div class="carousel-actions"><a href="#" class="carousel-link"><span>Read more</span></a></div></div></div>',
  '<div class="carousel-card"><div class="carousel-image-container"><img src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=528&h=310&q=80" alt="Romantic suite" class="w-full h-full object-cover"></div><div class="carousel-content"><h4 class="mb-1 text-lg md:text-xl font-semibold text-gray-900">Romantic Getaway Suite</h4><div class="carousel-summary">Intimate and elegant accommodations perfect for couples, featuring private balconies and romantic ambiance.</div><div class="carousel-actions"><a href="#" class="carousel-link"><span>Read more</span></a></div></div></div>',
  '<div class="carousel-card"><div class="carousel-image-container"><img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=528&h=310&q=80" alt="Budget room" class="w-full h-full object-cover"></div><div class="carousel-content"><h4 class="mb-1 text-lg md:text-xl font-semibold text-gray-900">Essential Comfort Room</h4><div class="carousel-summary">Quality accommodations at an affordable price, featuring all essential amenities for a comfortable stay.</div><div class="carousel-actions"><a href="#" class="carousel-link"><span>Read more</span></a></div></div></div>',
];

export default {
  title: 'Editorial/Carousel',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Accessible carousel component with keyboard navigation, ARIA announcements, and performance optimization. Follows WCAG 2.1 AA standards for interactive content.',
      },
    },
  },
  argTypes: {
    items: {
      description: 'Define the array of carousel items',
      control: 'object',
      type: {
        required: true,
      },
    },
    cards_per_view: {
      control: { type: 'range', min: 1, max: 5, step: 1 },
      description: 'Number of cards visible at once',
      defaultValue: 3,
    },
    autoplay: {
      control: 'boolean',
      description: 'Enable autoplay',
      defaultValue: true,
    },
    interval: {
      control: { type: 'range', min: 1000, max: 10000, step: 500 },
      description: 'Autoplay interval in milliseconds',
      defaultValue: 5000,
    },
    pause_on_hover: {
      control: 'boolean',
      description: 'Pause autoplay on hover',
      defaultValue: true,
    },
    class: {
      description: 'Additional CSS classes for the carousel container',
      control: 'text',
      defaultValue: '',
    },
    item_class: {
      description: 'Additional CSS classes for each carousel item',
      control: 'text',
      defaultValue: '',
    },
  },
};

// Default carousel story - Enhanced with comprehensive QA testing
export const Default = createEnhancedStory(
  {
    render: CarouselTemplate,
    args: {
      items: mockItems,
      class: 'max-w-4xl',
      item_class: '',
    },
    play: async ({ canvasElement }) => {
      // Swiper carousel initializes via Drupal behaviors
      if (typeof Drupal !== 'undefined' && Drupal.behaviors && Drupal.behaviors.carouselBehavior) {
        Drupal.behaviors.carouselBehavior.attach(canvasElement, {});
      }
      console.log('Carousel ready - using Swiper.js via Drupal behaviors');
    }
  },
  {
    componentName: 'Carousel',
    accessibilityTests: [
      { id: 'aria-live', enabled: true },
      { id: 'keyboard-navigation', enabled: true },
      { id: 'focus-management', enabled: true },
      { id: 'image-alt-text', enabled: true },
    ],
    interactionTests: [
      // Test Swiper carousel navigation buttons
      async (canvas, userEvent) => {
        const nextButton = canvas.querySelector('.swiper-button-next');
        const prevButton = canvas.querySelector('.swiper-button-prev');
        
        if (nextButton) {
          expect(nextButton).toBeInTheDocument();
          await userEvent.click(nextButton);
        }
        
        if (prevButton) {
          expect(prevButton).toBeInTheDocument();
        }
      },
      // Test keyboard navigation on Swiper
      async (canvas, userEvent) => {
        const swiperContainer = canvas.querySelector('.swiper');
        if (swiperContainer) {
          await userEvent.click(swiperContainer);
          await userEvent.keyboard('{ArrowRight}');
          await userEvent.keyboard('{ArrowLeft}');
        }
      },
      // Test Swiper slide structure
      async (canvas, userEvent) => {
        const slides = canvas.querySelectorAll('.swiper-slide');
        expect(slides.length).toBeGreaterThan(0);
        
        // Verify Swiper structure exists
        const swiperWrapper = canvas.querySelector('.swiper-wrapper');
        expect(swiperWrapper).toBeInTheDocument();
      },
    ],
    performanceTests: true,
  }
);

// Accessibility-focused carousel story
export const AccessibilityFocused = createEnhancedStory(
  {
    render: CarouselTemplate,
    args: {
      items: [
        '<div class="carousel-card"><div class="carousel-image-container"><img src="./images/card.webp" class="w-full h-full object-cover" alt="Accessible slide showing team collaboration in modern office environment" loading="eager"></div><div class="carousel-content"><h4 class="mb-1 text-lg md:text-xl font-semibold text-gray-900">Team Collaboration</h4><div class="carousel-summary">Discover how our team works together to create innovative solutions for complex challenges.</div></div></div>',
        '<div class="carousel-card"><div class="carousel-image-container"><img src="./images/card.webp" class="w-full h-full object-cover" alt="Innovation workshop with diverse participants brainstorming creative ideas" loading="lazy"></div><div class="carousel-content"><h4 class="mb-1 text-lg md:text-xl font-semibold text-gray-900">Innovation Workshop</h4><div class="carousel-summary">Join our workshops where creativity meets technology to drive meaningful innovation.</div></div></div>',
        '<div class="carousel-card"><div class="carousel-image-container"><img src="./images/card.webp" class="w-full h-full object-cover" alt="Digital transformation roadmap with strategic planning elements" loading="lazy"></div><div class="carousel-content"><h4 class="mb-1 text-lg md:text-xl font-semibold text-gray-900">Digital Transformation</h4><div class="carousel-summary">Transform your business with our comprehensive digital strategy and implementation services.</div></div></div>',
      ],
      class: 'max-w-6xl accessibility-enhanced',
      item_class: 'focus-visible:ring-2 focus-visible:ring-primary-500',
    },
    parameters: {
      docs: {
        description: {
          story: 'Carousel with enhanced accessibility features including descriptive alt text, ARIA live regions, and keyboard navigation support.',
        },
      },
    },
    play: async ({ canvasElement }) => {
      if (typeof Drupal !== 'undefined' && Drupal.behaviors && Drupal.behaviors.carouselBehavior) {
        Drupal.behaviors.carouselBehavior.attach(canvasElement, {});
      }
    }
  },
  {
    componentName: 'AccessibleCarousel',
    accessibilityTests: [
      { id: 'color-contrast', enabled: true },
      { id: 'focus-indicators', enabled: true },
      { id: 'screen-reader-support', enabled: true },
      { id: 'keyboard-accessibility', enabled: true },
      { id: 'aria-live-announcements', enabled: true },
    ],
    interactionTests: [
      // Test ARIA live region announcements
      async (canvas, userEvent) => {
        const liveRegion = canvas.querySelector('[aria-live]');
        if (liveRegion) {
          expect(liveRegion).toHaveAttribute('aria-live', 'polite');
        }
      },
      // Test comprehensive keyboard navigation on Swiper
      async (canvas, userEvent) => {
        const swiperContainer = canvas.querySelector('.swiper');
        if (swiperContainer) {
          // Test various keyboard combinations
          await userEvent.click(swiperContainer);
          await userEvent.keyboard('{ArrowRight}');
          await userEvent.keyboard('{ArrowLeft}');
          await userEvent.keyboard('{Home}'); // Should go to first slide
          await userEvent.keyboard('{End}');  // Should go to last slide
        }
      },
      // Test focus indicators
      async (canvas, userEvent) => {
        const focusableElements = canvas.querySelectorAll('button, [tabindex="0"]');
        for (const element of Array.from(focusableElements).slice(0, 2)) {
          await userEvent.tab();
          expect(element).toHaveFocus();
        }
      },
    ],
    performanceTests: true,
  }
);

// Performance-optimized carousel story
export const PerformanceOptimized = createEnhancedStory(
  {
    render: CarouselTemplate,
    args: {
      items: [
        '<div class="carousel-card"><div class="carousel-image-container"><img src="./images/card.webp" class="w-full h-full object-cover" alt="Performance optimized slide 1" loading="eager" decoding="sync"></div><div class="carousel-content"><h4 class="mb-1 text-lg md:text-xl font-semibold text-gray-900">Optimized First Slide</h4><div class="carousel-summary">First slide loads immediately for better perceived performance.</div></div></div>',
        '<div class="carousel-card"><div class="carousel-image-container"><img src="./images/card.webp" class="w-full h-full object-cover" alt="Performance optimized slide 2" loading="lazy" decoding="async"></div><div class="carousel-content"><h4 class="mb-1 text-lg md:text-xl font-semibold text-gray-900">Lazy Loaded Slide</h4><div class="carousel-summary">Subsequent slides load on demand to improve initial page load time.</div></div></div>',
        '<div class="carousel-card"><div class="carousel-image-container"><picture><source srcset="./images/card.webp" type="image/webp"><img src="./images/card.jpg" class="w-full h-full object-cover" alt="Performance optimized slide 3 with WebP support" loading="lazy" decoding="async"></picture></div><div class="carousel-content"><h4 class="mb-1 text-lg md:text-xl font-semibold text-gray-900">WebP Optimized Slide</h4><div class="carousel-summary">Modern image format with fallback for better compression and loading speed.</div></div></div>',
      ],
      class: 'max-w-4xl performance-optimized',
      item_class: 'transform-gpu',
    },
    parameters: {
      docs: {
        description: {
          story: 'Performance-optimized carousel with lazy loading, WebP images, and GPU acceleration for smooth animations.',
        },
      },
    },
    play: async ({ canvasElement }) => {
      if (typeof Drupal !== 'undefined' && Drupal.behaviors && Drupal.behaviors.carouselBehavior) {
        Drupal.behaviors.carouselBehavior.attach(canvasElement, {});
      }
    }
  },
  {
    componentName: 'PerformanceCarousel',
    accessibilityTests: [
      { id: 'image-optimization', enabled: true },
      { id: 'loading-performance', enabled: true },
    ],
    interactionTests: [
      // Test lazy loading implementation
      async (canvas, userEvent) => {
        const lazyImages = canvas.querySelectorAll('img[loading="lazy"]');
        expect(lazyImages.length).toBeGreaterThan(0);
        
        lazyImages.forEach(img => {
          expect(img).toHaveAttribute('loading', 'lazy');
          expect(img).toHaveAttribute('decoding', 'async');
        });
      },
      // Test animation performance
      async (canvas, userEvent) => {
        const animatedElements = canvas.querySelectorAll('.transform-gpu');
        expect(animatedElements.length).toBeGreaterThan(0);
      },
    ],
    performanceTests: true,
  }
);

// CARDS LAYOUT STORIES - Inspired by skagenhotel.com

// Cards Layout Story - Main showcase
export const CardsLayout = createEnhancedStory(
  {
    render: CarouselTemplate,
    args: {
      items: sampleCardsItems,
      cards_per_view: 3,
      autoplay: false,
      interval: 5000,
      pause_on_hover: true,
      class: 'max-w-7xl mx-auto px-4 py-8',
    },
    parameters: {
      docs: {
        description: {
          story: 'Cards layout inspired by skagenhotel.com, displaying multiple accommodation options in a horizontal scrolling carousel with section headers.',
        },
      },
    },
    play: async ({ canvasElement }) => {
      if (typeof Drupal !== 'undefined' && Drupal.behaviors && Drupal.behaviors.carouselBehavior) {
        Drupal.behaviors.carouselBehavior.attach(canvasElement, {});
      }
    }
  },
  {
    componentName: 'CardsCarousel',
    accessibilityTests: [
      { id: 'card-accessibility', enabled: true },
      { id: 'keyboard-navigation', enabled: true },
      { id: 'aria-live', enabled: true },
    ],
    interactionTests: [
      // Test cards layout specific features
      async (canvas, userEvent) => {
        const cardsContainer = canvas.querySelector('.carousel-cards');
        expect(cardsContainer).toBeInTheDocument();
        
        const cards = canvas.querySelectorAll('.max-w-sm');
        expect(cards.length).toBeGreaterThan(0);
      },
      // Test cards navigation
      async (canvas, userEvent) => {
        const nextButton = canvas.querySelector('.swiper-button-next');
        const prevButton = canvas.querySelector('.swiper-button-prev');
        
        if (nextButton && prevButton) {
          await userEvent.click(nextButton);
          await userEvent.click(prevButton);
        }
      },
    ],
    performanceTests: true,
  }
);

// Cards with Autoplay
export const CardsWithAutoplay = createEnhancedStory(
  {
    render: CarouselTemplate,
    args: {
      items: sampleCardsItems,
      cards_per_view: 3,
      autoplay: true,
      interval: 3000,
      pause_on_hover: true,
      class: 'max-w-7xl mx-auto px-4 py-8',
    },
    parameters: {
      docs: {
        description: {
          story: 'Cards layout with autoplay enabled, demonstrating automatic rotation through accommodation options.',
        },
      },
    },
    play: async ({ canvasElement }) => {
      if (typeof Drupal !== 'undefined' && Drupal.behaviors && Drupal.behaviors.carouselBehavior) {
        Drupal.behaviors.carouselBehavior.attach(canvasElement, {});
      }
    }
  },
  {
    componentName: 'AutoplayCardsCarousel',
    accessibilityTests: [
      { id: 'autoplay-controls', enabled: true },
      { id: 'pause-on-focus', enabled: true },
    ],
    interactionTests: [
      // Test autoplay functionality
      async (canvas, userEvent) => {
        const carousel = canvas.querySelector('.swiper');
        if (carousel) {
          expect(carousel).toHaveAttribute('data-swiper-autoplay', 'true');
        }
      },
    ],
    performanceTests: true,
  }
);

// Minimal Cards (without section headers)
export const MinimalCards = createEnhancedStory(
  {
    render: CarouselTemplate,
    args: {
      items: sampleCardsItems.slice(0, 4),
      cards_per_view: 3,
      autoplay: false,
      class: 'max-w-5xl mx-auto px-4',
    },
    parameters: {
      docs: {
        description: {
          story: 'Minimal cards layout without section headers, focusing purely on the card content.',
        },
      },
    },
    play: async ({ canvasElement }) => {
      if (typeof Drupal !== 'undefined' && Drupal.behaviors && Drupal.behaviors.carouselBehavior) {
        Drupal.behaviors.carouselBehavior.attach(canvasElement, {});
      }
    }
  },
  {
    componentName: 'MinimalCardsCarousel',
    accessibilityTests: [
      { id: 'minimal-layout', enabled: true },
    ],
    interactionTests: [
      async (canvas, userEvent) => {
        const sectionTitle = canvas.querySelector('h2');
        expect(sectionTitle).toBeNull(); // Should not have section headers
      },
    ],
    performanceTests: true,
  }
);
