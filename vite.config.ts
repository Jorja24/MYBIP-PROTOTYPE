import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/MYBIP-PROTOTYPE/',
  // This 'define' block makes the API key available to the client-side code
  // during the build process, which is a requirement for deployment.
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
});
