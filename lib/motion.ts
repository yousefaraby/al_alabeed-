'use client';

import { animate, cubicBezier, steps, type AnimationPlaybackControls } from 'motion';

/** Site-wide easing curves */
export const EXPO = [0.16, 1, 0.3, 1] as const;
export const SNAP = [0.7, 0, 0.2, 1] as const;
export const BACK = [0.34, 1.56, 0.64, 1] as const;
export const IN = [0.55, 0, 1, 0.45] as const;
/** soft "ease-out-quint": the default for UI entrances */
export const SMOOTH = [0.22, 1, 0.36, 1] as const;

/** Springs: physical motion that settles naturally (duration = perceived length in seconds) */
export const SPRING = {
  /** panels, drawers, modals: no overshoot */
  panel: { type: 'spring', bounce: 0, duration: 0.55 },
  /** selection highlights, pills, layout shifts: a hint of bounce */
  glide: { type: 'spring', bounce: 0.18, duration: 0.5 },
  /** small taps and toggles: lively */
  pop: { type: 'spring', bounce: 0.45, duration: 0.4 },
  /** photos settling after a swipe or morph */
  settle: { type: 'spring', bounce: 0.12, duration: 0.7 },
} as const;

export interface PlayOptions {
  /** milliseconds, like the Web Animations API */
  duration?: number;
  delay?: number;
  easing?: string;
  fill?: FillMode;
  iterations?: number;
}

export interface Played {
  cancel: () => void;
  finished: Promise<unknown>;
  set onfinish(fn: () => void);
}

type Frame = Record<string, string | number | null | undefined>;

/** The do-nothing version of a transform list: scale(.9) translateY(14px) -> scale(1) translateY(0px) */
const identityOf = (t: string) =>
  t.replace(/(\w+)\(([^)]*)\)/g, (_, fn: string, args: string) => {
    const one = /^scale/i.test(fn);
    return `${fn}(${args.split(',').map((a) => (one ? '1' : `0${(a.trim().match(/[a-z%]+$/i) || ['px'])[0]}`)).join(', ')})`;
  });

/**
 * Motion's JS animation path (used for SVG, and wherever native animations are unavailable)
 * reads a "none" transform keyframe as zero, collapsing the element. Spell it out instead.
 */
export function noneToIdentity<T extends string | number | null>(frames: T[]): T[] {
  const template = frames.find((f) => typeof f === 'string' && f !== 'none') as string | undefined;
  return template ? frames.map((f) => (f === 'none' ? (identityOf(template) as T) : f)) : frames;
}

const NAMED: Record<string, string> = { linear: 'linear', ease: 'easeInOut', 'ease-in': 'easeIn', 'ease-out': 'easeOut', 'ease-in-out': 'easeInOut' };

function toEase(easing?: string) {
  if (!easing) return 'linear';
  const bz = easing.match(/^cubic-bezier\(([^)]+)\)$/);
  if (bz) { const [a, b, c, d] = bz[1].split(',').map(Number); return cubicBezier(a, b, c, d); }
  const st = easing.match(/^steps\((\d+)\s*,?\s*(start|end)?\)$/);
  if (st) return steps(+st[1], (st[2] as 'start' | 'end') || 'end');
  return NAMED[easing] ?? 'linear';
}

/** WAAPI fills in missing offsets evenly between the ones that are given */
function offsets(frames: Frame[]) {
  const o = frames.map((f) => (typeof f.offset === 'number' ? f.offset : null));
  o[0] ??= 0; o[o.length - 1] ??= 1;
  for (let i = 1; i < o.length; i++) {
    if (o[i] !== null) continue;
    let j = i; while (o[j] === null) j++;
    const a = o[i - 1]!, b = o[j]!;
    for (let k = i; k < j; k++) o[k] = a + ((b - a) * (k - i + 1)) / (j - i + 1);
  }
  return o as number[];
}

/**
 * Run a keyframe animation through Motion. Takes the same keyframes and options as
 * `element.animate()` so the site's existing choreography keeps its exact timing.
 */
export function play(el: Element, frames: Keyframe[], o: PlayOptions = {}): Played {
  const fs = frames as unknown as Frame[];
  const props = [...new Set(fs.flatMap((f) => Object.keys(f).filter((k) => k !== 'offset' && k !== 'easing')))];
  const times = offsets(fs);
  const style = (el as HTMLElement).style as unknown as Record<string, string>;
  const def: Record<string, (string | number | null)[]> = {};
  for (const p of props) def[p] = fs.map((f) => (f[p] ?? null) as string | number | null);
  if (def.transform) def.transform = noneToIdentity(def.transform);
  const clear = () => props.forEach((p) => { style[p] = ''; });

  // fill "both"/"backwards": hold the first frame during the delay, as WAAPI does
  if (o.delay && (o.fill === 'both' || o.fill === 'backwards')) for (const p of props) if (def[p][0] !== null) style[p] = String(def[p][0]);

  const controls: AnimationPlaybackControls = animate(el, def as never, {
    duration: (o.duration ?? 0) / 1000,
    delay: (o.delay ?? 0) / 1000,
    ease: toEase(o.easing) as never,
    times,
    repeat: Math.max(0, (o.iterations ?? 1) - 1),
  });
  // fill "none"/"backwards": drop the end state once finished, as WAAPI does
  const finished = controls.finished.then(() => { if (!o.fill || o.fill === 'none' || o.fill === 'backwards') clear(); });
  let cancelled = false;
  return {
    cancel: () => { if (cancelled) return; cancelled = true; controls.stop(); clear(); },
    finished,
    set onfinish(fn: () => void) { finished.then(() => { if (!cancelled) fn(); }); },
  };
}
