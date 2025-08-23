---
description: "Start TDD-enforced development on GitHub issues with mandatory failing tests first"
allowed-tools: ["Bash"]
---

Start TDD work session on issue #$ARGUMENTS[0]. 

⚠️ **TDD ENFORCEMENT ACTIVE** - You MUST write failing tests first!

!gh issue comment $ARGUMENTS[0] --body "## 🏗️ Work Session Started - TDD ENFORCED

**Status**: Moving to Building Lane (In Progress)  
**Started**: $(date '+%Y-%m-%d %H:%M:%S')

## ⚠️ MANDATORY TDD WORKFLOW
**STOP!** Write failing tests FIRST:

### 🔴 RED Phase (REQUIRED)
- [ ] Write failing test describing desired behavior
- [ ] Run test to confirm it fails (\`npm test\`)
- [ ] Commit failing test

### 🟢 GREEN Phase 
- [ ] Write minimal code to pass test
- [ ] All tests green
- [ ] Commit working code

### 🔵 REFACTOR Phase
- [ ] Clean up code
- [ ] Tests still pass
- [ ] Commit refactored code

## Swiss Compliance Testing
- [ ] Accessibility (eCH-0059)
- [ ] Multi-language (DE/FR/IT)
- [ ] Performance impact
- [ ] GDPR/CH-DSG compliance

Use \`/review $ARGUMENTS[0]\` when ready for review.

---
🤖 TDD Session started via /work command"

Move issue to Building Lane (In Progress) and enforce TDD workflow.

**TDD ENFORCEMENT:** No implementation without failing tests first!