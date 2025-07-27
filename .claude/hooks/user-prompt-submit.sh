#!/bin/bash

# user-prompt-submit.sh
# Hook that triggers vibe-coding-coach agent first on every prompt submission
# This ensures German-to-English translation and proper agent routing

# Exit on any error
set -e

# Function to log hook activity
log_hook() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] HOOK: $1" >&2
}

# Function to detect German content in user input
detect_german() {
    local input="$1"
    
    # German language indicators
    local german_patterns=(
        "möchte|brauche|können|müssen|soll|will"
        "der|die|das|ein|eine|einen|einem|einer"
        "erstellen|implementieren|konfigurieren|optimieren|testen|validieren"
        "komponente|modul|system|entwicklung|projekt"
        "ä|ö|ü|ß"
    )
    
    for pattern in "${german_patterns[@]}"; do
        if echo "$input" | grep -iE "$pattern" > /dev/null 2>&1; then
            return 0  # German detected
        fi
    done
    
    return 1  # No German detected
}

# Function to detect technical keywords for agent routing
detect_technical_domain() {
    local input="$1"
    
    # Technical domain patterns
    if echo "$input" | grep -iE "(ddev|docker|container|umgebung|environment)" > /dev/null 2>&1; then
        echo "ddev-expert"
        return 0
    fi
    
    if echo "$input" | grep -iE "(drupal|modul|module|entity|field|hook|service)" > /dev/null 2>&1; then
        echo "drupal-11-lead-developer"
        return 0
    fi
    
    if echo "$input" | grep -iE "(komponente|component|sdc|schema|twig)" > /dev/null 2>&1; then
        echo "sdc-component-specialist"
        return 0
    fi
    
    if echo "$input" | grep -iE "(frontend|css|javascript|vite|tailwind|responsive)" > /dev/null 2>&1; then
        echo "frontend-cms-specialist"
        return 0
    fi
    
    if echo "$input" | grep -iE "(storybook|dokumentation|documentation|stories|accessibility|a11y)" > /dev/null 2>&1; then
        echo "storybook-integration-specialist"
        return 0
    fi
    
    if echo "$input" | grep -iE "(recipe|konfiguration|configuration|export|import|deployment)" > /dev/null 2>&1; then
        echo "recipe-configuration-specialist"
        return 0
    fi
    
    if echo "$input" | grep -iE "(test|qualität|quality|qa|validierung|validation|testen|fehler|error)" > /dev/null 2>&1; then
        echo "qa-testing-specialist"
        return 0
    fi
    
    # Default to vibe-coding-coach for general/creative requests
    echo "vibe-coding-coach"
    return 0
}

# Main hook execution
main() {
    local user_input="$1"
    
    log_hook "Processing user prompt submission"
    
    # Always route through vibe-coding-coach first for language detection and translation
    if detect_german "$user_input"; then
        log_hook "German content detected - routing through vibe-coding-coach for translation"
        
        # Detect the target technical domain
        local target_agent=$(detect_technical_domain "$user_input")
        
        log_hook "Detected technical domain: $target_agent"
        
        # Provide routing guidance to Claude
        cat << EOF
AGENT ROUTING GUIDANCE:
- German input detected in user prompt
- Primary agent: vibe-coding-coach (for translation)
- Target specialist: $target_agent (for technical implementation)
- Process: Translate German → Route to specialist → Execute task

Translation workflow required:
1. vibe-coding-coach translates German to English
2. vibe-coding-coach routes to $target_agent
3. Specialist agent handles technical implementation
EOF
    else
        # English input - still route through vibe-coding-coach for consistency
        local target_agent=$(detect_technical_domain "$user_input")
        
        if [ "$target_agent" != "vibe-coding-coach" ]; then
            log_hook "English technical content detected - routing to $target_agent"
            
            cat << EOF
AGENT ROUTING GUIDANCE:
- English technical input detected
- Recommended agent: $target_agent
- Direct routing possible (no translation needed)

Technical domain: $target_agent specialization
EOF
        else
            log_hook "General/creative content - vibe-coding-coach appropriate"
            
            cat << EOF
AGENT ROUTING GUIDANCE:
- General or creative request detected
- Primary agent: vibe-coding-coach
- Vision-focused development approach recommended
EOF
        fi
    fi
    
    # Context7 Integration Reminder
    cat << EOF

CONTEXT7 INTEGRATION REMINDER:
- Use Context7 MCP for official documentation lookup
- Research latest patterns and best practices
- Validate technical terminology and approaches
- Access framework-specific documentation as needed

ADESSO CMS PROJECT CONTEXT:
- Working with Drupal 11.2.2 + PHP 8.3 + MariaDB 10.11
- SDC component architecture with Storybook documentation
- Vite 6.2.0 + Tailwind CSS v4 frontend stack
- DDEV local development environment
- Recipe-based configuration management
EOF
    
    log_hook "Hook execution completed"
}

# Execute main function with user input
# Input is provided as first argument or via stdin
if [ $# -gt 0 ]; then
    main "$1"
else
    # Read from stdin if no arguments provided
    user_input=$(cat)
    main "$user_input"
fi

exit 0