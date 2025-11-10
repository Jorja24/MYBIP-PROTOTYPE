import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Expose the API_KEY from the build environment (e.g., Vercel) to the client code.
    // Provide an empty string fallback to prevent crashes if the variable is not set.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
});