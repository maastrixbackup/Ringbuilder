import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export const METAL_HDRS = {
  white: "/lighting/metals/pack2/metal_white.hdr",
  yellow: "/lighting/metals/pack2/metal_yellow_soft.hdr",
  rose: "/lighting/metals/pack2/metal_rose_low.hdr",
};

const DIAMOND_HDR = "/lighting/diamond/rb_diamond_1k.hdr";

const cache = { metals: {}, diamond: null };

export async function preloadHDRs(renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const loader = new RGBELoader();

  const load = (url) =>
    new Promise((resolve, reject) => {
      loader.load(
        url,
        (hdr) => {
          const tex = pmrem.fromEquirectangular(hdr).texture;
          hdr.dispose();
          resolve(tex);
        },
        undefined,
        reject
      );
    });

  for (const key of Object.keys(METAL_HDRS)) {
    if (!cache.metals[key]) {
      cache.metals[key] = await load(METAL_HDRS[key]);
    }
  }

  if (!cache.diamond) {
    cache.diamond = await load(DIAMOND_HDR);
  }

  pmrem.dispose();
}

export function setMetalHDR(key, scene) {
  if (cache.metals[key]) scene.environment = cache.metals[key];
}

export function setDiamondHDR(diamondMaterial) {
  if (cache.diamond) {
    diamondMaterial.envMap = cache.diamond;
    diamondMaterial.envMapIntensity = 1.3;
    diamondMaterial.needsUpdate = true;
  }
}

// 👇 Re-add setMetalTheme
const THEMES = {
  white: { color: 0xdddddd, rough: 0.18, env: 1.0 },
  yellow: { color: 0xd4af37, rough: 0.22, env: 1.1 },
  rose: { color: 0xb76e79, rough: 0.2, env: 1.05 },
};

export function setMetalTheme(key, metalMaterial) {
  const t = THEMES[key];
  if (!t) return;
  metalMaterial.color.setHex(t.color);
  metalMaterial.roughness = t.rough;
  metalMaterial.envMapIntensity = t.env;
  metalMaterial.needsUpdate = true;
}
