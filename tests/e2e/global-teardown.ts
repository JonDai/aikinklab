// Global teardown for Playwright tests
import { chromium, FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting E2E test teardown...');
  
  // Perform cleanup tasks
  await cleanupTestData();
  
  // Generate test reports
  await generateTestReports();
  
  console.log('✅ E2E test teardown completed');
}

async function cleanupTestData(): Promise<void> {
  console.log('🗑️  Cleaning up test data...');
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  
  try {
    const page = await context.newPage();
    
    // Navigate to the app and clean up any test data
    await page.goto('/');
    
    // Clear test-specific local storage
    await page.evaluate(() => {
      // Remove test environment flag
      localStorage.removeItem('test-environment');
      
      // Clear any test-specific data
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('test-')) {
          localStorage.removeItem(key);
        }
      });
      
      // Clear session storage
      sessionStorage.clear();
    });
    
    // Clear cookies
    await context.clearCookies();
    
    await page.close();
    
  } catch (error) {
    console.warn('Failed to cleanup test data:', error);
  } finally {
    await context.close();
    await browser.close();
  }
  
  console.log('✅ Test data cleanup completed');
}

async function generateTestReports(): Promise<void> {
  console.log('📊 Generating test reports...');
  
  try {
    const fs = require('fs');
    const path = require('path');
    
    const reportDir = 'test-results';
    
    // Ensure report directory exists
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    
    // Generate summary report
    const summaryPath = path.join(reportDir, 'test-summary.json');
    const summary = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'test',
      baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
      testSuite: 'E2E Tests',
      completed: true
    };
    
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    
    console.log(`✅ Test summary generated: ${summaryPath}`);
    
  } catch (error) {
    console.warn('Failed to generate test reports:', error);
  }
}

export default globalTeardown;