import type { Preview } from '@storybook/vue3'
import '@/assets/css/main.css' // Tailwind CSSなどのグローバルスタイルを読み込む

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
