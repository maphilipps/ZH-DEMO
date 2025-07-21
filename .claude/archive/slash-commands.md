# Custom Slash Commands for Agent Workflows

## Quick Agent Activation & Workflow Control

### Core Agent Commands

#### `/plan` - Activate Planner Agent
```markdown
# /plan - Analyze requirements and create implementation plan

**Usage:**
/plan "Create accessible navigation component with keyboard support"
/plan --accessibility-critical "WCAG 2.1 AA compliant form validation"
/plan --security-audit "User authentication system review"

**Options:**
--accessibility-critical    Focus on WCAG 2.1 AA compliance
--security-audit           Include security vulnerability assessment
--performance-critical     Include performance optimization analysis
--mobile-first             Prioritize mobile responsiveness
--existing-component        Analyze existing component for improvements

**Output:** Structured ticket in .claude/context/tickets/
```

#### `/dev` - Activate Developer Agent
```markdown
# /dev - Implement feature according to specifications

**Usage:**
/dev ADS-123                          # Implement specific ticket
/dev --component="navigation"         # Create new component
/dev --fix="accessibility-issues"    # Fix specific issues

**Options:**
--ticket=ID               Implement specific ticket ID
--component=NAME          Create new SDC component
--fix=ISSUE_TYPE         Fix specific issue type
--accessibility-focus    Extra focus on accessibility implementation
--storybook-first        Create Storybook stories first, then implementation
--test-driven            Create tests before implementation

**Auto-loaded context:**
- Relevant ticket from Planner Agent
- Figma design specifications (via MCP)
- Existing component patterns
- Accessibility guidelines
```

#### `/qa` - Activate QA Agent
```markdown
# /qa - Comprehensive quality assurance testing

**Usage:**
/qa ADS-123                           # Test specific implementation
/qa --accessibility-audit            # Focus on accessibility testing
/qa --security-scan                  # Security vulnerability assessment
/qa --performance-test               # Performance impact analysis

**Options:**
--accessibility-audit    WCAG 2.1 AA comprehensive testing
--security-scan         Security vulnerability assessment
--performance-test      Performance impact analysis
--cross-browser         Cross-browser compatibility testing
--mobile-testing        Mobile device testing
--regression-test       Test for regressions

**Automated checks:**
- Runs axe-core accessibility tests
- Executes security vulnerability scans
- Performs cross-browser testing
- Validates performance metrics
```

#### `/integrate` - Activate Integrator Agent
```markdown
# /integrate - Deploy and document completed features

**Usage:**
/integrate ADS-123                    # Integrate approved implementation
/integrate --rollback=ADS-456        # Rollback problematic deployment
/integrate --hotfix                  # Emergency deployment

**Options:**
--rollback=ID           Rollback specific deployment
--hotfix                Emergency deployment bypass some checks
--staging-only          Deploy to staging environment only
--documentation-update  Update documentation only
--performance-monitor   Monitor performance post-deployment

**Integration steps:**
- Validates QA approval
- Creates deployment branch
- Updates documentation
- Monitors post-deployment metrics
```

### Workflow Management Commands

#### `/workflow` - Workflow Status & Control
```markdown
# /workflow - Manage multi-agent workflows

**Usage:**
/workflow status                      # Show current workflow status
/workflow start "feature-name"        # Start new workflow
/workflow pause                       # Pause current workflow
/workflow resume                      # Resume paused workflow
/workflow rollback --stage=qa        # Rollback to specific stage

**Subcommands:**
status                  Show current workflow state
start FEATURE_NAME      Initialize new feature workflow
pause                   Pause current workflow
resume                  Resume paused workflow
rollback --stage=STAGE  Rollback to specific workflow stage
agents                  Show active agents and their status
```

#### `/context` - Context Management
```markdown
# /context - Manage agent context and memory

**Usage:**
/context show                         # Display current context
/context switch --agent=planner      # Switch to specific agent context
/context clear                       # Clear current context
/context save "checkpoint-name"       # Save context checkpoint
/context load "checkpoint-name"      # Load saved context

**Memory commands:**
/context memory --patterns           # Show learned patterns
/context memory --performance        # Show performance analytics
/context memory --failures          # Show failure analysis
```

### Specialized Domain Commands

#### `/accessibility` - Accessibility-Focused Workflows
```markdown
# /accessibility - Accessibility-specific workflows

**Usage:**
/accessibility audit                  # Run comprehensive accessibility audit
/accessibility fix ADS-123           # Fix accessibility issues in implementation
/accessibility validate              # Validate WCAG 2.1 AA compliance
/accessibility patterns              # Show accessibility pattern library

**Specialized focus:**
- WCAG 2.1 AA compliance validation
- Screen reader compatibility testing
- Keyboard navigation verification
- Color contrast analysis
- Focus management testing
```

#### `/security` - Security-Focused Workflows
```markdown
# /security - Security assessment and remediation

**Usage:**
/security scan                       # Run security vulnerability scan
/security fix --cve=CVE-2024-1234   # Fix specific security vulnerability
/security audit --component=auth    # Audit specific component security
/security baseline                  # Establish security baseline

**Security checks:**
- XSS vulnerability detection
- CSRF protection validation
- Input sanitization verification
- Authentication/authorization testing
- Dependency vulnerability scanning
```

