#!/bin/bash
# validate-field-patterns.sh
# Detect anti-patterns in Twig templates for field processing
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
TEMPLATES_DIR="$THEME_DIR/templates"
VIOLATIONS_FOUND=0
EXIT_CODE=0

echo -e "${BLUE}🔍 Field Pattern Anti-Pattern Validation${NC}"
echo "======================================"
echo "Scanning for slot standardization violations..."
echo ""

# Function to report violations
report_violation() {
    local file="$1"
    local line_num="$2"
    local pattern="$3"
    local context="$4"
    local severity="$5"
    
    VIOLATIONS_FOUND=$((VIOLATIONS_FOUND + 1))
    
    if [[ "$severity" == "ERROR" ]]; then
        echo -e "${RED}❌ ERROR${NC} in $file:$line_num"
        EXIT_CODE=1
    else
        echo -e "${YELLOW}⚠️  WARNING${NC} in $file:$line_num"
    fi
    
    echo "   Anti-Pattern: $pattern"
    echo "   Context: $context"
    echo ""
}

# Function to provide fix guidance
show_fix_guidance() {
    local pattern="$1"
    
    echo -e "${BLUE}💡 Fix Guidance for: $pattern${NC}"
    
    case "$pattern" in
        "Direct field value extraction")
            echo "   Replace: paragraph.field_title.value"
            echo "   With:    {{ content.field_title }} in slot block"
            echo "   Example: {% block title %}{{ content.field_title }}{% endblock %}"
            ;;
        "Complex field extraction")
            echo "   Replace: content.field_title['#items'].getString()"
            echo "   With:    {{ content.field_title }} in slot block"
            echo "   Example: {% block content %}{{ content.field_title }}{% endblock %}"
            ;;
        "Double processing pattern")
            echo "   Replace: content.field_title|render|striptags"
            echo "   With:    {{ content.field_title }} (auto-escaped)"
            echo "   Example: {% block title %}{{ content.field_title }}{% endblock %}"
            ;;
        "Include with props instead of embed")
            echo "   Replace: {% include 'component' with { title: ... } %}"
            echo "   With:    {% embed 'component' %}"
            echo "   Example: {% embed 'component' %}{% block title %}...{% endblock %}{% endembed %}"
            ;;
        "Missing slot block structure")
            echo "   Add proper slot blocks to paragraph templates"
            echo "   Example: {% block title %}{{ content.field_title }}{% endblock %}"
            ;;
    esac
    echo ""
}

echo "🔍 Scanning for direct field value extraction..."
while IFS= read -r -d '' file; do
    line_num=0
    while IFS= read -r line; do
        line_num=$((line_num + 1))
        
        # Pattern 1: Direct field value extraction (paragraph.field_*.value)
        if echo "$line" | grep -q "paragraph\.field_[a-zA-Z_]*\.value"; then
            context=$(echo "$line" | sed 's/^[[:space:]]*//' | cut -c1-60)
            report_violation "$file" "$line_num" "Direct field value extraction" "$context..." "ERROR"
        fi
        
        # Pattern 2: Complex field extraction (#items, getString)
        if echo "$line" | grep -q "content\.field_[a-zA-Z_]*\['#items'\]\.getString()"; then
            context=$(echo "$line" | sed 's/^[[:space:]]*//' | cut -c1-60)
            report_violation "$file" "$line_num" "Complex field extraction" "$context..." "ERROR"
        fi
        
        # Pattern 3: Double processing pattern (render|striptags)
        if echo "$line" | grep -q "content\.field_[a-zA-Z_]*|render|striptags"; then
            context=$(echo "$line" | sed 's/^[[:space:]]*//' | cut -c1-60)
            report_violation "$file" "$line_num" "Double processing pattern" "$context..." "ERROR"
        fi
        
    done < "$file"
done < <(find "$COMPONENTS_DIR" "$TEMPLATES_DIR" -name "*.twig" -print0 2>/dev/null || true)

echo "🔍 Scanning for include/embed pattern violations..."
while IFS= read -r -d '' file; do
    line_num=0
    while IFS= read -r line; do
        line_num=$((line_num + 1))
        
        # Pattern 4: Include with field props instead of embed + slots
        if echo "$line" | grep -q "{% include.*with.*field_"; then
            if echo "$line" | grep -q "title:\|heading:\|content:\|summary:"; then
                context=$(echo "$line" | sed 's/^[[:space:]]*//' | cut -c1-60)
                report_violation "$file" "$line_num" "Include with props instead of embed" "$context..." "WARNING"
            fi
        fi
        
    done < "$file"
done < <(find "$COMPONENTS_DIR/*/templates" -name "paragraph--*.twig" -print0 2>/dev/null || true)

echo "🔍 Checking paragraph template slot structure..."
while IFS= read -r -d '' file; do
    # Check if paragraph template has proper slot blocks
    if ! grep -q "{% block " "$file"; then
        filename=$(basename "$file")
        if echo "$filename" | grep -q "paragraph--"; then
            report_violation "$file" "1" "Missing slot block structure" "No slot blocks found" "WARNING"
        fi
    fi
done < <(find "$COMPONENTS_DIR/*/templates" -name "paragraph--*.twig" -print0 2>/dev/null || true)

echo ""
echo "======================================"

if [ $VIOLATIONS_FOUND -eq 0 ]; then
    echo -e "${GREEN}✅ No field pattern violations found!${NC}"
    echo "All templates follow slot standardization framework."
else
    echo -e "${RED}❌ Found $VIOLATIONS_FOUND field pattern violations${NC}"
    echo ""
    echo "📚 Reference Documentation:"
    echo "  - CLAUDE.md Prevention Rule #21: Slot Standardization Framework"
    echo "  - SLOT_STANDARDIZATION_FRAMEWORK.md"
    echo "  - FIELD_TITLE_MIGRATION_GUIDE.md"
    echo ""
    echo "🔧 Common Fix Patterns:"
    show_fix_guidance "Direct field value extraction"
    show_fix_guidance "Complex field extraction"
    show_fix_guidance "Double processing pattern"
    show_fix_guidance "Include with props instead of embed"
    show_fix_guidance "Missing slot block structure"
fi

exit $EXIT_CODE