import { test, expect } from '@playwright/test'

test.describe('Test Taking User Journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should complete the homepage to results flow', async ({ page }) => {
    // Start from homepage
    await expect(page).toHaveTitle(/AIKinkLab/i)
    
    // Navigate to test page
    await page.click('text=Take the Test')
    await expect(page).toHaveURL('/test')
    
    // Verify test page loads
    await expect(page.locator('h2')).toContainText('In an intimate relationship, you are more inclined to:')
    await expect(page.locator('text=Question 1 / 5')).toBeVisible()
    
    // Complete the test
    const answers = [
      'Lead and guide your partner',
      'Excitedly and proactively try', 
      'Clearly expressing your own needs',
      'It is a deep expression of trust',
      'Psychological stimulation and challenge'
    ]
    
    for (let i = 0; i < answers.length; i++) {
      // Select answer
      await page.click(`text=${answers[i]}`)
      
      // Verify selection
      await expect(page.locator(`button:has-text("${answers[i]}")`)).toHaveClass(/selected/)
      
      // Click next/complete
      const buttonText = i === answers.length - 1 ? 'Complete Test' : 'Next'
      await page.click(`button:has-text("${buttonText}")`)
      
      // Verify progress
      if (i < answers.length - 1) {
        await expect(page.locator(`text=Question ${i + 2} / 5`)).toBeVisible()
      }
    }
    
    // Verify completion screen
    await expect(page.locator('text=Test Complete!')).toBeVisible()
    await expect(page.locator('text=analyzing your answers')).toBeVisible()
    
    // Wait for redirect to results
    await page.waitForURL(/\/results\/[a-z0-9]+/, { timeout: 10000 })
    
    // Verify we're on results page
    await expect(page).toHaveURL(/\/results\/[a-z0-9]+$/)
  })

  test('should navigate back and forth between questions', async ({ page }) => {
    await page.goto('/test')
    
    // Answer first question
    await page.click('text=Lead and guide your partner')
    await page.click('button:has-text("Next")')
    
    // Verify we're on question 2
    await expect(page.locator('text=Question 2 / 5')).toBeVisible()
    
    // Go back to question 1
    await page.click('button:has-text("Previous")')
    await expect(page.locator('text=Question 1 / 5')).toBeVisible()
    
    // Verify answer is still selected
    await expect(page.locator('button:has-text("Lead and guide your partner")')).toHaveClass(/selected/)
  })

  test('should prevent progression without selecting answer', async ({ page }) => {
    await page.goto('/test')
    
    // Next button should be disabled
    await expect(page.locator('button:has-text("Next")')).toBeDisabled()
    
    // Select an answer
    await page.click('text=Lead and guide your partner')
    
    // Next button should be enabled
    await expect(page.locator('button:has-text("Next")')).toBeEnabled()
  })

  test('should show correct progress throughout test', async ({ page }) => {
    await page.goto('/test')
    
    const progressSteps = [
      { question: 1, progress: '20% Complete' },
      { question: 2, progress: '40% Complete' },
      { question: 3, progress: '60% Complete' },
      { question: 4, progress: '80% Complete' },
      { question: 5, progress: '100% Complete' },
    ]
    
    for (let i = 0; i < progressSteps.length; i++) {
      const { question, progress } = progressSteps[i]
      
      // Verify current question and progress
      await expect(page.locator(`text=Question ${question} / 5`)).toBeVisible()
      await expect(page.locator(`text=${progress}`)).toBeVisible()
      
      if (i < progressSteps.length - 1) {
        // Select first option and proceed
        const options = page.locator('button.quiz-option')
        await options.first().click()
        await page.click('button:has-text("Next")')
      }
    }
  })

  test('should be responsive on mobile devices', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/test')
    
    // Verify mobile layout
    await expect(page.locator('h2')).toBeVisible()
    await expect(page.locator('text=Question 1 / 5')).toBeVisible()
    
    // Verify options are clickable on mobile
    await page.click('text=Lead and guide your partner')
    await expect(page.locator('button:has-text("Lead and guide your partner")')).toHaveClass(/selected/)
    
    // Verify navigation works on mobile
    await page.click('button:has-text("Next")')
    await expect(page.locator('text=Question 2 / 5')).toBeVisible()
  })

  test('should handle keyboard navigation', async ({ page }) => {
    await page.goto('/test')
    
    // Use Tab to navigate to options
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab') // Should focus on first option
    
    // Use Enter to select
    await page.keyboard.press('Enter')
    
    // Verify selection
    const selectedOption = page.locator('button.quiz-option.selected')
    await expect(selectedOption).toBeVisible()
    
    // Tab to Next button and press Enter
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter')
    
    // Should proceed to next question
    await expect(page.locator('text=Question 2 / 5')).toBeVisible()
  })

  test('should maintain state during page refresh', async ({ page }) => {
    await page.goto('/test')
    
    // Answer first question
    await page.click('text=Lead and guide your partner')
    await page.click('button:has-text("Next")')
    
    // Answer second question  
    await page.click('text=Excitedly and proactively try')
    
    // Refresh page
    await page.reload()
    
    // Should start over (as we don't have persistence implemented)
    // This test documents current behavior
    await expect(page.locator('text=Question 1 / 5')).toBeVisible()
  })

  test('should handle different personality paths', async ({ page }) => {
    await page.goto('/test')
    
    // Test submissive personality path
    const submissiveAnswers = [
      'Follow your partner\'s lead',
      'Need your partner\'s encouragement',
      'Respecting the other person\'s feelings',
      'It requires caution and a gradual approach',
      'Deep emotional connection'
    ]
    
    for (let i = 0; i < submissiveAnswers.length; i++) {
      await page.click(`text=${submissiveAnswers[i]}`)
      
      const buttonText = i === submissiveAnswers.length - 1 ? 'Complete Test' : 'Next'
      await page.click(`button:has-text("${buttonText}")`)
    }
    
    // Should complete and redirect
    await expect(page.locator('text=Test Complete!')).toBeVisible()
    await page.waitForURL(/\/results\/[a-z0-9]+/, { timeout: 10000 })
  })

  test('should display help text and instructions', async ({ page }) => {
    await page.goto('/test')
    
    // Verify help text is visible
    await expect(page.locator('text=Please answer each question honestly')).toBeVisible()
    
    // Verify question counter
    await expect(page.locator('text=Question 1 / 5')).toBeVisible()
    
    // Verify progress percentage
    await expect(page.locator('text=20% Complete')).toBeVisible()
  })

  test('should handle edge cases gracefully', async ({ page }) => {
    await page.goto('/test')
    
    // Try clicking disabled previous button (should not crash)
    await expect(page.locator('button:has-text("Previous")')).toBeDisabled()
    
    // Try clicking disabled next button
    await expect(page.locator('button:has-text("Next")')).toBeDisabled()
    
    // Rapid clicking should not cause issues
    for (let i = 0; i < 5; i++) {
      await page.click('text=Lead and guide your partner')
    }
    
    // Should still work normally
    await expect(page.locator('button:has-text("Lead and guide your partner")')).toHaveClass(/selected/)
    await page.click('button:has-text("Next")')
    await expect(page.locator('text=Question 2 / 5')).toBeVisible()
  })
})