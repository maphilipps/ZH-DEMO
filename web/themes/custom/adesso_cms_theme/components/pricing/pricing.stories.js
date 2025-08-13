// phpcs:ignoreFile

import Component from './pricing.twig';

const meta = {
  title: 'Editorial/Pricing',
  component: Component,
  argTypes: {
    pre_headline: {
      name: 'Pre-headline',
      description: 'Text displayed above the main title',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Choose Your Plan' },
      },
    },
    title: {
      name: 'Title',
      description: 'Main heading for the pricing section',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Compare Our Options' },
      },
    },
    summary: {
      name: 'Summary',
      description: 'Summary text below the title',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select the best option for your needs' },
      },
    },
    grid_columns: {
      name: 'Grid Columns',
      description: 'Number of columns in the grid (2 or 3)',
      control: { type: 'select' },
      options: ['2', '3'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: '3' },
      },
    },
    cards: {
      name: 'Cards',
      description: 'Array of pricing cards to display',
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
Pricing component for displaying pricing plans, service packages, or feature comparisons in a grid layout.

## TWIG Usage

\`\`\`twig
{# Basic 3-column pricing table #}
{% include 'sdc:pricing' with {
  pre_headline: 'Choose Your Plan',
  title: 'Flexible Pricing Options',
  summary: 'Select the plan that fits your needs and budget.',
  grid_columns: '3',
  cards: [
    {
      eyebrow: 'Basic',
      title: '$9',
      monthly_label: 'per month',
      features: [
        'Feature 1',
        'Feature 2',
        'Feature 3'
      ],
      cta_link: {
        url: '/signup/basic',
        title: 'Get Started'
      },
      includes_label: 'Includes'
    }
  ]
} %}

{# 2-column comparison #}
{% include 'sdc:pricing' with {
  title: 'Free vs Pro',
  grid_columns: '2',
  cards: pricing_cards
} %}

{# Service-based pricing #}
{% include 'sdc:pricing' with {
  pre_headline: 'Professional Services',
  title: 'Our Service Packages',
  summary: 'From quick fixes to complete solutions.',
  cards: service_packages
} %}
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Default pricing table
export const Default = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    pre_headline: 'Choose Your Plan',
    title: 'Flexible Pricing Options',
    summary: 'Select the plan that fits your needs and budget.',
    grid_columns: '3',
    cards: [
      {
        eyebrow: 'Basic',
        title: '$9',
        monthly_label: 'per month',
        features: [
          '5 projects',
          '10GB storage',
          'Email support',
          'Basic templates',
        ],
        cta_link: {
          url: '#',
          title: 'Get Started',
        },
        includes_label: 'Perfect for individuals',
      },
      {
        eyebrow: 'Professional',
        title: '$29',
        monthly_label: 'per month',
        features: [
          'Unlimited projects',
          '100GB storage',
          'Priority support',
          'Premium templates',
          'Team collaboration',
        ],
        cta_link: {
          url: '#',
          title: 'Choose Pro',
        },
        includes_label: 'Best for teams',
      },
      {
        eyebrow: 'Enterprise',
        title: '$99',
        monthly_label: 'per month',
        features: [
          'Everything in Pro',
          'Unlimited storage',
          'Phone support',
          'Custom integrations',
          'Advanced analytics',
        ],
        cta_link: {
          url: '#',
          title: 'Contact Sales',
        },
        includes_label: 'For large organizations',
      },
    ],
  },
};

// Grid columns options - showing enum options from YAML
export const GridColumns = {
  render: () => `
    <div class="space-y-12">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold mb-2">Grid Column Options</h2>
        <p class="text-gray-600">All available grid_columns settings from the YAML schema</p>
      </div>
      
      <div class="space-y-8">
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-4">2 Columns</h3>
          <div class="text-sm text-gray-600 mb-4">Perfect for simple comparisons or free vs paid plans</div>
          <div class="grid grid-cols-2 gap-4 max-w-2xl">
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div class="font-semibold text-lg">Free</div>
              <div class="text-2xl font-bold text-blue-600">$0</div>
              <div class="text-sm text-gray-600">Basic features</div>
            </div>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div class="font-semibold text-lg">Pro</div>
              <div class="text-2xl font-bold text-blue-600">$29</div>
              <div class="text-sm text-gray-600">All features</div>
            </div>
          </div>
        </div>
        
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="font-semibold mb-4">3 Columns (Default)</h3>
          <div class="text-sm text-gray-600 mb-4">Standard pricing table with multiple tiers</div>
          <div class="grid grid-cols-3 gap-4 container">
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div class="font-semibold text-lg">Basic</div>
              <div class="text-2xl font-bold text-blue-600">$9</div>
              <div class="text-sm text-gray-600">Getting started</div>
            </div>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div class="font-semibold text-lg">Pro</div>
              <div class="text-2xl font-bold text-blue-600">$29</div>
              <div class="text-sm text-gray-600">Most popular</div>
            </div>
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div class="font-semibold text-lg">Enterprise</div>
              <div class="text-2xl font-bold text-blue-600">$99</div>
              <div class="text-sm text-gray-600">Full scale</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available grid_columns options from the YAML schema.',
      },
    },
  },
};

