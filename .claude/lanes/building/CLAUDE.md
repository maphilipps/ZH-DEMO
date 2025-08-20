# Building Lane - My Implementation Preferences

**Lane Purpose**: Feature implementation, code development, testing  
**Lead Agents**: @drupal-11-lead-developer + @municipality-portal-specialist  
**My Style**: Clean code, comprehensive testing, Swiss-compliant from start

> See `llms.txt` for unchanging implementation rules and standards.
> This file contains my coding preferences and patterns that evolve.

## 🎯 My Implementation Style

### Primary Responsibilities
- **Feature Implementation**: Code development, module configuration, theme building
- **Municipal Portal Development**: Swiss municipality-specific features and workflows
- **AI Integration**: GPT-4o content suggestions, search enhancement, alt-text generation
- **Performance Optimization**: Core Web Vitals >90, sub-2-second load times
- **Demo Content**: Bruchtal municipality showcase content and scenarios

### When to Use This Lane
- Implementing planned features from Planning Lane
- Coding new Drupal modules or components
- Building municipal forms and workflows
- Integrating AI features
- Optimizing performance
- Creating demo content and scenarios
- Fixing bugs and issues from Reviewing Lane

## 📋 Task Management System

### Creating New Tasks
Each task gets its own `.md` file in this folder:

**File Naming Convention:**
```
YYYY-MM-DD_implementation-task-name.md
```

**Implementation Task Template:**
```markdown
# Implementation: [Task Name]

**Status**: [Received/In Progress/Testing/Complete/Sent to Review]
**Priority**: [High/Medium/Low]
**Assigned Agent**: [@agent-name]
**Started**: [Date]
**Estimated**: [Hours/Days]
**From Lane**: [Planning/Direct/Reviewing]

## Implementation Requirements
[From Planning Lane handoff or direct requirements]

## Technical Specifications
- [ ] Module/Component to modify
- [ ] Database changes needed
- [ ] Configuration updates
- [ ] Theme modifications

## Code Changes
### Files to Create/Modify
- `path/to/file1.php` - [Description]
- `path/to/file2.twig` - [Description]

### Dependencies
- [ ] New modules needed
- [ ] Library installations
- [ ] Configuration imports

## Testing Plan
- [ ] Unit tests to write
- [ ] Manual testing scenarios
- [ ] Demo scenarios to validate
- [ ] Performance checks

## Swiss Compliance Considerations
- [ ] eCH-0059 accessibility
- [ ] CH-DSG data protection
- [ ] Swiss German language
- [ ] Formal addressing (Sie-Form)

## Implementation Notes
[Technical details, challenges, solutions]

## Ready for Review
When complete:
- [ ] Code implemented
- [ ] Tests passing
- [ ] Demo scenarios work
- [ ] Performance validated
- [ ] Documentation updated

## Handoff to Reviewing
**Files Changed**: [List]
**Test Scenarios**: [List]
**Compliance Checks Needed**: [List]
**Demo Impact**: [Description]
```

## 🤖 Agent Usage Patterns

### @drupal-11-lead-developer
**Use for:**
- Custom module development
- Complex backend integrations
- Performance optimization
- Database design
- Security implementation
- Migration tasks

**Example:**
```
@drupal-11-lead-developer: Implement workflow approval system for municipal forms with email notifications and status tracking
```

### @municipality-portal-specialist
**Use for:**
- Municipal-specific features
- Swiss government processes
- Directory management systems
- Citizen service workflows
- Multi-municipal theming
- Local government compliance

**Example:**
```
@municipality-portal-specialist: Create directory content types for Vereine, Firmen, and Gastgewerbe with filtering and search
```

### @drupal-ai-integration-specialist
**Use for:**
- GPT-4o integration
- AI content suggestions
- Automated alt-text generation
- Smart search features
- AI-powered content analysis

**Example:**
```
@drupal-ai-integration-specialist: Add GPT-4o content suggestions to CKEditor 5 for municipal content creation
```

