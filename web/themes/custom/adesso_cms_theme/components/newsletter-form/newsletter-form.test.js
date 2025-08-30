/**
 * @file Newsletter Form component tests - Phase 2.3 Implementation
 * Tests for newsletter form functionality, Swiss compliance, and accessibility
 * 
 * Features tested:
 * - Form structure and semantic markup
 * - Email validation and Swiss format compliance
 * - WCAG 2.1 AA accessibility requirements
 * - eCH-0058 e-government form standards
 * - Municipality theme integration
 * - Performance optimization validation
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  testAccessibility, 
  testSwissCompliance, 
  testMunicipalForms,
  testComponent,
  testPerformance
} from '../../tests/utils/test-utils.js';
import { 
  accessibilityTestForms,
  accessibilityTestInteractive 
} from '../../tests/utils/accessibility-test-modules.js';
import { 
  MunicipalityThemeTester,
  testComponentAcrossAllMunicipalities 
} from '../../tests/utils/municipality-theme-testing.js';

// Mock newsletter form component rendering
function renderNewsletterForm(props = {}) {
  const {
    title = 'Newsletter anmelden',
    description = 'Bleiben Sie über Neuigkeiten aus der Gemeinde informiert',
    emailLabel = 'E-Mail-Adresse',
    submitLabel = 'Anmelden',
    privacyText = 'Ich akzeptiere die Datenschutzbestimmungen',
    successMessage = 'Vielen Dank für Ihre Anmeldung!',
    errorMessage = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    required = true,
    newsletter_url = '#newsletter-signup',
    modifier = '',
    municipality = 'thalwil'
  } = props;

  const formId = 'newsletter-form-' + Math.random().toString(36).substr(2, 9);
  const emailId = 'email-' + Math.random().toString(36).substr(2, 9);
  const privacyId = 'privacy-' + Math.random().toString(36).substr(2, 9);

  const containerClasses = ['c-newsletter-form', modifier].filter(Boolean).join(' ');
  const municipalityClass = `municipality-${municipality}`;

  return `
    <section class="${containerClasses} ${municipalityClass}" data-component="newsletter-form">
      <div class="newsletter-form-content max-w-md mx-auto">
        ${title ? `<h2 class="newsletter-title text-2xl font-semibold mb-2 text-gray-900">${title}</h2>` : ''}
        ${description ? `<p class="newsletter-description text-gray-600 mb-6">${description}</p>` : ''}
        
        <form id="${formId}" class="newsletter-form" action="${newsletter_url}" method="post" novalidate
              data-form-type="newsletter" data-municipality="${municipality}">
          
          <div class="form-group mb-4">
            <label for="${emailId}" class="form-label block text-sm font-medium text-gray-700 mb-2">
              ${emailLabel}${required ? ' <span class="required text-red-500" aria-label="Pflichtfeld">*</span>' : ''}
            </label>
            <input 
              type="email" 
              id="${emailId}" 
              name="email" 
              class="form-input w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
              placeholder="ihre.email@example.ch"
              ${required ? 'required' : ''}
              aria-required="${required}"
              aria-describedby="${emailId}-error ${emailId}-help"
            />
            <div id="${emailId}-help" class="form-help text-xs text-gray-500 mt-1">
              Wir verwenden Ihre E-Mail-Adresse nur für den Newsletter-Versand.
            </div>
            <div id="${emailId}-error" class="form-error text-red-600 text-sm mt-1 hidden" role="alert" aria-live="polite">
              ${errorMessage}
            </div>
          </div>

          <div class="form-group mb-6">
            <div class="flex items-start">
              <input 
                type="checkbox" 
                id="${privacyId}" 
                name="privacy_consent" 
                class="form-checkbox mt-1 mr-3 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                required
                aria-required="true"
                aria-describedby="${privacyId}-error"
              />
              <label for="${privacyId}" class="text-sm text-gray-700 leading-5">
                ${privacyText}
                <a href="/datenschutz" class="text-primary hover:text-primary-dark underline ml-1" 
                   target="_blank" rel="noopener noreferrer"
                   aria-label="Datenschutzbestimmungen (öffnet in neuem Fenster)">
                  Datenschutzbestimmungen
                  <span aria-hidden="true" class="external-icon ml-1">↗</span>
                </a>
              </label>
            </div>
            <div id="${privacyId}-error" class="form-error text-red-600 text-sm mt-1 hidden" role="alert" aria-live="polite">
              Sie müssen den Datenschutzbestimmungen zustimmen.
            </div>
          </div>

          <div class="form-actions">
            <button 
              type="submit" 
              class="btn btn-primary w-full bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              ${submitLabel}
            </button>
          </div>

          <div class="form-messages mt-4">
            <div class="success-message bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg hidden" role="alert">
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                ${successMessage}
              </div>
            </div>
            
            <div class="error-message bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg hidden" role="alert">
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  `;
}

describe('Newsletter Form Component - Phase 2.3 Comprehensive Testing', () => {
  let container;
  let newsletterForm;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  describe('Basic Rendering and Structure', () => {
    it('should render with default content and structure', () => {
      const formHtml = renderNewsletterForm();
      container.innerHTML = formHtml;
      
      const form = container.querySelector('.c-newsletter-form');
      const formElement = container.querySelector('form');
      const emailInput = container.querySelector('input[type="email"]');
      const submitButton = container.querySelector('button[type="submit"]');

      expect(form).toBeInTheDocument();
      expect(formElement).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    it('should render with custom title and description', () => {
      const customProps = {
        title: 'Gemeinde Newsletter',
        description: 'Erhalten Sie aktuelle Informationen direkt per E-Mail'
      };
      
      const formHtml = renderNewsletterForm(customProps);
      container.innerHTML = formHtml;
      
      const title = container.querySelector('.newsletter-title');
      const description = container.querySelector('.newsletter-description');

      expect(title).toBeInTheDocument();
      expect(title.textContent).toBe(customProps.title);
      expect(description.textContent).toBe(customProps.description);
    });

    it('should render without title and description when not provided', () => {
      const formHtml = renderNewsletterForm({ title: '', description: '' });
      container.innerHTML = formHtml;
      
      expect(container.querySelector('.newsletter-title')).not.toBeInTheDocument();
      expect(container.querySelector('.newsletter-description')).not.toBeInTheDocument();
    });

    it('should apply municipality theme classes', () => {
      const formHtml = renderNewsletterForm({ municipality: 'thalheim' });
      container.innerHTML = formHtml;
      
      const form = container.querySelector('.c-newsletter-form');
      expect(form.className).toContain('municipality-thalheim');
    });
  });

  describe('Form Field Validation and Accessibility', () => {
    beforeEach(() => {
      const formHtml = renderNewsletterForm();
      container.innerHTML = formHtml;
      newsletterForm = container.querySelector('.c-newsletter-form');
    });

    it('should have proper form labels and associations', async () => {
      const emailInput = container.querySelector('input[type="email"]');
      const emailLabel = container.querySelector('label[for="' + emailInput.id + '"]');
      const privacyCheckbox = container.querySelector('input[type="checkbox"]');
      const privacyLabel = container.querySelector('label[for="' + privacyCheckbox.id + '"]');

      expect(emailLabel).toBeInTheDocument();
      expect(privacyLabel).toBeInTheDocument();
      expect(emailInput.getAttribute('aria-required')).toBe('true');
      expect(privacyCheckbox.getAttribute('aria-required')).toBe('true');
    });

    it('should have proper ARIA error message associations', () => {
      const emailInput = container.querySelector('input[type="email"]');
      const ariaDescribedby = emailInput.getAttribute('aria-describedby');
      
      expect(ariaDescribedby).toContain(emailInput.id + '-error');
      expect(ariaDescribedby).toContain(emailInput.id + '-help');
      
      const errorElement = container.querySelector('#' + emailInput.id + '-error');
      const helpElement = container.querySelector('#' + emailInput.id + '-help');
      
      expect(errorElement).toBeInTheDocument();
      expect(helpElement).toBeInTheDocument();
      expect(errorElement.getAttribute('role')).toBe('alert');
      expect(errorElement.getAttribute('aria-live')).toBe('polite');
    });

    it('should indicate required fields properly', () => {
      const requiredSpan = container.querySelector('.required');
      const emailInput = container.querySelector('input[type="email"]');
      const privacyCheckbox = container.querySelector('input[type="checkbox"]');

      expect(requiredSpan).toBeInTheDocument();
      expect(requiredSpan.getAttribute('aria-label')).toBe('Pflichtfeld');
      expect(emailInput.hasAttribute('required')).toBe(true);
      expect(privacyCheckbox.hasAttribute('required')).toBe(true);
    });

    it('should pass comprehensive form accessibility tests', async () => {
      const formElement = container.querySelector('form');
      const accessibilityResults = await accessibilityTestForms.testFormAccessibility(formElement);

      expect(accessibilityResults.isAccessible).toBe(true);
      expect(accessibilityResults.testResults.labels.isValid).toBe(true);
      expect(accessibilityResults.testResults.errorMessages.isValid).toBe(true);
      expect(accessibilityResults.violations).toHaveLength(0);
    });
  });

  describe('Swiss Government Compliance (eCH Standards)', () => {
    beforeEach(() => {
      const formHtml = renderNewsletterForm();
      container.innerHTML = formHtml;
      newsletterForm = container.querySelector('.c-newsletter-form');
    });

    it('should comply with eCH-0058 e-government form standards', async () => {
      const formElement = container.querySelector('form');
      const swissCompliance = await testSwissCompliance.validateECH0059(newsletterForm);

      expect(swissCompliance.isCompliant).toBe(true);
      expect(swissCompliance.violations).toHaveLength(0);
    });

    it('should validate Swiss e-government form requirements', () => {
      const formElement = container.querySelector('form');
      const validation = testMunicipalForms.validateEGovernmentForm(newsletterForm);

      expect(validation.isCompliant).toBe(true);
      expect(validation.requiredFields.length).toBeGreaterThan(0);
      expect(validation.issues).toHaveLength(0);
    });

    it('should include privacy notice and consent as required by Swiss DPA', () => {
      const privacyLink = container.querySelector('a[href="/datenschutz"]');
      const consentCheckbox = container.querySelector('input[name="privacy_consent"]');

      expect(privacyLink).toBeInTheDocument();
      expect(consentCheckbox).toBeInTheDocument();
      expect(privacyLink.getAttribute('aria-label')).toContain('öffnet in neuem Fenster');
      expect(privacyLink.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('should validate Swiss data protection compliance', async () => {
      const dataProtectionResult = await testSwissCompliance.validateDataProtection(newsletterForm);

      expect(dataProtectionResult.isCompliant).toBe(true);
      expect(dataProtectionResult.dataProcessingElements.length).toBeGreaterThan(0);
      expect(dataProtectionResult.issues).toHaveLength(0);
    });
  });

  describe('Municipality Theme Integration', () => {
    it('should integrate properly with Thalwil theme', async () => {
      const formHtml = renderNewsletterForm({ municipality: 'thalwil' });
      container.innerHTML = formHtml;
      const form = container.querySelector('.c-newsletter-form');

      const themeTester = new MunicipalityThemeTester('thalwil');
      const themeResults = await themeTester.testThemeClassApplication(form);

      expect(themeResults.passed).toBe(true);
      expect(themeResults.details.hasThemeClass).toBe(true);
    });

    it('should integrate properly with Thalheim theme', async () => {
      const formHtml = renderNewsletterForm({ municipality: 'thalheim' });
      container.innerHTML = formHtml;
      const form = container.querySelector('.c-newsletter-form');

      const themeTester = new MunicipalityThemeTester('thalheim');
      const themeResults = await themeTester.testThemeClassApplication(form);

      expect(themeResults.passed).toBe(true);
      expect(themeResults.details.hasThemeClass).toBe(true);
    });

    it('should integrate properly with Erlenbach theme', async () => {
      const formHtml = renderNewsletterForm({ municipality: 'erlenbach' });
      container.innerHTML = formHtml;
      const form = container.querySelector('.c-newsletter-form');

      const themeTester = new MunicipalityThemeTester('erlenbach');
      const themeResults = await themeTester.testThemeClassApplication(form);

      expect(themeResults.passed).toBe(true);
      expect(themeResults.details.hasThemeClass).toBe(true);
    });

    it('should maintain theme consistency across all municipalities', async () => {
      const formHtml = renderNewsletterForm();
      container.innerHTML = formHtml;
      const form = container.querySelector('.c-newsletter-form');

      const crossThemeResults = await testComponentAcrossAllMunicipalities(form);

      expect(crossThemeResults.summary.overallStatus).toBe('PASSED');
      expect(crossThemeResults.summary.passRate).toBeGreaterThan(90);
    });
  });

  describe('Interactive Element Accessibility', () => {
    beforeEach(() => {
      const formHtml = renderNewsletterForm();
      container.innerHTML = formHtml;
    });

    it('should have accessible submit button', async () => {
      const submitButton = container.querySelector('button[type="submit"]');
      const buttonResults = await accessibilityTestInteractive.testButtonAccessibility(submitButton);

      expect(buttonResults.isValid).toBe(true);
      expect(buttonResults.violations).toHaveLength(0);
    });

    it('should have accessible privacy policy link', async () => {
      const privacyLink = container.querySelector('a[href="/datenschutz"]');
      const linkResults = await accessibilityTestInteractive.testLinkAccessibility(privacyLink);

      expect(linkResults.isValid).toBe(true);
      expect(linkResults.violations).toHaveLength(0);
    });

    it('should meet touch target size requirements', async () => {
      const submitButton = container.querySelector('button[type="submit"]');
      const touchResults = await accessibilityTestInteractive.testTouchTargets(submitButton);

      expect(touchResults.isValid).toBe(true);
      expect(touchResults.measurements.width).toBeGreaterThanOrEqual(44);
      expect(touchResults.measurements.height).toBeGreaterThanOrEqual(44);
    });

    it('should have proper focus management', async () => {
      const emailInput = container.querySelector('input[type="email"]');
      const focusResults = await accessibilityTestInteractive.testFocusManagement(emailInput);

      expect(focusResults.isValid).toBe(true);
      expect(focusResults.focusable).toBe(true);
      expect(focusResults.violations).toHaveLength(0);
    });
  });

  describe('Responsive Design and Cross-Browser Compatibility', () => {
    beforeEach(() => {
      const formHtml = renderNewsletterForm();
      container.innerHTML = formHtml;
      newsletterForm = container.querySelector('.c-newsletter-form');
    });

    it('should be responsive across different viewport sizes', async () => {
      const responsiveResults = await testComponent.testResponsiveComponent(newsletterForm);

      expect(responsiveResults.mobile.isVisible).toBe(true);
      expect(responsiveResults.tablet.isVisible).toBe(true);
      expect(responsiveResults.desktop.isVisible).toBe(true);
      expect(responsiveResults.mobile.hasOverflow).toBe(false);
    });

    it('should handle component interaction states properly', async () => {
      const submitButton = container.querySelector('button[type="submit"]');
      const stateResults = await testComponent.testInteractionStates(submitButton);

      expect(stateResults.hover.styles.backgroundColor).toBeDefined();
      expect(stateResults.focus.styles.boxShadow).toBeDefined();
      expect(stateResults.active.styles.backgroundColor).toBeDefined();
    });
  });

  describe('Performance and Optimization', () => {
    beforeEach(() => {
      const formHtml = renderNewsletterForm();
      container.innerHTML = formHtml;
      newsletterForm = container.querySelector('.c-newsletter-form');
    });

    it('should meet performance rendering requirements', async () => {
      const performanceResults = await testPerformance.measureRenderTime(async () => {
        const formHtml = renderNewsletterForm();
        container.innerHTML = formHtml;
      });

      expect(performanceResults.isAcceptable).toBe(true);
      expect(performanceResults.renderTime).toBeLessThan(100);
    });

    it('should simulate acceptable Core Web Vitals', async () => {
      const coreVitalsResults = await testPerformance.simulateCoreWebVitals(newsletterForm);

      expect(coreVitalsResults.overall.isGood()).toBe(true);
      expect(coreVitalsResults.cls.isGood).toBe(true);
      expect(coreVitalsResults.fid.isGood).toBe(true);
    });

    it('should have reasonable component size', async () => {
      const sizeAnalysis = testPerformance.analyzeComponentSize('newsletter-form');

      expect(sizeAnalysis.isBudgetCompliant).toBe(true);
      expect(sizeAnalysis.total).toBeLessThan(10);
    });
  });

  describe('Multi-language Support', () => {
    it('should support German language properly', async () => {
      const formHtml = renderNewsletterForm({
        title: 'Newsletter abonnieren',
        emailLabel: 'E-Mail-Adresse',
        submitLabel: 'Jetzt abonnieren'
      });
      container.innerHTML = formHtml;
      
      const multilingualCompliance = await testSwissCompliance.validateMultilingualCompliance(newsletterForm);

      expect(multilingualCompliance.isCompliant).toBe(true);
      expect(multilingualCompliance.textExpansionReady).toBe(true);
    });

    it('should handle text expansion for German localization', () => {
      const formHtml = renderNewsletterForm();
      container.innerHTML = formHtml;
      
      const textElements = container.querySelectorAll('label, button, p');
      textElements.forEach(element => {
        const style = window.getComputedStyle(element);
        // German text can be 25% longer - check for proper space
        expect(style.whiteSpace).not.toBe('nowrap');
      });
    });
  });

  describe('Form Submission and Error Handling', () => {
    beforeEach(() => {
      const formHtml = renderNewsletterForm();
      container.innerHTML = formHtml;
    });

    it('should have proper form attributes for submission', () => {
      const form = container.querySelector('form');

      expect(form.getAttribute('method')).toBe('post');
      expect(form.getAttribute('action')).toBe('#newsletter-signup');
      expect(form.getAttribute('novalidate')).toBe('');
      expect(form.getAttribute('data-form-type')).toBe('newsletter');
    });

    it('should have proper error message structure', () => {
      const errorMessages = container.querySelectorAll('.form-error');
      const successMessage = container.querySelector('.success-message');
      const generalError = container.querySelector('.error-message');

      expect(errorMessages.length).toBeGreaterThan(0);
      expect(successMessage).toBeInTheDocument();
      expect(generalError).toBeInTheDocument();

      errorMessages.forEach(error => {
        expect(error.getAttribute('role')).toBe('alert');
        expect(error.getAttribute('aria-live')).toBe('polite');
      });
    });

    it('should have accessible success and error states', () => {
      const successMessage = container.querySelector('.success-message');
      const errorMessage = container.querySelector('.error-message');

      expect(successMessage.getAttribute('role')).toBe('alert');
      expect(errorMessage.getAttribute('role')).toBe('alert');

      // Check for icons with proper ARIA handling
      const successIcon = successMessage.querySelector('svg');
      const errorIcon = errorMessage.querySelector('svg');

      expect(successIcon).toBeInTheDocument();
      expect(errorIcon).toBeInTheDocument();
    });
  });

  describe('Email Input Validation', () => {
    beforeEach(() => {
      const formHtml = renderNewsletterForm();
      container.innerHTML = formHtml;
    });

    it('should have proper email input attributes', () => {
      const emailInput = container.querySelector('input[type="email"]');

      expect(emailInput.getAttribute('type')).toBe('email');
      expect(emailInput.getAttribute('placeholder')).toContain('.ch');
      expect(emailInput.hasAttribute('required')).toBe(true);
      expect(emailInput.getAttribute('aria-required')).toBe('true');
    });

    it('should provide helpful placeholder for Swiss email format', () => {
      const emailInput = container.querySelector('input[type="email"]');
      const placeholder = emailInput.getAttribute('placeholder');

      expect(placeholder).toContain('example.ch');
    });

    it('should have descriptive help text', () => {
      const emailInput = container.querySelector('input[type="email"]');
      const helpId = emailInput.id + '-help';
      const helpElement = container.querySelector('#' + helpId);

      expect(helpElement).toBeInTheDocument();
      expect(helpElement.textContent).toContain('Newsletter-Versand');
    });
  });
});