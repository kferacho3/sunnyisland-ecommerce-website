"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";

import { JarModel } from "../product/JarModel";
import { Suspense, useMemo, useRef } from "react";
import type { Group, Points as ThreePoints } from "three";
import * as THREE from "three";

/**
 * The island scene proper — every Three/R3F import lives HERE, behind the
 * chapter's dynamic import, so none of it touches the initial bundle.
 */

/* ---------------------------------------------------------- deterministic */

/** Seeded PRNG — render-stable scatter, no Math.random during render. */
function mulberry(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ----------------------------------------------------------------- scene */

const C = {
  sea: "#160b07",
  seaLit: "#2a120a",
  sand: "#d9a45c",
  earth: "#4a2c18",
  peak: "#241209",
  lava: "#f05400",
  frond: "#3f5c2a",
  frondLit: "#5d8438",
  trunk: "#4a2f1a",
  ember: "#fcc000",
} as const;

function Palm({
  position,
  lean,
  scale = 1,
}: {
  position: [number, number, number];
  lean: number;
  scale?: number;
}) {
  return (
    <group position={position} rotation={[0, 0, lean]} scale={scale}>
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.07, 0.13, 1.8, 5]} />
        <meshStandardMaterial color={C.trunk} flatShading />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[0, 1.82, 0]}
          rotation={[0.6 + (i % 2) * 0.25, (i / 5) * Math.PI * 2, 0]}
        >
          <coneGeometry args={[0.24, 1.5, 4]} />
          <meshStandardMaterial
            color={i % 2 ? C.frond : C.frondLit}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

function Jar({ progress }: { progress: { current: number } }) {
  const group = useRef<Group>(null);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    // The jar wakes as the camera arrives: rises from the sand and turns
    // its label to meet you.
    const p = THREE.MathUtils.clamp((progress.current - 0.55) / 0.45, 0, 1);
    const e = 1 - Math.pow(1 - p, 3);
    g.position.y = 0.55 + 0.4 * e;
    g.rotation.y = -1.1 + 1.45 * e;
  });

  // The raw GLB is ~300 units tall (see legacy PepperSauce.tsx scale=0.0075).
  return (
    <group ref={group} position={[2.6, 0.55, 3.4]} scale={0.0034}>
      <JarModel />
    </group>
  );
}

