# IDE Integration for Claude Code Multi-Agent System

## VS Code Integration

### Claude Code Extension Configuration
```json
// .vscode/settings.json
{
  "claude.apiKey": "${CLAUDE_API_KEY}",
  "claude.model": "claude-3-5-sonnet-20241022",
  "claude.contextFiles": [
    ".claude/CLAUDE.md",
    ".claude/context/current-state.json"
  ],
  "claude.workflowProfiles": {
    "planning": ".claude/agents/planner-agent.md",
    "development": ".claude/agents/developer-agent.md",
    "qa": ".claude/agents/qa-agent.md",
    "integration": ".claude/agents/integrator-agent.md"
  },
  "claude.autoContextSwitching": true,
  "claude.ddevIntegration": true
}
```

### Task-Specific Workspace Configurations

#### Frontend Development Workspace
```json
// .vscode/frontend.code-workspace
{
  "folders": [
    {
      "name": "Theme",
      "path": "./web/themes/custom/adesso_cms_theme"
    }
  ],
  "settings": {
    "claude.activeProfile": ".claude/profiles/frontend-profile.md",
    "claude.focusAreas": ["accessibility", "performance", "responsive"],
    "eslint.workingDirectories": ["web/themes/custom/adesso_cms_theme"],
    "stylelint.configFile": "web/themes/custom/adesso_cms_theme/.stylelintrc.json",
    "emmet.includeLanguages": {
      "twig": "html"
    }
  },
  "extensions": {
    "recommendations": [
      "ms-vscode.vscode-typescript-next",
      "bradlc.vscode-tailwindcss",
      "whatwedo.twig",
      "deque-systems.vscode-axe-linter"
    ]
  }
}
```

#### Drupal Development Workspace
```json
// .vscode/drupal.code-workspace
{
  "folders": [
    {
      "name": "Modules",
      "path": "./web/modules/custom"
    },
    {
      "name": "Config",
      "path": "./config/sync"
    }
  ],
  "settings": {
    "claude.activeProfile": ".claude/profiles/drupal-profile.md",
    "claude.focusAreas": ["security", "accessibility", "performance"],
    "phpcs.standard": "Drupal,DrupalPractice",
    "phpcs.executablePath": "./vendor/bin/phpcs",
    "php.suggest.basic": false,
    "php.validate.executablePath": "/usr/local/bin/php"
  },
  "extensions": {
    "recommendations": [
      "bmewburn.vscode-intelephense-client",
      "ikappas.phpcs",
      "persoderlind.vscode-phpcbf",
      "devsense.phptools-vscode"
    ]
  }
}
```

### Code Snippets for Drupal Patterns

#### Twig Snippets
```json
// .vscode/twig.code-snippets
{
  "Accessible Component Template": {
    "scope": "twig",
    "prefix": "acc-component",
    "body": [
      "{#",
      "/**",
      " * @file",
      " * Template for ${1:component_name} component.",
      " *",
      " * Available variables:",
      " * - ${2:variable}: ${3:description}",
      " */",
      "#}",
      "",
      "{% set component_attributes = attributes|default(create_attribute()) %}",
      "{% set component_classes = [",
      "  '${1:component_name}',",
      "  '${1:component_name}--' ~ (variant|default('default')),",
      "  modifier_classes|default([])",
      "] %}",
      "",
      "<div{{ component_attributes.addClass(component_classes) }}>",
      "  $0",
      "</div>"
    ],
    "description": "Create accessible component template"
  },
  
  "ARIA Navigation": {
    "scope": "twig",
    "prefix": "aria-nav",
    "body": [
      "<nav{{ attributes.addClass('navigation').setAttribute('aria-label', '${1:Main navigation}'|t) }}>",
      "  <a href=\"#main-content\" class=\"visually-hidden focusable\">",
      "    {{ 'Skip to main content'|t }}",
      "  </a>",
      "  $0",
      "</nav>"
    ],
    "description": "Accessible navigation with skip link"
  }
}
```

#### PHP Snippets
```json
// .vscode/php-drupal.code-snippets
{
  "Drupal Service Class": {
    "scope": "php",
    "prefix": "drupal-service",
    "body": [
      "<?php",
      "",
      "declare(strict_types=1);",
      "",
      "namespace Drupal\\${1:module_name}\\Service;",
      "",
      "use Drupal\\Core\\DependencyInjection\\ContainerInjectionInterface;",
      "use Symfony\\Component\\DependencyInjection\\ContainerInterface;",
      "",
      "/**",
      " * ${2:Service description}.",
      " */",
      "class ${3:ServiceName} implements ContainerInjectionInterface {",
      "",
      "  /**",
      "   * {@inheritdoc}",
      "   */",
      "  public static function create(ContainerInterface \\$container): static {",
      "    return new static();",
      "  }",
      "",
      "  $0",
      "",
      "}"
    ],
    "description": "Drupal service class template"
  }
}
```

