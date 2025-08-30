#!/bin/bash

# DDEV Worktree Setup Hook
# Automatically configures DDEV for git worktrees created with the `wt` function
# Triggered when new worktree directories are detected

set -euo pipefail

# Script configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || echo "$PWD")"
WORKTREE_DIR="$PROJECT_ROOT/.worktrees"
MAIN_DDEV_CONFIG="$PROJECT_ROOT/.ddev/config.yaml"
LOG_FILE="$PROJECT_ROOT/.ddev/worktree-setup.log"

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Error handling
error_exit() {
    log "ERROR: $1"
    exit 1
}

# Check if we're in a git repository
if ! git rev-parse --git-dir >/dev/null 2>&1; then
    error_exit "Not in a git repository"
fi

# Check if main DDEV config exists
if [[ ! -f "$MAIN_DDEV_CONFIG" ]]; then
    error_exit "Main DDEV configuration not found at $MAIN_DDEV_CONFIG"
fi

# Function to extract value from DDEV config YAML
get_ddev_config_value() {
    local key="$1"
    local config_file="$2"
    
    # Simple YAML parsing for basic keys (not perfect but sufficient for our needs)
    grep "^${key}:" "$config_file" | sed "s/^${key}:[[:space:]]*//" | sed 's/^["\'\'']//' | sed 's/["\'\'']*$//'
}

# Function to setup DDEV for a specific worktree
setup_ddev_for_worktree() {
    local worktree_path="$1"
    local worktree_name="$(basename "$worktree_path")"
    
    log "Setting up DDEV for worktree: $worktree_name"
    
    # Check if worktree directory exists
    if [[ ! -d "$worktree_path" ]]; then
        log "Worktree directory not found: $worktree_path"
        return 1
    fi
    
    # Create .ddev directory in worktree if it doesn't exist
    local worktree_ddev_dir="$worktree_path/.ddev"
    mkdir -p "$worktree_ddev_dir"
    
    # Extract main project configuration
    local main_project_name
    main_project_name=$(get_ddev_config_value "name" "$MAIN_DDEV_CONFIG")
    
    if [[ -z "$main_project_name" ]]; then
        error_exit "Could not extract main project name from DDEV config"
    fi
    
    # Generate worktree-specific project name
    local worktree_project_name="${main_project_name}-${worktree_name}"
    
    # Copy main DDEV config to worktree
    local worktree_config="$worktree_ddev_dir/config.yaml"
    cp "$MAIN_DDEV_CONFIG" "$worktree_config"
    
    # Update worktree config with unique settings
    log "Updating DDEV configuration for $worktree_name"
    
    # Update project name
    sed -i.backup "s/^name: .*/name: $worktree_project_name/" "$worktree_config"
    
    # Add database suffix for isolation
    if ! grep -q "^database:" "$worktree_config"; then
        echo "" >> "$worktree_config"
        echo "# Worktree-specific database configuration" >> "$worktree_config"
        echo "database:" >> "$worktree_config"
        echo "  name: \"db_${worktree_name//-/_}\"" >> "$worktree_config"
    fi
    
    # Copy other DDEV configuration files
    if [[ -d "$PROJECT_ROOT/.ddev/commands" ]]; then
        cp -r "$PROJECT_ROOT/.ddev/commands" "$worktree_ddev_dir/"
        log "Copied DDEV commands to worktree"
    fi
    
    if [[ -d "$PROJECT_ROOT/.ddev/homeadditions" ]]; then
        cp -r "$PROJECT_ROOT/.ddev/homeadditions" "$worktree_ddev_dir/"
        log "Copied DDEV home additions to worktree"
    fi
    
    # Copy web server configuration files
    if [[ -d "$PROJECT_ROOT/.ddev/nginx_full" ]]; then
        cp -r "$PROJECT_ROOT/.ddev/nginx_full" "$worktree_ddev_dir/"
        log "Copied nginx configuration to worktree"
    fi
    
    if [[ -d "$PROJECT_ROOT/.ddev/apache" ]]; then
        cp -r "$PROJECT_ROOT/.ddev/apache" "$worktree_ddev_dir/"
        log "Copied apache configuration to worktree"
    fi
    
    # Remove backup file
    rm -f "$worktree_config.backup"
    
    log "DDEV configuration created for worktree: $worktree_name"
    log "Project name: $worktree_project_name"
    log "Config location: $worktree_config"
    
    # Start DDEV in worktree directory
    log "Starting DDEV for worktree: $worktree_name"
    
    cd "$worktree_path"
    
    # Check if DDEV is already running for this project
    if ddev status >/dev/null 2>&1; then
        log "DDEV already running for $worktree_name, stopping first"
        ddev stop >/dev/null 2>&1 || true
    fi
    
    # Start DDEV
    if ddev start; then
        log "✅ DDEV successfully started for worktree: $worktree_name"
        log "🌐 Access your worktree at: https://$worktree_project_name.ddev.site"
        
        # Show useful information
        echo ""
        echo "🎉 DDEV Worktree Setup Complete!"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "📂 Worktree: $worktree_name"
        echo "🔗 Project: $worktree_project_name"  
        echo "🌐 URL: https://$worktree_project_name.ddev.site"
        echo "📍 Path: $worktree_path"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "💡 Useful commands in this worktree:"
        echo "   ddev ssh          # SSH into container"
        echo "   ddev logs         # View container logs"
        echo "   ddev drush status # Check Drupal status"
        echo "   ddev launch       # Open site in browser"
        echo ""
        
    else
        error_exit "Failed to start DDEV for worktree: $worktree_name"
    fi
    
    # Return to original directory
    cd "$PROJECT_ROOT"
}

