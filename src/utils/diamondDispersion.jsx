import * as THREE from "three";

export function createDiamondMaterial(envMap) {
  const diamondMaterial = new THREE.MeshPhysicalMaterial({
    transmission: 1.0,
    transparent: true,
    ior: 2.417,
    thickness: 0.3,
    roughness: 0.0,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    envMap: envMap || null,
    envMapIntensity: 3.0,
    specularIntensity: 1.0,
    specularColor: new THREE.Color("#ffffff"),
    attenuationColor: new THREE.Color("#ffffff"),
    attenuationDistance: 0.5,
  });

  diamondMaterial.onBeforeCompile = (shader) => {
    shader.uniforms.iorR = { value: 2.417 };
    shader.uniforms.iorG = { value: 2.419 };
    shader.uniforms.iorB = { value: 2.423 };

    // Inject dispersion AFTER normal transmission is calculated
    shader.fragmentShader = shader.fragmentShader.replace(
      `#include <transmission_fragment>`,
      `
        #include <transmission_fragment>

        // --- Dispersion tweak ---
        vec3 dispersion = vec3(0.0);

        float etaR = 1.0 / iorR;
        float etaG = 1.0 / iorG;
        float etaB = 1.0 / iorB;

        vec3 N = geometryNormal;
        vec3 I = -geometryViewDir;

        vec3 refractDirR = refract(I, N, etaR);
        vec3 refractDirG = refract(I, N, etaG);
        vec3 refractDirB = refract(I, N, etaB);

        vec3 colR = textureCube(envMap, refractDirR).rgb;
        vec3 colG = textureCube(envMap, refractDirG).rgb;
        vec3 colB = textureCube(envMap, refractDirB).rgb;

        dispersion = vec3(colR.r, colG.g, colB.b);

        // Blend dispersion into transmission
        totalDiffuse = mix(totalDiffuse, dispersion, 0.5);
      `
    );
  };

  return diamondMaterial;
}
