module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  
  // Wait for Vite and all assets to load
  await page.waitForLoadState('networkidle');
  
  // Wait for images to load
  await page.evaluate(() => {
    return Promise.all(
      Array.from(document.images, img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve);
        });
      })
    );
  });
  
  // Scroll to bottom and back to top to trigger lazy loading
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
    return new Promise(resolve => setTimeout(resolve, 1000));
  });
  
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    return new Promise(resolve => setTimeout(resolve, 500));
  });
  
  // Hide dynamic content that could cause false positives
  await page.evaluate(() => {
    const dynamicElements = document.querySelectorAll('[data-dynamic="true"], .last-updated, .timestamp');
    dynamicElements.forEach(el => {
      el.style.visibility = 'hidden';
    });
  });
  
  // Additional wait for any final loading
  await page.waitForTimeout(2000);
};