/**
 * Lighthouse CI Configuration for Phase 3.2: Production-Ready Performance Monitoring
 * 
 * Comprehensive performance monitoring for GPZH multi-municipality portals
 * implementing PreviousNext frontend build tools architecture.
 * 
 * Requirements:
 * - Swiss government performance standards: >90% Lighthouse scores
 * - eCH-0059 compliance validation
 * - Core Web Vitals monitoring (LCP ≤2.5s, FID ≤100ms, CLS ≤0.1)
 * - Performance budgets and resource limits
 * - Multi-municipality theme consistency testing
 * - Component-level performance validation across all 40+ SDC components
 */

module.exports = {
  ci: {
    collect: {
      url: [
        // Critical municipal portal pages - Priority 1 (Emergency services)
        'http://localhost:6006/iframe.html?id=hero--default',
        'http://localhost:6006/iframe.html?id=hero--thalwil', 
        'http://localhost:6006/iframe.html?id=hero--thalheim',
        'http://localhost:6006/iframe.html?id=hero--erlenbach',
        'http://localhost:6006/iframe.html?id=site-header--default',
        'http://localhost:6006/iframe.html?id=site-footer--default',
        'http://localhost:6006/iframe.html?id=main-menu--default',
        'http://localhost:6006/iframe.html?id=page-header--default',
        
        // Core user journey components - Priority 1 (Citizen services)
        'http://localhost:6006/iframe.html?id=button--primary',
        'http://localhost:6006/iframe.html?id=button--secondary', 
        'http://localhost:6006/iframe.html?id=form-progress--default',
        'http://localhost:6006/iframe.html?id=quick-action-buttons--default',
        'http://localhost:6006/iframe.html?id=damage-report-card--default',
        'http://localhost:6006/iframe.html?id=filter--default',
        'http://localhost:6006/iframe.html?id=pager--default',
        
        // Content presentation components - Priority 2
        'http://localhost:6006/iframe.html?id=card-group--default',
        'http://localhost:6006/iframe.html?id=recent-cards--default',
        'http://localhost:6006/iframe.html?id=text--default',
        'http://localhost:6006/iframe.html?id=heading--default',
        'http://localhost:6006/iframe.html?id=accordion--default',
        'http://localhost:6006/iframe.html?id=carousel--default',
        'http://localhost:6006/iframe.html?id=gallery--default',
        'http://localhost:6006/iframe.html?id=bento-grid--default',
        
        // Interactive content components - Priority 2  
        'http://localhost:6006/iframe.html?id=slider--default',
        'http://localhost:6006/iframe.html?id=newsletter-form--default',
        'http://localhost:6006/iframe.html?id=file-upload-preview--default',
        'http://localhost:6006/iframe.html?id=embed--default',
        'http://localhost:6006/iframe.html?id=media--default',
        
        // Municipal branding components - Priority 3
        'http://localhost:6006/iframe.html?id=logo--default',
        'http://localhost:6006/iframe.html?id=logo-collection--default',
        'http://localhost:6006/iframe.html?id=badge--default',
        'http://localhost:6006/iframe.html?id=status-badge--default',
        'http://localhost:6006/iframe.html?id=stat-card--default',
        
        // Layout and structural components - Priority 3
        'http://localhost:6006/iframe.html?id=region--default',
        'http://localhost:6006/iframe.html?id=page--default',
        'http://localhost:6006/iframe.html?id=paragraph-wrapper--default',
        'http://localhost:6006/iframe.html?id=section-header--default',
        'http://localhost:6006/iframe.html?id=landing-page-header--default',
        'http://localhost:6006/iframe.html?id=sidebyside--default',
        
        // Utility and helper components - Priority 3
        'http://localhost:6006/iframe.html?id=download-item--default',
        'http://localhost:6006/iframe.html?id=block-reference--default',
        'http://localhost:6006/iframe.html?id=pricing--default',
        'http://localhost:6006/iframe.html?id=filter-list--default',
        'http://localhost:6006/iframe.html?id=filter-tag--default',
      ],
      startServerCommand: 'npm run dev-storybook -- --ci --quiet',
      startServerReadyPattern: 'Local:.*http://localhost:6006',
      startServerReadyTimeout: 120000, // Increased timeout for component compilation
      numberOfRuns: 5, // Multiple runs for statistical significance
      settings: {
        // Swiss government desktop requirements (primary target)
        preset: 'desktop',
        formFactor: 'desktop',
        throttling: {
          // Swiss broadband simulation (50 Mbps average)
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0
        },
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        emulatedUserAgent: false,
        // Additional settings for government portal compliance
        skipAudits: [
          'uses-http2', // Not applicable to component testing
          'redirects-http', // Not applicable to Storybook
          'installable-manifest', // Not required for components
        ],
        onlyAudits: [
          // Performance audits
          'first-contentful-paint',
          'largest-contentful-paint', 
          'first-meaningful-paint',
          'speed-index',
          'interactive',
          'cumulative-layout-shift',
          'total-blocking-time',
          'resource-summary',
          'dom-size',
          'critical-request-chains',
          
          // Accessibility audits (Swiss government compliance)
          'color-contrast',
          'heading-order',
          'html-has-lang',
          'html-lang-valid', 
          'image-alt',
          'label',
          'link-name',
          'list',
          'meta-viewport',
          'button-name',
          'aria-allowed-attr',
          'aria-required-attr',
          'aria-valid-attr',
          'aria-valid-attr-value',
          
          // Best practices for government portals
          'errors-in-console',
          'image-aspect-ratio',
          'image-size-responsive',
          'preload-lcp-image',
          'unused-css-rules',
          'unused-javascript'
        ]
      },
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        // Swiss government performance requirements (eCH-0059 compliance)
        'categories:performance': ['error', { minScore: 0.9, aggregationMethod: 'median-run' }],
        'categories:accessibility': ['error', { minScore: 0.9, aggregationMethod: 'median-run' }], 
        'categories:best-practices': ['error', { minScore: 0.9, aggregationMethod: 'median-run' }],
        'categories:seo': ['warn', { minScore: 0.8, aggregationMethod: 'median-run' }],
        
        // Core Web Vitals thresholds (German government standards)
        // Priority 1: Emergency services must load within 1 second
        'first-contentful-paint': ['error', { maxNumericValue: 1000, aggregationMethod: 'pessimistic' }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500, aggregationMethod: 'pessimistic' }],
        'first-meaningful-paint': ['warn', { maxNumericValue: 1200, aggregationMethod: 'pessimistic' }],
        'speed-index': ['warn', { maxNumericValue: 2800, aggregationMethod: 'median-run' }],
        'interactive': ['warn', { maxNumericValue: 3000, aggregationMethod: 'pessimistic' }],
        'total-blocking-time': ['error', { maxNumericValue: 200, aggregationMethod: 'pessimistic' }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1, aggregationMethod: 'pessimistic' }],
        
        // Performance budgets for municipal portals
        // Critical path resources (above-the-fold content)
        'resource-summary:total:size': ['error', { maxNumericValue: 500000, aggregationMethod: 'pessimistic' }], // 500KB total
        'resource-summary:script:size': ['error', { maxNumericValue: 200000, aggregationMethod: 'pessimistic' }], // 200KB JS
        'resource-summary:stylesheet:size': ['warn', { maxNumericValue: 100000, aggregationMethod: 'pessimistic' }], // 100KB CSS
        'resource-summary:image:size': ['warn', { maxNumericValue: 300000, aggregationMethod: 'median-run' }], // 300KB images
        'resource-summary:font:size': ['warn', { maxNumericValue: 150000, aggregationMethod: 'median-run' }], // 150KB fonts
        'resource-summary:document:size': ['warn', { maxNumericValue: 50000, aggregationMethod: 'median-run' }], // 50KB HTML
        'resource-summary:other:size': ['warn', { maxNumericValue: 100000, aggregationMethod: 'median-run' }], // 100KB other
        
        // DOM and rendering performance
        'dom-size': ['warn', { maxNumericValue: 800, aggregationMethod: 'median-run' }], // Max 800 DOM nodes per component
        'critical-request-chains': ['warn', { maxLength: 3, aggregationMethod: 'pessimistic' }], // Max 3-deep request chains
        
        // Swiss accessibility requirements (WCAG 2.1 AA + eCH-0059)
        'color-contrast': ['error', { aggregationMethod: 'pessimistic' }], // No contrast failures allowed
        'heading-order': ['error', { aggregationMethod: 'pessimistic' }], // Proper heading structure
        'html-has-lang': ['error', { aggregationMethod: 'pessimistic' }], // Language declaration required
        'html-lang-valid': ['error', { aggregationMethod: 'pessimistic' }], // Valid language codes
        'image-alt': ['error', { aggregationMethod: 'pessimistic' }], // Alt text required
        'label': ['error', { aggregationMethod: 'pessimistic' }], // Form labels required
        'link-name': ['error', { aggregationMethod: 'pessimistic' }], // Link accessibility names
        'button-name': ['error', { aggregationMethod: 'pessimistic' }], // Button accessibility names
        'list': ['error', { aggregationMethod: 'pessimistic' }], // Proper list markup
        'meta-viewport': ['error', { aggregationMethod: 'pessimistic' }], // Responsive viewport
        
        // ARIA compliance for government portals
        'aria-allowed-attr': ['error', { aggregationMethod: 'pessimistic' }],
        'aria-required-attr': ['error', { aggregationMethod: 'pessimistic' }],
        'aria-valid-attr': ['error', { aggregationMethod: 'pessimistic' }],
        'aria-valid-attr-value': ['error', { aggregationMethod: 'pessimistic' }],
        
        // Performance best practices
        'unused-css-rules': ['warn', { maxLength: 0.1, aggregationMethod: 'median-run' }], // <10% unused CSS
        'unused-javascript': ['warn', { maxLength: 0.2, aggregationMethod: 'median-run' }], // <20% unused JS
        'errors-in-console': ['error', { maxLength: 0, aggregationMethod: 'pessimistic' }], // No console errors
        'image-aspect-ratio': ['warn', { aggregationMethod: 'median-run' }], // Proper image aspect ratios
        'image-size-responsive': ['warn', { aggregationMethod: 'median-run' }], // Responsive images
        'preload-lcp-image': ['warn', { aggregationMethod: 'median-run' }], // LCP image preloading
      },
    },
    upload: {
      target: 'temporary-public-storage',
      githubAppToken: process.env.LHCI_GITHUB_APP_TOKEN,
      githubToken: process.env.LHCI_GITHUB_TOKEN, 
      githubApiHost: 'api.github.com',
      uploadUrlMap: true, // Include URL mapping for component identification
      reportFilenamePattern: 'lighthouse-%%DATETIME%%-%%PATHNAME%%.%%EXTENSION%%'
    },
    // Mobile performance testing (secondary priority for government portals)
    mobile: {
      collect: {
        settings: {
          preset: 'mobile',
          formFactor: 'mobile',
          throttling: {
            // Swiss mobile network simulation (4G)
            rttMs: 150,
            throughputKbps: 1600,
            cpuSlowdownMultiplier: 4,
            requestLatencyMs: 0,
            downloadThroughputKbps: 0,
            uploadThroughputKbps: 0
          },
          screenEmulation: {
            mobile: true,
            width: 375,
            height: 667,
            deviceScaleFactor: 2,
            disabled: false,
          }
        },
        url: [
          // Priority mobile components only (reduce CI time)
          'http://localhost:6006/iframe.html?id=hero--default',
          'http://localhost:6006/iframe.html?id=site-header--default',
          'http://localhost:6006/iframe.html?id=main-menu--default',
          'http://localhost:6006/iframe.html?id=button--primary',
          'http://localhost:6006/iframe.html?id=form-progress--default',
          'http://localhost:6006/iframe.html?id=quick-action-buttons--default'
        ]
      },
      assert: {
        assertions: {
          // More lenient mobile thresholds while maintaining quality
          'categories:performance': ['error', { minScore: 0.8, aggregationMethod: 'median-run' }],
          'categories:accessibility': ['error', { minScore: 0.9, aggregationMethod: 'median-run' }],
          'largest-contentful-paint': ['error', { maxNumericValue: 4000, aggregationMethod: 'pessimistic' }],
          'cumulative-layout-shift': ['error', { maxNumericValue: 0.1, aggregationMethod: 'pessimistic' }],
          'total-blocking-time': ['error', { maxNumericValue: 600, aggregationMethod: 'pessimistic' }]
        }
      }
    },
  },
};