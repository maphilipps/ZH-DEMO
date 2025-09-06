---
description: Systematic verification and maintenance rules for AI agents to ensure continued accuracy, prevent technology drift, and capture compound learning from agent interactions.
author: Compound Engineering Team
version: 1.0
tags: ["agent-maintenance", "verification", "compound-learning", "technology-drift", "quality-assurance"]
globs: [".claude/agents/**/*.md", ".claude/rules/**/*.md"]
---

# Agent Verification and Maintenance Rules

**Objective:** Establish systematic verification and maintenance processes that ensure agents remain accurate over time and contribute to compound learning that improves the entire agent ecosystem.

## Technology Drift Prevention Protocol

### Continuous Verification System

**AUTOMATED CHECKS** (run before any agent deployment):

```bash
# Technology Stack Verification Script
#!/bin/bash
echo "🔍 Verifying Agent Technology Accuracy..."

# Check for Rails references that should not exist
echo "❌ Checking for Rails references..."
grep -r "rails\|Rails\|bundle\|gem install" .claude/agents/ | grep -v "migration" | grep -v "NOT"

# Verify DDEV patterns are used
echo "✅ Checking for DDEV usage..."
grep -r "ddev\|\.ddev\.site" .claude/agents/

# Check for correct database references
echo "🗃️ Checking database references..."
grep -r "sqlite\|SQLite" .claude/agents/ | grep -v "NOT"
grep -r "mariadb\|MariaDB\|mysql" .claude/agents/

# Verify Drupal-specific patterns
echo "🌐 Checking Drupal patterns..."
grep -r "drupal\|Drupal\|drush" .claude/agents/
```

### Monthly Agent Health Audit

**SYSTEMATIC REVIEW PROCESS**:

```markdown
## Monthly Agent Audit Checklist

### Week 1: Technology Stack Alignment
- [ ] Run automated verification script
- [ ] Check 5 random agents for Rails references
- [ ] Verify all DDEV URLs are current
- [ ] Update any outdated technology versions

### Week 2: Context Accuracy Review  
- [ ] Verify German/municipal context in relevant agents
- [ ] Check Swiss compliance references are current
- [ ] Review accessibility requirements (WCAG 2.1 AA)
- [ ] Update municipal portal use cases

### Week 3: Integration Testing
- [ ] Test 3 agents end-to-end with actual project
- [ ] Verify DDEV integration works correctly
- [ ] Check Drupal command accuracy
- [ ] Validate error handling paths

### Week 4: Compound Learning Integration
- [ ] Review successful agent usage patterns
- [ ] Document new patterns discovered
- [ ] Update agent creation templates
- [ ] Propagate learnings across ecosystem
```

## Agent Performance Monitoring

### Success Metrics Tracking

**TRACK these metrics** for each agent:

```markdown
## Agent Effectiveness Metrics

### Usage Metrics
- Invocation frequency (how often used)
- Task completion rate (successful outcomes)  
- Time to completion (efficiency)
- Error rate (accuracy issues)
- User satisfaction rating

### Technical Accuracy Metrics
- Framework reference accuracy (0 wrong references)
- Command success rate (DDEV commands work)
- URL accuracy (all URLs accessible)
- Context appropriateness (German/municipal when needed)

### Compound Learning Metrics
- Pattern reuse (how often agent patterns help others)
- Knowledge transfer (insights that improve other agents)
- Systematic improvement (contribution to rule evolution)
- Prevention effectiveness (problems avoided)
```

### Agent Usage Pattern Analysis

**ANALYZE usage to improve ecosystem**:

```markdown
## Usage Pattern Recognition

### High-Performing Agents
- Which agents complete tasks most efficiently?
- What patterns do successful agents share?
- How do high performers handle errors?
- What makes their handoffs effective?

### Improvement Opportunities  
- Which agents have high error rates?
- What technology assumptions cause failures?
- Where do handoffs break down?
- Which contexts need better coverage?

### Ecosystem Gaps
- What tasks lack appropriate agents?
- Where do multiple agents overlap inefficiently?
- Which specializations need deeper agents?
- What orchestration patterns are missing?
```

## Compound Learning Integration

### Learning Capture Protocol

**SYSTEMATICALLY CAPTURE** insights from agent interactions:

