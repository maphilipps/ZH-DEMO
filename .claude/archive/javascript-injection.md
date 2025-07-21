---
description: Identifies and helps prevent injection vulnerabilities in JavaScript applications, as defined in OWASP Top 10:2021-A03.
globs: **/*.js, **/*.jsx, **/*.ts, **/*.tsx, !**/node_modules/**, !**/dist/**, !**/build/**, !**/coverage/**
---
# JavaScript Injection Security Rule

<rule>
name: javascript_injection
description: Identifies and helps prevent injection vulnerabilities in JavaScript applications, as defined in OWASP Top 10:2021-A03.

actions:
  - type: enforce
    conditions:
      - pattern: "eval\\(([^)]*(req|request|query|param|user|input)[^)]*)\\)"
        severity: "critical"
        message: |
          🔴 CRITICAL: Potential code injection vulnerability detected.
          
          Impact: Attackers can execute arbitrary code in your application context.
          CWE Reference: CWE-95 (Improper Neutralization of Directives in Dynamically Evaluated Code)
          
          ❌ Insecure:
          eval(req.body.data)
          
          ✅ Secure Alternative:
          // Use safer alternatives like JSON.parse for JSON data
          try {
            const data = JSON.parse(req.body.data);
            // Process data safely
          } catch (error) {
            // Handle parsing errors
          }
        learn_more_url: "https://owasp.org/www-community/attacks/Direct_Dynamic_Code_Evaluation_Eval_Injection"
      
      - pattern: "\\$\\(\\s*(['\"])<[^>]+>\\1\\s*\\)"
        severity: "high"
        message: |
          🟠 HIGH: jQuery HTML injection vulnerability detected.
          
          Impact: This can lead to Cross-Site Scripting (XSS) attacks.
          CWE Reference: CWE-79 (Improper Neutralization of Input During Web Page Generation)
          
          ❌ Insecure:
          $("<div>" + userProvidedData + "</div>")
          
          ✅ Secure Alternative:
          // Create element safely, then set text content
          const div = $("<div></div>");
          div.text(userProvidedData);
        learn_more_url: "https://cheatsheetseries.owasp.org/cheatsheets/jQuery_Security_Cheat_Sheet.html"
      
      - pattern: "document\\.write\\(|document\\.writeln\\("
        severity: "high"
        message: |
          🟠 HIGH: Potential DOM-based XSS vulnerability.
          
          Impact: Attackers can inject malicious HTML/JavaScript into your page.
          CWE Reference: CWE-79 (Improper Neutralization of Input During Web Page Generation)
          
          ❌ Insecure:
          document.write("<h1>" + userGeneratedContent + "</h1>");
          
          ✅ Secure Alternative:
          // Use safer DOM manipulation methods
          const h1 = document.createElement("h1");
          h1.textContent = userGeneratedContent;
          document.body.appendChild(h1);
        learn_more_url: "https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html"
      
      - pattern: "innerHTML\\s*=|outerHTML\\s*="
        pattern_negate: "sanitize|DOMPurify|escapeHTML"
        severity: "high"
        message: |
          🟠 HIGH: Potential DOM-based XSS through innerHTML/outerHTML.
          
          Impact: Setting HTML content directly can allow script injection.
          CWE Reference: CWE-79 (Improper Neutralization of Input During Web Page Generation)
          
          ❌ Insecure:
          element.innerHTML = userProvidedData;
          
          ✅ Secure Alternative:
          // Option 1: Use textContent instead for text
          element.textContent = userProvidedData;
          
          // Option 2: Sanitize if HTML is required
          import DOMPurify from 'dompurify';
          element.innerHTML = DOMPurify.sanitize(userProvidedData);
        learn_more_url: "https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html"
      
      - pattern: "\\$\\(.*\\)\\.html\\("
        pattern_negate: "sanitize|DOMPurify|escapeHTML"
        severity: "high"
        message: |
          🟠 HIGH: jQuery HTML injection risk detected.
          
          Impact: Setting HTML content can lead to XSS vulnerabilities.
          CWE Reference: CWE-79 (Improper Neutralization of Input During Web Page Generation)
          
          ❌ Insecure:
          $("#element").html(userProvidedData);
          
          ✅ Secure Alternative:
          // Option 1: Use text() instead for text
          $("#element").text(userProvidedData);
          
          // Option 2: Sanitize if HTML is required
          import DOMPurify from 'dompurify';
          $("#element").html(DOMPurify.sanitize(userProvidedData));
        learn_more_url: "https://cheatsheetseries.owasp.org/cheatsheets/jQuery_Security_Cheat_Sheet.html"
      
      - pattern: "require\\(([^)]*(req|request|query|param|user|input)[^)]*)\\)"
        severity: "critical"
        message: |
          🔴 CRITICAL: Dynamic require() can lead to remote code execution.
          
          Impact: Attackers can load arbitrary modules or access sensitive files.
          CWE Reference: CWE-95 (Improper Neutralization of Directives in Dynamically Evaluated Code)
          
          ❌ Insecure:
          const module = require(req.query.module);
          
          ✅ Secure Alternative:
          // Use a whitelisproach
          const allowedModules = {
            'user': './modules/user',
            'product': './modules/product'
          };
          
          const moduleName = req.query.module;
          if (allowedModules[moduleName]) {
            const module = require(allowedModules[moduleName]);
            // Use module safely
          } else {
            // Handle invalid module request
          }
        learn_more_url: "https://owasp.org/www-project-top-ten/2017/A1_2017-Injection"
      
      - pattern: "exec\\(([^)]*(req|request|query|param|user|input)[^)]*)\\)"
        severity: "critical"
        message: |
          🔴 CRITICAL: Command injection vulnerability detected.
          
          Impact: Attackers can execute arbitrary system commands.
          CWE Reference: CWE-78 (Improper Neutralization of Special Elements used in an OS Command)
          
          ❌ Insecure:
          exec('ls ' + userInput, (error, stdout, stderr) => {
            // Process output
          });
          
          ✅ Secure Alternative:
          // Use child_process.execFile with separate arguments
          import { execFile } from 'child_process';
          
          execFile('ls', [safeDirectory], (error, stdout, stderr) => {
            // Process output safely
          });
          
          // Or use a validation library to sanitize inputs
          import validator from 'validator';
          if (validator.isAlphanumeric(userInput)) {
            exec('ls ' + userInput, (error, stdout, stderr) => {
              // Process output
            });
          }
        learn_more_url: "https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html"

  - type: suggest
    message: |
      **JavaScript Injection Prevention Best Practices:**
      
      1. **Input Validation:**
         - Validate all user inputs both client-side and server-side
         - Use allowlists instead of blocklists
         - Apply strict type checking and schema validation
      
      2. **Output Encoding:**
         - Always encode/escape output in the correct context (HTML, JavaScript, CSS, URL)
         - Use libraries like DOMPurify for HTML sanitization
         - Avoid building HTML, JavaScript, SQL dynamically from user inputs
      
      3. **Content Security Policy (CSP):**
         - Implement a strict CSP to prevent execution of malicious scripts
         - Use nonce-based or hash-based CSP to allow only specific scripts
      
      4. **Structured Data Formats:**
         - Use structured data formats like JSON, XML with proper parsers
         - Avoid manually parsing or constructing these formats
      
      5. **Parameterized APIs:**
         - Use parameterized APIs for database queries, OS commands
         - Separate code from data to prevent injection
      
      6. **DOM Manipulation:**
         - Prefer .textContent over .innerHTML when displaying user content
         - Use document.createElement() and node methods instead of directly setting HTML
      
      7. **Frameworks and Libraries:**
         - Keep frameworks and libraries updated to latest secure versions
         - Many modern frameworks offer built-in protections against common injection attacks

metadata:
  priority: critical
  version: 1.1
  tags: 
    - language:javascript
    - category:security
    - standard:owasp-top10
    - risk:a03-injection
  references:
    - "https://owasp.org/Top10/A03_2021-Injection/"
    - "https://cheatsheetseries.owasp.org/cheatsheets/Injection_Prevention_Cheat_Sheet.html"
    - "https://nodegoat.herokuapp.com/tutorial/a1"
    - "https://github.com/OWASP/NodeGoat"
</rule>
