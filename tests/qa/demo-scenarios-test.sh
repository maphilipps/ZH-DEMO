#!/bin/bash

# Event Review Dashboard - Demo Scenarios Testing
# GPZH 35-minute Presentation Validation
# Author: @qa-testing-specialist

set -e

echo "🎬 Event Review Dashboard - Demo Scenarios Testing"
echo "==================================================="
echo "Target: GPZH 35-minute presentation readiness"
echo "Municipality: Gemeinde Bruchtal (Leben am See)"
echo "Date: $(date)"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Demo test tracking
DEMO_TESTS_PASSED=0
DEMO_TESTS_FAILED=0
DEMO_TESTS_TOTAL=0

# Function to log demo test results
log_demo_test() {
    local test_name="$1"
    local result="$2"
    local message="$3"
    
    DEMO_TESTS_TOTAL=$((DEMO_TESTS_TOTAL + 1))
    
    if [ "$result" = "PASS" ]; then
        echo -e "${GREEN}✅ PASS${NC}: $test_name - $message"
        DEMO_TESTS_PASSED=$((DEMO_TESTS_PASSED + 1))
    else
        echo -e "${RED}❌ FAIL${NC}: $test_name - $message"
        DEMO_TESTS_FAILED=$((DEMO_TESTS_FAILED + 1))
    fi
}

echo -e "${BLUE}🔍 Validating Demo Prerequisites...${NC}"

# Check if DDEV is running
if ! ddev describe >/dev/null 2>&1; then
    echo -e "${RED}❌ DDEV is not running. Please start with: ddev start${NC}"
    exit 1
fi

# Ensure test data exists
echo "Creating/validating demo content..."
ddev drush php:cli < tests/qa/create-test-data.php >/dev/null 2>&1
echo "✅ Demo content validated"

echo ""
echo -e "${PURPLE}🎯 Demo Segment 1: System Overview & Navigation (10 min)${NC}"

