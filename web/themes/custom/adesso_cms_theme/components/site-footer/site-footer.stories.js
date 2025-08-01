// phpcs:ignoreFile

import Component from './site-footer.twig';

const meta = {
  title: 'General/SiteFooter',
  component: Component,
  argTypes: {
    layout_variant: {
      name: 'Layout Variant',
      description: 'Footer layout variation',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    background_color: {
      name: 'Background Color',
      description: 'Footer background color',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    site_name: {
      name: 'Site Name',
      description: 'Name of the site',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    site_logo: {
      name: 'Site Logo',
      description: 'URL path to the site logo',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    show_logo: {
      name: 'Show Logo',
      description: 'Whether to display the site logo',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    tagline: {
      name: 'Tagline',
      description: 'Short description or tagline for the site',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    footer_links: {
      name: 'Footer Links',
      description: 'Array of footer navigation link groups',
      control: { type: 'object' },
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    social_links: {
      name: 'Social Links',
      description: 'Array of social media links',
      control: { type: 'object' },
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    newsletter_signup: {
      name: 'Newsletter Signup',
      description: 'Newsletter signup form configuration',
      control: { type: 'object' },
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    contact_info: {
      name: 'Contact Info',
      description: 'Contact information to display',
      control: { type: 'object' },
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Site footer component with flexible content areas for navigation, social links, contact info, and newsletter signup.

## TWIG Usage

\`\`\`twig
{# Basic footer with navigation #}
{% include 'sdc:site-footer' with {
  site_name: 'Your Company',
  site_logo: '/themes/custom/theme/logo.svg',
  show_logo: true,
  tagline: 'Building the future of web technology',
  footer_links: [
    {
      title: 'Company',
      links: [
        { url: '/about', title: 'About Us' },
        { url: '/careers', title: 'Careers' },
        { url: '/contact', title: 'Contact' }
      ]
    }
  ]
} %}

{# Complete footer with all sections #}
{% include 'sdc:site-footer' with {
  site_name: 'Your Company',
  show_logo: true,
  tagline: 'Your company tagline',
  footer_links: footer_navigation,
  social_links: [
    { url: 'https://twitter.com/company', title: 'Twitter', icon: 'twitter' },
    { url: 'https://linkedin.com/company', title: 'LinkedIn', icon: 'linkedin' }
  ],
  newsletter_signup: {
    title: 'Stay Updated',
    description: 'Subscribe to our newsletter'
  },
  contact_info: {
    address: '123 Main St, City, State 12345',
    phone: '+1 (555) 123-4567',
    email: 'contact@company.com'
  }
} %}

{# With custom background #}
{% include 'sdc:site-footer' with {
  background_color: 'bg-gray-900',
  site_name: site.name,
  footer_links: drupal_menu('footer')
} %}
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Default footer
export const Default = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    layout_variant: '',
    background_color: '',
    site_name: 'Your Company',
    site_logo: 'https://logo.clearbit.com/adesso.de',
    show_logo: true,
    tagline: 'Building innovative digital solutions for modern businesses',
    footer_links: [
      {
        title: 'Company',
        links: [
          { url: '/about', title: 'About Us' },
          { url: '/careers', title: 'Careers' },
          { url: '/contact', title: 'Contact' },
          { url: '/press', title: 'Press' },
        ],
      },
      {
        title: 'Services',
        links: [
          { url: '/services/web-development', title: 'Web Development' },
          { url: '/services/consulting', title: 'Consulting' },
          { url: '/services/cloud', title: 'Cloud Solutions' },
          { url: '/services/support', title: 'Support' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { url: '/blog', title: 'Blog' },
          { url: '/documentation', title: 'Documentation' },
          { url: '/case-studies', title: 'Case Studies' },
          { url: '/help', title: 'Help Center' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { url: '/privacy', title: 'Privacy Policy' },
          { url: '/terms', title: 'Terms of Service' },
          { url: '/cookies', title: 'Cookie Policy' },
          { url: '/security', title: 'Security' },
        ],
      },
    ],
    social_links: [
      { url: 'https://twitter.com/company', title: 'Twitter', icon: 'twitter' },
      { url: 'https://linkedin.com/company', title: 'LinkedIn', icon: 'linkedin' },
      { url: 'https://github.com/company', title: 'GitHub', icon: 'github' },
      { url: 'https://youtube.com/company', title: 'YouTube', icon: 'youtube' },
    ],
    newsletter_signup: {
      title: 'Stay Updated',
      description: 'Subscribe to our newsletter for the latest updates and insights.',
      url: '/newsletter/signup',
    },
    contact_info: {
      address: '123 Business Ave, Suite 100, City, State 12345',
      phone: '+1 (555) 123-4567',
      email: 'contact@yourcompany.com',
    },
  },
};

// Minimal footer
export const Minimal = {
  args: {
    site_name: 'Your Company',
    site_logo: 'https://logo.clearbit.com/adesso.de',
    show_logo: true,
    tagline: 'Simple and clean footer design',
    footer_links: [
      {
        title: 'Quick Links',
        links: [
          { url: '/about', title: 'About' },
          { url: '/contact', title: 'Contact' },
          { url: '/privacy', title: 'Privacy' },
          { url: '/terms', title: 'Terms' },
        ],
      },
    ],
    social_links: [
      { url: 'https://twitter.com/company', title: 'Twitter', icon: 'twitter' },
      { url: 'https://linkedin.com/company', title: 'LinkedIn', icon: 'linkedin' },
    ],
  },
};

// Dark theme footer
export const DarkTheme = {
  args: {
    background_color: 'bg-gray-900',
    site_name: 'Your Company',
    site_logo: 'https://logo.clearbit.com/adesso.de',
    show_logo: true,
    tagline: 'Dark theme footer with professional styling',
    footer_links: [
      {
        title: 'Product',
        links: [
          { url: '/features', title: 'Features' },
          { url: '/pricing', title: 'Pricing' },
          { url: '/integrations', title: 'Integrations' },
          { url: '/api', title: 'API' },
        ],
      },
      {
        title: 'Support',
        links: [
          { url: '/help', title: 'Help Center' },
          { url: '/docs', title: 'Documentation' },
          { url: '/community', title: 'Community' },
          { url: '/status', title: 'System Status' },
        ],
      },
    ],
    social_links: [
      { url: 'https://twitter.com/company', title: 'Twitter', icon: 'twitter' },
      { url: 'https://linkedin.com/company', title: 'LinkedIn', icon: 'linkedin' },
      { url: 'https://github.com/company', title: 'GitHub', icon: 'github' },
    ],
    contact_info: {
      email: 'support@yourcompany.com',
      phone: '+1 (555) 987-6543',
    },
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Newsletter focused
export const NewsletterFocus = {
  args: {
    site_name: 'Your Company',
    show_logo: false,
    tagline: 'Stay connected with our latest updates and exclusive content',
    footer_links: [
      {
        title: 'Follow Us',
        links: [
          { url: '/blog', title: 'Blog' },
          { url: '/newsletter', title: 'Newsletter Archive' },
          { url: '/events', title: 'Events' },
        ],
      },
    ],
    social_links: [
      { url: 'https://twitter.com/company', title: 'Twitter', icon: 'twitter' },
      { url: 'https://facebook.com/company', title: 'Facebook', icon: 'facebook' },
      { url: 'https://instagram.com/company', title: 'Instagram', icon: 'instagram' },
    ],
    newsletter_signup: {
      title: 'Subscribe to Our Newsletter',
      description: 'Get weekly insights, tips, and exclusive content delivered to your inbox.',
      url: '/newsletter/signup',
    },
  },
};

// Contact focused
export const ContactFocus = {
  args: {
    site_name: 'Your Company',
    site_logo: 'https://logo.clearbit.com/adesso.de',
    show_logo: true,
    tagline: 'Get in touch with our team',
    footer_links: [
      {
        title: 'Contact',
        links: [
          { url: '/contact/sales', title: 'Sales' },
          { url: '/contact/support', title: 'Support' },
          { url: '/contact/partnership', title: 'Partnerships' },
          { url: '/contact/press', title: 'Press Inquiries' },
        ],
      },
      {
        title: 'Locations',
        links: [
          { url: '/offices/new-york', title: 'New York' },
          { url: '/offices/london', title: 'London' },
          { url: '/offices/tokyo', title: 'Tokyo' },
        ],
      },
    ],
    contact_info: {
      address: '123 Business Ave, Suite 100, New York, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'hello@yourcompany.com',
      hours: 'Mon-Fri 9AM-6PM EST',
    },
  },
};

// Without logo
export const NoLogo = {
  args: {
    site_name: 'Your Company',
    show_logo: false,
    tagline: 'Clean footer design without logo',
    footer_links: [
      {
        title: 'Company',
        links: [
          { url: '/about', title: 'About Us' },
          { url: '/team', title: 'Our Team' },
          { url: '/careers', title: 'Careers' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { url: '/privacy', title: 'Privacy Policy' },
          { url: '/terms', title: 'Terms of Service' },
        ],
      },
    ],
    social_links: [
      { url: 'https://twitter.com/company', title: 'Twitter', icon: 'twitter' },
      { url: 'https://linkedin.com/company', title: 'LinkedIn', icon: 'linkedin' },
    ],
  },
};

// Playground for testing all properties
export const Playground = {
  args: {
    layout_variant: '',
    background_color: '',
    site_name: 'Test Company',
    site_logo: 'https://logo.clearbit.com/adesso.de',
    show_logo: true,
    tagline: 'Test tagline for the footer component',
    footer_links: [
      {
        title: 'Test Links',
        links: [
          { url: '#', title: 'Test Link 1' },
          { url: '#', title: 'Test Link 2' },
        ],
      },
    ],
    social_links: [
      { url: '#', title: 'Test Social', icon: 'twitter' },
    ],
    newsletter_signup: {
      title: 'Test Newsletter',
      description: 'Test description',
      url: '#',
    },
    contact_info: {
      email: 'test@example.com',
      phone: '555-123-4567',
    },
  },
};