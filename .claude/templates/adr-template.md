# ADR-{NUMBER}: {TITLE}

## Status
{PROPOSED | ACCEPTED | DEPRECATED | SUPERSEDED}

## Context
Describe the architectural challenge or decision point that needs to be addressed. Include:
- Technical constraints and requirements
- Municipal portal specific considerations (multi-site, Swiss compliance, AI integration)
- Stakeholder needs and business requirements
- Current system limitations or challenges

## Decision
Clearly state the architectural decision that was made. Include:
- The chosen solution or approach
- Key implementation details
- Why this option was selected over alternatives

## Alternatives Considered
Document other options that were evaluated:
- Alternative 1: Brief description and why it was rejected
- Alternative 2: Brief description and why it was rejected
- etc.

## Consequences
### Positive
- List the benefits and advantages of this decision
- Performance improvements
- Development velocity improvements
- Compliance or accessibility benefits

### Negative  
- List any drawbacks or limitations
- Technical debt incurred
- Additional complexity introduced
- Resource requirements

### Neutral
- Other impacts that are neither clearly positive nor negative
- Changes in development processes
- New dependencies or requirements

## Municipal Portal Specific Considerations
### Multi-Site Impact
- How this decision affects Thalwil, Thalheim, and Erlenbach sites
- Configuration variations needed per municipality
- Shared code vs. site-specific implementations

### Swiss Compliance
- Impact on WCAG 2.1 AA accessibility compliance
- CH-DSG data protection considerations
- eCH-0059 government standards compliance

### AI Integration
- Effect on AI content generation capabilities
- Changes to AI provider integrations
- Impact on automated accessibility features

## Implementation Notes
### DDEV Integration
- Required DDEV configuration changes
- Development workflow modifications
- Testing approach updates

### Performance Considerations
- Expected performance impact
- Monitoring and measurement approach
- Optimization strategies

### Future Considerations
- How this decision might evolve
- Potential deprecation timeline
- Dependencies on external factors

## Tags
Add relevant tags for easy filtering and discovery:
- #architecture
- #municipal-portal
- #drupal-11
- #multi-site
- #ai-integration
- #swiss-compliance
- #performance
- #accessibility

## Links and References
- Related ADRs: [ADR-XXX](./adr-xxx-title.md)
- Technical documentation: [Link to docs]
- External references: [Relevant external links]

---
**Author**: [Your Name]  
**Date**: {YYYY-MM-DD}  
**Municipal Portal Version**: {version}  
**Drupal Version**: 11.2.2