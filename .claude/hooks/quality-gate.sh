#!/bin/bash
# Quality Gate Hook - Analyzes test/lint/build results
set -euo pipefail

# Debug output
echo "[DEBUG] quality-gate.sh triggered at $(date)" >&2
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
exit_code=$(echo "$input_data" | jq -r '.exitCode // 0' 2>/dev/null || echo "0")
stdout=$(echo "$input_data" | jq -r '.stdout // ""' 2>/dev/null || echo "")

echo "[DEBUG] Tool: $tool_name" >&2
echo "[DEBUG] Exit code: $exit_code" >&2

# Analyze quality gate results
if [[ "$tool_name" == "Bash" ]] && [[ "$tool_input" =~ (test|lint|build|check) ]]; then
    echo -e "\033[0;36m🔍 Quality Gate Analysis\033[0m"
    
    if [ "$exit_code" -eq 0 ]; then
        echo -e "\033[0;32m✅ Quality gate passed\033[0m"
        
        # Log success pattern to knowledge base
        {
            echo "## Quality Gate Success - $(date)"
            echo "**Command**: $tool_input"
            echo "**Status**: PASSED"
            echo ""
        } >> CLAUDE.md
        
    else
        echo -e "\033[0;31m❌ Quality gate failed\033[0m"
        
        # Log failure for analysis
        {
            echo "## Quality Gate Failure - $(date)"
            echo "**Command**: $tool_input" 
            echo "**Exit Code**: $exit_code"
            echo "**Status**: FAILED"
            echo ""
            echo "### Failure Analysis Needed"
            echo "@test-failure-analyst: Analyze this failure and create prevention rule"
            echo ""
        } >> CLAUDE.md
        
        # Suggest next steps
        echo "@test-failure-analyst: Quality gate failed - analyze for prevention patterns"
    fi
    
    # Return result JSON
    cat << EOF
{
  "success": $([ "$exit_code" -eq 0 ] && echo "true" || echo "false"),
  "exitCode": $exit_code,
  "message": "Quality gate $([ "$exit_code" -eq 0 ] && echo "passed" || echo "failed")"
}
EOF
else
    echo "[DEBUG] Not a quality gate command" >&2
    cat << EOF
{
  "success": true,
  "message": "No quality analysis needed"
}
EOF
fi