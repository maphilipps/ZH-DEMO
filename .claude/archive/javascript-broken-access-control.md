---
description: Detect and prevent broken access control patterns in JavaScript applications as defined in OWASP Top 10:2021-A01
globs: **/*.js, **/*.jsx, **/*.ts, **/*.tsx, !**/node_modules/**, !**/dist/**, !**/build/**, !**/coverage/**
---
# JavaScript Broken Access Control (OWASP A01:2021)

This rule identifies and prevents broken access control vulnerabilities in JavaScript applications, focusing on both browser and Node.js environments, as defined in OWASP Top 10:2021-A01.

<rule>
name: javascript_broken_access_control
description: Detect and prevent broken access control patterns in JavaScript applications as defined in OWASP Top 10:2021-A01

actions:
  - type: enforce
    conditions:
      # Pattern 1: Detect Direct Reference to User-Supplied IDs (IDOR vulnerability)
      - pattern: "(?:req|request)\\.(?:params|query|body)\\.(?:id|userId|recordId)[^\\n]*?(?:findById|getById|find\\(|get\\()"
        message: "Potential Insecure Direct Object Reference (IDOR) vulnerability. User-supplied IDs should be validated against user permissions before database access."
        
      # Pattern 2: Detect Missing Authorization Checks in Route Handlers
      - pattern: "(?:app|router)\\.(?:get|post|put|delete|patch)\\(['\"][^'\"]+['\"],\\s*(?:async)?\\s*\\(?(?:req|request),\\s*(?:res|response)(?:,[^\\)]+)?\\)?\\s*=>\\s*\\{[^\\}]*?\\}\\)"
        negative_pattern: "(?:isAuthenticated|isAuthorized|checkPermission|verifyAccess|auth\\.check|authenticate|authorize|userHasAccess|checkAuth|permissions\\.|requireAuth|requiresAuth|ensureAuth|\\bauth\\b|\\broles?\\b|\\bpermission\\b|\\baccess\\b)"
        message: "Route handler appears to be missing authorization checks. Implement proper access control to verify user permissions before processing requests."
        
      # Pattern 3: Detect JWT Token Validation Issues
      - pattern: "(?:jwt|jsonwebtoken)\\.verify\\((?:[^,]+),\\s*['\"]((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?)['\"]"
        message: "Hardcoded JWT secret detected. Store JWT secrets securely in environment variables or a configuration manager."
        
      # Pattern 4: Detect Client-Side Authorization Checks
      - pattern: "if\\s*\\((?:user|currentUser)\\.(?:role|isAdmin|hasPermission|can[A-Z][a-zA-Z]+|is[A-Z][a-zA-Z]+)\\)\\s*\\{[^\\}]*?(?:fetch|axios|\\$\\.ajax|http\\.get|http\\.post)\\([^\\)]*?\\)"
        message: "Authorization logic implemented on client-side. Client-side authorization checks can be bypassed. Always enforce authorization on the server."
        
      # Pattern 5: Detect Improper CORS Configuration
      - pattern: "(?:app\\.use\\(cors\\(\\{[^\\}]*?origin:\\s*['\"]\\*['\"])|Access-Control-Allow-Origin:\\s*['\"]\\*['\"]"
        message: "Wildcard CORS policy detected. This allows any domain to make cross-origin requests. Restrict CORS to specific trusted domains."
        
      # Pattern 6: Detect Lack of Role Checks in Admin Functions
      - pattern: "(?:function|const)\\s+(?:admin|updateUser|deleteUser|createUser|updateRole|manageUsers|setPermission)[^\\{]*?\\{[^\\}]*?\\}"
        negative_pattern: "(?:role|permission|isAdmin|hasAccess|authorize|authenticate|auth\\.check|checkPermission|checkRole|verifyRole|ensureAdmin|adminOnly|adminRequired|requirePermission)"
        message: "Administrative function appears to be missing role or permission checks. Implement proper authorization checks to restrict access to administrative functions."
        
      # Pattern 7: Detect Missing Login Rate Limiting
      - pattern: "(?:function|const)\\s+(?:login|signin|authenticate|auth)[^\\{]*?\\{[^\\}]*?(?:compare(?:Sync)?|check(?:Password)?|match(?:Password)?|verify(?:Password)?)[^\\}]*?\\}"
        negative_pattern: "(?:rate(?:Limit)?|throttle|limit|delay|cooldown|attempt|counter|maxTries|maxAttempts|lockout|timeout)"
        message: "Login function appears to be missing rate limiting. Implement rate limiting to prevent brute force attacks."
        
      # Pattern 8: Detect Horizontal Privilege Escalation Vulnerability
      - pattern: "(?:findById|findOne|findByPk|get)\\((?:req|request)\\.(?:params|query|body)\\.(?:id|userId|accountId)\\)"
        negative_pattern: "(?:!=|!==|===|==)\\s*(?:req\\.user\\.id|req\\.userId|currentUser\\.id|user\\.id|session\\.userId)"
        message: "Potential horizontal privilege escalation vulnerability. Ensure the requested resource belongs to the authenticated user."
        
      # Pattern 9: Detect Missing CSRF Protection
      - pattern: "(?:app|router)\\.(?:post|put|delete|patch)\\(['\"][^'\"]+['\"]"
        negative_pattern: "(?:csrf|xsrf|csurf|csrfProtection|antiForgery|csrfToken|csrfMiddleware)"
        message: "Route may be missing CSRF protection. Implement CSRF tokens for state-changing operations to prevent cross-site request forgery attacks."
        
      # Pattern 10: Detect Bypassing Access Control with Path Traversal
      - pattern: "(?:fs|require)(?:\\.promises)?\\.(read|open|access|stat)(?:File|Sync)?\\([^\\)]*?(?:req|request)\\.(?:params|query|body|path)\\.[^\\)]*?\\)"
        negative_pattern: "(?:normalize|resolve|sanitize|validate|pathValidation|checkPath)"
        message: "Potential path traversal vulnerability in file access. Validate and sanitize user-supplied paths to prevent directory traversal attacks."
        
      # Pattern 11: Detect Missing Authentication Middleware
      - pattern: "(?:new\\s+)?express\\(\\)|(?:import|require)\\(['\"]express['\"]\\)"
        negative_pattern: "(?:app\\.use\\((?:passport|auth|jwt|session|authenticate)|passport\\.authenticate|express-session|express-jwt|jsonwebtoken|requiresAuth|\\bauth\\b)"
        message: "Express application may be missing authentication middleware. Implement proper authentication to secure your application."
        
      # Pattern 12: Detect Insecure Cookie Settings
      - pattern: "(?:res\\.cookie|cookie\\.set|cookies\\.set|document\\.cookie)\\([^\\)]*?\\)"
        negative_pattern: "(?:secure:\\s*true|httpOnly:\\s*true|sameSite|expires|maxAge)"
        message: "Cookies appear to be set without security attributes. Set the secure, httpOnly, and sameSite attributes for sensitive cookies."
      
      # Pattern 13: Detect Hidden Form Fields for Access Control
      - pattern: "<input[^>]*?type=['\"]hidden['\"][^>]*?(?:(?:name|id)=['\"](?:admin|role|isAdmin|access|permission|privilege)['\"])"
        message: "Hidden form fields used for access control. Never rely on hidden form fields for access control decisions as they can be easily manipulated."
        
      # Pattern 14: Detect Client-Side Access Control Routing
      - pattern: "(?:isAdmin|hasRole|hasPermission|userCan|canAccess)\\s*\\?\\s*<(?:Route|Navigate|Link|Redirect)"
        message: "Client-side conditional routing based on user roles detected. Always enforce access control on the server side as client-side checks can be bypassed."
        
      # Pattern 15: Detect Access Control based on URL Parameters
      - pattern: "if\\s*\\((?:req|request)\\.(?:query|params)\\.(?:admin|mode|access|role|type)\\s*===?\\s*['\"](?:admin|true|1|superuser|manager)['\"]\\)"
        message: "Access control based on URL parameters detected. Never use request parameters for access control decisions as they can be easily manipulated."

  - type: suggest
    message: |
      **JavaScript Access Control Best Practices:**
      
      1. **Implement Server-Side Access Control**
         - Never rely solely on client-side access control
         - Use middleware to enforce authorization
         - Example Express.js middleware:
           ```javascript
           // Role-based access control middleware
           function requireRole(role) {
             return (req, res, next) => {
               if (!req.user) {
                 return res.status(401).json({ error: 'Authentication required' });
               }
               
               if (!req.user.roles.includes(role)) {
                 return res.status(403).json({ error: 'Insufficient permissions' });
               }
               
               next();
             };
           }
           
           // Usage in routes
           app.get('/admin/users', requireRole('admin'), (req, res) => {
             // Handle admin-only route
           });
           ```
      
      2. **Implement Proper Authentication**
         - Use established authentication libraries
         - Implement multi-factor authentication for sensitive operations
         - Example with Passport.js:
           ```javascript
           const passport = require('passport');
           const JwtStrategy = require('passport-jwt').Strategy;
           
           passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
             try {
               const user = await User.findById(payload.sub);
               if (!user) {
                 return done(null, false);
               }
               return done(null, user);
             } catch (error) {
               return done(error, false);
             }
           }));
           
           // Protect routes
           app.get('/protected', 
             passport.authenticate('jwt', { session: false }),
             (req, res) => {
               res.json({ success: true });
             }
           );
           ```
      
      3. **Implement Proper Authorization**
         - Use attribute or role-based access control
         - Check permissions for each protected resource
         - Example:
           ```javascript
           // Permission-based middleware
           function checkPermission(permission) {
             return async (req, res, next) => {
               try {
                 // Get user permissions from database
                 const userPermissions = await getUserPermissions(req.user.id);
                 
                 if (!userPermissions.includes(permission)) {
                   return res.status(403).json({ error: 'Permission denied' });
                 }
                 
                 next();
               } catch (error) {
                 next(error);
               }
             };
           }
           
           // Usage
           app.post('/articles', 
             authenticate,
             checkPermission('article:create'), 
             (req, res) => {
               // Create article
             }
           );
           ```
      
      4. **Protect Against Insecure Direct Object References (IDOR)**
         - Validate that the requested resource belongs to the user
         - Use indirect references or access control lists
         - Example:
           ```javascript
           app.get('/documents/:id', authenticate, async (req, res) => {
             try {
               const document = await Document.findById(req.params.id);
               
               // Check if document exists
               if (!document) {
                 return res.status(404).json({ error: 'Document not found' });
               }
               
               // Check if user owns the document or has access
               if (document.userId !== req.user.id && 
                   !(await userHasAccess(req.user.id, document.id))) {
                 return res.status(403).json({ error: 'Access denied' });
               }
               
               res.json(document);
             } catch (error) {
               res.status(500).json({ error: error.message });
             }
           });
           ```
      
      5. **Implement Proper CORS Configuration**
         - Never use wildcard (*) in production
         - Whitelist specific trusted origins
         - Example:
           ```javascript
           const cors = require('cors');
           
           const corsOptions = {
             origin: ['https://trusted-app.com', 'https://admin.trusted-app.com'],
             methods: ['GET', 'POST', 'PUT', 'DELETE'],
             allowedHeaders: ['Content-Type', 'Authorization'],
             credentials: true,
             maxAge: 86400 // 24 hours
           };
           
           app.use(cors(corsOptions));
           ```
      
      6. **Implement CSRF Protection**
         - Use anti-CSRF tokens for state-changing operations
         - Validate the token on the server
         - Example with csurf:
           ```javascript
           const csrf = require('csurf');
           
           // Setup CSRF protection
           const csrfProtection = csrf({ cookie: true });
           
           // Generate CSRF token
           app.get('/form', csrfProtection, (req, res) => {
             res.render('form', { csrfToken: req.csrfToken() });
           });
           
           // Validate CSRF token
           app.post('/process', csrfProtection, (req, res) => {
             // Process the request
           });
           ```
      
      7. **Implement Secure Cookie Settings**
         - Set secure, httpOnly, and sameSite attributes
         - Use appropriate expiration times
         - Example:
           ```javascript
           res.cookie('sessionId', sessionId, {
             httpOnly: true,  // Prevents JavaScript access
             secure: true,    // Only sent over HTTPS
             sameSite: 'strict', // Prevents CSRF attacks
             maxAge: 3600000, // 1 hour
             path: '/',
             domain: 'yourdomain.com'
           });
           ```
      
      8. **Implement Rate Limiting**
         - Apply rate limiting to authentication endpoints
         - Prevent brute force attacks
         - Example with express-rate-limit:
           ```javascript
           const rateLimit = require('express-rate-limit');
           
           const loginLimiter = rateLimit({
             windowMs: 15 * 60 * 1000, // 15 minutes
             max: 5, // 5 attempts per window
             standardHeaders: true,
             legacyHeaders: false,
             message: {
               error: 'Too many login attempts, please try again after 15 minutes'
             }
           });
           
           app.post('/login', loginLimiter, (req, res) => {
             // Handle login
           });
           ```
      
      9. **Implement Proper Session Management**
         - Use secure session management libraries
         - Rotate session IDs after login
         - Example:
           ```javascript
           const session = require('express-session');
           
           app.use(session({
             secret: process.env.SESSION_SECRET,
             resave: false,
             saveUninitialized: false,
             cookie: {
               secure: true,
               httpOnly: true,
               sameSite: 'strict',
               maxAge: 3600000 // 1 hour
             }
           }));
           
           app.post('/login', (req, res) => {
             // Authenticate user
             
             // Regenerate session to prevent session fixation
             req.session.regenerate((err) => {
               if (err) {
                 return res.status(500).json({ error: 'Failed to create session' });
               }
               
               // Set authenticated user in session
               req.session.userId = user.id;
               req.session.authenticated = true;
               
               res.json({ success: true });
             });
           });
           ```
      
      10. **Implement Proper Access Control for APIs**
          - Use OAuth 2.0 or JWT for API authentication
          - Implement proper scope checking
          - Example with JWT:
            ```javascript
            const jwt = require('jsonwebtoken');
            
            function verifyToken(req, res, next) {
              const token = req.headers.authorization?.split(' ')[1];
              
              if (!token) {
                return res.status(401).json({ error: 'No token provided' });
              }
              
              try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded;
                
                // Check if token has required scope
                if (req.route.path === '/api/admin' && !decoded.scopes.includes('admin')) {
                  return res.status(403).json({ error: 'Insufficient scope' });
                }
                
                next();
              } catch (error) {
                return res.status(401).json({ error: 'Invalid token' });
              }
            }
            
            // Protect API routes
            app.get('/api/users', verifyToken, (req, res) => {
              // Handle request
            });
            ```

  - type: validate
    conditions:
      # Check 1: Authentication middleware
      - pattern: "(?:app\\.use\\((?:authenticate|auth\\.initialize|passport\\.initialize|express-session|jwt))|(?:passport\\.authenticate\\()|(?:auth\\.required)"
        message: "Authentication middleware is implemented correctly."
      
      # Check 2: Authorization checks
      - pattern: "(?:isAuthorized|checkPermission|hasRole|requireRole|checkAccess|canAccess|checkAuth|roleRequired|requireScope)"
        message: "Authorization checks are implemented."
      
      # Check 3: CSRF protection
      - pattern: "(?:csrf|csurf|csrfProtection|antiForgery|csrfToken)"
        message: "CSRF protection is implemented."
      
      # Check 4: Secure cookies
      - pattern: "(?:cookie|cookies).*(?:secure:\\s*true|httpOnly:\\s*true|sameSite)"
        message: "Secure cookie settings are configured."
      
      # Check 5: CORS configuration
      - pattern: "cors\\(\\{[^\\}]*?origin:\\s*\\[[^\\]]+\\]"
        message: "CORS is configured with specific origins rather than wildcards."

metadata:
  priority: high
  version: 1.0
  tags:
    - security
    - javascript
    - access-control
    - authorization
    - authentication
    - owasp
    - language:javascript
    - language:typescript
    - framework:express
    - framework:react
    - framework:angular
    - framework:vue
    - category:security
    - subcategory:access-control
    - standard:owasp-top10
    - risk:a01-broken-access-control
  references:
    - "https://owasp.org/Top10/A01_2021-Broken_Access_Control/"
    - "https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html"
    - "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
    - "https://nodejs.org/en/security/best-practices/"
    - "https://expressjs.com/en/advanced/best-practice-security.html"
    - "https://auth0.com/blog/node-js-and-express-tutorial-building-and-securing-restful-apis/"
</rule> 
