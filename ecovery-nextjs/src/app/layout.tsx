import type { Metadata } from 'next';
import { CartProvider } from '@/contexts/CartContext';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ecovery.com'),
  title: {
    template: '%s | ECO.VERY — Эко-магазин натуральных товаров',
    default: 'ECO.VERY — Эко-магазин натуральных товаров',
  },
  description: 'Экологичные товары для дома, личной гигиены и кухни. Бамбуковые зубные щётки, многоразовые мешочки, твердое мыло и многое другое.',
  keywords: ['экологичные товары', 'эко магазин', 'натуральная косметика', 'zero waste', 'эко товары'],
  authors: [{ name: 'ECO.VERY' }],
  creator: 'ECO.VERY',
  publisher: 'ECO.VERY',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://ecovery.com',
    siteName: 'ECO.VERY',
    title: 'ECO.VERY — Эко-магазин натуральных товаров',
    description: 'Экологичные товары для дома, личной гигиены и кухни',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ECO.VERY эко-магазин',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ECO.VERY — Эко-магазин натуральных товаров',
    description: 'Экологичные товары для дома, личной гигиены и кухни',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-token',
    yandex: 'yandex-verification-token',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
} 