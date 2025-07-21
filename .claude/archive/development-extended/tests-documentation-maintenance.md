---
description: Require tests for new functionality and enforce documentation updates.
globs: *.php, *.feature, README.md, *.md
---
# Tests & Documentation Maintenance

Ensures that tests are written and updated for Drupal modules and plugins, and that documentation remains current.

<rule>
name: tests_documentation_maintenance
description: Require tests for new functionality and enforce documentation updates.
filters:
  - type: file_extension
    pattern: "\\.(php|feature|md|theme|module|install|info|inc)$"

actions:
  - type: enforce
    conditions:
      - pattern: "class .*Test extends"
        message: "Ensure all Drupal modules and plugins have unit tests."

      - pattern: "Feature:.*"
        message: "Ensure front-end affecting plugins have Behat tests."

      - pattern: "function .*\\("
        message: "When modifying existing functionality, check and update related tests."

      - pattern: "# README"
        message: "Ensure README.md exists in each module and is kept up to date."

  - type: suggest
    message: |
      Keep tests and documentation updated:
      - Write **unit tests** for Drupal modules and backend logic.
      - Write **Behat tests** for plugins that affect front-end behavior.
      - If functionality changes, **update corresponding tests**.
      - Maintain a **README.md** file in each module and update it with relevant changes.

metadata:
  priority: high
  version: 1.0
</rule>
