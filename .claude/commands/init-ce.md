You are an AI assistant tasked with setting up a project for compounding engineering practices. Your goal is to analyze the given project directory, create necessary files and structures, and implement systems for continuous learning and improvement. Follow these instructions carefully:

1. Analyze the project directory. Identify the primary framework, database system, CSS framework, authentication system, testing framework, and deployment strategy by examining configuration files and dependencies. Use all needed agents. Work in parallel to get your work done faster.

2. Create a file named "llms.txt" in the top-level folder of {{PROJECT_DIRECTORY}}. This file should contain:
   - A summary of the detected technology stack
   - High-level goals for each main component
   - List of functions with their parameters, types, and concise explanations
   - ASCII map of connections between files
   - Conclusions about the current structure, code style guide, and data formats
   - Insights from the perspective of a veteran software developer
     Keep the content concise and adhere to the Don't Repeat Yourself (DRY) principle.

3. Enhance the existing CLAUDE.md file by adding the following compounding engineering principles. If no Claude.md exists, use /init to init the Claude.md first. Add these sections:

## Compounding Engineering Framework

### The 5-Step Framework
1. **Teach Through Work** - Capture architectural decisions and patterns as they emerge
2. **Turn Failures into Upgrades** - Convert every bug into a test and prevention rule
3. **Parallel AI Orchestration** - Use multiple agents for planning, implementation, and review
4. **Lean Context** - Maintain focused, project-specific AI guidance
5. **Trust but Verify** - Enable AI autonomy with validation checkpoints

### Subagent Architecture
- **Executor/Evaluator Loop**: One agent implements, another reviews
- **Opponent Processors**: Two agents argue different perspectives for better decisions
- **Feedback Codifier**: Learns from code review comments and patterns automatically
- **Research Agent**: Explores similar projects and solutions in parallel
- **Log Investigator**: Specialized parsing of error logs and extracting insights

### Development Workflow Transformation
**From**: Developer writes code → Code review → Deploy
**To**: AI writes tests → AI iterates on implementation → AI refines based on failures → Human validates

### Test-Driven Development (Required)
- Every feature must start with tests
- Failed tests generate new rules to prevent similar issues
- Tests become smarter over time by learning from failures
- Systematic failure analysis creates compounding improvements

### Learning Loop Integration
- Every interaction becomes a lesson for future development
- Capture context in CLAUDE.md for AI agents
- Make implicit knowledge explicit and permanent
- Knowledge survives team changes and accumulates over time

### Quality Assurance Evolution
- Code reviews feed patterns back into development standards
- Performance and security practices evolve based on discovered patterns
- Higher pre-production bug detection rates through systematic analysis

### Frontend Testing Requirements
- **Playwright MCP Integration**: All UI components must be tested with Playwright MCP for browser automation
- **Storybook Component Testing**: Every frontend component requires Storybook stories and visual regression tests
- **Accessibility Compliance**: Automated a11y testing integrated into development workflow
- **Cross-browser Validation**: Components tested across major browsers automatically

4. Create the following learning infrastructure:
   - Directories: .claude/learning/, .claude/learning/decisions/, .claude/learning/patterns/, .claude/learning/failures/
   - Files: .claude/hooks/ for automated learning capture, .claude/templates/ for improvement documentation

5. Generate a comprehensive setup report including:
   - Technology stack analysis
   - Compounding engineering implementation details
   - List of files created/updated
   - Active learning loops with TDD integration
   - Next steps for feedback codifier setup
   - Expected compounding effects

Ensure that your final output contains only the content within these tags. Do not include any additional commentary or explanations outside of these specified sections.