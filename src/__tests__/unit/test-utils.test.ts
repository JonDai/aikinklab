import {
  calculateTestResults,
  validateAnswers,
  generateResultId,
  calculateProgress,
  TestAnswers,
} from '../../lib/test-utils'

describe('Test Utils', () => {
  describe('calculateTestResults', () => {
    it('should calculate results for dominant personality', () => {
      const answers: TestAnswers = {
        1: 'a', // Lead and guide (dominant +3)
        2: 'a', // Excitedly try new things (adventurous +3) 
        3: 'a', // Clearly express needs (dominant +2)
        4: 'a', // Trust-based power exchange (trust +3)
        5: 'c', // Psychological stimulation (dominant +2)
      }

      const result = calculateTestResults(answers)

      expect(result.personality).toBe('dominance')
      expect(result.dominance).toBeGreaterThan(40)
      expect(result.description).toContain('leading role')
      expect(result.recommendations).toHaveLength(4)
      expect(result.recommendations[0]).toContain('communication')
    })

    it('should calculate results for submissive personality', () => {
      const answers: TestAnswers = {
        1: 'b', // Follow partner's lead (submissive +3)
        2: 'c', // Need encouragement (submissive +2)
        3: 'b', // Respect others' feelings (empathy +3)
        4: 'c', // Cautious approach (empathy +1) 
        5: 'a', // Emotional connection (empathy +2)
      }

      const result = calculateTestResults(answers)

      expect(result.submission).toBeGreaterThan(20)
      expect(result.empathy).toBeGreaterThan(30)
      expect(result.description).toBeDefined()
      expect(result.recommendations.length).toBeGreaterThan(0)
    })

    it('should calculate results for adventurous personality', () => {
      const answers: TestAnswers = {
        1: 'c', // Adjust flexibly (balanced)
        2: 'a', // Excitedly try new things (adventurous +3)
        3: 'c', // Find balance (empathy +2)
        4: 'b', // Self-discovery (adventurous +2)
        5: 'b', // Physical experience (adventurous +3)
      }

      const result = calculateTestResults(answers)

      expect(result.adventurousness).toBeGreaterThan(40)
      expect(result.personality).toBe('adventurousness')
      expect(result.description).toContain('new experiences')
      expect(result.recommendations).toContain('Research new experiences thoroughly')
    })

    it('should handle edge cases with minimal answers', () => {
      const answers: TestAnswers = {
        1: 'd', // Equal interaction (vanilla)
        2: 'd', // Avoid risks (conservative)  
        3: 'd', // Avoid conflict (harmonious)
        4: 'd', // Not interested (uninterested)
        5: 'd', // Security and comfort (comfort)
      }

      const result = calculateTestResults(answers)

      expect(result.personality).toBe('balanced')
      expect(result.dominance).toBe(0)
      expect(result.submission).toBe(0)
      expect(result.adventurousness).toBe(0)
      expect(result.empathy).toBe(0)
      expect(result.trustLevel).toBe(0)
    })

    it('should throw error for empty answers', () => {
      expect(() => calculateTestResults({})).toThrow('No answers provided')
    })

    it('should throw error for null answers', () => {
      expect(() => calculateTestResults(null as any)).toThrow('No answers provided')
    })

    it('should handle partial answers', () => {
      const answers: TestAnswers = {
        1: 'a',
        3: 'b',
      }

      const result = calculateTestResults(answers)

      expect(result).toBeDefined()
      expect(result.personality).toBeDefined()
      expect(typeof result.dominance).toBe('number')
    })
  })

  describe('validateAnswers', () => {
    it('should validate complete answers', () => {
      const answers: TestAnswers = {
        1: 'a',
        2: 'b',
        3: 'c',
        4: 'd',
        5: 'a',
      }
      const requiredQuestions = [1, 2, 3, 4, 5]

      expect(validateAnswers(answers, requiredQuestions)).toBe(true)
    })

    it('should fail validation for missing answers', () => {
      const answers: TestAnswers = {
        1: 'a',
        2: 'b',
        3: 'c',
      }
      const requiredQuestions = [1, 2, 3, 4, 5]

      expect(validateAnswers(answers, requiredQuestions)).toBe(false)
    })

    it('should fail validation for empty string answers', () => {
      const answers: TestAnswers = {
        1: 'a',
        2: '',
        3: 'c',
        4: 'd',
        5: 'a',
      }
      const requiredQuestions = [1, 2, 3, 4, 5]

      expect(validateAnswers(answers, requiredQuestions)).toBe(false)
    })

    it('should fail validation for whitespace-only answers', () => {
      const answers: TestAnswers = {
        1: 'a',
        2: '   ',
        3: 'c',
        4: 'd',
        5: 'a',
      }
      const requiredQuestions = [1, 2, 3, 4, 5]

      expect(validateAnswers(answers, requiredQuestions)).toBe(false)
    })

    it('should fail validation for null answers object', () => {
      expect(validateAnswers(null as any, [1, 2, 3])).toBe(false)
    })

    it('should fail validation for non-object answers', () => {
      expect(validateAnswers('not an object' as any, [1, 2, 3])).toBe(false)
    })

    it('should pass validation for empty required questions array', () => {
      const answers: TestAnswers = { 1: 'a' }
      expect(validateAnswers(answers, [])).toBe(true)
    })
  })

  describe('generateResultId', () => {
    it('should generate a 12-character ID', () => {
      const id = generateResultId()
      expect(id).toHaveLength(12)
      expect(typeof id).toBe('string')
    })

    it('should generate unique IDs', () => {
      const ids = new Set()
      for (let i = 0; i < 100; i++) {
        ids.add(generateResultId())
      }
      expect(ids.size).toBe(100)
    })

    it('should only contain valid characters', () => {
      const id = generateResultId()
      const validChars = /^[a-z0-9]+$/
      expect(validChars.test(id)).toBe(true)
    })

    it('should not contain uppercase letters or special characters', () => {
      const id = generateResultId()
      expect(id).not.toMatch(/[A-Z]/)
      expect(id).not.toMatch(/[^a-z0-9]/)
    })
  })

  describe('calculateProgress', () => {
    it('should calculate progress correctly', () => {
      expect(calculateProgress(0, 5)).toBe(20) // (0+1)/5 * 100 = 20
      expect(calculateProgress(2, 5)).toBe(60) // (2+1)/5 * 100 = 60
      expect(calculateProgress(4, 5)).toBe(100) // (4+1)/5 * 100 = 100
    })

    it('should handle first question', () => {
      expect(calculateProgress(0, 10)).toBe(10)
    })

    it('should handle last question', () => {
      expect(calculateProgress(9, 10)).toBe(100)
    })

    it('should return 0 for invalid total questions', () => {
      expect(calculateProgress(5, 0)).toBe(0)
      expect(calculateProgress(5, -1)).toBe(0)
    })

    it('should round to nearest integer', () => {
      expect(calculateProgress(0, 3)).toBe(33) // 33.333... rounds to 33
      expect(calculateProgress(1, 3)).toBe(67) // 66.666... rounds to 67
    })

    it('should handle single question test', () => {
      expect(calculateProgress(0, 1)).toBe(100)
    })
  })
})

