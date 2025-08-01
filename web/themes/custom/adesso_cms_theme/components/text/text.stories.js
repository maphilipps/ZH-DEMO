// phpcs:ignoreFile

import Component from './text.twig';

const meta = {
  title: 'Editorial/Text',
  component: Component,
  argTypes: {
    eyebrow: {
      name: 'Eyebrow (Legacy)',
      description: 'Optional eyebrow text displayed above the title (legacy)',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    pre_headline: {
      name: 'Pre-headline',
      description: 'Optional pre-headline text displayed above the title',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    title: {
      name: 'Title',
      description: 'Main title of the text block',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    heading: {
      name: 'Heading Object',
      description: 'Optional heading object that overrides the title',
      control: { type: 'object' },
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    body: {
      name: 'Body',
      description: 'Main content of the text block (HTML allowed)',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    link: {
      name: 'Primary Link',
      description: 'Primary button/link configuration',
      control: { type: 'object' },
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    link2: {
      name: 'Secondary Link',
      description: 'Secondary button/link configuration',
      control: { type: 'object' },
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    text_layout: {
      name: 'Text Layout',
      description: 'Layout configuration: left, centered, buttons-right',
      control: { type: 'select' },
      options: ['left', 'centered', 'buttons-right'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    className: {
      name: 'CSS Classes',
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
Flexible text block component for editorial content with support for headings, body text, and action buttons.

## TWIG Usage

\`\`\`twig
{# Basic text block #}
{% include 'sdc:text' with {
  title: 'Welcome to Our Platform',
  body: '<p>Discover how our innovative solutions can transform your business operations and drive growth.</p>',
  text_layout: 'left'
} %}

{# Text block with pre-headline and buttons #}
{% include 'sdc:text' with {
  pre_headline: 'New Feature',
  title: 'Advanced Analytics Dashboard',
  body: '<p>Get deeper insights into your data with our new analytics dashboard featuring real-time reporting and customizable charts.</p>',
  link: {
    url: '/features/analytics',
    title: 'Learn More',
    icon: 'arrow_forward'
  },
  text_layout: 'centered'
} %}

{# Text block with heading object #}
{% include 'sdc:text' with {
  heading: {
    title: 'Our Mission',
    url: '/about/mission',
    icon: 'star'
  },
  body: content.field_body,
  text_layout: 'left'
} %}

{# Two-button layout #}
{% include 'sdc:text' with {
  title: 'Ready to Get Started?',
  body: '<p>Join thousands of companies already using our platform to streamline their operations.</p>',
  link: {
    url: '/signup',
    title: 'Start Free Trial'
  },
  link2: {
    url: '/demo',
    title: 'Watch Demo',
    icon: 'play_circle'
  },
  text_layout: 'buttons-right'
} %}

{# With custom styling #}
{% include 'sdc:text' with {
  pre_headline: 'Case Study',
  title: 'Customer Success Story',
  body: customer_story_content,
  className: 'bg-blue-50 p-8 rounded-lg',
  text_layout: 'centered'
} %}

{# Legacy eyebrow support #}
{% include 'sdc:text' with {
  eyebrow: 'Coming Soon',
  title: 'Next Generation Features',
  body: '<p>Stay tuned for exciting new capabilities.</p>'
} %}
\`\`\`

## Layout Options (from YAML schema)
- **left**: Left-aligned content (default)
- **centered**: Center-aligned content
- **buttons-right**: Right-aligned buttons with left-aligned text
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Default left-aligned text block
export const Default = {
  args: {
    eyebrow: '',
    pre_headline: '',
    title: 'Transform Your Business Today',
    heading: {},
    body: '<p>Discover how our comprehensive platform can revolutionize your workflow and boost productivity. Our solution integrates seamlessly with your existing tools while providing powerful new capabilities.</p><p>From automated reporting to advanced analytics, we provide everything you need to make data-driven decisions and accelerate growth.</p>',
    link: {
      url: '/get-started',
      title: 'Get Started',
      icon: 'arrow_forward',
    },
    link2: {},
    text_layout: 'left',
    className: '',
  },
};

// Centered layout with pre-headline
export const Centered = {
  args: {
    pre_headline: 'New Release',
    title: 'Advanced Analytics Dashboard',
    body: '<p>Experience next-level data visualization with our newly redesigned analytics dashboard. Get real-time insights, customizable reports, and predictive analytics all in one intuitive interface.</p>',
    link: {
      url: '/features/analytics',
      title: 'Explore Features',
      icon: 'insights',
    },
    text_layout: 'centered',
    className: 'py-16',
  },
};

// Two-button layout
export const TwoButtons = {
  args: {
    title: 'Ready to Scale Your Operations?',
    body: '<p>Join over 10,000 companies worldwide who trust our platform to manage their critical business processes. Start your journey today with our comprehensive onboarding program.</p>',
    link: {
      url: '/signup',
      title: 'Start Free Trial',
      icon: '',
    },
    link2: {
      url: '/demo',
      title: 'Watch Demo',
      icon: 'play_circle',
    },
    text_layout: 'buttons-right',
  },
};

// With heading object
export const HeadingObject = {
  args: {
    heading: {
      title: 'Customer Success Stories',
      url: '/case-studies',
      icon: 'star',
    },
    body: '<p>Read how companies like yours have achieved remarkable results using our platform. From 50% time savings to 300% productivity increases, discover what\'s possible.</p>',
    link: {
      url: '/case-studies',
      title: 'Read More Stories',
      icon: 'menu_book',
    },
    text_layout: 'left',
  },
};

// Legacy eyebrow example
export const LegacyEyebrow = {
  args: {
    eyebrow: 'Coming Soon',
    title: 'AI-Powered Automation',
    body: '<p>We\'re working on intelligent automation features that will revolutionize how you handle repetitive tasks. Stay tuned for exciting announcements.</p>',
    link: {
      url: '/newsletter',
      title: 'Get Updates',
      icon: 'notifications',
    },
    text_layout: 'centered',
  },
};

// Feature announcement
export const FeatureAnnouncement = {
  args: {
    pre_headline: 'Product Update',
    title: 'Enhanced Security Features',
    body: '<p>Your data security is our top priority. We\'ve implemented advanced encryption, multi-factor authentication, and real-time threat monitoring to keep your information safe.</p><ul><li>End-to-end encryption</li><li>Multi-factor authentication</li><li>Real-time monitoring</li><li>Compliance certifications</li></ul>',
    link: {
      url: '/security',
      title: 'Learn About Security',
      icon: 'security',
    },
    text_layout: 'left',
    className: 'bg-green-50 p-8 rounded-lg',
  },
};

// Call to action block
export const CallToAction = {
  args: {
    title: 'Transform Your Workflow Today',
    body: '<p>Don\'t let inefficient processes hold you back. Our platform is designed to streamline operations, reduce manual work, and help your team focus on what matters most.</p>',
    link: {
      url: '/signup',
      title: 'Start Your Journey',
      icon: 'rocket_launch',
    },
    link2: {
      url: '/contact',
      title: 'Talk to Sales',
      icon: 'phone',
    },
    text_layout: 'centered',
    className: 'bg-blue-600 text-white p-12 rounded-xl',
  },
};

// Layout comparison - showing all layout options
export const LayoutLeft = {
  parameters: {
    docs: {
      description: {
        story: 'Left-aligned layout (default) - standard left-aligned content presentation.',
      },
    },
  },
  args: {
    title: 'Left-Aligned Content',
    body: '<p>This text block uses the left layout option for standard left-aligned content presentation.</p>',
    link: { url: '#', title: 'Learn More' },
    text_layout: 'left',
    className: 'border rounded-lg p-6',
  },
};

export const LayoutCentered = {
  parameters: {
    docs: {
      description: {
        story: 'Centered layout - center-aligned content presentation.',
      },
    },
  },
  args: {
    title: 'Centered Content',
    body: '<p>This text block uses the centered layout option for center-aligned content presentation.</p>',
    link: { url: '#', title: 'Learn More' },
    text_layout: 'centered',
    className: 'border rounded-lg p-6',
  },
};

export const LayoutButtonsRight = {
  parameters: {
    docs: {
      description: {
        story: 'Buttons right layout - right-aligned action buttons with left-aligned text.',
      },
    },
  },
  args: {
    title: 'Right-Aligned Buttons',
    body: '<p>This text block uses the buttons-right layout option with right-aligned action buttons.</p>',
    link: { url: '#', title: 'Primary' },
    link2: { url: '#', title: 'Secondary' },
    text_layout: 'buttons-right',
    className: 'border rounded-lg p-6',
  },
};

// Playground for testing all properties
export const Playground = {
  args: {
    eyebrow: 'Test Eyebrow',
    pre_headline: 'Test Pre-headline',
    title: 'Test Title',
    heading: {},
    body: '<p>Test body content with <strong>HTML</strong> formatting.</p>',
    link: {
      url: '#',
      title: 'Test Button',
      icon: 'arrow_forward',
    },
    link2: {
      url: '#',
      title: 'Secondary',
      icon: 'info',
    },
    text_layout: 'left',
    className: 'test-class',
  },
};