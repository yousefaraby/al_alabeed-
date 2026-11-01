'use client';

import Link from 'next/link';
import type { Lang } from '@/lib/i18n';
import SysScript from './SysScript';

const TITLE = {"ar":"خطأ في الخادم | العابد ديجيتال لوك","en":"Server error | Alabed Digital Lock"};

/** Standalone 500 page (no site header/footer), ported from 500.html */
export default function ServerError({ lang }: { lang: Lang }) {
  const page = lang === 'ar'
    ? (
      <main className="sys" id="main">
        <header className="sys-top">
          <Link href="/" aria-label="العابد ديجيتال لوك"><img src="/assets/logo/alabed-logo-white.webp" alt="ALABED Digital Lock" width="128" height="50" /></Link>
          <a className="sys-lang" href="/en" lang="en">
            <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
            English
          </a>
        </header>
        <div className="sys-body">
          <div>
            <p className="sys-num sys-in" aria-hidden="true">500</p>
            <h1 className="sys-in">حدث خطأ من جهتنا</h1>
            <p className="sys-p sys-in">أعد المحاولة بعد لحظات، وإن تكرر الخطأ راسلنا على واتساب مع رمز الخطأ.</p>
            <div className="sys-in">
              <p className="sys-code">رمز الخطأ:{" "}<strong data-err>ERR-500</strong></p>
              <div className="sys-actions">
                <button className="btn btn--primary" type="button" data-retry>
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 11a8 8 0 0 0-14.3-4.3L4 9" />
                    <path d="M4 4v5h5" />
                    <path d="M4 13a8 8 0 0 0 14.3 4.3L20 15" />
                    <path d="M20 20v-5h-5" />
                  </svg>
                  أعد المحاولة
                </button>
                <a className="btn btn--ghost" href="https://wa.me/201004610860" data-err-wa target="_blank" rel="noopener">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 20l1.2-4A8 8 0 1 1 8.4 19z" />
                    <path d="M9 8.8c0 3.3 2.9 6.2 6.2 6.2l1.3-1.6-2-1-1 .9a4 4 0 0 1-2.8-2.8l.9-1-1-2z" />
                  </svg>
                  راسل الدعم
                </a>
              </div>
            </div>
            <div className="sys-in">
              <nav className="sys-links" aria-label="روابط مفيدة">
                <Link href="/shop">المتجر</Link>
                <Link href="/faq">الأسئلة الشائعة</Link>
                <Link href="/about">من نحن</Link>
                <Link href="/contact">تواصل معنا</Link>
              </nav>
            </div>
          </div>
          <svg className="sys-art sys-art--500" viewBox="0 0 200 240" aria-hidden="true">
            <defs>
              <linearGradient id="sg-body" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#232C62" />
                <stop offset="1" stopColor="#0D1230" />
              </linearGradient>
              <linearGradient id="sg-gold" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#FDDC94" />
                <stop offset=".5" stopColor="#FAAB08" />
                <stop offset="1" stopColor="#C98A06" />
              </linearGradient>
            </defs>
            <g className="sys-lock">
              <path className="sys-shackle" d="M62 118V86a38 38 0 0 1 76 0v32" fill="none" stroke="url(#sg-gold)" strokeWidth="14" strokeLinecap="round" />
              <rect x="34" y="110" width="132" height="110" rx="18" fill="url(#sg-body)" stroke="#343D72" strokeWidth="2" />
              <rect x="34" y="110" width="132" height="8" rx="4" fill="#FAAB08" opacity=".9" />
              <circle cx="100" cy="158" r="13" fill="#090C20" stroke="#FAAB08" strokeWidth="2.5" />
              <path d="M100 166v18" stroke="#FAAB08" strokeWidth="6" strokeLinecap="round" />
              <circle className="sys-led" cx="146" cy="204" r="5" fill="#E5484D" />
            </g>
          </svg>
        </div>
        <footer className="sys-foot">
          <span>العابد ديجيتال لوك © 2026 · جميع الحقوق محفوظة</span>
          <span>
            <a className="num" href="tel:+201020450649">+20 102 045 0649</a>
            {" "}·{" "}
            <a href="https://wa.me/201004610860" target="_blank" rel="noopener">واتساب</a>
          </span>
        </footer>
      </main>
    )
    : (
      <main className="sys" id="main">
        <header className="sys-top">
          <Link href="/en" aria-label="Alabed Digital Lock">
            <img src="/assets/logo/alabed-logo-white.webp" alt="ALABED Digital Lock" width="128" height="50" />
          </Link>
          <a className="sys-lang" href="/" lang="ar">
            <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
            العربية
          </a>
        </header>
        <div className="sys-body">
          <div>
            <p className="sys-num sys-in" aria-hidden="true">500</p>
            <h1 className="sys-in">Something went wrong on our side</h1>
            <p className="sys-p sys-in">Try again in a moment. If it keeps happening, message us on WhatsApp with the error code.</p>
            <div className="sys-in">
              <p className="sys-code">Error code:{" "}<strong data-err>ERR-500</strong></p>
              <div className="sys-actions">
                <button className="btn btn--primary" type="button" data-retry>
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 11a8 8 0 0 0-14.3-4.3L4 9" />
                    <path d="M4 4v5h5" />
                    <path d="M4 13a8 8 0 0 0 14.3 4.3L20 15" />
                    <path d="M20 20v-5h-5" />
                  </svg>
                  Try again
                </button>
                <a className="btn btn--ghost" href="https://wa.me/201004610860" data-err-wa target="_blank" rel="noopener">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 20l1.2-4A8 8 0 1 1 8.4 19z" />
                    <path d="M9 8.8c0 3.3 2.9 6.2 6.2 6.2l1.3-1.6-2-1-1 .9a4 4 0 0 1-2.8-2.8l.9-1-1-2z" />
                  </svg>
                  Message support
                </a>
              </div>
            </div>
            <div className="sys-in">
              <nav className="sys-links" aria-label="Useful links">
                <Link href="/en/shop">Shop</Link>
                <Link href="/en/faq">FAQ</Link>
                <Link href="/en/about">About us</Link>
                <Link href="/en/contact">Contact us</Link>
              </nav>
            </div>
          </div>
          <svg className="sys-art sys-art--500" viewBox="0 0 200 240" aria-hidden="true">
            <defs>
              <linearGradient id="sg-body" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#232C62" />
                <stop offset="1" stopColor="#0D1230" />
              </linearGradient>
              <linearGradient id="sg-gold" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#FDDC94" />
                <stop offset=".5" stopColor="#FAAB08" />
                <stop offset="1" stopColor="#C98A06" />
              </linearGradient>
            </defs>
            <g className="sys-lock">
              <path className="sys-shackle" d="M62 118V86a38 38 0 0 1 76 0v32" fill="none" stroke="url(#sg-gold)" strokeWidth="14" strokeLinecap="round" />
              <rect x="34" y="110" width="132" height="110" rx="18" fill="url(#sg-body)" stroke="#343D72" strokeWidth="2" />
              <rect x="34" y="110" width="132" height="8" rx="4" fill="#FAAB08" opacity=".9" />
              <circle cx="100" cy="158" r="13" fill="#090C20" stroke="#FAAB08" strokeWidth="2.5" />
              <path d="M100 166v18" stroke="#FAAB08" strokeWidth="6" strokeLinecap="round" />
              <circle className="sys-led" cx="146" cy="204" r="5" fill="#E5484D" />
            </g>
          </svg>
        </div>
        <footer className="sys-foot">
          <span>Alabed Digital Lock © 2026 · All rights reserved</span>
          <span>
            <a className="num" href="tel:+201020450649">+20 102 045 0649</a>
            {" "}·{" "}
            <a href="https://wa.me/201004610860" target="_blank" rel="noopener">WhatsApp</a>
          </span>
        </footer>
      </main>
    );
  return (
    <>
      <title>{TITLE[lang]}</title>
      <meta name="robots" content="noindex" />
      {page}
      <SysScript lang={lang} />
    </>
  );
}
