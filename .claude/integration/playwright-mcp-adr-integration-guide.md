# Playwright MCP ADR Integration Guide

**adessoCMS Swiss Municipal Portal Project**

## Overview

This guide documents the integration between the enhanced ADR (Architecture Decision Records) system and Playwright MCP (Model Context Protocol) testing framework for the adessoCMS municipal portal project. The integration ensures that architectural decisions about frontend functionality are automatically validated through comprehensive testing requirements and Swiss compliance automation.

## Integration Architecture

### ADR-Testing Integration Framework

The enhanced ADR system automatically generates testing requirements when frontend architectural decisions are made, integrating with:
- **Playwright MCP Server**: Advanced testing automation with AI-enhanced test generation
- **Swiss Compliance Testing**: Automated WCAG 2.1 AA, CH-DSG, and eCH-0059 validation
- **Municipal Context Testing**: Municipality-specific user journey and workflow testing
- **Cross-Browser Compatibility**: Multi-browser testing for Swiss government portal requirements

### MCP Server Integration

#### MCP Configuration for ADR Integration

The `.mcp.json` configuration includes enhanced ADR integration:

```json
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"],
      "env": {
        "ADR_INTEGRATION_ENABLED": "true",
        "SWISS_COMPLIANCE_TESTING": "true",
        "MUNICIPAL_CONTEXT_TESTING": "true",
        "ADR_PATH": ".claude/adrs/"
      }
    },
    "adr-playwright-bridge": {
      "type": "stdio", 
      "command": "node",
      "args": [".claude/infrastructure/playwright-adr-bridge.js"],
      "env": {}
    }
  }
}
```

#### ADR-Playwright Bridge Implementation

```javascript
// .claude/infrastructure/playwright-adr-bridge.js
class ADRPlaywrightBridge {
  constructor() {
    this.mcpClient = new MCPClient();
    this.adrSystem = new KnowledgeSynthesisSystem();
  }

  async generateTestsFromADR(adrDecision) {
    const testRequirements = await this.extractTestRequirements(adrDecision);
    
    return {
      accessibilityTests: this.generateAccessibilityTests(testRequirements),
      functionalTests: this.generateFunctionalTests(testRequirements),
      performanceTests: this.generatePerformanceTests(testRequirements),
      complianceTests: this.generateComplianceTests(testRequirements),
      municipalTests: this.generateMunicipalTests(testRequirements)
    };
  }

  async validateADRWithTests(adrId, testResults) {
    const validation = {
      adrId: adrId,
      testCoverage: this.calculateTestCoverage(testResults),
      complianceValidation: this.validateSwissCompliance(testResults),
      municipalValidation: this.validateMunicipalRequirements(testResults),
      performanceValidation: this.validatePerformanceRequirements(testResults)
    };

    await this.updateADRWithTestResults(adrId, validation);
    return validation;
  }
}
```

## Frontend Architectural Decision Testing

### Automated Test Generation for ADR Decisions

When frontend architectural decisions are created, the system automatically generates comprehensive test suites:

#### 1. Component Architecture Decision Testing

```javascript
// Automatic test generation for component decisions
class ComponentADRTestGenerator {
  async generateComponentTests(componentDecision) {
    const testSuite = {
      component: componentDecision.componentName,
      adrId: componentDecision.id,
      tests: []
    };

    // Generate accessibility tests
    testSuite.tests.push(...await this.generateAccessibilityTests(componentDecision));
    
    // Generate functional tests
    testSuite.tests.push(...await this.generateFunctionalTests(componentDecision));
    
    // Generate Swiss compliance tests
    testSuite.tests.push(...await this.generateSwissComplianceTests(componentDecision));
    
    // Generate municipal context tests
    testSuite.tests.push(...await this.generateMunicipalTests(componentDecision));

    return testSuite;
  }

  async generateAccessibilityTests(decision) {
    return [
      {
        name: `${decision.componentName} WCAG 2.1 AA compliance`,
        type: 'accessibility',
        spec: `
          test('${decision.componentName} meets WCAG 2.1 AA requirements', async ({ page }) => {
            await page.goto('/components/${decision.componentName}');
            
            // Run axe accessibility tests
            const results = await page.evaluate(async () => {
              return await axe.run();
            });
            
            expect(results.violations).toHaveLength(0);
            
            // Test keyboard navigation
            await page.keyboard.press('Tab');
            expect(await page.locator(':focus').count()).toBeGreaterThan(0);
            
            // Test screen reader compatibility
            const ariaLabels = await page.locator('[aria-label]').count();
            expect(ariaLabels).toBeGreaterThan(0);
          });
        `
      }
    ];
  }
}
```

