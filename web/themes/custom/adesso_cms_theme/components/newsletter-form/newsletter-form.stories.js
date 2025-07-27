import { renderHeading } from '../../.storybook/component-helpers.js';

// Create a proper newsletter form template function that renders actual HTML
const newsletterFormTemplate = (args) => {
  const {
    title = '',
    pre_headline = '',
    summary = '',
    modifier = ''
  } = args;

  // Render headings using helper
  const preHeadlineHtml = pre_headline ? renderHeading({
    title: pre_headline,
    as: 'h3',
    custom_classes: 'mb-4 text-2xl font-bold tracking-tight leading-none text-gray-900'
  }) : '';

  const titleHtml = title ? renderHeading({
    title: title,
    as: 'h2',
    custom_classes: 'text-3xl font-bold mb-4'
  }) : '';

  return `
    <div class="text-gray-900">
      <div class="py-4 px-4 mx-auto max-w-screen-xl lg:py-16">
        <div class="flex flex-col lg:space-y-8">
          <!-- Header Section -->
          <div class="flex flex-col justify-center">
            ${preHeadlineHtml}
            ${titleHtml}
            <div class="newsletter-summary">
              ${summary}
            </div>
          </div>
          <!-- Newsletter Form Section -->
          <div class="mt-6 lg:mt-0">
            <div class="md:w-3/4 xl:w-1/2">
              <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <!-- Email Input -->
                <input
                  type="email"
                  class="flex w-full border border-input px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex-grow bg-white text-base h-12"
                  placeholder="Email Address" 
                  aria-label="Email Address" 
                  name="newsletter_email"
                  required
                />
                <!-- Submit Button -->
                <button
                  class="inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 px-4 py-2 rounded-lg bg-primary text-white text-base h-12"
                  type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default {
  title: 'Editorial/Newsletter',
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the newsletter',
    },
    pre_headline: {
      control: 'text',
      description: 'Pre-headline text above the main title',
    },
    summary: {
      control: 'text',
      description: 'Summary text of the newsletter',
    },
    modifier: {
      control: 'text',
      description: 'Modifier class for the newsletter container',
    },
  },
};

const renderNewsletterForm = (args) => {
  return newsletterFormTemplate(args);
};

export const Default = {
  render: renderNewsletterForm,
  args: {
    title: 'Sign up for our newsletter',
    summary: 'Stay updated with our latest news and updates.',
    modifier: 'container mx-auto px-8',
  },
};

export const WithPreHeadline = {
  render: renderNewsletterForm,
  args: {
    pre_headline: 'Stay Connected',
    title: 'Get the latest updates',
    summary: 'Be the first to know about our newest features and updates.',
    modifier: '',
  },
};

export const Minimal = {
  render: renderNewsletterForm,
  args: {
    title: 'Newsletter',
    summary: 'Subscribe to stay informed.',
    modifier: '',
  },
};
