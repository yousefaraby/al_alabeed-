'use client';

import { AnimatePresence, motion } from 'motion/react';
import { flyToQuote } from '@/lib/flyToQuote';
import Icon from './Icon';
import { useSite } from './site/SiteProvider';

/** "Add to quote" toggle used on every product card and the product page */
export default function AddToQuote({ id, className = 'btn btn--primary pcard__add' }: { id: string; className?: string }) {
  const { list, toggleItem, t } = useSite();
  const on = list.some((i) => i.id === id);
  return (
    <motion.button className={className + (on ? ' is-added' : '')} type="button" data-add={id} aria-pressed={on} onClick={(e) => { if (!on) flyToQuote(e.currentTarget); toggleItem(id); }} whileTap={{ scale: 0.96 }}>
      {/* plus spins into a check (and back) */}
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span key={on ? 'check' : 'plus'} style={{ display: 'inline-grid' }}
          initial={{ opacity: 0, scale: 0.4, rotate: -90 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.4, rotate: 90 }}
          transition={{ type: 'spring', bounce: 0.4, duration: 0.4 }}>
          <Icon id={on ? 'check' : 'plus'} />
        </motion.span>
      </AnimatePresence>
      <span>{on ? t.inList : t.add}</span>
    </motion.button>
  );
}
