// Back to your original HDR setup approach - it was working well
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { diamondMaterial } from "./materials";

const METAL_HDRS = {
  white: "/lighting/metals/pack2/metal_white.hdr",
  yellow: "/lighting/metals/pack2/metal_yellow_soft.hdr",
  rose: "/lighting/metals/pack2/metal_rose_low.hdr",
};

const hdrCache = {};

export function useHDRLoader(metalKey) {
  const { gl, scene } = useThree();
  const pmrem = useMemo(() => new THREE.PMREMGenerator(gl), [gl]);
  const [ready, setReady] = useState(false);

  // Keep white background like your original
  useEffect(() => {
    scene.background = new THREE.Color(0xffffff);
  }, [scene]);

  // Your original HDR loading approach
  useEffect(() => {
    if (!metalKey) return;
    const path = METAL_HDRS[metalKey];
    setReady(false);

    const apply = (env) => {
      if (scene.environment && scene.environment !== env) {
        scene.environment.dispose?.();
      }
      scene.environment = env;

      // Force all materials to update
      scene.traverse((o) => {
        if (o.isMesh && o.material) {
          if (Array.isArray(o.material)) {
            o.material.forEach((m) => (m.needsUpdate = true));
          } else {
            o.material.needsUpdate = true;
          }
        }
      });

      setReady(true);
    };

    if (hdrCache[path]) {
      apply(hdrCache[path]);
      return;
    }

    new RGBELoader().load(path, (hdr) => {
      const env = pmrem.fromEquirectangular(hdr).texture;
      hdrCache[path] = env;
      apply(env);
      hdr.dispose();
    });
  }, [metalKey, pmrem, scene]);

  // Your original diamond HDR approach
  const DIAMOND_HDR = "/lighting/diamond/rb_diamond_1k.hdr";
  const diamondEnvRef = useRef(null);

  useEffect(() => {
    const apply = (env) => {
      diamondMaterial.envMap = env;
      diamondMaterial.envMapIntensity = 1.35; // Your original value
      diamondMaterial.needsUpdate = true;
    };

    if (diamondEnvRef.current) {
      apply(diamondEnvRef.current);
      return;
    }

    new RGBELoader().load(DIAMOND_HDR, (hdr) => {
      const env = pmrem.fromEquirectangular(hdr).texture;
      hdr.dispose();
      diamondEnvRef.current = env;
      apply(env);
    });
  }, [pmrem]);

  return ready;
}