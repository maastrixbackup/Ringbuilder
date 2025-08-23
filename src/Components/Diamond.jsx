import { forwardRef } from "react";
import { useGLTF, Sparkles } from "@react-three/drei";

const Diamond = forwardRef(
  ({ cubeMap, scale = 1, position = [0, 0, 0] }, ref) => {
    const { nodes } = useGLTF("/models/stone_RND_decoded.glb");

    return (
      <group scale={scale} position={position}>
        <mesh
          ref={ref}
          geometry={nodes.Stone_RND.geometry} 
          // scale={scale}
          // position={position}
        >
          <meshPhysicalMaterial
            envMap={cubeMap}
            envMapIntensity={2}
            transmission={1}
            roughness={0}
            metalness={0}
            clearcoat={1}
            clearcoatRoughness={0}
            ior={2.42}
            thickness={0.5}
          />
        </mesh>
        
      </group>
    );
  }
);

export default Diamond;
