import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {readFile} from 'node:fs/promises';
import {defineConfig, type Plugin} from 'vite';
import {imagetools} from 'vite-imagetools';

// The portfolio uses a publication copy. Keep the original sheets intact.
function apartmentDrawingCopies(): Plugin {
  const sizes = {
    '1': [2382, 1684],
    '2': [3368, 2382],
    '3': [2382, 3368],
  } as const;
  let isBuild = false;

  return {
    name: 'apartment-drawing-copies',
    enforce: 'pre',
    configResolved(config) {
      isBuild = config.command === 'build';
    },
    async load(id) {
      const match = id.match(/\/многокв([123])\/(\d+)\.jpg\?publication$/u);
      if (!match) return;

      const [, project, sheet] = match;
      const [width, height] = sizes[project as keyof typeof sizes];
      const filename = id.split('?')[0];
      this.addWatchFile(filename);
      const jpeg = (await readFile(filename)).toString('base64');
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><image width="${width}" height="${height}" href="data:image/jpeg;base64,${jpeg}"/><rect x="${width - 180}" y="${height - 85}" width="104" height="59" fill="white"/></svg>`;

      if (!isBuild) return `export default "data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}"`;
      const ref = this.emitFile({ type: 'asset', name: `apartment-${project}-sheet-${sheet}.svg`, source: svg });
      return `export default import.meta.ROLLUP_FILE_URL_${ref}`;
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [apartmentDrawingCopies(), react(), tailwindcss(), imagetools()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    hmr: process.env.DISABLE_HMR !== 'true',
    // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
});
