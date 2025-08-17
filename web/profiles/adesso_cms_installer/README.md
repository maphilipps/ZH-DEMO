# adesso CMS Installer

Ein vollständiges Drupal 11 Installationsprofil mit AI-Integration, modernem Frontend und umfassendem Content Management.

## 🚀 Features

### Basis-Funktionalität
- **Drupal 11.2+** als solide Grundlage
- **Gin Admin Theme** für optimale Backend-Erfahrung
- **adesso CMS Theme** als Standard Frontend-Theme
- **Deutsche Lokalisierung** als Standard

### AI-Integration
- **OpenAI Integration** (GPT-4o, DALL-E-3)
- **Anthropic Claude** Integration
- **Groq** für performante AI-Anfragen
- **Automatische Alt-Text Generierung** für Bilder
- **AI Content Suggestions** für Editoren
- **AI-gestützte Übersetzungen**

### Content Management
- **Erweiterte Content Types**: Page, News, Event, Person, Project
- **25+ Paragraph Components** für flexible Seitenerstellung
- **Media Management** mit responsiven Bildern
- **SEO-Optimierung** mit Metatag und Yoast SEO
- **Workflow Management** mit Content Moderation

### Frontend & Performance
- **50+ Responsive Image Styles** für alle Formate
- **WebP-Unterstützung** für optimierte Performance
- **Vite Build-System** für moderne Asset-Verarbeitung
- **Progressive Enhancement** mit Alpine.js Patterns

### User Experience
- **Frontend Editing** für direkte Inhaltsbearbeitung
- **Easy Breadcrumb** Navigation
- **Advanced Search** mit Search API
- **Form Management** mit Webform
- **CAPTCHA Protection** mit FriendlyCaptcha

## 📦 Installation

### Voraussetzungen
- PHP 8.3+
- Drupal 11.2+
- MariaDB 10.11+ oder MySQL 8.0+
- Composer
- Node.js 20+ (für Theme-Entwicklung)

### Standard-Installation
```bash
# Via Drush
drush site:install adesso_cms_installer \
  --account-name=admin \
  --account-pass=IhrSicheresPasswort \
  --account-mail=ihre.email@example.com \
  --site-name="Ihr Site Name" \
  --site-mail=noreply@example.com

# Via Drupal CLI
drupal site:install adesso_cms_installer \
  --account-name=admin \
  --account-pass=IhrSicheresPasswort \
  --account-mail=ihre.email@example.com \
  --site-name="Ihr Site Name" \
  --site-mail=noreply@example.com
```

### DDEV Installation
```bash
# DDEV-Projekt starten
ddev start

# Installation ausführen
ddev drush site:install adesso_cms_installer \
  --account-name=admin \
  --account-pass=admin123 \
  --account-mail=admin@example.com \
  --site-name="adesso CMS" \
  --site-mail=noreply@example.com
```

## 🔧 Konfiguration

### AI-Provider Setup
Nach der Installation müssen API-Schlüssel für AI-Provider konfiguriert werden:

1. **Gehe zu**: `/admin/config/system/keys`
2. **Erstelle Keys für**:
   - OpenAI API Key
   - Anthropic API Key
   - Groq API Key (optional)

3. **Konfiguriere Provider**: `/admin/config/ai/providers`

### Theme-Entwicklung
```bash
# Theme Assets bauen
cd web/themes/custom/adesso_cms_theme
npm install
npm run build

# Development Mode
npm run dev
```

### Content-Setup
Der Installer aktiviert automatisch:
- **adesso_cms_content**: Default Content und Beispielinhalte
- **adesso_cms_blocks**: Custom Block Types
- **adesso_cms_starter**: Starter-Konfigurationen

## 📁 Enthaltene Module

### Core Drupal Module
- Node, User, Field, Media, Views, Block
- Content Translation, Language
- Path, Pathauto, Redirect
- Image, Responsive Image, Focal Point

