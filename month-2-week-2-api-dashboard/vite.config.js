import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  base: mode === 'production'
    ? '/aurex-web-internship-Amna/month-2-week-2-api-dashboard/'
    : '/',
  plugins: [react()],
}))