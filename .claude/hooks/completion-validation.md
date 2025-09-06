# Stop Hook - Final Validation and Compound Learning Consolidation

You are an AI assistant tasked with performing final validation before task completion AND consolidating compound learning insights. This hook runs when Claude finishes responding to ensure quality and capture exponential improvement opportunities.

<task_context>
{{TASK_CONTEXT}}
</task_context>

<session_summary>
{{SESSION_SUMMARY}}
</session_summary>

Follow these validation and learning steps:

## 1. Final ADR Compliance Validation

**ADR Compliance Final Check**:
- Review all ADRs in `doc/architecture/decisions/` for any violations
- Validate that completed work aligns with architectural decisions
- Check if any new architectural patterns were introduced without ADR documentation
- Identify any decisions that require new ADRs or updates to existing ones

**ADR Violation Assessment**:
- Does the completed work conflict with existing architectural decisions?
- Were any new architectural patterns introduced that need documentation?
- Does this work follow compound engineering practices (ADR-0002)?
- Should any existing ADRs be updated or superseded based on this work?

## 2. Implementation Quality Validation

**Completion Criteria Check**:
- All planned phases completed successfully?
- All success criteria met and validated?
- All quality gates passed?
- All agent outputs properly validated?

**Code Quality Assessment**:
- Implementation follows established patterns?
- Error handling properly implemented?
- Security considerations addressed?
- Performance requirements met?

## 3. Compound Learning Consolidation

**Pattern Recognition and Extraction**:
- What successful patterns emerged during this work?
- Which agent combinations were most effective?
- What orchestration strategies worked well?
- What approaches should be replicated in future work?

**Context Evolution Opportunities**:
- Should CLAUDE.md be updated with new patterns?
- Are there new rules that should be added based on this work?
- What compound engineering improvements were demonstrated?
- How can this work accelerate future similar tasks?

**Memory Bank Updates**:
- Add consolidated learning entry to `memory-bank/raw_reflection_log.md`
- Document patterns that should be moved to `consolidated_learnings.md`
- Capture agent performance insights for future orchestration

## 4. System Intelligence Enhancement

**Quality Gate Evolution**:
- How can validation processes be improved based on this experience?
- What validation steps should be automated for future work?
- Which quality checks proved most valuable?
- What early warning signs should be monitored?

**Agent Orchestration Learning**:
- Which agent combinations delivered best results?
- What handoff protocols worked most effectively?
- How can agent selection be improved for similar tasks?
- What coordination patterns should be standardized?

## Output Format

Present your final validation results:

<adr_compliance_final>
**ADR Violations Found**: [None/List violations]
**New ADR Requirements**: [Any new ADRs needed]
**Architectural Consistency**: [Assessment of alignment]
**Recommendations**: [Actions needed for compliance]
</adr_compliance_final>

<quality_validation>
**Completion Status**: [Complete/Incomplete with details]
**Quality Gates**: [All passed/Issues found]
**Implementation Quality**: [Assessment]
**Recommendations**: [Any improvements needed]
</quality_validation>

<compound_learning>
**Successful Patterns**: [Patterns to replicate]
**Agent Performance**: [Effective combinations and strategies]
**Context Evolution**: [CLAUDE.md updates suggested]
**Quality Gate Improvements**: [Validation enhancements]
**Memory Bank Entry**: [Raw learning for consolidation]

---
Date: {{CURRENT_DATE}}
Task: [Brief description of completed work]

Learnings:
- [Specific successful patterns or approaches]
- [Agent orchestration insights]
- [Technical discoveries or optimizations]

Difficulties:
- [Challenges faced and how resolved]
- [Agent coordination issues and solutions]

Successes:
- [What worked particularly well]
- [Effective strategies for reuse]

Improvements_Identified:
- [Patterns for future codification]
- [System enhancements for compound improvement]
---
</compound_learning>

<continuation_decision>
**Should Continue**: [True/False]
**Reason**: [Why task should continue or is complete]
**Next Steps**: [If continuing, what needs to be done]
</continuation_decision>

## Hook Control

This hook can control Claude's continuation using structured JSON:

- **"continue": false** - Stop Claude from continuing (task completion blocked)
- **"stopReason"** - Message explaining why continuation is blocked
- **"systemMessage"** - Warning or guidance message for user

Use these controls to enforce quality gates and ensure compound engineering principles are followed before task completion.

## Integration with Compound Engineering

This Stop Hook implements the Every.to principle of making every action create systems that make future actions faster, safer, and more intelligent by:

1. **Ensuring Quality**: Nothing completes without meeting all requirements
2. **Capturing Learning**: Every completion becomes permanent institutional knowledge  
3. **Evolving Systems**: Each task improves the system's ability to handle similar tasks
4. **Preventing Regression**: ADR compliance prevents architectural drift

The goal is exponential capability improvement through systematic learning capture and quality enforcement.