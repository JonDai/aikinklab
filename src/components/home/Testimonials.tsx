'use client';

import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: 'This test helped me better understand my needs and boundaries. The analysis report is very professional and insightful, giving me a completely new perspective on self-awareness.',
    author: 'Sarah M.',
    rating: 5,
    category: 'Self-Discovery',
  },
  {
    id: 2,
    content: 'The interface design is elegant, and the entire testing process feels safe and comfortable. The accuracy of the AI analysis is impressive, and the results are very valuable.',
    author: 'Alex K.',
    rating: 5,
    category: 'User Experience',
  },
  {
    id: 3,
    content: 'As a newcomer to this field, this test provided excellent guidance for getting started. The result analysis was very helpful and gave me deeper self-understanding.',
    author: 'Jordan L.',
    rating: 5,
    category: 'Beginner-Friendly',
  },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-layered-charcoal/20">
      <div className="max-w-7xl mx-auto mobile-container">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-playfair mobile-heading lg:text-5xl text-warm-off-white mb-4 sm:mb-6">
            Real User
            <span className="text-neon-magenta block sm:inline"> Feedback</span>
          </h2>
          <p className="mobile-text text-neutral-gray max-w-3xl mx-auto leading-relaxed">
            See how other users gained profound self-insights through our test
          </p>
        </div>
        
        {/* Testimonials grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-layered-charcoal border border-neutral-gray/20 rounded-card mobile-card-spacing sm:p-6 slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Quote icon */}
              <div className="flex items-center justify-between mb-4">
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-neon-magenta/50" />
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-matte-gold fill-current" />
                  ))}
                </div>
              </div>
              
              {/* Content */}
              <blockquote className="text-sm sm:text-base text-neutral-gray leading-relaxed mb-4 mobile-text-optimize">
                &quot;{testimonial.content}&quot;
              </blockquote>
              
              {/* Author and category */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <cite className="text-sm sm:text-base text-warm-off-white font-medium not-italic">
                  {testimonial.author}
                </cite>
                <span className="text-xs text-neon-magenta bg-neon-magenta/10 px-2 py-1 rounded-pill whitespace-nowrap">
                  {testimonial.category}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom note */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-xs sm:text-sm text-neutral-gray">
            * All reviews have been anonymized to protect user privacy
          </p>
        </div>
      </div>
    </section>
  );
}