#!/bin/bash
# Converts failures into permanent knowledge (Tests + Rules + Evaluations)

FAILURE_TYPE=$1  # bug|performance|compliance|demo
DESCRIPTION=$2
COMPONENT=$3     # forms|theme|ai|workflow
SEVERITY=$4      # high|medium|low

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LANE="reviewing"  # Failures first go to reviewing

# Create failure analysis
cat > ".claude/lanes/reviewing/failure-${TIMESTAMP}.md" << EOF
# Failure Analysis: ${DESCRIPTION}

**Type**: ${FAILURE_TYPE}
**Component**: ${COMPONENT}
**Severity**: ${SEVERITY}
**Date**: $(date)

## What Failed
${DESCRIPTION}

## Root Cause Analysis
[To be filled by reviewing agent]

## Prevention Strategy
[To be filled by reviewing agent]

## Test Created
- [ ] Unit test for this failure
- [ ] Integration test for prevention
- [ ] Regression test for monitoring

## Rule Established
- [ ] Code rule to prevent similar issues
- [ ] Review checklist item added
- [ ] Monitoring rule created

## Evaluation Built  
- [ ] Continuous validation process
- [ ] Performance benchmark
- [ ] Quality gate updated

## Knowledge Update
- [ ] CLAUDE.md preference updated
- [ ] llms.txt rule added if architectural
- [ ] working-notes.md pattern documented
EOF

echo "Failure captured: .claude/lanes/reviewing/failure-${TIMESTAMP}.md"
echo "Next: Have reviewing agent analyze and create prevention measures"