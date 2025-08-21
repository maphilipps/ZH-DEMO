# Bruchtal Directory System - Planning Document
**Planning Lane Output for Building Lane Implementation**
**Date**: 2025-08-20
**Status**: READY FOR BUILDING LANE

## Executive Summary
**DEMO VERSION** - Simplified planning for a structured data directory system for Gemeinde Bruchtal demonstration, featuring three directory types (Vereine, Firmen, Gastgewerbe) with basic external editing capabilities through guest accounts and simple approval workflows. This demo will showcase the concept of Swiss-compliant public directory management for the GPZH presentation.

## Requirements Overview
- **Source**: GPZH Präqualifikation Demo Requirements
- **Municipality**: Bruchtal ("Leben am See" - Life by the Lake)
- **Core Feature**: Structured directories with external maintenance
- **Compliance**: Swiss eCH-0059 and CH-DSG standards
- **Demo Time**: Part of 15-minute backend demonstration segment
- **Expected Entries**: 100+ per directory type

## 1. Technical Architecture Specification
**From**: @drupal-solution-architect
**Status**: COMPLETE

### Module Stack (Demo Version - Simplified)
```yaml
Required Modules:
  - content_moderation: Workflow states (Core module)
  - workflows: Workflow configuration (Core module)
  - views: Directory listings (Core module)
  - address: Swiss address formats
  - office_hours: Opening hours field
  
Optional for Demo (Nice to have):
  - pathauto: SEO-friendly URLs
  - search_api: Only if time permits
  - facets: Only if search_api is implemented
```

### Reusable Field Architecture (Drupal Best Practice)
```yaml
Shared Fields (Used across all directory content types):
  - field_description: Text (formatted, long) - Organization description
  - field_logo: Media reference - Organization logo
  - field_address: Address - Swiss format (eCH-0010)
  - field_phone: Telephone (multiple) - Phone numbers
  - field_email: Email (multiple) - Contact emails
  - field_website: Link - Organization website
  - field_opening_hours: Office hours - Opening times
  - field_directory_owner: Entity reference (User) - Guest account owner
  - field_verified: Boolean - Municipal verification status
  - field_last_updated: Date - Last modification date

Specific Fields (Created once, used where needed):
  - field_founding_year: Number (integer) - Year established
  - field_member_count: Number (integer) - Number of members
  - field_membership_fee: Number (decimal) - Membership cost
  - field_contact_person: Text (plain) - Contact name
  - field_activities: Entity reference revisions (Paragraphs) - Activity list
  - field_services: Entity reference revisions (Paragraphs) - Service offerings
  - field_employee_count: List (text) - Employee range (1-5, 6-20, 21-50, 50+)
  - field_certifications: File - Certification documents
  - field_uid_number: Text (plain) - Swiss business UID
  - field_photos: Media (multiple) - Image gallery
  - field_capacity: Number (integer) - Seating/guest capacity
  - field_outdoor_seating: Boolean - Has outdoor area
  - field_specialties: Text (plain, multiple) - Special offerings
  - field_price_range: List (integer) - Price level (1-4)
  - field_reservations: Boolean - Accepts reservations
  - field_accessibility: Boolean - Wheelchair accessible
  - field_meeting_schedule: Office hours - Regular meeting times
```

### Content Type Configuration
```yaml
Content Type 1: Club (node/club)
Label (DE): Vereine
Fields:
  - title: Organization name
  - field_description (shared)
  - field_logo (shared)
  - field_address (shared)
  - field_phone (shared)
  - field_email (shared)
  - field_website (shared)
  - field_founding_year
  - field_member_count
  - field_membership_fee
  - field_meeting_schedule
  - field_activities
  - field_contact_person
  - field_club_category: Taxonomy (club_categories)
  - field_directory_owner (shared)
  - field_verified (shared)
  - field_last_updated (shared)

Content Type 2: Company (node/company)
Label (DE): Firmen
Fields:
  - title: Company name
  - field_description (shared)
  - field_logo (shared)
  - field_address (shared)
  - field_phone (shared)
  - field_email (shared)
  - field_website (shared)
  - field_business_type: Taxonomy (business_types)
  - field_employee_count
  - field_services
  - field_certifications
  - field_opening_hours (shared)
  - field_uid_number
  - field_directory_owner (shared)
  - field_verified (shared)
  - field_last_updated (shared)

Content Type 3: Hospitality (node/hospitality)
Label (DE): Gastgewerbe
Fields:
  - title: Business name
  - field_description (shared)
  - field_logo (shared)
  - field_photos
  - field_address (shared)
  - field_phone (shared)
  - field_email (shared)
  - field_website (shared)
  - field_hospitality_type: List (Restaurant/Café/Bar/Hotel/Pension)
  - field_cuisine_type: Taxonomy (cuisine_types)
  - field_capacity
  - field_outdoor_seating
  - field_specialties
  - field_price_range
  - field_reservations
  - field_opening_hours (shared)
  - field_accessibility
  - field_directory_owner (shared)
  - field_verified (shared)
  - field_last_updated (shared)
```

