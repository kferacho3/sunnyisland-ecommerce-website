"use client";

import { ContactShadows } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { JarModel } from "./JarModel";

/**
 * The bottle, on a turntable.
 *
 * Framing is computed from the model's own bounding box rather than guessed.
 * The previous version hardcoded `scale={0.0034}` and a camera position, which
 * is why this stage was disabled for so long: the GLB is ~237 units across and
 * its centre sits ~16 units BELOW its origin, so any hand-tuned pair of magic
 * numbers frames it slightly wrong and looks broken. Measure, then place.
 *
 * Motion: a slow idle turntable, drag to take control, inertia on release, and
 * an ease back to the label-forward angle once you let go and it slows down —
 * the jar always returns to presenting itself. Under reduced motion the
 * turntable and the settle are both off; drag still works, because rotating a
 * product on demand is a control, not an animation.
 *
 * Every frame is requested. There is no rAF running when the jar is still.
 */

/** Height, in world units, the jar is normalised to. */
const TARGET_HEIGHT = 2.2;
/**
 * The angle that squares the brand face — badge, wordmark, PEPPER SAUCE — to
 * the camera. The model's own zero sits between its two label panels, so the
 * badge reads ~38 degrees off to the right; this turns it back.
 */
const LABEL_FORWARD = -0.66;
/** Where the entrance starts, so the jar visibly turns into its pose. */
const ENTRY_FROM = LABEL_FORWARD - 0.6;
/**
 * Idle is a slow ROCK, not a turntable.
 *
 * A continuous spin looks lively in a demo and is hostile on a product page:
 * the label — the thing a buyer came to read — faces away most of the time,
 * and text sliding past is unreadable. Rocking a few degrees either side of
 * the brand face keeps the label legible, still reads as "this is alive and
 * you can grab it", and costs the same frame.
 */
