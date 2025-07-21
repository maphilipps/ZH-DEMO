/**
 * @file
 * Vereinfachte Storybook Stories - Austauschbar für Frontend-Entwickler
 * Diese Datei ist unabhängig von Drupal-Integration
 */

/**
 * Einfache Story-Erstellung ohne Drupal-spezifische Features
 * Kann von Frontend-Entwicklern leicht ersetzt werden
 */
export const createSimpleStory = (component, args = {}) => {
  return {
    render: (storyArgs) => {
      // Einfaches Rendering ohne Drupal-Integration
      return component.render ? component.render(storyArgs) : component(storyArgs);
    },
    args: {
      ...args
    },
    parameters: {
      docs: {
        description: {
          story: 'Einfache Story für Frontend-Entwicklung'
        }
      }
    }
  };
};

/**
 * Basis-Komponenten für Storybook
 */
export const storybookHelpers = {
  // Viewport-Presets
  viewports: {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1200, height: 800 }
  },

  // Design-Tokens
  tokens: {
    colors: {
      primary: '#3B82F6',
      secondary: '#64748B',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    },
    typography: {
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem'
      }
    }
  },

  // Basis-Layouts
  layouts: {
    fullscreen: 'fullscreen',
    centered: 'centered',
    padded: 'padded'
  }
};

export default createSimpleStory;