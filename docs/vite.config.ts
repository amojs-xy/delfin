import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'

export default defineConfig({
  plugins: [
    Unocss(),
  ],
  server: {
    fs: {
      allow: ['..']
    }
  }
})
