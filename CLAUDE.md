# CLAUDE.md - Compounding Engineering Knowledge Base

This file provides guidance to Claude Code and serves as the living memory system for the GPZH project. Every interaction, lesson learned, and architectural decision compounds into permanent system knowledge.

## 🔄 Compounding Engineering Status

**Last Updated**: 2025-08-23
**Knowledge Iterations**: 3
**Active Learning Patterns**: Full compounding engineering implementation with meta-agents
**Current Phase**: Complete system with exponential learning capabilities

### Three-Lane Development System
- **Planning Lane**: Strategic analysis and architecture (@drupal-solution-architect + @drupal-technical-pm)
- **Building Lane**: Implementation and development (@drupal-11-lead-developer + @municipality-portal-specialist)  
- **Reviewing Lane**: Quality assurance and compliance (@swiss-compliance-specialist + @qa-testing-specialist)

### Compounding Engineering Meta-Agents
*Specialized agents that transform individual learnings into system-wide exponential improvements*
- **@prompt-engineering-specialist**: Optimizes AI interactions using systematic prompt iteration patterns
- **@test-failure-analyst**: Transforms every failure into permanent knowledge and prevention systems
- **@knowledge-synthesizer**: Fuses insights across lanes and agents into compound intelligence

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Project Context: GPZH Präqualifikation Demo System

**ZH-DEMO Prototyp** - A Drupal 11.2.2 multi-site CMS demonstration system for the GPZH (Gemeindeportale Zürich) prequalification presentation. This system demonstrates our technical capabilities for the Canton of Zurich's municipal portal project.


### Demo Municipality: Bruchtal
For the presentation, we use **Gemeinde Bruchtal** as our demonstration municipality with the tagline "Leben am See" (Life by the Lake).

## 🧠 Compounding Knowledge Sections
# Compounding Engineering Rules
Started: 2025-08-23

## Prinzip
- Jeder Bug wird zu einer Regel, die ihn für immer verhindert
- Jede Entscheidung wird dokumentiert und wiederverwendet
- Jeder erfolgreiche Code wird zum Pattern

## Gelernte Regeln
<!-- Hier fügt Claude automatisch neue Regeln ein -->

## Bug-Prävention
<!-- Hier kommen Regeln aus Bugs -->

## Erfolgreiche Patterns
<!-- Hier sammeln sich bewährte Lösungen --



## 🎭 Wichtige Tool-Änderung: Playwright statt Puppeteer

**WICHTIG**: Für alle Browser-Automatisierung und E2E-Testing verwenden wir **Playwright** anstatt Puppeteer!

### Gründe für Playwright:
- Bessere Cross-Browser-Unterstützung (Chrome, Firefox, Safari, Edge)
- Robustere Selektoren und Auto-Waiting
- Eingebaute Visual Regression Testing Capabilities
- Bessere Performance und Stabilität
- Native TypeScript-Unterstützung

### Anwendungsbereiche:
- E2E Testing der Demo-Szenarien
- Form Testing und Validierung
- Visual Regression Tests
- Navigation Flow Testing
- Screenshot-Erstellung für Dokumentation
- Performance Testing in verschiedenen Browsern
- es gibt bruchtal.zh-demo.ddev.site nicht. Einfach nur zh-demo.ddev.site
- Immer TailwindCSS schreiben, nur im Notfall komplett custom.css
- Nutze, wenn du Änderungen an Drupal machst. IMMER das DRUPAL MCP. WENN das nicht funktionierst, musst du sämtliche Änderungen mir absprecehen. Ich möchte nicht, dass du solche Änderungen direkt über die Datenbank machst.