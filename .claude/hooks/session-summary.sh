#!/bin/bash
# Session Summary Hook - Compounding learning at session end
set -euo pipefail

# Debug output
echo "[DEBUG] session-summary.sh triggered at $(date)" >&2
echo "[DEBUG] Working directory: $(pwd)" >&2

# Parse JSON input from stdin
if [ -t 0 ]; then
    echo "[DEBUG] No stdin data available" >&2
    input_data="{}"
else
    input_data=$(cat)
    echo "[DEBUG] Received JSON: $input_data" >&2
fi

# Extract session information
session_id=$(echo "$input_data" | jq -r '.sessionId // "unknown"' 2>/dev/null || echo "unknown")
transcript_path=$(echo "$input_data" | jq -r '.transcriptPath // ""' 2>/dev/null || echo "")

echo "[DEBUG] Session ID: $session_id" >&2
echo "[DEBUG] Transcript: $transcript_path" >&2

echo -e "\033[0;34m📊 Session Summary (ID: $session_id)\033[0m"

# Create session summary for compounding learning
{
    echo "## Session Summary - $(date)"
    echo "**Session ID**: $session_id"
    echo "**Duration**: $(date)"
    echo ""
    
    # Count git changes if in git repo
    if [ -d .git ]; then
        changed_files=$(git status --porcelain 2>/dev/null | wc -l || echo "0")
        echo "**Files Modified**: $changed_files"
        
        if [ "$changed_files" -gt 0 ]; then
            echo "### Modified Files:"
            git status --porcelain 2>/dev/null | head -10 | sed 's/^/- /' || echo "- Could not list files"
        fi
    fi
    
    echo ""
    echo "### Learning Opportunities"
    echo "@knowledge-synthesizer: Extract patterns and learnings from this session"
    echo ""
    
} >> CLAUDE.md

echo -e "\033[0;32m✓ Session summary logged to CLAUDE.md\033[0m"
echo "@knowledge-synthesizer: Analyze session $session_id for compounding learning opportunities"

# Return session summary JSON
cat << EOF
{
  "success": true,
  "sessionId": "$session_id",
  "message": "Session summary created for compounding learning"
}
EOF