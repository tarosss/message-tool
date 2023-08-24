import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/js/app.ts',
        'resources/scss/app.scss',
        'resources/scss/header.scss',
        'resources/scss/left-name.scss',
        'resources/scss/body.scss',
        'resources/scss/channel.scss',
        'resources/scss/message.scss',
        'resources/scss/reaction.scss',

        'resources/js/header.ts',
      ],
      refresh: true,
    }),
    vue(),
    tsconfigPaths(),
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    })
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
