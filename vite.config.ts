import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@mui/x-date-pickers', 'dayjs'],
    exclude: ['date-fns'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  resolve: {
    alias: {
      'date-fns': 'dayjs'
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    hmr: {
      overlay: false
    }
  },
}); 