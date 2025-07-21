/**
 * @file
 * Storybook preview configuration with QA and accessibility settings
 */

import { initFlowbite } from 'flowbite';
import '../dist/assets/adesso.css';

// Global parameters for all stories
export const parameters = {
  // Action configuration
  actions: { argTypesRegex: '^on[A-Z].*' },
  
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
  
  // Accessibility decorator
  (Story, context) => {
    // Add focus indicators
    const style = document.createElement('style');
    style.textContent = `
      *:focus {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px !important;
      }
      
      .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }
      
      .sr-only:focus {
        position: static !important;
        width: auto !important;
        height: auto !important;
        padding: inherit !important;
        margin: inherit !important;
        overflow: visible !important;
        clip: auto !important;
        white-space: normal !important;
      }
    `;
    document.head.appendChild(style);
    
    return Story();
  },
  
  // Performance decorator
  (Story, context) => {
    // Add performance monitoring
    const startTime = performance.now();
    
    const result = Story();
    
    // Log performance metrics
    setTimeout(() => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (renderTime > 1000) {
        console.warn(`Story "${context.name}" took ${renderTime.toFixed(2)}ms to render`);
      }
    }, 0);
    
    return result;
  },
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