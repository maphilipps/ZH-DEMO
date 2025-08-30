#!/usr/bin/env node

/**
 * XSS Prevention Scanner for GPZH Municipal Portal
 * Phase 3.3 - Swiss Government Cybersecurity Standards (eCH-0194)
 * 
 * Comprehensive XSS vulnerability scanning for Twig templates and JavaScript
 * Implements citizen data protection and government security standards
 */

const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

// Swiss Government XSS Security Configuration
const SWISS_XSS_SECURITY = {
  standard: 'eCH-0194',
  citizenDataProtection: 'mandatory',
  municipalPortalSecurity: 'government-grade',
  xssPreventionLevel: 'comprehensive',
  userContentContexts: [
    'title', 'summary', 'content', 'description', 'text', 'excerpt', 
    'name', 'label', 'value', 'comment', 'message', 'search'
  ]
};

// XSS Vulnerability Patterns for Twig Templates
const TWIG_XSS_PATTERNS = [
  // High Risk - Direct XSS vulnerabilities
  {
    pattern: /\|\s*raw\s*\}/gi,
    risk: 'HIGH',
    category: 'RAW_FILTER',
    description: 'Raw filter bypasses Twig auto-escaping - XSS vulnerability',
    impact: 'Direct XSS execution in browser',
    swissCompliance: 'VIOLATION'
  },
  
  // Critical Risk - Auto-escaping disabled
  {
    pattern: /\{%\s*autoescape\s+false/gi,
    risk: 'CRITICAL',
    category: 'AUTOESCAPE_DISABLED',
    description: 'Twig auto-escaping disabled - multiple XSS vulnerabilities',
    impact: 'Complete XSS protection bypass',
    swissCompliance: 'VIOLATION'
  },
  
  // High Risk - Dangerous functions
  {
    pattern: /eval\s*\(/gi,
    risk: 'HIGH',
    category: 'CODE_EXECUTION',
    description: 'eval() function usage - code injection vulnerability',
    impact: 'Arbitrary code execution',
    swissCompliance: 'VIOLATION'
  },
  
  // Medium Risk - Inline event handlers
  {
    pattern: /on\w+\s*=\s*["'][^"']*["']/gi,
    risk: 'MEDIUM',
    category: 'INLINE_EVENTS',
    description: 'Inline event handlers - potential XSS vector',
    impact: 'JavaScript execution via events',
    swissCompliance: 'WARNING'
  },
  
  // Medium Risk - JavaScript URLs
  {
    pattern: /javascript\s*:/gi,
    risk: 'MEDIUM',
    category: 'JAVASCRIPT_URL',
    description: 'JavaScript URL scheme - XSS vector',
    impact: 'Script execution via URL',
    swissCompliance: 'WARNING'
  },
  
  // Medium Risk - innerHTML usage
  {
    pattern: /innerHTML\s*=/gi,
    risk: 'MEDIUM',
    category: 'INNERHTML',
    description: 'Direct innerHTML assignment - XSS risk',
    impact: 'HTML injection vulnerability',
    swissCompliance: 'WARNING'
  },
  
  // Medium Risk - document.write
  {
    pattern: /document\.write\s*\(/gi,
    risk: 'MEDIUM',
    category: 'DOCUMENT_WRITE',
    description: 'document.write() usage - XSS vulnerability',
    impact: 'DOM manipulation vulnerability',
    swissCompliance: 'WARNING'
  },
  
  // Low Risk - Potential unsafe patterns
  {
    pattern: /\$\{[^}]*\}/gi,
    risk: 'LOW',
    category: 'TEMPLATE_LITERAL',
    description: 'Template literal usage - review for XSS context',
    impact: 'Potential variable injection',
    swissCompliance: 'REVIEW'
  }
];

// User Content Context Patterns (High Priority for Municipal Portals)
const USER_CONTENT_PATTERNS = [
  // Critical - User-generated content in public contexts
  {
    pattern: /\{\{\s*(title|summary|content|description|text|excerpt)\s*\|\s*raw\s*\}\}/gi,
    risk: 'CRITICAL',
    category: 'USER_CONTENT_RAW',
    description: 'User content with raw filter - citizen data XSS vulnerability',
    context: 'USER_GENERATED',
    priority: 'IMMEDIATE'
  },
  
  // High - Search results and form inputs
  {
    pattern: /\{\{\s*(search|query|input|form)\w*\s*\|\s*raw\s*\}\}/gi,
    risk: 'HIGH',
    category: 'SEARCH_CONTENT_RAW',
    description: 'Search/form content with raw filter - XSS vulnerability',
    context: 'USER_INPUT',
    priority: 'HIGH'
  },
  
  // Medium - Administrative content
  {
    pattern: /\{\{\s*(admin|config|setting)\w*\s*\|\s*raw\s*\}\}/gi,
    risk: 'MEDIUM',
    category: 'ADMIN_CONTENT_RAW',
    description: 'Admin content with raw filter - review context',
    context: 'ADMINISTRATIVE',
    priority: 'MEDIUM'
  }
];

// JavaScript XSS Patterns
const JAVASCRIPT_XSS_PATTERNS = [
  {
    pattern: /\.innerHTML\s*=\s*[^;]+;/gi,
    risk: 'HIGH',
    category: 'INNERHTML_ASSIGNMENT',
    description: 'Direct innerHTML assignment without sanitization'
  },
  
  {
    pattern: /\.outerHTML\s*=\s*[^;]+;/gi,
    risk: 'HIGH',
    category: 'OUTERHTML_ASSIGNMENT',
    description: 'Direct outerHTML assignment without sanitization'
  },
  
  {
    pattern: /eval\s*\([^)]*\)/gi,
    risk: 'CRITICAL',
    category: 'EVAL_USAGE',
    description: 'eval() function usage - code injection risk'
  },
  
  {
    pattern: /Function\s*\([^)]*\)/gi,
    risk: 'HIGH',
    category: 'FUNCTION_CONSTRUCTOR',
    description: 'Function constructor usage - code injection risk'
  },
  
  {
    pattern: /setTimeout\s*\(\s*["'][^"']*["']/gi,
    risk: 'MEDIUM',
    category: 'SETTIMEOUT_STRING',
    description: 'setTimeout with string argument - code injection risk'
  }
];

