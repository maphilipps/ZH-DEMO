/**
 * @file
 * Storybook stories for Logo component
 * Responsive site logo with Tailwind CSS sizing
 */

// Create a proper logo template function
const logoTemplate = (args) => {
  const {
    site_logo = '',
    site_name = 'Site',
    modifier = ''
  } = args;

  const altText = site_name ? `${site_name} logo` : 'Site logo';
  const classes = `block max-h-full w-auto ${modifier}`.trim();

  return `<img src="${site_logo}" class="${classes}" alt="${altText}" loading="lazy" />`;
};

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
  render: logoTemplate,
  args: {
    site_logo: '/themes/custom/adesso_cms_theme/assets/logo.svg',
    site_name: 'adesso CMS',
    modifier: 'h-8',
  },
};

// Small logo
export const Small = {
  render: logoTemplate,
  args: {
    ...Default.args,
    modifier: 'h-6',
  },
};

// Large logo
export const Large = {
  render: logoTemplate,
  args: {
    ...Default.args,
    modifier: 'h-12',
  },
};

// Extra large logo
export const ExtraLarge = {
  render: logoTemplate,
  args: {
    ...Default.args,
    modifier: 'h-16',
  },
};

// Responsive logo (different sizes at different breakpoints)
export const Responsive = {
  render: logoTemplate,
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
  render: logoTemplate,
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
