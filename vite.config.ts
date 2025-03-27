
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      'lib': path.resolve(__dirname, './lib'),
      'components': path.resolve(__dirname, './components'),
      'app': path.resolve(__dirname, './app'),
      'src': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
  },
  server: {
    host: '::',
    port: 8080
  }
}));
