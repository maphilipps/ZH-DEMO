import { renderHeading, renderPricingCard } from '../../.storybook/component-helpers.js';

function renderPricing(args) {
  const {
    pre_headline = '',
    title = '',
    summary = '',
    grid_columns = '3',
    cards = []
  } = args;

  // Render pre-headline
  const preHeadlineHtml = pre_headline ? renderHeading({
    title: pre_headline,
    as: 'h3',
    custom_classes: 'mb-4 text-2xl font-bold tracking-tight leading-none text-gray-900'
  }) : '';

  // Render title
  const titleHtml = title ? renderHeading({
    title: title,
    as: 'h2',
    custom_classes: 'text-3xl font-bold mb-4'
  }) : '';

  // Render summary
  const summaryHtml = summary ? `<div class="text-gray-600">${summary}</div>` : '';

  // Validate grid columns
  const cols = ['2', '3'].includes(grid_columns.toString()) ? grid_columns.toString() : '3';
  
  // Determine grid classes
  const gridClasses = cols === '2' 
    ? 'md:grid-cols-2 max-w-5xl mx-auto' 
    : 'md:grid-cols-3';

  // Render pricing cards
  const cardsHtml = cards.map(card => renderPricingCard({
    pre_headline: card.eyebrow,
    title: card.title,
    monthly_label: card.monthly_label,
    features: card.features || [],
    cta_link: card.cta_link,
    includes_label: card.includes_label || 'Includes'
  })).join('');

  return `
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
      <div class="mx-auto max-w-lg text-center mb-8">
        ${preHeadlineHtml}
        ${titleHtml}
        ${summaryHtml}
      </div>
      <div class="grid grid-cols-1 gap-6 sm:gap-8 ${gridClasses}">
        ${cardsHtml}
      </div>
    </div>
  `;
}

export default {
  title: 'Editorial/Pricing',
  render: renderPricing,
  argTypes: {
    pre_headline: {
      description: 'Text displayed above the main title',
      control: 'text'
    },
    title: {
      description: 'Main heading for the pricing section',
      control: 'text'
    },
    summary: {
      description: 'Summary text below the title',
      control: 'text'
    },
    grid_columns: {
      description: 'Number of columns in the grid (2 or 3)',
      control: 'select',
      options: [2, 3],
      defaultValue: 3
    },
    cards: {
      description: 'Array of pricing cards to display',
      control: 'object',
    }
  }
};

export const Default = {
  args: {
    pre_headline: "Choose Your Plan",
    title: "Compare Our Options",
    summary: "Select the best option for your needs",
    grid_columns: 3,
    cards: [
      {
        eyebrow: "DrupalX CMS",
        title: "Free",
        monthly_label: "",
        features: ["Full access to open source features", "Community support", "Documentation"],
        cta_link: {
          url: "#",
          title: "Get Started",
        },
        includes_label: "Includes",
      },
      {
        eyebrow: "Technical Discovery",
        title: "$5,000",
        monthly_label: "",
        features: ["Comprehensive needs assessment", "Custom solution design", "Implementation roadmap"],
        cta_link: {
          url: "#",
          title: "Book Discovery",
        },
        includes_label: "Includes",
      },
      {
        eyebrow: "Full Project Build",
        title: "Contact",
        monthly_label: "",
        features: ["End-to-end project management", "Custom development", "Ongoing support"],
        cta_link: {
          url: "#",
          title: "Contact Sales",
        },
        includes_label: "Includes",
      }
    ]
  }
};

export const TwoCards = {
  args: {
    pre_headline: "Simple Pricing",
    title: "Compare Plans",
    summary: "Choose the plan that fits your needs",
    grid_columns: 2,
    cards: [
      {
        eyebrow: "Basic Plan",
        title: "$9.99",
        monthly_label: "mo",
        features: ["Up to 5 users", "Basic support", "1GB storage"],
        cta_link: {
          url: "#",
          title: "Choose Basic",
        }
      },
      {
        eyebrow: "Pro Plan",
        title: "$29.99",
        monthly_label: "mo",
        features: ["Unlimited users", "24/7 support", "10GB storage", "Advanced analytics"],
        cta_link: {
          url: "#",
          title: "Choose Pro",
        }
      }
    ]
  }
};
