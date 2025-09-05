/**
 * Demo script for Keyword Research Agent
 * This demonstrates how to use the KeywordResearchAgent
 */

import { KeywordResearchAgent } from '../agents/KeywordResearchAgent'
import { SEOTask, TaskType } from '../types'

async function runKeywordResearchDemo() {
  console.log('🔍 Keyword Research Agent Demo')
  console.log('================================\n')

  const agent = new KeywordResearchAgent()
  
  // Create a sample task
  const task: SEOTask = {
    id: 'demo_task',
    type: TaskType.KEYWORD_RESEARCH,
    priority: 1,
    data: {
      websiteUrl: 'https://aikinklab.com',
      businessDescription: 'AI-powered relationship and personality testing platform providing kink compatibility tests and relationship insights',
      targetLocations: ['United States', 'Canada', 'United Kingdom'],
      focusKeywords: ['kink test', 'relationship compatibility', 'personality test']
    },
    createdAt: new Date()
  }

  try {
    console.log('📊 Starting keyword research analysis...')
    const result = await agent.execute(task)

    if (result.success) {
      console.log('✅ Keyword research completed successfully!\n')
      
      const data = result.data
      console.log(`📈 Results Summary:`)
      console.log(`   Total keywords generated: ${data.totalKeywords}`)
      console.log(`   High priority keywords: ${data.prioritized.highPriority.length}`)
      console.log(`   Medium priority keywords: ${data.prioritized.mediumPriority.length}`)
      console.log(`   Low priority keywords: ${data.prioritized.lowPriority.length}\n`)

      console.log('🏷️  Keyword Categories:')
      console.log(`   Emergency: ${data.categorized.emergency.length}`)
      console.log(`   Service: ${data.categorized.service.length}`)
      console.log(`   Problem: ${data.categorized.problem.length}`)
      console.log(`   Local: ${data.categorized.local.length}`)
      console.log(`   Commercial: ${data.categorized.commercial.length}\n`)

      console.log('🎯 Top 10 High Priority Keywords:')
      data.prioritized.highPriority.slice(0, 10).forEach((keyword: any, index: number) => {
        console.log(`   ${index + 1}. "${keyword.term}" (Priority: ${keyword.priority}, Commercial Value: ${keyword.commercialValue})`)
      })

      console.log('\n🌍 Sample Local Keywords:')
      data.categorized.local.slice(0, 5).forEach((keyword, index) => {
        console.log(`   ${index + 1}. "${keyword}"`)
      })

      console.log('\n💰 Sample Commercial Keywords:')
      data.categorized.commercial.slice(0, 5).forEach((keyword, index) => {
        console.log(`   ${index + 1}. "${keyword}"`)
      })

    } else {
      console.error('❌ Keyword research failed:', result.error)
    }

  } catch (error) {
    console.error('💥 Demo failed:', error)
  }
}

// Export for use in other scripts
export { runKeywordResearchDemo }

// Run demo if this file is executed directly
if (require.main === module) {
  runKeywordResearchDemo()
    .then(() => console.log('\n🎉 Demo completed!'))
    .catch(error => console.error('Demo error:', error))
}