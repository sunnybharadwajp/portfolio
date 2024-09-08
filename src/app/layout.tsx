import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.scss';
import Navigation from '@/components/Navigation';
import { ThemeProvider } from '@/components/ThemeProvider';

const lato = Lato({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sunny Bharadwaj',
  description: 'Developer, Maker, Artist',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={lato.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
