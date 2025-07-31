import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { TestCTA } from '@/components/home/TestCTA';
import { Testimonials } from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <TestCTA />
      <Testimonials />
    </div>
  );
}