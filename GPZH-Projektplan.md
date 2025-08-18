# GPZH Präqualifikations-Projektplan 
## adesso CMS - Gemeindeportale Zürich

**Dokument**: Projektplan für GPZH Präqualifikations-Präsentation  
**Datum**: 18. Januar 2025  
**Version**: 1.0  
**Projektleitung**: Marc Philipps, Senior Drupal Architect  

---

## 🎯 Projektziel

Vorbereitung des **adesso CMS Systems** für die erfolgreiche GPZH Präqualifikations-Präsentation vor dem **Kanton Zürich**. Ziel ist es, die technische Überlegenheit unserer **Drupal 11.2.2 + KI-Integration** Lösung für kommunale Webportale zu demonstrieren und die Präqualifikation zu bestehen.

### **Präsentations-Zeitrahmen**
- **Anbieterpräsentation**: 25 Minuten (Firma, Team, Vorgehen)
- **Systemdemonstration**: 35 Minuten (Live-Demo der CMS-Features)
- **Gesamt**: 60 Minuten Online-Präsentation via Microsoft Teams

### **Bewertungskriterien**
- **Fachkompetenz**: 0-5 Punkte für technische Expertise
- **Überzeugungskraft**: 0-5 Punkte für Präsentationsqualität  
- **Systemeignung**: 0-5 Punkte für Prototyp-Übereinstimmung
- **Innovation**: Bonus für KI-Features und moderne Architektur

---

## 📊 Aktueller Projektstand (IST-Analyse)

### **✅ Vorhandene Stärken**
| Bereich | Status | Details |
|---------|--------|---------|
| **Drupal 11.2.2 Core** | ✅ **Vollständig** | Neueste Version, Enterprise-ready |
| **KI-Integration** | ✅ **Implementiert** | GPT-4o, Claude, Groq Provider aktiv |
| **Frontend-Stack** | ✅ **Modern** | Vite 6.2.0 + Tailwind CSS v4 + Alpine.js |
| **SDC Components** | ✅ **25+ Komponenten** | Hero, Gallery, Forms, Navigation etc. |
| **Storybook Dokumentation** | ✅ **8.6.7** | Professionelle Komponenten-Docs |
| **Testing Framework** | ✅ **Umfassend** | BackstopJS, Vitest, Playwright |
| **Development Environment** | ✅ **DDEV Ready** | Lokale Entwicklungsumgebung läuft |
| **Responsive Design** | ✅ **Mobile-First** | Tailwind CSS v4 responsive Grid |

### **⚠️ Identifizierte Lücken für GPZH**
| Bereich | Status | Erforderliche Maßnahmen |
|---------|--------|-------------------------|
| **Multi-Site Setup** | ❌ **Fehlt** | 3 Beispiel-Gemeinden konfigurieren |
| **Demo-Content** | ❌ **Fehlt** | Realistische Gemeinde-Inhalte erstellen |
| **Baubewilligung-Formular** | ❌ **Nicht konfiguriert** | Webform für Geschäftsprozess einrichten |
| **Vereinsverzeichnis** | ❌ **Nicht implementiert** | Strukturierte Daten mit Gastkonto-Workflow |
| **CH-Compliance** | ⚠️ **Teilweise** | DSGVO/CH-DSG + eCH-0059 Standards |
| **Performance Benchmarks** | ⚠️ **Nicht gemessen** | Core Web Vitals >90 nachweisen |
| **Mobile Touch-Navigation** | ⚠️ **Nicht optimiert** | Touch-Gesten für Gemeinde-User |

---

## 🗓️ Projektplan - 4 Phasen Ansatz

### **Phase 1: Sofortige Demo-Vorbereitung** ⚡
**Zeitraum**: 1-2 Tage | **Priorität**: 🔥 **KRITISCH**

#### **1.1 Demo-Content für 3 Beispiel-Gemeinden**
- **Winterthur**: Industrielle Gemeinde mit modernem Design
- **Uster**: Seegemeinde mit naturnahem Design  
- **Bülach**: Flughafengemeinde mit dynamischem Design

