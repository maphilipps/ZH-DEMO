# ZH-DEMO - GPZH Präqualifikations-Prototyp

## 🏛️ Projekt: Gemeindeportale Zürich (GPZH) Demo-System

Dieser **ZH-DEMO Prototyp** ist optimal konfiguriert für die GPZH Präqualifikations-Präsentation am **Kanton Zürich**. Als moderne **Drupal 11.2.2 Enterprise CMS-Lösung** mit fortschrittlicher **KI-Integration** und **Schweizer Public Sector Standards** demonstrieren wir eine **Single-Site Backend-Lösung** für kommunale Content-Verwaltung, fokussiert auf die **"Inhaltliche Themen (2.)" Anforderungen** aus der GPZH Vorlage.

## 🎯 **WICHTIGE PROJEKT-ANPASSUNG**

**Scope Change**: Das Projekt fokussiert sich auf **EIN System (kein Multi-Site)** mit Schwerpunkt auf **Backend-Pflege für Gemeindemitarbeitende**. Multi-Site Architektur wird bei einem anderen Kundenprojekt demonstriert.

**Demo-Fokus**: 
- **Systemübersicht und Navigation** (10 Min)
- **Einfache Geschäftsprozess-Formulare** (7 Min) 
- **Backend für Gemeindemitarbeitende** (15 Min)
- **Content-Verwaltung** mit stimmigen Inhalten orientiert am Prototypen

## 📋 Development Guidelines & Folder Structure

### **Folder-Specific Documentation**
- **`/web/themes/custom/`** → [Theme Development Guidelines](/web/themes/custom/adesso_cms_theme/CLAUDE.md)
- **`/web/modules/custom/`** → [Module Development Guidelines](/web/modules/custom/CLAUDE.md) 
- **`/config/`** → [Configuration Management Guidelines](/config/CLAUDE.md)
- **`/.ddev/`** → [DDEV & DevOps Documentation](/.ddev/CLAUDE.md)
- **`/gemeinden/`** → [Municipality Content Guidelines](/gemeinden/CLAUDE.md)

### **tmux-cli Integration for Interactive Development**

`tmux-cli` is a bash command that enables Claude Code to control CLI applications
running in separate tmux panes - launch programs, send input, capture output,
and manage interactive sessions. Run `tmux-cli --help` for detailed usage
instructions.

**Example uses for GPZH development:**
- Interact with DDEV containers and run Drupal commands
- Launch multiple Claude Code instances for parallel development tasks
- Run debugging sessions with step-through code analysis
- Test web applications with browser automation tools like Playwright


## 🔌 MCP (Model Context Protocol) Integration Stack

### **Core MCPs for GPZH Development**

The GPZH project leverages advanced MCP servers for comprehensive automation, testing, and integration workflows specifically optimized for **single-site backend content management** with focus on **"Inhaltliche Themen"** requirements.

#### **1. Atlassian MCP - Jira & Confluence Integration**
```bash
# Installation & Configuration
claude mcp add atlassian-jira -- npx -y @modelcontextprotocol/server-atlassian

# Environment Variables
export JIRA_API_TOKEN="your_jira_api_token"
export JIRA_BASE_URL="https://adesso.atlassian.net"
export JIRA_USER_EMAIL="your_email@adesso.com"
export CONFLUENCE_API_TOKEN="your_confluence_token"
```

**GPZH Jira Commands:**
```bash
# Task Management
@jira-create-ticket --type="Story" --summary="Municipality Theme Enhancement" --project="GPZH"
@jira-get-ticket GPZH-123
@jira-update-status GPZH-123 --status="In Progress"
@jira-add-comment GPZH-123 "Implementation completed, ready for review"
@jira-link-pr GPZH-123 --pr-url="https://github.com/repo/pull/456"

# Acceptance Criteria Integration  
@jira-copy-acceptance-criteria GPZH-123  # Auto-copy to PR template
@jira-validate-completion GPZH-123      # Check criteria fulfillment
```

#### **2. GitHub MCP - Advanced PR & Repository Management**
```bash
# Installation
claude mcp add github -- npx -y @modelcontextprotocol/server-github

# Environment Variables
export GITHUB_PERSONAL_ACCESS_TOKEN="your_github_token"
```

