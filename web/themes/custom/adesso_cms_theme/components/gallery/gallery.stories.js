// phpcs:ignoreFile

import Component from './gallery.twig';
import GalleryItem from './gallery-item.twig';

/**
 * Gallery Component with Lightbox Functionality
 * 
 * A comprehensive gallery component featuring:
 * - Responsive grid layouts (1-4 columns)
 * - Interactive lightbox modals with full-size images
 * - Hover effects and smooth transitions
 * - Accessibility support (keyboard navigation, ARIA labels)
 * - Semantic HTML structure with proper figure/figcaption elements
 * - Touch-friendly interaction on mobile devices
 * 
 * The gallery supports multiple use cases:
 * - Portfolio showcases
 * - Product galleries
 * - Event photo collections
 * - Team member displays
 * - Project documentation
 * 
 * @component Gallery
 * @status stable
 * @since 1.0.0
 */

const meta = {
  title: 'Editorial/Gallery',
  component: Component,
  parameters: {
    docs: {
      description: {
        component: `
# Gallery Component

A feature-rich gallery component with lightbox functionality, designed for showcasing images in an interactive and accessible manner.

## Features

- **Responsive Grid**: Automatically adapts from 1 to 4 columns based on screen size
- **Lightbox Modal**: Click any image to view full-size version with navigation
- **Hover Effects**: Smooth transitions and scaling effects on image hover
- **Accessibility**: Full keyboard navigation, screen reader support, and ARIA compliance
- **Semantic HTML**: Uses proper figure/figcaption elements for better structure
- **Touch Support**: Optimized for mobile and touch devices

## Usage Examples

### Portfolio Gallery
Perfect for showcasing creative work, projects, or professional photography.

### Product Showcase
Display product images with detailed descriptions and quick preview functionality.

### Event Photography
Document events, conferences, or team activities with organized photo collections.

### Team Profiles
Showcase team members with professional photos and role descriptions.

## Technical Implementation

The gallery component uses:
- **Twig Templates**: Semantic HTML structure with conditional content blocks
- **Tailwind CSS**: Responsive utilities and hover effects
- **JavaScript Behaviors**: Modal management and keyboard navigation
- **SDC Architecture**: Single Directory Components for Drupal integration

## Accessibility Features

- **Screen Reader Support**: Descriptive alt text and ARIA labels
- **Keyboard Navigation**: Tab through items, Enter/Space to open, arrow keys to navigate
- **Focus Management**: Clear focus indicators and proper focus trapping in modals
- **High Contrast**: Readable text overlays with sufficient color contrast
        `,
      },
    },
  },
  argTypes: {
    pre_headline: {
      name: 'Pre-headline',
      description: 'Optional pre-headline text displayed above the main title',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Content',
      },
    },
    section_title: {
      name: 'Section Title',
      description: 'Main title for the gallery section',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Content',
      },
    },
    sub_headline: {
      name: 'Sub-headline',
      description: 'Optional subtitle or description text below the main title',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Content',
      },
    },
    gallery_items: {
      name: 'Gallery Items',
      description: 'Collection of gallery items rendered using the gallery-item component. Each item includes thumbnail, full-size image, and metadata.',
      control: { type: 'object' },
      table: {
        type: { summary: 'HTML content | array of gallery items' },
        defaultValue: { summary: '' },
        category: 'Content',
      },
    },
    modifier: {
      name: 'Modifier Classes',
      description: 'Additional CSS classes for customizing the gallery appearance',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'Styling',
      },
    },
    is_dark: {
      name: 'Dark Theme',
      description: 'Enable dark background variant',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Styling',
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;

// Helper function to generate gallery items using the gallery-item component
const createGalleryItems = (items) => {
  return items.map(item => 
    GalleryItem({
      item: {
        id: item.id,
        media: `<img src="${item.fullImage}" alt="${item.description}" class="w-full h-auto object-contain">`,
        media_thumb: `<img src="${item.thumbnail}" alt="${item.description}" class="w-full h-full object-cover">`,
        media_description: item.description
      }
    })
  ).join('');
};

/**
 * Default Gallery Story
 * 
 * Demonstrates the basic gallery functionality with a portfolio showcase.
 * Features 4 professional project images with lightbox functionality.
 */
export const Default = {
  name: 'Default Gallery',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Basic gallery configuration showcasing portfolio projects. Click any image to open the lightbox modal with full-size image and navigation. The responsive grid automatically adjusts from 1 column on mobile to 4 columns on desktop.',
      },
    },
  },
  args: {
    pre_headline: 'Our Work',
    section_title: 'Featured Projects',
    sub_headline: 'Discover our latest digital solutions and success stories',
    is_dark: false,
    gallery_items: createGalleryItems([
      {
        id: '1',
        thumbnail: 'https://picsum.photos/400/300?random=1',
        fullImage: 'https://picsum.photos/1200/800?random=1',
        description: 'E-commerce Platform - Custom shopping solution with advanced features'
      },
      {
        id: '2',
        thumbnail: 'https://picsum.photos/400/300?random=2',
        fullImage: 'https://picsum.photos/1200/800?random=2',
        description: 'Corporate Website - Professional web presence with modern design'
      },
      {
        id: '3',
        thumbnail: 'https://picsum.photos/400/300?random=3',
        fullImage: 'https://picsum.photos/1200/800?random=3',
        description: 'Mobile Application - Cross-platform app solution with native performance'
      },
      {
        id: '4',
        thumbnail: 'https://picsum.photos/400/300?random=4',
        fullImage: 'https://picsum.photos/1200/800?random=4',
        description: 'Dashboard Design - Analytics and reporting interface with real-time data'
      }
    ]),
  },
};

