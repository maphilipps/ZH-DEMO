# JIRA Issue: Milvus AI Search Implementation

## Issue Details
**Project**: GPZH Demo System  
**Issue Type**: Epic  
**Priority**: High  
**Sprint**: Demo Preparation Sprint  
**Assignee**: Building Lane (@drupal-11-lead-developer)  
**Reporter**: Planning Lane (@planning-lane-orchestrator)  
**Epic Link**: GPZH-DEMO-AI-SEARCH  

## Summary
Implement AI-powered semantic search using Milvus vector database for GPZH Demo System to showcase advanced search capabilities during 35-minute präqualifikation presentation.

## Description

### Context
The GPZH Demo System requires advanced AI search capabilities to demonstrate technical excellence for Canton Zürich's municipal portal project. Current basic Drupal search needs enhancement with semantic search, multilingual support, and municipality-specific isolation.

### Goal
Create a production-ready AI search system using Milvus vector database integrated with Drupal 11.2, featuring semantic search, Swiss compliance, and multi-site architecture for 160+ municipalities.

## Acceptance Criteria

### Functional Requirements
- [ ] Semantic search returns contextually relevant results
- [ ] Multi-language search works (DE/FR/IT)
- [ ] Municipality-specific content isolation
- [ ] Search response time under 500ms p95
- [ ] Graceful fallback to database search on Milvus failure
- [ ] Typo tolerance and natural language understanding

### Technical Requirements
- [ ] Milvus 2.x integration via Docker in DDEV
- [ ] OpenAI Ada-002 embeddings with local fallback
- [ ] Search API backend plugin implementation
- [ ] Queue-based async embedding processing
- [ ] Redis caching for query embeddings (15min TTL)
- [ ] Multi-site tenant isolation with separate collections

### Performance Requirements
- [ ] Core Web Vitals score maintained >90
- [ ] Search latency <500ms p95
- [ ] Index coverage 100% for public content
- [ ] Cache hit rate >80%
- [ ] System uptime 99.9% during demo

### Compliance Requirements
- [ ] Swiss CH-DSG data privacy compliance
- [ ] GDPR/DSGVO requirements met
- [ ] Audit logging for all operations
- [ ] No PII in vector embeddings
- [ ] Data encryption at rest and in transit
- [ ] Municipality data sovereignty maintained

### Demo Requirements
- [ ] Bruchtal municipality content fully indexed
- [ ] 5 impressive search scenarios prepared
- [ ] Live demo performance metrics visible
- [ ] AI features prominently highlighted
- [ ] Error handling gracefully demonstrated

## Technical Specifications

### Architecture Components
```yaml
Vector Database:
  - Milvus 2.x standalone Docker container
  - Port mapping: 19530 (gRPC), 9091 (management)
  - Storage allocation: 10GB initial
  - HNSW index configuration: M=16, ef=200

Embedding Service:
  - Primary: OpenAI Ada-002 (1536 dimensions)
  - Fallback: Local Sentence-BERT (768 dimensions)
  - Integration via existing GPT-4o API setup

Drupal Module:
  - Module name: gpzh_search_ai
  - Search API backend plugin
  - Queue worker for async processing
  - REST endpoints for search operations
  - Custom field formatters for vector display
```

### Implementation Timeline (10 Days)

#### Phase 1: Infrastructure (Days 1-2)
**Tasks:**
- Configure Milvus Docker container in DDEV
- Create gpzh_search_ai module structure
- Implement MilvusConnectionService
- Setup basic error handling and logging

**Deliverables:**
- Working Milvus instance accessible from Drupal
- Basic connection service with health checks
- Module scaffolding with proper dependencies

#### Phase 2: Core Integration (Days 3-4)
**Tasks:**
- Implement Search API backend plugin
- Create EmbeddingService with OpenAI integration
- Build EmbeddingQueueWorker for async processing
- Setup content indexing hooks

**Deliverables:**
- Search API recognizes Milvus backend
- Embeddings generated for test content
- Queue processing functional
- Content automatically indexed on save

#### Phase 3: Search Features (Days 5-6)
**Tasks:**
- Implement semantic search algorithm
- Create hybrid search functionality
- Build faceted filtering system
- Add auto-complete features

**Deliverables:**
- Semantic search endpoint operational
- Hybrid text + vector search working
- Filtering by content type, date, municipality
- Search suggestions via embeddings

#### Phase 4: Multi-site Support (Day 7)
**Tasks:**
- Implement municipality isolation
- Create collection management system
- Setup tenant-specific permissions
- Add cross-site search controls

**Deliverables:**
- Complete tenant isolation verified
- Municipality-specific search results
- Admin UI for collection management
- Security audit passed

#### Phase 5: UI & Demo (Days 8-9)
**Tasks:**
- Create search UI components with Alpine.js
- Build search block and forms
- Implement result theming
- Prepare demo scenarios

**Deliverables:**
- Responsive search interface
- Branded search results pages
- Demo content indexed and tested
- Performance benchmarks established

