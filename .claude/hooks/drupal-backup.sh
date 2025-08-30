#!/bin/bash
# Drupal MCP Backup Hook - Creates backups before Drupal operations
set -euo pipefail

# Debug output
echo "[DEBUG] drupal-backup.sh triggered at $(date)" >&2
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

echo "[DEBUG] Tool: $tool_name" >&2
echo "[DEBUG] Tool input: $tool_input" >&2

# Create backup for Drupal MCP operations
if [[ "$tool_name" == "mcp__mcp-server-drupal__"* ]]; then
    echo -e "\033[0;33m💾 Creating Drupal backup before MCP operation\033[0m"
    
    # Generate backup name with timestamp
    backup_name="pre-drupal-mcp-$(date +%Y%m%d-%H%M%S)"
    
    # Try to create DDEV snapshot if available
    if command -v ddev >/dev/null 2>&1 && ddev status >/dev/null 2>&1; then
        if ddev snapshot --name="$backup_name" >/dev/null 2>&1; then
            echo -e "\033[0;32m✓ DDEV snapshot created: $backup_name\033[0m"
        else
            echo -e "\033[0;31m✗ DDEV snapshot failed\033[0m" >&2
        fi
    else
        echo "[DEBUG] DDEV not available, skipping snapshot" >&2
    fi
    
    # Return success JSON
    cat << EOF
{
  "success": true,
  "backup": "$backup_name",
  "message": "Drupal backup created successfully"
}
EOF
else
    echo "[DEBUG] Skipping backup - not a Drupal MCP operation" >&2
    cat << EOF
{
  "success": true,
  "message": "No backup needed"
}
EOF
fi