### IntelliJ IDEA / PhpStorm Integration

#### Live Templates for Drupal
```xml
<!-- Drupal.xml - Live Templates -->
<templateSet group="Drupal">
  <template name="dservice" value="/**
 * $DESCRIPTION$.
 */
class $CLASS_NAME$ implements ContainerInjectionInterface {

  public function __construct(
    private readonly $DEPENDENCY_TYPE$ $dependency,
  ) {}

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container): static {
    return new static(
      $container->get('$SERVICE_NAME$')
    );
  }

  $END$
}" description="Drupal service class" toReformat="true" toShortenFQNames="true">
    <variable name="DESCRIPTION" expression="" defaultValue="&quot;Service description&quot;" alwaysStopAt="true" />
    <variable name="CLASS_NAME" expression="" defaultValue="&quot;ServiceName&quot;" alwaysStopAt="true" />
    <variable name="DEPENDENCY_TYPE" expression="" defaultValue="&quot;RendererInterface&quot;" alwaysStopAt="true" />
    <variable name="SERVICE_NAME" expression="" defaultValue="&quot;renderer&quot;" alwaysStopAt="true" />
  </template>
</templateSet>
```

#### Code Style Configuration
```xml
<!-- .idea/codeStyles/Drupal.xml -->
<code_scheme name="Drupal" version="173">
  <option name="KEEP_CONTROL_STATEMENT_IN_ONE_LINE" value="false" />
  <option name="KEEP_BLANK_LINES_IN_CODE" value="1" />
  <option name="BLANK_LINES_AFTER_PACKAGE" value="1" />
  <option name="BLANK_LINES_BEFORE_PACKAGE" value="1" />
  
  <PHPCodeStyleSettings>
    <option name="ALIGN_KEY_VALUE_PAIRS" value="true" />
    <option name="ALIGN_PHPDOC_PARAM_NAMES" value="true" />
    <option name="ALIGN_PHPDOC_COMMENTS" value="true" />
    <option name="CONCAT_SPACES" value="true" />
    <option name="COMMA_AFTER_LAST_ARRAY_ELEMENT" value="true" />
    <option name="PHPDOC_BLANK_LINE_BEFORE_TAGS" value="true" />
    <option name="PHPDOC_BLANK_LINES_AROUND_PARAMETERS" value="true" />
    <option name="LOWER_CASE_BOOLEAN_CONST" value="true" />
    <option name="LOWER_CASE_NULL_CONST" value="true" />
    <option name="ELSE_IF_STYLE" value="COMBINE" />
    <option name="VARIABLE_NAMING_STYLE" value="SNAKE_CASE" />
    <option name="BLANK_LINE_BEFORE_RETURN_STATEMENT" value="true" />
    <option name="KEEP_RPAREN_AND_LBRACE_ON_ONE_LINE" value="true" />
    <option name="BLANK_LINES_AROUND_CONSTANTS" value="1" />
    <option name="BLANK_LINES_AROUND_FIELDS" value="1" />
    <option name="BLANK_LINES_AROUND_METHODS" value="1" />
    <option name="SPACE_AFTER_TYPE_CAST" value="true" />
  </PHPCodeStyleSettings>
  
  <codeStyleSettings language="PHP">
    <option name="KEEP_BLANK_LINES_IN_DECLARATIONS" value="1" />
    <option name="KEEP_BLANK_LINES_IN_CODE" value="1" />
    <option name="KEEP_BLANK_LINES_BEFORE_RBRACE" value="1" />
    <option name="BLANK_LINES_BEFORE_PACKAGE" value="1" />
    <option name="BLANK_LINES_AFTER_PACKAGE" value="1" />
    <option name="ALIGN_MULTILINE_PARAMETERS" value="false" />
    <option name="CALL_PARAMETERS_WRAP" value="5" />
    <option name="METHOD_PARAMETERS_WRAP" value="5" />
    <option name="EXTENDS_LIST_WRAP" value="5" />
    <option name="METHOD_CALL_CHAIN_WRAP" value="5" />
    <option name="ASSIGNMENT_WRAP" value="1" />
    <option name="IF_BRACE_FORCE" value="3" />
    <option name="DOWHILE_BRACE_FORCE" value="3" />
    <option name="WHILE_BRACE_FORCE" value="3" />
    <option name="FOR_BRACE_FORCE" value="3" />
  </codeStyleSettings>
</code_scheme>
```

## Sublime Text Integration

### Project Configuration
```json
// adesso-cms.sublime-project
{
  "folders": [
    {
      "path": ".",
      "name": "adesso CMS",
      "folder_exclude_patterns": ["vendor", "node_modules", ".ddev"]
    }
  ],
  "settings": {
    "claude_profile": ".claude/CLAUDE.md",
    "claude_agent_mode": "context_aware",
    "tab_size": 2,
    "translate_tabs_to_spaces": true,
    "rulers": [80],
    "word_wrap": true,
    "wrap_width": 80
  },
  "build_systems": [
    {
      "name": "DDEV Theme Build",
      "cmd": ["ddev", "theme", "build"],
      "working_dir": "$project_path"
    },
    {
      "name": "Claude Plan",
      "cmd": ["claude", "/plan", "$selection"],
      "working_dir": "$project_path"
    }
  ]
}
```

