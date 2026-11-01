'use client';

import { animate } from 'motion';
import { SMOOTH, SPRING, noneToIdentity } from './motion';

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const px = (n: number) => `${n}px`;
const IDENTITY = 'translateX(0px) rotate(0deg) scale(1)';
/** hand an element back to the stylesheet (hover effects etc.) once an animation is done */
const release = (el: Element | null | undefined, ...props: string[]) => {
  if (el) for (const p of props.length ? props : ['opacity', 'transform', 'filter', 'transition']) (el as HTMLElement).style.removeProperty(p);
};

/** Ready to paint: already loaded, or decoded/loaded now — never waiting longer than `max` ms */
const decoded = (img: HTMLImageElement, max = 600) => {
  if (img.complete && img.naturalWidth) return Promise.resolve();
  return Promise.race([
    img.decode().catch(() => {}),
    new Promise<void>((r) => { img.addEventListener('load', () => r(), { once: true }); img.addEventListener('error', () => r(), { once: true }); }),
    new Promise<void>((r) => setTimeout(r, max)),
  ]);
};

/** Fetch an image ahead of time (resolves when ready, or after `max` ms) */
export const preload = (src: string, max = 1500) => { const im = new Image(); im.src = src; return decoded(im, max); };

/** Wait until an <img> has loaded its current source (so a swap never shows a blank frame) */
export const loaded = (img: HTMLImageElement | null) =>
  new Promise<void>((res) => {
    if (!img || (img.complete && img.naturalWidth)) return res();
    const done = () => { img.removeEventListener('load', done); img.removeEventListener('error', done); res(); };
    img.addEventListener('load', done); img.addEventListener('error', done);
    setTimeout(done, 1500);
  });

/** A decoded copy of `img` showing `src`, laid exactly over it (CSS applies as for the real photo) */
async function copyOver(img: HTMLImageElement, src: string) {
  const host = (img.offsetParent as HTMLElement) || img.parentElement!;
  const c = img.cloneNode() as HTMLImageElement;
  c.removeAttribute('style'); c.removeAttribute('data-pdp-img'); c.removeAttribute('loading');
  c.alt = ''; c.setAttribute('aria-hidden', 'true'); c.src = src;
  const ir = img.getBoundingClientRect(), hr = host.getBoundingClientRect();
  Object.assign(c.style, { position: 'absolute', inset: 'auto', margin: '0', left: px(ir.left - hr.left), top: px(ir.top - hr.top), width: px(ir.width), height: px(ir.height), maxHeight: 'none', zIndex: '1', pointerEvents: 'none', transition: 'none', opacity: '0' });
  await decoded(c);
  host.append(c);
  return c;
}

/**
 * The picked finish moves from its ball into the main image.
 * A copy of the photo frame is placed once at its final size and carried there with GPU-only
 * properties: a transform (from the ball's position and size back to identity, on a spring) and a
 * clip-path (from the ball's circle to the frame's rounded rectangle). The current photo eases aside
 * in the same direction; then the real photo is swapped underneath and the copy removed.
 */
