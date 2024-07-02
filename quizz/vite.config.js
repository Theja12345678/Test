import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'tejapangala-gmail.com_cuvette_final_evaluation_sep',
  build: {
    outDir: 'dist'
  }
})
