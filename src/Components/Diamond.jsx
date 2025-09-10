import { forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { diamondMaterial } from "./materials";

const Diamond = forwardRef(({ scale = 1, position = [0, 0, 0] }, ref) => {
  const { nodes } = useGLTF("/models/stone_RND_decoded.glb");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const meshRef = ref ?? useRef();

  return (
    <mesh
      ref={meshRef}
      geometry={nodes.Stone_RND.geometry}
      scale={scale}
      position={position}
      material={diamondMaterial}
    />
  );
});

export default Diamond;
