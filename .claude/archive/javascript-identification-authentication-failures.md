---
description: Detect and prevent identification and authentication failures in JavaScript applications as defined in OWASP Top 10:2021-A07
globs: **/*.js, **/*.jsx, **/*.ts, **/*.tsx, !**/node_modules/**, !**/dist/**, !**/build/**, !**/coverage/**
---
# JavaScript Identification and Authentication Failures (OWASP A07:2021)

<rule>
name: javascript_identification_authentication_failures
description: Detect and prevent identification and authentication failures in JavaScript applications as defined in OWASP Top 10:2021-A07

actions:
  - type: enforce
    conditions:
      # Pattern 1: Weak Password Validation
      - pattern: "(?:password|passwd|pwd)\\s*\\.\\s*(?:length\\s*[<>]=?\\s*(?:[0-9]|10)\\b|match\\(\\s*['\"][^'\"]*['\"]\\s*\\))"
        message: "Weak password validation detected. Implement strong password policies requiring minimum length, complexity, and avoiding common passwords."
        
      # Pattern 2: Missing MFA Implementation
      - pattern: "(?:login|signin|authenticate|auth)\\s*\\([^)]*\\)\\s*\\{[^}]*?\\}"
        negative_pattern: "(?:mfa|2fa|two-factor|multi-factor|otp|totp)"
        message: "Authentication implementation without multi-factor authentication (MFA). Consider implementing MFA for enhanced security."
        
      # Pattern 3: Hardcoded Credentials
      - pattern: "(?:const|let|var)\\s+(?:password|passwd|pwd|secret|key|token|apiKey)\\s*=\\s*['\"][^'\"]+['\"]"
        message: "Hardcoded credentials detected. Store sensitive authentication data in secure configuration or environment variables."
        
      # Pattern 4: Insecure Session Management
      - pattern: "(?:localStorage|sessionStorage)\\.setItem\\(['\"](?:token|jwt|session|auth|user)['\"]"
        message: "Storing authentication tokens in localStorage or sessionStorage. Consider using HttpOnly cookies for sensitive authentication data."
        
      # Pattern 5: Missing CSRF Protection
      - pattern: "(?:post|put|delete|patch)\\([^)]*?\\)"
        negative_pattern: "(?:csrf|xsrf|token)"
        location: "(?:src|components|pages|api)"
        message: "Potential missing CSRF protection in API requests. Implement CSRF tokens for state-changing operations."
        
      # Pattern 6: Insecure JWT Handling
      - pattern: "jwt\\.sign\\([^)]*?{[^}]*?}\\s*,\\s*[^,)]+\\s*(?:\\)|,\\s*{\\s*(?:expiresIn|algorithm)\\s*:\\s*[^}]*?}\\s*\\))"
        negative_pattern: "(?:expiresIn|exp).*(?:algorithm|alg)"
        message: "Insecure JWT configuration. Ensure JWTs have proper expiration and use secure algorithms (RS256 preferred over HS256)."
        
      # Pattern 7: Insecure Password Storage
      - pattern: "(?:bcrypt|argon2|pbkdf2|scrypt)\\.[^(]*\\([^)]*?(?:rounds|iterations|cost|factor)\\s*[:<=>]\\s*(?:[0-9]|1[0-2])\\b"
        message: "Weak password hashing parameters. Use sufficient work factors for password hashing algorithms."
        
      # Pattern 8: Missing Account Lockout
      - pattern: "(?:login|signin|authenticate|auth)\\s*\\([^)]*\\)\\s*\\{[^}]*?\\}"
        negative_pattern: "(?:lock|attempt|count|limit|throttle|rate)"
        message: "Authentication implementation without account lockout or rate limiting. Implement account lockout after failed attempts."
        
      # Pattern 9: Insecure Password Recovery
      - pattern: "(?:reset|forgot|recover)(?:Password|Pwd)\\s*\\([^)]*\\)\\s*\\{[^}]*?\\}"
        negative_pattern: "(?:expire|timeout|token|verify)"
        message: "Potentially insecure password recovery mechanism. Implement secure, time-limited recovery tokens."
        
      # Pattern 10: Missing Brute Force Protection
      - pattern: "(?:login|signin|authenticate|auth)\\s*\\([^)]*\\)\\s*\\{[^}]*?\\}"
        negative_pattern: "(?:captcha|recaptcha|hcaptcha|rate\\s*limit)"
        message: "Authentication without CAPTCHA or rate limiting. Implement protection against brute force attacks."
        
      # Pattern 11: Insecure Remember Me Functionality
      - pattern: "(?:rememberMe|keepLoggedIn|staySignedIn)"
        negative_pattern: "(?:secure|httpOnly|sameSite)"
        message: "Potentially insecure 'Remember Me' functionality. Implement with secure, HttpOnly cookies and proper expiration."
        
      # Pattern 12: Insecure Logout Implementation
      - pattern: "(?:logout|signout)\\s*\\([^)]*\\)\\s*\\{[^}]*?\\}"
        negative_pattern: "(?:invalidate|revoke|clear|remove).*(?:token|session|cookie)"
        message: "Potentially incomplete logout implementation. Ensure proper invalidation of sessions and tokens on logout."
        
      # Pattern 13: Missing Session Timeout
      - pattern: "(?:session|cookie|jwt)\\s*\\.\\s*(?:create|set|sign)"
        negative_pattern: "(?:expire|timeout|maxAge)"
        message: "Missing session timeout configuration. Implement proper session expiration for security."
        
      # Pattern 14: Insecure OAuth Implementation
      - pattern: "(?:oauth|openid|oidc).*(?:callback|redirect)"
        negative_pattern: "(?:state|nonce|pkce)"
        message: "Potentially insecure OAuth implementation. Use state parameters, PKCE for authorization code flow, and validate redirect URIs."
        
      # Pattern 15: Missing Credential Validation
      - pattern: "(?:email|username|user)\\s*=\\s*(?:req\\.body|req\\.query|req\\.params|formData\\.get)\\(['\"][^'\"]+['\"]\\)"
        negative_pattern: "(?:validate|sanitize|check|trim)"
        message: "Missing input validation for user credentials. Implement proper validation and sanitization."

  - type: suggest
    message: |
      **JavaScript Identification and Authentication Failures Best Practices:**
      
      1. **Strong Password Policies:**
         - Implement minimum length (at least 12 characters)
         - Require complexity (uppercase, lowercase, numbers, special characters)
         - Check against common password lists
         - Example:
           ```javascript
           // Using a library like zxcvbn for password strength estimation
           import zxcvbn from 'zxcvbn';
           
           function validatePassword(password) {
             if (password.length < 12) {
               return { valid: false, message: 'Password must be at least 12 characters' };
             }
             
             const strength = zxcvbn(password);
             if (strength.score < 3) {
               return { 
                 valid: false, 
                 message: 'Password is too weak. ' + strength.feedback.warning 
               };
             }
             
             return { valid: true };
           }
           ```
      
      2. **Multi-Factor Authentication (MFA):**
         - Implement TOTP (Time-based One-Time Password)
         - Support hardware security keys (WebAuthn/FIDO2)
         - Example:
           ```javascript
           // Using speakeasy for TOTP implementation
           import speakeasy from 'speakeasy';
           
           // Generate a secret for a user
           const secret = speakeasy.generateSecret({ length: 20 });
           
           // Verify a token
           function verifyToken(token, secret) {
             return speakeasy.totp.verify({
               secret: secret.base32,
               encoding: 'base32',
               token: token,
               window: 1 // Allow 1 period before and after for clock drift
             });
           }
           ```
      
      3. **Secure Session Management:**
         - Use HttpOnly, Secure, and SameSite cookies
         - Implement proper session expiration
         - Example:
           ```javascript
           // Express.js example
           app.use(session({
             secret: process.env.SESSION_SECRET,
             name: '__Host-session', // Prefix with __Host- for added security
             cookie: {
               httpOnly: true,
               secure: true, // Requires HTTPS
               sameSite: 'strict',
               maxAge: 3600000, // 1 hour
               path: '/'
             },
             resave: false,
             saveUninitialized: false
           }));
           ```
      
      4. **CSRF Protection:**
         - Implement CSRF tokens for all state-changing operations
         - Example:
           ```javascript
           // Using csurf middleware with Express
           import csrf from 'csurf';
           
           // Setup CSRF protection
           const csrfProtection = csrf({ cookie: true });
           
           // Apply to routes
           app.post('/api/user/profile', csrfProtection, (req, res) => {
             // Handle the request
           });
           
           // In your frontend (React example)
           function ProfileForm() {
             // Get CSRF token from cookie or meta tag
             const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
             
             return (
               <form method="POST" action="/api/user/profile">
                 <input type="hidden" name="_csrf" value={csrfToken} />
                 {/* Form fields */}
                 <button type="submit">Update Profile</button>
               </form>
             );
           }
           ```
      
      5. **Secure JWT Implementation:**
         - Use strong algorithms (RS256 preferred over HS256)
         - Include proper expiration (exp), issued at (iat), and audience (aud) claims
         - Example:
           ```javascript
           import jwt from 'jsonwebtoken';
           import fs from 'fs';
           
           // Using asymmetric keys (preferred for production)
           const privateKey = fs.readFileSync('private.key');
           
           function generateToken(userId) {
             return jwt.sign(
               { 
                 sub: userId,
                 iat: Math.floor(Date.now() / 1000),
                 exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
                 aud: 'your-app-name'
               },
               privateKey,
               { algorithm: 'RS256' }
             );
           }
           ```
      
      6. **Secure Password Storage:**
         - Use bcrypt, Argon2, or PBKDF2 with sufficient work factor
         - Example:
           ```javascript
           import bcrypt from 'bcrypt';
           
           async function hashPassword(password) {
             // Cost factor of 12+ for production
             const saltRounds = 12;
             return await bcrypt.hash(password, saltRounds);
           }
           
           async function verifyPassword(password, hash) {
             return await bcrypt.compare(password, hash);
           }
           ```
      
      7. **Account Lockout and Rate Limiting:**
         - Implement progressive delays or account lockout after failed attempts
         - Example:
           ```javascript
           import rateLimit from 'express-rate-limit';
           
           // Apply rate limiting to login endpoint
           const loginLimiter = rateLimit({
             windowMs: 15 * 60 * 1000, // 15 minutes
             max: 5, // 5 attempts per window
             message: 'Too many login attempts, please try again after 15 minutes',
             standardHeaders: true,
             legacyHeaders: false,
           });
           
           app.post('/api/login', loginLimiter, (req, res) => {
             // Handle login
           });
           ```
      
      8. **Secure Password Recovery:**
         - Use time-limited, single-use tokens
         - Send to verified email addresses only
         - Example:
           ```javascript
           import crypto from 'crypto';
           
           function generatePasswordResetToken() {
             return {
               token: crypto.randomBytes(32).toString('hex'),
               expires: new Date(Date.now() + 3600000) // 1 hour
             };
           }
           
           // Store token in database with user ID and expiration
           // Send token via email (never include in URL directly)
           // Verify token is valid and not expired when used
           ```
      
      9. **Brute Force Protection:**
         - Implement CAPTCHA or reCAPTCHA
         - Example:
           ```javascript
           // Using Google reCAPTCHA v3
           async function verifyRecaptcha(token) {
             const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
               method: 'POST',
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
               body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
             });
             
             const data = await response.json();
             return data.success && data.score >= 0.5; // Adjust threshold as needed
           }
           
           app.post('/api/login', async (req, res) => {
             const { recaptchaToken } = req.body;
             
             if (!(await verifyRecaptcha(recaptchaToken))) {
               return res.status(400).json({ error: 'CAPTCHA verification failed' });
             }
             
             // Continue with login process
           });
           ```
      
      10. **Secure Logout Implementation:**
          - Invalidate sessions on both client and server
          - Example:
            ```javascript
            app.post('/api/logout', (req, res) => {
              // Clear server-side session
              req.session.destroy((err) => {
                if (err) {
                  return res.status(500).json({ error: 'Failed to logout' });
                }
                
                // Clear client-side cookie
                res.clearCookie('__Host-session', {
                  httpOnly: true,
                  secure: true,
                  sameSite: 'strict',
                  path: '/'
                });
                
                res.status(200).json({ message: 'Logged out successfully' });
              });
            });
            ```
      
      11. **Secure OAuth Implementation:**
          - Use state parameter to prevent CSRF
          - Implement PKCE for authorization code flow
          - Validate redirect URIs against whitelist
          - Example:
            ```javascript
            // Generate state and code verifier for PKCE
            function generateOAuthState() {
              return crypto.randomBytes(32).toString('hex');
            }
            
            function generateCodeVerifier() {
              return crypto.randomBytes(43).toString('base64url');
            }
            
            function generateCodeChallenge(verifier) {
              const hash = crypto.createHash('sha256').update(verifier).digest('base64url');
              return hash;
            }
            
            // Store state and code verifier in session
            // Use code challenge in authorization request
            // Verify state and use code verifier in token request
            ```
      
      12. **Input Validation:**
          - Validate and sanitize all user inputs
          - Example:
            ```javascript
            import validator from 'validator';
            
            function validateCredentials(email, password) {
              const errors = {};
              
              if (!validator.isEmail(email)) {
                errors.email = 'Invalid email format';
              }
              
              if (!password || password.length < 12) {
                errors.password = 'Password must be at least 12 characters';
              }
              
              return {
                isValid: Object.keys(errors).length === 0,
                errors
              };
            }
            ```
      
      13. **Secure Headers:**
          - Implement security headers for authentication-related pages
          - Example:
            ```javascript
            // Using helmet with Express
            import helmet from 'helmet';
            
            app.use(helmet({
              contentSecurityPolicy: {
                directives: {
                  defaultSrc: ["'self'"],
                  scriptSrc: ["'self'", 'https://www.google.com/recaptcha/', 'https://www.gstatic.com/recaptcha/'],
                  frameSrc: ["'self'", 'https://www.google.com/recaptcha/'],
                  styleSrc: ["'self'", "'unsafe-inline'"],
                  connectSrc: ["'self'"]
                }
              },
              referrerPolicy: { policy: 'same-origin' }
            }));
            ```
      
      14. **Credential Stuffing Protection:**
          - Implement device fingerprinting and anomaly detection
          - Example:
            ```javascript
            // Simple device fingerprinting
            function getDeviceFingerprint(req) {
              return {
                ip: req.ip,
                userAgent: req.headers['user-agent'],
                acceptLanguage: req.headers['accept-language']
              };
            }
            
            // Check if login is from a new device
            async function isNewDevice(userId, fingerprint) {
              // Compare with stored fingerprints for this user
              // Alert or require additional verification for new devices
            }
            ```
      
      15. **Secure Password Change:**
          - Require current password verification
          - Example:
            ```javascript
            async function changePassword(userId, currentPassword, newPassword) {
              // Retrieve user from database
              const user = await getUserById(userId);
              
              // Verify current password
              const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
              if (!isValid) {
                return { success: false, message: 'Current password is incorrect' };
              }
              
              // Validate new password strength
              const validation = validatePassword(newPassword);
              if (!validation.valid) {
                return { success: false, message: validation.message };
              }
              
              // Hash and store new password
              const newHash = await bcrypt.hash(newPassword, 12);
              await updateUserPassword(userId, newHash);
              
              // Invalidate existing sessions (optional but recommended)
              await invalidateUserSessions(userId);
              
              return { success: true };
            }
            ```

  - type: validate
    conditions:
      # Check 1: Strong Password Validation
      - pattern: "(?:password|pwd).*(?:length\\s*>=\\s*(?:1[2-9]|[2-9][0-9]))"
        message: "Implementing strong password length requirements (12+ characters)."
      
      # Check 2: Secure Password Storage
      - pattern: "(?:bcrypt|argon2|pbkdf2|scrypt)\\.[^(]*\\([^)]*?(?:rounds|iterations|cost|factor)\\s*[:<=>]\\s*(?:1[2-9]|[2-9][0-9])"
        message: "Using secure password hashing with appropriate work factor."
      
      # Check 3: CSRF Protection
      - pattern: "(?:csrf|xsrf).*(?:token|middleware|protection)"
        message: "Implementing CSRF protection for state-changing operations."
      
      # Check 4: Secure Cookie Configuration
      - pattern: "(?:cookie|session).*(?:httpOnly|secure|sameSite)"
        message: "Using secure cookie configuration for sessions."
      
      # Check 5: Rate Limiting
      - pattern: "(?:rate|limit|throttle).*(?:login|signin|auth)"
        message: "Implementing rate limiting for authentication endpoints."

metadata:
  priority: high
  version: 1.0
  tags:
    - security
    - javascript
    - nodejs
    - browser
    - authentication
    - owasp
    - language:javascript
    - framework:express
    - framework:react
    - framework:vue
    - framework:angular
    - category:security
    - subcategory:authentication
    - standard:owasp-top10
    - risk:a07-identification-authentication-failures
  references:
    - "https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/"
    - "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
    - "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html"
    - "https://cheatsheetseries.owasp.org/cheatsheets/Credential_Stuffing_Prevention_Cheat_Sheet.html"
    - "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html"
    - "https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html"
    - "https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/"
    - "https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Multifactor_Authentication_Cheat_Sheet.md"
    - "https://www.nist.gov/itl/applied-cybersecurity/tig/back-basics-multi-factor-authentication"
</rule> 
