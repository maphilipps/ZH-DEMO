# GPZH Backend Requirements - Implementation Status & Drupal Best Practices
Generated: 2025-01-19

## 🔍 Current Implementation Status

### System Overview
- **Drupal Version**: 11.2.2
- **PHP Version**: 8.3.23
- **Theme**: adesso_cms_theme
- **Admin Theme**: gin

## ✅ Backend Requirements Analysis

### 1. ❌ Verzeichnisse verwalten (Directory Management)
**Status**: NOT IMPLEMENTED

**Current State**:
- No directory content types exist (Vereine, Firmen, Gastgewerbe)
- Existing content types: event, landing_page, news, page, person, project

**Drupal Best Practice**:
```yaml
Implementation Approach:
  1. Create Content Types:
     - Use Drupal Console or Drush generate
     - "drush generate content-entity:bundle"
  
  2. Add Fields:
     - Address: field_address (Address field module)
     - Phone: field_phone (Telephone field)
     - Email: field_email (Email field)
     - Website: field_website (Link field)
     - Opening Hours: field_opening_hours (Office Hours module)
     - Logo/Image: field_logo (Media reference)
     - Categories: field_category (Taxonomy reference)
  
  3. Views for Listings:
     - Create Views with exposed filters
     - Add proximity search for location-based filtering
     - Implement faceted search with Facets module
```

**Required Actions**:
- [ ] Install Address module: `ddev composer require drupal/address`
- [ ] Install Office Hours module: `ddev composer require drupal/office_hours`
- [ ] Create content types via UI or code
- [ ] Configure Views for directory listings
- [ ] Add Search API indexing for directories

---

### 2. ⚠️ Gastaccount mit Workflow/Freigabe (Guest Account with Workflow)
**Status**: PARTIALLY IMPLEMENTED

**Current State**:
- ✅ Workflows module enabled
- ✅ Content Moderation module enabled
- ✅ Basic editorial workflow exists
- ✅ User roles: anonymous, authenticated, content_editor, administrator
- ❌ No specific guest role
- ❌ No guest submission workflow

**Drupal Best Practice**:
```yaml
Implementation Approach:
  1. Create Guest Role:
     - "guest_contributor" role with limited permissions
     - Can create draft content
     - Cannot publish directly
  
  2. Configure Workflow:
     - States: Draft → Review → Published
     - Transitions: 
       * Guest: Draft → Review
       * Editor: Review → Published/Rejected
  
  3. Permissions Setup:
     - Guest: "use basic_editorial transition create_new_draft"
     - Guest: "use basic_editorial transition submit_for_review"
     - Editor: "use basic_editorial transition publish"
```

**Required Actions**:
- [ ] Create guest_contributor role
- [ ] Configure workflow transitions
- [ ] Set up email notifications with Rules module
- [ ] Create submission dashboard view

---

### 3. ✅ Inhaltsseiten mit WYSIWYG (Content Pages with WYSIWYG)
**Status**: IMPLEMENTED

**Current State**:
- ✅ CKEditor 5 configured
- ✅ Basic HTML format configured
- ✅ Image upload enabled
- ✅ Multiple heading levels supported
- ✅ Source editing available

**Drupal Best Practice Enhancements**:
```yaml
Recommended Additions:
  1. Install CKEditor plugins:
     - ddev composer require drupal/ckeditor5_premium_features
     - Enable templates, mentions, collaboration
  
  2. Configure Media Embed:
     - Enable media embed button
     - Configure allowed media types
  
  3. Add AI Integration:
     - ai_ckeditor module already enabled
     - Configure AI content suggestions
```

**Optional Improvements**:
- [ ] Add table support
- [ ] Configure paste from Word
- [ ] Add spell checker
- [ ] Enable collaborative editing

---

### 4. ✅ Medien (Media Integration)
**Status**: IMPLEMENTED

**Current State**:
- ✅ Media module enabled
- ✅ Media Library enabled
- ✅ Media types: document, image, image_with_link, remote_video, svg_image, video
- ✅ Supports PDFs (document type)
- ✅ Multiple image types

**Drupal Best Practice Enhancements**:
```yaml
Recommended Additions:
  1. Install Media improvements:
     - ddev composer require drupal/media_entity_download
     - ddev composer require drupal/focal_point
     - ddev composer require drupal/image_effects
  
  2. Configure bulk operations:
     - Install VBO module for bulk actions
     - Add bulk metadata editing
  
  3. Automatic optimization:
     - Configure image styles
     - Enable responsive images
     - Add WebP generation
```

**Optional Improvements**:
- [ ] Add drag-and-drop upload
- [ ] Configure media categories/tags
- [ ] Add usage tracking
- [ ] Enable duplicate detection

---

### 5. ❌ Ansprechende Inhaltsgestaltung (Attractive Content Design)
**Status**: NOT FULLY IMPLEMENTED

**Current State**:
- ✅ Paragraphs module likely available
- ✅ Field Group module enabled
- ❌ No visual page builder visible
- ❌ Limited design components

**Drupal Best Practice**:
```yaml
Implementation Approach:
  1. Paragraphs-based System:
     - Create paragraph types for components
     - Hero, Cards, Accordion, Tabs, Gallery
     - Use Layout Paragraphs for visual editing
  
  2. Layout Builder Alternative:
     - Enable Layout Builder module
     - Create custom layouts
     - Add block types for components
  
  3. SDC Components:
     - Create Single Directory Components
     - Integrate with theme system
     - Use Storybook for documentation
```

