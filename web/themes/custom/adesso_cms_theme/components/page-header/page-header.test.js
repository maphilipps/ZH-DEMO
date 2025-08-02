import { describe, it, expect } from 'vitest';

// Mock Twig template rendering for page header component
function renderPageHeader(props = {}) {
  const {
    title = '',
    description = '',
    background_image = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply',
    alt_text = '',
    modifier = ''
  } = props;

  return `
    <div class="page-header-wrapper ${modifier} relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img src="${background_image}" alt="${alt_text}" class="absolute inset-0 -z-10 size-full object-cover" />
      <div aria-hidden="true" class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
        <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"></div>
      </div>
      <div aria-hidden="true" class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-112 sm:ml-16 sm:translate-x-0 sm:transform-gpu">
        <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"></div>
      </div>
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          ${title ? `<h1 class="text-5xl font-semibold tracking-tight text-white sm:text-7xl">${title}</h1>` : ''}
          ${description ? `<p class="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">${description}</p>` : ''}
        </div>
      </div>
    </div>
  `;
}

describe('Page Header Component', () => {
  it('renders with basic props', () => {
    const props = {
      title: 'Test Page Title',
      description: 'This is a test description for the page header.',
    };

    const html = renderPageHeader(props);
    
    expect(html).toContain('Test Page Title');
    expect(html).toContain('This is a test description');
    expect(html).toContain('page-header-wrapper');
    expect(html).toContain('bg-gray-900');
  });

  it('renders with only title', () => {
    const props = {
      title: 'Only Title',
    };

    const html = renderPageHeader(props);
    
    expect(html).toContain('Only Title');
    expect(html).not.toContain('<p class="mt-8');
  });

  it('renders with custom background image', () => {
    const props = {
      title: 'Custom Background',
      background_image: 'https://example.com/custom-image.jpg',
      alt_text: 'Custom background image',
    };

    const html = renderPageHeader(props);
    
    expect(html).toContain('https://example.com/custom-image.jpg');
    expect(html).toContain('alt="Custom background image"');
  });

  it('applies custom modifier classes', () => {
    const props = {
      title: 'Modified Header',
      modifier: 'custom-class another-class',
    };

    const html = renderPageHeader(props);
    
    expect(html).toContain('custom-class another-class');
  });

  it('uses default background image when none provided', () => {
    const props = {
      title: 'Default Background',
    };

    const html = renderPageHeader(props);
    
    expect(html).toContain('images.unsplash.com');
  });

  it('renders description with proper styling', () => {
    const props = {
      title: 'Header with Description',
      description: 'This description has proper styling applied.',
    };

    const html = renderPageHeader(props);
    
    expect(html).toContain('text-lg font-medium text-pretty text-gray-400');
    expect(html).toContain('This description has proper styling applied.');
  });

  it('includes gradient decoration elements', () => {
    const props = {
      title: 'Gradient Test',
    };

    const html = renderPageHeader(props);
    
    expect(html).toContain('clip-path: polygon');
    expect(html).toContain('from-[#ff4694] to-[#776fff]');
    expect(html).toContain('opacity-20');
  });
});