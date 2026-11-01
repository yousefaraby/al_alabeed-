'use client';

import Icon from './Icon';
import { useSite } from './site/SiteProvider';

/** "Add to quote" toggle used on every product card and the product page */
export default function AddToQuote({ id, className = 'btn btn--primary pcard__add' }: { id: string; className?: string }) {
  const { list, toggleItem, t } = useSite();
  const on = list.some((i) => i.id === id);
  return (
    <button className={className + (on ? ' is-added' : '')} type="button" data-add={id} aria-pressed={on} onClick={() => toggleItem(id)}>
      <Icon id={on ? 'check' : 'plus'} />
      <span>{on ? t.inList : t.add}</span>
    </button>
  );
}
