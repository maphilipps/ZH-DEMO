# GPZH Directory Content Strategy
**Bruchtal Municipality Demo System - Three-Content-Type Architecture**

*Created: 2025-08-20*  
*Project: GPZH Präqualifikation Demo System*  
*Content Strategist: AI Assistant*  
*Context: Corrected architecture with separate content types*

## 🎯 Executive Summary

This content strategy defines the implementation approach for three separate directory content types (`verein`, `firma`, `gastgewerbe`) in the Bruchtal demo municipality system. Each content type follows Drupal best practices with specific field configurations, content governance workflows, and demo content tailored for the 35-minute GPZH presentation.

## 🏗️ Content Architecture Overview

### Three-Content-Type Strategy
Following the corrected technical architecture, we implement:

1. **Verein Content Type** - Associations and clubs
2. **Firma Content Type** - Companies and professional services  
3. **Gastgewerbe Content Type** - Hospitality and tourism businesses

Each content type maintains its own field schema while sharing common directory fields for consistent user experience across filtering and search functionality.

## 📋 Content Type Specifications

### 1. Verein (Association) Content Type

**Machine Name**: `verein`  
**Content Type Label**: `Verein`  
**Purpose**: Community associations, clubs, sports groups, cultural organizations

#### Field Architecture
```yaml
Core Fields:
  - Title (text_plain): Association name
  - Body (text_long): Full description with WYSIWYG
  - field_short_description (text): Summary for listings (160 chars)
  
Directory Fields:
  - field_directory_address (address): Full address with Swiss formatting
  - field_directory_contact_person (text): Primary contact name
  - field_directory_contact_email (email): Contact email
  - field_phone (telephone): Primary phone number
  - field_website (link): Association website URL
  
Association-Specific Fields:
  - field_verein_type (taxonomy_reference): Sports, Culture, Community, etc.
  - field_membership_info (text_long): Membership details and requirements
  - field_meeting_schedule (text): Regular meeting times
  - field_age_groups (text): Target age groups served
  - field_annual_fee (decimal): Membership fee information
  - field_established_year (integer): Year founded
  
Media Fields:
  - field_logo (media_reference): Association logo
  - field_gallery (media_reference): Photo gallery (unlimited)
  - field_documents (media_reference): Brochures, flyers (PDF)

Administrative Fields:
  - field_membership_open (boolean): Accepting new members
  - field_volunteer_needs (text_long): Volunteer opportunities
  - field_social_media (link): Social media profiles (unlimited)
```

#### Content Governance
- **External Submission**: Guest contributors can submit new associations
- **Approval Workflow**: Draft → Review → Published
- **Update Cycle**: Annual verification of contact information
- **Content Guidelines**: Focus on community value and accessibility

### 2. Firma (Company) Content Type

**Machine Name**: `firma`  
**Content Type Label**: `Firma`  
**Purpose**: Local businesses, professional services, commercial entities

#### Field Architecture
```yaml
Core Fields:
  - Title (text_plain): Company name
  - Body (text_long): Company description with services
  - field_short_description (text): Business summary (160 chars)
  
Directory Fields:
  - field_directory_address (address): Business address
  - field_directory_contact_person (text): Contact person/manager
  - field_directory_contact_email (email): Business email
  - field_phone (telephone): Main business phone
  - field_website (link): Company website
  
Company-Specific Fields:
  - field_business_type (taxonomy_reference): Service, Retail, Manufacturing, etc.
  - field_services_offered (taxonomy_reference): Multiple selections
  - field_opening_hours (office_hours): Business hours
  - field_employee_count (list_integer): 1-10, 11-50, 51-200, 200+
  - field_founded_year (integer): Year established
  - field_service_area (taxonomy_reference): Geographic service area
  
Professional Fields:
  - field_certifications (text): Professional certifications
  - field_languages_spoken (taxonomy_reference): DE, FR, IT, EN
  - field_payment_methods (taxonomy_reference): Cash, Card, Invoice, etc.
  - field_parking_available (boolean): Customer parking
  
Media Fields:
  - field_logo (media_reference): Company logo
  - field_gallery (media_reference): Business photos
  - field_price_list (media_reference): Service pricing (PDF)

Commercial Fields:
  - field_special_offers (text_long): Current promotions
  - field_b2b_services (boolean): Business-to-business services
  - field_online_ordering (boolean): Online services available
```

