#!/bin/bash
# validate-template-patterns.sh  
# Validate template pattern compliance for embed + slots usage
# Based on CLAUDE.md Prevention Rule #21: Slot Standardization Framework

set -e

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
THEME_DIR="$(dirname "$SCRIPT_DIR")"
COMPONENTS_DIR="$THEME_DIR/components"
TEMPLATES_DIR="$THEME_DIR/templates"
VIOLATIONS_FOUND=0
EXIT_CODE=0

echo -e "${BLUE}🔍 Template Pattern Compliance Validation${NC}"
echo "==========================================="
echo "Validating embed + slots pattern usage in templates..."
echo ""

# Function to report violations
report_violation() {
    local file="$1"
    local line_num="$2"
    local issue="$3"
    local severity="$4"
    local fix_guidance="$5"
    
    VIOLATIONS_FOUND=$((VIOLATIONS_FOUND + 1))
    
    if [[ "$severity" == "ERROR" ]]; then
        echo -e "${RED}❌ ERROR${NC} in $file:$line_num"
        EXIT_CODE=1
    elif [[ "$severity" == "WARNING" ]]; then
        echo -e "${YELLOW}⚠️  WARNING${NC} in $file:$line_num"
    else
        echo -e "${PURPLE}ℹ️  INFO${NC} in $file:$line_num"
    fi
    
    echo "   Issue: $issue"
    if [[ -n "$fix_guidance" ]]; then
        echo "   Fix: $fix_guidance"
    fi
    echo ""
}

# Function to analyze paragraph template patterns
analyze_paragraph_template() {
    local file="$1"
    local filename=$(basename "$file")
    
    # Skip non-paragraph templates
    if [[ ! "$filename" =~ paragraph--.*\.html\.twig ]]; then
        return
    fi
    
    echo "   Analyzing $filename..."
    
    local line_num=0
    local has_embed=false
    local has_include=false
    local has_slot_blocks=false
    local has_field_extraction=false
    
    while IFS= read -r line; do
        line_num=$((line_num + 1))
        
        # Check for embed pattern (GOOD)
        if echo "$line" | grep -q "{% embed"; then
            has_embed=true
        fi
        
        # Check for include pattern (POTENTIAL ISSUE)
        if echo "$line" | grep -q "{% include"; then
            has_include=true
            
            # Check if include is used with field props (ANTI-PATTERN)
            if echo "$line" | grep -q "with.*field_"; then
                report_violation "$file" "$line_num" "Using include with field props instead of embed + slots" "ERROR" "Replace with {% embed %} and move field content to {% block %} slots"
            fi
        fi
        
        # Check for slot block usage (GOOD)
        if echo "$line" | grep -q "{% block "; then
            has_slot_blocks=true
        fi
        
        # Check for direct field extraction in template (BAD)
        if echo "$line" | grep -E -q "(paragraph\.|content\.)field_[a-zA-Z_]*\.(value|getString|render)"; then
            has_field_extraction=true
            local context=$(echo "$line" | sed 's/^[[:space:]]*//' | cut -c1-50)
            report_violation "$file" "$line_num" "Direct field extraction in template" "ERROR" "Move field content to slot blocks: {% block title %}{{ content.field_title }}{% endblock %}"
        fi
        
        # Check for anti-pattern: content.field_*|render|striptags
        if echo "$line" | grep -q "content\.field_[a-zA-Z_]*|render|striptags"; then
            local context=$(echo "$line" | sed 's/^[[:space:]]*//' | cut -c1-50)
            report_violation "$file" "$line_num" "Double processing anti-pattern" "ERROR" "Use simple {{ content.field_title }} in slot blocks"
        fi
        
    done < "$file"
    
    # Analyze overall template pattern compliance
    analyze_template_compliance "$file" "$has_embed" "$has_include" "$has_slot_blocks" "$has_field_extraction"
}

# Function to analyze overall template compliance
analyze_template_compliance() {
    local file="$1"
    local has_embed="$2"
    local has_include="$3" 
    local has_slot_blocks="$4"
    local has_field_extraction="$5"
    local filename=$(basename "$file")
    
    # Check for ideal pattern: embed + slots, no field extraction
    if [[ "$has_embed" == true && "$has_slot_blocks" == true && "$has_field_extraction" == false ]]; then
        echo -e "     ${GREEN}✅ GOOD:${NC} Uses embed + slots pattern correctly"
        return
    fi
    
    # Check for mixed patterns (needs improvement)
    if [[ "$has_embed" == true && "$has_include" == true ]]; then
        report_violation "$file" "1" "Mixed embed/include patterns" "WARNING" "Standardize on embed + slots for consistency"
    fi
    
    # Check for missing slot structure
    if [[ "$has_embed" == false && "$has_include" == false ]]; then
        # Check if this template should use component composition
        if echo "$filename" | grep -E -q "paragraph--(card|hero|pricing|accordion|carousel)"; then
            report_violation "$file" "1" "Complex component not using composition pattern" "WARNING" "Consider using {% embed %} with slot blocks for maintainability"
        fi
    fi
    
    # Check for templates that should have slot blocks but don't
    if [[ "$has_embed" == true && "$has_slot_blocks" == false ]]; then
        report_violation "$file" "1" "Embed without slot blocks" "ERROR" "Add {% block %} definitions inside {% embed %}"
    fi
}

