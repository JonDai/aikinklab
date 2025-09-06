'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'framer-motion';

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Lab', href: '/lab' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav className={`bg-surface-900/95 backdrop-blur-xl border-b border-surface-700/40 sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-glass-subtle' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo />
            <span className="ml-3 text-xl font-playfair font-bold text-aurora-white hidden sm:block">
              AiKinkLab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  pathname === item.href
                    ? 'text-primary-400 font-semibold'
                    : 'text-soft-gray hover:text-aurora-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/test"
              className="btn-primary"
            >
              Start Test
            </Link>
          </div>

          {/* Mobile menu button with enhanced touch feedback */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-soft-gray hover:text-aurora-white transition-all duration-300 touch-target focus-ring p-3 rounded-xl hover:bg-surface-800/30 active:bg-surface-800/50"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Menu with gesture support */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 top-16 bg-surface-900/80 backdrop-blur-sm md:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Sliding menu panel */}
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  opacity: { duration: 0.2 }
                }}
                className="fixed right-0 top-16 bottom-0 w-80 max-w-[85vw] bg-surface-900/98 backdrop-blur-xl border-l border-surface-700/40 shadow-glass-intense md:hidden overflow-y-auto custom-scrollbar"
              >
                <div className="p-6 space-y-2">
                  {/* Navigation items with staggered animation */}
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 touch-target focus-ring-soft ${
                          pathname === item.href
                            ? 'bg-primary-500/20 text-primary-300 font-semibold shadow-glow-inset'
                            : 'text-aurora-white hover:bg-surface-800/50 active:bg-surface-800/80'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-lg">{item.name}</span>
                        <ChevronRight 
                          size={20} 
                          className={`transition-all duration-300 group-hover:translate-x-1 ${
                            pathname === item.href ? 'text-primary-400' : 'text-surface-500'
                          }`}
                        />
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Enhanced CTA button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navigationItems.length * 0.1 }}
                    className="pt-4"
                  >
                    <Link
                      href="/test"
                      className="btn-primary w-full text-center py-4 text-lg touch-target flex items-center justify-center space-x-2 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>Start Test</span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          repeatType: "loop" 
                        }}
                      >
                        <ChevronRight size={20} />
                      </motion.div>
                    </Link>
                  </motion.div>

                  {/* Quick actions */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="pt-6 border-t border-surface-700/40"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-3 bg-surface-800/30 rounded-xl text-sm text-surface-300 hover:bg-surface-800/50 transition-colors">
                        Dark Mode
                      </button>
                      <button className="p-3 bg-surface-800/30 rounded-xl text-sm text-surface-300 hover:bg-surface-800/50 transition-colors">
                        Language
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}