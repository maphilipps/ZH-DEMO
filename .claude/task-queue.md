# Task Delegation System

## Orchestrator-Based Task Flow
```
User Request → Planning Orchestrator → ready-for-dev → Building Orchestrator → ready-for-review → Reviewing Orchestrator → approved/needs-changes
```

## Task Creation (Planning Lane)
Wenn du `/planning` verwendest:

1. **User Request** → @planning-lane-orchestrator aufrufen
2. **Orchestrator delegiert** an Spezialisten:
   - Requirements: @business-transformation-consultant
   - Architecture: @drupal-solution-architect  
   - Swiss Compliance: @swiss-compliance-specialist
   - Content Strategy: @drupal-content-strategist
   - Project Planning: @drupal-technical-pm
3. **Specs sammeln** von allen Agenten
4. **Task erstellen** mit komplettem Specification
5. **User fragen**: "Task ready-for-dev für Building Lane?"

## Task Implementation (Building Lane)  
Wenn du `/building` verwendest:

1. **CLAUDE.md checken** für `ready-for-dev` tasks
2. **Task claimen** → @building-lane-orchestrator aufrufen  
3. **Orchestrator delegiert** an Spezialisten:
   - Backend/Modules: @drupal-11-lead-developer
   - Municipal Features: @municipality-portal-specialist
   - Frontend/Theme: @drupal-frontend-theming-specialist
   - AI Integration: @drupal-ai-integration-specialist
   - Testing: @qa-testing-specialist
   - Performance: @drupal-performance-specialist
4. **Implementation koordinieren** zwischen allen Spezialisten
5. **Status auf `ready-for-review`** wenn alle Tasks komplett

## Task Review (Reviewing Lane)
Wenn du `/reviewing` verwendest:

1. **CLAUDE.md checken** für `ready-for-review` tasks
2. **Task claimen** → @reviewing-lane-orchestrator aufrufen
3. **Orchestrator delegiert** an Spezialisten:
   - Swiss Compliance: @swiss-compliance-specialist
   - Quality Assurance: @qa-testing-specialist
   - Performance: @drupal-performance-specialist  
   - Security: @security-auditor
   - Code Review: @code-reviewer
   - Accessibility: @accessibility-expert
4. **Review-Ergebnisse sammeln** von allen Spezialisten
5. **Final Decision**: `approved` oder `needs-changes` mit konkretem Feedback

## Task Tracking in CLAUDE.md

### Format
```markdown
## Current Tasks

### Task: Swiss Compliance Forms Implementation
- **Status**: ready-for-dev
- **Created**: 2025-08-20 by Planning Lane
- **Requirements**: eCH-0059 compliance, 4 forms (feedback, damage, events, room booking)
- **Acceptance Criteria**: 
  - Forms validate Swiss standards
  - Workflow includes approval process
  - Performance >90 Core Web Vitals
- **Dependencies**: None

### Task: Municipal Directory System
- **Status**: work  
- **Claimed**: 2025-08-20 by Building Lane
- **Implementation**: Creating SDC components for directory listing
- **Progress**: 60% complete, tests added
```

## Cross-Lane Communication

Du wechselst selbst zwischen Fenstern:
- **Planning → Building**: "Task XYZ ist ready-for-dev, check CLAUDE.md"
- **Building → Reviewing**: "Task XYZ ist ready-for-review, check CLAUDE.md"  
- **Reviewing → Building**: "Task XYZ needs changes, siehe Feedback in CLAUDE.md"