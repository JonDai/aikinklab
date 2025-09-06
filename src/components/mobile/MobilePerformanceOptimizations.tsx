'use client';

import { useState, useEffect, useMemo, useCallback, memo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Virtual Scrolling Hook
export function useVirtualScrolling<T>(
  items: T[],
  containerHeight: number,
  itemHeight: number,
  overscan: number = 5
) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(
      items.length,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
    return { start, end };
  }, [scrollTop, containerHeight, itemHeight, overscan, items.length]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end).map((item, index) => ({
      item,
      index: visibleRange.start + index,
    }));
  }, [items, visibleRange]);

  const totalHeight = items.length * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY: visibleRange.start * itemHeight,
    setScrollTop,
  };
}

// Virtual List Component
interface VirtualListProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  overscan?: number;
}

export function VirtualList<T>({
  items,
  height,
  itemHeight,
  renderItem,
  className = '',
  overscan = 5,
}: VirtualListProps<T>) {
  const { visibleItems, totalHeight, offsetY, setScrollTop } = useVirtualScrolling(
    items,
    height,
    itemHeight,
    overscan
  );

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, [setScrollTop]);

  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ height }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map(({ item, index }) => (
            <div key={index} style={{ height: itemHeight }}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Optimized Image Component with lazy loading
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = false,
  quality = 75,
  placeholder = 'blur',
  blurDataURL
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate low-quality placeholder if not provided
  const defaultBlurDataURL = useMemo(() => {
    if (blurDataURL) return blurDataURL;
    
    // Create a simple low-quality base64 placeholder
    const canvas = document.createElement('canvas');
    canvas.width = 40;
    canvas.height = 30;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 40, 30);
      gradient.addColorStop(0, 'rgba(155, 127, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(255, 107, 71, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 40, 30);
    }
    return canvas.toDataURL('image/jpeg', 0.1);
  }, [blurDataURL]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        {isLoading && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-surface-800/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
          >
            <div className="loading-spinner w-8 h-8" />
          </motion.div>
        )}
      </AnimatePresence>

      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={defaultBlurDataURL}
          className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
      ) : (
        <div className="w-full h-full bg-surface-800/30 rounded-xl flex items-center justify-center">
          <div className="text-surface-500 text-sm">Image failed to load</div>
        </div>
      )}
    </div>
  );
});

// Lazy Loading Hook
export function useLazyLoading(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: '50px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [element, threshold]);

  return [setElement, isVisible] as const;
}

// Lazy Loading Component
interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  threshold?: number;
}

export function LazyLoad({ children, fallback, className = '', threshold = 0.1 }: LazyLoadProps) {
  const [setElement, isVisible] = useLazyLoading(threshold);

  return (
    <div ref={setElement} className={className}>
      {isVisible ? children : (fallback || <div className="loading-skeleton h-32 w-full rounded-xl" />)}
    </div>
  );
}

// Performance Monitor Hook
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fps: 60,
    memoryUsage: 0,
    loadTime: 0,
    renderTime: 0
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (currentTime - lastTime))
        }));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    // Start FPS monitoring
    measureFPS();

    // Memory usage (if supported)
    if ('memory' in performance) {
      const updateMemory = () => {
        const memory = (performance as any).memory;
        setMetrics(prev => ({
          ...prev,
          memoryUsage: Math.round(memory.usedJSHeapSize / 1024 / 1024)
        }));
      };
      
      const memoryInterval = setInterval(updateMemory, 2000);
      
      return () => {
        cancelAnimationFrame(animationId);
        clearInterval(memoryInterval);
      };
    }

    return () => cancelAnimationFrame(animationId);
  }, []);

  return metrics;
}

// Debounced Search Hook
export function useDebouncedSearch(initialValue = '', delay = 300) {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return [value, debouncedValue, setValue] as const;
}

// Optimized List Component with search and filtering
interface OptimizedListProps<T> {
  items: T[];
  searchFields: (keyof T)[];
  renderItem: (item: T, index: number, searchTerm: string) => React.ReactNode;
  filterFunction?: (item: T, searchTerm: string) => boolean;
  placeholder?: string;
  className?: string;
  itemHeight?: number;
  maxHeight?: number;
}

export function OptimizedList<T extends Record<string, any>>({
  items,
  searchFields,
  renderItem,
  filterFunction,
  placeholder = "Search...",
  className = '',
  itemHeight = 80,
  maxHeight = 400
}: OptimizedListProps<T>) {
  const [searchTerm, debouncedSearchTerm, setSearchTerm] = useDebouncedSearch();

  const filteredItems = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return items;

    return items.filter(item => {
      if (filterFunction) {
        return filterFunction(item, debouncedSearchTerm);
      }

      return searchFields.some(field => {
        const value = item[field];
        return value && 
          String(value).toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      });
    });
  }, [items, debouncedSearchTerm, searchFields, filterFunction]);

  return (
    <div className={className}>
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="input-modern w-full"
        />
      </div>

      {/* Results */}
      {filteredItems.length > 0 ? (
        <VirtualList
          items={filteredItems}
          height={Math.min(maxHeight, filteredItems.length * itemHeight)}
          itemHeight={itemHeight}
          renderItem={(item, index) => renderItem(item, index, debouncedSearchTerm)}
          className="custom-scrollbar"
        />
      ) : (
        <div className="text-center py-8 text-surface-400">
          <p>No items found matching "{debouncedSearchTerm}"</p>
        </div>
      )}
    </div>
  );
}

// Image Preloader Hook
export function useImagePreloader(imageSrcs: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set(prev).add(src));
          resolve();
        };
        img.onerror = () => {
          setFailedImages(prev => new Set(prev).add(src));
          reject();
        };
        img.src = src;
      });
    };

    // Preload images with a limit to avoid overwhelming the browser
    const batchSize = 3;
    const preloadBatch = async (batch: string[]) => {
      await Promise.allSettled(batch.map(preloadImage));
    };

    const preloadAllImages = async () => {
      for (let i = 0; i < imageSrcs.length; i += batchSize) {
        const batch = imageSrcs.slice(i, i + batchSize);
        await preloadBatch(batch);
      }
    };

    preloadAllImages();
  }, [imageSrcs]);

  return { loadedImages, failedImages };
}

// Performance Metrics Display (for development)
export function PerformanceMetrics() {
  const metrics = usePerformanceMonitor();
  const [isVisible, setIsVisible] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="btn-ghost text-xs p-2 rounded-lg bg-surface-900/90 border border-surface-700/50"
      >
        📊 Metrics
      </button>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-2 p-3 bg-surface-900/95 backdrop-blur-lg border border-surface-700/50 rounded-lg text-xs space-y-1"
          >
            <div>FPS: <span className={metrics.fps < 30 ? 'text-error' : 'text-success'}>{metrics.fps}</span></div>
            <div>Memory: <span className="text-surface-300">{metrics.memoryUsage}MB</span></div>
            <div>Load: <span className="text-surface-300">{metrics.loadTime}ms</span></div>
            <div>Render: <span className="text-surface-300">{metrics.renderTime}ms</span></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}