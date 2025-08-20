# DrupalCMS AI Search Planning Document
**Date**: 2025-08-20  
**Lane**: Planning  
**Status**: ready-for-dev  
**Demo Segment Duration**: 2-3 minutes

## Executive Summary
Implementation plan for DrupalCMS AI-powered search functionality in the GPZH demo system, showcasing semantic search capabilities for municipal services using OpenAI GPT-4o integration.

## 1. Technical Architecture (via @drupal-solution-architect)

### Module Requirements
```yaml
Core Modules:
  - search_api: Core search framework
  - search_api_db: Database backend for indexing
  - ai: AI integration framework (already installed)

DrupalCMS Modules:
  - drupalcms_search: Enhanced search experience
  - drupalcms_ai_search: AI-powered search features
  
Additional:
  - openai: GPT-4o integration (existing)
  - better_exposed_filters: Search refinement UI
```

### Architecture Design
```yaml
Search Pipeline:
  1. User Query Input:
     - Natural language processing
     - Swiss-German synonym handling
     - Query expansion with AI
  
  2. AI Enhancement Layer:
     - GPT-4o semantic analysis
     - Intent recognition
     - Context understanding
  
  3. Search Execution:
     - Fuzzy matching
     - Weighted relevance
     - Entity type prioritization
  
  4. Result Presentation:
     - AI-generated summaries
     - Related content suggestions
     - Smart facets
```

### Integration Points
- **Content Types**: Vereine, Firmen, Gastgewerbe, News, Events
- **Taxonomies**: Services, Topics, Departments
- **Media**: PDFs, Documents searchable via AI extraction

## 2. AI/GPT Integration Specifications (via @drupal-ai-integration-specialist)

### OpenAI Configuration
```yaml
API Settings:
  model: gpt-4o
  temperature: 0.3  # Low for consistent results
  max_tokens: 150   # For summaries
  
Search Features:
  - Query Understanding:
    prompt: "Interpret this Swiss-German search query and expand with synonyms"
  
  - Result Summarization:
    prompt: "Summarize this municipal content in 2 sentences"
  
  - Related Suggestions:
    prompt: "Suggest 3 related municipal services for this query"
```

### AI Enhancement Features
1. **Semantic Search**
   - Understand "Parkplatz" → parking, permits, zones
   - Map "Abfall" → waste, recycling, disposal dates
   
2. **Intent Recognition**
   - "Ich möchte heiraten" → Marriage registration process
   - "Hundesteuer bezahlen" → Dog tax payment forms
   
3. **Context Awareness**
   - User location (Bruchtal)
   - Time sensitivity (office hours, deadlines)
   - User role (citizen, business, visitor)

## 3. DrupalCMS Features (via @drupal-cms-specialist)

### Out-of-Box Capabilities
```yaml
DrupalCMS Search Features:
  - Instant search with live results
  - Search-as-you-type functionality
  - Faceted search with filters
  - Search API integration ready
  - Mobile-optimized search interface
  
AI Enhancements:
  - Natural language processing
  - Typo tolerance
  - Synonym recognition
  - Content recommendation engine
```

### Configuration Requirements
```php
// Search index configuration
$config['search_api.index.ai_enhanced'] = [
  'name' => 'AI Enhanced Search',
  'datasource_settings' => [
    'entity:node' => [
      'bundles' => [
        'selected' => ['article', 'page', 'event', 'verein', 'firma', 'gastgewerbe'],
      ],
    ],
  ],
  'processor_settings' => [
    'ai_enhancement' => [
      'plugin_id' => 'ai_enhancement',
      'settings' => [
        'provider' => 'openai',
        'model' => 'gpt-4o',
      ],
    ],
  ],
];
```

## 4. Demo Scenarios (via @drupal-technical-pm)

### Scenario 1: Natural Language Query (30 seconds)
**User Search**: "Wo kann ich meinen Hund anmelden?"
**AI Understanding**: Dog registration → Pet services → Forms
**Results Show**:
- Dog registration form (top result)
- Dog tax information
- Pet regulations
- Veterinary services nearby

### Scenario 2: Typo Tolerance & Swiss-German (30 seconds)
**User Search**: "Abfallkalender Bruchtal" (with typo: "Abfalkalender")
**AI Correction**: Recognizes typo, understands Swiss context
**Results Show**:
- Waste collection calendar 2025
- Recycling stations map
- Special waste disposal dates
- Download PDF option

### Scenario 3: Service Discovery (45 seconds)
**User Search**: "Ich ziehe nach Bruchtal"
**AI Intent**: Moving to municipality → Multiple services needed
**Results Show**:
- Registration office (Einwohnerkontrolle)
- Moving checklist
- Parking permits
- School registration
- Waste management info
**AI Suggests**: "Related services: Utility connections, Local clubs, Public transport"

