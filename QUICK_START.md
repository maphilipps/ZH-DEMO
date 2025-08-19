# GPZH Quick Start Guide

## 🚀 ZH-DEMO Entwicklung: Von 0 auf 100 in 15 Minuten

Willkommen beim **GPZH (Gemeindeportale Zürich) ZH-DEMO** Prototyp! Dieses Quick Start Guide bringt Sie als neuer Entwickler schnell auf den neuesten Stand für die Mitarbeit am modernsten Drupal 11.2.2 Multi-Site System mit KI-Integration für Schweizer Gemeinden.

## 📋 Voraussetzungen (5 Minuten)

### **System Requirements**
```yaml
Required Software:
  - Docker Desktop (neueste Version)
  - DDEV (v1.22+) 
  - Node.js 20+ mit Corepack
  - Git
  - VS Code oder PhpStorm
  - Chrome/Firefox für Testing
  
Optional (aber empfohlen):
  - tmux für parallele Entwicklung
  - Claude Code CLI für MCP Integration
```

### **Accounts & Zugriff**
```yaml
Benötigte Accounts:
  - GitHub: Zugriff auf adesso-cms Repository
  - Jira: GPZH Projekt Zugriff (https://adesso.atlassian.net)
  - Claude Code: MCP Server Integration
  
API Keys (optional für Advanced Features):
  - OpenAI API Key (für AI Content)
  - Anthropic API Key (für Claude AI)
  - GitHub Personal Access Token
```

## ⚡ Schnellstart (10 Minuten)

### **1. Repository Clone & Setup**
```bash
# Repository klonen
git clone https://github.com/adesso/zh-demo.git
cd zh-demo

# In feature/GPZH-30 Branch wechseln (neuester Stand)
git checkout feature/GPZH-30-drupal-installation-separate-configs

# DDEV Environment starten
ddev start
```

### **2. Automatische Installation**
```bash
# ZH-DEMO komplett installieren (Drupal + Multi-Site + AI)
./launch-adesso-cms.sh

# Oder manuelle Installation:
ddev composer install
ddev drush site:install --existing-config
ddev drush uli  # Admin Login generieren
```

### **3. Multi-Site Validierung**
```bash
# Alle 3 Gemeinde-Sites testen
ddev launch thalwil.zh-demo.ddev.site   # Moderne Stadt am See
ddev launch thalheim.zh-demo.ddev.site  # Weinland-Gemeinde
ddev launch erlenbach.zh-demo.ddev.site # Goldküste Premium

# Admin-Bereich
ddev launch zh-demo.ddev.site/admin     # Haupt-Administration
```

## 🏗️ Projektarchitektur verstehen

### **Multi-Site Struktur**
```yaml
ZH-DEMO Architektur:
  Gemeinden:
    Thalwil: Moderne Seestadt (Blau #1E3A8A)
    Thalheim: Weinland-Charakter (Grün #15803D)  
    Erlenbach: Goldküste Exklusiv (Türkis #0891B2)
    
  Shared Infrastructure:
    - Drupal 11.2.2 Core
    - AI Integration (GPT-4o, Claude, Groq)
    - Modern Frontend (Vite, Tailwind CSS v4)
    - SDC Component Library
    - Multi-Language Support (DE/FR/IT)
```

### **Wichtige Verzeichnisse**
```bash
# Konfiguration (Shared + Municipality-specific)
config/sync/              # Basis-Konfiguration
config/sync_thalwil/      # Thalwil-spezifische Config
config/sync_thalheim/     # Thalheim-spezifische Config  
config/sync_erlenbach/    # Erlenbach-spezifische Config

# Themes & Frontend
web/themes/custom/adesso_cms_theme/    # Haupt-Theme
web/themes/custom/adesso_cms_theme/components/  # SDC Komponenten

# Custom Modules
web/modules/custom/       # Projekt-spezifische Module
web/modules/contrib/mcp/  # Drupal MCP Integration

# Documentation
docs/adrs/               # Architecture Decision Records
.ddev/CLAUDE.md         # DDEV Entwicklungsguide
tests/CLAUDE.md         # Testing Strategy
```

## 🎯 Jira Workflow Integration

### **GPZH Ticket System**
```yaml
Ticket-Namenskonvention:
  GPZH-XXX: Hauptfeature (z.B. GPZH-30 Multi-Site Setup)
  
Branch-Namenskonvention:
  feature/GPZH-XXX-beschreibung
  fix/GPZH-XXX-bugfix
  content/GPZH-XXX-municipality-content
```

