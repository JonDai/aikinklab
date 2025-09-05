import { NextRequest, NextResponse } from 'next/server';
import { PerformanceMonitor, ErrorTracker } from '@/lib/monitoring';

// Web Vitals endpoint for collecting performance metrics
export async function POST(request: NextRequest) {
  try {
    const webVital = await request.json();
    
    // Validate the web vital data
    if (!webVital || !webVital.name || !webVital.value) {
      return NextResponse.json(
        { error: 'Invalid web vital data' },
        { status: 400 }
      );
    }
    
    // Record the metric
    PerformanceMonitor.recordMetric(`web-vitals-${webVital.name}`, webVital.value);
    
    // Store additional context
    const context = {
      id: webVital.id,
      name: webVital.name,
      value: webVital.value,
      rating: webVital.rating,
      delta: webVital.delta,
      url: request.headers.get('referer') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      timestamp: new Date().toISOString()
    };
    
    // Log significant performance issues
    if (webVital.rating === 'poor') {
      ErrorTracker.logWarning(
        `Poor ${webVital.name} performance: ${webVital.value}`,
        context
      );
    }
    
    // In production, you might want to send this data to an analytics service
    if (process.env.NODE_ENV === 'production') {
      // Send to Google Analytics, Mixpanel, or other analytics service
      await sendToAnalyticsService(context);
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
    
  } catch (error) {
    ErrorTracker.logError(
      error instanceof Error ? error : new Error('Web vitals collection failed'),
      { endpoint: '/api/analytics/web-vitals' }
    );
    
    return NextResponse.json(
      { error: 'Failed to process web vital' },
      { status: 500 }
    );
  }
}

async function sendToAnalyticsService(webVital: any): Promise<void> {
  try {
    // Example: Send to Google Analytics 4
    if (process.env.GA_MEASUREMENT_ID) {
      const response = await fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: webVital.id,
            events: [
              {
                name: 'web_vital',
                params: {
                  metric_name: webVital.name,
                  metric_value: webVital.value,
                  metric_rating: webVital.rating,
                  page_location: webVital.url,
                },
              },
            ],
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`GA4 request failed: ${response.status}`);
      }
    }
    
    // Example: Send to custom analytics endpoint
    if (process.env.CUSTOM_ANALYTICS_ENDPOINT) {
      await fetch(process.env.CUSTOM_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ANALYTICS_API_KEY}`,
        },
        body: JSON.stringify({
          event_type: 'web_vital',
          ...webVital,
        }),
      });
    }
  } catch (error) {
    // Don't fail the main request if analytics fails
    ErrorTracker.logWarning(
      'Failed to send web vital to analytics service',
      { error: error instanceof Error ? error.message : 'Unknown error', webVital }
    );
  }
}

// GET endpoint for retrieving web vitals statistics
export async function GET(request: NextRequest) {
  try {
    const metrics = PerformanceMonitor.getMetrics();
    
    // Filter for web vitals metrics
    const webVitalsMetrics = Object.keys(metrics)
      .filter(key => key.startsWith('web-vitals-'))
      .reduce((obj, key) => {
        obj[key.replace('web-vitals-', '')] = metrics[key];
        return obj;
      }, {} as Record<string, any>);
    
    // Calculate Core Web Vitals summary
    const coreWebVitals = {
      LCP: webVitalsMetrics.LCP,
      FID: webVitalsMetrics.FID, 
      CLS: webVitalsMetrics.CLS,
      FCP: webVitalsMetrics.FCP,
      TTFB: webVitalsMetrics.TTFB
    };
    
    // Determine overall performance rating
    const getOverallRating = () => {
      if (!coreWebVitals.LCP || !coreWebVitals.CLS) return 'unknown';
      
      const lcpGood = coreWebVitals.LCP.avg <= 2500;
      const clsGood = coreWebVitals.CLS.avg <= 0.1;
      const fidGood = !coreWebVitals.FID || coreWebVitals.FID.avg <= 100;
      
      if (lcpGood && clsGood && fidGood) return 'good';
      if (!lcpGood || !clsGood || !fidGood) return 'needs-improvement';
      return 'poor';
    };
    
    return NextResponse.json({
      coreWebVitals,
      allMetrics: webVitalsMetrics,
      overallRating: getOverallRating(),
      timestamp: new Date().toISOString(),
      sampleSize: Object.values(webVitalsMetrics).reduce((sum, metric) => 
        sum + (metric?.count || 0), 0
      )
    });
    
  } catch (error) {
    ErrorTracker.logError(
      error instanceof Error ? error : new Error('Web vitals retrieval failed'),
      { endpoint: '/api/analytics/web-vitals', method: 'GET' }
    );
    
    return NextResponse.json(
      { error: 'Failed to retrieve web vitals' },
      { status: 500 }
    );
  }
}