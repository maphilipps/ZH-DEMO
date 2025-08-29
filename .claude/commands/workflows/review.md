# Review Command

<command_purpose> Perform exhaustive code reviews using multi-agent analysis, ultra-thinking, and Git worktrees for deep local inspection. </command_purpose>

## Introduction

<role>Senior Code Review Architect with expertise in security, performance, architecture, and quality assurance</role>

This command performs comprehensive reviews of GitHub pull requests or documents using:

- **39% better quality through XML structure**
- **Git worktree isolation for actual code access**
- **10+ specialized review agents working in parallel**
- **Ultra-thinking phases for deep analysis**
- **Automated simplification and minimalism checks**

## Prerequisites

<requirements>
- Git repository with GitHub CLI (`gh`) installed and authenticated
- Clean main/master branch
- Proper permissions to create worktrees and access the repository
- For document reviews: Path to a markdown file or document
</requirements>

## Main Tasks

### 1. Worktree Creation and Branch Checkout (ALWAYS FIRST)

<review_target> #$ARGUMENTS </review_target>

If no review_target is given, check out the current feature branch using Git and use that as the basis for your review.

<critical_requirement> MUST create worktree FIRST to enable local code analysis. No exceptions. </critical_requirement>

<thinking>
First, I need to determine the review target type and set up the worktree.
This enables all subsequent agents to analyze actual code, not just diffs.
</thinking>

#### Immediate Actions:

<task_list>

- [ ] Determine review type: PR number (numeric), GitHub URL, file path (.md), or empty (latest PR)
- [ ] Create worktree directory structure at `$git_root/.worktrees/reviews/pr-$identifier`
- [ ] Check out PR branch in isolated worktree using `gh pr checkout`
- [ ] Navigate to worktree - ALL subsequent analysis happens here
- [ ] Install dependencies (`npm install` or equivalent) for deep analysis </task_list>

#### Parallel Subtasks:

<parallel_tasks>

- Fetch PR metadata using `gh pr view --json` for title, body, files, linked issues
- Clone PR branch into worktree with full history
- Set up language-specific analysis tools
- Prepare security scanning environment </parallel_tasks>

<success_criteria>

- Worktree created and accessible
- All PR code locally available
- Dependencies installed successfully
- Analysis tools ready </success_criteria>

### 2. Ultra-Deep Context Gathering Phase

<thinking>
Now I need to gather comprehensive context about the changes.
Think ultrahard about what context will help the review agents make better decisions.
</thinking>

#### Sub-Agent: Context Archaeologist

<agent_role>Historical Analysis Expert</agent_role>

<specific_tasks>

1. Run `git log --follow --oneline -20` on each changed file
2. Execute `git blame -w -C -C -C` to trace code origins
3. Analyze commit messages for patterns using `git log --grep`
4. Map contributor expertise with `git shortlog -sn --`
5. Extract lessons from similar changes: `git log -S"pattern" --oneline` </specific_tasks>

<deliverables>
- Timeline of file evolution
- Key contributors and their domains
- Historical issues and fixes
- Pattern of changes over time
</deliverables>

#### Sub-Agent: Dependency Detective

<agent_role>Dependency Analysis Specialist</agent_role>

<specific_tasks>

1. Generate dependency tree: `npm list --depth=3` or equivalent
2. Check for outdated packages: `npm outdated --json`
3. Scan for vulnerabilities: `npm audit --json`
4. Analyze import statements with regex: `grep -r "import.*from\|require(" --include="*.js"`
5. Create dependency graph using `madge --circular --extensions js,jsx,ts,tsx src/` </specific_tasks>

<deliverables>
- Complete dependency map
- Security vulnerability report
- Circular dependency warnings
- Version compatibility matrix
</deliverables>

#### Sub-Agent: Pattern Recognition Specialist

<agent_role>Code Pattern Analysis Expert</agent_role>

<specific_tasks>

1. Search for design patterns: `grep -r "Factory\|Singleton\|Observer" --include="*.ts"`
2. Detect anti-patterns: TODO/FIXME/HACK comments
3. Analyze naming conventions consistency
4. Check for code duplication with `jscpd --min-tokens 50`
5. Review architectural boundaries and layer violations </specific_tasks>

