# Adesso CMS - Enterprise Drupal Project

## Project Overview

### Technical Stack
- **CMS**: Drupal 10/11
- **Local Environment**: DDEV
- **Frontend**:
    - Template Engine: Twig
    - CSS Framework: Tailwind CSS v4
    - Interactive JS: Alpine.js
    - UI Components: Flowbite
    - Component Library: Storybook with SDC (Single Directory Components)
- **Backend**:
    - PHP 8.2+
    - Composer for dependency management
    - Drush for Drupal CLI operations
- **DevOps**:
    - Version Control: Git
    - CI/CD: GitLab CI/CD
    - Container: Docker (via DDEV)
    - Testing: PHPUnit, Behat, BackstopJS

### Directory Structure
```
adesso-cms/
├── .claude/               # AI agent configurations
│   └── agents/           # Team agent definitions
├── .ddev/                # DDEV configuration
├── .gitlab-ci.yml        # GitLab CI/CD pipeline
├── composer.json         # PHP dependencies
├── config/               # Drupal configuration
├── recipes/              # Drupal recipes
├── vendor/               # Composer dependencies
├── web/                  # Drupal web root
│   ├── core/            # Drupal core
│   ├── modules/         # Contributed and custom modules
│   │   ├── contrib/     # Contributed modules
│   │   └── custom/      # Custom modules
│   ├── themes/          # Themes
│   │   └── custom/      # Custom themes
│   │       └── adesso_cms_theme/
│   │           ├── components/    # SDC components
│   │           ├── templates/     # Twig templates
│   │           └── storybook/     # Storybook stories
│   └── sites/           # Sites configuration
└── tests/                # Test suites
```

## Environment Setup

### Initial Setup
```bash
# Clone repository
git clone [repository-url]
cd adesso-cms

# Start DDEV
ddev start

# Install dependencies
ddev composer install

# Import database
ddev import-db --file=database.sql.gz

# Import files
ddev import-files --source=files.tar.gz

# Run database updates
ddev drush updb -y

# Clear caches
ddev drush cr
```

### Daily Development
```bash
# Start environment
ddev start

# Check status
ddev describe

# Access site
ddev launch

# SSH into container
ddev ssh
```

## Team Agents & Instructions

### 1. drupal-technical-pm
**Role**: Technical Project Manager  
**Auto-accept**: No (requires oversight for planning decisions)
```
Primary responsibilities:
- Sprint planning and task breakdown
- Technical specification creation
- Team coordination and blocker resolution
- Time estimation and project timeline management
- GitLab issue and milestone management
```

### 2. drupal-solution-architect
**Role**: Solution Architect  
**Auto-accept**: No (architectural decisions need review)
```
Primary responsibilities:
- High-level technical architecture decisions
- Module selection and evaluation
- Performance and security concept development
- Integration architecture design
- Technical documentation oversight
```

### 3. drupal-senior-backend-dev
**Role**: Senior Backend Developer  
**Auto-accept**: Yes (for implementation tasks)
```
Primary responsibilities:
- Custom module development
- API integrations
- Database optimization
- Complex business logic implementation
- Code review and mentoring
```

### 4. business-transformation-consultant
**Role**: Business Consultant  
**Auto-accept**: No (strategic decisions)
```
Primary responsibilities:
- Requirements engineering
- Business process analysis
- Stakeholder communication
- User story creation
- ROI analysis and reporting
```

### 5. drupal-frontend-theming-specialist
**Role**: Frontend Developer (Drupal Theming)  
**Auto-accept**: Yes (for theming tasks)
```
Primary responsibilities:
- Twig template development
- SDC component creation
- Responsive design implementation
- Theme preprocessing and hooks
- Render array manipulation
```

### 6. alpine-js-frontend-developer
**Role**: Frontend Developer (JavaScript/Alpine.js)  
**Auto-accept**: Yes (for JS development)
```
Primary responsibilities:
- Alpine.js component development
- Interactive UI implementation
- Client-side performance optimization
- Flowbite component integration
- JavaScript testing
```