# Function to detect new worktrees
detect_new_worktrees() {
    if [[ ! -d "$WORKTREE_DIR" ]]; then
        log "No worktrees directory found at $WORKTREE_DIR"
        return 0
    fi
    
    log "Checking for new worktrees in $WORKTREE_DIR"
    
    # Find worktree directories without DDEV config
    find "$WORKTREE_DIR" -maxdepth 1 -type d -name "*" | while IFS= read -r worktree_path; do
        # Skip the .worktrees directory itself
        if [[ "$worktree_path" == "$WORKTREE_DIR" ]]; then
            continue
        fi
        
        local worktree_name="$(basename "$worktree_path")"
        
        # Check if this worktree has DDEV config
        if [[ ! -f "$worktree_path/.ddev/config.yaml" ]]; then
            log "Found new worktree without DDEV: $worktree_name"
            setup_ddev_for_worktree "$worktree_path"
        else
            log "Worktree $worktree_name already has DDEV configuration"
        fi
    done
}

# Function to cleanup stopped worktrees
cleanup_stopped_worktrees() {
    log "Checking for worktrees that no longer exist"
    
    # List all DDEV projects and check if their worktrees still exist
    ddev list --format json 2>/dev/null | jq -r '.[] | select(.name | contains("-issues-") or contains("-pr-")) | .name' | while IFS= read -r project_name; do
        # Extract worktree name from project name
        local worktree_name="${project_name##*-}"
        local expected_path="$WORKTREE_DIR/$worktree_name"
        
        if [[ ! -d "$expected_path" ]]; then
            log "Found orphaned DDEV project: $project_name (worktree no longer exists)"
            log "Stopping and removing DDEV project: $project_name"
            
            # Stop and remove the DDEV project
            ddev stop "$project_name" >/dev/null 2>&1 || true
            ddev delete -O "$project_name" >/dev/null 2>&1 || true
            
            log "Cleaned up orphaned DDEV project: $project_name"
        fi
    done
}

# Main execution
main() {
    log "=== DDEV Worktree Setup Hook Started ==="
    
    # Check if DDEV is available
    if ! command -v ddev >/dev/null 2>&1; then
        error_exit "DDEV command not found"
    fi
    
    # Check if jq is available (for cleanup)
    if ! command -v jq >/dev/null 2>&1; then
        log "WARNING: jq not found, skipping cleanup of orphaned projects"
    else
        cleanup_stopped_worktrees
    fi
    
    # Detect and setup new worktrees
    detect_new_worktrees
    
    log "=== DDEV Worktree Setup Hook Completed ==="
}

# Script execution
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    # Script is being executed directly
    main "$@"
fi