export default {
  site: 'http://web',
  scanner: {
    robotsTxt: false,
    samples: 3,
    maxRoutes: 50,
  },
  ci: {
    budget: {
      'performance': 90,
      'accessibility': 95,
      'best-practices': 90,
      'seo': 85
    },
    buildStatic: true
  },
  server: {
    host: '0.0.0.0',
    port: 5678
  }
}