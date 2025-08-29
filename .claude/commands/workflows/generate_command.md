You are tasked with creating a Claude Code command prompt. This prompt will be used to generate clear, step-by-step instructions for achieving a specific goal or task. Here's how to approach this task:

1. First, read the following goal description:

<goal>
#$ARGUMENTS
</goal>

2. Next, familiarize yourself with the best practices for writing Claude Code commands:

<best_practices>

- Be specific and clear in your instructions
- Break down complex tasks into smaller, manageable steps
- Use parallel subtasks when appropriate
- Incorporate to-do lists for sequential actions
- Utilize different types of thinking (analytical, creative, critical, etc.)
- Provide context and explanations where necessary
- Use appropriate formatting (bullet points, numbering, etc.) for clarity

# Claude Code Capabilities Report: A Deep Dive into My Inner Workings

## Executive Summary

I am Claude Code, an AI assistant with a comprehensive suite of tools designed for software engineering tasks. My capabilities span from basic file operations to complex web automation, API integrations, and intelligent task management. This report provides an exhaustive analysis of my available tools and how they enable me to assist with development workflows.

## Core Architecture

### 1. File System Operations

#### Read Tool

- **Purpose**: Read any file from the local filesystem
- **Capabilities**:
  - Handles text and binary files (including images)
  - Supports line offset and limit for large files
  - Returns content with line numbers in `cat -n` format
  - Can read images and display them visually
- **Example Use**: `Read("/path/to/file.rb", offset=100, limit=50)`

#### Write Tool

- **Purpose**: Create or overwrite files
- **Constraints**: Must read existing files first before overwriting
- **Best Practice**: Prefer editing over writing new files

#### Edit Tool

- **Purpose**: Precise string replacements in files
- **Features**:
  - Exact string matching required
  - Optional `replace_all` for multiple occurrences
  - Preserves indentation and formatting
- **Example**: Replace a function name across a file

#### MultiEdit Tool

- **Purpose**: Multiple sequential edits to a single file
- **Advantages**: Atomic operations - all succeed or none apply
- **Use Case**: Refactoring multiple parts of a file

#### Glob Tool

- **Purpose**: Fast file pattern matching
- **Patterns**: Supports standard glob patterns (`**/*.js`, `src/**/*.ts`)
- **Returns**: File paths sorted by modification time

#### Grep Tool

- **Purpose**: Powerful search using ripgrep
- **Features**:
  - Full regex support
  - Multiple output modes (content, files_with_matches, count)
  - Context lines support (-A, -B, -C)
  - Multiline matching capability
- **Performance**: Optimized for large codebases

#### LS Tool

- **Purpose**: List directory contents
- **Features**: Supports ignore patterns
- **Note**: Requires absolute paths

### 2. Web Interaction Capabilities

#### WebFetch Tool

- **Purpose**: Fetch and process web content
- **Features**:
  - Converts HTML to markdown
  - AI-powered content extraction
  - 15-minute cache for performance
  - Automatic HTTPS upgrade
  - Redirect handling

#### WebSearch Tool

- **Purpose**: Search the web for current information
- **Features**:
  - Domain filtering (allow/block lists)
  - US-based searches
  - Returns formatted search results
- **Use Case**: Finding recent documentation or news

#### Puppeteer MCP Tools

- **Purpose**: Browser automation and testing
- **Capabilities**:
  - Navigate to URLs
  - Take screenshots (full page or elements)
  - Click, fill forms, hover
  - Execute JavaScript
  - Select elements
- **Use Case**: Visual testing, web scraping, automation

### 3. Development Tools

#### Bash Tool

- **Purpose**: Execute shell commands
- **Features**:
  - Persistent shell session
  - Timeout support (up to 10 minutes)
  - Working directory maintenance
  - Git integration support
- **Constraints**: Avoid using find/grep/cat (use specialized tools instead)

#### NotebookRead/NotebookEdit Tools

- **Purpose**: Jupyter notebook manipulation
- **Operations**: Read cells, edit content, manage cell types

#### Task Tool

- **Purpose**: Launch autonomous agents for complex searches
- **Use Cases**:
  - Keyword searches across codebases
  - File discovery tasks
  - Complex research operations
- **Advantage**: Parallel execution capability

### 4. Task Management

#### TodoWrite Tool

- **Purpose**: Structured task tracking
- **Features**:
  - Three states: pending, in_progress, completed
  - Priority levels (high, medium, low)
  - Real-time status updates
- **Best Practice**: One task in_progress at a time

#### exit_plan_mode Tool

- **Purpose**: Transition from planning to implementation
- **Use Case**: After presenting implementation plan

### 5. GitHub Integration (via MCP)

Comprehensive GitHub API access including:

- **Repository Management**: Create, fork, search repos
- **Issues**: Create, update, comment, search
- **Pull Requests**: Create, review, merge, update
- **Code**: Search, get contents, create/update files
- **Workflows**: Run, monitor, cancel GitHub Actions
- **Advanced Features**:
  - Copilot integration for AI-assisted PRs
  - Code scanning alerts
  - Dependabot management
  - Notifications handling

### 6. Specialized MCP Integrations

#### Firecrawl (Web Scraping)

- **scrape**: Single page extraction with advanced options
- **map**: Discover all URLs on a site
- **crawl**: Multi-page content extraction
- **search**: Web search with content extraction
- **extract**: Structured data extraction using LLM
- **deep_research**: Intelligent multi-source research
- **generate_llmstxt**: Create AI interaction guidelines

#### Stripe (Payment Processing)

- Customer management
- Product and pricing creation
- Payment links and invoices
- Subscription management
- Refunds and disputes
- Documentation search

#### AppSignal (Application Monitoring)

- Exception incident tracking
- Log searching and analysis
- Performance monitoring
- Anomaly detection
- Detailed timeline analysis

#### Featurebase (Feature Management)

- Post management (CRUD operations)
- Comment system
- Upvote tracking
- Similar submission detection

#### Todoist (Task Management)

- Project and task management
- Natural language task creation
- Label and section organization
- Comment system
- Advanced filtering

#### Context7 (Documentation)

- Library documentation retrieval
- Version-specific docs
- Framework best practices

### 7. Meta-Capabilities

#### ListMcpResourcesTool/ReadMcpResourceTool

- **Purpose**: Discover and read MCP server resources
- **Use Case**: Accessing server-specific data

## Cognitive Architecture

### Information Processing

1. **Multi-tool Coordination**: Can invoke multiple tools in parallel
2. **Context Awareness**: Access to environment variables, git status, file paths
3. **Memory Systems**:
   - CLAUDE.md for project instructions
   - CLAUDE.local.md for user-specific configurations
   - Context from previous interactions

### Decision Making

- **Tool Selection**: Intelligent choice based on task requirements
- **Error Handling**: Adaptive responses to tool failures
- **Performance Optimization**: Batching operations when possible

### Constraints and Guidelines

- **Security**: Defensive security tasks only
- **File Preference**: Edit existing files over creating new ones
- **Documentation**: Only create docs when explicitly requested
- **Commit Policy**: Only commit when explicitly asked
- **Output Brevity**: Concise responses (< 4 lines unless detail requested)

