# Research Command - Enhanced Codebase + Context7 + Web Integration

## Introduction

This command performs comprehensive research combining codebase analysis, Context7 integration for best practices, and web research for current approaches. It outputs structured research findings to `.work/research/research-XXX.md` for use in the planning phase.

**Usage Examples:**
- `/research "user authentication patterns"`  
- `/research "database connection pooling"`
- `/research "API rate limiting strategies"`

## Prerequisites

- Issue number (links to `.work/issues/XXX-title.md`)
- Context7 MCP server access for library documentation
- Web search capabilities
- Access to existing codebase patterns

## Research Process

### Phase 1: Issue Analysis
1. **Read Associated Issue**: Load `.work/issues/XXX-title.md` for context
2. **Extract Research Requirements**: Identify specific technical areas to investigate
3. **Define Research Scope**: Codebase patterns, best practices, current approaches

### Phase 2: Codebase Analysis (Internal Intelligence)
**Parallel Subtasks:**

**Task Group A - Pattern Mining:**
- Search existing codebase for similar implementations
- Identify current architectural patterns and approaches  
- Extract successful code patterns and conventions
- Document existing libraries and dependencies used

**Task Group B - Architecture Analysis:**
- Review current system architecture relevant to research topic
- Identify integration points and constraints
- Find existing abstractions and interfaces
- Map current data flow and processing patterns

### Phase 3: Context7 Integration (Best Practices Intelligence)  
**Parallel Subtasks with Municipal Compliance Context:**

**Task Group C - Library Documentation:**
- Query Context7 for relevant library documentation using municipal-specific contexts
- Extract best practices from official documentation with Swiss compliance focus
- Identify recommended patterns and approaches for government portals
- Find configuration examples and setup guides for Drupal 11 + Vite + Tailwind CSS v4
- Apply Context7 query optimization patterns from `.claude/mcp-servers/context7/municipal-queries.yml`

**Task Group D - Framework Integration & Compliance:**
- Research framework-specific best practices via Context7 with accessibility requirements
- Identify recommended architectural patterns for municipal multi-tenancy
- Find performance optimization techniques meeting government standards
- Extract security and compliance guidelines for Swiss data protection (CH-DSG)
- Query multilingual implementation patterns for German/French support

**Context7 Query Enhancement Protocol:**
1. **Version-Specific Queries**: Always include exact version numbers (Drupal 11.x, Tailwind CSS v4, etc.)
2. **Municipal Context**: Append "for swiss municipal portal development" to improve relevance
3. **Compliance Integration**: Include "meeting wcag 2.1 aa standards" for accessibility context
4. **Fallback Handling**: Use Context7FallbackHandler for graceful degradation to WebSearch
5. **Cache Optimization**: Leverage municipal-specific caching for repeated queries

### Phase 4: Web Research (Current Intelligence)
**Parallel Subtasks:**

**Task Group E - Industry Trends:**
- Search for current industry approaches and trends
- Identify emerging patterns and technologies
- Find comparative analysis of different approaches
- Research performance benchmarks and trade-offs

**Task Group F - Community Insights:**
- Find community discussions and solutions
- Identify common pitfalls and solutions
- Research real-world implementation experiences
- Extract lessons learned from production deployments

### Phase 5: Analysis Integration
**Sequential Tasks:**
1. **Pattern Consolidation**: Merge findings from all sources
2. **Approach Comparison**: Compare different implementation strategies
3. **Trade-off Analysis**: Document pros/cons of each approach
4. **Recommendation Synthesis**: Identify optimal approach for this project
5. **Implementation Readiness**: Assess what's needed for implementation

## Output Generation

### Research Report Structure

Create comprehensive research report in `.work/research/research-XXX.md`:

