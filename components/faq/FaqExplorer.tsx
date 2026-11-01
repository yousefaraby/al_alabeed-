'use client';

import Link from 'next/link';
import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { norm } from '@/lib/catalog';
import { FAQ } from '@/lib/faq';
import { href, type Lang } from '@/lib/i18n';
import Icon from '../Icon';

const T = {
  ar: {
    crumbs: 'مسار التنقل', home: 'الرئيسية', here: 'الأسئلة الشائعة', title: ['الأسئلة', 'الشائعة'], lead: 'عن الأقفال والخزن والباور سيفر وطريقة الطلب.',
    searchLabel: 'ابحث في الأسئلة', placeholder: 'مثال: بصمة، خزنة، تركيب…', list: 'الأسئلة الشائعة', all: 'الكل', count: (n: number) => `${n} سؤال`,
    empty: 'لا توجد أسئلة تطابق بحثك', emptyText: 'جرّب كلمة أخرى، أو اسألنا مباشرة.', clear: 'امسح البحث', ask: 'اسأل على واتساب',
  },
  en: {
    crumbs: 'Breadcrumb', home: 'Home', here: 'FAQ', title: ['Frequently', 'asked questions'], lead: 'About our locks, safes and power saver, and how ordering works.',
    searchLabel: 'Search the questions', placeholder: 'e.g. fingerprint, safe, warranty…', list: 'FAQ', all: 'All', count: (n: number) => `${n} questions`,
    empty: 'No questions match your search', emptyText: 'Try another word, or ask us directly.', clear: 'Clear search', ask: 'Ask on WhatsApp',
  },
};

/** FAQ page: hero search + category chips + grouped accordions */
export default function FaqExplorer({ lang }: { lang: Lang }) {
  const t = T[lang];
  const groups = FAQ[lang];
  const items = useMemo(() => {
    let n = 0;
    return groups.flatMap((g) => g.items.map(([q, a]) => ({ id: `fq${++n}`, group: g.key, q, a })));
  }, [groups]);
  const [value, setValue] = useState('');
  const [cat, setCat] = useState('');
  const [open, setOpen] = useState<Set<string>>(new Set());
  const input = useRef<HTMLInputElement>(null);

  const w = norm(value.trim());
  const hit = (it: (typeof items)[number]) => (!cat || it.group === cat) && (!w || norm(it.q + ' ' + it.a).includes(w));
  const shown = items.filter(hit).length;

  // answers that match the search open by themselves
  useEffect(() => {
    if (!w) return;
    const add = items.filter((it) => hit(it) && norm(it.a).includes(w)).map((it) => it.id);
    if (add.some((id) => !open.has(id))) setOpen((s) => new Set([...s, ...add]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [w, cat]);

  // deep links: #locks picks a category, ?q= pre-fills the search
  useEffect(() => {
    const start = location.hash.slice(1), pre = new URLSearchParams(location.search).get('q');
    if (pre) setValue(pre);
    if (groups.some((g) => g.key === start)) setCat(start);
    // entrance
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = document.querySelector('.fq-hero')!;
    el.querySelectorAll('.fq-ln > span').forEach((s, i) => s.animate([{ transform: 'translateY(105%)' }, { transform: 'none' }], { duration: 900, delay: 80 + i * 120, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }));
    [el.querySelector('.fq-lead'), el.querySelector('.fq-search')].forEach((x, i) => x?.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 800, delay: 350 + i * 120, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }));
  }, [groups]);

  const pick = (key: string) => {
    setCat(key);
    if (key) history.replaceState(history.state, '', '#' + key); else history.replaceState(history.state, '', location.pathname);
  };
  const toggle = (id: string) => setOpen((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const mark = (txt: string): ReactNode => {
    if (!w) return txt;
    const i = norm(txt).indexOf(w);
    return i < 0 ? txt : <>{txt.slice(0, i)}<mark>{txt.slice(i, i + w.length)}</mark>{txt.slice(i + w.length)}</>;
  };

  return (
    <>
      {/* ================= FAQ hero ================= */}
      <section className="fq-hero" aria-labelledby="fq-title">
        <span className="hero-bar" aria-hidden="true" />
        <div className="container">
          <nav className="fq-crumbs" aria-label={t.crumbs}>
            <Link href={href(lang)}>{t.home}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{t.here}</span>
          </nav>
          <h1 id="fq-title"><span className="fq-ln"><span>{t.title[0]}</span></span>{' '}<span className="fq-ln fq-ln--gold"><span>{t.title[1]}</span></span></h1>
          <p className="fq-lead">{t.lead}</p>
          <form className="fq-search" role="search" data-fq-form onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="fq-q">{t.searchLabel}</label>{' '}
            <Icon id="search" />{' '}
            <input id="fq-q" type="search" placeholder={t.placeholder} autoComplete="off" data-fq-q ref={input} value={value} onChange={(e) => setValue(e.target.value)} />{' '}
            <span className="fq-count" data-fq-count aria-live="polite">{w ? t.count(shown) : ''}</span>
          </form>
        </div>
      </section>
      {/* ================= FAQ list ================= */}
      <section className="section fq" aria-label={t.list}>
        <div className="container">
          <div className="fq-chips" role="group" aria-label={t.list}>
            <button className="fq-chip" type="button" data-fq-cat="" aria-pressed={cat === ''} onClick={() => pick('')}>{t.all}<span>{items.length}</span></button>
            {groups.map((g) => (
              <button className="fq-chip" type="button" data-fq-cat={g.key} aria-pressed={cat === g.key} onClick={() => pick(g.key)} key={g.key}>
                <Icon id={g.icon} />
                {g.title}
                <span>{g.items.length}</span>
              </button>
            ))}
          </div>
          <div className="fq-groups">
            {groups.map((g) => {
              const its = items.filter((it) => it.group === g.key);
              return (
                <section className="fq-group" data-fq-group={g.key} aria-labelledby={`fqg-${g.key}`} hidden={!its.some(hit)} key={g.key}>
                  <h2 id={`fqg-${g.key}`}><span className="fq-group__ic"><Icon id={g.icon} /></span>{g.title}</h2>
                  <div className="acc">
                    {its.map((it) => (
                      <Fragment key={it.id}>
                        <div className="acc__item" data-fq-item hidden={!hit(it)}>
                          <button className="acc__btn" aria-expanded={open.has(it.id)} aria-controls={it.id} id={`${it.id}b`} onClick={() => toggle(it.id)}>
                            <span>{mark(it.q)}</span>
                            <span className="acc__icon"><Icon id="plus" /></span>
                          </button>
                          <div className={`acc__panel${open.has(it.id) ? ' is-open' : ''}`} id={it.id} role="region" aria-labelledby={`${it.id}b`}>
                            <div><p>{mark(it.a)}</p></div>
                          </div>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
          <div className="fq-empty" data-fq-empty hidden={shown > 0}>
            <span className="fq-empty__ic"><Icon id="search" /></span>
            <h2>{t.empty}</h2>
            <p>{t.emptyText}</p>
            <div className="faq__btns">
              <button className="btn btn--navy" type="button" data-fq-clear onClick={() => { setValue(''); pick(''); input.current?.focus(); }}>{t.clear}</button>
              <a className="btn btn--outline" href="https://wa.me/201004610860" target="_blank" rel="noopener">
                <Icon id="wa" hidden={false} />
                {t.ask}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
