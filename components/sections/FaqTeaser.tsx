import Link from 'next/link';
import { href, type Lang } from '@/lib/i18n';
import AccItem from '../AccItem';
import Icon from '../Icon';

const TEXT = {
  ar: {
    title: 'أسئلة قبل الطلب', text: 'لم تجد إجابتك؟ اسألنا على واتساب.', all: 'كل الأسئلة', ask: 'اسأل على واتساب',
    items: [
      ['ماذا تبيع العابد؟', 'ثلاث فئات: أقفال ذكية للأبواب، وخزن غرف فندقية، ومفتاح توفير الطاقة (باور سيفر) للغرف.'],
      ['ما هو الباور سيفر؟', 'مفتاح يركّب عند باب الغرفة: يُدخل النزيل بطاقته فتعمل الكهرباء، ويسحبها عند الخروج فتنقطع تلقائيًا.'],
      ['هل توجد أسعار على الموقع؟', 'نرسل الأسعار في عرض سعر حسب الموديل والكمية. أضف المنتجات إلى قائمة طلب السعر وأرسلها على واتساب.'],
      ['هل يمكن طلب كميات للفنادق والمشاريع؟', 'نعم، أخبرنا بعدد الغرف أو الأبواب ونرسل لك عرض سعر للمشروع كاملًا.'],
    ],
  },
  en: {
    title: 'Questions before you order', text: 'Didn’t find your answer? Ask us on WhatsApp.', all: 'All questions', ask: 'Ask on WhatsApp',
    items: [
      ['What does Alabed sell?', 'Three categories: smart door locks, hotel room safes, and an energy-saving switch (power saver) for rooms.'],
      ['What is a power saver?', 'A switch installed by the room door: the guest inserts their card and the power comes on, then removes it on leaving and the power cuts off automatically.'],
      ['Are prices listed on the site?', 'We send prices in a quote based on model and quantity. Add products to your quote list and send it on WhatsApp.'],
      ['Can I order in bulk for hotels and projects?', 'Yes. Tell us the number of rooms or doors and we’ll send a quote for the whole project.'],
    ],
  },
};

/** Short FAQ block on the home, shop and product pages */
export default function FaqTeaser({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container faq">
        <div className="faq__intro">
          <h2 id="faq-title">{t.title}</h2>
          <p>{t.text}</p>
          <div className="faq__btns">
            <Link className="btn btn--navy" href={href(lang, '/faq')}>{t.all}</Link>{' '}
            <a className="btn btn--outline" href="https://wa.me/201004610860" target="_blank" rel="noopener">
              <Icon id="wa" hidden={false} />
              {t.ask}
            </a>
          </div>
        </div>
        <div className="acc" data-acc>
          {t.items.map(([q, a], i) => (
            <AccItem id={`q${i + 1}`} q={q} key={q}><p>{a}</p></AccItem>
          ))}
        </div>
      </div>
    </section>
  );
}
