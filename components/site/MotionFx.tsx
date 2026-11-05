'use client';

import { animate, inView, motionValue, scroll, springValue } from 'motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { SMOOTH } from '@/lib/motion';

/** cards that tilt toward the cursor (with a soft spotlight) */
const TILT = '.pcard, .cat, .sol, .rev, .spec, .channel';
/** buttons that lean toward the cursor */
const MAGNET = '.btn--primary, .btn--navy, .chat-fab';
/** section headings that wipe up into view (those already inside a revealed block are left alone) */
const HEADINGS = '.head h2, .partners__top h2, .reviews__head h2, .faq__intro h2, .cta h2, .spec__head h2';
/** images that drift slightly as the page scrolls past them: [selector, from, to] */
const PARALLAX: [string, string, string][] = [['.cat__media img', '0 26px', '0 -26px'], ['.sol img', '-50% 18px', '-50% -18px']];
/** hero copy that eases up and fades as the hero scrolls away */
const HERO_COPY = '.hero__copy, .ab-hero__grid > div, .ct-hero__copy, .shop-hero__copy, .fq-hero > .container';

const SOFT = { stiffness: 220, damping: 22, mass: 0.6 };

/** A spring-smoothed value written to a style property whenever it moves */
function springTo(el: HTMLElement, write: (v: number) => void, opts = SOFT) {
  const target = motionValue(0);
  const smooth = springValue(target, opts);
  const off = smooth.on('change', write);
  return { target, smooth, off };
}

interface Tilt { rx: ReturnType<typeof springTo>; ry: ReturnType<typeof springTo>; lift: ReturnType<typeof springTo> }
interface Magnet { x: ReturnType<typeof springTo>; y: ReturnType<typeof springTo> }

/** Modern scroll and hover effects for the whole site (Motion). */
export default function MotionFx() {
  const path = usePathname();

  useEffect(() => {
    const reduced = false;
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cleanups: VoidFunction[] = [];

    if (!reduced) {
      // ---------- scroll-linked parallax (native scroll timelines where supported) ----------
      for (const [sel, from, to] of PARALLAX) {
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          cleanups.push(scroll(animate(el, { translate: [from, to] }, { ease: 'linear' }), { target: el.closest('a, article, section') ?? el, offset: ['start end', 'end start'] }));
        });
      }
      document.querySelectorAll<HTMLElement>(HERO_COPY).forEach((el) => {
        const hero = el.closest('section'); if (!hero) return;
        cleanups.push(scroll(animate(el, { opacity: [1, 0.15], translate: ['0 0px', '0 -70px'] }, { ease: 'linear' }), { target: hero, offset: ['start start', 'end start'] }));
      });

      // ---------- headings wipe up into view ----------
      document.querySelectorAll<HTMLElement>(HEADINGS).forEach((h) => {
        if (h.closest('[data-reveal]') || h.classList.contains('is-shown')) { h.classList.add('is-shown'); return; }
        cleanups.push(inView(h, () => {
          animate(h, { clipPath: ['inset(0 0 100% 0)', 'inset(-20% -4% -20% -4%)'], translate: ['0 22px', '0 0px'], opacity: [0, 1] }, { duration: 0.9, ease: SMOOTH })
            .then(() => { h.classList.add('is-shown'); ['clip-path', 'translate', 'opacity'].forEach((p) => h.style.removeProperty(p)); });
        }, { margin: '0px 0px -10% 0px' }));
      });
    } else {
      document.querySelectorAll(HEADINGS).forEach((h) => h.classList.add('is-shown'));
    }

    if (!reduced && finePointer) {
      // ---------- cards tilt toward the cursor, lift, and carry a spotlight ----------
      const tilts = new WeakMap<HTMLElement, Tilt>();
      const magnets = new WeakMap<HTMLElement, Magnet>();
      let card: HTMLElement | null = null, btn: HTMLElement | null = null;

      const tiltOf = (el: HTMLElement) => {
        let t = tilts.get(el);
        if (!t) {
          const settle = () => { if (card !== el && [t!.rx, t!.ry, t!.lift].every((s) => Math.abs(s.smooth.get()) < 0.02)) el.classList.remove('is-tilting'); };
          t = {
            rx: springTo(el, (v) => { el.style.setProperty('--rx', `${v}deg`); settle(); }),
            ry: springTo(el, (v) => { el.style.setProperty('--ry', `${v}deg`); settle(); }),
            lift: springTo(el, (v) => { el.style.setProperty('--lift', `${v}px`); settle(); }),
          };
          tilts.set(el, t);
        }
        return t;
      };
      const magnetOf = (el: HTMLElement) => {
        let m = magnets.get(el);
        if (!m) {
          const write = () => { const x = m!.x.smooth.get(), y = m!.y.smooth.get(); el.style.translate = Math.abs(x) + Math.abs(y) < 0.05 && btn !== el ? '' : `${x}px ${y}px`; };
          m = { x: springTo(el, write, { stiffness: 260, damping: 18, mass: 0.5 }), y: springTo(el, write, { stiffness: 260, damping: 18, mass: 0.5 }) };
          magnets.set(el, m);
        }
        return m;
      };
      const leaveCard = () => { if (!card) return; const t = tiltOf(card); card = null; t.rx.target.set(0); t.ry.target.set(0); t.lift.target.set(0); };
      const leaveBtn = () => { if (!btn) return; const m = magnetOf(btn); btn = null; m.x.target.set(0); m.y.target.set(0); };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        const target = e.target as Element;
        // cards
        const c = target.closest<HTMLElement>(TILT);
        if (c !== card) { leaveCard(); if (c) { card = c; c.classList.add('is-tilting'); tiltOf(c).lift.target.set(-6); } }
        if (card) {
          const r = card.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
          const t = tiltOf(card);
          t.rx.target.set((0.5 - py) * 7); // tilt up/down
          t.ry.target.set((px - 0.5) * 9); // tilt left/right
          card.style.setProperty('--mx', `${e.clientX - r.left}px`);
          card.style.setProperty('--my', `${e.clientY - r.top}px`);
        }
        // magnetic buttons
        const b = target.closest<HTMLElement>(MAGNET);
        if (b !== btn) { leaveBtn(); btn = b; }
        if (btn) {
          const r = btn.getBoundingClientRect(), m = magnetOf(btn);
          const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
          m.x.target.set(Math.max(-8, Math.min(8, dx * 0.18)));
          m.y.target.set(Math.max(-6, Math.min(6, dy * 0.28)));
        }
      };
      const onOut = (e: PointerEvent) => { if (!e.relatedTarget) { leaveCard(); leaveBtn(); } };
      document.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerout', onOut, { passive: true });
      cleanups.push(() => { document.removeEventListener('pointermove', onMove); document.removeEventListener('pointerout', onOut); leaveCard(); leaveBtn(); });
    }

    return () => cleanups.forEach((c) => c());
  }, [path]);

  return null;
}

