'use client';

import { play, type Played } from '@/lib/motion';
import { useEffect, useRef, type ReactNode } from 'react';

/** About hero: a real dial photo whose numbered ring spins a safe combination and can be dragged. */
export default function DialHero({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => runDial(ref.current!), []);
  return <section className="ab-hero" aria-labelledby="ab-title" ref={ref}>{children}</section>;
}

/* ---------- ported from the original page script ---------- */
function runDial(hero: HTMLElement) {
  const media = hero.querySelector<HTMLElement>('[data-abdial]'); if (!media) return;
  const svg = media.querySelector('svg')!, copy = hero.querySelector<HTMLElement>('.ab-hero__grid > div')!;
  const $ = <T extends Element = SVGElement>(k: string) => media.querySelector<T>(`[data-ab="${k}"]`);
  const photo = $('photo')!, rotor = $('rotor')!, dim = $('dim')!, glow = $('glow')!, tip = $('tip')!, wave = $('wave')!;
  const grab = $<HTMLElement>('grab')!, hint = $<HTMLElement>('hint');
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches, RTL = document.documentElement.dir === 'rtl';
  const CX = +media.dataset.cx!, CY = 425, K = 207 / 218.5, RB = 262; // ring centre, ellipse ratio, bezel radius (photo px)
  const FX = +media.dataset.fx!, FY = 427; // framing focus
  const TARGET = +media.dataset.target!; // ring angle that brings its "25" under the pointer
  const timers: ReturnType<typeof setTimeout>[] = [];
  let alive = true;

  /* frame the photo so the dial sits in the free half and never runs under the text */
  let PX = 0, PY = 0;
  function fit() {
    const r = media!.getBoundingClientRect(), W = r.width, H = r.height; if (!W || !H) return;
    const stacked = matchMedia('(max-width: 1100px)').matches;
    let s: number, cx: number, cy = H / 2;
    if (stacked) { const box = Math.min(W, H / 1.12); s = box / (RB * 2 + 110); cx = W / 2; cy = box / 2 + 10; } // dial sits in the upper part, above the fade
    else {
      const t = copy.getBoundingClientRect();
      const free = RTL ? t.left - r.left : r.right - t.right;
      s = H / 905;
      if (RB * 2 * s + 64 > free) s = Math.max(.35, (free - 64) / (RB * 2));
      const want = Math.min(W * .36, free - 32 - RB * s);
      const x = Math.max(RB * s + 16, want);
      cx = RTL ? x : W - x;
    }
    PX = cx; PY = cy;
    const vw = W / s, vh = H / s;
    svg.setAttribute('viewBox', `${(FX - cx / s).toFixed(1)} ${(FY - cy / s).toFixed(1)} ${vw.toFixed(1)} ${vh.toFixed(1)}`);
    const d = RB * 1.7 * s;
    Object.assign(grab.style, { left: cx + 'px', top: cy + 'px', width: d + 'px', height: d + 'px' });
    if (hint) Object.assign(hint.style, { left: cx + 'px', top: (cy + RB * s + 10) + 'px' });
  }
  fit(); addEventListener('resize', fit);
  const ro = 'ResizeObserver' in window ? new ResizeObserver(fit) : null;
  ro?.observe(media);

  /* ring rotation (done in "unsquashed" space so the slightly oval photo dial turns cleanly) */
  let angle = 0;
  const render = () => rotor.setAttribute('transform', `translate(${CX} ${CY}) scale(${K} 1) rotate(${angle.toFixed(3)}) scale(${1 / K} 1) translate(${-CX} ${-CY})`);
  const ease = (t: number) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const back = (t: number) => { const c1 = 1.25, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
  let tw = 0;
  function tween(to: number, ms: number, fn = ease) {
    cancelAnimationFrame(tw);
    return new Promise<void>((res) => {
      const from = angle, t0 = performance.now();
      const step = (now: number) => {
        if (!alive) return;
        const p = Math.min(1, (now - t0) / ms); angle = from + (to - from) * fn(p); render();
        if (p < 1) tw = requestAnimationFrame(step); else res();
      };
      tw = requestAnimationFrame(step);
    });
  }
  const EXPO = 'cubic-bezier(.16,1,.3,1)';
  let fx: Played[] = []; // running dim/glow/tip/wave animations
  let intro: Played | null = null; // the photo's entrance: stays applied, it holds the photo visible
  function settle() {
    media!.classList.add('is-ready');
    fx.push(play(dim, [{ opacity: .72 }, { opacity: 0 }], { duration: 700, easing: EXPO, fill: 'forwards' }));
    fx.push(play(glow, [{ opacity: 0 }, { opacity: .85, offset: .25 }, { opacity: .18 }], { duration: 1400, easing: 'ease-out', fill: 'forwards' }));
    fx.push(play(tip, [{ opacity: 0 }, { opacity: 1, offset: .2 }, { opacity: 0 }], { duration: 900, easing: 'ease-out' }));
    fx.push(play(wave, [{ opacity: .7, transform: 'scale(.94)' }, { opacity: 0, transform: 'scale(1.1)' }], { duration: 1100, easing: EXPO }));
  }
  function unset() { fx.forEach((a) => a.cancel()); fx = [play(dim, [{ opacity: 0 }, { opacity: .5 }], { duration: 250, fill: 'forwards' })]; }
  async function combination() {
    // a real safe sequence: spin right, a full turn left, then right onto the mark
    await tween(TARGET + 200, 1150);           // right, past the number
    await tween(TARGET - 260, 1100);           // a full sweep left
    await tween(TARGET, 1250, back);           // right, landing on 25
    if (!alive) return;
    angle = TARGET; render(); settle();
  }
  render();
  const start = () => {
    hero.classList.add('is-in');
    if (REDUCED) { angle = TARGET; render(); (photo as SVGElement).style.opacity = '1'; dim.setAttribute('opacity', '0'); glow.setAttribute('opacity', '.18'); media!.classList.add('is-ready'); return; }
    intro = play(photo, [{ opacity: 0, transform: `translate(${FX}px, ${FY}px) scale(1.08) translate(${-FX}px, ${-FY}px)` }, { opacity: 1, transform: 'none' }], { duration: 1500, easing: EXPO, fill: 'forwards' });
    timers.push(setTimeout(combination, 450));
  };
  if (document.readyState === 'complete') start(); else addEventListener('load', start);

  /* drag the ring; it springs back onto the mark */
  let drag: { a0: number; d0: number } | null = null;
  const ang = (e: PointerEvent) => { const r = media!.getBoundingClientRect(); return Math.atan2(e.clientY - r.top - PY, (e.clientX - r.left - PX) / K) * 180 / Math.PI; };
  const down = (e: PointerEvent) => { if (!media!.classList.contains('is-ready')) return; cancelAnimationFrame(tw); drag = { a0: ang(e), d0: angle }; grab.setPointerCapture(e.pointerId); unset(); };
  const move = (e: PointerEvent) => { if (!drag) return; let d = ang(e) - drag.a0; if (d > 180) d -= 360; if (d < -180) d += 360; angle = drag.d0 + d; drag.a0 = ang(e); drag.d0 = angle; render(); };
  const release = async () => { if (!drag) return; drag = null; const turns = Math.round((angle - TARGET) / 360); await tween(TARGET + turns * 360, 950, back); if (!alive) return; angle = TARGET; render(); settle(); };
  grab.addEventListener('pointerdown', down); grab.addEventListener('pointermove', move);
  grab.addEventListener('pointerup', release); grab.addEventListener('pointercancel', release);

  return () => {
    alive = false;
    cancelAnimationFrame(tw);
    timers.forEach(clearTimeout);
    removeEventListener('resize', fit); removeEventListener('load', start);
    ro?.disconnect();
    grab.removeEventListener('pointerdown', down); grab.removeEventListener('pointermove', move);
    grab.removeEventListener('pointerup', release); grab.removeEventListener('pointercancel', release);
    fx.forEach((a) => a.cancel());
    intro?.cancel();
    hero.classList.remove('is-in'); media!.classList.remove('is-ready');
  };
}
