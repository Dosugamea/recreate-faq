import type { Meta, StoryObj } from '@storybook/vue3'
import TheHeader from '@/components/TheHeader.vue'

const meta = {
  title: 'Root/TheHeader',
  component: TheHeader,
  tags: ['autodocs'],
  args: {
    siteName: 'FAQ App',
  },
} satisfies Meta<typeof TheHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomTitle: Story = {
  args: {
    siteName: 'My Awesome FAQ',
  },
}