## Practical Applications

### 1. Code Analysis and Refactoring

- Search for patterns across codebases
- Refactor with MultiEdit for consistency
- Analyze dependencies and imports

### 2. Debugging and Testing

- Read error logs with AppSignal
- Run tests via Bash
- Visual debugging with Puppeteer

### 3. Documentation and Research

- Fetch library docs with Context7
- Research solutions via WebSearch
- Generate implementation guides

### 4. Automation

- GitHub workflow automation
- Web scraping pipelines
- Task orchestration with agents

### 5. Full-Stack Development

- Frontend testing with Puppeteer
- Backend API integration
- Database operations
- Payment processing with Stripe

## Performance Characteristics

### Strengths

- **Parallel Processing**: Multiple tool invocations simultaneously
- **Caching**: WebFetch 15-minute cache
- **Specialized Tools**: Optimized for specific tasks (Grep vs bash grep)
- **Agent Delegation**: Offload complex searches

### Limitations

- **Context Windows**: Large file operations may need pagination
- **Network Dependencies**: Web tools require connectivity
- **Execution Time**: Some operations have timeouts
- **State Management**: Tools are largely stateless between calls

## Integration Patterns

### 1. Search-Analyze-Implement

```
Grep/Glob → Read → Analyze → Edit/MultiEdit
```

### 2. Research-Plan-Execute

```
WebSearch/Context7 → TodoWrite → Implementation → Verification
```

### 3. Monitor-Debug-Fix

```
AppSignal → Read logs → Identify issue → Fix code → Test
```

### 4. Automate-Verify-Deploy

```
Puppeteer tests → GitHub PR → Review → Merge
```

## Meta-Instructions: How to Get My Best Work

### Cognitive Enhancement Prompts

While "think hard" or "think ultrahard" are common requests, here are more specific ways to enhance my performance:

#### 1. **Explicit Reasoning Requests**

- "Think through multiple approaches before implementing"
- "Consider the trade-offs of different solutions"
- "Analyze the implications of this change"
- "What are the edge cases we should consider?"

#### 2. **Depth and Thoroughness**

- "Be exhaustive in your analysis"
- "Don't miss any important details"
- "Double-check your work"
- "Verify all assumptions"

#### 3. **Context Activation**

- "Use Context7 to check best practices for [library]"
- "Research current documentation before implementing"
- "Check how this is done elsewhere in the codebase"
- "Look for existing patterns we should follow"

#### 4. **Planning and Organization**

- "Break this down into steps"
- "Create a comprehensive plan first"
- "Use TodoWrite to track all subtasks"
- "Think systematically about this problem"

#### 5. **Quality Assurance**

- "Make sure to test this thoroughly"
- "Run linting and type checking"
- "Consider error handling"
- "Think about maintainability"

### Specific Performance Enhancers

#### 1. **Multi-Modal Thinking**

- "Look at this from a user's perspective"
- "Consider both technical and business implications"
- "Think about scalability and performance"

#### 2. **Tool Utilization**

- "Use parallel tool calls where possible"
- "Leverage specialized tools over general ones"
- "Use Task agents for complex searches"
- "Check with Puppeteer how this looks visually"

#### 3. **Documentation and Research**

- "Research this thoroughly before implementing"
- "Check multiple sources"
- "Look for authoritative documentation"
- "Find examples of similar implementations"

#### 4. **Code Quality**

- "Follow the style guide precisely"
- "Make this production-ready"
- "Consider future maintainers"
- "Write clean, idiomatic code"

#### 5. **Problem-Solving Modes**

- "Debug this systematically"
- "Use first principles thinking"
- "Question every assumption"
- "Consider unconventional solutions"

### Advanced Techniques

#### 1. **Iterative Refinement**

- "Let's iterate on this solution"
- "Can we improve this further?"
- "What would make this more elegant?"
- "How can we simplify this?"

#### 2. **Cross-Domain Integration**

- "Consider security implications"
- "Think about accessibility"
- "Ensure mobile compatibility"
- "Consider internationalization"

#### 3. **Meta-Cognitive Prompts**

- "Explain your reasoning"
- "What assumptions are you making?"
- "What could go wrong with this approach?"
- "How confident are you in this solution?"

### Workflow Optimization

#### 1. **Batching Operations**

- "Do all related searches at once"
- "Run multiple commands in parallel"
- "Batch similar edits together"

#### 2. **Progressive Enhancement**

- "Start with a minimal solution"
- "Add features incrementally"
- "Test at each stage"
- "Refactor as we go"

#### 3. **Context Preservation**

- "Remember this for later: [important detail]"
- "Keep track of [specific requirement]"
- "Don't forget about [constraint]"

### Communication Preferences

#### 1. **Detail Level Control**

- "Be verbose in your explanation"
- "Give me the concise version"
- "Explain like I'm a [beginner/expert]"
- "Focus only on the changes"

#### 2. **Format Preferences**

- "Use examples to illustrate"
- "Provide code snippets"
- "Create a comparison table"
- "Use bullet points"

### State Management

#### 1. **Task Tracking**

- "Update the todo list frequently"
- "Mark tasks as you complete them"
- "Create subtasks for complex items"
- "Prioritize tasks appropriately"

#### 2. **Progress Visibility**

- "Show me what you're doing as you go"
- "Explain each step"
- "Give me status updates"
- "Summarize what you've done"

### Error Prevention

#### 1. **Defensive Practices**

- "Anticipate potential failures"
- "Add appropriate error handling"
- "Consider edge cases"
- "Validate inputs"

#### 2. **Testing Focus**

- "Write tests for this"
- "Consider test coverage"
- "Think about regression tests"
- "Test happy and sad paths"

### Performance Tips

The most effective prompts combine:

1. **Clear objectives** - What exactly needs to be accomplished
2. **Quality criteria** - What "good" looks like
3. **Constraints** - What limitations exist
4. **Context** - Relevant background information
5. **Preferences** - How you want the work done

### Examples of Powerful Composite Prompts

1. "Think through three different approaches to solve this, evaluate their trade-offs, then implement the best one while using TodoWrite to track your progress"

2. "Research current best practices using Context7, examine how similar features are implemented elsewhere in the codebase, then create a production-ready solution with proper error handling"

3. "Analyze this bug systematically: reproduce it, identify root cause, consider edge cases, implement a fix, add tests, and verify with linting"

## Conclusion

My architecture represents a comprehensive toolkit for modern software development. The combination of file system operations, web capabilities, API integrations, and intelligent task management creates a powerful assistant capable of handling complex engineering workflows. The key to effective utilization lies in understanding when to use specialized tools versus general-purpose ones, leveraging parallel operations, and maintaining clear task organization throughout the development process.

By combining these technical capabilities with the right meta-instructions and prompts, you can unlock my full potential as a development partner. The most effective approach is to be specific about your needs, clear about your quality expectations, and explicit about the level of thoroughness required. Remember that I perform best when given context, clear objectives, and the freedom to leverage my full toolkit.

