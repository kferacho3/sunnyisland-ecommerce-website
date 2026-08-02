"use client";

import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useMemo } from "react";

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

export const JAR_MODEL_URL =
  "https://sunnyisland.s3.us-east-2.amazonaws.com/media/glb/SunnyIslandPepperSauceFINAL.glb";

export function JarModel(props: ThreeElements["group"]) {
  const { scene } = useGLTF(JAR_MODEL_URL);

  const jar = useMemo(() => scene.clone(true), [scene]);

  return (
    <group {...props} dispose={null}>
      <primitive object={jar} />
    </group>
  );
}

useGLTF.preload(JAR_MODEL_URL);
