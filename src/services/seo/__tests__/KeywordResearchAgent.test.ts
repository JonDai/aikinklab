/**
 * Tests for Keyword Research Agent
 */

import { KeywordResearchAgent } from '../agents/KeywordResearchAgent'
import { SEOTask, TaskType, KeywordCategory, SearchIntent } from '../types'

describe('KeywordResearchAgent', () => {
  let agent: KeywordResearchAgent

  beforeEach(() => {
    agent = new KeywordResearchAgent()
  })

  describe('initialization', () => {
    test('should initialize with correct id and name', () => {
      expect(agent.id).toBe('keyword_research')
      expect(agent.name).toBe('Keyword Research Agent')
    })

    test('should return correct capabilities', () => {
      const capabilities = agent.getCapabilities()
      expect(capabilities).toContain('website_analysis')
      expect(capabilities).toContain('keyword_generation')
      expect(capabilities).toContain('keyword_categorization')
      expect(capabilities).toContain('intent_analysis')
    })
  })

  describe('execute', () => {
    test('should handle valid keyword research task', async () => {
      const task: SEOTask = {
        id: 'test_task',
        type: TaskType.KEYWORD_RESEARCH,
        priority: 1,
        data: {
          websiteUrl: 'https://example.com',
          businessDescription: 'Emergency truck repair service in Charlotte',
          targetLocations: ['Charlotte', 'Atlanta'],
          focusKeywords: ['truck repair', 'emergency service']
        },
        createdAt: new Date()
      }

      const result = await agent.execute(task)

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.data.keywords).toBeDefined()
      expect(result.data.categorized).toBeDefined()
      expect(result.data.prioritized).toBeDefined()
      expect(result.data.totalKeywords).toBeGreaterThan(0)
    })

    test('should reject invalid task type', async () => {
      const task: SEOTask = {
        id: 'test_task',
        type: TaskType.CONTENT_GENERATION,
        priority: 1,
        data: {},
        createdAt: new Date()
      }

      const result = await agent.execute(task)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Invalid task type')
    })

    test('should reject task with missing required fields', async () => {
      const task: SEOTask = {
        id: 'test_task',
        type: TaskType.KEYWORD_RESEARCH,
        priority: 1,
        data: {
          websiteUrl: 'https://example.com'
          // Missing businessDescription
        },
        createdAt: new Date()
      }

      const result = await agent.execute(task)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Missing required fields')
    })
  })

  describe('analyzeWebsite', () => {
    test('should analyze website and extract business context', async () => {
      const analysis = await agent.analyzeWebsite(
        'https://example.com',
        'Emergency truck repair service providing 24/7 mobile diesel maintenance in Charlotte'
      )

      expect(analysis.url).toBe('https://example.com')
      expect(analysis.businessType).toBeDefined()
      expect(analysis.services.length).toBeGreaterThan(0)
      expect(analysis.contentThemes.length).toBeGreaterThan(0)
    })

    test('should extract services from business description', async () => {
      const analysis = await agent.analyzeWebsite(
        'https://example.com',
        'We provide truck repair, diesel maintenance, and emergency roadside service'
      )

      expect(analysis.services).toContain('truck repair')
      expect(analysis.services).toContain('diesel maintenance')
    })
  })

  describe('generateKeywords', () => {
    test('should generate keywords from website analysis', async () => {
      const analysis = {
        url: 'https://example.com',
        businessType: 'repair service',
        services: ['truck repair', 'diesel service'],
        locations: ['Charlotte'],
        competitors: [],
        contentThemes: ['emergency services'],
        targetAudience: ['truck drivers']
      }

      const keywords = await agent.generateKeywords(analysis, ['Charlotte'], ['truck repair'])

      expect(keywords.length).toBeGreaterThan(0)
      expect(keywords).toContain('truck repair')
      expect(keywords.some(k => k.includes('Charlotte'))).toBe(true)
    })

    test('should include focus keywords when provided', async () => {
      const analysis = {
        url: 'https://example.com',
        businessType: 'repair service',
        services: ['repair'],
        locations: [],
        competitors: [],
        contentThemes: [],
        targetAudience: []
      }

      const focusKeywords = ['custom keyword', 'special service']
      const keywords = await agent.generateKeywords(analysis, [], focusKeywords)

      expect(keywords).toContain('custom keyword')
      expect(keywords).toContain('special service')
    })
  })

  describe('categorizeKeywords', () => {
    test('should categorize keywords correctly', async () => {
      const keywords = [
        'emergency truck repair',
        'truck repair Charlotte',
        'truck not working',
        'truck repair cost',
        'mobile truck service'
      ]

      const categorized = await agent.categorizeKeywords(keywords)

      expect(categorized.emergency).toContain('emergency truck repair')
      expect(categorized.local).toContain('truck repair Charlotte')
      expect(categorized.problem).toContain('truck not working')
      expect(categorized.commercial).toContain('truck repair cost')
      expect(categorized.service).toContain('mobile truck service')
    })

    test('should handle empty keyword list', async () => {
      const categorized = await agent.categorizeKeywords([])

      expect(categorized.emergency).toHaveLength(0)
      expect(categorized.local).toHaveLength(0)
      expect(categorized.problem).toHaveLength(0)
      expect(categorized.commercial).toHaveLength(0)
      expect(categorized.service).toHaveLength(0)
    })
  })

  describe('prioritizeByIntent', () => {
    test('should prioritize keywords by commercial intent', async () => {
      const categorized = {
        emergency: ['emergency repair'],
        service: ['truck service'],
        problem: ['truck broken'],
        local: ['repair near me'],
        commercial: ['repair cost']
      }

      const prioritized = await agent.prioritizeByIntent(categorized)

      expect(prioritized.highPriority.length).toBeGreaterThan(0)
      expect(prioritized.mediumPriority.length).toBeGreaterThan(0)
      expect(prioritized.lowPriority.length).toBeGreaterThanOrEqual(0)

      // Emergency keywords should have high priority
      const emergencyKeyword = prioritized.highPriority.find(k => k.category === KeywordCategory.EMERGENCY)
      expect(emergencyKeyword).toBeDefined()
      if (emergencyKeyword) {
        expect(emergencyKeyword.commercialValue).toBeGreaterThan(90)
      }
    })

    test('should assign correct search intent', async () => {
      const categorized = {
        emergency: ['emergency repair'],
        service: [],
        problem: [],
        local: [],
        commercial: ['repair cost']
      }

      const prioritized = await agent.prioritizeByIntent(categorized)
      const allKeywords = [
        ...prioritized.highPriority,
        ...prioritized.mediumPriority,
        ...prioritized.lowPriority
      ]

      const emergencyKeyword = allKeywords.find(k => k.term === 'emergency repair')
      const commercialKeyword = allKeywords.find(k => k.term === 'repair cost')

      expect(emergencyKeyword?.intent).toBe(SearchIntent.TRANSACTIONAL)
      expect(commercialKeyword?.intent).toBe(SearchIntent.TRANSACTIONAL)
    })
  })

  describe('keyword analysis helpers', () => {
    test('should identify emergency keywords', () => {
      const agent = new KeywordResearchAgent()
      
      // Access private method for testing (TypeScript hack)
      const isEmergencyKeyword = (agent as any).isEmergencyKeyword.bind(agent)
      
      expect(isEmergencyKeyword('emergency repair')).toBe(true)
      expect(isEmergencyKeyword('urgent service')).toBe(true)
      expect(isEmergencyKeyword('24/7 support')).toBe(true)
      expect(isEmergencyKeyword('regular service')).toBe(false)
    })

    test('should identify local keywords', () => {
      const agent = new KeywordResearchAgent()
      const isLocalKeyword = (agent as any).isLocalKeyword.bind(agent)
      
      expect(isLocalKeyword('repair near me')).toBe(true)
      expect(isLocalKeyword('service in charlotte')).toBe(true)
      expect(isLocalKeyword('local repair')).toBe(true)
      expect(isLocalKeyword('online service')).toBe(false)
    })

    test('should identify commercial keywords', () => {
      const agent = new KeywordResearchAgent()
      const isCommercialKeyword = (agent as any).isCommercialKeyword.bind(agent)
      
      expect(isCommercialKeyword('repair cost')).toBe(true)
      expect(isCommercialKeyword('service price')).toBe(true)
      expect(isCommercialKeyword('best repair')).toBe(true)
      expect(isCommercialKeyword('repair guide')).toBe(false)
    })
  })
})

// Mock console methods to avoid noise in tests
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {})
  jest.spyOn(console, 'warn').mockImplementation(() => {})
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  jest.restoreAllMocks()
})