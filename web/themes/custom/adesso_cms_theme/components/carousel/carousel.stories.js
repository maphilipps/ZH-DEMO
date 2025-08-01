// phpcs:ignoreFile

import Component from './carousel.twig';

const meta = {
  title: 'Media/Carousel',
  component: Component,
  argTypes: {
    items: {
      name: 'Items',
      description: 'Array of carousel items with media, title, summary, and optional link properties',
      control: { type: 'object' },
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
        category: 'Content',
      },
    },
    cards_per_view: {
      name: 'Cards Per View',
      description: 'Number of cards visible simultaneously (responsive breakpoints applied automatically)',
      control: { 
        type: 'select',
        labels: {
          '1': '1 Card (Hero Style)',
          '2': '2 Cards (Dual Layout)',
          '3': '3 Cards (Standard)',
          '4': '4 Cards (Wide Grid)'
        }
      },
      options: ['1', '2', '3', '4'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '3' },
        category: 'Layout',
      },
    },
    autoplay: {
      name: 'Autoplay',
      description: 'Enable automatic slide progression with configurable timing',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Behavior',
      },
    },
    interval: {
      name: 'Autoplay Interval',
      description: 'Time between automatic slide transitions (milliseconds)',
      control: { 
        type: 'range',
        min: 1000,
        max: 15000,
        step: 500
      },
      if: { arg: 'autoplay', eq: true },
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '5000' },
        category: 'Behavior',
      },
    },
    pause_on_hover: {
      name: 'Pause on Hover',
      description: 'Pause autoplay when user hovers over the carousel (improves usability)',
      control: { type: 'boolean' },
      if: { arg: 'autoplay', eq: true },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Behavior',
      },
    },
    class: {
      name: 'Container CSS Classes',
      description: 'Additional CSS classes applied to the carousel container',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Styling',
      },
    },
    item_class: {
      name: 'Item CSS Classes',
      description: 'Additional CSS classes applied to each carousel item',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Styling',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# Carousel Component

A powerful, accessible carousel component built with Swiper.js integration. Perfect for showcasing content in an interactive sliding format with full keyboard navigation and screen reader support.

## Key Features

- **Responsive Design**: Automatically adapts to different screen sizes
- **Accessibility First**: Full ARIA support, keyboard navigation, and screen reader compatibility
- **Flexible Layouts**: Support for 1-4 cards per view with responsive breakpoints
- **Advanced Controls**: Navigation buttons, keyboard shortcuts (Home/End), and optional autoplay
- **Touch/Swipe Support**: Native touch gestures on mobile devices
- **Performance Optimized**: Lazy loading and efficient DOM management

## TWIG Implementation Examples

### Basic Multi-Card Carousel
\`\`\`twig
{% include 'sdc:carousel' with {
  items: [
    {
      media: '<img src="/images/slide1.jpg" alt="Slide 1" class="w-full h-full object-cover">',
      title: 'Featured Article',
      summary: 'Discover the latest insights and trends in our industry.',
      link: { url: '/articles/featured', title: 'Read Article' }
    },
    {
      media: '<img src="/images/slide2.jpg" alt="Slide 2" class="w-full h-full object-cover">',
      title: 'Product Launch',
      summary: 'Introducing our newest solution for modern businesses.',
      link: { url: '/products/new', title: 'Learn More' }
    }
  ],
  cards_per_view: '3'
} %}
\`\`\`

### Hero Carousel with Autoplay
\`\`\`twig
{% include 'sdc:carousel' with {
  items: hero_slides,
  cards_per_view: '1',
  autoplay: true,
  interval: '6000',
  pause_on_hover: true,
  class: 'hero-carousel'
} %}
\`\`\`

### Testimonials Carousel
\`\`\`twig
{% include 'sdc:carousel' with {
  items: testimonials,
  cards_per_view: '2',
  autoplay: true,
  interval: '4000',
  item_class: 'testimonial-card'
} %}
\`\`\`

### Product Gallery
\`\`\`twig
{% include 'sdc:carousel' with {
  items: products,
  cards_per_view: '4',
  class: 'product-showcase'
} %}
\`\`\`

## Item Data Structure

Each carousel item supports the following properties:

\`\`\`php
[
  'media' => '<img src="..." alt="..." class="w-full h-full object-cover">',
  'title' => 'Item Title',
  'summary' => 'Brief description or summary text',
  'link' => [
    'url' => '/target-page',
    'title' => 'Call to Action Text'
  ]
]
\`\`\`

## Responsive Behavior

The carousel automatically adjusts based on screen size:
- **Mobile (320px+)**: Always shows 1 card
- **Small (640px+)**: Shows 2 cards max
- **Medium (768px+)**: Respects cards_per_view setting
- **Large (1024px+)**: Full cards_per_view with optimized spacing

## Accessibility Features

- **ARIA Labels**: Full semantic structure with proper roles
- **Keyboard Navigation**: Arrow keys, Home/End navigation
- **Screen Reader Support**: Live region announcements for slide changes
- **Focus Management**: Autoplay pauses during keyboard interaction
- **High Contrast**: Proper color contrast for navigation elements
        `
      }
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};
export default meta;

