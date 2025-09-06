# Municipal Portal Stakeholder Identification Guide

## MADR 4.0.0 Enhanced Stakeholder Patterns for Swiss Government

This guide provides comprehensive stakeholder identification patterns for Architecture Decision Records in the adessoCMS municipal portal system, ensuring all affected parties are considered and engaged appropriately.

## Primary Stakeholder Categories

### 1. Citizens (Bürger/Citoyens/Cittadini) 🏘️

**Definition**: End users of municipal services and portal functionality.

**Sub-Categories**:
- **General Citizens**: Regular municipal service users
- **Elderly Citizens**: May require enhanced accessibility features
- **Citizens with Disabilities**: Specific WCAG 2.1 AA requirements
- **Non-German Speaking Citizens**: French/Italian language support needs
- **Business Owners**: Commercial permit and licensing users
- **New Residents**: Registration and onboarding service users

**Involvement Patterns**:
- **High Impact Decisions**: Direct consultation, user testing, feedback collection
- **Medium Impact Decisions**: Representative feedback, accessibility review
- **Low Impact Decisions**: Information sharing, post-implementation feedback

**Communication Methods**:
- Municipal website announcements
- Local newspaper notices (German/French)
- Community meetings and forums
- Digital accessibility feedback channels
- Multilingual survey systems

**Key Concerns**:
- Service accessibility and usability
- Language availability (German/French/Italian)
- Privacy and data protection
- Service reliability and availability
- Mobile accessibility and responsiveness

### 2. Municipal Officials (Kommunale Beamte) 🏛️

**Definition**: Municipal employees who use the portal for daily operations.

**Sub-Categories**:

#### Administrative Staff (Verwaltungspersonal)
- **Department Heads**: Strategic oversight and budget approval
- **Service Coordinators**: Cross-departmental workflow management  
- **Data Officers**: Information management and reporting
- **Public Relations**: Citizen communication and transparency

#### Front-Line Staff (Frontpersonal)
- **Customer Service Representatives**: Direct citizen interaction
- **Permit Officers**: License and permit processing
- **Social Workers**: Citizen assistance and support services
- **Reception Staff**: Initial citizen contact and guidance

#### Technical Staff (Technisches Personal)  
- **IT Administrators**: System maintenance and user management
- **Content Managers**: Website and portal content updates
- **Security Officers**: Data protection and compliance monitoring
- **Training Coordinators**: Staff education and onboarding

**Involvement Patterns**:
- **Workflow Changes**: Direct consultation and approval required
- **System Updates**: Training needs assessment and timeline coordination
- **New Features**: User acceptance testing and feedback
- **Compliance Changes**: Implementation planning and verification

**Communication Methods**:
- Internal staff meetings and briefings
- Department head approval workflows
- Staff training sessions and materials
- Internal portal announcements
- Email notifications and updates

**Key Concerns**:
- Workflow efficiency and productivity
- Training requirements and timeline
- User interface consistency and ease of use  
- Integration with existing municipal systems
- Compliance with Swiss administrative procedures

### 3. Technical Team (Entwicklungsteam) 💻

**Definition**: Development, architecture, and technical support staff.

**Sub-Categories**:

#### Development Team
- **Lead Architect**: Overall system architecture and decision authority
- **Drupal Developers**: Platform-specific implementation expertise
- **Frontend Developers**: User interface and accessibility implementation
- **DevOps Engineers**: Infrastructure, deployment, and monitoring

#### Quality Assurance
- **Accessibility Specialists**: WCAG 2.1 AA compliance verification
- **Performance Engineers**: System optimization and monitoring
- **Security Specialists**: Swiss compliance and vulnerability management
- **Testing Coordinators**: User acceptance and automated testing

#### Support and Maintenance
- **System Administrators**: Infrastructure maintenance and monitoring
- **Content Support**: Editorial workflow and CMS support
- **Help Desk**: User support and issue resolution
- **Documentation Specialists**: Technical and user documentation

**Involvement Patterns**:
- **Architecture Decisions**: Design authority and implementation responsibility
- **Technical Standards**: Code review and compliance verification
- **Performance Requirements**: Implementation and monitoring responsibility
- **Security Compliance**: Swiss standards verification and implementation

**Communication Methods**:
- Technical architecture reviews
- Code review and pull request processes
- Sprint planning and retrospective meetings
- Technical documentation updates
- Architecture Decision Record reviews

**Key Concerns**:
- Technical feasibility and implementation complexity
- Development timeline and resource requirements
- Maintenance overhead and technical debt
- Performance and scalability implications
- Integration with existing technical architecture

### 4. Compliance Officers (Compliance-Beauftragte) ⚖️

**Definition**: Legal, regulatory, and standards compliance specialists.

**Sub-Categories**:

#### Legal Compliance
- **Data Protection Officers (DPO)**: CH-DSG and GDPR compliance
- **Municipal Legal Counsel**: Local government law compliance
- **Privacy Specialists**: Citizen data protection and consent management
- **Records Management**: Document retention and archival compliance

