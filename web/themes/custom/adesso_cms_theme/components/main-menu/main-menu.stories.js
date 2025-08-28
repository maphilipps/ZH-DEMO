// phpcs:ignoreFile

import Component from './main-menu.twig';

const meta = {
  title: 'Organisms/Main Menu',
  component: Component,
  decorators: [
    (Story) => {
      // Add custom CSS for theme-specific classes and Tailwind overrides
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
            
            /* Tailwind overrides to ensure proper display */
            .hidden { display: none !important; }
            .lg\\:flex { display: flex !important; }
            .lg\\:hidden { display: none !important; }
            @media (min-width: 1024px) {
              .lg\\:flex { display: flex !important; }
              .lg\\:hidden { display: none !important; }
            }
          `;
          document.head.appendChild(style);
        }
      }
      
      // Load both Alpine.js and @tailwindplus/elements
      if (typeof window !== 'undefined') {
        const promises = [];
        
        // Load Alpine.js
        if (!window.Alpine) {
          const alpinePromise = new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js';
            script.defer = true;
            script.onload = resolve;
            document.head.appendChild(script);
          });
          promises.push(alpinePromise);
        }
        
        // Load @tailwindplus/elements
        if (!document.querySelector('script[src*="@tailwindplus/elements"]')) {
          const elementsPromise = new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1';
            script.type = 'module';
            script.onload = resolve;
            document.head.appendChild(script);
          });
          promises.push(elementsPromise);
        }
        
        if (promises.length > 0) {
          return Promise.all(promises).then(() => {
            setTimeout(() => Story(), 100);
          });
        }
      }
      
      return Story();
    },
  ],
  argTypes: {
    layout: {
      name: 'Menu Layout',
      description: 'Display layout for the menu system',
      control: { type: 'select' },
      options: ['horizontal', 'vertical', 'mobile'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    variant: {
      name: 'Menu Variant',
      description: 'Visual variant styling for the menu',
      control: { type: 'select' },
      options: ['default', 'transparent'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    show_mobile_toggle: {
      name: 'Show Mobile Toggle',
      description: 'Whether to display the mobile menu toggle button',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    responsive_breakpoint: {
      name: 'Responsive Breakpoint',
      description: 'CSS breakpoint for mobile/desktop switching',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'lg' },
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
    nested: {
      name: 'Menu Items',
      description: 'Hierarchical menu structure with nested children using menu-item atoms',
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
Unified navigation system supporting desktop and mobile layouts with el-popover and el-dialog. Uses atomic menu-item components for consistent styling across all menu levels. Replaces duplicate navigation logic between site-header and main-menu components.

## Architecture

This component follows atomic design principles:
- **menu-item** (Atom): Individual menu item presentation
- **main-menu** (Organism): Composes menu-item atoms with navigation logic
- **site-header** (Organism): Uses main-menu without duplicating navigation

## TWIG Usage

\`\`\`twig
{# Basic horizontal navigation (for headers) #}
{% include 'adesso_cms_theme:main-menu' with {
  layout: 'horizontal',
  variant: 'default',
  show_mobile_toggle: true,
  nested: [
    {
      title: 'Home',
      url: '/',
      is_active: true,
      in_active_trail: false,
      children: []
    },
    {
      title: 'About',
      url: '/about',
      is_active: false,
      in_active_trail: false,
      children: []
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
- **Alpine.js + @tailwindplus/elements**: Smooth hover, click interactions, and modern popover/dialog functionality
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

// Corporate website navigation (updated for unified architecture)
const corporateNavigation = [
  {
    title: 'Home',
    url: '/',
    target: '_self',
    is_active: true,
    in_active_trail: false,
    children: []
  },
  {
    title: 'About Us',
    url: '/about',
    target: '_self',
    is_active: false,
    in_active_trail: true,
    children: [
      {
        title: 'Our Story',
        url: '/about/story',
        target: '_self',
        is_active: false,
        in_active_trail: false,
        children: []
      },
      {
        title: 'Leadership Team',
        url: '/about/team',
        target: '_self',
        is_active: false,
        in_active_trail: false,
        children: []
      },
      {
        title: 'Careers',
        url: '/about/careers',
        target: '_self',
        is_active: false,
        in_active_trail: false,
        children: []
      },
      {
        title: 'Company News',
        url: '/about/news',
        target: '_self',
        is_active: false,
        in_active_trail: false,
        children: []
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

// Default unified navigation story
export const Default = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    layout: 'horizontal',
    variant: 'default',
    show_mobile_toggle: true,
    responsive_breakpoint: 'lg',
    show_logo: true,
    logo: '/themes/custom/adesso_cms_theme/assets/logo.svg',
    site_name: 'Adesso CMS',
    front_page: '/',
    menu_name: 'main',
    depth: 3,
    nested: corporateNavigation,
    aria_label: 'Main navigation',
    keyboard_navigation: true
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

// Transparent variant (for hero sections)
export const TransparentVariant = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
  args: {
    ...Default.args,
    variant: 'transparent'
  },
};

// Vertical layout (for sidebars)
export const VerticalLayout = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    ...Default.args,
    layout: 'vertical',
    show_mobile_toggle: false
  },
};

// Mobile layout demonstration
export const MobileLayout = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    ...Default.args,
    layout: 'mobile',
    show_mobile_toggle: false
  },
};

// Without logo (menu-only)
export const MenuOnly = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    ...Default.args,
    show_logo: false
  },
};

// Different responsive breakpoints
export const SmallBreakpoint = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    ...Default.args,
    responsive_breakpoint: 'sm'
  },
};

// Site header integration example
export const HeaderIntegration = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    ...Default.args
  },
  decorators: [
    (Story) => {
      // Wrap in site-header context
      return `
        <header class="absolute inset-x-0 top-0 z-50" role="banner">
          <div class="flex items-center justify-between p-6 lg:px-8">
            ${Story()}
            <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
              <a href="/user/login" class="text-sm/6 font-semibold text-gray-900 hover:text-primary">
                Log in <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </header>
      `;
    },
  ],
};

// Playground for testing all unified properties
export const Playground = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    layout: 'horizontal',
    variant: 'default',
    show_mobile_toggle: true,
    responsive_breakpoint: 'lg',
    show_logo: true,
    logo: '/themes/custom/adesso_cms_theme/assets/logo.svg',
    site_name: 'Test Site',
    front_page: '/',
    menu_name: 'main',
    depth: 3,
    aria_label: 'Test navigation',
    keyboard_navigation: true,
    nested: [
      {
        title: 'Test Menu Item',
        url: '/test',
        target: '_self',
        is_active: false,
        in_active_trail: false,
        children: [
          {
            title: 'Sub Item 1',
            url: '/test/sub1',
            target: '_self',
            is_active: false,
            in_active_trail: false,
            children: []
          },
          {
            title: 'External Sub Item',
            url: 'https://example.com',
            target: '_blank',
            is_active: false,
            in_active_trail: false,
            children: []
          },
        ],
      },
    ]
  },
};