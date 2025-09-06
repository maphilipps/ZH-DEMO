---
description: Rules for maintaining consistency across the AI agent ecosystem, ensuring agents work together effectively and build compound capabilities over time.
author: Compound Engineering Team
version: 1.0
tags: ["agent-ecosystem", "consistency", "compound-engineering", "agent-orchestration", "drupal-agents"]
globs: [".claude/agents/**/*.md", ".claude/rules/**/*.md"]
---

# Agent Ecosystem Consistency Rules

**Objective:** Create and maintain a coherent AI agent ecosystem where agents complement each other, share consistent patterns, and build compound capabilities that accelerate with each interaction.

## Ecosystem Architecture Principles

### Hierarchical Agent Organization

**Level 1: Infrastructure Agents** (Foundation)
- Environment setup and configuration
- DDEV management and debugging
- Development tool integration

**Level 2: Core Drupal Agents** (Building Blocks)  
- Content architecture (content types, fields, entities)
- Module development and configuration
- Theme and component development
- Performance and security

**Level 3: Specialized Domain Agents** (Advanced Features)
- AI integration and vector search
- Municipal portal requirements
- German market compliance
- Advanced workflow automation

**Level 4: Orchestration Agents** (Coordination)
- Multi-agent task coordination
- Quality assurance and review
- Learning capture and rule generation

## CRITICAL CONSISTENCY RULES

### Rule 1: Agent Metadata Standards

**REQUIRED frontmatter structure** for all agents:

```yaml
---
name: agent-kebab-case-name
description: Specific use case description with clear examples. Include when to use this agent vs alternatives. Examples should show context, user request, and agent selection reasoning.
color: [red|blue|green|yellow|purple|pink|orange|gray]  # Category-based
capabilities: ["drupal", "ddev", "frontend", "ai", "compliance"]  # For orchestration
dependencies: ["agent-name-1", "agent-name-2"]  # Required predecessor agents
handoff_targets: ["agent-name-3", "agent-name-4"]  # Recommended next agents
technology_stack: ["drupal-11", "php-8.3", "ddev", "mariadb"]  # Verify alignment
context_requirements: ["german-language", "municipal-portal", "accessibility"]
---
```

**Color Coding by Category**:
- **Red**: Infrastructure/DevOps (DDEV, environment, deployment)
- **Blue**: Core Drupal (content, modules, configuration)  
- **Green**: Frontend/Design (theming, Storybook, components)
- **Yellow**: AI/Intelligence (search, automation, learning)
- **Purple**: Compliance/Quality (security, accessibility, testing)
- **Pink**: Orchestration/Meta (planning, coordination, review)

### Rule 2: Agent Capability Declaration

Every agent MUST declare its capabilities for orchestration:

```yaml
capabilities:
  primary: "drupal-content-architecture"      # Main function
  secondary: ["field-configuration", "permissions"]  # Supporting functions  
  integrations: ["ddev", "drush", "storybook"]      # Required tools
  complexity: "intermediate"                   # beginner|intermediate|advanced
  estimated_duration: "30-60 minutes"        # Typical task completion time
```

**Capability Categories**:
- **drupal-core**: Basic Drupal operations
- **drupal-advanced**: Complex architecture and custom development
- **frontend**: Theming, components, JavaScript
- **devops**: DDEV, deployment, monitoring
- **ai-integration**: AI modules, vector search, automation
- **compliance**: Accessibility, security, German requirements
- **orchestration**: Multi-agent coordination

### Rule 3: Handoff Protocol Standards

**Consistent handoff format** between agents:

```markdown
## Handoff Context
### Completed Work
- [Specific accomplishments with file references]
- [Configuration changes made]
- [Tests run and results]

### Current State
- DDEV status: [running|stopped|needs restart]
- Database state: [clean|needs migration|has test data]  
- Cache status: [cleared|needs clearing]
- Git state: [clean|has uncommitted changes]

### Next Actions
- [Specific next steps with success criteria]
- [Required tools or permissions]
- [Expected outputs or deliverables]

### Compound Learnings
- [Patterns discovered for future reuse]
- [Optimization opportunities identified]
- [Rule improvements needed]

### Recommended Next Agent
**Agent**: [agent-name]
**Reason**: [Why this agent is optimal for next steps]
**Context**: [Specific information needed for handoff]
```

### Rule 4: German/Municipal Context Consistency

**STANDARD German/Municipal Requirements** (apply across all relevant agents):

```markdown
## Municipal Portal Context
- **Language**: German-first interface, English fallback
- **Compliance**: Swiss accessibility standards (WCAG 2.1 AA+)
- **User Types**: Citizens, municipal employees, department heads
- **Content Types**: Official announcements, forms, services, events
- **Workflow**: Draft → Review → Legal Check → Publish
- **Security**: Role-based access, audit trails, data protection

## German Language Integration
- Error messages in German with English fallback
- Form labels and validation messages in German  
- Content workflow status in German
- Admin interface German translation
- Date/time formats: DD.MM.YYYY, 24-hour time
```

