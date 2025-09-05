import type { Metadata } from 'next';
import { TestEngine } from '@/components/test/TestEngine';

export const metadata: Metadata = {
  title: 'Free Kink Personality Test - Discover Your Profile | AIKinkLab',
  description: 'Take our comprehensive 80-question kink personality test. AI-powered analysis reveals your unique profile in 15 minutes. Anonymous, scientific & trusted by 50,000+ users.',
  keywords: 'free kink test, kink personality test, bdsm personality quiz, what is my kink, discover kinks, sexual personality assessment, anonymous kink test',
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
  alternates: {
    canonical: '/test',
  },
  openGraph: {
    title: 'Free Kink Personality Test - Discover Your Profile | AIKinkLab',
    description: 'Comprehensive 80-question kink personality test with AI analysis. Discover your unique profile in 15 minutes. Anonymous & scientifically validated.',
    type: 'website',
    url: 'https://www.aikinklab.com/test',
    siteName: 'AIKinkLab',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Kink Personality Test - Discover Your Profile | AIKinkLab',
    description: 'Take our comprehensive kink personality test. AI-powered analysis in 15 minutes. Anonymous & trusted by 50,000+ users.',
    creator: '@aikinklab',
  },
};

export default function TestPage() {
  return <TestEngine />;
}