#### Content Governance
- **Business Registration**: Verified business license required
- **Approval Workflow**: Draft → Municipal Review → Published
- **Update Cycle**: Quarterly contact verification
- **Content Guidelines**: Professional presentation, accurate service information

### 3. Gastgewerbe (Hospitality) Content Type

**Machine Name**: `gastgewerbe`  
**Content Type Label**: `Gastgewerbe`  
**Purpose**: Restaurants, hotels, cafés, tourism services, entertainment venues

#### Field Architecture
```yaml
Core Fields:
  - Title (text_plain): Establishment name
  - Body (text_long): Detailed description and atmosphere
  - field_short_description (text): Quick description (160 chars)
  
Directory Fields:
  - field_directory_address (address): Venue address
  - field_directory_contact_person (text): Manager/owner name
  - field_directory_contact_email (email): Reservations email
  - field_phone (telephone): Reservation/inquiry phone
  - field_website (link): Establishment website
  
Hospitality-Specific Fields:
  - field_establishment_type (taxonomy_reference): Restaurant, Hotel, Café, Bar, etc.
  - field_cuisine_type (taxonomy_reference): Swiss, Italian, Asian, etc.
  - field_opening_hours (office_hours): Service hours by day
  - field_seasonal_hours (text): Seasonal variations
  - field_capacity (integer): Seating capacity
  - field_price_range (list_string): €, €€, €€€, €€€€
  
Service Fields:
  - field_reservations_required (boolean): Booking necessary
  - field_takeaway_available (boolean): Takeaway service
  - field_delivery_service (boolean): Home delivery
  - field_outdoor_seating (boolean): Terrace/garden seating
  - field_wheelchair_accessible (boolean): Accessibility
  - field_wifi_available (boolean): Free WiFi
  - field_parking_available (boolean): Customer parking
  
Accommodation Fields (Hotels):
  - field_room_count (integer): Number of rooms
  - field_amenities (taxonomy_reference): Pool, Spa, Gym, etc.
  - field_check_in_time (text): Check-in hours
  - field_pet_friendly (boolean): Pets allowed
  
Media Fields:
  - field_logo (media_reference): Business logo
  - field_gallery (media_reference): Interior/exterior photos
  - field_menu (media_reference): Menu/brochure PDFs

Event Fields:
  - field_events_hosting (boolean): Private events available
  - field_live_music (boolean): Entertainment provided
  - field_special_menus (text_long): Seasonal/special offerings
```

#### Content Governance
- **Tourism Registration**: Verified tourism license for accommodations
- **Health Department**: Food service permit verification
- **Approval Workflow**: Draft → Municipal Health Review → Tourism Board → Published
- **Update Cycle**: Monthly menu/pricing updates, seasonal hour changes
- **Content Guidelines**: High-quality photos required, accurate pricing

## 🌊 Bruchtal Demo Content Strategy

### Municipality Theme: "Leben am See" (Life by the Lake)
Bruchtal is positioned as a picturesque lakeside municipality combining traditional Swiss charm with modern services. The content reflects this through Lord of the Rings-inspired names that evoke a sense of magic and community while maintaining professional authenticity.

### Content Creation Priorities

#### Phase 1: Core Demo Content (Week 1)
**Vereine (5 entries)**:
1. **Segelclub Bruchtal e.V.**
   - Lake sailing club with youth programs
   - Founded 1978, 120 members
   - Marina location, sailing courses offered
   - Contact: Marina Seewind, marina@segelclub-bruchtal.ch
   - Logo: Sailboat on lake background
   - Gallery: Regatta photos, training sessions, club house

