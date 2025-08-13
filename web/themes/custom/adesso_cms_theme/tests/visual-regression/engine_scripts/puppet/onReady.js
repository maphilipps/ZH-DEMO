/**
 * @file
 * BackstopJS onReady script that runs after page load but before screenshot.
 * This script ensures the page is fully ready for consistent visual testing.
 */

module.exports = async (page, scenario, vp) => {
  console.log('onReady: Preparing screenshot for scenario:', scenario.label);

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');

  // Wait for any remaining network requests to complete
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
    console.log('Network idle timeout - proceeding anyway');
  });

  // Hide elements that might cause inconsistencies (timestamps, random content, etc.)
  await page.addStyleTag({
    content: `
      .timestamp,
      .current-time,
      .random-content,
      [data-timestamp],
      .dynamic-content {
        opacity: 0 !important;
      }
    `
  });

  // Ensure Alpine.js components are fully initialized
  await page.evaluate(() => {
    return new Promise((resolve) => {
      if (window.Alpine) {
        // Wait for Alpine to be fully started
        if (window.Alpine.version) {
          // Alpine 3.x
          document.addEventListener('alpine:init', resolve, { once: true });
          // Fallback in case alpine:init already fired
          setTimeout(resolve, 1000);
        } else {
          // Alpine 2.x or not present
          resolve();
        }
      } else {
        resolve();
      }
    });
  });

  // Wait for any Swiper instances to initialize
  await page.evaluate(() => {
    return new Promise((resolve) => {
      const swipers = document.querySelectorAll('.swiper');
      if (swipers.length === 0) {
        resolve();
        return;
      }
      
      let initializedCount = 0;
      const checkInitialized = () => {
        initializedCount++;
        if (initializedCount === swipers.length) {
          resolve();
        }
      };
      
      swipers.forEach((swiper) => {
        if (swiper.swiper) {
          checkInitialized();
        } else {
          // Wait for Swiper to initialize
          const observer = new MutationObserver(() => {
            if (swiper.swiper) {
              observer.disconnect();
              checkInitialized();
            }
          });
          observer.observe(swiper, { childList: true, subtree: true });
        }
      });
      
      // Fallback timeout
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  });

  // Scroll to top to ensure consistent starting position
  await page.evaluate(() => window.scrollTo(0, 0));

  // Wait for any scroll-triggered animations to complete
  await page.waitForTimeout(500);

  // Remove focus from any focused elements to avoid highlight states
  await page.evaluate(() => {
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
  });

  // Handle scenario-specific preparations
  if (scenario.label.includes('Landing Page')) {
    // Additional wait for landing page specific elements
    await page.waitForSelector('[data-component="landing-page-header"]', { timeout: 5000 }).catch(() => {
      console.log('Landing page header not found');
    });
  }

  if (scenario.label.includes('Mobile Menu')) {
    // Ensure mobile menu is properly positioned
    await page.waitForTimeout(500);
  }

  if (scenario.label.includes('Hover')) {
    // Wait for hover effects to settle
    await page.waitForTimeout(300);
  }

  console.log('onReady: Page ready for screenshot');
};