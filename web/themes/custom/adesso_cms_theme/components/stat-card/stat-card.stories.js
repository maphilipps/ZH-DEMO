// phpcs:ignoreFile

import Component from './stat-card.twig';

const meta = {
  title: 'Cards/StatCard',
  component: Component,
  argTypes: {
    type: {
      name: 'Type',
      description: 'Component type identifier',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    heading: {
      name: 'Heading',
      description: 'Statistical value or main heading',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    body: {
      name: 'Body',
      description: 'Descriptive text explaining the statistic',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    icon: {
      name: 'Icon',
      description: 'Material icon name for the statistic',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    media: {
      name: 'Media',
      description: 'Custom media HTML (SVG, image, etc.)',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    modifier: {
      name: 'Modifier',
      description: 'Additional CSS modifier classes',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    border: {
      name: 'Border',
      description: 'Whether to show border styling',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    layout: {
      name: 'Layout',
      description: 'Layout variation: center, left',
      control: { type: 'select' },
      options: ['center', 'left'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'center' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Statistic card component for displaying key metrics, KPIs, and data points with icons and descriptions.

## TWIG Usage

\`\`\`twig
{# Basic stat card with icon #}
{% include 'sdc:stat-card' with {
  heading: '2.5M+',
  body: 'Active Users',
  icon: 'people',
  layout: 'center'
} %}

{# Stat card with custom SVG media #}
{% include 'sdc:stat-card' with {
  heading: '99.9%',
  body: 'Uptime Guarantee',
  media: '<svg class="w-8 h-8 text-green-500" fill="currentColor">...</svg>',
  layout: 'center',
  border: true
} %}

{# Left-aligned stat with modifier classes #}
{% include 'sdc:stat-card' with {
  heading: '$1.2M',
  body: 'Revenue Growth',
  icon: 'trending_up',
  layout: 'left',
  modifier: 'bg-green-50 text-green-800'
} %}

{# With dynamic content from field #}
{% include 'sdc:stat-card' with {
  heading: content.field_stat_value,
  body: content.field_stat_description,
  icon: content.field_icon_name,
  layout: content.field_layout.value,
  border: true
} %}

{# Performance metrics stat #}
{% include 'sdc:stat-card' with {
  type: 'performance',
  heading: '45ms',
  body: 'Average Response Time',
  icon: 'speed',
  modifier: 'performance-metric'
} %}
\`\`\`

## Layout Options (from YAML schema)
- **center**: Centered layout with icon/media above heading
- **left**: Left-aligned layout with icon/media to the side
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Default centered stat card
export const Default = {
  args: {
    type: '',
    heading: '2.5M+',
    body: 'Active Users Worldwide',
    icon: 'people',
    media: '',
    modifier: '',
    border: false,
    layout: 'center',
  },
};

// Revenue growth stat
export const RevenueGrowth = {
  args: {
    heading: '$1.2M',
    body: 'Revenue Growth This Quarter',
    icon: 'trending_up',
    layout: 'center',
    border: true,
    modifier: 'bg-green-50 text-green-800',
  },
};

// Performance metric
export const PerformanceMetric = {
  args: {
    type: 'performance',
    heading: '45ms',
    body: 'Average Response Time',
    icon: 'speed',
    layout: 'center',
    border: true,
    modifier: 'bg-blue-50 text-blue-800',
  },
};

// Customer satisfaction
export const CustomerSatisfaction = {
  args: {
    heading: '98%',
    body: 'Customer Satisfaction Rate',
    icon: 'star',
    layout: 'center',
    border: false,
    modifier: 'bg-yellow-50 text-yellow-800',
  },
};

// Left-aligned layout
export const LeftAligned = {
  args: {
    heading: '150+',
    body: 'Projects Completed Successfully',
    icon: 'check_circle',
    layout: 'left',
    border: true,
    modifier: 'bg-purple-50 text-purple-800',
  },
};

// With custom SVG media
export const CustomMedia = {
  args: {
    heading: '99.9%',
    body: 'System Uptime Guarantee',
    media: `
      <svg class="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L13.09 8.26L22 9L17 14L18.18 22L12 19L5.82 22L7 14L2 9L10.91 8.26L12 2Z"/>
      </svg>
    `,
    layout: 'center',
    border: true,
  },
};

// Download count
export const Downloads = {
  args: {
    heading: '500K+',
    body: 'Total Downloads',
    icon: 'download',
    layout: 'center',
    border: false,
    modifier: 'bg-indigo-50 text-indigo-800',
  },
};

// Support tickets resolved
export const SupportTickets = {
  args: {
    heading: '24/7',
    body: 'Customer Support Available',
    icon: 'support_agent',
    layout: 'left',
    border: true,
    modifier: 'bg-orange-50 text-orange-800',
  },
};

// Layout comparison - showing both layout options
export const LayoutComparison = {
  render: () => `
    <div class="space-y-8">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold mb-2">Layout Options</h2>
        <p class="text-gray-600">Demonstrating center vs left layout from YAML schema</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-center">Center Layout</h3>
          <div class="p-6 border rounded-lg">
            {% include 'sdc:stat-card' with {
              heading: '2.5M+',
              body: 'Active Users',
              icon: 'people',
              layout: 'center',
              border: true
            } %}
          </div>
        </div>
        
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-center">Left Layout</h3>
          <div class="p-6 border rounded-lg">
            {% include 'sdc:stat-card' with {
              heading: '2.5M+',
              body: 'Active Users',
              icon: 'people',
              layout: 'left',
              border: true
            } %}
          </div>
        </div>
      </div>
    </div>
  `,
};

// Playground for testing all properties
export const Playground = {
  args: {
    type: 'test',
    heading: '123',
    body: 'Test statistic description',
    icon: 'analytics',
    media: '',
    modifier: 'bg-gray-50',
    border: true,
    layout: 'center',
  },
};