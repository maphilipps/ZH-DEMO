# [SPEC] Implement PreviousNext Frontend Build Tools Architecture for Production-Ready GPZH Development

## Status
Draft

## Authors
Claude Code Assistant - 2025-08-30

## Overview
Implement the modern frontend build tools architecture from [PreviousNext's Vite and Storybook blog](https://www.previousnext.com.au/blog/vite-and-storybook-frontend-tooling-drupal) to achieve production-ready, CI/CD-integrated development workflow. This will enhance the existing ZH-DEMO theme with industry best practices for component-driven development, automated testing, and performance optimization.

## Background/Problem Statement
While the ZH-DEMO theme already has modern tooling (Vite 6.2.0, Storybook 8.6.7, Vitest, Playwright), it lacks the production-grade architecture and CI/CD pipeline needed for the GPZH multi-municipality portal system. The PreviousNext architecture provides proven patterns for:

- **Scalable asset building** with Vite library mode
- **Component-driven development** with Storybook integration 
- **Automated testing pipeline** for continuous quality assurance
- **Performance monitoring** with Lighthouse CI
- **Cross-browser compatibility** testing
- **Accessibility compliance** validation

## Goals
- [ ] Implement Vite library mode for optimized asset compilation
- [ ] Establish automated Storybook testing in CI/CD pipeline
- [ ] Create comprehensive GitHub Actions workflow for testing and validation
- [ ] Integrate Lighthouse CI for performance monitoring (>90 scores required)
- [ ] Implement automated accessibility testing with axe-core
- [ ] Optimize build pipeline for multi-site municipality deployment
- [ ] Document development workflow following PnX best practices
- [ ] Ensure WCAG 2.1 AA and eCH-0059 compliance validation

## Non-Goals
- Migrating away from existing Drupal SDC architecture
- Changing the current Tailwind CSS v4 + Alpine.js stack
- Modifying the DDEV development environment
- Altering municipality-specific theming approach

## Technical Dependencies

### External Libraries/Frameworks
- **Vite**: ^6.2.0 (already installed) - Asset building with library mode
- **Storybook**: 8.6.7 (already installed) - Component development and testing
- **@storybook/test-runner**: ^0.21.0 (new) - Automated Storybook testing
- **@axe-core/playwright**: ^4.10.2 (new) - Accessibility testing
- **lighthouse**: ^12.2.1 (new) - Performance auditing
- **@lighthouse-ci/cli**: ^0.13.0 (new) - CI performance monitoring
- **browserslist-to-esbuild**: ^2.1.1 (already installed) - Browser compatibility

### Version Requirements
- Node.js >=18.0.0 (already configured)
- npm >=8.0.0 (already configured)
- Browserslist compatibility: "> 1%, last 2 versions, not dead"

### Documentation References
- [PreviousNext Vite & Storybook Blog](https://www.previousnext.com.au/blog/vite-and-storybook-frontend-tooling-drupal)
- [PreviousNext GitHub Example](https://github.com/jptaranto/pnx-frontend-build-tools-blog)
- [Vite Library Mode Documentation](https://vitejs.dev/guide/build.html#library-mode)
- [Storybook Test Runner Guide](https://storybook.js.org/docs/7.0/writing-tests/test-runner)

## Detailed Design

### Architecture Enhancement

#### 1. Vite Library Mode Implementation
```javascript
// vite.config.ts enhancement
export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/js/adesso.js'),
      name: 'AdessoTheme',
      formats: ['iife'], // For Drupal compatibility
      fileName: 'adesso-theme'
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      external: ['drupal', 'jquery', 'once'],
      output: {
        globals: {
          drupal: 'Drupal',
          jquery: 'jQuery',
          once: 'once'
        }
      }
    }
  }
}));
```

#### 2. Enhanced Entry Point Discovery
```javascript
// Automatic component entry discovery
const getComponentEntries = () => {
  return globSync([
    'components/**/[^_]*.entry.{js,ts}',
    'components/**/[^_]*.css',
    'components/**/[^_]*.scss'
  ], {
    ignore: [
      '**/node_modules/**',
      '**/dist/**',
      '**/storybook-static/**',
      '**/*.stories.*',
      '**/*.test.*'
    ]
  });
};
```

#### 3. Storybook Test Integration
```javascript
// .storybook/test-runner-jest.config.js
module.exports = {
  async preVisit(page, context) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    // Run accessibility tests on each story
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: { html: true }
    });
  }
};
```

### CI/CD Pipeline Architecture

#### 1. GitHub Actions Workflow Structure
```yaml
name: Frontend Build & Test Pipeline

on:
  push:
    branches: [main, develop, 'feature/**']
  pull_request:
    branches: [main, develop]
    paths:
      - 'web/themes/custom/**'
      - '.github/workflows/**'

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]
        
  test:
    needs: build
    runs-on: ubuntu-latest
    
  visual-regression:
    needs: build
    runs-on: ubuntu-latest
    
  accessibility:
    needs: build
    runs-on: ubuntu-latest
    
  performance:
    needs: build
    runs-on: ubuntu-latest
```

#### 2. Lighthouse CI Configuration
```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:6006/iframe.html?id=hero--default',
        'http://localhost:6006/iframe.html?id=card--default',
        // Add all component stories for performance testing
      ],
      startServerCommand: 'npm run storybook',
      settings: {
        preset: 'desktop'
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
```

### File Structure Organization

```
web/themes/custom/adesso_cms_theme/
├── .storybook/
│   ├── main.js (enhanced for testing)
│   ├── test-runner-jest.config.js (new)
│   └── preview.js (accessibility addons)
├── components/
│   ├── hero/
│   │   ├── hero.component.yml
│   │   ├── hero.twig
│   │   ├── hero.stories.js
│   │   ├── hero.test.js (enhanced)
│   │   └── hero.entry.js (new - component-specific JS)
│   └── ...
├── src/
│   ├── js/
│   │   └── adesso.js (main entry point)
│   └── css/
│       └── adesso.css (main stylesheet)
├── tests/
│   ├── e2e/
│   │   ├── accessibility.spec.js (new)
│   │   ├── cross-browser.spec.js (new)
│   │   └── performance.spec.js (new)
│   └── utils/
├── vite.config.ts (enhanced with library mode)
├── lighthouserc.js (new)
├── playwright.config.js (enhanced for cross-browser)
└── package.json (updated scripts)
```

## User Experience

### Developer Workflow Enhancement
1. **Component Development**: Developers create/modify SDC components with automatic Storybook integration
2. **Live Testing**: Real-time visual regression and accessibility feedback during development
3. **Quality Gates**: Automated validation prevents deployment of non-compliant code
4. **Performance Monitoring**: Continuous performance tracking ensures >90 Lighthouse scores
5. **Multi-Browser Testing**: Automated cross-browser compatibility validation

### Municipality Portal Benefits
- **Consistent Performance**: All three municipalities (Thalwil, Thalheim, Erlenbach) maintain >90 performance scores
- **Accessibility Compliance**: Automated WCAG 2.1 AA and eCH-0059 validation
- **Visual Consistency**: Regression testing prevents UI inconsistencies across sites
- **Faster Development**: Streamlined build process accelerates feature delivery

## Testing Strategy

### 1. Unit Testing (Vitest)
```javascript
// components/hero/hero.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/dom';
import heroTemplate from './hero.twig';

describe('Hero Component', () => {
  it('renders with proper ARIA attributes', () => {
    const heroData = {
      title: 'Test Hero Title',
      summary: 'Test summary text'
    };
    
    const rendered = render(heroTemplate(heroData));
    
    expect(rendered.querySelector('[role="banner"]')).toBeTruthy();
    expect(rendered.querySelector('h1')).toHaveTextContent('Test Hero Title');
  });
  
  it('applies correct municipality theme classes', () => {
    const heroData = {
      title: 'Test',
      municipality: 'thalwil'
    };
    
    const rendered = render(heroTemplate(heroData));
    
    expect(rendered.querySelector('.municipality-thalwil')).toBeTruthy();
  });
});
```

### 2. Integration Testing (Storybook Test Runner)
```javascript
// tests/storybook.test.js
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Storybook Stories', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
    await injectAxe(page);
  });

  test('Hero component meets accessibility standards', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=hero--default');
    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: { html: true }
    });
  });
});
```

### 3. E2E Testing (Playwright)
```javascript
// tests/e2e/cross-browser.spec.js
import { test, expect, devices } from '@playwright/test';

const browsers = ['chromium', 'firefox', 'webkit'];
const viewports = [devices['iPhone 12'], devices['iPad Pro'], devices['Desktop Chrome']];

browsers.forEach(browserName => {
  test.describe(`Cross-browser testing - ${browserName}`, () => {
    viewports.forEach(viewport => {
      test(`Hero component renders correctly on ${viewport.name}`, async ({ page }) => {
        await page.goto('http://localhost:6006/iframe.html?id=hero--default');
        
        // Visual regression testing
        await expect(page.locator('.c-hero')).toHaveScreenshot({
          name: `hero-${browserName}-${viewport.name}.png`,
          fullPage: false
        });
        
        // Interaction testing
        if (page.locator('[data-hero-cta]').isVisible()) {
          await page.locator('[data-hero-cta]').click();
          await expect(page).toHaveURL(/.*#hero-action/);
        }
      });
    });
  });
});
```

### 4. Visual Regression Testing (BackstopJS + Playwright)
```json
{
  "id": "pnx_architecture_visual_regression",
  "scenarios": [
    {
      "label": "Hero Component - Thalwil Theme",
      "url": "http://localhost:6006/iframe.html?id=hero--thalwil",
      "selectors": [".c-hero"],
      "viewports": [
        {"label": "mobile", "width": 375, "height": 667},
        {"label": "tablet", "width": 768, "height": 1024},
        {"label": "desktop", "width": 1920, "height": 1080}
      ]
    }
  ],
  "engine": "playwright",
  "engineOptions": {
    "browser": "chromium",
    "args": ["--no-sandbox"]
  },
  "report": ["browser", "CI"]
}
```

### 5. Performance Testing (Lighthouse CI)
```javascript
// tests/e2e/performance.spec.js
import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test.describe('Performance Audits', () => {
  test('Components meet performance standards', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=hero--default');
    
    const audit = await playAudit({
      page,
      thresholds: {
        performance: 90,
        accessibility: 90,
        'best-practices': 90
      },
      port: 9222
    });
    
    expect(audit.lhr.categories.performance.score).toBeGreaterThan(0.9);
    expect(audit.lhr.categories.accessibility.score).toBeGreaterThan(0.9);
  });
});
```

### Test Documentation Requirements
Each test includes:
- **Purpose comment**: Explains why the test exists and what it validates
- **Failure conditions**: Clear criteria for when tests should fail
- **Edge case coverage**: Tests scenarios that can reveal real issues
- **Municipality-specific testing**: Validates theming across all three portals

## Performance Considerations

### Build Optimization
- **Vite Library Mode**: Optimized asset bundling with tree-shaking
- **Code Splitting**: Component-level code splitting for faster loading
- **Asset Optimization**: Image optimization, CSS purging, JS minification
- **Bundle Analysis**: Automated bundle size monitoring and alerts

### Runtime Performance
- **Core Web Vitals**: Automated monitoring of LCP, FID, CLS metrics
- **Critical CSS**: Inline critical styles, lazy load non-critical assets
- **Component Lazy Loading**: Progressive loading of Alpine.js components
- **Cache Strategy**: Optimized caching headers for static assets

### Monitoring Strategy
```yaml
# Performance budgets
budgets:
  - resourceSizes:
      - resourceType: script
        budget: 250
      - resourceType: total
        budget: 500
  - resourceCounts:
      - resourceType: third-party
        budget: 10
```

## Security Considerations

### Build Security
- **Dependency Scanning**: Automated vulnerability scanning with GitHub Security
- **CSP Headers**: Content Security Policy validation in build pipeline
- **Asset Integrity**: Subresource Integrity (SRI) for external assets
- **XSS Prevention**: Automated template security scanning

### CI/CD Security
```yaml
# GitHub Actions security
security:
  - name: Run Snyk to check for vulnerabilities
    uses: snyk/actions/node@master
    env:
      SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
  
  - name: OWASP ZAP Baseline Scan
    uses: zaproxy/action-baseline@v0.12.0
    with:
      target: 'http://localhost:6006'
```

## Documentation

### Required Documentation Updates
1. **README.md**: Enhanced development workflow documentation
2. **Component Documentation**: Storybook-driven component library docs
3. **Testing Guide**: Comprehensive testing strategy documentation
4. **CI/CD Guide**: Pipeline configuration and troubleshooting
5. **Performance Guide**: Optimization techniques and monitoring

### Documentation Structure
```
docs/
├── development/
│   ├── frontend-architecture.md (new)
│   ├── component-development.md (updated)
│   ├── testing-guide.md (new)
│   └── performance-optimization.md (new)
├── deployment/
│   ├── ci-cd-pipeline.md (new)
│   └── production-checklist.md (updated)
└── troubleshooting/
    ├── build-issues.md (updated)
    └── testing-issues.md (new)
```

## Implementation Phases

### Phase 1: Core Build Architecture (Week 1)
- [ ] Implement Vite library mode configuration
- [ ] Enhance automatic entry point discovery
- [ ] Update build scripts for production optimization
- [ ] Configure Browserslist integration
- [ ] Test build output across all municipalities

### Phase 2: Testing Infrastructure (Week 2)
- [ ] Install and configure Storybook test runner
- [ ] Implement axe-core accessibility testing
- [ ] Set up cross-browser Playwright configuration
- [ ] Create comprehensive test suites for existing components
- [ ] Establish visual regression testing baseline

### Phase 3: CI/CD Pipeline (Week 3)
- [ ] Create GitHub Actions workflow configuration
- [ ] Implement Lighthouse CI integration
- [ ] Set up automated dependency security scanning
- [ ] Configure performance budgets and monitoring
- [ ] Establish deployment quality gates

### Phase 4: Documentation & Optimization (Week 4)
- [ ] Write comprehensive development documentation
- [ ] Create component development guidelines
- [ ] Implement automated documentation generation
- [ ] Optimize build performance and bundle sizes
- [ ] Conduct final multi-municipality validation

## Open Questions

1. **Build Caching**: Should we implement build caching strategies for faster CI/CD runs?
2. **Component Versioning**: How should we handle component versioning across municipalities?
3. **Performance Budgets**: What specific performance budgets should we set for different component types?
4. **Testing Coverage**: What minimum test coverage percentage should we enforce?
5. **Browser Support**: Should we maintain IE11 support or focus on modern browsers only?
6. **Asset CDN**: Should we implement CDN integration for production asset delivery?

## References

### Primary Sources
- [PreviousNext Vite & Storybook Blog](https://www.previousnext.com.au/blog/vite-and-storybook-frontend-tooling-drupal)
- [PreviousNext GitHub Repository](https://github.com/jptaranto/pnx-frontend-build-tools-blog)

### Technical Documentation
- [Vite Library Mode Guide](https://vitejs.dev/guide/build.html#library-mode)
- [Storybook Test Runner Documentation](https://storybook.js.org/docs/7.0/writing-tests/test-runner)
- [Lighthouse CI Configuration](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md)
- [Playwright Testing Guide](https://playwright.dev/docs/intro)
- [GitHub Actions Best Practices](https://docs.github.com/en/actions/learn-github-actions/security-hardening-for-github-actions)

### Compliance Standards
- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [eCH-0059 Swiss Accessibility Standard](https://www.ech.ch/en/ech/ech-0059/4.0)
- [Swiss Government Digital Standards](https://www.digitale-verwaltung.ch/)

### Performance Standards
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse Performance Scoring](https://web.dev/performance-scoring/)
- [Swiss Government Performance Requirements](https://www.digitale-verwaltung.ch/)