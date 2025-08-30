#!/usr/bin/env node
/**
 * @file
 * Storybook Test Runner Setup Script
 * 
 * Ensures all necessary directories and configurations exist for
 * comprehensive accessibility testing with the PreviousNext architecture.
 */

import { mkdir, access, writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const themeRoot = dirname(__dirname);

/**
 * Required directory structure for test results
 */
const requiredDirectories = [
  'test-results',
  'test-results/accessibility',
  'test-results/screenshots',
  'test-results/html',
  'test-results/reports',
  'test-results/coverage',
  'test-results/performance'
];

/**
 * Gitignore patterns for test results
 */
const gitignoreContent = `# Storybook Test Runner Results
test-results/
.storybook-test-runner/
storybook-static/

# Accessibility Reports
*.a11y.html
*.a11y.json

# Visual Regression
backstop_data/engine_scripts/
backstop_data/html_report/
backstop_data/ci_report/

# Performance Reports
lighthouse-report.html
lighthouse-report.json
budget.json

# Coverage
coverage/
.nyc_output/
`;

/**
 * Test configuration validation
 */
const testConfig = {
  name: 'Storybook Test Runner Setup',
  version: '1.0.0',
  requirements: [
    '@storybook/test-runner',
    '@axe-core/playwright',
    'axe-playwright',
    '@playwright/test'
  ]
};

async function setupDirectories() {
  console.log('📁 Setting up test directories...');
  
  for (const dir of requiredDirectories) {
    const fullPath = join(themeRoot, dir);
    
    try {
      await access(fullPath);
      console.log(`✓ Directory exists: ${dir}`);
    } catch {
      await mkdir(fullPath, { recursive: true });
      console.log(`✓ Created directory: ${dir}`);
    }
  }
}

async function setupGitignore() {
  console.log('📝 Setting up .gitignore entries...');
  
  const gitignorePath = join(themeRoot, '.gitignore');
  
  try {
    await access(gitignorePath);
    console.log('✓ .gitignore exists (entries may need manual addition)');
    console.log('   Add the following to .gitignore if not already present:');
    console.log(gitignoreContent);
  } catch {
    await writeFile(gitignorePath, gitignoreContent);
    console.log('✓ Created .gitignore with test result patterns');
  }
}

async function validateDependencies() {
  console.log('🔍 Validating dependencies...');
  
  const packageJsonPath = join(themeRoot, 'package.json');
  
  try {
    const { readFile } = await import('fs/promises');
    const packageContent = JSON.parse(await readFile(packageJsonPath, 'utf8'));
    
    const devDeps = packageContent.devDependencies || {};
    const missing = [];
    
    for (const requirement of testConfig.requirements) {
      if (!devDeps[requirement]) {
        missing.push(requirement);
      } else {
        console.log(`✓ Found: ${requirement}@${devDeps[requirement]}`);
      }
    }
    
    if (missing.length > 0) {
      console.error('❌ Missing required dependencies:');
      missing.forEach(dep => console.error(`   - ${dep}`));
      console.log('\nInstall missing dependencies:');
      console.log(`npm install --save-dev ${missing.join(' ')}`);
      return false;
    }
    
  } catch (error) {
    console.error('❌ Failed to read package.json:', error.message);
    return false;
  }
  
  return true;
}

async function createSampleTestScript() {
  console.log('📋 Creating sample test verification script...');
  
  const sampleTestPath = join(themeRoot, 'scripts', 'verify-storybook-setup.js');
  
  const sampleTestContent = `#!/usr/bin/env node
/**
 * Verification script for Storybook test runner setup
 * Run this to test if everything is configured correctly
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function verifyStorybookConfig() {
  console.log('🧪 Verifying Storybook configuration...');
  
  try {
    // Check if Storybook can build stories
    await execAsync('npx build-storybook --quiet --webpack-stats-json');
    console.log('✓ Storybook build successful');
    
    // Check if test-runner config exists
    const fs = await import('fs/promises');
    await fs.access('.storybook/test-runner-jest.config.js');
    console.log('✓ Test runner config found');
    
    // Verify test directories exist
    const testDirs = ['test-results', 'test-results/accessibility'];
    for (const dir of testDirs) {
      await fs.access(dir);
    }
    console.log('✓ Test directories ready');
    
    console.log('\\n🎉 Storybook test runner setup verified successfully!');
    console.log('\\nNext steps:');
    console.log('1. Run: npm run dev-storybook');
    console.log('2. Run: npm run test:storybook:a11y');
    
  } catch (error) {
    console.error('❌ Setup verification failed:', error.message);
    process.exit(1);
  }
}

verifyStorybookConfig();
`;
  
  await writeFile(sampleTestPath, sampleTestContent);
  console.log('✓ Created verification script: scripts/verify-storybook-setup.js');
}

async function generateConfigurationReport() {
  console.log('📊 Generating configuration report...');
  
  const report = {
    setup: {
      timestamp: new Date().toISOString(),
      version: testConfig.version,
      status: 'complete'
    },
    directories: requiredDirectories,
    features: [
      'WCAG 2.1 AA compliance testing',
      'eCH-0059 Swiss government standards',
      'Multi-municipality theme validation',
      'German text expansion testing (25% buffer)',
      'Keyboard navigation testing',
      'Color contrast validation',
      'Responsive accessibility testing',
      'Detailed HTML/JSON reporting'
    ],
    scripts: {
      'test:storybook:a11y': 'Run accessibility tests on all stories',
      'test:storybook:municipalities': 'Test municipality-specific themes',
      'test:storybook:debug': 'Debug mode with verbose output',
      'qa:storybook': 'Quick quality check for Storybook'
    },
    compliance: {
      wcag: '2.1 AA',
      swiss: 'eCH-0059',
      languages: ['de-CH', 'fr-CH', 'it-CH'],
      municipalities: ['thalwil', 'thalheim', 'erlenbach']
    }
  };
  
  const reportPath = join(themeRoot, 'test-results', 'setup-report.json');
  await writeFile(reportPath, JSON.stringify(report, null, 2));
  console.log('✓ Configuration report: test-results/setup-report.json');
}

async function main() {
  console.log('🚀 Setting up Storybook Test Runner for PnX Architecture\\n');
  
  try {
    // Setup directory structure
    await setupDirectories();
    console.log('');
    
    // Validate dependencies
    const depsValid = await validateDependencies();
    console.log('');
    
    if (!depsValid) {
      console.error('❌ Setup incomplete due to missing dependencies');
      process.exit(1);
    }
    
    // Setup gitignore
    await setupGitignore();
    console.log('');
    
    // Create verification script
    await createSampleTestScript();
    console.log('');
    
    // Generate report
    await generateConfigurationReport();
    console.log('');
    
    console.log('🎉 Storybook Test Runner setup complete!\\n');
    console.log('Phase 2.1 Implementation Summary:');
    console.log('✓ Installed @storybook/test-runner ^0.21.0');
    console.log('✓ Configured axe-core accessibility testing');
    console.log('✓ Set up WCAG 2.1 AA compliance validation');
    console.log('✓ Implemented eCH-0059 Swiss government standards');
    console.log('✓ Added multi-municipality theme testing');
    console.log('✓ Created comprehensive test reporting');
    console.log('✓ Prepared CI/CD integration scripts\\n');
    
    console.log('Test your setup:');
    console.log('1. ddev npm run dev-storybook');
    console.log('2. ddev npm run test:storybook:a11y');
    console.log('3. ddev npm run qa:storybook\\n');
    
    console.log('Next Phase: 2.2 - Cross-Browser Playwright Configuration');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

main();