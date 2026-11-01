'use client';

import { useEffect } from 'react';
import type { Lang } from '@/lib/i18n';

const T = {
  ar: { err: 'مرحبًا، ظهر لي خطأ في الموقع: ', back: 'عاد الاتصال، جارٍ التحميل…' },
  en: { err: 'Hello, I got an error on the site: ', back: 'Back online, reloading…' },
};

/** Retry button, error reference code and "back online" reload for the system pages */
export default function SysScript({ lang, title }: { lang: Lang; title?: string }) {
  // the 404 is client-rendered after hydration, which drops the server title
  useEffect(() => { if (title) document.title = title; }, [title]);
  useEffect(() => {
    const t = T[lang];
    const retry = document.querySelector<HTMLButtonElement>('[data-retry]');
    const offline = !!document.querySelector('[data-status]');
    const onRetry = () => {
      if (!offline) { location.reload(); return; }
      location.href = document.referrer && new URL(document.referrer).origin === location.origin ? document.referrer : lang === 'en' ? '/en' : '/';
    };
    retry?.addEventListener('click', onRetry);
    const err = document.querySelector('[data-err]');
    if (err) {
      const code = 'ERR-500-' + Date.now().toString(36).slice(-4).toUpperCase();
      err.textContent = code;
      document.querySelector<HTMLAnchorElement>('[data-err-wa]')!.href = 'https://wa.me/201004610860?text=' + encodeURIComponent(t.err + code + ' (' + location.href + ')');
    }
    const st = document.querySelector('[data-status]');
    const online = () => { if (st) st.textContent = t.back; setTimeout(() => retry?.click(), 900); };
    if (st) addEventListener('online', online);
    return () => { retry?.removeEventListener('click', onRetry); removeEventListener('online', online); };
  }, [lang]);
  return null;
}
