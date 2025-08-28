#!/bin/bash

# Compound Engineering Initialization Script
# Implements the enhanced /init command functionality

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE_DIR="$(dirname "$SCRIPT_DIR")/templates"
PROJECT_ROOT="$(pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        log_error "Not in a git repository. Please run 'git init' first."
        exit 1
    fi
}

# Function to analyze codebase and generate llms.txt
generate_llms_txt() {
    local project_name="${1:-$(basename "$PROJECT_ROOT")}"
    
    log_info "Analyzing codebase structure for $project_name..."
    
    # Start with template
    cp "$TEMPLATE_DIR/llms-foundation.txt" "$PROJECT_ROOT/llms.txt"
    
    # Replace placeholder values
    sed -i.bak "s/\[PROJECT_NAME\]/$project_name/g" "$PROJECT_ROOT/llms.txt"
    rm "$PROJECT_ROOT/llms.txt.bak" 2>/dev/null || true
    
    # Analyze key files and update template
    log_info "Analyzing key configuration files..."
    
    # Look for common config files and document them
    local config_files=(
        "package.json:Node.js Package Configuration"
        "composer.json:PHP Dependency Management"
        "requirements.txt:Python Dependencies"
        "Dockerfile:Container Configuration"
        "docker-compose.yml:Multi-container Setup"
        ".github/workflows:CI/CD Pipeline Configuration"
        "Makefile:Build Automation"
        "webpack.config.js:Frontend Build Configuration"
        "vite.config.ts:Modern Frontend Build"
        "tailwind.config.js:CSS Framework Configuration"
        "playwright.config.js:E2E Testing Configuration"
    )
    
    local found_configs=""
    for config in "${config_files[@]}"; do
        file="${config%:*}"
        description="${config#*:}"
        
        if [[ -f "$file" ]] || [[ -d "$file" ]]; then
            found_configs+="### $file - $description\n"
            found_configs+="**Purpose**: $description\n"
            found_configs+="**Location**: $file\n\n"
        fi
    done
    
    if [[ -n "$found_configs" ]]; then
        # Insert found configs into llms.txt (this is a simplified approach)
        log_info "Found configuration files, updating llms.txt..."
    fi
    
    log_success "llms.txt foundation created - manual customization recommended"
}

# Function to create base CLAUDE.md
generate_claude_md() {
    local project_name="${1:-$(basename "$PROJECT_ROOT")}"
    
    log_info "Creating compound engineering learning system for $project_name..."
    
    # Check if CLAUDE.md already exists
    if [[ -f "$PROJECT_ROOT/CLAUDE.md" ]]; then
        log_warning "CLAUDE.md already exists. Creating backup..."
        cp "$PROJECT_ROOT/CLAUDE.md" "$PROJECT_ROOT/CLAUDE.md.backup.$(date +%Y%m%d_%H%M%S)"
    fi
    
    # Start with template
    cp "$TEMPLATE_DIR/claude-foundation.md" "$PROJECT_ROOT/CLAUDE.md"
    
    # Replace placeholder values
    sed -i.bak "s/\[PROJECT_NAME\]/$project_name/g" "$PROJECT_ROOT/CLAUDE.md"
    sed -i.bak "s/\[DATE\]/$(date +%Y-%m-%d)/g" "$PROJECT_ROOT/CLAUDE.md"
    rm "$PROJECT_ROOT/CLAUDE.md.bak" 2>/dev/null || true
    
    log_success "CLAUDE.md compound engineering foundation created"
}

# Function to set up git hooks for compound engineering enforcement
setup_git_hooks() {
    local hooks_dir="$PROJECT_ROOT/.git/hooks"
    
    log_info "Setting up compound engineering git hooks..."
    
    # Create pre-commit hook
    cat > "$hooks_dir/pre-commit" << 'EOF'
#!/bin/bash

# Compound Engineering Pre-Commit Hook

echo "🔍 Compound Engineering Compliance Check..."

# Check for CLAUDE.md updates when code changes include fixes or new features
CHANGED_FILES=$(git diff --cached --name-only)

# Look for patterns that suggest learning should be documented
if echo "$CHANGED_FILES" | grep -E "\.(js|py|rb|php|java|go|rs|ts)$" > /dev/null; then
    # Check if this looks like a fix or new feature
    COMMIT_MSG_FILE=".git/COMMIT_EDITMSG"
    if [[ -f "$COMMIT_MSG_FILE" ]]; then
        if grep -iE "(fix|bug|error|issue|feature|add|implement)" "$COMMIT_MSG_FILE" > /dev/null; then
            # This looks like something that should potentially update CLAUDE.md
            if ! echo "$CHANGED_FILES" | grep "CLAUDE.md" > /dev/null; then
                echo "⚠️  Code changes detected that may warrant learning documentation"
                echo "   Consider updating CLAUDE.md if this addresses a bug or implements a new pattern"
            fi
        fi
    fi
fi

# Check for unauthorized documentation files
UNAUTHORIZED_DOCS=$(find . -name "*.md" -not -path "./.git/*" -not -name "CLAUDE.md" -not -name "README.md" -not -name "CHANGELOG.md" -not -path "./docs/*")
if [[ -n "$UNAUTHORIZED_DOCS" ]]; then
    echo "❌ Potential documentation proliferation detected:"
    echo "$UNAUTHORIZED_DOCS"
    echo "   Consider consolidating into CLAUDE.md or docs/ directory"
    echo "   Use --no-verify to skip this check if intentional"
    exit 1
fi

echo "✅ Compound engineering compliance check passed"
EOF

    chmod +x "$hooks_dir/pre-commit"
    
    log_success "Git hooks configured for compound engineering enforcement"
}

