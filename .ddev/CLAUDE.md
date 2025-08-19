# DDEV Development Environment Guide - ZH-DEMO Prototyp

Dieses Verzeichnis enthält die DDEV-Konfiguration für den **ZH-DEMO Prototyp** - ein Drupal 11 System für die GPZH (Gemeindeportale Zürich) Präqualifikations-Präsentation.

## 🎯 Jira Integration für DDEV Workflow

### **Jira-DDEV Development Workflow**
```
Jira Ticket → DDEV Environment → Development → Testing → PR with @claude Review
```

### **Jira Commands für DDEV**
```bash
# Jira-integrierte DDEV Commands
@jira-ddev-start GPZH-XXX     # Start DDEV environment for Jira ticket
@jira-ddev-test GPZH-XXX      # Test changes for Jira ticket
@jira-ddev-build GPZH-XXX     # Build assets for Jira ticket
@jira-ddev-deploy GPZH-XXX    # Prepare deployment for Jira ticket

# MCP-Enhanced DDEV Commands
@mcp-ddev-validate GPZH-XXX   # Use MCP servers to validate environment
@playwright-test-all GPZH-XXX # Run Playwright tests across all municipalities
@browser-audit-all GPZH-XXX   # Performance/accessibility audit via MCP
```

## GPZH Prototyp Development Environment

### **Automatische Entwicklungsumgebung**
Das ZH-DEMO System ist optimal konfiguriert für die Entwicklung und Demonstration von Gemeinde-Portal Funktionalitäten:

```yaml
Prototyp-Features:
  - Drupal 11.2.2 mit PHP 8.3
  - Multi-Site Architektur für verschiedene Gemeinden
  - AI-Integration für Content-Generierung
  - Moderne Frontend-Tools (Vite, Tailwind CSS v4)
  - Storybook-Komponenten-Dokumentation
```

## DDEV Konfiguration Übersicht

### **Aktuelle Umgebungs-Stack**
```yaml
Services:
  web:
    - drupal11 mit PHP 8.3
    - nginx-fpm für optimale Performance  
    - Node.js 20 mit Corepack
    - Vite dev server (:5173)
    - Storybook server (:6006)
    
  db:
    - MariaDB 10.11 enterprise-grade
    - Optimiert für Drupal Performance
    
  mailpit:
    - E-Mail Testing und Debugging
    - SMTP Server Simulation
```

### **GPZH Entwicklungs-Commands mit Jira Integration**
```bash
# Basis-Umgebung mit Jira-Tracking
ddev start                    # ZH-DEMO Umgebung starten
ddev stop                     # Alle Services stoppen
ddev restart                  # Neustart mit frischen Containern
ddev logs --follow           # Live-Logs für Debugging

# Jira-spezifische DDEV Commands
@jira-ddev-fresh GPZH-XXX    # Fresh DDEV environment for ticket
@jira-ddev-branch GPZH-XXX   # Create branch and start DDEV
@jira-ddev-sync GPZH-XXX     # Sync database for ticket testing

# Theme-Entwicklung für Gemeinde-Portale
ddev theme dev               # Vite HMR Entwicklung (:5173)
ddev theme build             # Produktions-Asset-Kompilierung
ddev theme watch             # Watch-Modus mit Live-Reload
ddev theme storybook         # Komponenten-Dokumentation (:6006)

# Drupal-Operations für Gemeinde-Content
ddev drush cr                # Drupal Caches leeren
ddev drush cex               # Konfiguration exportieren
ddev drush cim               # Konfiguration importieren
ddev drush uli               # Admin-Login generieren

# Multi-Site Verwaltung mit Jira-Context
@multi-site-test GPZH-XXX    # Test across all municipalities for ticket
ddev drush --uri=thalwil.gpzh.local cr      # Cache für Thalwil
ddev drush --uri=thalheim.gpzh.local cr     # Cache für Thalheim
ddev drush --uri=erlenbach.gpzh.local cr    # Cache für Erlenbach
```

## GPZH Prototyp Workflow

### **1. Gemeinde-Site Entwicklung**
```bash
# Entwicklung für spezifische Gemeinden
# Beispiel: Neue Funktionalität für Erlenbach

# Entwicklungsumgebung starten
ddev start                               # ZH-DEMO Environment
ddev theme dev                          # Frontend-Entwicklung
ddev launch erlenbach.zh-demo.ddev.site # Erlenbach-Site öffnen

# Content-Entwicklung mit AI
ddev drush ai:generate-content "Gemeinderatssitzung" # AI Content-Generation
ddev drush ai:translate de-fr "Content"              # Mehrsprachigkeit
```

