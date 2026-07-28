import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const API_PROXY_TARGET = env.VITE_API_PROXY_TARGET ?? "http://localhost:5000";

  return {
    plugins: [react()],

    server: {
      host: true,
      port: 5173,
      proxy: {
        "/api": {
          target: API_PROXY_TARGET,
          changeOrigin: true,
          secure: false
        }
      }
    }
  }
})
