import { renderHeading, renderButton } from '../../.storybook/component-helpers.js';

function renderStatCard(statCard) {
  const { heading = '', body = '', icon = '', media = '', layout = 'left', border = false } = statCard;
  
  const borderClass = border ? 'border border-border' : '';
  const alignmentClass = layout === 'center' ? 'text-center' : '';
  
  const mediaHtml = media ? `<div class="mb-4">${media}</div>` : '';
  const iconHtml = icon ? `<i data-lucide="${icon}" class="w-6 h-6 mb-4"></i>` : '';
  const headingHtml = heading ? `<h3 class="text-lg font-semibold mb-2">${heading}</h3>` : '';
  const bodyHtml = body ? `<p class="text-sm text-muted-foreground">${body}</p>` : '';
  
  return `
    <div class="p-4 ${borderClass} ${alignmentClass}">
      ${mediaHtml}
      ${iconHtml}
      ${headingHtml}
      ${bodyHtml}
    </div>
  `;
}

function renderSideBySide(args) {
  const {
    pre_headline = '',
    title = '',
    text = '',
    media = '',
    features = [],
    link = null,
    layout = 'left',
    modifier = 'container'
  } = args;

  // Determine layout classes
  const layoutClasses = layout === 'right' ? ' lg:flex-row-reverse' : '';
  
  // Render pre-headline
  const preHeadlineHtml = pre_headline ? renderHeading({
    title: pre_headline,
    as: 'span',
    visual_level: '3',
    custom_classes: 'block mb-2 font-bold text-2xl tracking-tight leading-none'
  }) : '';

  // Render title
  const titleHtml = title ? renderHeading({
    title: title,
    as: 'h2',
    custom_classes: 'text-3xl font-bold'
  }) : '';

  // Render text content
  const textHtml = text ? `<div class="mb-2 lg:mb-4">${text}</div>` : '';

  // Render features
  let featuresHtml = '';
  if (features && features.length > 0) {
    const isStatType = features[0].type === 'stats_item';
    const containerClasses = isStatType ? 'flex flex-col sm:flex-row gap-4 mb-6' : 'mb-6 space-y-4';
    
    const featuresContent = features.map(feature => {
      if (feature.type === 'stats_item') {
        return renderStatCard({
          heading: feature.heading || '',
          body: feature.body || '',
          icon: feature.icon || '',
          media: feature.media || '',
          layout: 'left',
          border: false
        });
      } else {
        return `
          <div class="flex items-start gap-4">
            <i data-lucide="${feature.icon || ''}" width="24" height="24" class="mt-[-2px]"></i>
            <span class="flex-1">${feature.summary || ''}</span>
          </div>
        `;
      }
    }).join('');
    
    featuresHtml = `<div class="${containerClasses}">${featuresContent}</div>`;
  }

  // Render CTA button
  const ctaHtml = link && link.url ? `
    <div class="flex">
      ${renderButton({
        url: link.url,
        text: link.title || 'Read more',
        modifier: 'btn-default'
      })}
    </div>
  ` : '';

  return `
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-6 ${modifier}${layoutClasses}">
      <div class="w-full lg:w-1/2">
        ${media}
      </div>
      <div class="w-full lg:w-1/2 xl:w-5/12 flex flex-col gap-4">
        ${preHeadlineHtml}
        ${titleHtml}
        ${textHtml}
        ${featuresHtml}
        ${ctaHtml}
      </div>
    </div>
  `;
}

export default {
  title: 'Editorial/Side-by-Side',
  render: renderSideBySide,
  tags: ['autodocs'],
  argTypes: {
    pre_headline: {
      description: 'Pre-headline text above the main title',
      control: 'text'
    },
    title: {
      description: 'Side-by-Side title',
      control: 'text'
    },
    media: {
      description: 'Side-by-Side image or video markup',
      control: 'text'
    },
    text: {
      description: 'Side-by-Side body text',
      control: 'text'
    },
    features: {
      description: 'Array of features or stat cards',
      control: 'object'
    },
    link: {
      description: 'Call to action',
      control: 'object'
    },
    layout: {
      description: 'Controls image left/right placement',
      control: 'select',
      options: ['left', 'right']
    },
    modifier: {
      description: 'Additional classes for the component',
      control: 'text'
    }
  }
};

const mockMedia = '<img src="./images/card.webp" alt="Example image" width="1280" height="720" />';

const mockSideBySide = {
  title: 'Side by Side Component',
  summary: '<p>This is a sample summary for the side-by-side component.</p>',
  link: {
    url: 'https://example.com',
    title: 'Learn More'
  },
  media: mockMedia,
  layout: 'left',
  modifier: ''
};

export const Default = {
  args: {
    ...mockSideBySide
  }
};

export const RightLayout = {
  args: {
    ...mockSideBySide,
    layout: 'right'
  }
};

const mockStat1 = {
  type: 'stats_item',
  media: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z" /><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z" /></svg>',
  heading: 'Decoupled Architecture',
  body: 'Build flexible applications that separate the front-end and back-end for optimal performance.'
};

const mockStat2 = {
  type: 'stats_item',
  media: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z" /><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z" /></svg>',
  heading: 'AI Optimization',
  body: 'Leverage intelligent algorithms to enhance site speed and user experience effortlessly.'
};

export const WithStatCards = {
  args: {
    title: 'Discover the Unmatched Advantages of Choosing DrupalX for Your Development Needs',
    text: '<p>DrupalX combines the power of decoupled architecture with AI-driven optimization to enhance your web projects. Experience lightning-fast performance and intuitive design tools that simplify your workflow.</p>',
    layout: 'right',
    media: mockMedia,
    features: [mockStat1, mockStat2],
    modifier: ''
  }
};
