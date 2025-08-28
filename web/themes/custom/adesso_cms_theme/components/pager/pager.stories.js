// phpcs:ignoreFile

import Component from './pager.twig';

const meta = {
  title: 'Navigation/Pager',
  component: Component,
  argTypes: {
    heading_id: {
      name: 'Heading ID',
      description: 'Define the heading id attribute',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    current: {
      name: 'Current',
      description: 'Current page number (1-based index)',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    items: {
      name: 'Items',
      description: 'Define the pager items',
      control: { type: 'object' },
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    parameters: {
      name: 'Parameters',
      description: 'Additional URL parameters',
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
Accessible pagination component for navigating through multiple pages of content with previous/next links, page numbers, and ellipsis handling for large page sets.

## TWIG Usage

\`\`\`twig
{# Basic pagination #}
{% include 'sdc:pager' with {
  heading_id: 'content-pagination',
  current: 2,
  items: {
    previous: {
      href: '/page/1',
      title: 'Go to previous page'
    },
    next: {
      href: '/page/3',
      title: 'Go to next page'
    },
    pages: {
      1: { href: '/page/1' },
      2: { href: '/page/2' },
      3: { href: '/page/3' },
      4: { href: '/page/4' },
      5: { href: '/page/5' }
    },
    ellipses: {}
  }
} %}

{# Search results pagination with query parameters #}
{% include 'sdc:pager' with {
  heading_id: 'search-pagination',
  current: 3,
  items: {
    previous: {
      href: '/search?q=drupal&page=2',
      title: 'Go to previous page'
    },
    next: {
      href: '/search?q=drupal&page=4',
      title: 'Go to next page'
    },
    pages: {
      1: { href: '/search?q=drupal&page=1' },
      2: { href: '/search?q=drupal&page=2' },
      3: { href: '/search?q=drupal&page=3' },
      4: { href: '/search?q=drupal&page=4' },
      5: { href: '/search?q=drupal&page=5' }
    },
    ellipses: {}
  },
  parameters: 'q=drupal'
} %}

{# Large page set with ellipsis #}
{% include 'sdc:pager' with {
  heading_id: 'blog-pagination',
  current: 7,
  items: {
    previous: {
      href: '/blog/page/6',
      title: 'Go to previous page'
    },
    next: {
      href: '/blog/page/8',
      title: 'Go to next page'
    },
    pages: {
      1: { href: '/blog/page/1' },
      6: { href: '/blog/page/6' },
      7: { href: '/blog/page/7' },
      8: { href: '/blog/page/8' },
      12: { href: '/blog/page/12' }
    },
    ellipses: {
      1: true,
      8: true
    }
  }
} %}

{# First page (no previous link) #}
{% include 'sdc:pager' with {
  heading_id: 'first-page-pagination',
  current: 1,
  items: {
    next: {
      href: '/page/2',
      title: 'Go to next page'
    },
    pages: {
      1: { href: '/page/1' },
      2: { href: '/page/2' },
      3: { href: '/page/3' }
    },
    ellipses: {}
  }
} %}

{# Last page (no next link) #}
{% include 'sdc:pager' with {
  heading_id: 'last-page-pagination',
  current: 5,
  items: {
    previous: {
      href: '/page/4',
      title: 'Go to previous page'
    },
    pages: {
      3: { href: '/page/3' },
      4: { href: '/page/4' },
      5: { href: '/page/5' }
    },
    ellipses: {}
  }
} %}

{# Single page (no pagination needed) #}
{% include 'sdc:pager' with {
  heading_id: 'single-page-pagination',
  current: 1,
  items: {
    pages: {
      1: { href: '/page/1' }
    },
    ellipses: {}
  }
} %}

{# Product catalog with filtering parameters #}
{% include 'sdc:pager' with {
  heading_id: 'products-pagination',
  current: 1,
  items: {
    next: {
      href: '/products/category/electronics?page=2&per_page=20',
      title: 'Go to next page'
    },
    pages: {
      1: { href: '/products/category/electronics?page=1&per_page=20' },
      2: { href: '/products/category/electronics?page=2&per_page=20' },
      3: { href: '/products/category/electronics?page=3&per_page=20' }
    },
    ellipses: {}
  },
  parameters: 'category=electronics&per_page=20'
} %}

{# Integration with Drupal Views #}
{% include 'sdc:pager' with {
  heading_id: 'view-pagination',
  current: pager.current_page,
  items: pager.items,
  parameters: request.query_string
} %}
\`\`\`

## Features
- **Accessibility**: ARIA labels, semantic navigation, keyboard support
- **Responsive Design**: Mobile-first with adaptive page number display
- **URL Preservation**: Maintains query parameters across pages
- **Ellipsis Handling**: Smart truncation for large page sets
- **Previous/Next Navigation**: Always available when applicable

## Item Structure
- **pages**: Object with page numbers as keys and href objects as values
- **previous**: Object with href and title for previous page link
- **next**: Object with href and title for next page link
- **ellipses**: Object marking positions where ellipsis should appear

## Use Cases
- **Content Listing**: Blog posts, news articles, product catalogs
- **Search Results**: Paginated search with query preservation
- **Archive Pages**: Date-based content organization
- **Admin Interfaces**: Data tables and management listings
        `,
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;

export const Pager = {
  parameters: {
    layout: 'padded',
  },
  args: {
    heading_id: 'pagination-default',
    current: 2,
    items: {
      previous: {
        href: '/page/1',
        title: 'Go to previous page',
      },
      next: {
        href: '/page/3',
        title: 'Go to next page',
      },
      pages: {
        1: { href: '/page/1' },
        2: { href: '/page/2' },
        3: { href: '/page/3' },
        4: { href: '/page/4' },
        5: { href: '/page/5' },
      },
      ellipses: {},
    },
    parameters: '',
  },
};

export const FirstPage = {
  args: {
    ...Pager.args,
    heading_id: 'pagination-first',
    current: 1,
    items: {
      next: {
        href: '/page/2',
        title: 'Go to next page',
      },
      pages: {
        1: { href: '/page/1' },
        2: { href: '/page/2' },
        3: { href: '/page/3' },
        4: { href: '/page/4' },
        5: { href: '/page/5' },
      },
      ellipses: {},
    },
  },
};

export const LastPage = {
  args: {
    ...Pager.args,
    heading_id: 'pagination-last',
    current: 5,
    items: {
      previous: {
        href: '/page/4',
        title: 'Go to previous page',
      },
      pages: {
        1: { href: '/page/1' },
        2: { href: '/page/2' },
        3: { href: '/page/3' },
        4: { href: '/page/4' },
        5: { href: '/page/5' },
      },
      ellipses: {},
    },
  },
};

export const ManyPages = {
  args: {
    ...Pager.args,
    heading_id: 'pagination-many',
    current: 5,
    items: {
      previous: {
        href: '/page/4',
        title: 'Go to previous page',
      },
      next: {
        href: '/page/6',
        title: 'Go to next page',
      },
      pages: {
        1: { href: '/page/1' },
        2: { href: '/page/2' },
        4: { href: '/page/4' },
        5: { href: '/page/5' },
        6: { href: '/page/6' },
        9: { href: '/page/9' },
        10: { href: '/page/10' },
      },
      ellipses: {
        2: true,
        6: true,
      },
    },
  },
};

export const SinglePage = {
  args: {
    ...Pager.args,
    heading_id: 'pagination-single',
    current: 1,
    items: {
      pages: {
        1: { href: '/page/1' },
      },
      ellipses: {},
    },
  },
};

/**
 * Search results pagination
 */
export const SearchResults = {
  args: {
    heading_id: 'search-pagination',
    current: 3,
    items: {
      previous: {
        href: '/search?q=drupal&page=2',
        title: 'Go to previous page',
      },
      next: {
        href: '/search?q=drupal&page=4',
        title: 'Go to next page',
      },
      pages: {
        1: { href: '/search?q=drupal&page=1' },
        2: { href: '/search?q=drupal&page=2' },
        3: { href: '/search?q=drupal&page=3' },
        4: { href: '/search?q=drupal&page=4' },
        5: { href: '/search?q=drupal&page=5' },
        6: { href: '/search?q=drupal&page=6' },
      },
      ellipses: {},
    },
    parameters: 'q=drupal',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Search results pagination with query parameters preserved in URLs.',
      },
    },
  },
};

/**
 * Blog archive pagination
 */
export const BlogArchive = {
  args: {
    heading_id: 'blog-pagination',
    current: 7,
    items: {
      previous: {
        href: '/blog/archive/2024/page/6',
        title: 'Go to previous page',
      },
      next: {
        href: '/blog/archive/2024/page/8',
        title: 'Go to next page',
      },
      pages: {
        1: { href: '/blog/archive/2024/page/1' },
        6: { href: '/blog/archive/2024/page/6' },
        7: { href: '/blog/archive/2024/page/7' },
        8: { href: '/blog/archive/2024/page/8' },
        12: { href: '/blog/archive/2024/page/12' },
      },
      ellipses: {
        1: true,
        8: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Blog archive pagination showing middle page with ellipsis on both sides.',
      },
    },
  },
};

/**
 * Product catalog pagination
 */
export const ProductCatalog = {
  args: {
    heading_id: 'products-pagination',
    current: 1,
    items: {
      next: {
        href: '/products/category/electronics?page=2&per_page=20',
        title: 'Go to next page',
      },
      pages: {
        1: { href: '/products/category/electronics?page=1&per_page=20' },
        2: { href: '/products/category/electronics?page=2&per_page=20' },
        3: { href: '/products/category/electronics?page=3&per_page=20' },
        4: { href: '/products/category/electronics?page=4&per_page=20' },
        8: { href: '/products/category/electronics?page=8&per_page=20' },
      },
      ellipses: {
        4: true,
      },
    },
    parameters: 'category=electronics&per_page=20',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Product catalog pagination with category filtering and per-page parameters.',
      },
    },
  },
};

/**
 * News archive with many pages
 */
export const NewsArchive = {
  args: {
    heading_id: 'news-pagination',
    current: 15,
    items: {
      previous: {
        href: '/news/archive/page/14',
        title: 'Go to previous page',
      },
      next: {
        href: '/news/archive/page/16',
        title: 'Go to next page',
      },
      pages: {
        1: { href: '/news/archive/page/1' },
        14: { href: '/news/archive/page/14' },
        15: { href: '/news/archive/page/15' },
        16: { href: '/news/archive/page/16' },
        25: { href: '/news/archive/page/25' },
      },
      ellipses: {
        1: true,
        16: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'News archive with current page in middle of large page set, showing ellipsis handling.',
      },
    },
  },
};

/**
 * Accessibility demonstration
 */
export const AccessibilityDemo = {
  render: () => `
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Semantic Structure</h3>
        <nav class="flex items-center justify-between" role="navigation" aria-labelledby="demo-heading">
          <h4 id="demo-heading" class="sr-only">Pagination</h4>
          
          <div class="flex-1 flex justify-between sm:justify-start">
            <a href="/page/1" title="Go to previous page" rel="prev" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Previous
            </a>
          </div>
          
          <div class="hidden md:flex">
            <a href="/page/1" class="relative inline-flex items-center px-4 py-2 mx-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium">
              <span class="sr-only">Page</span>
              1
            </a>
            <span class="relative inline-flex items-center px-4 py-2 mx-1 border text-sm font-medium z-10 bg-primary text-white border-primary">
              <span class="sr-only">Current page</span>
              2
            </span>
            <a href="/page/3" class="relative inline-flex items-center px-4 py-2 mx-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium">
              <span class="sr-only">Page</span>
              3
            </a>
          </div>
          
          <div class="flex-1 flex justify-end">
            <a href="/page/3" title="Go to next page" rel="next" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Next
              <svg class="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
          </div>
        </nav>
        <p class="text-sm text-gray-600">Screen readers hear: "Pagination navigation, Previous page link, Page 1 link, Current page 2, Page 3 link, Next page link"</p>
      </div>
      
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Keyboard Navigation</h3>
        <p class="text-sm text-gray-600">Tab through pagination links, Enter or Space to activate. Previous/Next have proper focus indicators.</p>
      </div>
      
      <div class="space-y-4">  
        <h3 class="text-lg font-semibold">Responsive Display</h3>
        <p class="text-sm text-gray-600">Page numbers hidden on mobile, visible on desktop (md breakpoint and up).</p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Accessibility features including semantic structure, screen reader support, and keyboard navigation.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'aria-valid-attr-value', options: { validateNullAttr: true } },
          { id: 'keyboard-navigation', options: { focusable: true } },
          { id: 'aria-hidden-focus', options: { selector: 'nav' } },
        ],
      },
    },
  },
};

/**
 * Development playground for testing
 */
export const Playground = {
  args: {
    heading_id: 'pagination-playground',
    current: 3,
    items: {
      previous: {
        href: '/page/2',
        title: 'Go to previous page',
      },
      next: {
        href: '/page/4',
        title: 'Go to next page',
      },
      pages: {
        1: { href: '/page/1' },
        2: { href: '/page/2' },
        3: { href: '/page/3' },
        4: { href: '/page/4' },
        5: { href: '/page/5' },
      },
      ellipses: {},
    },
    parameters: '',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground for testing pagination configurations and edge cases.',
      },
    },
  },
};
