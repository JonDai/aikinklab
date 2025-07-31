import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Eye, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: "A Beginner's Compass: How to Safely Explore Your Kinks - AIKinkLab",
  description: 'A step-by-step guide for anyone new to the world of kink. We cover safety, communication, and the joy of self-discovery in a pressure-free way.',
  keywords: 'how to explore kinks, beginner kink guide, safe kink practices, kink communication, kink self-discovery',
  authors: [{ name: 'AIKinkLab Team' }],
  openGraph: {
    title: "A Beginner's Compass: How to Safely Explore Your Kinks",
    description: 'A step-by-step guide for anyone new to the world of kink. We cover safety, communication, and the joy of self-discovery in a pressure-free way.',
    type: 'article',
    publishedTime: '2024-07-22T12:00:00Z',
    authors: ['AIKinkLab Team'],
  },
};

export default function ArticlePage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/lab" className="inline-flex items-center text-neutral-gray hover:text-warm-off-white transition-colors duration-200">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to The Lab
          </Link>
        </div>

        <article>
          <header className="mb-8">
            <div className="flex items-center space-x-4 text-sm text-neutral-gray mb-4">
              <div className="flex items-center space-x-1">
                <Tag className="w-4 h-4" />
                <span>Beginner Guides</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>July 22, 2024</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>9 min read</span>
              </div>
            </div>
            <h1 className="font-playfair text-h1 text-warm-off-white mb-4">
              A Beginner's Compass: How to Safely Explore Your Kinks
            </h1>
            <p className="text-xl text-neutral-gray leading-relaxed">
              Welcome to your first step into a larger world. This guide is designed to be your friendly companion, helping you navigate the exciting landscape of kink with confidence, safety, and a spirit of joyful discovery.
            </p>
          </header>

          <div className="prose prose-invert prose-lg max-w-none mx-auto">
            <p>Stepping into the world of kink can feel like discovering a new continent within yourself. It's exciting, a little mysterious, and full of potential for profound self-understanding and deeper connection with others. But like any exploration, it's best undertaken with a map and a compass. This guide is exactly that.</p>

            <h2>1. The Golden Rule: Safety, Sanity, and Consent (SSC)</h2>
            <p>Before you take another step, memorize this acronym: SSC. It's the bedrock of all healthy kink dynamics.</p>
            <ul>
              <li><strong>Safety:</strong> This refers to physical and emotional well-being. It means using safe words, understanding the risks of any activity, and ensuring you have the right equipment (if any).</li>
              <li><strong>Sanity:</strong> This is about respecting mental and emotional boundaries. Kink can be intense, and it's crucial that all participants feel psychologically secure and respected throughout.</li>
              <li><strong>Consent:</strong> Consent must be enthusiastic, ongoing, and freely given. It can be withdrawn at any time, for any reason. The absence of a 'no' is not a 'yes'.</li>
            </ul>

            <h2>2. Know Thyself: The Joy of Self-Exploration</h2>
            <p>Your journey starts with you. Before involving a partner, take time to understand your own desires. Our <Link href="/test">AI Kink Test</Link> is a fantastic, private tool for this. It can help you identify areas of interest you might not have even had the words for.</p>
            <ul>
              <li>Journal about your fantasies. What appeals to you? What are your hard limits?</li>
              <li>Read and learn. Explore resources like this Lab to understand different types of kinks.</li>
              <li>Start small. You don't need to dive into the deep end. Simple sensory play or light bondage can be a great starting point.</li>
            </ul>

            <h2>3. Communication is Key: Talking the Talk</h2>
            <p>Whether with a new partner or a long-term one, communication is non-negotiable. Awkward? Maybe at first. Essential? Absolutely. We'll cover this in more detail in our <Link href="/lab/how-to-talk-about-kinks-with-your-partner">dedicated guide</Link>, but here are the basics:</p>
            <ul>
              <li><strong>Choose the right time and place.</strong> A calm, private setting is best.</li>
              <li><strong>Use 'I' statements.</strong> Frame desires around your feelings, e.g., "I'm curious about..." instead of "I want you to...".</li>
              <li><strong>Discuss limits and safe words upfront.</strong> This is a sign of respect and care.</li>
            </ul>

            <h2>4. Finding Your Community (If You Want To)</h2>
            <p>Kink can be a solitary journey or a social one. If you're looking for community, online forums and local munch (public, no-play social gatherings) can be great resources. Always prioritize your safety when meeting new people.</p>

            <p>Remember, this is your journey. Go at your own pace, lead with curiosity, and always, always prioritize safety and consent. Welcome to the exploration.</p>
          </div>
        </article>
      </div>
    </div>
  );
}