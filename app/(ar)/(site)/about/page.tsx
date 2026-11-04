import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import DialHero from '@/components/about/DialHero';
import SpecAccordion from '@/components/about/SpecAccordion';
import CtaBand from '@/components/sections/CtaBand';

export const metadata: Metadata = pageMetadata({
  lang: 'ar',
  path: '/about',
  title: 'من نحن',
  description: 'العابد ديجيتال لوك: 25 عامًا في أنظمة الأقفال الإلكترونية، والوكيل الوحيد المعتمد لشركة Goodum العالمية في مصر. أقفال ذكية وخزن غرف وباور سيفر للفنادق والمنازل والمكاتب من العابد ديجيتال لوك.',
});

export default function AboutPage() {
  return (
    <>
      {/* ================= About hero ================= */}
      <DialHero>
        <span className="hero-bar" aria-hidden="true" />
        {/* Hero photo: real combination dial, the numbered ring spins */}
        <div className="ab-media" data-abdial data-cx="672.5" data-fx="680" data-target="2.33" aria-hidden="true">
          <svg className="ab-media__svg" viewBox="0 0 1888 905" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="abFeather" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.8" /></filter>
              <filter id="abFeather2" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="3" /></filter>
              <mask id="abRingMask" maskUnits="userSpaceOnUse" x="-200" y="-200" width="2300" height="1300">
                <rect x="-200" y="-200" width="2300" height="1300" fill="#fff" />
                <ellipse cx="679" cy="425.5" rx="121" ry="133.5" fill="#000" filter="url(#abFeather)" />
              </mask>
              <mask id="abKnobShow" maskUnits="userSpaceOnUse" x="-200" y="-200" width="2300" height="1300">
                <ellipse cx="679" cy="425.5" rx="121" ry="133.5" fill="#fff" filter="url(#abFeather)" />
              </mask>
              <mask id="abFaceMask" maskUnits="userSpaceOnUse" x="-200" y="-200" width="2300" height="1300">
                <ellipse cx="697" cy="430" rx="95" ry="99" fill="#fff" filter="url(#abFeather2)" />
              </mask>
              <radialGradient id="abGlow">
                <stop offset="0" stopColor="#FFD27A" stopOpacity=".9" />
                <stop offset=".45" stopColor="#FAAB08" stopOpacity=".35" />
                <stop offset="1" stopColor="#FAAB08" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="abFadeL" x1="0" x2="1">
                <stop offset="0" stopColor="#0F1432" />
                <stop offset="1" stopColor="#0F1432" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="abFadeT" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#0F1432" />
                <stop offset="1" stopColor="#0F1432" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="abFadeB" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="#0F1432" />
                <stop offset="1" stopColor="#0F1432" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect x="-6000" y="-3000" width="14000" height="7000" fill="#0F1432" />
            <g className="ab-media__photo" data-ab="photo">
              <g>
                <image href="/assets/about-dial-clean.webp" x="0" y="0" width="1888" height="905" preserveAspectRatio="none" />
                <rect x="0" y="0" width="150" height="905" fill="url(#abFadeL)" />
                <rect x="0" y="0" width="1888" height="70" fill="url(#abFadeT)" />
                <rect x="0" y="835" width="1888" height="70" fill="url(#abFadeB)" />
              </g>
              <g mask="url(#abRingMask)">
                <g data-ab="rotor"><image href="/assets/about-ring.webp" x="388.2" y="173.3" width="547.4" height="518.1" preserveAspectRatio="none" /></g>
              </g>
              <ellipse data-ab="dim" cx="697" cy="430" rx="100" ry="104" fill="#060818" opacity=".72" />
              <ellipse data-ab="glow" cx="697" cy="425" rx="150" ry="120" fill="url(#abGlow)" opacity="0" style={{ mixBlendMode: "screen" }} />
              <ellipse data-ab="tip" cx="677" cy="168" rx="34" ry="30" fill="url(#abGlow)" opacity="0" style={{ mixBlendMode: "screen" }} />
              <ellipse data-ab="wave" cx="672.5" cy="425" rx="232" ry="244" fill="none" stroke="#FAAB08" strokeWidth="2" opacity="0" vectorEffect="non-scaling-stroke" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
            </g>
          </svg>
          {" "}
          <span className="ab-media__grab" data-ab="grab" />
        </div>
        <div className="container ab-hero__grid">
          <div>
            <nav className="crumbs" aria-label="مسار التنقل">
              <Link href="/">الرئيسية</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">من نحن</span>
            </nav>
            <h1 id="ab-title"><span className="reveal-ln"><span>25 سنة خبرة…</span></span><span className="reveal-ln"><span>وثقة عملاء في كل مكان</span></span></h1>
            <p className="ab-hero__lead fade-up d1">في عالم بيتغير فيه مفهوم الأمان كل يوم، احنا مش بس بنواكب التطور…{" "}<strong>احنا اللي بنصنعه.</strong></p>
            <div className="ab-hero__ctas fade-up d2">
              <Link className="btn btn--primary" href="/shop">تصفّح المنتجات</Link>
              {" "}
              <a className="btn btn--outline btn--outline-light" href="#quote" data-open="quote">اطلب عرض سعر</a>
            </div>
          </div>
        </div>
      </DialHero>
      {/* ================= Who we are ================= */}
      <section className="section ab-intro deco-a" aria-labelledby="intro-title">
        <div className="container">
          <div className="ab-intro__grid">
            <h2 id="intro-title" data-reveal><span>شركة العابد ديجيتال لوك</span></h2>
            <div className="ab-intro__text" data-reveal style={{ '--d': "1" }}>
              <p>
                بخبرة تمتد لـ{" "}
                <strong>25 عامًا</strong>
                {" "}في مجال أنظمة الأقفال الإلكترونية، و
                <strong>الوكيل الوحيد المعتمد لشركة Goodum العالمية في مصر</strong>
                .
              </p>
              <p>بنوفر لعملائنا حلول أمان متكاملة تجمع بين الجودة العالمية والدعم الفني المحلي، من الفنادق الكبرى للمنازل.</p>
            </div>
          </div>
          <div className="facts">
            <div className="fact" data-reveal>
              <span className="fact__icon"><svg className="ic"><use href="#i-shield-spark" /></svg></span>
              <div className="fact__body"><strong>25{" "}<em>عامًا</em></strong><span>خبرة في مجال أنظمة الأقفال الإلكترونية</span></div>
            </div>
            <div className="fact" data-reveal style={{ '--d': "1" }}>
              <span className="fact__icon"><svg className="ic"><use href="#i-globe" /></svg></span>
              <div className="fact__body"><strong>Goodum</strong><span>الوكيل الوحيد المعتمد للشركة العالمية في مصر</span></div>
            </div>
            <div className="fact" data-reveal style={{ '--d': "2" }}>
              <span className="fact__icon"><svg className="ic"><use href="#i-handshake" /></svg></span>
              <div className="fact__body"><strong>جودة{" "}<em>+</em>{" "}دعم</strong>
              <span>جودة عالمية ودعم فني محلي، من الفنادق الكبرى للمنازل</span></div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= Specialties ================= */}
      <section className="section section--alt deco-b" aria-labelledby="spec-title">
        <div className="container">
          <div className="spec__head">
            <div><h2 id="spec-title">متخصصون في</h2><p>كل ما تحتاجه غرفة الفندق أو باب البيت، من مورد واحد.</p></div>
            <Link className="more" href="/shop">كل المنتجات<svg className="ic"><use href="#i-arrow" /></svg></Link>
          </div>
          <SpecAccordion lang="ar" />
        </div>
      </section>
      {/* ================= CTA band ================= */}
      <CtaBand lang="ar" />
    </>
  );
}
