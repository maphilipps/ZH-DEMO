# Planning Lane - My Preferences & Patterns

**Lane Purpose**: Strategic analysis, requirements research, architectural decisions  
**Lead Agents**: @drupal-solution-architect + @drupal-technical-pm  
**My Style**: Thorough, documentation-heavy, Swiss-compliance-first

> See `llms.txt` for system-wide architectural decisions that never change.
> This file contains my personal preferences and patterns that evolve.

## 🎯 My Planning Approach

### Primary Responsibilities
- **Requirements Analysis**: Deep dive into GPZH requirements, Swiss compliance, demo needs
- **Architectural Decisions**: System design, technology choices, integration strategies
- **Demo Planning**: 35-minute presentation structure, timing, scenarios
- **Strategic Coordination**: Cross-lane task planning and handoff orchestration

### When to Use This Lane
- New feature planning and architecture
- Requirements analysis for complex tasks
- Demo preparation and scenario planning
- Technical decision making
- Swiss compliance research
- Multi-site architecture planning

## 📋 Task Management System

### Creating New Tasks
Each task gets its own `.md` file in this folder:

**File Naming Convention:**
```
YYYY-MM-DD_task-name.md
```

**Task Template:**
```markdown
# Task: [Task Name]

**Status**: [Planning/In Progress/Complete/Handed Off]
**Priority**: [High/Medium/Low]
**Assigned Agent**: [@agent-name]
**Started**: [Date]
**Due**: [Date]

## Requirements
- [ ] Requirement 1
- [ ] Requirement 2

## Analysis
[Detailed analysis]

## Architecture/Solution
[Proposed solution]

## Deliverables
- [ ] Deliverable 1
- [ ] Deliverable 2

## Handoff Instructions
**To Building Lane:**
- What needs to be implemented
- Technical specifications
- Success criteria

**To Reviewing Lane:**
- What needs to be validated
- Compliance requirements
- Quality standards

## Notes
[Additional notes and learning]
```

### Example Task Files
- `2025-08-20_demo-presentation-structure.md`
- `2025-08-20_swiss-compliance-research.md`
- `2025-08-20_municipal-forms-architecture.md`

## 🤖 Agent Usage Patterns

### @drupal-solution-architect
**Use for:**
- System architecture decisions
- Module selection strategies
- Security and performance concepts
- Technical reviews
- Multi-site planning

**Example:**
```
@drupal-solution-architect: Design the architecture for 4 municipal forms with workflow approval system for GPZH demo
```

### @drupal-technical-pm
**Use for:**
- Project planning and timelines
- Technical specifications
- Sprint planning
- Demo preparation coordination
- Stakeholder communication

**Example:**
```
@drupal-technical-pm: Create detailed 35-minute demo presentation plan with timing and technical requirements
```

## 🔄 Coordination Workflows

### Incoming Tasks (From Other Lanes)
Tasks come from:
- **Building Lane**: "Need architectural guidance for X"
- **Reviewing Lane**: "Compliance issue requires planning solution"
- **User Requests**: Direct planning tasks

### Outgoing Handoffs

#### To Building Lane
**File:** `handoff-to-building_[task-name].md`
```markdown
# Handoff to Building Lane: [Task Name]

## Implementation Requirements
- Technical specifications
- Architecture decisions
- Dependencies
- Success criteria

## Files to Create/Modify
- List of files and changes

## Testing Requirements
- Unit tests needed
- Integration tests
- Performance targets

## Notes for Developer
- Special considerations
- Potential challenges
- Resources/documentation
```

#### To Reviewing Lane
**File:** `handoff-to-reviewing_[task-name].md`
```markdown
# Handoff to Reviewing Lane: [Task Name]

## Review Requirements
- What needs validation
- Quality standards
- Performance targets
- Compliance requirements

## Test Scenarios
- Demo scenarios to validate
- Edge cases to test
- Swiss compliance checks

## Success Criteria
- Clear pass/fail criteria
- Metrics to measure
- Documentation requirements
```

## 📚 Knowledge Management

### Architectural Decision Records (ADRs)
**File:** `adr_[decision-name].md`
```markdown
# ADR: [Decision Name]

**Status**: Proposed/Accepted/Superseded
**Date**: [Date]
**Context**: [Why this decision was needed]
**Decision**: [What was decided]
**Consequences**: [Positive and negative outcomes]
**Alternatives Considered**: [Other options]
```

### Requirements Documentation
**File:** `requirements_[feature-name].md`
```markdown
# Requirements: [Feature Name]

## Business Requirements
- User stories
- Acceptance criteria

## Technical Requirements
- Performance requirements
- Security requirements
- Compliance requirements

## Swiss Compliance
- eCH-0059 requirements
- CH-DSG requirements
- Language requirements

## Demo Requirements
- Presentation needs
- Timing constraints
- Visual requirements
```

## 🎯 GPZH-Specific Workflows

### Demo Preparation Workflow
1. **Create**: `demo-preparation_[date].md`
2. **Analyze**: 35-minute timing, segments, transitions
3. **Plan**: Technical requirements, content needs
4. **Document**: Scenarios, backup plans, troubleshooting
5. **Handoff**: Specifications to Building Lane

### Swiss Compliance Planning
1. **Research**: eCH-0059, CH-DSG, WCAG 2.1 AA
2. **Document**: Requirements and implementation strategies
3. **Plan**: Validation approaches and testing
4. **Coordinate**: With Reviewing Lane for validation

### Municipal Forms Planning
1. **Analyze**: 4 required forms (Feedback, Damage, Events, Room booking)
2. **Design**: Workflow architecture and approval processes
3. **Specify**: Technical implementation requirements
4. **Plan**: Integration with existing systems

## 📊 Progress Tracking

### Lane Status Board
**File:** `lane-status.md` (Updated daily)
```markdown
# Planning Lane Status

**Active Tasks**: [Count]
**Pending Handoffs**: [Count]
**Completed This Week**: [Count]

## Current Focus
- High priority tasks
- Upcoming deadlines
- Blocking issues

## Recent Handoffs
- To Building Lane: [List]
- To Reviewing Lane: [List]

## Learning & Improvements
- New patterns discovered
- Process improvements
- Knowledge gained
```

## 🚀 Quick Start Commands

### Start New Planning Task
```bash
cd .claude/lanes/planning
cp task-template.md $(date +%Y-%m-%d)_new-task.md
# Edit the file with your task details
```

### Coordinate with Other Lanes
```bash
# Check what Building Lane needs
ls ../building/handoff-requests_*.md

# Check Reviewing Lane feedback
ls ../reviewing/feedback-to-planning_*.md
```

### Generate Handoff Document
```bash
# Create handoff to Building Lane
cp handoff-template-building.md handoff-to-building_$(date +%Y-%m-%d)_task-name.md
```

## 💡 Best Practices

### Planning Excellence
- Always start with requirements analysis
- Document architectural decisions (ADRs)
- Consider Swiss compliance from the beginning
- Plan for demo presentation needs
- Think multi-site and scalability

### Effective Coordination
- Clear handoff documentation
- Specific success criteria
- Technical specifications
- Timeline considerations
- Risk assessment

### Knowledge Capture
- Document lessons learned
- Update architectural patterns
- Record successful strategies
- Share compliance insights
- Build reusable templates

---

**Remember**: This lane focuses on thinking, planning, and designing. Implementation happens in Building Lane, validation in Reviewing Lane. Your job is to provide clear direction and solid architectural foundation for the entire project.