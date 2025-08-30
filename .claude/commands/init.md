---
description: Bootstrap any project with compound engineering intelligence and comprehensive AI assistant setup
category: claude-setup
allowed-tools: Write, Bash(ln:*), Bash(mkdir:*), Bash(test:*), Bash(echo:*), Read, Glob, Task
---

# /init - Compound Engineering & AI Assistant Initialization

**Purpose**: Bootstrap any project with compound engineering intelligence from day one, comprehensive AGENTS.md setup, and full AI assistant ecosystem integration.

## Usage Patterns

```bash
/init compound                    # Full compound engineering initialization (recommended)
/init agents-md                  # Create comprehensive AGENTS.md and AI assistant setup
/init llms-foundation            # Create comprehensive llms.txt for project context
/init learning-system           # Initialize base CLAUDE.md learning architecture
/init project <name>             # Initialize new project with compound engineering
/init environment                # Set up development environment with AI integration
/init agent <type>               # Set up specialized agent configurations
/init demo <project-name>        # Demo mode with temporary demonstration files
```

## Current Status
!`test -f AGENTS.md && echo "⚠️  AGENTS.md exists" || echo "✅ Ready to create AGENTS.md"`
!`test -f CLAUDE.md && echo "⚠️  CLAUDE.md exists" || echo "✅ Ready to create CLAUDE.md"`
!`test -f llms.txt && echo "⚠️  llms.txt exists" || echo "✅ Ready to create llms.txt"`

## Compound Engineering Philosophy

**Four-Phase Methodology**:
1. **Plan**: Strategic analysis with specialized agents (@solution-architect, @technical-pm)
2. **Delegate**: Task distribution to domain experts (@lead-developer, @specialist agents)
3. **Assess**: Quality validation and compliance (@compliance-specialist, @qa-specialist)
4. **Codify**: Transform learnings into permanent prevention systems

**Learning Transformation**: Every failure → Prevention rule → Reusable pattern → Compound intelligence

## Core Workflow

### 1. Repository Analysis & Context Gathering

Use Task tool to gather comprehensive repository information in parallel:

**Gather Repository Information** - Run these Glob patterns simultaneously:
- `package*.json` - Node.js project files
- `composer.json` - Drupal/PHP projects
- `*.md` - Documentation files
- `.github/workflows/*.yml` - GitHub Actions workflows
- `.github/workflows/*.yaml` - GitHub Actions workflows (alternate extension)
- `.cursor/rules/**` - Cursor rules
- `.cursorrules` - Cursor rules (alternate location)
- `.github/copilot-instructions.md` - GitHub Copilot rules
- `.claude/agents/**/*.md` - Specialized AI subagents
- `requirements.txt`, `setup.py`, `pyproject.toml` - Python projects
- `go.mod` - Go projects
- `Cargo.toml` - Rust projects
- `Gemfile` - Ruby projects
- `pom.xml`, `build.gradle` - Java projects
- `*.csproj` - .NET projects
- `Makefile` - Build automation
- `.eslintrc*`, `.prettierrc*` - Code style configs
- `tsconfig.json`, `vite.config.*` - Build configs
- `.env.example` - Environment configuration
- `**/*.test.*`, `**/*.spec.*` - Test files (limit to a few)
- `Dockerfile`, `docker-compose*.yml` - Docker configuration
- `.ddev/config.yaml` - DDEV configuration

### 2. Foundation Creation (llms.txt)

**Purpose**: Create comprehensive project context for AI systems

**Process**:
- Analyze existing codebase structure and identify all key files
- Document main goals, dependencies, and architectural patterns
- Map all functions with parameters, types, and concise explanations
- Create ASCII architecture diagram showing file relationships
- Extract code style guide, data formats, and development insights
- Follow DRY principle - consolidate overlapping information

**Template Structure**:
```
# Project: [Name]

[Brief project description and main purpose]

## Goals
- [Primary objectives]
- [Key features]
- [Target outcomes]

## Architecture
[ASCII diagram of system architecture]

## Functions
[Catalog of all functions with parameters and explanations]

## Code Style
[Extracted style guide and conventions]

## Dependencies
[Key dependencies and their purposes]
```

### 3. AI Assistant Ecosystem Setup (AGENTS.md)

**Purpose**: Create universal AI assistant configuration

Based on repository analysis, create AGENTS.md with this structure:

