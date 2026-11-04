import Link from 'next/link';
import Partners from '@/components/home/Partners';
import UnlockStage from '@/components/home/UnlockStage';
import ProductCard from '@/components/ProductCard';
import CtaBand from '@/components/sections/CtaBand';
import FaqTeaser from '@/components/sections/FaqTeaser';
import { featured } from '@/lib/catalog';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({ lang: 'en', path: '/' });

export default function HomePage() {
  return (
    <>
      {/* ================= Hero ================= */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__bg" aria-hidden="true" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <h1 id="hero-title">Complete security{" "}<span>for peace of mind</span></h1>
            <p className="hero__lead">
              We bring you the finest door locks, built from high-quality materials with modern technology that keeps you protected and secure.
            </p>
            <div className="hero__ctas">
              <a className="btn btn--primary" href="#quote" data-open="quote">Request a quote</a>
              {" "}
              <Link className="btn btn--outline btn--outline-light" href="/en/shop">Browse products</Link>
            </div>
          </div>
          <div className="hero__anim">
            <UnlockStage lang="en" />
          </div>
        </div>
      </section>
      {/* ================= Categories ================= */}
      <section className="section deco-a" aria-labelledby="cat-title">
        <div className="container">
          <div className="head">
            <div><h2 id="cat-title">Four categories, one system</h2><p>Pick what you need, or ask for the complete hotel-room package.</p></div>
            <Link className="more" href="/en/shop">All products<svg className="ic"><use href="#i-arrow" /></svg></Link>
          </div>
          <div className="cats">
            <Link className="cat" href="/en/shop?kind=lock" data-reveal style={{ '--d': "0" }}>
              <div className="cat__media"><img src="/assets/products/colors/v81-silver.webp" alt="Smart locks - V81 hotel lock in silver with RFID card | Alabed Digital Lock" loading="lazy" /></div>
              <div className="cat__body">
                <h3>Smart locks</h3>
                <p>RFID hotel locks, fingerprint + card + PIN locks, and automatic locks with face recognition.</p>
                <span className="cat__link">Browse locks<svg className="ic"><use href="#i-arrow" /></svg></span>
              </div>
            </Link>
            {" "}
            <Link className="cat" href="/en/shop?kind=safe" data-reveal style={{ '--d': "1" }}>
              <div className="cat__media"><img src="/assets/products/me-2043uzh-2.webp" alt="ME-2043UZH electronic hotel room safe | Alabed Digital Lock" loading="lazy" /></div>
              <div className="cat__body">
                <h3>Safes</h3>
                <p>Hotel room safes with an electronic keypad and an emergency key lock, plus the QNN model that opens with an NFC card.</p>
                <span className="cat__link">Safe details<svg className="ic"><use href="#i-arrow" /></svg></span>
              </div>
            </Link>
            {" "}
            <Link className="cat" href="/en/shop?kind=power" data-reveal style={{ '--d': "2" }}>
              <div className="cat__media"><img src="/assets/products/power-saver.webp" alt="Power saver energy-saving key card switch for hotel rooms | Alabed Digital Lock" loading="lazy" /></div>
              <div className="cat__body">
                <h3>Power saver</h3>
                <p>A key-card switch for rooms: insert the card to turn on the power.</p>
                <span className="cat__link">Power saver details<svg className="ic"><use href="#i-arrow" /></svg></span>
              </div>
            </Link>
            {" "}
            <Link className="cat" href="/en/shop?kind=bell" data-reveal style={{ '--d': "3" }}>
              <div className="cat__media"><img src="/assets/products/doorbell-dnd.webp" alt="Room doorbells - electric doorbell with DND and digital room number | Alabed Digital Lock" loading="lazy" /></div>
              <div className="cat__body">
                <h3>Doorbells</h3>
                <p>Room doorbells with Do not disturb, Make up room and the room number, made to your room numbers.</p>
                <span className="cat__link">Doorbell details<svg className="ic"><use href="#i-arrow" /></svg></span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* ================= Partners ================= */}
      <Partners lang="en" />
      {/* ================= Featured models ================= */}
      <section className="section section--navy section--gap" id="models" aria-labelledby="feat-title">
        <div className="container">
          <div className="head head--sm">
            <div><h2 id="feat-title">Featured models</h2><p>Add what you like to your quote list and send it all on WhatsApp in one go.</p></div>
            <Link className="more" href="/en/shop">All products<svg className="ic"><use href="#i-arrow" /></svg></Link>
          </div>
          <div className="pgrid" data-products>
            {featured('en').map((p, i) => <ProductCard p={p} lang="en" variant="home" index={i} key={p.id} />)}
          </div>
        </div>
      </section>
      {/* ================= Why ================= */}
      <section className="section section--alt section--gap deco-b" id="why" aria-labelledby="why-title">
        <div className="container">
          <div className="head"><div><h2 id="why-title">Why Alabed?</h2></div></div>
          <div className="why">
            <div data-reveal style={{ '--d': "0" }}>
              <div className="why__mark" aria-hidden="true"><svg className="ic"><use href="#i-stack" /></svg></div>
              <h3>Four categories, one supplier</h3>
              <p>Locks, safes, power savers and doorbells in one quote and one delivery.</p>
            </div>
            <div data-reveal style={{ '--d': "1" }}>
              <div className="why__mark" aria-hidden="true"><svg className="ic"><use href="#i-bed" /></svg></div>
              <h3>Built for hotel rooms</h3>
              <p>The guest card links the door and the power in one experience.</p>
            </div>
            <div data-reveal style={{ '--d': "2" }}>
              <div className="why__mark" aria-hidden="true"><svg className="ic"><use href="#i-palette" /></svg></div>
              <h3>Finishes to match your decor</h3>
              <p>Hotel locks in silver, black and gold (PVD), depending on the model.</p>
            </div>
            <div data-reveal style={{ '--d': "3" }}>
              <div className="why__mark" aria-hidden="true"><svg className="ic"><use href="#i-tools" /></svg></div>
              <h3>Supply, installation &amp; support</h3>
              <p>We supply, install and follow up after handover. [Confirm service scope]</p>
            </div>
          </div>
        </div>
      </section>
      {/* ================= Solutions ================= */}
      <section className="section deco-a" aria-labelledby="sol-title">
        <div className="container">
          <div className="head">
            <div>
              <h2 id="sol-title">Solutions by place</h2>
              <p className="sol-sub" style={{ fontSize: "18px" }}>We recommend the right models for your hotel, home or office.</p>
            </div>
            <Link className="more" href="/en/shop">All products<svg className="ic"><use href="#i-arrow" /></svg></Link>
          </div>
          <div className="sols">
            <Link className="sol" href="/en/shop?use=hotel#catalog" data-type="hotel" data-reveal style={{ '--d': "0" }}>
              <img src="/assets/products/colors/a21-black-1.webp" alt="A21 RFID hotel lock in black | Alabed Digital Lock" aria-hidden="true" loading="lazy" />
              <h3>Hotels</h3>
              <p>A lock, safe and power saver for every room.</p>
              <span className="sol__link">See the solution<svg className="ic"><use href="#i-arrow" /></svg></span>
            </Link>
            {" "}
            <Link className="sol" href="/en/shop?use=home#catalog" data-type="home" data-reveal style={{ '--d': "1" }}>
              <img src="/assets/products/colors/gm6s-copper.webp" alt="GM6S Pro smart lock for homes and villas | Alabed Digital Lock" aria-hidden="true" loading="lazy" />
              <h3>Homes &amp; villas</h3>
              <p>Face, fingerprint and PIN instead of keys, plus a safe for valuables.</p>
              <span className="sol__link">See the solution<svg className="ic"><use href="#i-arrow" /></svg></span>
            </Link>
            {" "}
            <Link className="sol" href="/en/shop?type=rfid#catalog" data-type="office" data-reveal style={{ '--d': "2" }}>
              <img src="/assets/products/k51.webp" alt="K51 card lock for offices | Alabed Digital Lock" aria-hidden="true" loading="lazy" />
              <h3>Offices</h3>
              <p>Staff cards and locks that suit modern doors.</p>
              <span className="sol__link">See the solution<svg className="ic"><use href="#i-arrow" /></svg></span>
            </Link>
            {" "}
            <Link className="sol" href="/en/shop?use=apartment#catalog" data-type="apartment" data-reveal style={{ '--d': "3" }}>
              <img src="/assets/products/colors/e68-silver.webp" alt="E68 fingerprint lock in silver for apartments | Alabed Digital Lock" aria-hidden="true" loading="lazy" />
              <h3>Apartments &amp; compounds</h3>
              <p>Fingerprint, PIN and card for every unit.</p>
              <span className="sol__link">See the solution<svg className="ic"><use href="#i-arrow" /></svg></span>
            </Link>
          </div>
        </div>
      </section>
      {/* ================= Reviews ================= */}
      <section className="section section--alt section--reviews deco-b" aria-labelledby="rev-title">
        <div className="container">
          <div className="reviews__head">
            <h2 id="rev-title">Customer reviews</h2>
            <p>We value our clients’ trust and always aim to exceed their expectations on every project</p>
          </div>
          <div className="revs">
            <article className="rev" data-reveal style={{ '--d': "0" }}>
              <svg className="rev__quote" aria-hidden="true"><use href="#i-quote" /></svg>
              <div className="rev__top">
                <span className="rev__avatar" aria-hidden="true" />
                <div>
                  <div className="rev__name">XXXXXXXXXXXXX</div>
                  <div className="stars" aria-label="5 out of 5">
                    <svg className="ic"><use href="#i-star" /></svg>
                    <svg className="ic"><use href="#i-star" /></svg>
                    <svg className="ic"><use href="#i-star" /></svg>
                    <svg className="ic"><use href="#i-star" /></svg>
                    <svg className="ic"><use href="#i-star" /></svg>
                  </div>
                </div>
              </div>
              <p className="rev__text">XXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXX</p>
            </article>
            <article className="rev" data-reveal style={{ '--d': "1" }}>
              <svg className="rev__quote" aria-hidden="true"><use href="#i-quote" /></svg>
              <div className="rev__top">
                <span className="rev__avatar" aria-hidden="true" />
                <div>
                  <div className="rev__name">XXXXXXXXXXXXX</div>
                  <div className="stars" aria-label="5 out of 5">
                    <svg className="ic"><use href="#i-star" /></svg>
                    <svg className="ic"><use href="#i-star" /></svg>
                    <svg className="ic"><use href="#i-star" /></svg>
                    <svg className="ic"><use href="#i-star" /></svg>
                    <svg className="ic"><use href="#i-star" /></svg>
                  </div>
                </div>
              </div>
              <p className="rev__text">XXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXX</p>
            </article>
            <article className="rev" data-reveal style={{ '--d': "2" }}>
              <svg className="rev__quote" aria-hidden="true"><use href="#i-quote" /></svg>
              <div className="rev__top">
                <span className="rev__avatar" aria-hidden="true" />
                <div>
                  <div className="rev__name">XXXXXXXXXXXXX</div>
                  <div className="stars" aria-label="5 out of 5">
                    <svg className="ic"><use href="#i-star" /></svg>
                    <svg className="ic"><use href="#i-star" /></svg>
                    <svg className="ic"><use href="#i-star" /></svg>
                    <svg className="ic"><use href="#i-star" /></svg>
                    <svg className="ic"><use href="#i-star" /></svg>
                  </div>
                </div>
              </div>
              <p className="rev__text">XXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXX</p>
            </article>
          </div>
        </div>
      </section>
      {/* ================= FAQ ================= */}
      <FaqTeaser lang="en" />
      {/* ================= CTA band ================= */}
      <CtaBand lang="en" />
    </>
  );
}
