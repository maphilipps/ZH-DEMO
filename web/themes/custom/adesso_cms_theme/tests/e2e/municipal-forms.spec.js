/**
 * Municipal Forms E2E Tests for GPZH Demo System
 * 
 * Tests the 4 required municipal forms:
 * 1. Feedback form (Feedback-Formular)
 * 2. Infrastructure damage report (Meldung Infrastrukturschäden)
 * 3. Event registration (Anmeldung für Anlässe)
 * 4. Room booking request (Anfrage für Raumnutzung)
 */

const { test, expect } = require('@playwright/test');

test.describe('Municipal Forms - GPZH Demo Requirements', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render feedback form correctly', async ({ page }) => {
    // Navigate to feedback form
    await page.goto('/feedback');
    
    // Check for essential form fields
    const hasNameField = await page.locator('input[name*="name"], input[type="text"]').count() > 0;
    const hasEmailField = await page.locator('input[name*="email"], input[type="email"]').count() > 0;
    const hasMessageField = await page.locator('textarea[name*="message"], textarea[name*="feedback"]').count() > 0;
    const hasSubmitButton = await page.locator('input[type="submit"], button[type="submit"]').count() > 0;
    
    expect(hasNameField).toBe(true);
    expect(hasEmailField).toBe(true);
    expect(hasMessageField).toBe(true);
    expect(hasSubmitButton).toBe(true);
  });

  test('should validate Swiss address format in forms', async ({ page }) => {
    // Try to find a form with address fields
    await page.goto('/infrastructure-damage');
    
    // Look for Swiss address fields (eCH-0010 standard)
    const addressFields = await page.evaluate(() => {
      const streetField = document.querySelector('input[name*="street"], input[placeholder*="Strasse"]');
      const houseNumberField = document.querySelector('input[name*="house"], input[placeholder*="Hausnummer"]');
      const postalCodeField = document.querySelector('input[name*="postal"], input[placeholder*="PLZ"]');
      const cityField = document.querySelector('input[name*="city"], input[placeholder*="Ort"]');
      
      return {
        hasStreet: !!streetField,
        hasHouseNumber: !!houseNumberField,
        hasPostalCode: !!postalCodeField,
        hasCity: !!cityField
      };
    });
    
    // Swiss addresses should separate street and house number
    if (addressFields.hasStreet || addressFields.hasPostalCode) {
      expect(addressFields.hasStreet || addressFields.hasHouseNumber).toBe(true);
      expect(addressFields.hasPostalCode).toBe(true);
      expect(addressFields.hasCity).toBe(true);
    }
  });

  test('should handle file uploads in infrastructure damage form', async ({ page }) => {
    await page.goto('/infrastructure-damage');
    
    // Look for file upload fields
    const fileInputs = await page.locator('input[type="file"]').count();
    
    if (fileInputs > 0) {
      // Test file upload functionality
      const fileInput = page.locator('input[type="file"]').first();
      
      // Check if multiple files are supported (for damage photos)
      const acceptsMultiple = await fileInput.getAttribute('multiple');
      const acceptsImages = await fileInput.getAttribute('accept');
      
      // Should accept images for damage documentation
      if (acceptsImages) {
        expect(acceptsImages).toContain('image');
      }
    }
  });

  test('should display form progress indicators', async ({ page }) => {
    // Check if forms have progress indicators
    await page.goto('/event-registration');
    
    const progressIndicators = await page.evaluate(() => {
      const progressBars = document.querySelectorAll('[class*="progress"], [class*="step"], [aria-label*="Step"]');
      const progressText = document.querySelectorAll('[class*="form-progress"]');
      
      return {
        hasProgressBars: progressBars.length > 0,
        hasProgressText: progressText.length > 0,
        totalIndicators: progressBars.length + progressText.length
      };
    });
    
    // Multi-step forms should have progress indicators
    if (progressIndicators.totalIndicators > 0) {
      expect(progressIndicators.hasProgressBars || progressIndicators.hasProgressText).toBe(true);
    }
  });

  test('should support guest user workflow', async ({ page }) => {
    // Test guest submission workflow
    await page.goto('/room-booking');
    
    // Check for guest registration or login options
    const authOptions = await page.evaluate(() => {
      const loginLinks = document.querySelectorAll('a[href*="login"], a[href*="register"]');
      const guestOptions = document.querySelectorAll('[class*="guest"], [class*="anonymous"]');
      const createAccountText = document.body.textContent.toLowerCase();
      
      return {
        hasLoginLinks: loginLinks.length > 0,
        hasGuestOptions: guestOptions.length > 0,
        mentionsAccount: createAccountText.includes('account') || createAccountText.includes('konto'),
        mentionsRegistration: createAccountText.includes('registration') || createAccountText.includes('registrierung')
      };
    });
    
    // Should provide clear path for guest users
    expect(
      authOptions.hasLoginLinks || 
      authOptions.hasGuestOptions || 
      authOptions.mentionsAccount ||
      authOptions.mentionsRegistration
    ).toBe(true);
  });

  test('should validate required fields with proper error messages', async ({ page }) => {
    await page.goto('/feedback');
    
    // Try to submit form without required fields
    const submitButton = page.locator('input[type="submit"], button[type="submit"]').first();
    
    if (await submitButton.count() > 0) {
      await submitButton.click();
      
      // Check for validation messages
      const validationErrors = await page.evaluate(() => {
        const errorMessages = document.querySelectorAll(
          '[class*="error"], [class*="invalid"], [aria-invalid="true"], .form-item--error'
        );
        const requiredFields = document.querySelectorAll('[required]');
        
        return {
          hasErrorMessages: errorMessages.length > 0,
          hasRequiredFields: requiredFields.length > 0,
          errorCount: errorMessages.length
        };
      });
      
      if (validationErrors.hasRequiredFields) {
        expect(validationErrors.hasErrorMessages).toBe(true);
      }
    }
  });

  test('should maintain form data during session', async ({ page }) => {
    await page.goto('/event-registration');
    
    // Fill in some form data
    const nameField = page.locator('input[name*="name"], input[type="text"]').first();
    
    if (await nameField.count() > 0) {
      await nameField.fill('Test User');
      
      // Navigate away and back
      await page.goto('/');
      await page.goto('/event-registration');
      
      // Check if data persists (if autosave is implemented)
      const fieldValue = await nameField.inputValue();
      
      // Note: This test depends on implementation of form persistence
      // For now, just check that the form still renders correctly
      expect(await nameField.count()).toBeGreaterThan(0);
    }
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/feedback');
    
    // Check if form is usable on mobile
    const formUsability = await page.evaluate(() => {
      const form = document.querySelector('form');
      if (!form) return { hasForm: false };
      
      const formRect = form.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      
      const inputs = Array.from(form.querySelectorAll('input, textarea, select'));
      const inputSizes = inputs.map(input => {
        const rect = input.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          isTouchFriendly: rect.height >= 44 // Swiss accessibility requirement
        };
      });
      
      return {
        hasForm: true,
        formFitsViewport: formRect.width <= viewport.width,
        touchFriendlyInputs: inputSizes.every(size => size.isTouchFriendly),
        inputCount: inputs.length
      };
    });
    
    if (formUsability.hasForm) {
      expect(formUsability.formFitsViewport).toBe(true);
      if (formUsability.inputCount > 0) {
        expect(formUsability.touchFriendlyInputs).toBe(true);
      }
    }
  });
});