**GPZH GitHub Workflows:**
```bash
# PR Creation with Jira Integration
@gh-create-pr --title="[GPZH-123] Municipality Navigation Enhancement" \
               --body-template="jira-acceptance-criteria" \
               --reviewers="@claude,@team-lead" \
               --labels="municipality,frontend,demo-ready"

# Automated PR Review Request
@claude-review-pr --jira-ticket="GPZH-123" --check-acceptance-criteria

# Branch Management
@gh-create-branch feature/GPZH-123-municipality-nav --from=main
@gh-sync-branch --with-jira-status
```

#### **3. Playwright MCP - Backend Content Management Testing**
```bash
# Installation  
claude mcp add playwright -- npx -y @modelcontextprotocol/server-playwright

# GPZH Backend Testing Framework
npm install @playwright/test @axe-core/playwright
```

**Backend Content Management Testing:**
```bash
# Backend Workflow Testing per GPZH Vorlage
@playwright-test-backend --features="forms,directory,wysiwyg,workflow"
@playwright-test-business-forms --types="feedback,infrastructure,events,room-booking"
@playwright-test-guest-workflows --include="registration,approval,publishing"

# Content Management Testing
@playwright-test-content-management --wysiwyg=true --media-integration=true
@playwright-test-ai-features --content-suggestions=true --alt-text=true

# Acceptance Criteria Validation  
@playwright-validate-backend-requirements GPZH-123 --inhaltliche-themen=true
```

**Playwright Test Configuration (playwright.config.js):**
```javascript
// GPZH Backend Content Management Test Configuration
export default defineConfig({
  testDir: './tests',
  projects: [
    // Backend-focused test projects per GPZH Vorlage
    {
      name: 'admin-backend-desktop',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'https://zh-demo.ddev.site/admin',
        storageState: 'tests/.auth/admin.json'
      },
    },
    {
      name: 'editor-workflow-testing',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'https://zh-demo.ddev.site',
        storageState: 'tests/.auth/editor.json'
      },
    },
    {
      name: 'guest-account-workflow',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'https://zh-demo.ddev.site',
        storageState: 'tests/.auth/guest.json'
      },
    },
  ],
  
  // GPZH backend-specific test configuration
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Focus on backend workflows and content management
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },
});
```

#### **4. Browser-Tools MCP - Live Testing & Debugging**
```bash
# Installation
claude mcp add browser-tools -- npx -y @modelcontextprotocol/server-browser-tools
```

**Backend Demo Preparation Commands:**
```bash
# Backend Performance & Accessibility Audits per GPZH Vorlage
@browser-audit-backend --url="https://zh-demo.ddev.site/admin" --focus="content-management"
@browser-audit-forms --url="https://zh-demo.ddev.site" --types="feedback,infrastructure,events"
@browser-audit-accessibility --url="https://zh-demo.ddev.site" --wcag-level="AA" --ech-0059=true

# Backend Demo Screenshots per "Inhaltliche Themen"
@browser-screenshot-backend --url="https://zh-demo.ddev.site/admin" --workflow="content-creation"
@browser-screenshot-forms --url="https://zh-demo.ddev.site" --business-processes=true
@browser-screenshot-directory --url="https://zh-demo.ddev.site/vereine" --guest-workflow=true

# Backend Workflow Testing
@browser-test-wysiwyg --editor="ckeditor5" --ai-integration=true
@browser-test-guest-accounts --registration=true --approval-workflow=true
```

#### **5. Puppeteer MCP - Advanced Browser Automation**
```bash
# Installation
claude mcp add puppeteer -- npx -y @modelcontextprotocol/server-puppeteer
```

**Backend Demo Automation per GPZH Vorlage:**
```bash
# Automated Backend Demo Content per "Inhaltliche Themen"
@puppeteer-setup-business-forms --types="feedback,infrastructure,events,room-booking"
@puppeteer-create-directory-content --type="vereine" --guest-workflow=true --with-ai-content=true
@puppeteer-setup-wysiwyg-demo --content="gemeinderat-artikel" --ai-suggestions=true

# Backend Workflow Automation
@puppeteer-demo-backend-workflows --duration="15min" --focus="content-management"
@puppeteer-demo-forms --duration="7min" --business-processes=true
@puppeteer-demo-navigation --duration="10min" --ai-search=true
```

#### **6. Sequential-Thinking MCP - Complex Workflow Orchestration**
```bash
# Installation
claude mcp add sequential-thinking -- npx -y @modelcontextprotocol/server-sequential-thinking
```

