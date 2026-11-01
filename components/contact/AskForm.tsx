'use client';

import { useRef, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { MAIL, waLink } from '@/lib/catalog';
import type { Lang } from '@/lib/i18n';
import { useSiteStatic } from '../site/SiteProvider';

const T = {
  ar: { title: 'سؤال سريع', name: 'الاسم', phone: 'رقم الموبايل', topic: 'الموضوع', subject: 'سؤال سريع: ', ready: 'تم تجهيز رسالتك، اضغط إرسال لإتمامها' },
  en: { title: 'Quick question', name: 'Name', phone: 'Mobile', topic: 'Topic', subject: 'Quick question: ', ready: 'Your message is ready, press send to finish' },
};

/** "Quick question" form: validates, then opens WhatsApp or email with the message written. */
export default function AskForm({ lang, style, children }: { lang: Lang; style?: CSSProperties; children: ReactNode }) {
  const { say } = useSiteStatic();
  const form = useRef<HTMLFormElement>(null);
  const t = T[lang];

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = form.current!;
    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value || 'wa';
    let ok = true;
    f.querySelectorAll<HTMLInputElement>('[required]').forEach((el) => {
      const bad = !el.checkValidity() || (el.minLength > 0 && el.value.trim().length < el.minLength);
      el.closest('.field')!.classList.toggle('is-invalid', bad); if (bad) ok = false;
    });
    if (!ok) { f.querySelector<HTMLElement>('.is-invalid .input, .is-invalid .select, .is-invalid .textarea')?.focus(); return; }
    const v = (id: string) => f.querySelector<HTMLInputElement>('#' + id)!.value.trim();
    const text = `${t.title}\n${t.name}: ${v('ct-name')}\n${t.phone}: ${v('ct-phone')}\n${t.topic}: ${v('ct-topic')}\n\n${v('ct-msg')}`;
    if (via === 'wa') window.open(waLink(text), '_blank', 'noopener');
    else location.href = `mailto:${MAIL}?subject=${encodeURIComponent(t.subject + v('ct-topic'))}&body=${encodeURIComponent(text)}`;
    say(t.ready);
  };
  const onInput = (e: FormEvent<HTMLFormElement>) => {
    const el = e.target as HTMLInputElement, field = el.closest('.field');
    if (field && el.checkValidity()) field.classList.remove('is-invalid');
  };

  return (
    <form className="ask" data-ask noValidate data-reveal style={style} ref={form} onSubmit={onSubmit} onInput={onInput}>
      {children}
    </form>
  );
}
