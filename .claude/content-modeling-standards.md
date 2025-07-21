# Content Modeling Standards for adesso CMS

*Based on Lullabot architecture principles and Drupal 11 best practices*

## Core Principles

### 1. Structured Content First
- **Avoid "Blob HTML"**: Never rely solely on WYSIWYG fields for complex content
- **Component-Based Design**: Build content through reusable, composable components
- **Entity Relationships**: Use proper entity references for content connections
- **Semantic Structure**: Each piece of content has clear purpose and structure

### 2. Entity Hierarchy Strategy

```markdown
## adesso CMS Entity Architecture

### Primary Content (Nodes)
- **drupal_cms_page**: Landing pages and marketing content
- **article**: Editorial content and blog posts  
- **event**: Event listings and details
- **person**: Team member profiles
- **card**: Reusable content cards

### Structured Components (Paragraphs)
- **accordion**: Collapsible content sections
- **hero**: Header sections with call-to-action
- **carousel**: Image/content carousels
- **card_group**: Collections of related cards
- **pricing**: Pricing tables and plans
- **gallery**: Image galleries
- **stats**: Statistical data displays

### Media Assets
- **image**: Optimized images with responsive variants
- **video**: Embedded and uploaded video content
- **document**: Downloadable files and documents

### Reusable Elements (Block Content)
- **social_media**: Social media links and profiles
- **newsletter**: Newsletter signup forms
- **logo_collection**: Partner/client logos

### Taxonomy Organization
- **categories**: Primary content categorization
- **tags**: Flexible content tagging
- **event_types**: Event categorization
- **service_areas**: Service and expertise areas
```

## Content Relationship Patterns

### 1. One-to-Many Relationships

**Use Case**: Article → Categories, Person → Services
```yaml
field_categories:
  type: entity_reference
  target: taxonomy_term
  cardinality: unlimited
  required: false
  widget: checkboxes
  settings:
    auto_create: false
```

**Content Model Example**:
```markdown
Article Content Type:
├── field_categories (taxonomy_term reference, multiple)
├── field_author (person reference, single)  
├── field_related_services (service reference, multiple)
└── field_content_components (paragraph reference, unlimited)
```

### 2. Many-to-Many Relationships

**Use Case**: Articles ↔ Services, Events ↔ Speakers
```yaml
field_related_articles:
  type: entity_reference
  target: node
  target_bundles: ['article']
  cardinality: unlimited
  widget: entity_browser
  settings:
    target_bundles:
      article: article
```

**Bidirectional Setup**:
- Use Entity Usage module to track relationships
- Implement hook_entity_update() for relationship synchronization
- Display related content via Views with relationship filters

### 3. Hierarchical Relationships

**Use Case**: Service Areas → Specific Services → Case Studies
```yaml
# Service taxonomy with hierarchy
vocabulary_services:
  hierarchy: enabled
  depth: 3 # Service Area → Service Type → Specific Service

# Content references following hierarchy
field_service_area:
  type: entity_reference
  target: taxonomy_term
  widget: select
  
field_related_case_studies:
  type: entity_reference
  target: node
  target_bundles: ['case_study']
  widget: inline_entity_form
```

## Field Design Patterns

### 1. Reusable Field Groups

**Common Fields Pattern**:
```markdown
## Standard Content Fields (Applied to all content types)

field_meta_title:
  type: string
  description: "SEO-optimized page title"
  
field_meta_description:
  type: string_long
  description: "Meta description for search engines"
  
field_featured_image:
  type: entity_reference (media)
  description: "Primary image for social sharing"
  
field_visibility:
  type: list_string
  options: [public, members_only, staff_only]
  default: public
```

**Component Fields Pattern**:
```markdown
## Component Configuration Fields

field_theme:
  type: list_string
  options: [light, dark]
  default: light
  
field_background_color:
  type: list_string  
  options: [white, gray, primary, secondary]
  default: white
  
field_modifier_classes:
  type: string
  description: "Additional CSS classes"
```

### 2. Media Reference Patterns

**Image Fields**:
```yaml
field_hero_image:
  type: entity_reference
  target: media
  target_bundles: ['image']
  cardinality: 1
  widget: media_library
  settings:
    media_library_mode: widget
    allowed_bundles:
      image: image
```

**Gallery Fields**:
```yaml
field_gallery_images:
  type: entity_reference
  target: media
  target_bundles: ['image']
  cardinality: unlimited
  widget: media_library
  settings:
    media_library_mode: widget
    allowed_bundles:
      image: image
```

### 3. Component Reference Patterns

**Flexible Page Components**:
```yaml
field_page_components:
  type: entity_reference_revisions
  target: paragraph
  cardinality: unlimited
  widget: paragraphs
  settings:
    title: Component
    title_plural: Components
    edit_mode: closed
    add_mode: dropdown
    default_paragraph_type: text
```

## Content Type Design Methodology

### 1. Content Type Planning Checklist

**Before Creating New Content Types**:
- [ ] Is this content unique enough to warrant its own type?
- [ ] Can this be achieved with Paragraphs or existing types?
- [ ] What fields will be reused across multiple types?
- [ ] How will this content relate to existing content?
- [ ] What Views or listings will display this content?
- [ ] What are the editorial workflows for this content?

### 2. Content Type Naming Conventions

```markdown
## Naming Standards

Content Types: snake_case
- drupal_cms_page (not "Page")
- case_study (not "Case Study")
- team_member (not "Person" or "TeamMember")

Paragraph Types: snake_case  
- hero_section (not "Hero")
- pricing_table (not "Pricing")
- image_gallery (not "Gallery")

Fields: field_[context]_[name]
- field_hero_title (not field_title)
- field_card_description (not field_description)
- field_contact_email (not field_email)
```