**GPZH Backend Workflow Orchestration per "Inhaltliche Themen":**
```bash
# Complete Backend Feature Development Workflow  
@sequential-backend-workflow "
1. @jira-start GPZH-123 --inhaltliche-themen=true
2. @gh-create-branch feature/GPZH-123-backend-feature
3. Implement backend content management per GPZH Vorlage
4. @playwright-test-backend --features=forms,directory,wysiwyg
5. @jira-pr GPZH-123 --backend-acceptance-criteria=true
6. @claude-review-pr --validate-backend-requirements
7. @jira-complete GPZH-123
"

# Backend Demo Preparation Workflow per GPZH Vorlage
@sequential-backend-demo-prep "
1. @browser-audit-backend --content-management=true
2. @puppeteer-setup-business-forms --all-types=true
3. @puppeteer-create-directory-content --guest-workflow=true
4. @browser-screenshot-backend --wysiwyg-demo=true
5. Generate backend presentation checklist für 'Inhaltliche Themen'
"
```

#### **7. Server-Memory MCP - Knowledge Management**
```bash
# Installation  
claude mcp add memory -- npx -y @modelcontextprotocol/server-memory
```

**GPZH Backend Knowledge Base per "Inhaltliche Themen":**
```bash
# Store Backend-Specific Information per GPZH Vorlage
@memory-store "backend-workflows" --data="content-management={wysiwyg: true, ai-integration: true}"
@memory-store "business-forms" --data="feedback,infrastructure,events,room-booking"
@memory-store "guest-workflows" --data="registration,approval,publishing"

# Retrieve Backend Development Patterns
@memory-recall "drupal-backend-patterns"
@memory-recall "webform-workflows"
@memory-recall "guest-account-management"
@memory-recall "wysiwyg-ai-integration"

# Document Backend Demo Scenarios
@memory-store "backend-demo-scenarios" --data="inhaltliche-themen={duration: '15min', focus: 'content-management'}"
```

### **MCP Integration Patterns for GPZH**

#### **Backend Development Workflow per GPZH Vorlage**
```bash
# Complete backend workflow for "Inhaltliche Themen"
@gpzh-backend-workflow GPZH-123 "Backend content management enhancement"
# This command orchestrates:
# 1. Jira ticket für "Inhaltliche Themen" 
# 2. GitHub branch creation für backend features
# 3. Backend development environment setup
# 4. Business forms testing (feedback, infrastructure, events, room-booking)
# 5. Guest workflow testing (registration, approval, publishing)
# 6. WYSIWYG and AI integration testing
# 7. Backend deployment preparation
```

#### **Backend Demo Preparation per GPZH Vorlage**
```bash  
# Backend demo readiness check für "Inhaltliche Themen"
@gpzh-backend-demo-ready
# This command validates per GPZH Vorlage:
# 1. Business forms functional (feedback, infrastructure, events, room-booking)
# 2. Directory management with guest accounts working
# 3. WYSIWYG editor with AI integration ready
# 4. Backend workflows (registration → approval → publishing) tested
# 5. Content management performance >90 Core Web Vitals
# 6. Accessibility compliance (WCAG 2.1 AA + eCH-0059)
```

#### **Backend Quality Assurance Pipeline**
```bash
# Backend-focused QA per "Inhaltliche Themen"
@gpzh-backend-qa-pipeline GPZH-123
# Integrates:
# - Playwright backend workflow testing
# - Browser-tools content management audits
# - Business forms validation 
# - Guest account workflow testing
# - AI features backend testing
# - WYSIWYG editor compliance validation
```

### **MCP Environment Setup**

#### **Required Environment Variables**
```bash
# Add to ~/.zshrc or ~/.bashrc
export JIRA_API_TOKEN="your_jira_api_token"
export JIRA_BASE_URL="https://adesso.atlassian.net"
export JIRA_USER_EMAIL="your_email@adesso.com"
export GITHUB_PERSONAL_ACCESS_TOKEN="your_github_token"
export CONFLUENCE_API_TOKEN="your_confluence_token"

# GPZH-specific backend configurations per "Inhaltliche Themen"
export GPZH_BASE_URL="https://zh-demo.ddev.site"
export GPZH_ADMIN_USER="admin"
export GPZH_ADMIN_PASS="admin123"
export GPZH_BACKEND_FOCUS="inhaltliche-themen"
export GPZH_DEMO_SEGMENTS="navigation,forms,backend"
```

