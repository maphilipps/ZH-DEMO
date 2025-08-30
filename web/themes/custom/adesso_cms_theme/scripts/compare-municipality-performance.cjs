#!/usr/bin/env node

/**
 * Municipality Performance Comparison Script - Phase 3.2
 * 
 * Compares performance across Thalwil, Thalheim, and Erlenbach municipality themes
 * ensuring consistent Swiss government compliance across all municipal portals.
 * 
 * Requirements:
 * - Performance equity: <5% variance across municipalities
 * - All municipalities must meet >90% Lighthouse scores
 * - Consistent Core Web Vitals across themes
 * - Accessibility compliance across all municipal branding
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Municipality configurations
const MUNICIPALITIES = {
  thalwil: {
    name: 'Thalwil',
    description: 'Modern lakeside community',
    primaryColor: '#3B82F6', // Blue
    components: ['hero--thalwil', 'site-header--thalwil', 'button--thalwil']
  },
  thalheim: {
    name: 'Thalheim',
    description: 'Traditional wine region',
    primaryColor: '#10B981', // Green  
    components: ['hero--thalheim', 'site-header--thalheim', 'button--thalheim']
  },
  erlenbach: {
    name: 'Erlenbach',
    description: 'Upscale Goldküste location',
    primaryColor: '#06B6D4', // Turquoise
    components: ['hero--erlenbach', 'site-header--erlenbach', 'button--erlenbach']
  }
};

// Performance equity thresholds
const EQUITY_THRESHOLDS = {
  maxVariancePercentage: 5,    // Max 5% performance variance
  minPerformanceScore: 90,     // Minimum 90% Lighthouse score
  minAccessibilityScore: 90,   // Minimum 90% accessibility score
  maxLoadTimeVariance: 500     // Max 500ms load time variance
};

/**
 * Test individual municipality component performance
 */
async function testMunicipalityPerformance(municipalityKey, municipality) {
  console.log(`\n🏛️ Testing ${municipality.name} (${municipality.description})`);
  console.log('-'.repeat(60));
  
  const results = {
    municipality: municipalityKey,
    name: municipality.name,
    components: [],
    averagePerformance: 0,
    averageAccessibility: 0,
    totalComponents: 0
  };
  
  for (const component of municipality.components) {
    const url = `http://localhost:6006/iframe.html?id=${component}`;
    
    try {
      console.log(`📊 Testing component: ${component}`);
      
      // Run Lighthouse on component
      const lighthouseCmd = [
        'npx lighthouse',
        `"${url}"`,
        '--output=json',
        '--quiet',
        '--chrome-flags="--headless --no-sandbox"',
        '--preset=desktop',
        '--only-categories=performance,accessibility'
      ].join(' ');
      
      const lighthouseResult = execSync(lighthouseCmd, { 
        encoding: 'utf8',
        timeout: 60000
      });
      
      const report = JSON.parse(lighthouseResult);
      const performanceScore = Math.round(report.categories.performance.score * 100);
      const accessibilityScore = Math.round(report.categories.accessibility.score * 100);
      const lcp = report.audits['largest-contentful-paint'].numericValue;
      const cls = report.audits['cumulative-layout-shift'].numericValue;
      
      const componentResult = {
        component,
        performance: performanceScore,
        accessibility: accessibilityScore,
        lcp: Math.round(lcp),
        cls: Math.round(cls * 1000) / 1000, // 3 decimal places
        meetsStandards: performanceScore >= EQUITY_THRESHOLDS.minPerformanceScore && 
                        accessibilityScore >= EQUITY_THRESHOLDS.minAccessibilityScore
      };
      
      results.components.push(componentResult);
      
      console.log(`   📈 Performance: ${performanceScore}%`);
      console.log(`   ♿ Accessibility: ${accessibilityScore}%`);
      console.log(`   🎯 LCP: ${Math.round(lcp)}ms`);
      console.log(`   📐 CLS: ${cls}`);
      console.log(`   ✅ Standards: ${componentResult.meetsStandards ? 'PASSED' : 'FAILED'}`);
      
    } catch (error) {
      console.warn(`   ⚠️  Failed to test ${component}: ${error.message}`);
      
      results.components.push({
        component,
        performance: 0,
        accessibility: 0,
        lcp: 0,
        cls: 0,
        meetsStandards: false,
        error: error.message
      });
    }
  }
  
  // Calculate averages
  const validComponents = results.components.filter(c => !c.error);
  if (validComponents.length > 0) {
    results.averagePerformance = Math.round(
      validComponents.reduce((sum, c) => sum + c.performance, 0) / validComponents.length
    );
    results.averageAccessibility = Math.round(
      validComponents.reduce((sum, c) => sum + c.accessibility, 0) / validComponents.length
    );
    results.totalComponents = validComponents.length;
  }
  
  console.log(`\n📊 ${municipality.name} Summary:`);
  console.log(`   📈 Average Performance: ${results.averagePerformance}%`);
  console.log(`   ♿ Average Accessibility: ${results.averageAccessibility}%`);
  console.log(`   📄 Components Tested: ${results.totalComponents}`);
  
  return results;
}

