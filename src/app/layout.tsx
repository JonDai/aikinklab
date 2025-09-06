import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AIKinkLab',
  description: 'AI-powered kink personality test',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-surface-900 text-white">
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}