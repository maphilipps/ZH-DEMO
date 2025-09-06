---
description: Core principles and workflows for Compound Engineering practices that create exponentially improving development systems.
author: Compound Engineering Team
version: 1.0
tags: ["compound-engineering", "core-behavior", "exponential-improvement", "learning-loop"]
globs: ["*"]
---
# Compound Engineering Core Principles

**Objective:** Implement development practices where every action creates systems that make future actions faster, safer, and more intelligent. Each improvement compounds exponentially with previous improvements.

## Core Philosophy

**Systems Create Systems**: Focus on designing systems that design systems, not just solving individual problems. Every solution should make the next similar problem easier to solve.

## Learning Loop Integration

### Mandatory Learning Capture
Every interaction MUST result in permanent institutional knowledge:

1. **Capture Architectural Decisions**: Document why decisions were made, not just what was decided
2. **Convert Failures to Prevention**: Every bug becomes a test and a prevention rule
3. **Pattern Recognition**: Identify repeating patterns and codify them into reusable solutions
4. **Context Preservation**: Maintain project memory that survives team changes

### Learning Documentation Process
- Use `memory-bank/` for session-to-session knowledge transfer
- Create ADRs (Architecture Decision Records) for significant choices
- Update `.claude/rules/` based on discovered patterns
- Build compound knowledge that gets smarter over time

## Parallel AI Orchestration

### Multi-Agent Coordination
**MUST** use specialized Drupal agents for complex tasks:

1. **Planning Phase**: Use `drupal-content-architect` and `drupal-solution-architect` for architectural decisions
2. **Implementation Phase**: Use `drupal-module-developer`, `drupal-theme-specialist`, and `ddev-orchestrator` for code generation
3. **Review Phase**: Use `drupal-code-quality-inspector`, `drupal-accessibility-auditor`, and `adr-reviewer` for quality assurance
4. **Learning Phase**: Use `drupal-knowledge-curator` and `feedback-codifier` for pattern extraction

### Agent Handoff Protocol
When context exceeds 50% or logical phases complete:

```markdown
## Handoff Context Template
### Completed Work
[Detailed accomplishments with file references]

### Current State  
[Exact system state with environment details]

### Next Actions
[Specific next steps with success criteria]

### Compound Learnings
[Patterns discovered that improve future work]
```

## Exponential Improvement Tracking

### Success Metrics
Track these compound indicators:
- **Time to Similar Solution**: How much faster is the next similar task?
- **Error Reduction Rate**: How many fewer bugs occur in similar contexts?
- **Knowledge Reuse**: How often are previous patterns successfully applied?
- **System Self-Improvement**: How much does the system improve itself automatically?

### Improvement Documentation
**MUST** document in `memory-bank/consolidated_learnings.md`:
- What made this solution faster than previous attempts
- Which patterns were reused successfully
- How this solution will accelerate future work
- What systematic improvements resulted

## Trust but Verify

### Automation with Validation
- Enable AI autonomy for well-understood patterns
- Require human validation for new architectural decisions
- Create automatic quality gates that improve over time
- Build validation checkpoints that learn from feedback

### Progressive Trust Building
1. **Phase 1**: Human approval for all decisions
2. **Phase 2**: Auto-approval for proven patterns
3. **Phase 3**: AI suggests new patterns for approval
4. **Phase 4**: Full autonomy for established domains

## Implementation Requirements

### Every Task MUST:
1. **Start with Memory Check**: Review relevant `memory-bank/` files
2. **Document Decisions**: Create or update ADRs for significant choices
3. **Capture Patterns**: Identify reusable patterns and document them
4. **Update Rules**: Add new rules to `.claude/rules/` based on learnings
5. **Measure Improvement**: Track how this work improves future similar work

### Quality Gates
Before task completion, verify:
- [ ] Relevant memories updated
- [ ] Patterns documented for reuse
- [ ] Rules updated with new learnings
- [ ] ADRs created for architectural decisions
- [ ] Compound improvement tracked

## Failure Recovery Protocol

When things go wrong:
1. **Document the Failure**: Exact conditions and decisions that led to failure
2. **Root Cause Analysis**: Why did our systems allow this failure?
3. **System Improvement**: What automatic prevention can we add?
4. **Pattern Update**: How do we prevent this class of failure in the future?
5. **Knowledge Distribution**: How do we share this learning across the system?

## Continuous System Evolution

The compound engineering system itself MUST improve:
- Rules should become more precise over time
- Agents should become more capable
- Patterns should become more reusable
- Quality should increase automatically

**Remember**: We're not just building software, we're building systems that build better software. Every action should contribute to exponential improvement of our development capabilities.