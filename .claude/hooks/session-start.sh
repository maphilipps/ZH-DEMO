#!/bin/bash

# Simple AI Session Initialization Hook
set -euo pipefail

echo -e "\033[0;34m🤖 Session Start AI Trigger\033[0m"

# Single AI prompt  
echo "@session-analyzer: Initialize new session with project context:"
echo "- Review recent GitHub activity and PRs"
echo "- Check for any urgent issues or demo preparation tasks"
echo "- Extract learnings from recent work and update knowledge"

echo -e "\033[0;32m✓ Session initialization triggered\033[0m"