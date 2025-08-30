# Vite Library Mode Configuration Guide

## Overview
This theme now uses **Vite Library Mode** following the PreviousNext Frontend Build Tools Architecture for production-ready, component-driven development.

## How It Works

### Component Entry Discovery
The build system automatically discovers component entry files using these patterns:

**JavaScript/TypeScript Entry Files:**
```
components/**/[^_]*.entry.{js,ts}
```

**CSS/SCSS Entry Files:**
```  
components/**/[^_]*.{css,scss}
```

### Sample Component Structure
```
components/
├── hero/
│   ├── hero.component.yml
│   ├── hero.twig
│   ├── hero.behavior.js     # Original behavior
│   ├── hero.entry.js        # NEW: Entry point for library mode
│   └── hero.stories.js
├── button/
│   ├── button.component.yml
│   ├── button.twig
│   ├── button.behavior.js   # Original behavior
│   ├── button.entry.js      # NEW: Entry point for library mode
│   └── button.stories.js
```

### Entry File Template
Create `[component].entry.js` files like this:

```javascript
/**
 * @file
 * [Component] entry point for Vite library mode
 * PreviousNext Frontend Architecture: Component-specific entry
 */

// Import the component behavior
import './[component].behavior.js';

// Export for library mode (optional)
export { default as [component]Init } from './[component].behavior.js';

console.log('[component] Component entry loaded for library mode compilation');
```

## Build Modes

### Development Mode
- Standard entry discovery
- Source maps enabled
- No library mode (faster builds)
- HMR and live reload

### Production Mode  
- Library mode enabled (IIFE format)
- External dependencies: `drupal`, `jquery`, `once`
- Tree-shaking optimization
- Minification with esbuild
- Browserslist targeting

## German Government Compliance

### Browser Support (.browserslistrc)
- Last 2 versions of major browsers
- Firefox ESR (enterprise environments)
- Mobile browser support
- Excludes IE 11 (modern standards)
- eCH-0059 compliance

### Accessibility Standards
- WCAG 2.1 AA compliance
- Swiss municipality portal requirements
- Cross-browser compatibility testing

## Development Commands

```bash
# Development with HMR
ddev theme dev

# Production build (library mode)
ddev theme build

# Build Vite only
ddev exec "cd web/themes/custom/adesso_cms_theme && npm run build-vite"
```

## Troubleshooting

### No Components Found
Make sure your component has an `*.entry.js` file:
```bash
touch components/my-component/my-component.entry.js
```

### Build Errors
Check the console output for discovered entries:
```
[vite] Discovered entries: ['hero', 'button', 'accordion', 'adesso-theme', 'adesso-styles']
```

### Dependency Issues
Clean and reinstall if needed:
```bash
ddev exec "cd web/themes/custom/adesso_cms_theme && rm -rf node_modules package-lock.json && npm install"
```

## Architecture Benefits

1. **Component-Driven**: Each component has its own optimized entry point
2. **Tree-Shaking**: Unused code is eliminated from production builds  
3. **Drupal Integration**: IIFE format works perfectly with Drupal's library system
4. **Performance**: Library mode creates optimized, cacheable bundles
5. **German Compliance**: Meets eCH-0059 and WCAG 2.1 AA standards
6. **Scalability**: Automatic discovery scales with component additions

---
**Implementation**: Phase 1.1 Complete ✅  
**Next Phase**: Package.json Scripts Enhancement  
**Architecture**: PreviousNext Frontend Build Tools