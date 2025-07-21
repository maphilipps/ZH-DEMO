---
description: Detect and prevent Server-Side Request Forgery (SSRF) vulnerabilities in Drupal applications as defined in OWASP Top 10:2021-A10
globs: *.php, *.inc, *.module, *.install, *.theme
alwaysApply: false
---
# Drupal Server-Side Request Forgery Standards (OWASP A10:2021)

This rule enforces security best practices to prevent Server-Side Request Forgery (SSRF) vulnerabilities in Drupal applications, as defined in OWASP Top 10:2021-A10.

<rule>
name: drupal_ssrf
description: Detect and prevent Server-Side Request Forgery (SSRF) vulnerabilities in Drupal applications as defined in OWASP Top 10:2021-A10
filters:
  - type: file_extension
    pattern: "\\.(php|inc|module|install|theme)$"
  - type: file_path
    pattern: ".*"

actions:
  - type: enforce
    conditions:
      # Pattern 1: Unsafe URL construction with user input
      - pattern: "(file_get_contents|fopen|curl_exec|drupal_http_request|\\$client->request|\\$client->get|Drupal::httpClient\\(\\)->get)\\s*\\([^)]*\\$_(GET|POST|REQUEST|COOKIE|SERVER|FILES)[^)]*\\)"
        message: "Potential SSRF vulnerability: URL constructed with user input. Validate and sanitize user-supplied URL parameters before making requests."
        
      # Pattern 2: Unsafe Guzzle HTTP client usage
      - pattern: "GuzzleHttp\\\\Client[^;]*;[^;]*->request\\s*\\([^;]*\\$[^;]*"
        message: "Validate and restrict URLs before making HTTP requests with Guzzle to prevent SSRF attacks."
        
      # Pattern 3: Missing URL validation before making HTTP requests
      - pattern: "(Http(Client|Request)|curl_exec|file_get_contents)\\s*\\([^)]*(http|\\$[a-zA-Z0-9_]+)[^)]*\\)[^;]*;(?![^;]*(valid|check|sanitize|UrlHelper))"
        message: "HTTP requests should validate URLs with \\Drupal\\Component\\Utility\\UrlHelper::isValid() before execution to prevent SSRF."
        
      # Pattern 4: Unsafe URL construction with variable input
      - pattern: "(https?:?//|www\\.)\\s*\\.\\s*\\$[a-zA-Z0-9_]+"
        message: "Potential SSRF vulnerability: URL being constructed with variable concatenation. Use URL validation and allowlisting."
        
      # Pattern 5: Using file system wrappers which can lead to SSRF
      - pattern: "file_get_contents\\([\"'](mdc:?:http|https|ftp|php|data|expect|zip|phar)://"
        message: "Avoid using PHP wrappers with file operations that could lead to SSRF vulnerabilities."
        
      # Pattern 6: Bypassing local proxy settings
      - pattern: "CURLOPT_PROXY[^;]*none|CURLOPT_PROXY[^;]*null"
        message: "Bypassing proxy settings can lead to SSRF vulnerabilities. Maintain proper proxy configurations."
        
      # Pattern 7: Unsafe processing of XML with external entities
      - pattern: "simplexml_load_|DOMDocument|SimpleXMLElement|xml_parse"
        message: "XML processing without disabling external entities can lead to XXE and SSRF. Use libxml_disable_entity_loader(true)."
        
      # Pattern 8: Accessing or using internal network IPs
      - pattern: "(127\\.0\\.0\\.1|10\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}|172\\.(1[6-9]|2[0-9]|3[0-1])\\.[0-9]{1,3}\\.[0-9]{1,3}|192\\.168\\.[0-9]{1,3}\\.[0-9]{1,3}|169\\.254\\.[0-9]{1,3}\\.[0-9]{1,3}|localhost)"
        message: "Hardcoded internal IP addresses or localhost may facilitate SSRF attacks if exposed to user manipulation."
        
      # Pattern 9: Custom Drupal HTTP client usage without validation
      - pattern: "\\\\Drupal::httpClient\\(\\)(?!.*[^;]*UrlHelper::isValid)"
        message: "Always validate URLs with UrlHelper::isValid() before making HTTP requests with Drupal's HTTP client."
        
      # Pattern 10: Allowing unrestricted ports in HTTP requests
      - pattern: "curl_setopt\\([^,]+,\\s*CURLOPT_PORT,\\s*\\$[a-zA-Z0-9_]+"
        message: "Potential SSRF vulnerability: Restrict allowed ports for outbound HTTP requests to prevent service probing."

  - type: suggest
    message: |
      **Drupal SSRF Prevention Best Practices:**
      
      1. **Input Validation for URLs:**
         - Always validate any user-supplied URL or URL components
         - Use `\Drupal\Component\Utility\UrlHelper::isValid()` to validate URLs
         - Implement allowlists rather than blocklists for domains/IPs
         - Parse URLs and validate each component (protocol, domain, port, path)
         
      2. **Network-Level Controls:**
         - Implement network-level access controls for internal services
         - Use application firewalls to restrict outbound connections
         - Configure proxies to control and monitor outbound requests
         - Segment sensitive internal services from public-facing applications
         
      3. **Request Handling:**
         - Avoid passing raw user input to HTTP clients
         - Set reasonable timeouts for all HTTP requests
         - Disable HTTP redirects or limit redirect chains
         - Validate response types match expected formats
         - Use dedicated service accounts with minimal privileges for API calls
         
      4. **Drupal-Specific Controls:**
         - Utilize Drupal's built-in UrlHelper class for URL validation
         - Configure Guzzle HTTP client with appropriate security options
         - Consider using middleware to enforce URL validation
         - Use Drupal's logging system to record suspicious outbound requests
         - Implement specific content security policies
         
      5. **Authentication and Access Controls:**
         - Implement proper authentication for internal service calls
         - Use context-specific API tokens with limited privileges
         - Avoid exposing service credentials in code or configurations
         - Implement rate limiting for outbound requests

  - type: validate
    conditions:
      # Check 1: Proper URL validation
      - pattern: "UrlHelper::isValid\\([^)]+\\)"
        message: "Using proper URL validation with UrlHelper."
      
      # Check 2: Allowlisting domains
      - pattern: "array_intersect|in_array|allowlist|whitelist"
        message: "Implementing domain/URL allowlisting for outbound requests."
      
      # Check 3: Safe XML processing
      - pattern: "libxml_disable_entity_loader\\(true\\)"
        message: "Properly disabling XML external entities."
      
      # Check 4: Using Drupal's HTTP client safely
      - pattern: "\\\\Drupal::httpClient\\(\\)[^;]*\\$options"
        message: "Using Drupal's HTTP client with explicit options."

metadata:
  priority: high
  version: 1.0
  tags:
    - security
    - drupal
    - ssrf
    - owasp
    - language:php
    - framework:drupal
    - category:security
    - subcategory:ssrf
    - standard:owasp-top10
    - risk:a10-ssrf
  references:
    - "https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/"
    - "https://cwe.mitre.org/data/definitions/918.html"
    - "https://www.drupal.org/docs/develop/security-in-drupal/writing-secure-code-for-drupal"
    - "https://portswigger.net/web-security/ssrf"
    - "https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html"
</rule> 
