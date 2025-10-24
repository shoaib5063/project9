import type { Metadata } from 'next';
import './globals.css';
import { PT_Sans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'ToyVerse - Your Universe of Fun',
    template: '%s | ToyVerse',
  },
  description: 'Welcome to ToyVerse, the ultimate destination for toys and fun! Explore our vast collection of toys for all ages.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', ptSans.variable)}>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
