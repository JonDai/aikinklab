'use client';

import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: 'This test helped me better understand my needs and boundaries. The analysis report was incredibly professional and insightful, giving me a whole new perspective on myself.',
    author: 'Sarah M.',
    rating: 5,
    category: 'Self-Discovery',
  },
  {
    id: 2,
    content: 'The interface design is elegant, and the entire testing process felt safe and comfortable. The accuracy of the AI analysis was impressive.',
    author: 'Alex K.',
    rating: 5,
    category: 'User Experience',
  },
  {
    id: 3,
    content: 'As someone new to this area, the test provided an excellent introduction. The results analysis was incredibly helpful.',
    author: 'Jordan L.',
    rating: 5,
    category: 'Beginner-Friendly',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-layered-charcoal/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-h2 text-warm-off-white mb-4">
            Real Feedback from Our Users
          </h2>
          <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
            See how others have gained profound self-insight through our test.
          </p>
        </div>
        
        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-6 fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Quote icon */}
              <div className="flex items-center justify-between mb-4">
                <Quote className="w-8 h-8 text-neon-magenta/50" />
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-matte-gold fill-current" />
                  ))}
                </div>
              </div>
              
              {/* Content */}
              <blockquote className="text-neutral-gray leading-relaxed mb-4">
                &quot;{testimonial.content}&quot;
              </blockquote>
              
              {/* Author and category */}
              <div className="flex items-center justify-between">
                <cite className="text-warm-off-white font-medium not-italic">
                  {testimonial.author}
                </cite>
                <span className="text-xs text-neon-magenta bg-neon-magenta/10 px-2 py-1 rounded-pill">
                  {testimonial.category}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="text-sm text-neutral-gray">
            * To protect user privacy, all testimonials are anonymized.
          </p>
        </div>
      </div>
    </section>
  );
}