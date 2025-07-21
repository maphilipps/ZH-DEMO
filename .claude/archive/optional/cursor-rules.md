---
description: Describes how and where to create Cursor Rules
globs: *.mdc
---
# Cursor Rules Location

Standards for placing and organizing Cursor rule files in the repository, ensuring rules are always up-to-date and follow best practices.

<rule>
name: cursor_rules_location_and_maintenance
description: Standards for placing and maintaining Cursor rule files in the correct directory
filters:
  # Match any .mdc files
  - type: file_extension
    pattern: "\\.mdc$"
  # Match files that look like Cursor rules
  - type: content
    pattern: "(?s)<rule>.*?</rule>"
  # Match file creation or modification events
  - type: event
    pattern: "file_create|file_modify"

actions:
  - type: reject
    conditions:
      - pattern: "^(?!\\.\\/\\.cursor\\/rules\\/.*\\.mdc$)"
        message: "Cursor rule files (.mdc) must be placed in the .cursor/rules directory"

  - type: suggest
    message: |
      ## Cursor Rules Best Practices

      ### 1. Location and Structure
      - **Location:** Always place rule files in **PROJECT_ROOT/.cursor/rules/**
      - **Directory Structure:**
        ```
        PROJECT_ROOT/
        ├── .cursor/
        │   └── rules/
        │       ├── your-rule-name.mdc
        │       └── ...
        └── ...
        ```

      ### 2. Naming Conventions
      - Use **kebab-case** for filenames (e.g., `php-drupal-standards.mdc`)
      - Always use the **.mdc** extension
      - Make names descriptive of the rule's purpose
      - Group related rules with common prefixes (e.g., `drupal-*`, `lagoon-*`)

      ### 3. Rule File Structure
      ```
      ---
      description: Brief description of the rule
      globs: *.php, *.module, *.inc
      alwaysApply: false
      ---
      # Rule Title

      <rule>
      name: rule_name_in_snake_case
      description: Detailed description of what the rule enforces
      filters:
        - type: file_extension
          pattern: "pattern_to_match"
      
      actions:
        - type: enforce|suggest|validate
          conditions:
            - pattern: "regex_pattern"
              message: "Clear message explaining the issue"
      
      metadata:
        priority: high|medium|low
        version: 1.0
      </rule>
      ```

      ### 4. Rule Maintenance
      - **When adding new rules:**
        - Check for overlapping or conflicting rules
        - Ensure patterns are efficient and specific
        - Test rules against sample code
      - **When modifying existing rules:**
        - Update version number
        - Document changes in commit messages
        - Review and update related rules for consistency
        - Consider backward compatibility

      ### 5. Best Practices for Rule Content
      - Use clear, specific regex patterns
      - Provide helpful, actionable messages
      - Include examples of good and bad code
      - Set appropriate priority levels
      - Use multiple conditions for complex rules
      - Consider performance impact of complex patterns

      ### 6. Rule Testing
      - Test rules against both compliant and non-compliant code
      - Verify that messages are clear and helpful
      - Check for false positives and false negatives
      - Ensure rules don't conflict with each other

examples:
  - input: |
      # Bad: Rule file in wrong location
      rules/my-rule.mdc
      my-rule.mdc
      .rules/my-rule.mdc

      # Good: Rule file in correct location
      .cursor/rules/my-rule.mdc
    output: "Correctly placed Cursor rule file"
  
  - input: |
      # Bad: Poorly structured rule
      <rule>
      name: bad_rule
      description: This rule does something
      </rule>

      # Good: Well-structured rule
      <rule>
      name: good_rule
      description: This rule enforces proper error handling in PHP code
      filters:
        - type: file_extension
          pattern: "\\.php$"
      actions:
        - type: enforce
          conditions:
            - pattern: "try\\s*{[^}]*}\\s*catch\\s*\\([^)]*\\)\\s*{\\s*}"
              message: "Empty catch blocks should include at least error logging"
      metadata:
        priority: high
        version: 1.0
      </rule>
    output: "Well-structured Cursor rule with proper components"

metadata:
  priority: high
  version: 1.2
</rule>