class XSSScanner {
  constructor() {
    this.scanResults = {
      twigTemplates: [],
      javascriptFiles: [],
      userContentVulnerabilities: [],
      swissComplianceSummary: null,
      recommendations: []
    };
    
    this.stats = {
      filesScanned: 0,
      vulnerabilitiesFound: 0,
      criticalVulnerabilities: 0,
      highVulnerabilities: 0,
      mediumVulnerabilities: 0,
      lowVulnerabilities: 0
    };
  }

  /**
   * Scan all Twig templates for XSS vulnerabilities
   */
  scanTwigTemplates() {
    console.log('🔍 Scanning Twig templates for XSS vulnerabilities...');
    
    const twigFiles = globSync('components/**/*.twig', {
      ignore: ['node_modules/**', 'dist/**', 'storybook-static/**']
    });
    
    console.log(`   📄 Found ${twigFiles.length} Twig templates to scan`);
    
    twigFiles.forEach(filePath => {
      const templateResults = this.scanTwigFile(filePath);
      if (templateResults.vulnerabilities.length > 0) {
        this.scanResults.twigTemplates.push(templateResults);
      }
    });
    
    this.stats.filesScanned += twigFiles.length;
    console.log(`   ✅ Scanned ${twigFiles.length} Twig templates`);
    
    return this.scanResults.twigTemplates;
  }

  /**
   * Scan individual Twig file for XSS vulnerabilities
   */
  scanTwigFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const vulnerabilities = [];
    
    // Check against all XSS patterns
    TWIG_XSS_PATTERNS.forEach(patternConfig => {
      const matches = [...content.matchAll(patternConfig.pattern)];
      
      matches.forEach(match => {
        const lineNumber = this.getLineNumber(content, match.index);
        const context = this.getContext(content, match.index, 100);
        const isUserContent = this.isUserContentContext(context);
        
        vulnerabilities.push({
          file: filePath,
          line: lineNumber,
          pattern: patternConfig.pattern.source,
          risk: isUserContent ? 'CRITICAL' : patternConfig.risk,
          category: patternConfig.category,
          description: patternConfig.description,
          impact: patternConfig.impact,
          swissCompliance: patternConfig.swissCompliance,
          match: match[0],
          context: context.substring(0, 200) + '...',
          isUserContent: isUserContent,
          municipalImpact: this.assessMunicipalImpact(patternConfig.category, isUserContent)
        });
        
        this.updateStats(isUserContent ? 'CRITICAL' : patternConfig.risk);
      });
    });
    
