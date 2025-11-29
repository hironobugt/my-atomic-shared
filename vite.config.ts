import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'atomicShared',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/atoms/Button',
        './Input': './src/components/atoms/Input',
        './Label': './src/components/atoms/Label',
        './FormField': './src/components/molecules/FormField',
        './ConfirmDialog': './src/components/molecules/ConfirmDialog',
        './UserForm': './src/components/organisms/UserForm',
        './UserCard': './src/components/organisms/UserCard',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5001,
    cors: true,
  },
  preview: {
    port: 5001,
    cors: true,
  },
})
