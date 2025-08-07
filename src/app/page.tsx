import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { InteractiveFeatures } from '@/components/home/InteractiveFeatures';
import { TestCTA } from '@/components/home/TestCTA';
import { Testimonials } from '@/components/home/Testimonials';
import { InteractiveFAQ } from '@/components/home/InteractiveFAQ';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <InteractiveFeatures />
      <TestCTA />
      <Testimonials />
      <InteractiveFAQ />
    </div>
  );
}