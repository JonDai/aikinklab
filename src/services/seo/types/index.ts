// Core SEO Types and Interfaces

export interface SEOOptimizationConfig {
  websiteUrl: string
  businessDescription: string
  targetLocations?: string[]
  focusKeywords?: string[]
  optimizationLevel: 'basic' | 'comprehensive' | 'aggressive'
}

export interface SEOOptimizationResult {
  success: boolean
  keywordsGenerated: number
  pagesCreated: number
  technicalIssuesFixed: number
  performanceImprovements: PerformanceImprovement[]
  errors: SEOError[]
  completedAt: Date
}

export interface PerformanceImprovement {
  metric: string
  beforeValue: number
  afterValue: number
  improvement: number
}

export interface SEOError {
  type: 'keyword_research' | 'content_generation' | 'technical_seo' | 'performance'
  message: string
  details?: any
  timestamp: Date
}

// Agent Interfaces
export interface SEOAgent {
  id: string
  name: string
  status: AgentStatus
  execute(task: SEOTask): Promise<AgentResult>
  getCapabilities(): string[]
}

export interface SEOTask {
  id: string
  type: TaskType
  priority: number
  data: any
  createdAt: Date
  assignedAgent?: string
}

export interface AgentResult {
  success: boolean
  data?: any
  error?: string
  executionTime: number
  timestamp: Date
}

export enum AgentStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  ERROR = 'error',
  COMPLETED = 'completed'
}

export enum TaskType {
  KEYWORD_RESEARCH = 'keyword_research',
  CONTENT_GENERATION = 'content_generation',
  TECHNICAL_AUDIT = 'technical_audit',
  PERFORMANCE_OPTIMIZATION = 'performance_optimization',
  MONITORING = 'monitoring'
}

// Keyword Types
export interface Keyword {
  id: string
  term: string
  category: KeywordCategory
  intent: SearchIntent
  difficulty: number
  volume: number
  commercialValue: number
  localRelevance?: number
  priority: number
  targetLocation?: string
}

export enum KeywordCategory {
  EMERGENCY = 'emergency',
  SERVICE = 'service',
  PROBLEM = 'problem',
  LOCAL = 'local',
  COMMERCIAL = 'commercial'
}

export enum SearchIntent {
  INFORMATIONAL = 'informational',
  NAVIGATIONAL = 'navigational',
  TRANSACTIONAL = 'transactional',
  COMMERCIAL = 'commercial'
}

export interface CategorizedKeywords {
  emergency: string[]
  service: string[]
  problem: string[]
  local: string[]
  commercial: string[]
}

export interface PrioritizedKeywords {
  highPriority: Keyword[]
  mediumPriority: Keyword[]
  lowPriority: Keyword[]
}

// Content Types
export interface LandingPageContent {
  title: string
  description: string
  content: string
  headings: HeadingStructure[]
  localReferences: LocalReference[]
  faqSection: FAQ[]
  callToAction: CTA[]
  schemaMarkup?: SchemaMarkup
}

export interface HeadingStructure {
  level: number
  text: string
  keywords: string[]
}

export interface LocalReference {
  type: 'landmark' | 'cultural' | 'demographic' | 'geographic'
  name: string
  description: string
  relevance: number
}

export interface FAQ {
  question: string
  answer: string
  keywords: string[]
}

export interface CTA {
  text: string
  url: string
  type: 'primary' | 'secondary'
}

export interface SchemaMarkup {
  type: string
  data: Record<string, any>
}

// Technical SEO Types
export interface TechnicalSEOAudit {
  robotsTxtIssues: Issue[]
  sitemapIssues: Issue[]
  schemaMarkupMissing: string[]
  mobileCompatibilityIssues: Issue[]
  crawlabilityIssues: Issue[]
  loadingSpeedIssues: Issue[]
  score: number
}

export interface Issue {
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  recommendation: string
  affectedPages?: string[]
}

// Performance Types
export interface PageSpeedAnalysis {
  url: string
  mobileScore: number
  desktopScore: number
  coreWebVitals: CoreWebVitals
  opportunities: Opportunity[]
  diagnostics: Diagnostic[]
}

export interface CoreWebVitals {
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
}

export interface Opportunity {
  id: string
  title: string
  description: string
  savings: number
  priority: 'high' | 'medium' | 'low'
}

export interface Diagnostic {
  id: string
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
}

// Monitoring Types
export interface PerformanceMetrics {
  pageId: string
  rankings: KeywordRanking[]
  traffic: TrafficMetrics
  conversions: ConversionMetrics
  coreWebVitals: CoreWebVitals
  lastUpdated: Date
}

export interface KeywordRanking {
  keyword: string
  position: number
  url: string
  searchEngine: string
  location?: string
  date: Date
}

export interface TrafficMetrics {
  sessions: number
  pageviews: number
  bounceRate: number
  avgSessionDuration: number
  organicTraffic: number
}

export interface ConversionMetrics {
  conversions: number
  conversionRate: number
  revenue: number
  goalCompletions: number
}