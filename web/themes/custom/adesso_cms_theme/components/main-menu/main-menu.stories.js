// phpcs:ignoreFile

import Component from './main-menu.twig';

const meta = {
  title: 'Navigation/MainMenuSave',
  component: Component,
  decorators: [
    (Story) => {
      // Add custom CSS for theme-specific classes first
      if (typeof document !== 'undefined') {
        const existingStyle = document.getElementById('main-menu-theme-styles');
        if (!existingStyle) {
          const style = document.createElement('style');
          style.id = 'main-menu-theme-styles';
          style.textContent = `
            .bg-body-bg { background-color: #ffffff; }
            .text-primary { color: #3b82f6; }
            .bg-primary { background-color: #3b82f6; }
            .text-body { color: #1f2937; }
            .text-body-bg { color: #ffffff; }
            .bg-tertiary { background-color: #f8fafc; }
            .hover\\:text-primary:hover { color: #3b82f6; }
            .hover\\:bg-primary:hover { background-color: #3b82f6; }
            .hover\\:text-body-bg:hover { color: #ffffff; }
            .border-body { border-color: #e5e7eb; }
            [x-cloak] { display: none !important; }
          `;
          document.head.appendChild(style);
        }
      }
      
      // Load Alpine.js and initialize
      if (typeof window !== 'undefined') {
        if (!window.Alpine) {
          return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js';
            script.defer = true;
            script.onload = () => {
              // Wait a bit for Alpine to fully initialize
              setTimeout(() => {
                resolve(Story());
              }, 100);
            };
            document.head.appendChild(script);
          });
        } else {
          // Alpine is already loaded
          return Story();
        }
      }
      
      return Story();
    },
  ],
  argTypes: {
    nested: {
      name: 'Menu Items',
      description: 'Hierarchical menu structure with nested children',
      control: { type: 'object' },
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },
    selected__header_template: {
      name: 'Header Template Style',
      description: 'Header template style identifier',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    account_menu: {
      name: 'Account Menu',
      description: 'Account menu items for mobile display',
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
Advanced navigation menu component with Alpine.js interactivity, mobile-responsive design, and nested submenu support.

## TWIG Usage

\`\`\`twig
{# Basic navigation menu #}
{% include 'sdc:main_menu_save' with {
  nested: [
    {
      title: 'Home',
      url: '/',
      target: '_self'
    },
    {
      title: 'About',
      url: '/about',
      target: '_self'
    },
    {
      title: 'Contact',
      url: '/contact',
      target: '_self'
    }
  ]
} %}

{# Multi-level navigation with submenus #}
{% include 'sdc:main_menu_save' with {
  nested: [
    {
      title: 'Products',
      url: '/products',
      target: '_self',
      children: [
        {
          title: 'Web Development',
          url: '/products/web',
          target: '_self'
        },
        {
          title: 'Mobile Apps',
          url: '/products/mobile',
          target: '_self',
          children: [
            {
              title: 'iOS Apps',
              url: '/products/mobile/ios',
              target: '_self'
            },
            {
              title: 'Android Apps',
              url: '/products/mobile/android',
              target: '_self'
            }
          ]
        }
      ]
    },
    {
      title: 'Services',
      url: '/services',
      target: '_self',
      children: [
        {
          title: 'Consulting',
          url: '/services/consulting',
          target: '_self'
        },
        {
          title: 'Support',
          url: '/services/support',
          target: '_self'
        }
      ]
    }
  ]
} %}

{# Navigation with external links #}
{% include 'sdc:main_menu_save' with {
  nested: [
    {
      title: 'Home',
      url: '/',
      target: '_self'
    },
    {
      title: 'Documentation',
      url: 'https://docs.example.com',
      target: '_blank'
    },
    {
      title: 'Community',
      url: 'https://forum.example.com',
      target: '_blank'
    }
  ]
} %}

{# Navigation with no-link items (dropdown only) #}
{% include 'sdc:main_menu_save' with {
  nested: [
    {
      title: 'Resources',
      url: '<nolink>',
      target: '_self',
      children: [
        {
          title: 'Blog',
          url: '/blog',
          target: '_self'
        },
        {
          title: 'Case Studies',
          url: '/case-studies',
          target: '_self'
        }
      ]
    }
  ]
} %}

{# With account menu for mobile #}
{% include 'sdc:main_menu_save' with {
  nested: main_navigation_items,
  selected__header_template: 'style2',
  account_menu: [
    {
      title: 'Login',
      url: '/user/login',
      target: '_self'
    },
    {
      title: 'Register',
      url: '/user/register',
      target: '_self'
    }
  ]
} %}

{# With Drupal menu integration #}
{% include 'sdc:main_menu_save' with {
  nested: drupal_menu('main')
} %}
\`\`\`

## Features
- **Alpine.js Interactivity**: Smooth hover and click interactions
- **Mobile-First Design**: Responsive layout with hamburger menu
- **Nested Submenus**: Unlimited nesting levels supported
- **Accessibility**: ARIA attributes and keyboard navigation
- **External Links**: Support for _blank and _self targets
- **No-Link Items**: Dropdown-only navigation items

## Item Properties
- **title**: Menu item display text
- **url**: Link destination URL (use '<nolink>' for dropdown-only items)
- **target**: Link target (_self, _blank)
- **children**: Array of nested menu items (recursive structure)
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Corporate website navigation
const corporateNavigation = [
  {
    title: 'Home',
    url: '/',
    target: '_self',
  },
  {
    title: 'About Us',
    url: '/about',
    target: '_self',
    children: [
      {
        title: 'Our Story',
        url: '/about/story',
        target: '_self',
      },
      {
        title: 'Leadership Team',
        url: '/about/team',
        target: '_self',
      },
      {
        title: 'Careers',
        url: '/about/careers',
        target: '_self',
      },
      {
        title: 'Company News',
        url: '/about/news',
        target: '_self',
      },
    ],
  },
  {
    title: 'Services',
    url: '/services',
    target: '_self',
    children: [
      {
        title: 'Web Development',
        url: '/services/web',
        target: '_self',
        children: [
          {
            title: 'Frontend Development',
            url: '/services/web/frontend',
            target: '_self',
          },
          {
            title: 'Backend Development',
            url: '/services/web/backend',
            target: '_self',
          },
          {
            title: 'Full-Stack Solutions',
            url: '/services/web/fullstack',
            target: '_self',
          },
        ],
      },
      {
        title: 'Mobile Apps',
        url: '/services/mobile',
        target: '_self',
        children: [
          {
            title: 'iOS Development',
            url: '/services/mobile/ios',
            target: '_self',
          },
          {
            title: 'Android Development',
            url: '/services/mobile/android',
            target: '_self',
          },
          {
            title: 'Cross-Platform',
            url: '/services/mobile/cross-platform',
            target: '_self',
          },
        ],
      },
      {
        title: 'Consulting',
        url: '/services/consulting',
        target: '_self',
      },
      {
        title: 'Digital Marketing',
        url: '/services/marketing',
        target: '_self',
      },
    ],
  },
  {
    title: 'Portfolio',
    url: '/portfolio',
    target: '_self',
  },
  {
    title: 'Contact',
    url: '/contact',
    target: '_self',
  },
];

// E-commerce navigation
const ecommerceNavigation = [
  {
    title: 'Shop',
    url: '/shop',
    target: '_self',
    children: [
      {
        title: 'New Arrivals',
        url: '/shop/new',
        target: '_self',
      },
      {
        title: 'Categories',
        url: '<nolink>',
        target: '_self',
        children: [
          {
            title: 'Electronics',
            url: '/shop/electronics',
            target: '_self',
          },
          {
            title: 'Clothing',
            url: '/shop/clothing',
            target: '_self',
          },
          {
            title: 'Home & Garden',
            url: '/shop/home',
            target: '_self',
          },
          {
            title: 'Sports',
            url: '/shop/sports',
            target: '_self',
          },
        ],
      },
      {
        title: 'Sale',
        url: '/shop/sale',
        target: '_self',
      },
    ],
  },
  {
    title: 'Brands',
    url: '/brands',
    target: '_self',
    children: [
      {
        title: 'Premium Brands',
        url: '/brands/premium',
        target: '_self',
      },
      {
        title: 'Local Brands',
        url: '/brands/local',
        target: '_self',
      },
      {
        title: 'Sustainable',
        url: '/brands/sustainable',
        target: '_self',
      },
    ],
  },
  {
    title: 'Support',
    url: '/support',
    target: '_self',
    children: [
      {
        title: 'Help Center',
        url: '/support/help',
        target: '_self',
      },
      {
        title: 'Shipping Info',
        url: '/support/shipping',
        target: '_self',
      },
      {
        title: 'Returns',
        url: '/support/returns',
        target: '_self',
      },
      {
        title: 'Live Chat',
        url: 'https://chat.example.com',
        target: '_blank',
      },
    ],
  },
  {
    title: 'My Account',
    url: '/account',
    target: '_self',
  },
];

// SaaS platform navigation
const saasNavigation = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    target: '_self',
  },
  {
    title: 'Features',
    url: '/features',
    target: '_self',
    children: [
      {
        title: 'Project Management',
        url: '/features/projects',
        target: '_self',
      },
      {
        title: 'Team Collaboration',
        url: '/features/collaboration',
        target: '_self',
      },
      {
        title: 'Analytics',
        url: '/features/analytics',
        target: '_self',
      },
      {
        title: 'Integrations',
        url: '/features/integrations',
        target: '_self',
        children: [
          {
            title: 'Slack',
            url: '/features/integrations/slack',
            target: '_self',
          },
          {
            title: 'Google Workspace',
            url: '/features/integrations/google',
            target: '_self',
          },
          {
            title: 'Microsoft 365',
            url: '/features/integrations/microsoft',
            target: '_self',
          },
        ],
      },
    ],
  },
  {
    title: 'Resources',
    url: '<nolink>',
    target: '_self',
    children: [
      {
        title: 'Documentation',
        url: '/docs',
        target: '_self',
      },
      {
        title: 'API Reference',
        url: '/api',
        target: '_self',
      },
      {
        title: 'Tutorials',
        url: '/tutorials',
        target: '_self',
      },
      {
        title: 'Community Forum',
        url: 'https://community.example.com',
        target: '_blank',
      },
      {
        title: 'Blog',
        url: '/blog',
        target: '_self',
      },
    ],
  },
  {
    title: 'Pricing',
    url: '/pricing',
    target: '_self',
  },
];

// Basic menu items
const basicNavigation = [
  {
    title: 'Home',
    url: '/',
    target: '_self',
  },
  {
    title: 'About',
    url: '/about',
    target: '_self',
  },
  {
    title: 'Services',
    url: '/services',
    target: '_self',
  },
  {
    title: 'Blog',
    url: '/blog',
    target: '_self',
  },
  {
    title: 'Contact',
    url: '/contact',
    target: '_self',
  },
];

// Default navigation story
export const Default = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nested: corporateNavigation,
    selected__header_template: '',
    account_menu: [],
  },
};

// Simple navigation without dropdowns
export const BasicNavigation = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nested: basicNavigation,
    selected__header_template: '',
    account_menu: [],
  },
};

// E-commerce navigation
export const ECommerceNavigation = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nested: ecommerceNavigation,
    selected__header_template: '',
    account_menu: [],
  },
};

// SaaS platform navigation
export const SaaSNavigation = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nested: saasNavigation,
    selected__header_template: '',
    account_menu: [],
  },
};

// Navigation with external links
export const WithExternalLinks = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nested: [
      {
        title: 'Home',
        url: '/',
        target: '_self',
      },
      {
        title: 'Products',
        url: '/products',
        target: '_self',
      },
      {
        title: 'Resources',
        url: '<nolink>',
        target: '_self',
        children: [
          {
            title: 'Documentation',
            url: '/docs',
            target: '_self',
          },
          {
            title: 'GitHub Repository',
            url: 'https://github.com/example/repo',
            target: '_blank',
          },
          {
            title: 'Stack Overflow',
            url: 'https://stackoverflow.com/questions/tagged/example',
            target: '_blank',
          },
          {
            title: 'Discord Community',
            url: 'https://discord.gg/example',
            target: '_blank',
          },
        ],
      },
      {
        title: 'Support',
        url: '/support',
        target: '_self',
      },
    ],
    selected__header_template: '',
    account_menu: [],
  },
};

// Navigation with account menu (mobile)
export const WithAccountMenu = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nested: basicNavigation,
    selected__header_template: 'style2',
    account_menu: [
      {
        title: 'Sign In',
        url: '/user/login',
        target: '_self',
      },
      {
        title: 'Create Account',
        url: '/user/register',
        target: '_self',
      },
      {
        title: 'My Profile',
        url: '/user/profile',
        target: '_self',
      },
    ],
  },
};

// Deep nested navigation
export const DeepNested = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nested: [
      {
        title: 'Home',
        url: '/',
        target: '_self',
      },
      {
        title: 'Products',
        url: '/products',
        target: '_self',
        children: [
          {
            title: 'Software',
            url: '/products/software',
            target: '_self',
            children: [
              {
                title: 'Web Applications',
                url: '/products/software/web',
                target: '_self',
                children: [
                  {
                    title: 'E-commerce Platforms',
                    url: '/products/software/web/ecommerce',
                    target: '_self',
                  },
                  {
                    title: 'Content Management',
                    url: '/products/software/web/cms',
                    target: '_self',
                  },
                  {
                    title: 'Custom Applications',
                    url: '/products/software/web/custom',
                    target: '_self',
                  },
                ],
              },
              {
                title: 'Mobile Applications',
                url: '/products/software/mobile',
                target: '_self',
                children: [
                  {
                    title: 'iOS Apps',
                    url: '/products/software/mobile/ios',
                    target: '_self',
                  },
                  {
                    title: 'Android Apps',
                    url: '/products/software/mobile/android',
                    target: '_self',
                  },
                ],
              },
            ],
          },
          {
            title: 'Hardware',
            url: '/products/hardware',
            target: '_self',
            children: [
              {
                title: 'Servers',
                url: '/products/hardware/servers',
                target: '_self',
              },
              {
                title: 'Networking',
                url: '/products/hardware/networking',
                target: '_self',
              },
            ],
          },
        ],
      },
      {
        title: 'Contact',
        url: '/contact',
        target: '_self',
      },
    ],
    selected__header_template: '',
    account_menu: [],
  },
};

// Empty state
export const EmptyState = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nested: [],
    selected__header_template: '',
    account_menu: [],
  },
};

// Playground for testing all properties
export const Playground = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    nested: [
      {
        title: 'Test Menu Item',
        url: '/test',
        target: '_self',
        children: [
          {
            title: 'Sub Item 1',
            url: '/test/sub1',
            target: '_self',
          },
          {
            title: 'External Sub Item',
            url: 'https://example.com',
            target: '_blank',
          },
        ],
      },
    ],
    selected__header_template: 'style2',
    account_menu: [
      {
        title: 'Test Account',
        url: '/account',
        target: '_self',
      },
    ],
  },
};