/**
 * @file
 * Sample data for Carousel component stories.
 *
 * This file contains realistic business and technology content
 * for demonstrating the Carousel component in various contexts.
 */

export default {
  /**
   * Business showcase carousel
   */
  businessShowcase: {
    items: [
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg overflow-hidden">
            <div class="h-full flex items-center justify-center text-white">
              <div class="text-center">
                <svg class="w-16 h-16 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <div class="text-sm font-medium opacity-90">Digital Strategy</div>
              </div>
            </div>
          </div>
        `,
        title: 'Digital Transformation Consulting',
        summary:
          'Comprehensive digital strategies that transform businesses and drive competitive advantage through innovative technology solutions and process optimization.',
        link: {
          url: '/services/digital-transformation',
          title: 'Explore Digital Services',
        },
      },
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-green-500 to-green-600 rounded-lg overflow-hidden">
            <div class="h-full flex items-center justify-center text-white">
              <div class="text-center">
                <svg class="w-16 h-16 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                </svg>
                <div class="text-sm font-medium opacity-90">Cloud Solutions</div>
              </div>
            </div>
          </div>
        `,
        title: 'Cloud Migration & Infrastructure',
        summary:
          'Seamless cloud adoption with enterprise-grade migration services, infrastructure optimization, and ongoing management for maximum efficiency and cost savings.',
        link: {
          url: '/services/cloud-migration',
          title: 'Learn About Cloud Services',
        },
      },
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg overflow-hidden">
            <div class="h-full flex items-center justify-center text-white">
              <div class="text-center">
                <svg class="w-16 h-16 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                </svg>
                <div class="text-sm font-medium opacity-90">Data Analytics</div>
              </div>
            </div>
          </div>
        `,
        title: 'Advanced Data Analytics',
        summary:
          'Transform raw data into actionable insights with advanced analytics platforms, predictive modeling, and interactive dashboards for data-driven decision making.',
        link: {
          url: '/services/data-analytics',
          title: 'Discover Analytics Solutions',
        },
      },
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg overflow-hidden">
            <div class="h-full flex items-center justify-center text-white">
              <div class="text-center">
                <svg class="w-16 h-16 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <div class="text-sm font-medium opacity-90">Cybersecurity</div>
              </div>
            </div>
          </div>
        `,
        title: 'Enterprise Cybersecurity',
        summary:
          'Comprehensive security solutions with threat assessment, vulnerability management, compliance frameworks, and 24/7 monitoring for complete protection.',
        link: {
          url: '/services/cybersecurity',
          title: 'Secure Your Business',
        },
      },
    ],
    cards_per_view: '3',
    autoplay: false,
    interval: '5000',
    pause_on_hover: true,
  },

  /**
   * Technology portfolio
   */
  technologyPortfolio: {
    items: [
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg overflow-hidden">
            <div class="h-full flex flex-col items-center justify-center text-white p-6">
              <div class="text-4xl font-bold mb-2">CMS</div>
              <div class="text-sm opacity-90 text-center">Enterprise Content Management Platform</div>
              <div class="mt-4 flex space-x-2">
                <span class="px-2 py-1 bg-white bg-opacity-20 rounded text-xs">Drupal</span>
                <span class="px-2 py-1 bg-white bg-opacity-20 rounded text-xs">React</span>
              </div>
            </div>
          </div>
        `,
        title: 'Enterprise CMS Platform',
        summary:
          'Scalable content management system with multi-site architecture, advanced workflows, API-first design, and seamless integration capabilities for enterprise environments.',
        link: {
          url: '/portfolio/enterprise-cms',
          title: 'View CMS Project',
        },
      },
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg overflow-hidden">
            <div class="h-full flex flex-col items-center justify-center text-white p-6">
              <div class="text-4xl font-bold mb-2">API</div>
              <div class="text-sm opacity-90 text-center">Microservices Gateway Solution</div>
              <div class="mt-4 flex space-x-2">
                <span class="px-2 py-1 bg-white bg-opacity-20 rounded text-xs">Node.js</span>
                <span class="px-2 py-1 bg-white bg-opacity-20 rounded text-xs">GraphQL</span>
              </div>
            </div>
          </div>
        `,
        title: 'API Gateway & Management',
        summary:
          'Complete API lifecycle management with security, rate limiting, analytics, monitoring, and developer portal for seamless integration and third-party access.',
        link: {
          url: '/portfolio/api-gateway',
          title: 'Explore API Solution',
        },
      },
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg overflow-hidden">
            <div class="h-full flex flex-col items-center justify-center text-white p-6">
              <div class="text-4xl font-bold mb-2">BI</div>
              <div class="text-sm opacity-90 text-center">Business Intelligence Suite</div>
              <div class="mt-4 flex space-x-2">
                <span class="px-2 py-1 bg-white bg-opacity-20 rounded text-xs">Python</span>
                <span class="px-2 py-1 bg-white bg-opacity-20 rounded text-xs">D3.js</span>
              </div>
            </div>
          </div>
        `,
        title: 'Business Intelligence Dashboard',
        summary:
          'Real-time analytics platform with interactive dashboards, automated reporting, predictive modeling, and machine learning integration for intelligent business decisions.',
        link: {
          url: '/portfolio/business-intelligence',
          title: 'See BI Dashboard',
        },
      },
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg overflow-hidden">
            <div class="h-full flex flex-col items-center justify-center text-white p-6">
              <div class="text-4xl font-bold mb-2">App</div>
              <div class="text-sm opacity-90 text-center">Cross-Platform Mobile Solution</div>
              <div class="mt-4 flex space-x-2">
                <span class="px-2 py-1 bg-white bg-opacity-20 rounded text-xs">React Native</span>
                <span class="px-2 py-1 bg-white bg-opacity-20 rounded text-xs">Firebase</span>
              </div>
            </div>
          </div>
        `,
        title: 'Mobile Application Suite',
        summary:
          'Cross-platform mobile applications with native performance, offline capabilities, push notifications, and seamless cloud synchronization for optimal user experience.',
        link: {
          url: '/portfolio/mobile-app',
          title: 'Download App',
        },
      },
    ],
    cards_per_view: '3',
    autoplay: false,
    interval: '6000',
    pause_on_hover: true,
  },

  /**
   * Client testimonials
   */
  clientTestimonials: {
    items: [
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
            <div class="h-full flex flex-col items-center justify-center p-8">
              <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg class="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <div class="text-center">
                <div class="font-semibold text-gray-900 mb-1">Sarah Johnson</div>
                <div class="text-sm text-gray-600">CTO, TechCorp Inc.</div>
              </div>
            </div>
          </div>
        `,
        title: 'Exceptional Digital Transformation',
        summary:
          '"The team delivered beyond our expectations. Their digital transformation strategy increased our operational efficiency by 40% and reduced costs significantly. Highly recommended for enterprise-level projects."',
        link: {
          url: '/case-studies/techcorp-transformation',
          title: 'Read Full Case Study',
        },
      },
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
            <div class="h-full flex flex-col items-center justify-center p-8">
              <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg class="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <div class="text-center">
                <div class="font-semibold text-gray-900 mb-1">Michael Chen</div>
                <div class="text-sm text-gray-600">Founder, StartupFlow</div>
              </div>
            </div>
          </div>
        `,
        title: 'Outstanding Development Partnership',
        summary:
          '"From concept to deployment, they were true partners. The mobile app they built has 500K+ downloads and a 4.8-star rating. Their expertise in React Native is unmatched."',
        link: {
          url: '/case-studies/startupflow-app',
          title: 'View App Success Story',
        },
      },
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
            <div class="h-full flex flex-col items-center justify-center p-8">
              <div class="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg class="w-10 h-10 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <div class="text-center">
                <div class="font-semibold text-gray-900 mb-1">Dr. Emily Rodriguez</div>
                <div class="text-sm text-gray-600">Director, MedTech Solutions</div>
              </div>
            </div>
          </div>
        `,
        title: 'Secure Healthcare Platform',
        summary:
          '"They built our HIPAA-compliant patient management system with zero security incidents. The platform processes 10,000+ patient records daily with 99.9% uptime. Exceptional work."',
        link: {
          url: '/case-studies/medtech-platform',
          title: 'Healthcare Case Study',
        },
      },
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
            <div class="h-full flex flex-col items-center justify-center p-8">
              <div class="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg class="w-10 h-10 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <div class="text-center">
                <div class="font-semibold text-gray-900 mb-1">James Wilson</div>
                <div class="text-sm text-gray-600">VP Engineering, FinanceFlow</div>
              </div>
            </div>
          </div>
        `,
        title: 'Scalable FinTech Solution',
        summary:
          '"Their cloud migration saved us $200K annually while improving performance by 60%. The team handled our complex compliance requirements flawlessly. True cloud experts."',
        link: {
          url: '/case-studies/financeflow-migration',
          title: 'FinTech Success Story',
        },
      },
    ],
    cards_per_view: '3',
    autoplay: true,
    interval: '7000',
    pause_on_hover: true,
  },

  /**
   * Product gallery
   */
  productGallery: {
    items: [
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg overflow-hidden">
            <div class="h-full flex items-center justify-center text-white">
              <div class="text-center">
                <div class="text-6xl font-bold mb-2">Pro</div>
                <div class="text-lg opacity-90">Enterprise Edition</div>
                <div class="mt-4 px-4 py-2 bg-white bg-opacity-20 rounded-lg">
                  <div class="text-2xl font-bold">$299</div>
                  <div class="text-sm opacity-80">/month</div>
                </div>
              </div>
            </div>
          </div>
        `,
        title: 'Enterprise Pro License',
        summary:
          'Complete enterprise solution with unlimited users, advanced analytics, priority support, custom integrations, and dedicated account management for large organizations.',
        link: {
          url: '/pricing/enterprise-pro',
          title: 'Start Enterprise Trial',
        },
      },
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg overflow-hidden">
            <div class="h-full flex items-center justify-center text-white">
              <div class="text-center">
                <div class="text-6xl font-bold mb-2">Plus</div>
                <div class="text-lg opacity-90">Business Edition</div>
                <div class="mt-4 px-4 py-2 bg-white bg-opacity-20 rounded-lg">
                  <div class="text-2xl font-bold">$99</div>
                  <div class="text-sm opacity-80">/month</div>
                </div>
              </div>
            </div>
          </div>
        `,
        title: 'Business Plus License',
        summary:
          'Perfect for growing businesses with advanced features, team collaboration tools, enhanced security, API access, and standard support for up to 50 users.',
        link: {
          url: '/pricing/business-plus',
          title: 'Upgrade to Plus',
        },
      },
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg overflow-hidden">
            <div class="h-full flex items-center justify-center text-white">
              <div class="text-center">
                <div class="text-6xl font-bold mb-2">Basic</div>
                <div class="text-lg opacity-90">Starter Edition</div>
                <div class="mt-4 px-4 py-2 bg-white bg-opacity-20 rounded-lg">
                  <div class="text-2xl font-bold">$29</div>
                  <div class="text-sm opacity-80">/month</div>
                </div>
              </div>
            </div>
          </div>
        `,
        title: 'Basic Starter License',
        summary:
          'Ideal for small teams and startups with essential features, basic reporting, email support, and core functionality for up to 10 users getting started.',
        link: {
          url: '/pricing/basic-starter',
          title: 'Start Free Trial',
        },
      },
    ],
    cards_per_view: '3',
    autoplay: false,
    interval: '5000',
    pause_on_hover: true,
  },

  /**
   * News and updates
   */
  newsUpdates: {
    items: [
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden border border-blue-200">
            <div class="h-full flex flex-col justify-between p-6">
              <div class="flex-1 flex items-center justify-center">
                <svg class="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-4l-3 3.5a5 5 0 0 1-7 0L6 7M4 9h.01M20 9h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2z"></path>
                </svg>
              </div>
              <div class="text-center">
                <div class="text-sm text-blue-600 font-medium">January 15, 2024</div>
                <div class="text-xs text-blue-500">Product Update</div>
              </div>
            </div>
          </div>
        `,
        title: 'New AI-Powered Analytics Released',
        summary:
          'Our latest platform update includes machine learning-driven insights, automated report generation, and predictive analytics capabilities for enhanced business intelligence.',
        link: {
          url: '/news/ai-analytics-release',
          title: 'Read Full Update',
        },
      },
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-green-50 to-green-100 rounded-lg overflow-hidden border border-green-200">
            <div class="h-full flex flex-col justify-between p-6">
              <div class="flex-1 flex items-center justify-center">
                <svg class="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <div class="text-center">
                <div class="text-sm text-green-600 font-medium">December 20, 2023</div>
                <div class="text-xs text-green-500">Security Update</div>
              </div>
            </div>
          </div>
        `,
        title: 'SOC 2 Type II Certification Achieved',
        summary:
          "We've successfully completed our SOC 2 Type II audit, demonstrating our commitment to security, availability, and confidentiality of customer data.",
        link: {
          url: '/news/soc2-certification',
          title: 'Security Details',
        },
      },
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg overflow-hidden border border-purple-200">
            <div class="h-full flex flex-col justify-between p-6">
              <div class="flex-1 flex items-center justify-center">
                <svg class="w-16 h-16 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div class="text-center">
                <div class="text-sm text-purple-600 font-medium">November 8, 2023</div>
                <div class="text-xs text-purple-500">Company News</div>
              </div>
            </div>
          </div>
        `,
        title: 'Team Expansion: 25 New Experts Joined',
        summary:
          "We're excited to welcome 25 new team members across engineering, design, and customer success to support our growing client base and product development.",
        link: {
          url: '/news/team-expansion',
          title: 'Meet the Team',
        },
      },
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg overflow-hidden border border-orange-200">
            <div class="h-full flex flex-col justify-between p-6">
              <div class="flex-1 flex items-center justify-center">
                <svg class="w-16 h-16 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
                </svg>
              </div>
              <div class="text-center">
                <div class="text-sm text-orange-600 font-medium">October 15, 2023</div>
                <div class="text-xs text-orange-500">Global Expansion</div>
              </div>
            </div>
          </div>
        `,
        title: 'European Operations Launch',
        summary:
          "We've officially launched our European operations with offices in London and Berlin, providing localized support and compliance for our EU clients.",
        link: {
          url: '/news/european-expansion',
          title: 'Global Presence',
        },
      },
    ],
    cards_per_view: '3',
    autoplay: false,
    interval: '8000',
    pause_on_hover: true,
  },

  /**
   * Team showcase
   */
  teamShowcase: {
    items: [
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
            <div class="h-full flex items-center justify-center">
              <div class="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center">
                <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        `,
        title: 'Sarah Chen - Chief Technology Officer',
        summary:
          'Leading our technical vision with 15+ years in enterprise software development. Expert in cloud architecture, microservices, and digital transformation strategies.',
        link: {
          url: '/team/sarah-chen',
          title: 'View Full Profile',
        },
      },
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
            <div class="h-full flex items-center justify-center">
              <div class="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center">
                <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        `,
        title: 'Marcus Rodriguez - Lead Solutions Architect',
        summary:
          'Specializing in enterprise system integration and cloud infrastructure. Designs scalable solutions for Fortune 500 companies with focus on performance and security.',
        link: {
          url: '/team/marcus-rodriguez',
          title: 'Connect on LinkedIn',
        },
      },
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
            <div class="h-full flex items-center justify-center">
              <div class="w-32 h-32 bg-purple-500 rounded-full flex items-center justify-center">
                <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        `,
        title: 'Dr. Emily Watson - Data Science Director',
        summary:
          'PhD in Machine Learning with expertise in AI, predictive analytics, and big data processing. Leads our advanced analytics and business intelligence initiatives.',
        link: {
          url: '/team/emily-watson',
          title: 'Research Publications',
        },
      },
    ],
    cards_per_view: '3',
    autoplay: false,
    interval: '6000',
    pause_on_hover: true,
  },

  /**
   * Large carousel for testing
   */
  largeCarousel: {
    items: [
      {
        media:
          '<div class="w-full h-64 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">Service 1</div>',
        title: 'Web Development',
        summary: 'Modern web applications with React, Vue, and Angular.',
        link: { url: '/services/web', title: 'Learn More' },
      },
      {
        media:
          '<div class="w-full h-64 bg-green-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">Service 2</div>',
        title: 'Mobile Development',
        summary: 'Native and cross-platform mobile applications.',
        link: { url: '/services/mobile', title: 'View Apps' },
      },
      {
        media:
          '<div class="w-full h-64 bg-purple-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">Service 3</div>',
        title: 'Cloud Solutions',
        summary: 'Cloud migration and infrastructure services.',
        link: { url: '/services/cloud', title: 'Get Started' },
      },
      {
        media:
          '<div class="w-full h-64 bg-orange-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">Service 4</div>',
        title: 'DevOps & Automation',
        summary: 'CI/CD pipelines and infrastructure automation.',
        link: { url: '/services/devops', title: 'Automate Now' },
      },
      {
        media:
          '<div class="w-full h-64 bg-red-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">Service 5</div>',
        title: 'Security Services',
        summary: 'Cybersecurity audits and compliance management.',
        link: { url: '/services/security', title: 'Secure Business' },
      },
      {
        media:
          '<div class="w-full h-64 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">Service 6</div>',
        title: 'Data Analytics',
        summary: 'Business intelligence and predictive modeling.',
        link: { url: '/services/analytics', title: 'Analyze Data' },
      },
      {
        media:
          '<div class="w-full h-64 bg-pink-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">Service 7</div>',
        title: 'UI/UX Design',
        summary: 'User-centered design and experience optimization.',
        link: { url: '/services/design', title: 'Design Better' },
      },
      {
        media:
          '<div class="w-full h-64 bg-teal-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">Service 8</div>',
        title: 'Consulting',
        summary: 'Strategic technology consulting and planning.',
        link: { url: '/services/consulting', title: 'Get Advice' },
      },
    ],
    cards_per_view: '3',
    autoplay: false,
    interval: '5000',
    pause_on_hover: true,
  },

  /**
   * Accessibility example
   */
  accessibilityExample: {
    items: [
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg overflow-hidden" role="img" aria-label="Accessibility services illustration">
            <div class="h-full flex items-center justify-center text-white">
              <div class="text-center">
                <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <div class="text-sm font-medium">Screen Reader Support</div>
              </div>
            </div>
          </div>
        `,
        title: 'Screen Reader Optimization',
        summary:
          'Comprehensive accessibility testing and optimization for screen readers including NVDA, JAWS, and VoiceOver with semantic markup and ARIA labels.',
        link: {
          url: '/accessibility/screen-readers',
          title: 'Learn About Screen Reader Support',
        },
      },
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-green-600 to-green-800 rounded-lg overflow-hidden" role="img" aria-label="Keyboard navigation illustration">
            <div class="h-full flex items-center justify-center text-white">
              <div class="text-center">
                <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
                <div class="text-sm font-medium">Keyboard Navigation</div>
              </div>
            </div>
          </div>
        `,
        title: 'Full Keyboard Accessibility',
        summary:
          'Complete keyboard navigation support with logical tab order, visible focus indicators, and comprehensive keyboard shortcuts for all interactive elements.',
        link: {
          url: '/accessibility/keyboard-navigation',
          title: 'Keyboard Navigation Guide',
        },
      },
      {
        media: `
          <div class="w-full h-64 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg overflow-hidden" role="img" aria-label="High contrast design illustration">
            <div class="h-full flex items-center justify-center text-white">
              <div class="text-center">
                <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                </svg>
                <div class="text-sm font-medium">High Contrast Design</div>
              </div>
            </div>
          </div>
        `,
        title: 'WCAG 2.1 AA Compliance',
        summary:
          'Color schemes and contrast ratios that exceed accessibility guidelines with support for high contrast mode and color vision deficiencies.',
        link: {
          url: '/accessibility/wcag-compliance',
          title: 'View Compliance Details',
        },
      },
    ],
    cards_per_view: '3',
    autoplay: false,
    interval: '5000',
    pause_on_hover: true,
  },
};