2. **Wanderverein Mittelerde Bruchtal**
   - Mountain hiking club with guided tours
   - Founded 1965, 85 members, accepting new members
   - Weekly group hikes, seasonal alpine tours
   - Contact: Thorin Bergsteiger, info@wandern-bruchtal.ch
   - Equipment rental, hiking maps available

3. **Kulturverein Auenland**
   - Cultural events and local theater group
   - Community festivals, art workshops
   - Monthly cultural evenings, annual summer festival
   - Contact: Bilbo Ringbauer, kultur@auenland-bruchtal.ch
   - Volunteer opportunities for event organization

4. **Freiwillige Feuerwehr Bruchtal**
   - Volunteer fire department, emergency services
   - Founded 1952, active recruitment
   - Training every Wednesday 19:00
   - Contact: Gimli Axteisen, feuerwehr@bruchtal.ch
   - Open house events, youth fire brigade

5. **Jugendtreff Bruchtal**
   - Youth center and activities program
   - Ages 12-18, after-school programs
   - Gaming room, sports activities, mentoring
   - Contact: Arwen Elbenherz, jugend@bruchtal.ch
   - Volunteer mentor program available

**Firmen (5 entries)**:
1. **Bruchtal Bootsbau GmbH**
   - Custom boat building and repair services
   - Founded 1987, 12 employees
   - Sailing boats, motor boats, restoration
   - Contact: Legolas Holzmeister, info@bootsbau-bruchtal.ch
   - Marina services, winter storage

2. **Praxis Dr. Elrond**
   - Family medicine practice
   - General practice, preventive care
   - Open Mon-Fri 08:00-18:00, Sat 09:00-12:00
   - Contact: Dr. Elrond Heilkunst, praxis@dr-elrond.ch
   - Emergency appointments, house calls available

3. **Gasthof zum Grünen Drachen (Catering Services)**
   - Professional catering and event services
   - Business lunches, wedding catering, corporate events
   - Founded 1923, family-owned
   - Contact: Samwise Kochkunst, catering@gruener-drache.ch
   - Full-service event planning

4. **Imkerei Beutelsend**
   - Local honey production and bee products
   - Organic certification, local wildflower honey
   - Founded 2010, sustainable beekeeping
   - Contact: Frodo Honigsammler, info@imkerei-beutelsend.ch
   - Honey tours, educational workshops

5. **IT-Service Mittelerde**
   - Local IT support and digital solutions
   - Founded 2015, serves small businesses
   - Cloud services, website development, training
   - Contact: Gandalf Techzauberer, help@it-mittelerde.ch
   - 24/7 emergency support, remote assistance

**Gastgewerbe (5 entries)**:
1. **Gasthof zum Grünen Drachen**
   - Traditional Swiss inn with modern amenities
   - Restaurant, 12 rooms, beer garden
   - Founded 1923, family-owned for 3 generations
   - Contact: Samwise Gastgeber, info@gruener-drache.ch
   - Traditional Swiss cuisine, lake view terrace
   - Price range: €€, Reservations recommended

2. **Restaurant Seeblick Bruchtal**
   - Fine dining with panoramic lake views
   - Modern Swiss cuisine with seasonal menu
   - 45 seats, outdoor terrace (25 seats)
   - Contact: Galadriel Sterneköchin, reservierung@seeblick-bruchtal.ch
   - Wine cellar, private dining room available
   - Price range: €€€, Reservations required

3. **Hotel am Auenland**
   - Boutique hotel in traditional Swiss style
   - 18 rooms, spa services, conference facilities
   - Founded 2005, 4-star certification
   - Contact: Elrond Gastgeber, hotel@auenland-bruchtal.ch
   - Wellness area, business center, wedding venue
   - Pet-friendly, barrier-free rooms available

4. **Café Beutelsend**
   - Cozy lakeside café with homemade pastries
   - Coffee roastery, breakfast and light lunch
   - 30 seats inside, 20 seats lakeside terrace
   - Contact: Rosie Kaffeekünstlerin, cafe@beutelsend.ch
   - Local honey products, vegan options
   - Price range: €€, No reservations needed

