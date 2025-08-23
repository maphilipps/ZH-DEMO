import { defineConfig } from 'unlighthouse'

// Quick demo validation configuration (<5 minutes as per Issue #18)
export default defineConfig({
  site: 'http://web',
  
  scanner: {
    samples: 3,        // Limited samples for quick validation
    device: 'both',    // Mobile + Desktop
    throttle: false,   
    skipJavascript: false,
    crawler: true,
    maxRoutes: 10,     // Limited routes for speed
    robotsTxt: false,
    include: [
      '/',              // Homepage
      '/directory',     // Key directory page
      '/admin/content'  // Admin functionality
    ]
  },
  
  server: {
    port: 5678,
    host: '0.0.0.0'
  },
  
  lighthouseOptions: {
    onlyCategories: ['performance', 'accessibility'],  // Focus on critical metrics
    configContext: {
      throttlingMethod: 'simulate',
      screenEmulation: {
        mobile: {
          width: 375,
          height: 667,
          deviceScaleFactor: 2,
        },
        desktop: {
          width: 1920,
          height: 1080,
          deviceScaleFactor: 1,
        }
      }
    },
    puppeteerOptions: {
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  },
  
  ci: {
    budget: {
      performance: 90,      // Government requirement
      accessibility: 95,    // Swiss compliance
    },
    buildStatic: true
  },
  
  outputPath: './reports/unlighthouse-demo',
  
  hooks: {
    'lighthouse:before-audit': async (page) => {
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'de-CH,de;q=0.9,en;q=0.8'
      })
    },
    'lighthouse:after-audit': async (page, { report }) => {
      const perf = Math.round(report.lhr.categories.performance.score * 100)
      const a11y = Math.round(report.lhr.categories.accessibility.score * 100)
      console.log(`Demo Check - Performance: ${perf}%, Accessibility: ${a11y}% - ${report.lhr.finalUrl}`)
    }
  }
})