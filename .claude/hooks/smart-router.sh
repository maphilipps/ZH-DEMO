#!/bin/bash

# Smart Router Hook - Intelligent Agent Selection
# Routes tasks directly to appropriate specialists without unnecessary overhead

set -e

PROMPT="$1"
HOOK_TYPE="${2:-user-prompt-submit}"

# Task complexity scoring
calculate_complexity() {
    local prompt="$1"
    local complexity=0
    
    # Simple task indicators (reduce complexity)
    if echo "$prompt" | grep -iE "(fix|update|change|edit|delete|remove|add|create)" >/dev/null; then
        ((complexity += 1))
    fi
    
    # Complex task indicators (increase complexity)
    if echo "$prompt" | grep -iE "(architecture|design|plan|strategy|requirements|analyze|comprehensive|system)" >/dev/null; then
        ((complexity += 3))
    fi
    
    # Multi-domain indicators
    if echo "$prompt" | grep -iE "(frontend.*backend|drupal.*component|testing.*deployment)" >/dev/null; then
        ((complexity += 2))
    fi
    
    # Word count complexity
    local word_count=$(echo "$prompt" | wc -w)
    if [ "$word_count" -gt 20 ]; then
        ((complexity += 2))
    fi
    
    echo "$complexity"
}

# Detect task domain
detect_domain() {
    local prompt="$1"
    
    # Drupal backend patterns
    if echo "$prompt" | grep -iE "(module|entity|database|config|migration|drupal.*backend)" >/dev/null; then
        echo "drupal-backend"
        return
    fi
    
    # Frontend patterns
    if echo "$prompt" | grep -iE "(component|css|javascript|vite|tailwind|storybook|frontend)" >/dev/null; then
        echo "frontend"
        return
    fi
    
    # QA/Testing patterns (but avoid constant Playwright)
    if echo "$prompt" | grep -iE "(test|quality|qa|lint|validate)" >/dev/null; then
        if echo "$prompt" | grep -iE "(browser|e2e|playwright)" >/dev/null; then
            echo "qa-browser"
        else
            echo "qa-static"
        fi
        return
    fi
    
    # CI/CD patterns
    if echo "$prompt" | grep -iE "(pipeline|ci|cd|gitlab|deploy|build)" >/dev/null; then
        echo "devops"
        return
    fi
    
    # Error/Debug patterns
    if echo "$prompt" | grep -iE "(error|fix|debug|issue|problem|fail)" >/dev/null; then
        echo "error-debug"
        return
    fi
    
    echo "general"
}

# Route to appropriate agent
route_to_agent() {
    local domain="$1"
    local complexity="$2"
    local prompt="$3"
    
    # High complexity always goes to Requirements Engineer for proper analysis
    if [ "$complexity" -ge 5 ]; then
        echo "🔄 High complexity detected - routing to Requirements Engineer for proper analysis"
        # Call Requirements Engineer
        exec "$HOME/.claude/hooks/requirements-engineer-complex.sh" "$prompt"
        return
    fi
    
    # Direct routing for clear, simple tasks
    case "$domain" in
        "drupal-backend")
            echo "🚀 Direct routing to Drupal Backend Expert"
            # Direct to drupal-backend-expert agent
            ;;
        "frontend")
            echo "🎨 Direct routing to Frontend Specialist"
            # Direct to frontend-specialist agent
            ;;
        "qa-static")
            echo "✅ Direct routing to QA (Static Analysis - NO browser automation)"
            # Route to QA without Playwright
            ;;
        "qa-browser")
            echo "🌐 Routing to QA with Browser Testing (when necessary)"
            # Route to QA with Playwright only when needed
            ;;
        "devops")
            echo "⚙️ Direct routing to DevOps Specialist"
            # Direct to devops-specialist agent
            ;;
        "error-debug")
            echo "🐛 Direct routing to Error Debugger"
            # Direct to error-debugger agent
            ;;
        *)
            if [ "$complexity" -ge 3 ]; then
                echo "🤔 Medium complexity - routing to Requirements Engineer"
                exec "$HOME/.claude/hooks/requirements-engineer-complex.sh" "$prompt"
            else
                echo "📋 Simple task - routing to Tech Lead Orchestrator"
                # Direct to tech-lead-orchestrator for simple coordination
            fi
            ;;
    esac
}

# Main routing logic
main() {
    local prompt="$1"
    
    echo "🧠 Smart Router analyzing task..."
    
    local complexity=$(calculate_complexity "$prompt")
    local domain=$(detect_domain "$prompt")
    
    echo "📊 Task Analysis:"
    echo "   - Complexity: $complexity/10"
    echo "   - Domain: $domain"
    echo "   - Length: $(echo "$prompt" | wc -w) words"
    
    route_to_agent "$domain" "$complexity" "$prompt"
}

# Execute if called directly
if [ "${BASH_SOURCE[0]}" == "${0}" ]; then
    main "$@"
fi