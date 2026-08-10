"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";

import { JarModel } from "../product/JarModel";
import { Eruption } from "./Eruption";
import { segmentAt } from "./island-ledger";
import { Suspense, useEffect, useMemo, useRef } from "react";
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

/* Dawn is no longer a global smoothstep over progress — each chapter in
   island-ledger.ts authors its own `day`, and the scene interpolates between
   them. Moving a chapter now moves its light with it. */

/** Shared scratch — nothing allocates inside useFrame. */
const lerpTo = (
  target: THREE.Color,
  a: THREE.Color,
  b: THREE.Color,
  t: number,
) => target.copy(a).lerp(b, t);

/* ------------------------------------------------------------------ palms */

/**
 * Where the palms stand. Seated on the lathed surface via the shared solver,
 * so no palm floats above the sand or sinks into the flank.
 */
const PALM_PLACEMENTS = [
  // The original six.
  { x: 3.2, z: 2.9, lean: -0.12, scale: 1 },
  { x: 4.3, z: 0.6, lean: 0.16, scale: 0.85 },
  { x: -3.1, z: 3.6, lean: 0.1, scale: 1.1 },
  { x: -4.6, z: -1.1, lean: -0.2, scale: 0.9 },
  { x: 0.9, z: 4.4, lean: 0.08, scale: 0.95 },
  { x: -1.6, z: -4.2, lean: -0.14, scale: 0.8 },
  // Eight more, affordable only because the grove is now instanced: every
  // additional palm is 37 more instances across the SAME four draw calls, and
  // 444 triangles against a scene that was never triangle-bound. Six palms on
  // a whole island read as a diagram; a real stand gives the silhouette
  // overlap and depth layering the skill's art direction asks for.
  // Kept clear of the jar's landing anchor at [3.6, ·, 4.6] so the closing
  // composition frames the product, not a trunk.
  { x: 2.1, z: -3.4, lean: 0.11, scale: 0.92 },
  { x: -2.4, z: -2.2, lean: -0.09, scale: 1.05 },
  { x: 5.0, z: -1.8, lean: 0.18, scale: 0.78 },
  { x: -5.1, z: 1.4, lean: -0.16, scale: 0.88 },
  { x: 1.4, z: 5.2, lean: 0.13, scale: 0.7 },
  { x: -0.6, z: 5.5, lean: -0.07, scale: 0.82 },
  { x: 5.2, z: 2.4, lean: -0.15, scale: 0.75 },
  { x: -3.8, z: -3.9, lean: 0.2, scale: 0.95 },
] as const;

const TRUNK_SEGMENTS = 7;
const FRONDS_PER_PALM = 9;
const LEAFLETS_PER_FROND = 3;

/**
 * The palms, instanced.
 *
 * They used to be six <Palm> components, each rendering 37 separate <mesh>
 * elements with inline JSX geometry and materials — so 222 meshes, 222 unique
 * THREE.Geometry instances and 222 unique THREE.Material instances, for six
 * trees. Measured: 222 of the scene's 246 draw calls (90%) for 7% of its
 * triangles, plus ~500 R3F node creations at mount.
 *
 * Every part turns out to be one unit primitive under non-uniform scale, which
 * is what makes instancing exact rather than approximate:
 *
 *   trunk    cylinder(0.88, 1, 1, 6) · scale [r, 0.34, r]  ≡ cylinder(0.88r, r, 0.34, 6)
 *   coconut  icosahedron(1, 0)       · scale 0.055         ≡ icosahedron(0.055, 0)
 *   leaflet  cone(1, 1, 4)           · scale [rad, h, rad] ≡ cone(rad, h, 4)
 *
 * Fronds split into two instanced meshes by their lit/unlit tint instead of
 * carrying a per-instance colour, so the dawn tween is two material writes per
 * frame rather than 162 setColorAt calls. Total: 4 draw calls.
 */
