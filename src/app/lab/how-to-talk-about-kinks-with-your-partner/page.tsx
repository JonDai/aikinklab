import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import ArticleImage from '@/components/lab/ArticleImage';

export const metadata: Metadata = {
  title: "The Conversation Guide: How to Talk About Kinks with Your Partner - AIKinkLab",
  description: 'Nervous about bringing up your kinks? This practical guide provides scripts, tips, and strategies for having a positive and productive conversation with your partner.',
  keywords: 'talk about kinks, kink conversation, relationship communication, sexual communication, couples kink guide',
  authors: [{ name: 'AIKinkLab Team' }],
  openGraph: {
    title: 'The Conversation Guide: How to Talk About Kinks with Your Partner',
    description: 'Nervous about bringing up your kinks? This practical guide provides scripts, tips, and strategies for having a positive and productive conversation with your partner.',
    type: 'article',
    publishedTime: '2024-07-18T12:00:00Z',
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
                <span>Communication</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>July 18, 2024</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>10 min read</span>
              </div>
            </div>
            <h1 className="font-playfair text-h1 text-warm-off-white mb-4">
              The Conversation Guide: How to Talk About Kinks with Your Partner
            </h1>
            <p className="text-xl text-neutral-gray leading-relaxed">
              So, you've done some self-exploration (perhaps with our <Link href="/test">AI Kink Test</Link>?) and you have a better idea of your desires. Now comes the brave part: sharing that with your partner. Here’s how to make that conversation a bridge, not a barrier.
            </p>
          </header>

          <div className="prose prose-invert prose-lg max-w-none mx-auto">
            <p>The most common fear is rejection or judgment. But framing the conversation correctly can transform it from a confession into an invitation—an invitation to deeper intimacy and shared exploration. The goal isn&apos;t to &apos;convince&apos; your partner, but to share a part of yourself and see what&apos;s possible together.</p>

            <ArticleImage 
              src="https://deepdreamgenerator.com/storage/fast_queue/temp_images/1a711734f509373a914615477583e8a615e1cf4a.jpg" 
              alt="Abstract image representing two people connecting, with vibrant colors and textures."
              caption="Communication is a bridge to deeper understanding and intimacy."
            />

            <h2>1. Set the Stage for Success</h2>
            <p>Timing and environment are everything. Don't bring it up during a fight, or right after sex, or when one of you is rushing out the door.</p>
            <ul>
              <li><strong>Choose a Neutral Time:</strong> Pick a moment when you're both relaxed and have ample time to talk without interruptions.</li>
              <li><strong>Create a Safe Space:</strong> A comfortable, private setting where you both feel at ease is crucial.</li>
              <li><strong>State Your Intention:</strong> Start by affirming your relationship. For example: "I love our connection, and I want to feel even closer to you. There's something I'd like to explore with you that I think could be fun and exciting for us."</li>
            </ul>

            <h2>2. Use the Language of Invitation</h2>
            <p>Your wording can make all the difference. Avoid ultimatums or demands.</p>
            <ul>
              <li><strong>Use 'I' Statements:</strong> As we mentioned in our <Link href="/lab/how-to-safely-explore-kinks-for-beginners">Beginner's Guide</Link>, this is key. "I've been discovering that I'm really turned on by the idea of..." is much better than "I want you to tie me up."</li>
              <li><strong>Frame it as Curiosity:</strong> "I was reading about something and it sounded interesting, I'm curious what you think about it." This makes it a shared topic of discussion, not a one-sided demand.</li>
              <li><strong>Reference Shared Goals:</strong> "I was thinking about how we can keep our sex life exciting, and I had an idea..."</li>
            </ul>

            <h2>3. Be Prepared for Any Reaction</h2>
            <p>Your partner's reaction is their own. They might be excited, curious, hesitant, or even scared. All are valid. The key is to listen.</p>
            <ul>
              <li><strong>If they're curious:</strong> Great! Share more information. Suggest exploring resources together.</li>
              <li><strong>If they're hesitant:</strong> Acknowledge their feelings. "I hear that you're a bit unsure about this. Can you tell me more about what's on your mind?" Reassure them that this is a conversation, not a requirement.</li>
              <li><strong>If they say no:</strong> Respect their boundary. It's crucial. This doesn't mean the conversation is over forever, but it means for now, that activity is off the table. Thank them for their honesty.</li>
            </ul>

            <h2>4. The Follow-Up</h2>
            <p>This isn't a one-and-done conversation. It's the start of an ongoing dialogue. Check in with each other. If you do decide to try something new, have a debrief afterwards. What worked? What didn't? How did you both feel?</p>

            <p>Talking about kink is a skill, and like any skill, it gets easier with practice. By leading with vulnerability, respect, and open-ended curiosity, you're not just talking about sex; you're building a stronger, more honest, and more adventurous relationship.</p>
          </div>
        </article>
      </div>
    </div>
  );
}