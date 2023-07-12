import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/js/app.ts',
        'resources/scss/app.scss',
        'resources/scss/header.scss',
        'resources/scss/left-name.scss',
        'resources/js/header.ts',
      ],
      refresh: true,
    }),
    vue(),
    tsconfigPaths(),
  ],
  server: {
    // host: 'localhost',
    host: true,
    port: 5173,
  },
  resolve: {
    alias: [
      { find: '@', replacement: `${__dirname}/resources/js/` },
    ],
  },
})
