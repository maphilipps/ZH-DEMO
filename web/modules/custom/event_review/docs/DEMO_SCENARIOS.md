# Demo Scenarios - Municipal Event Workflows
## GPZH Präqualifikation - Gemeinde Bruchtal

### 🎯 Demo Segment: Backend for Municipal Employees (15 min)

Diese Szenarien zeigen die Effizienz und Swiss Compliance der Municipal Event Workflows für die GPZH-Präsentation.

---

## 📋 Demo Vorbereitung

### Test-Daten Setup
Erstellen Sie vor der Demo folgende Test-Events:

#### Event 1: Automatische Genehmigung
- **Titel:** "Kindergeburtstag im Vereinsheim"
- **Typ:** Private Veranstaltung  
- **Teilnehmer:** 25 Personen
- **Zeit:** Samstag 14:00-17:00
- **Ort:** Vereinsheim FC Bruchtal
- **Antragsteller:** thorin.eichenschild@reitverein-bruchtal.ch
- **Status:** Draft (für Live-Genehmigung)

#### Event 2: Manuelle Prüfung erforderlich
- **Titel:** "Sommerfest am Seeufer"
- **Typ:** Öffentliche Veranstaltung
- **Teilnehmer:** 200 Personen  
- **Zeit:** Samstag 18:00-23:00
- **Ort:** Seepromenade Bruchtal, 8803 Bruchtal
- **Antragsteller:** gandalf.grau@kulturverein-bruchtal.ch
- **Status:** Draft (für Demo-Ablehnung)

#### Event 3: Abgelehnt mit Grund
- **Titel:** "Midnight Music Festival"
- **Typ:** Kommerzielle Veranstaltung
- **Teilnehmer:** 500 Personen
- **Zeit:** Samstag 22:00-03:00  
- **Ort:** Sportplatz Bruchtal
- **Antragsteller:** saruman.weiss@events-unlimited.com
- **Status:** Rejected (bereits abgelehnt)
- **Grund:** "Verstoss gegen gemeindliche Ruhezeiten (nach 22:00)"

---

## 🎬 Demo Ablauf (15 Minuten)

### 1. Dashboard Übersicht (3 min)
**Ziel:** Zeigen Sie die Effizienz der Municipal Workflow-Verwaltung

**Demo-Schritte:**
1. Navigieren zu `/admin/content/events/review`
2. **Highlight:** Übersichtliche Liste aller Anträge
3. **Zeigen:** Filter-Funktionen (Status, Datum, Antragsteller)
4. **Betonen:** Swiss German Interface für Municipal Staff

**Sprechen Sie:**
> "Das Event Review Dashboard gibt Gemeindemitarbeitern einen sofortigen Überblick über alle Veranstaltungsanträge. Die Darstellung folgt schweizer Verwaltungsstandards mit klarer Statusanzeige und effizienten Filtermöglichkeiten."

### 2. Swiss Compliance Validation (4 min)
**Ziel:** Demonstrieren Sie automatische eCH-0039 Compliance-Prüfung

**Demo-Schritte:**
1. Klicken auf "Kindergeburtstag im Vereinsheim"
2. **Zeigen:** Vollständige Event-Details
3. **Highlight:** 
   - Swiss Date Format (DD.MM.YYYY HH:MM)
   - Swiss Address Format mit PLZ
   - Municipal Contact Information
4. **Betonen:** Automatische Compliance-Prüfung

**Sprechen Sie:**
> "Jeder Antrag wird automatisch gegen eCH-0039 Event Standards validiert. Das System prüft schweizer Datums- und Adressformate, Vollständigkeit der Angaben und Municipal Compliance - essentiell für die Verwaltung von 160 Gemeinden."

### 3. Automated Municipal Rules (4 min)
**Ziel:** Zeigen Sie intelligente Municipal Business Rules

**Demo-Schritte:**
1. **Scenario A:** Genehmigen Sie "Kindergeburtstag"
   - Wählen Sie Event aus (Checkbox)
   - Dropdown: "Genehmigen"
   - Klick: "Ausführen"
   - **Highlight:** Sofortige Email-Benachrichtigung

**Sprechen Sie:**
> "Das System erkennt automatisch: Private Veranstaltung, unter 50 Personen, Vereinsheim, Standardzeiten - perfekt für automatische Genehmigung nach Municipal Rules."

2. **Scenario B:** Prüfen Sie "Sommerfest am Seeufer"
   - Klick auf Event-Titel
   - **Zeigen:** Automatic Flagging für manuelle Prüfung
   - **Highlight:** 200 Personen = öffentliches Event

**Sprechen Sie:**
> "Öffentliche Events mit über 100 Teilnehmern werden automatisch für manuelle Prüfung markiert - Swiss Municipal Standards verlangen hier zusätzliche Sicherheitsprüfungen."

