import { defineConfig } from 'unlighthouse'

// Desktop-only scanning configuration (Issue #18 requirement)
export default defineConfig({
  site: 'http://web',
  
  scanner: {
    samples: 0,        
    device: 'desktop', // Desktop only
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
        desktop: {
          width: 1920,    // Issue #18 spec: 1920x1080
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
      performance: 90,      
      accessibility: 95,    
      'best-practices': 85,
      seo: 85
    },
    buildStatic: true
  },
  
  outputPath: './reports/unlighthouse-desktop',
  
  hooks: {
    'lighthouse:before-audit': async (page) => {
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'de-CH,de;q=0.9,en;q=0.8'
      })
    },
    'lighthouse:after-audit': async (page, { report }) => {
      console.log('Desktop Audit:', {
        performance: Math.round(report.lhr.categories.performance.score * 100),
        accessibility: Math.round(report.lhr.categories.accessibility.score * 100),
        url: report.lhr.finalUrl,
        viewport: '1920x1080'
      })
    }
  }
})