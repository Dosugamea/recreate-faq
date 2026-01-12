import type { StorybookConfig } from '@storybook/vue3-vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config: StorybookConfig = {
  stories: ['../app/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../app'),
    }
    config.plugins = [
      ...(config.plugins || []),
      vue(),
      autoImport({
        imports: ['vue', 'vue-router', 'pinia'],
      }),
      components({
        dirs: ['app/components'],
      }),
    ]
    return config
  },
}

export default config
