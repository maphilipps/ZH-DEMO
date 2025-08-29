# /work - Issue Analysis & Resolution

**Purpose**: Analyze GitHub issues and implement systematic solutions using compound engineering methodology.

## Workflow

1. **Issue Analysis**
   ```bash
   gh issue view #$ARGUMENTS
   ```

2. **Codebase Understanding**
   - Examine relevant code systematically
   - Apply compound engineering patterns from CLAUDE.md
   - Leverage prevention rules for similar issues

3. **Branch Creation**
   ```bash
   feature/[issue-number]-brief-description
   ```

4. **Solution Planning**
   - Required changes with impact analysis
   - Testing strategy (TDD approach)
   - Security and performance implications
   - Documentation updates

5. **Agent Orchestration**
   - Use @tech-lead-orchestrator for agent selection and task coordination
   - Apply specialized agent pairs from 13-agent ecosystem based on domain requirements:
     * @drupal-figma-component-engineer (A & B) for UI/frontend work
     * @drupal-full-stack-engineer (A & B) for backend/module development  
     * @test-quality-engineer (A & B) for TDD implementation and quality assurance
     * @debug-detective for complex issue investigation
     * @compound-engineering-manager for learning system coordination
   - Coordinate workflow using 4-phase methodology (Plan → Delegate → Assess → Codify)
   - Apply mandatory pair programming for all development tasks

## Implementation

Present comprehensive plan, then ASK FOR APPROVAL before execution.