<deliverables>
- Pattern usage report
- Anti-pattern locations
- Naming consistency analysis
- Code duplication metrics
</deliverables>

### 3. Multi-Dimensional Code Analysis

<thinking>
Think ultrahard about code quality from every angle.
Each agent must dive deep into their specialty area.
</thinking>

#### Primary Analysis Agents:

##### 1. Architecture Strategist Agent

<agent_role>System Architecture Expert</agent_role>

<chain_of_thought>

1. First, understand the overall system architecture
2. Then, analyze how these changes fit within it
3. Identify any architectural violations or improvements
4. Consider long-term architectural implications </chain_of_thought>

<specific_analysis_tasks>

- Read architecture documentation: `/read docs/architecture.md README.md`
- Map component dependencies: `find . -name "*.ts" -exec grep -l "import.*from" {} \;`
- Analyze coupling metrics: Check import depth and circular dependencies
- Verify SOLID principles compliance
- Assess microservice boundaries if applicable </specific_analysis_tasks>

<evaluation_criteria>

- [ ] Changes align with existing architecture
- [ ] No new circular dependencies introduced
- [ ] Component boundaries respected
- [ ] Proper abstraction levels maintained
- [ ] API contracts preserved </evaluation_criteria>

##### 2. Code Philosopher Agent

<agent_role>Code Quality and Semantics Expert</agent_role>

<ultrathink>
Consider the deeper meaning and intent behind the code.
Is it expressing its purpose clearly?
Will future developers understand the intent?
</ultrathink>

<specific_analysis_tasks>

- Analyze variable/function naming: Are names self-documenting?
- Review abstraction levels: Not too abstract, not too concrete
- Check conceptual integrity: Does code follow a consistent mental model?
- Evaluate expressiveness: Can you understand intent without comments?
- Assess cognitive load: How hard is this code to understand? </specific_analysis_tasks>

<code_philosophy_checklist>

- [ ] Names accurately describe purpose
- [ ] Abstractions match problem domain
- [ ] Code reads like well-written prose
- [ ] Intent is clear without excessive comments
- [ ] Consistent metaphors throughout </code_philosophy_checklist>

##### 3. Security Sentinel Agent

<agent_role>Application Security Specialist</agent_role>

<security_mindset> Think like an attacker. Where are the vulnerabilities? What could go wrong? How could this be exploited? </security_mindset>

<specific_security_scans>

1. Input validation: `grep -r "req\.\(body\|params\|query\)" --include="*.js"`
2. SQL injection risks: `grep -r "query\|execute" --include="*.js" | grep -v "?"`
3. XSS vulnerabilities: Check for unescaped output
4. Authentication checks: Verify all endpoints have proper auth
5. Sensitive data exposure: `grep -r "password\|secret\|key\|token" --include="*.js"`
6. OWASP Top 10 compliance check </specific_security_scans>

<security_requirements>

- [ ] All inputs validated and sanitized
- [ ] No hardcoded secrets or credentials
- [ ] Proper authentication on all endpoints
- [ ] SQL queries use parameterization
- [ ] XSS protection implemented
- [ ] HTTPS enforced where needed </security_requirements>

##### 4. Performance Oracle Agent

<agent_role>Performance Optimization Expert</agent_role>

<performance_thinking> Think hard about algorithmic complexity and resource usage. Consider both time and space complexity. How will this scale with 10x, 100x, 1000x data? </performance_thinking>

<performance_analysis>

1. Algorithm complexity: Identify O(n²) or worse patterns
2. Database queries: Check for N+1 queries, missing indexes
3. Memory usage: Look for memory leaks, large allocations
4. Caching opportunities: What can be memoized or cached?
5. Network calls: Minimize round trips, batch where possible
6. Bundle size impact: Check import cost </performance_analysis>

<performance_benchmarks>

- [ ] No algorithms worse than O(n log n) without justification
- [ ] Database queries use proper indexes
- [ ] Memory usage bounded and predictable
- [ ] Response times under 200ms for API calls
- [ ] Bundle size increase < 5KB </performance_benchmarks>

