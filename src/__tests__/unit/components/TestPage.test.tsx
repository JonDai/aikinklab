import { render, screen, fireEvent, waitFor } from '../../utils/test-utils'
import TestPage from '../../../app/test/page'
import { useRouter } from 'next/navigation'

// Mock the useRouter hook
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

describe('TestPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the first question', () => {
    render(<TestPage />)
    
    expect(screen.getByText('Question 1 / 5')).toBeInTheDocument()
    expect(screen.getByText('0% Complete')).toBeInTheDocument()
    expect(screen.getByText('In an intimate relationship, you are more inclined to:')).toBeInTheDocument()
    expect(screen.getByText('Lead and guide your partner')).toBeInTheDocument()
  })

  it('should show progress bar with correct percentage', () => {
    render(<TestPage />)
    
    const progressBar = screen.getByRole('progressbar', { hidden: true })
    expect(progressBar).toHaveStyle('width: 20%')
  })

  it('should allow option selection', () => {
    render(<TestPage />)
    
    const option = screen.getByText('Lead and guide your partner')
    fireEvent.click(option)
    
    // Check if option is visually selected (has selected class)
    expect(option.closest('button')).toHaveClass('selected')
  })

  it('should disable next button when no option selected', () => {
    render(<TestPage />)
    
    const nextButton = screen.getByRole('button', { name: /next/i })
    expect(nextButton).toBeDisabled()
  })

  it('should enable next button when option selected', () => {
    render(<TestPage />)
    
    const option = screen.getByText('Lead and guide your partner')
    fireEvent.click(option)
    
    const nextButton = screen.getByRole('button', { name: /next/i })
    expect(nextButton).toBeEnabled()
  })

  it('should disable previous button on first question', () => {
    render(<TestPage />)
    
    const previousButton = screen.getByRole('button', { name: /previous/i })
    expect(previousButton).toBeDisabled()
  })

  it('should navigate to next question', () => {
    render(<TestPage />)
    
    // Select an option
    const option = screen.getByText('Lead and guide your partner')
    fireEvent.click(option)
    
    // Click next
    const nextButton = screen.getByRole('button', { name: /next/i })
    fireEvent.click(nextButton)
    
    // Should show question 2
    expect(screen.getByText('Question 2 / 5')).toBeInTheDocument()
    expect(screen.getByText('40% Complete')).toBeInTheDocument()
    expect(screen.getByText('When faced with new experiences, your reaction is usually:')).toBeInTheDocument()
  })

  it('should navigate back to previous question', () => {
    render(<TestPage />)
    
    // Go to question 2
    const option1 = screen.getByText('Lead and guide your partner')
    fireEvent.click(option1)
    
    const nextButton = screen.getByRole('button', { name: /next/i })
    fireEvent.click(nextButton)
    
    // Now go back to question 1
    const previousButton = screen.getByRole('button', { name: /previous/i })
    fireEvent.click(previousButton)
    
    expect(screen.getByText('Question 1 / 5')).toBeInTheDocument()
    expect(screen.getByText('In an intimate relationship, you are more inclined to:')).toBeInTheDocument()
  })

  it('should remember previous answers when navigating back', () => {
    render(<TestPage />)
    
    // Select option A on question 1
    const optionA = screen.getByText('Lead and guide your partner')
    fireEvent.click(optionA)
    
    // Go to question 2
    const nextButton = screen.getByRole('button', { name: /next/i })
    fireEvent.click(nextButton)
    
    // Go back to question 1
    const previousButton = screen.getByRole('button', { name: /previous/i })
    fireEvent.click(previousButton)
    
    // Option A should still be selected
    expect(optionA.closest('button')).toHaveClass('selected')
  })

  it('should show completion screen on last question', async () => {
    render(<TestPage />)
    
    // Answer all 5 questions
    for (let i = 0; i < 5; i++) {
      // Select first option for each question
      const options = screen.getAllByRole('button')
      const firstQuizOption = options.find(button => button.classList.contains('quiz-option') || 
        button.querySelector('[class*="rounded-full"]'))
      
      if (firstQuizOption) {
        fireEvent.click(firstQuizOption)
      }
      
      // Click next (except on last question where it says "Complete Test")
      const nextButton = screen.getByRole('button', { name: i === 4 ? /complete test/i : /next/i })
      fireEvent.click(nextButton)
    }
    
    // Should show completion screen
    expect(screen.getByText('Test Complete!')).toBeInTheDocument()
    expect(screen.getByText(/analyzing your answers/i)).toBeInTheDocument()
  })

  it('should redirect to results after completion', async () => {
    render(<TestPage />)
    
    // Mock setTimeout to resolve immediately
    jest.spyOn(global, 'setTimeout').mockImplementation((callback: any) => {
      callback()
      return 0 as any
    })
    
    // Answer all questions
    for (let i = 0; i < 5; i++) {
      const options = screen.getAllByRole('button')
      const firstQuizOption = options.find(button => button.classList.contains('quiz-option') || 
        button.querySelector('[class*="rounded-full"]'))
      
      if (firstQuizOption) {
        fireEvent.click(firstQuizOption)
      }
      
      const nextButton = screen.getByRole('button', { name: i === 4 ? /complete test/i : /next/i })
      fireEvent.click(nextButton)
    }
    
    // Wait for redirect
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(expect.stringMatching(/^\/results\/[a-z0-9]+$/))
    }, { timeout: 3000 })
    
    // Restore setTimeout
    jest.restoreAllMocks()
  })

  it('should show help text', () => {
    render(<TestPage />)
    
    expect(screen.getByText(/please answer each question honestly/i)).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(<TestPage />)
    
    // Check for radio button group semantics
    const options = screen.getAllByRole('button')
    const quizOptions = options.filter(button => 
      button.classList.contains('quiz-option') || 
      button.querySelector('[class*="rounded-full"]')
    )
    
    expect(quizOptions.length).toBeGreaterThan(0)
    
    // Check for keyboard navigation support
    quizOptions.forEach(option => {
      expect(option).not.toHaveAttribute('disabled')
    })
  })

  it('should display all answer options for each question', () => {
    render(<TestPage />)
    
    // First question should have 4 options
    expect(screen.getByText('Lead and guide your partner')).toBeInTheDocument()
    expect(screen.getByText('Follow your partner\'s lead')).toBeInTheDocument()
    expect(screen.getByText('Adjust flexibly according to the situation')).toBeInTheDocument()
    expect(screen.getByText('Maintain equal interaction')).toBeInTheDocument()
  })

  it('should update progress correctly throughout test', () => {
    render(<TestPage />)
    
    // Question 1 - 20% (1/5)
    expect(screen.getByText('20% Complete')).toBeInTheDocument()
    
    // Move to question 2
    fireEvent.click(screen.getByText('Lead and guide your partner'))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    
    // Question 2 - 40% (2/5)
    expect(screen.getByText('40% Complete')).toBeInTheDocument()
  })

  it('should handle edge case navigation', () => {
    render(<TestPage />)
    
    // Previous button should be disabled on first question
    const previousButton = screen.getByRole('button', { name: /previous/i })
    expect(previousButton).toBeDisabled()
    
    // Clicking disabled previous button should not crash
    fireEvent.click(previousButton)
    expect(screen.getByText('Question 1 / 5')).toBeInTheDocument()
  })
})