#### Phase 6: Final Testing (Day 10)
**Tasks:**
- Complete compliance validation
- Performance optimization
- Demo rehearsal and fixes
- Documentation completion

**Deliverables:**
- All acceptance criteria met
- Demo-ready system
- Performance targets achieved
- Compliance documentation complete

## Resources Required

### Team Allocation
- **Backend Developer**: 60 hours (1.5 FTE for 2 weeks)
- **Frontend Developer**: 20 hours (0.5 FTE for 2 weeks)
- **DevOps Engineer**: 10 hours (setup and optimization)
- **QA Tester**: 10 hours (compliance and performance testing)

### Infrastructure Requirements
- **Milvus Instance**: 2GB RAM, 10GB storage
- **Redis Cache**: 512MB for query caching
- **OpenAI API Credits**: $50 for embedding generation
- **DDEV Resources**: Additional 1GB RAM allocation

### Dependencies
- **External**: search_api module v1.0+, openai-php/client v0.10+
- **Internal**: Existing GPT-4o integration, Redis cache service
- **Infrastructure**: DDEV multi-site configuration

## Risk Assessment

| Risk Factor | Impact | Probability | Mitigation Strategy |
|-------------|--------|-------------|-------------------|
| Milvus connection instability | High | Medium | Implement circuit breaker + DB fallback |
| OpenAI rate limiting | Medium | Low | Local embedding model as backup |
| Performance degradation | High | Low | Aggressive caching + query optimization |
| Multi-site complexity | Medium | Medium | Simplified demo scope, focus on Bruchtal |
| Demo failure scenarios | Critical | Low | Multiple rehearsals + backup demos |
| Compliance issues | High | Low | Early review with swiss-compliance-specialist |

## Demo Scenarios for Presentation

### Scenario 1: Natural Language Service Search (2 minutes)
**Query**: "Wo kann ich einen Bauantrag stellen?"  
**Expected Results**: Building permit service page, related forms, contact information  
**Highlight**: Natural language understanding, service discovery

### Scenario 2: Multilingual Search (1 minute)
**Query**: "permis de construire" (French)  
**Expected Results**: German building permit content with translation indicators  
**Highlight**: Cross-language semantic matching

### Scenario 3: Event Discovery (1 minute)
**Query**: "Familienfreundliche Veranstaltungen am Wochenende"  
**Expected Results**: Weekend family events with semantic filtering  
**Highlight**: Context understanding, temporal filtering

### Scenario 4: Typo Tolerance (30 seconds)
**Query**: "Baugenehmingung" (deliberate typo)  
**Expected Results**: Correct building permit results  
**Highlight**: Embedding-based fuzzy matching

### Scenario 5: Context-Aware Results (30 seconds)
**Query**: "Schwimmen lernen für Kinder"  
**Expected Results**: Swimming courses, pool information, safety guidelines  
**Highlight**: Contextual relevance, related content discovery

## Success Metrics

### Technical KPIs
- Search latency: <500ms for 95th percentile
- Relevance score: >0.8 average across demo queries
- Index coverage: 100% of public content types
- System availability: 99.9% during presentation period
- Cache hit ratio: >80% for repeated queries

### Business KPIs
- Demo impact: Clear "wow factor" achieved with stakeholders
- User experience: Intuitive search with high-quality results
- Scalability demonstration: Clear path to 160+ municipalities
- Swiss compliance: Full documentation and validation

### Quality Gates
- All acceptance criteria verified by QA
- Performance benchmarks met
- Swiss compliance audit passed
- Demo rehearsal completed successfully
- Building Lane handoff to Reviewing Lane approved

## Documentation Requirements

### Technical Documentation
- Milvus integration architecture document
- API endpoint specifications
- Performance tuning guide
- Troubleshooting playbook

### Business Documentation
- Demo presentation script
- Feature benefit analysis
- Scalability projections
- Swiss compliance summary

### Compliance Documentation
- Data privacy impact assessment
- OpenAI data processing agreement
- Audit logging specifications
- Municipal data sovereignty plan

## Related Issues
- **Blocks**: Demo presentation preparation
- **Relates to**: GPT-4o integration, Multi-site architecture
- **Follows**: Basic search implementation
- **Precedes**: Advanced AI features (content suggestions, auto-tagging)

## Labels
`ai-search`, `milvus`, `demo-critical`, `swiss-compliance`, `performance-sensitive`, `multi-site`

## Comments
This epic represents a critical path item for the GPZH demo presentation. Success here directly impacts our ability to demonstrate advanced AI capabilities and technical sophistication to Canton Zürich stakeholders.

Implementation should prioritize demo readiness while maintaining production-quality standards for potential post-demo deployment.

---

**Created by**: Planning Lane Orchestrator  
**Date**: 2025-08-21  
**Status**: Ready for Building Lane assignment  
**Estimated Effort**: 100 story points  
**Sprint**: Demo Preparation Sprint