##### 5. Quality Guardian Agent

<agent_role>Code Quality Assurance Specialist</agent_role>

<quality_focus> Ensure code is maintainable, testable, and follows best practices. Think about the next developer who will work on this code. </quality_focus>

<quality_metrics>

1. Cyclomatic complexity: `npx complexity-report src/`
2. Code coverage: `npm test -- --coverage`
3. Duplication: `npx jscpd src/`
4. Linting: `npm run lint`
5. Type safety: `npm run typecheck`
6. Documentation coverage: Check JSDoc/TSDoc completeness </quality_metrics>

<quality_standards>

- [ ] Cyclomatic complexity < 10 per function
- [ ] Test coverage > 80%
- [ ] No significant code duplication
- [ ] Zero linting errors
- [ ] Full type safety (no `any` types)
- [ ] Public APIs documented </quality_standards>

#### Secondary Analysis Agents:

6. **Integration Orchestrator Agent**
   - API contract validation
   - Service mesh compatibility
   - Message queue integration
   - Event stream consistency
   - Backward compatibility verification

7. **DevOps Harmony Agent**
   - CI/CD pipeline impact
   - Deployment strategy review
   - Configuration management
   - Infrastructure as Code analysis
   - Monitoring and observability

8. **Data Integrity Agent**
   - Database migration safety
   - Data validation completeness
   - Transaction boundary correctness
   - Referential integrity preservation
   - Data privacy compliance

9. **User Experience Agent**
   - API usability assessment
   - Error message clarity
   - Performance perception impact
   - Feature discoverability
   - Accessibility compliance

10. **Technical Debt Analyst Agent**
    - Debt accumulation assessment
    - Refactoring opportunity identification
    - Code duplication analysis
    - Deprecated API usage
    - TODO/FIXME evaluation

### 4. Ultra-Thinking Deep Dive Phases

<ultrathink_instruction> For each phase below, spend maximum cognitive effort. Think step by step. Consider all angles. Question assumptions. </ultrathink_instruction>

#### Phase 1: Holistic System Understanding

<thinking_prompt> ULTRA-THINK: Comprehend the entire system context. Load the complete mental model of the system into your working memory. How do all the pieces fit together? </thinking_prompt>

<specific_analysis_steps>

1. **System Mapping**
   - Read all README files: `find . -name "README*" -type f`
   - Analyze package.json/requirements.txt for tech stack
   - Map service boundaries and interfaces

2. **Business Domain Understanding**
   - What problem does this solve?
   - Who are the users?
   - What are the critical business rules?

3. **Cross-Cutting Concerns**
   - Authentication/Authorization flows
   - Logging and monitoring
   - Error handling patterns
   - Data validation approaches

4. **System Consistency Check**
   - Naming conventions across modules
   - Error handling consistency
   - API design patterns
   - Data model coherence </specific_analysis_steps>

<deliverable>
Complete system context map with component interactions
</deliverable>

#### Phase 2: Temporal Analysis

<thinking_prompt> ULTRA-THINK: Analyze changes across time dimensions. How did we get here? Where are we going? What's the migration path? </thinking_prompt>

<temporal_analysis_matrix> | Dimension | Analysis Focus | Key Questions | |-----------|---------------|---------------| | **Past** | Git history, evolution | What problems led to current design? | | **Present** | Current state quality | Does implementation match requirements? | | **Future** | Maintainability | Will this scale? Is it extensible? | | **Migration** | Upgrade paths | How do we evolve without breaking? | | **Lifecycle** | End-to-end | From development to deprecation | </temporal_analysis_matrix>

<concrete_actions>

- Review git log for historical context: `git log --oneline --graph -20`
- Check for technical debt markers: `grep -r "TODO\|FIXME\|technical.debt"`
- Assess upgrade complexity for dependencies
- Consider backward compatibility requirements </concrete_actions>

#### Phase 3: Stakeholder Perspective Analysis

<thinking_prompt> ULTRA-THINK: Put yourself in each stakeholder's shoes. What matters to them? What are their pain points? </thinking_prompt>

<stakeholder_perspectives>

