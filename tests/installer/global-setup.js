/**
 * @file
 * Global setup for adesso CMS installer tests
 */

import { DatabaseCleanupHelper } from './cleanup-helper.js';
import { execSync } from 'child_process';

async function globalSetup() {
  console.log('🚀 Setting up adesso CMS installer test environment...');
  
  const cleanupHelper = new DatabaseCleanupHelper();
  
  try {
    // Ensure DDEV is running
    console.log('📋 Checking DDEV status...');
    try {
      execSync('ddev status', { stdio: 'pipe' });
      console.log('✅ DDEV is running');
    } catch (error) {
      console.log('🔄 Starting DDEV...');
      execSync('ddev start', { stdio: 'inherit', timeout: 120000 });
    }
    
    // Create test directories
    console.log('📁 Creating test directories...');
    const testDirs = [
      'test-results',
      'test-results/installer-report',
      'test-results/installer-artifacts',
      'test-results/snapshots'
    ];
    
    for (const dir of testDirs) {
      try {
        execSync(`mkdir -p ${dir}`, { stdio: 'pipe' });
      } catch (error) {
        // Directory might already exist
      }
    }
    
    // Initial environment cleanup
    console.log('🧹 Performing initial cleanup...');
    await cleanupHelper.fullCleanup();
    
    // Verify clean state
    await cleanupHelper.verifyCleanState();
    
    console.log('✅ Global setup completed successfully');
    
  } catch (error) {
    console.error('❌ Global setup failed:', error.message);
    throw error;
  }
}

export default globalSetup;