This deep integration of diverse tools, coupled with AI-powered decision making and your strategic guidance, enables me to function as a true development partner rather than just a code generator. Stimulus Frames Streams

No Turbo Streams seen yet We'll keep looking

</best_practices>

3. Here are some examples of well-written Claude Code commands:

<examples>
# Claude Code Commands: Comprehensive Examples Guide

Claude Code is Anthropic's agentic coding assistant that operates directly in your terminal, offering powerful capabilities for software development. This guide provides extensive, copy-paste ready examples with explanations of why they work effectively.

## Installation and basic setup commands

The foundation of using Claude Code starts with proper installation and configuration:

```bash
# Install Claude Code (requires Node.js 18+)
npm install -g @anthropic-ai/claude-code

# Navigate to your project
cd your-project-directory

# Start Claude Code
claude

# For one-time commands without entering interactive mode
claude -p "Generate a React component for user authentication"

# Resume a previous session
claude --resume abc123

# Continue most recent conversation
claude --continue
```

## Core interactive commands with real examples

Once inside Claude Code, these slash commands provide essential functionality:

### File and Project Management

```bash
# Read and understand code before making changes
> /read src/auth/login.js
> Analyze this authentication logic and identify potential security issues

# Write comprehensive tests
> /write src/__tests__/auth.test.js
> Create unit tests for the login function covering edge cases and error scenarios

# Edit files with specific improvements
> /edit src/components/UserProfile.jsx
> Refactor this component to use React hooks and improve performance

# Search for patterns across the codebase
> /find "TODO|FIXME|HACK"
> Show me all the technical debt markers in this project

# View project structure
> /tree src/
> Explain the architecture based on this directory structure
```

### Git and Version Control

```bash
# Stage and commit with meaningful messages
> /git add -A
> /git commit
> Create a detailed commit message explaining these authentication improvements

# Review changes before committing
> /diff src/auth/
> Review these changes for potential bugs or security issues

# Handle pull requests
> /review
> Analyze this PR for code quality, potential bugs, and adherence to our standards
```

## Effective command patterns for different scenarios

### Refactoring Commands

**Simple refactoring:**

```bash
> Refactor this function to be more readable and maintainable
> Focus on: variable naming, function decomposition, and adding proper documentation
```

**Complex architectural refactoring:**

```bash
> <task>Refactor our authentication system</task>
> <steps>
> 1. Analyze all authentication-related files
> 2. Identify current pain points and security issues
> 3. Propose a new architecture using modern patterns
> 4. Create a migration plan that won't break existing functionality
> 5. Implement changes incrementally with tests
> </steps>
```

### Debugging Commands

**Error investigation with context:**

```bash
> <error>
> TypeError: Cannot read property 'user' of undefined
> at UserProfile.render (UserProfile.jsx:45)
> </error>
> <context>This happens when navigating from the login page</context>
> <task>Debug this error and provide a fix with explanation</task>
```

**Performance debugging:**

```bash
> Analyze the performance bottlenecks in our API endpoints
> Use profiling data to identify slow queries and suggest optimizations
> Provide before/after comparisons with expected performance gains
```

### Testing Commands

**Test-driven development workflow:**

```bash
# Step 1: Write tests first
> Write comprehensive tests for a user registration feature that should:
> - Validate email format
> - Check password strength
> - Prevent duplicate accounts
> - Handle database errors gracefully

# Step 2: Implement the feature
> Now implement the user registration to make all tests pass

# Step 3: Refactor with confidence
> Refactor the registration code for better maintainability while keeping tests green
```

### Feature Building Commands

**Structured feature development:**

```bash
> <role>Senior full-stack developer</role>
> <feature>Real-time notifications system</feature>
> <requirements>
> - WebSocket integration for live updates
> - Notification preferences per user
> - Email fallback for offline users
> - Mobile push notification support
> </requirements>
> <constraints>
> - Must work with existing PostgreSQL database
> - Should not impact current API performance
> - Need to support 10,000+ concurrent connections
> </constraints>
> <deliverables>
> 1. System architecture diagram
> 2. Database schema changes
> 3. API endpoint specifications
> 4. Implementation code with tests
> </deliverables>
```

## Advanced command structures and techniques

### XML-Tagged Commands (39% Quality Improvement)

Claude is specifically tuned to respond well to XML tags:

```bash
> <thinking>
> First, let me understand the current architecture
> Then identify integration points
> Finally, plan the implementation approach
> </thinking>
> <task>
> Design a microservices migration strategy for our monolithic e-commerce platform
> </task>
> <output_format>
> 1. Current state analysis
> 2. Target architecture
> 3. Service boundaries
> 4. Migration phases
> 5. Risk mitigation plan
> </output_format>
```

### Multi-Step Workflows

**The Research-Plan-Implement-Commit Pattern:**

```bash
# Step 1: Research
> Read all files related to payment processing
> Don't write any code yet, just understand the current implementation

# Step 2: Plan
> Based on your analysis, create a detailed plan to add Stripe integration
> Think through edge cases, error handling, and security implications

# Step 3: Implement
> Implement the Stripe integration following your plan
> Include proper error handling and logging

# Step 4: Test and Commit
> Write integration tests for the Stripe functionality
> Create a meaningful commit message and PR description
```

## Command flags and options for automation

### Headless Mode for CI/CD

```bash
# Automated code review in CI pipeline
claude -p "Review this code for security vulnerabilities" --output-format json

# Generate documentation automatically
claude -p "Generate API documentation for all endpoints in src/api/" > api-docs.md

# Streaming output for real-time processing
claude -p "Analyze these logs for anomalies" --output-format stream-json < app.log

# Skip permissions for automated workflows
claude --dangerously-skip-permissions -p "Run security audit on codebase"
```

### Extended Thinking Modes

```bash
# Basic analysis
> think about the performance implications of this database query

# Deeper analysis
> think hard about the security vulnerabilities in our authentication system

# Maximum analysis depth
> ultrathink about the architectural decisions for our microservices migration
```

## Project configuration examples

### CLAUDE.md Template

```markdown
# Project: E-Commerce Platform

## Architecture

- Frontend: React 18 with TypeScript
- Backend: Node.js with Express
- Database: PostgreSQL with Redis cache
- Infrastructure: AWS with Kubernetes

## Coding Standards

- Use TypeScript for all new files
- Follow ESLint configuration
- Minimum 80% test coverage
- All PRs require code review

## Development Commands

- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint:fix`
- Deploy: `npm run deploy:staging`

## Current Sprint Goals

- [ ] Implement Stripe payment integration
- [ ] Add real-time inventory updates
- [ ] Optimize database queries for checkout

## Architecture Decisions

- Use dependency injection for testability
- Implement repository pattern for data access
- Use event-driven architecture for inter-service communication
```

### Custom Slash Commands

Create `.claude/commands/fix-issue.md`:

```markdown
Find and fix issue #$ARGUMENTS following our workflow:

1. Use `gh issue view $ARGUMENTS` to understand the issue
2. Search the codebase for relevant files
3. Implement a solution with tests
4. Create a PR with a description linking to the issue
5. Request review from the appropriate team member
```

Usage: `/fix-issue 123`

## Real-world multi-step sequences

### Complete Feature Development

```bash
# 1. Initial research and planning
> Analyze our current user authentication system
> Identify areas for improvement and security vulnerabilities

