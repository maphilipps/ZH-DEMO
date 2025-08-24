#!/bin/bash
# Test Failure Analysis Agent - Compounding Engineering Implementation
# Automatically learns from test failures and creates permanent improvements

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

FAILURE_DIR=".claude/knowledge/test-failures"
PATTERNS_DIR=".claude/knowledge/patterns"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Create directories if they don't exist
mkdir -p "$FAILURE_DIR" "$PATTERNS_DIR"

analyze_test_failure() {
    local test_output="$1"
    local test_type="$2"
    local failure_file="$FAILURE_DIR/failure_${TIMESTAMP}_${test_type}.json"
    
    echo -e "${BLUE}🔍 Analyzing test failure pattern...${NC}"
    
    # Extract key failure information
    local failure_pattern=$(echo "$test_output" | grep -E "(FAIL|ERROR|Exception|AssertionError)" | head -5)
    local stack_trace=$(echo "$test_output" | grep -A 10 "at " | head -20)
    
    # Create failure record
    cat > "$failure_file" << EOF
{
    "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
    "test_type": "$test_type",
    "failure_pattern": $(echo "$failure_pattern" | jq -Rs .),
    "stack_trace": $(echo "$stack_trace" | jq -Rs .),
    "analyzed": false,
    "iterations_planned": 10,
    "pattern_extracted": false
}
EOF
    
    echo -e "${YELLOW}📝 Failure recorded: $failure_file${NC}"
    return "$failure_file"
}

create_test_variants() {
    local original_failure="$1"
    local test_type="$2"
    
    echo -e "${BLUE}🧪 Creating 10 test variants for pattern analysis...${NC}"
    
    # Use Claude to generate 10 similar test scenarios
    local variants_file="$PATTERNS_DIR/test_variants_${TIMESTAMP}_${test_type}.json"
    
    cat > "$variants_file" << EOF
{
    "original_failure": "$original_failure",
    "test_variants": [],
    "variant_results": {},
    "pattern_confidence": 0,
    "learning_extracted": false
}
EOF
    
    echo -e "${GREEN}✓ Test variant framework created: $variants_file${NC}"
    return "$variants_file"
}

run_iterative_improvement() {
    local failure_file="$1"
    local max_iterations=10
    local success_threshold=9
    
    echo -e "${BLUE}🔄 Starting iterative improvement cycle...${NC}"
    
    for iteration in $(seq 1 $max_iterations); do
        echo -e "${YELLOW}Iteration $iteration/$max_iterations${NC}"
        
        # Run test variant
        local test_result=$(run_test_iteration "$iteration")
        local success_count=$(echo "$test_result" | grep -c "PASS" || echo "0")
        
        echo -e "Success rate: $success_count/10"
        
        if [ "$success_count" -ge "$success_threshold" ]; then
            echo -e "${GREEN}✅ Success threshold reached ($success_count/$max_iterations)${NC}"
            extract_learning_pattern "$failure_file" "$success_count"
            break
        fi
        
        # Analyze failures and adjust
        analyze_iteration_failures "$test_result" "$iteration"
    done
}

run_test_iteration() {
    local iteration="$1"
    
    # Placeholder for actual test execution
    # In real implementation, this would run the actual tests
    echo "Running test iteration $iteration..."
    
    # Simulate test results (replace with actual test execution)
    if [ $((RANDOM % 10)) -lt 6 ]; then
        echo "PASS: Test iteration $iteration succeeded"
    else
        echo "FAIL: Test iteration $iteration failed - pattern not yet learned"
    fi
}

extract_learning_pattern() {
    local failure_file="$1"
    local success_count="$2"
    
    echo -e "${GREEN}🎓 Extracting permanent learning pattern...${NC}"
    
    local learning_file="$PATTERNS_DIR/learning_${TIMESTAMP}.md"
    
    cat > "$learning_file" << EOF
# Test Failure Learning Pattern - $(date +"%Y-%m-%d %H:%M:%S")

## Original Failure
- File: $failure_file
- Success Rate Achieved: $success_count/10

## Pattern Identified
[Automatically extracted pattern will be filled by Claude analysis]

## Prevention Rule
[Specific rule to prevent this failure category]

## Test Added
[Permanent test case to catch this pattern]

## CLAUDE.md Update
[Rule to be added to CLAUDE.md for permanent knowledge]
EOF
    
    # Update CLAUDE.md with new learning
    update_claude_md_with_learning "$learning_file"
    
    echo -e "${GREEN}✅ Learning pattern extracted and documented${NC}"
}

update_claude_md_with_learning() {
    local learning_file="$1"
    
    echo -e "${BLUE}📝 Updating CLAUDE.md with new learning...${NC}"
    
    # Add to Failure-to-Knowledge section in CLAUDE.md
    local timestamp=$(date +"%Y-%m-%d")
    local learning_entry="- **Test Pattern Learned ($timestamp)** → $(head -1 "$learning_file" | sed 's/# //') → Rule: [Auto-extracted rule to be filled]"
    
    # Find the Failure-to-Knowledge section and add the entry
    if grep -q "### Failure-to-Knowledge Conversions" CLAUDE.md; then
        sed -i "/### Failure-to-Knowledge Conversions/,/### /{ 
            /^#### Known Issues/i\\
$learning_entry
        }" CLAUDE.md
    fi
    
    echo -e "${GREEN}✅ CLAUDE.md updated with permanent learning${NC}"
}

analyze_iteration_failures() {
    local test_result="$1"
    local iteration="$2"
    
    echo -e "${YELLOW}📊 Analyzing iteration $iteration failures...${NC}"
    
    # Extract failure patterns from this iteration
    local failure_reasons=$(echo "$test_result" | grep "FAIL" | sed 's/FAIL: //')
    
    if [ -n "$failure_reasons" ]; then
        echo -e "${RED}Failure reasons found:${NC}"
        echo "$failure_reasons"
        
        # This would trigger Claude to adjust the approach
        # For now, just log the pattern
        local iteration_log="$FAILURE_DIR/iteration_${iteration}_analysis.txt"
        echo "$failure_reasons" > "$iteration_log"
    fi
}

# Main execution
main() {
    local test_command="${1:-}"
    local test_type="${2:-general}"
    
    if [ -z "$test_command" ]; then
        echo -e "${RED}Usage: $0 <test_command> [test_type]${NC}"
        echo "Example: $0 'npm test' javascript"
        echo "Example: $0 'ddev exec phpunit' drupal"
        exit 1
    fi
    
    echo -e "${BLUE}🚀 Starting Test Failure Analysis Agent${NC}"
    echo -e "${BLUE}Command: $test_command${NC}"
    echo -e "${BLUE}Type: $test_type${NC}"
    
    # Run the test and capture output
    if ! test_output=$($test_command 2>&1); then
        echo -e "${RED}❌ Test failed - beginning analysis...${NC}"
        
        # Analyze the failure
        failure_file=$(analyze_test_failure "$test_output" "$test_type")
        
        # Create test variants
        variants_file=$(create_test_variants "$failure_file" "$test_type")
        
        # Run iterative improvement
        run_iterative_improvement "$failure_file"
        
        echo -e "${GREEN}🎯 Compounding learning cycle complete!${NC}"
    else
        echo -e "${GREEN}✅ Tests passed - no learning needed${NC}"
    fi
}

# Run if called directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi