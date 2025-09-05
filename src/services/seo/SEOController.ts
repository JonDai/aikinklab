import { 
  SEOOptimizationConfig, 
  SEOOptimizationResult, 
  SEOAgent, 
  SEOTask, 
  AgentResult,
  TaskType,
  AgentStatus,
  SEOError
} from './types'

/**
 * Main SEO Controller that orchestrates the entire SEO optimization workflow
 * Manages multiple AI agents and coordinates their execution
 */
export class SEOController {
  private agents: Map<string, SEOAgent> = new Map()
  private taskQueue: SEOTask[] = []
  private isRunning: boolean = false

  constructor() {
    this.initializeAgents()
  }

  /**
   * Main entry point for SEO optimization
   * Orchestrates the complete workflow from keyword research to performance optimization
   */
  async optimizeWebsite(config: SEOOptimizationConfig): Promise<SEOOptimizationResult> {
    const startTime = Date.now()
    const result: SEOOptimizationResult = {
      success: false,
      keywordsGenerated: 0,
      pagesCreated: 0,
      technicalIssuesFixed: 0,
      performanceImprovements: [],
      errors: [],
      completedAt: new Date()
    }

    try {
      this.isRunning = true
      
      // Phase 1: Keyword Research
      console.log('Starting keyword research phase...')
      const keywordTask = this.createTask(TaskType.KEYWORD_RESEARCH, config, 1)
      const keywordResult = await this.executeTask(keywordTask)
      
      if (keywordResult.success) {
        result.keywordsGenerated = keywordResult.data?.keywords?.length || 0
      } else {
        result.errors.push({
          type: 'keyword_research',
          message: keywordResult.error || 'Keyword research failed',
          timestamp: new Date()
        })
      }

      // Phase 2: Content Generation (if keywords were found)
      if (result.keywordsGenerated > 0) {
        console.log('Starting content generation phase...')
        const contentTask = this.createTask(TaskType.CONTENT_GENERATION, {
          keywords: keywordResult.data?.keywords,
          config
        }, 1)
        const contentResult = await this.executeTask(contentTask)
        
        if (contentResult.success) {
          result.pagesCreated = contentResult.data?.pagesCreated || 0
        } else {
          result.errors.push({
            type: 'content_generation',
            message: contentResult.error || 'Content generation failed',
            timestamp: new Date()
          })
        }
      }

      // Phase 3: Technical SEO Audit and Fixes
      console.log('Starting technical SEO phase...')
      const technicalTask = this.createTask(TaskType.TECHNICAL_AUDIT, config, 1)
      const technicalResult = await this.executeTask(technicalTask)
      
      if (technicalResult.success) {
        result.technicalIssuesFixed = technicalResult.data?.issuesFixed || 0
      } else {
        result.errors.push({
          type: 'technical_seo',
          message: technicalResult.error || 'Technical SEO audit failed',
          timestamp: new Date()
        })
      }

      // Phase 4: Performance Optimization
      console.log('Starting performance optimization phase...')
      const performanceTask = this.createTask(TaskType.PERFORMANCE_OPTIMIZATION, config, 1)
      const performanceResult = await this.executeTask(performanceTask)
      
      if (performanceResult.success) {
        result.performanceImprovements = performanceResult.data?.improvements || []
      } else {
        result.errors.push({
          type: 'performance',
          message: performanceResult.error || 'Performance optimization failed',
          timestamp: new Date()
        })
      }

      result.success = result.errors.length === 0
      
    } catch (error) {
      result.errors.push({
        type: 'technical_seo',
        message: `SEO optimization failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date()
      })
    } finally {
      this.isRunning = false
      result.completedAt = new Date()
    }

    const executionTime = Date.now() - startTime
    console.log(`SEO optimization completed in ${executionTime}ms`)
    
    return result
  }

  /**
   * Execute multiple agents in parallel for complex tasks
   */
  async executeAgents(agents: SEOAgent[], tasks: SEOTask[]): Promise<AgentResult[]> {
    if (agents.length !== tasks.length) {
      throw new Error('Number of agents must match number of tasks')
    }

    const promises = agents.map((agent, index) => {
      const task = tasks[index]
      return this.executeAgentWithRetry(agent, task)
    })

    return Promise.all(promises)
  }

  /**
   * Start continuous optimization monitoring
   */
  async startContinuousOptimization(): Promise<void> {
    console.log('Starting continuous optimization monitoring...')
    
    // This would typically run in the background
    // For now, we'll just set up the monitoring task
    const monitoringTask = this.createTask(TaskType.MONITORING, {}, 0)
    this.taskQueue.push(monitoringTask)
    
    // In a real implementation, this would start a background process
    console.log('Continuous optimization monitoring started')
  }

  /**
   * Get the status of all agents
   */
  getAgentStatuses(): Record<string, AgentStatus> {
    const statuses: Record<string, AgentStatus> = {}
    this.agents.forEach((agent, id) => {
      statuses[id] = agent.status
    })
    return statuses
  }

  /**
   * Get current task queue status
   */
  getTaskQueueStatus(): { pending: number; total: number } {
    return {
      pending: this.taskQueue.length,
      total: this.taskQueue.length
    }
  }

  private initializeAgents(): void {
    // Import and register agents
    this.registerKeywordResearchAgent()
    console.log('SEO Controller initialized with available agents')
  }

  private registerKeywordResearchAgent(): void {
    try {
      // Dynamic import to avoid circular dependencies
      import('./agents/KeywordResearchAgent').then(({ KeywordResearchAgent }) => {
        const agent = new KeywordResearchAgent()
        this.registerAgent(agent)
      }).catch(error => {
        console.warn('Failed to register KeywordResearchAgent:', error.message)
      })
    } catch (error) {
      console.warn('KeywordResearchAgent not available yet')
    }
  }

  private createTask(type: TaskType, data: any, priority: number): SEOTask {
    return {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      priority,
      data,
      createdAt: new Date()
    }
  }

  private async executeTask(task: SEOTask): Promise<AgentResult> {
    const agent = this.getAgentForTask(task.type)
    
    if (!agent) {
      return {
        success: false,
        error: `No agent available for task type: ${task.type}`,
        executionTime: 0,
        timestamp: new Date()
      }
    }

    return this.executeAgentWithRetry(agent, task)
  }

  private async executeAgentWithRetry(agent: SEOAgent, task: SEOTask, maxRetries: number = 3): Promise<AgentResult> {
    let lastError: string = ''
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const startTime = Date.now()
        const result = await agent.execute(task)
        result.executionTime = Date.now() - startTime
        
        if (result.success) {
          return result
        }
        
        lastError = result.error || 'Unknown error'
        console.warn(`Agent ${agent.name} failed attempt ${attempt}/${maxRetries}: ${lastError}`)
        
        // Wait before retry (exponential backoff)
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
        }
        
      } catch (error) {
        lastError = error instanceof Error ? error.message : 'Unknown error'
        console.error(`Agent ${agent.name} threw error on attempt ${attempt}/${maxRetries}:`, error)
        
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
        }
      }
    }

    return {
      success: false,
      error: `Agent failed after ${maxRetries} attempts: ${lastError}`,
      executionTime: 0,
      timestamp: new Date()
    }
  }

  private getAgentForTask(taskType: TaskType): SEOAgent | undefined {
    // This will be implemented as agents are added
    switch (taskType) {
      case TaskType.KEYWORD_RESEARCH:
        return this.agents.get('keyword_research')
      case TaskType.CONTENT_GENERATION:
        return this.agents.get('content_generation')
      case TaskType.TECHNICAL_AUDIT:
        return this.agents.get('technical_seo')
      case TaskType.PERFORMANCE_OPTIMIZATION:
        return this.agents.get('performance_optimization')
      case TaskType.MONITORING:
        return this.agents.get('monitoring')
      default:
        return undefined
    }
  }

  /**
   * Register a new agent with the controller
   */
  registerAgent(agent: SEOAgent): void {
    this.agents.set(agent.id, agent)
    console.log(`Registered SEO agent: ${agent.name} (${agent.id})`)
  }

  /**
   * Unregister an agent
   */
  unregisterAgent(agentId: string): void {
    if (this.agents.delete(agentId)) {
      console.log(`Unregistered SEO agent: ${agentId}`)
    }
  }
}