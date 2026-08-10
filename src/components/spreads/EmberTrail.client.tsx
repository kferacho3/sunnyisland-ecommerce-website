"use client";

import { useEffect, useRef } from "react";

/**
 * Ember wisps that follow the pointer across the island — built with the
 * `pointer-trail-emitter` mechanism.
 *
 * THE MECHANISM: motes are emitted per unit of DISTANCE TRAVELLED, not on a
 * timer. That is the whole point. On a timer, spacing becomes speed × interval,
 * so a flick breaks the ribbon into scattered dots and a resting hand piles
 * every mote on one spot. The skill's measurement over one fixed path: distance
 * emission laid 1885 motes slowly vs 1738 quickly (1.08× spread); the same two
 * sweeps on a timer laid 2537 vs 1545 (1.64×). The count follows the path.
 *
 * WHY CANVAS 2D AND NOT IN THE 3D SCENE. The skill prefers camera-parented
 * points inside the WebGL scene, because porting to a DOM overlay costs the
 * post chain — motes come out as hard points with no bloom. That cost is zero
 * here: this scene has no EffectComposer and no postprocessing at all, so there
 * is no bloom to lose. Against that, staying out of the 3D scene keeps the
 * island's frameloop="demand" contract intact (0 rAF at idle) and keeps the
 * emitter's rAF from ever running near the inquiry form's INP.
 *
 * SCOPE. Mounted over the island stage ONLY, not the page. A cursor effect
 * trailing across a wholesale enquiry form is the kind of flourish that reads
 * as a gimmick rather than as atmosphere.
 */

const N_DESKTOP = 190;
const TAU = Math.PI * 2;
/** Distance between spawns, as a fraction of min(w,h). */
const STEP_FRACTION = 0.014;
/** The teleport guard: a tab restore or a window blur hands one enormous
 *  `moved`, and without a cap that single frame spawns thousands and stalls. */
const SPAWN_CAP = 14;
const IDLE_EMIT_SECONDS = 0.42;

type Mote = {
  life: number;
  max: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  sz: number;
  ph: number;
};

/** Frame-rate-independent exponential damping. */
const damp = (a: number, b: number, l: number, dt: number) =>
  b + (a - b) * Math.exp(-l * dt);

const clamp = (v: number, lo: number, hi: number) =>
  v < lo ? lo : v > hi ? hi : v;

/** The mote sprite, baked once: a few pixels of core inside a faint halo. */
function bakeSprite(): HTMLCanvasElement {
  const s = 64;
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const g = c.getContext("2d");
  if (!g) return c;
  const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  // Sunny Island's own fire, not the demo's cyan: gold core into ember falloff.
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.07, "rgba(255,240,200,0.94)");
  grad.addColorStop(0.16, "rgba(252,192,0,0.42)");
  grad.addColorStop(0.34, "rgba(240,84,0,0.15)");
  grad.addColorStop(0.62, "rgba(160,48,0,0.04)");
  grad.addColorStop(1, "rgba(120,2,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, s, s);
  return c;
}

