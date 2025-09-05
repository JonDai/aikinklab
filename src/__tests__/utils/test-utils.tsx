import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Mock providers wrapper
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Common test data factories
export const createMockTest = (overrides = {}) => ({
  id: 1,
  question: 'Test question?',
  options: [
    { id: 'a', text: 'Option A', value: 'test-value-a' },
    { id: 'b', text: 'Option B', value: 'test-value-b' },
    { id: 'c', text: 'Option C', value: 'test-value-c' },
    { id: 'd', text: 'Option D', value: 'test-value-d' },
  ],
  ...overrides,
})

export const createMockTestSuite = (count = 3) => {
  return Array.from({ length: count }, (_, index) => createMockTest({
    id: index + 1,
    question: `Test question ${index + 1}?`,
  }))
}

export const createMockAnswers = () => ({
  1: 'a',
  2: 'b', 
  3: 'c',
})

// Mock router for navigation tests
export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
}

// Helper to wait for async operations
export const waitForLoadingToFinish = () => 
  new Promise(resolve => setTimeout(resolve, 0))