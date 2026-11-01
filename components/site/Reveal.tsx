'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Fades [data-reveal] elements in as they scroll into view (also picks up elements rendered later). */
export default function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const all = () => document.querySelectorAll('[data-reveal]:not(.is-in)');
    if (!('IntersectionObserver' in window)) { all().forEach((el) => el.classList.add('is-in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    const scan = () => all().forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [path]);
  return null;
}
