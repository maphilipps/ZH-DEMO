#!/usr/bin/env node

/**
 * @file
 * Validation script for .stories.js to .stories.twig conversion
 * Checks conversion completeness and basic syntax validation
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const COMPONENTS_DIR = './components';
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';

function log(message, color = RESET) {
  console.log(`${color}${message}${RESET}`);
}

function findFiles(dir, pattern) {
  const files = [];
  
  function scan(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.isFile() && entry.name.match(pattern)) {
        files.push(fullPath);
      }
    }
  }
  
  scan(dir);
  return files;
}

function analyzeJsStory(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract title
    const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
    const title = titleMatch ? titleMatch[1] : null;
    
    // Count exports (stories)
    const exportMatches = content.match(/export\s+const\s+\w+/g) || [];
    const storyCount = exportMatches.length;
    
    // Extract component name from path
    const componentName = path.basename(path.dirname(filePath));
    
    return {
      componentName,
      title,
      storyCount,
      hasTemplate: content.includes('Template'),
      hasArgTypes: content.includes('argTypes'),
      hasPlay: content.includes('.play'),
      path: filePath
    };
  } catch (error) {
    return null;
  }
}

function analyzeTwigStory(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract title
    const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
    const title = titleMatch ? titleMatch[1] : null;
    
    // Count stories
    const storyMatches = content.match(/{%\s*story\s+\w+/g) || [];
    const storyCount = storyMatches.length;
    
    // Extract component name from path
    const componentName = path.basename(path.dirname(filePath));
    
    return {
      componentName,
      title,
      storyCount,
      hasSdcInclude: content.includes("include 'sdc:"),
      hasComplexData: content.includes('[') || content.includes('{'),
      hasComments: content.includes('{#'),
      path: filePath
    };
  } catch (error) {
    return null;
  }
}

function validateConversion() {
  log('\n🔍 STORYBOOK CONVERSION VALIDATION', BLUE);
  log('=====================================', BLUE);
  
  // Find all story files
  const jsFiles = findFiles(COMPONENTS_DIR, /\.stories\.js$/);
  const twigFiles = findFiles(COMPONENTS_DIR, /\.stories\.twig$/);
  
  log(`\n📊 STATISTICS:`, YELLOW);
  log(`   JavaScript stories: ${jsFiles.length}`);
  log(`   Twig stories: ${twigFiles.length}`);
  log(`   Conversion progress: ${Math.round((twigFiles.length / jsFiles.length) * 100)}%`);
  
  // Analyze converted components
  log(`\n✅ CONVERTED COMPONENTS:`, GREEN);
  const convertedComponents = new Set();
  
  twigFiles.forEach(file => {
    const analysis = analyzeTwigStory(file);
    if (analysis) {
      convertedComponents.add(analysis.componentName);
      log(`   ${analysis.componentName}:`);
      log(`      Title: ${analysis.title || 'Not found'}`);
      log(`      Stories: ${analysis.storyCount}`);
      log(`      SDC Include: ${analysis.hasSdcInclude ? '✓' : '✗'}`);
      log(`      Complex Data: ${analysis.hasComplexData ? '✓' : '✗'}`);
    }
  });
  
  // Analyze remaining components
  log(`\n⏳ REMAINING COMPONENTS:`, YELLOW);
  const remainingComponents = [];
  
  jsFiles.forEach(file => {
    const analysis = analyzeJsStory(file);
    if (analysis && !convertedComponents.has(analysis.componentName)) {
      remainingComponents.push(analysis);
    }
  });
  
  remainingComponents
    .sort((a, b) => a.componentName.localeCompare(b.componentName))
    .forEach(component => {
      log(`   ${component.componentName}:`);
      log(`      Title: ${component.title || 'Not found'}`);
      log(`      Stories: ${component.storyCount}`);
      log(`      Complexity: ${component.hasArgTypes ? 'Medium' : 'Simple'}`);
      log(`      Interactive: ${component.hasPlay ? '✓' : '✗'}`);
    });
  
  // Validation results
  log(`\n🎯 CONVERSION QUALITY:`, BLUE);
  
  // Check for matching pairs
  const matchedPairs = jsFiles.filter(jsFile => {
    const componentName = path.basename(path.dirname(jsFile));
    return twigFiles.some(twigFile => 
      path.basename(path.dirname(twigFile)) === componentName
    );
  });
  
  log(`   Components with both formats: ${matchedPairs.length}`);
  
  // Syntax validation for Twig files
  let syntaxErrors = 0;
  twigFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Basic Twig syntax validation
    const hasStoriesTag = content.includes('{% stories');
    const hasStoryTag = content.includes('{% story');
    const hasEndstory = content.includes('{% endstory %}');
    const hasEndstories = content.includes('{% endstories %}');
    
    if (!hasStoriesTag || !hasStoryTag || !hasEndstory || !hasEndstories) {
      syntaxErrors++;
      log(`   ❌ Syntax issue in ${path.basename(file)}`, RED);
    }
  });
  
  if (syntaxErrors === 0) {
    log(`   ✅ All Twig stories have valid syntax`, GREEN);
  }
  
  // Recommendations
  log(`\n💡 RECOMMENDATIONS:`, BLUE);
  
  if (twigFiles.length < jsFiles.length) {
    log(`   • Convert ${jsFiles.length - twigFiles.length} remaining components`);
  }
  
  if (remainingComponents.length > 0) {
    const simpleComponents = remainingComponents.filter(c => !c.hasArgTypes);
    const complexComponents = remainingComponents.filter(c => c.hasArgTypes);
    
    if (simpleComponents.length > 0) {
      log(`   • Start with ${simpleComponents.length} simple components: ${simpleComponents.slice(0, 3).map(c => c.componentName).join(', ')}`);
    }
    
    if (complexComponents.length > 0) {
      log(`   • Complex components need careful attention: ${complexComponents.slice(0, 3).map(c => c.componentName).join(', ')}`);
    }
  }
  
  const interactiveComponents = remainingComponents.filter(c => c.hasPlay);
  if (interactiveComponents.length > 0) {
    log(`   • ${interactiveComponents.length} components have interactive features to document`);
  }
  
  log(`\n🏁 NEXT STEPS:`, GREEN);
  log(`   1. Test current conversions with Drupal Storybook module`);
  log(`   2. Convert remaining ${remainingComponents.length} components`);
  log(`   3. Set up build pipeline for Twig → JSON compilation`);
  log(`   4. Validate all interactive features work correctly`);
  
  return {
    total: jsFiles.length,
    converted: twigFiles.length,
    remaining: remainingComponents.length,
    syntaxErrors,
    progress: Math.round((twigFiles.length / jsFiles.length) * 100)
  };
}

// Run validation
if (require.main === module) {
  const results = validateConversion();
  
  // Exit with appropriate code
  if (results.syntaxErrors > 0) {
    process.exit(1);
  } else if (results.converted === results.total) {
    log(`\n🎉 All components converted successfully!`, GREEN);
    process.exit(0);
  } else {
    log(`\n⚠️  Conversion in progress: ${results.progress}% complete`, YELLOW);
    process.exit(0);
  }
}

module.exports = { validateConversion, analyzeJsStory, analyzeTwigStory };