1. **Developer Perspective** <questions>
   - How easy is this to understand and modify?
   - Are the APIs intuitive?
   - Is debugging straightforward?
   - Can I test this easily? </questions>

2. **Operations Perspective** <questions>
   - How do I deploy this safely?
   - What metrics and logs are available?
   - How do I troubleshoot issues?
   - What are the resource requirements? </questions>

3. **End User Perspective** <questions>
   - Is the feature intuitive?
   - Are error messages helpful?
   - Is performance acceptable?
   - Does it solve my problem? </questions>

4. **Security Team Perspective** <questions>
   - What's the attack surface?
   - Are there compliance requirements?
   - How is data protected?
   - What are the audit capabilities? </questions>

5. **Business Perspective** <questions>
   - What's the ROI?
   - Are there legal/compliance risks?
   - How does this affect time-to-market?
   - What's the total cost of ownership? </questions> </stakeholder_perspectives>

#### Phase 4: Scenario Exploration

<thinking_prompt> ULTRA-THINK: Explore edge cases and failure scenarios. What could go wrong? How does the system behave under stress? </thinking_prompt>

<scenario_checklist>

- [ ] **Happy Path**: Normal operation with valid inputs
- [ ] **Invalid Inputs**: Null, empty, malformed data
- [ ] **Boundary Conditions**: Min/max values, empty collections
- [ ] **Concurrent Access**: Race conditions, deadlocks
- [ ] **Scale Testing**: 10x, 100x, 1000x normal load
- [ ] **Network Issues**: Timeouts, partial failures
- [ ] **Resource Exhaustion**: Memory, disk, connections
- [ ] **Security Attacks**: Injection, overflow, DoS
- [ ] **Data Corruption**: Partial writes, inconsistency
- [ ] **Cascading Failures**: Downstream service issues </scenario_checklist>

<scenario_testing_commands>

```bash
# Load testing
ab -n 1000 -c 10 http://localhost:3000/api/endpoint

# Memory profiling
node --inspect app.js
# Then use Chrome DevTools

# Chaos testing (if configured)
npm run chaos-test
```

</scenario_testing_commands>

#### Phase 5: Alternative Solution Analysis

<thinking_prompt> ULTRA-THINK: Challenge the current approach. Is there a better way? What are we missing? </thinking_prompt>

<alternative_evaluation_framework>

1. **Identify Current Approach**
   - What pattern/solution is being used?
   - What are its strengths and weaknesses?

2. **Generate Alternatives**
   - What are 3-5 other ways to solve this?
   - What do other successful projects do?
   - What's the industry best practice?

3. **Trade-off Analysis**
   - Performance vs. Simplicity
   - Flexibility vs. Complexity
   - Time-to-implement vs. Long-term maintenance
   - Build vs. Buy vs. Open source

4. **Recommendation**
   - Which approach is best for this context?
   - What would need to change to switch?
   - Is it worth the migration effort? </alternative_evaluation_framework>

<example_alternatives> | Current | Alternative 1 | Alternative 2 | Alternative 3 | |---------|--------------|---------------|---------------| | REST API | GraphQL | gRPC | WebSockets | | Callbacks | Promises | Async/Await | RxJS | | Monolith | Microservices | Serverless | Modular Monolith | </example_alternatives>

### 5. Comprehensive Testing and Validation

#### Testing Sub-Agents:

1. **Unit Test Auditor**
   - Test coverage analysis
   - Test quality assessment
   - Mock usage validation
   - Assertion completeness
   - Edge case coverage

2. **Integration Test Validator**
   - End-to-end scenario coverage
   - External service simulation
   - Data flow validation
   - Error propagation testing
   - Contract testing verification

3. **Performance Test Analyzer**
   - Load testing execution
   - Stress testing validation
   - Memory profiling
   - CPU usage analysis
   - Response time measurement

4. **Security Test Specialist**
   - Penetration testing simulation
   - OWASP compliance check
   - Authentication testing
   - Authorization verification
   - Input fuzzing

### 6. Multi-Angle Review Perspectives

#### Technical Excellence Angle

- Code craftsmanship evaluation
- Engineering best practices
- Technical documentation quality
- Tooling and automation assessment

#### Business Value Angle