/**
 * Team Members Gallery
 * 
 * Showcases team profiles with professional headshots and role information.
 * Demonstrates how the gallery can be used for personnel directories.
 */
export const TeamMembers = {
  name: 'Team Members Gallery',
  parameters: {
    docs: {
      description: {
        story: 'Team member gallery showcasing professional headshots with role information. Portrait orientation images work well for team galleries. Each modal provides detailed view of the team member photo.',
      },
    },
  },
  args: {
    pre_headline: 'Meet Our Team',
    section_title: 'Expert Professionals',
    sub_headline: 'Dedicated specialists working together to deliver exceptional results',
    gallery_items: createGalleryItems([
      {
        id: 'team-1',
        thumbnail: 'https://picsum.photos/300/400?random=10',
        fullImage: 'https://picsum.photos/800/1000?random=10',
        description: 'Sarah Johnson - Chief Executive Officer with 15+ years leadership experience'
      },
      {
        id: 'team-2',
        thumbnail: 'https://picsum.photos/300/400?random=11',
        fullImage: 'https://picsum.photos/800/1000?random=11',
        description: 'Michael Chen - Chief Technology Officer specializing in scalable architecture'
      },
      {
        id: 'team-3',
        thumbnail: 'https://picsum.photos/300/400?random=12',
        fullImage: 'https://picsum.photos/800/1000?random=12',
        description: 'Emily Rodriguez - Design Lead focusing on user experience and accessibility'
      },
      {
        id: 'team-4',
        thumbnail: 'https://picsum.photos/300/400?random=13',
        fullImage: 'https://picsum.photos/800/1000?random=13',
        description: 'David Kim - Senior Developer with expertise in full-stack development'
      }
    ]),
  },
};

/**
 * Product Showcase Gallery
 * 
 * Displays product images and features in a professional layout.
 * Perfect for software screenshots, product photos, or feature highlights.
 */
