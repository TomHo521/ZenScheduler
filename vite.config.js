import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // URL of your backend server
        changeOrigin: true, // needed for virtual hosted sites
        secure: false,      // set to true if you're using https
      }
    }
  }
})

