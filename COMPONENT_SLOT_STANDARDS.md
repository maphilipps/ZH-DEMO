# Component.yml Slot Standards

## **Slot Definition Standards by Atomic Design Level**

Based on analysis of all 46 SDC components, here are the standardized slot definitions organized by Atomic Design principles:

---

## **Atoms (11 components) - Minimal Slots**

Atoms should have minimal slot complexity, focusing on their single responsibility.

### **Standard Atom Slots**:
```yaml
slots:
  content:
    title: 'Content'
    description: 'Main content for this atomic component'
    required: false
```

### **Button Component Example**:
```yaml
# button.component.yml
slots:
  content:
    title: 'Button Content'  
    description: 'Button text or HTML content'
    required: false
```

### **Tag Component Example**:
```yaml
# tag.component.yml  
slots:
  content:
    title: 'Tag Content'
    description: 'Tag text content'
    required: false
```

### **Badge Component Example**:
```yaml
# badge.component.yml
slots:
  content:
    title: 'Badge Content'
    description: 'Badge text or HTML content' 
    required: false
```

---

## **Molecules (15 components) - Moderate Slots**

Molecules combine atoms and need structured content slots for composition.

### **Standard Molecule Slots**:
```yaml
slots:
  title:
    title: 'Title Content'
    description: 'Main heading or title field content'
    required: false
  content:
    title: 'Main Content'
    description: 'Primary content area'
    required: true
  media:
    title: 'Media Content'
    description: 'Optional media elements (images, videos, icons)'
    required: false
```

### **Card Component Example** (Already implemented):
```yaml
# card.component.yml - REFERENCE IMPLEMENTATION
slots:
  content:
    title: 'Card Content'
    description: 'Additional content slot for complex custom content'
```

### **Newsletter Form Component Example**:
```yaml  
# newsletter-form.component.yml - NEEDS UPDATE
slots:
  pre_headline:
    title: 'Pre-headline Content'
    description: 'Optional pre-headline text field content'
    required: false
  title:
    title: 'Title Content'
    description: 'Main newsletter form title'
    required: false
  summary:
    title: 'Summary Content'
    description: 'Newsletter form description text'
    required: false
  content:
    title: 'Form Content'
    description: 'Newsletter signup form fields'
    required: true
```

### **Section Header Component Example**:
```yaml
# section-header.component.yml - NEEDS UPDATE
slots:
  pre_headline:
    title: 'Pre-headline Content'
    description: 'Small text above main title'
    required: false
  title:
    title: 'Title Content'  
    description: 'Main section heading'
    required: false
  subtitle:
    title: 'Subtitle Content'
    description: 'Secondary heading text'
    required: false
```

---

## **Organisms (14 components) - Full Slot Suite**

Organisms are complex components that need comprehensive slot structures.

### **Standard Organism Slots**:
```yaml
slots:
  prefix:
    title: 'Prefix Content'
    description: 'Frontend editing tools and prefix content' 
    required: false
  title:
    title: 'Title Content'
    description: 'Main heading or title field content'
    required: false
  pre_headline:
    title: 'Pre-headline Content'
    description: 'Optional pre-headline text field content'
    required: false
  summary:
    title: 'Summary Content'
    description: 'Summary or excerpt field content'
    required: false
  content:
    title: 'Main Content'
    description: 'Primary content area'
    required: true
  media:
    title: 'Media Content'
    description: 'Media elements (images, videos, galleries)'
    required: false
```

### **Accordion Component Example**:
```yaml
# accordion.component.yml - NEEDS UPDATE
slots:
  title:
    title: 'Title Content'
    description: 'Main accordion section title'
    required: false
  pre_headline:
    title: 'Pre-headline Content'
    description: 'Optional pre-headline text'
    required: false
  accordion_items:
    title: 'Accordion Items'
    description: 'Collection of accordion items'
    required: true
```

### **Gallery Component Example**:
```yaml
# gallery.component.yml - NEEDS UPDATE
slots:
  pre_headline:
    title: 'Pre-headline Content'
    description: 'Optional pre-headline text'
    required: false
  title:
    title: 'Title Content'
    description: 'Gallery section title'
    required: false
  media:
    title: 'Gallery Media'
    description: 'Collection of gallery images/media'
    required: true
  content:
    title: 'Gallery Description'
    description: 'Optional gallery description text'
    required: false
```

### **Embed Component Example**:
```yaml
# embed.component.yml - NEEDS UPDATE
slots:
  pre_headline:
    title: 'Pre-headline Content'
    description: 'Optional pre-headline text'
    required: false
  title:
    title: 'Title Content'
    description: 'Main embed section title'
    required: false
  sub_headline:
    title: 'Sub-headline Content'
    description: 'Optional sub-headline text'
    required: false
  embed:
    title: 'Embed Content'
    description: 'Script or embed code content'
    required: true
```

---

## **Templates (4 components) - Layout Slots**

Templates organize page-level structure and need layout-specific slots.

### **Standard Template Slots**:
```yaml
slots:
  header:
    title: 'Header Content'
    description: 'Page header content area'
    required: false
  main:
    title: 'Main Content'
    description: 'Primary page content area'
    required: true
  sidebar:
    title: 'Sidebar Content'
    description: 'Optional sidebar content area'
    required: false
  footer:
    title: 'Footer Content'
    description: 'Page footer content area'
    required: false
```

