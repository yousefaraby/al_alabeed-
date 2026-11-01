import Link from 'next/link';
import type { Lang } from '@/lib/i18n';
import SysScript from './SysScript';

const TITLE = { ar: 'الصفحة غير موجودة | العابد ديجيتال لوك', en: 'Page not found | Alabed Digital Lock' };


/** Standalone 404 page (no site header/footer), ported from 404.html */
export default function NotFound({ lang }: { lang: Lang }) {
  const page = lang === 'ar'
    ? (
      <main className="sys" id="main">
        <header className="sys-top">
          <Link href="/" aria-label="العابد ديجيتال لوك"><img src="/assets/logo/alabed-logo-white.webp" alt="ALABED Digital Lock" width="128" height="50" /></Link>
          <a className="sys-lang" href="/en/404" lang="en">
            <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
            English
          </a>
        </header>
        <div className="sys-body">
          <div>
            <p className="sys-num sys-in" aria-hidden="true">404</p>
            <h1 className="sys-in">هذا الباب مُقفل… أو غير موجود</h1>
            <p className="sys-p sys-in">ربما تغيّر الرابط أو كُتب بشكل خاطئ. ابحث عن القفل الذي تريده، أو ارجع للرئيسية.</p>
            <div className="sys-in">
              <form className="sys-search" action="/shop" role="search">
                <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <label className="sr-only" htmlFor="q404">ابحث</label>
                <input id="q404" name="q" type="search" placeholder="مثال: خزنة، بطاقة، بصمة" />
                <button className="btn btn--primary btn--sm" type="submit">ابحث</button>
              </form>
              <div className="sys-actions">
                <Link className="btn btn--primary" href="/">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 11 12 4l9 7" />
                    <path d="M5 9.5V20h14V9.5" />
                    <path d="M10 20v-6h4v6" />
                  </svg>
                  الرئيسية
                </Link>
                <Link className="btn btn--ghost" href="/contact">أبلغنا عن رابط معطّل</Link>
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
          <svg className="sys-art sys-art--404" viewBox="0 0 200 240" aria-hidden="true">
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
          <a className="sys-lang" href="/404" lang="ar">
            <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
            العربية
          </a>
        </header>
        <div className="sys-body">
          <div>
            <p className="sys-num sys-in" aria-hidden="true">404</p>
            <h1 className="sys-in">This door is locked… or it doesn’t exist</h1>
            <p className="sys-p sys-in">The link may have changed or been typed incorrectly. Search for the lock you need, or head back home.</p>
            <div className="sys-in">
              <form className="sys-search" action="/en/shop" role="search">
                <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <label className="sr-only" htmlFor="q404">Search</label>
                <input id="q404" name="q" type="search" placeholder="e.g. safe, card, fingerprint" />
                <button className="btn btn--primary btn--sm" type="submit">Search</button>
              </form>
              <div className="sys-actions">
                <Link className="btn btn--primary" href="/en">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 11 12 4l9 7" />
                    <path d="M5 9.5V20h14V9.5" />
                    <path d="M10 20v-6h4v6" />
                  </svg>
                  Home
                </Link>
                <Link className="btn btn--ghost" href="/en/contact">Report a broken link</Link>
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
          <svg className="sys-art sys-art--404" viewBox="0 0 200 240" aria-hidden="true">
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
      {page}
      <SysScript lang={lang} title={TITLE[lang]} />
    </>
  );
}
