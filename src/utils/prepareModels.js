// scripts/prepareModels.js
import { execSync } from "child_process";
import fs from "fs";

const RING_URL =
  "https://ion.jamesallen.com/.../Ring_17740_JV_RND_100.gltf?v=2.0.84";
const BIN_URL =
  "https://ion.jamesallen.com/.../Ring_17740_JV_RND_100.bin?v=2.0.84";

const MODEL_DIR = "./public/models";

// Ensure models dir exists
if (!fs.existsSync(MODEL_DIR)) {
  fs.mkdirSync(MODEL_DIR, { recursive: true });
}

// Download GLTF + BIN
execSync(`curl -L "${RING_URL}" -o ${MODEL_DIR}/ring.gltf`);
execSync(`curl -L "${BIN_URL}" -o ${MODEL_DIR}/ring.bin`);

// Join to single GLB
execSync(
  `npx @gltf-transform/cli copy ${MODEL_DIR}/ring.gltf ${MODEL_DIR}/ring_raw.glb --format glb --join`
);

// Decompress Draco
execSync(
  `npx @gltf-transform/cli optimize ${MODEL_DIR}/ring_raw.glb ${MODEL_DIR}/Ring_17740_JV_RND_100_decoded.glb --compress draco=false`
);

console.log("✅ Ring model prepared successfully!");
