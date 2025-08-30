#!/usr/bin/env node

/**
 * Performance Budget Validation Script - Phase 3.2
 * 
 * Validates build output against Swiss government performance budgets
 * implementing PreviousNext frontend build tools architecture standards.
 * 
 * Requirements:
 * - Total bundle size ≤ 500KB (emergency services requirement)
 * - JavaScript bundles ≤ 200KB (critical path optimization)
 * - CSS bundles ≤ 100KB (above-the-fold styling)
 * - Image assets ≤ 300KB (municipal branding and content)
 * - Font files ≤ 150KB (accessibility and localization)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Swiss government performance budgets (bytes)
const PERFORMANCE_BUDGETS = {
  total: 500000,    // 500KB - Maximum total bundle size
  javascript: 200000, // 200KB - JavaScript budget (reduced from 250KB)
  stylesheet: 100000, // 100KB - CSS budget
  image: 300000,     // 300KB - Image budget (reduced from 400KB)  
  font: 150000,      // 150KB - Font budget
  document: 50000,   // 50KB - HTML document budget
  other: 100000      // 100KB - Other assets budget
};

// Component priority levels for budget allocation
const COMPONENT_PRIORITIES = {
  'critical': ['hero', 'site-header', 'site-footer', 'main-menu', 'button', 'form-progress'],
  'important': ['card-group', 'text', 'accordion', 'gallery', 'quick-action-buttons'],
  'standard': ['logo', 'badge', 'region', 'page-header', 'carousel', 'slider']
};

/**
 * Get file size in bytes
 */
function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch (error) {
    console.warn(`⚠️  Warning: Cannot read file ${filePath}: ${error.message}`);
    return 0;
  }
}

/**
 * Get all files matching a pattern in directory
 */
function getFilesInDirectory(dir, extensions) {
  if (!fs.existsSync(dir)) {
    console.warn(`⚠️  Warning: Directory ${dir} does not exist`);
    return [];
  }
  
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if (extensions.includes(ext)) {
        files.push(fullPath);
      }
    } else if (stat.isDirectory()) {
      // Recursively check subdirectories
      files.push(...getFilesInDirectory(fullPath, extensions));
    }
  }
  
  return files;
}

/**
 * Calculate bundle sizes by type
 */