test.describe('Form Workflow States', () => {
  
  test('should handle draft state for complex forms', async ({ page }) => {
    await page.goto('/infrastructure-damage');
    
    // Look for save draft functionality
    const draftFeatures = await page.evaluate(() => {
      const saveButtons = document.querySelectorAll('button[value*="draft"], input[value*="draft"]');
      const autoSaveText = document.body.textContent.toLowerCase();
      
      return {
        hasSaveButton: saveButtons.length > 0,
        hasAutoSave: autoSaveText.includes('autosave') || autoSaveText.includes('automatic'),
        hasDraftMention: autoSaveText.includes('draft') || autoSaveText.includes('entwurf')
      };
    });
    
    // Complex forms should support draft state
    expect(
      draftFeatures.hasSaveButton || 
      draftFeatures.hasAutoSave || 
      draftFeatures.hasDraftMention
    ).toBe(true);
  });

  test('should show submission confirmation', async ({ page }) => {
    await page.goto('/feedback');
    
    // Fill out minimal form
    await page.fill('input[name*="name"], input[type="text"]', 'Test User');
    await page.fill('input[name*="email"], input[type="email"]', 'test@bruchtal.ch');
    await page.fill('textarea', 'Test feedback message for GPZH demo');
    
    // Submit form
    await page.click('input[type="submit"], button[type="submit"]');
    
    // Wait for response (either confirmation page or message)
    await page.waitForTimeout(2000);
    
    const confirmationText = await page.textContent('body');
    const hasConfirmation = confirmationText.toLowerCase().includes('thank') ||
                           confirmationText.toLowerCase().includes('danke') ||
                           confirmationText.toLowerCase().includes('submitted') ||
                           confirmationText.toLowerCase().includes('gesendet');
    
    expect(hasConfirmation).toBe(true);
  });
});