**Required Actions**:
- [ ] Install Layout Paragraphs: `ddev composer require drupal/layout_paragraphs`
- [ ] Create component paragraph types
- [ ] Configure drag-and-drop interface
- [ ] Add preview functionality

---

### 6. ⚠️ Semantische Suche mit KI-Hilfe (AI-Powered Search)
**Status**: PARTIALLY IMPLEMENTED

**Current State**:
- ✅ Search API enabled
- ✅ Search API Autocomplete enabled
- ✅ AI modules enabled (OpenAI GPT-4o configured)
- ✅ AI content suggestions enabled
- ❌ No vector search/embeddings visible
- ❌ No semantic search configuration

**Drupal Best Practice**:
```yaml
Implementation Approach:
  1. Vector Search Setup:
     - Install Search API AI module
     - Configure embeddings generation
     - Use OpenAI text-embedding-3-small
  
  2. Semantic Search:
     - Create vector index with Search API
     - Implement similarity search
     - Add AI-powered query expansion
  
  3. Search Enhancement:
     - Configure faceted search
     - Add "Did you mean?" suggestions
     - Implement search analytics
```

**Required Actions**:
- [ ] Install vector search module: `ddev composer require drupal/search_api_ai`
- [ ] Configure embeddings generation
- [ ] Create vector search index
- [ ] Implement semantic query processing
- [ ] Add multilingual support (DE/FR/IT)

---

## 📊 Implementation Priority & Effort Estimation

### High Priority (Demo Critical)
1. **Directory Content Types** (8-12 hours)
   - Create 3 content types
   - Configure fields and displays
   - Create Views for listings
   - JIRA: GPZH-101, GPZH-102, GPZH-103

2. **Guest Workflow** (4-6 hours)
   - Configure roles and permissions
   - Set up workflow states
   - Create submission forms
   - JIRA: GPZH-105, GPZH-106, GPZH-107

3. **AI Search Enhancement** (6-8 hours)
   - Configure vector search
   - Implement semantic search
   - Test with sample content
   - JIRA: GPZH-114

### Medium Priority
4. **Content Design Components** (6-8 hours)
   - Create paragraph types
   - Configure Layout Paragraphs
   - Build component library
   - JIRA: GPZH-112, GPZH-113

### Already Implemented (Needs Minor Enhancement)
5. **WYSIWYG Editor** (1-2 hours)
   - Add table support
   - Configure media embed
   - JIRA: GPZH-108 (optional)

6. **Media Management** (1-2 hours)
   - Add bulk operations
   - Configure optimization
   - JIRA: GPZH-110 (optional)

## 🚀 Quick Implementation Commands

### Create Directory Content Types
```bash
# Install required modules
ddev composer require drupal/address drupal/office_hours drupal/facets
ddev drush en address office_hours facets -y

# Generate content type (example for Vereine)
ddev drush generate content-entity:bundle
# Follow prompts: node, vereine, "Vereine", "Association directory entry"

# Create fields via Drush
ddev drush field:create node vereine
# Add: field_address, field_phone, field_email, field_website, field_category
```

### Configure Guest Workflow
```bash
# Create guest role
ddev drush role:create guest_contributor "Guest Contributor"

# Set permissions
ddev drush role:perm:add guest_contributor "create page content"
ddev drush role:perm:add guest_contributor "edit own page content"
ddev drush role:perm:add guest_contributor "use basic_editorial transition create_new_draft"

# Configure workflow via UI or config import
```

### Enable AI Search
```bash
# Install AI search modules (if available)
ddev composer require drupal/search_api_ai
ddev drush en search_api_ai -y

# Configure via UI at /admin/config/search/search-api
# Create new index with vector processor
```

## 📝 Drupal Best Practices Summary

### Content Architecture
- Use **Content Types** for structured data (directories)
- Use **Paragraphs** for flexible page layouts
- Use **Taxonomy** for categorization
- Use **Views** for listings and filters

### Workflow & Permissions
- Use **Content Moderation** for editorial workflows
- Use **Workbench** modules for advanced workflows
- Configure **email notifications** with Rules or similar
- Implement **revision tracking** for audit trails

### Search & AI
- Use **Search API** as foundation
- Implement **faceted search** for filtering
- Add **vector search** for semantic queries
- Cache **embeddings** for performance

### Media & Assets
- Use **Media Library** for centralized management
- Configure **image styles** for optimization
- Implement **responsive images**
- Add **focal point** for smart cropping

### Performance
- Enable **BigPipe** for progressive rendering
- Configure **Dynamic Page Cache**
- Use **Redis** for caching (already in DDEV)
- Implement **lazy loading** for images

## ✅ Next Steps

1. **Immediate Actions**:
   - Create directory content types (GPZH-101, 102, 103)
   - Configure guest workflow (GPZH-105, 106, 107)
   - Test with demo content

2. **Before Demo**:
   - Implement AI search if time permits (GPZH-114)
   - Create sample directory entries
   - Test complete workflow

3. **Documentation**:
   - Update Jira tickets with implementation details
   - Document configuration for other municipalities
   - Create user guides for editors

---
*This analysis shows that while core infrastructure is in place (WYSIWYG, Media, Workflows), the specific demo requirements need implementation, particularly directory management and guest workflows.*