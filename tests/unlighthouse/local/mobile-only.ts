import { defineConfig } from 'unlighthouse'

// Mobile-only scanning configuration (Issue #18 requirement)
export default defineConfig({
  site: 'http://web',
  
  scanner: {
    samples: 0,        
    device: 'mobile',  // Mobile only
    throttle: false,   
    skipJavascript: false,
    crawler: true,
    maxRoutes: 100,    
    robotsTxt: false,
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
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    configContext: {
      throttlingMethod: 'simulate',
      screenEmulation: {
        mobile: {
          width: 375,     // Issue #18 spec: 375x667
          height: 667,
          deviceScaleFactor: 2,
        }
      }
    },
    puppeteerOptions: {
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  },
  
  ci: {
    budget: {
      performance: 90,      
      accessibility: 95,    
      'best-practices': 85,
      seo: 85
    },
    buildStatic: true
  },
  
  outputPath: './reports/unlighthouse-mobile',
  
  hooks: {
    'lighthouse:before-audit': async (page) => {
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'de-CH,de;q=0.9,en;q=0.8'
      })
    },
    'lighthouse:after-audit': async (page, { report }) => {
      console.log('Mobile Audit:', {
        performance: Math.round(report.lhr.categories.performance.score * 100),
        accessibility: Math.round(report.lhr.categories.accessibility.score * 100),
        url: report.lhr.finalUrl,
        viewport: '375x667'
      })
    }
  }
})