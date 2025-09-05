/**
 * Integration tests for the complete test-taking workflow
 * Tests the interaction between components and business logic
 */

import { render, screen, fireEvent, waitFor } from '../utils/test-utils'
import TestPage from '../../app/test/page'
import { calculateTestResults } from '../../lib/test-utils'

// Mock navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
}))

describe('Test Taking Workflow Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Mock Math.random for consistent result IDs in tests
    jest.spyOn(Math, 'random').mockReturnValue(0.123456789)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should complete full dominant personality test workflow', async () => {
    render(<TestPage />)
    
    // Simulate answers that would result in dominant personality
    const dominantAnswers = [
      'Lead and guide your partner', // Question 1: Dominant choice
      'Excitedly and proactively try', // Question 2: Adventurous choice
      'Clearly expressing your own needs', // Question 3: Assertive choice
      'It is a deep expression of trust', // Question 4: Trust-based choice
      'Psychological stimulation and challenge', // Question 5: Psychological choice
    ]

    for (let i = 0; i < dominantAnswers.length; i++) {
      // Verify we're on the correct question
      expect(screen.getByText(`Question ${i + 1} / 5`)).toBeInTheDocument()
      
      // Select the dominant answer
      const answerButton = screen.getByText(dominantAnswers[i])
      fireEvent.click(answerButton)
      
      // Verify answer is selected
      expect(answerButton.closest('button')).toHaveClass('selected')
      
      // Click next/complete
      const nextButton = screen.getByRole('button', { 
        name: i === dominantAnswers.length - 1 ? /complete test/i : /next/i 
      })
      expect(nextButton).toBeEnabled()
      fireEvent.click(nextButton)
    }

    // Should show completion screen
    expect(screen.getByText('Test Complete!')).toBeInTheDocument()
    expect(screen.getByText(/analyzing your answers/i)).toBeInTheDocument()
    
    // Should have progress bar at 100%
    const progressBar = screen.getByRole('progressbar', { hidden: true })
    expect(progressBar).toHaveStyle('width: 100%')
  })

  it('should complete full submissive personality test workflow', async () => {
    render(<TestPage />)
    
    const submissiveAnswers = [
      'Follow your partner\'s lead', // Question 1: Submissive choice
      'Need your partner\'s encouragement', // Question 2: Guided choice
      'Respecting the other person\'s feelings', // Question 3: Empathetic choice
      'It requires caution and a gradual approach', // Question 4: Gradual choice
      'Deep emotional connection', // Question 5: Emotional choice
    ]

    for (let i = 0; i < submissiveAnswers.length; i++) {
      const answerButton = screen.getByText(submissiveAnswers[i])
      fireEvent.click(answerButton)
      
      const nextButton = screen.getByRole('button', { 
        name: i === submissiveAnswers.length - 1 ? /complete test/i : /next/i 
      })
      fireEvent.click(nextButton)
    }

    expect(screen.getByText('Test Complete!')).toBeInTheDocument()
  })

  it('should handle back and forth navigation with answer persistence', async () => {
    render(<TestPage />)
    
    // Answer question 1
    const q1Answer = screen.getByText('Lead and guide your partner')
    fireEvent.click(q1Answer)
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    
    // Answer question 2
    expect(screen.getByText('Question 2 / 5')).toBeInTheDocument()
    const q2Answer = screen.getByText('Excitedly and proactively try')
    fireEvent.click(q2Answer)
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    
    // Go to question 3
    expect(screen.getByText('Question 3 / 5')).toBeInTheDocument()
    
    // Go back to question 2
    fireEvent.click(screen.getByRole('button', { name: /previous/i }))
    expect(screen.getByText('Question 2 / 5')).toBeInTheDocument()
    
    // Verify Q2 answer is still selected
    expect(screen.getByText('Excitedly and proactively try').closest('button')).toHaveClass('selected')
    
    // Go back to question 1
    fireEvent.click(screen.getByRole('button', { name: /previous/i }))
    expect(screen.getByText('Question 1 / 5')).toBeInTheDocument()
    
    // Verify Q1 answer is still selected
    expect(screen.getByText('Lead and guide your partner').closest('button')).toHaveClass('selected')
  })

  it('should redirect to results with generated ID after completion', async () => {
    render(<TestPage />)
    
    // Mock setTimeout to execute immediately
    jest.spyOn(global, 'setTimeout').mockImplementation((callback: any) => {
      callback()
      return 0 as any
    })
    
    // Complete the test quickly
    const answers = [
      'Lead and guide your partner',
      'Excitedly and proactively try', 
      'Clearly expressing your own needs',
      'It is a deep expression of trust',
      'Psychological stimulation and challenge',
    ]

    for (let i = 0; i < answers.length; i++) {
      fireEvent.click(screen.getByText(answers[i]))
      fireEvent.click(screen.getByRole('button', { 
        name: i === answers.length - 1 ? /complete test/i : /next/i 
      }))
    }

    // Wait for navigation
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(expect.stringMatching(/^\/results\/[a-z0-9]+$/))
    })
    
    // Verify the generated ID format (should be 12 characters)
    const callArg = mockPush.mock.calls[0][0] as string
    const resultId = callArg.split('/').pop()
    expect(resultId).toHaveLength(12)
    expect(resultId).toMatch(/^[a-z0-9]+$/)
  })

  it('should show appropriate progress throughout the workflow', () => {
    render(<TestPage />)
    
    const expectedProgress = [
      { question: 1, percentage: '20% Complete' },
      { question: 2, percentage: '40% Complete' },
      { question: 3, percentage: '60% Complete' },
      { question: 4, percentage: '80% Complete' },
      { question: 5, percentage: '100% Complete' },
    ]

    expectedProgress.forEach(({ question, percentage }, index) => {
      expect(screen.getByText(`Question ${question} / 5`)).toBeInTheDocument()
      expect(screen.getByText(percentage)).toBeInTheDocument()
      
      if (index < expectedProgress.length - 1) {
        // Select first available option and proceed
        const options = screen.getAllByRole('button')
        const quizOption = options.find(button => 
          button.classList.contains('quiz-option') ||
          button.querySelector('[class*="rounded-full"]')
        )
        
        if (quizOption) {
          fireEvent.click(quizOption)
        }
        
        fireEvent.click(screen.getByRole('button', { name: /next/i }))
      }
    })
  })

  it('should prevent proceeding without selecting an option', () => {
    render(<TestPage />)
    
    // Next button should be disabled initially
    const nextButton = screen.getByRole('button', { name: /next/i })
    expect(nextButton).toBeDisabled()
    
    // Clicking should not proceed
    fireEvent.click(nextButton)
    expect(screen.getByText('Question 1 / 5')).toBeInTheDocument()
    
    // After selecting an option, should be enabled
    fireEvent.click(screen.getByText('Lead and guide your partner'))
    expect(nextButton).toBeEnabled()
  })

  it('should maintain UI state consistency throughout workflow', () => {
    render(<TestPage />)
    
    // Test that UI elements are consistent across questions
    for (let i = 0; i < 3; i++) {
      // Check common UI elements exist
      expect(screen.getByText(/question \d+ \/ 5/i)).toBeInTheDocument()
      expect(screen.getByText(/\d+% complete/i)).toBeInTheDocument()
      expect(screen.getByText(/please answer each question honestly/i)).toBeInTheDocument()
      
      // Check navigation buttons
      const previousButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })
      
      if (i === 0) {
        expect(previousButton).toBeDisabled()
      } else {
        expect(previousButton).toBeEnabled()
      }
      
      expect(nextButton).toBeDisabled() // Should be disabled until option selected
      
      // Select an option and proceed
      const options = screen.getAllByRole('button')
      const firstQuizOption = options.find(button => 
        button.classList.contains('quiz-option') ||
        button.querySelector('[class*="rounded-full"]')
      )
      
      if (firstQuizOption) {
        fireEvent.click(firstQuizOption)
      }
      
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
    }
  })

  it('should integrate with test results calculation', () => {
    // Test that the frontend workflow would work with backend calculation
    const mockAnswers = {
      1: 'a', // Dominant answer
      2: 'a', // Adventurous answer  
      3: 'a', // Assertive answer
      4: 'a', // Trust-based answer
      5: 'c', // Psychological answer
    }

    const results = calculateTestResults(mockAnswers)
    
    expect(results.personality).toBe('dominance')
    expect(results.dominance).toBeGreaterThan(40)
    expect(results.description).toContain('leading role')
    expect(results.recommendations).toHaveLength(4)
    
    // This demonstrates the integration between UI and business logic
    expect(results.recommendations[0]).toContain('communication')
  })
})