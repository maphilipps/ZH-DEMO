#!/usr/bin/env node

/**
 * Cross-Browser Configuration Validator
 * 
 * Validates Playwright cross-browser configuration for Swiss municipality portal testing
 * Ensures all browsers, projects, and components are properly configured
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration validation schema
const VALIDATION_SCHEMA = {
  requiredProjects: [
    'setup',
    'cleanup',
    'chromium-desktop',
    'firefox-desktop',
    'webkit-desktop',
    'mobile-chrome',
    'mobile-safari',
    'tablet-chrome',
    'visual-regression',
    'accessibility-chromium',
    'performance-multi-browser',
    'swiss-compliance',
    'municipality-themes'
  ],
  requiredViewports: [
    { width: 375, height: 667 },   // Mobile
    { width: 768, height: 1024 },  // Tablet
    { width: 1366, height: 768 },  // Desktop
    { width: 1920, height: 1080 }  // Wide
  ],
  requiredTestFiles: [
    'tests/e2e/cross-browser-component.spec.js',
    'tests/e2e/cross-browser-visual.spec.js',
    'tests/e2e/swiss-compliance.spec.js',
    'tests/global-setup.js',
    'tests/browser.setup.js'
  ],
  requiredSDCComponents: [
    'hero--default',
    'hero--thalwil',
    'hero--thalheim',
    'hero--erlenbach',
    'site-header--default',
    'main-menu--default',
    'button--primary',
    'card--default',
    'newsletter-form--default'
  ],
  swissComplianceRequirements: {
    standard: 'eCH-0059',
    wcag_level: 'AA',
    languages: ['de-CH', 'fr-CH', 'it-CH'],
    municipalities: ['thalwil', 'thalheim', 'erlenbach']
  }
};

class CrossBrowserConfigValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.validationResults = {
      configFile: false,
      projects: false,
      testFiles: false,
      components: false,
      swissCompliance: false,
      packageScripts: false
    };
  }

  /**
   * Run comprehensive validation
   */
  async validate() {
    console.log('🔍 Starting Cross-Browser Configuration Validation...\n');

    // Validate Playwright configuration
    await this.validatePlaywrightConfig();
    
    // Validate test files
    await this.validateTestFiles();
    
    // Validate SDC components
    await this.validateSDCComponents();
    
    // Validate Swiss compliance setup
    await this.validateSwissCompliance();
    
    // Validate package.json scripts
    await this.validatePackageScripts();
    
    // Generate validation report
    this.generateReport();
    
    // Exit with appropriate code
    process.exit(this.errors.length > 0 ? 1 : 0);
  }

  /**
   * Validate Playwright configuration file
   */
  async validatePlaywrightConfig() {
    console.log('📋 Validating Playwright Configuration...');
    
    const configPath = path.join(process.cwd(), 'playwright.config.js');
    
    try {
      if (!fs.existsSync(configPath)) {
        this.addError('Playwright config file not found: playwright.config.js');
        return;
      }
      
      const configContent = fs.readFileSync(configPath, 'utf8');
      
      // Check for required configuration elements
      const requiredConfigs = [
        'fullyParallel: true',
        'retries:',
        'workers:',
        'reporter:',
        'projects:',
        'globalSetup:',
        'globalTeardown:'
      ];
      
      for (const config of requiredConfigs) {
        if (!configContent.includes(config)) {
          this.addError(`Missing required config: ${config}`);
        }
      }
      
      // Validate projects
      for (const project of VALIDATION_SCHEMA.requiredProjects) {
        if (!configContent.includes(`name: '${project}'`)) {
          this.addError(`Missing required project: ${project}`);
        }
      }
      
      // Check for Swiss compliance headers
      if (!configContent.includes('Accept-Language')) {
        this.addWarning('Swiss language headers not configured in base config');
      }
      
      // Check for accessibility configuration
      if (!configContent.includes('axe') && !configContent.includes('accessibility')) {
        this.addWarning('Accessibility testing configuration not detected');
      }
      
      this.validationResults.configFile = this.errors.length === 0;
      console.log(`   ${this.validationResults.configFile ? '✅' : '❌'} Playwright configuration`);
      
    } catch (error) {
      this.addError(`Error reading Playwright config: ${error.message}`);
    }
  }

  /**
   * Validate test files exist and have required content
   */
  async validateTestFiles() {
    console.log('📄 Validating Test Files...');
    
    let allFilesValid = true;
    
    for (const testFile of VALIDATION_SCHEMA.requiredTestFiles) {
      const filePath = path.join(process.cwd(), testFile);
      
      if (!fs.existsSync(filePath)) {
        this.addError(`Missing required test file: ${testFile}`);
        allFilesValid = false;
        continue;
      }
      
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Validate cross-browser component test
      if (testFile.includes('cross-browser-component')) {
        const requiredElements = [
          'SDC_COMPONENTS',
          'BROWSER_VIEWPORT_MATRIX',
          'browserName',
          'viewport',
          'injectAxe',
          'checkA11y'
        ];
        
        for (const element of requiredElements) {
          if (!content.includes(element)) {
            this.addError(`Missing element in ${testFile}: ${element}`);
            allFilesValid = false;
          }
        }
      }
      
      // Validate visual regression test
      if (testFile.includes('cross-browser-visual')) {
        const requiredElements = [
          'VISUAL_TEST_CONFIG',
          'browsers:',
          'viewports:',
          'toHaveScreenshot',
          'municipality'
        ];
        
        for (const element of requiredElements) {
          if (!content.includes(element)) {
            this.addError(`Missing element in ${testFile}: ${element}`);
            allFilesValid = false;
          }
        }
      }
      
      // Validate Swiss compliance test
      if (testFile.includes('swiss-compliance')) {
        const requiredElements = [
          'eCH-0059',
          'WCAG 2.1 AA',
          'de-CH',
          'checkA11y',
          'municipality'
        ];
        
        for (const element of requiredElements) {
          if (!content.includes(element)) {
            this.addError(`Missing Swiss compliance element in ${testFile}: ${element}`);
            allFilesValid = false;
          }
        }
      }
      
      console.log(`   ${fs.existsSync(filePath) ? '✅' : '❌'} ${testFile}`);
    }
    
    this.validationResults.testFiles = allFilesValid;
  }

  /**
   * Validate SDC components are properly configured
   */
  async validateSDCComponents() {
    console.log('🧩 Validating SDC Components...');
    
    const componentsDir = path.join(process.cwd(), 'components');
    let componentsValid = true;
    
    if (!fs.existsSync(componentsDir)) {
      this.addError('Components directory not found');
      this.validationResults.components = false;
      return;
    }
    
    // Check for required components
    for (const component of VALIDATION_SCHEMA.requiredSDCComponents) {
      const componentName = component.split('--')[0]; // Extract component name
      const componentDir = path.join(componentsDir, componentName);
      
      if (!fs.existsSync(componentDir)) {
        this.addWarning(`Component directory not found: ${componentName}`);
        continue;
      }
      
      // Check for component files
      const requiredFiles = [
        `${componentName}.component.yml`,
        `${componentName}.twig`
      ];
      
      for (const file of requiredFiles) {
        const filePath = path.join(componentDir, file);
        if (!fs.existsSync(filePath)) {
          this.addWarning(`Missing component file: ${componentName}/${file}`);
        }
      }
      
      console.log(`   ${fs.existsSync(componentDir) ? '✅' : '❌'} ${componentName}`);
    }
    
    // Count total components
    const componentDirs = fs.readdirSync(componentsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    console.log(`   📊 Total components found: ${componentDirs.length}`);
    
    if (componentDirs.length < 20) {
      this.addWarning('Less than 20 components found - expected 25+ for comprehensive testing');
    }
    
    this.validationResults.components = componentsValid;
  }

  /**
   * Validate Swiss compliance configuration
   */
  async validateSwissCompliance() {
    console.log('🇨🇭 Validating Swiss Compliance Configuration...');
    
    const requirements = VALIDATION_SCHEMA.swissComplianceRequirements;
    let complianceValid = true;
    
    // Check test configuration files
    const configFiles = [
      './test-results/accessibility/config.json',
      './test-results/test-metadata.json'
    ];
    
    // These files are created during setup, so we'll check the source files instead
    const sourceFiles = [
      'tests/global-setup.js',
      'tests/e2e/swiss-compliance.spec.js'
    ];
    
    for (const file of sourceFiles) {
      const filePath = path.join(process.cwd(), file);
      
      if (!fs.existsSync(filePath)) {
        this.addError(`Missing Swiss compliance file: ${file}`);
        complianceValid = false;
        continue;
      }
      
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for Swiss compliance elements
      if (!content.includes(requirements.standard)) {
        this.addError(`Missing Swiss standard ${requirements.standard} in ${file}`);
        complianceValid = false;
      }
      
      if (!content.includes(requirements.wcag_level)) {
        this.addError(`Missing WCAG level ${requirements.wcag_level} in ${file}`);
        complianceValid = false;
      }
      
      // Check languages
      for (const lang of requirements.languages) {
        if (!content.includes(lang)) {
          this.addWarning(`Swiss language ${lang} not found in ${file}`);
        }
      }
      
      // Check municipalities
      for (const municipality of requirements.municipalities) {
        if (!content.includes(municipality)) {
          this.addWarning(`Municipality ${municipality} not found in ${file}`);
        }
      }
      
      console.log(`   ${fs.existsSync(filePath) ? '✅' : '❌'} ${file}`);
    }
    
    this.validationResults.swissCompliance = complianceValid;
  }

  /**
   * Validate package.json scripts
   */
  async validatePackageScripts() {
    console.log('📦 Validating Package Scripts...');
    
    const packagePath = path.join(process.cwd(), 'package.json');
    
    if (!fs.existsSync(packagePath)) {
      this.addError('package.json not found');
      this.validationResults.packageScripts = false;
      return;
    }
    
    const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const scripts = packageData.scripts || {};
    
    const requiredScripts = [
      'test:e2e:cross-browser',
      'test:e2e:visual',
      'test:e2e:accessibility',
      'test:e2e:swiss-compliance',
      'test:e2e:municipalities',
      'visual:cross-browser',
      'qa:cross-browser',
      'qa:swiss-compliance',
      'browser:cross-browser'
    ];
    
    let scriptsValid = true;
    
    for (const script of requiredScripts) {
      if (!scripts[script]) {
        this.addError(`Missing package script: ${script}`);
        scriptsValid = false;
      } else {
        console.log(`   ✅ ${script}`);
      }
    }
    
    // Check for required dependencies
    const requiredDeps = [
      '@playwright/test',
      '@axe-core/playwright',
      'axe-playwright'
    ];
    
    const allDeps = { ...packageData.dependencies, ...packageData.devDependencies };
    
    for (const dep of requiredDeps) {
      if (!allDeps[dep]) {
        this.addError(`Missing required dependency: ${dep}`);
        scriptsValid = false;
      } else {
        console.log(`   ✅ dependency: ${dep}`);
      }
    }
    
    this.validationResults.packageScripts = scriptsValid;
  }

  /**
   * Add error to validation results
   */
  addError(message) {
    this.errors.push(message);
    console.log(`   ❌ ERROR: ${message}`);
  }

  /**
   * Add warning to validation results  
   */
  addWarning(message) {
    this.warnings.push(message);
    console.log(`   ⚠️  WARNING: ${message}`);
  }

  /**
   * Generate comprehensive validation report
   */
  generateReport() {
    console.log('\n📊 Cross-Browser Configuration Validation Report');
    console.log('='.repeat(60));
    
    // Summary
    const totalChecks = Object.keys(this.validationResults).length;
    const passedChecks = Object.values(this.validationResults).filter(Boolean).length;
    
    console.log(`\n📈 Summary: ${passedChecks}/${totalChecks} validation checks passed`);
    console.log(`❌ Errors: ${this.errors.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    
    // Detailed results
    console.log('\n🎯 Detailed Results:');
    for (const [check, passed] of Object.entries(this.validationResults)) {
      console.log(`   ${passed ? '✅' : '❌'} ${check.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
    }
    
    // Configuration recommendations
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('\n🎉 Perfect! Cross-browser configuration is fully validated');
      console.log('\n🚀 Ready for Phase 2.2 implementation:');
      console.log('   - Cross-browser testing across Chromium, Firefox, WebKit');
      console.log('   - Visual regression testing for 25+ SDC components');
      console.log('   - Swiss compliance validation (eCH-0059)');
      console.log('   - Municipality theme testing (Thalwil, Thalheim, Erlenbach)');
      console.log('   - Mobile and responsive testing');
      console.log('   - Performance and accessibility cross-browser validation');
    } else {
      console.log('\n🔧 Next Steps:');
      
      if (this.errors.length > 0) {
        console.log('\n❌ Critical Issues to Fix:');
        this.errors.forEach((error, index) => {
          console.log(`   ${index + 1}. ${error}`);
        });
      }
      
      if (this.warnings.length > 0) {
        console.log('\n⚠️  Recommendations:');
        this.warnings.forEach((warning, index) => {
          console.log(`   ${index + 1}. ${warning}`);
        });
      }
    }
    
    // Quick start commands
    console.log('\n🏃 Quick Start Commands:');
    console.log('   npm run test:e2e:cross-browser    # Test across desktop browsers');
    console.log('   npm run test:e2e:visual           # Visual regression testing');
    console.log('   npm run test:e2e:swiss-compliance # Swiss compliance validation');
    console.log('   npm run qa:cross-browser          # Full cross-browser QA');
    console.log('   npm run browser:matrix            # Complete browser matrix test');
    
    console.log('\n' + '='.repeat(60));
  }
}

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new CrossBrowserConfigValidator();
  validator.validate().catch(error => {
    console.error('💥 Validation failed:', error.message);
    process.exit(1);
  });
}

export default CrossBrowserConfigValidator;