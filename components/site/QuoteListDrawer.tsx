'use client';

import Link from 'next/link';
import { byId, imgSrc, waLink } from '@/lib/catalog';
import { href } from '@/lib/i18n';
import Icon from '../Icon';
import { useSite } from './SiteProvider';

export default function QuoteListDrawer() {
  const { lang, t, list, setQty, toggleItem, isOpen } = useSite();
  const open = isOpen('quote-list');
  const items = list.map((i) => ({ ...i, p: byId(lang, i.id)! }));
  const send = () => {
    const lines = items.map((i) => `• ${i.p.title} × ${i.qty}`).join('\n');
    window.open(waLink(`${t.ql.waText}\n${lines}`), '_blank', 'noopener');
  };
  // Arabic lists "+" first (it sits on the right), English lists "−" first
  const inc = <button type="button" data-qty="1" aria-label={t.ql.inc} onClick={(e) => setQty(e.currentTarget.closest<HTMLElement>('.qitem')!.dataset.id!, 1)}>+</button>;
  const dec = <button type="button" data-qty="-1" aria-label={t.ql.dec} onClick={(e) => setQty(e.currentTarget.closest<HTMLElement>('.qitem')!.dataset.id!, -1)}>−</button>;

  return (
    <div className={`drawer${open ? ' is-open' : ''}`} id="quote-list" aria-hidden={!open}>
      <div className="backdrop" data-close />
      <div className="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="ql-title">
        <div className="drawer__head">
          <h2 id="ql-title">{t.ql.title}<small data-ql-count>{list.length ? `(${list.length})` : ''}</small></h2>
          <button className="x-btn" type="button" data-close aria-label={t.ql.close}><Icon id="close" hidden={false} /></button>
        </div>
        <div className="drawer__body" data-ql-body>
          {items.length ? (
            <ul className="qitems">
              {items.map(({ p, qty }) => (
                <li className="qitem" data-id={p.id} key={p.id}>
                  <span className="qitem__img"><img src={imgSrc(p)} alt="" /></span>
                  <div>
                    <small>{p.cat}</small><strong>{p.title}</strong>
                    <div className="stepper" role="group" aria-label={t.ql.qty}>
                      {lang === 'ar' ? inc : dec}<output aria-live="polite">{qty}</output>{lang === 'ar' ? dec : inc}
                    </div>
                  </div>
                  <button className="qitem__rm" type="button" data-rm aria-label={`${t.ql.remove} ${p.title}`} onClick={() => toggleItem(p.id)}><Icon id="trash" /></button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty">
              <span className="empty__icon"><Icon id="list" /></span>
              <h3>{t.ql.emptyTitle}</h3>
              <p>{t.ql.emptyText}</p>
              <Link className="btn btn--primary" href={href(lang, '/shop')} data-close>{t.ql.browse}</Link>
            </div>
          )}
        </div>
        <div className="drawer__foot" data-ql-foot hidden={!list.length}>
          <button className="btn btn--primary btn--block" type="button" data-ql-send onClick={send}><Icon id="wa" hidden={false} />{t.ql.send}</button>{' '}
          <button className="btn btn--ghost btn--block" type="button" data-open="quote">{t.ql.continue}</button>
          <p>{t.ql.note}</p>
        </div>
      </div>
    </div>
  );
}
