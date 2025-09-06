# ADR-001: Test Municipal Form System

<!--
MADR 4.0.0 Template for Municipal Portal Architecture Decisions
Template: Minimal (simple configuration decisions)
Compliance: Swiss Government Standards, WCAG 2.1 AA
-->

**Date**: 2025-01-09  
**Status**: proposed  
**Decision Makers**: Marc Philipps (Lead Architect), Sarah Mueller (Municipal IT Director)  

## Context and Problem Statement

Citizens in Thalwil, Thalheim, and Erlenbach municipalities cannot efficiently submit municipal service requests online due to lack of accessible, multilingual form system that complies with Swiss government standards.

### Decision Drivers
- Performance requirements: Form load time under 2 seconds
- WCAG 2.1 AA accessibility compliance mandatory
- German/French multilingual support required
- CH-DSG data protection compliance required

## Considered Options
- **Option 1**: Custom Drupal form system with accessibility enhancements
- **Option 2**: Third-party form builder with Drupal integration
- **Option 3**: Headless form system with React frontend

## Decision Outcome

**Chosen Option**: "Option 1"

Implement custom Drupal 11 form system with WCAG 2.1 AA accessibility compliance, German/French multilingual support, and CH-DSG data protection compliance.

## Consequences

Citizens will have improved access to municipal services with full accessibility support and multilingual interfaces. Development team will need to maintain custom form validation logic.

## Municipal Portal Compliance Analysis

### Swiss Standards
- **Accessibility**: Full WCAG 2.1 AA compliance with automated testing
- **Data Protection**: CH-DSG compliant data handling and citizen consent management
- **E-Government**: eCH-0059 structured data export for canton coordination

### Multi-Site Impact
- **Municipalities**: Shared form components with site-specific branding for Thalwil, Thalheim, Erlenbach
- **Scalability**: Form template system enables rapid onboarding of new municipalities

## Tags

**Domain**: `municipal-portal`  
**Technology**: `drupal-11`  
**Compliance**: `swiss-government` `wcag-2.1-aa` `ch-dsg`  

---

**Author**: Marc Philipps  
**Template Version**: MADR 4.0.0 (Minimal)  
**Municipal Portal Version**: 1.0.0  
**Drupal Version**: 11.2.2  

<!-- End of MADR 4.0.0 Minimal Template -->