    // Check for user content specific patterns
    USER_CONTENT_PATTERNS.forEach(patternConfig => {
      const matches = [...content.matchAll(patternConfig.pattern)];
      
      matches.forEach(match => {
        const lineNumber = this.getLineNumber(content, match.index);
        const context = this.getContext(content, match.index, 100);
        
        const userContentVuln = {
          file: filePath,
          line: lineNumber,
          risk: patternConfig.risk,
          category: patternConfig.category,
          description: patternConfig.description,
          context: patternConfig.context,
          priority: patternConfig.priority,
          match: match[0],
          citizenDataRisk: true,
          swissComplianceViolation: true
        };
        
        vulnerabilities.push(userContentVuln);
        this.scanResults.userContentVulnerabilities.push(userContentVuln);
        this.updateStats(patternConfig.risk);
      });
    });
    
    return {
      file: filePath,
      component: this.extractComponentName(filePath),
      municipality: this.extractMunicipalityContext(content),
      vulnerabilitiesCount: vulnerabilities.length,
      vulnerabilities,
      riskLevel: this.calculateRiskLevel(vulnerabilities),
      citizenDataAtRisk: vulnerabilities.some(v => v.isUserContent || v.citizenDataRisk),
      scanTimestamp: new Date().toISOString()
    };
  }

  /**
   * Scan JavaScript files for XSS vulnerabilities
   */
  scanJavaScriptFiles() {
    console.log('🔍 Scanning JavaScript files for XSS vulnerabilities...');
    
    const jsFiles = globSync(['components/**/*.js', 'src/**/*.js'], {
      ignore: [
        'node_modules/**',
        'dist/**',
        '**/*.test.js',
        '**/*.spec.js',
        '**/*.stories.js',
        'storybook-static/**'
      ]
    });
    
    console.log(`   📄 Found ${jsFiles.length} JavaScript files to scan`);
    
    jsFiles.forEach(filePath => {
      const jsResults = this.scanJavaScriptFile(filePath);
      if (jsResults.vulnerabilities.length > 0) {
        this.scanResults.javascriptFiles.push(jsResults);
      }
    });
    
    this.stats.filesScanned += jsFiles.length;
    console.log(`   ✅ Scanned ${jsFiles.length} JavaScript files`);
    
    return this.scanResults.javascriptFiles;
  }

  /**
   * Scan individual JavaScript file for XSS vulnerabilities
   */
  scanJavaScriptFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const vulnerabilities = [];
    
    JAVASCRIPT_XSS_PATTERNS.forEach(patternConfig => {
      const matches = [...content.matchAll(patternConfig.pattern)];
      
      matches.forEach(match => {
        const lineNumber = this.getLineNumber(content, match.index);
        const context = this.getContext(content, match.index, 100);
        
        vulnerabilities.push({
          file: filePath,
          line: lineNumber,
          pattern: patternConfig.pattern.source,
          risk: patternConfig.risk,
          category: patternConfig.category,
          description: patternConfig.description,
          match: match[0],
          context: context.substring(0, 200) + '...',
          swissCompliance: patternConfig.risk === 'CRITICAL' ? 'VIOLATION' : 'WARNING'
        });
        
        this.updateStats(patternConfig.risk);
      });
    });
    
    return {
      file: filePath,
      vulnerabilitiesCount: vulnerabilities.length,
      vulnerabilities,
      riskLevel: this.calculateRiskLevel(vulnerabilities),
      scanTimestamp: new Date().toISOString()
    };
  }

  /**
   * Validate Swiss eCH-0194 cybersecurity compliance
   */
  validateSwissCompliance() {
    console.log('🇨🇭 Validating eCH-0194 Swiss cybersecurity compliance...');
    
    const totalVulnerabilities = this.stats.vulnerabilitiesFound;
    const criticalVulnerabilities = this.stats.criticalVulnerabilities;
    const highVulnerabilities = this.stats.highVulnerabilities;
    const userContentVulnerabilities = this.scanResults.userContentVulnerabilities.length;
    
    // Swiss government compliance criteria
    const complianceChecks = {
      noCriticalXSSVulnerabilities: criticalVulnerabilities === 0,
      noUserContentXSS: userContentVulnerabilities === 0,
      limitedHighRiskVulnerabilities: highVulnerabilities <= 2,
      citizenDataProtectionCompliant: this.validateCitizenDataProtection(),
      municipalPortalSecurityStandards: this.validateMunicipalSecurity(),
      xssPreventionImplemented: this.validateXSSPrevention()
    };
    
    const passedChecks = Object.values(complianceChecks).filter(Boolean).length;
    const totalChecks = Object.keys(complianceChecks).length;
    const compliancePercentage = Math.round((passedChecks / totalChecks) * 100);
    
    console.log('📊 Swiss XSS Security Compliance Results:');
    Object.entries(complianceChecks).forEach(([check, passed]) => {
      const emoji = passed ? '✅' : '❌';
      console.log(`   ${emoji} ${this.formatCheckName(check)}`);
    });
    
    console.log(`\n🎯 Overall Compliance: ${passedChecks}/${totalChecks} (${compliancePercentage}%)`);
    
    const isCompliant = compliancePercentage >= 90; // Swiss government requirement
    
    if (isCompliant) {
      console.log('✅ XSS prevention meets eCH-0194 Swiss cybersecurity standards');
    } else {
      console.log('❌ XSS prevention requires improvements for Swiss government compliance');
    }
    
    this.scanResults.swissComplianceSummary = {
      compliant: isCompliant,
      percentage: compliancePercentage,
      passedChecks,
      totalChecks,
      checks: complianceChecks,
      criticalIssues: criticalVulnerabilities,
      userContentRisk: userContentVulnerabilities,
      recommendationsCount: this.generateRecommendations().length
    };
    
    return this.scanResults.swissComplianceSummary;
  }

  /**
   * Generate comprehensive XSS security recommendations
   */
  generateRecommendations() {
    console.log('📋 Generating XSS security recommendations...');
    
    const recommendations = [];
    
    // Critical vulnerabilities - immediate action required
    if (this.stats.criticalVulnerabilities > 0) {
      recommendations.push({
        priority: 'IMMEDIATE',
        category: 'CRITICAL_XSS',
        title: 'Fix Critical XSS Vulnerabilities',
        description: 'Remove |raw filters from user content contexts immediately',
        impact: 'Swiss government compliance violation - citizen data at risk',
        action: 'Replace |raw filters with proper escaping or sanitization'
      });
    }
    
    // User content vulnerabilities
    if (this.scanResults.userContentVulnerabilities.length > 0) {
      recommendations.push({
        priority: 'HIGH',
        category: 'USER_CONTENT',
        title: 'Secure User Content Rendering',
        description: 'Implement proper escaping for all user-generated content',
        impact: 'Citizen data protection and municipal portal security',
        action: 'Use Twig auto-escaping, validate and sanitize user input'
      });
    }
    
    // High risk vulnerabilities
    if (this.stats.highVulnerabilities > 0) {
      recommendations.push({
        priority: 'HIGH',
        category: 'XSS_PREVENTION',
        title: 'Implement Comprehensive XSS Prevention',
        description: 'Address high-risk XSS patterns in templates and scripts',
        impact: 'Government security standards compliance',
        action: 'Replace unsafe patterns, implement CSP headers'
      });
    }
    
    // General security improvements
    recommendations.push({
      priority: 'MEDIUM',
      category: 'SECURITY_HEADERS',
      title: 'Implement Security Headers',
      description: 'Add Content Security Policy and XSS protection headers',
      impact: 'Enhanced XSS protection for municipal portals',
      action: 'Configure CSP headers, X-XSS-Protection, X-Content-Type-Options'
    });
    
    recommendations.push({
      priority: 'MEDIUM',
      category: 'INPUT_VALIDATION',
      title: 'Enhance Input Validation',
      description: 'Implement server-side input validation and sanitization',
      impact: 'Citizen data protection and form security',
      action: 'Add input validation, CSRF protection, sanitization filters'
    });
    
    recommendations.push({
      priority: 'LOW',
      category: 'MONITORING',
      title: 'Implement XSS Monitoring',
      description: 'Set up automated XSS vulnerability monitoring',
      impact: 'Ongoing security maintenance for government portals',
      action: 'Schedule regular scans, implement security monitoring'
    });
    
    this.scanResults.recommendations = recommendations;
    console.log(`   ✅ Generated ${recommendations.length} security recommendations`);
    
    return recommendations;
  }

  /**
   * Generate comprehensive XSS security report
   */
  generateSecurityReport() {
    console.log('📄 Generating comprehensive XSS security report...');
    
    const report = {
      scanInfo: {
        timestamp: new Date().toISOString(),
        scanner: 'GPZH XSS Security Scanner',
        standard: SWISS_XSS_SECURITY.standard,
        target: 'GPZH Multi-Municipality Portal Components',
        municipalities: ['Thalwil', 'Thalheim', 'Erlenbach']
      },
      
      statistics: this.stats,
      
      vulnerabilitySummary: {
        totalVulnerabilities: this.stats.vulnerabilitiesFound,
        byRisk: {
          critical: this.stats.criticalVulnerabilities,
          high: this.stats.highVulnerabilities,
          medium: this.stats.mediumVulnerabilities,
          low: this.stats.lowVulnerabilities
        },
        userContentVulnerabilities: this.scanResults.userContentVulnerabilities.length,
        citizenDataAtRisk: this.scanResults.userContentVulnerabilities.length > 0
      },
      
      results: {
        twigTemplates: this.scanResults.twigTemplates,
        javascriptFiles: this.scanResults.javascriptFiles,
        userContentVulnerabilities: this.scanResults.userContentVulnerabilities
      },
      
      swissCompliance: this.scanResults.swissComplianceSummary,
      recommendations: this.scanResults.recommendations,
      
      municipalContext: {
        componentsScannd: this.stats.filesScanned,
        governmentSecurityStandards: 'eCH-0194',
        citizenDataProtection: 'GDPR + Swiss DPA',
        portalTypes: ['Thalwil Municipality', 'Thalheim Municipality', 'Erlenbach Municipality']
      },
      
      nextSteps: [
        'Address critical XSS vulnerabilities immediately',
        'Implement Content Security Policy headers', 
        'Enhance user content sanitization',
        'Schedule monthly XSS security scans',
        'Train development team on XSS prevention'
      ]
    };
    
    // Save report to file
    fs.writeFileSync('xss-security-report.json', JSON.stringify(report, null, 2));
    console.log('   ✅ Generated xss-security-report.json');
    
    return report;
  }

  // Helper methods

  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  }

  getContext(content, index, length = 100) {
    const start = Math.max(0, index - length);
    const end = Math.min(content.length, index + length);
    return content.substring(start, end);
  }

  isUserContentContext(context) {
    const lowerContext = context.toLowerCase();
    return SWISS_XSS_SECURITY.userContentContexts.some(pattern =>
      lowerContext.includes(pattern)
    );
  }

  extractComponentName(filePath) {
    const pathParts = filePath.split('/');
    const componentDir = pathParts.find((part, index) => 
      pathParts[index - 1] === 'components'
    );
    return componentDir || 'unknown';
  }

  extractMunicipalityContext(content) {
    const municipalities = ['thalwil', 'thalheim', 'erlenbach'];
    return municipalities.find(m => 
      content.toLowerCase().includes(m)
    ) || 'default';
  }

  calculateRiskLevel(vulnerabilities) {
    if (vulnerabilities.some(v => v.risk === 'CRITICAL')) return 'CRITICAL';
    if (vulnerabilities.some(v => v.risk === 'HIGH')) return 'HIGH';
    if (vulnerabilities.some(v => v.risk === 'MEDIUM')) return 'MEDIUM';
    return vulnerabilities.length > 0 ? 'LOW' : 'NONE';
  }

  assessMunicipalImpact(category, isUserContent) {
    const impacts = {
      'RAW_FILTER': isUserContent ? 'CITIZEN_DATA_EXPOSURE' : 'CONTENT_INJECTION',
      'AUTOESCAPE_DISABLED': 'WIDESPREAD_XSS_VULNERABILITY',
      'CODE_EXECUTION': 'SYSTEM_COMPROMISE',
      'INLINE_EVENTS': 'SCRIPT_INJECTION',
      'JAVASCRIPT_URL': 'MALICIOUS_REDIRECT'
    };
    
    return impacts[category] || 'SECURITY_RISK';
  }

  updateStats(risk) {
    this.stats.vulnerabilitiesFound++;
    
    switch (risk.toUpperCase()) {
      case 'CRITICAL':
        this.stats.criticalVulnerabilities++;
        break;
      case 'HIGH':
        this.stats.highVulnerabilities++;
        break;
      case 'MEDIUM':
        this.stats.mediumVulnerabilities++;
        break;
      case 'LOW':
        this.stats.lowVulnerabilities++;
        break;
    }
  }

  validateCitizenDataProtection() {
    return this.scanResults.userContentVulnerabilities.length === 0;
  }

  validateMunicipalSecurity() {
    return this.stats.criticalVulnerabilities === 0 && this.stats.highVulnerabilities <= 2;
  }

  validateXSSPrevention() {
    const totalHighRiskVulns = this.stats.criticalVulnerabilities + this.stats.highVulnerabilities;
    return totalHighRiskVulns <= 3; // Allow limited high-risk for development
  }

  formatCheckName(checkName) {
    return checkName.replace(/([A-Z])/g, ' $1')
                   .replace(/^./, str => str.toUpperCase())
                   .replace(/Xss/g, 'XSS');
  }
}

