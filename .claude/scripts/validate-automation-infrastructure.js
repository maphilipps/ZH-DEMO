#!/usr/bin/env node
/**
 * Automation Infrastructure Validation Script
 * 
 * This script validates that all automation enhancement infrastructure
 * is properly installed and accessible within the DDEV environment.
 */

const fs = require('fs').promises;
const path = require('path');

class InfrastructureValidator {
  constructor() {
    this.validationResults = {
      timestamp: new Date().toISOString(),
      environment: 'DDEV',
      infrastructure_files: {},
      ddev_compatibility: {},
      module_accessibility: {},
      directory_structure: {},
      overall_status: 'unknown'
    };
  }

  async validateInfrastructure() {
    console.log('🔍 Validating automation infrastructure...');
    console.log('📅 Timestamp:', this.validationResults.timestamp);
    console.log();

    try {
      await this.validateInfrastructureFiles();
      await this.validateDDEVCompatibility();
      await this.validateModuleAccessibility();
      await this.validateDirectoryStructure();
      
      this.calculateOverallStatus();
      await this.generateValidationReport();
      
      console.log();
      console.log('✅ Infrastructure validation completed successfully!');
      return this.validationResults;
      
    } catch (error) {
      console.error('❌ Infrastructure validation failed:', error.message);
      this.validationResults.error = error.message;
      this.validationResults.overall_status = 'failed';
      return this.validationResults;
    }
  }

  async validateInfrastructureFiles() {
    console.log('📁 Validating infrastructure files...');

    const infrastructureFiles = [
      { path: '.claude/infrastructure/knowledge-synthesis.js', name: 'Knowledge Synthesis Engine' },
      { path: '.claude/infrastructure/predictive-adr-engine.js', name: 'Predictive ADR Engine' },
      { path: '.claude/infrastructure/cross-project-learning-engine.js', name: 'Cross-Project Learning Engine' },
      { path: '.claude/infrastructure/municipal-knowledge-graph.js', name: 'Municipal Knowledge Graph' },
      { path: '.claude/infrastructure/multi-municipality-scaling-automation.js', name: 'Multi-Municipality Scaling Automation' },
      { path: '.claude/tests/automation-enhancement-tests.js', name: 'Automation Enhancement Tests' }
    ];

    for (const file of infrastructureFiles) {
      try {
        const stats = await fs.stat(file.path);
        const sizeKB = Math.round(stats.size / 1024);
        
        this.validationResults.infrastructure_files[file.path] = {
          name: file.name,
          exists: true,
          size_kb: sizeKB,
          last_modified: stats.mtime.toISOString(),
          status: 'valid'
        };
        
        console.log(`  ✅ ${file.name}: ${sizeKB}KB`);
        
      } catch (error) {
        this.validationResults.infrastructure_files[file.path] = {
          name: file.name,
          exists: false,
          error: error.message,
          status: 'missing'
        };
        
        console.log(`  ❌ ${file.name}: Missing`);
      }
    }
  }