// Sample data for consistent story examples
const sampleItems = {
  standard: [
    {
      media: '<img src="https://picsum.photos/800/600?random=1" alt="Modern workspace" class="w-full h-full object-cover" />',
      title: 'Modern Workspace Solutions',
      summary: 'Transform your office environment with cutting-edge technology and design principles.',
      link: { url: '/workspace', title: 'Explore Solutions' }
    },
    {
      media: '<img src="https://picsum.photos/800/600?random=2" alt="Team collaboration" class="w-full h-full object-cover" />',
      title: 'Enhanced Team Collaboration',
      summary: 'Streamline communication and boost productivity with integrated collaboration tools.',
      link: { url: '/collaboration', title: 'Learn More' }
    },
    {
      media: '<img src="https://picsum.photos/800/600?random=3" alt="Innovation" class="w-full h-full object-cover" />',
      title: 'Innovation at Scale',
      summary: 'Drive growth and innovation across your organization with scalable solutions.',
      link: { url: '/innovation', title: 'Get Started' }
    },
    {
      media: '<img src="https://picsum.photos/800/600?random=4" alt="Security" class="w-full h-full object-cover" />',
      title: 'Enterprise Security',
      summary: 'Protect your business with industry-leading security frameworks and protocols.',
      link: { url: '/security', title: 'View Details' }
    },
    {
      media: '<img src="https://picsum.photos/800/600?random=5" alt="Analytics" class="w-full h-full object-cover" />',
      title: 'Advanced Analytics',
      summary: 'Make data-driven decisions with comprehensive analytics and reporting tools.',
      link: { url: '/analytics', title: 'Discover More' }
    }
  ],
  testimonials: [
    {
      media: '<div class="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center"><div class="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">JS</div></div>',
      title: 'John Smith, CEO',
      summary: '"This platform has revolutionized how we operate. The ROI was evident within the first quarter."',
      link: { url: '/case-studies/techcorp', title: 'Read Case Study' }
    },
    {
      media: '<div class="w-full h-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center"><div class="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center text-green-600 font-bold text-2xl">AM</div></div>',
      title: 'Alice Martinez, CTO',
      summary: '"Outstanding technical support and robust feature set. Our development team loves the flexibility."',
      link: { url: '/case-studies/innovate-inc', title: 'View Story' }
    },
    {
      media: '<div class="w-full h-full bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center"><div class="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center text-purple-600 font-bold text-2xl">RW</div></div>',
      title: 'Robert Wilson, Director',
      summary: '"Seamless integration and exceptional performance. Exactly what we needed for our digital transformation."',
      link: { url: '/case-studies/global-solutions', title: 'Learn More' }
    }
  ],
  hero: [
    {
      media: '<img src="https://picsum.photos/1400/700?random=10" alt="Hero slide 1" class="w-full h-full object-cover" />',
      title: 'Transform Your Business Today',
      summary: 'Leverage cutting-edge technology and strategic insights to drive unprecedented growth and innovation in your industry.',
      link: { url: '/solutions', title: 'Explore Solutions' }
    },
    {
      media: '<img src="https://picsum.photos/1400/700?random=11" alt="Hero slide 2" class="w-full h-full object-cover" />',
      title: 'Expert Consultation & Support',
      summary: 'Connect with industry leaders and technical experts who understand your challenges and can guide your success journey.',
      link: { url: '/consultation', title: 'Book Consultation' }
    }
  ]
};

