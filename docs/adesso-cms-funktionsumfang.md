# adesso CMS - Vollständiger Funktionsumfang

## Umfassende Übersicht aller Funktionen abseits der Paragraphs

---

## 1. INHALTSTYPEN (NODE TYPES)

### Seite (Basic Page)
**Maschinenname:** page
**Beschreibung:** Primärer Inhaltstyp für statische Seiten
**Besonderheiten:**
- Layout Builder Unterstützung für visuelle Seitengestaltung
- Scheduler Integration für zeitgesteuerte Veröffentlichung
- Paragraph-basierte Inhaltsarchitektur
**Felder:**
- field_content (Inhalt - Paragraph-Referenzen)
- field_description (Beschreibung - Text)
- field_featured_image (Beitragsbild - Medienreferenz)
- field_tags (Tags - Taxonomy-Referenz)
- field_seo_* (SEO-Felder: Titel, Beschreibung, Bild, Analyse)
- layout_builder__layout (Layout Builder Konfiguration)

### Nachricht (News Item)
**Maschinenname:** news
**Beschreibung:** Für Nachrichtenartikel und Blog-Posts
**Besonderheiten:**
- Anzeige des Einreichungsdatums aktiviert
- Suchindex-Ausschluss möglich
- Scheduler und Menü-Integration
**Felder:**
- field_content (Inhalt - Text mit Zusammenfassung)
- field_description (Beschreibung)
- field_featured_image (Beitragsbild)
- field_tags (Tags)
- field_seo_* (SEO-Optimierung)

### Veranstaltung (Event)
**Maschinenname:** event
**Beschreibung:** Veranstaltungsspezifischer Inhaltstyp
**Besonderheiten:**
- Smart Date Integration für komplexe Datumsangaben
- Geofield Integration für Standortdaten
- Datei-Anhänge für Veranstaltungsunterlagen
**Felder:**
- field_event__date (Veranstaltungsdatum - Smart Date)
- field_event__location_name (Veranstaltungsort Name)
- field_event__location_address (Adresse)
- field_geofield (Geografische Koordinaten)
- field_event__file (Dateien)
- field_event__link (Links)
- field_featured_image (Beitragsbild)

### Personenprofil (Person Profile)
**Maschinenname:** person
**Beschreibung:** Kontakt-/Mitarbeiterprofilseiten
**Besonderheiten:**
- Suchindex-Ausschluss verfügbar
- Kontaktinformations-Management
**Felder:**
- field_person__email (E-Mail)
- field_person__phone_number (Telefonnummer)
- field_person__role_job_title (Rolle/Jobtitel)
- field_content (Inhalt)
- field_description (Beschreibung)

### Projekt (Project)
**Maschinenname:** project
**Beschreibung:** Portfolio-/Fallstudie-Inhalte
**Besonderheiten:**
- Kunden-Informations-Management
- SEO-Optimierung und Tagging
**Felder:**
- field_project__client_name (Kundenname)
- field_project__client_logo (Kundenloge)
- field_project__client_link (Kundenlink)
- field_description (Beschreibung)
- field_content (Inhalt)

---

## 2. MEDIENTYPEN

### Bild (Image)
- Lokale Bild-Uploads mit Focal Point Unterstützung
- Automatische Alt-Text-Generierung per KI
- 50+ Bildstile für verschiedene Seitenverhältnisse
- WebP-Konvertierung für Performance

### Dokument (Document)
- Datei-Uploads (PDFs, Dokumente)
- Mime-Type-Validierung
- Dateigrößen-Beschränkungen

### Video (Video)
- Lokale Video-Uploads
- Multiple Videoformate unterstützt

### Remote Video (Remote Video)
- oEmbed Integration (YouTube, Vimeo, etc.)
- Automatische Thumbnail-Extraktion
- Datenschutz-konforme Einbettung

### SVG Bild (SVG Image)
- SVG-Datei-Unterstützung
- Responsive Fähigkeiten
- Skalierbare Vektorgrafiken

### Bild mit Link (Image with Link)
- Bilder als klickbare Links
- Link-Tracking möglich

### Bildverarbeitung:
- **Responsive Bilder:** Multiple Breakpoint-Unterstützung
- **Focal Point:** Intelligentes Zuschneiden
- **WebP-Support:** Automatische WebP-Konvertierung
- **50+ Bildstile:** Verschiedene Seitenverhältnisse (16:9, 4:3, 1:1, etc.)

