// Global setup for Playwright tests
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting E2E test setup...');
  
  const baseURL = config.projects[0].use.baseURL || 'http://localhost:3000';
  
  // Wait for the development server to be ready
  await waitForServer(baseURL);
  
  // Perform any global setup tasks
  await setupTestData();
  
  console.log('✅ E2E test setup completed');
}

async function waitForServer(url: string, timeout: number = 120000): Promise<void> {
  const start = Date.now();
  
  while (Date.now() - start < timeout) {
    try {
      const response = await fetch(`${url}/api/health`);
      if (response.ok) {
        console.log('✅ Server is ready');
        return;
      }
    } catch (error) {
      // Server not ready yet, continue waiting
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  throw new Error(`Server at ${url} did not start within ${timeout}ms`);
}

async function setupTestData(): Promise<void> {
  console.log('🔧 Setting up test data...');
  
  // Create a browser instance for setup tasks
  const browser = await chromium.launch();
  const context = await browser.newContext();
  
  try {
    // Clear any existing test data
    await clearTestData(context);
    
    // Seed test data if needed
    await seedTestData(context);
    
  } finally {
    await context.close();
    await browser.close();
  }
  
  console.log('✅ Test data setup completed');
}

async function clearTestData(context: any): Promise<void> {
  const page = await context.newPage();
  
  try {
    // Clear local storage and session storage
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    
    // Clear any test-specific cookies
    await context.clearCookies();
    
  } finally {
    await page.close();
  }
}

async function seedTestData(context: any): Promise<void> {
  // Add any test data seeding logic here
  // For example, create test user accounts, populate test content, etc.
  
  const page = await context.newPage();
  
  try {
    // Navigate to the app
    await page.goto('/');
    
    // Set up any required test state
    await page.evaluate(() => {
      // Example: Set test environment flag
      localStorage.setItem('test-environment', 'true');
    });
    
  } finally {
    await page.close();
  }
}

export default globalSetup;