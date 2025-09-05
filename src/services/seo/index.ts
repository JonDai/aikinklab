/**
 * Main entry point for SEO services
 * Exports all public interfaces and classes
 */

// Main controller
export { SEOController } from './SEOController'

// Base agent class
export { BaseAgent } from './agents/BaseAgent'

// Specialized agents
export { KeywordResearchAgent } from './agents/KeywordResearchAgent'

// Types and interfaces
export * from './types'

// Utilities
export * from './utils'

// Configuration
export * from './config'

// Create and export a singleton instance of the SEO controller
export const seoController = new SEOController()

/**
 * Initialize the SEO system
 * This function should be called once when the application starts
 */
export function initializeSEO(): void {
  console.log('SEO system initialized')
  // Additional initialization logic can be added here
}

/**
 * Quick access function for website optimization
 */
export async function optimizeWebsite(config: {
  websiteUrl: string
  businessDescription: string
  targetLocations?: string[]
  focusKeywords?: string[]
  optimizationLevel?: 'basic' | 'comprehensive' | 'aggressive'
}) {
  return seoController.optimizeWebsite({
    optimizationLevel: 'comprehensive',
    ...config
  })
}