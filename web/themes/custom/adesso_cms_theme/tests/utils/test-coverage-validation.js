/**
 * @file Test Coverage Reports and Validation System - Phase 2.3
 * 
 * Comprehensive test coverage analysis and validation system for Swiss municipality portal
 * components, ensuring complete testing across all quality dimensions.
 * 
 * This module provides:
 * - Component test coverage analysis (>90% target)
 * - Swiss compliance validation coverage
 * - Accessibility test coverage verification
 * - Municipality theme coverage analysis
 * - Performance test coverage tracking
 * - Test quality metrics and reporting
 * - Coverage gap identification and remediation guidance
 */

import fs from 'fs/promises';
import path from 'path';

// Test coverage thresholds for Swiss municipality portal requirements
export const COVERAGE_THRESHOLDS = {
  // Overall coverage targets
  overall: {
    minimum: 90,        // Swiss government requirement: 90% minimum
    target: 95,         // Internal target for excellence
    critical: 100       // Critical path components must have 100%
  },
  
  // Dimension-specific coverage requirements
  dimensions: {
    functionality: {
      minimum: 95,      // Basic functionality testing
      target: 98
    },
    accessibility: {
      minimum: 100,     // eCH-0059 requires 100% accessibility coverage
      target: 100
    },
    swissCompliance: {
      minimum: 100,     // Government standards require 100% coverage
      target: 100
    },
    municipalityThemes: {
      minimum: 90,      // All three municipalities must be tested
      target: 100
    },
    performance: {
      minimum: 85,      // Core Web Vitals and performance metrics
      target: 90
    },
    crossBrowser: {
      minimum: 80,      // Multi-browser compatibility
      target: 90
    },
    responsive: {
      minimum: 90,      // Mobile, tablet, desktop testing
      target: 95
    }
  },
  
  // Component category requirements
  componentCategories: {
    critical: {         // site-header, navigation, forms
      minimum: 100,
      dimensions: ['functionality', 'accessibility', 'swissCompliance']
    },
    important: {        // cards, hero, buttons
      minimum: 95,
      dimensions: ['functionality', 'accessibility', 'performance']
    },
    standard: {         // text, badges, logos
      minimum: 90,
      dimensions: ['functionality', 'accessibility']
    }
  }
};

// Component categorization for coverage analysis
export const COMPONENT_CATEGORIES = {
  critical: [
    'site-header', 'main-menu', 'newsletter-form', 'mobile-menu',
    'site-footer', 'page', 'region'
  ],
  important: [
    'hero', 'card', 'button', 'carousel', 'gallery', 'accordion',
    'page-header', 'filter', 'pager', 'recent-cards'
  ],
  standard: [
    'text', 'badge', 'heading', 'logo', 'status-badge', 'embed',
    'media', 'stat-card', 'section-header', 'block-reference'
  ],
  specialized: [
    'newsletter-form', 'file-upload-preview', 'form-progress',
    'damage-report-card', 'pricing', 'bento-grid', 'quick-action-buttons'
  ]
};

/**
 * Comprehensive Test Coverage Analyzer
 */
export class TestCoverageAnalyzer {
  constructor(options = {}) {
    this.options = {
      baseDirectory: options.baseDirectory || './components',
      testPattern: options.testPattern || '*.test.js',
      outputDirectory: options.outputDirectory || './test-results/coverage',
      includeVisualTests: options.includeVisualTests || true,
      includeE2ETests: options.includeE2ETests || true,
      verbose: options.verbose || false,
      ...options
    };
    
    this.coverageData = {
      timestamp: new Date().toISOString(),
      summary: {
        totalComponents: 0,
        testedComponents: 0,
        overallCoverage: 0,
        passedThreshold: false
      },
      components: {},
      dimensions: {},
      categories: {},
      gaps: [],
      recommendations: []
    };
  }

  /**
   * Run comprehensive test coverage analysis
   * @returns {Object} Complete coverage analysis results
   */
  async runComprehensiveCoverageAnalysis() {
    console.log('Starting comprehensive test coverage analysis...');
    
    // Step 1: Discover all components
    await this.discoverComponents();
    
    // Step 2: Analyze test files and coverage
    await this.analyzeTestFiles();
    
    // Step 3: Assess coverage by dimensions
    await this.assessCoverageDimensions();
    
    // Step 4: Analyze component categories
    await this.analyzeComponentCategories();
    
    // Step 5: Identify coverage gaps
    await this.identifyCoverageGaps();
    
    // Step 6: Generate recommendations
    await this.generateRecommendations();
    
    // Step 7: Calculate overall metrics
    await this.calculateOverallMetrics();
    
    // Step 8: Generate reports
    await this.generateCoverageReports();
    
    console.log(`Coverage analysis complete. Overall coverage: ${this.coverageData.summary.overallCoverage}%`);
    
    return this.coverageData;
  }

