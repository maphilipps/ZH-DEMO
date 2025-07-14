# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is adesso CMS, a Drupal-based content management system with a modern frontend theme built using Vite, Tailwind CSS, and Storybook. The project uses DDEV for local development and is structured as a component-based system with Drupal recipes for configuration management.

## Development Environment

### Prerequisites
- DDEV must be installed and available in PATH
- Works on Unix-like environments (Linux, macOS, Windows Subsystem for Linux)

### Getting Started
```bash
./launch-adesso-cms.sh  # Initialize and start the project
```

This script will:
- Configure DDEV if not already done
- Start containers
- Install dependencies
- Build the theme
- Launch the application

## Common Development Commands

### DDEV Commands
```bash
ddev start                    # Start the development environment
ddev composer install        # Install PHP dependencies
ddev drush sql:create -y     # Reset/recreate the database
ddev launch                  # Open the site in browser
ddev export-contents         # Export content using Default Content module
```

### Theme Development
```bash
ddev theme build             # Build the theme (production)
ddev theme dev               # Start Vite development server
ddev theme watch             # Watch for changes (Tailwind, components, stories)
ddev watch                   # Start Vite development server (alias)
ddev theme storybook         # Run Storybook server
```

Access Storybook at: https://adesso-cms.ddev.site:6006/

### Code Quality
```bash
ddev phpcs                   # PHP CodeSniffer
ddev phpcbf                  # PHP Code Beautifier and Fixer
ddev phpstan                 # Static analysis
ddev phpunit                 # Run PHPUnit tests
ddev eslint                  # JavaScript linting
ddev stylelint               # CSS/SCSS linting
```

## Architecture

### Directory Structure
- `recipes/` - Drupal recipes for configuration and content
  - `adesso_cms_starter/` - Base configuration and content types
  - `adesso_cms_paragraphs/` - Paragraph types for flexible content
  - `adesso_cms_ai/` - AI-related functionality
- `web/` - Drupal web root
  - `themes/custom/adesso_cms_theme/` - Custom theme with component system
  - `profiles/adesso_cms_installer/` - Custom installation profile
- `.ddev/` - DDEV configuration and custom commands
- `.llms/` - Knowledge base and LLM-related documentation
- `.working/` - Temporary files and work-in-progress content

### Theme Architecture
The theme is component-based with:
- `components/` - Reusable UI components (Twig templates, stories, styles)
- `src/` - Source files (CSS, JS)
- `dist/` - Built assets
- `templates/` - Drupal template overrides

### Component System
Each component includes:
- `.twig` - Template file
- `.component.yml` - Component configuration
- `.stories.js` - Storybook stories
- `templates/` - Drupal-specific template overrides

### Build System
- **Vite** for asset bundling and development server
- **Tailwind CSS v4** for styling
- **Storybook** for component development
- **PostCSS** for CSS processing

## Recipes System

This project uses Drupal recipes for:
- Configuration management
- Content type definitions
- Default content creation
- Feature organization

Recipes are located in `recipes/` and managed via composer dependencies.

## Development Workflow

1. Use `ddev theme watch` for active development
2. Components are developed in isolation using Storybook
3. Drupal templates in `components/*/templates/` integrate components with Drupal
4. Build with `ddev theme build` before deployment
5. Export content changes with `ddev export-contents`

## Testing

- PHPUnit tests are available via `ddev phpunit`
- Frontend components are tested through Storybook
- Selenium tests available via ddev-selenium-standalone-chrome addon
- **Playwright MCP** should be used for browser automation and end-to-end testing

