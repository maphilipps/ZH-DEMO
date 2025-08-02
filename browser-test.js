const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const page = await context.newPage();
  
  try {
    console.log('Navigating to front page...');
    await page.goto('https://adesso-cms.ddev.site');
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot of the front page
    await page.screenshot({ 
      path: '/Users/marc.philipps/Sites/adesso-cms/screenshot-desktop.png',
      fullPage: true 
    });
    console.log('Desktop screenshot saved');
    
    // Check for logo in header
    const headerLogo = await page.locator('header img.theme-logo').first();
    console.log('Header logo present:', await headerLogo.count() > 0);
    if (await headerLogo.count() > 0) {
      const logoSrc = await headerLogo.getAttribute('src');
      console.log('Header logo src:', logoSrc);
    }
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    // Take mobile screenshot
    await page.screenshot({ 
      path: '/Users/marc.philipps/Sites/adesso-cms/screenshot-mobile.png',
      fullPage: true 
    });
    console.log('Mobile screenshot saved');
    
    // Check for hamburger menu button - look for the button that opens mobile menu
    const hamburgerButton = await page.locator('button:has-text("Open main menu")');
    if (await hamburgerButton.count() > 0 && await hamburgerButton.isVisible()) {
      console.log('Opening mobile menu...');
      await hamburgerButton.click();
      await page.waitForTimeout(1000);
      
      // Take screenshot of mobile menu
      await page.screenshot({ 
        path: '/Users/marc.philipps/Sites/adesso-cms/screenshot-mobile-menu.png',
        fullPage: true 
      });
      console.log('Mobile menu screenshot saved');
      
      // Check for logo in mobile menu
      const mobileMenuLogo = await page.locator('[x-show="mobileMenuOpen"] img.theme-logo').first();
      console.log('Mobile menu logo present:', await mobileMenuLogo.count() > 0);
      if (await mobileMenuLogo.count() > 0) {
        const logoSrc = await mobileMenuLogo.getAttribute('src');
        console.log('Mobile menu logo src:', logoSrc);
      }
      
      // Close mobile menu
      const closeButton = await page.locator('button:has-text("Close menu")');
      if (await closeButton.isVisible()) {
        await closeButton.click();
        await page.waitForTimeout(500);
      }
    } else {
      console.log('Hamburger button not found or not visible');
    }
    
    // Return to desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(500);
    
    // Scroll to footer and check for logo
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    const footerLogos = await page.locator('footer img');
    console.log('Footer logos found:', await footerLogos.count());
    
    if (await footerLogos.count() > 0) {
      for (let i = 0; i < await footerLogos.count(); i++) {
        const logo = footerLogos.nth(i);
        const logoSrc = await logo.getAttribute('src');
        console.log(`Footer logo ${i + 1} src:`, logoSrc);
      }
    }
    
    // Take screenshot of footer
    await page.screenshot({ 
      path: '/Users/marc.philipps/Sites/adesso-cms/screenshot-footer.png'
    });
    console.log('Footer screenshot saved');
    
    // Get the page source to analyze HTML
    const pageContent = await page.content();
    
    // Extract logo-related elements
    const logoMatches = pageContent.match(/<img[^>]*(?:logo|theme-logo)[^>]*>/gi) || [];
    console.log('\nLogo elements found in HTML:');
    logoMatches.forEach((match, index) => {
      console.log(`${index + 1}:`, match);
    });
    
  } catch (error) {
    console.error('Error during browser automation:', error);
  } finally {
    await browser.close();
  }
})();