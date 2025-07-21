# Claude Profiles - Conditional Loading System

## Usage

Instead of loading 50+ rule files, use specific profiles based on your task:

### Basic Usage
```bash
# Load specific profile in Claude Code
CLAUDE_PROFILE=".claude/profiles/drupal-profile.md" claude code
```

### Available Profiles

- **`fullstack-profile.md`** - 🎯 **RECOMMENDED** Daily fullstack: Drupal + Frontend + A11y
- **`drupal-profile.md`** - Drupal backend development, modules, PHP
- **`frontend-profile.md`** - CSS, JavaScript, Tailwind, Storybook  
- **`accessibility-profile.md`** - WCAG compliance, accessibility features
- **`security-profile.md`** - Security audits, vulnerability assessments
- **`advanced-profile.md`** - Multi-agent workflows, enterprise features

### Profile Combination

Profiles can reference each other:
```markdown
<!-- Load additional profile when needed -->
@.claude/profiles/security-profile.md
```

## Core Rules (Always Loaded)

These are always loaded from the main CLAUDE.md:
- DDEV rules (critical)
- SDC best practices (critical)
- Testing rules (critical)
- Twig error prevention (critical)
- adesso accessibility standards (critical)

## Benefits

- ⚡ **Faster loading** - Only 5-10 rules instead of 50+
- 🎯 **Context-aware** - Only relevant rules for your task
- 💾 **Token efficient** - Reduces context size dramatically
- 🔧 **Maintainable** - Easier to update and manage
