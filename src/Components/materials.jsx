import * as THREE from "three";

// Keep your original metal material approach - it was working well
export const metalMaterial = new THREE.MeshPhysicalMaterial({
  transmission: 1.0,
  transparent: true,
  opacity: 1.0,
  ior: 1.52,
  color: 0xf2f2f2,
  metalness: 1.2,
  roughness: 0.12,
  envMapIntensity: 1.0,
  clearcoat: 0.2,
  clearcoatRoughness: 0.05,
  attenuationColor: new THREE.Color("#ffffff"),
  attenuationDistance: 2.5,
});

// Your original metal themes were good
export const METAL_THEMES = {
  white: { color: 0xd9d7d6, rough: 0.12, env: 1.0 },
  yellow: { color: 0xd4af37, rough: 0.14, env: 1.05 },
  rose: { color: 0xb76e79, rough: 0.14, env: 1.05 },
};

export function setMetalTheme(key) {
  const t = METAL_THEMES[key];
  if (!t) return;
  metalMaterial.color.setHex(t.color);
  metalMaterial.roughness = t.rough;
  metalMaterial.envMapIntensity = t.env;
  metalMaterial.needsUpdate = true;
}

// Your original diamond material was better
export const diamondMaterial = new THREE.MeshPhysicalMaterial({
  transmission: 1.0,
  transparent: true,
  ior: 2.417,
  thickness: 2.5,
  roughness: 0.015,
  metalness: 0.0,
  clearcoat: 0.2,
  clearcoatRoughness: 0.05,
  attenuationColor: new THREE.Color("#ffffff"),
  specularColor: new THREE.Color("#ffffff"),
  envMapIntensity: 1.3,
});