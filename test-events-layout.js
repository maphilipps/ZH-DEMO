const { chromium } = require('playwright');
const { join } = require('path');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 800 }
  });
  const page = await context.newPage();
  
  try {
    console.log('🔍 Testing Events page layout...');
    
    // Navigate to events page
    await page.goto('https://adesso-cms.ddev.site/events', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Wait for content to load
    await page.waitForSelector('.grid', { timeout: 10000 });
    
    // Take screenshot of full page
    const screenshotPath = join(__dirname, 'events-layout-test.png');
    await page.screenshot({ 
      path: screenshotPath, 
      fullPage: true 
    });
    
    console.log(`📸 Screenshot saved: ${screenshotPath}`);
    
    // Check for background images
    const backgroundImages = await page.evaluate(() => {
      const cards = document.querySelectorAll('article');
      return Array.from(cards).map(card => {
        const bgDiv = card.querySelector('[style*="background-image"]');
        const computedStyle = window.getComputedStyle(card);
        return {
          hasBackgroundDiv: !!bgDiv,
          backgroundImage: bgDiv ? bgDiv.style.backgroundImage : null,
          zIndex: bgDiv ? window.getComputedStyle(bgDiv).zIndex : null,
          cardClasses: card.className,
          position: window.getComputedStyle(card).position
        };
      });
    });
    
    console.log('📋 Background image analysis:', JSON.stringify(backgroundImages, null, 2));
    
    // Check grid layout
    const gridInfo = await page.evaluate(() => {
      const grid = document.querySelector('.grid');
      const computedStyle = window.getComputedStyle(grid);
      return {
        display: computedStyle.display,
        gridTemplateColumns: computedStyle.gridTemplateColumns,
        gap: computedStyle.gap,
        width: computedStyle.width,
        maxWidth: computedStyle.maxWidth
      };
    });
    
    console.log('📐 Grid layout info:', JSON.stringify(gridInfo, null, 2));
    
    // Take close-up screenshot of first card
    const firstCard = page.locator('article').first();
    if (await firstCard.count() > 0) {
      await firstCard.screenshot({ 
        path: join(__dirname, 'events-card-detail.png') 
      });
      console.log('📸 Card detail screenshot saved: events-card-detail.png');
    }
    
  } catch (error) {
    console.error('❌ Error testing events page:', error);
  } finally {
    await browser.close();
  }
})();