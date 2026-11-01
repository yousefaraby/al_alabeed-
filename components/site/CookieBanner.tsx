'use client';

import { useEffect, useRef, useState } from 'react';
import { play } from '@/lib/motion';
import { store, useSite } from './SiteProvider';

/** Cookie notice, first visit only */
export default function CookieBanner() {
  const { t } = useSite();
  const c = t.cookie;
  const ref = useRef<HTMLElement>(null);
  const analytics = useRef<HTMLInputElement>(null);
  const [shown, setShown] = useState(false);
  const [prefs, setPrefs] = useState(false);

  useEffect(() => {
    if (store.get('alabed-cookies', null)) return;
    const id = setTimeout(() => setShown(true), 900);
    return () => clearTimeout(id);
  }, []);
  useEffect(() => {
    if (shown && ref.current) play(ref.current, [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }], { duration: 500, easing: 'cubic-bezier(.2,.8,.2,1)' });
  }, [shown]);
  // keep the floating chat button above the banner on phones
  useEffect(() => {
    const sync = () => document.documentElement.style.setProperty('--ck-h', shown && ref.current && innerWidth <= 720 ? `${ref.current.offsetHeight + 12}px` : '0px');
    sync();
    addEventListener('resize', sync);
    return () => removeEventListener('resize', sync);
  }, [shown, prefs]);

  const done = (v: { analytics: boolean; at: number }) => {
    store.set('alabed-cookies', v);
    if (ref.current) play(ref.current, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(16px)' }], { duration: 300, easing: 'ease-in', fill: 'forwards' }).onfinish = () => setShown(false);
    else setShown(false);
  };

  return (
    <section className="cookie" data-cookie aria-labelledby="ck-title" hidden={!shown} ref={ref}>
      <h2 id="ck-title">{c.title}</h2>
      <p>{c.text}<br /><a href="#">{c.more}</a></p>
      <div className="cookie__prefs" data-cookie-prefs hidden={!prefs}>
        <label className="switch"><span>{c.essential}</span><input type="checkbox" defaultChecked disabled /></label>{' '}
        <label className="switch"><span>{c.analytics}</span><input type="checkbox" data-ck-analytics ref={analytics} /></label>
      </div>
      <div className="cookie__btns">
        <button className="btn btn--primary" type="button" data-cookie-accept onClick={() => done({ analytics: prefs ? !!analytics.current?.checked : true, at: Date.now() })}>{prefs ? c.save : c.acceptAll}</button>
        <button className="btn btn--ghost" type="button" data-cookie-essential onClick={() => done({ analytics: false, at: Date.now() })}>{c.essentialOnly}</button>
        <button className="btn btn--ghost" type="button" data-cookie-customize onClick={() => setPrefs(!prefs)}>{prefs ? c.hide : c.customize}</button>
      </div>
    </section>
  );
}