  /**
   * Discover all SDC components in the project
   */
  async discoverComponents() {
    console.log('Discovering components...');
    
    try {
      const componentDirs = await fs.readdir(this.options.baseDirectory);
      const components = [];

      for (const dir of componentDirs) {
        const dirPath = path.join(this.options.baseDirectory, dir);
        
        try {
          const stat = await fs.stat(dirPath);
          
          if (stat.isDirectory() && !dir.startsWith('.') && !dir.startsWith('_')) {
            // Check for component definition file
            const componentYmlPath = path.join(dirPath, `${dir}.component.yml`);
            
            try {
              await fs.access(componentYmlPath);
              components.push({
                name: dir,
                path: dirPath,
                category: this.categorizeComponent(dir),
                hasDefinition: true
              });
            } catch {
              // Component directory without proper definition
              components.push({
                name: dir,
                path: dirPath,
                category: this.categorizeComponent(dir),
                hasDefinition: false
              });
            }
          }
        } catch (error) {
          if (this.options.verbose) {
            console.warn(`Error processing directory ${dir}:`, error.message);
          }
        }
      }

      this.coverageData.summary.totalComponents = components.length;
      
      // Initialize component coverage data
      for (const component of components) {
        this.coverageData.components[component.name] = {
          ...component,
          tests: {
            unit: { exists: false, coverage: 0 },
            integration: { exists: false, coverage: 0 },
            accessibility: { exists: false, coverage: 0 },
            performance: { exists: false, coverage: 0 },
            visual: { exists: false, coverage: 0 },
            e2e: { exists: false, coverage: 0 },
            swissCompliance: { exists: false, coverage: 0 },
            municipalityThemes: { exists: false, coverage: 0 }
          },
          overallCoverage: 0,
          meetsThreshold: false,
          criticalGaps: []
        };
      }
      
      console.log(`Discovered ${components.length} components`);
    } catch (error) {
      console.error('Error discovering components:', error);
      throw error;
    }
  }

  /**
   * Analyze test files and their coverage
   */
  async analyzeTestFiles() {
    console.log('Analyzing test files...');
    
    for (const [componentName, componentData] of Object.entries(this.coverageData.components)) {
      await this.analyzeComponentTests(componentName, componentData);
    }
  }

  /**
   * Analyze tests for a specific component
   */
  async analyzeComponentTests(componentName, componentData) {
    const componentPath = componentData.path;
    const testFilePath = path.join(componentPath, `${componentName}.test.js`);
    
    try {
      // Check for unit test file
      const testFileContent = await fs.readFile(testFilePath, 'utf8');
      componentData.tests.unit.exists = true;
      
      // Analyze test content for coverage dimensions
      await this.analyzeTestContent(componentName, testFileContent, componentData);
      
    } catch (error) {
      // No test file exists
      componentData.tests.unit.exists = false;
      
      if (this.options.verbose) {
        console.log(`No test file found for ${componentName}`);
      }
    }
    
    // Check for additional test files (stories, e2e, etc.)
    await this.checkAdditionalTestFiles(componentName, componentData);
  }

  /**
   * Analyze test file content for coverage dimensions
   */
  async analyzeTestContent(componentName, testContent, componentData) {
    const testDimensions = {
      accessibility: [
        'accessibility', 'a11y', 'testAccessibility', 'checkAccessibility',
        'accessibilityTest', 'wcag', 'aria', 'eCH-0059', 'screen reader'
      ],
      swissCompliance: [
        'swiss', 'compliance', 'eCH', 'government', 'testSwiss', 'validateECH',
        'switzerland', 'compliance', 'data protection', 'multilingual'
      ],
      municipalityThemes: [
        'municipality', 'thalwil', 'thalheim', 'erlenbach', 'theme',
        'testTheme', 'MunicipalityTheme', 'crossTheme', 'municipality-'
      ],
      performance: [
        'performance', 'core web vitals', 'lcp', 'fid', 'cls', 'render time',
        'testPerformance', 'measureRender', 'bundle size', 'optimization'
      ],
      visual: [
        'visual', 'screenshot', 'snapshot', 'toHaveScreenshot', 'visual regression',
        'backstop', 'playwright', 'toMatchSnapshot'
      ],
      responsive: [
        'responsive', 'viewport', 'mobile', 'tablet', 'desktop', 'breakpoint',
        'testResponsive', 'resize', 'media query'
      ]
    };

    // Calculate coverage for each dimension based on test content
    for (const [dimension, keywords] of Object.entries(testDimensions)) {
      const keywordMatches = keywords.filter(keyword => 
        testContent.toLowerCase().includes(keyword.toLowerCase())
      ).length;
      
      const coverageScore = Math.min(100, (keywordMatches / keywords.length) * 100);
      
      if (componentData.tests[dimension]) {
        componentData.tests[dimension].exists = keywordMatches > 0;
        componentData.tests[dimension].coverage = coverageScore;
      }
    }

    // Analyze test structure and completeness
    const testStructureAnalysis = this.analyzeTestStructure(testContent);
    componentData.tests.unit.coverage = testStructureAnalysis.completeness;
    
    // Integration tests (check for component interaction testing)
    const hasIntegrationTests = testContent.includes('integration') || 
                              testContent.includes('interaction') ||
                              testContent.includes('Alpine') ||
                              testContent.includes('Drupal');
    
    componentData.tests.integration.exists = hasIntegrationTests;
    componentData.tests.integration.coverage = hasIntegrationTests ? 75 : 0;
  }

