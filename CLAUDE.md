# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚨 CRITICAL DEVELOPMENT REQUIREMENTS 🚨

**ALWAYS WORK IN DDEV - NO EXCEPTIONS!** 
**ALWAYS FOLLOW SDC BEST PRACTICES!**
**ALWAYS RUN TESTS AFTER CHANGES!**

## Core Rules (Always Loaded)

@.claude/ddev-rules.md
@.claude/sdc-rules.md  
@.claude/testing-rules.md
@.claude/twig-error-prevention.md
@.claude/adesso-accessibility-standards.md

## 🎯 Default Profile (ALWAYS LOADED)

@.claude/profiles/fullstack-profile.md

## Alternative Profiles (Use when needed)

- **Drupal backend only:** `@.claude/profiles/drupal-profile.md`
- **Frontend/CSS/JS only:** `@.claude/profiles/frontend-profile.md`  
- **Accessibility audits:** `@.claude/profiles/accessibility-profile.md`
- **Security reviews:** `@.claude/profiles/security-profile.md`
- **Advanced multi-agent:** `@.claude/profiles/advanced-profile.md`

## 📈 System Optimized for Efficiency

**This system loads only 5 core rules (instead of 87!)** for maximum efficiency:
- 90% reduction in context size
- ⚡ Faster loading times  
- 🎯 Task-focused rule loading
- 💾 Minimal token usage

## Project Overview

This is adesso CMS, a Drupal-based content management system with a modern frontend theme built using Vite, Tailwind CSS, and Storybook. The project uses DDEV for local development and is structured as a component-based system with Drupal recipes for configuration management.

## 🔄 How to Use Profiles

```bash
# Fullstack Profile wird automatisch geladen!
# Nur bei speziellen Aufgaben andere Profile laden:

# Drupal-spezifische Arbeit
@.claude/profiles/drupal-profile.md

# Nur Frontend/CSS/JS 
@.claude/profiles/frontend-profile.md

# Accessibility Audits
@.claude/profiles/accessibility-profile.md
```

## 📚 More Information

See `.claude/SYSTEM-OVERVIEW.md` for complete details and archive access.
