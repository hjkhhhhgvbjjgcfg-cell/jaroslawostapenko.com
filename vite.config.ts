
import { defineConfig } from 'vite';

export default defineConfig({
  // No plugins needed for static HTML/JS site
  build: {
    outDir: 'dist',
  }
});
