"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { Group, InstancedMesh, Mesh } from "three";
import * as THREE from "three";

/**
 * The eruption — the brand's own red and yellow pepper models launched from
 * the volcano on scroll.
 *
 * Scale note: these models are authored ~1 unit across (GLB accessor bounds
 * -0.53…0.54), NOT the ~300-unit convention the jar GLB uses. Assuming they
 * matched made them microscopic and invisible.
 *
 * Instanced, not cloned: two `InstancedMesh` draw calls carry all 26 peppers,
 * so the whole effect costs the scene two draws and no per-object overhead.
 * Trajectories are deterministic (seeded, closed-form ballistics evaluated
 * from scroll progress) — no physics engine, no simulation state, and every
 * frame is a pure function of the scrubbed value, so scrubbing backwards
 * rewinds the eruption exactly.
 */

const RED_URL =
  "https://sunnyisland.s3.us-east-2.amazonaws.com/media/glb/redPepper.glb";
const YELLOW_URL =
  "https://sunnyisland.s3.us-east-2.amazonaws.com/media/glb/yellowPepper.glb";

/** The volcano's ember tip, in island world space. */
const VENT = new THREE.Vector3(-0.7, 4.1, -1);
const GRAVITY = 3.4;
const COUNT = 13;

function mulberry(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Shot {
  vx: number;
  vy: number;
  vz: number;
  delay: number;
  spin: THREE.Vector3;
  scale: number;
}

function shots(seed: number): Shot[] {
  const rnd = mulberry(seed);
  return Array.from({ length: COUNT }, () => {
    const angle = rnd() * Math.PI * 2;
    const spread = 0.75 + rnd() * 1.75;
    return {
      vx: Math.cos(angle) * spread,
      vz: Math.sin(angle) * spread,
      vy: 1.5 + rnd() * 1.15,
      delay: rnd() * 0.42,
      spin: new THREE.Vector3(rnd() * 4 - 2, rnd() * 4 - 2, rnd() * 4 - 2),
      scale: 0.3 + rnd() * 0.22,
    };
  });
}

function Swarm({
  url,
  seed,
  progress,
  tint,
}: {
  url: string;
  seed: number;
  progress: { current: number };
  /** Emissive tint — these came out of a volcano, so they carry its heat. */
  tint: string;
}) {
  const ref = useRef<InstancedMesh>(null);
  const { scene } = useGLTF(url);

  // The pepper GLBs carry a single `modelobj` mesh — reuse its geometry and
  // material directly so instancing is possible at all.
  const source = useMemo(() => {
    let found: Mesh | null = null;
    scene.traverse((o) => {
      const m = o as Mesh;
      if (!found && m.isMesh) found = m;
    });
    return found;
  }, [scene]);

  const paths = useMemo(() => shots(seed), [seed]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // The GLB's own material renders near-black under this scene's light budget.
  // A self-lit material keeps the peppers legible against the night sky and
  // reads as heat carried out of the vent.
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: tint,
        emissive: tint,
        emissiveIntensity: 0.85,
        roughness: 0.35,
        metalness: 0,
        flatShading: false,
      }),
    [tint],
  );

  useEffect(() => () => material.dispose(), [material]);

  useFrame(() => {
    const mesh = ref.current;
    if (!mesh) return;

    // Fires during the WIDE beat, while the whole volcano is still in frame —
    // an eruption the camera is too close to see is not an eruption.
    const p = THREE.MathUtils.clamp((progress.current - 0.03) / 0.34, 0, 1);

    for (let i = 0; i < paths.length; i++) {
      const s = paths[i];
      const t = Math.max(0, p * 2.6 - s.delay);

      if (t <= 0) {
        // Still in the vent — parked out of sight.
        dummy.position.set(VENT.x, VENT.y - 0.8, VENT.z);
        dummy.scale.setScalar(0.0001);
      } else {
        dummy.position.set(
          VENT.x + s.vx * t,
          VENT.y + s.vy * t - 0.5 * GRAVITY * t * t,
          VENT.z + s.vz * t,
        );
        dummy.rotation.set(s.spin.x * t, s.spin.y * t, s.spin.z * t);
        dummy.scale.setScalar(s.scale * Math.min(1, t * 5));
      }

      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  if (!source) return null;
  const mesh = source as Mesh;

  return (
    <instancedMesh
      ref={ref}
      args={[mesh.geometry, material, COUNT]}
      frustumCulled={false}
      castShadow={false}
    />
  );
}

export function Eruption({ progress }: { progress: { current: number } }) {
  const group = useRef<Group>(null);
  return (
    <group ref={group}>
      <Swarm url={RED_URL} seed={7301} progress={progress} tint="#e0331b" />
      <Swarm url={YELLOW_URL} seed={9142} progress={progress} tint="#f8b400" />
    </group>
  );
}

useGLTF.preload(RED_URL);
useGLTF.preload(YELLOW_URL);
