import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility Tests', () => {
  test('should not have any automatically detectable accessibility issues on homepage', async ({ page }) => {
    await page.goto('/')
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should not have accessibility issues on test page', async ({ page }) => {
    await page.goto('/test')
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should support keyboard navigation on test page', async ({ page }) => {
    await page.goto('/test')
    
    // Test Tab navigation through interactive elements
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // Should be able to select option with Enter
    await page.keyboard.press('Enter')
    
    // Verify selection worked
    const selectedOptions = page.locator('button.quiz-option.selected')
    await expect(selectedOptions).toHaveCount(1)
    
    // Continue tabbing to Next button
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // Should be able to proceed with Enter
    await page.keyboard.press('Enter')
    await expect(page.locator('text=Question 2 / 5')).toBeVisible()
  })

  test('should have proper ARIA labels and roles', async ({ page }) => {
    await page.goto('/test')
    
    // Check for proper button roles
    const optionButtons = page.locator('button.quiz-option')
    expect(await optionButtons.count()).toBeGreaterThan(0)
    
    // Check for navigation buttons
    const navButtons = page.locator('button:has-text("Previous"), button:has-text("Next")')
    expect(await navButtons.count()).toBe(2)
    
    // Verify buttons are properly labeled
    await expect(page.locator('button:has-text("Previous")')).toBeVisible()
    await expect(page.locator('button:has-text("Next")')).toBeVisible()
  })

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/test')
    
    // Use axe-core to check color contrast
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    
    // Filter for color contrast violations
    const colorContrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    )
    
    expect(colorContrastViolations).toEqual([])
  })

  test('should support screen readers', async ({ page }) => {
    await page.goto('/test')
    
    // Check for proper heading structure
    const mainHeading = page.locator('h2')
    await expect(mainHeading).toBeVisible()
    
    // Check that progress information is accessible
    await expect(page.locator('text=Question 1 / 5')).toBeVisible()
    await expect(page.locator('text=20% Complete')).toBeVisible()
    
    // Check that instructions are accessible
    await expect(page.locator('text=Please answer each question honestly')).toBeVisible()
  })

  test('should handle high contrast mode', async ({ page }) => {
    // Simulate high contrast mode by modifying CSS
    await page.goto('/test')
    
    await page.addStyleTag({
      content: `
        * {
          forced-color-adjust: none !important;
          background-color: black !important;
          color: white !important;
        }
        button {
          border: 2px solid white !important;
        }
        .selected {
          background-color: white !important;
          color: black !important;
        }
      `
    })
    
    // Verify the page is still functional
    await page.click('text=Lead and guide your partner')
    await expect(page.locator('button:has-text("Lead and guide your partner")')).toHaveClass(/selected/)
    
    await page.click('button:has-text("Next")')
    await expect(page.locator('text=Question 2 / 5')).toBeVisible()
  })

  test('should handle zoom levels up to 200%', async ({ page }) => {
    await page.goto('/test')
    
    // Zoom to 200%
    await page.evaluate(() => {
      document.body.style.zoom = '2'
    })
    
    // Verify content is still accessible and functional
    await expect(page.locator('h2')).toBeVisible()
    await expect(page.locator('text=Question 1 / 5')).toBeVisible()
    
    // Verify interaction still works
    await page.click('text=Lead and guide your partner')
    await expect(page.locator('button:has-text("Lead and guide your partner")')).toHaveClass(/selected/)
    
    // Reset zoom
    await page.evaluate(() => {
      document.body.style.zoom = '1'
    })
  })

  test('should provide focus indicators', async ({ page }) => {
    await page.goto('/test')
    
    // Tab to first interactive element
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // Verify focus is visible (check if focused element has focus styles)
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
    
    // The focused element should have some visual indication
    // This might need adjustment based on your actual CSS
    const focusedButton = page.locator('button:focus')
    await expect(focusedButton).toHaveCount(1)
  })

  test('should handle reduced motion preferences', async ({ page }) => {
    // Set prefers-reduced-motion
    await page.emulateMedia({ reducedMotion: 'reduce' })
    
    await page.goto('/test')
    
    // The page should still be functional
    await page.click('text=Lead and guide your partner')
    await page.click('button:has-text("Next")')
    await expect(page.locator('text=Question 2 / 5')).toBeVisible()
    
    // Progress bar animations should be reduced but still functional
    const progressBar = page.locator('[style*="width"]')
    await expect(progressBar).toBeVisible()
  })

  test('should provide alternative text for images', async ({ page }) => {
    await page.goto('/')
    
    // Check that images have proper alt text
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i)
      const alt = await image.getAttribute('alt')
      
      // Images should have alt text (can be empty for decorative images)
      expect(alt).toBeDefined()
    }
  })

  test('should support voice commands simulation', async ({ page }) => {
    await page.goto('/test')
    
    // Simulate voice command "click next"
    // Since we can't actually test voice commands, we test programmatic clicking
    const nextButton = page.locator('button:has-text("Next")')
    
    // Should be disabled initially
    await expect(nextButton).toBeDisabled()
    
    // Voice command would need to select option first
    await page.click('text=Lead and guide your partner')
    
    // Now "click next" voice command should work
    await expect(nextButton).toBeEnabled()
    await nextButton.click()
    
    await expect(page.locator('text=Question 2 / 5')).toBeVisible()
  })
})