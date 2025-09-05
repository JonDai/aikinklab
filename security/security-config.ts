// Security configuration for AIKinkLab
export const securityConfig = {
  // Content Security Policy
  csp: {
    directives: {
      'default-src': ["'self'"],
      'script-src': [
        "'self'",
        "'unsafe-inline'", // Required for Next.js inline scripts
        "'unsafe-eval'", // Required for development
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com',
        'https://ssl.google-analytics.com'
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'", // Required for styled-components and CSS-in-JS
        'https://fonts.googleapis.com'
      ],
      'font-src': [
        "'self'",
        'https://fonts.gstatic.com',
        'data:'
      ],
      'img-src': [
        "'self'",
        'data:',
        'blob:',
        'https:',
        'https://www.google-analytics.com',
        'https://ssl.google-analytics.com'
      ],
      'media-src': [
        "'self'",
        'data:',
        'blob:'
      ],
      'object-src': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'frame-ancestors': ["'none'"],
      'frame-src': ["'none'"],
      'connect-src': [
        "'self'",
        'https://www.google-analytics.com',
        'https://analytics.google.com',
        'wss://localhost:*', // For development hot reload
        'https://*.vercel.app' // For Vercel deployments
      ],
      'worker-src': [
        "'self'",
        'blob:'
      ],
      'child-src': [
        "'self'"
      ],
      'upgrade-insecure-requests': []
    }
  },

  // Security headers
  headers: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
  },

  // Rate limiting configuration
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: 'Too many requests from this IP, please try again later.',
      code: 'RATE_LIMIT_EXCEEDED'
    },
    // Different limits for different endpoints
    endpoints: {
      '/api/test': { max: 10, windowMs: 60 * 1000 }, // Test endpoints
      '/api/analytics': { max: 50, windowMs: 60 * 1000 },
      '/api/health': { max: 200, windowMs: 60 * 1000 }
    }
  },

  // CORS configuration
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://www.aikinklab.com', 'https://aikinklab.com']
      : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400 // 24 hours
  },

  // Session configuration
  session: {
    name: 'aikinklab.session',
    secret: process.env.SESSION_SECRET || 'default-dev-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'strict' as const
    }
  },

  // Input validation rules
  validation: {
    // User input sanitization
    sanitize: {
      removeScripts: true,
      removeHTML: true,
      trim: true,
      escape: true
    },
    
    // Field validation rules
    rules: {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      username: /^[a-zA-Z0-9_-]{3,20}$/,
      message: {
        minLength: 1,
        maxLength: 1000,
        allowHTML: false
      }
    }
  },

  // Privacy and compliance settings
  privacy: {
    // GDPR compliance
    gdpr: {
      enabled: true,
      consentRequired: true,
      dataRetentionDays: 730, // 2 years
      cookieCategories: [
        'necessary',
        'analytics',
        'marketing'
      ]
    },
    
    // Cookie settings
    cookies: {
      necessary: {
        session: true,
        csrf: true,
        preferences: true
      },
      analytics: {
        googleAnalytics: false, // Require consent
        performance: false
      },
      marketing: {
        tracking: false, // Require consent
        advertising: false
      }
    },
    
    // Data collection policies
    dataCollection: {
      minimizeCollection: true,
      anonymizeIPs: true,
      respectDNT: true, // Respect Do Not Track
      logRetentionDays: 90
    }
  },

  // Security monitoring
  monitoring: {
    // Suspicious activity detection
    suspiciousActivity: {
      rapidRequests: { threshold: 50, timeWindow: 60000 },
      invalidTokens: { threshold: 5, timeWindow: 300000 },
      bruteForce: { threshold: 10, timeWindow: 300000 }
    },
    
    // Automated responses
    autoResponse: {
      temporaryBlock: true,
      alerting: true,
      logging: true
    },
    
    // Security scan configuration
    scanning: {
      dependencyCheck: true,
      vulnerabilityAssessment: true,
      codeAnalysis: true
    }
  }
};

// Security utility functions
export const SecurityUtils = {
  // Generate secure random strings
  generateSecureToken: (length: number = 32): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const values = new Uint8Array(length);
    crypto.getRandomValues(values);
    
    for (let i = 0; i < length; i++) {
      result += chars[values[i] % chars.length];
    }
    return result;
  },

  // Hash passwords securely (for future use)
  hashPassword: async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + (process.env.PASSWORD_SALT || 'default-salt'));
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  },

  // Sanitize user input
  sanitizeInput: (input: string): string => {
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>?/gm, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  },

  // Validate email format
  validateEmail: (email: string): boolean => {
    return securityConfig.validation.rules.email.test(email);
  },

  // Check for suspicious patterns
  detectSuspiciousActivity: (request: any): boolean => {
    const userAgent = request.headers?.['user-agent'] || '';
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scanner/i,
      /sqlmap/i,
      /nmap/i
    ];
    
    return suspiciousPatterns.some(pattern => pattern.test(userAgent));
  },

  // Rate limiting check
  isRateLimited: (identifier: string, endpoint: string): boolean => {
    // This would integrate with your rate limiting implementation
    // For now, return false (implement with Redis or in-memory store)
    return false;
  }
};

export default securityConfig;