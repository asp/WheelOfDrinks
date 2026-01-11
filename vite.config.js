import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic',
  })],
  base: '/WheelOfDrinks/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  esbuild: {
    jsx: 'automatic',
  }
})
