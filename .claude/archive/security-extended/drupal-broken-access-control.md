---
description: Detect and prevent broken access control vulnerabilities in Drupal as defined in OWASP Top 10:2021-A01
globs: *.php, *.install, *.module, *.inc, *.theme
alwaysApply: false
---
# Drupal Broken Access Control Security Standards (OWASP A01:2021)

This rule enforces security best practices to prevent broken access control vulnerabilities in Drupal applications, as defined in OWASP Top 10:2021-A01.

<rule>
name: drupal_broken_access_control
description: Detect and prevent broken access control vulnerabilities in Drupal as defined in OWASP Top 10:2021-A01
filters:
  - type: file_extension
    pattern: "\\.(php|inc|module|install|theme)$"
  - type: file_path
    pattern: "(modules|themes|profiles)/custom"

actions:
  - type: enforce
    conditions:
      # Pattern 1: Missing access checks in routes
      - pattern: "\\s*\\$routes\\['[^']*'\\]\\s*=\\s*.*(?!_access|access_callback|requirements)"
        message: "Route definition is missing access control. Add '_permission', '_role', '_access', or custom access check in requirements."
        
      # Pattern 2: Using user_access() instead of more secure methods
      - pattern: "user_access\\("
        message: "user_access() is deprecated. Use $account->hasPermission() or proper dependency injection with AccessResult methods."
        
      # Pattern 3: Hard-coded user ID checks
      - pattern: "(\\$user->id\\(\\)|\\$user->uid)\\s*===?\\s*1"
        message: "Avoid hardcoded checks against user ID 1. Use role-based permissions or proper access control services."
        
      # Pattern 4: Missing access check on entity operations
      - pattern: "\\$entity->(?!access)(save|delete|update)\\(\\)"
        message: "Entity operation without prior access check. Use \$entity->access('operation') before performing operations."
        
      # Pattern 5: Using Drupal::currentUser() directly in services
      - pattern: "\\\\Drupal::currentUser\\(\\)"
        message: "Avoid using \\Drupal::currentUser() directly. Inject the current_user service for better testability and security."
        
      # Pattern 6: Missing access checks in controllers
      - pattern: "class [A-Za-z0-9_]+Controller.+extends ControllerBase[^}]+public function [a-zA-Z0-9_]+\\([^{]*\\)\\s*\\{(?![^}]*access)"
        message: "Controller method lacks explicit access checking. Add checks via route requirements or within the controller method."
        
      # Pattern 7: Direct field value manipulation without access check
      - pattern: "\\$entity->set\\([^)]+\\)\\s*;(?![^;]*access)"
        message: "Direct field value manipulation without access check. Verify entity field access before manipulation."
        
      # Pattern 8: Unprotected REST endpoints
      - pattern: "@RestResource\\([^)]*\\)(?![^{]*_access|access_callback)"
        message: "REST resource lacks access controls. Add access checks via annotations or in methods."
        
      # Pattern 9: Insecure access check by client IP
      - pattern: "\\$_SERVER\\['REMOTE_ADDR'\\]\\s*===?\\s*"
        message: "IP-based access control is insufficient. Use proper Drupal permission system instead."
        
      # Pattern 10: Allow bypassing cache for authenticated users without proper checks
      - pattern: "#cache\\['contexts'\\]\\s*=\\s*\\[[^\\]]*'user'[^\\]]*\\]"
        message: "Using 'user' cache context without proper access checks may expose content to unauthorized users."

  - type: suggest
    message: |
      **Drupal Access Control Best Practices:**
      
      1. **Route Access Controls:**
         - Always define access requirements in route definitions
         - Use permission-based access checks: '_permission', '_role', '_entity_access'
         - Implement custom access checkers implementing AccessInterface
      
      2. **Entity Access Controls:**
         - Always check entity access: $entity->access('view'|'update'|'delete') 
         - Use EntityAccessControlHandler for consistent access control
         - Respect entity field access with $entity->get('field')->access('view'|'edit')
      
      3. **Controller Security:**
         - Inject and use proper services rather than \Drupal static calls
         - Add explicit access checks within controller methods
         - Use AccessResult methods (allowed, forbidden, neutral) with proper caching metadata
      
      4. **Service Security:**
         - Inject AccountProxyInterface rather than calling currentUser() directly
         - Use dependency injection for access-related services
         - Implement session-based CSRF protection with form tokens
      
      5. **REST/API Security:**
         - Implement OAuth or proper authentication
         - Define specific permissions for REST operations
         - Never rely solely on client-side access control

  - type: validate
    conditions:
      # Check 1: Ensuring proper access check implementation
      - pattern: "AccessResult::(allowed|forbidden|neutral)\\(\\)(?=.*addCacheContexts)"
        message: "Access check is properly implemented with cache metadata."
      
      # Check 2: Proper hook_entity_access implementation
      - pattern: "function hook_entity_access\\([^)]*\\)\\s*\\{[^}]*return AccessResult"
        message: "Entity access hook is correctly returning AccessResult."
      
      # Check 3: Properly secured route access
      - pattern: "_permission|_role|_access|_entity_access|_custom_access"
        message: "Route has proper access controls defined."
      
      # Check 4: Secure REST implementation
      - pattern: "@RestResource\\(.*,\\s*authentication\\s*=\\s*\\{[^}]+\\}"
        message: "REST Resource has authentication configured."

metadata:
  priority: high
  version: 1.0
  tags:
    - security
    - drupal
    - access-control
    - permissions
    - owasp
    - language:php
    - framework:drupal
    - category:security
    - subcategory:access-control
    - standard:owasp-top10
    - risk:a01-broken-access-control
  references:
    - "https://owasp.org/Top10/A01_2021-Broken_Access_Control/"
    - "https://www.drupal.org/docs/8/api/routing-system/access-checking-on-routes"
    - "https://www.drupal.org/docs/8/api/entity-api/entity-access-api"
</rule>