// phpcs:ignoreFile

import Component from './heading.twig';

const meta = {
  title: 'General/Heading',
  component: Component,
  argTypes: {
    'heading.title': {
      name: 'Title Text',
      description: 'The heading text content',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    'heading.as': {
      name: 'HTML Tag',
      description: 'HTML heading tag to use',
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'h2' },
      },
    },
    'heading.visual_level': {
      name: 'Visual Level',
      description: 'Visual styling level (1-6)',
      control: { type: 'select' },
      options: ['1', '2', '3', '4', '5', '6'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'auto' },
      },
    },
    'heading.modifier': {
      name: 'Modifier Classes',
      description: 'Additional CSS classes',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    'heading.additional_classes': {
      name: 'Additional Classes',
      description: 'Additional CSS classes merged with standard classes',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    'heading.id': {
      name: 'ID Attribute',
      description: 'HTML ID for anchor navigation',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    'heading.aria_label': {
      name: 'ARIA Label',
      description: 'Additional accessibility context',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    'heading.url': {
      name: 'Link URL',
      description: 'Optional URL to make heading interactive',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    'heading.icon': {
      name: 'Icon Content',
      description: 'Optional icon HTML content',
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
Flexible heading component supporting all heading levels with customizable visual styling.

## TWIG Usage

\`\`\`twig
{# Page title (h1) #}
{% include 'sdc:heading' with {
  heading: {
    title: 'Welcome to Our Company',
    as: 'h1',
    visual_level: '1'
  }
} %}

{# Section heading (h2) #}
{% include 'sdc:heading' with {
  heading: {
    title: 'Our Services',
    as: 'h2',
    visual_level: '2'
  }
} %}

{# Heading with anchor link #}
{% include 'sdc:heading' with {
  heading: {
    title: 'Contact Information',
    as: 'h3',
    visual_level: '3',
    id: 'contact',
    url: '#contact'
  }
} %}

{# Heading with icon #}
{% include 'sdc:heading' with {
  heading: {
    title: 'Security Features',
    as: 'h3',
    icon: '<svg class="w-5 h-5 mr-2 inline">...</svg>'
  }
} %}
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Default heading
export const Default = {
  parameters: {
    layout: 'centered',
  },
  args: {
    heading: {
      title: 'Section Heading',
      as: 'h2',
      visual_level: '2',
    },
  },
};

// All heading levels - showing HTML tags (semantic structure)
export const HTMLTags = {
  render: () => `
    <div class="space-y-4">
      <h1 class="text-4xl font-extrabold tracking-tight">h1 - Page Title</h1>
      <h2 class="text-3xl font-bold tracking-tight">h2 - Section Heading</h2>
      <h3 class="text-2xl font-bold tracking-tight">h3 - Subsection Heading</h3>
      <h4 class="text-xl font-semibold tracking-tight">h4 - Content Heading</h4>
      <h5 class="text-lg font-semibold tracking-tight">h5 - Minor Heading</h5>
      <h6 class="text-base font-semibold tracking-tight">h6 - Small Heading</h6>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available HTML heading tags from the YAML schema.',
      },
    },
  },
};

// Visual levels - showing visual styling levels
export const VisualLevels = {
  render: () => `
    <div class="space-y-4">
      <span class="block text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl">Visual Level 1</span>
      <span class="block text-3xl font-bold tracking-tight">Visual Level 2</span>
      <span class="block text-2xl font-bold tracking-tight">Visual Level 3</span>
      <span class="block text-xl font-semibold tracking-tight">Visual Level 4</span>
      <span class="block text-lg font-semibold tracking-tight">Visual Level 5</span>
      <span class="block text-base font-semibold tracking-tight">Visual Level 6</span>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available visual styling levels from the YAML schema.',
      },
    },
  },
};

// Page title (h1) - most common use case
export const PageTitle = {
  args: {
    heading: {
      title: 'Welcome to Our Company',
      as: 'h1',
      visual_level: '1',
    },
  },
};

// Section heading with anchor link
export const SectionWithAnchor = {
  args: {
    heading: {
      title: 'Our Services',
      as: 'h2',
      visual_level: '2',
      id: 'services',
      url: '#services',
    },
  },
};

// External link heading with security features
export const ExternalLink = {
  args: {
    heading: {
      title: 'External Resource',
      as: 'h3',
      visual_level: '3',
      url: 'https://example.com/resource',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Heading with external link that automatically gets security attributes and accessibility features via Foundation Link integration.',
      },
    },
  },
};

// Heading with icon
export const WithIcon = {
  args: {
    heading: {
      title: 'Security Features',
      as: 'h3',
      visual_level: '3',
      icon: '<svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>',
    },
  },
};

// Heading with custom modifier classes
export const WithModifier = {
  args: {
    heading: {
      title: 'Featured Article',
      as: 'h2',
      visual_level: '2',
      modifier: 'text-blue-600 border-b-2 border-blue-600 pb-2',
    },
  },
};

// Semantic vs Visual (h6 tag with h1 styling)
export const SemanticVsVisual = {
  args: {
    heading: {
      title: 'Visually Large, Semantically Small',
      as: 'h6',
      visual_level: '1',
    },
  },
};

// Additional styling classes
export const AdditionalStyling = {
  args: {
    heading: {
      title: 'Additional Styled Heading',
      as: 'h2',
      additional_classes: 'text-green-600 border-l-4 border-green-500 pl-4',
    },
  },
};

// Playground for testing all properties
export const Playground = {
  args: {
    heading: {
      title: 'Heading Text',
      as: 'h2',
      visual_level: '2',
      modifier: '',
      additional_classes: '',
      id: '',
      aria_label: '',
      url: '',
      icon: '',
    },
  },
};