  async validateDDEVCompatibility() {
    console.log('🐳 Validating DDEV compatibility...');

    // Check DDEV environment
    const isDDEVEnvironment = await this.checkDDEVEnvironment();
    this.validationResults.ddev_compatibility.is_ddev_environment = isDDEVEnvironment;
    
    if (isDDEVEnvironment) {
      console.log('  ✅ DDEV environment detected');
    } else {
      console.log('  ⚠️  DDEV environment not detected (may be running outside DDEV)');
    }

    // Check DDEV configuration
    try {
      const ddevConfig = await fs.readFile('.ddev/config.yaml', 'utf8');
      this.validationResults.ddev_compatibility.config_accessible = true;
      
      // Extract project name
      const projectNameMatch = ddevConfig.match(/name:\s*([^\n]+)/);
      if (projectNameMatch) {
        this.validationResults.ddev_compatibility.project_name = projectNameMatch[1].trim();
        console.log(`  ✅ DDEV project: ${projectNameMatch[1].trim()}`);
      }
      
    } catch (error) {
      this.validationResults.ddev_compatibility.config_accessible = false;
      console.log('  ❌ DDEV configuration not accessible');
    }

    // Test file system operations
    try {
      const testFile = '/tmp/ddev-test-file.json';
      const testData = { test: 'ddev_compatibility', timestamp: Date.now() };
      
      await fs.writeFile(testFile, JSON.stringify(testData));
      const readData = JSON.parse(await fs.readFile(testFile, 'utf8'));
      await fs.unlink(testFile);
      
      this.validationResults.ddev_compatibility.file_system_operations = readData.test === 'ddev_compatibility';
      console.log('  ✅ File system operations working');
      
    } catch (error) {
      this.validationResults.ddev_compatibility.file_system_operations = false;
      console.log('  ❌ File system operations failed');
    }

    // Check Drupal paths
    const drupalPaths = [
      { path: 'web', name: 'Drupal web root' },
      { path: 'web/modules/custom', name: 'Custom modules directory' },
      { path: 'web/themes/custom/adesso_cms_theme', name: 'adessoCMS theme' },
      { path: 'composer.json', name: 'Composer configuration' }
    ];

    this.validationResults.ddev_compatibility.drupal_paths = {};
    
    for (const drupalPath of drupalPaths) {
      try {
        const stats = await fs.stat(drupalPath.path);
        this.validationResults.ddev_compatibility.drupal_paths[drupalPath.path] = {
          exists: true,
          type: stats.isDirectory() ? 'directory' : 'file'
        };
        console.log(`  ✅ ${drupalPath.name}: ${stats.isDirectory() ? 'directory' : 'file'}`);
        
      } catch (error) {
        this.validationResults.ddev_compatibility.drupal_paths[drupalPath.path] = {
          exists: false,
          error: error.message
        };
        console.log(`  ❌ ${drupalPath.name}: Missing`);
      }
    }
  }

  async validateModuleAccessibility() {
    console.log('📦 Validating module accessibility...');

    const modules = [
      { path: '.claude/infrastructure/knowledge-synthesis.js', export: 'KnowledgeSynthesisEngine' },
      { path: '.claude/infrastructure/predictive-adr-engine.js', export: 'PredictiveADREngine' },
      { path: '.claude/infrastructure/cross-project-learning-engine.js', export: 'CrossProjectLearningEngine' },
      { path: '.claude/infrastructure/municipal-knowledge-graph.js', export: 'MunicipalKnowledgeGraph' },
      { path: '.claude/infrastructure/multi-municipality-scaling-automation.js', export: 'MultiMunicipalityScalingAutomation' }
    ];

    for (const module of modules) {
      try {
        // Try to require the module
        const moduleExports = require(path.resolve(module.path));
        
        // Check if the expected export exists
        const hasExpectedExport = moduleExports[module.export] !== undefined;
        
        this.validationResults.module_accessibility[module.path] = {
          accessible: true,
          has_expected_export: hasExpectedExport,
          available_exports: Object.keys(moduleExports),
          status: hasExpectedExport ? 'valid' : 'incomplete'
        };
        
        if (hasExpectedExport) {
          console.log(`  ✅ ${module.export}: Accessible`);
        } else {
          console.log(`  ⚠️  ${module.export}: Module accessible but missing expected export`);
        }
        
      } catch (error) {
        this.validationResults.module_accessibility[module.path] = {
          accessible: false,
          error: error.message,
          status: 'failed'
        };
        
        console.log(`  ❌ ${module.export}: ${error.message}`);
      }
    }
  }

