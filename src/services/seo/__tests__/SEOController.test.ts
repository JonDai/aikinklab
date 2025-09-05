/**
 * Tests for SEO Controller
 */

import { SEOController } from '../SEOController'
import { SEOOptimizationConfig, TaskType, AgentStatus } from '../types'

describe('SEOController', () => {
  let controller: SEOController

  beforeEach(() => {
    controller = new SEOController()
  })

  describe('initialization', () => {
    test('should initialize with empty agents map', () => {
      const statuses = controller.getAgentStatuses()
      expect(Object.keys(statuses)).toHaveLength(0)
    })

    test('should have empty task queue initially', () => {
      const queueStatus = controller.getTaskQueueStatus()
      expect(queueStatus.pending).toBe(0)
      expect(queueStatus.total).toBe(0)
    })
  })

  describe('optimizeWebsite', () => {
    test('should handle basic optimization config', async () => {
      const config: SEOOptimizationConfig = {
        websiteUrl: 'https://example.com',
        businessDescription: 'Test business',
        optimizationLevel: 'basic'
      }

      const result = await controller.optimizeWebsite(config)

      expect(result).toBeDefined()
      expect(result.success).toBeDefined()
      expect(result.completedAt).toBeInstanceOf(Date)
      expect(Array.isArray(result.errors)).toBe(true)
      expect(Array.isArray(result.performanceImprovements)).toBe(true)
    })

    test('should handle comprehensive optimization config', async () => {
      const config: SEOOptimizationConfig = {
        websiteUrl: 'https://example.com',
        businessDescription: 'Emergency truck repair service',
        targetLocations: ['Charlotte', 'Atlanta'],
        focusKeywords: ['truck repair', 'emergency service'],
        optimizationLevel: 'comprehensive'
      }

      const result = await controller.optimizeWebsite(config)

      expect(result).toBeDefined()
      expect(result.keywordsGenerated).toBeGreaterThanOrEqual(0)
      expect(result.pagesCreated).toBeGreaterThanOrEqual(0)
      expect(result.technicalIssuesFixed).toBeGreaterThanOrEqual(0)
    })
  })

  describe('agent management', () => {
    test('should register and unregister agents', () => {
      const mockAgent = {
        id: 'test_agent',
        name: 'Test Agent',
        status: AgentStatus.IDLE,
        execute: jest.fn(),
        getCapabilities: jest.fn(() => ['test'])
      }

      controller.registerAgent(mockAgent)
      let statuses = controller.getAgentStatuses()
      expect(statuses['test_agent']).toBe(AgentStatus.IDLE)

      controller.unregisterAgent('test_agent')
      statuses = controller.getAgentStatuses()
      expect(statuses['test_agent']).toBeUndefined()
    })
  })

  describe('continuous optimization', () => {
    test('should start continuous optimization', async () => {
      await expect(controller.startContinuousOptimization()).resolves.not.toThrow()
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