---

## 3. TAXONOMIE UND KLASSIFIZIERUNG

### Tags (Allgemeine Tags)
- Freie Verschlagwortung
- Hierarchische Organisation möglich
- Mehrsprachige Unterstützung

### Kategorie (Category)
- Strukturierte Inhalts-Kategorisierung
- Deutsche Konfiguration
- Hierarchische Baumstrukturen

### Autoren (Authors)
- Inhalts-Autoren-Zuordnung
- Autoren-Profile und -Verwaltung

---

## 4. BENUTZERVERWALTUNG

### Benutzerrollen:

#### Administrator
- Vollständiger Systemzugriff
- Modul-Verwaltung und Updates
- Systemkonfiguration

#### Content Editor (Inhaltsredakteur)
- Umfassende Inhaltsverwaltungsberechtigungen
- Erstellen/Bearbeiten/Löschen von Seiten und Medien
- Zugriff auf Verwaltungsseiten
- Menü- und URL-Alias-Verwaltung
- Erweiterte Textformate verwenden
- Inhalts-Terminplanung

#### Authenticated Users (Authentifizierte Benutzer)
- Grundlegende Benutzerberechtigungen
- Profilverwaltung

#### Anonymous Users (Anonyme Benutzer)
- Öffentlicher Zugriff
- Nur Lese-Berechtigung

### Benutzerdefinierte Benutzerfelder:
- field_password_expiration (Passwort-Ablauf)
- field_last_password_reset (Letztes Passwort-Reset)
- field_pending_expire_sent (Ablauf-Benachrichtigung)

### Authentifizierungs-Features:
- E-Mail/Benutzername-Login
- Benutzerregistrierung (nur Admin standardmäßig)
- Easy Email Integration für Benutzerbenachrichtigungen

---

## 5. WEBSITE-KONFIGURATION

### Menüsysteme:
- **Hauptnavigation** - Primäre Website-Navigation
- **Footer-Menü** - Footer-Links
- **Admin-Menü** - Administrative Navigation
- **Mobile Navigation** - Responsive Navigation
- Menülink-Attribute Unterstützung

### Block-Konfiguration:
- Theme-spezifische Blöcke für Header, Footer, Navigation
- Multiple Admin-Theme-Blöcke (Gin, Claro)
- Suchformular-Blöcke
- Social Media-Blöcke
- Breadcrumb-Navigation

### Sprach-Einstellungen:
- **Mehrsprachige Unterstützung:** Deutsch (primär), Englisch
- **Inhaltsübersetzung:** Verfügbar für alle Inhaltstypen
- **Locale-Unterstützung:** Vollständige Internationalisierung
- **Interface-Übersetzung:** Deutsche Benutzeroberfläche

### Such-Funktionalität:
- **Search API:** Datenbankgesteuerte Suche
- **Autocomplete:** Suchvorschläge
- **Ausschluss-Fähigkeit:** Inhalte können von der Suche ausgeschlossen werden
- **Einfaches Suchformular:** Benutzerfreundliche Suche
- **Volltextsuche:** Durchsuchung aller Inhaltsfelder

---

## 6. MODULE UND FEATURES

### KI/ML-Integrationen:
- **OpenAI Integration:** GPT-4, DALL-E, Whisper Unterstützung
- **Anthropic Provider:** Claude AI Integration
- **KI-Features:**
  - Inhaltsvorschläge und -optimierung
  - Automatische Bild-Alt-Text-Generierung
  - Content-Moderation
  - Übersetzungshilfe
  - SEO-Analyse
  - Chat-Funktionalität
  - Ton- und Stil-Anpassung

### SEO-Module:
- **Yoast SEO:** Erweiterte SEO-Analyse
- **Metatag:** Meta-Tag-Verwaltung
- **Pathauto:** Automatische URL-Generierung
- **Simple Sitemap:** XML-Sitemap-Generierung
- **Robots.txt:** Suchmaschinen-Direktiven
- **Schema.org:** Strukturierte Daten

### Performance & Optimierung:
- **Automatic Updates:** Core- und Modul-Updates
- **WebP-Konvertierung:** Bildoptimierung
- **BigPipe:** Progressive Seitenerstellung
- **Page Cache:** Performance-Caching
- **Dynamic Page Cache:** Benutzerspezifisches Caching
- **CSS/JS-Aggregation:** Datei-Optimierung