### **2. Multi-Site Testing Workflow**
```yaml
Gemeinde-Testing:
  1. Erlenbach (Seegemeinde):
     - URL: https://erlenbach.zh-demo.ddev.site
     - Design: Zürichsee-Ästhetik
     - Features: Tourismus, Vereinsleben
     
  2. Thalheim (Ländlich):
     - URL: https://thalheim.zh-demo.ddev.site  
     - Design: Weinland-Charakter
     - Features: Landwirtschaft, Verwaltung
     
  3. Thalwil (Modern):
     - URL: https://thalwil.zh-demo.ddev.site
     - Design: Zeitgemäß-urban
     - Features: Online-Services, Klimaschutz
```

### **3. GPZH Präsentations-Vorbereitung**
```bash
# Präsentations-System vorbereiten
ddev start --fresh                      # Frische Umgebung
ddev drush sql:sync @prod @local        # Aktuelle Demo-Daten
ddev theme build                        # Produktions-Build
ddev launch                             # System für Demo öffnen

# Performance-Validierung
ddev exec npm run test:performance      # Lighthouse-Audit
ddev exec npm run test:accessibility    # WCAG 2.1 AA Compliance
```

## Gemeinde-spezifische Konfiguration

### **Multi-Site Setup**
```yaml
# sites/sites.php Konfiguration
Sites:
  erlenbach.zh-demo.ddev.site: sites/erlenbach
  thalheim.zh-demo.ddev.site: sites/thalheim  
  thalwil.zh-demo.ddev.site: sites/thalwil
  zh-demo.ddev.site: sites/default  # Haupt-Administration
```

### **Gemeinde-Theme Konfiguration**
```javascript
// Vite-Konfiguration für Multi-Site Themes
export default {
  build: {
    rollupOptions: {
      input: {
        erlenbach: 'src/themes/erlenbach/main.js',
        thalheim: 'src/themes/thalheim/main.js', 
        thalwil: 'src/themes/thalwil/main.js',
        admin: 'src/themes/admin/main.js'
      }
    }
  }
}
```

## MCP Integration für GPZH Development

### **MCP Server Configuration**
```bash
# Required MCP servers for GPZH development
export MCP_SERVERS="atlassian,github,playwright,browser-tools,puppeteer,sequential-thinking,memory,context7"

# Environment variables for MCP integration
export JIRA_API_TOKEN="your_jira_token"
export GITHUB_PERSONAL_ACCESS_TOKEN="your_github_token" 
export GPZH_BASE_URL="https://zh-demo.ddev.site"
export GPZH_MUNICIPALITIES="thalwil,thalheim,erlenbach"
```

### **MCP-Enhanced DDEV Workflows**
```bash
# Multi-municipality testing with MCP
ddev start && @playwright-test-municipality --all-sites

# Performance monitoring during development
ddev exec @browser-audit-performance --all-municipalities

# Jira integration for task management
@jira-create-ticket --type="Story" --project="GPZH" --summary="[Description]"
@jira-link-pr GPZH-XXX --branch="feature/GPZH-XXX-description"

# Context7 for Drupal 11.2.2 documentation
@context7-resolve "drupal-multi-site-configuration"
@context7-get-docs "drupal/core" --version="11.2.2"
```

### **Automated Quality Gates**
```bash
# Comprehensive quality validation
ddev exec @gpzh-qa-pipeline GPZH-XXX
# This runs:
# - Playwright multi-site testing
# - Browser-tools performance audits
# - Accessibility validation (WCAG 2.1 AA + eCH-0059)
# - Jira acceptance criteria verification
```

## AI-Integration für Gemeinde-Content

### **AI-Enhanced Development**
```bash
# AI-Services testen
ddev drush ai:status                     # AI Provider Status prüfen
ddev drush ai:test-connection openai     # OpenAI Verbindung testen
ddev drush ai:test-connection anthropic  # Claude Verbindung testen

# Content-Generierung für Gemeinden
ddev drush ai:generate "Pressemitteilung Gemeinderat" --site=erlenbach
ddev drush ai:translate de-fr "Inhalt" --site=thalwil
ddev drush ai:moderate-content "User Generated Content"
```

