"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { InstancedMesh, Mesh } from "three";
import * as THREE from "three";

import { groundHeight } from "./IslandScene.client";

/**
 * The eruption — the brand's red and yellow peppers thrown out of the vent,
 * tumbling down the flanks and BOUNCING off the ground before coming to rest.
 *
 * Architecture: trajectories are baked, not simulated live.
 *
 * Real bouncing needs collision state, which live simulation would make
 * dependent on frame history — and this scene is scrubbed, so scrolling back
 * up must rewind the eruption exactly. So each pepper's flight is integrated
 * ONCE on mount against the island's own surface curve and stored as a
 * keyframe track. At runtime a frame is one lookup and a lerp: deterministic,
 * scrub-safe, and effectively free.
 *
 * Collision samples `groundHeight` from IslandScene — the same profile the
 * lathe renders — so a pepper cannot fall through the surface it hits.
 *
 * Scale note: these models are authored ~1 unit across (GLB accessor bounds
 * -0.53…0.54), NOT the ~300-unit convention the jar GLB uses.
 */

const RED_URL =
  "https://sunnyisland.s3.us-east-2.amazonaws.com/media/glb/redPepper.glb";
const YELLOW_URL =
  "https://sunnyisland.s3.us-east-2.amazonaws.com/media/glb/yellowPepper.glb";

/** The crater, which the lathed island centres on the origin. */
const VENT = new THREE.Vector3(0, 3.9, 0);

const COUNT = 13;
const GRAVITY = 9.2;
/** Energy kept through a bounce. Peppers are soft — they do not ping. */
const RESTITUTION = 0.42;
/** Horizontal energy kept on contact. */
const FRICTION = 0.72;
const SPIN_DAMP = 0.55;

const STEPS = 190;
const DT = 1 / 60;

