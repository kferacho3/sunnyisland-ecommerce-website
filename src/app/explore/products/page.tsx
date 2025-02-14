"use client";

import { a, useSpring } from "@react-spring/three";
import { Physics, useBox } from "@react-three/cannon";
import {
  Environment,
  Lightformer,
  OrbitControls,
  PerformanceMonitor,
} from "@react-three/drei";
import {
  Canvas,
  extend,
  ThreeElements,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import { easing } from "maath";
import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

// Use String.raw for GLSL code.
const glsl = String.raw;

import { Product, productsData } from "@/data/productsData";
import Peppers from "./models/Peppers";
import PepperSauce from "./models/PepperSauce";
import SunnyIslandLogo from "./models/SunnyIslandLogo";
import { ComingSoonPopup } from "./overlay/ComingSoon";
import { Overlay } from "./overlay/Overlay";
import Preloader from "./Preloader";

// ─── Helper: StaticBody ─────────────────────────────────────────────
// Wraps children in a static physics collider using a box shape.
function StaticBody({
  children,
  args,
  ...props
}: { children: React.ReactNode; args?: any } & any) {
  const [ref] = useBox(() => ({
    type: "Static",
    args: args || [1, 1, 1],
    ...props,
  }));
  return <group ref={ref}>{children}</group>;
}

// ─── FLAME SHADER COMPONENT ─────────────────────────────────────────────
class FireMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      defines: { ITERATIONS: "10", OCTIVES: "3" },
      uniforms: {
        fireTex: { value: null },
        color: { value: new THREE.Color(0xff4500) },
        time: { value: 0.0 },
        seed: { value: 0.0 },
        invModelMatrix: { value: new THREE.Matrix4() },
        scale: { value: new THREE.Vector3(1, 1, 1) },
        noiseScale: { value: new THREE.Vector4(1, 2, 1, 0.3) },
        magnitude: { value: 2.5 },
        lacunarity: { value: 3.0 },
        gain: { value: 0.6 },
      },
      vertexShader: `
        varying vec3 vWorldPos;
        void main() {
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: glsl`
        uniform vec3 color;
        uniform float time;
        uniform float seed;
        uniform mat4 invModelMatrix;
        uniform vec3 scale;
        uniform vec4 noiseScale;
        uniform float magnitude;
        uniform float lacunarity;
        uniform float gain;
        uniform sampler2D fireTex;
        varying vec3 vWorldPos;
        
        // A simple pseudo-noise function
        float snoise(vec3 p) {
          return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
        }
        
        float turbulence(vec3 p) {
          float sum = 0.0;
          float freq = 1.0;
          float amp = 1.0;
          for (int i = 0; i < OCTIVES; i++) {
            sum += abs(snoise(p * freq)) * amp;
            freq *= lacunarity;
            amp *= gain;
          }
          return sum;
        }
        
        vec4 samplerFire(vec3 p, vec4 scale) {
          vec2 st = vec2(sqrt(dot(p.xz, p.xz)), p.y);
          if(st.x <= 0.0 || st.x >= 1.0 || st.y <= 0.0 || st.y >= 1.0) return vec4(0.0);
          p.y -= (seed + time) * scale.w;
          p *= scale.xyz;
          st.y += sqrt(st.y) * magnitude * turbulence(p);
          if(st.y <= 0.0 || st.y >= 1.0) return vec4(0.0);
          return texture2D(fireTex, st);
        }
        
        vec3 localize(vec3 p) {
          return (invModelMatrix * vec4(p, 1.0)).xyz;
        }
        
        void main() {
          vec3 rayPos = vWorldPos;
          vec3 rayDir = normalize(rayPos - cameraPosition);
          float rayLen = 0.0288 * length(scale.xyz);
          vec4 col = vec4(0.0);
          for (int i = 0; i < ITERATIONS; i++) {
            rayPos += rayDir * rayLen;
            vec3 lp = localize(rayPos);
            lp.y += 0.5;
            lp.xz *= 2.0;
            col += samplerFire(lp, noiseScale);
          }
          col.a = col.r;
          gl_FragColor = col;
        }
      `,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });
  }
}

extend({ FireMaterial });

function Flame(props: ThreeElements["mesh"] & { color?: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  const texture = useLoader(THREE.TextureLoader, "/fire.png");

  useFrame((state) => {
    if (ref.current && ref.current.material instanceof THREE.ShaderMaterial) {
      const material = ref.current.material as FireMaterial;
      material.uniforms.time.value = state.clock.elapsedTime;
      const invModelMatrix = new THREE.Matrix4()
        .copy(ref.current.matrixWorld)
        .invert();
      material.uniforms.invModelMatrix.value.copy(invModelMatrix);
      material.uniforms.scale.value.copy(ref.current.scale);
    }
  });

  useLayoutEffect(() => {
    texture.magFilter = texture.minFilter = THREE.LinearFilter;
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    if (ref.current && ref.current.material instanceof THREE.ShaderMaterial) {
      const material = ref.current.material as FireMaterial;
      material.uniforms.fireTex.value = texture;
      material.uniforms.color.value = new THREE.Color(props.color || 0xff4500);
      material.uniforms.seed.value = Math.random() * 19.19;
    }
  }, [texture, props.color]);

  return (
    <mesh ref={ref} {...props}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <primitive attach="material" object={new FireMaterial()} />
    </mesh>
  );
}

// Framer Motion variants for the widescreen letterbox bars.
const topLetterboxVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const bottomLetterboxVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

interface SceneProps {
  isIdle: boolean;
  currentPositionIndex: number;
  setCurrentPositionIndex: React.Dispatch<React.SetStateAction<number>>;
  flameOn: boolean;
  perfSucks: boolean;
  rotateSauce: boolean;
  sauceRef: React.RefObject<any>;
  isMobile: boolean;
}

function Scene({
  isIdle,
  currentPositionIndex,
  setCurrentPositionIndex,
  flameOn,
  perfSucks,
  rotateSauce,
  sauceRef,
  isMobile,
}: SceneProps) {
  const { camera } = useThree();
  const targetRef = useRef(new THREE.Vector3());

  // Extended camera positions for smooth, cinematic idle mode.
  const cameraPositions = [
    {
      position: [10, 20, 6] as [number, number, number],
      target: [0, 1, 0] as [number, number, number],
    },
    {
      position: [-100, 2, -6] as [number, number, number],
      target: [0, 1, 0] as [number, number, number],
    },
    {
      position: [10, 5, 7.5] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
    },
    {
      position: [150, 3, 5] as [number, number, number],
      target: [0, 1, 0] as [number, number, number],
    },
    {
      position: [-15, 3, -5] as [number, number, number],
      target: [0, 1, 0] as [number, number, number],
    },
    {
      position: [5, 5, 5] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
    },
    {
      position: [-5, 5, 5] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
    },
    {
      position: [12, 14, 8] as [number, number, number],
      target: [0, 1, 0] as [number, number, number],
    },
    {
      position: [-120, 4, -8] as [number, number, number],
      target: [0, 1, 0] as [number, number, number],
    },
    {
      position: [8, 60, 6] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
    },
    {
      position: [-8, 6, -6] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
    },
    {
      position: [20, 2, 0] as [number, number, number],
      target: [0, 1, 0] as [number, number, number],
    },
    {
      position: [-20, 2, 10] as [number, number, number],
      target: [0, 1, 0] as [number, number, number],
    },
    {
      position: [10, 7, 20] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
    },
    {
      position: [0, 20, -100] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
    },
    {
      position: [100, 100, 0] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
    },
    {
      position: [-10, 10, 0] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
    },
    {
      position: [0, 150, 10] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
    },
    {
      position: [0, 150, 100] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
    },
    {
      position: [15, 15, 15] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
    },
    {
      position: [0, 0, 50] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
    },
    {
      position: [0, 0, -50] as [number, number, number],
      target: [0, 0, 0] as [number, number, number],
    },
  ];

  useFrame((_, delta) => {
    if (isIdle) {
      const target = cameraPositions[currentPositionIndex];
      // Use a damping value for smooth cinematic transitions.
      easing.damp3(camera.position, target.position, 1.5, delta);
      easing.damp3(targetRef.current, target.target, 1.5, delta);
      camera.lookAt(targetRef.current);
    }
    if (rotateSauce && sauceRef.current) {
      sauceRef.current.rotation.y += delta / 4;
    }
  });

  useEffect(() => {
    if (isIdle) {
      const interval = setInterval(() => {
        setCurrentPositionIndex(
          (prevIndex) => (prevIndex + 1) % cameraPositions.length,
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isIdle, cameraPositions.length, setCurrentPositionIndex]);

  const AnimatedGroup = a("group");

  const logoSpring = useSpring<{
    scale: [number, number, number];
    position: [number, number, number];
  }>({
    from: {
      scale: [0, 0, 0],
      position: [isMobile ? -0.82 + 2 : -0.82, -1.25, 0],
    },
    to: { scale: [1, 1, 1], position: [isMobile ? -0.82 + 2 : -0.82, 0.75, 0] },
    config: { mass: 1, tension: 170, friction: 26 },
  });
  const sauceSpring = useSpring<{
    scale: [number, number, number];
    position: [number, number, number];
  }>({
    from: { scale: [0, 0, 0], position: [0, -2.5, 0] },
    to: { scale: [1, 1, 1], position: [0, -0.5, 0] },
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <StaticBody>
        <AnimatedGroup
          scale={logoSpring.scale.to(
            (x, y, z) => [x, y, z] as [number, number, number],
          )}
          position={logoSpring.position.to(
            (x, y, z) => [x, y, z] as [number, number, number],
          )}
        >
          <SunnyIslandLogo />
        </AnimatedGroup>
      </StaticBody>
      <StaticBody>
        <AnimatedGroup
          ref={sauceRef}
          scale={sauceSpring.scale.to(
            (x, y, z) => [x, y, z] as [number, number, number],
          )}
          position={sauceSpring.position.to(
            (x, y, z) => [x, y, z] as [number, number, number],
          )}
        >
          <Suspense fallback={<Preloader onLoaded={() => {}} />}>
            <PepperSauce />
          </Suspense>
          {flameOn && <Flame color="red" position={[0.5, 1.5, 0]} />}
        </AnimatedGroup>
      </StaticBody>
      <Env perfSucks={perfSucks} />
    </>
  );
}

function Env({ perfSucks }: { perfSucks: boolean }) {
  return (
    <Environment frames={perfSucks ? 1 : Infinity}>
      <Lightformer
        intensity={4}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
        scale={[10, 10, 1]}
      />
    </Environment>
  );
}

export default function MainPage() {
  const [currentProduct, setCurrentProduct] = useState<Product>(
    productsData[0],
  );
  const [isIdle, setIsIdle] = useState(false);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [flameOn, setFlameOn] = useState(false);
  const [perfSucks, degrade] = useState(false);
  const [comingSoonProduct, setComingSoonProduct] = useState<Product | null>(
    null,
  );
  const [showPeppers, setShowPeppers] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [rotateSauce, setRotateSauce] = useState(false);
  const sauceRef = useRef<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile on mount.
  useEffect(() => {
    setIsMobile(window.innerWidth < 600);
  }, []);

  // Idle logic: if no mouse movement for 5 seconds, set idle state.
  useEffect(() => {
    let idleTimeout: ReturnType<typeof setTimeout>;
    const handleMouseMove = () => {
      clearTimeout(idleTimeout);
      setIsIdle(false);
      setShowOverlay(true);
      idleTimeout = setTimeout(() => setIsIdle(true), 5000);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(idleTimeout);
    };
  }, []);

  // Keydown listener for toggling HUD ("h") and sauce rotation ("r")
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "h") {
        setShowOverlay((prev) => !prev);
        document.body.style.cursor = showOverlay ? "none" : "default";
      }
      if (e.key === "r") {
        setRotateSauce((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showOverlay]);

  const handleProductSelection = (productId: number) => {
    const selectedProduct = productsData.find(
      (product) => product.id === productId,
    );
    if (selectedProduct) {
      setCurrentProduct(selectedProduct);
      setComingSoonProduct(
        selectedProduct.modelId === null ? selectedProduct : null,
      );
    }
  };

  return (
    <>
      {/* Show overlay only when not idle */}
      {!isIdle && showOverlay && (
        <Overlay
          toggleFlame={() => setFlameOn((prev) => !prev)}
          togglePeppers={() => setShowPeppers((prev) => !prev)}
          currentProduct={currentProduct}
          productsData={productsData}
          onSelectProduct={handleProductSelection}
        />
      )}

      {/* Animated widescreen letterbox bars (visible only when idle) */}
      {isIdle && (
        <>
          <motion.div
            variants={topLetterboxVariants}
            initial="hidden"
            animate="visible"
            className="fixed top-0 left-0 right-0 h-[100px] bg-black z-[10000]"
          />
          <motion.div
            variants={bottomLetterboxVariants}
            initial="hidden"
            animate="visible"
            className="fixed bottom-0 left-0 right-0 h-[100px] bg-black z-[10000]"
          />
        </>
      )}

      <div className="absolute w-full h-screen">
        <Canvas
          shadows
          camera={{ position: [20, 0.9, 20], fov: 26 }}
          style={{
            background: "linear-gradient(180deg, #000000, #2C2C2C, #6A6A6A)",
          }}
        >
          <OrbitControls enableZoom enablePan />
          <PerformanceMonitor onDecline={() => degrade(true)} />
          <Physics>
            <Suspense fallback={<Preloader onLoaded={() => {}} />}>
              <Scene
                isIdle={isIdle}
                currentPositionIndex={currentPositionIndex}
                setCurrentPositionIndex={setCurrentPositionIndex}
                flameOn={flameOn}
                perfSucks={perfSucks}
                rotateSauce={rotateSauce}
                sauceRef={sauceRef}
                isMobile={isMobile}
              />
              {showPeppers && <Peppers count={perfSucks ? 20 : 80} />}
            </Suspense>
          </Physics>
          <EffectComposer>
            <Bloom
              luminanceThreshold={0}
              luminanceSmoothing={0.9}
              height={300}
            />
          </EffectComposer>
        </Canvas>
      </div>
      {comingSoonProduct && (
        <ComingSoonPopup
          product={comingSoonProduct}
          onClose={() => setComingSoonProduct(null)}
        />
      )}
    </>
  );
}