5. **Bruchtal Marina (Restaurant & Bootsverleih)**
   - Marina restaurant with boat rental services
   - Seasonal operation (April-October)
   - Fresh fish specialties, boat rentals by hour/day
   - Contact: Tom Bombergrill, marina@bruchtal-see.ch
   - Sailing lessons, fishing guide services
   - Docking facilities for visiting boats

#### Phase 2: Extended Content (Week 2)
Additional entries for robust filtering and search demonstrations:
- 3 additional Vereine (Sports clubs, hobby groups)
- 3 additional Firmen (Retail, construction, consulting)
- 3 additional Gastgewerbe (Bars, seasonal venues, catering)

## 🔄 Content Governance Framework

### Editorial Workflow Design

#### Verein Workflow
```yaml
States:
  - Draft: Initial submission by association representatives
  - Community Review: Municipal review for community value
  - Published: Live on directory
  - Archive: Inactive associations

Transitions:
  - Submit for Review (Draft → Community Review)
  - Approve (Community Review → Published)  
  - Request Changes (Community Review → Draft)
  - Archive (Published → Archive)
  - Reactivate (Archive → Draft)

User Roles:
  - guest_contributor: Can create drafts
  - municipal_reviewer: Can approve verein entries
  - content_editor: Full editorial control
```

#### Firma Workflow
```yaml
States:
  - Draft: Initial business submission
  - Business Verification: Check business registration
  - Municipal Review: Community impact assessment
  - Published: Active business listing
  - Suspended: Temporary removal (complaints/issues)

Transitions:
  - Submit for Verification (Draft → Business Verification)
  - Verify Business (Business Verification → Municipal Review)
  - Approve Listing (Municipal Review → Published)
  - Request Updates (Any state → Draft)
  - Suspend Listing (Published → Suspended)
  - Reinstate (Suspended → Published)

User Roles:
  - business_owner: Can create and edit own business drafts
  - business_verifier: Can verify business credentials
  - municipal_reviewer: Can approve business listings
  - content_editor: Full editorial control
```

#### Gastgewerbe Workflow
```yaml
States:
  - Draft: Initial hospitality submission
  - Health Review: Food/accommodation safety check
  - Tourism Review: Tourism board approval
  - Published: Active hospitality listing
  - Seasonal Closed: Temporarily inactive

Transitions:
  - Submit for Health Review (Draft → Health Review)
  - Health Approved (Health Review → Tourism Review)
  - Tourism Approved (Tourism Review → Published)
  - Seasonal Close (Published → Seasonal Closed)
  - Reopen Season (Seasonal Closed → Published)
  - Request Corrections (Any review state → Draft)

User Roles:
  - hospitality_owner: Can create and edit own venue drafts
  - health_reviewer: Municipal health department
  - tourism_reviewer: Tourism board representative
  - content_editor: Full editorial control
```

### Content Quality Standards

#### Required Fields by Content Type
**All Content Types**:
- Title (unique within content type)
- Short description (160 characters maximum)
- Full address (Swiss format validation)
- Contact email (validated format)
- Primary phone number

**Additional Requirements**:
- **Verein**: Meeting schedule, membership information
- **Firma**: Business hours, services offered
- **Gastgewerbe**: Opening hours, price range, capacity

#### Media Requirements
**Logo Standards**:
- Minimum 400x400 pixels
- Maximum 2MB file size
- PNG or JPG format
- Square aspect ratio preferred

**Gallery Images**:
- Minimum 1200x800 pixels
- Maximum 5MB per image
- Professional quality preferred
- Alt-text required for accessibility

**Document Standards**:
- PDF format only
- Maximum 10MB file size
- Accessible PDF structure
- German language content

#### Content Guidelines

**Writing Style**:
- Swiss German without ß (use ss)
- Formal addressing (Sie-Form)
- Clear, accessible language
- Community-focused tone

**Required Information**:
- Current and accurate contact details
- Clear service/activity descriptions
- Accessibility information where applicable
- Pricing transparency (where relevant)

## 🏷️ Taxonomy Strategy

