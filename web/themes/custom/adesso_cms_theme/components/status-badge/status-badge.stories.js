// phpcs:ignoreFile

import Component from './status-badge.twig';

const meta = {
  title: 'Municipal/Status Badge',
  component: Component,
  argTypes: {
    status: {
      name: 'Status',
      description: 'Current workflow status',
      control: { type: 'select' },
      options: ['neu', 'in_bearbeitung', 'erledigt', 'abgelehnt'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'neu' },
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
Status Badge component for displaying Infrastructure Damage Report workflow status with Swiss municipal styling.

## TWIG Usage

\`\`\`twig
{# Basic status badge #}
{% include 'sdc:status-badge' with {
  status: 'neu'
} %}

{# Large badge for dashboard headers #}
{% include 'sdc:status-badge' with {
  status: 'in_bearbeitung',
  size: 'lg'
} %}

{# Small badge for table cells #}
{% include 'sdc:status-badge' with {
  status: 'erledigt',
  size: 'sm'
} %}
\`\`\`

## Municipal Workflow Integration

This component supports the Swiss municipal workflow stages:
- **Neu**: New submissions (blue)
- **In Bearbeitung**: Under processing (orange) 
- **Erledigt**: Completed (green)
- **Abgelehnt**: Rejected (red)

Each status includes appropriate icons and WCAG-compliant color contrasts.
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Default Status Badge
export const Default = {
  parameters: {
    layout: 'centered',
  },
  args: {
    status: 'neu',
    size: 'md',
  },
};

// All Status Variants
export const AllStatuses = {
  render: () => `
    <div class="flex flex-wrap gap-3">
      <span class="inline-flex items-center text-sm font-medium rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border border-blue-200 px-2.5 py-1">
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
        Neu
      </span>
      <span class="inline-flex items-center text-sm font-medium rounded-md bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 border border-orange-200 px-2.5 py-1">
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        In Bearbeitung
      </span>
      <span class="inline-flex items-center text-sm font-medium rounded-md bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border border-green-200 px-2.5 py-1">
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        Erledigt
      </span>
      <span class="inline-flex items-center text-sm font-medium rounded-md bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border border-red-200 px-2.5 py-1">
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        Abgelehnt
      </span>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All workflow status variants with icons and Swiss municipal color scheme.',
      },
    },
  },
};

// Size Variants
export const Sizes = {
  render: () => `
    <div class="flex items-center gap-3">
      <span class="inline-flex items-center text-xs font-medium rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border border-blue-200 px-2 py-0.5">
        Neu (sm)
      </span>
      <span class="inline-flex items-center text-sm font-medium rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border border-blue-200 px-2.5 py-1">
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
        Neu (md)
      </span>
      <span class="inline-flex items-center text-base font-medium rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border border-blue-200 px-3 py-1.5">
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
        Neu (lg)
      </span>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different size variants for various use cases. Small badges omit icons for space efficiency.',
      },
    },
  },
};

// In Progress Status
export const InProgress = {
  args: {
    status: 'in_bearbeitung',
    size: 'md',
  },
};

// Completed Status
export const Completed = {
  args: {
    status: 'erledigt',
    size: 'md',
  },
};

// Rejected Status  
export const Rejected = {
  args: {
    status: 'abgelehnt',
    size: 'md',
  },
};

// Large Dashboard Badge
export const DashboardHeader = {
  args: {
    status: 'in_bearbeitung',
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large badge suitable for dashboard headers and detail views.',
      },
    },
  },
};

// Table Cell Badge
export const TableCell = {
  args: {
    status: 'neu',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact badge for table cells and dense layouts.',
      },
    },
  },
};

// Playground
export const Playground = {
  args: {
    status: 'neu',
    size: 'md',
    modifier: '',
  },
};