**Deliverables**:
```yaml
Gemeinde-spezifischer Content:
  - Startseite mit Hero-Image und Gemeinde-Info
  - Aktuelles/News-Bereich mit 5+ Artikeln
  - Dienstleistungen-Seiten (Baubewilligung, Anmeldungen)
  - Kontakt und Öffnungszeiten
  - Bildergalerie von Gemeinde-Highlights

Technische Umsetzung:
  - Drupal Multi-Site oder Theme-Varianten
  - Responsive Layouts für alle Geräte
  - SEO-optimierte Inhalte mit Meta-Tags
```

#### **1.2 Baubewilligung-Formular (Live-Demo Use-Case)**
**Szenario**: "Terrassenüberdachung Bewilligung Winterthur"

**Features**:
- Webform mit Drag-and-Drop Builder
- File-Upload für Baupläne
- Status-Workflow (Eingegangen → Prüfung → Genehmigt)
- E-Mail Benachrichtigungen an Bürger und Bauamt
- PDF-Export für Antragsdokumentation

#### **1.3 AI Content-Demo für Gemeinderats-Artikel**
**Szenario**: "Gemeinderat beschließt Verkehrsberuhigung Dorfkern"

**KI-Features demonstrieren**:
- AI Content-Vorschläge für Behördensprache
- Automatische Alt-Text Generation für Politiker-Fotos  
- SEO-Optimierung durch AI-Suggestions
- Responsive Vorschau für Mobile/Desktop

**Geschätzter Aufwand**: 16 Stunden
**Kritischer Pfad**: Demo-Content muss vor System-Tests fertig sein

---

### **Phase 2: GPZH-spezifische Features** 🎯
**Zeitraum**: 3-5 Tage | **Priorität**: 🔥 **HOCH**

#### **2.1 Multi-Site Architecture für verschiedene Gemeinde-Designs**
**Technische Implementierung**:
```yaml
Architektur-Optionen:
  Option A: Drupal Multi-Site (eine Installation, mehrere Domains)
  Option B: Theme-Varianten (ein Site, mehrere Designs)
  Option C: Sub-Themes (Basis-Theme + Gemeinde-spezifische Overrides)

Empfehlung: Option C - Sub-Themes
  - Schnelle Umsetzung für Demo
  - Einfache Wartung und Updates
  - Flexibles Design pro Gemeinde
  - Shared Components möglich
```

#### **2.2 Vereinsverzeichnis mit strukturierten Daten**
**Use-Case**: "Sportverein meldet neue Kontaktdaten selbst an"

**Features**:
- Gastkonto für Vereine (Self-Service Portal)
- Strukturierte Datenfelder (Name, Kategorie, Kontakt, Website)
- Workflow: Eingabe → Redaktions-Prüfung → Auto-Freischaltung
- Export als PDF für Gemeinde-Jahresheft
- Filter und Such-Funktionen für Bürger

#### **2.3 Performance-Optimierung für Live-Demo**
**Ziel**: Core Web Vitals >90 Scores

**Maßnahmen**:
- Drupal Cache-Optimierung (Render + Dynamic Page Cache)
- Vite Asset-Optimierung (Tree-Shaking, Minification)
- Image-Optimierung (WebP, Responsive Images)
- Critical CSS inline, non-critical async laden
- Database Query-Optimierung

**Messbare Ziele**:
- **Largest Contentful Paint (LCP)**: <2.5s
- **First Input Delay (FID)**: <100ms  
- **Cumulative Layout Shift (CLS)**: <0.1

#### **2.4 Mobile Touch-Navigation Enhancement**
**Features**:
- Touch-optimierte Navigation (min 44px Touch-Targets)
- Swipe-Gesten für Bildergalerien  
- Pull-to-Refresh für News-Updates
- Hamburger-Menü mit smooth Animationen
- iOS/Android native Scrolling-Verhalten

