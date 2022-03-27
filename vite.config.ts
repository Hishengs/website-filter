import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    /* lib: {
      entry: resolve(__dirname, 'src/content_script.ts'),
      name: 'content_script',
      fileName: () => `content_script.js`,
      formats: ['iife']
    }, */
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: '[name].js',
        manualChunks: undefined,
      },
    },
    // assetsInlineLimit: 50 * 1024, // 50kb
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ]
})
