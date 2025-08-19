# GPZH Gemeinden Content Guidelines

## 🏛️ Municipality-Specific Content Management for GPZH System

This guide covers content creation and management guidelines for the three demonstration municipalities in the GPZH (Gemeindeportale Zürich) project: **Thalwil**, **Thalheim**, and **Erlenbach**.

## 📍 Municipality Profiles

### **Gemeinde Thalwil**
- **Location**: Zürichsee, modern lakeside community
- **Character**: Progressive, family-oriented, excellent public transport
- **Color Scheme**: Modern blue (#1E3A8A)
- **Content Focus**: Smart city initiatives, environmental protection, cultural events
- **Demographics**: Young families, professionals commuting to Zurich
- **Special Features**: S-Bahn connection, lake access, modern infrastructure

### **Gemeinde Thalheim**
- **Location**: Weinland Zürich, rural wine-growing region  
- **Character**: Traditional, agricultural, close-knit community
- **Color Scheme**: Wine green (#15803D)
- **Content Focus**: Agriculture, wine culture, traditional events, rural tourism
- **Demographics**: Local families, farmers, retirees
- **Special Features**: Vineyards, hiking trails, traditional festivals

### **Gemeinde Erlenbach**
- **Location**: Zürichsee Goldküste, prestigious lakeside location
- **Character**: Upscale, culturally active, high quality of life
- **Color Scheme**: Lake turquoise (#0891B2)  
- **Content Focus**: Cultural events, exclusive services, lakeside activities
- **Demographics**: High-income residents, cultural enthusiasts, boat owners
- **Special Features**: Marina, cultural center, premium shopping

## 🎯 Jira Integration for Content Management

### **Content Creation Workflow**
```
Jira Content Ticket → Municipality Research → AI-Assisted Content → Review → Publication
```

### **Jira Task Types for Content**
- **GPZH-XXX**: New content type or page creation
- **GPZH-XXX**: Municipality-specific content updates
- **GPZH-XXX**: Multi-language content translation
- **GPZH-XXX**: AI-generated content review and refinement
- **GPZH-XXX**: Accessibility and compliance content updates

### **Branch Naming for Content Changes**
```bash
content/GPZH-123-thalwil-news-update
content/GPZH-456-multi-lang-navigation
content/GPZH-789-erlenbach-events-calendar
```

## 🔧 Multi-Site Configuration Insights (GPZH-30)

### **Separate Configuration Management**
```yaml
Configuration Isolation:
  Thalwil:
    - Config Directory: config/sync_thalwil/
    - Database Prefix: thalwil_
    - Domain: thalwil.zh-demo.ddev.site
    - Theme Variant: modern-urban
    
  Thalheim:
    - Config Directory: config/sync_thalheim/
    - Database Prefix: thalheim_
    - Domain: thalheim.zh-demo.ddev.site
    - Theme Variant: rural-wine
    
  Erlenbach:
    - Config Directory: config/sync_erlenbach/
    - Database Prefix: erlenbach_
    - Domain: erlenbach.zh-demo.ddev.site
    - Theme Variant: lakeside-premium
```

### **Content Isolation Strategies**
```bash
# Municipality-specific content operations
ddev drush --uri=thalwil.zh-demo.ddev.site cr    # Thalwil cache clear
ddev drush --uri=thalheim.zh-demo.ddev.site cex  # Thalheim config export
ddev drush --uri=erlenbach.zh-demo.ddev.site uli # Erlenbach admin login

# Content testing across all municipalities
@playwright-test-content --all-municipalities --content-type=news
@browser-audit-content --accessibility --all-municipalities
```

### **MCP Integration for Content Management**
```yaml
Content MCP Workflows:
  Memory MCP:
    - Store municipality-specific content patterns
    - Recall successful content templates
    - Track performance metrics per municipality
    
  Context7 MCP:
    - Access Drupal multi-site documentation
    - Swiss municipal content best practices
    - Government communication standards
    
  Sequential Thinking MCP:
    - Orchestrate complex content workflows
    - Coordinate multi-municipality updates
    - Automate content review processes
```

## 📝 Content Types and Structure

### **Standard Content Types for All Municipalities**

#### **1. News and Announcements**
```yaml
News Content Structure:
  Title: Municipality-specific headline
  Summary: Brief description (AI-assisted)
  Body: Detailed content with municipality context
  Featured Image: Local photography with AI alt-text
  Publication Date: Automatic timestamp
  Categories: 
    - "Gemeinderat" (Municipal Council)
    - "Veranstaltungen" (Events)
    - "Infrastruktur" (Infrastructure)
    - "Kultur" (Culture)
  Municipality Tag: [Thalwil|Thalheim|Erlenbach]
```

#### **2. Events Calendar**
```yaml
Event Content Structure:
  Event Title: Clear, descriptive name
  Date/Time: Swiss date format (DD.MM.YYYY)
  Location: Venue with address and municipality
  Description: AI-enhanced event details
  Registration: Online form integration
  Categories:
    - "Kultur" (Cultural)
    - "Sport" (Sports)
    - "Verwaltung" (Administrative)
    - "Familie" (Family)
  Accessibility Info: Barrier-free access details
```

#### **3. Municipal Services**
```yaml
Service Content Structure:
  Service Name: Official designation
  Description: Clear, citizen-friendly explanation
  Requirements: Documents and prerequisites
  Process: Step-by-step guide
  Fees: Current fee structure
  Contact: Responsible department
  Online Forms: Digital service integration
  AI Features: Auto-completion, smart suggestions
```

#### **4. Municipal Council & Administration**
```yaml
Council Content Structure:
  Person Profile: Council member or employee
  Role/Title: Official position
  Responsibilities: Areas of competence
  Contact Information: Phone, email, office hours
  Biography: Professional background (AI-enhanced)
  Photo: Professional headshot with AI alt-text
```

## 🤖 AI-Enhanced Content Creation

### **Municipality-Specific AI Prompts**

#### **Thalwil AI Content Prompts**
```yaml
Thalwil_AI_Context:
  Location: "Gemeinde Thalwil am Zürichsee"
  Character: "modern, familienfreundlich, gut erschlossen"
  Tone: "professionell, zukunftsorientiert, bürgernah"
  Keywords: 
    - "S-Bahn Anschluss"
    - "Zürichsee"
    - "Nachhaltigkeit"
    - "Smart City"
    - "Familie"
    
Example_Prompt: "Erstelle eine Pressemitteilung für die moderne Seegemeinde Thalwil über eine neue nachhaltige Infrastruktur-Initiative. Der Ton soll professionell und zukunftsorientiert sein."
```

#### **Thalheim AI Content Prompts**
```yaml
Thalheim_AI_Context:
  Location: "Gemeinde Thalheim im Zürcher Weinland"
  Character: "traditionell, ländlich, weinbaulich geprägt"
  Tone: "herzlich, bodenständig, traditionsbewusst"
  Keywords:
    - "Weinbau"
    - "Landwirtschaft" 
    - "Tradition"
    - "Dorfgemeinschaft"
    - "Natur"

Example_Prompt: "Verfasse einen Artikel für die Weinbaugemeinde Thalheim über das traditionelle Winzerfest. Der Ton soll herzlich und traditionsbewusst sein."
```

#### **Erlenbach AI Content Prompts**
```yaml
Erlenbach_AI_Context:
  Location: "Gemeinde Erlenbach an der Zürcher Goldküste"
  Character: "exklusiv, kulturell aktiv, hohe Lebensqualität"
  Tone: "elegant, informativ, qualitätsbewusst"
  Keywords:
    - "Goldküste"
    - "Kultur"
    - "Marina"
    - "Exklusivität"
    - "Zürichsee"

Example_Prompt: "Schreibe eine Ankündigung für die Goldküsten-Gemeinde Erlenbach über eine neue Kulturveranstaltung im Gemeindezentrum. Der Ton soll elegant und qualitätsbewusst sein."
```

### **AI Content Generation Commands**
```bash
# Municipality-specific content generation
@ai-content-generate "Pressemitteilung Gemeinderat" --municipality=thalwil
@ai-content-translate de-fr "Event description" --municipality=erlenbach  
@ai-alt-text-generate "council_photo.jpg" --municipality=thalheim
@ai-form-suggestions "Baubewilligung" --municipality=all

# MCP-enhanced content commands
@sequential-content-workflow GPZH-XXX "
1. @memory-recall 'municipality-context' --municipality=thalwil
2. @ai-content-generate 'news-article' --context-aware
3. @playwright-test-content --accessibility --municipality=thalwil
4. @browser-audit-performance --content-impact --municipality=thalwil
5. @memory-store 'content-performance' --track-engagement
"

# Content quality validation with MCP
@gpzh-content-validate GPZH-XXX --municipality=erlenbach
# This runs: AI content review, accessibility check, performance impact, 
#           Swiss compliance validation, municipality brand consistency
```

## 🌍 Multi-Language Content Strategy

### **Language Hierarchy for GPZH**
```yaml
Primary_Language: German (Schweizerdeutsch influence)
Secondary_Languages:
  - French (official Swiss French)
  - Italian (official Swiss Italian)
  
Translation_Priority:
  1. Essential municipal services → All languages
  2. News and events → German + French  
  3. Cultural content → German primary
  4. Emergency information → All languages
```

### **Translation Workflow**
```bash
# AI-assisted translation workflow
@ai-translate de-fr "German content" --municipality=thalwil --official-tone
@ai-translate de-it "German content" --municipality=erlenbach --formal-tone
@multi-lang-sync GPZH-XXX  # Sync translations across all municipalities
```

## 📊 Content Performance and Analytics

### **Municipality-Specific KPIs**
```yaml
Thalwil_Content_KPIs:
  - Digital service adoption rate
  - Event registration conversions
  - Environmental content engagement
  - Mobile usage (high commuter population)

Thalheim_Content_KPIs:
  - Tourism inquiry conversion
  - Agricultural service usage
  - Community event participation
  - Traditional media integration

Erlenbach_Content_KPIs:
  - Cultural event premium bookings
  - Service quality satisfaction
  - Exclusive content engagement
  - Accessibility compliance metrics
```

### **AI-Powered Content Optimization**
```bash
# Content performance analysis
@ai-content-analyze GPZH-XXX --municipality=all --performance-metrics
@ai-content-suggestions --low-performing-pages --municipality=thalwil
@ai-accessibility-check --content-type=news --municipality=erlenbach
```

## 🎨 Visual Content Guidelines

### **Photography Standards**
```yaml
Image_Requirements:
  Resolution: Minimum 1920x1080 for hero images
  Format: WebP with JPEG fallback
  Alt_Text: AI-generated, municipality-context aware
  Copyright: Clear attribution and usage rights
  
Municipality_Photo_Themes:
  Thalwil: Modern architecture, lake views, families, S-Bahn
  Thalheim: Vineyards, rural landscapes, traditional buildings  
  Erlenbach: Marina, cultural venues, upscale architecture
```

### **Brand Consistency**
```yaml
Thalwil_Visual_Identity:
  Primary_Color: "#1E3A8A" (Modern Blue)
  Fonts: "Inter" for headings, "Source Sans Pro" for body
  Logo_Usage: Modern, clean integration
  Image_Style: Contemporary, professional, family-focused

Thalheim_Visual_Identity:
  Primary_Color: "#15803D" (Wine Green)  
  Fonts: "Crimson Text" for headings, "Lora" for body
  Logo_Usage: Traditional, community-focused
  Image_Style: Natural, authentic, traditional

Erlenbach_Visual_Identity:
  Primary_Color: "#0891B2" (Lake Turquoise)
  Fonts: "Playfair Display" for headings, "Source Serif Pro" for body
  Logo_Usage: Elegant, sophisticated
  Image_Style: Premium, cultural, sophisticated
```

## 🔄 Content Review and Publication Workflow

### **Content Review Process**
```markdown
1. **Content Creation**: AI-assisted drafting with municipality context
2. **Fact Checking**: Municipal employee review for accuracy
3. **Language Review**: Swiss German appropriateness check
4. **Accessibility Review**: WCAG 2.1 AA compliance verification
5. **Legal Review**: DSGVO/CH-DSG compliance check
6. **Final Approval**: Department head sign-off
7. **Publication**: Multi-site deployment with performance monitoring
```

### **PR Template for Content Changes**
```markdown
## Jira Ticket: GPZH-XXX - Content Update for [Municipality]
🔗 [Jira Link](https://adesso.atlassian.net/browse/GPZH-XXX)

## Content Changes
- **Municipality**: [Thalwil|Thalheim|Erlenbach]
- **Content Type**: [News|Event|Service|Page]
- **Language**: [DE|FR|IT|Multi-language]
- **AI Features Used**: [Content generation|Translation|Alt-text|None]

## Municipal Context
- **Character Alignment**: Content matches municipality personality
- **Visual Identity**: Consistent with brand guidelines
- **Local Relevance**: Addresses specific community needs

## Quality Assurance
- [ ] Swiss German appropriateness verified
- [ ] Municipality-specific context accurate
- [ ] Visual elements follow brand guidelines
- [ ] AI-generated content reviewed and refined
- [ ] Accessibility compliance verified
- [ ] Multi-language consistency checked (if applicable)

## Review Request
@claude bitte prüfe den Content für Gemeinde [Municipality] aus Ticket GPZH-XXX auf Konsistenz, Qualität und Gemeinde-spezifische Angemessenheit.
```

## 🇨🇭 Swiss Municipal Content Compliance

### **eCH-0059 Content Requirements**
```yaml
Swiss Municipal Standards:
  Content Accessibility:
    - Plain language for government services
    - Multi-language support (DE/FR/IT as required)
    - Clear service process descriptions
    - Accessible document formats (PDF/A compliance)
    
  Information Architecture:
    - Consistent navigation across all municipality sites
    - Service categorization following federal standards
    - Contact information transparency
    - Emergency information prominence
    
  Digital Service Delivery:
    - Online form accessibility (beyond WCAG 2.1 AA)
    - Mobile-first government service design
    - Clear error messages and help text
    - Progress indicators for multi-step processes
```

### **GDPR/CH-DSG Municipal Compliance**
```yaml
Municipal Data Protection:
  Content Publishing:
    - Personal data anonymization in news/events
    - Consent for photo publication
    - Data retention policies for form submissions
    - Privacy notice integration
    
  User-Generated Content:
    - Comment moderation procedures
    - User consent for public contributions
    - Right to deletion for public comments
    - Cross-border data transfer restrictions
    
  Analytics and Tracking:
    - Cookie consent for analytics
    - User behavior tracking limitations
    - Data export capabilities for citizens
    - Third-party service data agreements
```

### **Municipal Communication Standards**
```yaml
Swiss Administrative Communication:
  Official Language Requirements:
    - Swiss Standard German for formal communications
    - Regional language considerations (Zürich dialect sensitivity)
    - Technical term explanations
    - Citizen-friendly language guidelines
    
  Legal Compliance:
    - Official publication requirements
    - Public consultation notice standards
    - Legal document accessibility
    - Appeal procedure transparency
    
  Quality Assurance:
    - Fact-checking procedures for municipal information
    - Regular content audits for accuracy
    - Stakeholder review processes
    - Community feedback integration
```

### **Content Compliance Testing**
```bash
# Swiss compliance validation for municipal content
@browser-audit-accessibility --ech-0059 --municipality=all --content-focus
@gpzh-compliance-content GPZH-XXX --swiss-standards --language-requirements
@privacy-audit-content --gdpr --ch-dsg --municipality-specific

# Multi-language compliance verification
@language-compliance-test --languages="de,fr,it" --municipality=all
@cultural-sensitivity-check --municipality-context --all-sites
```

## 📚 Resources and References

### **Municipality Information Sources**
- **Official Websites**: Current municipal websites for reference
- **Statistical Data**: Federal Statistical Office (BFS) demographics
- **Cultural Calendar**: Local event and festival schedules
- **Government Contacts**: Municipal department directories
- **Local Media**: Regional newspaper archives and current coverage

### **Content Creation Tools**
- **AI Content Assistant**: GPT-4o, Claude, Groq integration
- **Translation Services**: Professional Swiss language services
- **Image Libraries**: Municipal photo archives and stock photography
- **Accessibility Tools**: Screen reader testing and WCAG validators

---

*Last updated: Optimized for GPZH multi-municipality content strategy with AI enhancement and Swiss compliance standards.*