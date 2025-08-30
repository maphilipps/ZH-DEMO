# Theme Transformation to PNX Frontend Build Standards

## Overview

Transform the adesso CMS theme build toolchain to match the modern standards demonstrated in [jptaranto/pnx-frontend-build-tools-blog](https://github.com/jptaranto/pnx-frontend-build-tools-blog), implementing current best practices for Drupal frontend development with Vite and Storybook.

## Problem Statement / Motivation

The current theme uses legacy build configurations that can be modernized for better developer experience, performance, and maintainability:

- **Legacy ESLint Configuration**: Still uses `.eslintrc.json` format instead of modern flat config
- **Basic Stylelint Setup**: Missing BEM pattern enforcement and Drupal-specific rules
- **Complex Script Architecture**: Many scripts that could be simplified and consolidated
- **Heavy Storybook Configuration**: Over-configured with unnecessary complexity
- **Manual Entry Management**: Hardcoded entry files instead of automatic discovery

The PNX reference implementation demonstrates a cleaner, more modern approach that would benefit the GPZH multi-municipality theme system.

## Proposed Solution

Migrate the build toolchain to align with PNX standards while preserving the advanced DDEV integration and multi-municipality features that are essential for the GPZH project.

## Technical Approach

### Phase 1: Linting Configuration Modernization

#### ESLint Migration to Flat Config
**Current State:**
```json
// .eslintrc.json (legacy format)
{
  "root": true,
  "env": { "browser": true, "es6": true },
  "extends": ["eslint:recommended", "plugin:storybook/recommended"]
}
```

**Target State (based on PNX):**
```javascript
// eslint.config.js (modern flat config)
import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import drupal from 'eslint-config-drupal';

export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...drupal.globals,
        Drupal: true,
        drupalSettings: true,
        once: true,
        Alpine: true,
        Swiper: true
      }
    }
  },
  {
    rules: {
      'no-console': 'error',
      'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      'consistent-return': 'warn',
      'no-unused-vars': 'off'
    }
  },
  {
    ignores: [
      'node_modules',
      'vendor',
      'dist',
      'storybook-static',
      'web/core',
      'web/sites',
      'web/modules/contrib',
      'web/themes/contrib'
    ]
  }
];
```

#### Stylelint Enhancement with BEM Patterns
**Current State:**
```json
// .stylelintrc.json (basic configuration)
{
  "extends": ["stylelint-config-standard", "stylelint-scss"],
  "rules": { "at-rule-no-unknown": [...] }
}
```

**Target State (based on PNX):**
```javascript
// stylelint.config.js (enhanced with BEM patterns)
const config = {
  extends: ['stylelint-config-standard'],
  rules: {
    'custom-property-empty-line-before': null,
    'no-descending-specificity': null,
    'import-notation': 'string',
    'selector-class-pattern': [
      '^([a-z])([a-z0-9]+)(-[a-z0-9]+)?(((--)?(__)?)([a-z0-9]+)(-[a-z0-9]+)?)?$',
      {
        message: 'Expected class selector to be BEM selector matching either .block__element or .block--modifier'
      }
    ],
    'selector-nested-pattern': '^&'
  },
  ignoreFiles: [
    'node_modules',
    'vendor',
    'dist',
    'storybook-static',
    'web/core',
    'web/sites',
    'web/modules/contrib',
    'web/themes/contrib'
  ]
};

export default config;
```

### Phase 2: Package.json Script Simplification

#### Current State Analysis
```json
// Current: 32 scripts with complex dependencies
{
  "scripts": {
    "dev": "vite",
    "dev:ddev": "DDEV_PROJECT_TYPE=drupal11 vite --host 0.0.0.0 --port 5173",
    "build": "vite build",
    "storybook": "storybook dev -p 6006 --host 0.0.0.0",
    // ... 28 more scripts
  }
}
```

#### Target State (based on PNX simplification)
```json
{
  "scripts": {
    "dev": "concurrently -k -n \"VITE,STORYBOOK\" -c \"#636cff,#ff4785\" \"npm run dev-vite\" \"npm run dev-storybook\"",
    "build": "concurrently -n \"VITE,STORYBOOK\" -c \"#636cff,#ff4785\" \"npm run build-vite\" \"npm run build-storybook\"",
    "dev-storybook": "storybook dev -p 6006 --no-open",
    "build-storybook": "storybook build -o dist/storybook",
    "dev-vite": "vite build -w -m development",
    "build-vite": "vite build",
    "format": "prettier --write \"**/*.{css,ts,tsx,js,jsx,json}\"",
    "lint": "npm run lint-prettier && npm run lint-css && npm run lint-js",
    "lint-prettier": "prettier --check \"**/*.{css,ts,tsx,js,jsx,json}\"",
    "lint-css": "stylelint \"**/*.css\"",
    "lint-js": "eslint .",
    "test-vitest": "vitest --run",
    "test-storybook": "test-storybook",
    "test-storybook:update": "test-storybook -u"
  }
}
```

### Phase 3: Vite Configuration Optimization

#### Entry File Discovery Enhancement
**Current State:**
```typescript
// Manual entry specification
rollupOptions: {
  input: [
    ...globSync('./src/js/adesso.js'),
    ...globSync('./src/css/adesso.css')
  ]
}
```

**Target State (based on PNX automatic discovery):**
```typescript
// Automatic entry discovery
const entry = globSync([
  '**/*.entry.{js,jsx}',
  '**/*.css'
], {
  ignore: [
    '**/_*.css',
    'node_modules',
    'vendor',
    'web/sites',
    'web/core',
    'web/libraries',
    '**/contrib',
    'dist'
  ]
});

export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: entry,
      formats: ['es']
    },
    target: browserslist(),
    cssCodeSplit: true,
    outDir: resolve(import.meta.dirname, './dist/libraries/components'),
    sourcemap: mode === 'development',
    rollupOptions: {
      output: {
        chunkFileNames: 'chunks/[name]-[hash].js'
      }
    }
  }
}));
```

### Phase 4: Storybook Configuration Streamlining

#### Current State Analysis
```javascript
// .storybook/main.js (complex configuration)
const config = {
  stories: ['../components/**/*.stories.js', '../components/**/*.mdx'],
  addons: ['@chromatic-com/storybook', '@storybook/addon-docs'],
  // ... extensive DDEV configuration
};
```

#### Target State (based on PNX simplicity)
```javascript
// Streamlined configuration
const config = {
  stories: ['../components/src'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/html-vite'
};

export default config;
```

## Acceptance Criteria

### Functional Requirements

- [ ] ESLint flat config properly validates Drupal + Alpine.js + Tailwind patterns
- [ ] Stylelint enforces BEM naming conventions for component classes
- [ ] Simplified npm scripts provide all essential functionality
- [ ] Vite automatically discovers entry files without manual configuration
- [ ] Storybook builds and serves components without unnecessary complexity
- [ ] All existing component stories continue to work
- [ ] DDEV integration remains fully functional
- [ ] Multi-municipality theming continues to work

### Non-Functional Requirements

- [ ] Build time improves by at least 20% due to simplified configuration
- [ ] Developer experience is enhanced with clearer error messages
- [ ] Configuration files are more maintainable and follow modern standards
- [ ] Linting catches Drupal-specific anti-patterns effectively

### Quality Gates

- [ ] All existing tests pass with new configuration
- [ ] Visual regression tests show no differences
- [ ] ESLint and Stylelint rules are properly enforced
- [ ] Storybook builds successfully in production mode
- [ ] Theme builds successfully for all three municipalities

## Success Metrics

- **Build Performance**: 20%+ improvement in build time
- **Code Quality**: Enhanced linting catches 30%+ more issues
- **Developer Experience**: Reduced configuration complexity (fewer config files)
- **Maintainability**: Modern standards alignment for future updates

## Dependencies & Prerequisites

### Technical Dependencies
- Node.js 18+ (already available in DDEV)
- Modern package versions alignment
- Existing component structure preservation

### Team Dependencies
- Frontend development team review
- Testing team validation of visual regression
- DevOps review of DDEV integration changes

## Risk Analysis & Mitigation

### High Risk: Breaking DDEV Integration
**Mitigation**: Maintain all DDEV-specific server configuration while adopting PNX patterns for build logic

### Medium Risk: Component Story Breakage
**Mitigation**: Incremental migration with story validation at each step

### Low Risk: Linting Rule Changes
**Mitigation**: Gradual rule enforcement with warning periods

## Implementation Plan

### Week 1: Configuration Migration
1. Create new eslint.config.js with Drupal globals
2. Implement stylelint.config.js with BEM patterns
3. Add missing dependencies (concurrently, browserslist-to-esbuild)
4. Test linting on sample components

### Week 2: Build System Optimization
1. Implement automatic entry file discovery
2. Simplify package.json scripts
3. Update Vite configuration for PNX patterns
4. Preserve DDEV-specific optimizations

### Week 3: Storybook Streamlining
1. Simplify Storybook configuration
2. Validate all component stories
3. Update build output paths
4. Test integration with all three municipalities

### Week 4: Quality Assurance
1. Run comprehensive test suite
2. Visual regression validation
3. Performance benchmarking
4. Documentation updates

## Future Considerations

### Extensibility
- Configuration supports additional Drupal projects
- Easy adaptation for other PNX-style implementations
- Scalable for additional municipalities

### Long-term Vision
- Alignment with Drupal community frontend standards
- Preparation for future Vite/Storybook major version upgrades
- Foundation for additional build optimizations

## References & Research

### External References
- [PNX Frontend Build Tools Blog](https://github.com/jptaranto/pnx-frontend-build-tools-blog)
- [ESLint Flat Config Documentation](https://eslint.org/docs/latest/use/configure/configuration-files)
- [Stylelint Configuration Guide](https://stylelint.io/user-guide/configure)
- [Vite Drupal Plugin](https://github.com/larowlan/vite-plugin-twig-drupal)

### Internal References
- Current theme architecture: `web/themes/custom/adesso_cms_theme/`
- Component system: `web/themes/custom/adesso_cms_theme/components/`
- Build configuration: `web/themes/custom/adesso_cms_theme/vite.config.ts:25`
- Package scripts: `web/themes/custom/adesso_cms_theme/package.json:6`

### Related Work
- GPZH multi-municipality theming system
- DDEV containerized development environment
- SDC component architecture with Storybook integration

---

**Priority**: High  
**Complexity**: Medium  
**Estimated Effort**: 4 weeks  
**Impact**: High (Developer Experience + Build Performance)