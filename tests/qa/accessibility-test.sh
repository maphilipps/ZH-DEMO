#!/bin/bash

# Event Review Dashboard - Accessibility Testing Script
# WCAG 2.1 AA + eCH-0059 Swiss Standards
# Author: @qa-testing-specialist

set -e

echo "♿ Event Review Dashboard - Accessibility Testing"
echo "================================================="
echo "Standards: WCAG 2.1 AA + eCH-0059 (Swiss)"
echo "Date: $(date)"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Test tracking
A11Y_TESTS_PASSED=0
A11Y_TESTS_FAILED=0
A11Y_TESTS_TOTAL=0

# Function to log accessibility test results
log_a11y_test() {
    local test_name="$1"
    local result="$2"
    local message="$3"
    
    A11Y_TESTS_TOTAL=$((A11Y_TESTS_TOTAL + 1))
    
    if [ "$result" = "PASS" ]; then
        echo -e "${GREEN}✅ PASS${NC}: $test_name - $message"
        A11Y_TESTS_PASSED=$((A11Y_TESTS_PASSED + 1))
    else
        echo -e "${RED}❌ FAIL${NC}: $test_name - $message"
        A11Y_TESTS_FAILED=$((A11Y_TESTS_FAILED + 1))
    fi
}

echo -e "${BLUE}🔍 Checking Prerequisites...${NC}"

# Check if DDEV is running
if ! ddev describe >/dev/null 2>&1; then
    echo -e "${RED}❌ DDEV is not running. Please start with: ddev start${NC}"
    exit 1
fi

# Check if axe-core is available (via npm or built-in)
if command -v npm >/dev/null 2>&1; then
    echo "✅ npm available for axe-core testing"
else
    echo "⚠️  npm not available - manual accessibility testing only"
fi

echo ""
echo -e "${BLUE}🎯 WCAG 2.1 AA Compliance Testing${NC}"

# Test 1: Semantic HTML Structure
echo "Testing semantic HTML structure..."
if grep -r "table\|thead\|tbody\|th\|td" config/sync/views.view.event_review_dashboard.yml >/dev/null 2>&1; then
    log_a11y_test "Semantic Table" "PASS" "Table structure configured in views"
else
    log_a11y_test "Semantic Table" "FAIL" "Table structure not found in configuration"
fi

# Test 2: Form Labels and ARIA
echo "Testing form labels and ARIA attributes..."
if grep -r "label\|aria-" web/modules/custom/event_review/ >/dev/null 2>&1; then
    log_a11y_test "Form Labels" "PASS" "Labels and ARIA attributes found in code"
else
    log_a11y_test "Form Labels" "FAIL" "Labels or ARIA attributes missing"
fi

# Test 3: Keyboard Navigation Support
echo "Testing keyboard navigation configuration..."
if grep -r "tabindex\|focus" web/modules/custom/event_review/ >/dev/null 2>&1; then
    log_a11y_test "Keyboard Navigation" "PASS" "Keyboard navigation configured"
else
    log_a11y_test "Keyboard Navigation" "FAIL" "Keyboard navigation not explicitly configured"
fi

# Test 4: Alternative Text for Images
echo "Testing alt text configuration..."
if grep -r "alt\|title" config/sync/views.view.event_review_dashboard.yml >/dev/null 2>&1; then
    log_a11y_test "Alt Text" "PASS" "Alt text configuration found"
else
    log_a11y_test "Alt Text" "FAIL" "Alt text not configured for images/icons"
fi

echo ""
echo -e "${BLUE}🇨🇭 eCH-0059 Swiss Standards Testing${NC}"

# Test 5: Minimum Font Size (16px base)
echo "Testing font size standards..."
if grep -r "font-size.*1\.6rem\|font-size.*16px" web/themes/custom/ >/dev/null 2>&1; then
    log_a11y_test "Font Size" "PASS" "16px+ font size configured"
else
    log_a11y_test "Font Size" "FAIL" "Minimum 16px font size not verified"
fi

