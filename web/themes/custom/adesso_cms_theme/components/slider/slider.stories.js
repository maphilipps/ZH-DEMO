// phpcs:ignoreFile

import Component from './slider.twig';

const meta = {
  title: 'Media/Slider',
  component: Component,
  argTypes: {
    items: {
      name: 'Items',
      description: 'Array of slider items with media, title, and summary',
      control: { type: 'object' },
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Enhanced slider component with Swiper.js integration for displaying image galleries, testimonials, or content carousels.

## TWIG Usage

\`\`\`twig
{# Basic image slider #}
{% include 'sdc:slider' with {
  items: [
    {
      media: '<img src="/images/slide1.jpg" alt="Slide 1" class="w-full h-full object-cover">',
      title: 'First Slide',
      summary: 'Description of the first slide content.'
    },
    {
      media: '<img src="/images/slide2.jpg" alt="Slide 2" class="w-full h-full object-cover">',
      title: 'Second Slide',
      summary: 'Description of the second slide content.'
    }
  ]
} %}

{# Testimonial slider #}
{% include 'sdc:slider' with {
  items: testimonials|map(item => {
    media: '<div class="testimonial-avatar">' ~ item.avatar ~ '</div>',
    title: item.name,
    summary: item.quote
  })
} %}

{# Product showcase slider #}
{% include 'sdc:slider' with {
  items: products
} %}

{# With dynamic content from Drupal #}
{% include 'sdc:slider' with {
  items: content.field_slider_items
} %}
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Default image slider
export const Default = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    items: [
      {
        media: '<img src="https://picsum.photos/1200/600?random=1" alt="Mountain landscape" class="w-full h-full object-cover">',
        title: 'Breathtaking Mountain Views',
        summary: 'Experience the beauty of nature with our guided mountain tours and hiking expeditions.',
      },
      {
        media: '<img src="https://picsum.photos/1200/600?random=2" alt="Ocean sunset" class="w-full h-full object-cover">',
        title: 'Stunning Ocean Sunsets',
        summary: 'Relax on pristine beaches and watch unforgettable sunsets over the Pacific Ocean.',
      },
      {
        media: '<img src="https://picsum.photos/1200/600?random=3" alt="Forest trail" class="w-full h-full object-cover">',
        title: 'Peaceful Forest Trails',
        summary: 'Discover hidden trails through ancient forests and connect with nature.',
      },
      {
        media: '<img src="https://picsum.photos/1200/600?random=4" alt="City skyline" class="w-full h-full object-cover">',
        title: 'Dynamic City Life',
        summary: 'Explore vibrant urban culture, dining, and entertainment in world-class cities.',
      },
    ],
  },
};

// Testimonial slider
export const Testimonials = {
  args: {
    items: [
      {
        media: `
          <div class="flex items-center justify-center h-full">
            <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <div class="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                JS
              </div>
            </div>
          </div>
        `,
        title: 'John Smith',
        summary: '"This platform has completely transformed how we manage our business. The team\'s support has been exceptional, and the results speak for themselves."',
      },
      {
        media: `
          <div class="flex items-center justify-center h-full">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <div class="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                MJ
              </div>
            </div>
          </div>
        `,
        title: 'Maria Johnson',
        summary: '"Outstanding service and incredible results. Our productivity has increased by 300% since implementing their solution. Highly recommended!"',
      },
      {
        media: `
          <div class="flex items-center justify-center h-full">
            <div class="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
              <div class="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center text-purple-600 font-bold text-xl">
                DC
              </div>
            </div>
          </div>
        `,
        title: 'David Chen',
        summary: '"The best investment we\'ve made for our company. Easy to use, powerful features, and excellent customer support throughout the process."',
      },
    ],
  },
};

// Product showcase
export const ProductShowcase = {
  args: {
    items: [
      {
        media: '<img src="https://picsum.photos/800/500?random=5" alt="Product 1" class="w-full h-full object-cover">',
        title: 'Premium Dashboard',
        summary: 'Comprehensive analytics and reporting dashboard with real-time insights and customizable widgets.',
      },
      {
        media: '<img src="https://picsum.photos/800/500?random=6" alt="Product 2" class="w-full h-full object-cover">',
        title: 'Mobile Application',
        summary: 'Native mobile app with offline capabilities, push notifications, and seamless synchronization.',
      },
      {
        media: '<img src="https://picsum.photos/800/500?random=7" alt="Product 3" class="w-full h-full object-cover">',
        title: 'API Integration',
        summary: 'Powerful REST API with comprehensive documentation, SDKs, and third-party integrations.',
      },
      {
        media: '<img src="https://picsum.photos/800/500?random=8" alt="Product 4" class="w-full h-full object-cover">',
        title: 'Advanced Analytics',
        summary: 'Machine learning-powered analytics with predictive insights and automated reporting.',
      },
    ],
  },
};

// Portfolio slider
export const Portfolio = {
  args: {
    items: [
      {
        media: '<img src="https://picsum.photos/900/600?random=9" alt="Project 1" class="w-full h-full object-cover">',
        title: 'E-commerce Platform Redesign',
        summary: 'Complete redesign and development of a modern e-commerce platform with improved user experience and conversion rates.',
      },
      {
        media: '<img src="https://picsum.photos/900/600?random=10" alt="Project 2" class="w-full h-full object-cover">',
        title: 'Healthcare Management System',
        summary: 'Custom healthcare management system with patient records, appointment scheduling, and telemedicine features.',
      },
      {
        media: '<img src="https://picsum.photos/900/600?random=11" alt="Project 3" class="w-full h-full object-cover">',
        title: 'Financial Dashboard',
        summary: 'Real-time financial dashboard with advanced analytics, reporting, and portfolio management tools.',
      },
    ],
  },
};

// News slider
export const NewsSlider = {
  args: {
    items: [
      {
        media: '<img src="https://picsum.photos/800/400?random=12" alt="News 1" class="w-full h-full object-cover">',
        title: 'Company Reaches New Milestone',
        summary: 'We\'re proud to announce that we\'ve reached 100,000 satisfied customers worldwide, marking a significant milestone in our journey.',
      },
      {
        media: '<img src="https://picsum.photos/800/400?random=13" alt="News 2" class="w-full h-full object-cover">',
        title: 'New Partnership Announcement',
        summary: 'Strategic partnership with leading technology companies to expand our global reach and enhance our service offerings.',
      },
      {
        media: '<img src="https://picsum.photos/800/400?random=14" alt="News 3" class="w-full h-full object-cover">',
        title: 'Award Recognition',
        summary: 'Honored to receive the Innovation Excellence Award for our groundbreaking work in digital transformation.',
      },
    ],
  },
};

// Team slider
export const TeamSlider = {
  args: {
    items: [
      {
        media: `
          <div class="flex items-center justify-center h-full bg-gradient-to-br from-blue-400 to-blue-600">
            <div class="w-32 h-32 bg-white rounded-full flex items-center justify-center">
              <svg class="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        `,
        title: 'Sarah Williams - CEO',
        summary: 'Visionary leader with 15+ years of experience in technology and business strategy. Passionate about innovation and team development.',
      },
      {
        media: `
          <div class="flex items-center justify-center h-full bg-gradient-to-br from-green-400 to-green-600">
            <div class="w-32 h-32 bg-white rounded-full flex items-center justify-center">
              <svg class="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        `,
        title: 'Michael Rodriguez - CTO',
        summary: 'Technical architect and full-stack developer specializing in scalable systems and emerging technologies. Expert in cloud infrastructure.',
      },
      {
        media: `
          <div class="flex items-center justify-center h-full bg-gradient-to-br from-purple-400 to-purple-600">
            <div class="w-32 h-32 bg-white rounded-full flex items-center justify-center">
              <svg class="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        `,
        title: 'Emily Chang - Design Director',
        summary: 'Creative director with expertise in user experience design and brand development. Leads our design team with focus on user-centered solutions.',
      },
    ],
  },
};

// Single item slider
export const SingleItem = {
  args: {
    items: [
      {
        media: '<img src="https://picsum.photos/1000/600?random=15" alt="Featured content" class="w-full h-full object-cover">',
        title: 'Featured Innovation',
        summary: 'Discover our latest breakthrough technology that\'s transforming the industry and setting new standards for excellence.',
      },
    ],
  },
};

// Playground for testing all properties
export const Playground = {
  args: {
    items: [
      {
        media: '<img src="https://picsum.photos/800/500?random=1" alt="Test slide" class="w-full h-full object-cover">',
        title: 'Test Slide Title',
        summary: 'This is a test summary for the slider component.',
      },
      {
        media: '<img src="https://picsum.photos/800/500?random=2" alt="Another test slide" class="w-full h-full object-cover">',
        title: 'Another Test Slide',
        summary: 'Another test summary to demonstrate the slider functionality.',
      },
    ],
  },
};