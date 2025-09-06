# ADR Template Selection Guide

## MADR 4.0.0 Templates for Municipal Portal Architecture

This guide helps you select the appropriate ADR template for documenting architectural decisions in the adessoCMS municipal portal system.

## Template Options

### 1. Full Template (`adr-template.md`)
**Use for**: Major architectural decisions that significantly impact the municipal portal system.

**Characteristics**:
- ✅ Comprehensive Swiss compliance analysis
- ✅ Detailed municipal multi-site considerations
- ✅ Complete WCAG 2.1 AA accessibility documentation
- ✅ Extensive stakeholder impact analysis
- ✅ Performance and security assessments
- ✅ Future evolution planning

**Examples**:
- New content management architecture
- Major infrastructure changes
- Compliance framework updates
- Cross-municipality feature implementations
- AI integration strategies

### 2. Minimal Template (`adr-template-minimal.md`)
**Use for**: Simple configuration decisions or minor technical choices.

**Characteristics**:
- ⚡ Quick to complete (15-30 minutes)
- 🎯 Focused on essential information
- ✅ Basic Swiss compliance coverage
- ✅ Multi-site impact assessment
- 📝 Minimal documentation overhead

**Examples**:
- Module configuration decisions
- Minor UI/UX adjustments
- Development tool selections
- Simple integration choices
- Cache configuration updates

### 3. Annotated Template (`adr-template-annotated.md`)
**Use for**: Training, onboarding, or when team members need guidance.

**Characteristics**:
- 📚 Comprehensive guidance and examples
- 💡 Best practice recommendations
- 🎓 Educational comments and explanations
- ✅ Complete municipal compliance coverage
- 🚀 Perfect for team training

**Examples**:
- First ADR by new team member
- Complex decisions requiring stakeholder review
- Decisions serving as architectural patterns
- Educational documentation for future reference
- Cross-functional review scenarios

### 4. Bare Template (`adr-template-bare.md`)
**Use for**: Automation, quick decisions, or when external documentation exists.

**Characteristics**:
- ⚡ Minimal structure (5-10 minutes to complete)
- 🤖 Automation-friendly format
- 📄 Links to external documentation
- ⚙️ Perfect for CI/CD integration
- 🔗 References comprehensive analysis elsewhere

**Examples**:
- Automated architectural decisions
- Decisions documented elsewhere in detail
- Quick interim decisions
- Proof-of-concept architectures
- Temporary architectural choices

## Selection Decision Tree

```
📋 What type of architectural decision are you documenting?

├─ 🏛️ Major municipal portal architecture change?
│  ├─ 👥 Multiple stakeholders involved? → Full Template
│  ├─ 🆕 New team member documenting? → Annotated Template
│  └─ 📝 Experienced team, standard process? → Full Template
│
├─ ⚙️ Configuration or minor technical decision?
│  ├─ 🤖 Part of automated process? → Bare Template
│  ├─ 🔗 Documented in detail elsewhere? → Bare Template
│  └─ 📄 Standalone decision? → Minimal Template
│
├─ 🎓 Training or educational purpose?
│  └─ → Annotated Template
│
└─ 🚀 Quick proof-of-concept or temporary?
   └─ → Bare Template
```

## Municipal Compliance Requirements by Template

| Template | WCAG 2.1 AA | CH-DSG | eCH-0059 | Multi-Site | AI Integration |
|----------|-------------|---------|----------|------------|----------------|
| Full | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete |
| Minimal | ✅ Basic | ✅ Basic | ✅ Basic | ✅ Basic | ✅ Basic |
| Annotated | ✅ Complete + Guidance | ✅ Complete + Guidance | ✅ Complete + Guidance | ✅ Complete + Guidance | ✅ Complete + Guidance |
| Bare | ⚠️ Reference Only | ⚠️ Reference Only | ⚠️ Reference Only | ⚠️ Reference Only | ⚠️ Reference Only |

## Template Usage Examples

### Scenario 1: New Form System Architecture
**Situation**: Implementing new accessibility-compliant forms across all municipalities.  
**Template**: Full Template  
**Reason**: Major architecture change affecting citizens, compliance, and all municipalities.

### Scenario 2: Update Cache TTL Configuration
**Situation**: Adjusting Redis cache timeout values for better performance.  
**Template**: Minimal Template  
**Reason**: Simple configuration change with limited scope and clear impact.

### Scenario 3: Onboarding New Developer
**Situation**: New team member documenting component architecture decision.  
**Template**: Annotated Template  
**Reason**: Educational value, comprehensive guidance, best practice examples.

### Scenario 4: Automated Deployment Decision
**Situation**: CI/CD pipeline automatically selecting deployment strategy.  
**Template**: Bare Template  
**Reason**: Automated decision with detailed analysis in external deployment documentation.

## Quality Checklist

### All Templates Must Include:
- ✅ Clear problem statement
- ✅ Decision outcome
- ✅ Main consequences
- ✅ Swiss municipal compliance consideration
- ✅ Date and status information

### Full/Annotated Templates Must Also Include:
- ✅ Stakeholder analysis
- ✅ Multiple options considered
- ✅ Detailed compliance analysis (WCAG, CH-DSG, eCH-0059)
- ✅ Multi-municipality impact assessment
- ✅ Performance and security implications
- ✅ Implementation guidance
- ✅ Future evolution planning

## Template Migration Path

When a decision grows in importance:

```
Bare Template → Minimal Template → Full Template
                      ↓
                Annotated Template
                (for training/guidance)
```

## Getting Started

1. **Identify Decision Scope**: Use the decision tree above
2. **Select Template**: Choose the appropriate template file
3. **Copy Template**: Create new ADR file with incremented number
4. **Fill Sections**: Complete all required sections
5. **Review**: Use ADR Reviewer Agent for validation
6. **Integrate**: Link to related ADRs and documentation

## Template Maintenance

Templates are maintained as living documents that evolve with:
- Swiss government standard updates
- Municipal portal feature additions
- Team workflow improvements
- Compliance requirement changes
- MADR specification updates

---

**Last Updated**: 2025-01-09  
**Template Version**: MADR 4.0.0  
**Municipal Portal Version**: {current-version}  
**Maintainer**: Municipal Portal Architecture Team  