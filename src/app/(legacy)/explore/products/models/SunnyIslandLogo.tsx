import { useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Group } from "three";
import { GLTF } from "three-stdlib";
type GLTFResult = GLTF & {
  nodes: {
    Curve: THREE.Mesh;
  };
  materials: {
    PaletteMaterial003: THREE.MeshStandardMaterial;
  };
};

export default function SunnyIslandLogo(props: ThreeElements["group"]) {
  const group = useRef<Group>(null);
  const { nodes, materials } = useGLTF(
    "https://sunnyisland.s3.us-east-2.amazonaws.com/media/glb/SunnyIslandLogo.glb",
  ) as GLTFResult;

  // Set initial scale and position based on window width.
  const [scale, setScale] = useState<number>(
    window.innerWidth <= 600 ? 0.8 : 1.25,
  );
  const [position, setPosition] = useState<[number, number, number]>(
    window.innerWidth <= 600 ? [11, 0, 0] : [0, 0, 0],
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setScale(0.9);
        setPosition([0.22, 0, 0]); // Adjust position for small screens
      } else {
        setScale(1.25);
        setPosition([0, 0, 0.1]); // Reset position for larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call immediately to apply the correct initial state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <group position={[-0.3, 0, 0.4]} rotation={[1.55, 0, 0.37]}>
      <group
        rotation={[0, 0, -1.125]}
        ref={group}
        {...props}
        scale={scale}
        position={[0.5, 0, 0.3]}
        dispose={null}
      >
        <mesh
          geometry={nodes.Curve.geometry}
          material={materials.PaletteMaterial003}
        />
      </group>
    </group>
  );
}

useGLTF.preload(
  "https://sunnyisland.s3.us-east-2.amazonaws.com/media/glb/SunnyIslandLogo.glb",
);
