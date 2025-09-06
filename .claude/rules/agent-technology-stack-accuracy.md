---
description: Rules for maintaining agent accuracy with actual technology stack, preventing Rails/framework mismatches, and ensuring agents reflect the real codebase architecture.
author: Compound Engineering Team  
version: 1.0
tags: ["agent-accuracy", "technology-stack", "drupal", "compound-engineering", "agent-maintenance"]
globs: [".claude/agents/**/*.md"]
---

# Agent Technology Stack Accuracy Rules

**Objective:** Ensure all AI agents accurately reflect the actual technology stack and architecture of the project, preventing mismatches that lead to incorrect implementations and wasted development time.

## Core Principle

**TECHNOLOGY STACK VERIFICATION BEFORE AGENT CREATION**: Every agent MUST be verified against the actual codebase technology stack before deployment. No agent should reference technologies, frameworks, or patterns not present in the project.

## Actual Technology Stack (ZH-Demo Project)

### Confirmed Technology Stack
Based on `composer.json`, `.ddev/config.yaml`, and codebase analysis:

- **CMS Platform**: Drupal 11.2+ (NOT Rails, NOT generic PHP)
- **PHP Version**: 8.3
- **Database**: MariaDB 10.11 
- **Web Server**: nginx-fpm via DDEV
- **Development Environment**: DDEV (NOT Docker Compose, NOT standalone)
- **Frontend Build**: Node.js 20 + Vite 5173 + Storybook 6006
- **CSS Framework**: Tailwind CSS (via theme compilation)
- **Component System**: Storybook + Drupal SDC (Single Directory Components)
- **German Market Focus**: Municipal portal for Canton Zurich
- **AI Integration**: Drupal AI module + Anthropic + OpenAI providers + Milvus vector DB

### Technologies NOT in Project
- **Ruby on Rails** (major inaccuracy found in agents)
- **SQLite** (using MariaDB instead)
- **Generic React** (using Drupal-integrated frontend)
- **Standard Docker** (using DDEV-specific configuration)

## CRITICAL AGENT ACCURACY RULES

### Rule 1: Technology Stack Verification (MANDATORY)

**BEFORE** creating or maintaining any agent:

```bash
# REQUIRED verification steps
1. Check composer.json for PHP dependencies and versions
2. Check .ddev/config.yaml for development environment
3. Check package.json for frontend dependencies  
4. Check web/ directory structure for Drupal-specific files
5. Verify no references to incorrect technologies remain
```

**BLOCKER ⛔**: Any agent referencing technologies not in the project MUST be corrected immediately.

### Rule 2: Rails-to-Drupal Transformation Protocol

When transforming agents with framework inaccuracies:

```markdown
# Transformation Checklist
- [ ] Replace Rails-specific commands with Drupal/DDEV equivalents
- [ ] Update database references from SQLite to MariaDB
- [ ] Change server commands from `rails server` to `ddev start`
- [ ] Replace Rails routing with Drupal routing concepts  
- [ ] Update test frameworks from Rails to Drupal testing
- [ ] Verify Puppeteer URLs match DDEV hostnames (.ddev.site)
- [ ] Update any Ruby references to PHP equivalents
- [ ] Ensure German/Swiss context is preserved where relevant
```

**Example Transformation:**
```diff
- Run `rails new . --css=tailwind --database=sqlite`  
+ Run `ddev composer install` and configure Drupal with Tailwind theme

- Navigate to http://localhost:3000
+ Navigate to https://zh-demo.ddev.site

- Check Rails welcome page
+ Check Drupal installation or dashboard page
```

### Rule 3: Municipal Portal Context Requirements

For agents working on this specific project:

**MUST INCLUDE**:
- German language considerations (error messages, UI text)
- Swiss/Zurich Canton compliance requirements
- Municipal portal user patterns (citizens, officials, departments)
- Accessibility requirements (WCAG 2.1 AA for government sites)
- DDEV-specific development commands and URLs

