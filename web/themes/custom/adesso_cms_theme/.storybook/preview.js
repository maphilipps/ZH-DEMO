/**
 * @file
 * Storybook preview configuration with QA and accessibility settings
 */

import { initFlowbite } from 'flowbite';
import '../src/css/adesso.css';

// Import compiled CSS through static files to avoid webpack processing issues
// The CSS is served via staticDirs configuration in main.cjs

// Global parameters for all stories
export const parameters = {
  // Action configuration
  actions: {},
  
  // Controls configuration
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  
  // Layout configuration
  layout: 'centered',
  
  // Accessibility configuration
  a11y: {
    config: {
      rules: [
        {
          id: 'color-contrast',
          enabled: true,
          tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
        },
        {
          id: 'keyboard-navigation',
          enabled: true,
          tags: ['wcag2a', 'wcag21a'],
        },
        {
          id: 'focus-management',
          enabled: true,
          tags: ['wcag2a', 'wcag21a'],
        },
        {
          id: 'aria-labels',
          enabled: true,
          tags: ['wcag2a', 'wcag21a'],
        },
        {
          id: 'semantic-structure',
          enabled: true,
          tags: ['wcag2a', 'wcag21a'],
        },
      ],
    },
    options: {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21aa'],
      },
    },
  },
  
  // Viewport configuration
  viewport: {
    viewports: {
      mobile1: {
        name: 'Mobile (Small)',
        styles: {
          width: '375px',
          height: '667px',
        },
      },
      mobile2: {
        name: 'Mobile (Large)',
        styles: {
          width: '414px',
          height: '896px',
        },
      },
      tablet: {
        name: 'Tablet',
        styles: {
          width: '768px',
          height: '1024px',
        },
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: '1200px',
          height: '800px',
        },
      },
      wide: {
        name: 'Wide Desktop',
        styles: {
          width: '1600px',
          height: '900px',
        },
      },
    },
  },
  
  // Background configuration
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#f9fafb',
      },
      {
        name: 'dark',
        value: '#111827',
      },
      {
        name: 'primary',
        value: '#3b82f6',
      },
      {
        name: 'gray',
        value: '#6b7280',
      },
    ],
  },
  
  // Theme configuration
  themes: {
    default: 'light',
    list: [
      {
        name: 'Light',
        class: '',
        color: '#f9fafb',
      },
      {
        name: 'Dark',
        class: 'dark',
        color: '#111827',
      },
    ],
  },
  
  // Documentation configuration
  docs: {
    story: {
      inline: true,
      iframeHeight: 400,
    },
    canvas: {
      sourceState: 'shown',
    },
  },
  
  // Chromatic configuration for visual testing
  chromatic: {
    modes: {
      light: {
        theme: 'light',
        viewport: 'desktop',
      },
      dark: {
        theme: 'dark',
        viewport: 'desktop',
      },
      mobile: {
        theme: 'light',
        viewport: 'mobile1',
      },
      tablet: {
        theme: 'light',
        viewport: 'tablet',
      },
    },
  },
};

// Global decorators
export const decorators = [
  // Flowbite initialization decorator
  (Story, context) => {
    // Initialize Flowbite after story renders
    setTimeout(() => {
      if (typeof initFlowbite === 'function') {
        initFlowbite();
      }
    }, 100);
    
    return Story();
  },
  
  // Theme decorator for dark mode
  (Story, context) => {
    const theme = context.parameters.theme || context.globals.theme;
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    return Story();
  },
  
  // Accessibility decorator for comprehensive testing
  (Story, context) => {
    // Add municipality theme data for testing
    const municipality = context.parameters?.municipality;
    if (municipality) {
      document.documentElement.setAttribute('data-municipality', municipality);
    }
    
    // Add accessibility landmarks for proper testing
    const story = Story();
    
    // Ensure proper ARIA structure for testing
    if (typeof story === 'string') {
      return `<main role="main" aria-label="Component Story">${story}</main>`;
    }
    
    return story;
  }

];

// Global types for controls
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
      showName: true,
    },
  },
  
  viewport: {
    name: 'Viewport',
    description: 'Global viewport for responsive testing',
    defaultValue: 'desktop',
    toolbar: {
      icon: 'browser',
      items: [
        { value: 'mobile1', title: 'Mobile (Small)' },
        { value: 'mobile2', title: 'Mobile (Large)' },
        { value: 'tablet', title: 'Tablet' },
        { value: 'desktop', title: 'Desktop' },
        { value: 'wide', title: 'Wide Desktop' },
      ],
      showName: true,
    },
  },
  
  a11y: {
    name: 'Accessibility',
    description: 'Accessibility testing options',
    defaultValue: 'enabled',
    toolbar: {
      icon: 'accessibility',
      items: [
        { value: 'enabled', title: 'Enabled' },
        { value: 'disabled', title: 'Disabled' },
      ],
      showName: true,
    },
  },
};