'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import type { Lang } from '@/lib/i18n';

/** Shop hero: a key card taps the hotel lock, the LED turns green and the room light spills out. */
export default function ShopHero({ lang, children }: { lang: Lang; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => runCardTap(ref.current!, lang === 'ar' ? 1 : -1), [lang]);
  return <section className="shop-hero" aria-labelledby="shop-title" ref={ref}>{children}</section>;
}

/* ---------- ported from the original page script; side = which way the card travels ---------- */
function runCardTap(hero: HTMLElement, SIDE: 1 | -1) {
  const root = hero.querySelector<HTMLElement>('[data-shoplock]'); if (!root) return;
  const $ = (k: string) => root.querySelector<SVGElement>(`[data-sl="${k}"]`)!;
  const photo = $('photo'), card = $('card'), waves = [...$('waves').children] as SVGElement[], led = $('led'), ledbar = $('ledbar'), spill = $('spill'), edge = $('edge'), lever = $('lever');
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EXPO = 'cubic-bezier(.16,1,.3,1)', IN = 'cubic-bezier(.55,0,1,.45)';
  const ROT = -SIDE;
  const copy = [...hero.querySelectorAll('.shop-hero__copy > *')];

  // entrance
  const intro: Animation[] = [];
  if (!REDUCED) {
    intro.push(photo.animate([{ opacity: 0, transform: `translateX(${-SIDE * 40}px) scale(1.04)` }, { opacity: 1, transform: 'none' }], { duration: 1300, easing: EXPO, fill: 'forwards' }));
    copy.forEach((el, i) => intro.push(el.animate([{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'none' }], { duration: 900, delay: 150 + i * 110, easing: EXPO, fill: 'both' })));
  } else { photo.style.opacity = '1'; spill.setAttribute('opacity', '.55'); edge.setAttribute('opacity', '.6'); return; }

  let running: Animation[] = [];
  const A = (el: Element, kf: Keyframe[], o: KeyframeAnimationOptions) => { const a = el.animate(kf, { fill: 'both', easing: EXPO, ...o }); running.push(a); return a; };
  function play() {
    running.forEach((a) => a.cancel()); running = [];
    // 1. card slides in and settles over the reader
    A(card, [{ opacity: 0, transform: `translate(${SIDE * 190}px, 120px) rotate(${ROT * 22}deg)` }, { opacity: 1, transform: `translate(0, -6px) rotate(${-ROT * 4}deg)`, offset: .75 }, { opacity: 1, transform: `translate(0, 0) rotate(${-ROT * 3}deg)` }], { duration: 700 });
    // 2. NFC waves
    waves.forEach((w) => { w.style.transformBox = 'fill-box'; w.style.transformOrigin = 'center'; });
    waves.forEach((w, i) => A(w, [{ opacity: 0, transform: 'scale(1)' }, { opacity: .95, transform: 'scale(1.6)', offset: .25 }, { opacity: 0, transform: 'scale(3.6)' }], { duration: 630, delay: 595 + i * 119, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'none', iterations: 2 }));
    // 3. LED turns green
    A(ledbar, [{ opacity: 0 }, { opacity: 1, offset: .08 }, { opacity: 1, offset: .85 }, { opacity: 0 }], { duration: 2030, delay: 945, easing: 'linear', fill: 'none' });
    A(led, [{ opacity: 0 }, { opacity: 1, offset: .1 }, { opacity: .7, offset: .85 }, { opacity: 0 }], { duration: 2030, delay: 945, easing: 'linear', fill: 'none' });
    // 4. handle presses down, like the door is being opened
    A(lever, [{ transform: 'rotate(0deg)' }, { transform: `rotate(${-SIDE * 18}deg)`, offset: .22 }, { transform: `rotate(${-SIDE * 18}deg)`, offset: .72 }, { transform: 'rotate(0deg)' }], { duration: 1610, delay: 1120, easing: 'cubic-bezier(.45,0,.2,1)', fill: 'none' });
    // 5. warm room light spills out
    A(spill, [{ opacity: 0 }, { opacity: .85, offset: .3 }, { opacity: .55 }], { duration: 1820, delay: 1050, easing: 'ease-out' });
    A(edge, [{ opacity: 0 }, { opacity: 1, offset: .25 }, { opacity: .6 }], { duration: 1680, delay: 1050, easing: 'ease-out' });
    // 6. card leaves, light settles back
    A(card, [{ opacity: 1, transform: `translate(0, 0) rotate(${-ROT * 3}deg)` }, { opacity: 0, transform: `translate(${SIDE * 150}px, 90px) rotate(${ROT * 16}deg)` }], { duration: 455, delay: 2380, easing: IN, fill: 'forwards' });
    A(spill, [{ opacity: .55 }, { opacity: 0 }], { duration: 980, delay: 3640, easing: 'ease-in-out', fill: 'forwards' });
    A(edge, [{ opacity: .6 }, { opacity: 0 }], { duration: 980, delay: 3640, easing: 'ease-in-out', fill: 'forwards' });
  }
  let timer: ReturnType<typeof setInterval> | null = null;
  const start = () => { if (timer) return; play(); timer = setInterval(play, 14600); };
  const stop = () => { if (timer) clearInterval(timer); timer = null; };
  let io: IntersectionObserver | undefined;
  const boot = setTimeout(() => {
    if ('IntersectionObserver' in window) { io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop())); io.observe(hero); }
    else start();
  }, 700);
  const replay = () => { stop(); start(); };
  root.addEventListener('click', replay);

  return () => {
    clearTimeout(boot); stop(); io?.disconnect();
    root.removeEventListener('click', replay);
    running.forEach((a) => a.cancel()); intro.forEach((a) => a.cancel());
  };
}
