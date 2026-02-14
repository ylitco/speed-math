import { importDirectory, cleanupSVG, runSVGO } from '@iconify/tools';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '../assets/icon-set');
const outputFile = join(__dirname, 'speed-math.json');

async function buildIconSet() {
  console.log('Building icon set from:', iconsDir);

  const iconSet = await importDirectory(iconsDir, {
    prefix: 'speed-math',
  });

  iconSet.forEach((name, type) => {
    if (type !== 'icon') {
      return;
    }

    const svg = iconSet.toSVG(name);
    if (!svg) {
      iconSet.remove(name);
      return;
    }

    try {
      cleanupSVG(svg);
      runSVGO(svg);
    } catch (err) {
      console.error(`Error processing ${name}:`, err);
      iconSet.remove(name);
      return;
    }

    iconSet.fromSVG(name, svg);
  });

  const exported = iconSet.export();
  writeFileSync(outputFile, JSON.stringify(exported, null, 2));

  console.log(`Icon set built: ${outputFile}`);
  console.log(`Icons: ${Object.keys(exported.icons).join(', ')}`);
}

buildIconSet().catch(console.error);
