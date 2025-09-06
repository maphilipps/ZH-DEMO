# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **adesso CMS** - a Drupal 11-based municipal portal system designed for Swiss government websites (demonstrated with Zürich municipalities). It combines Drupal CMS with modern frontend tooling, AI integration, and municipal compliance features.

## Development Environment

**DDEV Setup (Required):**
- Use DDEV for local development: `ddev start`
- Project name: `zh-demo` (accessible at https://zh-demo.ddev.site)
- PHP 8.3, Node.js 20, MariaDB 10.11
- Composer 2 with corepack enabled

**Essential DDEV Commands:**
- `ddev start` - Start the development environment
- `ddev stop` - Stop the development environment
- `ddev restart` - Restart DDEV containers
- `ddev ssh` - SSH into the web container
- `ddev drush` - Run Drupal CLI commands
- `ddev composer` - Run Composer commands

## Theme Development

**Primary Theme:** `web/themes/custom/adesso_cms_theme`

**Development Commands (run from theme directory):**
- `ddev theme dev` - Start Vite development server with hot reload
- `ddev theme watch` - Watch mode for continuous builds
- `ddev theme build` - Production build
- `ddev theme storybook` - Start Storybook (accessible at https://zh-demo.ddev.site:6006/)

**Theme Architecture:**
- Built with Vite + Tailwind CSS v4
- Component-based with Drupal SDC (Single Directory Components)
- Storybook integration for component development
- Each component in `components/` has `.twig`, `.behavior.js`, `.css`, and `.stories.js` files

**Testing Commands:**
- `npm run test` - Run Vitest unit tests
- `npm run test:e2e` - Run Playwright end-to-end tests
- `npm run qa:full` - Complete QA suite (unit + visual + e2e)
- `npm run visual:test` - BackstopJS visual regression tests

## Content Architecture

**Recipes System:**
- Drupal recipes for modular feature installation in `recipes/`
- Municipal-specific recipes: `adesso_cms_starter`, `adesso_cms_paragraphs`
- Content types and features as installable recipes
- Export content with: `ddev export-contents`

**Custom Modules:** Located in `web/modules/custom/`
- `municipal_ai_agents` - AI integration for municipal services
- `zh_demo_*` - Municipality-specific functionality
- `adesso_cms_*` - Core CMS functionality

**Content Management:**
- Paragraph-based content building with Drupal Paragraphs
- AI-enhanced content creation and image alt-text generation
- Multilingual support (German/French for Swiss municipalities)
- Content templates and workflows

## Key Technologies

**Backend:**
- Drupal 11 with PHP 8.3
- AI integration via `drupal/ai` and Anthropic/OpenAI providers
- Vector database integration with Milvus
- Swiss government compliance modules

**Frontend:**
- Vite build system with hot module reloading
- Tailwind CSS v4 for styling
- Alpine.js for interactive components
- Storybook for component documentation

**Testing & QA:**
- Vitest for unit testing
- Playwright for E2E testing
- BackstopJS for visual regression testing
- ESLint for code quality

## Municipal Portal Features

**Compliance:**
- Swiss government standards (WCAG 2.1 AA accessibility)
- GPZH (Canton Zürich) compliance features
- Multilingual content management
- Privacy and data protection compliance

**AI Integration:**
- Content generation and editing assistance
- Automated image alt-text generation
- Municipal service chatbots and agents
- Content personalization

**Municipal Services:**
- Citizen service request management
- Event management and calendar
- Document and form management
- Municipal workflow automation

## Development Workflow

**Starting Development:**
1. `ddev start` - Start environment
2. `ddev theme dev` - Start frontend development server
3. Access site at https://zh-demo.ddev.site
4. Access Storybook at https://zh-demo.ddev.site:6006

**Component Development:**
1. Create component directory in `web/themes/custom/adesso_cms_theme/components/`
2. Add `.twig` template, `.behavior.js`, `.css`, and `.stories.js` files
3. Test in Storybook before Drupal integration
4. Run visual regression tests with `npm run visual:test`

**Database Operations:**
- `ddev drush sql:create -y` - Reset database (recreate)
- `ddev drush cr` - Clear Drupal cache
- `ddev export-contents` - Export content for recipes

**Quality Assurance:**
- Run `npm run qa:full` before committing changes
- Ensure WCAG 2.1 AA compliance for all components
- Test multilingual functionality
- Validate Swiss government standards compliance

## Architecture Notes

**Agent Ecosystem:**
- Meta-architecture document at `.claude/META_ARCHITECTURE.md`
- Specialized Claude Code agents for municipal development
- Performance monitoring and optimization systems
- Compound engineering principles for continuous improvement

**Scaling Considerations:**
- Multi-municipality tenant architecture
- Canton-specific compliance variations  
- Geographic distribution for Swiss regions
- AI-driven orchestration for complex municipal workflows

## Context7 MCP Server Integration

**Enhanced Research Workflow:**
- Context7 MCP server integration for AI-optimized documentation retrieval
- Municipal-specific query patterns in `.claude/mcp-servers/context7/municipal-queries.yml`
- Swiss compliance-aware documentation synthesis
- Fallback mechanisms to WebSearch when Context7 unavailable

**Context7 Configuration:**
- MCP server config: `.claude/mcp-servers/context7/config.json`
- Municipal query optimization: `.claude/mcp-servers/context7/query-optimization-guide.md`
- Agent coordination: `.claude/mcp-servers/context7/agent-coordination.md`
- Performance monitoring: `.claude/mcp-servers/context7/monitoring-system.js`

**Municipal Query Enhancement:**
- Automatic municipal context: "for swiss municipal portal development"
- Compliance integration: "meeting wcag 2.1 aa standards"
- Version-specific queries: Include exact technology stack versions
- Multilingual context: "supporting german french content"

**Usage in Research Command:**
```bash
/research "drupal 11 content types municipal services"
```
- Phase 3 automatically uses Context7 with municipal optimization
- Fallback to WebSearch for Swiss-specific implementation examples
- Integration with existing agent ecosystem for validation
## Important File Locations

- Main Composer file: `composer.json`
- DDEV config: `.ddev/config.yaml`
- Theme package: `web/themes/custom/adesso_cms_theme/package.json`
- Component library: `web/themes/custom/adesso_cms_theme/components/`
- Custom modules: `web/modules/custom/`
- Drupal recipes: `recipes/`
- Agent configurations: `.claude/agents/`
- Context7 integration: `.claude/mcp-servers/context7/`

This system emphasizes municipal compliance, AI integration, and modern Drupal development practices specifically tailored for Swiss government portal requirements.

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