### **Entwicklungsworkflow**
```bash
# 1. Neues Jira Ticket starten
@jira-start GPZH-XXX  # Wenn Claude Code installiert

# Oder manuell:
git checkout -b feature/GPZH-XXX-description
ddev start

# 2. Development work...

# 3. Testing vor PR
@playwright-test-municipality --all-sites  # MCP Command
# Oder:
ddev npm run test:e2e

# 4. PR erstellen
@jira-pr GPZH-XXX  # Automatische PR-Erstellung mit Jira-Integration
```

## 🤖 AI & MCP Integration

### **MCP (Model Context Protocol) Setup**
```bash
# MCP Server Installation (optional, aber sehr empfohlen)
./mcp-install-gpzh.sh

# Oder manuell:
# 1. Claude Code installieren
npm install -g claude-code

# 2. MCP Server Configuration
export JIRA_API_TOKEN="your_token"
export GITHUB_PERSONAL_ACCESS_TOKEN="your_token"
export GPZH_MUNICIPALITIES="thalwil,thalheim,erlenbach"
```

### **AI Content Features testen**
```bash
# AI Content Generation testen
ddev drush ai:status
ddev drush ai:generate "Gemeinderat News" --municipality=thalwil

# AI Alt-Text für Bilder
ddev drush ai:alt-text "/path/to/image.jpg"

# Multi-Language Translation
ddev drush ai:translate de-fr "German text"
```

## 🧪 Testing & Quality Assurance

### **Schnelle Test-Suite**
```bash
# Frontend Development mit Hot Reload
ddev theme dev          # Startet Vite auf :5173

# Komponenten-Dokumentation
ddev theme storybook    # Startet Storybook auf :6006

# Basis-Tests
ddev npm run test       # Unit Tests
ddev npm run test:e2e   # E2E Tests (alle 3 Gemeinden)

# Performance & Accessibility 
ddev npm run qa:full    # Komplette QA-Pipeline
```

### **Multi-Municipality Testing**
```bash
# Alle Gemeinden gleichzeitig testen
for site in thalwil thalheim erlenbach; do
  echo "Testing $site..."
  curl -s "https://$site.zh-demo.ddev.site" > /dev/null && echo "✓ $site OK"
done

# MCP-enhanced Testing (wenn verfügbar)
@playwright-test-municipality --all-sites --generate-evidence
@browser-audit-performance --all-municipalities --target-score=90
```

## 🎨 Frontend Development

### **Theme Development Workflow**
```bash
# Development mit Live-Reload
ddev theme dev     # Vite dev server (:5173)

# Komponenten entwickeln
ddev theme storybook  # Storybook UI (:6006)

# Production Build
ddev theme build   # Optimierte Assets generieren
```

### **SDC Komponenten**
```yaml
Component Library:
  - Hero: Große Titel-Bereiche mit Hintergrund
  - Card: Content-Karten für News/Events
  - Navigation: Responsive Haupt-Navigation
  - Forms: Accessible Formular-Komponenten
  - Media: Bild/Video-Integration mit AI Alt-Text
  
Location: web/themes/custom/adesso_cms_theme/components/
```

## 🇨🇭 Swiss Compliance & Standards

### **Wichtige Compliance-Bereiche**
```yaml
Swiss Standards:
  WCAG 2.1 AA: Web Accessibility (automatisch getestet)
  eCH-0059: Schweizer Accessibility Standards
  GDPR/CH-DSG: Datenschutz-Compliance
  Core Web Vitals: Performance >90 Score
  
Automatische Überprüfung:
  - Bei jedem Build: Accessibility-Tests
  - Bei jedem PR: Performance-Audit
  - Täglich: Compliance-Monitoring
```

### **Multi-Language Support**
```yaml
Sprachen-Hierarchie:
  Primär: Deutsch (Schweizer Hochdeutsch)
  Sekundär: Französisch (Schweizer Französisch)
  Tertiär: Italienisch (Schweizer Italienisch)
  
Content-Strategie:
  - Essential Services: Alle Sprachen
  - News/Events: DE + FR
  - Cultural Content: DE primär
```

## 🔧 Development Tools & Commands

### **DDEV Kommandos**
```bash
# Basics
ddev start              # Environment starten
ddev stop               # Environment stoppen  
ddev restart            # Neustart
ddev logs --follow      # Live-Logs anzeigen

# Drupal Operations
ddev drush cr           # Cache leeren
ddev drush cex          # Config exportieren
ddev drush cim          # Config importieren
ddev drush uli          # Admin-Login

# Multi-Site Operations
ddev drush --uri=thalwil.zh-demo.ddev.site cr    # Site-spezifisch
ddev drush --uri=thalheim.zh-demo.ddev.site uli
ddev drush --uri=erlenbach.zh-demo.ddev.site cex
```

