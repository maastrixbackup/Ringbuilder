import * as THREE from "three";

// Enhanced metal material for crisp finish
export const metalMaterial = new THREE.MeshPhysicalMaterial({
  transmission: 0.0, // Remove transmission for solid metal look
  transparent: false,
  opacity: 1.0,
  color: 0xf8f8f8, // Brighter white for crispness
  metalness: 0.95, // Slightly reduced for better light interaction
  roughness: 0.08, // Smoother for more reflections
  envMapIntensity: 1.8, // Increased for better reflections
  clearcoat: 0.8, // Higher clearcoat for glossy finish
  clearcoatRoughness: 0.02, // Very smooth clearcoat
  reflectivity: 1.0, // Maximum reflectivity
});

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
  metalMaterial.clearcoat = t.clearcoat;
  metalMaterial.needsUpdate = true;
}

// Enhanced diamond material for brilliant crystal effect
export const diamondMaterial = new THREE.MeshPhysicalMaterial({
  transmission: 0.98, // High transmission for glass-like effect
  transparent: true,
  opacity: 1.0,
  ior: 2.417, // Diamond's refractive index
  thickness: 1.2, // Reduced thickness for better light penetration
  roughness: 0.005, // Ultra-smooth for maximum brilliance
  metalness: 0.0,
  clearcoat: 1.0, // Maximum clearcoat for crystal effect
  clearcoatRoughness: 0.0, // Perfect smoothness
  attenuationColor: new THREE.Color("#ffffff"),
  attenuationDistance: 0.5, // Shorter distance for clearer appearance
  specularColor: new THREE.Color("#ffffff"),
  envMapIntensity: 2.5, // Higher for more reflections
  reflectivity: 1.0, // Maximum reflectivity
  // Add dispersion effect if supported
  dispersion: 0.025, // Creates rainbow effect in refractions
});