/**
 * @file
 * Storybook stories for Logo component
 * Responsive site logo with Tailwind CSS sizing
 */

export default {
  title: 'General/Logo',
  parameters: {
    docs: {
      description: {
        component: 'Responsive site logo component with configurable sizing using Tailwind CSS classes.',
      },
    },
  },
  argTypes: {
    site_logo: {
      control: 'text',
      description: 'Path to the site logo image file',
    },
    modifier: {
      control: 'text',
      description: 'Additional Tailwind CSS classes for sizing and styling',
    },
  },
};

// Default logo
export const Default = {
  args: {
    site_logo: '/themes/custom/adesso_cms_theme/assets/logo.svg',
    modifier: 'h-8',
  },
};

// Small logo
export const Small = {
  args: {
    ...Default.args,
    modifier: 'h-6',
  },
};

// Large logo
export const Large = {
  args: {
    ...Default.args,
    modifier: 'h-12',
  },
};

// Extra large logo
export const ExtraLarge = {
  args: {
    ...Default.args,
    modifier: 'h-16',
  },
};

// Responsive logo (different sizes at different breakpoints)
export const Responsive = {
  args: {
    ...Default.args,
    modifier: 'h-6 sm:h-8 lg:h-10',
  },
  parameters: {
    docs: {
      description: {
        story: 'Logo that scales responsively: h-6 on mobile, h-8 on small screens, h-10 on large screens.',
      },
    },
  },
};

// With max width constraint
export const WithMaxWidth = {
  args: {
    ...Default.args,
    modifier: 'h-8 max-w-48',
  },
  parameters: {
    docs: {
      description: {
        story: 'Logo with maximum width constraint to prevent it from becoming too wide.',
      },
    },
  },
};
