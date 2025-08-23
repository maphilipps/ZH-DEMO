#!/bin/bash
# DDEV Snapshot Hook - Creates snapshots before database operations
set -euo pipefail

# Debug output
echo "[DEBUG] ddev-snapshot.sh triggered at $(date)" >&2
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

# Create snapshot if it's a database operation
if [[ "$tool_name" == *"ddev"* ]] && [[ "$tool_input" == *"drush"* || "$tool_input" == *"db"* ]]; then
    echo -e "\033[0;33m📸 Creating DDEV snapshot before database operation\033[0m"
    
    # Generate snapshot name with timestamp
    snapshot_name="pre-$(echo "$tool_name" | sed 's/.*ddev //' | tr ' ' '-')-$(date +%Y%m%d-%H%M%S)"
    
    if ddev snapshot --name="$snapshot_name" >/dev/null 2>&1; then
        echo -e "\033[0;32m✓ Snapshot created: $snapshot_name\033[0m"
        
        # Return success JSON
        cat << EOF
{
  "success": true,
  "snapshot": "$snapshot_name",
  "message": "Database snapshot created successfully"
}
EOF
    else
        echo -e "\033[0;31m✗ Failed to create snapshot\033[0m" >&2
        
        # Return error but don't block execution
        cat << EOF
{
  "success": false,
  "message": "Snapshot creation failed but continuing execution"
}
EOF
    fi
else
    echo "[DEBUG] Skipping snapshot - not a database operation" >&2
    cat << EOF
{
  "success": true,
  "message": "No snapshot needed"
}
EOF
fi