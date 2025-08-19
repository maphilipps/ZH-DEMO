# GPZH Backend Requirements - Jira Ticket Mapping
Generated: 2025-01-19

## Backend Demonstration Requirements (15 Minutes)
According to "GPZH Agenda Anbieterpräsentation Präqualifikation.pdf"

### ✅ Required Backend Features & Jira Ticket Status

#### 1. Verzeichnisse verwalten (Directory Management)
**Requirement**: Manage directories for Vereine (Associations), Firmen (Companies), Gastgewerbe (Hospitality)

**Jira Tickets Needed**:
- [ ] **GPZH-101**: Create Vereine (Associations) Directory Content Type
  - Create content type for associations
  - Add required fields (Name, Description, Contact, Address, Website, Logo)
  - Implement filtering and search functionality
  - Add backend management interface

- [ ] **GPZH-102**: Create Firmen (Companies) Directory Content Type
  - Create content type for companies
  - Add required fields (Company name, Industry, Services, Contact, Location)
  - Implement categorization and filtering
  - Add backend management interface

- [ ] **GPZH-103**: Create Gastgewerbe (Hospitality/Restaurants) Directory Content Type
  - Create content type for restaurants/hotels
  - Add required fields (Name, Type, Opening hours, Menu, Specialties, Booking)
  - Implement location-based search
  - Add backend management interface

- [ ] **GPZH-104**: Unified Directory Management Backend
  - Create unified management interface for all directories
  - Implement bulk operations
  - Add import/export functionality
  - Create permission structure for directory managers

#### 2. Gastaccount mit Workflow/Freigabe (Guest Account with Workflow/Approval)
**Requirement**: Guest user accounts with content submission and approval workflows

**Jira Tickets Needed**:
- [ ] **GPZH-105**: Guest Account Registration System
  - Implement guest user registration
  - Create guest user role with limited permissions
  - Add email verification
  - Implement Swiss data protection compliance

- [ ] **GPZH-106**: Content Submission Workflow for Guests
  - Create content submission forms for guest users
  - Implement draft/review/publish workflow states
  - Add submission tracking dashboard
  - Create notification system for submissions

- [ ] **GPZH-107**: Approval Workflow System
  - Implement multi-stage approval workflow
  - Create approval dashboard for administrators
  - Add revision tracking and comments
  - Implement email notifications for workflow changes

#### 3. Inhaltsseiten mit WYSIWYG (Content Pages with WYSIWYG Editor)
**Requirement**: WYSIWYG editor for content page creation

**Jira Tickets Needed**:
- [ ] **GPZH-108**: Configure CKEditor 5 for Content Creation
  - Configure CKEditor 5 with Swiss-appropriate features
  - Add custom styles and formatting options
  - Implement media embedding capabilities
  - Add accessibility checking tools

- [ ] **GPZH-109**: Content Page Templates
  - Create standard page templates
  - Implement paragraph-based layouts
  - Add component insertion capabilities
  - Create responsive preview functionality

#### 4. Medien (Media Integration)
**Requirement**: Support for Images, PDFs, Flyers

**Jira Tickets Needed**:
- [ ] **GPZH-110**: Media Library Enhancement
  - Configure media types for images, PDFs, flyers
  - Implement categorization and tagging
  - Add metadata management
  - Create thumbnail generation for PDFs

- [ ] **GPZH-111**: Media Upload and Management Interface
  - Create bulk upload functionality
  - Implement drag-and-drop interface
  - Add image optimization on upload
  - Create media usage tracking

#### 5. Ansprechende Inhaltsgestaltung (Attractive Content Design)
**Requirement**: Tools for creating visually appealing content

**Jira Tickets Needed**:
- [ ] **GPZH-112**: Content Design Components
  - Create attractive layout components
  - Implement hero sections, cards, galleries
  - Add animation and transition options
  - Create color scheme management

- [ ] **GPZH-113**: Content Builder Interface
  - Implement visual page builder
  - Add component library access
  - Create live preview functionality
  - Implement responsive design tools

#### 6. Semantische Suche mit KI-Hilfe (Semantic Search with AI Support)
**Requirement**: AI-powered semantic search functionality

**Jira Tickets Needed**:
- [ ] **GPZH-114**: AI-Powered Search Implementation
  - Integrate OpenAI GPT-4o for semantic search
  - Implement vector embeddings for content
  - Create intelligent search suggestions
  - Add multilingual search support (DE/FR/IT)

- [ ] **GPZH-115**: Search Results Enhancement
  - Implement faceted search with AI categorization
  - Add relevance scoring
  - Create search analytics dashboard
  - Implement search result personalization

### 📊 Summary of Required Jira Tickets

**Total New Tickets Needed**: 15

**By Category**:
- Directory Management: 4 tickets (GPZH-101 to GPZH-104)
- Guest Account & Workflow: 3 tickets (GPZH-105 to GPZH-107)
- WYSIWYG Editor: 2 tickets (GPZH-108 to GPZH-109)
- Media Management: 2 tickets (GPZH-110 to GPZH-111)
- Content Design: 2 tickets (GPZH-112 to GPZH-113)
- AI Search: 2 tickets (GPZH-114 to GPZH-115)

### 🎯 Priority Order for Demo Preparation

**Critical for Demo (Must Have)**:
1. GPZH-101, 102, 103: Directory content types (core backend feature)
2. GPZH-105, 106, 107: Guest account workflow (key differentiator)
3. GPZH-114: AI-powered search (innovation showcase)

**Important for Demo (Should Have)**:
4. GPZH-108: WYSIWYG editor configuration
5. GPZH-110: Media library setup
6. GPZH-112: Content design components

**Nice to Have for Demo**:
7. GPZH-104: Unified directory management
8. GPZH-109: Content page templates
9. GPZH-111: Advanced media management
10. GPZH-113: Visual page builder
11. GPZH-115: Search results enhancement

### 📝 Notes

- All tickets should include Swiss compliance requirements (CH-DSG, eCH standards)
- Each ticket needs acceptance criteria aligned with demo requirements
- Consider multi-language support (DE/FR/IT) where applicable
- Ensure accessibility compliance (WCAG 2.1 AA, eCH-0059)
- Include performance targets (Core Web Vitals >90)

### 🚀 Next Steps

1. Create these tickets in Jira with proper descriptions and acceptance criteria
2. Assign tickets to appropriate team members/agents
3. Prioritize based on demo timeline
4. Create subtasks for complex features
5. Link related tickets for dependencies

---
*This document should be reviewed and tickets created in Jira to ensure all backend demonstration requirements are properly tracked and implemented.*