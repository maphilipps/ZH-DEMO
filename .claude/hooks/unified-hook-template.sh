#!/bin/bash

# Simple Unified Hook Template
set -euo pipefail

HOOK_TYPE="$1"
USER_INPUT="${2:-}"

echo -e "\033[0;34m🤖 Simple AI Hook: $HOOK_TYPE\033[0m"

# Single AI prompt based on hook type
case "$HOOK_TYPE" in
    "user-prompt-submit")
        echo "@frustration-detector: Check frustration level in: $USER_INPUT"
        ;;
    "session-start") 
        echo "@session-analyzer: Initialize session with project review"
        ;;
    "task-complete")
        echo "@learning-extractor: Extract patterns from completed task"
        ;;
    *)
        echo "@general-analyzer: Analyze hook event: $HOOK_TYPE"
        ;;
esac

echo -e "\033[0;32m✓ AI analysis triggered\033[0m"