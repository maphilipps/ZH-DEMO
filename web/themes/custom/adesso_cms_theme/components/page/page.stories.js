import { pageTemplate } from './page.twig';

export default {
  title: 'Layout/Page',
  component: pageTemplate,
  argTypes: {
    is_landing_page: {
      control: 'boolean',
      description: 'Whether this is a landing page'
    },
    show_default_header: {
      control: 'boolean',
      description: 'Whether to show the standard site header'
    },
    header_variant: {
      control: 'select',
      options: ['default', 'transparent'],
      description: 'Header style variant'
    },
    page_classes: {
      control: 'text',
      description: 'Additional CSS classes for the page wrapper'
    }
  }
};

export const Default = {
  args: {
    is_landing_page: false,
    show_default_header: true,
    header_variant: 'default',
    page_classes: '',
    slots: {
      content: '<div class="p-8"><h1 class="text-3xl font-bold mb-4">Page Content</h1><p class="text-lg">This is the main content area of a normal page.</p></div>',
      footer: '<footer class="bg-gray-800 text-white p-8 text-center">Footer Content</footer>'
    }
  }
};

export const LandingPage = {
  args: {
    is_landing_page: true,
    show_default_header: false,
    header_variant: 'transparent',
    page_classes: '',
    slots: {
      custom_header: `
        <div class="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
          <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover" />
          <div class="absolute inset-0 -z-5 bg-gradient-to-b from-black/90 via-black/50 to-black/90"></div>
          
          <!-- Navigation in header -->
          <nav class="absolute top-0 left-0 right-0 z-50 bg-transparent">
            <div class="mx-auto container px-4 lg:px-6 py-2.5">
              <div class="flex items-center justify-between">
                <div class="text-white font-bold text-xl">Logo</div>
                <div class="text-white">Navigation</div>
              </div>
            </div>
          </nav>
          
          <!-- Hero content -->
          <div class="mx-auto container px-6 lg:px-8 pt-48">
            <div class="mx-auto max-w-5xl lg:mx-0 text-center">
              <h1 class="text-6xl font-bold tracking-tight text-white sm:text-8xl lg:text-9xl">
                Landing Page
              </h1>
              <p class="mt-12 text-xl font-medium text-pretty text-white sm:text-2xl/relaxed lg:text-3xl/relaxed">
                This is a landing page with a custom header that includes navigation and hero content.
              </p>
            </div>
          </div>
        </div>
      `,
      content: '<div class="p-8"><h2 class="text-2xl font-bold mb-4">Landing Page Content</h2><p class="text-lg">Content after the hero section.</p></div>',
      footer: '<footer class="bg-gray-800 text-white p-8 text-center">Footer Content</footer>'
    }
  }
};

export const WithHighlighted = {
  args: {
    is_landing_page: false,
    show_default_header: true,
    header_variant: 'default',
    page_classes: '',
    slots: {
      highlighted: '<div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 text-center">This is highlighted content</div>',
      content: '<div class="p-8"><h1 class="text-3xl font-bold mb-4">Page with Highlighted Content</h1><p class="text-lg">This page demonstrates the highlighted region slot.</p></div>',
      footer: '<footer class="bg-gray-800 text-white p-8 text-center">Footer Content</footer>'
    }
  }
};

export const NoHeader = {
  args: {
    is_landing_page: false,
    show_default_header: false,
    header_variant: 'default',
    page_classes: '',
    slots: {
      content: '<div class="p-8"><h1 class="text-3xl font-bold mb-4">Page Without Header</h1><p class="text-lg">This page has no header at all.</p></div>',
      footer: '<footer class="bg-gray-800 text-white p-8 text-center">Footer Content</footer>'
    }
  }
};