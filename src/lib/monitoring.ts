// Monitoring and observability utilities
import { NextRequest, NextResponse } from 'next/server';

// Performance monitoring
export class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map();
  
  static startTimer(label: string): () => number {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      this.recordMetric(label, duration);
      return duration;
    };
  }
  
  static recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const values = this.metrics.get(name)!;
    values.push(value);
    
    // Keep only last 100 measurements
    if (values.length > 100) {
      values.shift();
    }
  }
  
  static getMetrics(): Record<string, any> {
    const result: Record<string, any> = {};
    
    this.metrics.forEach((values, name) => {
      if (values.length === 0) return;
      
      const sorted = [...values].sort((a, b) => a - b);
      const sum = values.reduce((a, b) => a + b, 0);
      
      result[name] = {
        count: values.length,
        min: Math.min(...values),
        max: Math.max(...values),
        avg: sum / values.length,
        median: sorted[Math.floor(sorted.length / 2)],
        p95: sorted[Math.floor(sorted.length * 0.95)],
        p99: sorted[Math.floor(sorted.length * 0.99)]
      };
    });
    
    return result;
  }
}

// Error tracking
export class ErrorTracker {
  private static errors: Array<{
    timestamp: Date;
    message: string;
    stack?: string;
    context?: any;
    level: 'error' | 'warning' | 'info';
  }> = [];
  
  static logError(error: Error, context?: any): void {
    this.errors.push({
      timestamp: new Date(),
      message: error.message,
      stack: error.stack,
      context,
      level: 'error'
    });
    
    // Keep only last 1000 errors
    if (this.errors.length > 1000) {
      this.errors.shift();
    }
    
    // In production, send to external monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.sendToSentry(error, context);
    }
    
    console.error('Error logged:', error.message, context);
  }
  
  static logWarning(message: string, context?: any): void {
    this.errors.push({
      timestamp: new Date(),
      message,
      context,
      level: 'warning'
    });
    
    console.warn('Warning logged:', message, context);
  }
  
  static logInfo(message: string, context?: any): void {
    this.errors.push({
      timestamp: new Date(),
      message,
      context,
      level: 'info'
    });
    
    console.info('Info logged:', message, context);
  }
  
  private static sendToSentry(error: Error, context?: any): void {
    // Sentry integration would go here
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        tags: {
          component: 'ErrorTracker'
        },
        extra: context
      });
    }
  }
  
  static getErrors(level?: 'error' | 'warning' | 'info'): typeof this.errors {
    if (level) {
      return this.errors.filter(e => e.level === level);
    }
    return [...this.errors];
  }
  
  static getErrorSummary(): Record<string, number> {
    const summary: Record<string, number> = {
      total: this.errors.length,
      errors: 0,
      warnings: 0,
      info: 0
    };
    
    this.errors.forEach(error => {
      summary[error.level + 's']++;
    });
    
    return summary;
  }
}

// Request tracking
export class RequestTracker {
  private static requests: Array<{
    timestamp: Date;
    method: string;
    url: string;
    duration: number;
    status: number;
    userAgent?: string;
    ip?: string;
  }> = [];
  
  static trackRequest(
    request: NextRequest,
    response: NextResponse,
    duration: number
  ): void {
    this.requests.push({
      timestamp: new Date(),
      method: request.method,
      url: request.url,
      duration,
      status: response.status,
      userAgent: request.headers.get('user-agent') || undefined,
      ip: this.getClientIP(request)
    });
    
    // Keep only last 10000 requests
    if (this.requests.length > 10000) {
      this.requests.shift();
    }
  }
  
  private static getClientIP(request: NextRequest): string | undefined {
    return (
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      undefined
    );
  }
  
