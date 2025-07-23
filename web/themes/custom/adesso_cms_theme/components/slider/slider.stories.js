/**
 * @file
 * Enhanced Slider component stories showcasing modern design patterns.
 */

import sliderTemplate from './slider.twig';
import sliderItemTemplate from './slider-item.twig';
import './slider.behavior.js';

export default {
  title: 'Components/Enhanced Slider',
  component: 'slider',
  parameters: {
    docs: {
      description: {
        component: `
# Enhanced Slider Component

A modern, accessible slider component with sophisticated animations and interactions:

## Features
- **Modern Design**: Glass-morphism effects, smooth transitions, and elegant controls
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels and keyboard navigation
- **Performance**: Intersection Observer API for optimal performance
- **Touch Support**: Enhanced mobile experience with swipe gestures
- **Micro-interactions**: Ripple effects, loading states, and smooth animations
- **Responsive**: Mobile-first design with adaptive controls

## Interactive Elements
- Navigation arrows with hover effects
- Enhanced pagination dots with animations
- Play/pause control for autoplay
- Slide counter with animated updates
- Progress indicators for each slide

## Accessibility
- Keyboard navigation (arrows, spacebar)
- Screen reader support
- High contrast mode support
- Reduced motion support
        `,
      },
    },
  },
  argTypes: {
    items: {
      description: 'Array of slider items with media, title, and summary',
      control: 'object',
    },
  },
};

// Helper function to create enhanced slider item HTML with accessibility
const createSliderItem = (media, title, summary, mediaAlt, mediaCaption) => {
  return sliderItemTemplate({
    media: media,
    title: title,
    summary: summary,
    media_alt: mediaAlt,
    media_caption: mediaCaption,
  });
};

// Enhanced placeholder images with better gradients and adesso branding
const createEnhancedImage = (slideNumber, color, bgColor = 'ffffff') => {
  return `<img src="https://via.placeholder.com/1200x675/${color}/${bgColor}?text=adesso+CMS+Slide+${slideNumber}" class="w-full h-full object-cover transition-transform duration-700">`;
};

export const EnhancedDefault = {
  name: '🎨 Enhanced Slider (Default)',
  render: (args) => sliderTemplate(args),
  args: {
    items: [
      createSliderItem(
        createEnhancedImage(1, '3B82F6'),
        'Digital Innovation Excellence',
        'Discover cutting-edge solutions that transform your business landscape with modern technology and innovative approaches.',
        'Business professionals collaborating on digital innovation projects with modern technology interfaces',
        'A dynamic workspace showcasing digital transformation and innovative technology solutions'
      ),
      createSliderItem(
        createEnhancedImage(2, '10B981'),
        'Sustainable Technology Solutions',
        'Building the future with environmentally conscious development practices and sustainable technology frameworks.',
        'Green technology infrastructure with sustainable development practices and eco-friendly business solutions',
        'Sustainable technology center focused on environmental responsibility and green innovation'
      ),
      createSliderItem(
        createEnhancedImage(3, 'EF4444'),
        'Strategic Business Growth',
        'Accelerate your business growth with our strategic consulting and advanced digital transformation services.',
        'Strategic business meeting with growth charts and transformation roadmaps displayed on modern screens',
        'Executive boardroom with strategic planning materials and business growth analytics'
      ),
      createSliderItem(
        createEnhancedImage(4, 'F59E0B'),
        'Expert Consulting Services',
        'Leverage our deep industry expertise to navigate complex challenges and achieve exceptional business outcomes.',
        'Expert consultants providing strategic guidance and industry insights to business leaders',
        'Professional consulting session with expert advisors and industry specialists'
      ),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'The default enhanced slider with modern design, smooth animations, and all interactive features enabled.',
      },
    },
  },
};

export const ProfessionalShowcase = {
  name: '💼 Professional Showcase',
  render: (args) => sliderTemplate(args),
  args: {
    items: [
      createSliderItem(
        createEnhancedImage(1, '1F2937', 'F3F4F6'),
        'Enterprise Solutions',
        'Comprehensive enterprise-grade solutions designed for scalability, security, and performance at the highest level.'
      ),
      createSliderItem(
        createEnhancedImage(2, '374151', 'E5E7EB'),
        'Cloud Infrastructure',
        'Modern cloud-native architectures that provide flexibility, reliability, and cost-effective scaling for your business.'
      ),
      createSliderItem(
        createEnhancedImage(3, '4B5563', 'D1D5DB'),
        'Data Analytics Platform',
        'Advanced analytics and business intelligence solutions that turn your data into actionable insights and competitive advantages.'
      ),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'A professional showcase variant with corporate-style imagery and business-focused content.',
      },
    },
  },
};

export const CreativePortfolio = {
  name: '🎭 Creative Portfolio',
  render: (args) => sliderTemplate(args),
  args: {
    items: [
      createSliderItem(
        createEnhancedImage(1, '8B5CF6'),
        'Creative Design Excellence',
        'Award-winning design solutions that combine aesthetic beauty with functional user experience and brand storytelling.'
      ),
      createSliderItem(
        createEnhancedImage(2, 'EC4899'),
        'Interactive Experiences',
        'Immersive digital experiences that engage users through innovative interaction design and cutting-edge technology.'
      ),
      createSliderItem(
        createEnhancedImage(3, '06B6D4'),
        'Brand Identity Systems',
        'Comprehensive brand identity development that creates memorable, cohesive visual languages across all touchpoints.'
      ),
      createSliderItem(
        createEnhancedImage(4, '84CC16'),
        'Motion Design & Animation',
        'Dynamic motion graphics and animations that bring brands to life and create engaging visual narratives.'
      ),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'A creative portfolio variant showcasing vibrant colors and creative content perfect for design agencies.',
      },
    },
  },
};

