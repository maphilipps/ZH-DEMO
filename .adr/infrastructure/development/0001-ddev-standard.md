# ADR-0001: DDEV Development Environment Standard

## Status
**Status**: Accepted

**Date**: 2025-01-19

**Authors**: @drupal-devops-engineer, @drupal-11-lead-developer

**Reviewers**: @drupal-enterprise-architect, @drupal-technical-pm

## Context

### Problem Statement
The GPZH project requires a standardized development environment that supports 160+ municipality variations, multi-site development, complex build processes, and Swiss compliance testing while maintaining developer productivity and consistency across the team.

### Business Requirements
- Consistent development environment across all team members
- Support for multi-site Drupal development with municipality variations
- Integration with modern frontend build tools (Vite, Tailwind v4)
- Swiss compliance testing capabilities
- Performance testing environment matching production
- Database synchronization and content management capabilities

### Technical Constraints
- Support for Drupal 11.2.2 with PHP 8.3
- MariaDB 10.11+ database compatibility
- Node.js 18+ for modern frontend tooling
- Docker container architecture for consistency
- macOS, Linux, and Windows development support
- Integration with existing GitLab CI/CD workflows

### Swiss Compliance Requirements
- Local testing environment for eCH-0059 compliance
- Data protection testing (CH-DSG compliance)
- Performance testing matching Swiss hosting requirements
- Multi-language content testing capabilities

### Scale Considerations
- Multiple developers working on different municipalities simultaneously
- Rapid switching between municipality configurations
- Build process optimization for large multi-site architecture
- Database management for 160+ potential site configurations

## Decision

### What We Decided
We adopted **DDEV** as the standard development environment for all GPZH development work.

### Key Components
- **Core Environment**: DDEV with Docker-based services
- **PHP Version**: PHP 8.3 with required extensions for Drupal 11
- **Database**: MariaDB 10.11 with optimization for multi-site architecture
- **Web Server**: Nginx with HTTP/2 support and SSL termination
- **Build Tools**: Node.js 18+ integrated for frontend development
- **Additional Services**: MailHog, Redis, and performance monitoring tools

### Implementation Approach
- Standardized DDEV configuration shared across all team members
- Custom DDEV commands for common project tasks
- Multi-site configuration supporting municipality development
- Integration with frontend build processes and hot reloading
- Database snapshot and synchronization workflows

## Alternatives Considered

### Option 1: Docker Compose Custom Setup
- **Pros**: Complete control over configuration, unlimited customization
- **Cons**: High maintenance overhead, team onboarding complexity, inconsistent setups
- **Why Rejected**: Too much maintenance overhead for team productivity

### Option 2: Vagrant with VirtualBox
- **Pros**: Established solution, isolated environments, cross-platform
- **Cons**: Resource intensive, slow startup times, outdated technology approach
- **Why Rejected**: Performance issues and outdated technology stack

### Option 3: Native LAMP/MAMP Stack
- **Pros**: Direct metal performance, familiar to many developers, simple setup
- **Cons**: Inconsistent environments, version conflicts, difficult multi-site management
- **Why Rejected**: Inconsistency across team members and poor multi-site support

### Option 4: Lando Development Environment
- **Pros**: Drupal-focused, good documentation, active community
- **Cons**: Less flexible than DDEV, smaller community, limited customization
- **Why Rejected**: DDEV offers better performance and more flexibility for complex requirements

### Option 5: Local Kubernetes (minikube/k3s)
- **Pros**: Production-like environment, container orchestration, scalability testing
- **Cons**: High complexity, resource intensive, steep learning curve
- **Why Rejected**: Unnecessary complexity for development environment needs

## Consequences

### Positive Outcomes
- **Consistency**: Identical development environments across all team members
- **Productivity**: Fast startup times and automated common tasks
- **Multi-Site Support**: Easy switching between municipality configurations
- **Performance**: Native Docker performance with optimized configurations
- **Integration**: Seamless integration with frontend build tools and CI/CD

### Negative Outcomes
- **Resource Usage**: Higher memory usage compared to native development
- **Complexity**: Initial learning curve for developers new to DDEV
- **Dependency**: Reliance on Docker ecosystem and DDEV project maintenance
- **Network Issues**: Potential DNS and networking complications on some systems

