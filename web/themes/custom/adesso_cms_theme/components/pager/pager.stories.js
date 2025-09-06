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
        `
      }
    }
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
        story: 'Search results pagination with query parameters preserved in URLs.',
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
        story: 'Blog archive pagination showing middle page with ellipsis on both sides.',
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
        story: 'Product catalog pagination with category filtering and per-page parameters.',
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
        story: 'News archive with current page in middle of large page set, showing ellipsis handling.',
      },
    },
  },
};

/**
 * Swiss Government Accessibility Demonstration
 * Showcases eCH-0059 compliance features and municipal branding
 */
export const SwissAccessibilityDemo = {
  render: () => `
    <div class="space-y-12">
      <div class="space-y-6">
        <h3 class="text-xl font-bold text-gray-900">eCH-0059 Accessibility Compliance Features</h3>
        
        <!-- Enhanced Focus Indicators Demo -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-gray-800">Enhanced Focus Indicators</h4>
          <nav class="flex items-center justify-between" role="navigation" aria-labelledby="focus-demo-heading" data-pager-nav>
            <h4 id="focus-demo-heading" class="sr-only">Focus Demo Pagination</h4>
            <div id="focus-demo-heading-description" class="sr-only">
              Navigate through multiple pages with enhanced Swiss accessibility focus rings
            </div>
            
            <div class="flex-1 flex justify-between sm:justify-start">
              <a href="/page/1" rel="prev" aria-label="Go to previous page" 
                 class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Previous
              </a>
            </div>
            
            <div class="drupal-safe-hidden md:flex" role="group" aria-label="Page numbers">
              <ol class="flex list-none m-0 p-0" role="list">
                <li class="list-none">
                  <a href="/page/1" aria-label="Go to page 1" 
                     class="relative inline-flex items-center px-4 py-2 mx-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    1
                  </a>
                </li>
                <li class="list-none">
                  <span class="relative inline-flex items-center px-4 py-2 mx-1 border text-sm font-medium z-10 bg-primary text-white border-primary"
                        aria-current="page" aria-label="Current page, page 2">
                    2
                  </span>
                </li>
                <li class="list-none">
                  <a href="/page/3" aria-label="Go to page 3" 
                     class="relative inline-flex items-center px-4 py-2 mx-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    3
                  </a>
                </li>
              </ol>
            </div>
            
            <div class="flex-1 flex justify-end">
              <a href="/page/3" rel="next" aria-label="Go to next page" 
                 class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Next
                <svg class="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>
            </div>
          </nav>
          <p class="text-sm text-gray-600 bg-blue-50 p-3 rounded">
            <strong>Try this:</strong> Use Tab to navigate through the pagination. Notice the enhanced 3px focus rings with dual outlines that exceed WCAG 2.1 AA requirements.
          </p>
        </div>

        <!-- High Contrast Mode Demo -->
        <div class="space-y-4" style="filter: contrast(200%);">
          <h4 class="text-lg font-semibold text-gray-800">High Contrast Mode Simulation</h4>
          <p class="text-sm text-gray-600">This simulates how the pagination appears in high contrast mode:</p>
          <nav class="flex items-center justify-between" role="navigation" aria-labelledby="contrast-demo-heading" data-pager-nav>
            <h4 id="contrast-demo-heading" class="sr-only">High Contrast Pagination</h4>
            
            <div class="flex-1 flex justify-between sm:justify-start">
              <a href="/page/1" rel="prev" aria-label="Go to previous page" 
                 class="inline-flex items-center px-4 py-2 border-2 border-black text-sm font-medium text-black bg-white hover:bg-gray-100">
                <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Previous
              </a>
            </div>
            
            <div class="drupal-safe-hidden md:flex" role="group" aria-label="Page numbers">
              <ol class="flex list-none m-0 p-0" role="list">
                <li class="list-none">
                  <span class="relative inline-flex items-center px-4 py-2 mx-1 border-2 border-black text-sm font-bold bg-black text-white"
                        aria-current="page" aria-label="Current page, page 2">
                    2
                  </span>
                </li>
              </ol>
            </div>
            
            <div class="flex-1 flex justify-end">
              <a href="/page/3" rel="next" aria-label="Go to next page" 
                 class="inline-flex items-center px-4 py-2 border-2 border-black text-sm font-medium text-black bg-white hover:bg-gray-100">
                Next
                <svg class="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>
            </div>
          </nav>
        </div>
        
        <!-- Screen Reader Information -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-gray-800">Screen Reader Experience</h4>
          <div class="bg-green-50 p-4 rounded-lg">
            <h5 class="font-medium text-green-900 mb-2">What screen readers announce:</h5>
            <ol class="text-sm text-green-800 space-y-1 ml-4">
              <li>1. "Pagination Navigation, landmark"</li>
              <li>2. "Navigate through multiple pages of content using previous, next, and page number links, description"</li>
              <li>3. "Go to previous page, link"</li>
              <li>4. "Page numbers, group"</li>
              <li>5. "Go to page 1, link" / "Current page, page 2" / "Go to page 3, link"</li>
              <li>6. "Go to next page, link"</li>
            </ol>
          </div>
        </div>

        <!-- Keyboard Navigation Guide -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-gray-800">Keyboard Navigation</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h5 class="font-medium text-blue-900 mb-2">Standard Navigation:</h5>
              <ul class="text-sm text-blue-800 space-y-1">
                <li><kbd class="px-2 py-1 bg-blue-200 rounded text-xs">Tab</kbd> - Move to next link</li>
                <li><kbd class="px-2 py-1 bg-blue-200 rounded text-xs">Shift + Tab</kbd> - Move to previous link</li>
                <li><kbd class="px-2 py-1 bg-blue-200 rounded text-xs">Enter</kbd> - Activate link</li>
                <li><kbd class="px-2 py-1 bg-blue-200 rounded text-xs">Space</kbd> - Activate link</li>
              </ul>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <h5 class="font-medium text-purple-900 mb-2">Enhanced Swiss Features:</h5>
              <ul class="text-sm text-purple-800 space-y-1">
                <li><kbd class="px-2 py-1 bg-purple-200 rounded text-xs">←→</kbd> - Arrow key navigation</li>
                <li><kbd class="px-2 py-1 bg-purple-200 rounded text-xs">Home</kbd> - First page</li>
                <li><kbd class="px-2 py-1 bg-purple-200 rounded text-xs">End</kbd> - Last page</li>
                <li>Enhanced focus rings (3px + dual outline)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive demonstration of Swiss eCH-0059 accessibility compliance features including enhanced focus indicators, high contrast mode support, and screen reader optimizations.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'aria-valid-attr-value', options: { validateNullAttr: true } },
          { id: 'keyboard-navigation', options: { focusable: true } },
          { id: 'aria-hidden-focus', options: { selector: 'nav' } },
          { id: 'color-contrast', options: { requiredLevel: 'AA' } },
        ],
      },
    },
  },
};

