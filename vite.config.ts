import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Expose the API_KEY from the build environment (e.g., Vercel) to the client-side code.
    // If API_KEY is not set during the build, it defaults to an empty string,
    // allowing the application to gracefully handle the missing key.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
});
