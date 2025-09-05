import { SEOAgent, SEOTask, AgentResult, AgentStatus } from '../types'

/**
 * Base class for all SEO agents
 * Provides common functionality and structure for specialized agents
 */
export abstract class BaseAgent implements SEOAgent {
  public readonly id: string
  public readonly name: string
  public status: AgentStatus = AgentStatus.IDLE

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }

  /**
   * Execute a task - must be implemented by each agent
   */
  abstract execute(task: SEOTask): Promise<AgentResult>

  /**
   * Get the capabilities of this agent - must be implemented by each agent
   */
  abstract getCapabilities(): string[]

  /**
   * Set agent status
   */
  protected setStatus(status: AgentStatus): void {
    this.status = status
    console.log(`Agent ${this.name} status changed to: ${status}`)
  }

  /**
   * Create a successful result
   */
  protected createSuccessResult(data?: any): AgentResult {
    return {
      success: true,
      data,
      executionTime: 0, // Will be set by controller
      timestamp: new Date()
    }
  }

  /**
   * Create an error result
   */
  protected createErrorResult(error: string): AgentResult {
    return {
      success: false,
      error,
      executionTime: 0, // Will be set by controller
      timestamp: new Date()
    }
  }

  /**
   * Validate task data before execution
   */
  protected validateTaskData(task: SEOTask, requiredFields: string[]): boolean {
    if (!task.data) {
      return false
    }

    return requiredFields.every(field => {
      const hasField = task.data.hasOwnProperty(field)
      if (!hasField) {
        console.warn(`Agent ${this.name}: Missing required field '${field}' in task data`)
      }
      return hasField
    })
  }

  /**
   * Log agent activity
   */
  protected log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
    const timestamp = new Date().toISOString()
    const logMessage = `[${timestamp}] ${this.name}: ${message}`
    
    switch (level) {
      case 'warn':
        console.warn(logMessage)
        break
      case 'error':
        console.error(logMessage)
        break
      default:
        console.log(logMessage)
    }
  }

  /**
   * Sleep for a specified number of milliseconds
   */
  protected async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Retry an operation with exponential backoff
   */
  protected async retryWithBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: Error

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation()
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))
        
        if (attempt === maxRetries) {
          throw lastError
        }

        const delay = baseDelay * Math.pow(2, attempt - 1)
        this.log(`Attempt ${attempt} failed, retrying in ${delay}ms: ${lastError.message}`, 'warn')
        await this.sleep(delay)
      }
    }

    throw lastError!
  }
}