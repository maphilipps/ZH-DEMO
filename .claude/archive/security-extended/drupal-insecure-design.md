---
description: Detect and prevent insecure design patterns in Drupal as defined in OWASP Top 10:2021-A04
globs: *.php, *.install, *.module, *.inc, *.theme, *.yml, *.info
alwaysApply: false
---
# Drupal Insecure Design Security Standards (OWASP A04:2021)

This rule enforces security best practices to prevent insecure design vulnerabilities in Drupal applications, as defined in OWASP Top 10:2021-A04.

<rule>
name: drupal_insecure_design
description: Detect and prevent insecure design patterns in Drupal as defined in OWASP Top 10:2021-A04
filters:
  - type: file_extension
    pattern: "\\.(php|inc|module|install|theme|info\\.yml)$"
  - type: file_path
    pattern: "(modules|themes|profiles)/custom"

actions:
  - type: enforce
    conditions:
      # Pattern 1: Insecure permission design
      - pattern: "\\$permissions\\[['\"][^'\"]+['\"]\\]\\s*=\\s*array\\((?![^)]*(administer|manage|edit|delete)[^)]*(content|configuration|users)).*?\\);"
        message: "Permissions should follow Drupal naming patterns (verb + object) and be specific. Avoid overly broad permissions."
        
      # Pattern 2: Hard-coded business logic values
      - pattern: "if\\s*\\([^\\)]*===?\\s*['\"][a-zA-Z0-9_]+['\"]\\s*\\)"
        message: "Consider moving business logic rules to configuration to allow for proper adjustment without code changes."
        
      # Pattern 3: Ad hoc input sanitization
      - pattern: "preg_replace|str_replace|strip_tags"
        message: "Avoid ad hoc sanitization. Use Drupal's built-in sanitization tools: t(), Xss::filter(), etc."
        
      # Pattern 4: Database logic in controllers
      - pattern: "class\\s+[a-zA-Z0-9_]+Controller.+\\{[^}]*->query\\("
        message: "Follow separation of concerns. Move database logic to services or repositories, not in controllers."
        
      # Pattern 5: Weak entity access policy
      - pattern: "function\\s+[a-zA-Z0-9_]+_entity_access\\([^)]*\\)\\s*\\{[^}]*return\\s+AccessResult::allowed\\(\\);"
        message: "Avoid unconditional access grants. Implement proper conditional checks based on roles, permissions, or entity ownership."
        
      # Pattern 6: Custom session management 
      - pattern: "session_start|session_set_cookie_params"
        message: "Avoid custom session management. Use Drupal's session handling system and services."
        
      # Pattern 7: Excessive global state dependency
      - pattern: "(?:\\\\Drupal::[a-zA-Z_]+\\(\\).*){3,}"
        message: "Excessive static service calls indicate poor dependency injection. Use proper service injection."
        
      # Pattern 8: Custom user authentication
      - pattern: "password_verify\\(|password_hash\\("
        message: "Avoid custom authentication. Use Drupal's built-in authentication system and services."
        
      # Pattern 9: Missing schema definitions
      - pattern: "function\\s+[a-zA-Z0-9_]+_schema\\(\\)[^{]*\\{[^}]*return\\s+\\$schema;(?![^}]*validate_utf8|[^}]*'not null')"
        message: "Database schemas should enforce data integrity with proper constraints (NOT NULL, length, etc.)."
        
      # Pattern 10: Insecure defaults
      - pattern: "\\$config\\[['\"](mdc:?!secure_|security_|private_)[^'\"]+['\"]\\]\\s*=\\s*(?:FALSE|0|'0'|\"0\");"
        message: "Security-related configuration should default to secure settings (opt-in for potentially insecure features)."

  - type: suggest
    message: |
      **Drupal Secure Design Best Practices:**
      
      1. **Secure Architecture Principles:**
         - Follow the principle of least privilege for all user roles and permissions
         - Implement defense in depth with multiple security layers
         - Use Drupal's entity/field API for structured data instead of custom tables
         - Employ service-oriented architecture with proper dependency injection
         - Follow Drupal coding standards to leverage community security expertise
      
      2. **Permission System Design:**
         - Design granular permissions following the verb+object pattern
         - Avoid creating omnipotent permissions that grant excessive access
         - Use context-aware access systems like Entity Access or Node Grants
         - Consider record-based and field-based access for better control
         - Document permission architecture and security implications
      
      3. **Module Architecture:**
         - Separate concerns into appropriate services
         - Use hooks judiciously and document security implications
         - Implement proper validation and sanitization layers
         - Design APIs with security in mind from the start
         - Provide secure default configurations
      
      4. **Data Modeling Security:**
         - Implement appropriate validation constraints on entity fields
         - Design schema definitions with integrity constraints
         - Use appropriate field types for sensitive data
         - Implement field-level access control when needed
         - Consider encryption for sensitive stored data
      
      5. **Error Handling and Logging:**
         - Design contextual error messages (detailed for admins, general for users)
         - Implement appropriate logging for security events
         - Avoid exposing sensitive data in error messages
         - Design fault-tolerant systems that fail securely
         - Include appropriate transaction management

  - type: validate
    conditions:
      # Check 1: Proper dependency injection
      - pattern: "protected\\s+\\$[a-zA-Z0-9_]+;[^}]*public\\s+function\\s+__construct\\([^\\)]*\\)"
        message: "Using proper dependency injection pattern."
      
      # Check 2: Configuration schema usage
      - pattern: "config\\/schema\\/[a-zA-Z0-9_]+\\.schema\\.yml"
        message: "Providing configuration schema for validation."
      
      # Check 3: Proper permission definition
      - pattern: "\\$permissions\\[['\"][a-z\\s]+[a-z0-9\\s]+['\"]\\]\\s*=\\s*\\["
        message: "Following permission naming conventions."
      
      # Check 4: Entity access handlers
      - pattern: "@EntityAccessControl\\(|class\\s+[a-zA-Z0-9_]+AccessControlHandler\\s+extends\\s+"
        message: "Using dedicated access control handlers for entities."

metadata:
  priority: high
  version: 1.0
  tags:
    - security
    - drupal
    - design
    - architecture
    - owasp
    - language:php
    - framework:drupal
    - category:security
    - subcategory:design
    - standard:owasp-top10
    - risk:a04-insecure-design
  references:
    - "https://owasp.org/Top10/A04_2021-Insecure_Design/"
    - "https://www.drupal.org/docs/develop/security-in-drupal"
    - "https://www.drupal.org/docs/8/api/entity-api/access-control-for-entities"
    - "https://www.drupal.org/docs/8/api/configuration-api/configuration-schemametadata"
</rule> 