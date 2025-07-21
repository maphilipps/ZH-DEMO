# Claude 4 Best Practices for adesso CMS

## Explicit and Specific Instructions

### Agent Instruction Templates
Each agent must receive explicit, detailed instructions with contextual motivation:

```xml
<task_context>
You are the {AGENT_ROLE} in the adesso CMS development workflow.
Your primary responsibility is {PRIMARY_RESPONSIBILITY}.
This is critical because {CONTEXTUAL_MOTIVATION}.
</task_context>

<specific_instructions>
1. {EXPLICIT_STEP_1}
2. {EXPLICIT_STEP_2}
3. {EXPLICIT_STEP_3}
</specific_instructions>

<success_criteria>
- {MEASURABLE_OUTCOME_1}
- {MEASURABLE_OUTCOME_2}
- {MEASURABLE_OUTCOME_3}
</success_criteria>
```

### Contextual Motivation Examples

#### Why Accessibility is Critical
"Accessibility compliance (WCAG 2.1 AA) is mandatory because adesso CMS serves public-facing websites that must be legally compliant and usable by all users, including those with disabilities. Failed accessibility audits can result in legal liability and exclude significant user populations."

#### Why DDEV is Non-Negotiable  
"DDEV containers ensure consistent development environments across all team members. Direct host commands can lead to environment drift, dependency conflicts, and deployment failures that waste hours of debugging time."

#### Why Security Reviews are Essential
"Drupal sites are high-value targets for attackers. Security vulnerabilities in components can compromise entire sites, customer data, and organizational reputation. Every component must be security-validated before production."

## Thinking Capabilities Integration

### Complex Reasoning Workflows
For multi-step tasks, use interleaved thinking:

```xml
<thinking>
Let me analyze this accessibility requirement:
1. Component needs keyboard navigation
2. Screen reader compatibility is required  
3. ARIA attributes must be semantically correct
4. Color contrast needs verification

The most critical aspect is ensuring semantic HTML structure first, then layering ARIA enhancements. I should start with native elements before adding custom behaviors.
</thinking>

Based on my analysis, I'll implement the navigation component using semantic HTML elements...
```

### Decision Documentation
Always document reasoning for architecture decisions:

```xml
<architecture_decision>
<problem>Need to choose between CSS Grid and Flexbox for component layout</problem>
<decision>Using CSS Grid for 2D layout with Flexbox for 1D alignment within grid areas</decision>
<reasoning>
Grid provides better semantic structure for screen readers and easier responsive behavior.
Flexbox handles fine-grained alignment within grid cells.
This hybrid approach maximizes both accessibility and maintainability.
</reasoning>
</architecture_decision>
```

## Optimized Tool Calling

### Parallel Execution Patterns
Always batch independent tool calls for maximum efficiency:

```xml
<!-- GOOD: Parallel execution -->
<tools_batch>
<tool_call name="Read" file="component.twig" />
<tool_call name="Read" file="component.yml" />  
<tool_call name="Bash" command="ddev theme lint" />
<tool_call name="Bash" command="ddev theme test" />
</tools_batch>

<!-- AVOID: Sequential execution -->
<tool_call name="Read" file="component.twig" />
<!-- wait for result -->
<tool_call name="Read" file="component.yml" />
<!-- wait for result -->
```

### Intelligent Tool Selection
Choose the most efficient tool for each task:

```xml
<tool_strategy>
- Use Glob for file discovery: "**/*.component.yml"
- Use Grep for content search: "aria-" in Twig files
- Use Read for specific file content
- Use Bash for DDEV commands in parallel batches
- Use Edit for precise modifications
- Use MultiEdit for multiple changes in same file
</tool_strategy>
```

## Response Formatting Control

### Structured Output Templates
Use consistent XML structure for agent handoffs:

```xml
<agent_output type="planner">
<ticket_summary>
  <id>ADS-123</id>
  <title>Accessible Navigation Component</title>
  <priority>high</priority>
  <accessibility_focus>true</accessibility_focus>
</ticket_summary>

<requirements>
  <functional>
    <requirement id="F1">Keyboard navigation support</requirement>
    <requirement id="F2">Screen reader compatibility</requirement>
  </functional>
  <accessibility>
    <requirement id="A1">WCAG 2.1 AA compliance</requirement>
    <requirement id="A2">Focus management</requirement>
  </accessibility>
</requirements>

<implementation_guidance>
  <architecture>Use semantic HTML nav element with role="navigation"</architecture>
  <accessibility>Implement skip links and proper ARIA landmarks</accessibility>
  <testing>Include axe-core automated tests in Storybook</testing>
</implementation_guidance>

<handoff_context>
Ready for Developer Agent implementation phase.
All requirements specified with accessibility-first approach.
</handoff_context>
</agent_output>
```

