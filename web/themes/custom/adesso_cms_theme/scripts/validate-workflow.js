#!/usr/bin/env node

/**
 * Frontend Workflow Validation Script
 * 
 * Validates that all npm scripts and dependencies required by the
 * GitHub Actions workflow are properly configured and functional.
 * 
 * Phase 3.1: PreviousNext Frontend Build Tools Architecture
 */

import { promises as fs } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const themeRoot = path.resolve(__dirname, '..');

/**
 * Required npm scripts for the GitHub Actions workflow
 */
const REQUIRED_SCRIPTS = [
  'build-lib',
  'test:coverage', 
  'test:storybook:a11y:ci',
  'test:storybook:municipalities',
  'test:e2e:cross-browser',
  'test:e2e:accessibility',
  'test:e2e:swiss-compliance',
  'test:e2e:municipalities',
  'test:e2e:mobile',
  'test:e2e:visual',
  'test:e2e:performance',
  'performance:lighthouse',
  'performance:core-vitals', 
  'performance:budget',
  'visual:municipalities',
  'visual:cross-browser',
  'browser:validate',
  'qa:full'
];

/**
 * Required configuration files for the workflow
 */
const REQUIRED_FILES = [
  'package.json',
  'vite.config.ts',
  'playwright.config.cjs',
  '.storybook/main.js',
  '.storybook/test-runner-jest.config.js',
  'lighthouserc.js',
  '.browserslistrc'
];

/**
 * Required dependencies for testing
 */
const REQUIRED_DEPENDENCIES = [
  '@playwright/test',
  '@storybook/test-runner',
  '@axe-core/playwright',
  'vitest',
  'lighthouse',
  '@lhci/cli',
  'backstopjs'
];

class WorkflowValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.passed = [];
  }

  /**
   * Log success message
   */
  logSuccess(message) {
    this.passed.push(message);
    console.log(`✅ ${message}`);
  }

  /**
   * Log warning message
   */
  logWarning(message) {
    this.warnings.push(message);
    console.warn(`⚠️  ${message}`);
  }

  /**
   * Log error message
   */
  logError(message) {
    this.errors.push(message);
    console.error(`❌ ${message}`);
  }

  /**
   * Validate package.json structure and scripts
   */
  async validatePackageJson() {
    console.log('\n🔍 Validating package.json...');
    
    try {
      const packagePath = path.join(themeRoot, 'package.json');
      const packageContent = await fs.readFile(packagePath, 'utf8');
      const packageJson = JSON.parse(packageContent);
      
      // Check required scripts
      const missingScripts = [];
      REQUIRED_SCRIPTS.forEach(script => {
        if (!packageJson.scripts || !packageJson.scripts[script]) {
          missingScripts.push(script);
        }
      });
      
      if (missingScripts.length > 0) {
        this.logError(`Missing required scripts: ${missingScripts.join(', ')}`);
      } else {
        this.logSuccess('All required npm scripts are present');
      }
      
      // Check Node.js version requirement
      if (packageJson.engines && packageJson.engines.node) {
        this.logSuccess(`Node.js version requirement: ${packageJson.engines.node}`);
      } else {
        this.logWarning('No Node.js version requirement specified in engines');
      }
      
      // Check required dependencies
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };
      
      const missingDeps = [];
      REQUIRED_DEPENDENCIES.forEach(dep => {
        if (!allDeps[dep]) {
          missingDeps.push(dep);
        }
      });
      
      if (missingDeps.length > 0) {
        this.logError(`Missing required dependencies: ${missingDeps.join(', ')}`);
      } else {
        this.logSuccess('All required dependencies are present');
      }
      
    } catch (error) {
      this.logError(`Failed to validate package.json: ${error.message}`);
    }
  }

  /**
   * Validate required configuration files
   */
  async validateConfigFiles() {
    console.log('\n📁 Validating configuration files...');
    
    for (const file of REQUIRED_FILES) {
      try {
        const filePath = path.join(themeRoot, file);
        await fs.access(filePath);
        this.logSuccess(`Configuration file exists: ${file}`);
      } catch (error) {
        this.logError(`Missing configuration file: ${file}`);
      }
    }
  }

  /**
   * Validate npm scripts execution
   */
  async validateScriptExecution() {
    console.log('\n🔧 Validating npm script execution...');
    
    // Test critical build scripts
    const testScripts = [
      'build-lib',
      'browser:validate'
    ];
    
    for (const script of testScripts) {
      try {
        console.log(`Testing script: ${script}...`);
        execSync(`npm run ${script}`, { 
          cwd: themeRoot, 
          stdio: 'pipe',
          timeout: 30000 // 30 second timeout
        });
        this.logSuccess(`Script execution successful: ${script}`);
      } catch (error) {
        this.logError(`Script execution failed: ${script} - ${error.message}`);
      }
    }
  }

  /**
   * Validate Playwright configuration
   */
  async validatePlaywrightConfig() {
    console.log('\n🎭 Validating Playwright configuration...');
    
    try {
      const configPath = path.join(themeRoot, 'playwright.config.cjs');
      const configContent = await fs.readFile(configPath, 'utf8');
      
      // Check for required projects
      const requiredProjects = [
        'chromium-desktop',
        'firefox-desktop', 
        'webkit-desktop',
        'mobile-chrome',
        'mobile-safari',
        'visual-regression',
        'accessibility-chromium',
        'swiss-compliance',
        'municipality-themes'
      ];
      
      let missingProjects = [];
      requiredProjects.forEach(project => {
        if (!configContent.includes(project)) {
          missingProjects.push(project);
        }
      });
      
      if (missingProjects.length > 0) {
        this.logError(`Missing Playwright projects: ${missingProjects.join(', ')}`);
      } else {
        this.logSuccess('All required Playwright projects are configured');
      }
      
    } catch (error) {
      this.logError(`Failed to validate Playwright config: ${error.message}`);
    }
  }

  /**
   * Validate Storybook configuration
   */
  async validateStorybookConfig() {
    console.log('\n📚 Validating Storybook configuration...');
    
    try {
      const mainConfigPath = path.join(themeRoot, '.storybook/main.js');
      const testConfigPath = path.join(themeRoot, '.storybook/test-runner-jest.config.js');
      
      await fs.access(mainConfigPath);
      await fs.access(testConfigPath);
      
      this.logSuccess('Storybook configuration files exist');
      
      // Check test runner config
      const testConfig = await fs.readFile(testConfigPath, 'utf8');
      if (testConfig.includes('axe-playwright') && testConfig.includes('checkA11y')) {
        this.logSuccess('Storybook accessibility testing is configured');
      } else {
        this.logError('Storybook accessibility testing configuration is incomplete');
      }
      
    } catch (error) {
      this.logError(`Failed to validate Storybook config: ${error.message}`);
    }
  }

  /**
   * Validate Lighthouse CI configuration
   */
  async validateLighthouseConfig() {
    console.log('\n💡 Validating Lighthouse CI configuration...');
    
    try {
      const configPath = path.join(themeRoot, 'lighthouserc.js');
      const configContent = await fs.readFile(configPath, 'utf8');
      
      // Check for required configuration sections
      const requiredSections = [
        'collect',
        'assert',
        'upload'
      ];
      
      let missingSections = [];
      requiredSections.forEach(section => {
        if (!configContent.includes(section)) {
          missingSections.push(section);
        }
      });
      
      if (missingSections.length > 0) {
        this.logError(`Missing Lighthouse CI sections: ${missingSections.join(', ')}`);
      } else {
        this.logSuccess('Lighthouse CI configuration is complete');
      }
      
      // Check performance thresholds
      if (configContent.includes('minScore: 0.9')) {
        this.logSuccess('Performance thresholds are set to 90% (Swiss government requirement)');
      } else {
        this.logWarning('Performance thresholds may not meet Swiss government requirements (>90%)');
      }
      
    } catch (error) {
      this.logError(`Failed to validate Lighthouse CI config: ${error.message}`);
    }
  }

  /**
   * Generate validation report
   */
  generateReport() {
    console.log('\n📊 Generating validation report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: this.passed.length + this.warnings.length + this.errors.length,
        passed: this.passed.length,
        warnings: this.warnings.length,
        errors: this.errors.length,
        success: this.errors.length === 0
      },
      results: {
        passed: this.passed,
        warnings: this.warnings,
        errors: this.errors
      }
    };
    
    return report;
  }

  /**
   * Run all validations
   */
  async validate() {
    console.log('🚀 Starting Frontend Workflow Validation...\n');
    
    await this.validatePackageJson();
    await this.validateConfigFiles();
    await this.validatePlaywrightConfig();
    await this.validateStorybookConfig();
    await this.validateLighthouseConfig();
    await this.validateScriptExecution();
    
    const report = this.generateReport();
    
    console.log('\n📋 Validation Summary:');
    console.log(`✅ Passed: ${report.summary.passed}`);
    console.log(`⚠️  Warnings: ${report.summary.warnings}`);
    console.log(`❌ Errors: ${report.summary.errors}`);
    
    if (report.summary.success) {
      console.log('\n🎉 Workflow validation successful! GitHub Actions workflow is ready to execute.');
    } else {
      console.log('\n❌ Workflow validation failed. Please fix the errors above before running the workflow.');
    }
    
    // Write report to file
    try {
      const reportPath = path.join(themeRoot, 'workflow-validation-report.json');
      await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
      console.log(`📄 Detailed report saved to: workflow-validation-report.json`);
    } catch (error) {
      console.error(`Failed to save report: ${error.message}`);
    }
    
    // Exit with appropriate code
    process.exit(report.summary.success ? 0 : 1);
  }
}

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new WorkflowValidator();
  validator.validate().catch(error => {
    console.error('Validation failed:', error);
    process.exit(1);
  });
}

export default WorkflowValidator;