---
name: work
description: Orchestrated task management with automated workflow
mode: orchestrated
orchestrator: tech-lead-orchestrator
---

# Work Command - Automated Task Management

This command executes the complete development workflow:

## Workflow Steps

1. **Pre-Check**: Verify no open PRs (mandatory before new tasks)
2. **Task Selection**: Get next task from `.claude/TASKS.md`
   - Priority: `in_progress` > `pending` (by priority) > `pending` (by ID)  
   - Dependency resolution: Skip tasks with unmet dependencies
3. **Branch Creation**: `feature/{task-id}-{slug}` from main
4. **Task Activation**: Update status to `in_progress` in TASKS.md
5. **Agent Delegation**: Route to appropriate specialized agents
6. **Quality Gates**: PHPStan Level 8, PHPCS Drupal Standards, tests
7. **PR Creation**: Create PR with GitHub Copilot assigned as reviewer
8. **Task Completion**: Update status to `completed` in TASKS.md

## Integration Points

- **Task Management**: `.claude/TASKS.md` (IDs 50-67 active range)
- **Branch Strategy**: Feature branches only, never main
- **PR Workflow**: Mandatory Copilot reviews
- **Quality Gates**: Reuse existing `composer run qa:*` commands
- **Reflexion Cycles**: 30-minute progress checks
- **Auto-Continuation**: Next task auto-prompt after completion

## Current Context

- **Active Task**: ID 50 (Integration Testing) - in_progress
- **Next Pending**: ID 51 (Production Deployment) - awaits ID 50
- **Branch Pattern**: `feature/50-integration-testing-phase6`
- **Quality Commands**: `composer run qa:ci`, `composer run qa:recipes`

Execute orchestrated workflow for next available task.