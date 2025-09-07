'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, PanInfo, useMotionValue, useSpring } from 'framer-motion';

// Touch Gesture Hooks and Utilities

// Swipe detection hook
export function useSwipeGesture(
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  onSwipeUp?: () => void,
  onSwipeDown?: () => void,
  threshold = 50
) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
    
    if (isHorizontalSwipe) {
      if (distanceX > threshold) onSwipeLeft?.();
      if (distanceX < -threshold) onSwipeRight?.();
    } else {
      if (distanceY > threshold) onSwipeUp?.();
      if (distanceY < -threshold) onSwipeDown?.();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };
}

// Long press detection hook
export function useLongPress(
  onLongPress: () => void,
  delay = 500,
  options?: {
    onStart?: () => void;
    onCancel?: () => void;
  }
) {
  const [isPressed, setIsPressed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    options?.onStart?.();
    setIsPressed(true);
    
    timerRef.current = setTimeout(() => {
      onLongPress();
    }, delay);
  }, [onLongPress, delay, options]);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (isPressed) {
      options?.onCancel?.();
    }
    setIsPressed(false);
  }, [isPressed, options]);

  const handlers = {
    onTouchStart: start,
    onTouchEnd: cancel,
    onTouchCancel: cancel,
    onMouseDown: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
  };

  return { isPressed, handlers };
}

// Pull to refresh hook
export function usePullToRefresh(onRefresh: () => Promise<void> | void, threshold = 80) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      setTouchStart(e.targetTouches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart && containerRef.current?.scrollTop === 0) {
      const currentTouch = e.targetTouches[0].clientY;
      const distance = Math.max(0, currentTouch - touchStart);
      setPullDistance(Math.min(distance, threshold * 1.5));
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    setTouchStart(null);
    setPullDistance(0);
  };

  const pullProgress = Math.min(pullDistance / threshold, 1);

  return {
    containerRef,
    isRefreshing,
    pullDistance,
    pullProgress,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    }
  };
}

// Draggable component with touch support
interface DraggableProps {
  children: React.ReactNode;
  onDragEnd?: (info: PanInfo) => void;
  constrainX?: boolean;
  constrainY?: boolean;
  snapBack?: boolean;
  className?: string;
}

export function Draggable({ 
  children, 
  onDragEnd, 
  constrainX = false, 
  constrainY = false,
  snapBack = true,
  className = ''
}: DraggableProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    onDragEnd?.(info);
    
    if (snapBack) {
      x.set(0);
      y.set(0);
    }
  };

  return (
    <motion.div
      className={className}
      style={{ x: springX, y: springY }}
      drag={constrainX && constrainY ? false : true}
      dragConstraints={constrainX ? { left: 0, right: 0 } : constrainY ? { top: 0, bottom: 0 } : undefined}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
    >
      {children}
    </motion.div>
  );
}

// Touch ripple effect component
interface TouchRippleProps {
  children: React.ReactNode;
  className?: string;
  rippleColor?: string;
  disabled?: boolean;
}

export function TouchRipple({ 
  children, 
  className = '', 
  rippleColor = 'rgba(155, 127, 255, 0.3)',
  disabled = false
}: TouchRippleProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const createRipple = (e: React.TouchEvent | React.MouseEvent) => {
    if (disabled || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
    
    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onTouchStart={createRipple}
      onMouseDown={createRipple}
    >
      {children}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: rippleColor,
          }}
          initial={{
            width: 0,
            height: 0,
            x: -0,
            y: -0,
            opacity: 0.5,
          }}
          animate={{
            width: 300,
            height: 300,
            x: -150,
            y: -150,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

// Swipeable cards component
interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
  threshold?: number;
}

export function SwipeableCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  className = '',
  threshold = 100
}: SwipeableCardProps) {
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    const { offset, velocity } = info;
    const swipe = Math.abs(offset.x) > threshold || Math.abs(velocity.x) > 500;

    if (swipe) {
      if (offset.x > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    } else {
      x.set(0);
    }
  };

  return (
    <motion.div
      className={`${className} touch-none`}
      style={{ x }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      animate={{
        scale: isDragging ? 0.95 : 1,
        rotate: isDragging ? x.get() * 0.1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
      
      {/* Visual indicators */}
      <motion.div
        className="absolute inset-0 bg-success/20 rounded-xl pointer-events-none flex items-center justify-start pl-8"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isDragging && x.get() > 50 ? 1 : 0 
        }}
      >
        <div className="text-success font-bold">ACCEPT</div>
      </motion.div>
      
      <motion.div
        className="absolute inset-0 bg-error/20 rounded-xl pointer-events-none flex items-center justify-end pr-8"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isDragging && x.get() < -50 ? 1 : 0 
        }}
      >
        <div className="text-error font-bold">REJECT</div>
      </motion.div>
    </motion.div>
  );
}