**Geschätzter Aufwand**: 24 Stunden
**Kritischer Pfad**: Performance-Tests vor Final-Demo

---

### **Phase 3: Swiss Compliance & Accessibility** 🇨🇭
**Zeitraum**: 1-2 Wochen | **Priorität**: 🟡 **MITTEL**

#### **3.1 DSGVO/CH-DSG Datenschutz-Compliance**
**Rechtliche Anforderungen**:
```yaml
DSGVO (EU) + CH-DSG (Schweiz) Requirements:
  - Einwilligungs-Management für Cookies
  - Datenschutzerklärung-Generator  
  - Recht auf Vergessenwerden (User-Data Export/Delete)
  - Privacy by Design in allen Forms
  - Audit-Trail für Admin-Aktivitäten

Technische Umsetzung:
  - EU Cookie Compliance Modul
  - Anonymisierung von Analytics-Daten
  - Sichere Form-Datenverarbeitung
  - SSL/TLS für alle Verbindungen
```

#### **3.2 eCH-0059 Schweizer Accessibility Standards**
**Standards**: WCAG 2.1 AA + eCH-0059 Ergänzungen

**Validierung**:
- Screen Reader Kompatibilität (NVDA, JAWS, VoiceOver)
- Keyboard-Navigation ohne Maus
- Farbkontrast-Ratio >4.5:1 für normale Texte
- Alternative Texte für alle Images
- Semantisches HTML (h1-h6 Hierarchie)
- Skip-Links für Navigation

**Testing-Tools**:
- axe-core Accessibility Testing
- Lighthouse Accessibility Audit  
- WAVE Web Accessibility Evaluator
- Manual Screen Reader Testing

#### **3.3 Public Sector Security Hardening**
**Security-Maßnahmen**:
- Drupal Security Module Updates
- Strong Password Policy für Admin-Accounts
- Two-Factor Authentication (2FA)
- Rate Limiting für Form-Submissions
- Content Security Policy (CSP) Headers
- Regular Security Vulnerability Scans

**Geschätzter Aufwand**: 32 Stunden
**Kritischer Pfad**: Compliance-Zertifizierung vor Präsentation

---

### **Phase 4: Advanced Features** 🚀
**Zeitraum**: Falls Zeit verfügbar | **Priorität**: 🟢 **NICE-TO-HAVE**

#### **4.1 DE/FR/IT Mehrsprachigkeit**
**Schweizer Multi-Language Support**:
- Content Translation für alle Gemeinde-Inhalte
- AI-assisted Translation Workflows
- Kulturelle Anpassung pro Sprachregion
- Language-Switcher in Navigation
- SEO-Optimierung pro Sprache

#### **4.2 Advanced AI Features**
**Erweiterte KI-Integration**:
- AI Content Moderation für User-Generated Content
- Smart Content Categorization  
- Predictive Search Suggestions
- AI-powered Content Personalization
- Automated Content Archiving

#### **4.3 Complex Workflow-Automatisierung**
**Erweiterte Geschäftsprozesse**:
- Multi-Step Approval Workflows
- Integration mit kantonalen Systemen
- E-Payment für Gemeinde-Gebühren
- Automated PDF Document Generation
- Electronic Signatures (QES)

**Geschätzter Aufwand**: 40+ Stunden
**Kritischer Pfad**: Nur bei verfügbarer Zeit

---

## ⚠️ Risiko-Management & Backup-Strategien

### **Technische Risiken**

#### **Risk 1: DDEV Environment Issues während Live-Demo**
**Wahrscheinlichkeit**: Medium | **Impact**: Hoch
**Mitigation**:
- Cloud-Demo-Instanz als Backup vorbereiten
- Screenshots/Videos als Fallback-Präsentation
- Lokale Demo-Environment 24h vor Präsentation testen

#### **Risk 2: AI Provider API-Limits erreicht**
**Wahrscheinlichkeit**: Medium | **Impact**: Medium  
**Mitigation**:
- Pre-generierte AI-Inhalte als Backup vorbereiten
- Lokale AI-Mock-Responses für Demo-Modus
- Multiple AI-Provider als Redundanz nutzen

