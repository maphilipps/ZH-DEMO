#!/bin/bash

# Simple AI Learning Validation Hook
set -euo pipefail

echo -e "\033[0;33m🤖 Learning Validation Trigger\033[0m"

# Single AI prompt
echo "@learning-validator: Validate and consolidate recent learnings:"
echo "- Check if new patterns should be documented in CLAUDE.md"  
echo "- Identify any failures that should become prevention rules"
echo "- Update Swiss compliance knowledge from recent testing"

echo -e "\033[0;32m✓ Learning validation triggered\033[0m"