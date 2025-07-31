import type { Metadata } from 'next';
import { Mail, MessageCircle, Clock, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch | AiKinkLab',
  description: 'Contact AiKinkLab for support, questions, or feedback. We\'re here to help with your kink exploration journey.',
  keywords: 'contact aikinklab, support, help, feedback',
};

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us an email, and we will reply within 24 hours.',
    contact: 'support@aikinklab.com',
    action: 'mailto:support@aikinklab.com',
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Get instant support during business hours.',
    contact: 'Mon-Fri 9:00 AM - 6:00 PM',
    action: '#',
  },
];

const faqs = [
  {
    question: 'How is my privacy protected?',
    answer: 'We use end-to-end encryption to protect all user data. We never collect personally identifiable information and do not share any data with third parties.',
  },
  {
    question: 'How accurate are the test results?',
    answer: 'Our AI model is trained on extensive psychological research and user data, achieving over 90% accuracy. However, please remember this is a tool for self-exploration, and the results are for reference only.',
  },
  {
    question: 'Can I retake the test?',
    answer: 'Of course. Your preferences and perceptions may change over time. We recommend retaking the test every 6 months.',
  },
  {
    question: 'How can I get technical support?',
    answer: 'If you encounter technical issues, please contact us via email with a detailed description of the problem and your device information. We will resolve it for you as soon as possible.',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-playfair text-h1 text-warm-off-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-neutral-gray max-w-2xl mx-auto">
            We are always ready to provide you with help and support. Whether you have technical issues, usage questions, or feedback, feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div>
            <h2 className="text-2xl font-semibold text-warm-off-white mb-8">
              Contact Methods
            </h2>
            
            <div className="space-y-6 mb-8">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div
                    key={method.title}
                    className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-6 fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-neon-magenta/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-neon-magenta" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-warm-off-white mb-2">
                          {method.title}
                        </h3>
                        <p className="text-neutral-gray mb-3">
                          {method.description}
                        </p>
                        <a
                          href={method.action}
                          className="text-neon-magenta hover:text-hover-magenta transition-colors duration-200 font-medium"
                        >
                          {method.contact}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Response Time */}
            <div className="bg-layered-charcoal/50 border border-neutral-gray/20 rounded-card p-6">
              <div className="flex items-center mb-3">
                <Clock className="w-5 h-5 text-neon-magenta mr-2" />
                <h3 className="text-lg font-semibold text-warm-off-white">
                  Response Time
                </h3>
              </div>
              <p className="text-neutral-gray">
                We promise to reply to all email inquiries within 24 hours. Urgent technical issues will be prioritized.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold text-warm-off-white mb-8">
              Send a Message
            </h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-warm-off-white mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full bg-layered-charcoal border border-neutral-gray/20 rounded-card px-4 py-3 text-warm-off-white focus:border-neon-magenta focus:outline-none transition-colors duration-200"
                >
                  <option value="">Please select a topic</option>
                  <option value="technical">Technical Support</option>
                  <option value="account">Account Issues</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="partnership">Partnership Inquiries</option>
                  <option value="other">Other Questions</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-warm-off-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-layered-charcoal border border-neutral-gray/20 rounded-card px-4 py-3 text-warm-off-white placeholder-neutral-gray focus:border-neon-magenta focus:outline-none transition-colors duration-200"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-warm-off-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full bg-layered-charcoal border border-neutral-gray/20 rounded-card px-4 py-3 text-warm-off-white placeholder-neutral-gray focus:border-neon-magenta focus:outline-none transition-colors duration-200 resize-none"
                  placeholder="Please describe your question or suggestion in detail..."
                />
              </div>
              
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
            
            {/* Privacy Notice */}
            <div className="mt-6 bg-layered-charcoal/50 border border-neutral-gray/20 rounded-card p-4">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-neon-magenta mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-warm-off-white mb-1">
                    Privacy Protection
                  </h4>
                  <p className="text-xs text-neutral-gray">
                    Your contact information will only be used to respond to your inquiry. We will not use it for marketing purposes or share it with third parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-2xl font-semibold text-warm-off-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
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
      </div>
    </div>
  );
}