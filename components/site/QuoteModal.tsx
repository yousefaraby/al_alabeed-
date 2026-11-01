'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { MAIL, byId, waLink } from '@/lib/catalog';
import { motion } from 'motion/react';
import { play } from '@/lib/motion';
import { useOpenMotion } from '@/lib/useOpenMotion';
import Icon from '../Icon';
import { useSite } from './SiteProvider';

type Row = [string, string];
const STEPS = 4;

/** 4-step quote request + the "ready to send" confirmation */
export default function QuoteModal() {
  const { lang, t, list, isOpen, openOv, closeOv, hooks } = useSite();
  const q = t.quote;
  const form = useRef<HTMLFormElement>(null);
  const [cur, setCur] = useState(0);
  const curRef = useRef(0);
  const [errType, setErrType] = useState(false);
  const [errCat, setErrCat] = useState(false);
  const [invalid, setInvalid] = useState<Set<string>>(new Set());
  const [enabled, setEnabled] = useState<Record<string, boolean>>({});
  const [review, setReview] = useState<Row[]>([]);
  const [done, setDone] = useState({ ref: '', wa: 'https://wa.me/201004610860', mail: `mailto:${MAIL}` });
  const quoteRoot = useRef<HTMLDivElement>(null), okRoot = useRef<HTMLDivElement>(null);
  const modal = { backdrop: '.backdrop', panel: '.modal', opened: { opacity: 1, transform: 'none', filter: 'blur(0px)' }, closed: { opacity: 0, transform: 'translateY(24px) scale(.96)', filter: 'blur(6px)' } };
  const dir = useRef(1); // +1 next step, -1 previous: steps swipe in from that side
  const listRef = useRef(list);
  listRef.current = list;

  const $ = <T extends Element = HTMLInputElement>(s: string) => form.current!.querySelector<T>(s);
  const val = (id: string) => ($<HTMLInputElement>(`#${id}`)?.value ?? '').trim();
  const title = (id: string) => byId(lang, id)?.title ?? id;

  const data = useCallback((): Row[] => {
    const f = form.current!;
    const rows: Row[] = [[q.rows.type, f.querySelector<HTMLInputElement>('input[name="type"]:checked')?.value || '—']];
    f.querySelectorAll<HTMLInputElement>('[data-cat]:checked').forEach((c) => rows.push([c.value, c.closest('.qty-row')!.querySelector<HTMLInputElement>('.qty-input')!.value || '—']));
    if (listRef.current.length) rows.push([q.rows.models, listRef.current.map((x) => `${title(x.id)} × ${x.qty}`).join(q.listSep)]);
    rows.push([q.rows.when, val('q-when')], [q.rows.name, val('q-name')], [q.rows.phone, val('q-phone')]);
    if (val('q-company')) rows.push([q.rows.company, val('q-company')]);
    rows.push([q.rows.city, val('q-city')]);
    if (val('q-notes')) rows.push([q.rows.notes, val('q-notes')]);
    rows.push([q.rows.via, f.querySelector<HTMLInputElement>('input[name="channel"]:checked')!.value === 'wa' ? q.wa : q.mail]);
    return rows;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, lang]);

  const show = useCallback((i: number) => {
    dir.current = i >= curRef.current ? 1 : -1;
    curRef.current = i;
    setCur(i);
    if (i === 3) setReview(data());
    form.current?.closest('.modal')?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [data]);

  const valid = (i: number) => {
    const f = form.current!;
    const step = f.querySelectorAll('[data-step]')[i];
    let ok = true;
    if (i === 0 && !f.querySelector('input[name="type"]:checked')) { setErrType(true); ok = false; }
    if (i === 1) {
      const any = [...f.querySelectorAll<HTMLInputElement>('[data-cat]:checked')].filter((c) => +c.closest('.qty-row')!.querySelector<HTMLInputElement>('.qty-input')!.value > 0);
      if (!any.length && !listRef.current.length) { setErrCat(true); ok = false; }
    }
    const bad = new Set(invalid);
    step.querySelectorAll<HTMLInputElement>('[required]').forEach((el) => { if (el.checkValidity()) bad.delete(el.id); else { bad.add(el.id); ok = false; } });
    setInvalid(bad);
    if (!ok) setTimeout(() => step.querySelector('.is-invalid .input, .is-invalid .select, .error-msg.is-on')?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 0);
    return ok;
  };
  const go = (d: number) => { const c = curRef.current; if (d > 0 && !valid(c)) return; show(Math.max(0, Math.min(STEPS - 1, c + d))); };

  const reset = useCallback((type?: string) => {
    form.current?.reset();
    setInvalid(new Set()); setErrType(false); setErrCat(false); setEnabled({});
    if (type) { const r = form.current?.querySelector<HTMLInputElement>(`input[name="type"][data-key="${type}"]`); if (r) r.checked = true; }
    show(type ? 1 : 0);
  }, [show]);
  useEffect(() => { hooks.resetQuote = reset; }, [hooks, reset]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ref = 'AL-' + Date.now().toString(36).slice(-6).toUpperCase();
    const text = `${q.msgTitle} (${ref})\n` + data().map(([k, v]) => `${k}: ${v}`).join('\n');
    const viaWa = $<HTMLInputElement>('input[name="channel"]:checked')!.value === 'wa';
    const wa = waLink(text), mail = `mailto:${MAIL}?subject=${encodeURIComponent(`${q.msgTitle} ${ref}`)}&body=${encodeURIComponent(text)}`;
    setDone({ ref, wa, mail });
    if (viaWa) window.open(wa, '_blank', 'noopener'); else location.href = mail;
    closeOv('quote'); setTimeout(() => openOv('success'), 200);
  };

  const field = (id: string) => `field${invalid.has(id) ? ' is-invalid' : ''}`;
  const err = (msg: string) => <span className="error-msg"><Icon id="info" hidden={false} />{msg}</span>;
  const req = <>{' '}<span className="req" aria-hidden="true">*</span></>;
  const open = isOpen('quote'), okOpen = isOpen('success');
  useOpenMotion(quoteRoot, open, modal);
  useOpenMotion(okRoot, okOpen, modal);
  // the active step swipes in from the side it is coming from
  useEffect(() => {
    const step = form.current?.querySelectorAll('[data-step]')[cur];
    if (!step || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const from = 14 * dir.current * (lang === 'ar' ? -1 : 1);
    const a = play(step, [{ opacity: 0, transform: `translateX(${from}px)` }, { opacity: 1, transform: 'none' }], { duration: 350, easing: 'cubic-bezier(.16,1,.3,1)' });
    return () => a.cancel();
  }, [cur, lang]);
  // tick draws itself when the confirmation opens
  useEffect(() => {
    const path = okRoot.current?.querySelector('.success-mark path');
    if (!okOpen || !path) return;
    const a = play(path, [{ strokeDashoffset: 30 }, { strokeDashoffset: 0 }], { duration: 500, delay: 250, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
    return () => a.cancel();
  }, [okOpen]);

  return (
    <>
      <div className={`overlay${open ? ' is-open' : ''}`} id="quote" aria-hidden={!open} ref={quoteRoot}>
        <div className="backdrop" data-close />
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="quote-title">
          <div className="modal__head">
            <h2 id="quote-title">{q.title}</h2>
            <button className="x-btn" type="button" data-close aria-label={q.close}><Icon id="close" hidden={false} /></button>
          </div>
          <div className="modal__body">
            <form ref={form} data-quote-form noValidate onSubmit={onSubmit}
              onInput={(e) => { const el = e.target as HTMLInputElement; if (el.closest('.field') && el.checkValidity() && invalid.has(el.id)) setInvalid((s) => { const n = new Set(s); n.delete(el.id); return n; }); }}>
              <div className="progress">
                <div className="progress__bar" role="progressbar" aria-valuemin={1} aria-valuemax={4} aria-valuenow={cur + 1} aria-label={q.progress}>
                  <div className="progress__fill" data-fill style={{ width: `${(cur + 1) * 25}%` }} />
                </div>
                <ol className="progress__steps" data-steps>
                  {q.steps.map((s, k) => (
                    <li key={s} className={[k === cur && 'is-current', k < cur && 'is-done'].filter(Boolean).join(' ') || undefined}><span>{k + 1}</span>{s}</li>
                  ))}
                </ol>
              </div>

              <fieldset className={`form-step${cur === 0 ? ' is-active' : ''}`} data-step>
                <legend>{q.where}</legend>
                <div className="option-cards">
                  {q.types.map(([key, label, sub, icon]) => (
                    <motion.label className="option-card" key={key} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', bounce: 0.4, duration: 0.3 }}>
                      <input type="radio" name="type" value={label} data-key={key} onChange={() => { setErrType(false); setTimeout(() => go(1), 260); }} />
                      <span className="option-card__body"><Icon id={icon} hidden={false} /><strong>{label}</strong><small>{sub}</small></span>
                    </motion.label>
                  ))}
                </div>
                <p className={`error-msg${errType ? ' is-on' : ''}`} data-err="type" style={{ marginTop: '12px' }}><Icon id="info" hidden={false} />{q.typeErr}</p>
              </fieldset>

              <fieldset className={`form-step${cur === 1 ? ' is-active' : ''}`} data-step>
                <legend>{q.what}</legend>
                <p className="form-hint">{q.whatHint}</p>
                <div className="qty-rows">
                  {q.cats.map(([id, value, label, icon, sr]) => (
                    <div className="qty-row" key={id}>
                      <label className="check">
                        <input type="checkbox" name="cat" value={value} data-cat onChange={(e) => {
                          const on = e.target.checked, qty = e.target.closest('.qty-row')!.querySelector<HTMLInputElement>('.qty-input')!;
                          setEnabled((s) => ({ ...s, [id]: on })); setErrCat(false);
                          if (on) { if (!qty.value) qty.value = '1'; setTimeout(() => qty.focus(), 0); }
                        }} />
                        <Icon id={icon} hidden={false} /><span>{label}</span>
                      </label>
                      <label className="sr-only" htmlFor={id}>{sr}</label>
                      <input className="input qty-input" id={id} type="number" min="1" max="5000" inputMode="numeric" placeholder={q.qtyPh} disabled={!enabled[id]} />
                    </div>
                  ))}
                </div>
                <p className={`error-msg${errCat ? ' is-on' : ''}`} data-err="cat" style={{ margin: '-4px 0 14px' }}><Icon id="info" hidden={false} />{q.catErr}</p>
                <div className="picked" data-picked hidden={!list.length}>
                  <strong>{q.picked}</strong>
                  <ul data-picked-list>{list.map((x) => <li key={x.id}>{title(x.id)} × {x.qty}</li>)}</ul>
                </div>
                <div className={field('q-when')}>
                  <label htmlFor="q-when">{q.when}{req}</label>
                  <select className="select" id="q-when" required defaultValue="">
                    <option value="">{q.choose}</option>
                    {q.whenOpts.map((o) => <option key={o}>{o}</option>)}
                  </select>
                  {err(q.chooseErr)}
                </div>
              </fieldset>

              <fieldset className={`form-step${cur === 2 ? ' is-active' : ''}`} data-step>
                <legend>{q.reach}</legend>
                <div className="form-row">
                  <div className={field('q-name')}>
                    <label htmlFor="q-name">{q.name}{req}</label>
                    <input className="input" id="q-name" type="text" required minLength={2} placeholder={q.namePh} autoComplete="name" />
                    {err(q.nameErr)}
                  </div>
                  <div className={field('q-phone')}>
                    <label htmlFor="q-phone">{q.phone}{req}</label>
                    <input className="input" id="q-phone" type="tel" required dir="ltr" inputMode="tel" autoComplete="tel" placeholder="01X XXXX XXXX" pattern="^(\+?20)?0?1[0125][0-9]{8}$" />
                    {err(q.phoneErr)}
                  </div>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="q-company">{q.company}{' '}<span className="opt">{q.optional}</span></label>
                    <input className="input" id="q-company" type="text" autoComplete="organization" />
                  </div>
                  <div className={field('q-city')}>
                    <label htmlFor="q-city">{q.city}{req}</label>
                    <select className="select" id="q-city" required defaultValue="">
                      <option value="">{q.choose}</option>
                      {q.cities.map((o) => <option key={o}>{o}</option>)}
                    </select>
                    {err(q.chooseErr)}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="q-notes">{q.notes}{' '}<span className="opt">{q.optional}</span></label>
                  <textarea className="textarea" id="q-notes" placeholder={q.notesPh} />
                </div>
                <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
                  <legend className="label" style={{ fontSize: '15px', marginBottom: '8px' }}>{q.via}</legend>
                  <div className="chip-radios">
                    <label className="check chip-radio"><input type="radio" name="channel" value="wa" defaultChecked /><Icon id="wa" hidden={false} />{q.wa}</label>
                    <label className="check chip-radio"><input type="radio" name="channel" value="mail" /><Icon id="mail" hidden={false} />{q.mail}</label>
                  </div>
                </fieldset>
              </fieldset>

              <div className={`form-step${cur === 3 ? ' is-active' : ''}`} data-step>
                <h3>{q.review}</h3>
                <dl className="review-list" data-review>
                  {review.map(([k, v], i) => <div key={i}><dt>{k}</dt><dd>{v}</dd></div>)}
                </dl>
                <div className="alert"><Icon id="info" hidden={false} /><p>{q.noServer}</p></div>
              </div>

              <div className="form-nav">
                <button type="button" className="btn btn--ghost" data-prev hidden={cur === 0} onClick={() => go(-1)}>
                  <svg className="ic" style={{ transform: 'scaleX(-1)' }}><use href="#i-arrow" /></svg>{q.prev}
                </button>{' '}
                <button type="button" className="btn btn--primary" data-next hidden={cur === STEPS - 1} onClick={() => go(1)}>{q.next}<Icon id="arrow" hidden={false} /></button>{' '}
                <button type="submit" className="btn btn--primary" data-submit hidden={cur !== STEPS - 1}><Icon id="send" hidden={false} />{q.submit}</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className={`overlay${okOpen ? ' is-open' : ''}`} id="success" aria-hidden={!okOpen} ref={okRoot}>
        <div className="backdrop" data-close />
        <div className="modal modal--center" role="dialog" aria-modal="true" aria-labelledby="sc-title">
          <div className="modal__body">
            <div className="success-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
            </div>
            <h2 id="sc-title" style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px' }}>{t.success.title}</h2>
            <p>{t.success.text}</p>
            <p style={{ fontSize: '13px' }}>{t.success.ref}{' '}<strong data-ref style={{ color: 'var(--navy)' }}>{done.ref}</strong></p>
          </div>
          <div className="modal__foot">
            <a className="btn btn--primary btn--sm" href={done.wa} target="_blank" rel="noopener" data-success-wa><Icon id="wa" hidden={false} />{t.success.wa}</a>
            <a className="btn btn--ghost btn--sm" href={done.mail} data-success-mail><Icon id="mail" hidden={false} />{t.success.mail}</a>
            <button className="btn btn--ghost btn--sm" type="button" data-close>{t.success.done}</button>
          </div>
        </div>
      </div>
    </>
  );
}