### **Git Workflow**
```bash
# Feature Development
git checkout -b feature/GPZH-XXX-description
# Development work...
git add .
git commit -m "feat: GPZH-XXX description

Completes GPZH-XXX

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# PR erstellen
git push -u origin feature/GPZH-XXX-description
# Dann GitHub PR erstellen oder @jira-pr verwenden
```

## 🚨 Troubleshooting

### **Häufige Probleme & Lösungen**

#### **DDEV startet nicht**
```bash
# Docker Status prüfen
docker ps

# DDEV neu starten
ddev poweroff
ddev start

# Ports freigeben (falls belegt)
ddev stop --all
```

#### **Multi-Site URLs nicht erreichbar**
```bash
# DDEV Hostname Konfiguration prüfen
ddev describe

# Sites.php validieren
cat web/sites/sites.php

# DNS-Auflösung testen
ping thalwil.zh-demo.ddev.site
```

#### **Performance Issues**
```bash
# Cache leeren (alle Sites)
for site in default thalwil thalheim erlenbach; do
  ddev drush --uri=$site.zh-demo.ddev.site cr
done

# Docker System aufräumen
docker system prune
```

#### **AI Features funktionieren nicht**
```bash
# AI Provider Status prüfen
ddev drush ai:status

# API Keys validieren
ddev exec env | grep -i api

# AI Module neu installieren
ddev composer require drupal/ai
ddev drush en ai ai_content_suggestions -y
```

## 📚 Wichtige Dokumentation

### **Projekt-spezifische Guides**
- **[CLAUDE.md](CLAUDE.md)**: Hauptprojekt-Dokumentation
- **[LEARNINGS.md](LEARNINGS.md)**: Entwicklungserkenntnisse und Best Practices
- **[.ddev/CLAUDE.md](.ddev/CLAUDE.md)**: DDEV Environment Guide
- **[tests/CLAUDE.md](tests/CLAUDE.md)**: Testing Strategy & QA
- **[gemeinden/CLAUDE.md](gemeinden/CLAUDE.md)**: Municipality Content Guidelines

### **Architecture Decision Records**
- **[ADR-001](docs/adrs/20250118-gpzh-multi-site-architecture.md)**: Multi-Site Architecture
- **[ADR-002](docs/adrs/20250118-gpzh-ai-integration-approach.md)**: AI Integration
- **[ADR-003](docs/adrs/20250118-gpzh-mcp-workflow-automation.md)**: MCP Workflow
- **[ADR-004](docs/adrs/20250118-gpzh-swiss-compliance-implementation.md)**: Swiss Compliance

### **External Resources**
- **[Drupal 11 Documentation](https://www.drupal.org/docs/drupal-apis)**
- **[DDEV Documentation](https://ddev.readthedocs.io/)**
- **[Swiss eCH Standards](https://www.ech.ch/)**
- **[WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)**

## 🎯 Nächste Schritte

### **Als neuer Entwickler:**
1. **Setup abschließen**: Alle 3 Municipality-Sites erfolgreich laden
2. **Erste Änderung**: Kleine Content-Änderung in einer Gemeinde machen
3. **Testing lernen**: Playwright-Tests verstehen und ausführen
4. **Jira Integration**: Ersten GPZH-Ticket bearbeiten
5. **MCP erkunden**: Erste AI-Features ausprobieren

### **Advanced Development:**
1. **Neue SDC Komponente**: Eigene Komponente für alle Gemeinden entwickeln
2. **AI Integration**: Neue AI-Features für Municipal Content
3. **Performance Optimization**: Core Web Vitals >95 erreichen
4. **Swiss Compliance**: eCH-0059 Testing vertiefen

## 💬 Support & Community

### **Bei Fragen oder Problemen:**
- **Jira**: Ticket in GPZH-Projekt erstellen
- **GitHub**: Issues oder Discussions
- **Documentation**: Alle Guides in diesem Repository
- **Claude Code**: `@claude` für automatisierte Hilfe (wenn MCP installiert)

### **Projekt Team:**
- **Marc Philipps**: Senior Drupal Architect & Project Lead
- **AI Integration**: Claude Code Assistant
- **QA**: Automatisierte Testing Pipelines
- **Compliance**: Swiss Standards Implementation

---

## ✅ Erfolgreich, wenn...

Nach diesem Quick Start sollten Sie:
- ✅ Alle 3 Gemeinde-Sites erfolgreich laden können
- ✅ DDEV Environment fehlerfrei laufen haben
- ✅ Grundlegende Drupal-Operationen verstehen
- ✅ Git-Workflow für GPZH-Tickets kennen
- ✅ Testing-Pipeline erfolgreich ausführen können
- ✅ Swiss Compliance Grundlagen verstehen

**Willkommen im GPZH Team! 🇨🇭🚀**

*Letztes Update: 2025-01-18 - Optimiert für GPZH-30 Multi-Site Completion*