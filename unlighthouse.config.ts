import { defineConfig } from 'unlighthouse'

export default defineConfig({
  site: 'https://zh-demo.ddev.site',
  
  scanner: {
    samples: 3,        // Multiple samples for accuracy
    device: 'both',    // Mobile + Desktop for complete coverage
    throttle: false,   // Fast scanning for development
    skipJavascript: false,
    crawler: true,
    routeLimit: 150,   // Comprehensive scanning for GPZH demo
    include: [
      // Main site pages
      '/',
      '/node/add',
      '/admin/structure/block',
      '/admin/content',
      '/admin/people',
      
      // Content types and taxonomy
      '/node/*',
      '/taxonomy/*',
      '/search',
      
      // GPZH specific pages
      '/directory',
      '/vereine',
      '/firmen', 
      '/gastgewerbe',
      '/damage-report',
      '/contact',
      '/services',
      '/events',
      
      // Multi-language routes
      '/de/*',
      '/fr/*',
      '/en/*',
      
      // Forms and interactive pages
      '/webform/*',
      '/user/register',
      '/user/login'
    ],
    exclude: [
      // Admin paths that don't need public auditing
      '/admin/config/*',
      '/admin/modules',
      '/admin/themes',
      '/admin/reports/*',
      
      // Development/testing paths
      '/dev/*',
      '/test/*',
      '/*?preview=*',
      
      // File downloads and API endpoints
      '/sites/default/files/*',
      '/api/*',
      '/jsonapi/*'
    ],
    sitemap: true,     // Use sitemap.xml for comprehensive discovery
    robots: true       // Respect robots.txt
  },
  
  server: {
    port: 5678,
    host: '0.0.0.0'
  },
  
  lighthouseOptions: {
    // Swiss eCH-0059 government compliance categories
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    
    // Swiss-specific Lighthouse configuration
    configContext: {
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
      },
      
      // Swiss accessibility requirements
      settings: {
        formFactor: 'desktop',
        locale: 'de-CH',
        disableNetworkThrottling: true,
        emulatedUserAgent: 'Mozilla/5.0 (compatible; Lighthouse; Swiss-Compliance-Audit)'
      }
    }
  },
  
  // GPZH Präqualifikation compliance thresholds
  ci: {
    budget: {
      performance: 90,      // Swiss government performance requirement
      accessibility: 95,    // eCH-0059 accessibility standard (WCAG 2.1 AA)
      'best-practices': 88, // Security and modern web standards
      seo: 85              // Discoverability for municipal services
    },
    buildStatic: true,      // Generate artifacts for CI/CD pipeline
    uploads: {
      // Future: Configure for Swiss hosting provider uploads
      target: 'filesystem'
    },
    assert: {
      // Fail CI if thresholds not met
      assertMatrix: [
        { matchingUrlPattern: '.*', assertions: { 
          'categories:performance': ['error', { minScore: 0.9 }],
          'categories:accessibility': ['error', { minScore: 0.95 }],
          'categories:best-practices': ['error', { minScore: 0.88 }],
          'categories:seo': ['error', { minScore: 0.85 }]
        }}
      ]
    }
  },
  
  outputPath: './reports/unlighthouse-zh-demo',
  
  hooks: {
    // Swiss compliance and GPZH-specific validation
    'lighthouse:before-audit': async (page, { report }) => {
      // Set Swiss locale and language preferences
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'de-CH,de;q=0.9,fr-CH,fr;q=0.8,en;q=0.7'
      })
      
      // Set Swiss timezone for consistent testing
      await page.emulateTimezone('Europe/Zurich')
      
      // Wait for potential DDEV slowness
      await page.waitForTimeout(1000)
    },
    
    'lighthouse:after-audit': async (page, { report }) => {
      const scores = {
        performance: Math.round(report.lhr.categories.performance.score * 100),
        accessibility: Math.round(report.lhr.categories.accessibility.score * 100),
        bestPractices: Math.round(report.lhr.categories['best-practices'].score * 100),
        seo: Math.round(report.lhr.categories.seo.score * 100),
        url: report.lhr.finalUrl
      }
      
      // Swiss compliance validation
      const swissCompliant = {
        performance: scores.performance >= 90,
        accessibility: scores.accessibility >= 95,
        bestPractices: scores.bestPractices >= 88,
        seo: scores.seo >= 85
      }
      
      const overallCompliant = Object.values(swissCompliant).every(Boolean)
      
      console.log(`🇨🇭 Swiss eCH-0059 Compliance Check for ${scores.url}:`, {
        scores,
        compliance: swissCompliant,
        overall: overallCompliant ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'
      })
      
      // Log GPZH-specific metrics for demo preparation
      if (scores.url.includes('zh-demo.ddev.site')) {
        console.log('📊 GPZH Demo Readiness:', {
          readyForPresentation: overallCompliant,
          performanceGrade: scores.performance >= 95 ? 'A+' : scores.performance >= 90 ? 'A' : 'B',
          accessibilityGrade: scores.accessibility >= 95 ? 'A+' : 'B',
          timestamp: new Date().toISOString()
        })
      }
    }
  },
  
  // Custom client configuration for Swiss demo environment
  clientOptions: {
    columns: {
      // Prioritize Swiss compliance metrics
      accessibility: { sortable: true, order: 1 },
      performance: { sortable: true, order: 2 },
      'best-practices': { sortable: true, order: 3 },
      seo: { sortable: true, order: 4 }
    },
    groupByStatus: true,
    theme: {
      // GPZH branding colors (subtle integration)
      primaryColor: '#0052CC',      // Swiss blue for government sites
      backgroundColor: '#FAFAFA'    // Clean, accessible background
    }
  }
})