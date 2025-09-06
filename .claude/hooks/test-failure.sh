#!/bin/bash
# Test failure learning hook  
echo "📚 Learning from test failure..."
# Convert failures into permanent improvements
mkdir -p .claude/learning
echo "$(date): $1" >> .claude/learning/test-failures.log
