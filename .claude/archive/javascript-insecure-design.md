---
description: Detect and prevent insecure design patterns in JavaScript applications as defined in OWASP Top 10:2021-A04
globs: **/*.js, **/*.jsx, **/*.ts, **/*.tsx, !**/node_modules/**, !**/dist/**, !**/build/**, !**/coverage/**
---
# JavaScript Insecure Design (OWASP A04:2021)

<rule>
name: javascript_insecure_design
description: Detect and prevent insecure design patterns in JavaScript applications as defined in OWASP Top 10:2021-A04

actions:
  - type: enforce
    conditions:
      # Pattern 1: Lack of Rate Limiting
      - pattern: "app\\.(?:get|post|put|delete|patch)\\([^)]*?\\)\\s*(?!.*(?:rateLimiter|limiter|throttle|rateLimit))"
        location: "(?:routes|api|controllers)"
        message: "Potential lack of rate limiting in API endpoint. Consider implementing rate limiting to prevent abuse."
        
      # Pattern 2: Insecure Direct Object Reference (IDOR)
      - pattern: "(?:findById|getById|findOne)\\([^)]*?(?:req\\.|request\\.|params\\.|query\\.|body\\.|user\\.|input\\.|form\\.)[^)]*?\\)\\s*(?!.*(?:authorization|permission|access|canAccess|isAuthorized|checkPermission))"
        location: "(?:routes|api|controllers)"
        message: "Potential Insecure Direct Object Reference (IDOR) vulnerability. Implement proper authorization checks before accessing objects by ID."
        
      # Pattern 3: Lack of Input Validation
      - pattern: "(?:req\\.|request\\.|params\\.|query\\.|body\\.|user\\.|input\\.|form\\.)[a-zA-Z0-9_]+\\s*(?!.*(?:validate|sanitize|check|schema|joi|yup|zod|validator|isValid))"
        location: "(?:routes|api|controllers)"
        message: "Potential lack of input validation. Implement proper validation for all user inputs."
        
      # Pattern 4: Hardcoded Business Logic
      - pattern: "if\\s*\\([^)]*?(?:role\\s*===\\s*['\"]admin['\"]|isAdmin\\s*===\\s*true|user\\.role\\s*===\\s*['\"]admin['\"])\\s*\\)"
        message: "Hardcoded business logic for authorization. Consider using a more flexible role-based access control system."
        
      # Pattern 5: Lack of Proper Error Handling
      - pattern: "catch\\s*\\([^)]*?\\)\\s*\\{[^}]*?(?:console\\.(?:log|error))[^}]*?\\}"
        negative_pattern: "(?:res\\.status|next\\(err|next\\(error|errorHandler)"
        message: "Improper error handling. Avoid only logging errors without proper handling or user feedback."
        
      # Pattern 6: Insecure Authentication Design
      - pattern: "(?:password|token|secret|key)\\s*===\\s*(?:req\\.|request\\.|params\\.|query\\.|body\\.|user\\.|input\\.|form\\.)"
        message: "Insecure authentication design. Avoid direct string comparison for passwords or tokens."
        
      # Pattern 7: Lack of Proper Logging
      - pattern: "app\\.(?:get|post|put|delete|patch)\\([^)]*?\\)\\s*(?!.*(?:log|logger|winston|bunyan|morgan|audit))"
        location: "(?:routes|api|controllers)"
        message: "Lack of proper logging in API endpoint. Implement logging for security-relevant events."
        
      # Pattern 8: Insecure Defaults
      - pattern: "new\\s+(?:Session|Cookie|JWT)\\([^)]*?\\{[^}]*?(?:secure\\s*:\\s*false|httpOnly\\s*:\\s*false|sameSite\\s*:\\s*['\"]none['\"])"
        message: "Insecure default configuration. Avoid setting secure:false, httpOnly:false, or sameSite:'none' for cookies or sessions."
        
      # Pattern 9: Lack of Proper Access Control
      - pattern: "router\\.(?:get|post|put|delete|patch)\\([^)]*?\\)\\s*(?!.*(?:authenticate|authorize|requireAuth|isAuthenticated|checkAuth|verifyToken|passport\\.authenticate))"
        location: "(?:routes|api|controllers)"
        message: "Potential lack of access control in route definition. Implement proper authentication and authorization middleware."
        
      # Pattern 10: Insecure File Operations
      - pattern: "(?:fs\\.(?:readFile|writeFile|appendFile|readdir|stat|access|open|unlink)|require)\\([^)]*?(?:(?:\\+|\\$\\{|\\`)[^)]*?(?:__dirname|__filename|process\\.cwd\\(\\)|path\\.(?:resolve|join)))"
        negative_pattern: "path\\.normalize|path\\.resolve|path\\.join"
        message: "Insecure file operations. Use path.normalize() and validate file paths to prevent directory traversal attacks."
        
      # Pattern 11: Lack of Proper Secrets Management
      - pattern: "(?:apiKey|secret|password|token|credentials)\\s*=\\s*(?:process\\.env\\.[A-Z_]+|config\\.[a-zA-Z0-9_]+|['\"][^'\"]+['\"])"
        negative_pattern: "(?:vault|secretsManager|keyVault|secretClient)"
        message: "Insecure secrets management. Consider using a dedicated secrets management solution instead of environment variables or configuration files."
        
      # Pattern 12: Insecure Randomness
      - pattern: "Math\\.random\\(\\)"
        location: "(?:auth|security|token|password|key|iv|nonce|salt)"
        message: "Insecure randomness. Use crypto.randomBytes() or a similar cryptographically secure random number generator for security-sensitive operations."
        
      # Pattern 13: Lack of Proper Input Sanitization for Templates
      - pattern: "(?:template|render|compile|ejs\\.render|handlebars\\.compile|pug\\.render)\\([^)]*?(?:(?:\\+|\\$\\{|\\`)[^)]*?(?:req\\.|request\\.|params\\.|query\\.|body\\.|user\\.|input\\.|form\\.))"
        message: "Potential template injection vulnerability. Sanitize user input before using in templates."
        
      # Pattern 14: Insecure WebSocket Implementation
      - pattern: "new\\s+WebSocket\\([^)]*?\\)|io\\.on\\(['\"]connection['\"]"
        negative_pattern: "(?:authenticate|authorize|verifyClient|beforeConnect)"
        message: "Potentially insecure WebSocket implementation. Implement proper authentication and authorization for WebSocket connections."
        
      # Pattern 15: Insecure Cross-Origin Resource Sharing (CORS)
      - pattern: "(?:cors\\(\\{[^}]*?origin\\s*:\\s*['\"]\\*['\"]|app\\.use\\(cors\\(\\{[^}]*?origin\\s*:\\s*['\"]\\*['\"])"
        message: "Insecure CORS configuration. Avoid using wildcard (*) for CORS origin in production environments."

  - type: suggest
    message: |
      **JavaScript Secure Design Best Practices:**
      
      1. **Defense in Depth Strategy:**
         - Implement multiple layers of security controls
         - Don't rely on a single security mechanism
         - Example:
           ```javascript
           // Multiple layers of protection
           app.use(helmet()); // HTTP security headers
           app.use(rateLimit()); // Rate limiting
           app.use(cors({ origin: allowedOrigins })); // Restricted CORS
           app.use(express.json({ limit: '10kb' })); // Request size limiting
           app.use(sanitize()); // Input sanitization
           ```
      
      2. **Proper Access Control:**
         - Implement role-based access control (RBAC)
         - Use middleware for authorization checks
         - Example:
           ```javascript
           // Role-based middleware
           const requireRole = (role) => {
             return (req, res, next) => {
               if (!req.user) {
                 return res.status(401).json({ error: 'Unauthorized' });
               }
               
               if (req.user.role !== role) {
                 return res.status(403).json({ error: 'Forbidden' });
               }
               
               next();
             };
           };
           
           // Apply to routes
           router.get('/admin/users', 
             authenticate, 
             requireRole('admin'), 
             adminController.listUsers
           );
           ```
      
      3. **Rate Limiting:**
         - Implement rate limiting for all API endpoints
         - Use different limits for different endpoints based on sensitivity
         - Example:
           ```javascript
           const rateLimit = require('express-rate-limit');
           
           // General API rate limit
           const apiLimiter = rateLimit({
             windowMs: 15 * 60 * 1000, // 15 minutes
             max: 100, // limit each IP to 100 requests per windowMs
             standardHeaders: true,
             legacyHeaders: false,
           });
           
           // More strict limit for authentication endpoints
           const authLimiter = rateLimit({
             windowMs: 15 * 60 * 1000,
             max: 5, // limit each IP to 5 login attempts per windowMs
             standardHeaders: true,
             legacyHeaders: false,
           });
           
           // Apply rate limiters
           app.use('/api/', apiLimiter);
           app.use('/api/auth/', authLimiter);
           ```
      
      4. **Input Validation:**
         - Validate all user inputs using schema validation
         - Implement both client and server-side validation
         - Example:
           ```javascript
           const Joi = require('joi');
           
           // Define validation schema
           const userSchema = Joi.object({
             username: Joi.string().alphanum().min(3).max(30).required(),
             email: Joi.string().email().required(),
             password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
             role: Joi.string().valid('user', 'admin').default('user')
           });
           
           // Validation middleware
           const validateUser = (req, res, next) => {
             const { error } = userSchema.validate(req.body);
             if (error) {
               return res.status(400).json({ error: error.details[0].message });
             }
             next();
           };
           
           // Apply validation
           router.post('/users', validateUser, userController.create);
           ```
      
      5. **Proper Error Handling:**
         - Implement centralized error handling
         - Avoid exposing sensitive information in error messages
         - Example:
           ```javascript
           // Centralized error handler
           app.use((err, req, res, next) => {
             // Log error for internal use
             console.error(err.stack);
             
             // Send appropriate response to client
             const statusCode = err.statusCode || 500;
             res.status(statusCode).json({
               status: 'error',
               message: statusCode === 500 ? 'Internal server error' : err.message
             });
           });
           
           // Custom error class
           class AppError extends Error {
             constructor(message, statusCode) {
               super(message);
               this.statusCode = statusCode;
               this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
               this.isOperational = true;
               
               Error.captureStackTrace(this, this.constructor);
             }
           }
           
           // Usage in controllers
           if (!user) {
             return next(new AppError('User not found', 404));
           }
           ```
      
      6. **Secure Authentication Design:**
         - Use secure password hashing (bcrypt, Argon2)
         - Implement proper session management
         - Use secure token validation
         - Example:
           ```javascript
           const bcrypt = require('bcrypt');
           const jwt = require('jsonwebtoken');
           
           // Password hashing
           const hashPassword = async (password) => {
             const salt = await bcrypt.genSalt(12);
             return bcrypt.hash(password, salt);
           };
           
           // Password verification
           const verifyPassword = async (password, hashedPassword) => {
             return await bcrypt.compare(password, hashedPassword);
           };
           
           // Token generation
           const generateToken = (userId) => {
             return jwt.sign(
               { id: userId },
               process.env.JWT_SECRET,
               { expiresIn: '1h' }
             );
           };
           
           // Token verification middleware
           const verifyToken = (req, res, next) => {
             const token = req.headers.authorization?.split(' ')[1];
             
             if (!token) {
               return res.status(401).json({ error: 'No token provided' });
             }
             
             try {
               const decoded = jwt.verify(token, process.env.JWT_SECRET);
               req.userId = decoded.id;
               next();
             } catch (error) {
               return res.status(401).json({ error: 'Invalid token' });
             }
           };
           ```
      
      7. **Comprehensive Logging:**
         - Log security-relevant events
         - Include necessary context but avoid sensitive data
         - Use structured logging
         - Example:
           ```javascript
           const winston = require('winston');
           
           // Create logger
           const logger = winston.createLogger({
             level: 'info',
             format: winston.format.json(),
             defaultMeta: { service: 'user-service' },
             transports: [
               new winston.transports.File({ filename: 'error.log', level: 'error' }),
               new winston.transports.File({ filename: 'combined.log' })
             ]
           });
           
           // Logging middleware
           app.use((req, res, next) => {
             const start = Date.now();
             
             res.on('finish', () => {
               const duration = Date.now() - start;
               logger.info({
                 method: req.method,
                 path: req.path,
                 statusCode: res.statusCode,
                 duration,
                 ip: req.ip,
                 userId: req.user?.id || 'anonymous'
               });
             });
             
             next();
           });
           
           // Security event logging
           logger.warn({
             event: 'failed_login',
             username: req.body.username,
             ip: req.ip,
             timestamp: new Date().toISOString()
           });
           ```
      
      8. **Secure Configuration Management:**
         - Use environment-specific configurations
         - Validate configuration at startup
         - Example:
           ```javascript
           const Joi = require('joi');
           
           // Define environment variables schema
           const envSchema = Joi.object({
             NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
             PORT: Joi.number().default(3000),
             DATABASE_URL: Joi.string().required(),
             JWT_SECRET: Joi.string().min(32).required(),
             JWT_EXPIRES_IN: Joi.string().default('1h'),
             CORS_ORIGIN: Joi.string().required()
           }).unknown();
           
           // Validate environment variables
           const { error, value } = envSchema.validate(process.env);
           
           if (error) {
             throw new Error(`Configuration validation error: ${error.message}`);
           }
           
           // Use validated config
           const config = {
             env: value.NODE_ENV,
             port: value.PORT,
             db: {
               url: value.DATABASE_URL
             },
             jwt: {
               secret: value.JWT_SECRET,
               expiresIn: value.JWT_EXPIRES_IN
             },
             cors: {
               origin: value.CORS_ORIGIN.split(',')
             }
           };
           
           module.exports = config;
           ```
      
      9. **Secure File Operations:**
         - Validate and sanitize file paths
         - Use content-type validation for uploads
         - Implement file size limits
         - Example:
           ```javascript
           const path = require('path');
           const fs = require('fs');
           
           // Secure file access function
           const getSecureFilePath = (userInput) => {
             // Define allowed directory
             const baseDir = path.resolve(__dirname, '../public/files');
             
             // Normalize and resolve full path
             const normalizedPath = path.normalize(userInput);
             const fullPath = path.join(baseDir, normalizedPath);
             
             // Ensure path is within allowed directory
             if (!fullPath.startsWith(baseDir)) {
               throw new Error('Invalid file path');
             }
             
             return fullPath;
           };
           
           // Usage
           try {
             const filePath = getSecureFilePath(req.params.filename);
             const fileContent = fs.readFileSync(filePath, 'utf8');
             res.send(fileContent);
           } catch (error) {
             next(error);
           }
           ```
      
      10. **Secure WebSocket Implementation:**
          - Implement authentication for WebSocket connections
          - Validate and sanitize WebSocket messages
          - Example:
            ```javascript
            const http = require('http');
            const socketIo = require('socket.io');
            const jwt = require('jsonwebtoken');
            
            const server = http.createServer(app);
            const io = socketIo(server);
            
            // WebSocket authentication middleware
            io.use((socket, next) => {
              const token = socket.handshake.auth.token;
              
              if (!token) {
                return next(new Error('Authentication error'));
              }
              
              try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                socket.userId = decoded.id;
                next();
              } catch (error) {
                return next(new Error('Authentication error'));
              }
            });
            
            io.on('connection', (socket) => {
              console.log(`User ${socket.userId} connected`);
              
              // Join user to their own room for private messages
              socket.join(`user:${socket.userId}`);
              
              // Message validation
              socket.on('message', (data) => {
                // Validate message data
                if (!data || !data.content || typeof data.content !== 'string') {
                  return socket.emit('error', { message: 'Invalid message format' });
                }
                
                // Process message
                // ...
              });
            });
            ```

  - type: validate
    conditions:
      # Check 1: Rate limiting implementation
      - pattern: "(?:rateLimit|rateLimiter|limiter|throttle)\\([^)]*?\\)"
        message: "Implementing rate limiting for API protection."
      
      # Check 2: Input validation
      - pattern: "(?:validate|sanitize|check|schema|joi|yup|zod|validator|isValid)"
        message: "Using input validation or schema validation."
      
      # Check 3: Proper error handling
      - pattern: "(?:try\\s*\\{[^}]*?\\}\\s*catch\\s*\\([^)]*?\\)\\s*\\{[^}]*?(?:res\\.status|next\\(err|next\\(error|errorHandler))"
        message: "Implementing proper error handling."
      
      # Check 4: Authentication middleware
      - pattern: "(?:authenticate|authorize|requireAuth|isAuthenticated|checkAuth|verifyToken|passport\\.authenticate)"
        message: "Using authentication middleware for routes."
      
      # Check 5: Secure configuration
      - pattern: "(?:helmet|cors\\(\\{[^}]*?origin\\s*:\\s*(?!['\"]*\\*)['\"])"
        message: "Using secure HTTP headers and CORS configuration."

metadata:
  priority: high
  version: 1.0
  tags:
    - security
    - javascript
    - nodejs
    - browser
    - design
    - owasp
    - language:javascript
    - framework:express
    - framework:react
    - framework:vue
    - framework:angular
    - category:security
    - subcategory:insecure-design
    - standard:owasp-top10
    - risk:a04-insecure-design
  references:
    - "https://owasp.org/Top10/A04_2021-Insecure_Design/"
    - "https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html"
    - "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
    - "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
    - "https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html"
    - "https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html"
    - "https://github.com/OWASP/NodeGoat"
</rule> 
