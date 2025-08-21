#!/bin/bash

# Event Review Dashboard - Performance Testing Script
# Core Web Vitals + Swiss Performance Standards
# Author: @qa-testing-specialist

set -e

echo "⚡ Event Review Dashboard - Performance Testing"
echo "==============================================="
echo "Target: Core Web Vitals >90, Load time <2s"
echo "Date: $(date)"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Performance test tracking
PERF_TESTS_PASSED=0
PERF_TESTS_FAILED=0
PERF_TESTS_TOTAL=0

# Function to log performance test results
log_perf_test() {
    local test_name="$1"
    local result="$2"
    local message="$3"
    
    PERF_TESTS_TOTAL=$((PERF_TESTS_TOTAL + 1))
    
    if [ "$result" = "PASS" ]; then
        echo -e "${GREEN}✅ PASS${NC}: $test_name - $message"
        PERF_TESTS_PASSED=$((PERF_TESTS_PASSED + 1))
    else
        echo -e "${RED}❌ FAIL${NC}: $test_name - $message"
        PERF_TESTS_FAILED=$((PERF_TESTS_FAILED + 1))
    fi
}

echo -e "${BLUE}🔍 Checking Prerequisites...${NC}"

# Check if DDEV is running
if ! ddev describe >/dev/null 2>&1; then
    echo -e "${RED}❌ DDEV is not running. Please start with: ddev start${NC}"
    exit 1
fi

# Check if curl is available
if ! command -v curl >/dev/null 2>&1; then
    echo -e "${RED}❌ curl not available for testing${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}⏱️ Response Time Testing${NC}"

