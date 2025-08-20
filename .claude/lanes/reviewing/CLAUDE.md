# Reviewing Lane - My Quality Preferences

**Lane Purpose**: Quality assurance, compliance validation, performance optimization  
**Lead Agents**: @swiss-compliance-specialist + @qa-testing-specialist  
**My Style**: Thorough, Swiss-compliance-obsessed, constructive feedback

> See `llms.txt` for unchanging quality standards and compliance rules.
> This file contains my review preferences and patterns that evolve.

## 🎯 My Review Approach

### Primary Responsibilities
- **Swiss Compliance Validation**: eCH-0059, CH-DSG, WCAG 2.1 AA compliance
- **Quality Assurance**: Code review, functionality testing, performance validation
- **Demo Validation**: 35-minute presentation readiness, scenario testing
- **Performance Optimization**: Core Web Vitals >90, page load <2 seconds
- **Accessibility Testing**: Swiss accessibility standards and international compliance
- **Security Review**: Data protection and security best practices

### When to Use This Lane
- Reviewing completed features from Building Lane
- Validating Swiss compliance requirements
- Testing demo scenarios and presentation readiness
- Performance auditing and optimization recommendations
- Security and accessibility validation
- Final approval before production deployment

## 📋 Task Management System

### Creating New Tasks
Each review gets its own `.md` file in this folder:

**File Naming Convention:**
```
YYYY-MM-DD_review-[feature-name].md
```

**Review Task Template:**
```markdown
# Review: [Feature Name]

**Status**: [Received/In Progress/Issues Found/Approved/Sent Back]
**Priority**: [High/Medium/Low]
**Reviewer**: [@agent-name]
**Started**: [Date]
**From**: [Building Lane/Planning Lane/Direct]
**Demo Impact**: [High/Medium/Low/None]

## Review Requirements
[From handoff documentation]

## Review Scope
- [ ] Functionality testing
- [ ] Swiss compliance validation
- [ ] Performance testing
- [ ] Accessibility testing
- [ ] Security review
- [ ] Demo scenario validation

## Swiss Compliance Checklist

### eCH-0059 Accessibility
- [ ] Keyboard navigation functional
- [ ] Screen reader compatible
- [ ] Color contrast >4.5:1
- [ ] Font size minimum 16px
- [ ] Touch targets 44px minimum
- [ ] Alternative text for images
- [ ] Form labels properly associated

### CH-DSG Data Protection
- [ ] Data collection minimized
- [ ] Privacy notices present
- [ ] Consent mechanisms working
- [ ] Data retention policies implemented
- [ ] Right to deletion functional
- [ ] Data export capabilities

### Language & Cultural
- [ ] Swiss German text (no ß character)
- [ ] Formal addressing (Sie-Form)
- [ ] Canton-specific terminology
- [ ] Cultural appropriateness

## Quality Assurance Tests

### Functionality Tests
- [ ] All features work as specified
- [ ] Error handling appropriate
- [ ] Edge cases handled
- [ ] User workflows complete
- [ ] Integration points functional

### Performance Tests
- [ ] Core Web Vitals >90
- [ ] Page load time <2 seconds
- [ ] Mobile performance adequate
- [ ] Resource optimization effective
- [ ] Caching working properly

### Security Tests
- [ ] Input validation present
- [ ] XSS protection implemented
- [ ] CSRF tokens working
- [ ] Access controls correct
- [ ] Data sanitization proper

## Demo Validation

### Demo Scenarios
- [ ] Scenario 1: [Description] - Status
- [ ] Scenario 2: [Description] - Status
- [ ] Scenario 3: [Description] - Status

### Presentation Readiness
- [ ] Visual appearance professional
- [ ] Navigation flows smooth
- [ ] Content appropriate
- [ ] Performance adequate for demo
- [ ] Backup scenarios available

## Test Results

### Automated Tests
```
Performance Score: [Number]/100
Accessibility Score: [Number]/100
Security Scan: [Pass/Issues]
Browser Tests: [Pass/Fail]
```

### Manual Tests
[Detailed test results]

## Issues Found
### Critical Issues
- [ ] Issue 1: [Description] - Priority: High
- [ ] Issue 2: [Description] - Priority: High

### Minor Issues  
- [ ] Issue 1: [Description] - Priority: Low
- [ ] Issue 2: [Description] - Priority: Low

## Recommendations
### Immediate Actions Required
1. [Action 1]
2. [Action 2]

### Future Improvements
1. [Improvement 1]
2. [Improvement 2]

## Review Decision
**Status**: [Approved/Conditionally Approved/Rejected]
**Reason**: [Explanation]
**Next Steps**: [Actions required]

## Handoff Instructions
[If sending back to Building Lane or escalating to Planning Lane]
```

