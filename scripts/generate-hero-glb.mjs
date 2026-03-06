import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

const INPUT_PATH = process.argv[2] ?? "public/image/hero-3d.avif";
const OUTPUT_PATH = process.argv[3] ?? "public/models/hero-3d-model.glb";
const SAMPLE_STEP = Number(process.argv[4] ?? 4);
const MAX_WIDTH = Number(process.argv[5] ?? 180);
const DEPTH_LAYERS = Number(process.argv[6] ?? 8);
const BG_THRESHOLD = Number(process.argv[7] ?? 44);

if (typeof globalThis.FileReader === "undefined") {
  globalThis.FileReader = class FileReader {
    constructor() {
      this.result = null;
      this.onloadend = null;
      this.onerror = null;
    }
    readAsArrayBuffer(blob) {
      blob
        .arrayBuffer()
        .then((buf) => {
          this.result = buf;
          if (this.onloadend) this.onloadend();
        })
        .catch((err) => {
          if (this.onerror) this.onerror(err);
        });
    }
    readAsDataURL(blob) {
      blob
        .arrayBuffer()
        .then((buf) => {
          const b64 = Buffer.from(buf).toString("base64");
          this.result = `data:${blob.type || "application/octet-stream"};base64,${b64}`;
          if (this.onloadend) this.onloadend();
        })
        .catch((err) => {
          if (this.onerror) this.onerror(err);
        });
    }
  };
}

function readPixel(data, width, x, y) {
  const idx = (y * width + x) * 4;
  return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
}

function colorDistance(a, b) {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function createCubeTemplates() {
  const positions = [
    -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5,
    0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5,
    -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5,
    0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5,
    -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5,
  ];

  const normals = [
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
  ];

  const indices = [];
  for (let f = 0; f < 6; f++) {
    const o = f * 4;
    indices.push(o, o + 1, o + 2, o, o + 2, o + 3);
  }
  return { positions, normals, indices };
}

async function createVoxelMeshFromImage() {
  const { data, info } = await sharp(INPUT_PATH)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const ratio = height / width;

  const corners = [
    readPixel(data, width, 0, 0),
    readPixel(data, width, width - 1, 0),
    readPixel(data, width, 0, height - 1),
    readPixel(data, width, width - 1, height - 1),
  ];
  const bg = [
    Math.round(corners.reduce((s, c) => s + c[0], 0) / corners.length),
    Math.round(corners.reduce((s, c) => s + c[1], 0) / corners.length),
    Math.round(corners.reduce((s, c) => s + c[2], 0) / corners.length),
  ];

  const gridWidth = Math.ceil(width / SAMPLE_STEP);
  const modelWidth = 2.8;
  const modelHeight = modelWidth * ratio;
  const voxelSize = modelWidth / gridWidth;
  const depthSpacing = voxelSize * 0.86;

  const cube = createCubeTemplates();
  const positions = [];
  const normals = [];
  const colors = [];
  const indices = [];
  let vertexOffset = 0;
  let voxelCount = 0;

  for (let py = 0; py < height; py += SAMPLE_STEP) {
    for (let px = 0; px < width; px += SAMPLE_STEP) {
      const [r, g, b, a] = readPixel(data, width, px, py);
      if (a < 40) continue;

      const likelyBg = a > 225 && colorDistance([r, g, b], bg) < BG_THRESHOLD;
      if (likelyBg) continue;

      const x = ((px / width) - 0.5) * modelWidth;
      const y = (0.5 - (py / height)) * modelHeight;

      for (let layer = 0; layer < DEPTH_LAYERS; layer++) {
        const z = (layer - (DEPTH_LAYERS - 1) / 2) * depthSpacing;
        const shade = 0.7 + (layer / Math.max(1, DEPTH_LAYERS - 1)) * 0.45;
        const cr = Math.min(1, (r / 255) * shade);
        const cg = Math.min(1, (g / 255) * shade);
        const cb = Math.min(1, (b / 255) * shade);

        for (let i = 0; i < cube.positions.length; i += 3) {
          positions.push(
            x + cube.positions[i] * voxelSize,
            y + cube.positions[i + 1] * voxelSize,
            z + cube.positions[i + 2] * voxelSize
          );
          normals.push(cube.normals[i], cube.normals[i + 1], cube.normals[i + 2]);
          colors.push(cr, cg, cb);
        }

        for (let i = 0; i < cube.indices.length; i++) {
          indices.push(vertexOffset + cube.indices[i]);
        }

        vertexOffset += 24;
        voxelCount += 1;
      }
    }
  }

  if (voxelCount === 0) {
    throw new Error("No voxels produced from image. Try lowering BG threshold or sample step.");
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeBoundingBox();
  geometry.center();

  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.38,
    metalness: 0.18,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "HeroVoxelModel";
  return { mesh, voxelCount };
}

async function exportGLB(scene, outPath) {
  const exporter = new GLTFExporter();
  await new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => {
        if (!(result instanceof ArrayBuffer)) {
          reject(new Error("Exporter did not return binary output."));
          return;
        }
        const absOut = path.resolve(outPath);
        fs.mkdirSync(path.dirname(absOut), { recursive: true });
        fs.writeFileSync(absOut, Buffer.from(result));
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });
}

async function main() {
  const { mesh, voxelCount } = await createVoxelMeshFromImage();
  const scene = new THREE.Scene();
  scene.add(mesh);
  await exportGLB(scene, OUTPUT_PATH);
  console.log(`GLB generated: ${OUTPUT_PATH}`);
  console.log(`Voxels: ${voxelCount}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
