'use client';

import { useState, type ReactNode } from 'react';
import Icon from './Icon';

/** One accordion row (.acc__item) */
export default function AccItem({ id, q, children }: { id: string; q: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="acc__item">
      <button className="acc__btn" aria-expanded={open} aria-controls={id} id={`${id}b`} onClick={() => setOpen(!open)}>
        {q}
        <span className="acc__icon"><Icon id="plus" /></span>
      </button>
      <div className={`acc__panel${open ? ' is-open' : ''}`} id={id} role="region" aria-labelledby={`${id}b`}>
        <div>{children}</div>
      </div>
    </div>
  );
}
