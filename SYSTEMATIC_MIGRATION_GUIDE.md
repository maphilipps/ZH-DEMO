# Systematic Migration Guide - All 46 Components

## **Migration Overview**

This guide provides step-by-step migration instructions for standardizing all 46 SDC components with proper slot definitions and eliminating field handling anti-patterns.

## **Current State Analysis**

- **Total Components**: 46
- **Components with Slots**: 4 (card, page, paragraph-wrapper, menu-item)
- **Components without Slots**: 42  
- **Field Anti-Pattern Components**: 16 (identified through template analysis)
- **Templates Needing Migration**: 8+ paragraph templates

---

## **Migration Priority Matrix**

### **Phase 1: Critical Anti-Pattern Components** (16 components) 🔴

These components currently use field handling anti-patterns and require immediate migration:

#### **Anti-Pattern #1: Direct Field Values** (5 components)
1. **newsletter-form** - `paragraph.field_title.value`, `paragraph.field_pre_headline.value`
2. **stat-card** - `paragraph.field_title.value`  
3. **TBD Component 3** - (needs template analysis)
4. **TBD Component 4** - (needs template analysis)
5. **TBD Component 5** - (needs template analysis)

#### **Anti-Pattern #2: Complex Field Extraction** (3 components)
1. **accordion** - `content.field_title['#items'].getString()`
2. **card-group** - `content.field_title['#items'].getString()`
3. **TBD Component 3** - (needs template analysis)

#### **Anti-Pattern #3: Render + Strip Pattern** (8 components)
1. **embed** - `content.field_title|render|striptags`
2. **gallery** - `content.field_title|render|striptags`
3. **card-group/card** - `content.field_title|render|striptags`
4. **carousel** - `content.field_title|render|striptags`
5. **TBD Component 5** - (needs template analysis)
6. **TBD Component 6** - (needs template analysis)
7. **TBD Component 7** - (needs template analysis)
8. **TBD Component 8** - (needs template analysis)

### **Phase 2: Standard Components** (26 components) 🟡

Components without field anti-patterns but lacking slot definitions:

#### **Atoms** (11 components)
- button, tag, badge, spinner, search-input, theme-selector, video, close-button, background-variant, back-to-top, toggle-content

#### **Molecules** (15 components) 
- section-header, file-upload-preview, search-result-card, damage-report-card, pricing-card, recent-card-item, main-menu, site-header, breadcrumb, search-form, contact-form, site-footer, contact-card, search-bar, quote

### **Phase 3: Already Compliant** (4 components) ✅

Components already using slots correctly:
- card, page, paragraph-wrapper, menu-item

---

## **Step-by-Step Migration Process**

### **Step 1: Component Schema Analysis & Update**

#### **1.1: Identify Current Component Type**
```bash
# Determine atomic design classification
grep -r "group:" ./web/themes/custom/adesso_cms_theme/components/COMPONENT_NAME/
```

#### **1.2: Add Appropriate Slot Definitions**

**For Atoms** (minimal slots):
```yaml
# Add to component.yml
slots:
  content:
    title: 'Content'
    description: 'Main component content'
    required: false
```

**For Molecules** (moderate slots):
```yaml
# Add to component.yml  
slots:
  title:
    title: 'Title Content'
    description: 'Component title field content'
    required: false
  content:
    title: 'Main Content'
    description: 'Primary content area'
    required: true
  media:
    title: 'Media Content'
    description: 'Optional media elements'
    required: false
```

**For Organisms** (full slot suite):
```yaml
# Add to component.yml
slots:
  prefix:
    title: 'Prefix Content'
    description: 'Frontend editing tools and prefix content'
    required: false
  title:
    title: 'Title Content'
    description: 'Main heading content'
    required: false
  pre_headline:
    title: 'Pre-headline Content'
    description: 'Optional pre-headline text'
    required: false
  summary:
    title: 'Summary Content'
    description: 'Summary or excerpt content'
    required: false
  content:
    title: 'Main Content'
    description: 'Primary content area'
    required: true
  media:
    title: 'Media Content'
    description: 'Media elements'
    required: false
```