#### **Risk 3: Performance Issues bei Live-Demo**
**Wahrscheinlichkeit**: Low | **Impact**: Hoch
**Mitigation**:
- System-Optimierung 48h vor Demo abgeschlossen
- Performance-Benchmarks als Nachweis vorbereiten
- Lokale Demo ohne Internet-Dependencies

### **Präsentations-Risiken**

#### **Risk 4: Zeitüberschreitung (35 Min sind knapp)**
**Wahrscheinlichkeit**: Hoch | **Impact**: Medium
**Mitigation**:
- Priorisierte Demo-Szenarien (Kern-Features zuerst)
- "Skip-to-Result" Navigation für zeitkritische Demos
- Backup-Präsentation mit Key-Screenshots

#### **Risk 5: Unerwartete Stakeholder-Fragen**
**Wahrscheinlichkeit**: Hoch | **Impact**: Low
**Mitigation**:
- Technical FAQ mit 50+ Fragen vorbereiten
- "Follow-up Meeting" für detaillierte technische Diskussion
- Subject Matter Experts online als Backup

### **Contingency Plans**

#### **Plan A: Vollständige Live-Demo** (Ideal-Szenario)
- Alle Features funktionieren
- Internet-Verbindung stabil
- AI-APIs verfügbar
- Performance optimal

#### **Plan B: Hybrid Demo mit Backups** (Wahrscheinlichstes Szenario)
- Kern-Features live demonstrieren
- Pre-recorded Videos für komplexe Workflows
- Screenshots für Performance-Benchmarks
- AI-Features mit pre-generated Content

#### **Plan C: Präsentation mit Screenshots/Videos** (Worst-Case)
- Vollständig aufgezeichnete Demo-Sessions
- Interaktive Screenshot-Präsentation
- Detailed Technical Specifications
- Live Q&A für technische Fragen

---

## 📈 Erfolgs-Metriken & Qualitätssicherung

### **Demo-Performance KPIs**
| Metrik | Zielwert | Messmethode |
|--------|----------|-------------|
| **Page Load Time** | <2 Sekunden | Lighthouse Performance Audit |
| **Core Web Vitals LCP** | <2.5s | Real User Monitoring |
| **Core Web Vitals FID** | <100ms | Lab Testing |
| **Core Web Vitals CLS** | <0.1 | Layout Shift Monitoring |
| **Mobile Performance Score** | >90 | Lighthouse Mobile Test |
| **Accessibility Score** | >95 (WCAG 2.1 AA) | axe-core + Manual Testing |

### **Feature-Vollständigkeit Checklist**
- [ ] **Multi-Site Demo**: 3 Gemeinden mit unterschiedlichen Designs
- [ ] **Responsive Design**: Flüssige Navigation auf Mobile/Tablet/Desktop
- [ ] **AI Content-Generation**: Live-Demo funktionsfähig
- [ ] **Webform Workflow**: Baubewilligung-Prozess Ende-zu-Ende
- [ ] **Structured Data**: Vereinsverzeichnis mit Filter/Export
- [ ] **Search Functionality**: AI-enhanced Search mit Natural Language
- [ ] **Backend Demo**: Content-Editor Experience mit WYSIWYG
- [ ] **Performance**: Core Web Vitals live messbar >90

### **Präsentations-Qualität**
- [ ] **Demo-Script**: 35-Minuten Timeline eingehalten
- [ ] **Key Messages**: Business Value klar kommuniziert
- [ ] **Technical Differentiation**: AI-Features als USP hervorgehoben
- [ ] **Swiss Compliance**: DSGVO/eCH Standards demonstriert
- [ ] **Backup Scenarios**: Alternative Demo-Pfade vorbereitet

---

## 👥 Team & Ressourcen-Planung