function Palms({ day }: { day: { current: number } }) {
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const coconutRef = useRef<THREE.InstancedMesh>(null);
  const frondLitRef = useRef<THREE.InstancedMesh>(null);
  const frondDarkRef = useRef<THREE.InstancedMesh>(null);
  const frondLitMat = useRef<THREE.MeshStandardMaterial>(null);
  const frondDarkMat = useRef<THREE.MeshStandardMaterial>(null);

  // Scratch — nothing allocates inside useFrame.
  const scratch = useMemo(
    () => ({
      unfurl: new THREE.Matrix4(),
      out: new THREE.Matrix4(),
      leaf: new THREE.Matrix4(),
      quat: new THREE.Quaternion(),
      axisZ: new THREE.Vector3(0, 0, 1),
      pos: new THREE.Vector3(),
      scl: new THREE.Vector3(),
    }),
    [],
  );

  const build = useMemo(() => {
    const trunks: THREE.Matrix4[] = [];
    const trunkColors: THREE.Color[] = [];
    const coconuts: THREE.Matrix4[] = [];
    // One slot per frond: its static base matrix, its three static leaflet
    // matrices, the unfurl offset, and which instanced mesh + slot it writes.
    const frondSlots: {
      base: THREE.Matrix4;
      leaves: THREE.Matrix4[];
      offset: number;
      lit: boolean;
      indices: number[];
    }[] = [];

    let litCount = 0;
    let darkCount = 0;

    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const zAxis = new THREE.Vector3(0, 0, 1);
    const yAxis = new THREE.Vector3(0, 1, 0);

    PALM_PLACEMENTS.forEach((placement, palmIndex) => {
      const { x, z, lean, scale } = placement;
      const rnd = mulberry(1000 + palmIndex);

      const root = new THREE.Matrix4().compose(
        new THREE.Vector3(x, groundHeight(x, z) - 0.1, z),
        new THREE.Quaternion(),
        new THREE.Vector3(scale, scale, scale),
      );

      const leanSign = Math.sign(lean || 1);
      const leanMag = Math.abs(lean || 0.4);

      // Trunk — each ring narrower than the last, leaning as it rises.
      for (let i = 0; i < TRUNK_SEGMENTS; i++) {
        const t = i / TRUNK_SEGMENTS;
        const y = 0.28 + t * 2.1;
        const r = 0.115 - t * 0.055;
        const sx = Math.sin(t * 1.5) * 0.38 * leanSign * leanMag;
        const tilt = t * 0.22 * leanSign;
        m.compose(
          new THREE.Vector3(sx, y, 0),
          q.setFromAxisAngle(zAxis, -tilt),
          new THREE.Vector3(r, 0.34, r),
        );
        trunks.push(new THREE.Matrix4().multiplyMatrices(root, m));
        trunkColors.push(new THREE.Color(i % 2 ? C.trunk : C.trunkDark));
      }

      // Crown sits at the top of the trunk's curve (t = 1).
      const crownY = 0.28 + 2.1;
      const crownX = Math.sin(1.5) * 0.38 * leanSign * leanMag;
      const crown = new THREE.Matrix4().multiplyMatrices(
        root,
        new THREE.Matrix4().makeTranslation(crownX, crownY, 0),
      );

      for (let i = 0; i < 3; i++) {
        m.compose(
          new THREE.Vector3(
            Math.sin((i / 3) * Math.PI * 2) * 0.09,
            -0.04,
            Math.cos((i / 3) * Math.PI * 2) * 0.09,
          ),
          new THREE.Quaternion(),
          new THREE.Vector3(0.055, 0.055, 0.055),
        );
        coconuts.push(new THREE.Matrix4().multiplyMatrices(crown, m));
      }

      // Fronds. The draw order of rnd() calls is preserved exactly from the
      // original so the seeded crowns come out identical.
      for (let f = 0; f < FRONDS_PER_PALM; f++) {
        const yaw = (f / FRONDS_PER_PALM) * Math.PI * 2 + rnd() * 0.25;
        const droop = 0.5 + rnd() * 0.45;
        const len = 0.85 + rnd() * 0.4;
        const offset = rnd() * 0.24;

        const base = new THREE.Matrix4().multiplyMatrices(
          crown,
          new THREE.Matrix4().makeRotationFromQuaternion(
            q.setFromAxisAngle(yAxis, yaw),
          ),
        );

        // Original: lit = floor(matIndex / 3) % 2 === 1 where matIndex = f*3+seg,
        // which reduces to f % 2 === 1 — the alternation is per frond.
        const lit = f % 2 === 1;

        const leaves: THREE.Matrix4[] = [];
        const indices: number[] = [];
        for (let seg = 0; seg < LEAFLETS_PER_FROND; seg++) {
          const t = seg / LEAFLETS_PER_FROND;
          const drop = droop * t * t;
          const rad = 0.115 - t * 0.055;
          leaves.push(
            new THREE.Matrix4().compose(
              new THREE.Vector3(0.16 + t * len, 0.13 - drop * 0.62, 0),
              q.setFromAxisAngle(zAxis, -0.26 - drop * 1.25),
              new THREE.Vector3(rad, len * 0.62, rad),
            ),
          );
          indices.push(lit ? litCount++ : darkCount++);
        }

        frondSlots.push({ base, leaves, offset, lit, indices });
      }
    });

    return { trunks, trunkColors, coconuts, frondSlots, litCount, darkCount };
  }, []);

  // Static instances are written once, on mount.
  useEffect(() => {
    const trunk = trunkRef.current;
    if (trunk) {
      build.trunks.forEach((mat, i) => trunk.setMatrixAt(i, mat));
      build.trunkColors.forEach((c, i) => trunk.setColorAt(i, c));
      trunk.instanceMatrix.needsUpdate = true;
      if (trunk.instanceColor) trunk.instanceColor.needsUpdate = true;
    }
    const coconut = coconutRef.current;
    if (coconut) {
      build.coconuts.forEach((mat, i) => coconut.setMatrixAt(i, mat));
      coconut.instanceMatrix.needsUpdate = true;
    }
  }, [build]);

  useFrame(() => {
    const d = day.current;
    const lit = frondLitRef.current;
    const dark = frondDarkRef.current;
    if (!lit || !dark) return;

    const { unfurl, out, leaf, quat, axisZ, pos, scl } = scratch;

    for (const slot of build.frondSlots) {
      // Closed: fronds pitched upright and drawn in, the way a palm holds a
      // new spear. Open: spread wide and drooping under their own weight.
      const open = THREE.MathUtils.clamp((d - slot.offset) / 0.5, 0, 1);
      const eased = 1 - Math.pow(1 - open, 3);
      // FLOOR of 0.42, not 0. Fully furled crowns were correct while the
      // opening camera sat close; from the new establishing shot 25 units out
      // the trunks are barely a pixel wide, so a closed crown read as a dark
      // spiky blob apparently floating beside the volcano — fourteen of them.
      // A real palm only holds a furled spear at its centre anyway; the whole
      // crown does not close at night. The dawn still visibly opens the canopy,
      // it just starts from a palm rather than from a shuttlecock.
      const shaped = 0.42 + eased * 0.58;
      const rot = THREE.MathUtils.lerp(-1.12, 0, shaped);
      const s = THREE.MathUtils.lerp(0.72, 1, shaped);

      unfurl.compose(
        pos.set(0, 0, 0),
        quat.setFromAxisAngle(axisZ, rot),
        scl.set(s, s, s),
      );
      out.multiplyMatrices(slot.base, unfurl);

      const target = slot.lit ? lit : dark;
      for (let seg = 0; seg < LEAFLETS_PER_FROND; seg++) {
        // Reused scratch — allocating 162 Matrix4 per frame would hand the GC
        // exactly the per-frame garbage this file is otherwise careful to avoid.
        leaf.multiplyMatrices(out, slot.leaves[seg]);
        target.setMatrixAt(slot.indices[seg], leaf);
      }
    }
    lit.instanceMatrix.needsUpdate = true;
    dark.instanceMatrix.needsUpdate = true;

    // The canopy greens as the light arrives — two writes, not 162.
    if (frondLitMat.current)
      lerpTo(frondLitMat.current.color, NIGHT.frondLit, DAY.frondLit, d);
    if (frondDarkMat.current)
      lerpTo(frondDarkMat.current.color, NIGHT.frond, DAY.frond, d);
  });

  return (
    <>
      <instancedMesh
        ref={trunkRef}
        args={[undefined, undefined, build.trunks.length]}
      >
        <cylinderGeometry args={[0.88, 1, 1, 6]} />
        <meshStandardMaterial flatShading />
      </instancedMesh>

      <instancedMesh
        ref={coconutRef}
        args={[undefined, undefined, build.coconuts.length]}
      >
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#3a2412" flatShading />
      </instancedMesh>

      <instancedMesh
        ref={frondLitRef}
        args={[undefined, undefined, build.litCount]}
      >
        <coneGeometry args={[1, 1, 4]} />
        <meshStandardMaterial ref={frondLitMat} flatShading />
      </instancedMesh>

      <instancedMesh
        ref={frondDarkRef}
        args={[undefined, undefined, build.darkCount]}
      >
        <coneGeometry args={[1, 1, 4]} />
        <meshStandardMaterial ref={frondDarkMat} flatShading />
      </instancedMesh>
    </>
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
    // Scale 0 is NOT free. A zero-radius bounding sphere still sits inside the
    // frustum, so the cull passes and all four jar meshes stay in the render
    // list for the entire first half of the chapter. Dropping visibility takes
    // them out of it until they can actually be seen.
    g.visible = e > 0.001;
  });

  // The raw GLB is ~300 units tall (see legacy PepperSauce.tsx scale=0.0075).
  return (
    <group
      ref={group}
      position={[3.6, 0.34, 4.6]}
      scale={0.0034}
      visible={false}
    >
      {/* flatGlass: no transmission pass in the island. See JarModel. */}
      <JarModel flatGlass />
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

/* -------------------------------------------------------- ash (falling-leaves) */

/**
 * Ash drifting off the vent — built with the `falling-leaves` mechanism.
 *
 * The skill's core claim is that a falling thing reads as a LEAF (here, a
 * charred flake) only if it tumbles about its own long axis: it presents a
 * face, thins to nothing edge-on, then opens out on the other side. A sprite
 * that merely spins in the picture plane reads as confetti. That single rule
 * forbids point sprites outright — a point sprite always faces the camera and
 * so can never go edge-on — which is why this is an InstancedMesh of QUADS and
 * why the existing <Embers> points field could not simply be restyled.
 *
 * Two departures from the skill, both forced by this scene and both deliberate:
 *
 * 1. DRIVEN BY SCROLL, NOT WALL CLOCK. The skill assumes a permanent rAF. This
 *    canvas is frameloop="demand" with 0 RAF at idle (creative direction §7),
 *    and the whole island is authored so that scrubbing backwards returns it
 *    exactly. So `phase` comes from scroll progress: the ash falls as you
 *    travel, reverses when you scrub back, and costs nothing when you stop.
 * 2. OPAQUE FLAKES, NO ALPHA. The skill warns that alpha-tested leaves lose
 *    early-Z and that per-pixel cost exceeds triangle count. Ash is opaque
 *    anyway, so DoubleSide flat-shaded quads give two differently-lit faces for
 *    free — the skill's "bake both faces" rule satisfied by the normals.
 *
 * Colour note: ACESFilmic tone mapping is on (R3F default, never overridden
 * here). The skill's trap list is explicit that an emissive red returns from a
 * tone-mapped composite PINK unless G and B are driven to zero — hence
 * #780200 for the ember-lit flakes rather than a friendlier #8c1410.
 */
const ASH_COUNT = 90;
/**
 * On a phone the band is the same size but the frame is far narrower, so the
 * skill's own density law applies: on-screen density is count over BAND AREA,
 * and tightening the band beats raising the count. Here the band is fixed by
 * the island, so the count comes down instead — a figure that reads as a drift
 * on a desktop arrives as a blizzard on a 390px screen.
 */
const ASH_COUNT_COMPACT = 34;
const ASH_SPAN = 11;

function Ash({
  progress,
  day,
  count,
}: {
  progress: { current: number };
  day: { current: number };
  count: number;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const flakes = useMemo(() => {
    const rnd = mulberry(70707);
    return Array.from({ length: count }, () => {
      // Uniform-area disc sampling (sqrt), banded around the island rather
      // than centred on the camera — the skill's note that a band centred on
      // the camera puts almost all its volume outside a narrow frustum.
      const a = rnd() * Math.PI * 2;
      const r = 2.5 + Math.sqrt(rnd()) * 7.5;
      return {
        x: Math.cos(a) * r,
        z: Math.sin(a) * r,
        y0: rnd() * ASH_SPAN,
        fall: 0.9 + rnd() * 1.6,
        // Every leaf gets its own rates. Sharing any one of these across the
        // field lets the eye find the common rhythm in about two seconds.
        spin0: rnd() * Math.PI * 2,
        spinSp: (0.5 + rnd() * 1.8) * (rnd() < 0.5 ? -1 : 1),
        roll0: rnd() * Math.PI * 2,
        rollSp: (rnd() - 0.5) * 1.1,
        yaw: rnd() * Math.PI * 2,
        slip: 0.16 + rnd() * 0.3,
        size: 0.035 + rnd() * 0.055,
        lit: rnd() < 0.28,
      };
    });
  }, [count]);

  const scratch = useMemo(
    () => ({
      m: new THREE.Matrix4(),
      q: new THREE.Quaternion(),
      qSpin: new THREE.Quaternion(),
      qRoll: new THREE.Quaternion(),
      pos: new THREE.Vector3(),
      scl: new THREE.Vector3(),
      axisX: new THREE.Vector3(1, 0, 0),
      axisY: new THREE.Vector3(0, 1, 0),
      axisZ: new THREE.Vector3(0, 0, 1),
      color: new THREE.Color(),
    }),
    [],
  );

  useEffect(() => {
    const inst = mesh.current;
    if (!inst) return;
    const ash = new THREE.Color("#2a211c");
    const emberLit = new THREE.Color("#780200");
    flakes.forEach((f, i) => inst.setColorAt(i, f.lit ? emberLit : ash));
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
  }, [flakes]);

  useFrame(() => {
    const inst = mesh.current;
    if (!inst) return;
    const p = progress.current;
    const d = day.current;
    const { m, q, qSpin, qRoll, pos, scl, axisX, axisY, axisZ } = scratch;

    // Six fall cycles across the chapter — enough that the field is clearly
    // moving under a normal scroll without strobing under a fast one.
    const phase = p * 6;

    // Presence is keyed to the JOURNEY, not to daylight. The band is centred on
    // the island, but the establishing chapter views it from 25 units out — so
    // flakes sized for the near field sat between camera and island and read as
    // large dark shapes cluttering the widest, quietest frame in the sequence.
    // Ash now arrives with the volcano (in by the crossing, full at the vent)
    // and thins at the landing, where the jar has to carry the frame alone.
    const arrive = THREE.MathUtils.smoothstep(p, 0.08, 0.34);
    const settle = THREE.MathUtils.smoothstep(p, 0.76, 1);
    const presence = arrive * (1 - settle * 0.82) * (1 - d * 0.25);

    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];
      const spin = f.spin0 + phase * f.spinSp * 2.2;
      const roll = f.roll0 + phase * f.rollSp;

      // cos(spin) is the face-on factor and crosses zero — that instant of
      // near-disappearance is what the eye reads as a flake rather than a mote.
      // The sideways slip is sin(spin): the SAME angle, 90 degrees out of
      // phase, so the flake skates fastest exactly as it turns edge-on. An
      // independent sine here would read as wind or as an easing bug.
      const slipX = Math.sin(spin) * f.slip;

      const yRaw = f.y0 - phase * f.fall;
      const y = ((yRaw % ASH_SPAN) + ASH_SPAN) % ASH_SPAN;

      qRoll.setFromAxisAngle(axisZ, roll);
      qSpin.setFromAxisAngle(axisX, spin);
      q.setFromAxisAngle(axisY, f.yaw).multiply(qRoll).multiply(qSpin);

      const s = f.size * presence;
      m.compose(
        pos.set(f.x + slipX, y * 0.92 + 0.15, f.z),
        q,
        scl.set(s, s, s),
      );
      inst.setMatrixAt(i, m);
    }
    inst.instanceMatrix.needsUpdate = true;
    inst.visible = presence > 0.04;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      {/* A quad, not a point sprite — see the header. Slightly longer than
          wide so the long axis, and therefore the tumble, is legible. */}
      <planeGeometry args={[1, 1.6]} />
      <meshStandardMaterial
        flatShading
        side={THREE.DoubleSide}
        roughness={0.9}
        metalness={0}
      />
    </instancedMesh>
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
      {/* fog={false} on the whole sky layer. THREE.Fog applies to Basic and
          Points materials too, and the sun sits ~44 units from the opening
          camera against a night far-plane of 40 — so it was being lerped
          entirely to fog colour. A sun that is 100% fog is not a sun. */}
      <mesh>
        <circleGeometry args={[2.8, 32]} />
        <meshBasicMaterial
          ref={disc}
          transparent
          depthWrite={false}
          fog={false}
        />
      </mesh>
      <mesh position={[0, 0, -0.5]}>
        <circleGeometry args={[9, 32]} />
        <meshBasicMaterial
          ref={halo}
          color="#ff8a2a"
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          fog={false}
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
            fog={false}
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
      {/* The stars sit on a shell of r=62. Night fog is near 17 / far 40, so
          the fog factor saturated at 1.0 and every star painted as solid
          #05070d against a #05070d background — mathematically invisible, and
          only ever at night, which is the sole time their opacity is non-zero.
          The starfield has never been seen by anyone. */}
      <pointsMaterial
        ref={mat}
        color="#cfe0ff"
        size={0.32}
        sizeAttenuation
        transparent
        depthWrite={false}
        fog={false}
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
  const { camera, size } = useThree();
  const look = useMemo(() => new THREE.Vector3(), []);

  // Tall/narrow viewports get the authored mobile endpoints. Measured off the
  // canvas, not a media query, so a resize re-composes rather than keeping a
  // desktop framing that has since become a centre crop.
  const narrow = size.width < 900;

  useFrame(() => {
    const { a, b, t } = segmentAt(progress.current);

    const posA = (narrow && a.camera.mobile?.pos) || a.camera.pos;
    const posB = (narrow && b.camera.mobile?.pos) || b.camera.pos;
    const tgtA = (narrow && a.camera.mobile?.target) || a.camera.target;
    const tgtB = (narrow && b.camera.mobile?.target) || b.camera.target;
    const fovA = (narrow && a.camera.mobile?.fov) || a.camera.fov;
    const fovB = (narrow && b.camera.mobile?.fov) || b.camera.fov;

    // Pointer drift is clamped and BLENDS OUT toward each keyframe, so it can
    // never nudge an authored composition off its mark at the moment the
    // visitor is actually reading it. Peaks mid-transition where the camera is
    // already moving and a little parallax reads as life.
    const settle = Math.sin(Math.PI * t);
    const dx = drift.current.x * 0.42 * settle;
    const dy = drift.current.y * 0.26 * settle;

    camera.position.set(
      THREE.MathUtils.lerp(posA[0], posB[0], t) + dx,
      THREE.MathUtils.lerp(posA[1], posB[1], t) + dy,
      THREE.MathUtils.lerp(posA[2], posB[2], t),
    );
    look.set(
      THREE.MathUtils.lerp(tgtA[0], tgtB[0], t),
      THREE.MathUtils.lerp(tgtA[1], tgtB[1], t),
      THREE.MathUtils.lerp(tgtA[2], tgtB[2], t),
    );
    camera.lookAt(look);

    const fov = THREE.MathUtils.lerp(fovA, fovB, t);
    const cam = camera as THREE.PerspectiveCamera;
    if (cam.isPerspectiveCamera && Math.abs(cam.fov - fov) > 1e-3) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
  });

  return null;
}

function IslandScene({
  progress,
  drift,
  compact,
}: {
  progress: { current: number };
  drift: { current: { x: number; y: number } };
  compact: boolean;
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
    // Daylight is interpolated from the chapter ledger, in ONE place. Rig only
    // moves the camera: if both wrote `day`, useFrame ordering would decide
    // which won and every other subscriber would read a one-frame-stale value.
    const seg = segmentAt(progress.current);
    const d = (day.current = THREE.MathUtils.lerp(seg.a.day, seg.b.day, seg.t));

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
      {/* EVERY light carries its ref. Until 2026-08-09 none of them did: the
          four refs above were declared and driven every frame while the JSX
          attached bare, static lights, so the dawn arc this scene is named for
          had never once executed. The key sat frozen at #f05400/2.2 from
          [-9,2.2,6] — light from the camera's shoulder, not from the sun at
          [-17,·,-24] — which is why the island read as a flat muddy cone with
          no source. Initial props are authored to the d=0 (night) state so the
          first painted frame matches the scrubbed one. */}
      <ambientLight ref={ambientRef} intensity={0.14} color="#ffd9b0" />
      {/* Sky/ground bounce. There was no hemisphere light in the scene at all;
          groundColor is the volcanic soil throwing warmth back up under the
          fronds, which is what stops the undersides going pure black. */}
      <hemisphereLight
        ref={hemiRef}
        intensity={0.3}
        color={NIGHT.hemi.getStyle()}
        groundColor="#241206"
      />
      {/* The key IS the sun. It rises from below the horizon to +7 across the
          scroll, agreeing with the sun disc's own climb. */}
      <directionalLight
        ref={keyRef}
        position={[-13, -1, -10]}
        intensity={0.7}
        color={NIGHT.key.getStyle()}
      />
      {/* Gold rim from behind the peak. */}
      <directionalLight
        ref={fillRef}
        position={[6, 4, -8]}
        intensity={0.25}
        color={NIGHT.fill.getStyle()}
      />

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

      {/* Four instanced draws for the whole grove. Placements live in
          PALM_PLACEMENTS beside the builder. */}
      <Palms day={day} />

      {/* The sky. Ordered back-to-front: stars sit furthest out and are put
          out by the dawn, the sun climbs through them, the cloud bank catches
          the light before the island does, and the embers wash out last. */}
      <Stars day={day} />
      <Sun day={day} />
      <Clouds day={day} />

      <Embers day={day} />
      {/* Tumbling ash off the vent — the falling-leaves mechanism. */}
      <Ash
        progress={progress}
        day={day}
        count={compact ? ASH_COUNT_COMPACT : ASH_COUNT}
      />
      {/* Eruption is fully procedural — no loader, nothing to suspend on. It
          used to share the boundary below, which meant the chapter's EARLIEST
          beat (pe starts at p=0.03) was gated behind its LARGEST asset: the
          1.07 MB jar GLB, from a third origin, plus a Draco decoder from a
          fourth. On a slow connection that showed an island whose volcano
          simply never erupted. */}
      <Eruption progress={progress} />
      {/* useGLTF suspends — the jar, and only the jar, needs the boundary. */}
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
  compact,
  onReady,
}: {
  progress: { current: number };
  drift: { current: { x: number; y: number } };
  dpr: number;
  compact: boolean;
  onReady: (invalidate: () => void) => void;
}) {
  return (
    <Canvas
      frameloop="demand"
      dpr={dpr}
      camera={{ position: [0, 5.4, 20.5], fov: 38 }}
      gl={{
        // MSAA off in the compact tier. At DPR 1.25 on a phone screen the
        // flat-shaded silhouettes have no edge detail fine enough for
        // multisampling to recover, and it is pure fill cost on the hardware
        // least able to pay it. Antialiasing cannot be toggled after context
        // creation, which is why it is a mount-time tier rather than a setting.
        antialias: !compact,
        alpha: true,
        powerPreference: compact ? "default" : "high-performance",
      }}
      onCreated={({ invalidate }) => {
        onReady(invalidate);
        invalidate();
      }}
      className="absolute inset-0"
    >
      <IslandScene progress={progress} drift={drift} compact={compact} />
    </Canvas>
  );
}
