/**
 * @file
 * Storybook stories for Site Footer component
 * Comprehensive footer with Flowbite layout patterns and responsive design
 */

export default {
  title: 'General/Site Footer',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive site footer with multiple layout variants, newsletter signup, social media links, and responsive design.',
      },
    },
  },
  argTypes: {
    layout_variant: {
      control: { type: 'select' },
      options: ['default', 'large', 'minimal', 'corporate'],
      description: 'Footer layout variant',
    },
    background_color: {
      control: { type: 'select' },
      options: ['default', 'dark', 'primary'],
      description: 'Background color theme',
    },
    site_name: {
      control: 'text',
      description: 'Name of the site',
    },
    site_logo: {
      control: 'text',
      description: 'URL path to the site logo',
    },
    show_logo: {
      control: 'boolean',
      description: 'Whether to display the site logo',
    },
    tagline: {
      control: 'text',
      description: 'Short description or tagline for the site',
    },
    footer_links: {
      control: 'object',
      description: 'Array of footer navigation link groups',
    },
    social_links: {
      control: 'object',
      description: 'Array of social media links',
    },
    newsletter_signup: {
      control: 'object',
      description: 'Newsletter signup form configuration',
    },
    contact_info: {
      control: 'object',
      description: 'Contact information to display',
    },
  },
};

// Mock data
const mockFooterLinks = [
  {
    group_title: 'Company',
    links: [
      { title: 'About', url: '/about' },
      { title: 'Careers', url: '/careers' },
      { title: 'Brand Center', url: '/brand' },
      { title: 'Blog', url: '/blog' },
    ],
  },
  {
    group_title: 'Help Center',
    links: [
      { title: 'Discord Server', url: '#' },
      { title: 'Twitter', url: '#' },
      { title: 'Facebook', url: '#' },
      { title: 'Contact Us', url: '/contact' },
    ],
  },
  {
    group_title: 'Legal',
    links: [
      { title: 'Privacy Policy', url: '/privacy' },
      { title: 'Licensing', url: '/licensing' },
      { title: 'Terms & Conditions', url: '/terms' },
    ],
  },
];

const mockSocialLinks = [
  {
    title: 'Facebook',
    url: 'https://facebook.com',
    platform: 'facebook',
    icon: 'fab fa-facebook',
  },
  {
    title: 'Twitter',
    url: 'https://twitter.com',
    platform: 'twitter',
    icon: 'fab fa-twitter',
  },
  {
    title: 'Instagram',
    url: 'https://instagram.com',
    platform: 'instagram',
    icon: 'fab fa-instagram',
  },
  {
    title: 'LinkedIn',
    url: 'https://linkedin.com',
    platform: 'linkedin',
    icon: 'fab fa-linkedin',
  },
];

const mockContactInfo = {
  address: '123 Tech Street, Innovation City, IC 12345',
  phone: '+1 (555) 123-4567',
  email: 'hello@example.com',
};

// Default footer
export const Default = {
  args: {
    site_name: 'adesso CMS',
    site_logo: '/themes/custom/adesso_cms_theme/assets/logo.svg',
    show_logo: true,
    tagline: 'Building the future of content management with modern web technologies.',
    footer_links: mockFooterLinks,
    social_links: mockSocialLinks,
    layout_variant: 'default',
    background_color: 'default',
    current_year: new Date().getFullYear(),
  },
};

// Large layout with newsletter
export const Large = {
  args: {
    ...Default.args,
    layout_variant: 'large',
    newsletter_signup: {
      enabled: true,
      title: 'Subscribe to our newsletter',
      description: 'The latest news, articles, and resources, sent to your inbox weekly.',
      placeholder: 'Enter your email address',
      button_text: 'Subscribe',
    },
  },
};

// Minimal layout
export const Minimal = {
  args: {
    ...Default.args,
    layout_variant: 'minimal',
    footer_links: [
      {
        group_title: 'Quick Links',
        links: [
          { title: 'Home', url: '/' },
          { title: 'About', url: '/about' },
          { title: 'Services', url: '/services' },
          { title: 'Contact', url: '/contact' },
          { title: 'Privacy', url: '/privacy' },
        ],
      },
    ],
  },
};

// Corporate layout
export const Corporate = {
  args: {
    ...Default.args,
    layout_variant: 'corporate',
    contact_info: mockContactInfo,
  },
};

// Dark background
export const Dark = {
  args: {
    ...Default.args,
    layout_variant: 'large',
    background_color: 'dark',
    newsletter_signup: {
      enabled: true,
      title: 'Subscribe to our newsletter',
      description: 'The latest news, articles, and resources, sent to your inbox weekly.',
      placeholder: 'Enter your email address',
      button_text: 'Subscribe',
    },
  },
};

// Primary background
export const Primary = {
  args: {
    ...Default.args,
    layout_variant: 'large',
    background_color: 'primary',
    newsletter_signup: {
      enabled: true,
      title: 'Subscribe to our newsletter',
      description: 'The latest news, articles, and resources, sent to your inbox weekly.',
      placeholder: 'Enter your email address',
      button_text: 'Subscribe',
    },
  },
};

// Without logo
export const WithoutLogo = {
  args: {
    ...Default.args,
    show_logo: false,
  },
};

// Mobile viewport
export const Mobile = {
  args: {
    ...Default.args,
    layout_variant: 'large',
    newsletter_signup: {
      enabled: true,
      title: 'Subscribe to our newsletter',
      description: 'The latest news, articles, and resources, sent to your inbox weekly.',
      placeholder: 'Enter your email address',
      button_text: 'Subscribe',
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Footer displayed on mobile viewport with responsive layout.',
      },
    },
  },
};

// Tablet viewport
export const Tablet = {
  args: {
    ...Default.args,
    layout_variant: 'corporate',
    contact_info: mockContactInfo,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Footer displayed on tablet viewport.',
      },
    },
  },
};

// With custom copyright
export const CustomCopyright = {
  args: {
    ...Default.args,
    copyright_text: '© 2024 adesso SE. Made with ❤️ in Germany.',
  },
};
