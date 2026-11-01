'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { href } from '@/lib/i18n';
import Icon from '../Icon';
import { useSite } from './SiteProvider';

/** Same page in the other language */
const switchPath = (path: string, toEn: boolean) => {
  const bare = path.replace(/^\/en(?=\/|$)/, '') || '/';
  return toEn ? href('en', bare) : bare;
};

export default function Header() {
  const { lang, t, list, bump } = useSite();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  const n = list.reduce((a, i) => a + i.qty, 0);

  useEffect(() => {
    if (bump) countRef.current?.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'cubic-bezier(.34,1.56,.64,1)' });
  }, [bump]);
  useEffect(() => setOpen(false), [path]);

  const bare = path.replace(/^\/en(?=\/|$)/, '') || '/';
  const active = bare === '/' ? '/' : bare.startsWith('/product') ? '/shop' : bare;
  const links: [string, string][] = [['/', t.nav.home], ['/shop', t.nav.shop], ['/about', t.nav.about], ['/contact', t.nav.contact]];

  return (
    <header className="header">
      <div className="container header__in">
        <Link className="logo" href={href(lang)} aria-label={t.homeLabel}>
          <img src="/assets/logo/alabed-logo-white.webp" alt="ALABED Digital Lock" width="130" height="51" />
        </Link>
        <nav className={`nav${open ? ' is-open' : ''}`} id="nav" aria-label={t.nav.label} onClick={(e) => { if ((e.target as Element).closest('a') && open) setOpen(false); }}>
          <ul className="nav__list">
            {links.map(([p, label]) => (
              <li key={p}><Link className="nav__link" href={href(lang, p)} aria-current={active === p ? 'page' : undefined}>{label}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="header__tools">
          <button className="tool" type="button" aria-label={t.search} data-open="search"><Icon id="search" hidden={false} /></button>{' '}
          <button className="tool" type="button" aria-label={t.quoteList} data-open="quote-list">
            <Icon id="list" hidden={false} />
            <span className="tool__count" data-quote-count hidden={n === 0} ref={countRef}>{n}</span>
          </button>{' '}
          {lang === 'ar' ? (
            <a className="lang" href={switchPath(path, true)} lang="en" hrefLang="en">EN</a>
          ) : (
            <a className="lang lang--ar" href={switchPath(path, false)} lang="ar" hrefLang="ar">العربية</a>
          )}{' '}
          <a className="btn btn--primary header__cta" href="#quote" data-open="quote">{t.requestQuote}</a>{' '}
          <button className="tool burger" type="button" aria-controls="nav" aria-expanded={open} aria-label={open ? t.closeMenu : t.openMenu} data-burger onClick={() => setOpen(!open)}>
            <Icon id={open ? 'close' : 'menu'} hidden={false} />
          </button>
        </div>
      </div>
    </header>
  );
}
