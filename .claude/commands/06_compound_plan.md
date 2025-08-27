# Planning Command for GPZH Development

## 📚 Learning Integration
**Learning Trigger**: Systematic planning that applies learned patterns and prevention rules
**Knowledge Goal**: Create actionable development plans that build on past learnings
**TDD Approach**: Every plan becomes a template for more efficient future planning

## 🎯 Command Objective

Create comprehensive, learning-informed development plans for GPZH project tasks. This command applies prevention rules from CLAUDE.md, coordinates three-lane requirements, and sets up systematic learning capture.

## Planning Process

### Step 1: Context & Risk Analysis
**Review Prevention Rules**: Identify applicable rules from CLAUDE.md for the task
```bash
# Quick check of relevant patterns
grep -A 3 "Prevention Rule" CLAUDE.md | grep -A 3 "$TASK_DOMAIN"
git branch --show-current
gh issue list --state=closed --limit=5 | grep -i "$PLANNING_TOPIC"
```

**Risk Assessment**: Apply learned prevention rules to identify potential issues:
- **Configuration Risks**: Rules #1, #3, #4, #8 (Frontend editing, Drupal MCP, DDEV, paragraph rendering)
- **Process Risks**: Rules #2, #5, #6, #7 (Tool selection, testing, git locks, infrastructure)
- **GPZH-Specific Risks**: Swiss compliance, municipal portal scalability, multi-theme compatibility

### Step 2: Agent Recommendations
**Core Planning Team** (adjust based on task complexity):
- **Primary**: @fullstack-solutions-architect (architecture decisions)
- **Technical**: @drupal-mcp-developer (implementation approach)
- **Learning**: @codebase-researcher (pattern capture)

**Specialized Agents** (select based on domain):
- **Database/Performance**: @database-optimization-specialist + @database-performance-auditor
- **Frontend/Themes**: @tailwind-v4-expert + @twig-template-specialist + @drupal-sdc-architect
- **Swiss Compliance**: @swiss-compliance-specialist + @swiss-compliance-auditor
- **Testing**: @quality-assurance-gatekeeper + @master-auditor-reviewer

### Step 3: Three-Lane Integration
**Planning Lane**:
- [ ] Architecture decisions documented
- [ ] Swiss compliance requirements identified
- [ ] Performance impact assessed
- [ ] Learning objectives defined

**Building Lane Preparation**:
- [ ] Implementation approach defined
- [ ] Drupal MCP integration points identified
- [ ] Testing strategy outlined (Rule #4: use `ddev npm` commands)
- [ ] Tool selection confirmed (Rule #2: Playwright over Puppeteer)

**Reviewing Lane Framework**:
- [ ] Quality gates defined
- [ ] Swiss compliance validation planned
- [ ] Accessibility testing requirements outlined
- [ ] Security validation protocols established

### Step 4: Implementation Planning
```markdown
# Implementation Plan for [TASK_NAME]

## Learning-Informed Approach
**Relevant Prevention Rules**: [List applicable rules from CLAUDE.md]
**Expected Learning Outcomes**: [What will be learned and documented]
**Compound Benefits**: [How this will accelerate future similar tasks]

## Technical Implementation
1. **Preparation Phase**
   - [ ] Review CLAUDE.md for relevant patterns
   - [ ] Set up TodoWrite tracking
   - [ ] Confirm tool requirements (Drupal MCP, Playwright, etc.)

2. **Execution Phase** 
   - [ ] Apply prevention rules proactively
   - [ ] Document learnings in real-time
   - [ ] Use approved tools and processes

3. **Learning Integration Phase**
   - [ ] Update CLAUDE.md with new patterns
   - [ ] Create prevention rules from any failures
   - [ ] Document compound benefits achieved

## Risk Mitigation
**High-Risk Areas**: [Based on prevention rules]
**Mitigation Strategies**: [Specific approaches from learned patterns]
**Escalation Triggers**: [When to stop and document before proceeding]

## Success Criteria
- [ ] Original objective achieved
- [ ] No prevention rules violated  
- [ ] New learnings documented in CLAUDE.md
- [ ] Three-lane system properly utilized
```

## Planning Patterns by Task Type

### GPZH Municipality Content Tasks
- Use existing paragraph population scripts as templates
- Apply Swiss compliance requirements from unlighthouse.config.ts
- Follow hierarchical navigation structures
- Consider multi-theme architecture (zh_erlenbach, zh_thalheim, etc.)

### Drupal Configuration Changes
- Always plan Drupal MCP usage (Rule #3)
- Account for Layout Builder complexities (Rule #8 considerations)
- Plan comprehensive testing with `ddev npm` commands (Rule #4)
- Include cache clearing and configuration import steps

### Frontend/Theme Development
- Plan Tailwind theme variable definitions, never utility class overrides (CSS Rule #1)
- Include comprehensive browser testing with Playwright
- Account for component architecture and SDC patterns
- Consider performance impact across municipalities

## Quality Gates

Before proceeding to implementation:
- [ ] All relevant prevention rules considered
- [ ] Learning objectives clearly defined
- [ ] Three-lane requirements documented
- [ ] Risk mitigation strategies established
- [ ] Implementation approach aligns with GPZH context
- [ ] Agent assignments appropriate for task complexity

## Usage Examples

```bash
# Plan a new feature with learning capture
/plan "Implement municipal service request form with Swiss compliance"

# Plan critical bug fix with prevention rule focus
/plan "Fix paragraph rendering issue - investigate Rule #8 root cause"

# Plan refactoring with architecture consideration
/plan "Optimize theme architecture for multi-municipality scaling"

# Plan content population with established patterns
/plan "Populate remaining 31 Bruchtal nodes with paragraph content"
```

## 🎯 Learning Outcomes from This Command

- **Prevention Rule Application**: Systematic use of learned patterns to avoid recurring issues
- **Three-Lane Coordination**: Structured approach to cross-functional planning requirements
- **Learning-First Planning**: Plans that capture knowledge alongside achieving objectives
- **Compound Planning Efficiency**: Each plan builds on previous learnings for faster future planning

## 📝 Learning Documentation

### New Patterns Discovered
- **Risk-Prevention Planning**: Proactive application of CLAUDE.md rules to prevent known issues
- **Domain-Specific Agent Assignment**: Matching specialized agents to task complexity and type
- **Three-Lane Planning Integration**: Coordinating Planning, Building, and Reviewing requirements

### Knowledge Added to System
- **GPZH-Specific Planning Templates**: Municipal portal patterns and Swiss compliance integration
- **Drupal 11.2.2 Planning Framework**: Configuration management and component architecture
- **Learning-Informed Risk Assessment**: Using prevention rules for proactive risk mitigation

### Potential Improvement Areas
- Agent assignment could be more automated based on task analysis
- Prevention rule matching could be enhanced with pattern recognition
- Three-lane coordination could be more systematically integrated

**Next Learning Opportunity**: Track planning effectiveness and compound benefits - measure how systematically applying prevention rules and learned patterns reduces planning time and improves success rates for GPZH development tasks.