#### **MCP Installation Script**
```bash
#!/bin/bash
# install-gpzh-mcps.sh

echo "🚀 Installing GPZH MCP Stack..."

# Core MCPs
claude mcp add atlassian-jira -- npx -y @modelcontextprotocol/server-atlassian
claude mcp add github -- npx -y @modelcontextprotocol/server-github  
claude mcp add playwright -- npx -y @modelcontextprotocol/server-playwright
claude mcp add browser-tools -- npx -y @modelcontextprotocol/server-browser-tools
claude mcp add puppeteer -- npx -y @modelcontextprotocol/server-puppeteer
claude mcp add sequential-thinking -- npx -y @modelcontextprotocol/server-sequential-thinking
claude mcp add memory -- npx -y @modelcontextprotocol/server-memory

# Install additional dependencies
npm install -g @playwright/test @axe-core/playwright

echo "✅ GPZH MCP Stack installed successfully!"
echo "🔧 Configure environment variables in your shell profile"
echo "📋 Run @gpzh-setup to initialize project-specific MCP configurations"
```

## 🎯 Jira Integration & Workflow

### **Project Configuration**
- **Project Key**: `GPZH` (e.g., GPZH-123, GPZH-456)
- **Epic Structure**: Multi-site municipalities, AI features, compliance
- **Story Types**: Feature, Bug, Technical Task, Improvement

### **Development Workflow**
```
Jira Ticket → Development Branch → PR with Acceptance Criteria → @claude Review → Merge
```

### **Pull Request Requirements**
Bei jedem Pull Request MÜSSEN folgende Punkte beachtet werden:

1. **Jira-Ticket Referenzierung**: 
   - Branch: `feature/GPZH-123-description` oder `fix/GPZH-456-bugfix`
   - Kopiere ALLE Akzeptanzkriterien aus dem Jira-Ticket
   - Markiere mit ✅ welche erfüllt sind, ❌ wenn nicht erfüllt

2. **Claude Review Tag**:
   - Tagge @claude im PR für automatische Akzeptanzkriterien-Überprüfung
   - Warte auf Claude's Bestätigung vor dem Merge
   - Beispiel: "@claude bitte prüfe ob alle Akzeptanzkriterien aus GPZH-123 erfüllt sind"

3. **Keine Merge ohne Genehmigung**:
   - Kein Auto-Merge aktivieren
   - Explizite Genehmigung erforderlich
   - Claude-Review abwarten

### **PR Template**:
```markdown
## Jira Ticket: GPZH-XXX
🔗 [Jira Link](https://adesso.atlassian.net/browse/GPZH-XXX)

## Akzeptanzkriterien Status
- [ ] Kriterium 1 aus Jira-Ticket
- [ ] Kriterium 2 aus Jira-Ticket  
- [ ] Kriterium 3 aus Jira-Ticket

## Implementierung
- Kurze Beschreibung der Lösung
- Verwendete Drupal-Module/Features
- AI-Features eingesetzt (wenn relevant)

## Test-Evidenz
- Screenshot 1: Desktop-Ansicht
- Screenshot 2: Mobile-Ansicht
- Video: Funktionsdemonstration (bei komplexen Features)

## GPZH Multi-Site Testing
- [ ] Getestet in Gemeinde Thalwil
- [ ] Getestet in Gemeinde Thalheim  
- [ ] Getestet in Gemeinde Erlenbach
- [ ] AI-Features funktional
- [ ] Performance <2s Ladezeit

## Review Request
@claude bitte prüfe ob alle Akzeptanzkriterien aus Jira-Ticket GPZH-XXX erfüllt sind und führe eine Code-Review durch.

## Deployment Checklist
- [ ] Configuration exported (ddev drush cex)
- [ ] Database Updates getestet
- [ ] Cache gecleared
- [ ] Performance-Tests bestanden
- [ ] Accessibility-Tests bestanden
```

### **🎯 Präsentations-Fokus (25 Min Anbieterpräsentation + 35 Min Systemdemonstration)**

## Technology Stack - GPZH Ready

### **Drupal 11.2.2 Enterprise Foundation** 🏗️
- **Drupal Core**: 11.2.2 (neueste Version, Langzeit-Support bis 2028)
- **PHP 8.3**: Moderne Performance und Security
- **MariaDB 10.11**: Robuste Datenbank für kommunale Anforderungen
- **Single-Site Backend Architecture**: Fokus auf Content-Verwaltung für Gemeindemitarbeitende

