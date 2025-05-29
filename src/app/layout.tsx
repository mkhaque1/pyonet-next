import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/components/auth/AuthProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pyonet.com'),
  title: 'Pyonet - Innovative Tech Solutions',
  description:
    'Pyonet offers cutting-edge technology solutions for businesses. Transform your digital presence with our expert team.',
  keywords:
    'tech company, software development, digital transformation, IT solutions, Pyonet',
  openGraph: {
    title: 'Pyonet - Innovative Tech Solutions',
    description:
      'Pyonet offers cutting-edge technology solutions for businesses. Transform your digital presence with our expert team.',
    url: 'https://pyonet.com',
    siteName: 'Pyonet',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pyonet - Innovative Tech Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pyonet - Innovative Tech Solutions',
    description:
      'Pyonet offers cutting-edge technology solutions for businesses. Transform your digital presence with our expert team.',
    images: ['/images/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark">
      <body
        className={`${inter.variable} ${robotoMono.variable} font-sans bg-dark-900 text-dark-100 min-h-screen`}
      >
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