// Double tap detection hook
export function useDoubleTap(onDoubleTap: () => void, delay = 300) {
  const [lastTap, setLastTap] = useState(0);

  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap < delay) {
      onDoubleTap();
    }
    setLastTap(now);
  };

  return { onTouchEnd: handleTap, onClick: handleTap };
}

// Pinch to zoom hook
export function usePinchZoom(minZoom = 0.5, maxZoom = 3) {
  const [scale, setScale] = useState(1);
  const [initialDistance, setInitialDistance] = useState(0);
  const [initialScale, setInitialScale] = useState(1);

  const getDistance = (touches: React.TouchList) => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setInitialDistance(getDistance(e.touches));
      setInitialScale(scale);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling
    
    if (e.touches.length === 2 && initialDistance > 0) {
      const currentDistance = getDistance(e.touches);
      const scaleChange = currentDistance / initialDistance;
      const newScale = Math.min(Math.max(initialScale * scaleChange, minZoom), maxZoom);
      setScale(newScale);
    }
  };

  const handleTouchEnd = () => {
    setInitialDistance(0);
  };

  const resetZoom = () => setScale(1);

  return {
    scale,
    resetZoom,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    }
  };
}

// Touch-friendly button component
interface TouchButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  haptic?: boolean;
}

export function TouchButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  haptic = false
}: TouchButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    
    // Haptic feedback for supported devices
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
    
    onClick?.();
  };

  const baseClasses = 'touch-target transition-all duration-200 font-medium rounded-2xl flex items-center justify-center space-x-2';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost'
  };

  return (
    <TouchRipple className={`${baseClasses} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <motion.button
        onClick={handleClick}
        disabled={disabled}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        onTouchCancel={() => setIsPressed(false)}
        animate={{
          scale: isPressed ? 0.95 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
        className="w-full h-full flex items-center justify-center space-x-2"
      >
        {children}
      </motion.button>
    </TouchRipple>
  );
}

// Enhanced touch feedback for quiz options
interface TouchQuizOptionProps {
  children: React.ReactNode;
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
}

export function TouchQuizOption({
  children,
  selected = false,
  onSelect,
  className = ''
}: TouchQuizOptionProps) {
  const [isPressed, setIsPressed] = useState(false);
  const { isPressed: isLongPressed, handlers: longPressHandlers } = useLongPress(
    () => {
      // Optional: Add long press functionality (e.g., show tooltip)
    },
    800
  );

  return (
    <TouchRipple 
      className={`quiz-option ${selected ? 'selected' : ''} ${className}`}
      rippleColor={selected ? 'rgba(155, 127, 255, 0.4)' : 'rgba(155, 127, 255, 0.2)'}
    >
      <motion.div
        onClick={onSelect}
        {...longPressHandlers}
        onTouchStart={() => {
          setIsPressed(true);
          longPressHandlers.onTouchStart?.();
        }}
        onTouchEnd={() => {
          setIsPressed(false);
          longPressHandlers.onTouchEnd?.();
        }}
        onTouchCancel={() => {
          setIsPressed(false);
          longPressHandlers.onTouchCancel?.();
        }}
        animate={{
          scale: isPressed ? 0.98 : 1,
          backgroundColor: isLongPressed ? 'rgba(155, 127, 255, 0.1)' : undefined,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
        className="w-full h-full cursor-pointer"
      >
        {children}
      </motion.div>
    </TouchRipple>
  );
}