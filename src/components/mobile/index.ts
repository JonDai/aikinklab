// Mobile UI Components for AIKinkLab
// Optimized for "Intimate Aurora" color system with enhanced touch interactions

// Navigation Components
export { 
  BottomNavigation, 
  MobilePageWrapper, 
  useSafeArea 
} from './BottomNavigation';

// Test Components
export { 
  MobileTestCard, 
  MobileTestCardSkeleton, 
  MobileTestGrid 
} from './MobileTestCard';

// Progress Components
export { MobileProgressIndicator } from './MobileProgressIndicator';

// Results Components
export { MobileResultsDisplay } from './MobileResultsDisplay';

// Performance Optimizations
export {
  // Virtual Scrolling
  useVirtualScrolling,
  VirtualList,
  
  // Optimized Images
  OptimizedImage,
  
  // Lazy Loading
  useLazyLoading,
  LazyLoad,
  
  // Performance Monitoring
  usePerformanceMonitor,
  PerformanceMetrics,
  
  // Search & Filtering
  useDebouncedSearch,
  OptimizedList,
  
  // Image Preloading
  useImagePreloader
} from './MobilePerformanceOptimizations';

// Touch Interactions
export {
  // Gesture Hooks
  useSwipeGesture,
  useLongPress,
  usePullToRefresh,
  useDoubleTap,
  usePinchZoom,
  
  // Touch Components
  Draggable,
  TouchRipple,
  SwipeableCard,
  TouchButton,
  TouchQuizOption
} from './TouchInteractionUtils';

// Type definitions for TypeScript support
export interface MobileBreakpoints {
  xs: '320px';   // iPhone SE
  sm: '375px';   // iPhone Standard
  md: '414px';   // iPhone Plus
  lg: '768px';   // iPad
  xl: '1024px';  // Large tablets
}

export interface TouchEventHandlers {
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
  onTouchCancel?: (e: React.TouchEvent) => void;
}

export interface SwipeGestureOptions {
  threshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export interface LongPressOptions {
  delay?: number;
  onStart?: () => void;
  onCancel?: () => void;
}

// Aurora Color System constants for mobile components
export const AURORA_COLORS = {
  primary: {
    light: 'rgba(155, 127, 255, 0.8)',
    main: '#9b7fff',
    dark: 'rgba(155, 127, 255, 0.6)',
    glow: 'rgba(155, 127, 255, 0.3)'
  },
  secondary: {
    light: 'rgba(255, 107, 71, 0.8)',
    main: '#ff6b47',
    dark: 'rgba(255, 107, 71, 0.6)',
    glow: 'rgba(255, 107, 71, 0.3)'
  },
  accent: {
    light: 'rgba(0, 212, 255, 0.8)',
    main: '#00d4ff',
    dark: 'rgba(0, 212, 255, 0.6)',
    glow: 'rgba(0, 212, 255, 0.3)'
  },
  surface: {
    900: '#0f0b1a',
    800: '#1e1b2e',
    700: '#3f3f46',
    600: '#52525b'
  }
} as const;

// Mobile-specific configuration constants
export const MOBILE_CONFIG = {
  // Touch targets
  minTouchTarget: 44,
  recommendedTouchTarget: 48,
  
  // Responsive breakpoints
  breakpoints: {
    xs: 320,
    sm: 375,
    md: 414,
    lg: 768,
    xl: 1024
  },
  
  // Animation durations (optimized for mobile)
  animations: {
    fast: 200,
    normal: 300,
    slow: 500
  },
  
  // Safe area insets
  safeArea: {
    top: 'env(safe-area-inset-top)',
    bottom: 'env(safe-area-inset-bottom)',
    left: 'env(safe-area-inset-left)',
    right: 'env(safe-area-inset-right)'
  }
} as const;