/**
 * @file
 * Global teardown for adesso CMS installer tests
 */

import { DatabaseCleanupHelper } from './cleanup-helper.js';
import fs from 'fs';
import path from 'path';

async function globalTeardown() {
  console.log('🧹 Cleaning up after adesso CMS installer tests...');
  
  const cleanupHelper = new DatabaseCleanupHelper();
  
  try {
    // Create final snapshot for debugging if needed
    console.log('📸 Creating final test snapshot...');
    await cleanupHelper.createSnapshot('final-test-state');
    
    // Generate test summary
    console.log('📊 Generating test summary...');
    await generateTestSummary();
    
    // Final cleanup (optional - comment out if you want to keep final state)
    if (process.env.CLEANUP_AFTER_TESTS !== 'false') {
      console.log('🧹 Performing final cleanup...');
      await cleanupHelper.fullCleanup();
    } else {
      console.log('⏭️ Skipping final cleanup (CLEANUP_AFTER_TESTS=false)');
    }
    
    console.log('✅ Global teardown completed successfully');
    
  } catch (error) {
    console.error('❌ Global teardown failed:', error.message);
    // Don't throw - we don't want teardown failures to affect test results
  }
}

async function generateTestSummary() {
  try {
    const resultsPath = 'test-results/installer-results.json';
    
    if (!fs.existsSync(resultsPath)) {
      console.log('⚠️ No test results file found');
      return;
    }
    
    const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
    
    const summary = {
      timestamp: new Date().toISOString(),
      totalTests: results.suites?.reduce((total, suite) => total + (suite.specs?.length || 0), 0) || 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      duration: results.stats?.duration || 0,
      environment: {
        ddevUrl: process.env.DDEV_PRIMARY_URL || 'unknown',
        nodeVersion: process.version,
        ci: !!process.env.CI
      }
    };
    
    // Calculate test outcomes
    if (results.suites) {
      results.suites.forEach(suite => {
        if (suite.specs) {
          suite.specs.forEach(spec => {
            if (spec.tests) {
              spec.tests.forEach(test => {
                test.results?.forEach(result => {
                  switch (result.status) {
                    case 'passed':
                      summary.passed++;
                      break;
                    case 'failed':
                      summary.failed++;
                      break;
                    case 'skipped':
                      summary.skipped++;
                      break;
                  }
                });
              });
            }
          });
        }
      });
    }
    
    // Write summary
    fs.writeFileSync(
      'test-results/installer-summary.json', 
      JSON.stringify(summary, null, 2)
    );
    
    // Console summary
    console.log('\n📊 Test Summary:');
    console.log(`   Total: ${summary.totalTests}`);
    console.log(`   Passed: ${summary.passed} ✅`);
    console.log(`   Failed: ${summary.failed} ❌`);
    console.log(`   Skipped: ${summary.skipped} ⏭️`);
    console.log(`   Duration: ${Math.round(summary.duration / 1000)}s`);
    
  } catch (error) {
    console.log('⚠️ Could not generate test summary:', error.message);
  }
}

export default globalTeardown;