// Default story showcasing standard 3-card layout
export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'Standard three-card carousel layout with navigation controls and hover effects. This is the most common implementation for showcasing multiple content items.'
      }
    }
  },
  args: {
    items: sampleItems.standard.slice(0, 3),
    cards_per_view: '3',
    autoplay: false,
    interval: '5000',
    pause_on_hover: true,
    class: '',
    item_class: '',
  },
};

// Single card hero carousel for homepage banners
export const HeroCarousel = {
  parameters: {
    docs: {
      description: {
        story: 'Full-width hero carousel perfect for homepage banners and featured content. Uses single card view with autoplay for maximum visual impact.'
      }
    }
  },
  args: {
    items: sampleItems.hero,
    cards_per_view: '1',
    autoplay: true,
    interval: '6000',
    pause_on_hover: true,
    class: 'hero-carousel',
    item_class: '',
  },
};

// Testimonials carousel with custom styling
export const TestimonialsCarousel = {
  parameters: {
    docs: {
      description: {
        story: 'Customer testimonials displayed in a three-card layout with custom avatar graphics. Ideal for building trust and social proof.'
      }
    }
  },
  args: {
    items: sampleItems.testimonials,
    cards_per_view: '3',
    autoplay: true,
    interval: '5000',
    pause_on_hover: true,
    class: 'testimonials-carousel',
    item_class: 'testimonial-card',
  },
};

// Dual card layout example
export const DualLayout = {
  parameters: {
    docs: {
      description: {
        story: 'Two-card layout perfect for comparing products, services, or highlighting key features side by side.'
      }
    }
  },
  args: {
    items: sampleItems.standard.slice(0, 4),
    cards_per_view: '2',
    autoplay: false,
    interval: '5000',
    pause_on_hover: true,
    class: '',
    item_class: '',
  },
};

// Four card grid layout
export const QuadLayout = {
  parameters: {
    docs: {
      description: {
        story: 'Four-card layout optimal for product showcases or service listings on wide screens. Automatically adapts to fewer cards on smaller devices.'
      }
    }
  },
  args: {
    items: sampleItems.standard,
    cards_per_view: '4',
    autoplay: false,
    interval: '5000',
    pause_on_hover: true,
    class: 'product-grid',
    item_class: '',
  },
};

// Autoplay demonstration with different timing
export const AutoplayVariants = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates autoplay functionality with custom timing. Notice how the carousel automatically advances and pauses on hover for better usability.'
      }
    }
  },
  args: {
    items: sampleItems.standard.slice(0, 3),
    cards_per_view: '3',
    autoplay: true,
    interval: '3000',
    pause_on_hover: true,
    class: '',
    item_class: '',
  },
};