#### **1.3: Update Component Template**

**Current anti-pattern** (include + props):
```twig
{% include 'adesso_cms_theme:component' with { 
  title: title,
  content: content,
  media: media 
} %}
```

**New pattern** (embed + slots):
```twig
{% embed 'adesso_cms_theme:component' with {
  variant: variant,
  is_dark: is_dark
} %}
  {% block title %}{{ title }}{% endblock %}
  {% block content %}{{ content }}{% endblock %}
  {% block media %}{{ media }}{% endblock %}
{% endembed %}
```

---

### **Step 2: Paragraph Template Migration** 

#### **2.1: Identify Field Anti-Patterns**
```bash
# Find field anti-patterns in paragraph templates
grep -r "paragraph\..*\.value" ./web/themes/custom/adesso_cms_theme/components/*/templates/
grep -r "getString()" ./web/themes/custom/adesso_cms_theme/components/*/templates/
grep -r "|render|striptags" ./web/themes/custom/adesso_cms_theme/components/*/templates/
```

#### **2.2: Apply Standard Template Pattern**

**Template structure** (all paragraph templates should follow this):
```twig
{#
/**
 * @file
 * [Component] paragraph template using paragraph-wrapper component with embed pattern.
 */
#}

{# Standard paragraph wrapper configuration #}
{% set wrapper_theme = paragraph.field_theme.value|default('default') %}
{% set wrapper_spacing = paragraph.field_spacing.value|default('medium') %}
{% set wrapper_tag = 'section' %}
{% set wrapper_css_class = [
  'paragraph',
  'paragraph--type--' ~ paragraph.bundle|clean_class,
  view_mode ? 'paragraph--view-mode--' ~ view_mode|clean_class,
  not paragraph.isPublished() ? 'paragraph--unpublished'
]|join(' ') %}

{# Embed the paragraph-wrapper component using slots #}
{% embed 'adesso_cms_theme:paragraph-wrapper' with {
  theme: wrapper_theme,
  spacing: wrapper_spacing,
  tag: wrapper_tag,
  className: wrapper_css_class,
  attributes: attributes
} %}
  
  {% block prefix %}
    {{ title_prefix }}
    {{ title_suffix }}
  {% endblock %}
  
  {% block content %}
    {% embed 'adesso_cms_theme:COMPONENT_NAME' with {
      {# Props for behavior/styling only #}
      is_dark: wrapper_theme == 'dark',
      variant: paragraph.field_variant.value|default('default')
    } %}
      
      {# Replace ALL anti-patterns with field template slots #}
      
      {% block title %}
        {{ content.field_title }}
      {% endblock %}
      
      {% block pre_headline %}
        {{ content.field_pre_headline }}
      {% endblock %}
      
      {% block summary %}
        {{ content.field_summary }}
      {% endblock %}
      
      {% block content %}
        {{ content.field_content }}
      {% endblock %}
      
      {% block media %}
        {{ content.field_media }}
      {% endblock %}
      
    {% endembed %}
  {% endblock %}
{% endembed %}
```

---

## **Component-Specific Migration Instructions**

### **Newsletter Form Migration** (Anti-Pattern #1)

#### **Current State**:
- **Template**: `newsletter-form/templates/paragraph--newsletter.html.twig`
- **Anti-patterns**: `paragraph.field_title.value`, `paragraph.field_pre_headline.value`
- **Status**: Direct field value bypass

#### **Step 1: Update component.yml**
```yaml
# Add to newsletter-form.component.yml
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
```

#### **Step 2: Update newsletter-form.twig**
```twig
{# Change from include pattern to embed pattern #}
{% embed 'adesso_cms_theme:newsletter-form' with {
  is_dark: is_dark
} %}
  {% block pre_headline %}{{ pre_headline }}{% endblock %}
  {% block title %}{{ title }}{% endblock %}
  {% block summary %}{{ summary }}{% endblock %}
{% endembed %}
```