```markdown
# Research Report: [TOPIC]
**Issue Reference**: [Link to issue]
**Research Date**: [Date]
**Research Scope**: [Brief description]

## Executive Summary
[1-2 paragraph overview of findings and recommendations]

## Current Codebase Analysis
### Existing Patterns
- **Pattern 1**: [Description with code examples]
- **Pattern 2**: [Description with code examples]

### Architectural Constraints
- [Current system limitations and requirements]
- [Integration points and dependencies]

### Code Quality Assessment
- [Current implementation quality]
- [Areas for improvement]

## Best Practices Research (Context7)
### Library Documentation Insights
- **Recommended Approach**: [Official recommendations with municipal compliance context]
- **Configuration Patterns**: [Setup examples for Drupal 11 + Vite + Tailwind CSS v4]
- **Performance Guidelines**: [Optimization tips meeting government standards]
- **Accessibility Compliance**: [WCAG 2.1 AA implementation patterns]
- **Security Patterns**: [Swiss data protection (CH-DSG) compliance measures]

### Framework Integration & Municipal Compliance
- **Drupal 11 Municipal Patterns**: [Municipal-specific content modeling and workflows]
- **Vite + Tailwind Integration**: [Hot reload setup with DDEV for municipal development]
- **Multilingual Implementation**: [German/French content management patterns]
- **AI Integration Guidelines**: [Municipal AI agents and content generation compliance]
- **Performance Optimization**: [Municipal scale performance requirements]

### Context7 Query Results Analysis
- **Query Success Rate**: [Percentage of successful Context7 responses]
- **Fallback Utilization**: [When WebSearch fallback was necessary]  
- **Municipal Context Effectiveness**: [How well municipal context improved results]
- **Version-Specific Accuracy**: [Quality of version-specific documentation]
- **Cache Performance**: [Municipal query cache hit rates and effectiveness]

## Current Industry Analysis (Web Research)
### Industry Trends
- **Trend 1**: [Current market direction]
- **Trend 2**: [Emerging approaches]

### Comparative Analysis  
| Approach | Pros | Cons | Use Cases |
|----------|------|------|-----------|
| Option A | [Benefits] | [Drawbacks] | [Scenarios] |
| Option B | [Benefits] | [Drawbacks] | [Scenarios] |

### Community Insights
- **Common Pitfalls**: [What to avoid]
- **Success Patterns**: [What works well]
- **Real-world Experiences**: [Production lessons]

## Synthesis and Recommendations

### Recommended Approach
[Detailed recommendation with rationale]

### Implementation Strategy
1. **Phase 1**: [Initial implementation steps]
2. **Phase 2**: [Enhancement and optimization]
3. **Phase 3**: [Advanced features and scaling]

### Risk Assessment
- **Technical Risks**: [Implementation challenges]
- **Performance Risks**: [Scalability concerns] 
- **Maintenance Risks**: [Long-term considerations]

### Success Metrics
- [How to measure implementation success]
- [Key performance indicators]

## Implementation Prerequisites
- **Required Libraries**: [Dependencies needed]
- **Configuration Changes**: [Setup modifications]
- **Database Changes**: [Schema updates if needed]
- **Infrastructure Requirements**: [Deployment needs]

## Next Steps for Planning Phase
- [Specific items for /plan command to address]
- [Agent coordination requirements]
- [Architecture decision points]

## Compound Learning Insights
- **Patterns for Future Reuse**: [Generalizable approaches]
- **Context Evolution**: [CLAUDE.md updates suggested]
- **Quality Gate Improvements**: [Better validation approaches]
```

## Research Quality Gates

Before finalizing research:
- [ ] All three intelligence sources consulted (codebase, Context7, web)
- [ ] Multiple implementation approaches compared
- [ ] Trade-offs clearly documented with rationale
- [ ] Specific implementation steps identified
- [ ] Risk assessment completed
- [ ] Success metrics defined
- [ ] Prerequisites documented
- [ ] Ready for planning phase handoff

## Integration with Compound Engineering

### Pattern Recognition
- Document reusable research patterns for future topics
- Identify research approaches that accelerate future investigations
- Capture Context7 query patterns that work effectively for municipal development
- Track Context7 vs WebSearch effectiveness for different query types
- Document municipal compliance context patterns that improve documentation quality

### Context Evolution  
- Update CLAUDE.md with research findings that affect project direction
- Add discovered patterns to project knowledge base
- Document effective research methodologies for reuse
- Integrate successful Context7 query patterns into `.claude/mcp-servers/context7/municipal-queries.yml`
- Update municipal compliance requirements based on Context7 documentation findings

### Context7 Learning Integration
- **Query Optimization Patterns**: Track which Context7 queries yield highest quality municipal-relevant results
- **Fallback Effectiveness**: Monitor when WebSearch provides better results than Context7 for specific topics
- **Municipal Context Impact**: Measure improvement in documentation relevance with Swiss compliance context
- **Version Accuracy Tracking**: Validate Context7 version-specific documentation against actual implementation
- **Performance Metrics**: Monitor Context7 response times, cache effectiveness, and error rates

### Predictive Intelligence
- Identify potential issues before they occur based on research
- Suggest preventive measures based on community insights
- Recommend proactive optimizations based on best practices

## Expected Outcome

A comprehensive research report that provides the planning phase with:
- Clear understanding of all available implementation approaches
- Specific recommendations with detailed rationale  
- Actionable implementation guidance
- Risk-aware decision making framework
- Ready-to-plan technical foundation

The research should be thorough enough that the planning phase can immediately begin agent selection and implementation sequencing without additional investigation.

Save the final plan to `.work/XXX/research.md` for use in the `/plan` command. The plan should also be added to github issue as a comment.