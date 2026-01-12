import { defineVitestConfig } from '@nuxt/test-utils/config'
import { fileURLToPath } from 'node:url'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/.antigravity/**',
    ],
    server: {
      deps: {
        external: [/\.antigravity/, /vitest\.explorer/],
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./app', import.meta.url)),
    },
  },
})
