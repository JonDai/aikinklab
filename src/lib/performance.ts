// Performance optimization utilities
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Web Vitals reporting
export function reportWebVitals(onPerfEntry?: (metric: any) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
}

// Image optimization utilities
export class ImageOptimizer {
  // Generate responsive image sizes
  static generateSrcSet(src: string, sizes: number[] = [640, 750, 828, 1080, 1200, 1920]): string {
    return sizes
      .map(size => `${src}?w=${size} ${size}w`)
      .join(', ');
  }

  // Get optimal image format
  static getOptimalFormat(userAgent: string): 'avif' | 'webp' | 'jpg' {
    if (userAgent.includes('Chrome') && userAgent.includes('Avif')) {
      return 'avif';
    }
    if (userAgent.includes('WebP') || userAgent.includes('Chrome')) {
      return 'webp';
    }
    return 'jpg';
  }

  // Calculate image priority based on viewport
  static shouldPriorityLoad(element: HTMLImageElement): boolean {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Priority load images in the first viewport
    return rect.top < viewportHeight;
  }

  // Lazy loading intersection observer
  static createLazyLoadObserver(callback: (entries: IntersectionObserverEntry[]) => void): IntersectionObserver {
    return new IntersectionObserver(callback, {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    });
  }
}

// Bundle analysis utilities
export class BundleAnalyzer {
  static analyzeChunkSizes(): Promise<any> {
    if (typeof window === 'undefined') return Promise.resolve({});

    return import('webpack-bundle-analyzer/lib/analyzer')
      .then((analyzer) => {
        // This would analyze the bundle in development
        return analyzer.analyzeBundle('.next/static/chunks');
      })
      .catch(() => ({}));
  }

  // Check for unused dependencies
  static getUnusedDependencies(): string[] {
    // This would require build-time analysis
    // Return empty array for now
    return [];
  }

  // Calculate bundle size impact
  static calculateSizeImpact(beforeSize: number, afterSize: number): {
    difference: number;
    percentage: number;
    impact: 'positive' | 'negative' | 'neutral';
  } {
    const difference = afterSize - beforeSize;
    const percentage = (difference / beforeSize) * 100;
    
    return {
      difference,
      percentage,
      impact: difference < 0 ? 'positive' : difference > 0 ? 'negative' : 'neutral'
    };
  }
}

// Resource loading optimization
export class ResourceLoader {
  private static preloadedResources = new Set<string>();
  private static prefetchedResources = new Set<string>();

  // Preload critical resources
  static preloadResource(href: string, as: string, type?: string): void {
    if (typeof window === 'undefined' || this.preloadedResources.has(href)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;

    document.head.appendChild(link);
    this.preloadedResources.add(href);
  }

  // Prefetch resources for future navigation
  static prefetchResource(href: string): void {
    if (typeof window === 'undefined' || this.prefetchedResources.has(href)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;

    document.head.appendChild(link);
    this.prefetchedResources.add(href);
  }

  // Preconnect to external domains
  static preconnectDomain(domain: string): void {
    if (typeof window === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;

    document.head.appendChild(link);
  }

  // Load JavaScript dynamically with performance tracking
  static async loadScript(src: string): Promise<void> {
    const startTime = performance.now();
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        const loadTime = performance.now() - startTime;
        console.log(`Script ${src} loaded in ${loadTime.toFixed(2)}ms`);
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
}

// CSS optimization utilities
export class CSSOptimizer {
  // Remove unused CSS classes (would require build-time integration)
  static removeUnusedCSS(): void {
    // This would integrate with PurgeCSS or similar
    console.log('CSS optimization would run at build time');
  }

  // Critical CSS detection
  static extractCriticalCSS(): string[] {
    if (typeof window === 'undefined') return [];

    const criticalElements = document.querySelectorAll('*');
    const criticalClasses = new Set<string>();

    criticalElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isAboveFold = rect.top < window.innerHeight;
      
      if (isAboveFold) {
        element.classList.forEach((className) => {
          criticalClasses.add(className);
        });
      }
    });

    return Array.from(criticalClasses);
  }

  // Inline critical CSS
  static inlineCriticalCSS(css: string): void {
    if (typeof window === 'undefined') return;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
}

// Performance monitoring
export class PerformanceMetrics {
  private static metrics = new Map<string, number[]>();

  // Record custom performance metrics
  static recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    this.metrics.get(name)!.push(value);
  }

  // Get performance summary
  static getPerformanceSummary(): Record<string, any> {
    const summary: Record<string, any> = {};

    // Navigation timing
    if (typeof window !== 'undefined' && performance.timing) {
      const timing = performance.timing;
      summary.navigationTiming = {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        loadComplete: timing.loadEventEnd - timing.navigationStart,
        domInteractive: timing.domInteractive - timing.navigationStart,
        ttfb: timing.responseStart - timing.navigationStart
      };
    }

    // Custom metrics
    this.metrics.forEach((values, name) => {
      if (values.length > 0) {
        summary[name] = {
          count: values.length,
          average: values.reduce((a, b) => a + b, 0) / values.length,
          min: Math.min(...values),
          max: Math.max(...values)
        };
      }
    });

    return summary;
  }

  // Performance observer for monitoring long tasks
  static observeLongTasks(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'longtask') {
            this.recordMetric('longTask', entry.duration);
            console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`);
          }
        }
      });
      
      observer.observe({ entryTypes: ['longtask'] });
    } catch (error) {
      console.warn('Long task observer not supported');
    }
  }

  // Memory usage monitoring
  static getMemoryUsage(): any {
    if (typeof window === 'undefined' || !(performance as any).memory) {
      return null;
    }

    const memory = (performance as any).memory;
    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      usedPercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
    };
  }
}

// Service Worker utilities for caching
export class ServiceWorkerManager {
  // Register service worker for caching
  static async register(): Promise<void> {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }

  // Update cache strategy
  static async updateCache(cacheName: string, resources: string[]): Promise<void> {
    if ('caches' in window) {
      const cache = await caches.open(cacheName);
      await cache.addAll(resources);
    }
  }

  // Clear old caches
  static async clearOldCaches(currentCacheNames: string[]): Promise<void> {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      const oldCaches = cacheNames.filter(name => !currentCacheNames.includes(name));
      
      await Promise.all(
        oldCaches.map(cacheName => caches.delete(cacheName))
      );
    }
  }
}

// Initialize performance monitoring on client
if (typeof window !== 'undefined') {
  // Start monitoring long tasks
  PerformanceMetrics.observeLongTasks();

  // Preconnect to external domains
  ResourceLoader.preconnectDomain('https://fonts.googleapis.com');
  ResourceLoader.preconnectDomain('https://fonts.gstatic.com');
  ResourceLoader.preconnectDomain('https://www.google-analytics.com');

  // Register service worker in production
  if (process.env.NODE_ENV === 'production') {
    ServiceWorkerManager.register();
  }
}