# Context7 Integration Guide

## Overview

This guide outlines the integration of Context7 MCP for automated best practice validation and enforcement in the adesso CMS project. Context7 serves as the authoritative source for Drupal 11, AI integration, and performance optimization patterns.

## Context7 MCP Configuration

### Available Context7 Tools

The project uses the following Context7 MCP tools for best practice validation:

```javascript
// Resolve library/framework for validation
mcp__context7__resolve-library-id({
  libraryName: "drupal-11" | "ai-integration" | "sdc-components" | "performance-optimization"
})

// Get comprehensive documentation and best practices  
mcp__context7__get-library-docs({
  context7CompatibleLibraryID: "/drupal/core/v11.2.2",
  topic: "performance" | "accessibility" | "security" | "ai-integration",
  tokens: 10000 // Maximum documentation to retrieve
})
```

### Framework Validation Patterns

#### Drupal 11 Core Validation

```javascript
// Validate Drupal development patterns
const drupalValidation = await mcp__context7__resolve-library-id({
  libraryName: "drupal-core"
});

const drupalDocs = await mcp__context7__get-library-docs({
  context7CompatibleLibraryID: "/drupal/core",
  topic: "module-development",
  tokens: 15000
});
```

**Validation Areas:**
- PSR-12 coding standards compliance
- Drupal API usage patterns
- Configuration management best practices
- Security pattern implementation
- Performance optimization strategies

#### AI Integration Validation

```javascript
// Validate AI integration patterns
const aiValidation = await mcp__context7__resolve-library-id({
  libraryName: "drupal-ai-integration"
});

const aiDocs = await mcp__context7__get-library-docs({
  context7CompatibleLibraryID: "/drupal/ai-integration",
  topic: "claude-openai-groq-integration",
  tokens: 12000
});
```

**Validation Areas:**
- AI provider configuration patterns
- Content generation safety protocols
- Performance impact assessment
- Security and privacy compliance
- User experience integration patterns

#### Component Development Validation

```javascript
// Validate SDC component patterns
const componentValidation = await mcp__context7__resolve-library-id({
  libraryName: "single-directory-components"
});

const componentDocs = await mcp__context7__get-library-docs({
  context7CompatibleLibraryID: "/drupal/sdc",
  topic: "component-architecture",
  tokens: 10000
});
```

**Validation Areas:**
- Component architecture patterns
- Storybook documentation standards
- Accessibility implementation (WCAG 2.1 AA)
- Performance optimization for components
- Testing strategy validation

## Lullabot Best Practice Integration

### Automated Lullabot Pattern Scraping

The Linear task coordinator integrates Lullabot best practices through Context7:

```javascript
// Search Lullabot performance patterns
const lullabotPerformance = await mcp__context7__resolve-library-id({
  libraryName: "lullabot-drupal-performance"
});

const performanceDocs = await mcp__context7__get-library-docs({
  context7CompatibleLibraryID: "/lullabot/drupal-performance",
  topic: "core-web-vitals",
  tokens: 8000
});
```

### Lullabot Integration Areas

#### Performance Optimization
- **Core Web Vitals**: Lullabot's CWV optimization strategies
- **Drupal Caching**: Advanced caching patterns and strategies
- **Asset Optimization**: Build pipeline and asset delivery optimization
- **Database Performance**: Query optimization and database tuning

#### Accessibility Excellence
- **WCAG 2.1 AA Compliance**: Lullabot's accessibility implementation patterns
- **Screen Reader Testing**: Automated and manual testing strategies  
- **Keyboard Navigation**: Comprehensive keyboard accessibility patterns
- **Color Contrast**: Automated contrast validation and remediation

#### Content Strategy
- **Editorial Workflows**: Content creation and management patterns
- **Multi-language Implementation**: Translation and localization strategies
- **SEO Optimization**: Technical SEO and content optimization
- **Content AI Integration**: Safe AI content generation patterns

## Quality Gate Integration

### Automated Quality Validation

Each Linear task includes Context7 validation across multiple quality dimensions:

```yaml
Context7 Quality Gates:
  Framework Compliance:
    - Drupal 11 API usage validation
    - Configuration management pattern check  
    - Security pattern verification
    - Performance pattern validation
    
  AI Integration Safety:
    - AI provider configuration validation
    - Content generation safety check
    - Performance impact assessment
    - Privacy compliance verification
    
  Component Standards:
    - SDC architecture pattern validation
    - Storybook documentation completeness  
    - Accessibility compliance check (WCAG 2.1 AA)
    - Visual regression prevention
    
  Performance Excellence:
    - Core Web Vitals threshold validation
    - Drupal cache efficiency check
    - Asset optimization verification
    - Database query performance validation
```

### Quality Validation Workflow

