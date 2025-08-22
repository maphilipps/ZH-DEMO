const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  console.log('🔍 Testing Paragraph Demo Page...\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  try {
    // Navigate to the page
    console.log('📄 Navigating to: https://zh-demo.ddev.site/paragraph-demo-alle-komponenten');
    const response = await page.goto('https://zh-demo.ddev.site/paragraph-demo-alle-komponenten', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    // Check response status
    const status = response.status();
    console.log(`✅ Page loaded with status: ${status}\n`);
    
    if (status !== 200) {
      console.error(`❌ Error: Page returned status ${status}`);
      await browser.close();
      process.exit(1);
    }
    
    // Get page title
    const title = await page.title();
    console.log(`📋 Page Title: ${title}\n`);
    
    // Check for error messages
    const errorMessages = await page.$$eval('.messages--error', elements => 
      elements.map(el => el.textContent.trim())
    );
    
    if (errorMessages.length > 0) {
      console.log('⚠️  Error messages found:');
      errorMessages.forEach(msg => console.log(`   - ${msg}`));
      console.log('');
    }
    
    // Check for each paragraph type
    console.log('🧩 Checking Paragraph Components:\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    const paragraphChecks = [
      { selector: '.paragraph--type--hero', name: '🦸 Hero Section' },
      { selector: '.paragraph--type--text', name: '📝 Text Paragraph' },
      { selector: '.paragraph--type--layout-container', name: '📐 Layout Container' },
      { selector: '.paragraph--type--card-group', name: '🎴 Card Group' },
      { selector: '.paragraph--type--accordion', name: '❓ Accordion' },
      { selector: '.paragraph--type--gallery', name: '🖼️ Gallery' },
      { selector: '.paragraph--type--sidebyside', name: '↔️ Side by Side' },
      { selector: '.paragraph--type--newsletter', name: '📧 Newsletter' },
      { selector: '.paragraph--type--stats-item', name: '📊 Stats Item' },
      { selector: '.paragraph--type--download', name: '⬇️ Download Section' },
      { selector: '.paragraph--type--pricing', name: '💰 Pricing' },
      { selector: '.paragraph--type--carousel', name: '🎠 Carousel' },
      { selector: '.paragraph--type--logo-collection', name: '🤝 Logo Collection' },
      { selector: '.paragraph--type--embed', name: '🎥 Embed' },
      { selector: '.paragraph--type--webform-embed', name: '📋 Webform Embed' }
    ];
    
    let foundCount = 0;
    let missingCount = 0;
    
    for (const check of paragraphChecks) {
      const elements = await page.$$(check.selector);
      if (elements.length > 0) {
        console.log(`✅ ${check.name} - Found (${elements.length}x)`);
        foundCount += elements.length;
        
        // Check for visible content
        for (let i = 0; i < elements.length; i++) {
          const isVisible = await elements[i].isVisible();
          if (!isVisible) {
            console.log(`   ⚠️  Element ${i + 1} is not visible`);
          }
        }
      } else {
        console.log(`❌ ${check.name} - Not found`);
        missingCount++;
      }
    }
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log(`📊 Summary:`);
    console.log(`   ✅ Found: ${foundCount} paragraph elements`);
    console.log(`   ❌ Missing: ${missingCount} paragraph types\n`);
    
    // Check for JavaScript errors
    const jsErrors = [];
    page.on('pageerror', error => jsErrors.push(error.message));
    
    // Take a screenshot
    console.log('📸 Taking screenshot...');
    await page.screenshot({ 
      path: 'paragraph-demo-screenshot.png',
      fullPage: true 
    });
    console.log('✅ Screenshot saved as: paragraph-demo-screenshot.png\n');
    
    // Check page height to see if content is rendered
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log(`📏 Page height: ${pageHeight}px`);
    
    if (pageHeight < 1000) {
      console.log('⚠️  Warning: Page seems very short, content might not be rendering properly\n');
    } else {
      console.log('✅ Page has substantial content\n');
    }
    
    // Check for specific content in paragraphs
    console.log('🔍 Checking Content Visibility:\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Check Hero title
    const heroTitle = await page.$eval('.paragraph--type--hero h1, .paragraph--type--hero h2, .paragraph--type--hero .field--name-field-title', 
      el => el?.textContent?.trim() || 'Not found'
    ).catch(() => 'Not found');
    console.log(`Hero Title: "${heroTitle}"`);
    
    // Check for accordion items
    const accordionItems = await page.$$('.paragraph--type--accordion-item');
    console.log(`Accordion Items: ${accordionItems.length}`);
    
    // Check for cards in card group
    const cards = await page.$$('.paragraph--type--card');
    console.log(`Cards: ${cards.length}`);
    
    // Performance metrics
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('⚡ Performance Metrics:\n');
    const metrics = await page.evaluate(() => {
      const timing = performance.timing;
      return {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        loadComplete: timing.loadEventEnd - timing.navigationStart
      };
    });
    
    console.log(`DOM Content Loaded: ${metrics.domContentLoaded}ms`);
    console.log(`Page Load Complete: ${metrics.loadComplete}ms`);
    
    if (metrics.loadComplete > 3000) {
      console.log('⚠️  Warning: Page load time is over 3 seconds');
    }
    
    // Final summary
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    if (missingCount === 0 && foundCount > 10) {
      console.log('✅ SUCCESS: All paragraph types are rendering correctly!');
    } else if (foundCount > 5) {
      console.log('⚠️  PARTIAL SUCCESS: Some paragraph types are rendering');
    } else {
      console.log('❌ FAILURE: Most paragraph types are not rendering');
    }
    
  } catch (error) {
    console.error('❌ Error during testing:', error.message);
    
    // Try to get more info about the error
    const pageContent = await page.content();
    if (pageContent.includes('The website encountered an unexpected error')) {
      console.log('\n⚠️  Drupal error detected on page');
      
      // Try to extract error message
      const errorText = await page.$eval('.messages--error', el => el.textContent).catch(() => null);
      if (errorText) {
        console.log('Error message:', errorText);
      }
    }
  } finally {
    await browser.close();
  }
})();