### Content Categorization System

#### Verein Categories
```yaml
Verein Types (field_verein_type):
  - Sport & Bewegung
    - Wassersport (Sailing, Swimming, Rowing)
    - Wandern & Bergsteigen
    - Wintersport (Skiing, Ice skating)
    - Ballsport (Football, Tennis, Volleyball)
    - Kampfsport & Fitness
  - Kultur & Bildung
    - Theater & Musik
    - Kunst & Handwerk  
    - Geschichte & Tradition
    - Literatur & Sprachen
  - Gemeinschaft & Soziales
    - Nachbarschaftshilfe
    - Seniorenbetreuung
    - Jugendarbeit
    - Integration & Vielfalt
  - Natur & Umwelt
    - Naturschutz
    - Gartenbau
    - Tierschutz
    - Nachhaltigkeit

Age Groups (field_age_groups):
  - Kinder (0-12 Jahre)
  - Jugendliche (13-18 Jahre) 
  - Erwachsene (19-64 Jahre)
  - Senioren (65+ Jahre)
  - Familien (alle Altersgruppen)
```

#### Firma Categories
```yaml
Business Types (field_business_type):
  - Gesundheit & Wellness
    - Arztpraxen
    - Therapeutische Dienste
    - Apotheken
    - Fitness & Sport
  - Handel & Dienstleistungen
    - Einzelhandel
    - Reparaturdienste
    - Reinigung & Pflege
    - Transport & Logistik
  - Handwerk & Produktion
    - Bau & Renovierung
    - Elektro & Installation
    - Holzverarbeitung
    - Metallverarbeitung
  - Beratung & Services
    - Rechts- & Steuerberatung
    - IT & Technologie
    - Marketing & Design
    - Finanzdienstleistungen

Services Offered (field_services_offered):
  - Beratung & Planung
  - Verkauf & Handel
  - Reparatur & Service
  - Installation & Montage
  - Wartung & Pflege
  - Schulung & Training
  - Notdienst verfügbar

Service Area (field_service_area):
  - Bruchtal
  - Kanton Zürich
  - Grossraum Zürich
  - Deutschschweiz
  - Schweizweit
```

#### Gastgewerbe Categories
```yaml
Establishment Types (field_establishment_type):
  - Restaurant & Gastronomie
    - Restaurant
    - Pizzeria
    - Café & Bistro
    - Imbiss & Take-away
    - Catering Service
  - Beherbergung
    - Hotel
    - Pension & B&B
    - Ferienwohnung
    - Camping & Glamping
  - Unterhaltung
    - Bar & Pub
    - Disco & Club
    - Kulturlokal
    - Eventhalle

Cuisine Types (field_cuisine_type):
  - Schweizer Küche
  - Internationale Küche
    - Italienisch
    - Französisch
    - Asiatisch
    - Mediterran
  - Spezialitäten
    - Vegetarisch & Vegan
    - Glutenfrei
    - Bio & Regional
    - Fisch & Meeresfrüchte

Amenities (field_amenities - for hotels):
  - Wellness & Spa
  - Schwimmbad
  - Fitnesscenter
  - Konferenzräume
  - Restaurant
  - Bar
  - Parkplatz
  - WLAN kostenlos
  - Haustiere erlaubt
```

### Cross-Content-Type Taxonomy

#### Geographic Areas (shared taxonomy)
```yaml
Service Areas:
  - Bruchtal Zentrum
  - Bruchtal Seegebiet
  - Bruchtal Berggebiet
  - Nachbargemeinden
  - Kanton Zürich
```

#### Languages (shared taxonomy)
```yaml
Languages:
  - Deutsch (Muttersprache)
  - Schweizerdeutsch
  - Französisch
  - Italienisch
  - Englisch
  - Andere Sprachen
```

## 🎬 Demo Presentation Strategy

### 35-Minute Presentation Breakdown

#### Segment 1: System Overview & Navigation (10 minutes)
**Content Showcase**:
1. **Homepage Directory Overview** (2 min)
   - Show three directory sections
   - Highlight search functionality
   - Demonstrate responsive design