export const ProductShowcase = {
  name: 'Product Showcase',
  parameters: {
    docs: {
      description: {
        story: 'Product showcase gallery ideal for displaying software interfaces, product features, or service offerings. Wide aspect ratio images work well for showcasing UI designs and product screenshots.',
      },
    },
  },
  args: {
    pre_headline: 'Products',
    section_title: 'Latest Solutions',
    sub_headline: 'Innovative tools and services designed to enhance your business operations',
    gallery_items: createGalleryItems([
      {
        id: 'product-1',
        thumbnail: 'https://picsum.photos/500/300?random=20',
        fullImage: 'https://picsum.photos/1400/900?random=20',
        description: 'Content Management System - Flexible content management platform with intuitive interface'
      },
      {
        id: 'product-2',
        thumbnail: 'https://picsum.photos/500/300?random=21',
        fullImage: 'https://picsum.photos/1400/900?random=21',
        description: 'Analytics Dashboard - Real-time data visualization with customizable reporting features'
      },
      {
        id: 'product-3',
        thumbnail: 'https://picsum.photos/500/300?random=22',
        fullImage: 'https://picsum.photos/1400/900?random=22',
        description: 'Mobile App Framework - Cross-platform development solution with native performance'
      }
    ]),
  },
};

/**
 * Event Photos Gallery
 * 
 * Captures memorable moments from conferences, meetings, and special events.
 * Ideal for documenting company activities and team gatherings.
 */
export const EventPhotos = {
  name: 'Event Photos',
  parameters: {
    docs: {
      description: {
        story: 'Event photography gallery capturing memorable moments from conferences and team activities. Great for corporate events, workshops, and company celebrations. Each image tells part of the event story.',
      },
    },
  },
  args: {
    pre_headline: 'Events',
    section_title: 'Conference 2024',
    sub_headline: 'Highlights from our annual technology conference and networking event',
    gallery_items: createGalleryItems([
      {
        id: 'event-1',
        thumbnail: 'https://picsum.photos/600/400?random=30',
        fullImage: 'https://picsum.photos/1200/800?random=30',
        description: 'Opening Keynote - Main stage presentation kicking off the conference with industry insights'
      },
      {
        id: 'event-2',
        thumbnail: 'https://picsum.photos/600/400?random=31',
        fullImage: 'https://picsum.photos/1200/800?random=31',
        description: 'Workshop Sessions - Interactive learning experiences with hands-on activities'
      },
      {
        id: 'event-3',
        thumbnail: 'https://picsum.photos/600/400?random=32',
        fullImage: 'https://picsum.photos/1200/800?random=32',
        description: 'Networking Lunch - Connect with industry peers and build professional relationships'
      },
      {
        id: 'event-4',
        thumbnail: 'https://picsum.photos/600/400?random=33',
        fullImage: 'https://picsum.photos/1200/800?random=33',
        description: 'Tech Demos - Live product demonstrations showcasing latest innovations'
      },
      {
        id: 'event-5',
        thumbnail: 'https://picsum.photos/600/400?random=34',
        fullImage: 'https://picsum.photos/1200/800?random=34',
        description: 'Panel Discussion - Expert insights on industry trends and future developments'
      },
      {
        id: 'event-6',
        thumbnail: 'https://picsum.photos/600/400?random=35',
        fullImage: 'https://picsum.photos/1200/800?random=35',
        description: 'Closing Reception - Celebrating successful conference with networking and refreshments'
      }
    ]),
  },
};

/**
 * Gallery Without Headlines
 * 
 * Clean gallery layout focusing purely on the images without section headers.
 * Perfect for embeds or when context is provided elsewhere.
 */
