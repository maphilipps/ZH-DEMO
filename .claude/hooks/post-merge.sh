#!/bin/bash
# Post-merge learning hook
echo "🧠 Capturing merge learnings..."
# Analyze changes and update patterns
git log --oneline -1 >> .claude/learning/merge-patterns.log
