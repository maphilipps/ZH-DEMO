// Create a proper pager template function that renders actual HTML
const pagerTemplate = (args) => {
  const {
    heading_id = 'pager-heading',
    current = 1,
    items = null
  } = args;

  if (!items) {
    return '';
  }

  // Build page numbers
  let pageNumbersHtml = '';
  if (items.pages && Object.keys(items.pages).length > 0) {
    Object.entries(items.pages).forEach(([key, page], index, entries) => {
      const pageKey = parseInt(key);
      const isCurrent = current === pageKey;
      
      if (isCurrent) {
        pageNumbersHtml += `
          <span class="relative inline-flex items-center px-4 py-2 mx-1 border text-sm font-medium z-10 bg-primary text-white border-primary">
            <span class="sr-only">Current page</span>
            ${key}
          </span>
        `;
      } else {
        pageNumbersHtml += `
          <a href="${page.href}" title="Go to page ${key}" class="relative inline-flex items-center px-4 py-2 mx-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium">
            <span class="sr-only">Page</span>
            ${key}
          </a>
        `;
      }

      // Add ellipses if defined
      if (index < entries.length - 1 && items.ellipses && items.ellipses[key]) {
        pageNumbersHtml += `
          <span class="relative inline-flex items-center px-4 py-2 mx-1 border border-gray-300 bg-white text-gray-700 text-sm font-medium">
            ...
          </span>
        `;
      }
    });
  }

  return `
    <nav class="flex items-center justify-between" role="navigation" aria-labelledby="${heading_id}">
      <h4 id="${heading_id}" class="sr-only">Pagination</h4>

      <!-- Previous button section -->
      <div class="flex-1 flex justify-between sm:justify-start">
        ${items.previous ? `
          <a href="${items.previous.href}" title="Go to previous page" rel="prev" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Previous
          </a>
        ` : `
          <button disabled class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-400 bg-gray-50 cursor-not-allowed">
            <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Previous
          </button>
        `}
      </div>

      <!-- Page numbers section -->
      <div class="drupal-safe-hidden md:flex">
        ${pageNumbersHtml}
      </div>

      <!-- Next button section -->
      <div class="flex-1 flex justify-end">
        ${items.next ? `
          <a href="${items.next.href}" title="Go to next page" rel="next" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Next
            <svg class="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
        ` : `
          <button disabled class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-400 bg-gray-50 cursor-not-allowed">
            Next
            <svg class="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        `}
      </div>
    </nav>
  `;
};

export default {
  title: 'Navigation/Pager',
  argTypes: {
    heading_id: {
      description: 'Define the heading id attribute',
      control: 'text'
    },
    current: {
      description: 'Current page number (1-based index)',
      control: 'number',
      defaultValue: 1
    },
    items: {
      description: 'Define the pager items',
      control: 'object',
      type: { required: true }
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Pagination component for navigating through multiple pages of content. Supports previous/next navigation and page numbers with responsive design.'
      }
    }
  }
};

const renderPager = (args) => {
  return pagerTemplate(args);
};

// Create page object with key-value pairs where key is page number
const createPages = (totalPages) => {
  const pages = {};
  for (let i = 1; i <= totalPages; i++) {
    pages[i] = { href: `?page=${i}` };
  }
  return pages;
};

export const Default = {
  render: renderPager,
  args: {
    heading_id: 'pager-heading-1',
    current: 2,
    items: {
      previous: {
        href: '?page=1',
        text: 'Previous'
      },
      pages: createPages(5),
      next: {
        href: '?page=3',
        text: 'Next'
      }
    }
  },
};

export const FirstPage = {
  render: renderPager,
  args: {
    heading_id: 'pager-heading-2',
    current: 1,
    items: {
      previous: null, // No previous on first page
      pages: createPages(10),
      next: {
        href: '?page=2',
        text: 'Next'
      }
    }
  },
};

export const LastPage = {
  render: renderPager,
  args: {
    heading_id: 'pager-heading-3',
    current: 10,
    items: {
      previous: {
        href: '?page=9',
        text: 'Previous'
      },
      pages: createPages(10),
      next: null // No next on last page
    }
  },
};

export const MiddlePage = {
  render: renderPager,
  args: {
    heading_id: 'pager-heading-4',
    current: 5,
    items: {
      previous: {
        href: '?page=4',
        text: 'Previous'
      },
      pages: createPages(10),
      next: {
        href: '?page=6',
        text: 'Next'
      }
    }
  },
};

export const SinglePage = {
  render: renderPager,
  args: {
    heading_id: 'pager-heading-5',
    current: 1,
    items: {
      previous: null,
      pages: createPages(1),
      next: null
    }
  },
};

export const WithEllipses = {
  render: renderPager,
  args: {
    heading_id: 'pager-heading-6',
    current: 15,
    items: {
      previous: {
        href: '?page=14',
        text: 'Previous'
      },
      pages: {
        1: { href: '?page=1' },
        2: { href: '?page=2' },
        14: { href: '?page=14' },
        15: { href: '?page=15' },
        16: { href: '?page=16' },
        29: { href: '?page=29' },
        30: { href: '?page=30' }
      },
      ellipses: {
        2: true,  // Show ellipses after page 2
        16: true  // Show ellipses after page 16
      },
      next: {
        href: '?page=16',
        text: 'Next'
      }
    }
  },
};