### Risks and Mitigation
- **Risk**: DDEV project discontinuation or major breaking changes
  - **Impact**: High
  - **Probability**: Low
  - **Mitigation**: Active open-source project with strong community support

- **Risk**: Performance degradation affecting development productivity
  - **Impact**: Medium
  - **Probability**: Low
  - **Mitigation**: Performance monitoring and configuration optimization

- **Risk**: Team member onboarding difficulties
  - **Impact**: Medium
  - **Probability**: Medium
  - **Mitigation**: Comprehensive documentation and setup automation

## Implementation

### Requirements
- Docker Desktop (macOS/Windows) or Docker Engine (Linux)
- DDEV 1.22+ with latest stable release
- Git for project repository management
- 8GB+ RAM recommended for full development stack
- SSD storage for optimal performance

### Dependencies
- Project repository with DDEV configuration
- Database dumps or content export for local development
- Frontend build tool configuration (Vite/Node.js)
- SSL certificates for local HTTPS development

### Timeline
- **Phase 1** (1 week): DDEV configuration creation and testing
- **Phase 2** (1 week): Multi-site setup and municipality switching
- **Phase 3** (1 week): Frontend integration and build optimization
- **Phase 4** (1 week): Team rollout and documentation

### Success Criteria
- All developers successfully running identical environments
- Multi-site switching working smoothly (<30 seconds)
- Frontend build integration fully functional
- Database synchronization workflows established
- Team productivity maintained or improved

## Swiss Municipality Considerations

### Scalability Impact
DDEV supports 160+ municipality development through:
- Fast switching between municipality site configurations
- Database snapshot management for different municipal content
- Isolated development environments preventing cross-contamination
- Scalable resource allocation based on development needs

### Compliance Alignment
Development environment supports Swiss compliance through:
- Local eCH-0059 accessibility testing capabilities
- Data protection testing with realistic data scenarios
- Performance testing matching Swiss hosting requirements
- Multi-language content development and testing

### Multi-Language Support
Environment accommodates Swiss languages through:
- UTF-8 database configuration supporting all Swiss languages
- Locale configuration for Swiss German, French, Italian
- Timezone configuration for Swiss Central European Time
- Font and typography testing for Swiss character sets

### Performance at Scale
Development performance optimized through:
- SSD-optimized Docker volume configuration
- Database query caching and optimization
- Asset build process integration and optimization
- Memory allocation tuning for multi-site development

## Related Decisions

### Supersedes
- N/A (Initial development environment decision)

### Superseded By
- N/A (Current active decision)

### Related ADRs
- Drupal/ADR-0001: Drupal 11 Standard Platform Choice
- Frontend/ADR-0003: Vite Build System
- Infrastructure/ADR-0002: Docker Configuration
- Testing/ADR-0001: CI/CD Testing Pipeline

### References
- [DDEV Documentation](https://ddev.readthedocs.io/)
- [Docker Development Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Drupal Development Environment Guide](https://www.drupal.org/docs/develop/local-server-setup)
- [Multi-site Drupal Development](https://www.drupal.org/docs/multisite-drupal)

## Notes

### Implementation Notes
- Configure DDEV with performance optimizations for macOS (mutagen sync)
- Set up custom commands for common project tasks
- Document municipality switching workflow clearly
- Create database snapshot management procedures

### Review Comments
- **@drupal-11-lead-developer**: "DDEV's multi-site support and performance are excellent for our needs"
- **@drupal-technical-pm**: "Consistent environments will significantly reduce 'works on my machine' issues"
- **@drupal-devops-engineer**: "Integration with CI/CD pipeline straightforward with Docker compatibility"

### Future Considerations
- Monitor DDEV updates and new features
- Evaluate performance improvements and optimizations
- Consider additional services integration (Elasticsearch, etc.)
- Plan for production environment parity improvements

---

## ADR Metadata
- **Category**: infrastructure/development
- **Subcategory**: development-environment
- **Impact Level**: High - Affects all development work
- **Complexity**: Medium - Established tool with learning curve
- **Swiss Compliance**: Beneficial - Supports compliance testing
- **Multi-Site Impact**: Critical - Enables multi-site development workflows