### Content Management
- **Paragraphs + Paragraphs EE**: Flexible Content Components
- **Field Group**: Organisierte Formulare
- **Entity Browser**: Erweiterte Media-Auswahl
- **Scheduler**: Zeitgesteuerte Veröffentlichung
- **Workflow**: Content Moderation

### AI & Enhancement
- **AI Framework**: Basis für AI-Integration
- **AI Content Suggestions**: Content-Verbesserungen
- **AI Image Alt Text**: Automatische Bildbeschreibungen
- **AI Translate**: Übersetzungsunterstützung

### SEO & Marketing
- **Metatag**: Meta-Tag-Management
- **Simple Sitemap**: XML Sitemaps
- **Yoast SEO**: SEO-Analyse
- **Klaro**: Cookie-Consent-Management

### Development & Tools
- **ECA**: Event-driven Architecture
- **Default Content**: Starter-Inhalte
- **Coffee**: Schnelle Admin-Navigation
- **Gin Toolbar**: Optimierte Admin-Toolbar

## 🎨 Theme-Struktur

### Frontend Theme: adesso_cms_theme
- **Basis**: Custom Drupal 11 Theme
- **CSS Framework**: Tailwind CSS v4
- **JavaScript**: Alpine.js Patterns
- **Build System**: Vite 6.2.0
- **Components**: Single Directory Components (SDC)

### Responsive Breakpoints
- **Mobile**: 375px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large**: 1440px+

## 🔒 Sicherheit

### Standard-Sicherheitsfeatures
- **Input Validation**: Comprehensive sanitization
- **CSRF Protection**: On all forms
- **User Roles**: Content Editor, Administrator
- **Honeypot**: Spam protection
- **Captcha**: Advanced bot protection

### AI-spezifische Sicherheit
- **API Key Management**: Secure key storage
- **Content Moderation**: AI output validation
- **Rate Limiting**: API quota protection
- **Audit Logging**: AI operation tracking

## 📊 Performance

### Optimierungen
- **Cache Strategies**: Multi-level caching
- **Image Optimization**: WebP, responsive images
- **CSS/JS Aggregation**: Optimized asset delivery
- **Database Optimization**: Proper indexing
- **CDN Ready**: External asset support

### Monitoring
- **Core Web Vitals**: Performance tracking
- **Database Queries**: Query optimization
- **Memory Usage**: Resource monitoring
- **Cache Hit Rates**: Cache effectiveness

## 🛠️ Wartung

### Update-Prozess
1. **Backup erstellen**: Datenbank und Dateien
2. **Composer Update**: `composer update`
3. **Database Updates**: `drush updb`
4. **Config Import**: `drush cim` (falls nötig)
5. **Cache Clear**: `drush cr`

### Backup-Strategie
```bash
# Datenbank Backup
drush sql:dump --gzip --result-file=backup-$(date +%Y%m%d).sql

# Dateien Backup
tar -czf files-backup-$(date +%Y%m%d).tar.gz web/sites/default/files/
```

## 🤝 Support

### Logs & Debugging
```bash
# Drupal Logs
drush watchdog:tail

# DDEV Logs
ddev logs

# AI Provider Logs
drush config:get ai_logging.settings
```

### Häufige Probleme
1. **AI Provider Fehler**: API-Schlüssel prüfen
2. **Theme Probleme**: Assets neu bauen
3. **Performance Issues**: Cache leeren
4. **Module Konflikte**: Dependencies prüfen

## 📝 Changelog

### Version 1.0.0
- Initiale Version mit vollständiger AI-Integration
- 25+ Paragraph Components
- Responsive Image System
- Complete SEO Setup
- Advanced Content Management

## 📄 Lizenz

Dieses Installationsprofil basiert auf Drupal (GPL v2+) und enthält zusätzliche Module unter verschiedenen Open-Source-Lizenzen.

---

**adesso CMS** - Modern Content Management mit AI-Integration