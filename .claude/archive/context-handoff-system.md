# Context Handoff System

## Multi-Agent Context Management

### Context Directory Structure
```
.claude/context/
├── current-state.json          # Current workflow state
├── tickets/                    # Planner → Developer handoff
├── implementations/            # Developer → QA handoff  
├── qa-reports/                # QA → Integrator handoff
├── releases/                  # Integrator final output
├── completed/                 # Archived completed work
└── shared-memory/             # Cross-agent shared data
```

### State Management Schema

#### current-state.json
```json
{
  "workflow": {
    "status": "in_progress",
    "current_agent": "developer",
    "ticket_id": "ADS-123",
    "phase": "implementation",
    "started_at": "2025-01-20T10:00:00Z",
    "estimated_completion": "2025-01-20T16:00:00Z"
  },
  "agents": {
    "planner": {
      "last_active": "2025-01-20T09:30:00Z",
      "status": "completed",
      "output_path": ".claude/context/tickets/ADS-123.md"
    },
    "developer": {
      "last_active": "2025-01-20T14:00:00Z", 
      "status": "active",
      "progress": 75,
      "current_task": "implementing accessibility features"
    },
    "qa": {
      "status": "waiting",
      "assigned_at": null
    },
    "integrator": {
      "status": "waiting",
      "assigned_at": null
    }
  },
  "quality_gates": {
    "planning_approved": true,
    "implementation_complete": false,
    "qa_passed": false,
    "integration_ready": false
  }
}
```

### Handoff Protocols

#### 1. Planner → Developer
**Trigger:** New ticket created
**Location:** `.claude/context/tickets/{ticket-id}.md`
**Format:**
```markdown
# Ticket: ADS-123 - Accessible Navigation Component

## Requirements
- WCAG 2.1 AA compliant navigation
- Keyboard accessible
- Screen reader optimized
- Mobile responsive

## Acceptance Criteria
- [ ] All navigation items keyboard accessible
- [ ] Proper ARIA landmarks implemented
- [ ] Skip navigation link included
- [ ] Focus management working correctly

## Technical Specifications
- Use SDC component structure
- Implement in Twig with proper semantics
- Include Storybook stories with a11y tests
- Follow Tailwind v4 patterns

## Dependencies
- No blocking dependencies identified

## Security Considerations
- Validate all navigation data
- Prevent XSS in navigation labels
- Secure role-based navigation visibility

## QA Validation Criteria
- Screen reader testing required
- Keyboard navigation verification
- Cross-browser compatibility check
- Performance impact assessment
```

#### 2. Developer → QA  
**Trigger:** Implementation complete
**Location:** `.claude/context/implementations/{ticket-id}.md`
**Format:**
```markdown
# Implementation: ADS-123 - Accessible Navigation Component

## Implementation Summary
- Created SDC component: `/components/navigation/`
- Implemented ARIA landmarks and skip links
- Added keyboard navigation support
- Created comprehensive Storybook stories

## Changed Files
- `/components/navigation/navigation.component.yml`
- `/components/navigation/navigation.twig`
- `/components/navigation/navigation.stories.js`
- `/src/styles/components/navigation.css`

## Testing Instructions
1. Test keyboard navigation with Tab/Shift+Tab
2. Verify screen reader announces navigation properly
3. Check mobile responsive behavior
4. Validate focus management

## Accessibility Features Implemented
- ✅ ARIA landmarks (`role="navigation"`)
- ✅ Skip navigation link
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Screen reader optimization

## Known Limitations
- Advanced keyboard shortcuts not implemented (out of scope)
- Custom focus styling may need design review

## Ready for QA Testing
All acceptance criteria implemented and basic testing completed.
```

#### 3. QA → Integrator
**Trigger:** QA testing complete
**Location:** `.claude/context/qa-reports/{ticket-id}.md`
**Format:**
```markdown
# QA Report: ADS-123 - Accessible Navigation Component

## QA Status: ✅ APPROVED

## Testing Results

### Accessibility Compliance: ✅ PASSED
- WCAG 2.1 AA: All criteria met
- Screen reader testing: NVDA, JAWS, VoiceOver all working
- Keyboard navigation: Full functionality verified
- Color contrast: 4.8:1 ratio (exceeds minimum)

### Security Assessment: ✅ PASSED  
- XSS vulnerability: Not detected
- Input validation: Proper sanitization
- Role-based access: Working correctly

### Functional Testing: ✅ PASSED
- Cross-browser: Chrome, Firefox, Safari, Edge
- Mobile responsive: iOS, Android tested
- Performance: No regression detected
- Integration: Works with existing components

### Quality Gates Status
- ✅ All accessibility tests pass
- ✅ No security vulnerabilities
- ✅ Cross-browser compatibility verified  
- ✅ Performance within limits
- ✅ Code quality standards met

## Ready for Integration
Component approved for production deployment.
```

### Context Update Commands

#### For Agent State Updates
```bash
# Update current agent status
echo '{"agent": "developer", "status": "active", "progress": 50}' | ddev jq '.agents.developer = input' .claude/context/current-state.json

# Mark quality gate as passed
echo '{"qa_passed": true}' | ddev jq '.quality_gates = .quality_gates + input' .claude/context/current-state.json
```

### Automated Handoff Triggers

#### Git Hook Integration
```bash
# .git/hooks/post-commit
#!/bin/bash
# Auto-trigger next agent when implementation complete
if grep -q "READY_FOR_QA" .claude/context/implementations/*.md; then
    echo '{"current_agent": "qa", "phase": "testing"}' | jq '.workflow = .workflow + input' .claude/context/current-state.json
fi
```

### Conflict Resolution
- **Concurrent Access:** File locking mechanism
- **State Conflicts:** Last-write-wins with audit trail
- **Agent Coordination:** Mutex locks for critical sections
- **Rollback Support:** Git-based state versioning