# Codebase Deep Dive

## Introduction

This command produces a comprehensive, multi-perspective research dossier on an entire codebase that combines elite software archeology, reverse-engineering, and strategic analysis. The output is designed to impress CTOs, senior engineers, and venture analysts with its depth, insights, and narrative quality.

**Usage Examples:**

- Local repo: `/codebase-deep-dive ~/projects/my-app`
- Remote repo: `/codebase-deep-dive https://github.com/facebook/react`

## Prerequisites

- Repository path (local: `/path/to/repo` or remote: `https://github.com/user/repo`)
- Git repository with commit history
- GitHub access (for issues/PR analysis if applicable)
- Understanding of the project's primary language

## Initial Setup

1. **Repository Access**
   - For remote repos: `git clone [Repository URL]`
   - For local repos: `cd [Repository path]`
   - Verify repository status: `git status`

2. **Environment Analysis**
   - Identify primary languages and frameworks
   - Check for build systems and package managers
   - Note any unusual project structure

## Phase 1: Discovery and Context Building

### Parallel Discovery Tasks

Execute these tasks simultaneously to gather comprehensive project intelligence:

**Task Group A - Codebase Structure:**

- Map directory structure and identify major modules
- Analyze file distribution by type and size
- Find configuration files and understand project setup
- Identify build scripts and deployment configurations

**Task Group B - Documentation Mining:**

- Read README.md and all documentation files
- Extract architectural decisions from docs
- Find API documentation or interface definitions
- Search for design documents or ADRs

**Task Group C - Dependency Analysis:**

- Parse package files (package.json, requirements.txt, etc.)
- Map dependency tree and version constraints
- Identify critical vs optional dependencies
- Check for security vulnerabilities in dependencies

**Task Group D - Git Intelligence:**

- Analyze commit frequency and patterns
- Identify top contributors
- Find major milestones in git history
- Extract recent development velocity metrics

## Phase 2: Core Analysis Dimensions

### 1. North Star Purpose

**Thinking Approach:** Strategic and user-centric analysis

**Analysis Steps:**

1. Extract mission from documentation and code comments
2. Analyze main entry points and user-facing features
3. Compare stated purpose with actual implementation
4. Identify target user personas from code patterns

**Output Requirements:**

- Core mission in plain English (1-2 sentences)
- Technical purpose (what problem it solves technically)
- Current user base analysis
- Potential 10x scaling user segments

### 2. Architecture Mind Map

**Thinking Approach:** Systems thinking and pattern recognition

**Parallel Architecture Tasks:**

- Trace control flow from entry points
- Map data flow through the system
- Identify architectural patterns (MVC, microservices, etc.)
- Find integration points and APIs
- Detect anti-patterns or architectural debt

**Deliverables:**

- Mental model diagram (text-based)
- Component interaction map
- Data flow visualization
- Pattern inventory with examples

### 3. The "Power Core"

**Sequential Analysis:**

1. **Identify Critical Components**

   ```bash
   # Find most imported/referenced files
   # Analyze file change frequency
   # Look for files with most dependencies
   ```

2. **For Each Core Component:**
   - [ ] Document its primary responsibility
   - [ ] List dependent modules
   - [ ] Analyze what breaks if removed
   - [ ] Provide call chain examples
   - [ ] Rate criticality (1-10)

**Thinking Approach:** Dependency analysis and impact assessment

### 4. Code Quality MRI

**Parallel Quality Scans:**

**Scan A - Complexity Analysis:**

- Cyclomatic complexity hotspots
- Deeply nested code blocks
- Long functions/methods
- Code duplication detection

**Scan B - Maintainability Check:**

- Comment quality and coverage
- Variable/function naming consistency
- Module cohesion analysis
- Technical debt indicators

**Scan C - Code Smells:**

- Magic numbers and hardcoded values
- God classes or modules
- Tight coupling indicators
- Missing error handling

**Output:** 5-7 actionable refactoring recommendations with impact/effort matrix

### 5. Temporal Analysis (Git Time Travel)

**Git History Mining Tasks:**

1. **Evolution Timeline**

   ```bash
   git log --format='%h %ad %s' --date=short --reverse | head -100
   git log --all --graph --decorate --oneline --simplify-by-decoration
   ```

2. **Churn Analysis**

   ```bash
   git log --format=format: --name-only | sort | uniq -c | sort -rg | head -20
   ```