export const WithoutHeadlines = {
  name: 'Without Headlines',
  parameters: {
    docs: {
      description: {
        story: 'Gallery without section headers, focusing purely on the image content. Useful when the gallery is embedded within other content or when minimal text is preferred.',
      },
    },
  },
  args: {
    pre_headline: '',
    section_title: '',
    sub_headline: '',
    gallery_items: createGalleryItems([
      {
        id: 'minimal-1',
        thumbnail: 'https://picsum.photos/400/300?random=60',
        fullImage: 'https://picsum.photos/1200/800?random=60',
        description: 'Abstract architecture featuring geometric patterns and modern design elements'
      },
      {
        id: 'minimal-2',
        thumbnail: 'https://picsum.photos/400/300?random=61',
        fullImage: 'https://picsum.photos/1200/800?random=61',
        description: 'Urban landscape with contemporary buildings and natural lighting'
      },
      {
        id: 'minimal-3',
        thumbnail: 'https://picsum.photos/400/300?random=62',
        fullImage: 'https://picsum.photos/1200/800?random=62',
        description: 'Minimalist interior design showcasing clean lines and neutral colors'
      },
      {
        id: 'minimal-4',
        thumbnail: 'https://picsum.photos/400/300?random=63',
        fullImage: 'https://picsum.photos/1200/800?random=63',
        description: 'Natural textures and organic forms in architectural photography'
      }
    ]),
  },
};

/**
 * Dark Theme Gallery
 * 
 * Gallery with dark background variant for different design contexts.
 * Demonstrates theme flexibility and visual contrast options.
 */
export const DarkTheme = {
  name: 'Dark Theme',
  parameters: {
    docs: {
      description: {
        story: 'Gallery with dark background theme, providing visual contrast and alternative styling. The dark theme works well for photography galleries and artistic content.',
      },
    },
  },
  args: {
    pre_headline: 'Photography',
    section_title: 'Artistic Collection',
    sub_headline: 'Curated selection of artistic photography and visual compositions',
    is_dark: true,
    modifier: 'dark-theme-gallery',
    gallery_items: createGalleryItems([
      {
        id: 'dark-1',
        thumbnail: 'https://picsum.photos/400/300?random=70',
        fullImage: 'https://picsum.photos/1200/800?random=70',
        description: 'Dramatic lighting composition with strong contrast and shadows'
      },
      {
        id: 'dark-2',
        thumbnail: 'https://picsum.photos/400/300?random=71',
        fullImage: 'https://picsum.photos/1200/800?random=71',
        description: 'Atmospheric photography capturing mood and emotion through composition'
      },
      {
        id: 'dark-3',
        thumbnail: 'https://picsum.photos/400/300?random=72',
        fullImage: 'https://picsum.photos/1200/800?random=72',
        description: 'Artistic perspective on urban environments and architectural forms'
      },
      {
        id: 'dark-4',
        thumbnail: 'https://picsum.photos/400/300?random=73',
        fullImage: 'https://picsum.photos/1200/800?random=73',
        description: 'Fine art photography emphasizing texture and visual storytelling'
      }
    ]),
  },
};

/**
 * Large Gallery Collection
 * 
 * Demonstrates the gallery behavior with many images for testing scroll performance.
 * Shows how the component handles large datasets gracefully.
 */
export const LargeGallery = {
  name: 'Large Gallery (12+ items)',
  parameters: {
    docs: {
      description: {
        story: 'Large gallery with 12+ images demonstrating performance with extensive collections. The responsive grid maintains optimal layouts even with numerous items.',
      },
    },
  },
  args: {
    pre_headline: 'Portfolio',
    section_title: 'Complete Collection',
    sub_headline: 'Comprehensive showcase of our creative work and professional achievements',
    gallery_items: createGalleryItems([
      ...Array.from({ length: 12 }, (_, i) => ({
        id: `large-${i + 1}`,
        thumbnail: `https://picsum.photos/400/300?random=${80 + i}`,
        fullImage: `https://picsum.photos/1200/800?random=${80 + i}`,
        description: `Gallery Item ${i + 1} - Professional project showcasing creative solutions and technical expertise in various domains`
      }))
    ]),
  },
};