  /**
   * Analyze test file structure and completeness
   */
  analyzeTestStructure(testContent) {
    const requiredTestPatterns = [
      /describe\s*\(.*rendering/i,           // Basic rendering tests
      /describe\s*\(.*accessibility/i,       // Accessibility tests
      /describe\s*\(.*interaction/i,         // Interaction tests
      /it\s*\(.*should.*render/i,           // Render assertions
      /it\s*\(.*should.*accessible/i,       // Accessibility assertions
      /expect\(.+\)\.toBeInTheDocument/i,   // DOM assertions
      /beforeEach|beforeAll/i,              // Test setup
      /afterEach|afterAll/i                 // Test cleanup
    ];
    
    const bestPracticePatterns = [
      /vi\.mock|mock/i,                     // Mocking
      /cleanup|cleanupDOM/i,                // Proper cleanup
      /test\s+.+\.test\.js/i,               // Test file naming
      /describe.*Edge Cases/i,              // Edge case testing
      /describe.*Performance/i,             // Performance testing
    ];

    const foundRequired = requiredTestPatterns.filter(pattern => 
      pattern.test(testContent)
    ).length;
    
    const foundBestPractices = bestPracticePatterns.filter(pattern =>
      pattern.test(testContent)  
    ).length;

    const completeness = ((foundRequired / requiredTestPatterns.length) * 80) + 
                        ((foundBestPractices / bestPracticePatterns.length) * 20);

    return {
      completeness: Math.round(completeness),
      requiredPatterns: foundRequired,
      bestPractices: foundBestPractices,
      totalRequired: requiredTestPatterns.length,
      totalBestPractices: bestPracticePatterns.length
    };
  }

  /**
   * Check for additional test files (stories, e2e tests, etc.)
   */
  async checkAdditionalTestFiles(componentName, componentData) {
    const componentPath = componentData.path;
    
    // Check for Storybook stories
    const storiesPath = path.join(componentPath, `${componentName}.stories.js`);
    try {
      await fs.access(storiesPath);
      componentData.tests.visual.exists = true;
      componentData.tests.visual.coverage = 60; // Base coverage for having stories
    } catch {
      componentData.tests.visual.exists = false;
    }
    
    // Check for E2E test references
    const e2eTestsPath = './tests/e2e';
    try {
      const e2eFiles = await fs.readdir(e2eTestsPath);
      const hasE2ETest = e2eFiles.some(file => file.includes(componentName));
      
      componentData.tests.e2e.exists = hasE2ETest;
      componentData.tests.e2e.coverage = hasE2ETest ? 70 : 0;
    } catch {
      componentData.tests.e2e.exists = false;
    }
  }

  /**
   * Assess coverage by testing dimensions
   */
  async assessCoverageDimensions() {
    console.log('Assessing coverage dimensions...');
    
    const dimensions = Object.keys(COVERAGE_THRESHOLDS.dimensions);
    
    for (const dimension of dimensions) {
      const dimensionCoverage = this.calculateDimensionCoverage(dimension);
      
      this.coverageData.dimensions[dimension] = {
        coverage: dimensionCoverage.averageCoverage,
        threshold: COVERAGE_THRESHOLDS.dimensions[dimension],
        meetsMinimum: dimensionCoverage.averageCoverage >= COVERAGE_THRESHOLDS.dimensions[dimension].minimum,
        meetsTarget: dimensionCoverage.averageCoverage >= COVERAGE_THRESHOLDS.dimensions[dimension].target,
        componentCount: dimensionCoverage.componentCount,
        testedComponents: dimensionCoverage.testedComponents,
        gaps: dimensionCoverage.gaps
      };
    }
  }

  /**
   * Calculate coverage for a specific dimension
   */
  calculateDimensionCoverage(dimension) {
    const components = Object.values(this.coverageData.components);
    let totalCoverage = 0;
    let testedComponents = 0;
    const gaps = [];

    for (const component of components) {
      const dimensionTest = component.tests[dimension];
      
      if (dimensionTest && dimensionTest.exists) {
        totalCoverage += dimensionTest.coverage;
        testedComponents++;
      } else {
        gaps.push({
          component: component.name,
          category: component.category,
          reason: `Missing ${dimension} tests`
        });
      }
    }

    return {
      averageCoverage: components.length > 0 ? Math.round(totalCoverage / components.length) : 0,
      componentCount: components.length,
      testedComponents,
      gaps
    };
  }

  /**
   * Analyze component categories for coverage compliance
   */
  async analyzeComponentCategories() {
    console.log('Analyzing component categories...');
    
    for (const [category, components] of Object.entries(COMPONENT_CATEGORIES)) {
      const categoryData = this.analyzeCategoryComponents(category, components);
      
      this.coverageData.categories[category] = {
        components: components,
        coverage: categoryData.averageCoverage,
        threshold: COVERAGE_THRESHOLDS.componentCategories[category] || COVERAGE_THRESHOLDS.componentCategories.standard,
        meetsRequirement: categoryData.meetsRequirement,
        componentCount: categoryData.componentCount,
        testedComponents: categoryData.testedComponents,
        criticalGaps: categoryData.criticalGaps
      };
    }
  }

  /**
   * Analyze components within a category
   */
  analyzeCategoryComponents(category, componentNames) {
    const categoryComponents = componentNames
      .map(name => this.coverageData.components[name])
      .filter(Boolean);
    
    if (categoryComponents.length === 0) {
      return {
        averageCoverage: 0,
        meetsRequirement: false,
        componentCount: 0,
        testedComponents: 0,
        criticalGaps: []
      };
    }

    // Calculate overall coverage for category components
    let totalCoverage = 0;
    let testedComponents = 0;
    const criticalGaps = [];

    for (const component of categoryComponents) {
      const componentCoverage = this.calculateComponentCoverage(component);
      component.overallCoverage = componentCoverage;
      
      totalCoverage += componentCoverage;
      
      if (componentCoverage > 0) {
        testedComponents++;
      }
      
      // Check for critical gaps based on category requirements
      const threshold = COVERAGE_THRESHOLDS.componentCategories[category] || 
                       COVERAGE_THRESHOLDS.componentCategories.standard;
      
      if (componentCoverage < threshold.minimum) {
        criticalGaps.push({
          component: component.name,
          currentCoverage: componentCoverage,
          requiredCoverage: threshold.minimum,
          gap: threshold.minimum - componentCoverage
        });
      }
    }

    const averageCoverage = Math.round(totalCoverage / categoryComponents.length);
    const threshold = COVERAGE_THRESHOLDS.componentCategories[category] || 
                     COVERAGE_THRESHOLDS.componentCategories.standard;

    return {
      averageCoverage,
      meetsRequirement: averageCoverage >= threshold.minimum,
      componentCount: categoryComponents.length,
      testedComponents,
      criticalGaps
    };
  }

  /**
   * Calculate overall coverage for a single component
   */
  calculateComponentCoverage(component) {
    const testTypes = Object.values(component.tests);
    let totalCoverage = 0;
    let weightedScore = 0;
    
    // Weight different test types based on importance
    const weights = {
      unit: 0.25,
      integration: 0.15,
      accessibility: 0.20,
      performance: 0.10,
      visual: 0.10,
      e2e: 0.10,
      swissCompliance: 0.15,
      municipalityThemes: 0.05
    };

    Object.entries(component.tests).forEach(([testType, testData]) => {
      const weight = weights[testType] || 0.1;
      const coverage = testData.exists ? testData.coverage : 0;
      
      totalCoverage += coverage * weight;
      weightedScore += weight;
    });

    return Math.round(totalCoverage / weightedScore);
  }

  /**
   * Identify critical coverage gaps
   */
  async identifyCoverageGaps() {
    console.log('Identifying coverage gaps...');
    
    const gaps = [];

    // Overall coverage gaps
    if (this.coverageData.summary.overallCoverage < COVERAGE_THRESHOLDS.overall.minimum) {
      gaps.push({
        type: 'overall',
        severity: 'critical',
        description: `Overall coverage ${this.coverageData.summary.overallCoverage}% below minimum ${COVERAGE_THRESHOLDS.overall.minimum}%`,
        impact: 'Swiss government compliance at risk'
      });
    }

    // Dimension-specific gaps
    Object.entries(this.coverageData.dimensions).forEach(([dimension, data]) => {
      if (!data.meetsMinimum) {
        gaps.push({
          type: 'dimension',
          dimension,
          severity: dimension === 'accessibility' || dimension === 'swissCompliance' ? 'critical' : 'high',
          description: `${dimension} coverage ${data.coverage}% below minimum ${data.threshold.minimum}%`,
          impact: dimension === 'accessibility' ? 'eCH-0059 compliance violation' : 'Quality standard not met',
          affectedComponents: data.gaps.length
        });
      }
    });

    // Component category gaps
    Object.entries(this.coverageData.categories).forEach(([category, data]) => {
      if (!data.meetsRequirement) {
        gaps.push({
          type: 'category',
          category,
          severity: category === 'critical' ? 'critical' : 'high',
          description: `${category} components coverage below requirements`,
          impact: `${data.criticalGaps.length} components need immediate attention`,
          criticalComponents: data.criticalGaps.map(gap => gap.component)
        });
      }
    });

    // Individual component gaps
    Object.entries(this.coverageData.components).forEach(([componentName, component]) => {
      if (component.category === 'critical' && component.overallCoverage < 100) {
        gaps.push({
          type: 'component',
          component: componentName,
          severity: 'critical',
          description: `Critical component ${componentName} has ${component.overallCoverage}% coverage (requires 100%)`,
          impact: 'Core functionality testing incomplete'
        });
      }
    });

    this.coverageData.gaps = gaps.sort((a, b) => {
      const severityOrder = { critical: 3, high: 2, medium: 1, low: 0 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    });
  }

  /**
   * Generate actionable recommendations
   */
  async generateRecommendations() {
    console.log('Generating recommendations...');
    
    const recommendations = [];

    // Overall recommendations
    if (this.coverageData.summary.overallCoverage < COVERAGE_THRESHOLDS.overall.target) {
      recommendations.push({
        priority: 'high',
        category: 'overall',
        title: 'Improve Overall Test Coverage',
        description: `Increase test coverage from ${this.coverageData.summary.overallCoverage}% to ${COVERAGE_THRESHOLDS.overall.target}%`,
        actions: [
          'Create test files for untested components',
          'Enhance existing tests with missing dimensions',
          'Focus on accessibility and Swiss compliance testing'
        ],
        estimatedEffort: 'high'
      });
    }

    // Dimension-specific recommendations
    Object.entries(this.coverageData.dimensions).forEach(([dimension, data]) => {
      if (!data.meetsTarget) {
        recommendations.push({
          priority: dimension === 'accessibility' || dimension === 'swissCompliance' ? 'critical' : 'medium',
          category: 'dimension',
          dimension,
          title: `Improve ${dimension} Testing`,
          description: `Increase ${dimension} coverage from ${data.coverage}% to ${data.threshold.target}%`,
          actions: this.getDimensionSpecificActions(dimension),
          affectedComponents: data.gaps.length,
          estimatedEffort: data.gaps.length > 10 ? 'high' : 'medium'
        });
      }
    });

    // Component-specific recommendations
    const highPriorityComponents = Object.entries(this.coverageData.components)
      .filter(([name, component]) => 
        component.category === 'critical' && component.overallCoverage < 90
      )
      .sort((a, b) => a[1].overallCoverage - b[1].overallCoverage)
      .slice(0, 5); // Top 5 most critical

    highPriorityComponents.forEach(([componentName, component]) => {
      recommendations.push({
        priority: 'critical',
        category: 'component',
        component: componentName,
        title: `Urgent: Complete ${componentName} Testing`,
        description: `Critical component has only ${component.overallCoverage}% coverage`,
        actions: [
          'Create comprehensive unit tests',
          'Add accessibility validation',
          'Implement Swiss compliance tests',
          'Test across all municipality themes'
        ],
        estimatedEffort: 'medium'
      });
    });

    this.coverageData.recommendations = recommendations;
  }

  /**
   * Get dimension-specific actionable recommendations
   */
  getDimensionSpecificActions(dimension) {
    const actionMap = {
      accessibility: [
        'Add @axe-core/playwright accessibility tests',
        'Test keyboard navigation',
        'Validate ARIA attributes',
        'Check color contrast ratios',
        'Test screen reader compatibility'
      ],
      swissCompliance: [
        'Implement eCH-0059 validation tests',
        'Add multi-language content tests',
        'Test Swiss data protection compliance',
        'Validate government form standards'
      ],
      municipalityThemes: [
        'Test component across all three municipalities',
        'Validate theme-specific styling',
        'Check brand consistency',
        'Test responsive behavior per theme'
      ],
      performance: [
        'Add Core Web Vitals measurements',
        'Test render time performance',
        'Validate bundle size budgets',
        'Check memory usage optimization'
      ],
      crossBrowser: [
        'Test in Chrome, Firefox, Safari',
        'Add mobile browser testing',
        'Validate cross-browser consistency',
        'Test edge cases in different browsers'
      ]
    };

    return actionMap[dimension] || [
      'Add comprehensive test coverage',
      'Review test requirements',
      'Implement missing test scenarios'
    ];
  }

  /**
   * Calculate overall coverage metrics
   */
  async calculateOverallMetrics() {
    const components = Object.values(this.coverageData.components);
    
    // Calculate tested components
    const testedComponents = components.filter(c => c.overallCoverage > 0).length;
    this.coverageData.summary.testedComponents = testedComponents;
    
    // Calculate overall coverage
    const totalCoverage = components.reduce((sum, c) => sum + c.overallCoverage, 0);
    this.coverageData.summary.overallCoverage = Math.round(totalCoverage / components.length);
    
    // Check if meets threshold
    this.coverageData.summary.passedThreshold = 
      this.coverageData.summary.overallCoverage >= COVERAGE_THRESHOLDS.overall.minimum;
    
    // Add detailed metrics
    this.coverageData.summary.detailedMetrics = {
      coverageDistribution: this.calculateCoverageDistribution(),
      dimensionSummary: this.calculateDimensionSummary(),
      categorySummary: this.calculateCategorySummary(),
      qualityScore: this.calculateQualityScore()
    };
  }

  /**
   * Calculate coverage distribution across components
   */
  calculateCoverageDistribution() {
    const components = Object.values(this.coverageData.components);
    const ranges = {
      excellent: 0,  // 90-100%
      good: 0,       // 70-89%
      fair: 0,       // 50-69%
      poor: 0,       // 1-49%
      none: 0        // 0%
    };

    components.forEach(component => {
      const coverage = component.overallCoverage;
      if (coverage >= 90) ranges.excellent++;
      else if (coverage >= 70) ranges.good++;
      else if (coverage >= 50) ranges.fair++;
      else if (coverage > 0) ranges.poor++;
      else ranges.none++;
    });

    return ranges;
  }

  /**
   * Calculate dimension summary statistics
   */
  calculateDimensionSummary() {
    const dimensions = Object.entries(this.coverageData.dimensions);
    
    return {
      totalDimensions: dimensions.length,
      passingMinimum: dimensions.filter(([_, d]) => d.meetsMinimum).length,
      passingTarget: dimensions.filter(([_, d]) => d.meetsTarget).length,
      averageCoverage: Math.round(
        dimensions.reduce((sum, [_, d]) => sum + d.coverage, 0) / dimensions.length
      )
    };
  }

  /**
   * Calculate category summary statistics
   */
  calculateCategorySummary() {
    const categories = Object.entries(this.coverageData.categories);
    
    return {
      totalCategories: categories.length,
      meetingRequirements: categories.filter(([_, c]) => c.meetsRequirement).length,
      criticalComponentsAtRisk: categories
        .filter(([name, _]) => name === 'critical')[0]?.[1]?.criticalGaps?.length || 0
    };
  }

  /**
   * Calculate overall quality score
   */
  calculateQualityScore() {
    const weights = {
      overallCoverage: 0.3,
      accessibilityCoverage: 0.25,
      swissComplianceCoverage: 0.2,
      criticalComponentsCoverage: 0.15,
      performanceCoverage: 0.1
    };

    let score = 0;
    score += (this.coverageData.summary.overallCoverage / 100) * weights.overallCoverage;
    score += (this.coverageData.dimensions.accessibility?.coverage || 0) / 100 * weights.accessibilityCoverage;
    score += (this.coverageData.dimensions.swissCompliance?.coverage || 0) / 100 * weights.swissComplianceCoverage;
    score += (this.coverageData.categories.critical?.coverage || 0) / 100 * weights.criticalComponentsCoverage;
    score += (this.coverageData.dimensions.performance?.coverage || 0) / 100 * weights.performanceCoverage;

    return Math.round(score * 100);
  }

  /**
   * Generate comprehensive coverage reports
   */
  async generateCoverageReports() {
    console.log('Generating coverage reports...');
    
    try {
      await fs.mkdir(this.options.outputDirectory, { recursive: true });
      
      // Generate JSON report
      await this.generateJSONReport();
      
      // Generate HTML report
      await this.generateHTMLReport();
      
      // Generate markdown summary
      await this.generateMarkdownSummary();
      
      // Generate component-specific reports
      await this.generateComponentReports();
      
      console.log(`Coverage reports generated in ${this.options.outputDirectory}`);
    } catch (error) {
      console.error('Error generating reports:', error);
    }
  }

  /**
   * Generate detailed JSON report
   */
  async generateJSONReport() {
    const reportPath = path.join(this.options.outputDirectory, 'coverage-report.json');
    
    const jsonReport = {
      ...this.coverageData,
      meta: {
        version: '2.3.0',
        generated: new Date().toISOString(),
        thresholds: COVERAGE_THRESHOLDS,
        componentCategories: COMPONENT_CATEGORIES
      }
    };
    
    await fs.writeFile(reportPath, JSON.stringify(jsonReport, null, 2));
  }

  /**
   * Generate HTML report
   */
  async generateHTMLReport() {
    const reportPath = path.join(this.options.outputDirectory, 'coverage-report.html');
    
    const html = this.generateHTMLReportContent();
    await fs.writeFile(reportPath, html);
  }

  /**
   * Generate HTML report content
   */
  generateHTMLReportContent() {
    const summary = this.coverageData.summary;
    const dimensions = this.coverageData.dimensions;
    const categories = this.coverageData.categories;
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Coverage Report - Swiss Municipality Portal</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { border-bottom: 2px solid #e0e0e0; padding-bottom: 20px; margin-bottom: 30px; }
        .metric { display: inline-block; margin: 10px 20px 10px 0; padding: 15px 20px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #007bff; }
        .metric.critical { border-left-color: #dc3545; background: #fff5f5; }
        .metric.warning { border-left-color: #ffc107; background: #fffbf0; }
        .metric.success { border-left-color: #28a745; background: #f0fff4; }
        .section { margin-bottom: 40px; }
        .section h2 { color: #333; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px; }
        .component-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px; }
        .component-card { padding: 20px; border: 1px solid #e0e0e0; border-radius: 6px; background: white; }
        .component-card h3 { margin-top: 0; color: #333; }
        .coverage-bar { width: 100%; height: 20px; background: #f0f0f0; border-radius: 10px; overflow: hidden; margin: 10px 0; }
        .coverage-fill { height: 100%; background: linear-gradient(90deg, #dc3545 0%, #ffc107 50%, #28a745 100%); border-radius: 10px; }
        .recommendations { background: #fff8e1; padding: 20px; border-radius: 6px; border-left: 4px solid #ff9800; }
        .gap-item { padding: 10px; margin: 5px 0; background: #ffebee; border-radius: 4px; border-left: 3px solid #f44336; }
        .timestamp { color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Test Coverage Report</h1>
            <p class="timestamp">Generated: ${new Date(this.coverageData.timestamp).toLocaleString()}</p>
            <p><strong>Swiss Municipality Portal - Component Testing Analysis</strong></p>
        </div>

        <div class="section">
            <h2>Overall Summary</h2>
            <div class="metric ${summary.passedThreshold ? 'success' : 'critical'}">
                <strong>Overall Coverage</strong><br>
                ${summary.overallCoverage}% (${summary.testedComponents}/${summary.totalComponents} components)
            </div>
            <div class="metric">
                <strong>Quality Score</strong><br>
                ${summary.detailedMetrics?.qualityScore || 0}%
            </div>
            <div class="metric ${this.coverageData.gaps.filter(g => g.severity === 'critical').length > 0 ? 'critical' : 'success'}">
                <strong>Critical Gaps</strong><br>
                ${this.coverageData.gaps.filter(g => g.severity === 'critical').length}
            </div>
        </div>

        <div class="section">
            <h2>Coverage by Dimension</h2>
            ${Object.entries(dimensions).map(([dim, data]) => `
                <div class="metric ${data.meetsMinimum ? (data.meetsTarget ? 'success' : 'warning') : 'critical'}">
                    <strong>${dim.charAt(0).toUpperCase() + dim.slice(1)}</strong><br>
                    ${data.coverage}% (${data.testedComponents}/${data.componentCount} components)<br>
                    <small>Target: ${data.threshold.target}%, Minimum: ${data.threshold.minimum}%</small>
                </div>
            `).join('')}
        </div>

        <div class="section">
            <h2>Component Categories</h2>
            ${Object.entries(categories).map(([cat, data]) => `
                <div class="metric ${data.meetsRequirement ? 'success' : 'critical'}">
                    <strong>${cat.charAt(0).toUpperCase() + cat.slice(1)} Components</strong><br>
                    ${data.coverage}% average coverage<br>
                    <small>${data.testedComponents}/${data.componentCount} components tested</small>
                </div>
            `).join('')}
        </div>

        ${this.coverageData.gaps.length > 0 ? `
        <div class="section">
            <h2>Critical Gaps</h2>
            ${this.coverageData.gaps.slice(0, 10).map(gap => `
                <div class="gap-item">
                    <strong>${gap.type}: ${gap.description}</strong><br>
                    <small>Impact: ${gap.impact}</small>
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${this.coverageData.recommendations.length > 0 ? `
        <div class="section">
            <h2>Recommendations</h2>
            <div class="recommendations">
                ${this.coverageData.recommendations.slice(0, 5).map(rec => `
                    <div style="margin-bottom: 15px;">
                        <strong>${rec.title}</strong> (${rec.priority} priority)<br>
                        ${rec.description}<br>
                        <small>Estimated effort: ${rec.estimatedEffort}</small>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
    </div>
</body>
</html>
    `.trim();
  }

  /**
   * Generate markdown summary report
   */
  async generateMarkdownSummary() {
    const reportPath = path.join(this.options.outputDirectory, 'coverage-summary.md');
    
    const markdown = `# Test Coverage Report - Swiss Municipality Portal

## Summary

- **Overall Coverage**: ${this.coverageData.summary.overallCoverage}%
- **Components Tested**: ${this.coverageData.summary.testedComponents}/${this.coverageData.summary.totalComponents}
- **Quality Score**: ${this.coverageData.summary.detailedMetrics?.qualityScore || 0}%
- **Status**: ${this.coverageData.summary.passedThreshold ? '✅ PASSED' : '❌ FAILED'}

## Coverage by Dimension

${Object.entries(this.coverageData.dimensions).map(([dim, data]) => 
`- **${dim}**: ${data.coverage}% ${data.meetsMinimum ? '✅' : '❌'} (${data.testedComponents}/${data.componentCount} components)`
).join('\n')}

## Critical Gaps

${this.coverageData.gaps.filter(g => g.severity === 'critical').map(gap => 
`- **${gap.type}**: ${gap.description}`
).join('\n')}

## Next Steps

${this.coverageData.recommendations.slice(0, 3).map(rec => 
`1. **${rec.title}** (${rec.priority} priority)
   - ${rec.description}
   - Effort: ${rec.estimatedEffort}
`
).join('\n')}

---
*Generated: ${new Date(this.coverageData.timestamp).toLocaleString()}*
`;
    
    await fs.writeFile(reportPath, markdown);
  }

  /**
   * Generate component-specific reports
   */
  async generateComponentReports() {
    const componentsPath = path.join(this.options.outputDirectory, 'components');
    await fs.mkdir(componentsPath, { recursive: true });
    
    // Generate report for each component with low coverage
    const lowCoverageComponents = Object.entries(this.coverageData.components)
      .filter(([_, component]) => component.overallCoverage < 80)
      .sort((a, b) => a[1].overallCoverage - b[1].overallCoverage);
    
    for (const [componentName, component] of lowCoverageComponents) {
      const reportContent = this.generateComponentReportContent(componentName, component);
      const reportPath = path.join(componentsPath, `${componentName}-coverage.md`);
      await fs.writeFile(reportPath, reportContent);
    }
  }

  /**
   * Generate content for individual component report
   */
  generateComponentReportContent(componentName, component) {
    return `# Coverage Report: ${componentName}

## Summary
- **Overall Coverage**: ${component.overallCoverage}%
- **Category**: ${component.category}
- **Status**: ${component.meetsThreshold ? '✅ PASSED' : '❌ FAILED'}

## Test Coverage Breakdown

${Object.entries(component.tests).map(([testType, testData]) => 
`- **${testType}**: ${testData.exists ? '✅' : '❌'} ${testData.coverage}%`
).join('\n')}

## Critical Issues

${component.criticalGaps.map(gap => `- ${gap}`).join('\n') || 'None identified'}

## Recommendations

1. ${component.overallCoverage < 50 ? 'Create comprehensive unit tests' : 'Enhance existing tests'}
2. ${!component.tests.accessibility.exists ? 'Add accessibility validation tests' : 'Improve accessibility coverage'}
3. ${!component.tests.swissCompliance.exists ? 'Implement Swiss compliance testing' : 'Complete Swiss compliance validation'}

---
*Component analysis completed: ${new Date().toLocaleString()}*
`;
  }

  /**
   * Categorize component based on name and importance
   */
  categorizeComponent(componentName) {
    for (const [category, components] of Object.entries(COMPONENT_CATEGORIES)) {
      if (components.includes(componentName)) {
        return category;
      }
    }
    
    // Auto-categorize based on component name patterns
    if (componentName.includes('form') || componentName.includes('menu') || componentName.includes('header') || componentName.includes('footer')) {
      return 'critical';
    } else if (componentName.includes('card') || componentName.includes('hero') || componentName.includes('button')) {
      return 'important';
    } else {
      return 'standard';
    }
  }
}

/**
 * Quick coverage validation for CI/CD integration
 * @param {Object} options - Validation options
 * @returns {Object} Quick validation results
 */
export async function quickCoverageValidation(options = {}) {
  const analyzer = new TestCoverageAnalyzer({
    verbose: false,
    ...options
  });
  
  // Run essential coverage checks only
  await analyzer.discoverComponents();
  await analyzer.analyzeTestFiles();
  await analyzer.calculateOverallMetrics();
  
  const result = {
    overallCoverage: analyzer.coverageData.summary.overallCoverage,
    passedThreshold: analyzer.coverageData.summary.passedThreshold,
    testedComponents: analyzer.coverageData.summary.testedComponents,
    totalComponents: analyzer.coverageData.summary.totalComponents,
    recommendation: analyzer.coverageData.summary.passedThreshold ? 'PASSED' : 'FAILED',
    criticalIssues: analyzer.coverageData.summary.overallCoverage < 80 ? 'Coverage below acceptable level' : 'No critical issues'
  };
  
  console.log(`Quick validation: ${result.overallCoverage}% coverage (${result.recommendation})`);
  
  return result;
}

export default {
  TestCoverageAnalyzer,
  COVERAGE_THRESHOLDS,
  COMPONENT_CATEGORIES,
  quickCoverageValidation
};