#### 2. Swiss Municipal Compliance Test Automation

```javascript
// Swiss compliance test automation
class SwissComplianceTestGenerator {
  async generateComplianceTests(decision) {
    const tests = [];

    // WCAG 2.1 AA Tests
    if (decision.compliance.includes('wcag-2.1-aa')) {
      tests.push(await this.generateWCAGTests(decision));
    }

    // CH-DSG Privacy Tests
    if (decision.compliance.includes('ch-dsg')) {
      tests.push(await this.generatePrivacyTests(decision));
    }

    // eCH-0059 E-Government Tests
    if (decision.compliance.includes('ech-0059')) {
      tests.push(await this.generateEGovernmentTests(decision));
    }

    return tests;
  }

  async generatePrivacyTests(decision) {
    return {
      name: `${decision.componentName} CH-DSG privacy compliance`,
      type: 'privacy',
      spec: `
        test('${decision.componentName} CH-DSG privacy compliance', async ({ page, context }) => {
          // Test cookie consent implementation
          await page.goto('/');
          const cookieConsent = page.locator('[data-cookie-consent]');
          await expect(cookieConsent).toBeVisible();
          
          // Test data collection transparency
          if (await page.locator('form').count() > 0) {
            const privacyInfo = page.locator('[data-privacy-info]');
            await expect(privacyInfo).toBeVisible();
            
            // Test data processing disclosure
            const dataProcessingInfo = page.locator('[data-data-processing]');
            await expect(dataProcessingInfo).toContainText('Datenschutz');
          }
          
          // Test user rights implementation
          const userRights = page.locator('[data-user-rights]');
          if (await userRights.count() > 0) {
            await expect(userRights).toContainText(['Auskunft', 'Berichtigung', 'Löschung']);
          }
        });
      `
    };
  }
}
```

### Municipality-Specific Testing Patterns

#### Thalwil Testing (Formal & Structured)

```javascript
// Thalwil-specific formal testing patterns
const thalwilTestPatterns = {
  formalWorkflows: {
    approvalProcesses: async (page, decision) => {
      await test('Thalwil formal approval workflow', async () => {
        await page.goto(`/thalwil/${decision.componentName}`);
        
        // Test formal approval stages
        const approvalStages = await page.locator('[data-approval-stage]').count();
        expect(approvalStages).toBeGreaterThanOrEqual(3);
        
        // Test documentation requirements
        const requiredDocs = await page.locator('[data-required-document]').count();
        expect(requiredDocs).toBeGreaterThan(0);
        
        // Test formal communication patterns
        const formalLanguage = await page.locator('body').textContent();
        expect(formalLanguage).toMatch(/Sie|Ihnen|formell|Antrag/);
      });
    }
  },

  resourcePlanning: async (page, decision) => {
    await test('Thalwil resource allocation planning', async () => {
      // Test resource allocation interfaces
      const resourcePlanning = page.locator('[data-resource-planning]');
      if (await resourcePlanning.count() > 0) {
        await expect(resourcePlanning).toBeVisible();
        
        // Test budget impact calculation
        const budgetImpact = page.locator('[data-budget-impact]');
        await expect(budgetImpact).toBeVisible();
      }
    });
  }
};
```

#### Thalheim Testing (Streamlined & Efficient)

```javascript
// Thalheim-specific efficiency testing patterns
const thalheimTestPatterns = {
  efficiencyOptimization: {
    performanceTests: async (page, decision) => {
      await test('Thalheim efficiency optimization', async () => {
        // Test load performance for small municipality
        const startTime = Date.now();
        await page.goto(`/thalheim/${decision.componentName}`);
        const loadTime = Date.now() - startTime;
        
        // Efficiency requirement: < 2 seconds for small municipality
        expect(loadTime).toBeLessThan(2000);
        
        // Test streamlined user flows
        const userFlowSteps = await page.locator('[data-workflow-step]').count();
        expect(userFlowSteps).toBeLessThanOrEqual(3);
        
        // Test shared resource optimization
        const sharedResources = page.locator('[data-shared-resource]');
        if (await sharedResources.count() > 0) {
          await expect(sharedResources).toBeVisible();
        }
      });
    }
  },

  costOptimization: async (page, decision) => {
    await test('Thalheim cost optimization validation', async () => {
      // Test cost-effective implementations
      const costOptimizations = page.locator('[data-cost-optimization]');
      if (await costOptimizations.count() > 0) {
        await expect(costOptimizations).toBeVisible();
        
        // Test resource sharing indicators
        const resourceSharing = page.locator('[data-resource-sharing]');
        await expect(resourceSharing).toBeVisible();
      }
    });
  }
};
```