## 🤖 Agent Usage Patterns

### @swiss-compliance-specialist
**Use for:**
- eCH-0059 accessibility validation
- CH-DSG data protection review
- Swiss German language compliance
- Canton-specific requirement validation
- Cultural appropriateness assessment
- Legal compliance verification

**Example:**
```
@swiss-compliance-specialist: Review municipal feedback form for complete eCH-0059 and CH-DSG compliance including accessibility and data protection measures
```

### @qa-testing-specialist
**Use for:**
- Comprehensive testing strategies
- Automated test implementation
- Performance optimization
- Security testing
- Integration testing
- Demo scenario validation

**Example:**
```
@qa-testing-specialist: Create comprehensive test suite for all 4 municipal forms and validate demo presentation scenarios
```

### @drupal-performance-specialist
**Use for:**
- Core Web Vitals optimization
- Database query optimization
- Caching strategy review
- Frontend performance tuning
- Mobile performance optimization

**Example:**
```
@drupal-performance-specialist: Optimize Bruchtal site performance to achieve Core Web Vitals >90 and page load <2 seconds
```

## 🔄 Coordination Workflows

### Incoming Reviews

#### From Building Lane
**File Pattern**: `from-building_[feature-name].md`
```markdown
# Review Request from Building Lane: [Feature Name]

## Implementation Summary
[Copy from Building Lane handoff]

## Review Plan
### Swiss Compliance Review
1. eCH-0059 accessibility check
2. CH-DSG data protection validation
3. Language and cultural review

### Quality Assurance Review
1. Functionality testing
2. Performance validation
3. Security assessment

### Demo Impact Assessment
1. Presentation readiness
2. Scenario validation
3. User experience review

## Timeline
- Review start: [Date]
- Estimated completion: [Date]
- Demo deadline consideration: [Date]
```

#### Direct Compliance Requests
**File Pattern**: `compliance-review_[topic].md`
```markdown
# Compliance Review: [Topic]

## Compliance Requirements
[Specific Swiss/EU regulations]

## Review Scope
[What needs validation]

## Compliance Strategy
[How to validate]

## Deliverables
[Reports and certifications needed]
```

### Outgoing Feedback

#### Back to Building Lane (Issues Found)
**File Pattern**: `feedback-to-building_[feature-name].md`
```markdown
# Review Feedback to Building Lane: [Feature Name]

## Review Summary
**Overall Status**: [Approved/Issues Found/Rejected]
**Critical Issues**: [Count]
**Minor Issues**: [Count]

## Critical Issues (Must Fix)
### Issue 1: [Title]
**Severity**: Critical
**Description**: [Detailed description]
**Impact**: [Business/Demo impact]
**Solution**: [Recommended fix]
**Files Affected**: [List files]
**Swiss Compliance**: [If related to compliance]

### Issue 2: [Title]
[Same structure]

## Minor Issues (Should Fix)
[Same structure as critical but lower priority]

## Swiss Compliance Status
- **eCH-0059**: [Pass/Fail - Details]
- **CH-DSG**: [Pass/Fail - Details]  
- **Language**: [Pass/Fail - Details]

## Performance Results
- **Core Web Vitals**: [Score]/100
- **Page Load Time**: [Seconds]
- **Mobile Score**: [Score]/100

## Demo Readiness
- **Presentation Ready**: [Yes/No]
- **Scenarios Validated**: [Count/Total]
- **Backup Plans**: [Available/Needed]

## Recommendations for Building Lane
1. [Priority fix]
2. [Secondary fix]
3. [Future improvement]

## Re-review Requirements
After fixes:
- [ ] Retest critical issues
- [ ] Validate Swiss compliance
- [ ] Re-run performance tests
- [ ] Confirm demo scenarios

## Timeline
- **Expected fixes by**: [Date]
- **Re-review scheduled**: [Date]
- **Demo deadline**: [Date]
```

