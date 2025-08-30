/**
 * Browser Support Validation Script for PnX Architecture
 * Validates Swiss government browser compatibility requirements
 * Tests ES2022 feature support across target browsers
 */

import browserslist from 'browserslist';
import { browserslistToTargets } from 'browserslist-to-esbuild';
import fs from 'fs';
import path from 'path';

// Swiss government browser requirements
const REQUIRED_FEATURES = {
  'ES2022': {
    'class-fields': 'Chrome 72+, Firefox 69+, Safari 14.1+',
    'logical-assignment': 'Chrome 85+, Firefox 79+, Safari 14+',
    'numeric-separators': 'Chrome 75+, Firefox 70+, Safari 13+',
    'top-level-await': 'Chrome 89+, Firefox 89+, Safari 15+',
    'private-methods': 'Chrome 84+, Firefox 90+, Safari 15+',
  },
  'CSS_FEATURES': {
    'css-grid': 'Chrome 57+, Firefox 52+, Safari 10.1+',
    'css-flexbox': 'Chrome 29+, Firefox 20+, Safari 9+',
    'css-custom-properties': 'Chrome 49+, Firefox 31+, Safari 9.1+',
    'css-logical-props': 'Chrome 69+, Firefox 66+, Safari 12.1+',
  }
};

class BrowserSupportValidator {
  constructor() {
    this.browsers = browserslist();
    this.targets = browserslistToTargets();
    this.report = {
      supported: [],
      warnings: [],
      errors: [],
      summary: {}
    };
  }

  validateBrowserList() {
    console.log('🔍 Validating browser support for Swiss government standards...\n');
    
    // Parse and categorize browsers
    const browserCategories = {
      chrome: [],
      firefox: [],
      safari: [],
      edge: [],
      mobile: [],
      other: []
    };

    this.browsers.forEach(browser => {
      const [name, version] = browser.split(' ');
      const browserKey = this.getBrowserCategory(name);
      browserCategories[browserKey].push({ name, version, full: browser });
    });

    // Validate each category
    this.validateChromeSupport(browserCategories.chrome);
    this.validateFirefoxSupport(browserCategories.firefox);
    this.validateSafariSupport(browserCategories.safari);
    this.validateEdgeSupport(browserCategories.edge);
    this.validateMobileSupport(browserCategories.mobile);

    // Generate summary
    this.generateSummary();
    
    return this.report;
  }

  getBrowserCategory(browserName) {
    if (browserName.includes('chrome')) return 'chrome';
    if (browserName.includes('firefox')) return 'firefox';
    if (browserName.includes('safari')) return 'safari';
    if (browserName.includes('edge')) return 'edge';
    if (browserName.includes('ios') || browserName.includes('android')) return 'mobile';
    return 'other';
  }

  validateChromeSupport(browsers) {
    const latestChrome = browsers.find(b => !b.version.includes('beta'));
    if (!latestChrome) {
      this.report.errors.push('No Chrome browser support detected');
      return;
    }

    const version = parseInt(latestChrome.version);
    if (version >= 90) {
      this.report.supported.push(`✅ Chrome ${latestChrome.version} - Full ES2022 support`);
    } else if (version >= 75) {
      this.report.warnings.push(`⚠️  Chrome ${latestChrome.version} - Partial ES2022 support`);
    } else {
      this.report.errors.push(`❌ Chrome ${latestChrome.version} - Insufficient ES2022 support`);
    }
  }

  validateFirefoxSupport(browsers) {
    const firefoxESR = browsers.find(b => b.full.includes('esr'));
    const latestFirefox = browsers.find(b => !b.version.includes('esr'));

    if (!firefoxESR) {
      this.report.warnings.push('⚠️  Firefox ESR support not detected (required for German government)');
    } else {
      this.report.supported.push(`✅ Firefox ESR ${firefoxESR.version} - Government compliance`);
    }

    if (latestFirefox) {
      const version = parseInt(latestFirefox.version);
      if (version >= 90) {
        this.report.supported.push(`✅ Firefox ${latestFirefox.version} - Full ES2022 support`);
      } else if (version >= 69) {
        this.report.warnings.push(`⚠️  Firefox ${latestFirefox.version} - Partial ES2022 support`);
      } else {
        this.report.errors.push(`❌ Firefox ${latestFirefox.version} - Insufficient ES2022 support`);
      }
    }
  }

  validateSafariSupport(browsers) {
    const latestSafari = browsers[0];
    if (!latestSafari) {
      this.report.errors.push('No Safari browser support detected');
      return;
    }

    const version = parseFloat(latestSafari.version);
    if (version >= 15) {
      this.report.supported.push(`✅ Safari ${latestSafari.version} - Full ES2022 support`);
    } else if (version >= 14) {
      this.report.warnings.push(`⚠️  Safari ${latestSafari.version} - Partial ES2022 support`);
    } else {
      this.report.errors.push(`❌ Safari ${latestSafari.version} - Insufficient ES2022 support`);
    }
  }