### @alpine-js-frontend-developer
**Use for:**
- Interactive UI components
- Form validation
- Dynamic content loading
- User experience enhancements
- Modern JavaScript patterns

**Example:**
```
@alpine-js-frontend-developer: Add real-time form validation and smooth transitions to municipal forms
```

## 🔄 Coordination Workflows

### Incoming Tasks

#### From Planning Lane
**File Pattern**: `from-planning_[task-name].md`
```markdown
# From Planning Lane: [Task Name]

## Planning Analysis
[Copy from Planning Lane handoff]

## Implementation Approach
[Your implementation strategy]

## Development Plan
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Timeline
- Start: [Date]
- Estimated completion: [Date]
- Demo ready: [Date]
```

#### From Reviewing Lane (Bug Fixes)
**File Pattern**: `from-reviewing_fix-[issue-name].md`
```markdown
# Fix from Reviewing: [Issue Name]

## Issue Description
[From Reviewing Lane]

## Root Cause Analysis
[Your analysis]

## Fix Implementation
[Code changes needed]

## Testing Strategy
[How to validate fix]

## Prevention
[How to avoid this issue in future]
```

### Outgoing Handoffs

#### To Reviewing Lane
**File Pattern**: `to-reviewing_[feature-name].md`
```markdown
# To Reviewing Lane: [Feature Name]

## Implementation Summary
[What was built]

## Files Changed
- [List of modified files]
- [New files created]
- [Configuration changes]

## Testing Completed
- [ ] Unit tests pass
- [ ] Manual testing complete
- [ ] Demo scenarios validated
- [ ] Performance benchmarks met

## Review Requirements
### Functionality Tests
- [ ] Test scenario 1
- [ ] Test scenario 2

### Swiss Compliance
- [ ] eCH-0059 accessibility
- [ ] CH-DSG data protection
- [ ] Swiss German language
- [ ] Formal addressing

### Performance
- [ ] Core Web Vitals >90
- [ ] Page load <2 seconds
- [ ] Mobile responsiveness

### Demo Impact
[How this affects demo presentation]

## Known Issues
[Any issues or limitations]

## Documentation
[Location of updated docs]
```

## 🛠️ Development Environment

### DDEV Commands
```bash
# Environment
ddev start              # Start environment
ddev restart            # Fresh restart
ddev stop              # Stop services

# Development
ddev theme dev         # Vite dev server (:5173)
ddev theme build       # Production build
ddev theme storybook   # Component docs (:6006)

# Drupal
ddev drush cr          # Clear caches
ddev drush uli         # Admin login
ddev drush cex         # Export config
ddev drush cim         # Import config
```

### Multi-Site Access
```bash
# Primary site
ddev launch

# Bruchtal demo site
ddev launch bruchtal.zh-demo.ddev.site

# Admin access for specific site
ddev drush --uri=bruchtal.zh-demo.ddev.site uli
```

### Theme Development
```bash
# Watch mode
ddev theme watch

# Component development
cd web/themes/custom/adesso_cms_theme/components
# Create new SDC component
mkdir new-component
cd new-component
# Create component files
```

## 🧪 Testing & Quality

### Test Types
1. **Unit Tests**: Individual functions and methods
2. **Integration Tests**: Component interactions
3. **Demo Tests**: Presentation scenarios
4. **Performance Tests**: Core Web Vitals
5. **Accessibility Tests**: WCAG 2.1 AA compliance

### Testing Workflow
```bash
# Run all tests
ddev exec npm run qa:full

# Individual test types
ddev exec npm run test:unit
ddev exec npm run test:e2e
ddev exec npm run test:accessibility
ddev exec npm run test:performance

# Visual regression
ddev backstop reference
ddev backstop test
```

## 🚀 Municipal Features Implementation