  static getRequestStats(): Record<string, any> {
    if (this.requests.length === 0) {
      return { totalRequests: 0 };
    }
    
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const recentRequests = this.requests.filter(r => r.timestamp > oneHourAgo);
    
    const statusCodes: Record<string, number> = {};
    const methods: Record<string, number> = {};
    let totalDuration = 0;
    
    recentRequests.forEach(req => {
      statusCodes[req.status] = (statusCodes[req.status] || 0) + 1;
      methods[req.method] = (methods[req.method] || 0) + 1;
      totalDuration += req.duration;
    });
    
    return {
      totalRequests: this.requests.length,
      recentRequests: recentRequests.length,
      averageResponseTime: recentRequests.length > 0 ? totalDuration / recentRequests.length : 0,
      statusCodes,
      methods,
      requestsPerMinute: recentRequests.length / 60
    };
  }
}

// Health check utilities
export class HealthChecker {
  private static checks: Map<string, () => Promise<boolean>> = new Map();
  
  static registerCheck(name: string, checkFn: () => Promise<boolean>): void {
    this.checks.set(name, checkFn);
  }
  
  static async runHealthChecks(): Promise<{
    status: 'healthy' | 'unhealthy';
    checks: Record<string, boolean>;
    timestamp: Date;
  }> {
    const results: Record<string, boolean> = {};
    
    for (const [name, checkFn] of this.checks.entries()) {
      try {
        results[name] = await Promise.race([
          checkFn(),
          new Promise<boolean>((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 5000)
          )
        ]);
      } catch (error) {
        results[name] = false;
        ErrorTracker.logError(
          error instanceof Error ? error : new Error('Health check failed'),
          { healthCheck: name }
        );
      }
    }
    
    const allHealthy = Object.values(results).every(result => result === true);
    
    return {
      status: allHealthy ? 'healthy' : 'unhealthy',
      checks: results,
      timestamp: new Date()
    };
  }
  
  static getSystemInfo(): Record<string, any> {
    return {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    };
  }
}

// Initialize default health checks
HealthChecker.registerCheck('memory', async () => {
  const usage = process.memoryUsage();
  const usedMB = usage.heapUsed / 1024 / 1024;
  return usedMB < 512; // Alert if using more than 512MB
});

HealthChecker.registerCheck('response-time', async () => {
  const metrics = PerformanceMonitor.getMetrics();
  const apiMetrics = metrics['api-response'];
  if (!apiMetrics) return true;
  
  return apiMetrics.avg < 1000; // Alert if average response time > 1s
});

// Web Vitals tracking (client-side)
export const trackWebVitals = (metric: any) => {
  if (typeof window === 'undefined') return;
  
  const body = JSON.stringify(metric);
  
  // Send to analytics endpoint
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/web-vitals', body);
  } else {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
      keepalive: true
    }).catch(console.error);
  }
};

// Usage analytics
export class UsageAnalytics {
  private static events: Array<{
    timestamp: Date;
    event: string;
    data?: any;
    sessionId?: string;
    userId?: string;
  }> = [];
  
  static trackEvent(
    event: string,
    data?: any,
    sessionId?: string,
    userId?: string
  ): void {
    this.events.push({
      timestamp: new Date(),
      event,
      data,
      sessionId,
      userId
    });
    
    // Keep only last 50000 events
    if (this.events.length > 50000) {
      this.events.splice(0, 10000);
    }
  }
  
  static getEventStats(): Record<string, any> {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const recentEvents = this.events.filter(e => e.timestamp > oneDayAgo);
    
    const eventCounts: Record<string, number> = {};
    const uniqueSessions = new Set<string>();
    
    recentEvents.forEach(event => {
      eventCounts[event.event] = (eventCounts[event.event] || 0) + 1;
      if (event.sessionId) {
        uniqueSessions.add(event.sessionId);
      }
    });
    
    return {
      totalEvents: this.events.length,
      recentEvents: recentEvents.length,
      eventCounts,
      uniqueSessions: uniqueSessions.size,
      eventsPerHour: recentEvents.length / 24
    };
  }
}