### **Kern-Team**
| Rolle | Name | Verantwortlichkeiten | Zeitaufwand |
|-------|------|---------------------|-------------|
| **Projektleitung** | Marc Philipps | Gesamt-Koordination, Demo-Script, Stakeholder-Kommunikation | 40h |
| **Senior Drupal Developer** | [Agent] | Multi-Site Setup, Webform-Konfiguration, Performance-Tuning | 32h |
| **Frontend Specialist** | [Agent] | Responsive Design, Mobile-Optimierung, Component-Anpassungen | 24h |
| **AI Integration Expert** | [Agent] | KI-Features Demo, Content-Generation, Provider-Optimierung | 16h |
| **QA Specialist** | [Agent] | Testing, Accessibility-Validation, Performance-Benchmarking | 20h |

### **Agent-Ressourcen Allokation**
```yaml
Phase 1 (Sofortige Demo-Vorbereitung):
  - drupal-cms-suite-specialist: Demo-Content Creation
  - drupal-frontend-theming-specialist: Multi-Site Theming
  - drupal-ai-integration-specialist: AI Content Demo
  - sdc-component-specialist: Component-Anpassungen

Phase 2 (GPZH-spezifische Features):
  - drupal-performance-specialist: Core Web Vitals Optimierung
  - drupal-media-expert: Image/Video-Optimierung
  - alpine-js-frontend-developer: Touch-Navigation
  - qa-testing-specialist: Feature-Testing

Phase 3 (Compliance & Accessibility):
  - german-market-compliance-specialist: DSGVO/CH-DSG
  - qa-testing-specialist: eCH-0059 Accessibility
  - security-auditor: Public Sector Security
  - documentation-specialist: Compliance-Dokumentation
```

### **Externe Abhängigkeiten**
- **Design Assets**: Gemeinde-spezifische Logos und Bilder
- **Content**: Realistische Texte und Dokumente für Demo
- **Legal Review**: DSGVO/CH-DSG Compliance-Bestätigung
- **Stakeholder Availability**: Demo-Termine und Feedback-Schleifen

---

## 📅 Meilenstein-Plan

### **Week 1: Foundation Setup**
| Tag | Meilenstein | Deliverables | Verantwortlich |
|-----|-------------|--------------|----------------|
| **Tag 1** | Demo-Content Ready | 3 Gemeinden mit realistischen Inhalten | drupal-cms-suite-specialist |
| **Tag 2** | Baubewilligung-Form | Vollständiger Workflow konfiguriert | drupal-frontend-theming-specialist |

### **Week 2: Feature Enhancement**  
| Tag | Meilenstein | Deliverables | Verantwortlich |
|-----|-------------|--------------|----------------|
| **Tag 3-4** | Multi-Site Themes | 3 verschiedene Gemeinde-Designs | drupal-frontend-theming-specialist |
| **Tag 5** | AI Demo Ready | Content-Generation live funktionsfähig | drupal-ai-integration-specialist |

### **Week 3: Performance & Testing**
| Tag | Meilenstein | Deliverables | Verantwortlich |
|-----|-------------|--------------|----------------|
| **Tag 6-7** | Performance Optimization | Core Web Vitals >90 erreicht | drupal-performance-specialist |
| **Tag 8** | Accessibility Compliance | WCAG 2.1 AA + eCH-0059 validiert | qa-testing-specialist |

### **Week 4: Final Preparation**
| Tag | Meilenstein | Deliverables | Verantwortlich |
|-----|-------------|--------------|----------------|
| **Tag 9** | Demo-Script Final | 35-Min Timeline getestet | Projektleitung |
| **Tag 10** | Backup-Scenarios | Alternative Demo-Pfade vorbereitet | Gesamt-Team |

### **Go-Live: GPZH Präsentation**
- **Final Systems Check**: 24h vor Präsentation
- **Team Briefing**: 2h vor Präsentation
- **Live-Demo**: 60 Minuten Online-Präsentation
- **Follow-up**: Stakeholder-Feedback und nächste Schritte

---

## 💰 Budget & Aufwand-Schätzung

