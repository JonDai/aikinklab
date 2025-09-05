module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/test',
        'http://localhost:3000/about',
        'http://localhost:3000/privacy-policy'
      ],
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'ready on',
      startServerReadyTimeout: 30000
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'categories:pwa': 'off', // PWA not required for this project
        
        // Core Web Vitals
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        
        // Other performance metrics
        'speed-index': ['warn', { maxNumericValue: 4000 }],
        'interactive': ['warn', { maxNumericValue: 3000 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        
        // Accessibility checks
        'color-contrast': 'error',
        'image-alt': 'error',
        'label': 'error',
        'aria-hidden-focus': 'error',
        'heading-order': 'warn',
        
        // SEO checks
        'document-title': 'error',
        'meta-description': 'error',
        'canonical': 'warn',
        
        // Best practices
        'uses-https': 'off', // localhost doesn't use HTTPS
        'is-on-https': 'off',
        'external-anchors-use-rel-noopener': 'warn',
        'no-vulnerable-libraries': 'error'
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}