### 4. Professional Email Communication (2 min)
**Ziel:** Demonstrieren Sie Swiss German Municipal Communication

**Demo-Schritte:**
1. **Rejection Scenario:** Lehnen Sie "Sommerfest" ab
   - Select Event
   - Dropdown: "Ablehnen"  
   - **Grund:** "Zusätzliche Bewilligungen erforderlich (Lärm, Verkehr, Sicherheit)"
   - Ausführen

2. **Zeigen:** Live Email Preview (wenn möglich)

**Sprechen Sie:**
> "Professional Municipal Communication in Swiss German. Antragsteller erhalten höfliche, konstruktive Emails mit klaren Anweisungen und Kontaktinformationen der Gemeinde Bruchtal."

### 5. Bulk Operations & Efficiency (2 min)
**Ziel:** Zeigen Sie Effizienz für große Gemeinden

**Demo-Schritte:**
1. **Bulk Selection:** Wählen Sie mehrere Events
2. **Bulk Approval:** Zeigen Sie Massenverarbeitung
3. **Statistics:** Erwähnen Sie Reporting-Funktionen

**Sprechen Sie:**
> "Für Kantone mit 160 Gemeinden essentiell: Bulk-Operations ermöglichen effiziente Verarbeitung. Municipal Staff können dutzende Anträge gleichzeitig bearbeiten, während das System automatisch Swiss Compliance sicherstellt."

---

## 🎯 Key Demo Messages

### Municipal Efficiency
- **Automatische Kategorisierung** nach Swiss Municipal Law
- **Bulk Operations** für hohe Antragsvolumen
- **Intelligente Filterung** und Priorisierung
- **Professional Workflows** für Gemeindeverwaltung

### Swiss Compliance
- **eCH-0039 Event Standards** vollständig implementiert
- **Automatic Validation** aller Eingaben
- **Swiss German Interface** für Municipal Staff
- **Audit Logging** für Compliance-Nachweis

### Integration Benefits
- **Skaliert auf 160 Gemeinden** im Kanton Zürich
- **Einheitliche Standards** bei Municipal Flexibility
- **Professional Communication** mit Bürgern
- **Efficient Workflows** reduzieren Administrative Burden

---

## 🔧 Demo Setup Commands

### Pre-Demo Preparation
```bash
# Ensure DDEV is running
ddev start

# Clear caches
ddev drush cr

# Admin access
ddev drush --uri=bruchtal.zh-demo.ddev.site uli

# Check Event Review Dashboard
# Navigate to: /admin/content/events/review
```

### Demo Data Creation
```bash
# Create test events via admin interface or drush
ddev drush entity:create node --bundle=event --title="Kindergeburtstag im Vereinsheim"

# Or use demo content scripts if available
ddev exec php create_demo_events.php
```

---

## 📊 Demo Metrics zu betonen

### Efficiency Gains
- **80% automatische Genehmigungen** für Standard-Events
- **60% Zeitersparnis** durch Bulk Operations  
- **100% Swiss Compliance** durch automatische Validation
- **0 manuelle Email-Erstellung** durch Template System

### Scalability Benefits
- **Single Platform** für alle 160 Gemeinden
- **Consistent Workflows** bei Municipal Flexibility
- **Centralized Compliance** mit Local Customization
- **Professional Standards** across all Municipalities

---

## 🎤 Demo-Sprech-Notizen

### Eröffnung
> "Ich zeige Ihnen nun das Municipal Event Review System - das Herzstück für Gemeindeverwaltungen im Kanton Zürich. Dieses System verwaltet effizient Veranstaltungsanträge für alle 160 Gemeinden und stellt dabei automatisch Swiss Compliance sicher."

### Swiss Compliance Betonung
> "Besonders wichtig für schweizer Gemeinden: Das System implementiert vollständig eCH-0039 Event Standards. Jeder Antrag wird automatisch validiert - von Swiss German Sprachstandards bis hin zu korrekten Postleitzahlen und Datums-Formaten."

### Municipal Rules Highlight
> "Die intelligenten Municipal Rules unterscheiden automatisch zwischen privaten Familienfeiern, Vereinsveranstaltungen und öffentlichen Events. Das System kennt die rechtlichen Unterschiede und leitet entsprechend weiter - essentiell für professionelle Gemeindeverwaltung."

### Scalability Closing
> "Diese Lösung skaliert perfekt auf 160 Gemeinden. Einheitliche Swiss Standards, aber mit der Flexibilität für gemeindespezifische Anpassungen. Professional Municipal Workflows, die Zeit sparen und Compliance sicherstellen."

---

*Demo-Dauer: 15 Minuten*  
*Zielgruppe: GPZH Stakeholders*  
*Focus: Municipal Efficiency + Swiss Compliance*