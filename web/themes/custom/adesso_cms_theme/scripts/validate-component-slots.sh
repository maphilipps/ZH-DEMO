#!/bin/bash
# validate-component-slots.sh
# Validate Single Directory Component slot definitions
# Based on CLAUDE.md Prevention Rule #21: Slot Standardization Framework

set -e

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
THEME_DIR="$(dirname "$SCRIPT_DIR")"
COMPONENTS_DIR="$THEME_DIR/components"
VIOLATIONS_FOUND=0
EXIT_CODE=0

echo -e "${BLUE}🔍 Component Slot Validation${NC}"
echo "============================="
echo "Validating SDC slot definitions against atomic design standards..."
echo ""

# Function to report violations
report_violation() {
    local component="$1"
    local issue="$2"
    local severity="$3"
    local guidance="$4"
    
    VIOLATIONS_FOUND=$((VIOLATIONS_FOUND + 1))
    
    if [[ "$severity" == "ERROR" ]]; then
        echo -e "${RED}❌ ERROR${NC} in $component"
        EXIT_CODE=1
    else
        echo -e "${YELLOW}⚠️  WARNING${NC} in $component"
    fi
    
    echo "   Issue: $issue"
    if [[ -n "$guidance" ]]; then
        echo "   Fix: $guidance"
    fi
    echo ""
}

# Function to check atomic design slot standards
check_atomic_design_slots() {
    local component_file="$1"
    local component_name=$(basename "$(dirname "$component_file")")
    local group=""
    
    # Extract group from component.yml
    if [[ -f "$component_file" ]]; then
        group=$(grep "group:" "$component_file" | sed 's/.*group:[[:space:]]*//' | tr -d '"' | xargs)
    fi
    
    if [[ ! -f "$component_file" ]]; then
        report_violation "$component_name" "Missing component.yml file" "ERROR" "Create $component_name.component.yml with proper slot definitions"
        return
    fi
    
    # Check if slots are defined
    if ! grep -q "slots:" "$component_file"; then
        # Check if this component should have slots based on atomic design group
        case "$group" in
            "Atoms")
                # Atoms should have minimal slots
                if [[ "$component_name" != "badge" && "$component_name" != "status-badge" ]]; then
                    report_violation "$component_name" "Atom missing basic slot definition" "WARNING" "Add 'content' slot for atomic content"
                fi
                ;;
            "Molecules")
                report_violation "$component_name" "Molecule missing slot definition" "ERROR" "Add title, content slots for molecular complexity"
                ;;
            "Organisms")
                report_violation "$component_name" "Organism missing slot definition" "ERROR" "Add title, content, media slots for organismal complexity"
                ;;
            "Templates")
                report_violation "$component_name" "Template missing slot definition" "ERROR" "Add comprehensive slot structure for template flexibility"
                ;;
            *)
                report_violation "$component_name" "Unknown group '$group' - cannot validate slots" "WARNING" "Set proper group: Atoms/Molecules/Organisms/Templates"
                ;;
        esac
        return
    fi
    
    # Validate slot definitions based on atomic design group
    case "$group" in
        "Atoms")
            # Atoms should have simple, focused slots
            validate_atom_slots "$component_file" "$component_name"
            ;;
        "Molecules") 
            # Molecules should compose atoms with title/content/media
            validate_molecule_slots "$component_file" "$component_name"
            ;;
        "Organisms")
            # Organisms should have comprehensive slot structure
            validate_organism_slots "$component_file" "$component_name"
            ;;
        "Templates")
            # Templates should have maximum flexibility
            validate_template_slots "$component_file" "$component_name"
            ;;
        *)
            report_violation "$component_name" "Invalid group '$group'" "ERROR" "Use: Atoms, Molecules, Organisms, or Templates"
            ;;
    esac
}

# Validate atom-level slot requirements
validate_atom_slots() {
    local component_file="$1"
    local component_name="$2"
    
    # Atoms should have focused, single-purpose slots
    local expected_atom_slots=""
    
    case "$component_name" in
        "button"|"badge"|"status-badge")
            expected_atom_slots="content"
            ;;
        "heading"|"logo")
            expected_atom_slots="content"
            ;;
        "menu-item")
            expected_atom_slots="content"
            ;;
        *)
            expected_atom_slots="content"
            ;;
    esac
    
    # Check for essential slot
    if ! grep -A 10 "slots:" "$component_file" | grep -q "content:"; then
        report_violation "$component_name" "Atom missing 'content' slot" "WARNING" "Add basic content slot for atomic content"
    fi
    
    # Check for slot documentation
    validate_slot_documentation "$component_file" "$component_name" "content"
}