#### Erlenbach Testing (Collaborative & Consensus)

```javascript
// Erlenbach-specific collaborative testing patterns
const erlenbachTestPatterns = {
  collaborativeFeatures: {
    communityEngagement: async (page, decision) => {
      await test('Erlenbach community engagement features', async () => {
        await page.goto(`/erlenbach/${decision.componentName}`);
        
        // Test community feedback mechanisms
        const feedbackMechanisms = page.locator('[data-community-feedback]');
        if (await feedbackMechanisms.count() > 0) {
          await expect(feedbackMechanisms).toBeVisible();
          
          // Test feedback submission
          await feedbackMechanisms.click();
          const feedbackForm = page.locator('[data-feedback-form]');
          await expect(feedbackForm).toBeVisible();
        }
        
        // Test collaborative decision interfaces
        const collaborativeElements = page.locator('[data-collaborative-decision]');
        if (await collaborativeElements.count() > 0) {
          await expect(collaborativeElements).toBeVisible();
        }
      });
    }
  },

  consensusBuilding: async (page, decision) => {
    await test('Erlenbach consensus building mechanisms', async () => {
      // Test consensus building interfaces
      const consensusElements = page.locator('[data-consensus-building]');
      if (await consensusElements.count() > 0) {
        await expect(consensusElements).toBeVisible();
        
        // Test democratic participation features
        const participationFeatures = page.locator('[data-democratic-participation]');
        await expect(participationFeatures).toBeVisible();
      }
    });
  }
};
```

## Playwright Configuration for ADR Integration

### Enhanced Playwright Configuration

```javascript
// web/themes/custom/adesso_cms_theme/playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'html',
  
  use: {
    baseURL: process.env.DDEV_PRIMARY_URL || 'https://zh-demo.ddev.site',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    viewport: { width: 1280, height: 720 },
    locale: 'de-CH',
    timezoneId: 'Europe/Zurich',
    colorScheme: 'light',
    
    // ADR integration configuration
    extraHTTPHeaders: {
      'X-ADR-Integration': 'enabled',
      'X-Municipal-Context': process.env.MUNICIPAL_CONTEXT || 'multi'
    }
  },

  // Enhanced projects with ADR integration
  projects: [
    // Standard browser testing
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox', 
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile testing for citizen access
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    // Swiss compliance testing projects
    {
      name: 'accessibility-wcag-2-1-aa',
      use: {
        ...devices['Desktop Chrome'],
        reducedMotion: 'reduce',
        colorScheme: 'dark', // Test high contrast
        extraHTTPHeaders: {
          'X-Accessibility-Testing': 'wcag-2.1-aa',
          'X-ADR-Compliance-Focus': 'accessibility'
        }
      },
      testMatch: '**/*accessibility*.spec.js',
    },

    {
      name: 'privacy-ch-dsg',
      use: {
        ...devices['Desktop Chrome'],
        extraHTTPHeaders: {
          'X-Privacy-Testing': 'ch-dsg',
          'X-ADR-Compliance-Focus': 'privacy'
        }
      },
      testMatch: '**/*privacy*.spec.js',
    },

    {
      name: 'egovernment-ech-0059',
      use: {
        ...devices['Desktop Chrome'],
        extraHTTPHeaders: {
          'X-EGovernment-Testing': 'ech-0059',
          'X-ADR-Compliance-Focus': 'egovernment'
        }
      },
      testMatch: '**/*egovernment*.spec.js',
    },

    // Municipality-specific testing projects
    {
      name: 'thalwil-formal',
      use: {
        ...devices['Desktop Chrome'],
        extraHTTPHeaders: {
          'X-Municipality-Context': 'thalwil',
          'X-Governance-Style': 'formal-structured'
        }
      },
      testMatch: '**/*thalwil*.spec.js',
    },

    {
      name: 'thalheim-efficient',
      use: {
        ...devices['Desktop Chrome'],
        extraHTTPHeaders: {
          'X-Municipality-Context': 'thalheim',
          'X-Governance-Style': 'streamlined-efficient'
        }
      },
      testMatch: '**/*thalheim*.spec.js',
    },

    {
      name: 'erlenbach-collaborative',
      use: {
        ...devices['Desktop Chrome'],
        extraHTTPHeaders: {
          'X-Municipality-Context': 'erlenbach',
          'X-Governance-Style': 'collaborative-consensus'
        }
      },
      testMatch: '**/*erlenbach*.spec.js',
    },

    // ADR validation testing
    {
      name: 'adr-validation',
      use: {
        ...devices['Desktop Chrome'],
        extraHTTPHeaders: {
          'X-ADR-Validation': 'enabled',
          'X-Test-Type': 'adr-compliance'
        }
      },
      testMatch: '**/*adr-validation*.spec.js',
    }
  ],

  // ADR integration global setup
  globalSetup: require.resolve('./tests/adr-integration-setup.js'),
  globalTeardown: require.resolve('./tests/adr-integration-teardown.js'),

  // Enhanced web server configuration
  webServer: {
    command: 'echo "Using existing DDEV server for ADR-integrated testing"',
    url: process.env.DDEV_PRIMARY_URL || 'https://zh-demo.ddev.site',
    reuseExistingServer: !process.env.CI,
    ignoreHTTPSErrors: true,
  },
  
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  
  outputDir: './tests/results/',
  
  // ADR integration metadata
  metadata: {
    'Test Environment': 'adessoCMS Municipal Portal',
    'Theme': 'Adesso CMS Theme',
    'Drupal Version': '11.2.2',
    'Swiss Compliance': 'WCAG 2.1 AA, CH-DSG, eCH-0059',
    'Municipal Contexts': 'Thalwil, Thalheim, Erlenbach',
    'ADR Integration': 'Enhanced with MADR 4.0.0',
    'Testing Framework': 'Playwright MCP Integration'
  },
});
```

