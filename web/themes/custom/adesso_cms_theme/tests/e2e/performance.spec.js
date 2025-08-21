/**
 * Performance E2E Tests for GPZH Demo System
 * 
 * Tests Core Web Vitals and performance requirements for Swiss municipal portals
 * Target: >90 Lighthouse score, <2s load time
 */

const { test, expect } = require('@playwright/test');

test.describe('Core Web Vitals Performance', () => {
  
  test('should meet Core Web Vitals thresholds', async ({ page }) => {
    // Enable performance monitoring
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Measure Core Web Vitals
    const vitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals = {};
        
        // LCP (Largest Contentful Paint) - should be < 2.5s
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          vitals.lcp = lastEntry.startTime;
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // FID (First Input Delay) - should be < 100ms
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          if (entries.length > 0) {
            vitals.fid = entries[0].processingStart - entries[0].startTime;
          }
        }).observe({ entryTypes: ['first-input'] });
        
        // CLS (Cumulative Layout Shift) - should be < 0.1
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          let cls = 0;
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              cls += entry.value;
            }
          });
          vitals.cls = cls;
        }).observe({ entryTypes: ['layout-shift'] });
        
        // Give measurements time to collect
        setTimeout(() => {
          resolve(vitals);
        }, 3000);
      });
    });
    
    // Test LCP threshold
    if (vitals.lcp) {
      expect(vitals.lcp).toBeLessThan(2500); // 2.5 seconds
    }
    
    // Test FID threshold
    if (vitals.fid) {
      expect(vitals.fid).toBeLessThan(100); // 100ms
    }
    
    // Test CLS threshold
    if (vitals.cls !== undefined) {
      expect(vitals.cls).toBeLessThan(0.1);
    }
  });

  test('should load page within 2 seconds', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(2000); // 2 seconds
  });

  test('should optimize images with lazy loading', async ({ page }) => {
    await page.goto('/');
    
    const lazyImages = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.map(img => ({
        src: img.src,
        loading: img.loading,
        isLazy: img.loading === 'lazy' || img.getAttribute('loading') === 'lazy'
      }));
    });
    
    // Most images should use lazy loading (except above-fold)
    const belowFoldImages = lazyImages.slice(3); // Assume first 3 are above fold
    if (belowFoldImages.length > 0) {
      const lazyCount = belowFoldImages.filter(img => img.isLazy).length;
      const lazyPercentage = lazyCount / belowFoldImages.length;
      expect(lazyPercentage).toBeGreaterThan(0.5); // At least 50% should be lazy
    }
  });

  test('should have efficient CSS and JS loading', async ({ page }) => {
    const response = await page.goto('/');
    expect(response.status()).toBe(200);
    
    // Check for critical CSS inlining
    const hasInlineCSS = await page.evaluate(() => {
      return document.querySelector('style') !== null;
    });
    
    // Check for non-blocking resource loading
    const hasAsyncJS = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      return scripts.some(script => script.async || script.defer);
    });
    
    expect(hasInlineCSS || hasAsyncJS).toBe(true);
  });

  test('should compress resources efficiently', async ({ page }) => {
    // Test GZIP/Brotli compression
    const [response] = await Promise.all([
      page.waitForResponse(response => response.url().includes('.css') || response.url().includes('.js')),
      page.goto('/')
    ]);
    
    const encoding = response.headers()['content-encoding'];
    expect(['gzip', 'br', 'deflate']).toContain(encoding);
  });
});

test.describe('Swiss Municipal Portal Performance', () => {
  
  test('should handle municipal form submission efficiently', async ({ page }) => {
    await page.goto('/');
    
    // Look for feedback form or contact form
    const formSelector = 'form[action*="feedback"], form[action*="contact"], form[action*="webform"]';
    const form = page.locator(formSelector).first();
    
    if (await form.count() > 0) {
      const startTime = Date.now();
      
      // Fill out basic form fields
      await page.fill('input[name*="name"], input[type="text"]', 'Test User', { timeout: 5000 });
      await page.fill('input[name*="email"], input[type="email"]', 'test@example.com', { timeout: 5000 });
      
      const fillTime = Date.now() - startTime;
      expect(fillTime).toBeLessThan(1000); // Form should be responsive
    }
  });

  test('should load Bruchtal theme assets efficiently', async ({ page }) => {
    await page.goto('/');
    
    // Check theme-specific assets
    const themeAssets = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[href*="adesso_cms_theme"]'));
      const scripts = Array.from(document.querySelectorAll('script[src*="adesso_cms_theme"]'));
      
      return {
        cssCount: links.length,
        jsCount: scripts.length,
        totalAssets: links.length + scripts.length
      };
    });
    
    // Should have reasonable number of assets (not too many requests)
    expect(themeAssets.totalAssets).toBeLessThan(10);
    expect(themeAssets.totalAssets).toBeGreaterThan(0);
  });

  test('should maintain performance with Alpine.js components', async ({ page }) => {
    await page.goto('/');
    
    // Test Alpine.js initialization time
    const alpinePerf = await page.evaluate(() => {
      const startTime = performance.now();
      
      return new Promise((resolve) => {
        if (window.Alpine) {
          const initTime = performance.now() - startTime;
          resolve({ hasAlpine: true, initTime });
        } else {
          // Wait for Alpine to load
          const checkAlpine = setInterval(() => {
            if (window.Alpine) {
              clearInterval(checkAlpine);
              const initTime = performance.now() - startTime;
              resolve({ hasAlpine: true, initTime });
            }
          }, 100);
          
          // Timeout after 2 seconds
          setTimeout(() => {
            clearInterval(checkAlpine);
            resolve({ hasAlpine: false, initTime: 0 });
          }, 2000);
        }
      });
    });
    
    if (alpinePerf.hasAlpine) {
      expect(alpinePerf.initTime).toBeLessThan(500); // Alpine should initialize quickly
    }
  });
});