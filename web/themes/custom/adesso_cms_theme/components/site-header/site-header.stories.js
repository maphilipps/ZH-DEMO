// phpcs:ignoreFile

import Component from './site-header.twig';

const meta = {
  title: 'General/SiteHeader',
  component: Component,
  argTypes: {
    background_color: {
      name: 'Background Color',
      description: 'Header background color class',
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
        defaultValue: { summary: 'true' },
      },
    },
    show_site_name: {
      name: 'Show Site Name',
      description: 'Whether to display the site name',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    show_search: {
      name: 'Show Search',
      description: 'Whether to display the search dropdown',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    search_placeholder: {
      name: 'Search Placeholder',
      description: 'Placeholder text for search input',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Search...' },
      },
    },
    search_action_url: {
      name: 'Search Action URL',
      description: 'URL for search form submission',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '/search' },
      },
    },
    show_login_button: {
      name: 'Show Login Button',
      description: 'Whether to display the login button',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    show_register_button: {
      name: 'Show Register Button',
      description: 'Whether to display the register button',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    enable_mega_menu: {
      name: 'Enable Mega Menu',
      description: 'Enable mega menu functionality for navigation items with submenus',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    menu_items: {
      name: 'Menu Items',
      description: 'Array of menu items for navigation',
      control: { type: 'object' },
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Site header component with flexible navigation, search, and user authentication options.

## TWIG Usage

\`\`\`twig
{# Basic header with navigation #}
{% include 'sdc:site-header' with {
  show_logo: true,
  show_site_name: false,
  show_search: true,
  menu_items: [
    {
      title: 'Home',
      url: '/',
      in_active_trail: true
    },
    {
      title: 'About',
      url: '/about'
    },
    {
      title: 'Services',
      url: '/services',
      is_expanded: true,
      below: [
        { title: 'Web Development', url: '/services/web' },
        { title: 'Consulting', url: '/services/consulting' }
      ]
    }
  ]
} %}

{# Header with search and auth buttons #}
{% include 'sdc:site-header' with {
  show_logo: true,
  show_search: true,
  search_placeholder: 'Search our site...',
  search_action_url: '/search',
  show_login_button: true,
  show_register_button: true,
  menu_items: main_navigation
} %}

{# Mega menu enabled #}  
{% include 'sdc:site-header' with {
  enable_mega_menu: true,
  menu_items: drupal_menu('main'),
  background_color: 'bg-white shadow-sm'
} %}

{# Dark theme header #}
{% include 'sdc:site-header' with {
  background_color: 'bg-gray-900',
  show_logo: true,
  menu_items: menu_links
} %}
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Default header
export const Default = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    background_color: '',
    show_logo: true,
    show_site_name: false,
    show_search: true,
    search_placeholder: 'Search...',
    search_action_url: '/search',
    show_login_button: true,
    show_register_button: true,
    enable_mega_menu: false,
    menu_items: [
      {
        title: 'Home',
        url: '/',
        in_active_trail: true,
        is_expanded: false,
        below: [],
      },
      {
        title: 'About',
        url: '/about',
        in_active_trail: false,
        is_expanded: false,
        below: [],
      },
      {
        title: 'Services',
        url: '/services',
        in_active_trail: false,
        is_expanded: true,
        below: [
          {
            title: 'Web Development',
            url: '/services/web-development',
            in_active_trail: false,
          },
          {
            title: 'Consulting',
            url: '/services/consulting',
            in_active_trail: false,
          },
          {
            title: 'Support',
            url: '/services/support',
            in_active_trail: false,
          },
        ],
      },
      {
        title: 'Products',
        url: '/products',
        in_active_trail: false,
        is_expanded: true,
        below: [
          {
            title: 'Platform',
            url: '/products/platform',
            in_active_trail: false,
          },
          {
            title: 'API',
            url: '/products/api',
            in_active_trail: false,
          },
          {
            title: 'Integrations',
            url: '/products/integrations',
            in_active_trail: false,
          },
        ],
      },
      {
        title: 'Contact',
        url: '/contact',
        in_active_trail: false,
        is_expanded: false,
        below: [],
      },
    ],
  },
};

// Minimal header
export const Minimal = {
  args: {
    show_logo: true,
    show_site_name: false,
    show_search: false,
    show_login_button: false,
    show_register_button: false,
    enable_mega_menu: false,
    menu_items: [
      {
        title: 'Home',
        url: '/',
        in_active_trail: true,
        is_expanded: false,
        below: [],
      },
      {
        title: 'About',
        url: '/about',
        in_active_trail: false,
        is_expanded: false,
        below: [],
      },
      {
        title: 'Contact',
        url: '/contact',
        in_active_trail: false,
        is_expanded: false,
        below: [],
      },
    ],
  },
};

// Dark theme header
export const DarkTheme = {
  args: {
    background_color: 'bg-gray-900',
    show_logo: true,
    show_site_name: false,
    show_search: true,
    search_placeholder: 'Search...',
    show_login_button: true,
    show_register_button: true,
    enable_mega_menu: false,
    menu_items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        in_active_trail: true,
        is_expanded: false,
        below: [],
      },
      {
        title: 'Features',
        url: '/features',
        in_active_trail: false,
        is_expanded: true,
        below: [
          {
            title: 'Analytics',
            url: '/features/analytics',
            in_active_trail: false,
          },
          {
            title: 'Automation',
            url: '/features/automation',
            in_active_trail: false,
          },
          {
            title: 'Reporting',
            url: '/features/reporting',
            in_active_trail: false,
          },
        ],
      },
      {
        title: 'Pricing',
        url: '/pricing',
        in_active_trail: false,
        is_expanded: false,
        below: [],
      },
    ],
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Mega menu enabled
export const MegaMenu = {
  args: {
    show_logo: true,
    show_search: true,
    show_login_button: true,
    show_register_button: false,
    enable_mega_menu: true,
    menu_items: [
      {
        title: 'Products',
        url: '/products',
        in_active_trail: false,
        is_expanded: true,
        below: [
          {
            title: 'CMS Platform',
            url: '/products/cms',
            in_active_trail: false,
          },
          {
            title: 'E-commerce Suite',
            url: '/products/ecommerce',
            in_active_trail: false,
          },
          {
            title: 'Analytics Dashboard',
            url: '/products/analytics',
            in_active_trail: false,
          },
          {
            title: 'Marketing Tools',
            url: '/products/marketing',
            in_active_trail: false,
          },
          {
            title: 'API Gateway',
            url: '/products/api',
            in_active_trail: false,
          },
        ],
      },
      {
        title: 'Solutions',
        url: '/solutions',
        in_active_trail: false,
        is_expanded: true,
        below: [
          {
            title: 'Enterprise',
            url: '/solutions/enterprise',
            in_active_trail: false,
          },
          {
            title: 'Small Business',
            url: '/solutions/small-business',
            in_active_trail: false,
          },
          {
            title: 'Agencies',
            url: '/solutions/agencies',
            in_active_trail: false,
          },
          {
            title: 'Developers',
            url: '/solutions/developers',
            in_active_trail: false,
          },
        ],
      },
      {
        title: 'Resources',
        url: '/resources',
        in_active_trail: false,
        is_expanded: true,
        below: [
          {
            title: 'Documentation',
            url: '/docs',
            in_active_trail: false,
          },
          {
            title: 'API Reference',
            url: '/api-docs',
            in_active_trail: false,
          },
          {
            title: 'Tutorials',
            url: '/tutorials',
            in_active_trail: false,
          },
          {
            title: 'Community',
            url: '/community',
            in_active_trail: false,
          },
        ],
      },
    ],
  },
};

// With site name
export const WithSiteName = {
  args: {
    show_logo: true,
    show_site_name: true,
    show_search: true,
    show_login_button: false,
    show_register_button: false,
    menu_items: [
      {
        title: 'Features',
        url: '/features',
        in_active_trail: false,
        is_expanded: false,
        below: [],
      },
      {
        title: 'Pricing',
        url: '/pricing',
        in_active_trail: false,
        is_expanded: false,
        below: [],
      },
      {
        title: 'Blog',
        url: '/blog',
        in_active_trail: false,
        is_expanded: false,
        below: [],
      },
    ],
  },
};

// Search focused
export const SearchFocused = {
  args: {
    show_logo: true,
    show_site_name: false,
    show_search: true,
    search_placeholder: 'Search products, docs, tutorials...',
    search_action_url: '/search',
    show_login_button: true,
    show_register_button: false,
    menu_items: [
      {
        title: 'Products',
        url: '/products',
        in_active_trail: false,
        is_expanded: false,
        below: [],
      },
      {
        title: 'Documentation',
        url: '/docs',
        in_active_trail: false,
        is_expanded: false,
        below: [],
      },
      {
        title: 'Support',
        url: '/support',
        in_active_trail: false,
        is_expanded: false,
        below: [],
      },
    ],
  },
};

// Authentication focused
export const AuthFocused = {
  args: {
    show_logo: true,
    show_site_name: false,
    show_search: false,
    show_login_button: true,
    show_register_button: true,
    menu_items: [
      {
        title: 'Features',
        url: '/features',
        in_active_trail: false,
        is_expanded: false,
        below: [],
      },
      {
        title: 'Pricing',
        url: '/pricing',
        in_active_trail: false,
        is_expanded: false,
        below: [],
      },
      {
        title: 'Enterprise',
        url: '/enterprise',
        in_active_trail: false,
        is_expanded: false,
        below: [],
      },
    ],
  },
};

// Playground for testing all properties
export const Playground = {
  args: {
    background_color: '',
    show_logo: true,
    show_site_name: false,
    show_search: true,
    search_placeholder: 'Search...',
    search_action_url: '/search',
    show_login_button: true,
    show_register_button: true,
    enable_mega_menu: false,
    menu_items: [
      {
        title: 'Test Menu',
        url: '/test',
        in_active_trail: false,
        is_expanded: true,
        below: [
          {
            title: 'Sub Item 1',
            url: '/test/sub1',
            in_active_trail: false,
          },
          {
            title: 'Sub Item 2',
            url: '/test/sub2',
            in_active_trail: false,
          },
        ],
      },
    ],
  },
};