#### Standards Compliance  
- **Accessibility Coordinators**: WCAG 2.1 AA certification and monitoring
- **E-Government Standards**: eCH-0059 and Swiss digital government compliance
- **Security Auditors**: Information security and risk management
- **Quality Assurance**: Process compliance and continuous improvement

#### Canton and Federal Liaison
- **Canton Compliance**: Zürich canton-specific requirement coordination
- **Federal Standards**: Swiss federal e-government compliance
- **Inter-Municipal**: Shared service and standard coordination
- **Audit Coordinators**: External compliance verification management

**Involvement Patterns**:
- **Regulatory Impact**: Mandatory review and approval authority
- **Compliance Changes**: Implementation oversight and verification
- **Audit Requirements**: Documentation and evidence provision
- **Risk Assessment**: Impact analysis and mitigation planning

**Communication Methods**:
- Formal compliance review processes
- Legal and regulatory impact assessments
- Audit documentation and reporting
- Risk management committee meetings
- Inter-governmental coordination meetings

**Key Concerns**:
- Swiss legal and regulatory compliance
- Data protection and privacy requirements
- Accessibility and inclusion obligations
- Risk management and liability
- Audit trail and documentation completeness

### 5. External Partners (Externe Partner) 🤝

**Definition**: Third-party organizations and service providers.

**Sub-Categories**:

#### Government Partners
- **Canton Zürich**: Regional government coordination
- **Federal Agencies**: Swiss national e-government integration  
- **Other Municipalities**: Thalwil, Thalheim, Erlenbach coordination
- **Inter-Municipal Services**: Shared service providers and platforms

#### Technology Partners
- **Hosting Providers**: Infrastructure and cloud service providers
- **Software Vendors**: Third-party module and service providers
- **Integration Partners**: External system connection providers
- **Consulting Services**: Specialized expertise and implementation support

#### Service Partners
- **Translation Services**: Multilingual content and localization
- **Accessibility Auditors**: WCAG 2.1 AA compliance verification
- **Security Auditors**: Penetration testing and vulnerability assessment
- **Training Providers**: Staff education and capability building

**Involvement Patterns**:
- **Integration Changes**: Coordination and compatibility verification
- **Service Dependencies**: Impact assessment and timeline coordination
- **Contract Modifications**: Service level and compliance requirement updates
- **Shared Standards**: Multi-municipality consistency and coordination

**Communication Methods**:
- Formal partnership agreements and contracts
- Regular service coordination meetings
- Technical integration planning sessions
- Shared governance and standards committees
- Inter-municipal coordination forums

**Key Concerns**:
- Service level agreement compliance
- Technical integration compatibility
- Cost implications and budget impact
- Timeline coordination and dependencies
- Quality and performance standards

## Stakeholder Engagement Matrix

### By Decision Impact Level

| Impact Level | Citizens | Municipal Officials | Technical Team | Compliance Officers | External Partners |
|-------------|----------|-------------------|---------------|-------------------|------------------|
| **High** | Direct consultation, user testing, feedback collection | Department head approval, workflow analysis, training planning | Architecture review, feasibility assessment, implementation planning | Mandatory compliance review, legal approval, risk assessment | Contract negotiation, SLA updates, integration planning |
| **Medium** | Representative feedback, accessibility review, pilot testing | Supervisor notification, training needs assessment, timeline coordination | Technical review, code review, testing coordination | Compliance verification, standards checking, documentation review | Service coordination, compatibility verification, timeline alignment |
| **Low** | Information sharing, post-implementation feedback, satisfaction survey | Information sharing, basic training updates, change notification | Implementation execution, testing completion, documentation updates | Compliance monitoring, audit trail maintenance, reporting updates | Service monitoring, routine coordination, status updates |

### By Decision Type

| Decision Type | Primary Stakeholders | Secondary Stakeholders | Information Only |
|--------------|-------------------|---------------------|-----------------|
| **Citizen-Facing Services** | Citizens, Municipal Officials, Compliance Officers | Technical Team, External Partners | - |
| **Administrative Workflows** | Municipal Officials, Technical Team | Compliance Officers | Citizens, External Partners |
| **Technical Infrastructure** | Technical Team, External Partners | Municipal Officials, Compliance Officers | Citizens |
| **Compliance/Legal** | Compliance Officers, Municipal Officials | Citizens, Technical Team | External Partners |
| **Integration/Partnerships** | External Partners, Technical Team | Municipal Officials, Compliance Officers | Citizens |

### Swiss Municipal Compliance Stakeholders

#### WCAG 2.1 AA Accessibility Decisions
- **Primary**: Accessibility Specialists, Citizens with Disabilities, Compliance Officers
- **Secondary**: Technical Team, Municipal Officials
- **Approval Required**: Accessibility Coordinator, DPO

#### CH-DSG Data Protection Decisions  
- **Primary**: Data Protection Officers, Citizens, Legal Counsel
- **Secondary**: Technical Team, Municipal Officials
- **Approval Required**: DPO, Municipal Legal Counsel