const ROCK_AMPLITUDE = 0.3;
const ROCK_PERIOD = 11;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function Bottle({
  onReady,
  reduced,
  spin,
}: {
  onReady: () => void;
  reduced: boolean;
  spin: { current: boolean };
}) {
  const turntable = useRef<THREE.Group>(null);
  const { invalidate, camera, gl } = useThree();

  // Measured once from the real geometry: the offset that puts the jar's
  // centre on the origin, and the scale that makes it TARGET_HEIGHT tall.
  const fitted = useRef(false);
  const inner = useRef<THREE.Group>(null);

  const drag = useRef({ active: false, lastX: 0, vel: 0, pointer: -1 });
  const angle = useRef(ENTRY_FROM);
  const entered = useRef(0);
  const phase = useRef(0);

  useEffect(() => {
    onReady();
    invalidate();
  }, [onReady, invalidate]);

  useFrame((_, delta) => {
    const g = inner.current;
    const t = turntable.current;
    if (!g || !t) return;

    if (!fitted.current) {
      const box = new THREE.Box3().setFromObject(g);
      const size = box.getSize(new THREE.Vector3());
      const centre = box.getCenter(new THREE.Vector3());
      if (size.y > 0) {
        const s = TARGET_HEIGHT / size.y;
        g.scale.setScalar(s);
        g.position.set(-centre.x * s, -centre.y * s, -centre.z * s);

        // Frame the camera off the fitted size, not off a guess.
        const radius = Math.max(size.x, size.z) * 0.5 * s;
        const fov = ((camera as THREE.PerspectiveCamera).fov * Math.PI) / 180;
        const dist = TARGET_HEIGHT / 2 / Math.tan(fov / 2) + radius * 1.9;
        camera.position.set(0, TARGET_HEIGHT * 0.16, dist);
        camera.lookAt(0, 0, 0);
        fitted.current = true;
        invalidate();
      }
      return;
    }

    let moving = false;

    if (entered.current < 1) {
      // Entrance owns the angle, and it lands ON label-forward. Previously the
      // entrance only eased position while the turntable was already turning,
      // so the jar arrived showing whatever face it happened to reach — often
      // the Special Message panel rather than the brand face.
      entered.current = Math.min(1, entered.current + delta / 1.4);
      const eased = 1 - Math.pow(1 - entered.current, 3);
      angle.current = ENTRY_FROM + (LABEL_FORWARD - ENTRY_FROM) * eased;
      t.position.y = -0.09 * (1 - eased);
      t.scale.setScalar(0.955 + 0.045 * eased);
      moving = true;
    } else if (drag.current.active) {
      moving = true;
    } else if (Math.abs(drag.current.vel) > 0.0006) {
      // Inertia.
      angle.current += drag.current.vel;
      drag.current.vel *= 0.94;
      moving = true;
    } else if (!reduced && spin.current) {
      drag.current.vel = 0;
      // Ease toward the rock target rather than snapping to it, so returning
      // from a drag glides back to the brand face instead of jumping.
      phase.current += delta;
      const target =
        LABEL_FORWARD +
        Math.sin((phase.current / ROCK_PERIOD) * Math.PI * 2) * ROCK_AMPLITUDE;
      const next =
        angle.current + (target - angle.current) * (1 - Math.pow(0.06, delta));
      if (Math.abs(next - angle.current) > 1e-5) moving = true;
      angle.current = next;
    }

    t.rotation.y = angle.current;
    if (moving) invalidate();
  });

  // Drag is bound to the CANVAS, not the window. The previous version listened
  // on window, so dragging to select text anywhere on the page spun the jar.
  useEffect(() => {
    const el = gl.domElement;

    const down = (e: PointerEvent) => {
      drag.current.active = true;
      drag.current.lastX = e.clientX;
      drag.current.vel = 0;
      drag.current.pointer = e.pointerId;
      el.setPointerCapture(e.pointerId);
      invalidate();
    };
    const move = (e: PointerEvent) => {
      if (!drag.current.active || e.pointerId !== drag.current.pointer) return;
      const dx = (e.clientX - drag.current.lastX) * 0.0075;
      angle.current += dx;
      drag.current.vel = dx;
      drag.current.lastX = e.clientX;
      invalidate();
    };
    const up = (e: PointerEvent) => {
      if (e.pointerId !== drag.current.pointer) return;
      drag.current.active = false;
      drag.current.pointer = -1;
      if (el.hasPointerCapture(e.pointerId))
        el.releasePointerCapture(e.pointerId);
      invalidate();
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl, invalidate]);

  return (
    <group ref={turntable}>
      <group ref={inner}>
        <JarModel />
      </group>
    </group>
  );
}

export default function ProductViewer({
  onReady,
  spin,
}: {
  onReady: () => void;
  /** False pauses the idle turntable — set when the stage leaves the viewport. */
  spin: { current: boolean };
}) {
  const [dpr, setDpr] = useState(1);
  const reduced = useReducedMotion();

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setDpr(Math.min(window.devicePixelRatio, coarse ? 1.5 : 2));
  }, []);

  const shadowColour = useMemo(() => new THREE.Color("#000000"), []);

  return (
    <Canvas
      frameloop="demand"
      dpr={dpr}
      camera={{ position: [0, 0.35, 4], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y", cursor: "grab" }}
    >
      {/* Deterministic light rig — no drei Environment preset: those fetch an
          HDR from a CDN at runtime and suspend the whole canvas when the
          request stalls. Plain lights render identically everywhere. */}
      <ambientLight intensity={0.55} color="#ffd9b0" />
      <hemisphereLight args={["#ff9a4d", "#1a0c06", 0.5]} />
      {/* Key, warm, from the left — the forge. */}
      <directionalLight
        position={[-4, 2.5, 4]}
        intensity={3.2}
        color="#ff7a1a"
      />
      {/* Fill, gold, from behind right — separates glass from the ink ground. */}
      <directionalLight
        position={[3.5, 2, -3]}
        intensity={1.6}
        color="#fcc000"
      />
      {/* Rim, straight back — catches the shoulder of the glass. */}
      <directionalLight
        position={[0, 1.2, -5]}
        intensity={1.1}
        color="#ffe3b0"
      />

      <Bottle onReady={onReady} reduced={reduced} spin={spin} />

      {/* Grounds the jar so it reads as standing, not floating. */}
      <ContactShadows
        position={[0, -1.16, 0]}
        opacity={0.62}
        scale={5}
        blur={2.6}
        far={2.2}
        resolution={512}
        color={shadowColour}
        frames={1}
      />
    </Canvas>
  );
}
