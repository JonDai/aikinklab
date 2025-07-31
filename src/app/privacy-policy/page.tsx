import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Your Data Protection | AiKinkLab',
  description: 'Read our comprehensive privacy policy to understand how we protect your data and ensure complete anonymity.',
  keywords: 'privacy policy, data protection, anonymity, security',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-playfair text-h1 text-warm-off-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-neutral-gray">
            Last Updated: January 1, 2024
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8 mb-8">
            <h2 className="text-2xl font-semibold text-warm-off-white mb-4">
              Our Commitment
            </h2>
            <p className="text-neutral-gray leading-relaxed">
              At AiKinkLab, we understand the importance of privacy to our users. We are committed to protecting your personal information and test data with the highest standards.
              This Privacy Policy details how we collect, use, store, and protect your information.
            </p>
          </div>

          <div className="space-y-8">
            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                1. Information We Collect
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <h3 className="text-lg font-medium text-warm-off-white">1.1 What We Collect</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Test answers and choices (completely anonymous)</li>
                  <li>Device and browser information (for technical optimization)</li>
                  <li>Access times and page view data (for analysis and improvement)</li>
                </ul>
                
                <h3 className="text-lg font-medium text-warm-off-white">1.2 What We Do Not Collect</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Name, email, or any personally identifiable information</li>
                  <li>IP address or location information</li>
                  <li>Social media account information</li>
                  <li>Payment information (securely handled by third parties)</li>
                </ul>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                2. How We Use Your Information
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Generate personalized test results and analysis reports</li>
                  <li>Improve our AI algorithms and test accuracy</li>
                  <li>Optimize website performance and user experience</li>
                  <li>Conduct anonymous statistical analysis and research</li>
                </ul>
                <p className="font-medium text-warm-off-white">
                  We will never use your data for marketing, advertising, or share it with third parties.
                </p>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                3. Data Security
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <h3 className="text-lg font-medium text-warm-off-white">3.1 Encryption Protection</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>All data transmission uses SSL/TLS encryption</li>
                  <li>Databases are stored with AES-256 encryption</li>
                  <li>Regular security audits and vulnerability scans</li>
                </ul>
                
                <h3 className="text-lg font-medium text-warm-off-white">3.2 Access Control</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Strict employee access rights management</li>
                  <li>Multi-factor authentication</li>
                  <li>Regular security training and reviews</li>
                </ul>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                4. Data Storage and Deletion
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <ul className="list-disc list-inside space-y-2">
                  <li>Test data is only stored for the minimum time required to generate results</li>
                  <li>Users can request the deletion of their test data at any time</li>
                  <li>We regularly clean up outdated and unnecessary data</li>
                  <li>All deletion operations are irreversible</li>
                </ul>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                5. Cookies and Tracking Technologies
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <h3 className="text-lg font-medium text-warm-off-white">5.1 Essential Cookies</h3>
                <p>We use essential cookies to ensure the proper functioning of the website, including:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Session management and security verification</li>
                  <li>Saving test progress</li>
                  <li>User preference settings</li>
                </ul>
                
                <h3 className="text-lg font-medium text-warm-off-white">5.2 Analytics Cookies</h3>
                <p>We use anonymous analytics tools to improve our services. You can choose to disable these cookies.</p>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                6. Third-Party Services
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <p>We may use the following third-party services:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Payment processing services (we do not store payment information)</li>
                  <li>Cloud storage services (data is stored encrypted)</li>
                  <li>Analytics services (anonymous data)</li>
                </ul>
                <p className="font-medium text-warm-off-white">
                  All third-party services undergo strict security and privacy reviews.
                </p>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                7. Your Rights
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Understand how we collect and use your data</li>
                  <li>Request access to your personal data</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Withdraw consent (where applicable)</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at 
                  <a href="mailto:privacy@aikinklab.com" className="text-neon-magenta hover:text-hover-magenta">
                    privacy@aikinklab.com
                  </a>.
                </p>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                8. Protection of Minors
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <p>
                  Our services are intended for adults aged 18 and over. We do not knowingly collect personal information from minors.
                  If we discover that we have collected information from a minor, we will delete it immediately.
                </p>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                9. Policy Updates
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <p>
                  We may update this Privacy Policy from time to time. Significant changes will be notified to users via a website announcement.
                  Your continued use of our services constitutes your acceptance of the updated policy.
                </p>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                10. Contact Us
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
                <ul className="list-none space-y-2">
                  <li>Email: <a href="mailto:privacy@aikinklab.com" className="text-neon-magenta hover:text-hover-magenta">privacy@aikinklab.com</a></li>
                  <li>Address: AiKinkLab Privacy Department</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}