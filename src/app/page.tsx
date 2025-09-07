import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/home/HeroSection';

// Lazy load below-the-fold components to reduce initial bundle size
const HowItWorks = dynamic(() => import('@/components/home/HowItWorks').then(mod => ({ default: mod.HowItWorks })), {
  loading: () => <div className="h-32 bg-surface-800/20 rounded-xl animate-pulse" />
});

const InteractiveFeatures = dynamic(() => import('@/components/home/InteractiveFeatures').then(mod => ({ default: mod.InteractiveFeatures })), {
  loading: () => <div className="h-48 bg-surface-800/20 rounded-xl animate-pulse" />
});

const Testimonials = dynamic(() => import('@/components/home/Testimonials').then(mod => ({ default: mod.Testimonials })), {
  loading: () => <div className="h-64 bg-surface-800/20 rounded-xl animate-pulse" />
});

const TestCTA = dynamic(() => import('@/components/home/TestCTA').then(mod => ({ default: mod.TestCTA })), {
  loading: () => <div className="h-40 bg-surface-800/20 rounded-xl animate-pulse" />
});

const InteractiveFAQ = dynamic(() => import('@/components/home/InteractiveFAQ').then(mod => ({ default: mod.InteractiveFAQ })), {
  loading: () => <div className="h-56 bg-surface-800/20 rounded-xl animate-pulse" />
});

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <InteractiveFeatures />
      <Testimonials />
      <TestCTA />
      <InteractiveFAQ />
    </div>
  );
}