#### To Planning Lane (Architectural Issues)
**File Pattern**: `escalation-to-planning_[issue].md`
```markdown
# Escalation to Planning Lane: [Issue]

## Issue Description
[What was discovered during review]

## Why Escalating
[Why this needs architectural/planning input]

## Technical Impact
[How this affects current implementation]

## Demo Impact  
[How this affects presentation]

## Recommended Planning Action
[What Planning Lane should address]

## Timeline Concerns
[Deadlines and schedule impact]
```

## 🧪 Testing Frameworks & Tools

### Automated Testing Tools

#### Browser Testing (MCP Tools)
```bash
# Performance audit
mcp__browser-tools__runPerformanceAudit

# Accessibility audit  
mcp__browser-tools__runAccessibilityAudit

# SEO audit
mcp__browser-tools__runSEOAudit

# Screenshots for documentation
mcp__browser-tools__takeScreenshot
```

#### Puppeteer Testing
```bash
# Automated browser testing
mcp__puppeteer__puppeteer_navigate
mcp__puppeteer__puppeteer_click
mcp__puppeteer__puppeteer_fill
mcp__puppeteer__puppeteer_screenshot
```

#### Accessibility Testing
```bash
# WCAG compliance testing
mcp__a11y-accessibility__test_accessibility

# Color contrast validation
mcp__a11y-accessibility__check_color_contrast

# ARIA attributes validation
mcp__a11y-accessibility__check_aria_attributes
```

### Manual Testing Processes

#### Swiss Compliance Testing
```markdown
## eCH-0059 Compliance Test
1. Keyboard navigation test
2. Screen reader compatibility
3. Color contrast measurements
4. Font size verification
5. Touch target validation
6. Form accessibility check

## CH-DSG Compliance Test  
1. Data collection review
2. Privacy notice validation
3. Consent mechanism test
4. Data retention check
5. Deletion capability test
6. Export functionality test
```

#### Demo Scenario Testing
```markdown
## 35-Minute Demo Test
### Segment 1: System Overview (10 min)
- [ ] Navigation demonstration
- [ ] Responsive design showcase
- [ ] Municipality customization
- [ ] Performance demonstration

### Segment 2: Forms (7 min)
- [ ] Form builder demonstration
- [ ] Submission workflow
- [ ] Status tracking
- [ ] Approval process

### Segment 3: Backend (15 min)
- [ ] Content management
- [ ] Directory management
- [ ] Workflow demonstration
- [ ] AI features showcase
```

## 📊 Quality Metrics & Reporting

### Performance Benchmarks
```yaml
Core Web Vitals:
  Target: ">90"
  Current: "[Score]"
  Status: "[Pass/Fail]"

Page Load Time:
  Target: "<2 seconds"
  Current: "[Seconds]"
  Status: "[Pass/Fail]"

Accessibility:
  Target: "WCAG 2.1 AA + eCH-0059"
  Current: "[Score]"
  Status: "[Pass/Fail]"
```

