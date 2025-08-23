---
description: "Create GitHub issues with automatic project assignment and compounding knowledge integration"
allowed-tools: ["Bash"]
---

Create a GitHub issue with title "$ARGUMENTS[0]" and description "$ARGUMENTS[1]" using labels "${ARGUMENTS[2]:-enhancement,planning-lane}".

Automatically:
1. Assign to @claude (maphilipps)
2. Add to GitHub Project "GZ Demo" 
3. Set status to Ready (Planning Lane)
4. Include Swiss compliance checklist (eCH-0059, GDPR/CH-DSG, multi-language)
5. Add compounding engineering template for TDD and knowledge capture

Use comprehensive issue template with implementation requirements and success criteria.

!gh issue create --title "$ARGUMENTS[0]" --body "## Description

$ARGUMENTS[1]

## Compounding Engineering Integration
**Created via**: /issue command  
**Project**: GZ Demo (Planning Lane - Ready)  
**Swiss Compliance**: eCH-0059, GDPR/CH-DSG required

## Implementation Requirements
- [ ] Follow TDD approach (RED-GREEN-REFACTOR)
- [ ] Document architectural decisions in ADRs
- [ ] Update CLAUDE.md with learned patterns
- [ ] Swiss accessibility testing (eCH-0059)
- [ ] Multi-language support (DE/FR/IT)

---
🤖 Generated with Compounding Engineering /issue" --label "${ARGUMENTS[2]:-enhancement,planning-lane}" --assignee "maphilipps"

!ISSUE_NUMBER=$(gh issue list --assignee "@me" --state open --limit 1 --json number --jq '.[0].number') && gh project item-add 2 --owner maphilipps --url "https://github.com/maphilipps/zh-demo/issues/${ISSUE_NUMBER}"

Issue created and added to GitHub Project! Use `/work ${ISSUE_NUMBER}` to start TDD development.