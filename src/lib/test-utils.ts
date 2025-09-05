/**
 * Utility functions for the AI Kink Test functionality
 */

export interface TestQuestion {
  id: number
  question: string
  options: {
    id: string
    text: string
    value: string
  }[]
}

export interface TestAnswers {
  [questionId: number]: string
}

export interface TestResult {
  personality: string
  dominance: number
  submission: number
  adventurousness: number
  empathy: number
  trustLevel: number
  description: string
  recommendations: string[]
}

/**
 * Calculate test results based on user answers
 */
export function calculateTestResults(answers: TestAnswers): TestResult {
  if (!answers || Object.keys(answers).length === 0) {
    throw new Error('No answers provided')
  }

  // Initialize scores
  let dominanceScore = 0
  let submissionScore = 0
  let adventurousnessScore = 0
  let empathyScore = 0
  let trustScore = 0

  // Analyze answers and calculate scores
  Object.entries(answers).forEach(([questionId, answerId]) => {
    const qId = parseInt(questionId)
    
    switch (qId) {
      case 1: // Relationship inclination
        if (answerId === 'a') dominanceScore += 3
        else if (answerId === 'b') submissionScore += 3
        else if (answerId === 'c') { dominanceScore += 1; submissionScore += 1 }
        break
        
      case 2: // New experiences
        if (answerId === 'a') adventurousnessScore += 3
        else if (answerId === 'b') adventurousnessScore += 1
        else if (answerId === 'c') submissionScore += 2
        break
        
      case 3: // Boundaries
        if (answerId === 'a') dominanceScore += 2
        else if (answerId === 'b') empathyScore += 3
        else if (answerId === 'c') empathyScore += 2
        break
        
      case 4: // Power exchange
        if (answerId === 'a') trustScore += 3
        else if (answerId === 'b') adventurousnessScore += 2
        else if (answerId === 'c') empathyScore += 1
        break
        
      case 5: // Intimate interactions
        if (answerId === 'a') empathyScore += 2
        else if (answerId === 'b') adventurousnessScore += 3
        else if (answerId === 'c') dominanceScore += 2
        break
    }
  })

  // Determine primary personality type
  const scores = {
    dominance: dominanceScore,
    submission: submissionScore,
    adventurousness: adventurousnessScore,
    empathy: empathyScore,
    trust: trustScore
  }

  const maxScore = Math.max(...Object.values(scores))
  const personalityType = Object.entries(scores)
    .find(([_, score]) => score === maxScore)?.[0] || 'balanced'

  // Generate personality description and recommendations
  const { description, recommendations } = generatePersonalityProfile(
    personalityType,
    scores
  )

  return {
    personality: personalityType,
    dominance: Math.round((dominanceScore / 15) * 100),
    submission: Math.round((submissionScore / 15) * 100),
    adventurousness: Math.round((adventurousnessScore / 15) * 100),
    empathy: Math.round((empathyScore / 15) * 100),
    trustLevel: Math.round((trustScore / 15) * 100),
    description,
    recommendations
  }
}

/**
 * Generate personality profile based on scores
 */
function generatePersonalityProfile(
  personalityType: string, 
  scores: Record<string, number>
): { description: string; recommendations: string[] } {
  const profiles = {
    dominance: {
      description: 'You tend to take a leading role in relationships and enjoy guiding experiences. You value control and making decisions for mutual benefit.',
      recommendations: [
        'Practice active communication about boundaries',
        'Explore leadership roles in intimate settings',
        'Consider power exchange dynamics',
        'Focus on consent and safety protocols'
      ]
    },
    submission: {
      description: 'You find fulfillment in following your partner\'s lead and enjoy being guided through experiences. You value trust and surrender.',
      recommendations: [
        'Establish clear safe words and boundaries',
        'Explore submission in controlled environments',
        'Build trust gradually with partners',
        'Learn about aftercare practices'
      ]
    },
    adventurousness: {
      description: 'You are open to new experiences and enjoy exploring different aspects of intimacy. You value variety and excitement.',
      recommendations: [
        'Research new experiences thoroughly',
        'Start with lighter exploration',
        'Communicate openly about interests',
        'Prioritize safety in all activities'
      ]
    },
    empathy: {
      description: 'You highly value emotional connection and your partner\'s wellbeing. You prioritize mutual respect and understanding.',
      recommendations: [
        'Focus on emotional intimacy building',
        'Practice active listening with partners',
        'Explore sensual rather than intense activities',
        'Emphasize aftercare and check-ins'
      ]
    },
    trust: {
      description: 'You understand that intimate exploration requires deep trust and safety. You value building strong foundations.',
      recommendations: [
        'Take time to build relationships slowly',
        'Focus on communication skills',
        'Learn about consent and negotiation',
        'Explore trust-building exercises'
      ]
    },
    balanced: {
      description: 'You show balanced tendencies across different aspects of intimacy. You adapt well to different situations and partners.',
      recommendations: [
        'Explore different roles and dynamics',
        'Communicate your flexibility to partners',
        'Try various types of experiences',
        'Focus on what feels authentic to you'
      ]
    }
  }

  return profiles[personalityType as keyof typeof profiles] || profiles.balanced
}

/**
 * Validate test answers
 */
export function validateAnswers(answers: TestAnswers, requiredQuestions: number[]): boolean {
  if (!answers || typeof answers !== 'object') {
    return false
  }

  return requiredQuestions.every(questionId => 
    answers.hasOwnProperty(questionId) && 
    typeof answers[questionId] === 'string' &&
    answers[questionId].trim().length > 0
  )
}

/**
 * Generate result ID for sharing/storage
 */
export function generateResultId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

/**
 * Calculate test progress percentage
 */
export function calculateProgress(currentQuestion: number, totalQuestions: number): number {
  if (totalQuestions <= 0) return 0
  return Math.round(((currentQuestion + 1) / totalQuestions) * 100)
}