### **Schweizer Standards Integration**
```yaml
AI Content Standards:
  - Behördensprache (Schweizer Amtsdeutsch)
  - GDPR/DSG-konforme Datenverarbeitung
  - Mehrsprachigkeit (DE/FR/IT)
  - Barrierefreie Alt-Texte
```

## Testing für GPZH Demonstration

### **Automatisierte Qualitätssicherung**
```bash
# Comprehensive Testing vor Präsentation
ddev exec npm run test:full              # Komplette Testing-Suite

# Einzelne Test-Kategorien  
ddev exec npm run test:unit              # Unit-Tests
ddev exec npm run test:e2e               # End-to-End Tests
ddev exec npm run test:visual            # Visual Regression
ddev exec npm run test:performance       # Performance-Tests
ddev exec npm run test:accessibility     # Accessibility-Tests
```

### **Multi-Site Testing**
```bash
# Alle Gemeinde-Sites testen
for site in erlenbach thalheim thalwil; do
  echo "Testing $site..."
  ddev exec curl -s "https://$site.zh-demo.ddev.site" > /dev/null && echo "✓ $site OK"
done

# Responsive Testing
ddev exec npm run test:responsive        # Mobile/Tablet/Desktop
ddev exec npm run test:browsers          # Chrome/Firefox/Safari
```

## Performance-Optimierung

### **GPZH-Spezifische Optimierungen**
```bash
# Gemeinde-Site Performance
ddev config --performance-mode=mutagen  # File-Sync Optimierung
ddev restart                            # Änderungen anwenden

# Cache-Strategien
ddev drush cr                           # Drupal Cache
ddev exec npm run build:optimized       # Asset-Optimierung
```

### **Schweizer Hosting-Optimierung**
```yaml
Swiss Hosting Preparation:
  - CDN-ready Asset-Struktur
  - GDPR-konforme Session-Handling
  - Multi-Language URL-Struktur  
  - Accessibility-optimierte Assets
```

## Troubleshooting für GPZH Demo

### **Häufige Demo-Probleme**
```bash
# Site nicht erreichbar
ddev describe                           # Port-Zuweisungen prüfen
ddev logs web                          # Web-Service Logs
ddev restart                           # Services neustarten

# Multi-Site Probleme
ddev exec ls -la web/sites/            # Sites-Struktur prüfen
ddev drush status --uri=erlenbach.zh-demo.ddev.site  # Site-Status

# Performance-Probleme
ddev exec htop                         # Container-Ressourcen
docker system prune                   # Docker aufräumen
```

### **AI-Integration Debugging**
```bash
# AI-Service Probleme
ddev logs | grep -i "ai\|openai\|anthropic"  # AI-Service Logs
ddev drush ai:debug                           # AI-Debug Informationen
ddev exec env | grep -i api                  # API-Keys prüfen
```

## GPZH Präsentations-Checkliste

### **Technische Vorbereitung**
```markdown
☐ ZH-DEMO Environment läuft stabil
☐ Alle drei Gemeinde-Sites sind erreichbar
☐ AI-Content-Generierung funktioniert
☐ Performance >90 Core Web Vitals Score
☐ Accessibility WCAG 2.1 AA compliant
☐ Mobile Responsiveness auf allen Sites
☐ Multi-Language Switching funktional
☐ Admin-Login für Live-Demo bereit
```

### **Content-Vorbereitung**
```markdown
☐ Beispiel-Content für alle Gemeinden
☐ Formular-Workflows demonstrierbar
☐ AI-generierte Inhalte als Showcase
☐ Bildergalerien mit Alt-Texten
☐ Mehrsprachige Navigationen
☐ Contact-Formulare funktional
```

### **Demo-Scenarios Ready**
```markdown
☐ Responsive Navigation (Mobile/Desktop)
☐ Content-Editor mit AI-Unterstützung  
☐ Formular-Builder Demonstration
☐ Multi-Site Administration
☐ Performance-Monitoring Live
☐ Accessibility Screen-Reader Demo
```

Dieses ZH-DEMO DDEV-Environment bietet eine vollständige Entwicklungsumgebung für die GPZH-Präqualifikations-Präsentation mit modernen Web-Standards, AI-Integration und optimaler Performance für Schweizer Gemeinde-Portale.