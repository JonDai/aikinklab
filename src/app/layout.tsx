import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { MobilePageWrapper } from '@/components/mobile/BottomNavigation';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'AIKinkLab - Discover Your Intimate Universe',
  description: 'AI-powered kink personality test with Aurora-themed modern design. Discover your intimate personality through our scientifically-validated assessment.',
  keywords: 'kink personality test, intimate psychology, BDSM assessment, sexual psychology, relationship compatibility',
  authors: [{ name: 'AIKinkLab Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
  themeColor: '#9b7fff', // Aurora primary color
  colorScheme: 'dark',
  openGraph: {
    title: 'AIKinkLab - Discover Your Intimate Universe',
    description: 'AI-powered kink personality test with modern Aurora design',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIKinkLab - Discover Your Intimate Universe',
    description: 'AI-powered kink personality test with modern Aurora design',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900 text-aurora-white antialiased overflow-x-hidden">
        {/* Aurora ambient background effects */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary-500/8 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-500/6 rounded-full blur-2xl animate-float-subtle" />
        </div>

        {/* Main content with Aurora styling */}
        <MobilePageWrapper showBottomNav={true}>
          <main className="relative z-10 flex-1 safe-area-pt">
            {children}
          </main>
        </MobilePageWrapper>

        {/* Enhanced Aurora gradient noise overlay */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-30 z-50 mix-blend-soft-light"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0.6 0 0 0 0 0.5 0 0 0 0 1 0 0 0 0.05 0"/></filter></defs><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>')`,
          }}
        />
      </body>
    </html>
  );
}