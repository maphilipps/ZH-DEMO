import { defineConfig } from 'unlighthouse'

export default defineConfig({
  site: 'https://zh-demo.ddev.site',
  
  scanner: {
    samples: 0,        // Scan everything by default
    device: 'both',    // Mobile + Desktop by default
    throttle: false,   // Fast scanning for development
    skipJavascript: false,
    crawler: true,
    maxRoutes: 100,    // Reasonable limit for comprehensive scanning
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
    port: 5678,
    host: '0.0.0.0'
  },
  
  lighthouseOptions: {
    // Swiss compliance and accessibility focus
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    // Swiss Government Standards (eCH-0059) requirements
    configContext: {
      // Minimum accessibility score for Swiss compliance
      throttlingMethod: 'simulate',
      screenEmulation: {
        mobile: {
          width: 375,
          height: 667,
          deviceScaleFactor: 2,
        },
        desktop: {
          width: 1200,
          height: 900,
          deviceScaleFactor: 1,
        }
      }
    }
  },
  
  // CI/CD integration
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
        accessibility: report.lhr.categories.accessibility.score * 100,
        performance: report.lhr.categories.performance.score * 100,
        url: report.lhr.finalUrl
      })
    }
  }
})