/* Home hero animation: springs + Web Animations, ported from the original page script.
   Runs against the markup rendered by <UnlockStage/> and returns a cleanup function. */
type Spring = { x: number; v: number; t: number; k: number; c: number };

export function runStage(root: HTMLDivElement) {
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const AUTO_MS = 3600;
  const q = <T extends Element = SVGElement>(s: string, el: ParentNode = root) => el.querySelector<T>(s)!;
  const qa = <T extends Element = SVGElement>(s: string, el: ParentNode = root) => [...el.querySelectorAll<T>(s)];
  const E = {
    hole: q('[data-ul="hole"]'), ring: q('[data-ul="ring"]'), wave: q('[data-ul="wave"]'), brackets: q('[data-ul="brackets"]'),
    cam: q('[data-ul="cam"]'), ok: q('[data-ul="ok"]'),
    title: q<HTMLElement>('[data-ul="title"]'), desc: q<HTMLElement>('[data-ul="desc"]'),
  };
  const brk = qa('[data-b]', E.brackets);
  const btns = qa<HTMLButtonElement>('[data-method]');
  root.style.setProperty('--ul-dur', AUTO_MS + 'ms');

  /* easing curves (motion-design style, not linear/ease) */
  const EXPO = 'cubic-bezier(.16,1,.3,1)', SNAP = 'cubic-bezier(.7,0,.2,1)', IN = 'cubic-bezier(.55,0,1,.45)';

  /* springs */
  const spring = (v: number, k = 190, c = 21): Spring => ({ x: v, v: 0, t: v, k, c });
  const CX = 710, CY = 420; // centre of the photo viewBox
  const S = { x: spring(747.5), y: spring(209), r: spring(36, 150, 17), camX: spring(0, 60, 15), camY: spring(0, 60, 15), lock: spring(0, 120, 16) };
  let settled = 0, armed = false, raf = 0, last = 0;

  function step(dt: number) {
    for (const s of Object.values(S)) { const a = -s.k * (s.x - s.t) - s.c * s.v; s.v += a * dt; s.x += s.v * dt; }
  }
  function frame(now: number) {
    const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    for (let i = 0; i < 4; i++) step(dt / 4);
    const vx = S.x.v, vy = S.y.v, speed = Math.hypot(vx, vy);
    // squash & stretch along the direction of travel
    const st = Math.min(0.45, speed / 1400), ang = Math.atan2(vy, vx) * 180 / Math.PI;
    const r = Math.max(8, S.r.x), rx = r * (1 + st), ry = r / (1 + st * 0.8);
    const tf = `rotate(${ang.toFixed(2)} ${S.x.x.toFixed(2)} ${S.y.x.toFixed(2)})`;
    for (const el of [E.hole, E.ring]) { el.setAttribute('cx', String(S.x.x)); el.setAttribute('cy', String(S.y.x)); el.setAttribute('rx', String(rx)); el.setAttribute('ry', String(ry)); el.setAttribute('transform', tf); }
    // the ring opens into an arc while travelling, then closes on arrival
    const open = Math.min(72, speed / 9);
    E.ring.setAttribute('stroke-dasharray', `${(100 - open).toFixed(2)} ${open.toFixed(2)}`);
    E.ring.setAttribute('stroke-dashoffset', (-open / 2 - 25).toFixed(2));
    // camera parallax (lock layer moves more than the door behind it)
    E.cam.setAttribute('transform', `translate(${S.camX.x.toFixed(2)} ${S.camY.x.toFixed(2)})`);
    // brackets: viewfinder corners that lock on after arrival
    const near = Math.hypot(S.x.x - S.x.t, S.y.x - S.y.t) < 1.5 && speed < 40;
    settled += ((near ? 1 : 0) - settled) * Math.min(1, dt * (near ? 9 : 22));
    const off = r + 12 + (1 - settled) * 30;
    brk.forEach((p, i) => {
      const sx = i % 2 ? -1 : 1, sy = i > 1 ? -1 : 1;
      p.setAttribute('transform', `translate(${S.x.x - sx * off} ${S.y.x - sy * off}) scale(${sx} ${sy})`);
    });
    E.brackets.setAttribute('opacity', settled.toFixed(3));
    if (armed && near) { armed = false; onArrive(); }
    const moving = Object.values(S).some((s) => Math.abs(s.v) > 0.02 || Math.abs(s.x - s.t) > 0.02) || Math.abs(settled - (near ? 1 : 0)) > 0.002;
    raf = moving ? requestAnimationFrame(frame) : 0;
  }
  const kick = () => { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } };

  /* helpers */
  let running: Animation[] = [], timers: ReturnType<typeof setTimeout>[] = [];
  const anim = (el: Element, kf: Keyframe[], o: KeyframeAnimationOptions) => { const a = el.animate(kf, { fill: 'both', easing: EXPO, ...o }); running.push(a); return a; };
  const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));
  function clearFx() {
    running.forEach((a) => a.cancel()); running = []; timers.forEach(clearTimeout); timers = [];
    qa<SVGGElement>('.ul-fx').forEach((g) => (g.style.opacity = '0'));
  }
  const fxEls = (name: string, o: string) => qa(`[data-fx="${name}"] [data-o="${o}"]`);
  const show = (name: string) => anim(q(`[data-fx="${name}"]`), [{ opacity: 0 }, { opacity: 1 }], { duration: 160 });
  const hide = (name: string, delay: number) => anim(q(`[data-fx="${name}"]`), [{ opacity: 1 }, { opacity: 0 }], { duration: 260, delay, easing: IN, fill: 'forwards' });
  const draw = (el: Element, delay = 0, duration = 520) => anim(el, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration, delay, easing: SNAP });

  /* per-method choreography (ms are relative to arrival) */
  const FX: Record<string, () => number> = {
    face() {
      show('face');
      fxEls('face', 'ir').forEach((d, i) => anim(d, [{ opacity: 0 }, { opacity: .9, offset: .1 }, { opacity: .15, offset: .2 }, { opacity: .8, offset: .35 }, { opacity: .1, offset: .6 }, { opacity: .7, offset: .8 }, { opacity: 0 }], { duration: 1100, delay: i * 70, easing: 'steps(1,end)' }));
      fxEls('face', 'iris').forEach((c) => anim(c, [{ opacity: 0, transform: 'scale(2.4)' }, { opacity: 1, transform: 'scale(1)', offset: .6 }, { opacity: 0, transform: 'scale(1)' }], { duration: 900, delay: 500, easing: EXPO }));
      fxEls('face', 'scan').forEach((s) => anim(s, [{ transform: 'translateY(0)' }, { transform: 'translateY(74px)' }, { transform: 'translateY(0)' }, { transform: 'translateY(74px)' }], { duration: 1150, delay: 60, easing: 'cubic-bezier(.45,0,.55,1)' }));
      hide('face', 1350);
      return 1150;
    },
    finger() {
      show('finger');
      fxEls('finger', 'pad').forEach((e) => anim(e, [{ opacity: 0, transform: 'scale(.5)' }, { opacity: .9, transform: 'scale(1)', offset: .4 }, { opacity: .35, transform: 'scale(1.1)' }], { duration: 800 }));
      fxEls('finger', 'draw').forEach((p) => draw(p, 200, 620));
      hide('finger', 1150);
      return 820;
    },
    pin() {
      show('pin');
      const keys = fxEls('pin', 'k'), seq = [4, 0, 8, 10, 2, 7, 3];
      seq.forEach((n, i) => anim(keys[n], [{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'scale(1.25)', offset: .25 }, { opacity: .8, transform: 'scale(1)', offset: .5 }, { opacity: 0, transform: 'scale(1)' }], { duration: 440, delay: i * 150, easing: 'ease-out', fill: 'none' }));
      keys.forEach((k, i) => anim(k, [{ opacity: 0 }, { opacity: .8, offset: .2 }, { opacity: 0 }], { duration: 520, delay: seq.length * 150 + 40 + (i % 3) * 25, fill: 'none' }));
      return seq.length * 150 + 240;
    },
    card() {
      show('card');
      fxEls('card', 'draw').forEach((p) => draw(p, 60, 520));
      fxEls('card', 'pad').forEach((t) => anim(t, [{ opacity: 0 }, { opacity: .4, offset: .3 }, { opacity: .15 }], { duration: 900, delay: 260 }));
      fxEls('card', 'arc').forEach((a, i) => anim(a, [{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'scale(1)', offset: .3 }, { opacity: 0, transform: 'scale(2)' }], { duration: 900, delay: 120 + i * 180, iterations: 2, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'none' }));
      hide('card', 1500);
      return 900;
    },
    key() {
      show('key');
      fxEls('key', 'draw').forEach((p) => draw(p, 80, 620));
      fxEls('key', 'slotglow').forEach((g) => anim(g, [{ opacity: 0 }, { opacity: .35, offset: .5 }, { opacity: .12 }], { duration: 900, delay: 400 }));
      hide('key', 1450);
      return 1000;
    },
  };

  function unlockBeat() {
    // the lock's own green LED strip confirms the unlock
    anim(E.ok, [{ opacity: 0, transform: 'scale(.7)' }, { opacity: 1, transform: 'scale(1)', offset: .25 }, { opacity: .85, transform: 'scale(1)', offset: .6 }, { opacity: 0, transform: 'scale(1.05)' }], { duration: 1100, easing: 'ease-out' });
    S.lock.t = 0;
  }

  let current: HTMLButtonElement | null = null;
  function onArrive() {
    // one-shot shockwave instead of an endless pulse
    const r = S.r.t;
    E.wave.setAttribute('cx', String(S.x.t)); E.wave.setAttribute('cy', String(S.y.t));
    E.wave.setAttribute('rx', String(r)); E.wave.setAttribute('ry', String(r));
    anim(E.wave, [{ transform: 'scale(1)', opacity: .8 }, { transform: `scale(${(r + 34) / r})`, opacity: 0 }], { duration: 750, easing: EXPO, fill: 'none' });
    const beat = FX[current!.dataset.method!]?.() ?? 600;
    later(unlockBeat, beat);
  }

  /* caption */
  let captionTimer: ReturnType<typeof setTimeout> | undefined;
  function setCaption(b: HTMLButtonElement) {
    const lines = qa<HTMLElement>('.ul-line > span');
    const write = () => { E.title.textContent = b.dataset.title!; E.desc.textContent = b.dataset.desc!; };
    if (REDUCED) return write();
    lines.forEach((l, i) => l.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-110%)', opacity: 0 }], { duration: 200, delay: i * 30, easing: IN, fill: 'forwards' }));
    captionTimer = setTimeout(() => {
      if (current !== b) return;
      write();
      lines.forEach((l, i) => l.animate([{ transform: 'translateY(110%)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 560, delay: i * 70, easing: EXPO, fill: 'forwards' }));
    }, 260);
  }

  /* select */
  function select(b: HTMLButtonElement, instant?: boolean) {
    if (b === current && !instant) return;
    current = b;
    btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    clearFx();
    const cx = +b.dataset.x!, cy = +b.dataset.y!, r = +b.dataset.w! / 2;
    S.x.t = cx; S.y.t = cy; S.r.t = r;
    S.camX.t = -(cx - CX) * 0.05; S.camY.t = -(cy - CY) * 0.04;
    if (instant || REDUCED) { for (const s of Object.values(S)) { s.x = s.t; s.v = 0; } settled = 1; }
    armed = !REDUCED;
    setCaption(b);
    kick();
    // restart the autoplay hairline
    if (root.classList.contains('is-auto')) { root.classList.remove('is-auto'); void root.offsetWidth; root.classList.add('is-auto'); }
  }

  let idx = 0, auto: ReturnType<typeof setInterval> | null = null;
  const tick = () => { idx = (idx + 1) % btns.length; select(btns[idx]); };
  const stopAuto = () => { if (auto) clearInterval(auto); auto = null; root.classList.remove('is-auto'); };
  const clicks = btns.map((b, i) => { const fn = () => { stopAuto(); idx = i; select(b); }; b.addEventListener('click', fn); return fn; });
  select(btns[0], true);
  let io: IntersectionObserver | undefined;
  if (!REDUCED) {
    root.classList.add('is-auto');
    auto = setInterval(tick, AUTO_MS);
    root.addEventListener('focusin', stopAuto);
    // pause when off-screen, resume when back
    io = new IntersectionObserver(([e]) => {
      if (!auto && !root.classList.contains('is-auto')) return;
      if (e.isIntersecting) { if (!auto) { root.classList.add('is-auto'); auto = setInterval(tick, AUTO_MS); } }
      else { if (auto) clearInterval(auto); auto = null; }
    });
    io.observe(root);
  }

  return () => {
    if (auto) clearInterval(auto);
    cancelAnimationFrame(raf);
    clearTimeout(captionTimer);
    clearFx();
    io?.disconnect();
    root.removeEventListener('focusin', stopAuto);
    root.classList.remove('is-auto');
    btns.forEach((b, i) => b.removeEventListener('click', clicks[i]));
  };
}
