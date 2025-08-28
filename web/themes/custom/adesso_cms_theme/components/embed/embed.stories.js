// phpcs:ignoreFile

import Component from './embed.twig';

const meta = {
  title: 'Editorial/Embed',
  component: Component,
  argTypes: {
    title: {
      name: 'Title',
      description: 'Title for the embed',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    pre_headline: {
      name: 'Pre-headline',
      description: 'Pre-headline text above the main title',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    embed: {
      name: 'Embed Content',
      description: 'Define the embedded item',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    modifier: {
      name: 'Modifier Classes',
      description: 'Modifier class for the embed component',
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
Versatile embed component for integrating external content like videos, maps, forms, and other HTML embeds with optional title and pre-headline.

## TWIG Usage

\`\`\`twig
{# YouTube video embed #}
{% include 'sdc:embed' with {
  title: 'Product Introduction Video',
  pre_headline: 'Watch Now',
  embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
} %}

{# Google Maps embed #}
{% include 'sdc:embed' with {
  title: 'Visit Our Office',
  pre_headline: 'Location',
  embed: '<iframe src="https://www.google.com/maps/embed?pb=MAP_EMBED_CODE" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
} %}

{# Contact form embed #}
{% include 'sdc:embed' with {
  title: 'Get In Touch',
  pre_headline: 'Contact',
  embed: contact_form_html_content
} %}

{# Newsletter signup #}
{% include 'sdc:embed' with {
  title: 'Stay Connected',
  pre_headline: 'Newsletter',
  embed: newsletter_signup_form
} %}

{# Without title and pre-headline #}
{% include 'sdc:embed' with {
  embed: embedded_content_only
} %}

{# With custom styling #}
{% include 'sdc:embed' with {
  title: 'Featured Content',
  pre_headline: 'Special',
  embed: featured_html_content,
  modifier: 'border-l-4 border-blue-500 bg-blue-50'
} %}

{# Social media embed #}
{% include 'sdc:embed' with {
  title: 'Follow Our Updates',
  pre_headline: 'Social Media',
  embed: '<blockquote class="twitter-tweet">TWITTER_EMBED_CODE</blockquote>'
} %}
\`\`\`

## Features
- **Flexible Content**: Supports any HTML embed code
- **Optional Headers**: Title and pre-headline for context
- **Responsive Design**: Adapts to container width
- **Custom Styling**: Modifier classes for visual customization
- **Accessibility**: Proper semantic structure

## Common Use Cases
- **Video Embeds**: YouTube, Vimeo, custom video players
- **Maps**: Google Maps, OpenStreetMap embeds
- **Forms**: Contact forms, newsletter signups, surveys
- **Social Media**: Twitter tweets, Instagram posts, Facebook content
- **Interactive Content**: Calendars, widgets, third-party tools
        `,
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;

export const Embed = {
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Company Overview Video',
    pre_headline: 'Watch Now',
    embed:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
  },
};

export const VimeoVideo = {
  args: {
    ...Embed.args,
    title: 'Product Demo',
    pre_headline: 'Learn More',
    embed:
      '<iframe src="https://player.vimeo.com/video/148751763?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="560" height="315" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Vimeo video player"></iframe>',
  },
};

export const GoogleMaps = {
  args: {
    ...Embed.args,
    title: 'Visit Our Office',
    pre_headline: 'Location',
    embed:
      '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2424.4582368354847!2d13.404953916013648!3d52.520007479813405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c655f20989%3A0x26bbfb4e84674c63!2sBrandenburger%20Tor!5e0!3m2!1sen!2sde!4v1635789012345!5m2!1sen!2sde" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
};

export const ContactForm = {
  args: {
    ...Embed.args,
    title: 'Get In Touch',
    pre_headline: 'Contact Us',
    embed:
      '<form class="max-w-md mx-auto space-y-4"><div><label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label><input type="text" id="name" name="name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></div><div><label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" id="email" name="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></div><div><label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label><textarea id="message" name="message" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea></div><button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Send Message</button></form>',
  },
};

export const NewsletterSignup = {
  args: {
    ...Embed.args,
    title: 'Stay Updated',
    pre_headline: 'Newsletter',
    embed:
      '<div class="max-w-md mx-auto"><p class="text-gray-600 mb-6 text-center">Subscribe to our newsletter for the latest updates and insights.</p><form class="space-y-4"><div><label for="newsletter-email" class="sr-only">Email address</label><input type="email" id="newsletter-email" name="email" placeholder="Enter your email address" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></div><button type="submit" class="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-medium">Subscribe Now</button></form><p class="text-sm text-gray-500 mt-4 text-center">We respect your privacy. Unsubscribe at any time.</p></div>',
  },
};

export const WithoutTitle = {
  args: {
    ...Embed.args,
    title: '',
    pre_headline: '',
  },
};

export const WithModifier = {
  args: {
    ...Embed.args,
    title: 'Featured Content',
    pre_headline: 'Spotlight',
    modifier: 'border-l-4 border-yellow-500',
  },
};
