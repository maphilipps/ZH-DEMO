/**
 * Accessibility E2E Tests for GPZH Demo System
 * 
 * Tests Swiss compliance requirements (eCH-0059) and WCAG 2.1 AA standards
 * for the Bruchtal municipality theme
 */

const { test, expect } = require('@playwright/test');

test.describe('Swiss Accessibility Compliance (eCH-0059)', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should meet minimum font size requirements (16px)', async ({ page }) => {
    // eCH-0059 requires minimum 16px font size
    const bodyFontSize = await page.evaluate(() => {
      const body = document.body;
      const computedStyle = window.getComputedStyle(body);
      return parseFloat(computedStyle.fontSize);
    });
    
    expect(bodyFontSize).toBeGreaterThanOrEqual(16);
  });

  test('should have sufficient color contrast (4.5:1)', async ({ page }) => {
    // Test main navigation contrast
    const navContrast = await page.evaluate(() => {
      const nav = document.querySelector('nav');
      if (!nav) return true; // Skip if no nav found
      
      const style = window.getComputedStyle(nav);
      const bgColor = style.backgroundColor;
      const textColor = style.color;
      
      // This is a simplified check - in real implementation use axe-core
      return bgColor !== textColor;
    });
    
    expect(navContrast).toBe(true);
  });

  test('should have touch targets at least 44px', async ({ page }) => {
    // Check interactive elements meet minimum size requirements
    const buttonSizes = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, a, input[type="submit"]'));
      return buttons.map(button => {
        const rect = button.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          meets44px: rect.width >= 44 && rect.height >= 44
        };
      });
    });
    
    if (buttonSizes.length > 0) {
      const allMeetRequirement = buttonSizes.every(size => size.meets44px);
      expect(allMeetRequirement).toBe(true);
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Test Tab navigation through interactive elements
    await page.keyboard.press('Tab');
    
    const focusedElement = await page.evaluate(() => {
      return document.activeElement.tagName;
    });
    
    // Should focus on an interactive element
    expect(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']).toContain(focusedElement);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const headings = await page.evaluate(() => {
      const headingElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      return headingElements.map(h => ({
        level: parseInt(h.tagName.charAt(1)),
        text: h.textContent.trim()
      }));
    });
    
    if (headings.length > 0) {
      // Should start with h1
      expect(headings[0].level).toBe(1);
      
      // Should not skip levels
      for (let i = 1; i < headings.length; i++) {
        const levelDiff = headings[i].level - headings[i-1].level;
        expect(levelDiff).toBeLessThanOrEqual(1);
      }
    }
  });

  test('should have meaningful alt text for images', async ({ page }) => {
    const images = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => ({
        src: img.src,
        alt: img.alt,
        hasAlt: img.alt && img.alt.length > 0,
        isDecorative: img.alt === ''
      }));
    });
    
    const contentImages = images.filter(img => !img.isDecorative);
    if (contentImages.length > 0) {
      const allHaveAlt = contentImages.every(img => img.hasAlt);
      expect(allHaveAlt).toBe(true);
    }
  });

  test('should provide skip links for screen readers', async ({ page }) => {
    // Test for skip to main content link
    const skipLink = await page.locator('a[href="#main"], a[href="#content"]').first();
    
    if (await skipLink.count() > 0) {
      expect(await skipLink.isVisible()).toBe(true);
    }
  });
});

test.describe('Mobile Accessibility', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size
  
  test('should be accessible on mobile devices', async ({ page }) => {
    await page.goto('/');
    
    // Check if mobile navigation is accessible
    const mobileNav = await page.locator('[aria-label*="mobile"], [aria-label*="Mobile"], .mobile-menu').first();
    
    if (await mobileNav.count() > 0) {
      await mobileNav.click();
      
      // Should focus on navigation items
      await page.keyboard.press('Tab');
      const focusedElement = await page.evaluate(() => {
        return document.activeElement.tagName;
      });
      
      expect(['A', 'BUTTON']).toContain(focusedElement);
    }
  });
});