### Views Configuration
```yaml
View 1: Vereinsverzeichnis (/vereine)
Machine Name: vereine_directory
Display:
  - Format: Grid with cards
  - Fields: Logo, Name, Description teaser, Category
  - Filters exposed:
    - Vereinskategorie (Taxonomy)
    - Textsuche (Title + Description)
    - Mitgliederzahl (Range)
  - Sorts: Name (A-Z), Gründungsjahr, Mitgliederzahl
  - Items per page: 12 with pager
  - Only show: Published/Approved items

View 2: Firmenverzeichnis (/firmen)  
Machine Name: firmen_directory
Display:
  - Format: Table or List
  - Fields: Logo, Name, Business type, Services, Contact
  - Filters exposed:
    - Geschäftstyp (Taxonomy)
    - Mitarbeiterzahl (Select)
    - Textsuche (Title + Services)
  - Sorts: Name (A-Z), Business type
  - Items per page: 20 with pager
  - Only show: Published/Approved items

View 3: Gastgewerbeverzeichnis (/gastgewerbe)
Machine Name: gastgewerbe_directory  
Display:
  - Format: Cards with images
  - Fields: Photos, Name, Type, Cuisine, Price range, Opening hours
  - Filters exposed:
    - Betriebstyp (Restaurant/Café/Bar/Hotel)
    - Küchenstil (Taxonomy)
    - Preisklasse (Select)
    - Mit Aussensitzplätzen (Boolean)
    - Mit Reservation (Boolean)
  - Sorts: Name (A-Z), Price range, Rating (if available)
  - Items per page: 9 with pager
  - Only show: Published/Approved items

View 4: Meine Einträge (User Dashboard)
Machine Name: my_directory_entries
Display:
  - Format: Table with operations
  - Shows: All content types (Vereine, Firmen, Gastgewerbe)
  - Filter: Current user is author/owner
  - Fields: Type, Title, Status, Last updated, Operations (Edit/Delete)
  - Grouped by: Content type
  - All workflow states visible to owner

View 5: Moderation Queue (Admin)
Machine Name: directory_moderation_queue
Display:
  - Format: Table with bulk operations
  - Shows: All directory content in "Review" state
  - Fields: Type, Title, Author, Submitted date, Preview, Actions
  - Sorts: Submitted date (newest first)
  - Bulk operations: Approve, Reject, Assign reviewer
  - Access: Content moderators only
```

### Workflow Configuration
```yaml
States:
  draft: Initial submission by guest
  review: Awaiting municipal review
  approved: Published to directory
  archived: Removed from public view
  
Transitions:
  submit_for_review:
    from: [draft]
    to: review
    permission: authenticated user
    
  approve:
    from: [review]
    to: approved
    permission: content moderator
    
  reject:
    from: [review]
    to: draft
    permission: content moderator
    
  archive:
    from: [approved]
    to: archived
    permission: content moderator
```

### Permission Matrix
```yaml
Roles:
  guest_editor:
    - Create own directory entries
    - Edit own directory entries in draft
    - Submit for review
    - View own entries (all states)
    
  content_moderator:
    - Review all submissions
    - Approve/reject entries
    - Edit all directory content
    - Archive entries
    
  anonymous:
    - View approved entries only
    - Search/filter directories
    - Access contact information
```

## 2. Content Model & Strategy
**From**: @drupal-content-strategist
**Status**: COMPLETE

### Field Definitions

#### Vereine (Clubs/Associations)
```yaml
Required Fields:
  - Name (255 chars)
  - Description (unlimited)
  - Contact Person (255 chars)
  - Email (validated)
  - Address (Swiss format)
  
Optional Fields:
  - Logo (2MB max, JPG/PNG)
  - Website URL
  - Phone numbers (up to 3)
  - Founded year
  - Member count
  - Meeting schedule
  - Activities (repeatable paragraph)
  - Social media links
```

#### Firmen (Companies)
```yaml
Required Fields:
  - Company name (255 chars)
  - Business description (unlimited)
  - Primary contact
  - Business address
  - Email
  
Optional Fields:
  - Logo/branding
  - Services offered (paragraphs)
  - Employee count range
  - Certifications (PDF uploads)
  - Opening hours
  - Website
  - UID number (Swiss business ID)
```

