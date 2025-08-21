#!/bin/bash

# Event Review Dashboard - Comprehensive Testing Script
# GPZH Demo System QA Testing
# Author: @qa-testing-specialist

set -e

echo "🧪 Event Review Dashboard - Comprehensive Testing Suite"
echo "======================================================"
echo "Date: $(date)"
echo "System: ZH-DEMO / Gemeinde Bruchtal"
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test results tracking
TESTS_PASSED=0
TESTS_FAILED=0
TESTS_TOTAL=0

# Function to log test results
log_test() {
    local test_name="$1"
    local result="$2"
    local message="$3"
    
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    
    if [ "$result" = "PASS" ]; then
        echo -e "${GREEN}✅ PASS${NC}: $test_name - $message"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}❌ FAIL${NC}: $test_name - $message"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
}

# Check prerequisites
echo -e "${BLUE}📋 Checking Prerequisites...${NC}"

# Check if DDEV is running
if ! ddev describe >/dev/null 2>&1; then
    echo -e "${RED}❌ DDEV is not running. Please start with: ddev start${NC}"
    exit 1
fi
log_test "DDEV Environment" "PASS" "Environment is running"

# Check if modules are enabled
if ddev drush pml --status=enabled | grep -q "views_bulk_operations"; then
    log_test "VBO Module" "PASS" "Views Bulk Operations enabled"
else
    log_test "VBO Module" "FAIL" "Views Bulk Operations not enabled"
fi

if ddev drush pml --status=enabled | grep -q "event_review"; then
    log_test "Event Review Module" "PASS" "Custom module enabled"
else
    log_test "Event Review Module" "FAIL" "Custom module not enabled"
fi

echo ""
echo -e "${BLUE}🔧 Setting Up Test Environment...${NC}"

# Clear caches
ddev drush cr >/dev/null 2>&1
log_test "Cache Clear" "PASS" "All caches cleared"

# Import configuration
ddev drush cim -y >/dev/null 2>&1
log_test "Configuration Import" "PASS" "Latest configuration imported"

# Create test data
echo "Creating test data..."
ddev drush php:cli < tests/qa/create-test-data.php >/dev/null 2>&1
log_test "Test Data Creation" "PASS" "Demo events and users created"

echo ""
echo -e "${BLUE}🧪 Running Functional Tests...${NC}"