## Vim/Neovim Integration

### Claude Code Configuration
```lua
-- ~/.config/nvim/lua/claude-config.lua
local M = {}

M.setup = function()
  -- Claude Code integration
  vim.g.claude_profile = vim.fn.getcwd() .. '/.claude/CLAUDE.md'
  vim.g.claude_auto_context = true
  
  -- Key mappings for agent workflows
  vim.keymap.set('n', '<leader>cp', ':!claude /plan <C-R><C-W><CR>', { desc = 'Claude Plan' })
  vim.keymap.set('n', '<leader>cd', ':!claude /dev <C-R><C-W><CR>', { desc = 'Claude Develop' })
  vim.keymap.set('n', '<leader>cq', ':!claude /qa<CR>', { desc = 'Claude QA' })
  vim.keymap.set('n', '<leader>ci', ':!claude /integrate<CR>', { desc = 'Claude Integrate' })
  
  -- Context-aware profile switching
  vim.api.nvim_create_autocmd({"BufEnter"}, {
    pattern = {"*.php", "*.module", "*.inc"},
    callback = function()
      vim.g.claude_active_profile = vim.fn.getcwd() .. '/.claude/profiles/drupal-profile.md'
    end,
  })
  
  vim.api.nvim_create_autocmd({"BufEnter"}, {
    pattern = {"*.css", "*.scss", "*.js", "*.ts", "*.stories.js"},
    callback = function()
      vim.g.claude_active_profile = vim.fn.getcwd() .. '/.claude/profiles/frontend-profile.md'
    end,
  })
  
  vim.api.nvim_create_autocmd({"BufEnter"}, {
    pattern = {"*.twig"},
    callback = function()
      vim.g.claude_active_profile = vim.fn.getcwd() .. '/.claude/profiles/accessibility-profile.md'
    end,
  })
end

return M
```

## Terminal Integration

### Shell Aliases and Functions
```bash
# .bashrc / .zshrc
export CLAUDE_PROFILE_DIR=".claude"
export CLAUDE_CONTEXT_DIR=".claude/context"

# Quick agent activation
alias cplan='claude /plan'
alias cdev='claude /dev'
alias cqa='claude /qa'
alias cintegrate='claude /integrate'

# Context management
alias cstatus='claude /workflow status'
alias ccontext='claude /context show'

# DDEV + Claude integration
function ddev-claude() {
  local command=$1
  shift
  ddev exec "claude /$command $@"
}

# Auto-activate Claude profile based on git branch
function auto_claude_profile() {
  if [[ -d .claude ]]; then
    local branch=$(git branch --show-current 2>/dev/null)
    case $branch in
      feature/accessibility-*) export CLAUDE_ACTIVE_PROFILE=".claude/profiles/accessibility-profile.md" ;;
      feature/component-*) export CLAUDE_ACTIVE_PROFILE=".claude/profiles/frontend-profile.md" ;;
      feature/drupal-*) export CLAUDE_ACTIVE_PROFILE=".claude/profiles/drupal-profile.md" ;;
      hotfix/security-*) export CLAUDE_ACTIVE_PROFILE=".claude/profiles/security-profile.md" ;;
      *) export CLAUDE_ACTIVE_PROFILE=".claude/CLAUDE.md" ;;
    esac
  fi
}

# Auto-run on directory change
PROMPT_COMMAND="${PROMPT_COMMAND:+$PROMPT_COMMAND$'\n'}auto_claude_profile"
```

### Git Integration
```bash
# .git/hooks/post-checkout
#!/bin/bash
# Auto-switch Claude profile based on branch

branch=$(git branch --show-current)
profile_dir=".claude/profiles"

case $branch in
  feature/accessibility-*) 
    echo "Switched to accessibility-focused Claude profile"
    export CLAUDE_ACTIVE_PROFILE="$profile_dir/accessibility-profile.md"
    ;;
  feature/component-*)
    echo "Switched to frontend development Claude profile"
    export CLAUDE_ACTIVE_PROFILE="$profile_dir/frontend-profile.md"
    ;;
  feature/drupal-*)
    echo "Switched to Drupal development Claude profile"
    export CLAUDE_ACTIVE_PROFILE="$profile_dir/drupal-profile.md"
    ;;
  hotfix/security-*)
    echo "Switched to security-focused Claude profile"
    export CLAUDE_ACTIVE_PROFILE="$profile_dir/security-profile.md"
    ;;
esac
```

This IDE integration ensures seamless development experience with context-aware Claude Code assistance across all major development environments.