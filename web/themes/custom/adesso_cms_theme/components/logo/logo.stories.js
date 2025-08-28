// phpcs:ignoreFile

import Component from './logo.twig';

const meta = {
  title: 'General/Logo',
  component: Component,
  argTypes: {
    site_logo: {
      name: 'Site Logo',
      description: 'Path to the site logo image file',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    modifier: {
      name: 'Modifier',
      description: 'Additional Tailwind CSS classes for sizing and styling',
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
Site logo component with customizable sizing and styling options.

## TWIG Usage

\`\`\`twig
{# Default logo #}
{% include 'sdc:logo' with {
  site_logo: '/themes/custom/theme/logo.svg'
} %}

{# Large logo for header #}
{% include 'sdc:logo' with {
  site_logo: '/themes/custom/theme/logo.svg',
  modifier: 'h-12'
} %}

{# Small logo for footer #}
{% include 'sdc:logo' with {
  site_logo: '/themes/custom/theme/logo.svg',
  modifier: 'h-6'
} %}

{# Logo with custom styling #}
{% include 'sdc:logo' with {
  site_logo: '/themes/custom/theme/logo.svg',
  modifier: 'h-10 hover:opacity-80 transition-opacity'
} %}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;

// Default logo
export const Default = {
  parameters: {
    layout: 'centered',
  },
  args: {
    site_logo: 'https://logo.clearbit.com/adesso.de',
    modifier: 'h-8',
  },
};

// Common logo sizes
export const Sizes = {
  render: () => `
    <div class="flex items-center gap-8">
      <img src="https://logo.clearbit.com/adesso.de" alt="Small" class="h-6" />
      <img src="https://logo.clearbit.com/adesso.de" alt="Default" class="h-8" />
      <img src="https://logo.clearbit.com/adesso.de" alt="Large" class="h-12" />
      <img src="https://logo.clearbit.com/adesso.de" alt="Extra Large" class="h-16" />
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Common logo sizes for different contexts.',
      },
    },
  },
};

// Header logo (most common use case)
export const Header = {
  args: {
    site_logo: 'https://logo.clearbit.com/adesso.de',
    modifier: 'h-10',
  },
};

// Footer logo
export const Footer = {
  args: {
    site_logo: 'https://logo.clearbit.com/adesso.de',
    modifier: 'h-6',
  },
};

// Hero section logo
export const Hero = {
  args: {
    site_logo: 'https://logo.clearbit.com/adesso.de',
    modifier: 'h-16 lg:h-20',
  },
};

// Logo with hover effect
export const WithHover = {
  args: {
    site_logo: 'https://logo.clearbit.com/adesso.de',
    modifier: 'h-8 hover:opacity-80 transition-opacity duration-300',
  },
};

// Logo with grayscale effect
export const Grayscale = {
  args: {
    site_logo: 'https://logo.clearbit.com/adesso.de',
    modifier: 'h-8 grayscale hover:grayscale-0 transition-all duration-300',
  },
};

// Playground for testing all properties
export const Playground = {
  args: {
    site_logo: 'https://logo.clearbit.com/adesso.de',
    modifier: 'h-8',
  },
};
