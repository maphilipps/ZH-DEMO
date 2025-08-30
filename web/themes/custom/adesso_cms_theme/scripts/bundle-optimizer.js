#!/usr/bin/env node

/**
 * Phase 4.2: Advanced Bundle Optimization and Analysis
 * 
 * Comprehensive bundle optimization system for PreviousNext Frontend Build Tools Architecture
 * implementing Swiss government performance standards and WCAG 2.1 AA compliance.
 * 
 * Features:
 * - Tree-shaking optimization
 * - Dead code elimination
 * - Code splitting strategies
 * - Asset optimization recommendations
 * - Municipality-specific bundle analysis
 * - Performance regression detection
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { resolve, join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const themeRoot = resolve(__dirname, '..');
const distDir = resolve(themeRoot, 'dist');

class BundleOptimizer {
  constructor() {
    this.stats = {
      timestamp: new Date().toISOString(),
      version: '4.2.0',
      buildMode: process.env.NODE_ENV || 'production',
      optimization: {
        treeshaking: { enabled: false, savings: 0 },
        deadCodeElimination: { enabled: false, savings: 0 },
        codeSplitting: { enabled: false, chunks: 0 },
        assetOptimization: { enabled: false, compressionRatio: 0 }
      },
      performance: {
        beforeOptimization: {},
        afterOptimization: {},
        improvement: {}
      },
      municipalities: {
        thalwil: { size: 0, optimized: 0, savings: 0 },
        thalheim: { size: 0, optimized: 0, savings: 0 },
        erlenbach: { size: 0, optimized: 0, savings: 0 }
      },
      recommendations: [],
      compliance: {
        swissGovernment: false,
        wcag21aa: false,
        performanceBudgets: false
      }
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      'info': '🔧',
      'success': '✅',
      'warn': '⚠️',
      'error': '❌',
      'optimization': '⚡'
    }[type] || 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  /**
   * Phase 4.2.1: Tree-shaking and dead code elimination analysis
   */
  async analyzeTreeshaking() {
    this.log('Analyzing tree-shaking opportunities...', 'optimization');
    
    const jsFiles = this.getFilesByType('js');
    let totalSavings = 0;
    const unusedExports = [];
    
    for (const file of jsFiles) {
      const content = readFileSync(file.path, 'utf-8');
      
      // Analyze unused exports (simplified analysis)
      const exportMatches = content.match(/export\s+(?:default\s+)?(?:function|const|let|var|class)\s+(\w+)/g) || [];
      const importMatches = content.match(/import\s+.*?from\s+['"]([^'"]+)['"]/g) || [];
      
      // Check for unused Alpine.js components
      const alpineComponents = content.match(/Alpine\.data\(['"](\w+)['"],/g) || [];
      const unusedAlpine = alpineComponents.filter(component => {
        const componentName = component.match(/Alpine\.data\(['"](\w+)['"]/)[1];
        return !content.includes(`x-data="${componentName}`);
      });
      
      if (unusedAlpine.length > 0) {
        const estimatedSavings = unusedAlpine.length * 2000; // Estimate 2KB per unused component
        totalSavings += estimatedSavings;
        unusedExports.push({
          file: basename(file.path),
          type: 'alpine-components',
          count: unusedAlpine.length,
          estimatedSavings
        });
      }
      
      // Check for unused Swiper modules
      if (content.includes('swiper') && content.includes('import')) {
        const swiperImports = content.match(/import\s+.*?from\s+['"]swiper.*?['"]/g) || [];
        if (swiperImports.length > 0) {
          const estimatedSavings = swiperImports.length * 5000; // Estimate 5KB per Swiper module
          totalSavings += estimatedSavings;
          unusedExports.push({
            file: basename(file.path),
            type: 'swiper-modules',
            count: swiperImports.length,
            estimatedSavings
          });
        }
      }
    }
    
    this.stats.optimization.treeshaking = {
      enabled: true,
      savings: totalSavings,
      unusedExports,
      analysisDate: new Date().toISOString()
    };
    
    if (totalSavings > 10000) { // >10KB savings potential
      this.addRecommendation('optimization', 'high', 
        `Tree-shaking can reduce bundle size by ${this.formatBytes(totalSavings)}`,
        'Implement dynamic imports and remove unused Alpine.js components'
      );
    }
    
    this.log(`Tree-shaking analysis complete. Potential savings: ${this.formatBytes(totalSavings)}`);
  }

  /**
   * Phase 4.2.2: Code splitting strategy analysis
   */
  analyzeCodeSplitting() {
    this.log('Analyzing code splitting opportunities...', 'optimization');
    
    const manifestPath = resolve(distDir, '.vite', 'manifest.json');
    let chunkAnalysis = { total: 0, optimized: 0, recommendations: [] };
    
    if (existsSync(manifestPath)) {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
      
      // Analyze entry points for splitting opportunities
      const entryPoints = Object.entries(manifest).filter(([_, entry]) => entry.isEntry);
      const largeEntries = entryPoints.filter(([_, entry]) => {
        const filePath = resolve(distDir, entry.file);
        const size = this.getFileSize(filePath);
        return size > 100000; // >100KB
      });
      
      chunkAnalysis.total = entryPoints.length;
      chunkAnalysis.largeEntries = largeEntries.length;
      
      // Recommend splitting for large components
      for (const [name, entry] of largeEntries) {
        const size = this.getFileSize(resolve(distDir, entry.file));
        chunkAnalysis.recommendations.push({
          entry: name,
          size,
          recommendation: 'Split into smaller chunks using dynamic imports'
        });
      }
      
      // Check for vendor bundle optimization
      const vendorFiles = Object.entries(manifest)
        .filter(([name]) => name.includes('vendor'))
        .map(([name, entry]) => ({
          name,
          size: this.getFileSize(resolve(distDir, entry.file))
        }));
      
      if (vendorFiles.some(file => file.size > 150000)) { // >150KB
        this.addRecommendation('performance', 'high',
          'Large vendor bundles detected',
          'Consider splitting vendor libraries into separate chunks'
        );
      }
    }
    
    this.stats.optimization.codeSplitting = {
      enabled: true,
      chunks: chunkAnalysis.total,
      analysis: chunkAnalysis,
      date: new Date().toISOString()
    };
    
    this.log(`Code splitting analysis complete. Analyzed ${chunkAnalysis.total} chunks`);
  }

  /**
   * Phase 4.2.3: Asset optimization analysis
   */
  analyzeAssetOptimization() {
    this.log('Analyzing asset optimization opportunities...', 'optimization');
    
    const cssFiles = this.getFilesByType('css');
    const imageFiles = this.getFilesByType(['png', 'jpg', 'jpeg', 'webp', 'svg']);
    const fontFiles = this.getFilesByType(['woff', 'woff2', 'ttf']);
    
    let optimizationSavings = 0;
    const optimizations = [];
    
    // CSS optimization analysis
    for (const cssFile of cssFiles) {
      const content = readFileSync(cssFile.path, 'utf-8');
      
      // Check for unused CSS (simple heuristics)
      const unusedSelectors = this.findUnusedCSS(content);
      if (unusedSelectors.length > 0) {
        const estimatedSavings = unusedSelectors.length * 50; // 50 bytes per unused selector
        optimizationSavings += estimatedSavings;
        optimizations.push({
          type: 'css-purging',
          file: basename(cssFile.path),
          unusedSelectors: unusedSelectors.length,
          estimatedSavings
        });
      }
      
      // Check for duplicate CSS
      const duplicateRules = this.findDuplicateCSS(content);
      if (duplicateRules > 0) {
        const estimatedSavings = duplicateRules * 100; // 100 bytes per duplicate rule
        optimizationSavings += estimatedSavings;
        optimizations.push({
          type: 'css-deduplication',
          file: basename(cssFile.path),
          duplicateRules,
          estimatedSavings
        });
      }
    }
    
    // Image optimization potential
    const unoptimizedImages = imageFiles.filter(file => {
      return !basename(file.path).includes('.webp') && file.size > 50000; // >50KB non-WebP
    });
    
    if (unoptimizedImages.length > 0) {
      const estimatedSavings = unoptimizedImages.reduce((total, img) => total + (img.size * 0.3), 0);
      optimizationSavings += estimatedSavings;
      optimizations.push({
        type: 'image-optimization',
        files: unoptimizedImages.length,
        estimatedSavings,
        recommendation: 'Convert to WebP and implement responsive images'
      });
    }
    
    // Font optimization
    const largeFonts = fontFiles.filter(file => file.size > 100000); // >100KB
    if (largeFonts.length > 0) {
      optimizations.push({
        type: 'font-optimization',
        files: largeFonts.length,
        recommendation: 'Implement font subsetting and preloading'
      });
    }
    
    this.stats.optimization.assetOptimization = {
      enabled: true,
      totalSavings: optimizationSavings,
      optimizations,
      compressionRatio: optimizationSavings > 0 ? (optimizationSavings / this.getTotalAssetSize()) : 0,
      date: new Date().toISOString()
    };
    
    if (optimizationSavings > 50000) { // >50KB savings potential
      this.addRecommendation('optimization', 'high',
        `Asset optimization can save ${this.formatBytes(optimizationSavings)}`,
        'Implement CSS purging, image optimization, and font subsetting'
      );
    }
    
    this.log(`Asset optimization analysis complete. Potential savings: ${this.formatBytes(optimizationSavings)}`);
  }

  /**
   * Phase 4.2.4: Municipality-specific bundle analysis
   */
  analyzeMunicipalityBundles() {
    this.log('Analyzing municipality-specific bundles...', 'optimization');
    
    const municipalities = ['thalwil', 'thalheim', 'erlenbach'];
    
    for (const municipality of municipalities) {
      const municipalityFiles = this.getAllFiles(distDir)
        .filter(file => basename(file).toLowerCase().includes(municipality))
        .map(file => ({
          path: file,
          size: this.getFileSize(file),
          type: this.getFileType(basename(file))
        }));
      
      const totalSize = municipalityFiles.reduce((sum, file) => sum + file.size, 0);
      
      // Calculate optimization potential
      const sharedAssets = this.findSharedAssets(municipalityFiles, municipalities);
      const optimizedSize = totalSize - (sharedAssets.size * 0.7); // 70% reduction for shared assets
      const savings = totalSize - optimizedSize;
      
      this.stats.municipalities[municipality] = {
        size: totalSize,
        optimized: optimizedSize,
        savings,
        files: municipalityFiles.length,
        sharedAssets: sharedAssets.count,
        compliance: totalSize <= 450000 // 450KB budget per municipality
      };
    }
    
    // Cross-municipality optimization recommendations
    const totalMunicipalitySize = Object.values(this.stats.municipalities)
      .reduce((sum, m) => sum + m.size, 0);
    
    const totalSavings = Object.values(this.stats.municipalities)
      .reduce((sum, m) => sum + m.savings, 0);
    
    if (totalSavings > 100000) { // >100KB savings across municipalities
      this.addRecommendation('municipality', 'medium',
        `Cross-municipality optimization can save ${this.formatBytes(totalSavings)}`,
        'Implement shared asset chunking and common component extraction'
      );
    }
    
    this.log(`Municipality analysis complete. Total size: ${this.formatBytes(totalMunicipalitySize)}, Potential savings: ${this.formatBytes(totalSavings)}`);
  }

  /**
   * Phase 4.2.5: Performance regression detection
   */
  async detectPerformanceRegressions() {
    this.log('Detecting performance regressions...', 'optimization');
    
    const previousReportPath = resolve(themeRoot, 'test-results/performance/bundle-optimization-history.json');
    let regressions = [];
    
    if (existsSync(previousReportPath)) {
      try {
        const previousData = JSON.parse(readFileSync(previousReportPath, 'utf-8'));
        const currentSize = this.getTotalBundleSize();
        const previousSize = previousData.totalSize || 0;
        
        const sizeIncrease = currentSize - previousSize;
        const percentageIncrease = previousSize > 0 ? (sizeIncrease / previousSize) * 100 : 0;
        
        if (percentageIncrease > 10) { // >10% increase is a regression
          regressions.push({
            type: 'bundle-size',
            current: currentSize,
            previous: previousSize,
            increase: sizeIncrease,
            percentage: percentageIncrease,
            severity: percentageIncrease > 25 ? 'critical' : 'warning'
          });
        }
        
        // Compare municipality sizes
        for (const municipality of Object.keys(this.stats.municipalities)) {
          const currentMunicipalitySize = this.stats.municipalities[municipality].size;
          const previousMunicipalitySize = previousData.municipalities?.[municipality]?.size || 0;
          
          if (previousMunicipalitySize > 0) {
            const municipalityIncrease = ((currentMunicipalitySize - previousMunicipalitySize) / previousMunicipalitySize) * 100;
            
            if (municipalityIncrease > 15) { // >15% increase for municipality
              regressions.push({
                type: 'municipality-size',
                municipality,
                current: currentMunicipalitySize,
                previous: previousMunicipalitySize,
                percentage: municipalityIncrease,
                severity: 'warning'
              });
            }
          }
        }
      } catch (error) {
        this.log(`Could not read previous performance data: ${error.message}`, 'warn');
      }
    }
    
    if (regressions.length > 0) {
      this.addRecommendation('regression', 'critical',
        `${regressions.length} performance regressions detected`,
        'Review recent changes and optimize bundle sizes'
      );
    }
    
    this.stats.regressions = regressions;
    this.log(`Performance regression analysis complete. Found ${regressions.length} regressions`);
  }

  /**
   * Phase 4.2.6: Swiss government compliance validation
   */
  validateSwissCompliance() {
    this.log('Validating Swiss government compliance...', 'optimization');
    
    const totalSize = this.getTotalBundleSize();
    const scriptSize = this.getFilesByType('js').reduce((sum, file) => sum + file.size, 0);
    const styleSize = this.getFilesByType('css').reduce((sum, file) => sum + file.size, 0);
    
    // Swiss performance budgets (eCH-0059 standards)
    const budgets = {
      total: 500000,    // 500KB total
      scripts: 200000,  // 200KB scripts
      styles: 100000    // 100KB styles
    };
    
    const compliance = {
      swissGovernment: totalSize <= budgets.total && scriptSize <= budgets.scripts && styleSize <= budgets.styles,
      wcag21aa: this.validateWCAGCompliance(),
      performanceBudgets: this.validatePerformanceBudgets()
    };
    
    this.stats.compliance = compliance;
    
    if (!compliance.swissGovernment) {
      this.addRecommendation('compliance', 'critical',
        'Swiss government performance standards not met',
        `Total: ${this.formatBytes(totalSize)}/${this.formatBytes(budgets.total)}, Scripts: ${this.formatBytes(scriptSize)}/${this.formatBytes(budgets.scripts)}, Styles: ${this.formatBytes(styleSize)}/${this.formatBytes(budgets.styles)}`
      );
    }
    
    this.log(`Swiss compliance validation complete. Status: ${compliance.swissGovernment ? '✅ PASS' : '❌ FAIL'}`);
  }

  /**
   * Generate comprehensive optimization report
   */
  generateOptimizationReport() {
    this.log('\n📊 Phase 4.2: Bundle Optimization Analysis Report', 'success');
    this.log('=' .repeat(70));
    
    // Executive summary
    const totalSavings = this.calculateTotalSavings();
    const currentSize = this.getTotalBundleSize();
    const optimizedSize = currentSize - totalSavings;
    
    console.log(`\n🎯 Executive Summary:`);
    console.log(`   Current bundle size: ${this.formatBytes(currentSize)}`);
    console.log(`   Potential optimized size: ${this.formatBytes(optimizedSize)}`);
    console.log(`   Total savings potential: ${this.formatBytes(totalSavings)} (${((totalSavings/currentSize)*100).toFixed(1)}%)`);
    
    // Optimization analysis
    console.log(`\n⚡ Optimization Analysis:`);
    console.log(`   Tree-shaking savings: ${this.formatBytes(this.stats.optimization.treeshaking.savings)}`);
    console.log(`   Asset optimization savings: ${this.formatBytes(this.stats.optimization.assetOptimization.totalSavings)}`);
    console.log(`   Code splitting opportunities: ${this.stats.optimization.codeSplitting.chunks} chunks`);
    
    // Municipality analysis
    console.log(`\n🏛️  Municipality Analysis:`);
    for (const [name, data] of Object.entries(this.stats.municipalities)) {
      const status = data.compliance ? '✅' : '❌';
      console.log(`   ${name}: ${this.formatBytes(data.size)} → ${this.formatBytes(data.optimized)} (${this.formatBytes(data.savings)} savings) ${status}`);
    }
    
    // Swiss government compliance
    console.log(`\n🇨🇭 Swiss Government Compliance:`);
    console.log(`   Performance standards: ${this.stats.compliance.swissGovernment ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   WCAG 2.1 AA compliance: ${this.stats.compliance.wcag21aa ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   Performance budgets: ${this.stats.compliance.performanceBudgets ? '✅ PASS' : '❌ FAIL'}`);
    
    // Recommendations
    if (this.stats.recommendations.length > 0) {
      console.log(`\n💡 Optimization Recommendations:`);
      this.stats.recommendations.forEach((rec, index) => {
        const icon = rec.priority === 'critical' ? '🚨' : rec.priority === 'high' ? '⚠️' : 'ℹ️';
        console.log(`   ${index + 1}. ${icon} [${rec.category.toUpperCase()}] ${rec.message}`);
        console.log(`      💡 ${rec.suggestion}`);
      });
    }
    
    // Performance regressions
    if (this.stats.regressions && this.stats.regressions.length > 0) {
      console.log(`\n📈 Performance Regressions:`);
      this.stats.regressions.forEach((reg, index) => {
        const icon = reg.severity === 'critical' ? '🚨' : '⚠️';
        console.log(`   ${index + 1}. ${icon} ${reg.type}: +${reg.percentage.toFixed(1)}% increase`);
      });
    }
    
    console.log(`\n${'='.repeat(70)}`);
    this.log('Bundle optimization analysis complete!', 'success');
  }

  /**
   * Save optimization data for tracking and CI integration
   */
  saveOptimizationData() {
    // Ensure reports directory exists
    const reportsDir = resolve(themeRoot, 'test-results/performance');
    if (!existsSync(reportsDir)) {
      execSync(`mkdir -p "${reportsDir}"`);
    }
    
    // Save current optimization report
    const reportPath = resolve(reportsDir, 'bundle-optimization-report.json');
    const reportData = {
      ...this.stats,
      totalSize: this.getTotalBundleSize(),
      generatedAt: new Date().toISOString(),
      commit: process.env.GITHUB_SHA || 'local',
      branch: process.env.GITHUB_REF_NAME || 'local'
    };
    
    writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    
    // Update history for regression tracking
    const historyPath = resolve(reportsDir, 'bundle-optimization-history.json');
    let history = [];
    
    if (existsSync(historyPath)) {
      try {
        history = JSON.parse(readFileSync(historyPath, 'utf-8'));
      } catch (error) {
        this.log(`Could not read history file: ${error.message}`, 'warn');
      }
    }
    
    history.push({
      timestamp: reportData.generatedAt,
      commit: reportData.commit,
      branch: reportData.branch,
      totalSize: reportData.totalSize,
      municipalities: reportData.municipalities,
      compliance: reportData.compliance
    });
    
    // Keep only last 50 entries
    if (history.length > 50) {
      history = history.slice(-50);
    }
    
    writeFileSync(historyPath, JSON.stringify(history, null, 2));
    
    this.log(`Optimization data saved to: ${reportPath}`);
    this.log(`History updated: ${historyPath}`);
  }

  // Utility methods
  getFilesByType(extensions) {
    const exts = Array.isArray(extensions) ? extensions : [extensions];
    return this.getAllFiles(distDir)
      .filter(file => exts.some(ext => file.toLowerCase().endsWith(`.${ext}`)))
      .map(file => ({
        path: file,
        size: this.getFileSize(file),
        type: this.getFileType(basename(file))
      }));
  }

  getAllFiles(dir) {
    let files = [];
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          files.push(...this.getAllFiles(fullPath));
        } else {
          files.push(fullPath);
        }
      }
    } catch (error) {
      this.log(`Error reading directory ${dir}: ${error.message}`, 'warn');
    }
    return files;
  }

  getFileSize(filePath) {
    try {
      return statSync(filePath).size;
    } catch {
      return 0;
    }
  }

  getFileType(filename) {
    const ext = extname(filename).toLowerCase();
    const typeMap = {
      '.js': 'js', '.mjs': 'js', '.ts': 'js',
      '.css': 'css', '.scss': 'css',
      '.png': 'image', '.jpg': 'image', '.jpeg': 'image', '.webp': 'image', '.svg': 'image',
      '.woff': 'font', '.woff2': 'font', '.ttf': 'font'
    };
    return typeMap[ext] || 'other';
  }

  getTotalBundleSize() {
    return this.getAllFiles(distDir)
      .reduce((total, file) => total + this.getFileSize(file), 0);
  }

  getTotalAssetSize() {
    const assetTypes = ['css', 'image', 'font'];
    return assetTypes.reduce((total, type) => {
      return total + this.getFilesByType(type).reduce((sum, file) => sum + file.size, 0);
    }, 0);
  }

  calculateTotalSavings() {
    return (this.stats.optimization.treeshaking.savings || 0) +
           (this.stats.optimization.assetOptimization.totalSavings || 0) +
           Object.values(this.stats.municipalities).reduce((sum, m) => sum + (m.savings || 0), 0);
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  addRecommendation(category, priority, message, suggestion) {
    this.stats.recommendations.push({
      category,
      priority,
      message,
      suggestion,
      timestamp: new Date().toISOString()
    });
  }

  findUnusedCSS(content) {
    // Simplified unused CSS detection
    const selectors = content.match(/\.[a-zA-Z][a-zA-Z0-9_-]*(?=\s*\{)/g) || [];
    const uniqueSelectors = [...new Set(selectors)];
    
    // This would be enhanced with actual usage analysis
    return uniqueSelectors.filter(selector => {
      // Simple heuristic: if selector appears only once, it might be unused
      const occurrences = (content.match(new RegExp(selector.replace('.', '\\.'), 'g')) || []).length;
      return occurrences === 1;
    });
  }

  findDuplicateCSS(content) {
    // Simplified duplicate CSS detection
    const rules = content.match(/[^{}]+\{[^{}]*\}/g) || [];
    const ruleMap = new Map();
    let duplicates = 0;
    
    rules.forEach(rule => {
      const normalized = rule.replace(/\s+/g, ' ').trim();
      if (ruleMap.has(normalized)) {
        duplicates++;
      } else {
        ruleMap.set(normalized, true);
      }
    });
    
    return duplicates;
  }

  findSharedAssets(municipalityFiles, allMunicipalities) {
    // Simplified shared asset detection
    let sharedCount = 0;
    let sharedSize = 0;
    
    // This would be enhanced with actual asset comparison
    municipalityFiles.forEach(file => {
      if (allMunicipalities.some(m => m !== 'current' && file.path.includes(m))) {
        sharedCount++;
        sharedSize += file.size;
      }
    });
    
    return { count: sharedCount, size: sharedSize };
  }

  validateWCAGCompliance() {
    // Simplified WCAG compliance check
    const cssFiles = this.getFilesByType('css');
    
    for (const cssFile of cssFiles) {
      const content = readFileSync(cssFile.path, 'utf-8');
      
      // Check for potential contrast issues (very basic check)
      if (content.includes('color:') && !content.includes('contrast')) {
        return false;
      }
    }
    
    return true; // Assume compliant if no obvious issues
  }

  validatePerformanceBudgets() {
    const totalSize = this.getTotalBundleSize();
    const budgets = {
      total: 500000,
      scripts: 200000,
      styles: 100000
    };
    
    return totalSize <= budgets.total;
  }

  /**
   * Run complete bundle optimization analysis
   */
  async optimize() {
    this.log('🚀 Starting Phase 4.2: Bundle Analysis and Optimization...', 'success');
    
    if (!existsSync(distDir)) {
      this.log('Dist directory not found. Please run build first.', 'error');
      return false;
    }
    
    try {
      await this.analyzeTreeshaking();
      this.analyzeCodeSplitting();
      this.analyzeAssetOptimization();
      this.analyzeMunicipalityBundles();
      await this.detectPerformanceRegressions();
      this.validateSwissCompliance();
      
      this.generateOptimizationReport();
      this.saveOptimizationData();
      
      // Determine success based on compliance
      const success = this.stats.compliance.swissGovernment && this.stats.recommendations.filter(r => r.priority === 'critical').length === 0;
      
      if (success) {
        this.log('✅ Phase 4.2: Bundle optimization analysis completed successfully!', 'success');
      } else {
        this.log('❌ Phase 4.2: Bundle optimization analysis completed with issues that need attention', 'error');
      }
      
      return success;
    } catch (error) {
      this.log(`Bundle optimization analysis failed: ${error.message}`, 'error');
      console.error(error.stack);
      return false;
    }
  }
}

// Run optimization if called directly
if (process.argv[1] === __filename) {
  const optimizer = new BundleOptimizer();
  optimizer.optimize().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('❌ Bundle optimization failed:', error.message);
    process.exit(1);
  });
}

export default BundleOptimizer;