### Content Management:
- **Paragraphs:** Komponentenbasierte Inhalte (21 Typen)
- **Layout Builder:** Visueller Seitenbau
- **Scheduler:** Inhaltspublikations-Terminplanung
- **Content Moderation:** Redaktioneller Workflow
- **Revision Management:** Inhalts-Versionierung
- **Autosave:** Automatisches Formularspeichern
- **Duplicate Content:** Inhalts-Duplizierung

### Sicherheit & Datenschutz:
- **Klaro:** Cookie-Einverständnis-Verwaltung (15+ Services)
- **CAPTCHA/FriendlyCaptcha:** Spam-Schutz
- **Honeypot:** Bot-Schutz
- **Login Security:** E-Mail/Benutzername-Login
- **GDPR-Compliance:** Datenschutz-Verwaltung
- **Privacy Settings:** Datenschutz-Konfiguration

### Kommunikation & Formulare:
- **Webform:** Erweiterte Formular-Erstellung (Deutsche Oberfläche)
- **Easy Email:** Template-E-Mail-System
- **Kontaktformulare:** Multiple Kontaktmethoden
- **Newsletter:** Abonnement-Verwaltung
- **Contact Forms:** Strukturierte Kontakt-Workflows

---

## 7. THEME UND FRONTEND

### adesso CMS Theme:
- **Technologie-Stack:** Vite + Tailwind CSS + Storybook
- **Komponentensystem:** 25+ Single Directory Components (SDC)
- **Responsive Design:** Mobile-First-Ansatz
- **Barrierefreiheit:** WCAG 2.1 AA Compliance mit Editoria11y

### Komponenten-Kategorien:
- **Navigation:** Hauptmenü, Mobile Menü, Breadcrumbs
- **Inhalt:** Karten, Heroes, Galerien, Slider
- **Formulare:** Newsletter, Kontaktformulare
- **Medien:** Bilder, Videos, responsive Medien
- **Interaktiv:** Modals, Popovers, Akkordeons
- **Layout:** Header, Footer, Sidebars

### Entwicklungstools:
- **Storybook:** Komponentenentwicklung und -dokumentation
- **Vite:** Schnelles Build-System und HMR
- **Tailwind CSS:** Utility-First CSS Framework
- **PostCSS:** CSS-Verarbeitung
- **JavaScript:** Modernes ES6+ mit Drupal Behaviors

### Styling-Features:
- **Tailwind v4:** Neueste CSS-Framework-Version
- **Custom Properties:** CSS-Variablen-System
- **Dark Mode:** Automatische Theme-Umschaltung
- **Animation System:** Smooth Transitions
- **Icon System:** SVG-Icon-Bibliothek

---

## 8. ENTWICKLUNG UND DEPLOYMENT

### Recipe-System:
- **Modulare Architektur:** 20+ Recipes für verschiedene Funktionalitäten
- **Einfache Installation:** Recipe-basierte Einrichtung
- **Core Recipes:** Standard Drupal-Funktionalität
- **Custom Recipes:** adesso-spezifische Features

### Entwicklungstools:
- **DDEV:** Lokale Entwicklungsumgebung
- **Composer:** PHP-Abhängigkeits-Verwaltung
- **NPM:** Frontend-Paket-Verwaltung
- **Git:** Versionskontrolle mit Conventional Commits

### Konfigurations-Management:
- **Config Sync:** Umgebungsspezifische Konfigurationen
- **Recipe Import:** Automatisierte Konfigurations-Bereitstellung
- **Default Content:** Beispielinhalte für Entwicklung
- **Environment Configs:** Verschiedene Deployment-Ziele

### Build & Testing:
- **Automated Testing:** PHPUnit, Jest Integration
- **Code Quality:** PHPCS, ESLint, Prettier
- **Performance Testing:** Lighthouse Integration
- **Accessibility Testing:** axe-core Integration

---

## 9. DRITTANBIETER-INTEGRATIONEN

### Analytics & Tracking:
- **Google Analytics:** Web-Analytics (via Klaro)
- **Matomo:** Datenschutzfokussierte Analytics
- **Google Tag Manager:** Tag-Verwaltung
- **Umami:** Privacy-First Analytics

### Social Media:
- **Facebook:** Social Media Integration
- **LinkedIn:** Berufliche Netzwerke
- **Twitter/X:** Microblogging
- **Instagram:** Bild-/Video-Sharing
- **Mastodon:** Dezentrale soziale Netzwerke
- **YouTube/Vimeo:** Video-Plattformen

