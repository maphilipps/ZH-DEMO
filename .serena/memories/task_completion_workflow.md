# Task Completion Workflow

## Pre-Development Checklist
- [ ] **Linear Task Created**: Task exists with clear acceptance criteria
- [ ] **Requirements Validated**: Technical feasibility confirmed
- [ ] **Branch Created**: Feature branch from main with Linear task ID
- [ ] **Development Environment**: DDEV running, dependencies installed

## Development Process
### Code Implementation
- [ ] **Follow Coding Standards**: PSR-12 (PHP), ESLint (JS), Stylelint (CSS)
- [ ] **Component Development**: SDC structure with proper schema
- [ ] **Accessibility Implementation**: WCAG 2.1 AA compliance
- [ ] **German Brand Compliance**: "adesso" lowercase validation
- [ ] **Performance Considerations**: Core Web Vitals optimization

### Testing During Development
- [ ] **Unit Tests**: Write/update Vitest tests for new functionality
- [ ] **Component Testing**: Test in Storybook with all variations
- [ ] **Manual Testing**: Cross-browser and device testing
- [ ] **Accessibility Testing**: Screen reader and keyboard navigation

## Pre-Commit Quality Gates
```bash
# Run complete QA pipeline
npm run qa:full

# Individual checks if needed
npm run lint:all           # Linting
npm run test               # Unit tests
npm run test:coverage      # Coverage check
npm run visual:test        # Visual regression
```

## Pre-Pull Request Checklist
- [ ] **All Tests Passing**: Unit, visual regression, E2E tests
- [ ] **Performance Benchmarks**: Lighthouse audit scores >90
- [ ] **Accessibility Audit**: WCAG 2.1 AA compliance verified
- [ ] **Configuration Export**: `ddev drush cex` if Drupal config changed
- [ ] **Documentation Updated**: Storybook stories, README updates
- [ ] **Linear Task Updated**: Progress and implementation notes

## Pull Request Creation
### PR Requirements
- [ ] **Linear Task Reference**: Link to Linear task in description
- [ ] **Testing Checklist**: Include manual testing steps
- [ ] **Screenshots/Videos**: Visual changes documented
- [ ] **Breaking Changes**: Note any breaking changes
- [ ] **Performance Impact**: Document performance implications

### Automated Checks
- [ ] **CI/CD Pipeline**: All automated tests pass
- [ ] **Security Scan**: No new vulnerabilities introduced
- [ ] **Bundle Analysis**: Asset size impact acceptable
- [ ] **Visual Regression**: No unintended visual changes

## Code Review Process
### Review Requirements
- [ ] **Minimum 2 Reviewers**: Technical and business/UX review
- [ ] **Code Quality**: Follows project standards and patterns
- [ ] **Security Review**: No security vulnerabilities
- [ ] **Performance Review**: No performance regressions
- [ ] **Accessibility Review**: WCAG compliance verified

### Review Checklist for Reviewers
- [ ] **Functionality**: Features work as specified
- [ ] **Code Quality**: Clean, readable, maintainable code
- [ ] **Test Coverage**: Adequate test coverage for changes
- [ ] **Documentation**: Proper documentation included
- [ ] **German Compliance**: Brand guidelines followed

## Pre-Merge Final Checks
- [ ] **All Approvals**: Required reviews completed
- [ ] **Conflicts Resolved**: No merge conflicts
- [ ] **Branch Updated**: Latest changes from main merged
- [ ] **Final Testing**: Last verification of functionality
- [ ] **Deployment Plan**: Production deployment strategy confirmed

## Post-Merge Activities
### Immediate Actions
- [ ] **Linear Task Status**: Update to "Completed" or "Ready for Testing"
- [ ] **Branch Cleanup**: Delete feature branch after merge
- [ ] **Deployment Monitoring**: Watch for deployment issues
- [ ] **Performance Monitoring**: Verify no performance regressions

### Documentation Updates
- [ ] **Release Notes**: Add to release documentation
- [ ] **Team Communication**: Notify team of new features/changes
- [ ] **Knowledge Sharing**: Document learnings and decisions
- [ ] **Stakeholder Update**: Inform business stakeholders

## Quality Assurance Validation
### Staging Environment
- [ ] **Feature Testing**: Complete feature testing in staging
- [ ] **Integration Testing**: Verify integration with other features
- [ ] **Performance Testing**: Core Web Vitals measurement
- [ ] **Accessibility Testing**: Full accessibility audit
- [ ] **Content Editor Testing**: UX validation by content editors

### Production Deployment
- [ ] **Deployment Checklist**: Follow deployment procedures
- [ ] **Monitoring Active**: Error and performance monitoring
- [ ] **Rollback Plan**: Ready rollback strategy if needed
- [ ] **Success Metrics**: Define and measure success criteria

## Emergency Procedures
### Hotfix Process
- [ ] **P0 Issue Identification**: Critical production issue confirmed
- [ ] **Linear Task Created**: Emergency task with P0 priority
- [ ] **Hotfix Branch**: Create from production branch
- [ ] **Minimal Changes**: Only essential fixes, no feature additions
- [ ] **Fast-track Review**: Single reviewer for critical fixes
- [ ] **Immediate Deployment**: Deploy with accelerated pipeline
- [ ] **Post-incident Review**: Mandatory review and lessons learned

## Success Criteria Validation
- [ ] **Acceptance Criteria Met**: All Linear task criteria satisfied
- [ ] **Performance Targets**: Core Web Vitals >90 scores maintained
- [ ] **Accessibility Compliance**: WCAG 2.1 AA standards met
- [ ] **German Brand Compliance**: Brand guidelines followed
- [ ] **User Experience**: Positive UX validation from stakeholders
- [ ] **Security Standards**: No security vulnerabilities introduced