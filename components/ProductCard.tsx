'use client';

import { AnimatePresence, motion, type PanInfo } from 'motion/react';
import { AnimateView } from 'motion/react-animate-view';
import Link from 'next/link';
import { memo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { COLOR_IMGS, M, SW, colorImg, imgSrc, photoAlt, type Finish, type Product } from '@/lib/catalog';
import { follow, fromBall, loaded, springBack, swipeAway } from '@/lib/colorMorph';
import { dict, href, type Lang } from '@/lib/i18n';
import { EXPO, SPRING } from '@/lib/motion';
import { markCardNavigation } from '@/lib/morph';
import AddToQuote from './AddToQuote';
import Icon from './Icon';

interface Props {
  p: Product;
  lang: Lang;
  /** home cards are not links; shop and related cards link to the product page */
  variant: 'home' | 'shop' | 'related';
  index?: number;
  className?: string;
}

/** Shared view-transition name: the card photo morphs into the product page photo */
export const photoName = (id: string) => `product-photo-${id}`;

function ProductCard({ p, lang, variant, index = 0, className = '' }: Props) {
  const t = dict[lang];
  const url = href(lang, `/product/${p.id}`);
  // finishes that have their own photo can be picked on the card
  const pickable = (COLOR_IMGS[p.id] || []).filter((f) => p.sw.includes(f));
  const start = imgSrc(p);
  const [finish, setFinish] = useState<Finish | null>(
    pickable.find((f) => start === colorImg(p.id, f)) ?? (pickable.includes('black') ? 'black' : null)
  );
  const [src, setSrc] = useState(start);
  const media = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const busy = useRef(false);
  const panned = useRef(false);

  // fetch the finish photos before they are needed, so the reveal never waits on the network
  const preloaded = useRef(false);
  const preload = () => { if (preloaded.current) return; preloaded.current = true; pickable.forEach((f) => { new Image().src = colorImg(p.id, f); }); };
  const show = async (f: Finish) => { flushSync(() => { setFinish(f); setSrc(colorImg(p.id, f)); }); await loaded(img.current); };
  const pick = async (f: Finish, swatch: Element) => {
    if (f === finish || busy.current || !media.current) return;
    preload();
    busy.current = true;
    try { await fromBall({ ball: swatch, frame: media.current, img: img.current, src: colorImg(p.id, f), commit: () => show(f) }); } finally { busy.current = false; }
  };
  // swipe: the photo follows the finger, then is thrown to the next finish or springs back
  const canSwipe = () => pickable.length > 1 && !busy.current && !!img.current;
  const onPan = (_: unknown, info: PanInfo) => { if (canSwipe()) follow(img.current!, info.offset.x); };
  const onPanEnd = async (_: unknown, info: PanInfo) => {
    if (!canSwipe()) return;
    if (Math.abs(info.offset.x) < 50 && Math.abs(info.velocity.x) < 450) { springBack(img.current!); return; }
    const dir = info.offset.x < 0 ? -1 : 1;
    const step = (lang === 'ar' ? dir : -dir) as 1 | -1; // dragging toward the reading end moves forward
    preload();
    const i = finish ? pickable.indexOf(finish) : 0;
    const next = pickable[(i + step + pickable.length) % pickable.length];
    busy.current = true;
    try { await swipeAway(img.current!, dir as 1 | -1, colorImg(p.id, next), () => show(next)); } finally { busy.current = false; }
  };

  const photo = (
    <AnimateView name={photoName(p.id)} transition={{ duration: 0.5, ease: EXPO }}>
      <img ref={img} src={src} alt={photoAlt(p, lang, finish)} loading="lazy" decoding="async" draggable={false} />
    </AnimateView>
  );
  // open the product page in the finish picked on the card
  const link = finish ? `${url}?color=${finish}` : url;
  const toProduct = (e: React.MouseEvent) => { if (panned.current) { e.preventDefault(); panned.current = false; return; } markCardNavigation(); };
  const swipe = pickable.length > 1;
  const reveal = variant !== 'related';

  return (
    <article
      onPointerEnter={pickable.length ? preload : undefined}
      className={`pcard${className}`}
      data-id={variant === 'home' ? undefined : p.id}
      data-reveal={reveal ? '' : undefined}
      style={reveal ? { '--d': index % (variant === 'home' ? 4 : 3) } : undefined}
    >
      <motion.div ref={media} className={`pcard__media${swipe ? ' is-swipe' : ''}`}
        onPanStart={() => { panned.current = true; }} onPan={swipe ? onPan : undefined} onPanEnd={swipe ? onPanEnd : undefined}
        onPointerDown={() => { panned.current = false; }}>
        <Link href={link} tabIndex={-1} aria-hidden="true" aria-label={p.title} onClick={toProduct}>{photo}</Link>
        <span className="badge">{p.badge}</span>
        {swipe && (
          <span className="swipe-dots" aria-hidden="true">
            {pickable.map((f) => <i key={f} className={f === finish ? 'on' : undefined} />)}
          </span>
        )}
      </motion.div>
      <div className="pcard__body">
        <span className="pcard__cat">{p.cat}</span>
        <h3><Link className="pcard__link" href={link} onClick={markCardNavigation}>{p.title}</Link></h3>
        {p.desc ? <p className="pcard__desc">{p.desc}</p> : null}
        {variant !== 'related' && (p.m.length > 0 || p.sw.length > 0) && (
          <div className="pcard__opts">
            {p.sw.length > 0 && (
              <div className="swatches" aria-label={t.finishesLabel}>
                {p.sw.map((k) => pickable.includes(k) ? (
                  <motion.button type="button" className="sw sw--ball" style={{ '--sw': SW[k][0] }} aria-pressed={finish === k} key={k}
                    animate={{ scale: finish === k ? 1.1 : 1 }} whileTap={{ scale: 0.82 }} transition={SPRING.pop} onClick={(e) => pick(k, e.currentTarget)}>
                    <img src={colorImg(p.id, k)} alt={photoAlt(p, lang, k)} aria-hidden="true" loading="lazy" decoding="async" draggable={false} />
                    <span className="sw-tip">{SW[k][1][lang]}</span>
                    <span className="sr-only">{SW[k][1][lang]}</span>
                  </motion.button>
                ) : (
                  <span className="sw" style={{ '--sw': SW[k][0] }} key={k}>
                    <span className="sw-tip">{SW[k][1][lang]}</span>
                    <span className="sr-only">{SW[k][1][lang]}</span>
                  </span>
                ))}
              </div>
            )}
            {p.m.length > 0 && (
              <div className="dots" aria-label={t.methodsLabel}>
                {p.m.map((k) => (
                  <span className="dot" title={M[k][lang]} key={k}><Icon id={k} /><span className="sr-only">{M[k][lang]}</span></span>
                ))}
              </div>
            )}
          </div>
        )}
        {variant !== 'related' && p.sw.length > 0 && (
          <>
            {/* Finish chip: appears below swatches when a colour is chosen */}
            <AnimatePresence mode="wait">
              {finish && (
                <motion.span
                  key={finish}
                  className="finish-chip"
                  style={{ '--sw': SW[finish][0] } as React.CSSProperties}
                  initial={{ opacity: 0, scale: 0.8, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -4 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                >
                  <i className="finish-chip__dot" aria-hidden="true" />
                  {SW[finish][1][lang]}
                </motion.span>
              )}
            </AnimatePresence>
          </>
        )}
        <div className="pcard__foot"><AddToQuote id={p.id} /></div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
