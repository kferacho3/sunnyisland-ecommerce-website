"use client";

import { a, useSpring } from "@react-spring/three";
import { Physics } from "@react-three/cannon";
import {
  AccumulativeShadows,
  Environment,
  Lightformer,
  OrbitControls,
  PerformanceMonitor,
  RandomizedLight,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { easing } from "maath";
import React, { Suspense, useEffect, useRef, useState } from "react";

import { Product, productsData } from "@/data/productsData";
import Flame from "./FlameShader";
import Peppers from "./models/Peppers";
import PepperSauce from "./models/PepperSauce";
import SunnyIslandLogo from "./models/SunnyIslandLogo";
import { ComingSoonPopup } from "./overlay/ComingSoon";
import { Overlay } from "./overlay/Overlay";
import Preloader from "./Preloader";

export default function MainPage() {
  const [currentProduct, setCurrentProduct] = useState<Product>(productsData[0]);
  const [isIdle, setIsIdle] = useState(false);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [flameOn, setFlameOn] = useState(false);
  const [perfSucks, degrade] = useState(false);
  const [comingSoonProduct, setComingSoonProduct] = useState<Product | null>(null);
  const [showPeppers, setShowPeppers] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [rotateSauce, setRotateSauce] = useState(false);
  const sauceRef = useRef<any>(null);

  // Idle logic: if no mouse movement for 5 seconds, enable auto camera movement.
  useEffect(() => {
    let idleTimeout: ReturnType<typeof setTimeout>;
    const handleMouseMove = () => {
      clearTimeout(idleTimeout);
      setIsIdle(false);
      idleTimeout = setTimeout(() => setIsIdle(true), 500000);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(idleTimeout);
    };
  }, []);

  // Keydown event listener for "h" (toggle overlay and hide cursor) and "r" (toggle rotation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "h") {
        setShowOverlay((prev) => !prev);
        // Hide cursor when overlay is hidden; restore when visible.
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
    const selectedProduct = productsData.find((product) => product.id === productId);
    if (selectedProduct) {
      setCurrentProduct(selectedProduct);
      if (selectedProduct.modelId === null) {
        setComingSoonProduct(selectedProduct);
      } else {
        setComingSoonProduct(null);
      }
    }
  };

  return (
    <>
      {showOverlay && (
        <Overlay
          toggleFlame={() => setFlameOn(!flameOn)}
          togglePeppers={() => setShowPeppers(!showPeppers)}
          currentProduct={currentProduct}
          productsData={productsData}
          onSelectProduct={handleProductSelection}
        />
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
              />
              {showPeppers && <Peppers count={perfSucks ? 20 : 80} />}
            </Suspense>
          </Physics>
          <EffectComposer>
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
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

interface SceneProps {
  isIdle: boolean;
  currentPositionIndex: number;
  setCurrentPositionIndex: React.Dispatch<React.SetStateAction<number>>;
  flameOn: boolean;
  perfSucks: boolean;
  rotateSauce: boolean;
  sauceRef: React.RefObject<any>;
}

function Scene({
  isIdle,
  currentPositionIndex,
  setCurrentPositionIndex,
  flameOn,
  perfSucks,
  rotateSauce,
  sauceRef,
}: SceneProps) {
  const { camera } = useThree();
  // DO NOT CHANGE ANY CAMERA POSITION VALUES.
  const positions = [
    {
      position: [10, 20, 10] as [number, number, number],
      target: [0, 1, 0] as [number, number, number],
    },
    {
      position: [-10, 10, 0] as [number, number, number],
      target: [0, 1, 0] as [number, number, number],
    },
  ];

  useFrame((_, delta) => {
    if (isIdle) {
      const target = positions[currentPositionIndex];
      easing.damp3(camera.position, target.position, 3, delta);
      camera.lookAt(...target.target);
    }
    if (rotateSauce && sauceRef.current) {
      sauceRef.current.rotation.y += delta/4;
    }
  });

  useEffect(() => {
    if (isIdle) {
      const interval = setInterval(() => {
        setCurrentPositionIndex((prevIndex) => (prevIndex + 1) % positions.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isIdle, positions.length, setCurrentPositionIndex]);

  const logoSpring = useSpring({
    from: { scale: [0, 0, 0], position: [-0.82, 0.75 - 2, 0] },
    to: { scale: [1, 1, 1], position: [-0.82, 0.75, 0] },
    config: { mass: 1, tension: 170, friction: 26 },
  });
  const sauceSpring = useSpring({
    from: { scale: [0, 0, 0], position: [0, -0.5 - 2, 0] },
    to: { scale: [1, 1, 1], position: [0, -0.5, 0] },
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <a.group {...logoSpring} >
        <SunnyIslandLogo />
      </a.group>
      <a.group ref={sauceRef} {...sauceSpring}>
        <PepperSauce />
        {flameOn && <Flame color="red" position={[0.5, 1.5, 0]} />}
        <AccumulativeShadows
          frames={100}
          alphaTest={0.85}
          opacity={0.8}
          color="red"
          scale={20}
          position={[0, -0.005, 0]}
        >
          <RandomizedLight
            amount={8}
            radius={6}
            ambient={0.5}
            intensity={10}
            position={[-1.5, 2.5, -2.5]}
            bias={0.001}
          />
        </AccumulativeShadows>
      </a.group>
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