- Feature completeness validation
- Performance impact on users
- Cost-benefit analysis
- Time-to-market considerations

#### Risk Management Angle

- Security risk assessment
- Operational risk evaluation
- Compliance risk verification
- Technical debt accumulation

#### Team Dynamics Angle

- Code review etiquette
- Knowledge sharing effectiveness
- Collaboration patterns
- Mentoring opportunities

### 7. Advanced Analysis Techniques

#### Static Analysis Deep Dive

```bash
# Run comprehensive static analysis
npm run lint -- --fix-dry-run
npm run typecheck -- --strict
npx depcheck
npx npm-check-updates
npx license-checker
npx bundlephobia-cli package.json
```

#### Dynamic Analysis Execution

```bash
# Profile runtime behavior
npm run test -- --coverage
npm run test:performance
npm run test:memory
npm run test:security
```

#### Code Metrics Collection

```bash
# Gather code quality metrics
npx code-complexity .
npx plato -r -d report src
npx jscpd src
npx madge --circular src
```

### 8. Review Synthesis and Multi-Format Reporting

#### Report Generation Sub-Agents:

1. **Executive Summary Agent**
   - High-level findings synthesis
   - Risk assessment summary
   - Recommendation prioritization
   - Decision support matrix

2. **Technical Detail Agent**
   - Line-by-line code analysis
   - Specific improvement suggestions
   - Code example generation
   - Reference documentation

3. **Visual Report Agent**
   - Dependency graphs creation
   - Architecture diagrams
   - Complexity heatmaps
   - Trend analysis charts

4. **Action Plan Agent**
   - Prioritized fix list
   - Implementation roadmap
   - Resource estimation
   - Timeline recommendations

### 9. Continuous Improvement Loop

#### Feedback Collection Agent

- Gather review effectiveness metrics
- Track issue resolution rates
- Monitor false positive rates
- Collect developer satisfaction

#### Review Pattern Learning Agent

- Identify recurring issues
- Build issue prevention guidelines
- Create review checklists
- Update best practices

### 10. Simplification and Minimalism Review

#### Code Simplicity Agent

**Purpose: Final pass to ensure the changes are as simple and minimal as possible**

Ultra-Think Questions:

- Is every line of code necessary?
- Can any complex logic be simplified?
- Are there redundant checks or validations?
- Can any abstractions be removed without loss of clarity?
- Are all features actually required?

#### Minimalism Checklist:

- [ ] Remove unnecessary comments (code should be self-documenting)
- [ ] Eliminate redundant error checks
- [ ] Simplify complex conditionals
- [ ] Remove unused imports and variables
- [ ] Consolidate similar functions
- [ ] Question every abstraction layer
- [ ] Reduce configuration options to essentials
- [ ] Remove "just in case" code
- [ ] Simplify data structures where possible
- [ ] Eliminate premature optimizations

#### Conciseness Review:

- [ ] Can any multi-line expressions be simplified?
- [ ] Are there verbose patterns that can be more idiomatic?
- [ ] Can error messages be more concise while remaining clear?
- [ ] Is the documentation unnecessarily verbose?
- [ ] Can test cases be combined without losing coverage?

#### YAGNI (You Aren't Gonna Need It) Analysis:

- [ ] Remove features not currently needed
- [ ] Eliminate extensibility points without clear use cases
- [ ] Question generic solutions for specific problems
- [ ] Remove configuration for unlikely scenarios
- [ ] Simplify APIs to match actual usage

#### Final Simplification Actions:

```bash
# Generate simplification report
claude-code "
Review all changes for opportunities to simplify:
1. Identify overly complex implementations
2. Find redundant code patterns
3. Suggest more minimal alternatives
4. Highlight unnecessary abstractions
5. Recommend what can be removed
" --worktree "$worktree_path"

# Create minimalism recommendations
echo "## Simplification Opportunities" > simplification.md
echo "### Code that can be removed:" >> simplification.md
echo "### Patterns that can be simplified:" >> simplification.md
echo "### Abstractions to reconsider:" >> simplification.md
```

## Execution Workflow