### **Page Component Example** (Already implemented):
```yaml
# page.component.yml - REFERENCE IMPLEMENTATION
slots:
  header:
    title: 'Header'
    description: 'Page header content'
    required: false
  breadcrumb:
    title: 'Breadcrumb'
    description: 'Breadcrumb navigation'
    required: false
  title:
    title: 'Title'
    description: 'Page title content'
    required: false
  tabs:
    title: 'Tabs'
    description: 'Page tabs navigation'
    required: false
  help:
    title: 'Help'
    description: 'Help content'
    required: false
  content:
    title: 'Content'
    description: 'Main page content'
    required: true
```

### **Paragraph Wrapper Component Example** (Already implemented):
```yaml
# paragraph-wrapper.component.yml - REFERENCE IMPLEMENTATION
slots:
  content:
    title: 'Content'
    required: true
    description: 'The main paragraph content to be wrapped'
  prefix:
    title: 'Prefix'
    required: false
    description: 'Frontend editing tools and prefix content'
```

---

## **Specialized Component Patterns**

### **Navigation Components** (Menu, Menu Item)
```yaml
# main-menu.component.yml - NEEDS UPDATE
slots:
  menu_items:
    title: 'Menu Items'
    description: 'Collection of menu item components'
    required: true

# menu-item.component.yml - REFERENCE IMPLEMENTATION (already has slots)
slots:
  content:
    title: 'Menu Content'
    description: 'Menu item content (text, icon, etc.)'
    required: false
```

### **Form Components** (File Upload, Newsletter)
```yaml
# file-upload-preview.component.yml - NEEDS UPDATE
slots:
  content:
    title: 'File Content'
    description: 'File preview and metadata content'
    required: true
  actions:
    title: 'File Actions'
    description: 'File action buttons (remove, download, etc.)'
    required: false
```

### **Media Components** (Video, Image)
```yaml  
# video.component.yml - NEEDS UPDATE
slots:
  title:
    title: 'Video Title'
    description: 'Video title or caption'
    required: false
  content:
    title: 'Video Content'
    description: 'Video embed or player content'
    required: true
  description:
    title: 'Video Description'
    description: 'Video description text'
    required: false
```

---

## **Slot Naming Conventions**

### **Standard Slot Names** (Use these consistently):
- `title` - Main heading content
- `pre_headline` - Text above main title  
- `subtitle` - Secondary heading
- `summary` - Brief description/excerpt
- `content` - Main content area
- `media` - Images, videos, icons
- `prefix` - Drupal editing tools
- `actions` - Buttons, links, CTAs

### **Component-Specific Slot Names** (When needed):
- `accordion_items` - For accordion components
- `menu_items` - For navigation components  
- `embed` - For embed/script components
- `gallery_items` - For gallery components
- `features` - For pricing/feature components

### **Layout Slot Names** (Templates only):
- `header` - Page header area
- `main` - Primary page content
- `sidebar` - Secondary content area
- `footer` - Page footer area
- `breadcrumb` - Navigation breadcrumb
- `tabs` - Tab navigation

---

## **Slot Property Standards**

### **Required Properties**:
```yaml
slots:
  slot_name:
    title: 'Human Readable Title'        # REQUIRED: Display name
    description: 'Clear explanation'      # REQUIRED: Purpose and usage  
    required: true|false                  # REQUIRED: Is slot mandatory?
```

### **Title Guidelines**:
- Use title case: "Main Content", "Pre-headline Content"
- Be descriptive but concise
- Include "Content" for content slots: "Title Content", "Media Content"

### **Description Guidelines**:
- Explain the slot's purpose clearly
- Mention field types when relevant: "field_title", "field_media" 
- Include examples when helpful
- Keep under 80 characters when possible

### **Required Flag Guidelines**:
- `required: true` - Component cannot function without this content
- `required: false` - Component works fine with empty slot
- Most content slots should be `required: false` for flexibility

---

## **Migration Priority by Component**

### **Phase 1: High-Impact Organisms** (8 components using render|striptags)
1. **embed** - Add: pre_headline, title, sub_headline, embed slots
2. **gallery** - Add: pre_headline, title, media, content slots
3. **card-group** - Add: title, content, card_items slots
4. **carousel** - Add: title, content, carousel_items slots

### **Phase 2: Direct Value Molecules** (5 components using .value)
1. **newsletter-form** - Add: pre_headline, title, summary, content slots
2. **stat-card** - Add: title, content, media slots  
3. **section-header** - Add: pre_headline, title, subtitle slots

### **Phase 3: Complex Extraction Components** (3 components using getString())
1. **accordion** - Add: title, pre_headline, accordion_items slots

### **Phase 4: Remaining Components** (30 components without slots)
- Add appropriate slots based on atomic design level
- Follow standard patterns established above

---

## **Component Schema Template**

Use this template for adding slots to existing components:

```yaml
$schema: https://git.drupalcode.org/project/drupal/-/raw/11.x/core/modules/sdc/src/metadata.schema.json
name: Component Name
description: Component description
group: [atoms|molecules|organisms|templates]
status: stable

props:
  # Existing props stay here - DO NOT REMOVE
  # Props are for behavior/styling configuration
  # Slots are for content

slots:
  # Add slots based on atomic design level
  # Follow naming conventions above
  # Include title, description, required for each slot
  title:
    title: 'Title Content'
    description: 'Component title field content'
    required: false
  content:
    title: 'Main Content'
    description: 'Primary component content'
    required: true

# Keep existing replaces, libraryOverrides, etc.
```

This standardization ensures consistent slot APIs across all 46 components while respecting atomic design principles and maintaining backward compatibility during migration.