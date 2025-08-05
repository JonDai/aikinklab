'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'The Lab', href: '/lab' },
  { name: 'About Us', href: '/about' },
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
              className="text-neutral-gray hover:text-warm-off-white transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden absolute top-16 left-0 right-0 bg-layered-charcoal/95 backdrop-blur-lg transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-screen border-t border-neutral-gray/20' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col space-y-2 p-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block text-center text-lg py-3 rounded-lg transition-colors duration-200 ${
                  pathname === item.href
                    ? 'bg-neon-magenta text-warm-off-white font-semibold'
                    : 'text-warm-off-white hover:bg-warm-charcoal'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/test"
              className="btn-primary inline-block text-center mt-4 py-3 text-lg"
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