<workflow_overview> A systematic 8-phase approach ensuring thorough review coverage. Each phase builds on the previous, with clear success criteria. </workflow_overview>

### Phase 1: Immediate Worktree Setup and Checkout

<critical_first_step> THIS MUST HAPPEN FIRST. No exceptions. All analysis depends on local code access. </critical_first_step>

<step_by_step_commands>

```bash
# Step 1: Capture review target
review_target="${1:-$(gh pr list --limit 1 --json number --jq '.[0].number')}"
echo "Reviewing: $review_target"

# Step 2: Validate git repository
git_root=$(git rev-parse --show-toplevel 2>/dev/null)
if [ $? -ne 0 ]; then
    echo "Error: Not in a git repository"
    exit 1
fi

# Step 3: Determine review type
if [[ "$review_target" =~ ^[0-9]+$ ]]; then
    pr_identifier="$review_target"
    review_type="pr"
elif [[ "$review_target" =~ github\.com/.*/pull/([0-9]+) ]]; then
    pr_identifier="${BASH_REMATCH[1]}"
    review_type="pr"
elif [[ -f "$review_target" ]]; then
    review_type="document"
    doc_path="$review_target"
else
    echo "Error: Invalid review target"
    exit 1
fi

# Step 4: Create worktree for PR reviews
if [ "$review_type" = "pr" ]; then
    worktree_base="$git_root/.worktrees/reviews"
    worktree_path="$worktree_base/pr-$pr_identifier-$(date +%Y%m%d-%H%M%S)"

    mkdir -p "$worktree_base"

    # Fetch PR metadata
    pr_data=$(gh pr view $pr_identifier --json title,author,baseRefName,headRefName)
    pr_branch=$(echo "$pr_data" | jq -r '.headRefName')

    # Create worktree with PR branch
    git fetch origin "pull/$pr_identifier/head:pr-$pr_identifier"
    git worktree add "$worktree_path" "pr-$pr_identifier"

    # Navigate to worktree - CRITICAL
    cd "$worktree_path"
    echo "Working in: $worktree_path"

    # Install dependencies
    if [ -f "package.json" ]; then
        npm install --silent
    elif [ -f "requirements.txt" ]; then
        pip install -r requirements.txt
    elif [ -f "Gemfile" ]; then
        bundle install
    fi
fi
```

</step_by_step_commands>

<verification_checklist>

- [ ] Review target identified correctly
- [ ] Worktree created at correct path
- [ ] PR branch checked out successfully
- [ ] Dependencies installed
- [ ] Working directory is now the worktree </verification_checklist>

### Phase 2: Parallel Context Loading

Execute all context gathering agents simultaneously:

```bash
# Run in parallel using subshells
(
  # Context Archaeologist
  git log --oneline -50 --graph --all
  git blame -w -M -C src/
) &

(
  # Dependency Detective
  npm list --depth=3
  npm audit
  npm outdated
) &

(
  # Pattern Recognition
  grep -r "TODO\|FIXME\|HACK" .
  find . -name "*.test.*" -type f
) &

wait  # Wait for all parallel jobs
```

### Phase 3: Deep Multi-Agent Analysis

Launch all analysis agents in parallel with specific focus areas:

```bash
# Create analysis directories
mkdir -p analysis/{architecture,security,performance,quality,integration}

# Launch parallel analysis agents
parallel --jobs 10 << 'EOF'
analyze_architecture.sh > analysis/architecture/report.md
analyze_security.sh > analysis/security/report.md
analyze_performance.sh > analysis/performance/report.md
analyze_quality.sh > analysis/quality/report.md
analyze_integration.sh > analysis/integration/report.md
analyze_devops.sh > analysis/devops/report.md
analyze_data.sh > analysis/data/report.md
analyze_ux.sh > analysis/ux/report.md
analyze_debt.sh > analysis/debt/report.md
analyze_testing.sh > analysis/testing/report.md
EOF
```

### Phase 4: Ultra-Thinking Synthesis

```bash
# Aggregate all findings
cat analysis/*/report.md > analysis/complete_findings.md

# Generate synthesis report using AI
claude-code "
Perform ultra-deep synthesis of all analysis reports:
1. Identify critical patterns across all agents
2. Find correlation between different findings
3. Generate holistic system assessment
4. Create prioritized action matrix
5. Produce executive summary
" --input analysis/complete_findings.md
```

