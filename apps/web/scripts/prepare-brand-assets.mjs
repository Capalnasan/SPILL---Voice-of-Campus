import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Use Sharp installed with Next.js. The supplied full-resolution originals stay untouched.
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const webRoot = fileURLToPath(new URL("../", import.meta.url));
const repoRoot = resolve(webRoot, "../..");
const output = join(webRoot, "public", "brand");
await mkdir(output, { recursive: true });

for (const variant of ["compact", "long"]) {
  const { data, info } = await sharp(join(repoRoot, `${variant}_logo.png`)).trim()
    .resize({ width: variant === "compact" ? 640 : 768 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  await sharp(data, { raw: info }).png().toFile(join(output, `spill-${variant}-light.png`));
  const dark = Buffer.from(data);
  for (let index = 0; index < dark.length; index += 4) {
    const r = dark[index], g = dark[index + 1], b = dark[index + 2];
    // Reverse only neutral lettering; preserve the coral mark and alpha channel.
    if (Math.max(r, g, b) - Math.min(r, g, b) < 8) {
      dark[index] = 255 - r;
      dark[index + 1] = 255 - g;
      dark[index + 2] = 255 - b;
    }
  }
  await sharp(dark, { raw: info }).png().toFile(join(output, `spill-${variant}-dark.png`));
}

async function appIcon(size) {
  const inset = Math.max(1, Math.round(size * 0.05));
  const logo = await sharp(join(output, "spill-compact-light.png"))
    .resize(size - inset * 2, size - inset * 2, { fit: "inside" }).png().toBuffer();
  const metadata = await sharp(logo).metadata();
  return sharp({ create: { width: size, height: size, channels: 4, background: "#ffffff" } })
    .composite([{ input: logo, left: Math.floor((size - metadata.width) / 2), top: Math.floor((size - metadata.height) / 2) }])
    .png().toBuffer();
}

for (const [size, target] of [
  [32, join(webRoot, "src/app/icon.png")],
  [180, join(webRoot, "src/app/apple-icon.png")],
  [192, join(output, "app-icon-192.png")],
  [512, join(output, "app-icon-512.png")],
]) await writeFile(target, await appIcon(size));

// ICO entries use PNG payloads, supported by current browsers and Windows.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(appIcon));
const header = Buffer.alloc(6 + images.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((png, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
await writeFile(join(webRoot, "src/app/favicon.ico"), Buffer.concat([header, ...images]));
console.log("Prepared both logos for light/dark themes and browser/app icons from the supplied exports.");
