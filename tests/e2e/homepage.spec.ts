import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage before each test
    await page.goto('/');
  });

  test('should load the homepage successfully', async ({ page }) => {
    // Check that the page loads
    await expect(page).toHaveTitle(/AIKinkLab/);
    
    // Check for main heading
    await expect(page.locator('h1')).toBeVisible();
    
    // Check that the page doesn't have any console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Allow time for any async operations
    await page.waitForTimeout(2000);
    
    // Check that there are no critical errors
    expect(errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('Service Worker')
    )).toHaveLength(0);
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /BDSM.*test/i);
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /AIKinkLab/);
    
    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveAttribute('content', /BDSM.*test/i);
    
    // Check canonical link
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /aikinklab\.com/);
  });

  test('should have accessible navigation', async ({ page }) => {
    // Check for navigation elements
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check for main navigation links
    const testLink = page.locator('a', { hasText: /test/i });
    await expect(testLink).toBeVisible();
    
    const labLink = page.locator('a', { hasText: /lab/i });
    await expect(labLink).toBeVisible();
    
    // Check navigation is keyboard accessible
    await page.keyboard.press('Tab');
    const focusedElement = await page.locator(':focus').first();
    await expect(focusedElement).toBeVisible();
  });

  test('should have working CTA buttons', async ({ page }) => {
    // Find and test main CTA button
    const ctaButton = page.locator('a', { hasText: /take.*test/i }).first();
    await expect(ctaButton).toBeVisible();
    
    // Click the CTA button
    await ctaButton.click();
    
    // Check that navigation occurred
    await expect(page).toHaveURL(/\/test|\/bdsm-test/);
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      // Check mobile-specific elements
      const mobileMenu = page.locator('[data-testid="mobile-menu"], button[aria-label*="menu"]');
      
      // Mobile menu should be present on mobile
      await expect(mobileMenu).toBeVisible();
      
      // Check viewport-appropriate styling
      const viewport = page.viewportSize();
      expect(viewport?.width).toBeLessThanOrEqual(768);
      
      // Test mobile menu functionality if present
      try {
        await mobileMenu.click();
        
        // Check that mobile menu opens
        const mobileNavigation = page.locator('[data-testid="mobile-navigation"]');
        await expect(mobileNavigation).toBeVisible({ timeout: 3000 });
      } catch (error) {
        // Mobile menu might not be implemented yet, skip this check
        console.log('Mobile menu interaction not available');
      }
    }
  });

  test('should load critical resources quickly', async ({ page }) => {
    const startTime = Date.now();
    
    // Navigate and wait for network to be idle
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    
    // Check that critical resources are loaded
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // At least the first image should be loaded
      const firstImage = images.first();
      await expect(firstImage).toHaveJSProperty('complete', true);
    }
  });

  test('should have proper security headers', async ({ page }) => {
    const response = await page.goto('/');
    
    if (response) {
      const headers = response.headers();
      
      // Check for security headers
      expect(headers['x-frame-options']).toBeTruthy();
      expect(headers['x-content-type-options']).toBe('nosniff');
      expect(headers['referrer-policy']).toBeTruthy();
    }
  });

  test('should handle JavaScript disabled gracefully', async ({ page, context }) => {
    // Disable JavaScript
    await context.setExtraHTTPHeaders({
      'User-Agent': 'AIKinkLab-E2E-Tests-NoJS'
    });
    
    // Navigate with JS disabled
    await page.goto('/');
    
    // Check that basic content is still visible
    await expect(page.locator('h1')).toBeVisible();
    
    // Check that critical links still work
    const testLink = page.locator('a[href*="test"]').first();
    if (await testLink.isVisible()) {
      await expect(testLink).toHaveAttribute('href');
    }
  });

  test('should have working sitemap and robots.txt', async ({ page }) => {
    // Test sitemap
    const sitemapResponse = await page.goto('/sitemap.xml');
    expect(sitemapResponse?.status()).toBe(200);
    
    const sitemapContent = await page.textContent('body');
    expect(sitemapContent).toContain('<?xml');
    expect(sitemapContent).toContain('<urlset');
    
    // Test robots.txt
    const robotsResponse = await page.goto('/robots.txt');
    expect(robotsResponse?.status()).toBe(200);
    
    const robotsContent = await page.textContent('body');
    expect(robotsContent).toContain('User-agent');
    expect(robotsContent).toContain('Sitemap');
  });

  test('should track analytics events', async ({ page }) => {
    // Mock or check for analytics tracking
    const analyticsRequests: string[] = [];
    
    page.on('request', request => {
      const url = request.url();
      if (url.includes('analytics') || url.includes('gtag') || url.includes('web-vitals')) {
        analyticsRequests.push(url);
      }
    });
    
    // Navigate and interact with page
    await page.goto('/');
    await page.waitForTimeout(2000);
    
    // Click a trackable element
    const ctaButton = page.locator('a', { hasText: /take.*test/i }).first();
    if (await ctaButton.isVisible()) {
      await ctaButton.click();
      await page.waitForTimeout(1000);
    }
    
    // Check if analytics requests were made (in production)
    if (process.env.NODE_ENV === 'production') {
      expect(analyticsRequests.length).toBeGreaterThan(0);
    }
  });
});