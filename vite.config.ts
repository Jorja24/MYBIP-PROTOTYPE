import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables from .env files and the process environment
  // FIX: Cast `process` to `any` to resolve a TypeScript error for `process.cwd()`.
  // This is a workaround for a potential TypeScript configuration issue where Node.js types are not correctly recognized.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    // Make env variables available to the client-side code
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});
