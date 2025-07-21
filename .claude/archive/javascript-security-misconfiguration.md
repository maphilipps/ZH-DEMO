---
description: Detect and prevent security misconfigurations in JavaScript applications as defined in OWASP Top 10:2021-A05
globs: **/*.js, **/*.jsx, **/*.ts, **/*.tsx, !**/node_modules/**, !**/dist/**, !**/build/**, !**/coverage/**
---
# JavaScript Security Misconfiguration (OWASP A05:2021)

<rule>
name: javascript_security_misconfiguration
description: Detect and prevent security misconfigurations in JavaScript applications as defined in OWASP Top 10:2021-A05

actions:
  - type: enforce
    conditions:
      # Pattern 1: Missing or Insecure HTTP Security Headers
      - pattern: "app\\.use\\([^)]*?\\)\\s*(?!.*(?:helmet|frameguard|hsts|noSniff|xssFilter|contentSecurityPolicy))"
        location: "(?:app|server|index)\\.(?:js|ts)$"
        message: "Missing HTTP security headers. Consider using Helmet.js to set secure HTTP headers."
        
      # Pattern 2: Insecure CORS Configuration
      - pattern: "app\\.use\\(cors\\(\\{[^}]*?origin\\s*:\\s*['\"]\\*['\"]\\s*\\}\\)\\)"
        message: "Insecure CORS configuration. Avoid using wildcard (*) for CORS origin in production environments."
        
      # Pattern 3: Exposed Environment Variables in Client-Side Code
      - pattern: "process\\.env\\.[A-Z_]+"
        location: "(?:src|components|pages)"
        message: "Exposing environment variables in client-side code. Only use environment variables with NEXT_PUBLIC_, REACT_APP_, or VITE_ prefixes for client-side code."
        
      # Pattern 4: Insecure Cookie Settings
      - pattern: "(?:cookie|cookies|session)\\([^)]*?\\{[^}]*?(?:secure\\s*:\\s*false|httpOnly\\s*:\\s*false|sameSite\\s*:\\s*['\"]none['\"])"
        message: "Insecure cookie configuration. Set secure:true, httpOnly:true, and appropriate sameSite value for cookies."
        
      # Pattern 5: Missing Content Security Policy
      - pattern: "app\\.use\\([^)]*?helmet\\([^)]*?\\{[^}]*?contentSecurityPolicy\\s*:\\s*false"
        message: "Content Security Policy (CSP) is disabled. Enable and configure CSP to prevent XSS attacks."
        
      # Pattern 6: Debug Information Exposure
      - pattern: "app\\.use\\([^)]*?morgan\\(['\"]dev['\"]\\)|console\\.(?:log|debug|info|warn|error)\\("
        location: "(?:app|server|index)\\.(?:js|ts)$"
        message: "Debug information might be exposed in production. Ensure logging is properly configured based on the environment."
        
      # Pattern 7: Insecure Server Configuration
      - pattern: "app\\.disable\\(['\"]x-powered-by['\"]\\)"
        negative_pattern: true
        location: "(?:app|server|index)\\.(?:js|ts)$"
        message: "X-Powered-By header is not disabled. Use app.disable('x-powered-by') to hide technology information."
        
      # Pattern 8: Directory Listing Enabled
      - pattern: "express\\.static\\([^)]*?\\{[^}]*?index\\s*:\\s*false"
        message: "Directory listing might be enabled. Set index:true or provide an index file to prevent directory listing."
        
      # Pattern 9: Missing Rate Limiting
      - pattern: "app\\.(?:get|post|put|delete|patch)\\([^)]*?['\"](?:/api|/login|/register|/auth)['\"]"
        negative_pattern: "(?:rateLimit|rateLimiter|limiter|throttle)"
        message: "Missing rate limiting for sensitive endpoints. Implement rate limiting to prevent brute force attacks."
        
      # Pattern 10: Insecure WebSocket Configuration
      - pattern: "new\\s+WebSocket\\([^)]*?\\)|io\\.on\\(['\"]connection['\"]"
        negative_pattern: "(?:wss://|https://)"
        message: "Potentially insecure WebSocket connection. Use secure WebSocket (wss://) in production."
        
      # Pattern 11: Hardcoded Configuration Values
      - pattern: "(?:apiKey|secret|password|token|credentials)\\s*=\\s*['\"][^'\"]+['\"]"
        message: "Hardcoded configuration values. Use environment variables or a secure configuration management system."
        
      # Pattern 12: Insecure SSL/TLS Configuration
      - pattern: "https\\.createServer\\([^)]*?\\{[^}]*?rejectUnauthorized\\s*:\\s*false"
        message: "Insecure SSL/TLS configuration. Never set rejectUnauthorized:false in production."
        
      # Pattern 13: Missing Security Middleware
      - pattern: "express\\(\\)|require\\(['\"]express['\"]\\)"
        negative_pattern: "(?:helmet|cors|rateLimit|bodyParser\\.json\\(\\{\\s*limit|express\\.json\\(\\{\\s*limit)"
        location: "(?:app|server|index)\\.(?:js|ts)$"
        message: "Missing essential security middleware. Consider using helmet, cors, rate limiting, and request size limiting."
        
      # Pattern 14: Insecure Error Handling
      - pattern: "app\\.use\\([^)]*?function\\s*\\([^)]*?err[^)]*?\\)\\s*\\{[^}]*?res\\.status[^}]*?err(?:\\.message|\\.stack)"
        message: "Insecure error handling. Avoid exposing error details like stack traces to clients in production."
        
      # Pattern 15: Outdated Dependencies Warning
      - pattern: "(?:\"dependencies\"|\"devDependencies\")\\s*:\\s*\\{[^}]*?['\"](?:express|react|vue|angular|next|nuxt|axios)['\"]\\s*:\\s*['\"]\\^?\\d+\\.\\d+\\.\\d+['\"]"
        location: "package\\.json$"
        message: "Check for outdated dependencies. Regularly update dependencies to avoid known vulnerabilities."

  - type: suggest
    message: |
      **JavaScript Security Configuration Best Practices:**
      
      1. **HTTP Security Headers:**
         - Use Helmet.js to set secure HTTP headers
         - Configure Content Security Policy (CSP)
         - Example:
           ```javascript
           const helmet = require('helmet');
           
           // Basic usage
           app.use(helmet());
           
           // Custom CSP configuration
           app.use(
             helmet.contentSecurityPolicy({
               directives: {
                 defaultSrc: ["'self'"],
                 scriptSrc: ["'self'", "'unsafe-inline'", 'trusted-cdn.com'],
                 styleSrc: ["'self'", "'unsafe-inline'", 'trusted-cdn.com'],
                 imgSrc: ["'self'", 'data:', 'trusted-cdn.com'],
                 connectSrc: ["'self'", 'api.yourdomain.com'],
                 fontSrc: ["'self'", 'trusted-cdn.com'],
                 objectSrc: ["'none'"],
                 mediaSrc: ["'self'"],
                 frameSrc: ["'none'"],
                 upgradeInsecureRequests: [],
               },
             })
           );
           ```
      
      2. **Secure CORS Configuration:**
         - Specify allowed origins explicitly
         - Configure appropriate CORS options
         - Example:
           ```javascript
           const cors = require('cors');
           
           // Define allowed origins
           const allowedOrigins = [
             'https://yourdomain.com',
             'https://app.yourdomain.com',
             'https://admin.yourdomain.com'
           ];
           
           // Configure CORS
           app.use(cors({
             origin: function(origin, callback) {
               // Allow requests with no origin (like mobile apps, curl, etc.)
               if (!origin) return callback(null, true);
               
               if (allowedOrigins.indexOf(origin) === -1) {
                 const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                 return callback(new Error(msg), false);
               }
               
               return callback(null, true);
             },
             methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
             credentials: true,
             maxAge: 86400 // 24 hours
           }));
           ```
      
      3. **Environment-Based Configuration:**
         - Use different configurations for development and production
         - Validate configuration at startup
         - Example:
           ```javascript
           const express = require('express');
           const helmet = require('helmet');
           const morgan = require('morgan');
           
           const app = express();
           
           // Environment-specific configuration
           if (process.env.NODE_ENV === 'production') {
             // Production settings
             app.use(helmet());
             app.use(morgan('combined'));
             app.set('trust proxy', 1); // Trust first proxy
             
             // Disable X-Powered-By header
             app.disable('x-powered-by');
           } else {
             // Development settings
             app.use(morgan('dev'));
           }
           
           // Validate required environment variables
           const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];
           for (const envVar of requiredEnvVars) {
             if (!process.env[envVar]) {
               console.error(`Error: Environment variable ${envVar} is required`);
               process.exit(1);
             }
           }
           ```
      
      4. **Secure Cookie Configuration:**
         - Set secure, httpOnly, and sameSite attributes
         - Use signed cookies when appropriate
         - Example:
           ```javascript
           const session = require('express-session');
           
           app.use(session({
             secret: process.env.SESSION_SECRET,
             name: 'sessionId', // Custom cookie name instead of default
             cookie: {
               secure: process.env.NODE_ENV === 'production', // HTTPS only in production
               httpOnly: true, // Prevents client-side JS from reading the cookie
               sameSite: 'lax', // Controls when cookies are sent with cross-site requests
               maxAge: 3600000, // 1 hour in milliseconds
               domain: process.env.NODE_ENV === 'production' ? '.yourdomain.com' : undefined
             },
             resave: false,
             saveUninitialized: false
           }));
           ```
      
      5. **Request Size Limiting:**
         - Limit request body size to prevent DoS attacks
         - Example:
           ```javascript
           // Using express built-in middleware
           app.use(express.json({ limit: '10kb' }));
           app.use(express.urlencoded({ extended: true, limit: '10kb' }));
           
           // Or using body-parser
           const bodyParser = require('body-parser');
           app.use(bodyParser.json({ limit: '10kb' }));
           app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }));
           ```
      
      6. **Proper Error Handling:**
         - Use a centralized error handler
         - Don't expose sensitive information in error responses
         - Example:
           ```javascript
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
           
           // Global error handling middleware
           app.use((err, req, res, next) => {
             err.statusCode = err.statusCode || 500;
             err.status = err.status || 'error';
             
             // Different handling for development and production
             if (process.env.NODE_ENV === 'development') {
               res.status(err.statusCode).json({
                 status: err.status,
                 error: err,
                 message: err.message,
                 stack: err.stack
               });
             } else if (process.env.NODE_ENV === 'production') {
               // Only send operational errors to the client
               if (err.isOperational) {
                 res.status(err.statusCode).json({
                   status: err.status,
                   message: err.message
                 });
               } else {
                 // Log programming or unknown errors
                 console.error('ERROR 💥', err);
                 
                 // Send generic message
                 res.status(500).json({
                   status: 'error',
                   message: 'Something went wrong'
                 });
               }
             }
           });
           ```
      
      7. **Rate Limiting:**
         - Apply rate limiting to sensitive endpoints
         - Use different limits for different endpoints
         - Example:
           ```javascript
           const rateLimit = require('express-rate-limit');
           
           // Create a rate limiter for API endpoints
           const apiLimiter = rateLimit({
             windowMs: 15 * 60 * 1000, // 15 minutes
             max: 100, // limit each IP to 100 requests per windowMs
             standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
             legacyHeaders: false, // Disable the `X-RateLimit-*` headers
             message: 'Too many requests from this IP, please try again after 15 minutes'
           });
           
           // Create a stricter rate limiter for authentication endpoints
           const authLimiter = rateLimit({
             windowMs: 15 * 60 * 1000, // 15 minutes
             max: 5, // limit each IP to 5 login attempts per windowMs
             standardHeaders: true,
             legacyHeaders: false,
             message: 'Too many login attempts from this IP, please try again after 15 minutes'
           });
           
           // Apply rate limiters to routes
           app.use('/api/', apiLimiter);
           app.use('/api/auth/', authLimiter);
           ```
      
      8. **Secure WebSocket Configuration:**
         - Use secure WebSocket connections (wss://)
         - Implement authentication for WebSocket connections
         - Example:
           ```javascript
           const http = require('http');
           const https = require('https');
           const socketIo = require('socket.io');
           const fs = require('fs');
           
           let server;
           
           // Create secure server in production
           if (process.env.NODE_ENV === 'production') {
             const options = {
               key: fs.readFileSync('/path/to/private.key'),
               cert: fs.readFileSync('/path/to/certificate.crt')
             };
             server = https.createServer(options, app);
           } else {
             server = http.createServer(app);
           }
           
           const io = socketIo(server, {
             cors: {
               origin: process.env.NODE_ENV === 'production' 
                 ? 'https://yourdomain.com' 
                 : 'http://localhost:3000',
               methods: ['GET', 'POST'],
               credentials: true
             }
           });
           
           // WebSocket authentication middleware
           io.use((socket, next) => {
             const token = socket.handshake.auth.token;
             
             if (!token) {
               return next(new Error('Authentication error'));
             }
             
             // Verify token
             // ...
             
             next();
           });
           ```
      
      9. **Security Dependency Management:**
         - Regularly update dependencies
         - Use tools like npm audit or Snyk
         - Example:
           ```javascript
           // package.json scripts
           {
             "scripts": {
               "audit": "npm audit",
               "audit:fix": "npm audit fix",
               "outdated": "npm outdated",
               "update": "npm update",
               "prestart": "npm audit --production"
             }
           }
           ```
      
      10. **Secure Logging Configuration:**
          - Configure logging based on environment
          - Avoid logging sensitive information
          - Example:
            ```javascript
            const winston = require('winston');
            
            // Define log levels
            const levels = {
              error: 0,
              warn: 1,
              info: 2,
              http: 3,
              debug: 4,
            };
            
            // Define log level based on environment
            const level = () => {
              const env = process.env.NODE_ENV || 'development';
              return env === 'development' ? 'debug' : 'warn';
            };
            
            // Define log format
            const format = winston.format.combine(
              winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
              winston.format.printf(
                (info) => `${info.timestamp} ${info.level}: ${info.message}`
              )
            );
            
            // Define transports
            const transports = [
              new winston.transports.Console(),
              new winston.transports.File({
                filename: 'logs/error.log',
                level: 'error',
              }),
              new winston.transports.File({ filename: 'logs/all.log' }),
            ];
            
            // Create the logger
            const logger = winston.createLogger({
              level: level(),
              levels,
              format,
              transports,
            });
            
            module.exports = logger;
            ```

  - type: validate
    conditions:
      # Check 1: Helmet usage
      - pattern: "helmet\\(\\)|frameguard\\(\\)|hsts\\(\\)|noSniff\\(\\)|xssFilter\\(\\)|contentSecurityPolicy\\(\\)"
        message: "Using Helmet.js or individual HTTP security headers middleware."
      
      # Check 2: Secure CORS configuration
      - pattern: "cors\\(\\{[^}]*?origin\\s*:\\s*(?!['\"]*\\*)['\"]"
        message: "Using secure CORS configuration with specific origins."
      
      # Check 3: Environment-based configuration
      - pattern: "process\\.env\\.NODE_ENV\\s*===\\s*['\"]production['\"]"
        message: "Implementing environment-specific configuration."
      
      # Check 4: Secure cookie settings
      - pattern: "cookie\\s*:\\s*\\{[^}]*?secure\\s*:\\s*true[^}]*?httpOnly\\s*:\\s*true"
        message: "Using secure cookie configuration."
      
      # Check 5: Request size limiting
      - pattern: "(?:express|bodyParser)\\.json\\(\\{[^}]*?limit\\s*:"
        message: "Implementing request size limiting."

metadata:
  priority: high
  version: 1.0
  tags:
    - security
    - javascript
    - nodejs
    - browser
    - configuration
    - owasp
    - language:javascript
    - framework:express
    - framework:react
    - framework:vue
    - framework:angular
    - category:security
    - subcategory:misconfiguration
    - standard:owasp-top10
    - risk:a05-security-misconfiguration
  references:
    - "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/"
    - "https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html"
    - "https://expressjs.com/en/advanced/best-practice-security.html"
    - "https://helmetjs.github.io/"
    - "https://github.com/OWASP/NodeGoat"
    - "https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html"
    - "https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html"
</rule> 
