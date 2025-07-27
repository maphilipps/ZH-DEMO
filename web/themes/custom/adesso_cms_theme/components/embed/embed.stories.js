import { renderHeading } from '../../.storybook/component-helpers.js';

// Create a proper embed template function that renders actual HTML
const embedTemplate = (args) => {
  const {
    title = '',
    pre_headline = '',
    embed = '',
    modifier = ''
  } = args;

  // Render headings using helper
  const preHeadlineHtml = pre_headline ? renderHeading({
    title: pre_headline,
    as: 'span',
    visual_level: '3',
    custom_classes: 'block mb-4 font-bold text-2xl tracking-tight text-center leading-none'
  }) : '';

  const titleHtml = title ? renderHeading({
    title: title,
    as: 'h2',
    custom_classes: 'text-3xl font-bold text-center mb-6 md:mb-8'
  }) : '';

  return `
    <div class="py-4 px-4 mx-auto max-w-screen-xl lg:py-16 border bg-card text-card-foreground border-none shadow-none">
      ${preHeadlineHtml}
      ${titleHtml}
      <div>
        <div class="prose max-w-none [&_iframe]:w-full [&_iframe]:max-w-full">
          ${embed}
        </div>
      </div>
    </div>
  `;
};

// Mock content for the embed (Google Maps iframe)
const mockContent = `
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50704.05332036616!2d-122.12246645666515!3d37.413396126075966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7495bec0189%3A0x7c17d44a466baf9b!2sMountain%20View%2C%20CA!5e0!3m2!1sen!2sus!4v1716313314254!5m2!1sen!2sus"
    width="600"
    height="450"
    style="border:0;"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    title="Sample Google Map for Storybook">
  </iframe>
`;

const youtubeContent = `
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
`;

export default {
  title: 'Editorial/Embed',
  argTypes: {
    title: {
      description: 'Title for the embed',
      control: 'text',
      defaultValue: '',
    },
    pre_headline: {
      description: 'Pre-headline text above the main title',
      control: 'text',
    },
    embed: {
      description: 'Define the embedded item',
      control: 'text',
      type: { required: true },
    },
    modifier: {
      control: 'text',
      description: 'Modifier class for the embed component',
    },
  },
};

const renderEmbed = (args) => {
  return embedTemplate(args);
};

export const Default = {
  render: renderEmbed,
  args: {
    embed: mockContent,
    modifier: '',
  },
};

export const WithTitle = {
  render: renderEmbed,
  args: {
    title: "Our Location",
    embed: mockContent,
    modifier: '',
  },
};

export const WithPreHeadline = {
  render: renderEmbed,
  args: {
    pre_headline: "Find Us",
    title: "Visit Our Office",
    embed: mockContent,
    modifier: '',
  },
};

export const YouTubeEmbed = {
  render: renderEmbed,
  args: {
    title: "Featured Video",
    embed: youtubeContent,
    modifier: '',
  },
};

export const WithCustomClassName = {
  render: renderEmbed,
  args: {
    title: "Custom Styled Embed",
    embed: mockContent,
    modifier: 'bg-gray-100 p-4',
  },
};
