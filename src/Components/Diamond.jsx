import { forwardRef } from "react";
import { useGLTF, Sparkles } from "@react-three/drei";

const Diamond = forwardRef(
  ({ cubeMap, scale = 1, position = [0, 0, 0] }, ref) => {
    const { nodes } = useGLTF("/models/stone_RND_decoded.glb");

    return (
      <mesh
        ref={ref}
        geometry={nodes.Stone_RND.geometry}
        scale={scale}
        position={position}
      >
        <meshPhysicalMaterial
          envMap={cubeMap}
          envMapIntensity={1.35}
          transmission={1.0}
          roughness={0.02}
          metalness={0.0}
          clearcoat={1}
          clearcoatRoughness={0.02}
          ior={2.417} 
          thickness={1.5} 
        />
      </mesh>
    );
  }
);

export default Diamond;