// Two-column comparison
export const TwoColumn = {
  args: {
    pre_headline: 'Simple Choice',
    title: 'Free vs. Pro',
    summary: 'Start free, upgrade when you need more features',
    grid_columns: '2',
    cards: [
      {
        eyebrow: 'Free Plan',
        title: '$0',
        monthly_label: 'Forever free',
        features: [
          '3 projects',
          '5GB storage',
          'Community support',
          'Basic templates',
        ],
        cta_link: {
          url: '#',
          title: 'Get Started Free',
        },
        includes_label: 'Includes',
      },
      {
        eyebrow: 'Pro Plan',
        title: '$19',
        monthly_label: 'per month',
        features: [
          'Unlimited projects',
          '100GB storage',
          'Priority support',
          'Premium templates',
          'Team collaboration',
        ],
        cta_link: {
          url: '#',
          title: 'Upgrade to Pro',
        },
        includes_label: 'Everything in Free, plus',
      },
    ],
  },
};

// Website/app subscription pricing
export const SubscriptionPricing = {
  args: {
    pre_headline: 'Flexible Pricing',
    title: 'Scale with Your Business',
    summary: 'Choose monthly or annual billing. Cancel anytime.',
    grid_columns: '3',
    cards: [
      {
        eyebrow: 'Basic',
        title: '$9',
        monthly_label: 'per month',
        features: [
          '1 website',
          '10,000 page views',
          'Email support',
          'Basic analytics',
        ],
        cta_link: {
          url: '#',
          title: 'Start Basic',
        },
        includes_label: 'Perfect for small sites',
      },
      {
        eyebrow: 'Growth',
        title: '$29',
        monthly_label: 'per month',
        features: [
          '5 websites',
          '100,000 page views',
          'Priority support',
          'Advanced analytics',
          'A/B testing',
        ],
        cta_link: {
          url: '#',
          title: 'Choose Growth',
        },
        includes_label: 'Best for growing businesses',
      },
      {
        eyebrow: 'Scale',
        title: '$99',
        monthly_label: 'per month',
        features: [
          'Unlimited websites',
          '1M+ page views',
          'Phone support',
          'API access',
          'Custom integrations',
        ],
        cta_link: {
          url: '#',
          title: 'Go Scale',
        },
        includes_label: 'For large organizations',
      },
    ],
  },
};

// Service-based pricing
export const ServicePackages = {
  args: {
    pre_headline: 'Professional Services',
    title: 'Service Packages',
    summary: 'From quick fixes to complete solutions.',
    grid_columns: '3',
    cards: [
      {
        eyebrow: 'Quick Fix',
        title: '$500',
        monthly_label: 'one-time payment',
        features: [
          'Bug fixes',
          'Minor updates',
          'Performance tuning',
          '48-hour turnaround',
        ],
        cta_link: {
          url: '#',
          title: 'Book Service',
        },
        includes_label: 'Perfect for',
      },
      {
        eyebrow: 'Website Redesign',
        title: '$2,500',
        monthly_label: 'starting price',
        features: [
          'Custom design',
          'Responsive development',
          'CMS integration',
          'SEO optimization',
        ],
        cta_link: {
          url: '#',
          title: 'Get Quote',
        },
        includes_label: 'Includes',
      },
      {
        eyebrow: 'Full Development',
        title: 'Custom',
        monthly_label: 'let\'s discuss your needs',
        features: [
          'Strategy consultation',
          'Custom development',
          'System integration',
          'Ongoing support',
        ],
        cta_link: {
          url: '#',
          title: 'Schedule Call',
        },
        includes_label: 'Enterprise solution',
      },
    ],
  },
};

// Playground for testing all properties
export const Playground = {
  args: {
    pre_headline: 'Test Section',
    title: 'Test Pricing',
    summary: 'Test summary for the pricing component.',
    grid_columns: '3',
    cards: [
      {
        eyebrow: 'Test Plan',
        title: '$10',
        monthly_label: 'per month',
        features: [
          'Feature 1',
          'Feature 2',
          'Feature 3',
        ],
        cta_link: {
          url: '#',
          title: 'Test Button',
        },
        includes_label: 'Test includes',
      },
      {
        eyebrow: 'Another Plan',
        title: '$25',
        monthly_label: 'per month',
        features: [
          'More features',
          'Advanced tools',
          'Priority support',
        ],
        cta_link: {
          url: '#',
          title: 'Another Button',
        },
        includes_label: 'Test includes',
      },
    ],
  },
};