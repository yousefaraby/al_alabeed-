'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { href, type Lang } from '@/lib/i18n';

interface Item {
  icon: string;
  path: string;
  img: string;
  alt: string;
  title: ReactNode;
  tags?: string[];
  points: string[];
  text: string;
}

const UI = {
  ar: { more: 'شاهد المزيد', less: 'شاهد أقل', models: 'شاهد الموديلات' },
  en: { more: 'See more', less: 'See less', models: 'View models' },
};

const ITEMS: Record<Lang, Item[]> = {
  ar: [
    {
      icon: 'hotel', path: '/shop?use=hotel', img: '/assets/products/colors/a21-black-1.webp', alt: 'قفل فندقي A21 أسود',
      title: 'كوالين إلكترونية فندقية', tags: ['بطاقات', 'ماستر كي', 'مقاومة للصدأ'],
      points: ['أداء عالٍ وموثوقية', 'تصميم أنيق وعصري', 'سهولة الاستخدام'],
      text: 'أحدث أنواع الكوالين الإلكترونية للفنادق، بمميزات متطورة وتصميم عصري يناسب جميع أنواع الفنادق والمنتجعات.',
    },
    {
      icon: 'home', path: '/shop?use=home', img: '/assets/products/colors/gm6s-copper.webp', alt: 'قفل ذكي GM6S Pro',
      title: 'كوالين إلكترونية منزلية ذكية', tags: ['بصمة', 'وجه', 'كارت', 'رقم سري', 'تحكم عن طريق التطبيق'],
      points: ['طرق فتح متعددة', 'تحكم عن طريق التطبيق', 'مناسبة للفلل والشقق'],
      text: 'كوالين ذكية للمنازل تفتح بالبصمة أو الوجه أو الكارت أو الرقم السري، لتدخل بيتك بسهولة وأمان.',
    },
    {
      icon: 'safe', path: '/shop?kind=safe', img: '/assets/products/colors/qnn-charcoal.webp', alt: 'خزنة فندقية QNN Safe',
      title: 'خزن فندقية آمنة',
      points: ['لوحة أرقام إلكترونية', 'قفل طوارئ بمفتاح', 'موديل يفتح بكارت NFC'],
      text: 'خزن إلكترونية لغرف الفنادق تحفظ مقتنيات النزلاء بأمان، وتفتح بالرقم السري أو بالمفتاح.',
    },
    {
      icon: 'bolt', path: '/shop?kind=power', img: '/assets/products/power-saver-cut.webp', alt: 'مفتاح توفير الطاقة باور سيفر',
      title: <>أنظمة توفير الطاقة{' '}<small>(Power Saver)</small>{' '}للغرف الفندقية</>,
      points: ['يعمل بالبطاقة', 'مخصص لغرف الفنادق', 'يساعد على ترشيد الكهرباء'],
      text: 'مفتاح بطاقة للغرف: يدخل النزيل البطاقة في المفتاح لتشغيل الكهرباء داخل الغرفة.',
    },
    {
      icon: 'bell', path: '/shop?kind=bell', img: '/assets/products/doorbell-dnd.webp', alt: 'جرس كهربائي بلوحة عدم الإزعاج ورقم الغرفة',
      title: 'أجراس الغرف', tags: ['عدم الإزعاج', 'تنظيف الغرفة', 'رقم الغرفة'],
      points: ['لوحة خارجية ولوحة داخلية', 'رقم الغرفة الرقمي', 'تُصنع حسب أرقام غرفك'],
      text: 'أجراس كهربائية للغرف بلوحة عدم الإزعاج وتنظيف الغرفة ورقم الغرفة، تُصنع حسب أرقام غرف فندقك وعددها.',
    },
  ],
  en: [
    {
      icon: 'hotel', path: '/shop?use=hotel', img: '/assets/products/colors/a21-black-1.webp', alt: 'A21 hotel lock in black',
      title: 'Electronic hotel locks', tags: ['Key cards', 'Master key', 'Rust-resistant'],
      points: ['High performance and reliability', 'Elegant, modern design', 'Easy to use'],
      text: 'The latest electronic locks for hotels, with advanced features and a modern design that suits every kind of hotel and resort.',
    },
    {
      icon: 'home', path: '/shop?use=home', img: '/assets/products/colors/gm6s-copper.webp', alt: 'GM6S Pro smart lock',
      title: 'Smart electronic home locks', tags: ['Fingerprint', 'Face', 'Card', 'PIN code', 'App control'],
      points: ['Several ways to unlock', 'App control', 'Suits villas and apartments'],
      text: 'Smart home locks that open with a fingerprint, your face, a card or a PIN, so you get home easily and securely.',
    },
    {
      icon: 'safe', path: '/shop?kind=safe', img: '/assets/products/colors/qnn-charcoal.webp', alt: 'QNN Safe hotel safe',
      title: 'Secure hotel safes',
      points: ['Electronic keypad', 'Emergency key lock', 'A model that opens with an NFC card'],
      text: 'Electronic hotel room safes that keep guests’ belongings secure and open with a PIN or a key.',
    },
    {
      icon: 'bolt', path: '/shop?kind=power', img: '/assets/products/power-saver-cut.webp', alt: 'Power saver key card switch',
      title: <>Energy-saving systems{' '}<small>(Power Saver)</small>{' '}for hotel rooms</>,
      points: ['Works with a card', 'Made for hotel rooms', 'Helps cut electricity use'],
      text: 'A key card switch for rooms: the guest inserts the card to turn on the power in the room.',
    },
    {
      icon: 'bell', path: '/shop?kind=bell', img: '/assets/products/doorbell-dnd.webp', alt: 'Electric doorbell with do not disturb panel and room number',
      title: 'Room doorbells', tags: ['Do not disturb', 'Make up room', 'Room number'],
      points: ['Outside and inside panels', 'Digital room number', 'Made to your room numbers'],
      text: 'Electric room doorbells with do not disturb, make up room and a room number, made to order for your room numbers and quantity.',
    },
  ],
};

