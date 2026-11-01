'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { COLOR_IMGS, M, SW, USE_ICONS, USE_LABEL, byId, catalog, colorImg, imgSrc, waLink, type Finish } from '@/lib/catalog';
import { href, type Lang } from '@/lib/i18n';
import AddToQuote from '../AddToQuote';
import Icon from '../Icon';
import ProductCard from '../ProductCard';

const T = {
  ar: {
    crumbs: 'مسار التنقل', home: 'الرئيسية', shop: 'المتجر', model: 'الموديل', category: 'الفئة', methods: 'طرق الفتح', finishes: 'التشطيبات المتاحة',
    pick: 'اختر اللون', pickLabel: 'التشطيبات المتاحة', uses: 'مناسب لـ', ask: 'اسأل على واتساب', waText: 'مرحبًا العابد ديجيتال لوك، أريد الاستفسار عن',
    note: 'تحتاج المواصفات الفنية الكاملة أو سعرًا لمشروعك؟ أرسل لنا الموديل والكمية على واتساب ونرد عليك.',
    nf: 'المنتج غير موجود', nfText: 'ربما نُقل هذا المنتج. تصفّح المتجر لتجد ما يناسبك.', all: 'كل المنتجات',
    related: 'منتجات مشابهة', relatedText: 'اختيارات أخرى من نفس الفئة',
  },
  en: {
    crumbs: 'Breadcrumb', home: 'Home', shop: 'Shop', model: 'Model', category: 'Category', methods: 'Unlock methods', finishes: 'Available finishes',
    pick: 'Choose a finish', pickLabel: 'Available finishes', uses: 'Suitable for', ask: 'Ask on WhatsApp', waText: 'Hello Alabed Digital Lock, I would like to ask about',
    note: 'Need the full technical specs or a price for your project? Send us the model and quantity on WhatsApp and we\'ll get back to you.',
    nf: 'Product not found', nfText: 'This product may have been moved. Browse the full shop instead.', all: 'All products',
    related: 'Related products', relatedText: 'More from the same range',
  },
};
const EXPO = 'cubic-bezier(.16,1,.3,1)';
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Product details: gallery with a live finish picker, specs, add-to-quote and related products */
export default function ProductView({ lang, id }: { lang: Lang; id?: string }) {
  const t = T[lang];
  const p = id ? byId(lang, id) : undefined;
  const pickable = p ? (COLOR_IMGS[p.id] || []).filter((k) => p.sw.includes(k)) : [];
  const start: Finish | null = pickable.length ? (pickable.includes('silver') ? 'silver' : pickable[0]) : null;
  const [chosen, setChosen] = useState<Finish | null>(start);
  const [src, setSrc] = useState(p ? (start ? colorImg(p.id, start) : imgSrc(p)) : '');
  const img = useRef<HTMLImageElement>(null);
  const info = useRef<HTMLDivElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const swatches = useRef<HTMLUListElement>(null);

  // ?color=<finish> picks the finish; preload the finish photos, then play the entrance
  useEffect(() => {
    if (!p) return;
    const want = new URLSearchParams(location.search).get('color') as Finish | null;
    if (want && want !== start && pickable.includes(want)) { setChosen(want); setSrc(colorImg(p.id, want)); }
    pickable.forEach((k) => { const pre = new Image(); pre.src = colorImg(p.id, k); });
    if (reduced()) return;
    const els = [gallery.current!, ...info.current!.querySelectorAll(':scope > *:not([hidden])')];
    els.forEach((el, i) => el.animate([{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }], { duration: 800, delay: 80 + i * 70, easing: EXPO, fill: 'both' }));
    img.current?.animate([{ opacity: 0, transform: 'scale(.92) translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 1000, delay: 150, easing: EXPO, fill: 'both' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!p) {
    return (
      <section className="pdp" aria-labelledby="pdp-title" data-pdp>
        <span className="hero-bar" aria-hidden="true" />
        <div className="container">
          <div className="pdp__nf" data-pdp-nf>
            <h1>{t.nf}</h1>
            <p>{t.nfText}</p>
            <Link className="btn btn--primary" href={href(lang, '/shop')}>{t.all}</Link>
          </div>
        </div>
      </section>
    );
  }

  const setColor = (k: Finish) => {
    if (k === chosen) return;
    setChosen(k);
    const u = new URL(location.href); u.searchParams.set('color', k); history.replaceState(history.state, '', u);
    const el = img.current;
    if (!el || reduced()) { setSrc(colorImg(p.id, k)); return; }
    el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.96)' }], { duration: 160, easing: 'ease-in' }).onfinish = () => {
      setSrc(colorImg(p.id, k));
      el.animate([{ opacity: 0, transform: 'scale(1.03)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: EXPO });
    };
  };
  const onKey = (e: KeyboardEvent) => {
    const d = ({ ArrowRight: -1, ArrowLeft: 1, ArrowDown: 1, ArrowUp: -1 } as Record<string, number>)[e.key]; if (!d) return;
    e.preventDefault();
    const i = pickable.indexOf(chosen!), next = pickable[(i + d + pickable.length) % pickable.length];
    swatches.current?.querySelector<HTMLElement>(`[data-color="${next}"]`)?.focus();
    setColor(next);
  };

  const label = chosen ? SW[chosen][1][lang] : '';
  const all = catalog(lang);
  // related: same type first, then same kind, then the rest
  const related = all.filter((q) => q.id !== p.id && q.type === p.type)
    .concat(all.filter((q) => q.id !== p.id && q.type !== p.type && q.kind === p.kind))
    .concat(all.filter((q) => q.id !== p.id && q.kind !== p.kind)).slice(0, 4);
  const rows: [string, string][] = [...(p.model ? [[t.model, p.model] as [string, string]] : []), [t.category, p.cat]];

  return (
    <>
      {/* ================= Product details ================= */}
      <section className="pdp" aria-labelledby="pdp-title" data-pdp>
        <span className="hero-bar" aria-hidden="true" />
        <div className="container">
          <nav className="pdp__crumbs" aria-label={t.crumbs}>
            <Link href={href(lang)}>{t.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href={href(lang, '/shop')}>{t.shop}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" data-pdp-crumb>{p.title}</span>
          </nav>
          <div className="pdp__grid">
            <div className="pdp__gallery" ref={gallery}>
              <div className={`pdp__stage${chosen ? ' is-color' : ''}`}>
                <span className="pdp__badge" data-pdp-badge>{p.badge}</span>{' '}
                <img data-pdp-img src={src} alt={chosen ? `${p.title} - ${label}` : p.title} decoding="async" ref={img} />
              </div>
            </div>
            <div className="pdp__info" ref={info}>
              <span className="pdp__cat" data-pdp-cat>{p.cat}</span>
              <h1 id="pdp-title" data-pdp-title>{p.title}</h1>
              <p className="pdp__desc" data-pdp-desc hidden={!p.desc}>{p.desc}</p>
              <dl className="pdp__meta" data-pdp-meta>
                {rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </dl>
              <div className="pdp__block" data-pdp-methods hidden={!p.m.length}>
                <h2>{t.methods}</h2>
                <ul className="pdp__chips">{p.m.map((k) => <li key={k}><Icon id={k} />{M[k][lang]}</li>)}</ul>
              </div>
              {pickable.length ? (
                <div className="pdp__block is-picker" data-pdp-finishes>
                  <h2>{t.pick} <span data-pdp-chosen>: {label}</span></h2>
                  <ul className="pdp__swatches" role="radiogroup" aria-label={t.pickLabel} ref={swatches} onKeyDown={onKey}>
                    {pickable.map((k) => (
                      <li key={k}>
                        <button type="button" role="radio" aria-checked={chosen === k} data-color={k} onClick={() => setColor(k)}>
                          <i style={{ '--sw': SW[k][0] }} />{SW[k][1][lang]}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="pdp__block" data-pdp-finishes hidden={!p.sw.length}>
                  <h2>{t.finishes}</h2>
                  <ul className="pdp__swatches">{p.sw.map((k) => <li key={k}><i style={{ '--sw': SW[k][0] }} />{SW[k][1][lang]}</li>)}</ul>
                </div>
              )}
              <div className="pdp__block" data-pdp-uses hidden={!p.uses.length}>
                <h2>{t.uses}</h2>
                <ul className="pdp__chips">{p.uses.map((k) => <li key={k}><Icon id={USE_ICONS[k] || 'check'} />{USE_LABEL[k][lang]}</li>)}</ul>
              </div>
              <div className="pdp__actions">
                <AddToQuote id={p.id} className="btn btn--primary pdp__add" />{' '}
                <a className="btn btn--outline btn--outline-light pdp__wa" data-pdp-wa href={waLink(`${t.waText} ${p.title}${chosen ? ` - ${label}` : ''}`)} target="_blank" rel="noopener">
                  <Icon id="wa" />
                  <span>{t.ask}</span>
                </a>
              </div>
              <p className="pdp__note">
                <Icon id="info" />
                <span>{t.note}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ================= Related ================= */}
      <section className="section pdp-rel" aria-labelledby="rel-title" data-pdp-rel hidden={!related.length}>
        <div className="container">
          <div className="head">
            <div><h2 id="rel-title">{t.related}</h2><p>{t.relatedText}</p></div>
            <Link className="more" href={href(lang, '/shop')}>{t.all}<Icon id="arrow" hidden={false} /></Link>
          </div>
          <div className="pdp-rel__grid" data-pdp-rel-grid>
            {related.map((q) => <ProductCard p={q} lang={lang} variant="related" key={q.id} />)}
          </div>
        </div>
      </section>
    </>
  );
}
