# AIKinkLab Testing Strategy & Guidelines

## Overview

This document outlines the comprehensive testing strategy for AIKinkLab, a Next.js 14 application providing AI-powered personality and kink testing. Our testing approach ensures reliability, prevents regressions, and maintains high quality standards for this sensitive application.

## Testing Architecture

### Test Pyramid Structure

```
    /\
   /  \ E2E Tests (Few)
  /    \ - Critical user journeys
 /      \ - Cross-browser testing
/________\ - Performance & accessibility
|        |
|        | Integration Tests (Some)
|        | - Feature workflows
|        | - API integrations
|        | - Component interactions
|________|
|        |
|        | Unit Tests (Many)
|        | - Business logic
|        | - Utility functions
|        | - Component behavior
|________|
```

## Testing Frameworks & Tools

### Core Testing Stack
- **Jest**: Unit and integration testing framework
- **React Testing Library**: Component testing with user-centric approach
- **Playwright**: End-to-end testing across browsers
- **MSW (Mock Service Worker)**: API mocking for reliable tests
- **@testing-library/jest-dom**: Custom Jest matchers for DOM testing

### Quality Assurance Tools
- **ESLint + Testing plugins**: Code quality and testing best practices
- **Lighthouse CI**: Performance and accessibility monitoring
- **Axe-core**: Automated accessibility testing
- **Codecov**: Test coverage reporting
- **Snyk**: Security vulnerability scanning

## Project Structure

```
├── src/
│   ├── __tests__/
│   │   ├── setup.ts                 # Jest configuration
│   │   ├── utils/
│   │   │   └── test-utils.tsx       # Testing utilities
│   │   ├── unit/                    # Unit tests
│   │   │   ├── components/          # Component tests
│   │   │   └── test-utils.test.ts   # Business logic tests
│   │   ├── integration/             # Integration tests
│   │   │   └── test-workflow.test.tsx
│   │   └── mocks/                   # MSW mocks
│   │       ├── handlers.ts          # API mock handlers
│   │       ├── server.ts            # Node.js MSW server
│   │       └── browser.ts           # Browser MSW worker
├── e2e/                            # E2E tests
│   ├── test-taking-journey.spec.ts # Main user flow
│   ├── accessibility.spec.ts       # A11y tests
│   └── performance.spec.ts         # Performance tests
├── .github/workflows/              # CI/CD pipelines
│   ├── test.yml                    # Main test pipeline
│   └── performance.yml             # Performance monitoring
├── jest.config.js                  # Jest configuration
├── playwright.config.ts            # Playwright configuration
└── .lighthouserc.js               # Lighthouse CI config
```

## Running Tests

### Development Commands

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Run specific test types
npm run test:unit
npm run test:integration
npm run test:e2e

# Generate coverage report
npm run test:coverage

# Run E2E tests with UI
npm run test:e2e:ui

# Run all tests (CI simulation)
npm run test:all
```

### CI/CD Commands

```bash
# Run tests in CI mode
npm run test:ci

# Run E2E tests headlessly
npm run test:e2e

