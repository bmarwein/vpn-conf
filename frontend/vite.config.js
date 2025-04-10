import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // assure que index.html est bien trouvé
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
