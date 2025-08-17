/**
 * Performance Monitoring Script for adesso CMS
 * Tracks Core Web Vitals and sends data to monitoring service
 */

// Core Web Vitals monitoring
function initPerformanceMonitoring() {
  if ('web-vital' in window) {
    // Track Largest Contentful Paint (LCP)
    window.webVitals.getLCP((metric) => {
      sendToAnalytics('LCP', metric.value, metric.rating);
      console.log('LCP:', metric.value, 'ms', metric.rating);
    });

    // Track First Input Delay (FID) / Interaction to Next Paint (INP)
    window.webVitals.getFID((metric) => {
      sendToAnalytics('FID', metric.value, metric.rating);
      console.log('FID:', metric.value, 'ms', metric.rating);
    });

    // Track Cumulative Layout Shift (CLS)
    window.webVitals.getCLS((metric) => {
      sendToAnalytics('CLS', metric.value, metric.rating);
      console.log('CLS:', metric.value, metric.rating);
    });

    // Track First Contentful Paint (FCP)
    window.webVitals.getFCP((metric) => {
      sendToAnalytics('FCP', metric.value, metric.rating);
      console.log('FCP:', metric.value, 'ms', metric.rating);
    });

    // Track Time to First Byte (TTFB)
    window.webVitals.getTTFB((metric) => {
      sendToAnalytics('TTFB', metric.value, metric.rating);
      console.log('TTFB:', metric.value, 'ms', metric.rating);
    });
  }
}

// Send metrics to analytics/monitoring service
function sendToAnalytics(metricName, value, rating) {
  // Send to Google Analytics 4 (if configured)
  if (typeof gtag !== 'undefined') {
    gtag('event', metricName, {
      event_category: 'Core Web Vitals',
      event_label: rating,
      value: Math.round(value),
      non_interaction: true,
    });
  }

  // Send to custom monitoring endpoint
  if (window.drupalSettings && window.drupalSettings.performanceMonitoring) {
    fetch('/api/performance-metrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metric: metricName,
        value: value,
        rating: rating,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    }).catch(console.error);
  }
}

// Performance budget alerts
function checkPerformanceBudgets() {
  const budgets = {
    LCP: 2500, // 2.5 seconds
    FID: 100,  // 100 milliseconds
    CLS: 0.1,  // 0.1 layout shift score
    FCP: 1800, // 1.8 seconds
    TTFB: 600, // 600 milliseconds
  };

  // Monitor and alert if budgets are exceeded
  Object.keys(budgets).forEach(metric => {
    if (window.webVitals && window.webVitals[`get${metric}`]) {
      window.webVitals[`get${metric}`]((measurement) => {
        if (measurement.value > budgets[metric]) {
          console.warn(`Performance Budget Exceeded: ${metric} = ${measurement.value} (budget: ${budgets[metric]})`);
          
          // Send alert to monitoring system
          sendToAnalytics(`${metric}_BUDGET_EXCEEDED`, measurement.value, 'poor');
        }
      });
    }
  });
}

// Page load performance tracking
function trackPageLoadPerformance() {
  window.addEventListener('load', () => {
    // Use Navigation Timing API
    const navigation = performance.getEntriesByType('navigation')[0];
    
    if (navigation) {
      const metrics = {
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        connection: navigation.connectEnd - navigation.connectStart,
        request: navigation.responseStart - navigation.requestStart,
        response: navigation.responseEnd - navigation.responseStart,
        domParsing: navigation.domContentLoadedEventStart - navigation.responseEnd,
        domReady: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        pageLoad: navigation.loadEventEnd - navigation.navigationStart,
      };

      console.log('Page Load Metrics:', metrics);

      // Send to monitoring
      Object.keys(metrics).forEach(metric => {
        sendToAnalytics(`PAGE_LOAD_${metric.toUpperCase()}`, metrics[metric], 'info');
      });
    }
  });
}

// Resource loading performance
function trackResourcePerformance() {
  window.addEventListener('load', () => {
    const resources = performance.getEntriesByType('resource');
    
    // Track largest resources
    const largeResources = resources
      .filter(resource => resource.transferSize > 100000) // > 100KB
      .sort((a, b) => b.transferSize - a.transferSize)
      .slice(0, 10); // Top 10 largest resources

    largeResources.forEach(resource => {
      console.log(`Large Resource: ${resource.name} - ${Math.round(resource.transferSize / 1024)}KB`);
      
      sendToAnalytics('LARGE_RESOURCE', resource.transferSize, 'info');
    });

    // Track slow resources
    const slowResources = resources
      .filter(resource => resource.duration > 1000) // > 1 second
      .sort((a, b) => b.duration - a.duration);

    slowResources.forEach(resource => {
      console.warn(`Slow Resource: ${resource.name} - ${Math.round(resource.duration)}ms`);
      
      sendToAnalytics('SLOW_RESOURCE', resource.duration, 'poor');
    });
  });
}

// Initialize monitoring when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Load Web Vitals library if not already loaded
  if (!window.webVitals) {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/web-vitals@latest/dist/web-vitals.iife.js';
    script.onload = () => {
      initPerformanceMonitoring();
      checkPerformanceBudgets();
    };
    document.head.appendChild(script);
  } else {
    initPerformanceMonitoring();
    checkPerformanceBudgets();
  }

  // Track page load and resource performance
  trackPageLoadPerformance();
  trackResourcePerformance();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initPerformanceMonitoring,
    checkPerformanceBudgets,
    trackPageLoadPerformance,
    trackResourcePerformance,
    sendToAnalytics,
  };
}