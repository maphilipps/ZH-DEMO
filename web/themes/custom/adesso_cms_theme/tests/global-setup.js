/**
 * Global Setup for Playwright E2E Tests
 * 
 * This setup runs once before all tests and prepares the environment
 * for GPZH demo testing with Swiss compliance validation.
 */

const { chromium } = require('@playwright/test');

async function globalSetup(config) {
  console.log('🚀 Setting up GPZH demo environment for E2E testing...');
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Test basic connectivity to the DDEV environment
    const baseURL = config.projects[0].use.baseURL;
    console.log(`📡 Testing connectivity to: ${baseURL}`);
    
    await page.goto(baseURL);
    
    // Wait for basic page load
    await page.waitForSelector('body', { timeout: 10000 });
    
    console.log('✅ DDEV environment is accessible');
    
    // Check if Drupal is properly loaded
    const isDrupal = await page.evaluate(() => {
      return typeof window.Drupal !== 'undefined' || 
             document.querySelector('meta[name="Generator"]')?.content?.includes('Drupal');
    });
    
    if (isDrupal) {
      console.log('✅ Drupal system detected');
    } else {
      console.warn('⚠️  Drupal system not detected - tests may fail');
    }
    
    // Check if theme assets are loaded
    const themeAssetsLoaded = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[href*="adesso_cms_theme"]'));
      const scripts = Array.from(document.querySelectorAll('script[src*="adesso_cms_theme"]'));
      return links.length > 0 || scripts.length > 0;
    });
    
    if (themeAssetsLoaded) {
      console.log('✅ Theme assets detected');
    } else {
      console.warn('⚠️  Theme assets not detected - styling tests may fail');
    }
    
    // Pre-warm critical pages for faster testing
    const criticalPages = [
      '/',
      '/node/add',
      '/admin/content',
      '/user/login'
    ];
    
    for (const path of criticalPages) {
      try {
        await page.goto(`${baseURL}${path}`);
        await page.waitForLoadState('networkidle', { timeout: 5000 });
      } catch (error) {
        console.log(`ℹ️  Could not pre-warm ${path}: ${error.message}`);
      }
    }
    
    console.log('✅ Global setup completed successfully');
    
  } catch (error) {
    console.error('❌ Global setup failed:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

module.exports = globalSetup;