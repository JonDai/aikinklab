import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Providers } from '@/components/providers/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'AI Kink Test: Discover Your Inner Profile | AIKinkLab',
  description: 'Discover your inner profile with our free, AI-powered kink test. Take our test at AIKinkLab for a private and enlightening analysis. Start Your Journey Now.',
  keywords: 'kink test, bdsm test, personality analysis, AI sexuality test, discover kinks, relationship dynamics',
  openGraph: {
    title: 'AiKinkLab - Uncover Your Authentic Self with AI',
    description: 'Curious about your desires? Our AI-powered kink and personality test provides deep insights in a safe, anonymous environment.',
    url: 'https://www.aikinklab.com',
    siteName: 'AiKinkLab',
    images: [
      {
        url: '/og-image.jpg', // Replace with your actual OG image URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AiKinkLab | AI-Powered Kink & Personality Insights',
    description: 'Your journey to self-discovery starts here. Private, insightful, and powered by AI. What will you uncover?',
    creator: '@aikinklab', // Replace with your Twitter handle
    images: ['/twitter-image.jpg'], // Replace with your actual Twitter image URL
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Providers>
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