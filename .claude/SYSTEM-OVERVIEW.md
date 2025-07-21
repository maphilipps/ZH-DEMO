# Claude Code System Overview

## 🏁 Optimized Loading System

Das .claude System wurde von **87 Dateien** auf **21 Kern-Dateien + Profile** reduziert.

## 🔥 Core Rules (Immer geladen)

Diese 5 kritischen Regeln werden immer aus CLAUDE.md geladen:
- `ddev-rules.md` - DDEV ist nicht-verhandelbar
- `sdc-rules.md` - SDC Best Practices sind kritisch
- `testing-rules.md` - Testing ist essenziell
- `twig-error-prevention.md` - Verhindert häufige Fehler
- `adesso-accessibility-standards.md` - Accessibility ist Pflicht

## 🎯 Conditional Profiles

### Verwendung:
```bash
# 🎯 EMPFOHLEN: Tägliche Fullstack-Entwicklung
CLAUDE_PROFILE=".claude/profiles/fullstack-profile.md" claude code

# Spezialisierte Profile:
CLAUDE_PROFILE=".claude/profiles/drupal-profile.md" claude code      # Drupal backend only
CLAUDE_PROFILE=".claude/profiles/frontend-profile.md" claude code    # Frontend/CSS/JS only  
CLAUDE_PROFILE=".claude/profiles/accessibility-profile.md" claude code # A11y audits
CLAUDE_PROFILE=".claude/profiles/security-profile.md" claude code    # Security reviews
CLAUDE_PROFILE=".claude/profiles/advanced-profile.md" claude code    # Multi-agent workflows
```

## 📦 Archive Structure

```
.claude/
├── CLAUDE.md (5 core rules only)
├── profiles/ (conditional loading)
├── archive/
│   ├── optional/ (nice-to-have features)
│   ├── security-extended/ (specialized security)
│   └── development-extended/ (specialized dev tools)
└── [21 essential rule files]
```

## ⚡ Performance Improvement

**Vorher:** 87 Dateien = ~500KB Context
**Nachher:** 5-10 Dateien = ~50KB Context

**90% Reduktion der Context-Größe!**

## 🔄 Wie man Archive-Dateien nutzt

Wenn du spezialisierte Regeln brauchst:

```bash
# Einzelne Datei aus Archiv laden
echo "@.claude/archive/optional/drupal-11-expert-knowledge.md" >> .claude/temp-profile.md
CLAUDE_PROFILE=".claude/temp-profile.md" claude code

# Oder direkt in Profile einbauen
# Einfach Kommentar in Profile entfernen
```

## 🎉 Vorteile

1. **⚡ Schneller** - 90% weniger Context-Loading
2. **🎯 Fokussiert** - Nur relevante Regeln für deine Aufgabe
3. **💾 Token-effizient** - Dramatisch reduzierte Token-Nutzung
4. **🔧 Wartbar** - Einfacher zu aktualisieren und zu verwalten
5. **🚀 Skalierbar** - Neue Profile einfach hinzufügbar