### 7. storybook-sdc-maintainer
**Role**: Storybook Maintainer  
**Auto-accept**: Yes (for component library tasks)
```
Primary responsibilities:
- Storybook story creation and maintenance
- SDC component documentation
- Design system governance
- Component API documentation
- Visual regression testing setup
```

### 8. drupal-devops-engineer
**Role**: DevOps Engineer  
**Auto-accept**: No (infrastructure changes need review)
```
Primary responsibilities:
- GitLab CI/CD pipeline management
- DDEV configuration optimization
- Deployment automation
- Security scanning implementation
- Performance monitoring setup
```

### 9. drupal-ux-designer
**Role**: UX/Visual Designer  
**Auto-accept**: No (design decisions need approval)
```
Primary responsibilities:
- User interface design
- Design system creation
- Accessibility compliance
- User journey mapping
- Component design specifications
```

### 10. drupal-content-strategist
**Role**: Content Strategist  
**Auto-accept**: No (content architecture impacts system)
```
Primary responsibilities:
- Content type architecture
- Taxonomy design
- Editorial workflow creation
- Content migration planning
- Data dictionary maintenance
```

### 11. qa-testing-specialist
**Role**: QA/Testing Specialist  
**Auto-accept**: Yes (for test implementation)
```
Primary responsibilities:
- Test strategy development
- Automated test implementation (PHPUnit, Behat)
- Visual regression testing (BackstopJS)
- Security testing
- Performance testing
```

### 12. drupal-technical-support-lead
**Role**: Technical Support Lead  
**Auto-accept**: No (production issues need oversight)
```
Primary responsibilities:
- Production issue triage
- Bug investigation and resolution
- Security update management
- Client communication
- Knowledge base maintenance
```

### 13. drupal-enterprise-architect
**Role**: Enterprise Architect  
**Auto-accept**: No (enterprise decisions)
```
Primary responsibilities:
- Multi-site architecture planning
- Cross-project standardization
- Enterprise integration patterns
- Scalability planning
- Technology roadmap development
```

## Common Commands

### DDEV Commands
```bash
# Environment management
ddev start                    # Start project
ddev stop                     # Stop project
ddev restart                  # Restart services
ddev describe                 # Show project info
ddev launch                   # Open in browser

# Development
ddev ssh                      # SSH into web container
ddev exec [command]           # Execute command in container
ddev logs                     # View container logs
ddev composer [command]       # Run composer
ddev npm [command]           # Run npm in theme directory

# Database
ddev snapshot                 # Create database snapshot
ddev snapshot restore         # Restore database
ddev import-db                # Import database
ddev export-db                # Export database
```

### Drush Commands
```bash
# Cache management
ddev drush cr                 # Clear all caches
ddev drush cc css-js         # Clear CSS/JS caches
ddev drush cc render         # Clear render cache

# Database
ddev drush sql-dump          # Database dump
ddev drush sql-cli           # Database CLI
ddev drush updb              # Run database updates
ddev drush entup             # Entity updates

# Configuration
ddev drush cim               # Import configuration
ddev drush cex               # Export configuration
ddev drush cst               # Configuration status

# Development
ddev drush uli               # User login link
ddev drush ws                # Show watchdog messages
ddev drush generate          # Generate boilerplate code
```

### GitLab CI/CD Commands
```bash
# Pipeline management
git push -o ci.skip          # Skip CI pipeline
git push -o ci.variable="VAR=value"  # Set pipeline variable

# GitLab CLI
glab mr create               # Create merge request
glab mr list                 # List merge requests
glab pipeline status         # Check pipeline status
glab issue create            # Create issue
```

### Testing Commands
```bash
# PHPUnit
ddev phpunit tests/          # Run all tests
ddev phpunit --group=api     # Run specific group

# Behat
ddev behat                   # Run all scenarios
ddev behat --tags=@api      # Run tagged scenarios

# Code quality
ddev phpcs                   # PHP CodeSniffer
ddev phpcbf                  # PHP Code Beautifier
ddev phpstan                 # Static analysis

# Frontend testing
cd web/themes/custom/adesso_cms_theme
ddev npm test                # Run frontend tests
ddev npm run lint            # Lint JavaScript
ddev npm run build           # Build assets
```