### Externe Services:
- **Nominatim:** Geocoding-Service für Adressen
- **oEmbed:** Video-Einbettung (YouTube, Vimeo)
- **reCAPTCHA:** Google Spam-Schutz
- **OpenAI/Anthropic:** KI-Service-Integration
- **Leaflet:** Interaktive Karten

### Datenschutz-Compliance:
- **Klaro Integration:** 15+ Service-Konfigurationen
- **GDPR Ready:** Cookie-Verwaltung und Einverständnis
- **Zweckbasierte Einverständnis:** Analytics, Werbung, Sicherheit
- **Privacy Center:** Zentrale Datenschutz-Verwaltung

---

## 10. ADMINISTRATIVE FEATURES

### Content-Editing:
- **Frontend Editing:** In-Place-Inhaltsbearbeitung
- **Paragraphs Interface:** Drag-and-Drop-Inhaltserstellung
- **Media Library:** Zentrale Medienverwaltung
- **WYSIWYG-Editoren:** CKEditor 5 mit mehreren Formaten
- **Quick Edit:** Inline-Bearbeitung
- **Bulk Operations:** Massen-Inhaltsoperationen

### Workflow-Management:
- **Content Moderation:** Entwurf → Veröffentlicht Workflow
- **Scheduling:** Automatisierte Veröffentlichung/Depublikation
- **Revision Control:** Versions-Tracking und Rollback
- **Editorial Workflow:** Mehrstufige Freigabeprozesse
- **Duplicate Detection:** Doppelte Inhalte vermeiden

### Administrative Oberfläche:
- **Gin Theme:** Moderne Admin-Oberfläche
- **Dashboard:** Willkommens-Dashboard mit Überblick
- **Coffee Module:** Schnelle Admin-Navigation
- **Toolbar:** Administrative Werkzeugleiste
- **Navigation Module:** Neue Drupal-Navigation
- **Admin Menu:** Strukturierte Verwaltungsmenüs

### Überwachung & Wartung:
- **Update Management:** Automatisierte Sicherheitsupdates
- **Revision Cleanup:** Automatische Bereinigung alter Revisionen
- **Trash Management:** Soft-Delete-Funktionalität
- **Log Management:** System-Logging und -Überwachung
- **Performance Monitoring:** Site-Performance-Tracking
- **Backup Integration:** Automatisierte Backups

### Mehrsprachigkeit & Lokalisierung:
- **Interface Translation:** Deutsche Benutzeroberfläche
- **Content Translation:** Mehrsprachige Inhalte
- **Language Detection:** Automatische Spracherkennung
- **Regional Settings:** Lokale Datums-/Zeitformate
- **Currency Support:** Mehrwährungs-Unterstützung

### Erweiterte Features:
- **API Integration:** REST/JSON:API Endpoints
- **Headless Capability:** Drupal als Backend für externe Frontends
- **Progressive Web App:** PWA-Features
- **Offline Capability:** Service Worker Integration
- **Push Notifications:** Browser-Benachrichtigungen

---

## ZUSAMMENFASSUNG

Das adesso CMS bietet ein umfassendes, skalierbares und benutzerfreundliches Content Management System mit:

- **5 Hauptinhaltstypen** für vielfältige Content-Strategien
- **6 Medientypen** mit fortschrittlicher Bildverarbeitung
- **3 Taxonomie-Systeme** für strukturierte Klassifizierung
- **4 Benutzerrollen** mit granularen Berechtigungen
- **50+ Module** für erweiterte Funktionalitäten
- **25+ Frontend-Komponenten** für modernes Design
- **15+ Drittanbieter-Integrationen** für umfassende Funktionalität
- **Vollständige KI-Integration** für Content-Optimierung
- **GDPR/Datenschutz-Compliance** für rechtliche Sicherheit
- **Performance-Optimierung** für schnelle Ladezeiten
- **Barrierefreiheit (WCAG 2.1 AA)** für inklusive Nutzung

Dieses System kombiniert moderne Entwicklungspraktiken, umfassende KI-Integration und starken Fokus auf Performance, Barrierefreiheit und Benutzererfahrung.

---
Generiert am: 2025-07-21
Für: adesso CMS Drupal-basiertes Content Management System
Version: Drupal 11.x mit modernem Frontend-Stack