#### eCH-0059 E-Government Standards
- **Primary**: Standards Compliance Officers, Canton Liaison, Technical Team
- **Secondary**: Municipal Officials, External Partners
- **Approval Required**: E-Government Standards Coordinator

#### Multilingual Content Decisions
- **Primary**: Citizens (French/Italian speakers), Translation Services, Content Managers
- **Secondary**: Municipal Officials, Technical Team
- **Approval Required**: Multilingual Content Coordinator

## Stakeholder Identification Checklist

### Pre-Decision Analysis
- [ ] **Citizen Impact Assessment**: Who will be affected and how?
- [ ] **Municipal Workflow Impact**: Which departments and processes?  
- [ ] **Technical Complexity**: What development and infrastructure changes?
- [ ] **Compliance Requirements**: Which regulations and standards apply?
- [ ] **External Dependencies**: Which partners and integrations affected?

### Stakeholder Mapping
- [ ] **Primary Stakeholders**: Direct decision authority and high impact
- [ ] **Secondary Stakeholders**: Significant interest and moderate impact
- [ ] **Information Stakeholders**: Should be informed but limited involvement
- [ ] **Approval Authority**: Who has veto power or final approval?
- [ ] **Implementation Responsibility**: Who will execute the decision?

### Communication Planning
- [ ] **Consultation Methods**: How will we gather stakeholder input?
- [ ] **Approval Process**: What is the decision-making workflow?
- [ ] **Change Communication**: How will decisions be communicated?
- [ ] **Feedback Loops**: How will we collect post-implementation feedback?
- [ ] **Escalation Paths**: How will conflicts or issues be resolved?

### Municipal-Specific Considerations
- [ ] **Multi-Municipality**: Impact on Thalwil, Thalheim, Erlenbach
- [ ] **Language Requirements**: German/French/Italian considerations
- [ ] **Canton Coordination**: Zürich canton alignment needs
- [ ] **Federal Compliance**: Swiss national e-government requirements
- [ ] **Accessibility**: WCAG 2.1 AA and disability access needs

## Readout Meeting Framework

### Meeting Structure

#### 1. Decision Presentation (15 minutes)
- **Problem Statement**: Clear articulation of the challenge
- **Proposed Solution**: Detailed solution description
- **Alternative Analysis**: Options considered and rejected
- **Implementation Timeline**: Key milestones and dependencies

#### 2. Stakeholder Impact Review (20 minutes)
- **Citizen Impact**: Service changes and user experience effects
- **Municipal Operations**: Workflow and administrative impacts
- **Technical Implications**: Development and infrastructure requirements
- **Compliance Verification**: Swiss standards and legal compliance
- **External Coordination**: Partner and integration requirements

#### 3. Approval and Feedback (15 minutes)
- **Stakeholder Feedback**: Questions, concerns, and suggestions
- **Compliance Verification**: Legal and regulatory approval
- **Resource Confirmation**: Budget and timeline approval
- **Risk Assessment**: Identified risks and mitigation strategies

#### 4. Implementation Planning (10 minutes)
- **Timeline Confirmation**: Key dates and milestones
- **Responsibility Assignment**: Who does what and when
- **Communication Plan**: How decision will be communicated
- **Success Metrics**: How success will be measured

### Meeting Participants by Decision Type

#### Strategic Architecture Decisions
- Municipal IT Director (Chair)
- Lead Architect
- Department Heads (affected departments)
- Compliance Officers
- Canton Representative (if applicable)

#### Citizen Service Changes
- Municipal Service Director (Chair)
- Citizen Representatives
- Customer Service Managers
- Accessibility Specialist
- Translation Coordinator

#### Technical Implementation Decisions
- Lead Architect (Chair)  
- Development Team Leads
- DevOps Engineers
- Security Specialist
- External Technical Partners

#### Compliance and Legal Decisions
- Municipal Legal Counsel (Chair)
- Data Protection Officer
- Compliance Coordinators
- Municipal IT Director
- Affected Department Heads

## Quality Assurance

### Stakeholder Coverage Verification
- [ ] All affected stakeholder categories identified
- [ ] Appropriate involvement level for each stakeholder
- [ ] Clear approval authority and responsibility assignment
- [ ] Swiss compliance requirements addressed
- [ ] Multi-municipality coordination planned

### Communication Effectiveness
- [ ] Appropriate communication methods for each stakeholder
- [ ] Language accessibility (German/French/Italian as needed)
- [ ] Accessibility compliance for all communication materials
- [ ] Clear escalation and feedback paths established
- [ ] Post-decision communication plan defined

### Municipal Compliance Integration
- [ ] Swiss legal and regulatory requirements addressed
- [ ] Canton Zürich specific considerations included
- [ ] Inter-municipal coordination planned
- [ ] Accessibility and inclusion requirements met
- [ ] Data protection and privacy compliance verified

---

**Guide Version**: MADR 4.0.0 Enhanced  
**Municipal Portal Version**: {current-version}  
**Swiss Compliance**: WCAG 2.1 AA, CH-DSG, eCH-0059  
**Last Updated**: 2025-01-09  
**Next Review**: 2025-04-09  
**Maintainer**: Municipal Portal Governance Team  