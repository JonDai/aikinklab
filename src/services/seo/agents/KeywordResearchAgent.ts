import { BaseAgent } from './BaseAgent'
import { 
  SEOTask, 
  AgentResult, 
  AgentStatus, 
  TaskType,
  Keyword,
  KeywordCategory,
  SearchIntent,
  CategorizedKeywords,
  PrioritizedKeywords
} from '../types'
import { generateId, slugify, cleanText } from '../utils'

/**
 * Website analysis result interface
 */
interface WebsiteAnalysis {
  url: string
  businessType: string
  services: string[]
  locations: string[]
  competitors: string[]
  contentThemes: string[]
  targetAudience: string[]
}

/**
 * Keyword Research Agent
 * Analyzes websites and generates strategic keyword recommendations
 */
export class KeywordResearchAgent extends BaseAgent {
  constructor() {
    super('keyword_research', 'Keyword Research Agent')
  }

  async execute(task: SEOTask): Promise<AgentResult> {
    this.setStatus(AgentStatus.RUNNING)
    
    try {
      if (task.type !== TaskType.KEYWORD_RESEARCH) {
        return this.createErrorResult(`Invalid task type: ${task.type}`)
      }

      if (!this.validateTaskData(task, ['websiteUrl', 'businessDescription'])) {
        return this.createErrorResult('Missing required fields: websiteUrl, businessDescription')
      }

      const { websiteUrl, businessDescription, targetLocations, focusKeywords } = task.data

      this.log('Starting keyword research analysis...')

      // Step 1: Analyze website
      const analysis = await this.analyzeWebsite(websiteUrl, businessDescription)
      
      // Step 2: Generate keywords
      const keywords = await this.generateKeywords(analysis, targetLocations, focusKeywords)
      
      // Step 3: Categorize keywords
      const categorized = await this.categorizeKeywords(keywords)
      
      // Step 4: Prioritize by intent
      const prioritized = await this.prioritizeByIntent(categorized)

      this.setStatus(AgentStatus.COMPLETED)
      
      return this.createSuccessResult({
        analysis,
        keywords: prioritized.highPriority.concat(prioritized.mediumPriority),
        categorized,
        prioritized,
        totalKeywords: keywords.length
      })

    } catch (error) {
      this.setStatus(AgentStatus.ERROR)
      this.log(`Keyword research failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error')
      return this.createErrorResult(`Keyword research failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  getCapabilities(): string[] {
    return [
      'website_analysis',
      'keyword_generation',
      'keyword_categorization',
      'intent_analysis',
      'competitor_analysis',
      'local_seo_keywords'
    ]
  }

  /**
   * Analyze website content and extract business context
   */
  async analyzeWebsite(url: string, businessDescription: string): Promise<WebsiteAnalysis> {
    this.log(`Analyzing website: ${url}`)

    // In a real implementation, this would scrape the website
    // For now, we'll simulate analysis based on business description
    const analysis: WebsiteAnalysis = {
      url,
      businessType: this.extractBusinessType(businessDescription),
      services: this.extractServices(businessDescription),
      locations: this.extractLocations(businessDescription),
      competitors: [], // Would be populated by actual competitor analysis
      contentThemes: this.extractContentThemes(businessDescription),
      targetAudience: this.extractTargetAudience(businessDescription)
    }

    this.log(`Website analysis completed: ${analysis.services.length} services identified`)
    return analysis
  }

  /**
   * Generate keywords based on website analysis
   */
  async generateKeywords(
    analysis: WebsiteAnalysis, 
    targetLocations?: string[], 
    focusKeywords?: string[]
  ): Promise<string[]> {
    this.log('Generating keywords...')

    const keywords = new Set<string>()

    // Add focus keywords if provided
    if (focusKeywords) {
      focusKeywords.forEach(keyword => keywords.add(keyword.toLowerCase()))
    }

    // Generate service-based keywords
    analysis.services.forEach(service => {
      keywords.add(service)
      keywords.add(`${service} service`)
      keywords.add(`${service} company`)
      keywords.add(`professional ${service}`)
      keywords.add(`${service} near me`)
      keywords.add(`emergency ${service}`)
      keywords.add(`24/7 ${service}`)
    })

    // Generate location-based keywords
    const locations = targetLocations || analysis.locations
    locations.forEach(location => {
      analysis.services.forEach(service => {
        keywords.add(`${service} ${location}`)
        keywords.add(`${service} in ${location}`)
        keywords.add(`${location} ${service}`)
        keywords.add(`${service} near ${location}`)
      })
    })

    // Generate problem-based keywords
    const problemKeywords = this.generateProblemKeywords(analysis.services)
    problemKeywords.forEach(keyword => keywords.add(keyword))

    // Generate commercial keywords
    const commercialKeywords = this.generateCommercialKeywords(analysis.services)
    commercialKeywords.forEach(keyword => keywords.add(keyword))

    // Generate emergency keywords
    const emergencyKeywords = this.generateEmergencyKeywords(analysis.services)
    emergencyKeywords.forEach(keyword => keywords.add(keyword))

    const keywordArray = Array.from(keywords)
    this.log(`Generated ${keywordArray.length} unique keywords`)
    
    return keywordArray
  }

  /**
   * Categorize keywords by type
   */
  async categorizeKeywords(keywords: string[]): Promise<CategorizedKeywords> {
    this.log('Categorizing keywords...')

    const categorized: CategorizedKeywords = {
      emergency: [],
      service: [],
      problem: [],
      local: [],
      commercial: []
    }

    keywords.forEach(keyword => {
      const lowerKeyword = keyword.toLowerCase()

      // Emergency keywords
      if (this.isEmergencyKeyword(lowerKeyword)) {
        categorized.emergency.push(keyword)
      }
      // Local keywords
      else if (this.isLocalKeyword(lowerKeyword)) {
        categorized.local.push(keyword)
      }
      // Problem keywords
      else if (this.isProblemKeyword(lowerKeyword)) {
        categorized.problem.push(keyword)
      }
      // Commercial keywords
      else if (this.isCommercialKeyword(lowerKeyword)) {
        categorized.commercial.push(keyword)
      }
      // Service keywords (default)
      else {
        categorized.service.push(keyword)
      }
    })

    this.log(`Categorized keywords: ${categorized.emergency.length} emergency, ${categorized.local.length} local, ${categorized.problem.length} problem, ${categorized.commercial.length} commercial, ${categorized.service.length} service`)
    
    return categorized
  }

  /**
   * Prioritize keywords by commercial intent
   */
  async prioritizeByIntent(categorized: CategorizedKeywords): Promise<PrioritizedKeywords> {
    this.log('Prioritizing keywords by intent...')

    const allKeywords: Keyword[] = []

    // Process each category
    Object.entries(categorized).forEach(([category, keywords]) => {
      keywords.forEach(term => {
        const keyword: Keyword = {
          id: generateId('kw'),
          term,
          category: category as KeywordCategory,
          intent: this.determineSearchIntent(term),
          difficulty: this.estimateKeywordDifficulty(term),
          volume: this.estimateSearchVolume(term),
          commercialValue: this.calculateCommercialValue(term, category as KeywordCategory),
          priority: 0 // Will be calculated
        }

        // Calculate priority score (0-100)
        keyword.priority = this.calculatePriorityScore(keyword)
        allKeywords.push(keyword)
      })
    })

    // Sort by priority
    allKeywords.sort((a, b) => b.priority - a.priority)

    // Divide into priority tiers
    const totalKeywords = allKeywords.length
    const highPriorityCount = Math.ceil(totalKeywords * 0.3) // Top 30%
    const mediumPriorityCount = Math.ceil(totalKeywords * 0.5) // Next 50%

    const prioritized: PrioritizedKeywords = {
      highPriority: allKeywords.slice(0, highPriorityCount),
      mediumPriority: allKeywords.slice(highPriorityCount, highPriorityCount + mediumPriorityCount),
      lowPriority: allKeywords.slice(highPriorityCount + mediumPriorityCount)
    }

    this.log(`Prioritized keywords: ${prioritized.highPriority.length} high, ${prioritized.mediumPriority.length} medium, ${prioritized.lowPriority.length} low priority`)
    
    return prioritized
  }

  // Helper methods for keyword analysis

  private extractBusinessType(description: string): string {
    const businessTypes = [
      'repair service', 'maintenance', 'emergency service', 'consulting',
      'retail', 'restaurant', 'healthcare', 'automotive', 'construction',
      'technology', 'education', 'legal', 'financial'
    ]

    const lowerDesc = description.toLowerCase()
    for (const type of businessTypes) {
      if (lowerDesc.includes(type)) {
        return type
      }
    }

    return 'service business'
  }

  private extractServices(description: string): string[] {
    const services = new Set<string>()
    const lowerDesc = description.toLowerCase()

    // Common service patterns
    const servicePatterns = [
      /(\w+)\s+repair/g,
      /(\w+)\s+service/g,
      /(\w+)\s+maintenance/g,
      /(\w+)\s+installation/g,
      /(\w+)\s+replacement/g
    ]

    servicePatterns.forEach(pattern => {
      let match
      while ((match = pattern.exec(lowerDesc)) !== null) {
        services.add(match[1] + ' ' + match[0].split(' ')[1])
      }
    })

    // Add base services from description
    if (lowerDesc.includes('truck')) services.add('truck repair')
    if (lowerDesc.includes('diesel')) services.add('diesel repair')
    if (lowerDesc.includes('mobile')) services.add('mobile service')
    if (lowerDesc.includes('emergency')) services.add('emergency repair')

    return Array.from(services)
  }

  private extractLocations(description: string): string[] {
    // This would typically use a location extraction service
    // For now, extract common location indicators
    const locations: string[] = []
    const lowerDesc = description.toLowerCase()

    if (lowerDesc.includes('local')) locations.push('local area')
    if (lowerDesc.includes('city')) locations.push('city')
    if (lowerDesc.includes('charlotte')) locations.push('Charlotte')
    if (lowerDesc.includes('atlanta')) locations.push('Atlanta')

    return locations
  }

  private extractContentThemes(description: string): string[] {
    const themes = new Set<string>()
    const lowerDesc = description.toLowerCase()

    if (lowerDesc.includes('emergency')) themes.add('emergency services')
    if (lowerDesc.includes('24/7') || lowerDesc.includes('24 hour')) themes.add('24/7 availability')
    if (lowerDesc.includes('professional')) themes.add('professional service')
    if (lowerDesc.includes('experienced')) themes.add('experience')
    if (lowerDesc.includes('certified')) themes.add('certification')

    return Array.from(themes)
  }

  private extractTargetAudience(description: string): string[] {
    const audience = new Set<string>()
    const lowerDesc = description.toLowerCase()

    if (lowerDesc.includes('truck')) audience.add('truck drivers')
    if (lowerDesc.includes('fleet')) audience.add('fleet managers')
    if (lowerDesc.includes('business')) audience.add('business owners')
    if (lowerDesc.includes('commercial')) audience.add('commercial operators')

    return Array.from(audience)
  }

  private generateProblemKeywords(services: string[]): string[] {
    const problems: string[] = []
    
    services.forEach(service => {
      const baseService = service.replace(' service', '').replace(' repair', '')
      problems.push(`${baseService} not working`)
      problems.push(`${baseService} broken`)
      problems.push(`${baseService} problems`)
      problems.push(`${baseService} issues`)
      problems.push(`${baseService} troubleshooting`)
    })

    return problems
  }

  private generateCommercialKeywords(services: string[]): string[] {
    const commercial: string[] = []
    
    services.forEach(service => {
      commercial.push(`${service} cost`)
      commercial.push(`${service} price`)
      commercial.push(`${service} quote`)
      commercial.push(`${service} estimate`)
      commercial.push(`best ${service}`)
      commercial.push(`affordable ${service}`)
      commercial.push(`cheap ${service}`)
    })

    return commercial
  }

  private generateEmergencyKeywords(services: string[]): string[] {
    const emergency: string[] = []
    
    services.forEach(service => {
      emergency.push(`emergency ${service}`)
      emergency.push(`urgent ${service}`)
      emergency.push(`24/7 ${service}`)
      emergency.push(`immediate ${service}`)
      emergency.push(`same day ${service}`)
    })

    return emergency
  }

  private isEmergencyKeyword(keyword: string): boolean {
    const emergencyIndicators = ['emergency', 'urgent', '24/7', 'immediate', 'same day', 'asap']
    return emergencyIndicators.some(indicator => keyword.includes(indicator))
  }

  private isLocalKeyword(keyword: string): boolean {
    const localIndicators = ['near me', 'near', 'local', 'in ', 'charlotte', 'atlanta']
    return localIndicators.some(indicator => keyword.includes(indicator))
  }

  private isProblemKeyword(keyword: string): boolean {
    const problemIndicators = ['not working', 'broken', 'problems', 'issues', 'troubleshooting', 'fix']
    return problemIndicators.some(indicator => keyword.includes(indicator))
  }

  private isCommercialKeyword(keyword: string): boolean {
    const commercialIndicators = ['cost', 'price', 'quote', 'estimate', 'best', 'affordable', 'cheap', 'buy']
    return commercialIndicators.some(indicator => keyword.includes(indicator))
  }

  private determineSearchIntent(keyword: string): SearchIntent {
    const lowerKeyword = keyword.toLowerCase()

    if (this.isCommercialKeyword(lowerKeyword) || this.isEmergencyKeyword(lowerKeyword)) {
      return SearchIntent.TRANSACTIONAL
    }

    if (lowerKeyword.includes('how to') || lowerKeyword.includes('what is') || lowerKeyword.includes('why')) {
      return SearchIntent.INFORMATIONAL
    }

    if (lowerKeyword.includes('near me') || lowerKeyword.includes('location')) {
      return SearchIntent.NAVIGATIONAL
    }

    return SearchIntent.COMMERCIAL
  }

  private estimateKeywordDifficulty(keyword: string): number {
    // Simple difficulty estimation based on keyword characteristics
    let difficulty = 50 // Base difficulty

    // Longer keywords are generally easier
    const wordCount = keyword.split(' ').length
    if (wordCount >= 4) difficulty -= 20
    else if (wordCount >= 3) difficulty -= 10

    // Local keywords are generally easier
    if (this.isLocalKeyword(keyword)) difficulty -= 15

    // Emergency keywords can be competitive
    if (this.isEmergencyKeyword(keyword)) difficulty += 10

    // Commercial keywords are more competitive
    if (this.isCommercialKeyword(keyword)) difficulty += 15

    return Math.max(10, Math.min(90, difficulty))
  }

  private estimateSearchVolume(keyword: string): number {
    // Simple volume estimation
    let volume = 1000 // Base volume

    // Shorter keywords generally have higher volume
    const wordCount = keyword.split(' ').length
    if (wordCount <= 2) volume *= 3
    else if (wordCount === 3) volume *= 2

    // Local keywords have moderate volume
    if (this.isLocalKeyword(keyword)) volume *= 0.7

    // Emergency keywords have lower but high-intent volume
    if (this.isEmergencyKeyword(keyword)) volume *= 0.5

    // Commercial keywords have higher volume
    if (this.isCommercialKeyword(keyword)) volume *= 1.5

    return Math.round(volume)
  }

  private calculateCommercialValue(keyword: string, category: KeywordCategory): number {
    let value = 50 // Base value

    switch (category) {
      case KeywordCategory.EMERGENCY:
        value = 95 // Highest commercial value
        break
      case KeywordCategory.COMMERCIAL:
        value = 85
        break
      case KeywordCategory.LOCAL:
        value = 75
        break
      case KeywordCategory.PROBLEM:
        value = 70
        break
      case KeywordCategory.SERVICE:
        value = 60
        break
    }

    return value
  }

  private calculatePriorityScore(keyword: Keyword): number {
    // Priority score based on multiple factors (0-100)
    let score = 0

    // Commercial value (40% weight)
    score += keyword.commercialValue * 0.4

    // Search intent (30% weight)
    const intentScore = keyword.intent === SearchIntent.TRANSACTIONAL ? 100 :
                       keyword.intent === SearchIntent.COMMERCIAL ? 80 :
                       keyword.intent === SearchIntent.NAVIGATIONAL ? 60 : 40
    score += intentScore * 0.3

    // Difficulty (20% weight - lower difficulty = higher score)
    score += (100 - keyword.difficulty) * 0.2

    // Volume (10% weight)
    const volumeScore = Math.min(100, keyword.volume / 100)
    score += volumeScore * 0.1

    return Math.round(score)
  }
}