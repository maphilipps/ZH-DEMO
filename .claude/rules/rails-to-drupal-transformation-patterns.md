---
description: Codified patterns for transforming Rails-based agents to Drupal-based agents, ensuring accuracy and preventing framework confusion in AI assistance.
author: Compound Engineering Team
version: 1.0
tags: ["transformation", "rails", "drupal", "agent-accuracy", "framework-migration", "compound-learning"]
globs: [".claude/agents/**/*.md"]
---

# Rails-to-Drupal Transformation Patterns

**Objective:** Establish repeatable, systematic patterns for transforming agents with Rails assumptions into accurate Drupal-based agents that reflect the actual project technology stack.

## Core Transformation Philosophy

**FRAMEWORK ACCURACY IS CRITICAL**: AI agents making incorrect framework assumptions waste more time than they save. Every transformation must result in agents that understand the actual Drupal-based architecture, not generic web development patterns.

## Systematic Transformation Patterns

### Pattern 1: Command Translation

**Rails Commands → Drupal/DDEV Equivalents**

```markdown
# PROJECT INITIALIZATION
❌ rails new . --css=tailwind --database=sqlite
✅ ddev start && ddev composer install
✅ Use existing Drupal installation or run recipe

# SERVER MANAGEMENT  
❌ rails server
❌ bundle exec rails server -p 3000
✅ ddev start
✅ ddev describe (to check status)

# DEPENDENCY MANAGEMENT
❌ bundle install 
❌ gem install [gem-name]
✅ ddev composer install
✅ ddev composer require [package-name]

# DATABASE OPERATIONS
❌ rails db:create
❌ rails db:migrate  
❌ rails db:seed
✅ ddev drush sql:create (if needed)
✅ ddev drush updb -y (run updates)
✅ ddev drush cim -y (import config)
✅ ddev drush cr (clear cache)

# ASSET COMPILATION
❌ rails assets:precompile
❌ rails webpacker:compile
✅ ddev theme build
✅ ddev theme dev (development mode)

# TESTING
❌ rails test
❌ rspec
✅ ddev phpunit
✅ ddev behat (if configured)
```

### Pattern 2: URL and Port Translation

**Rails Localhost → DDEV URLs**

```markdown
# DEVELOPMENT URLS
❌ http://localhost:3000
❌ http://127.0.0.1:3000  
✅ https://zh-demo.ddev.site
✅ http://zh-demo.ddev.site (if HTTPS unavailable)

# ADDITIONAL SERVICES
❌ http://localhost:3001 (generic service)
✅ https://zh-demo.ddev.site:6006 (Storybook)
✅ https://zh-demo.ddev.site:5173 (Vite dev server)

# DATABASE ACCESS
❌ sqlite3 database.db
✅ ddev mysql (MariaDB CLI)
✅ ddev sequelpro (GUI access)
```

### Pattern 3: Framework Concept Mapping

**Rails Concepts → Drupal Equivalents**

```markdown
# ARCHITECTURE PATTERNS
Rails MVC → Drupal Entity-Field-Display
Rails Models → Drupal Entities (Nodes, Users, Terms, etc.)
Rails Controllers → Drupal Controllers + Route handlers  
Rails Views → Drupal Twig templates + Display modes
Rails Routes → Drupal routing.yml files
Rails Migrations → Drupal update hooks + config management

# CONTENT MANAGEMENT
Rails ActiveRecord → Drupal Entity API
Rails Scaffolding → Drupal content type creation
Rails Forms → Drupal Form API + Webform module
Rails Validations → Drupal field validation + constraints

# THEMING/FRONTEND
Rails ERB templates → Drupal Twig templates
Rails Asset Pipeline → Drupal theme asset libraries + Vite
Rails Turbo → Drupal BigPipe + Ajax API
Rails Stimulus → Drupal behaviors + Alpine.js (in this project)

# DATA/DATABASE  
Rails Seeds → Drupal default content + migrations
Rails Fixtures → Drupal test content creation
SQLite → MariaDB with DDEV integration
Rails Console → Drupal Drush shell
```

### Pattern 4: Testing and Verification Translation

**Rails Testing → Drupal Testing**

```markdown
# TEST FRAMEWORKS
❌ RSpec feature tests
❌ Capybara integration
✅ Drupal Functional Tests (BrowserTestBase)
✅ Behat for behavioral testing
✅ PHPUnit for unit tests

# BROWSER AUTOMATION
❌ Capybara.visit('http://localhost:3000')
✅ Puppeteer MCP → 'https://zh-demo.ddev.site'
✅ this.drupalGet('/') in Drupal functional tests

# VERIFICATION TARGETS
❌ Rails welcome page at localhost:3000
✅ Drupal dashboard at /admin
✅ Drupal front page with proper theme
✅ Storybook component library at :6006

# SUCCESS CRITERIA
❌ "Yay! You're on Rails!" message
✅ Drupal admin toolbar visible
✅ Theme assets loading correctly
✅ DDEV services all green in 'ddev describe'
```

