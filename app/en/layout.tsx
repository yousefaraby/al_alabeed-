import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import type { ReactNode } from 'react';
import '../styles/base.css';
import '../styles/ltr.css';
import '../styles/sys.css';

export const metadata: Metadata = {
  title: { default: 'Alabed Digital Lock | Complete security solutions', template: '%s | Alabed Digital Lock' },
  description: 'Smart locks, in-room safes and power savers for hotels, homes and offices from Alabed Digital Lock.',
  alternates: { languages: { ar: '/' } },
};
export const viewport: Viewport = { themeColor: '#0F1432' };

export default function EnglishRoot({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        {/* reveal-on-scroll styles only apply once JS is running */}
        <Script id="js-flag" strategy="beforeInteractive">{"document.documentElement.classList.add('js')"}</Script>
        {children}
      </body>
    </html>
  );
}
