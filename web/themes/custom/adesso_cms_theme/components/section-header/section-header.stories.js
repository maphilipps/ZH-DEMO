// phpcs:ignoreFile

import Component from './section-header.twig';

const meta = {
  title: 'General/Section Header',
  component: Component,
  argTypes: {
    title: {
      name: 'Main Title',
      description: 'The main heading text (required)',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    pre_headline: {
      name: 'Pre-headline',
      description: 'Optional subtitle or pre-headline text',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    alignment: {
      name: 'Text Alignment',
      description: 'Text alignment for both headings',
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'center' },
      },
    },
    title_tag: {
      name: 'Main Title HTML Tag',
      description: 'HTML tag for the main title',
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'h2' },
      },
    },
    pre_headline_tag: {
      name: 'Pre-headline HTML Tag',
      description: 'HTML tag for the pre-headline',
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'span' },
      },
    },
    title_visual_level: {
      name: 'Main Title Visual Level',
      description: 'Visual styling level for main title',
      control: { type: 'select' },
      options: ['1', '2', '3', '4', '5', '6'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'auto' },
      },
    },
    pre_headline_visual_level: {
      name: 'Pre-headline Visual Level',
      description: 'Visual styling level for pre-headline',
      control: { type: 'select' },
      options: ['1', '2', '3', '4', '5', '6'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: '3' },
      },
    },
    additional_classes: {
      name: 'Additional Classes',
      description: 'Additional CSS classes for the container',
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
Flexible section header component with optional pre-headline and configurable text alignment.

## TWIG Usage

\`\`\`twig
{# Basic section header #}
{% include 'sdc:section-header' with {
  title: 'Our Services'
} %}

{# Section header with pre-headline #}
{% include 'sdc:section-header' with {
  title: 'Premium Solutions',
  pre_headline: 'What We Offer',
  alignment: 'center'
} %}

{# Left-aligned section header #}
{% include 'sdc:section-header' with {
  title: 'About Our Company',
  pre_headline: 'Learn More',
  alignment: 'left',
  title_tag: 'h1',
  title_visual_level: '1'
} %}

{# Right-aligned with custom classes #}
{% include 'sdc:section-header' with {
  title: 'Get In Touch',
  alignment: 'right',
  additional_classes: 'mb-8 border-b pb-4'
} %}
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Default section header
export const Default = {
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Section Title',
  },
};

// With pre-headline
export const WithPreHeadline = {
  args: {
    title: 'Our Premium Services',
    pre_headline: 'What We Offer',
  },
};

// Left alignment
export const LeftAligned = {
  args: {
    title: 'About Our Company',
    pre_headline: 'Learn More',
    alignment: 'left',
  },
};

// Right alignment
export const RightAligned = {
  args: {
    title: 'Get In Touch',
    pre_headline: 'Contact Us',
    alignment: 'right',
  },
};

// Center alignment (default)
export const CenterAligned = {
  args: {
    title: 'Featured Products',
    pre_headline: 'Our Best Sellers',
    alignment: 'center',
  },
};

// All alignment variations
export const AlignmentVariations = {
  render: (args) => `
    <div class="space-y-8">
      <div class="border-b pb-4">
        ${Component({
          ...args,
          title: 'Left Aligned Header',
          pre_headline: 'Left Alignment',
          alignment: 'left'
        })}
      </div>
      <div class="border-b pb-4">
        ${Component({
          ...args,
          title: 'Center Aligned Header',
          pre_headline: 'Center Alignment',
          alignment: 'center'
        })}
      </div>
      <div class="border-b pb-4">
        ${Component({
          ...args,
          title: 'Right Aligned Header',
          pre_headline: 'Right Alignment',
          alignment: 'right'
        })}
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available alignment options demonstrated side by side.',
      },
    },
  },
};

// Different heading levels
export const HeadingLevels = {
  args: {
    title: 'Page Title',
    pre_headline: 'Welcome',
    title_tag: 'h1',
    title_visual_level: '1',
    pre_headline_tag: 'span',
    pre_headline_visual_level: '3',
  },
};

// Custom styling
export const CustomStyling = {
  args: {
    title: 'Featured Article',
    pre_headline: 'Latest News',
    additional_classes: 'bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500',
  },
};

// Playground for testing all properties
export const Playground = {
  args: {
    title: 'Section Title',
    pre_headline: 'Pre-headline Text',
    alignment: 'center',
    title_tag: 'h2',
    pre_headline_tag: 'span',
    title_visual_level: '',
    pre_headline_visual_level: '3',
    additional_classes: '',
  },
};