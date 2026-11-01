import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { rootMetadata } from '@/lib/seo';
import '../styles/base.css';
import '../styles/rtl.css';
import '../styles/sys.css';

export const metadata: Metadata = rootMetadata('ar');
export const viewport: Viewport = { themeColor: '#0F1432' };

export default function ArabicRoot({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth" suppressHydrationWarning>
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
