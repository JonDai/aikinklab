/**
 * Utility functions for SEO operations
 */

/**
 * Generate a unique ID for SEO entities
 */
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 9)
  return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`
}

/**
 * Slugify a string for URL-safe usage
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Calculate keyword density in content
 */
export function calculateKeywordDensity(content: string, keyword: string): number {
  const words = content.toLowerCase().split(/\s+/)
  const keywordWords = keyword.toLowerCase().split(/\s+/)
  const totalWords = words.length
  
  if (totalWords === 0) return 0
  
  let matches = 0
  for (let i = 0; i <= words.length - keywordWords.length; i++) {
    const phrase = words.slice(i, i + keywordWords.length).join(' ')
    if (phrase === keyword.toLowerCase()) {
      matches++
    }
  }
  
  return (matches / totalWords) * 100
}

/**
 * Extract headings from HTML content
 */
export function extractHeadings(html: string): Array<{ level: number; text: string }> {
  const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi
  const headings: Array<{ level: number; text: string }> = []
  let match
  
  while ((match = headingRegex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      text: match[2].replace(/<[^>]*>/g, '').trim() // Strip HTML tags
    })
  }
  
  return headings
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Clean and normalize text content
 */
export function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\n+/g, '\n') // Replace multiple newlines with single newline
    .trim()
}

/**
 * Calculate reading time for content
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * Generate meta description from content
 */
export function generateMetaDescription(content: string, maxLength: number = 160): string {
  const cleaned = cleanText(content.replace(/<[^>]*>/g, '')) // Strip HTML
  if (cleaned.length <= maxLength) {
    return cleaned
  }
  
  // Find the last complete sentence within the limit
  const truncated = cleaned.substr(0, maxLength)
  const lastSentence = truncated.lastIndexOf('.')
  
  if (lastSentence > maxLength * 0.7) { // If we can keep most of the content
    return truncated.substr(0, lastSentence + 1)
  }
  
  // Otherwise, truncate at word boundary
  const lastSpace = truncated.lastIndexOf(' ')
  return truncated.substr(0, lastSpace) + '...'
}

/**
 * Score content quality based on various factors
 */
export function scoreContentQuality(content: string, targetKeyword?: string): {
  score: number
  factors: Record<string, number>
} {
  const factors: Record<string, number> = {}
  
  // Length score (0-25 points)
  const wordCount = content.split(/\s+/).length
  if (wordCount >= 1000) factors.length = 25
  else if (wordCount >= 500) factors.length = 20
  else if (wordCount >= 300) factors.length = 15
  else if (wordCount >= 150) factors.length = 10
  else factors.length = 5
  
  // Readability score (0-25 points)
  const sentences = content.split(/[.!?]+/).length
  const avgWordsPerSentence = wordCount / sentences
  if (avgWordsPerSentence <= 20) factors.readability = 25
  else if (avgWordsPerSentence <= 25) factors.readability = 20
  else if (avgWordsPerSentence <= 30) factors.readability = 15
  else factors.readability = 10
  
  // Structure score (0-25 points)
  const headings = extractHeadings(content)
  if (headings.length >= 3) factors.structure = 25
  else if (headings.length >= 2) factors.structure = 20
  else if (headings.length >= 1) factors.structure = 15
  else factors.structure = 5
  
  // Keyword optimization score (0-25 points)
  if (targetKeyword) {
    const density = calculateKeywordDensity(content, targetKeyword)
    if (density >= 1 && density <= 3) factors.keywordOptimization = 25
    else if (density >= 0.5 && density <= 5) factors.keywordOptimization = 20
    else if (density > 0) factors.keywordOptimization = 15
    else factors.keywordOptimization = 5
  } else {
    factors.keywordOptimization = 15 // Neutral score if no target keyword
  }
  
  const score = Object.values(factors).reduce((sum, value) => sum + value, 0)
  
  return { score, factors }
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

/**
 * Throttle function for rate limiting
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}