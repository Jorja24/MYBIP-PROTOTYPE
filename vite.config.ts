import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // Fix: Replaced `process.cwd()` with `''` to resolve TypeScript error. `loadEnv` resolves an empty string to the project root.
  const env = loadEnv(mode, '', '');
  return {
    plugins: [react()],
    define: {
      // Make the API_KEY available in the client-side code
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
});