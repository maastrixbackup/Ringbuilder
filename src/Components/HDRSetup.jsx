import { useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { diamondMaterial } from "./materials";

const METAL_HDRS = {
  white: "/lighting/metals/pack2/metal_white.hdr",
  yellow: "/lighting/metals/pack2/metal_yellow_soft.hdr",
  rose: "/lighting/metals/pack2/metal_rose_low.hdr",
};

// simple cache so we don’t reload every time
const hdrCache = {};

export function HDRSetup({ metalKey }) {
  const { gl, scene } = useThree();

  const pmrem = useMemo(() => new THREE.PMREMGenerator(gl), [gl]);

  // 🟡 Load Metal HDR
  useEffect(() => {
    if (!metalKey) return;
    const path = METAL_HDRS[metalKey];

    if (hdrCache[path]) {
      scene.environment = hdrCache[path];
      return;
    }

    new RGBELoader().load(path, (hdr) => {
      const env = pmrem.fromEquirectangular(hdr).texture;
      hdrCache[path] = env;
      scene.environment = env;
      hdr.dispose();
    });
  }, [metalKey, pmrem, scene]);

  // 💎 Load Diamond HDR (only once)
  useEffect(() => {
    const path = "/lighting/diamond/rb_diamond_1k.hdr";

    if (hdrCache[path]) {
      diamondMaterial.envMap = hdrCache[path];
      diamondMaterial.envMapIntensity = 1.3;
      diamondMaterial.needsUpdate = true;
      return;
    }

    new RGBELoader().load(path, (hdr) => {
      const env = pmrem.fromEquirectangular(hdr).texture;
      hdrCache[path] = env;
      diamondMaterial.envMap = env;
      diamondMaterial.envMapIntensity = 1.3;
      diamondMaterial.needsUpdate = true;
      hdr.dispose();
    });
  }, [pmrem]);

  return null;
}
