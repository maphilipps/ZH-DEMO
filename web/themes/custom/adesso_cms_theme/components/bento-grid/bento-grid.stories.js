// phpcs:ignoreFile

import Component from './bento-grid.twig';

const meta = {
  title: 'Layout/BentoGrid',
  component: Component,
  argTypes: {
    eyebrow: {
      name: 'Eyebrow',
      description: 'Small text above the main title',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    title: {
      name: 'Title',
      description: 'Main heading for the bento grid section',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    description: {
      name: 'Description',
      description: 'Subtitle or description text',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    background_color: {
      name: 'Background Color',
      description: 'Background color class for the section',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bg-gray-50' },
      },
    },
    container_classes: {
      name: 'Container Classes',
      description: 'Additional classes for the container',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    grid_items: {
      name: 'Grid Items',
      description: 'Array of grid items to display',
      control: { type: 'object' },
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Modern bento grid layout component for showcasing features, services, or content in an asymmetric grid pattern. 

## TWIG Usage

\`\`\`twig
{# Basic bento grid with features #}
{% include 'sdc:bento-grid' with {
  eyebrow: 'Platform Overview',
  title: 'Everything You Need',
  description: 'Comprehensive solutions for modern businesses',
  grid_items: [
    {
      title: 'Mobile Friendly',
      description: 'Responsive design that works perfectly on all devices',
      content_type: 'image',
      image: '/images/mobile-demo.png',
      image_alt: 'Mobile interface preview',
      grid_area: 'large-left'
    },
    {
      title: 'High Performance',
      description: 'Lightning-fast response times and optimized workflows',
      content_type: 'image',
      image: '/images/performance-chart.png',
      grid_area: 'top-right'
    }
  ]
} %}

{# Code showcase bento grid #}
{% include 'sdc:bento-grid' with {
  title: 'Developer Experience',
  grid_items: [
    {
      title: 'Powerful APIs',
      description: 'RESTful APIs with comprehensive documentation',
      content_type: 'code',
      code_content: 'const response = await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "John" })
});',
      code_language: 'js',
      grid_area: 'large-right'
    }
  ]
} %}

{# Team showcase with different layouts #}
{% include 'sdc:bento-grid' with {
  eyebrow: 'Our Team',
  title: 'Meet the Experts',
  background_color: 'bg-white',
  grid_items: team_members|map(member => {
    title: member.name,
    description: member.role,
    content_type: 'image',
    image: member.photo,
    image_alt: member.name ~ ' photo',
    grid_area: member.featured ? 'large-left' : 'top-right'
  })
} %}

{# Service offerings grid #}
{% include 'sdc:bento-grid' with {
  title: 'Our Services',
  description: 'Comprehensive solutions for digital transformation',
  grid_items: [
    {
      title: 'Web Development',
      description: 'Modern web applications with cutting-edge technology',
      content_type: 'image',
      image: content.field_service_image,
      grid_area: 'large-left'
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services',
      content_type: 'chart',
      grid_area: 'top-right'
    },
    {
      title: 'Data Analytics',
      description: 'Business intelligence and data visualization',
      content_type: 'image',
      image: '/images/analytics-dashboard.png',
      grid_area: 'middle-right'
    },
    {
      title: 'API Integration',
      description: 'Seamless integration with third-party services',
      content_type: 'code',
      code_content: api_example_code,
      code_language: 'python',
      grid_area: 'large-right'
    }
  ]
} %}
\`\`\`

## Grid Areas (from YAML schema)
- **large-left**: Spans 2 rows on the left side, perfect for primary content
- **top-right**: Single cell in top-right position
- **middle-right**: Single cell in middle-right position  
- **large-right**: Spans 2 rows on the right side, ideal for code examples
- **full-width**: Default single cell layout

## Content Types (from YAML schema)
- **image**: Display images with responsive layouts
- **code**: Code examples with syntax highlighting
- **chart**: Chart/visualization placeholders
- **text**: Text-only content (default)
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Default feature showcase
export const Default = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    eyebrow: 'Platform Features',
    title: 'Everything You Need to Succeed',
    description: 'Our comprehensive platform provides all the tools and features you need to build, deploy, and scale your applications.',
    background_color: 'bg-gray-50',
    container_classes: '',
    grid_items: [
      {
        title: 'Mobile Friendly',
        description: 'Responsive design that works perfectly on all devices, from smartphones to desktops.',
        content_type: 'image',
        image: 'https://picsum.photos/600/800?random=1',
        image_alt: 'Mobile interface preview',
        grid_area: 'large-left',
        custom_classes: '',
      },
      {
        title: 'High Performance',
        description: 'Lightning-fast response times and optimized workflows for maximum efficiency.',
        content_type: 'image',
        image: 'https://picsum.photos/400/300?random=2',
        image_alt: 'Performance metrics dashboard',
        grid_area: 'top-right',
        custom_classes: '',
      },
      {
        title: 'Enterprise Security',
        description: 'Bank-grade security with end-to-end encryption and compliance certifications.',
        content_type: 'image',
        image: 'https://picsum.photos/300/200?random=3',
        image_alt: 'Security dashboard',
        grid_area: 'middle-right',
        custom_classes: '',
      },
      {
        title: 'Powerful APIs',
        description: 'RESTful APIs with comprehensive documentation and SDKs for all major languages.',
        content_type: 'code',
        code_content: `const response = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
});

const userData = await response.json();
console.log('User created:', userData);`,
        code_language: 'js',
        grid_area: 'large-right',
        custom_classes: '',
      },
    ],
  },
};

// Services showcase
export const Services = {
  args: {
    eyebrow: 'Our Services',
    title: 'Comprehensive Digital Solutions',
    description: 'From strategy to implementation, we provide end-to-end digital transformation services.',
    background_color: 'bg-white',
    grid_items: [
      {
        title: 'Web Development',
        description: 'Modern, scalable web applications built with cutting-edge technologies and best practices.',
        content_type: 'image',
        image: 'https://picsum.photos/600/800?random=4',
        image_alt: 'Web development workflow',
        grid_area: 'large-left',
      },
      {
        title: 'Cloud Solutions',
        description: 'Migrate to the cloud with confidence using our proven methodologies and expertise.',
        content_type: 'chart',
        grid_area: 'top-right',
      },
      {
        title: 'Data Analytics',
        description: 'Transform your data into actionable insights with advanced analytics and visualization.',
        content_type: 'image',
        image: 'https://picsum.photos/300/200?random=5',
        image_alt: 'Analytics dashboard',
        grid_area: 'middle-right',
      },
      {
        title: 'API Integration',
        description: 'Seamlessly connect your systems with third-party services and internal applications.',
        content_type: 'code',
        code_content: `import requests
from typing import Dict, Any

class APIClient:
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url
        self.headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
    
    def create_user(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        response = requests.post(
            f'{self.base_url}/users',
            json=user_data,
            headers=self.headers
        )
        return response.json()`,
        code_language: 'python',
        grid_area: 'large-right',
      },
    ],
  },
};

// Team showcase
export const TeamShowcase = {
  args: {
    eyebrow: 'Our Team',
    title: 'Meet the Experts Behind Our Success',
    description: 'Passionate professionals dedicated to delivering exceptional results for our clients.',
    background_color: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    grid_items: [
      {
        title: 'Sarah Johnson',
        description: 'Chief Technology Officer with 15+ years of experience leading innovative development teams.',
        content_type: 'image',
        image: 'https://picsum.photos/600/800?random=6',
        image_alt: 'Sarah Johnson photo',
        grid_area: 'large-left',
      },
      {
        title: 'Michael Chen',
        description: 'Lead Developer specializing in cloud-native applications and microservices architecture.',
        content_type: 'image',
        image: 'https://picsum.photos/400/300?random=7',
        image_alt: 'Michael Chen photo',
        grid_area: 'top-right',
      },
      {
        title: 'Emily Rodriguez',
        description: 'UX Designer focused on creating intuitive and accessible user experiences.',
        content_type: 'image',
        image: 'https://picsum.photos/300/200?random=8',
        image_alt: 'Emily Rodriguez photo',
        grid_area: 'middle-right',
      },
      {
        title: 'David Park',
        description: 'DevOps Engineer ensuring reliable, scalable, and secure infrastructure for all projects.',
        content_type: 'image',
        image: 'https://picsum.photos/500/700?random=9',
        image_alt: 'David Park photo',
        grid_area: 'large-right',
      },
    ],
  },
};

// Technology stack
export const TechStack = {
  args: {
    eyebrow: 'Technology Stack',
    title: 'Built with Modern Technologies',
    description: 'We use the latest tools and frameworks to deliver cutting-edge solutions.',
    background_color: 'bg-gray-900',
    container_classes: 'text-white',
    grid_items: [
      {
        title: 'Frontend Framework',
        description: 'React with TypeScript for type-safe, maintainable user interfaces.',
        content_type: 'code',
        code_content: `import React, { useState, useEffect } from 'react';
import { User } from '../types/User';

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <LoadingSpinner />;
  if (!user) return <NotFound />;

  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};`,
        code_language: 'tsx',
        grid_area: 'large-left',
      },
      {
        title: 'Backend API',
        description: 'Node.js with Express for scalable server-side applications.',
        content_type: 'code',
        code_content: `const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

app.post('/api/users',
  body('email').isEmail(),
  body('name').isLength({ min: 2 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);`,
        code_language: 'js',
        grid_area: 'top-right',
      },
      {
        title: 'Database',
        description: 'PostgreSQL with Prisma ORM for robust data management.',
        content_type: 'code',
        code_content: `model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}`,
        code_language: 'prisma',
        grid_area: 'middle-right',
      },
      {
        title: 'DevOps & Deployment',
        description: 'Docker containers with Kubernetes orchestration for scalable deployments.',
        content_type: 'code',
        code_content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app
        image: myapp:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"`,
        code_language: 'yaml',
        grid_area: 'large-right',
      },
    ],
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Product features
export const ProductFeatures = {
  args: {
    title: 'Powerful Features for Modern Businesses',
    description: 'Everything you need to streamline operations and accelerate growth.',
    grid_items: [
      {
        title: 'Advanced Analytics',
        description: 'Get deep insights into your business performance with real-time dashboards and custom reports.',
        content_type: 'image',
        image: 'https://picsum.photos/600/800?random=10',
        image_alt: 'Analytics dashboard interface',
        grid_area: 'large-left',
      },
      {
        title: 'Team Collaboration',
        description: 'Built-in tools for seamless communication and project management across teams.',
        content_type: 'image',
        image: 'https://picsum.photos/400/300?random=11',
        image_alt: 'Team collaboration interface',
        grid_area: 'top-right',
      },
      {
        title: 'Automated Workflows',
        description: 'Save time with intelligent automation that handles repetitive tasks.',
        content_type: 'chart',
        grid_area: 'middle-right',
      },
      {
        title: 'API-First Design',
        description: 'Integrate with any system using our comprehensive REST API and webhooks.',
        content_type: 'code',
        code_content: `// Webhook handler example
app.post('/webhooks/payment', (req, res) => {
  const { event, data } = req.body;
  
  switch (event) {
    case 'payment.completed':
      await processPayment(data);
      await sendConfirmationEmail(data.customer);
      break;
      
    case 'payment.failed':
      await handleFailedPayment(data);
      await notifyCustomer(data.customer);
      break;
      
    default:
      console.log('Unknown event:', event);
  }
  
  res.status(200).json({ received: true });
});`,
        code_language: 'js',
        grid_area: 'large-right',
      },
    ],
  },
};

// Content types showcase - demonstrating all available content types
export const ContentTypes = {
  render: () => `
    <div class="space-y-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Content Type Examples</h2>
        <p class="text-gray-600">Demonstrating all available content_type options from the YAML schema</p>
      </div>
      
      <div class="space-y-16">
        <div>
          <h3 class="text-xl font-semibold mb-6">Image Content Type</h3>
          {% include 'sdc:bento-grid' with {
            title: 'Image Showcase',
            description: 'Different layouts with image content',
            grid_items: [
              {
                title: 'Large Left Image',
                description: 'Phone mockup style for large-left area',
                content_type: 'image',
                image: 'https://picsum.photos/600/800?random=20',
                grid_area: 'large-left'
              },
              {
                title: 'Standard Image',
                description: 'Regular image display',
                content_type: 'image',
                image: 'https://picsum.photos/400/300?random=21',
                grid_area: 'top-right'
              }
            ]
          } %}
        </div>
        
        <div>
          <h3 class="text-xl font-semibold mb-6">Code Content Type</h3>
          {% include 'sdc:bento-grid' with {
            title: 'Code Examples',
            description: 'Syntax-highlighted code blocks',
            grid_items: [
              {
                title: 'JavaScript API',
                description: 'Modern async/await patterns',
                content_type: 'code',
                code_content: 'const data = await fetch("/api/users").then(r => r.json());',
                code_language: 'js',
                grid_area: 'large-right'
              }
            ]
          } %}
        </div>
        
        <div>
          <h3 class="text-xl font-semibold mb-6">Chart Content Type</h3>
          {% include 'sdc:bento-grid' with {
            title: 'Data Visualization',
            description: 'Chart and visualization placeholders',
            grid_items: [
              {
                title: 'Performance Metrics',
                description: 'Chart visualization placeholder',
                content_type: 'chart',
                grid_area: 'top-right'
              }
            ]
          } %}
        </div>
      </div>
    </div>
  `,
};

// Grid areas comparison
export const GridAreas = {
  render: () => `
    <div class="space-y-12">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold mb-2">Grid Area Options</h2>
        <p class="text-gray-600">All available grid_area settings from the YAML schema</p>
      </div>
      
      {% include 'sdc:bento-grid' with {
        title: 'Grid Area Demonstration',
        description: 'Each item shows its grid_area setting',
        grid_items: [
          {
            title: 'Large Left Area',
            description: 'grid_area: "large-left" - Spans 2 rows on the left side',
            content_type: 'image',
            image: 'https://picsum.photos/600/800?random=30',
            grid_area: 'large-left'
          },
          {
            title: 'Top Right Area',
            description: 'grid_area: "top-right" - Single cell in top-right position',
            content_type: 'image',
            image: 'https://picsum.photos/400/300?random=31',
            grid_area: 'top-right'
          },
          {
            title: 'Middle Right Area',
            description: 'grid_area: "middle-right" - Single cell in middle-right position',
            content_type: 'image',
            image: 'https://picsum.photos/300/200?random=32',
            grid_area: 'middle-right'
          },
          {
            title: 'Large Right Area',
            description: 'grid_area: "large-right" - Spans 2 rows on the right side, perfect for code',
            content_type: 'code',
            code_content: '// This area is perfect for code examples\nconst greeting = "Hello World!";\nconsole.log(greeting);',
            code_language: 'js',
            grid_area: 'large-right'
          }
        ]
      } %}
    </div>
  `,
};

// Playground for testing all properties
export const Playground = {
  args: {
    eyebrow: 'Test Section',
    title: 'Playground Bento Grid',
    description: 'Test different configurations and properties',
    background_color: 'bg-gray-50',
    container_classes: '',
    grid_items: [
      {
        title: 'Test Item 1',
        description: 'Testing large-left grid area with image',
        content_type: 'image',
        image: 'https://picsum.photos/600/800?random=40',
        image_alt: 'Test image',
        grid_area: 'large-left',
        custom_classes: '',
      },
      {
        title: 'Test Item 2',
        description: 'Testing top-right area',
        content_type: 'chart',
        grid_area: 'top-right',
        custom_classes: '',
      },
    ],
  },
};