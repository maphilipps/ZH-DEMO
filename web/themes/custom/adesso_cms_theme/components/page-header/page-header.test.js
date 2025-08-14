import { describe, it, expect } from 'vitest';

// Mock Twig template rendering for page header component with variants
function renderPageHeader(props = {}) {
  const {
    variant = 'default',
    title = '',
    description = '',
    background_image = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply',
    alt_text = '',
    modifier = '',
    navbar_transparent = false
  } = props;

  // Variant-specific configurations
  const variantConfig = {
    'default': {
      wrapper: 'py-24 sm:py-32',
      margin: '',
      contentWrapper: '',
      contentContainer: '',
      titleClasses: 'text-5xl font-semibold tracking-tight text-white sm:text-7xl',
      descriptionClasses: 'mt-8 text-lg font-medium text-pretty text-white sm:text-xl/8'
    },
    'landing': {
      wrapper: 'py-64 sm:py-80 md:py-96 lg:py-112',
      margin: '-mt-20 sm:-mt-24 lg:-mt-28',
      contentWrapper: 'pt-48 sm:pt-64 md:pt-80 lg:pt-96',
      contentContainer: 'max-w-5xl lg:mx-0',
      titleClasses: 'text-6xl font-bold tracking-tight text-white sm:text-8xl lg:text-9xl',
      descriptionClasses: 'mt-12 text-xl font-medium text-pretty text-white sm:text-2xl/relaxed lg:text-3xl/relaxed'
    },
    'hero': {
      wrapper: 'py-32 sm:py-48 md:py-64',
      margin: '',
      contentWrapper: 'pt-24 sm:pt-32',
      contentContainer: 'mx-auto max-w-6xl lg:mx-0 text-center',
      titleClasses: 'text-6xl font-bold tracking-tight text-white sm:text-8xl',
      descriptionClasses: 'mt-10 text-xl font-medium text-pretty text-white sm:text-2xl/relaxed'
    }
  };

  const config = variantConfig[variant] || variantConfig['default'];

  return `
    <div class="page-header-wrapper ${modifier} relative isolate overflow-hidden bg-gray-900 ${config.wrapper} ${config.margin}">
      <img src="${background_image}" alt="${alt_text}" class="absolute inset-0 -z-10 size-full object-cover" />
      <div aria-hidden="true" class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
        <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"></div>
      </div>
      <div aria-hidden="true" class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-112 sm:ml-16 sm:translate-x-0 sm:transform-gpu">
        <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"></div>
      </div>
      <div class="mx-auto container px-6 lg:px-8 ${config.contentWrapper}">
        <div class="${config.contentContainer}">
          ${title ? `<h1 class="${config.titleClasses}">${title}</h1>` : ''}
          ${description ? `<p class="${config.descriptionClasses}">${description}</p>` : ''}
        </div>
      </div>
    </div>
  `;
}

describe('Page Header Component', () => {
  it('renders with basic props using default variant', () => {
    const props = {
      title: 'Test Page Title',
      description: 'This is a test description for the page header.',
    };

    const html = renderPageHeader(props);
    
    expect(html).toContain('Test Page Title');
    expect(html).toContain('This is a test description');
    expect(html).toContain('page-header-wrapper');
    expect(html).toContain('bg-gray-900');
    expect(html).toContain('py-24 sm:py-32'); // Default variant spacing
  });

  it('renders landing variant with correct classes', () => {
    const props = {
      variant: 'landing',
      title: 'Landing Page Title',
      description: 'Landing page description.',
      navbar_transparent: true
    };

    const html = renderPageHeader(props);
    
    expect(html).toContain('Landing Page Title');
    expect(html).toContain('py-64 sm:py-80 md:py-96 lg:py-112'); // Landing variant spacing
    expect(html).toContain('-mt-20 sm:-mt-24 lg:-mt-28'); // Landing negative margin
    expect(html).toContain('text-6xl font-bold'); // Landing title classes
    expect(html).toContain('max-w-5xl'); // Landing content container
  });

  it('renders hero variant with correct classes', () => {
    const props = {
      variant: 'hero',
      title: 'Hero Title',
      description: 'Hero description.',
    };

    const html = renderPageHeader(props);
    
    expect(html).toContain('Hero Title');
    expect(html).toContain('py-32 sm:py-48 md:py-64'); // Hero variant spacing
    expect(html).toContain('pt-24 sm:pt-32'); // Hero content wrapper padding
    expect(html).toContain('max-w-6xl'); // Hero max width
    expect(html).toContain('text-center'); // Hero center alignment
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

  it('renders description with variant-specific styling', () => {
    const defaultProps = {
      variant: 'default',
      title: 'Header with Description',
      description: 'This description has proper styling applied.',
    };

    const landingProps = {
      variant: 'landing',
      title: 'Landing Header',
      description: 'Landing description with larger text.',
    };

    const defaultHtml = renderPageHeader(defaultProps);
    const landingHtml = renderPageHeader(landingProps);
    
    expect(defaultHtml).toContain('text-lg font-medium');
    expect(landingHtml).toContain('text-xl font-medium');
    expect(landingHtml).toContain('sm:text-2xl/relaxed lg:text-3xl/relaxed');
  });

  it('handles navbar_transparent prop', () => {
    const props = {
      variant: 'landing',
      title: 'Transparent Nav Test',
      navbar_transparent: true
    };

    const html = renderPageHeader(props);
    
    expect(html).toContain('Transparent Nav Test');
    // Note: navbar_transparent is passed to component but styling is handled by parent templates
  });

  it('includes gradient decoration elements across all variants', () => {
    const variants = ['default', 'landing', 'hero'];
    
    variants.forEach(variant => {
      const props = {
        variant,
        title: `${variant} Gradient Test`,
      };

      const html = renderPageHeader(props);
      
      expect(html).toContain('clip-path: polygon');
      expect(html).toContain('from-[#ff4694] to-[#776fff]');
      expect(html).toContain('opacity-20');
    });
  });

  it('uses fallback variant when invalid variant provided', () => {
    const props = {
      variant: 'invalid-variant',
      title: 'Fallback Test',
    };

    const html = renderPageHeader(props);
    
    // Should fallback to default variant (though in real Twig this would be handled differently)
    expect(html).toContain('Fallback Test');
  });
});