// Additional test cases for complex scenarios
describe('Test Utils Integration Tests', () => {
  it('should handle complete test workflow', () => {
    const answers: TestAnswers = {
      1: 'a',
      2: 'b', 
      3: 'c',
      4: 'a',
      5: 'b',
    }

    // Validate answers
    const isValid = validateAnswers(answers, [1, 2, 3, 4, 5])
    expect(isValid).toBe(true)

    // Calculate results
    const results = calculateTestResults(answers)
    expect(results).toBeDefined()
    expect(results.personality).toBeDefined()

    // Generate ID
    const resultId = generateResultId()
    expect(resultId).toHaveLength(12)

    // Calculate progress
    const progress = calculateProgress(4, 5)
    expect(progress).toBe(100)
  })

  it('should maintain result consistency', () => {
    const answers: TestAnswers = {
      1: 'a',
      2: 'a',
      3: 'a', 
      4: 'a',
      5: 'c',
    }

    // Run calculation multiple times
    const result1 = calculateTestResults(answers)
    const result2 = calculateTestResults(answers)
    const result3 = calculateTestResults(answers)

    // Results should be consistent
    expect(result1.personality).toBe(result2.personality)
    expect(result2.personality).toBe(result3.personality)
    expect(result1.dominance).toBe(result2.dominance)
    expect(result1.description).toBe(result3.description)
  })
})