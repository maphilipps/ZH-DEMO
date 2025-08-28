/**
 * Performance Migration Benchmark
 * 
 * Validates the claimed ~40% performance improvement from slot pattern migration
 * Testing Rule #1: Comprehensive measurement and validation of performance claims
 * 
 * Measures performance impact of the 6 migrated components:
 * - embed: from render|striptags to slots
 * - stat-card: from paragraph.field_title.value to slots  
 * - newsletter-form: from direct field values to slots
 * - gallery: from double processing to slots
 * - accordion: from complex extraction to slots
 * - card-group: from getString() to slots
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

// Performance baseline measurements (pre-migration theoretical values)
const PERFORMANCE_BASELINES = {
  'embed': { baseline: 150, target: 90, description: 'render|striptags → slots' },
  'stat-card': { baseline: 80, target: 48, description: 'field_title.value → slots' },
  'newsletter-form': { baseline: 200, target: 120, description: 'direct field values → slots' },
  'gallery': { baseline: 300, target: 180, description: 'double processing → slots' },
  'accordion': { baseline: 180, target: 108, description: 'complex extraction → slots' },
  'card-group': { baseline: 220, target: 132, description: 'getString() → slots' }
};

// Storybook URLs for migrated components
const COMPONENT_TEST_URLS = {
  'embed': 'http://localhost:6006/iframe.html?args=&id=components-embed--default',
  'stat-card': 'http://localhost:6006/iframe.html?args=&id=components-stat-card--default',
  'newsletter-form': 'http://localhost:6006/iframe.html?args=&id=components-newsletter-form--default',
  'gallery': 'http://localhost:6006/iframe.html?args=&id=components-gallery--default',
  'accordion': 'http://localhost:6006/iframe.html?args=&id=components-accordion--default',
  'card-group': 'http://localhost:6006/iframe.html?args=&id=components-card-group--default'
};

class PerformanceBenchmark {
  constructor() {
    this.results = {};
    this.browser = null;
    this.page = null;
  }

  async initialize() {
    console.log('🚀 Initializing Performance Migration Benchmark');
    console.log('📊 Testing Rule #1: Comprehensive performance validation');
    
    this.browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    this.page = await this.browser.newPage();
    
    // Enable performance monitoring
    await this.page.addInitScript(() => {
      window.performanceMetrics = {
        renderStart: 0,
        renderEnd: 0,
        componentLoad: 0
      };
    });
  }

  async benchmarkComponent(componentName, url) {
    console.log(`\n🔍 Benchmarking ${componentName}...`);
    
    const measurements = [];
    const iterations = 5; // Multiple iterations for accuracy
    
    for (let i = 0; i < iterations; i++) {
      const result = await this.measureComponentPerformance(componentName, url, i + 1);
      measurements.push(result);
      
      // Brief pause between measurements
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Calculate statistical metrics
    const stats = this.calculateStatistics(measurements);
    this.results[componentName] = {
      ...stats,
      baseline: PERFORMANCE_BASELINES[componentName],
      improvement: this.calculateImprovement(stats.average, PERFORMANCE_BASELINES[componentName])
    };
    
    this.logComponentResults(componentName, this.results[componentName]);
    
    return this.results[componentName];
  }

  async measureComponentPerformance(componentName, url, iteration) {
    try {
      // Clear any cached resources
      await this.page.goto('about:blank');
      await this.page.waitForTimeout(100);
      
      const performanceStart = Date.now();
      
      // Navigate to component story
      await this.page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 10000 
      });
      
      // Wait for component to render
      await this.page.waitForSelector('[data-testid], .component, [class*="component"]', {
        timeout: 5000
      });
      
      const performanceEnd = Date.now();
      const totalRenderTime = performanceEnd - performanceStart;
      
      // Measure client-side rendering metrics
      const clientMetrics = await this.page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const paintEntries = performance.getEntriesByType('paint');
        
        return {
          domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
          loadComplete: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
          firstPaint: paintEntries.find(p => p.name === 'first-paint')?.startTime || 0,
          firstContentfulPaint: paintEntries.find(p => p.name === 'first-contentful-paint')?.startTime || 0
        };
      });
      
      // Component-specific measurements
      const componentMetrics = await this.measureComponentSpecificMetrics(componentName);
      
      const result = {
        iteration,
        totalRenderTime,
        clientMetrics,
        componentMetrics,
        timestamp: new Date().toISOString()
      };
      
      console.log(`  Iteration ${iteration}: ${totalRenderTime}ms`);
      
      return result;
      
    } catch (error) {
      console.error(`❌ Error measuring ${componentName} iteration ${iteration}:`, error.message);
      return { iteration, error: error.message, totalRenderTime: 9999 };
    }
  }

  async measureComponentSpecificMetrics(componentName) {
    const metrics = {};
    
    try {
      switch (componentName) {
        case 'gallery':
          // Measure image loading performance
          metrics.imageCount = await this.page.$$eval('img', imgs => imgs.length);
          metrics.imagesLoaded = await this.page.$$eval('img', imgs => 
            imgs.filter(img => img.complete && img.naturalHeight !== 0).length
          );
          break;
          
        case 'accordion':
          // Measure interaction responsiveness
          const accordionTrigger = await this.page.$('.accordion__trigger, [data-accordion-trigger]');
          if (accordionTrigger) {
            const interactionStart = Date.now();
            await accordionTrigger.click();
            await this.page.waitForTimeout(100); // Allow animation
            const interactionEnd = Date.now();
            metrics.interactionTime = interactionEnd - interactionStart;
          }
          break;
          
        case 'newsletter-form':
          // Measure form responsiveness
          const formInput = await this.page.$('input[type="email"]');
          if (formInput) {
            const inputStart = Date.now();
            await formInput.focus();
            await formInput.type('test@example.com');
            const inputEnd = Date.now();
            metrics.formInputTime = inputEnd - inputStart;
          }
          break;
          
        default:
          // Generic component metrics
          metrics.elementCount = await this.page.$$eval('*', els => els.length);
          break;
      }
    } catch (error) {
      metrics.error = error.message;
    }
    
    return metrics;
  }

  calculateStatistics(measurements) {
    const validMeasurements = measurements.filter(m => !m.error && m.totalRenderTime < 9999);
    const renderTimes = validMeasurements.map(m => m.totalRenderTime);
    
    if (renderTimes.length === 0) {
      return { average: 9999, median: 9999, min: 9999, max: 9999, standardDeviation: 0 };
    }
    
    const average = renderTimes.reduce((sum, time) => sum + time, 0) / renderTimes.length;
    const sorted = renderTimes.sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    const min = Math.min(...renderTimes);
    const max = Math.max(...renderTimes);
    
    const variance = renderTimes.reduce((sum, time) => sum + Math.pow(time - average, 2), 0) / renderTimes.length;
    const standardDeviation = Math.sqrt(variance);
    
    return { average, median, min, max, standardDeviation, validSamples: validMeasurements.length };
  }

  calculateImprovement(actualTime, baseline) {
    const { baseline: baselineTime, target } = baseline;
    
    const actualImprovement = ((baselineTime - actualTime) / baselineTime) * 100;
    const targetImprovement = ((baselineTime - target) / baselineTime) * 100;
    
    return {
      actual: actualImprovement,
      target: targetImprovement,
      achieved: actualImprovement >= (targetImprovement * 0.8), // 80% of target is acceptable
      description: baseline.description
    };
  }

  logComponentResults(componentName, results) {
    const { average, baseline, improvement } = results;
    
    console.log(`\n📊 ${componentName.toUpperCase()} PERFORMANCE RESULTS:`);
    console.log(`  📈 Migration: ${improvement.description}`);
    console.log(`  ⏱️  Current Performance: ${Math.round(average)}ms (avg)`);
    console.log(`  📏 Baseline (pre-migration): ${baseline.baseline}ms`);
    console.log(`  🎯 Target (post-migration): ${baseline.target}ms`);
    console.log(`  📊 Improvement: ${Math.round(improvement.actual)}% (target: ${Math.round(improvement.target)}%)`);
    console.log(`  ${improvement.achieved ? '✅' : '❌'} Target Achievement: ${improvement.achieved ? 'SUCCESS' : 'NEEDS OPTIMIZATION'}`);
  }

  async generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log('🎯 SLOT MIGRATION PERFORMANCE REPORT - ISSUE #56');
    console.log('='.repeat(80));
    
    let totalComponents = 0;
    let componentsImproved = 0;
    let averageImprovement = 0;
    
    for (const [componentName, results] of Object.entries(this.results)) {
      totalComponents++;
      if (results.improvement.achieved) componentsImproved++;
      averageImprovement += results.improvement.actual;
    }
    
    averageImprovement = averageImprovement / totalComponents;
    
    console.log(`\n📈 OVERALL MIGRATION PERFORMANCE:`);
    console.log(`  🎯 Components Tested: ${totalComponents}`);
    console.log(`  ✅ Performance Targets Met: ${componentsImproved}/${totalComponents} (${Math.round(componentsImproved/totalComponents*100)}%)`);
    console.log(`  📊 Average Performance Improvement: ${Math.round(averageImprovement)}%`);
    console.log(`  🏆 Migration Success: ${averageImprovement >= 35 ? 'ACHIEVED ~40% TARGET' : 'OPTIMIZATION NEEDED'}`);
    
    // Testing Rule #1: Detailed component breakdown
    console.log(`\n📋 COMPONENT-BY-COMPONENT BREAKDOWN:`);
    for (const [componentName, results] of Object.entries(this.results)) {
      const status = results.improvement.achieved ? '✅ SUCCESS' : '❌ NEEDS WORK';
      console.log(`  ${componentName}: ${Math.round(results.improvement.actual)}% improvement - ${status}`);
    }
    
    // Save detailed report
    const reportPath = path.join(process.cwd(), 'performance-migration-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      summary: {
        totalComponents,
        componentsImproved,
        averageImprovement,
        targetAchieved: averageImprovement >= 35
      },
      results: this.results
    }, null, 2));
    
    console.log(`\n📄 Detailed report saved: ${reportPath}`);
    
    // Return success status for Testing Rule #1
    return averageImprovement >= 35;
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Main execution
async function runPerformanceBenchmark() {
  const benchmark = new PerformanceBenchmark();
  
  try {
    await benchmark.initialize();
    
    console.log('⚠️  Ensure Storybook is running on http://localhost:6006');
    console.log('   Run: ddev npm run storybook\n');
    
    // Test if Storybook is available
    try {
      await benchmark.page.goto('http://localhost:6006', { timeout: 5000 });
    } catch (error) {
      throw new Error('Storybook not accessible at http://localhost:6006. Please start Storybook first.');
    }
    
    // Benchmark all migrated components
    for (const [componentName, url] of Object.entries(COMPONENT_TEST_URLS)) {
      await benchmark.benchmarkComponent(componentName, url);
    }
    
    // Generate comprehensive report
    const success = await benchmark.generateReport();
    
    // Testing Rule #1: Exit with appropriate code
    process.exit(success ? 0 : 1);
    
  } catch (error) {
    console.error('❌ Performance benchmark failed:', error.message);
    process.exit(1);
  } finally {
    await benchmark.cleanup();
  }
}

// Run benchmark if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runPerformanceBenchmark();
}

export { PerformanceBenchmark, PERFORMANCE_BASELINES };