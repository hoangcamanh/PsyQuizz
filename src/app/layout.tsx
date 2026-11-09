import './globals.css';
import type { Metadata } from 'next';
import { I18nProvider } from '@/i18n/I18nContext';

export const metadata: Metadata = {
  title: 'PsyQuizz — Know Your Mind, Discover Yourself',
  description:
    'A privacy-first psychological self-assessment and science-grounded AI explanation platform for young adults.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-cosmic text-white selection:bg-brand-purple selection:text-white antialiased min-h-screen">
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
