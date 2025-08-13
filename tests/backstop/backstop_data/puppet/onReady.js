module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  
  // Hide potentially dynamic content that could cause false positives
  await page.evaluate(() => {
    // Hide any dynamic timestamps or dates
    const dynamicElements = document.querySelectorAll('[data-dynamic="true"], .last-updated, .timestamp');
    dynamicElements.forEach(el => {
      el.style.visibility = 'hidden';
    });
    
    // Wait for Alpine.js to initialize if present
    if (window.Alpine) {
      return new Promise(resolve => {
        if (Alpine.store && Alpine.store('ready')) {
          resolve();
        } else {
          setTimeout(resolve, 500);
        }
      });
    }
  });

  // Additional wait for images and content to load
  await page.waitForLoadState('networkidle');
  
  // Small additional wait for any final animations or content shifts
  await page.waitForTimeout(500);
};