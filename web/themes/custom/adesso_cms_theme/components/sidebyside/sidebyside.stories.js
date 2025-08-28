// phpcs:ignoreFile

import Component from './sidebyside.twig';

const meta = {
  title: 'Editorial/SideBySide',
  component: Component,
  argTypes: {
    pre_headline: {
      name: 'Pre-headline',
      description: 'Pre-headline text above the main title',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    title: {
      name: 'Title',
      description: 'Side-by-Side title',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    media: {
      name: 'Media',
      description: 'Side-by-Side image or video markup',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    text: {
      name: 'Text',
      description: 'Side-by-Side body text',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    features: {
      name: 'Features',
      description: 'Array of features or stat cards',
      control: { type: 'object' },
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    link: {
      name: 'Link',
      description: 'Call to action',
      control: { type: 'object' },
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    layout: {
      name: 'Layout',
      description: 'Controls image left/right placement',
      control: { type: 'select' },
      options: ['left', 'right'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'left' },
      },
    },
    modifier: {
      name: 'Modifier',
      description: 'Additional classes for the component',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Side-by-side component for displaying content with flexible image/text layouts and optional feature lists.

## TWIG Usage

\`\`\`twig
{# Basic side-by-side with image on left #}
{% include 'sdc:sidebyside' with {
  pre_headline: 'Our Platform',
  title: 'Powerful Features',
  media: '<img src="/images/features.jpg" alt="Platform features" class="w-full h-full object-cover">',
  text: '<p>Discover how our platform can transform your business with innovative solutions and cutting-edge technology.</p>',
  layout: 'left',
  link: {
    url: '/features',
    title: 'Learn More',
    icon: ''
  }
} %}

{# With feature list #}
{% include 'sdc:sidebyside' with {
  title: 'Why Choose Us',
  media: '<img src="/images/about.jpg" alt="About us" class="w-full h-full object-cover">',
  text: '<p>We provide comprehensive solutions for your business needs.</p>',
  features: [
    {
      title: 'Fast Performance',
      icon: 'zap'
    },
    {
      title: 'Secure Platform',
      icon: 'shield'
    }
  ],
  layout: 'right'
} %}

{# Image on right side #}
{% include 'sdc:sidebyside' with {
  title: 'Get Started Today',
  text: content.field_body,
  media: content.field_image,
  layout: 'right'
} %}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;

// Default side-by-side
export const Default = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    pre_headline: 'Our Platform',
    title: 'Powerful Features for Modern Business',
    media:
      '<img src="https://picsum.photos/600/400?random=1" alt="Platform features" class="w-full h-full object-cover rounded-lg">',
    text: '<p>Discover how our platform can transform your business with innovative solutions and cutting-edge technology. Our comprehensive suite of tools helps you streamline operations, improve efficiency, and drive growth.</p>',
    layout: 'left',
    link: {
      url: '/features',
      title: 'Explore Features',
      icon: '',
    },
    modifier: '',
  },
};

// Layout options - showing enum options from YAML
export const Layouts = {
  render: () => `
    <div class="space-y-12">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold mb-2">Layout Options</h2>
        <p class="text-gray-600">All available layout settings from the YAML schema</p>
      </div>
      
      <div class="space-y-8">
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-4">Left Layout</h3>
          <div class="text-sm text-gray-600 mb-4">Image on the left, content on the right</div>
          <div class="flex items-center gap-6 container">
            <div class="flex-1">
              <div class="w-full h-32 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="text-blue-600 font-medium">Image</span>
              </div>
            </div>
            <div class="flex-1">
              <div class="space-y-2">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                <div class="h-8 bg-blue-100 rounded w-1/3 mt-4"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-4">Right Layout</h3>
          <div class="text-sm text-gray-600 mb-4">Content on the left, image on the right</div>
          <div class="flex items-center gap-6 container">
            <div class="flex-1">
              <div class="space-y-2">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                <div class="h-8 bg-blue-100 rounded w-1/3 mt-4"></div>
              </div>
            </div>
            <div class="flex-1">
              <div class="w-full h-32 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="text-blue-600 font-medium">Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available layout options from the YAML schema.',
      },
    },
  },
};

// Image on right
export const ImageRight = {
  args: {
    pre_headline: 'About Us',
    title: 'Leading Digital Innovation',
    media:
      '<img src="https://picsum.photos/600/400?random=2" alt="Team collaboration" class="w-full h-full object-cover rounded-lg">',
    text: '<p>With over a decade of experience in digital transformation, we help businesses achieve their technology goals through innovative solutions and expert guidance.</p>',
    layout: 'right',
    link: {
      url: '/about',
      title: 'Learn More',
      icon: '',
    },
  },
};

// With features list
export const WithFeatures = {
  args: {
    title: 'Why Choose Our Platform',
    media:
      '<img src="https://picsum.photos/600/400?random=3" alt="Platform benefits" class="w-full h-full object-cover rounded-lg">',
    text: "<p>Our platform provides everything you need to succeed in today's digital landscape.</p>",
    features: [
      {
        title: 'Lightning Fast Performance',
        icon: 'zap',
      },
      {
        title: 'Enterprise Security',
        icon: 'shield',
      },
      {
        title: '24/7 Expert Support',
        icon: 'headphones',
      },
      {
        title: 'Seamless Integration',
        icon: 'link',
      },
    ],
    layout: 'left',
    link: {
      url: '/platform',
      title: 'Try It Free',
      icon: '',
    },
  },
};

// Service showcase
export const ServiceShowcase = {
  args: {
    pre_headline: 'Our Services',
    title: 'Complete Digital Solutions',
    media:
      '<img src="https://picsum.photos/600/400?random=4" alt="Digital solutions" class="w-full h-full object-cover rounded-lg">',
    text: '<p>From strategy to implementation, we provide end-to-end digital services that drive real business results.</p>',
    features: [
      {
        title: 'Strategic Consulting',
        icon: 'lightbulb',
      },
      {
        title: 'Custom Development',
        icon: 'code',
      },
      {
        title: 'Cloud Migration',
        icon: 'cloud',
      },
    ],
    layout: 'right',
    link: {
      url: '/services',
      title: 'View All Services',
      icon: '',
    },
  },
};

// Video content
export const WithVideo = {
  args: {
    title: 'See Our Platform in Action',
    media:
      '<div class="w-full h-64 bg-gray-900 rounded-lg flex items-center justify-center"><div class="w-16 h-16 bg-white rounded-full flex items-center justify-center"><svg class="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div>',
    text: '<p>Watch a quick demo of our platform and see how it can streamline your workflow and boost productivity.</p>',
    layout: 'left',
    link: {
      url: '/demo',
      title: 'Schedule Demo',
      icon: 'play',
    },
  },
};

// Text only (no image)
export const TextOnly = {
  args: {
    pre_headline: 'Get Started',
    title: 'Ready to Transform Your Business?',
    media: '',
    text: '<p>Join thousands of businesses that have already transformed their operations with our innovative platform. Get started today with our free trial and see the difference for yourself.</p>',
    layout: 'left',
    link: {
      url: '/signup',
      title: 'Start Free Trial',
      icon: '',
    },
  },
};

// Playground for testing all properties
export const Playground = {
  args: {
    pre_headline: 'Test Section',
    title: 'Test Side-by-Side Component',
    media:
      '<img src="https://picsum.photos/600/400?random=1" alt="Test image" class="w-full h-full object-cover rounded-lg">',
    text: '<p>This is test content for the side-by-side component.</p>',
    features: [
      {
        title: 'Test Feature',
        icon: 'check',
      },
    ],
    layout: 'left',
    link: {
      url: '#',
      title: 'Test Link',
      icon: '',
    },
    modifier: '',
  },
};