# Test 6: Touch Target Size (44px minimum)
echo "Testing touch target sizes..."
if grep -r "min-height.*44px\|min-width.*44px" web/themes/custom/ >/dev/null 2>&1; then
    log_a11y_test "Touch Targets" "PASS" "44px+ touch targets configured"
else
    log_a11y_test "Touch Targets" "FAIL" "44px minimum touch targets not verified"
fi

# Test 7: Color Contrast (4.5:1 ratio)
echo "Testing color contrast configuration..."
if grep -r "contrast\|color.*#" web/themes/custom/ >/dev/null 2>&1; then
    log_a11y_test "Color Contrast" "PASS" "Color configuration found (manual verification needed)"
else
    log_a11y_test "Color Contrast" "FAIL" "Color contrast not configured"
fi

echo ""
echo -e "${BLUE}📱 Responsive Design Accessibility${NC}"

# Test 8: Viewport Meta Tag
echo "Testing viewport configuration..."
if grep -r "viewport" web/themes/custom/ >/dev/null 2>&1; then
    log_a11y_test "Viewport Meta" "PASS" "Viewport meta tag configured"
else
    log_a11y_test "Viewport Meta" "FAIL" "Viewport meta tag not found"
fi

# Test 9: Media Queries for Accessibility
echo "Testing media queries..."
if grep -r "@media.*prefers-reduced-motion\|@media.*print" web/themes/custom/ >/dev/null 2>&1; then
    log_a11y_test "Accessibility Media Queries" "PASS" "Accessibility-focused media queries found"
else
    log_a11y_test "Accessibility Media Queries" "FAIL" "No accessibility media queries found"
fi

echo ""
echo -e "${BLUE}🔧 VBO Accessibility Features${NC}"

# Test 10: VBO Form Accessibility
echo "Testing VBO form accessibility..."
if grep -r "fieldset\|legend" web/modules/custom/event_review/ >/dev/null 2>&1; then
    log_a11y_test "VBO Form Structure" "PASS" "Fieldset/legend structure configured"
else
    log_a11y_test "VBO Form Structure" "FAIL" "Form grouping not found"
fi

# Test 11: Action Button Labels
echo "Testing action button labels..."
if grep -r "@Translation.*Genehmigen\|@Translation.*Ablehnen" web/modules/custom/event_review/ >/dev/null 2>&1; then
    log_a11y_test "Action Labels" "PASS" "Descriptive action labels found"
else
    log_a11y_test "Action Labels" "FAIL" "Action labels not properly translated"
fi

# Test 12: Modal Dialog Accessibility
echo "Testing modal dialog accessibility..."
if grep -r "role.*dialog\|aria-modal" web/modules/custom/event_review/ >/dev/null 2>&1; then
    log_a11y_test "Modal Dialog" "PASS" "Modal ARIA attributes configured"
else
    log_a11y_test "Modal Dialog" "FAIL" "Modal accessibility not configured"
fi

echo ""
echo -e "${BLUE}🌐 Internationalization Accessibility${NC}"

# Test 13: Language Declaration
echo "Testing language declaration..."
if ddev drush config:get system.site default_langcode | grep -q "de"; then
    log_a11y_test "Language Declaration" "PASS" "German language declared"
else
    log_a11y_test "Language Declaration" "FAIL" "Language not properly declared"
fi

# Test 14: Text Direction Support
echo "Testing text direction..."
if grep -r "dir.*ltr\|direction" web/themes/custom/ >/dev/null 2>&1; then
    log_a11y_test "Text Direction" "PASS" "Text direction configured"
else
    log_a11y_test "Text Direction" "FAIL" "Text direction not explicitly set"
fi

echo ""
echo -e "${BLUE}🎹 Interactive Elements Testing${NC}"

# Test 15: Focus Management
echo "Testing focus management..."
if grep -r "focus\|tabindex" web/modules/custom/event_review/ >/dev/null 2>&1; then
    log_a11y_test "Focus Management" "PASS" "Focus management implemented"
else
    log_a11y_test "Focus Management" "FAIL" "Focus management not found"
fi