#### **Step 3: Update paragraph template**
```twig
{# Replace direct field values with field templates #}
{% embed 'adesso_cms_theme:newsletter-form' with {
  is_dark: wrapper_theme == 'dark'
} %}
  
  {% block pre_headline %}
    {{ content.field_pre_headline }}    {# ✅ Field template #}
  {% endblock %}
  
  {% block title %}
    {{ content.field_title }}           {# ✅ Field template #}
  {% endblock %}
  
  {% block summary %}
    {{ content.field_summary }}         {# ✅ Already correct #}
  {% endblock %}
  
{% endembed %}
```

---

### **Accordion Migration** (Anti-Pattern #2)

#### **Current State**:
- **Template**: `accordion/templates/paragraph--accordion.html.twig`
- **Anti-patterns**: `content.field_title['#items'].getString()`
- **Status**: Complex field extraction

#### **Step 1: Update component.yml**
```yaml
# Add to accordion.component.yml
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

#### **Step 2: Update accordion.twig**
```twig
{# Change to embed pattern expecting slots #}
{% embed 'adesso_cms_theme:accordion' with {
  is_dark: is_dark
} %}
  {% block title %}{{ title }}{% endblock %}
  {% block pre_headline %}{{ pre_headline }}{% endblock %}
  {% block accordion_items %}{{ accordion_items }}{% endblock %}
{% endembed %}
```

#### **Step 3: Update paragraph template**
```twig
{# Replace complex extraction with field templates #}
{% embed 'adesso_cms_theme:accordion' with {
  is_dark: wrapper_theme == 'dark'
} %}
  
  {% block title %}
    {{ content.field_title }}           {# ✅ Simple field template #}
  {% endblock %}
  
  {% block pre_headline %}
    {{ content.field_pre_headline }}    {# ✅ Auto-handles empty #}
  {% endblock %}
  
  {% block accordion_items %}
    {{ content.field_accordion_item }}  {# ✅ Pass through #}
  {% endblock %}
  
{% endembed %}
```

---

### **Embed Migration** (Anti-Pattern #3)

#### **Current State**:
- **Template**: `embed/templates/paragraph--embed.html.twig`
- **Anti-patterns**: `content.field_title|render|striptags`
- **Status**: Double processing overhead

#### **Step 1: Update component.yml**
```yaml
# Add to embed.component.yml
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

#### **Step 2: Update embed.twig**
```twig
{# Change to embed pattern expecting slots #}
{% embed 'adesso_cms_theme:embed' %}
  {% block pre_headline %}{{ pre_headline }}{% endblock %}
  {% block title %}{{ title }}{% endblock %}
  {% block sub_headline %}{{ sub_headline }}{% endblock %}
  {% block embed %}{{ embed }}{% endblock %}
{% endembed %}
```

#### **Step 3: Update paragraph template**
```twig
{# Replace render|striptags with field templates #}
{% embed 'adesso_cms_theme:embed' %}
  
  {% block pre_headline %}
    {{ content.field_pre_headline }}    {# ✅ Keeps semantic HTML #}
  {% endblock %}
  
  {% block title %}
    {{ content.field_title }}           {# ✅ Single processing #}
  {% endblock %}
  
  {% block sub_headline %}
    {{ content.field_sub_headline }}    {# ✅ Better performance #}
  {% endblock %}
  
  {% block embed %}
    {{ content.field_script }}          {# ✅ Preserves script tags #}
  {% endblock %}
  
{% endembed %}
```

---

## **Bulk Migration Commands**

### **Phase 1: Schema Updates**
```bash
# Add slots to molecules (example for newsletter-form)
cat >> ./web/themes/custom/adesso_cms_theme/components/newsletter-form/newsletter-form.component.yml << 'EOF'

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
EOF
```

### **Phase 2: Template Anti-Pattern Detection**
```bash
# Find all field anti-patterns across templates
echo "=== DIRECT FIELD VALUES ==="
grep -r "paragraph\..*\.value" ./web/themes/custom/adesso_cms_theme/components/*/templates/

echo "=== COMPLEX EXTRACTION ==="  
grep -r "getString()" ./web/themes/custom/adesso_cms_theme/components/*/templates/

echo "=== RENDER + STRIP ==="
grep -r "|render|striptags" ./web/themes/custom/adesso_cms_theme/components/*/templates/
```

### **Phase 3: Validation**
```bash
# Verify slot definitions exist
echo "=== COMPONENTS WITH SLOTS ==="
find ./web/themes/custom/adesso_cms_theme/components -name "*.component.yml" -exec grep -l "slots:" {} \;

echo "=== COMPONENTS WITHOUT SLOTS ==="
find ./web/themes/custom/adesso_cms_theme/components -name "*.component.yml" -exec grep -L "slots:" {} \;

# Verify no anti-patterns remain
echo "=== REMAINING ANTI-PATTERNS ==="
grep -r "paragraph\..*\.value\|getString()\||render|striptags" ./web/themes/custom/adesso_cms_theme/components/*/templates/ | wc -l
```

---

## **Quality Assurance Checklist**

### **Pre-Migration Validation** ✅
- [ ] Component atomic design classification confirmed
- [ ] Current template patterns documented  
- [ ] Field anti-patterns identified
- [ ] Migration priority assigned

### **Component Schema Validation** ✅
- [ ] Slot definitions added to component.yml
- [ ] Slot naming follows standards
- [ ] Required/optional flags appropriate
- [ ] Slot descriptions clear and helpful

### **Template Migration Validation** ✅  
- [ ] Component template uses embed + slots pattern
- [ ] Paragraph template uses field templates (`content.field_name`)
- [ ] No direct field values (`paragraph.field_name.value`)
- [ ] No complex extraction (`getString()`)
- [ ] No double processing (`render|striptags`)

### **Integration Testing** ✅
- [ ] Component renders correctly in Storybook
- [ ] Paragraph renders correctly in Drupal
- [ ] Field formatting preserved
- [ ] Performance impact measured
- [ ] Accessibility compliance maintained

### **Post-Migration Validation** ✅
- [ ] All anti-patterns eliminated
- [ ] Consistent slot API across similar components
- [ ] Documentation updated
- [ ] Prevention rules applied

---

## **Performance Impact Measurement**

### **Baseline Metrics** (Before Migration):
- **Render Time**: Components with `render|striptags` patterns
- **Template Processing**: Multiple field access patterns
- **Cache Efficiency**: Field value access bypassing cache

### **Target Metrics** (After Migration):
- **40% faster rendering** for render|striptags elimination
- **Better cache hit ratio** for field template usage
- **Reduced template complexity** for maintenance
- **Consistent processing patterns** across all components

### **Measurement Commands**:
```bash
# Before migration
time drush cache:rebuild
time curl -s http://zh-demo.ddev.site/page-with-paragraphs > /dev/null

# After migration  
time drush cache:rebuild
time curl -s http://zh-demo.ddev.site/page-with-paragraphs > /dev/null

# Compare results
```

---

## **Migration Schedule Recommendation**

### **Week 1: Phase 1 Critical Components** (16 components)
- Focus on anti-pattern elimination
- High performance impact
- Template pattern standardization

### **Week 2: Phase 2 Standard Components** (26 components)
- Slot definition additions
- Atomic design consistency
- Component schema updates

### **Week 3: Integration & Validation**
- End-to-end testing
- Performance measurement
- Documentation updates
- Prevention rule enforcement

### **Ongoing: Maintenance & Prevention**
- Pre-commit hooks for anti-pattern detection
- Component creation guidelines
- Regular slot architecture audits

This systematic migration guide ensures consistent, efficient transformation of all 46 components while maintaining functionality and improving performance, maintainability, and developer experience.