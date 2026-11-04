import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { catalogLd, pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import CtaBand from '@/components/sections/CtaBand';
import FaqTeaser from '@/components/sections/FaqTeaser';
import ShopCatalog from '@/components/shop/ShopCatalog';
import ShopHero from '@/components/shop/ShopHero';

export const metadata: Metadata = pageMetadata({
  lang: 'ar',
  path: '/shop',
  title: 'المتجر',
  description: 'تصفّح أقفال الفنادق RFID وأقفال البصمة والوجه والرمز السري والخزن الفندقية ومفاتيح توفير الطاقة (باور سيفر) من العابد ديجيتال لوك، واطلب عرض سعر على واتساب.',
});

export default function ShopPage() {
  return (
    <>
      <JsonLd data={catalogLd('ar')} />
      {/* ================= Shop hero ================= */}
      <ShopHero lang="ar">
        <span className="hero-bar" aria-hidden="true" />
        {/* Hero visual: hotel card lock, card tap opens the room */}
        <div className="shop-media" data-shoplock aria-hidden="true">
          <svg className="shop-media__svg" direction="ltr" viewBox="0 0 777 814" preserveAspectRatio="xMaxYMid slice">
      <defs>
        <filter id="slShadow" x="-20%" y="-40%" width="140%" height="200%"><feDropShadow dx="0" dy="9" stdDeviation="7" floodColor="#05071A" floodOpacity=".42" /></filter>
        <filter id="slShadowBody" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="12" stdDeviation="13" floodColor="#05071A" floodOpacity=".45" /></filter>
        <radialGradient id="slSpill"><stop offset="0" stopColor="#FFC774" stopOpacity=".95" /><stop offset=".45" stopColor="#FFB14A" stopOpacity=".38" /><stop offset="1" stopColor="#FFB14A" stopOpacity="0" /></radialGradient>
        <linearGradient id="slEdge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFC774" stopOpacity="0" /><stop offset=".5" stopColor="#FFD28A" stopOpacity="1" /><stop offset="1" stopColor="#FFC774" stopOpacity="0" /></linearGradient>
        <radialGradient id="slGreen"><stop offset="0" stopColor="#C9FFD9" stopOpacity="1" /><stop offset=".4" stopColor="#36E07A" stopOpacity=".6" /><stop offset="1" stopColor="#36E07A" stopOpacity="0" /></radialGradient>
        <linearGradient id="slCard" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#232C62" /><stop offset="1" stopColor="#0D1230" /></linearGradient>
        <linearGradient id="slGold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#FDDC94" /><stop offset="1" stopColor="#FAAB08" /></linearGradient>
      </defs>
      <g className="shop-media__photo" data-sl="photo">
        <image href="/assets/shop-hero-lock.webp" x="0" y="0" width="777" height="814" preserveAspectRatio="none" transform="translate(777 0) scale(-1 1)" />
        <image href="/assets/shop-door.webp" x="1.8" y="-11" width="803.5" height="836.3" preserveAspectRatio="none" />
        <image href="/assets/shop-lock-body.webp" x="269.1" y="165.3" width="245.3" height="534.7" preserveAspectRatio="none" filter="url(#slShadowBody)" />
        <g data-sl="handle" filter="url(#slShadow)"><g data-sl="lever" style={{ transformBox: "view-box", transformOrigin: "382.5px 554.1px" }}><image href="/assets/shop-lock-lever.webp" x="64.3" y="168.0" width="448.5" height="533.1" preserveAspectRatio="none" /></g></g>
        <ellipse data-sl="spill" cx="657" cy="430" rx="190" ry="440" fill="url(#slSpill)" opacity="0" style={{ mixBlendMode: "screen" }} />
        <rect data-sl="edge" x="578" y="40" width="4" height="740" fill="url(#slEdge)" opacity="0" style={{ mixBlendMode: "screen" }} />
        <ellipse data-sl="led" cx="378.2" cy="261.1" rx="44" ry="13" fill="url(#slGreen)" opacity="0" style={{ mixBlendMode: "screen" }} />
        <rect data-sl="ledbar" x="346.2" y="257.2" width="64" height="7.8" rx="4.5" fill="#3BE680" opacity="0" />
        <g data-sl="waves" fill="none" stroke="#FAAB08" strokeWidth="2" vectorEffect="non-scaling-stroke">
          <circle cx="378.2" cy="220.1" r="14" opacity="0" /><circle cx="378.2" cy="220.1" r="14" opacity="0" /><circle cx="378.2" cy="220.1" r="14" opacity="0" />
        </g>
        <g data-sl="card" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <g transform="translate(320.8 182.0) scale(0.95)" direction="ltr">
            <rect width="124" height="78" rx="8" fill="url(#slCard)" stroke="url(#slGold)" strokeWidth="1.4" />
            <rect x="12" y="14" width="18" height="14" rx="3" fill="url(#slGold)" />
            <path d="M104 18a7 7 0 0 1 0 10M109 15a12 12 0 0 1 0 16" stroke="#FDDC94" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <image href="/assets/logo/alabed-logo-card.webp" x="12" y="33" width="86" height="33.3" preserveAspectRatio="xMinYMid meet" />
            <path d="M0 70h124v0a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8z" fill="#FAAB08" opacity=".9" />
          </g>
        </g>
      </g>
    </svg>
        </div>
        <div className="container shop-hero__in">
          <div className="shop-hero__copy">
            <nav className="crumbs" aria-label="مسار التنقل">
              <Link href="/">الرئيسية</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">المتجر</span>
            </nav>
            <h1 id="shop-title">اكتشف{" "}<span>مجموعتنا</span></h1>
            <p>تصفّح مجموعتنا المختارة واكتشف المنتجات اللي تناسبك.</p>
            <a className="btn btn--primary" href="#catalog" data-kind-link="lock">تصفّح الأقفال الذكية</a>
          </div>
        </div>
      </ShopHero>
      {/* ================= Catalog ================= */}
      <ShopCatalog lang="ar" />
      {/* ================= FAQ ================= */}
      <FaqTeaser lang="ar" />
      {/* ================= CTA band ================= */}
      <CtaBand lang="ar" />
    </>
  );
}
