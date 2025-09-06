import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { InteractiveFeatures } from '@/components/home/InteractiveFeatures';
import { Testimonials } from '@/components/home/Testimonials';
import { TestCTA } from '@/components/home/TestCTA';
import { InteractiveFAQ } from '@/components/home/InteractiveFAQ';

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