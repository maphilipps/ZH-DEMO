#!/bin/bash

# Learning Capture Hook for ZH-Demo Municipal Portal
# Automatically captures learning opportunities during development

set -e

# Configuration
PROJECT_ROOT="$(git rev-parse --show-toplevel)"
LEARNING_DIR="$PROJECT_ROOT/.claude/learning"
TIMESTAMP=$(date '+%Y-%m-%d_%H-%M-%S')
MUNICIPALITY=${MUNICIPALITY:-"all"}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Capture failure for learning
capture_failure() {
    local failure_type="$1"
    local description="$2"
    local context="$3"
    
    local failure_file="$LEARNING_DIR/failures/failure_${TIMESTAMP}.md"
    
    cat > "$failure_file" << EOF
# Failure Capture: $failure_type

**Date**: $(date '+%Y-%m-%d %H:%M:%S')
**Municipality Context**: $MUNICIPALITY
**Type**: $failure_type

## Description
$description

## Context
$context

## System Information
- Drupal Version: 11.2.2
- PHP Version: 8.3
- Environment: DDEV

## Git Information
- Branch: $(git branch --show-current)
- Commit: $(git rev-parse --short HEAD)
- Status: $(git status --porcelain | wc -l) modified files

## Next Steps
- [ ] Analyze root cause
- [ ] Create prevention strategy  
- [ ] Update development practices
- [ ] Document solution in ADR if needed

## Tags
#failure #municipal-portal #learning
EOF

    log_info "Failure captured: $failure_file"
}

# Capture successful pattern
capture_pattern() {
    local pattern_name="$1"
    local implementation="$2"
    local benefits="$3"
    
    local pattern_file="$LEARNING_DIR/patterns/pattern_${TIMESTAMP}_$(echo "$pattern_name" | tr ' ' '_' | tr '[:upper:]' '[:lower:]').md"
    
    cat > "$pattern_file" << EOF
# Development Pattern: $pattern_name

**Date**: $(date '+%Y-%m-%d %H:%M:%S')
**Municipality Context**: $MUNICIPALITY
**Pattern Type**: Implementation

## Implementation
\`\`\`
$implementation
\`\`\`

## Benefits
$benefits

## Municipal Portal Considerations
- Multi-site compatibility: [Yes/No/Partial]
- Swiss compliance impact: [Positive/Neutral/Requires attention]
- AI integration potential: [High/Medium/Low/None]
- Performance impact: [Positive/Neutral/Negative]

## Usage Guidelines
When to use:
- [Specific scenarios where this pattern applies]

When not to use:
- [Scenarios where this pattern should be avoided]

## Related Patterns
- [Links to related patterns or ADRs]

## Tags
#pattern #municipal-portal #drupal-11 #reusable
EOF

    log_success "Pattern captured: $pattern_file"
}

# Update ADR decision
update_adr() {
    local decision_title="$1"
    local status="$2"
    local notes="$3"
    
    local decision_file="$LEARNING_DIR/decisions/decision_${TIMESTAMP}_$(echo "$decision_title" | tr ' ' '_' | tr '[:upper:]' '[:lower:]').md"
    
    cat > "$decision_file" << EOF
# Architecture Decision Update: $decision_title

**Date**: $(date '+%Y-%m-%d %H:%M:%S')
**Status**: $status
**Municipality Context**: $MUNICIPALITY

## Decision Context
$decision_title

## Current Status
$status

## Implementation Notes
$notes

## Municipal Impact Assessment
### Thalwil Impact
- [Specific impact on Thalwil municipality site]

### Thalheim Impact  
- [Specific impact on Thalheim municipality site]

### Erlenbach Impact
- [Specific impact on Erlenbach municipality site]

## Swiss Compliance Check
- WCAG 2.1 AA: [Compliant/Needs attention/Not applicable]
- CH-DSG Data Protection: [Compliant/Needs attention/Not applicable]  
- eCH-0059 Government Standards: [Compliant/Needs attention/Not applicable]

## Performance Validation
- Load time impact: [Positive/Neutral/Negative]
- Database performance: [Positive/Neutral/Negative]
- Frontend performance: [Positive/Neutral/Negative]

## Next Actions
- [ ] [Specific follow-up actions needed]

## Tags
#decision #adr #municipal-portal #architecture
EOF

    log_success "ADR update captured: $decision_file"
}

# Validate improvement
validate_improvement() {
    local metric="$1"
    local before_value="$2"
    local after_value="$3"
    local context="$4"
    
    local improvement_file="$LEARNING_DIR/patterns/improvement_${TIMESTAMP}.md"
    
    # Calculate improvement percentage
    local improvement_pct=0
    if [[ "$before_value" -gt 0 && "$after_value" -gt 0 ]]; then
        improvement_pct=$(echo "scale=2; (($after_value - $before_value) / $before_value) * 100" | bc -l)
    fi
    
    cat > "$improvement_file" << EOF
# Performance Improvement Validation

**Date**: $(date '+%Y-%m-%d %H:%M:%S')
**Metric**: $metric
**Municipality Context**: $MUNICIPALITY

## Measurement
- **Before**: $before_value
- **After**: $after_value  
- **Improvement**: ${improvement_pct}%

## Context
$context

## Validation Method
- [How the improvement was measured]
- [Tools used for measurement]
- [Reproducibility steps]

## Municipal Sites Impact
- Thalwil: [Impact assessment]
- Thalheim: [Impact assessment]
- Erlenbach: [Impact assessment]

## Sustainability
- [How to maintain this improvement]
- [Monitoring approach]
- [Risk factors]

## Lessons Learned
- [Key insights from this improvement]
- [Applicable patterns for future work]

## Tags
#improvement #performance #validation #municipal-portal
EOF

    log_success "Improvement validation captured: $improvement_file"
}

# Main execution based on hook type
case "${1:-}" in
    "failure")
        capture_failure "$2" "$3" "$4"
        ;;
    "pattern")
        capture_pattern "$2" "$3" "$4"
        ;;
    "adr")
        update_adr "$2" "$3" "$4"
        ;;
    "improvement")
        validate_improvement "$2" "$3" "$4" "$5"
        ;;
    *)
        echo "Usage: $0 {failure|pattern|adr|improvement} [args...]"
        echo ""
        echo "Examples:"
        echo "  $0 failure 'Build Error' 'Vite build failed' 'Tailwind CSS compilation issue'"
        echo "  $0 pattern 'Municipal Form Validation' 'Swiss compliance validation code' 'Ensures CH-DSG compliance'"
        echo "  $0 adr 'Multi-site Theme Architecture' 'ACCEPTED' 'Successfully implemented across all municipalities'"
        echo "  $0 improvement 'Page Load Time' '3.2' '1.8' 'Vite optimization implementation'"
        exit 1
        ;;
esac