```markdown
# AGENTS.md
This file provides guidance to AI coding assistants working in this repository.

**Note:** CLAUDE.md, .clinerules, .cursorrules, and other AI config files are symlinks to AGENTS.md in this project.

# [Project Name]

[Project Overview: Brief description based on analysis]

## Navigating the Codebase

[Include codebase navigation instructions if applicable]

## Build & Commands

[Document EXACT script names from package.json/composer.json]:
- Build: `[exact command from analysis]`
- Test: `[exact command from analysis]`
- Lint: `[exact command from analysis]`
- Dev server: `[exact command from analysis]`

### Script Command Consistency
**Important**: When modifying scripts, ensure all references are updated in:
- GitHub Actions workflows
- README.md documentation
- Docker configuration
- CI/CD files

## Code Style

[Based on actual code analysis]:
- Language/framework specifics
- Import conventions (e.g., node: prefix for Node.js)
- Formatting rules
- Naming conventions
- Type usage patterns
- Error handling patterns

## Testing

[Testing frameworks and conventions from analysis]:
- Framework: [Detected framework]
- Test file patterns: [Detected patterns]
- Testing conventions
- Coverage requirements

### Testing Philosophy
**When tests fail, fix the code, not the test.**

## Security

[Security considerations based on project type]:
- Authentication patterns
- Data validation
- Secret management
- Project-specific security practices

## Directory Structure & File Organization

### Reports Directory
ALL project reports and documentation should be saved to `reports/`:

```
reports/                 # All project reports (tracked in git)
├── README.md           # Explains reports directory purpose
├── implementation/     # Feature implementation reports
├── testing/           # Test results and coverage
├── performance/       # Performance analysis
└── validation/        # Quality and validation reports
```

### Temporary Files & Debugging
All temporary files should go in `/temp`:
- Debug scripts: `temp/debug-*.js`
- Test artifacts: `temp/test-results/`
- Logs: `temp/logs/`

## Configuration

[Environment setup based on detected configuration]:
- Required environment variables
- Configuration files
- Development setup
- Dependencies

## Using Subagents

[Document available specialized agents from .claude/agents/ if they exist]

### Agent Delegation Requirements
- Always delegate to specialists when available
- Use Task tool for domain-specific work
- Execute multiple operations in parallel
- Prefer specialist expertise over general approaches

## Git Commit Conventions
[Based on git history analysis if available]
```

### 4. Learning Architecture (CLAUDE.md/Compound Intelligence)

**Purpose**: Establish compound engineering framework

**Components**:
- Core Learning Principles (TDD transformation system)
- Four-Phase Methodology (Plan → Delegate → Assess → Codify)
- Bug-to-Rule Prevention System
- Meta-Learning Agent Framework
- Quality Gates and Enforcement Automation

### 5. Directory Structure & AI Ecosystem Setup

Create comprehensive project structure:

```bash
# Create reports directory structure
mkdir -p reports/{implementation,testing,performance,validation}

# Create temp directory for debugging (add to .gitignore)
mkdir -p temp/{debug,logs,test-results}

# Create reports README
cat > reports/README.md << 'EOF'
# Reports Directory

This directory contains ALL project reports including validation, testing, analysis, performance benchmarks, and documentation generated during development.

## Report Categories

### Implementation Reports
- Phase/milestone completion reports
- Feature implementation summaries
- Technical implementation details

### Testing & Analysis Reports
- Test execution results
- Code coverage analysis
- Performance test results
- Security analysis reports

### Quality & Validation
- Code quality metrics
- Dependency analysis
- API compatibility reports
- Build and deployment validation

## Naming Conventions
- Use descriptive names: `[TYPE]_[SCOPE]_[DATE].md`
- Include dates: `YYYY-MM-DD` format
- Group with prefixes: `TEST_`, `PERFORMANCE_`, `SECURITY_`
- Markdown format: All reports end in `.md`
EOF

# Create symlinks for all AI assistants
ln -sf AGENTS.md CLAUDE.md
ln -sf AGENTS.md .clinerules
ln -sf AGENTS.md .cursorrules
ln -sf AGENTS.md .windsurfrules
ln -sf AGENTS.md .replit.md
ln -sf AGENTS.md GEMINI.md

# Create directories and symlinks for assistants requiring them
mkdir -p .github
ln -sf ../AGENTS.md .github/copilot-instructions.md

mkdir -p .idx
ln -sf ../AGENTS.md .idx/airules.md
```

### 6. Compound Intelligence Bootstrap

**Elements**:
- Learning trigger point identification
- Failure transformation documentation templates
- Pattern extraction and reuse systems
- Knowledge synthesis frameworks
- Automated learning enforcement hooks

### 7. Project-Specific Integration

