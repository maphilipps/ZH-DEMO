/**
 * Lighthouse CI Configuration - Mobile Performance Testing
 * Phase 3.2: Mobile-First Swiss Government Portal Compliance
 * 
 * Mobile performance testing for Swiss government portals with focus on:
 * - 4G network conditions (Swiss mobile infrastructure)
 * - Touch accessibility requirements
 * - Mobile-optimized Core Web Vitals
 * - Cross-municipality mobile experience consistency
 */

module.exports = {
  ci: {
    collect: {
      url: [
        // Mobile-critical components for Swiss municipalities
        'http://localhost:6006/iframe.html?id=hero--default',
        'http://localhost:6006/iframe.html?id=hero--thalwil',
        'http://localhost:6006/iframe.html?id=hero--thalheim',
        'http://localhost:6006/iframe.html?id=hero--erlenbach',
        'http://localhost:6006/iframe.html?id=site-header--default',
        'http://localhost:6006/iframe.html?id=main-menu--default',
        'http://localhost:6006/iframe.html?id=button--primary',
        'http://localhost:6006/iframe.html?id=form-progress--default',
        'http://localhost:6006/iframe.html?id=quick-action-buttons--default',
        'http://localhost:6006/iframe.html?id=card-group--default',
        'http://localhost:6006/iframe.html?id=text--default',
        'http://localhost:6006/iframe.html?id=accordion--default',
      ],
      startServerCommand: 'npm run dev-storybook -- --ci --quiet',
      startServerReadyPattern: 'Local:.*http://localhost:6006',
      startServerReadyTimeout: 120000,
      numberOfRuns: 5, // More runs for mobile consistency
      settings: {
        // Swiss mobile network simulation
        preset: 'mobile',
        formFactor: 'mobile',
        throttling: {
          // Swiss 4G network conditions
          rttMs: 150,        // 4G latency
          throughputKbps: 1600, // 4G download speed (1.6 Mbps)
          cpuSlowdownMultiplier: 4, // Mobile CPU simulation
          requestLatencyMs: 150,
          downloadThroughputKbps: 1600,
          uploadThroughputKbps: 750  // 4G upload speed
        },
        screenEmulation: {
          mobile: true,
          // Swiss mobile device standards (iPhone 12 Pro dimensions)
          width: 390,
          height: 844,
          deviceScaleFactor: 3,
          disabled: false,
        },
        emulatedUserAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
        // Mobile-specific audit focus
        onlyAudits: [
          // Mobile performance
          'first-contentful-paint',
          'largest-contentful-paint',
          'first-meaningful-paint',
          'speed-index',
          'interactive',
          'cumulative-layout-shift',
          'total-blocking-time',
          
          // Mobile accessibility
          'color-contrast',
          'touch-targets',
          'button-name',
          'link-name',
          'tap-targets',
          'meta-viewport',
          
          // Mobile best practices
          'image-size-responsive',
          'preload-lcp-image',
          'resource-summary',
          'dom-size',
          'errors-in-console'
        ]
      },
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        // Mobile performance standards (more lenient than desktop)
        'categories:performance': ['error', { minScore: 0.85, aggregationMethod: 'median-run' }], // 85% mobile minimum
        'categories:accessibility': ['error', { minScore: 0.95, aggregationMethod: 'pessimistic' }], // Still strict on a11y
        'categories:best-practices': ['error', { minScore: 0.9, aggregationMethod: 'median-run' }],
        
        // Mobile Core Web Vitals (Swiss government mobile standards)
        'first-contentful-paint': ['error', { maxNumericValue: 2000, aggregationMethod: 'pessimistic' }], // 2s mobile FCP
        'largest-contentful-paint': ['error', { maxNumericValue: 4000, aggregationMethod: 'pessimistic' }], // 4s mobile LCP
        'first-meaningful-paint': ['warn', { maxNumericValue: 2500, aggregationMethod: 'pessimistic' }], // 2.5s FMP
        'speed-index': ['warn', { maxNumericValue: 4500, aggregationMethod: 'median-run' }], // 4.5s Speed Index
        'interactive': ['error', { maxNumericValue: 5000, aggregationMethod: 'pessimistic' }], // 5s TTI
        'total-blocking-time': ['error', { maxNumericValue: 600, aggregationMethod: 'pessimistic' }], // 600ms TBT
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1, aggregationMethod: 'pessimistic' }], // 0.1 CLS
        
        // Mobile resource budgets (adjusted for 4G)
        'resource-summary:total:size': ['error', { maxNumericValue: 400000, aggregationMethod: 'pessimistic' }], // 400KB mobile
        'resource-summary:script:size': ['error', { maxNumericValue: 150000, aggregationMethod: 'pessimistic' }], // 150KB JS
        'resource-summary:stylesheet:size': ['warn', { maxNumericValue: 80000, aggregationMethod: 'pessimistic' }], // 80KB CSS
        'resource-summary:image:size': ['warn', { maxNumericValue: 200000, aggregationMethod: 'median-run' }], // 200KB images
        
        // Mobile-specific requirements
        'meta-viewport': ['error', { aggregationMethod: 'pessimistic' }], // Responsive required
        'touch-targets': ['error', { aggregationMethod: 'pessimistic' }], // Touch accessibility
        'tap-targets': ['error', { aggregationMethod: 'pessimistic' }], // Tap target size
        'image-size-responsive': ['warn', { aggregationMethod: 'median-run' }], // Responsive images
        
        // Mobile DOM performance
        'dom-size': ['warn', { maxNumericValue: 600, aggregationMethod: 'median-run' }], // Smaller DOM for mobile
        
        // Zero tolerance items
        'errors-in-console': ['error', { maxLength: 0, aggregationMethod: 'pessimistic' }],
        'color-contrast': ['error', { aggregationMethod: 'pessimistic' }],
        'button-name': ['error', { aggregationMethod: 'pessimistic' }],
        'link-name': ['error', { aggregationMethod: 'pessimistic' }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
      reportFilenamePattern: 'lighthouse-mobile-%%DATETIME%%-%%PATHNAME%%.%%EXTENSION%%'
    },
  },
};