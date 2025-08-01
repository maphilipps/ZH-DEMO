// phpcs:ignoreFile

import Component from './accordion.twig';

const meta = {
  title: 'Editorial/Accordion',
  component: Component,
  argTypes: {
    title: {
      name: 'Title',
      description: 'Title for the accordion group',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    pre_headline: {
      name: 'Pre-headline',
      description: 'Pre headline for the accordion group',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    accordion_items: {
      name: 'Accordion Items',
      description: 'List of accordion items with title and content',
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
Collapsible accordion component for organizing content into expandable sections.

## TWIG Usage

\`\`\`twig
{# Basic FAQ accordion #}
{% include 'sdc:accordion' with {
  title: 'Frequently Asked Questions',
  pre_headline: 'Support',
  accordion_items: [
    {
      title: 'How does this work?',
      content: 'This is how it works...',
      expanded: false
    },
    {
      title: 'What are the requirements?',
      content: 'The requirements are...',
      expanded: false
    }
  ]
} %}

{# Feature list accordion #}
{% include 'sdc:accordion' with {
  title: 'Platform Features',
  accordion_items: [
    {
      title: 'Advanced Analytics',
      content: 'Real-time data insights and reporting tools.'
    }
  ]
} %}
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Default accordion
export const Default = {
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'FAQ Section',
    pre_headline: 'Support',
    accordion_items: [
      {
        title: 'How does this work?',
        content: 'This is a simple explanation of how the feature works.',
        expanded: false,
      },
      {
        title: 'What are the requirements?',
        content: 'Here are the basic requirements you need to know.',
        expanded: false,
      },
      {
        title: 'How do I get started?',
        content: 'Follow these steps to get started with our platform.',
        expanded: false,
      },
    ],
  },
};

// Simple FAQ example
export const FAQ = {
  args: {
    title: 'Frequently Asked Questions',
    pre_headline: 'Help Center',
    accordion_items: [
      {
        title: 'What services do you offer?',
        content: 'We offer web development, design services, and digital consulting.',
        expanded: false,
      },
      {
        title: 'How long does a project take?',
        content: 'Most projects are completed within 2-6 months depending on complexity.',
        expanded: false,
      },
      {
        title: 'What are your rates?',
        content: 'Our rates vary by project scope. Contact us for a custom quote.',
        expanded: false,
      },
    ],
  },
};

// Feature accordion
export const Features = {
  args: {
    title: 'Platform Features',
    pre_headline: 'What We Offer',
    accordion_items: [
      {
        title: 'Analytics Dashboard',
        content: 'Real-time insights and reporting tools for your business.',
        expanded: false,
      },
      {
        title: 'API Integration',
        content: 'Connect with third-party services and existing systems.',
        expanded: false,
      },
      {
        title: 'Security Features',
        content: 'Enterprise-grade security with encryption and compliance.',
        expanded: false,
      },
    ],
  },
};

// Single item accordion
export const SingleItem = {
  args: {
    title: 'Getting Started',
    accordion_items: [
      {
        title: 'How do I create an account?',
        content: 'Click the Sign Up button and follow the registration process.',
        expanded: false,
      },
    ],
  },
};

// Without pre-headline
export const WithoutPreHeadline = {
  args: {
    title: 'Important Information',
    accordion_items: [
      {
        title: 'Terms and Conditions',
        content: 'Please read our terms and conditions carefully.',
        expanded: false,
      },
      {
        title: 'Privacy Policy',
        content: 'Your privacy is important to us. Learn how we protect your data.',
        expanded: false,
      },
    ],
  },
};

// Playground for testing all properties
export const Playground = {
  args: {
    title: 'Accordion Title',
    pre_headline: 'Section',
    accordion_items: [
      {
        title: 'Item 1',
        content: 'Content for item 1',
        expanded: false,
      },
      {
        title: 'Item 2',
        content: 'Content for item 2',
        expanded: false,
      },
    ],
  },
};