#### `/performance` - Performance Optimization
```markdown
# /performance - Performance analysis and optimization

**Usage:**
/performance baseline                # Establish performance baseline
/performance test                   # Run performance tests
/performance optimize --target=90   # Optimize to target score
/performance monitor                # Monitor ongoing performance

**Performance metrics:**
- Page load time analysis
- Core Web Vitals measurement
- Bundle size optimization
- Image optimization analysis
- Critical rendering path assessment
```

### Advanced Workflow Commands

#### `/parallel` - Parallel Agent Coordination
```markdown
# /parallel - Run multiple agents concurrently

**Usage:**
/parallel --agents="planner,developer" "Create accessible navigation"
/parallel --qa-dev "Fix accessibility issues while testing new features"

**Coordination modes:**
--agents=LIST           Specify agents to run in parallel
--qa-dev               Run QA and Developer agents concurrently
--design-dev           Coordinate with design team via MCP integration
--conflict-resolution  Enable automatic conflict resolution
```

#### `/pipeline` - CI/CD Integration
```markdown
# /pipeline - CI/CD pipeline integration

**Usage:**
/pipeline deploy --env=staging      # Deploy to staging environment
/pipeline test --full-suite         # Run complete test suite
/pipeline rollback --version=1.2.3  # Rollback to specific version

**Pipeline stages:**
test                    Run test suite
build                   Build production assets
deploy --env=ENV        Deploy to specified environment
rollback --version=VER  Rollback deployment
monitor                 Monitor deployment health
```

### Command Implementation

#### Slash Command Handler
```javascript
// .claude/commands/slash-handler.js
class SlashCommandHandler {
  constructor() {
    this.commands = new Map();
    this.registerCommands();
  }
  
  registerCommands() {
    this.commands.set('plan', new PlanCommand());
    this.commands.set('dev', new DevCommand());
    this.commands.set('qa', new QACommand());
    this.commands.set('integrate', new IntegrateCommand());
    this.commands.set('workflow', new WorkflowCommand());
    this.commands.set('accessibility', new AccessibilityCommand());
    this.commands.set('security', new SecurityCommand());
    this.commands.set('performance', new PerformanceCommand());
  }
  
  async execute(commandLine) {
    const [command, ...args] = this.parseCommand(commandLine);
    
    if (!this.commands.has(command)) {
      throw new Error(`Unknown command: /${command}`);
    }
    
    const handler = this.commands.get(command);
    return await handler.execute(args);
  }
  
  parseCommand(commandLine) {
    // Parse "/command --option=value arg1 arg2"
    const parts = commandLine.slice(1).split(' ');
    const command = parts[0];
    const args = this.parseArguments(parts.slice(1));
    
    return [command, args];
  }
}
```

#### Command Base Class
```javascript
// .claude/commands/base-command.js
class BaseCommand {
  constructor() {
    this.contextManager = new ContextManager();
    this.agentOrchestrator = new AgentOrchestrator();
  }
  
  async execute(args) {
    // Validate arguments
    this.validateArgs(args);
    
    // Load context
    const context = await this.loadContext(args);
    
    // Execute command
    const result = await this.run(args, context);
    
    // Update context
    await this.updateContext(result);
    
    return result;
  }
  
  // Abstract methods to be implemented by subclasses
  async validateArgs(args) { throw new Error('Not implemented'); }
  async loadContext(args) { throw new Error('Not implemented'); }
  async run(args, context) { throw new Error('Not implemented'); }
  async updateContext(result) { throw new Error('Not implemented'); }
}
```

#### Example: Plan Command Implementation
```javascript
// .claude/commands/plan-command.js
class PlanCommand extends BaseCommand {
  async validateArgs(args) {
    if (!args.requirements && !args.ticket) {
      throw new Error('Requirements or ticket ID required');
    }
  }
  
  async loadContext(args) {
    const context = {
      project_context: await this.contextManager.getProjectContext(),
      accessibility_patterns: await this.contextManager.getAccessibilityPatterns(),
      security_guidelines: await this.contextManager.getSecurityGuidelines()
    };
    
    // Load MCP context if needed
    if (args.figma_integration) {
      context.design_specs = await this.mcpCall('figma', 'get_project_specs');
    }
    
    return context;
  }
  
  async run(args, context) {
    // Activate Planner Agent with enhanced context
    return await this.agentOrchestrator.activateAgent('planner', {
      requirements: args.requirements,
      context: context,
      options: args.options
    });
  }
}
```

### Command Auto-completion

#### Shell Integration
```bash
# .claude/commands/completion.bash
_claude_slash_commands() {
  local cur="${COMP_WORDS[COMP_CWORD]}"
  local commands="plan dev qa integrate workflow context accessibility security performance parallel pipeline"
  
  COMPREPLY=($(compgen -W "${commands}" -- ${cur}))
}

complete -F _claude_slash_commands claude
```

These slash commands provide instant access to the full power of the multi-agent system while maintaining simplicity and discoverability.