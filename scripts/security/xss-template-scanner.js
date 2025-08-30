const fs = require('fs');
const path = require('path');
const glob = require('glob');

// XSS vulnerability patterns in Twig templates
const xssPatterns = [
  { pattern: /\|\s*raw\s*\}/, risk: 'HIGH', description: 'Raw filter bypasses auto-escaping' },
  { pattern: /\{%\s*autoescape\s+false/, risk: 'HIGH', description: 'Auto-escaping disabled' },
  { pattern: /innerHTML\s*=/, risk: 'MEDIUM', description: 'Direct innerHTML assignment' },
  { pattern: /document\.write\s*\(/, risk: 'MEDIUM', description: 'document.write() usage' },
  { pattern: /eval\s*\(/, risk: 'HIGH', description: 'eval() function usage' },
  { pattern: /onclick\s*=/, risk: 'MEDIUM', description: 'Inline event handlers' },
  { pattern: /javascript:/, risk: 'HIGH', description: 'JavaScript URL scheme' }
];

// User-content contexts (high risk)
const userContentPatterns = [
  'title', 'summary', 'content', 'description', 'text', 'excerpt'
];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const findings = [];
  
  xssPatterns.forEach(({ pattern, risk, description }) => {
    const matches = [...content.matchAll(new RegExp(pattern, 'gi'))];
    matches.forEach(match => {
      const lineNum = content.substr(0, match.index).split('\n').length;
      
      // Check if in user content context
      const isUserContent = userContentPatterns.some(ctx => 
        content.substr(Math.max(0, match.index - 100), 200).toLowerCase().includes(ctx)
      );
      
      findings.push({
        file: filePath,
        line: lineNum,
        risk: isUserContent ? 'CRITICAL' : risk,
        pattern: pattern.source,
        description,
        context: match[0],
        userContent: isUserContent
      });
    });
  });
  
  return findings;
}

// Scan Twig templates
const templateFiles = glob.sync('components/**/*.twig', { ignore: 'node_modules/**' });
const allFindings = [];

templateFiles.forEach(file => {
  const findings = scanFile(file);
  allFindings.push(...findings);
});

// Report results
console.log(`🔍 Scanned ${templateFiles.length} Twig templates`);

const criticalCount = allFindings.filter(f => f.risk === 'CRITICAL').length;
const highCount = allFindings.filter(f => f.risk === 'HIGH').length;
const mediumCount = allFindings.filter(f => f.risk === 'MEDIUM').length;

console.log('🛡️ XSS Vulnerability Scan Results:');
console.log(`   🔴 Critical (User Content): ${criticalCount}`);
console.log(`   🟠 High Risk: ${highCount}`);
console.log(`   🟡 Medium Risk: ${mediumCount}`);

// Detailed findings for critical/high
allFindings
  .filter(f => f.risk === 'CRITICAL' || f.risk === 'HIGH')
  .forEach(finding => {
    console.log(`   ⚠️ ${finding.file}:${finding.line} - ${finding.description}`);
    if (finding.userContent) {
      console.log(`      🚨 USER CONTENT CONTEXT - Immediate fix required`);
    }
  });

// Swiss government compliance check
if (criticalCount > 0) {
  console.log('❌ Critical XSS vulnerabilities in user content - Swiss compliance violated');
  process.exit(1);
} else if (highCount > 5) {
  console.log('⚠️ High number of XSS risks detected - Review required');
  process.exit(1);
} else {
  console.log('✅ XSS prevention standards maintained');
}

// Save detailed report
fs.writeFileSync('xss-scan-results.json', JSON.stringify(allFindings, null, 2));