/**
 * Swiss Municipal Branding Variations
 * Demonstrates theming for different Swiss municipalities
 */
export const MunicipalBranding = {
  render: () => `
    <div class="space-y-12">
      <div class="text-center space-y-4">
        <h3 class="text-2xl font-bold text-gray-900">Swiss Municipal Branding Variations</h3>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Each Swiss municipality can maintain their unique branding while ensuring 
          full eCH-0059 accessibility compliance. All variations meet WCAG 2.1 AA standards.
        </p>
      </div>

      <!-- Thalwil Municipality -->
      <div class="space-y-4" data-municipality="thalwil">
        <div class="flex items-center space-x-3">
          <div class="w-6 h-6 bg-blue-600 rounded"></div>
          <h4 class="text-lg font-semibold text-gray-800">Municipality of Thalwil</h4>
          <span class="text-sm text-gray-500">(Blue Theme)</span>
        </div>
        <nav class="flex items-center justify-between" role="navigation" aria-labelledby="thalwil-heading" data-pager-nav>
          <h4 id="thalwil-heading" class="sr-only">Thalwil Pagination</h4>
          
          <div class="flex-1 flex justify-between sm:justify-start">
            <a href="/page/1" rel="prev" aria-label="Go to previous page" 
               class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Previous
            </a>
          </div>
          
          <div class="drupal-safe-hidden md:flex" role="group" aria-label="Page numbers">
            <ol class="flex list-none m-0 p-0" role="list">
              <li class="list-none">
                <a href="/page/1" aria-label="Go to page 1" class="relative inline-flex items-center px-4 py-2 mx-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">1</a>
              </li>
              <li class="list-none">
                <span class="relative inline-flex items-center px-4 py-2 mx-1 border text-sm font-medium z-10 bg-blue-600 text-white border-blue-600" aria-current="page" aria-label="Current page, page 2">2</span>
              </li>
              <li class="list-none">
                <a href="/page/3" aria-label="Go to page 3" class="relative inline-flex items-center px-4 py-2 mx-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">3</a>
              </li>
            </ol>
          </div>
          
          <div class="flex-1 flex justify-end">
            <a href="/page/3" rel="next" aria-label="Go to next page" 
               class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Next
              <svg class="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
          </div>
        </nav>
      </div>

      <!-- Thalheim Municipality -->
      <div class="space-y-4" data-municipality="thalheim">
        <div class="flex items-center space-x-3">
          <div class="w-6 h-6 bg-green-600 rounded"></div>
          <h4 class="text-lg font-semibold text-gray-800">Municipality of Thalheim</h4>
          <span class="text-sm text-gray-500">(Green Theme)</span>
        </div>
        <nav class="flex items-center justify-between" role="navigation" aria-labelledby="thalheim-heading" data-pager-nav>
          <h4 id="thalheim-heading" class="sr-only">Thalheim Pagination</h4>
          
          <div class="flex-1 flex justify-between sm:justify-start">
            <a href="/page/1" rel="prev" aria-label="Go to previous page" 
               class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600">
              <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Previous
            </a>
          </div>
          
          <div class="drupal-safe-hidden md:flex" role="group" aria-label="Page numbers">
            <ol class="flex list-none m-0 p-0" role="list">
              <li class="list-none">
                <span class="relative inline-flex items-center px-4 py-2 mx-1 border text-sm font-medium z-10 bg-green-600 text-white border-green-600" aria-current="page" aria-label="Current page, page 1">1</span>
              </li>
              <li class="list-none">
                <a href="/page/2" aria-label="Go to page 2" class="relative inline-flex items-center px-4 py-2 mx-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600">2</a>
              </li>
            </ol>
          </div>
          
          <div class="flex-1 flex justify-end">
            <a href="/page/2" rel="next" aria-label="Go to next page" 
               class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600">
              Next
              <svg class="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
          </div>
        </nav>
      </div>

      <!-- Erlenbach Municipality -->
      <div class="space-y-4" data-municipality="erlenbach">
        <div class="flex items-center space-x-3">
          <div class="w-6 h-6 bg-cyan-600 rounded"></div>
          <h4 class="text-lg font-semibold text-gray-800">Municipality of Erlenbach</h4>
          <span class="text-sm text-gray-500">(Cyan Theme)</span>
        </div>
        <nav class="flex items-center justify-between" role="navigation" aria-labelledby="erlenbach-heading" data-pager-nav>
          <h4 id="erlenbach-heading" class="sr-only">Erlenbach Pagination</h4>
          
          <div class="flex-1 flex justify-between sm:justify-start">
            <button disabled aria-label="Previous page unavailable, currently on first page" aria-disabled="true" 
                    class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-400 bg-gray-50 cursor-not-allowed">
              <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Previous
            </button>
          </div>
          
          <div class="drupal-safe-hidden md:flex" role="group" aria-label="Page numbers">
            <ol class="flex list-none m-0 p-0" role="list">
              <li class="list-none">
                <span class="relative inline-flex items-center px-4 py-2 mx-1 border text-sm font-medium z-10 bg-cyan-600 text-white border-cyan-600" aria-current="page" aria-label="Current page, page 1">1</span>
              </li>
              <li class="list-none">
                <a href="/page/2" aria-label="Go to page 2" class="relative inline-flex items-center px-4 py-2 mx-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600">2</a>
              </li>
              <li class="list-none">
                <a href="/page/3" aria-label="Go to page 3" class="relative inline-flex items-center px-4 py-2 mx-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600">3</a>
              </li>
            </ol>
          </div>
          
          <div class="flex-1 flex justify-end">
            <a href="/page/2" rel="next" aria-label="Go to next page" 
               class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600">
              Next
              <svg class="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
          </div>
        </nav>
      </div>

      <!-- Branding Features -->
      <div class="bg-gray-50 p-6 rounded-lg space-y-4">
        <h4 class="text-lg font-semibold text-gray-800">Municipal Branding Features</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white p-4 rounded border">
            <h5 class="font-medium text-gray-900 mb-2">CSS Custom Properties</h5>
            <p class="text-sm text-gray-600">Each municipality can override colors using CSS custom properties while maintaining accessibility.</p>
          </div>
          <div class="bg-white p-4 rounded border">
            <h5 class="font-medium text-gray-900 mb-2">Automatic Contrast</h5>
            <p class="text-sm text-gray-600">All color variations automatically maintain WCAG 2.1 AA contrast ratios (4.5:1 minimum).</p>
          </div>
          <div class="bg-white p-4 rounded border">
            <h5 class="font-medium text-gray-900 mb-2">Focus Consistency</h5>
            <p class="text-sm text-gray-600">Enhanced focus indicators adapt to municipal colors while meeting eCH-0059 requirements.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how different Swiss municipalities (Thalwil, Thalheim, Erlenbach) can maintain their unique branding while ensuring full eCH-0059 accessibility compliance.',
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
        story: 'Interactive playground for testing pagination configurations and edge cases.',
      },
    },
  },
};