function calculateBundleSizes(distDir) {
  const bundles = {
    javascript: getFilesInDirectory(distDir, ['.js', '.mjs']),
    stylesheet: getFilesInDirectory(distDir, ['.css']),
    image: getFilesInDirectory(distDir, ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']),
    font: getFilesInDirectory(distDir, ['.woff', '.woff2', '.ttf', '.otf']),
    document: getFilesInDirectory(distDir, ['.html']),
    other: getFilesInDirectory(distDir, ['.json', '.xml', '.txt'])
  };
  
  const sizes = {};
  let totalSize = 0;
  
  for (const [type, files] of Object.entries(bundles)) {
    sizes[type] = {
      files: files.length,
      size: files.reduce((total, file) => total + getFileSize(file), 0),
      budget: PERFORMANCE_BUDGETS[type],
      fileList: files.map(file => ({
        name: path.basename(file),
        size: getFileSize(file),
        path: path.relative(process.cwd(), file)
      }))
    };
    totalSize += sizes[type].size;
  }
  
  sizes.total = {
    files: Object.values(sizes).reduce((total, bundle) => total + bundle.files, 0),
    size: totalSize,
    budget: PERFORMANCE_BUDGETS.total,
    fileList: []
  };
  
  return sizes;
}

/**
 * Check if budgets are exceeded
 */
function checkBudgetViolations(sizes) {
  const violations = [];
  
  for (const [type, data] of Object.entries(sizes)) {
    if (data.size > data.budget) {
      const excess = data.size - data.budget;
      const percentage = ((data.size / data.budget) * 100).toFixed(1);
      
      violations.push({
        type,
        size: data.size,
        budget: data.budget,
        excess,
        percentage,
        severity: type === 'total' || type === 'javascript' ? 'critical' : 'warning'
      });
    }
  }
  
  return violations;
}

/**
 * Generate performance report
 */
function generatePerformanceReport(sizes, violations) {
  console.log('\n📊 Performance Budget Analysis - Phase 3.2\n');
  console.log('=' .repeat(60));
  
  // Budget summary
  console.log('\n🎯 Swiss Government Performance Budget Status:');
  console.log('-'.repeat(60));
  
  for (const [type, data] of Object.entries(sizes)) {
    const percentage = data.budget > 0 ? ((data.size / data.budget) * 100).toFixed(1) : '0.0';
    const status = data.size <= data.budget ? '✅' : '❌';
    const sizeKB = (data.size / 1024).toFixed(1);
    const budgetKB = (data.budget / 1024).toFixed(1);
    
    console.log(`${status} ${type.padEnd(12)}: ${sizeKB}KB / ${budgetKB}KB (${percentage}%)`);
    
    if (data.files > 0) {
      console.log(`   📄 Files: ${data.files}`);
      
      // Show largest files for over-budget categories
      if (data.size > data.budget && data.fileList.length > 0) {
        const sortedFiles = data.fileList.sort((a, b) => b.size - a.size).slice(0, 3);
        console.log(`   🔍 Largest files:`);
        sortedFiles.forEach(file => {
          console.log(`      • ${file.name}: ${(file.size / 1024).toFixed(1)}KB`);
        });
      }
    }
  }
  
  // Violations summary
  if (violations.length > 0) {
    console.log('\n❌ Budget Violations Found:');
    console.log('-'.repeat(60));
    
    let criticalViolations = 0;
    let warningViolations = 0;
    
    violations.forEach(violation => {
      const icon = violation.severity === 'critical' ? '🚨' : '⚠️';
      const excessKB = (violation.excess / 1024).toFixed(1);
      
      console.log(`${icon} ${violation.type}: ${excessKB}KB over budget (${violation.percentage}%)`);
      
      if (violation.severity === 'critical') {
        criticalViolations++;
      } else {
        warningViolations++;
      }
    });
    
    console.log(`\n📈 Summary: ${criticalViolations} critical, ${warningViolations} warnings`);
    
    // Swiss government compliance status
    if (criticalViolations > 0) {
      console.log('\n🇨🇭 Swiss Government Compliance: ❌ FAILED');
      console.log('   Emergency services require ≤500KB total, ≤200KB JavaScript');
      console.log('   Action required before deployment to municipal portals');
    } else if (warningViolations > 0) {
      console.log('\n🇨🇭 Swiss Government Compliance: ⚠️ WARNINGS');
      console.log('   Core requirements met, but optimization recommended');
    }
  } else {
    console.log('\n✅ All Performance Budgets Within Limits!');
    console.log('\n🇨🇭 Swiss Government Compliance: ✅ PASSED');
    console.log('   All municipal portals ready for deployment');
  }
  
  // Component analysis
  console.log('\n🧩 Component Performance Impact:');
  console.log('-'.repeat(60));
  
  const componentAnalysis = analyzeComponentImpact(sizes);
  if (componentAnalysis.length > 0) {
    componentAnalysis.forEach(component => {
      console.log(`• ${component.name}: ${component.impact}`);
    });
  } else {
    console.log('• Component analysis not available (requires individual component builds)');
  }
  
  console.log('\n' + '='.repeat(60));
}

/**
 * Analyze component performance impact
 */
function analyzeComponentImpact(sizes) {
  // This would be enhanced with actual component bundle analysis
  // For now, provide general guidance based on file patterns
  const analysis = [];
  
  // Analyze JavaScript files for component patterns
  if (sizes.javascript.fileList.length > 0) {
    const largeJSFiles = sizes.javascript.fileList
      .filter(file => file.size > 50000) // >50KB
      .sort((a, b) => b.size - a.size);
      
    if (largeJSFiles.length > 0) {
      analysis.push({
        name: 'Large JavaScript Components',
        impact: `${largeJSFiles.length} files >50KB (consider code splitting)`
      });
    }
  }
  
  // Analyze CSS files for component styling
  if (sizes.stylesheet.fileList.length > 0) {
    const largeCSSFiles = sizes.stylesheet.fileList
      .filter(file => file.size > 20000) // >20KB
      .sort((a, b) => b.size - a.size);
      
    if (largeCSSFiles.length > 0) {
      analysis.push({
        name: 'Large CSS Components', 
        impact: `${largeCSSFiles.length} files >20KB (consider CSS purging)`
      });
    }
  }
  
  return analysis;
}

/**
 * Save performance data for CI reporting
 */
function savePerformanceData(sizes, violations) {
  const reportData = {
    timestamp: new Date().toISOString(),
    commit: process.env.GITHUB_SHA || 'local',
    branch: process.env.GITHUB_REF_NAME || 'local',
    budgets: PERFORMANCE_BUDGETS,
    sizes,
    violations,
    compliance: {
      swissGovernment: violations.filter(v => v.severity === 'critical').length === 0,
      emergencyServices: sizes.total.size <= PERFORMANCE_BUDGETS.total,
      criticalPath: sizes.javascript.size <= PERFORMANCE_BUDGETS.javascript
    }
  };
  
  // Ensure reports directory exists
  const reportsDir = path.join(__dirname, '../test-results/performance');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  // Save detailed report
  const reportPath = path.join(reportsDir, 'budget-analysis.json');
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  
  console.log(`\n💾 Performance data saved to: ${path.relative(process.cwd(), reportPath)}`);
  
  return reportData;
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Starting Performance Budget Validation - Phase 3.2');
  
  const distDir = path.join(__dirname, '../dist');
  
  // Check if build directory exists
  if (!fs.existsSync(distDir)) {
    console.error('❌ Error: Build directory not found. Run "npm run build-lib" first.');
    process.exit(1);
  }
  
  try {
    // Calculate bundle sizes
    const sizes = calculateBundleSizes(distDir);
    
    // Check for violations
    const violations = checkBudgetViolations(sizes);
    
    // Generate report
    generatePerformanceReport(sizes, violations);
    
    // Save data for CI
    const reportData = savePerformanceData(sizes, violations);
    
    // Exit with appropriate code
    const criticalViolations = violations.filter(v => v.severity === 'critical').length;
    
    if (criticalViolations > 0) {
      console.error(`\n❌ Performance budget validation failed: ${criticalViolations} critical violations`);
      process.exit(1);
    } else if (violations.length > 0) {
      console.warn(`\n⚠️  Performance budget validation passed with warnings: ${violations.length} total`);
      process.exit(0);
    } else {
      console.log('\n✅ Performance budget validation passed: All budgets within limits');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('❌ Error during performance budget validation:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  calculateBundleSizes,
  checkBudgetViolations,
  generatePerformanceReport,
  PERFORMANCE_BUDGETS
};