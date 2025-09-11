import { useEffect } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export function DiamondEnvBind({
  root,
  pmrem,
  hdr = "/lighting/diamond/rb_diamond_1k.hdr",
}) {
  useEffect(() => {
    if (!root || !pmrem) return;

    let disposed = false;
    new RGBELoader().load(hdr, (tex) => {
      if (disposed) return;
      const env = pmrem.fromEquirectangular(tex).texture;
      tex.dispose();

      // find all diamond meshes/materials
      const mats = new Set();
      root.traverse((o) => {
        if (o.isMesh && /diamond/i.test(o.name)) {
          const m = o.material;
          if (Array.isArray(m)) m.forEach((mm) => mats.add(mm));
          else mats.add(m);
        }
      });

      let applied = 0;
      mats.forEach((m) => {
        if (!m || !(m instanceof THREE.MeshPhysicalMaterial)) return;
        m.envMap = env;
        m.transmission = 1.0;
        m.transparent = true;
        m.ior = 2.417;
        m.thickness = 1.5;
        m.roughness = 0.02;
        m.metalness = 0.0;
        m.clearcoat = 0.2;
        m.clearcoatRoughness = 0.05;
        m.envMapIntensity = 1.2;
        m.attenuationColor = new THREE.Color("#ffffff");
        m.specularColor = new THREE.Color("#ffffff");
        m.needsUpdate = true;
        applied++;
      });

      console.log({
        diamondMaterialsFound: mats.size,
        diamondMaterialsEnvApplied: applied,
        envMappingIsPMREM: env.mapping === THREE.CubeUVReflectionMapping,
      });
    });

    return () => {
      disposed = true;
    };
  }, [root, pmrem, hdr]);

  return null;
}
