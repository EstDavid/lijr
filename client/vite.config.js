import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const aliases = {
  '@': path.resolve(__dirname, 'src') // Replace 'src' with your actual source directory
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: aliases
  }
});
