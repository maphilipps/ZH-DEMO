import { renderHeading, renderButton } from '../../.storybook/component-helpers.js';

// Create a proper text block template function that renders actual HTML
const textBlockTemplate = (args) => {
  const {
    pre_headline = '',
    eyebrow = '',
    title = '',
    heading = null,
    body = '',
    link = null,
    link2 = null,
    text_layout = 'left',
    className = ''
  } = args;

  // Use eyebrow as pre_headline if provided for backward compatibility
  const actualPreHeadline = pre_headline || eyebrow;

  // Render content function
  const renderContent = (preHeadline, titleText, bodyText) => {
    let content = '';

    // Pre-headline
    if (preHeadline) {
      content += renderHeading({
        title: preHeadline,
        as: 'span',
        custom_classes: 'mb-4 text-2xl font-bold tracking-tight leading-none text-gray-900'
      });
    }

    // Title
    if (titleText) {
      content += renderHeading({
        title: titleText,
        as: 'h2',
        custom_classes: 'text-3xl font-bold'
      });
    }

    // Body
    if (bodyText) {
      content += `
        <div class="format lg:format-lg mt-4">
          ${bodyText}
        </div>
      `;
    }

    return content;
  };

  // Render buttons function
  const renderButtons = (link1, link2, layout) => {
    if ((!link1 || !link1.url) && (!link2 || !link2.url)) {
      return '';
    }

    let buttonContainerClasses = 'text-buttons mt-6 flex';

    if (layout === 'centered') {
      buttonContainerClasses += ' justify-center';
    } else if (layout === 'buttons-right') {
      buttonContainerClasses += ' justify-start lg:justify-end';
    } else {
      buttonContainerClasses += ' justify-start';
    }

    let buttons = '';

    if (link1 && link1.url) {
      buttons += renderButton({
        url: link1.url,
        text: link1.text || 'Read more',
        variant: 'default',
        modifier: 'text-primary-link mr-4'
      });
    }

    if (link2 && link2.url) {
      buttons += renderButton({
        url: link2.url,
        text: link2.text || 'Read more',
        variant: 'secondary',
        modifier: 'text-secondary-link'
      });
    }

    return `<div class="${buttonContainerClasses}">${buttons}</div>`;
  };

  // Determine which title to use - heading object overrides title string
  const displayTitle = heading ? heading.title || '' : title;

  // Build the content based on layout
  if (text_layout === 'buttons-right') {
    return `
      <div class="text-container ${className}">
        <div class="lg:flex lg:items-start lg:justify-between">
          <div class="max-w-4xl lg:flex-grow">
            ${renderContent(actualPreHeadline, displayTitle, body)}
          </div>
          ${(link && link.url) || (link2 && link2.url) ? `
            <div class="lg:ml-8 lg:flex-shrink-0 lg:self-start">
              ${renderButtons(link, link2, text_layout)}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  } else {
    const centeredClass = text_layout === 'centered' ? ' mx-auto text-center' : '';
    
    return `
      <div class="text-container ${className}">
        <div class="max-w-4xl${centeredClass}">
          ${renderContent(actualPreHeadline, displayTitle, body)}
          ${renderButtons(link, link2, text_layout)}
        </div>
      </div>
    `;
  }
};

export default {
  title: 'Editorial/Text Block',
  argTypes: {
    eyebrow: {
      control: 'text',
      description: 'Optional eyebrow text displayed above the title (legacy)'
    },
    pre_headline: {
      control: 'text',
      description: 'Optional pre-headline text displayed above the title'
    },
    title: {
      control: 'text',
      description: 'Main title of the text block'
    },
    heading: {
      control: 'object',
      description: 'Optional heading object that overrides the title'
    },
    body: {
      control: 'text',
      description: 'Main content of the text block'
    },
    link: {
      control: 'object',
      description: 'Primary button/link configuration'
    },
    link2: {
      control: 'object',
      description: 'Secondary button/link configuration'
    },
    text_layout: {
      control: 'select',
      options: ['left', 'centered', 'buttons-right'],
      description: 'Layout configuration for the text block'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the container'
    }
  }
};

const renderTextBlock = (args) => {
  return textBlockTemplate(args);
};

export const Default = {
  render: renderTextBlock,
  args: {
    eyebrow: 'Test eyebrow',
    title: 'Title Lorem Ipsum Dolor',
    body: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mauris mi, aliquam in orci at, finibus malesuada elit. Vivamus ex ante, imperdiet nec odio ac, sollicitudin fermentum velit.</p>',
    link: {
      url: '#',
      text: 'Read more'
    },
    link2: {
      url: '#',
      text: 'Learn more'
    },
    text_layout: 'left',
    className: ''
  },
};

export const Centered = {
  render: renderTextBlock,
  args: {
    pre_headline: 'About Us',
    title: 'Centered Text Layout',
    body: '<p>This text block uses centered layout with both title and content aligned in the center. Perfect for hero sections or call-to-action areas.</p>',
    link: {
      url: '#',
      text: 'Get Started'
    },
    text_layout: 'centered'
  },
};

export const ButtonsRight = {
  render: renderTextBlock,
  args: {
    pre_headline: 'Features',
    title: 'Advanced Layout Options',
    body: '<p>This layout places the content on the left and buttons on the right on larger screens, creating a nice balanced composition for feature descriptions.</p>',
    link: {
      url: '#',
      text: 'Learn More'
    },
    link2: {
      url: '#',
      text: 'View Demo'
    },
    text_layout: 'buttons-right'
  },
};

export const NoLinks = {
  render: renderTextBlock,
  args: {
    pre_headline: 'Information',
    title: 'Text Only Block',
    body: '<p>This text block contains only content without any action buttons. Ideal for informational content or descriptions.</p>',
    text_layout: 'left',
  },
};

export const SingleLink = {
  render: renderTextBlock,
  args: {
    pre_headline: 'Call to Action',
    title: 'Single Button Example',
    body: '<p>Sometimes you only need one primary action. This example shows a text block with a single call-to-action button.</p>',
    link: {
      url: '#',
      text: 'Take Action'
    },
    text_layout: 'left'
  },
};

export const WithHeadingObject = {
  render: renderTextBlock,
  args: {
    pre_headline: 'Advanced',
    heading: {
      title: 'Custom Heading Object',
      as: 'h1',
      visual_level: '1'
    },
    body: '<p>This example uses a heading object instead of a simple title string, allowing for more control over the heading element and styling.</p>',
    link: {
      url: '#',
      text: 'Explore More'
    },
    text_layout: 'left'
  },
};
