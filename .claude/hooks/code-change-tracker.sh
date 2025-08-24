#!/bin/bash
# Code Change Tracker Hook - Tracks file modifications for learning
set -euo pipefail

# Debug output
echo "[DEBUG] code-change-tracker.sh triggered at $(date)" >&2
echo "[DEBUG] Working directory: $(pwd)" >&2

# Parse JSON input from stdin
if [ -t 0 ]; then
    echo "[DEBUG] No stdin data available" >&2
    input_data="{}"
else
    input_data=$(cat)
    echo "[DEBUG] Received JSON: $input_data" >&2
fi

# Extract tool information
tool_name=$(echo "$input_data" | jq -r '.toolName // "unknown"' 2>/dev/null || echo "unknown")
tool_input=$(echo "$input_data" | jq -r '.toolInput // {}' 2>/dev/null || echo "{}")
result_summary=$(echo "$input_data" | jq -r '.resultSummary // ""' 2>/dev/null || echo "")

echo "[DEBUG] Tool: $tool_name" >&2
echo "[DEBUG] Result: $result_summary" >&2

# Track code changes
if [[ "$tool_name" =~ ^(Edit|Write|MultiEdit)$ ]]; then
    echo -e "\033[0;36m📝 Tracking code change\033[0m"
    
    # Extract file path from tool input
    file_path=$(echo "$tool_input" | jq -r '.file_path // .filePath // ""' 2>/dev/null || echo "")
    
    if [ -n "$file_path" ]; then
        echo "File modified: $file_path"
        
        # Log to compounding engineering knowledge
        {
            echo "## Code Change - $(date)"
            echo "**File**: $file_path"
            echo "**Tool**: $tool_name" 
            echo "**Result**: $result_summary"
            echo ""
        } >> CLAUDE.md
        
        echo -e "\033[0;32m✓ Change logged to CLAUDE.md\033[0m"
    fi
    
    # Return success JSON
    cat << EOF
{
  "success": true,
  "file": "$file_path",
  "message": "Code change tracked successfully"
}
EOF
else
    echo "[DEBUG] Not a code modification tool" >&2
    cat << EOF
{
  "success": true,
  "message": "No tracking needed"
}
EOF
fi