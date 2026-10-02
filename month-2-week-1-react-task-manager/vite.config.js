import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/aurex-web-internship-Amna/react-task-manager/',
  plugins: [react()],
})