### **Gesamt-Projektaufwand**
| Phase | Aufwand (Stunden) | Priorität | Zeitrahmen |
|-------|------------------|-----------|------------|
| **Phase 1: Demo-Vorbereitung** | 16h | 🔥 KRITISCH | 1-2 Tage |
| **Phase 2: GPZH-Features** | 24h | 🔥 HOCH | 3-5 Tage |
| **Phase 3: Compliance** | 32h | 🟡 MITTEL | 1-2 Wochen |
| **Phase 4: Advanced Features** | 40h | 🟢 NICE-TO-HAVE | Falls Zeit |
| **Projekt-Management** | 20h | 🔥 KRITISCH | Durchgehend |
| **Testing & QA** | 20h | 🔥 HOCH | Durchgehend |
| **Dokumentation** | 8h | 🟡 MITTEL | Final Phase |
| **GESAMT** | **160h** | - | **4 Wochen** |

### **ROI-Kalkulation**
**Investment**: 160h Entwicklungszeit (ca. 20 Personen-Tage)
**Potential Return**: GPZH Auftrag für 50+ Gemeinden im Kanton Zürich
**Success Probability**: 85% bei vollständiger Phase 1+2 Umsetzung

---

## 🎯 Definition of Done

### **Präsentations-Erfolg Kriterien**
Das Projekt gilt als erfolgreich abgeschlossen, wenn:

#### **Technische Kriterien** ✅
- [ ] Live-Demo läuft stabil für 35 Minuten
- [ ] Alle GPZH-Anforderungen demonstriert (Navigation, Forms, Backend)
- [ ] Performance >90 Core Web Vitals nachgewiesen
- [ ] Mobile/Desktop Responsive Design funktionsfähig
- [ ] AI-Features live demonstrierbar

#### **Business Kriterien** 💼
- [ ] Alleinstellungsmerkmale klar kommuniziert (KI, Open Source, Multi-Site)
- [ ] Kosten-Nutzen für Kanton deutlich dargestellt
- [ ] Schweizer Compliance-Standards nachgewiesen
- [ ] Referenzen und Expertise überzeugend präsentiert

#### **Presentation Delivery** 🎤
- [ ] Zeitrahmen eingehalten (25+35 Minuten)
- [ ] Stakeholder-Fragen kompetent beantwortet
- [ ] Technical Backup-Scenarios erfolgreich vorbereitet
- [ ] Follow-up Kommunikation etabliert

**Success Metrics**: Positive Bewertung (4-5 Punkte) in allen Bewertungskategorien des GPZH Evaluationsteams.

---

## 📞 Nächste Schritte

### **Sofortmaßnahmen (nächste 24h)**
1. **Team-Kick-off Meeting**: Alle beteiligten Agenten briefen
2. **Demo-Content Creation**: Winterthur, Uster, Bülach Content starten
3. **Environment Setup**: DDEV für Demo-Performance optimieren
4. **Stakeholder Alignment**: Erwartungen und Zeitplan bestätigen

### **Diese Woche**
1. **Phase 1 Completion**: Demo-Content und Baubewilligung-Form fertigstellen
2. **Multi-Site Architecture**: Design-Konzept für 3 Gemeinden implementieren
3. **AI Demo Preparation**: Content-Generation Workflows testen
4. **Performance Baseline**: Erste Messung der Core Web Vitals

### **Follow-up nach Präsentation**
1. **Stakeholder Feedback**: Detailliertes Debriefing mit GPZH Team
2. **Lessons Learned**: Projektdokumentation und Verbesserungsvorschläge
3. **Next Phase Planning**: Bei erfolgreicher Präqualifikation - Detailplanung für Ausschreibungsphase

---

**🇨🇭 Ready for GPZH Success! Das adesso CMS Team ist optimal vorbereitet für eine überzeugende Präsentation vor dem Kanton Zürich.**

---
*Dokument erstellt am 18. Januar 2025 | Version 1.0 | Nächste Review: vor Demo-Start*