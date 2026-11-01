'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { KIND_ICON, KIND_LABEL, M, TYPES, USES, USE_ICONS, USE_LABEL, catalog, norm, type Kind, type Method, type TypeKey, type Use } from '@/lib/catalog';
import type { Lang } from '@/lib/i18n';
import Icon from '../Icon';
import ProductCard from '../ProductCard';
import { useSite } from '../site/SiteProvider';


const T = {
  ar: {
    label: 'المنتجات', quick: 'فلاتر سريعة', all: 'الكل', filters: 'تصفية النتائج', close: 'إغلاق', clearAll: 'مسح الكل',
    types: 'النوع (حسب الكتالوج)', uses: 'حسب المكان', methods: 'طرق الفتح (للأقفال)', clear: 'مسح', show: 'عرض النتائج',
    search: 'ابحث في المنتجات', placeholder: 'ابحث: A21، بصمة، GM8S…', filter: 'تصفية',
    count: (n: number, all: number) => <>عرض <strong>{n}</strong> من {all} منتجًا</>,
    empty: 'لا توجد منتجات بهذه الفلاتر', emptyText: 'جرّب إزالة بعض الفلاتر أو البحث بكلمة أخرى.', emptyBtn: 'مسح الفلاتر',
  },
  en: {
    label: 'Products', quick: 'Quick filters', all: 'All', filters: 'Filter results', close: 'Close', clearAll: 'Clear all',
    types: 'Type (by catalog)', uses: 'By location', methods: 'Unlock methods (locks)', clear: 'Clear', show: 'Show results',
    search: 'Search products', placeholder: 'Search: A21, fingerprint, GM8S…', filter: 'Filter',
    count: (n: number, all: number) => <>Showing <strong>{n}</strong> of {all} products</>,
    empty: 'No products match these filters', emptyText: 'Try removing some filters or searching for something else.', emptyBtn: 'Clear filters',
  },
};
const METHOD_ORDER: Method[] = ['face', 'finger', 'pin', 'card', 'key'];

/** Reports the URL query (?kind=&use=&type=&q=&focus=) on load and on client-side navigation.
    Kept in its own Suspense boundary so the product grid is still pre-rendered in the static export. */
function QueryWatcher({ onChange }: { onChange: (query: string) => void }) {
  const query = useSearchParams().toString();
  useEffect(() => onChange(query), [query, onChange]);
  return null;
}

