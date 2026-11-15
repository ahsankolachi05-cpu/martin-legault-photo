import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const srcDir = 'public/images-b64';
const outDir = 'images';
await mkdir(outDir, { recursive: true });
const files = (await readdir(srcDir)).filter((f) => f.endsWith('.jpg.b64')).sort();
for (const f of files) {
  const b64 = (await readFile(path.join(srcDir, f), 'utf8')).trim();
  const out = f.replace(/\.jpg\.b64$/, '.jpg');
  await writeFile(path.join(outDir, out), Buffer.from(b64, 'base64'));
  console.log('decoded', out);
}
console.log(`extracted ${files.length} images`);