# Run performance tests
npm run test:performance
```

## Testing Guidelines

### Unit Tests

**What to Test:**
- Business logic functions (test-utils.ts)
- Component behavior and user interactions
- Edge cases and error handling
- Input validation and sanitization

**Best Practices:**
- Use descriptive test names: `should calculate dominant personality for leadership answers`
- Follow Arrange-Act-Assert pattern
- Test behavior, not implementation details
- Mock external dependencies
- Aim for 80%+ code coverage

**Example:**
```typescript
describe('calculateTestResults', () => {
  it('should calculate results for dominant personality', () => {
    // Arrange
    const answers = { 1: 'a', 2: 'a', 3: 'a', 4: 'a', 5: 'c' }
    
    // Act
    const result = calculateTestResults(answers)
    
    // Assert
    expect(result.personality).toBe('dominance')
    expect(result.dominance).toBeGreaterThan(40)
    expect(result.recommendations).toHaveLength(4)
  })
})
```

### Component Tests

**What to Test:**
- User interactions (clicking, typing)
- Component rendering with different props
- Conditional rendering logic
- Form validation and submission
- Accessibility features

**Best Practices:**
- Use `render` from our custom test-utils
- Query by accessible selectors (text, role, label)
- Simulate real user interactions
- Test error states and loading states
- Verify keyboard navigation

**Example:**
```typescript
test('should navigate to next question when option selected', () => {
  render(<TestPage />)
  
  // User selects an option
  fireEvent.click(screen.getByText('Lead and guide your partner'))
  expect(screen.getByText('Lead and guide your partner').closest('button'))
    .toHaveClass('selected')
  
  // User clicks next
  fireEvent.click(screen.getByRole('button', { name: /next/i }))
  
  // Verify navigation
  expect(screen.getByText('Question 2 / 5')).toBeInTheDocument()
})
```

### Integration Tests

**What to Test:**
- Complete user workflows
- Component interaction chains
- State management across components
- API integration with mocked responses
- Error handling in realistic scenarios

**Best Practices:**
- Test complete user journeys
- Use realistic test data
- Mock API responses with MSW
- Test both happy and error paths
- Verify state persistence

### E2E Tests

**What to Test:**
- Critical user paths (homepage → test → results)
- Cross-browser compatibility
- Mobile responsiveness
- Performance metrics
- Accessibility compliance
- Real user scenarios

**Best Practices:**
- Test from user's perspective
- Use page object model for complex flows
- Test on multiple browsers and devices
- Include visual regression testing
- Monitor performance metrics

**Example:**
```typescript
test('should complete the homepage to results flow', async ({ page }) => {
  // Navigate from homepage
  await page.goto('/')
  await page.click('text=Take the Test')
  
  // Complete test
  const answers = ['Lead and guide your partner', /* ... */]
  for (const answer of answers) {
    await page.click(`text=${answer}`)
    await page.click('button:has-text("Next")')
  }
  
  // Verify results
  await page.waitForURL(/\/results\/[a-z0-9]+/)
})
```

## Test Data & Mocking

### MSW API Mocking

We use Mock Service Worker to intercept and mock API requests:

- **Handlers**: Define mock responses in `src/__tests__/mocks/handlers.ts`
- **Server**: Node.js server for Jest tests
- **Browser**: Service worker for development/E2E tests

**Example Mock:**
```typescript
http.post('/api/test/submit', async ({ request }) => {
  const body = await request.json()
  return HttpResponse.json({
    id: 'mock-result-123',
    personality: 'dominance',
    scores: { dominance: 75, /* ... */ },
    recommendations: ['Practice communication', /* ... */]
  })
})
```

### Test Data Factories

Use factories to create consistent test data:

```typescript
export const createMockTest = (overrides = {}) => ({
  id: 1,
  question: 'Test question?',
  options: [
    { id: 'a', text: 'Option A', value: 'test-value-a' }
  ],
  ...overrides
})
```

## Performance Testing

### Core Web Vitals Monitoring

We track essential performance metrics:

- **First Contentful Paint (FCP)**: < 2s
- **Largest Contentful Paint (LCP)**: < 2.5s  
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3s
- **Total Blocking Time (TBT)**: < 300ms

### Lighthouse CI

Automated performance auditing:
- Performance score: ≥ 80
- Accessibility score: ≥ 90
- Best practices score: ≥ 80
- SEO score: ≥ 90

## Accessibility Testing

### Automated A11y Testing

Using @axe-core/playwright for automated accessibility auditing:

- Color contrast compliance
- Keyboard navigation support
- Screen reader compatibility
- ARIA labels and roles
- Focus management

### Manual Testing Checklist

- [ ] Keyboard-only navigation works
- [ ] Screen reader announces content properly
- [ ] High contrast mode supported
- [ ] Text scales up to 200% without issues
- [ ] Focus indicators are visible
- [ ] Alternative text for images provided

## Security Testing

### Vulnerability Scanning

- **Snyk**: Dependency vulnerability scanning
- **npm audit**: Package security audit
- **Manual security review**: Input validation, XSS prevention

### Content Safety

Special considerations for adult content platform:
- Content appropriateness validation
- Privacy and anonymity protection
- Age verification workflows
- User safety features testing

## CI/CD Quality Gates

### Automated Checks

1. **Code Quality**: ESLint, TypeScript compilation
2. **Unit Tests**: 80%+ coverage required
3. **Integration Tests**: Critical workflows pass
4. **E2E Tests**: Cross-browser user journeys
5. **Security**: Vulnerability scan passes
6. **Performance**: Lighthouse scores meet thresholds
7. **Accessibility**: No critical a11y violations

### Branch Protection

- All tests must pass before merging
- Code review required
- Coverage report on PRs
- Performance regression detection

## Monitoring & Alerts

### Production Monitoring

- **Real User Monitoring (RUM)**: Core Web Vitals tracking
- **Error Tracking**: JavaScript error monitoring
- **Performance Alerts**: Regression detection
- **Uptime Monitoring**: Service availability

## Testing Best Practices

### Do's ✅

- Write tests before fixing bugs (TDD approach)
- Test user behavior, not implementation
- Use descriptive test names
- Keep tests isolated and independent
- Mock external dependencies
- Test edge cases and error scenarios
- Maintain test data factories
- Regular test review and cleanup

### Don'ts ❌

- Don't test implementation details
- Don't write brittle tests that break on minor changes
- Don't skip accessibility testing
- Don't ignore performance implications
- Don't commit failing tests
- Don't over-mock (test realistic scenarios)
- Don't neglect negative test cases

## Debugging Tests

### Common Issues & Solutions

**Test Timeouts:**
```typescript
// Increase timeout for async operations
await waitFor(() => {
  expect(screen.getByText('Result')).toBeInTheDocument()
}, { timeout: 5000 })
```

**MSW Not Working:**
```typescript
// Ensure MSW server is running
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
```

**Async State Updates:**
```typescript
// Wait for loading to complete
await waitForLoadingToFinish()
```

**E2E Flaky Tests:**
```typescript
// Add explicit waits
await page.waitForLoadState('networkidle')
await page.waitForSelector('text=Expected Text')
```

## Contributing to Tests

### Adding New Tests

1. **Identify test category**: Unit, integration, or E2E
2. **Create test file**: Follow naming conventions
3. **Write descriptive tests**: Clear arrange-act-assert
4. **Add to CI**: Ensure tests run in pipeline
5. **Update documentation**: Add to relevant sections

### Code Review Checklist

- [ ] Tests cover new functionality
- [ ] Test names are descriptive
- [ ] Edge cases are tested
- [ ] Mocks are appropriate
- [ ] Tests are fast and reliable
- [ ] Accessibility considerations included

## Resources

### Documentation
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright](https://playwright.dev/)
- [MSW Documentation](https://mswjs.io/)

### Team Contacts
- **Testing Lead**: [Your Name]
- **Accessibility Expert**: [A11y Lead]
- **Performance Specialist**: [Perf Lead]

---

**Last Updated**: 2025-09-05  
**Next Review**: 2025-12-05