# Lane Configuration

## Manual Three Window Setup
Du öffnest selbst drei Terminal-Fenster:

```bash
# Window 1 - Planning Lane (Opus für strategisches Denken)
claude --model opus
/planning

# Window 2 - Building Lane (Sonnet für Implementation)  
claude
/building

# Window 3 - Reviewing Lane (Sonnet für Quality)
claude  
/reviewing
```

## Lane Behavior

### Planning Lane (CLAUDE_LANE=planning)
**Model**: Opus (most powerful reasoning)
**Agents**: @drupal-solution-architect + @drupal-technical-pm
**Behavior**:
- Focus on strategic analysis and architecture
- Research Swiss compliance requirements
- Create detailed implementation plans
- Set tasks to `ready-for-dev` status
- Document architectural decisions

**Slash Commands**:
- `/lane-planning` - Initialize planning mode
- `/analyze-requirements` - Deep requirement analysis
- `/design-architecture` - Create technical architecture
- `/create-tasks` - Generate implementation tasks

### Building Lane (CLAUDE_LANE=building)
**Model**: Claude 3.5 Sonnet (balanced performance/cost)
**Agents**: @drupal-11-lead-developer + @municipality-portal-specialist
**Behavior**:
- Monitor for `ready-for-dev` tasks
- Implement features with proper testing
- Follow Swiss compliance patterns
- Set completed tasks to `ready-for-review`

**Slash Commands**:
- `/lane-building` - Initialize building mode
- `/check-tasks` - Check for new tasks
- `/implement-feature` - Start feature implementation
- `/run-tests` - Execute test suite

### Reviewing Lane (CLAUDE_LANE=reviewing)
**Model**: Claude 3.5 Sonnet (quality focus)
**Agents**: @swiss-compliance-specialist + @qa-testing-specialist
**Behavior**:
- Monitor for `ready-for-review` tasks
- Validate Swiss compliance (eCH-0059, CH-DSG)
- Run comprehensive quality checks
- Either approve or provide feedback

**Slash Commands**:
- `/lane-reviewing` - Initialize reviewing mode
- `/review-task` - Review specific task
- `/compliance-check` - Run compliance validation
- `/quality-audit` - Full quality assessment

## Task Flow Integration

Each lane automatically:
1. Monitors its relevant task statuses
2. Claims appropriate tasks
3. Updates task status during work
4. Notifies next lane via status changes
5. Documents learnings in CLAUDE.md

## Cross-Lane Communication

Use the lane coordinator for communication:
```bash
# Send task to specific lane
./.claude/lane-coordinator.sh send-task "Implement Swiss form validation" building

# Check system status
./.claude/lane-coordinator.sh status

# Start all three lanes
./.claude/lane-coordinator.sh start
```