export const MinimalImageGallery = {
  name: '🖼️ Minimal Image Gallery',
  render: (args) => sliderTemplate(args),
  args: {
    items: [
      createSliderItem(
        createEnhancedImage(1, 'F3F4F6', '1F2937'),
        '',
        ''
      ),
      createSliderItem(
        createEnhancedImage(2, 'E5E7EB', '374151'),
        '',
        ''
      ),
      createSliderItem(
        createEnhancedImage(3, 'D1D5DB', '4B5563'),
        '',
        ''
      ),
      createSliderItem(
        createEnhancedImage(4, 'F9FAFB', '111827'),
        '',
        ''
      ),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'A minimal image gallery without text overlays, focusing purely on visual content with enhanced navigation.',
      },
    },
  },
};

export const SingleSlideShowcase = {
  name: '🎯 Single Slide',
  render: (args) => sliderTemplate(args),
  args: {
    items: [
      createSliderItem(
        createEnhancedImage(1, '6366F1'),
        'Featured Content',
        'When displaying a single slide, the navigation controls are automatically hidden for a clean, focused presentation.'
      ),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Single slide demonstration showing how the component gracefully handles single-item content without navigation controls.',
      },
    },
  },
};

export const ExtensiveCollection = {
  name: '📚 Extensive Collection',
  render: (args) => sliderTemplate(args),
  args: {
    items: [
      createSliderItem(
        createEnhancedImage(1, 'DC2626'),
        'Innovation Leadership',
        'Leading the industry with breakthrough innovations and transformative solutions.'
      ),
      createSliderItem(
        createEnhancedImage(2, 'EA580C'),
        'Technical Excellence',
        'Delivering exceptional technical solutions with precision and attention to detail.'
      ),
      createSliderItem(
        createEnhancedImage(3, 'F59E0B'),
        'Strategic Partnership',
        'Building lasting partnerships through collaborative approaches and shared success.'
      ),
      createSliderItem(
        createEnhancedImage(4, '059669'),
        'Sustainable Growth',
        'Fostering sustainable business growth through responsible practices and innovation.'
      ),
      createSliderItem(
        createEnhancedImage(5, '0891B2'),
        'Digital Transformation',
        'Enabling digital transformation journeys with cutting-edge technology solutions.'
      ),
      createSliderItem(
        createEnhancedImage(6, '7C3AED'),
        'Future-Ready Solutions',
        'Preparing organizations for the future with scalable, adaptable technology platforms.'
      ),
      createSliderItem(
        createEnhancedImage(7, 'BE185D'),
        'Customer Success',
        'Ensuring customer success through dedicated support and continuous value delivery.'
      ),
      createSliderItem(
        createEnhancedImage(8, '0F766E'),
        'Global Expertise',
        'Leveraging global expertise to deliver localized solutions that meet diverse market needs.'
      ),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the slider handling a large collection of slides with smooth performance and enhanced pagination.',
      },
    },
  },
};

export const AccessibilityDemo = {
  name: '♿ Accessibility Features',
  render: (args) => sliderTemplate(args),
  args: {
    items: [
      createSliderItem(
        createEnhancedImage(1, '3B82F6'),
        'Keyboard Navigation',
        'Use arrow keys to navigate between slides, spacebar to pause/resume autoplay, and tab to focus on interactive elements.',
        'Person using keyboard navigation to control slider with focus indicators clearly visible on interactive elements',
        'Accessibility demonstration showing keyboard-only navigation with visible focus states'
      ),
      createSliderItem(
        createEnhancedImage(2, '10B981'),
        'Screen Reader Support',
        'All controls have proper ARIA labels and announcements. Slide content is accessible to assistive technologies.',
        'Screen reader user wearing headphones navigating slider content with assistive technology software interface',
        'Demonstration of screen reader compatibility with proper ARIA labels and semantic markup'
      ),
      createSliderItem(
        createEnhancedImage(3, 'EF4444'),
        'High Contrast Mode',
        'The slider automatically adapts to high contrast preferences with enhanced visibility for controls and content.',
        'High contrast display showing slider with enhanced visibility, bold outlines and clear color differentiation',
        'Accessibility feature showing automatic adaptation to high contrast system preferences'
      ),
      createSliderItem(
        createEnhancedImage(4, 'F59E0B'),
        'Reduced Motion',
        'Respects prefers-reduced-motion settings by disabling animations for users who prefer minimal motion.',
        'Static slider interface with minimal motion and reduced animation effects for accessibility compliance',
        'Demonstration of reduced motion preferences with disabled animations and smooth transitions'
      ),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features demonstration showing keyboard navigation, screen reader support, and preference-based adaptations.',
      },
    },
  },
};

// Performance monitoring story
export const PerformanceMonitoring = {
  name: '⚡ Performance Features',
  render: (args) => sliderTemplate(args),
  args: {
    items: [
      createSliderItem(
        createEnhancedImage(1, '8B5CF6'),
        'Intersection Observer',
        'Automatic pause/resume based on viewport visibility for optimal performance and battery life.'
      ),
      createSliderItem(
        createEnhancedImage(2, 'EC4899'),
        'Optimized Animations',
        'Hardware-accelerated CSS animations with efficient transform and opacity properties for smooth performance.'
      ),
      createSliderItem(
        createEnhancedImage(3, '06B6D4'),
        'Memory Management',
        'Proper cleanup of event listeners and observers prevents memory leaks in single-page applications.'
      ),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance optimization features including Intersection Observer API and efficient animation strategies.',
      },
    },
  },
};