### ADR Test Generation Automation

#### Automated Test Suite Generation

```javascript
// tests/adr-integration-setup.js
class ADRTestSetup {
  async globalSetup() {
    console.log('Setting up ADR-Playwright integration...');
    
    // Load ADR decisions
    const adrDecisions = await this.loadRecentADRDecisions();
    
    // Generate test suites for each ADR
    for (const decision of adrDecisions) {
      if (decision.impactAreas.includes('frontend')) {
        await this.generateTestSuiteForADR(decision);
      }
    }
    
    // Setup Swiss compliance test data
    await this.setupSwissComplianceTestData();
    
    // Setup municipal context test data
    await this.setupMunicipalTestContexts();
    
    console.log('ADR-Playwright integration setup complete');
  }

  async generateTestSuiteForADR(decision) {
    const testGenerator = new ADRTestGenerator();
    const testSuite = await testGenerator.generateTestSuite(decision);
    
    // Write test files
    for (const test of testSuite.tests) {
      await this.writeTestFile(test, decision);
    }
    
    return testSuite;
  }

  async writeTestFile(test, decision) {
    const testContent = `
// Auto-generated test for ADR decision: ${decision.id}
// Title: ${decision.title}
// Municipal Context: ${decision.municipalContext}
// Compliance Requirements: ${decision.compliance.join(', ')}

const { test, expect } = require('@playwright/test');

test.describe('${decision.title}', () => {
  test.beforeEach(async ({ page }) => {
    // Setup ADR-specific test context
    await page.goto('/');
    await page.addInitScript((adrId) => {
      window.__ADR_CONTEXT__ = { 
        decisionId: adrId,
        testingMode: true 
      };
    }, '${decision.id}');
  });

  ${test.spec}
});
    `;
    
    const testPath = `tests/adr-generated/${decision.id}-${test.type}.spec.js`;
    await this.ensureDirectoryExists(path.dirname(testPath));
    await fs.writeFile(testPath, testContent);
  }
}
```

## Test Execution Integration

### ADR-Driven Test Execution

```javascript
// Enhanced test execution with ADR integration
class ADRTestRunner {
  async runADRValidationTests(adrId) {
    const decision = await this.loadADRDecision(adrId);
    const testResults = {
      adrId: adrId,
      decision: decision.title,
      timestamp: new Date().toISOString(),
      results: {}
    };

    // Run accessibility tests
    if (decision.compliance.includes('wcag-2.1-aa')) {
      testResults.results.accessibility = await this.runAccessibilityTests(decision);
    }

    // Run privacy tests  
    if (decision.compliance.includes('ch-dsg')) {
      testResults.results.privacy = await this.runPrivacyTests(decision);
    }

    // Run e-government tests
    if (decision.compliance.includes('ech-0059')) {
      testResults.results.egovernment = await this.runEGovernmentTests(decision);
    }

    // Run municipality-specific tests
    for (const municipality of decision.municipalities) {
      testResults.results[municipality] = await this.runMunicipalityTests(decision, municipality);
    }

    // Update ADR with test results
    await this.updateADRWithTestResults(adrId, testResults);
    
    return testResults;
  }
}
```

