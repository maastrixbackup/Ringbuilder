import { useCubeTexture } from '@react-three/drei';

export default function EnvironmentMap() {
  const cubeMap = useCubeTexture(
    [
      'pano_px.webp',
      'pano_nx.webp',
      'pano_py.webp',
      'pano_ny.webp',
      'pano_pz.webp',
      'pano_nz.webp'
    ],
    { path: '/textures/stone_env/' }
  );

  return <primitive attach="environment" object={cubeMap} />;
}
