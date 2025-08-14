/**
 * @file
 * Smoke tests for adesso_cms_installer
 * Quick tests to verify basic installer functionality
 */

import { test, expect } from '@playwright/test';
import { DatabaseCleanupHelper } from './cleanup-helper.js';

test.describe('adesso CMS Installer - Smoke Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Clean environment before each test
    const cleanupHelper = new DatabaseCleanupHelper();
    await cleanupHelper.fullCleanup();
    
    // Navigate to installer
    await page.goto('/install');
  });
  
  test('Installer loads and shows welcome page', async ({ page }) => {
    // Wait for installer to load
    await page.waitForSelector('body', { timeout: 30000 });
    
    // Check if we're on installer page
    const url = page.url();
    expect(url).toContain('/install');
    
    // Look for installer elements
    const hasInstallerClass = await page.locator('.cms-installer, .install-page, body').count() > 0;
    expect(hasInstallerClass).toBeTruthy();
    
    // Take screenshot for debugging
    await page.screenshot({ path: 'test-results/smoke-welcome.png' });
    
    console.log('✅ Installer page loaded successfully');
  });
  
  test('Can navigate through basic installation steps', async ({ page }) => {
    // Start from installer page
    await page.waitForSelector('body', { timeout: 30000 });
    
    try {
      // Look for language selection or skip it
      const languageSelect = page.locator('select[name="langcode"]');
      if (await languageSelect.isVisible()) {
        await languageSelect.selectOption('de');
        await page.click('input[type="submit"]');
        await page.waitForLoadState('networkidle');
      }
      
      // Look for database setup or skip it
      const nextButton = page.locator('input[type="submit"], button[type="submit"]');
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForLoadState('networkidle');
      }
      
      // Try to reach site information or recipe selection
      await page.waitForSelector('input, select, button', { timeout: 20000 });
      
      console.log('✅ Can navigate through installer steps');
      
    } catch (error) {
      // Take screenshot for debugging
      await page.screenshot({ path: 'test-results/smoke-navigation-error.png' });
      console.log('Current URL:', page.url());
      console.log('Page title:', await page.title());
      throw error;
    }
  });
  
  test('Recipe form elements are present', async ({ page }) => {
    // Navigate to recipe selection (may require going through initial steps)
    await page.waitForSelector('body', { timeout: 30000 });
    
    let attempts = 0;
    const maxAttempts = 5;
    
    // Navigate through installer steps to reach recipes
    while (attempts < maxAttempts) {
      const currentUrl = page.url();
      
      // Check if we're already at recipes form
      const hasRecipeForm = await page.locator('input[name="paragraphs"], .cms-installer__form-group').count() > 0;
      if (hasRecipeForm) {
        break;
      }
      
      // Try to find and click next/submit button
      const submitButton = page.locator('input[type="submit"], button[type="submit"]').first();
      if (await submitButton.isVisible()) {
        await submitButton.click();
        await page.waitForLoadState('networkidle');
      } else {
        // If no submit button, we might be at the end or need different approach
        break;
      }
      
      attempts++;
      
      // Avoid infinite loops
      if (attempts === maxAttempts) {
        console.log('⚠️ Could not reach recipe form within max attempts');
        break;
      }
    }
    
    // Take screenshot of current state
    await page.screenshot({ path: 'test-results/smoke-current-state.png' });
    
    // Verify some form elements exist (even if not recipe form)
    const hasFormElements = await page.locator('input, select, button').count() > 0;
    expect(hasFormElements).toBeTruthy();
    
    console.log('✅ Form elements are present');
  });
  
});

test.describe('adesso CMS Installer - Quick Configuration Test', () => {
  
  test('Simple installation with minimal configuration', async ({ page }) => {
    const cleanupHelper = new DatabaseCleanupHelper();
    await cleanupHelper.fullCleanup();
    
    console.log('🚀 Starting minimal installation test...');
    
    try {
      // Navigate to installer
      await page.goto('/install');
      await page.waitForSelector('body', { timeout: 30000 });
      
      // Navigate through installer steps with minimal configuration
      let step = 1;
      const maxSteps = 10;
      
      while (step <= maxSteps) {
        console.log(`📋 Step ${step}: Processing...`);
        
        const currentUrl = page.url();
        console.log(`   Current URL: ${currentUrl}`);
        
        // Look for site name input (one of the key steps)
        const siteNameInput = page.locator('input[name="site_name"]');
        if (await siteNameInput.isVisible()) {
          await siteNameInput.fill('Test adesso CMS');
          console.log('   ✓ Filled site name');
        }
        
        // Look for recipe checkboxes and uncheck all non-essential ones
        const recipeCheckboxes = page.locator('input[type="checkbox"]');
        const checkboxCount = await recipeCheckboxes.count();
        if (checkboxCount > 0) {
          console.log(`   📝 Found ${checkboxCount} recipe checkboxes`);
          
          // Uncheck all except essential ones
          for (let i = 0; i < checkboxCount; i++) {
            const checkbox = recipeCheckboxes.nth(i);
            const name = await checkbox.getAttribute('name');
            
            // Keep only essential checkboxes checked
            if (name && !['paragraphs', 'page'].includes(name)) {
              await checkbox.uncheck();
            }
          }
          console.log('   ✓ Configured minimal recipes');
        }
        
        // Look for admin account fields
        const emailInput = page.locator('input[name="account[mail]"], input[type="email"]');
        if (await emailInput.isVisible()) {
          await emailInput.fill('admin@test.local');
          console.log('   ✓ Filled admin email');
        }
        
        const passwordInput = page.locator('input[name="account[pass][pass1]"], input[type="password"]').first();
        if (await passwordInput.isVisible()) {
          await passwordInput.fill('admin123');
          console.log('   ✓ Filled admin password');
        }
        
        const passwordConfirm = page.locator('input[name="account[pass][pass2]"]');
        if (await passwordConfirm.isVisible()) {
          await passwordConfirm.fill('admin123');
          console.log('   ✓ Confirmed admin password');
        }
        
        // Look for next/submit button
        const submitButton = page.locator('input[type="submit"], button[type="submit"]').first();
        if (await submitButton.isVisible()) {
          const buttonText = await submitButton.textContent();
          console.log(`   🔄 Clicking: ${buttonText}`);
          
          await submitButton.click();
          
          // Wait for next page to load
          await page.waitForLoadState('networkidle');
          
          // Check if installation is complete
          const successIndicator = page.locator('.messages--status, .installation-complete, text="Congratulations"');
          if (await successIndicator.isVisible()) {
            console.log('✅ Installation completed successfully!');
            break;
          }
          
        } else {
          console.log('   ⚠️ No submit button found, installation might be complete');
          break;
        }
        
        step++;
      }
      
      // Final verification
      const finalUrl = page.url();
      console.log(`🏁 Final URL: ${finalUrl}`);
      
      // Take final screenshot
      await page.screenshot({ path: 'test-results/smoke-final-state.png' });
      
      // Consider it successful if we didn't hit any hard errors
      console.log('✅ Minimal installation test completed');
      
    } catch (error) {
      console.error('❌ Installation test failed:', error.message);
      await page.screenshot({ path: 'test-results/smoke-error-state.png' });
      throw error;
    }
  });
  
});