import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import type { ReactNode } from 'react';
import '../styles/base.css';
import '../styles/rtl.css';
import '../styles/sys.css';

export const metadata: Metadata = {
  title: { default: 'العابد ديجيتال لوك | حلول أمان متكاملة', template: '%s | العابد ديجيتال لوك' },
  description: 'أقفال ذكية وخزن غرف وباور سيفر للفنادق والمنازل والمكاتب من العابد ديجيتال لوك.',
  alternates: { languages: { en: '/en' } },
};
export const viewport: Viewport = { themeColor: '#0F1432' };

export default function ArabicRoot({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
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
