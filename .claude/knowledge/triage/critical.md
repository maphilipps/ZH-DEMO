# Critical Priority Issues

Issues that must be fixed before merge. These represent security vulnerabilities, data loss risks, or system-breaking problems.

## Criteria for Critical Classification

- **Security vulnerabilities** that could compromise user data or system integrity
- **Data loss or corruption** risks that could affect production data
- **System breaking changes** that would prevent the application from functioning
- **Authentication/Authorization bypasses** that could allow unauthorized access
- **SQL injection or XSS vulnerabilities** that could compromise user security

## Current Critical Patterns

### Security Vulnerabilities
- **XSS in Twig templates**: User input rendered without proper escaping
- **SQL injection risks**: Direct database queries without parameterization
- **Authentication bypasses**: Missing session validation on protected routes
- **File upload vulnerabilities**: Unrestricted file uploads without validation
- **CSRF attacks**: Forms without proper CSRF token protection

### Data Integrity Issues  
- **Data validation failures**: Missing server-side validation for critical data
- **Database constraint violations**: Operations that could corrupt data relationships
- **Backup/Recovery failures**: Issues that could prevent data recovery

### System Breaking Changes
- **Breaking API changes**: Modifications that break existing integrations
- **Database schema conflicts**: Changes that prevent application startup
- **Configuration errors**: Settings that prevent service initialization

## Resolution Requirements

Critical issues require:
1. **Immediate attention** - Cannot be delayed
2. **Senior developer review** - Must be reviewed by experienced team member
3. **Testing validation** - Must include tests that verify the fix
4. **Security review** - Security-related criticals need security expert review
5. **Documentation update** - Prevention measures must be documented

## Prevention Strategies

- **Code review checklist** with critical security and data integrity checks
- **Automated security scanning** in CI/CD pipeline
- **Input validation frameworks** to prevent data integrity issues
- **Security testing** as part of the test suite
- **Regular security audits** of the codebase

## Escalation Process

If a critical issue is identified:
1. **Stop current work** and prioritize the critical issue
2. **Notify team leads** immediately
3. **Create emergency branch** for the fix if needed
4. **Document root cause** and prevention strategy
5. **Update error prevention rules** to prevent recurrence

## Metrics

Track critical issue metrics:
- **Time to resolution** - How quickly critical issues are fixed
- **Recurrence rate** - How often similar critical issues reappear
- **Prevention effectiveness** - How well our rules prevent critical issues
- **Detection time** - How quickly we identify critical issues

## Learning Integration

Every critical issue should:
- Generate a prevention rule for the error-prevention-rules.md
- Create or update a pattern in knowledge/patterns/security/
- Update code review checklists if applicable
- Trigger team education if it represents a knowledge gap