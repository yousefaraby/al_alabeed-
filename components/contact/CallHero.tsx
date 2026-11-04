'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import type { Lang } from '@/lib/i18n';

const T = {
  ar: { label: 'فريق العابد على الخط', alt: 'موبايل يعرض مكالمة جارية مع العابد ديجيتال لوك' },
  en: { label: 'Alabed team on a call', alt: 'Phone showing a call to Alabed Digital Lock' },
};

/** Contact hero: the copy on one side, a photo of a call to Alabed filling the other; both ease in on load. */
export default function CallHero({ lang, children }: { lang: Lang; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const t = T[lang];
  useEffect(() => {
    // two frames so the start state is painted before the entrance transitions run
    let b = 0;
    const a = requestAnimationFrame(() => { b = requestAnimationFrame(() => ref.current?.classList.add('is-in')); });
    return () => { cancelAnimationFrame(a); cancelAnimationFrame(b); };
  }, []);
  return (
    <section className="ct-hero" aria-labelledby="ct-title" ref={ref}>
      {children}
      <figure className="callshot" aria-label={t.label}>
        <div className="callshot__frame">
          <img className="callshot__img" src="/assets/contact-call.webp" width={1775} height={941} alt={t.alt} fetchPriority="high" />
        </div>
      </figure>
    </section>
  );
}
