import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Staging lives at GitHub Pages project path: https://denis-makarovskiy.github.io/garden-recovery-site/
// Switch `base` to '/' once a custom domain (gardenrecovery.me) is attached.
export default defineConfig(({ command }) => ({
  // Dev server serves at root; production build uses the Pages project path.
  base: command === 'serve' ? '/' : (process.env.VITE_BASE ?? '/garden-recovery-site/'),
  plugins: [react()],
  build: { assetsInlineLimit: 0 },
}))
