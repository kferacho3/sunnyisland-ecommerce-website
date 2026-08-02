import { extend, ThreeElements, useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

// ✅ Import shaders as JS strings instead of .frag/.vert files
import { fireFragmentShader, fireVertexShader } from "./shader/fireShaders";

class FireMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        fireTex: { value: null },
        color: { value: new THREE.Color(0xff4500) },
        time: { value: 0.0 },
        invModelMatrix: { value: new THREE.Matrix4() },
        scale: { value: new THREE.Vector3(1, 1, 1) },
      },
      vertexShader: fireVertexShader,
      fragmentShader: fireFragmentShader,
      transparent: true,
    });
  }
}

extend({ FireMaterial });

export default function Flame(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh | null>(null);
  const texture = new THREE.TextureLoader().load("/fire.png");

  useFrame((state) => {
    if (ref.current && ref.current.material instanceof THREE.ShaderMaterial) {
      const material = ref.current.material as FireMaterial;
      material.uniforms.time.value = state.clock.elapsedTime;
      material.uniforms.invModelMatrix.value = new THREE.Matrix4()
        .copy(ref.current.matrixWorld)
        .invert();
      material.uniforms.scale.value = ref.current.scale;
    }
  });

  useLayoutEffect(() => {
    texture.magFilter = texture.minFilter = THREE.LinearFilter;
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;

    if (ref.current && ref.current.material instanceof THREE.ShaderMaterial) {
      const material = ref.current.material as FireMaterial;
      material.uniforms.fireTex.value = texture;
      material.uniforms.color.value = new THREE.Color(0xff4500);
      material.uniforms.invModelMatrix.value = new THREE.Matrix4();
      material.uniforms.scale.value = new THREE.Vector3(1, 1, 1);
    }
  }, [texture]);

  return (
    <mesh ref={ref} {...props}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <primitive
        attach="material"
        object={new FireMaterial()}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
