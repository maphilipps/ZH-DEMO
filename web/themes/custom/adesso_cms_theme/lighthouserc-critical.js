/**
 * Lighthouse CI Configuration - Critical Components
 * Phase 3.2: Emergency Services and Critical User Journey Testing
 * 
 * Tests only the most critical components for Swiss government portal compliance:
 * - Emergency services components (must load within 1 second)
 * - Critical user journey components (citizen service access)
 * - Core accessibility and performance requirements
 */

module.exports = {
  ci: {
    collect: {
      url: [
        // Priority 1: Emergency services components (< 1s load time requirement)
        'http://localhost:6006/iframe.html?id=hero--default',
        'http://localhost:6006/iframe.html?id=hero--thalwil',
        'http://localhost:6006/iframe.html?id=hero--thalheim', 
        'http://localhost:6006/iframe.html?id=hero--erlenbach',
        'http://localhost:6006/iframe.html?id=site-header--default',
        'http://localhost:6006/iframe.html?id=main-menu--default',
        
        // Priority 1: Critical user interaction components
        'http://localhost:6006/iframe.html?id=button--primary',
        'http://localhost:6006/iframe.html?id=button--secondary',
        'http://localhost:6006/iframe.html?id=quick-action-buttons--default',
        'http://localhost:6006/iframe.html?id=form-progress--default',
        
        // Priority 1: Essential municipal services
        'http://localhost:6006/iframe.html?id=damage-report-card--default',
        'http://localhost:6006/iframe.html?id=filter--default',
      ],
      startServerCommand: 'npm run dev-storybook -- --ci --quiet',
      startServerReadyPattern: 'Local:.*http://localhost:6006',
      startServerReadyTimeout: 120000,
      numberOfRuns: 3, // Fewer runs for faster CI feedback
      settings: {
        preset: 'desktop',
        formFactor: 'desktop',
        // Stricter throttling for emergency services testing
        throttling: {
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
        // Focus only on critical audits for faster execution
        onlyAudits: [
          // Critical performance metrics
          'first-contentful-paint',
          'largest-contentful-paint',
          'interactive',
          'cumulative-layout-shift',
          'total-blocking-time',
          
          // Critical accessibility requirements
          'color-contrast',
          'button-name',
          'link-name',
          'image-alt',
          'html-has-lang',
          
          // Emergency services requirements
          'errors-in-console',
          'resource-summary'
        ]
      },
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        // Emergency services requirements - STRICTER than standard
        'categories:performance': ['error', { minScore: 0.95, aggregationMethod: 'pessimistic' }], // 95% minimum
        'categories:accessibility': ['error', { minScore: 0.95, aggregationMethod: 'pessimistic' }], // 95% minimum
        
        // Emergency services Core Web Vitals - STRICTER thresholds
        'first-contentful-paint': ['error', { maxNumericValue: 800, aggregationMethod: 'pessimistic' }], // 0.8s max
        'largest-contentful-paint': ['error', { maxNumericValue: 1500, aggregationMethod: 'pessimistic' }], // 1.5s max  
        'interactive': ['error', { maxNumericValue: 2000, aggregationMethod: 'pessimistic' }], // 2.0s max
        'total-blocking-time': ['error', { maxNumericValue: 100, aggregationMethod: 'pessimistic' }], // 100ms max
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05, aggregationMethod: 'pessimistic' }], // 0.05 max
        
        // Critical resource budgets - TIGHTER limits
        'resource-summary:total:size': ['error', { maxNumericValue: 300000, aggregationMethod: 'pessimistic' }], // 300KB max
        'resource-summary:script:size': ['error', { maxNumericValue: 150000, aggregationMethod: 'pessimistic' }], // 150KB JS
        
        // Zero tolerance for critical failures
        'errors-in-console': ['error', { maxLength: 0, aggregationMethod: 'pessimistic' }],
        'color-contrast': ['error', { aggregationMethod: 'pessimistic' }],
        'button-name': ['error', { aggregationMethod: 'pessimistic' }],
        'link-name': ['error', { aggregationMethod: 'pessimistic' }],
        'image-alt': ['error', { aggregationMethod: 'pessimistic' }],
        'html-has-lang': ['error', { aggregationMethod: 'pessimistic' }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
      reportFilenamePattern: 'lighthouse-critical-%%DATETIME%%-%%PATHNAME%%.%%EXTENSION%%'
    },
  },
};