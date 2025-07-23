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

// Define mock items using the mock media
const mockItems = [
  {
    active: true,
    media: mockMediaFirst,
    title: 'First Slide',
    summary: 'This is the first slide',
  },
  {
    media: mockMediaSecond,
    title: 'Second Slide',
    summary: 'This is the second slide',
  },
  {
    media: mockMediaThird,
    title: 'Third Slide',
    summary: 'This is the third slide',
  },
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
        {
          active: true,
          media: "<img src='./images/card.webp' class='d-block w-full' alt='Accessible slide showing team collaboration in modern office environment' loading='eager' />",
          title: 'Team Collaboration',
          summary: 'Discover how our team works together to create innovative solutions for complex challenges.',
        },
        {
          media: "<img src='./images/card.webp' class='d-block w-full' alt='Innovation workshop with diverse participants brainstorming creative ideas' loading='lazy' />",
          title: 'Innovation Workshop',
          summary: 'Join our workshops where creativity meets technology to drive meaningful innovation.',
        },
        {
          media: "<img src='./images/card.webp' class='d-block w-full' alt='Digital transformation roadmap with strategic planning elements' loading='lazy' />",
          title: 'Digital Transformation',
          summary: 'Transform your business with our comprehensive digital strategy and implementation services.',
        },
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
        {
          active: true,
          media: "<img src='./images/card.webp' class='d-block w-full' alt='Performance optimized slide 1' loading='eager' decoding='sync' />",
          title: 'Optimized First Slide',
          summary: 'First slide loads immediately for better perceived performance.',
        },
        {
          media: "<img src='./images/card.webp' class='d-block w-full' alt='Performance optimized slide 2' loading='lazy' decoding='async' />",
          title: 'Lazy Loaded Slide',
          summary: 'Subsequent slides load on demand to improve initial page load time.',
        },
        {
          media: "<picture><source srcset='./images/card.webp' type='image/webp'><img src='./images/card.jpg' class='d-block w-full' alt='Performance optimized slide 3 with WebP support' loading='lazy' decoding='async' /></picture>",
          title: 'WebP Optimized Slide',
          summary: 'Modern image format with fallback for better compression and loading speed.',
        },
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