export async function fromBall(opts: { ball: Element; frame: Element; img: HTMLImageElement | null; src: string; commit: () => void | Promise<void> }) {
  const { ball, frame, img, src, commit } = opts;
  await preload(src);
  if (reduced() || !img) { await commit(); return; }

  const b = ball.getBoundingClientRect(), fr = frame.getBoundingClientRect(), ir = img.getBoundingClientRect();
  const fcs = getComputedStyle(frame), ics = getComputedStyle(img);
  const radius = parseFloat(fcs.borderTopLeftRadius) || 0;

  const fly = document.createElement('div');
  fly.className = 'ball-fly';
  Object.assign(fly.style, { left: px(fr.left), top: px(fr.top), width: px(fr.width), height: px(fr.height), backgroundColor: fcs.backgroundColor, backgroundImage: fcs.backgroundImage });
  const pic = document.createElement('img');
  pic.src = src; pic.alt = ''; pic.setAttribute('aria-hidden', 'true');
  Object.assign(pic.style, {
    left: px(ir.left - fr.left), top: px(ir.top - fr.top), width: px(ir.width), height: px(ir.height),
    mixBlendMode: ics.mixBlendMode, filter: ics.filter,
  });
  await decoded(pic);
  fly.append(pic);

  // start: the frame's centred square, as a circle, scaled and moved onto the ball
  const side = Math.min(fr.width, fr.height), s = b.width / side;
  const ix = (fr.width - side) / 2, iy = (fr.height - side) / 2;
  const tx = b.left + b.width / 2 - (fr.left + fr.width / 2), ty = b.top + b.height / 2 - (fr.top + fr.height / 2);
  fly.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
  fly.style.clipPath = `inset(${iy}px ${ix}px round ${side / 2}px)`;
  document.body.append(fly);

  const dir = Math.sign(-tx) || 1; // the way the photo travels
  try {
    await Promise.all([
      animate(fly, { transform: [`translate(${tx}px, ${ty}px) scale(${s})`, 'translate(0px, 0px) scale(1)'] }, { type: 'spring', bounce: 0.08, duration: 0.7 }),
      animate(fly, { clipPath: [`inset(${iy}px ${ix}px round ${side / 2}px)`, `inset(0px 0px round ${radius}px)`] }, { duration: 0.55, ease: SMOOTH }),
      animate(img, { opacity: [1, 0], transform: noneToIdentity(['none', `translateX(${dir * 10}%) scale(.97)`]) }, { duration: 0.5, ease: SMOOTH }),
    ]);
    await commit();
    await loaded(img);
  } finally {
    release(img);
    fly.remove();
  }
}

/** Photo follows the finger while dragging (a little tilt and fade the further it goes) */
export function follow(img: Element, dx: number) {
  const el = img as HTMLElement;
  el.style.transition = 'none'; // no CSS easing lag behind the finger
  el.style.transform = `translateX(${dx}px) rotate(${dx * 0.02}deg) scale(1)`;
  el.style.opacity = String(Math.max(0.4, 1 - Math.abs(dx) / 520));
}

/** Released without enough throw: spring back into place */
export async function springBack(img: Element) {
  const el = img as HTMLElement;
  await animate(el, { transform: [el.style.transform || IDENTITY, IDENTITY], opacity: [parseFloat(el.style.opacity || '1'), 1] }, SPRING.settle);
  release(el);
}

/**
 * Thrown: one continuous motion — the current photo keeps travelling out the way it was swiped while
 * the next finish slides in from the other side at the same time and springs to rest.
 * `dir` is the swipe direction (-1 = towards the left).
 */
export async function swipeAway(img: Element, dir: -1 | 1, src: string, commit: () => void | Promise<void>) {
  const el = img as HTMLImageElement;
  await preload(src);
  if (reduced()) { await commit(); release(el); return; }
  const w = el.getBoundingClientRect().width || 300;
  const next = await copyOver(el, src);
  try {
    await Promise.all([
      animate(el, { transform: [el.style.transform || IDENTITY, `translateX(${dir * w * 0.85}px) rotate(${dir * 7}deg) scale(.96)`] }, { duration: 0.42, ease: SMOOTH }),
      // the outgoing photo dissolves gradually while the next one arrives (a true cross-fade)
      animate(el, { opacity: [parseFloat(el.style.opacity || '1'), 0] }, { duration: 0.34, ease: 'easeIn' }),
      animate(next, { transform: [`translateX(${-dir * w * 0.55}px) rotate(${-dir * 4}deg) scale(.96)`, IDENTITY], opacity: [0, 1] }, { ...SPRING.settle, opacity: { duration: 0.35, ease: SMOOTH } } as never),
    ]);
    await commit();
    await loaded(el);
  } finally {
    release(el);
    next.remove();
  }
}
