import './globals.css';
import type { Metadata } from 'next';

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
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Nunito+Sans:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-cosmic text-white selection:bg-brand-purple selection:text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