### Custom Slash Commands
```bash
/sprint-plan                 # Initialize sprint planning
/feature-start              # Start new feature branch
/component-create           # Create new SDC component
/test-all                   # Run all test suites
/deploy-staging             # Deploy to staging
/security-check             # Run security audit
```

## Workflow Templates

### Sprint Planning Workflow
```markdown
1. **Technical PM** reviews backlog and creates sprint plan
2. **Solution Architect** validates technical approach
3. **Content Strategist** confirms content requirements
4. **DevOps Engineer** prepares deployment plan
5. **QA Specialist** creates test scenarios
6. Team estimation session
7. Sprint kickoff with clear agent assignments
```

### Feature Development Workflow
```markdown
1. Create feature branch: `git checkout -b feature/ISSUE-description`
2. **Backend Developer** implements data layer
3. **Frontend Developer** creates templates/components
4. **Alpine.js Developer** adds interactivity
5. **Storybook Maintainer** documents components
6. **QA Specialist** writes/runs tests
7. Code review by **Senior Backend Dev**
8. Merge request with pipeline validation
```

### Bug Fixing Workflow
```markdown
1. **Support Lead** triages and documents issue
2. Create bugfix branch: `git checkout -b bugfix/ISSUE-description`
3. Reproduce issue in local environment
4. Implement fix with tests
5. Verify fix doesn't create regressions
6. Deploy to staging for validation
7. Fast-track merge after approval
```

### Code Review Process
```markdown
1. Self-review checklist:
   - [ ] Coding standards compliance
   - [ ] Tests passing
   - [ ] Documentation updated
   - [ ] No security vulnerabilities
   - [ ] Performance impact assessed
   
2. Automated checks:
   - GitLab CI pipeline passes
   - Code coverage maintained
   - No merge conflicts
   
3. Peer review focus:
   - Business logic correctness
   - Architecture alignment
   - Reusability and maintainability
```

### Deployment Pipeline
```yaml
stages:
  - validate
  - test
  - build
  - deploy

validate:
  - Composer validation
  - Config validation
  - Code standards

test:
  - PHPUnit tests
  - Behat tests
  - Visual regression tests

build:
  - Compile theme assets
  - Generate optimized autoloader
  - Create deployment artifact

deploy:
  - Deploy to staging (automatic)
  - Deploy to production (manual)
```

## Code Standards & Best Practices

### Drupal Coding Standards
```php
// Follow Drupal coding standards
// @see https://www.drupal.org/docs/develop/standards

// File naming
module_name.module
ModuleName.php
module_name.services.yml

// Function naming
function module_name_entity_view() {}

// Class naming
namespace Drupal\module_name\Controller;
class ModuleNameController {}

// Documentation
/**
 * Implements hook_entity_view().
 */
```

### Git Commit Conventions
```bash
# Format: [TYPE] Brief description (max 50 chars)

[ADD] New user registration feature
[FIX] Resolve cache invalidation issue
[UPDATE] Improve performance of node queries
[REFACTOR] Simplify theme preprocessing logic
[DOCS] Update README with deployment steps
[TEST] Add coverage for custom block type
[SECURITY] Patch XSS vulnerability in forms
```

### Testing Requirements
```markdown
1. Unit tests for all service classes
2. Kernel tests for database operations
3. Functional tests for user workflows
4. JavaScript tests for Alpine.js components
5. Visual regression tests for components
6. Minimum 80% code coverage
7. All tests must pass before merge
```

### Documentation Standards
```markdown
1. README.md in each custom module
2. CHANGELOG.md for version history
3. API documentation in code
4. Storybook stories for all components
5. Architectural Decision Records (ADRs)
6. Runbooks for common operations
```

## Error Handling & Debugging

### Common Errors and Solutions

#### WSOD (White Screen of Death)
```bash
# Enable error reporting
ddev drush config-set system.logging error_level verbose -y

# Check logs
ddev logs -f
ddev drush ws --extended

# Common fixes
ddev drush cr
ddev composer install
ddev drush updb -y
```

#### Performance Issues
```bash
# Enable query logging
ddev drush config-set devel.settings query_display 1 -y

# Profiling
ddev xhprof enable
ddev drush webprofiler:enable

# Cache analysis
ddev redis-cli monitor
ddev drush cache-hit-rate
```

