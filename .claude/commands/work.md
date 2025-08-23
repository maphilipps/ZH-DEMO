---
description: "Start TDD-enforced development on GitHub issues with strict test-first requirements"
allowedTools: ["Bash", "Task", "Write", "Edit"]
---

# /work - TDD-Enforced Development

Enforce Test-Driven Development and move issues through Building Lane with strict quality gates.

## Usage
```
/work [issue_number]
```

## TDD Enforcement - MANDATORY WORKFLOW

### 🔴 RED Phase (REQUIRED FIRST)
You MUST write failing tests before any implementation:

1. **Identify what needs to be tested**
2. **Write test that describes desired behavior**
3. **Run test to ensure it fails** 
4. **Commit failing test**

### 🟢 GREEN Phase
Only after RED phase is complete:
- Write simplest code to make test pass
- Run all tests to ensure green
- Commit working implementation

### 🔵 REFACTOR Phase
- Clean up implementation
- Improve naming and structure
- Ensure all tests still pass
- Commit refactored code

## Implementation

### Validate Issue and Move to In Progress
!ISSUE_NUMBER=$ARGUMENTS[0] && \
echo "🚀 Starting TDD Work Session on Issue #${ISSUE_NUMBER}" && \
gh issue view "${ISSUE_NUMBER}" --json title,state,projectItems && \
ITEM_ID=$(gh api graphql -f query="query(\$owner: String!, \$name: String!) { repository(owner: \$owner, name: \$name) { issue(number: ${ISSUE_NUMBER}) { projectItems(first: 5) { nodes { id project { title } } } } } }" -f owner="maphilipps" -f name="zh-demo" --jq '.data.repository.issue.projectItems.nodes[] | select(.project.title == "GZ Demo") | .id') && \
gh project item-edit --id "$ITEM_ID" --project-id "PVT_kwHOAuMI6s4BBOm5" --field-id "PVTSSF_lAHOAuMI6s4BBOm5zgzzCcE" --single-select-option-id "47fc9ee4"

### Add TDD Requirements Comment to Issue
!gh issue comment $ARGUMENTS[0] --body "## 🏗️ Work Session Started - TDD ENFORCED

**Status**: Moving to 'In Progress' (Building Lane)  
**Approach**: Test-Driven Development (TDD) MANDATORY
**Started**: $(date '+%Y-%m-%d %H:%M:%S')

## ⚠️ TDD WORKFLOW ENFORCEMENT ACTIVE

**STOP!** You must complete the RED phase before any implementation:

### 🔴 RED Phase - REQUIRED FIRST
- [ ] Identify what functionality needs to be tested
- [ ] Write failing test that describes desired behavior  
- [ ] Run test to confirm it fails (\`npm test\` or \`ddev exec npm test\`)
- [ ] Commit failing test to git

### 🟢 GREEN Phase - Only After RED Complete
- [ ] Write minimal code to make test pass
- [ ] Run all tests to ensure green
- [ ] Commit working implementation

### 🔵 REFACTOR Phase - Clean Up
- [ ] Improve code structure and naming
- [ ] Ensure all tests still pass
- [ ] Commit refactored code

## Swiss Compliance Testing Required
- [ ] Accessibility tests (eCH-0059)
- [ ] Multi-language support tests (DE/FR/IT)
- [ ] Performance impact measurement
- [ ] GDPR/CH-DSG compliance verification

## Test Commands
\`\`\`bash
# Run specific tests
npm test -- --testPathPattern=feature-name
ddev exec npm test

# Run all tests  
npm run test:all
ddev exec npm run test:all
\`\`\`

**Next Steps:**
1. Write your failing test first (RED phase)
2. Only then implement minimal code (GREEN phase)
3. Refactor while keeping tests green (REFACTOR phase)
4. Use \`/review $ARGUMENTS[0]\` when ready for review

---
🤖 TDD Session started via /work command"

## TDD Enforcement Active

**⚠️ CRITICAL:** You must write failing tests BEFORE any implementation code!

This is non-negotiable in our compounding engineering approach. Every feature must:
1. Start with failing tests (RED)
2. Implement minimal code (GREEN)  
3. Refactor while tests pass (REFACTOR)
4. Document learnings for future compound benefits

**Issue moved to Building Lane (In Progress)**
**Swiss compliance testing enforced**
**Ready for TDD development cycle**