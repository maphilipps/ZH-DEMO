#!/usr/bin/env node

/**
 * Build Validation Script for PnX Architecture
 * Validates that library mode builds meet Swiss government performance standards
 */

import { readFileSync, statSync, existsSync, readdirSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const themeRoot = resolve(__dirname, '..');
const distDir = resolve(themeRoot, 'dist');
const manifestPath = resolve(distDir, '.vite', 'manifest.json');

// Performance budgets for Swiss government compliance
const PERFORMANCE_BUDGETS = {
  totalSize: 500000,    // 500KB total
  scriptSize: 250000,   // 250KB for scripts
  styleSize: 100000,    // 100KB for styles
  maxFiles: 50,         // Maximum number of output files
  maxEntrySize: 150000, // 150KB per entry point
};

// WCAG 2.1 AA compliance requirements
const COMPLIANCE_CHECKS = {
  requiredFiles: [
    'adesso-theme.iife.js',
    'adesso-styles.css'
  ],
  municipalityThemes: [
    'thalwil',
    'thalheim', 
    'erlenbach'
  ],
  criticalComponents: [
    'hero',
    'navigation',
    'footer',
    'button',
    'form'
  ]
};

class BuildValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.stats = {
      files: [],
      totalSize: 0,
      scriptSize: 0,
      styleSize: 0,
      entryPoints: []
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'warn' ? '⚠️' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  error(message) {
    this.errors.push(message);
    this.log(message, 'error');
  }

  warn(message) {
    this.warnings.push(message);
    this.log(message, 'warn');
  }

  info(message) {
    this.log(message, 'info');
  }

  /**
   * Validate that dist directory exists and has required structure
   */
  validateDistStructure() {
    this.info('Validating dist directory structure...');
    
    if (!existsSync(distDir)) {
      this.error('Dist directory does not exist. Run build first.');
      return false;
    }

    // Check for manifest.json
    if (!existsSync(manifestPath)) {
      this.error('Vite manifest.json not found. Build may have failed.');
      return false;
    }

    // Check for required output files
    for (const requiredFile of COMPLIANCE_CHECKS.requiredFiles) {
      const filePath = resolve(distDir, requiredFile);
      if (!existsSync(filePath)) {
        this.error(`Required output file missing: ${requiredFile}`);
      }
    }

    return true;
  }

  /**
   * Analyze manifest and build outputs
   */
  analyzeManifest() {
    this.info('Analyzing build manifest...');
    
    try {
      const manifestContent = readFileSync(manifestPath, 'utf-8');
      const manifest = JSON.parse(manifestContent);
      
      // Process each entry in the manifest
      for (const [key, entry] of Object.entries(manifest)) {
        if (entry.isEntry) {
          this.stats.entryPoints.push({
            name: key,
            file: entry.file,
            size: this.getFileSize(resolve(distDir, entry.file)),
            assets: entry.assets || [],
            css: entry.css || []
          });
        }
      }

      this.info(`Found ${this.stats.entryPoints.length} entry points`);
      
    } catch (error) {
      this.error(`Failed to parse manifest.json: ${error.message}`);
    }
  }

  /**
   * Get file size in bytes
   */
  getFileSize(filePath) {
    try {
      return statSync(filePath).size;
    } catch {
      return 0;
    }
  }

  /**
   * Calculate comprehensive build statistics
   */
  calculateStats() {
    this.info('Calculating build statistics...');
    
    try {
      const files = readdirSync(distDir, { recursive: true });
      
      for (const file of files) {
        const fullPath = resolve(distDir, file);
        const stat = statSync(fullPath);
        
        if (stat.isFile()) {
          const size = stat.size;
          const fileInfo = {
            name: file,
            path: fullPath,
            size: size,
            type: this.getFileType(file)
          };
          
          this.stats.files.push(fileInfo);
          this.stats.totalSize += size;
          
          // Categorize by type
          if (fileInfo.type === 'script') {
            this.stats.scriptSize += size;
          } else if (fileInfo.type === 'style') {
            this.stats.styleSize += size;
          }
        }
      }
      
    } catch (error) {
      this.error(`Failed to calculate stats: ${error.message}`);
    }
  }

  /**
   * Determine file type from extension
   */
  getFileType(filename) {
    if (filename.endsWith('.js') || filename.endsWith('.mjs')) {
      return 'script';
    } else if (filename.endsWith('.css')) {
      return 'style';
    } else if (filename.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i)) {
      return 'image';
    } else if (filename.endsWith('.json')) {
      return 'data';
    } else {
      return 'other';
    }
  }

  /**
   * Validate performance budgets
   */
  validatePerformanceBudgets() {
    this.info('Validating performance budgets...');
    
    // Total size check
    if (this.stats.totalSize > PERFORMANCE_BUDGETS.totalSize) {
      this.error(
        `Total build size (${this.formatBytes(this.stats.totalSize)}) ` +
        `exceeds budget (${this.formatBytes(PERFORMANCE_BUDGETS.totalSize)})`
      );
    } else {
      this.info(`Total size: ${this.formatBytes(this.stats.totalSize)} ✓`);
    }

    // Script size check
    if (this.stats.scriptSize > PERFORMANCE_BUDGETS.scriptSize) {
      this.warn(
        `Script size (${this.formatBytes(this.stats.scriptSize)}) ` +
        `exceeds budget (${this.formatBytes(PERFORMANCE_BUDGETS.scriptSize)})`
      );
    } else {
      this.info(`Script size: ${this.formatBytes(this.stats.scriptSize)} ✓`);
    }

    // Style size check
    if (this.stats.styleSize > PERFORMANCE_BUDGETS.styleSize) {
      this.warn(
        `Style size (${this.formatBytes(this.stats.styleSize)}) ` +
        `exceeds budget (${this.formatBytes(PERFORMANCE_BUDGETS.styleSize)})`
      );
    } else {
      this.info(`Style size: ${this.formatBytes(this.stats.styleSize)} ✓`);
    }

    // Entry point size check
    for (const entry of this.stats.entryPoints) {
      if (entry.size > PERFORMANCE_BUDGETS.maxEntrySize) {
        this.warn(
          `Entry point '${entry.name}' (${this.formatBytes(entry.size)}) ` +
          `exceeds recommended size (${this.formatBytes(PERFORMANCE_BUDGETS.maxEntrySize)})`
        );
      }
    }

    // File count check
    if (this.stats.files.length > PERFORMANCE_BUDGETS.maxFiles) {
      this.warn(
        `Build output has ${this.stats.files.length} files, ` +
        `which exceeds recommended maximum (${PERFORMANCE_BUDGETS.maxFiles})`
      );
    }
  }

  /**
   * Validate Swiss municipality compliance
   */
  validateMunicipalityCompliance() {
    this.info('Validating municipality theme compliance...');
    
    // Check for municipality-specific outputs
    const municipalityFiles = this.stats.files.filter(file => 
      COMPLIANCE_CHECKS.municipalityThemes.some(municipality => 
        file.name.includes(municipality)
      )
    );

    if (municipalityFiles.length === 0) {
      this.warn('No municipality-specific theme files found');
    } else {
      this.info(`Found ${municipalityFiles.length} municipality theme files`);
    }

    // Check for critical component outputs
    for (const component of COMPLIANCE_CHECKS.criticalComponents) {
      const componentFiles = this.stats.files.filter(file => 
        file.name.includes(component)
      );
      
      if (componentFiles.length === 0) {
        this.warn(`No output files found for critical component: ${component}`);
      }
    }
  }

  /**
   * Generate build report
   */
  generateReport() {
    this.info('\n📊 Build Validation Report');
    this.info('=' .repeat(50));
    
    // Summary
    this.info(`Total files: ${this.stats.files.length}`);
    this.info(`Total size: ${this.formatBytes(this.stats.totalSize)}`);
    this.info(`Entry points: ${this.stats.entryPoints.length}`);
    
    // Performance budgets
    this.info('\n💰 Performance Budget Status:');
    this.info(`Total size: ${this.formatBytes(this.stats.totalSize)} / ${this.formatBytes(PERFORMANCE_BUDGETS.totalSize)} ${this.stats.totalSize <= PERFORMANCE_BUDGETS.totalSize ? '✓' : '❌'}`);
    this.info(`Script size: ${this.formatBytes(this.stats.scriptSize)} / ${this.formatBytes(PERFORMANCE_BUDGETS.scriptSize)} ${this.stats.scriptSize <= PERFORMANCE_BUDGETS.scriptSize ? '✓' : '❌'}`);
    this.info(`Style size: ${this.formatBytes(this.stats.styleSize)} / ${this.formatBytes(PERFORMANCE_BUDGETS.styleSize)} ${this.stats.styleSize <= PERFORMANCE_BUDGETS.styleSize ? '✓' : '❌'}`);
    
    // Entry points
    if (this.stats.entryPoints.length > 0) {
      this.info('\n📦 Entry Points:');
      for (const entry of this.stats.entryPoints) {
        this.info(`  ${entry.name}: ${this.formatBytes(entry.size)}`);
      }
    }

    // Issues summary
    this.info(`\n🔍 Validation Results:`);
    this.info(`Errors: ${this.errors.length}`);
    this.info(`Warnings: ${this.warnings.length}`);

    if (this.errors.length > 0) {
      this.info('\n❌ Errors:');
      this.errors.forEach(error => this.info(`  ${error}`));
    }

    if (this.warnings.length > 0) {
      this.info('\n⚠️  Warnings:');
      this.warnings.forEach(warning => this.info(`  ${warning}`));
    }
  }

  /**
   * Format bytes as human readable string
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  /**
   * Run complete validation
   */
  async validate() {
    this.info('🚀 Starting build validation for PnX Architecture...');
    
    // Core validations
    if (!this.validateDistStructure()) {
      return false;
    }
    
    this.analyzeManifest();
    this.calculateStats();
    this.validatePerformanceBudgets();
    this.validateMunicipalityCompliance();
    
    // Generate comprehensive report
    this.generateReport();
    
    // Determine success/failure
    const hasErrors = this.errors.length > 0;
    
    if (hasErrors) {
      this.info('\n❌ Build validation failed!');
      return false;
    } else {
      this.info('\n✅ Build validation passed!');
      if (this.warnings.length > 0) {
        this.info(`📝 ${this.warnings.length} warnings to address`);
      }
      return true;
    }
  }
}

// Run validation if called directly
if (process.argv[1] === __filename) {
  const validator = new BuildValidator();
  validator.validate().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('❌ Validation failed with error:', error.message);
    process.exit(1);
  });
}

export default BuildValidator;