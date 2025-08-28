// phpcs:ignoreFile

import Component from './badge.twig';

const meta = {
  title: 'General/Badge',
  component: Component,
  argTypes: {
    text: {
      name: 'Text',
      description: 'Badge text content',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    variant: {
      name: 'Variant',
      description: 'Badge color variant',
      control: { type: 'select' },
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
      ],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      name: 'Size',
      description: 'Badge size variant',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'md' },
      },
    },
    removable: {
      name: 'Removable',
      description: 'Show remove button',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    icon: {
      name: 'Icon',
      description: 'Optional icon HTML content',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    url: {
      name: 'URL',
      description: 'Optional URL to make badge clickable',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    modifier: {
      name: 'Modifier Classes',
      description: 'Additional CSS classes',
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
Badge component for displaying labels, status indicators, and interactive tags.

## TWIG Usage

\`\`\`twig
{# Basic badge #}
{% include 'sdc:badge' with {
  text: 'New',
  variant: 'primary'
} %}

{# Badge with icon #}
{% include 'sdc:badge' with {
  text: 'Active',
  variant: 'success',
  icon: '<div class="w-2 h-2 bg-current rounded-full"></div>'
} %}

{# Clickable badge #}
{% include 'sdc:badge' with {
  text: 'View Details',
  variant: 'info',
  url: '/details'
} %}

{# Removable badge #}
{% include 'sdc:badge' with {
  text: 'Tag',
  variant: 'light',
  removable: true
} %}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;

// Default Badge
export const Default = {
  parameters: {
    layout: 'centered',
  },
  args: {
    text: 'Default',
    variant: 'default',
    size: 'md',
  },
};

// Variant Examples - showing all enum options from YAML
export const Variants = {
  render: () => `
    <div class="flex flex-wrap gap-2">
      <span class="inline-flex items-center text-sm font-medium rounded-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2.5 py-0.5">default</span>
      <span class="inline-flex items-center text-sm font-medium rounded-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2.5 py-0.5">primary</span>
      <span class="inline-flex items-center text-sm font-medium rounded-sm bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 px-2.5 py-0.5">secondary</span>
      <span class="inline-flex items-center text-sm font-medium rounded-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2.5 py-0.5">success</span>
      <span class="inline-flex items-center text-sm font-medium rounded-sm bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 px-2.5 py-0.5">danger</span>
      <span class="inline-flex items-center text-sm font-medium rounded-sm bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-2.5 py-0.5">warning</span>
      <span class="inline-flex items-center text-sm font-medium rounded-sm bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300 px-2.5 py-0.5">info</span>
      <span class="inline-flex items-center text-sm font-medium rounded-sm bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400 px-2.5 py-0.5">light</span>
      <span class="inline-flex items-center text-sm font-medium rounded-sm bg-gray-800 text-gray-100 dark:bg-gray-200 dark:text-gray-800 px-2.5 py-0.5">dark</span>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available variant options from the YAML schema.',
      },
    },
  },
};

// Size Examples - showing all enum options from YAML
export const Sizes = {
  render: () => `
    <div class="flex items-center gap-2">
      <span class="inline-flex items-center text-xs font-medium rounded-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5">sm</span>
      <span class="inline-flex items-center text-sm font-medium rounded-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2.5 py-0.5">md</span>
      <span class="inline-flex items-center text-base font-medium rounded-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-3 py-1">lg</span>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available size options from the YAML schema.',
      },
    },
  },
};

// Icon Feature
export const WithIcon = {
  args: {
    text: 'With Icon',
    variant: 'success',
    icon: '<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>',
  },
};

// Removable Feature
export const Removable = {
  args: {
    text: 'Removable',
    variant: 'light',
    removable: true,
  },
};

// Clickable Feature
export const Clickable = {
  args: {
    text: 'Clickable',
    variant: 'info',
    url: '#badge-link',
  },
};

// Custom Modifier Classes
export const WithModifier = {
  args: {
    text: 'Custom',
    variant: 'default',
    modifier:
      'border-2 border-dashed border-purple-300 bg-purple-50 text-purple-700',
  },
};

// Playground for testing all properties
export const Playground = {
  args: {
    text: 'Badge Text',
    variant: 'primary',
    size: 'md',
    removable: false,
    icon: '',
    url: '',
    modifier: '',
  },
};
