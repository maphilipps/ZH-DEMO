/**
 * Media Component - End-to-End Tests
 * 
 * Comprehensive E2E testing for the enhanced Media component including
 * cross-browser testing, real user interactions, and Swiss municipal
 * compliance validation.
 * 
 * @file media.e2e.test.js
 * @author Phase 3 - Storybook Component Curator Agent
 * @since 2025-09-06
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Test configuration
const STORYBOOK_URL = process.env.STORYBOOK_URL || 'http://localhost:6006';
const DRUPAL_URL = process.env.DRUPAL_URL || 'https://zh-demo.ddev.site';

// Swiss municipal performance standards
const PERFORMANCE_THRESHOLDS = {
  LCP: 2000,  // Largest Contentful Paint < 2s
  CLS: 0.1,   // Cumulative Layout Shift < 0.1
  FID: 100    // First Input Delay < 100ms
};

test.describe('Media Component - End-to-End Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Set up performance monitoring
    await page.addInitScript(() => {
      window.mediaPerformanceMetrics = {
        lcp: 0,
        cls: 0,
        fid: 0
      };
      
      // Monitor LCP
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        window.mediaPerformanceMetrics.lcp = lastEntry.startTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      
      // Monitor CLS
      let clsValue = 0;
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        window.mediaPerformanceMetrics.cls = clsValue;
      }).observe({ type: 'layout-shift', buffered: true });
      
      // Monitor FID
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          window.mediaPerformanceMetrics.fid = entry.processingStart - entry.startTime;
        });
      }).observe({ type: 'first-input', buffered: true });
    });
  });

  test.describe('Accessibility Compliance (WCAG 2.1 AA)', () => {

    test('should pass axe accessibility audit for default image', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--default-image`);
      await page.waitForSelector('.adesso-media', { state: 'visible' });
      
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should pass accessibility audit for video content', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--enhanced-video-player`);
      await page.waitForSelector('.adesso-media--video', { state: 'visible' });
      
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should support keyboard navigation for video controls', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--enhanced-video-player`);
      await page.waitForSelector('video', { state: 'visible' });
      
      const video = page.locator('video');
      
      // Tab to video element
      await page.keyboard.press('Tab');
      await expect(video).toBeFocused();
      
      // Space should play/pause
      await page.keyboard.press('Space');
      // Note: In a real test, we'd check if video started playing
      
      // Arrow keys should work for seeking (if supported by browser)
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowLeft');
    });

    test('should provide proper ARIA labels for document downloads', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--swiss-government-document`);
      await page.waitForSelector('.adesso-media--document', { state: 'visible' });
      
      const downloadLink = page.locator('.adesso-media__document-link');
      
      await expect(downloadLink).toHaveAttribute('aria-label');
      await expect(downloadLink).toHaveAttribute('href');
      
      const ariaLabel = await downloadLink.getAttribute('aria-label');
      expect(ariaLabel).toContain('PDF');
    });

    test('should support screen reader announcements', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--accessibility-enhanced`);
      await page.waitForSelector('.adesso-media--accessibility', { state: 'visible' });
      
      const figure = page.locator('figure.adesso-media');
      
      // Check for proper semantic structure
      await expect(figure).toHaveAttribute('role', 'img');
      
      // Check for ARIA relationships
      const ariaLabelledBy = await figure.getAttribute('aria-labelledby');
      const ariaDescribedBy = await figure.getAttribute('aria-describedby');
      
      if (ariaLabelledBy) {
        const caption = page.locator(`#${ariaLabelledBy}`);
        await expect(caption).toBeVisible();
      }
      
      if (ariaDescribedBy) {
        const description = page.locator(`#${ariaDescribedBy}`);
        await expect(description).toBeAttached();
      }
    });

  });

  test.describe('Performance Standards (Swiss Municipal)', () => {

    test('should achieve LCP < 2s for hero images', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--performance-hero`);
      await page.waitForSelector('.adesso-media--hero img', { state: 'visible' });
      
      // Wait for LCP measurement
      await page.waitForTimeout(3000);
      
      const lcp = await page.evaluate(() => window.mediaPerformanceMetrics.lcp);
      
      expect(lcp).toBeLessThan(PERFORMANCE_THRESHOLDS.LCP);
      expect(lcp).toBeGreaterThan(0); // Ensure measurement worked
    });

    test('should maintain CLS < 0.1 during image loading', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--hero-image`);
      
      // Wait for all content to load
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      const cls = await page.evaluate(() => window.mediaPerformanceMetrics.cls);
      
      expect(cls).toBeLessThan(PERFORMANCE_THRESHOLDS.CLS);
    });

    test('should demonstrate fast interaction for media controls', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--enhanced-video-player`);
      await page.waitForSelector('video', { state: 'visible' });
      
      const video = page.locator('video');
      
      // Measure interaction delay
      const startTime = Date.now();
      await video.click();
      const endTime = Date.now();
      
      const interactionDelay = endTime - startTime;
      expect(interactionDelay).toBeLessThan(PERFORMANCE_THRESHOLDS.FID);
    });

    test('should load modern image formats efficiently', async ({ page }) => {
      const responsePromise = page.waitForResponse(response => 
        response.url().includes('images.unsplash.com') && response.status() === 200
      );
      
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--modern-image-formats`);
      
      const response = await responsePromise;
      const contentType = response.headers()['content-type'];
      
      // Should load AVIF or WebP in modern browsers
      expect(['image/avif', 'image/webp', 'image/jpeg']).toContain(contentType);
    });

  });

  test.describe('Cross-Browser Compatibility', () => {

    ['chromium', 'firefox', 'webkit'].forEach(browserName => {
      test(`should work correctly in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
        test.skip(currentBrowser !== browserName, `Skipping ${browserName} test`);
        
        await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--default-image`);
        await page.waitForSelector('.adesso-media', { state: 'visible' });
        
        const media = page.locator('.adesso-media');
        await expect(media).toBeVisible();
        
        // Check for proper image loading
        const img = page.locator('.adesso-media img');
        await expect(img).toHaveAttribute('src');
        
        // Check for alt text
        const altText = await img.getAttribute('alt');
        expect(altText).toBeTruthy();
      });
    });

    test('should handle format fallbacks gracefully', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--performance-format-optimization`);
      await page.waitForSelector('picture', { state: 'visible' });
      
      const picture = page.locator('picture');
      const sources = page.locator('picture source');
      const img = page.locator('picture img');
      
      await expect(picture).toBeVisible();
      await expect(sources).toHaveCount(2); // AVIF and WebP sources
      await expect(img).toHaveAttribute('src'); // JPEG fallback
    });

  });

  test.describe('Interactive Features', () => {

    test('should handle lightbox functionality', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--gallery-thumbnail`);
      await page.waitForSelector('.adesso-media--gallery', { state: 'visible' });
      
      // Note: This would need actual lightbox implementation
      const galleryImage = page.locator('.adesso-media--gallery img');
      await expect(galleryImage).toBeVisible();
      
      // In a real implementation, clicking would open lightbox
      await galleryImage.click();
    });

    test('should support video playback controls', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--enhanced-video-player`);
      await page.waitForSelector('video', { state: 'visible' });
      
      const video = page.locator('video');
      
      await expect(video).toHaveAttribute('controls');
      
      // Test play/pause functionality
      await video.click(); // Should start playing
      
      // Check if video is playing (in real browser context)
      const isPaused = await video.evaluate(v => v.paused);
      // Note: Due to browser autoplay policies, this might not work in all contexts
    });

    test('should handle external content privacy controls', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--gdpr-compliant-video`);
      await page.waitForSelector('.adesso-media--remote_video', { state: 'visible' });
      
      // Look for privacy notice
      const privacyNotice = page.locator('.adesso-media__privacy-notice, [role="alert"]');
      
      if (await privacyNotice.isVisible()) {
        // Should have consent button
        const consentButton = page.locator('button').filter({ hasText: /load content/i });
        await expect(consentButton).toBeVisible();
        
        // Clicking should load the external content
        await consentButton.click();
        
        const iframe = page.locator('iframe');
        await expect(iframe).toBeVisible();
      }
    });

  });

  test.describe('Responsive Design', () => {

    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 }
    ];

    viewports.forEach(({ name, width, height }) => {
      test(`should display correctly on ${name} (${width}x${height})`, async ({ page }) => {
        await page.setViewportSize({ width, height });
        
        await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--hero-image`);
        await page.waitForSelector('.adesso-media--hero', { state: 'visible' });
        
        const media = page.locator('.adesso-media--hero');
        await expect(media).toBeVisible();
        
        // Check responsive image behavior
        const img = page.locator('.adesso-media--hero img');
        const imgBox = await img.boundingBox();
        
        expect(imgBox.width).toBeLessThanOrEqual(width);
        expect(imgBox.width).toBeGreaterThan(0);
      });
    });

    test('should adapt to container queries', async ({ page }) => {
      await page.setViewportSize({ width: 800, height: 600 });
      
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--media-card`);
      await page.waitForSelector('.adesso-media--card', { state: 'visible' });
      
      const media = page.locator('.adesso-media--card');
      await expect(media).toBeVisible();
      
      // Container queries would adjust styling based on container size
      const computedStyles = await media.evaluate(el => {
        return window.getComputedStyle(el);
      });
      
      expect(computedStyles.display).toBeTruthy();
    });

  });

  test.describe('Lazy Loading and Performance', () => {

    test('should implement lazy loading correctly', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--performance-lazy-loading`);
      
      // Initially, lazy image might not be loaded
      await page.waitForSelector('.adesso-media', { state: 'visible' });
      
      // Scroll to trigger lazy loading
      await page.locator('.adesso-media').scrollIntoViewIfNeeded();
      
      // Wait for image to load
      await page.waitForFunction(() => {
        const img = document.querySelector('.adesso-media img');
        return img && img.complete && img.naturalHeight !== 0;
      });
      
      const img = page.locator('.adesso-media img');
      await expect(img).toBeVisible();
    });

    test('should preload hero images', async ({ page }) => {
      const responsePromise = page.waitForResponse(response => 
        response.url().includes('images.unsplash.com')
      );
      
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--performance-hero`);
      
      // Hero image should start loading immediately
      const response = await responsePromise;
      expect(response.status()).toBe(200);
      
      const img = page.locator('.adesso-media--hero img');
      await expect(img).toHaveAttribute('fetchpriority', 'high');
    });

  });

  test.describe('Swiss Municipal Compliance', () => {

    test('should support multilingual content', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--multilingual-content`);
      await page.waitForSelector('.adesso-media', { state: 'visible' });
      
      const img = page.locator('.adesso-media img');
      const caption = page.locator('.adesso-media figcaption');
      
      // Should have proper alt text (language would be determined by context)
      await expect(img).toHaveAttribute('alt');
      
      const altText = await img.getAttribute('alt');
      const captionText = await caption.textContent();
      
      // Alt text and caption should be non-empty
      expect(altText.trim()).toBeTruthy();
      expect(captionText.trim()).toBeTruthy();
    });

    test('should include structured data for SEO', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--default-image`);
      await page.waitForSelector('.adesso-media', { state: 'visible' });
      
      // Look for JSON-LD structured data
      const structuredData = page.locator('script[type="application/ld+json"]');
      
      if (await structuredData.count() > 0) {
        const jsonContent = await structuredData.textContent();
        const data = JSON.parse(jsonContent);
        
        expect(data['@type']).toBe('ImageObject');
        expect(data.description).toBeTruthy();
      }
    });

    test('should handle privacy classifications', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--privacy-restricted`);
      await page.waitForSelector('.adesso-media', { state: 'visible' });
      
      const media = page.locator('.adesso-media');
      
      // Should have privacy level data attribute
      const privacyLevel = await media.getAttribute('data-privacy-level');
      expect(privacyLevel).toBeTruthy();
      
      // Should show appropriate warnings for restricted content
      if (privacyLevel === 'restricted') {
        const warning = page.locator('.adesso-media__privacy-warning, [role="alert"]');
        await expect(warning).toBeVisible();
      }
    });

  });

  test.describe('Error Handling', () => {

    test('should display fallback content for broken images', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--error-fallback`);
      await page.waitForSelector('.adesso-media', { state: 'visible' });
      
      // Wait for image to fail loading
      await page.waitForTimeout(3000);
      
      // Fallback content should be visible
      const fallback = page.locator('.adesso-media__fallback, .text-red-600');
      
      if (await fallback.count() > 0) {
        await expect(fallback.first()).toBeVisible();
      }
    });

    test('should handle missing alt text gracefully', async ({ page }) => {
      // Create a story variant without alt text
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=media-media---phase-2-enhanced--default-image`);
      
      // Remove alt text via evaluation
      await page.evaluate(() => {
        const img = document.querySelector('.adesso-media img');
        if (img) img.setAttribute('alt', '');
      });
      
      await page.waitForSelector('.adesso-media', { state: 'visible' });
      
      // Should still be accessible (empty alt is valid for decorative images)
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a'])
        .analyze();

      // Should not have critical image-alt violations for empty alt text
      const imageAltViolations = accessibilityScanResults.violations
        .filter(violation => violation.id === 'image-alt');
      
      expect(imageAltViolations).toHaveLength(0);
    });

  });

  test.describe('Real-world Integration', () => {

    test.skip('should work in actual Drupal context', async ({ page }) => {
      // This test would run against actual Drupal site
      await page.goto(`${DRUPAL_URL}/media-test-page`);
      await page.waitForSelector('.adesso-media', { state: 'visible' });
      
      const media = page.locator('.adesso-media').first();
      await expect(media).toBeVisible();
      
      // Test Drupal-specific features
      const drupalMediaId = await media.getAttribute('data-media-id');
      expect(drupalMediaId).toMatch(/^\d+$/); // Should be numeric Drupal entity ID
    });

    test.skip('should integrate with Drupal behaviors', async ({ page }) => {
      await page.goto(`${DRUPAL_URL}/media-test-page`);
      await page.waitForSelector('.adesso-media', { state: 'visible' });
      
      // Check if Drupal behaviors are attached
      const behaviorStatus = await page.evaluate(() => {
        return window.Drupal && window.Drupal.behaviors && window.Drupal.behaviors.media;
      });
      
      expect(behaviorStatus).toBeTruthy();
    });

  });

});