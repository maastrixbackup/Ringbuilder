import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

const CRYSTAL_HDR = "/lighting/metals/pack2/metal_white.hdr";
const hdrCache = {};

export function useHDRLoader() {
  const { gl, scene } = useThree();
  const pmrem = useMemo(() => new THREE.PMREMGenerator(gl), [gl]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    scene.background = new THREE.Color(0xffffff);
  }, [scene]);

  useEffect(() => {
    setReady(false);

    const apply = (env) => {
      if (scene.environment && scene.environment !== env) {
        scene.environment.dispose?.();
      }

      scene.environment = env;
      scene.background = new THREE.Color(0xffffff);

      scene.traverse((o) => {
        if (o.isMesh && o.material) {
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => {
            m.envMap = scene.environment;
            m.envMapIntensity = 1.35;
            m.needsUpdate = true;
          });
        }
      });
      setReady(true);
    };

    if (hdrCache[CRYSTAL_HDR]) {
      apply(hdrCache[CRYSTAL_HDR]);
      return;
    }

    new RGBELoader().load(CRYSTAL_HDR, (hdr) => {
      const env = pmrem.fromEquirectangular(hdr).texture;
      hdrCache[CRYSTAL_HDR] = env;
      apply(env);
      hdr.dispose();
    });
  }, [pmrem, scene]);

  return ready;
}
