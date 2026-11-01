import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import AskForm from '@/components/contact/AskForm';
import KeypadHero from '@/components/contact/KeypadHero';
import { waLink } from '@/lib/catalog';

export const metadata: Metadata = pageMetadata({
  lang: 'en',
  path: '/contact',
  title: 'Contact us',
  description: 'Alabed Digital Lock: 25 years in electronic lock systems, and the sole authorized distributor of Goodum in Egypt. Smart locks, in-room safes and power savers for hotels, homes and offices from Alabed Digital Lock.',
});

export default function ContactPage() {
  return (
    <>
      {/* ================= Contact hero ================= */}
      <KeypadHero lang="en">
        <span className="hero-bar" aria-hidden="true" />
        <div className="container ct-hero__grid">
          <div className="ct-hero__copy">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/en">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Contact us</span>
            </nav>
            <h1 id="ct-title"><span className="reveal-ln"><span>Talk to us</span></span><span className="reveal-ln"><span>or get a quote</span></span></h1>
            <p className="ct-hero__lead fade-up d1">
              Call us, message us on WhatsApp, or request a quote in 4 short steps. The Alabed team replies to you personally.
            </p>
            <div className="ct-hero__ctas fade-up d2">
              <a className="btn btn--primary" href={waLink("Hello, I’d like to ask about Alabed products")} target="_blank" rel="noopener" data-wa-text="Hello, I’d like to ask about Alabed products">
                <svg className="ic"><use href="#i-wa" /></svg>
                WhatsApp
              </a>
              {" "}
              <a className="btn btn--outline btn--outline-light" href="tel:+201020450649"><svg className="ic"><use href="#i-phone" /></svg>Call us</a>
            </div>
          </div>
          <div className="pad" aria-label="Interactive keypad: type a number or press call">
            <div className="pad__glow" aria-hidden="true" />
            <div className="pad__body">
              <div className="pad__top">
                <span className="pad__led" aria-hidden="true" />
                <span className="pad__brand">ALABED</span>
                <span className="pad__sig" aria-hidden="true"><i /><i /><i /></span>
              </div>
              <div className="pad__screen" aria-live="polite">
                <span className="pad__num" data-pad-num></span>
                {" "}
                <span className="pad__status" data-pad-status></span>
              </div>
              <div className="pad__keys" role="group" aria-label="Number keys">
                <button type="button" data-k="1">1</button>
                <button type="button" data-k="2">2<small>ABC</small></button>
                <button type="button" data-k="3">3<small>DEF</small></button>
                {" "}
                <button type="button" data-k="4">4<small>GHI</small></button>
                <button type="button" data-k="5">5<small>JKL</small></button>
                <button type="button" data-k="6">6<small>MNO</small></button>
                {" "}
                <button type="button" data-k="7">7<small>PQRS</small></button>
                <button type="button" data-k="8">8<small>TUV</small></button>
                <button type="button" data-k="9">9<small>WXYZ</small></button>
                {" "}
                <button type="button" data-k="*" aria-label="Clear">✱</button>
                <button type="button" data-k="0">0<small>+</small></button>
                <button type="button" data-k="#" aria-label="Backspace">#</button>
              </div>
              <a className="pad__call" href="tel:+201020450649" data-pad-call><svg className="ic"><use href="#i-phone" /></svg><span>Call</span></a>
            </div>
          </div>
        </div>
      </KeypadHero>
      {/* ================= Channels ================= */}
      <section className="section ct-channels" aria-label="Ways to reach us">
        <div className="container">
          <div className="channels">
            <a className="channel" href="tel:+201020450649" data-reveal style={{ '--d': "0" }}>
              <span className="channel__mark"><svg className="ic"><use href="#i-phone" /></svg></span>
              {" "}
              <strong>Call us</strong>
              {" "}
              <span className="channel__value" dir="ltr">+20 102 045 0649</span>
              {" "}
              <span className="channel__note">Quick questions and technical support</span>
              {" "}
              <span className="channel__go">Call now<svg className="ic"><use href="#i-arrow" /></svg></span>
            </a>
            {" "}
            <a className="channel channel--wa" href={waLink("Hello, I’d like to ask about Alabed products")} target="_blank" rel="noopener" data-wa-text="Hello, I’d like to ask about Alabed products" data-reveal style={{ '--d': "1" }}>
              <span className="channel__mark"><svg className="ic"><use href="#i-wa" /></svg></span>
              {" "}
              <strong>WhatsApp</strong>
              {" "}
              <span className="channel__value">Fastest for orders and support</span>
              {" "}
              <span className="channel__note">Send your product list directly</span>
              {" "}
              <span className="channel__go">Start chatting<svg className="ic"><use href="#i-arrow" /></svg></span>
            </a>
            {" "}
            <a className="channel" href="mailto:al.abedlook@gmail.com" data-reveal style={{ '--d': "2" }}>
              <span className="channel__mark"><svg className="ic"><use href="#i-mail" /></svg></span>
              {" "}
              <strong>Email</strong>
              {" "}
              <span className="channel__value" dir="ltr">al.abedlook@gmail.com</span>
              {" "}
              <span className="channel__note">For companies and projects</span>
              {" "}
              <span className="channel__go">Send an email<svg className="ic"><use href="#i-arrow" /></svg></span>
            </a>
          </div>
        </div>
      </section>
      {/* ================= Forms ================= */}
      <section className="section section--alt ct-forms" aria-label="Forms">
        <div className="container ct-forms__grid">
          <div className="quote-card" data-reveal>
            <h2>Request a quote</h2>
            <p>Locks, safes, power savers or the full package. 4 short steps.</p>
            <ol className="steps4">
              <li><span>1</span>Project type</li>
              <li><span>2</span>Products and quantities</li>
              <li><span>3</span>Your details</li>
              <li><span>4</span>Review and send</li>
            </ol>
            <button className="btn btn--primary" type="button" data-open="quote">Start your quote request<svg className="ic"><use href="#i-arrow" /></svg></button>
            <p className="quote-card__note">
              <svg className="ic"><use href="#i-info" /></svg>
              Every form here opens WhatsApp or your email with a ready message. You press send yourself.
            </p>
          </div>
          <AskForm lang="en" style={{ '--d': "1" }}>
            <h2>Quick question?</h2>
            <div className="form-row">
              <div className="field">
                <label htmlFor="ct-name">Name{" "}<span className="req" aria-hidden="true">*</span></label>
                <input className="input" id="ct-name" type="text" required minLength={2} autoComplete="name" />
                <span className="error-msg"><svg className="ic"><use href="#i-info" /></svg>Enter your name</span>
              </div>
              <div className="field">
                <label htmlFor="ct-phone">Mobile number{" "}<span className="req" aria-hidden="true">*</span></label>
                <input className="input" id="ct-phone" type="tel" required dir="ltr" inputMode="tel" autoComplete="tel" placeholder="01X XXXX XXXX" pattern={"^(\\+?20)?0?1[0125][0-9]{8}$"} />
                <span className="error-msg"><svg className="ic"><use href="#i-info" /></svg>Enter an 11-digit Egyptian number starting with 01</span>
              </div>
            </div>
            <div className="field">
              <label htmlFor="ct-topic">Topic{" "}<span className="req" aria-hidden="true">*</span></label>
              <select className="select" id="ct-topic" required>
                <option value="">Choose</option>
                <option>Smart locks</option>
                <option>Safes</option>
                <option>Power saver</option>
                <option>Installation or support</option>
                <option>Other</option>
              </select>
              <span className="error-msg"><svg className="ic"><use href="#i-info" /></svg>Choose an option</span>
            </div>
            <div className="field">
              <label htmlFor="ct-msg">Your message{" "}<span className="req" aria-hidden="true">*</span></label>
              <textarea className="textarea" id="ct-msg" required minLength={10} />
              <span className="error-msg"><svg className="ic"><use href="#i-info" /></svg>Write at least 10 characters</span>
            </div>
            <div className="ask__btns">
              <button className="btn btn--primary" type="submit" value="wa"><svg className="ic"><use href="#i-wa" /></svg>Send on WhatsApp</button>
              {" "}
              <button className="btn btn--ghost" type="submit" value="mail"><svg className="ic"><use href="#i-mail" /></svg>Send by email</button>
            </div>
          </AskForm>
        </div>
      </section>
    </>
  );
}