### 3. Field Configuration Standards

**Required Field Settings**:
```yaml
# Every field must specify
label: "Human-readable label"
description: "Clear explanation for editors"
required: true/false
cardinality: 1 or unlimited
widget: specific_widget_type
settings:
  # Widget-specific settings
```

**Field Help Text Guidelines**:
```markdown
Good: "Enter a brief description (2-3 sentences) that summarizes this service for search engines and social media."

Bad: "Description field"

Good: "Select up to 5 related articles that provide additional context or background information."

Bad: "Related content"
```

## Entity Reference Best Practices

### 1. Widget Selection Criteria

```markdown
## Reference Field Widget Decision Matrix

| Content Complexity | Relationship Type | Recommended Widget | Use Case |
|-------------------|------------------|-------------------|----------|
| Simple | One-to-Many | autocomplete | Category selection |
| Simple | Many-to-Many | checkboxes | Tag selection |
| Medium | One-to-Many | select_list | Service area selection |
| Medium | Many-to-Many | entity_browser | Related content |
| Complex | One-to-Many | inline_entity_form | Embedded content creation |
| Complex | Many-to-Many | entity_browser + IEF | Complex component management |
```

### 2. Performance Considerations

**Entity Loading Optimization**:
```php
// ❌ Avoid loading full entities for simple data
$node = Node::load($nid);
$title = $node->getTitle();

// ✅ Use entity queries for simple data
$query = \Drupal::entityQuery('node')
  ->condition('nid', $nid)
  ->range(0, 1);
$result = $query->execute();
```

**Reference Field Caching**:
```yaml
# Enable reference field caching
field_related_content:
  type: entity_reference
  settings:
    # Cache referenced entity data
    cache_max_age: 3600
    cache_contexts:
      - 'languages:language_content'
    cache_tags:
      - 'node_list'
```

### 3. Content Relationship Validation

**Entity Reference Constraints**:
```php
// Custom validation for content relationships
public function validate() {
  $referenced_entities = $this->field_related_content->referencedEntities();
  
  // Prevent circular references
  foreach ($referenced_entities as $entity) {
    if ($entity->id() === $this->id()) {
      return ['error' => 'Cannot reference self'];
    }
  }
  
  // Validate relationship limits
  if (count($referenced_entities) > 5) {
    return ['error' => 'Maximum 5 related items allowed'];
  }
}
```

## Content Editorial Experience

### 1. Form Display Optimization

**Group Related Fields**:
```yaml
# Use field groups for better UX
content_group:
  label: "Main Content"
  children:
    - field_title
    - field_summary
    - field_body
    - field_page_components

metadata_group:
  label: "SEO & Metadata"  
  children:
    - field_meta_title
    - field_meta_description
    - field_featured_image

relationships_group:
  label: "Related Content"
  children:
    - field_categories
    - field_tags
    - field_related_articles
```

### 2. Content Workflow Patterns

**Editorial States**:
```markdown
## Content Moderation Workflow

States:
- draft: Initial content creation
- review: Ready for editorial review
- published: Live content
- archived: No longer active but preserved

Transitions:
- draft → review (editors)
- review → published (approvers)  
- review → draft (reject)
- published → archived (administrators)
- archived → draft (restore)
```

## Testing and Validation

### 1. Content Model Testing

**Automated Tests**:
```php
/**
 * Test content type field configuration
 */
public function testContentTypeFields() {
  $content_type = NodeType::load('article');
  $this->assertNotNull($content_type);
  
  // Test required fields exist
  $required_fields = [
    'field_categories',
    'field_author', 
    'field_featured_image'
  ];
  
  foreach ($required_fields as $field_name) {
    $field = FieldConfig::loadByName('node', 'article', $field_name);
    $this->assertNotNull($field, "Field {$field_name} exists");
    $this->assertTrue($field->isRequired(), "Field {$field_name} is required");
  }
}
```

### 2. Content Relationship Validation

**Entity Reference Testing**:
```php
/**
 * Test entity reference constraints
 */
public function testEntityReferences() {
  // Create test content
  $article = Node::create([
    'type' => 'article',
    'title' => 'Test Article',
    'field_categories' => [1, 2, 3], // Valid category IDs
  ]);
  
  $violations = $article->validate();
  $this->assertEquals(0, count($violations));
  
  // Test invalid reference
  $article->set('field_categories', [999]); // Invalid ID
  $violations = $article->validate();
  $this->assertGreaterThan(0, count($violations));
}
```

## Migration and Content Strategy

### 1. Content Migration Patterns

**Entity Reference Migration**:
```yaml
# Migrate content with relationships
id: content_with_references
source:
  plugin: csv
  path: content.csv
  
process:
  title: title
  body: body
  field_categories:
    plugin: migration_lookup
    migration: taxonomy_categories
    source: category_ids
    
destination:
  plugin: entity:node
  default_bundle: article
```

### 2. Content Governance

**Content Review Process**:
```markdown
## Quarterly Content Review

### Performance Metrics
- [ ] Page views and engagement metrics
- [ ] Search performance for content
- [ ] User feedback and content ratings
- [ ] Content freshness and accuracy

### Relationship Audit  
- [ ] Broken or outdated content references
- [ ] Orphaned content without relationships
- [ ] Over-complex relationship structures
- [ ] Performance impact of complex relationships

### Content Structure Review
- [ ] Field usage patterns and effectiveness
- [ ] Component reusability metrics
- [ ] Editorial workflow efficiency
- [ ] Content type effectiveness
```

This content modeling standard ensures structured, performant, and maintainable content architecture for adesso CMS while following Lullabot's proven patterns for entity relationships and content organization.