### **KI-Integration für Moderne Verwaltung** 🤖
- **Drupal AI Suite**: Content-Generierung mit GPT-4o, Claude, Groq
- **AI Content Suggestions**: Automatische Texterstellung für Gemeindekommunikation
- **Smart Search**: KI-unterstützte Suchfunktionen mit natürlicher Sprache
- **Auto Alt-Text**: Barrierefreie Bildbeschreibungen automatisch generiert
- **AI Translation**: DE→FR→IT Content-Übersetzung für mehrsprachige Schweiz

### **Frontend Excellence - Responsive & Accessible** 📱
- **Vite 6.2.0**: Modernste Build-Pipeline mit Hot Module Replacement
- **Tailwind CSS v4**: State-of-the-art responsive Design Framework
- **25+ SDC Components**: Single Directory Components für modularen Aufbau
- **Alpine.js**: Leichtgewichtige Interaktivität ohne Framework-Overhead
- **Storybook 8.6.7**: Professionelle Komponenten-Dokumentation

### **Schweizer Compliance Standards** 🇨🇭
- **WCAG 2.1 AA**: Barrierefreiheit nach internationalen Standards
- **eCH-0059**: Zusätzliche Schweizer Accessibility-Richtlinien
- **DSGVO + CH-DSG**: Vollständige Datenschutz-Compliance
- **Core Web Vitals >90**: Performance-Excellence für Mobile und Desktop

---

## 🎭 GPZH Live-Demo Szenarien per "Inhaltliche Themen" (35 Minuten)

### **1. Systemübersicht und Navigation (10 Min)** 

#### **Backend System Demo per GPZH Vorlage:**
```bash
Demo Commands für Backend-Fokus:
"Zeige Backend-Navigation und Systemübersicht"  
"AI-unterstützte Suche: 'Wo melde ich Infrastrukturschäden?'"
"Filter und Datenvisualisierung für strukturierte Daten"
```

#### **Features Live-Demo per GPZH Vorlage:**
- ✅ **Kurze Navigationswege**: Optimierte Backend-Navigation 
- ✅ **AI-Enhanced Search**: "Wo kann ich einen Baum fällen anmelden?" 
- ✅ **Filter auf strukturierte Daten**: Verzeichnis-Suche und -Filter
- ✅ **Werkzeuge für Datenvisualisierung**: Dashboard und Übersichten
- ✅ **Performance**: <2s Ladezeiten, >90 Core Web Vitals Scores

### **2. Einfache Geschäftsprozess-Formulare (7 Min)**

#### **Live-Demo per GPZH Vorlage: "Einfache Geschäftsprozess-Formulare"**
```bash
Demo-Szenarien per GPZH Anforderungsvorlage:
"Feedback-Formular" - Bürgerfeedback an Gemeinde
"Meldung an die Gemeinde betreffend Infrastrukturschäden" - Strassenschäden etc.
"Anmeldung für Anlässe" - Gemeindeveranstaltungen
"Anfrage für Raumnutzung" - Gemeindesaal-Reservierung
```

#### **Backend Features per GPZH Vorlage:**
- ✅ **Formulargestaltung durch Gemeindemitarbeitende**: Drag-and-Drop ohne Programmierung
- ✅ **Datenspeicherung in Tabellenform**: Strukturierte Datenerfassung
- ✅ **Statusverwaltung (soweit vorhanden)**: Eingegangen→Bearbeitung→Erledigt
- ✅ **Einfache Workflow-Funktionalitäten**: Email-Benachrichtigungen und Zuweisungen

### **3. Backend für Gemeindemitarbeitende (15 Min) - per GPZH Vorlage**

#### **Strukturierte Daten: Pflege eines Verzeichnisses** 
```bash
Demo-Szenario per GPZH Vorlage: "Verzeichnis-Verwaltung (Vereine, Firmen oder Gastgewerbe)"
- Strukturierte Datenfelder: Name, Kategorie, Kontakt, Website, Beschreibung
- Sortierung und Filterung nach Kategorien
- Export-Funktionen für Gemeinde-Jahresheft
- Batch-Import bestehender Daten
```

#### **Pflege durch Externe mit Gastkonto (mit Workflow/Freigabe)**
```bash
Demo-Szenario per GPZH Vorlage: "Gastkonto-Workflow"  
- Gastkonto-Registrierung für Vereine/Firmen
- Self-Service Dateneingabe und -pflege
- Workflow: Externe Eingabe → Gemeindemitarbeiter Prüfung → Freigabe/Ablehnung
- Benachrichtigungs-System für alle Workflow-Stufen
```