### Scenario 4: Business Search (45 seconds)
**User Search**: "Restaurant am See"
**AI Context**: Location-based, business directory
**Results Show**:
- Seerestaurant Bruchtal (with AI summary)
- Opening hours highlighted
- Contact info and map
- Related: "Other lakeside dining options"

## 5. Implementation Steps for Building Lane

### Phase 1: Module Installation (30 min)
```bash
# Enable required modules
ddev drush en search_api search_api_db drupalcms_search -y
ddev drush en ai openai -y

# Configure AI provider
ddev drush config:set ai.provider.openai api_key "$OPENAI_API_KEY"
```

### Phase 2: Search Index Creation (45 min)
1. Create AI-enhanced search index
2. Configure fields for indexing:
   - Title (boost: 5.0)
   - Body (boost: 1.0)
   - Tags/Categories (boost: 3.0)
   - Location fields (boost: 2.0)
3. Enable AI processors:
   - Query expansion
   - Synonym detection
   - Result summarization

### Phase 3: UI Configuration (45 min)
1. Place search block in header
2. Configure instant search JavaScript
3. Style with Tailwind CSS v4
4. Add search suggestions dropdown
5. Implement mobile search overlay

### Phase 4: AI Integration (60 min)
1. Create AI search plugin
2. Implement query preprocessing
3. Add result postprocessing
4. Configure Swiss-German language handling
5. Test with demo queries

### Phase 5: Demo Content Preparation (30 min)
1. Index existing content
2. Add search-optimized descriptions
3. Create demo search queries list
4. Prepare fallback results
5. Test all demo scenarios

## 6. Testing Criteria for Reviewing Lane

### Functional Testing
- [ ] Search returns relevant results for all demo queries
- [ ] AI suggestions appear within 2 seconds
- [ ] Typo correction works for common mistakes
- [ ] Swiss-German terms are recognized
- [ ] Mobile search interface responsive

### Performance Testing
- [ ] Search results load < 1 second
- [ ] Autocomplete responds < 200ms
- [ ] AI enhancement adds < 500ms latency
- [ ] Page remains interactive during search

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader announces results
- [ ] Focus management correct
- [ ] WCAG 2.1 AA compliant

### Swiss Compliance
- [ ] No personal data in search logs
- [ ] CH-DSG compliant data handling
- [ ] Swiss-German language support
- [ ] Local context prioritization

## 7. Risk Mitigation

### Potential Issues & Solutions
```yaml
API Rate Limits:
  Risk: OpenAI API throttling during demo
  Mitigation: Cache common queries, prepare offline fallback

Language Complexity:
  Risk: Swiss-German variations not recognized
  Mitigation: Pre-configure synonym dictionary

Performance:
  Risk: Slow AI processing during live demo
  Mitigation: Pre-warm cache, reduce AI complexity for demo

Content Gaps:
  Risk: Not enough content for impressive results
  Mitigation: Create rich demo content set
```

## 8. Success Metrics

### Demo Success Criteria
- Wow factor: AI understands natural language
- Speed: Instant results with AI enhancement
- Relevance: Top results are always correct
- Swiss focus: Handles local language and context
- Accessibility: Works for all users

### Technical Metrics
- Search API index: 100% of content indexed
- AI enhancement: <500ms additional latency
- Relevance score: >90% for demo queries
- Mobile performance: Core Web Vitals >90

## 9. Demo Script (2-3 minutes)

### Introduction (15 seconds)
"Our AI-powered search understands what citizens really mean, not just what they type."

### Demonstration (2 minutes)
1. **Natural Language** (30s): "Where can I register my dog?"
2. **Typo Tolerance** (30s): "Abfalkalender" → Waste calendar
3. **Service Discovery** (30s): "Moving to Bruchtal" → Complete service list
4. **Smart Suggestions** (30s): Related services and next steps

### Conclusion (15 seconds)
"AI search reduces support calls by helping citizens find answers instantly in their own language."

## 10. Handoff to Building Lane

### Immediate Actions
1. Install and configure search_api modules
2. Create AI-enhanced search index
3. Implement Swiss-German synonym handling
4. Build search UI with instant results
5. Integrate GPT-4o for query enhancement

### Resources Provided
- Module configuration specifications
- AI prompt templates
- Demo content queries
- Swiss-German synonym dictionary
- UI component designs

### Expected Deliverables
- Working AI search with all demo scenarios
- Performance meeting specifications
- Swiss compliance validated
- Demo script tested and refined

---

**Status**: ready-for-dev  
**Next Lane**: Building  
**Assigned Agents**: @drupal-11-lead-developer, @drupal-ai-integration-specialist  
**Timeline**: 4 hours implementation, 1 hour testing  
**Demo Readiness**: Required by presentation date