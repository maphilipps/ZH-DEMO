// phpcs:ignoreFile

import Component from './form-progress.twig';

const meta = {
  title: 'Municipal/Form Progress',
  component: Component,
  argTypes: {
    current_status: {
      name: 'Current Status',
      description: 'Current workflow status',
      control: { type: 'select' },
      options: ['neu', 'in_bearbeitung', 'erledigt', 'abgelehnt'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'neu' },
      },
    },
    show_labels: {
      name: 'Show Labels',
      description: 'Display stage labels below progress bar',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    compact: {
      name: 'Compact Mode',
      description: 'Smaller progress bar for mobile/dashboard',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
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
Form Progress component for visualizing Infrastructure Damage Report workflow progression.

## TWIG Usage

\`\`\`twig
{# Basic progress indicator #}
{% include 'sdc:form-progress' with {
  current_status: 'in_bearbeitung'
} %}

{# Compact version for dashboard tables #}
{% include 'sdc:form-progress' with {
  current_status: 'erledigt',
  compact: true,
  show_labels: false
} %}

{# With custom styling #}
{% include 'sdc:form-progress' with {
  current_status: 'neu',
  show_labels: true,
  modifier: 'mb-4'
} %}
\`\`\`

## Municipal Workflow Stages

The component visualizes the Swiss municipal workflow:
1. **Neu**: Initial submission received
2. **In Bearbeitung**: Under processing by municipal staff  
3. **Erledigt**: Completed and resolved
4. **Abgelehnt**: Rejected with explanation

The progress bar uses gradient colors and animations to provide clear visual feedback to municipal staff and citizens.
        `,
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;

// Default Progress
export const Default = {
  parameters: {
    layout: 'centered',
  },
  args: {
    current_status: 'neu',
    show_labels: true,
    compact: false,
  },
};

// All Progress Stages
export const AllStages = {
  render: () => `
    <div class="space-y-8 max-w-2xl">
      <div>
        <h3 class="text-lg font-semibold mb-4 text-gray-800">Neu (33%)</h3>
        <div class="form-progress">
          <div class="relative mb-4">
            <div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500" style="width: 33%"></div>
            </div>
            <div class="absolute top-0 flex justify-between w-full -mt-1">
              <div class="w-6 h-6 rounded-full border-2 bg-blue-500 border-blue-500 text-white flex items-center justify-center animate-pulse">
                <span class="text-xs font-bold">1</span>
              </div>
              <div class="w-6 h-6 rounded-full border-2 bg-white border-gray-300 text-gray-400 flex items-center justify-center">
                <span class="text-xs font-bold">2</span>
              </div>
              <div class="w-6 h-6 rounded-full border-2 bg-white border-gray-300 text-gray-400 flex items-center justify-center">
                <span class="text-xs font-bold">3</span>
              </div>
            </div>
          </div>
          <div class="flex justify-between text-sm">
            <div class="flex-1 text-center">
              <div class="font-medium text-blue-600">Neu</div>
              <div class="text-xs text-gray-500 mt-1">Meldung eingegangen</div>
            </div>
            <div class="flex-1 text-center ml-2">
              <div class="font-medium text-gray-500">In Bearbeitung</div>
              <div class="text-xs text-gray-500 mt-1">Wird bearbeitet</div>
            </div>
            <div class="flex-1 text-center ml-2">
              <div class="font-medium text-gray-500">Erledigt</div>
              <div class="text-xs text-gray-500 mt-1">Abgeschlossen</div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4 text-gray-800">In Bearbeitung (67%)</h3>
        <div class="form-progress">
          <div class="relative mb-4">
            <div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500" style="width: 67%"></div>
            </div>
            <div class="absolute top-0 flex justify-between w-full -mt-1">
              <div class="w-6 h-6 rounded-full border-2 bg-green-500 border-green-500 text-white flex items-center justify-center">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div class="w-6 h-6 rounded-full border-2 bg-blue-500 border-blue-500 text-white flex items-center justify-center animate-pulse">
                <span class="text-xs font-bold">2</span>
              </div>
              <div class="w-6 h-6 rounded-full border-2 bg-white border-gray-300 text-gray-400 flex items-center justify-center">
                <span class="text-xs font-bold">3</span>
              </div>
            </div>
          </div>
          <div class="flex justify-between text-sm">
            <div class="flex-1 text-center">
              <div class="font-medium text-green-600">Neu</div>
              <div class="text-xs text-gray-500 mt-1">Meldung eingegangen</div>
            </div>
            <div class="flex-1 text-center ml-2">
              <div class="font-medium text-blue-600">In Bearbeitung</div>
              <div class="text-xs text-gray-500 mt-1">Wird bearbeitet</div>
            </div>
            <div class="flex-1 text-center ml-2">
              <div class="font-medium text-gray-500">Erledigt</div>
              <div class="text-xs text-gray-500 mt-1">Abgeschlossen</div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-4 text-gray-800">Erledigt (100%)</h3>
        <div class="form-progress">
          <div class="relative mb-4">
            <div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500" style="width: 100%"></div>
            </div>
            <div class="absolute top-0 flex justify-between w-full -mt-1">
              <div class="w-6 h-6 rounded-full border-2 bg-green-500 border-green-500 text-white flex items-center justify-center">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div class="w-6 h-6 rounded-full border-2 bg-green-500 border-green-500 text-white flex items-center justify-center">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div class="w-6 h-6 rounded-full border-2 bg-green-500 border-green-500 text-white flex items-center justify-center">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="flex justify-between text-sm">
            <div class="flex-1 text-center">
              <div class="font-medium text-green-600">Neu</div>
              <div class="text-xs text-gray-500 mt-1">Meldung eingegangen</div>
            </div>
            <div class="flex-1 text-center ml-2">
              <div class="font-medium text-green-600">In Bearbeitung</div>
              <div class="text-xs text-gray-500 mt-1">Wird bearbeitet</div>
            </div>
            <div class="flex-1 text-center ml-2">
              <div class="font-medium text-green-600">Erledigt</div>
              <div class="text-xs text-gray-500 mt-1">Abgeschlossen</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Visual progression through all workflow stages with gradient progress bar and checkmark indicators.',
      },
    },
  },
};

// Rejected Status
export const RejectedStatus = {
  args: {
    current_status: 'abgelehnt',
    show_labels: true,
    compact: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Rejected status shows special red styling and explanatory message.',
      },
    },
  },
};

// Compact Version
export const CompactMode = {
  render: () => `
    <div class="space-y-4">
      <div class="form-progress form-progress--compact">
        <div class="relative mb-2">
          <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500" style="width: 67%"></div>
          </div>
          <div class="absolute top-0 flex justify-between w-full -mt-0.5">
            <div class="w-4 h-4 rounded-full border-2 bg-green-500 border-green-500 text-white flex items-center justify-center">
              <span class="text-xs font-bold">1</span>
            </div>
            <div class="w-4 h-4 rounded-full border-2 bg-blue-500 border-blue-500 text-white flex items-center justify-center animate-pulse">
              <span class="text-xs font-bold">2</span>
            </div>
            <div class="w-4 h-4 rounded-full border-2 bg-white border-gray-300 text-gray-400 flex items-center justify-center">
              <span class="text-xs font-bold">3</span>
            </div>
          </div>
        </div>
        <div class="flex justify-between text-xs">
          <div class="flex-1 text-center">
            <div class="font-medium text-green-600">Neu</div>
          </div>
          <div class="flex-1 text-center ml-2">
            <div class="font-medium text-blue-600">In Bearbeitung</div>
          </div>
          <div class="flex-1 text-center ml-2">
            <div class="font-medium text-gray-500">Erledigt</div>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Compact version for dashboard tables and mobile views with smaller indicators.',
      },
    },
  },
};

// Without Labels
export const NoLabels = {
  args: {
    current_status: 'in_bearbeitung',
    show_labels: false,
    compact: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar without labels for minimal layouts.',
      },
    },
  },
};

// New Status
export const NewSubmission = {
  args: {
    current_status: 'neu',
    show_labels: true,
    compact: false,
  },
};

// In Progress Status
export const InProgress = {
  args: {
    current_status: 'in_bearbeitung',
    show_labels: true,
    compact: false,
  },
};

// Completed Status
export const Completed = {
  args: {
    current_status: 'erledigt',
    show_labels: true,
    compact: false,
  },
};

// Playground
export const Playground = {
  args: {
    current_status: 'neu',
    show_labels: true,
    compact: false,
    modifier: '',
  },
};