#### **"Einfache Inhaltsseite": WYSIWYG-Editor** 
```bash
Demo-Szenario per GPZH Vorlage: "Außergewöhnliche Anlässe oder Projekte"
- WYSIWYG-Editor mit attraktiver Gestaltung
- Titel, Schriftauszeichnungen, Textboxen, Listen
- Einbindung von Medien (Bilder, Videos) und Flyern (PDF)
- AI-Integration für Content-Vorschläge und Alt-Text
```

#### **Backend Features Live per GPZH Vorlage:**
- ✅ **Gin Admin Theme**: Moderne, benutzerfreundliche Oberfläche
- ✅ **CKEditor 5**: WYSIWYG mit AI-Integration
- ✅ **Structured Data Management**: Verzeichnis-Verwaltung mit Kategorien
- ✅ **Guest Account System**: Registration, Approval, Publishing Workflow
- ✅ **Media Management**: Bulk-Upload mit AI Alt-Text für Flyers und Medien

### **4. Fragen & Abschluss (3 Min)**
- Performance-Benchmarks für Backend-Workflows zeigen
- Accessibility-Demo mit Screen Reader für Redakteure
- Kosten-Nutzen für Backend Content-Management 
- Vendor-Independence durch Open Source

---

## 🎮 GPZH Jira Commands & Agent Integration

### **Jira Task Management Commands**

```bash
# Core Jira Workflow
@jira-list                    # List assigned GPZH tasks
@jira-start GPZH-XXX         # Start working on a Jira task
@jira-complete GPZH-XXX      # Mark Jira task as completed
@jira-status GPZH-XXX        # Check Jira task status
@jira-branch GPZH-XXX        # Create branch for Jira task

# PR Creation Commands  
@jira-pr GPZH-XXX           # Create PR for Jira task with acceptance criteria
@pr-review                  # List PRs awaiting review
@pr-status                  # Check PR status for current branch

# GPZH Backend Development Workflow per "Inhaltliche Themen"
@gpzh-backend-start         # Start DDEV environment für Backend-Demo
@gpzh-backend-demo-prep     # Prepare backend system for live demo
@gpzh-backend-qa-full      # Run complete QA pipeline für Content-Management
@gpzh-ai-backend-test      # Test AI features im Backend (Content-Suggestions, Alt-Text)

# Backend-Specific Commands per GPZH Vorlage
@gpzh-setup-business-forms  # Setup business forms (feedback, infrastructure, events, room-booking)
@gpzh-setup-directory       # Setup directory management (vereine, firmen, gastgewerbe)
@gpzh-setup-guest-workflow  # Setup guest account registration and approval workflow
@gpzh-demo-content-create   # Create demo content für "Inhaltliche Themen"
```

### **Jira Integration Flags**

```bash
# Task State Flags
--todo                     # Set task to "To Do" status
--in-progress             # Set task to "In Progress" status  
--review                  # Set task to "In Review" status
--done                    # Set task to "Done" status
--blocked                 # Set task to "Blocked" status

# GPZH-Specific Flags
--municipality [all|thalwil|thalheim|erlenbach]  # Target specific municipality
--ai-features             # Include AI functionality testing
--demo-ready              # Prepare for presentation demo
--compliance-check        # Run Swiss compliance validation
--performance-audit       # Run Core Web Vitals testing

# PR Flags
--draft                   # Create as draft PR
--review-required         # Require @claude review before merge
--no-auto-merge          # Disable auto-merge (default for GPZH)
--acceptance-criteria    # Auto-copy Jira acceptance criteria
```

## 🚀 GPZH-Optimierte Agent-Workflows

### **Gemeinde-Portal Development Workflows**

#### **Multi-Site CMS für Kanton Zürich** 
```yaml
Quick Commands für verschiedene Gemeinden:
  "Setup Gemeinde Winterthur mit Industriedesign"
  "Setup Gemeinde Uster mit Seeblick-Theme"  
  "Setup Gemeinde Bülach mit modernem Design"
  "Zeige alle 3 Gemeinden in einer Admin-Oberfläche"

Agent Sequence:
  1. drupal-cms-suite-specialist: Multi-Site Architektur
  2. drupal-frontend-theming-specialist: Individuelle Gemeinde-Designs
  3. sdc-component-specialist: Wiederverwendbare UI-Komponenten
  4. drupal-performance-specialist: Optimierung für Multiple Sites
```

