#!/bin/bash
# Learns from git commits and updates knowledge base

COMMIT_MSG="$1"
FILES_CHANGED="$2"

# Analyze commit for learning patterns
if [[ "$COMMIT_MSG" == *"fix"* ]]; then
  echo "Bug fix detected - capturing failure learning"
  # Extract component from files changed
  if [[ "$FILES_CHANGED" == *"form"* ]]; then
    COMPONENT="forms"
  elif [[ "$FILES_CHANGED" == *"theme"* ]]; then
    COMPONENT="theme"
  else
    COMPONENT="general"
  fi
  
  # Auto-create failure analysis
  echo "Auto-creating failure analysis for: $COMMIT_MSG"
  ./claude/scripts/failure-to-knowledge.sh bug "$COMMIT_MSG" "$COMPONENT" medium
fi

# Learn from successful implementations
if [[ "$COMMIT_MSG" == *"implement"* ]] || [[ "$COMMIT_MSG" == *"add"* ]]; then
  echo "Implementation detected - capturing success pattern"
  
  # Update building lane working notes
  echo "## $(date): Successful Implementation" >> ".claude/lanes/building/working-notes.md"
  echo "Commit: $COMMIT_MSG" >> ".claude/lanes/building/working-notes.md"
  echo "Files: $FILES_CHANGED" >> ".claude/lanes/building/working-notes.md"
  echo "Pattern: [To be analyzed by building agent]" >> ".claude/lanes/building/working-notes.md"
  echo "" >> ".claude/lanes/building/working-notes.md"
fi

# Learn from compliance work
if [[ "$COMMIT_MSG" == *"compliance"* ]] || [[ "$COMMIT_MSG" == *"accessibility"* ]]; then
  echo "Compliance work detected - updating Swiss patterns"
  
  # Update reviewing lane knowledge
  echo "## $(date): Compliance Implementation" >> ".claude/lanes/reviewing/working-notes.md"
  echo "Commit: $COMMIT_MSG" >> ".claude/lanes/reviewing/working-notes.md"
  echo "Files: $FILES_CHANGED" >> ".claude/lanes/reviewing/working-notes.md"
  echo "Swiss Compliance Pattern: [To be documented by reviewing agent]" >> ".claude/lanes/reviewing/working-notes.md"
  echo "" >> ".claude/lanes/reviewing/working-notes.md"
fi