/** About page: what we specialize in. Each row opens to show its points and a product photo. */
export default function SpecAccordion({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState<number | null>(0);
  const t = UI[lang];
  return (
    <ol className="sacc">
      {ITEMS[lang].map((item, i) => {
        const isOpen = open === i;
        const panel = `spec-panel-${i}`;
        return (
          <li className={isOpen ? 'sacc__item is-open' : 'sacc__item'} data-reveal key={item.icon}>
            <div className="sacc__head" onClick={() => setOpen(isOpen ? null : i)}>
              <span className="sacc__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="sacc__icon"><svg className="ic"><use href={`#i-${item.icon}`} /></svg></span>
              <div className="sacc__body">
                <h3>{item.title}</h3>
                {item.tags && <ul className="tags">{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
              </div>
              <button className="sacc__toggle" type="button" aria-expanded={isOpen} aria-controls={panel}>
                {isOpen ? t.less : t.more}
                <span className="sacc__chev"><svg className="ic"><use href="#i-chev" /></svg></span>
              </button>
            </div>
            <div className="sacc__wrap" id={panel}>
              <div className="sacc__clip">
                <div className="sacc__panel">
                  <ul className="sacc__points">
                    {item.points.map((point) => <li key={point}><span><svg className="ic"><use href="#i-check" /></svg></span>{point}</li>)}
                  </ul>
                  <div className="sacc__text">
                    <p>{item.text}</p>
                    <Link className="sacc__link" href={href(lang, item.path)}>{t.models}<svg className="ic"><use href="#i-arrow" /></svg></Link>
                  </div>
                  <div className="sacc__photo"><img src={item.img} alt={item.alt} loading="lazy" draggable={false} /></div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
