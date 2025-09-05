/**
 * SEO Configuration
 * Centralized configuration for all SEO operations
 */

export interface SEOConfig {
  // API Configuration
  openaiApiKey?: string
  googleApiKey?: string
  
  // Content Generation Settings
  contentGeneration: {
    minWordCount: number
    maxWordCount: number
    keywordDensityTarget: number
    includeLocalReferences: boolean
    includeFAQ: boolean
    includeSchema: boolean
  }
  
  // Technical SEO Settings
  technicalSEO: {
    enableRobotsTxtGeneration: boolean
    enableSitemapGeneration: boolean
    enableSchemaMarkup: boolean
    enableMobileOptimization: boolean
  }
  
  // Performance Settings
  performance: {
    targetPageSpeedScore: number
    enableImageOptimization: boolean
    enableCSSMinification: boolean
    enableJSMinification: boolean
    enableCaching: boolean
  }
  
  // Monitoring Settings
  monitoring: {
    trackingInterval: number // in minutes
    enableRankingTracking: boolean
    enableTrafficTracking: boolean
    enableConversionTracking: boolean
  }
  
  // Rate Limiting
  rateLimiting: {
    maxConcurrentAgents: number
    requestsPerMinute: number
    retryAttempts: number
    retryDelay: number
  }
}

// Default configuration
export const defaultSEOConfig: SEOConfig = {
  contentGeneration: {
    minWordCount: 500,
    maxWordCount: 2000,
    keywordDensityTarget: 2.0, // 2%
    includeLocalReferences: true,
    includeFAQ: true,
    includeSchema: true
  },
  
  technicalSEO: {
    enableRobotsTxtGeneration: true,
    enableSitemapGeneration: true,
    enableSchemaMarkup: true,
    enableMobileOptimization: true
  },
  
  performance: {
    targetPageSpeedScore: 90,
    enableImageOptimization: true,
    enableCSSMinification: true,
    enableJSMinification: true,
    enableCaching: true
  },
  
  monitoring: {
    trackingInterval: 60, // 1 hour
    enableRankingTracking: true,
    enableTrafficTracking: true,
    enableConversionTracking: true
  },
  
  rateLimiting: {
    maxConcurrentAgents: 3,
    requestsPerMinute: 60,
    retryAttempts: 3,
    retryDelay: 1000 // 1 second
  }
}

// Environment-specific configurations
export const developmentConfig: Partial<SEOConfig> = {
  rateLimiting: {
    maxConcurrentAgents: 2,
    requestsPerMinute: 30,
    retryAttempts: 2,
    retryDelay: 2000
  },
  monitoring: {
    trackingInterval: 120, // 2 hours in development
    enableRankingTracking: false, // Disable in development
    enableTrafficTracking: false,
    enableConversionTracking: false
  }
}

export const productionConfig: Partial<SEOConfig> = {
  rateLimiting: {
    maxConcurrentAgents: 5,
    requestsPerMinute: 100,
    retryAttempts: 3,
    retryDelay: 1000
  },
  performance: {
    targetPageSpeedScore: 95, // Higher target for production
    enableImageOptimization: true,
    enableCSSMinification: true,
    enableJSMinification: true,
    enableCaching: true
  }
}

/**
 * Get configuration based on environment
 */
export function getSEOConfig(): SEOConfig {
  const env = process.env.NODE_ENV || 'development'
  
  let config = { ...defaultSEOConfig }
  
  if (env === 'development') {
    config = { ...config, ...developmentConfig }
  } else if (env === 'production') {
    config = { ...config, ...productionConfig }
  }
  
  // Override with environment variables if available
  if (process.env.OPENAI_API_KEY) {
    config.openaiApiKey = process.env.OPENAI_API_KEY
  }
  
  if (process.env.GOOGLE_API_KEY) {
    config.googleApiKey = process.env.GOOGLE_API_KEY
  }
  
  return config
}

/**
 * Validate configuration
 */
export function validateSEOConfig(config: SEOConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Validate content generation settings
  if (config.contentGeneration.minWordCount < 100) {
    errors.push('Minimum word count should be at least 100')
  }
  
  if (config.contentGeneration.maxWordCount < config.contentGeneration.minWordCount) {
    errors.push('Maximum word count should be greater than minimum word count')
  }
  
  if (config.contentGeneration.keywordDensityTarget < 0.5 || config.contentGeneration.keywordDensityTarget > 5) {
    errors.push('Keyword density target should be between 0.5% and 5%')
  }
  
  // Validate performance settings
  if (config.performance.targetPageSpeedScore < 50 || config.performance.targetPageSpeedScore > 100) {
    errors.push('Target PageSpeed score should be between 50 and 100')
  }
  
  // Validate monitoring settings
  if (config.monitoring.trackingInterval < 15) {
    errors.push('Tracking interval should be at least 15 minutes')
  }
  
  // Validate rate limiting
  if (config.rateLimiting.maxConcurrentAgents < 1) {
    errors.push('Maximum concurrent agents should be at least 1')
  }
  
  if (config.rateLimiting.requestsPerMinute < 10) {
    errors.push('Requests per minute should be at least 10')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}