'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import type { Lang } from '@/lib/i18n';

const T = {
  ar: { dialing: 'جاري الاتصال', ready: 'فريق العابد في انتظار مكالمتك', typed: 'اضغط اتصال للمتابعة', hint: 'اكتب الرقم أو اضغط اتصال' },
  en: { dialing: 'Calling', ready: 'The Alabed team is waiting for your call', typed: 'Press call to continue', hint: 'Type a number or press call' },
};

/** Contact hero: the keypad types the company number by itself, and visitors can dial on it too. */
export default function KeypadHero({ lang, children }: { lang: Lang; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => runKeypad(ref.current!, T[lang]), [lang]);
  return <section className="ct-hero" aria-labelledby="ct-title" ref={ref}>{children}</section>;
}

/* ---------- ported from the original page script ---------- */
function runKeypad(hero: HTMLElement, t: (typeof T)['ar']) {
  const pad = hero.querySelector<HTMLElement>('.pad')!, num = hero.querySelector<HTMLElement>('[data-pad-num]')!, status = hero.querySelector<HTMLElement>('[data-pad-status]')!;
  const call = hero.querySelector<HTMLAnchorElement>('[data-pad-call]')!, keys = [...hero.querySelectorAll<HTMLButtonElement>('[data-k]')];
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NUMBER = '0102 045 0649'; // shown on the keypad (same line as the site's phone)
  let typed = '', busy = false, timers: ReturnType<typeof setTimeout>[] = [];
  const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));
  const show = (v: string, caret = true) => { num.innerHTML = (v ? v.replace(/&/g, '&amp;').replace(/</g, '&lt;') : '') + (caret ? '<span class="caret"></span>' : '') || '&nbsp;'; };
  const press = (k: string) => { const b = keys.find((x) => x.dataset.k === k); if (!b) return; b.classList.add('is-press'); setTimeout(() => b.classList.remove('is-press'), 170); };
  const fmt = (d: string) => d.replace(/^(\d{4})(\d{0,3})(\d{0,4}).*/, (m, a, b, c) => [a, b, c].filter(Boolean).join(' '));

  function intro() {
    if (REDUCED) { show(NUMBER, false); status.textContent = t.ready; return; }
    busy = true; pad.classList.add('is-typing');
    const digits = NUMBER.replace(/\s/g, ''); let ms = 900, shown = '';
    status.textContent = '';
    [...digits].forEach((d, i) => {
      ms += 120 + Math.round(Math.random() * 90) + (i === 4 || i === 7 ? 140 : 0); // human rhythm, small pause between groups
      later(() => { press(d); shown += d; show(fmt(shown)); }, ms);
    });
    later(() => { pad.classList.remove('is-typing'); pad.classList.add('is-calling'); show(NUMBER, false); status.innerHTML = `<b>${t.dialing}…</b>`; }, ms + 450);
    later(() => { pad.classList.remove('is-calling'); status.textContent = t.ready; busy = false; }, ms + 2600);
  }
  // visitors can type on it too
  const onKey = (e: Event) => {
    const b = e.currentTarget as HTMLButtonElement;
    if (busy) { timers.forEach(clearTimeout); timers = []; busy = false; pad.classList.remove('is-typing', 'is-calling'); typed = ''; }
    const k = b.dataset.k!; press(k);
    if (k === '*') typed = ''; else if (k === '#') typed = typed.slice(0, -1); else if (typed.length < 11) typed += k;
    pad.classList.toggle('is-typing', !!typed);
    show(fmt(typed)); status.textContent = typed ? t.typed : t.hint;
    call.href = typed.length >= 3 ? `tel:${typed}` : 'tel:+201020450649';
  };
  const onCall = () => { pad.classList.add('is-calling'); status.innerHTML = `<b>${t.dialing}…</b>`; timers.push(setTimeout(() => pad.classList.remove('is-calling'), 2200)); };
  keys.forEach((b) => b.addEventListener('click', onKey));
  call.addEventListener('click', onCall);
  const start = () => { hero.classList.add('is-in'); intro(); };
  const kick = () => timers.push(setTimeout(start, 80));
  if (document.readyState === 'complete') kick(); else addEventListener('load', kick);

  return () => {
    timers.forEach(clearTimeout);
    removeEventListener('load', kick);
    keys.forEach((b) => b.removeEventListener('click', onKey));
    call.removeEventListener('click', onCall);
    hero.classList.remove('is-in'); pad.classList.remove('is-typing', 'is-calling');
    num.innerHTML = ''; status.textContent = '';
  };
}
