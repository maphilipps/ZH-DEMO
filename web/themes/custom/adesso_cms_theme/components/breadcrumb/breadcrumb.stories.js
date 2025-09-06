// phpcs:ignoreFile

import Component from './breadcrumb.twig';

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Component,
  argTypes: {
    items: {
      name: 'Breadcrumb Items',
      description: 'Array of breadcrumb navigation items with title, url, and is_current properties',
      control: { type: 'object' },
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },
    separator: {
      name: 'Separator',
      description: 'Character or symbol used to separate breadcrumb items',
      control: { type: 'select' },
      options: ['/', '>', '›', '→'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '/' },
      },
    },
    show_home: {
      name: 'Show Home Link',
      description: 'Whether to display a home/start page link as the first item',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    home_title: {
      name: 'Home Title',
      description: 'Title for the home/start page link',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Startseite' },
      },
    },
    home_url: {
      name: 'Home URL',
      description: 'URL for the home/start page link',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '/' },
      },
    },
    aria_label: {
      name: 'Aria Label',
      description: 'Accessible label for the breadcrumb navigation',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Breadcrumb' },
      },
    },
    aria_label_de: {
      name: 'German Aria Label',
      description: 'German accessible label for multilingual support',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Brotkrümelnavigation' },
      },
    },
    aria_label_fr: {
      name: 'French Aria Label',
      description: 'French accessible label for multilingual support',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Fil d\'Ariane' },
      },
    },
    enable_structured_data: {
      name: 'Enable Structured Data',
      description: 'Generate JSON-LD structured data for search engines',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    mobile_responsive: {
      name: 'Mobile Responsive',
      description: 'Enable mobile-responsive breadcrumb behavior',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    max_mobile_items: {
      name: 'Maximum Mobile Items',
      description: 'Maximum number of items to show on mobile devices',
      control: { type: 'number', min: 1, max: 10 },
      table: {
        type: { summary: 'integer' },
        defaultValue: { summary: '3' },
      },
    },
    show_current_page: {
      name: 'Show Current Page',
      description: 'Whether to show the current page as the last breadcrumb item',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    link_current_page: {
      name: 'Link Current Page',
      description: 'Whether the current page item should be a link',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    wrapper_classes: {
      name: 'Wrapper Classes',
      description: 'Additional CSS classes for the breadcrumb wrapper',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    item_classes: {
      name: 'Item Classes',
      description: 'Additional CSS classes for breadcrumb items',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    separator_classes: {
      name: 'Separator Classes',
      description: 'Additional CSS classes for separators',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    skip_link: {
      name: 'Skip Link',
      description: 'Add skip link for accessibility (WCAG compliance)',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    skip_link_text: {
      name: 'Skip Link Text',
      description: 'Text for the skip link',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Skip breadcrumb navigation' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Municipal portal breadcrumb navigation component with Swiss government compliance, multilingual support, and WCAG 2.1 AA accessibility features.

## TWIG Usage

\`\`\`twig
{# Basic municipal service breadcrumb #}
{% include 'sdc:breadcrumb' with {
  items: [
    { title: 'Dienstleistungen', url: '/services' },
    { title: 'Bewilligungen', url: '/services/permits' },
    { title: 'Baubewilligung', url: null, is_current: true }
  ]
} %}

{# Canton Zürich portal breadcrumb #}
{% include 'sdc:breadcrumb' with {
  items: [
    { title: 'Verwaltung', url: '/administration' },
    { title: 'Steuern', url: '/administration/taxes' },
    { title: 'Steueramt', url: '/administration/taxes/office' },
    { title: 'Online Steuererklärung', url: null, is_current: true }
  ],
  home_title: 'Kanton Zürich',
  separator: '›'
} %}

{# Multilingual French breadcrumb #}
{% include 'sdc:breadcrumb' with {
  items: [
    { title: 'Services', url: '/services' },
    { title: 'État civil', url: '/services/civil-status' },
    { title: 'Certificats', url: null, is_current: true }
  ],
  home_title: 'Accueil',
  aria_label: 'Fil d\\'Ariane',
  aria_label_fr: 'Fil d\\'Ariane'
} %}

{# Mobile-responsive breadcrumb with long path #}
{% include 'sdc:breadcrumb' with {
  items: breadcrumb_items,
  mobile_responsive: true,
  max_mobile_items: 3,
  enable_structured_data: true
} %}

{# WCAG-compliant breadcrumb with skip link #}
{% include 'sdc:breadcrumb' with {
  items: breadcrumb_items,
  skip_link: true,
  skip_link_text: 'Navigation überspringen',
  aria_label_de: 'Brotkrümelnavigation'
} %}

{# Custom separator styles #}
{% include 'sdc:breadcrumb' with {
  items: breadcrumb_items,
  separator: '→',
  separator_classes: 'text-primary font-bold'
} %}
\`\`\`

## Municipal Portal Features

- **Swiss Government Compliance**: Follows Canton Zürich design standards
- **Multilingual Support**: German and French accessibility labels
- **WCAG 2.1 AA**: Full accessibility compliance with skip links
- **Mobile Responsive**: Automatic truncation for mobile devices
- **Structured Data**: JSON-LD markup for search engine optimization
- **Easy Breadcrumb Integration**: Compatible with Drupal Easy Breadcrumb module

## Accessibility Features

- Semantic \`<nav>\` element with proper ARIA labeling
- Screen reader friendly with \`aria-current="page"\` for current items
- Keyboard navigation support
- Optional skip link for WCAG compliance
- High contrast support with customizable CSS classes

## Item Properties

Each breadcrumb item supports:
- **title**: Display text for the breadcrumb item
- **url**: Link destination (null or omit for current page)
- **is_current**: Boolean indicating the current page (automatically sets aria-current)

## Mobile Responsive Behavior

When \`mobile_responsive\` is enabled:
- Long breadcrumb paths are automatically truncated on mobile
- \`max_mobile_items\` controls how many items to show
- Ellipsis (...) indicates truncated items
- Current page is always shown

## Structured Data

When \`enable_structured_data\` is true, generates Schema.org BreadcrumbList JSON-LD markup for improved SEO.
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Canton Zürich municipal service navigation
const cantonZurichServiceItems = [
  { title: 'Verwaltung', url: '/administration' },
  { title: 'Dienstleistungen', url: '/administration/services' },
  { title: 'Bewilligungen', url: '/administration/services/permits' },
  { title: 'Baubewilligung', url: null, is_current: true }
];

// French municipality breadcrumb
const frenchMunicipalityItems = [
  { title: 'Administration', url: '/administration' },
  { title: 'Services publics', url: '/administration/services' },
  { title: 'État civil', url: '/administration/services/civil-status' },
  { title: 'Certificats de naissance', url: null, is_current: true }
];

// Long municipal navigation path
const longMunicipalPath = [
  { title: 'Stadtverwaltung', url: '/city-administration' },
  { title: 'Departement Sicherheit', url: '/city-administration/security' },
  { title: 'Stadtpolizei', url: '/city-administration/security/police' },
  { title: 'Verkehrspolizei', url: '/city-administration/security/police/traffic' },
  { title: 'Parkbussen', url: '/city-administration/security/police/traffic/parking' },
  { title: 'Online Einsprache', url: null, is_current: true }
];

// E-Government service breadcrumb
const eGovernmentItems = [
  { title: 'E-Government', url: '/e-government' },
  { title: 'Online Schalter', url: '/e-government/services' },
  { title: 'Steuererklärung', url: '/e-government/services/taxes' },
  { title: 'Eingabe 2024', url: null, is_current: true }
];

// Municipal event planning
const eventPlanningItems = [
  { title: 'Kultur & Events', url: '/culture-events' },
  { title: 'Veranstaltungen', url: '/culture-events/events' },
  { title: 'Bewilligungen', url: '/culture-events/events/permits' },
  { title: 'Strassenfest Anmeldung', url: null, is_current: true }
];

// Default Canton Zürich municipal breadcrumb
export const Default = {
  parameters: {
    layout: 'padded',
  },
  args: {
    items: cantonZurichServiceItems,
    separator: '/',
    show_home: true,
    home_title: 'Startseite',
    home_url: '/',
    aria_label: 'Breadcrumb',
    enable_structured_data: true,
    mobile_responsive: true,
    max_mobile_items: 3,
    show_current_page: true,
    link_current_page: false,
  },
};

// German Canton Zürich portal
export const CantonZurichGerman = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Municipal portal breadcrumb following Canton Zürich design standards with German accessibility labels.',
      },
    },
  },
  args: {
    items: cantonZurichServiceItems,
    separator: '›',
    show_home: true,
    home_title: 'Kanton Zürich',
    home_url: '/',
    aria_label_de: 'Brotkrümelnavigation',
    enable_structured_data: true,
    mobile_responsive: true,
    show_current_page: true,
    link_current_page: false,
  },
};

// French municipality portal
export const FrenchMunicipality = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'French-language municipal portal breadcrumb with proper French accessibility labels and terminology.',
      },
    },
  },
  args: {
    items: frenchMunicipalityItems,
    separator: '/',
    show_home: true,
    home_title: 'Accueil',
    home_url: '/',
    aria_label_fr: 'Fil d\\'Ariane',
    enable_structured_data: true,
    mobile_responsive: true,
    show_current_page: true,
    link_current_page: false,
  },
};

// Long municipal path demonstrating mobile responsiveness
export const LongMunicipalPath = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Deep municipal navigation path showing mobile responsive behavior with automatic truncation.',
      },
    },
  },
  args: {
    items: longMunicipalPath,
    separator: '→',
    show_home: true,
    home_title: 'Zürich Stadt',
    mobile_responsive: true,
    max_mobile_items: 3,
    enable_structured_data: true,
    show_current_page: true,
  },
};

// E-Government service navigation
export const EGovernmentServices = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'E-Government service breadcrumb for online municipal services and digital citizen interactions.',
      },
    },
  },
  args: {
    items: eGovernmentItems,
    separator: '/',
    show_home: true,
    home_title: 'Portal',
    home_url: '/portal',
    enable_structured_data: true,
    mobile_responsive: true,
    show_current_page: true,
    wrapper_classes: 'bg-blue-50 p-3 rounded-lg',
  },
};

// Municipal event planning
export const EventPlanning = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Municipal event planning and permit application breadcrumb navigation.',
      },
    },
  },
  args: {
    items: eventPlanningItems,
    separator: '>',
    show_home: true,
    home_title: 'Gemeinde',
    enable_structured_data: true,
    mobile_responsive: true,
    show_current_page: true,
  },
};

// WCAG compliance showcase
export const WCAGCompliant = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'WCAG 2.1 AA compliant breadcrumb with skip link, proper ARIA labels, and accessibility features.',
      },
    },
  },
  args: {
    items: cantonZurichServiceItems,
    separator: '/',
    show_home: true,
    home_title: 'Startseite',
    aria_label_de: 'Brotkrümelnavigation',
    skip_link: true,
    skip_link_text: 'Navigation überspringen',
    enable_structured_data: true,
    mobile_responsive: true,
    show_current_page: true,
    wrapper_classes: 'focus-within:ring-2 focus-within:ring-blue-500',
  },
};

// Different separator styles
export const SeparatorStyles = {
  render: () => `
    <div class="space-y-4">
      <div class="p-4 border rounded">
        <h3 class="text-sm font-semibold mb-2">Slash Separator (/)</h3>
        <nav aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2 text-sm">
            <li><a href="/" class="text-blue-600 hover:underline">Startseite</a></li>
            <li class="text-gray-400">/</li>
            <li><a href="/services" class="text-blue-600 hover:underline">Dienstleistungen</a></li>
            <li class="text-gray-400">/</li>
            <li><span class="text-gray-900" aria-current="page">Baubewilligung</span></li>
          </ol>
        </nav>
      </div>
      <div class="p-4 border rounded">
        <h3 class="text-sm font-semibold mb-2">Angle Bracket (>)</h3>
        <nav aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2 text-sm">
            <li><a href="/" class="text-blue-600 hover:underline">Startseite</a></li>
            <li class="text-gray-400">></li>
            <li><a href="/services" class="text-blue-600 hover:underline">Dienstleistungen</a></li>
            <li class="text-gray-400">></li>
            <li><span class="text-gray-900" aria-current="page">Baubewilligung</span></li>
          </ol>
        </nav>
      </div>
      <div class="p-4 border rounded">
        <h3 class="text-sm font-semibold mb-2">Chevron Right (›)</h3>
        <nav aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2 text-sm">
            <li><a href="/" class="text-blue-600 hover:underline">Startseite</a></li>
            <li class="text-gray-400">›</li>
            <li><a href="/services" class="text-blue-600 hover:underline">Dienstleistungen</a></li>
            <li class="text-gray-400">›</li>
            <li><span class="text-gray-900" aria-current="page">Baubewilligung</span></li>
          </ol>
        </nav>
      </div>
      <div class="p-4 border rounded">
        <h3 class="text-sm font-semibold mb-2">Arrow Right (→)</h3>
        <nav aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2 text-sm">
            <li><a href="/" class="text-blue-600 hover:underline">Startseite</a></li>
            <li class="text-blue-600 font-bold">→</li>
            <li><a href="/services" class="text-blue-600 hover:underline">Dienstleistungen</a></li>
            <li class="text-blue-600 font-bold">→</li>
            <li><span class="text-gray-900" aria-current="page">Baubewilligung</span></li>
          </ol>
        </nav>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Visual comparison of different separator styles available for municipal portal breadcrumbs.',
      },
    },
  },
};

// Mobile responsive behavior demonstration
export const MobileResponsive = {
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile responsive breadcrumb showing automatic truncation behavior on small screens.',
      },
    },
  },
  args: {
    items: longMunicipalPath,
    separator: '/',
    show_home: true,
    home_title: 'Zürich',
    mobile_responsive: true,
    max_mobile_items: 3,
    enable_structured_data: true,
    show_current_page: true,
  },
};

// No home link variation
export const WithoutHomeLink = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Breadcrumb navigation without a home link, starting directly with the first breadcrumb item.',
      },
    },
  },
  args: {
    items: cantonZurichServiceItems,
    separator: '/',
    show_home: false,
    enable_structured_data: true,
    mobile_responsive: true,
    show_current_page: true,
  },
};

