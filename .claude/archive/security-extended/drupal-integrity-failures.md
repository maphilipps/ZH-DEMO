---
description: Detect and prevent software and data integrity failures in Drupal as defined in OWASP Top 10:2021-A08
globs: *.php, *.install, *.module, *.inc, *.theme, *.yml, *.json
alwaysApply: false
---
# Drupal Software and Data Integrity Failures Standards (OWASP A08:2021)

This rule enforces security best practices to prevent software and data integrity failures in Drupal applications, as defined in OWASP Top 10:2021-A08.

<rule>
name: drupal_integrity_failures
description: Detect and prevent software and data integrity failures in Drupal as defined in OWASP Top 10:2021-A08
filters:
  - type: file_extension
    pattern: "\\.(php|inc|module|install|theme|yml|json)$"
  - type: file_path
    pattern: ".*"

actions:
  - type: enforce
    conditions:
      # Pattern 1: Insecure deserialization
      - pattern: "unserialize\\(\\$|unserialize\\([^,]+\\$|php_unserialize\\(\\$"
        message: "Insecure PHP deserialization detected. Use safer alternatives like JSON for data interchange or implement proper validation before deserialization."
        
      # Pattern 2: Unsafe use of eval or similar functions
      - pattern: "eval\\(|assert\\(|create_function\\("
        message: "Potentially dangerous code execution function detected. Avoid dynamic code execution whenever possible."
        
      # Pattern 3: Insecure plugin/module loading
      - pattern: "module_load_include\\(\\$|require(_once)?\\s*\\(\\s*\\$|include(_once)?\\s*\\(\\s*\\$"
        message: "Dynamic inclusion of files based on user input is dangerous. Use validated, allowlisted paths only."
        
      # Pattern 4: Missing update verification
      - pattern: "update\\.settings\\.yml|function [a-zA-Z0-9_]+_update_[0-9]+\\(\\)"
        message: "Ensure update hooks validate the integrity of updates and data transformations to prevent unauthorized modifications."
        
      # Pattern 5: Unsafe configuration imports
      - pattern: "ConfigImporter|\\$config_importer|config_import|cmci"
        message: "Validate configuration before import to ensure integrity and detect potentially malicious changes."
        
      # Pattern 6: Unchecked remote data
      - pattern: "drupal_http_request\\(|\\\\Drupal::httpClient\\(\\)->get\\(|curl_exec\\("
        message: "Always validate data from remote sources before processing or storing it. Implement integrity checks for remote content."
        
      # Pattern 7: Insecure Composer usage
      - pattern: "composer\\.json"
        message: "Verify you're using secure Composer practices: validate package signatures, pin dependencies, and use composer.lock."
        
      # Pattern 8: Direct database modifications
      - pattern: "INSERT\\s+INTO|UPDATE\\s+[a-zA-Z0-9_]+\\s+SET|db_update\\(|->update\\(|->insert\\("
        message: "Direct database modifications should implement validation to preserve data integrity. Prefer using entity API."
        
      # Pattern 9: Missing file integrity verification
      - pattern: "file_save_data\\(|file_save_upload\\(|file_copy\\(|file_move\\("
        message: "Implement file integrity checking for uploaded or manipulated files to prevent malicious content."
        
      # Pattern 10: Unsafe entity creation
      - pattern: "\\$entity\\s*=\\s*new\\s+[A-Za-z]+\\(|::create\\(\\$"
        message: "Validate all input used to create entity objects to maintain data integrity and prevent creating malicious entities."

  - type: suggest
    message: |
      **Drupal Data & Software Integrity Best Practices:**
      
      1. **Secure Deserialization:**
         - Avoid PHP's unserialize() with untrusted data entirely
         - Use JSON or other structured formats for data interchange
         - When deserialization is necessary, implement allowlists and validation
         - Consider using Drupal's typed data API for structured data handling
         - Avoid serializing sensitive data that could be tampered with
      
      2. **Update & Configuration Integrity:**
         - Validate data before and after migrations/updates
         - Implement checksums/hashing for critical configuration
         - Use Drupal's Configuration Management system properly
         - Monitor configuration changes for unauthorized modifications
         - Implement proper workflow for configuration management
      
      3. **Dependency & Plugin Security:**
         - Verify the integrity of downloaded modules and themes
         - Use Composer with package signature verification
         - Pin dependencies to specific versions in production
         - Maintain awareness of security advisories
         - Implement proper validation for plugin/module loading
      
      4. **CI/CD Pipeline Security:**
         - Sign build artifacts
         - Verify signatures during deployment
         - Implement proper secrets management
         - Control access to build and deployment systems
         - Validate code changes through code reviews
      
      5. **Data Integrity Validation:**
         - Use database constraints to enforce data integrity
         - Implement validation at every layer of the application
         - Add integrity checks for critical data flows
         - Maintain audit logs for data modifications
         - Regularly verify data consistency

  - type: validate
    conditions:
      # Check 1: Secure serialization alternatives
      - pattern: "json_encode|json_decode|\\\\Drupal::service\\('serialization\\.|->toArray\\(\\)"
        message: "Using safer serialization alternatives."
      
      # Check 2: Proper entity validation
      - pattern: "\\$entity->validate\\(\\)|\\$violations\\s*=\\s*\\$entity->validate\\(\\)"
        message: "Properly validating entity data."
      
      # Check 3: Config verification
      - pattern: "::validateSyncedConfig\\(|ConfigImporter::validate|->getUnprocessedConfiguration\\(\\)"
        message: "Implementing configuration validation."
      
      # Check 4: Safe file handling
      - pattern: "file_validate_|FileValidatorInterface|\\$validators"
        message: "Using file validation mechanisms."

metadata:
  priority: high
  version: 1.0
  tags:
    - security
    - drupal
    - integrity
    - deserialization
    - owasp
    - language:php
    - framework:drupal
    - category:security
    - subcategory:integrity
    - standard:owasp-top10
    - risk:a08-integrity-failures
  references:
    - "https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/"
    - "https://www.drupal.org/docs/develop/security-in-drupal/drupal-8-sanitizing-output"
    - "https://www.drupal.org/docs/8/api/configuration-api/configuration-api-overview"
    - "https://www.drupal.org/docs/develop/using-composer"
</rule> 