/**
 * Mixed Content Gallery
 * 
 * Demonstrates the gallery with various image orientations and aspect ratios.
 * Shows how the component handles different image types gracefully.
 */
export const MixedContent = {
  name: 'Mixed Content Types',
  parameters: {
    docs: {
      description: {
        story: 'Gallery showcasing mixed content types with various image orientations, aspect ratios, and content types. Demonstrates how the component adapts to different image formats.',
      },
    },
  },
  args: {
    pre_headline: 'Creative Work',
    section_title: 'Mixed Media Gallery',
    sub_headline: 'Diverse collection showcasing various formats and creative approaches',
    gallery_items: createGalleryItems([
      {
        id: 'mixed-1',
        thumbnail: 'https://picsum.photos/400/600?random=100', // Portrait
        fullImage: 'https://picsum.photos/800/1200?random=100',
        description: 'Portrait Photography - Vertical composition emphasizing subject detail'
      },
      {
        id: 'mixed-2',
        thumbnail: 'https://picsum.photos/600/300?random=101', // Landscape
        fullImage: 'https://picsum.photos/1400/700?random=101',
        description: 'Landscape Photography - Wide horizontal view capturing expansive scenery'
      },
      {
        id: 'mixed-3',
        thumbnail: 'https://picsum.photos/400/400?random=102', // Square
        fullImage: 'https://picsum.photos/1000/1000?random=102',
        description: 'Square Format - Balanced composition with equal dimensions'
      },
      {
        id: 'mixed-4',
        thumbnail: 'https://picsum.photos/500/350?random=103', // 3:2 Ratio
        fullImage: 'https://picsum.photos/1200/800?random=103',
        description: 'Standard 3:2 Ratio - Classic photographic proportions for balanced viewing'
      },
      {
        id: 'mixed-5',
        thumbnail: 'https://picsum.photos/800/300?random=104', // Panoramic
        fullImage: 'https://picsum.photos/1600/600?random=104',
        description: 'Panoramic View - Ultra-wide format capturing expansive horizontal scenes'
      },
      {
        id: 'mixed-6',
        thumbnail: 'https://picsum.photos/300/500?random=105', // Tall Portrait
        fullImage: 'https://picsum.photos/600/1000?random=105',
        description: 'Tall Portrait Format - Extended vertical composition for dramatic effect'
      }
    ]),
  },
};

/**
 * Accessibility Features Gallery
 * 
 * Demonstrates comprehensive accessibility support including ARIA labels,
 * keyboard navigation, and screen reader compatibility.
 */