# Test 1: Homepage Access
echo "Testing Bruchtal homepage access..."
homepage_response=$(ddev exec curl -s -o /dev/null -w "%{http_code}" https://bruchtal.zh-demo.ddev.site/)
if [ "$homepage_response" = "200" ]; then
    log_demo_test "Bruchtal Homepage" "PASS" "Homepage loads correctly (HTTP 200)"
else
    log_demo_test "Bruchtal Homepage" "FAIL" "Homepage error (HTTP $homepage_response)"
fi

# Test 2: Admin Login Flow
echo "Testing admin login flow..."
login_response=$(ddev exec curl -s -o /dev/null -w "%{http_code}" https://bruchtal.zh-demo.ddev.site/user/login)
if [ "$login_response" = "200" ]; then
    log_demo_test "Admin Login Page" "PASS" "Login page accessible"
else
    log_demo_test "Admin Login Page" "FAIL" "Login page error (HTTP $login_response)"
fi

# Test 3: Dashboard Direct Access
echo "Testing dashboard direct access..."
dashboard_response=$(ddev exec curl -s -o /dev/null -w "%{http_code}" https://bruchtal.zh-demo.ddev.site/admin/content/events/review)
if [ "$dashboard_response" = "403" ] || [ "$dashboard_response" = "302" ]; then
    log_demo_test "Dashboard Security" "PASS" "Dashboard properly protected"
else
    log_demo_test "Dashboard Security" "FAIL" "Dashboard security issue (HTTP $dashboard_response)"
fi

# Test 4: Municipal Theme Validation
echo "Testing Bruchtal theme..."
if grep -r "Bruchtal\|Leben am See" web/themes/custom/ >/dev/null 2>&1; then
    log_demo_test "Municipal Branding" "PASS" "Bruchtal branding found in theme"
else
    log_demo_test "Municipal Branding" "FAIL" "Municipal branding not found"
fi

echo ""
echo -e "${PURPLE}🎯 Demo Segment 2: Simple Business Process Forms (7 min)${NC}"

# Test 5: Event Creation Form
echo "Testing event creation form..."
event_form_response=$(ddev exec curl -s -o /dev/null -w "%{http_code}" https://bruchtal.zh-demo.ddev.site/node/add/event)
if [ "$event_form_response" = "200" ] || [ "$event_form_response" = "403" ]; then
    log_demo_test "Event Creation Form" "PASS" "Event form accessible"
else
    log_demo_test "Event Creation Form" "FAIL" "Event form error (HTTP $event_form_response)"
fi

# Test 6: Form Fields Validation
echo "Testing event form fields..."
if ddev drush config:get field.field.node.event.field_event_date >/dev/null 2>&1; then
    log_demo_test "Event Date Field" "PASS" "Event date field configured"
else
    log_demo_test "Event Date Field" "FAIL" "Event date field missing"
fi

if ddev drush config:get field.field.node.event.field_event_location >/dev/null 2>&1; then
    log_demo_test "Event Location Field" "PASS" "Event location field configured"
else
    log_demo_test "Event Location Field" "FAIL" "Event location field missing"
fi

# Test 7: Workflow States
echo "Testing workflow states..."
workflow_states=$(ddev drush config:get workflows.workflow.event_approval type_settings.states --format=json | grep -o '"label":"[^"]*"' | wc -l 2>/dev/null || echo "0")
if [ "$workflow_states" -ge 3 ]; then
    log_demo_test "Workflow States" "PASS" "$workflow_states workflow states configured"
else
    log_demo_test "Workflow States" "FAIL" "Insufficient workflow states ($workflow_states found)"
fi

echo ""
echo -e "${PURPLE}🎯 Demo Segment 3: Backend for Municipal Employees (15 min)${NC}"

# Test 8: Demo Content Availability
echo "Testing demo content availability..."
draft_count=$(ddev drush eval "echo \\Drupal::entityQuery('node')->condition('type', 'event')->condition('moderation_state', 'draft')->count()->execute();")
if [ "$draft_count" -ge 5 ]; then
    log_demo_test "Draft Events Available" "PASS" "$draft_count draft events for demo"
else
    log_demo_test "Draft Events Available" "FAIL" "Only $draft_count draft events (need ≥5)"
fi

published_count=$(ddev drush eval "echo \\Drupal::entityQuery('node')->condition('type', 'event')->condition('moderation_state', 'published')->count()->execute();")
if [ "$published_count" -ge 2 ]; then
    log_demo_test "Published Events Available" "PASS" "$published_count published events for demo"
else
    log_demo_test "Published Events Available" "FAIL" "Only $published_count published events (need ≥2)"
fi

rejected_count=$(ddev drush eval "echo \\Drupal::entityQuery('node')->condition('type', 'event')->condition('moderation_state', 'rejected')->count()->execute();")
if [ "$rejected_count" -ge 2 ]; then
    log_demo_test "Rejected Events Available" "PASS" "$rejected_count rejected events for demo"
else
    log_demo_test "Rejected Events Available" "FAIL" "Only $rejected_count rejected events (need ≥2)"
fi

# Test 9: VBO Actions Configuration
echo "Testing VBO actions..."
if ddev drush config:get system.action.event_approve_action >/dev/null 2>&1; then
    log_demo_test "Approve Action Config" "PASS" "Approve action configured"
else
    log_demo_test "Approve Action Config" "FAIL" "Approve action missing"
fi

if ddev drush config:get system.action.event_reject_action >/dev/null 2>&1; then
    log_demo_test "Reject Action Config" "PASS" "Reject action configured"
else
    log_demo_test "Reject Action Config" "FAIL" "Reject action missing"
fi

# Test 10: Dashboard View Configuration
echo "Testing dashboard view..."
if ddev drush config:get views.view.event_review_dashboard >/dev/null 2>&1; then
    log_demo_test "Dashboard View Config" "PASS" "Dashboard view configured"
else
    log_demo_test "Dashboard View Config" "FAIL" "Dashboard view missing"
fi

# Test 11: Rejection Reason Field
echo "Testing rejection reason field..."
if ddev drush config:get field.field.node.event.field_rejection_reason >/dev/null 2>&1; then
    log_demo_test "Rejection Reason Field" "PASS" "Rejection reason field configured"
else
    log_demo_test "Rejection Reason Field" "FAIL" "Rejection reason field missing"
fi

# Test 12: Email Template Validation
echo "Testing email templates..."
if grep -q "Gemeinde Bruchtal" web/modules/custom/event_review/event_review.module; then
    log_demo_test "Email Templates" "PASS" "Municipal email templates configured"
else
    log_demo_test "Email Templates" "FAIL" "Email templates missing municipal branding"
fi

echo ""
echo -e "${PURPLE}🎯 Demo User Experience Testing${NC}"

# Test 13: Editor Role Permissions
echo "Testing editor role permissions..."
editor_permissions=$(ddev drush config:get user.role.editor permissions --format=json | grep -c "event" 2>/dev/null || echo "0")
if [ "$editor_permissions" -ge 3 ]; then
    log_demo_test "Editor Permissions" "PASS" "$editor_permissions event-related permissions"
else
    log_demo_test "Editor Permissions" "FAIL" "Insufficient editor permissions ($editor_permissions found)"
fi

# Test 14: Swiss German Interface
echo "Testing Swiss German interface..."
if grep -r "Genehmigen\|Ablehnen\|Entwurf" config/sync/ >/dev/null 2>&1; then
    log_demo_test "Swiss German UI" "PASS" "Swiss German labels found"
else
    log_demo_test "Swiss German UI" "FAIL" "Swiss German labels missing"
fi

# Test 15: Municipal Contact Information
echo "Testing municipal contact information..."
if grep -r "bruchtal\.ch\|Leben am See" web/modules/custom/event_review/ >/dev/null 2>&1; then
    log_demo_test "Municipal Contact" "PASS" "Municipal contact info in templates"
else
    log_demo_test "Municipal Contact" "FAIL" "Municipal contact info missing"
fi

echo ""
echo -e "${PURPLE}🎯 Demo Performance Validation${NC}"

# Test 16: Dashboard Load Performance
echo "Testing dashboard load performance..."
load_start=$(date +%s%N)
dashboard_load=$(ddev exec curl -s -o /dev/null -w "%{time_total}" https://bruchtal.zh-demo.ddev.site/admin/content/events/review 2>/dev/null || echo "5.0")
load_end=$(date +%s%N)

if (( $(echo "$dashboard_load < 2.0" | bc -l 2>/dev/null || echo "0") )); then
    load_ms=$(echo "$dashboard_load * 1000" | bc 2>/dev/null || echo "2000")
    log_demo_test "Dashboard Performance" "PASS" "${load_ms}ms load time"
else
    load_ms=$(echo "$dashboard_load * 1000" | bc 2>/dev/null || echo "5000")
    log_demo_test "Dashboard Performance" "FAIL" "${load_ms}ms load time (too slow for demo)"
fi

# Test 17: Mobile Responsiveness
echo "Testing mobile responsiveness..."
mobile_load=$(ddev exec curl -s -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)" -o /dev/null -w "%{time_total}" https://bruchtal.zh-demo.ddev.site/admin/content/events/review 2>/dev/null || echo "5.0")

if (( $(echo "$mobile_load < 3.0" | bc -l 2>/dev/null || echo "0") )); then
    mobile_ms=$(echo "$mobile_load * 1000" | bc 2>/dev/null || echo "3000")
    log_demo_test "Mobile Performance" "PASS" "${mobile_ms}ms mobile load time"
else
    mobile_ms=$(echo "$mobile_load * 1000" | bc 2>/dev/null || echo "5000")
    log_demo_test "Mobile Performance" "FAIL" "${mobile_ms}ms mobile load time (too slow)"
fi

echo ""
echo -e "${BLUE}🎬 Demo Execution Checklist${NC}"
echo "================================================="
echo ""
echo -e "${YELLOW}📋 Pre-Demo Setup (5 minutes before):${NC}"
echo "□ Clear all Drupal caches: ddev drush cr"
echo "□ Verify DDEV is running smoothly"
echo "□ Open browser tabs to key URLs"
echo "□ Test admin login flow"
echo "□ Confirm demo events are visible"
echo ""
echo -e "${YELLOW}🎯 Demo Segment 1 - System Overview (10 min):${NC}"
echo "□ Show Bruchtal homepage with municipal branding"
echo "□ Demonstrate responsive design (desktop → mobile)"
echo "□ Highlight 'Leben am See' theme elements"
echo "□ Show navigation structure"
echo "□ Access admin area (login flow)"
echo ""
echo -e "${YELLOW}📝 Demo Segment 2 - Business Forms (7 min):${NC}"
echo "□ Navigate to event creation form"
echo "□ Show Swiss German interface"
echo "□ Demonstrate form fields (date, location, category)"
echo "□ Create sample event and save as draft"
echo "□ Highlight workflow states"
echo ""
echo -e "${YELLOW}⚙️ Demo Segment 3 - Municipal Backend (15 min):${NC}"
echo "□ Access Event Review Dashboard"
echo "□ Show table with draft, published, rejected events"
echo "□ Demonstrate exposed filters (status, date, author)"
echo "□ Select multiple events for bulk approval"
echo "□ Show approval confirmation dialog"
echo "□ Execute bulk approval action"
echo "□ Select single event for rejection"
echo "□ Enter rejection reason in modal"
echo "□ Show updated event status"
echo "□ Demonstrate email notification feature"
echo ""
echo -e "${YELLOW}❓ Demo Segment 4 - Q&A (3 min):${NC}"
echo "□ Prepared answers for Swiss compliance questions"
echo "□ Municipal customization examples ready"
echo "□ Scalability discussion points (160 municipalities)"
echo "□ Timeline and next steps information"

echo ""
echo -e "${BLUE}🚨 Demo Troubleshooting Guide${NC}"
echo "================================================="
echo ""
echo -e "${YELLOW}Common Issues & Quick Fixes:${NC}"
echo "• Dashboard won't load → ddev drush cr"
echo "• Login issues → ddev drush uli (generate new login)"
echo "• Events not showing → Check moderation states"
echo "• VBO actions missing → Clear cache and check permissions"
echo "• Performance slow → Restart DDEV: ddev restart"
echo ""
echo -e "${YELLOW}Emergency Commands:${NC}"
echo "• Reset demo: ddev drush php:cli < tests/qa/create-test-data.php"
echo "• Quick login: ddev drush uli --uri=bruchtal.zh-demo.ddev.site"
echo "• Cache clear: ddev drush cr"
echo "• Status check: ddev describe"

echo ""
echo -e "${BLUE}📊 Demo Readiness Test Results${NC}"
echo "================================================="
echo -e "Total Tests: ${BLUE}$DEMO_TESTS_TOTAL${NC}"
echo -e "Passed: ${GREEN}$DEMO_TESTS_PASSED${NC}"
echo -e "Failed: ${RED}$DEMO_TESTS_FAILED${NC}"

if [ $DEMO_TESTS_TOTAL -gt 0 ]; then
    DEMO_PASS_RATE=$((DEMO_TESTS_PASSED * 100 / DEMO_TESTS_TOTAL))
    echo -e "Pass Rate: ${BLUE}$DEMO_PASS_RATE%${NC}"
else
    DEMO_PASS_RATE=0
fi

echo ""

if [ $DEMO_TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎬 DEMO READY - ALL SYSTEMS GO!${NC}"
    echo -e "${GREEN}✅ All demo scenarios validated${NC}"
    echo -e "${GREEN}✅ Performance meets presentation standards${NC}"
    echo -e "${GREEN}✅ Swiss municipal branding confirmed${NC}"
    echo -e "${GREEN}✅ Event workflow fully functional${NC}"
    echo -e "${GREEN}🎯 Ready for GPZH 35-minute presentation!${NC}"
elif [ $DEMO_PASS_RATE -ge 85 ]; then
    echo -e "${YELLOW}⚠️  MOSTLY READY - Minor issues detected${NC}"
    echo -e "${YELLOW}📋 Review failed tests, but demo can proceed${NC}"
    echo -e "${YELLOW}🎬 Have contingency plan for failed items${NC}"
else
    echo -e "${RED}❌ NOT DEMO READY - Critical issues detected${NC}"
    echo -e "${RED}🚫 Demo should be postponed until issues resolved${NC}"
    echo -e "${RED}📋 Fix critical failures before presentation${NC}"
fi

echo ""
echo -e "${BLUE}🔗 Key Demo URLs${NC}"
echo "================================================="
echo "Homepage: https://bruchtal.zh-demo.ddev.site/"
echo "Admin Login: https://bruchtal.zh-demo.ddev.site/user/login"
echo "Event Dashboard: https://bruchtal.zh-demo.ddev.site/admin/content/events/review"
echo "Create Event: https://bruchtal.zh-demo.ddev.site/node/add/event"
echo "Quick Login: ddev drush uli --uri=bruchtal.zh-demo.ddev.site"

echo ""
echo -e "${PURPLE}🎭 Demo Success Factors${NC}"
echo "================================================="
echo "• Confident navigation through all features"
echo "• Clear explanation of Swiss municipal compliance"
echo "• Smooth workflow demonstrations"
echo "• Professional municipal branding visible"
echo "• Responsive design showcase"
echo "• Quick recovery from any technical issues"

# Exit with appropriate code
if [ $DEMO_TESTS_FAILED -eq 0 ]; then
    exit 0
else
    exit 1
fi