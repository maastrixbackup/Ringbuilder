// useDiamondEnv.js
import { useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export function useDiamondEnv(gl, hdr = "/lighting/diamond/rb_diamond_1k.hdr") {
  const [envMap, setEnvMap] = useState(null);
  const pmrem = useMemo(() => new THREE.PMREMGenerator(gl), [gl]);

  useEffect(() => {
    let disposed = false;
    new RGBELoader().load(hdr, (tex) => {
      if (disposed) return;
      const env = pmrem.fromEquirectangular(tex).texture;
      tex.dispose();
      console.log("✅ Diamond HDR loaded:", hdr);
      setEnvMap(env);
    });
    return () => {
      disposed = true;
      pmrem.dispose();
    };
  }, [hdr, pmrem]);

  return envMap;
}