### Phase 5: Interactive Review Session

```bash
# Start interactive review session
claude-code review-interactive \
  --worktree "$worktree_path" \
  --findings analysis/complete_findings.md \
  --mode collaborative
```

### Phase 6: Multi-Format Report Generation

```bash
# Generate comprehensive reports
generate_executive_report.sh > reports/executive_summary.md
generate_technical_report.sh > reports/technical_details.md
generate_visual_report.sh > reports/visual_analysis.html
generate_action_plan.sh > reports/action_plan.md

# Create unified review document
cat reports/* > final_review.md
```

### Phase 7: GitHub Integration and Feedback

```bash
# Post comprehensive review
gh pr review $pr_identifier \
  --body-file final_review.md \
  --comment

# Add inline code comments
gh pr comment $pr_identifier \
  --body-file analysis/code_comments.md

# Create follow-up issues if needed
create_github_issues.sh analysis/action_plan.md
```

### Phase 8: Knowledge Preservation

```bash
# Archive review artifacts
tar -czf "reviews/pr-$pr_identifier-$(date +%Y%m%d-%H%M%S).tar.gz" \
  analysis/ reports/ final_review.md

# Update team knowledge base
update_review_patterns.sh analysis/patterns.md
update_best_practices.sh analysis/learnings.md

# Clean up worktree (optional)
cd "$git_root"
git worktree remove "$worktree_path"
```

## Advanced Review Criteria

### Code Quality Dimensions

#### Structural Quality

- [ ] Single Responsibility Principle adherence
- [ ] Open/Closed Principle compliance
- [ ] Liskov Substitution Principle validation
- [ ] Interface Segregation verification
- [ ] Dependency Inversion confirmation

#### Behavioral Quality

- [ ] Idempotency where appropriate
- [ ] Thread safety validation
- [ ] Transaction consistency
- [ ] State management correctness
- [ ] Event ordering preservation

#### Evolutionary Quality

- [ ] API versioning strategy
- [ ] Feature toggle implementation
- [ ] Gradual rollout capability
- [ ] Rollback mechanism presence
- [ ] Migration path clarity

### Security Assessment Matrix

#### Application Security

- [ ] Input sanitization completeness
- [ ] Output encoding correctness
- [ ] Session management security
- [ ] CSRF protection implementation
- [ ] Content Security Policy

#### Infrastructure Security

- [ ] Secret management practices
- [ ] Network segmentation
- [ ] Least privilege implementation
- [ ] Audit logging completeness
- [ ] Encryption at rest/transit

#### Compliance Requirements

- [ ] GDPR data handling
- [ ] PCI DSS compliance
- [ ] HIPAA requirements
- [ ] SOC 2 controls
- [ ] Industry standards

### Performance Optimization Checklist

#### Frontend Performance

- [ ] Bundle size optimization
- [ ] Lazy loading implementation
- [ ] Image optimization
- [ ] Cache strategy effectiveness
- [ ] Critical rendering path

#### Backend Performance

- [ ] Query optimization
- [ ] Connection pooling
- [ ] Caching layer usage
- [ ] Async processing
- [ ] Resource utilization

#### Scalability Factors

- [ ] Horizontal scaling capability
- [ ] Database sharding readiness
- [ ] Stateless design
- [ ] Queue processing efficiency
- [ ] Load balancing compatibility

## Ultra-Thinking Methodologies

### Deep Semantic Analysis

1. **Intent Extraction**: Understand the true purpose behind each change
2. **Context Mapping**: Place changes within broader system context
3. **Impact Prediction**: Forecast long-term effects of changes
4. **Risk Quantification**: Assign probability and severity to risks
5. **Opportunity Identification**: Find improvement possibilities

### Cognitive Review Patterns

1. **Divergent Thinking**: Explore multiple solution paths
2. **Convergent Analysis**: Synthesize findings into actions
3. **Lateral Connections**: Find non-obvious relationships
4. **Vertical Integration**: Connect layers of abstraction
5. **Temporal Projection**: Consider time-based implications