/** Shop catalogue: quick chips, sidebar filters (a bottom sheet on phones), search, shareable URL. */
export default function ShopCatalog({ lang }: { lang: Lang }) {
  const t = T[lang];
  const { hooks } = useSite();
  const items = catalog(lang);
  const [kind, setKind] = useState('');
  const [uses, setUses] = useState(() => new Set<string>());
  const [types, setTypes] = useState(() => new Set<string>());
  const [methods, setMethods] = useState(() => new Set<string>());
  const [q, setQ] = useState('');
  const [ready, setReady] = useState(false); // the URL query has been read
  const written = useRef<string | null>(null); // last query this component wrote to the URL
  const [sheet, setSheet] = useState(false);
  const grid = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const openBtn = useRef<HTMLButtonElement>(null);

  const hay = useMemo(() => Object.fromEntries(items.map((p) => [p.id, norm([p.title, p.cat, p.badge, p.desc || '', p.id, ...p.m.map((k) => M[k][lang])].join(' '))])), [items, lang]);
  const count = (pred: (p: (typeof items)[number]) => boolean) => items.filter(pred).length;
  const words = norm(q.trim()) ? norm(q.trim()).split(/\s+/) : [];
  const visible = (p: (typeof items)[number]) => (!kind || p.kind === kind)
    && (!uses.size || [...uses].every((u) => p.uses.includes(u as Use)))
    && (!types.size || types.has(p.type))
    && (!methods.size || [...methods].every((m) => p.m.includes(m as Method)))
    && words.every((w) => hay[p.id].includes(w));
  const shown = items.filter(visible).length;
  const n = types.size + methods.size + uses.size + (kind ? 1 : 0) + (q ? 1 : 0);
  const side = types.size + methods.size + uses.size;

  const reset = useCallback(() => { setKind(''); setUses(new Set()); setTypes(new Set()); setMethods(new Set()); setQ(''); }, []);

  // keep the URL shareable (only once the incoming query has been applied, so it isn't wiped on load)
  useEffect(() => {
    if (!ready) return;
    const u = new URLSearchParams();
    if (kind) u.set('kind', kind); uses.forEach((x) => u.append('use', x)); types.forEach((x) => u.append('type', x)); if (q) u.set('q', q);
    written.current = u.toString();
    try { history.replaceState(history.state, '', (u.toString() ? `?${u}` : location.pathname) + location.hash); } catch {}
  }, [ready, kind, uses, types, q]);

  // used by search: make sure the product is visible, then let search scroll to it
  const visibleRef = useRef(visible);
  visibleRef.current = visible;
  useEffect(() => {
    hooks.showProduct = (id) => { const p = items.find((x) => x.id === id); if (p && !visibleRef.current(p)) reset(); };
    return () => { hooks.showProduct = undefined; };
  }, [hooks, items, reset]);

  // arriving (or navigating within the site) with ?focus=<id> or with filters in the URL
  const applyQuery = useCallback((query: string) => {
    if (query === written.current) return; // our own replaceState echoing back
    const sp = new URLSearchParams(query), focus = sp.get('focus');
    setReady(true);
    if (focus && items.some((p) => p.id === focus)) {
      reset();
      setTimeout(() => {
        const card = grid.current?.querySelector<HTMLElement>(`.pcard[data-id="${focus}"]`); if (!card) return;
        card.classList.add('is-in'); card.scrollIntoView({ behavior: 'smooth', block: 'center' }); card.classList.add('is-flash');
      }, 400);
      return;
    }
    setKind(sp.get('kind') || ''); setUses(new Set(sp.getAll('use'))); setTypes(new Set(sp.getAll('type'))); setMethods(new Set()); setQ(sp.get('q') || '');
    if (['kind', 'use', 'type', 'q'].some((k) => sp.has(k))) setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), 300);
  }, [items, reset]);

  // the hero button ("browse smart locks") picks the locks chip
  useEffect(() => {
    const onClick = (e: MouseEvent) => { if ((e.target as Element).closest('[data-kind-link]')) setKind('lock'); };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // mobile filter sheet
  const first = useRef(true);
  useEffect(() => {
    document.body.classList.toggle('is-locked', sheet);
    if (first.current) { first.current = false; return; }
    if (sheet) sheetRef.current?.querySelector('input')?.focus({ preventScroll: true }); else openBtn.current?.focus({ preventScroll: true });
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSheet(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [sheet]);

  const toggleIn = (set: Set<string>, setter: (s: Set<string>) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    const next = new Set(set); if (e.target.checked) next.add(e.target.value); else next.delete(e.target.value); setter(next);
  };

  const typeKeys = (Object.keys(TYPES) as TypeKey[]).filter((k) => count((p) => p.type === k));
  const useKeys = (Object.keys(USES) as Use[]).filter((u) => count((p) => p.uses.includes(u)));
  const methodKeys = METHOD_ORDER.filter((m) => count((p) => p.kind === 'lock' && p.m.includes(m)));

  return (
    <>
      <Suspense fallback={null}><QueryWatcher onChange={applyQuery} /></Suspense>
      <section className="shop" id="catalog" aria-label={t.label}>
        <div className="container">
          <div className="chipbar" role="group" aria-label={t.quick} data-chipbar>
            <button className="fchip" type="button" data-kind="" aria-pressed={kind === ''} onClick={() => setKind('')}>{t.all}</button>
            {(Object.keys(KIND_LABEL) as Kind[]).map((k) => (
              <button className="fchip" type="button" data-kind={k} aria-pressed={kind === k} onClick={() => setKind(k)} key={k}>
                <Icon id={KIND_ICON[k]} /><span>{KIND_LABEL[k][lang]}</span><span className="fchip__n">{count((p) => p.kind === k)}</span>
              </button>
            ))}
          </div>
          <div className="shop__layout">
            <aside className={`filters${sheet ? ' is-open' : ''}`} id="filters" aria-label={t.filters} data-filters ref={sheetRef}>
              <div className="filters__sheet-head">
                <h2>{t.filters}</h2>
                <button className="x-btn" type="button" data-filters-close aria-label={t.close} onClick={() => setSheet(false)}><Icon id="close" hidden={false} /></button>
              </div>
              <div className="filters__body">
                <div className="filters__head"><h2>{t.filters}</h2><button className="filters__reset" type="button" data-reset hidden={!n} onClick={reset}>{t.clearAll}</button></div>
                <fieldset className="fgroup"><legend>{t.types}</legend><div data-types>
                  {typeKeys.map((k) => (
                    <label className="fopt" key={k}><input type="checkbox" value={k} data-type checked={types.has(k)} onChange={toggleIn(types, setTypes)} /><span>{TYPES[k][lang]}</span><span className="fopt__n">{count((p) => p.type === k)}</span></label>
                  ))}
                </div></fieldset>
                <fieldset className="fgroup"><legend>{t.uses}</legend><div data-uses>
                  {useKeys.map((u) => (
                    <label className="fopt" key={u}><input type="checkbox" value={u} data-use checked={uses.has(u)} onChange={toggleIn(uses, setUses)} /><span className="fopt__ic"><Icon id={USE_ICONS[u]} /></span><span>{USE_LABEL[u][lang]}</span><span className="fopt__n">{count((p) => p.uses.includes(u))}</span></label>
                  ))}
                </div></fieldset>
                <fieldset className="fgroup"><legend>{t.methods}</legend><div data-methods>
                  {methodKeys.map((m) => (
                    <label className="fopt" key={m}><input type="checkbox" value={m} data-method checked={methods.has(m)} onChange={toggleIn(methods, setMethods)} /><span>{M[m][lang]}</span><span className="fopt__n">{count((p) => p.kind === 'lock' && p.m.includes(m))}</span></label>
                  ))}
                </div></fieldset>
              </div>
              <div className="filters__foot">
                <button className="btn btn--ghost" type="button" data-reset onClick={reset}>{t.clear}</button>
                <button className="btn btn--primary" type="button" data-filters-close data-apply onClick={() => { setSheet(false); document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.show}</button>
              </div>
            </aside>
            <div className="shop__top">
              <label className="shop__search">
                <span className="sr-only">{t.search}</span>
                <input type="search" placeholder={t.placeholder} data-shop-q autoComplete="off" value={q} onChange={(e) => setQ(e.target.value)} />
              </label>{' '}
              <button className="filters-btn" type="button" aria-controls="filters" aria-expanded={sheet} data-filters-open ref={openBtn} onClick={() => setSheet(true)}>
                <Icon id="sliders" hidden={false} />
                {t.filter}
                <span className="filters-btn__n" data-active-n hidden={!side}>{side}</span>
              </button>
              <p className="shop__count" aria-live="polite" data-count>{t.count(shown, items.length)}</p>
            </div>
            <div className="shop__grid" id="models" data-grid ref={grid}>
              {items.map((p, i) => <ProductCard p={p} lang={lang} variant="shop" index={i} hidden={!visible(p)} key={p.id} />)}
              <div className="shop__empty" data-empty hidden={shown > 0}>
                <h3>{t.empty}</h3>
                <p>{t.emptyText}</p>
                <button className="btn btn--primary" type="button" data-reset onClick={reset}>{t.emptyBtn}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={`filters-backdrop${sheet ? ' is-on' : ''}`} data-filters-close onClick={() => setSheet(false)} />
    </>
  );
}
