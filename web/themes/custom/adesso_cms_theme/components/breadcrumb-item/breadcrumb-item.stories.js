// phpcs:ignoreFile

import Component from './breadcrumb-item.twig';

const meta = {
  title: 'Navigation/BreadcrumbItem',
  component: Component,
  argTypes: {
    title: {
      name: 'Item Title',
      description: 'The display text for the breadcrumb item',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    url: {
      name: 'Item URL',
      description: 'The URL for the breadcrumb item (null for current page or non-linked items)',
      control: { type: 'text' },
      table: {
        type: { summary: 'string|null' },
        defaultValue: { summary: 'null' },
      },
    },
    text: {
      name: 'Item Text',
      description: 'Alternative property name for display text (legacy support)',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    is_current: {
      name: 'Is Current Page',
      description: 'Whether this item represents the current page',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    is_link: {
      name: 'Is Link',
      description: 'Whether this item should be rendered as a link',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    show_separator: {
      name: 'Show Separator',
      description: 'Whether to display a separator after this item',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    separator: {
      name: 'Separator',
      description: 'Character or symbol used after this item',
      control: { type: 'select' },
      options: ['/', '>', '›', '→'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '/' },
      },
    },
    divider: {
      name: 'Divider',
      description: 'Alternative property name for show_separator (legacy support)',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'null' },
      },
    },
    item_classes: {
      name: 'Item Classes',
      description: 'Additional CSS classes for this breadcrumb item',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    link_classes: {
      name: 'Link Classes',
      description: 'Additional CSS classes for the link element',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    separator_classes: {
      name: 'Separator Classes',
      description: 'Additional CSS classes for the separator element',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    aria_current: {
      name: 'Aria Current',
      description: 'ARIA current attribute value for accessibility',
      control: { type: 'select' },
      options: ['page', 'step', 'location', 'date', 'time', 'true', 'false', null],
      table: {
        type: { summary: 'string|null' },
        defaultValue: { summary: 'null' },
      },
    },
    title_attribute: {
      name: 'Title Attribute',
      description: 'HTML title attribute for additional context',
      control: { type: 'text' },
      table: {
        type: { summary: 'string|null' },
        defaultValue: { summary: 'null' },
      },
    },
    rel: {
      name: 'Link Relationship',
      description: 'HTML rel attribute for link relationship',
      control: { type: 'text' },
      table: {
        type: { summary: 'string|null' },
        defaultValue: { summary: 'null' },
      },
    },
    target: {
      name: 'Link Target',
      description: 'HTML target attribute for link behavior',
      control: { type: 'select' },
      options: ['_self', '_blank', '_parent', '_top', null],
      table: {
        type: { summary: 'string|null' },
        defaultValue: { summary: 'null' },
      },
    },
    microdata_property: {
      name: 'Microdata Property',
      description: 'Schema.org microdata property for structured data',
      control: { type: 'text' },
      table: {
        type: { summary: 'string|null' },
        defaultValue: { summary: 'item' },
      },
    },
    hide_on_mobile: {
      name: 'Hide on Mobile',
      description: 'Hide this item on mobile devices for responsive behavior',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Individual breadcrumb navigation item component with accessibility and municipal portal support. This component represents a single item within a breadcrumb navigation trail.

## TWIG Usage

\`\`\`twig
{# Basic breadcrumb item as link #}
{% include 'sdc:breadcrumb_item' with {
  title: 'Dienstleistungen',
  url: '/services',
  show_separator: true,
  separator: '/'
} %}

{# Current page item (non-linked) #}
{% include 'sdc:breadcrumb_item' with {
  title: 'Baubewilligung',
  is_current: true,
  aria_current: 'page',
  show_separator: false
} %}

{# Municipal service item with custom classes #}
{% include 'sdc:breadcrumb_item' with {
  title: 'Steuern',
  url: '/taxes',
  link_classes: 'text-blue-600 hover:text-blue-800',
  separator_classes: 'text-gray-400',
  show_separator: true
} %}

{# External link item #}
{% include 'sdc:breadcrumb_item' with {
  title: 'Kanton Zürich Portal',
  url: 'https://www.zh.ch',
  target: '_blank',
  rel: 'external noopener',
  title_attribute: 'Öffnet in neuem Fenster'
} %}

{# Item with icon slot #}
{% include 'sdc:breadcrumb_item' with {
  title: 'Startseite',
  url: '/',
  show_separator: true
} with {
  icon: '<svg class="w-4 h-4" fill="currentColor"><!-- home icon --></svg>'
} %}

{# Mobile-hidden intermediate item #}
{% include 'sdc:breadcrumb_item' with {
  title: 'Zwischenebene',
  url: '/intermediate',
  hide_on_mobile: true,
  show_separator: true
} %}

{# Legacy text property support #}
{% include 'sdc:breadcrumb_item' with {
  text: 'Bewilligungen',
  url: '/permits',
  divider: true
} %}

{# Structured data item #}
{% include 'sdc:breadcrumb_item' with {
  title: 'Online Services',
  url: '/online-services',
  microdata_property: 'item',
  show_separator: true
} %}
\`\`\`

## Municipal Portal Features

- **Accessibility First**: Full WCAG 2.1 AA compliance with proper ARIA attributes
- **Swiss Government Standards**: Follows Canton design guidelines
- **Mobile Responsive**: Optional hiding on mobile devices
- **Structured Data**: Schema.org microdata support for SEO
- **Legacy Support**: Backwards compatibility with existing breadcrumb implementations

## Accessibility Features

- **aria-current**: Proper current page indication for screen readers
- **title attributes**: Additional context for complex navigation items
- **Keyboard navigation**: Full keyboard accessibility support
- **Screen reader friendly**: Semantic markup with proper labeling

## Link Behavior Options

- **Internal links**: Standard navigation within the municipal portal
- **External links**: Support for _blank target with proper rel attributes
- **Non-linked items**: Current page or category headers without links
- **Custom link attributes**: Full control over HTML link properties

## Responsive Behavior

- **hide_on_mobile**: Automatically hide intermediate items on mobile devices
- **Separator control**: Independent separator display for each item
- **Custom styling**: Flexible CSS class system for municipal branding

## Legacy Compatibility

Supports both new and legacy property names:
- **title** / **text**: Display text
- **show_separator** / **divider**: Separator display
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Default linked breadcrumb item
export const Default = {
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Dienstleistungen',
    url: '/services',
    is_current: false,
    is_link: true,
    show_separator: true,
    separator: '/',
    aria_current: null,
  },
};

// Current page item (non-linked)
export const CurrentPage = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Breadcrumb item representing the current page - typically non-linked and with aria-current="page".',
      },
    },
  },
  args: {
    title: 'Baubewilligung',
    url: null,
    is_current: true,
    is_link: false,
    show_separator: false,
    aria_current: 'page',
  },
};

// Municipal service categories
export const MunicipalServiceCategory = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Breadcrumb item for municipal service categories with Swiss government styling.',
      },
    },
  },
  args: {
    title: 'Verwaltung',
    url: '/administration',
    is_link: true,
    show_separator: true,
    separator: '›',
    link_classes: 'text-blue-600 hover:text-blue-800 font-medium',
    separator_classes: 'text-gray-400',
  },
};

// Canton Zürich external link
export const CantonZurichExternal = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'External link to Canton Zürich portal with proper accessibility attributes.',
      },
    },
  },
  args: {
    title: 'Kanton Zürich',
    url: 'https://www.zh.ch',
    target: '_blank',
    rel: 'external noopener',
    title_attribute: 'Kanton Zürich Portal - öffnet in neuem Fenster',
    show_separator: true,
    separator: '/',
    link_classes: 'text-blue-600 hover:text-blue-800',
  },
};

// E-Government service item
export const EGovernmentService = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Breadcrumb item for E-Government services with structured data markup.',
      },
    },
  },
  args: {
    title: 'Online Schalter',
    url: '/e-government/services',
    is_link: true,
    show_separator: true,
    separator: '→',
    microdata_property: 'item',
    link_classes: 'text-green-600 hover:text-green-800',
    separator_classes: 'text-green-500 font-bold',
  },
};

// Mobile-hidden intermediate item
export const MobileHidden = {
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Breadcrumb item that automatically hides on mobile devices for responsive navigation.',
      },
    },
  },
  args: {
    title: 'Zwischenkategorie',
    url: '/intermediate-category',
    hide_on_mobile: true,
    show_separator: true,
    separator: '/',
    item_classes: 'hidden md:inline',
  },
};

// Different separator styles
export const SeparatorStyles = {
  render: () => `
    <div class="space-y-4">
      <div class="flex items-center space-x-2">
        <span class="text-blue-600">Dienstleistungen</span>
        <span class="text-gray-400">/</span>
        <span class="font-medium">Slash separator</span>
      </div>
      <div class="flex items-center space-x-2">
        <span class="text-blue-600">Dienstleistungen</span>
        <span class="text-gray-400">></span>
        <span class="font-medium">Greater than</span>
      </div>
      <div class="flex items-center space-x-2">
        <span class="text-blue-600">Dienstleistungen</span>
        <span class="text-gray-400">›</span>
        <span class="font-medium">Single right guillemet</span>
      </div>
      <div class="flex items-center space-x-2">
        <span class="text-blue-600">Dienstleistungen</span>
        <span class="text-blue-500 font-bold">→</span>
        <span class="font-medium">Right arrow (styled)</span>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Visual comparison of different separator styles available for breadcrumb items.',
      },
    },
  },
};

// ARIA current variations
export const ARIACurrentStates = {
  render: () => `
    <div class="space-y-4">
      <div class="p-4 border rounded">
        <h3 class="text-sm font-semibold mb-2">aria-current="page"</h3>
        <div class="flex items-center space-x-2">
          <span class="text-gray-900 font-medium" aria-current="page">Current Page</span>
        </div>
        <p class="text-xs text-gray-600 mt-1">For the current page in the breadcrumb trail</p>
      </div>
      <div class="p-4 border rounded">
        <h3 class="text-sm font-semibold mb-2">aria-current="step"</h3>
        <div class="flex items-center space-x-2">
          <span class="text-gray-900 font-medium" aria-current="step">Current Step</span>
        </div>
        <p class="text-xs text-gray-600 mt-1">For multi-step processes or wizards</p>
      </div>
      <div class="p-4 border rounded">
        <h3 class="text-sm font-semibold mb-2">aria-current="location"</h3>
        <div class="flex items-center space-x-2">
          <span class="text-gray-900 font-medium" aria-current="location">Current Location</span>
        </div>
        <p class="text-xs text-gray-600 mt-1">For location-based navigation</p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different aria-current values for various types of current items in municipal workflows.',
      },
    },
  },
};

// Legacy property support
export const LegacyProperties = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Demonstrates legacy property support for backwards compatibility (text instead of title, divider instead of show_separator).',
      },
    },
  },
  args: {
    text: 'Legacy Text Property',
    url: '/legacy-url',
    divider: true,
    separator: '/',
  },
};

// Complex municipal workflow step
export const MunicipalWorkflowStep = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Breadcrumb item representing a step in a complex municipal workflow or application process.',
      },
    },
  },
  args: {
    title: 'Schritt 3: Dokumente hochladen',
    url: '/application/documents',
    is_current: true,
    aria_current: 'step',
    show_separator: false,
    item_classes: 'bg-blue-50 px-2 py-1 rounded',
    link_classes: 'text-blue-800 font-medium',
  },
};

// Breadcrumb item with custom title attribute
export const WithTooltip = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Breadcrumb item with custom title attribute providing additional context on hover.',
      },
    },
  },
  args: {
    title: 'Steuern',
    url: '/taxes',
    title_attribute: 'Steueramt - Informationen zu Steuern und Abgaben',
    show_separator: true,
    separator: '/',
    link_classes: 'text-blue-600 hover:text-blue-800',
  },
};

// Structured data item
export const StructuredData = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Breadcrumb item with Schema.org microdata properties for improved SEO.',
      },
    },
  },
  args: {
    title: 'Bewilligungen',
    url: '/permits',
    microdata_property: 'item',
    show_separator: true,
    separator: '/',
    link_classes: 'text-blue-600 hover:text-blue-800',
  },
};

// Non-linked category header
export const NonLinkedCategory = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Non-linked breadcrumb item used as a category header or section divider.',
      },
    },
  },
  args: {
    title: 'Verwaltungsbereich',
    url: null,
    is_link: false,
    show_separator: true,
    separator: '›',
    item_classes: 'font-semibold text-gray-700',
  },
};

// Playground for testing all properties
export const Playground = {
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Test Breadcrumb Item',
    url: '/test',
    text: '',
    is_current: false,
    is_link: true,
    show_separator: true,
    separator: '/',
    divider: null,
    item_classes: '',
    link_classes: '',
    separator_classes: '',
    aria_current: null,
    title_attribute: null,
    rel: null,
    target: null,
    microdata_property: 'item',
    hide_on_mobile: false,
  },
};