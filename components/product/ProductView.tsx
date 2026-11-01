'use client';

import { AnimatePresence, motion, type PanInfo } from 'motion/react';
import { AnimateView } from 'motion/react-animate-view';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { flushSync } from 'react-dom';
import { follow, fromBall, loaded, springBack, swipeAway } from '@/lib/colorMorph';
import { EXPO as EXPO_CURVE, SPRING, play } from '@/lib/motion';
import { takeCardNavigation } from '@/lib/morph';
import { COLOR_IMGS, M, SW, USE_ICONS, USE_LABEL, byId, catalog, colorImg, imgSrc, photoAlt, waLink, type Finish } from '@/lib/catalog';
import { href, type Lang } from '@/lib/i18n';
import AddToQuote from '../AddToQuote';
import Icon from '../Icon';
import ProductCard, { photoName } from '../ProductCard';

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
const SMOOTH_CSS = 'cubic-bezier(.22,1,.36,1)';
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Product details: gallery with a live finish picker, specs, add-to-quote and related products */
/** `summary`: the product described in plain words (built on the server, shown under the title) */
export default function ProductView({ lang, id, summary }: { lang: Lang; id?: string; summary?: string }) {
  const t = T[lang];
  const p = id ? byId(lang, id) : undefined;
  const pickable = p ? (COLOR_IMGS[p.id] || []).filter((k) => p.sw.includes(k)) : [];
  const start: Finish | null = pickable.length ? (pickable.includes('black') ? 'black' : pickable[0]) : null;
  const [chosen, setChosen] = useState<Finish | null>(start);
  const [src, setSrc] = useState(p ? (start ? colorImg(p.id, start) : imgSrc(p)) : '');
  const img = useRef<HTMLImageElement>(null);
  const info = useRef<HTMLDivElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const swatches = useRef<HTMLUListElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  // ?color=<finish> picks the finish; preload the finish photos, then play the entrance
  // applied before the first paint so a card → page morph already lands on the right finish
  useLayoutEffect(() => {
    if (!p) return;
    const want = new URLSearchParams(location.search).get('color') as Finish | null;
    const k = want && want !== start && pickable.includes(want) ? want : start;
    if (k !== start) { setChosen(k); setSrc(colorImg(p.id, k!)); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    if (!p) return;
    pickable.forEach((k) => { const pre = new Image(); pre.src = colorImg(p.id, k); });
    // arriving from a product card, the photo morphs into place on its own (view transition)
    const morphing = takeCardNavigation();
    if (reduced()) return;
    const els = [...(morphing ? [] : [gallery.current!]), ...info.current!.querySelectorAll(':scope > *:not([hidden])')];
    // once in place, hand the styles back to CSS (keeps the photo's drop shadow and hover effects)
    const settle = (el: Element) => () => ['opacity', 'transform', 'filter'].forEach((p) => (el as HTMLElement).style.removeProperty(p));
    els.forEach((el, i) => { play(el, [{ opacity: 0, transform: 'translateY(24px)', filter: 'blur(6px)' }, { opacity: 1, transform: 'none', filter: 'blur(0px)' }], { duration: 900, delay: 80 + i * 70, easing: SMOOTH_CSS, fill: 'both' }).onfinish = settle(el); });
    if (!morphing && img.current) play(img.current, [{ opacity: 0, transform: 'scale(.9) translateY(14px)', filter: 'blur(10px)' }, { opacity: 1, transform: 'none', filter: 'blur(0px)' }], { duration: 1100, delay: 150, easing: SMOOTH_CSS, fill: 'both' }).onfinish = settle(img.current);
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

  /** Switch finish: the swatch colour morphs into the photo, or the photo swipes over to the next one */
  const setColor = async (k: Finish, how: { swatch: Element } | { dir: 1 | -1 }) => {
    if (k === chosen || busy.current) return;
    const u = new URL(location.href); u.searchParams.set('color', k); history.replaceState(history.state, '', u);
    const src = colorImg(p.id, k);
    const commit = async () => { flushSync(() => { setChosen(k); setSrc(src); }); await loaded(img.current); };
    busy.current = true;
    try {
      if ('swatch' in how && stage.current) await fromBall({ ball: how.swatch, frame: stage.current, img: img.current, src, commit });
      else if ('dir' in how && img.current) await swipeAway(img.current, how.dir, src, commit);
      else await commit();
    } finally { busy.current = false; }
  };
  const dotOf = (k: Finish) => swatches.current?.querySelector(`[data-color="${k}"] i`) ?? stage.current!;
  // swipe the photo to the next/previous finish
  const swipeable = () => pickable.length > 1 && !!chosen && !busy.current && !!img.current;
  // the photo follows the finger, then is thrown to the next finish or springs back
  const onPan = (_: unknown, info: PanInfo) => { if (swipeable()) follow(img.current!, info.offset.x); };
  const onPanEnd = (_: unknown, info: PanInfo) => {
    if (!swipeable()) return;
    if (Math.abs(info.offset.x) < 60 && Math.abs(info.velocity.x) < 450) { springBack(img.current!); return; }
    const dir = info.offset.x < 0 ? -1 : 1;
    const step = lang === 'ar' ? dir : -dir; // dragging toward the reading end moves forward
    const i = pickable.indexOf(chosen!);
    setColor(pickable[(i + step + pickable.length) % pickable.length], { dir: dir as 1 | -1 });
  };
  const onKey = (e: KeyboardEvent) => {
    const d = ({ ArrowRight: -1, ArrowLeft: 1, ArrowDown: 1, ArrowUp: -1 } as Record<string, number>)[e.key]; if (!d) return;
    e.preventDefault();
    const i = pickable.indexOf(chosen!), next = pickable[(i + d + pickable.length) % pickable.length];
    swatches.current?.querySelector<HTMLElement>(`[data-color="${next}"]`)?.focus();
    setColor(next, { swatch: dotOf(next) });
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
              <motion.div ref={stage} className={`pdp__stage${chosen ? ' is-color' : ''}${pickable.length > 1 ? ' is-swipe' : ''}`} onPan={onPan} onPanEnd={onPanEnd}>
                <span className="pdp__badge" data-pdp-badge>{p.badge}</span>{' '}
                <AnimateView name={photoName(p.id)} transition={{ duration: 0.5, ease: EXPO_CURVE }}>
                  <img data-pdp-img src={src} alt={photoAlt(p, lang, chosen)} decoding="async" fetchPriority="high" ref={img} draggable={false} />
                </AnimateView>
                {pickable.length > 1 && (
                  <span className="swipe-dots" aria-hidden="true">{pickable.map((k) => <i key={k} className={k === chosen ? 'on' : undefined} />)}</span>
                )}
              </motion.div>
            </div>
            <div className="pdp__info" ref={info}>
              <span className="pdp__cat" data-pdp-cat>{p.cat}</span>
              <h1 id="pdp-title" data-pdp-title>{p.title}</h1>
              <p className="pdp__desc" data-pdp-desc hidden={!(summary || p.desc)}>{summary || p.desc}</p>
              <dl className="pdp__meta" data-pdp-meta>
                {rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </dl>
              <div className="pdp__block" data-pdp-methods hidden={!p.m.length}>
                <h2>{t.methods}</h2>
                <ul className="pdp__chips">{p.m.map((k) => <li key={k}><Icon id={k} />{M[k][lang]}</li>)}</ul>
              </div>
              {pickable.length ? (
                <div className="pdp__block is-picker" data-pdp-finishes>
                  <h2>{t.pick} <span data-pdp-chosen><AnimatePresence initial={false} mode="popLayout"><motion.span key={label} style={{ display: 'inline-block' }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>: {label}</motion.span></AnimatePresence></span></h2>
                  <ul className="pdp__swatches" role="radiogroup" aria-label={t.pickLabel} ref={swatches} onKeyDown={onKey}>
                    {pickable.map((k) => (
                      <li key={k}>
                        <motion.button type="button" role="radio" aria-checked={chosen === k} data-color={k} whileTap={{ scale: 0.95 }}
                          onClick={(e) => setColor(k, { swatch: e.currentTarget.querySelector('i')! })}>
                          {chosen === k && <motion.span layoutId="pdp-swatch-pill" className="sel-pill" style={{ borderRadius: 999 }} transition={SPRING.glide}
                            animate={{ borderColor: pillColor(SW[k][0]), backgroundColor: pillColor(SW[k][0], 0.16) }} />}
                          {/* the ball shows the product in this finish */}
                          <i className="ball" style={{ '--sw': SW[k][0] }}><img src={colorImg(p.id, k)} alt={photoAlt(p, lang, k)} aria-hidden="true" loading="lazy" decoding="async" draggable={false} /></i>{SW[k][1][lang]}
                        </motion.button>
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

/** The selection highlight in the finish colour (dark finishes are lifted so they read on the navy page) */
function pillColor(hex: string, alpha = 1) {
  let [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  if (0.2126 * r + 0.7152 * g + 0.0722 * b < 70) [r, g, b] = [150, 160, 196];
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
