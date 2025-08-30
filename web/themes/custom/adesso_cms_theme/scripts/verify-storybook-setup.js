#!/usr/bin/env node
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
    
    console.log('\n🎉 Storybook test runner setup verified successfully!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run dev-storybook');
    console.log('2. Run: npm run test:storybook:a11y');
    
  } catch (error) {
    console.error('❌ Setup verification failed:', error.message);
    process.exit(1);
  }
}

verifyStorybookConfig();
