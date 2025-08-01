// phpcs:ignoreFile

import Component from './recent-cards.twig';

const meta = {
  title: 'Editorial/RecentCards',
  component: Component,
  argTypes: {
    content: {
      name: 'Content',
      description: 'Drupal content object with rendered fields',
      control: { type: 'object' },
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    label: {
      name: 'Label',
      description: 'Content label/title',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    url: {
      name: 'URL',
      description: 'Content URL',
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
Recent cards component for displaying a grid of recent content with thumbnails and summaries.

## TWIG Usage

\`\`\`twig
{# Basic recent cards #}
{% include 'sdc:recent-cards' with {
  content: {
    field_thumbnail: '<img src="/images/thumbnail.jpg" alt="Thumbnail" class="w-full h-48 object-cover">',
    field_summary: '<p>Recent content summary text goes here.</p>'
  },
  label: 'Latest Article',
  url: '/articles/latest-article'
} %}

{# With Drupal content object #}
{% include 'sdc:recent-cards' with {
  content: node,
  label: node.title.value,
  url: path('entity.node.canonical', {'node': node.id})
} %}

{# In a view template #}
{% for item in view.result %}
  {% include 'sdc:recent-cards' with {
    content: item._entity,
    label: item._entity.title.value,
    url: path('entity.node.canonical', {'node': item._entity.id})
  } %}
{% endfor %}
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Default recent card
export const Default = {
  parameters: {
    layout: 'padded',
  },
  args: {
    content: {
      field_thumbnail: '<img src="https://picsum.photos/400/300?random=1" alt="Article thumbnail" class="w-full h-48 object-cover rounded-lg">',
      field_summary: '<p>Discover the latest trends in web development and how they can benefit your business. Our comprehensive guide covers everything you need to know.</p>'
    },
    label: 'Latest Web Development Trends',
    url: '/articles/web-development-trends',
  },
};

// Blog post card
export const BlogPost = {
  args: {
    content: {
      field_thumbnail: '<img src="https://picsum.photos/400/300?random=2" alt="Blog post" class="w-full h-48 object-cover rounded-lg">',
      field_summary: '<p>Learn how to optimize your website for better performance and user experience with these proven techniques and best practices.</p>'
    },
    label: 'Website Optimization Guide',
    url: '/blog/website-optimization-guide',
  },
};

// News article card
export const NewsArticle = {
  args: {
    content: {
      field_thumbnail: '<img src="https://picsum.photos/400/300?random=3" alt="News article" class="w-full h-48 object-cover rounded-lg">',
      field_summary: '<p>Industry news and updates on the latest developments in technology and digital transformation.</p>'
    },
    label: 'Tech Industry Update',
    url: '/news/tech-industry-update',
  },
};

// Case study card
export const CaseStudy = {
  args: {
    content: {
      field_thumbnail: '<img src="https://picsum.photos/400/300?random=4" alt="Case study" class="w-full h-48 object-cover rounded-lg">',
      field_summary: '<p>How we helped a major retailer increase their online sales by 150% through strategic digital transformation.</p>'
    },
    label: 'E-commerce Success Story',
    url: '/case-studies/ecommerce-success',
  },
};

// Without thumbnail
export const NoThumbnail = {
  args: {
    content: {
      field_thumbnail: '',
      field_summary: '<p>This content card demonstrates how the component works without a thumbnail image. The layout adapts gracefully.</p>'
    },
    label: 'Text-Only Content',
    url: '/articles/text-only-content',
  },
};

// Long title and summary
export const LongContent = {
  args: {
    content: {
      field_thumbnail: '<img src="https://picsum.photos/400/300?random=5" alt="Long content" class="w-full h-48 object-cover rounded-lg">',
      field_summary: '<p>This is an example of how the component handles longer content. The summary can be quite detailed and the title can also be significantly longer than usual. This tests the layout flexibility and ensures proper text wrapping and spacing.</p>'
    },
    label: 'Complete Guide to Modern Web Development with Advanced Techniques and Best Practices',
    url: '/guides/complete-web-development-guide',
  },
};

// Playground for testing all properties
export const Playground = {
  args: {
    content: {
      field_thumbnail: '<img src="https://picsum.photos/400/300?random=1" alt="Test content" class="w-full h-48 object-cover rounded-lg">',
      field_summary: '<p>Test summary content for the recent cards component.</p>'
    },
    label: 'Test Card Title',
    url: '#',
  },
};