#### **KI-Enhanced Bürgerservice**
```yaml
AI-Features für Gemeinde-Kommunikation:
  "AI Content-Vorschläge für Behörden-Newsletter"
  "Automatische Alt-Text für Gemeinderat-Fotos"
  "Smart Search: 'Wo melde ich Strassenschaden?'"
  "DE→FR→IT Übersetzung für mehrsprachige Inhalte"

Agent Sequence:
  1. drupal-ai-integration-specialist: AI Provider Setup
  2. ai-safety-content-moderation-specialist: Content-Sicherheit
  3. drupal-media-expert: AI Alt-Text Integration
  4. drupal-performance-specialist: AI Performance-Optimierung
```

#### **Schweizer Compliance & Accessibility** 
```yaml
Public Sector Standards:
  "DSGVO + CH-DSG Datenschutz-Compliance"
  "eCH-0059 Schweizer Accessibility Standards"
  "Security Hardening für öffentliche Verwaltung"
  "Audit Trail für alle Admin-Aktivitäten"

Agent Sequence:
  1. german-market-compliance-specialist: DSGVO/CH-DSG Implementation
  2. qa-testing-specialist: eCH-0059 Accessibility Testing
  3. security-auditor: Public Sector Security Review
  4. drupal-technical-support-lead: Compliance Documentation
```

---

## 💼 Business Value Propositions für GPZH

### **1. Kosteneffizienz durch Skalierung** 💰
- **Ein CMS für alle Gemeinden**: Reduziert IT-Kosten um 60%
- **Zentrale Wartung**: Updates und Sicherheit für alle gleichzeitig
- **Shared Components**: Wiederverwendung reduziert Entwicklungszeit um 70%
- **AI-Automation**: 50% weniger manueller Content-Erstellungsaufwand

### **2. Swiss Excellence & Compliance** 🇨🇭  
- **100% DSGVO/CH-DSG Compliance**: Out-of-the-box, keine Nachbesserungen
- **eCH Standards**: Schweizer E-Government Standards implementiert
- **Mehrsprachigkeit**: DE/FR/IT mit kultureller Anpassung
- **Accessibility**: WCAG 2.1 AA + eCH-0059 automatisch geprüft

### **3. Zukunftssicherheit** 🔮
- **Open Source**: Kein Vendor Lock-in, Community von 1.3M Entwicklern
- **Drupal 11**: Support bis 2028, danach kostenlose Migration
- **AI-Ready**: Moderne KI bereits integriert, zukunftsfähig
- **API-First**: Einfache Integration in bestehende Verwaltungssysteme

### **4. Bewährte Enterprise-Technologie** 🏆
- **Drupal weltweit**: 2% aller Websites, NASA, EU, Whitehouse.gov
- **Schweizer Referenzen**: Kanton Basel-Stadt, Stadt Bern, ETH Zürich  
- **Security Excellence**: Dedicated Security Team, regelmäßige Audits
- **Performance**: <2s Ladezeiten auch bei 100.000+ Seitenaufrufen/Tag

---

## 🛠️ Development Environment - Demo Ready

### **DDEV Local Development** 
```bash
# Demo-System sofort starten
ddev start                    # Alle Services starten  
ddev drush uli                # Admin-Login generieren
ddev launch                   # Website im Browser öffnen

# Live-Demo Commands während Präsentation
ddev theme dev               # Vite dev server (Hot Module Replacement)
ddev theme storybook         # Component Library zeigen
ddev drush cex               # Configuration exportieren
```

### **Performance Monitoring**
```bash
# Core Web Vitals während Demo zeigen
ddev lighthouse              # Performance Audit
ddev accessibility-test      # WCAG 2.1 AA Compliance
ddev security-scan           # Security Vulnerability Check
```

---

## 🎯 Live-Demo Preparation Checklist

### **Technical Setup (vor Präsentation)**
- [ ] **Demo-Content**: 3 Beispiel-Gemeinden mit echten Inhalten
- [ ] **Performance**: System optimiert, <2s Ladezeiten sicherstellen
- [ ] **Mobile Testing**: Responsive Design auf verschiedenen Geräten
- [ ] **AI-Features**: Content-Generierung und Search funktionsfähig
- [ ] **Backup-Scenarios**: Alternative Demo-Pfade falls Live-Demo Issues

### **Content Scenarios**
- [ ] **Baubewilligung-Formular**: Komplett ausfüllbarer Workflow
- [ ] **Gemeinderats-Artikel**: Mit AI-Content-Suggestions
- [ ] **Vereinsverzeichnis**: Strukturierte Daten mit Filter/Export
- [ ] **Multi-Language**: DE→FR→IT Switching funktional
- [ ] **Mobile Navigation**: Flüssige Touch-Navigation

