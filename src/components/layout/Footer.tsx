import Link from 'next/link';

const footerLinks = {
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Contact Us', href: '/contact' },
  ],
  content: [
    { name: 'Blog Archive', href: '/lab' },
    { name: 'BDSM Test', href: '/bdsm-test' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-layered-charcoal border-t border-neutral-gray/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-playfair font-bold text-matte-gold">
                AiKinkLab
              </span>
            </Link>
            <p className="text-neutral-gray text-sm leading-relaxed max-w-md">
              Explore your inner desires and discover your true self in a private, secure environment through our AI-driven professional tests.
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-warm-off-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-gray hover:text-warm-off-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content Links */}
          <div>
            <h3 className="text-warm-off-white font-semibold mb-4">Content</h3>
            <ul className="space-y-2">
              {footerLinks.content.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-gray hover:text-warm-off-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-gray/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-neutral-gray text-sm">
            © 2024 AiKinkLab. All rights reserved.
          </p>
          <p className="text-neutral-gray text-sm mt-2 sm:mt-0">
            Professional · Private · Secure
          </p>
        </div>
      </div>
    </footer>
  );
}