### Continuous Integration with ADR Validation

```bash
#!/bin/bash
# .github/workflows/adr-validation.yml equivalent script

echo "Running ADR-integrated Playwright tests..."

# Get changed ADR decisions
CHANGED_ADRS=$(git diff HEAD~1 --name-only | grep ".claude/adrs/" | grep -v ".md$")

if [ -n "$CHANGED_ADRS" ]; then
  echo "ADR changes detected, running validation tests..."
  
  for adr_file in $CHANGED_ADRS; do
    ADR_ID=$(basename "$adr_file" .json)
    echo "Validating ADR: $ADR_ID"
    
    # Run ADR-specific tests
    npm run test:adr-validation -- --adr-id="$ADR_ID"
    
    if [ $? -ne 0 ]; then
      echo "❌ ADR validation failed for: $ADR_ID"
      exit 1
    fi
  done
else
  echo "No ADR changes detected, running standard test suite..."
  npm run test:e2e
fi

echo "✅ All ADR validation tests passed"
```

## Monitoring and Reporting

### ADR Test Results Integration

```javascript
// ADR test results monitoring and reporting
class ADRTestMonitoring {
  async generateADRTestReport(adrId, testResults) {
    const report = {
      adr: await this.getADRDetails(adrId),
      testExecution: {
        timestamp: testResults.timestamp,
        totalTests: this.countTotalTests(testResults),
        passedTests: this.countPassedTests(testResults),
        failedTests: this.countFailedTests(testResults),
        skippedTests: this.countSkippedTests(testResults)
      },
      complianceValidation: {
        wcag: testResults.results.accessibility?.summary || 'not-tested',
        chDsg: testResults.results.privacy?.summary || 'not-tested',
        eCh0059: testResults.results.egovernment?.summary || 'not-tested'
      },
      municipalValidation: {
        thalwil: testResults.results.thalwil?.summary || 'not-applicable',
        thalheim: testResults.results.thalheim?.summary || 'not-applicable', 
        erlenbach: testResults.results.erlenbach?.summary || 'not-applicable'
      },
      recommendations: this.generateRecommendations(testResults)
    };

    await this.saveTestReport(adrId, report);
    return report;
  }

  async trackADRTestHealth() {
    const healthMetrics = {
      totalADRsWithTests: await this.countADRsWithTests(),
      testCoveragePercentage: await this.calculateTestCoverage(),
      averageTestExecutionTime: await this.calculateAverageExecutionTime(),
      complianceTestSuccessRate: await this.calculateComplianceSuccessRate(),
      municipalTestSuccessRate: await this.calculateMunicipalSuccessRate()
    };

    return healthMetrics;
  }
}
```

## Best Practices

### ADR-Playwright Integration Best Practices

1. **Comprehensive Test Coverage**: Ensure every frontend ADR decision has corresponding Playwright tests
2. **Swiss Compliance First**: Prioritize Swiss regulatory compliance testing in all ADR validations  
3. **Municipal Context Testing**: Test all ADR decisions across relevant municipality contexts
4. **Automated Test Generation**: Use ADR metadata to automatically generate appropriate test suites
5. **Continuous Validation**: Run ADR validation tests on every relevant code change

### Test Quality Assurance

1. **ADR Test Consistency**: Maintain consistent testing patterns across all ADR decisions
2. **Compliance Validation**: Ensure all Swiss regulatory requirements are properly tested
3. **Performance Integration**: Include performance testing for efficiency-focused municipalities  
4. **Accessibility Integration**: Comprehensive accessibility testing for all frontend decisions
5. **Municipal Context Validation**: Test all relevant municipality-specific requirements

### Monitoring and Maintenance

1. **Test Health Monitoring**: Regular monitoring of ADR test execution and success rates
2. **Compliance Tracking**: Continuous tracking of Swiss regulatory compliance test results
3. **Municipal Satisfaction**: Monitor municipality-specific test satisfaction and effectiveness
4. **Test Evolution**: Continuously improve test coverage based on ADR decision patterns
5. **Integration Optimization**: Regular optimization of ADR-Playwright integration performance

---

**Integration Guide Version**: 1.0.0  
**Last Updated**: 2025-01-09  
**Target Environment**: adessoCMS zh-demo DDEV Project with Playwright MCP  
**Maintainers**: ADR Testing Team, Municipal Portal QA Team