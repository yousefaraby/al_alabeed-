'use client';

import { isFlying } from '@/lib/flyToQuote';
import { play } from '@/lib/motion';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { href } from '@/lib/i18n';
import { useOpenMotion } from '@/lib/useOpenMotion';
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
    // when a photo is flying in, the count pops as it lands instead
    if (bump && !isFlying()) countRef.current && play(countRef.current, [{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'cubic-bezier(.34,1.56,.64,1)' });
  }, [bump]);
  useEffect(() => setOpen(false), [path]);
  // on phones/tablets the menu drops down below the header
  const navRef = useRef<HTMLElement>(null);
  useOpenMotion(navRef, open, { opened: { opacity: 1, transform: 'none' }, closed: { opacity: 0, transform: 'translateY(-8px)' }, duration: 0.25, when: () => matchMedia('(max-width: 960px)').matches });

  const bare = path.replace(/^\/en(?=\/|$)/, '') || '/';
  const active = bare === '/' ? '/' : bare.startsWith('/product') ? '/shop' : bare;
  const links: [string, string][] = [['/', t.nav.home], ['/shop', t.nav.shop], ['/about', t.nav.about], ['/contact', t.nav.contact]];

  return (
    <header className="header">
      <div className="container header__in">
        <Link className="logo" href={href(lang)} aria-label={t.homeLabel}>
          <img src="/assets/logo/alabed-logo-white.webp" alt="ALABED Digital Lock" width="130" height="51" />
        </Link>
        <nav ref={navRef} className={`nav${open ? ' is-open' : ''}`} id="nav" aria-label={t.nav.label} onClick={(e) => { if ((e.target as Element).closest('a') && open) setOpen(false); }}>
          <ul className="nav__list">
            {links.map(([p, label]) => (
              <li key={p}><Link className="nav__link" href={href(lang, p)} aria-current={active === p ? 'page' : undefined}>
                {label}
                {active === p && <motion.span layoutId="nav-underline" className="nav__underline" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />}
              </Link></li>
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
