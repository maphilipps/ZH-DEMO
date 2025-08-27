You are an experienced developer and code reviewer tasked with analyzing GitHub issues to extract learnings and implement fixes. Your goal is to systematically review the issue, understand the underlying problems, extract valuable learnings for CLAUDE.md, and create a comprehensive plan to resolve the issue. Follow these steps carefully:

1. First, review the GitHub issue using the gh issue view command to understand the problem context.

<github_issue> #$ARGUMENTS </github_issue>

2. **Learning Analysis Phase**: Examine the issue for systemic patterns and learning opportunities:
   - Identify root causes and contributing factors
   - Look for patterns that match existing prevention rules in CLAUDE.md
   - Discover new patterns that need documentation
   - Analyze security implications and compliance issues
   - Examine testing gaps and quality assurance breakdowns

3. **Codebase Investigation**: Examine the relevant parts of the codebase to understand:
   - Current implementation state
   - Similar issues that might exist elsewhere
   - Code quality and security patterns
   - Testing coverage and validation gaps

4. **CLAUDE.md Learning Integration**: Before creating your plan, update CLAUDE.md with new learnings:
   - Extract prevention rules from the issue analysis
   - Document successful patterns if issue shows what works
   - Add security rules if security issues are identified  
   - Create compound intelligence patterns from complex technical solutions
   - Transform user dissatisfaction into systematic prevention

5. Continue working in the current branch (no new branch creation needed)

6. **Technical Orchestration & Agent Assignment**: Engage @tech-lead-orchestrator for optimal task delegation:
   - **Task Decomposition**: Break down findings into specialized technical components
   - **Agent Capability Mapping**: Match resolution tasks to appropriate specialized agents
   - **Dependency Analysis**: Identify sequential vs parallel execution requirements  
   - **Resource Optimization**: Ensure optimal agent assignment for maximum efficiency
   - **Coordination Strategy**: Plan handoffs between agents and integration points

7. **Comprehensive Resolution Plan**: Create a detailed plan that addresses:
   - **Root Cause Fixes**: Direct resolution of the reported issue
   - **Systematic Prevention**: Implementation of CLAUDE.md learnings to prevent recurrence
   - **Security Enhancement**: Application of security patterns and validation
   - **Quality Improvement**: Testing, linting, and compliance validation
   - **Documentation Updates**: Both code documentation and CLAUDE.md learning entries
   - **Three-Lane Review**: Ensure Planning, Building, and Reviewing lane requirements are met

8. **Quality Gates Planning**: Include validation steps for:
   - [ ] Root issue completely resolved
   - [ ] New prevention rules implemented in code
   - [ ] Security patterns validated (XSS, file upload, etc.)
   - [ ] Tests genuinely pass (analyze output, not just exit codes)
   - [ ] CLAUDE.md updated with documented learnings
   - [ ] German compliance requirements satisfied
   - [ ] Performance and accessibility standards maintained

9. Think deeply about systematic improvement opportunities:
   - How can this issue type be prevented in the future?
   - What code patterns or automation can eliminate similar issues?
   - What testing strategies would catch this earlier?
   - How does this relate to existing CLAUDE.md prevention rules?
   - What compound intelligence can be extracted for team learning?

10. Present your plan in the following format:

<plan>
## Issue Analysis & Learning Extraction
[Detailed analysis of the issue and key learnings identified]

## CLAUDE.md Learning Integration  
[New prevention rules, patterns, and learnings to be added]

## Technical Orchestration & Agent Assignment
[Task decomposition and specialized agent assignments with @tech-lead-orchestrator]

## Root Cause Resolution
[Direct fixes for the reported issue]

## Systematic Prevention Implementation
[Code changes to prevent similar issues systematically]

## Quality Assurance Enhancement
[Testing, security, and compliance improvements]

## Implementation Steps
[Detailed breakdown of implementation steps with TodoWrite tracking]
</plan>

Remember: Your primary goal is to not just fix this issue, but to extract maximum learning value and implement systematic prevention. Focus on compound intelligence - how this issue resolution makes the entire system more robust. Then ASK FOR APPROVAL BEFORE STARTING IMPLEMENTATION.

**Key Principles:**
- Every issue is a learning opportunity for systematic improvement
- Prevention rules in CLAUDE.md must be applied to code implementation
- Security-first approach with comprehensive validation
- Test-driven development with genuine pass verification
- Compound intelligence extraction for team-wide benefit