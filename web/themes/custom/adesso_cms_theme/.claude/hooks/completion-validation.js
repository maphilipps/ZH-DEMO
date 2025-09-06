#!/usr/bin/env node

/**
 * Claude Code Completion Validation Hook
 * 
 * This hook validates task completion and ensures quality standards
 * are met before marking tasks as complete. Part of the compound
 * engineering framework for continuous improvement.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get the task completion context from environment or arguments
const taskContext = process.env.CLAUDE_TASK_CONTEXT || process.argv[2] || '';
const projectRoot = process.cwd();

console.log('🔍 Running completion validation...');

// Validation checks based on compound engineering principles
const validationChecks = [
  {
    name: 'Git Status Check',
    check: () => {
      try {
        const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
        return {
          passed: true, // Allow both clean and dirty states
          message: gitStatus.trim() ? 'Changes detected - ensure proper commit planning' : 'Working tree clean'
        };
      } catch (error) {
        return { passed: true, message: 'Git status check skipped' };
      }
    }
  },
  {
    name: 'Component Structure Check',
    check: () => {
      const componentsPath = path.join(projectRoot, 'components');
      if (!fs.existsSync(componentsPath)) {
        return { passed: true, message: 'No components directory found - skipping' };
      }
      
      // Check for proper SDC structure in modified components
      const componentDirs = fs.readdirSync(componentsPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
      
      let structureIssues = [];
      for (const componentDir of componentDirs) {
        const componentPath = path.join(componentsPath, componentDir);
        const requiredFiles = [
          `${componentDir}.twig`,
          `${componentDir}.component.yml`
        ];
        
        for (const requiredFile of requiredFiles) {
          if (!fs.existsSync(path.join(componentPath, requiredFile))) {
            structureIssues.push(`Missing ${requiredFile} in ${componentDir} component`);
          }
        }
      }
      
      return {
        passed: structureIssues.length === 0,
        message: structureIssues.length > 0 ? 
          `SDC structure issues: ${structureIssues.join(', ')}` : 
          `${componentDirs.length} components validated`
      };
    }
  },
  {
    name: 'Documentation Check',
    check: () => {
      // Check for basic documentation files
      const docFiles = [
        'README.md',
        'CLAUDE.md'
      ];
      
      const missingDocs = docFiles.filter(file => 
        !fs.existsSync(path.join(projectRoot, file))
      );
      
      return {
        passed: true, // Non-blocking for documentation
        message: missingDocs.length > 0 ? 
          `Consider adding: ${missingDocs.join(', ')}` : 
          'Documentation files present'
      };
    }
  }
];

// Run all validation checks
let allPassed = true;
console.log('\n📋 Validation Results:');

for (const validation of validationChecks) {
  try {
    const result = validation.check();
    const status = result.passed ? '✅' : '❌';
    console.log(`${status} ${validation.name}: ${result.message}`);
    
    if (!result.passed) {
      allPassed = false;
    }
  } catch (error) {
    console.log(`⚠️  ${validation.name}: Error during validation - ${error.message}`);
  }
}

// Summary and compound learning integration
console.log('\n📊 Completion Validation Summary:');
console.log(`Status: ${allPassed ? '✅ PASSED' : '⚠️  WARNINGS'}`);

if (taskContext) {
  console.log(`Context: ${taskContext}`);
}

// For compound engineering - log completion patterns
const completionLog = {
  timestamp: new Date().toISOString(),
  context: taskContext,
  validationStatus: allPassed ? 'passed' : 'warnings',
  projectRoot: projectRoot
};

// Write completion log for compound learning (non-blocking)
try {
  const logDir = path.join(projectRoot, '.claude', 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  const logFile = path.join(logDir, 'completion-validations.jsonl');
  fs.appendFileSync(logFile, JSON.stringify(completionLog) + '\n');
} catch (error) {
  // Non-blocking - don't fail the hook if logging fails
  console.log('📝 Note: Completion logging skipped');
}

console.log('\n🎯 Task completion validation finished.');

// Exit with success (non-blocking hook)
process.exit(0);