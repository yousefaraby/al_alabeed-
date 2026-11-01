'use client';

import { animate, type DOMKeyframesDefinition } from 'motion';
import { useEffect, useRef, type RefObject } from 'react';
import { SMOOTH, SPRING, noneToIdentity } from './motion';

interface OpenMotion {
  /** selector (inside the root) for the dimmed backdrop */
  backdrop?: string;
  /** selector (inside the root) for the sliding/popping panel; omit to animate the root itself */
  panel?: string;
  opened: DOMKeyframesDefinition;
  closed: DOMKeyframesDefinition;
  /** seconds */
  duration?: number;
  /** only animate when this returns true (e.g. a menu that is an overlay only on phones) */
  when?: () => boolean;
}

/**
 * Animates an overlay (drawer, modal, sheet, menu…) open and closed with Motion
 * whenever `open` changes. The closed state on first render comes from CSS.
 */
export function useOpenMotion(ref: RefObject<HTMLElement | null>, open: boolean, cfg: OpenMotion) {
  const first = useRef(true);
  const config = useRef(cfg);
  config.current = cfg;
  useEffect(() => {
    const root = ref.current; if (!root) return;
    if (first.current) { first.current = false; if (!open) return; }
    const { backdrop, panel, opened, closed, duration = 0.55, when } = config.current;
    if (when && !when()) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bd = backdrop ? root.querySelector(backdrop) : null;
    const el = panel ? root.querySelector(panel) : root;
    const runs = [
      bd && animate(bd, { opacity: open ? 1 : 0 }, { duration: reduced ? 0 : 0.28 }),
      el && animate(el, between(open ? closed : opened, open ? opened : closed), reduced ? { duration: 0 } : { ...SPRING.panel, duration, opacity: { duration: duration * 0.6, ease: SMOOTH }, filter: { duration: duration * 0.8, ease: SMOOTH } } as never),
    ];
    // once closed, hand the resting state back to the stylesheet
    if (!open) Promise.all(runs.map((r) => r?.finished)).then(() => {
      if (bd) (bd as HTMLElement).style.opacity = '';
      if (el) Object.keys(closed).forEach((k) => { (el as HTMLElement).style.setProperty(k.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase()), ''); });
    });
    return () => runs.forEach((r) => r?.stop());
  }, [ref, open]);
}

/** Explicit from → to keyframes for every property (transforms spelled out so "none" never collapses) */
function between(from: DOMKeyframesDefinition, to: DOMKeyframesDefinition): DOMKeyframesDefinition {
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(to)) {
    const pair = [(from as Record<string, string | number>)[k] ?? null, (to as Record<string, string | number>)[k]];
    out[k] = k === 'transform' ? noneToIdentity(pair) : pair;
  }
  return out as DOMKeyframesDefinition;
}
