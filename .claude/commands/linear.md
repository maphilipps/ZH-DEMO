---
name: linear
description: |
  Comprehensive Linear task management integration for Drupal CMS development.
  Automatically creates, tracks, and manages Linear tasks with Context7 best practice enforcement.
  
  This command integrates seamlessly with the project's agent ecosystem to ensure every 
  development activity is properly documented in Linear with appropriate task dependencies,
  quality gates, and compliance validation.

examples:
  - name: "Create development task"
    command: "@linear --create 'Build product listing SDC component'"
    description: "Creates Linear task with Drupal CMS context and agent routing"
  
  - name: "Start task workflow" 
    command: "@linear --start VEN-123"
    description: "Initiates Linear task with proper agent coordination"
  
  - name: "Complete task with validation"
    command: "@linear --complete VEN-123 --validate"
    description: "Completes task with Context7 validation and quality gates"
---

# Linear Workflow Integration

## Command: `@linear`

Comprehensive Linear task management for Drupal CMS development with automatic agent coordination, Context7 best practice validation, and quality gate enforcement.

## Usage Patterns

### Basic Linear Operations

```bash
# Create new development task
@linear --create "Task description"

# Start existing task 
@linear --start VEN-123

# Update task status
@linear --update VEN-123 --status "In Progress"

# Complete task with validation
@linear --complete VEN-123 --validate

# List assigned tasks
@linear --list --assigned-to-me
```

### Advanced Workflow Integration

```bash  
# Create task with agent routing
@linear --create "Build user dashboard" --route-agents

# Create task with Context7 validation
@linear --create "Performance optimization" --validate-best-practices

# Create epic with sub-tasks
@linear --create-epic "AI Integration Phase 2" --breakdown

# Link task to PR/branch
@linear --link VEN-123 --branch feature/VEN-123-user-dashboard
```

### Quality Assurance Integration

```bash
# Create task with quality gates
@linear --create "SDC component" --with-qa-gates

# Run quality validation
@linear --validate VEN-123 --accessibility --performance --security

# Complete with full QA pipeline
@linear --complete VEN-123 --full-qa
```

## Flag Reference

### Task Creation Flags
- `--create "description"` - Create new Linear task
- `--epic "title"` - Create epic with sub-tasks  
- `--breakdown` - Automatically break complex tasks into sub-tasks
- `--route-agents` - Assign appropriate Drupal agents
- `--with-qa-gates` - Include quality assurance checkpoints

### Task Management Flags  
- `--start VEN-XXX` - Begin work on Linear task
- `--update VEN-XXX` - Update task status/details
- `--complete VEN-XXX` - Mark task as complete
- `--link VEN-XXX` - Link task to branch/PR
- `--assign "user"` - Assign task to team member

### Validation & Quality Flags
- `--validate` - Run Context7 best practice validation
- `--validate-best-practices` - Comprehensive best practice check
- `--accessibility` - Run WCAG 2.1 AA compliance validation
- `--performance` - Run Core Web Vitals validation  
- `--security` - Run security pattern validation
- `--full-qa` - Complete quality assurance pipeline

### Status & Priority Flags
- `--status "status"` - Set task status (Todo, In Progress, In Review, Done)
- `--priority "level"` - Set priority (Low, Medium, High, Urgent)
- `--sprint "name"` - Assign to specific sprint
- `--team "team"` - Assign to specific team

### Query & List Flags
- `--list` - List tasks with filters
- `--assigned-to-me` - Show only tasks assigned to current user
- `--by-status "status"` - Filter tasks by status
- `--by-priority "priority"` - Filter tasks by priority
- `--recent` - Show recently updated tasks

## Integration with Drupal CMS Agents

### Automatic Agent Routing

When creating tasks, the Linear coordinator automatically determines appropriate agents:

```yaml
# Content Management Tasks
Content Types: drupal-cms-content-types → drupal-11-lead-developer
Media Management: drupal-media-expert → drupal-11-lead-developer  
SEO Optimization: drupal-cms-seo-analytics → drupal-content-strategist

# Component Development Tasks  
SDC Components: sdc-component-specialist → storybook-sdc-maintainer
Theme Development: drupal-frontend-theming-specialist → tailwind-v4-expert
Responsive Design: tailwind-v4-expert → alpine-js-frontend-developer

# AI Integration Tasks
AI Features: drupal-ai-integration-specialist → drupal-11-lead-developer
AI Security: drupal-ai-integration-specialist → drupal-cms-security-privacy

# Operations Tasks
Configuration: drupal-configuration-expert → drupal-devops-engineer
Performance: drupal-performance-specialist → performance-optimizer
```

