'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

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
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-playfair font-bold text-matte-gold">
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-layered-charcoal">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-neon-magenta'
                      : 'text-neutral-gray hover:text-warm-off-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/test"
                className="btn-primary inline-block text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Start Test
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}