### Systems Thinking Application

1. **Feedback Loop Analysis**: Identify reinforcing/balancing loops
2. **Emergence Detection**: Spot emergent system properties
3. **Boundary Critique**: Question system boundaries
4. **Leverage Point Identification**: Find high-impact changes
5. **Resilience Assessment**: Evaluate system robustness

## Review Communication Framework

### Feedback Delivery Principles

1. **Clarity**: Use precise, unambiguous language
2. **Context**: Provide sufficient background
3. **Constructiveness**: Focus on improvement
4. **Specificity**: Give concrete examples
5. **Actionability**: Suggest clear next steps

### Review Tone Guidelines

- **Appreciative**: Acknowledge good practices
- **Educational**: Explain reasoning behind feedback
- **Collaborative**: Invite discussion and clarification
- **Respectful**: Maintain professional courtesy
- **Encouraging**: Motivate continuous improvement

### Priority Communication

1. **🔴 Critical**: Security vulnerabilities, data loss risks
2. **🟠 High**: Bugs, performance issues, breaking changes
3. **🟡 Medium**: Code quality, maintainability concerns
4. **🟢 Low**: Style preferences, minor optimizations
5. **🔵 Informational**: Learning opportunities, future considerations

## Continuous Review Enhancement

### Metrics Collection

- Review turnaround time
- Issue detection rate
- False positive ratio
- Developer satisfaction score
- Code quality improvement rate

### Pattern Recognition

- Common issue categories
- Recurring architectural problems
- Frequent security oversights
- Performance anti-patterns
- Testing gaps

### Knowledge Building

- Review checklist updates
- Best practice documentation
- Team learning sessions
- Review automation opportunities
- Tool enhancement suggestions

## Expected Outcomes

<outcome_summary> A comprehensive, actionable review that improves code quality, catches issues early, and enhances team knowledge. </outcome_summary>

### Immediate Deliverables

<review_artifacts>

1. **Comprehensive Review Report** (`final_review.md`)
   - Executive summary with key findings
   - Detailed technical analysis
   - Security vulnerabilities identified
   - Performance optimization opportunities
   - Code quality improvements

2. **GitHub Integration**
   - Review comments posted to PR
   - Line-specific suggestions
   - Approval/change request decision
   - Follow-up issues created

3. **Simplification Report** (`simplification.md`)
   - Unnecessary code identified
   - Complexity reduction opportunities
   - YAGNI violations found
   - Minimalism recommendations

4. **Knowledge Artifacts**
   - Pattern library updates
   - Best practices documentation
   - Team learnings captured
   - Review checklist improvements </review_artifacts>

### Quality Metrics

<success_metrics> | Metric | Target | Measurement | |--------|--------|-------------| | Issue Detection Rate | > 90% | Critical issues found vs. production escapes | | False Positive Rate | < 10% | Invalid findings vs. total findings | | Review Completeness | 100% | All files analyzed by relevant agents | | Actionability | > 95% | Findings with clear fix instructions | | Time to Review | < 30min | For PRs under 500 lines | </success_metrics>

### Long-term Benefits

<organizational_impact>

1. **Engineering Excellence**
   - Consistent code quality standards
   - Reduced technical debt accumulation
   - Faster onboarding through patterns
   - Improved system reliability

2. **Security Posture**
   - Vulnerabilities caught pre-production
   - Security patterns enforced
   - Compliance requirements met
   - Audit trail maintained

3. **Performance Optimization**
   - Bottlenecks identified early
   - Resource usage optimized
   - Scalability issues prevented
   - User experience protected

4. **Team Growth**
   - Knowledge sharing through reviews
   - Best practices dissemination
   - Mentoring opportunities
   - Continuous improvement culture </organizational_impact>

### Review Philosophy

<core_principles>

- **Constructive**: Build up, don't tear down
- **Specific**: Concrete examples and fixes
- **Educational**: Explain the "why"
- **Collaborative**: Partner with developers
- **Pragmatic**: Balance ideal with practical </core_principles>

Now present the review to the user. in Cricital, High, Medium, Low, Informational order. with recomendations for each to do.
