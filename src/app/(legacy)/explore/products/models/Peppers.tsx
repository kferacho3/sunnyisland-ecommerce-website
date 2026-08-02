import { Detailed, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

// Define a type for the pepper GLTF (assumes both GLTF models have a node named "modelobj")
export type PepperGLTF = GLTF & {
  nodes: {
    modelobj: THREE.Mesh;
  };
};

interface PepperProps {
  index: number;
  z: number;
  speed: number;
  color: "yellow" | "red";
}

function Pepper({ index, z, speed, color }: PepperProps) {
  const ref = useRef<THREE.Mesh>(null);
  const { viewport, camera } = useThree();
  // Get viewport dimensions at the pepper's z-plane.
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  // Load GLTF models with proper typing
  const yellowPepper = useGLTF(
    "https://sunnyisland.s3.us-east-2.amazonaws.com/media/glb/yellowPepper.glb",
  ) as unknown as PepperGLTF;
  const redPepper = useGLTF(
    "https://sunnyisland.s3.us-east-2.amazonaws.com/media/glb/redPepper.glb",
  ) as unknown as PepperGLTF;

  // Initialize pepper-specific data
  const [data] = useState(() => ({
    y: THREE.MathUtils.randFloatSpread(height * 2),
    x: THREE.MathUtils.randFloatSpread(10),
    spin: THREE.MathUtils.randFloat(8, 12),
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
    direction: 1,
  }));

  useFrame((state, dt) => {
    // Compute pepper position; note that we now use the given z directly.
    const pepperPos = new THREE.Vector3(
      index === 0 ? 0 : data.x * width,
      data.y,
      z,
    );

    // Update vertical position.
    data.y += dt * speed * data.direction;

    // Update mesh position and rotation.
    if (ref.current) {
      ref.current.position.set(pepperPos.x, data.y, pepperPos.z);
      ref.current.rotation.set(
        (data.rX += dt / data.spin),
        Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
        (data.rZ += dt / data.spin),
      );
    }

    // Reset vertical position if pepper moves too far.
    if (
      data.y > height * (index === 0 ? 4 : 1) ||
      data.y < -(height * (index === 0 ? 4 : 1))
    ) {
      data.y = THREE.MathUtils.randFloatSpread(height * 2);
    }
  });

  // Select the appropriate model.
  const gltf = color === "yellow" ? yellowPepper : redPepper;
  const { nodes } = gltf;

  return (
    <Detailed ref={ref} distances={[0, 65, 80]}>
      <mesh
        geometry={nodes.modelobj.geometry}
        material={nodes.modelobj.material}
      />
    </Detailed>
  );
}

interface PeppersProps {
  speed?: number;
  count?: number;
  depth?: number;
  easing?: (x: number) => number;
}

export default function Peppers({
  speed = 1,
  count = 80,
  depth = 80,
  easing = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2)),
}: PeppersProps) {
  // Generate a color for each pepper (80% yellow, 20% red)
  const peppers = useMemo<("yellow" | "red")[]>(() => {
    const temp: ("yellow" | "red")[] = [];
    for (let i = 0; i < count; i++) {
      temp.push(Math.random() < 0.8 ? "yellow" : "red");
    }
    return temp;
  }, [count]);

  return (
    <>
      {/* Removed the background color override */}
      <spotLight
        position={[10, 20, 10]}
        penumbra={1}
        decay={0}
        intensity={3}
        color="orange"
      />
      {peppers.map((pepperColor, i) => (
        <Pepper
          key={i}
          index={i}
          // All peppers are now placed behind the PepperSauce by ensuring a negative z value.
          z={-(Math.round(easing(i / count) * depth) + 10)}
          speed={speed}
          color={pepperColor}
        />
      ))}
      {/* Removed the <Environment preset="sunset" /> that was forcing a background */}
      <EffectComposer multisampling={0}>
        <DepthOfField
          target={[0, 0, 60]}
          focalLength={0.4}
          bokehScale={1}
          height={1000}
        />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </>
  );
}
