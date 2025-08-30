---
description: Implement a validated specification by orchestrating concurrent agents
category: validation
allowed-tools: Task, Read, TodoWrite, Grep, Glob, Bash(command:*), Bash(stm:*), Bash(jq:*), Bash(which:*), Bash(test:*), Bash(echo:*)
argument-hint: "<path-to-spec-file>"
---

# Implement GitHub Issue Specification

Implement the GitHub Issue specification: #$ARGUMENTS

!`which stm &> /dev/null && test -d .simple-task-master && echo "STM_STATUS: Available and initialized" || (which stm &> /dev/null && echo "STM_STATUS: Available but not initialized" || echo "STM_STATUS: Not installed")`

## Pre-Execution Checks

1. **Check Task Management**:
   - If STM shows "Available but not initialized" → Run `stm init` first, then `/spec:decompose` to create tasks
   - If STM shows "Available and initialized" → Use STM for tasks
   - If STM shows "Not installed" → Use TodoWrite instead

2. **Verify Specification**:
   - Confirm spec file exists and is complete
   - Check that required tools are available
   - Stop if anything is missing or unclear

## Implementation Process

### 1. Analyze GitHub Issue Specification

```bash
# Load issue details
gh issue view $ARGUMENTS --json body,title,labels,assignees,comments
```

Read the GitHub Issue to understand:
- What components need to be built
- Dependencies between components
- Testing requirements
- Success criteria
- Related subtask issues

### 2. Load Subtask Issues

**Load GitHub subtasks**:
```bash
# Find all subtask issues linked to this spec
gh issue list --search "Part of #$ARGUMENTS" --json number,title,labels,state
```

**Using STM** (if available):
```bash
stm list --status pending -f json
```

**Using TodoWrite** (fallback):
Load tasks for each component from GitHub subtask issues

### 3. Implementation Workflow

For each task, follow this cycle:

**Available Agents:**
!`claudekit list agents`

#### Step 1: Implement

Launch appropriate specialist agent:

```
Task tool:
- description: "Implement [component name]"  
- subagent_type: [choose specialist that matches the task]
- prompt: |
    First load the GitHub Issue: gh issue view [issue-number] --json body,title,labels
    This will give you the full task details and requirements.
    
    Then implement the component based on those requirements.
    Follow project code style and add error handling.
    Apply any relevant Error Prevention Rules from knowledge/error-prevention-rules.md
    Report back when complete.
```

#### Step 2: Write Tests

Launch testing expert:

```
Task tool:
- description: "Write tests for [component]"
- subagent_type: testing-expert [or jest/vitest-testing-expert]
- prompt: |
    First load the GitHub Issue: gh issue view [issue-number] --json body,title
    
    Write comprehensive tests for the implemented component.
    Cover edge cases and aim for >80% coverage.
    Follow meaningful testing principles from knowledge/patterns/testing/
    Report back when complete.
```

Then run tests to verify they pass.

#### Step 3: Code Review (Required)

**Important:** Always run code review to verify both quality AND completeness. Task cannot be marked done without passing both.

Launch code review expert:

```
Task tool:
- description: "Review [component]"
- subagent_type: code-review-expert
- prompt: |
    First load the GitHub Issue: gh issue view [issue-number] --json body,title
    
    Review implementation for BOTH:
    1. COMPLETENESS - Are all requirements from the issue fully implemented?
    2. QUALITY - Code quality, security, error handling, test coverage
    3. COMPLIANCE - Check against Error Prevention Rules in knowledge/error-prevention-rules.md
    
    Categorize any issues as: CRITICAL, IMPORTANT, or MINOR.
    Report if implementation is COMPLETE or INCOMPLETE.
    Report back with findings.
```

#### Step 4: Fix Issues & Complete Implementation

If code review found the implementation INCOMPLETE or has CRITICAL issues:

1. Launch specialist to complete/fix:
   ```
   Task tool:
   - description: "Complete/fix [component]"
   - subagent_type: [specialist matching the task]
   - prompt: |
       First load the GitHub Issue: gh issue view [issue-number] --json body,title
       
       Address these items from code review:
       - Missing requirements: [list any incomplete items]
       - Critical issues: [list any critical issues]
       
       Update tests if needed.
       Report back when complete.
   ```

2. Re-run tests to verify fixes

3. Re-review to confirm both COMPLETE and quality standards met

4. Only when implementation is COMPLETE and all critical issues fixed:
   - Update GitHub Issue: `gh issue comment [issue-number] --body "✅ Implementation completed and reviewed"`
   - Close subtask issues: `gh issue close [subtask-issue-number] --reason completed`
   - If using STM: `stm update [task-id] --status done`

#### Step 5: Create Pull Request

Create PR and link to issue:
```bash
# Add and commit changes
git add .
git commit -m "feat: implement [feature-name] - closes #$ARGUMENTS"
git push origin issue-$ARGUMENTS

# Create PR linked to issue
gh pr create \
  --title "[IMPL] Implement specification from #$ARGUMENTS" \
  --body "Implements specification from #$ARGUMENTS
  
  ## Changes
  - [List key changes]
  
  ## Testing
  - [List testing done]
  
  Closes #$ARGUMENTS" \
  --assignee @me
```

### 4. Track Progress

Monitor implementation progress:

**Using STM:**
```bash
stm list --pretty              # View all tasks
stm list --status pending      # Pending tasks
stm list --status in-progress  # Active tasks
stm list --status done         # Completed tasks
```

**Using TodoWrite:**
Track tasks in the session with status indicators.

### 5. Complete Implementation

Implementation is complete when:
- All subtask issues are closed
- All requirements from GitHub Issue implemented
- All code passes quality review (no critical issues)
- All tests passing
- PR created and linked to issue
- Documentation updated
- Parent issue ready for final review

## If Issues Arise

If any agent encounters problems:
1. Identify the specific issue
2. Launch appropriate specialist to resolve
3. Or request user assistance if blocked