### Compliance Status Board
**File**: `compliance-status.md` (Updated after each review)
```markdown
# Swiss Compliance Status Board

## eCH-0059 Accessibility
**Overall Status**: [Compliant/Issues/Not Tested]

### Completed Validations
- [ ] Keyboard navigation - [Status]
- [ ] Screen reader compatibility - [Status]
- [ ] Color contrast - [Status]
- [ ] Font sizes - [Status]
- [ ] Touch targets - [Status]

## CH-DSG Data Protection
**Overall Status**: [Compliant/Issues/Not Tested]

### Completed Validations
- [ ] Data minimization - [Status]
- [ ] Privacy notices - [Status]
- [ ] Consent mechanisms - [Status]
- [ ] Retention policies - [Status]

## Language & Cultural
- [ ] Swiss German compliance - [Status]
- [ ] Formal addressing - [Status]
- [ ] Cultural appropriateness - [Status]
```

### Review Status Tracking
**File**: `review-status.md` (Updated daily)
```markdown
# Reviewing Lane Status

**Active Reviews**: [Count]
**Pending Issues**: [Count]
**Approved Features**: [Count]
**Demo Ready Components**: [Count]

## This Week's Reviews
### Completed
- [Feature 1] - Approved
- [Feature 2] - Issues found, sent back
- [Feature 3] - Conditionally approved

### In Progress
- [Feature 4] - Swiss compliance review
- [Feature 5] - Performance testing
- [Feature 6] - Demo scenario validation

### Upcoming
- [Feature 7] - Scheduled [Date]
- [Feature 8] - Scheduled [Date]

## Compliance Summary
- **eCH-0059 Ready**: [Count/Total] features
- **CH-DSG Compliant**: [Count/Total] features
- **Performance >90**: [Count/Total] features

## Demo Readiness
- **Presentation Ready**: [Percentage]%
- **All Scenarios Tested**: [Yes/No]
- **Backup Plans Available**: [Yes/No]
```

## 🚨 Issue Escalation & Resolution

### Issue Severity Levels
```yaml
Critical:
  - Demo-blocking issues
  - Security vulnerabilities
  - Swiss compliance failures
  - Performance <70

High:
  - Functionality failures
  - Accessibility violations
  - Data protection issues
  - Performance 70-89

Medium:
  - UX improvements needed
  - Minor compliance gaps
  - Performance optimizations
  - Code quality issues

Low:
  - Cosmetic improvements
  - Documentation updates
  - Future enhancements
  - Nice-to-have features
```

### Escalation Workflow
```markdown
## Critical Issue Escalation
1. **Immediate**: Document in issue tracker
2. **Within 1 hour**: Notify Building Lane
3. **Within 2 hours**: Assess demo impact
4. **If architectural**: Escalate to Planning Lane
5. **If urgent**: Schedule emergency coordination

## Review Cycle Management
1. **Daily**: Update review status
2. **Weekly**: Compliance status summary
3. **Before demo**: Complete readiness review
4. **Post-review**: Document lessons learned
```

## 💡 Best Practices

### Swiss Compliance Excellence
- Always test with Swiss users in mind
- Validate cultural appropriateness
- Ensure formal addressing throughout
- Test with screen readers in German
- Verify canton-specific requirements

### Quality Assurance Standards
- Test on multiple devices and browsers
- Validate all user workflows
- Check edge cases and error conditions
- Ensure graceful failure handling
- Document all test scenarios

### Demo Validation
- Test entire 35-minute presentation flow
- Validate all demonstration scenarios
- Ensure smooth transitions
- Prepare backup plans
- Document potential issues

### Performance Optimization
- Monitor Core Web Vitals continuously
- Test on slow connections
- Validate mobile performance
- Check resource loading times
- Optimize critical rendering path

---

**Remember**: This lane is the final quality gate. Nothing reaches production or demo without passing through thorough review. Your standards ensure Swiss compliance, accessibility, performance, and demo readiness. Be thorough but constructive in feedback to Building Lane.