#!/bin/bash

# Simple AI GitHub Analysis Hook  
set -euo pipefail

echo -e "\033[0;35m🤖 GitHub Issue Analysis\033[0m"

# Single AI prompt
echo "Check GitHub for new issues or PRs that need attention:"
echo "- Analyze any new planning-lane issues"
echo "- Extract learning from recent PR reviews" 
echo "- Update project status and suggest next actions"

echo -e "\033[0;32m✓ GitHub analysis triggered\033[0m"