2. **Verein Directory Browsing** (3 min)
   - Filter by category (Sport, Kultur, Gemeinschaft)
   - Show detailed verein page (Segelclub Bruchtal)
   - Demonstrate membership information display

3. **Cross-Directory Search** (3 min)
   - Search "Segelclub" across all directories
   - Show AI-powered suggestions
   - Demonstrate semantic search results

4. **Mobile Experience** (2 min)
   - Show responsive directory on mobile
   - Touch-friendly filtering interface
   - Contact integration (phone, email, maps)

#### Segment 2: Simple Business Process Forms (7 minutes)
**Municipal Forms Integration**:
1. **Directory Listing Submission Form** (3 min)
   - New business registration form
   - Show workflow integration
   - Demonstrate validation and confirmation

2. **Directory Update Request** (2 min)
   - Business owner updating hours/contact
   - Guest workflow demonstration
   - Show approval notification system

3. **Community Event Posting** (2 min)
   - Verein posting community event
   - Cross-reference with event calendar
   - Show automated notifications

#### Segment 3: Backend for Municipal Employees (15 minutes)

**Directory Management Workflows** (8 min):
1. **Content Moderation Dashboard** (3 min)
   - Show pending directory submissions
   - Different workflows for each content type
   - Batch approval capabilities

2. **Business Verification Process** (3 min)
   - Firma approval workflow
   - Document verification interface
   - Municipal reviewer tools

3. **Quality Control Tools** (2 min)
   - Duplicate detection
   - Content quality scoring
   - Automated compliance checking

**Content Creation & Management** (7 min):
1. **WYSIWYG Content Creation** (3 min)
   - Create new gastgewerbe entry
   - Media integration (logo, gallery)
   - Category assignment

2. **Bulk Operations** (2 min)
   - Seasonal updates (opening hours)
   - Bulk category changes
   - Mass communication tools

3. **AI-Assisted Content** (2 min)
   - Auto-generated descriptions
   - Content suggestions
   - SEO optimization recommendations

### Demo Scenarios & Use Cases

#### Scenario 1: "Tourist Planning Visit"
**User Journey**: Tourist looking for lakeside dining
1. Search "Restaurant am See"
2. Filter gastgewerbe by "Seeblick" and "Terrasse"
3. Compare 3 restaurants (Seeblick, Grüner Drache, Marina)
4. View menus, hours, contact information
5. Make reservation via contact form

**Content Highlight**: Rich media, accurate information, mobile-friendly

#### Scenario 2: "New Resident Seeking Community"
**User Journey**: Family looking for youth activities
1. Browse verein directory
2. Filter by "Jugendliche" age group
3. View Segelclub and Kulturverein options
4. Submit membership inquiry form
5. Receive automated response with next steps

**Content Highlight**: Community engagement, clear membership processes

#### Scenario 3: "Business Owner Self-Service"
**User Journey**: Restaurant owner updating seasonal menu
1. Login as business owner
2. Access own gastgewerbe listing
3. Upload new menu PDF
4. Update seasonal opening hours
5. Submit changes for municipal review

**Content Highlight**: Self-service capabilities, workflow integration

#### Scenario 4: "Municipal Employee Daily Tasks"
**User Journey**: Municipal reviewer processing submissions
1. Review 3 pending directory submissions
2. Verify business documentation
3. Approve 2 listings, request changes for 1
4. Generate monthly directory report
5. Update municipal contact information

**Content Highlight**: Administrative efficiency, quality control

### Success Metrics & KPIs

#### Content Quality Metrics
- **Information Accuracy**: 100% verified contact information
- **Content Completeness**: 95% of entries have all required fields
- **Media Quality**: Professional photos for 90% of listings
- **Update Frequency**: 80% of entries updated within 6 months

#### User Experience Metrics
- **Search Success Rate**: 90% of searches yield relevant results
- **Mobile Usage**: 60% of directory access via mobile devices
- **Form Completion Rate**: 85% of started submissions completed
- **Contact Engagement**: 40% increase in business inquiries

