import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from "@tailwindcss/vite";
import type { OutputBundle, NormalizedOutputOptions } from 'rollup'

// Fix 404 SPA bug of index.html not found
function spaFallbackPlugin() {
  return {
    name: 'spa-fallback',
    generateBundle(
      _options: NormalizedOutputOptions,
      bundle: OutputBundle
    ) {
      const indexHtml = bundle['index.html']
      if (indexHtml) {
        bundle['404.html'] = { ...indexHtml }
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/UrlShortenerFe/',
  plugins: [
    vue(),
    spaFallbackPlugin(),
    // vueDevTools(),
    tailwindcss()
  ],

  server: {
    port: 3000
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
