import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias: { '@': '/src' } },
  plugins: [vue()],
  
  server: {
    host: true,
    port: '8888',
    // proxy: {
    //   '/api': { // [/api路径的请求，都映射到 target 属性]
    //     target: 'http://localhost:9999/', 
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, '')
    //   }
    // }
  },
  
})