### Pattern 5: Error Pattern Translation

**Rails Errors → Drupal Equivalents**

```markdown
# COMMON ERROR TRANSFORMATIONS
❌ "Could not find gem 'rails'" 
✅ "Drupal not bootstrapped" → run ddev start

❌ "Port 3000 already in use"
✅ "ddev-webserver port conflict" → ddev restart

❌ "Rails application failed to start"  
✅ "White screen of death" → check logs, clear cache

❌ "ActiveRecord connection issues"
✅ "Database connection failed" → check DDEV database

❌ "Webpacker compilation failed"
✅ "Vite build failed" → check theme build process

# ERROR RESOLUTION PATTERNS  
Rails: Bundle install → Update gems → Restart
Drupal: Composer install → Clear cache → Rebuild registry
```

## Drupal-Specific Agent Enhancements

### Municipal Portal Specialization

When transforming generic agents, **ADD these Drupal municipal patterns**:

```markdown
## Municipal Portal Context
- **Content Architecture**: Pages, Articles, Events, Services, Forms
- **User Roles**: Anonymous, Citizen, Employee, Administrator, Editor  
- **Workflow States**: Draft → Review → Published → Archived
- **Multi-language**: German primary, English fallback
- **Accessibility**: WCAG 2.1 AA compliance required

## Drupal Municipal Modules
- Content moderation for workflow
- Paragraphs for flexible page building
- Webform for citizen services  
- Views for content listings
- Pathauto for clean URLs
- Metatag for SEO
- Simple sitemap for search engines
```

### AI Integration Specialization  

Add **Drupal AI capabilities** that don't exist in Rails:

```markdown
## Drupal AI Integration Stack
- AI module (drupal/ai) for AI provider abstraction
- Anthropic provider (drupal/ai_provider_anthropic) 
- Vector database integration (drupal/ai_vdb_provider_milvus)
- AI Image Alt Text generation
- AI Agents for workflow automation
- MCP (Model Context Protocol) integration

## AI-Enhanced Content Operations
- Automated image alt text generation
- Content summarization for citizen communications
- Intelligent form routing based on content
- Vector search for municipal knowledge base
- Automated translation assistance (German/English)
```

## Transformation Quality Assurance

### Pre-Transformation Checklist

**MUST COMPLETE** before starting transformation:

- [ ] Identify all Rails-specific references in agent
- [ ] Map Rails concepts to Drupal equivalents  
- [ ] Verify target Drupal modules are available in composer.json
- [ ] Check DDEV configuration matches agent assumptions
- [ ] Ensure German/municipal context is preserved or added

### Post-Transformation Verification

**MUST VERIFY** after transformation:

- [ ] No Rails commands remain in agent instructions
- [ ] All URLs use DDEV hostnames (.ddev.site)
- [ ] Database references use MariaDB, not SQLite
- [ ] Testing approaches use Drupal-compatible tools
- [ ] Error handling covers Drupal-specific issues
- [ ] Examples reflect actual project context

### Compound Learning from Transformations

**TRACK these patterns** for systematic improvement:

```markdown
## Transformation Success Metrics
- Time to complete transformation
- Number of Rails references found/fixed
- Accuracy of Drupal concept mapping
- Success rate of transformed agent deployments
- User satisfaction with transformed agents

## Compound Improvement Patterns
- Common Rails→Drupal mappings become automated
- Verification checklists become more comprehensive
- Error pattern detection becomes more systematic
- Agent creation templates evolve to prevent future mismatches
```

## Systematic Prevention Rules

### New Agent Creation Guidelines

**PREVENT** Rails assumptions in new agents:

1. **Technology Stack Template**: Every new agent starts with verified stack
2. **Concept Verification**: Framework concepts verified against actual codebase
3. **Command Validation**: All commands tested against DDEV environment
4. **URL Standards**: Only DDEV URLs used in examples and tests

### Agent Review Protocol

**SYSTEMATIC REVIEW** process for existing agents:

1. **Monthly Agent Audit**: Random sampling of agents for accuracy
2. **Technology Drift Detection**: Compare agent assumptions vs current stack
3. **Usage Pattern Analysis**: Which agents cause confusion/errors
4. **Proactive Correction**: Fix inaccuracies before they impact development

## Compound Engineering Impact

### Learning Acceleration

Each transformation creates **compound value**:

- **Pattern Library**: Reusable transformation patterns
- **Verification Templates**: Faster future transformations  
- **Error Prevention**: Systematic avoidance of common mistakes
- **Quality Standards**: Higher accuracy in new agent creation

### Systematic Intelligence  

Transformations feed back into **ecosystem intelligence**:

- Agent creation becomes more accurate automatically
- Technology stack changes propagate systematically
- Framework expertise deepens across agent ecosystem
- Development velocity increases through accurate guidance

**Remember**: A systematically transformed agent ecosystem prevents more problems than it solves. Each accurate transformation creates exponential improvement in development speed and reduces frustration from incorrect guidance.