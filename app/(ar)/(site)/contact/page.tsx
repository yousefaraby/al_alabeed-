import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import AskForm from '@/components/contact/AskForm';
import CallHero from '@/components/contact/CallHero';
import { waLink } from '@/lib/catalog';

export const metadata: Metadata = pageMetadata({
  lang: 'ar',
  path: '/contact',
  title: 'تواصل معنا',
  description: 'العابد ديجيتال لوك: 25 عامًا في أنظمة الأقفال الإلكترونية، والوكيل الوحيد المعتمد لشركة Goodum العالمية في مصر. أقفال ذكية وخزن غرف وباور سيفر للفنادق والمنازل والمكاتب من العابد ديجيتال لوك.',
});

export default function ContactPage() {
  return (
    <>
      {/* ================= Contact hero ================= */}
      <CallHero lang="ar">
        <span className="hero-bar" aria-hidden="true" />
        <div className="container ct-hero__grid">
          <div className="ct-hero__copy">
            <nav className="crumbs" aria-label="مسار التنقل">
              <Link href="/">الرئيسية</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">تواصل معنا</span>
            </nav>
            <h1 id="ct-title"><span className="reveal-ln"><span>تواصل معنا</span></span><span className="reveal-ln"><span>أو اطلب عرض سعر</span></span></h1>
            <p className="ct-hero__lead fade-up d1">كلّمنا مباشرة، ابعتلنا على واتساب، أو اطلب عرض سعر في 4 خطوات قصيرة. فريق العابد بيرد عليك بنفسه.</p>
            <div className="ct-hero__ctas fade-up d2">
              <a className="btn btn--primary" href={waLink("مرحبًا، أريد الاستفسار عن منتجات العابد")} target="_blank" rel="noopener" data-wa-text="مرحبًا، أريد الاستفسار عن منتجات العابد">
                <svg className="ic"><use href="#i-wa" /></svg>
                واتساب
              </a>
              {" "}
              <a className="btn btn--outline btn--outline-light" href="tel:+201020450649"><svg className="ic"><use href="#i-phone" /></svg>اتصل بنا</a>
            </div>
          </div>
        </div>
      </CallHero>
      {/* ================= Channels ================= */}
      <section className="section ct-channels" aria-label="طرق التواصل">
        <div className="container">
          <div className="channels">
            <a className="channel" href="tel:+201020450649" data-reveal style={{ '--d': "0" }}>
              <span className="channel__mark"><svg className="ic"><use href="#i-phone" /></svg></span>
              {" "}
              <strong>اتصل بنا</strong>
              {" "}
              <span className="channel__value" dir="ltr">+20 102 045 0649</span>
              {" "}
              <span className="channel__note">للاستفسار السريع والدعم الفني</span>
              {" "}
              <span className="channel__go">اتصل الآن<svg className="ic"><use href="#i-arrow" /></svg></span>
            </a>
            {" "}
            <a className="channel channel--wa" href={waLink("مرحبًا، أريد الاستفسار عن منتجات العابد")} target="_blank" rel="noopener" data-wa-text="مرحبًا، أريد الاستفسار عن منتجات العابد" data-reveal style={{ '--d': "1" }}>
              <span className="channel__mark"><svg className="ic"><use href="#i-wa" /></svg></span>
              {" "}
              <strong>واتساب</strong>
              {" "}
              <span className="channel__value">الأسرع للطلبات والدعم</span>
              {" "}
              <span className="channel__note">أرسل قائمة المنتجات مباشرة</span>
              {" "}
              <span className="channel__go">ابدأ المحادثة<svg className="ic"><use href="#i-arrow" /></svg></span>
            </a>
            {" "}
            <a className="channel" href="mailto:al.abedlook@gmail.com" data-reveal style={{ '--d': "2" }}>
              <span className="channel__mark"><svg className="ic"><use href="#i-mail" /></svg></span>
              {" "}
              <strong>البريد الإلكتروني</strong>
              {" "}
              <span className="channel__value" dir="ltr">al.abedlook@gmail.com</span>
              {" "}
              <span className="channel__note">للشركات والمشاريع</span>
              {" "}
              <span className="channel__go">أرسل بريدًا<svg className="ic"><use href="#i-arrow" /></svg></span>
            </a>
          </div>
        </div>
      </section>
      {/* ================= Forms ================= */}
      <section className="section section--alt ct-forms" aria-label="النماذج">
        <div className="container ct-forms__grid">
          <div className="quote-card" data-reveal>
            <h2>اطلب عرض سعر</h2>
            <p>أقفال، خزن، باور سيفر أو الباقة كاملة. 4 خطوات قصيرة.</p>
            <ol className="steps4">
              <li><span>1</span>نوع المشروع</li>
              <li><span>2</span>المنتجات والكميات</li>
              <li><span>3</span>بياناتك</li>
              <li><span>4</span>المراجعة والإرسال</li>
            </ol>
            <button className="btn btn--primary" type="button" data-open="quote">ابدأ طلب عرض السعر<svg className="ic"><use href="#i-arrow" /></svg></button>
            <p className="quote-card__note"><svg className="ic"><use href="#i-info" /></svg>كل نموذج هنا يفتح واتساب أو بريدك برسالة جاهزة، وتضغط إرسال بنفسك.</p>
          </div>
          <AskForm lang="ar" style={{ '--d': "1" }}>
            <h2>سؤال سريع؟</h2>
            <div className="form-row">
              <div className="field">
                <label htmlFor="ct-name">الاسم{" "}<span className="req" aria-hidden="true">*</span></label>
                <input className="input" id="ct-name" type="text" required minLength={2} autoComplete="name" />
                <span className="error-msg"><svg className="ic"><use href="#i-info" /></svg>اكتب اسمك</span>
              </div>
              <div className="field">
                <label htmlFor="ct-phone">رقم الموبايل{" "}<span className="req" aria-hidden="true">*</span></label>
                <input className="input" id="ct-phone" type="tel" required dir="ltr" inputMode="tel" autoComplete="tel" placeholder="01X XXXX XXXX" pattern={"^(\\+?20)?0?1[0125][0-9]{8}$"} />
                <span className="error-msg"><svg className="ic"><use href="#i-info" /></svg>أدخل رقمًا مصريًا من 11 رقمًا يبدأ بـ 01</span>
              </div>
            </div>
            <div className="field">
              <label htmlFor="ct-topic">الموضوع{" "}<span className="req" aria-hidden="true">*</span></label>
              <select className="select" id="ct-topic" required>
                <option value="">اختر</option>
                <option>الأقفال الذكية</option>
                <option>الخزن</option>
                <option>باور سيفر</option>
                <option>تركيب أو دعم فني</option>
                <option>أخرى</option>
              </select>
              <span className="error-msg"><svg className="ic"><use href="#i-info" /></svg>اختر أحد الخيارات</span>
            </div>
            <div className="field">
              <label htmlFor="ct-msg">رسالتك{" "}<span className="req" aria-hidden="true">*</span></label>
              <textarea className="textarea" id="ct-msg" required minLength={10} />
              <span className="error-msg"><svg className="ic"><use href="#i-info" /></svg>اكتب 10 أحرف على الأقل</span>
            </div>
            <div className="ask__btns">
              <button className="btn btn--primary" type="submit" value="wa"><svg className="ic"><use href="#i-wa" /></svg>أرسل على واتساب</button>
              {" "}
              <button className="btn btn--ghost" type="submit" value="mail"><svg className="ic"><use href="#i-mail" /></svg>أرسل بالبريد</button>
            </div>
          </AskForm>
        </div>
      </section>
    </>
  );
}
