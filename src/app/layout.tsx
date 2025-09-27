import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Alhayat Smart - Smart Home Solutions',
    template: '%s | Alhayat Smart'
  },
  description: 'Transform your home into a smart home with Alhayat Smart. Discover the latest smart home devices, automation systems, and IoT solutions for modern living.',
  keywords: ['smart home', 'home automation', 'IoT', 'smart devices', 'home security', 'smart lighting', 'smart appliances'],
  authors: [{ name: 'Alhayat Smart' }],
  creator: 'Alhayat Smart',
  publisher: 'Alhayat Smart',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://alhayatsmart.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'ar-EG': '/ar',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alhayatsmart.com',
    title: 'Alhayat Smart - Smart Home Solutions',
    description: 'Transform your home into a smart home with Alhayat Smart. Discover the latest smart home devices, automation systems, and IoT solutions for modern living.',
    siteName: 'Alhayat Smart',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alhayat Smart - Smart Home Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alhayat Smart - Smart Home Solutions',
    description: 'Transform your home into a smart home with Alhayat Smart. Discover the latest smart home devices, automation systems, and IoT solutions for modern living.',
    images: ['/images/twitter-image.jpg'],
    creator: '@alhayatsmart',
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Titillium+Web" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/66adaba82b.js" crossOrigin="anonymous" async />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} ${locale === 'ar' ? 'rtl' : ''}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}