### Rule 5: DDEV Integration Standards

**Standard DDEV operations** across all agents:

```bash
# REQUIRED pre-work checks
ddev describe                 # Verify project status
ddev drush status            # Check Drupal status
ddev logs --follow          # Monitor for errors

# STANDARD development workflow
ddev start                   # Always start with this
ddev composer install       # PHP dependencies
ddev drush cr               # Clear cache after changes
ddev drush updb -y          # Run updates if needed

# REQUIRED post-work validation
ddev drush cr               # Clear cache
ddev exec "cd web && find . -name '*.log' -exec tail -n 5 {} \;" # Check logs
ddev describe               # Verify services running
```

### Rule 6: Error Handling Patterns

**Standardized error resolution** across agents:

```markdown
## Error Resolution Hierarchy
1. **DDEV Issues**: Restart services, check logs, rebuild if needed
2. **Drupal Issues**: Clear cache, run updates, check permissions
3. **Database Issues**: Check connection, run migrations, verify schema
4. **Theme Issues**: Rebuild assets, clear Twig cache, check Vite
5. **AI Integration Issues**: Check API keys, verify vector DB, test connections

## Error Documentation Protocol
When encountering errors:
- [ ] Document exact error message and context
- [ ] Note resolution steps taken
- [ ] Update agent with improved error handling  
- [ ] Create prevention rules if pattern emerges
- [ ] Log compound learning for ecosystem improvement
```

## Agent Discovery and Selection Rules

### Automatic Agent Selection Criteria

**When multiple agents could handle a task**, select based on:

1. **Specificity Match**: More specific agent beats general agent
2. **Technology Stack Alignment**: Agent with exact stack match preferred
3. **Context Appropriateness**: Municipal/German context when relevant
4. **Capability Overlap**: Minimize handoffs between agents
5. **Compound Learning**: Agent that builds on recent patterns

**Selection Decision Tree**:
```
Is task Drupal-specific? → Yes: Use Drupal agent category
↓ No: Use general agent
Is DDEV involved? → Yes: Prefer DDEV-capable agent  
↓ No: Use non-DDEV agent
Is German/municipal context needed? → Yes: Use context-aware agent
↓ No: Use general agent
Is AI integration involved? → Yes: Use AI-capable agent
↓ No: Use standard agent
```

### Agent Orchestration Patterns

**Sequential Orchestration** (one after another):
```
Environment Setup → Content Architecture → Theme Development → Testing → Deployment
```

**Parallel Orchestration** (simultaneous):
```
Content Development + Theme Development + AI Configuration
→ Integration Testing → Quality Assurance
```

**Feedback Loop Orchestration** (iterative improvement):
```
Implementation → Testing → Learning Capture → Rule Update → Next Implementation (faster)
```

## Compound Learning Integration

### Cross-Agent Learning Protocol

**When any agent discovers patterns**, update ecosystem:

1. **Pattern Identification**: Document what worked/failed
2. **Applicability Assessment**: Which other agents could benefit
3. **Rule Propagation**: Update relevant agent behaviors
4. **Verification Testing**: Ensure changes improve outcomes
5. **Ecosystem Documentation**: Update shared knowledge base

### Agent Effectiveness Tracking

**Metrics to track per agent**:
- Task completion rate
- Time to completion  
- Error frequency and types
- Handoff success rate
- User satisfaction rating
- Compound learning contribution

**Ecosystem Metrics**:
- Multi-agent coordination success
- Knowledge transfer effectiveness
- Pattern reuse across agents
- Overall development velocity improvement

## Quality Gates for Agent Ecosystem

### Pre-Deployment Ecosystem Checks

**MUST VERIFY** before adding new agents:
- [ ] Metadata follows standard format
- [ ] Technology stack aligns with project
- [ ] Handoff protocol implemented correctly
- [ ] German/municipal context included where relevant
- [ ] DDEV integration patterns followed
- [ ] Error handling meets standards
- [ ] Capability mapping complete

### Ongoing Ecosystem Maintenance

**Monthly Reviews**:
- Agent usage patterns analysis
- Cross-agent handoff success rates
- Technology stack alignment verification
- Compound learning capture effectiveness
- Rule propagation success measurement

**Quarterly Optimization**:
- Agent consolidation opportunities
- New capability gap identification  
- Orchestration pattern improvement
- Ecosystem architecture refinement

**Remember**: A consistent agent ecosystem multiplies the effectiveness of each individual agent. Inconsistencies create friction that reduces compound benefits. Every agent should feel like part of a unified, intelligent system working toward common goals.