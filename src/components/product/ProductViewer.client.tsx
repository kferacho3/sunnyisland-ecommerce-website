"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";

import { useEffect, useRef, useState } from "react";

import { JarModel } from "./JarModel";
import type { Group } from "three";

/**
 * The bottle.
 *
 * Deliberately not the old /explore/products scene, which shipped physics,
 * bloom, a fire shader, floating peppers, four camera modes and a permanently
 * running frame loop for 536 kB of route JS.
 *
 * This is one model, one lighting rig, one guided move, then optional drag —
 * and it stops rendering entirely once it settles.
 */

const SETTLE_Y = 0.35;

function StageCamera() {
  const { camera, invalidate } = useThree();
  useEffect(() => {
    // The island scene's landing pose, translated to a jar at the origin —
    // the one view of this model empirically proven to read clean.
    camera.position.set(2.5, 0.5, 2.9);
    camera.lookAt(0, 0.4, 0);
    invalidate();
  }, [camera, invalidate]);
  return null;
}

function Bottle({
  onReady,
  modelScale,
}: {
  onReady: () => void;
  modelScale: number;
}) {
  const group = useRef<Group>(null);
  const { invalidate } = useThree();

  const start = useRef<number | null>(null);
  const settled = useRef(false);
  const drag = useRef<{ active: boolean; lastX: number; y: number }>({
    active: false,
    lastX: 0,
    y: 0,
  });

  useEffect(() => {
    onReady();
    invalidate();
  }, [onReady, invalidate]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    if (drag.current.active) {
      g.rotation.y = drag.current.y;
      return;
    }

    if (settled.current) return;

    // Guided entrance: ease to the settle angle, then stop asking for frames.
    start.current ??= state.clock.elapsedTime;
    const t = Math.min(1, (state.clock.elapsedTime - start.current) / 1.6);
    const eased = 1 - Math.pow(1 - t, 3);
    g.rotation.y = SETTLE_Y - 0.9 + 0.9 * eased;
    g.position.y = -0.55 - 0.06 * (1 - eased);

    if (t >= 1) {
      settled.current = true;
      drag.current.y = g.rotation.y;
    } else {
      invalidate();
    }
    void delta;
  });

  // Pointer drag, enabled from the moment the guided move finishes.
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (!settled.current) return;
      drag.current.active = true;
      drag.current.lastX = e.clientX;
    };
    const onMove = (e: PointerEvent) => {
      if (!drag.current.active) return;
      drag.current.y += (e.clientX - drag.current.lastX) * 0.008;
      drag.current.lastX = e.clientX;
      invalidate();
    };
    const onUp = () => {
      drag.current.active = false;
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [invalidate]);

  return (
    <group ref={group} position={[0, -0.55, 0]}>
      <JarModel scale={modelScale} />
    </group>
  );
}

export default function ProductViewer({
  onReady,
  cameraZ = 0,
  scale = 0.0034,
}: {
  onReady: () => void;
  /** Hero relay pulls back slightly to match the film's final pose. */
  cameraZ?: number;
  scale?: number;
}) {
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    // 2 on desktop, 1.5 on coarse pointers — beyond that the label gains
    // nothing and the fill cost is real.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setDpr(Math.min(window.devicePixelRatio, coarse ? 1.5 : 2));
  }, []);

  return (
    <Canvas
      frameloop="demand"
      dpr={dpr}
      camera={{ position: [2.5, 0.5, 2.9], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      {/* Deterministic light rig — no Environment preset: drei fetches those
          HDRs from a CDN at runtime, and the fetch suspends the entire canvas
          when it stalls. Plain lights render the same everywhere, always. */}
      <StageCamera />
      <ambientLight intensity={0.5} color="#ffd9b0" />
      <hemisphereLight args={["#ff9a4d", "#20100a", 0.55]} />
      <directionalLight
        position={[-9, 2.6, 6]}
        intensity={3.1}
        color="#f05400"
      />
      <directionalLight position={[6, 4, -8]} intensity={1.2} color="#fcc000" />
      <Bottle onReady={onReady} modelScale={scale} />
    </Canvas>
  );
}
