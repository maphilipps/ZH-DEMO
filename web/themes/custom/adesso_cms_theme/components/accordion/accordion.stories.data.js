/**
 * @file
 * Sample data for Accordion component stories.
 *
 * This file contains realistic business and technology content
 * for demonstrating the Accordion component in various contexts.
 */

export default {
  /**
   * FAQ about digital services
   */
  faqServices: {
    title: 'Frequently Asked Questions',
    pre_headline: 'Digital Services',
    accordion_items: [
      {
        title: 'What digital transformation services do you offer?',
        content: `
          <div class="prose prose-sm max-w-none">
            <p>We provide comprehensive digital transformation services including:</p>
            <ul class="list-disc ml-6 mt-3 space-y-1">
              <li><strong>Cloud Migration:</strong> Seamless transition to cloud platforms (AWS, Azure, Google Cloud)</li>
              <li><strong>Process Automation:</strong> Streamlining workflows with intelligent automation</li>
              <li><strong>Data Analytics:</strong> Advanced analytics and business intelligence solutions</li>
              <li><strong>API Integration:</strong> Connecting systems and enabling data exchange</li>
              <li><strong>Legacy Modernization:</strong> Updating outdated systems for improved performance</li>
            </ul>
            <p class="mt-4">Our team guides you through every step of your digital journey, ensuring minimal disruption to your operations.</p>
          </div>
        `,
        icon: 'cloud',
      },
      {
        title: 'How long does a typical digital transformation project take?',
        content: `
          <div class="prose prose-sm max-w-none">
            <p>Project timelines vary based on complexity and scope:</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-blue-900">Small-Scale Projects</h4>
                <p class="text-blue-800 text-sm mt-1">3-6 months for focused implementations like single system migrations or process automation.</p>
              </div>
              <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-semibold text-green-900">Enterprise Projects</h4>
                <p class="text-green-800 text-sm mt-1">12-24 months for comprehensive transformations involving multiple systems and departments.</p>
              </div>
            </div>
            <p class="mt-4">We use agile methodologies to deliver value incrementally, allowing you to see results throughout the process.</p>
          </div>
        `,
        icon: 'clock',
      },
      {
        title: 'What is your approach to data security and compliance?',
        content: `
          <div class="prose prose-sm max-w-none">
            <p>Security and compliance are fundamental to all our solutions:</p>
            <div class="mt-4 space-y-4">
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <span class="text-red-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 class="font-semibold">Risk Assessment</h4>
                  <p class="text-sm text-gray-600">Comprehensive security audits and vulnerability assessments</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <span class="text-red-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 class="font-semibold">Compliance Standards</h4>
                  <p class="text-sm text-gray-600">GDPR, ISO 27001, SOC 2, and industry-specific regulations</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <span class="text-red-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 class="font-semibold">Continuous Monitoring</h4>
                  <p class="text-sm text-gray-600">24/7 security monitoring and incident response</p>
                </div>
              </div>
            </div>
          </div>
        `,
        icon: 'shield',
      },
      {
        title: 'Do you provide ongoing support after project completion?',
        content: `
          <div class="prose prose-sm max-w-none">
            <p>Yes, we offer comprehensive post-implementation support:</p>
            <div class="mt-4 bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-3">Support Packages Available:</h4>
              <ul class="space-y-2">
                <li class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span class="text-sm"><strong>Basic:</strong> Email support and documentation access</span>
                </li>
                <li class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span class="text-sm"><strong>Standard:</strong> Phone support, system monitoring, and quarterly reviews</span>
                </li>
                <li class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span class="text-sm"><strong>Premium:</strong> 24/7 support, dedicated account manager, and proactive optimization</span>
                </li>
              </ul>
            </div>
            <p class="mt-4">Our support team includes the original project developers, ensuring continuity and deep system knowledge.</p>
          </div>
        `,
        icon: 'headphones',
      },
    ],
  },

  /**
   * Technology features accordion
   */
  technologyFeatures: {
    title: 'Platform Capabilities',
    pre_headline: 'Technology',
    accordion_items: [
      {
        title: 'Advanced Analytics & Reporting',
        content: `
          <div class="prose prose-sm max-w-none">
            <p>Comprehensive analytics platform with real-time insights:</p>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <div class="text-2xl font-bold text-blue-600">15+</div>
                <div class="text-sm text-blue-800">Data Sources</div>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <div class="text-2xl font-bold text-green-600">99.9%</div>
                <div class="text-sm text-green-800">Uptime SLA</div>
              </div>
              <div class="text-center p-4 bg-purple-50 rounded-lg">
                <div class="text-2xl font-bold text-purple-600">&lt;2s</div>
                <div class="text-sm text-purple-800">Query Response</div>
              </div>
            </div>
            <p class="mt-4">Features include custom dashboards, automated alerts, predictive modeling, and export capabilities.</p>
          </div>
        `,
        icon: 'bar-chart',
      },
      {
        title: 'API-First Architecture',
        content: `
          <div class="prose prose-sm max-w-none">
            <p>Flexible, scalable API infrastructure designed for modern applications:</p>
            <div class="mt-4 space-y-3">
              <div class="border-l-4 border-blue-500 pl-4">
                <h4 class="font-semibold">RESTful APIs</h4>
                <p class="text-sm text-gray-600">Standards-compliant REST endpoints with comprehensive documentation</p>
              </div>
              <div class="border-l-4 border-green-500 pl-4">
                <h4 class="font-semibold">GraphQL Support</h4>
                <p class="text-sm text-gray-600">Efficient data querying with strong typing and introspection</p>
              </div>
              <div class="border-l-4 border-purple-500 pl-4">
                <h4 class="font-semibold">Webhook Integration</h4>
                <p class="text-sm text-gray-600">Real-time event notifications and automated workflows</p>
              </div>
            </div>
            <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p class="text-sm"><strong>Rate Limiting:</strong> 10,000 requests/hour with burst capability for enterprise clients</p>
            </div>
          </div>
        `,
        icon: 'server',
      },
      {
        title: 'Security & Compliance Framework',
        content: `
          <div class="prose prose-sm max-w-none">
            <p>Enterprise-grade security with comprehensive compliance coverage:</p>
            <div class="mt-4">
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="bg-red-50 p-3 rounded text-center">
                  <div class="font-semibold text-red-800">SOC 2 Type II</div>
                  <div class="text-xs text-red-600">Certified</div>
                </div>
                <div class="bg-blue-50 p-3 rounded text-center">
                  <div class="font-semibold text-blue-800">ISO 27001</div>
                  <div class="text-xs text-blue-600">Compliant</div>
                </div>
              </div>
              <ul class="text-sm space-y-1">
                <li>• End-to-end encryption (TLS 1.3, AES-256)</li>
                <li>• Multi-factor authentication and SSO integration</li>
                <li>• Role-based access control with audit logging</li>
                <li>• Regular penetration testing and vulnerability assessments</li>
                <li>• GDPR and CCPA compliant data handling</li>
              </ul>
            </div>
          </div>
        `,
        icon: 'lock',
      },
    ],
  },

  /**
   * Business services accordion
   */
  businessServices: {
    title: 'Our Services',
    pre_headline: 'Business Solutions',
    accordion_items: [
      {
        title: 'Digital Strategy Consulting',
        content: `
          <div class="prose prose-sm max-w-none">
            <p>Transform your business with data-driven digital strategies that deliver measurable results.</p>
            <div class="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-3">Our Approach:</h4>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                  <div>
                    <h5 class="font-medium">Discovery & Assessment</h5>
                    <p class="text-sm text-gray-600">Current state analysis and opportunity identification</p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                  <div>
                    <h5 class="font-medium">Strategy Development</h5>
                    <p class="text-sm text-gray-600">Comprehensive roadmap with prioritized initiatives</p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                  <div>
                    <h5 class="font-medium">Implementation Support</h5>
                    <p class="text-sm text-gray-600">Hands-on guidance and change management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
        icon: 'trending-up',
      },
      {
        title: 'Enterprise Software Development',
        content: `
          <div class="prose prose-sm max-w-none">
            <p>Custom enterprise applications built with modern technologies and best practices.</p>
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-3">
                <h4 class="font-semibold">Technologies We Use:</h4>
                <div class="flex flex-wrap gap-2">
                  <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">React</span>
                  <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Node.js</span>
                  <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">.NET</span>
                  <span class="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">Java</span>
                  <span class="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Python</span>
                  <span class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs">Docker</span>
                  <span class="px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs">Kubernetes</span>
                </div>
              </div>
              <div class="space-y-3">
                <h4 class="font-semibold">Delivery Methods:</h4>
                <ul class="text-sm space-y-1">
                  <li>• Agile development sprints</li>
                  <li>• Continuous integration/deployment</li>
                  <li>• DevOps and infrastructure automation</li>
                  <li>• Quality assurance and testing</li>
                </ul>
              </div>
            </div>
          </div>
        `,
        icon: 'code',
      },
      {
        title: 'Cloud Solutions & Migration',
        content: `
          <div class="prose prose-sm max-w-none">
            <p>Seamless cloud adoption with comprehensive migration and optimization services.</p>
            <div class="mt-4">
              <div class="grid grid-cols-3 gap-4 mb-4">
                <div class="text-center p-3 bg-orange-50 rounded">
                  <div class="text-lg font-bold text-orange-600">AWS</div>
                  <div class="text-xs text-orange-500">Certified Partner</div>
                </div>
                <div class="text-center p-3 bg-blue-50 rounded">
                  <div class="text-lg font-bold text-blue-600">Azure</div>
                  <div class="text-xs text-blue-500">Gold Partner</div>
                </div>
                <div class="text-center p-3 bg-green-50 rounded">
                  <div class="text-lg font-bold text-green-600">GCP</div>
                  <div class="text-xs text-green-500">Premier Partner</div>
                </div>
              </div>
              <div class="bg-gray-50 p-4 rounded">
                <h4 class="font-semibold mb-2">Migration Process:</h4>
                <p class="text-sm text-gray-600">Assessment → Planning → Migration → Optimization → Support</p>
                <p class="text-sm text-gray-600 mt-2">Average cost reduction: 40-60% | Performance improvement: 30-50%</p>
              </div>
            </div>
          </div>
        `,
        icon: 'cloud',
      },
    ],
  },

  /**
   * Single item for minimal testing
   */
  singleItem: {
    title: 'Quick Start Guide',
    pre_headline: 'Getting Started',
    accordion_items: [
      {
        title: 'How do I get started with your platform?',
        content: `
          <div class="prose prose-sm max-w-none">
            <p>Getting started is simple! Follow these steps:</p>
            <ol class="list-decimal ml-6 mt-3 space-y-2">
              <li>Sign up for a free account</li>
              <li>Complete the onboarding process</li>
              <li>Connect your data sources</li>
              <li>Explore our pre-built templates</li>
              <li>Schedule a consultation with our team</li>
            </ol>
            <div class="mt-4 p-3 bg-green-50 border border-green-200 rounded">
              <p class="text-sm text-green-800"><strong>Pro Tip:</strong> Most users are up and running within 15 minutes!</p>
            </div>
          </div>
        `,
        icon: 'play-circle',
      },
    ],
  },

  /**
   * Accessibility-focused content
   */
  accessibilityExample: {
    title: 'Accessibility Information',
    pre_headline: 'User Experience',
    accordion_items: [
      {
        title: 'Keyboard Navigation Instructions',
        content: `
          <div class="prose prose-sm max-w-none">
            <p>This accordion supports full keyboard navigation:</p>
            <div class="mt-4 space-y-3">
              <div class="flex items-center space-x-3 p-2 bg-blue-50 rounded">
                <kbd class="px-2 py-1 bg-gray-200 rounded text-sm">Tab</kbd>
                <span class="text-sm">Navigate between accordion headers</span>
              </div>
              <div class="flex items-center space-x-3 p-2 bg-blue-50 rounded">
                <kbd class="px-2 py-1 bg-gray-200 rounded text-sm">Enter</kbd>
                <span class="text-sm">Expand/collapse focused accordion item</span>
              </div>
              <div class="flex items-center space-x-3 p-2 bg-blue-50 rounded">
                <kbd class="px-2 py-1 bg-gray-200 rounded text-sm">Space</kbd>
                <span class="text-sm">Expand/collapse focused accordion item</span>
              </div>
              <div class="flex items-center space-x-3 p-2 bg-blue-50 rounded">
                <kbd class="px-2 py-1 bg-gray-200 rounded text-sm">↑↓</kbd>
                <span class="text-sm">Navigate between accordion headers</span>
              </div>
            </div>
            <p class="mt-4">All interactions are announced to screen readers with appropriate ARIA labels.</p>
          </div>
        `,
        icon: 'accessibility',
      },
      {
        title: 'Screen Reader Support',
        content: `
          <div class="prose prose-sm max-w-none">
            <p>Enhanced screen reader experience with semantic markup:</p>
            <ul class="list-disc ml-6 mt-3 space-y-1">
              <li>Proper heading hierarchy (h2, h3 elements)</li>
              <li>ARIA expanded states for accordion panels</li>
              <li>Descriptive button labels for interactions</li>
              <li>Landmark regions for content navigation</li>
              <li>Focus management for seamless navigation</li>
            </ul>
            <div class="mt-4 p-3 bg-purple-50 border border-purple-200 rounded">
              <p class="text-sm text-purple-800"><strong>Tested with:</strong> NVDA, JAWS, VoiceOver, and TalkBack</p>
            </div>
          </div>
        `,
        icon: 'volume-2',
      },
    ],
  },

  /**
   * Long content for stress testing
   */
  longContent: {
    title: 'Comprehensive Platform Documentation',
    pre_headline: 'Technical Specifications',
    accordion_items: [
      {
        title: 'System Architecture and Performance Specifications',
        content: `
          <div class="prose prose-sm max-w-none">
            <h3>Overview</h3>
            <p>Our platform is built on a modern, cloud-native architecture designed for scalability, reliability, and performance. The system handles millions of transactions daily while maintaining sub-second response times.</p>
            
            <h3>Core Architecture Components</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div>
                <h4>Frontend Layer</h4>
                <ul class="text-sm space-y-1">
                  <li>• React 18 with TypeScript</li>
                  <li>• Progressive Web App (PWA) capabilities</li>
                  <li>• Responsive design with Tailwind CSS</li>
                  <li>• WebSocket connections for real-time updates</li>
                  <li>• Service workers for offline functionality</li>
                </ul>
              </div>
              <div>
                <h4>Backend Services</h4>
                <ul class="text-sm space-y-1">
                  <li>• Microservices architecture with Node.js</li>
                  <li>• GraphQL and REST API endpoints</li>
                  <li>• Redis for caching and session management</li>
                  <li>• PostgreSQL for transactional data</li>
                  <li>• Elasticsearch for search capabilities</li>
                </ul>
              </div>
            </div>

            <h3>Performance Metrics</h3>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <div class="text-2xl font-bold text-green-600">99.99%</div>
                <div class="text-sm text-green-800">Uptime SLA</div>
              </div>
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <div class="text-2xl font-bold text-blue-600">&lt;100ms</div>
                <div class="text-sm text-blue-800">API Response</div>
              </div>
              <div class="text-center p-4 bg-purple-50 rounded-lg">
                <div class="text-2xl font-bold text-purple-600">10M+</div>
                <div class="text-sm text-purple-800">Daily Requests</div>
              </div>
              <div class="text-center p-4 bg-orange-50 rounded-lg">
                <div class="text-2xl font-bold text-orange-600">50TB</div>
                <div class="text-sm text-orange-800">Data Processed</div>
              </div>
            </div>

            <h3>Security and Compliance</h3>
            <p>Security is integrated into every layer of our architecture:</p>
            <div class="mt-4 space-y-4">
              <div class="border-l-4 border-red-500 pl-4">
                <h4 class="font-semibold">Data Encryption</h4>
                <p class="text-sm text-gray-600">AES-256 encryption at rest, TLS 1.3 in transit. All sensitive data is encrypted using industry-standard algorithms with regular key rotation.</p>
              </div>
              <div class="border-l-4 border-blue-500 pl-4">
                <h4 class="font-semibold">Access Control</h4>
                <p class="text-sm text-gray-600">Role-based access control (RBAC) with multi-factor authentication. OAuth 2.0 and SAML 2.0 support for enterprise SSO integration.</p>
              </div>
              <div class="border-l-4 border-green-500 pl-4">
                <h4 class="font-semibold">Monitoring & Auditing</h4>
                <p class="text-sm text-gray-600">Comprehensive logging and monitoring with real-time alerting. Full audit trail for all user actions and system events.</p>
              </div>
            </div>

            <h3>Scalability and Deployment</h3>
            <p>Our infrastructure is designed to scale automatically based on demand:</p>
            <ul class="list-disc ml-6 mt-3 space-y-1">
              <li>Kubernetes orchestration with auto-scaling policies</li>
              <li>Multi-region deployment with CDN integration</li>
              <li>Database sharding and read replicas</li>
              <li>Queue-based processing for background tasks</li>
              <li>Circuit breakers and retry mechanisms for resilience</li>
            </ul>

            <div class="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 class="font-semibold mb-2">Technical Support</h4>
              <p class="text-sm text-gray-600">Our technical team is available 24/7 for enterprise customers. We provide comprehensive documentation, API references, and SDK libraries for popular programming languages.</p>
            </div>
          </div>
        `,
        icon: 'server',
      },
    ],
  },
};