### Context7 Best Practice Integration

Every Linear task integrates with Context7 for best practice validation:

```javascript
// Automatic validation on task creation
const validation = await context7.validate({
  task: "Create user authentication component",
  framework: "drupal-11", 
  compliance: ["accessibility", "performance", "security"],
  patterns: ["sdc-component", "ai-integration"]
});

// Best practice recommendations  
const recommendations = await context7.getBestPractices({
  domain: "drupal-cms",
  source: "lullabot",
  category: "performance-optimization"
});
```

### Quality Gate Automation

Linear tasks automatically include quality gates:

```yaml
# Standard Quality Gates
Code Review: 
  - Agent: code-reviewer
  - Criteria: PSR-12, Drupal standards, security patterns

Performance Testing:
  - Agent: drupal-performance-specialist  
  - Criteria: Core Web Vitals >90, Drupal cache efficiency

Accessibility Audit:
  - Agent: qa-testing-specialist
  - Criteria: WCAG 2.1 AA compliance, screen reader testing

Documentation Review:
  - Agent: documentation-specialist
  - Criteria: Storybook documentation, API docs, Linear updates
```

## Workflow Examples

### Example 1: Create SDC Component Task

```bash
@linear --create "Build hero banner SDC component with AI content suggestions" --route-agents --with-qa-gates
```

**Generated Linear Tasks:**
```yaml
Epic: VEN-456 - Hero Banner SDC Component
Tasks:
  - VEN-456-1: Component architecture planning (sdc-component-specialist)
  - VEN-456-2: AI integration design (drupal-ai-integration-specialist)  
  - VEN-456-3: Component implementation (sdc-component-specialist)
  - VEN-456-4: Storybook documentation (storybook-sdc-maintainer)
  - VEN-456-5: Accessibility testing (qa-testing-specialist)
  - VEN-456-6: Performance validation (drupal-performance-specialist)
  - VEN-456-7: Code review (code-reviewer)
```

### Example 2: Performance Optimization Task

```bash
@linear --create "Optimize Core Web Vitals based on Lullabot recommendations" --validate-best-practices --full-qa
```

**Context7 Validation:**
- Lullabot performance patterns validated
- Core Web Vitals thresholds defined  
- Drupal-specific optimization strategies confirmed
- Quality gates established

**Agent Coordination:**
1. `drupal-performance-specialist` - Drupal-specific optimizations
2. `performance-optimizer` - General performance patterns
3. `drupal-configuration-expert` - Caching configuration
4. `qa-testing-specialist` - Performance regression testing

### Example 3: Complete Development Workflow

```bash
# Start task
@linear --start VEN-789

# Work with coordinated agents...
# (Agent coordination handled automatically)

# Complete with full validation
@linear --complete VEN-789 --full-qa --accessibility --performance --security
```

**Quality Validation Results:**
```yaml
Accessibility: ✅ WCAG 2.1 AA compliant
Performance: ✅ Core Web Vitals >90
Security: ✅ Security patterns validated  
Code Quality: ✅ Drupal standards met
Documentation: ✅ Storybook + Linear updated
```

## Integration with Existing Commands

### Seamless Integration with Current Workflow

The Linear command integrates with your existing command structure:

```bash
# Combined with existing commands
@work --start VEN-123 && @linear --start VEN-123
@fix --performance && @linear --create "Performance regression fix" --priority High
@optimize --full && @linear --update VEN-456 --status "Optimization Complete"
```

### DDEV Integration

```bash  
# Development environment with Linear tracking
ddev start && @linear --create "Development environment setup" --status "In Progress"
ddev theme build && @linear --update VEN-123 --note "Build completed successfully"
```

## Best Practices Integration

### Lullabot Pattern Integration
- Automatic scraping and validation of Lullabot best practices
- Context7 integration for community-validated patterns
- Performance optimization strategies from Lullabot expertise
- Accessibility patterns following Lullabot guidelines

### adesso Brand Guidelines
- "adesso wird immer klein geschrieben" - enforced in all documentation
- Brand-compliant component naming and documentation
- German-first content creation workflows
- Multi-language content management patterns

### Quality Enforcement
- Every task includes appropriate quality gates
- Context7 validation for all development patterns
- Automated compliance checking (accessibility, performance, security)
- Comprehensive documentation requirements

This Linear integration ensures that every development activity in your Drupal CMS project is properly tracked, follows established best practices, and maintains the high quality standards required for enterprise implementations.