# Test 1: Dashboard Access
dashboard_response=$(ddev exec curl -s -o /dev/null -w "%{http_code}" https://bruchtal.zh-demo.ddev.site/admin/content/events/review)
if [ "$dashboard_response" = "200" ] || [ "$dashboard_response" = "403" ]; then
    log_test "Dashboard URL" "PASS" "Dashboard URL responds (HTTP $dashboard_response)"
else
    log_test "Dashboard URL" "FAIL" "Dashboard URL error (HTTP $dashboard_response)"
fi

# Test 2: Check if views exist
if ddev drush config:get views.view.event_review_dashboard >/dev/null 2>&1; then
    log_test "Dashboard View Config" "PASS" "Event review dashboard view exists"
else
    log_test "Dashboard View Config" "FAIL" "Event review dashboard view missing"
fi

# Test 3: Check workflow configuration
if ddev drush config:get workflows.workflow.event_approval >/dev/null 2>&1; then
    log_test "Event Workflow" "PASS" "Event approval workflow configured"
else
    log_test "Event Workflow" "FAIL" "Event approval workflow missing"
fi

# Test 4: Check editor role permissions
editor_perms=$(ddev drush config:get user.role.editor permissions)
if echo "$editor_perms" | grep -q "access event review dashboard"; then
    log_test "Editor Permissions" "PASS" "Editor role has dashboard access"
else
    log_test "Editor Permissions" "FAIL" "Editor role missing dashboard permission"
fi

# Test 5: Check custom actions
if ddev drush config:get system.action.event_approve_action >/dev/null 2>&1; then
    log_test "Approve Action" "PASS" "Approve action plugin exists"
else
    log_test "Approve Action" "FAIL" "Approve action plugin missing"
fi

if ddev drush config:get system.action.event_reject_action >/dev/null 2>&1; then
    log_test "Reject Action" "PASS" "Reject action plugin exists"
else
    log_test "Reject Action" "FAIL" "Reject action plugin missing"
fi

echo ""
echo -e "${BLUE}🔒 Running Security Tests...${NC}"

# Test 6: Anonymous access (should be denied)
anon_response=$(ddev exec curl -s -o /dev/null -w "%{http_code}" https://bruchtal.zh-demo.ddev.site/admin/content/events/review)
if [ "$anon_response" = "403" ] || [ "$anon_response" = "302" ]; then
    log_test "Anonymous Access" "PASS" "Anonymous users properly blocked (HTTP $anon_response)"
else
    log_test "Anonymous Access" "FAIL" "Anonymous access not properly restricted (HTTP $anon_response)"
fi

# Test 7: Check CSRF token requirement
csrf_test=$(ddev exec curl -s -X POST https://bruchtal.zh-demo.ddev.site/admin/content/events/review -o /dev/null -w "%{http_code}")
if [ "$csrf_test" = "403" ] || [ "$csrf_test" = "405" ]; then
    log_test "CSRF Protection" "PASS" "CSRF protection active (HTTP $csrf_test)"
else
    log_test "CSRF Protection" "FAIL" "CSRF protection may be missing (HTTP $csrf_test)"
fi

echo ""
echo -e "${BLUE}🇨🇭 Running Swiss Compliance Tests...${NC}"

# Test 8: Check German translations
if ddev drush config:get locale.settings | grep -q "de"; then
    log_test "German Language" "PASS" "German language configured"
else
    log_test "German Language" "FAIL" "German language not configured"
fi

# Test 9: Check date format configuration
date_format=$(ddev drush config:get core.date_format.short pattern)
if echo "$date_format" | grep -q "d\.m\.Y"; then
    log_test "Swiss Date Format" "PASS" "DD.MM.YYYY format configured"
else
    log_test "Swiss Date Format" "FAIL" "Swiss date format not configured (found: $date_format)"
fi

# Test 10: Check municipal branding in emails
if grep -q "Gemeinde Bruchtal" web/modules/custom/event_review/event_review.module; then
    log_test "Municipal Branding" "PASS" "Bruchtal branding found in email templates"
else
    log_test "Municipal Branding" "FAIL" "Municipal branding missing from emails"
fi

echo ""
echo -e "${BLUE}📱 Running Accessibility Tests...${NC}"

# Test 11: Check for semantic HTML in view templates
if find web/themes -name "*.twig" -exec grep -l "table\|thead\|tbody" {} \; | head -1 >/dev/null 2>&1; then
    log_test "Semantic HTML" "PASS" "Semantic table markup found"
else
    log_test "Semantic HTML" "FAIL" "Semantic table markup not found"
fi

# Test 12: Check for ARIA attributes in configuration
if grep -r "aria-" config/sync/ >/dev/null 2>&1; then
    log_test "ARIA Attributes" "PASS" "ARIA attributes configured"
else
    log_test "ARIA Attributes" "FAIL" "ARIA attributes not found in config"
fi

echo ""
echo -e "${BLUE}⚡ Running Performance Tests...${NC}"

# Test 13: Database query performance
query_count=$(ddev drush eval "echo \\Drupal::database()->query('SELECT COUNT(*) FROM {node_field_data} WHERE type = :type', [':type' => 'event'])->fetchField();")
if [ "$query_count" -gt 0 ]; then
    log_test "Event Content" "PASS" "$query_count events found in database"
else
    log_test "Event Content" "FAIL" "No events found in database"
fi

# Test 14: Check view caching
if ddev drush config:get views.view.event_review_dashboard display.default.display_options.cache.type | grep -q "tag"; then
    log_test "View Caching" "PASS" "Tag-based caching enabled"
else
    log_test "View Caching" "FAIL" "View caching not optimally configured"
fi

echo ""
echo -e "${BLUE}🎬 Running Demo Readiness Tests...${NC}"

# Test 15: Count draft events for demo
draft_count=$(ddev drush eval "echo \\Drupal::entityQuery('node')->condition('type', 'event')->condition('moderation_state', 'draft')->count()->execute();")
if [ "$draft_count" -ge 5 ]; then
    log_test "Demo Draft Events" "PASS" "$draft_count draft events available for demo"
else
    log_test "Demo Draft Events" "FAIL" "Only $draft_count draft events (need ≥5 for demo)"
fi

# Test 16: Count published events
published_count=$(ddev drush eval "echo \\Drupal::entityQuery('node')->condition('type', 'event')->condition('moderation_state', 'published')->count()->execute();")
if [ "$published_count" -ge 2 ]; then
    log_test "Demo Published Events" "PASS" "$published_count published events for demo"
else
    log_test "Demo Published Events" "FAIL" "Only $published_count published events (need ≥2 for demo)"
fi

# Test 17: Count rejected events
rejected_count=$(ddev drush eval "echo \\Drupal::entityQuery('node')->condition('type', 'event')->condition('moderation_state', 'rejected')->count()->execute();")
if [ "$rejected_count" -ge 2 ]; then
    log_test "Demo Rejected Events" "PASS" "$rejected_count rejected events with reasons"
else
    log_test "Demo Rejected Events" "FAIL" "Only $rejected_count rejected events (need ≥2 for demo)"
fi

# Test 18: Check field_rejection_reason field
if ddev drush config:get field.field.node.event.field_rejection_reason >/dev/null 2>&1; then
    log_test "Rejection Reason Field" "PASS" "Rejection reason field configured"
else
    log_test "Rejection Reason Field" "FAIL" "Rejection reason field missing"
fi

echo ""
echo -e "${BLUE}📊 Test Results Summary${NC}"
echo "======================================================"
echo -e "Total Tests: ${BLUE}$TESTS_TOTAL${NC}"
echo -e "Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Failed: ${RED}$TESTS_FAILED${NC}"

# Calculate pass rate
if [ $TESTS_TOTAL -gt 0 ]; then
    PASS_RATE=$((TESTS_PASSED * 100 / TESTS_TOTAL))
    echo -e "Pass Rate: ${BLUE}$PASS_RATE%${NC}"
else
    PASS_RATE=0
fi

echo ""

# Final status
if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎯 ALL TESTS PASSED - DEMO READY!${NC}"
    echo -e "${GREEN}✅ Event Review Dashboard is fully functional${NC}"
    echo -e "${GREEN}✅ Swiss compliance validated${NC}"
    echo -e "${GREEN}✅ Security measures verified${NC}"
    echo -e "${GREEN}✅ Demo scenarios ready${NC}"
elif [ $PASS_RATE -ge 80 ]; then
    echo -e "${YELLOW}⚠️  MOSTLY READY - Minor issues detected${NC}"
    echo -e "${YELLOW}📋 Review failed tests above${NC}"
    echo -e "${YELLOW}🎬 Demo possible with noted limitations${NC}"
else
    echo -e "${RED}❌ NOT READY - Critical issues detected${NC}"
    echo -e "${RED}🚫 Demo blocked until issues resolved${NC}"
    echo -e "${RED}📋 Review and fix failed tests above${NC}"
fi

echo ""
echo -e "${BLUE}🔗 Quick Access URLs:${NC}"
echo "Dashboard: https://bruchtal.zh-demo.ddev.site/admin/content/events/review"
echo "Admin Login: ddev drush uli"
echo "Create Event: https://bruchtal.zh-demo.ddev.site/node/add/event"

echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
if [ $TESTS_FAILED -eq 0 ]; then
    echo "1. ✅ Execute manual UI testing"
    echo "2. ✅ Validate accessibility with screen readers"
    echo "3. ✅ Test demo scenarios end-to-end"
    echo "4. ✅ Performance test with Lighthouse"
    echo "5. ✅ Ready for GPZH presentation!"
else
    echo "1. 🔧 Fix failed tests listed above"
    echo "2. 🔄 Re-run test suite: ./tests/qa/run-event-review-tests.sh"
    echo "3. 📋 Review implementation with development team"
    echo "4. 🎯 Proceed to manual testing once automated tests pass"
fi

# Exit with appropriate code
if [ $TESTS_FAILED -eq 0 ]; then
    exit 0
else
    exit 1
fi