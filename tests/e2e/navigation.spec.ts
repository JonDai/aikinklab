import { test, expect } from '@playwright/test';

test.describe('Navigation Link Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to be fully loaded
    await expect(page).toHaveTitle(/AIKinkLab/);
  });

  test('Logo links to homepage', async ({ page }) => {
    // Click logo and verify it navigates to homepage
    const logo = page.getByTestId('logo').or(page.locator('a[href="/"]').first());
    await logo.click();
    await expect(page).toHaveURL('/');
  });

  test('Primary navigation links work correctly', async ({ page }) => {
    const navigationLinks = [
      { text: 'Home', href: '/' },
      { text: 'Test', href: '/test' },
      { text: 'BDSM Test', href: '/bdsm-test' },
      { text: 'Lab', href: '/lab' },
      { text: 'About', href: '/about' },
      { text: 'Contact', href: '/contact' }
    ];

    for (const link of navigationLinks) {
      console.log(`Testing navigation link: ${link.text} -> ${link.href}`);
      
      // Find the link by text or href
      const linkElement = page.getByRole('link', { name: link.text })
        .or(page.locator(`a[href="${link.href}"]`))
        .first();
      
      // Check if link exists and is visible
      await expect(linkElement).toBeVisible();
      
      // Click the link
      await linkElement.click();
      
      // Verify navigation
      await expect(page).toHaveURL(new RegExp(link.href.replace('/', '\\/?')));
      
      // Go back to homepage for next test
      if (link.href !== '/') {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
      }
    }
  });

  test('Footer navigation links work correctly', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const footerLinks = [
      { text: 'Privacy Policy', href: '/privacy-policy' },
      { text: 'Terms of Service', href: '/terms' },
      { text: 'About', href: '/about' },
      { text: 'Contact', href: '/contact' }
    ];

    for (const link of footerLinks) {
      console.log(`Testing footer link: ${link.text} -> ${link.href}`);
      
      // Find the footer link
      const footerLinkElement = page.locator('footer').getByRole('link', { name: link.text })
        .or(page.locator(`footer a[href="${link.href}"]`))
        .first();
      
      if (await footerLinkElement.isVisible()) {
        await footerLinkElement.click();
        await expect(page).toHaveURL(new RegExp(link.href.replace('/', '\\/?')));
        
        // Go back to homepage
        await page.goto('/');
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(500);
      }
    }
  });

  test('Breadcrumb navigation works on nested pages', async ({ page }) => {
    // Navigate to a nested page (like lab article)
    await page.goto('/lab');
    
    // Check if breadcrumbs exist
    const breadcrumbs = page.locator('nav[aria-label="breadcrumb"]').or(page.locator('.breadcrumb'));
    
    if (await breadcrumbs.isVisible()) {
      // Click home breadcrumb
      const homeBreadcrumb = breadcrumbs.getByRole('link', { name: /home/i });
      if (await homeBreadcrumb.isVisible()) {
        await homeBreadcrumb.click();
        await expect(page).toHaveURL('/');
      }
    }
  });

  test('Mobile navigation menu works', async ({ page, isMobile }) => {
    if (!isMobile) {
      // Set mobile viewport for desktop testing
      await page.setViewportSize({ width: 375, height: 667 });
    }

    // Look for mobile menu button (hamburger menu)
    const mobileMenuButton = page.getByRole('button', { name: /menu/i })
      .or(page.locator('[data-testid="mobile-menu-button"]'))
      .or(page.locator('button[aria-label*="menu"]'))
      .first();

    if (await mobileMenuButton.isVisible()) {
      // Open mobile menu
      await mobileMenuButton.click();
      
      // Check if mobile menu is visible
      const mobileMenu = page.locator('[data-testid="mobile-menu"]')
        .or(page.locator('.mobile-menu'))
        .or(page.locator('nav[aria-label="Mobile menu"]'));
      
      await expect(mobileMenu).toBeVisible();
      
      // Test a mobile menu link
      const mobileTestLink = mobileMenu.getByRole('link', { name: /test/i }).first();
      if (await mobileTestLink.isVisible()) {
        await mobileTestLink.click();
        await expect(page).toHaveURL(/\/test/);
      }
    }
  });

  test('External links open in new tab', async ({ page, context }) => {
    // Look for external links (social media, external resources)
    const externalLinks = await page.locator('a[target="_blank"]').all();
    
    if (externalLinks.length > 0) {
      const externalLink = externalLinks[0];
      
      // Listen for new page (tab)
      const pagePromise = context.waitForEvent('page');
      
      await externalLink.click();
      
      const newPage = await pagePromise;
      await newPage.waitForLoadState();
      
      // Verify new page opened
      expect(context.pages().length).toBe(2);
      
      // Close the new tab
      await newPage.close();
    }
  });

  test('All navigation links are accessible', async ({ page }) => {
    // Check for keyboard navigation
    await page.keyboard.press('Tab');
    
    // Get all focusable navigation elements
    const focusableElements = await page.locator('nav a, nav button').all();
    
    for (let i = 0; i < Math.min(focusableElements.length, 10); i++) {
      const element = focusableElements[i];
      
      // Check if element has proper accessibility attributes
      const ariaLabel = await element.getAttribute('aria-label');
      const text = await element.textContent();
      
      // Element should have either text content or aria-label
      expect(ariaLabel || text?.trim()).toBeTruthy();
      
      // Element should be focusable
      await element.focus();
      await expect(element).toBeFocused();
    }
  });
});