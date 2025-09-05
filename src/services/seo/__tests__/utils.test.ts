/**
 * Tests for SEO utilities
 */

import {
  generateId,
  slugify,
  calculateKeywordDensity,
  extractHeadings,
  isValidUrl,
  cleanText,
  calculateReadingTime,
  generateMetaDescription,
  scoreContentQuality
} from '../utils'

describe('SEO Utils', () => {
  describe('generateId', () => {
    test('should generate unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
    })

    test('should include prefix when provided', () => {
      const id = generateId('test')
      expect(id).toMatch(/^test_/)
    })
  })

  describe('slugify', () => {
    test('should convert text to URL-safe slug', () => {
      expect(slugify('Hello World')).toBe('hello-world')
      expect(slugify('SEO & Marketing!')).toBe('seo-marketing')
      expect(slugify('  Multiple   Spaces  ')).toBe('multiple-spaces')
    })
  })

  describe('calculateKeywordDensity', () => {
    test('should calculate keyword density correctly', () => {
      const content = 'SEO is important. SEO helps websites rank better. Good SEO practices matter.'
      const density = calculateKeywordDensity(content, 'SEO')
      expect(density).toBeCloseTo(23.08, 1) // 3 occurrences in 13 words
    })

    test('should handle empty content', () => {
      expect(calculateKeywordDensity('', 'test')).toBe(0)
    })
  })

  describe('extractHeadings', () => {
    test('should extract headings from HTML', () => {
      const html = '<h1>Title</h1><h2>Subtitle</h2><h3>Section</h3>'
      const headings = extractHeadings(html)
      
      expect(headings).toHaveLength(3)
      expect(headings[0]).toEqual({ level: 1, text: 'Title' })
      expect(headings[1]).toEqual({ level: 2, text: 'Subtitle' })
      expect(headings[2]).toEqual({ level: 3, text: 'Section' })
    })

    test('should handle HTML with attributes', () => {
      const html = '<h1 class="title" id="main">Main Title</h1>'
      const headings = extractHeadings(html)
      
      expect(headings).toHaveLength(1)
      expect(headings[0]).toEqual({ level: 1, text: 'Main Title' })
    })
  })

  describe('isValidUrl', () => {
    test('should validate URLs correctly', () => {
      expect(isValidUrl('https://example.com')).toBe(true)
      expect(isValidUrl('http://example.com')).toBe(true)
      expect(isValidUrl('not-a-url')).toBe(false)
      expect(isValidUrl('')).toBe(false)
    })
  })

  describe('cleanText', () => {
    test('should clean and normalize text', () => {
      const messy = '  Multiple   spaces\n\n\nand   newlines  '
      const clean = cleanText(messy)
      expect(clean).toBe('Multiple spaces\nand newlines')
    })
  })

  describe('calculateReadingTime', () => {
    test('should calculate reading time', () => {
      const content = 'word '.repeat(200) // 200 words
      expect(calculateReadingTime(content)).toBe(1) // 1 minute at 200 wpm
      
      const longContent = 'word '.repeat(600) // 600 words
      expect(calculateReadingTime(longContent)).toBe(3) // 3 minutes at 200 wpm
    })
  })

  describe('generateMetaDescription', () => {
    test('should generate meta description within length limit', () => {
      const content = 'This is a test content. It has multiple sentences. Each sentence adds to the length.'
      const meta = generateMetaDescription(content, 50)
      expect(meta.length).toBeLessThanOrEqual(50)
    })

    test('should preserve complete sentences when possible', () => {
      const content = 'Short sentence. This is a longer sentence that might be truncated.'
      const meta = generateMetaDescription(content, 20)
      expect(meta).toBe('Short sentence.')
    })
  })

  describe('scoreContentQuality', () => {
    test('should score content quality', () => {
      const content = `
        <h1>Title</h1>
        <h2>Subtitle</h2>
        <p>This is a comprehensive article about SEO. SEO is very important for websites. 
        Good SEO practices help improve rankings. The content should be well-structured 
        and informative. It should provide value to readers while being optimized for 
        search engines.</p>
      `
      
      const result = scoreContentQuality(content, 'SEO')
      expect(result.score).toBeGreaterThan(0)
      expect(result.factors).toHaveProperty('length')
      expect(result.factors).toHaveProperty('readability')
      expect(result.factors).toHaveProperty('structure')
      expect(result.factors).toHaveProperty('keywordOptimization')
    })
  })
})