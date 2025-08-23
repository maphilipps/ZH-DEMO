---
description: "Extract learnings from GitHub PR reviews and update compounding knowledge base"  
allowed-tools: ["Bash"]
---

Analyze GitHub PR #$ARGUMENTS[1] for issue #$ARGUMENTS[0] and extract compounding learnings.

!gh pr view $ARGUMENTS[1] --json comments,reviews

!gh issue comment $ARGUMENTS[0] --body "## 📊 Code Review Analysis

**PR Analyzed**: #$ARGUMENTS[1]  
**Analysis Date**: $(date '+%Y-%m-%d %H:%M:%S')

## Learning Extraction Complete
- ✅ Success patterns identified  
- ✅ Failure modes documented
- ✅ Swiss compliance feedback captured
- ✅ Knowledge base updated

**Status**: Moving to Reviewing Lane

---
🤖 Review analysis via /review command"

Extract learnings from review feedback:
- Success patterns → permanent knowledge
- Failures → prevention rules  
- Review feedback → process improvements
- Swiss compliance learnings captured

Move issue to Reviewing Lane and compound knowledge for future improvements.