### Required Municipal Forms
1. **Feedback Form** (Feedback-Formular)
2. **Infrastructure Damage Report** (Meldung Infrastrukturschäden)
3. **Event Registration** (Anmeldung für Anlässe)
4. **Room Booking Request** (Anfrage für Raumnutzung)

### Implementation Pattern for Forms
```markdown
## Form Implementation: [Form Name]

### Webform Configuration
- Form ID: [machine_name]
- Fields: [List fields]
- Validation: [Rules]
- Workflow: [Approval process]

### Email Notifications
- To: [Recipients]
- Templates: [Email templates]
- Conditions: [When to send]

### Data Storage
- Storage: [Table/Entity]
- Export options: [CSV/Excel]
- Retention policy: [Time period]

### Swiss Compliance
- Data protection: [CH-DSG measures]
- Accessibility: [WCAG compliance]
- Language: [Swiss German]
```

### Directory Systems
- **Vereine** (Associations)
- **Firmen** (Companies) 
- **Gastgewerbe** (Hospitality)

### Municipal Workflow Patterns
- Guest editor approval
- Content publishing workflow
- Media approval process
- Event approval system

## 🎨 Theming & Components

### Bruchtal Theme Development
- **Color Scheme**: Blue/turquoise lake theme
- **Typography**: Swiss-appropriate fonts (minimum 16px)
- **Components**: Municipal-specific components
- **Responsive**: Mobile-first design

### SDC Component Development
```bash
# Component structure
components/
  component-name/
    component-name.component.yml      # Definition
    component-name.twig              # Template
    component-name.css               # Styles
    component-name.js                # Behavior
    component-name.stories.js        # Storybook
```

### Tailwind CSS v4 Patterns
- Utility-first approach
- Custom Swiss municipal colors
- Responsive breakpoints
- Accessibility-first design

## 🤖 AI Integration Patterns

### GPT-4o Content Suggestions
```php
// AI integration pattern
$ai_service = \Drupal::service('gpzh_ai.content_suggestions');
$suggestions = $ai_service->generateContentSuggestions($context, $content_type);
```

### Implementation Areas
- CKEditor 5 content suggestions
- Alt-text generation for images  
- Search result enhancement
- Content categorization
- Municipal service recommendations

## 📊 Progress Tracking

### Implementation Status Board
**File**: `implementation-status.md` (Updated daily)
```markdown
# Building Lane Status

**Active Implementations**: [Count]
**In Testing**: [Count]  
**Ready for Review**: [Count]
**Demo Ready Features**: [Count]

## Current Sprint
### In Progress
- [Task 1] - [Agent] - [Progress %]
- [Task 2] - [Agent] - [Progress %]

### Completed This Week
- [Task 1] - Sent to Review
- [Task 2] - Demo Ready

### Next Week Priorities
- [Upcoming tasks]

## Performance Metrics
- Core Web Vitals: [Score]
- Page Load Time: [Seconds]
- Accessibility Score: [Percentage]

## Demo Readiness
- [ ] All 4 forms functional
- [ ] Bruchtal theme complete
- [ ] AI features working
- [ ] Performance >90
```

## 💡 Best Practices

### Code Quality
- Follow Drupal coding standards
- Write comprehensive tests
- Document complex functions
- Use Swiss German for user-facing text
- Implement accessibility from start

### Performance
- Optimize images and media
- Minimize JavaScript bundles
- Use efficient database queries
- Cache configuration effectively
- Test on mobile devices

### Swiss Compliance
- eCH-0059 accessibility standards
- CH-DSG data protection measures
- Swiss German language (no ß)
- Formal addressing (Sie-Form)
- Canton-specific requirements

### Municipal Portal Patterns
- Multi-tenant architecture
- Role-based permissions
- Workflow approval systems
- Directory management
- Guest editor capabilities

---

**Remember**: This lane is about building, coding, and implementing. You receive specifications from Planning Lane and deliver working features to Reviewing Lane. Focus on clean, performant, accessible code that meets Swiss municipal requirements.