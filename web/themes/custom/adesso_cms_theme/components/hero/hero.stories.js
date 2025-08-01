// phpcs:ignoreFile

import Component from './hero.twig';

const meta = {
  title: 'Editorial/Hero',
  component: Component,
  argTypes: {
    modifier: {
      name: 'Modifier Classes',
      description: 'Additional CSS classes for the hero wrapper',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    media: {
      name: 'Media Content',
      description: 'Media content (image or video HTML)',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    heading: {
      name: 'Main Heading',
      description: 'Main hero heading',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    text: {
      name: 'Description Text',
      description: 'Hero description text',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    pre_headline: {
      name: 'Pre-headline',
      description: 'Pre-headline text above the main heading',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    hero_layout: {
      name: 'Hero Layout',
      description: 'Layout variant for the Hero component',
      control: { type: 'select' },
      options: ['image_top', 'image_bottom', 'image_bottom_split', 'video_background'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'image_top' },
      },
    },
    link: {
      name: 'Primary Action Link',
      description: 'Primary action link with url, title, and icon',
      control: { type: 'object' },
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    link2: {
      name: 'Secondary Action Link',
      description: 'Secondary action link with url, title, and icon',
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
Hero component for creating impactful page headers with flexible layouts and media options.

## TWIG Usage

\`\`\`twig
{# Basic hero with image #}
{% include 'sdc:hero' with {
  heading: 'Welcome to Our Platform',
  text: '<p>Your digital transformation starts here.</p>',
  pre_headline: 'Innovation',
  media: '<img src="/images/hero.jpg" alt="Hero image" class="w-full h-full object-cover">',
  hero_layout: 'image_top',
  link: {
    url: '/get-started',
    title: 'Get Started',
    icon: ''
  }
} %}

{# Hero with dual call-to-action #}
{% include 'sdc:hero' with {
  heading: 'Transform Your Business',
  text: '<p>Modern solutions for modern challenges.</p>',
  hero_layout: 'image_bottom',
  link: {
    url: '/contact',
    title: 'Contact Us',
    icon: ''
  },
  link2: {
    url: '/services',
    title: 'View Services',
    icon: ''
  }
} %}
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Default hero
export const Default = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    modifier: '',
    media: '<img src="https://picsum.photos/1536/864?random=1" alt="Hero image" class="w-full h-full object-cover">',
    heading: 'Welcome to Our Platform',
    text: '<p>Discover innovative solutions for your business needs.</p>',
    pre_headline: 'Innovation',
    hero_layout: 'image_top',
    link: {
      url: '/get-started',
      title: 'Get Started',
      icon: '',
    },
    link2: {
      url: '/learn-more',
      title: 'Learn More',
      icon: '',
    },
  },
};

// Layout variants - showing enum options from YAML
export const HeroLayouts = {
  render: () => `
    <div class="space-y-8">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold mb-2">Hero Layout Options</h2>
        <p class="text-gray-600">All available layout variants from the YAML schema</p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">image_top</h3>
          <div class="text-sm text-gray-600 mb-3">Image above content</div>
          <div class="bg-gray-100 aspect-video rounded mb-2"></div>
          <div class="text-center">
            <h4 class="font-bold">Headline</h4>
            <p class="text-sm">Description text</p>
          </div>
        </div>
        
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">image_bottom</h3>
          <div class="text-sm text-gray-600 mb-3">Content above image</div>
          <div class="text-center mb-2">
            <h4 class="font-bold">Headline</h4>
            <p class="text-sm">Description text</p>
          </div>
          <div class="bg-gray-100 aspect-video rounded"></div>
        </div>
        
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">image_bottom_split</h3>
          <div class="text-sm text-gray-600 mb-3">Split layout variant</div>
          <div class="text-center mb-2">
            <h4 class="font-bold">Headline</h4>
            <p class="text-sm">Description text</p>
          </div>
          <div class="bg-gray-100 aspect-video rounded"></div>
        </div>
        
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="font-semibold mb-2">video_background</h3>
          <div class="text-sm text-gray-600 mb-3">Video background with overlay</div>
          <div class="bg-gradient-to-r from-blue-500 to-purple-600 aspect-video rounded flex items-center justify-center text-white">
            <div class="text-center">
              <h4 class="font-bold">Headline</h4>
              <p class="text-sm">Description text</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available hero_layout options from the YAML schema.',
      },
    },
  },
};

// Image bottom layout
export const ImageBottom = {
  args: {
    ...Default.args,
    heading: 'Content First Approach',
    text: '<p>Lead with your message, then support it with visuals.</p>',
    hero_layout: 'image_bottom',
  },
};

// Video background hero
export const VideoBackground = {
  args: {
    ...Default.args,
    media: '<div class="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600"></div>',
    heading: 'Immersive Experience',
    text: '<p>Create cinematic impact with video backgrounds.</p>',
    hero_layout: 'video_background',
  },
};

// Hero without media
export const TextOnly = {
  args: {
    ...Default.args,
    media: '',
    heading: 'Simple and Focused',
    text: '<p>Sometimes the message is all you need.</p>',
    pre_headline: 'Minimalist',
  },
};

// Single call-to-action
export const SingleCTA = {
  args: {
    ...Default.args,
    heading: 'Ready to Begin?',
    text: '<p>Take the first step toward your goals.</p>',
    link: {
      url: '/start',
      title: 'Get Started',
      icon: '',
    },
    link2: {
      url: '',
      title: '',
      icon: '',
    },
  },
};

// With icons in buttons
export const WithIcons = {
  args: {
    ...Default.args,
    heading: 'Experience Our Platform',
    text: '<p>See what makes our solution different.</p>',
    link: {
      url: '/demo',
      title: 'Watch Demo',
      icon: 'play-circle',
    },
    link2: {
      url: '/download',
      title: 'Download',
      icon: 'download',
    },
  },
};

// Playground for testing all properties
export const Playground = {
  args: {
    modifier: '',
    media: '<img src="https://picsum.photos/1536/864?random=1" alt="Hero image" class="w-full h-full object-cover">',
    heading: 'Your Hero Headline',
    text: '<p>Your description text goes here.</p>',
    pre_headline: 'Pre-headline',
    hero_layout: 'image_top',
    link: {
      url: '#',
      title: 'Primary Action',
      icon: '',
    },
    link2: {
      url: '#',
      title: 'Secondary Action',
      icon: '',
    },
  },
};