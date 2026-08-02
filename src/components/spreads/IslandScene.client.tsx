"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";

import { JarModel } from "../product/JarModel";
import { Eruption } from "./Eruption";
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

/**
 * The island's silhouette, as a revolved profile: [radius, height] from the
 * outer skirt up to the crater floor. Concave flanks, a defined rim, and a
 * sunken crater — the shape a volcano actually has.
 *
 * This is the single source of truth for BOTH the mesh and the physics: the
 * eruption's ground collision samples the same curve the lathe renders, so a
 * pepper can never land through the surface it appears to hit.
 */
export const ISLAND_PROFILE: THREE.Vector2[] = [
  new THREE.Vector2(6.9, -0.55),
  new THREE.Vector2(6.5, 0.02),
  new THREE.Vector2(5.6, 0.22),
  new THREE.Vector2(4.6, 0.42),
  new THREE.Vector2(3.7, 0.95),
  new THREE.Vector2(2.95, 1.6),
  new THREE.Vector2(2.3, 2.3),
  new THREE.Vector2(1.72, 2.95),
  new THREE.Vector2(1.22, 3.45),
  new THREE.Vector2(0.9, 3.82),
  new THREE.Vector2(0.74, 3.98),
  new THREE.Vector2(0.6, 3.82),
  new THREE.Vector2(0.56, 3.74),
  new THREE.Vector2(0, 3.72),
];

/**
 * Surface height at a world XZ, by interpolating the profile.
 *
 * The profile doubles back over the crater rim, so only the OUTER descending
 * run is used for collision — a pepper falling outside the rim must land on
 * the flank, not teleport to the crater floor because the radius matched.
 */
export function groundHeight(x: number, z: number): number {
  const r = Math.hypot(x, z);
  if (r >= ISLAND_PROFILE[0].x) return -1.2; // open water
  // Walk the outer flank from the skirt up to the rim.
  for (let i = 0; i < 10; i++) {
    const a = ISLAND_PROFILE[i];
    const b = ISLAND_PROFILE[i + 1];
    if (r <= a.x && r >= b.x) {
      const t = (a.x - r) / Math.max(1e-6, a.x - b.x);
      return a.y + (b.y - a.y) * t;
    }
  }
  // Inside the rim: the crater floor.
  return 3.74;
}

const C = {
  lava: "#f05400",
  ember: "#fcc000",
  trunk: "#5a3a20",
  trunkDark: "#38240f",
} as const;

/**
 * The arc IS the brand name: the island starts in the dark and becomes Sunny
 * Island. Scroll drives one `day` value from 0 to 1 and everything reads from
 * it — sun height, sky, fog, light colour, sea tone, star opacity, and how far
 * the palms have unfurled. Nothing is keyed to elapsed time, so scrubbing
 * backwards puts the island back into night exactly.
 */
const NIGHT = {
  fog: new THREE.Color("#05070d"),
  sea: new THREE.Color("#080c16"),
  sand: new THREE.Color("#2b2436"),
  earth: new THREE.Color("#181524"),
  frond: new THREE.Color("#1b2c24"),
  frondLit: new THREE.Color("#24402f"),
  key: new THREE.Color("#2a3f6b"),
  fill: new THREE.Color("#101a33"),
  hemi: new THREE.Color("#16203c"),
  cloud: new THREE.Color("#161a2c"),
} as const;

const DAY = {
  fog: new THREE.Color("#c8763a"),
  sea: new THREE.Color("#8a4a1e"),
  sand: new THREE.Color("#e8b979"),
  earth: new THREE.Color("#7a4a28"),
  frond: new THREE.Color("#5f8a34"),
  frondLit: new THREE.Color("#9ed155"),
  key: new THREE.Color("#ffb257"),
  fill: new THREE.Color("#ffd9a0"),
  hemi: new THREE.Color("#ffbe73"),
  cloud: new THREE.Color("#ffd0a0"),
} as const;

/** Dawn breaks through the middle of the chapter. */
const dayAt = (p: number) => THREE.MathUtils.smoothstep(p, 0.1, 0.8);

