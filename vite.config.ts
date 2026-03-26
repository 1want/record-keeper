import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [
    vue(),
    visualizer(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()],
      dts: 'types/auto-imports.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'types/components.d.ts'
    })
  ],
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.ts', '.js', '.vue']
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.28.205:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/uploads': {
        target: 'http://192.168.28.205:3000',
        changeOrigin: true
      }
    }
  }
})
