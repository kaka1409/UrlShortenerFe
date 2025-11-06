import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite";
import type { NormalizedOutputOptions } from 'rollup'
import fs from 'fs';


// Tạo 404.html từ index.html khi build SPA
function spaFallbackPlugin() {
  return {
    name: 'spa-fallback',
    writeBundle(_options: NormalizedOutputOptions) {
      const distPath = _options.dir || 'dist';
      const indexFile = `${distPath}/index.html`;
      const file404 = `${distPath}/404.html`;

      if (fs.existsSync(indexFile)) {
        fs.copyFileSync(indexFile, file404);
        console.log('Copied index.html to 404.html');
      }
    },
  }
}

export default defineConfig({
  base: '/UrlShortenerFe/',
  plugins: [
    vue(),
    tailwindcss(),
    spaFallbackPlugin(),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
