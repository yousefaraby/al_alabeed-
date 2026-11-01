'use client';

import { motion } from 'motion/react';
import { useState, type ReactNode } from 'react';
import { SMOOTH, SPRING } from '@/lib/motion';
import Icon from './Icon';

/** The round "+" that turns into "×" when its row opens */
export function AccIcon({ open }: { open: boolean }) {
  return (
    <motion.span className="acc__icon" initial={false} animate={{ rotate: open ? 45 : 0 }} transition={SPRING.pop}>
      <Icon id="plus" />
    </motion.span>
  );
}

/** Answer panel that grows to its content height */
export function AccPanel({ id, open, children }: { id: string; open: boolean; children: ReactNode }) {
  return (
    <motion.div className={`acc__panel${open ? ' is-open' : ''}`} id={id} role="region" aria-labelledby={`${id}b`}
      initial={false} animate={{ height: open ? 'auto' : 0 }} transition={{ duration: 0.45, ease: SMOOTH }}>
      <motion.div initial={false} animate={{ opacity: open ? 1 : 0, y: open ? 0 : -6 }} transition={{ duration: open ? 0.4 : 0.15, delay: open ? 0.08 : 0, ease: SMOOTH }}>{children}</motion.div>
    </motion.div>
  );
}

/** One accordion row (.acc__item) */
export default function AccItem({ id, q, children }: { id: string; q: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="acc__item">
      <button className="acc__btn" aria-expanded={open} aria-controls={id} id={`${id}b`} onClick={() => setOpen(!open)}>
        {q}
        <AccIcon open={open} />
      </button>
      <AccPanel id={id} open={open}>{children}</AccPanel>
    </div>
  );
}
