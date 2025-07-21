# DDEV Development Rules

## 🚨 CRITICAL DEVELOPMENT REQUIREMENT 🚨

**ALWAYS WORK IN DDEV - NO EXCEPTIONS!**

- ALL development tasks MUST be executed within DDEV containers
- ALL commands MUST be prefixed with `ddev` (e.g., `ddev npm install`, `ddev theme build`)
- NEVER run commands directly on the host system
- This is a non-negotiable requirement for this project

## Post-Change Verification

- **ALWAYS check if the site is still loading and showing no errors after making changes**
- Use `ddev launch` to verify functionality
- **Immer checken, ob Fehler vorhanden sind.**

## Common DDEV Commands

- `ddev start` - Start the development environment
- `ddev stop` - Stop the development environment
- `ddev launch` - Open the site in browser
- `ddev logs` - View container logs
- `ddev exec` - Execute commands in web container
- `ddev drush` - Run Drupal commands
- `ddev composer` - Run Composer commands