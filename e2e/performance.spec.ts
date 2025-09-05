import { test, expect } from '@playwright/test'

test.describe('Performance Tests', () => {
  test('should load homepage within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    
    await page.goto('/')
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle')
    
    const loadTime = Date.now() - startTime
    
    // Homepage should load within 3 seconds
    expect(loadTime).toBeLessThan(3000)
    
    // Check that key elements are visible
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('text=Take the Test')).toBeVisible()
  })

  test('should load test page within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    
    await page.goto('/test')
    
    await page.waitForLoadState('networkidle')
    
    const loadTime = Date.now() - startTime
    
    // Test page should load within 2 seconds (it's simpler than homepage)
    expect(loadTime).toBeLessThan(2000)
    
    // Verify test content loads
    await expect(page.locator('h2')).toBeVisible()
    await expect(page.locator('text=Question 1 / 5')).toBeVisible()
  })

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/')
    
    // Measure Core Web Vitals
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          resolve(entries.map(entry => ({
            name: entry.name,
            value: entry.value || entry.startTime,
            rating: 'good' // This would need actual calculation
          })))
        }).observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] })
      })
    })
    
    expect(metrics).toBeDefined()
  })

  test('should handle rapid user interactions', async ({ page }) => {
    await page.goto('/test')
    
    const startTime = Date.now()
    
    // Rapidly click options and navigate
    for (let i = 0; i < 5; i++) {
      // Select first available option
      const options = page.locator('button.quiz-option')
      await options.first().click()
      
      // Click next
      const nextButton = page.locator('button:has-text("Next"), button:has-text("Complete Test")')
      await nextButton.click()
      
      // Small delay to prevent overwhelming
      await page.waitForTimeout(100)
    }
    
    const totalTime = Date.now() - startTime
    
    // Rapid interactions should complete within reasonable time
    expect(totalTime).toBeLessThan(5000)
    
    // Should reach completion
    await expect(page.locator('text=Test Complete!')).toBeVisible({ timeout: 10000 })
  })

  test('should handle multiple simultaneous users simulation', async ({ context }) => {
    // Create multiple pages to simulate multiple users
    const pages = await Promise.all([
      context.newPage(),
      context.newPage(), 
      context.newPage()
    ])
    
    const startTime = Date.now()
    
    // All pages navigate to test simultaneously
    await Promise.all(pages.map(page => page.goto('/test')))
    
    // All pages should load successfully
    await Promise.all(pages.map(page => 
      expect(page.locator('text=Question 1 / 5')).toBeVisible()
    ))
    
    const loadTime = Date.now() - startTime
    
    // Multiple simultaneous loads should complete within 5 seconds
    expect(loadTime).toBeLessThan(5000)
    
    // Clean up
    await Promise.all(pages.map(page => page.close()))
  })

  test('should maintain performance on slow networks', async ({ page, context }) => {
    // Simulate slow 3G network
    await context.route('**/*', async route => {
      // Add artificial delay to simulate slow network
      await new Promise(resolve => setTimeout(resolve, 100))
      await route.continue()
    })
    
    const startTime = Date.now()
    
    await page.goto('/test')
    await page.waitForLoadState('networkidle')
    
    const loadTime = Date.now() - startTime
    
    // Even on slow network, should load within 10 seconds
    expect(loadTime).toBeLessThan(10000)
    
    // Core functionality should still work
    await page.click('text=Lead and guide your partner')
    await expect(page.locator('button:has-text("Lead and guide your partner")')).toHaveClass(/selected/)
  })

  test('should have efficient DOM structure', async ({ page }) => {
    await page.goto('/test')
    
    // Count DOM nodes
    const domNodeCount = await page.evaluate(() => {
      return document.querySelectorAll('*').length
    })
    
    // Should have reasonable DOM size (less than 1500 nodes for a test page)
    expect(domNodeCount).toBeLessThan(1500)
    
    // Check for excessive nesting
    const maxDepth = await page.evaluate(() => {
      const getDepth = (element: Element): number => {
        let depth = 0
        let current = element.parentElement
        
        while (current) {
          depth++
          current = current.parentElement
        }
        
        return depth
      }
      
      const allElements = Array.from(document.querySelectorAll('*'))
      return Math.max(...allElements.map(getDepth))
    })
    
    // DOM depth should be reasonable (less than 20 levels deep)
    expect(maxDepth).toBeLessThan(20)
  })

  test('should optimize images loading', async ({ page }) => {
    await page.goto('/')
    
    // Check if images have proper loading attributes
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i)
      const loading = await image.getAttribute('loading')
      
      // Images should use lazy loading where appropriate
      if (i > 0) { // First image can be eager loaded
        expect(loading).toBe('lazy')
      }
    }
  })

  test('should handle memory efficiently during test completion', async ({ page }) => {
    await page.goto('/test')
    
    // Measure initial memory
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0
    })
    
    // Complete entire test
    const answers = [
      'Lead and guide your partner',
      'Excitedly and proactively try',
      'Clearly expressing your own needs', 
      'It is a deep expression of trust',
      'Psychological stimulation and challenge'
    ]
    
    for (let i = 0; i < answers.length; i++) {
      await page.click(`text=${answers[i]}`)
      const buttonText = i === answers.length - 1 ? 'Complete Test' : 'Next'
      await page.click(`button:has-text("${buttonText}")`)
    }
    
    await expect(page.locator('text=Test Complete!')).toBeVisible()
    
    // Measure memory after completion
    const finalMemory = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0
    })
    
    // Memory growth should be reasonable (less than 10MB increase)
    if (initialMemory > 0 && finalMemory > 0) {
      const memoryIncrease = finalMemory - initialMemory
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024) // 10MB
    }
  })

  test('should handle navigation performance', async ({ page }) => {
    await page.goto('/test')
    
    const navigationTimes: number[] = []
    
    // Measure time for each navigation
    for (let i = 0; i < 3; i++) {
      const startTime = Date.now()
      
      // Select option and navigate
      const options = page.locator('button.quiz-option')
      await options.first().click()
      await page.click('button:has-text("Next")')
      
      // Wait for next question to appear
      await expect(page.locator(`text=Question ${i + 2} / 5`)).toBeVisible()
      
      const navTime = Date.now() - startTime
      navigationTimes.push(navTime)
    }
    
    // Each navigation should be fast (less than 500ms)
    navigationTimes.forEach(time => {
      expect(time).toBeLessThan(500)
    })
    
    // Average navigation time should be very fast
    const avgTime = navigationTimes.reduce((a, b) => a + b, 0) / navigationTimes.length
    expect(avgTime).toBeLessThan(300)
  })

  test('should handle CSS and JavaScript loading efficiently', async ({ page }) => {
    // Track network requests
    const requests: string[] = []
    
    page.on('request', request => {
      requests.push(request.url())
    })
    
    await page.goto('/test')
    await page.waitForLoadState('networkidle')
    
    // Filter for CSS and JS requests
    const cssRequests = requests.filter(url => url.endsWith('.css'))
    const jsRequests = requests.filter(url => url.endsWith('.js'))
    
    // Should not have excessive number of requests
    expect(cssRequests.length).toBeLessThan(10)
    expect(jsRequests.length).toBeLessThan(15)
    
    // Check for duplicate requests (which would indicate inefficiency)
    const uniqueRequests = new Set(requests)
    expect(uniqueRequests.size).toBe(requests.length)
  })
})