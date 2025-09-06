# Compound Engineering Work Directory

This directory contains the local workflow files for the 4-Phase Lane Model implementation.

## Directory Structure

### `/issues/` 
Local issues created by `/create-issue` command
- Format: `XXX-title.md` (sequential numbering)
- Contains problem descriptions and initial requirements
- Can be synced to GitHub issues

### `/research/` 
Research findings from `/research` command
- Format: `research-XXX.md` (linked to issue number)
- Contains codebase analysis, Context7 findings, and web research
- Includes best practices and implementation approaches

### `/plans/` 
Implementation plans from `/plan` command  
- Format: `plan-XXX.md` (linked to issue number)
- Contains detailed implementation steps
- **Agent assignments** for each implementation phase
- Agent orchestration sequences (sequential/parallel)


## Workflow

1. **`/create-issue`** → `.work/issues/XXX-title.md`
2. **`/research`** → `.work/research/research-XXX.md`  
3. **`/plan`** → `.work/plans/plan-XXX.md` (with agent mappings)
4. **`/work`** → Implementation using specified agents

## Every.to Integration

This system implements compound engineering principles:
- Each phase builds intelligence for future phases  
- Agent performance tracking improves agent selection
- Pattern recognition accelerates similar implementations
- Learning compounds with each workflow iteration

## File Naming Convention

- Issues: `001-implement-user-auth.md`
- Research: `research-001.md` 
- Plans: `plan-001.md`
- Consistent numbering links phases together