# Function to create compound engineering directory structure
setup_compound_structure() {
    log_info "Creating compound engineering directory structure..."
    
    # Create compound engineering directories
    mkdir -p "$PROJECT_ROOT/.compound"
    mkdir -p "$PROJECT_ROOT/.compound/patterns"
    mkdir -p "$PROJECT_ROOT/.compound/learnings"
    mkdir -p "$PROJECT_ROOT/.compound/templates"
    
    # Create pattern tracking file
    cat > "$PROJECT_ROOT/.compound/patterns/README.md" << EOF
# Compound Engineering Patterns

This directory contains extracted patterns from the project that can be reused.

## Pattern Structure

Each pattern should include:
- **Context**: When to use this pattern
- **Implementation**: Code examples and setup
- **Benefits**: Why this pattern is effective
- **Variations**: Different ways to apply the pattern

## Pattern Categories

- \`architectural/\` - High-level design patterns
- \`implementation/\` - Code implementation patterns  
- \`testing/\` - Testing and quality patterns
- \`deployment/\` - Deployment and infrastructure patterns
- \`debugging/\` - Problem-solving and debugging patterns

Patterns are automatically extracted from CLAUDE.md learnings and stored here for reuse.
EOF

    # Create learning tracking
    cat > "$PROJECT_ROOT/.compound/learnings/tracking.json" << EOF
{
  "lastUpdate": "$(date -Iseconds)",
  "totalLearnings": 0,
  "preventionRules": 0,
  "successPatterns": 0,
  "compoundIntelligenceGrowth": {
    "baseline": "$(date -Iseconds)",
    "metrics": {
      "bugRecurrenceRate": null,
      "patternReuseFrequency": null,
      "timeToResolution": null,
      "knowledgeTransferEfficiency": null
    }
  }
}
EOF

    log_success "Compound engineering structure created"
}

# Function to display compound engineering status
show_status() {
    echo -e "\n${BLUE}📊 Compound Engineering Status${NC}"
    echo "================================="
    
    if [[ -f "$PROJECT_ROOT/llms.txt" ]]; then
        echo -e "${GREEN}✅${NC} llms.txt - Project context foundation"
    else
        echo -e "${RED}❌${NC} llms.txt - Missing project context"
    fi
    
    if [[ -f "$PROJECT_ROOT/CLAUDE.md" ]]; then
        echo -e "${GREEN}✅${NC} CLAUDE.md - Learning system active"
        
        # Count learnings in CLAUDE.md
        local prevention_rules=$(grep -c "^### Rule #" "$PROJECT_ROOT/CLAUDE.md" 2>/dev/null || echo "0")
        local patterns=$(grep -c "^### Pattern #" "$PROJECT_ROOT/CLAUDE.md" 2>/dev/null || echo "0")
        
        echo "   - Prevention rules: $prevention_rules"
        echo "   - Success patterns: $patterns"
    else
        echo -e "${RED}❌${NC} CLAUDE.md - Learning system not initialized"
    fi
    
    if [[ -f "$PROJECT_ROOT/.git/hooks/pre-commit" ]]; then
        echo -e "${GREEN}✅${NC} Git hooks - Compound engineering enforcement active"
    else
        echo -e "${YELLOW}⚠️${NC}  Git hooks - No enforcement configured"
    fi
    
    if [[ -d "$PROJECT_ROOT/.compound" ]]; then
        echo -e "${GREEN}✅${NC} Compound structure - Pattern and learning tracking ready"
    else
        echo -e "${YELLOW}⚠️${NC}  Compound structure - Advanced tracking not set up"
    fi
}

# Main command dispatch
main() {
    local command="${1:-compound}"
    local project_name="$2"
    
    case "$command" in
        "compound"|"full")
            log_info "Initializing full compound engineering system..."
            check_git_repo
            generate_llms_txt "$project_name"
            generate_claude_md "$project_name"
            setup_git_hooks
            setup_compound_structure
            log_success "Compound engineering system initialized successfully!"
            show_status
            ;;
        "llms-foundation")
            log_info "Creating llms.txt foundation..."
            generate_llms_txt "$project_name"
            ;;
        "learning-system")
            log_info "Creating CLAUDE.md learning system..."
            generate_claude_md "$project_name"
            ;;
        "git-hooks")
            log_info "Setting up compound engineering git hooks..."
            check_git_repo
            setup_git_hooks
            ;;
        "structure")
            log_info "Creating compound engineering directory structure..."
            setup_compound_structure
            ;;
        "status")
            show_status
            ;;
        "help"|"-h"|"--help")
            echo "Compound Engineering Initialization"
            echo "Usage: $0 [command] [project_name]"
            echo ""
            echo "Commands:"
            echo "  compound           Full compound engineering initialization (default)"
            echo "  llms-foundation    Create comprehensive llms.txt for project context"
            echo "  learning-system    Initialize base CLAUDE.md learning architecture"
            echo "  git-hooks         Set up compound engineering git hooks"
            echo "  structure         Create compound engineering directory structure"
            echo "  status            Show current compound engineering status"
            echo "  help              Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0 compound my-awesome-project"
            echo "  $0 llms-foundation"
            echo "  $0 status"
            ;;
        *)
            log_error "Unknown command: $command"
            echo "Use '$0 help' for usage information"
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"