import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Shield, Brain, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The #1 AI BDSM Test - Private & Insightful | AIKinkLab',
  description: 'Take the #1 AI BDSM test for a private and insightful analysis of your personality. Start your journey now at AIKinkLab.',
    keywords: 'BDSM test, dominant submissive test, kink test, BDSM personality, sexual preferences test',
  openGraph: {
    title: 'BDSM Test - Discover Your BDSM Personality',
    description: 'Professional BDSM personality test with AI-powered analysis.',
  },
};

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced AI algorithms analyze your answers to provide an accurate personality assessment.',
  },
  {
    icon: Shield,
    title: 'Completely Anonymous',
    description: 'No registration required. All data is encrypted to protect your privacy.',
  },
  {
    icon: Clock,
    title: 'Quick to Complete',
    description: 'The test takes only 15 minutes to complete, and you get a detailed analysis report immediately.',
  },
  {
    icon: Users,
    title: 'Professional and Trusted',
    description: 'Based on psychological research and validated by tens of thousands of users.',
  },
];

const faqs = [
  {
    question: 'What is a BDSM test?',
    answer: 'A BDSM test is a psychological assessment tool that helps you understand your role preferences in BDSM relationships, including tendencies towards dominance, submission, sadism, and masochism.',
  },
  {
    question: 'Are the test results accurate?',
    answer: 'Our test is based on psychological research and an AI model trained on extensive user data, ensuring high accuracy. However, please remember that this is a reference tool, and true self-understanding takes time and practice.',
  },
  {
    question: 'Will my privacy be protected?',
    answer: 'Absolutely. We do not collect any personally identifiable information. All test data is encrypted and will not be shared with third parties. Your privacy is our top priority.',
  },
  {
    question: 'How much does the test cost?',
    answer: 'The basic test is completely free. If you want a more detailed AI analysis report and personalized recommendations, you can opt for our premium version.',
  },
];

export default function BDSMTestPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-charcoal via-layered-charcoal to-warm-charcoal" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-h1 text-warm-off-white mb-6">
            Professional <span className="text-neon-magenta">BDSM Test</span>
          </h1>
          
          <p className="text-xl text-neutral-gray mb-8 max-w-3xl mx-auto leading-relaxed">
            Gain a deep understanding of your dominant, submissive, sadistic, and masochistic tendencies with our scientifically validated BDSM personality test. Receive a professional AI analysis report and explore your true self in a safe and private environment.
          </p>
          
          <Link href="/test" className="btn-primary group text-lg px-8 py-4">
            Start BDSM Test
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          
          <p className="text-sm text-neutral-gray mt-4">
            🔒 Completely Anonymous · Start Immediately · No Registration Required
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-layered-charcoal/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-h2 text-warm-off-white mb-4">
              Why Choose Our BDSM Test?
            </h2>
            <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
              A professional, accurate, and private BDSM personality analysis tool.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={feature.title} className="text-center fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="w-16 h-16 bg-neon-magenta/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-neon-magenta" />
                  </div>
                  <h3 className="text-xl font-semibold text-warm-off-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-gray">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-h2 text-warm-off-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-gray">
              Everything you need to know about the BDSM test.
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-6 fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg font-semibold text-warm-off-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-neutral-gray leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-layered-charcoal/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-h2 text-warm-off-white mb-4">
            Ready to Understand Your True Self?
          </h2>
          <p className="text-lg text-neutral-gray mb-8">
            Start your journey of BDSM personality exploration now.
          </p>
          <Link href="/test" className="btn-primary group text-lg px-8 py-4">
            Start Free Test
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>
    </div>
  );
}