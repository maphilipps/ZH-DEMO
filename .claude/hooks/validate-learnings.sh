#!/bin/bash

# Learnings Validation Hook for GPZH System
# This hook validates that responses comply with .claude/llms.txt learnings

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"
VALIDATION_SCRIPT="$PROJECT_DIR/.claude/scripts/validate-learnings.sh"

# Function to run validation safely
run_validation() {
    if [ -f "$VALIDATION_SCRIPT" ] && [ -x "$VALIDATION_SCRIPT" ]; then
        echo "🤖 Prüfe Learnings aus .claude/llms.txt..."
        
        # Run validation and capture output
        if "$VALIDATION_SCRIPT" >/dev/null 2>&1; then
            echo "✅ Alle Learnings-Validierungen erfolgreich"
            return 0
        else
            echo "⚠️  Einige Learnings-Validierungen haben Warnungen ergeben"
            echo "💡 Bitte überdenke die Antwort im Kontext der GPZH-Anforderungen"
            return 1
        fi
    else
        echo "❌ Validierungsskript nicht gefunden oder nicht ausführbar"
        return 1
    fi
}

# Main execution
case "${1:-run}" in
    "run"|"")
        run_validation
        ;;
    "silent")
        # Silent mode - just return exit code
        if [ -f "$VALIDATION_SCRIPT" ] && [ -x "$VALIDATION_SCRIPT" ]; then
            "$VALIDATION_SCRIPT" >/dev/null 2>&1
        else
            exit 1
        fi
        ;;
    *)
        echo "Usage: $0 [run|silent]"
        exit 1
        ;;
esac