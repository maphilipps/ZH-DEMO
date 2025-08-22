---
name: Agent Configuration README
description: Central documentation for specialized Claude agents optimized for the adesso CMS Drupal 11 development ecosystem
---

# adesso CMS Agent Configuration

## Overview

This directory contains specialized Claude agent configurations optimized for the adesso CMS project development lifecycle. Each agent is designed to handle specific aspects of the modern Drupal 11 development stack with AI integration.

## Agent Ecosystem

### Strategic & Coordination Agents

#### @drupal-enterprise-architect
**Role**: Enterprise-level architectural decisions and strategic oversight
**Specialization**: Recipe system architecture, AI integration strategy, performance architecture
**When to use**: Complex architectural decisions, multi-site planning, enterprise-scale optimizations

#### @drupal-technical-pm  
**Role**: Technical project management and workflow orchestration
**Specialization**: Jira task routing, multi-agent coordination, quality gate enforcement
**When to use**: Project planning, task coordination, workflow optimization, progress tracking

### Backend Development Agents

#### @drupal-11-lead-developer
**Role**: Core Drupal development and module creation
**Specialization**: Drupal 11.2.2 features, recipe development, custom modules
**When to use**: Core Drupal development, recipe creation, module architecture

#### @drupal-senior-backend-dev
**Role**: Complex integrations and performance optimization
**Specialization**: Advanced PHP 8.3+, security, performance, third-party integrations
**When to use**: Complex backend challenges, security implementations, performance optimization

#### @drupal-configuration-expert
**Role**: Configuration management and site building
**Specialization**: Configuration export/import, site building, deployment workflows
**When to use**: Configuration management, site setup, deployment preparation

#### @drupal-ai-integration-specialist
**Role**: AI provider integration and automation
**Specialization**: Multi-provider AI setup (Anthropic, OpenAI, Groq), content workflows
**When to use**: AI feature implementation, content automation, translation workflows

### Frontend Development Agents

#### @sdc-component-specialist
**Role**: Single Directory Component development
**Specialization**: SDC architecture, component design, Drupal integration
**When to use**: Component development, component library expansion, SDC optimization

#### @tailwind-v4-expert
**Role**: Tailwind CSS v4 styling and design systems
**Specialization**: Tailwind CSS v4, utility classes, responsive design, performance
**When to use**: Styling implementation, design system development, CSS optimization

#### @alpine-js-frontend-developer
**Role**: Interactive components and state management
**Specialization**: Alpine.js reactive patterns, component interactivity, performance
**When to use**: Interactive features, state management, frontend behavior implementation

#### @drupal-frontend-theming-specialist
**Role**: Drupal theming and Twig template development
**Specialization**: Twig templates, Drupal render system, theme integration
**When to use**: Drupal theming, template development, render system optimization

### Quality Assurance Agents

#### @storybook-sdc-maintainer
**Role**: Component library documentation and Storybook management
**Specialization**: Storybook 8.6.7, component documentation, design system maintenance
**When to use**: Component documentation, Storybook configuration, design system updates

#### @qa-testing-specialist
**Role**: Testing strategies and comprehensive validation
**Specialization**: Vitest, BackstopJS, Playwright, performance testing, automation
**When to use**: Test implementation, quality validation, testing strategy development

#### @drupal-performance-specialist
**Role**: Performance optimization and Core Web Vitals
**Specialization**: Performance monitoring, optimization strategies, Core Web Vitals
**When to use**: Performance issues, optimization projects, monitoring setup

#### @drupal-accessibility-specialist
**Role**: WCAG 2.1 AA compliance and inclusive design
**Specialization**: Accessibility testing, WCAG compliance, German BITV 2.0 standards
**When to use**: Accessibility audits, compliance validation, inclusive design implementation

### Content & Strategy Agents

#### @drupal-content-strategist
**Role**: Content architecture and multi-language strategy
**Specialization**: Content modeling, German-first strategy, multi-language workflows
**When to use**: Content architecture design, migration planning, editorial workflow setup

#### @drupal-ux-designer
**Role**: User experience design and interface optimization
**Specialization**: UI/UX design, user research, design system development
**When to use**: Design projects, user experience optimization, interface design

### Infrastructure Agents

#### @ddev-environment-specialist
**Role**: Development environment optimization
**Specialization**: DDEV configuration, container optimization, development workflows
**When to use**: Environment setup, development workflow optimization, container issues

#### @documentation-specialist
**Role**: Technical documentation and knowledge management
**Specialization**: Technical writing, API documentation, ADR management
**When to use**: Documentation projects, knowledge management, technical communication

## Agent Workflow Patterns

### Component Development Flow
```
@sdc-component-specialist → @tailwind-v4-expert → @alpine-js-frontend-developer → 
@drupal-accessibility-specialist → @storybook-sdc-maintainer → @qa-testing-specialist
```