When project name is provided:
- Initialize git repository with compound engineering hooks
- Set up development environment with learning integration
- Configure quality assurance with learning capture
- Establish three-lane architecture with agent specialization
- Create project-specific learning sections

## Compound Engineering Templates

**Universal Foundation**: Base compound engineering system (llms.txt + AGENTS.md + CLAUDE.md)
**Drupal Enterprise**: Drupal-specific compound engineering with CMS learning patterns
**Municipal Portal**: GPZH-style compound engineering with government compliance
**Learning Laboratory**: Pure compound intelligence development and experimentation
**Multi-Technology Stack**: Complex system compound engineering (e.g., Drupal + Vite + Storybook)

### Template Selection Logic
- **New Project**: Start with Universal Foundation, add domain-specific layers
- **Existing Project**: Retrofit compound engineering into current architecture
- **Complex System**: Use Multi-Technology template with specialized agent coordination
- **Government/Enterprise**: Add compliance and security learning patterns

## Arguments
**$ARGUMENTS**: 'compound', 'agents-md', 'llms-foundation', 'learning-system', 'project <name>', 'environment', 'agent <type>', 'demo <project-name>'

## Implementation Approach

### Phase 1: Analysis & Context Creation
1. **Repository Analysis**: Scan project structure, identify patterns, map dependencies
2. **Goal Extraction**: Document main purposes and high-level objectives  
3. **Function Cataloging**: List all functions with parameters, types, and explanations
4. **Architecture Mapping**: Create ASCII diagram of relationships and data flows
5. **Pattern Documentation**: Extract code style, data formats, development insights
6. **DRY Consolidation**: Eliminate redundancy, create single source of truth

### Phase 2: AI Ecosystem Setup
1. **AGENTS.md Creation**: Universal AI assistant configuration
2. **Symlink Creation**: Connect all AI assistants to single source of truth
3. **Directory Structure**: Set up reports/ and temp/ organization
4. **Configuration Analysis**: Document exact commands, not assumptions
5. **Agent Discovery**: Identify available specialized subagents
6. **Integration Documentation**: Connect compound engineering with practical setup

### Phase 3: Compound Intelligence Architecture
1. **Learning System**: Establish CLAUDE.md/compound engineering base
2. **Four-Phase Framework**: Document methodology application
3. **Prevention System**: Create bug-to-rule transformation templates
4. **Agent Framework**: Define meta-learning and specialized coordination
5. **Quality Gates**: Set up automated learning validation
6. **Knowledge Synthesis**: Enable cross-domain learning combination

### Phase 4: Project Integration & Validation
1. **Environment Setup**: Configure development with AI integration
2. **Workflow Integration**: Connect compound engineering with daily development
3. **Learning Triggers**: Activate failure-to-learning conversion points
4. **Pattern Extraction**: Create solution-to-pattern transformation mechanisms
5. **Validation Framework**: Measure learning effectiveness and compound growth
6. **Documentation Completion**: Finalize comprehensive setup documentation

## Quality Gates

### Foundation Level
- [ ] Repository analysis completed with comprehensive context capture
- [ ] AGENTS.md created with project-specific, accurate information
- [ ] All AI assistant symlinks created and functional
- [ ] Directory structure established (reports/, temp/)
- [ ] llms.txt provides comprehensive project context
- [ ] Four-phase methodology documented and understood

### Implementation Level  
- [ ] Bug-to-rule prevention system operational
- [ ] Learning trigger points identified and active
- [ ] Pattern extraction and reuse mechanisms functional
- [ ] Automated learning enforcement hooks installed
- [ ] Agent delegation documented and accessible

### Intelligence Level
- [ ] Compound learning demonstrably accumulating
- [ ] Cross-domain knowledge synthesis occurring
- [ ] Specialized agent coordination effective
- [ ] Knowledge transfer and onboarding optimized
- [ ] AI assistant ecosystem fully integrated

### Validation Level
- [ ] All commands documented are accurate and tested
- [ ] Symlinks functional across all AI assistants
- [ ] Reports directory structure operational
- [ ] Learning documentation completeness verified
- [ ] Prevention rule effectiveness measured
- [ ] Compound intelligence growth quantified

## Success Criteria

A successful initialization should result in:
1. **Immediate AI Assistant Compatibility**: All major AI coding assistants work seamlessly
2. **Accurate Documentation**: Commands and setup reflect actual project structure
3. **Learning Foundation**: Compound engineering principles embedded from day one
4. **Organized Structure**: Clear separation of reports, temporary files, and configuration
5. **Scalable Framework**: System grows with project complexity and team needs
6. **Quality Assurance**: Automated validation and learning capture mechanisms active