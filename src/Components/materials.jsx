import * as THREE from "three";

// Use the same exact hex for white gold/platinum
const WHITE_METAL_COLOR = 0xf8f8f8; // bright crisp white

export const metalMaterial = new THREE.MeshPhysicalMaterial({
  transmission: 0.0,
  transparent: false,
  opacity: 1.0,
  color: WHITE_METAL_COLOR,
  metalness: 0.95,
  roughness: 0.08,
  envMapIntensity: 1.8,
  clearcoat: 0.8,
  clearcoatRoughness: 0.02,
  reflectivity: 1.0,
});

export const METAL_THEMES = {
  white: { color: WHITE_METAL_COLOR, rough: 0.08, env: 1.8 },
  yellow: { color: 0xd4af37, rough: 0.14, env: 1.05 },
  rose: { color: 0xb76e79, rough: 0.14, env: 1.05 },
};

export function setMetalTheme(key) {
  const t = METAL_THEMES[key];
  if (!t) return;
  metalMaterial.color.setHex(t.color);
  metalMaterial.roughness = t.rough;
  metalMaterial.envMapIntensity = t.env;
  metalMaterial.clearcoat = t.clearcoat ?? 0.8;
  metalMaterial.needsUpdate = true;
}


// Enhanced diamond material for brilliant crystal effect
export const diamondMaterial = new THREE.MeshPhysicalMaterial({
  transmission: 1.3,
  transparent: true,
  opacity: 1,
  ior: 2.417,                 // Diamond refractive index
  thickness: 1.5,             // more depth for light bouncing
  roughness: 0.0,             // perfectly polished
  metalness: 0.0,
  clearcoat: 1.0,
  clearcoatRoughness: 0.0,
  attenuationColor: new THREE.Color("#ffffff"),
  attenuationDistance: 10,    // much higher so diamond stays bright
  envMapIntensity: 5.0,       // strong reflections
  reflectivity: 1.0,
  specularIntensity: 1.0,
  specularColor: new THREE.Color("#ffffff"),
});