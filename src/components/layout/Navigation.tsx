'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Lab', href: '/lab' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-warm-charcoal/95 backdrop-blur-sm border-b border-layered-charcoal sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo />
            <span className="ml-3 text-xl font-playfair font-bold text-warm-off-white hidden sm:block">
              AiKinkLab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-neon-magenta'
                    : 'text-neutral-gray hover:text-warm-off-white'
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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-gray hover:text-warm-off-white transition-colors duration-200 touch-target focus-ring p-2"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden absolute top-16 left-0 right-0 bg-layered-charcoal/98 backdrop-blur-lg transition-all duration-300 ease-in-out overflow-hidden shadow-lg ${
            isMenuOpen ? 'max-h-screen border-t border-neutral-gray/20' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col space-y-1 p-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block text-center text-lg py-4 rounded-lg transition-all duration-200 touch-target focus-ring ${
                  pathname === item.href
                    ? 'bg-neon-magenta text-warm-off-white font-semibold shadow-glow'
                    : 'text-warm-off-white hover:bg-warm-charcoal active:bg-layered-charcoal/80'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/test"
              className="btn-primary inline-block text-center mt-4 py-4 text-lg touch-target"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Test
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}