# Validate molecule-level slot requirements
validate_molecule_slots() {
    local component_file="$1" 
    local component_name="$2"
    
    # Molecules should compose atoms with structured content
    local required_slots=("title" "content")
    
    # Media-heavy molecules need media slot
    case "$component_name" in
        "card"|"card-group"|"hero"|"carousel"|"gallery")
            required_slots+=("media")
            ;;
    esac
    
    # Check required slots exist
    for slot in "${required_slots[@]}"; do
        if ! grep -A 20 "slots:" "$component_file" | grep -q "$slot:"; then
            report_violation "$component_name" "Molecule missing '$slot' slot" "ERROR" "Add $slot slot for molecular composition"
        else
            validate_slot_documentation "$component_file" "$component_name" "$slot"
        fi
    done
}

# Validate organism-level slot requirements  
validate_organism_slots() {
    local component_file="$1"
    local component_name="$2"
    
    # Organisms should have comprehensive slot structure
    local required_slots=("title" "content")
    
    # Complex organisms need additional slots
    case "$component_name" in
        "site-header"|"site-footer"|"main-menu")
            required_slots+=("navigation")
            ;;
        "page"|"landing-page-header")
            required_slots+=("media" "actions")
            ;;
        *"-group"|"pricing"|"accordion")
            required_slots+=("items")
            ;;
    esac
    
    # Check required slots exist
    for slot in "${required_slots[@]}"; do
        if ! grep -A 30 "slots:" "$component_file" | grep -q "$slot:"; then
            report_violation "$component_name" "Organism missing '$slot' slot" "ERROR" "Add $slot slot for organismal complexity"
        else
            validate_slot_documentation "$component_file" "$component_name" "$slot"
        fi
    done
}

# Validate template-level slot requirements
validate_template_slots() {
    local component_file="$1"
    local component_name="$2"
    
    # Templates should have maximum flexibility with comprehensive slots
    local expected_slots=("header" "content" "sidebar" "footer")
    
    for slot in "${expected_slots[@]}"; do
        if ! grep -A 40 "slots:" "$component_file" | grep -q "$slot:"; then
            report_violation "$component_name" "Template missing '$slot' slot" "WARNING" "Add $slot slot for template flexibility"
        else
            validate_slot_documentation "$component_file" "$component_name" "$slot"
        fi
    done
}

# Validate individual slot documentation
validate_slot_documentation() {
    local component_file="$1"
    local component_name="$2"
    local slot_name="$3"
    
    # Extract slot definition section
    local slot_section=$(grep -A 5 "$slot_name:" "$component_file")
    
    # Check for required slot properties
    if ! echo "$slot_section" | grep -q "title:"; then
        report_violation "$component_name" "Slot '$slot_name' missing title property" "WARNING" "Add title: 'Descriptive slot title'"
    fi
    
    if ! echo "$slot_section" | grep -q "description:"; then
        report_violation "$component_name" "Slot '$slot_name' missing description" "WARNING" "Add description explaining slot purpose"
    fi
}

echo "🔍 Scanning component directories..."

# Find all component.yml files and validate them
while IFS= read -r -d '' component_file; do
    check_atomic_design_slots "$component_file"
done < <(find "$COMPONENTS_DIR" -name "*.component.yml" -print0 2>/dev/null || true)

echo "🔍 Checking for orphaned templates without components..."

# Find paragraph templates without corresponding components
while IFS= read -r -d '' template_file; do
    template_name=$(basename "$template_file" .html.twig)
    component_name=$(echo "$template_name" | sed 's/paragraph--//')
    
    # Check if corresponding component exists
    component_dir="$COMPONENTS_DIR/$component_name"
    if [[ ! -d "$component_dir" ]]; then
        report_violation "$template_name" "Orphaned template without component" "WARNING" "Create component directory with proper slot structure"
    fi
done < <(find "$COMPONENTS_DIR/*/templates" -name "paragraph--*.html.twig" -print0 2>/dev/null || true)

echo ""
echo "============================="

if [ $VIOLATIONS_FOUND -eq 0 ]; then
    echo -e "${GREEN}✅ All component slots properly defined!${NC}"
    echo "Components follow atomic design slot standards."
else
    echo -e "${RED}❌ Found $VIOLATIONS_FOUND component slot violations${NC}"
    echo ""
    echo "📚 Atomic Design Slot Standards:"
    echo "  - Atoms: Simple 'content' slot for focused functionality"
    echo "  - Molecules: 'title', 'content' slots, optional 'media' for composition" 
    echo "  - Organisms: Comprehensive slots including 'title', 'content', plus specialized slots"
    echo "  - Templates: Maximum flexibility with 'header', 'content', 'sidebar', 'footer' slots"
    echo ""
    echo "📖 Documentation Requirements:"
    echo "  - Each slot must have 'title' and 'description' properties"
    echo "  - Descriptions should explain slot purpose and content expectations"
    echo "  - Optional 'required' flag for mandatory slots"
    echo ""
    echo "🔗 Reference: SLOT_STANDARDIZATION_FRAMEWORK.md"
fi

exit $EXIT_CODE