function mulberry(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Track {
  /** STEPS × 3 positions. */
  pos: Float32Array;
  /** STEPS × 4 quaternions. */
  quat: Float32Array;
  scale: number;
  delay: number;
}

/** Integrate one pepper's whole flight, bouncing off the island, and bake it. */
function bake(seed: number, index: number): Track {
  const rnd = mulberry(seed * 977 + index * 31);

  const angle = rnd() * Math.PI * 2;
  const spread = 1.1 + rnd() * 1.9;
  const vel = new THREE.Vector3(
    Math.cos(angle) * spread,
    5.0 + rnd() * 2.6,
    Math.sin(angle) * spread,
  );
  const pos = VENT.clone();
  const radius = 0.09 + rnd() * 0.05;

  const spin = new THREE.Vector3(
    rnd() * 7 - 3.5,
    rnd() * 7 - 3.5,
    rnd() * 7 - 3.5,
  );
  const orient = new THREE.Quaternion();
  const axis = new THREE.Vector3();
  const step = new THREE.Quaternion();
  const normal = new THREE.Vector3();
  const bounce = new THREE.Vector3();
  const tangent = new THREE.Vector3();

  const posOut = new Float32Array(STEPS * 3);
  const quatOut = new Float32Array(STEPS * 4);

  for (let i = 0; i < STEPS; i++) {
    vel.y -= GRAVITY * DT;
    pos.addScaledVector(vel, DT);

    const floor = groundHeight(pos.x, pos.z) + radius;

    if (pos.y < floor) {
      pos.y = floor;

      // Surface normal from the local gradient of the same profile the mesh
      // uses — so peppers slide down a flank instead of bouncing straight up
      // off a slope they visibly landed on the side of.
      const e = 0.12;
      normal
        .set(
          groundHeight(pos.x - e, pos.z) - groundHeight(pos.x + e, pos.z),
          2 * e,
          groundHeight(pos.x, pos.z - e) - groundHeight(pos.x, pos.z + e),
        )
        .normalize();

      const into = vel.dot(normal);
      if (into < 0) {
        // Reflect along the normal, bleed energy across the tangent.
        bounce.copy(normal).multiplyScalar(into);
        tangent.copy(vel).sub(bounce);
        vel
          .copy(tangent)
          .multiplyScalar(FRICTION)
          .addScaledVector(bounce, -RESTITUTION);
        spin.multiplyScalar(SPIN_DAMP);
      }

      // Settle: once it is barely moving, stop it dead so nothing jitters.
      if (vel.lengthSq() < 0.05) {
        vel.set(0, 0, 0);
        spin.set(0, 0, 0);
      }
    }

    if (spin.lengthSq() > 1e-6) {
      axis.copy(spin).normalize();
      step.setFromAxisAngle(axis, spin.length() * DT);
      orient.premultiply(step);
    }

    posOut[i * 3] = pos.x;
    posOut[i * 3 + 1] = pos.y;
    posOut[i * 3 + 2] = pos.z;
    quatOut[i * 4] = orient.x;
    quatOut[i * 4 + 1] = orient.y;
    quatOut[i * 4 + 2] = orient.z;
    quatOut[i * 4 + 3] = orient.w;
  }

  return {
    pos: posOut,
    quat: quatOut,
    scale: 0.15 + rnd() * 0.1,
    delay: rnd() * 0.3,
  };
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

  const source = useMemo(() => {
    let found: Mesh | null = null;
    scene.traverse((o) => {
      const m = o as Mesh;
      if (!found && m.isMesh) found = m;
    });
    return found;
  }, [scene]);

  const tracks = useMemo(
    () => Array.from({ length: COUNT }, (_, i) => bake(seed, i)),
    [seed],
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const qa = useMemo(() => new THREE.Quaternion(), []);
  const qb = useMemo(() => new THREE.Quaternion(), []);

  // The GLB's own material renders near-black under this scene's light budget.
  // A self-lit material keeps the peppers legible and reads as carried heat.
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: tint,
        emissive: tint,
        emissiveIntensity: 0.75,
        roughness: 0.4,
        metalness: 0,
      }),
    [tint],
  );
  useEffect(() => () => material.dispose(), [material]);

  useFrame(() => {
    const mesh = ref.current;
    if (!mesh) return;

    // Fires during the WIDE beat, while the whole volcano is still in frame —
    // an eruption the camera is too close to see is not an eruption.
    const p = THREE.MathUtils.clamp((progress.current - 0.03) / 0.42, 0, 1);

    for (let i = 0; i < tracks.length; i++) {
      const tr = tracks[i];
      const local = p * 1.35 - tr.delay;

      if (local <= 0) {
        dummy.position.set(VENT.x, VENT.y - 0.9, VENT.z);
        dummy.quaternion.identity();
        dummy.scale.setScalar(0.0001);
      } else {
        const f = Math.min(local, 1) * (STEPS - 1);
        const i0 = Math.floor(f);
        const i1 = Math.min(STEPS - 1, i0 + 1);
        const a = f - i0;

        dummy.position.set(
          THREE.MathUtils.lerp(tr.pos[i0 * 3], tr.pos[i1 * 3], a),
          THREE.MathUtils.lerp(tr.pos[i0 * 3 + 1], tr.pos[i1 * 3 + 1], a),
          THREE.MathUtils.lerp(tr.pos[i0 * 3 + 2], tr.pos[i1 * 3 + 2], a),
        );
        qa.set(
          tr.quat[i0 * 4],
          tr.quat[i0 * 4 + 1],
          tr.quat[i0 * 4 + 2],
          tr.quat[i0 * 4 + 3],
        );
        qb.set(
          tr.quat[i1 * 4],
          tr.quat[i1 * 4 + 1],
          tr.quat[i1 * 4 + 2],
          tr.quat[i1 * 4 + 3],
        );
        dummy.quaternion.slerpQuaternions(qa, qb, a);
        dummy.scale.setScalar(tr.scale * Math.min(1, local * 8));
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
    />
  );
}

export function Eruption({ progress }: { progress: { current: number } }) {
  return (
    <group>
      <Swarm url={RED_URL} seed={7301} progress={progress} tint="#e0331b" />
      <Swarm url={YELLOW_URL} seed={9142} progress={progress} tint="#f8b400" />
    </group>
  );
}

useGLTF.preload(RED_URL);
useGLTF.preload(YELLOW_URL);