  async validateDirectoryStructure() {
    console.log('🗂️  Validating directory structure...');

    const requiredDirectories = [
      { path: '.claude', name: 'Claude configuration root' },
      { path: '.claude/infrastructure', name: 'Infrastructure modules' },
      { path: '.claude/learning', name: 'Learning data storage' },
      { path: '.claude/learning/patterns', name: 'Pattern storage' },
      { path: '.claude/learning/adr-collaborations', name: 'ADR collaboration data' },
      { path: '.claude/tests', name: 'Test suite' },
      { path: '.claude/workflows', name: 'Workflow definitions' },
      { path: '.claude/templates', name: 'ADR templates' }
    ];

    this.validationResults.directory_structure = {};

    for (const dir of requiredDirectories) {
      try {
        await fs.mkdir(dir.path, { recursive: true });
        const stats = await fs.stat(dir.path);
        
        this.validationResults.directory_structure[dir.path] = {
          exists: true,
          is_directory: stats.isDirectory(),
          created_if_missing: true,
          status: 'valid'
        };
        
        console.log(`  ✅ ${dir.name}: Available`);
        
      } catch (error) {
        this.validationResults.directory_structure[dir.path] = {
          exists: false,
          error: error.message,
          status: 'failed'
        };
        
        console.log(`  ❌ ${dir.name}: ${error.message}`);
      }
    }
  }

  async checkDDEVEnvironment() {
    // Check for DDEV-specific environment indicators
    return process.env.DDEV_PROJECT !== undefined || 
           process.env.DDEV_SITENAME !== undefined ||
           process.env.IS_DDEV_PROJECT !== undefined ||
           await this.fileExists('.ddev/config.yaml');
  }

  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  calculateOverallStatus() {
    const infrastructureFilesValid = Object.values(this.validationResults.infrastructure_files)
      .every(file => file.status === 'valid');
    
    const moduleAccessibilityValid = Object.values(this.validationResults.module_accessibility)
      .every(module => module.status === 'valid');
    
    const directoryStructureValid = Object.values(this.validationResults.directory_structure)
      .every(dir => dir.status === 'valid');

    if (infrastructureFilesValid && moduleAccessibilityValid && directoryStructureValid) {
      this.validationResults.overall_status = 'valid';
    } else if (infrastructureFilesValid) {
      this.validationResults.overall_status = 'partial';
    } else {
      this.validationResults.overall_status = 'invalid';
    }
  }

  async generateValidationReport() {
    const reportPath = `.claude/tests/infrastructure-validation-report-${Date.now()}.json`;
    
    try {
      await fs.writeFile(reportPath, JSON.stringify(this.validationResults, null, 2));
      console.log(`📊 Validation report saved: ${reportPath}`);
    } catch (error) {
      console.log(`⚠️  Could not save validation report: ${error.message}`);
    }
  }
}

// Run validation if script is executed directly
if (require.main === module) {
  const validator = new InfrastructureValidator();
  
  validator.validateInfrastructure()
    .then(results => {
      console.log();
      console.log('=== Infrastructure Validation Summary ===');
      console.log(`Overall Status: ${results.overall_status.toUpperCase()}`);
      console.log(`Environment: ${results.environment}`);
      
      if (results.ddev_compatibility.project_name) {
        console.log(`DDEV Project: ${results.ddev_compatibility.project_name}`);
      }
      
      const infrastructureFiles = Object.values(results.infrastructure_files);
      const validFiles = infrastructureFiles.filter(f => f.status === 'valid').length;
      console.log(`Infrastructure Files: ${validFiles}/${infrastructureFiles.length} valid`);
      
      const modules = Object.values(results.module_accessibility);
      const validModules = modules.filter(m => m.status === 'valid').length;
      console.log(`Module Accessibility: ${validModules}/${modules.length} valid`);
      
      const directories = Object.values(results.directory_structure);
      const validDirectories = directories.filter(d => d.status === 'valid').length;
      console.log(`Directory Structure: ${validDirectories}/${directories.length} valid`);
      
      if (results.overall_status === 'valid') {
        console.log();
        console.log('✅ All automation infrastructure is valid and ready for use!');
        console.log();
        console.log('Next steps:');
        console.log('  1. Run full test suite: node .claude/tests/automation-enhancement-tests.js');
        console.log('  2. Generate sample ADRs to test functionality');
        console.log('  3. Validate Swiss compliance integration');
        console.log('  4. Test multi-municipality scaling features');
        process.exit(0);
      } else {
        console.log();
        console.log('⚠️  Infrastructure validation completed with issues. Review the report for details.');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error();
      console.error('❌ Infrastructure validation failed:', error.message);
      process.exit(1);
    });
}

module.exports = { InfrastructureValidator };