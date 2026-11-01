import type { Lang } from '@/lib/i18n';
import Icon from '../Icon';

const TEXT = {
  ar: { title: 'تجهّز فندقًا أو بيتًا أو مكتبًا؟', text: 'أخبرنا بعدد الغرف أو الأبواب وسنرسل عرض سعر للأقفال والخزن والباور سيفر.', quote: 'اطلب عرض سعر', wa: 'واتساب' },
  en: { title: 'Fitting out a hotel, home or office?', text: 'Tell us the number of rooms or doors and we’ll send a quote for locks, safes and power savers.', quote: 'Request a quote', wa: 'WhatsApp' },
};

/** Closing call-to-action band; the FAQ page passes its own heading */
export default function CtaBand({ lang, title, text }: { lang: Lang; title?: string; text?: string }) {
  const t = TEXT[lang];
  return (
    <section className="cta" id="contact" aria-labelledby="cta-title">
      <div className="container cta__in">
        <div><h2 id="cta-title">{title ?? t.title}</h2><p>{text ?? t.text}</p></div>
        <div className="cta__btns">
          <a className="btn btn--navy" href="#quote" data-open="quote">{t.quote}</a>{' '}
          <a className="btn btn--outline btn--outline-navy" href="https://wa.me/201004610860" target="_blank" rel="noopener">
            <Icon id="wa" hidden={false} />
            {t.wa}
          </a>
        </div>
      </div>
    </section>
  );
}
