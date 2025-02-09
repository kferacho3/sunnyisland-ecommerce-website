import { Detailed, Environment, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { DepthOfField, EffectComposer, ToneMapping } from '@react-three/postprocessing'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'


// Assuming the PepperSauce is at the origin and has a radius for collision detection
const pepperSaucePosition = new THREE.Vector3(0, 0, 0); // Adjust based on your PepperSauce position
const pepperSauceRadius = 2; // Adjust based on the approximate size of your PepperSauce

function Pepper({ index, z, speed, color }) {
  const ref = useRef();
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);
  // Load both models
  const yellowPepper = useGLTF('https://sunnyisland.s3.us-east-2.amazonaws.com/media/glb/yellowPepper.glb');
  const redPepper = useGLTF('https://sunnyisland.s3.us-east-2.amazonaws.com/media/glb/redPepper.glb');

  const [data] = useState({
    y: THREE.MathUtils.randFloatSpread(height * 2),
    x: THREE.MathUtils.randFloatSpread(2),
    spin: THREE.MathUtils.randFloat(8, 12),
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
    direction: 1 // Assuming a direction for bouncing logic
  });

  useFrame((state, dt) => {
    // Simple collision detection
    const pepperPosition = new THREE.Vector3(
      index === 0 ? 0 : data.x * width,
      data.y,
      -z
    );

    const distance = pepperPosition.distanceTo(pepperSaucePosition);
    if (distance < pepperSauceRadius) {
      // Reverse direction upon collision
      data.direction *= -1;
    }

    // Update position based on direction
    data.y += dt * speed * data.direction;

    // Update position and rotation
    ref.current.position.set(pepperPosition.x, pepperPosition.y, pepperPosition.z);
    ref.current.rotation.set(
      (data.rX += dt / data.spin),
      Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
      (data.rZ += dt / data.spin)
    );

    // Reset position if it goes too far
    if (data.y > height * (index === 0 ? 4 : 1) || data.y < -(height * (index === 0 ? 4 : 1))) {
      data.y = THREE.MathUtils.randFloatSpread(height * 2);
    }
  });

  // Decide which model to use based on the color prop
  const { nodes } = color === 'yellow' ? yellowPepper : redPepper;

  return (
    <Detailed ref={ref} distances={[0, 65, 80]}>
      <mesh geometry={nodes.modelobj.geometry} material={nodes.modelobj.material} />
    </Detailed>
  );
}



export default function Peppers({ speed = 1, count = 80, depth = 80, easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)) }) {
  // Generate an array with color selection for each pepper based on the ratio
  const peppers = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push(Math.random() < 0.8 ? 'yellow' : 'red'); // 80% yellow, 20% red
    }
    return temp;
  }, [count]);

  return (
    <>
      <color attach="background" args={['#ffbf40']} />
      <spotLight position={[10, 20, 10]} penumbra={1} decay={0} intensity={3} color="orange" />
      {peppers.map((color, i) => (
        <Pepper key={i} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} color={color} />
      ))}
      <Environment preset="sunset" />
      <EffectComposer disableNormalPass multisampling={0}>
        <DepthOfField target={[0, 0, 60]} focalLength={0.4} bokehScale={10} height={700} />
        <ToneMapping />
      </EffectComposer>
    </>
  );
}
