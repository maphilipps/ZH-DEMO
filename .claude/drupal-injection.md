---
description: Detect and prevent injection vulnerabilities in Drupal as defined in OWASP Top 10:2021-A03
globs: *.php, *.inc, *.module, *.install, *.info.yml, *.theme, **/modules/**, **/themes/**, **/profiles/**
alwaysApply: false
---
# Drupal Injection Security Standards (OWASP A03:2021)

This rule enforces security best practices to prevent injection vulnerabilities in Drupal applications, as defined in OWASP Top 10:2021-A03.

<rule>
name: drupal_injection
description: Detect and prevent injection vulnerabilities in Drupal as defined in OWASP Top 10:2021-A03
filters:
  - type: file_extension
    pattern: "\\.(php|inc|module|install|theme)$"
  - type: file_path
    pattern: "(modules|themes|profiles|core)/.*"

actions:
  - type: enforce
    conditions:
      # Pattern 1: Raw SQL queries without placeholders
      - pattern: "db_query\\(['\"][^'\"]*\\$[^'\"]*['\"]"
        message: "Direct variables in SQL queries are vulnerable to SQL injection. Use parameterized queries with placeholders."
        
      # Pattern 2: Modern DB API without placeholders
      - pattern: "->query\\(['\"][^'\"]*\\$[^'\"]*['\"]"
        message: "Use parameterized queries with placeholders to prevent SQL injection: ->query($sql, [$param1, $param2])."
        
      # Pattern 3: Unescaped output
      - pattern: "<?=|<?php\\s+echo\\s+(?!(t|\\\\t|\\$this->t))[^;]*;"
        message: "Direct output may lead to XSS. Use t(), escaped variables with Html::escape(), or Twig templates."
        
      # Pattern 4: Unfiltered user input in render arrays
      - pattern: "[\"']#markup[\"']\\s*=>\\s*(?!t\\(|\\\\t\\(|Xss::filterAdmin|Html::escape)\\$"
        message: "Never use unfiltered variables in #markup. Use t(), Xss::filterAdmin(), or Html::escape()."
        
      # Pattern 5: Unescaped variables in JavaScript settings
      - pattern: "->addJsSettings\\(\\[(?![^\\]]*(Xss::filter|Json::encode))\\$"
        message: "Filter variables before adding to JavaScript settings using Xss::filter() or properly encode with Json::encode()."
        
      # Pattern 6: Direct command execution
      - pattern: "exec\\(|shell_exec\\(|system\\(|passthru\\(|proc_open\\(|popen\\(|`"
        message: "Command execution functions can lead to command injection. Use Symfony\Component\Process\Process if necessary."
        
      # Pattern 7: Unvalidated redirect
      - pattern: "->redirect\\(\\s*\\$(?!(this->|allowed_destinations|config))"
        message: "Unvalidated redirects can lead to open redirect vulnerabilities. Whitelist allowed destinations."
        
      # Pattern 8: Raw user input in conditions
      - pattern: "->condition\\([^,]*,\\s*\\$(?!(this->|config|entity|storage))[^,]*,"
        message: "Use proper input validation before using variables in database conditions to prevent SQL injection."
        
      # Pattern 9: Missing CSRF protection in forms
      - pattern: "(?<!buildForm|getFormId)\\s*function\\s+[a-zA-Z0-9_]+Form\\s*\\([^{]*\\{[^}]*return\\s+\\$form;(?![^}]*FormBuilderInterface|[^}]*::TOKEN|[^}]*#token)"
        message: "Form submissions must include CSRF protection with $form['#token']."
        
      # Pattern 10: Unvalidated file operations
      - pattern: "file_get_contents\\(\\s*\\$(?!(this->|allowed_paths|config))"
        message: "Validate file paths before operations to prevent path traversal attacks."

  - type: suggest
    message: |
      **Drupal Injection Prevention Best Practices:**
      
      1. **SQL Injection Prevention:**
         - Always use parameterized queries with placeholders
         - Use the Database API's condition methods: ->condition(), ->where()
         - Properly escape table and field names with {}
         - Consider using EntityQuery for entity operations
      
      2. **XSS Prevention:**
         - Use Drupal's t() function for user-visible strings
         - Apply appropriate filtering: Html::escape(), Xss::filter(), Xss::filterAdmin()
         - Use #plain_text instead of #markup when displaying user input
         - Utilize Twig's automatic escaping in templates
         - For admin UIs, be careful with Xss::filterAdmin() as it allows some tags
      
      3. **CSRF Protection:**
         - Always include form tokens with $form['#token']
         - Validate form tokens with FormState->validateToken()
         - For AJAX requests, utilize Drupal's ajax framework
         - Use drupal_valid_token() for custom validation
      
      4. **Command Injection Prevention:**
         - Avoid command execution functions entirely
         - Use Symfony\Component\Process\Process with escaped arguments
         - Validate and whitelist any input used in command contexts
      
      5. **Path Traversal Prevention:**
         - Validate file paths with FileSystem::validatedLocalFileSystem()
         - Use stream wrappers (public://, private://) instead of direct paths
         - Implement strict input validation for any path components

  - type: validate
    conditions:
      # Check 1: Proper SQL query usage
      - pattern: "->query\\(['\"][^'\"]*\\?[^'\"]*['\"],\\s*\\[[^\\]]*\\]\\)"
        message: "Properly using parameterized queries with placeholders."
      
      # Check 2: Proper XSS prevention
      - pattern: "(t\\(|Xss::filter|Html::escape|#plain_text)"
        message: "Using proper XSS prevention techniques."
      
      # Check 3: Proper CSRF protection
      - pattern: "#token|FormBuilderInterface::TOKEN|drupal_valid_token"
        message: "Implementing CSRF protection correctly."
      
      # Check 4: Safe file operations
      - pattern: "FileSystem::validatedLocalFileSystem|file_exists\\(\\s*DRUPAL_ROOT"
        message: "Using safe file operation practices."

metadata:
  priority: high
  version: 1.0
  tags:
    - security
    - drupal
    - injection
    - sql
    - xss
    - csrf
    - owasp
    - language:php
    - framework:drupal
    - category:security
    - subcategory:injection
    - standard:owasp-top10
    - risk:a03-injection
  references:
    - "https://owasp.org/Top10/A03_2021-Injection/"
    - "https://www.drupal.org/docs/security-in-drupal/writing-secure-code-for-drupal"
    - "https://www.drupal.org/docs/8/security/drupal-8-sanitizing-output"
    - "https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Component%21Utility%21Xss.php/class/Xss/9"
</rule> 