---
description: Detect and prevent cryptographic failures in Drupal as defined in OWASP Top 10:2021-A02
globs: *.php, *.install, *.module, *.inc, *.theme
alwaysApply: false
---
# Drupal Cryptographic Failures Security Standards (OWASP A02:2021)

This rule enforces security best practices to prevent cryptographic failures in Drupal applications, as defined in OWASP Top 10:2021-A02.

<rule>
name: drupal_cryptographic_failures
description: Detect and prevent cryptographic failures in Drupal as defined in OWASP Top 10:2021-A02
filters:
  - type: file_extension
    pattern: "\\.(php|inc|module|install|theme)$"
  - type: file_path
    pattern: "(modules|themes|profiles|core)/.*"

actions:
  - type: enforce
    conditions:
      # Pattern 1: Use of weak hash algorithms
      - pattern: "(md5|sha1)\\([^)]*\\)"
        message: "Weak hash algorithm detected. Use password_hash() for passwords or hash('sha256'/'sha512') for other data."
        
      # Pattern 2: Hardcoded credentials or keys
      - pattern: "(password|key|token|secret|credentials|pwd)\\s*=\\s*['\"][^'\"]+['\"]"
        message: "Hardcoded credentials or sensitive keys detected. Use Drupal's State API, key module, or environment variables."
        
      # Pattern 3: Plaintext password storage
      - pattern: "\\$user->setPassword\\((?!password_hash|\\$hash)[^)]+\\)"
        message: "Never store plaintext passwords. Drupal handles password hashing internally."
        
      # Pattern 4: Improper file encryption
      - pattern: "file_(get|put)_contents\\([^,]+,\\s*[^,]+\\)"
        message: "Consider encrypting sensitive file contents using Drupal's encryption API or PHP's openssl functions."
        
      # Pattern 5: Unprotected sensitive data in settings
      - pattern: "\\$settings\\[['\"](mdc:?!hash_salt|update_free_access)[^]]+\\]\\s*=\\s*['\"][^\"']+['\"]"
        message: "Sensitive data in settings.php should be moved to environment variables or settings.local.php."
        
      # Pattern 6: Insecure random number generation
      - pattern: "(rand|mt_rand|array_rand)\\("
        message: "Insecure random number generation. Use random_bytes() or random_int() for cryptographic purposes."
        
      # Pattern 7: Missing HTTPS enforcement
      - pattern: "'#cache'|'cache'"
        message: "Ensure HTTPS is enforced for cached pages containing sensitive information."
        
      # Pattern 8: Missing encryption for content with private information
      - pattern: "(->set|->get)\\('field_[^']*(?:password|ssn|credit|card|secret|key|token|credentials|pwd)[^']*'\\)"
        message: "Consider using field encryption for sensitive data fields."
        
      # Pattern 9: Custom session handling without proper security
      - pattern: "session_(start|regenerate_id)"
        message: "Avoid custom session handling. Use Drupal's session management services."
        
      # Pattern 10: API tokens without expiration or rotation
      - pattern: "\\$token\\s*=\\s*.*?\\$[^;]+;(?![^;]*expir|[^;]*valid)"
        message: "API tokens should include expiration time or rotation mechanism."

  - type: suggest
    message: |
      **Drupal Cryptographic Security Best Practices:**
      
      1. **Secure Data Storage:**
         - Use Drupal's Key module for storing encryption keys
         - Store sensitive configuration in environment variables or settings.local.php
         - Use Drupal's State API for non-configuration sensitive data
         - Never store plaintext sensitive information in the database
      
      2. **Encryption and Hashing:**
         - Use Drupal's password hashing system, which uses password_hash() internally
         - For non-password data hashing, use SHA-256 or SHA-512
         - Use the Encrypt module or PHP's openssl_encrypt() with proper algorithms (AES-256-GCM)
         - Always use proper salting techniques
      
      3. **Communication Security:**
         - Enforce HTTPS site-wide using settings.php configuration
         - Use secure cookies (secure, HttpOnly, SameSite)
         - Implement proper Content-Security-Policy headers
         - Use TLS 1.2+ for all connections
      
      4. **API Security:**
         - Use OAuth or JWT with proper signature verification
         - Implement token expiration and rotation
         - Use HMAC for API request signatures when appropriate
         - Never expose internal encryption keys through APIs
      
      5. **Configuration Best Practices:**
         - Regularly rotate encryption keys and credentials
         - Implement secure key storage using key management services
         - Monitor and log cryptographic operations 
         - Maintain an inventory of cryptographic algorithms in use

  - type: validate
    conditions:
      # Check 1: Proper password handling
      - pattern: "UserInterface::PASSWORD_|password_hash\\("
        message: "Using Drupal's password system correctly."
      
      # Check 2: Proper random generation
      - pattern: "random_bytes|random_int|\\\\Drupal::service\\('random'\\)"
        message: "Using secure random generation methods."
      
      # Check 3: Secure settings
      - pattern: "getenv\\('|\\$_ENV\\['|\\$_SERVER\\['|settings\\.local\\.php"
        message: "Using environment variables or local settings correctly."
      
      # Check 4: Proper encryption usage
      - pattern: "openssl_encrypt\\(|\\\\Drupal::service\\('encryption'\\)"
        message: "Using proper encryption methods."

metadata:
  priority: high
  version: 1.0
  tags:
    - security
    - drupal
    - cryptography
    - encryption
    - owasp
    - language:php
    - framework:drupal
    - category:security
    - subcategory:cryptography
    - standard:owasp-top10
    - risk:a02-cryptographic-failures
  references:
    - "https://owasp.org/Top10/A02_2021-Cryptographic_Failures/"
    - "https://www.drupal.org/docs/security-in-drupal"
    - "https://www.drupal.org/project/key"
    - "https://www.drupal.org/project/encrypt"
</rule> 