# Function to check component Twig file patterns
analyze_component_template() {
    local file="$1"
    local component_dir=$(dirname "$file")
    local component_name=$(basename "$component_dir")
    
    echo "   Analyzing component: $component_name"
    
    local line_num=0
    local has_slot_definitions=false
    local has_default_content=false
    
    while IFS= read -r line; do
        line_num=$((line_num + 1))
        
        # Check for slot definitions in component template
        if echo "$line" | grep -q "{% block "; then
            has_slot_definitions=true
        fi
        
        # Check for default content in slots
        if echo "$line" | grep -A 3 "{% block " | grep -q "{% endblock %}"; then
            # Check if there's content between block tags
            local block_content=$(echo "$line" | sed -n '/{% block /,/{% endblock %}/p')
            if [[ -n "$block_content" && ! "$block_content" =~ ^[[:space:]]*$ ]]; then
                has_default_content=true
            fi
        fi
        
        # Check for improper field access in component template
        if echo "$line" | grep -q "content\.field_"; then
            local context=$(echo "$line" | sed 's/^[[:space:]]*//' | cut -c1-50)
            report_violation "$file" "$line_num" "Direct field access in component template" "WARNING" "Use props or expect content via slots from paragraph template"
        fi
        
    done < "$file"
    
    # Check component template compliance
    if [[ -f "$component_dir/$component_name.component.yml" ]]; then
        local has_slots_defined=$(grep -q "slots:" "$component_dir/$component_name.component.yml" && echo true || echo false)
        
        if [[ "$has_slots_defined" == true && "$has_slot_definitions" == false ]]; then
            report_violation "$file" "1" "Component defines slots in YAML but not in template" "ERROR" "Add {% block slot_name %} definitions to template"
        fi
        
        if [[ "$has_slot_definitions" == true && "$has_slots_defined" == false ]]; then
            report_violation "$file" "1" "Template has slot blocks but no slots in component.yml" "WARNING" "Document slots in component.yml schema"
        fi
    fi
}

# Function to validate field content flow
validate_field_content_flow() {
    echo "🔍 Validating field content flow patterns..."
    
    # Look for proper field → slot → component flow
    while IFS= read -r -d '' paragraph_template; do
        local component_name=$(basename "$paragraph_template" .html.twig | sed 's/paragraph--//')
        local component_dir="$COMPONENTS_DIR/$component_name"
        
        if [[ -d "$component_dir" ]]; then
            # Check if paragraph template properly feeds component slots
            if grep -q "{% embed.*$component_name" "$paragraph_template"; then
                echo "     ✅ $component_name: Proper embed pattern found"
            elif grep -q "{% include.*$component_name" "$paragraph_template"; then
                echo "     ⚠️  $component_name: Using include instead of embed"
            else
                echo "     ❓ $component_name: No clear component composition found"
            fi
        fi
    done < <(find "$COMPONENTS_DIR/*/templates" -name "paragraph--*.html.twig" -print0 2>/dev/null || true)
}

echo "🔍 Scanning paragraph templates..."
while IFS= read -r -d '' template_file; do
    analyze_paragraph_template "$template_file"
done < <(find "$COMPONENTS_DIR/*/templates" -name "paragraph--*.html.twig" -print0 2>/dev/null || true)

echo ""
echo "🔍 Scanning component templates..."
while IFS= read -r -d '' component_file; do
    analyze_component_template "$component_file"  
done < <(find "$COMPONENTS_DIR" -name "*.twig" -not -path "*/templates/*" -print0 2>/dev/null || true)

echo ""
validate_field_content_flow

echo ""
echo "🔍 Performance impact analysis..."

# Count template patterns for performance assessment
embed_count=$(find "$COMPONENTS_DIR/*/templates" -name "*.twig" -exec grep -l "{% embed" {} \; 2>/dev/null | wc -l)
include_count=$(find "$COMPONENTS_DIR/*/templates" -name "*.twig" -exec grep -l "{% include" {} \; 2>/dev/null | wc -l)
field_extraction_count=$(find "$COMPONENTS_DIR/*/templates" -name "*.twig" -exec grep -l "field_.*\.value\|field_.*\.getString\|render|striptags" {} \; 2>/dev/null | wc -l)

echo "📊 Pattern Distribution:"
echo "   - Embed patterns: $embed_count templates"  
echo "   - Include patterns: $include_count templates"
echo "   - Field extraction anti-patterns: $field_extraction_count templates"

if [ $field_extraction_count -gt 0 ]; then
    echo -e "   ${YELLOW}⚠️  Performance Impact:${NC} $field_extraction_count templates using inefficient field processing"
fi

echo ""
echo "==========================================="

if [ $VIOLATIONS_FOUND -eq 0 ]; then
    echo -e "${GREEN}✅ All templates follow proper patterns!${NC}"
    echo "Templates correctly use embed + slots for component composition."
    echo "Field content flows through slot blocks without direct extraction."
else
    echo -e "${RED}❌ Found $VIOLATIONS_FOUND template pattern violations${NC}"
    echo ""
    echo "🎯 Ideal Pattern:"
    echo "   1. Paragraph templates use {% embed 'component' %}"
    echo "   2. Field content goes into {% block slot_name %} within embed"
    echo "   3. Component templates define matching slot blocks"  
    echo "   4. No direct field extraction (paragraph.field_*.value)"
    echo ""
    echo "📈 Performance Benefits:"
    echo "   - Embed + slots: Single template compilation, optimal caching"
    echo "   - Slot blocks: Drupal handles field rendering efficiently"  
    echo "   - No field extraction: Eliminates double processing overhead"
    echo ""
    echo "🔗 References:"
    echo "   - CLAUDE.md Prevention Rule #21: Slot Standardization Framework"
    echo "   - TEMPLATE_PATTERN_STANDARDS.md"
    echo "   - SLOT_STANDARDIZATION_FRAMEWORK.md"
fi

exit $EXIT_CODE