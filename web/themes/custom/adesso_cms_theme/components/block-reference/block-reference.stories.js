// phpcs:ignoreFile

import Component from './block-reference.twig';

const meta = {
  title: 'Editorial/BlockReference',
  component: Component,
  argTypes: {
    pre_headline: {
      name: 'Pre-headline',
      description: 'The pre-headline text',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    title: {
      name: 'Title',
      description: 'The main headline',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    block_content: {
      name: 'Block Content',
      description: 'The rendered block content',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    is_dark: {
      name: 'Dark Theme',
      description: 'Whether to use dark theme',
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
Block reference component for displaying standalone content blocks with optional headlines and theme variations.

## TWIG Usage

\`\`\`twig
{# Basic content block with headline #}
{% include 'sdc:block-reference' with {
  pre_headline: 'Announcement',
  title: 'System Maintenance',
  block_content: 'Scheduled maintenance tonight from 2-4 AM EST.',
  is_dark: false
} %}

{# Content only block #}
{% include 'sdc:block-reference' with {
  block_content: content_from_block
} %}

{# Dark theme block #}
{% include 'sdc:block-reference' with {
  title: 'Featured Content',
  block_content: 'Important information with dark styling.',
  is_dark: true
} %}

{# With dynamic content #}
{% include 'sdc:block-reference' with {
  pre_headline: section.pre_headline,
  title: section.title,
  block_content: section.rendered_content
} %}
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Default block reference with full content
export const Default = {
  parameters: {
    layout: 'padded',
  },
  args: {
    pre_headline: 'Featured Content',
    title: 'Welcome to Our Platform',
    block_content: 'Discover powerful features and tools designed to help you achieve your goals. Our intuitive interface makes it easy to get started and accomplish more with less effort.',
    is_dark: false,
  },
};

// Announcement style block
export const Announcement = {
  args: {
    pre_headline: 'Important Notice',
    title: 'System Maintenance',
    block_content: 'Scheduled maintenance tonight from 2:00 AM to 4:00 AM EST. Services will be temporarily unavailable during this period. We apologize for any inconvenience.',
    is_dark: false,
  },
};

// Feature highlight block
export const FeatureHighlight = {
  args: {
    pre_headline: 'New Feature',
    title: 'Enhanced User Experience',
    block_content: 'We\'ve improved the user interface with better navigation, faster loading times, and more intuitive controls. Update your app to experience these improvements.',
    is_dark: false,
  },
};

// Dark theme block
export const DarkTheme = {
  args: {
    pre_headline: 'Special Offer',
    title: 'Limited Time Deal',
    block_content: 'Get 50% off your first month when you sign up this week. This exclusive offer includes all premium features and priority support.',
    is_dark: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Content without headlines
export const ContentOnly = {
  args: {
    block_content: 'This block contains only content without pre-headline or title. Perfect for simple text blocks, quotes, or standalone paragraphs that don\'t need additional structure.',
    is_dark: false,
  },
};

// Minimal with title only
export const TitleOnly = {
  args: {
    title: 'Quick Update',
    block_content: 'Brief announcement or update that needs a simple headline.',
    is_dark: false,
  },
};

// Playground for testing all properties
export const Playground = {
  args: {
    pre_headline: 'Test Section',
    title: 'Test Block Reference',
    block_content: 'This is test content for the block reference component. Use this to experiment with different content and styling options.',
    is_dark: false,
  },
};
