import Link from 'next/link';
import Partners from '@/components/home/Partners';
import UnlockStage from '@/components/home/UnlockStage';
import ProductCard from '@/components/ProductCard';
import CtaBand from '@/components/sections/CtaBand';
import FaqTeaser from '@/components/sections/FaqTeaser';
import { featured } from '@/lib/catalog';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({ lang: 'ar', path: '/' });

export default function HomePage() {
  return (
    <>
      {/* ================= Hero ================= */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__bg" aria-hidden="true" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <h1 id="hero-title">حلول أمان متكاملة{" "}<span>لراحة بالك</span></h1>
            <p className="hero__lead">نقدم لك أفضل أنواع أقفال الأبواب بخامات عالية الجودة وتقنيات حديثة تضمن لك الحماية والأمان.</p>
            <div className="hero__ctas">
              <a className="btn btn--primary" href="#quote" data-open="quote">اطلب عرض سعر</a>
              {" "}
              <Link className="btn btn--outline btn--outline-light" href="/shop">تصفّح المنتجات</Link>
            </div>
          </div>
          <div className="hero__anim">
            <svg className="hero__frame" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="heroPanel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#1A2150" stopOpacity=".9" />
                  <stop offset="1" stopColor="#151B42" stopOpacity=".35" />
                </linearGradient>
              </defs>
              <polygon className="fp" points="0,0 88,0 100,100 0,100" />
              <polygon className="fe" points="4,3 91,3 100,97" />
            </svg>
            <UnlockStage lang="ar" />
          </div>
        </div>
      </section>
      {/* ================= Categories ================= */}
      <section className="section" aria-labelledby="cat-title">
        <div className="container">
          <div className="head">
            <div><h2 id="cat-title">ثلاث فئات، منظومة واحدة</h2><p>اختر ما تحتاجه، أو اطلب الباقة الكاملة لغرف الفندق.</p></div>
            <Link className="more" href="/shop">كل المنتجات<svg className="ic"><use href="#i-arrow" /></svg></Link>
          </div>
          <div className="cats">
            <Link className="cat" href="/shop?kind=lock" data-reveal style={{ '--d': "0" }}>
              <div className="cat__media"><img src="/assets/products/gm8s-pro.webp" alt="قفل ذكي GM8S Pro" loading="lazy" /></div>
              <div className="cat__body">
                <h3>الأقفال الذكية</h3>
                <p>أقفال فندقية ببطاقات RFID، وأقفال ببصمة وبطاقة ورمز، وأقفال أوتوماتيكية بالتعرف على الوجه.</p>
                <span className="cat__link">تصفّح الأقفال<svg className="ic"><use href="#i-arrow" /></svg></span>
              </div>
            </Link>
            {" "}
            <Link className="cat" href="/shop?kind=safe" data-reveal style={{ '--d': "1" }}>
              <div className="cat__media"><img src="/assets/products/me-2043uzh-2.webp" alt="خزنة غرف فندقية" loading="lazy" /></div>
              <div className="cat__body">
                <h3>الخزن</h3>
                <p>خزن غرف فندقية بلوحة أرقام إلكترونية وقفل طوارئ بمفتاح.</p>
                <span className="cat__link">تفاصيل الخزن<svg className="ic"><use href="#i-arrow" /></svg></span>
              </div>
            </Link>
            {" "}
            <Link className="cat" href="/shop?kind=power" data-reveal style={{ '--d': "2" }}>
              <div className="cat__media"><img src="/assets/products/power-saver.webp" alt="مفتاح توفير الطاقة" loading="lazy" /></div>
              <div className="cat__body">
                <h3>باور سيفر</h3>
                <p>مفتاح بطاقة للغرف: أدخل البطاقة لتشغيل الكهرباء.</p>
                <span className="cat__link">تفاصيل الباور سيفر<svg className="ic"><use href="#i-arrow" /></svg></span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* ================= Partners ================= */}
      <Partners lang="ar" />
      {/* ================= Featured models ================= */}
      <section className="section section--navy section--gap" id="models" aria-labelledby="feat-title">
        <div className="container">
          <div className="head head--sm">
            <div><h2 id="feat-title">موديلات مختارة</h2><p>أضف ما يعجبك إلى قائمة طلب السعر وأرسلها على واتساب دفعة واحدة.</p></div>
            <Link className="more" href="/shop">كل المنتجات<svg className="ic"><use href="#i-arrow" /></svg></Link>
          </div>
          <div className="pgrid" data-products>
            {featured('ar').map((p, i) => <ProductCard p={p} lang="ar" variant="home" index={i} key={p.id} />)}
          </div>
        </div>
      </section>
      {/* ================= Why ================= */}
      <section className="section section--alt section--gap" id="why" aria-labelledby="why-title">
        <div className="container">
          <div className="head"><div><h2 id="why-title">لماذا العابد ؟</h2></div></div>
          <div className="why">
            <div data-reveal style={{ '--d': "0" }}>
              <div className="why__mark" aria-hidden="true"><svg className="ic"><use href="#i-stack" /></svg></div>
              <h3>ثلاث فئات من مورد واحد</h3>
              <p>أقفال وخزن وباور سيفر في عرض سعر واحد وتوريد واحد.</p>
            </div>
            <div data-reveal style={{ '--d': "1" }}>
              <div className="why__mark" aria-hidden="true"><svg className="ic"><use href="#i-bed" /></svg></div>
              <h3>مصممة لغرف الفنادق</h3>
              <p>بطاقة النزيل تربط الباب والكهرباء في تجربة واحدة.</p>
            </div>
            <div data-reveal style={{ '--d': "2" }}>
              <div className="why__mark" aria-hidden="true"><svg className="ic"><use href="#i-palette" /></svg></div>
              <h3>تشطيبات تناسب الديكور</h3>
              <p>الأقفال الفندقية بالفضي والأسود والذهبي (PVD) حسب الموديل.</p>
            </div>
            <div data-reveal style={{ '--d': "3" }}>
              <div className="why__mark" aria-hidden="true"><svg className="ic"><use href="#i-tools" /></svg></div>
              <h3>توريد وتركيب ودعم</h3>
              <p>نورّد ونركّب ونتابع بعد التسليم.[أكّد نطاق الخدمة]</p>
            </div>
          </div>
        </div>
      </section>
      {/* ================= Solutions ================= */}
      <section className="section" aria-labelledby="sol-title">
        <div className="container">
          <div className="head">
            <div>
              <h2 id="sol-title">حلول حسب المكان</h2>
              <p className="sol-sub" style={{ fontSize: "18px" }}>نرشّح لك الموديلات المناسبة للفندق أو البيت أو المكتب.</p>
            </div>
            <Link className="more" href="/shop">كل المنتجات<svg className="ic"><use href="#i-arrow" /></svg></Link>
          </div>
          <div className="sols">
            <Link className="sol" href="/shop?use=hotel#catalog" data-type="hotel" data-reveal style={{ '--d': "0" }}>
              <img src="/assets/products/a21.webp" alt="" loading="lazy" />
              <h3>الفنادق</h3>
              <p>قفل وخزنة وباور سيفر لكل غرفة.</p>
              <span className="sol__link">اعرف الحل<svg className="ic"><use href="#i-arrow" /></svg></span>
            </Link>
            {" "}
            <Link className="sol" href="/shop?use=home#catalog" data-type="home" data-reveal style={{ '--d': "1" }}>
              <img src="/assets/products/gm8s-pro.webp" alt="" loading="lazy" />
              <h3>المنازل والفلل</h3>
              <p>وجه وبصمة ورمز بدل المفتاح، وخزنة للمقتنيات.</p>
              <span className="sol__link">اعرف الحل<svg className="ic"><use href="#i-arrow" /></svg></span>
            </Link>
            {" "}
            <Link className="sol" href="/shop?type=rfid#catalog" data-type="office" data-reveal style={{ '--d': "2" }}>
              <img src="/assets/products/k51.webp" alt="" loading="lazy" />
              <h3>المكاتب</h3>
              <p>بطاقات للموظفين وأقفال تناسب الأبواب الحديثة.</p>
              <span className="sol__link">اعرف الحل<svg className="ic"><use href="#i-arrow" /></svg></span>
            </Link>
            {" "}
            <Link className="sol" href="/shop?use=apartment#catalog" data-type="apartment" data-reveal style={{ '--d': "3" }}>
              <img src="/assets/products/e68.webp" alt="" loading="lazy" />
              <h3>الشقق والكمباوندات</h3>
              <p>بصمة ورمز وبطاقة لكل وحدة.</p>
              <span className="sol__link">اعرف الحل<svg className="ic"><use href="#i-arrow" /></svg></span>
            </Link>
          </div>
        </div>
      </section>
      {/* ================= Reviews ================= */}
      <section className="section section--alt section--reviews" aria-labelledby="rev-title">
        <div className="container">
          <div className="reviews__head"><h2 id="rev-title">آراء العملاء</h2><p>نعتز بثقة عملائنا ونسعى دائمًا لتقديم تجربة تفوق توقعاتهم في كل مشروع</p></div>
          <div className="revs">
            <article className="rev" data-reveal style={{ '--d': "0" }}>
              <svg className="rev__quote" aria-hidden="true"><use href="#i-quote" /></svg>
              <div className="rev__top">
                <span className="rev__avatar" aria-hidden="true" />
                <div>
                  <div className="rev__name">XXXXXXXXXXXXX</div>
                  <div className="stars" aria-label="5 من 5">
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
                  <div className="stars" aria-label="5 من 5">
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
                  <div className="stars" aria-label="5 من 5">
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
      <FaqTeaser lang="ar" />
      {/* ================= CTA band ================= */}
      <CtaBand lang="ar" />
    </>
  );
}
