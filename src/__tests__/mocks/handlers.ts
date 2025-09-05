import { http, HttpResponse } from 'msw'

// Mock API handlers for testing
export const handlers = [
  // Mock test results API
  http.post('/api/test/submit', async ({ request }) => {
    const body = await request.json()
    
    // Validate request body
    if (!body || typeof body !== 'object' || !body.answers) {
      return new HttpResponse(
        JSON.stringify({ error: 'Invalid request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Mock result based on answers
    const mockResult = {
      id: 'mock-result-id-12345',
      personality: 'dominance',
      scores: {
        dominance: 75,
        submission: 25,
        adventurousness: 60,
        empathy: 40,
        trustLevel: 85
      },
      description: 'You tend to take a leading role in relationships and enjoy guiding experiences.',
      recommendations: [
        'Practice active communication about boundaries',
        'Explore leadership roles in intimate settings',
        'Consider power exchange dynamics',
        'Focus on consent and safety protocols'
      ],
      createdAt: new Date().toISOString()
    }

    return HttpResponse.json(mockResult, { status: 201 })
  }),

  // Mock test results retrieval
  http.get('/api/test/results/:id', ({ params }) => {
    const { id } = params

    if (!id || typeof id !== 'string') {
      return new HttpResponse(
        JSON.stringify({ error: 'Invalid result ID' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Mock different results based on ID
    const mockResults = {
      'dominant-test-123': {
        id: 'dominant-test-123',
        personality: 'dominance',
        scores: {
          dominance: 85,
          submission: 15,
          adventurousness: 70,
          empathy: 50,
          trustLevel: 90
        },
        description: 'You demonstrate strong dominant tendencies with high leadership qualities.',
        recommendations: [
          'Focus on communication and consent',
          'Explore advanced leadership dynamics',
          'Practice negotiation skills',
          'Study power exchange psychology'
        ]
      },
      'submissive-test-456': {
        id: 'submissive-test-456', 
        personality: 'submission',
        scores: {
          dominance: 20,
          submission: 80,
          adventurousness: 45,
          empathy: 85,
          trustLevel: 75
        },
        description: 'You find fulfillment in following your partner\'s lead with strong empathy.',
        recommendations: [
          'Establish clear boundaries and safe words',
          'Practice self-advocacy skills',
          'Build trust gradually',
          'Learn about aftercare importance'
        ]
      }
    }

    const result = mockResults[id as keyof typeof mockResults]
    
    if (!result) {
      return new HttpResponse(
        JSON.stringify({ error: 'Result not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return HttpResponse.json(result)
  }),

  // Mock analytics/tracking endpoints
  http.post('/api/analytics/event', async ({ request }) => {
    const body = await request.json()
    
    // Just acknowledge the tracking event
    return HttpResponse.json({ 
      success: true, 
      eventId: 'mock-event-' + Date.now() 
    })
  }),

  // Mock feedback submission
  http.post('/api/feedback', async ({ request }) => {
    const body = await request.json()
    
    if (!body || !body.message) {
      return new HttpResponse(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return HttpResponse.json({
      id: 'feedback-' + Date.now(),
      message: 'Thank you for your feedback!',
      status: 'received'
    })
  }),

  // Mock content/articles API
  http.get('/api/articles', () => {
    const mockArticles = [
      {
        id: 'am-i-dominant-or-submissive-guide',
        title: 'Am I Dominant or Submissive? Complete Guide',
        slug: 'am-i-dominant-or-submissive-guide',
        excerpt: 'Discover your natural inclinations in power exchange dynamics...',
        publishedAt: '2025-08-04',
        category: 'guide'
      },
      {
        id: 'what-is-my-kink-test',
        title: 'What Is My Kink? Take Our Free Test',
        slug: 'what-is-my-kink-test', 
        excerpt: 'Explore your preferences with our comprehensive kink personality test...',
        publishedAt: '2025-08-04',
        category: 'test'
      }
    ]

    return HttpResponse.json(mockArticles)
  }),

  // Mock single article retrieval
  http.get('/api/articles/:slug', ({ params }) => {
    const { slug } = params

    const mockArticle = {
      id: slug,
      title: 'Mock Article Title',
      slug,
      content: '<p>This is mock article content for testing purposes.</p>',
      excerpt: 'This is a mock article excerpt...',
      publishedAt: '2025-08-04',
      category: 'guide',
      readingTime: 5,
      tags: ['test', 'guide', 'psychology']
    }

    return HttpResponse.json(mockArticle)
  }),

  // Mock newsletter subscription
  http.post('/api/newsletter/subscribe', async ({ request }) => {
    const body = await request.json()
    
    if (!body || !body.email) {
      return new HttpResponse(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return new HttpResponse(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return HttpResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      email: body.email
    })
  }),

  // Mock contact form submission
  http.post('/api/contact', async ({ request }) => {
    const body = await request.json()
    
    const requiredFields = ['name', 'email', 'message']
    const missingFields = requiredFields.filter(field => !body || !body[field])
    
    if (missingFields.length > 0) {
      return new HttpResponse(
        JSON.stringify({ 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return HttpResponse.json({
      success: true,
      message: 'Your message has been sent successfully',
      id: 'contact-' + Date.now()
    })
  }),

  // Mock error scenarios for testing error handling
  http.get('/api/test/error-500', () => {
    return new HttpResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }),

  http.get('/api/test/error-network', () => {
    // Simulate network error by not responding
    return HttpResponse.error()
  }),

  // Mock slow response for testing loading states
  http.get('/api/test/slow', async () => {
    await new Promise(resolve => setTimeout(resolve, 3000))
    return HttpResponse.json({ message: 'Slow response received' })
  })
]