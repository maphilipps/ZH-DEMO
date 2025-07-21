# adesso CMS Vite & Storybook Standards

## Vite Configuration Requirements

### Asset Pipeline Standards
- **ALWAYS use `ddev theme build`** for production builds
- **NEVER run Vite commands directly** - must use DDEV wrapper
- Use `.env.local` for environment-specific settings
- Implement proper HMR for development efficiency

### Theme Integration
```javascript
// vite.config.js patterns for Drupal themes
export default defineConfig({
  base: '/themes/custom/adesso_cms_theme/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'src/main.js',
        components: 'src/components.js'
      }
    }
  },
  plugins: [
    // Drupal-specific Vite plugins
  ]
});
```

## Storybook Component Development

### Story Structure Requirements
- **Every SDC component MUST have a Storybook story**
- Use `.stories.js` files co-located with components
- Include accessibility tests in stories using `@storybook/addon-a11y`
- Document component props and variations

### Storybook Configuration
```javascript
// .storybook/main.js
module.exports = {
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-controls',
    '@storybook/addon-docs'
  ],
  features: {
    buildStoriesJson: true
  }
};
```

### Component Story Standards
```javascript
// Component.stories.js template
export default {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      description: {
        component: 'Component description with accessibility notes'
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true }
        ]
      }
    }
  }
};

export const Default = {
  args: {
    // Default props
  }
};

export const Accessible = {
  args: {
    // Accessibility-focused variant
  },
  parameters: {
    docs: {
      description: {
        story: 'This variant demonstrates proper accessibility implementation'
      }
    }
  }
};
```

## Development Workflow

### DDEV Integration Commands
- `ddev theme dev` - Start development server with HMR
- `ddev theme build` - Production build
- `ddev theme storybook` - Start Storybook development
- `ddev theme lint` - Run linting and accessibility checks

### Asset Organization
```
web/themes/custom/adesso_cms_theme/
├── src/
│   ├── components/          # SDC components
│   ├── styles/             # Global styles
│   ├── scripts/            # JavaScript modules
│   └── stories/            # Storybook stories
├── dist/                   # Built assets (git-ignored)
├── storybook-static/       # Built Storybook (git-ignored)
└── vite.config.js
```

## Performance & Accessibility Standards

### Build Optimization
- Implement code splitting for large components
- Use dynamic imports for non-critical JavaScript
- Optimize images and assets through Vite plugins
- Enable tree-shaking for unused code elimination

### Accessibility Integration
- Run axe-core tests in Storybook automatically
- Include accessibility stories for each component variant
- Test keyboard navigation in Storybook
- Validate color contrast in all component states

### Quality Gates
- **All components must pass accessibility tests before merge**
- Storybook build must succeed in CI/CD pipeline
- Performance budget checks required for asset sizes
- Visual regression testing via Chromatic or similar tool