### AI Integration Flow
```
@drupal-enterprise-architect → @drupal-ai-integration-specialist → 
@drupal-senior-backend-dev → @drupal-configuration-expert → @qa-testing-specialist
```

### Recipe Development Flow
```
@drupal-enterprise-architect → @drupal-11-lead-developer → 
@drupal-configuration-expert → @drupal-content-strategist → @qa-testing-specialist
```

### Performance Optimization Flow
```
@drupal-performance-specialist → @tailwind-v4-expert → @alpine-js-frontend-developer → 
@drupal-senior-backend-dev → @qa-testing-specialist
```

## Task Routing Guidelines

### Simple Tasks (Single Agent)
- **Configuration changes** → @drupal-configuration-expert
- **Styling updates** → @tailwind-v4-expert  
- **Component fixes** → @sdc-component-specialist
- **Documentation updates** → @documentation-specialist

### Medium Tasks (Multi-Agent Coordination)
- **Component development** → Component Development Flow
- **Performance optimization** → Performance Optimization Flow
- **AI feature implementation** → AI Integration Flow
- **Recipe creation** → Recipe Development Flow

### Complex Tasks (Full Team Coordination)
- **Architecture changes** → @drupal-enterprise-architect + specialist team
- **Major feature development** → Cross-domain collaboration
- **System integration** → @drupal-solution-architect + implementation team
- **Performance overhaul** → @drupal-performance-specialist + optimization team

## Quality Standards

### All Agents Must Ensure
- **WCAG 2.1 AA compliance** for all user-facing changes
- **Core Web Vitals >90** for performance-impacting changes  
- **German market compliance** including GDPR and brand guidelines
- **Testing coverage** with appropriate automated tests
- **Documentation updates** for all significant changes

### Agent-Specific Standards
- **Backend agents**: PSR-12 coding standards, strict typing, security validation
- **Frontend agents**: Responsive design, performance optimization, accessibility
- **Quality agents**: Comprehensive testing, automated validation, monitoring
- **Strategy agents**: Stakeholder communication, requirement validation, planning

## Jira Integration

### Automatic Agent Routing
The @drupal-technical-pm agent handles automatic routing of Jira tasks based on:
- **Task complexity** (simple, medium, complex)
- **Domain requirements** (backend, frontend, testing, etc.)
- **Current agent availability** and workload
- **Project dependencies** and timeline constraints

### Task Status Integration
- **Jira task creation** → Automatic agent assignment
- **Development progress** → Real-time status updates
- **Quality validation** → Automated testing and review
- **Task completion** → Final validation and closure

## Agent Validation Status

### ✅ Validated Agents (4/4 new agents)
- **@drupal-enterprise-architect**: Strategic architecture and coordination
- **@drupal-technical-pm**: Project management and workflow orchestration  
- **@drupal-content-strategist**: Content strategy and multi-language planning
- **@drupal-accessibility-specialist**: WCAG compliance and inclusive design

### 🔄 Enhanced Existing Agents (12/12 identified)
All existing agents have been validated against project requirements and updated knowledge bases established for:
- Drupal 11.2.2 specific features and best practices
- Modern frontend tooling (Vite 6.2.0, Tailwind CSS v4, Alpine.js)
- AI integration patterns (Anthropic, OpenAI, Groq)
- Testing frameworks (Vitest, BackstopJS, Playwright)
- German market compliance and multi-language support

## Usage Examples

### Starting a New Component
```
"Create a responsive card component with Storybook integration"
→ Routed to: Component Development Flow
→ Lead: @sdc-component-specialist
→ Timeline: 1-2 days with testing and documentation
```

### Implementing AI Features
```
"Add AI-powered content suggestions to the editorial interface"
→ Routed to: AI Integration Flow  
→ Lead: @drupal-ai-integration-specialist
→ Timeline: 3-5 days with full integration and testing
```

### Performance Optimization
```
"Optimize site performance for mobile Core Web Vitals"
→ Routed to: Performance Optimization Flow
→ Lead: @drupal-performance-specialist  
→ Timeline: 2-3 days with comprehensive optimization
```

## Monitoring and Optimization

### Agent Performance Metrics
- **Task completion times** by agent and complexity
- **Quality scores** based on review feedback and testing
- **Coordination efficiency** in multi-agent workflows
- **User satisfaction** with agent assistance quality

### Continuous Improvement
- **Monthly agent knowledge updates** for technology changes
- **Quarterly workflow optimization** based on performance data
- **Annual agent capability assessment** and enhancement planning
- **Real-time feedback integration** for immediate improvements

---

*This agent ecosystem represents a comprehensive development support system optimized for the sophisticated requirements of modern Drupal 11 CMS development with AI integration, ensuring high quality, performance, and maintainability across all project aspects.*