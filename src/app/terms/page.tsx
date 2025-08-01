import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Legal Agreement | AiKinkLab',
  description: 'Read our terms of service to understand the legal agreement for using AiKinkLab services.',
  keywords: 'terms of service, legal agreement, user agreement',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-playfair text-h1 text-warm-off-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-neutral-gray">
            Last Updated: January 1, 2024
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8 mb-8">
            <h2 className="text-2xl font-semibold text-warm-off-white mb-4">
              Welcome to AiKinkLab
            </h2>
            <p className="text-neutral-gray leading-relaxed">
              These Terms of Service (&quot;Terms&quot;) govern your use of the AiKinkLab website and services.
              By accessing or using our services, you agree to be bound by these Terms.
            </p>
          </div>

          <div className="space-y-8">
            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                1. Description of Service
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <p>
                  AiKinkLab provides AI-based personality and preference analysis services. Our services include, but are not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Online personality tests and assessments</li>
                  <li>AI-driven personalized analysis reports</li>
                  <li>Educational content and resources</li>
                  <li>Related consulting and guidance services</li>
                </ul>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                2. User Eligibility
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <h3 className="text-lg font-medium text-warm-off-white">2.1 Age Requirement</h3>
                <p>
                  You must be at least 18 years old to use our services. By using our services, you confirm and warrant that you have reached the legal age.
                </p>
                
                <h3 className="text-lg font-medium text-warm-off-white">2.2 Accurate Information</h3>
                <p>
                  You agree to provide true and accurate information during the testing process to ensure the validity of the analysis results.
                </p>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                3. User Code of Conduct
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <p>When using our services, you agree not to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights or privacy of others</li>
                  <li>Disseminate harmful, defamatory, or illegal content</li>
                  <li>Attempt to disrupt or interfere with our services</li>
                  <li>Use automated tools to access our services</li>
                  <li>Copy, distribute, or modify our content</li>
                </ul>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                4. Intellectual Property
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <h3 className="text-lg font-medium text-warm-off-white">4.1 Our Rights</h3>
                <p>
                  AiKinkLab and its content (including but not limited to text, images, algorithms, software) are protected by copyright, trademark, and other intellectual property laws.
                </p>
                
                <h3 className="text-lg font-medium text-warm-off-white">4.2 User License</h3>
                <p>
                  We grant you a limited, non-exclusive, non-transferable license to use our services for personal, non-commercial purposes only.
                </p>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                5. Paid Services
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <h3 className="text-lg font-medium text-warm-off-white">5.1 Pricing and Payment</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>All prices are denominated in USD unless otherwise stated</li>
                  <li>Payments are processed through secure third-party payment processors</li>
                  <li>We reserve the right to change prices at any time</li>
                </ul>
                
                <h3 className="text-lg font-medium text-warm-off-white">5.2 Refund Policy</h3>
                <p>
                  Due to the digital nature of our services, refunds are generally not provided once you have accessed paid content.
                  Refunds in special circumstances will be considered on a case-by-case basis.
                </p>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                6. Disclaimer
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <h3 className="text-lg font-medium text-warm-off-white">6.1 Nature of Service</h3>
                <p>
                  Our services are for entertainment and educational purposes only. Test results should not be considered professional psychological or medical advice.
                </p>
                
                <h3 className="text-lg font-medium text-warm-off-white">6.2 Accuracy</h3>
                <p>
                  While we strive to provide accurate analysis, we do not guarantee the complete accuracy or applicability of the results.
                </p>
                
                <h3 className="text-lg font-medium text-warm-off-white">6.3 Service Availability</h3>
                <p>
                  We strive to maintain continuous availability of our services but do not guarantee that the service will be uninterrupted or error-free.
                </p>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                7. Limitation of Liability
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <p>
                  To the maximum extent permitted by law, AiKinkLab shall not be liable for:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Any loss resulting from the use or inability to use our services</li>
                  <li>Decisions or actions taken based on our services</li>
                  <li>Third-party content or services</li>
                  <li>Data loss or system failure</li>
                </ul>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                8. Termination of Service
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <h3 className="text-lg font-medium text-warm-off-white">8.1 Termination by User</h3>
                <p>
                  You may stop using our services at any time.
                </p>
                
                <h3 className="text-lg font-medium text-warm-off-white">8.2 Our Right to Terminate</h3>
                <p>
                  We reserve the right to terminate or suspend your access to our services if:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>You violate these Terms</li>
                  <li>You engage in illegal or harmful activities</li>
                  <li>You abuse our services</li>
                </ul>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                9. Dispute Resolution
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <h3 className="text-lg font-medium text-warm-off-white">9.1 Governing Law</h3>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which AiKinkLab operates, without regard to its conflict of law provisions.
                </p>
                
                <h3 className="text-lg font-medium text-warm-off-white">9.2 Dispute Resolution</h3>
                <p>
                  Any disputes shall first be resolved through friendly negotiation. If negotiation fails, the dispute shall be submitted to a court of competent jurisdiction.
                </p>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                10. Modification of Terms
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <p>
                  We reserve the right to modify these terms at any time. Significant changes will be notified to users via website announcements or other appropriate means.
                  Your continued use of our services constitutes your acceptance of the modified terms.
                </p>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                11. Contact Information
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <p>If you have any questions about these terms, please contact us:</p>
                <ul className="list-none space-y-2">
                  <li>Email: <a href="mailto:legal@aikinklab.com" className="text-neon-magenta hover:text-hover-magenta">legal@aikinklab.com</a></li>
                  <li>Address: AiKinkLab Legal Department</li>
                </ul>
              </div>
            </section>

            <section className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-8">
              <h2 className="text-xl font-semibold text-warm-off-white mb-4">
                12. Miscellaneous
              </h2>
              <div className="text-neutral-gray leading-relaxed space-y-4">
                <h3 className="text-lg font-medium text-warm-off-white">12.1 Severability</h3>
                <p>
                  If any part of these Terms is found to be invalid or unenforceable, the remaining portions will remain in full force and effect.
                </p>
                
                <h3 className="text-lg font-medium text-warm-off-white">12.2 Entire Agreement</h3>
                <p>
                  These Terms constitute the entire agreement between you and AiKinkLab concerning the use of our services.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}