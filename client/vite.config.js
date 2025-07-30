import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1': {
        // target: 'http://localhost:4000',
        target: 'https://job-tracker-4cyb.onrender.com/',
        changeOrigin: true,
      },
    },
  },
});