/** Shared scratch — nothing allocates inside useFrame. */
const lerpTo = (
  target: THREE.Color,
  a: THREE.Color,
  b: THREE.Color,
  t: number,
) => target.copy(a).lerp(b, t);

/**
 * A palm built the way a palm actually grows: a trunk that tapers and leans
 * as it rises, a crown of fronds that arc outward and DROOP under their own
 * weight, and a leaflet spine along each frond. Cones on a stick read as
 * programmer-art; the arc and the droop are what sell it.
 */
function Palm({
  position,
  lean,
  scale = 1,
  seed = 0,
  day,
}: {
  position: [number, number, number];
  lean: number;
  scale?: number;
  seed?: number;
  day: { current: number };
}) {
  const rnd = useMemo(() => mulberry(1000 + seed), [seed]);
  const frondRefs = useRef<(THREE.Group | null)[]>([]);
  const frondMats = useRef<(THREE.MeshStandardMaterial | null)[]>([]);

  const trunk = useMemo(() => {
    // Segment the trunk so it can curve; each ring is narrower than the last.
    const segments = 7;
    return Array.from({ length: segments }, (_, i) => {
      const t = i / segments;
      return {
        y: 0.28 + t * 2.1,
        r: 0.115 - t * 0.055,
        // Lean accumulates with height, like a real palm carrying its crown.
        x:
          Math.sin(t * 1.5) *
          0.38 *
          Math.sign(lean || 1) *
          Math.abs(lean || 0.4),
        tilt: t * 0.22 * Math.sign(lean || 1),
      };
    });
  }, [lean]);

  const crown = useMemo(() => {
    const t = 1;
    return {
      y: 0.28 + t * 2.1,
      x:
        Math.sin(t * 1.5) * 0.38 * Math.sign(lean || 1) * Math.abs(lean || 0.4),
    };
  }, [lean]);

  const fronds = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        yaw: (i / 9) * Math.PI * 2 + rnd() * 0.25,
        droop: 0.5 + rnd() * 0.45,
        len: 0.85 + rnd() * 0.4,
        // Each frond opens on its own beat, so the crown blooms rather
        // than snapping open all at once.
        offset: rnd() * 0.24,
      })),
    [rnd],
  );

  useFrame(() => {
    const d = day.current;

    // Closed: fronds pitched upright and drawn in, the way a palm holds a
    // new spear. Open: spread wide and drooping under their own weight.
    for (let i = 0; i < fronds.length; i++) {
      const g = frondRefs.current[i];
      if (!g) continue;
      const open = THREE.MathUtils.clamp((d - fronds[i].offset) / 0.5, 0, 1);
      const eased = 1 - Math.pow(1 - open, 3);
      g.rotation.z = THREE.MathUtils.lerp(-1.12, 0, eased);
      g.scale.setScalar(THREE.MathUtils.lerp(0.72, 1, eased));
    }

    // And the canopy greens as the light arrives.
    for (let i = 0; i < frondMats.current.length; i++) {
      const m = frondMats.current[i];
      if (!m) continue;
      const lit = Math.floor(i / 3) % 2 === 1;
      lerpTo(
        m.color,
        lit ? NIGHT.frondLit : NIGHT.frond,
        lit ? DAY.frondLit : DAY.frond,
        d,
      );
    }
  });

  return (
    <group position={position} scale={scale}>
      {trunk.map((seg, i) => (
        <mesh key={i} position={[seg.x, seg.y, 0]} rotation={[0, 0, -seg.tilt]}>
          <cylinderGeometry args={[seg.r * 0.88, seg.r, 0.34, 6]} />
          <meshStandardMaterial
            color={i % 2 ? C.trunk : C.trunkDark}
            flatShading
          />
        </mesh>
      ))}

      <group position={[crown.x, crown.y, 0]}>
        {/* Coconut cluster at the crown base. */}
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            position={[
              Math.sin((i / 3) * Math.PI * 2) * 0.09,
              -0.04,
              Math.cos((i / 3) * Math.PI * 2) * 0.09,
            ]}
          >
            <icosahedronGeometry args={[0.055, 0]} />
            <meshStandardMaterial color="#3a2412" flatShading />
          </mesh>
        ))}

        {fronds.map((f, i) => (
          <group key={i} rotation={[0, f.yaw, 0]}>
            {/* The unfurling group: closed = pitched upright and drawn in,
                open = spread wide and drooping under its own weight. */}
            <group
              ref={(g) => {
                frondRefs.current[i] = g;
              }}
            >
              {[0, 1, 2].map((seg) => {
                const t = seg / 3;
                const drop = f.droop * t * t;
                return (
                  <mesh
                    key={seg}
                    position={[0.16 + t * f.len, 0.13 - drop * 0.62, 0]}
                    rotation={[0, 0, -0.26 - drop * 1.25]}
                  >
                    <coneGeometry args={[0.115 - t * 0.055, f.len * 0.62, 4]} />
                    <meshStandardMaterial
                      flatShading
                      ref={(m) => {
                        frondMats.current[i * 3 + seg] = m;
                      }}
                    />
                  </mesh>
                );
              })}
            </group>
          </group>
        ))}
      </group>
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
    const p = THREE.MathUtils.clamp((progress.current - 0.5) / 0.4, 0, 1);
    const e = 1 - Math.pow(1 - p, 3);
    g.position.y = 0.34 + 0.34 * e;
    g.rotation.y = -1.1 + 1.45 * e;
    // The jar belongs to the landing beat — before that it is not on stage.
    g.scale.setScalar(0.0034 * e);
  });

  // The raw GLB is ~300 units tall (see legacy PepperSauce.tsx scale=0.0075).
  return (
    <group ref={group} position={[3.6, 0.34, 4.6]} scale={0.0034}>
      <JarModel />
    </group>
  );
}