#### Gastgewerbe (Hospitality)
```yaml
Required Fields:
  - Establishment name
  - Type (Restaurant/Café/Bar/Hotel)
  - Address
  - Phone
  - Opening hours
  
Optional Fields:
  - Cuisine type(s)
  - Capacity
  - Price range
  - Specialties
  - Reservation system
  - Outdoor seating
  - Accessibility features
  - Photos (gallery)
```

### Taxonomy Structures
```yaml
Business Categories:
  - Handwerk (Crafts)
  - Dienstleistungen (Services)
  - Einzelhandel (Retail)
  - Gesundheit (Healthcare)
  - Bildung (Education)
  
Cuisine Types:
  - Schweizerisch (Swiss)
  - Italienisch (Italian)
  - Asiatisch (Asian)
  - Vegetarisch/Vegan
  - International
  
Activity Types:
  - Sport
  - Kultur (Culture)
  - Soziales (Social)
  - Umwelt (Environment)
  - Jugend (Youth)
```

### Bruchtal Demo Content (LOTR-inspired)
```yaml
Vereine (5-6 Einträge für Demo):
  - Bruchtal Wanderverein (Vorsitzender: Théoden Rohan, 120 Mitglieder)
  - Musikverein Bruchtal (Leitung: Éowyn Schildmaid, gegründet 1887)
  - FC Bruchtal (Trainer: Boromir Stark, Jugendmannschaften)
  - Naturschutzverein Seeblick (Präsident: Radagast Braun)
  - Reitverein Rohan (Vorsitzender: Éomer Rossmann)
  
Firmen (5-6 Einträge für Demo):
  - Müller & Söhne Schreinerei (Inhaber: Gimli Müller)
  - Bruchtal Apotheke (Leitung: Elrond Heiler)
  - IT Solutions Bruchtal GmbH (CEO: Gandalf Grau)
  - Bäckerei Morgentau (Seit 1952, Familie Beutlin)
  - Grünblatt Gärtnerei (Inhaber: Samweis Gamdschie)
  
Gastgewerbe (5-6 Einträge für Demo):
  - Gasthof zum Grünen Drachen (Wirt: Merry Brandybock)
  - Café Seeblick (Inhaberin: Arwen Abendstern)
  - Restaurant Alpenrose (Küchenchef: Legolas Grünwald)
  - Pizzeria Bella Vista (Familie Tuk)
  - Hotel Post (Direktor: Aragorn König)
```

## 3. Swiss Compliance Requirements
**From**: @swiss-compliance-specialist
**Status**: COMPLETE

### eCH-0059 Compliance
```yaml
Organization Data Structure:
  - organizationName: Required, multilingual
  - organizationID: Optional UID
  - address: eCH-0010 compliant
  - contact: eCH-0046 compliant
  
Address Format (eCH-0010):
  - street: Street name
  - houseNumber: Separate field
  - postCode: 4 digits
  - town: Municipality name
  - canton: ZH (fixed for demo)
```

### CH-DSG Requirements
```yaml
Data Protection:
  - Explicit consent for publication
  - Clear privacy policy
  - Right to correction (edit own)
  - Right to deletion (request removal)
  - Data minimization (only necessary fields)
  
Retention Policy:
  - Active entries: Indefinite with annual review
  - Archived entries: 2 years
  - Deleted entries: 30 days soft delete
```

### Accessibility Standards
```yaml
WCAG 2.1 AA Requirements:
  - Form labels: Explicit and descriptive
  - Error messages: Clear and actionable
  - Keyboard navigation: Full support
  - Screen reader: ARIA labels
  - Color contrast: 4.5:1 minimum
  - Touch targets: 44x44px minimum
```

### Language Requirements
```yaml
Swiss German Specifics:
  - No ß character (use ss)
  - Formal addressing (Sie-Form)
  - Local terminology (Gemeinde not Kommune)
  - Date format: DD.MM.YYYY
  - Currency: CHF
  - Phone format: +41 XX XXX XX XX
```

## 4. Project Timeline & Demo Plan
**From**: @drupal-technical-pm
**Status**: COMPLETE

### Implementation Timeline (Demo Version - Simplified)
```yaml
Day 1: Content Architecture (4h total)
  - Create 3 content types (1h)
  - Configure shared fields (1h)
  - Set up basic taxonomies (30min)
  - Create 3 main views (1.5h)
  
Day 2: Workflow & Permissions (3h total)
  - Configure content_moderation (1h)
  - Set up 2 roles (guest_editor, moderator) (1h)
  - Test workflow (1h)
  
Day 3: Demo Content & Testing (3h total)
  - Create 15-18 demo entries with LOTR names (1.5h)
  - Add some logos/images (30min)
  - Test complete flow (1h)
  
Total: ~10 hours for functional demo
```