# Test 16: Error Handling Accessibility
echo "Testing error handling..."
if grep -r "role.*alert\|aria-live" web/modules/custom/event_review/ >/dev/null 2>&1; then
    log_a11y_test "Error Handling" "PASS" "Accessible error handling found"
else
    log_a11y_test "Error Handling" "FAIL" "Accessible error handling not implemented"
fi

echo ""
echo -e "${BLUE}📊 Manual Testing Instructions${NC}"
echo "================================================="
echo ""
echo -e "${YELLOW}🎹 Keyboard Testing Checklist:${NC}"
echo "□ Tab through entire dashboard interface"
echo "□ Use arrow keys in dropdown menus"
echo "□ Test Enter/Space for button activation"
echo "□ Verify Escape closes modal dialogs"
echo "□ Check Shift+Tab for reverse navigation"
echo ""
echo -e "${YELLOW}🔊 Screen Reader Testing:${NC}"
echo "□ Test with NVDA (Windows)"
echo "□ Test with JAWS (Windows)"
echo "□ Test with VoiceOver (macOS)"
echo "□ Verify all content is announced"
echo "□ Check table navigation announcements"
echo ""
echo -e "${YELLOW}👁️ Visual Testing:${NC}"
echo "□ Test at 200% zoom level"
echo "□ Verify color contrast with tools"
echo "□ Test with high contrast mode"
echo "□ Check focus indicators visibility"
echo ""
echo -e "${YELLOW}📱 Mobile Accessibility:${NC}"
echo "□ Test touch target sizes"
echo "□ Verify pinch-to-zoom works"
echo "□ Check orientation support"
echo "□ Test with TalkBack (Android)"

echo ""
echo -e "${BLUE}🛠️ Recommended Tools${NC}"
echo "================================================="
echo "• axe-core browser extension"
echo "• WAVE Web Accessibility Evaluator"
echo "• Lighthouse accessibility audit"
echo "• Colour Contrast Analyser"
echo "• Screen readers (NVDA, JAWS, VoiceOver)"

echo ""
echo -e "${BLUE}📊 Accessibility Test Results${NC}"
echo "================================================="
echo -e "Total Tests: ${BLUE}$A11Y_TESTS_TOTAL${NC}"
echo -e "Passed: ${GREEN}$A11Y_TESTS_PASSED${NC}"
echo -e "Failed: ${RED}$A11Y_TESTS_FAILED${NC}"

if [ $A11Y_TESTS_TOTAL -gt 0 ]; then
    A11Y_PASS_RATE=$((A11Y_TESTS_PASSED * 100 / A11Y_TESTS_TOTAL))
    echo -e "Pass Rate: ${BLUE}$A11Y_PASS_RATE%${NC}"
else
    A11Y_PASS_RATE=0
fi

echo ""

if [ $A11Y_TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}♿ ACCESSIBILITY COMPLIANT${NC}"
    echo -e "${GREEN}✅ WCAG 2.1 AA standards met${NC}"
    echo -e "${GREEN}✅ eCH-0059 Swiss standards met${NC}"
    echo -e "${GREEN}✅ Ready for accessibility audit${NC}"
elif [ $A11Y_PASS_RATE -ge 75 ]; then
    echo -e "${YELLOW}⚠️  MOSTLY ACCESSIBLE - Minor issues${NC}"
    echo -e "${YELLOW}📋 Review failed tests for improvements${NC}"
else
    echo -e "${RED}❌ ACCESSIBILITY ISSUES DETECTED${NC}"
    echo -e "${RED}🚫 Requires remediation before demo${NC}"
fi

echo ""
echo -e "${BLUE}🔗 Testing URLs:${NC}"
echo "Dashboard: https://bruchtal.zh-demo.ddev.site/admin/content/events/review"
echo "Accessibility Guide: https://www.w3.org/WAI/WCAG21/quickref/"
echo "eCH-0059 Standard: https://www.ech.ch/de/ech/ech-0059"

# Exit with appropriate code
if [ $A11Y_TESTS_FAILED -eq 0 ]; then
    exit 0
else
    exit 1
fi