#### Configuration Sync Issues
```bash
# Check status
ddev drush cst

# Force import
ddev drush cim --partial -y

# Reset specific config
ddev drush config-delete [config.name]
ddev drush cim -y
```

### Debugging Strategies

#### Backend Debugging
```php
// Drupal-specific debugging
\Drupal::logger('custom')->debug(print_r($variable, TRUE));
dump($variable); // With dump() function
kint($variable); // With Kint module

// Xdebug setup
ddev xdebug on
ddev xdebug status
```

#### Frontend Debugging
```javascript
// Alpine.js debugging
Alpine.store('debug', true);
x-init="$watch('property', value => console.log(value))"

// Twig debugging
{{ dump(variable) }}
{{ kint(variable) }}
```

### Performance Optimization

#### Database Optimization
```sql
-- Analyze slow queries
SHOW PROCESSLIST;
EXPLAIN SELECT ...;

-- Optimize tables
OPTIMIZE TABLE cache_*;
```

#### Asset Optimization
```bash
# Build production assets
cd web/themes/custom/adesso_cms_theme
ddev npm run build:prod

# Analyze bundle size
ddev npm run analyze
```

## Security & Compliance

### Security Review Checklist
```markdown
- [ ] All user input sanitized
- [ ] CSRF tokens on all forms
- [ ] SQL injection prevention (use database API)
- [ ] XSS prevention (use render arrays)
- [ ] Access control on all routes
- [ ] Secure file uploads
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Regular security updates applied
- [ ] Secrets in environment variables
```

### GDPR Compliance
```markdown
1. Privacy policy implementation
2. Cookie consent management
3. Data retention policies
4. Right to deletion workflows
5. Data export capabilities
6. Audit logging for data access
7. Encryption at rest and in transit
```

### Drupal Security Best Practices
```bash
# Regular security checks
ddev composer outdated --direct
ddev drush sec

# Security updates
ddev composer update drupal/core --with-dependencies
ddev drush updb -y
ddev drush cr

# File permissions
find web/sites/default/files -type d -exec chmod 755 {} \;
find web/sites/default/files -type f -exec chmod 644 {} \;
chmod 444 web/sites/default/settings.php
```

## Checkpoint & Review Process

### Development Checkpoints
```markdown
Every 2-3 hours or major milestone:
1. Commit current work
2. Run test suite
3. Update documentation
4. Create visual snapshot (if UI work)
5. Update todo list
6. Brief status in GitLab issue
```

### End of Session
```markdown
1. Commit all changes with descriptive message
2. Push to feature branch
3. Run full test suite
4. Update claude.md with new learnings
5. Document any blockers in GitLab
6. Create handoff notes for next session
```

## Visual-First Development

### UI Development Process
```markdown
1. Screenshot current state
2. Annotate planned changes
3. Implement in Storybook first
4. Integrate into Drupal
5. Screenshot completed state
6. Run visual regression tests
```

### Screenshot Commands
```bash
# Full page screenshot
ddev snapshot-page /path/to/page

# Component screenshot  
ddev snapshot-component .component-class

# Before/after comparison
ddev backstop reference
ddev backstop test
```

## MCP Server Configuration

### Database Access
```yaml
# Secure database access via MCP
mcp_servers:
  - name: drupal_db
    type: mysql
    connection:
      host: db
      port: 3306
      database: db
      credentials: env
```

### File System Access
```yaml
# Controlled file access
mcp_servers:
  - name: drupal_files
    type: filesystem
    paths:
      - /var/www/html/web/sites/default/files
    permissions: read_write
```

## Quick Reference

### Emergency Contacts
- **Technical Lead**: Check GitLab project members
- **DevOps On-Call**: See .gitlab-ci.yml for contacts
- **Security Team**: security@adesso.de

### Useful Links
- [Drupal.org Documentation](https://www.drupal.org/docs)
- [Drupal Security Advisories](https://www.drupal.org/security)
- [GitLab Project](#) - Update with actual URL
- [Staging Environment](#) - Update with actual URL
- [Production Environment](#) - Update with actual URL

---
*Last Updated: 2025-01-30*  
*Version: 1.0.0*