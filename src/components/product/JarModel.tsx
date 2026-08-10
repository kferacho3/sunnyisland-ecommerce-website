"use client";

import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

/**
 * The complete jar, with the scene's own baked transforms.
 *
 * Anatomy learned the hard way: the `Cylinder` node is the LABEL WRAP — a
 * curved surface around the glass, printed on the outside and white on the
 * inside. Remove it and the jar loses its label; put the camera inside its
 * radius (which the old oversized scale did on /sauce) and the whole canvas
 * renders white. So: render everything, and keep the camera outside the wrap.
 *
 * Raw units: the jar is ~300 units tall. Callers scale to their world.
 */

/**
 * Self-hosted and retextured, 2026-08-09. The S3 original
 * (SunnyIslandPepperSauceFINAL.glb) was 1.07 MB from a cross-origin with no
 * preconnect — but the download was never the real cost. Its two textures were
 * 2048x2048 and, remarkably, 6969x1800: a non-power-of-two label wrap. Decoded,
 * that is 22.4 MB + 66.9 MB = ~89 MB of VRAM for a single jar, which is more
 * texture memory than many phones will surrender to a browser tab at all.
 *
 * Resized to 1024x1024 and 2048x528, re-encoded WebP q82, Draco re-applied
 * (the resize pass decodes it, so skipping that step ships uncompressed
 * geometry and undoes most of the saving):
 *
 *   transfer  1099.8 KB -> 358.1 KB   (-67%)
 *   VRAM         89.3 MB -> 11.4 MB   (-87%)
 *
 * Same-origin now, so it also loses a DNS + TLS handshake and can be served
 * with the app's own cache headers. 2048px across the label's circumference
 * still resolves the printed type on /sauce, where the jar fills the frame.
 */
export const JAR_MODEL_URL = "/models/sunny-island-jar.glb";

/**
 * The glass material (`Mat.1`) ships `KHR_materials_transmission` with
 * `transmissionFactor: 1`. GLTFLoader promotes that to a MeshPhysicalMaterial
 * with transmission, and three then allocates a transmission render target and
 * runs AN ENTIRE ADDITIONAL SCENE PASS every frame the jar is in the render
 * list — at full DPR, since `transmissionResolutionScale` defaults to 1 in
 * r172. In the island that doubles ~254 draw calls to ~508 and shows up in the
 * console as "GPU stall due to ReadPixels". It also compiles the most expensive
 * shader program on the site, which is the bulk of the measured TBT under a
 * software rasteriser.
 *
 * On /sauce the jar fills the frame and real refraction earns its cost. In the
 * island it is a ~1.5 cm object at dusk, mostly hidden behind sauce and label,
 * where transmission is invisible and unaffordable. Hence an opt-in.
 */
function toCheapGlass(source: THREE.Material): THREE.Material | null {
  const physical = source as THREE.MeshPhysicalMaterial;
  if (!("transmission" in physical) || physical.transmission <= 0) return null;

  // A plain StandardMaterial, not a PhysicalMaterial with transmission=0: the
  // point is to drop the physical shader permutation entirely, not just idle it.
  const cheap = new THREE.MeshStandardMaterial({
    color: physical.color?.clone() ?? new THREE.Color(0xffffff),
    map: physical.map ?? null,
    roughness: 0.16,
    metalness: 0,
    transparent: true,
    // OPACITY IS THE WHOLE TRICK. transmission=1 means "refract what is behind
    // me", so the shell reads as clear and you see the label and sauce THROUGH
    // it. Re-authoring it at the GLB's own baseColorFactor alpha (0.97) instead
    // painted a near-opaque #cccccc shell over the front of the jar and turned
    // the product into a frosted white blob with no legible label. Without
    // refraction the only honest stand-in for clear glass is to get out of the
    // way: a faint tinted veil that still catches a specular highlight.
    opacity: 0.18,
    side: physical.side,
    depthWrite: false,
  });
  cheap.name = `${source.name || "glass"}--flat`;
  return cheap;
}

export function JarModel({
  flatGlass = false,
  ...props
}: ThreeElements["group"] & {
  /** Swap transmissive glass for an opaque approximation. See toCheapGlass. */
  flatGlass?: boolean;
}) {
  const { scene } = useGLTF(JAR_MODEL_URL);

  // `scene.clone(true)` deep-clones nodes but SHARES material and geometry
  // references with drei's loader cache. Mutating a material in place would
  // therefore reach across into /sauce and every other consumer. Everything
  // below replaces references on the clone and never touches the originals.
  const { jar, owned } = useMemo(() => {
    const root = scene.clone(true);
    const created: THREE.Material[] = [];
    if (!flatGlass) return { jar: root, owned: created };

    const swapped = new Map<THREE.Material, THREE.Material>();
    root.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (!mesh.isMesh || !mesh.material) return;

      const convert = (mat: THREE.Material) => {
        const existing = swapped.get(mat);
        if (existing) return existing;
        const cheap = toCheapGlass(mat);
        if (!cheap) return mat;
        swapped.set(mat, cheap);
        created.push(cheap);
        return cheap;
      };

      mesh.material = Array.isArray(mesh.material)
        ? mesh.material.map(convert)
        : convert(mesh.material);
    });

    return { jar: root, owned: created };
  }, [scene, flatGlass]);

  // We minted these materials, so we dispose them. The GLB's own materials and
  // geometries stay owned by the drei cache (hence dispose={null} below).
  useEffect(() => {
    return () => {
      for (const material of owned) material.dispose();
    };
  }, [owned]);

  return (
    <group {...props} dispose={null}>
      <primitive object={jar} />
    </group>
  );
}

useGLTF.preload(JAR_MODEL_URL);