3. **Risk Zone Identification**
   - Files with most bug fixes
   - Areas with frequent reverts
   - Components with multiple authors

**Deliverables:**

- 3 major turning points with context
- High-risk file list with reasons
- Stale component inventory

### 6. Issues, Risks & Security

**Parallel Security Analysis:**

**Task A - Issue Analysis:**

- Categorize open issues by type
- Create impact vs effort matrix
- Identify recurring problems

**Task B - Security Scan:**

- Input validation patterns
- Authentication/authorization implementation
- Sensitive data handling
- Common vulnerability patterns

**Task C - Risk Assessment:**

- Single points of failure
- Missing test coverage areas
- Deprecated dependency usage

**Output:** Prioritized risk register with mitigation strategies

### 7. Ecosystem & Competitive Lens

**Research Tasks:**

1. **Competitive Analysis**
   - Identify 2-3 similar projects
   - Compare features and approach
   - Analyze unique differentiators
   - Market positioning assessment

2. **Ecosystem Impact**
   - Dependencies on this project
   - Integration possibilities
   - Community adoption metrics
   - "Irreplaceability factor"

**Thinking Approach:** Market analysis and strategic positioning

### 8. Community Intelligence

**Community Health Metrics:**

1. **Quantitative Analysis**
   - Contributor count and diversity
   - PR merge velocity
   - Issue response times
   - Release frequency

2. **Qualitative Assessment**
   - Documentation quality
   - Onboarding experience
   - Community tone and culture
   - Bus factor analysis

**Deliverables:** Community health scorecard with specific recommendations

### 9. Contribution Playbook

**10-Minute Quickstart Guide Creation:**

1. **Setup Instructions**
   - [ ] Environment requirements
   - [ ] Installation steps
   - [ ] Verification commands
   - [ ] Common setup issues

2. **First Contribution Path**
   - [ ] Good first issues identification
   - [ ] Code style guide summary
   - [ ] Testing requirements
   - [ ] PR process explanation

3. **Advanced Challenges**
   - [ ] Complex feature opportunities
   - [ ] Performance optimization areas
   - [ ] Architecture improvement ideas

### 10. Future-Proofing & Vision

**Strategic Analysis Tasks:**

**Performance Scaling:**

- Current bottlenecks identification
- 10x growth impact analysis
- Resource requirement projections

**Architectural Evolution:**

- Modularization opportunities
- Technology migration paths
- CI/CD improvements

**Visionary Features:**

- Industry trend alignment
- Next-generation capabilities
- Market differentiation opportunities

## Phase 3: Synthesis and Delivery

### Report Generation

**Structure Requirements:**

1. **Executive Summary** (1 page)
   - Key findings
   - Strategic recommendations
   - Risk summary

2. **Technical Deep Dive** (5-7 pages)
   - Architecture analysis
   - Code quality findings
   - Performance insights
   - Security assessment

3. **Strategic Analysis** (2-3 pages)
   - Market positioning
   - Community health
   - Future roadmap

4. **Appendices**
   - Code snippets
   - Detailed metrics
   - Technical diagrams

### Hidden "Aha" Moments

Throughout analysis, maintain a running log of:

- Clever abstractions worth highlighting
- Elegant solutions to complex problems
- Potential bugs or issues discovered
- Architectural gems or innovations

For each discovery:

1. Pause and document why it's significant
2. Explain the technical cleverness
3. Assess broader implications
4. Consider applicability elsewhere

## Quality Assurance Checklist

Before finalizing the dossier:

- [ ] All 10 dimensions thoroughly covered
- [ ] Mix of high-level and detailed analysis
- [ ] Concrete examples and code snippets included
- [ ] Cause-effect reasoning clearly shown
- [ ] Non-obvious patterns highlighted
- [ ] Narrative flow maintained throughout
- [ ] Actionable recommendations provided
- [ ] Technical accuracy verified
- [ ] Strategic insights included

## Expected Outcome

A comprehensive 10-page research dossier that:

- Provides deep technical insights while remaining accessible
- Balances descriptive analysis with prescriptive recommendations
- Surfaces hidden patterns and architectural decisions
- Offers strategic vision alongside tactical improvements
- Serves as both a technical reference and strategic guide
- Impresses technical and business stakeholders alike

The final deliverable should read like a confidential consulting report that combines the rigor of academic research with the practicality of engineering wisdom and the strategic clarity of business analysis.

Save to a markdown file in docs/library/NAME.md
