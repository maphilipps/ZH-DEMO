// phpcs:ignoreFile

import Component from './card-group.twig';
import cardGroupData from './card-group.stories.data.js';

const meta = {
  title: 'Editorial/CardGroup',
  component: Component,
  argTypes: {
    section_title: {
      name: 'Section Title',
      description: 'The title of the card list component',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    card_items: {
      name: 'Card Items',
      description: 'Array of card list items (StatCardProps | CustomCardProps)',
      control: { type: 'object' },
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    columns: {
      name: 'Columns',
      description: 'Number of columns to render',
      control: { type: 'select' },
      options: ['2', '3'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '3' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Card group component for displaying collections of cards in flexible grid layouts with support for different card types.

## TWIG Usage

\`\`\`twig
{# Basic card group with custom cards #}
{% include 'sdc:card-group' with {
  section_title: 'Our Services',
  columns: '3',
  card_items: [
    {
      type: 'custom',
      media: '<img src="/images/service1.jpg" alt="Service" class="w-full h-48 object-cover">',
      heading: {
        title: 'Service Title',
        level: 'h3'
      },
      summary_text: 'Description of the service offered.',
      link: {
        url: '/services/service1',
        title: 'Learn More'
      }
    }
  ]
} %}

{# Stat cards with metrics #}
{% include 'sdc:card-group' with {
  section_title: 'Our Impact',
  columns: '2',
  card_items: [
    {
      type: 'stat',
      icon: 'users',
      heading: {
        title: 'Happy Customers',
        level: 'h3'
      },
      body: 'Customers trust our platform worldwide.',
      media: '<div class="text-3xl font-bold text-blue-600">1000+</div>'
    }
  ]
} %}

{# With pre-headline #}
{% include 'sdc:card-group' with {
  section_title: 'Platform Features',
  pre_headline: 'Why Choose Us',
  columns: '3',
  card_items: feature_cards
} %}
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Default card group
export const Default = {
  parameters: {
    layout: 'padded',
  },
  args: {
    section_title: 'Our Services',
    columns: '3',
    card_items: [
      {
        type: 'custom',
        media: `
          <div class="w-full h-48 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        `,
        heading: {
          title: 'Web Development',
          level: 'h3',
        },
        summary_text: 'Modern web applications built with cutting-edge technologies and best practices.',
        link: {
          url: '/services/web-development',
          title: 'Learn More',
        },
        tags: [
          { name: 'Frontend', color: 'blue' },
          { name: 'Backend', color: 'green' },
        ],
      },
      {
        type: 'stat',
        icon: 'users',
        heading: {
          title: 'Happy Clients',
          level: 'h3',
        },
        body: 'Businesses worldwide trust our platform for their digital needs.',
        media: `
          <div class="text-3xl font-bold text-green-600 mb-2">500+</div>
          <div class="text-sm text-gray-600">Satisfied Customers</div>
        `,
      },
      {
        type: 'custom',
        media: `
          <div class="w-full h-48 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
        `,
        heading: {
          title: 'Performance Optimization',
          level: 'h3',
        },
        summary_text: 'Speed up your applications with our comprehensive optimization services.',
        link: {
          url: '/services/optimization',
          title: 'Get Started',
        },
        tags: [
          { name: 'Speed', color: 'yellow' },
          { name: 'Optimization', color: 'purple' },
        ],
      },
    ],
  },
};

// Columns options - showing enum options from YAML
export const Columns = {
  render: () => `
    <div class="space-y-12">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold mb-2">Column Layout Options</h2>
        <p class="text-gray-600">All available columns settings from the YAML schema</p>
      </div>
      
      <div class="space-y-8">
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-4">2 Columns</h3>
          <div class="text-sm text-gray-600 mb-4">Side-by-side layout for comparisons or featured content</div>
          <div class="grid grid-cols-2 gap-4 max-w-2xl">
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div class="w-full h-24 bg-blue-100 rounded mb-2"></div>
              <div class="font-semibold text-sm">Card Title</div>
              <div class="text-xs text-gray-600">Card description</div>
            </div>
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div class="w-full h-24 bg-green-100 rounded mb-2"></div>
              <div class="font-semibold text-sm">Card Title</div>
              <div class="text-xs text-gray-600">Card description</div>
            </div>
          </div>
        </div>
        
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-4">3 Columns (Default)</h3>
          <div class="text-sm text-gray-600 mb-4">Standard three-column grid for services, features, or team members</div>
          <div class="grid grid-cols-3 gap-4 max-w-4xl">
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div class="w-full h-20 bg-blue-100 rounded mb-2"></div>
              <div class="font-semibold text-sm">Card Title</div>
              <div class="text-xs text-gray-600">Description</div>
            </div>
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div class="w-full h-20 bg-green-100 rounded mb-2"></div>
              <div class="font-semibold text-sm">Card Title</div>
              <div class="text-xs text-gray-600">Description</div>
            </div>
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div class="w-full h-20 bg-purple-100 rounded mb-2"></div>
              <div class="font-semibold text-sm">Card Title</div>
              <div class="text-xs text-gray-600">Description</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available columns options from the YAML schema.',
      },
    },
  },
};

// Statistics cards
export const Statistics = {
  args: {
    section_title: 'Our Impact',
    pre_headline: 'By the Numbers',
    columns: '3',
    card_items: [
      {
        type: 'stat',
        icon: 'users',
        heading: {
          title: 'Active Users',
          level: 'h3',
        },
        body: 'People use our platform every month to achieve their goals.',
        media: `
          <div class="text-4xl font-bold text-blue-600 mb-2">10K+</div>
          <div class="text-sm text-gray-600">Monthly Active</div>
        `,
      },
      {
        type: 'stat',
        icon: 'trending-up',
        heading: {
          title: 'Success Rate',
          level: 'h3',
        },
        body: 'Projects completed successfully and delivered on time.',
        media: `
          <div class="text-4xl font-bold text-green-600 mb-2">98%</div>
          <div class="text-sm text-gray-600">Success Rate</div>
        `,
      },
      {
        type: 'stat',
        icon: 'clock',
        heading: {
          title: 'Average Response',
          level: 'h3',
        },
        body: 'Lightning-fast performance with optimized infrastructure.',
        media: `
          <div class="text-4xl font-bold text-purple-600 mb-2">&lt;200ms</div>
          <div class="text-sm text-gray-600">Response Time</div>
        `,
      },
    ],
  },
};

// Two-column layout
export const TwoColumn = {
  args: {
    section_title: 'Compare Plans',
    columns: '2',
    card_items: [
      {
        type: 'custom',
        media: `
          <div class="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
            <div class="text-2xl font-bold text-gray-600">FREE</div>
          </div>
        `,
        heading: {
          title: 'Free Plan',
          level: 'h3',
        },
        summary_text: 'Perfect for individuals and small projects with essential features.',
        link: {
          url: '/pricing/free',
          title: 'Get Started',
        },
        tags: [
          { name: 'Free', color: 'green' },
          { name: 'Basic', color: 'gray' },
        ],
      },
      {
        type: 'custom',
        media: `
          <div class="w-full h-32 bg-blue-500 rounded-lg flex items-center justify-center">
            <div class="text-2xl font-bold text-white">PRO</div>
          </div>
        `,
        heading: {
          title: 'Pro Plan',
          level: 'h3',
        },
        summary_text: 'Advanced features for teams and businesses that need more power.',
        link: {
          url: '/pricing/pro',
          title: 'Upgrade Now',
        },
        tags: [
          { name: 'Pro', color: 'blue' },
          { name: 'Advanced', color: 'purple' },
        ],
      },
    ],
  },
};

// Team showcase
export const TeamShowcase = {
  args: {
    section_title: 'Meet Our Team',
    pre_headline: 'Leadership',
    columns: '3',
    card_items: [
      {
        type: 'custom',
        media: `
          <div class="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        `,
        heading: {
          title: 'Sarah Johnson',
          level: 'h3',
        },
        summary_text: 'CEO and Founder with 15+ years of experience in technology and business strategy.',
        link: {
          url: '/team/sarah-johnson',
          title: 'View Profile',
        },
        tags: [
          { name: 'CEO', color: 'blue' },
          { name: 'Strategy', color: 'purple' },
        ],
      },
      {
        type: 'custom',
        media: `
          <div class="w-full h-48 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        `,
        heading: {
          title: 'Michael Chen',
          level: 'h3',
        },
        summary_text: 'CTO and Lead Developer specializing in scalable architecture and system design.',
        link: {
          url: '/team/michael-chen',
          title: 'View Profile',
        },
        tags: [
          { name: 'CTO', color: 'green' },
          { name: 'Development', color: 'blue' },
        ],
      },
      {
        type: 'custom',
        media: `
          <div class="w-full h-48 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        `,
        heading: {
          title: 'Emma Rodriguez',
          level: 'h3',
        },
        summary_text: 'Head of Design with expertise in user experience and interface design.',
        link: {
          url: '/team/emma-rodriguez',
          title: 'View Profile',
        },
        tags: [
          { name: 'Design', color: 'purple' },
          { name: 'UX/UI', color: 'pink' },
        ],
      },
    ],
  },
};

// Playground for testing all properties
export const Playground = {
  args: {
    section_title: 'Test Card Group',
    pre_headline: 'Test Section',
    columns: '3',
    card_items: [
      {
        type: 'custom',
        media: `<div class="w-full h-32 bg-gray-100 rounded-lg"></div>`,
        heading: {
          title: 'Test Card',
          level: 'h3',
        },
        summary_text: 'This is a test card for experimenting with different configurations.',
        link: {
          url: '#',
          title: 'Test Link',
        },
        tags: [
          { name: 'Test', color: 'gray' },
        ],
      },
      {
        type: 'stat',
        icon: 'check',
        heading: {
          title: 'Test Stat',
          level: 'h3',
        },
        body: 'This is a test stat card.',
        media: `<div class="text-2xl font-bold text-blue-600">Test</div>`,
      },
    ],
  },
};