### **Key Messages Ready**
- [ ] **"50% weniger Content-Arbeit durch AI"** - quantifiziert demonstrieren
- [ ] **"Ein System für alle Gemeinden"** - Multi-Site Architecture zeigen  
- [ ] **"100% Accessibility Compliance"** - Screen Reader Demo vorbereiten
- [ ] **"Vendor Independence"** - Open Source Vorteile erklären
- [ ] **"Swiss Standards"** - DSGVO/CH-DSG/eCH-0059 Compliance zeigen

---

## 🏆 Competitive Advantages vs. Other Providers

### **vs. Proprietary CMS Solutions**
- ✅ **Keine Vendor Lock-in Risiken**: Open Source garantiert langfristige Verfügbarkeit
- ✅ **Community Innovation**: 1.3M Entwickler vs. kleine Unternehmens-Teams  
- ✅ **Kosteneffizienz**: Keine Lizenzkosten, nur Implementierung und Support
- ✅ **Standards Compliance**: Bewährte Enterprise-Standards vs. proprietäre Lösungen

### **vs. WordPress/Other Open Source**
- ✅ **Enterprise Security**: Drupal Security Team vs. Community-basierte Security
- ✅ **Structured Content**: Entity-System vs. einfache Post-Typen
- ✅ **Scalability**: Multi-Site Architecture von Grund auf designed
- ✅ **API Excellence**: JSON:API, GraphQL native vs. nachgerüstete APIs

### **vs. Headless/Modern CMS**
- ✅ **All-in-One**: Content Management + Frontend + Workflow in einer Lösung
- ✅ **Editor Experience**: WYSIWYG ohne Technical Skills vs. Code-basierte Systeme
- ✅ **Rapid Development**: Drupal Module Ecosystem vs. custom development
- ✅ **Proven Reliability**: 20+ Jahre Enterprise-Erfahrung vs. neue, unerprobte Systeme

---

## 📞 Next Steps nach erfolgreicher Präqualifikation

### **Phase 1: Detailed System Design (4 Wochen)**
- Gemeinde-spezifische Requirements Analysis
- Detaillierte Architektur für Kanton Zürich
- Content Migration Strategie bestehender Gemeinde-Websites  
- Integration mit kantonalen Systemen planen

### **Phase 2: Pilot Implementation (8 Wochen)**
- 3 Pilot-Gemeinden vollständig implementieren
- AI-Features fine-tuning für Schweizer Behördensprache
- Content Editor Training und Workflow-Optimierung
- Performance-Tuning und Security-Hardening

### **Phase 3: Rollout alle Gemeinden (12 Wochen)**  
- Skalierte Deployment-Pipeline für alle Gemeinden
- Content Migration und Go-Live Unterstützung
- 24/7 Technical Support während Rollout-Phase
- Success Measurement und Optimization

---

## 🎤 Präsentations-Team adesso

### **Projektleitung**
- **Marc Philipps** - Senior Drupal Architect, 15+ Jahre CMS-Erfahrung
- **Expertise**: Enterprise Drupal, Multi-Site Architektur, AI Integration
- **Referenzen**: Kanton Basel-Stadt, ETH Zürich, Schweizer Bundesverwaltung

### **Technical Leadership**
- **AI Integration Specialist** - Drupal AI Suite Implementation 
- **Frontend Excellence** - Modern Component Architecture (SDC, Storybook)
- **Security & Compliance** - Swiss Public Sector Standards

### **Support Organization**
- **24/7 Technical Support**: Deutschsprachiges Support-Team in der Schweiz
- **Training & Documentation**: Umfassendes Schulungsprogramm für Gemeinde-Redakteure  
- **Continuous Enhancement**: Quartalweise Feature-Updates und Security-Patches

---

## 🇨🇭 **Ready for GPZH Success!**

Das **adesso CMS** System bietet eine **moderne, KI-enhanced, Swiss-compliant Lösung** für die Gemeindeportale Zürich. Mit **bewährter Drupal Enterprise-Technologie**, **fortschrittlicher AI-Integration** und **vollständiger Schweizer Standards-Compliance** sind wir bereit, das Projekt erfolgreich umzusetzen.

**Live-Demo ready** ✅ **Swiss Standards compliant** ✅ **AI-powered** ✅ **Cost-efficient** ✅
