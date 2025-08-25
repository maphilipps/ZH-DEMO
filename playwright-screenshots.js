// NASA JPL Search UI Screenshots with Playwright
const { chromium } = require('playwright');

async function captureSearchScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  try {
    // Navigate to search page
    console.log('🚀 Navigating to search page...');
    await page.goto('https://zh-demo.ddev.site/search');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Desktop Screenshot - Full Page
    console.log('📸 Taking desktop full page screenshot...');
    await page.screenshot({
      path: 'nasa-jpl-search-desktop-full.png',
      fullPage: true
    });
    
    // Desktop Screenshot - Above fold
    console.log('📸 Taking desktop above-fold screenshot...');
    await page.screenshot({
      path: 'nasa-jpl-search-desktop-fold.png',
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
    
    // Perform a search
    console.log('🔍 Performing search query...');
    const searchInput = await page.locator('input[type="search"], input[name*="search"], #edit-search-api-fulltext');
    if (await searchInput.count() > 0) {
      await searchInput.first().fill('Gemeinde');
      await searchInput.first().press('Enter');
      
      // Wait for search results
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      // Search Results Screenshot
      console.log('📸 Taking search results screenshot...');
      await page.screenshot({
        path: 'nasa-jpl-search-results-desktop.png',
        fullPage: true
      });
      
      // Focus on search results area if available
      const resultsArea = await page.locator('.view-search, .search-results, .views-view');
      if (await resultsArea.count() > 0) {
        await resultsArea.first().screenshot({
          path: 'nasa-jpl-search-results-area.png'
        });
      }
    }
    
    // Mobile Screenshots
    console.log('📱 Switching to mobile viewport...');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    // Mobile Search Page
    await page.goto('https://zh-demo.ddev.site/search');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    console.log('📸 Taking mobile search screenshot...');
    await page.screenshot({
      path: 'nasa-jpl-search-mobile.png',
      fullPage: true
    });
    
    // Mobile Search Results
    if (await searchInput.count() > 0) {
      await searchInput.first().fill('Verein');
      await searchInput.first().press('Enter');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      console.log('📸 Taking mobile search results screenshot...');
      await page.screenshot({
        path: 'nasa-jpl-search-results-mobile.png',
        fullPage: true
      });
    }
    
    // Tablet Screenshots
    console.log('🍃 Switching to tablet viewport...');
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('https://zh-demo.ddev.site/search');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    console.log('📸 Taking tablet search screenshot...');
    await page.screenshot({
      path: 'nasa-jpl-search-tablet.png',
      fullPage: true
    });
    
    console.log('✅ All screenshots captured successfully!');
    
  } catch (error) {
    console.error('❌ Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
}

// Execute screenshot capture
captureSearchScreenshots();