import { defineConfig } from 'unlighthouse'

export default defineConfig({
  site: 'http://web',
  
  scanner: {
    samples: 0,        // Scan everything for comprehensive analysis
    device: 'both',    // Mobile + Desktop as required by Issue #18
    throttle: false,   // Fast scanning for development
    skipJavascript: false,
    crawler: true,
    maxRoutes: 100,    // Reasonable limit for comprehensive scanning
    robotsTxt: false,  // Ignore robots.txt for complete scanning
    include: [
      '/',
      '/admin',
      '/admin/content',
      '/admin/people',
      '/node/*',
      '/taxonomy/*',
      '/search',
      '/directory',
      '/vereine',
      '/firmen',
      '/gastgewerbe'
    ]
  },
  
  server: {
    port: 5678,        // Issue #18 requirement: Port 5678
    host: '0.0.0.0'
  },
  
  lighthouseOptions: {
    // Swiss compliance and accessibility focus (Issue #18)
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    // Swiss Government Standards (eCH-0059) requirements
    configContext: {
      throttlingMethod: 'simulate',
      screenEmulation: {
        mobile: {
          width: 375,     // Issue #18 spec: 375x667
          height: 667,
          deviceScaleFactor: 2,
        },
        desktop: {
          width: 1920,    // Issue #18 spec: 1920x1080
          height: 1080,
          deviceScaleFactor: 1,
        }
      }
    },
    // Docker environment requirements
    puppeteerOptions: {
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  },
  
  // Issue #18 CI/CD integration requirements
  ci: {
    budget: {
      performance: 90,      // Required for government sites
      accessibility: 95,    // Swiss eCH-0059 compliance
      'best-practices': 85,
      seo: 85
    },
    buildStatic: true,      // Generate static reports
    uploads: {
      // Can be configured for artifact storage
    }
  },
  
  outputPath: './reports/unlighthouse',
  
  hooks: {
    // Custom validation hooks for Swiss compliance
    'lighthouse:before-audit': async (page) => {
      // Ensure Swiss German language settings
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'de-CH,de;q=0.9,en;q=0.8'
      })
    },
    'lighthouse:after-audit': async (page, { report }) => {
      // Log Swiss compliance specific metrics
      console.log('Swiss Compliance Check:', {
        accessibility: Math.round(report.lhr.categories.accessibility.score * 100),
        performance: Math.round(report.lhr.categories.performance.score * 100),
        url: report.lhr.finalUrl
      })
    }
  }
})