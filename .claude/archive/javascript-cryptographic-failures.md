---
description: Detect and prevent cryptographic failures in JavaScript applications as defined in OWASP Top 10:2021-A02
globs: **/*.js, **/*.jsx, **/*.ts, **/*.tsx, !**/node_modules/**, !**/dist/**, !**/build/**, !**/coverage/**
---
# JavaScript Cryptographic Failures (OWASP A02:2021)

<rule>
name: javascript_cryptographic_failures
description: Detect and prevent cryptographic failures in JavaScript applications as defined in OWASP Top 10:2021-A02

actions:
  - type: enforce
    conditions:
      # Pattern 1: Weak or insecure cryptographic algorithms
      - pattern: "(?:createHash|crypto\\.createHash)\\(['\"](?:md5|sha1)['\"]\\)|(?:crypto|require\\(['\"]crypto['\"]\\))\\.(?:createHash|Hash)\\(['\"](?:md5|sha1)['\"]\\)|new (?:MD5|SHA1)\\(|CryptoJS\\.(?:MD5|SHA1)\\("
        message: "Using weak hashing algorithms (MD5/SHA1). Use SHA-256 or stronger algorithms."
        
      # Pattern 2: Hardcoded secrets/credentials
      - pattern: "(?:const|let|var)\\s+(?:password|secret|key|token|auth|apiKey|api_key)\\s*=\\s*['\"][^'\"]+['\"]"
        message: "Potential hardcoded credentials detected. Store secrets in environment variables or a secure vault."
        
      # Pattern 3: Insecure random number generation
      - pattern: "Math\\.random\\(\\)|Math\\.floor\\(\\s*Math\\.random\\(\\)\\s*\\*"
        message: "Using Math.random() for security purposes. Use crypto.randomBytes() or Web Crypto API for cryptographic operations."
        
      # Pattern 4: Weak SSL/TLS configuration
      - pattern: "(?:tls|https|require\\(['\"]https['\"]\\)|require\\(['\"]tls['\"]\\))\\.(?:createServer|request|get)\\([^\\)]*?{[^}]*?secureProtocol\\s*:\\s*['\"](?:SSLv2_method|SSLv3_method|TLSv1_method|TLSv1_1_method)['\"]"
        message: "Using deprecated/insecure SSL/TLS protocol versions. Use TLS 1.2+ for secure communications."
        
      # Pattern 5: Missing certificate validation
      - pattern: "(?:rejectUnauthorized|strictSSL)\\s*:\\s*false"
        message: "SSL certificate validation is disabled. Always validate certificates in production environments."
        
      # Pattern 6: Insecure cipher usage
      - pattern: "(?:createCipheriv|crypto\\.createCipheriv)\\(['\"](?:des|des3|rc4|bf|blowfish|aes-\\d+-ecb)['\"]"
        message: "Using insecure encryption cipher or mode. Use AES with GCM or CBC mode with proper padding."
        
      # Pattern 7: Insufficient key length
      - pattern: "(?:generateKeyPair|generateKeyPairSync)\\([^,]*?['\"]rsa['\"][^,]*?{[^}]*?modulusLength\\s*:\\s*(\\d{1,3}|1[0-9]{3}|20[0-3][0-9]|204[0-7])\\s*}"
        message: "Using insufficient key length for asymmetric encryption. RSA keys should be at least 2048 bits, preferably 4096 bits."
        
      # Pattern 8: Insecure password hashing
      - pattern: "(?:createHash|crypto\\.createHash)\\([^)]*?\\)\\.(?:update|digest)\\([^)]*?\\)|CryptoJS\\.(?:SHA256|SHA512|SHA3)\\([^)]*?\\)"
        negative_pattern: "(?:bcrypt|scrypt|pbkdf2|argon2)"
        message: "Using plain hashing for passwords. Use dedicated password hashing functions like bcrypt, scrypt, or PBKDF2."
        
      # Pattern 9: Missing salt in password hashing
      - pattern: "(?:pbkdf2|pbkdf2Sync)\\([^,]+,[^,]+,[^,]+,\\s*\\d+\\s*,[^,]+\\)"
        negative_pattern: "(?:salt|crypto\\.randomBytes)"
        message: "Ensure you're using a proper random salt with password hashing functions."
        
      # Pattern 10: Insecure cookie settings
      - pattern: "(?:document\\.cookie|cookies\\.set|res\\.cookie|cookie\\.serialize)\\([^)]*?\\)"
        negative_pattern: "(?:secure\\s*:|httpOnly\\s*:|sameSite\\s*:)"
        message: "Cookies with sensitive data should have secure and httpOnly flags enabled."
        
      # Pattern 11: Client-side encryption
      - pattern: "(?:encrypt|decrypt|createCipher|createDecipher)\\([^)]*?\\)"
        location: "(?:frontend|client|browser|react|vue|angular)"
        message: "Performing sensitive cryptographic operations on the client side. Move encryption/decryption logic to the server."
        
      # Pattern 12: Insecure JWT implementation
      - pattern: "(?:jwt\\.sign|jsonwebtoken\\.sign)\\([^,]*?,[^,]*?,[^\\)]*?\\)"
        negative_pattern: "(?:expiresIn|algorithm\\s*:\\s*['\"](?:HS256|HS384|HS512|RS256|RS384|RS512|ES256|ES384|ES512)['\"])"
        message: "JWT implementation missing expiration or using weak algorithm. Set expiresIn and use a strong algorithm."
        
      # Pattern 13: Weak PRNG in Node.js
      - pattern: "(?:crypto\\.pseudoRandomBytes|crypto\\.rng|crypto\\.randomInt)\\("
        message: "Using potentially weak pseudorandom number generator. Use crypto.randomBytes() for cryptographic security."
        
      # Pattern 14: Insecure local storage usage for sensitive data
      - pattern: "(?:localStorage\\.setItem|sessionStorage\\.setItem)\\(['\"](?:token|auth|jwt|password|secret|key|credential)['\"]"
        message: "Storing sensitive data in browser storage. Use secure HttpOnly cookies for authentication tokens."
        
      # Pattern 15: Weak password validation
      - pattern: "(?:password\\.length\\s*>=?\\s*\\d|password\\.match\\(['\"][^'\"]+['\"]\\))"
        negative_pattern: "(?:password\\.length\\s*>=?\\s*(?:8|9|10|11|12)|[A-Z]|[a-z]|[0-9]|[^A-Za-z0-9])"
        message: "Weak password validation. Require at least 12 characters with a mix of uppercase, lowercase, numbers, and special characters."

  - type: suggest
    message: |
      **JavaScript Cryptography Best Practices:**
      
      1. **Secure Password Storage:**
         - Use dedicated password hashing algorithms:
           ```javascript
           // Node.js with bcrypt
           const bcrypt = require('bcrypt');
           const saltRounds = 12;
           const hashedPassword = await bcrypt.hash(password, saltRounds);
           
           // Verify password
           const match = await bcrypt.compare(password, hashedPassword);
           ```
         - Or use Argon2 (preferred) or PBKDF2 with sufficient iterations:
           ```javascript
           // Node.js with crypto
           const crypto = require('crypto');
           
           function hashPassword(password) {
             const salt = crypto.randomBytes(16);
             const hash = crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256');
             return { salt: salt.toString('hex'), hash: hash.toString('hex') };
           }
           ```
      
      2. **Secure Random Number Generation:**
         - In Node.js:
           ```javascript
           const crypto = require('crypto');
           const randomBytes = crypto.randomBytes(32); // 256 bits of randomness
           ```
         - In browsers:
           ```javascript
           const array = new Uint8Array(32);
           window.crypto.getRandomValues(array);
           ```
      
      3. **Secure Communications:**
         - Use TLS 1.2+ for all communications:
           ```javascript
           // Node.js HTTPS server
           const https = require('https');
           const fs = require('fs');
           
           const options = {
             key: fs.readFileSync('private-key.pem'),
             cert: fs.readFileSync('certificate.pem'),
             minVersion: 'TLSv1.2'
           };
           
           https.createServer(options, (req, res) => {
             res.writeHead(200);
             res.end('Hello, world!');
           }).listen(443);
           ```
         - Always validate certificates:
           ```javascript
           // Node.js HTTPS request
           const https = require('https');
           
           const options = {
             hostname: 'example.com',
             port: 443,
             path: '/',
             method: 'GET',
             rejectUnauthorized: true // Default, but explicitly set for clarity
           };
           
           const req = https.request(options, (res) => {
             // Handle response
           });
           ```
      
      4. **Proper Key Management:**
         - Never hardcode secrets in source code
         - Use environment variables or secure vaults:
           ```javascript
           // Node.js with dotenv
           require('dotenv').config();
           const apiKey = process.env.API_KEY;
           ```
         - Consider using dedicated key management services
      
      5. **Secure Encryption:**
         - Use authenticated encryption (AES-GCM):
           ```javascript
           // Node.js crypto
           const crypto = require('crypto');
           
           function encrypt(text, masterKey) {
             const iv = crypto.randomBytes(12);
             const cipher = crypto.createCipheriv('aes-256-gcm', masterKey, iv);
             
             let encrypted = cipher.update(text, 'utf8', 'hex');
             encrypted += cipher.final('hex');
             
             const authTag = cipher.getAuthTag().toString('hex');
             
             return {
               iv: iv.toString('hex'),
               encrypted,
               authTag
             };
           }
           
           function decrypt(encrypted, masterKey) {
             const decipher = crypto.createDecipheriv(
               'aes-256-gcm',
               masterKey,
               Buffer.from(encrypted.iv, 'hex')
             );
             
             decipher.setAuthTag(Buffer.from(encrypted.authTag, 'hex'));
             
             let decrypted = decipher.update(encrypted.encrypted, 'hex', 'utf8');
             decrypted += decipher.final('utf8');
             
             return decrypted;
           }
           ```
      
      6. **Secure Cookie Handling:**
         - Set secure and httpOnly flags:
           ```javascript
           // Express.js
           res.cookie('session', sessionId, {
             httpOnly: true,
             secure: true,
             sameSite: 'strict',
             maxAge: 3600000 // 1 hour
           });
           ```
      
      7. **JWT Security:**
         - Use strong algorithms and set expiration:
           ```javascript
           // Node.js with jsonwebtoken
           const jwt = require('jsonwebtoken');
           
           const token = jwt.sign(
             { userId: user.id },
             process.env.JWT_SECRET,
             { 
               expiresIn: '1h',
               algorithm: 'HS256'
             }
           );
           ```
         - Validate tokens properly:
           ```javascript
           try {
             const decoded = jwt.verify(token, process.env.JWT_SECRET);
             // Process request with decoded data
           } catch (err) {
             // Handle invalid token
           }
           ```
      
      8. **Constant-Time Comparison:**
         - Use crypto.timingSafeEqual for comparing secrets:
           ```javascript
           const crypto = require('crypto');
           
           function safeCompare(a, b) {
             const bufA = Buffer.from(a);
             const bufB = Buffer.from(b);
             
             // Ensure the buffers are the same length to avoid timing attacks
             // based on length differences
             if (bufA.length !== bufB.length) {
               return false;
             }
             
             return crypto.timingSafeEqual(bufA, bufB);
           }
           ```

  - type: validate
    conditions:
      # Check 1: Proper password hashing
      - pattern: "bcrypt\\.hash|scrypt|pbkdf2|argon2"
        message: "Using secure password hashing algorithm."
      
      # Check 2: Secure random generation
      - pattern: "crypto\\.randomBytes|window\\.crypto\\.getRandomValues"
        message: "Using cryptographically secure random number generation."
      
      # Check 3: Strong TLS configuration
      - pattern: "minVersion\\s*:\\s*['\"]TLSv1_2['\"]|minVersion\\s*:\\s*['\"]TLSv1_3['\"]"
        message: "Using secure TLS configuration."
      
      # Check 4: Proper certificate validation
      - pattern: "rejectUnauthorized\\s*:\\s*true|strictSSL\\s*:\\s*true"
        message: "Properly validating SSL certificates."

metadata:
  priority: high
  version: 1.0
  tags:
    - security
    - javascript
    - nodejs
    - browser
    - cryptography
    - encryption
    - owasp
    - language:javascript
    - framework:express
    - framework:react
    - framework:vue
    - framework:angular
    - category:security
    - subcategory:cryptography
    - standard:owasp-top10
    - risk:a02-cryptographic-failures
  references:
    - "https://owasp.org/Top10/A02_2021-Cryptographic_Failures/"
    - "https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html"
    - "https://nodejs.org/api/crypto.html"
    - "https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto"
    - "https://www.npmjs.com/package/bcrypt"
    - "https://www.npmjs.com/package/jsonwebtoken"
</rule> 
