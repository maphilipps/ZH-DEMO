/**
 * @file
 * BackstopJS onBefore script for setting up browser context before taking screenshots.
 * This script runs before each scenario and allows for global setup.
 */

module.exports = async (page, scenario, vp) => {
  // Wait for network to be idle
  await page.setDefaultNavigationTimeout(30000);
  await page.setDefaultTimeout(30000);

  // Set user agent to avoid detection
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  // Disable animations to ensure consistent screenshots
  await page.addStyleTag({
    content: `
      *, *:before, *:after {
        -webkit-animation-duration: 0s !important;
        -webkit-animation-delay: 0s !important;
        -webkit-transition-duration: 0s !important;
        -webkit-transition-delay: 0s !important;
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `
  });

  // Handle cookie consent if present
  try {
    await page.waitForSelector('[data-cookie-consent]', { timeout: 2000 });
    await page.click('[data-cookie-consent-accept]');
    await page.waitForTimeout(500);
  } catch (e) {
    // Cookie consent not present or already handled
  }

  // Handle any loading states
  try {
    await page.waitForSelector('.loading', { hidden: true, timeout: 5000 });
  } catch (e) {
    // No loading indicators found
  }

  // Wait for any lazy-loaded images
  await page.evaluate(() => {
    return new Promise((resolve) => {
      const images = Array.from(document.querySelectorAll('img[data-src], img[loading="lazy"]'));
      let loadedCount = 0;
      
      if (images.length === 0) {
        resolve();
        return;
      }
      
      const checkIfAllLoaded = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          resolve();
        }
      };
      
      images.forEach((img) => {
        if (img.complete) {
          checkIfAllLoaded();
        } else {
          img.addEventListener('load', checkIfAllLoaded);
          img.addEventListener('error', checkIfAllLoaded);
          // Force load lazy images
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
        }
      });
      
      // Fallback timeout
      setTimeout(resolve, 3000);
    });
  });

  console.log('onBefore: Setup completed for scenario:', scenario.label);
};