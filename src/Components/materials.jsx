import * as THREE from "three";

// Metal material
export const metalMaterial = new THREE.MeshPhysicalMaterial({
  metalness: 1.0,
  roughness: 0.20,
  envMapIntensity: 1.0,
  clearcoat: 0.8,
  clearcoatRoughness: 0.15,
});

export const METAL_THEMES = {
  white: { color: 0xdddddd, rough: 0.18, env: 1.0 },
  yellow: { color: 0xd4af37, rough: 0.22, env: 1.1 },
  rose: { color: 0xb76e79, rough: 0.20, env: 1.05 },
};

export function setMetalTheme(key) {
  const t = METAL_THEMES[key];
  if (!t) return;
  metalMaterial.color.setHex(t.color);
  metalMaterial.roughness = t.rough;
  metalMaterial.envMapIntensity = t.env;
  metalMaterial.needsUpdate = true;
}

// Diamond material
export const diamondMaterial = new THREE.MeshPhysicalMaterial({
  transmission: 1.0,
  ior: 2.417,
  thickness: 1.5,
  roughness: 0.02,
  metalness: 0.0,
  clearcoat: 1.0,
  clearcoatRoughness: 0.02,
});
