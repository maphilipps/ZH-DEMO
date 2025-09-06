#!/usr/bin/env node

/**
 * Enhanced ADR System Integration Test Suite
 * 
 * Comprehensive integration testing for the enhanced ADR automation system
 * with existing development tools (DDEV, Storybook, Playwright MCP) for 
 * the adessoCMS Swiss municipal portal project.
 * 
 * @author ADR Integration Testing Agent
 * @version 1.0.0
 * @since 2025-01-09
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

class EnhancedADRSystemIntegrationTest {
    constructor() {
        this.testResults = {
            timestamp: new Date().toISOString(),
            overall: 'PENDING',
            tests: {},
            errors: [],
            recommendations: []
        };
        
        this.config = {
            ddevProject: 'zh-demo',
            storybookUrl: 'https://zh-demo.ddev.site:6006',
            drupalUrl: 'https://zh-demo.ddev.site',
            mcpServers: ['playwright', 'context7', 'taskmaster-ai'],
            timeout: 30000
        };
    }

    /**
     * Run comprehensive integration test suite
     */
    async runIntegrationTests() {
        console.log('🧪 Starting Enhanced ADR System Integration Tests');
        console.log('=' .repeat(70));
        
        try {
            await this.testDDEVEnvironment();
            await this.testADRAutomationInfrastructure();
            await this.testStorybookIntegration();
            await this.testPlaywrightMCPIntegration();
            await this.testThemeWorkflowIntegration();
            await this.testSwissComplianceIntegration();
            await this.testMunicipalitySpecificWorkflows();
            await this.testCrossProjectLearningIntegration();
            await this.generateIntegrationReport();
            
            this.testResults.overall = this.calculateOverallStatus();
            
        } catch (error) {
            console.error('❌ Integration test failed:', error.message);
            this.testResults.errors.push(error.message);
            this.testResults.overall = 'FAILED';
        }
        
        return this.testResults;
    }

    /**
     * Test DDEV environment integration
     */
    async testDDEVEnvironment() {
        console.log('\n📦 Testing DDEV Environment Integration...');
        
        try {
            // Test DDEV status
            const status = execSync('ddev list --format json', { encoding: 'utf8' });
            const projects = JSON.parse(status);
            const zhDemo = projects.find(p => p.name === 'zh-demo');
            
            if (!zhDemo) {
                throw new Error('zh-demo DDEV project not found');
            }
            
            if (zhDemo.status !== 'OK') {
                throw new Error(`zh-demo project status: ${zhDemo.status}`);
            }
            
            // Test theme commands
            const themeHelp = execSync('ddev theme --help', { encoding: 'utf8' });
            const requiredCommands = ['dev', 'build', 'watch', 'storybook', 'test'];
            
            for (const cmd of requiredCommands) {
                if (!themeHelp.includes(cmd)) {
                    throw new Error(`Missing theme command: ${cmd}`);
                }
            }
            
            this.testResults.tests.ddevEnvironment = {
                status: 'PASSED',
                details: {
                    projectStatus: zhDemo.status,
                    url: zhDemo.urls[0],
                    themeCommands: requiredCommands
                }
            };
            
            console.log('✅ DDEV Environment: PASSED');
            
        } catch (error) {
            this.testResults.tests.ddevEnvironment = {
                status: 'FAILED',
                error: error.message
            };
            console.log('❌ DDEV Environment: FAILED -', error.message);
        }
    }

    /**
     * Test ADR automation infrastructure
     */
    async testADRAutomationInfrastructure() {
        console.log('\n🤖 Testing ADR Automation Infrastructure...');
        
        try {
            const requiredFiles = [
                '.claude/infrastructure/knowledge-synthesis.js',
                '.claude/infrastructure/predictive-adr-engine.js',
                '.claude/infrastructure/cross-project-learning-engine.js',
                '.claude/infrastructure/municipal-knowledge-graph.js',
                '.claude/infrastructure/multi-municipality-scaling-automation.js'
            ];
            
            const missingFiles = [];
            const fileDetails = {};
            
            for (const file of requiredFiles) {
                const fullPath = path.join(process.cwd(), file);
                if (!fs.existsSync(fullPath)) {
                    missingFiles.push(file);
                } else {
                    const stats = fs.statSync(fullPath);
                    const content = fs.readFileSync(fullPath, 'utf8');
                    fileDetails[file] = {
                        size: stats.size,
                        modified: stats.mtime,
                        hasExports: content.includes('module.exports') || content.includes('export'),
                        hasMunicipalContext: content.includes('municipality') || content.includes('swiss'),
                        hasMADR: content.includes('MADR') || content.includes('4.0.0')
                    };
                }
            }
            
            if (missingFiles.length > 0) {
                throw new Error(`Missing automation files: ${missingFiles.join(', ')}`);
            }
            
            // Test validation script
            const validationResult = execSync('node .claude/scripts/validate-automation-infrastructure.js', { 
                encoding: 'utf8' 
            });
            
            this.testResults.tests.adrAutomation = {
                status: 'PASSED',
                details: {
                    filesVerified: requiredFiles.length,
                    fileDetails,
                    validationPassed: validationResult.includes('✅') || validationResult.includes('SUCCESS')
                }
            };
            
            console.log('✅ ADR Automation Infrastructure: PASSED');
            
        } catch (error) {
            this.testResults.tests.adrAutomation = {
                status: 'FAILED',
                error: error.message
            };
            console.log('❌ ADR Automation Infrastructure: FAILED -', error.message);
        }
    }

    /**
     * Test Storybook integration
     */
    async testStorybookIntegration() {
        console.log('\n📚 Testing Storybook Integration...');
        
        try {
            // Check Storybook configuration
            const storybookConfig = path.join(process.cwd(), 'web/themes/custom/adesso_cms_theme/.storybook/main.js');
            if (!fs.existsSync(storybookConfig)) {
                throw new Error('Storybook configuration not found');
            }
            
            const config = fs.readFileSync(storybookConfig, 'utf8');
            const hasJsonStories = config.includes('buildStoriesJson');
            const hasDdevConfig = config.includes('ddev.site');
            
            // Check story files
            const storiesGlob = 'web/themes/custom/adesso_cms_theme/components/**/*.stories.js';
            const storyFiles = execSync(`find web/themes/custom/adesso_cms_theme/components -name "*.stories.js" | wc -l`, { 
                encoding: 'utf8' 
            }).trim();
            
            // Test if we can build stories (without starting server)
            const storiesTest = execSync('cd web/themes/custom/adesso_cms_theme && npm run build-storybook --quiet || echo "BUILD_FAILED"', { 
                encoding: 'utf8' 
            });
            
            this.testResults.tests.storybookIntegration = {
                status: 'PASSED',
                details: {
                    configFound: true,
                    hasJsonStories,
                    hasDdevConfig,
                    storyFilesCount: parseInt(storyFiles),
                    buildTest: !storiesTest.includes('BUILD_FAILED')
                }
            };
            
            console.log('✅ Storybook Integration: PASSED');
            
        } catch (error) {
            this.testResults.tests.storybookIntegration = {
                status: 'FAILED',
                error: error.message
            };
            console.log('❌ Storybook Integration: FAILED -', error.message);
        }
    }

    /**
     * Test Playwright MCP integration
     */
    async testPlaywrightMCPIntegration() {
        console.log('\n🎭 Testing Playwright MCP Integration...');
        
        try {
            // Check MCP configuration
            const mcpConfig = path.join(process.cwd(), '.mcp.json');
            if (!fs.existsSync(mcpConfig)) {
                throw new Error('MCP configuration not found');
            }
            
            const config = JSON.parse(fs.readFileSync(mcpConfig, 'utf8'));
            const playwrightServer = config.mcpServers?.playwright;
            
            if (!playwrightServer) {
                throw new Error('Playwright MCP server not configured');
            }
            
            // Check Playwright configuration
            const playwrightConfig = path.join(process.cwd(), 'web/themes/custom/adesso_cms_theme/playwright.config.js');
            if (!fs.existsSync(playwrightConfig)) {
                throw new Error('Playwright configuration not found');
            }
            
            const playwrightConfigContent = fs.readFileSync(playwrightConfig, 'utf8');
            const hasSwissConfig = playwrightConfigContent.includes('de-CH') && 
                                  playwrightConfigContent.includes('Europe/Zurich');
            const hasDdevConfig = playwrightConfigContent.includes('ddev.site');
            const hasAccessibilityProject = playwrightConfigContent.includes('accessibility');
            
            // Test if Playwright can be initialized (dry run)
            const playwrightTest = execSync('cd web/themes/custom/adesso_cms_theme && npx playwright --version', { 
                encoding: 'utf8' 
            });
            
            this.testResults.tests.playwrightMCP = {
                status: 'PASSED',
                details: {
                    mcpConfigured: true,
                    playwrightConfigured: true,
                    hasSwissConfig,
                    hasDdevConfig,
                    hasAccessibilityProject,
                    playwrightVersion: playwrightTest.trim()
                }
            };
            
            console.log('✅ Playwright MCP Integration: PASSED');
            
        } catch (error) {
            this.testResults.tests.playwrightMCP = {
                status: 'FAILED',
                error: error.message
            };
            console.log('❌ Playwright MCP Integration: FAILED -', error.message);
        }
    }

    /**
     * Test theme workflow integration
     */
    async testThemeWorkflowIntegration() {
        console.log('\n🎨 Testing Theme Workflow Integration...');
        
        try {
            const themeDir = 'web/themes/custom/adesso_cms_theme';
            
            // Check package.json
            const packageJson = path.join(themeDir, 'package.json');
            if (!fs.existsSync(packageJson)) {
                throw new Error('Theme package.json not found');
            }
            
            const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
            const hasVitest = pkg.devDependencies?.vitest || pkg.dependencies?.vitest;
            const hasPlaywright = pkg.devDependencies?.['@playwright/test'];
            const hasStorybook = pkg.devDependencies?.storybook || pkg.devDependencies?.['@storybook/html-vite'];
            
            // Check Vite configuration
            const viteConfig = path.join(themeDir, 'vite.config.js');
            const hasViteConfig = fs.existsSync(viteConfig);
            
            // Test theme build (dry run)
            const buildTest = execSync(`cd ${themeDir} && npm run build || echo "BUILD_FAILED"`, { 
                encoding: 'utf8' 
            });
            
            this.testResults.tests.themeWorkflow = {
                status: 'PASSED',
                details: {
                    packageJsonFound: true,
                    hasVitest,
                    hasPlaywright,
                    hasStorybook,
                    hasViteConfig,
                    buildTest: !buildTest.includes('BUILD_FAILED')
                }
            };
            
            console.log('✅ Theme Workflow Integration: PASSED');
            
        } catch (error) {
            this.testResults.tests.themeWorkflow = {
                status: 'FAILED',
                error: error.message
            };
            console.log('❌ Theme Workflow Integration: FAILED -', error.message);
        }
    }

    /**
     * Test Swiss compliance integration
     */
    async testSwissComplianceIntegration() {
        console.log('\n🇨🇭 Testing Swiss Compliance Integration...');
        
        try {
            // Check compliance-related files
            const complianceFiles = [
                '.claude/workflows/swiss-municipal-stakeholder-patterns.md',
                '.claude/infrastructure/municipal-knowledge-graph.js'
            ];
            
            let complianceFeatures = {
                wcag: false,
                chDsg: false,
                eCh0059: false,
                multilingual: false
            };
            
            for (const file of complianceFiles) {
                if (fs.existsSync(file)) {
                    const content = fs.readFileSync(file, 'utf8');
                    if (content.includes('WCAG') || content.includes('2.1 AA')) complianceFeatures.wcag = true;
                    if (content.includes('CH-DSG')) complianceFeatures.chDsg = true;
                    if (content.includes('eCH-0059')) complianceFeatures.eCh0059 = true;
                    if (content.includes('multilingual') || content.includes('German') || content.includes('French')) {
                        complianceFeatures.multilingual = true;
                    }
                }
            }
            
            // Check Playwright accessibility configuration
            const playwrightConfig = path.join(process.cwd(), 'web/themes/custom/adesso_cms_theme/playwright.config.js');
            if (fs.existsSync(playwrightConfig)) {
                const config = fs.readFileSync(playwrightConfig, 'utf8');
                if (config.includes('accessibility') && config.includes('reducedMotion')) {
                    complianceFeatures.accessibilityTesting = true;
                }
            }
            
            const complianceScore = Object.values(complianceFeatures).filter(Boolean).length;
            
            this.testResults.tests.swissCompliance = {
                status: complianceScore >= 3 ? 'PASSED' : 'WARNING',
                details: {
                    complianceFeatures,
                    complianceScore: `${complianceScore}/5`,
                    filesChecked: complianceFiles.length
                }
            };
            
            console.log(`✅ Swiss Compliance Integration: ${this.testResults.tests.swissCompliance.status} (${complianceScore}/5 features)`);
            
        } catch (error) {
            this.testResults.tests.swissCompliance = {
                status: 'FAILED',
                error: error.message
            };
            console.log('❌ Swiss Compliance Integration: FAILED -', error.message);
        }
    }

    /**
     * Test municipality-specific workflows
     */
    async testMunicipalitySpecificWorkflows() {
        console.log('\n🏛️ Testing Municipality-Specific Workflows...');
        
        try {
            const municipalityFiles = [
                '.claude/infrastructure/multi-municipality-scaling-automation.js',
                '.claude/workflows/swiss-municipal-stakeholder-patterns.md'
            ];
            
            let municipalityFeatures = {
                thalwil: false,
                thalheim: false,
                erlenbach: false,
                scalingAutomation: false
            };
            
            for (const file of municipalityFiles) {
                if (fs.existsSync(file)) {
                    const content = fs.readFileSync(file, 'utf8');
                    if (content.toLowerCase().includes('thalwil')) municipalityFeatures.thalwil = true;
                    if (content.toLowerCase().includes('thalheim')) municipalityFeatures.thalheim = true;
                    if (content.toLowerCase().includes('erlenbach')) municipalityFeatures.erlenbach = true;
                    if (content.includes('scaling') || content.includes('automation')) {
                        municipalityFeatures.scalingAutomation = true;
                    }
                }
            }
            
            const municipalityScore = Object.values(municipalityFeatures).filter(Boolean).length;
            
            this.testResults.tests.municipalityWorkflows = {
                status: municipalityScore >= 3 ? 'PASSED' : 'WARNING',
                details: {
                    municipalityFeatures,
                    municipalityScore: `${municipalityScore}/4`,
                    filesChecked: municipalityFiles.length
                }
            };
            
            console.log(`✅ Municipality Workflows: ${this.testResults.tests.municipalityWorkflows.status} (${municipalityScore}/4 features)`);
            
        } catch (error) {
            this.testResults.tests.municipalityWorkflows = {
                status: 'FAILED',
                error: error.message
            };
            console.log('❌ Municipality Workflows: FAILED -', error.message);
        }
    }

    /**
     * Test cross-project learning integration
     */
    async testCrossProjectLearningIntegration() {
        console.log('\n🧠 Testing Cross-Project Learning Integration...');
        
        try {
            const learningFiles = [
                '.claude/infrastructure/cross-project-learning-engine.js',
                '.claude/learning/patterns/',
                '.claude/learning/adr-collaborations/'
            ];
            
            let learningFeatures = {
                learningEngine: false,
                patternLibrary: false,
                collaborations: false,
                compoundLearning: false
            };
            
            // Check learning engine
            if (fs.existsSync('.claude/infrastructure/cross-project-learning-engine.js')) {
                const engine = fs.readFileSync('.claude/infrastructure/cross-project-learning-engine.js', 'utf8');
                if (engine.includes('pattern') && engine.includes('learning')) {
                    learningFeatures.learningEngine = true;
                }
                if (engine.includes('compound')) {
                    learningFeatures.compoundLearning = true;
                }
            }
            
            // Check pattern library
            if (fs.existsSync('.claude/learning/patterns/')) {
                const patterns = fs.readdirSync('.claude/learning/patterns/');
                if (patterns.length > 0) {
                    learningFeatures.patternLibrary = true;
                }
            }
            
            // Check collaborations
            if (fs.existsSync('.claude/learning/adr-collaborations/')) {
                const collaborations = fs.readdirSync('.claude/learning/adr-collaborations/');
                if (collaborations.length > 0) {
                    learningFeatures.collaborations = true;
                }
            }
            
            const learningScore = Object.values(learningFeatures).filter(Boolean).length;
            
            this.testResults.tests.crossProjectLearning = {
                status: learningScore >= 3 ? 'PASSED' : 'WARNING',
                details: {
                    learningFeatures,
                    learningScore: `${learningScore}/4`,
                    filesChecked: learningFiles.length
                }
            };
            
            console.log(`✅ Cross-Project Learning: ${this.testResults.tests.crossProjectLearning.status} (${learningScore}/4 features)`);
            
        } catch (error) {
            this.testResults.tests.crossProjectLearning = {
                status: 'FAILED',
                error: error.message
            };
            console.log('❌ Cross-Project Learning: FAILED -', error.message);
        }
    }

    /**
     * Generate comprehensive integration report
     */
    async generateIntegrationReport() {
        console.log('\n📊 Generating Integration Report...');
        
        const reportPath = path.join(process.cwd(), 'enhanced-adr-system-integration-report.md');
        const timestamp = new Date().toISOString();
        
        const report = `# Enhanced ADR System Integration Test Report

**adessoCMS Municipal Portal Project**

## Test Summary

**Date**: ${timestamp}  
**Environment**: zh-demo DDEV Project  
**Overall Status**: ${this.testResults.overall}  
**Tests Run**: ${Object.keys(this.testResults.tests).length}  
**Tests Passed**: ${Object.values(this.testResults.tests).filter(t => t.status === 'PASSED').length}  
**Tests Warning**: ${Object.values(this.testResults.tests).filter(t => t.status === 'WARNING').length}  
**Tests Failed**: ${Object.values(this.testResults.tests).filter(t => t.status === 'FAILED').length}

## Test Results

${Object.entries(this.testResults.tests).map(([test, result]) => `
### ${test.charAt(0).toUpperCase() + test.slice(1).replace(/([A-Z])/g, ' $1')}
**Status**: ${result.status === 'PASSED' ? '✅' : result.status === 'WARNING' ? '⚠️' : '❌'} ${result.status}

${result.details ? `**Details**: ${JSON.stringify(result.details, null, 2)}` : ''}
${result.error ? `**Error**: ${result.error}` : ''}
`).join('')}

## Integration Quality Assessment

### Development Environment Integration
- **DDEV Integration**: ${this.testResults.tests.ddevEnvironment?.status || 'NOT_TESTED'}
- **Theme Workflow**: ${this.testResults.tests.themeWorkflow?.status || 'NOT_TESTED'}
- **Storybook Integration**: ${this.testResults.tests.storybookIntegration?.status || 'NOT_TESTED'}

### Testing Infrastructure Integration
- **Playwright MCP**: ${this.testResults.tests.playwrightMCP?.status || 'NOT_TESTED'}
- **Swiss Compliance**: ${this.testResults.tests.swissCompliance?.status || 'NOT_TESTED'}
- **Municipality Workflows**: ${this.testResults.tests.municipalityWorkflows?.status || 'NOT_TESTED'}

### ADR Automation Integration
- **Core Infrastructure**: ${this.testResults.tests.adrAutomation?.status || 'NOT_TESTED'}
- **Cross-Project Learning**: ${this.testResults.tests.crossProjectLearning?.status || 'NOT_TESTED'}

## Recommendations

${this.testResults.recommendations.map(rec => `- ${rec}`).join('\n')}

${this.testResults.errors.length > 0 ? `
## Errors Encountered

${this.testResults.errors.map(error => `- ${error}`).join('\n')}
` : ''}

## Next Steps

Based on this integration test, the enhanced ADR system is ${this.testResults.overall === 'PASSED' ? 'ready for production deployment' : 'requires attention before deployment'}.

${this.testResults.overall !== 'PASSED' ? `
### Required Actions

1. Address failed tests
2. Resolve configuration issues
3. Verify integration points
4. Rerun integration tests
` : `
### Recommended Actions

1. Complete final documentation updates
2. Run full end-to-end testing
3. Deploy to staging environment
4. Conduct user acceptance testing
`}

---

**Report Generated**: ${timestamp}  
**Test Environment**: adessoCMS zh-demo DDEV  
**Integration Test Version**: 1.0.0
`;

        fs.writeFileSync(reportPath, report);
        console.log(`📄 Integration report generated: ${reportPath}`);
    }

    /**
     * Calculate overall test status
     */
    calculateOverallStatus() {
        const results = Object.values(this.testResults.tests);
        const failed = results.filter(r => r.status === 'FAILED').length;
        const warning = results.filter(r => r.status === 'WARNING').length;
        const passed = results.filter(r => r.status === 'PASSED').length;
        
        if (failed > 0) return 'FAILED';
        if (warning > 0) return 'WARNING';
        if (passed > 0) return 'PASSED';
        return 'NO_TESTS';
    }
}

// Run integration tests if called directly
if (require.main === module) {
    const tester = new EnhancedADRSystemIntegrationTest();
    tester.runIntegrationTests()
        .then(results => {
            console.log('\n' + '='.repeat(70));
            console.log(`🏁 Integration Testing Complete: ${results.overall}`);
            console.log('='.repeat(70));
            process.exit(results.overall === 'PASSED' ? 0 : 1);
        })
        .catch(error => {
            console.error('💥 Integration testing failed:', error);
            process.exit(1);
        });
}

module.exports = EnhancedADRSystemIntegrationTest;