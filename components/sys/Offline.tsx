import Link from 'next/link';
import type { Lang } from '@/lib/i18n';
import SysScript from './SysScript';


/** Standalone offline page (no site header/footer), ported from offline.html */
export default function Offline({ lang }: { lang: Lang }) {
  const page = lang === 'ar'
    ? (
      <main className="sys" id="main">
        <header className="sys-top">
          <Link href="/" aria-label="العابد ديجيتال لوك"><img src="/assets/logo/alabed-logo-white.webp" alt="ALABED Digital Lock" width="128" height="50" /></Link>
          <a className="sys-lang" href="/en/offline" lang="en">
            <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
            English
          </a>
        </header>
        <div className="sys-body">
          <div>
            <h1 className="sys-in">لا يوجد اتصال بالإنترنت</h1>
            <p className="sys-p sys-in">تحقق من الواي فاي أو بيانات الهاتف ثم أعد المحاولة. قائمة طلب السعر محفوظة على جهازك.</p>
            <div className="sys-in">
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
                <a className="btn btn--ghost" href="tel:+201020450649">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 3.5h3.5l1.7 4.2-2.2 1.4a11 11 0 0 0 6.9 6.9l1.4-2.2 4.2 1.7V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5z" />
                  </svg>
                  اتصل بنا
                </a>
              </div>
              <p className="sys-status" data-status aria-live="polite" />
            </div>
          </div>
          <svg className="sys-art sys-art--offline" viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <linearGradient id="sg-gold" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#FDDC94" />
                <stop offset=".5" stopColor="#FAAB08" />
                <stop offset="1" stopColor="#C98A06" />
              </linearGradient>
            </defs>
            <g className="sys-waves" fill="none" stroke="url(#sg-gold)" strokeWidth="12" strokeLinecap="round">
              <path d="M22 78a110 110 0 0 1 156 0" />
              <path d="M48 104a73 73 0 0 1 104 0" />
              <path d="M74 130a36 36 0 0 1 52 0" />
            </g>
            <circle className="sys-dot" cx="100" cy="158" r="11" fill="url(#sg-gold)" />
            <path className="sys-slash" d="M34 30 166 172" stroke="#0F1432" strokeWidth="22" strokeLinecap="round" />
            <path className="sys-slash" d="M34 30 166 172" stroke="#E5484D" strokeWidth="10" strokeLinecap="round" />
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
          <a className="sys-lang" href="/offline" lang="ar">
            <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
            العربية
          </a>
        </header>
        <div className="sys-body">
          <div>
            <h1 className="sys-in">No internet connection</h1>
            <p className="sys-p sys-in">Check your Wi-Fi or mobile data, then try again. Your quote list is saved on this device.</p>
            <div className="sys-in">
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
                <a className="btn btn--ghost" href="tel:+201020450649">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 3.5h3.5l1.7 4.2-2.2 1.4a11 11 0 0 0 6.9 6.9l1.4-2.2 4.2 1.7V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5z" />
                  </svg>
                  Call us
                </a>
              </div>
              <p className="sys-status" data-status aria-live="polite" />
            </div>
          </div>
          <svg className="sys-art sys-art--offline" viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <linearGradient id="sg-gold" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#FDDC94" />
                <stop offset=".5" stopColor="#FAAB08" />
                <stop offset="1" stopColor="#C98A06" />
              </linearGradient>
            </defs>
            <g className="sys-waves" fill="none" stroke="url(#sg-gold)" strokeWidth="12" strokeLinecap="round">
              <path d="M22 78a110 110 0 0 1 156 0" />
              <path d="M48 104a73 73 0 0 1 104 0" />
              <path d="M74 130a36 36 0 0 1 52 0" />
            </g>
            <circle className="sys-dot" cx="100" cy="158" r="11" fill="url(#sg-gold)" />
            <path className="sys-slash" d="M34 30 166 172" stroke="#0F1432" strokeWidth="22" strokeLinecap="round" />
            <path className="sys-slash" d="M34 30 166 172" stroke="#E5484D" strokeWidth="10" strokeLinecap="round" />
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
      {page}
      <SysScript lang={lang} />
    </>
  );
}
