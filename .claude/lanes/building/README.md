# Building Lane - GitHub Issues Integration

## Overview

The Building Lane now integrates directly with GitHub Issues created by the Planning Lane, creating a seamless workflow from architecture to implementation.

## Workflow

### 1. Planning Lane → GitHub Issues
- Planning documents in `/lanes/planning/` are automatically converted to GitHub Issues
- Issues are labeled with `planning-lane`, `architecture`, `gpzh-demo`, `drupal-11`
- Each issue contains the full planning document and implementation checklist

### 2. GitHub Issues → Building Lane Tasks
- GitHub Issues are automatically detected and converted to Building Lane tasks
- Task files are created in this directory as `github-issue-{number}.md`
- Each task includes implementation checklist and compounding engineering notes

### 3. Building Lane Implementation
- Developers work from GitHub Issue + Building Lane task file
- Feature branches are created: `feature/issue-{number}`
- Implementation follows Planning Lane specifications
- Compounding engineering learnings are applied automatically

### 4. Handoff to Review Lane
- Pull Requests are created linking back to GitHub Issues
- GitHub Actions runs Review Lane with learnings integration
- Swiss compliance and GPZH requirements are validated automatically

## Commands

### Planning Lane to GitHub Issues
```bash
# Process all planning documents to GitHub Issues
.claude/scripts/planning-to-github.sh

# Watch for new planning documents
.claude/scripts/planning-to-github.sh watch

# Sync specific planning document
.claude/scripts/planning-to-github.sh sync path/to/planning.md
```

### Building Lane GitHub Integration
```bash
# Check for new planning-lane issues
.claude/hooks/github-issue-created.sh check

# Process specific issue
.claude/hooks/github-issue-created.sh process 123
```

## Automation

### Hooks Integration
- **Start Hook**: Automatically checks for new planning-lane issues when Claude Code starts
- **Stop Hook**: Validates learnings and updates knowledge base

### GitHub Actions
- **Review Lane**: Runs automatically on Pull Requests
- Applies compounding engineering learnings
- Validates Swiss compliance requirements
- Checks GPZH demo functionality
- Updates learning system with review results

## File Structure

```
.claude/lanes/building/
├── README.md                           # This file
├── github-issue-{number}.md           # Auto-generated task files
├── task-template.md                    # Template for manual tasks
└── working-notes.md                    # Development notes
```

## Compounding Engineering Integration

### Applied Learnings
- Lessons from previous PRs are automatically applied
- Architecture patterns from CLAUDE.md are enforced
- Swiss compliance requirements are validated
- GPZH demo functionality is preserved

### Knowledge Capture
- Implementation patterns are captured in `.claude/learnings.json`
- Architectural decisions update `CLAUDE.md`
- Review feedback becomes permanent system knowledge

## Swiss Compliance Automation

### Automated Checks
- ß character detection (should use ss)
- Informal addressing detection (should use Sie-Form)  
- Minimum font size validation (16px for accessibility)
- Color contrast validation (4.5:1 minimum)
- eCH-0059 compliance patterns

### GPZH Demo Requirements
- 4 required webforms validation
- Bruchtal municipality theme integrity
- Core Web Vitals performance validation
- Responsive design preservation

## Getting Started

1. **Planning Lane creates GitHub Issue**:
   ```bash
   .claude/scripts/planning-to-github.sh
   ```

2. **Building Lane detects and processes**:
   ```bash
   # Automatically via Start Hook or manually:
   .claude/hooks/github-issue-created.sh check
   ```

3. **Implement from GitHub Issue + Task File**:
   - Review GitHub Issue for requirements
   - Follow Building Lane task file checklist  
   - Create feature branch: `git checkout -b feature/issue-{number}`
   - Implement with compounding engineering principles
   - Create PR linking back to issue

4. **Review Lane validates automatically**:
   - GitHub Actions runs on PR creation
   - Learnings and compliance validated
   - Feedback captured for future compounding

This creates a complete compounding engineering workflow where every decision teaches the system and every implementation builds on previous learnings! 🚀