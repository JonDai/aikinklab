import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Providers } from '@/components/providers/Providers';
import { PerformanceMonitor } from '@/components/performance/PerformanceMonitor';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  preload: true,
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  preload: true,
});

export const metadata: Metadata = {
  title: 'Free BDSM Test - Discover Your Kink Personality | AIKinkLab',
  description: 'Take the most accurate BDSM test online. AI-powered analysis reveals your kink personality in 15 minutes. Private, scientific, and trusted by 50,000+ users ✓',
  keywords: 'bdsm test, kink test, what is my kink test, free bdsm personality test, AI sexuality test, dominant submissive test, kink personality analysis',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'AIKinkLab Team' }],
  creator: 'AIKinkLab',
  publisher: 'AIKinkLab',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.aikinklab.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Free BDSM Test - Discover Your Kink Personality | AIKinkLab',
    description: 'The most accurate BDSM test online. AI-powered analysis reveals your kink personality in 15 minutes. Anonymous, scientific & trusted by 50,000+ users.',
    url: 'https://www.aikinklab.com',
    siteName: 'AIKinkLab',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AIKinkLab - Free BDSM Test and Kink Personality Analysis',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free BDSM Test - Discover Your Kink Personality | AIKinkLab',
    description: 'The most accurate BDSM test online. AI-powered analysis reveals your kink personality in 15 minutes. Anonymous & trusted by 50,000+ users.',
    creator: '@aikinklab',
    images: ['/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enhanced structured data for the organization
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AIKinkLab',
    alternateName: 'AI Kink Test',
    url: 'https://www.aikinklab.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.aikinklab.com/images/logo.png',
      width: 200,
      height: 60
    },
    description: 'Professional AI-powered kink and personality testing platform providing safe, anonymous, and scientifically-validated psychological analysis.',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: 'https://www.aikinklab.com/contact',
      availableLanguage: 'English'
    },
    sameAs: [
      'https://twitter.com/aikinklab'
    ],
    services: [
      {
        '@type': 'Service',
        name: 'AI Kink Test',
        description: 'Free AI-powered personality and kink analysis test',
        url: 'https://www.aikinklab.com/test'
      },
      {
        '@type': 'Service', 
        name: 'BDSM Test',
        description: 'Comprehensive BDSM personality assessment',
        url: 'https://www.aikinklab.com/bdsm-test'
      }
    ]
  };

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AIKinkLab',
    alternateName: 'AI Kink Test',
    url: 'https://www.aikinklab.com',
    description: 'Discover your inner profile with our free, AI-powered kink test. Take our test at AIKinkLab for a private and enlightening analysis.',
    inLanguage: 'en-US',
    copyrightYear: '2024',
    publisher: {
      '@type': 'Organization',
      name: 'AIKinkLab',
      url: 'https://www.aikinklab.com'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.aikinklab.com/lab?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <PerformanceMonitor />
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}