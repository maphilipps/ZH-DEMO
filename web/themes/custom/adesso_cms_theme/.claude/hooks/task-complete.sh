#!/bin/bash

# Claude Code Task Complete Hook
# This hook runs after a task is completed
# Part of the compound engineering framework for continuous learning

TASK_CONTEXT="${1:-Unknown task}"

echo " Task completed: $TASK_CONTEXT"

# Log completion for compound learning
LOG_DIR=".claude/logs"
mkdir -p "$LOG_DIR"

# Simple completion log
echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) - Task completed: $TASK_CONTEXT" >> "$LOG_DIR/task-completions.log"

# Check for any uncommitted changes after task completion
if git status --porcelain | grep -q .; then
    echo "=Ý Note: Uncommitted changes detected. Consider using git-hygiene-enforcer."
fi

# Always exit successfully (non-blocking)
exit 0