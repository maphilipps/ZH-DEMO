# Dynamic Profile Loading System

## Intelligent Context-Aware Profile Selection

### Auto-Detection Mechanisms

#### 1. Git Branch Analysis
```bash
# Auto-detect profile based on branch naming
BRANCH=$(git branch --show-current)
case $BRANCH in
  feature/accessibility-*) echo "accessibility-profile" ;;
  feature/component-*) echo "frontend-profile" ;;
  feature/drupal-*) echo "drupal-profile" ;;
  hotfix/security-*) echo "security-profile" ;;
  *) echo "default-profile" ;;
esac
```

#### 2. File Context Detection
```bash
# Auto-detect based on files being modified
MODIFIED_FILES=$(git diff --name-only)
if echo "$MODIFIED_FILES" | grep -q "\.component\.yml\|\.twig"; then
  PROFILE="drupal-profile"
elif echo "$MODIFIED_FILES" | grep -q "\.stories\.js\|tailwind\|vite"; then
  PROFILE="frontend-profile"
elif echo "$MODIFIED_FILES" | grep -q "test\|spec\|\.feature"; then
  PROFILE="qa-profile"
fi
```

#### 3. Workflow State Detection
```json
// Auto-load based on current workflow state
{
  "profile_rules": {
    "planning": "planner-agent",
    "implementation": "developer-agent", 
    "testing": "qa-agent",
    "integration": "integrator-agent"
  },
  "context_overrides": {
    "accessibility_focus": "accessibility-profile",
    "security_audit": "security-profile",
    "performance_optimization": "frontend-profile"
  }
}
```

### Smart Profile Composition

#### Conditional Rule Loading
```markdown
# Base Profile: Always loaded
@.claude/ddev-rules.md
@.claude/testing-rules.md

# Conditional Loading based on context
{{ if workflow.phase == "implementation" }}
@.claude/drupal-sdc-best-practices.md
@.claude/javascript-standards.md
{{ endif }}

{{ if accessibility_required }}
@.claude/accessibility-standards.md
@.claude/adesso-accessibility-standards.md
{{ endif }}

{{ if security_review }}
@.claude/security-practices.md
@.claude/drupal-authentication-failures.md
{{ endif }}
```

#### Role-Based Rule Inheritance
```yaml
# profile-inheritance.yml
base_rules:
  - ddev-rules.md
  - testing-rules.md

role_profiles:
  planner:
    inherits: base_rules
    adds:
      - project-definition-template.md
      - multi-agent-coordination.md
      - accessibility-standards.md
  
  developer:
    inherits: base_rules  
    adds:
      - drupal-sdc-best-practices.md
      - javascript-standards.md
      - twig-cheat-sheet.md
    
  qa:
    inherits: base_rules
    adds:
      - testing-guidelines.md
      - accessibility-standards.md
      - security-practices.md
```

### Intelligent Context Switching

#### Workflow-Aware Loading
```javascript
// .claude/profile-loader.js
function loadProfile() {
  const state = JSON.parse(fs.readFileSync('.claude/context/current-state.json'));
  const currentAgent = state.workflow.current_agent;
  const phase = state.workflow.phase;
  
  // Base profile for current agent
  let profile = `@.claude/agents/${currentAgent}-agent.md`;
  
  // Add context-specific rules
  if (state.workflow.accessibility_focus) {
    profile += '\n@.claude/profiles/accessibility-profile.md';
  }
  
  if (state.workflow.security_audit) {
    profile += '\n@.claude/profiles/security-profile.md';
  }
  
  return profile;
}
```

#### File Watch Integration
```bash
# Auto-reload profile when context changes
fswatch .claude/context/current-state.json | while read; do
  echo "Context changed - reloading profile..."
  PROFILE=$(node .claude/profile-loader.js)
  echo "$PROFILE" > .claude/active-profile.md
done
```

### Profile Optimization

#### Token Usage Optimization
```yaml
# profile-metrics.yml
token_budgets:
  planner: 8000    # High for analysis tasks
  developer: 12000 # Highest for implementation
  qa: 6000        # Medium for validation
  integrator: 4000 # Lower for final steps

optimization_rules:
  - exclude_unused_security_rules_in_frontend_tasks
  - skip_lagoon_rules_in_local_development
  - defer_govcms_rules_unless_specified
```

#### Caching & Performance
```bash
# Profile caching for faster loading
PROFILE_HASH=$(echo "$CURRENT_CONTEXT" | sha256sum)
CACHE_FILE=".claude/cache/profile-$PROFILE_HASH.md"

if [ -f "$CACHE_FILE" ]; then
  echo "Using cached profile: $CACHE_FILE"
  cp "$CACHE_FILE" .claude/active-profile.md
else
  echo "Generating new profile..."
  generate_profile > "$CACHE_FILE"
  cp "$CACHE_FILE" .claude/active-profile.md
fi
```

### Usage Examples

#### Automatic Agent Selection
```bash
# Start new feature development
./scripts/start-feature.sh "accessible-navigation"
# Auto-loads: planner-agent → creates tickets
# Auto-switches to: developer-agent → implements
# Auto-transitions to: qa-agent → validates
# Auto-finalizes with: integrator-agent → deploys
```

#### Manual Profile Override
```bash
# Force specific profile for special cases
CLAUDE_PROFILE="security-audit" claude code
# or
echo "security-profile" > .claude/force-profile.txt
```

#### Context-Aware Suggestions
```bash
# Claude suggests optimal profile based on current state
$ claude profile suggest
Based on current context:
- Branch: feature/accessibility-navigation  
- Modified files: *.twig, *.component.yml
- Workflow phase: implementation

Recommended profile: developer-agent + accessibility-profile
Load with: claude code --profile=developer-accessibility
```

### Integration with CI/CD

#### Pipeline Profile Selection
```yaml
# .github/workflows/claude-integration.yml
jobs:
  planning:
    runs-on: ubuntu-latest
    steps:
      - name: Load Planner Profile
        run: echo "@.claude/agents/planner-agent.md" > .claude/active-profile.md
      
  development:
    needs: planning
    steps:
      - name: Load Developer Profile  
        run: echo "@.claude/agents/developer-agent.md" > .claude/active-profile.md
```

This system ensures each Claude instance loads exactly the right context for maximum efficiency and coordination!