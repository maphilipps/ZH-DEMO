# Handoff to Building Lane: Bruchtal Directory System

**Date**: 2025-08-20
**Priority**: HIGH - Demo Critical
**Implementation Time**: ~10 hours

## 📋 Task Overview
Implement a simplified directory system for Gemeinde Bruchtal demonstration with three content types (Vereine, Firmen, Gastgewerbe) and basic guest editing workflow.

## 📁 Complete Specification
**Location**: `.claude/lanes/planning/bruchtal-directory-system-plan.md`

## 🎯 Key Implementation Points

### Content Types (English machine names!)
1. **club** (Label: Vereine)
2. **company** (Label: Firmen)  
3. **hospitality** (Label: Gastgewerbe)

### Shared Fields (Create once, reuse!)
- field_description
- field_logo
- field_address
- field_phone
- field_email
- field_website
- field_opening_hours
- field_directory_owner
- field_verified
- field_last_updated

### Views Required
- /vereine (Grid with cards)
- /firmen (Table/List)
- /gastgewerbe (Cards with images)

### Workflow
- Simple content_moderation
- Two roles: guest_editor, content_moderator
- Basic approval workflow

### Demo Content (LOTR-themed)
- 5-6 entries per directory type
- Names like "Théoden Rohan", "Gimli Müller", "Gasthof zum Grünen Drachen"

## ⚠️ Important Notes
- **This is a DEMO** - Keep it simple!
- No need for search_api, facets, or complex features
- Focus on showing the concept works
- ~10 hours total implementation time

## ✅ Success Criteria
- [ ] Three content types created with proper fields
- [ ] Basic Views with simple filters
- [ ] Guest can create/edit own entries
- [ ] Moderator can approve entries
- [ ] 15-18 demo entries with LOTR names
- [ ] 5-minute demo scenario works smoothly

## 🚀 Quick Start
```bash
# 1. Create content types
ddev drush generate content-entity

# 2. Configure fields (shared fields first!)
# Remember: Create shared fields once, attach to all types

# 3. Set up Views
# Use Views UI for quick setup

# 4. Configure workflow
# Use content_moderation module (Core)

# 5. Create demo content
# Use LOTR-inspired Swiss names
```

## 📞 Coordination
- **Questions**: Check the full planning document
- **Blockers**: Notify Planning Lane immediately
- **Testing**: Coordinate with Reviewing Lane for Swiss compliance

---
**Status**: READY FOR IMPLEMENTATION
**Handoff Complete**: ✅