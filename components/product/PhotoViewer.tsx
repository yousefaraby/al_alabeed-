'use client';

import { animate, AnimatePresence, motion, type PanInfo } from 'motion/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { SPRING } from '@/lib/motion';
import type { Lang } from '@/lib/i18n';

export interface ViewerPhoto { key: string; src: string; alt: string; label?: string; color?: string }

const T = {
  ar: { title: 'صور المنتج', close: 'إغلاق', next: 'الصورة التالية', prev: 'الصورة السابقة', zoomIn: 'تكبير', zoomOut: 'تصغير', fs: 'ملء الشاشة', exitFs: 'الخروج من ملء الشاشة' },
  en: { title: 'Product photos', close: 'Close', next: 'Next photo', prev: 'Previous photo', zoomIn: 'Zoom in', zoomOut: 'Zoom out', fs: 'Full screen', exitFs: 'Exit full screen' },
};
const ZOOM = 2.2;

/** Where the picture inside an object-fit: contain <img> actually sits on screen */
function pictureRect(img: HTMLImageElement) {
  const r = img.getBoundingClientRect();
  const nw = img.naturalWidth || r.width, nh = img.naturalHeight || r.height;
  const s = Math.min(r.width / nw, r.height / nh);
  const w = nw * s, h = nh * s;
  return { x: r.left + (r.width - w) / 2, y: r.top + (r.height - h) / 2, w, h };
}

/** The x / y / scale that put the viewer photo (at rest, centred in its stage) over the page photo */
function flipFrom(page: HTMLImageElement, el: HTMLImageElement) {
  const a = pictureRect(page), s = el.parentElement!.getBoundingClientRect();
  // the picture inside the viewer box (object-fit: contain), at rest
  const nw = el.naturalWidth || el.offsetWidth, nh = el.naturalHeight || el.offsetHeight;
  const w = nw * Math.min(el.offsetWidth / nw, el.offsetHeight / nh);
  return { x: a.x + a.w / 2 - (s.left + s.width / 2), y: a.y + a.h / 2 - (s.top + s.height / 2), scale: a.w / w };
}

/**
 * Full-screen product photos. The photo grows out of the page's photo (`from`) and shrinks back
 * into it on close; inside, swipe or use the arrows to change finish, click to zoom and drag to pan.
 */
