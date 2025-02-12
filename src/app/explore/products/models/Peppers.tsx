import { Detailed, Environment, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  DepthOfField,
  EffectComposer,
  ToneMapping,
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

// Define collision centers and radii for bouncing off the logo and sauce
const logoCenter = new THREE.Vector3(-0.82, 0.75, 0);
const logoRadius = 1.5;
const sauceCenter = new THREE.Vector3(0, -0.5, 0);
const sauceRadius = 1.5;

interface PepperProps {
  index: number;
  z: number;
  speed: number;
  color: "yellow" | "red";
}

function Pepper({ index, z, speed, color }: PepperProps) {
  const ref = useRef<THREE.Mesh>(null);
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);

  // Load GLTF models with proper typing
  const yellowPepper = useGLTF(
    "https://sunnyisland.s3.us-east-2.amazonaws.com/media/glb/yellowPepper.glb",
  ) as unknown as PepperGLTF;
  const redPepper = useGLTF(
    "https://sunnyisland.s3.us-east-2.amazonaws.com/media/glb/redPepper.glb",
  ) as unknown as PepperGLTF;

  const [data] = useState(() => ({
    y: THREE.MathUtils.randFloatSpread(height * 2),
    x: THREE.MathUtils.randFloatSpread(2),
    spin: THREE.MathUtils.randFloat(8, 12),
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
    direction: 1,
  }));

  useFrame((state, dt) => {
    const pepperPos = new THREE.Vector3(
      index === 0 ? 0 : data.x * width,
      data.y,
      -z,
    );
    // Bounce if too close to the logo or sauce centers.
    if (
      pepperPos.distanceTo(logoCenter) < logoRadius ||
      pepperPos.distanceTo(sauceCenter) < sauceRadius
    ) {
      data.direction *= -1;
    }
    data.y += dt * speed * data.direction;
    if (ref.current) {
      ref.current.position.set(pepperPos.x, pepperPos.y, pepperPos.z);
      ref.current.rotation.set(
        (data.rX += dt / data.spin),
        Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
        (data.rZ += dt / data.spin),
      );
    }
    if (
      data.y > height * (index === 0 ? 4 : 1) ||
      data.y < -(height * (index === 0 ? 4 : 1))
    ) {
      data.y = THREE.MathUtils.randFloatSpread(height * 2);
    }
  });

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
  const peppers = useMemo<("yellow" | "red")[]>(() => {
    const temp: ("yellow" | "red")[] = [];
    for (let i = 0; i < count; i++) {
      temp.push(Math.random() < 0.8 ? "yellow" : "red");
    }
    return temp;
  }, [count]);

  return (
    <>
      <color attach="background" args={["#ffbf40"]} />
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
          z={Math.round(easing(i / count) * depth)}
          speed={speed}
          color={pepperColor}
        />
      ))}
      <Environment preset="sunset" />
      <EffectComposer multisampling={0}>
        <DepthOfField
          target={[0, 0, 60]}
          focalLength={0.4}
          bokehScale={10}
          height={700}
        />
        <ToneMapping />
      </EffectComposer>
    </>
  );
}
