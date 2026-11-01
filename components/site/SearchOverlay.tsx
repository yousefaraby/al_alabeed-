'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { M, catalog, imgSrc, norm } from '@/lib/catalog';
import { href } from '@/lib/i18n';
import { useOpenMotion } from '@/lib/useOpenMotion';
import Icon from '../Icon';
import { useSite } from './SiteProvider';

export default function SearchOverlay() {
  const { lang, t, isOpen, closeOv, hooks } = useSite();
  const s = t.searchUi;
  const open = isOpen('search');
  const router = useRouter();
  const path = usePathname();
  const input = useRef<HTMLInputElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useOpenMotion(root, open, { backdrop: '.backdrop', panel: '.search-panel', opened: { transform: 'none' }, closed: { transform: 'translateY(-100%)' } });
  const [value, setValue] = useState('');
  const index = useMemo(() => catalog(lang).map((p) => ({
    p, text: norm([p.title, p.cat, p.badge, p.desc || '', p.id, ...p.m.map((k) => M[k][lang]), s.hotelHint(p.cat)].join(' ')),
  })), [lang, s]);

  useEffect(() => { if (open) setTimeout(() => input.current?.select(), 70); }, [open]);

  const q = norm(value.trim());
  const hits = q ? index.filter((x) => q.split(/\s+/).every((w) => x.text.includes(w))).slice(0, 6) : [];
  const mark = (txt: string): ReactNode => {
    const i = norm(txt).indexOf(q);
    return i < 0 ? txt : <>{txt.slice(0, i)}<mark>{txt.slice(i, i + q.length)}</mark>{txt.slice(i + q.length)}</>;
  };
  // the home, about and contact pages send results to the shop; the catalogue pages open the product
  const bare = path.replace(/^\/en(?=\/|$)/, '') || '/';
  const toShop = ['/', '/about', '/contact'].includes(bare);
  const linkFor = (id: string) => (toShop ? href(lang, `/shop?focus=${id}`) : href(lang, `/product/${id}`));

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeOv('search');
    const btn = document.querySelector(`.pcard [data-add="${id}"]`);
    if (!btn) { router.push(e.currentTarget.getAttribute('href')!); return; }
    // the product is on this page: bring it into view and flash it
    hooks.showProduct?.(id);
    setTimeout(() => {
      const card = document.querySelector(`.pcard [data-add="${id}"]`)?.closest<HTMLElement>('.pcard');
      if (!card) return;
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.remove('is-flash'); void card.offsetWidth; card.classList.add('is-flash');
    }, 250);
  };

  return (
    <div className={`search-overlay${open ? ' is-open' : ''}`} id="search" aria-hidden={!open} ref={root}>
      <div className="backdrop" data-close />
      <div className="search-panel" role="dialog" aria-modal="true" aria-label={t.search}>
        <div className="search-wrap">
          <div className="search-top">
            <span>{s.top}</span>
            <button className="x-btn" type="button" data-close aria-label={s.close}><Icon id="close" hidden={false} /></button>
          </div>
          <form className="search-bar" role="search" data-search-form onSubmit={(e) => { e.preventDefault(); e.currentTarget.parentElement?.querySelector<HTMLAnchorElement>('.search-results a')?.click(); }}>
            <label htmlFor="search-input" className="sr-only">{s.label}</label>
            <Icon id="search" />
            <input id="search-input" ref={input} type="search" autoComplete="off" placeholder={s.placeholder} data-search-input value={value} onChange={(e) => setValue(e.target.value)} />
          </form>
          <div className="search-results" data-search-results aria-live="polite">
            {q && (hits.length ? hits.map(({ p }) => (
              <a href={linkFor(p.id)} data-goto={p.id} key={p.id} onClick={(e) => go(e, p.id)}>
                <img src={imgSrc(p)} alt="" />
                <span><strong>{mark(p.title)}</strong><small>{p.cat}</small></span>
                <Icon id="arrow" className="ic go" />
              </a>
            )) : <p className="search-empty">{s.empty(value.trim())}</p>)}
          </div>
          <div className="search-suggest">
            <h3>{s.popular}</h3>
            <div className="chips">
              {s.terms.map(([term, label]) => (
                <button className={`chip${norm(term) === q ? ' is-active' : ''}`} type="button" data-term={term} key={term} onClick={() => { setValue(term); input.current?.focus(); }}>{label}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
