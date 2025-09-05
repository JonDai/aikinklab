/**
 * Service Worker registration and management utilities
 */

export interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  isControlling: boolean;
  registration?: ServiceWorkerRegistration;
}

/**
 * Register service worker with proper error handling
 */
export async function registerServiceWorker(): Promise<ServiceWorkerState> {
  const state: ServiceWorkerState = {
    isSupported: false,
    isRegistered: false,
    isControlling: false
  };

  // Check if service workers are supported
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return state;
  }

  state.isSupported = true;

  try {
    // Register the service worker
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'imports'
    });

    state.isRegistered = true;
    state.registration = registration;
    state.isControlling = !!navigator.serviceWorker.controller;

    console.log('Service Worker registered successfully');

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New version available
            console.log('New version available');
            
            // Notify user about update
            if (typeof window !== 'undefined' && 'Notification' in window) {
              showUpdateNotification();
            }
          }
        });
      }
    });

    // Handle controller changes
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('Service Worker controller changed');
      // Reload page to get latest version
      window.location.reload();
    });

    // Check for updates periodically
    setInterval(() => {
      registration.update();
    }, 60000); // Check every minute

  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }

  return state;
}

/**
 * Show update notification to user
 */
function showUpdateNotification(): void {
  // Create a simple in-app notification
  const notification = document.createElement('div');
  notification.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: #D946EF;
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 320px;
    ">
      <div style="font-weight: 600; margin-bottom: 8px;">Update Available</div>
      <div style="font-size: 14px; margin-bottom: 12px;">A new version of AIKinkLab is available.</div>
      <button onclick="this.parentElement.parentElement.remove(); window.location.reload();" style="
        background: rgba(255,255,255,0.2);
        border: 1px solid rgba(255,255,255,0.3);
        color: white;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 8px;
      ">Update Now</button>
      <button onclick="this.parentElement.parentElement.remove();" style="
        background: transparent;
        border: 1px solid rgba(255,255,255,0.3);
        color: white;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
      ">Later</button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 30 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.parentElement.removeChild(notification);
    }
  }, 30000);
}

/**
 * Unregister service worker
 */
export async function unregisterServiceWorker(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.unregister();
      console.log('Service Worker unregistered');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Service Worker unregistration failed:', error);
    return false;
  }
}

/**
 * Clear all caches
 */
export async function clearAllCaches(): Promise<boolean> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return false;
  }

  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    
    // Also message service worker to clear its caches
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CLEAR_CACHE'
      });
    }
    
    console.log('All caches cleared');
    return true;
  } catch (error) {
    console.error('Failed to clear caches:', error);
    return false;
  }
}

/**
 * Get cache usage statistics
 */
export async function getCacheStats(): Promise<{
  cacheNames: string[];
  totalSize: number;
  cacheDetails: Array<{ name: string; size: number; entries: number }>;
}> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return {
      cacheNames: [],
      totalSize: 0,
      cacheDetails: []
    };
  }

  try {
    const cacheNames = await caches.keys();
    const cacheDetails = [];
    let totalSize = 0;

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      let cacheSize = 0;

      // Estimate cache size (this is approximate)
      for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
          const text = await response.text();
          cacheSize += new Blob([text]).size;
        }
      }

      cacheDetails.push({
        name: cacheName,
        size: cacheSize,
        entries: requests.length
      });

      totalSize += cacheSize;
    }

    return {
      cacheNames,
      totalSize,
      cacheDetails
    };
  } catch (error) {
    console.error('Failed to get cache stats:', error);
    return {
      cacheNames: [],
      totalSize: 0,
      cacheDetails: []
    };
  }
}

/**
 * Check if app is running in standalone mode (PWA)
 */
export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

/**
 * Auto-register service worker in production
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    registerServiceWorker();
  });
}