### Progress Tracking Format
```xml
<progress_update>
<current_task>Implementing keyboard navigation handlers</current_task>
<completion_percentage>75</completion_percentage>
<next_steps>
  <step>Add focus trap for modal states</step>
  <step>Test with screen readers</step>
  <step>Create Storybook accessibility stories</step>
</next_steps>
<blockers>None identified</blockers>
</progress_update>
```

## Frontend and Code Generation Excellence

### Comprehensive Implementation Approach
When generating code, include thoughtful details and apply design principles:

```xml
<implementation_approach>
Create a comprehensive navigation component that includes:
- Semantic HTML structure with proper landmark roles
- Full keyboard accessibility (Tab, Shift+Tab, Arrow keys, Enter, Escape)
- Screen reader optimization with appropriate ARIA labels
- Responsive design that works across all device sizes
- Focus management with visible focus indicators
- Skip navigation functionality for accessibility
- Mobile-friendly touch interactions
- Smooth animations and transitions
- Error states and loading states
- Integration with Drupal's menu system
- Storybook stories covering all interaction states
- Comprehensive accessibility testing scenarios
</implementation_approach>
```

### Design Principles Application
```xml
<design_principles>
<accessibility_first>
Every interactive element must be keyboard accessible and screen reader compatible.
Use semantic HTML before adding ARIA enhancements.
Test with actual assistive technologies, not just automated tools.
</accessibility_first>

<progressive_enhancement>
Start with functional HTML that works without JavaScript.
Layer on CSS for visual enhancement.
Add JavaScript for interactive behaviors.
Ensure graceful degradation at each level.
</progressive_enhancement>

<performance_optimization>
Minimize CSS and JavaScript bundle size.
Use CSS Grid and Flexbox for efficient layouts.
Implement lazy loading for non-critical assets.
Optimize images and icons for web delivery.
</performance_optimization>
</design_principles>
```

## Robust Solution Patterns

### Generalized Problem Solving
Focus on understanding core requirements rather than specific test cases:

```xml
<problem_analysis>
<core_requirement>Users need to navigate website content efficiently</core_requirement>
<user_scenarios>
  <scenario type="keyboard_user">Must access all navigation via keyboard</scenario>
  <scenario type="screen_reader_user">Needs clear navigation structure and landmarks</scenario>
  <scenario type="mobile_user">Requires touch-friendly responsive design</scenario>
  <scenario type="cognitive_disability">Benefits from clear, predictable navigation patterns</scenario>
</user_scenarios>
<solution_approach>
Design navigation system that serves all user scenarios simultaneously,
rather than creating separate implementations for each case.
</solution_approach>
</problem_analysis>
```

### Error Handling and Edge Cases
```xml
<robust_implementation>
<error_scenarios>
  <scenario>Navigation data fails to load</scenario>
  <response>Display fallback navigation with home link</response>
  
  <scenario>JavaScript fails to load</scenario>
  <response>Ensure base HTML navigation remains functional</response>
  
  <scenario>Screen reader encounters malformed ARIA</scenario>
  <response>Use semantic HTML as foundation, ARIA as enhancement</response>
</error_scenarios>
</robust_implementation>
```

## Agent Communication Protocol

### Claude 4 Optimized Handoffs
```xml
<agent_handoff format="claude_4_optimized">
<from_agent>planner</from_agent>
<to_agent>developer</to_agent>
<context_transfer>
  <explicit_requirements>
    <!-- Detailed, unambiguous specifications -->
  </explicit_requirements>
  <motivation_context>
    <!-- Why these requirements matter -->
  </motivation_context>
  <success_metrics>
    <!-- Measurable outcomes -->
  </success_metrics>
  <implementation_guidance>
    <!-- Specific technical direction -->
  </implementation_guidance>
</context_transfer>
</agent_handoff>
```

This approach ensures maximum efficiency and clarity in multi-agent coordination while leveraging Claude 4's enhanced capabilities.