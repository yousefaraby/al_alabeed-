import { animate } from 'motion';
import { BACK, IN, SMOOTH } from './motion';

/** Is a photo currently on its way to the quote list (the header waits for it before popping the count) */
export const isFlying = () => !!document.querySelector('.quote-fly');

/**
 * The product photo lifts off the card (or product page), arcs into the header's quote-list
 * button and shrinks into it; the button then bounces and its count pops.
 */
export function flyToQuote(from: HTMLElement) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const target = document.querySelector<HTMLElement>('.header [data-open="quote-list"]');
  const img = from.closest('.pcard, .pdp')?.querySelector<HTMLImageElement>('.pcard__media img:not([aria-hidden]), .pdp__stage img:not([aria-hidden])');
  if (!target || !img) return;
  // measure the photo frame, not the <img>, so a photo that is still loading still flies
  const a = (img.closest('.pcard__media, .pdp__stage') ?? img).getBoundingClientRect(), b = target.getBoundingClientRect();
  if (!a.width || !b.width || b.bottom < 0) return;

  // a round "chip" holding the photo, starting at the photo's size and place
  const size = Math.min(a.width, a.height, 220);
  const fly = document.createElement('div');
  fly.className = 'quote-fly';
  fly.style.cssText = `left:${a.left + a.width / 2 - size / 2}px;top:${a.top + a.height / 2 - size / 2}px;width:${size}px;height:${size}px`;
  const pic = img.cloneNode() as HTMLImageElement;
  pic.removeAttribute('style'); pic.removeAttribute('class'); pic.alt = '';
  fly.appendChild(pic);
  document.body.appendChild(fly);

  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  const end = 22 / size;
  const t = 0.8;
  // x eases out while y eases in, so the path bows into an arc; a little lift first sells the "pick up"
  const run = Promise.all([
    animate(fly, { scale: [1, 1.08, end], borderRadius: ['18%', '50%', '50%'] }, { duration: t, times: [0, 0.18, 1], ease: [SMOOTH, STANDARD] }).finished,
    animate(fly, { x: [0, 0, dx] }, { duration: t, times: [0, 0.18, 1], ease: SMOOTH }).finished,
    animate(fly, { y: [0, -14, dy] }, { duration: t, times: [0, 0.18, 1], ease: [SMOOTH, IN] }).finished,
    animate(fly, { opacity: [1, 1, 0.9] }, { duration: t }).finished,
  ]);
  // land once, when the flight ends, or on a timer in case the browser never reports the end (e.g. a hidden tab)
  let done = false;
  const finish = (ok: boolean) => { if (done) return; done = true; fly.remove(); if (ok) land(target); };
  run.then(() => finish(true), () => finish(false));
  setTimeout(() => finish(true), t * 1000 + 250);
}

const STANDARD = [0.4, 0, 0.2, 1] as const;

/** The quote-list button catches the photo: a squash-and-bounce, a ring, and the count pops */
function land(target: HTMLElement) {
  animate(target, { scale: [1, 0.82, 1.14, 1], rotate: [0, -8, 6, 0] }, { duration: 0.55, ease: 'easeOut' });
  const count = target.querySelector<HTMLElement>('[data-quote-count]');
  if (count) animate(count, { scale: [0.4, 1.45, 1] }, { duration: 0.5, ease: BACK });
  const ring = document.createElement('span');
  ring.className = 'quote-ring';
  target.appendChild(ring);
  animate(ring, { scale: [0.5, 1.9], opacity: [0.9, 0] }, { duration: 0.6, ease: SMOOTH }).finished.then(() => ring.remove());
}
