import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import { NativeFederationTestsRemote } from '@module-federation/native-federation-tests/vite'

const federationConfig = {
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
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation(federationConfig),
    NativeFederationTestsRemote({
      moduleFederationConfig: federationConfig,
      deleteTestsFolder: false, // Keep for debugging
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
    fs: {
      allow: ['./dist', './src', '.'],
      strict: false,
    },
  },
  preview: {
    port: 5001,
    cors: true,
  },
})
