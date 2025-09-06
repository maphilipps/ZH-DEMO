/**
 * @file
 * Storybook Integration Validation for Phase 2.2 Schema Enhancement
 * 
 * Tests integration between enhanced pagination component schema and:
 * - Existing JavaScript behaviors (593-line pager.behavior.js)
 * - Storybook stories for component showcase
 * - Template rendering performance with schema validation
 * - Municipal theming variations for Swiss government portals
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PaginationSchemaValidator } from './schema-validation-test.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class StorybookIntegrationValidator {
  constructor() {
    this.schemaValidator = new PaginationSchemaValidator();
    this.storiesData = {};
    this.behaviorTests = [];
    this.performanceMetrics = [];
  }

  /**
   * Load and parse Storybook stories to extract component data
   */
  loadStorybookStories() {
    console.log('📖 Loading Storybook stories for integration testing');
    
    try {
      const storiesPath = path.join(__dirname, 'pager.stories.js');
      const storiesContent = fs.readFileSync(storiesPath, 'utf8');
      
      // Extract story data patterns (simplified parsing for validation)
      const storyMatches = storiesContent.match(/export const (\w+) = {[\s\S]*?}/g) || [];
      
      console.log(`✅ Found ${storyMatches.length} story definitions`);
      
      // Parse common story patterns
      this.extractStoryDataPatterns(storiesContent);
      
      return {
        success: true,
        storiesFound: storyMatches.length,
        storiesPath
      };
      
    } catch (error) {
      console.error('❌ Failed to load Storybook stories:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Extract story data patterns from Storybook file
   */
  extractStoryDataPatterns(storiesContent) {
    // Extract Swiss municipal variations
    const municipalVariations = this.extractMunicipalVariations(storiesContent);
    console.log(`🏛️  Found ${municipalVariations.length} municipal variations`);
    
    // Extract accessibility configurations
    const a11yConfigs = this.extractA11yConfigurations(storiesContent);
    console.log(`♿ Found ${a11yConfigs.length} accessibility configurations`);
    
    // Store for validation
    this.storiesData = {
      municipalVariations,
      a11yConfigs,
      totalPatterns: municipalVariations.length + a11yConfigs.length
    };
  }

  /**
   * Extract municipal theme variations from stories
   */
  extractMunicipalVariations(content) {
    const variations = [];
    
    // Look for Thalwil, Thalheim, Erlenbach patterns
    const municipalities = ['Thalwil', 'Thalheim', 'Erlenbach'];
    
    municipalities.forEach(municipality => {
      if (content.includes(municipality)) {
        variations.push({
          municipality,
          canton: 'ZH', // Zurich canton
          found: true
        });
      }
    });
    
    return variations;
  }

  /**
   * Extract accessibility configurations from stories
   */
  extractA11yConfigurations(content) {
    const configs = [];
    
    // Look for accessibility-related patterns
    const a11yPatterns = [
      'aria_label',
      'accessibility_config',
      'multilingual_labels',
      'verbose_labels',
      'live_region_settings'
    ];
    
    a11yPatterns.forEach(pattern => {
      if (content.includes(pattern)) {
        configs.push({
          pattern,
          found: true
        });
      }
    });
    
    return configs;
  }

  /**
   * Validate JavaScript behavior integration
   */
  validateBehaviorIntegration() {
    console.log('\n🔧 Validating JavaScript Behavior Integration');
    console.log('=' .repeat(50));
    
    try {
      const behaviorPath = path.join(__dirname, 'pager.behavior.js');
      const behaviorContent = fs.readFileSync(behaviorPath, 'utf8');
      
      const integrationTests = [
        {
          name: 'ARIA Label Integration',
          pattern: 'aria-label',
          required: true,
          found: behaviorContent.includes('aria-label')
        },
        {
          name: 'Data Attributes Usage',
          pattern: 'data-',
          required: true,
          found: behaviorContent.includes('data-')
        },
        {
          name: 'Accessibility Features',
          pattern: 'aria-current',
          required: true,
          found: behaviorContent.includes('aria-current')
        },
        {
          name: 'AJAX Loading Support',
          pattern: 'loadPageContent',
          required: false,
          found: behaviorContent.includes('loadPageContent')
        },
        {
          name: 'Keyboard Navigation',
          pattern: 'keyboard',
          required: true,
          found: behaviorContent.toLowerCase().includes('keyboard')
        },
        {
          name: 'History Management',
          pattern: 'history',
          required: false,
          found: behaviorContent.toLowerCase().includes('history')
        }
      ];
      
      integrationTests.forEach(test => {
        const status = test.found ? '✅' : (test.required ? '❌' : '⚠️');
        const requirement = test.required ? 'Required' : 'Optional';
        console.log(`${status} ${test.name} (${requirement}): ${test.found ? 'Found' : 'Not Found'}`);
      });
      
      const requiredTests = integrationTests.filter(t => t.required);
      const passedRequired = requiredTests.filter(t => t.found).length;
      
      console.log(`\n📊 Integration Score: ${passedRequired}/${requiredTests.length} required features found`);
      
      this.behaviorTests = integrationTests;
      
      return {
        success: passedRequired === requiredTests.length,
        score: passedRequired / requiredTests.length,
        tests: integrationTests
      };
      
    } catch (error) {
      console.error('❌ Behavior integration validation failed:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Test schema validation with real Storybook data patterns
   */
  async validateWithStorybookData() {
    console.log('\n📋 Testing Schema with Storybook Data Patterns');
    console.log('=' .repeat(50));
    
    const testConfigurations = this.generateStorybookTestData();
    const validationResults = [];
    
    for (const config of testConfigurations) {
      const startTime = process.hrtime.bigint();
      
      try {
        // Use the existing schema validator
        const compilationResult = this.schemaValidator.validateSchemaCompliance();
        if (!compilationResult.valid) {
          throw new Error('Schema compilation failed');
        }
        
        const isValid = compilationResult.compiledSchema(config.data);
        const endTime = process.hrtime.bigint();
        const duration = Number(endTime - startTime) / 1000000;
        
        const result = {
          name: config.name,
          valid: isValid,
          duration,
          errors: isValid ? [] : compilationResult.compiledSchema.errors || []
        };
        
        validationResults.push(result);
        
        const status = isValid ? '✅' : '❌';
        console.log(`${status} ${config.name}: ${isValid ? 'Valid' : 'Invalid'} (${duration.toFixed(2)}ms)`);
        
        if (!isValid && result.errors.length > 0) {
          console.log(`   📝 Errors: ${result.errors.length} validation issues`);
        }
        
      } catch (error) {
        const endTime = process.hrtime.bigint();
        const duration = Number(endTime - startTime) / 1000000;
        
        validationResults.push({
          name: config.name,
          valid: false,
          duration,
          error: error.message
        });
        
        console.log(`❌ ${config.name}: Validation failed - ${error.message}`);
      }
    }
    
    // Performance analysis
    const durations = validationResults.map(r => r.duration);
    const avgDuration = durations.reduce((a, b) => a + b) / durations.length;
    const maxDuration = Math.max(...durations);
    
    console.log(`\n⏱️  Performance Summary:`);
    console.log(`   Average: ${avgDuration.toFixed(2)}ms`);
    console.log(`   Maximum: ${maxDuration.toFixed(2)}ms`);
    console.log(`   Target Met (≤10ms): ${maxDuration <= 10 ? '✅' : '❌'}`);
    
    this.performanceMetrics = {
      average: avgDuration,
      maximum: maxDuration,
      targetMet: maxDuration <= 10,
      results: validationResults
    };
    
    return validationResults;
  }

  /**
   * Generate test data based on Storybook story patterns
   */
  generateStorybookTestData() {
    return [
      {
        name: 'Thalwil Municipal Configuration',
        data: {
          heading_id: 'thalwil-pagination',
          current: 1,
          items: {
            pages: {
              '1': { href: '/thalwil/page/1', is_current: true }
            }
          },
          pagination_metadata: {
            total_items: 50,
            items_per_page: 10,
            total_pages: 5
          },
          accessibility_config: {
            pagination_label: 'Seitennavigation für Thalwil Gemeinde',
            multilingual_labels: {
              primary_language: 'de',
              fallback_language: 'fr'
            },
            municipal_theme_support: {
              canton: 'ZH',
              municipality: 'Thalwil',
              compliance_level: 'federal'
            }
          }
        }
      },
      {
        name: 'Multi-language Swiss Portal',
        data: {
          heading_id: 'multilang-pagination',
          current: 2,
          items: {
            previous: {
              href: '/page/1',
              title: 'Page précédente',
              aria_label: 'Aller à la page précédente, page 1'
            },
            next: {
              href: '/page/3',
              title: 'Page suivante',
              aria_label: 'Aller à la page suivante, page 3'
            },
            pages: {
              '1': { href: '/page/1' },
              '2': { href: '/page/2', is_current: true },
              '3': { href: '/page/3' }
            }
          },
          pagination_metadata: {
            total_items: 75,
            items_per_page: 25,
            total_pages: 3
          },
          accessibility_config: {
            multilingual_labels: {
              primary_language: 'fr',
              fallback_language: 'de',
              label_translations: {
                fr: {
                  previous_page: 'Page précédente',
                  next_page: 'Page suivante',
                  current_page: 'Page actuelle'
                },
                de: {
                  previous_page: 'Vorherige Seite',
                  next_page: 'Nächste Seite',
                  current_page: 'Aktuelle Seite'
                }
              }
            }
          }
        }
      },
      {
        name: 'Performance Optimized Configuration',
        data: {
          heading_id: 'perf-pagination',
          current: 5,
          items: {
            pages: {
              '1': { href: '/page/1' },
              '4': { href: '/page/4' },
              '5': { href: '/page/5', is_current: true },
              '6': { href: '/page/6' },
              '10': { href: '/page/10' }
            },
            ellipses: {
              '3': { show: true },
              '7': { show: true }
            }
          },
          pagination_metadata: {
            total_items: 1000,
            items_per_page: 100,
            total_pages: 10,
            performance_settings: {
              lazy_loading: true,
              batch_size: 50,
              preload_adjacent: true
            }
          }
        }
      }
    ];
  }

  /**
   * Run comprehensive Storybook integration validation
   */
  async runIntegrationValidation() {
    console.log('\n🎭 Storybook Integration Validation - Phase 2.2');
    console.log('Swiss Municipal Portal Component Integration Testing');
    console.log('=' .repeat(70));

    const results = {
      timestamp: new Date().toISOString(),
      storybookLoading: null,
      behaviorIntegration: null,
      schemaValidation: null,
      performanceMetrics: null,
      overallSuccess: false
    };

    try {
      // 1. Load Storybook stories
      results.storybookLoading = this.loadStorybookStories();
      
      // 2. Validate JavaScript behavior integration
      results.behaviorIntegration = this.validateBehaviorIntegration();
      
      // 3. Test schema validation with Storybook data
      results.schemaValidation = await this.validateWithStorybookData();
      
      // 4. Performance metrics
      results.performanceMetrics = this.performanceMetrics;
      
      // Overall success calculation
      results.overallSuccess = 
        results.storybookLoading?.success &&
        results.behaviorIntegration?.success &&
        this.performanceMetrics?.targetMet;
      
      // Generate summary
      this.generateIntegrationSummary(results);
      
      return results;
      
    } catch (error) {
      console.error('💥 Integration validation failed:', error.message);
      results.error = error.message;
      return results;
    }
  }

  /**
   * Generate integration validation summary
   */
  generateIntegrationSummary(results) {
    console.log('\n📊 Integration Validation Summary');
    console.log('=' .repeat(40));
    
    console.log(`📖 Storybook Loading: ${results.storybookLoading?.success ? '✅' : '❌'}`);
    console.log(`🔧 Behavior Integration: ${results.behaviorIntegration?.success ? '✅' : '❌'}`);
    console.log(`📋 Schema Validation: ${results.schemaValidation?.filter(r => r.valid).length}/${results.schemaValidation?.length || 0} passed`);
    console.log(`⚡ Performance Target: ${results.performanceMetrics?.targetMet ? '✅' : '❌'}`);
    console.log(`🎯 Overall Success: ${results.overallSuccess ? '✅' : '❌'}`);
    
    if (results.performanceMetrics) {
      console.log(`⏱️  Average Validation Time: ${results.performanceMetrics.average.toFixed(2)}ms`);
    }

    // Write integration report
    const reportPath = path.join(__dirname, 'STORYBOOK_INTEGRATION_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`📄 Integration report saved: ${reportPath}`);
  }
}

// Main execution function
async function main() {
  try {
    const validator = new StorybookIntegrationValidator();
    const results = await validator.runIntegrationValidation();
    
    if (!results.overallSuccess) {
      console.log('\n⚠️  Some integration tests failed. Review the report for details.');
      process.exit(1);
    } else {
      console.log('\n🎉 All integration tests passed successfully!');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('💥 Fatal error during integration testing:', error.message);
    process.exit(1);
  }
}

// Export for use in other tests
export { StorybookIntegrationValidator };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('💥 Unhandled error:', error);
    process.exit(1);
  });
}