'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { byId } from '@/lib/catalog';
import { dict, type Dict, type Lang } from '@/lib/i18n';

export interface QuoteItem { id: string; qty: number }
interface ToastState { msg: string; action?: { label: string; fn: () => void }; key: number }

interface Site {
  lang: Lang;
  t: Dict;
  list: QuoteItem[];
  toggleItem: (id: string) => void;
  setQty: (id: string, delta: number) => void;
  bump: number;
  openOv: (id: string, opener?: Element | null) => void;
  closeOv: (id: string) => void;
  isOpen: (id: string) => boolean;
  say: (msg: string, action?: ToastState['action']) => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  /** components register behaviour that the delegated [data-open] handler needs */
  hooks: { resetQuote?: (type?: string) => void; showProduct?: (id: string) => void };
}

const Ctx = createContext<Site | null>(null);
export const useSite = () => {
  const s = useContext(Ctx);
  if (!s) throw new Error('useSite outside SiteProvider');
  return s;
};

export const store = {
  get<T>(k: string, d: T): T { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k: string, v: unknown) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
const HOSTS = '.drawer, .overlay, .search-overlay';
const visible = (el: Element) => (el as HTMLElement).offsetParent !== null;

export default function SiteProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const t = dict[lang];
  const [list, setList] = useState<QuoteItem[]>([]);
  const [bump, setBump] = useState(0);
  const [stack, setStack] = useState<string[]>([]);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [toastOn, setToastOn] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const openers = useRef(new Map<string, Element | null>());
  const stackRef = useRef<string[]>([]);
  const hooks = useRef<Site['hooks']>({}).current;

  /* ---------- Quote list (like a cart), persisted on this device ---------- */
  useEffect(() => {
    setList(store.get<QuoteItem[]>('alabed-quote-list', []).filter((i) => byId(lang, i.id)));
    setReady(true);
  }, [lang]);
  useEffect(() => { if (ready) store.set('alabed-quote-list', list); }, [list, ready]);

  /* ---------- Toast ---------- */
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const say = useCallback<Site['say']>((msg, action) => {
    setToast({ msg, action, key: Date.now() });
    setToastOn(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastOn(false), action ? 4200 : 2400);
  }, []);

  /* ---------- Overlays: modal / drawer / search ---------- */
  const openOv = useCallback((id: string, opener?: Element | null) => {
    if (stackRef.current.includes(id)) return;
    openers.current.set(id, opener ?? document.activeElement);
    stackRef.current = [...stackRef.current, id];
    setStack(stackRef.current);
    setChatOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      const dialog = el?.querySelector('[role="dialog"]');
      const f = el?.querySelector<HTMLElement>('[data-autofocus]') || [...(dialog?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])].find(visible);
      f?.focus({ preventScroll: true });
    }, 60);
  }, []);
  const closeOv = useCallback((id: string) => {
    if (!stackRef.current.includes(id)) return;
    stackRef.current = stackRef.current.filter((x) => x !== id);
    setStack(stackRef.current);
    const o = openers.current.get(id) as HTMLElement | null | undefined;
    o?.focus?.({ preventScroll: true });
  }, []);
  const isOpen = useCallback((id: string) => stack.includes(id), [stack]);

  useEffect(() => { document.body.classList.toggle('is-locked', stack.length > 0); }, [stack]);
  // client-side navigation: start the next page with everything closed
  const path = usePathname();
  useEffect(() => { stackRef.current = []; setStack([]); setChatOpen(false); }, [path]);

  // Static (server-rendered) markup opens overlays with data-open="…" and closes them with data-close.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const o = target.closest<HTMLElement>('[data-open]');
      if (o) {
        e.preventDefault();
        const host = o.closest(HOSTS);
        if (host) closeOv(host.id);
        if (o.dataset.open === 'quote') hooks.resetQuote?.(o.dataset.type);
        openOv(o.dataset.open!, o);
        return;
      }
      const c = target.closest('[data-close]');
      if (c) { const host = c.closest(HOSTS); if (host) closeOv(host.id); }
    };
    const onKey = (e: KeyboardEvent) => {
      const top = stackRef.current[stackRef.current.length - 1];
      if (e.key === 'Escape') { if (top) closeOv(top); else setChatOpen((open) => { if (open) document.querySelector<HTMLElement>('[data-chat-toggle]')?.focus(); return false; }); return; }
      if (e.key === 'Tab' && top) {
        const dialog = document.getElementById(top)?.querySelector('[role="dialog"]');
        const f = [...(dialog?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])].filter(visible);
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey); };
  }, [openOv, closeOv, hooks]);

  const toggleItem = useCallback((id: string) => {
    const idx = list.findIndex((i) => i.id === id);
    if (idx > -1) {
      const old = list[idx];
      setList(list.filter((_, k) => k !== idx));
      say(t.removed, { label: t.undo, fn: () => setList((now) => (now.some((i) => i.id === id) ? now : [...now.slice(0, idx), old, ...now.slice(idx)])) });
    } else {
      setList([...list, { id, qty: 1 }]);
      say(t.added, { label: t.viewList, fn: () => openOv('quote-list') });
      setBump((b) => b + 1);
    }
  }, [list, say, t, openOv]);
  const setQty = useCallback((id: string, delta: number) => {
    setList((cur) => cur.map((i) => (i.id === id ? { ...i, qty: Math.min(999, Math.max(1, i.qty + delta)) } : i)));
  }, []);

  const value = useMemo<Site>(() => ({
    lang, t, list, toggleItem, setQty, bump, openOv, closeOv, isOpen, say, chatOpen, setChatOpen, hooks,
  }), [lang, t, list, toggleItem, setQty, bump, openOv, closeOv, isOpen, say, chatOpen, hooks]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className={`toast${toastOn ? ' is-on' : ''}`} role="status" aria-live="polite" data-toast>
        {toast && (
          <>
            <span>{toast.msg}</span>
            {toast.action && (
              <button type="button" onClick={() => { toast.action!.fn(); setToastOn(false); }}>{toast.action.label}</button>
            )}
          </>
        )}
      </div>
    </Ctx.Provider>
  );
}
