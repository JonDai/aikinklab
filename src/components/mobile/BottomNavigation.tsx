'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, User, Settings, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: number;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Lab', href: '/lab', icon: Search },
  { name: 'Test', href: '/test', icon: PlayCircle },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-900/90 backdrop-blur-xl border-t border-surface-700/30 safe-area-pb shadow-glass-prominent">
      {/* Enhanced Aurora glow effect for active navigation */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 touch-target min-w-[60px]"
            >
              {/* Enhanced Active indicator with Aurora glow */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-br from-primary-500/25 via-primary-500/15 to-accent-500/10 rounded-xl shadow-glow-primary border border-primary-500/20"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}
              
              {/* Icon with Aurora glow effect */}
              <div className={`relative transition-all duration-300 ${
                isActive 
                  ? 'text-primary-400 scale-110' 
                  : 'text-surface-400 hover:text-surface-300 active:scale-95'
              }`}>
                <item.icon 
                  size={24} 
                  className={`transition-all duration-300 ${
                    isActive ? 'drop-shadow-[0_0_8px_rgba(155,127,255,0.6)]' : ''
                  }`}
                />
                
                {/* Enhanced Badge indicator with Aurora styling */}
                {item.badge && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-secondary-500 to-secondary-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-glow-secondary border border-secondary-400/30"
                  >
                    {item.badge}
                  </motion.div>
                )}
              </div>
              
              {/* Label */}
              <span className={`text-xs font-medium mt-1 transition-all duration-300 ${
                isActive 
                  ? 'text-primary-400' 
                  : 'text-surface-500'
              }`}>
                {item.name}
              </span>
              
              {/* Touch feedback */}
              <div className="absolute inset-0 rounded-xl bg-surface-700/0 active:bg-surface-700/30 transition-colors duration-150" />
            </Link>
          );
        })}
      </div>
      
      {/* Safe area padding for devices with home indicator */}
      <div className="h-[env(safe-area-inset-bottom)] bg-surface-900/95" />
    </nav>
  );
}

// Utility for safe area padding
export function useSafeArea() {
  return {
    paddingTop: 'env(safe-area-inset-top)',
    paddingBottom: 'env(safe-area-inset-bottom)',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
  };
}

// Mobile navigation wrapper for pages
export function MobilePageWrapper({ 
  children, 
  showBottomNav = true 
}: { 
  children: React.ReactNode;
  showBottomNav?: boolean;
}) {
  return (
    <div className="min-h-screen relative">
      <div className={`${showBottomNav ? 'pb-20 md:pb-4' : ''}`}>
        {children}
      </div>
      {showBottomNav && (
        <div className="md:hidden">
          <BottomNavigation />
        </div>
      )}
    </div>
  );
}