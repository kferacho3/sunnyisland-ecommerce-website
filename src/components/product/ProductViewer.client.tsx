"use client";

import { Environment, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";

const MODEL_URL =
  "https://sunnyisland.s3.us-east-2.amazonaws.com/media/glb/SunnyIslandPepperSauceFINAL.glb";

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

const SETTLE_Y = Math.PI * 0.16;

function Bottle({
  onReady,
  modelScale,
}: {
  onReady: () => void;
  modelScale: number;
}) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_URL);
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

  // Dispose everything the loader created for this scene on unmount.
  useEffect(() => {
    const captured = scene;
    return () => {
      captured.traverse((o) => {
        const m = o as Mesh;
        if (!m.isMesh) return;
        m.geometry?.dispose();
        const mat = m.material;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      useGLTF.clear(MODEL_URL);
    };
  }, [scene]);

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
    g.rotation.y = -0.5 + (SETTLE_Y + 0.5) * eased;
    g.position.y = -0.06 * (1 - eased);

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
    <group ref={group} position={[0, -0.35, 0]}>
      <primitive object={scene} scale={modelScale} />
    </group>
  );
}

export default function ProductViewer({
  onReady,
  cameraZ = 3.1,
  scale = 2.1,
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
      camera={{ position: [0, 0.1, cameraZ], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      {/* One warm key raking the label, one cool fill for the glass edge. */}
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[2.6, 3.2, 2.4]}
        intensity={2.6}
        color="#FCC000"
      />
      <directionalLight
        position={[-2.8, 0.6, -1.6]}
        intensity={0.7}
        color="#8FB8D8"
      />
      <Environment preset="studio" environmentIntensity={0.35} />
      <Bottle onReady={onReady} modelScale={scale} />
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