// Main execution
function runXSSSecurityScan() {
  console.log('🛡️ XSS Security Scanner for GPZH Municipal Portal');
  console.log('🇨🇭 Swiss Government Cybersecurity Standards (eCH-0194)');
  console.log('='.repeat(70));
  
  const scanner = new XSSScanner();
  
  try {
    console.log(`📋 Target: GPZH Multi-Municipality Portal`);
    console.log(`🎯 Focus: Citizen Data Protection & XSS Prevention`);
    console.log(`📜 Standard: ${SWISS_XSS_SECURITY.standard}\n`);
    
    // Scan Twig templates
    scanner.scanTwigTemplates();
    console.log('');
    
    // Scan JavaScript files
    scanner.scanJavaScriptFiles();
    console.log('');
    
    // Validate Swiss compliance
    const compliance = scanner.validateSwissCompliance();
    console.log('');
    
    // Generate recommendations
    scanner.generateRecommendations();
    console.log('');
    
    // Generate comprehensive report
    const report = scanner.generateSecurityReport();
    
    console.log('='.repeat(70));
    console.log('✅ XSS security scan completed');
    
    // Summary
    console.log('\n📊 Summary:');
    console.log(`   🔍 Files Scanned: ${scanner.stats.filesScanned}`);
    console.log(`   ⚠️  Total Vulnerabilities: ${scanner.stats.vulnerabilitiesFound}`);
    console.log(`   🚨 Critical: ${scanner.stats.criticalVulnerabilities}`);
    console.log(`   🔴 High: ${scanner.stats.highVulnerabilities}`);
    console.log(`   🟡 Medium: ${scanner.stats.mediumVulnerabilities}`);
    console.log(`   🟢 Low: ${scanner.stats.lowVulnerabilities}`);
    console.log(`   👤 User Content at Risk: ${scanner.scanResults.userContentVulnerabilities.length}`);
    console.log(`   🇨🇭 Swiss Compliance: ${compliance.compliant ? 'COMPLIANT' : 'NON-COMPLIANT'} (${compliance.percentage}%)`);
    
    // Exit with appropriate code for CI/CD
    if (!compliance.compliant) {
      console.log('\n❌ XSS security scan failed - Swiss government standards not met');
      process.exit(1);
    } else if (scanner.stats.criticalVulnerabilities > 0) {
      console.log('\n❌ Critical XSS vulnerabilities found - immediate action required');
      process.exit(1);
    } else {
      console.log('\n🇨🇭 XSS prevention meets Swiss government requirements');
      process.exit(0);
    }
    
  } catch (error) {
    console.error(`❌ XSS security scan failed: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runXSSSecurityScan();
}

module.exports = { XSSScanner, TWIG_XSS_PATTERNS, USER_CONTENT_PATTERNS };