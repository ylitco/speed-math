import svgtofont from 'svgtofont';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '../assets/icon-font');
const outputDir = join(__dirname, './');

async function buildIconFont() {
  console.log('Building icon font from:', iconsDir);
  console.log('Output directory:', outputDir);

  await svgtofont({
    src: iconsDir,
    dist: outputDir,
    fontName: 'speed-math',
    css: true,
    classNamePrefix: 'speed-math',
    emptyDist: false,
    outSVGReact: false,
    outSVGPath: false,
    generateInfoData: true,
    svgicons2svgfont: {
      fontHeight: 1000,
      normalize: true,
    },
  });

  console.log('Icon font built successfully!');
}

buildIconFont().catch(console.error);