```javascript
// Comprehensive quality validation function
async function validateDevelopmentWork(taskContext) {
  // 1. Framework pattern validation
  const frameworkValidation = await mcp__context7__resolve-library-id({
    libraryName: taskContext.framework
  });
  
  const frameworkDocs = await mcp__context7__get-library-docs({
    context7CompatibleLibraryID: frameworkValidation.libraryId,
    topic: taskContext.focus,
    tokens: 10000
  });
  
  // 2. Best practice validation
  const bestPractices = await mcp__context7__resolve-library-id({
    libraryName: `lullabot-${taskContext.category}`
  });
  
  const practicesDocs = await mcp__context7__get-library-docs({
    context7CompatibleLibraryID: bestPractices.libraryId,
    topic: taskContext.specificArea,
    tokens: 8000
  });
  
  // 3. Generate validation report
  return {
    frameworkCompliance: validateFrameworkPatterns(frameworkDocs),
    bestPracticeAlignment: validateBestPractices(practicesDocs),
    qualityGateStatus: assessQualityGates(taskContext),
    recommendedActions: generateRecommendations(taskContext)
  };
}
```

## Agent Integration Patterns

### Linear Task Coordinator + Context7

The `linear-task-coordinator` integrates Context7 validation at every step:

```yaml
Task Creation Workflow with Context7:
  1. User Request Analysis:
     - Identify development patterns needed
     - Determine Context7 validation requirements
     - Plan quality gate implementation
     
  2. Context7 Pattern Validation:
     - Resolve appropriate library patterns
     - Retrieve best practice documentation
     - Validate against Lullabot recommendations
     - Generate compliance requirements
     
  3. Agent Routing with Validation Context:
     - Route to appropriate Drupal specialists
     - Provide Context7 validation context
     - Set quality gate expectations
     - Define completion criteria
     
  4. Completion Validation:
     - Re-validate against Context7 patterns
     - Confirm quality gate compliance
     - Document validation results in Linear
     - Generate handoff information
```

### Specialist Agent Integration

Each specialized agent receives Context7 validation context:

```yaml
Agent Context7 Integration Pattern:
  drupal-11-lead-developer:
    - Receives Drupal 11 pattern validation
    - Implements Context7-validated approaches
    - Reports compliance status to Linear
    
  drupal-ai-integration-specialist:
    - Validates AI integration patterns
    - Ensures safety and performance compliance
    - Documents AI-specific validation results
    
  sdc-component-specialist:
    - Validates component architecture patterns
    - Ensures accessibility compliance
    - Confirms Storybook documentation standards
    
  drupal-performance-specialist:
    - Applies Lullabot performance patterns
    - Validates Core Web Vitals compliance
    - Implements caching optimization strategies
```

## Validation Report Templates

### Framework Compliance Report

```yaml
Framework Validation Report:
  Library: /drupal/core/v11.2.2
  Validation Date: YYYY-MM-DD
  
  Compliance Status:
    API Usage: ✅/❌ [Details]
    Configuration Management: ✅/❌ [Details]
    Security Patterns: ✅/❌ [Details]
    Performance Patterns: ✅/❌ [Details]
    
  Recommendations:
    - [Specific improvement suggestions]
    - [Best practice applications]
    - [Risk mitigation strategies]
    
  Next Validation: [Scheduled re-validation]
```

### Best Practice Alignment Report

```yaml
Lullabot Best Practice Report:
  Category: Performance Optimization
  Source: /lullabot/drupal-performance
  Validation Date: YYYY-MM-DD
  
  Alignment Status:
    Core Web Vitals: ✅/❌ [Score: X/100]
    Caching Strategy: ✅/❌ [Implementation details]
    Asset Optimization: ✅/❌ [Optimization results]
    Database Performance: ✅/❌ [Query analysis]
    
  Implementation Notes:
    - [Applied patterns]
    - [Customizations made]
    - [Performance improvements]
    
  Monitoring Requirements:
    - [Metrics to track]
    - [Alert thresholds]
    - [Review schedule]
```

## Emergency Validation Protocols

### Critical Issue Context7 Integration

For production issues and security vulnerabilities, Context7 provides immediate validation:

```javascript
// Emergency validation for critical issues
async function emergencyValidation(issue) {
  const criticalPatterns = await mcp__context7__resolve-library-id({
    libraryName: `drupal-security-${issue.category}`
  });
  
  const securityDocs = await mcp__context7__get-library-docs({
    context7CompatibleLibraryID: criticalPatterns.libraryId,
    topic: "security-hardening",
    tokens: 15000
  });
  
  return {
    immediateActions: extractImmediateActions(securityDocs),
    remediationPatterns: extractRemediationPatterns(securityDocs),
    preventionStrategies: extractPreventionStrategies(securityDocs),
    monitoringRequirements: extractMonitoringRequirements(securityDocs)
  };
}
```

## Continuous Improvement

### Pattern Learning and Adaptation

Context7 integration enables continuous learning from community best practices:

```yaml
Continuous Improvement Cycle:
  1. Pattern Discovery:
     - Monitor Lullabot publications
     - Track Drupal community innovations
     - Identify emerging AI integration patterns
     
  2. Validation Integration:
     - Update Context7 library mappings
     - Enhance validation criteria
     - Refine quality gate definitions
     
  3. Agent Enhancement:
     - Update agent knowledge with new patterns
     - Refine routing and coordination logic
     - Improve quality validation accuracy
     
  4. Documentation Updates:
     - Update CLAUDE.md with new patterns
     - Enhance Linear workflow definitions
     - Improve Context7 integration guides
```

This Context7 integration ensures that the adesso CMS project maintains alignment with industry best practices while leveraging the collective knowledge of the Drupal community through automated validation and continuous improvement processes.