#### Municipal Efficiency Metrics
- **Approval Time**: Average 48 hours for directory submissions
- **Self-Service Rate**: 70% of updates done by business owners
- **Workflow Automation**: 80% of routine tasks automated
- **Content Moderation**: 95% approval rate for compliant submissions

## 🚀 Implementation Roadmap

### Phase 1: Foundation (Week 1)
**Content Type Creation**:
- [ ] Create verein content type with all specified fields
- [ ] Create firma content type with business-specific fields
- [ ] Create gastgewerbe content type with hospitality fields
- [ ] Configure taxonomy vocabularies
- [ ] Set up basic workflows

**Demo Content Creation**:
- [ ] Create 5 verein entries with complete information
- [ ] Create 5 firma entries with professional details
- [ ] Create 5 gastgewerbe entries with rich media
- [ ] Upload professional photos and documents
- [ ] Test all content displays and filters

### Phase 2: Workflows (Week 2)
**Editorial Workflow Configuration**:
- [ ] Configure approval workflows for each content type
- [ ] Set up user roles and permissions
- [ ] Create notification templates
- [ ] Test workflow transitions
- [ ] Document admin procedures

**Quality Assurance**:
- [ ] Test all content forms and validation
- [ ] Verify mobile responsiveness
- [ ] Check accessibility compliance
- [ ] Validate search functionality
- [ ] Performance optimization

### Phase 3: Demo Preparation (Week 3)
**Presentation Readiness**:
- [ ] Create demo scenarios and scripts
- [ ] Prepare backup content and test data
- [ ] Train demo presenters
- [ ] Set up demo environment
- [ ] Conduct rehearsals and timing

**Documentation**:
- [ ] User guides for each content type
- [ ] Municipal admin procedures
- [ ] Content governance policies
- [ ] Training materials for future municipalities

## 📚 Content Governance Policies

### Content Approval Standards

#### Quality Checkpoints
1. **Information Accuracy**: All contact details verified
2. **Content Completeness**: Required fields populated
3. **Image Quality**: Professional standard media
4. **Accessibility**: Alt-text and accessible formatting
5. **Legal Compliance**: Privacy policy adherence

#### Review Timelines
- **Verein submissions**: 48 hours municipal review
- **Firma submissions**: 5 business days (verification required)
- **Gastgewerbe submissions**: 7 business days (multi-department review)
- **Updates/corrections**: 24 hours standard review

### Ongoing Maintenance

#### Regular Review Cycles
- **Annual verification**: All contact information
- **Quarterly updates**: Seasonal businesses (gastgewerbe)
- **Monthly monitoring**: Content quality and accuracy
- **Weekly moderation**: New submissions and changes

#### Content Lifecycle Management
- **Archive inactive entries**: After 12 months no response
- **Seasonal closures**: Gastgewerbe winter/summer schedules
- **Business changes**: Ownership, services, contact updates
- **Community feedback**: Public reporting of incorrect information

---

## 📋 Appendices

### A. Field Configuration Reference
Detailed Drupal field configurations for developers
*[To be completed during technical implementation]*

### B. Demo Content Spreadsheets
Complete demo content in importable formats
*[To be created for content import]*

### C. Workflow Configuration Export
Drupal workflow configurations for replication
*[To be generated after workflow setup]*

### D. Taxonomy Term Imports  
Complete taxonomy structures for import
*[To be created in YAML format]*

---

*This content strategy provides the foundation for implementing the three-content-type directory system in the Bruchtal demo municipality. It ensures authentic, demo-ready content that showcases system capabilities while maintaining professional standards for Swiss municipal requirements.*

**Next Steps**: 
1. Review and approve content strategy
2. Begin technical implementation of content types
3. Create demo content following specifications
4. Test workflows and user experience
5. Prepare presentation scenarios and timing

**Questions for Technical Implementation**:
- Address field configuration for Swiss format
- Office hours module setup for complex schedules  
- Media field configurations for optimal display
- Search API integration with content types
- Multilingual considerations for future expansion