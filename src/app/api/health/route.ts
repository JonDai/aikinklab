import { NextRequest, NextResponse } from 'next/server';
import { HealthChecker, PerformanceMonitor, ErrorTracker, RequestTracker } from '@/lib/monitoring';

// Health check endpoint
export async function GET(request: NextRequest) {
  const timer = PerformanceMonitor.startTimer('health-check');
  
  try {
    // Run all health checks
    const healthResults = await HealthChecker.runHealthChecks();
    
    // Get system information
    const systemInfo = HealthChecker.getSystemInfo();
    
    // Get performance metrics
    const performanceMetrics = PerformanceMonitor.getMetrics();
    
    // Get request statistics
    const requestStats = RequestTracker.getRequestStats();
    
    // Get error summary
    const errorSummary = ErrorTracker.getErrorSummary();
    
    const response = {
      status: healthResults.status,
      timestamp: healthResults.timestamp,
      system: systemInfo,
      health: healthResults.checks,
      performance: performanceMetrics,
      requests: requestStats,
      errors: errorSummary,
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV,
      deployment: {
        vercel: {
          region: process.env.VERCEL_REGION || 'unknown',
          url: process.env.VERCEL_URL || 'unknown'
        }
      }
    };
    
    const duration = timer();
    PerformanceMonitor.recordMetric('health-check-duration', duration);
    
    return NextResponse.json(response, {
      status: healthResults.status === 'healthy' ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    ErrorTracker.logError(
      error instanceof Error ? error : new Error(errorMessage),
      { endpoint: '/api/health' }
    );
    
    timer(); // End timer even on error
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date(),
        error: errorMessage,
        system: HealthChecker.getSystemInfo()
      },
      { status: 503 }
    );
  }
}

// Detailed health check for monitoring systems
export async function POST(request: NextRequest) {
  try {
    const { includeDetails = false } = await request.json();
    
    const healthResults = await HealthChecker.runHealthChecks();
    
    let response: any = {
      status: healthResults.status,
      timestamp: healthResults.timestamp,
      checks: healthResults.checks
    };
    
    if (includeDetails) {
      response = {
        ...response,
        system: HealthChecker.getSystemInfo(),
        performance: PerformanceMonitor.getMetrics(),
        requests: RequestTracker.getRequestStats(),
        errors: ErrorTracker.getErrorSummary()
      };
    }
    
    return NextResponse.json(response, {
      status: healthResults.status === 'healthy' ? 200 : 503
    });
    
  } catch (error) {
    ErrorTracker.logError(
      error instanceof Error ? error : new Error('Health check POST failed'),
      { endpoint: '/api/health', method: 'POST' }
    );
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}