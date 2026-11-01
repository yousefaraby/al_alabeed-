'use client';

import { animate, inView } from 'motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { SMOOTH, noneToIdentity } from '@/lib/motion';

/** Fades [data-reveal] elements up as they scroll into view (also picks up elements rendered later). */
export default function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const seen = new WeakSet<Element>();
    const stops: VoidFunction[] = [];
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const watch = (el: HTMLElement) => {
      if (seen.has(el) || el.classList.contains('is-in')) return;
      seen.add(el);
      stops.push(inView(el, () => {
        const d = parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0;
        if (reduced) { el.classList.add('is-in'); return; }
        animate(el, { opacity: [0, 1], transform: noneToIdentity(['translateY(28px)', 'none']) }, { duration: 1, delay: d * 0.07, ease: SMOOTH })
          .then(() => { el.classList.add('is-in'); el.style.opacity = ''; el.style.transform = ''; el.style.filter = ''; }); // .is-in keeps it shown; hover styles apply again
      }, { margin: '0px 0px -8% 0px' }));
    };
    const scan = () => document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(watch);
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { mo.disconnect(); stops.forEach((s) => s()); };
  }, [path]);
  return null;
}
