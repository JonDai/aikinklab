'use client';

import { useEffect } from 'react';
import { initWebVitals } from '@/lib/performance';

/**
 * Performance monitoring component
 * Automatically tracks Core Web Vitals and performance metrics
 */
export function PerformanceMonitor() {
  useEffect(() => {
    // Initialize Web Vitals tracking
    initWebVitals();

    // Track page visibility changes for better performance insights
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Page is being hidden - good time to send any pending analytics
        if ('sendBeacon' in navigator && process.env.NODE_ENV === 'production') {
          // Send any pending performance data before page unload
          navigator.sendBeacon('/api/analytics/performance', JSON.stringify({
            event: 'page_hidden',
            timestamp: Date.now(),
            url: window.location.href
          }));
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track navigation type for performance context
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const navigationType = navigation.type;
      console.log(`📊 Navigation type: ${navigationType}`);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // This component renders nothing - it's purely for side effects
  return null;
}

export default PerformanceMonitor;