import type { Meta, StoryObj } from '@storybook/vue3'
import TheScrollToTop from '@/components/TheScrollToTop.vue'

const meta = {
  title: 'Root/TheScrollToTop',
  component: TheScrollToTop,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TheScrollToTop>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { ScrollToTop: TheScrollToTop },
    template: `
      <div style="height: 200vh; padding: 20px;">
        <p>Scroll down to see the button (appears after 200px)</p>
        <ScrollToTop />
      </div>
    `,
  }),
}