/**
 * Analyze performance equity across municipalities
 */
function analyzePerformanceEquity(municipalityResults) {
  console.log('\n🔍 Performance Equity Analysis');
  console.log('='.repeat(60));
  
  const performanceScores = municipalityResults.map(r => r.averagePerformance);
  const accessibilityScores = municipalityResults.map(r => r.averageAccessibility);
  
  const performanceMin = Math.min(...performanceScores);
  const performanceMax = Math.max(...performanceScores);
  const performanceVariance = ((performanceMax - performanceMin) / performanceMin) * 100;
  
  const accessibilityMin = Math.min(...accessibilityScores);
  const accessibilityMax = Math.max(...accessibilityScores);
  const accessibilityVariance = ((accessibilityMax - accessibilityMin) / accessibilityMin) * 100;
  
  console.log(`📊 Performance Score Range: ${performanceMin}% - ${performanceMax}%`);
  console.log(`📊 Performance Variance: ${Math.round(performanceVariance * 10) / 10}%`);
  console.log(`♿ Accessibility Range: ${accessibilityMin}% - ${accessibilityMax}%`);
  console.log(`♿ Accessibility Variance: ${Math.round(accessibilityVariance * 10) / 10}%`);
  
  // Check equity compliance
  const equityResults = {
    performanceEquity: performanceVariance <= EQUITY_THRESHOLDS.maxVariancePercentage,
    accessibilityEquity: accessibilityVariance <= EQUITY_THRESHOLDS.maxVariancePercentage,
    allMeetMinimum: municipalityResults.every(r => 
      r.averagePerformance >= EQUITY_THRESHOLDS.minPerformanceScore &&
      r.averageAccessibility >= EQUITY_THRESHOLDS.minAccessibilityScore
    ),
    performanceVariance,
    accessibilityVariance
  };
  
  console.log(`\n🎯 Equity Compliance:`);
  console.log(`   Performance Equity (<${EQUITY_THRESHOLDS.maxVariancePercentage}%): ${equityResults.performanceEquity ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`   Accessibility Equity (<${EQUITY_THRESHOLDS.maxVariancePercentage}%): ${equityResults.accessibilityEquity ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`   Minimum Standards (≥${EQUITY_THRESHOLDS.minPerformanceScore}%): ${equityResults.allMeetMinimum ? '✅ PASSED' : '❌ FAILED'}`);
  
  return equityResults;
}

/**
 * Generate detailed comparison report
 */
function generateComparisonReport(municipalityResults, equityResults) {
  const timestamp = new Date().toISOString();
  const reportData = {
    timestamp,
    commit: process.env.GITHUB_SHA || 'local',
    branch: process.env.GITHUB_REF_NAME || 'local',
    municipalities: municipalityResults,
    equity: equityResults,
    thresholds: EQUITY_THRESHOLDS,
    summary: {
      totalMunicipalities: municipalityResults.length,
      totalComponents: municipalityResults.reduce((sum, r) => sum + r.totalComponents, 0),
      overallCompliance: equityResults.performanceEquity && 
                        equityResults.accessibilityEquity && 
                        equityResults.allMeetMinimum
    }
  };
  
  // Save detailed report
  const reportsDir = path.join(__dirname, '../test-results/performance');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  const reportPath = path.join(reportsDir, 'municipality-comparison.json');
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  
  // Generate markdown report
  const markdownReport = generateMarkdownReport(reportData);
  const markdownPath = path.join(reportsDir, 'municipality-comparison.md');
  fs.writeFileSync(markdownPath, markdownReport);
  
  console.log(`\n💾 Reports saved:`);
  console.log(`   📊 JSON: ${path.relative(process.cwd(), reportPath)}`);
  console.log(`   📝 Markdown: ${path.relative(process.cwd(), markdownPath)}`);
  
  return reportData;
}

/**
 * Generate markdown report
 */
function generateMarkdownReport(data) {
  return `# Municipality Performance Comparison Report

**Generated**: ${new Date(data.timestamp).toLocaleString()}  
**Branch**: ${data.branch}  
**Commit**: ${data.commit}

## 🏛️ Municipality Performance Summary

| Municipality | Avg Performance | Avg Accessibility | Components | Status |
|--------------|----------------|-------------------|------------|--------|
${data.municipalities.map(m => 
  `| **${m.name}** | ${m.averagePerformance}% | ${m.averageAccessibility}% | ${m.totalComponents} | ${
    m.averagePerformance >= data.thresholds.minPerformanceScore && 
    m.averageAccessibility >= data.thresholds.minAccessibilityScore ? '✅' : '❌'
  } |`
).join('\n')}

## 📊 Performance Equity Analysis

- **Performance Variance**: ${data.equity.performanceVariance.toFixed(1)}% ${data.equity.performanceEquity ? '✅' : '❌'}
- **Accessibility Variance**: ${data.equity.accessibilityVariance.toFixed(1)}% ${data.equity.accessibilityEquity ? '✅' : '❌'}
- **Minimum Standards**: ${data.equity.allMeetMinimum ? '✅ All municipalities meet requirements' : '❌ Some municipalities below threshold'}

## 🎯 Swiss Government Compliance

${data.summary.overallCompliance ? 
  '✅ **COMPLIANT** - All municipalities meet Swiss government performance and equity requirements.' :
  '❌ **NON-COMPLIANT** - Performance or equity requirements not met.'
}

### Requirements
- Minimum Performance Score: ≥${data.thresholds.minPerformanceScore}%
- Minimum Accessibility Score: ≥${data.thresholds.minAccessibilityScore}%
- Maximum Performance Variance: <${data.thresholds.maxVariancePercentage}%

## 📈 Detailed Results

${data.municipalities.map(m => `
### ${m.name} Municipality

${m.components.map(c => `
#### ${c.component}
- **Performance**: ${c.performance}%
- **Accessibility**: ${c.accessibility}%
- **LCP**: ${c.lcp}ms
- **CLS**: ${c.cls}
- **Standards**: ${c.meetsStandards ? '✅ PASSED' : '❌ FAILED'}
${c.error ? `- **Error**: ${c.error}` : ''}
`).join('')}
`).join('')}

---
*Report generated by Municipality Performance Comparison - Phase 3.2*
`;
}

/**
 * Check if Storybook server is running
 */
function checkStorybookServer() {
  try {
    execSync('curl -s http://localhost:6006 > /dev/null', { timeout: 5000 });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Municipality Performance Comparison - Phase 3.2');
  console.log('='.repeat(60));
  
  // Check if Storybook is running
  if (!checkStorybookServer()) {
    console.error('❌ Error: Storybook server not running on http://localhost:6006');
    console.log('💡 Start Storybook with: npm run dev-storybook');
    process.exit(1);
  }
  
  console.log('✅ Storybook server detected');
  
  try {
    const municipalityResults = [];
    
    // Test each municipality
    for (const [key, municipality] of Object.entries(MUNICIPALITIES)) {
      const result = await testMunicipalityPerformance(key, municipality);
      municipalityResults.push(result);
    }
    
    // Analyze equity
    const equityResults = analyzePerformanceEquity(municipalityResults);
    
    // Generate reports
    const reportData = generateComparisonReport(municipalityResults, equityResults);
    
    // Final compliance check
    if (reportData.summary.overallCompliance) {
      console.log('\n✅ SUCCESS: All municipalities meet Swiss government requirements');
      process.exit(0);
    } else {
      console.error('\n❌ FAILURE: Swiss government compliance requirements not met');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n❌ Error during municipality comparison:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  testMunicipalityPerformance,
  analyzePerformanceEquity,
  generateComparisonReport,
  MUNICIPALITIES,
  EQUITY_THRESHOLDS
};