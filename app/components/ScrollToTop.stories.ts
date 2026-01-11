import type { Meta, StoryObj } from '@storybook/vue3'
import ScrollToTop from '@/components/ScrollToTop.vue'

const meta = {
  title: 'Root/ScrollToTop',
  component: ScrollToTop,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ScrollToTop>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { ScrollToTop },
    template: `
      <div style="height: 200vh; padding: 20px;">
        <p>Scroll down to see the button (appears after 200px)</p>
        <ScrollToTop />
      </div>
    `,
  }),
}
