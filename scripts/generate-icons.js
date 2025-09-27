// Generates PWA icons from public/icon.svg using sharp
import sharp from "sharp";
import { readFile, mkdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const srcSvg = join(root, "public", "icon.svg");
const outDir = join(root, "public", "icons");

const sizes = [192, 512];

async function main() {
  await mkdir(outDir, { recursive: true });
  const svg = await readFile(srcSvg);
  // standard icons
  await Promise.all(
    sizes.map((s) =>
      sharp(svg)
        .resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(join(outDir, `icon-${s}.png`))
    )
  );
  // maskable: add padding for safe area
  await sharp(svg)
    .extend({ top: 64, bottom: 64, left: 64, right: 64, background: { r: 11, g: 15, b: 26, alpha: 1 } })
    .resize(512, 512)
    .png()
    .toFile(join(outDir, "maskable-512.png"));
  console.log("Icons generated in public/icons");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});