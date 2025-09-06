# Learning Infrastructure

This directory contains the compounding engineering learning system for the ZH-Demo municipal portal project.

## Structure

### `/decisions/`
Architecture Decision Records (ADRs) that capture important technical decisions and their rationale.

### `/patterns/`
Code patterns and design solutions that have proven effective in this municipal portal context.

### `/failures/`
Detailed analysis of failures, bugs, and issues, along with their solutions and prevention strategies.

## Usage

### Creating Learning Entries

Use the learning capture hook:
```bash
.claude/hooks/learning-capture.sh decision "ai-integration" "Chose Anthropic Claude for content generation" "Improved content quality and Swiss compliance"
```

Or use the templates manually:
- Decision: Use `.claude/templates/decision-template.md`
- Pattern: Use `.claude/templates/pattern-template.md`
- Failure: Use `.claude/templates/failure-analysis-template.md`

### Compounding Engineering Workflow

1. **Teach Through Work** - Document decisions as they happen
2. **Turn Failures into Upgrades** - Every bug becomes a prevention strategy
3. **Parallel AI Orchestration** - Multiple agents learn from these documents
4. **Lean Context** - Keep documentation focused and actionable
5. **Trust but Verify** - Use these learnings to validate AI suggestions

## Municipal Portal Specific Considerations

All learning entries should consider:
- Swiss compliance requirements (WCAG, CH-DSG, eCH-0059)
- Multi-municipality implications
- AI integration best practices
- Drupal 11 performance optimization
- Modern frontend tooling (Vite, Tailwind v4)

## Integration with Development

This learning system integrates with:
- `.claude/agents/` - AI agents that reference these learnings
- `CLAUDE.md` - Project guidance that evolves based on learnings
- Testing frameworks - Failures generate new test cases
- Code review process - Patterns inform review criteria

## Maintenance

- Review and update entries quarterly
- Archive deprecated patterns and decisions
- Consolidate related learnings
- Update `CLAUDE.md` based on accumulated insights