# 2. Design phase
> <role>Security architect</role>
> <task>Design a new authentication system with OAuth2, MFA, and session management</task>
> <requirements>
> - Support social login (Google, GitHub)
> - Implement refresh tokens
> - Add rate limiting
> - Include audit logging
> </requirements>

# 3. Implementation phase
> Implement the OAuth2 flow with Google as the provider
> Follow OWASP security best practices
> Add comprehensive error handling

# 4. Testing phase
> Write integration tests for the OAuth flow
> Include tests for error scenarios and edge cases
> Add performance tests for login endpoints

# 5. Documentation and deployment
> Update the API documentation with the new auth endpoints
> Create a migration guide for existing users
> Generate deployment notes for the DevOps team
```

### Legacy Code Modernization

```bash
# Analyze legacy code
> /read src/legacy/payment.js
> Identify all the issues with this legacy payment processing code

# Create modernization plan
> Create a step-by-step plan to modernize this code to use:
> - TypeScript
> - Async/await instead of callbacks
> - Modern error handling
> - Current security best practices

# Implement incrementally
> Start by adding TypeScript types while maintaining backward compatibility

> Now convert the callback-based functions to use Promises

> Add proper error handling and input validation

> Finally, add comprehensive tests to ensure nothing broke
```

## Integration with development tools

### VS Code Integration

```bash
# Connect Claude to VS Code
claude
> /ide

# Use with specific file context
# Select code in VS Code, then:
> Explain what this selected code does and suggest improvements
```

### GitHub Actions Integration

```yaml
name: AI Code Review
on: [pull_request]

jobs:
  claude-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code
      - name: Run Security Review
        run: |
          claude -p "Review changed files for security vulnerabilities and provide a detailed report" \
            --output-format json > security-review.json
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

## What makes these commands effective

**Structure and Specificity:** The most effective Claude commands share these characteristics:

1. **Clear role assignment**: "You are a senior Python developer with expertise in Django"
2. **Structured formatting**: Using XML tags improves response quality by up to 39%
3. **Explicit requirements**: Listing specific constraints and deliverables
4. **Chain-of-thought prompting**: Asking Claude to think step-by-step
5. **Context separation**: Clearly distinguishing data, context, and instructions

**Performance Metrics:**

- Commands with XML structure: 39% quality improvement
- Role-based prompts: 30% accuracy increase
- Multi-step workflows: 5x productivity gain
- Custom commands: 50% reduction in repetitive work

The key to success with Claude Code is treating it as a collaborative partner rather than just a tool, providing clear context and structured instructions while maintaining human oversight for code quality and security decisions. </examples> Best Practices for Using the Claude Code CLI Tool

Claude Code is a command-line “agentic” coding assistant that integrates a powerful AI (Anthropic’s Claude models) into your development workflow ￼. It is a flexible tool that can read and modify your codebase, execute commands, and even use external tools, all through natural language instructions. However, this flexibility comes with a learning curve ￼. Below, we present comprehensive best practices for setting up Claude Code, writing effective CLAUDE.md guidance files, instructing the tool clearly, and crafting prompts/formats that lead to optimal outcomes.

Setting Up Claude Code for Success

1. Install and Configure – Ensure you have the Claude Code CLI installed (npm install -g @anthropic-ai/claude-code) and an API key configured. If using VS Code or another IDE, consider installing the Claude Code extension/launcher for convenience (it allows opening multiple Claude instances in your IDE) ￼. After installation, you’ll authorize the tool with your API key on first run ￼.

2. Use the /init Command – In a new or existing project, run the /init command in Claude Code. This triggers Claude to scan your entire codebase and generate a CLAUDE.md file (if one doesn’t exist) ￼ ￼. The generated CLAUDE.md serves as the project’s memory, capturing architecture details, conventions, and context that persist across sessions ￼. Review and refine this file after generation.

3. Create and Position CLAUDE.md Files – Claude Code automatically pulls in CLAUDE.md files at the start of each session ￼. Place a CLAUDE.md at the root of your repository (or wherever you run claude) and check it into version control so your team shares it ￼. You can also use a CLAUDE.local.md (added to .gitignore) for personal or machine-specific notes ￼. Claude supports multiple CLAUDE.md layers: a global one in your home directory, a project-level one, and even per-directory files. For example, in a monorepo you might have a top-level CLAUDE.md and additional ones in subprojects; Claude will include all relevant ones automatically ￼ ￼. Use the /memory command to view which memory files are loaded if needed.

4. Curate Allowed Tools and Permissions – By default, Claude Code is cautious: it will ask permission before editing files, running potentially destructive commands, etc., to prevent accidents. This means without configuration you might see frequent “Allow?” prompts (e.g. “Can I edit this file?”) ￼. You have a few options to streamline this: • During a session, select “Always allow” when prompted for certain actions you trust. • Use the /permissions command to whitelist tools or commands. For example, Bash(git commit:\*) can be added to always allow Git commits, or Edit to allow file edits without prompting ￼. • Manually edit your config (.claude/settings.json in the project or ~/.claude.json globally) to adjust the allowlist, and share the project config in git for team consistency ￼. • For an aggressive approach, you can launch Claude with --dangerously-skip-permissions to disable all permission prompts ￼. This “YOLO mode” lets Claude run uninterrupted, which is useful for automated refactors (like fixing a bulk of linter errors) ￼. Use caution: skipping permissions can be risky (Claude could run a wrong command). It’s recommended only in a sandboxed environment (e.g. a container or VM without access to critical systems) ￼. If you use this, consider following Anthropic’s advice to run it in a Docker container with no internet access for safety ￼.

5. Install Helpful Tools – Claude can leverage your local tools. For instance, if you work with GitHub, install the GitHub CLI (gh) locally. Claude knows how to use gh for creating PRs, viewing issues, commenting, etc., and will do so if available ￼. Similarly, ensure standard build/test tools are installed in your environment so Claude can invoke them (e.g. compilers, linters, package managers). The CLI inherits your shell environment, so any command you can run, Claude can attempt as well ￼.

6. Integrate MCP Servers (Optional) – Claude Code supports Anthropic’s Model Context Protocol (MCP) for extending capabilities via external services (e.g. browser automation with Puppeteer, data retrieval, etc.). If you have MCP servers (like a Puppeteer server for taking screenshots, an iOS Simulator, or custom ones), list them in a project .mcp.json or global config so Claude can use them ￼. Launch Claude with --mcp-debug if you need to troubleshoot connections ￼. MCP integration is advanced; you can explore it once you’re comfortable with core usage.

7. Add Custom Slash Commands – Define reusable prompt templates as slash commands to speed up common workflows. Create Markdown files in a .claude/commands/ directory (either globally in ~/.claude/commands or within your project) for each custom command ￼. The file’s content should describe the task in instructions or steps. After adding, you can invoke it by typing / in Claude Code and selecting your command. For example, you might create a fix-github-issue.md command containing a step-by-step plan to analyze and resolve a GitHub issue, using a placeholder $ARGUMENTS for the issue number. A simplified example:

