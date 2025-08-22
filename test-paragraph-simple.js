const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,  // Show browser to see what's happening
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  console.log('🔍 Testing Paragraph Demo Page...\n');
  
  try {
    // Try the node URL directly
    console.log('📄 Testing: https://zh-demo.ddev.site/node/156');
    await page.goto('https://zh-demo.ddev.site/node/156', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
    
    // Wait a bit for page to load
    await page.waitForTimeout(2000);
    
    // Get current URL after redirect
    const currentUrl = page.url();
    console.log(`📍 Current URL: ${currentUrl}\n`);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'paragraph-demo-browser.png',
      fullPage: true 
    });
    console.log('📸 Screenshot saved as: paragraph-demo-browser.png\n');
    
    // Check for Drupal errors
    const drupalError = await page.$('.messages--error');
    if (drupalError) {
      const errorText = await drupalError.textContent();
      console.log('❌ Drupal Error:', errorText);
    }
    
    // Check page content
    const pageContent = await page.textContent('body');
    
    if (pageContent.includes('The website encountered an unexpected error')) {
      console.log('❌ Drupal fatal error detected\n');
      
      // Try to get error details
      const errorDetails = await page.$eval('main', el => el.textContent).catch(() => 'Could not get error details');
      console.log('Error details:', errorDetails.substring(0, 500));
    } else {
      console.log('✅ Page loaded without fatal errors\n');
      
      // Count paragraphs
      const paragraphCount = await page.$$eval('[class*="paragraph--type--"]', els => els.length);
      console.log(`📊 Found ${paragraphCount} paragraph elements on page\n`);
      
      // List paragraph types found
      const paragraphTypes = await page.$$eval('[class*="paragraph--type--"]', els => {
        const types = new Set();
        els.forEach(el => {
          const match = el.className.match(/paragraph--type--(\S+)/);
          if (match) types.add(match[1]);
        });
        return Array.from(types);
      });
      
      console.log('Found paragraph types:');
      paragraphTypes.forEach(type => console.log(`  - ${type}`));
    }
    
    // Keep browser open for 5 seconds to see the page
    console.log('\n⏰ Keeping browser open for 5 seconds...');
    await page.waitForTimeout(5000);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
    console.log('\n✅ Test complete');
  }
})();