function Embers({ day }: { day: { current: number } }) {
  const points = useRef<ThreePoints>(null);
  const mat = useRef<THREE.PointsMaterial>(null);
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
    if (p) p.rotation.y = clock.elapsedTime * 0.012;
    // Embers read against night; daylight washes them out.
    if (mat.current) mat.current.opacity = 0.7 - day.current * 0.52;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
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

/* -------------------------------------------------------------------- sky */

/** The sun: a disc climbing out of the sea, with its halo. */
function Sun({ day }: { day: { current: number } }) {
  const group = useRef<THREE.Group>(null);
  const disc = useRef<THREE.MeshBasicMaterial>(null);
  const halo = useRef<THREE.MeshBasicMaterial>(null);
  const cold = useMemo(() => new THREE.Color("#ff5a12"), []);
  const warm = useMemo(() => new THREE.Color("#ffeab0"), []);

  useFrame(() => {
    const d = day.current;
    const g = group.current;
    if (!g) return;
    // Rises where the key light lives, so shadow direction and sun agree.
    g.position.set(-17, THREE.MathUtils.lerp(-4.5, 7, d), -24);
    const heat = THREE.MathUtils.smoothstep(d, 0.04, 0.5);
    if (disc.current) {
      disc.current.opacity = heat;
      lerpTo(disc.current.color, cold, warm, d);
    }
    if (halo.current) halo.current.opacity = heat * 0.38;
  });

  return (
    <group ref={group}>
      <mesh>
        <circleGeometry args={[2.8, 32]} />
        <meshBasicMaterial ref={disc} transparent depthWrite={false} />
      </mesh>
      <mesh position={[0, 0, -0.5]}>
        <circleGeometry args={[9, 32]} />
        <meshBasicMaterial
          ref={halo}
          color="#ff8a2a"
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/** Low-poly cloud bank — it catches the dawn before the island does. */
function Clouds({ day }: { day: { current: number } }) {
  const mats = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const puffs = useMemo(() => {
    const rnd = mulberry(4242);
    return Array.from({ length: 13 }, () => ({
      pos: [(rnd() - 0.5) * 52, 6 + rnd() * 5, -16 - rnd() * 18] as [
        number,
        number,
        number,
      ],
      s: 1.6 + rnd() * 2.8,
      squash: 0.3 + rnd() * 0.2,
    }));
  }, []);

  useFrame(() => {
    const d = day.current;
    for (const m of mats.current) {
      if (!m) continue;
      lerpTo(m.color, NIGHT.cloud, DAY.cloud, d);
      m.opacity = 0.26 + d * 0.44;
    }
  });

  return (
    <group>
      {puffs.map((p, i) => (
        <mesh key={i} position={p.pos} scale={[p.s, p.s * p.squash, p.s]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            ref={(m) => {
              mats.current[i] = m;
            }}
            flatShading
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Stars, which the dawn puts out. */
function Stars({ day }: { day: { current: number } }) {
  const mat = useRef<THREE.PointsMaterial>(null);
  const positions = useMemo(() => {
    const rnd = mulberry(90210);
    const arr = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      const theta = rnd() * Math.PI * 2;
      const phi = rnd() * 0.4 + 0.14;
      const r = 62;
      arr[i * 3] = Math.cos(theta) * Math.cos(phi) * r;
      arr[i * 3 + 1] = Math.sin(phi) * r + 5;
      arr[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * r;
    }
    return arr;
  }, []);

  useFrame(() => {
    if (mat.current)
      mat.current.opacity = Math.max(0, 0.85 - day.current * 1.6);
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
        color="#cfe0ff"
        size={0.32}
        sizeAttenuation
        transparent
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
    const radius = 20.5 - a * 8.2;
    const height = 5.4 - a * 1.6;

    const ox = Math.sin(angle) * radius;
    const oy = height;
    const oz = Math.cos(angle) * radius;

    // The landing pose: over the shallows, looking back at the jar on the
    // beach with the island rising behind it.
    const ex = 6.4;
    const ey = 1.35;
    const ez = 7.8;

    camera.position.set(
      THREE.MathUtils.lerp(ox, ex, b) + drift.current.x * 0.5,
      THREE.MathUtils.lerp(oy, ey, b) + drift.current.y * 0.3,
      THREE.MathUtils.lerp(oz, ez, b),
    );

    look.set(
      THREE.MathUtils.lerp(0, 3.6, b),
      THREE.MathUtils.lerp(2.1 - 0.3 * a, 1.15, b),
      THREE.MathUtils.lerp(0, 4.6, b),
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
  // One place turns scroll into daylight; every other part reads `day`.
  const day = useRef(0);
  const fogRef = useRef<THREE.Fog>(null);
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const fillRef = useRef<THREE.DirectionalLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const seaRef = useRef<THREE.MeshStandardMaterial>(null);
  const sunPathRef = useRef<THREE.MeshBasicMaterial>(null);
  const earthRef = useRef<THREE.MeshStandardMaterial>(null);
  const sandRef = useRef<THREE.MeshStandardMaterial>(null);
  const bgRef = useRef<THREE.Color>(null);

  useFrame(() => {
    const d = (day.current = dayAt(progress.current));

    if (bgRef.current) lerpTo(bgRef.current, NIGHT.fog, DAY.fog, d);
    if (fogRef.current) {
      lerpTo(fogRef.current.color, NIGHT.fog, DAY.fog, d);
      fogRef.current.near = THREE.MathUtils.lerp(17, 30, d);
      fogRef.current.far = THREE.MathUtils.lerp(40, 80, d);
    }
    if (keyRef.current) {
      lerpTo(keyRef.current.color, NIGHT.key, DAY.key, d);
      keyRef.current.intensity = 0.7 + d * 3;
      keyRef.current.position.set(-13, -1 + d * 8, -10);
    }
    if (fillRef.current) {
      lerpTo(fillRef.current.color, NIGHT.fill, DAY.fill, d);
      fillRef.current.intensity = 0.25 + d * 0.9;
    }
    if (hemiRef.current) {
      lerpTo(hemiRef.current.color, NIGHT.hemi, DAY.hemi, d);
      hemiRef.current.intensity = 0.3 + d * 0.8;
    }
    if (ambientRef.current) ambientRef.current.intensity = 0.14 + d * 0.44;
    if (seaRef.current) {
      lerpTo(seaRef.current.color, NIGHT.sea, DAY.sea, d);
      seaRef.current.roughness = 0.62 - d * 0.3;
    }
    if (sunPathRef.current) sunPathRef.current.opacity = d * 0.8;
    if (earthRef.current)
      lerpTo(earthRef.current.color, NIGHT.earth, DAY.earth, d);
    if (sandRef.current) lerpTo(sandRef.current.color, NIGHT.sand, DAY.sand, d);
  });
  const rocks = useMemo(() => {
    const rnd = mulberry(1900);
    return [0, 1, 2, 3].map((i) => ({
      // Offset out of the landing sector so the final beat frames the jar,
      // not a boulder.
      ...(() => {
        const x = Math.sin(i * 2.2 + 2.1) * (5.2 + rnd());
        const z = Math.cos(i * 2.2 + 2.1) * (5.4 + rnd());
        return {
          pos: [x, groundHeight(x, z) + 0.05, z] as [number, number, number],
        };
      })(),
      s: 0.2 + rnd() * 0.3,
    }));
  }, []);

  return (
    <>
      <color ref={bgRef} attach="background" args={["#05070d"]} />
      <fog ref={fogRef} attach="fog" args={["#05070d", 17, 40]} />
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
        <circleGeometry args={[46, 44]} />
        <meshStandardMaterial
          ref={seaRef}
          flatShading
          metalness={0.4}
          roughness={0.62}
        />
      </mesh>
      {/* The sun's path across the water, arriving with the light. */}
      <mesh rotation={[-Math.PI / 2, 0, 0.6]} position={[-10, 0.012, -7]}>
        <planeGeometry args={[3.6, 38]} />
        <meshBasicMaterial
          ref={sunPathRef}
          color="#ffb257"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* The island as ONE lathed form. Three stacked cones read as stacked
          pyramids because each has its own hard silhouette break; a single
          revolved profile gives the concave flank and crater rim a real
          volcano has. Profile lives in ISLAND_PROFILE so the ground-collision
          solver and the mesh cannot disagree. */}
      <mesh>
        <latheGeometry args={[ISLAND_PROFILE, 11]} />
        <meshStandardMaterial ref={earthRef} flatShading />
      </mesh>

      {/* Beach ring — the wet sand shelf where the land meets the water. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <ringGeometry args={[4.6, 6.5, 11]} />
        <meshStandardMaterial
          ref={sandRef}
          flatShading
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Molten crater floor, sunk inside the rim. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 3.74, 0]}>
        <circleGeometry args={[0.56, 9]} />
        <meshStandardMaterial
          color={C.lava}
          emissive={C.lava}
          emissiveIntensity={2.6}
        />
      </mesh>
      {/* The vent's own glow, so the eruption launches out of light. */}
      <pointLight
        position={[0, 3.95, 0]}
        color={C.lava}
        intensity={11}
        distance={8}
        decay={2}
      />

      {rocks.map((r, i) => (
        <mesh key={i} position={r.pos} scale={r.s}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#3a2718" flatShading />
        </mesh>
      ))}

      {/* Seated on the lathed surface via the shared solver, so no palm
          floats above the sand or sinks into the flank. */}
      {(
        [
          { x: 3.2, z: 2.9, lean: -0.12, scale: 1 },
          { x: 4.3, z: 0.6, lean: 0.16, scale: 0.85 },
          { x: -3.1, z: 3.6, lean: 0.1, scale: 1.1 },
          { x: -4.6, z: -1.1, lean: -0.2, scale: 0.9 },
          { x: 0.9, z: 4.4, lean: 0.08, scale: 0.95 },
          { x: -1.6, z: -4.2, lean: -0.14, scale: 0.8 },
        ] as const
      ).map((t, i) => (
        <Palm
          key={i}
          position={[t.x, groundHeight(t.x, t.z) - 0.1, t.z]}
          lean={t.lean}
          scale={t.scale}
          seed={i}
          day={day}
        />
      ))}

      <Embers day={day} />
      {/* useGLTF suspends — without a boundary neither the jar nor the
          eruption ever mounts. */}
      <Suspense fallback={null}>
        <Eruption progress={progress} />
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
      camera={{ position: [0, 5.4, 20.5], fov: 38 }}
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