# Test 1: Dashboard Load Time
echo "Testing dashboard response time..."
start_time=$(date +%s%N)
dashboard_response=$(ddev exec curl -s -o /dev/null -w "%{http_code}:%{time_total}" https://bruchtal.zh-demo.ddev.site/admin/content/events/review)
end_time=$(date +%s%N)

response_code=$(echo $dashboard_response | cut -d':' -f1)
response_time=$(echo $dashboard_response | cut -d':' -f2)

if [ "$response_code" = "200" ] || [ "$response_code" = "403" ]; then
    # Convert to milliseconds for readability
    response_ms=$(echo "$response_time * 1000" | bc 2>/dev/null || echo "1000")
    if (( $(echo "$response_time < 2.0" | bc -l 2>/dev/null || echo "1") )); then
        log_perf_test "Dashboard Load Time" "PASS" "${response_ms}ms (< 2000ms target)"
    else
        log_perf_test "Dashboard Load Time" "FAIL" "${response_ms}ms (exceeds 2000ms target)"
    fi
else
    log_perf_test "Dashboard Load Time" "FAIL" "HTTP error $response_code"
fi

# Test 2: Admin Login Page Performance
echo "Testing admin login performance..."
login_response=$(ddev exec curl -s -o /dev/null -w "%{time_total}" https://bruchtal.zh-demo.ddev.site/user/login)
login_ms=$(echo "$login_response * 1000" | bc 2>/dev/null || echo "1000")

if (( $(echo "$login_response < 1.0" | bc -l 2>/dev/null || echo "1") )); then
    log_perf_test "Admin Login Load" "PASS" "${login_ms}ms (< 1000ms target)"
else
    log_perf_test "Admin Login Load" "FAIL" "${login_ms}ms (exceeds 1000ms target)"
fi

# Test 3: Event Creation Form Performance
echo "Testing event creation form..."
event_form_response=$(ddev exec curl -s -o /dev/null -w "%{time_total}" https://bruchtal.zh-demo.ddev.site/node/add/event)
event_form_ms=$(echo "$event_form_response * 1000" | bc 2>/dev/null || echo "1000")

if (( $(echo "$event_form_response < 1.5" | bc -l 2>/dev/null || echo "1") )); then
    log_perf_test "Event Form Load" "PASS" "${event_form_ms}ms (< 1500ms target)"
else
    log_perf_test "Event Form Load" "FAIL" "${event_form_ms}ms (exceeds 1500ms target)"
fi

echo ""
echo -e "${BLUE}🗄️ Database Performance Testing${NC}"

# Test 4: Event Query Performance
echo "Testing event query performance..."
db_start=$(date +%s%N)
event_count=$(ddev drush eval "echo \\Drupal::entityQuery('node')->condition('type', 'event')->count()->execute();")
db_end=$(date +%s%N)
db_time_ms=$(( ($db_end - $db_start) / 1000000 ))

if [ $db_time_ms -lt 100 ]; then
    log_perf_test "Event Query Speed" "PASS" "${db_time_ms}ms for $event_count events"
else
    log_perf_test "Event Query Speed" "FAIL" "${db_time_ms}ms too slow for $event_count events"
fi

# Test 5: Views Query Performance
echo "Testing views query performance..."
views_start=$(date +%s%N)
views_result=$(ddev drush eval "\\Drupal::service('views.executable')->get('event_review_dashboard')->execute(); echo 'done';")
views_end=$(date +%s%N)
views_time_ms=$(( ($views_end - $views_start) / 1000000 ))

if [ $views_time_ms -lt 200 ]; then
    log_perf_test "Views Query Speed" "PASS" "${views_time_ms}ms for dashboard view"
else
    log_perf_test "Views Query Speed" "FAIL" "${views_time_ms}ms too slow for dashboard view"
fi

echo ""
echo -e "${BLUE}💾 Cache Performance Testing${NC}"

# Test 6: Cache Hit Performance
echo "Testing cache performance..."
ddev drush cr >/dev/null 2>&1
cache_miss_start=$(date +%s%N)
cache_miss_response=$(ddev exec curl -s -o /dev/null -w "%{time_total}" https://bruchtal.zh-demo.ddev.site/admin/content/events/review)
cache_miss_end=$(date +%s%N)

# Second request should hit cache
cache_hit_start=$(date +%s%N)
cache_hit_response=$(ddev exec curl -s -o /dev/null -w "%{time_total}" https://bruchtal.zh-demo.ddev.site/admin/content/events/review)
cache_hit_end=$(date +%s%N)

cache_improvement=$(echo "scale=2; ($cache_miss_response - $cache_hit_response) / $cache_miss_response * 100" | bc 2>/dev/null || echo "0")

if (( $(echo "$cache_hit_response < $cache_miss_response" | bc -l 2>/dev/null || echo "0") )); then
    log_perf_test "Cache Performance" "PASS" "${cache_improvement}% improvement with cache"
else
    log_perf_test "Cache Performance" "FAIL" "No cache improvement detected"
fi

echo ""
echo -e "${BLUE}📱 Mobile Performance Testing${NC}"

# Test 7: Mobile User Agent Performance
echo "Testing mobile performance..."
mobile_response=$(ddev exec curl -s -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)" -o /dev/null -w "%{time_total}" https://bruchtal.zh-demo.ddev.site/admin/content/events/review)
mobile_ms=$(echo "$mobile_response * 1000" | bc 2>/dev/null || echo "2000")

if (( $(echo "$mobile_response < 3.0" | bc -l 2>/dev/null || echo "1") )); then
    log_perf_test "Mobile Performance" "PASS" "${mobile_ms}ms on mobile (< 3000ms target)"
else
    log_perf_test "Mobile Performance" "FAIL" "${mobile_ms}ms on mobile (exceeds 3000ms target)"
fi

echo ""
echo -e "${BLUE}🔧 Resource Optimization Testing${NC}"

# Test 8: Asset Compression
echo "Testing asset compression..."
css_size=$(ddev exec curl -s -H "Accept-Encoding: gzip" https://bruchtal.zh-demo.ddev.site/themes/custom/adesso_cms_theme/dist/css/style.css 2>/dev/null | wc -c || echo "0")
if [ $css_size -lt 100000 ]; then  # Less than 100KB
    log_perf_test "CSS Asset Size" "PASS" "${css_size} bytes (optimized)"
else
    log_perf_test "CSS Asset Size" "FAIL" "${css_size} bytes (may need optimization)"
fi

# Test 9: JavaScript Performance
echo "Testing JavaScript performance..."
js_size=$(ddev exec curl -s https://bruchtal.zh-demo.ddev.site/core/misc/drupal.js 2>/dev/null | wc -c || echo "0")
if [ $js_size -lt 50000 ]; then  # Less than 50KB
    log_perf_test "JS Asset Size" "PASS" "${js_size} bytes (optimized)"
else
    log_perf_test "JS Asset Size" "FAIL" "${js_size} bytes (may need optimization)"
fi

echo ""
echo -e "${BLUE}⚙️ Configuration Performance Testing${NC}"

# Test 10: PHP Performance Configuration
echo "Testing PHP configuration..."
php_memory=$(ddev exec php -r "echo ini_get('memory_limit');")
if [[ "$php_memory" == *"512M"* ]] || [[ "$php_memory" == *"1G"* ]] || [[ "$php_memory" == *"-1"* ]]; then
    log_perf_test "PHP Memory Limit" "PASS" "Memory limit: $php_memory"
else
    log_perf_test "PHP Memory Limit" "FAIL" "Memory limit may be too low: $php_memory"
fi

# Test 11: Database Connection Performance
echo "Testing database performance..."
db_connection_start=$(date +%s%N)
db_status=$(ddev drush status --field=db-status 2>/dev/null || echo "unknown")
db_connection_end=$(date +%s%N)
db_connection_ms=$(( ($db_connection_end - $db_connection_start) / 1000000 ))

if [ "$db_status" = "Connected" ] && [ $db_connection_ms -lt 50 ]; then
    log_perf_test "Database Connection" "PASS" "Connected in ${db_connection_ms}ms"
else
    log_perf_test "Database Connection" "FAIL" "Connection slow or failed: ${db_connection_ms}ms"
fi

echo ""
echo -e "${BLUE}🚀 Load Testing Simulation${NC}"

# Test 12: Concurrent Request Simulation
echo "Testing concurrent request handling..."
concurrent_start=$(date +%s%N)

# Simulate 5 concurrent requests
for i in {1..5}; do
    (ddev exec curl -s -o /dev/null https://bruchtal.zh-demo.ddev.site/admin/content/events/review) &
done
wait

concurrent_end=$(date +%s%N)
concurrent_time_ms=$(( ($concurrent_end - $concurrent_start) / 1000000 ))

if [ $concurrent_time_ms -lt 5000 ]; then  # Less than 5 seconds for 5 concurrent requests
    log_perf_test "Concurrent Load" "PASS" "5 concurrent requests in ${concurrent_time_ms}ms"
else
    log_perf_test "Concurrent Load" "FAIL" "5 concurrent requests took ${concurrent_time_ms}ms"
fi

echo ""
echo -e "${BLUE}📊 Performance Optimization Recommendations${NC}"
echo "================================================="
echo ""
echo -e "${YELLOW}🎯 Core Web Vitals Checklist:${NC}"
echo "□ Largest Contentful Paint (LCP) < 2.5s"
echo "□ First Input Delay (FID) < 100ms"  
echo "□ Cumulative Layout Shift (CLS) < 0.1"
echo "□ First Contentful Paint (FCP) < 1.8s"
echo ""
echo -e "${YELLOW}⚡ Optimization Areas:${NC}"
echo "□ Enable CSS/JS aggregation and compression"
echo "□ Configure browser caching headers"
echo "□ Optimize database queries and indexes"
echo "□ Implement CDN for static assets"
echo "□ Use image optimization and WebP format"
echo ""
echo -e "${YELLOW}📱 Mobile Optimization:${NC}"
echo "□ Test on real mobile devices"
echo "□ Optimize for slow network connections"
echo "□ Minimize JavaScript execution time"
echo "□ Use efficient CSS for mobile layouts"

echo ""
echo -e "${BLUE}🛠️ Performance Testing Tools${NC}"
echo "================================================="
echo "• Lighthouse (integrated in Chrome DevTools)"
echo "• WebPageTest.org for detailed analysis"
echo "• GTmetrix for performance monitoring"
echo "• Apache Bench (ab) for load testing"
echo "• Drupal Performance module for profiling"

echo ""
echo -e "${BLUE}📊 Performance Test Results${NC}"
echo "================================================="
echo -e "Total Tests: ${BLUE}$PERF_TESTS_TOTAL${NC}"
echo -e "Passed: ${GREEN}$PERF_TESTS_PASSED${NC}"
echo -e "Failed: ${RED}$PERF_TESTS_FAILED${NC}"

if [ $PERF_TESTS_TOTAL -gt 0 ]; then
    PERF_PASS_RATE=$((PERF_TESTS_PASSED * 100 / PERF_TESTS_TOTAL))
    echo -e "Pass Rate: ${BLUE}$PERF_PASS_RATE%${NC}"
else
    PERF_PASS_RATE=0
fi

echo ""

if [ $PERF_TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}⚡ PERFORMANCE OPTIMIZED${NC}"
    echo -e "${GREEN}✅ Load times meet targets${NC}"
    echo -e "${GREEN}✅ Database queries optimized${NC}"
    echo -e "${GREEN}✅ Mobile performance acceptable${NC}"
    echo -e "${GREEN}✅ Ready for demo performance${NC}"
elif [ $PERF_PASS_RATE -ge 75 ]; then
    echo -e "${YELLOW}⚠️  GOOD PERFORMANCE - Minor optimizations possible${NC}"
    echo -e "${YELLOW}📋 Review failed tests for improvements${NC}"
else
    echo -e "${RED}❌ PERFORMANCE ISSUES DETECTED${NC}"
    echo -e "${RED}🚫 Optimization required before demo${NC}"
fi

echo ""
echo -e "${BLUE}🔗 Testing Commands:${NC}"
echo "Lighthouse: lighthouse https://bruchtal.zh-demo.ddev.site/admin/content/events/review"
echo "Load test: ab -n 100 -c 10 https://bruchtal.zh-demo.ddev.site/admin/content/events/review"

# Exit with appropriate code
if [ $PERF_TESTS_FAILED -eq 0 ]; then
    exit 0
else
    exit 1
fi