// Current page as link
export const CurrentPageAsLink = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Breadcrumb with the current page rendered as a clickable link instead of plain text.',
      },
    },
  },
  args: {
    items: [
      { title: 'Verwaltung', url: '/administration' },
      { title: 'Dienstleistungen', url: '/administration/services' },
      { title: 'Bewilligungen', url: '/administration/services/permits' },
      { title: 'Baubewilligung', url: '/administration/services/permits/building', is_current: true }
    ],
    separator: '/',
    show_home: true,
    home_title: 'Startseite',
    link_current_page: true,
    show_current_page: true,
  },
};

// Playground for testing all properties
export const Playground = {
  parameters: {
    layout: 'padded',
  },
  args: {
    items: cantonZurichServiceItems,
    separator: '/',
    show_home: true,
    home_title: 'Startseite',
    home_url: '/',
    aria_label: 'Breadcrumb',
    aria_label_de: 'Brotkrümelnavigation',
    aria_label_fr: 'Fil d\\'Ariane',
    enable_structured_data: true,
    mobile_responsive: true,
    max_mobile_items: 3,
    show_current_page: true,
    link_current_page: false,
    wrapper_classes: '',
    item_classes: '',
    separator_classes: '',
    skip_link: false,
    skip_link_text: 'Skip breadcrumb navigation',
  },
};