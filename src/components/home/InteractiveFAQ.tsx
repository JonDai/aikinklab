'use client';

import { useState } from 'react';
import { ChevronDown, Search, MessageCircle, Shield, Clock, Brain } from 'lucide-react';

const faqCategories = [
  { id: 'general', label: 'General', icon: MessageCircle },
  { id: 'privacy', label: 'Privacy & Security', icon: Shield },
  { id: 'test', label: 'Test Related', icon: Brain },
  { id: 'technical', label: 'Technical Support', icon: Clock },
];

const faqs = [
  {
    id: 1,
    category: 'general',
    question: 'Is this test scientifically reliable?',
    answer: 'Our test is based on validated psychological theories and research, combined with advanced AI algorithms. Test questions are designed by professional psychologists to ensure scientific accuracy. We continuously update and optimize our algorithms to provide the most accurate analysis.',
    popular: true
  },
  {
    id: 2,
    category: 'privacy',
    question: 'Will my personal information be protected?',
    answer: 'Absolutely. We use end-to-end encryption technology, and all data is anonymized. We do not collect any personally identifiable information and never share your data with third parties. You can delete your test records at any time.',
    popular: true
  },
  {
    id: 3,
    category: 'test',
    question: 'How long does the test take to complete?',
    answer: 'Most users can complete the test in 15-20 minutes. The test contains 25 carefully designed questions, each thoughtfully considered to achieve the most accurate results. You can pause at any time and continue later.',
    popular: true
  },
  {
    id: 4,
    category: 'test',
    question: 'Are the test results accurate?',
    answer: 'Our AI algorithm has been trained on extensive data with over 90% accuracy. However, remember that any psychological test is just a reference tool - true self-understanding requires time and experience. We recommend using the results as a starting point for self-exploration.',
    popular: false
  },
  {
    id: 5,
    category: 'privacy',
    question: 'Is the test completely anonymous?',
    answer: 'Yes, completely anonymous. We do not require any personal identification information and do not collect IP addresses or device information. All data is encrypted, and even our technical team cannot associate results with specific individuals.',
    popular: false
  },
  {
    id: 6,
    category: 'technical',
    question: 'What if I encounter technical issues?',
    answer: 'If you encounter any technical problems, you can get help through our online customer service system. Our technical support team will respond within 24 hours. Our website supports all major browsers and mobile devices.',
    popular: false
  },
  {
    id: 7,
    category: 'general',
    question: 'How much does the test cost?',
    answer: 'The basic test is completely free. We also offer a premium version with more detailed analysis reports and personalized recommendations at transparent, reasonable prices. You can try the free version first and consider upgrading if satisfied.',
    popular: true
  },
  {
    id: 8,
    category: 'test',
    question: 'Can I retake the test?',
    answer: 'Of course. We recommend retesting after some time, as personality and preferences can change with experience and growth. Repeated testing can help you track your changes and development.',
    popular: false
  }
];

export function InteractiveFAQ() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFAQ, setOpenFAQ] = useState<number | null>(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFAQs = faqs.filter(faq => faq.popular);

  // Generate FAQPage structured data
  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://www.aikinklab.com/#faq',
    name: 'AIKinkLab - Frequently Asked Questions',
    description: 'Frequently asked questions about AIKinkLab\'s kink and BDSM personality tests, privacy, and services.',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      '@id': `https://www.aikinklab.com/#faq-${faq.id}`,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    })),
    about: {
      '@type': 'Thing',
      name: 'Kink and BDSM Testing',
      description: 'Information about kink personality testing, privacy, and user support'
    },
    inLanguage: 'en-US',
    url: 'https://www.aikinklab.com/#faq'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <section className="py-24 bg-layered-charcoal/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-warm-off-white mb-6">
            Frequently Asked
            <span className="text-neon-magenta"> Questions</span>
          </h2>
          <p className="text-lg text-neutral-gray max-w-3xl mx-auto leading-relaxed">
            We&apos;ve compiled the questions users care about most to help you better understand our test
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left sidebar - Categories and search */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-gray" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-layered-charcoal border border-neutral-gray/20 rounded-lg text-warm-off-white placeholder-neutral-gray focus:border-neon-magenta focus:outline-none transition-colors duration-200"
              />
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeCategory === 'all'
                    ? 'bg-neon-magenta/10 text-neon-magenta border border-neon-magenta/20'
                    : 'text-neutral-gray hover:text-warm-off-white hover:bg-layered-charcoal/50'
                }`}
              >
                All Questions
              </button>
              {faqCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                      activeCategory === category.id
                        ? 'bg-neon-magenta/10 text-neon-magenta border border-neon-magenta/20'
                        : 'text-neutral-gray hover:text-warm-off-white hover:bg-layered-charcoal/50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Popular questions */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-warm-off-white mb-4 uppercase tracking-wider">
                Popular Questions
              </h3>
              <div className="space-y-2">
                {popularFAQs.slice(0, 3).map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => {
                      setActiveCategory(faq.category);
                      setOpenFAQ(faq.id);
                    }}
                    className="w-full text-left text-sm text-neutral-gray hover:text-neon-magenta transition-colors duration-200 py-2 border-l-2 border-transparent hover:border-neon-magenta pl-3"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right content - FAQ list */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-layered-charcoal border border-neutral-gray/20 rounded-xl overflow-hidden fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-layered-charcoal/50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      {faq.popular && (
                        <span className="bg-neon-magenta/10 text-neon-magenta text-xs px-2 py-1 rounded-pill">
                          Popular
                        </span>
                      )}
                      <h3 className="text-warm-off-white font-medium">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-gray transition-transform duration-200 ${
                        openFAQ === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {openFAQ === faq.id && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-neutral-gray/20 pt-4">
                        <p className="text-neutral-gray leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-neutral-gray/50 mx-auto mb-4" />
                <p className="text-neutral-gray">
                  No matching questions found, please try other search terms
                </p>
              </div>
            )}

            {/* Contact support */}
            <div className="mt-12 bg-gradient-to-r from-neon-magenta/10 to-matte-gold/10 border border-neon-magenta/20 rounded-xl p-6 text-center">
              <h3 className="text-xl font-semibold text-warm-off-white mb-2">
                Have Other Questions?
              </h3>
              <p className="text-neutral-gray mb-4">
                Our customer service team is always here to help
              </p>
              <button className="btn-primary">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}