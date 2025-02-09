import { useGLTF } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';
type GLTFResult = GLTF & {
  nodes: {
    Material1: THREE.Mesh
    Material1001: THREE.Mesh
    Material1002: THREE.Mesh
    Cylinder: THREE.Mesh
  }
  materials: {
    ['Mat.1']: THREE.MeshPhysicalMaterial
    ['Mat.2']: THREE.MeshStandardMaterial
    ['Mat.5']: THREE.MeshStandardMaterial
    ['Material.002']: THREE.MeshStandardMaterial
  }
}

export default function PepperSauce(props: ThreeElements['group']) {
  const { nodes, materials } = useGLTF(
    'https://sunnyisland.s3.us-east-2.amazonaws.com/media/glb/SunnyIslandPepperSauceFINAL.glb'
  ) as GLTFResult

  return (
    <group scale={.0075} {...props} dispose={null}>
      <mesh
        geometry={nodes.Material1.geometry}
        material={materials['Mat.1']}
        position={[0, -38.952, 0]}
        scale={[1.18, 1.15, 1.18]}
      />
      <mesh
        geometry={nodes.Material1001.geometry}
        material={materials['Mat.2']}
        position={[0, 93.081, 0]}
        scale={[1.189, 1.296, 1.189]}
      />
      <mesh
        geometry={nodes.Material1002.geometry}
        material={materials['Mat.5']}
        position={[0, 232.805, 0]}
        scale={[1.193, 1.155, 1.156]}
      />
      <mesh
        geometry={nodes.Cylinder.geometry}
        material={materials['Material.002']}
        position={[2.134, -58.219, 135.839]}
        scale={[139.699, 103.959, 139.032]}
      />
    </group>
  )
}

useGLTF.preload(
  'https://sunnyisland.s3.us-east-2.amazonaws.com/media/glb/SunnyIslandPepperSauceFINAL.glb'
)