export function EmberTrail({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Purely ambient and purely pointer-driven: under reduced motion there is
    // no still frame worth composing (unlike the leaves, whose composition was
    // designed with them in it), and on a coarse pointer a stationary emitter
    // grows a permanent plume. Both cases simply do not mount.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprite = bakeSprite();
    const motes: Mote[] = Array.from({ length: N_DESKTOP }, () => ({
      life: 0,
      max: 0,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      sz: 0,
      ph: 0,
    }));
    // Every mote starts dead.
    for (const m of motes) m.life = 1;

    const E = {
      x: 0,
      y: 0,
      px: 0,
      py: 0,
      lx: 0,
      ly: 0,
      acc: 0,
      idle: 0,
      i: 0,
      active: false,
    };

    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    let last = 0;
    let clock = 0;
    let running = false;

    const fit = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      // A zero viewport would otherwise bake the whole field at the origin.
      if (!w || !h) return;
      if (W === w && H === h) return;
      W = w;
      H = h;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (x: number, y: number, ang: number, weak: boolean) => {
      // Read the index, THEN advance. Advancing first writes position into the
      // next slot and life into this one, so every mote appears where the
      // previous one started — they pop instead of fading in.
      const i = E.i;
      E.i = (i + 1) % motes.length;
      const m = motes[i];
      const min = Math.min(W, H);
      const scatter = 0.13 * min;

      // Two-uniform sum: a triangular distribution, denser at the centre.
      m.x = x + (Math.random() + Math.random() - 1) * scatter;
      m.y = y + (Math.random() + Math.random() - 1) * scatter;
      m.life = 0;
      m.max = (weak ? 2.1 : 1.45) + Math.random() * 1.3;
      const k = min * 0.055;
      // Launched AGAINST the direction of travel, so the ribbon opens out
      // behind the hand instead of being dragged along with it.
      m.vx = -Math.cos(ang) * k * 0.5 + (Math.random() - 0.5) * k * 2.1;
      m.vy =
        -Math.sin(ang) * k * 0.5 + (Math.random() - 0.5) * k * 1.8 - k * 0.12;
      m.sz = ((weak ? 0.0014 : 0.0018) + Math.random() * 0.0018) * min;
      m.ph = Math.random() * TAU;
    };

    const emit = (dt: number) => {
      const dx = E.x - E.lx;
      const dy = E.y - E.ly;
      const moved = Math.hypot(dx, dy);
      const ang = moved > 1e-4 ? Math.atan2(dy, dx) : Math.random() * TAU;
      const step = Math.min(W, H) * STEP_FRACTION;

      E.acc += moved;
      let guard = 0;
      while (E.acc >= step && guard++ < SPAWN_CAP) {
        E.acc -= step;
        // Place each mote along the segment actually travelled. Spawning them
        // all at the current position clumps them at one end, so a flick reads
        // as a blob with a gap behind it.
        const t = moved > 1e-6 ? Math.min(1, (guard * step) / moved) : 0;
        spawn(E.lx + dx * t, E.ly + dy * t, ang, false);
      }

      // Distance emission means a stationary pointer emits nothing at all, and
      // the trail dies under a resting hand. One weak mote every 0.42s is a
      // breath; much more than that is a permanent column of smoke, which is
      // the timer failure this mechanism exists to avoid, reintroduced by hand.
      E.idle += dt;
      if (E.active && E.idle > IDLE_EMIT_SECONDS) {
        E.idle = 0;
        spawn(E.x, E.y, Math.random() * TAU, true);
      }

      E.lx = E.x;
      E.ly = E.y;
    };

    const frame = (now: number) => {
      const dt = clamp((now - last) / 1000, 0, 1 / 30);
      last = now;
      clock += dt;

      // The emitter lags the pointer. Rigidly pinned, a fast flick looks like
      // the trail is welded to the cursor.
      E.x = damp(E.x, E.px, 16, dt);
      E.y = damp(E.y, E.py, 16, dt);
      emit(dt);

      const min = Math.min(W, H);
      // Coast damping is deliberately gentle. At 1 - 1.1*dt every mote stops
      // within a hair of its spawn point and the trail never opens out.
      const drag = 1 - 0.5 * dt;
      const rise = min * 0.02 * dt;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      let alive = 0;
      for (const m of motes) {
        if (m.life >= m.max) continue;
        alive++;
        m.life += dt;
        // A slow curl per mote, so the drift frays instead of running straight.
        m.x += (m.vx + Math.sin(clock * 1.3 + m.ph) * min * 0.012) * dt;
        m.y += (m.vy + Math.cos(clock * 1.1 + m.ph * 1.7) * min * 0.01) * dt;
        m.vx *= drag;
        m.vy = m.vy * drag - rise;

        const u = m.life / m.max;
        const a =
          Math.min(1, u / 0.12) * (1 - clamp((u - 0.22) / 0.78, 0, 1)) * 0.9;
        if (a <= 0) continue;
        // A mote softens as it ages; it does not swell.
        const d = m.sz * (1 + u * 0.55) * 2;
        ctx.globalAlpha = a;
        ctx.drawImage(sprite, m.x - d, m.y - d, d * 2, d * 2);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      // Stop once the field has burnt out and the hand has left; restart on the
      // next pointermove. No permanent rAF.
      if (!alive && !E.active) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      // Reset the base, or the first frame after a pause integrates the pause.
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (!inside) {
        E.active = false;
        return;
      }
      if (!E.active) {
        // Entering: seat the emitter so the first segment is not a jump across
        // the whole stage, which the spawn cap would then have to absorb.
        E.x = E.lx = x;
        E.y = E.ly = y;
        E.acc = 0;
      }
      E.active = true;
      E.px = x;
      E.py = y;
      start();
    };

    const onLeave = () => {
      E.active = false;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (E.active) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ pointerEvents: "none" }}
    />
  );
}