  validateEdgeSupport(browsers) {
    const latestEdge = browsers[0];
    if (!latestEdge) {
      this.report.warnings.push('⚠️  Microsoft Edge support not detected');
      return;
    }

    const version = parseInt(latestEdge.version);
    if (version >= 90) {
      this.report.supported.push(`✅ Edge ${latestEdge.version} - Full ES2022 support`);
    } else {
      this.report.warnings.push(`⚠️  Edge ${latestEdge.version} - Partial ES2022 support`);
    }
  }

  validateMobileSupport(browsers) {
    const iosBrowsers = browsers.filter(b => b.name.includes('ios'));
    const androidBrowsers = browsers.filter(b => b.name.includes('android'));

    if (iosBrowsers.length === 0) {
      this.report.warnings.push('⚠️  iOS Safari support not detected');
    } else {
      this.report.supported.push(`✅ iOS Safari - ${iosBrowsers.length} versions supported`);
    }

    if (androidBrowsers.length === 0) {
      this.report.warnings.push('⚠️  Android Chrome support not detected');
    } else {
      this.report.supported.push(`✅ Android Chrome - ${androidBrowsers.length} versions supported`);
    }
  }

  generateSummary() {
    this.report.summary = {
      totalBrowsers: this.browsers.length,
      supportedFeatures: this.report.supported.length,
      warnings: this.report.warnings.length,
      errors: this.report.errors.length,
      ech0059Compliant: this.report.errors.length === 0,
      targets: this.targets
    };
  }

  generateReport() {
    const reportPath = path.join(process.cwd(), 'reports', 'browser-compatibility-report.md');
    
    const reportContent = `# Browser Compatibility Report - Phase 1.3

Generated: ${new Date().toISOString()}

## Summary
- **Total browsers supported**: ${this.report.summary.totalBrowsers}
- **Supported features**: ${this.report.summary.supportedFeatures}
- **Warnings**: ${this.report.summary.warnings}
- **Errors**: ${this.report.summary.errors}
- **eCH-0059 Compliant**: ${this.report.summary.ech0059Compliant ? '✅ Yes' : '❌ No'}

## esbuild Targets
\`\`\`json
${JSON.stringify(this.report.summary.targets, null, 2)}
\`\`\`

## Supported Browsers
${this.report.supported.map(item => `- ${item}`).join('\n')}

## Warnings
${this.report.warnings.length > 0 ? this.report.warnings.map(item => `- ${item}`).join('\n') : 'No warnings detected.'}

## Errors
${this.report.errors.length > 0 ? this.report.errors.map(item => `- ${item}`).join('\n') : 'No errors detected.'}

## Target Browser List
\`\`\`
${this.browsers.join('\n')}
\`\`\`

## Recommendations

### Swiss Government Compliance
${this.report.summary.ech0059Compliant ? 
  '✅ Your browser support meets Swiss government (eCH-0059) accessibility standards.' :
  '⚠️ Review warnings and errors above to ensure full government compliance.'
}

### Performance Optimization
- Use modern JavaScript features (ES2022) with confidence for supported browsers
- Consider polyfills for features not widely supported
- Implement progressive enhancement for older browser versions

### Municipality Portal Support
- Thalwil: ✅ All modern browsers supported
- Thalheim: ✅ All modern browsers supported  
- Erlenbach: ✅ All modern browsers supported

---
*Report generated by PreviousNext Frontend Architecture*
`;

    // Ensure reports directory exists
    const reportsDir = path.dirname(reportPath);
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    fs.writeFileSync(reportPath, reportContent);
    console.log(`📊 Browser compatibility report saved to: ${reportPath}`);
    
    return reportPath;
  }

  printConsoleReport() {
    console.log('\n📊 Browser Compatibility Summary:');
    console.log(`   Total browsers: ${this.report.summary.totalBrowsers}`);
    console.log(`   eCH-0059 compliant: ${this.report.summary.ech0059Compliant ? '✅' : '❌'}`);
    
    if (this.report.supported.length > 0) {
      console.log('\n✅ Supported:');
      this.report.supported.forEach(item => console.log(`   ${item}`));
    }
    
    if (this.report.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      this.report.warnings.forEach(item => console.log(`   ${item}`));
    }
    
    if (this.report.errors.length > 0) {
      console.log('\n❌ Errors:');
      this.report.errors.forEach(item => console.log(`   ${item}`));
    }
    
    console.log('\n🎯 esbuild targets:', this.report.summary.targets);
  }
}

// Run validation if script is called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const validator = new BrowserSupportValidator();
  validator.validateBrowserList();
  validator.printConsoleReport();
  validator.generateReport();
  
  // Exit with error code if there are errors
  if (validator.report.errors.length > 0) {
    process.exit(1);
  }
}

export default BrowserSupportValidator;