// Accessibility features demonstration
export const AccessibilityFeatures = {
  parameters: {
    docs: {
      description: {
        story: `
**Accessibility Features Demo**

This carousel includes comprehensive accessibility support:

- **Keyboard Navigation**: Use arrow keys to navigate, Home/End for first/last slide
- **Screen Reader Support**: ARIA labels and live regions announce slide changes
- **Focus Management**: Autoplay pauses when elements receive focus
- **High Contrast**: Navigation elements maintain proper contrast ratios
- **Semantic Structure**: Proper heading hierarchy and role attributes

Try navigating with Tab, Space, Enter, and arrow keys to experience the full accessibility features.
        `
      }
    }
  },
  args: {
    items: [
      {
        media: '<div class="w-full h-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-lg">Slide 1</div>',
        title: 'Accessibility First',
        summary: 'Full keyboard navigation with arrow keys, Home, and End key support.',
        link: { url: '#accessibility', title: 'Learn About Accessibility' }
      },
      {
        media: '<div class="w-full h-full bg-green-100 flex items-center justify-center text-green-800 font-bold text-lg">Slide 2</div>',
        title: 'Screen Reader Ready',
        summary: 'ARIA live regions announce slide changes to assistive technologies.',
        link: { url: '#screen-reader', title: 'Screen Reader Info' }
      },
      {
        media: '<div class="w-full h-full bg-purple-100 flex items-center justify-center text-purple-800 font-bold text-lg">Slide 3</div>',
        title: 'Focus Management',
        summary: 'Autoplay automatically pauses when users focus on interactive elements.',
        link: { url: '#focus-management', title: 'Focus Guidelines' }
      }
    ],
    cards_per_view: '3',
    autoplay: true,
    interval: '4000',
    pause_on_hover: true,
    class: 'accessibility-demo',
    item_class: '',
  },
};

// Responsive behavior demonstration
export const ResponsiveBehavior = {
  parameters: {
    docs: {
      description: {
        story: `
**Responsive Breakpoint Behavior**

The carousel automatically adjusts based on screen size:

- **Mobile (320px+)**: Always displays 1 card regardless of cards_per_view setting
- **Small screens (640px+)**: Shows maximum of 2 cards  
- **Medium screens (768px+)**: Respects the cards_per_view setting
- **Large screens (1024px+)**: Full cards_per_view with optimized spacing

Try resizing your browser window to see the responsive behavior in action.
        `
      }
    }
  },
  args: {
    items: sampleItems.standard,
    cards_per_view: '4',
    autoplay: false,
    interval: '5000',
    pause_on_hover: true,
    class: 'responsive-demo',
    item_class: '',
  },
};

// Content without links demonstration
export const ContentWithoutLinks = {
  parameters: {
    docs: {
      description: {
        story: 'Carousel items can work without call-to-action links, perfect for image galleries or informational content display.'
      }
    }
  },
  args: {
    items: [
      {
        media: '<img src="https://picsum.photos/800/600?random=20" alt="Gallery image 1" class="w-full h-full object-cover" />',
        title: 'Mountain Landscape',
        summary: 'Breathtaking views from the summit of Mount Everest during golden hour.',
      },
      {
        media: '<img src="https://picsum.photos/800/600?random=21" alt="Gallery image 2" class="w-full h-full object-cover" />',
        title: 'Ocean Waves',
        summary: 'Powerful waves crashing against the rocky coastline at sunset.',
      },
      {
        media: '<img src="https://picsum.photos/800/600?random=22" alt="Gallery image 3" class="w-full h-full object-cover" />',
        title: 'Forest Path',
        summary: 'A winding trail through ancient redwood trees in northern California.',
      }
    ],
    cards_per_view: '3',
    autoplay: true,
    interval: '4000',
    pause_on_hover: true,
    class: 'gallery-carousel',
    item_class: '',
  },
};

// Empty state demonstration
export const EmptyState = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the fallback behavior when no carousel items are provided. Shows a user-friendly empty state message.'
      }
    }
  },
  args: {
    items: [],
    cards_per_view: '3',
    autoplay: false,
    interval: '5000',
    pause_on_hover: true,
    class: '',
    item_class: '',
  },
};

// Playground for experimenting with all properties
export const Playground = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for testing all carousel properties. Modify the controls to experiment with different configurations and see real-time results.'
      }
    }
  },
  args: {
    items: sampleItems.standard.slice(0, 3),
    cards_per_view: '3',
    autoplay: false,
    interval: '5000',
    pause_on_hover: true,
    class: '',
    item_class: '',
  },
};