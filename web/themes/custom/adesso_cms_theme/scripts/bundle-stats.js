#!/usr/bin/env node

/**
 * Bundle Statistics Analysis for PnX Architecture
 * Generates comprehensive bundle analysis for performance optimization
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { resolve, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const themeRoot = resolve(__dirname, '..');
const distDir = resolve(themeRoot, 'dist');
const manifestPath = resolve(distDir, '.vite', 'manifest.json');
const outputPath = resolve(themeRoot, 'bundle-stats.json');

class BundleAnalyzer {
  constructor() {
    this.stats = {
      timestamp: new Date().toISOString(),
      buildMode: process.env.NODE_ENV || 'production',
      summary: {
        totalFiles: 0,
        totalSize: 0,
        totalSizeGzip: 0,
        entryPoints: 0,
        chunks: 0,
        assets: 0
      },
      entries: {},
      chunks: {},
      assets: {},
      dependencies: {},
      performance: {
        budgets: {
          total: { limit: 500000, actual: 0, status: 'unknown' },
          scripts: { limit: 250000, actual: 0, status: 'unknown' },
          styles: { limit: 100000, actual: 0, status: 'unknown' },
          images: { limit: 400000, actual: 0, status: 'unknown' }
        },
        coreWebVitals: {
          estimatedLCP: 0,
          estimatedFCP: 0,
          estimatedCLS: 0
        }
      },
      municipalities: {
        thalwil: { files: [], size: 0 },
        thalheim: { files: [], size: 0 },
        erlenbach: { files: [], size: 0 }
      },
      recommendations: []
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'warn' ? '⚠️' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  /**
   * Analyze Vite manifest for entry points and dependencies
   */
  analyzeManifest() {
    this.log('Analyzing Vite manifest...');
    
    if (!existsSync(manifestPath)) {
      this.log('Manifest file not found, skipping manifest analysis', 'warn');
      return;
    }

    try {
      const manifestContent = readFileSync(manifestPath, 'utf-8');
      const manifest = JSON.parse(manifestContent);

      for (const [key, entry] of Object.entries(manifest)) {
        const filePath = resolve(distDir, entry.file);
        const size = this.getFileSize(filePath);
        
        if (entry.isEntry) {
          this.stats.entries[key] = {
            file: entry.file,
            size: size,
            assets: entry.assets || [],
            css: entry.css || [],
            imports: entry.imports || [],
            dynamicImports: entry.dynamicImports || []
          };
          this.stats.summary.entryPoints++;
        } else {
          this.stats.chunks[key] = {
            file: entry.file,
            size: size
          };
          this.stats.summary.chunks++;
        }

        this.stats.summary.totalSize += size;
      }

    } catch (error) {
      this.log(`Failed to parse manifest: ${error.message}`, 'error');
    }
  }

  /**
   * Analyze all build output files
   */
  analyzeOutputFiles() {
    this.log('Analyzing output files...');
    
    if (!existsSync(distDir)) {
      this.log('Dist directory not found', 'error');
      return;
    }

    try {
      const files = this.getAllFiles(distDir);
      
      for (const file of files) {
        const relativePath = file.replace(distDir + '/', '');
        const size = this.getFileSize(file);
        const ext = extname(file).toLowerCase();
        const type = this.getFileType(ext);
        
        const fileInfo = {
          path: relativePath,
          size: size,
          type: type,
          gzipSize: this.estimateGzipSize(size)
        };

        this.stats.assets[relativePath] = fileInfo;
        this.stats.summary.totalFiles++;
        this.stats.summary.totalSize += size;
        this.stats.summary.totalSizeGzip += fileInfo.gzipSize;

        // Update performance budget tracking
        switch (type) {
          case 'script':
            this.stats.performance.budgets.scripts.actual += size;
            break;
          case 'style':
            this.stats.performance.budgets.styles.actual += size;
            break;
          case 'image':
            this.stats.performance.budgets.images.actual += size;
            break;
        }

        // Track municipality-specific files
        this.trackMunicipalityFiles(relativePath, size);
      }

      // Update budget statuses
      this.updateBudgetStatuses();

    } catch (error) {
      this.log(`Failed to analyze output files: ${error.message}`, 'error');
    }
  }

  /**
   * Get all files in directory recursively
   */
  getAllFiles(dir) {
    const files = [];
    
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = resolve(dir, entry.name);
        
        if (entry.isDirectory()) {
          files.push(...this.getAllFiles(fullPath));
        } else {
          files.push(fullPath);
        }
      }
    } catch (error) {
      this.log(`Failed to read directory ${dir}: ${error.message}`, 'error');
    }
    
    return files;
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
   * Estimate gzip compression size (roughly 70% reduction for text files)
   */
  estimateGzipSize(originalSize) {
    return Math.round(originalSize * 0.3);
  }

  /**
   * Determine file type from extension
   */
  getFileType(ext) {
    const typeMap = {
      '.js': 'script',
      '.mjs': 'script',
      '.ts': 'script',
      '.css': 'style',
      '.scss': 'style',
      '.sass': 'style',
      '.png': 'image',
      '.jpg': 'image',
      '.jpeg': 'image',
      '.gif': 'image',
      '.svg': 'image',
      '.webp': 'image',
      '.woff': 'font',
      '.woff2': 'font',
      '.ttf': 'font',
      '.eot': 'font',
      '.json': 'data',
      '.html': 'document'
    };

    return typeMap[ext] || 'other';
  }

  /**
   * Track municipality-specific files
   */
  trackMunicipalityFiles(relativePath, size) {
    const municipalities = ['thalwil', 'thalheim', 'erlenbach'];
    
    for (const municipality of municipalities) {
      if (relativePath.toLowerCase().includes(municipality)) {
        this.stats.municipalities[municipality].files.push({
          path: relativePath,
          size: size
        });
        this.stats.municipalities[municipality].size += size;
      }
    }
  }

  /**
   * Update performance budget statuses
   */
  updateBudgetStatuses() {
    const budgets = this.stats.performance.budgets;
    
    budgets.total.actual = this.stats.summary.totalSize;
    budgets.total.status = budgets.total.actual <= budgets.total.limit ? 'pass' : 'fail';
    
    budgets.scripts.status = budgets.scripts.actual <= budgets.scripts.limit ? 'pass' : 'fail';
    budgets.styles.status = budgets.styles.actual <= budgets.styles.limit ? 'pass' : 'fail';
    budgets.images.status = budgets.images.actual <= budgets.images.limit ? 'pass' : 'fail';
  }

  /**
   * Generate performance recommendations
   */
  generateRecommendations() {
    this.log('Generating performance recommendations...');
    
    const recommendations = [];
    const budgets = this.stats.performance.budgets;

    // Budget-based recommendations
    if (budgets.total.status === 'fail') {
      recommendations.push({
        type: 'error',
        category: 'performance',
        message: `Total bundle size (${this.formatBytes(budgets.total.actual)}) exceeds budget (${this.formatBytes(budgets.total.limit)})`,
        suggestion: 'Consider code splitting, tree shaking, or removing unused dependencies'
      });
    }

    if (budgets.scripts.status === 'fail') {
      recommendations.push({
        type: 'warning',
        category: 'performance',
        message: `Script size (${this.formatBytes(budgets.scripts.actual)}) exceeds budget (${this.formatBytes(budgets.scripts.limit)})`,
        suggestion: 'Review JavaScript bundle size and consider dynamic imports for non-critical code'
      });
    }

    if (budgets.styles.status === 'fail') {
      recommendations.push({
        type: 'warning',
        category: 'performance',
        message: `Style size (${this.formatBytes(budgets.styles.actual)}) exceeds budget (${this.formatBytes(budgets.styles.limit)})`,
        suggestion: 'Consider CSS purging, critical CSS extraction, or removing unused styles'
      });
    }

    // Municipality-specific recommendations
    const municipalitySizes = Object.values(this.stats.municipalities).map(m => m.size);
    const maxMunicipalitySize = Math.max(...municipalitySizes);
    const minMunicipalitySize = Math.min(...municipalitySizes.filter(s => s > 0));
    
    if (maxMunicipalitySize > 0 && minMunicipalitySize > 0) {
      const sizeRatio = maxMunicipalitySize / minMunicipalitySize;
      
      if (sizeRatio > 2) {
        recommendations.push({
          type: 'info',
          category: 'municipality',
          message: 'Significant size differences between municipality themes detected',
          suggestion: 'Consider optimizing larger municipality themes or sharing common assets'
        });
      }
    }

    // File count recommendations
    if (this.stats.summary.totalFiles > 50) {
      recommendations.push({
        type: 'info',
        category: 'optimization',
        message: `High number of output files (${this.stats.summary.totalFiles})`,
        suggestion: 'Consider bundling smaller assets or using HTTP/2 push for better loading'
      });
    }

    // Entry point recommendations
    const largeEntries = Object.entries(this.stats.entries)
      .filter(([_, entry]) => entry.size > 150000);
    
    if (largeEntries.length > 0) {
      recommendations.push({
        type: 'warning',
        category: 'performance',
        message: `Large entry points detected: ${largeEntries.map(([name]) => name).join(', ')}`,
        suggestion: 'Consider splitting large entry points into smaller chunks'
      });
    }

    this.stats.recommendations = recommendations;
  }

  /**
   * Generate comprehensive report
   */
  generateReport() {
    this.log('\n📊 Bundle Analysis Report');
    this.log('=' .repeat(50));

    // Summary
    this.log(`Build mode: ${this.stats.buildMode}`);
    this.log(`Total files: ${this.stats.summary.totalFiles}`);
    this.log(`Total size: ${this.formatBytes(this.stats.summary.totalSize)} (${this.formatBytes(this.stats.summary.totalSizeGzip)} gzipped)`);
    this.log(`Entry points: ${this.stats.summary.entryPoints}`);
    this.log(`Chunks: ${this.stats.summary.chunks}`);

    // Performance budgets
    this.log('\n💰 Performance Budget Status:');
    const budgets = this.stats.performance.budgets;
    
    for (const [name, budget] of Object.entries(budgets)) {
      const status = budget.status === 'pass' ? '✅' : budget.status === 'fail' ? '❌' : '❓';
      this.log(`${name}: ${this.formatBytes(budget.actual)} / ${this.formatBytes(budget.limit)} ${status}`);
    }

    // Entry points breakdown
    if (Object.keys(this.stats.entries).length > 0) {
      this.log('\n📦 Entry Points:');
      for (const [name, entry] of Object.entries(this.stats.entries)) {
        this.log(`  ${name}: ${this.formatBytes(entry.size)}`);
      }
    }

    // Municipality breakdown
    this.log('\n🏛️  Municipality Themes:');
    for (const [name, data] of Object.entries(this.stats.municipalities)) {
      if (data.size > 0) {
        this.log(`  ${name}: ${data.files.length} files, ${this.formatBytes(data.size)}`);
      }
    }

    // Recommendations
    if (this.stats.recommendations.length > 0) {
      this.log('\n💡 Recommendations:');
      for (const rec of this.stats.recommendations) {
        const icon = rec.type === 'error' ? '❌' : rec.type === 'warning' ? '⚠️' : 'ℹ️';
        this.log(`  ${icon} ${rec.message}`);
        this.log(`     💡 ${rec.suggestion}`);
      }
    }

    this.log('\n✅ Analysis complete!');
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
   * Save stats to JSON file
   */
  saveStats() {
    try {
      const jsonOutput = JSON.stringify(this.stats, null, 2);
      writeFileSync(outputPath, jsonOutput);
      this.log(`Bundle stats saved to: ${outputPath}`);
    } catch (error) {
      this.log(`Failed to save stats: ${error.message}`, 'error');
    }
  }

  /**
   * Run complete bundle analysis
   */
  async analyze() {
    this.log('🚀 Starting bundle analysis...');
    
    this.analyzeManifest();
    this.analyzeOutputFiles();
    this.generateRecommendations();
    this.generateReport();
    this.saveStats();
    
    return this.stats;
  }
}

// Run analysis if called directly
if (process.argv[1] === __filename) {
  const analyzer = new BundleAnalyzer();
  analyzer.analyze().catch(error => {
    console.error('❌ Bundle analysis failed:', error.message);
    process.exit(1);
  });
}

export default BundleAnalyzer;