**MUST NOT**:
- Reference generic corporate use cases
- Ignore German language requirements
- Use non-municipal examples in documentation

### Rule 4: DDEV Development Environment Accuracy

All development commands MUST use DDEV patterns:

```bash
# CORRECT DDEV Commands
ddev start                    # Start environment
ddev composer install        # PHP dependencies  
ddev drush cr                 # Clear Drupal cache
ddev theme dev               # Start theme development
ddev theme storybook         # Launch Storybook
ddev ssh                     # Enter container
ddev logs                    # View logs

# INCORRECT Commands (do not use)
rails server                 # Wrong framework
docker-compose up            # Wrong container tool
npm start                    # Wrong context (use ddev theme commands)
```

### Rule 5: Drupal-Specific Agent Requirements

**Core Drupal Concepts Agents MUST Understand**:
- **Entities**: Nodes, taxonomy, users, media, paragraphs
- **Configuration Management**: Config import/export, features
- **Module System**: Contrib vs custom modules
- **Theming**: Twig templates, theme hooks, asset libraries
- **Content Architecture**: Content types, fields, display modes
- **Caching**: Cache tags, contexts, max-age
- **Security**: Permissions, roles, access control
- **Performance**: BigPipe, lazy loading, image optimization

### Rule 6: Agent Verification Protocol

Before deploying any agent, run this verification:

```markdown
## Agent Stack Verification Checklist

### Technology Accuracy
- [ ] No Rails references (unless specifically about migration FROM Rails)
- [ ] Uses Drupal-specific terminology correctly
- [ ] DDEV commands instead of generic Docker/local dev
- [ ] MariaDB references instead of SQLite
- [ ] Drupal routing instead of Rails routing

### Context Accuracy  
- [ ] German/Swiss context preserved where relevant
- [ ] Municipal portal use cases instead of generic examples
- [ ] DDEV URLs (.ddev.site) instead of localhost ports
- [ ] Drupal-specific file paths (web/, config/, etc.)

### Integration Accuracy
- [ ] References actual modules from composer.json
- [ ] Uses project-specific configurations
- [ ] Aligns with existing theme and component structure
- [ ] Matches actual AI integration setup (Anthropic + Milvus)
```

## Agent Maintenance Workflow

### Monthly Verification Process
1. **Stack Drift Detection**: Compare agent references against current composer.json
2. **Accuracy Audit**: Review 3-5 random agents for technology mismatches  
3. **Compound Learning**: Update agents based on successful implementation patterns
4. **Documentation Sync**: Ensure agent examples match current project state

### Immediate Correction Triggers
- Any mention of Rails in non-migration contexts
- SQLite references (should be MariaDB)
- Generic localhost URLs (should be DDEV URLs)
- Non-Drupal framework patterns
- Missing German/municipal context

## Compound Learning from Technology Accuracy

### Pattern Recognition
When correcting agents, document:
- **What inaccuracies were found** (for systematic detection)
- **Correction patterns applied** (for automated fixes)
- **Verification methods used** (for systematic auditing)
- **Context requirements discovered** (for future agent design)

### Systematic Improvement
Each correction should:
1. **Update the specific agent** with accurate information
2. **Create verification rules** to prevent similar inaccuracies
3. **Update agent creation guidelines** with new requirements
4. **Document compound learning** for accelerated future corrections

## Quality Gates for Agent Accuracy

### Pre-Deployment Verification
**MUST PASS** before any agent goes live:
- Technology stack match: 100%
- Command syntax verification: All commands tested
- Context appropriateness: Municipal/German requirements met
- Integration compatibility: Works with existing project structure

### Post-Deployment Monitoring
- Track agent usage patterns for accuracy issues
- Monitor implementation success rates by agent
- Collect feedback on agent technology assumptions
- Measure time-to-correction when inaccuracies are found

**Remember**: Inaccurate agents are worse than no agents at all. They create technical debt, waste development time, and reduce trust in AI assistance. Every agent MUST reflect the actual project reality, not generic assumptions or outdated references.