export const AccessibilityFeatures = {
  name: 'Accessibility Features',
  parameters: {
    docs: {
      description: {
        story: `
# Accessibility Features Demonstration

This gallery showcases comprehensive accessibility support including:

## Screen Reader Support
- **Descriptive Alt Text**: All images include detailed alternative text describing content and context
- **ARIA Labels**: Proper ARIA roles and labels for modal dialogs and interactive elements
- **Semantic Structure**: Uses proper heading hierarchy and figure/figcaption elements

## Keyboard Navigation
- **Tab Navigation**: Use Tab key to move between gallery items
- **Enter/Space**: Open lightbox modal with Enter or Space key
- **Arrow Keys**: Navigate between images within the lightbox (when implemented)
- **Escape Key**: Close lightbox modal with Escape key
- **Focus Management**: Clear focus indicators and proper focus trapping

## Visual Accessibility
- **High Contrast**: Text overlays with sufficient color contrast ratios
- **Scalable Elements**: All interactive elements meet minimum touch target sizes
- **Reduced Motion**: Respects user preferences for reduced motion
- **Color Independence**: Information is not conveyed by color alone

## Testing Instructions
1. **Keyboard Test**: Navigate the gallery using only keyboard
2. **Screen Reader**: Test with NVDA, JAW, or VoiceOver
3. **High Contrast Mode**: Verify visibility in high contrast mode
4. **Zoom Test**: Ensure usability at 200% zoom level

Try navigating this gallery with keyboard only to experience the accessibility features.
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'keyboard', enabled: true },
          { id: 'focus-order-semantics', enabled: true },
          { id: 'aria-roles', enabled: true },
        ],
      },
    },
  },
  args: {
    pre_headline: 'Accessibility',
    section_title: 'Inclusive Design Gallery',
    sub_headline: 'Demonstrating comprehensive accessibility features for all users',
    gallery_items: createGalleryItems([
      {
        id: 'a11y-1',
        thumbnail: 'https://picsum.photos/400/300?random=110',
        fullImage: 'https://picsum.photos/1200/800?random=110',
        description: 'Accessible web design featuring high contrast colors, clear typography, and semantic HTML structure optimized for screen readers'
      },
      {
        id: 'a11y-2',
        thumbnail: 'https://picsum.photos/400/300?random=111',
        fullImage: 'https://picsum.photos/1200/800?random=111',
        description: 'Keyboard navigation interface with visible focus indicators, skip links, and logical tab order for efficient keyboard-only operation'
      },
      {
        id: 'a11y-3',
        thumbnail: 'https://picsum.photos/400/300?random=112',
        fullImage: 'https://picsum.photos/1200/800?random=112',
        description: 'Mobile accessibility features including large touch targets, voice control compatibility, and responsive design for various assistive technologies'
      },
      {
        id: 'a11y-4',
        thumbnail: 'https://picsum.photos/400/300?random=113',
        fullImage: 'https://picsum.photos/1200/800?random=113',
        description: 'WCAG 2.1 compliant interface demonstrating AA level accessibility standards with proper color contrast and scalable text'
      }
    ]),
  },
};

/**
 * Development Playground
 * 
 * Interactive playground for testing and experimenting with gallery configurations.
 * All controls are available for real-time customization and testing.
 */
export const Playground = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: `
# Development Playground

Interactive testing environment for the Gallery component. Use the controls below to experiment with different configurations:

## Available Controls
- **Content**: Modify headlines and descriptions
- **Theme**: Toggle between light and dark themes
- **Gallery Items**: Customize the image collection
- **Modifiers**: Add custom CSS classes

## Testing Scenarios
1. **Responsive Testing**: Resize viewport to test different breakpoints
2. **Content Length**: Test with long and short text content
3. **Image Variations**: Try different image sizes and orientations
4. **Theme Variants**: Compare light and dark theme presentations
5. **Accessibility**: Test keyboard navigation and screen reader compatibility

## Development Notes
- Gallery items use the gallery-item component with lightbox functionality
- Images are optimized with loading states and error handling
- All interactions respect accessibility standards
- Component supports custom modifiers for extended styling

Use this playground to validate new features and test edge cases during development.
        `,
      },
    },
  },
  args: {
    pre_headline: 'Playground',
    section_title: 'Interactive Testing Gallery',
    sub_headline: 'Experiment with different configurations and test component behavior',
    is_dark: false,
    modifier: 'playground-gallery',
    gallery_items: createGalleryItems([
      {
        id: 'playground-1',
        thumbnail: 'https://picsum.photos/400/300?random=200',
        fullImage: 'https://picsum.photos/1200/800?random=200',
        description: 'Development Testing Image 1 - Interactive gallery item for component testing'
      },
      {
        id: 'playground-2',
        thumbnail: 'https://picsum.photos/400/300?random=201',
        fullImage: 'https://picsum.photos/1200/800?random=201',
        description: 'Development Testing Image 2 - Sample content for playground experimentation'
      },
      {
        id: 'playground-3',
        thumbnail: 'https://picsum.photos/400/300?random=202',
        fullImage: 'https://picsum.photos/1200/800?random=202',
        description: 'Development Testing Image 3 - Test image for responsive layout validation'
      },
      {
        id: 'playground-4',
        thumbnail: 'https://picsum.photos/400/300?random=203',
        fullImage: 'https://picsum.photos/1200/800?random=203',
        description: 'Development Testing Image 4 - Example gallery item for component testing'
      }
    ]),
  },
};

// ============================================================================
// DOCUMENTATION & USAGE EXAMPLES
// ============================================================================

/**
 * @fileoverview Gallery Component - Comprehensive Documentation
 * 
 * The Gallery component is a feature-rich image gallery with lightbox functionality,
 * designed for Drupal's Single Directory Components (SDC) architecture.
 * 
 * @example Basic TWIG Usage
 * {% include 'adesso_cms_theme:gallery' with {
 *   pre_headline: 'Our Work',
 *   section_title: 'Project Gallery',
 *   sub_headline: 'Showcasing our latest achievements',
 *   gallery_items: rendered_media_items,
 *   is_dark: false
 * } %}
 * 
 * @example With Gallery Items
 * {% set gallery_items %}
 *   {% for item in content.field_media_item %}
 *     {% include 'adesso_cms_theme:gallery-item' with {
 *       item: {
 *         id: item['#item'].target_id,
 *         media: item|render,
 *         media_thumb: item|render,
 *         media_description: item['#item'].entity.name.value
 *       }
 *     } %}
 *   {% endfor %}
 * {% endset %}
 * 
 * @example Portfolio Gallery
 * {% include 'adesso_cms_theme:gallery' with {
 *   section_title: 'Featured Projects',
 *   sub_headline: 'Our latest work and achievements',
 *   gallery_items: portfolio_items,
 *   modifier: 'portfolio-gallery'
 * } %}
 * 
 * @example Team Gallery
 * {% include 'adesso_cms_theme:gallery' with {
 *   pre_headline: 'Meet Our Team',
 *   section_title: 'Expert Professionals',
 *   gallery_items: team_photos,
 *   is_dark: true
 * } %}
 * 
 * @example Event Photos
 * {% include 'adesso_cms_theme:gallery' with {
 *   section_title: 'Conference 2024',
 *   sub_headline: 'Highlights from our annual event',
 *   gallery_items: event_media,
 *   modifier: 'event-gallery'
 * } %}
 * 
 * @technical Component Structure
 * - gallery.component.yml: Component schema definition
 * - gallery.twig: Main gallery template with responsive grid
 * - gallery-item.component.yml: Individual item schema
 * - gallery-item.twig: Item template with lightbox functionality
 * - gallery.behavior.js: JavaScript for modal interactions (optional)
 * 
 * @accessibility Features
 * - WCAG 2.1 AA compliant
 * - Full keyboard navigation support
 * - Screen reader optimized
 * - High contrast mode compatible
 * - Touch-friendly interaction
 * - Proper ARIA labels and roles
 * 
 * @responsive Breakpoints
 * - Mobile (default): 1 column
 * - Small (sm:): 2 columns
 * - Large (lg:): 4 columns
 * - Customizable via Tailwind CSS classes
 * 
 * @performance Optimizations
 * - Lazy loading ready (add loading="lazy" to images)
 * - Thumbnail optimization for faster grid rendering
 * - Full-size images loaded only in lightbox
 * - CSS-only hover effects for better performance
 * 
 * @customization Options
 * - Theme variants (light/dark)
 * - Custom modifier classes
 * - Flexible grid layouts
 * - Customizable typography
 * - Brand color integration
 * 
 * @drupal Integration
 * - Works with Media entities
 * - Paragraph type compatible
 * - Field template overrides included
 * - Custom block integration ready
 * - Recipe system compatible
 * 
 * @browser Support
 * - Chrome 90+
 * - Firefox 88+
 * - Safari 14+
 * - Edge 90+
 * - Mobile browsers (iOS Safari, Chrome Mobile)
 * 
 * @version 1.0.0
 * @since Drupal 11
 * @author adesso CMS Team
 */