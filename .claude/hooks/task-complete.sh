#!/bin/bash

# Simple AI Task Analysis Hook
set -euo pipefail

TASK_DESCRIPTION="${1:-}"
TASK_STATUS="${2:-completed}"

# Skip if no task
if [ -z "$TASK_DESCRIPTION" ]; then
    exit 0
fi

echo -e "\033[0;34m🤖 Task Analysis AI Trigger\033[0m"

# Single AI prompt request
echo "Analyze completed task for learning: '$TASK_DESCRIPTION' (Status: $TASK_STATUS)"
echo "- Extract success patterns or failure lessons"  
echo "- Suggest logical next task"
echo "- Update compound knowledge"

echo -e "\033[0;32m✓ AI task analysis triggered\033[0m"