import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import DialHero from '@/components/about/DialHero';
import SpecAccordion from '@/components/about/SpecAccordion';
import CtaBand from '@/components/sections/CtaBand';

export const metadata: Metadata = pageMetadata({
  lang: 'en',
  path: '/about',
  title: 'About us',
  description: 'Alabed Digital Lock: 25 years in electronic lock systems, and the sole authorized distributor of Goodum in Egypt. Smart locks, in-room safes and power savers for hotels, homes and offices from Alabed Digital Lock.',
});

export default function AboutPage() {
  return (
    <>
      {/* ================= About hero ================= */}
      <DialHero>
        <span className="hero-bar" aria-hidden="true" />
        {/* Hero photo: real combination dial, the numbered ring spins */}
        <div className="ab-media" data-abdial data-cx="1215.5" data-fx="1208" data-target="0" aria-hidden="true">
          <svg className="ab-media__svg" viewBox="0 0 1888 905" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="abFeather" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.8" /></filter>
              <filter id="abFeather2" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="3" /></filter>
              <mask id="abRingMask" maskUnits="userSpaceOnUse" x="-200" y="-200" width="2300" height="1300">
                <rect x="-200" y="-200" width="2300" height="1300" fill="#fff" />
                <ellipse cx="1209" cy="425.5" rx="121" ry="133.5" fill="#000" filter="url(#abFeather)" />
              </mask>
              <mask id="abKnobShow" maskUnits="userSpaceOnUse" x="-200" y="-200" width="2300" height="1300">
                <ellipse cx="1209" cy="425.5" rx="121" ry="133.5" fill="#fff" filter="url(#abFeather)" />
              </mask>
              <mask id="abFaceMask" maskUnits="userSpaceOnUse" x="-200" y="-200" width="2300" height="1300">
                <ellipse cx="1191" cy="430" rx="95" ry="99" fill="#fff" filter="url(#abFeather2)" />
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
              <g transform="translate(1888 0) scale(-1 1)">
                <image href="/assets/about-dial-clean.webp" x="0" y="0" width="1888" height="905" preserveAspectRatio="none" />
                <rect x="0" y="0" width="150" height="905" fill="url(#abFadeL)" />
                <rect x="0" y="0" width="1888" height="70" fill="url(#abFadeT)" />
                <rect x="0" y="835" width="1888" height="70" fill="url(#abFadeB)" />
              </g>
              <g mask="url(#abRingMask)">
                <g data-ab="rotor"><image href="/assets/about-ring.webp" x="931.2" y="173.3" width="547.4" height="518.1" preserveAspectRatio="none" /></g>
              </g>
              <image href="/assets/about-dial-ring-en.webp" x="980.6" y="173" width="473.7" height="502" preserveAspectRatio="none" mask="url(#abKnobShow)" />
              <ellipse data-ab="dim" cx="1191" cy="430" rx="100" ry="104" fill="#060818" opacity=".72" />
              <ellipse data-ab="glow" cx="1191" cy="425" rx="150" ry="120" fill="url(#abGlow)" opacity="0" style={{ mixBlendMode: "screen" }} />
              <ellipse data-ab="tip" cx="1211" cy="168" rx="34" ry="30" fill="url(#abGlow)" opacity="0" style={{ mixBlendMode: "screen" }} />
              <ellipse data-ab="wave" cx="1215.5" cy="425" rx="232" ry="244" fill="none" stroke="#FAAB08" strokeWidth="2" opacity="0" vectorEffect="non-scaling-stroke" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
            </g>
          </svg>
          {" "}
          <span className="ab-media__grab" data-ab="grab" />
          {" "}
          <span className="ab-media__hint" data-ab="hint"><svg className="ic"><use href="#i-drag" /></svg>Spin the dial</span>
        </div>
        <div className="container ab-hero__grid">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/en">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">About us</span>
            </nav>
            <h1 id="ab-title">
              <span className="reveal-ln"><span>25 years of expertise…</span></span>
              <span className="reveal-ln"><span>trusted by clients everywhere</span></span>
            </h1>
            <p className="ab-hero__lead fade-up d1">
              In a world where the meaning of security changes every day, we don’t just keep up with progress…{" "}
              <strong>we drive it.</strong>
            </p>
            <div className="ab-hero__ctas fade-up d2">
              <Link className="btn btn--primary" href="/en/shop">Browse products</Link>
              {" "}
              <a className="btn btn--outline btn--outline-light" href="#quote" data-open="quote">Request a quote</a>
            </div>
          </div>
        </div>
      </DialHero>
      {/* ================= Who we are ================= */}
      <section className="section ab-intro deco-a" aria-labelledby="intro-title">
        <div className="container">
          <div className="ab-intro__grid">
            <h2 id="intro-title" data-reveal><span>Alabed Digital Lock</span></h2>
            <div className="ab-intro__text" data-reveal style={{ '--d': "1" }}>
              <p>
                With{" "}
                <strong>25 years</strong>
                {" "}of experience in electronic lock systems, we are{" "}
                <strong>the sole authorized distributor of Goodum in Egypt</strong>
                .
              </p>
              <p>
                We give our clients complete security solutions that combine world-class quality with local technical support, from major hotels to private homes.
              </p>
            </div>
          </div>
          <div className="facts">
            <div className="fact" data-reveal>
              <span className="fact__icon"><svg className="ic"><use href="#i-shield-spark" /></svg></span>
              <div className="fact__body"><strong>25{" "}<em>years</em></strong><span>of experience in electronic lock systems</span></div>
            </div>
            <div className="fact" data-reveal style={{ '--d': "1" }}>
              <span className="fact__icon"><svg className="ic"><use href="#i-globe" /></svg></span>
              <div className="fact__body"><strong>Goodum</strong>
              <span>The global brand’s sole authorized distributor in Egypt</span></div>
            </div>
            <div className="fact" data-reveal style={{ '--d': "2" }}>
              <span className="fact__icon"><svg className="ic"><use href="#i-handshake" /></svg></span>
              <div className="fact__body"><strong>Quality{" "}<em>+</em>{" "}support</strong>
              <span>World-class quality and local technical support, from major hotels to private homes</span></div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= Specialties ================= */}
      <section className="section section--alt deco-b" aria-labelledby="spec-title">
        <div className="container">
          <div className="spec__head">
            <div><h2 id="spec-title">What we specialize in</h2><p>Everything a hotel room or a front door needs, from one supplier.</p></div>
            <Link className="more" href="/en/shop">All products<svg className="ic"><use href="#i-arrow" /></svg></Link>
          </div>
          <SpecAccordion lang="en" />
        </div>
      </section>
      {/* ================= CTA band ================= */}
      <CtaBand lang="en" />
    </>
  );
}