### Demo Scenario (5 minutes of 15-minute backend segment)
```yaml
1. Directory Overview (1 min):
   - Show three directory types
   - Display public view with filters
   - Demonstrate search functionality
   
2. Guest Registration (1 min):
   - Create new guest account
   - Show registration form
   - Explain verification process
   
3. Content Submission (1.5 min):
   - Login as "Gasthof zum Grünen Drachen"
   - Edit existing entry
   - Add new photos
   - Submit for review
   
4. Approval Workflow (1 min):
   - Switch to moderator account
   - Review submission queue
   - Show approval interface
   - Publish changes
   
5. Advanced Features (0.5 min):
   - Bulk operations
   - Export capabilities
   - Analytics dashboard
```

### Success Criteria
```yaml
Functional Requirements:
  ✓ All three directory types operational
  ✓ Guest registration working
  ✓ Workflow transitions smooth
  ✓ Search and filters functional
  ✓ Mobile responsive
  
Performance Metrics:
  ✓ Page load <2 seconds
  ✓ Search results <1 second
  ✓ Workflow actions <3 seconds
  
Compliance Checklist:
  ✓ eCH-0059 data structure
  ✓ CH-DSG compliance
  ✓ WCAG 2.1 AA passed
  ✓ Swiss German formatting
```

## Task Specifications for Building Lane (Demo Version)

### Task 1: Content Types & Fields (2h)
- Create 3 content types: club, company, hospitality
- Configure shared fields (once, reuse everywhere)
- Add content-type specific fields
- Status: ready-for-dev

### Task 2: Basic Views (1.5h)
- Create /vereine directory view
- Create /firmen directory view  
- Create /gastgewerbe directory view
- Add basic exposed filters
- Status: ready-for-dev

### Task 3: Simple Workflow (1h)
- Configure content_moderation
- Create guest_editor role
- Create content_moderator role
- Set basic permissions
- Status: ready-for-dev

### Task 4: Demo Content (1.5h)
- Create 5-6 Vereine (LOTR-themed names)
- Create 5-6 Firmen (LOTR-themed names)
- Create 5-6 Gastgewerbe (LOTR-themed names)
- Add a few sample images/logos
- Status: ready-for-dev

### Task 5: Test Demo Flow (1h)
- Test guest registration
- Test content submission
- Test approval workflow
- Verify 5-minute demo scenario works
- Status: ready-for-dev

## Instructions to Main Agent

1. **Delegate to Building Lane**: Send this complete specification to @building-lane-orchestrator for implementation
2. **Set Status**: Mark all tasks as `ready-for-dev` in task tracking system
3. **Documentation**: Ensure this plan is saved in `.claude/lanes/planning/bruchtal-directory-system-plan.md`
4. **Coordination**: Notify Reviewing Lane to prepare compliance validation checklist
5. **Memory Update**: Store key decisions in mcp__server-memory for cross-lane access

## Architectural Decision Records (ADRs)

### ADR-001: Use Content Moderation for Workflow
**Decision**: Use Drupal's content_moderation module instead of custom workflow
**Rationale**: Core module, well-tested, integrates with Drupal permissions
**Consequences**: Standard UI, easier maintenance, familiar to Drupal developers

### ADR-002: Three Separate Content Types with Shared Fields
**Decision**: Three separate content types (club, company, hospitality) with reusable shared fields
**Rationale**: 
- Drupal best practice: "Create fields once, use everywhere"
- Shared fields (field_description, field_address, etc.) maintain consistency
- Content-type-specific fields only where needed
- Separate permissions per content type
- Individual Views configuration per type
- Better maintainability through field reuse
- English machine names (club, company, hospitality) with German labels
**Consequences**: 
- Consistent field configuration across types
- Single point of maintenance for shared fields
- Clear separation between shared and specific functionality
- Follows Drupal field reusability principles

### ADR-003: Guest Accounts vs Anonymous Submissions
**Decision**: Require guest account registration for submissions
**Rationale**: Better spam control, ownership tracking, edit capabilities
**Consequences**: Additional registration step, but better user experience

---
*Document Status: COMPLETE - DEMO VERSION*
*Scope: ~10 hours implementation for GPZH presentation demo*
*Next: Hand off to @building-lane-orchestrator for simplified implementation*
*Note: Focus on demonstrating the concept, not production-ready features*