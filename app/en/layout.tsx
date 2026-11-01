import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { rootMetadata } from '@/lib/seo';
import '../styles/base.css';
import '../styles/ltr.css';
import '../styles/sys.css';
import '../styles/motion.css';

export const metadata: Metadata = rootMetadata('en');
export const viewport: Viewport = { themeColor: '#0F1432' };

export default function EnglishRoot({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
