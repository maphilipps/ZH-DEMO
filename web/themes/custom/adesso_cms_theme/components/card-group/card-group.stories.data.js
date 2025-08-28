/**
 * @file
 * Sample data for Card Group component stories.
 *
 * This file contains realistic business and technology content
 * for demonstrating the Card Group component in various contexts.
 */

export default {
  /**
   * Business services with mixed card types
   */
  businessServices: {
    section_title: 'Our Core Services',
    pre_headline: 'What We Offer',
    columns: '3',
    card_items: [
      {
        type: 'custom',
        media: `
          <div class="w-full h-48 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
        `,
        heading: {
          title: 'Digital Strategy Consulting',
          level: 'h3',
        },
        summary_text:
          'Transform your business with comprehensive digital strategies that deliver measurable results and competitive advantage.',
        link: {
          url: '/services/digital-strategy',
          title: 'Learn More',
        },
        tags: [
          { name: 'Strategy', color: 'blue' },
          { name: 'Consulting', color: 'green' },
        ],
      },
      {
        type: 'stat',
        icon: 'code',
        heading: {
          title: 'Enterprise Development',
          level: 'h3',
        },
        body: 'Custom software solutions built with modern technologies and best practices for scalability and performance.',
        link: {
          url: '/services/development',
          title: 'View Projects',
        },
        media: `
          <div class="text-3xl font-bold text-purple-600 mb-2">500+</div>
          <div class="text-sm text-gray-600">Projects Delivered</div>
        `,
      },
      {
        type: 'custom',
        media: `
          <div class="w-full h-48 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
            </svg>
          </div>
        `,
        heading: {
          title: 'Cloud Solutions & Migration',
          level: 'h3',
        },
        summary_text:
          'Seamless cloud adoption with comprehensive migration services and ongoing optimization for maximum efficiency.',
        link: {
          url: '/services/cloud',
          title: 'Explore Solutions',
        },
        tags: [
          { name: 'AWS', color: 'orange' },
          { name: 'Azure', color: 'blue' },
          { name: 'Migration', color: 'purple' },
        ],
      },
    ],
  },

  /**
   * Technology services showcase
   */
  technologyServices: {
    section_title: 'Technology Expertise',
    pre_headline: 'Platform & Development',
    columns: '3',
    card_items: [
      {
        type: 'stat',
        icon: 'smartphone',
        heading: {
          title: 'Mobile Development',
          level: 'h3',
        },
        body: 'Native and cross-platform mobile applications with exceptional user experience and performance optimization.',
        link: {
          url: '/services/mobile',
          title: 'View Apps',
        },
        media: `
          <div class="text-3xl font-bold text-blue-600 mb-2">4.8★</div>
          <div class="text-sm text-gray-600">Average App Rating</div>
        `,
      },
      {
        type: 'stat',
        icon: 'server',
        heading: {
          title: 'API Development',
          level: 'h3',
        },
        body: 'Scalable REST and GraphQL APIs with comprehensive documentation and enterprise-grade security.',
        link: {
          url: '/services/api',
          title: 'API Documentation',
        },
        media: `
          <div class="text-3xl font-bold text-green-600 mb-2">99.9%</div>
          <div class="text-sm text-gray-600">API Uptime</div>
        `,
      },
      {
        type: 'stat',
        icon: 'database',
        heading: {
          title: 'Data Analytics',
          level: 'h3',
        },
        body: 'Advanced analytics solutions with real-time insights, predictive modeling, and interactive dashboards.',
        link: {
          url: '/services/analytics',
          title: 'See Examples',
        },
        media: `
          <div class="text-3xl font-bold text-purple-600 mb-2">1M+</div>
          <div class="text-sm text-gray-600">Data Points Processed</div>
        `,
      },
    ],
  },

  /**
   * Company statistics
   */
  companyStats: {
    section_title: 'Our Impact',
    pre_headline: 'By the Numbers',
    columns: '3',
    card_items: [
      {
        type: 'stat',
        icon: 'users',
        heading: {
          title: 'Happy Clients',
          level: 'h3',
        },
        body: 'Trusted by businesses worldwide for digital transformation and technology solutions.',
        media: `
          <div class="text-4xl font-bold text-blue-600 mb-2">250+</div>
          <div class="text-sm text-gray-600">Global Clients</div>
        `,
      },
      {
        type: 'stat',
        icon: 'award',
        heading: {
          title: 'Years of Excellence',
          level: 'h3',
        },
        body: 'Over a decade of innovation and excellence in digital solutions and technology consulting.',
        media: `
          <div class="text-4xl font-bold text-green-600 mb-2">12+</div>
          <div class="text-sm text-gray-600">Years Experience</div>
        `,
      },
      {
        type: 'stat',
        icon: 'trending-up',
        heading: {
          title: 'Success Rate',
          level: 'h3',
        },
        body: 'Consistently delivering successful projects on time and within budget for client satisfaction.',
        media: `
          <div class="text-4xl font-bold text-purple-600 mb-2">98%</div>
          <div class="text-sm text-gray-600">Project Success</div>
        `,
      },
      {
        type: 'stat',
        icon: 'globe',
        heading: {
          title: 'Global Reach',
          level: 'h3',
        },
        body: 'International presence with teams and clients across multiple continents and time zones.',
        media: `
          <div class="text-4xl font-bold text-orange-600 mb-2">25</div>
          <div class="text-sm text-gray-600">Countries Served</div>
        `,
      },
    ],
  },

  /**
   * Team members
   */
  teamMembers: {
    section_title: 'Meet Our Team',
    pre_headline: 'Leadership',
    columns: '3',
    card_items: [
      {
        type: 'custom',
        media: `
          <div class="w-full h-48 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        `,
        heading: {
          title: 'Sarah Chen',
          level: 'h3',
        },
        summary_text:
          'Chief Technology Officer with 15+ years in enterprise software development and digital transformation leadership.',
        link: {
          url: '/team/sarah-chen',
          title: 'View Profile',
        },
        tags: [
          { name: 'CTO', color: 'blue' },
          { name: 'Leadership', color: 'purple' },
        ],
      },
      {
        type: 'custom',
        media: `
          <div class="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        `,
        heading: {
          title: 'Marcus Rodriguez',
          level: 'h3',
        },
        summary_text:
          'Lead Solutions Architect specializing in cloud infrastructure and enterprise system integration.',
        link: {
          url: '/team/marcus-rodriguez',
          title: 'View Profile',
        },
        tags: [
          { name: 'Architecture', color: 'green' },
          { name: 'Cloud', color: 'orange' },
        ],
      },
      {
        type: 'custom',
        media: `
          <div class="w-full h-48 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        `,
        heading: {
          title: 'Dr. Emily Watson',
          level: 'h3',
        },
        summary_text:
          'Data Science Director with expertise in machine learning, AI, and advanced analytics solutions.',
        link: {
          url: '/team/emily-watson',
          title: 'View Profile',
        },
        tags: [
          { name: 'Data Science', color: 'red' },
          { name: 'AI/ML', color: 'indigo' },
        ],
      },
    ],
  },

  /**
   * Feature highlights
   */
  featureHighlights: {
    section_title: 'Platform Features',
    pre_headline: 'Why Choose Us',
    columns: '3',
    card_items: [
      {
        type: 'stat',
        icon: 'zap',
        heading: {
          title: 'Lightning Fast',
          level: 'h3',
        },
        body: 'Optimized performance with sub-second response times and global CDN distribution.',
        media: `
          <div class="text-3xl font-bold text-yellow-600 mb-2">&lt;100ms</div>
          <div class="text-sm text-gray-600">Average Response</div>
        `,
      },
      {
        type: 'stat',
        icon: 'shield',
        heading: {
          title: 'Enterprise Security',
          level: 'h3',
        },
        body: 'Bank-grade security with end-to-end encryption, compliance certifications, and regular audits.',
        media: `
          <div class="text-3xl font-bold text-red-600 mb-2">SOC 2</div>
          <div class="text-sm text-gray-600">Type II Certified</div>
        `,
      },
      {
        type: 'stat',
        icon: 'refresh-cw',
        heading: {
          title: 'Auto Scaling',
          level: 'h3',
        },
        body: 'Intelligent auto-scaling that adapts to demand with seamless resource allocation.',
        media: `
          <div class="text-3xl font-bold text-green-600 mb-2">∞</div>
          <div class="text-sm text-gray-600">Scalability</div>
        `,
      },
      {
        type: 'stat',
        icon: 'headphones',
        heading: {
          title: '24/7 Support',
          level: 'h3',
        },
        body: 'Round-the-clock expert support with dedicated account management and priority response.',
        media: `
          <div class="text-3xl font-bold text-blue-600 mb-2">24/7</div>
          <div class="text-sm text-gray-600">Expert Support</div>
        `,
      },
    ],
  },

  /**
   * Product showcase
   */
  productShowcase: {
    section_title: 'Our Products',
    pre_headline: 'Solutions',
    columns: '3',
    card_items: [
      {
        type: 'custom',
        media: `
          <div class="w-full h-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <div class="text-white text-center">
              <div class="text-4xl font-bold mb-2">CMS</div>
              <div class="text-sm opacity-90">Enterprise Platform</div>
            </div>
          </div>
        `,
        heading: {
          title: 'Enterprise CMS Platform',
          level: 'h3',
        },
        summary_text:
          'Comprehensive content management system with multi-site support, advanced workflows, and seamless integrations.',
        link: {
          url: '/products/cms',
          title: 'Learn About CMS',
        },
        tags: [
          { name: 'Enterprise', color: 'blue' },
          { name: 'Multi-site', color: 'green' },
          { name: 'Workflows', color: 'purple' },
        ],
      },
      {
        type: 'custom',
        media: `
          <div class="w-full h-48 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <div class="text-white text-center">
              <div class="text-4xl font-bold mb-2">API</div>
              <div class="text-sm opacity-90">Gateway Solution</div>
            </div>
          </div>
        `,
        heading: {
          title: 'API Gateway & Management',
          level: 'h3',
        },
        summary_text:
          'Complete API lifecycle management with security, monitoring, analytics, and developer portal integration.',
        link: {
          url: '/products/api-gateway',
          title: 'Explore API Gateway',
        },
        tags: [
          { name: 'API Management', color: 'emerald' },
          { name: 'Security', color: 'red' },
          { name: 'Analytics', color: 'blue' },
        ],
      },
      {
        type: 'custom',
        media: `
          <div class="w-full h-48 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <div class="text-white text-center">
              <div class="text-4xl font-bold mb-2">BI</div>
              <div class="text-sm opacity-90">Analytics Suite</div>
            </div>
          </div>
        `,
        heading: {
          title: 'Business Intelligence Suite',
          level: 'h3',
        },
        summary_text:
          'Advanced analytics platform with real-time dashboards, predictive modeling, and automated reporting capabilities.',
        link: {
          url: '/products/business-intelligence',
          title: 'View BI Suite',
        },
        tags: [
          { name: 'Analytics', color: 'orange' },
          { name: 'Real-time', color: 'green' },
          { name: 'Predictive', color: 'purple' },
        ],
      },
    ],
  },

  /**
   * Mixed content types
   */
  mixedContent: {
    section_title: 'Comprehensive Solutions',
    pre_headline: 'Services & Statistics',
    columns: '3',
    card_items: [
      {
        type: 'stat',
        icon: 'trending-up',
        heading: {
          title: 'Growth Acceleration',
          level: 'h3',
        },
        body: 'Average client revenue increase through our digital transformation initiatives and optimization strategies.',
        media: `
          <div class="text-4xl font-bold text-green-600 mb-2">+150%</div>
          <div class="text-sm text-gray-600">Revenue Growth</div>
        `,
      },
      {
        type: 'custom',
        media: `
          <div class="w-full h-48 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
        `,
        heading: {
          title: 'Performance Optimization',
          level: 'h3',
        },
        summary_text:
          'Comprehensive performance audits and optimization services to improve speed, efficiency, and user experience.',
        link: {
          url: '/services/performance',
          title: 'Optimize Performance',
        },
        tags: [
          { name: 'Speed', color: 'cyan' },
          { name: 'Optimization', color: 'blue' },
        ],
      },
      {
        type: 'stat',
        icon: 'clock',
        heading: {
          title: 'Rapid Deployment',
          level: 'h3',
        },
        body: 'Average project delivery time with our agile methodology and experienced development teams.',
        media: `
          <div class="text-4xl font-bold text-purple-600 mb-2">6-8</div>
          <div class="text-sm text-gray-600">Weeks to Market</div>
        `,
      },
    ],
  },

  /**
   * Large group for testing
   */
  largeGroup: {
    section_title: 'Complete Service Portfolio',
    pre_headline: 'All Services',
    columns: '3',
    card_items: [
      {
        type: 'stat',
        icon: 'code',
        heading: { title: 'Web Development', level: 'h3' },
        body: 'Modern web applications with cutting-edge technologies.',
        media:
          '<div class="text-3xl font-bold text-blue-600 mb-1">200+</div><div class="text-xs text-gray-600">Sites Built</div>',
      },
      {
        type: 'stat',
        icon: 'smartphone',
        heading: { title: 'Mobile Apps', level: 'h3' },
        body: 'Native and cross-platform mobile solutions.',
        media:
          '<div class="text-3xl font-bold text-green-600 mb-1">50+</div><div class="text-xs text-gray-600">Apps Launched</div>',
      },
      {
        type: 'stat',
        icon: 'cloud',
        heading: { title: 'Cloud Services', level: 'h3' },
        body: 'Cloud migration and infrastructure management.',
        media:
          '<div class="text-3xl font-bold text-purple-600 mb-1">99.9%</div><div class="text-xs text-gray-600">Uptime</div>',
      },
      {
        type: 'stat',
        icon: 'database',
        heading: { title: 'Data Analytics', level: 'h3' },
        body: 'Business intelligence and data visualization.',
        media:
          '<div class="text-3xl font-bold text-orange-600 mb-1">10TB</div><div class="text-xs text-gray-600">Data Processed</div>',
      },
      {
        type: 'stat',
        icon: 'shield',
        heading: { title: 'Cybersecurity', level: 'h3' },
        body: 'Comprehensive security audits and protection.',
        media:
          '<div class="text-3xl font-bold text-red-600 mb-1">0</div><div class="text-xs text-gray-600">Breaches</div>',
      },
      {
        type: 'stat',
        icon: 'users',
        heading: { title: 'Team Augmentation', level: 'h3' },
        body: 'Skilled developers and specialists on demand.',
        media:
          '<div class="text-3xl font-bold text-indigo-600 mb-1">100+</div><div class="text-xs text-gray-600">Specialists</div>',
      },
    ],
  },

  /**
   * Accessibility example
   */
  accessibilityExample: {
    section_title: 'Accessibility-First Services',
    pre_headline: 'Inclusive Design',
    columns: '3',
    card_items: [
      {
        type: 'stat',
        icon: 'eye',
        heading: {
          title: 'Screen Reader Optimization',
          level: 'h3',
        },
        body: 'Comprehensive screen reader testing and optimization for visually impaired users with NVDA, JAWS, and VoiceOver compatibility.',
        media: `
          <div class="text-3xl font-bold text-blue-600 mb-2">100%</div>
          <div class="text-sm text-gray-600">WCAG 2.1 AA</div>
        `,
      },
      {
        type: 'stat',
        icon: 'keyboard',
        heading: {
          title: 'Keyboard Navigation',
          level: 'h3',
        },
        body: 'Full keyboard accessibility with logical tab order, visible focus indicators, and comprehensive keyboard shortcuts.',
        media: `
          <div class="text-3xl font-bold text-green-600 mb-2">✓</div>
          <div class="text-sm text-gray-600">Full Coverage</div>
        `,
      },
      {
        type: 'stat',
        icon: 'contrast',
        heading: {
          title: 'High Contrast Support',
          level: 'h3',
        },
        body: 'Color schemes and contrast ratios that meet or exceed accessibility guidelines for users with visual impairments.',
        media: `
          <div class="text-3xl font-bold text-purple-600 mb-2">4.5:1</div>
          <div class="text-sm text-gray-600">Min Contrast</div>
        `,
      },
    ],
  },
};
