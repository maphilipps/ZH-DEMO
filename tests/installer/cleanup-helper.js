/**
 * @file
 * Database cleanup helper for adesso CMS installer tests
 * 
 * Provides utilities for complete environment reset between test scenarios
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export class DatabaseCleanupHelper {
  constructor() {
    this.projectRoot = process.cwd();
    this.webRoot = path.join(this.projectRoot, 'web');
    this.sitesPath = path.join(this.webRoot, 'sites', 'default');
  }

  /**
   * Complete environment cleanup including database, files, and cache
   */
  async fullCleanup() {
    console.log('🔄 Starting full environment cleanup...');
    
    try {
      // 1. Drop database completely
      await this.dropDatabase();
      
      // 2. Remove settings and files
      await this.cleanSiteFiles();
      
      // 3. Clear any cached configurations
      await this.clearCaches();
      
      // 4. Restart DDEV for clean state
      await this.restartDdev();
      
      console.log('✅ Full cleanup completed successfully');
      
    } catch (error) {
      console.error('❌ Cleanup failed:', error.message);
      throw error;
    }
  }

  /**
   * Drop database using DDEV
   */
  async dropDatabase() {
    try {
      console.log('  📥 Dropping database...');
      execSync('ddev drush sql-drop -y', { 
        stdio: ['inherit', 'pipe', 'inherit'],
        timeout: 30000 
      });
      console.log('  ✓ Database dropped');
    } catch (error) {
      // If drush fails, try direct database drop
      console.log('  ⚠️ Drush drop failed, trying direct database drop...');
      try {
        execSync('ddev mysql -e "DROP DATABASE IF EXISTS db; CREATE DATABASE db;"', {
          stdio: ['inherit', 'pipe', 'inherit'],
          timeout: 30000
        });
        console.log('  ✓ Database recreated via MySQL');
      } catch (mysqlError) {
        console.log('  ⚠️ Database drop/create not critical for fresh install');
      }
    }
  }

  /**
   * Clean site files and settings
   */
  async cleanSiteFiles() {
    console.log('  🗑️ Cleaning site files...');
    
    const filesToRemove = [
      path.join(this.sitesPath, 'settings.php'),
      path.join(this.sitesPath, 'settings.local.php'),
      path.join(this.sitesPath, 'files'),
      path.join(this.webRoot, 'sites', 'default', 'files'),
      path.join(this.sitesPath, '.ht.sqlite')
    ];

    for (const filePath of filesToRemove) {
      try {
        if (fs.existsSync(filePath)) {
          if (fs.lstatSync(filePath).isDirectory()) {
            fs.rmSync(filePath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(filePath);
          }
          console.log(`  ✓ Removed: ${path.relative(this.projectRoot, filePath)}`);
        }
      } catch (error) {
        console.log(`  ⚠️ Could not remove ${filePath}: ${error.message}`);
      }
    }
  }

  /**
   * Clear various caches
   */
  async clearCaches() {
    console.log('  🧹 Clearing caches...');
    
    const cacheDirs = [
      path.join(this.projectRoot, 'web', 'sites', 'default', 'files', 'php'),
      path.join(this.projectRoot, 'web', 'sites', 'default', 'files', 'config'),
      path.join(this.projectRoot, 'web', 'sites', 'default', 'files', 'translations'),
    ];

    for (const cacheDir of cacheDirs) {
      try {
        if (fs.existsSync(cacheDir)) {
          fs.rmSync(cacheDir, { recursive: true, force: true });
          console.log(`  ✓ Cleared cache: ${path.relative(this.projectRoot, cacheDir)}`);
        }
      } catch (error) {
        console.log(`  ⚠️ Could not clear cache ${cacheDir}: ${error.message}`);
      }
    }
  }

  /**
   * Restart DDEV for completely fresh state
   */
  async restartDdev() {
    console.log('  🔄 Restarting DDEV...');
    
    try {
      // Stop DDEV
      execSync('ddev stop', { 
        stdio: ['inherit', 'pipe', 'inherit'],
        timeout: 60000 
      });
      
      // Start DDEV
      execSync('ddev start', { 
        stdio: ['inherit', 'pipe', 'inherit'],
        timeout: 120000 
      });
      
      console.log('  ✓ DDEV restarted');
      
      // Wait for services to be ready
      await this.waitForServices();
      
    } catch (error) {
      console.error('  ❌ DDEV restart failed:', error.message);
      throw error;
    }
  }

  /**
   * Wait for DDEV services to be ready
   */
  async waitForServices(maxAttempts = 10) {
    console.log('  ⏳ Waiting for services to be ready...');
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        // Test if web service responds
        execSync('ddev status', { 
          stdio: ['inherit', 'pipe', 'inherit'],
          timeout: 10000 
        });
        
        console.log('  ✓ Services are ready');
        return;
        
      } catch (error) {
        if (attempt === maxAttempts) {
          throw new Error(`Services not ready after ${maxAttempts} attempts`);
        }
        
        console.log(`  ⏳ Attempt ${attempt}/${maxAttempts} - waiting...`);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
  }

  /**
   * Verify environment is clean and ready for installation
   */
  async verifyCleanState() {
    console.log('🔍 Verifying clean state...');
    
    const checks = [
      {
        name: 'Settings file absent',
        path: path.join(this.sitesPath, 'settings.php'),
        shouldExist: false
      },
      {
        name: 'Files directory absent',
        path: path.join(this.sitesPath, 'files'),
        shouldExist: false
      },
      {
        name: 'DDEV services running',
        command: 'ddev status'
      }
    ];

    for (const check of checks) {
      try {
        if (check.path) {
          const exists = fs.existsSync(check.path);
          if (check.shouldExist && !exists) {
            throw new Error(`${check.name}: Expected file/directory missing`);
          }
          if (!check.shouldExist && exists) {
            throw new Error(`${check.name}: Unexpected file/directory present`);
          }
          console.log(`  ✓ ${check.name}`);
          
        } else if (check.command) {
          execSync(check.command, { 
            stdio: ['inherit', 'pipe', 'inherit'],
            timeout: 10000 
          });
          console.log(`  ✓ ${check.name}`);
        }
        
      } catch (error) {
        console.error(`  ❌ ${check.name}: ${error.message}`);
        throw error;
      }
    }
    
    console.log('✅ Environment verified clean and ready');
  }

  /**
   * Create a snapshot of current state (for debugging)
   */
  async createSnapshot(name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const snapshotName = `${name}-${timestamp}`;
    
    try {
      // Export database if it exists
      execSync(`ddev export-db --file=snapshots/${snapshotName}.sql.gz`, {
        stdio: ['inherit', 'pipe', 'inherit']
      });
      
      console.log(`📸 Snapshot created: ${snapshotName}`);
      return snapshotName;
      
    } catch (error) {
      console.log(`⚠️ Could not create snapshot: ${error.message}`);
      return null;
    }
  }
}

export default DatabaseCleanupHelper;