function Embers() {
  const points = useRef<ThreePoints>(null);
  const positions = useMemo(() => {
    const rnd = mulberry(20260802);
    const arr = new Float32Array(140 * 3);
    for (let i = 0; i < 140; i++) {
      arr[i * 3] = (rnd() - 0.5) * 22;
      arr[i * 3 + 1] = rnd() * 7;
      arr[i * 3 + 2] = (rnd() - 0.5) * 22;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const p = points.current;
    if (!p) return;
    p.rotation.y = clock.elapsedTime * 0.012;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={C.ember}
        size={0.05}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Rig({
  progress,
  drift,
}: {
  progress: { current: number };
  drift: { current: { x: number; y: number } };
}) {
  const { camera } = useThree();
  const look = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const p = progress.current;
    // Beat A (0→0.55): the approach — a slow orbit crossing the water.
    // Beat B (0.55→1): the landing — a HAND-PLACED shot, lerped to, so the
    // camera can never fly through the palm belt on its way to the jar.
    const a = THREE.MathUtils.smoothstep(p, 0, 0.55);
    const b = THREE.MathUtils.smoothstep(p, 0.55, 1);

    const angle = -0.45 + a * 1.05;
    const radius = 13.5 - a * 6.6;
    const height = 2.5 - a * 0.7;

    const ox = Math.sin(angle) * radius;
    const oy = height;
    const oz = Math.cos(angle) * radius;

    // The landing pose: over the shallows, looking back at the jar on the
    // beach with the island rising behind it.
    const ex = 5.1;
    const ey = 1.05;
    const ez = 6.3;

    camera.position.set(
      THREE.MathUtils.lerp(ox, ex, b) + drift.current.x * 0.5,
      THREE.MathUtils.lerp(oy, ey, b) + drift.current.y * 0.3,
      THREE.MathUtils.lerp(oz, ez, b),
    );

    look.set(
      THREE.MathUtils.lerp(0, 2.6, b),
      THREE.MathUtils.lerp(0.9 - 0.15 * a, 0.95, b),
      THREE.MathUtils.lerp(0, 3.4, b),
    );
    camera.lookAt(look);
  });

  return null;
}

function IslandScene({
  progress,
  drift,
}: {
  progress: { current: number };
  drift: { current: { x: number; y: number } };
}) {
  const rocks = useMemo(() => {
    const rnd = mulberry(1900);
    return [0, 1, 2, 3].map((i) => ({
      // Offset out of the landing sector so the final beat frames the jar,
      // not a boulder.
      pos: [
        Math.sin(i * 2.2 + 2.1) * (5.2 + rnd()),
        0.16,
        Math.cos(i * 2.2 + 2.1) * (5.4 + rnd()),
      ] as [number, number, number],
      s: 0.2 + rnd() * 0.3,
    }));
  }, []);

  return (
    <>
      <fog attach="fog" args={["#080503", 16, 36]} />
      <ambientLight intensity={0.35} color="#ffd9b0" />
      {/* Sunset key, low across the water. */}
      <directionalLight
        position={[-9, 2.2, 6]}
        intensity={2.2}
        color="#f05400"
      />
      {/* Gold rim from behind the peak. */}
      <directionalLight position={[6, 4, -8]} intensity={0.9} color="#fcc000" />

      {/* The sea. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[34, 40]} />
        <meshStandardMaterial
          color={C.sea}
          flatShading
          metalness={0.35}
          roughness={0.6}
        />
      </mesh>
      {/* Sun-path glint on the water. */}
      <mesh rotation={[-Math.PI / 2, 0, 0.35]} position={[-6, 0.01, 4]}>
        <planeGeometry args={[2.4, 16]} />
        <meshBasicMaterial color="#5a1f0c" transparent opacity={0.9} />
      </mesh>

      {/* The island: beach shelf, earth, peak, ember tip. */}
      <mesh position={[0, 0.12, 0]}>
        <coneGeometry args={[6.4, 0.9, 9]} />
        <meshStandardMaterial color={C.sand} flatShading />
      </mesh>
      <mesh position={[-0.4, 0.9, -0.6]}>
        <coneGeometry args={[4.4, 2.4, 8]} />
        <meshStandardMaterial color={C.earth} flatShading />
      </mesh>
      <mesh position={[-0.7, 2.6, -1]}>
        <coneGeometry args={[2.1, 2.6, 7]} />
        <meshStandardMaterial color={C.peak} flatShading />
      </mesh>
      <mesh position={[-0.7, 3.95, -1]}>
        <coneGeometry args={[0.5, 0.5, 6]} />
        <meshStandardMaterial
          color={C.lava}
          emissive={C.lava}
          emissiveIntensity={1.6}
          flatShading
        />
      </mesh>

      {rocks.map((r, i) => (
        <mesh key={i} position={r.pos} scale={r.s}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={C.earth} flatShading />
        </mesh>
      ))}

      <Palm position={[2.1, 0.5, 2.2]} lean={-0.12} />
      <Palm position={[3.4, 0.42, 1.2]} lean={0.16} scale={0.85} />
      <Palm position={[-2.6, 0.5, 3.1]} lean={0.1} scale={1.1} />
      <Palm position={[-4, 0.45, -0.6]} lean={-0.2} scale={0.9} />

      <Embers />
      {/* useGLTF suspends — without a boundary the jar never mounts. */}
      <Suspense fallback={null}>
        <Jar progress={progress} />
      </Suspense>
      <Rig progress={progress} drift={drift} />
    </>
  );
}

export default function IslandStage({
  progress,
  drift,
  dpr,
  onReady,
}: {
  progress: { current: number };
  drift: { current: { x: number; y: number } };
  dpr: number;
  onReady: (invalidate: () => void) => void;
}) {
  return (
    <Canvas
      frameloop="demand"
      dpr={dpr}
      camera={{ position: [0, 2.4, 15.5], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ invalidate }) => {
        onReady(invalidate);
        invalidate();
      }}
      className="absolute inset-0"
    >
      <IslandScene progress={progress} drift={drift} />
    </Canvas>
  );
}
