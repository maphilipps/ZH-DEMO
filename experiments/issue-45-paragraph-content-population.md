# Experiment: Issue #45 - Populate Paragraph Content for Bruchtal Nodes

## Goal
Transform empty/minimal Bruchtal content nodes into rich, demonstration-ready pages using Text and Side-by-side paragraphs. **Impact**: Enhanced GPZH demo presentation quality with thematically consistent "Leben am See" content across all 50 nodes, validated through Playwright testing to ensure error-free rendering and functionality.

## Current State Analysis
- **Total paragraph count**: 85 paragraphs in system
- **Target nodes**: 50 nodes with `field_paragraphs`
- **Content gaps**: 32 nodes with 0 paragraphs, 18 nodes with minimal content (1-4 paragraphs)
- **Base URL**: zh-demo.ddev.site (confirmed from CLAUDE.md)

### Key Findings from Code Analysis
1. **Paragraph field configuration**: Both `page` and `landing_page` content types have `field_paragraphs` properly configured
2. **Paragraph types available**: 
   - `paragraphs.paragraphs_type.text` - Basic text content
   - `paragraphs.paragraphs_type.sidebyside` - Text/media combinations
3. **Current content distribution**:
   - Empty nodes (0 paragraphs): 32 nodes including municipal services
   - Minimal nodes (1-4 paragraphs): 16 nodes 
   - Main landing page "Gemeinde Bruchtal" (nid: 7): 7 existing paragraphs

### Critical Success Factor: Playwright Validation
- Must validate each populated page with Playwright after content creation
- Check for rendering errors, broken layouts, missing content
- Verify paragraph components display correctly
- Learn immediately from any failures to prevent recurring issues

## Surgical Plan of Attack

### Phase 1: Safety & Preparation (5 min)
1. Create DDEV snapshot for rollback capability
2. Test Drupal MCP paragraph creation on single node
3. Verify Playwright can access zh-demo.ddev.site
4. Test Playwright validation on existing well-populated page (nid: 7)

### Phase 2: Incremental Content Population with Validation (25 min)
**Approach**: Create content for 3-4 nodes at a time, then immediately validate with Playwright

**Batch 1 - Landing Page Enhancement (5 min)**
- Target: "Gemeinde Bruchtal" (nid: 7) 
- Action: Enhance existing 7 paragraphs with "Leben am See" theme
- Playwright check: Verify enhanced content renders correctly

**Batch 2 - High-Priority Municipal Services (8 min)**
- Targets: Abfallkalender (nids: 37, 57), Einbürgerung (nids: 43, 62)
- Content: 2-3 Text paragraphs per node with service descriptions
- Playwright check: Validate all 4 pages for proper content display

**Batch 3 - Administration Pages (7 min)**
- Targets: Gemeinderat (nids: 47, 66), Politik (nids: 48, 67)
- Content: Mix of Text + Side-by-side paragraphs
- Playwright check: Verify layout and content rendering

**Batch 4 - Community Pages (5 min)**
- Targets: Sport & Kultur (nids: 40, 59), Vereine (nids: 41, 60)
- Content: Visual mix with Side-by-side for community engagement
- Playwright check: Validate media/text combinations

### Phase 3: Final Validation & Metrics (5 min)
1. Verify total paragraph count increase (target: 85 → 130+ paragraphs)
2. Run Playwright on sample of populated pages
3. Performance check on content-heavy pages

## Content Strategy per Node Type
- **Municipal services**: 2-3 informative Text paragraphs about processes and requirements
- **Administration**: 1-2 Text paragraphs + 1 Side-by-side with organizational structure
- **Community**: Mixed Text and Side-by-side for visual appeal and engagement
- **Landing page**: Enhanced "Leben am See" themed content showcasing municipality

## Playwright Validation Protocol
After each batch completion:
```javascript
// Navigate to each populated page
await page.goto('http://zh-demo.ddev.site/node/[nid]');

// Check for basic rendering
await expect(page.locator('.paragraph')).toBeVisible();

// Verify no error messages
await expect(page.locator('.error')).toHaveCount(0);

// Check content is present
await expect(page.locator('.paragraph--type--text')).toBeVisible();
```

## Risk Mitigation
- DDEV snapshot before any changes for complete rollback
- Incremental validation prevents compounding errors
- Immediate learning from Playwright failures
- Focus on surgical content additions, not replacements