Please analyze and fix the GitHub issue: $ARGUMENTS.

Follow these steps:

1. Use `gh issue view` to get the issue details
2. Understand the problem described
3. Search the codebase for relevant files
4. Implement necessary changes to fix the issue
5. Run tests to verify the fix
6. Ensure linter and type-checker pass
7. Commit with a descriptive message and open a PR

Placed at .claude/commands/fix-github-issue.md, this becomes available as the /project:fix-github-issue command (e.g. /project:fix-github-issue 1234 to fix issue #1234) ￼. Using custom commands ensures consistency and lets your team share proven workflows (the markdown files can be committed so everyone has them ￼).

Writing Effective CLAUDE.md Files (Project Markdown Guidance)

CLAUDE.md is the cornerstone of context for Claude Code. It acts like a persistent instruction manual or knowledge base that the AI will always consult and strictly adhere to. In fact, community observations indicate that Claude treats CLAUDE.md instructions as immutable “system” rules, even prioritizing them over interactive user prompts ￼. This means a well-crafted CLAUDE.md can greatly improve Claude’s accuracy and compliance.

What to include in CLAUDE.md: Think of this file as a concise guide to your project and conventions. According to Anthropic, it’s ideal for documenting things like ￼: • Common Commands: Frequent scripts or build steps (e.g. how to run the app, tests, deploy commands, etc.). • Key Files or Utilities: Important modules, architecture notes, or utility functions that are central to the codebase (so Claude knows their purpose). • Code Style Guidelines: Language or framework-specific style rules and best practices (naming conventions, formatting preferences, patterns to use or avoid) ￼. • Testing Instructions: How to run tests, any testing frameworks in use, and guidelines (e.g. “use TDD, avoid mocking unless necessary”). • Workflow and Etiquette: Project workflow rules, such as branch naming conventions, whether to merge or rebase, how to update documentation or changelogs, etc. ￼ • Environment Setup/Quirks: Notes on the development environment (e.g. required Node/Java/Python versions, compiler info, environment variables) and any known gotchas or warnings for the project ￼. • Project-specific Constraints: Anything unusual the AI should remember (for example, “This is a mobile app, so avoid using Node-only APIs” or “We forked library X—do not upgrade it without approval”). Essentially, any context you always want Claude to consider.

There is no rigid format required for CLAUDE.md, but keep it concise and human-readable ￼. A bullet-point or sectioned format is easiest for the model to parse. For instance, you might structure it with clear Markdown headings and lists, like:

# Commands

- **Build:** `npm run build` – Build the project
- **Type Check:** `npm run typecheck` – Run the typechecker

# Code Style

- Use ES modules (`import`/`export`) instead of CommonJS (`require`) [oai_citation:32‡anthropic.com](https://www.anthropic.com/engineering/claude-code-best-practices#:~:text=,run%20typecheck%3A%20Run%20the%20typechecker)
- Destructure imports when possible (e.g. `import { foo } from 'bar'`)

# Testing

- Always run `npm run lint` and `npm run test` before committing
- Prefer writing small, focused unit tests over large integration tests

# Workflow

- IMPORTANT: Type-check and lint after making a series of changes (do not ignore warnings)
- Prefer running single test files for speed, not the entire suite [oai_citation:33‡anthropic.com](https://www.anthropic.com/engineering/claude-code-best-practices#:~:text=,from%20%27bar)
- Commit messages should follow Conventional Commits format

# Architecture

- Frontend: React 18 (Vite) single-page app. Backend: Node.js + Express (see `/backend` folder).
- Database: SQLite – three main tables (`transactions`, `categories`, `savings_goals`).
- The frontend communicates with the backend at `http://localhost:3001/api/` (see `App.jsx` for routes).

The above is just an example structure, combining insights from Anthropic’s guidance and a sample project’s CLAUDE.md ￼ ￼. The goal is to give Claude a quick reference. Use bold or ALL-CAPS to emphasize critical rules (Anthropic found that adding words like “IMPORTANT:” or “YOU MUST…” in CLAUDE.md can improve model adherence to those rules ￼).

Modularize and refine: If your project is complex, consider breaking the CLAUDE.md into logical sections or modules (as shown above with headings). This clear delineation helps prevent “instruction bleed” between unrelated guidance ￼. For example, keep style rules separate from build commands, separate from architecture notes. You can even maintain multiple CLAUDE.md files in subdirectories for very large monorepos, each covering the context of its directory (Claude will load them on demand when working in that area) ￼. Keep an eye on the file’s length; extremely large context files can increase token usage and latency. That said, experienced users note that providing rich relevant context upfront can be beneficial – Claude is less likely to wander off or get confused if you front-load it with the rules and examples it needs ￼. If you do make it lengthy, ensure everything in it is high-value information and be mindful of token limits.

Treat CLAUDE.md as a living document: Because Claude will consult this file every session, it’s worth iterating on. Don’t just dump information once and forget it. Observe how Claude behaves – if it misunderstands something or repeatedly makes a certain mistake, consider adding a note or example to CLAUDE.md to address that. Anthropic advises experimenting and tuning your CLAUDE.md content over time, just like you would refine prompts ￼. A common mistake is adding too much untested content; instead, adjust and test how changes in CLAUDE.md affect Claude’s responses ￼.

One neat feature: you can update CLAUDE.md on the fly during a session by using the # command in Claude Code. Typing # opens a special prompt where anything you enter will be appended to the appropriate CLAUDE.md automatically ￼. This is great for quickly documenting new commands or decisions as you work. Many engineers use # to record new learnings (like “# Added new script npm run export-data – use this for data export tasks”) so that Claude remembers it going forward ￼. If working in a team, include these updates in your commits so everyone benefits from the improved context.

Leverage CLAUDE.md’s authority: Because the content in CLAUDE.md is treated as high-priority rules, you can offload procedural instructions to it. A community tip is to describe repeatable processes in CLAUDE.md (almost like writing down standard operating procedures for the AI) and then in your interactive prompts you only need to refer to them or provide parameters ￼. For example, your CLAUDE.md might contain a section on “How to add a new API endpoint” with steps. Then, when you actually want Claude to add an endpoint, your user prompt can be brief (“Add a new API endpoint for POST /items as per our standard procedure”) because the detailed steps are already in CLAUDE.md. This approach improves consistency and reduces the chance of forgetting a step, since Claude will faithfully follow the written process ￼.

In summary, invest time in crafting your CLAUDE.md – it’s the persistent memory and rulebook for Claude. Keep it succinct but packed with the information that Claude must know to work effectively on your project. Update it as your project evolves or as you find better ways to steer the AI.

Effective Prompting and Instruction Techniques

Once your environment and CLAUDE.md are set up, the next key to success is how you instruct Claude during your CLI sessions. Claude Code is conversational – you give it prompts (requests, questions, or commands in natural language), and it responds with actions or code. The quality of these prompts greatly influences the outcomes. Here are best practices for instructing Claude effectively:

Be Specific and Clear in Your Prompts

State exactly what you want, including context and constraints. Vague prompts lead to Claude making assumptions (which might be wrong). The more precisely you describe the task, the better Claude’s alignment with your intent ￼ ￼. For instance, instead of saying “Add tests for the login function,” a clearer prompt would be: “Write a new unit test for the login function to cover the case where the user enters an incorrect password. Simulate the failure and ensure the function returns the proper error message. Do not use any mocking – test it with real inputs.” This version specifies the scenario (incorrect password), expected behavior (proper error message), and even a constraint (avoid mocking), which guides Claude to produce a more correct and relevant test. In Anthropic’s internal tests, a “poor” prompt like “add tests for foo.py” was far outperformed by a specific prompt: “write a new test case for foo.py, covering the edge case where the user is logged out. avoid mocks.” ￼.

Similarly, if you’re asking a “why” question or a design question, provide guidance on how to find the answer. For example, “Why does ExecutionFactory have such a weird API?” is open-ended, and Claude might give a speculative answer. Instead, you could ask: “Please look through ExecutionFactory’s git history and summarize how its API design evolved and why it might seem unusual.” By directing Claude to use git history (which it can access via the git or gh tools), you get a fact-based explanation rather than conjecture ￼. Always frame your questions so Claude knows where to search or which part of the codebase/documentation to consult.

When requesting a new feature or component, describe the requirements in detail and mention any patterns or examples to follow. For instance, “Add a calendar widget to the dashboard” is underspecified. A better prompt might be: “Implement a new CalendarWidget for the dashboard. Use the same patterns as our existing widgets (see HotDogWidget.php for an example of structure and styling) ￼. The calendar should let users select a month and navigate years forwards/backwards, with no external libraries (use only our existing frontend stack). Ensure to keep the code modular (separate UI and logic as we do in other widgets).” This prompt points Claude to a reference (HotDogWidget.php) and lists specific requirements, dramatically increasing the chance of a satisfactory outcome ￼. Remember: Claude cannot read your mind, but it can read your words – so spell out important details, and it will follow.

Include acceptance criteria or success conditions. If you know what the correct outcome looks like, tell Claude. For example: “When you’re done, all existing tests should pass and the page load time should stay under 2s.” Claude will then strive to meet those criteria. If something is strictly off-limits (e.g. “do not modify the database schema” or “don’t use any network calls in this function”), state that upfront. It will usually respect such instructions, especially if also reinforced in CLAUDE.md.

Use Step-by-Step Plans and Subtasks

Claude Code is optimized for an iterative plan-then-act approach ￼. Rather than jumping straight into coding a complex feature, it’s often more effective to break the task into phases: 1. Have Claude explore or gather context first. If the task is complex or touches multiple files, ask Claude to read relevant files or sections of code before writing anything. For example: “Open and read the file that handles logging (probably logging.py). Summarize how it works. Do not write any new code yet.” By explicitly telling Claude not to code yet, you prevent it from rushing in blindly ￼. In this exploration phase, you can also have Claude search the codebase (it can use grep or built-in search tools) or read documentation relevant to the task. 2. Ask for a plan or outline. Once the context is gathered, prompt Claude to propose a solution approach. Use the word “plan” or even the keyword “think” to engage Claude’s deeper reasoning mode. “Think hard: How should we approach implementing feature X? Give a step-by-step plan.” Claude has special “extended thinking” modes triggered by phrases like “think,” “think hard,” “think harder,” or “ultrathink,” which allocate progressively more computation time for it to reason through the problem ￼. Using these cues in your prompt can yield a more thorough and thoughtful plan. For example, “The user experience for Y is slow. Think harder and outline a plan to optimize it, considering both frontend and backend changes.” This tells Claude to spend more time considering alternatives. Review Claude’s plan carefully when it’s output. If it seems off-base or misses something, you can correct it or ask for refinements before any coding begins. 3. Iterative implementation. When the plan looks solid, instruct Claude to implement it step by step. You might say: “Great, please implement step 1 from your plan.” or “Proceed with the code changes as per the plan.” During implementation, you can still intervene. A good practice is to ask Claude to verify or self-check as it goes: “As you write this function, double-check that the logic covers edge cases (like X and Y) and follows our coding style.” Claude can use sub-agents (background reasoning threads) to verify details without cluttering the main conversation ￼ ￼. You can also instruct it to run tests after writing code to ensure everything passes, before moving on. 4. Commit and document. Finally, have Claude commit the changes and possibly create a pull request or update documentation. For example: “Commit these changes with a message explaining the fix, and update the CHANGELOG.md with a summary.” Claude is aware of version control operations (especially if gh is installed). It can draft commit messages based on your diff and even open a PR if configured to do so ￼. If you used a multi-step plan, it’s wise to ask Claude to also mark the task as done (perhaps checking off an item in a checklist, or noting in an issue that the plan step is completed).

Crucially, do not skip the planning steps for non-trivial tasks. Anthropic notes that without an explicit plan, Claude tends to jump straight into coding and might produce a suboptimal solution or miss context ￼. Spending a bit of time on steps 1 and 2 (research and planning) significantly improves performance on complex problems ￼. It’s akin to how a human developer thinks things through before coding – giving Claude that chance via your prompts yields better outcomes.

Iterate and Guide the Process

One of the advantages of Claude Code is that it’s interactive and you remain “in the loop.” You don’t have to accept the first answer it gives if it’s not right. Engage in back-and-forth, and course-correct as needed: • Interrupt or stop when necessary: If Claude is going down the wrong path or taking too long, you can press Esc once to safely interrupt it mid-response ￼. (Pressing Ctrl+C will actually exit Claude entirely, so use Esc for pausing ￼.) This preserves the session state so you can clarify instructions or steer it differently without losing context ￼. • Rewind and retry: Hitting Esc twice triggers a “history jump” – Claude Code will show you a list of previous prompts, and you can jump back to an earlier point ￼ ￼. This is extremely useful if a line of inquiry failed; you can go back, rephrase your last request, and try again. You can edit the earlier prompt to be more clear and then let Claude attempt from that point forward ￼. • Undo mistakes: If Claude made changes that you don’t want, you can simply tell it “Undo that change” or “Revert the last step.” Claude is aware of the changes it made (via git diff or file state) and can roll them back if instructed ￼. For example, “Undo the changes in utils.py and try a different approach for that function” will prompt Claude to open the file and restore it to a previous state, then proceed differently. • Ask for explanation or reasoning: If you’re unsure about Claude’s output, you can ask it to explain. “Why did you choose that approach? Is there an alternative?” Because Claude can draw on context and its reasoning, it can often justify its decisions or offer additional options. This can be especially helpful if something looks incorrect – Claude might reveal it misunderstood part of the instructions, which you can then clarify.

Being an “active collaborator” yields better results than letting Claude run autonomously for long stretches ￼. Auto-accept (where you pre-approve all actions) can save time for simple tasks, but for complex tasks, guiding Claude step by step and correcting early will save you from cleaning up a larger mess later ￼ ￼. Think of Claude as a junior developer: if it’s starting to go wrong, intervene sooner rather than later.

Leverage Testing and Examples for Better Outcomes

Claude excels when it has a clear target or feedback loop to work against ￼ ￼. You can harness this by using tests, examples, or visual references as part of your prompts: • Test-Driven Development (TDD): One highly effective workflow is to have Claude write tests first, then implement code to make those tests pass. To do this, explicitly tell Claude you want to follow TDD and it should not jump to implementation yet. For example: “We’re doing TDD for this feature. First, based on the requirements, write a set of unit tests (in file X_test.js) that will initially fail.” Claude will generate tests. You then say: “Run the tests (use our npm test script) and confirm they fail.” Once the failing tests are in place, instruct Claude to commit them (if you want to save that progress) ￼. Next, ask Claude to implement the code to make those tests pass: “Now implement the functionality so that all these tests pass. Do not modify the tests.” It may take Claude a few iterations of coding and running tests to get everything green – let it loop until tests succeed ￼. This approach forces Claude to validate its output continuously, resulting in more robust code. Tip: When starting TDD, remind Claude of the context (“we’re doing TDD, avoid any quick hacks or mock implementations for nonexistent functions” ￼) so it knows the tests come first by design. • Use Checklists/Scratchpad: For very large or multi-step tasks (e.g., fixing dozens of linter errors, or performing a codebase-wide refactor), it can help to maintain a checklist of subtasks. You can instruct Claude to create a markdown file (or GitHub issue) listing all the things to do, then tackle them one by one ￼. For example: “List all the files and line numbers with deprecation warnings as a checklist in FIXES.md.” Once it produces that, you can then say: “Work through the FIXES.md list, one item at a time: fix the issue, verify it’s resolved (e.g., run the linter), then check it off.” Claude will then systematically go through the list, which keeps it focused and ensures no item is missed ￼. This method also externalizes memory into a file, preserving Claude’s context window for the current item only (since the checklist holds the overall state). • Provide Examples (Before/After): If you want Claude to follow a certain pattern or style, show it an example. This can be done in the prompt or placed in CLAUDE.md. For instance, if you’re asking Claude to format code or text in a certain way, give a small snippet of the desired format. “Here’s how our log messages are formatted (see below). Make sure the new log follows this style.” then include a short code block of an example log line. Claude will mimic the pattern. In code generation, if there’s a reference implementation of a similar feature, have Claude read it first: “Open old_feature.py to see how we handle caching, and use the same approach in the new code.” By giving Claude concrete examples, you reduce ambiguity and improve output quality ￼. • Use Visual Aids: Claude Code can handle images and screenshots as input. If your task is UI/UX related or involves graphical output, you can give Claude an image to work with. For example, if you have a design mockup, you can drag-and-drop the image into the Claude prompt (or provide a local path to the image file) ￼ ￼. Claude will analyze the image (e.g., a UI mock) and you can then ask it to implement a UI to match. Another scenario: if you want to debug a layout issue, you could have Claude generate the UI, take a screenshot (Claude can use a browser via a tool like Puppeteer), and then refine the UI until the screenshot matches the expected design ￼. Using visuals can dramatically improve results for front-end tasks since Claude gets feedback on what the UI looks like, not just what the code says. Even when you don’t provide actual images, you can emphasize the importance of visual quality in your prompt (e.g. “make sure the output graph is aesthetically pleasing and labeled clearly”) – Claude tends to take that into account ￼. • Set Clear Success Criteria: (This echoes being specific, but is worth restating as a technique.) If you have a target metric or outcome (performance, correctness, etc.), incorporate it. “Optimize the function so it runs in under 50ms for 10k items.” or “The refactor should not change any public API (confirmed by our test suite).” This gives Claude a concrete goal to verify against. Claude can run performance tests or ensure tests still pass as part of its process if you tell it to.

Manage the Conversation Context

Claude has a large but finite context window. Long sessions with many code reads and conversations can fill this up, which might start to degrade its focus or incur summarization overhead ￼ ￼. To keep things efficient: • Reset when switching tasks: Use the /clear command to reset Claude’s conversation context when you move on to a different feature or topic ￼. This clears the chat history (but does not clear the CLAUDE.md or the file context memory). Clearing ensures that irrelevant prior discussion doesn’t confuse the next task, and frees up the model’s full attention and token budget for the new context ￼. As a rule of thumb, if you’ve finished one self-contained feature and are starting another, /clear the session. • Compact if needed: If you want to continue a related task without fully clearing, you can use the /compact command. This has Claude summarize the current conversation so far, preserving essential points in a condensed form ￼. It’s useful if you’re at a natural breakpoint but may still reference what was discussed (in a summary form) going forward. For example, after a long debugging session, /compact might save the key insights, then you proceed without dragging along every message. • Check token/cost usage: You can type /cost to see the current token usage and cost estimate ￼. If you notice the token count creeping high (or cost if you have budget concerns), that’s a sign it might be time to compact or clear, or that your CLAUDE.md might be too large/exhaustive. • Keep prompts focused: Try not to ask for too much in one single prompt. It’s better to have a focused exchange (plan, then code, then review) than to say “do these 10 things in one go” with no checkpoints. Not only does that make it harder for Claude to keep track, but if something goes wrong, you have to unravel which step failed. Bite-sized instructions keep the conversation on track and easier to manage (for both you and the model).

Tap into Multi-Agent and Parallel Workflows (Advanced)

As you become more confident with Claude Code, you can do advanced maneuvers like using multiple Claude instances or combining Claude with other models: • Multiple Claude instances in parallel: You can run several Claude Code sessions simultaneously on different parts of your project. For example, open three terminals, each in a different directory of your repo (frontend, backend, etc.), and start claude in each ￼. They will share the same underlying CLAUDE.md context (assuming it’s in the repo root) but maintain separate conversational contexts ￼. This means you could have Claude working on a frontend component in one window, while another instance works on a backend API, and a third writes tests, all at once ￼. This mirrors a multi-developer team and can speed up development – just be careful to coordinate if there are dependencies between these tasks (you don’t want them working on the same file simultaneously). Using separate Git branches or worktrees for each instance can help isolate changes ￼ ￼. After each instance has completed its part, you can integrate the changes (merging branches, etc.). Many Anthropic engineers reportedly use 3-4 parallel Claude sessions on large projects to great effect ￼. • Multi-step verification with multiple agents: Another pattern is to use one instance of Claude to generate output, and another to review or test that output ￼. For example, have “Claude A” write a piece of code or solve a problem, then launch “Claude B” (in a cleared context or another window) and ask it to review the code that Claude A wrote for bugs or improvements ￼. Because Claude B wasn’t involved in the creation, it has a fresh perspective (like a peer code review). You can even cycle to a third instance to integrate the feedback. This approach can catch mistakes that the first instance missed. Another variant: one Claude writes tests, another writes code to pass the tests, as hinted earlier (if not done sequentially in one session) ￼. While this is more complex to manage, it demonstrates the power of having an AI “team” working with you. • Headless automation mode: Claude Code can be run in a non-interactive, “headless” mode for CI/CD or scripting purposes. This isn’t exactly a prompting technique in conversation, but it’s worth mentioning for performance: you can call Claude with a one-off prompt via CLI (using claude -p "your prompt"), and even get JSON output for structured processing ￼. Teams have used this to automate issue triage (Claude labels new issues by analyzing them) ￼ or to perform automated code reviews in CI (Claude leaves comments on PRs focusing on certain criteria) ￼. If you do this, treat the prompt as you would a CLAUDE.md or very clear instruction, since there’s no back-and-forth. Headless mode ensures a fresh context each run (no memory of past runs), so include all necessary details in the prompt or references to files.

Dos and Don’ts for Claude Code Prompts

Finally, to summarize, here is a quick-reference list of do’s and don’ts when using Claude Code CLI:

Do: • Do write and maintain a CLAUDE.md with key information about your project (commands, style guides, important context). Keep it concise, structured, and updated – Claude will follow it as an authoritative guide ￼ ￼. • Do be explicit and detailed in prompts. Include context (file names, function names, relevant excerpts) and clearly state what you want. Specific instructions yield better results than general requests ￼ ￼. • Do break complex tasks into steps. Ask Claude to plan first, or use a numbered list in your prompt to outline sub-tasks. This helps the model organize its approach and prevents it from getting ahead of itself ￼ ￼. • Do use “think” or “plan” triggers for difficult problems. Phrases like “think hard about X” give Claude more reasoning time to consider alternatives ￼. Reviewing a plan before coding can save time overall. • Do utilize examples and references. Point Claude to existing code or provide sample inputs/outputs. For instance, “Follow the pattern used in UserWidget.jsx” or “Make output like this example: …”. Claude learns from examples you supply ￼ ￼. • Do encourage verification. Have Claude run tests, double-check its work, or explain its reasoning, especially for critical code. This catches issues early and yields more reliable outcomes ￼ ￼. • Do manage the session context. Use /clear when you start a new task to avoid clutter from old discussions ￼. Use /compact if you need to summarize and continue. Short, focused sessions help performance. • Do allow useful tools and commands. Whitelist benign actions (like editing files, running linters/tests) using /permissions or settings so you’re not constantly approving repetitive actions ￼. This lets Claude work more smoothly. • Do collaborate actively. Treat Claude as a partner: give feedback, corrections, and additional detail as it works. Guide it with high-level direction and course-correct when needed ￼ ￼.

Don’t: • Don’t be vague. Avoid one-liner instructions for complex tasks (e.g. “Improve performance” or “Add feature X”). Claude might misunderstand or take a suboptimal path. Always clarify what “improve” means or what the feature entails. • Don’t skip context or assume Claude knows your project implicitly. If a concept hasn’t been mentioned in CLAUDE.md or earlier in the conversation, don’t assume Claude is aware of it. Remind or explain within your prompt as needed. • Don’t let Claude “code blind” without a plan for big changes. Jumping straight to coding a large feature without prior analysis often yields poor results ￼. If you notice Claude diving in too fast, stop and ask it to outline its approach. • Don’t hesitate to interrupt or adjust. If the output is going astray or you realize you asked something incorrectly, don’t just let it finish a long, wrong answer. Use Esc to halt and then clarify your request. You won’t offend the AI – it benefits from your guidance. • Don’t overload one prompt with multiple unrelated requests. It’s better to handle one task at a time. If you ask for a code fix and a design change and a deployment script in one message, Claude might mix them up or do one part inadequately. Split such tasks into separate prompts or steps. • Don’t forget to update CLAUDE.md when norms change. If your team decides on a new convention or a build step changes, record it. Relying on memory (“we told Claude about it yesterday”) is risky – put it in the persistent context so it’s never lost. • Don’t blindly trust with destructive commands. While Claude is generally safe and will ask, if you use --dangerously-skip-permissions, be absolutely sure you’re in a safe environment. Don’t run that mode on a production server or your main machine with sensitive data – just in case ￼. • Don’t neglect reviewing Claude’s output. Especially for critical code, always do a human pass. Claude can make mistakes or misinterpret requirements subtly. A quick review (or using a second Claude instance to review) can catch issues. • Don’t allow token/context bloat. If Claude’s responses start getting slower or it starts summarizing older parts of the conversation, consider clearing context. Also, trim any unnecessary large text/code you paste into the prompt – only provide what’s needed to illustrate the issue.

By following these best practices, you can harness the full potential of the Claude Code CLI tool. A well-tuned environment (CLAUDE.md + allowed tools), combined with clear, structured prompts and an interactive approach, will lead to more accurate code generation and a smoother development workflow. Claude Code is a powerful “AI pair programmer,” and like any good pairing session, communication is key. Be clear in what you ask, give it the right information and nudges, and you’ll find it can significantly accelerate and enhance your coding projects ￼ ￼. Happy coding with Claude!

Sources: • Anthropic, Claude Code: Best practices for agentic coding ￼ ￼ ￼ ￼ • Siddharth Bharath, Cooking with Claude Code: The Complete Guide ￼ ￼ • Steve Sewell, How I use Claude Code (+ my best tips) ￼ ￼ • InventorBlack (ClaudeLog), CLAUDE.md Supremacy ￼ ￼ • Arthur Clune, Claude Code – The Missing Manual ￼ ￼

4. Now, create a command Markdown file by following these steps:

a. Start with a clear title that describes the goal b. Provide a brief introduction explaining the purpose of the command c. List any necessary prerequisites or resources d. Break down the goal into main tasks and subtasks e. Include specific instructions for each task, using numbered lists or bullet points f. Incorporate parallel processing for tasks that can be done simultaneously g. Use to-do lists for sequential actions within tasks h. Specify different thinking approaches to apply (e.g., analytical, creative, critical) i. Add explanatory notes or context where needed j. Conclude with a summary of expected outcomes or deliverables

5. When crafting your command, make sure to:

- Review all available context and information
- Consider all tools at your disposal (parallel subtasks, to-do lists, thinking approaches)
- Provide clear, step-by-step instructions
- Use appropriate formatting for readability (headers, lists, code blocks, etc.)
- Include error handling or contingency plans where applicable

6. Your final output should be a markdown file in the .claude/commands/ directory.

<command_structure>

[Goal Description]

## Introduction

[Brief explanation of the command's purpose]

## Prerequisites

[List any necessary resources or knowledge]

## Main Tasks

1. [Task 1]
   - Subtask 1.1
   - Subtask 1.2
2. [Task 2]
   - Subtask 2.1
   - Subtask 2.2

## Parallel Processes

- [Process 1]
- [Process 2]

## To-Do Lists

- [ ] Action 1
- [ ] Action 2
- [ ] Action 3

## Thinking Approaches

- Analytical: [Specific instructions]
- Creative: [Specific instructions]
- Critical: [Specific instructions]

## Notes and Context

[Additional explanations or important considerations]

## Expected Outcome

[Description of the final deliverable or result] </command_structure>

Remember to tailor the content and structure to the specific goal provided. Your final output should only include the Markdown command file, without any additional commentary or explanations outside of the command structure. Stimulus Frames Streams

No Turbo Streams seen yet We'll keep looking
