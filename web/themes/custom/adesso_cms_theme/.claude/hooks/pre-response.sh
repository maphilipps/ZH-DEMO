#!/bin/bash

# Claude Code Pre-Response Hook
# This hook runs before Claude generates a response
# Part of the compound engineering framework

# Check if we're in a theme directory for Drupal development
if [[ -f "package.json" && -d "components" ]]; then
    # Theme development context
    echo "<¨ Drupal theme development environment detected"
    
    # Check for running development servers
    if pgrep -f "vite.*dev" > /dev/null; then
        echo "¡ Vite dev server is running"
    fi
    
    if pgrep -f "storybook" > /dev/null; then
        echo "=Ú Storybook server is running"
    fi
fi

# Always exit successfully (non-blocking)
exit 0