export default function PhotoViewer({ lang, photos, index, onIndex, onClose, from }: {
  lang: Lang; photos: ViewerPhoto[]; index: number; onIndex: (i: number) => void; onClose: () => void; from: () => HTMLImageElement | null;
}) {
  const t = T[lang];
  const root = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [zoom, setZoom] = useState(false);
  const [dir, setDir] = useState(0);
  const [closing, setClosing] = useState(false);
  const [fs, setFs] = useState(false);
  const dragged = useRef(false);
  const many = photos.length > 1;
  const photo = photos[index];
  const rtl = lang === 'ar';

  // grow out of the page photo (FLIP), lock the page, focus the viewer; give focus back on close
  useLayoutEffect(() => {
    const back = document.activeElement as HTMLElement | null;
    document.body.classList.add('is-viewing');
    closeBtn.current?.focus({ preventScroll: true });
    const src = from(), el = img.current;
    if (src && el && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const k = flipFrom(src, el);
      animate(el, { x: [k.x, 0], y: [k.y, 0], scale: [k.scale, 1] }, SPRING.glide);
    }
    return () => { document.body.classList.remove('is-viewing'); back?.focus({ preventScroll: true }); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const on = () => setFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);

  const go = (step: number) => {
    if (!many) return;
    setZoom(false);
    setDir(step);
    onIndex((index + step + photos.length) % photos.length);
  };

  /** shrink back into the page photo, then unmount */
  const close = async () => {
    if (closing) return;
    setClosing(true);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    const src = from(), el = img.current;
    if (src && el && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const shrink = animate(el, flipFrom(src, el), { duration: 0.42, ease: [0.22, 1, 0.36, 1] }).finished.catch(() => {});
      await Promise.race([shrink, new Promise((r) => setTimeout(r, 600))]);
    }
    onClose();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    const d = ({ ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 } as Record<string, number>)[e.key];
    if (d) { e.preventDefault(); go(d); }
    // keep Tab inside the viewer
    if (e.key === 'Tab' && root.current) {
      const f = [...root.current.querySelectorAll<HTMLElement>('button:not([disabled])')];
      const i = f.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1]?.focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0]?.focus(); }
    }
  };

  // swipe toward the reading end for the next photo
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (zoom) return;
    if (Math.abs(info.offset.x) < 70 && Math.abs(info.velocity.x) < 500) return;
    const toLeft = info.offset.x < 0;
    go(toLeft === !rtl ? 1 : -1);
  };

  const toggleFs = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else root.current?.requestFullscreen?.().catch(() => {});
  };
  const canFs = typeof document !== 'undefined' && !!document.fullscreenEnabled;
  const slide = rtl ? -1 : 1; // the next photo comes in from the reading end

  return createPortal(
    <div className={`pv${closing ? ' is-closing' : ''}${zoom ? ' is-zoomed' : ''}`} ref={root} role="dialog" aria-modal="true" aria-label={t.title} onKeyDown={onKey}>
      <motion.div className="pv__backdrop" onClick={close}
        initial={{ opacity: 0 }} animate={{ opacity: closing ? 0 : 1 }} transition={{ duration: closing ? 0.38 : 0.3 }} />

      <motion.div className="pv__bar" initial={{ opacity: 0, y: -12 }} animate={{ opacity: closing ? 0 : 1, y: closing ? -12 : 0 }} transition={{ duration: 0.3, delay: closing ? 0 : 0.12 }}>
        <span className="pv__count" aria-live="polite">{photo.label ? <><i style={{ '--sw': photo.color } as React.CSSProperties} />{photo.label}</> : null}{many ? <b>{index + 1} / {photos.length}</b> : null}</span>
        <span className="pv__tools">
          <button type="button" className="pv__btn" aria-label={zoom ? t.zoomOut : t.zoomIn} aria-pressed={zoom} onClick={() => setZoom((z) => !z)}>
            <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.9" /><path d={zoom ? 'M8 11h6M16 16l4 4' : 'M8 11h6M11 8v6M16 16l4 4'} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" /></svg>
          </button>
          {canFs && (
            <button type="button" className="pv__btn" aria-label={fs ? t.exitFs : t.fs} aria-pressed={fs} onClick={toggleFs}>
              <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d={fs ? 'M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5' : 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5'} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}
          <button type="button" className="pv__btn" aria-label={t.close} onClick={close} ref={closeBtn}>
            <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" /></svg>
          </button>
        </span>
      </motion.div>

      <div className="pv__stage" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img key={photo.src} ref={img} className="pv__img" src={photo.src} alt={photo.alt} draggable={false}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * slide * 120, scale: 0.94 }),
              center: { opacity: 1, x: 0, scale: zoom ? ZOOM : 1 },
              exit: (d: number) => ({ opacity: 0, x: -d * slide * 120, scale: 0.94 }),
            }}
            initial="enter" animate="center" exit="exit"
            transition={{ ...SPRING.glide, opacity: { duration: 0.25 } }}
            drag={zoom ? true : many ? 'x' : false}
            dragSnapToOrigin={!zoom}
            dragElastic={zoom ? 0.12 : 0.5}
            dragConstraints={zoom ? { left: -400, right: 400, top: -300, bottom: 300 } : { left: 0, right: 0 }}
            onDragStart={() => { dragged.current = true; }}
            onDragEnd={onDragEnd}
            onPointerDown={() => { dragged.current = false; }}
            onClick={() => { if (!dragged.current) setZoom((z) => !z); }}
          />
        </AnimatePresence>
      </div>

      {many && (
        <>
          <motion.button type="button" className="pv__nav pv__nav--prev" aria-label={t.prev} onClick={() => go(-1)} whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }} animate={{ opacity: closing ? 0 : 1 }} transition={{ duration: 0.3, delay: closing ? 0 : 0.15 }}>
            <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d={rtl ? 'M9 6l6 6-6 6' : 'M15 6l-6 6 6 6'} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.button>
          <motion.button type="button" className="pv__nav pv__nav--next" aria-label={t.next} onClick={() => go(1)} whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }} animate={{ opacity: closing ? 0 : 1 }} transition={{ duration: 0.3, delay: closing ? 0 : 0.15 }}>
            <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d={rtl ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.button>
          <motion.div className="pv__thumbs" initial={{ opacity: 0, y: 16 }} animate={{ opacity: closing ? 0 : 1, y: closing ? 16 : 0 }} transition={{ duration: 0.3, delay: closing ? 0 : 0.18 }}>
            {photos.map((ph, i) => (
              <button type="button" key={ph.key} className="pv__thumb" aria-label={ph.label || ph.alt} aria-current={i === index ? 'true' : undefined}
                onClick={() => { if (i !== index) { setZoom(false); setDir(i > index ? 1 : -1); onIndex(i); } }}>
                {i === index && <motion.span layoutId="pv-thumb-ring" className="pv__ring" transition={SPRING.glide} />}
                <img src={ph.src} alt="" draggable={false} />
              </button>
            ))}
          </motion.div>
        </>
      )}
    </div>,
    document.body,
  );
}
