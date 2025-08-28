// phpcs:ignoreFile

import Component from './button.twig';

const meta = {
  title: 'General/Button',
  component: Component,
  argTypes: {
    url: {
      name: 'URL',
      description: 'The URL the button links to',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    text: {
      name: 'Text',
      description: 'The text inside the button',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    icon: {
      name: 'Icon',
      description: 'The icon to display inside the button',
      control: { type: 'select' },
      options: ['', 'arrow-right', 'arrow-left', 'download', 'upload', 'external-link', 'mail', 'phone', 'user', 'settings', 'search', 'plus', 'minus', 'x', 'check', 'info', 'alert-triangle', 'heart', 'star', 'home', 'menu'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    variant: {
      name: 'Variant',
      description: 'The button variant',
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      name: 'Size',
      description: 'The button size',
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'default' },
      },
    },
    type: {
      name: 'Type',
      description: 'The button type attribute (for form buttons)',
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'button' },
      },
    },
    modifier: {
      name: 'Modifier',
      description: 'Additional CSS classes to apply to the button',
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
Interactive button component with multiple variants, sizes, and icon support.

## TWIG Usage

\`\`\`twig
{# Primary action button #}
{% include 'sdc:button' with {
  text: 'Get Started',
  variant: 'default'
} %}

{# Secondary button #}
{% include 'sdc:button' with {
  text: 'Learn More',
  variant: 'secondary'
} %}

{# Button with icon #}
{% include 'sdc:button' with {
  text: 'Download Report',
  icon: 'download',
  variant: 'outline'
} %}

{# Link button #}
{% include 'sdc:button' with {
  text: 'Visit Our Blog',
  url: '/blog',
  variant: 'link'
} %}

{# Icon-only button #}
{% include 'sdc:button' with {
  icon: 'settings',
  variant: 'ghost',
  size: 'icon'
} %}
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Default button
export const Default = {
  parameters: {
    layout: 'centered',
  },
  args: {
    text: 'Button',
    variant: 'default',
    size: 'default',
  },
};

// All variants - showing enum options from YAML
export const Variants = {
  render: () => `
    <div class="flex flex-wrap gap-3">
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-10 px-4 py-2">default</button>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-slate-50 hover:bg-red-500/90 h-10 px-4 py-2">destructive</button>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 h-10 px-4 py-2">outline</button>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-100 text-slate-900 hover:bg-slate-100/80 h-10 px-4 py-2">secondary</button>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 hover:text-slate-900 h-10 px-4 py-2">ghost</button>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-slate-900 underline-offset-4 hover:underline h-10 px-4 py-2">link</button>
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

// All sizes - showing enum options from YAML
export const Sizes = {
  render: () => `
    <div class="flex items-center gap-3">
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-9 rounded-md px-3">sm</button>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-10 px-4 py-2">default</button>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-11 rounded-md px-8">lg</button>
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-10 w-10">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m6 2l-1.5 1.5M20 12h-2m-2 6l-1.5-1.5M12 20v-2m-6-2l-1.5-1.5M4 12h2m2-6l1.5 1.5"></path></svg>
      </button>
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

// Call-to-action button (most common use case)
export const CallToAction = {
  args: {
    text: 'Get Started Today',
    variant: 'default',
    size: 'lg',
  },
};

// Button with icon
export const WithIcon = {
  args: {
    text: 'Download PDF',
    icon: 'download',
    variant: 'outline',
  },
};

// Destructive action
export const Delete = {
  args: {
    text: 'Delete Item',
    variant: 'destructive',
  },
};

// Link button
export const AsLink = {
  args: {
    text: 'Read Documentation',
    url: '/docs',
    variant: 'link',
  },
};

// Icon-only button
export const IconOnly = {
  args: {
    icon: 'settings',
    variant: 'ghost',
    size: 'icon',
  },
};

// Small action button
export const SmallAction = {
  args: {
    text: 'Edit',
    variant: 'secondary',
    size: 'sm',
  },
};

// Form Submit Button
export const SubmitButton = {
  args: {
    text: 'Submit Form',
    variant: 'default',
    size: 'lg',
    type: 'submit',
  },
};

// Full Width Button (using modifier)
export const FullWidth = {
  args: {
    text: 'Full Width Action',
    variant: 'default',
    size: 'default',
    modifier: 'w-full',
  },
};

// Playground for testing all properties
export const Playground = {
  args: {
    text: 'Button Text',
    variant: 'default',
    size: 'default',
    icon: '',
    url: '',
    type: 'button',
    modifier: '',
  },
};

