# AI-Driven SEO Optimization System

This directory contains the core infrastructure for the AI-driven SEO optimization system. The system follows an agent-based architecture where specialized AI agents handle different aspects of SEO optimization.

## Architecture Overview

```
src/services/seo/
├── SEOController.ts          # Main orchestration controller
├── agents/
│   └── BaseAgent.ts         # Base class for all agents
├── types/
│   └── index.ts            # TypeScript interfaces and types
├── utils/
│   └── index.ts            # Utility functions
├── config.ts               # Configuration management
├── index.ts                # Main entry point
└── __tests__/              # Test files
```

## Core Components

### SEOController
The main orchestration class that manages the entire SEO optimization workflow. It coordinates multiple AI agents and handles task distribution, error recovery, and result aggregation.

**Key Features:**
- Orchestrates complete SEO optimization workflow
- Manages multiple AI agents in parallel
- Provides error handling and retry mechanisms
- Supports continuous optimization monitoring

### BaseAgent
Abstract base class that provides common functionality for all SEO agents. Each specialized agent extends this class to implement specific SEO capabilities.

**Key Features:**
- Standardized agent interface
- Built-in error handling and logging
- Retry mechanisms with exponential backoff
- Status management

### Types System
Comprehensive TypeScript interfaces that define the data structures and contracts for the entire SEO system.

**Key Types:**
- `SEOOptimizationConfig` - Configuration for optimization runs
- `SEOAgent` - Interface for all agents
- `Keyword` - Keyword data structure
- `LandingPageContent` - Generated content structure
- `TechnicalSEOAudit` - Technical audit results

### Utilities
Helper functions for common SEO operations like keyword density calculation, content scoring, and text processing.

## Usage

### Basic Usage

```typescript
import { seoController, SEOOptimizationConfig } from '@/services/seo'

const config: SEOOptimizationConfig = {
  websiteUrl: 'https://example.com',
  businessDescription: 'Emergency truck repair service',
  targetLocations: ['Charlotte', 'Atlanta'],
  optimizationLevel: 'comprehensive'
}

const result = await seoController.optimizeWebsite(config)
console.log(`Generated ${result.keywordsGenerated} keywords`)
console.log(`Created ${result.pagesCreated} landing pages`)
```

### Agent Registration

```typescript
import { seoController } from '@/services/seo'
import { MyCustomAgent } from './MyCustomAgent'

const customAgent = new MyCustomAgent('custom_agent', 'Custom SEO Agent')
seoController.registerAgent(customAgent)
```

## Configuration

The system uses a centralized configuration system that can be customized for different environments:

```typescript
import { getSEOConfig, validateSEOConfig } from '@/services/seo'

const config = getSEOConfig()
const validation = validateSEOConfig(config)

if (!validation.valid) {
  console.error('Configuration errors:', validation.errors)
}
```

## Environment Variables

The following environment variables can be used to configure the system:

- `OPENAI_API_KEY` - OpenAI API key for content generation
- `GOOGLE_API_KEY` - Google API key for PageSpeed Insights
- `NODE_ENV` - Environment (development/production)

## Testing

Run tests with:

```bash
npm test src/services/seo
```

The test suite includes:
- Unit tests for all core components
- Integration tests for agent coordination
- Utility function tests
- Configuration validation tests

## Development

### Adding New Agents

1. Create a new agent class extending `BaseAgent`
2. Implement the required `execute()` and `getCapabilities()` methods
3. Register the agent with the SEO controller
4. Add appropriate tests

Example:

```typescript
import { BaseAgent } from './BaseAgent'
import { SEOTask, AgentResult } from '../types'

export class MyAgent extends BaseAgent {
  constructor() {
    super('my_agent', 'My Custom Agent')
  }

  async execute(task: SEOTask): Promise<AgentResult> {
    this.setStatus(AgentStatus.RUNNING)
    
    try {
      // Implement agent logic here
      const result = await this.performTask(task)
      
      this.setStatus(AgentStatus.COMPLETED)
      return this.createSuccessResult(result)
    } catch (error) {
      this.setStatus(AgentStatus.ERROR)
      return this.createErrorResult(error.message)
    }
  }

  getCapabilities(): string[] {
    return ['custom_capability']
  }
}
```

## Implemented Agents

### KeywordResearchAgent ✅

The KeywordResearchAgent analyzes websites and generates strategic keyword recommendations with commercial intent prioritization.

**Features:**
- Website content analysis and business context extraction
- Keyword generation with categorization (emergency, service, problem, local, commercial)
- Commercial intent analysis and priority scoring
- Support for target locations and focus keywords
- Comprehensive keyword metrics (difficulty, volume, commercial value)

**Usage:**
```typescript
import { KeywordResearchAgent } from '@/services/seo'

const agent = new KeywordResearchAgent()
const task = {
  id: 'kw_task',
  type: TaskType.KEYWORD_RESEARCH,
  priority: 1,
  data: {
    websiteUrl: 'https://example.com',
    businessDescription: 'Emergency truck repair service',
    targetLocations: ['Charlotte', 'Atlanta'],
    focusKeywords: ['truck repair', 'emergency service']
  },
  createdAt: new Date()
}

const result = await agent.execute(task)
```

## Next Steps

The following agents are planned for implementation:

2. **ContentGenerationAgent** - Creates optimized landing pages with local context
3. **TechnicalSEOAgent** - Performs technical audits and implements fixes
4. **PerformanceOptimizationAgent** - Optimizes website performance and Core Web Vitals
5. **MonitoringAgent** - Tracks performance and provides continuous optimization

Each agent will be implemented as a separate task in the implementation plan.