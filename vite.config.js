import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { localCatalogPlugin } from './server/localCatalogPlugin.js'

export default defineConfig({
  plugins: [react(), localCatalogPlugin({ directory: fileURLToPath(new URL('./local-data', import.meta.url)) })],
  server: { host: '127.0.0.1' },
  build: { sourcemap: false },
})
