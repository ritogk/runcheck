import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@openapi": fileURLToPath(new URL("../openapi", import.meta.url))
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: './dist',
    rollupOptions: {
      output: {
        entryFileNames: `runcheck-app.js`,
        assetFileNames: `runcheck-app.[ext]`
      }
    },
  },
})