```markdown
## Learning Documentation Process

### After Each Significant Agent Usage
1. **Pattern Recognition**:
   - What worked better than expected?
   - What caused unexpected issues?
   - Which assumptions were wrong?
   - What would improve next time?

2. **Knowledge Codification**:
   - Update relevant agents with improvements
   - Add new verification rules if needed
   - Create new patterns for reuse
   - Document edge cases discovered

3. **Ecosystem Propagation**:
   - Which other agents could benefit?
   - What systematic improvements are needed?
   - How can this prevent future issues?
   - What rules should be updated?

4. **Compound Impact Assessment**:
   - How much faster was this vs manual work?
   - What compound benefits were created?
   - How will this accelerate future similar tasks?
   - What exponential improvements resulted?
```

### Rule Evolution Protocol

**SYSTEMATIC RULE IMPROVEMENT** based on agent learning:

```markdown
## Rule Update Triggers

### Immediate Updates (Fix Within 24 Hours)
- Agent gives incorrect technology commands
- Framework assumptions cause task failures  
- DDEV integration broken or outdated
- Security or compliance issues discovered

### Planned Updates (Next Monthly Review)
- Usage patterns suggest better approaches
- Successful practices should be standardized
- Error patterns suggest prevention rules needed
- Context requirements have evolved

### Compound Updates (Quarterly Reviews)
- Agent ecosystem architecture needs refinement
- New orchestration patterns have emerged
- Technology stack evolution requires updates
- Municipal/German requirements have changed
```

## Quality Gates Evolution

### Dynamic Quality Improvement

**QUALITY GATES THAT GET SMARTER**:

```markdown
## Evolving Quality Standards

### Version 1.0 Quality Gates (Current)
- No Rails references in Drupal agents
- DDEV URLs only (.ddev.site)
- MariaDB references, not SQLite
- German/municipal context where appropriate

### Version 1.1 Improvements (Based on Learning)
- Automated technology stack verification
- Context appropriateness scoring
- Integration test requirements
- Compound learning contribution metrics

### Version 2.0 Vision (Future Evolution)
- Predictive agent accuracy scoring  
- Automatic technology drift correction
- Self-updating verification protocols
- Compound intelligence optimization
```

### Preventive Maintenance

**PROACTIVE IMPROVEMENT** patterns:

```markdown
## Preventive Agent Maintenance

### Technology Change Alerts
- Monitor composer.json changes
- Track DDEV configuration updates
- Watch for new Drupal modules
- Alert when agent assumptions become outdated

### Context Evolution Tracking
- Municipal requirements changes
- German compliance updates
- Accessibility standard evolution
- User need pattern shifts

### Performance Degradation Detection
- Success rate trending downward
- Increased error frequency
- Longer task completion times
- User satisfaction declining
```

## Agent Lifecycle Management

### Agent Creation → Maturation → Optimization

```markdown
## Agent Lifecycle Stages

### Stage 1: New Agent Creation
- Technology stack verification (100% accuracy required)
- Context appropriateness assessment
- Integration testing with actual project
- Initial performance baseline establishment

### Stage 2: Active Development Usage  
- Performance monitoring and optimization
- Error pattern identification and correction
- Usage context expansion based on real needs
- Compound learning contribution tracking

### Stage 3: Mature Agent Maintenance
- Systematic verification of continued accuracy
- Evolutionary improvement based on compound learning
- Advanced orchestration pattern development  
- Knowledge transfer to newer agents

### Stage 4: Legacy Agent Management
- Technology obsolescence assessment
- Migration path to newer agents
- Knowledge preservation for future reference
- Graceful deprecation with user guidance
```

## Systematic Intelligence Evolution

### Agent Ecosystem Getting Smarter

**COMPOUND INTELLIGENCE DEVELOPMENT**:

1. **Pattern Recognition**: Agents learn from successful interactions
2. **Systematic Improvement**: Patterns become rules that improve all agents
3. **Predictive Capability**: Rules prevent problems before they occur
4. **Exponential Enhancement**: Each improvement amplifies previous improvements

### Intelligence Feedback Loops

```markdown
## Compound Learning Cycles

### Daily Learning Cycle
- Agent interactions → Immediate pattern recognition
- Pattern assessment → Quick fixes deployed
- Fix validation → Success patterns documented

### Weekly Learning Cycle  
- Pattern aggregation → Systematic rule updates
- Rule deployment → Agent ecosystem improvement
- Improvement measurement → Compound benefit tracking

### Monthly Learning Cycle
- Ecosystem assessment → Strategic enhancement planning
- Enhancement implementation → Capability expansion
- Capability validation → Intelligence evolution documentation
```

**Remember**: An agent ecosystem that learns and improves systematically becomes exponentially more valuable over time. Every verification, maintenance, and learning cycle should contribute to making future development faster, more accurate, and more intelligent.