'use client';

import { Fragment, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { motion } from 'motion/react';
import { PARTNERS } from '@/lib/catalog';
import type { Lang } from '@/lib/i18n';
import Icon from '../Icon';

const CRUISE_VISIBLE = 12;
const TEXT = {
  ar: {
    title: 'شركائنا', text: 'فنادق ومنتجعات وفنادق عائمة على النيل تعمل غرفها بأقفال وخزن وباور سيفر من العابد.', tabs: 'نوع الشريك',
    hotels: 'الفنادق والمنتجعات', cruises: 'الفنادق العائمة', swipe: 'اسحب للمزيد', more: 'عرض كل الفنادق العائمة (23)', less: 'عرض أقل',
  },
  en: {
    title: 'Our partners', text: 'Hotels, resorts and Nile cruises whose rooms run on Alabed locks, safes and power savers.', tabs: 'Partner type',
    hotels: 'Hotels & resorts', cruises: 'Nile cruises', swipe: 'Swipe for more', more: 'Show all Nile cruises (23)', less: 'Show less',
  },
};
type Key = keyof typeof PARTNERS;
const KEYS: Key[] = ['hotels', 'cruises'];

/** Arabic shows the Arabic name over the English one; English shows the name over its city */
function names(lang: Lang, key: Key, ar: string, en: string): [string, string] {
  if (lang === 'ar') return [ar, key === 'cruises' ? `${en} · Nile Cruise` : en];
  const [nm, place] = en.split(', ');
  return key === 'cruises' ? [en, 'Nile Cruise'] : [nm, place || 'Egypt'];
}

/* spotlight hover follows the pointer */
const spot = (e: PointerEvent<HTMLUListElement>) => {
  const card = (e.target as Element).closest<HTMLElement>('.partner'); if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${e.clientX - r.left}px`); card.style.setProperty('--my', `${e.clientY - r.top}px`);
};

export default function Partners({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(0); // bumps to replay the panel entrance
  const [more, setMore] = useState(false);
  const [mobile, setMobile] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panels = useRef<(HTMLDivElement | null)[]>([]);

  // mobile: everything lives in a swipe row, so extras are always shown there
  useEffect(() => {
    const mq = matchMedia('(max-width: 720px)');
    const sync = () => setMobile(mq.matches);
    sync(); mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // swipe progress bar
  useEffect(() => {
    const cleanups = panels.current.map((panel) => {
      if (!panel) return () => {};
      const ul = panel.querySelector<HTMLUListElement>('.plist')!, thumb = panel.querySelector<HTMLElement>('.swipe__thumb')!;
      const upd = () => {
        const max = ul.scrollWidth - ul.clientWidth;
        const ratio = ul.clientWidth / ul.scrollWidth, pos = max > 0 ? Math.abs(ul.scrollLeft) / max : 0;
        thumb.style.width = `${Math.max(ratio * 100, 12)}%`;
        thumb.style.transform = `translateX(${-pos * (100 / Math.max(ratio, .12) - 100)}%)`;
      };
      ul.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
      return () => { ul.removeEventListener('scroll', upd); removeEventListener('resize', upd); };
    });
    return () => cleanups.forEach((c) => c());
  }, [active, more, mobile]);

  // replay the entrance animation and reset the swipe row when switching tabs
  useEffect(() => {
    if (!entered) return;
    const panel = panels.current[active]; if (!panel) return;
    panel.classList.remove('is-in'); void panel.offsetWidth; panel.classList.add('is-in');
    panel.querySelector('.plist')!.scrollLeft = 0;
  }, [entered, active]);

  const select = (i: number, focus?: boolean) => {
    setActive(i); setEntered((n) => n + 1);
    if (focus) tabs.current[i]?.focus();
  };
  const onKey = (e: KeyboardEvent, i: number) => {
    const fwd = lang === 'ar' ? 'ArrowLeft' : 'ArrowRight', back = lang === 'ar' ? 'ArrowRight' : 'ArrowLeft';
    const dir = e.key === fwd ? 1 : e.key === back ? -1 : 0;
    if (dir) { e.preventDefault(); select((i + dir + KEYS.length) % KEYS.length, true); }
  };

  return (
    <section className="section section--alt" aria-labelledby="partners-title">
      <div className="container">
        <div className="partners__top">
          <div><h2 id="partners-title">{t.title}</h2><p>{t.text}</p></div>
          <div className="tabs" role="tablist" aria-label={t.tabs} data-active={active}>
            <motion.span className="tabs__pill" aria-hidden="true" initial={false} animate={{ x: `${active * (lang === 'ar' ? -100 : 100)}%` }} transition={{ type: 'spring', bounce: 0.18, duration: 0.55 }} />
            {KEYS.map((key, i) => (
              <Fragment key={key}>
                {' '}
                <button className="tab" role="tab" id={`tab-${key}`} aria-controls={`panel-${key}`} aria-selected={active === i} tabIndex={active === i ? 0 : -1}
                  ref={(el) => { tabs.current[i] = el; }} onClick={() => select(i)} onKeyDown={(e) => onKey(e, i)}>
                  <Icon id={key === 'cruises' ? 'boat' : 'hotel'} />
                  {t[key]}
                  <span className="tab__n">{PARTNERS[key].length}</span>
                </button>
              </Fragment>
            ))}
          </div>
        </div>
        {KEYS.map((key, k) => (
          <div className={`panel${k === 0 ? ' is-in' : ''}`} id={`panel-${key}`} role="tabpanel" aria-labelledby={`tab-${key}`} tabIndex={0} hidden={active !== k} key={key}
            ref={(el) => { panels.current[k] = el; }}>
            <ul className="plist" data-partners={key} onPointerMove={spot}>
              {PARTNERS[key].map(([ar, en], i) => {
                const [main, sub] = names(lang, key, ar, en);
                const extra = key === 'cruises' && i >= CRUISE_VISIBLE;
                return (
                  <li className="partner" style={{ '--i': i % 12 }} data-extra={extra ? '' : undefined} hidden={extra && !(more || mobile)} key={en}>
                    <span className="partner__icon"><Icon id={key === 'cruises' ? 'boat' : 'hotel'} /></span>
                    <div className="partner__txt"><strong>{main}</strong><span className="partner__sub" lang={lang === 'ar' ? 'en' : undefined}>{sub}</span></div>
                  </li>
                );
              })}
            </ul>
            <div className="swipe" aria-hidden="true">
              <span className="swipe__track"><span className="swipe__thumb" /></span>
              <span className="swipe__hint"><svg className="ic"><use href="#i-swipe" /></svg>{t.swipe}</span>
            </div>
            {key === 'cruises' && (
              <div className="plist__more">
                <button className="btn btn--outline btn--outline-navy" type="button" data-more aria-expanded={more} onClick={() => setMore(!more)}>
                  <span>{more ? t.less : t.more}</span>
                  <svg className="ic" aria-hidden="true" style={{ transformOrigin: 'center' }}><use href="#i-chev" /></svg>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
